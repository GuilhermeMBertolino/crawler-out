--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  vpn.lua
Details :  Controller for vpnclient webpage
Author  :  Su weilin <suweilin@tp-link.com.cn>
Version :  1.0.0
Date    :  23 Nov, 2018
]]--

module("luci.controller.admin.vpn", package.seeall)

local nixio  = require "nixio"
local ip     = require "luci.ip"
local uci    = require "luci.model.uci"
local util   = require "luci.util"
local sys    = require "luci.sys"
local dbg    = require "luci.tools.debug"
local ctypes = require "luci.model.checktypes"
local dtypes = require "luci.tools.datatypes"
local nw     = require "luci.model.nwcache"
local route  = require "luci.controller.admin.route"
local ctl    = require "luci.model.controller"
local inetm  = require "luci.model.internet"
local logm   = require "luci.model.log"
local nlog   = require "luci.model.network_log"
local protom = require "luci.model.protodata"
local clientmgmt = require "luci.model.tm_clientmgmt"
local json   = require "luci.json"
local form	 = require "luci.tools.form"

local uci_r    = uci.cursor()
local form	 = form.Form(uci_r)
local internet = inetm.Internet()
local log      = logm.Log(nlog.ID)
local fs 	   = require "luci.fs"

local upload_file_done
local maximumFileSize = 0x5000 --change from 8K to 20K
local function file_exists(path)  
	local file = io.open(path, "rb")  
	if file then 
		file:close()
	end

	return file ~= nil
end

local function TrimStr(str)
    local tmpstr = str
    tmpstr = string.gsub(tmpstr, "-", "")
    tmpstr = string.gsub(tmpstr, ":", "")
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

VPN_TBL = {
    l2tpvpn = {
        proto = "l2tpvpn",
        {key = "username"},
        {key = "password"},
        {key = "server"},
		{key = "des"},
		{key = "psk"},
    },
    pptpvpn = {
        proto = "pptpvpn",
        {key = "username"},
        {key = "password"},
        {key = "server"},
		{key = "des"},
		{key = "encryption"},
    },
	openvpn = {
		proto = "openvpn",
		{key = "username"},
        {key = "password"},
		{key = "des"},
		{key = "filename"},
	}
}

VPN_DNS_FILE="/tmp/vpnc-dns"
OVPN_PATH_PREFIX="/etc/openvpn/"
OVPN_UPLOAD_FILE="/etc/openvpn/.vpnclient.ovpn"
OVPN_CONF_FILE="/etc/openvpn/vpnclient.ovpn"
local function vpn_cfg_xxtp(proto, vpn_name)
    local xxtp_inet = {
        proto       = VPN_TBL[vpn_name].proto,
        wan_type    = vpn_name,
        username    = proto.username,
        password    = proto.password,
		des         = proto.des,
        auto        = "1",
        connectable = proto.connect,
    }
	local wan_type = uci_r:get("network", "wan", "wan_type")
    local basic_mtu

    if wan_type == "static" or wan_type == "dhcp" then
        xxtp_inet.parent = "wan"
        basic_mtu = uci_r:get("network", "wan", "mtu")
    else
        xxtp_inet.parent = "internet"
        basic_mtu = uci_r:get("network", "internet", "mru")
    end

	if vpn_name == "pptpvpn" then
		xxtp_inet.mru = tonumber(basic_mtu) - 80
		xxtp_inet.encryption = proto.encryption 
	elseif vpn_name == "l2tpvpn" then
		xxtp_inet.mru = tonumber(basic_mtu) - 40
		xxtp_inet.psk = file_exists("/usr/sbin/ipsec") and proto.psk or ""
	end
    xxtp_inet.server = proto.server or ""
	
	return { vpn = xxtp_inet}
end

