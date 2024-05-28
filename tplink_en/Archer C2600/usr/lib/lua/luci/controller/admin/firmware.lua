--[[Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  firmware.lua
Details :  firmware http response operation
Author  :  He Ye  <heye@tp-link.net>
Version :  1.0.0
Date    :  27Mar, 2014
]]--

local uci       = require "luci.model.uci"
local http      = require "luci.http"
local debug     = require "luci.tools.debug"
local parttbl   = require "luci.tools.parttbl"
local sys       = require "luci.sys"
local nixio     = require "nixio"
local ctl       = require "luci.model.controller"
local cfgtool   = require "luci.sys.config"
local util       = require "luci.util"

module("luci.controller.admin.firmware", package.seeall)

local uci_r = uci.cursor()

local FIRMWARE_STATUS_TBL = {success = "747401", file_size_failed = "747402", file_content_failed = "747403", resore_success = "747404", locking = "747405"}
local FIRMWARE_STATUS_FILE = "/tmp/firmware_laststatus.log"
local FIRMWARE_LOCK_FILE = "/tmp/firmware.lock"
local FIRMWARE_SUCCESS_FILE = "/tmp/firmware.success"

local MODEL = cfgtool.getsysinfo("product_name") or "Archer C2600"
local REBOOT_TIME = uci_r:get_profile("global", "reboot_time") or 75
local UPGRADE_TIME = uci_r:get_profile("global", "upgrade_time") or 210

function index()
    entry({"admin", "firmware"}, call("firmware_index")).leaf = true
end

local function image_supported()
    -- XXX: yay...
    return ( 0 == os.execute(
        ". /lib/functions.sh; " ..
        "include /lib/upgrade; " ..
        "platform_check_image %q >/dev/null"
            % image_tmp
    ) )
end

local function write_json(data)
    http.prepare_content("text/html")
    http.write_json(data)
end

local function ret_json(suc, code, d)
    return {success = suc, errorcode = code, data = d}
end

local function get_mtd( part_name )
    local string  = require "string"
    
    local file    = io.input("/proc/mtd")

    while true do
        local lines = file:read("*line")
        if not lines then return nil end
        if string.match(lines, '%"' .. part_name .. '%"') then
            return string.match(lines, "mtd%d+")
        end
    end
end

local function image_check(filepath)

    local cry = require "luci.model.crypto"

    if nixio.fs.access(filepath) then
        luci.sys.exec('mkdir /tmp/check')
        luci.sys.exec("tail -c +34 " .. filepath .. " > /tmp/check/check.cry")
        luci.sys.exec('head -c 32 ' .. filepath .. ' > /tmp/check/check.md5')
        luci.sys.exec('echo "  /tmp/check/check.cry" >> /tmp/check/check.md5')

        local result = luci.sys.call('md5sum -c /tmp/check/check.md5 >/dev/null 2>&1')
        if result ~= 0 then
            debug.printf("error:check first md5 failed:" .. tostring(result))
            luci.sys.exec("rm /tmp/check -rf >/dev/null 2&1")
            return false
        end

        debug.printf("decry")
        local cryfunc = cry.dec_file("/tmp/check/check.cry", "777")
        cry.dump_to_file(cryfunc,"/tmp/check/check.tar")

        debug.printf("untar")
        result = luci.sys.call("tar -xvf /tmp/check/check.tar -C /tmp/check/ >/dev/null 2>&1")
        if result ~= 0 then
                        debug.printf("error:untar fail:".. result)
            luci.sys.exec("rm /tmp/check -rf >/dev/null 2&1")
                        return false
                end
        
        debug.printf("image_check")
        if nixio.fs.access("/tmp/check/check") then
            result = luci.sys.call("cd /tmp/check;md5sum -c check >/dev/null 2>&1;cd -")

            if result == 0 then
                -- debug.printf("success")
                luci.sys.exec("rm /tmp/check/check* -rf >/dev/null 2>&1")
                return true
            else
                debug.printf("result:" .. tostring(result))
    --                      debug.printf("error:check second md5 failed")
                luci.sys.exec("rm /tmp/check -rf >/dev/null 2&1")
                            return false
            end
        else
            debug.printf("error:no target file")
            luci.sys.exec("rm /tmp/check -rf >/dev/null 2&1")
            return false
        end
    end
