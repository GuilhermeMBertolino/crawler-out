module("luci.controller.admin.cloud_account", package.seeall)

local nixio = require "nixio"
local sys 	= require "luci.sys"
local dbg 	= require "luci.tools.debug"
local io    = require "io"
local ctl	= require "luci.model.controller"
local cloud = require "cloud_req.cloud_comm"
local uci_r = require("luci.model.uci").cursor()
local configtool = require "luci.sys.config"
local accmgnt    = require "luci.model.accountmgnt"
local cloud_acc  = require "cloud_req.cloud_account"
local json  = require "luci.json"
local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
local fmup      = require "luci.model.fmup"

local CLOUD_TMP_DIR = "/tmp/cloud/"
local CLOUT_DOWNLOAD_PATH = "/tmp/cloud/download/"
local DOWNLOAD_FW_NAME = "/tmp/cloud_up.bin"
local LAST_URL_FILE = CLOUT_DOWNLOAD_PATH .. "cloud_up.bin.last_dlurl"
local CLOUD_DL_PID = CLOUT_DOWNLOAD_PATH .. "cloud_up.bin.dlpid"
local CLOUD_DL_HEAD = CLOUT_DOWNLOAD_PATH .. "cloud_up.bin.dlhead"
local CLOUD_FW_LENGTH = CLOUT_DOWNLOAD_PATH .. "cloud_up.bin.dllength"
local CLOUD_ILLEGAL = CLOUD_TMP_DIR .. "illegal"
local TOKEN_VALUE_FILE = CLOUD_TMP_DIR .. "cloud_token_eweb"
local LOGIN_STATUS = CLOUD_TMP_DIR .. "login_status"
local firmware_lock = "/tmp/firmware_lock.lua"

local UCI_CLOUD_CONFIG = "cloud_config"
local UCI_CLOUD_STATUS = "cloud_status"

local TPFILE_VER_PATH = "/usr/lib/lua/luci/model/tpFileVer.lua"

local CLOUD_SETUP_TM_HOMECARE = "/usr/sbin/cloud_setupTMHomecare"

local function test_cloud_connection()
	--[[
	local req = {}

	-- Used to test cloud connection, itself don't have any meaning.
	req.method = "a"

	local re, data = cloud.send_request_sync(req, 2000, 1)

	-- connection error
	if re ~= 0 then return "offline" end
	]]--

	local cloud_sdk_status  = require "cloud_req.cloud_sdk_status"
	local ret = cloud_sdk_status.test_cloud_connection()
	-- connection error
	if ret ~= true then return "offline" end

	return "online"
end

function check_internet()
	local is_connected = false
	local socket = require("socket")            
	local test = socket.tcp()
	test:settimeout(1000)         
	if sys.call("online-test") ~= 0 then
        is_connected = false
    else
		is_connected = true		
	end
	test:close()
	return is_connected
end

function check_device()
	if not nixio.fs.access(CLOUD_ILLEGAL) then
		return true
	end  

	local errorcode = "1"
	local data = {}
	local fp = io.open(CLOUD_ILLEGAL, "r")
	if fp then
		local illegal_type = fp:read("*line")
		if illegal_type then
			errorcode = illegal_type
		end

		fp:close()
	end

	return false, errorcode, data
end

function check_connection()        
        local ret                           
        local dl_url = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "download_url")
		if dl_url == nil then
			local status = test_cloud_connection()
			if status == "online" then
				return true
			else
				return false
			end
		end
		
        local fp = io.popen("curl -s --head -g '%s' --connect-timeout 3 | grep -w HTTP | awk '{print $2}'" % {dl_url})
        if fp then                                    
                ret = fp:read("*line")                    
                fp:close()                             
        end
        if ret == "200" then
                return true            
        else
                return false
        end                       
end

function check_cloud_connection()        
	local status = test_cloud_connection()
	if status == "online" then
		return true
	else
		return false
	end                   
end