local function vpn_cfg_openvpn(proto, vpn_name)
    local openvpn_inet = {
        proto       = VPN_TBL[vpn_name].proto,
        username    = proto.username,
        password    = proto.password,
		des         = proto.des or "",
		ifname      = "tun0",
		auto        = "1",
        --conn_mode   = "auto",
        connectable = proto.connect,
    }
	local wan_type = uci_r:get("network", "wan", "wan_type")
    local basic_mtu
    if wan_type == "static" or wan_type == "dhcp" then
        openvpn_inet.parent = "wan"
        basic_mtu = uci_r:get("network", "wan", "mtu")
    else
        openvpn_inet.parent = "internet"
        basic_mtu = uci_r:get("network", "internet", "mru")
    end
	
    openvpn_inet.mtu = basic_mtu
	return { vpn = openvpn_inet}
end

VPN_CFG_TBL = {
    ["pptpvpn"]        = vpn_cfg_xxtp,
    ["l2tpvpn"]        = vpn_cfg_xxtp,
	["openvpn"]        = vpn_cfg_openvpn
}

VPN_TYPE_TBL = {
	["none"]           = "0",
    ["pptpvpn"]        = "1",
    ["l2tpvpn"]        = "2",
	["openvpn"]        = "3"
}

VPN_TYPE_NAME_TBL = {
	["none"]           = "NONE",
    ["pptpvpn"]        = "PPTP",
    ["l2tpvpn"]        = file_exists("/usr/sbin/ipsec") and "L2TP/IPsec" or "L2TP" ,
	["openvpn"]        = "OpenVPN"
}

--- Load protocol configuration by proto name
-- @pram proto_name  name of protocol
-- @return table of protocol
local function load_proto(proto_name)
    return uci_r:get_all("protocol", proto_name)
end

local function uci_commit()
    local stat = uci_r:commit("protocol", "network", "vpn")
    if not stat then
        log(nlog.CONFIG_SAVE_FAIL)
    end
    return stat
end

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    log(nlog.INVALID_ARGS)
    return false, errorcode
end

local function sync_shortcut_fe(enable)
    local sfe = uci_r:get("nat", "nat_global", "boost_enable") or "off"
    if enable == true then
        sys.fork_call("[ -f '/etc/init.d/shortcut-fe' ] && /etc/init.d/shortcut-fe stop > /dev/console")
    else
        if sfe == "on" then
            sys.fork_call("[ -f '/etc/init.d/shortcut-fe' ] && /etc/init.d/shortcut-fe start > /dev/console")
        end
    end
end

local function set_vpn_cfg(vpn_name, operation)
    local cb = VPN_CFG_TBL[vpn_name]
    if not cb then
        return
    end
	
	uci_r:set("vpn", "client", "vpntype", vpn_name)
    local proto = uci_r:get_all("protocol", vpn_name)

    if operation == "disconnect" or operation == "release" then
        proto["connect"] = "0";
    else
        proto["connect"] = "1";
    end

    -- Delete old configs before updating.
	proto["macaddr"] = uci_r:get("network", "wan", "macaddr") or ""
	uci_r:delete("network", "vpn")

    -- Update new configs by proto_name.
    local data = cb(proto, vpn_name)
    for k, v in pairs(data) do
        uci_r:section("network", "interface", k, v)
    end
end

local function field_canbe_empty(proto, field, badvalue)
    return proto[field] ~= badvalue
end

local CHECK_L2TP_TBL = {
    {
        field = {"username", "password"}, canbe_empty = true,
        check = {
            ctypes.check_visible,
            {ctypes.check_rangelen, 0, 118}
        }
    },
    {
        field = "server",
        check = {
            {ctypes.check_rangelen, 1, 63},
            ctypes.check_domain,
        }
    },
    {
        field = "conn_mode",
        check = {
            {ctypes.check_in, {"auto", "demand", "manually"}}
        }
    }
}

local CHECK_PPTP_TBL = {
    {
        field = {"username", "password"}, canbe_empty = true,
        check = {
            ctypes.check_visible,
            {ctypes.check_rangelen, 0, 118}
        }
    },
    {
        field = "server",
        check = {
            {ctypes.check_rangelen, 1, 63},
            ctypes.check_domain,
        }
    },
    {
        field = "conn_mode",
        check = {
            {ctypes.check_in, {"auto", "demand", "manually"}}
        }
    }
}

