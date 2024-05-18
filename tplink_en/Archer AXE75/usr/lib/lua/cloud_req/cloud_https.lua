-- Lua can call cloud API via ubus.
module("cloud_req.cloud_https", package.seeall)

local json  = require "luci.json"
local sys   = require "luci.sys"
local fs    = require "luci.fs"
local dbg   = require "luci.tools.debug"
local ubus  = require "ubus"
local _ubus = ubus.connect()
local uci_r = require("luci.model.uci").cursor()
local configtool = require "luci.sys.config"
local cloud_token_cfg = require "cloud_req.cloud_token_cfg"
local cloud = require "cloud_req.cloud_comm"

local UBUS_OBJECT = "cloud_https"
local CLOUD_TMP_PATH = "/tmp/cloud"
--local CLOUD_CER_PATH = "/etc/certificate/2048_newroot.cer"
local CLOUD_HTTPS_CFGFILE = "/etc/cloud_https.cfg"
local CLOUT_DOWNLOAD_PATH="/tmp/cloud/download/"
local CLOUD_HTTPS_ILLEGAL = CLOUD_TMP_PATH.."/https_illegal"
local MAX_REQUEST_WAIT_TIME_S = 1024

--syslog define
local PROJ_LOG_ID_CLOUD=298
--MSG(CLOUD_CONNECT_SUCCESS, 51, INF, "connect download server success")
local CLOUD_CONNECT_SUCCESS=51
--MSG(CLOUD_CONNECT_FAIL, 201, ERR, "connect download server fail")
local CLOUD_CONNECT_FAIL=201

function TrimStr(str)
	local tmpstr = str

	if not str then
		return ""
	end

	tmpstr = string.gsub(tmpstr, "-", "") or ""
	str = string.match(tmpstr, "%w+") or ""
	str = str:upper() or ""
	return str
end

function downloadurl_escape(w)
	pattern = "[%`%#%$%;]"
	s = string.gsub(w, pattern, function(c)
		local t = string.format("%%%02X", string.byte(c))
		return t
	end)
	return s
end

function url_escape(w)
	pattern = "[%`%#%$%;%s]"
	s = string.gsub(w, pattern, function(c)
		local t = string.format("%%%02X", string.byte(c))
		return t
	end)
	return s
end

function get_device_basicinfo()
	local data = {}
	data.deviceId      = TrimStr(sys.exec("getfirm DEV_ID"))
	for i = 1, 4 do
		if data.deviceId ~= nil and data.deviceId ~= "" then
			break
		else
			dbg.printf("getfirm DEV_ID try again ....")
			nixio.nanosleep(1, 0)
			data.deviceId      = TrimStr(sys.exec("getfirm DEV_ID"))
		end
	end

	data.devModel      = cloud.get_device_model_ver().device_model
	data.devHwVer      = string.gsub(sys.exec("getfirm HARDVERSION"), "%c", "")
	data.alias         = uci_r:get("cloud_config", "info", "alias") or ""

	if data.alias == "" then
		if data.devModel ~= "" then
			data.alias = string.gsub(data.devModel .. data.devHwVer, "%c", "")
		end
	end

	--data.deviceName = configtool.getsysinfo("device_name") or ""
	data.fwId = TrimStr(sys.exec("getfirm FW_ID"))
	data.oemId = TrimStr(sys.exec("getfirm OEM_ID"))
	data.fwVer = string.gsub(sys.exec("getfirm SOFTVERSION"), "%c", "")
	data.hwId = TrimStr(sys.exec("getfirm HW_ID"))
	data.oemId = TrimStr(sys.exec("getfirm OEM_ID"))
	data.devFwVer = string.match(sys.exec("getfirm SOFTVERSION"), "[^%s]+") or ""
	data.deviceMac = TrimStr(sys.exec("getfirm MAC"))
	data.deviceType = ""

	return data
end

local function cac_strategy_waite_time(inittime, strategy)
	if inittime and type(inittime) == number and strategy == true then
		if inittime > MAX_REQUEST_WAIT_TIME_S then
			inittime = MAX_REQUEST_WAIT_TIME_S
		end

		-- Generate and save the verification code.
		local seed = 0
		local data
		local num
		local file = io.open("/dev/urandom", "rb")

		if file then
			data = file:read(4)
			file:close()
		end

		for i = 1, 4 do
			seed = seed * 256 + string.byte(data, i)
		end

		math.randomseed(seed%10000000)
		num = math.random(90, 110)
		return math.ceil(inittime * num / 100)
	else
		return 0;
	end