function check_login()
	local login_status = "0"
	local fp
	
	if nixio.fs.access(LOGIN_STATUS) then
		fp = io.open(LOGIN_STATUS, "r")
		login_status = fp:read("*line")
		fp:close()
	end

	if tonumber(login_status) == 1 then
		return {["islogined"] = true, ["username"] = string.lower(uci_r:get("cloud_config", "login", "username"))}
	end
	
	return {["islogined"] = false}
end

function check_bind()
	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status") == "1" or false

	return {["bind"] = bind_status}
end

function read_keys(http_form)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local pubkey = asycrypto.read_pubkey()
    local keys   = { pubkey.n, pubkey.e } 
    return {
        username = "",
        password = keys
    }
end

function get_device_token(http_form)
	local token = ""
	local origin_url = ""
	local fp
	local renew = false

	if http_form and http_form["renew"] == true then
		renew = true
	end

	if not nixio.fs.access(TOKEN_VALUE_FILE) or renew == true then
		sys.call("cloud_getDevToken")
	end
	
	if nixio.fs.access(TOKEN_VALUE_FILE) then
		fp = io.open(TOKEN_VALUE_FILE, "r")
		token = fp:read("*line")
		origin_url = fp:read("*line")
		fp:close()
	end
		
	return {["token"] = token,["origin_url"] = origin_url}
end

function get_deviceInfo()
	local data = {}
	data.model = string.gsub(sys.exec("getfirm MODEL"), "\n", "")
	if uci_r:get_profile("cloud", "https_client") ~= 1 then
		local role = uci_r:get("cloud_config", "login", "role") or "0"
		local check = check_login()
	
		data.role = check.islogined == false and 0 or tonumber(role)
		data.cloudUserName = check.islogined == false and "" or check.username
		data.mac = cloud.TrimStr(sys.exec("getfirm MAC"))
		data.alias = uci_r:get("cloud_config", "info", "alias") or ""
	end

	return data
end

function user_login(http_form)
	local acc = http_form["username"]
	local pwd = http_form["password"]
	
	if acc == nil or pwd == nil then
		dbg.print("[user login] username or passwor is nil.")
		return false, false, {["errorcode"] = "-20107"}
	end
	
    pwd = asycrypto.decrypt(pwd)
    if not pwd then
        return false 
    end
	
	local ret, data = cloud_bind_and_login(acc, pwd)
	if ret == false then
		return false, false, {["errorcode"] = tostring(data)}
	end
	
	return ret, data
end

--- Check if tpfile is supported
function cloud_check_tpfile_support()
    --local tpfile_support = uci_r:get_profile("tpfile", "tpfile_support")
    local tpfile_support = uci_r:get("profile", "tpfile_diff", "tpfile_support")
    --dbg.print("tpfile support is " .. tostring(tpfile_support))
    return tpfile_support and tpfile_support == "yes" or false
end

--- Check if featureInfo is supported
function cloud_check_featureinfo_support()
    local featureinfo_support = uci_r:get_profile("cloud", "featureinfo_support")
    --dbg.print("featureInfo support is " .. tostring(featureinfo_support))
    return featureinfo_support and featureinfo_support == "yes" or false
end

--- Check if tpfile is enabled and upload to cloud
function cloud_upload_feature()
    local err_code = 0
    
    -- NOTICE: always upload, wanglian, 19July17    
    local info = {}
    local tpfile_data = {}
    if cloud_check_tpfile_support() and luci.fs.access(TPFILE_VER_PATH) then
        tpfile_data.enable = true
        local tpFileVer = require "luci.model.tpFileVer"
        tpfile_data.comp_ver = tpFileVer.getTpFileVer()
    else
        tpfile_data.enable = false
    end
    info.tpfile_data = tpfile_data
    
    local network_mgmt = require "cloud_req.device_manage"
    err_code = network_mgmt.save_deviceFeatureInfo(info)
    if tonumber(err_code) == 0 then
        -- TODO: save to config?      
    end

    return err_code
end