local CHECK_OPENVPN_TBL = {
    {
        field = {"username", "password"}, canbe_empty = true,
        check = {
            ctypes.check_visible,
            {ctypes.check_rangelen, 0, 118}
        }
    }
}

local CHECK_VPN_TBL = {
    ["pptpvpn"]        = CHECK_PPTP_TBL,
    ["l2tpvpn"]        = CHECK_L2TP_TBL,
	["openvpn"]        = CHECK_OPENVPN_TBL,
}

local function get_vpn_proto(form, vpn_name)
    -- Get protocol static information from config file.
    local proto = vpn_name and load_proto(vpn_name)
    if not proto then
        return false, "invalid vpn_name"
    end

    -- Set protocol settings to json data for webpage
    local data = {}
    local proto_tbl = VPN_TBL[vpn_name]
    for _, v in ipairs(proto_tbl) do
        data[v.key] = proto[v.key] or ""
    end
	local vpntype = uci_r:get("network", "vpn", "proto") or "none"
	data["type"] = VPN_TYPE_TBL[vpntype]

    return data
end

-- save new openvpn certificate
local function save_openvpn_cert()
	local cry = require "luci.model.crypto"
	
	--copy in build-ovpn-crt script
	--os.execute("cp -f /tmp/etc/openvpn/* /etc/openvpn/ >/dev/null 2>&1")
	os.execute("cd /etc/openvpn/;tar -czf /tmp/openvpn-cert.tar * -X 'crt.sed' >/dev/null 2>&1")
	cry.enc_file_entry("/tmp/openvpn-cert.tar", "/tmp/openvpn-cert.cry")
	os.execute("nvrammanager -w /tmp/openvpn-cert.cry -p certificate >/dev/null 2>&1")
	os.execute("rm -f /tmp/openvpn-cert.tar /tmp/openvpn-cert.cry >/dev/null 2>&1")
end

--load openvpn certificate
local function load_openvpn_cert()	
	os.execute("nvrammanager -r /tmp/openvpn-cert.cry -p certificate >/dev/null 2>&1")
	local filesize = fs.stat("/tmp/openvpn-cert.cry").size
	if filesize == 0 then
		os.execute("rm -f /tmp/openvpn-cert.cry >/dev/null 2>&1")
		return true
	end
	
	local cry = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/openvpn-cert.cry", "/tmp/openvpn-cert.tar")
	os.execute("tar -xzf /tmp/openvpn-cert.tar -C /etc/openvpn >/dev/null 2>&1")
	os.execute("rm -f /tmp/openvpn-cert.cry  /tmp/openvpn-cert.tar >/dev/null 2>&1")
end

local function check_cfg_file_exists(file)
	local res = file_exists(file)
	if res == false then
		load_openvpn_cert()
		res = file_exists(file)
	end
	return res
end

local function set_vpn_proto(form, vpn_name)
	if not form  or not vpn_name then
		dbg.print("nil args in set_vpn_proto")
		return
	end
	dbg.dumptable(form)	
	dbg.print(vpn_name)
	--process vpn_name chaos
	if vpn_name == "l2tp" then
		vpn_name = "l2tpvpn"
	elseif vpn_name == "pptp" then
		vpn_name = "pptpvpn"
	elseif vpn_name == "open" then
		vpn_name = "openvpn"
	end

	--close current vpn connection
	if vpn_name == "none" then
    	uci_r:set("vpn", "client", "vpntype", "none")
		uci_r:commit("vpn")
		uci_r:delete("network", "vpn")
		uci_r:commit("network")
		--now we are sure user disable all the vpn server connection, so stop vpnc
		sys.fork_call("/etc/init.d/vpnc stop")
		return
	end	

    local proto = {connectable = "1"}
	local fileexists = false

    -- Check data validation
    if not ctl.check(form, CHECK_VPN_TBL[vpn_name]) then
        return invalid_args()
    end

	if vpn_name == "openvpn" then
		local name = OVPN_PATH_PREFIX .. form.des .. ".ovpn"
		fileexists = check_cfg_file_exists(name)
		if fileexists ~= true then
			return invalid_args("ovpn file doesn't exist")
		end
		--save_openvpn_cert()
		--os.rename(OVPN_PATH_PREFIX .. form.des .. ".ovpn", OVPN_CONF_FILE);
		--os.execute("cp -fpr " .. name .. " " .. OVPN_CONF_FILE)
	end
	
    -- Get protocol config
    local vpn_tbl = VPN_TBL[vpn_name]
    for _, v in ipairs(vpn_tbl) do
        if not v.readonly then
            proto[v.key] = form[v.key]
        end
    end

    if form.operation == "disconnect" or form.operation == "release" then
        proto.connectable = "0"
    end
	
    -- Save protocol config
    uci_r:section("protocol", "vpn", vpn_name, proto)

    -- Update protocol and network config
    set_vpn_cfg(vpn_name, form.operation)
    -- make sure wan's ifname keepup always
    uci_r:set("network", "wan", "keepup", "1")

	if not uci_commit() then
        return false, "set inet commit config failed"
	end

    -- 3. connect; or confirm disconnect
    --if form.operation == "write" then
	sys.fork_call("/etc/init.d/vpnc restart")
    --else
        --return invalid_args()
    --end

    --return get_vpn_proto({}, vpn_name)