end

local function assemble_fullurl(hosturl, path, token, params)
	local fullurl = nil
	local url_parapart = nil

	if not hosturl then
		return nil
	end

	fullurl = hosturl

	if params then
		for k, v in pairs(params) do
			if url_parapart then
				url_parapart = "%s&%s=%s" % {url_parapart, k, v}
			else
				url_parapart = "%s=%s" % {k, v}
			end
		end
	end

	if path then
		fullurl = fullurl .. path
	end

	if token and url_parapart then
		fullurl = "%s?deviceToken=%s&%s" % {fullurl, token, url_parapart}
	elseif token and not url_parapart then
		fullurl = "%s?deviceToken=%s" % {fullurl, token}
	else
		fullurl = "%s?%s" % {fullurl, url_parapart}
	end

	return fullurl
end

--- https get.
-- @param url 		request http url
-- @param reqbody 	request http body 
-- @param header	request http header
-- @return			result 0(success)/-1000(inner error)/other(ssl status error)
-- @return			return http status code
-- @return			return data
local function https_post(url, reqbody, header)
	local args = {}
	local ret

	if url then
		args.cloud_request_url = url_escape(url)
		-- dbg.print("https get url:", url)
	else
		return -1000
	end

	if reqbody then
		args.cloud_request_data = json.encode(reqbody)
		-- dbg.print("https reqbody:", json.encode(reqbody))
	else
		return -1000
	end

	if header then
		if type(header) == "string" then
			args.cloud_request_header = header
		elseif type(header) == "table" then
		args.cloud_request_header = json.encode(header)
	else
			-- dbg.print("no request_header")
			args.cloud_request_header = ""
		end
	else
		-- dbg.print("no request_header")
		args.cloud_request_header = ""
	end
	-- dbg.print("https header:", args.cloud_request_header)
	
	ret = _ubus:call(UBUS_OBJECT, "cloud_https_post", args)

	if ret == nil then
		return -1000
	end

	local response = nil
	-- dbg.print("https session ret:", ret.re)
	if ret.re == 0 then
		dbg.print("https post url:", args.cloud_request_url)
		dbg.print("https reqbody:", args.cloud_request_data)
		dbg.print("https header:", args.cloud_request_header)
		dbg.print("https session ret:", ret.re)
		dbg.print("http status code: ", ret.status_code)
		if ret.response then
			dbg.print("http response data: ", ret.response)
			response = json.decode(ret.response) or {}
		end
	end
	
	return ret.re, ret.status_code, response
end

--- https get.
-- @param url 		request http url 
-- @param header	request http header
-- @return			result 0(success)/-1000(inner error)/other(ssl status error)
-- @return			return http status code
-- @return			return data
local function https_get(url, header)
	local args = {}
	local ret
	local ret_data = nil

	if url then
		args.cloud_request_url = url_escape(url)
		-- dbg.print("https get url:", url)
	else
		return -1000
	end

	args.cloud_request_data = json.encode({})

	if header then
		args.cloud_request_header = json.encode(header)
		-- dbg.print("https header:", json.encode(header))
	else
		args.cloud_request_header = json.encode({})
	end
	
	ret = _ubus:call(UBUS_OBJECT, "cloud_https_get", args)
	if ret == nil then
		return -1000
	end

	local response = nil
	-- dbg.print("https session ret:", ret.re)
	if ret.re == 0 then
		dbg.print("https get url:", args.cloud_request_url)
		dbg.print("https reqbody:", args.cloud_request_data)
		dbg.print("https header:", args.cloud_request_header)
		dbg.print("https session ret:", ret.re)
		dbg.print("http status code: ", ret.status_code)
		if ret.response then
			dbg.print("http response data: ", ret.response)
			response = json.decode(ret.response) or {}
		end
	end	

	return ret.re, ret.status_code, response
end

--- Get information entry by https, and not need to return http status code.
-- @param method 	request http method(get or post now) 
-- @param url 		request http url 
-- @param reqbody 	request http body 
-- @param header	request http header
-- @return			result 0(success)/-1000(inner error)/-5000(http session error)
-- @return			return data
local function https_getinfo(method, url, reqbody, header)
	local ret, http_scode, ret_data

	if method == "GET" then
		ret, http_scode, ret_data = https_get(url, header)
	elseif method == "POST" then
		ret, http_scode, ret_data = https_post(url, reqbody, header)
	else
		return -1000
	end

	if ret ~= 0 then
		return -5000
	end

	ret_data.http_scode = http_scode

	-- Http api getinfo dispatch will always get http status 200 return.
	-- And if not then return error code -5000
	if http_scode ~= 200 then
		return -5000, ret_data
	end

	return ret, ret_data
