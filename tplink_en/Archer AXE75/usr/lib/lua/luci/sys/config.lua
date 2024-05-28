--[[
LuCI - config Module

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

]]--

local luci = {}
luci.sys   = require "luci.sys"
local util = require "luci.util"
local fs   = require "luci.fs"
local uci  = require "luci.model.uci"
local accountmgnt = require "luci.model.accountmgnt"
local nixio = require "nixio"

--local debug = require "luci.tools.debug"
local debug = {}
function debug.printf(s)
	local file = io.open("/dev/console", "w")
	file:write(tostring(s))
	file:write("\n")
	file:close()
end

local type, os, string, io, tostring, tonumber, require, pairs, ipairs, table, pcall = type, os, string, io, tostring, tonumber, require, pairs, ipairs, table, pcall

module("luci.sys.config")

local function getfilenames( path, files )
	files = files or {}
	local filetable = fs.dir(path)
	if nil == filetable then
		debug.printf("[getfilenames] error : filetable is nil")
		return nil
	end
	for _, entry in ipairs(filetable) do
		if entry ~= '.' and entry ~= '..' then
			local cpath = path .. '\\' .. entry
			if fs.isdirectory(cpath) then
				getfilenames(cpath,files)
			else
				table.insert(files, entry)
			end
		end
	end
	return files
end

local function get_mtd( part_name )
    local string  = require "string"

    local file    = io.input("/proc/mtd")
    while true do
        local lines = file:read("*line")
        if not lines then return nil end
        if string.match(lines, '\"' .. part_name .. '\"') then
            return string.match(lines, "mtd%d+")
        end
    end
end

local src = {"&", "<", ">"}
local dst = {"amp;", "lt;", "gt;"}

function toEscaped(line)
        if line == nil then
                return ""
        end

        local ret = line
        for index , key in ipairs(src) do
                ret = string.gsub(ret, "(".. key .. ")", "&" .. dst[index])
        end

        return ret
end

function toOrig(line)
        local sorg = line
        local sdst = ""
        local pos
        pos = string.find(sorg,"&")

        while pos and pos > 0 do
                -- head
                sdst = sdst .. string.sub(sorg, 1, pos - 1)
                sorg = string.sub(sorg, pos + 1 )
                -- escaped fit
                for index , key in ipairs(dst) do
                        xx,yy = string.find(sorg, "^" .. key)
                        if xx then
                                sorg = string.sub(sorg, yy + 1)
                                sdst = sdst .. src[index]
                                break
                        end
                end

                pos = string.find(sorg, "&")
        end
        sdst = sdst .. sorg
        return sdst
end

function fileToXml(xmlpath)
	local files = getfilenames("/etc/config")
	local uci_r = uci.cursor()

	if files == nil then
		debug.printf("[fileToXml] error : files is nil")
		return
	end
	
	if xmlpath == nil then
		debug.printf("error xmlpath is needed")
		return
	end

	local fp = io.open(xmlpath, "w+")

	if fp == nil then
		debug.printf("error open file failed:".. xmlpath)
		return
	end

	fp:write('<?xml version="1.0" encoding="utf-8"?>\n')
	fp:write('<config>\n')
	for _, file in pairs(files) do
		local cfgs_org = uci_r:get_all(file)
		if cfgs_org then
			fp:write("<" .. toEscaped(file) .. ">\n")
			
			local cfgs = {}
			-- sort by index
			for _ , scfg in pairs(cfgs_org) do
				cfgs[scfg['.index'] + 1] = scfg
			end

			for _ , option in ipairs(cfgs) do
				if option['.anonymous'] then
					fp:write("<" .. toEscaped(option['.type']) .. ">\n")
				else
					fp:write('<' .. toEscaped(option['.type']) .. ' name="' .. toEscaped(option['.name']) .. '">\n')
				end

				for key, value in pairs(option) do
					if type(value) == 'table' then
						fp:write("<list>\n")
						--get a list
						for _, rule in ipairs(value) do
							fp:write('<' .. toEscaped(key) ..'>'.. toEscaped(rule) .. '</' .. toEscaped(key) .. '>\n')
						end
						fp:write("</list>\n")
					elseif tostring(key):byte() ~= 46 then
						fp:write("<" .. toEscaped(key) .. ">" .. toEscaped(value) .. "</" .. toEscaped(key) .. ">\n")
					end
				end
				fp:write("</" .. toEscaped(option['.type']) .. ">\n")
			end
			fp:write("</" .. toEscaped(file) .. ">\n")
		else
			fp:write("<".. toEscaped(file) .."/>\n")
		end
	end
	fp:write('</config>')
	fp:close()
end

--temp func below
function convertFileToXml(filepath,xmlpath)
	local files = nil
	local uci_r = uci.cursor()
	
	if xmlpath == nil or filepath == nil then
		debug.printf("error xmlpath is needed")
		return
	end

	local fp    = io.open(xmlpath, "w+")

	if fp == nil then
		debug.printf("error open file failed:".. xmlpath)
		return
	end

	files = getfilenames(filepath)
	if files == nil then
		debug.printf("error get files in filepath: "..filepath)
		return
	end
	
	fp:write('<?xml version="1.0" encoding="utf-8"?>\n')
	fp:write('<config>\n')
	for _, file in pairs(files) do
		
		--set the filepath for uci
		local conf_dir = uci_r:get_confdir()
		uci_r:set_confdir(filepath)
		local cfgs_org = uci_r:get_all(file)
		uci_r:set_confdir(conf_dir)
		
		if cfgs_org then
			fp:write("<" .. toEscaped(file) .. ">\n")
			
			local cfgs = {}
			-- sort by index
			for _ , scfg in pairs(cfgs_org) do
				cfgs[scfg['.index'] + 1] = scfg
			end

			for _ , option in ipairs(cfgs) do
				if option['.anonymous'] then
					fp:write("<" .. toEscaped(option['.type']) .. ">\n")
				else
					fp:write('<' .. toEscaped(option['.type']) .. ' name="' .. toEscaped(option['.name']) .. '">\n')
				end

				for key, value in pairs(option) do
					if type(value) == 'table' then
						fp:write("<list>\n")
						--get a list
						for _, rule in ipairs(value) do
							fp:write('<' .. toEscaped(key) ..'>'.. toEscaped(rule) .. '</' .. toEscaped(key) .. '>\n')
						end
						fp:write("</list>\n")
					elseif tostring(key):byte() ~= 46 then
						fp:write("<" .. toEscaped(key) .. ">" .. toEscaped(value) .. "</" .. toEscaped(key) .. ">\n")
					end
				end
				fp:write("</" .. toEscaped(option['.type']) .. ">\n")
			end
			fp:write("</" .. toEscaped(file) .. ">\n")
		else
			fp:write("<".. toEscaped(file) .."/>\n")
		end
	end
	fp:write('</config>')
	fp:close()
end
--temp func above

