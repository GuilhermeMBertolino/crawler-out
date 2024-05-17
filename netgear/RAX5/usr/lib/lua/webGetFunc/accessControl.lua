-- Get functions for attached devices
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st  = require "luci.model.uci".cursor(nil, "/var/state");
local log = require("luci.log") -- for debug
local soap = require "soap"

function M.getAcceccControlEnable()
    local enable = uci:get("landev", "@access_ctrl[0]", "enable");
    if (enable == "1") then
        return "true";
    else
        return "false";
    end
end

function M.getAcceccControlRule()
    local rule = uci:get("landev", "@access_ctrl[0]", "rule");
    return rule;
end

local function getConnectionTypeStr(inf)
    if ( inf == "eth0" or inf == "eth1" or inf == "br-lan" ) then
        return "genie_184"; --Wired
    elseif( inf == "ra0" or inf == "apcli0" ) then
        return "MAD032"; --2G
    elseif( inf == "rax0" or inf == "apclix0" ) then
        return "MAD034"; --5G1
    elseif( inf == "ra1" ) then
        return "MAD033"; --Guest 2G
    elseif( inf == "rax1" ) then
        return "MAD035"; --Guest 5G
    elseif( inf == "vpn" ) then
        return "AQS052";  --VPN
    end

    return "Unknow";
end

function M.accessControlTable()
    local output_value = {};
    local index = 1;
    local disabled;
    local mac;
    local mac_arr = {};
    local mac_str;
    local ip;
    local name;
    local access_status;
    local access_color;
    local access_status_mlang;
    local connection_type_mlang;
    local ssid;

	uci_st:foreach("landev", "dev",
        function(s)
            -- Show only link-up device
            if (s.linkstate == "up") then

                mac = s['.name'];
                mac_arr =  {mac:sub(1,2), mac:sub(3,4), mac:sub(5,6), mac:sub(7,8), mac:sub(9,10), mac:sub(11,12)};
                mac_str = mac_arr[1]..":"..mac_arr[2]..":"..mac_arr[3]..":"..mac_arr[4]..":"..mac_arr[5]..":"..mac_arr[6];

                if (M.getAcceccControlEnable() == "true") then
                    disabled = "false";
                else
                    disabled = "true";
                end

                if (s.ip ~= nil) then
                    ip = s.ip;
                else
                    ip = "---";
                end

                if (s.custom_devname ~= nil) then
                    name = s.custom_devname;
                elseif (s.hostname ~= nil) then
                    name = s.hostname;
                elseif (s.DisplayNameNetgear ~= nil) then
                    name = s.DisplayNameNetgear;
                else
                    name = "---";
                end
                name = soap.escape(name);

                access_status = s.rule;
                if (access_status == "allow") then
                    access_color = "green";
                    access_status_mlang = "D-genie_417"; --Allowed
                else
                    access_color = "red";
                    access_status_mlang = "D-genie_416"; --Blocked
                end

                connection_type_mlang = getConnectionTypeStr(s.interface);

                if (s.ssid ~= nil) then
                    ssid = "(" .. s.ssid .. ")";
                else
                    ssid = "";
                end
                ssid = soap.escape(ssid);

                output_value[index] = {
                    __iid       = index,
                    __disabled  = disabled,
                    __index     = index,
                    __mac       = mac_str,
                    __ip        = ip,
                    __name      = name,
                    __color     = access_color,
                    __status    = access_status_mlang,
                    __conType   = connection_type_mlang,
                    __ssid      = ssid
                }

                index = index + 1;
            end
		end)

    return output_value;
end


function M.getAccessContorlWhiteTable()
    local output_value = {};
    local index = 1;
    local disabled;
    local mac;
    local mac_arr = {};
    local mac_str;
    local name;
    local connection_type_mlang;

	uci_st:foreach("landev", "dev",
        function(s)
            if (s.linkstate ~= "up" and s.rule == "allow") then
                mac = s['.name'];
                mac_arr =  {mac:sub(1,2), mac:sub(3,4), mac:sub(5,6), mac:sub(7,8), mac:sub(9,10), mac:sub(11,12)};
                mac_str = mac_arr[1]..":"..mac_arr[2]..":"..mac_arr[3]..":"..mac_arr[4]..":"..mac_arr[5]..":"..mac_arr[6];

                if (M.getAcceccControlEnable() == "true") then
                    disabled = "false";
                else
                    disabled = "true";
                end

                if (s.custom_devname ~= nil) then
                    name = s.custom_devname;
                elseif (s.hostname ~= nil) then
                    name = s.hostname;
                elseif (s.DisplayNameNetgear ~= nil) then
                    name = s.DisplayNameNetgear;
                else
                    name = "---";
                end
                name = soap.escape(name);

                connection_type_mlang = getConnectionTypeStr(s.interface);

                output_value[index] = {
                    __iid       = index,
                    __disabled  = disabled,
                    __index     = index,
                    __mac       = mac_str,
                    __name      = name,
                    __conType   = connection_type_mlang
                }

                index = index + 1;
            end
        end)

    return output_value;
end

function M.getAccessContorlBlackTable()
    local output_value = {};
    local index = 1;
    local disabled;
    local mac;
    local mac_arr = {};
    local mac_str;
    local name;
    local connection_type_mlang;

	uci_st:foreach("landev", "dev",
        function(s)
            if (s.linkstate ~= "up" and s.rule == "deny") then
                mac = s['.name'];
                mac_arr =  {mac:sub(1,2), mac:sub(3,4), mac:sub(5,6), mac:sub(7,8), mac:sub(9,10), mac:sub(11,12)};
                mac_str = mac_arr[1]..":"..mac_arr[2]..":"..mac_arr[3]..":"..mac_arr[4]..":"..mac_arr[5]..":"..mac_arr[6];


                if (M.getAcceccControlEnable() == "true") then
                    disabled = "false";
                else
                    disabled = "true";
                end

                if (s.custom_devname ~= nil) then
                    name = s.custom_devname;
                elseif (s.hostname ~= nil) then
                    name = s.hostname;
                elseif (s.DisplayNameNetgear ~= nil) then
                    name = s.DisplayNameNetgear;
                else
                    name = "---";
                end
                name = soap.escape(name);

                connection_type_mlang = getConnectionTypeStr(s.interface);

                output_value[index] = {
                    __iid       = index,
                    __disabled  = disabled,
                    __index     = index,
                    __mac       = mac_str,
                    __name      = name,
                    __conType   = connection_type_mlang
                }

                index = index + 1;
            end
        end)
    return output_value;
end

return M
