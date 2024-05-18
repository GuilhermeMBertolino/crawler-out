--[[
Copyright(c) 2008-2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  offline_download.lua
Details :  Web controller for offline download module.
Author  :  WANG Wenhu <wangwenhu@tp-link.net>
           ZENG Wei <zengwei@tp-link.net>
Version :  1.0.0
Date    :  Jan8th, 2015
]]--

module("luci.model.offline_download", package.seeall)

--lib
local nixio    = require "nixio"
local dtypes   = require "luci.tools.datatypes"
local dbg_prt  = require "luci.tools.debug"
local sys      = require "luci.sys"
local socket   = require "socket"
local fs       = require "luci.fs"
local ctypes   = require "luci.model.checktypes"
local usbshare = require "luci.model.usbshare"
local uci      = require "luci.model.uci"
local uci_r    = uci.cursor()
--local form     = require("luci.tools.form").Form(uci_r)
local form     = require "luci.tools.form"
local form_r   = form.Form(uci_r)
local ubus     = require "ubus"
local tsched   = require "tsched_conf"

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
local TEMP_TORRENT_FILE = "/tmp/bt.torrent"
local TEMP_RT_AR_CONFIG = "/tmp/offline_download/tmp_rt_ar_items"
local GID_BTM			= "abcdef"

local ITEM_FINISHED = "complete"
local ITEM_ERROR    = "error"
local ITEM_WAITING  = "waiting"
local ITEM_ACTIVE   = "active"
local ITEM_PAUSED   = "paused"

local NO_ADD = "0"
local NEED_ADD = "1"
local ADD_AGAIN = "2"	-- for DUT reboot and USB hotplug 
local DEL_AND_ADD = "3"	-- for timeout

local amule_ubus_table = {
	["shutdown"]		= "amuleShutdown",
	["addlink"]			= "amuleAddLink",
	["status_req"] 		= "amuleServerStatus",
	["partfile_resume"]	= "amuleFileDlResume",
	["partfile_pause"]	= "amuleFileDlPause",
	["partfile_del"]	= "amuleFileDlDelete",
	["partfile_delall"]	= "amuleFileDlDeleteAll",
	["server_con"]		= "amuleServerConnect",
	["server_discon"]	= "amuleServerDisconnect",
	["server_remove"]	= "amuleServerRemoveAll",
	["server_add"]		= "amuleServerAdd",
	["get_pref"]		= "amuleGetPref",
	["set_pref"]		= "amuleSetPref",
	["dload_queue"]		= "amuleShowAllDl",
	["is_file_complete"]	= "amuleIsFileCompleted"
}

local RUNING_PATH       = "/tmp/offline_download"
local DL_MAIN_DIR       = "/offline_download"
--local GID_DIR           = "/offline_download/.gid"
local AMULE_CFG_DIR     = "/offline_download/.amule"
local ARIA2_CFG_DIR     = "/offline_download/.aria2"
local DL_TMP_DIR        = "/offline_download/tmp"
local DL_AMULE_TMP_DIR  = "/offline_download/tmp/amule"
local DL_ARIA2_TMP_DIR  = "/offline_download/tmp/aria2"

local TIMESTAMP_PATH	= ".offlts_path"

--[[
IS_OK                  : the usb and dir is ok
IS_DIR_CHANGE		   : the dir changed
ERR_DIR_NOT_EXIST      : dir is not exist
ERR_DIR_NOT_SET        : not set dir in config
ERR_DIR_UNNORMAL       : dir is exist, but some download file unnormal
ERR_DIR_NO_USB         : no usb device
ERR_GET_CFG            : get config data fail
ERR_SET_CFG            : set config data fail
ERR_INS_CFG            : insert config session fail
ERR_DEL_CFG            : delete config session fail
ERR_COMMIT_CFG         : commit config data fail
ERR_IO                 : io operating fail
ERR_INVALID_ARGS       : invalid args
ERR_INVALID_TYPE       : invalid service type
ERR_MAX_DL_LIMIT       : reach the max download limits
ERR_INS_DOWNLOAD_ITEM  : insert exist download item
ERR_INS_INVALID_URL    : insert item with invalid url
ERR_ARIA2_SOCK_FAIL    : aria2 sock operating fail
ERR_TORRENT_FILE_WRITE : aria2 bt torrent file write fail
ERR_ARIA2_OPERATIGN    : aria2 operating fail
ERR_AMULE_SERVER_CONN  : amule server connecting fail
ERR_AMULE_UBUS_CALL    : amule ubus call fail
]]--

local IS_OK                  = "00000000"
local IS_DIR_CHANGE          = "00000001"
local ERR_DIR_NOT_EXIST      = "00000150"
local ERR_DIR_NOT_SET        = "00000151"
local ERR_DIR_UNNORMAL       = "00000152"
local ERR_DIR_NO_VOL		 = "00000153"
local ERR_GET_CFG            = "00000200"
local ERR_SET_CFG            = "00000201"
local ERR_INS_CFG            = "00000202"
local ERR_DEL_CFG            = "00000203"
local ERR_COMMIT_CFG         = "00000208"
local ERR_IO                 = "00000210"
local ERR_CHECK_MD5          = "00000211"
local ERR_INVALID_ARGS       = "00000220"
local ERR_INVALID_TYPE       = "00000221"
local ERR_MAX_DL_LIMIT       = "00000222"
local ERR_MAX_WT_LIMIT       = "00000223"
local ERR_TORRENT_SIZE_EXCEEDS = "00000224"
local ERR_INS_DOWNLOAD_ITEM  = "00000231"
local ERR_INS_INVALID_URL    = "00000234"
local ERR_INS_OTHER    		 = "00000235"
local ERR_ARIA2_SOCK_FAIL    = "00000240"
local ERR_TORRENT_FILE_WRITE = "00000241"
local ERR_ARIA2_OPERATIGN    = "00000242"
local ERR_AMULE_SERVER_CONN  = "00000250"
local ERR_AMULE_UBUS_CALL    = "00000251"

-- Debug
-- @param N/A
-- @return N/A
local function debug(str)
	--dbg_prt("[Off_DL Debug]"..str)
end

-- get number of section in condition
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  cond    : condition
-- @param  keys    : compare keys
-- @param  revert  : in conditon or not in condition
-- @return item table
function item_tmpconf_count(config, stype, cond, keys, revert)
	local conf_dir
	local cnt = 0

	if fs.isdirectory(RUNING_PATH) then
		conf_dir = uci_r:get_confdir()
		uci_r:set_confdir(RUNING_PATH)

		uci_r:foreach(config, stype,
	        function(section)
	        	if keys then
	        		for _, k in pairs(keys) do
                        if (cond[k] ~= section[k] and not revert) or (cond[k] == section[k] and revert) then
                        	return
                        end
                    end
	 			end
	            cnt = cnt + 1
	        end
	    )

		uci_r:set_confdir(conf_dir)
	end

	return cnt
end

