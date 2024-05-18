--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  folder_sharing.lua
Details :
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  20Jan, 2014
]]--

module("luci.controller.admin.folder_sharing", package.seeall)

local nixio    = require "nixio"
local http     = require "luci.http"
local sys      = require "luci.sys"
local json     = require "luci.json"
local nw       = require "luci.model.network"
local uci      = require "luci.model.uci"
local ctl      = require "luci.model.controller"
local usbshare = require "luci.model.usbshare"
local dbg      = require "luci.tools.debug"
local dtypes   = require "luci.tools.datatypes"
local subprocess = require "luci.model.subprocess"
local util     = require "luci.util"

local uci_r       = uci.cursor()
local cfg_changed = false
local UCICFG      = "usbshare"

-- Debug
-- @param N/A
-- @return N/A
local function debug(str)
    --dbg.print(str)
end

function account_ascii_visible(str)
    if not str or str == "" then return false end
    
    local pos = 1
    for pos = 1, #str do
        local num = string.byte(str, pos)
        if num < 33 or num > 126 then return false end
    end
    return true
end

local function account_str_valid(str)
    if str == nil then
        return false
    elseif not dtypes.rangelength(str, 1, 15) then
        return false
    elseif not str:find("^[a-zA-Z0-9_]+$") then
        return false
    end

    return true
end

-- read account
function account_read_list()
    local account = {}
    local account1 = {}
    local data = {}
    account["type"] = 0
    account["username"] = uci_r:get(UCICFG, "account", "username")
    account["password"] = uci_r:get(UCICFG, "account", "password")
    account["permission"] = "rw"
    table.insert(data, account)
    account1["type"] = 1
    account1["username"] = uci_r:get(UCICFG, "account1", "username")
    account1["password"] = uci_r:get(UCICFG, "account1", "password")
    account1["permission"] = "r"
    table.insert(data,account1)
    return data
end

-- update folders' read/write users
local function folder_update_list()
    local form = {}
    local share_folders = {}
    local parser = usbshare.CfgParser()
    local folders = parser:get_allfolders()

    for _,folder in pairs(folders) do
        --dbg("mntdir = %s,sharename = %s" % {folder.volumn.path_prefix,folder.path})
        table.insert(form, folder.volumn.path_prefix .. "/" ..  folder.path)
    end

    folder_add_list(form)
end

-- update account
function account_update(form)
    local account_old = form.old
    local account_new = form.new
    account_old = json.decode(account_old)
    account_new = json.decode(account_new)

    if account_new.username == account_old.username and 
        account_new.password == account_old.password then
        account_new["type"] = account_old["type"]
        account_new["permission"] = account_old["permission"]
        return account_new
    end

    if account_old["type"] == 0 then
        uci_r:set(UCICFG, "account", "username", account_new.username)
        uci_r:set(UCICFG, "account", "password", account_new.password)
    else
        uci_r:set(UCICFG, "account1", "username", account_new.username)
        uci_r:set(UCICFG, "account1", "password", account_new.password)
    end

    usbshare.account_update(account_new.username,account_new.password, account_old["type"])
    cfg_changed = true
    account_new["type"] = account_old["type"]
    account_new["permission"] = account_old["permission"]
    return account_new
end


-- Get the Samba URL
function samba_url_prefix()
    local user_agent = http.getenv("HTTP_USER_AGENT")
    local prefix = "\\\\"

    --[[
    User-Agent:
    Windows 3.11 => Win16,
    Windows 95 => (Windows 95)|(Win95)|(Windows_95),
    Windows 98 => (Windows 98)|(Win98),
    Windows 2000 => (Windows NT 5.0)|(Windows 2000),
    Windows XP => (Windows NT 5.1)|(Windows XP),
    Windows Server 2003 => (Windows NT 5.2),
    Windows Vista => (Windows NT 6.0),
    Windows 7 => (Windows NT 6.1),
    Windows 8 => (Windows NT 6.2),
    Windows NT 4.0 => (Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT),
    Windows ME => Windows ME,
    Open BSD => OpenBSD,
    Sun OS => SunOS,
    Linux => (Linux)|(X11),
    Mac OS => (Mac_PowerPC)|(Macintosh),
    ]]--
    if user_agent == nil or string.len(user_agent) == 0 then
    -- Default
    elseif user_agent:find("Mac_PowerPC") or user_agent:find("Macintosh") then
        prefix = "smb://"
    elseif user_agent:find("Linux") then
        prefix = "smb://"
    elseif user_agent:find("Windows") then
        prefix = "\\\\"
    else
    -- Default
    end

    return prefix