end

--- Use curl command to download the file
-- @param url 		https download url 
-- @param filepath 	file to save download content
-- @param capath	CA file path
-- @return			result 0(success)/-1000(inner error)/-5000(connect error)
-- @return			return data
local function https_download_by_curl(url, filepath, capath, async)
	local logm  = require "luci.model.log"
	local log   = logm.Log(PROJ_LOG_ID_CLOUD)

	if not url or not filepath or not capath then
		return -1000
	end

	--filepath can not be "/tmp/a/"
	if string.sub(filepath, -1) == '/' then
		return -1000
	end 

	local dirname = fs.dirname(filepath)
	local filename = fs.basename(filepath)
	if not dirname or not filename then
		return -1000
	end

	if not fs.isdirectory(dirname) then
		fs.mkdir(dirname)
	end

	if not fs.isdirectory(CLOUT_DOWNLOAD_PATH) then
		fs.mkdir(CLOUT_DOWNLOAD_PATH)
	end

	local LAST_URL_FILE   = CLOUT_DOWNLOAD_PATH .. filename .. ".last_dlurl"
	local CLOUD_DL_PID    = CLOUT_DOWNLOAD_PATH .. filename .. ".dlpid"
	local CLOUD_DL_HEAD   = CLOUT_DOWNLOAD_PATH .. filename .. ".dlhead"
	local CLOUD_DL_LENGTH = CLOUT_DOWNLOAD_PATH .. filename .. ".dllength"

	--check the internet, or check whether the remote file is exist
	local ret = sys.fork_call("curl -s --head --cacert \"%s\" -g \"%s\" > \"%s\"" % {capath, url, CLOUD_DL_HEAD})
	--connection fail
	if ret == nil then
		return -1000
	end

	local headfile = io.open(CLOUD_DL_HEAD, "r")
	if not headfile then
		return -1000
	end

	--get status
	local http_status
	local length
	local s_flag = false
	local l_flag = false
	for line in headfile:lines() do
		if s_flag == false then
			http_status = string.match(line, "^HTTP[^%s]*%s(%d+)")
			if http_status then
				http_status = tonumber(http_status)
				s_flag = true
			end
		end

		if l_flag == false then
			length = string.match(line, "^Content%-Length[^%s]*%s(%d+)")
			if length then
				length = tonumber(length)
				l_flag = true
			end
		end

		if s_flag and l_flag then
			break
		end
	end
	headfile:close()

	--connection fail
	if not http_status then
		dbg.print("pool connection for url : ", url)
		log(CLOUD_CONNECT_FAIL)
		return -5000
	end

	--header check return -5000 which means can't connect to download server successful
	if http_status ~= 200 then
		dbg.print("pool http status for url : ", url)
		log(CLOUD_CONNECT_FAIL)
		return http_status
	end

	if not length then
		dbg.print("pool download total length for url : ", url)
		log(CLOUD_CONNECT_FAIL)
		return -5000
	end

	log(CLOUD_CONNECT_SUCCESS)

	local last_url = fs.readfile(LAST_URL_FILE)
	local pid = fs.readfile(CLOUD_DL_PID)
	if last_url == url then
		if pid and fs.isfile("/proc/" .. pid .. "/status") then
			dbg.print("download process still exist for url : ", url)
			return 0
		end

		local oldlen = fs.readfile(CLOUD_DL_LENGTH)
		if not oldlen or oldlen ~= length then
			if fs.isfile(filepath) then
				fs.unlink(filepath)
			end
			fs.writefile(CLOUD_DL_LENGTH, length)
		end
	else
		--kill the download process
		if pid and fs.isfile("/proc/" .. pid .. "/status") then
			sys.fork_call("kill -9 " .. pid)
		end

		-- remove file
		if fs.isfile(filepath) then
			fs.unlink(filepath)
		end
		fs.writefile(CLOUD_DL_LENGTH, length)
	end
	
	if async then
		sys.fork_call("cloud_https_download \"%s\" \"%s\" \"%s\" \"%s\" \"%s\" true" % {url, filepath, capath, CLOUD_DL_PID, CLOUD_DL_LENGTH})
	else
		sys.fork_call("cloud_https_download \"%s\" \"%s\" \"%s\" \"%s\" \"%s\" false" % {url, filepath, capath, CLOUD_DL_PID, CLOUD_DL_LENGTH})
	end
	fs.writefile(LAST_URL_FILE, url)

	return 0
