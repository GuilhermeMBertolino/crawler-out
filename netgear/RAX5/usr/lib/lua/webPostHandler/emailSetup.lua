-- Set functions for Email

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"

local isAuth

function emailSetup_validator(parm, value)
	local ret = true

	if parm == "emailAddr1" and not string.find(value, "@") then
		ret = false
	elseif parm == "username" or parm == "password" then
		if isAuth == 1 and value == "" then
			ret = false
		end
	end

	return ret
end

local emailSetup_maps =
{
	sendAlert = { data_type = "boolean", handler = nil },
	am_pm = { data_type = "am_pm", handler = nil },
	hour = { data_type = "email_hour", handler = nil },
	mailServerPort = { data_type = "port_range", handler = nil },
	sendLogType = { data_type = "send_log", handler = nil },
	day = { data_type = "week_day", handler = nil },
	enableEmail = { data_type = "boolean", handler = nil },
	isServerAuth = { data_type = "boolean", handler = nil },
	emailAddr1 = { data_type = "email", handler = emailSetup_validator },
	username = { data_type = "email", handler = emailSetup_validator },
	password = { data_type = "mail_pwd", handler = emailSetup_validator }
}

function M.emailSetup_handler(json)

	if json.enableEmail == "true" then
		isEnable = 1
	else
		isEnable = 0
	end

	if json.isServerAuth == "true" then
		isAuth = 1
	else
		isAuth = 0
	end

	if json.sendAlert == "true" then
                isAlert = 1
        else
                isAlert = 0
        end


	if json.day == "Monday" then
		d = 1
	elseif json.day == "Tuesday" then
		d = 2
	elseif json.day == "Wednesday" then
		d = 3
	elseif json.day == "Thursday" then
		d = 4
	elseif json.day == "Friday" then
		d = 5
	elseif json.day == "Saturday" then
		d = 6
	else
		d = 7
	end

	if json.am_pm == "pm" then
		h = 12 + tonumber(json.hour)
	else
		h = tonumber(json.hour)
	end

	if validator.post_data_validate(json, emailSetup_maps) == false then
		return {status="error", message=tostring(json)}
	end

	uci:set("email", "@email[0]", "email_enable", isEnable)
	uci:set("email", "@email[0]", "email_addr1", json.emailAddr1)
	uci:set("email", "@email[0]", "email_server", json.mailServer)
	uci:set("email", "@email[0]", "email_port", json.mailServerPort)
	uci:set("email", "@email[0]", "email_auth", isAuth)
	uci:set("email", "@email[0]", "email_user", json.username)
	uci:set("email", "@email[0]", "email_pwd", json.password)
	uci:set("email", "@email[0]", "email_freq", json.sendLogType)
	uci:set("email", "@email[0]", "email_day", d)
	uci:set("email", "@email[0]", "email_hour", h)
	uci:set("email", "@email[0]", "email_alert", isAlert)
	uci:commit("email")

	table.insert(changed_config, "email")

	return {status="success", message="Finish Email Setup"}
end

return M