end

-- Return true if server valid
-- @param N/A
-- @return true or false
local function server_valid(server)
    if server == nil then
        return false
    elseif not dtypes.rangelength(server, 1, 15) then
        return false
    elseif not server:find("^[a-zA-Z0-9_%-]+$") then
        return false
    end

    return true
end

-- Read the server
-- @param N/A
-- @return table
function server_read()
    local data = {}

    data.server = uci_r:get(UCICFG, "global", "svrname")
    return data
end

-- Update the server
-- @param N/A
-- @return table
function server_update(form)
    local old_svrname = uci_r:get(UCICFG, "global", "svrname")
    local new_svrname = form["server"]

    if not server_valid(new_svrname) then
        return false, "invalid server name"
    end

    if new_svrname ~= old_svrname then
        uci_r:set(UCICFG, "global", "svrname", new_svrname)
        cfg_changed = true
    end

    return server_read()
end

-- Get wan's ipaddr
-- @param N/A
-- @return IPv4 address
local function get_wan_ipaddr()
    local nw = nw.init()
    local inet = nw:get_network("internet")
    local wnet = nw:get_network("wan")
    local ipaddr = "0.0.0.0"

    if inet then
        ipaddr = inet:ipaddr() or ipaddr
    elseif wnet then
        ipaddr = wnet:ipaddr() or ipaddr
    end

    return ipaddr
end

-- Get wan's ipaddr and second ipaddr
-- @param N/A
-- @return IPv4 address and second address
local function get_wan_ipaddrs()
    local nw      = nw.init()
    local ifaces  = {"internet", "wan"}
    local data    = {}
    local net     = nil
    local ipaddr  = nil

    for _, iface in ipairs(ifaces) do
        net = nw:get_network(iface)
        if net then
            ipaddr  = net:ipaddr()
            if ipaddr then
                table.insert(data, ipaddr)
            end
        end
    end

    return data
end

-- Get Ftp via Internet link
local function get_ftpex_link()
    local ipaddrs = get_wan_ipaddrs()
    local port = uci_r:get(UCICFG, "global", "ftpex_port")
    local link = ""

    for index = 1, #ipaddrs do
        if not string.match(ipaddrs[index], "^169\.254\.") then
            link = link .. "ftp://" .. ipaddrs[index] .. ":" .. port
            if index ~= #ipaddrs then
                link = link .. ","
            end
        end
    end

    if link == "" then
        link = "ftp://0.0.0.0:" .. port
    end
    return link
end

local function get_sftpex_link()
    local ipaddrs = get_wan_ipaddrs()
    local port = uci_r:get(UCICFG, "global", "sftpex_port")
    local link = ""

    for index = 1, #ipaddrs do
        if not string.match(ipaddrs[index], "^169\.254\.") then
            link = link .. "sftp://" .. ipaddrs[index] .. ":" .. port
            if index ~= #ipaddrs then
                link = link .. ","
            end
        end
    end

    if link == "" then
        link = "sftp://0.0.0.0:" .. port
    end
    return link
end

-- Read the settings
-- @param N/A
-- @return table
local function settings_read()
    local data = {}
    local server = uci_r:get(UCICFG, "global", "svrname")

    local nw = nw.init()
    local lnet = nw:get_network("lan")
    
    local protos
    local mode = uci_r:get("sysmode", "sysmode", "mode")
    if mode == "ap" then
--	protos = { "samba", "ftp", "sftp" }
	protos = { "samba", "ftp"}
    else
--	protos = { "samba", "ftp", "ftpex", "sftp" }
	protos = { "samba", "ftp", "ftpex"}
    end
	
--    local port = {"---", 21, uci_r:get(UCICFG, "global", "ftpex_port"), 622}
--    local edit = {false, false, true, false}
    local port = {"---", 21, uci_r:get(UCICFG, "global", "ftpex_port")}
    local edit = {false, false, true}
    local enable = {
        uci_r:get(UCICFG, "global", "samba"),
        uci_r:get(UCICFG, "global", "ftp"),
        uci_r:get(UCICFG, "global", "ftpex"),
--        uci_r:get(UCICFG, "global", "sftp"),
    }
    local link = {
        samba_url_prefix() .. server,
        "ftp://" .. lnet:ipaddr() .. ":" .. port[2],
        get_ftpex_link()
--        "sftp://" .. lnet:ipaddr() .. ":" .. port[4]
    }

    if uci_r:get_profile("sftp", "sftp_support") == "yes" then 