local function getxmlkey(line)
	local keys = {'empty', 'single', 'end', 'new'}
	local exps = { '<(.+)/>', '<(.-)>(.-)</(.+)>', '</(.+)>', '<(.+)>'}
	
	line = string.gsub(line, "(')","'\\''")
	line = string.gsub(line, ' modify="no"', '') --为了处理<option modify="no">和<list modify="no">，先替换为空，后续规则不变
	line = string.gsub(line, ' merge="no"', '')
	line = string.gsub(line, ' remodel_%a+="%d"', '')
	for key, exp in ipairs(exps) do
		local data = string.match(line, exps[key])
		if data then
			if keys[key] == 'single' then
				--check single entry'name
				local single1 = string.match(line, '<(.-)>.-</.+>')
				local single2 = string.match(line, '<.->.-</(.+)>')
				if single1 == single2 then
					return {['key'] = toOrig(keys[key]), ['value'] = toOrig(string.gsub(line, '<(.-)>(.-)</(.-)>', "%1 '%2'"))}
				else
					debug.printf('error line.' .. line)
					return nil
				end
			else
				return {['key'] = toOrig(keys[key]), ['value']  = toOrig(data)}
			end
		end
	end
	return nil
end

local function filter_illegal_code(line)
    --strict illegal filter list
    --local illegal_list = {'|','&',';','@','\'','\\','<>','\r','%$','%%','%.%.','%(','%)'}
    local filter_line = line
    local illegal_list = {'|','%.%.',';','&','\''}
    local format_list = {'<(.+)>(.+)</(.+)>','^</(.+)>$','^<(.+)>$'}
    local start_name,end_name,content

    -- formart judgement
    for key, exp in ipairs(format_list) do
        if string.match(filter_line, exp) then
            -- formart '^<(.+)>.*</(.+)>$'
            if key == 1 then
                local words = {}
                for start_name,content,endname in filter_line:gmatch("<(.+)>(.+)</(.+)>") do
                    table.insert(words, start_name)
                    table.insert(words, content)
                    table.insert(words, endname)
                end
                --debug.printf("key:" .. key .. " start_name:" .. words[1] .. " end_name:" .. words[3] .. " line:" filter_line)
                if (words[1] == nil or words[3] == nil or words[1] ~= words[3]) then
                    return false
                end
                for key2, exp2 in ipairs(illegal_list) do
                    if string.match(words[1], exp2) then
                        return false
                    end
                end

                return true
            end

            -- formart '^</(.+)>$'
            if key == 2 then
                end_name = string.sub(filter_line,3,-2)
                --debug.printf("key:" .. key .. " end_name:" .. end_name .. " line:" .. filter_line)
                for key2, exp2 in ipairs(illegal_list) do
                    if string.match(end_name, exp2) then
                        return false
                    end
                end
                return true
            end

            -- formart '^<(.+)>$'
            if key == 3 then
                start_name = string.sub(filter_line,2,-2)
                --debug.printf("key:" .. key .. " start_name:" .. start_name .. " line:" .. filter_line)
                for key2, exp2 in ipairs(illegal_list) do
                    if string.match(start_name, exp2) then
                        return false
                    end
                end
                return true
            end

            return true
        end
    end

    return false
end

function old_xmlToFile(xmlpath, filepath, filterFlag)
	local fp = io.open(xmlpath, 'r')
	local step = 'dir' 
    -- dir, file, config, option
	local data,filefp,dir,file,config,option
    local filter_result

	if not (xmlpath and filepath and fp) then
		--debug.printf("xmlpath,filepath is must exist")
		return false
	end

	local stepaddentry = {
		['dir']	= function(data, mov)
				os.execute('mkdir '.. filepath .. '/'.. data)
				dir = data
				if mov then
					step = 'file'
				end
			  end,
		['file']= function(data, mov)
				if filefp then
					debug.printf("error last file is still open. " .. data)
					return 1
				else
					if mov then
						step = 'config'
						file = data
					end
					--debug.printf("open file" .. '/tmp/' .. dir .. '/' .. file)
					filefp = io.open(filepath .. '/' .. dir .. '/' .. file, 'w')
					if filefp then
						--debug.printf("filefp is ok.")
					end
				end
			  end,
		['config'] = function(data, mov)
				if filefp then
					local tdata = data
					filefp:write('\n')
					local name = string.match(data, 'name="(.+)"')
					if name then
						filefp:write('config '.. string.gsub(data, '(.+) name="(.+)"', "%1 '%2'") .. '\n')
						tdata = string.match(data, '(.+) name=".+"')
					else
						filefp:write('config '.. data .. '\n')
					end
					if mov then
						step = 'option'
						if config then
							debug.printf("error ".. config .. "config not closed. new: " .. data)
							return 1
						else
							--debug.printf('set config: ' .. tdata)
							config = tdata
						end
					end
				else
					debug.printf("error:no file is open, config: " .. data)
					return 1
				end
			   end,
		['option'] = function(data, mov)
				if filefp then
					if mov then
						step = 'list'
						option = data
					else
						filefp:write('    option ' .. data .. '\n')
					end
				else
					debug.printf("error:no file is open, option: " .. data)
					return 1
				end
			   end,
		['list']   = function(data)
				if filefp then
					filefp:write('    list '.. data .. '\n')
				else
					debug.printf("error:no file is open, list: " .. data)
					return 1
				end
			     end	
	}

	local stependentry = {
		-- end is step forward
		['dir']	  = function(data)
				debug.printf("error where to go ?")
			    end,
		['file']  = function(data)
				--[[if data ~= dir then
					debug.printf("error file end." .. data)
					return 1
				end]]--
				if data == dir then
					step = 'dir'
					dir = nil
				else
					debug.printf("error dir end." .. data)
					return 1
				end
			    end,
		['config']= function(data)
				if data == file and filefp then
					filefp:close()
					filefp = nil
					file = nil
					step = 'file'
				else
					debug.printf("error file end." .. data)
					return 1
				end
			    end,
		['option']= function(data)
				if data == config and filefp then
					step = 'config'
					config = nil
				else
					debug.printf("error config end. " .. data .. ' != ' .. config)
					return 1
				end
			    end,
		['list']= function(data)
				if data == option and filefp then
					step = 'option'
					option = nil
				else
					debug.printf("error option end." .. data)
					return 1
				end
			    end
	}

	local func = {
		['empty'] = function(data)
				return stepaddentry[step](data, false)
			  end,
		['end']	= function(data)
				return stependentry[step](data)
			  end,
		['single']= function(data)
				return stepaddentry[step](data, false)
			  end,
		['new']	= function(data)
				return stepaddentry[step](data, true)
			  end
	}
	-- drop xml head
	local tmp = 0
	local errorline = nil
	local ret = true
	
	-- do work
	for line in fp:lines() do
		--errorline in middle
		if errorline then
			debug.printf("error unkown line: " .. line)
			break
		end
        if filterFlag == true then
            -- origin_line = line
            filter_result = filter_illegal_code(line)
            if filter_result == false then
                debug.printf("find error illegal line: " .. line)
                tmp = 0
            end
        end
		if tmp == 1 then
            --debug.printf(line)
			data = getxmlkey(line)
			if data then
                --debug.printf("key:" .. data.key .. " value:" .. data.value)
				if func[data.key](data.value) then
					debug.printf("error operation failed: ".. line)
					break
				end
			else
				errorline = line
			end
		end
		tmp = 1
	end
	
	--integrity check
	if filefp or file or config or option then
		debug.printf("error:config is not finish(filefp,file,config,option): " .. tostring(filefp) .. tostring(file) .. tostring(config) .. tostring(option))	
		ret = false
	end

	fp:close()
	return ret