end

--- Download bigfile entry by https
-- @param url 		request http url 
-- @param reqbody 	request http body 
-- @param header	request http header
-- @return			result 0(success)/-1000(inner error)/-5000(connect error)
-- @return			return data
local function https_download(url, reqbody, header, downpath, async)
	local ret
	local ret_data = {}
	local session = nil
	local async_v = async
	if not async then
		async_v  = false
	end

	if not url then
		return -1000
	end

	if not downpath then
		return -1000
	end

	dbg.print("https download url:", url)
	dbg.print("https download file to path:", downpath)
	url = url_escape(url)

	-- get server token and url
	if fs.access(CLOUD_HTTPS_CFGFILE) then
		local file, err = io.open(CLOUD_HTTPS_CFGFILE, 'r')
		if file then
			local scontent = file:read("*all")
			local dcontent = nil
			if scontent then
				dcontent = require("luci.json").decode(scontent)
			end

			if dcontent then
				session = dcontent["session"]
			end
		end
	end

	if not session or not session.cer_file then
		dbg.print("can't get certificate file path cloud https config file")
		return -1000
	end

	ret = https_download_by_curl(url, downpath, session.cer_file, async_v)
	if ret == 0 then
		ret_data.http_scode = 200
	elseif ret ~= -1000 and ret ~= -5000 then
		ret_data.http_scode = ret
		ret = 0
	end

	return ret, ret_data
end

--- Token Manage: set the token by service type from token file
-- @param servicetype	request service type which defined in cloud_token_cfg.lua
-- @param token 		service token to set 
-- @param url			service url host to set  
-- @param expiresIn		expire time in second
-- @return			result true or false
-- @return			return data
local function set_token_to_file(servicetype, token, url, expiresIn)
	if not servicetype then
		dbg.print("cloud response token to write has no type")
		return false
	end

	if not token or not url or not expiresIn then
		dbg.print("cloud token params to write is not enough")
		return false
	end

	-- store the token info and start expires tracker
	local tokeninfo = token_path_tbl[servicetype]
	if tokeninfo and tokeninfo.tokenfile then
		local dir = fs.dirname(tokeninfo.tokenfile)
		if not fs.isdirectory(dir) then
			fs.mkdir(dir, true)
		end

		local file, err = io.open(tokeninfo.tokenfile, 'w')
		if file then
			file:write("%s\n%s\n%d" % {token, url, expiresIn})
			file:close()

			local ret_data = {}
			ret_data.tokenfile = tokeninfo.tokenfile
			ret_data.trackfile = tokeninfo.trackfile
			return true, ret_data
		end
	end

	return false
end

--- Token Manage: get the token by service type from token file
-- @param servicetype	request service type which defined in cloud_token_cfg.lua
-- @return			result true or false
-- @return			return data
local function get_token_from_file(servicetype)
	local res = {}

	if not servicetype then
		servicetype = "server"
	end

	-- get token path info	
	local tokeninfo = token_path_tbl[servicetype]
	if not tokeninfo then
		return false
	end

	--get token and url from file
	if tokeninfo.tokenfile and fs.access(tokeninfo.tokenfile) then
		local file, err = io.open(tokeninfo.tokenfile, 'r')
		if file then			
			local token = file:read("*line")
			local url = file:read("*line")	
			file:close()
	
			if token and url then
				--dbg.print("dst token: " .. token .. " url: " .. url)		
				res.token = token
				res.url = url
				return true, res
			else
				fs.unlink(tokeninfo.tokenfile)
			end
		else
			--dbg.printf(err)
		end
	end
	
	return false
end

--- Token Manage: delete the token by service type
-- @param servicetype	request service type which defined in cloud_token_cfg.lua
-- @return			result true or false
local function delete_token(servicetype)
	local res = {}

	if not servicetype then
		return true
	end

	-- get token path info	
	local tokeninfo = token_path_tbl[servicetype]
	if not tokeninfo then
		return true
	end

	--get token and url from file
	if tokeninfo.tokenfile then
		fs.unlink(tokeninfo.tokenfile)

		if tokeninfo.trackfile then
			sys.fork_call("ps -w|grep \"sh %s %s\" |grep -v grep |awk '{print $1}' |xargs kill -9 >/dev/null 2>&1" %
							{tokeninfo.trackfile, tokeninfo.tokenfile})
		end	
	end

	return true
end

