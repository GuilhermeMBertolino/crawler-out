function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local log = require "luci.log"

local M = {}

function M.convert_bits_mask_to_dot_decimal(bitsMask)
	--convert subnet mast from bits-number(<ip>/xx) to dot-decimal (x.x.x.x)
	local dotDecimal_mask
	local num_mask = tonumber(bitsMask)
	local byte1, byte2, byte3, byte4
	if(num_mask>32) then
		-- error number, return 0.0.0.0 for error case
		byte1=0
		byte2=0
		byte3=0
		byte4=0
	elseif(num_mask>24) then
		byte1=255
		byte2=255
		byte3=255
		byte4=255-2^(32-num_mask)+1
	elseif(num_mask>16) then
		byte1=255
		byte2=255
		byte3=255-2^(24-num_mask)+1
		byte4=0
	elseif(num_mask>8) then
		byte1=255
		byte2=255-2^(16-num_mask)+1
		byte3=0
		byte4=0
	elseif(num_mask>0) then
		byte1=255-2^(8-num_mask)+1
		byte2=0
		byte3=0
		byte4=0
	else
		byte1=0
		byte2=0
		byte3=0
		byte4=0
	end
	dotDecimal_mask = string.format("%d.%d.%d.%d",byte1, byte2, byte3, byte4)
	return dotDecimal_mask
end

function M.checkIpv4Format(ip)
    -- must pass in a string value
    if ip == nil or type(ip) ~= "string" then
        return 0
    end

    -- check for format 1.11.111.111 for ipv4
    local chunks = {ip:match("(%d+)%.(%d+)%.(%d+)%.(%d+)")}
    if (#chunks == 4) then
        for _,v in pairs(chunks) do
            if (tonumber(v) < 0 or tonumber(v) > 255) then
                return false
            end
        end
        return true
    else
        return false
    end
end

function M.getIPv6_linkLocal_addr( interface )
--{
    --log.debug(1)
    local tmpIpv6Addr_str = nil

    local fp_handler = io.popen("ip address show "..interface.." | grep 'inet6.*scope link' | cut -d '/' -f 1 | awk -F ' ' '{printf $2}'", "r")
    if fp_handler ~= nil then
        tmpIpv6Addr_str = fp_handler:read("*line")
        fp_handler:close()
    end

    if tmpIpv6Addr_str ~= nil and type(tmpIpv6Addr_str) == type("string") then
        log.console(__FUNCTION__()..":"..__LINE__()..", tmpIpv6Addr_str="..tmpIpv6Addr_str)
        return tmpIpv6Addr_str
    else
        log.force(__FUNCTION__()..":"..__LINE__()..", Unable to retrieve ipv6 link-local address by grep address info of input interface!, return nil.")
        return nil
    end
--}
end

return M