end

function xmlToFile(xmlpath, filepath)
	local res,ret = pcall(old_xmlToFile,xmlpath,filepath,false)
	if res then
		return ret
	else
		debug.printf("error:xml file is bad,error info is "..tostring(ret))
		return false
	end

end

function restoreXmlToFile(xmlpath, filepath)
	local res,ret = pcall(old_xmlToFile,xmlpath,filepath,true)
	if res then
		return ret
	else
		debug.printf("error:xml file is bad,error info is "..tostring(ret))
		return false
	end
end

function switch_mode_locked()
    local SWITCH_MODE_LOCK = "/var/run/switch_mode.lock"
    local nixio = require("nixio") 
    return nixio.fs.access(SWITCH_MODE_LOCK)
end

function reset_factory_locked()
    local RESET_FACTORY_LOCK = "/var/run/reset_factory.lock"
    local nixio = require("nixio") 
    return nixio.fs.access(RESET_FACTORY_LOCK)
end

-- Save flash in factory reset
function factory_saveconfig()
	local time = (require "socket").gettime() * 10000
    local user_config_xml = "/tmp/save-userconf." .. time .. ".xml"
    local user_config_cry = "/tmp/save-userconf." .. time .. ".cry"
    local save_str 	= "nvrammanager -w " .. user_config_cry .. " -p user-config >/dev/null 2>&1"
    local remove_file_str = "rm -f " .. user_config_xml .. " " .. user_config_cry .. " >/dev/null 2>&1"
	local cry = require "luci.model.crypto"

	debug.printf("factory saveconfig() begin")
	-- debug.printf(nvrammanager_save)
	-- debug.printf(remove_file)

	fileToXml(user_config_xml)
	cry.enc_file_entry(user_config_xml, user_config_cry)
	os.execute(save_str)
	os.execute(remove_file_str)
	debug.printf("factory saveconfig() end")
end

function saveconfig()
    if switch_mode_locked() then
        debug.printf(" ======= SWITCH MODE LOCKED, saveconfig() abort ========= ")
        return
    end

    if reset_factory_locked() then
        debug.printf(" ======= RESET FACTORY LOCKED, saveconfig() abort ========= ")
        return
    end
    
    local time = (require "socket").gettime() * 10000
    local user_config_xml = "/tmp/save-userconf." .. time .. ".xml"
    local user_config_cry = "/tmp/save-userconf." .. time .. ".cry"
    local save_str 	= "nvrammanager -w " .. user_config_cry .. " -p user-config >/dev/null 2>&1"
    local remove_file_str = "rm -f " .. user_config_xml .. " " .. user_config_cry .. " >/dev/null 2>&1"
	local cry = require "luci.model.crypto"

	debug.printf("saveconfig() begin")
	-- debug.printf(nvrammanager_save)
	-- debug.printf(remove_file)

	fileToXml(user_config_xml)
	cry.enc_file_entry(user_config_xml, user_config_cry)
	os.execute(save_str)
	os.execute(remove_file_str)
	debug.printf("saveconfig() end")
end

function get_remodel_para()
    local  aliasForVerOption = "product_ver"
    local  productNameOption = "product_name"
    local  product_name
    local  product_ver
    os.execute("nvrammanager  -r /tmp/productinfo -p  product-info  >/dev/null 2>&1")
    fp,err = io.open("/tmp/productinfo",'r')
    
    if fp == nil then
        debug.printf(err)
    else
        local value1, value2
        for line in fp:lines() do
            value1 = string.match(line, string.format("%s:(.+)", productNameOption))
            value2 = string.match(line, string.format("%s:(.+)", aliasForVerOption))
            if value1 then
                product_name = value1
            end
            if value2  then
                product_ver = value2
            end
            if product_name and product_ver  then
                fp:close()
                return product_name, product_ver
            end
        end
        fp:close()
    end
    
    return nil
end

function resetconfig()
	debug.printf("resetconfig() begin")
	local uci_r = uci.cursor()
	local extern_partitions = uci_r:get_profile("backup_restore", "extern_partition") or nil
    if extern_partitions ~= nil then
        extern_partitions = util.split(extern_partitions, " ")
        for i, v in ipairs(extern_partitions) do
            if v ~= nil then
                os.execute("nvrammanager -e -p " .. v .. " >/dev/null 2>&1")
            end
        end
    end
	
    local remodel_name = nil
    local remodel_ver = nil
    local remodel_enable = uci_r:get_profile("remodel_switch", "enable") or "no"
    if remodel_enable == "yes" then
        remodel_name, remodel_ver = get_remodel_para()
        if remodel_name == nil or remodel_ver == nil then
            remodel_enable = "no"
        end
    end

	os.execute("nvrammanager -r /tmp/reset-defconfig.cry -p default-config >/dev/null 2>&1")
	
	local cry   = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/reset-defconfig.cry", "/tmp/reload-userconf.xml")
	local country = getsysinfo("country")

    if remodel_enable == "yes" then
    	uci_r:remodel(remodel_name, remodel_ver, "/tmp/reload-userconf.xml", country)
    end
    uci_r:reset_merge_local("/tmp/reload-userconf.xml", country)

	cry.enc_file_entry("/tmp/reload-userconf.xml", "/tmp/reset-defconfig.cry")
	
	os.execute("nvrammanager -w /tmp/reset-defconfig.cry -p user-config >/dev/null 2>&1")
	os.execute("rm -f /tmp/reset-defconfig.cry /tmp/reload-userconf.xml >/dev/null 2>&1")

	debug.printf("resetconfig() end")
end

function eraseconfig()
	debug.printf("eraseconfig() begin:")
	os.execute("nvrammanager -e  -p  user-config  >/dev/null 2>&1")
	debug.printf("eraseconfig() end:")
end