--- Token Manage: get the server token from token file or from server verify. 
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function get_servertoken()
	local verifyinfo = nil
	local fullurl = "https://"
	local urlparams = {}
	local reqbody = {}
	local ret = false
	local data = nil
	local ret_data = {}

	local ret, data = get_token_from_file("server")
	if ret == true then
		ret_data.token = data.token
		ret_data.url = data.url
		ret_data.error_code = 0
		ret_data.http_scode = 200
		return 0, ret_data
	end

	-- get server token and url
	if fs.access(CLOUD_HTTPS_CFGFILE) then
		local file, err = io.open(CLOUD_HTTPS_CFGFILE, 'r')
		if file then
			local scontent = file:read("*all")
			local dcontent = nil
			if scontent then
				dcontent = require("luci.json").decode(scontent)
			end

			if dcontent then
				verifyinfo = dcontent["verify"]
			end
		end
	end

	if not verifyinfo or not verifyinfo.host then
		dbg.print("can't get verify info from cloud https config file")
		return -1000, ret_data
	end

	local basic_info = get_device_basicinfo()
	urlparams.deviceId = basic_info.deviceId or ""
	urlparams.model = basic_info.devModel or ""
	urlparams.hwVer = basic_info.devHwVer or ""
	urlparams.hwId  = basic_info.hwId or ""
	urlparams.oemId = basic_info.oemId or ""
	urlparams.fwVer = basic_info.fwVer or ""
	urlparams.deviceType = basic_info.deviceType or ""

	-- get request url
	fullurl = fullurl .. verifyinfo.host
	if verifyinfo.port then
		fullurl = fullurl .. ":" .. verifyinfo.port
	end
	fullurl = assemble_fullurl(fullurl, verifyinfo.path, nil, urlparams)

	--request body
	reqbody.deviceId  = urlparams.deviceId
	reqbody.deviceMac = basic_info.deviceMac or ""
	reqbody.hwId      = urlparams.hwId
	reqbody.alias     = basic_info.alias or ""

	-- send https request by method post
	ret, data = https_getinfo("POST", fullurl, reqbody, nil)
	if ret ~= 0 then
		return ret, ret_data
	end

	if fs.isfile(CLOUD_HTTPS_ILLEGAL) then
		fs.unlink(CLOUD_HTTPS_ILLEGAL)
	elseif not fs.isdirectory(CLOUD_TMP_PATH) then
		fs.mkdir(CLOUD_TMP_PATH)
	end

	--illegal device
	if data.error_code == -20501 or data.error_code == -20511 then
		local fd = nixio.open(CLOUD_HTTPS_ILLEGAL, "w")
		if fd then
			fd:flock("ex")
			fd:writeall(data.error_code)
			fd:flock("un")
			fd:close()
		end
	end

	if data.error_code ~= 0 then
		ret_data.error_code = data.error_code
		ret_data.http_scode = data.http_scode
		return ret, ret_data
	end

	local token = data.result.deviceToken	
	local url = data.result.serverUrl
	local expiresIn = data.result.expiresIn

	local tmpret, tmpdata = set_token_to_file("server", token, url, expiresIn)
	if tmpret then
		--start expires tracker
		if fs.isfile(tmpdata.trackfile) then
			sys.fork_call("sh %s %s %d &" % {tmpdata.trackfile, tmpdata.tokenfile, expiresIn})
		end
	end
	
	ret_data.error_code = 0
	ret_data.http_scode = 200
	ret_data.token = token
	ret_data.url = url

	return 0, ret_data
end

--- Token Manage: renew the server token. 
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function renew_servertoken()
	delete_token("server")

	-- get server token and url
	return get_servertoken()
end

