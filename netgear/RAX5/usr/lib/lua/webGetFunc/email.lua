-- Get functions for Email
local M = {}
local uci  = require "luci.model.uci".cursor()

function M.getEmailEnable()
	local enable = tonumber(uci:get("email", "@email[0]", "email_enable"))
	if enable == 0 then
		enable = "false"
	else
		enable = "true"
	end
	return enable
end

function M.getEmailAddr1st()
	local ipaddr = uci:get("email", "@email[0]", "email_addr1")
	return ipaddr
end

function M.getEmailServer()
	local ipaddr = uci:get("email", "@email[0]", "email_server")
	return ipaddr
end

function M.getEmailPort()
	local port = uci:get("email", "@email[0]", "email_port")
	return port
end

function M.getEmailAuthEnable()
	local auth = tonumber(uci:get("email", "@email[0]", "email_auth"))
	if auth == 0 then
		auth = "false"
	else
		auth = "true"
	end
	return auth
end

function M.getEmailUserName()
	local username = uci:get("email", "@email[0]", "email_user")
	return username
end

function M.getEmailPassword()
	local password = uci:get("email", "@email[0]", "email_pwd")
	return password
end

function M.getEmailFrequency()
	local day = uci:get("email", "@email[0]", "email_freq")
	return day
end

function M.getEmailDay()
	local day = tonumber(uci:get("email", "@email[0]", "email_day"))
	if day == 1 then
		day = "Monday"
	elseif day == 2 then
		day = "Tuesday"
	elseif day == 3 then
		day = "Wednesday"
	elseif day == 4 then
		day = "Thursday"
	elseif day == 5 then
		day = "Friday"
	elseif day == 6 then
		day = "Saturday"
	elseif day == 7 then
		day = "Sunday"
	end
	return day
end

function M.getEmailHour()
	local hour = tonumber(uci:get("email", "@email[0]", "email_hour"))
	if hour == 12 then
		hour = 0
	elseif hour > 12 then
		hour = hour - 12
	end
	return hour
end

function M.getEmailAmPm()
	local hour = tonumber(uci:get("email", "@email[0]", "email_hour"))
	if hour < 12 then
		hour = "am"
	else
		hour = "pm"
	end
	return hour
end

function M.getEmailAlertEnable()
        local alert = tonumber(uci:get("email", "@email[0]", "email_alert"))
        if alert == 0 then
                alert = "false"
        else
                alert = "true"
        end
        return alert
end

return M