function cloud_bind_and_login(acc, pwd)
	local err_code
	
	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	if tonumber(bind_status) ~= 1 then
		err_code = cloud_acc.bind_device(acc, pwd)
		if tonumber(err_code) ~= 0 then
			return false, err_code
		end
        -- For featureinfo support, always save_deviceFeatureInfo, wanglian, 19July17
        if cloud_check_featureinfo_support() then
            cloud_upload_feature()
        end
	end
	
	err_code = cloud_acc.account_login(acc, pwd)
	
	--"-20580" means unbind status on the cloud server and need to bind first
	local bind_accounts = accmgnt.get_cloud_username()
	if tonumber(err_code) == -20580 and bind_accounts then
		local ownerAcc = type(bind_accounts) == "table" and bind_accounts[1] or bind_accounts
		if ownerAcc == acc then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:commit("cloud_config")
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
			err_code = cloud_acc.bind_device(acc, pwd)
			if tonumber(err_code) ~= 0 then
				return false, err_code
			end

            -- For tpfile support, always save_deviceFeatureInfo, wanglian, 19July17
            if cloud_check_featureinfo_support() then
                cloud_upload_feature()
            end
		
			err_code = cloud_acc.account_login(acc, pwd)
		end
	end
	
	if tonumber(err_code) ~= 0 then
		return false, err_code
	else
		return true, {["username"] = acc}
	end
end

function cloud_unbind(http_form)
	local err_code

	if uci_r:get_profile("cloud", "https_client") ~= 1 then
		local ownerAcc

		local role = uci_r:get("cloud_config", "login", "role")
		local userAcc = uci_r:get("cloud_config", "login", "username")
		local users   = accmgnt.get_cloud_username()
		if not users then
			return false, false, {["errorcode"] = "-10000"}
		else
			ownerAcc = type(users) == "table" and users[1] or users
		end
			
		if role == "1" then
			err_code = cloud_acc.remove_deviceUser(ownerAcc, userAcc)
		else
		        -- For featureinfo support, always use unbind_deviceWithFeatureInfo, wanglian, 19July17
		        if cloud_check_featureinfo_support() then
		            err_code = cloud_acc.unbind_deviceWithFeatureInfo(ownerAcc)
		        else
		            err_code = cloud_acc.unbind_device(ownerAcc)
		        end
		end
	else
		local account_token = http_form and http_form["token"] or nil
		local account_role = http_form and http_form["role"] or "0"

		if account_role == "1" then
			err_code = cloud_acc.remove_deviceUser(account_token)
		else
		    -- For featureinfo support, always use unbind_deviceWithFeatureInfo, wanglian, 19July17
		    if cloud_check_featureinfo_support() then
				err_code = cloud_acc.unbind_deviceWithFeatureInfo(account_token)
		    else
				err_code = cloud_acc.unbind_device(account_token)
		    end
		end
	end

	if tonumber(err_code) ~= 0 then
		return false, false, {["errorcode"] = tostring(err_code)}
	else
		return true
	end	
end

function modify_cloud_pwd(http_form)
	local pwd = http_form["password"]
    pwd = asycrypto.decrypt(pwd)
    if not pwd then
        return false 
    end
	
	local acc
	local users   = accmgnt.get_cloud_username()
	if not users then
		return false, false, {["errorcode"] = "-10000"}
	else
		acc = type(users) == "table" and users[1] or users
	end
	
	accmgnt.set_cloudAccount(acc, pwd)
	return true
end

function load_fw_list()
	local fw_cur_ver = configtool.getsysinfo("SOFTVERSION")
    local res = {
        latest_version = fw_cur_ver,
        detail = "",
        latest_flag = true
    }

	local fw_latest_ver = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "version")
    if fw_latest_ver then
        res.latest_version = fw_latest_ver
        res.detail = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "release_log") or ""
        res.latest_flag = false
    end

	return res
end

