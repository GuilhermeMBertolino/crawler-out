local M = {}

function M.gen8to16token()
  --8 to 16 ditids
  math.randomseed(os.time())
	local t = math.random(0,8)
	local tmp = {'0','1','2','3','4','5','6','7','8','9'}
	local tokenStr = ''
	for i=1,t+8 do
   		tokenStr= tokenStr .. tmp[math.random(1,10)]
	end
	return tokenStr
end

function M.genUniqueToken()
    local sys = require "luci.sys"
    return sys.uniqueid(16)
end

return M