end

local function get_vpn_status(form)
	local data = {}
	local vpntype = uci_r:get("network", "vpn", "proto") or "none"
	if vpntype ~= "none" then
		data["des"] = uci_r:get("network", "vpn", "des") or ""
	end    
    data["status"] = internet:conn_state("vpn")
	data["type"] = VPN_TYPE_NAME_TBL[vpntype]
	local file = io.open(VPN_DNS_FILE, "r")
	if file then
		data["dns"] = file:read()
		file:close()
	end	

	return data
end

local function get_vpn_enable(form)
	local enabled = uci_r:get("vpn", "client", "enabled") or "0"
	local vpntype = uci_r:get("vpn", "client", "vpntype") or "none"
	--local maxserver = uci_r:get("vpn", "client", "maxserver") or "6"
	local hasIPsec = file_exists("/usr/sbin/ipsec") and "1" or "0"		
	local ipsec = uci_r:get("vpn", "client", "ipsec")
	if hasIPsec ~= ipsec then
		if hasIPsec == "1" then
			uci_r:set("vpn", "client", "ipsec", "1")
		else
			uci_r:set("vpn", "client", "ipsec", "0")
		end
		if not uci_r:commit("vpn") then
			return false, "set_vpn_enable commit config failed"
		end
	end
	local data = {}
	data["enable"] = enabled
	data["type"] = VPN_TYPE_TBL[vpntype]
	data["ipsec"] = hasIPsec
	--data["maxserver"] = maxserver

	return data
end

local function set_vpn_enable(form)
	if form.enable == "on" then
		uci_r:set("vpn", "client", "enabled", "on")
        sync_shortcut_fe(true)
		--should we check any server in list is enabled and start connecting?
		local server,server_on
		uci_r:foreach("vpn", "server",
			function(section)
				server = uci_r:get_all("vpn", section[".name"])
				--get connect status
				if server.enable == "on" then
					--do not do it here
					--set_vpn_proto(server, server.type)
					server_on = server
				end
			end
		)
		if server_on then
			set_vpn_proto(server_on, server_on.type)
		end
	else
		internet:disconnect("vpn")
		uci_r:set("vpn", "client", "enabled", "off")
		uci_r:set("vpn", "client", "vpntype", "none")
		uci_r:delete("network", "vpn")
		if not uci_r:commit("network") then
			return false, "set_vpn_enable commit config failed"
		end
        sys.fork_call("/etc/init.d/vpnc stop")
        sync_shortcut_fe(false)
	end
	if not uci_r:commit("vpn") then
        return false, "set_vpn_enable commit config failed"
    end

	return get_vpn_enable({})
end

local function upload_cfg_file(form)
	return true
end