function get_fw_list()
    local fw_cur_ver = configtool.getsysinfo("SOFTVERSION")
    local res = {
        latest_version = fw_cur_ver,
        detail = "",
        latest_flag = true
    }
    
    local fw_latest_ver = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "version")
    if fw_latest_ver then
        res.latest_version = fw_latest_ver
        res.detail = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "release_log") or ""
        res.latest_flag = false
    else
        if uci_r:get_profile("cloud", "https_client") ~= 1 then
            sys.fork_call("cloud_getFwList")
        else
            local cloud_getFirmware = require "cloud_req.cloud_getFirmware"
            local ret, error_code = cloud_getFirmware.get_fwlist()
            if not ret then
                if error_code == -5000 or error_code == -1000 or error_code == -20003 then
                    return false, "err_conn"
                elseif error_code == -20501 or error_code == -20511 then
                    return false, "err_legal"
                end
                if error_code ~= 0 then
                    return false, "err_conn"
                end
            end
        end

        uci_r = require("luci.model.uci").cursor()
        fw_latest_ver = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "version")
        if fw_latest_ver then
            res.latest_version = fw_latest_ver
            res.detail = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "release_log") or ""
            res.latest_flag = false
        end
    end

    return res
end

--check whether the download process is exist or not.
function get_download_status()
	local pid
	local fp
	
	if nixio.fs.access(CLOUD_DL_PID) then
        fp = io.open(CLOUD_DL_PID, "r")
        pid = fp:read("*line")
        fp:close()
		if nixio.fs.access("/proc/%s/status" % {pid}) then
			return true
		else
			return false
		end
	end
	return false
end

function get_download_progress(filename)
	local filesize = 0
	local totalsize = 0
	local percent = 0
	local fp

	if nixio.fs.access(CLOUD_FW_LENGTH) then
	    fp = io.open(CLOUD_FW_LENGTH, "r")
        totalsize = fp:read("*line")
		fp:close()
		if nixio.fs.access(filename) then
			filesize = nixio.fs.stat(filename).size
			percent = math.floor((filesize * 100) / totalsize);
		end
	end
	
	return percent
end

function cloud_fw_upgrade()
    local dl_url = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "download_url")
    
    if dl_url == nil then
        return false, "err_url"
    end

    --download url adjust: encode some charater in %XX form to meet lua, shell, curl & http demands.
    dl_url = cloud.downloadurl_escape(dl_url)
    
    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        sys.fork_exec("cloud_download \"%s\" \"%s\"" % {dl_url, DOWNLOAD_FW_NAME})
    else
        local cloud_getFirmware = require "cloud_req.cloud_getFirmware"
        local ret, error_code
        local oldver, newver

        --first renew the download url, because maybe the url path or token in url cached is invalid
        uci_r = require("luci.model.uci").cursor()
        oldver = uci_r:get("cloud_config", "upgrade_info", "version")

        cloud_getFirmware.get_fwlist()

        --reload config
        uci_r = require("luci.model.uci").cursor()
        newver = uci_r:get("cloud_config", "upgrade_info", "version")

        --get new version info
        if oldver ~= newver then
            return false, "err_new"
        end

		-- NOTE: if firmware is uprading, just return false.
		if nixio.fs.access(firmware_lock) then
			dofile(firmware_lock)
			if upgrade_type == "cloud" then
				dbg.printf("Tether or Cloud web is upgrading now, please wait...")
				return false
			elseif upgrade_type == "local" then
				dbg.printf("Local web is upgrading now, please wait...")
				return false
			end
		end

        --download
        local ret, error_code = cloud_getFirmware.download_firmware(DOWNLOAD_FW_NAME)
        if ret then
        	-- NOTE: Set flag, avoid repeated uprades. 
			fmup.upgrade_type("cloud")
            return true
        end

        if error_code == -5000 then
            return false, "err_conn"
        else
            return false, "err_down"
        end
    end

    return true
end

function get_download_detail(processcmd)
	local err_code
	local status = get_download_status()
    local percent = get_download_progress(DOWNLOAD_FW_NAME)
	
	dbg.print("status", status)
	dbg.print("percent", percent)
    if status == false and tonumber(percent) < 100 then
		-- Remove flag, accept next try.
		os.execute("rm -f /tmp/firmware_lock.lua")
		return false, "err_download", {["percent"] = percent}
    end

    if tonumber(percent) >= 100 and processcmd then
        if nixio.fs.access(DOWNLOAD_FW_NAME) then
			local ret = fmup.upd_fm(DOWNLOAD_FW_NAME)
			if ret == false then
				return false, "err_checksum", {["percent"] = percent}
			end	
        else
			return false, "err_download", {["percent"] = percent}
        end
    end
	
	return {["percent"] = percent}