end

local function storage_size()
    local size = 0
    if nixio.fs.access("/proc/mtd") then
        for l in io.lines("/proc/mtd") do
            local d, s, e, n = l:match('^([^%s]+)%s+([^%s]+)%s+([^%s]+)%s+"([^%s]+)"')
            if n == "linux" or n == "firmware" then
                size = tonumber(s, 16)
                break
            end
        end
    elseif nixio.fs.access("/proc/partitions") then
        for l in io.lines("/proc/partitions") do
            local x, y, b, n = l:match('^%s*(%d+)%s+(%d+)%s+([^%s]+)%s+([^%s]+)')
            if b and n and not n:match('[0-9]') then
                size = tonumber(b) * 1024
                break
            end
        end
    end
    return size
end



function ltn12_popen(command)

        local fdi, fdo = nixio.pipe()
        local pid = nixio.fork()

        if pid > 0 then
                fdo:close()
                local close
                return function()
                        local buffer = fdi:read(2048)
                        local wpid, stat = nixio.waitpid(pid, "nohang")
                        if not close and wpid and stat == "exited" then
                                close = true
                        end

                        if buffer and #buffer > 0 then
                                return buffer
                        elseif close then
                                fdi:close()
                                return nil
                        end
                end
        elseif pid == 0 then
                nixio.dup(fdo, nixio.stdout)
                fdi:close()
                fdo:close()
                nixio.exec("/bin/sh", "-c", command)
        end
end

function fork_exec(command)
        local pid = nixio.fork()
        if pid > 0 then
                return
        elseif pid == 0 then
                -- change to root dir
                nixio.chdir("/")

                -- patch stdin, out, err to /dev/null
                local null = nixio.open("/dev/null", "w+")
                if null then
                        nixio.dup(null, nixio.stderr)
                        nixio.dup(null, nixio.stdout)
                        nixio.dup(null, nixio.stdin)
                        if null:fileno() > 2 then
                                null:close()
                        end
                end

                -- replace with target command
                nixio.exec("/bin/sh", "-c", command)
        end
end

function fork_reboot()
    fork_exec("sleep 1;reboot")
end