--- Token Manage: get the device token from token file or from server by https. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua 
--						except "server"
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function get_devicetoken(servicetype)
	local ret = false
	local data = nil
	local urlparams = {}
	local reqbody = {}
	local urlpath = "/common/v1/getOldDeviceToken"
	local ret_data = {}
	local tokeninfo = token_path_tbl[servicetype]

	if servicetype == "server" or not tokeninfo then
		return -1000, ret_data
	end 

	ret, data = get_token_from_file(servicetype)
	if ret == true then
		ret_data.token = data.token
		ret_data.url = data.url
		ret_data.error_code = 0
		ret_data.http_scode = 200
		return 0, ret_data
	end

	-- first get server token and url
	ret, data = get_servertoken()
	if ret ~= 0 or data.error_code ~= 0 then
		ret_data = data
		return ret, ret_data
	end

	if not data.token or not data.url then
		return -1000, ret_data
	end

	local basic_info = get_device_basicinfo()
	urlparams.deviceId = basic_info.deviceId or ""
	urlparams.model = basic_info.devModel or ""
	urlparams.hwVer = basic_info.devHwVer or ""
	urlparams.fwVer = basic_info.fwVer or ""
	urlparams.deviceType = ""

	-- get request url
	local fullurl = assemble_fullurl(data.url, urlpath, data.token, urlparams)

	--request body
	reqbody.deviceId   = urlparams.deviceId
	reqbody.serviceIds = {}
	reqbody.serviceIds[1] = tokeninfo.serviceid

	-- send https request by method post
	-- if fail and error_code is -25001, need renew server token
	ret, data = https_getinfo("POST", fullurl, reqbody, nil)
	if ret == 0 and data.error_code == -25001 then
		--get server token first
		ret, data = renew_servertoken()
		if ret ~= 0 or data.error_code ~= 0  then
			ret_data = data
			return ret, ret_data
		end

		if data.url and data.token then
			-- get request url
			fullurl = assemble_fullurl(data.url, urlpath, data.token, urlparams)
			-- resend the request
			ret, data = https_getinfo("POST", fullurl, reqbody, nil)
		end
	end

	if ret ~= 0 then
		return ret, ret_data
	end

	if data.error_code ~= 0 then
		ret_data.error_code = data.error_code
		ret_data.http_scode = data.http_scode
		return ret, ret_data
	end

	local token = data.result.deviceToken	
	local expiresIn = data.result.expiresIn
	local serviceUrl = data.result.serviceUrls and data.result.serviceUrls[tokeninfo.serviceid] or nil

	local tmpret, tmpdata = set_token_to_file(servicetype, token, serviceUrl, expiresIn)
	if tmpret then
		--start expires tracker
		if fs.isfile(tmpdata.trackfile) then
			sys.fork_call("sh %s %s %d &" % {tmpdata.trackfile, tmpdata.tokenfile, expiresIn})
		end
	end
	
	ret_data.error_code = 0
	ret_data.http_scode = 200
	ret_data.token = token
	ret_data.url = serviceUrl

	return 0, ret_data 
end

--- Token Manage: renew the device token. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua 
--						except "server"
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function renew_devicetoken(servicetype)
	delete_token(servicetype)

	-- get server token and url
	return get_devicetoken(servicetype)
end


--- Token Manage: get the token from token file or from server by service type. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function get_token(servicetype)
	if not servicetype or servicetype == "server" then
		return get_servertoken()
	else
		return get_devicetoken(servicetype)
	end
end

--- Token Manage: renew the device or server token by service type. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua 
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
local function renew_token(servicetype)
	delete_token(servicetype)

	-- get server token and url
	return get_token(servicetype)
end

--- Check device: if device is invalid. 
-- @return			result false if invalid, or true
-- @return			error code -20511(device info not match)/-20501(device id not exist)
function check_device()
	local errcode
	if not fs.isfile(CLOUD_HTTPS_ILLEGAL) then
		return true
	end

	local fd = nixio.open(CLOUD_HTTPS_ILLEGAL, "r")
	if fd then
		fd:flock("sh")
		errcode = fd:readall()
		fd:flock("un")
		fd:close()
	end

	if tonumber(errcode) == -20501 or tonumber(errcode) == -20511 then
		return false, errcode
	end

	return true
end

--- Called as api to get the device token from file or cloud serber by https. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua 
--						except "server"
-- @param retrycout		retry times allowed when request fail or server busy.
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
function cloud_https_get_devicetoken(servicetype, retrycout)
	local ret, data
	local trycnt = 1
	local strategy = false
	local base_time = 2

	if servicetype == "server" or not token_path_tbl[servicetype] then
		return -1000
	end

	-- check if need retry and deley some time when fail
	if retrycout and tonumber(retrycout) > 1 then
		trycnt = retrycout
	end

	for i = 1, trycnt do
		strategy = false

		ret, data = get_devicetoken(servicetype)
		if ret == 0 then
			-- error code is -20003 which means cloud server busy and try later
			if data.error_code == -20003 then
				strategy = true
			else
				break
			end
		end

		local delay_time = cac_strategy_waite_time(base_time, strategy)
		nixio.nanosleep(delay_time)
		base_time = base_time * 2
	end

	-- connection error or inner error
	if ret ~= 0 then 
		return ret
	end

	return ret, data 
end

