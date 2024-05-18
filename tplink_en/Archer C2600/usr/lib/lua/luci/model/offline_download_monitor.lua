--[[
Copyright(c) 2008-2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  offline_download_monitor.lua
Details :  Monitor function for offline download module.
Author  :  WANG Wenhu <wangwenhu@tp-link.net>
		   ZENG Wei   <zengwei@tp-link.net>
Version :  1.0.0
Date    :  Jan8th, 2015
]]--

module("luci.model.offline_download_monitor", package.seeall)

local fs   	   = require "luci.fs"
local uci      = require "luci.model.uci"
local uci_r    = uci.cursor()
--local form     = require("luci.tools.form").Form(uci_r)
local ubus     = require "ubus"
local dbg_prt  = require "luci.tools.debug"
local sys      = require "luci.sys"
local nixio    = require "nixio"
local bit      = require "bit"
local off_dl = require "luci.model.offline_download"

local CHECK_FALSE       = 0
local CHECK_AMULE_TRUE  = 1
local CHECK_ARIA2_TRUE  = 2

local RUNING_PATH       = "/tmp/offline_download"
local AMULE_BIN         = "/usr/bin/amuled"
local DL_MAIN_DIR       = "/offline_download"
local AMULE_CFG_DIR     = "/offline_download/.amule"
local ARIA2_CFG_DIR     = "/offline_download/.aria2"
local DL_TMP_DIR        = "/offline_download/tmp"
local DL_AMULE_TMP_DIR  = "/offline_download/tmp/amule"
local DL_ARIA2_TMP_DIR  = "/offline_download/tmp/aria2"
local TEMP_RT_AR_CONFIG = "/tmp/offline_download/tmp_rt_ar_items"
local ARIA2_SHELL       = "/etc/init.d/aria2"
local ARIA2_SH_ENABLE   = ARIA2_SHELL .. " start"
local ARIA2_SH_DISABLE  = ARIA2_SHELL .. " stop"

local ITEM_FINISHED = "complete"
local ITEM_ERROR    = "error"
local ITEM_WAITING  = "waiting"
local ITEM_ACTIVE   = "active"
local ITEM_PAUSED   = "paused"
local ITEM_REMOVED  = "removed"	--for aria2 runtime item

local MSG_HEAD = '{"jsonrpc":"2.0","method":"aria2.'
local MSG_MIDH = '","id":'
local MSG_MIDT = ',"params":['
local MSG_TAIL = ']}\n'

local ADDTORRENT	= MSG_HEAD.."addTorrent"..MSG_MIDH
local ADDURI		= MSG_HEAD.."addUri"..MSG_MIDH
local REMOVE		= MSG_HEAD.."remove"..MSG_MIDH
local FORCE_REMOVE	= MSG_HEAD.."forceRemove"..MSG_MIDH
local PAUSE			= MSG_HEAD.."pause"..MSG_MIDH
local UNPAUSE		= MSG_HEAD.."unpause"..MSG_MIDH
local STATUS		= MSG_HEAD.."tellStatus"..MSG_MIDH
local GLOBALSTAT	= MSG_HEAD.."getGlobalStat"..MSG_MIDH
local TEL_ACTIVE	= MSG_HEAD.."tellActive"..MSG_MIDH
local TEL_WAITING	= MSG_HEAD.."tellWaiting"..MSG_MIDH
local TEL_STOPPED	= MSG_HEAD.."tellStopped"..MSG_MIDH
local CHANGEGLOBAL  = MSG_HEAD.."changeGlobalOption"..MSG_MIDH
local PURGE_RESULT  = MSG_HEAD.."purgeDownloadResult"..MSG_MIDH
local REMOVE_RESULT = MSG_HEAD.."removeDownloadResult"..MSG_MIDH

local STATUS_AREA   = '",["gid","status","completedLength","totalLength","downloadSpeed","uploadSpeed"]'
local STATUS_BT     = '",["gid","status","completedLength","totalLength","downloadSpeed","bittorrent","numSeeders","uploadSpeed","connections"]'

local NO_ADD = "0"
local NEED_ADD = "1"
local ADD_AGAIN = "2"	-- for DUT reboot and USB hotplug 
local DEL_AND_ADD = "3"	-- for timeout

local IS_OK             = "00000000"
local IS_DIR_CHANGE     = "00000001"

-- Debug
-- @param N/A
-- @return N/A
local function debug(str)
	--dbg_prt("[Off_DL Debug]"..str)
end

--############################### amule below ################################--

-- Get run time items in amuled
-- @param: N/A
-- @return: amule_runtime_items table
function amule_get_runtime_items()
	debug("amule_get_runtime_items: start")
	local amule_runtime_items = {}
	local ret, res = off_dl.amule_send_message("dload_queue", {})
	
	if not ret then
		return false, amule_runtime_items
	end

	if res then
		amule_runtime_items = res.amule_table
	end
	debug("amule_get_runtime_items: stop")
	return true, amule_runtime_items
end

-- Add run time items in amuled
-- @param: cfg_item: config item
-- @return: true or false
function amule_add_runtime_task(cfg_item)
	debug("amule_add_runtime_task: start")
	if cfg_item == nil or cfg_item.url == nil then
		return false
	end

	local add_flag = flase
	local save_flag = false
	local new = {}
	
	if cfg_item.needAdded == NEED_ADD then
		local ret, response = off_dl.amule_add_item(cfg_item.url)
		if ret == true and response and response.errorcode == 0 then		
			new.gid = cfg_item.gid
			new.type = cfg_item.type
			new.timestamp = cfg_item.timestamp
			new.needAdded = NO_ADD
			--new.status = ITEM_ACTIVE
			add_flag = true
			save_flag = true
		end
	elseif cfg_item.needAdded == ADD_AGAIN then
		new.needAdded = NO_ADD		
		save_flag = true
	end

	if save_flag then
		off_dl.item_tmpconf_update_spec("download_item", "item", cfg_item[".name"], new)
	end
	debug("amule_add_runtime_task: stop")
	return add_flag, save_flag
end

