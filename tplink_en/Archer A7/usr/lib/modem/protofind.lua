#!/usr/bin/lua

drv = {}
idV = arg[1]
idP = arg[2]

special = {}
-- PPP special cases
-- VID PID port #
special[1] = "1bbb" ; special[2] = "0017" ; special[3] = 13
special[4] = "12d1" ; special[5] = nil ; special[6] = 10
special[7] = "1546" ; special[8] = "01a6" ; special[9] = 0
special[10] = "1546" ; special[11] = "01a5" ; special[12] = 0

retval = 0
echo = 1

printf = function(s,...)
	io.write(s:format(...))
	local ss = s:format(...)
	if echo == 1 then
		os.execute("/usr/lib/rooter/logprint.sh " .. ss)
	end
end

function trim(s)
  return (s:gsub("^%s*(.-)%s*$", "%1"))
end

function checkserial()
	local got = 0
	for j=1,7 do
		if drv[j] ~= nil then
			if drv[j] == "option" or drv[j] == "qcaux" or drv[j] == "usb_serial" or drv[j] == "sierra" then
				got = 1
				break
			end
		end
	end
	return got
end

function countserial()
	local got = 0
	for j=1,7 do
		if drv[j] ~= nil then
			if drv[j] == "option" or drv[j] == "sierra" or drv[j] == "usb_serial" or drv[j] == "hso" then
				got = got + 1
			end
		end
	end
	return got
end

-- MAIN

local t = {}

local i=0
local file = io.open("/tmp/wdrv", "r")
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
						s, e = line:find("Cls=02")
						if s ~= nil then
							t[i] = trim(line:sub(63))
							i = i + 1
						end
						s, e = line:find("Cls=ff")
						if s ~= nil then
							t[i] = trim(line:sub(63))
							i = i + 1
						end
						s, e = line:find("1 Cls=e0")
						if s ~= nil then
							t[i] = trim(line:sub(63))
							i = i + 1
						end
						s, e = line:find("Cls=0a")
						if s ~= nil then
							t[i] = trim(line:sub(63))
							i = i + 1
						end
					end
				until 1==0
				break
			end		
		end
	end
until 1==0
file:close()
if i > 0 then
	file = io.open("/tmp/drv", "w")
	for j=0,i-1 do
		drv[j+1] = t[j]
		drver = string.format("%s%d%s%q", "DRIVER", j+1, "=", t[j])
		file:write(drver .. "\n")
	end
	ports = countserial()
	drver = string.format("%s%s%d%s", "PORTN", "=\"", ports, "\"")
	file:write(drver .. "\n")
	file:close()
end

for i=1,7 do
	if drv[i] ~= nil then
		printf("Driver Name : %d %s\n", i, drv[i])
	end
end

for i=1,7 do
	if drv[i] ~= nil then
		if drv[i] == "sierra_net" then
			retval = 1
			break
		end
		if drv[i] == "qmi_wwan" then
			retval = 2
			break
		end
		if drv[i] == "cdc_mbim" then
			retval = 3
			break
		end
		if drv[i] == "huawei_cdc_ncm" then
			if i == 2 then
				retval = 4
			else
				if i == 3 then
					retval = 6
				else
					retval = 7
				end
			end
			break
		end
		if drv[i] == "cdc_ncm" then
			if i == 2 then
				retval = 24
			else
				if i == 3 then
					retval = 26
				else
					retval = 27
				end
			end
			break
		end
		if drv[i] == "cdc_ether" or drv[i] == "rndis_host" then
			retval = 5
			break
		end
		if drv[i] == "hso" then
			retval = 9
			break
		end
	end
end

if retval == 0 then
	if checkserial() == 1 then
		retval = 11
		k = 1
		vendor = special[k]
		while vendor ~= nil do
			if idV == vendor then
				if special[k+1] == nil then
					retval = special[k+2]
					break
				else
					if special[k+1] == idP then
						retval = special[k+2]
						break
					end
				end
			end
			k = k + 3
			vendor = special[k]
		end
	end
end

os.exit(retval)