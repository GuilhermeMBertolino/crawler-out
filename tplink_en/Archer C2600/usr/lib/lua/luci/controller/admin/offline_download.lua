--[[
Copyright(c) 2008-2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  offline_download.lua
Details :  Web controller for offline download module.
Author  :  WANG Wenhu <wangwenhu@tp-link.net>
Version :  1.0.0
Date    :  Jan8th, 2015
]]--

module("luci.controller.admin.offline_download", package.seeall)

local ctl              = require "luci.model.controller" 
local offline_download = require "luci.model.offline_download"
local fs       		   = require "luci.fs"

local TEMP_TORRENT_FILE   = "/tmp/bt.torrent"

local dispatch_tbl = {

	enable = {
		["read"]   = {cb = offline_download.enable_read},
		["write"]  = {cb = offline_download.enable_write}
	},

	allocation = {
		["read"]   = {cb = offline_download.allocation_read},
		["write"]  = {cb = offline_download.allocation_write}
	},

	item = {
		["load"]   = {cb = offline_download.item_load},
		["insert"] = {cb = offline_download.item_insert},
		["remove"] = {cb = offline_download.item_remove},
		["pause"]  = {cb = offline_download.item_pause},
		["resume"] = {cb = offline_download.item_resume},
		[".super"] = {cb = offline_download.item_super}
	},

	set = {
		["read"]   = {cb = offline_download.advanced_set_read},
		["write"]  = {cb = offline_download.advanced_set_write}
	},

	amule = {
		["status"] = {cb = offline_download.amule_status}
	},
	
	volumn = {
		[".super"] = {cb = offline_download.volumn_list}
	}
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
	local fp
	local exceedFlag = 0
	local uploadTorrentSize = 0
	local maximumTorrentSize = 1000000 -- 1 M
    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not fp then
                fp = io.open(TEMP_TORRENT_FILE, "w")
            end
            if chunk then
            	uploadTorrentSize = uploadTorrentSize + #chunk
            	if uploadTorrentSize <= maximumTorrentSize then
                	fp:write(chunk)
                else
                	if exceedFlag == 0 then
						fp:close()
						fs.unlink(TEMP_TORRENT_FILE)
						fp = io.open(TEMP_TORRENT_FILE, "w")
						exceedFlag = 1
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
	entry({"admin", "offline_download"}, call("_index")).leaf = true
end