-- get all option of section in condition
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  cond    : condition
-- @param  keys    : compare keys
-- @param  revert  : in conditon or not in condition
-- @return item table
function item_tmpconf_getall(config, stype, cond, keys, revert)
	local items = {}
	local conf_dir

	if fs.isdirectory(RUNING_PATH) then 
		--get basic info from tmp config when load
		conf_dir = uci_r:get_confdir()
		uci_r:set_confdir(RUNING_PATH)

	    uci_r:foreach(config, stype,
	        function(section)
	        	local pos = #items + 1
	        	if keys then
	        		for _, k in pairs(keys) do
                        if (cond[k] ~= section[k] and not revert) or (cond[k] == section[k] and revert) then
                        	return
                        end
                    end
	 			end
	            items[pos] = uci_r:get_all(config, section[".name"])
	            items[pos].index = section[".index"]
	        end
	    )

	    uci_r:set_confdir(conf_dir)
	end

    return items
end

-- find section in condition
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  cond    : condition
-- @param  keys    : compare keys
-- @return success or fail
function item_tmpconf_find(config, stype, cond, keys)
	local item = nil
	local conf_dir
	local sname

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	sname = form_r:_find_item(config, stype, cond, keys)
	if sname then
		item = uci_r:get_all(config, sname)
	end

	uci_r:set_confdir(conf_dir)

	return item
end

-- insert section
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  new     : new item
-- @param  keys    : compare keys
-- @return success or fail
function item_tmpconf_insert(config, stype, new, keys)
	local ret = false
	local conf_dir

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = form_r:insert(config, stype, new, keys)
	uci_r:set_confdir(conf_dir)

	return ret
end

-- update specific section by section name
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  sname   : section name
-- @param  newitem : new item
-- @return success or fail
function item_tmpconf_update_spec(config, stype, sname, newitem)
	local conf_dir
	local ret = false

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = uci_r:section(config, stype, sname, newitem)
	uci_r:set_confdir(conf_dir)

	return ret
end

-- update section 
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  olditem : old item
-- @param  newitem : new item
-- @param  keys    : compare keys
-- @return success or fail
function item_tmpconf_update(config, stype, olditem, newitem, keys)
	local conf_dir
	local ret = false

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = form_r:update(config, stype, olditem, newitem, keys)
	uci_r:set_confdir(conf_dir)

	return ret
end

-- delete section in specific section name
-- @param  config  : config file
-- @param  sname   : config file section name
-- @return success or fail
function item_tmpconf_delete_spec(config, sname)
	local ret
	local conf_dir

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = uci_r:delete(config, sname) and true or false
	uci_r:set_confdir(conf_dir)

	return ret
end

-- delete section in key index pairs
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  key     : item keys
-- @param  index   : item indexes
-- @return success or fail
function item_tmpconf_delete(config, stype, key, index)
	local ret
	local conf_dir

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = form_r:delete(config, stype, key, index)
	uci_r:set_confdir(conf_dir)

	return ret
end

-- delete section in specific confition
-- @param  config  : config file
-- @param  stype   : config file section type
-- @param  cond    : condition
-- @param  keys    : condition keys
-- @param  revert  : in condition or not in condition
-- @return success or fail
function item_tmpconf_delete_cond(config, stype, cond, keys, revert)
	local ret = false
	local conf_dir

	if not fs.isdirectory(RUNING_PATH) then
		return false
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)

    uci_r:foreach(config, stype,
        function(section)
        	if keys then
        		for _, k in pairs(keys) do
                    if (cond[k] ~= section[k] and not revert) or (cond[k] == section[k] and revert) then
                    	return
                    end
                end
 			end
 			ret = uci_r:delete(config, section[".name"])
        end
    )
	uci_r:set_confdir(conf_dir)

	return ret
end

-- delete sections in specific type
-- @param  config  : config file
-- @param  stype   : config file section type
-- @return success or fail
function item_tmpconf_delall(config, stype)
	local ret
	local conf_dir

	if not fs.isdirectory(RUNING_PATH) then 
		return nil
	end

	conf_dir = uci_r:get_confdir()
	uci_r:set_confdir(RUNING_PATH)
	ret = uci_r:delete_all(config, stype)
	uci_r:set_confdir(conf_dir)

	return ret
end

-- backup item config file to usb directory
-- @param  config    : config file
-- @return success or fail
function item_tmpconf_save(config)
	if not config then
		return false
	end

	local path = get_curdir()

	if not fs.isdirectory(RUNING_PATH) or not path or not fs.isdirectory(path) then 
		return false
	end

	local config_file = RUNING_PATH.."/"..config
	local usb_config_file = path.."/."..config
	local ret = false
	if fs.isfile(config_file) then
		ret = nixio.fs.datacopy(config_file, usb_config_file)
	end

	return ret
end

-- commit item config file
-- @param  config    : config file
-- @param  save_flag : if need backup to usb directory
-- @return N/A
function item_tmpconf_commit(config, save_flag)
	local ret
	uci_r:commit_without_write_flash(config)

	if save_flag then
		ret = item_tmpconf_save(config)
	end
	return ret
end

-- Check download_items file md5sum
-- @param dir : download working path
-- @return true or false
function item_tmpconf_check(dir)
	--[[
	local ret = false
	--local dir = get_curdir()

	if dir and fs.isdirectory(dir) then
		local dl_items_file = dir .. "/.download_item"
		if not fs.isfile(dl_items_file) then
			return false
		end

		if not fs.isfile(RUNING_PATH .. "/download_item") then
			return false
		end

		local usb_sum = get_md5sum(dl_items_file, "/dl_item.md5")
		if nil == usb_sum then
			return false
		end

		local tmp_sum = get_md5sum(RUNING_PATH .. "/download_item", "/dl_item.md5")
		if nil == tmp_sum then
			return false
		end

		ret = (usb_sum == tmp_sum) and true or false
	end
	
	return ret
	]]--
	local dl_items_file = dir.."/.download_item"
	if not fs.isfile(dl_items_file) then
		local f = io.open(dl_items_file, "w+")	
		if f then
			f:close()
		end
	end

	return fs.isfile(RUNING_PATH .. "/download_item") and true or false
end

-- reload download_item file from usb directory
-- @param dir : download working path
-- @return N/A
function item_tmpconf_reload(dir)
	--local dir = get_curdir()

	if dir and fs.isdirectory(dir) then
		local dl_items_file = dir .. "/.download_item"
		if not fs.isfile(dl_items_file) then
			local f = io.open(dl_items_file, "w+")
			if f then
				f:close()
			end
		end

		if not fs.isdirectory(RUNING_PATH) then
			fs.mkdir(RUNING_PATH)
		end

		nixio.fs.datacopy(dl_items_file, RUNING_PATH .. "/download_item")
	end
end

-- get the path 
-- @param uuid 
-- @param path 
-- @return path
function get_path(uuid, path)
	local dir = nil
	
	if not uuid then
		return nil
	end
	
	local parser = usbshare.CfgParser()
	local volumn = parser:get_volumn(uuid)
	
	if volumn then
		if path then
			dir = volumn.mntdir..path
		else
			dir = volumn.mntdir
		end
	end
	
	return dir
end

-- remove config path prefix
-- @param path
-- @return no_prefix path
function remove_prefix(path)
	if not path then
		return nil
	end

	local pos = string.find(path, ":") + 1
	local no_prefix = path:sub(pos) or ""
	return no_prefix
end

-- get config path prefix
-- @param path
-- @return prefix
function get_prefix(path)
	local pos = string.find(path, ":")
	local prefix = path:sub(1, pos) or ""
	return prefix
