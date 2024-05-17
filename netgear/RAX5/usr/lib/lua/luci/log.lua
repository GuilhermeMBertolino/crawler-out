local M = {}

local tconcat = table.concat  
local tinsert = table.insert  
local srep = string.rep
local outfile = "/tmp/luci.output"
local debug_enable = 1

ntgrTagMapping = {
    allowedSite = "site_allowed",
    blockedSite = "site_blocked",
    webAccess = "Webaccess",
    routerOp = "RouterOp",
    knownAttack = "attack",
    portForwarding = "PortFw_Tr",
    wlan = "Wlan",
    wlanSchedule = "wlanSchedule",
    readyShare = "readyShare",
    vpn = "VPN"
}

local function local_print(str)  
    local dbg = io.open(outfile, "a+")
    local str = str or ""
    if dbg then
        dbg:write(str..'\n')
        dbg:close()
    end
end

function M.print(...)  
	if debug_enable == 1 then
        local dbg = io.open("/tmp/luci.output", "a+")
        if dbg then
            dbg:write(os.date("[%H:%M:%S]: "))
            for _, o in ipairs({...}) do
                dbg:write(tostring(o)..'  ')
            end
            dbg:write("\n")
            dbg:close()
        end
    end
end

function M.print_r(data, depth)  
	if debug_enable == 1 then
        local depth = depth or 3
        local cstring = ""; 
        local top_flag = true

        local function table_len(t)
        local i = 0
        for k, v in pairs(t) do
            i = i + 1
        end
        return i
        end

        local function tableprint(data,cstring, local_depth)
            if data == nil then 
                local_print("core.print data is nil");
            end 

            local cs = cstring .. "    ";
        if top_flag then
                local_print(cstring .."{");
            top_flag = false
        end
            if(type(data)=="table") then
                for k, v in pairs(data) do
                    if type(v) ~= "table" then
                        if type(v) == "string" then
                            local_print(cs..tostring(k).." = ".."'"..tostring(v).."'");
                        else
                            local_print(cs..tostring(k).." = "..tostring(v));
                        end
                    elseif table_len(v) == 0 then
                        local_print(cs..tostring(k).." = ".."{}")
                    elseif local_depth < depth then
                        local_print(cs..tostring(k).." = {");
                        tableprint(v,cs,local_depth+1);
                    else
                        local_print(cs..tostring(k).." = ".."{*}")
                    end
                end 
            else
                local_print(cs..tostring(data));
            end 
            local_print(cstring .."}");
        end 

        tableprint(data,cstring,0);
    end
end

function M.console(...)  
	if debug_enable == 1 then
		local dbg = io.open("/dev/console", "a+")
		if dbg then
			dbg:write(os.date("[%H:%M:%S]: "))
			for _, o in ipairs({...}) do
				dbg:write(tostring(o)..'  ')
			end
			dbg:write("\n")
			dbg:close()
		end
	end
end

function M.console_r(data, depth)
	if debug_enable == 1 then
		outfile="/dev/console"
		M.print_r(data, depth)
	end
end

function M.force(...)  
    local dbg = io.open("/dev/console", "a+")
    if dbg then
        dbg:write(os.date("[%H:%M:%S]: "))
        for _, o in ipairs({...}) do
            dbg:write(tostring(o)..'  ')
        end
        dbg:write("\n")
        dbg:close()
    end
end

function M.force_r(data, depth)
    outfile="/dev/console"
    M.print_r(data, depth)
end

function M.syslog(...)
	local nixio = require("nixio")
    local syslog_msg = "";

    for n=1, select('#',...) do
		local v = select(n,...)
		if (type(v) == "string" or type(v) == "number") then
			syslog_msg = syslog_msg..v.." ";
		elseif (type(v) == "boolean") then
			if v then
				syslog_msg = syslog_msg.."true ";
			else
				syslog_msg = syslog_msg.."false ";
			end
		elseif (type(v) == "nil") then
			syslog_msg = syslog_msg.."nil ";
		else
			syslog_msg = syslog_msg.."<Non-printable data type = "..type(v).."> ";
		end
    end
    nixio.syslog("debug", syslog_msg)
end

function M.ntgrlog(tag, action, msg)

    local function isValidTag(val)

        local valid_tag = {"site_allowed", "site_blocked","Webaccess", "RouterOp", "attack", "PortFw_Tr", "Wlan", "wlanSchedule", "readyShare", "VPN"};
        for i=1,#valid_tag do
            if valid_tag[i] == val then 
                return true
            end
        end
        return false
    end

    if isValidTag(tag) == false then
        return nixio.syslog("debug", "invalid tag name")
    else
        local nixio = require("nixio")
        local logmsg = ""

        if action == nil then
            logmsg = msg
        else
            logmsg = "["..action.."] "..msg
        end

        nixio.openlog(tag, "cons")
        nixio.syslog("info", logmsg)
        nixio.closelog()
    end

end

function M.debug(enable)
	debug_enable = enable
end

return M

