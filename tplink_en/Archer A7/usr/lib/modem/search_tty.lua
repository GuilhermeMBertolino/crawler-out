#!/usr/bin/lua


idV = arg[1]
idP = arg[2]


function trim(s)
  return (s:gsub("^%s*(.-)%s*$", "%1"))
end

-- MAIN

local dbg    = require "luci.tools.debug"

local tty = {}
local itty = {}
local drv

local retval = 0

local i = 0
local j = 0
local count = 0
local file = io.open("/tmp/modem/search_tty", "r")

dbg("proc file opened")

repeat
	local line = file:read("*line")
	if line == nil then
		break
	end
	if string.len(line) > 5 then
		s, e = line:find("Vendor=")
		if s ~= nil then
			cs, ce = line:find(" ", e)
			m_idV = trim(line:sub(e+1, cs-1))
			s, e = line:find("ProdID=")
			cs, ce = line:find(" ", e)
			m_idP = trim(line:sub(e+1, cs-1))	
			if m_idV == idV and m_idP == idP then
				repeat
					line = file:read("*line")
					if line == nil then
						break
					end
					if string.len(line) > 5 then
						s, e = line:find("T:")
						if s ~= nil then
							break
						end
						s, e = line:find("Driver=")	
						if e ~= nil then
							drv = trim(line:sub(63))
							if drv == "usbserial" or drv == "option" then
							    dbg("###############option driver found")
								cs, ce = line:find("Cls=08")
								if cs == nil then
								    dbg("###############true option driver found")
									line = file:read("*line")
									if line == nil then
										retval = 2
										break
									end
									s, e = line:find("Atr=03")
									if s ~= nil then
										itty[j] = string.format("%s%d", "ttyUSB", count)
										j = j + 1
									else
										tty[i] = string.format("%s%d", "ttyUSB", count)
										i = i + 1
									end
								end
								count = count + 1
							end
							if drv == "cdc_acm" then
							    dbg("###############acm driver found")
								cs, ce = line:find("Cls=08")
								if cs == nil then
								    dbg("###############true acm interface")
									line = file:read("*line")
									if line == nil then
										retval = 1
										break
									end
									s, e = line:find("Atr=03")
									if s ~= nil then
										itty[j] = string.format("%s%d", "ttyACM", count)
										j = j + 1
									else
										tty[i] = string.format("%s%d", "ttyACM", count)
										i = i + 1
									end
								end
								count = count + 1
							end
						end
					end
				until 1==0
				break
			end		
		end
	end
until 1==0
file:close()

file = io.open("/tmp/modem/alltty", "w")
if j > 0 then
	for k=0,j-1 do
		file:write(itty[k] .. " ")
	end
end
if i > 0 then
	for k=0,i-1 do
		file:write(tty[k] .. " ")
	end
end
file:close()

os.exit(retval)
