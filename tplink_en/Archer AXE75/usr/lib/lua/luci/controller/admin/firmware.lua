--[[Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  firmware.lua
Details :  firmware http response operation
Author  :  He Ye  <heye@tp-link.net>
Version :  1.0.0
Date    :  27Mar, 2014
]]--

module("luci.controller.admin.firmware", package.seeall)

local uci       = require "luci.model.uci"
local http      = require "luci.http"
local debug     = require "luci.tools.debug"
local sys       = require "luci.sys"
local nixio     = require "nixio"
local ctl       = require "luci.model.controller"
local fs        = require "luci.fs"
local configtool = require "luci.sys.config"
local cloud_account = require("luci.controller.admin.cloud_account")
local log       = require "luci.model.log"
local util   	= require "luci.util"
local fmup      = require "luci.model.fmup"
local cry       = require "luci.model.crypto"
local uci_r = uci.cursor()

require "luci.json"

local small_mem = uci_r:get_profile("global", "small_mem") or "no"
local REBOOT_TIME = uci_r:get_profile("global", "reboot_time") or 75
local UPGRADE_TIME = uci_r:get_profile("global", "upgrade_time") or 120
local IMAGE_TMP_PATH = "/tmp/firmware.bin"
local DOWNLOAD_FW_NAME = "/tmp/cloud_up.bin"
local CONFIG_TMP_PATH_1 = "/tmp/read-backup-userconf.bin"
local CONFIG_TMP_PATH_2 = "/tmp/read-backup-userconf-merge.bin"
local LOGO_TMP_PATH = "/tmp/portal_logo.jpg"
local BACK_TMP_PATH = "/tmp/portal_back.jpg"
local LOGO_NANDFLASH_PATH = "/storage/portal_logo_user.jpg"
local BACK_NANDFLASH_PATH = "/storage/portal_back_user.jpg"
local result1 = os.execute("nvrammanager -s | grep default-config2 >/dev/null 2>&1")
local result2 = os.execute("nvrammanager -s | grep user-config2 >/dev/null 2>&1")
local firmware_lock = "/tmp/firmware_lock.lua"
local uploadFileSize = 0

local function get_partition_size(partition_name)
    local PARTITION_FILE = "/tmp/partition.txt"
    local partition_size = 0
    os.execute("nvrammanager -s > "..PARTITION_FILE)
    local fp = io.open(PARTITION_FILE, 'r')
    if nil ~= fp then
        repeat
            local line = fp:read("*line")
            if nil ~= line then
                local i, j
                i, j = string.find(line, partition_name)
                if nil ~= i and nil ~= j then
                    local pat = "(.-),()"
                    local size_pat = "size%s*=%s*(.-)%s*Bytes"
                    local part, pos, value
                    for part, pos in string.gfind(line, pat) do
                        i, j = string.find(part, "size")
                        if nil ~= i and nil ~= j then
                            _,_,value = string.find(part, size_pat)
                            partition_size = tonumber(value)
                        end
                    end
                end
            end
        until nil == line or partition_size > 0
    end
    os.execute("rm "..PARTITION_FILE)
    return partition_size
end

function fork_reboot()
    local sys = require "luci.sys"
    local data = { reboot_time = 75 }

    --get reboot time from profile
    data.reboot_time = uci.cursor():get_profile("global", "reboot_time") or 75
    sys.fork_call("sync")
    sys.fork_exec("sleep 2;reboot")
    return data
end