--      insert protos        
        if mode == "ap" then
            table.insert(protos,"sftp")
        else
            table.insert(protos,"sftp")
            table.insert(protos,"sftpex")
        end
--      insert port  
        table.insert(port,2222)
        table.insert(port,uci_r:get(UCICFG, "global", "sftpex_port"))
--      insert edit
        table.insert(edit,false)
        table.insert(edit,true)
--      insert enable
        table.insert(enable,uci_r:get(UCICFG, "global", "sftp"))
        table.insert(enable,uci_r:get(UCICFG, "global", "sftpex"))
--      insert link
        table.insert(link,"sftp://" .. lnet:ipaddr() .. ":" .. port[4])
        table.insert(link,get_sftpex_link())
    end

    if mode == "ap" and uci_r:get_profile("sftp", "sftp_support") == "yes" then     
        for index = 1, 2 do
            local child = {
                edit     = edit[index],
                key      = index,
                link     = link[index],
                protocol = protos[index],
                enable   = enable[index],
                port     = port[index]
            }
            table.insert(data, child)
        end
        local child = {
            edit     = edit[4],
            key      = 3,
            link     = link[4],
            protocol = protos[3],
            enable   = enable[4],
            port     = port[4]
        }
        table.insert(data, child)
    else
        for index = 1, #protos do
            local child = {
                edit     = edit[index],
                key      = index,
                link     = link[index],
                protocol = protos[index],
                enable   = enable[index],
                port     = port[index]
            }
            table.insert(data, child)
        end
    end
    return data
end

-- Update the settings
-- @param N/A
-- @return table
local function settings_update(form)
    local data = {}
    local ftpoldport = uci_r:get(UCICFG, "global", "ftpex_port")
    local sftpoldport = uci_r:get(UCICFG, "global", "sftpex_port")
    local old_svrname = uci_r:get(UCICFG, "global", "svrname")
    local new_svrname = form["server"]
    local ftpnewport = form["port"] or 0
    local sftpnewport = form["sftpport"] or 0
    local enable  = form["enable"]
    local sftpenable = form["sftpenable"]
    local sftpexenable = form["sftpexenable"]
    local ftpport    = ftpnewport and tonumber(ftpnewport) or 0
    local sftpport    = sftpnewport and tonumber(sftpnewport) or 0
    local mode = uci_r:get("sysmode", "sysmode", "mode") or "router"

--    if (port ~= 21 and port ~= 622) and (port < 1024 or port > 65535) then
	-- no ftpex under ap mode
    if mode ~= "ap" then
	if ftpport ~= 21 and (ftpport < 1024 or ftpport > 65535) then
		return false, "invalid ftpport " .. tostring(ftpnewport)
        end
        if uci_r:get_profile("sftp", "sftp_support") == "yes" then
            if sftpport < 1024 or sftpport > 65535 then
                return false, "invalid sftpport " .. tostring(sftpnewport)
            end
        end
    end

    if not server_valid(new_svrname) then
        return false, "invalid server name"
    end

    -- set server name
    if new_svrname ~= old_svrname then
        uci_r:set(UCICFG, "global", "svrname", new_svrname)
        cfg_changed = true
    end

    if enable == nil then
        cfg_changed = true
        data.server = old_svrname
        return data
    end

