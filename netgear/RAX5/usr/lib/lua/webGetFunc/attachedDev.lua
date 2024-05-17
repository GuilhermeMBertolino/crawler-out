-- Get functions for attached devices
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st  = require "luci.model.uci".cursor(nil, "/var/state");
local log = require("luci.log") -- for debug
local json = require "luci.json"
local util = require "luci.util"
local sys  = require "luci.sys"
local soap = require "soap"

local dev_type_IconList =
    {
    "Computer_(Generic)",
    "Laptop",
    "Desktop",
    "Entertainment (Generic)",
    "TV",
    "Media Streamer",
    "Gaming",
    "Smart Speaker",
    "Home Office (Generic)",
    "Printer",
    "IoT (Generic)",
    "Smart Plug",
    "Fridge",
    "Light",
    "Thermostat",
    "Frame",
    "Smart Phone (Generic)",
    "Tablet",
    "Network (Generic)",
    "NAS",
    "Router",
    "Extender",
    "IP Phone",
    "Security (Generic)",
    "Camera",
    "Doorbell",
    "Smart Lock",
    "Wearable (Generic)"
    };

-------------------------------------------------------------------------------
-- Get all currently attached devices
-- @param no input parameters
-- @return one table with the information of currently attached devices
--[[
function M.getAttachedDevices()
    log.debug(0)
    local attachedDevices = {}
    local index = 1
    local fs  = require "nixio.fs"
    local leasefile = "/tmp/dhcp.leases"

    if fs.access(leasefile) then
        for l in io.lines(leasefile) do
            local time, mac, ip, name = l:match("^(%d+) (%S+) (%S+) (%S+)")
            log.console("getAttachedDevices time=",time.."       mac="..mac.."   ip="..ip.."     hostname="..name)

            if time and mac and ip then
                attachedDevices[tostring(index)] = {
                    __mac        = mac,
                    __addr        = ip,
                    __name      = name,
                }

            index = index+1
            end
        end
    end

    return attachedDevices
end
]]

function M.getMlang_GeneralRuleStatus()

   local defaultAccessRule = uci:get("landev", "@access_ctrl[0]", "rule") or "allow";

   if (defaultAccessRule == "allow") then
       return "D-genie_412";
   elseif (defaultAccessRule == "deny") then
       return "D-genie_413";
   end

end

function isValidDevice(s)

    -- Show only link-up device
    if (s.linkstate ~= "up") then
        return false;
    end

    -- Extender type 1
    --[[ One Netgear extender may has three device MAC addresses detected by RAX5.
         Two of the three devices are the physical link interfaces of 2.4G/5G.
         The third device is a internal interface of the extender device.
         The third device connects to the RAX5 router via the physical link interfaces of 2.4G/5G, so the third device acts as a device behind the extender.
         The third device would send a DHCP request to get an IP for the extender itself.
         The two physical link interfaces of 2.4G/5G have no IP detected.
         So RAX5 attached device displays the third interface which has an IP to represent the extender itself, and hides the physical link interfaces which have no IP
    --]]
    -- Extender type 2
    --[[ We expect some extender may have the same MAC addresses at the physical link interface and the internal interface.
         In this type of extender, the physical link interface will have a IP.
         So RAX5 attached device displays the physical link interface which has an IP to represent the extender itself, and hides the physical link interface which has no IP.
    --]]
    -- For both type 1 and type 2, hides the physical link interface which has no IP
    if (s.is_extender == "1") then
        if(s.ip == nil or s.ip == "0.0.0.0") then
            return false;
        end
    end

    -- Show only the devices which have an IP
    if (s.ip == nil or s.ip == "0.0.0.0") then
        return false;
    end

    return true

end

function M.getMlang_AclStatus()

   local acl_enable = uci:get("landev", "@access_ctrl[0]", "enable") or "0";

   if(acl_enable == "1") then
       return "genie_185";
   else
       return "genie_186";
   end
end


--[[
local function getPriority(pri, dev_type)
    --TODO: need check Netgear how to get default priority
    local dev_type_PriList = {
          2, 3, 3, 3, 4, 4, 4, 4, 4,
          2, 2, 2, 2, 2, 2, 2, 2, 2,
          3, 2, 1, 3, 3, 4, 2, 2, 2,
          2, 2 };

    if (pri == 0) then --it is default value and not used defined
        if (dev_type == "") then
            dev_type = 0;
        end

        return dev_type_PriList[dev_type];
    else
        return pri;
    end
end
]]


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