end

function detect_upgrade_status()
	return get_download_detail(true)
end

function check_upgrade()
    local update_number = uci_r:get(UCI_CLOUD_CONFIG, "new_firmware", "fw_new_notify")
	
	if update_number == nil then
		return {["update_number"] = "0"}  
	end      
    
        return {["update_number"] = update_number}    
end

function check_cloud_version()
    local display
    local tcsp_status = uci_r:get("cloud_config", "info", "tcsp_status")
    local show_flag = uci_r:get("cloud_config", "info", "show_flag")
 
	if show_flag == "1" then
		display = "1"
	elseif tcsp_status == "2" then
        display = "2"
    elseif tcsp_status == "3" then
        display = "3"
	else
		display = "1"
    end
    return {["type"] = display} 
end

function set_status_bind()
    -- only get bind status from local uci for acting quickly
    local uci_r = require("luci.model.uci").cursor()
    local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")

    if tonumber(bind_status) ~= 1 or tonumber(need_unbind) == 1 then
        uci_r:set("cloud_config", "device_status", "bind_status", "1")
        uci_r:set("cloud_config", "device_status", "need_unbind", "0")
        uci_r:commit("cloud_config")

        if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
			uci_r:set("homecare", "tm_homecare", "enable", "on")
			uci_r:commit("homecare")				
			sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
        end          
    end

    return true
end

function login_check(http_form)
    local cloud_https_account = require "cloud_req.cloud_account"
    local data = {}
    local account_token = http_form["token"]

    if not account_token then
        return false, "no cloud account token", {["errorcode"] = "-10000"}
    end

    local err_code, ret_data = cloud_https_account.get_accountRole(account_token)
    if err_code ~= 0 then
        return false, "bind check failed", {["errorcode"] = tostring(err_code)}
    end
    if ret_data.role ~= 0 and ret_data.role ~= 1 then
        --TThis account is not bound to the device. cloud error code -20580
        return false, "check no bind", {["errorcode"] = "-20580"}
    end
    -- owner or user means device is binded, and refresh the bind status when login
    set_status_bind()

    --set return data role
    data.role = ret_data.role

    return data
end

function login_bind(http_form)
    local cloud_https_account = require "cloud_req.cloud_account"
    local data = {}
    local account_token = http_form["token"]

    if not account_token then
        return false, "no cloud account token", {["errorcode"] = "-10000"}
    end

    local err_code = cloud_https_account.bind_device(account_token)
    if err_code ~= 0 then
        return false, "bind failed", {["errorcode"] = tostring(err_code)}
    end

    data.role = 0

    return data
end

function get_bind_status(http_form)
    local cloud_https_account = require "cloud_req.cloud_account"

    local err_code, data = cloud_https_account.check_bind_status()
    if err_code ~= 0 then
	    -- get bind status from local uci
	    local uci_r = require("luci.model.uci").cursor()
	    local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	    local isBinded = false
	    if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
	        isBinded = true
	    end

	    return {["isbind"] = isBinded} 
    end

    return {["isbind"] = data.isBinded == true and true or false}
end

function set_show_flag()
	uci_r:set("cloud_config", "info", "show_flag", "1")
	uci_r:commit("cloud_config")
    return true
end

function set_remind(http_form)
	local remind_later = http_form["remind_later"]
	local remind_later_older = uci_r:get("cloud_config", "new_firmware", "remind_later") or nil
	local login_count = uci_r:get("cloud_config", "new_firmware", "login_count")
	local version = uci_r:get("cloud_config", "upgrade_info", "version")
	local remind_version = uci_r:get("cloud_config", "new_firmware", "remind_version")
	local need_commit = false

	if version ~= remind_version then
		uci_r:set("cloud_config", "new_firmware", "login_count", "1")
		uci_r:set("cloud_config", "new_firmware", "remind_version", version)
		need_commit = true
	end

	if remind_later ~= remind_later_older then
		uci_r:set("cloud_config", "new_firmware", "remind_later", remind_later)
		need_commit = true
	end

	if need_commit == true then
		uci_r:commit("cloud_config")
	end
	return true
