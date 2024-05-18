--删除upgrade相关标记

local uci_r = require("luci.model.uci").cursor()

local ue = uci_r:get("wportal","upgrade","enable") or "yes"
local ut = uci_r:get("wportal","upgrade","time") or "0"

if ue ~= "yes" or ut ~= "0" then
	uci_r:set("wportal", "upgrade", "enable", "yes")
	uci_r:set("wportal", "upgrade", "time", "0")
	uci_r:commit("wportal")
end