-------------------------------------------------------------------------------
-- Get all currently attached devices from uci config /var/state/landev
-- @param no input parameters
-- @return one table with the information of currently attached devices
function M.getAttachedDevTable()
    local output_value = {};
    local index = 1;
    local mac;
    local mac_arr = {};
    local mac_str;
    local ip;
    local model;
    local escapedmodel;
    local name;
    local escapedName;
    local dev_type;
    local dev_icon;
    local dev_type_file_name;
    local access_status;
    local access_color;
    local access_status_mlang;
    local connection_type_mlang;

    uci_st:foreach("landev", "dev",
        function(s)

            if isValidDevice(s) == false then
                return;
            end

            mac = s['.name'];
            mac_arr =  {mac:sub(1,2), mac:sub(3,4), mac:sub(5,6), mac:sub(7,8), mac:sub(9,10), mac:sub(11,12)};
            mac_str = mac_arr[1]..":"..mac_arr[2]..":"..mac_arr[3]..":"..mac_arr[4]..":"..mac_arr[5]..":"..mac_arr[6];
            mac_str_upper = string.upper(mac_str);

            if (s.ip ~= nil) then
                ip = s.ip;
            else
                ip = "---";
            end

            if (s.custom_devmodel ~= nil) then
                model = s.custom_devmodel;
            elseif (s.DeviceModel ~= nil) then
                model = s.DeviceModel;
            elseif (s.DeviceBrand ~= nil) then
                model = s.DeviceBrand;
            else
                model = "---";
            end
            htmlModel = soap.escape(model);
            escapeModel = htmlModel:gsub("'","\\'")

            if (s.custom_devname ~= nil) then
                name = s.custom_devname;
            elseif (s.hostname ~= nil) then
                name = s.hostname;
            elseif (s.DisplayNameNetgear ~= nil) then
                name = s.DisplayNameNetgear;
            else
                name = "---";
            end
            htmlName = soap.escape(name);
            escapeName = htmlName:gsub("'","\\'")

            dev_type = nil
            if (s.custom_devtype ~= nil) then
                dev_type = tonumber(s.custom_devtype);
            elseif (s.DeviceTypeNetgear ~= nil) then
                dev_type = tonumber(s.DeviceTypeNetgear);
            end

            if (dev_type == nil) then
                dev_icon = 1;
            else
                dev_icon = dev_type;
            end

            dev_type_file_name = dev_type_IconList[dev_icon];

            access_status = s.rule;
            if (access_status == "allow") then
                access_color = "green";
                access_status_mlang = "D-genie_417"; --Allowed
            else
                access_color = "red";
                access_status_mlang = "D-genie_416"; --Blocked
            end

            connection_type_mlang = getConnectionTypeStr(s.interface);

            output_value[index] = {
                __index     = index,
                __mac       = mac_str,
                __ip        = ip,
                __model     = htmlModel,
                __escapedModel      = escapeModel,
                __name      = htmlName,
                __escapedName      = escapeName,
                __devIcon   = dev_icon,
                __img       = dev_type_file_name,
                __color     = access_color,
                __status    = access_status_mlang,
                __conType   = connection_type_mlang
            }

            index = index + 1;

        end)

    return output_value;
end

function M.getQosDevTable()
    local output_value = {};
    local index = 1;

    return output_value;
end

function M.getQosAppDevValue()
    local output_value = {};
    local index = 1;

    return output_value;
end


local function dateStr_to_second(date_str)
    local date_data = util.split(date_str, ' ');
    local year = date_data[5];
    local month = date_data[2];
    local day = date_data[3];
    local time_data = util.split(date_data[4], ':');
    local hour = time_data[1];
    local min = time_data[2];
    local sec = time_data[3];
    local date_array = {};
    local seconds;
    local month_map = {Jan=1, Feb=2, Mar=3, Apr=4, May=5, Jun=6, Jul=7, Aug=8, Sep=9, Oct=10, Nov=11, Dec=12};

    --Tue Mar 22 09:59:19 2022 to {year=2022, month=3, day=22, hour=9, min=59, sec=19}
    date_array = {year=year, month=month_map[month], day=day, hour=hour, min=min, sec=sec};
    -- {year=2022, month=3, day=22, hour=9, min=59, sec=19} to seconds
    seconds = os.time(date_array);

    return seconds;
end

local function second_to_hourStr(seconds)
    local hour;
    local min;
    local sec;
    local hourStr;

    hour = math.floor(seconds / 3600);
    min = math.floor((seconds - hour * 3600) / 60);
    sec = math.floor(seconds - hour * 3600 - min * 60);

    -- seconds to 30:59:59 (hour can be over 24)
    hourStr = string.format("%d:%02d:%02d",hour, min, sec);

    return hourStr;
end

function M.getVpnDevTable()
    local output_value = {};
    local dev_name = "OPENVPN-TUN";
    local remote_ip;
    local remote_mac;
    local local_ip;

    local connect_date;
    local connect_period;
    local current_seconds = os.time();
    local connect_date_seconds;

    local json_array = {};
    local file;
    local raw_json;

    sys.exec("/etc/openvpncfg/genvpnclientlist.sh");

    file = io.open("/tmp/openvpn/VPN_Client_json", "r");
    if (file == nil) then
        log.console("/tmp/openvpn/VPN_Client_json not exist");
        return output_value;
    end
    raw_json = file:read("*all");
    file:close();

    json_array =  json.decode(raw_json);

    for index, data in pairs(json_array) do
        remote_ip = data["Real Address"];
        remote_mac = string.gsub(data["Virtual Address"], ':', '');
        local_ip = uci_st:get("landev", remote_mac,"ip") or data["Virtual Address"]
        connect_date = data["Last Ref"];
        connect_date_seconds = dateStr_to_second(connect_date);
        connect_period = second_to_hourStr(current_seconds - connect_date_seconds);

        -- Get dev_name from /var/state/vpndev.
        if (local_ip ~= nil) then
            local section;
            local val;

            -- Trasform 192.168.1.1 to 192x168x1x1 (uci can't use section name with '.')
            section = string.gsub(local_ip, '%.', "x");
            -- Use local_ip as the section name
            val = uci_st:get("vpndev", section, "hostname");
            if (val ~= nil) then
                dev_name = val;
            else
                dev_name = "OPENVPN-TUN";
            end
        end

        dev_name = soap.escape(dev_name);

        output_value[index] = {
            __index      = index,
            __name       = dev_name,
            __remoteIP   = remote_ip,
            __localIP    = local_ip,
            __time       = connect_period
        }
    end

    return output_value;
end

function M.getAttachDevNum()
    local count = 0
    uci_st:foreach("landev", "dev",
        function(s)
            -- Show only link-up device
            if isValidDevice(s) == true then
                count = count + 1;
            end
        end)

    return count;
end

return M