--- Called as api to renew the device token. 
-- @param servicetype	request service type which defined in cloud_token_cfg.lua 
--						except "server"
-- @param retrycout		retry times allowed when request fail or server busy.
-- @return			result 0(success)/-1000(inner error)/other
-- @return			return data including error_code
function cloud_https_fetch_devicetoken(servicetype, retrycout)
	if servicetype == "server" or not token_path_tbl[servicetype] then
		return -1000
	end

	delete_token(servicetype)

	-- get server token and url
	return cloud_https_get_devicetoken(servicetype)
end

--- dispatch cloud https request for get some information in json.
-- @param servicetype	request service type which defined in cloud_token_cfg.lua or value "spec"
--						which used with specified url by some requests like firmware download
-- @param httpinfo		http info with follow members
--							member@method  : http method including get/post
--							member@path    : url path
--							member@params  : url parameters 
--							member@url     : whole url when servicetype is spec
-- @param req			request params in http body(set nil when not need)
-- @param retrycout		retry times allowed when request fail or server busy(optional).
-- @return				result 0(success)/-1000(error)/other
-- @return				return data including error code(error_code) and http status code(http_scode)
function cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycout)
	local req_url = nil
	local ret = nil
	local data = nil
	local trycnt = 1
	local strategy = false
	local base_time = 2

	if not servicetype then
		servicetype = "server"
	end

	-- httpinfo can't can't be nil
	if not httpinfo then
		return -1000
	end

	-- first, test internet.
	if sys.call("online-test") ~= 0 then
		return -1000
	end

	-- check if need retry and deley some time when fail
	if retrycout and tonumber(retrycout) > 1 then
		trycnt = retrycout
	end

	for i = 1, trycnt do
		strategy = false

		if servicetype == "spec" then
			ret, data = https_getinfo(httpinfo.method, httpinfo.url, req, nil)
		elseif token_path_tbl[servicetype] then
			-- first get the token
			ret, data = get_token(servicetype)
			if ret == 0 and data.error_code == 0 then
				req_url = assemble_fullurl(data.url, httpinfo.path, data.token, httpinfo.params)
	
				-- send request
				ret, data = https_getinfo(httpinfo.method, req_url, req, nil)
				-- if fail and error_code is -25001, token not exist or overtimes.
				-- Just renew the token
				if ret == 0 and data.error_code == -25001 then
					ret, data = renew_token(servicetype)
				
					--resend the request
					if ret == 0 and data.error_code == 0 then
						req_url = assemble_fullurl(data.url, httpinfo.path, data.token, httpinfo.params)

						-- resend request
						ret, data = https_getinfo(httpinfo.method, req_url, req, nil)
					end
				end
			end
		else
			dbg.print("https dispatch not support servicetype:", servicetype)
			return -1000
		end

		if ret == 0 then
			-- error code -20003 means cloud server busy and try later
			-- else just return
			if data.error_code == -20003 then
				strategy = true
			else
				break
			end
		end

		local delay_time = cac_strategy_waite_time(base_time, strategy)
		nixio.nanosleep(delay_time)
		base_time = base_time * 2
	end

	-- connection error or other error
	if ret ~= 0 then
		return ret
	end

	return ret, data
end