-- set the cryptkey and userid of amule
-- @param usbdir
-- @param runflag
-- @return true is success, false is fail 
function amule_set_savedkey(usbdir, runflag)
	local change_flag = false
	local vcrypt, fvcrypt
	local vuserid, fvuserid
	local CRYPTKEY_FILE	= "cryptkey.dat"
	local USERID_FILE	= "preferences.dat"
	
	if not usbdir then
		return false
	end

	local cfg_dir = usbdir..AMULE_CFG_DIR.."/config"	
	if not fs.isdirectory(cfg_dir) then
		fs.mkdir(cfg_dir, true)
	end
	
	vcrypt = uci_r:get("offline_download", "amule", "cryptkey")
	--debug("amule_set_savedkey cryptkey-"..cfg_cryptkey)
	if not vcrypt then
		local file = io.open(cfg_dir.."/"..CRYPTKEY_FILE, "r")
		if file then
			fvcrypt = file:read("*a")
			if fvcrypt then
				uci_r:set("offline_download", "amule", "cryptkey", fvcrypt)
				change_flag = true
			end
			file:close()
		end
	elseif runflag == true then
		local file = io.open(cfg_dir.."/"..CRYPTKEY_FILE, "w+")
		if file then
			file:write(vcrypt)
			file:close()
		end
	end
	
	vuserid = uci_r:get("offline_download", "amule", "userid")
	--debug("amule_set_savedkey cfg_cryptkey-"..userid)
	if not vuserid then
		local file = io.open(cfg_dir.."/"..USERID_FILE, "r")
		if file then
			fvuserid = nixio.bin.b64encode(file:read("*a"))
			if fvuserid then
				uci_r:set("offline_download", "amule", "userid", fvuserid)
				change_flag = true
			end
			file:close()
		end
	elseif runflag == true then
		local file = io.open(cfg_dir.."/"..USERID_FILE, "w+")
		if file then
			file:write(nixio.bin.b64decode(vuserid))
			file:close()
		end
	end
	
	if change_flag == true then
		uci_r:commit("offline_download")
	end
	
	return true
end

-- add amule server
-- @param
-- @return true is success, false is fail 
function amule_add_server()
	local ip 	= uci.cursor():get("offline_download", "amule", "serverip")
	local port 	= uci.cursor():get("offline_download", "amule", "serverport")
	local usedip = nil
	local usedport =nil
	local response
	local UBUS_OBJECT = "amule_ubus"
	local _ubus = ubus.connect()
	local UBUS_METHOD = "amuleServerAdd"
	
	debug("amule_add_server "..ip.."."..port)
	if ip and port then
		local file = io.open(RUNING_PATH.."/amule_server", "r")
		if file then
			usedip = file:read("*l")
			usedport = file:read("*l")
			debug("amule_add_server read "..usedip.."."..usedport)
			file:close()
		end
		
		response  = _ubus:call(UBUS_OBJECT, UBUS_METHOD, {ip=ip,port=tonumber(port)})
		if response ~= nil and response.errorcode == 0 then
			if ip ~= usedip or port ~= usedport then
				local fp = io.open(RUNING_PATH.."/amule_server", "w+")
				if fp then
					fp:write(ip.."\n"..port)
					debug("amule_add_server write "..ip.."."..port)
					fp:close()
				end
			end
		end
	end
	
	return true
end

