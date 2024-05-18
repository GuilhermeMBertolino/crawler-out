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

local CLOUD_TMP_DIR = "/tmp/cloud/"
local DOWNLOAD_FW_NAME = "/tmp/cloud_up.bin"
local LAST_URL_FILE = CLOUD_TMP_DIR .. "last_download_url"
local CLOUD_DL_PID = CLOUD_TMP_DIR .. "cloud_dl.pid"
local CLOUD_DL_HEAD = CLOUD_TMP_DIR .. "cloud_dl.head"
local CLOUD_FW_LENGTH = CLOUD_TMP_DIR .. "cloud_fw.length"
local CLOUD_ILLEGAL = CLOUD_TMP_DIR .. "illegal"
local TOKEN_VALUE_FILE = CLOUD_TMP_DIR .. "cloud_token"
local LOGIN_STATUS = CLOUD_TMP_DIR .. "login_status"

local UCI_CLOUD_CONFIG = "cloud_config"
local UCI_CLOUD_STATUS = "cloud_status"

local function test_cloud_connection()
	local req = {}

	-- Used to test cloud connection, itself don't have any meaning.
	req.method = "a"

	local re, data = cloud.send_request_sync(req, 2000, 1)

	-- connection error
	if re ~= 0 then return "offline" end

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

function check_login()
	local login_status = "0"
	local fp
	
	if nixio.fs.access(LOGIN_STATUS) then
		fp = io.open(LOGIN_STATUS, "r")
		login_status = fp:read("*line")
		fp:close()
	end

	if tonumber(login_status) == 1 then
		return {["islogined"] = true, ["username"] = uci_r:get("cloud_config", "login", "username")}
	end
	
	return {["islogined"] = false}
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

function get_device_token()
	local token = ""
	local origin_url = ""
	local fp
	
	if not nixio.fs.access(TOKEN_VALUE_FILE) then
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
	local role = uci_r:get("cloud_config", "login", "role")
	local model = cloud.TrimStr(sys.exec("getfirm MODEL"))
	local check = check_login()
	
	if check.islogined == false then
		return {["cloudUserName"] = "", ["role"] = 0, ["model"] = model}
	else
		return {["cloudUserName"] = check.username, ["role"] = tonumber(role), ["model"] = model}
	end
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

function cloud_bind_and_login(acc, pwd)
	local err_code
	
	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	if tonumber(bind_status) ~= 1 then
		err_code = cloud_acc.bind_device(acc, pwd)
		if tonumber(err_code) ~= 0 then
			return false, err_code
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
		
			err_code = cloud_acc.account_login(acc, pwd)
		end
	end
	
	if tonumber(err_code) ~= 0 then
		return false, err_code
	else
		return true, {["username"] = acc}
	end
end

function cloud_unbind()
	local err_code
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
		err_code = cloud_acc.unbind_device(ownerAcc)
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
        latest_flag = true,
		note_flag = false
    }

	local cur_verX, cur_verY = string.match(fw_cur_ver, "(%d+)%.(%d+)%.")
	local fw_latest_ver = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "version")                                                                                            
    if fw_latest_ver then                                                                                                                                                           
        res.latest_version = fw_latest_ver                                                                                                                                          
        res.detail = uci_r:get(UCI_CLOUD_CONFIG, "upgrade_info", "release_log") or ""                                                                                       
        res.latest_flag = false
		local last_verX, last_verY = string.match(fw_latest_ver, "(%d+)%.(%d+)%.")
		if tonumber(last_verX) ~= tonumber(cur_verX) or tonumber(last_verY) ~= tonumber(cur_verY) then
			res.note_flag = true
		end
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
        sys.call("cloud_getFwList")
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
        return false, "illegel download url"
    end

    --download url adjust: encode some charater in %XX form to meet lua, shell, curl & http demands.
    dl_url = cloud.downloadurl_escape(dl_url)

    sys.fork_exec("cloud_download \"%s\" \"%s\"" % {dl_url, DOWNLOAD_FW_NAME})

    return true
end

function get_download_detail(processcmd)
	local err_code
	local status = get_download_status()
    local percent = get_download_progress(DOWNLOAD_FW_NAME)
	
	dbg.print("status", status)
	dbg.print("percent", percent)
    if status == false and tonumber(percent) < 100 then
		err_code = "-20701"
		return false, err_code,{["percent"] = percent}
    end

    if tonumber(percent) >= 100 and processcmd then
        if nixio.fs.access(DOWNLOAD_FW_NAME) then
            dbg.print("begin upgrade firmware...")
            sys.fork_exec("sleep 1;nvrammanager -u \"%s\"" % (DOWNLOAD_FW_NAME))
        else
            return false
        end
    end
	
	err_code = "0"
	return {["percent"] = percent, ["err_code"] = err_code}
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

function set_show_flag()
	uci_r:set("cloud_config", "info", "show_flag", "1")
	uci_r:commit("cloud_config")
    return true
end



function tmp_bind_owner(form)
	local cloud_account = require "cloud_req.cloud_account"
	
	dbg.print("bind_owner email :"..form.email)
	dbg.print("bind_owner pwd :"..form.pwd)
	
	local error_code = cloud_account.bind_device(form.email,form.pwd)
	
	if tonumber(error_code) == 0 then
		return true
	end
	
	return false
--	return {["error_code"] = cloud_account.bind_device(form.email,form.pwd)}
end

function tmp_unbind_owner(form)
	local cloud_account = require "cloud_req.cloud_account"
	
	local error_code = cloud_account.unbind_device()
	
	if tonumber(error_code) == 0 then
		return true
	end
	
	return false
--	return {["error_code"] = cloud_account.unbind_device()}
end

function tmp_get_dev_info(form)
	local cloud = require "cloud_req.cloud_comm"
	local accountmgnt = require "luci.model.accountmgnt"
	local configtool = require "luci.sys.config"
	
	local dev_info = {}
	
	dev_info.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	dev_info.status = test_cloud_connection()
	dev_info.deviceName = configtool.getsysinfo("device_name") or ""
	dev_info.alias = uci_r:get("cloud_config", "info", "alias") or ""
	dev_info.deviceModel = sys.exec("getfirm MODEL")
	dev_info.deviceMac = cloud.TrimStr(sys.exec("getfirm MAC"))
	dev_info.ownerAccount = accountmgnt.get_last_cloud_account() or ""
	
	return dev_info
end

function tmp_set_dev_info(form)
	local cloud = require "cloud_req.cloud_comm"
	local accountmgnt = require "luci.model.accountmgnt"
	local configtool = require "luci.sys.config"
	local cloud_account = require "cloud_req.cloud_account"
	
	local dev_info = {}
	
	local alias = form.alias
	
	if alias then
		cloud_account.update_alias(alias)
	end
	
	dbg.print("tmp_set_dev_info ")
	
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
	user_login = {
		["read"] = {cb = read_keys},
		["write"] = {cb = user_login}
	},
	cloud_unbind ={
		["write"] = {cb = cloud_unbind}
	},
	check_login = {
        ["read"] = {cb = check_login}
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

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()	
    return ctl._index(dispatch)
end

function index()
	entry({"admin", "cloud_account"}, call("_index")).leaf = true	
end