function isdftconfig()
	local username,password
	local defaultcfg
	local head,tail,value
	local usernames,i
	
	--get default username
	os.execute("nvrammanager -r /tmp/default-config.cry -p default-config >/dev/null 2>&1")
	local cry = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/default-config.cry", "/tmp/default-config.xml")
	local fp = io.open("/tmp/default-config.xml",'r')
	defaultcfg = fp:read("*a")
	fp:close()
	os.execute("rm -f /tmp/default-config.xml /tmp/default-config.cry >/dev/null 2>&1")
	
	head="<accountmgnt>"
	tail="</accountmgnt>"
	_,_,value=string.find(defaultcfg, head.."(.-)"..tail)
	
	head="<username>"
	tail="</username>"
	_,_,value=string.find(value, head.."(.-)"..tail)

	usernames = accountmgnt.get_name()

	if usernames and table.getn(usernames) > 0 then
		for i=1,table.getn(usernames) do 
			if usernames[i] == value then
				username = usernames[i]
			end
		end  
	else
		return false
	end

	if username == value then
		password = accountmgnt.get_password(username)
		if password == "admin" then
			return true
		else
			return false
		end
	else
		return false
	end
end

function isupgrade()
	local upgrade
	local fp = io.open("/tmp/isupgrade",'r')
	if fp == nil then
		return false
	else
		upgrade = fp:read("*a")
		fp:close()
		if upgrade:match("[.]*true[.]*") then
			return true
		else
			return false
		end
	end
	return false
end
function clear_upgrade_flag()
	os.execute("rm -f /tmp/isupgrade")
end


--[[
	merge config after loadconfig
]]--
function load_old_config(path, config_name)
    local config_old   = path .. config_name
    local all_sections = {}
    local uci_r = uci.cursor()

    if fs.isfile(config_old) then
        uci_r:unload(config_name)
        uci_r:load(config_old)
        all_sections = uci_r:get_all(config_name) or {}
        uci_r:unload(config_name)
    end
    return all_sections
end

function parse_merge_config(firmware_file)
    local err = nil
    os.execute("mkdir /tmp/merge >/dev/null 2>&1")
    if firmware_file then
		os.execute("nvrammanager -d \"%s\" -r /tmp/merge-config.cry -p merge-config >/dev/null 2>&1" % (firmware_file))
    else
    	os.execute("nvrammanager -r /tmp/merge-config.cry -p merge-config >/dev/null 2>&1")
	end
	
    local filesize = fs.stat("/tmp/merge-config.cry").size
    if filesize == 0 then
        err = true
    else
        local cry = require "luci.model.crypto"
        cry.dec_file_entry("/tmp/merge-config.cry", "/tmp/merge-config.xml")
        local file = io.open("/tmp/merge-config.xml", 'r')
        if file == nil then
            err = true
        elseif file:read(6) == '<?xml 'then
            file:close()
            os.execute("rm -rf /tmp/merge/* >/dev/null 2>&1")
            local ret = xmlToFile("/tmp/merge-config.xml", "/tmp/merge")
            if ret == false then
                err = true
            end
        else
            file:close()
            err = true
        end
    end

    os.execute("rm -f /tmp/merge-config.cry /tmp/merge-config.xml >/dev/null 2>&1")
    return err
end

function merge_country_profile(merge_dir)
	local uci_r = uci.cursor()
	local fs    = require "luci.fs"
	local country_merged = uci_r:get("locale","sysinfo","country")
	local country = getsysinfo("country")    
	if country_merged ~= nil then
        if fs.isdirectory ("/tmp/merge/" ..country) then
            debug.printf("===== merge profile of country " .. country .. " begin ====")
            local profile_config = fs.dir("/tmp/merge/" ..country.."/")
            for _, config_name in pairs(profile_config or {}) do
                if config_name == "profile" then
                    update = 0
                    if fs.isfile("/etc/config/" .. config_name) == false then
                        luci.sys.call("touch /etc/config/" .. config_name)
                        update = 1
                    end

                    local all_sections = load_old_config("/tmp/merge/" ..country.."/", config_name)
                    for section_name, options in pairs(all_sections or {}) do
                        if type(options) == "table" and options[".anonymous"] then
                            section_name = uci_r:add(config_name, options[".type"])
                            update = 1
                        elseif not uci_r:get(config_name, section_name) then
                            uci_r:set(config_name, section_name, options[".type"])
                            update = 1
                        end

                        for name, value in pairs(options or {}) do
                            if not name:find("^%.") then 
                                if uci_r:get(config_name, section_name, name) ~= value then
                                    uci_r:set(config_name, section_name, name, value)
                                    update = 1
                                end
                            end
                        end
                    end

                    if update == 1 then                                
                        uci_r:commit(config_name)
                    end
                end
            end
            debug.printf("===== merge profile of country " .. country .. " end ====")
        end
    end
end

function get_mf_wifi_channel(seed)
	local math = require "math"
	local data = {}
	local tmp = 0

	if not seed then
		return nil
	end

	debug.printf("get_mf_wifi_channel:seed:" .. seed)

	local file = io.open("/dev/urandom", "rb")
	if file then
		local d = file:read(4)
		for i = 1, 4 do
			tmp = tmp * 256 + string.byte(d, i)
		end
		seed = seed + tmp % 10000000
		file:close()
	end
	math.randomseed(seed)
	data.m2g = math.random(2, 10)
	data.m5g = math.random(9, 12)*4

	debug.printf("2g channel:" .. data.m2g)
	debug.printf("5g channel:" .. data.m5g)

	return data
end

function get_pin()
	local pin = util.execl("getfirm PIN")
	if pin then
		return pin[1]
	else
		return nil
	end
end

-- manufactory mode: if the channel==none,randomlize the channel,to avoid interference
function merge_mfconfig()
	local uci_r = uci.cursor()
	local pin
	local factorymode
	local iface_2g, iface_5g, ifname_2g, ifname_5g
	factorymode = uci_r:get("factory","factorymode","enable") or "no"
	if factorymode ~= "yes" then
		-- kill tddp unless it's in manufactory mode!!!
		-- as it may cause inconvinient for factory procudue,remove this.liuqu 20171101.
		-- luci.sys.fork_call("rm -f /etc/rc.d/S*tddp")
		return
	end

	pin = get_pin()
	debug.printf("pin:" .. pin)
	debug.printf("set MF channel")

	if pin == nil or pin == "" then
		pin = "03717660"
	end

	local data = get_mf_wifi_channel(tonumber(pin))
	local model = uci_r:get_profile("global", "model") or ""
	if model == "MTK_762X" then
		ifname_2g = uci_r:get_profile("wireless","wifi_device_2g") or "wifi0"
		ifname_5g = uci_r:get_profile("wireless","wifi_device_5g") or "wifi1"
	else
		iface_2g = uci_r:get_profile("wireless","wireless_ifname_2g")
		iface_5g = uci_r:get_profile("wireless","wireless_ifname_5g")
		ifname_2g = uci_r:get("wireless", iface_2g, "ifname")
		ifname_5g = uci_r:get("wireless", iface_5g, "ifname")
		--do not set 5g2 which will apply the default channel value, whether the dut support triband or not
	end

	if data then
		if data.m2g then
			uci_r:set("wireless", ifname_2g, "channel", data.m2g)
		end
		if data.m5g then
			uci_r:set("wireless", ifname_5g, "channel", data.m5g)
		end

		-- we can't commit to flash,becasue it will overwrite channel
		-- we still need channel=none to use mac/pin tool.
		uci_r:commit_without_write_flash("wireless")
	end
