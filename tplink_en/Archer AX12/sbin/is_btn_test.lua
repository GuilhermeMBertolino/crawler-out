#!/usr/bin/lua

--[[
	nor flash:  lua /sbin/is_btn_test  ${FLASH_TYPE} ${btn_offset} ${btn_bytes}
	比如：ax23v1上 lua /sbin/is_btn_test nor 0x1fc 1234
--]]

function showAll(args)
    for key,val in pairs(args) do
        print(string.format("key:%s, val:%s", key, val))
    end
end

-- For Debug
-- showAll(arg)

local flash_type = arg[1]

-- nor flash
if flash_type == "nor" then
	--[[调用lua脚本时传入的参数都是string的，比如0x1fe传入的就是字符串“0x1fe”,
		下面处理的作用是不管传入的string是否带0x，我们都给 btn_offset 赋值为等值的16进制数，而给 btn_bytes 赋值为不带0x的string, 以方便后续处理
	--]]
	local btn_offset = tonumber(string.gsub(arg[2],"0x",""), 16)
	local btn_bytes = string.gsub(arg[3],"0x","")

	local mtd_art = io.popen("cat /proc/mtd | grep 'ART' | grep -o 'mtd.'")
	local file = nil

	if mtd_art then
		file = io.open("/dev/" .. string.gsub(mtd_art:read("*all"),"\n",""), "r")
		mtd_art:close()
	end

	if file == nil then
		print("nil file")
	else
		-- only need to read first 2 bytes to match chip name
		local read_size = 2
		local tg_byte0 = tonumber(string.sub(btn_bytes, 3, 4), 16)
		local tg_byte1 = tonumber(string.sub(btn_bytes, 1, 2), 16)
		local btn_flag = 0

		file:seek("set", btn_offset)
		local bytes_read_2g = file:read(read_size)
		local byte0, byte1 =  string.byte(bytes_read_2g, 1, 2)

		-- print(string.format("btn_offset:0x%X, btn_bytes:%s, byte0:0x%X, byte1:0x%X, tg_byte0:0x%X, tg_byte1:0x%X", btn_offset, btn_bytes, byte0, byte1, tg_byte0, tg_byte1))
		if byte0 == tg_byte0 and byte1 == tg_byte1  then
			btn_flag = 1
		end

		if btn_flag == 1 then
			print("true")
		else
			print("false")
		end
	end
end

-- nand flash do nothing now
