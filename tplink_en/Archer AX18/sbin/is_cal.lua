#!/usr/bin/lua

--[[
	nor flash:  lua /sbin/is_cal ${FLASH_TYPE} ${FEATURE_DBDC} ${cal_offset_2g} ${cal_bytes_2g} {cal_offset_5g} ${cal_bytes_5g}
	比如：ax23v1上 lua /sbin/is_cal nor y 0x1fe 1234
--]]

function showAll(args)
    for key,val in pairs(args) do
        print(string.format("key:%s, val:%s", key, val))
    end
end

-- For Debug
-- showAll(arg)

local flash_type = arg[1]
local dbdc = arg[2]

-- nor flash
if flash_type == "nor" then
	--[[调用lua脚本时传入的参数都是string的，比如0x1fe传入的就是字符串“0x1fe”,
		下面处理的作用是不管传入的string是否带0x，我们都给 cal_offset 赋值为等值的16进制数，而给 cal_bytes 赋值为不带0x的string, 以方便后续处理
	--]]
	local cal_offset_2g = tonumber(string.gsub(arg[3],"0x",""), 16)
	local cal_bytes_2g = string.gsub(arg[4],"0x","")
	local cal_offset_5g = nil
	local cal_bytes_5g = nil
	if arg[5] ~= nil and arg[6] ~= nil then
		cal_offset_5g = tonumber(string.gsub(arg[5],"0x",""), 16)
		cal_bytes_5g = string.gsub(arg[6],"0x","")
	end

	local mtd_art = io.popen("cat /proc/mtd | grep 'ART' | grep -o 'mtd.'")
	local file = nil

	if mtd_art then
		file = io.open("/dev/" .. string.gsub(mtd_art:read("*all"),"\n",""), "r")
		mtd_art:close()
	end

	if file == nil then
		print("nil file")
	else
		if dbdc == "y" then
			-- only need to read first 2 bytes to match chip name
			local read_size = 2
			local cal_offset = cal_offset_2g
			local cal_flag = 0

			file:seek("set", cal_offset)
			local bytes_read_2g = file:read(read_size)
			local byte0, byte1 =  string.byte(bytes_read_2g, 1, 2)
			local tg_byte0 = tonumber(string.sub(cal_bytes_2g, 3, 4), 16)
			local tg_byte1 = tonumber(string.sub(cal_bytes_2g, 1, 2), 16)

			-- print(string.format("cal_offset_2g:0x%X, cal_bytes_2g:%s, byte0:0x%X, byte1:0x%X, tg_byte0:0x%X, tg_byte1:0x%X", cal_offset_2g, cal_bytes_2g, byte0, byte1, tg_byte0, tg_byte1))
			if byte0 == tg_byte0 and byte1 == tg_byte1  then
				cal_flag = 1
			end

			if cal_flag == 1 then
				print("true")
			else
				print("false")
			end

		else
			-- only need to read first 2 bytes to match chip name
			local read_size = 2
			local cal_2g_offset = cal_offset_2g
			local cal_5g_offset = cal_offset_5g

			local cal_2g = 0
			local cal_5g = 0

			file:seek("set", cal_2g_offset)
			local bytes_read_2g = file:read(read_size)
			local byte0, byte1 =  string.byte(bytes_read_2g, 1, 2)
			local tg_byte0 = tonumber(string.sub(cal_bytes_2g, 3, 4), 16)
			local tg_byte1 = tonumber(string.sub(cal_bytes_2g, 1, 2), 16)
			-- print(string.format("cal_offset_2g:0x%X, cal_bytes_2g:%s, byte0:0x%X, byte1:0x%X, tg_byte0:0x%X, tg_byte1:0x%X", cal_offset_2g, cal_bytes_2g, byte0, byte1, tg_byte0, tg_byte1))
			if byte0 == tg_byte0 and byte1 == tg_byte1 then
				cal_2g = 1
			end

			file:seek("set", cal_5g_offset)
			local bytes_read_5g = file:read(read_size)
			byte0, byte1 =  string.byte(bytes_read_5g, 1, 2)
			tg_byte0 = tonumber(string.sub(cal_bytes_5g, 3, 4), 16)
			tg_byte1 = tonumber(string.sub(cal_bytes_5g, 1, 2), 16)
			-- print(string.format("cal_offset_5g:0x%X, cal_bytes_5g:%s, byte0:0x%X, byte1:0x%X, tg_byte0:0x%X, tg_byte1:0x%X", cal_offset_5g, cal_bytes_5g, byte0, byte1, tg_byte0, tg_byte1))
			if byte0 == tg_byte0 and byte1 == tg_byte1 then
				cal_5g = 1
			end

			if cal_2g == 1 and cal_5g == 1 then
				print("true")
			else
				print("false")
			end
		end
	end
end

-- nand flash do nothing now
