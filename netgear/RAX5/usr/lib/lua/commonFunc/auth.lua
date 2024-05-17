local nixio  = require "nixio"

local M ={}

function M.getpasswd(username)
	local pwe = nixio.getsp and nixio.getsp(username) or nixio.getpw(username)
	local pwh = pwe and (pwe.pwdp or pwe.passwd)
	if not pwh or #pwh < 1 or pwh == "!" or pwh == "x" then
		return nil, pwe
	else
		return pwh, pwe
	end
end

function M.checkpasswd(username, pass)
	local pwh, pwe = M.getpasswd(username)
	if pwe then
		return (pwh == nil or nixio.crypt(pass, pwh) == pwh)
	end
	return false
end

function M.getUsername()
  local exec = require "luci.sys".exec
  local cmd = "cat /var/user.htpasswd |cut -d ':' -f1"
  local ret = exec(cmd)
  local n = nil
  if type(ret) == "string" then
    n = string.gsub(ret,"\n","")
  end
 return n and n or ""
end

return M