end

local function load_openvpn_cert()
	os.execute("nvrammanager -r /tmp/openvpn-cert.cry -p certificate >/dev/null 2>&1")
	local filesize = fs.stat("/tmp/openvpn-cert.cry").size
	if filesize == 0 then
		os.execute("rm -f /tmp/openvpn-cert.cry >/dev/null 2>&1")
		return true
	end
	
	local cry = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/openvpn-cert.cry", "/tmp/openvpn-cert.tar")
	os.execute("tar -xzf /tmp/openvpn-cert.tar -C /etc/openvpn >/dev/null 2>&1")
	os.execute("rm -f /tmp/openvpn-cert.cry  /tmp/openvpn-cert.tar >/dev/null 2>&1")

end

function reloadconfig()
    local uci_r = uci.cursor()
    local cry   = require "luci.model.crypto"
	local resetFlag  = 0   --1-恢复出厂
	local commitFlag = 0   --标志是否需要写flash
	local country = getsysinfo("country")
	
    local remodel_name = nil
    local remodel_ver = nil
    local remodel_enable = uci_r:get_profile("remodel_switch", "enable") or "no"
    if remodel_enable == "yes" then
        remodel_name, remodel_ver = get_remodel_para()
        if remodel_name == nil or remodel_ver == nil then
            remodel_enable = "no"
        end
    end

	debug.printf("reloadconfig() begin")
	debug.printf("................................load openvpn cert.........................")
	load_openvpn_cert()

	os.execute("mkdir /tmp/etc ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1")
	local filesize = fs.stat("/tmp/reload-userconf.cry").size
	if filesize == 0 then
		resetFlag = 1
		debug.printf("user-config file size 0")
		resetconfig() --把default分区写入user分区
		os.execute("rm -f /tmp/reload-userconf.cry ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1")
	end
	
	cry.dec_file_entry("/tmp/reload-userconf.cry", "/tmp/reload-userconf.xml")
	filesize = fs.stat("/tmp/reload-userconf.xml").size --测试发现.cry不为0，但是.xml为0，所以再判断一次
	if filesize == 0 then
		resetFlag = 1
		debug.printf("user-config xml file size 0")
		resetconfig()
		os.execute("rm -f /tmp/reload-userconf.* ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1")
		cry.dec_file_entry("/tmp/reload-userconf.cry", "/tmp/reload-userconf.xml")
	end

	if resetFlag == 1 then
		debug.printf("................................reset, then localize.........................")
        commitFlag = uci_r:reset_merge_local("/tmp/reload-userconf.xml", country)
		if commitFlag == -1 then
	    	debug.printf("call uci_r:reset_merge_local error")
	    end
	else
		debug.printf("................................start of merge user and default........................")
		debug.printf("................................parse userconf to get mode.............................")
		local file,err = io.open("/tmp/reload-userconf.xml",'r')
		if file == nil then
			debug.printf(err)
		elseif file:read(6) == '<?xml ' then
			file:close()
			os.execute("rm -rf /etc/config /tmp/etc/* >/dev/null 2>&1") --先把配置删除
			local ret = xmlToFile("/tmp/reload-userconf.xml", "/tmp/etc")
			if ret == false then
				resetFlag = 1
				resetconfig()
				os.execute("rm -f /tmp/reload-userconf.* ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1")
				cry.dec_file_entry("/tmp/reload-userconf.cry", "/tmp/reload-userconf.xml")
			end
		else
			file:close()
			resetFlag = 1
			os.execute("rm -f /tmp/reload-userconf.* ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1")
			cry.dec_file_entry("/tmp/reload-userconf.cry", "/tmp/reload-userconf.xml")
		end
		debug.printf("................................end of parse userconf..................................")

		if resetFlag == 1 then --user-config解析过程出错导致reset，直接本地化
            commitFlag = uci_r:reset_merge_local("/tmp/reload-userconf.xml", country)
			if commitFlag == -1 then
		    	debug.printf("call uci_r:reset_merge_local error")
		    end
		else
			os.execute("cp -r /tmp/etc/config /etc/ >/dev/null 2>&1")
			local mode = uci_r:get("sysmode", "sysmode", "mode")
			if mode ~= nil then
				debug.printf("................................mode : ".. mode .. "...............................")
			end
			if mode == 'ap' then
				os.execute("nvrammanager -r /tmp/reload-defconfig.cry -p ap-def-config >/dev/null 2>&1")
			else
				os.execute("nvrammanager -r /tmp/reload-defconfig.cry -p default-config >/dev/null 2>&1")
			end
			cry.dec_file_entry("/tmp/reload-defconfig.cry", "/tmp/reload-defconfig.xml")
			
            if remodel_enable == "yes" then
            	debug.printf("................................remodel defaulconfig: " .. remodel_name .. " " .. remodel_ver .. "..........")
                uci_r:remodel(remodel_name, remodel_ver, "/tmp/reload-defconfig.xml", country)
            end
		    commitFlag = uci_r:merge("/tmp/reload-userconf.xml", "/tmp/reload-defconfig.xml", country)
		    
		    if commitFlag == -1 then
		    	debug.printf("call uci_r:merge error")
		    end
		    os.execute("rm -f /tmp/reload-defconfig.* >/dev/null 2>&1")
		end
		debug.printf("................................end of merge user and default..........................")
	end

	--得到合并后的xml，将其解析到/etc/config
	os.execute("rm -rf /etc/config /tmp/etc/* >/dev/null 2>&1")
	local ret = xmlToFile("/tmp/reload-userconf.xml", "/tmp/etc")
	if ret == false then
		debug.printf("error xmlToFile(userconf.xml)")
	end
	os.execute("cp -r /tmp/etc/config /etc/ ; rm -rf /tmp/reload-userconf.* /tmp/etc/* >/dev/null 2>&1")

	if commitFlag == 1 then
		debug.printf("................................new configs merged.....................................")
		--uci_r:commit()
	end

    --read stored acount info in /data/factory_status 
    --which is needed in nand double image
    local flash_type = uci_r:get_profile("global", "flash_type")
    if flash_type and flash_type == "nand_double_image" then
    	--local https_client = uci_r:get_profile("cloud", "https_client")
        local fp = io.open("/data/factory_status", "r") --/data/factory_status文件不存在，不执行后续操作
        if fp then
            local line
            local bind_status, need_unbind, cloud_username, cloud_password, local_password, accountid, factory_id
            local accmgnt = require "luci.model.accountmgnt"

            line = fp:read("*line") --读取一行，包括六个变量的信息
            if line then
                bind_status = string.match(line, "bind_status=(.-);") or nil
                need_unbind = string.match(line, "need_unbind=(.-);") or nil
                cloud_username = string.match(line, "cloud_username=(.-);") or nil
                cloud_password = string.match(line, "cloud_password=(.-);") or nil
                local_password = string.match(line, "local_password=(.-);") or nil
                accountid = string.match(line, "accountid=(.-);") or nil
                factory_id = string.match(line, "factory_id=(.-);") or nil
            end	
            fp:close()
			
            os.execute("rm -f /data/factory_status >/dev/null 2>&1")

            --restore acount info if running in default account status
            if accmgnt.is_dft_cfg() then --如果“账户信息”在默认配置条件下
                if local_password then
                    accmgnt.set_no_encrypt("admin", local_password) --设置username, password
                end
				
                if bind_status == "1" or need_unbind == "1" then
                    local restore = false
                    if cloud_username and cloud_password then
                        accmgnt.set_cloudAccount(cloud_username, cloud_password)
                        restore = true
                    end

                    if accountid then
                        uci_r:set("cloud_config", "device_status", "accountid", accountid)
                        restore = true
                    end

                    if restore == true then
                        if bind_status then
                            uci_r:set("cloud_config", "device_status", "bind_status", bind_status)
                        end
                        if need_unbind then
                            uci_r:set("cloud_config", "device_status", "need_unbind", need_unbind)
                        end
                    end
                    uci_r:commit("cloud_config")
                end

                if factory_id then
                    uci_r:set("ifttt_trigger", "ifttt_config", "factory_id", factory_id)
                    uci_r:commit("ifttt_trigger")
                end
            end
        end
    end
	merge_mfconfig()
    debug.printf("reloadconfig() end")
    -- local support_onemesh = uci_r:get_profile("onemesh", "onemesh_support") or "no"
    -- if support_onemesh == "yes" then
    -- 	merge_onemesh_config()
    -- end
