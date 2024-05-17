-- Set function for armor ad setting
local M = {}
local uci = require "luci.model.uci".cursor()
local log require "luci.log" -- for debug

function M.armor_handler(json)
    uci:set("armor", "status", "ad_disable", "true")
    uci:commit("armor")
    return {status="success", message="Finish Armor Setting"}
end
return M


