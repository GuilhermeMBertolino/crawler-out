local M = {}

function M.bintohex(s)
	return (s:gsub('(.)', function(c)
		return string.format('%02x', string.byte(c))
	end))
end

function M.hextobin(s)
	return (s:gsub('(%x%x)', function(hex)
		return string.char(tonumber(hex, 16))
	end))
end

return M