end

function getsysinfo(option)
	local fp,err
	
	if option == "SOFTVERSION" then	
		local softVerOption = "soft_ver"

		os.execute("nvrammanager  -r /tmp/softversion -p  soft-version  >/dev/null 2>&1")
		fp,err = io.open("/tmp/softversion",'r')
		
		if fp == nil then
			debug.printf(err)
		else
			local value
			for line in fp:lines() do
				value = string.match(line, string.format("%s:(.+)", softVerOption))
				if value then
					fp:close()
					return value
				end
			end
			fp:close()
		end
	end
	
	if option == "HARDVERSION" then
		local  aliasForVerOption = "product_ver"
		local  productNameOption = "product_name"
		local  product_name
		local  product_ver
		os.execute("nvrammanager  -r /tmp/productinfo -p  product-info  >/dev/null 2>&1")
		fp,err = io.open("/tmp/productinfo",'r')
		
		if fp == nil then
			debug.printf(err)
		else
			local value1, value2
			for line in fp:lines() do
				value1 = string.match(line, string.format("%s:(.+)", productNameOption))
				value2 = string.match(line, string.format("%s:(.+)", aliasForVerOption))
				if value1 then
					product_name = value1
				end
				if value2  then
					if string.len(value2) == 5 then 
						product_ver = string.sub(value2, 1, -3)
					else 
						product_ver = value2
					end
				end
				if product_name and product_ver  then
					fp:close()
					return (product_name .. " v" .. product_ver)
				end
			end
			fp:close()
		end
	end
	
	if option == "PIN" then
		os.execute("nvrammanager  -r /tmp/pin -p  pin  >/dev/null 2>&1")	
		fp,err = io.open("/tmp/pin",'r')
		
		if fp == nil then
			debug.printf(err)
		else
			local value
			for line in fp:lines() do
				value = line
				if value then
					fp:close()
					return value
				end
			end
			fp:close()
		end
	end
	
	if option then
		os.execute("nvrammanager  -r /tmp/productinfo -p  product-info  >/dev/null 2>&1")
		fp,err = io.open("/tmp/productinfo",'r')
		
		if fp == nil then
			debug.printf(err)
		else
			local value
			for line in fp:lines() do
				value = string.match(line, string.format("%s:(.+)", option))
				if value then
					fp:close()
					return value
				end
			end
			fp:close()
		end

	end
	
	return nil

end

function reload_profile()
	debug.printf("reloadprofile() begin")
	os.execute("nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1")
	local filesize = fs.stat("/tmp/reload-profile.cry").size
	if filesize == 0 then
		os.execute("rm -f /tmp/reload-profile.cry >/dev/null 2>&1")
		os.execute("nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1")
	end
	local cry = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/reload-profile.cry", "/tmp/reload-profile.xml")
	local file, err = io.open("/tmp/reload-profile.xml", 'r')

    if file == nil then
        debug.printf(err)

	elseif file:read(6) == '<?xml 'then
		file:close()
		os.execute("rm -rf /etc/profile.d >/dev/null 2>&1")
		local ret = xmlToFile("/tmp/reload-profile.xml", "/etc")
		if ret == false then
			os.execute("rm -f /tmp/reload-profile.xml /tmp/reload-profile.cry >/dev/null 2>&1")
			os.execute("nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1")
			local cry = require "luci.model.crypto"
			cry.dec_file_entry("/tmp/reload-profile.cry", "/tmp/reload-profile.xml")
			os.execute("rm -rf /etc/profile.d >/dev/null 2>&1")
			xmlToFile("/tmp/reload-profile.xml", "/etc")
		end
		os.execute("chmod -R 444 /etc/profile.d >/dev/null 2>&1")
	else
		file:close()
		os.execute("rm -f /tmp/reload-profile.xml /tmp/reload-profile.cry >/dev/null 2>&1")
		os.execute("nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1")
		local cry = require "luci.model.crypto"
		cry.dec_file_entry("/tmp/reload-profile.cry", "/tmp/reload-profile.xml")
		local file, err = io.open("/tmp/reload-profile.xml", 'r')
		if file == nil then
			debug.printf(err)
		elseif file:read(6) == '<?xml ' then
			file:close()
			os.execute("rm -rf /etc/profile.d >/dev/null 2>&1")
			local ret = xmlToFile("/tmp/reload-profile.xml", "/etc")
			if ret == false then
				os.execute("rm -f /tmp/reload-profile.xml /tmp/reload-profile.cry >/dev/null 2>&1")
				os.execute("nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1")
				local cry = require "luci.model.crypto"
				cry.dec_file_entry("/tmp/reload-profile.cry", "/tmp/reload-profile.xml")
				os.execute("rm -rf /etc/profile.d >/dev/null 2>&1")
				xmlToFile("/tmp/reload-profile.xml", "/etc")
			end
			os.execute("chmod -R 444 /etc/profile.d >/dev/null 2>&1")
		else
			file:close()
			debug.printf("error no profile")
		end
	end
	
	os.execute("rm -f /tmp/reload-profile.xml /tmp/reload-profile.cry >/dev/null 2>&1")
	debug.printf("reloadprofile() end")
end