end

-- get the download working path 
-- @param N/A
-- @return path
function get_curdir()
	local cfg_uuid = uci_r:get("offline_download", "global", "uuid")
	local cfg_path = uci_r:get("offline_download", "global", "path")

	if cfg_path then
		cfg_path = remove_prefix(cfg_path)
	end

	return get_path(cfg_uuid, cfg_path)
end

-- get the download time stamp file path
-- @param N/A
-- @return time stamp path
function get_tsdir()
	local cfg_uuid = uci_r:get("offline_download", "global", "uuid")

	return get_path(cfg_uuid, "")
end

-- Get file's md5sum
-- @param file
-- @return md5 sum 
function get_md5sum(file, md5_file)
	local sum = nil
	local MD5_FILE = md5_file and RUNING_PATH..md5_file or RUNING_PATH.."/file.md5"

	if fs.isfile(MD5_FILE) then
		fs.unlink(MD5_FILE)
	end
	
	if file then
		sys.fork_call("md5sum " .. file .. " > " .. MD5_FILE)
		local f = io.open(MD5_FILE, "rb")
		if f then
			sum = f:read(32)
			f:close()
		end
	end

	return sum
end

-- add the download path time stamp in dir
-- @param timestamp : time stamp
-- @param dir       : usb storage directory
-- @return success or fail
function add_timestamp_file(dir)
	if not timestamp or not dir or not fs.isdirectory(dir) then
		return false
	end

	--remove all files begin with ts_
	remove_timestamp_file(dir)
	
	local f = io.open(dir.."/"..TIMESTAMP_PATH, "w+")
	if f then
		f:close()
	end

	return true
end

function get_path_from_ts_file(rootdir)
	if not rootdir then
		return nil
	end

	local ts_file = rootdir .. "/" .. TIMESTAMP_PATH
	local f = io.open(ts_file, "r")
	if not f then
		return nil
	end

	local path = nil
	path = f:read("*l")
	f:close()
	
	if path == "/" then
		path = ""
	end
	
	return path 
end

-- remove the time stamp in dir
-- @param dir       : usb storage directory
-- @return success or fail
function remove_timestamp_file(dir)
	if not dir or not fs.isdirectory(dir) then
		return false
	end

	local ts_file = dir.."/"..TIMESTAMP_PATH
	if fs.isfile(ts_file) then
		fs.unlink(ts_file)
	end

	return true
end

-- delete all downloading file when change dir
-- @param N/A
-- @return N/A
function change_dir_delitems()
	--amule items delete
	amule_del_all_items()
	--aria2 items delete
	aria2_del_all_items()
end

-- transfer config data when change dir
-- @param new_dir
-- @return N/A
function change_dir_transconf(old_dir, new_dir)
	--if any downloading, just retry
	local items = item_tmpconf_getall("download_item", "item", nil, nil, false)
	local item = {}

	for _, it in pairs(items) do
		if it.status ~= ITEM_FINISHED then
			if it.needAdded == "0" then
				item.needAdded = "1"
				item.completed = 0
				item.status    = ITEM_WAITING
				item.type	   = it.type
				item.completed = it.completed
				item.timestamp = it.timestamp
				item.gid       = it.gid
				item.file      = it.file
				item.size      = it.size
				if it.type == "pc" then
					local new_torrent_file = new_dir..DL_ARIA2_TMP_DIR.."/"..it.timestamp..".torrent"
					local old_torrent_file = old_dir..DL_ARIA2_TMP_DIR.."/"..it.timestamp..".torrent"
					nixio.fs.copy(old_torrent_file, new_torrent_file)
				end
				--debug(it[".name"])
				--item_tmpconf_update("download_item", "item", it, item, {"gid","type","timestamp","completed","status","size", "needAdded"})
				item_tmpconf_update_spec("download_item", "item", it[".name"], item)
			end
		else
			item_tmpconf_delete_spec("download_item", it[".name"])
		end
	end

	--save file download_item
	item_tmpconf_commit("download_item", true)

	if fs.isdirectory(RUNING_PATH) then
		if fs.isfile(RUNING_PATH.."/download_item") then
			fs.unlink(RUNING_PATH.."/download_item")
		end

		if fs.isfile(RUNING_PATH.."/runtime_item") then
			fs.unlink(RUNING_PATH.."/runtime_item")
		end 
	end
end

-- change path to new
-- @param new : new path
-- @return success or fail
function change_dir(new)
	local old_fsdir = nil
	local old_tsdir = nil
	local new_fsdir = nil
	local new_tsdir = nil

	new_fsdir = get_path(new.uuid, remove_prefix(new.path))
	new_tsdir = get_path(new.uuid, "")
	
	if not new_fsdir then
		return false, ERR_DIR_NOT_SET
	end
	
	if not fs.isdirectory(new_fsdir) then
		local data = {}
		data.info = new_fsdir
		return false, ERR_DIR_NOT_EXIST, data
	end

	old_fsdir = get_curdir()
	old_tsdir = get_tsdir()

	if new_fsdir == old_fsdir then
		local cfg_path = uci_r:get("offline_download", "global", "path")
		if new.path == cfg_path then
			return true
		end
	end

	--delete all uncompleted files to ensure safe
	change_dir_delitems()

	------------------stop app and monitor------------------
	sys.fork_call("/etc/init.d/offline_download stop")

	--make new dirs
	uci_r:set("offline_download", "global", "uuid", new.uuid)
	uci_r:set("offline_download", "global", "path", new.path)

	uci_r:commit("offline_download")
	local new_dirs = new_fsdir..AMULE_CFG_DIR.." "..new_fsdir..ARIA2_CFG_DIR.." "
				 ..new_fsdir..DL_TMP_DIR.." "..new_fsdir..DL_AMULE_TMP_DIR.." "..new_fsdir..DL_ARIA2_TMP_DIR
	sys.fork_call("mkdir -p "..new_dirs)
	--make new timestamp file
	add_timestamp_file(new_tsdir)

	--mv the needed config files from old dirs to newdirs
	change_dir_transconf(old_fsdir, new_fsdir)

	--remove old dirs
	if old_fsdir and fs.isdirectory(old_fsdir) and fs.isdirectory(old_fsdir..DL_MAIN_DIR) then
		local old_dirs = old_fsdir..AMULE_CFG_DIR.." "..old_fsdir..ARIA2_CFG_DIR.." "
				 ..old_fsdir..DL_TMP_DIR.." "..old_fsdir..DL_AMULE_TMP_DIR.." "..old_fsdir..DL_ARIA2_TMP_DIR
		sys.fork_call("rm -rf "..old_dirs)
	end
	--remove old timestamp file
	remove_timestamp_file(old_tsdir)

	--start the monitor shell
	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
	------------------start app and monitor------------------

	return true
end

-- check USB device exist or not
function has_usb_device()
	local usb_flag = false

    for file in nixio.fs.dir("/dev") do
		if file:find("sd") == 1 then
			usb_flag = true
			break
        end
	end

    return usb_flag
end

-- check volumn mounted or not
function has_volumn_mounted()
	local vol_flag = false

	local file = io.open("/proc/mounts", "r")
	if not file then
		return false
	end

	for line in file:lines() do 
	    if line then
	        if string.find(line, "/dev/sd") then
	        	vol_flag = true
	            break
	        end
	    end
	end
	file:close()

	return vol_flag
