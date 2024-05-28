--删除upgrade相关标记

local uci_r = require("luci.model.uci").cursor()

uci_r:set("wportal", "upgrade", "enable", "yes")
uci_r:set("wportal", "upgrade", "time", "0")
uci_r:commit("wportal")