-- set the amule port open to wan
-- @param 
-- @return 
function amule_port_open()
	local tcpport = uci.cursor():get("offline_download", "amule", "tcpport")
	local udpport = uci.cursor():get("offline_download", "amule", "udpport")
	local command = {}
	
	command[#command+1]=". /lib/offline_download/offline_download_op.sh"
	
	if tcpport then
		command[#command+1]="offl_fw_access tcp "..tcpport
		command[#command+1]="offl_fw_access udp "..(tonumber(tcpport)+3)
	end
	
	if udpport then
		command[#command+1]="offl_fw_access udp "..udpport
	end
	
	sys.fork_call(table.concat(command, ";"))
end

-- set the amule port closed to wan
-- @param 
-- @return 
function amule_port_close()
	local tcpport = uci.cursor():get("offline_download", "amule", "tcpport")
	local udpport = uci.cursor():get("offline_download", "amule", "udpport")
	local command = {}

	command[#command+1]=". /lib/offline_download/offline_download_op.sh"
	
	if tcpport then
		command[#command+1]="offl_fw_block tcp "..tcpport
		command[#command+1]="offl_fw_block udp "..(tonumber(tcpport)+3)
	end
	
	if udpport then
		command[#command+1]="offl_fw_block udp "..udpport
	end
	
	sys.fork_call(table.concat(command, ";"))
end

-- set the amule config file
-- @param usbdir : usb storage directory
-- @return true is success, false is fail
function amule_set_conf(usbdir)
	if not usbdir then
		return false
	end

	local tmp_dir = usbdir..DL_AMULE_TMP_DIR
	local inc_dir = usbdir..DL_MAIN_DIR
	if not fs.isdirectory(tmp_dir) or not fs.isdirectory(inc_dir) then
		return false
	end

	local cfg_dir = usbdir..AMULE_CFG_DIR.."/config"	
	if not fs.isdirectory(cfg_dir) then
		fs.mkdir(cfg_dir, true)
	end
	
	local f = io.open( cfg_dir.."/amule.conf", "w+")
	if not f then
		return false
	end
	
	f:write("[eMule]\n")
	
	local max_upload   = uci.cursor():get("offline_download", "advanced", "max_upload")
	local max_download = uci.cursor():get("offline_download", "advanced", "max_download")
	local tcpport      = uci.cursor():get("offline_download", "amule", "tcpport")
	local udpport      = uci.cursor():get("offline_download", "amule", "udpport")
	local max_concurrent_downloads = uci.cursor():get("offline_download", "amule", "max_concurrent_downloads")
	
	if max_upload then
		f:write("MaxUpload="..max_upload.."\n")
	end
	
	if max_download then
		f:write("MaxDownload="..max_download.."\n")
	end
	
	if tcpport then
		f:write("Port="..tcpport.."\n")
	end
	
	if udpport then
		f:write("UDPPort="..udpport.."\n")
	end

	if max_concurrent_downloads then
		f:write("MaxConcurrentDownloads="..max_concurrent_downloads.."\n")
	end
	
	f:write("TempDir="..tmp_dir.."\n")
	f:write("IncomingDir="..inc_dir.."\n")
	
	f:close()
	return true
end

-- set amule enable to run
-- @param usbdir : usb storage directory
-- @return true is success, false is fail
function amule_enable(usbdir)
	local ret
		
	--iptables setting	
	amule_port_open()	

	--set cryptkey and userid
	ret = amule_set_savedkey(usbdir, true)
	if ret ~= true then
		return false
	end
	
	--when amule process exist, just return
	ret = sys.fork_call(". /lib/functions/service.sh;service_check "..AMULE_BIN)
	if ret == 0 then
		return true
	end
		
	--set config file
	ret = amule_set_conf(usbdir)
	if ret ~= true then
		return false
	end
	
	--start the process, and remove the running flag first
	local command = {}
	local rel_usbdir = (string.gsub(usbdir, "[% %&%'%@%#%!%~%$%%%^%*%(%)%+%{%}%[%]]", "\\%1"))
	command[#command+1]=". /lib/functions/service.sh"
	command[#command+1]="service_start "..AMULE_BIN.." -c "..rel_usbdir..AMULE_CFG_DIR.."/config -f"
	sys.fork_call(table.concat(command, ";"))
	
	return true
end

-- set amule disenable to run
-- @param usbdir : usb storage directory
-- @return true is success, false is fail
function amule_disable(usbdir)
	local command = {}
	
	amule_port_close()
	
	command[#command+1]=". /lib/functions/service.sh"
	command[#command+1]="service_check "..AMULE_BIN
	command[#command+1]="[ $? = 0 ] && service_stop "..AMULE_BIN
	sys.fork_call(table.concat(command, ";"))

	--save cryptkey and userid to get fixed value
	amule_set_savedkey(usbdir, false)
	
	return true
end

-- Check if amule should be enable
-- @param app_flag
-- @return true or false
function is_amule_enable(app_flag)
	return (bit.band(app_flag, CHECK_AMULE_TRUE) == CHECK_AMULE_TRUE) and true or false
end

-- check if amule item download is completed
-- @param gid
-- @return true of false
function is_amule_item_completed(gid)

	local ret, res = off_dl.amule_send_message("is_file_complete", {hash=gid})
	if res and res.file_completed == "yes" then
		return true
	end
	return false
end

-- adapte amule runtime item to config items and process it
-- @param: usbdir, amule run time items
-- @return: true: commit download_item, false: not commit
function amule_process(usbdir, amule_runtime_items)
	debug("amule_process: start")
	local save_flag = false

	for _, it in ipairs(amule_runtime_items) do
		local item = {}
		item.gid = it.file_hash
		item.status = it.file_status
		item.completed = it.file_completed
		item.size = it.file_size
		item.connections = it.file_sourcexfer
		item.numSeeders = it.file_sourceall
		item.downloadSpeed = it.file_dlspeed
		item.uploadSpeed = it.file_upspeed
		
		item.type = "amule"

		if process_item(usbdir, item) == true then 
			save_flag = true
		end
	end

	debug("amule_process: stop")
	return save_flag
end

--############################### aria2 below ################################--
-- Send add message to aria2c
-- @param: dir: download path, it: item to add
-- @return: ret: true or false, response: socket operation result
local function aria2_send_add_message(dir, item)
	local ret, response, param, path, gid

	debug("aria2_send_add_message: start")
	path = dir..DL_MAIN_DIR
	path = '"dir":"'..path..'"'
	gid = '"gid":"'..item.gid..'"'

	if item.type == "pc" or item.type == "usb" then
		local file, torrent

		file = io.open(item.torrent, "r")
		
		if file == nil then
			return false, "torrent file open failed."
		end

		debug("add torrent: "..gid)
		torrent = '"'..nixio.bin.b64encode(file:read("*a"))..'",[]'
		file:close()
			
		param = torrent..',{'..path..','..gid..'}'
		ret, response = off_dl.aria2_send_message(ADDTORRENT, param)
	else
		local url = '["'..item.url..'"]'
		param = url..',{'..path..'}'
		ret, response = off_dl.aria2_send_message(ADDURI, param)
	end
	return ret, response
end

-- Send add message to aria2c
-- @param: dir: download path, it: item to add
-- @return: ret: true or false, response: socket operation result
local function aria2_get_item_info(it, gid)
	local ret, response
	local new  = {}
	local try  = 3
	local slpt = 1
	debug("aria2_get_item_info: start")
	while true do
		if it.type == "pc" or it.type == "usb" then
			ret, response = off_dl.aria2_get_status(gid, STATUS_BT)
		else
			ret, response = off_dl.aria2_get_status(gid, STATUS_AREA)
		end
		
		if ret == true or try == 0 then
			break
		end

		slpt = slpt + try
		try  = try - 1
		nixio.nanosleep(slpt, 0)
	end

	new.status    = ITEM_ACTIVE
	new.gid       = gid
	new.needAdded = NO_ADD
	new.completed = 0
	
	if it.size == nil or tonumber(it.size) == 0 and response.result then
		new.size = response.result.totalLength
	else
		new.size = it.size
	end
	
	if it.type == "pc" or it.type == "usb" then
		if response.result.bittorrent and response.result.bittorrent.info then
			new.file = response.result.bittorrent.info.name
		end

		if it.needAdded == NEED_ADD and response.result.btFile ~= nil then
			if response.result.btFile ~= "" then
				new.torrent = response.result.btFile
			else
				new.torrent = it.torrent
			end
		end
	else
		new.file = string.match(it.url, ".+/([^/]*%.%w+)$")
	end
	
	--debug("update item info")
	--form:update("download_item", "item", it, new, {"gid","needAdded","completed","status","file","size","torrent"})
	--uci_r:commit("download_item")

	debug("aria2_get_item_info: stop")
	return new
end

-- Add run time items in aria2c
-- @param: usbdir: config path, item: config item
-- @return: true or false
function aria2_add_runtime_task(usbdir, cfg_item)
	debug("aria2_add_runtime_task: start")

	local add_flag = false
	local update_flag = false
	if usbdir == nil or cfg_item == nil or cfg_item.gid == nil then
		return false, nil
	end

	local runtime_gid = cfg_item.gid
	local runtime_needAdded = cfg_item.needAdded
	local new = {}

	new.gid = cfg_item.gid

	if runtime_needAdded == DEL_AND_ADD then
		runtime_needAdded = ADD_AGAIN
		off_dl.aria2_del_item(cfg_item.gid)
		del_runtime_cfg_item(cfg_item.gid)
	end

	local ret, response = aria2_send_add_message(usbdir, cfg_item)
	debug("aria2_send_add_message: stop")

	if ret == true then
		debug("========add ok, try to get item info===========")
		if response and response.result then
			runtime_gid = response.result
		end
	
		if runtime_needAdded == ADD_AGAIN then
			new.gid = runtime_gid
			new.needAdded = NO_ADD
			new.status = ITEM_ACTIVE
		elseif runtime_needAdded == NEED_ADD then
			debug("aria2_send_add_message: -----NEED_ADD-----")
			new = aria2_get_item_info(cfg_item, runtime_gid)
		end
		
		add_flag = true
		update_flag = true			
	else
		if response and response.error then
			debug("add error: ")
			debug(response.error.message)
			
			local dup_msg = 'GID '..cfg_item.gid..' is not unique.'
			local dec_msg = 'Bencode decoding failed'
			if response.error.message == dec_msg then
				new.status = ITEM_ERROR
				update_flag = true
			elseif response.error.message == dup_msg then
				new.needAdded = NO_ADD
				update_flag = true
			end					
		end
	end

	if update_flag == true then
		off_dl.item_tmpconf_update_spec("download_item", "item", cfg_item[".name"], new)
	end				

	debug("aria2_add_runtime_task: stop")
	return add_flag, update_flag, new
end

-- dump aria2 runtime tasks to file, just for debug
-- @param: global
-- @return: N/A 
local function aria2_dump_runtime_items(global)
	local fp = io.open(TEMP_RT_AR_CONFIG, "w")
	if fp then
		if tonumber(global.numActive) > 0 and global.active then
			fp:write(global.numActive..'\n')
			fp:write(global.active.."\n")
		else
			fp:write(global.numActive..'\n\n')
		end

		if tonumber(global.numWaiting) > 0 and global.waiting then
			fp:write(global.numWaiting..'\n')
			fp:write(global.waiting.."\n")
		else
			fp:write(global.numWaiting..'\n\n')
		end

		if tonumber(global.numStopped) > 0 and global.stopped then
			fp:write(global.numStopped..'\n')
			fp:write(global.stopped.."\n")
		else
			fp:write(global.numStopped..'\n\n')
		end
		fp:close()
	end
end

-- Get run time items in aria2c
-- @param: N/A
-- @return: aria2_runtime_items table
local function aria2_get_runtime_items()
	local global = {}
	local result = {}
	local index
	local subIdx
	local number
	local ret, response
	local retry = 3

	debug("[Debug] aria2_get_runtime_items: start")
	while retry > 0 do
		ret, response = off_dl.aria2_send_message(GLOBALSTAT, "")
		if ret == false then
			retry = retry - 1
			nixio.nanosleep(1, 0)
		else
			break
		end
	end

	if ret ~= true  then
		return false, result
	end
	
	global.numActive  = tonumber(response.result.numActive)
	global.numStopped = tonumber(response.result.numStopped)
	global.numWaiting = tonumber(response.result.numWaiting)

	if global.numActive > 0 then
		ret, response = off_dl.aria2_send_message(TEL_ACTIVE, '["gid","files","status","downloadSpeed","uploadSpeed","connections","numSeeders","completedLength","totalLength"]', true)
		global.active = response
		response = luci.json.decode(response)
		result = response.result
		
		index  = 1
		number = global.numActive
		subIdx = 1
		
		while index <= number do
			result[index] = response.result[subIdx]
			index  = index  + 1
			subIdx = subIdx + 1
		end
	end
	if global.numWaiting > 0 then
		ret, response = off_dl.aria2_send_message(TEL_WAITING, "0,"..global.numWaiting..',["gid","files","status","completedLength","totalLength"]', true)
		global.waiting = response
		response = luci.json.decode(response)
		
		index  = global.numActive + 1
		number = global.numActive + global.numWaiting
		subIdx = 1
		
		while index <= number do
			result[index] = response.result[subIdx]
			index  = index  + 1
			subIdx = subIdx + 1
		end
	end
	if global.numStopped > 0 then
		ret, response = off_dl.aria2_send_message(TEL_STOPPED, "0,"..global.numStopped..',["gid","files","status","completedLength","totalLength"]', true)
		global.stopped = response
		response = luci.json.decode(response)
		
		index  = global.numActive + global.numWaiting + 1
		number = global.numActive + global.numWaiting + global.numStopped
		subIdx = 1
		
		while index <= number do
			result[index] = response.result[subIdx]
			index  = index  + 1
			subIdx = subIdx + 1
		end
	end
	-- dump to file for debug
	--aria2_dump_runtime_items(global)

	debug("[Debug] aria2_get_runtime_items: stop")
	return true, result
end

-- set aria2 enable to run
-- @param 
-- @return 
local function aria2_enable()
	local oldEnable = uci_r:get("offline_download", "aria2", "enable")
	if oldEnable == 'off' then
		
		uci_r:set("offline_download", "aria2", "enable", "on")
		uci_r:commit("offline_download")
		
		sys.fork_call(ARIA2_SH_ENABLE)
	end
end

-- set aria2 disable to run
-- @param
-- @return
local function aria2_disable()
	local oldEnable = uci_r:get("offline_download", "aria2", "enable")
	if oldEnable == 'on' then
		
		uci_r:set("offline_download", "aria2", "enable", "off")
		uci_r:commit("offline_download")
		
		sys.fork_call(ARIA2_SH_DISABLE)
	end
end

-- Check if aria should be enable
-- @param app_flag
-- @return true or false
function is_aria2_enable(app_flag)
	return (bit.band(app_flag, CHECK_ARIA2_TRUE) == CHECK_ARIA2_TRUE) and true or false
end

-- check if aria2 item download is completed
-- @param gid
-- @return true of false
function is_aria2_item_completed(dir, cfg_item, runtime_item)
	return (cfg_item.size and tonumber(cfg_item.size) ~= 0 and
		runtime_item.completed == tonumber(cfg_item.size) and
		not fs.isfile(dir..DL_MAIN_DIR.."/"..cfg_item.file..".aria2")) and true or false
end

-- USB hotplug may change the real mount dir: sda-->sdb
-- so need to update the cfg item torrent path
-- @param usbdir, cfg_item
-- @return new_torrent_path or nil 
function aria2_update_torrent_path(usbdir, cfg_item)
	local new_torrent_path = nil
	local patten = "/mnt/sd[%a]+"
	local cfg_mount_path = string.match(cfg_item.torrent, patten)
	local real_mount_path = string.match(usbdir, patten)
	if cfg_mount_path ~= real_mount_path then
		new_torrent_path = string.gsub(cfg_item.torrent, patten, real_mount_path, 1) 
	end
	return new_torrent_path
end
-- Check config to add the taskes again after DUT reboot or USB device hotplug
-- @param: runtime_items
-- @return: true or false
function aria2_process_exception(usbdir, runtime_items)
	if not fs.isfile(RUNING_PATH .. "/exception") then
		return true
	end
	
	fs.unlink(RUNING_PATH .. "/exception")
	
	local cfg_items = off_dl.item_tmpconf_getall("download_item", "item", nil, nil, false)
	local update_flag = false

	for _, it in ipairs(cfg_items) do
		if it.type ~= "amule" then
			-- process torrent path prefix changed
			if (it.type == "pc" or it.type == "usb") and (it.status ~= ITEM_FINISHED) then
				local new_torrent_path = aria2_update_torrent_path(usbdir, it)
				if new_torrent_path ~= nil then
					local new = {}
					new.torrent = new_torrent_path
					off_dl.item_tmpconf_update_spec("download_item", "item", it[".name"], new)
					update_flag = true
				end
			end

			-- process item status is ITEM_WAITING
			if it.status == ITEM_WAITING then
				local new = {}
				new.gid = it.gid
				new.status = ITEM_PAUSED
				new.needAdded = NO_ADD
				off_dl.item_tmpconf_update_spec("download_item", "item", it[".name"], new)
				update_flag = true

			-- process item status is ITEM_ACTIVE
			elseif it.status == ITEM_ACTIVE then
				local need_add_flag = true
				-- already in aria2, then continue
				if runtime_items then
					for _, rt_item in ipairs(runtime_items) do
						if rt_item.gid == it.gid then
							need_add_flag = false
							break
						end
					end
				end

				if need_add_flag == true then
					debug("aria2_check_cfg_items: "..it.gid.."  "..it.status)
					local new = {}
					new.gid = it.gid
					new.needAdded = ADD_AGAIN

					off_dl.item_tmpconf_update_spec("download_item", "item", it[".name"], new)
					update_flag = true
				end
			end
		end
	end

	if update_flag == true then
		off_dl.item_tmpconf_commit("download_item", true)
	end

	return true
end


-- adapte aria2 runtime item to config items and process it
-- @param: usbdir, amule run time items
-- @return: true: commit download_item, false: not commit
function aria2_process(usbdir, aria2_runtime_items)
	debug("aria2_process: start")
	local save_flag = false

	for _, it in ipairs(aria2_runtime_items) do
		local item = {}
		item.gid = it.gid
		item.status = it.status
		item.completed = it.completedLength
		item.size = it.totalLength
		item.connections = it.connections
		item.numSeeders = it.numSeeders
		item.downloadSpeed = it.downloadSpeed
		item.uploadSpeed = it.uploadSpeed
		
		item.type = "aria2"

		if process_item(usbdir, item) == true then 
			save_flag = true
		end
	end

	debug("aria2_process: stop")
	return save_flag
end
--############################### aria2 above ################################--

--############################### common below ################################--
-- create runtime config file
-- @param dirname
-- @return N/A
function create_cfg_file(name)
	local config_file = RUNING_PATH.."/"..name
	if config_file and not fs.isfile(config_file) then
		local f = io.open(config_file, "w+")
		if f then
			f:close()
		end
	end
end
-- truncate runtime config file
-- @param dirname
-- @return N/A
function truncate_cfg_file(name)
	local config_file = RUNING_PATH.."/"..name
	if config_file and fs.isfile(config_file) then
		local f = io.open(config_file, "w+")
		if f then
			f:close()
		end
	end
end
-- add item in runtime config file
-- @param item
-- @return N/A
function add_runtime_cfg_item(item)
	debug("add_runtime_cfg_item: runtime_item start")
	if not fs.isfile(RUNING_PATH.."/runtime_item") then
		create_cfg_file("runtime_item")
	end

	local rt_item = off_dl.item_tmpconf_find("runtime_item", "item", {gid=item.gid}, {"gid"})
	if rt_item ~= nil then
		return false
	end

	local new = {}
	new.type = item.type
	new.timestamp = item.timestamp
	new.gid = item.gid
	new.status = ITEM_ACTIVE
	new.completed = 0
	new.downloadSpeed = 0
	new.uploadSpeed = 0
	new.connections = 0
	new.numSeeders = 0
	new.size = 0

	off_dl.item_tmpconf_insert("runtime_item", "item", new, nil)
	off_dl.item_tmpconf_commit("runtime_item", false)
	debug("add_runtime_cfg_item: runtime_item stop")
	return true
end
-- delete item in runtime config file
-- @param item
-- @return N/A
function del_runtime_cfg_item(gid)
	local ret = off_dl.item_tmpconf_delete_cond("runtime_item", "item", {gid = gid}, {"gid"}, false)
	if ret then
		off_dl.item_tmpconf_commit("runtime_item", false)
	end
	-- delete may fail, try to find and delete again...
	local rt_item = off_dl.item_tmpconf_find("runtime_item", "item", {gid=gid}, {"gid"})
	if rt_item ~= nil then
		off_dl.item_tmpconf_delete_spec("runtime_item", rt_item[".name"])
		off_dl.item_tmpconf_commit("runtime_item", false)
	end
end

-- update item in runtime config file
-- @param gid: app item gid, new_item: new_item info to update
-- @return N/A
function update_runtime_cfg_item(gid, new_item)
	local found = false
	local save_flag = false
	local cfg_rt_items = off_dl.item_tmpconf_getall("runtime_item", "item", nil, nil, false)	

	if cfg_rt_items and #cfg_rt_items > 0 then
		for _, cfg_rt_item in ipairs(cfg_rt_items) do
			if cfg_rt_item.gid == gid then
				off_dl.item_tmpconf_update_spec("runtime_item", "item", cfg_rt_item[".name"], new_item)
				save_flag = true
				found = true
			end

			-- del pause item in runtime item config file
			if cfg_rt_item.status == ITEM_PAUSED then
				off_dl.item_tmpconf_delete_spec("runtime_item", cfg_rt_item[".name"])
				save_flag = true
			end
		end
	end

	if found == false and new_item.status == ITEM_ACTIVE then
		add_runtime_cfg_item(new_item)
	end

	if save_flag then
		off_dl.item_tmpconf_commit("runtime_item", false)
	end	
end

-- check app's item num before add to app
-- @param N/A
-- @return true: OK, false: failed
function check_active_num()
	local runtime_items = off_dl.item_tmpconf_getall("runtime_item", "item", nil, nil, false)
	local runtime_item_num = runtime_items and #runtime_items or 0
	local max_active_num = uci.cursor():get("offline_download", "advanced", "max_active_num")

	debug("runtime_item_num: "..runtime_item_num)
	return runtime_item_num < tonumber(max_active_num) and true or false
end
-- Wrap function for app add task
-- @param usbdir, app_flag:amule or aria2 enable flag
-- @return true or false
function add_runtime_task(usbdir, app_flag)
	debug("add_runtime_task: start")
	if usbdir == nil then
		return false
	end

	local ret = check_active_num()
	if ret == false then
		debug("add_runtime_task: ------maximum active tasks------")
		return false
	end

	local cfg_items = off_dl.item_tmpconf_getall("download_item", "item", nil, nil, false)
	if cfg_items == nil then
		return false
	end

	local add_flag = false
	local save_flag = false
	local new = nil
	for _, item in ipairs(cfg_items) do
		if item.needAdded ~= NO_ADD then
			if is_amule_enable(app_flag) and item.type == "amule" then
				add_flag, save_flag = amule_add_runtime_task(item)
			elseif is_aria2_enable(app_flag) and item.type ~= "amule" then
				add_flag, save_flag, new = aria2_add_runtime_task(usbdir, item)
				if new and new.gid then
					item.gid = new.gid
				end
			end
			--add one task one time of every cycle of monitor
			if add_flag == true then
				break
			end
		end
	end
	
	if save_flag == true then
		off_dl.item_tmpconf_commit("download_item", true)		
		debug("add_runtime_task: commit download_item")
	end
	debug("add_runtime_task: stop")
	return true
end
-- Wrap function for app del task
-- @param dl_type: app type, gid: item gid
-- @return true or false
function del_runtime_task(dl_type, gid)
	if dl_type == nil or gid == nil then
		return false
	end

	if dl_type == "amule" then
		off_dl.amule_del_item(gid)
	else
		off_dl.aria2_del_item(gid)
	end
	return true
end
-- Wrap function for app del task result, only for aria2
-- @param dl_type: app type, gid: item gid
-- @return true or false
function del_runtime_task_result(dl_type, gid)
	if dl_type == nil or gid == nil then
		return false
	end
	if dl_type ~= "amule" then
		off_dl.aria2_del_item_result(gid)
	end
	return true
end
-- Wrap function for app pause task
-- @param dl_type: app type, gid: item gid
-- @return true or false
function pause_runtime_task(dl_type, gid)
	if dl_type == nil or gid == nil then
		return false
	end

	if dl_type == "amule" then
		off_dl.amule_pause_item(gid)
	else
		--off_dl.aria2_pause_item(gid)
		off_dl.aria2_del_item(gid)
	end
	del_runtime_cfg_item(gid)
	return true
end
-- Wrap function for app resume task
-- @param dl_type: app type, gid: item gid
-- @return true or false
function resume_runtime_task(dl_type, gid)
	if dl_type == nil or gid == nil then
		return false
	end

	if dl_type == "amule" then
		off_dl.amule_resume_item(gid)
	else
		off_dl.aria2_resume_item(gid)
	end
	return true	
end
-- Wrap function for checking app task status is completed 
-- @param dir: config dir, cfg_item: config item, runtime_item: item in apps
-- @return true or false
function is_task_completed(dir, cfg_item, runtime_item)
	local ret = false

	if runtime_item.status == ITEM_FINISHED then
		return true
	end

	if cfg_item.type == "amule" then
		--ret = is_amule_item_completed(cfg_item.gid)
		ret = false
	else
		ret = is_aria2_item_completed(dir, cfg_item, runtime_item)
	end
	return ret
end
-- check seeding enable
-- @return true or false
function is_seeding_enable()
	local seed_enable = uci.cursor():get("offline_download", "advanced", "seed_enable")
	if seed_enable and seed_enable == "on" then
		return true
	end
	return false
end

-- check item delete condition
-- 
function check_item_del_cond(cfg_item)
	if is_seeding_enable() == true and cfg_item.type ~= "http" and cfg_item.type ~= "ftp" then
		return false
	end
	return true
end

-- process active item in download_item config file
-- @param usbdir: config dir, cfg_item: config item, item: runtime item in apps
-- @return new item table 
function process_active(usbdir, cfg_item, item)
	local new = {}

	new.completed = item.completed
	new.size = item.size
	new.connections = item.connections
	new.numSeeders = item.numSeeders
	new.downloadSpeed = item.downloadSpeed
	new.uploadSpeed = item.uploadSpeed

	if is_task_completed(usbdir, cfg_item, item) then
		new.downloadSpeed = 0
		new.status = ITEM_FINISHED
		new.completed = item.size
		if check_item_del_cond(cfg_item) then
			-- remove it from apps
			del_runtime_task(cfg_item.type, item.gid)
			del_runtime_cfg_item(item.gid)
		end
	elseif item.status == ITEM_ACTIVE then
		new.status = ITEM_ACTIVE
	elseif item.status == ITEM_WAITING then
		new.status = ITEM_ACTIVE
	elseif item.status == ITEM_PAUSED then
		new.status = ITEM_ACTIVE
	elseif item.status == ITEM_ERROR then
		new.status = ITEM_ERROR
	end

	if new.status == ITEM_ACTIVE and (cfg_item.type == "http" or cfg_item.type == "ftp") then
		new.numSeeders = new.connections
	end

	return new
end
-- process paused item in download_item config file
-- @param usbdir: config dir, cfg_item: config item, item: runtime item in apps
-- @return new item table 
function process_paused(usbdir, cfg_item, item)
	local new = {}

	new.completed = item.completed
	new.size = item.size
	new.connections = 0
	new.numSeeders = 0
	new.downloadSpeed = 0
	new.uploadSpeed = 0

	if is_task_completed(usbdir, cfg_item, item) then
		new.status = ITEM_FINISHED
		new.completed = item.size
		if check_item_del_cond(cfg_item) then
			del_runtime_task(cfg_item.type, item.gid)
			del_runtime_cfg_item(item.gid)
		end
	elseif item.status == ITEM_ACTIVE then
		new.status = ITEM_PAUSED
		pause_runtime_task(cfg_item.type, item.gid)
	elseif item.status == ITEM_WAITING then
		new.status = ITEM_PAUSED
		pause_runtime_task(cfg_item.type, item.gid)
	elseif item.status == ITEM_ERROR then
		new.status = ITEM_ERROR
	elseif item.status == ITEM_REMOVED then
		new.status = ITEM_PAUSED
		del_runtime_task_result(cfg_item.type, item.gid)
	end

	if new.status == ITEM_ACTIVE and (cfg_item.type == "http" or cfg_item.type == "ftp") then
		new.numSeeders = new.connections
	end

	return new
end
-- process waiting item in download_item config file
-- @param usbdir: config dir, cfg_item: config item, item: runtime item in apps
-- @return new item table 
function process_waiting(usbdir, cfg_item, item)
	local new = {}

	new.completed = item.completed
	new.size = item.size
	new.connections = item.connections
	new.numSeeders = item.numSeeders
	new.downloadSpeed = item.downloadSpeed
	new.uploadSpeed = item.uploadSpeed

	if is_task_completed(usbdir, cfg_item, item) then
		new.status = ITEM_FINISHED
		new.completed = item.size
	elseif item.status == ITEM_ACTIVE then
		new.status = ITEM_ACTIVE
	elseif item.status == ITEM_PAUSED then
		new.status = ITEM_ACTIVE

		if cfg_item.type == "amule" and cfg_item.needAdded == ADD_AGAIN and check_active_num() == false then
			new.status = ITEM_WAITING
		else
			resume_runtime_task(cfg_item.type, item.gid)
		end
	elseif item.status == ITEM_REMOVED then
		new.status = ITEM_PAUSED
		del_runtime_task_result(cfg_item.type, item.gid)
	elseif item.status == ITEM_WAITING then
		new.status = ITEM_ACTIVE
	elseif item.status == ITEM_ERROR then
		new.connections = 0
		new.numSeeders = 0
		new.downloadSpeed = 0
		new.uploadSpeed = 0

		new.status = ITEM_ERROR
		if fs.isfile(usbdir..DL_MAIN_DIR.."/"..cfg_item.file..".aria2") then
			fs.unlink(usbdir..DL_MAIN_DIR.."/"..cfg_item.file..".aria2")
		end
	end

	if new.status == ITEM_ACTIVE and (cfg_item.type == "http" or cfg_item.type == "ftp") then
		new.numSeeders = new.connections
	end	
	return new
end
-- process finished item in download_item config file
-- @param usbdir: config dir, cfg_item: config item, item: runtime item in apps
-- @return new item table 
function process_finished(usbdir, cfg_item, item)
	local new = {}

	new.completed = item.completed
	new.size = item.size
	new.connections = item.connections
	new.numSeeders = item.numSeeders
	new.downloadSpeed = item.downloadSpeed
	new.uploadSpeed = item.uploadSpeed

	-- process_active may failed to delete runtime task when USB I/O is busy,
	-- here check and delete task if runtime task still in apps. 
	if is_task_completed(usbdir, cfg_item, item) then
		new.downloadSpeed = 0
		new.uploadSpeed = item.uploadSpeed
		new.completed = item.size
		new.status = ITEM_FINISHED
		if check_item_del_cond(cfg_item) then
			del_runtime_task(cfg_item.type, item.gid)
			del_runtime_cfg_item(item.gid)
		end
	end
	return new
end
-- process error item in download_item config file
-- @param usbdir: config dir, cfg_item: config item, item: runtime item in apps
-- @return new item table 
function process_error(usbdir, cfg_item, item)
	local new = {}

	new.completed = item.completed
	new.size = item.size
	new.connections = item.connections
	new.numSeeders = item.numSeeders
	new.downloadSpeed = item.downloadSpeed
	new.uploadSpeed = item.uploadSpeed
	new.status = item.status


	if item.status == ITEM_PAUSED or item.status == ITEM_WAITING then
		new.status = ITEM_ACTIVE
	end

	if new.status == ITEM_ACTIVE and (cfg_item.type == "http" or cfg_item.type == "ftp") then
		new.numSeeders = new.connections
	end

	return new
end

CFG_STATE_TBL = {
	[ITEM_ACTIVE] = process_active,
	[ITEM_PAUSED] = process_paused,
	[ITEM_WAITING] = process_waiting,
	[ITEM_FINISHED] = process_finished,
	[ITEM_ERROR] = process_error
}

-- FSM for one item
-- @param usbdir: config dir, item: runtime item in apps
-- @return save_flag: true - commit download_item, false - not commit
function process_item(usbdir, item)
	local save_flag = false
	local cfg_item = off_dl.item_tmpconf_find("download_item", "item", {gid=item.gid}, {"gid"})
	local new = nil

	if cfg_item == nil then
		debug("process_item: config item is nil")
		del_runtime_cfg_item(item.gid)
		del_runtime_task(item.type, item.gid)
	else
		debug("process_item: config item status: --------"..cfg_item.status.."--------")
		debug("process_item: runtime item status: --------"..item.status.."--------")
		local process_func = CFG_STATE_TBL[cfg_item.status]
		if process_func then
			new = process_func(usbdir, cfg_item, item)
		end
	end

	if new ~= nil then
		new.gid = item.gid
		new.type = cfg_item.type
		new.timestamp = cfg_item.timestamp
		
		update_runtime_cfg_item(item.gid, new)

		local increase
		if new.size and new.size ~= 0 and new.completed and cfg_item.completed then 
			increase = (new.completed - tonumber(cfg_item.completed)) / new.size
		end

		--if new.status ~= cfg_item.status or new.size ~= tonumber(cfg_item.size) or new.completed ~= tonumber(cfg_item.completed) then
		if new.status ~= cfg_item.status or new.size ~= tonumber(cfg_item.size) or (increase and increase > 0.05) then
			local update = {}
			update.status = new.status
			update.size = new.size
			update.completed = new.completed

			off_dl.item_tmpconf_update_spec("download_item", "item", cfg_item[".name"], update)
			save_flag = true		
		end
	end
	--nixio.nanosleep(1, 0) --after process one item, wait 1s to next
	return save_flag
end

-- do main stuff
-- @param usbdir: config dir, app_flag: amule or aria2 enable flag
-- @return N/A
function do_process(usbdir, app_flag)
	debug("do_process: start")
	local amule_runtime_items = {}
	local aria2_runtime_items = {}
	local amule_save_flag = false
	local aria2_save_flag = false
	

	create_cfg_file("runtime_item")

	if is_amule_enable(app_flag) then
		local ret = false
		amule_enable(usbdir)
		amule_add_server()
		ret, amule_runtime_items = amule_get_runtime_items()
		if ret then
			amule_save_flag = amule_process(usbdir, amule_runtime_items)
		end
	else
		local ret = off_dl.item_tmpconf_delete_cond("runtime_item", "item", {type = "amule"}, {"type"}, false)
		if ret then
			off_dl.item_tmpconf_commit("runtime_item", false)
		end
		amule_disable(usbdir)
	end

	if is_aria2_enable(app_flag) then
		local ret = false
		aria2_enable()
		ret, aria2_runtime_items = aria2_get_runtime_items()
		if ret then
			aria2_process_exception(usbdir, aria2_runtime_items)
			aria2_save_flag = aria2_process(usbdir, aria2_runtime_items)
		end
	else
		local ret = off_dl.item_tmpconf_delete_cond("runtime_item", "item", {type = "amule"}, {"type"}, true)
		if ret then
			off_dl.item_tmpconf_commit("runtime_item", false)
		end
		aria2_disable()
	end

	--[[
	if #amule_runtime_items == 0 and #aria2_runtime_items == 0 then
		truncate_cfg_file("runtime_item")
	end
	]]--

	if amule_save_flag or aria2_save_flag then
		debug("-----------commit download_item---------------")
		off_dl.item_tmpconf_commit("download_item", true)
	end

	add_runtime_task(usbdir, app_flag)

	debug("do_process: stop")
end

-- Init download directory in USB
-- @param usbdir
-- @return N/A
function init_dir(usbdir)
	fs.mkdir(usbdir..AMULE_CFG_DIR, true)
	fs.mkdir(usbdir..ARIA2_CFG_DIR, true)
	fs.mkdir(usbdir..DL_TMP_DIR, true)
	fs.mkdir(usbdir..DL_AMULE_TMP_DIR, true)
	fs.mkdir(usbdir..DL_ARIA2_TMP_DIR, true)
end

-- check config if amule or aria2 is enable
-- @param N/A
-- @return CHECK_FALSE is disable, CHECK_AMULE_TRUE amule enable, 
--         CHECK_ARIA2_TRUE aria2 enable, CHECK_AMULE_TRUE+CHECK_ARIA2_TRUE all enable
function check_type()
	local amule_flag = CHECK_FALSE
	local aria2_flag = CHECK_FALSE

	if is_seeding_enable() then
		amule_flag = CHECK_AMULE_TRUE
		aria2_flag = CHECK_ARIA2_TRUE
	else
		local items = off_dl.item_tmpconf_getall("download_item", "item", nil, nil, false)
		if items then
			for _, it in ipairs(items) do
				if it.status ~= ITEM_FINISHED then
					if it.type == "amule" then
						amule_flag = CHECK_AMULE_TRUE
					elseif it.type == "pc" or it.type == "usb" or it.type == "ftp" or it.type == "http" or it.type == "bt_url" then
						aria2_flag = CHECK_ARIA2_TRUE
					end
				end
			end
		end
	end
	debug("[Debug] check_type: amule="..amule_flag.." aria2="..aria2_flag)
	return amule_flag + aria2_flag
end

-- Check config to enable apps
-- @param: usbdir
-- @return: CHECK_FALSE, CHECK_ARIA2_TRUE, CHECK_AMULE_TRUE, CHECK_ARIA2_TRUE + CHECK_AMULE_TRUE
function check_enable(usbdir)
	local enable_start = uci.cursor():get("offline_download", "global", "enable")
	if enable_start == "off" then
		return CHECK_FALSE
	end

	-- Scan USB volumn to check config folder_path  
	local usb_status, ret_data = off_dl.scan_dir()
	if usb_status ~= IS_OK and usb_status ~= IS_DIR_CHANGE then
		debug("scan_dir is not ok")
		if fs.isfile(RUNING_PATH.."/download_item") then
			fs.unlink(RUNING_PATH.."/download_item")
		end
		-- reboot or usb hotplug will create exception file
		local f = io.open(RUNING_PATH .. "/exception", "w+")
		if f then
			f:close()
		end
		return CHECK_FALSE
	end

	--set and valid dir 
	if usbdir and fs.isdirectory(usbdir) then
		init_dir(usbdir)

		-- Campare USB download_item config file with /tmp/offline_download/download_item
		local ret = off_dl.item_tmpconf_check(usbdir)
		--if ret == false then
		if ret == false or usb_status == IS_DIR_CHANGE then
			off_dl.item_tmpconf_reload(usbdir)
		end

	else
		debug("check enable: check usbdir failed")
		return CHECK_FALSE
	end
	
	return check_type()
end

-- main monitor process for offline_download
-- @param 
-- @return 
function monitor()
	local pid = nixio.fork()
	if pid ==nil then
		return
	end
	
	if pid == 0 then
		if not fs.isdirectory(RUNING_PATH) then
			fs.mkdir(RUNING_PATH, true)
		end

		local usbdir = off_dl.get_curdir()
		local dl_app_flag = check_enable(usbdir)
		
		if dl_app_flag ~= CHECK_FALSE then
			do_process(usbdir, dl_app_flag)
		else
			truncate_cfg_file("runtime_item")
			stop_apps()
		end

		return nixio.exec("/bin/sh", "-c", "sleep 3")
	elseif pid > 0 then
		nixio.waitpid(pid)
		return
	end
end

-- start monitor
-- @param 
-- @return 
function start_monitor()
	local fp_boot = io.open("/tmp/boot_done", 'r')
	if fp_boot == nil or (fp_boot and fp_boot:read(1) ~= '1') then		
		if not fs.isdirectory(RUNING_PATH) then
			fs.mkdir(RUNING_PATH, true)
		end
		local f = io.open(RUNING_PATH.."/exception", "w+")
		if f then
			f:close()
		end
	end

	while true do
		nixio.nanosleep(1, 0)
		monitor()
	end
end

-- update the item's status
-- @param type   : item type(amule,bt,http,or ftp)
-- @param gid    : item id
-- @param status : item status
-- @return true is success, false is fail
function update_status(type, gid, status)
	local type   = arg[2]
	local gid    = arg[3]
	local status = arg[4]
	local ret    = false
	local items = off_dl.item_tmpconf_getall("download_item", "item", nil, nil, false)

	if not type or not status or not gid then 
		return false
	end

	--debug("update_status update type "..type.." gid "..gid.." to status "..status.." itemnum "..#items)
	sys.fork_call(". /etc/init.d/offline_download;stop_monitor")

	if not off_dl.is_usb_config_exist("download_item") then
		sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
		return false
	end

	if items then
		for _, it in ipairs(items) do
			if it.type == type and it.gid == gid and it.status ~= status then
				local new = {}
				new.status = status
				if status == ITEM_FINISHED then
					new.completed = it.size
					new.downloadSpeed = 0
				elseif status == ITEM_ACTIVE then
					new.completed =it.completed
					new.downloadSpeed = it.downloadSpeed
				else
					new.completed =it.completed
					new.downloadSpeed = 0
				end
				
				new.gid			= it.gid
				new.type		= it.type
				new.timestamp	= it.timestamp
				--form:update("download_item", "item", it, new, {"gid","type","timestamp","completed","downloadSpeed","status"})
				off_dl.item_tmpconf_update_spec("download_item", "item", it[".name"], new)
				off_dl.item_tmpconf_commit("download_item", true)
				
				ret = true
				break
			end
    	end
	end
	
	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")

	return ret
end

-- stop apps
-- @param 
-- @return 
function stop_apps()
	amule_disable()
	aria2_disable()
end
--############################### common above ################################--