end

-- set usbstatus cache file 
function set_usbstatus_file(status_code, usb_data)
	local file = io.open(RUNING_PATH.."/usbstatus", "w+")
	if not file then
		return false
	end

	file:write(status_code.."\n")
	file:write(usb_data.uuid .."\n")
	file:write(usb_data.path.."\n")
	file:close()
	return true
end

function scan_timestamp_file(rootdir, no_prefix_path)
	if not rootdir or not no_prefix_path then
		return false
	end

	local real_no_prefix_path = no_prefix_path == "" and "/" or no_prefix_path

	local ts_file = rootdir.."/"..TIMESTAMP_PATH 
	if not fs.isfile(ts_file) then
		local f = io.open(ts_file, "w+")
		if f then
			f:write(real_no_prefix_path)
			f:close()
		end
	else
		local f = io.open(ts_file, "r")
		if f then
			local path = f:read("*l")
			f:close()
			if path ~= real_no_prefix_path then
				f = io.open(ts_file, "w+")
				if f then
					f:write(real_no_prefix_path)
					f:close()
				end
			end
		end
	end

	return true
end
-- scan if the the global dir need to modify 
-- @param N/A
-- @return status code and path data
function scan_dir()
	local cfg_uuid = uci_r:get("offline_download", "global", "uuid")
	local cfg_path = uci_r:get("offline_download", "global", "path")

	local ret_data = {}
	local ret_code = ERR_DIR_NOT_EXIST
	local dl_vol   = nil 
	local dl_dir   = nil
	local no_prefix_path = nil
	ret_data.uuid  = cfg_uuid
	ret_data.path  = cfg_path

	if not fs.isdirectory(RUNING_PATH) then
		fs.mkdir(RUNING_PATH, true)
	end
		
	if cfg_path then
		no_prefix_path = remove_prefix(cfg_path)
	end

	if has_usb_device() == false or has_volumn_mounted() == false then
		ret_code = ERR_DIR_NO_VOL
	else
		local parser = usbshare.CfgParser()
		local volumns = parser:get_allvolumns()
		for _, vol in pairs(volumns) do 
			if vol.enable == "on" then
				if vol.uuid == cfg_uuid and no_prefix_path and fs.isdirectory(vol.mntdir .. no_prefix_path) then
					scan_timestamp_file(vol.mntdir, no_prefix_path)
					dl_dir = no_prefix_path
					dl_vol = vol
					ret_code = IS_OK
					break
				else
					local path = get_path_from_ts_file(vol.mntdir)
					if path and fs.isdirectory(vol.mntdir .. path) and ret_code ~= IS_DIR_CHANGE then
						dl_dir = path
						dl_vol = vol
						ret_code = IS_DIR_CHANGE
					end
				end
			end
		end
	end

	if ret_code == IS_OK or ret_code == IS_DIR_CHANGE then
		ret_data.uuid = dl_vol.uuid
		ret_data.path = dl_vol.path_prefix .. dl_dir
		if dl_vol.uuid ~= cfg_uuid or ret_data.path ~= cfg_path then
			uci_r:set("offline_download", "global", "uuid", ret_data.uuid)
			uci_r:set("offline_download", "global", "path", ret_data.path)
			uci_r:commit_without_write_flash("offline_download")
		end
	end

	if set_usbstatus_file(ret_code, ret_data) == false then
		return ERR_DIR_UNNORMAL
	end

	return ret_code, ret_data
end

-- insert new amule item 
-- @param item : item need to insert
-- @return inserted item
function amule_add_new_download(item)
	local data = {}
	
	--ed2k://|file|fileName|fileSize|fileHash|...
	local type, name, size, hash = string.match(item.url, "ed2k://|(.-)|(.-)|(.-)|(.-)|")
	
	if type ~= "file" or not name or not size or not hash then
		return false, ERR_INS_INVALID_URL
	end

	--check if dup download item
	local it_d = item_tmpconf_find("download_item", "item", {gid=hash}, {"gid"})
	if it_d then
		return false, ERR_INS_DOWNLOAD_ITEM
	end

	data.type			= item.type
	data.timestamp		= os.time()
	data.file	  		= name
	data.gid            = hash
	data.status	  		= ITEM_WAITING
	data.size    		= size
	data.completed      = 0
	data.url			= item.url
	data.needAdded      = "1"
	--data.numSeeders		= 0
	
	return true, data
end

-- send message to amue by ubus
-- @param reqType  : request type
-- @param reqParam : request params
-- @return response message
function amule_send_message(reqType, reqParam)
	local response
	local UBUS_OBJECT = "amule_ubus"
	local _ubus = ubus.connect()
	local UBUS_METHOD = amule_ubus_table[reqType]

	response  = _ubus:call(UBUS_OBJECT, UBUS_METHOD, reqParam)
	
	if response == nil then
		return false, ERR_AMULE_UBUS_CALL
	else
		return true, response
	end
	
end

-- set speed limit to amuled
-- @param: upload, download
-- @return ret: true or false, response: message from amule
function amule_set_speed(upload, download)
	return amule_send_message("set_pref", {maxul=tonumber(upload), maxdl=tonumber(download)})
end

-- Add one download item in amuled
-- @param: url: item's url
-- @return: ret: true or false, response: message from amule
function amule_add_item(url)
	return amule_send_message("addlink", {link_url=url})
end
-- Remove one download item in amuled
-- @param: gid: item's gid
-- @return: ret: true or false, response: message from amule
function amule_del_item(gid)
	return amule_send_message("partfile_del", {hash=gid})
end
-- Pause one download item in amuled
-- @param: gid: item's gid
-- @return: ret: true or false, response: message from amule
function amule_pause_item(gid)
	return amule_send_message("partfile_pause", {hash=gid})
end
-- Resume one download item in amuled
-- @param: gid: item's gid
-- @return: ret: true or false, response: message from amule
function amule_resume_item(gid)
	return amule_send_message("partfile_resume", {hash=gid})
end
-- Remove all download items in amuled
-- @param: N/A
-- @return: ret: true or false, response: message from amule
function amule_del_all_items()
	return amule_send_message("partfile_delall", {})
end

