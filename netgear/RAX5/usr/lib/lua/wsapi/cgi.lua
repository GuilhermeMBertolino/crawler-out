-----------------------------------------------------------------------------
-- CGI WSAPI handler
--
-- Author: Fabio Mascarenhas
-- Copyright (c) 2007 Kepler Project
--
-----------------------------------------------------------------------------

local os = require"os"
local io = require"io"
local common = require"wsapi.common"

common.setmode()

local _M = {}

-- Runs an WSAPI application for this CGI request
function _M.run(app_run)
	--[[++PEGA++]]
	--[[add result for hecking response sent]]
	local result = pcall(common.run, app_run, { input = io.stdin, output = io.stdout, error = io.stderr, env = os.getenv })
	return result
	--[[--PEGA--]]
end

return _M