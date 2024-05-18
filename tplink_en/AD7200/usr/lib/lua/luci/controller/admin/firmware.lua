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

local REBOOT_TIME = uci.cursor():get_profile("global", "reboot_time") or 75
local IMAGE_TMP_PATH = "/tmp/firmware.bin"
local CONFIG_TMP = "/tmp/config.bin"
local BACKUP_TMP = "/tmp/backup"
local uploadFileSize = 0
local UPGRADE_TIME = 180

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
    local system = require("luci.controller.admin.system")
    system.reboot()
    --sys.fork_exec("sleep 2;reboot")
end

function file_flash(totaltime, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd   = "check_status = {totaltime=%d, ops=\"%s\"}\n"
    file:write(string.format(check_cmd, totaltime, ops))
    file:close()
end

function update_fwuppercent(percent, ops)
    local file = io.open("/tmp/firmware_status.lua", "w")
    local check_cmd   = "check_status = {percent=%d, ops=\"%s\"}\n"
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

function config_read( ... )
    local ret = {totaltime = REBOOT_TIME}
    return ret
end

function config_check( ... )
    local ret
    if nixio.fs.access("/tmp/firmware_status.lua") then
        dofile("/tmp/firmware_status.lua")
        ret = check_status
        if ret.ops == "restore" then
            return false, ret.error_code
        end
    else
        return true
    end

    return ret
end

function config_backup( ... )
    luci.sys.exec("nvrammanager -r "..BACKUP_TMP.." -p user-config >/dev/null 2>&1")

	--temp process for hide cloud and account info below
	--get user config files
	luci.sys.exec("mkdir -p /tmp/backupcfg")
	configtool.xmlToFile(BACKUP_TMP, "/tmp/backupcfg")
	
	--hide cloud and account info config
	local hide_files = {"accountmgnt", "cloud_config"}
	for _, f in ipairs(hide_files) do
        luci.sys.exec("rm -f /tmp/backupcfg/config/"..f)
	end
	
	--recreate xml configfiles
	luci.sys.exec("rm -f "..BACKUP_TMP)
	configtool.convertFileToXml("/tmp/backupcfg/config", BACKUP_TMP)
	luci.sys.exec("rm -rf /tmp/backupcfg")
	--temp process for hide cloud and account info above
	
    local cry = require "luci.model.crypto"
    local cryfunc1 = cry.enc_file(BACKUP_TMP, configtool.getsysinfo("product_name"))
    cry.dump_to_file(cryfunc1,"/tmp/backup.cry")

    local reader = sys.ltn12_popen("cat /tmp/backup.cry")
    luci.http.header('Content-Disposition', 'attachment; filename="backup-%s-%s.bin"' % {
        configtool.getsysinfo("product_name"), os.date("%Y-%m-%d")})
    luci.http.prepare_content("application/x-bin")
    luci.ltn12.pump.all(reader, luci.http.write)
    luci.sys.exec("rm -f " ..BACKUP_TMP.. "; rm -f /tmp/backup.cry")
    return true
end

function config_restore( ... )
    local cry = require "luci.model.crypto"
    local fs  = require "luci.fs"
    local backup_max_size = get_partition_size("user%-config")
    local cryfunc1
    local backup_file

    --check bin file size
    if uploadFileSize < backup_max_size + 16 then
    --bin file is encry by aes-256 algorithm, add 16.
        cryfunc1 = cry.dec_file(CONFIG_TMP, configtool.getsysinfo("product_name"))
        cry.dump_to_file(cryfunc1, BACKUP_TMP)

        backup_file = fs.stat(BACKUP_TMP)
        if backup_file.size > 0 and backup_file.size <= backup_max_size then
		
			--temp process for not restore cloud and account info below
			--get restore config files
			luci.sys.exec("mkdir -p /tmp/restorecfg /tmp/userconfig")
			configtool.xmlToFile(BACKUP_TMP, "/tmp/restorecfg")
			
			--get uer config files
			luci.sys.exec("rm -f "..BACKUP_TMP)
			luci.sys.exec("nvrammanager -r "..BACKUP_TMP.." -p user-config >/dev/null 2>&1")
			configtool.xmlToFile(BACKUP_TMP, "/tmp/userconfig")
			
			--not restore cloud and account info to flash
			local hide_files = {"accountmgnt", "cloud_config"}
			for _, f in ipairs(hide_files) do
				luci.sys.exec("cp -f /tmp/userconfig/config/"..f.." /tmp/restorecfg/config/")
			end
			
			--recreate xml from new config files
			luci.sys.exec("rm -f "..BACKUP_TMP)
			configtool.convertFileToXml("/tmp/restorecfg/config", BACKUP_TMP)
			luci.sys.exec("rm -rf /tmp/restorecfg /tmp/userconfig")
			--temp process for not restore cloud and account info above
			
            luci.sys.exec("nvrammanager -e -p user-config >/dev/null 2>&1")
            luci.sys.exec("nvrammanager -w "..BACKUP_TMP.." -p user-config >/dev/null 2>&1")
            configtool.xmlToFile(BACKUP_TMP, "/tmp")
            luci.sys.exec("rm -f " ..BACKUP_TMP.. "; rm -f /tmp/backup.cry")

            luci.sys.call("[ -f /sbin/board_restore ] && board_restore")

            debug.printf("reboot...")
            fork_reboot()
            return true
        else
            debug.printf("Decry file failed")
            luci.sys.exec("rm -f " ..BACKUP_TMP)
            restore_error("err_failed", "restore")
            return false
        end
    else
        debug.printf("restoring file len error")
        restore_error("err_failed", "restore")
        return false
    end
end

function config_reboot( ... )
    debug.printf("reboot...")
    fork_reboot()
    return true
end

function config_factory(form)
    debug.printf("reset to factory config")
	
	local uci_r = require("luci.model.uci").cursor()
	local accmgnt   = require "luci.model.accountmgnt"
	local complete_flag
	local unbind_ret = true
	local username
	local password
	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	
	-- set "complete_flag = true" when form is nil , or form isn't nil and form.all is true
	if form == nil then
		complete_flag = true
	elseif form ~= nil and form.all == "true" then
		complete_flag = true
	else
		complete_flag = false
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
		bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
		need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			local users = accmgnt.get_cloud_username()
			username = type(users) == "table" and users[1] or users
			password = accmgnt.get_password(username)
			unbind_ret = false
		end
	end
	
    file_flash(REBOOT_TIME, "factory")

    configtool.resetconfig()

    luci.sys.call("/etc/init.d/logd stop ; logreset")
	luci.sys.call("[ -f /sbin/board_factory ] && board_factory")

	configtool.reloadconfig()
	uci_r = require("luci.model.uci").cursor()
	if complete_flag == false then
		luci.sys.call("cp /tmp/accountmgnt_bak /etc/config/accountmgnt")
		uci_r:set("cloud_config", "device_status", "bind_status", bind_status)
		uci_r:commit("cloud_config")
	else
		if unbind_ret == false then 
			uci_r:set("cloud_config", "device_status", "need_unbind", "1")
			uci_r:commit("cloud_config")
			accmgnt.set_cloudAccount(username, password)
		end	
	end
	
    debug.printf("reboot...")
    fork_reboot()
    return true
end

function upgrade_read( ... )
	local accmgnt   = require "luci.model.accountmgnt"
	local uci_r = require("luci.model.uci").cursor()
	local hw_ver = configtool.getsysinfo("HARDVERSION")
	if hw_ver == "AD7200 v1.0" or hw_ver == "AD7200 v2.0" then
		hw_ver = "AD7200 v1.0/v2.0"
	end
	local region = configtool.getsysinfo("REGION")
	local sid
	if region == "DE" or region == "EU" then
		sid = "4555"
	elseif region == "US" then
		sid = "5553"
	end
    local ret = {
        model = configtool.getsysinfo("product_name"), 
        hardware_version = hw_ver, 
        firmware_version = configtool.getsysinfo("SOFTVERSION").."("..sid..")", 
		is_default = uci_r:get("quicksetup", "quicksetup", "to_show") == 'true' or false,
        totaltime = REBOOT_TIME
    }
	uci_r:set("quicksetup", "quicksetup", "to_show", 'false') 
    uci_r:commit("quicksetup")
    return ret
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
			--fork_reboot()
			--sys.fork_exec("sleep 1;reboot")
		end

		return ret, percent
	else
		debug.printf("upgrade false")
		sys.fork_exec("ledcli STATUS_ON")
		return false, "err_failed"
	end
end

function upgrade_fwup_check( ... )
	return get_upgrade_detail(true)
end

function upgrade_firmware( ... )
    debug.printf("upgrade firmware...")

    if nixio.fs.access(IMAGE_TMP_PATH) then
        sys.fork_exec("ledcli STATUS_SAN")
        sys.fork_exec("nvrammanager -u  " .. IMAGE_TMP_PATH)
    else
        sys.fork_exec("ledcli STATUS_ON")
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

local dbg      = require "luci.tools.debug"

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
	--download 轮询，以及时激活升级。
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
	
	local filename = "/tmp/cloud_up.bin"
	if nixio.fs.access(filename) then
        dbg.print("begin upgrade firmware...")
        sys.fork_exec("sleep 1;nvrammanager -u  " .. filename)
    else
        return false
    end
    
    dbg.print("check the upgrade percent...")
    sys.fork_call("sleep 3")
    percent = "0"
    success = true
    --upgrade ѯԼǼ
    while true do
        success, percent = get_upgrade_detail(true)
        if success == false then 
            return
        end
        if tonumber(percent) >= 100 then
            break
        end
    end
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
	
	local percent = cloud_account.get_download_progress("/tmp/cloud_up.bin")
	
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
	
	if ret == false then
		sys.call("sleep 1")
		ret, errorcode, faildata = cloud_account.get_download_detail(false)
	end
	
	if not ret and tonumber(faildata.percent) < 100 then
		status = "fail"
		process = "0"
	else
		status = "downloading"
		process = tostring(ret.percent)
	end
	
	data.status = status
	data.process = process
	data.upgradeTime = UPGRADE_TIME
	data.rebootTime = REBOOT_TIME
	return data
end

local dispatch_tbl = {
    config = {
    	["read"]	= { cb = config_read },
    	["check"]	= { cb = config_check },
    	["backup"]	= { cb = config_backup },
    	["restore"]	= { cb = config_restore, own_response = true },
        ["reboot"]  = { cb = config_reboot },
        ["factory"] = { cb = config_factory }        
    },

    upgrade = {
    	["read"]		= { cb = upgrade_read },
    	["fwup_check"]	= { cb = upgrade_fwup_check },
    	["firmware"]	= { cb = upgrade_firmware, own_response = true }
	},
	
	tmp_cmd = {
		["get_firmware_info"] = { cb = tmp_get_firmware_info },
		["upgrade_firmware"] = { cb = tmp_upgrade_firmware},
		["get_upgrade_info"] = { cb = tmp_get_upgrade_info}
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
    local maximumFileSize = 0x2000000 + 0x1000 + 0x10 + 0x04 
    local rejectOneTime = 0
    local fp
    local firmwareFileName
    uploadFileSize = 0

    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not fp then
                file_flash(REBOOT_TIME, "upload") 
                if meta and meta.name == "image" then
                    firmwareFileName = IMAGE_TMP_PATH
                else
                    firmwareFileName = CONFIG_TMP
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
                        fp:close()
                        os.execute("rm -f "..firmwareFileName)
                        fp = io.open(firmwareFileName, "w")
                        rejectOneTime = 1
                    end
                end
            end
            if eof then
                fp:close()
            end
        end
    )
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "firmware"}, call("_index")).leaf = true
end