local function vpn_user_list_get()
    local user_list = {}

    uci_r:foreach("vpn", "user",
        function(section)
            local user = {}
            user.access = section.access
            user.mac = section.mac
            user.name = section.name
			user.client_type = section.client_type
            
            user_list[#user_list + 1] = user
        end
    )

	dbg.print("-----------client list as below-------------")
	dbg.dumptable(user_list)
    return user_list
end

local function vpn_user_insert(http_form)
	dbg.dumptable(http_form)
    local res = false
    local list = luci.json.decode(http_form.list)

    if not list and type(list) ~= "table" then
        return res, "invalid new params"
    end

    for i, v in ipairs(list) do
        local client = {}
        local mac = v.mac or v

        if not ctypes.check_mac(mac) then
            return res, "invalid new params"
        end

        client.mac = (mac):gsub("-", ":"):upper()
        client.access = v.access or "on"
        client.name = v.name
		client.client_type = v.client_type
        -- save in config
        local res = uci_r:section("vpn", "user", TrimStr(client.mac), client)
        if not res then
            return res, "uci section failed"
        end
		if client.access == "on" then
			sys.fork_call("vpn_mgmt client add "..client.mac)
		end
    end

    uci_r:commit("vpn")
    return vpn_user_list_get()
end

local function vpn_user_update(http_form)
    local mac = http_form.key
    local new = luci.json.decode(http_form.new)
    local old = luci.json.decode(http_form.old)
    local client = {}
    local res = false
    local list = {}

    if not ctypes.check_mac(mac) then
        return res, "invalid new params"
    end
    client.mac = (mac):gsub("-", ":"):upper()
    client.access = new.access
    client.name = new.name
	client.client_type = new.client_type
    local res = uci_r:section("vpn", "user", TrimStr(client.mac), client)
    if not res then
        return res, "uci section failed"
    end

    if client.access == "on" then
        sys.fork_call("vpn_mgmt client add "..client.mac)
    elseif client.access == "off" then
        sys.fork_call("vpn_mgmt client del "..client.mac)
    else
        return false, "invalid new params"
    end

    uci_r:commit("vpn")

    list[#list + 1] = client
    return list
end

local function vpn_user_remove(http_form)
	dbg.dumptable(http_form)
    local mac = http_form.key
    local res = {}
    local list = {}

    if not ctypes.check_mac(mac) then
        return false, "invalid new params"
    end

    uci_r:delete("vpn", TrimStr(mac))

    os.execute("vpn_mgmt client del "..mac)
    uci_r:commit("vpn")
    res.success = true
    res.mac = http_form.key
    list[#list + 1] = res
    return list
end

local function vpn_client_list_get()
    return clientmgmt.get_access_client_list()
end

local function vpn_server_list_get(http_form)
	--dbg.dumptable(http_form)
	local servers = {}

	status = get_vpn_status()
	local list = {}
	uci_r:foreach("vpn", "server",
		function(section)
			list[#list + 1] = uci_r:get_all("vpn", section[".name"])
			--get connect status
			if list[#list].enable == "on" then
				list[#list].status = status.status
				list[#list].dns = status.dns
			else
				list[#list].status = "disconnected"
			end
			-- set file nil to avoid update ovpn without uploading config file
			if list[#list].file ~= nil then
				list[#list].file = ""
			end
		end
	)
	--dbg.print("-----------server list as below-------------")
	--dbg.dumptable(list)
	return list
end
local function get_max_server()
	local others = {}
	others.max_rules = uci_r:get_profile("vpn_client", "max_server")
	return others
end
local function server_list_max_check()
	local max =  uci_r:get_profile("vpn_client", "max_server")
	local number = form:count("vpn", "server")

	if tonumber(number) >= tonumber(max) then
		return false
	end

	return true
end

local function server_valid(server, which) 
	--TODO
	if server.type == "openvpn" then
		local name 
		if which == "new" then
			name = OVPN_UPLOAD_FILE
			if not file_exists(name) then
				dbg.print("no ovpn file uploaded")
				return false		
			end
		elseif which == "old" then
			name = OVPN_PATH_PREFIX .. server.des .. ".ovpn"
			if not file_exists(name) then
				dbg.print("no ovpn file uploaded")
				return false		
			end
		elseif which == "vague" then
			name = OVPN_PATH_PREFIX .. server.des .. ".ovpn"
			if not file_exists(name) then
				name = OVPN_UPLOAD_FILE
				if not file_exists(name) then
					dbg.print("no ovpn file uploaded")
					return false		
				end
			end
		end
	end
	return true
end

local function server_character_valid(server)
	local DESCRIPRION_VALID = {"`", "-", "~", "!", "#", "$", "%", "^", "(", ")", "_", "'", "{", "}" ," ", "@", "&"}
	local VPNCLIENT_USERNAME_PSW_VALID = {"`", "-", "~", "!", "#", "$", "%", "^", "(", ")", "_", "'", "{", "}", "=", "*", "+", "[", "]", "\\", ";", ",", ".", "/", "|", ":", "\"", "?", " ", "@", "&"}
	local PSK_VALID = {"`", "-", "~", "!", "#", "$", "%", "^", "(", ")", "_", "'", "{", "}", "=", "*", "+", "[", "]", "\\", ";", ",", ".", "/", "|", ":", "?", " ", "@"}
	local DESCRIPRION_LENGTH = 64
	local VPNCLIENT_USERNAME_PSW_LENGTH = 64
	local PSK_LENGTH = 32

	if server.des ~= nil and server.des ~= "" then 
		if not dtypes.rangelength(server.des, 1, DESCRIPRION_LENGTH) then
			return false
		end
		if not server.des:find("^[a-zA-Z0-9`%-~!#$%%^()_'{} @&]+$") then
			return false
		end
	end

	if server.username ~= nil and server.username ~= "" then 
		if not dtypes.rangelength(server.username, 1, VPNCLIENT_USERNAME_PSW_LENGTH) then
			return false
		end
		if not server.username:find("^[a-zA-Z0-9`%-~!#$%%^()_'{}=*+[%]%\\;,./|:? @&\"]+$") then
			return false
		end
	end

	if server.password ~= nil and server.password ~= "" then 
		if not dtypes.rangelength(server.password, 1, VPNCLIENT_USERNAME_PSW_LENGTH) then
			return false
		end
		if not server.password:find("^[a-zA-Z0-9`%-~!#$%%^()_'{}=*+[%]%\\;,./|:? @&\"]+$") then
			return false
		end
	end
	
	if server.psk ~= nil and server.psk ~= "" then 
		if not dtypes.rangelength(server.psk, 1, PSK_LENGTH) then
			return false
		end
		if not server.psk:find("^[a-zA-Z0-9`%-~!#$%%^()_'{}=*+[%]\\;,./|:? @]+$") then
			return false
		end
	end

	return true
end

local function openvpn_get_serverip_by_cfg(cfg)
		local ip=nil
		local file = io.open(cfg, "r")
		if file then
			for line in file:lines() do
				ip,port=string.match(line, "remote (%S+) (%d+)")
				if ip and port then
					dbg.print("openvpn server is " .. ip)
					break
				end
			end	
			file:close()
			return ip
		else
			dbg.print("can't open ovpn cfg to get serverip")
			return nil
		end
end

--only check description field, for openvpn consideration
local function openvpn_server_dup_check(new)
	if new.type ~= "openvpn" then
		return false
	end

	local section=form:_find_item("vpn", "server", new, {"des", "type"})
	if section then
		return true
	end

	return false
end

local function vpn_server_insert(http_form)
	dbg.dumptable(http_form)
	local new_server = http_form["new"];
	local new = luci.json.decode(new_server)

    if not new and type(new) ~= "table" then
        return {errorcode="invalid new params"}
    end

    if not server_list_max_check() then
        return {errorcode="reach max items"}
    end

	if form:_find_item("vpn", "server", new, {"key"}) then
		return false, "server key duplicate"
	end

	if not server_valid(new, "new") then
		return false, "invalid server"
	end

	if not server_character_valid(new) then
        return false, "invalid server character"
    end

	--we could only get openvpn server ip from ovpn cfg					
	if new.type == "openvpn" then
		if openvpn_server_dup_check(new) then
			return false, "openvpn server named " .. new.des .. " already exists"
		end
		--fill openvpn server ip
		new.server=openvpn_get_serverip_by_cfg(OVPN_UPLOAD_FILE)
	end

	local ret = form:insert("vpn", "server", new, {"des", "type", "server","username", "password", "psk", "encryption"}) 

	if ret then
		uci_r:commit("vpn")
		if new.type == "openvpn" then
			--insert a new openvpn item, save new ovpn
			local name = OVPN_PATH_PREFIX .. new.des .. ".ovpn"
			os.rename(OVPN_UPLOAD_FILE, name)
			save_openvpn_cert()
		end
		return ret
	else
		return false, "insert new vpn server item failed"
	end
end

local function vpn_server_update(http_form)
	dbg.dumptable(http_form)
	local old = luci.json.decode(http_form["old"])
	local new = luci.json.decode(http_form["new"])

    if not new and type(new) ~= "table" or
        not old and type(old) ~= "table" then
        return {errorcode="invalid new params"}
    end

    if not server_valid(new, "vague") then
        return false, "invalid new server"
    elseif not server_valid(old, "old") then
        return false, "invalid old server"
	end
	
	if not server_character_valid(new) then
        return false, "invalid server character"
    end

	--close other server, if any
	if new.enable == "on" then
		uci_r:foreach("vpn", "server",
			function(section)
				uci_r:set("vpn", section[".name"], "enable", "off")
			end
		)
	end

	--if openvpn item, process misc about ovpn cfg
	if new.type == "openvpn" then
		if old.type == "openvpn" then
			if old.des ~= new.des or old.username ~= new.username or old.password ~= new.password then
				--check if duplicate des openvpn
				if old.des ~= new.des then
					if openvpn_server_dup_check(new) then
						return false, "openvpn server named " .. new.des .. " already exists"
					end
				end
				--this is pure update operation, rm old ovpn, save new ovpn
				local name = OVPN_PATH_PREFIX .. old.des .. ".ovpn"
				os.remove(name)
				if file_exists(OVPN_UPLOAD_FILE) then
					name = OVPN_PATH_PREFIX .. new.des .. ".ovpn"
					os.rename(OVPN_UPLOAD_FILE, name)
					save_openvpn_cert()
					new.server=openvpn_get_serverip_by_cfg(name)
				else
					dbg.print("no ovpn file uploaded, update item fail")
					return invalid_args("no ovpn file uploaded")
				end
			else
				--this is enable/disable operation,or update ovpn cfg
				if new.enable == old.enable then
					local name = OVPN_PATH_PREFIX .. new.des .. ".ovpn"
					os.rename(OVPN_UPLOAD_FILE, name)
					save_openvpn_cert()
					new.server=openvpn_get_serverip_by_cfg(name)
				end
			end
		else
			--change a none-openvpn item to openvpn,save new ovpn
			if openvpn_server_dup_check(new) then
				return false, "openvpn server named " .. new.des .. " already exists"
			end
			if file_exists(OVPN_UPLOAD_FILE) then
				name = OVPN_PATH_PREFIX .. new.des .. ".ovpn"
				os.rename(OVPN_UPLOAD_FILE, name)
				save_openvpn_cert()
				new.server=openvpn_get_serverip_by_cfg(name)
			else
				dbg.print("no ovpn file uploaded, update item fail")
				return invalid_args("no ovpn file uploaded")
			end
		end
	elseif old.type == "openvpn"  then
		--change a openvpn item to none-openvpn, del old ovpn
		local name = OVPN_PATH_PREFIX .. old.des .. ".ovpn"
		os.remove(name)
		save_openvpn_cert()
	end

    local ret = form:update("vpn", "server", old, new, {"des", "type", "server","username", "password", "psk", "encryption"})
    if ret then
        uci_r:commit("vpn")
		if new.enable == "on" then
			--bring it up
			dbg.print("enable server connection")
			set_vpn_proto(new, new.type)
		elseif old.enable == "on" then
			--close current server connection
			dbg.print("close current server connection")
			set_vpn_proto(old, "none")
		end
        return ret
    else
        return false, "modify vpn server item failed"
    end
end

local function vpn_server_remove(http_form)
	local key = http_form["key"]
	local index = http_form["index"]

	local ret = form:get("vpn", "server", key, index)
	if ret then
		dbg.dumptable(ret)
		if ret[1].enable == "on" then
			--close current server connection
			dbg.print("close current server connection")
			set_vpn_proto(ret[1], "none")
			sys.fork_call("/etc/init.d/vpnc stop")
		end		

		--del openvpn item, del old ovpn
		if ret[1].type == "openvpn" then
			local name = OVPN_PATH_PREFIX .. ret[1].des .. ".ovpn"
			os.remove(name)
			save_openvpn_cert()
		end
    else
        return false, "stop vpn server item failed"
    end

	ret = form:delete("vpn", "server", key, index)

    if ret then
        uci_r:commit("vpn")
        return ret
    else
        return false, "remove vpn server item failed"
    end

end
-- General controller routines
local function check_upload_ovpn()
	local wait = 1;
	while upload_file_done == 0 and wait < 5 do
		os.execute("sleep 1")
		wait=wait+1
	end
	dbg.print("------wait " .. wait .. " upload_file_done " .. upload_file_done)
	if upload_file_done == 0  then
		dbg.print("---------no ovpn file uploaded")
		return false
	end

	file = io.open(OVPN_UPLOAD_FILE)
	if not file then
		dbg.print("---------ovpn file gone")
		return false
	end
	size=file:seek("end")
	dbg.print("---------ovpn file size " .. size)
	if size == 0 or size >= maximumFileSize then
		dbg.print("---------ovpn file size wrong")
		return false
	end

	return true
end

local dispatch_tbl = {
	enable = {
		["write"] = {cb = set_vpn_enable},
		["read"] = {cb = get_vpn_enable},
	},
	status = {
		["read"] = {cb = get_vpn_status},
	},
	pptp = {
		[".args"] = "pptpvpn",
		["write"] = {cb = set_vpn_proto},
		["read"] = {cb = get_vpn_proto},
	},
	l2tp = {
		[".args"] = "l2tpvpn",
		["write"] = {cb = set_vpn_proto},
		["read"] = {cb = get_vpn_proto},
	},
	open = {
		[".args"] = "openvpn",
		["write"] = {cb = set_vpn_proto},
		["read"] = {cb = get_vpn_proto},
		["upload"] = {cb = upload_cfg_file},
	},
	ovpn = {
		[".super"] = {cb = check_upload_ovpn},
	},
	server = {
		["load"] = {cb = vpn_server_list_get,
					others = get_max_server },
        ["insert"] = {cb = vpn_server_insert},
        ["update"] = {cb = vpn_server_update},
        ["remove"] = {cb = vpn_server_remove}
	},
    vpn_user_list = {
        ["load"] = {cb = vpn_user_list_get},
        ["insert"] = {cb = vpn_user_insert},
        ["update"] = {cb = vpn_user_update},
        ["remove"] = {cb = vpn_user_remove}
    },
    vpn_user_devices = {
        [".super"] = {cb = vpn_client_list_get}
    }
}

function dispatch(http_form)
    local function hook(success, action)
        if success and action.cmd then
            if type(action.cmd) == "table" then
                for i = 1, #action.cmd - 1 do
                    sys.fork_call(action.cmd[i])
                end
                sys.fork_exec(action.cmd[#action.cmd])
            else
                sys.fork_exec(action.cmd)
            end
        end
        return true
    end

    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook})
end

function _index()
    local rejectOneTime = 0
    local fp
    local fileName
    uploadFileSize = 0

    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not fp then
                fileName = OVPN_UPLOAD_FILE
                fp = io.open(fileName, "w")
				upload_file_done = 0
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
                        os.execute("rm -f "..fileName)
                        fp = io.open(fileName, "w")
                		uploadFileSize = 0
						upload_file_done = 0
                        rejectOneTime = 1
                    end
                end
            end
            if eof then
                fp:close()
				upload_file_done = 1
            end
        end
    )

    return ctl._index(dispatch)
end

function index()
    entry({"admin", "vpn"}, call("_index")).leaf = true
end