--- dispatch cloud https for downloading the big file as firmware/tm sinature.
-- @param servicetype	request service type which defined in cloud_token_cfg.lua or value "spec"
--						which used with specified url by some requests like firmware download
--						value@spec     : specified and used by some requests like firmware download
-- @param httpinfo		http info with follow members
--							member@path    : url path
--							member@params  : url parameters
--							member@url     : whole url when servicetype is spec
-- @param req			request params in http body(set nil when not need)
-- @param downpath		path to store the download file path
-- @param retrycout		retry times allowed when request fail or server busy(optional)
-- @return				result 0(success)/-1000(inner error)/other
-- @return				return data including error code(error_code) and http status code(http_scode)
function cloud_https_download_dispatch(servicetype, httpinfo, req, downpath, retrycout)
	local req_url = nil
	local ret = nil
	local serv = nil
	local data = nil
	local trycnt = 1
	local strategy = false
	local base_time = 2

	if not servicetype then
		servicetype = "server"
	end

	-- httpinfo can't can't be nil
	if not httpinfo then
		return -1000
	end

	if not downpath then
		return -1000
	end

	-- check if need retry and deley some time when fail
	if retrycout and tonumber(retrycout) > 1 then
		trycnt = retrycout
	end

	for i = 1, trycnt do
		strategy = false

		if servicetype == "spec" then
			ret, data = https_download(httpinfo.url, req, nil, downpath, true)
		elseif token_path_tbl[servicetype] then
			-- first get the token
			ret, data = get_token(servicetype)
			if ret == 0 and data.error_code == 0 then
				req_url = assemble_fullurl(data.url, httpinfo.path, data.token, httpinfo.params)

				-- send request
				ret, data = https_download(req_url, req, nil, downpath)

				-- http status code not 200 standing for cloud server error code.
				-- http status code is 401 which means token not exist or overtimes and need to renew the token
				if ret == 0 and data.http_scode == 401 then
					ret, data = renew_token(servicetype)
				
					--resend the request
					if ret == 0 and data.error_code == 0 then
						req_url = assemble_fullurl(data.url, httpinfo.path, data.token, httpinfo.params)

						-- resend request
						ret, data = https_download(req_url, req, nil, downpath)
					end
				end
			end
		else
			dbg.print("https dispatch not support servicetype:", servicetype)
			return -1000
		end

		if ret == 0 then
			-- error code 20003 for getting token or http status code 503 for downloading 
			-- means that cloud server busy and try later
			-- else just return
			if data.http_scode == 503 or data.error_code == -20003 then
				strategy = true
			else						
				break
			end
		end

		local delay_time = cac_strategy_waite_time(base_time, strategy)
		nixio.nanosleep(delay_time)
		base_time = base_time * 2
	end

	-- connection error or other error
	if ret ~= 0 then 
		return ret
	end
	
	return ret, data
end

function cloud_https_getpost_dispatch(servicetype, method, reqpath, reqbody, reqAuthHeader, retrycout)
	local req_url = nil
	local ret = nil
	local data = nil
	local trycnt = 1
	local strategy = false
	local base_time = 2
	local reqheader = nil

	if not servicetype then
		servicetype = "server"
	end

	-- reqpath can't can't be nil
	if not reqpath then
		return -1000
	end

	-- first, test internet.
	if sys.call("online-test") ~= 0 then
		return -1000
	end

	-- check if need retry and deley some time when fail
	if retrycout and tonumber(retrycout) > 1 then
		trycnt = retrycout
	end

	for i = 1, trycnt do
		strategy = false

		if token_path_tbl[servicetype] then
			-- first get the token
			ret, data = get_token(servicetype)
			if ret == 0 and data.error_code == 0 then

				req_url = data.url .. reqpath
				if reqAuthHeader == true then
					reqheader = "Authorization:" .. data.token
				end
				-- send request
				ret, data = https_getinfo(method, req_url, reqbody, reqheader)

				-- if fail and error_code is -25001, token not exist or overtimes.
				-- Just renew the token
				if ret == 0 and data.error_code == -25001 then
					ret, data = renew_token(servicetype)
				
					--resend the request
					if ret == 0 and data.error_code == 0 then

						req_url = data.url .. reqpath
						if reqAuthHeader == true then
							reqheader = "Authorization:" .. data.token
						end
						-- resend request
						ret, data = https_getinfo(method, req_url, reqbody, reqheader)

					end
				end
			end
		else
			dbg.print("https dispatch not support servicetype:", servicetype)
			return -1000
		end

		if ret == 0 then
			-- error code -20003 means cloud server busy and try later
			-- else just return
			if data.error_code == -20003 then
				strategy = true
			else
				break
			end
		end

		local delay_time = cac_strategy_waite_time(base_time, strategy)
		nixio.nanosleep(delay_time)
		base_time = base_time * 2
	end

	-- connection error or other error
	if ret ~= 0 then
		return ret
	end

	return ret, data
end

function get_homecareTransition_expiredTime(retrycout)
	local ret, data
	local reqAuthHeader = true
	local reqbody = {}

	local basic_info = get_device_basicinfo()
	reqbody.deviceId = basic_info.deviceId or ""
	reqbody.hwId = basic_info.hwId or ""
	reqbody.oemId = basic_info.oemId or ""

	ret, data = cloud_https_getpost_dispatch("homecareTransition", "POST", "/dut/expired-time", reqbody, reqAuthHeader, retrycout)

	return ret, data
end

function get_homecareTransition_payFirmware(retrycout)
	local ret, data
	local reqAuthHeader = true
	local reqbody = {}

	local basic_info = get_device_basicinfo()
	reqbody.hwId = basic_info.hwId or ""
	reqbody.oemId = basic_info.oemId or ""

	ret, data = cloud_https_getpost_dispatch("homecareTransition", "POST", "/dut/pay-firmware", reqbody, reqAuthHeader, retrycout)

	return ret, data
end
