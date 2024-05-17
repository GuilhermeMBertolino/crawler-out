-- Get functions for static route
local M = {}
local uci  = require "luci.model.uci".cursor()
--local log = require("luci.log") -- for debug

function M.getStaticRouteTbl()
	local staticRouteTbl = {}
	local count = 1
	local index = 0

	uci:foreach("network", "route",
		function(s)
			local isPrivate
			local isActive
			local active

			if s.interface == "lan" then
				isPrivate = "true"
			else
				isPrivate = "false"
			end
			if s.disabled == "0" then
				isActive = "true"
				active = "Yes"
			else
				isActive = "false"
				active = "No"
			end

			staticRouteTbl[tostring(index)] = {
				__index = index,
				__count = count,
				__destIpAddr = s.target,
				__routeName = s.name,
				__active = active,
				__isActive = isActive,
				__isPrivate = isPrivate,
				__subnetMask = s.netmask,
				__gateway = s.gateway,
				__metric = s.metric
			}

			count = count + 1
			index = index + 1
		end
	)

	return staticRouteTbl
end

return M