function get_config(line, filename)
    local ret
    local uci_r = uci.cursor()
    if type(line) ~= "string" then return nil end
    head = line:sub(1,6)
    if head ~= "config" then return nil end
    local config_pos = string.find(line, "\'")
    if config_pos == nil then
        cfg_name = string.sub(line, 8, -1)
        ret = uci_r:get_first(filename, cfg_name, nil, nil)
    else
        ret = string.sub(line, config_pos+1, -2)
    end
    return ret
end

function get_option(line)
    local opt_name, opt_value, i, j
    if type(line) ~= "string" then return nil, nil end
    i, j = string.find(line, "option")
    if i == nil or j == nil then return nil, nil end
    local opt_pos = string.find(line, "\'")
    opt_name = string.sub(line, j+2, opt_pos-2)
    opt_value = string.sub(line , opt_pos+1, -2)
    return opt_name, opt_value
end

function merge_country_config(country)
	local uci_r = uci.cursor()
    local cmd = "ls /tmp/merge/"..country
    local s = io.popen(cmd)
    local fileLists = s:read("*all")
    local start_pos = 0
    local end_pos = 0
    while true do
        end_pos = string.find(fileLists, "\n", start_pos)
        if end_pos == nil then break end
        local filename = string.sub(fileLists, start_pos, end_pos-1)
        local file, err = io.open("/tmp/merge/" ..country.."/".. filename, "r")
        if file == nil then debug.printf(err) end
        for line in file:lines() do
            if line:sub(1,6) == "config" then
                config_name = get_config(line, filename)
            elseif line ~= "nil" then
                option_name, option_value = get_option(line)
                if config_name ~= nil and option_name ~= nil and option_value ~= nil then
                    uci_r:set(filename, config_name, option_name, option_value)
                end
            end
        end
        uci_r:commit(filename) --遍历一个文件提交一次，写一次flash
        io.close(file)

        start_pos = end_pos + 1
    end
end

function set_SSID(form)
    local sys = require "luci.sys"
    local uci_r = uci.cursor()
    local cmd = "network_get_firm ".. form
    local wan_mac = sys.exec(cmd)
    wan_mac = wan_mac:upper()
    local mac5,mac6=wan_mac:match('(..)-(..)%c$')
    local suffix = mac5 .. mac6
    local wlan = require "luci.model.wireless"
    local ap = wlan.Apcfg("wps_pin", {"wps_label", "wps_pin"})
    local driver = ap:scan_driver()
    
    local wireless_iface = {}
    wireless_iface.hst2g = driver[2][1]
    wireless_iface.hst5g = driver[3][1]
    wireless_iface.gst2g = driver[5][1]
    wireless_iface.gst5g = driver[7][1]
    
    local support_triband = uci_r:get_profile("wireless","support_triband") or "no"
    local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
    if support_triband == "yes" then
        if support_6g == "yes" then
            wireless_iface.hst6g = driver[73][1]
            wireless_iface.gst6g = driver[79][1]
        else
            wireless_iface.hst52_g = driver[31][1]
            wireless_iface.gst52_g = driver[37][1]
        end
    end
    
    local hst_prefix
    local gst_prefix   	
    local suffix_5g  = "_5G"
    local suffix_52_g  = "_52G"
    local suffix_6g  = "_6G"
    local TPLink = uci_r:get_profile("tplink","TPLINK_TPLink") or "no"
    if TPLink == "yes" then   
		hst_prefix = "TP-Link_"
		gst_prefix = "TP-Link_GUEST_"
	else
		hst_prefix = "TP-LINK_"
		gst_prefix = "TP-LINK_GUEST_"	
	end
    
    for k, v in pairs(wireless_iface) do
        local ssid
        if k:find("hst") ~= nil then
            if k:find("6g") ~= nil then
                ssid = hst_prefix .. suffix .. suffix_6g
            elseif k:find("52_g") ~= nil then
                ssid = hst_prefix .. suffix .. suffix_52_g
            elseif k:find("5g") ~= nil then
                ssid = hst_prefix .. suffix .. suffix_5g
            else
                ssid = hst_prefix .. suffix
            end
        else
            if k:find("6g") ~= nil then
                ssid = hst_prefix .. suffix .. suffix_6g
            elseif k:find("52_g") ~= nil then
                ssid = gst_prefix .. suffix .. suffix_52_g
            elseif k:find("5g") ~= nil then
                ssid = gst_prefix .. suffix .. suffix_5g
            else
                ssid = gst_prefix .. suffix
            end
        end
        uci_r:set("wireless", v, "ssid", ssid)
    end
    uci_r:commit("wireless")
end
    
function get_default_config(country)
	local uci_r = uci.cursor()
    local cmd = "ls /tmp/merge/"..country
    local s = io.popen(cmd)
    local fileLists = s:read("*all")
    local start_pos = 0
    local end_pos = 0
    local default_config = {}
    while true do
        end_pos = string.find(fileLists, "\n", start_pos)
        if end_pos == nil then break end
        local filename = string.sub(fileLists, start_pos, end_pos-1)
        local file, err  = io.open("/tmp/merge/" ..country.."/".. filename, "r")
        if file == nil then debug.printf(err) end
        default_config[filename]={}
        for line in file:lines() do
            if line:sub(1,6) == "config" then
                config_name = get_config(line, filename)
                default_config[filename][config_name]={}
            elseif line ~= "nil" then
                option_name, option_value = get_option(line)
                if config_name ~= nil and option_name ~= nil and option_value ~= nil then
                    default_config[filename][config_name][option_name]=option_value
                end
            end
        end
        io.close(file)

        start_pos = end_pos + 1
    end
    return default_config
end

function revert_country_config(country)
	local uci_r = uci.cursor()
    local cmd = "ls /tmp/merge/"..country
    local s = io.popen(cmd)
    local fileLists = s:read("*all")
    local start_pos = 0
    local end_pos = 0
    local default_config = {}
    default_config = get_default_config("UN")
    while true do
        end_pos = string.find(fileLists, "\n", start_pos)
        if end_pos == nil then break end
        local filename = string.sub(fileLists, start_pos, end_pos-1)
        local file, err  = io.open("/tmp/merge/" ..country.."/".. filename, "r")
        if file == nil then debug.printf(err) end
        for line in file:lines() do
            if line:sub(1,6) == "config" then
                config_name = get_config(line, filename)
            elseif line ~= "nil" then
                option_name, option_value = get_option(line)
                if config_name ~= nil and option_name ~= nil and option_value ~= nil then
                    uci_r:set(filename, config_name, option_name, default_config[filename][config_name][option_name])
                end
            end
        end
        io.close(file)

        start_pos = end_pos + 1
    end
    return default_config
end