-- send message to aria2 by sock
-- @param reqType  : request type
-- @param reqParam : request params
-- @param undec    : if need decode
-- @return response message
function aria2_send_message(reqType, reqParam, undec)
	local recvt, sendt, status, response, receive_status
	local reqId   = os.time()
	local request = reqType..reqId..MSG_MIDT..reqParam..MSG_TAIL
	local PORT    = "6898"
	local HOST    = "127.0.0.1"

	local sock = socket.connect(HOST, PORT)
	
	if not sock then
		return false, ERR_ARIA2_SOCK_FAIL
	end
	
	sock:send(request)
	recvt, sendt, status = socket.select({sock}, nil, 4)

	if(#recvt > 0) then
		response, receive_status = sock:receive('*l')
		sock:settimeout(10)

		if not response then
			return false, ERR_ARIA2_SOCK_FAIL
		end

		--debug(response)
		if receive_status ~= "closed" then
			if (nil == undec) then
				response = luci.json.decode(response)
			end
			
			if response.error ~= nil then
				return false, response
			end
			return true, response
		end
		
		return false, ERR_ARIA2_SOCK_FAIL
	end
	
	return false, ERR_ARIA2_OPERATIGN
end

-- Remove one download item in aria2c
-- @param: gid
-- @return: N/A
function aria2_del_item(gid)
	aria2_send_message(REMOVE, '"'..gid..'"')
	-- aria2 needs time to change item status from active to removed.
	nixio.nanosleep(3, 0)
	aria2_send_message(REMOVE_RESULT, '"'..gid..'"')
end

-- Remove item result in aria2c
-- @param: gid
function aria2_del_item_result(gid)
	aria2_send_message(REMOVE_RESULT, '"'..gid..'"')
end

-- Remove all download items in aria2c via config file
-- @param: gid
-- @return: N/A
function aria2_del_all_items()
	local items = item_tmpconf_getall("download_item", "item", nil, nil, false)
	for _, it in ipairs(items) do 
		aria2_del_item(it.gid)
	end
end

-- Get download item status in aria2c
-- @param: gid, param
-- @return: ret: true or false, response: aria2c's results
function aria2_get_status(gid, param)
	return aria2_send_message(STATUS, '"'..gid..param)
end

-- Get download item status in aria2c
-- @param: gid, param
-- @return: ret: true or false, response: aria2c's results
function aria2_change_global(message)
	return aria2_send_message(CHANGEGLOBAL, message)
end

-- Pause download item status in aria2c
-- @param: gid, param
-- @return: ret: true or false, response: aria2c's results
function aria2_pause_item(gid)
	return aria2_send_message(PAUSE, '"'..gid..'"')
end

-- Resume download item in aria2c
-- @param: gid, param
-- @return: ret: true or false, response: aria2c's results
function aria2_resume_item(gid)
	return aria2_send_message(UNPAUSE, '"'..gid..'"')
end

-- check if aria2 item is reduplicate
-- @param config   : item config file
-- @param new_item : item need to check
-- @return find or not
function aria2_check_dupitem(config, new_item)
	local ret

	if new_item.type == "pc" or new_item.type == "usb" then
		ret = item_tmpconf_find(config, "item", {md5sum=new_item.md5sum}, {"md5sum"}) and true or false
	else
		ret = item_tmpconf_find(config, "item", {url=new_item.url}, {"url"}) and true or false
	end

	return ret
end

-- parse torrent file's name
-- @param str: file line
-- @param name
function get_torrent_file_name(str)
	local file_name
	local key_word = "4:name"
	local patten = "4:name[%d]*:"

	if not str then
		return nil
	end

	local key_len = string.len(key_word)
	local s_pos, e_pos = string.find(str, patten)
	
	if s_pos and e_pos then
		local name_len = tonumber(string.sub(str, s_pos + key_len, e_pos - 1))
		if name_len < 256 then
			file_name = string.sub(str, e_pos + 1, e_pos + name_len)
		end
	end 

	return file_name	
end

TORRENT_TOKEN_FUNC = {
	["name"] = get_torrent_file_name
}

-- parse torrent file
-- @param torrent path, token to parse
-- @param parse result
function parse_torrent_token(torrent, token)
	local result
	local f = io.open(torrent, "r")
	if not f then
		return nil
	end

	for line in f:lines() do 
		local token_fn = TORRENT_TOKEN_FUNC[token]
		if token_fn then
			result = token_fn(line)
			if result then
				break
			end
		end
	end

	f:close() 

	return result
end

-- insert new aria2 item 
-- @param item : item need to insert
-- @return inserted item
function aria2_add_new_download(item)
	local data = {}
	local ret, res

	data.type			= item.type
	data.status	  		= ITEM_WAITING
	--data.downloadSpeed  = 0
	data.timestamp      = os.time()
	data.gid			= data.timestamp..GID_BTM
	data.completed      = 0
	data.file			= ""
	data.size			= 0
	data.url			= item.url
	data.needAdded      = "1"
	--data.numSeeders		= 0
	
	if item.type == "pc" then
		--torrent file loaded from pc and stored in /tmp directory
		--if PC torrent file's size exceeds, /tmp/bt.torrent will be truncated. 
		local torrentSize = fs.stat(TEMP_TORRENT_FILE).size
		if torrentSize == 0 then
			return false, ERR_TORRENT_SIZE_EXCEEDS
		end

		local torrentPath = get_curdir()
		local torrentFile = os.time()
		
		if torrentPath == nil then
			return false, ERR_DIR_NOT_EXIST
		end
		
		data.torrent = torrentPath..DL_ARIA2_TMP_DIR.."/"..tostring(torrentFile)..".torrent"
		--debug(data.torrent)
		--nixio.fs.copy(TEMP_TORRENT_FILE, data.torrent)
		sys.fork_exec("cp "..TEMP_TORRENT_FILE.." "..data.torrent)

		data.md5sum = get_md5sum(TEMP_TORRENT_FILE, "/torrent.md5")
		if data.md5sum == nil then 
			debug("[Debug] aria2_add_new_download:---pc---md5sum cal failed")
			return false, ERR_CHECK_MD5
		end
	elseif item.type == "usb" then
		data.torrent = get_path(item.bt_file_volumn, remove_prefix(item.bt_file))

		if fs.stat(data.torrent).size > 1000000 then
			return false, ERR_TORRENT_SIZE_EXCEEDS
		end

		local rel_torrentPath = (string.gsub(data.torrent, "[% %&%'%@%#%!%~%$%%%^%*%(%)%+%{%}%[%]]", "\\%1"))
		data.md5sum = get_md5sum(rel_torrentPath, "/torrent.md5")
		if data.md5sum == nil then 
			debug("[Debug] aria2_add_new_download:---usb---md5sum cal failed")
			return false, ERR_CHECK_MD5
		end
	else
		if data.url then
			if item.type == "http" or item.type == "ftp" then
				data.file = string.match(data.url, ".+/([^/]*%.%w+)$")
			else
				--FIXME: bt url, aria2 will download torrent and parse the torrent file without return file info,
				--need to decode the torrent file before download actual file.
				
			end
		end
	end
	
	--check if dup item
	ret = aria2_check_dupitem("download_item", data)
	if ret == true then
		debug("[Debug] aria2_add_new_download:---dupitem")
		return false, ERR_INS_DOWNLOAD_ITEM
	end

	-- after check dup, try to get torrent file name
	if item.type == "pc" then
		data.file = parse_torrent_token(TEMP_TORRENT_FILE, "name") or ""
	elseif item.type == "usb" then
		data.file = parse_torrent_token(data.torrent, "name") or ""
	end
	return true, data
end

-- check download items
-- @param N/A
-- @return item table
function check_items()
	local ga_items = {}

	--get real time current items
	local runtime_items = item_tmpconf_getall("runtime_item", "item", nil, nil, false)

	--get basic info from config when load
	local items = item_tmpconf_getall("download_item", "item", nil, nil, false)

	for cnt, it in ipairs(items) do
			ga_items[cnt] = {}
			ga_items[cnt].type = it.type
			ga_items[cnt].completed = it.completed
			ga_items[cnt].gid = it.gid
			ga_items[cnt].file = it.file
			ga_items[cnt].timestamp = it.timestamp
			ga_items[cnt].size = it.size
			ga_items[cnt].status = it.status
			ga_items[cnt].downloadSpeed = 0
			ga_items[cnt].uploadSpeed = 0
			ga_items[cnt].connections = 0
			ga_items[cnt].numSeeders = 0
			ga_items[cnt].key = it.gid
			--ga_items[cnt].index = it.index

		for _, r in ipairs(runtime_items) do
			if it.gid == r.gid and it.type == r.type and it.timestamp == r.timestamp then
				ga_items[cnt].downloadSpeed = r.downloadSpeed
				ga_items[cnt].uploadSpeed = r.uploadSpeed
				ga_items[cnt].connections = r.connections
				ga_items[cnt].numSeeders = r.numSeeders
				break
			end
		end
	end

	return ga_items
end

-----------------------enable for dispatch-----------------------
-- get offline download enable or disable status
-- @param N/A
-- @return enable or disable status
function enable_read()
	local it = {}
	local enable = uci_r:get("offline_download", "global", "enable")
	
	it.enable = enable == "on" and "on" or "off"
	
    return it
end

-- set offline download enable or disable
-- @param http_form : enable or disable
-- @return enable or disable status
function enable_write(http_form)
	local new	 = {}
	local old	 = {}
	local ret    = nil
	
	old = enable_read()
	new.enable = http_form["enable"]

    if not ctypes.check_onoff(new.enable) then
        return false, ERR_INVALID_ARGS
    end
	
    if old.enable ~= new.enable then
        ret = uci_r:set("offline_download", "global", "enable", new.enable == "on" and "on" or "off")
		uci_r:commit("offline_download")
		if ret == nil then
			return false, ERR_SET_CFG
		end
	end
	
	return new
end
-----------------------enable for dispatch-----------------------
-----------------------allocation for dispatch-----------------------
-- get usb storage path
-- @param N/A
-- @return path or error
function allocation_read()
	local ret_code
	local ret_data = {}
	
	--first get from usbstatus, scan_again when file not exist
	local file = io.open(RUNING_PATH.."/usbstatus", "r")
	if not file then
		ret_code = IS_OK
		ret_data.uuid = uci_r:get("offline_download", "global", "uuid")
		ret_data.path = uci_r:get("offline_download", "global", "path")
	else
		ret_code      = file:read("*l")
		ret_data.uuid = file:read("*l")
		ret_data.path = file:read("*l")
		file:close()
	end

	if ret_code ~= IS_OK and ret_code ~= IS_DIR_CHANGE then
		return false, ret_code, ret_data
	end

	return ret_data
end

-- write usb storage path
-- @param http_form : path
-- @return path
function allocation_write(http_form)
	local new	 = {}
	local ret    = nil
	local errcode = nil
	local retdata = {}
	
	new.uuid = http_form["uuid"]
	new.path = http_form["path"]

	if not new.uuid or not new.path then
		return false, ERR_INVALID_ARGS
	end 

	ret, errcode, retdata = change_dir(new)
	if ret == false then
		return false, errcode, retdata
	end
	
	return new
end
-----------------------allocation for dispatch-----------------------

------------------------item for dispatch------------------------
--item.load. act when load page, just load from config
-- load items
-- @param N/A
-- @return items table
function item_load()
	local items = {}
	
	--check download items
	items = check_items()
	--debug("end items "..#items)

	return items
end

-- parse url
-- @param url
-- @return download type
function parse_url(url)
	local ret_type

	if not url then
		return ERR_INVALID_ARGS
	end

	if string.find(url, "^http://") or string.find(url, "^https://") then
		if string.find(url, ".torrent$") then
			ret_type = "bt_url"
		else
			ret_type = "http"
		end
	elseif string.find(url, "^ftp://") then
		if string.find(url, ".torrent$") then
			ret_type = "bt_url"
		else
			ret_type = "ftp"
		end
	elseif string.find(url, "^ed2k://") then
		ret_type = "amule"
	else
		ret_type = ERR_INVALID_TYPE
	end

	return ret_type
end

-- check usb config file
-- @param config
-- @return true or false
function is_usb_config_exist(config)
	if not config then
		return false
	end

	local path = get_curdir()
	if not fs.isdirectory(RUNING_PATH) or not path or not fs.isdirectory(path) then 
		return false
	end

	local usb_config_file = path.."/."..config
	if not fs.isfile(usb_config_file) then
		return false
	end
	
	return true
end

-- insert items
-- @param http_form : need insert items
-- @return inserted items table
function item_insert(http_form)
    local ret  = false
	local res  = nil
	local data = {}
    local new  = http_form and http_form.new or false
	
    if new then
        new = luci.json.decode(new)
    else
        return false, ERR_INVALID_ARGS
    end

	local items = item_tmpconf_getall("download_item", "item", nil, nil, false)
	local max_download_items = uci_r:get_profile("offline_download", "max_download_items") or 100
	if max_download_items and items and #items >= tonumber(max_download_items) then
		debug("item_insert failed: max download items limited")
		return false, ERR_MAX_DL_LIMIT
	end

	if new.type == "url" then
		new.type = parse_url(new.url)
		if new.type == "amule" then
			ret, res = amule_add_new_download(new)
		elseif new.type == "http" or new.type == "ftp" or new.type == "bt_url" then	--FIXME: bt url
			ret, res = aria2_add_new_download(new)
		else
			return false, ERR_INVALID_TYPE
		end
	elseif new.type == "pc" or new.type == "usb" then
		ret, res = aria2_add_new_download(new)
	else
		return false, ERR_INVALID_TYPE
	end
	
	if ret ~= true then
		debug("item_insert failed: add to app failed")
		return false, res
	end

	sys.fork_call(". /etc/init.d/offline_download;stop_monitor")
	
	--insert config
	if not is_usb_config_exist("download_item") then
		sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
		return false, ERR_INS_CFG
	end

    ret = item_tmpconf_insert("download_item", "item", res, nil)
    if ret then
    	item_tmpconf_commit("download_item", true)
    	data[#data+1]={
			completed       = res.completed,
			file            = res.file,
			size            = res.size,
			gid             = res.gid,
			status          = res.status,
			type 			= res.type,
			timestamp		= res.timestamp,
			downloadSpeed   = 0,
			uploadSpeed		= 0,
			connections		= 0,
			numSeeders		= 0
		}
	end
	
	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
	
	if ret == false then
		debug("item_insert failed: item_tmpconf_insert faile")
		return false, ERR_INS_CFG
	end
	
	return data
end

-- remove downloading items
-- @param http_form : need remove items
-- @return removed items table
function item_remove(http_form)
	local ret
	local keys = type(http_form.key) == "table" and http_form.key or {http_form.key}
	local indexes = type(http_form.index) == "table" and http_form.index or {http_form.index}
	local gids  = type(http_form.gid ) == "table" and http_form.gid or {http_form.gid}
	local data = {}
	
	--stop monitor before remove and start monitor after commit
	sys.fork_call(". /etc/init.d/offline_download;stop_monitor")

	if not is_usb_config_exist("download_item") then
		sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
		return false, ERR_DEL_CFG
	end

	--delete in download_item
	for i, gid in ipairs(gids) do
		ret = item_tmpconf_delete_cond("download_item", "item", {gid = gid}, {"gid"}, false)
		data[i] = { success = true,
					key = keys[i],
					index = indexes[i]}
	end

	if ret then
		item_tmpconf_commit("download_item", true)
	end

	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
	
	if ret == false then
		return false, ERR_DEL_CFG
	end	
	
	return data
end

-- pause downloading items
-- @param http_form : need pause items
-- @return paused items table
function item_pause(http_form)
    local item_new = {}
	local data = {}
    local changed_flag = false
    local gids  = type(http_form.gid ) == "table" and http_form.gid or {http_form.gid}
    local types = type(http_form.type) == "table" and http_form.type or {http_form.type}
    local keys  = type(http_form.key ) == "table" and http_form.key or {http_form.key}
    local indexes = type(http_form.index ) == "table" and http_form.index or {http_form.index}
	
	sys.fork_call(". /etc/init.d/offline_download;stop_monitor")

	if not is_usb_config_exist("download_item") then
		sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
		return false, ERR_DEL_CFG
	end

    for i, v in ipairs(gids) do
		local item = item_tmpconf_find("download_item", "item", {gid=v,type=types[i]}, {"gid","type"})
		local ret = false
		
		if item then
			item_new[i]={
				completed = item.completed,
				file      = item.file,
				size      = item.size,
				gid       = item.gid,
				status 	  = item.status,
				type 	  = item.type,
				timestamp = item.timestamp
			}

			if item.status == ITEM_ACTIVE or item.status == ITEM_WAITING then
				item_new[i].status = ITEM_PAUSED
				
				if item.status == ITEM_WAITING then
					item_new[i].needAdded = NO_ADD
				end

				--ret = item_tmpconf_update("download_item", "item", item, item_new[i], {"gid","type","timestamp","status"})
				ret = item_tmpconf_update_spec("download_item", "item", item[".name"], item_new[i])
				changed_flag = true
				if not ret then
					item_new[i].status = item.status
				end
			end
			
			item_new[i].downloadSpeed = 0
			item_new[i].uploadSpeed   = 0
			item_new[i].connections	  = 0
			item_new[i].numSeeders	  = 0
			item_new[i].success 	  = true
			item_new[i].key     	  = keys[i]
			item_new[i].index   	  = indexes[i]
		end
	end

	if changed_flag == true then
		item_tmpconf_commit("download_item", true)
	end

	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")

	return item_new
end

-- resume stopped items
-- @param http_form : need resume items
-- @return resumed items table
function item_resume(http_form)
    local item_new = {}
	local data = {}
    local changed_flag = false
    local gids  = type(http_form.gid ) == "table" and http_form.gid or {http_form.gid}
    local types = type(http_form.type) == "table" and http_form.type or {http_form.type}
    local keys  = type(http_form.key ) == "table" and http_form.key or {http_form.key}
    local indexes = type(http_form.index ) == "table" and http_form.index or {http_form.index}

	sys.fork_call(". /etc/init.d/offline_download;stop_monitor")

	if not is_usb_config_exist("download_item") then
		sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
		return false, ERR_DEL_CFG
	end

    for i, v in ipairs(gids) do
		local item = item_tmpconf_find("download_item", "item", {gid=v,type=types[i]}, {"gid","type"})
		local ret = false
			
		if item then
			item_new[i]={
				completed       = item.completed,
				file            = item.file,
				size            = item.size,
				gid             = item.gid,
				status          = item.status,
				type 			= item.type,
				timestamp		= item.timestamp
			}

			if item.status == ITEM_PAUSED or item.status == ITEM_ERROR then
				--item_new[i].status = ITEM_ACTIVE
				item_new[i].status = ITEM_WAITING

				if item.status == ITEM_ERROR and item.type ~= "amule" then
					item_new[i].needAdded = DEL_AND_ADD
				elseif item.status == ITEM_PAUSED then
					item_new[i].needAdded = ADD_AGAIN
				end

				--ret = item_tmpconf_update("download_item", "item", item, item_new[i], {"gid","type","timestamp","status"})
				ret = item_tmpconf_update_spec("download_item", "item", item[".name"], item_new[i])
				changed_flag = true
				if not ret then
					item_new[i].status = item.status
				end
			end

			item_new[i].downloadSpeed = 0
			item_new[i].uploadSpeed   = 0
			item_new[i].connections	  = 0
			item_new[i].numSeeders	  = 0
			item_new[i].success 	  = true
			item_new[i].key     	  = keys[i]
			item_new[i].index   	  = indexes[i]
		end
	end
	
	if changed_flag == true then
		item_tmpconf_commit("download_item", true)
	end
		
	sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
	
	return item_new
end
------------------------item for dispatch------------------------

------------------------advanced set for dispatch-------------------------
--- Convert a calendar json string received
--- from http form to a ranges string.
-- @param calendar	The calendar json string.
-- @return			The ranges string if success, or false.
function http_form_to_ranges(schedule)
	return tsched.convert_calendar(schedule)
end

--- Add an entry to offline_download module
-- @param entry_arg	Entry argument, non-empty string.
-- @param ranges	Time ranges where to be active, non-empty string.
-- @return			Boolean
function schedule_add(calendar)
	local tsched_r = tsched.TschedConf("offline_download")
	tsched_r:add_entry("offline_download_schedule", calendar)
	return tsched_r:update()
end

--- Delete all entries from offline_download module.
-- @return			Boolean
function schedule_del_all()
	local tsched_r = tsched.TschedConf("offline_download")
	tsched_r:del_all()
	return tsched_r:update()
end

--- Update offline_download module, reload its configs and refresh it.
-- @return			Boolean
function schedule_update()
	local tsched_r = tsched.TschedConf("offline_download")
	return tsched_r:update()
end

-- check speed limitation
-- @param max_upload, max_download
-- return speed_up: upload speed set, speed_down: download speed set
function advanced_check_speed(max_upload, max_download)
	local max_up_limit = uci_r:get_profile("offline_download", "max_up_limit")
	local max_down_limit = uci_r:get_profile("offline_download", "max_down_limit")

	local speed_up   = (tonumber(max_upload) < max_up_limit and tonumber(max_upload) >= 0) and max_upload or max_up_limit
	local speed_down = (tonumber(max_download) < max_down_limit and tonumber(max_download) >= 0) and max_download or max_down_limit
	return speed_up, speed_down
end

-- read the config para set
-- @param N/A
-- @return config para table
function advanced_set_read()
	local advanced = {}

	advanced["schedule_enable"] = uci_r:get("offline_download", "advanced", "schedule_enable")
	advanced["schedule"] 		= uci_r:get("offline_download", "advanced", "schedule")
	advanced["seed_enable"]     = uci_r:get("offline_download", "advanced", "seed_enable")
	advanced["max_active_num"] = uci_r:get("offline_download", "advanced", "max_active_num")
	
	advanced["max_download"]    = uci_r:get("offline_download", "advanced", "max_download")
	advanced["max_upload"]      = uci_r:get("offline_download", "advanced", "max_upload")

	advanced["bt_max_peers"]         = uci_r:get("offline_download", "aria2", "bt_max_peers")
	advanced["bt_max_open_files"]    = uci_r:get("offline_download", "aria2", "bt_max_open_files")
	advanced["enable_dht"]           = uci_r:get("offline_download", "aria2", "enable_dht")
	advanced["bt_force_encryption"]  = uci_r:get("offline_download", "aria2", "bt_force_encryption")
	advanced["enable_peer_exchange"] = uci_r:get("offline_download", "aria2", "enable_peer_exchange")

	advanced["amule_server"]  	= uci_r:get("offline_download", "amule", "serverip")
	advanced["amule_port"]		= uci_r:get("offline_download", "amule", "serverport")

	return advanced
end

-- set the config para set
-- @param http_form : config paras
-- @return config para table
function advanced_set_write(http_form)
	--general setting
    local schedule_enable = http_form["schedule_enable"] == "on" and "on" or "off"
    local schedule = http_form["schedule"]
    local seed_enable = http_form["seed_enable"]     == "on" and "on" or "off"
    local max_active_num = http_form["max_active_num"]

	local max_download = http_form["max_download"]
	local max_upload = http_form["max_upload"]
    --BT settins
	local bt_max_peers = http_form["bt_max_peers"]
	local bt_max_open_files = http_form["bt_max_open_files"]
	local enable_dht = http_form["enable_dht"]
	local bt_force_encryption = http_form["bt_force_encryption"]
	local enable_peer_exchange = http_form["enable_peer_exchange"]
	--aMule settings
	local amule_server = http_form["amule_server"]
	local amule_port = http_form["amule_port"]

	local speed_up, speed_down, calendar
	local amuleupdate = false
	local aria2update = false
	local changed = false
	local advanced = {}
	local message = {}

	local max_active_num_limit = uci_r:get_profile("offline_download", "max_active_num_limit") or 10
	if max_active_num and tonumber(max_active_num) > tonumber(max_active_num_limit) or tonumber(max_active_num) <= 0 then
		return false, "Invalid active items number."
	end

	advanced = advanced_set_read()
	calendar = http_form_to_ranges(schedule)
	
	if advanced.schedule_enable ~= schedule_enable then
		changed = true
		advanced.schedule_enable = schedule_enable
		uci_r:set("offline_download", "advanced", "schedule_enable", schedule_enable)
		if schedule_enable == "on" then
			schedule_add(calendar)
		else
			schedule_del_all()
		end
	end
	
	if advanced.schedule ~= schedule then
		changed = true
		advanced.schedule = schedule
		uci_r:set("offline_download", "advanced", "schedule", schedule)
		schedule_del_all()
		schedule_add(calendar)
	end

	if advanced.seed_enable ~= seed_enable then
		advanced.seed_enable = seed_enable
		uci_r:set("offline_download", "advanced", "seed_enable", seed_enable)
		if seed_enable == "on" then
			uci_r:set("offline_download", "aria2", "seed_time", "1440")
		else
			uci_r:set("offline_download", "aria2", "seed_time", "0")
		end
		aria2update = true
		changed = true
	end

	if advanced.max_active_num ~= max_active_num then
		advanced.max_active_num = max_active_num
		uci_r:set("offline_download", "advanced", "max_active_num", max_active_num)
		changed = true
	end

	speed_up, speed_down = advanced_check_speed(max_upload, max_download)

	if advanced.max_upload ~= tostring(speed_up) then
		advanced.max_upload = speed_up
		uci_r:set("offline_download", "advanced", "max_upload", speed_up)
		uci_r:set("offline_download", "aria2", "max_overall_upload_limit", speed_up..'K')
		message[#message + 1] = '"max-overall-upload-limit":"'..speed_up..'K"'
		changed = true
		amuleupdate = true
	end

	if advanced.max_download ~= tostring(speed_down) then
		advanced.max_download = speed_down
		uci_r:set("offline_download", "advanced", "max_download", speed_down)
		uci_r:set("offline_download", "aria2", "max_overall_download_limit", speed_down..'K')
		message[#message + 1] = '"max-overall-download-limit":"'..speed_down..'K"'
		changed = true
		amuleupdate = true
	end

	if advanced.bt_max_peers ~= bt_max_peers then
		advanced.bt_max_peers = bt_max_peers
		uci_r:set("offline_download", "aria2", "bt_max_peers",  bt_max_peers)
		aria2update = true
		changed = true
	end

	if advanced.bt_max_open_files ~= bt_max_open_files then
		advanced.bt_max_open_files = bt_max_open_files
		uci_r:set("offline_download", "aria2", "bt_max_open_files",  bt_max_open_files)
		message[#message + 1] = '"bt_max_open_files":"'..bt_max_open_files..'"'
		changed = true
	end

	if advanced.enable_dht ~= enable_dht then
		advanced.enable_dht = enable_dht
		uci_r:set("offline_download", "aria2", "enable_dht", enable_dht)
		aria2update = true
		changed = true
	end

	if advanced.bt_force_encryption ~= bt_force_encryption then
		advanced.bt_force_encryption = bt_force_encryption
		uci_r:set("offline_download", "aria2", "bt_force_encryption", bt_force_encryption)
		aria2update = true
		changed = true
	end

	if advanced.enable_peer_exchange ~= enable_peer_exchange then
		advanced.enable_peer_exchange = enable_peer_exchange
		uci_r:set("offline_download", "aria2", "enable_peer_exchange", enable_peer_exchange)
		aria2update = true
		changed = true
	end
	
	if advanced.amule_server ~= amule_server then
		changed = true
		advanced.amule_server = amule_server 
		uci_r:set("offline_download", "amule", "serverip", amule_server)
	end

	if advanced.amule_port ~= amule_port then
		changed = true
		advanced.amule_port = amule_port 
		uci_r:set("offline_download", "amule", "serverport", amule_port)
	end

	--aria2 send message
	if #message > 0 then
		message = table.concat(message, ",")
		message = '{'..message..'}'
		debug(message)
		aria2_change_global(message)
	end
	
	if amuleupdate then
		amule_set_speed(speed_up, speed_down)
	end

	if changed == true then
		uci_r:commit("offline_download")
	end
	
	if aria2update then
		sys.fork_exec("/etc/init.d/aria2 restart")
	end
    return advanced
end
------------------------set for dispatch-------------------------

------------------------amule for dispatch-------------------------
-- get amule server connect status
-- @param N/A
-- @return amule status
function amule_status(http_form)
	local ret, response
	local s = {}
	
	ret, response = amule_send_message("status_req", {})
	if ret ~= true then
		return false, response
	end
	
	if not response.status then
		s.status = "disconnected"
	else
		s.status = response.status
	end

	return s
end

------------------------amule for dispatch-------------------------

----------------------volumn for dispatch----------------------
-- List all volumns
-- @param N/A
-- @return volumn table
function volumn_list()
    local data = {}
    local parser = usbshare.CfgParser()
    local volumns = parser:get_allvolumns()

    for _, volumn in pairs(volumns) do
        if volumn.enable == "on" then
            table.insert(data, {
                name = volumn.path_prefix .. "(" .. volumn.label .. ")",
                value = volumn.uuid,
                id = volumn.id
            })
        end
    end
    table.sort(data, function(a, b) return a.id < b.id end)

    return data 
end
----------------------volumn for dispatch----------------------
function item_super()
	return '{"success":false, "data": ""}'
end