end

function get_remind()
	local res = {}
	local login_count
	local index = 0
	local match = 0
	local power = 0
	local remind_later = uci_r:get("cloud_config", "new_firmware", "remind_later") or "1"
	local login_count = uci_r:get("cloud_config", "new_firmware", "login_count") or "1"
	local version = uci_r:get("cloud_config", "upgrade_info", "version")
	local remind_version = uci_r:get("cloud_config", "new_firmware", "remind_version")
	local type = uci_r:get("cloud_config", "upgrade_info", "type")

	login_count = tonumber(login_count)
	power = 2 ^ index
	while power <= login_count do
		if power == login_count then
			match = 1
			break
		end

		index = index + 1
		power = 2 ^ index
    end

    res["type"] = type

	if type == nil then
		res["remind_now"] = "0"
		res["type"] = ""
	elseif sys.call("online-test") ~= 0 then
		res["remind_now"] = "0"
	elseif type == "1" then
		if remind_later == "1" and match == 1 then
			res["remind_now"] = "1"
		else
			res["remind_now"] = "0"
		end

		if version ~= remind_version then
			res["remind_now"] = "1"
		end
	else
		res["remind_now"] = "1"
	end

	return res
end


function get_auto_update_remind()
	local auto_update_remind = uci_r:get("auto_upgrade", "upgrade", "delay") or "0"
	if tonumber(auto_update_remind) >= 10 then
		uci_r:set("auto_upgrade", "upgrade", "delay", '0')
		uci_r:commit("auto_upgrade")
		return true
	else
		return false
	end
end

function tmp_bind_owner(form)
	local cloud_account = require "cloud_req.cloud_account"
	
	dbg.print("bind_owner email :"..form.email)
	dbg.print("bind_owner pwd :"..form.pwd)
	
	local error_code = cloud_account.bind_device(form.email,form.pwd)
	
    if tonumber(error_code) ~= 0 then       
        return false
	end
	
    -- For featureinfo support, always save_deviceFeatureInfo, wanglian, 19July17
    if cloud_check_featureinfo_support() then
        cloud_upload_feature()
    end
    
    return true
--	return {["error_code"] = cloud_account.bind_device(form.email,form.pwd)}
end

function tmp_bind_with_token(form)
	local cloud_account = require "cloud_req.cloud_account"
	local error_code = cloud_account.bind_device(form.token)
	
	if tonumber(error_code) ~= 0 then       
		return false
	end
	
	-- For featureinfo support, always save_deviceFeatureInfo, wanglian, 19July17
	if cloud_check_featureinfo_support() then
		cloud_upload_feature()
	end
    
	return true
end

function tmp_unbind_owner(form)
    local error_code = 0
	
    -- For featureinfo support, always use unbind_deviceWithFeatureInfo, wanglian, 19July17
    if cloud_check_featureinfo_support() then
        error_code = cloud_acc.unbind_deviceWithFeatureInfo(ownerAcc)
    else
        error_code = cloud_acc.unbind_device(ownerAcc)
    end
	
	if tonumber(error_code) == 0 then
		return true
	end
	
	return false
end

function tmp_unbind_with_token(form)
	local error_code = 0
	
	-- For featureinfo support, always use unbind_deviceWithFeatureInfo, wanglian, 19July17
	if cloud_check_featureinfo_support() then
		error_code = cloud_acc.unbind_deviceWithFeatureInfo(form.token)
	else
		error_code = cloud_acc.unbind_device(form.token)
	end
	
	if tonumber(error_code) == 0 then
		return true
	end

	return false