function reload_country_profile(merge_dir)
    local uci_r = uci.cursor()  
    local country = getsysinfo("country")    
    if fs.isdirectory (merge_dir ..country) then
        debug.printf("===== reload profile of country " .. country .. " begin ====")
        -- restore profile in default
		luci.sys.call("cp " .. merge_dir .. "config/profile /etc/config/ >/dev/null 2>&1")		
        -- merge profile
        local profile_config = fs.dir(merge_dir ..country.."/")        
        for _, config_name in pairs(profile_config or {}) do
            if config_name == "profile" then                
                if fs.isfile("/etc/config/" .. config_name) == false then
                    luci.sys.call("touch /etc/config/" .. config_name)                    
                end

                local all_sections = load_old_config(merge_dir ..country.."/", config_name)
                for section_name, options in pairs(all_sections or {}) do
                    if type(options) == "table" and options[".anonymous"] then
                        section_name = uci_r:add(config_name, options[".type"])                        
                    elseif not uci_r:get(config_name, section_name) then
                        uci_r:set(config_name, section_name, options[".type"])                        
                    end

                    for name, value in pairs(options or {}) do
                        if not name:find("^%.") then 
                            if uci_r:get(config_name, section_name, name) ~= value then
                                uci_r:set(config_name, section_name, name, value)                                
                            end
                        end
                    end
                end
            end
        end
        uci_r:commit("profile")
        debug.printf("===== reload profile of country " .. country .. " end ====")
    end    
end

function merge_config_by_country(old_country)
	debug.printf("mergeconfigbycountry() begin")
	local uci_r = uci.cursor()
    local country_merged = uci_r:get("locale","sysinfo","country")
    local country = getsysinfo("country")
    local merge_all = false
    if not country then
        debug.printf("no country in productinfo")
        debug.printf("mergeconfigbycountry() do nothing end")
        return
    elseif not country_merged or old_country then
        merge_all = true
    else
        debug.printf("user has set country, to check profile")
    end
    
    os.execute("mkdir /tmp/merge >/dev/null 2>&1")
    local mode = uci_r:get("sysmode", "sysmode", "mode")
	if mode == 'ap' then
		os.execute("nvrammanager -r /tmp/merge-conf.cry -p ap-def-config >/dev/null 2>&1")
	else
		os.execute("nvrammanager -r /tmp/merge-conf.cry -p default-config >/dev/null 2>&1")
	end
	--os.execute("nvrammanager -r /tmp/merge-conf.cry -p default-config >/dev/null 2>&1")
	local cry = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/merge-conf.cry", "/tmp/merge-conf.xml")
	local file, err = io.open("/tmp/merge-conf.xml", 'r')
	if file == nil then
		debug.printf(err)
	elseif file:read(6) == '<?xml 'then
		file:close()
		os.execute("rm -rf /tmp/merge/* >/dev/null 2>&1")
		local ret = xmlToFile("/tmp/merge-conf.xml", "/tmp/merge")
    end
    
    if old_country ~= "no_country" and old_country ~= nil then
        revert_country_config(old_country)
    end
    if merge_all then
    	merge_country_config(country)
    else
    	reload_country_profile("/tmp/merge/")
    end
	os.execute("rm -rf /tmp/merge >/dev/null 2>&1")
    if country == "PL" then
        set_SSID("wan")
    end
	debug.printf("mergeconfigbycountry() end")
end

function merge_onemesh_config()
    local uci_r = uci.cursor()
    local onemesh_merge_needed = false
    local nrd_merge_needed = false

    local support_smart_connect = uci_r:get_profile("wireless","smart_connect") or "no"
    if support_smart_connect == "yes" then
        debug.printf("support smart connect")

        local smart_enable = uci_r:get("wireless", "smart", "smart_enable")
        if smart_enable == nil then
            debug.printf("smart connect config does exsit")
            
            uci_r:section("wireless", "smart-connect", "smart", {
                smart_enable = "off"
            })
            uci_r:commit("wireless")
        end
    end

    local support_onemesh = uci_r:get_profile("onemesh","onemesh_support") or "no"
    if support_onemesh == "no" then
        debug.printf("Does not support onemesh, just return")
        return
    end

    if not nixio.fs.access("/etc/config/onemesh") then
        debug.printf("config not found: onemesh")
        onemesh_merge_needed = true
    end

    if not nixio.fs.access("/etc/config/nrd") then
        debug.printf("config not found: nrd")
        nrd_merge_needed = true
    end

    if onemesh_merge_needed == false and nrd_merge_needed == false then
        debug.printf("Already merged, no need to merge now")
        return
    end

    debug.printf("merge onemesh config start...")

    os.execute("mkdir /tmp/merge >/dev/null 2>&1")
    os.execute("nvrammanager -r /tmp/default-config.cry -p  default-config  >/dev/null 2>&1")
    
    local cry  = require "luci.model.crypto"
	cry.dec_file_entry("/tmp/default-config.cry", "/tmp/default-config.xml >/dev/null 2>&1")
    local file,err = io.open("/tmp/default-config.xml",'r')
    if file == nil then
        debug.printf(err)
    elseif file:read(6) == '<?xml 'then
        file:close()
        os.execute("rm -rf /tmp/merge/* >/dev/null 2>&1")
        local ret = xmlToFile("/tmp/default-config.xml", "/tmp/merge")
    end

    if onemesh_merge_needed == true then
        os.execute("cp /tmp/merge/config/onemesh /etc/config >/dev/null 2>&1")
        os.execute("cp /tmp/merge/config/onemesh_client /etc/config >/dev/null 2>&1")
        uci_r:commit("onemesh")
        uci_r:commit("onemesh_client")
    end

    if nrd_merge_needed == true then
        os.execute("cp /tmp/merge/config/nrd /etc/config >/dev/null 2>&1")
        uci_r:commit("nrd")
    end

    debug.printf("merge onemesh config end")
    return
end

function remodel_ap_merge()
    local uci_r = uci.cursor()
    local cry   = require "luci.model.crypto"
    local country = getsysinfo("country")

    local remodel_name = nil
    local remodel_ver = nil
    local remodel_enable = uci_r:get_profile("remodel_switch", "enable") or "no"

    if remodel_enable == "no" then
        return
    end

	debug.printf("merge remodel info to ap mode begin")
	remodel_name, remodel_ver = get_remodel_para()
    os.execute("nvrammanager -r /tmp/reset-defconfig.cry -p ap-def-config >/dev/null 2>&1")
    cry.dec_file_entry("/tmp/reset-defconfig.cry", "/tmp/reload-userconf.xml")
    uci_r:remodel(remodel_name, remodel_ver, "/tmp/reload-userconf.xml", country)

    --uci_r:reset_merge_local("/tmp/reload-userconf.xml", country)

    cry.enc_file_entry("/tmp/reload-userconf.xml", "/tmp/reset-defconfig.cry")
    os.execute("nvrammanager -w /tmp/reset-defconfig.cry -p user-config >/dev/null 2>&1")
    os.execute("nvrammanager -w /tmp/reset-defconfig.cry -p ap-config >/dev/null 2>&1")
    os.execute("rm -f /tmp/reset-defconfig.cry /tmp/reload-userconf.xml >/dev/null 2>&1")

    debug.printf("merge remodel info to ap mode end")
end