--    local samba_enable = enable:match("(%a+),%a+,%a+,%a+")
--    local ftp_enable = enable:match("%a+,(%a+),%a+,%a+")
--    local ftpex_enable = enable:match("%a+,%a+,(%a+),%a+")
--    local sftp_enable = enable:match("%a+,%a+,%a+,(%a+)")
    local samba_enable
    local ftp_enable
    local ftpex_enable
    local sftp_enable
    local sftpex_enable

	-- no ftpex under ap mode
    if mode ~= "ap" then
        if uci_r:get_profile("sftp", "sftp_support") == "yes" then 
            samba_enable = enable:match("(%a+),%a+,%a+")
            ftp_enable = enable:match("%a+,(%a+),%a+")
            ftpex_enable = enable:match("%a+,%a+,(%a+)")
            sftp_enable = sftpenable
            sftpex_enable = sftpexenable
        else
            samba_enable = enable:match("(%a+),%a+,%a+")
            ftp_enable = enable:match("%a+,(%a+),%a+")
            ftpex_enable = enable:match("%a+,%a+,(%a+)")
        end
    else
        if uci_r:get_profile("sftp", "sftp_support") == "yes" then 
            samba_enable = enable:match("(%a+),%a+")
            ftp_enable = enable:match("%a+,(%a+)")
            sftp_enable = sftpenable
        else
            samba_enable = enable:match("(%a+),%a+")
            ftp_enable = enable:match("%a+,(%a+)")
        end
    end

    if uci_r:get(UCICFG, "global", "samba") ~= samba_enable then
        uci_r:set(UCICFG, "global", "samba", samba_enable)
        cfg_changed = true
    end

    if uci_r:get(UCICFG, "global", "ftp") ~= ftp_enable then
        uci_r:set(UCICFG, "global", "ftp", ftp_enable)
        cfg_changed = true
    end

    if uci_r:get_profile("sftp", "sftp_support") == "yes" then
        if uci_r:get(UCICFG, "global", "sftp") ~= sftp_enable then
            uci_r:set(UCICFG, "global", "sftp", sftp_enable)
            cfg_changed = true
        end
    end
	-- no ftpex under ap mode
    if mode ~= "ap" then
	if uci_r:get(UCICFG, "global", "ftpex") ~= ftpex_enable then
		uci_r:set(UCICFG, "global", "ftpex", ftpex_enable)
		cfg_changed = true
        end
        
        if uci_r:get_profile("sftp", "sftp_support") == "yes" then
            if uci_r:get(UCICFG, "global", "sftpex") ~= sftpex_enable then
                uci_r:set(UCICFG, "global", "sftpex", sftpex_enable)
                cfg_changed = true
            end
        end
    end

    if mode ~= "ap" then
		-- delete iptables rules
	sys.fork_call("ftpex del " .. ftpoldport .. " all")

	if ftp_enable == "on" and ftpex_enable == "on" then
		sys.fork_call("ftpex add " .. ftpnewport .. " all")
	elseif ftp_enable == "on" and ftpex_enable == "off" then
		sys.fork_call("ftpex add " .. ftpnewport .. " ftp_only")
	elseif ftp_enable == "off" and ftpex_enable == "on" then
		sys.fork_call("ftpex add " .. ftpnewport .. " ftpex_only")
	end

	if ftpnewport ~= ftpoldport then
		uci_r:set(UCICFG, "global", "ftpex_port", ftpnewport)
		cfg_changed = true
        end

        if uci_r:get_profile("sftp", "sftp_support") == "yes" then
            sys.fork_call("sftpex del " .. sftpoldport .. " all")

            if sftp_enable == "on" and sftpex_enable == "on" then
                sys.fork_call("sftpex add " .. sftpnewport .. " all")
            elseif sftp_enable == "on" and sftpex_enable == "off" then
                sys.fork_call("sftpex add " .. sftpnewport .. " sftp_only")
            elseif sftp_enable == "off" and sftpex_enable == "on" then
                sys.fork_call("sftpex add " .. sftpnewport .. " sftpex_only")
            end

            if sftpnewport ~= sftpoldport then
                uci_r:set(UCICFG, "global", "sftpex_port", sftpnewport)
                cfg_changed = true
            end
        end
    else
	sys.fork_call("ftpex del " .. ftpoldport .. " all")
	-- no ftpex under ap mode, set ftp_only
	if ftp_enable == "on" then
		sys.fork_call("ftpex add " .. ftpnewport .. " ftp_only")
        end
        
        if uci_r:get_profile("sftp", "sftp_support") == "yes" then
            sys.fork_call("sftpex del " .. sftpoldport .. " all")
            -- no sftpex under ap mode, set sftp_only
            if sftp_enable == "on" then
                sys.fork_call("sftpex add " .. sftpnewport .. " sftp_only")
            end
        end
    end
    return settings_read()
end

local function folder_del_list()
    local number = 0
    local parser = usbshare.CfgParser()
    local folders = parser:get_allfolders()
    for _,folder in pairs(folders) do
        local cmd = {"usbshare", "del",
                     "-m", folder.volumn.mntdir,
                     "-n", folder.sharename}
        if subprocess.call(cmd) ~= 0 then
            debug("folder del fail")
            number = number + 1
        end
    end
    return number
end

local function make_data(folder_data)
    local data = {}
    local data1 = {}
    local parser = usbshare.CfgParser()
    local volumns = parser:get_allvolumns()
    for _, volumn in pairs(volumns) do
        table.insert(data1, {
                id = volumn.id,
                uuid = volumn.uuid,
        })
    end
    table.sort(data1, function(a, b) return a.id < b.id end)

    for _, volumn in pairs(data1) do
        local folders_by_volumn = {}
        for _, folder in pairs(folder_data) do
            if folder.uuid == volumn.uuid then
                --dbg("folder uuid: %s" % folder.uuid)
                table.insert(folders_by_volumn, folder.path)
            end
        end
        table.insert(data, folders_by_volumn)
    end
    return data