end
function tmp_get_dev_info(form)
	local cloud = require "cloud_req.cloud_comm"
	local accountmgnt = require "luci.model.accountmgnt"
	local configtool = require "luci.sys.config"
	local cloud_https_account = require "cloud_req.cloud_account"

	local dev_info = {}
	
	dev_info.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	dev_info.status = test_cloud_connection()
	dev_info.deviceName = configtool.getsysinfo("product_name") or ""
	dev_info.alias = uci_r:get("cloud_config", "info", "alias") or ""
	--dev_info.deviceModel = sys.exec("getfirm MODEL")	
	dev_info.deviceModel = cloud.get_device_model_ver().device_model
	dev_info.deviceMac = cloud.TrimStr(sys.exec("getfirm MAC"))

	if uci_r:get_profile("cloud", "https_client") ~= 1 then
		dev_info.ownerAccount = accountmgnt.get_last_cloud_account() or ""
	else
		local err_code, data = cloud_https_account.check_bind_status()
		if err_code ~= 0 then
			-- get bind status form local uci
			local uci_r = require("luci.model.uci").cursor()
			local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
			local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
			if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
				dev_info.isBinded = "1"
			else
				dev_info.isBinded = "0"
			end
		else
			dev_info.isBinded = data.isBinded == true and "1" or "0"
		end
	end
	
	return dev_info
end

function tmp_set_dev_info(form)
	local cloud = require "cloud_req.cloud_comm"
	local accountmgnt = require "luci.model.accountmgnt"
	local configtool = require "luci.sys.config"
	local cloud_account = require "cloud_req.cloud_account"
	
	local dev_info = {}
	
	local alias = form.alias

	-- NOTE: res = 0 ---> setAlias success.
	local re = -1000
	
	if alias then
		re = cloud_account.update_alias(alias)
	end
	
	dbg.print("tmp_set_dev_info ")

	if re ~= 0 then
		return false
	end

	return true
end

local data_cache_path = "/tmp/cloud_data_cache/"
local pkt_length = 2000
--input1: method path
--input2: data string
--output null
function save_cache(method, data)
	local path = data_cache_path .. method
	local file = io.open(path, "w")
	file:write(data)
	file:close()
end

function read_cache(method, form)
	local currentSerialNumber = form.currentSerialNumber
	local path = data_cache_path .. method
	local file = io.open(path, "r")
	local cache = file:read("*a")
	
	if not nixio.fs.access(path) then
		return false
	end
	
	local data={}
	
	file:close()
	
	data.startSerialNumber = 0
	data.endSerialNumber = ((string.len(cache) - 1)/pkt_length)
	data.response = string.sub(cache, currentSerialNumber*pkt_length + 1, (currentSerialNumber+1)*pkt_length)
	data.method = form.method
	data.currentSerialNumber = form.currentSerialNumber
	
	if string.len(data.response) == 0 then
		return false
	end
	dbg.print("read_cache2 "..tostring(data.currentSerialNumber))
	return data
end

function tmp_cloud_pass_through(form)
	local cloud = require "cloud_req.cloud_comm"
	if not nixio.fs.access(data_cache_path) then
		sys.call("mkdir "..data_cache_path)
	end
--	form.currentSerialNumber = tonumber(form.currentSerialNumber) 
	if tonumber(form.currentSerialNumber) ~= -1 then 
		return read_cache(form.method, form)
	end
	req = {}
	req.method = form.method 
	req.params = json.decode(form.params)
	local re, data = cloud.send_request_sync(req, 5000, 1) 
	if re ~= 0 then  
		return false
	end
	save_cache(form.method, json.encode(data))
	
	form.currentSerialNumber = 0
	
	return read_cache(form.method, form)
end

function tmp_get_devID(form)
	local cloud = require "cloud_req.cloud_comm"
	local accountmgnt = require "luci.model.accountmgnt"
	local configtool = require "luci.sys.config"
	
	local dev_info = {}
	
	dev_info.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	
	return dev_info
end