function file_flash(suc, code, totaltime, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd   = "check_status = {success = %s, errorcode = \"%s\", data = {totaltime=%d, ops=\"%s\"}}\n"
    file:write(string.format(check_cmd, suc, code, totaltime, ops))
    file:close()
end

function update_fwuppercent(suc, code, percent, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd   = "check_status = {success = %s, errorcode = \"%s\", data = {percent=%d, ops=\"%s\"}}\n"
    file:write(string.format(check_cmd, suc, code, percent, ops))
    file:close()
end

function mtd_update_all(parttbl_check)
    local cmd = "echo 'updating...' >/dev/console;cd /tmp/check;mtd erase flash_ipq806x;"
    needreboot = 1
    for i,part_info in ipairs(parttbl_check.part) do
        local part_name   = part_info.name:gsub("0:","")
        part_name = part_name:match('([%w_]+)')
        local part_offset = tostring(part_info.offset - parttbl_check.boardinfo_end)
        if nixio.fs.access("/tmp/check/" .. part_name) then
            if string.find(part_name,"parttbl\0") == nil then
                cmd = cmd .. "mtd write " .. part_name .. " flash_ipq806x" .. " -n -p " .. part_offset .. ";"
            end
        end
    end

    cmd = cmd .. "mtd erase parttbl;mtd write parttbl parttbl;echo 'reboot...' >/dev/console;reboot"
    return cmd, needreboot
end

function mtd_update_sep(parttbl_check)  
    local partitions = {"boardinfo","profile","defconf","softinfo","userconf","HLOS","extern","webpage","log"}
    for i,part_name in ipairs(partitions) do
        if nixio.fs.access("/tmp/check/" .. part_name) then
            needreboot = 1
            sys.fork_exec("mtd erase "..part_name..";mtd write /tmp/check/"..part_name.." "..part_name.." -q -n;rm /tmp/check/" .. part_name)
        end
    end

    if nixio.fs.access("/tmp/check/rootfs") then
        debug.printf("upgrade rootfs")
        needreboot = 0
        -- once rootfs is erase,luci cann't action any more,so need to reboot
        sys.fork_exec("cd /tmp/check;mtd erase rootfs;mtd write rootfs rootfs -q -n; echo 'reboot...' >/dev/console;reboot")
    end
    
    debug.printf("upgrade end")
    if needreboot == 1 then
        debug.printf("reboot...")
        fork_reboot()
    end

    if checkerror == 1 then
        file_flash("false", "err_check", total, "reboot")
    end

    return needreboot
end

function find_default_ip()
    local defaultcfg
    local head,tail,value
    
    --get default ip
    os.execute("nvrammanager -r /tmp/default-config.xml -p  default-config  >/dev/null 2>&1")
    local fp = io.open("/tmp/default-config.xml",'r')
    defaultcfg = fp:read("*a")
    fp:close()
    os.execute("rm -f /tmp/default-config.xml >/dev/null 2>&1")
    
    head="<interface name=\"lan\">"
    tail="</interface>"
    _,_,value=string.find(defaultcfg, head.."(.-)"..tail)
    
    head="<ipaddr>"
    tail="</ipaddr>"
    _,_,value=string.find(value, head.."(.-)"..tail)
    
    return value
end

function find_userconfig_ip()
    local usercfg
    local head,tail,value
    --get user-config lan ip
    os.execute("nvrammanager -r /tmp/user-config.xml -p  user-config  >/dev/null 2>&1")
    local fp = io.open("/tmp/user-config.xml",'r')
    usercfg = fp:read("*a")
    fp:close()
    os.execute("rm -f /tmp/user-config.xml >/dev/null 2>&1")
    
    local i,j
    j = 0
    --prevent multiple <interface name="lan"></interface>, use while here
    while true do
        head="<interface name=\"lan\">"
        tail="</interface>"
        i,j,value=string.find(usercfg, head.."(.-)"..tail, j)
        if i == nil or j == nil then break end
        head="<ipaddr>"
        tail="</ipaddr>"
        _,_,value=string.find(value, head.."(.-)"..tail)
        if value ~= nil then 
            return value
        end
    end
    return nil
end

local function write_status_to_file(str)
    local fd = io.open(FIRMWARE_STATUS_FILE, "w")
    if type(str) == "string" then
        fd:write(str .. "\n")
    end
    fd:close()
end

local function read_status_form_file()
    local str = ""
    local fd = io.open(FIRMWARE_STATUS_FILE, "r")
    if nil ~= fd then
        str = fd:read("*line")
    end
    return str
end

local function write_lock_to_file() 
    local fd = io.open(FIRMWARE_LOCK_FILE, "w")
    if fd ~= nil then
        fd:write(MODEL.."\n")
        fd:close()
    end
end

local function check_lock_file()
    if nixio.fs.access(FIRMWARE_LOCK_FILE) then
        return true
    else
        return false
    end
end

local function remove_lock_from_file()
    if nixio.fs.access(FIRMWARE_LOCK_FILE) then
        nixio.fs.unlink(FIRMWARE_LOCK_FILE)
    end
end

local function write_success_to_file()
    local fd = io.open(FIRMWARE_SUCCESS_FILE, "w")
    if fd ~= nil then
        fd:write(MODEL.."\n")
        fd:close()
    end
end

local function check_success_file()
    if nixio.fs.access(FIRMWARE_SUCCESS_FILE) then
        return true
    else
        return false
    end
end

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

function firmware_index()
    local sys = require "luci.sys"
    local fs  = require "luci.fs"

    local upgrade_avail = nixio.fs.access("/lib/upgrade/platform.sh")
    local reset_avail   = os.execute([[grep '"rootfs_data"' /proc/mtd >/dev/null 2>&1]]) == 0

    local restore_cmd = "tar -xzC/ >/dev/null 2>&1"
    local backup_cmd  = "sysupgrade --create-backup - 2>/dev/null"
    --local image_tmp   = "/tmp/firmware.tar"
    local image_tmp   = "/tmp/firmware.bin"
    local config_tmp = "/tmp/config.bin"
    --reboot_time
    local total = 180
    local backup_restore_total = 75
    local percent

    local ret
    --get file
    local fp
    
    local uploadFileSize = 0
    
    --according to nvrammanager sysUpfirmware.h, set maximum file size
    local maximumFileSize = 0x2000000 + 0x1000 + 0x10 + 0x04 
    local rejectOneTime = 0
    local firmwareFileName
    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not check_lock_file() then
                if not fp then
                    file_flash("true", "", total, "upload") 
                    if meta and meta.name == "image" then
                    --  debug.printf("open file image") 
                    --  debug.printf(os.clock())
                        firmwareFileName = image_tmp  
                    else
                    --  fp = io.popen(restore_cmd, "w")
                        firmwareFileName = config_tmp
                    --  debug.printf("open file config")
                    end
                    fp = io.open(firmwareFileName, "w")
                    uploadFileSize = 0
                end
                if chunk then
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
                            write_status_to_file(FIRMWARE_STATUS_TBL.file_size_failed)
                            fp:close()
                            os.execute("rm "..firmwareFileName)
                            fp = io.open(firmwareFileName, "w")
                            rejectOneTime = 1
                        end
                    end
                --  debug.printf(".")
                --    fp:write(chunk)
                end
                if eof then
                    fp:close()
                --  debug.printf("close file")
                --  debug.printf(os.clock())
                end
            end
        end
    )

    local operation = luci.http.formvalue("operation")
    local form = luci.http.formvalue("form")
    
    --print info
--[[    if operation then
        debug.printf("opration:" .. operation)
    end]]--

    local configtool = require "luci.sys.config"

    local action = {
        ["read"]      = function()
                    if form == "upgrade" then
                        --remove last result file
                        os.execute("rm -f "..FIRMWARE_STATUS_FILE.." >/dev/null 2>&1")
                        ret = ret_json(true,"", 
                                {hardware_version = configtool.getsysinfo("HARDVERSION"), 
                                firmware_version = configtool.getsysinfo("SOFTVERSION"), 
                                is_default = configtool.isdftconfig(),
                                reboot_time = REBOOT_TIME,
								upgradetime = UPGRADE_TIME})
                    elseif form == "config" then
                        --remove last result file
                        os.execute("rm -f "..FIRMWARE_STATUS_FILE.." >/dev/null 2>&1")
                        ret = ret_json(true,"",{totaltime = backup_restore_total})
                    else
                        ret = ret_json(false,"not exist","")
                    end
                end,
        ["check"]     = function()
                    if nixio.fs.access("/tmp/firmware_status.lua") then
                        dofile("/tmp/firmware_status.lua")
                        ret = check_status
                    else
                        ret = ret_json(true,"","")
                        return
                    end
                end,        
        ["fwup_check"]     = function()
                    local ubus = require "ubus"
                    local _ubus = ubus.connect()
                    local UBUS_OBJECT = "nvram_ubus"
                    local fwup_percent  = _ubus:call(UBUS_OBJECT, "getFwupPercent", {})
                    if fwup_percent ~= nil then
                        percent = fwup_percent.percent
                        
                        if percent >= 0 then
                            --debug.printf("=======fwup_check==========percent = " .. percent)
                            update_fwuppercent("true", "", percent, "flash")
                                
                            if nixio.fs.access("/tmp/firmware_status.lua") then
                                dofile("/tmp/firmware_status.lua")
                                ret = check_status
                            else
                                ret = ret_json(true,"","")
                                return
                            end
                        else
                            --nvrammanager detect error, release lock.
                            remove_lock_from_file()
                            write_status_to_file(FIRMWARE_STATUS_TBL.file_size_failed)
                            ret = ret_json(false, "err_form", "")
                        end
                        
                        if percent == 100 then
                            debug.printf("reboot...")
                            --Write success status to a file in order to prevent nvrammanager exiting.
                            write_success_to_file()
                            --fork_reboot()
                        end
                    else
                        if read_status_form_file() == FIRMWARE_STATUS_TBL.file_size_failed then
                            ret = ret_json(false, "err_form", "")
                        elseif not check_success_file() then
                            ret = ret_json(false, "permission denied", "")
                        else
                            --upgrade done but nvrammanager killed.
                            debug.printf("reboot!!!")
                            update_fwuppercent("true", "", 100, "flash")
                            if nixio.fs.access("/tmp/firmware_status.lua") then
                                dofile("/tmp/firmware_status.lua")
                                ret = check_status
                            else
                                ret = ret_json(true,"","")
                                return
                            end
                        end
                    end
                end,        
        ["reboot"]    = function()
                    ret = ret_json(true,"",true)
                    debug.printf("reboot...")
                    fork_reboot()
                end,
        ["factory"]   = function()
                    debug.printf("reset to factory config")
                    luci.sys.call("ledcli led_all_on")
                    --ret = ret_json(true ,"","")
                    local ipaddr = find_default_ip()
                    ret = ret_json(true ,"",{
                    default_ip = ipaddr
                    })
            
                    configtool.resetconfig()
                    
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
                    
                    --call board related factory shell
                    luci.sys.call("[ -f /sbin/board_factory ] && board_factory")
                    debug.printf("reboot...")
                    fork_reboot()
                end,
        ["backup"]    = function()
                    --luci.sys.exec("cat /dev/".. get_mtd("userconf") .. " > /tmp/backup")
                    -- 备份extern分区, 如有特殊情况的分区，再特殊处理
                    local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
                    if extern_partitions ~= nil then
                           extern_partitions = util.split(extern_partitions, " ")
                           os.execute("mkdir /tmp/backupfolder >/dev/null 2>&1")
            
                           for i, v in ipairs(extern_partitions) do
                               if v ~= nil then
                                   luci.sys.exec("nvrammanager -r /tmp/backupfolder/ori-backup-" .. v .. ".bin -p " .. v .. " >/dev/null 2>&1")
                               end
                           end
            
                           --打包
                           luci.sys.exec("nvrammanager -r /tmp/backupfolder/ori-backup-user-config.bin -p user-config >/dev/null 2>&1")
                           os.execute("tar -cf /tmp/backup -C /tmp/backupfolder . >/dev/null 2>&1")
                           luci.sys.exec("rm -rf /tmp/backupfolder >/dev/null 2>&1")
                    else
                        luci.sys.exec("nvrammanager -r /tmp/backup -p  user-config   >/dev/null 2>&1")
                    end

                    debug.printf("encry")
                    local cry = require "luci.model.crypto"
                    local cryfunc1 = cry.enc_file("/tmp/backup", MODEL)
                    cry.dump_to_file(cryfunc1,"/tmp/backup.cry")
                    
                    local reader = ltn12_popen("cat /tmp/backup.cry")
                    luci.http.header('Content-Disposition', 'attachment; filename="backup-%s-%s.bin"' % {
                        luci.sys.hostname(), os.date("%Y-%m-%d")})
                    luci.http.prepare_content("application/x-bin")
                    luci.ltn12.pump.all(reader, luci.http.write)
                    luci.sys.exec("rm /tmp/backup")
                    --delete cry files
                    luci.sys.exec("rm /tmp/backup.cry")     
                    write_status_to_file(FIRMWARE_STATUS_TBL.success)                  
                    return    
                end,
        ["restore"]   = function()
                    local cry = require "luci.model.crypto"
                    local fs  = require "luci.fs"
                    local BACKUP_ORIGIN_FILENAME = "/tmp/backup"
                    local BACKUP_PARTITION_MATCHNAME = "user%-config"
                    local BACKUP_PARTITION_NAME = "user-config"
                    -- 恢复extern分区, 如有特殊情况的分区，再特殊处理
                    local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
                    if extern_partitions ~= nil then
                        extern_partitions = util.split(extern_partitions, " ")
                        if uploadFileSize < 600000 then
                            debug.printf("decry")
                            local cryfunc1 = cry.dec_file(config_tmp, MODEL)
                            cry.dump_to_file(cryfunc1, BACKUP_ORIGIN_FILENAME)

                            os.execute("mkdir /tmp/restore >/dev/null 2>&1")
                            --解压
                            os.execute("tar -xf "..BACKUP_ORIGIN_FILENAME.." -C /tmp/restore >/dev/null 2>&1")
            
                            for i, v in ipairs(extern_partitions) do
                                if v ~= nil then
									local matchname = v
									matchname=string.gsub(matchname, "-", "%%%-")
                                    local filesize = fs.stat("/tmp/restore/ori-backup-" .. v .. ".bin").size
                                    local backup_max_size = get_partition_size(matchname)
                                    if filesize > 0 and filesize <= backup_max_size then
                                        luci.sys.exec("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
                                        luci.sys.exec("nvrammanager -w /tmp/restore/ori-backup-" .. v .. ".bin -p ".. v .. " >/dev/null 2>&1")
                                    else
                                        luci.sys.exec("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
                                    end
                                end
                            end
                    
                            local backup_max_size = get_partition_size(BACKUP_PARTITION_MATCHNAME)
                            local backup_file = fs.stat("/tmp/restore/ori-backup-user-config.bin")
                            if backup_file.size > 0 and backup_file.size <= backup_max_size then                        
                                debug.printf("restore")
                                luci.sys.exec("nvrammanager -e -p  user-config   >/dev/null 2>&1")
                                luci.sys.exec("nvrammanager -w /tmp/restore/ori-backup-user-config.bin -p  user-config   >/dev/null 2>&1")
                                debug.printf("restore configs")
                                ret = ret_json(true, "", "")                            
                                write_status_to_file(FIRMWARE_STATUS_TBL.resore_success)                            
                                debug.printf("reboot...")
                                fork_reboot()
                            else
                                ret = ret_json(false, "file content error", "")
                                write_status_to_file(FIRMWARE_STATUS_TBL.file_content_failed)
                                debug.printf("Decry file failed")
                            end
                            luci.sys.exec("rm "..BACKUP_ORIGIN_FILENAME)
                            luci.sys.exec("rm -rf /tmp/restore")
                        else
                            ret = ret_json(false, "file size exceeds", "")
                            write_status_to_file(FIRMWARE_STATUS_TBL.file_size_failed)
                            debug.printf("Upload file is too large, plz check")
                        end    
                        
                    else
                        --obtain backup partition size
                        local backup_max_size = get_partition_size(BACKUP_PARTITION_MATCHNAME)
                        --check bin file size
                        if uploadFileSize < backup_max_size + 16 then
                        --bin file is encry by aes-256 algorithm, add 16.
                            debug.printf("decry")
                            local cryfunc1 = cry.dec_file(config_tmp, MODEL)
                            cry.dump_to_file(cryfunc1, BACKUP_ORIGIN_FILENAME)
                            local backup_file = fs.stat(BACKUP_ORIGIN_FILENAME)
                            if backup_file.size > 0 and backup_file.size <= backup_max_size then                        
                                debug.printf("restore")
                                luci.sys.exec("nvrammanager -e -p  user-config   >/dev/null 2>&1")
                                luci.sys.exec("nvrammanager -w "..BACKUP_ORIGIN_FILENAME.." -p  user-config   >/dev/null 2>&1")
                                debug.printf("restore configs")
                                ret = ret_json(true, "", "")                            
                                write_status_to_file(FIRMWARE_STATUS_TBL.resore_success)                            
                                debug.printf("reboot...")
                                fork_reboot()
                            else
                                ret = ret_json(false, "file content error", "")
                                write_status_to_file(FIRMWARE_STATUS_TBL.file_content_failed)
                                debug.printf("Decry file failed")
                            end
                            luci.sys.exec("rm "..BACKUP_ORIGIN_FILENAME)
                        else
                            ret = ret_json(false, "file size exceeds", "")
                            write_status_to_file(FIRMWARE_STATUS_TBL.file_size_failed)
                            debug.printf("Upload file is too large, plz check")
                        end
                    end
                end,
        ["firmware"]  = function()
                    if not check_lock_file() then
                        debug.printf("upgrade firmware...")  
                        --debug.printf("upfile path = " .. image_tmp)
            
                        if nixio.fs.access(image_tmp) then
                            debug.printf("true")
							local firmCheckRet = nil
							firmCheckRet = sys.fork_call("nvrammanager -c  " .. image_tmp .. ">/dev/console 2>&1")
							if firmCheckRet ~= 0 then
								ret = ret_json(false, "err_form", "")
								return
							end
                            --sys.fork_exec("ledcli STATUS_BLINK")
                            --sys.fork_exec("nvrammanager -u  " .. image_tmp .. ">/dev/console 2>&1")
                            write_lock_to_file()
                            sys.fork_exec("/sbin/sysupgrade " .. image_tmp .. "> /dev/console 2>&1")
                        else
                            debug.printf("false")
                            return
                        end
                        --according ret val, determine success or not
                        write_status_to_file(FIRMWARE_STATUS_TBL.success)
                        ret = ret_json(true, "", "")
                    else
                        write_status_to_file(FIRMWARE_STATUS_TBL.locking)
                        ret = ret_json(false, "locking", "")
                    end
                    --debug.printf("reboot...")
                    --fork_reboot()
                    
                --[[ 
                    local needreboot = 0
                    local checkerror = 0
                    local cmd        = ""
                    debug.printf("unpack")
                    
                    local result = image_check("/tmp/firmware.tar")
                    ret = ret_json(true, "", "")

                    if result == true then
                        debug.printf("true")
                        file_flash("true", "", total, "flash")
                    else
                        debug.printf("false")
                        file_flash("false", "err_check", total, "flash")
                    end

                    debug.printf("start to flash")

                    -- parttbl first
                    if nixio.fs.access("/tmp/check/parttbl") then
                        debug.printf("check parttbl")
                        local parttbl_check = {}
                        parttbl_check = parttbl.parttbl_check("/dev/" .. get_mtd("parttbl"), "/tmp/check/parttbl")
                        if parttbl_check.same == 0 then
                            if parttbl_check.magic and parttbl_check.flash_size and parttbl_check.rootfs and parttbl_check.kernel then
                                debug.printf("mtd_update_all")
                                cmd,needreboot = mtd_update_all(parttbl_check)
                                debug.printf(cmd)
                                sys.fork_exec(cmd)
                            else
                                debug.dumptable(parttbl_check)
                                debug.printf("parttbl check failed")
                                return
                            end
                        else
                            debug.printf("mtd_update_sep")
                            needreboot = mtd_update_sep(parttbl_check)
                        end
                    end
                --]] 
                --  fork_exec("killall dropbear uhttpd; sleep 1; /sbin/sysupgrade %s %q" %{ keep, image_tmp })
                end,
        ["checklast"] = function()
                    local lastres = read_status_form_file()
                    if nil == lastres or "" == lastres then
                        ret = ret_json(false,"permission denied","")
                    elseif FIRMWARE_STATUS_TBL.success == lastres then
                        ret = ret_json(true,"","")
                    elseif FIRMWARE_STATUS_TBL.resore_success == lastres then
                        local ipaddr = find_userconfig_ip()
                        ret = ret_json(true,"",{default_ip = ipaddr})
                    elseif FIRMWARE_STATUS_TBL.file_size_failed == lastres then
                        ret = ret_json(false,"file size exceeds","")
                    elseif FIRMWARE_STATUS_TBL.file_content_failed == lastres then
                        ret = ret_json(false,"file content error","")
                    elseif FIRMWARE_STATUS_TBL.locking == lastres then
                        ret = ret_json(false,"locking","")
                    else
                        ret = ret_json(false,"unknown error","")
                    end
                    if nixio.fs.access(FIRMWARE_STATUS_FILE) then
                        os.execute("rm -f "..FIRMWARE_STATUS_FILE.." >/dev/null 2>&1")
                    end
                end,
    }

    if uploadFileSize > maximumFileSize then
        ret = ret_json(false, "file size exceeds", "")
    else
        local fun = action[operation]
        if fun then
            fun()   
        else
            ret = ret_json(false, "not exist", {["operation"] = operation})
        end
    end
    --[[
    1)remove image -- nvrammanager's responsibility
    2)remove config -- firmware.lua's responsibility
    ]]--
    if config_tmp == firmwareFileName then
        os.execute("rm "..firmwareFileName)
    end
    
    if nil ~= ret then
        write_json(ret)
    end
end

function tmp_reboot()
    debug.printf("reboot...")
    fork_reboot()
end

function tmp_factory()
    debug.printf("reset to factory config")
    luci.sys.call("ledcli led_all_on")
    local configtool = require "luci.sys.config"
    configtool.resetconfig()

    -- reset usb settings
    debug.printf("erase usb...")
    luci.sys.call("nvrammanager -e -p usb-config")
    
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
    debug.printf("reboot...")
    fork_reboot()
end

local dispatch_tbl = {
    config = {
        ["reboot"]  = { cb  = tmp_reboot },
        ["factory"] = { cb  = tmp_factory}        
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