end

function folder_add_list(form)
    local data = {}
    local folders = {}
    local folder_form = {}
    local folders_form = {}
    local volumns = {}
    local parser = usbshare.CfgParser()

    -- first delete all of the old sharing folders
    ret = folder_del_list()
    if ret ~= 0 then
        return false, "usbshare delete folder failed"
    end

    -- prepare for new share folders
    if form.operation ~= nil then
        folders = form.folder
        folders = json.decode(folders)
    else
        folders = form
    end
    --folders = util.split(folders, ",")
    -- folder's guest_network is always on,we use firewall to make it off 
    folder_form.guest_network = "on"
    folder_form.authentication = uci_r:get(UCICFG, "global", "auth_all")
    folder_form.writable = "on"
    folder_form.media_server = "on"
    folder_form.enable = "on"   

    -- add and update new sharing folders
    local folder_data = {}
    local volumns = parser:get_allvolumns()
    for _, folder in pairs(folders) do
        local prefix = folder:sub(1, 2)
        local path = folder
        local name
        if prefix == folder then
            name = folder:sub(1,1)
        else
        local path_part = util.split(folder:sub(4),"/")
            name = path_part[#path_part]
        end

        for _, volumn in pairs(volumns) do
            if volumn.path_prefix == prefix then
                folder_form.volumn = volumn.uuid
                folder_form.name = name
                folder_form.path = path
                folder_form.uuid = volumn.uuid
                local ret = folder_add(folder_form,parser,key)
                if type(ret) == "table" then
                    table.insert(folder_data, ret)
--                else
--                    return false,"usbshare add folder fail."
                end
            end
        end
    end

    -- return data
    data = make_data(folder_data)

    return data
end

-- Process share mode (share all / share partial)
-- @param N/A
-- @return result Table of result.
local function share_mode(form)
    local operation = form["operation"]
    local data = {}
    local share_all = uci_r:get(UCICFG, "global", "share_all")

    if operation == "read" then
        local folder_data = folder_list()
        data = make_data(folder_data)
    elseif operation == "write" then
        data["share_all"] = form["share_all"] == "true" and "on" or "off"
        uci_r:set(UCICFG, "global", "share_all", data["share_all"])
        uci_r:commit(UCICFG)
        sys.fork_call("usbshare cfg -o /etc/config/sharecfg")
        if data["share_all"] ~= share_all and share_all == "off" then
            local folder_data = folder_list()
            data = make_data(folder_data)
        else
            data = folder_add_list(form)
        end
        cfg_changed = true
    end

    return data
end

-- Process share authentication (share all)
-- @param N/A
-- @return table
local function share_auth(form)
    local operation = form["operation"]
    local data = {}

    debug("share_auth start")
    if operation == "read" then
        data["authentication"] = uci_r:get(UCICFG, "global", "auth_all")
    elseif operation == "write" then
        data["authentication"] = form["authentication"]
        if data["authentication"] ~= "on" and data["authentication"] ~= "off" then
            return false, "invalid arguments"
        end
        local username = uci_r:get(UCICFG, "account1", "username")
        local password = uci_r:get(UCICFG, "account1", "password")
        uci_r:set(UCICFG, "global", "auth_all", data["authentication"])
        local cmd = {"/sbin/change_smb_conf", data["authentication"], username, password}
        subprocess.call(cmd)
        cfg_changed = true
    else
        return false, "Invalid operation " .. operation
    end

    return data
end

-- Process share all request
-- @param N/A
-- @return table
local function share_all(form)
    local data = {}
    local parser = usbshare.CfgParser()
    local folders = parser:get_allfolders()

    for _, folder in pairs(folders) do
        local volumn = folder.volumn

        if volumn.enable == "on" then
            -- debug(volumn.label .. " " .. folder.path .. " " .. folder.sharename)
            table.insert(data, {
                name = folder.sharename,
                volumn = volumn.label,
                path = folder.path == "." and volumn.path_prefix or volumn.path_prefix .. "/" .. folder.path,
                id = volumn.id
            })
        end
    end
    
    table.sort(data, function(a, b) return a.id < b.id end)

    return data
end

-- Get the share account name
-- @param N/A
-- @return name
function admin_username()
    return "admin"
end

-- Get the share account name
-- @param N/A
-- @return name
function guest_username()
    return "guest"
end

-- Read all the sharing folders
-- @param N/A
-- @return table
function folder_list()
    local data = {}
    local admin = admin_username()
    local parser = usbshare.CfgParser()
    local folders = parser:get_allfolders()

    for _, folder in pairs(folders) do
        local volumn = folder.volumn

        --debug("folder.write_users " .. folder.write_users)

        if volumn.enable == "on" then
            table.insert(data, {
                name = folder.sharename,
                path = folder.path == "." and volumn.path_prefix or volumn.path_prefix .. "/" .. folder.path,
                uuid = volumn.uuid,
                volumn = volumn.label,
                enable = folder.enable == "on" and "on" or "off",
                authentication = (folder.read_users and folder.read_users:find("guest")) and "off" or "on",
                guest_network = folder.gnetwork == "on" and "on" or "off",
                writable = (folder.write_users and folder.write_users:find(admin)) and "on" or "off",
                media_server = folder.sharetype:find("dlna") and "on" or "off",
                key = folder.index,
                id = folder.id
            })
        end
    end
    table.sort(data, function(a, b) return a.id < b.id end)
    return data
end

-- Add a sharing folder
-- @param N/A
-- @return table
function folder_add(form, cfg, key)
    local new_data = form
    local data = {}
    local parser = cfg or usbshare.CfgParser()
    local uuid = new_data.volumn

    if uuid == nil or string.len(uuid) == 0 then
        debug("Invalid uuid")
        return false, "Invalid uuid"
    end

    local volumn = parser:get_volumn(uuid)
    local admin = admin_username()
    local guest = guest_username()
    local read_users = admin
    local write_users = nil
    local share_type = ( uci_r:get_profile("sftp", "sftp_support") == "yes" and "samba,ftp,sftp" ) or "samba,ftp"   -- samba and ftp always exist in the file
    local prefix = new_data.path:sub(1, 2)
    local path = new_data.path:sub(4)
    local sharename = volumn.mntdir .. "/" .. path

    if volumn.path_prefix ~= prefix then
        debug("Invalid path " .. new_data.path)
        return false, "Invalid path " .. new_data.path
    end

    if #path == 0 then
        path = "."
    end

    debug("folder_add: " .. volumn.devname .. " " .. uuid)

    if new_data.authentication ~= "on" and new_data.writable == "on" then
        read_users = read_users .. "," .. guest
        write_users = admin .. "," .. guest
    elseif new_data.authentication ~= "on" then
        read_users = read_users .. "," .. guest
    elseif new_data.writable == "on" then
        read_users = read_users .. "," .. guest
        write_users = admin
    end

    if new_data.media_server == "on" then
        share_type = share_type .. ",dlna"
    end

    local cmd = {"usbshare", "add",
                 "-m", volumn.mntdir,
                 "-d", path,
                 "-n", sharename,
                 "-r", read_users}
    if write_users then
        cmd[#cmd+1] = "-w"
        cmd[#cmd+1] = write_users
    end
    if key then
        cmd[#cmd+1] = "-i"
        cmd[#cmd+1] = key
    end
    cmd[#cmd+1] = "-t"
    cmd[#cmd+1] = share_type
    if new_data.guest_network == "on" then
        cmd[#cmd+1] = "-g"
    end
    if new_data.enable == "on" then
        cmd[#cmd+1] = "-N"
    end
    debug("folder_add: " .. table.concat(cmd, " "))
    local ret = subprocess.call(cmd)

    if ret == 0 then
        local parser = usbshare.CfgParser()
        local folder = parser:get_folder({sharename = sharename})

        debug("folder_add: " .. folder.index)

        volumn = folder.volumn
        data = {
            name = folder.sharename,
            path = folder.path == "." and volumn.path_prefix or volumn.path_prefix .. "/" .. folder.path,
            uuid = volumn.uuid,
            volumn = volumn.label,
            enable = folder.enable == "on" and "on" or "off",
            authentication = (folder.read_users and folder.read_users:find("guest")) and "off" or "on",
            guest_network = folder.gnetwork == "on" and "on" or "off",
            writable = (folder.write_users and folder.write_users:find(admin)) and "on" or "off",
            media_server = folder.sharetype:find("dlna") and "on" or "off",
            key = folder.index
        }
        cfg_changed = true
        return data
    else
        return false
    end
end

-- Remove a sharing folder
-- @param N/A
-- @return table
function folder_del(form)
    local str_index = form.index
    local str_key = form.key
    local parser = usbshare.CfgParser()
    local data = {}
    local tbl_index = type(str_index) == "table" and str_index or {str_index}
    local tbl_key = type(str_key) == "table" and str_key or {str_key}
    local number = 0

    -- debug("type(tbl_key) = " .. type(tbl_key))

    for pos, cur_key in pairs(tbl_key) do
        debug("folder_del " .. cur_key)
        local folder = parser:get_folder({index = cur_key})
        local cmd = {"usbshare", "del",
                     "-m", folder.volumn.mntdir,
                     "-n", folder.sharename}

        debug("folder_del: " .. table.concat(cmd, " "))
        if subprocess.call(cmd) == 0 then
            number = number + 1
            table.insert(data, {index = tbl_index[pos], key = cur_key, success = true})
        else
            table.insert(data, {index = tbl_index[pos], key = cur_key, success = false})
        end
    end

    if number > 0 then
        cfg_changed = true
    end

    return data
end

-- Update a sharing folder
-- @param N/A
-- @return table
function folder_update(form)
    local data = {}
    local str1 = form.new
    local str2 = form.old
    local new_data = json.decode(str1)
    local old_data = json.decode(str2)
    local update_more = false

    for name, val in pairs(old_data) do
        -- only update enable
        if name ~= "key" and name ~= "enable" and
            name ~= "volumn" and val ~= new_data[name] then
            update_more = true
            break
        end
    end

    if update_more == false and old_data.enable == new_data.enable then
        -- not changed
        return old_data
    end

    local parser = usbshare.CfgParser()
    local enable = new_data.enable == "on" and "enable" or "disable"
    local old_name = old_data.name
    local volumn = nil
    local cmd = nil
    local ret = 0

    if not update_more then
        volumn = parser:get_volumn(new_data.uuid)
        cmd = {"usbshare", enable,
               "-m", volumn.mntdir,
               "-n", old_name}
        debug("enable: " .. table.concat(cmd, " "))
        ret = subprocess.call(cmd)

    else
        if new_data.name ~= old_data.name then
            local folder = parser:get_folder({sharename = new_data.name})
            if folder and folder.sharename then
                return false, "duplicated sharename"
            end
        end

        volumn = parser:get_volumn(old_data.uuid)
        cmd = {"usbshare", "del",
               "-m", volumn.mntdir,
               "-n", old_name}
        debug("update: " .. table.concat(cmd))
        ret = subprocess.call(cmd)
        if ret ~= 0 then
            return false, "usbshare delete folder failed"
        end
        return folder_add(form, parser, old_data.key)
    end

    if ret == 0 then
        cfg_changed = true
        new_data.key = new_data.key or old_data.key
        data = new_data
    else
        data = old_data
    end
    return data
end

-- Process directory
-- @param N/A
-- @return table
function folder_process(volumn, path)
    local prefix = volumn.path_prefix
    local parentpath = prefix
    if path ~= nil and string.len(path) ~= 0 then
        parentpath = prefix .. "/" .. path
    end
    local result = {
--        name = (path and #path ~= 0) and nixio.fs.basename(path) or
--        (prefix .. "(" .. volumn.device.vendor .. ")"),
        name = volumn.label .. "(" .. volumn.path_prefix .. ")",
        path = parentpath,
        uuid = volumn.uuid,
        expanded = true,
    }

    local realpath = volumn.mntdir .. "/" .. path
    local iterator = nixio.fs.dir(realpath)
    local filename = iterator()

    debug("realpath = " .. realpath)

    while filename do
        -- ignore hidden file
        if filename:find("%.") ~= 1 then
            local statbuf = nixio.fs.stat(realpath .. "/" .. filename)
            local childpath = parentpath .. "/" .. filename
            local child = {
                name = filename,
                path = childpath,
            }

            if statbuf ~= nil and statbuf.type ~= nil then
                if statbuf.type == "dir" then
                    child.hasBranch = true
                    result.hasBranch = true
                    result.branches = result.branches or {}
                    table.insert(result.branches, child)
                else
                    -- get filename's suffix
                    child.character = filename:match(".+%.(.+)")
                    if result.leavesInfo == nil or string.len(result.leavesInfo) == 0 then
                        result.leavesInfo = filename
                    elseif string.len(result.leavesInfo) < 16 then
                        result.leavesInfo = result.leavesInfo .. ", " .. filename
                    end
                    result.leaves = result.leaves or {}
                    table.insert(result.leaves, child)
                end
            end
        end

        filename = iterator()
    end

    return result
end

-- Folder tree handler
-- @param N/A
-- @return table
local function folder_tree(form)
    local data = {}
    local path = form.path or "" 
    local uuid = form.uuid
    local parser = nil
    local volumn = nil

    debug("folder_tree: " .. tostring(path) .. " " .. tostring(uuid))

    if uuid == nil or string.len(uuid) == 0 then
        return false
    end

    parser = usbshare.CfgParser()
    volumn = parser:get_volumn(uuid)

    if volumn == nil or volumn.uuid == nil then
        return false, "invalid uuid"
    end

    if #path > 0 then
        path = path:sub(4)
    end

    local realpath = volumn.mntdir .. "/" .. path
    local statbuf = nixio.fs.stat(realpath)

    debug("folder_tree: realpath = " .. realpath)

    if statbuf ~= nil and statbuf.type == "dir" then
        data = folder_process(volumn, path)
    end

    return data
end

-- List all volumns
-- @param N/A
-- @return table
function volumn_list()
    local data = {}
    local index = nil
    local parser = usbshare.CfgParser()
    local volumns = parser:get_allvolumns()

    for _, volumn in pairs(volumns) do
        index = string.find(volumn.uuid, "TMP-UUID-")
        if volumn.enable == "on" and index == nil then
            table.insert(data, {
                name = volumn.label .. "(" .. volumn.path_prefix .. ")",
                value = volumn.uuid,
                id = volumn.id
            })
        end
    end
    table.sort(data, function(a, b) return a.id < b.id end)

    return data 
end

local function share_guest(form)
    local operation = form["operation"]
    local data = {}

    if operation == "read" then
        data["guest_access"] = uci_r:get(UCICFG, "global", "guest_access") or "off"
    elseif operation == "write" then
        data["guest_access"] = form["guest_access"]
        uci_r:set(UCICFG, "global", "guest_access", data["guest_access"])
        if data["guest_access"] == "off" then
            sys.fork_exec("/etc/init.d/guest_access stop")
        else 
            sys.fork_exec("/etc/init.d/guest_access start")
        end
        cfg_changed = true
    else
        return false, "Invalid operation " .. operation
    end

    return data
end

local function share_media(form)
    local operation = form["operation"]
    local data = {}

    if operation == "read" then
        data["media_sharing"] = uci_r:get(UCICFG, "global", "dlna") or "on"
    elseif operation == "write" then
        data["media_sharing"] = form["media_sharing"]
        uci_r:set(UCICFG, "global", "dlna", data["media_sharing"])
        cfg_changed = true
    else
        return false, "Invalid operation " .. operation
    end

    return data
end

local folder_tbl = {
    server = {
        [".super"] = {cb = server_read},
        ["read"]   = {cb = server_read},
        ["save"]   = {cb = server_update},
    },
    settings = {
        ["read"]   = {cb = settings_read},
        ["load"]   = {cb = settings_read},
        ["save"]   = {cb = settings_update},
        ["write"]  = {cb = settings_update},
        ["update"] = {cb = settings_update},
    },
    mode = {
        ["read"]  = {cb = share_mode},
        ["write"] = {cb = share_mode},
    },
    auth = {
        ["read"]  = {cb = share_auth},
        ["write"] = {cb = share_auth},
    },
    all = {
        ["read"] = {cb = share_all},
        ["load"] = {cb = share_all},
    },
    partial = {
        ["read"]   = {cb = folder_list},
        ["load"]   = {cb = account_read_list},
        ["insert"] = {cb = folder_add},
        ["remove"] = {cb = folder_del},
        ["update"] = {cb = account_update},
    },
    volumn = {
        [".super"] = {cb = volumn_list},
        ["read"] = {cb = volumn_list},
    },
    tree = {
        [".super"] = {cb = folder_tree},
	["read"] = {cb = folder_tree},
    },
    guest = {
        ["read"]  = {cb = share_guest},
        ["write"] = {cb = share_guest},
    },
    media = {
        ["read"]  = {cb = share_media},
        ["write"] = {cb = share_media},
    },
}

function index()
    entry({"admin", "folder_sharing"}, call("folder_index")).leaf = true
end

function folder_index()
    ctl._index(folder_dispatch)
end

function folder_dispatch(http_form)
    local function hook(success, action)
        if success and cfg_changed then
            uci_r:commit(UCICFG)
            usbshare.apply()
        end

        return true
    end

    return ctl.dispatch(folder_tbl, http_form, {post_hook = hook})
end