-- General controller routines
local dispatch_tbl = {
	check_internet = {
		["read"] = {cb = check_internet}
	},
    check_device = {
        ["read"] = {cb = check_device}
    },
    check_cloud_connection = {
        ["read"] = {cb = check_cloud_connection}
    },	
	cloud_upgrade = {
        ["load"] = {cb = load_fw_list},
        ["read"] = {cb = get_fw_list},
        ["upgrade"] = {cb = cloud_fw_upgrade}
    },
    detect_upgrade_status = {
        ["read"] = {cb = detect_upgrade_status}
    },
    check_upgrade = {
        ["read"] = {cb = check_upgrade}
    },
    check_connection = {
        ["read"] = {cb = check_connection}
    },
    check_cloud_version = {
        ["read"] = {cb = check_cloud_version}
    },	
    set_show_flag = {
        ["write"] = {cb = set_show_flag}
    },
    remind = {
    	["read"] = {cb = get_remind},
    	["write"] = {cb = set_remind}
	},
	user_login = {
		["read"] = {cb = read_keys},
		["write"] = {cb = user_login}
	},
	cloud_unbind ={
		["write"] = {cb = cloud_unbind}
	},
	check_login = {
        ["read"] = {cb = check_login},
        ["bind"] = {cb = check_bind}
    },
	get_token = {
        ["read"] = {cb = get_device_token}
    },
	get_deviceInfo = {
        ["read"] = {cb = get_deviceInfo}
    },	
	tmp_cmd = {
		["bind_owner"] = {cb = tmp_bind_owner},
		["unbind_owner"] = {cb = tmp_unbind_owner},
		["get_dev_info"] = {cb = tmp_get_dev_info},
		["set_dev_info"] = {cb = tmp_set_dev_info},
		["cloud_pass_through"] = {cb = tmp_cloud_pass_through},
		["get_devID"] = {cb = tmp_get_devID}
    },
	modify_cloud_pwd = {
        ["write"] = {cb = modify_cloud_pwd}
    },
}

local dispatch_tbl_new = {
	check_internet = {
		["read"] = {cb = check_internet}
	},
	check_device = {
		["read"] = {cb = check_device}
	},
	cloud_upgrade = {
		["load"] = {cb = load_fw_list},
		["read"] = {cb = get_fw_list},
		["upgrade"] = {cb = cloud_fw_upgrade}
	},
	detect_upgrade_status = {
		["read"] = {cb = detect_upgrade_status}
	},
	check_upgrade = {
		["read"] = {cb = check_upgrade}
	},
	check_cloud_version = {
		["read"] = {cb = check_cloud_version}
	},
	set_show_flag = {
		["write"] = {cb = set_show_flag}
	},
	remind = {
    	["read"] = {cb = get_remind},
    	["write"] = {cb = set_remind}
	},
	user_login = {
		["read"] = {cb = read_keys},
		["login"] = {cb = login_check},
		["bind"] = {cb = login_bind}
	},
	cloud_bind_status =  {
		["read"] = {cb = get_bind_status}
	},
	cloud_unbind ={
		["write"] = {cb = cloud_unbind}
	},
	check_login = {
        ["read"] = {cb = check_login},
        ["bind"] = {cb = check_bind}
    },
	get_token = {
		["read"] = {cb = get_device_token}
	},
	get_deviceInfo = {
		["read"] = {cb = get_deviceInfo}
	},
	tmp_cmd = {
		["bind_with_token"] = {cb = tmp_bind_with_token},
		["unbind_with_token"] = {cb = tmp_unbind_with_token},
		["get_dev_info"] = {cb = tmp_get_dev_info},
		["set_dev_info"] = {cb = tmp_set_dev_info},
		["cloud_pass_through"] = {cb = tmp_cloud_pass_through},
		["get_devID"] = {cb = tmp_get_devID}
	},
	auto_update_remind = {
    	["read"] = {cb = get_auto_update_remind}
	},
}

function dispatch(http_form)
	if uci_r:get_profile("cloud", "https_client") ~= 1 then
		return ctl.dispatch(dispatch_tbl, http_form)
	else
		return ctl.dispatch(dispatch_tbl_new, http_form)
	end
end

function _index()	
    return ctl._index(dispatch)
end

function index()
	entry({"admin", "cloud_account"}, call("_index")).leaf = true	
end