function file_flash(totaltime, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd = "check_status = {totaltime=%d, ops=\"%s\"}\n"
    file:write(string.format(check_cmd, totaltime, ops))
    file:close()
end

function update_fwuppercent(percent, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd = "check_status = {percent=%d, ops=\"%s\"}\n"
    file:write(string.format(check_cmd, percent, ops))
    file:close()
end

function update_rebootflag(flag, ops)
    local file = io.open("/tmp/reboot_flag.lua", "w")
    local check_cmd   = "check_status = {reboot=%d, ops=\"%s\"}\n"
    file:write(string.format(check_cmd, flag, ops))
    file:close()
end

function restore_error(error_code, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd = "check_status = {error_code=\"%s\", ops=\"%s\"}\n"
    file:write(string.format(check_cmd, error_code, ops))
    file:close()
end

function make_common_config()
    local common_config = {
        ["image_boot"] = "0",
        ["device_mode"] = "router"
    }

    local fd = io.open("/tmp/save-backup-commonconf.bin", "w")
    for key, value in pairs(common_config) do
        fd:write(key .. "=" .. value .. "\0")
    end
    fd:close()
end

function set_common_config()
    local fd = io.open("/tmp/read-backup-commonconf.bin", "r")
    local common_config = fd:read("*all")
    fd:close()

    local image_boot = string.match(common_config, "image_boot=(%d)\0")
    local device_mode = string.match(common_config, "device_mode=(%a+)\0")

    if image_boot ~= "0" and image_boot ~= "1" then
        image_boot = "0"
    end
    if device_mode ~= "router" and device_mode ~= "ap" and device_mode ~= "repeater" then
        device_mode = "router"
    end

    os.execute("nvram set image_boot=" .. image_boot .. " >/dev/null 2>&1")
    os.execute("nvram set device_mode=" .. device_mode .. " >/dev/null 2>&1")
    os.execute("nvram commit >/dev/null 2>&1")    
end

function find_default_ip()
    local default_config
    local head, tail, value

    -- get default ip
    os.execute("nvrammanager -r /tmp/default-config.bin -p default-config >/dev/null 2>&1")
    cry.dec_file_entry("/tmp/default-config.bin", "/tmp/default-config.xml")
    local fp = io.open("/tmp/default-config.xml", "r")
    default_config = fp:read("*all")
    fp:close()
    os.execute("rm -f /tmp/default-config.xml /tmp/default-config.bin >/dev/null 2>&1")

    head = "<interface name=\"lan\">"
    tail = "</interface>"
    _, _, value = string.find(default_config, head .. "(.-)" .. tail)

    head = "<ipaddr>"
    tail = "</ipaddr>"
    _, _, value = string.find(value, head .. "(.-)" .. tail)

    return value
end

function hide_info(filename)
	cry.dec_file_entry(filename, "/tmp/tmp-backup-userconf.xml")
    luci.sys.exec("mkdir -p /tmp/backupcfg")
    configtool.xmlToFile("/tmp/tmp-backup-userconf.xml", "/tmp/backupcfg")
    -- hide cloud info config
    local hide_files = {"accountmgnt", "cloud_config"}
    for _, f in ipairs(hide_files) do 
        luci.sys.exec("rm -f /tmp/backupcfg/config/" .. f)
    end 
    -- recreate xml config files
    luci.sys.exec("rm -f /tmp/backup/ori-backup-user-config.bin;rm -f /tmp/tmp-backup-userconf.xml")
    configtool.convertFileToXml("/tmp/backupcfg/config", "/tmp/tmp-backup-userconf.xml")
    cry.enc_file_entry("/tmp/tmp-backup-userconf.xml", filename)
    luci.sys.exec("rm -rf /tmp/backupcfg;rm -f /tmp/tmp-backup-userconf.xml")
end

function config_read( ... )
    local ret = {totaltime = REBOOT_TIME}
    return ret
end

function config_check( ... )
    local ret
    luci.http.prepare_content("text/html")
    if nixio.fs.access("/tmp/firmware_status.lua") then
        dofile("/tmp/firmware_status.lua")
        ret = check_status
        if nixio.fs.access(firmware_lock) then
            dofile(firmware_lock)
            ret.upgrade_type = upgrade_type
        end   
        if ret.ops == "restore" then
            os.execute("rm -f /tmp/firmware_status.lua >/dev/null 2>&1")
            return false, ret.error_code
        end
    else
        return true
    end

    return ret
end


function md5_product_name()
    local configtool = require "luci.sys.config"
    local product_name = configtool.getsysinfo("product_name") or ""
    local product_name_file = io.open("/tmp/product_name", "w")
    product_name_file:write(product_name)
    product_name_file:close()
    local product_name_md5 = luci.sys.exec("md5sum /tmp/product_name")
    luci.sys.exec("rm -f /tmp/product_name")
    return string.match(product_name_md5, "%x%x%x%x+")
end


--根据机型+硬件版本+special_id生成md5，防止不同机制/不同国家码的配置相互导入
function md5_product_info()
    local configtool = require "luci.sys.config"
    local info = configtool.getsysinfo("product_name")..configtool.getsysinfo("product_ver")..configtool.getsysinfo("special_id")
    local product_info = info or ""
    local product_info_file = io.open("/tmp/product_info", "w")
    product_info_file:write(product_info)
    product_info_file:close()
    local product_info_md5 = luci.sys.exec("md5sum /tmp/product_info")
    luci.sys.exec("rm -f /tmp/product_info")
    return string.match(product_info_md5, "%x%x%x%x+")
end


function config_backup( ... )
    if result1 == 0 and result2 == 0 then
        luci.sys.exec("nvrammanager -r /tmp/save-backup-userconf1.bin -p user-config1 >/dev/null 2>&1")
        luci.sys.exec("nvrammanager -r /tmp/save-backup-userconf2.bin -p user-config2 >/dev/null 2>&1")	
        -- 备份certificate分区（openvpn证书）
        local extern_partition = uci_r:get_profile("backup_restore", "extern_partition") or nil
        if extern_partition ~= nil then
            luci.sys.exec("nvrammanager -r /tmp/save-backup-" .. extern_partition .. ".bin -p " .. extern_partition .. " >/dev/null 2>&1")
        end
        make_common_config()

        -- delete cloud config
        local cloud_support = uci_r:get_profile("cloud", "cloud_support") or "no"
        if cloud_support ~= "no" then
            cry.dec_file_entry("/tmp/save-backup-userconf1.bin", "/tmp/tmp-backup-userconf1.xml")
            luci.sys.exec("mkdir -p /tmp/backupcfg")
            configtool.xmlToFile("/tmp/tmp-backup-userconf1.xml", "/tmp/backupcfg")
            -- hide cloud info config
            local hide_files = {"accountmgnt", "cloud_config"}
            for _, f in ipairs(hide_files) do 
                luci.sys.exec("rm -f /tmp/backupcfg/config/" .. f)
            end 

            -- recreate xml config files
            luci.sys.exec("rm -f /tmp/save-backup-userconf1.bin;rm -f /tmp/tmp-backup-userconf1.xml")
            configtool.convertFileToXml("/tmp/backupcfg/config", "/tmp/tmp-backup-userconf1.xml")
            cry.enc_file_entry("/tmp/tmp-backup-userconf1.xml", "/tmp/save-backup-userconf1.bin")
            luci.sys.exec("rm -rf /tmp/backupcfg;rm -f /tmp/tmp-backup-userconf1.xml")
        end

        local save_userconf1 = io.open("/tmp/save-backup-userconf1.bin", "r")
        local save_userconf2 = io.open("/tmp/save-backup-userconf2.bin", "r")
        -- 备份certificate分区（openvpn证书）
        local save_externpartconf = nil
        if extern_partition ~= nil then
            save_externpartconf = io.open("/tmp/save-backup-" .. extern_partition .. ".bin", "r")
        end
        local save_commonconf = io.open("/tmp/save-backup-commonconf.bin", "r")
        local save_temp_merge_userconf = io.open("/tmp/save-backup-userconf-temp-merge.bin", "w")

        local save_userconf1_content = save_userconf1:read("*all")
        local save_userconf2_content = save_userconf2:read("*all")
        -- 备份certificate分区（openvpn证书）
        local save_externpartconf_content = nil
        if extern_partition ~= nil then
            save_externpartconf_content = save_externpartconf:read("*all")
        end
        local save_commonconf_content = save_commonconf:read("*all")
        local save_userconf1_length = string.format("%08x", save_userconf1:seek("end"))
        local save_userconf2_length = string.format("%08x", save_userconf2:seek("end"))
        -- 备份certificate分区（openvpn证书）
        local save_externpartconf_length
        if extern_partition ~= nil then
            save_externpartconf_length = string.format("%08x", save_externpartconf:seek("end"))
        end
        local save_commonconf_length = string.format("%08x", save_commonconf:seek("end"))
        save_temp_merge_userconf:write(save_userconf1_content)
        save_temp_merge_userconf:write(save_userconf2_content)
        -- 备份certificate分区（openvpn证书）
        if extern_partition ~= nil then
            save_temp_merge_userconf:write(save_externpartconf_content)
        end
        save_temp_merge_userconf:write(save_commonconf_content)

        save_userconf1:close()
        save_userconf2:close()
        -- 备份certificate分区（openvpn证书）
        if extern_partition ~= nil then
            save_externpartconf:close()
        end
        save_commonconf:close()
        save_temp_merge_userconf:close()

        local save_md5_result = luci.sys.exec("md5sum /tmp/save-backup-userconf-temp-merge.bin")
        local save_md5 = string.match(save_md5_result, "%x%x%x%x+")

        local save_merge_userconf = io.open("/tmp/save-backup-userconf-merge.bin", "w")

        for num in string.gmatch(save_userconf1_length, "%x%x") do
            local number = "0x"..num
            save_merge_userconf:write(string.char(number))
        end

        for num in string.gmatch(save_userconf2_length, "%x%x") do
            local number = "0x"..num
            save_merge_userconf:write(string.char(number))
        end

        -- 备份certificate分区（openvpn证书）
        if extern_partition ~= nil then
            for num in string.gmatch(save_externpartconf_length, "%x%x") do
                local number = "0x"..num
                save_merge_userconf:write(string.char(number))
            end
        end
		
        for num in string.gmatch(save_commonconf_length, "%x%x") do
            local number = "0x"..num
            save_merge_userconf:write(string.char(number))
        end

        for num in string.gmatch(save_md5, "%x%x") do
            local number = "0x"..num
            save_merge_userconf:write(string.char(number))
        end

        save_merge_userconf:write(save_userconf1_content)
        save_merge_userconf:write(save_userconf2_content)
        -- 备份certificate分区（openvpn证书）
        if extern_partition ~= nil then
            save_merge_userconf:write(save_externpartconf_content)
        end
        save_merge_userconf:write(save_commonconf_content)
        save_merge_userconf:close()

		local feedback = {...}
        if feedback[1] == true then
			local reader = require("io").popen("cat /tmp/save-backup-userconf-merge.bin")     
			if extern_partition ~= nil then
				luci.sys.exec("rm -f /tmp/save-backup-" .. extern_partition .. ".bin")
			end
			luci.sys.exec("rm -f /tmp/save-backup-userconf1.bin;rm -f /tmp/save-backup-userconf2.bin;rm -f /tmp/save-backup-commonconf.bin")
			luci.sys.exec("rm -f /tmp/save-backup-userconf-temp-merge.bin;rm -f /tmp/save-backup-userconf-merge.bin")
			return reader
		else
			local reader = sys.ltn12_popen("cat /tmp/save-backup-userconf-merge.bin")
			-- luci.http.header('Content-Disposition', 'attachment; filename="backup-%s-%s.bin"' % {luci.sys.hostname(), os.date("%Y-%m-%d")})
			luci.http.header('Content-Disposition', 'attachment; filename="config.bin"')
			luci.http.prepare_content("application/octet-stream")
			luci.ltn12.pump.all(reader, luci.http.write)
			if extern_partition ~= nil then
				luci.sys.exec("rm -f /tmp/save-backup-" .. extern_partition .. ".bin")
			end
			luci.sys.exec("rm -f /tmp/save-backup-userconf1.bin;rm -f /tmp/save-backup-userconf2.bin;rm -f /tmp/save-backup-commonconf.bin")
			luci.sys.exec("rm -f /tmp/save-backup-userconf-temp-merge.bin;rm -f /tmp/save-backup-userconf-merge.bin")
		end


    else
        --backup file = AES_ENC(MD5(product_name)+AES_ENC(COMPRESS(user_config_xml_file)))
        local product_info_md5 = md5_product_info()
        local product_info_md5_file = io.open("/tmp/product_info_md5_file", "w")

        for num in string.gmatch(product_info_md5, "%x%x") do
            local number = "0x"..num
            product_info_md5_file:write(string.char(number))
        end

        product_info_md5_file:close()

        -- 备份extern分区, 如有特殊情况的分区，再特殊处理
        local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
        if extern_partitions ~= nil then
            extern_partitions = util.split(extern_partitions, " ")
            os.execute("mkdir /tmp/backup >/dev/null 2>&1")
			
            for i, v in ipairs(extern_partitions) do
                if v ~= nil then
                	debug("-----------------------backup :" .. v)
                	local externname = "/tmp/backup/ori-backup-" .. v .. ".bin"
                    luci.sys.exec("nvrammanager -r " .. externname .. " -p " .. v .. " >/dev/null 2>&1")
					local filesize = fs.stat(externname).size
                    if ( v == 'router-config' or v == 'ap-config') and filesize > 0 then
						hide_info(externname)
					end
                end
            end
			
            luci.sys.exec("nvrammanager -r /tmp/backup/ori-backup-user-config.bin -p user-config >/dev/null 2>&1")
            hide_info("/tmp/backup/ori-backup-user-config.bin")

            --打包
            os.execute("tar -cf /tmp/ori-backup-userconf.bin -C /tmp/backup . >/dev/null 2>&1")
            luci.sys.exec("rm -rf /tmp/backup >/dev/null 2>&1")
        else
            luci.sys.exec("nvrammanager -r /tmp/ori-backup-userconf.bin -p user-config >/dev/null 2>&1")
            cry.dec_file_entry("/tmp/ori-backup-userconf.bin", "/tmp/tmp-backup-userconf.xml")
            luci.sys.exec("mkdir -p /tmp/backupcfg")
            configtool.xmlToFile("/tmp/tmp-backup-userconf.xml", "/tmp/backupcfg")
            -- hide cloud info config
            local hide_files = {"accountmgnt", "cloud_config"}
            for _, f in ipairs(hide_files) do 
                luci.sys.exec("rm -f /tmp/backupcfg/config/" .. f)
            end 
            -- recreate xml config files
            luci.sys.exec("rm -f /tmp/ori-backup-userconf.bin;rm -f /tmp/tmp-backup-userconf.xml")
            configtool.convertFileToXml("/tmp/backupcfg/config", "/tmp/tmp-backup-userconf.xml")
            cry.enc_file_entry("/tmp/tmp-backup-userconf.xml", "/tmp/ori-backup-userconf.bin")
            luci.sys.exec("rm -rf /tmp/backupcfg;rm -f /tmp/tmp-backup-userconf.xml")
        end
	
        luci.sys.exec("cat /tmp/product_info_md5_file /tmp/ori-backup-userconf.bin > /tmp/mid-backup-userconf.bin")
        cry.enc_file_entry("/tmp/mid-backup-userconf.bin", "/tmp/save-backup-userconf.bin")
   
        local feedback = {...}
        if feedback[1] == true then
			local reader = require("io").popen("cat /tmp/save-backup-userconf.bin")   
			luci.sys.exec("rm -f /tmp/save-backup-userconf.bin; rm -f /tmp/product_info_md5_file; rm -f /tmp/mid-backup-userconf.bin; rm -f /tmp/ori-backup-userconf.bin")  
			return reader
		else
			local reader = sys.ltn12_popen("cat /tmp/save-backup-userconf.bin")
			luci.http.header('Content-Disposition', 'attachment; filename="backup-%s-%s.bin"' % {configtool.getsysinfo("product_name"), os.date("%Y-%m-%d")})
			luci.http.prepare_content("application/octet-stream")
			luci.ltn12.pump.all(reader, luci.http.write)
			luci.sys.exec("rm -f /tmp/save-backup-userconf.bin; rm -f /tmp/product_info_md5_file; rm -f /tmp/mid-backup-userconf.bin; rm -f /tmp/ori-backup-userconf.bin")
		end
    end

    return true
end

function config_restore( ... )
    luci.http.prepare_content("text/html")
    if result1 == 0 and result2 == 0 then
        local read_merge_userconf = io.open("/tmp/read-backup-userconf-merge.bin", "r")
        local read_merge_userconf_length = read_merge_userconf:seek("end")
        -- debug.printf("read_merge_userconf_length = " .. read_merge_userconf_length)
        read_merge_userconf:seek("set")

        -- 文件头长度
        local headerLen = 0
        -- 恢复certificate分区（openvpn证书）
        local extern_partition = uci_r:get_profile("backup_restore", "extern_partition") or nil
        if extern_partition ~= nil then
            headerLen = 4 + 4 + 4 + 4 + 16
        else
            headerLen = 4 + 4 + 4 + 16
        end
		
        if read_merge_userconf_length < headerLen then
            read_merge_userconf:close()
            luci.sys.exec("rm -f /tmp/read-backup-userconf-merge.bin")
            restore_error("err_failed", "restore")
            return true
        end            

        local t = {}
        for index = 1, 4 do
            local num = read_merge_userconf:read(1)
            local number = string.format("%02x", string.byte(num))
            t[#t + 1] = number
        end
        local length = table.concat(t)
        local read_userconf1_length = tonumber("0x" .. length)
        -- debug.printf("read_userconf1_length = " .. read_userconf1_length)

        local t = {}
        for index = 1, 4 do
            local num = read_merge_userconf:read(1)
            local number = string.format("%02x", string.byte(num))
            t[#t + 1] = number
        end
        local length = table.concat(t)
        local read_userconf2_length = tonumber("0x" .. length)
        -- debug.printf("read_userconf2_length = " .. read_userconf2_length)

        -- 恢复certificate分区（openvpn证书）
        local read_externpartconf_length
        if extern_partition ~= nil then
            local t = {}
            for index = 1, 4 do
	        local num = read_merge_userconf:read(1)
	        local number = string.format("%02x", string.byte(num))
	        t[#t + 1] = number
            end
            local length = table.concat(t)
            read_externpartconf_length = tonumber("0x" .. length)
            -- debug.printf("read_userconf2_length = " .. read_userconf2_length)
        end
		
        local t = {}
        for index = 1, 4 do
            local num = read_merge_userconf:read(1)
            local number = string.format("%02x", string.byte(num))
            t[#t + 1] = number
        end
        local length = table.concat(t)
        local read_commonconf_length = tonumber("0x" .. length)
        -- debug.printf("read_commonconf_length = " .. read_commonconf_length)

        local t = {}
        for index = 1, 16 do
            local num = read_merge_userconf:read(1)
            local number = string.format("%02x", string.byte(num))
            t[#t + 1] = number
        end
        local read_md5 = table.concat(t)
        -- debug.printf("read_md5 = " .. read_md5)

        -- 恢复certificate分区（openvpn证书）
        local read_upfile_length
        if extern_partition ~= nil then
            read_upfile_length = 4 + 4 + 4 + 4 + 16 + read_userconf1_length + read_userconf2_length + read_externpartconf_length + read_commonconf_length
        else
            read_upfile_length = 4 + 4 + 4 + 16 + read_userconf1_length + read_userconf2_length + read_commonconf_length
        end
		
        if read_merge_userconf_length == read_upfile_length then
            debug.printf("length check success")
        else
            debug.printf("length check failed")
            read_merge_userconf:close()
            luci.sys.exec("rm -f /tmp/read-backup-userconf-merge.bin")
            restore_error("err_failed", "restore")
            return true
        end

        local read_userconf1_content = read_merge_userconf:read(read_userconf1_length)
        local read_userconf2_content = read_merge_userconf:read(read_userconf2_length)
        -- 恢复certificate分区（openvpn证书）
        local read_externpartconf_content
        if extern_partition ~= nil then
            read_externpartconf_content = read_merge_userconf:read(read_externpartconf_length)
        end
        local read_commonconf_content = read_merge_userconf:read(read_commonconf_length)
        read_merge_userconf:close()

        local read_userconf1 = io.open("/tmp/read-backup-userconf1.bin", "w")
        local read_userconf2 = io.open("/tmp/read-backup-userconf2.bin", "w")
        -- 恢复certificate分区（openvpn证书）
        local read_externpartconf
        if extern_partition ~= nil then
            read_externpartconf = io.open("/tmp/read-backup-externpartconf.bin", "w")
        end
        local read_commonconf = io.open("/tmp/read-backup-commonconf.bin", "w")
        local read_temp_merge_userconf = io.open("/tmp/read-backup-userconf-temp-merge.bin", "w") 
        if read_userconf1_length ~= 0 and read_userconf1_content ~= nil then
            read_userconf1:write(read_userconf1_content)
            read_temp_merge_userconf:write(read_userconf1_content)
        end
        if read_userconf2_length ~= 0 and read_userconf2_content ~= nil then
            read_userconf2:write(read_userconf2_content)
            read_temp_merge_userconf:write(read_userconf2_content)
        end
        -- 恢复certificate分区（openvpn证书）
        if extern_partition ~= nil then
            if read_externpartconf_length ~= 0 and read_externpartconf_content ~= nil then
                read_externpartconf:write(read_externpartconf_content)
                read_temp_merge_userconf:write(read_externpartconf_content)
            end
        end
        if read_commonconf_length ~= 0 and read_commonconf_content ~= nil then
            read_commonconf:write(read_commonconf_content)
            read_temp_merge_userconf:write(read_commonconf_content)
        end

        read_userconf1:close()
        read_userconf2:close()
        -- 恢复certificate分区（openvpn证书）
        if extern_partition ~= nil then
            read_externpartconf:close()
        end
        read_commonconf:close()
        read_temp_merge_userconf:close()

        local check_md5_result = luci.sys.exec("md5sum /tmp/read-backup-userconf-temp-merge.bin")
        local check_md5 = string.match(check_md5_result, "%x%x%x%x+")
        -- debug.printf("check_md5 = " .. check_md5)
        if check_md5 == read_md5 then
            debug.printf("md5 check success")
        else
            debug.printf("md5 check failed")
            luci.sys.exec("rm -f /tmp/read-backup-userconf1.bin;rm -f /tmp/read-backup-userconf2.bin;rm -f /tmp/read-backup-commonconf.bin")
            if extern_partition ~= nil then
                luci.sys.exec("rm -f /tmp/read-backup-externpartconf.bin")
            end
            luci.sys.exec("rm -f /tmp/read-backup-userconf-temp-merge.bin;rm -f /tmp/read-backup-userconf-merge.bin")
            restore_error("err_failed", "restore")
            return true
        end

        if read_userconf1_length ~= 0 and read_userconf1_content ~= nil then
            cry.dec_file_entry("/tmp/read-backup-userconf1.bin", "/tmp/read-backup-userconf1.xml")

            -- not restore cloud config to flash              
            luci.sys.exec("mkdir -p /tmp/restorecfg /tmp/userconfig")
            configtool.restoreXmlToFile("/tmp/read-backup-userconf1.xml", "/tmp/restorecfg")
            luci.sys.exec("rm -f /tmp/read-backup-userconf1.bin;rm -f /tmp/read-backup-userconf1.xml")
  
            -- read flash config
            luci.sys.exec("nvrammanager -r /tmp/ori-userconf1.bin -p user-config1 >/dev/null 2>&1")
            cry.dec_file_entry("/tmp/ori-userconf1.bin", "/tmp/ori-userconf1.xml")
            configtool.xmlToFile("/tmp/ori-userconf1.xml", "/tmp/userconfig")
            luci.sys.exec("rm -f /tmp/ori-userconf1.bin;rm -f /tmp/ori-userconf1.xml")
  
            -- not restore cloud info config
            local hide_files = {"accountmgnt", "cloud_config"}
            for _, f in ipairs(hide_files) do 
                luci.sys.exec("cp -f /tmp/userconfig/config/" .. f .. "  /tmp/restorecfg/config/")
            end 

            -- recreate xml config files
            configtool.convertFileToXml("/tmp/restorecfg/config", "/tmp/read-backup-userconf1.xml")
            cry.enc_file_entry("/tmp/read-backup-userconf1.xml", "/tmp/read-backup-userconf1.bin")
            luci.sys.exec("rm -rf /tmp/restorecfg;rm -rf /tmp/userconfig")

            local decrypt_userconf1 = io.open("/tmp/read-backup-userconf1.xml", "r")
            if decrypt_userconf1:read(6) == '<?xml 'then
                decrypt_userconf1:close()
                configtool.xmlToFile("/tmp/read-backup-userconf1.xml", "/tmp")
                luci.sys.exec("rm -f /tmp/read-backup-userconf1.xml")
                debug.printf("decrypt userconfig1 success")
            else
                decrypt_userconf1:close()
                luci.sys.exec("rm -f /tmp/read-backup-userconf1.xml")
                luci.sys.exec("rm -f /tmp/read-backup-userconf1.bin;rm -f /tmp/read-backup-userconf2.bin;rm -f /tmp/read-backup-commonconf.bin")
				if extern_partition ~= nil then
					luci.sys.exec("rm -f /tmp/read-backup-externpartconf.bin")
				end
                luci.sys.exec("rm -f /tmp/read-backup-userconf-temp-merge.bin;rm -f /tmp/read-backup-userconf-merge.bin")
                debug.printf("decrypt userconfig1 failed")
                restore_error("err_failed", "restore")
                return true
            end

            luci.sys.exec("nvrammanager -e -p user-config1 >/dev/null 2>&1")
            luci.sys.exec("nvrammanager -w /tmp/read-backup-userconf1.bin -p user-config1 >/dev/null 2>&1")
        else
            luci.sys.exec("nvrammanager -e -p user-config1 >/dev/null 2>&1")
        end

        if read_userconf2_length ~= 0 and read_userconf2_content ~= nil then
            luci.sys.exec("nvrammanager -e -p user-config2 >/dev/null 2>&1")
            luci.sys.exec("nvrammanager -w /tmp/read-backup-userconf2.bin -p user-config2 >/dev/null 2>&1")
        else
            luci.sys.exec("nvrammanager -e -p user-config2 >/dev/null 2>&1")
        end

        -- 恢复certificate分区（openvpn证书）
        if extern_partition ~= nil then
            if read_externpartconf_length ~= 0 and read_externpartconf_content ~= nil then
                luci.sys.exec("nvrammanager -e -p " .. extern_partition .. " >/dev/null 2>&1")
                luci.sys.exec("nvrammanager -w /tmp/read-backup-externpartconf.bin -p ".. extern_partition .. " >/dev/null 2>&1")
            else
                luci.sys.exec("nvrammanager -e -p " .. extern_partition .. " >/dev/null 2>&1")
            end		
        end
				
        set_common_config()

        luci.sys.exec("rm -f /tmp/read-backup-userconf1.bin;rm -f /tmp/read-backup-userconf2.bin;rm -f /tmp/read-backup-commonconf.bin")
        if extern_partition ~= nil then
            luci.sys.exec("rm -f /tmp/read-backup-externpartconf.bin")
        end
        luci.sys.exec("rm -f /tmp/read-backup-userconf-temp-merge.bin;rm -f /tmp/read-backup-userconf-merge.bin")
    else
		debug("--------------config_restore-------------")
        local backup_max_size
        local filesize
        local read_backup_userconf = io.open("/tmp/read-backup-userconf.bin", "r")
        local read_backup_userconf_length = read_backup_userconf:seek("end")
        read_backup_userconf:close()

        --考虑到有多个分区或者user-config分区大于16K的情况，去掉上限限制
        --if read_backup_userconf_length <= 16 or read_backup_userconf_length > 16384 then
        if read_backup_userconf_length <= 16 then 		
            luci.sys.exec("rm -f /tmp/read-backup-userconf.bin")
            restore_error("err_failed", "restore")
            return true
        end

        local product_info_md5 = md5_product_info()
        local product_name_md5 = md5_product_name() --兼容出货软件
        cry.dec_file_entry("/tmp/read-backup-userconf.bin", "/tmp/tmp-backup-userconf.bin")
        local tmp_userconf_fd = io.open("/tmp/tmp-backup-userconf.bin", "r")
        luci.sys.exec("rm -f /tmp/read-backup-userconf.bin")

        local t = {}
        for index = 1, 16 do
            local num = tmp_userconf_fd:read(1)
            if num == nil then
                tmp_userconf_fd:close()
                luci.sys.exec("rm -f /tmp/tmp-backup-userconf.bin")
                restore_error("err_failed", "restore")
                return true
            end   
            local number = string.format("%02x", string.byte(num))
            t[#t + 1] = number
        end
        local read_md5 = table.concat(t)
        tmp_userconf_fd:close()

        if product_info_md5 == read_md5 or product_name_md5 == read_md5 then
            debug.printf("md5 check success")
        else
            debug.printf("md5 check failed")
            luci.sys.exec("rm -f /tmp/tmp-backup-userconf.bin")
            restore_error("err_failed", "restore")
            return true
        end

        luci.sys.exec("dd if=/tmp/tmp-backup-userconf.bin of=/tmp/read-backup-userconf.bin ibs=1 skip=16")
        luci.sys.exec("rm -f /tmp/tmp-backup-userconf.bin")

        -- 恢复extern分区, 如有特殊情况的分区，再特殊处理
        local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
        if extern_partitions ~= nil then
			debug("--------------extern partitions-------------")
            extern_partitions = util.split(extern_partitions, " ")
            os.execute("mkdir /tmp/restore >/dev/null 2>&1")
            --解压
            os.execute("tar -xf /tmp/read-backup-userconf.bin -C /tmp/restore >/dev/null 2>&1")
			
            for i, v in ipairs(extern_partitions) do
                if v ~= nil then
                    local file, err = io.open("/tmp/restore/ori-backup-" .. v .. ".bin",'r')
                    if file ~= nil then
                        filesize = fs.stat("/tmp/restore/ori-backup-" .. v .. ".bin").size
                        local partition_name = string.gsub(v, "%-", "%%-")
                        local backup_max_size = get_partition_size(partition_name)
                        if filesize > 0 and filesize <= backup_max_size then
                            debug("--------------restore-------------" .. v)
                            luci.sys.exec("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
                            luci.sys.exec("nvrammanager -w /tmp/restore/ori-backup-" .. v .. ".bin -p ".. v .. " >/dev/null 2>&1")
                        else
                            debug("--------------erase:" .. v .. ", filesize=" .. filesize .. ", max_size=" .. backup_max_size)
                            luci.sys.exec("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
                        end
                    end
                end
            end
					
            cry.dec_file_entry("/tmp/restore/ori-backup-user-config.bin", "/tmp/ori-backup-userconf.xml")
        else
            cry.dec_file_entry("/tmp/read-backup-userconf.bin", "/tmp/ori-backup-userconf.xml")
        end

        -- not restore cloud config to flash              
        luci.sys.exec("mkdir -p /tmp/restorecfg /tmp/userconfig")
        configtool.restoreXmlToFile("/tmp/ori-backup-userconf.xml", "/tmp/restorecfg")
        luci.sys.exec("rm -f /tmp/ori-backup-userconf.xml")

        -- read flash config
        luci.sys.exec("nvrammanager -r /tmp/ori-userconf.bin -p user-config >/dev/null 2>&1")
        cry.dec_file_entry("/tmp/ori-userconf.bin", "/tmp/ori-userconf.xml")
        configtool.xmlToFile("/tmp/ori-userconf.xml", "/tmp/userconfig")
        luci.sys.exec("rm -f /tmp/ori-userconf.bin;rm -f /tmp/ori-userconf.xml")

        -- not restore cloud info config
        local hide_files = {"accountmgnt", "cloud_config"}
        for _, f in ipairs(hide_files) do 
            luci.sys.exec("cp -f /tmp/userconfig/config/" .. f .. "   /tmp/restorecfg/config/")
        end 

        -- recreate xml config files
        configtool.convertFileToXml("/tmp/restorecfg/config", "/tmp/ori-backup-userconf.xml")
        cry.enc_file_entry("/tmp/ori-backup-userconf.xml", "/tmp/read-backup-userconf.bin")
        luci.sys.exec("rm -rf /tmp/restorecfg;rm -rf /tmp/userconfig")

        filesize = fs.stat("/tmp/read-backup-userconf.bin").size
        backup_max_size = get_partition_size("user%-config")
        if filesize <= 0 or filesize > backup_max_size then
            luci.sys.exec("rm -rf /tmp/ori-backup-userconf.xml /tmp/restore /tmp/read-backup-userconf.bin >/dev/null 2>&1")
            debug.printf("decrypt userconfig failed")
            restore_error("err_failed", "restore")
            return true
        end
		
        local decrypt_userconf = io.open("/tmp/ori-backup-userconf.xml", "r")
        if decrypt_userconf:read(6) == '<?xml 'then
            decrypt_userconf:close()
            configtool.xmlToFile("/tmp/ori-backup-userconf.xml", "/tmp")
            luci.sys.exec("nvrammanager -e -p user-config >/dev/null 2>&1")
            luci.sys.exec("nvrammanager -w /tmp/read-backup-userconf.bin -p user-config >/dev/null 2>&1")
            luci.sys.exec("rm -rf /tmp/ori-backup-userconf.xml /tmp/restore /tmp/read-backup-userconf.bin >/dev/null 2>&1")
            debug.printf("decrypt userconfig success")
        else
            decrypt_userconf:close()
            luci.sys.exec("rm -rf /tmp/ori-backup-userconf.xml /tmp/restore /tmp/read-backup-userconf.bin >/dev/null 2>&1")
            debug.printf("decrypt userconfig failed")
            restore_error("err_failed", "restore")
            return true
        end
    end

    luci.sys.call("[ -f /sbin/board_restore ] && board_restore")

    debug.printf("reboot...")
    fork_reboot()
    return true
end

function config_reboot( ... )
    debug.printf("reboot...")

    local uci_r = require("luci.model.uci").cursor()
    if nixio.fs.access("/etc/config/history_list") then
        uci_r:commit("history_list")
    end

    fork_reboot()
    return true
end

--add by zhangshengbo to make sure led twinkle after flash is written completly during factory reset
function fork_reboot_withled()
    local sys = require "luci.sys"
    local data = { reboot_time = 75 }

    --get reboot time from profile
    data.reboot_time = uci.cursor():get_profile("global", "reboot_time") or 75
    sys.fork_call("sync")
	
	local lp5523_flag = uci_r:get_profile("lp5523", "message")
	if lp5523_flag == "chip-on" then 
		luci.sys.exec("ubus send leds '{\"action\" : \"3\",\"status\" : \"1\"}'")
	else
		luci.sys.exec("ledcli STATUS_SAN")
	end
	
	sys.fork_exec("sleep 2;reboot")
    return data
end

function config_factory(form)
    debug.printf("reset to factory config")
	
    local uci_r = require("luci.model.uci").cursor()
    local accmgnt   = require "luci.model.accountmgnt"
    local complete_flag
    local unbind_ret = true
    local cloud_username = nil
    local cloud_users = accmgnt.get_cloudAccount()
    local cloud_password = nil
    local user = nil
    local accountid = uci_r:get("cloud_config", "device_status", "accountid") or nil
    local bind_status = uci_r:get("cloud_config", "device_status", "bind_status") or "0"
    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind") or "0"
    --local https_client = uci_r:get_profile("cloud", "https_client")
	
    -- set "complete_flag = true" when form is nil , or form isn't nil and form.all is true
    if form == nil then
        complete_flag = true
    elseif form ~= nil and form.all == "true" then
        complete_flag = true
    else
        complete_flag = false
    end

    if #cloud_users ~= 0 then
        cloud_username = cloud_users[1].username
        cloud_password = cloud_users[1].password
    end
	
    debug.print("complete_flag:", complete_flag)
	-- config factory incompletely.
    if complete_flag == false then
        luci.sys.call("cp /etc/config/accountmgnt /tmp/accountmgnt_bak")
    else
        if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
            cloud_account.cloud_unbind()
        end

        --get the unbind result
        uci_r = require("luci.model.uci").cursor()
        bind_status = uci_r:get("cloud_config", "device_status", "bind_status") or "0"
        need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind") or "0"
        accountid = uci_r:get("cloud_config", "device_status", "accountid")
        if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			if accountid then
				unbind_ret = false
			else
                if type(cloud_users) == "table" and #cloud_users ~= 0 then
                    user = cloud_users[1]
                elseif type(cloud_users) ~= "table" then
                    user = cloud_users
                end

				if user then
					unbind_ret = false
				end
			end
		end
	end

	local factory_id
    local ifttt_support = uci_r:get_profile("ifttt", "ifttt_support") or "no"
	if ifttt_support == "yes" then
		factory_id = uci_r:get("ifttt_trigger", "ifttt_config", "factory_id") or "0"
        factory_id = tonumber(factory_id)
	end
	
    file_flash(REBOOT_TIME, "factory")

    configtool.resetconfig()

    if result1 == 0 and result2 == 0 then
        os.execute("nvrammanager -e -p user-config2 >/dev/null 2>&1")
    end

    -- 擦除extern分区, 如有特殊情况的分区，再特殊处理
    local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
    if extern_partitions ~= nil then
        extern_partitions = util.split(extern_partitions, " ")
        for i, v in ipairs(extern_partitions) do
            if v ~= nil then
                os.execute("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
            end
        end
    end

    luci.sys.call("/etc/init.d/logd stop ; logreset")
    luci.sys.call("[ -f /sbin/board_factory ] && board_factory")
    luci.sys.call("[ -f /sbin/mcu_reset ] && mcu_reset")

    configtool.reloadconfig()
    uci_r = require("luci.model.uci").cursor()
    if complete_flag == false then
        luci.sys.call("cp /tmp/accountmgnt_bak /etc/config/accountmgnt")
        uci_r:set("cloud_config", "device_status", "bind_status", bind_status)
        uci_r:set("cloud_config", "device_status", "need_unbind", need_unbind)
        if accountid then
            uci_r:set("cloud_config", "device_status", "accountid", accountid)
        end
        uci_r:factory_commit("cloud_config")
    else
        if unbind_ret == false then 
            uci_r:set("cloud_config", "device_status", "need_unbind", "1")
            if accountid then
                uci_r:set("cloud_config", "device_status", "accountid", accountid)
            else
                accmgnt.set_cloudAccount(cloud_username, cloud_password)
            end

            uci_r:factory_commit("cloud_config")
        end	
    end

        -- factory id should be auto-increment after factory reset.
	if ifttt_support == "yes" then
		factory_id = factory_id + 1
		uci_r:set("ifttt_trigger", "ifttt_config", "factory_id", tostring(factory_id))
		uci_r:factory_commit("ifttt_trigger")
	end

    local portal_support = uci_r:get_profile("portal", "portal_support") or "no"
    if portal_support == "yes" then
        debug.printf("support portal and rm nandflash jpg")
        luci.sys.exec("rm -r " .. LOGO_NANDFLASH_PATH .. " ")
        luci.sys.exec("rm -r " .. BACK_NANDFLASH_PATH .. " ")
    end
	

    --erase user-config and store cloud bind status in /data/factory_status
    --before rebooting which is needed in nand double image
    local flash_type = uci_r:get_profile("global", "flash_type")
    local fp, item
    if flash_type and flash_type == "nand_double_image" then
            fp = io.open("/data/factory_status", "w")
            if fp then
            if complete_flag == false or unbind_ret == false then
                bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
                item = bind_status and "bind_status=" .. bind_status or nil
                if item then
                    fp:write(item..";")
                end
				
                need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
                item = need_unbind and "need_unbind=" .. need_unbind or nil
                if item then
                    fp:write(item..";")
                end
			
                item = cloud_username and "cloud_username=" .. cloud_username or nil
                if item then
                    fp:write(item..";")
                end

                item = cloud_password and "cloud_password=" .. cloud_password or nil
                if item then
                    fp:write(item..";")
                end

                item = accountid and "accountid=" .. accountid or nil
                if item then
                    fp:write(item..";")
                end

                --means not not complete factory and need store local accounts(admin)'s password
                if complete_flag == false then
                    local local_password = accmgnt.get_localPassword()
                    if local_password then
                        fp:write("local_password=".. local_password .. ";")
                    end
                end
            end

            if ifttt_support == "yes" then
                factory_id = uci_r:get("ifttt_trigger", "ifttt_config", "factory_id")
                item = factory_id and "factory_id=" .. factory_id or nil
                if item then
                    fp:write(item..";")
                end
            end

                fp:close()
            end
		debug.printf("erase userconfig")
        configtool.eraseconfig()
    end
	
    debug.printf("reboot...")
    --return fork_reboot()
	return fork_reboot_withled()
end

function upgrade_read( ... )
    local accmgnt   = require "luci.model.accountmgnt"
    local ret = {
        model = configtool.getsysinfo("product_name"), 
        hardware_version = configtool.getsysinfo("HARDVERSION"), 
        firmware_version = configtool.getsysinfo("SOFTVERSION") .. "(" .. string.sub(configtool.getsysinfo("special_id"), 1, 4) .. ")", 
        is_default = uci_r:get("quicksetup", "quicksetup", "to_show") == 'true' or false,
        upgraded = uci_r:get("quicksetup", "quicksetup", "upgraded") == 'true' or false,
        totaltime = REBOOT_TIME,
        upgradetime = UPGRADE_TIME
    }

    local quicksetup_show = uci_r:get("quicksetup", "quicksetup", "to_show")
    if quicksetup_show == 'true' then
        uci_r:set("quicksetup", "quicksetup", "to_show", 'false') 
        uci_r:commit("quicksetup")
    end
    return ret
end

function upgrade_write(http_form)
	local upgraded = uci_r:get("quicksetup", "quicksetup", "upgraded") or nil
	if upgraded ~= http_form.upgraded then
		uci_r:set("quicksetup", "quicksetup", "upgraded", http_form.upgraded)
		uci_r:commit("quicksetup")
	end

    return true      
end

function auto_upgrade_read_pre()
	local ret = {
		enable = uci_r:get("auto_upgrade", "upgrade", "enable") or "off",
		time = uci_r:get("auto_upgrade", "upgrade", "time") or "03:00",
		delay = uci_r:get("auto_upgrade", "upgrade", "delay") or "0"
	}
	return ret
end

function auto_upgrade_read()
	local ret = auto_upgrade_read_pre()
--	if ret.delay == '1' then
--		uci_r:set("auto_upgrade", "upgrade", "delay", '0')
--		uci_r:commit("auto_upgrade")
--	end
	return ret
end

function auto_upgrade_write(http_form)
	local old_data = auto_upgrade_read_pre()
	uci_r:set("auto_upgrade", "upgrade", "enable", http_form.enable or old_data.enable)
	uci_r:set("auto_upgrade", "upgrade", "time", http_form.time or old_data.time)
	--uci_r:set("auto_upgrade", "upgrade", "delay", '0')
	uci_r:commit("auto_upgrade")
	sys.fork_exec("/etc/init.d/auto_upgrade restart")


	local systime_type = uci_r:get("system", "ntp", "type") or "auto"
	local auto_upgrade_to_set = http_form.enable or old_data.enable
	if auto_upgrade_to_set == "on"  and systime_type ~= "auto" then
		uci_r:set("system", "ntp", "type", "auto")
		uci_r:commit("system")

		-- ntpd & wireless_schedule restart
		local wireless_schedule = require "luci.controller.admin.wireless"
		local sche_tbl = {}
		local sche_en = uci_r:get("wireless_schedule","set","enable") or "off"
		-- enable by timesetting
		local sche_onoff_byts = uci_r:get("wireless_schedule", "set", "enable_byts")

        sys.fork_exec("env -i /etc/init.d/sysntpd restart >/dev/null")
		if sche_en == "off" and sche_onoff_byts and sche_onoff_byts == "off" then
			sche_tbl.enable = "on"
			wireless_schedule.wireless_schedule_set_all(sche_tbl)
			uci_r:set("wireless_schedule", "set", "enable_byts", "on")
			uci_r:commit("wireless_schedule")
		end
	end

	return auto_upgrade_read_pre()
end


function tmp_auto_upgrade_read()
	local ret = {
		enable = uci_r:get("auto_upgrade", "upgrade", "enable") or "off",
		updateTime = uci_r:get("auto_upgrade", "upgrade", "time") or "3",
	}
	return ret
end

function tmp_auto_upgrade_write(http_form)
	local old_data = tmp_auto_upgrade_read()
	uci_r:set("auto_upgrade", "upgrade", "enable", http_form.enable or old_data.enable)
	uci_r:set("auto_upgrade", "upgrade", "time", http_form.updateTime or old_data.updateTime)
	uci_r:commit("auto_upgrade")
	sys.fork_exec("/etc/init.d/auto_upgrade restart")

	local systime_type = uci_r:get("system", "ntp", "type") or "auto"
	local auto_upgrade_to_set = http_form.enable or old_data.enable
	if auto_upgrade_to_set == "on"  and systime_type ~= "auto" then
		uci_r:set("system", "ntp", "type", "auto")
		uci_r:commit("system")
		-- ntpd & wireless_schedule restart
		local wireless_schedule = require "luci.controller.admin.wireless"
		local sche_tbl = {}
		local sche_en = uci_r:get("wireless_schedule","set","enable") or "off"
		-- enable by timesetting
		local sche_onoff_byts = uci_r:get("wireless_schedule", "set", "enable_byts")

        sys.fork_exec("env -i /etc/init.d/sysntpd restart >/dev/null")
		if sche_en == "off" and sche_onoff_byts and sche_onoff_byts == "off" then
			sche_tbl.enable = "on"
			wireless_schedule.wireless_schedule_set_all(sche_tbl)
			uci_r:set("wireless_schedule", "set", "enable_byts", "on")
			uci_r:commit("wireless_schedule")
		end
	end


	return tmp_auto_upgrade_read()
end


function set_download_inf(dl_percent)
	local uci_r = require("luci.model.uci").cursor()
	if tonumber(dl_percent) >= 100 then
		uci_r:delete("cloud_config", "new_firmware")
		uci_r:delete("cloud_config", "upgrade_info")
		uci_r:set("cloud_config", "new_firmware", "cloud_push")
		uci_r:set("cloud_config", "upgrade_info", "cloud_reply")
		uci_r:set("wportal", "upgrade", "enable", "yes")
		uci_r:set("wportal", "upgrade", "time", "0")
		uci_r:set("cloud_config", "info", "show_flag", "0")
		uci_r:set("cloud_config", "info", "tcsp_status", "0")
		uci_r:commit("cloud_config")
		--sys.fork_exec(". /lib/wportal/wportal.sh && wportalctrl_clear_all")
	end
end

function get_upgrade_detail(processcmd)	
    local ret
    local ubus = require "ubus"
    local _ubus = ubus.connect()
    local UBUS_OBJECT = "nvram_ubus"
    local fwup_percent  = _ubus:call(UBUS_OBJECT, "getFwupPercent", {})
    local percent
	--added by zhangshengbo
	local lp5523_flag = uci_r:get_profile("lp5523","message")
	local online_status = 2

    if fwup_percent ~= nil then
        percent = fwup_percent.percent
        update_fwuppercent(percent, "flash")
		
        if percent < 0 then
            return false, "err_failed"
        end
		
        if nixio.fs.access("/tmp/firmware_status.lua") then
            dofile("/tmp/firmware_status.lua")
            ret = check_status
        else
            return true, percent
        end
		
        if nixio.fs.access("/tmp/reboot_flag.lua") then
            dofile("/tmp/reboot_flag.lua")
            flag = check_status.reboot
        end
		
        if tonumber(flag) == 1 then
            return ret, percent
        end
		
        if percent >= 100 and processcmd then
            update_rebootflag(1, "reboot")
            debug.printf("upgrade true")
            debug.printf("reboot...")
            --nvramanager会自动重启
            --sys.fork_exec("sleep 2;reboot")
            --if small_mem == "yes" then
                -- 5秒后通过内核尝试重启，避免用户态的reboot系统调用失败而无法重启
            --    sys.fork_exec("sleep 5; [ -f /proc/sys/kernel/reboot ] && echo 1 > /proc/sys/kernel/reboot")
            --end
        end

        return ret, percent
    else
        debug.printf("upgrade false")
		--changed by zhangshengbo
		if lp5523_flag == "chip-on" then 
			sys.fork_exec("ubus send leds '{\"action\" : \"3\",\"status\" : \"8\"}'")
		else
			sys.fork_exec("ledcli STATUS_ON")
		end
        return false, "err_failed"
    end
end

function upgrade_fwup_check( ... )
	return get_upgrade_detail(true)
end

function upgrade_firmware( ... )
    debug.printf("upgrade firmware...")
	--added by zhangshengbo
	local lp5523_flag = uci_r:get_profile("lp5523","message")

	--if lp5523_flag == "chip-on" then 
	--	sys.fork_exec("ubus send leds '{\"action\" : \"3\",\"status\" : \"0\"}'")
	--end

    luci.http.prepare_content("text/html")

    if nixio.fs.access(IMAGE_TMP_PATH) then
        local ret = fmup.upd_fm(IMAGE_TMP_PATH)
        if ret ~= 0 then
            return false
        end	
    else
		--changed by zhangshengbo
		if lp5523_flag == "chip-on" then
			sys.fork_exec("ubus send leds '{\"action\" : \"3\",\"status\" : \"8\"}'")
		else	
			sys.fork_exec("ledcli STATUS_ON")
		end
			debug.printf("false")
    end

    return true
end

function utfstrlen(str)
    local len = #str;
    local left = len;
    local cnt = 0;
    local arr={0,0xc0,0xe0,0xf0,0xf8,0xfc};
    while left ~= 0 do
        local tmp=string.byte(str,-left);
        local i=#arr;
        while arr[i] do
            if tmp>=arr[i] then
                left=left-i;
                break;
            end
            i=i-1;
        end
        cnt=cnt+1;
    end
    return cnt;
end

function GetShortName(sName,nMaxCount,nShowCount)
    if sName == nil or nMaxCount == nil then
        return
    end
	
    local sStr = sName
    local tCode = {}
    local tName = {}
    local nLenInByte = #sStr
    local nWidth = 0
	
    if nShowCount == nil then
        nShowCount = nMaxCount - 3
    end
	
    for i=1,nLenInByte do
        local curByte = string.byte(sStr, i)
        local byteCount = 0;

        if curByte>0 and curByte<=127 then
            byteCount = 1
        elseif curByte>=192 and curByte<=223 then
            byteCount = 2
        elseif curByte>=224 and curByte<=239 then
            byteCount = 3
        elseif curByte>=240 and curByte<=247 then
            byteCount = 4
        elseif curByte>=248 and curByte<=251 then
            byteCount = 5
        elseif curByte>=252 and curByte<=253 then
            byteCount = 6
        end

        local char = nil

        if byteCount > 0 then
            char = string.sub(sStr, i, i+byteCount-1)
            i = i + byteCount -1
        end

        if byteCount >= 1 then
            nWidth = nWidth + 1
            table.insert(tName,char)
            table.insert(tCode,1)
        end
    end
	
    if nWidth >= nMaxCount then
        local _sN = ""
        local _len = 3
		
        for i=1,#tName do
            _sN = _sN .. tName[i]
            if _len > nShowCount then
                break
            end
            _len = _len + tCode[i]
        end
        sName = _sN .. "..."
    end
    return sName
end

function tmp_get_firmware_info(lua_form)
    local needToCheck = tonumber(lua_form.needToCheck)
    local cloud = require "luci.controller.admin.cloud_account"
    if needToCheck == 1 then
        sys.call("cloud_getFwList")
    end

    local data = {}
    local uci_r = uci.cursor()
    local configtool = require "luci.sys.config"
    data.name = configtool.getsysinfo("product_name") or ""
    data.version = uci_r:get("cloud_config", "upgrade_info", "version") or ""
    if data.version == "" then
        data.version = configtool.getsysinfo("SOFTVERSION") or ""
    end
    local releaseNote = uci_r:get("cloud_config", "upgrade_info", "release_log") or ""

    releaseNote = GetShortName(releaseNote,800)

    data.releaseNote = nixio.bin.b64encode(releaseNote)
    data.isLatest = uci_r:get("cloud_config", "new_firmware", "fw_new_notify") or "0"
    data.upgradeLevel = uci_r:get("cloud_config", "upgrade_info", "type") or "0"
    return data
end

local function detect_download_status(processcmd)
    local cloud_account = require "luci.controller.admin.cloud_account"
    local ret = cloud_account.get_download_detail(processcmd)
    if not ret then
        -- Remove flag, accept next try.
        os.execute("rm -f /tmp/firmware_lock.lua")
        return 0, false
    end
    return ret.percent, true
end

local function detect_upgrade_status(processcmd)
    local success
    local percent
    success, percent = get_upgrade_detail(processcmd)
    return percent, success
end

function fw_check_loop()
    local null = nixio.open("/dev/null", "w+")
	
    if null then
        nixio.dup(null, nixio.stderr)
        nixio.dup(null, nixio.stdout)
        nixio.dup(null, nixio.stdin)
        if null:fileno() > 2 then
            null:close()
        end
    end

    local percent = "0"
    local success = true
    sys.call("sleep 3")
    --download 轮询，以及时激活升级
    while true do
        percent, success = detect_download_status(false)
        if success == false then
            return
        end
        if tonumber(percent) >= 100 then
            sys.call("sleep 3")
            break
        end
        sys.call("sleep 3")
    end
    sys.call("sleep 3")
    local ret = fmup.upd_fm(DOWNLOAD_FW_NAME)
    if ret == false then
        return false
    end
    
    return true
end

--[[由于手机端的实现要求只要点击过upgrade按钮，之后就算手机断开也要upgrade成功，因此修改upgrade逻辑：
    在选择了upgrade之后，先执行下载，然后fork一个进程，3秒轮询，调用正常的下载命令。
	    ps：正常的下载命令在下载到达100%以后才会主动调用升级进程。
	在获取到下载程度达到100%以后，进行3秒轮询，调用正常的upgrade命令。
	    ps：正常的升级固件命令在达到100%以后才会主动调用reboot。
]]--

function fw_upgrade()
	local cloud_account = require "luci.controller.admin.cloud_account"
    if false == cloud_account.cloud_fw_upgrade() then
        return false, "illegel download url"
    end

	local percent = cloud_account.get_download_progress(DOWNLOAD_FW_NAME)

	--轮询
	local pid = nixio.fork()
	if pid == 0 then
		fw_check_loop()
	end
 	return true, percent
end


function tmp_upgrade_firmware()
	local cloud_account = require "luci.controller.admin.cloud_account"
	local internet_access = cloud_account.check_internet()
	if internet_access == false then 
		return false
	end

    return fw_upgrade()
end

function tmp_get_upgrade_info()
	local cloud_account = require "luci.controller.admin.cloud_account"
	local status = "idle"
	local process = "0"
	local data = {}

	local ret, errorcode, faildata = cloud_account.get_download_detail(false)
	
	if not ret and tonumber(faildata.percent) < 100 then
		status = "fail"
		process = "0"
        -- Remove flag, accept next try.
        os.execute("rm -f /tmp/firmware_lock.lua")
	else
		status = "downloading"
		process = tostring(ret.percent)
	end
	local AUTO_UPDATE_LOCKFILE = "/tmp/auto_update_lock.lua"
	if nixio.fs.access(AUTO_UPDATE_LOCKFILE) then
		status = "upgrading"
	end
	
	data.status = status
	data.process = process
	data.upgradeTime = UPGRADE_TIME
	data.rebootTime = REBOOT_TIME
	return data
end

local dispatch_tbl = {
    config = {
        ["read"]        = { cb = config_read },
        ["check"]       = { cb = config_check },
        ["backup"]      = { cb = config_backup },
        ["restore"]     = { cb = config_restore, own_response = true },
        ["reboot"]      = { cb = config_reboot },
        ["factory"]     = { cb = config_factory }
    },
    config_multipart = {
        ["read"]    = { cb = config_read },
        ["backup"]  = { cb = config_backup },
        ["restore"] = { cb = config_restore, own_response = true }
    },
    upgrade = {
        ["read"]        = { cb = upgrade_read },
        ["write"]       = { cb = upgrade_write },
        ["fwup_check"]  = { cb = upgrade_fwup_check },
        ["firmware"]    = { cb = upgrade_firmware, own_response = true }
    },
    save_upgrade = {
        ["read"]        = { cb = upgrade_read },
        ["firmware"]	= { cb = upgrade_firmware, own_response = true }
    },
    auto_upgrade = {
        ["read"]        = { cb = auto_upgrade_read },
        ["write"]	= { cb = auto_upgrade_write, own_response = true }
    },
    tmp_auto_upgrade = {
        ["read"]        = { cb = tmp_auto_upgrade_read },
        ["write"]	= { cb = tmp_auto_upgrade_write, own_response = true }
    },		
    tmp_cmd = {
    	["get_firmware_info"] = { cb = tmp_get_firmware_info },
    	["upgrade_firmware"] = { cb = tmp_upgrade_firmware },
    	["get_upgrade_info"] = { cb = tmp_get_upgrade_info }
    }
}

function dispatch(http_form)
    local function hook_cb(success, action)
        if success and action.cmd then
            sys.fork_exec(action.cmd)
        end
        return true
    end
    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook_cb})
end

function _index()
    --according to nvrammanager sysUpfirmware.h, set maximum file size
    local upgrade_flash_size = uci_r:get_profile("firmware_upgrade","upgrade_flash_size") or 0x2000000
    local maximumFileSize = upgrade_flash_size + 0x800 + 0x1000 + 0x10 + 0x04 
    local rejectOneTime = 0
    local fp
    local firmwareFileName
    uploadFileSize = 0

    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not fp then
                file_flash(REBOOT_TIME, "upload")
                if meta and meta.name == "image" then
                    -- NOTE: if firmware is uprading, just return false.
                    if not nixio.fs.access(firmware_lock) then
                        -- NOTE: Set flag, avoid repeated uprades. 
                        fmup.upgrade_type("local")
                        firmwareFileName = IMAGE_TMP_PATH
                    end
                else
                    if result1 == 0 and result2 == 0 then
                        firmwareFileName = CONFIG_TMP_PATH_2
                    else
                        firmwareFileName = CONFIG_TMP_PATH_1
                    end
                end
                fp = io.open(firmwareFileName, "w")
                uploadFileSize = 0
            end
            if fp and chunk then
                uploadFileSize = uploadFileSize + #chunk
                if uploadFileSize <= maximumFileSize then
                    fp:write(chunk)
                else
                    if 0 == rejectOneTime then
                        --[[
                            echo fail to tmp file only once,
                            if input file size is too large, 
                            it may be block by other module,
                            so add fail flag and 
                            remove upload file in this place.
                        ]]--
                        fp:close()
                        os.execute("rm -f "..firmwareFileName)
                        fp = io.open(firmwareFileName, "w")
                        rejectOneTime = 1
                        -- Remove flag, accept next try.
                        os.execute("rm -f /tmp/firmware_lock.lua")
                    end
                end
            end
            if fp and eof then
                fp:close()
            end
        end
    )

    return ctl._index(dispatch)
end

function index()
    entry({"admin", "firmware"}, call("_index")).leaf = true
end
