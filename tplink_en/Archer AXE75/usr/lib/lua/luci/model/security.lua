--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  security.lua
Details :  security for wan and lan attack 
Author  :  Zhu Junjie <zhujunjie@tp-link.net>
Version :  1.0.0
Date    :  8 Nov, 2016
]]--

module("luci.model.security", package.seeall)

local nixio  = require "nixio"
local util   = require "luci.util"
local uci    = require "luci.model.uci"
local dbg    = require "luci.tools.debug"
local sys	 = require "luci.sys"

local uci_t  = uci.cursor("/tmp/tmp-device-config")
local FILE_LIST_SECURITY_RULES = "/tmp/tm-shn/list_security_rules.db"
local FILE_LIST_SECURITY_CATS  = "/tmp/tm-shn/list_security_wrs_cats.db"
local TM_SEC_RELOAD_CMD = "/etc/init.d/tm_shn_sec reload"

local function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])         
            end
        end
    end
end

local function get_security_rules_list(file)
    local version = 0
    local list = {}
    local rule_text
    local id

    local file_app_list = io.open(file, "r")
    if not file_app_list then
       return version, list
    end
    
    rule_text = file_app_list:read("*all")
    file_app_list:close()

    -- Version: 1
    _, _, version = string.find(rule_text, "^Version: (%d+)\n")
    if tonumber(version) <= 0 then
        return 0, list
    end

    -- 1049193,SHELLCODE x86 NOOP - 1
	local name
    for id, name in string.gfind(rule_text, "(%d+),([^,\n]+)\n") do
        local rule = {}
        rule.id = tonumber(id)
        rule.name = name
        list[#list + 1] = rule
    end

    return version, list
end

local function get_value_from_md5_file(file)
    local md5_value
    local md5_text

    local file_md5 = io.open(file, "r")
    if not file_md5 then
       return nil
    end

    md5_text = file_md5:read("*all")
    file_md5:close()

    _, _, md5_value = string.find(md5_text, "^(%x+)")
    
    return md5_value
end

local function set_db_file_version(old_file, new_file, gen_file, sig_version)
    local version = 0
    local rule_text
    local new_rule_text
    local id

    local file_old = io.open(old_file, "r")
    if not file_old then
       return nil
    end
    
    rule_text = file_old:read("*all")
    file_old:close()
    -- Version: 1
    _, _, version = string.find(rule_text, "^Version: (%d+)\n")
    if tonumber(version) <= 0 then
        return nil
    end

    if sig_version then
        version = tonumber(sig_version) * 1000
    end

    local file_new = io.open(new_file, "r")
    if not file_new then
       return nil
    end
    new_rule_text = file_new:read("*all")
    file_new:close()

    file_gen = io.open(gen_file, "w")
    if not file_gen then
       return nil
    end
    file_gen:write(string.format("Version: %d\n", math.floor(tonumber(version))))
    file_gen:write(new_rule_text)
    file_gen:close()

    return version
end

SECURITY_INST = util.class()
function SECURITY_INST:__init__()
    self.config = "security"
    self.history = "security_history"
    self.status = "modules_status"
    self.msb = "malicious_sites_blocking"
    self.ips = "intrusion_prevention_system"
    self.idpb = "infected_device_prevention_blocking"
    self.gi = "guard_info"
    self.uci = uci.cursor()
end

--- Get the shn device info from config file.
-- @param mac    the mac address of device you want to find.
-- @return {dev_id, dev_mac, dev_name_id, dev_type_id, dev_name, dev_type, host_name, owner_name} on
--  success where the last 4 param might be "Unknown"; {"dev_id"=-1} will be returned on failure.
function SECURITY_INST:get_shn_dev_info_with_mac(mac)
    local dev_info = {}

    dev_info.dev_id = -1
    
    uci_t:foreach("shn_dev_info", "device",
    function(section)
        if mac == section.dev_mac then
            dev_info.dev_id = section.dev_id
            dev_info.dev_mac = section.dev_mac
            dev_info.dev_name_id = section.dev_name_id
            dev_info.dev_type_id = section.dev_type_id
            dev_info.dev_name = section.dev_name
            dev_info.dev_mac = section.dev_mac
            dev_info.host_name = section.host_name
            dev_info.owner_name = section.owner_name
        end
    end
    )
	
    return dev_info
end

function SECURITY_INST:get_info()
    local res = {}
    
    res.protected_days = tonumber(self.uci:get(self.history, self.gi, "days"))
    res.malicious_sites_blocking = 
        self.uci:get(self.config, self.status, self.msb) == "1" and "enable" or "disable"
    res.intrusion_prevention_system = 
        self.uci:get(self.config, self.status, self.ips) == "1" and "enable" or "disable"
    res.infected_device_prevention_blocking = 
        self.uci:get(self.config, self.status, self.idpb) == "1" and "enable" or "disable"

    res.is_updating = uci_t:get(self.history, self.gi, "is_updating") == "1" and true or false
    res.checked_time = tonumber(uci_t:get(self.history, self.gi, "checked_time"))
    
    return res
end

function SECURITY_INST:set_info(params)
	local msb = self.uci:get(self.config, self.status, self.msb)
	local ips = self.uci:get(self.config, self.status, self.ips)
	local idpb  = self.uci:get(self.config, self.status, self.idpb)

	if params.malicious_sites_blocking then
		msb = params.malicious_sites_blocking == "enable" and "1" or "0"
	end
	if params.intrusion_prevention_system then
		ips = params.intrusion_prevention_system == "enable" and "1" or "0"
	end
	if params.infected_device_prevention_blocking then
	idpb = params.infected_device_prevention_blocking == "enable" and "1" or "0"
	end

	self.uci:set(self.config, self.status, self.msb, msb)
	self.uci:set(self.config, self.status, self.ips, ips)
	self.uci:set(self.config, self.status, self.idpb, idpb)
	
	-- clear protected days if the user turns off all the security modules.
	if msb == "0" and ips == "0" and idpb == "0" then
		self.uci:set(self.history, self.gi, "days", "0")
	end

	self.uci:commit(self.config)
	self.uci:commit(self.history)

	sys.fork_exec(TM_SEC_RELOAD_CMD)
	
	return self:get_info()
end

function SECURITY_INST:get_history()
    local res = {}
    local hlist = {}
    local dev_info = {}

    uci_t:foreach(self.history, "history",
    function(section)
        local hentry = {}
        hentry.event_id = tonumber(section.event_id) + 1
        hentry.type = section.type
        hentry.timestamp = tonumber(section.timestamp)
        hentry.hits = tonumber(section.hits)
        dev_info = self:get_shn_dev_info_with_mac(section.mac)
        if dev_info.dev_id == -1 or dev_info.host_name == "Unknown" then
            hentry.client = section.mac
        else
            hentry.client = dev_info.host_name
        end
        if dev_info.dev_id == -1 or dev_info.owner_name == "Unknown" then
            hentry.owner = section.mac
        else
            hentry.owner = dev_info.owner_name
        end
        if section.type == "prevent" then
            hentry.attacker = section.remote
            hentry.rule_id = tonumber(section.rule_id)
        elseif section.type == "block" then
            hentry.blocked_website = section.remote
            hentry.category_id = section.rule_id
        else
            hentry.blocked_ip = section.remote
            hentry.category_id = tonumber(section.rule_id)
        end
        hlist[#hlist + 1] = hentry
    end
    )

    res = hlist
    
    return res
end

function SECURITY_INST:clear_history()
    local hlist = {}
    
    uci_t:foreach(self.history, "history",
    function(section)
        uci_t:delete(self.history, section[".name"])
    end
    )
    -- set del_id to 100, inform tm_shn to clear its list for today data.
    uci_t:set(self.history, self.gi, "del_id", {100})
    
    uci_t:rawcommit(self.history)
    
    return self:get_history()
end

function SECURITY_INST:remove_history(del_list)
    local hlist = {}
    local del_tbl = {}
    local n

    for _, n in ipairs(del_list) do
        del_tbl[#del_tbl + 1] = n - 1
        uci_t:delete(self.history, tostring(n - 1))
    end
    
	-- set the del_id list, inform tm_shn to remove them from its list for today data.
	uci_t:set(self.history, self.gi, "del_id", del_tbl)
	
	uci_t:rawcommit(self.history)
	
	return true
end

function SECURITY_INST:get_default_rule_list()
    local res = {}
    local rule_list = {}
    local version

    version, rule_list = get_security_rules_list(FILE_LIST_SECURITY_RULES)
    
	res.version = tonumber(version)
	res.rule_list = rule_list
    
    return res
end

function SECURITY_INST:get_default_cat_list()
    local res = {}
    local cat_list = {}
	local version

    version, cat_list = get_security_rules_list(FILE_LIST_SECURITY_CATS)

	res.version = tonumber(version)
	res.category_list = cat_list

    return res
end

function security_update_tm_signature()
    -- 1. check tm signature from cloud
    local cloud_tm_sig = require("cloud_req.cloud_getTmSig")
    local sig_ver, error_code = cloud_tm_sig.check_tm_sig_update()
    if not sig_ver then
        dbg.print("security_update_tm_signature: check tm sigature update failed.")
        return error_code
    end

    -- 2. check and download tm-sig
    if sig_ver.sigUpdateNeeded then
        uci_t:set("security_history", "guard_info", "is_updating", "1")
	    uci_t:rawcommit("security_history")
        local re = cloud_tm_sig.download_tm_sig_update("/tmp/cloud/downloaded_file")
        if re ~= 0 then
            dbg.print("security_update_tm_signature: download tm sigature update failed.")
        else
            local orig_md5
            local calc_md5
            -- unzip signature and check the md5.
            sys.fork_call("mkdir /tmp/tm-shn/sig_dl_files")
            sys.fork_call("mv /tmp/cloud/downloaded_file /tmp/tm-shn/sig_dl_files/new_sig.zip && \
                           unzip -oq /tmp/tm-shn/sig_dl_files/new_sig.zip -d /tmp/tm-shn/sig_dl_files/")
            sys.call("cd /tmp/tm-shn/sig_dl_files && \
                      cat *.md5 > orig_trf_md5 && \
                      md5sum *.trf > new_trf_md5 && \
                      cd - > /dev/null")
            orig_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/orig_trf_md5")
            calc_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/new_trf_md5")
            if orig_md5 and calc_md5 and orig_md5 == calc_md5 then
                -- load new signature and generate the new db files.
                sys.fork_call("cp -pf /tmp/tm-shn/sig_dl_files/*.trf /tmp/tm-shn/rule.trf && \
                               cp -pf /tmp/tm-shn/sig_dl_files/*.dat /tmp/tm-shn/ && \
                               cd /tmp/tm-shn/ && \
                               ./tdts_ctrl --op signature_loadv2 -1 rule.trf -2 rule_schema.trf > /dev/null && \
                               ./shn_ctrl -a set_meta_data -R meta_en-US.dat > /dev/null && \
                               cd - > /dev/null")
                -- set new version to db files generated with new signature.
                set_db_file_version("/tmp/tm-shn/list_pc_filter_apps.db", 
                                    "/tmp/tm-shn/bwdpi.app.db", 
                                    "/tmp/tm-shn/sig_dl_files/dl_app.db", 
                                    sig_ver.sigVersion)
                set_db_file_version("/tmp/tm-shn/list_security_rules.db", 
                                    "/tmp/tm-shn/bwdpi.rule.db", 
                                    "/tmp/tm-shn/sig_dl_files/dl_rule.db", 
                                    sig_ver.sigVersion)
                local old_db_md5
                local new_db_md5
                sys.call("md5sum /tmp/tm-shn/list_pc_filter_apps.db > /tmp/tm-shn/sig_dl_files/old_app_db_md5")
                sys.call("md5sum /tmp/tm-shn/sig_dl_files/dl_app.db > /tmp/tm-shn/sig_dl_files/new_app_db_md5")
                old_db_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/old_app_db_md5")
                new_db_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/new_app_db_md5")
                if old_db_md5 and new_db_md5 and old_db_md5 ~= new_db_md5 then
                    sys.fork_call("cp -pf /tmp/tm-shn/sig_dl_files/dl_app.db /tmp/tm-shn/list_pc_filter_apps.db")

                    -- update list_pc_filter_apps.db in /www/ for blocking page, overwrite with "cp" need to re-bind.
                    sys.fork_call("umount /www/webpages/list_pc_filter_apps.db")
                    sys.fork_call("mount --bind /tmp/tm-shn/list_pc_filter_apps.db /www/webpages/list_pc_filter_apps.db")
                end
                sys.call("md5sum /tmp/tm-shn/list_security_rules.db > /tmp/tm-shn/sig_dl_files/old_rule_db_md5")
                sys.call("md5sum /tmp/tm-shn/sig_dl_files/dl_rule.db > /tmp/tm-shn/sig_dl_files/new_rule_db_md5")
                old_db_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/old_rule_db_md5")
                new_db_md5 = get_value_from_md5_file("/tmp/tm-shn/sig_dl_files/new_rule_db_md5")
                if old_db_md5 and new_db_md5 and old_db_md5 ~= new_db_md5 then
                    sys.fork_call("cp -pf /tmp/tm-shn/sig_dl_files/dl_rule.db /tmp/tm-shn/list_security_rules.db")
                end

                -- write the TM Sig version.
                sys.call("echo %s > %s" % {sig_ver.sigVersion, cloud_tm_sig.TM_SIG_CURR_VER_FILE})
                
                -- tar and save to flash.
                sys.fork_call("date +%s > /tmp/tm-shn/sig_save_ts && \
                               cd /tmp/tm-shn && \
                               tar -zcf tm_new_sig.tgz rule.trf *.dat list_pc_filter_apps.db list_security_rules.db sig_save_ts sig_version && \
                               cd - > /dev/null && \
                               nvrammanager -e -p tm-sig && \
                               nvrammanager -w /tmp/tm-shn/tm_new_sig.tgz  -p tm-sig")
                sys.fork_call("rm -f /tmp/tm-shn/tm_new_sig.tgz")
            else
                dbg.print("security_update_tm_signature: md5 checksum failed.")
            end
            sys.fork_call("rm -rf /tmp/tm-shn/sig_dl_files/")
        end
    end

    uci_t:set("security_history", "guard_info", "is_updating", "0")
	uci_t:set("security_history", "guard_info", "checked_time", os.time())
	uci_t:rawcommit("security_history")

    return {}
end


function SECURITY_INST:tmp_get_info(app_form)
    local result = {}
    result.protected_days = tonumber(self.uci:get(self.history, self.gi, "days"))
	
    local modules_status = {}
	modules_status.malicious_sites_blocking = self.uci:get(self.config, self.status, self.msb) == "1" and true or false
    modules_status.intrusion_prevention_system = self.uci:get(self.config, self.status, self.ips)  == "1" and true or false
    modules_status.infected_device_prevention_blocking = self.uci:get(self.config, self.status, self.idpb)  == "1" and true or false
	result.modules_status = modules_status
	
	local db_update = {}
    db_update.is_updating = uci_t:get(self.history, self.gi, "is_updating")  == "1" and true or false
    db_update.checked_time = tonumber(uci_t:get(self.history, self.gi, "checked_time"))
    result.db_update = db_update
	
	local ret = {}
	ret.result = luci.json.encode(result)
	return ret
end

function SECURITY_INST:tmp_set_info(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	
	local msb = self.uci:get(self.config, self.status, self.msb)
	local ips = self.uci:get(self.config, self.status, self.ips)
	local idpb  = self.uci:get(self.config, self.status, self.idpb)
	
	local modules_status = data.modules_status
	if modules_status then
		msb = modules_status.malicious_sites_blocking == true and "1" or "0"
		ips = modules_status.intrusion_prevention_system == true and "1" or "0"
	idpb = modules_status.infected_device_prevention_blocking == true and "1" or "0"
	end

	self.uci:set(self.config, self.status, self.msb, msb)
	self.uci:set(self.config, self.status, self.ips, ips)
	self.uci:set(self.config, self.status, self.idpb, idpb)
	
	-- clear protected days if the user turns off all the security modules.
	if msb == "0" and ips == "0" and idpb == "0" then
		self.uci:set(self.history, self.gi, "days", "0")
	end

	self.uci:commit(self.config)
	self.uci:commit(self.history)

	sys.fork_exec(TM_SEC_RELOAD_CMD)
	
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function SECURITY_INST:tmp_get_history(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	
	local total = 0
	local res = {}
	local result = {}
    local res = {}
	
    local history_list = {}
    local dev_info = {}

    uci_t:foreach(self.history, "history",
    function(section)
		if total >= start_index and total < start_index + amount then
			local hentry = {}
			hentry.event_id = tonumber(section.event_id) + 1
			hentry.type = section.type
			hentry.timestamp = tonumber(section.timestamp)
			hentry.hits = tonumber(section.hits)
			dev_info = self:get_shn_dev_info_with_mac(section.mac)
			if dev_info.dev_id == -1 or dev_info.host_name == "Unknown" then
				hentry.client = nixio.bin.b64encode(section.mac)
			else
				hentry.client = nixio.bin.b64encode(dev_info.host_name)
			end
			if dev_info.dev_id == -1 or dev_info.owner_name == "Unknown" then
				hentry.owner = nixio.bin.b64encode(section.mac)
			else
				hentry.owner = nixio.bin.b64encode(dev_info.owner_name)
			end
			if section.type == "prevent" then
				hentry.attacker = section.remote
				hentry.rule_id = section.rule_id
			elseif section.type == "block" then
				hentry.blocked_website = section.remote
				hentry.category_id = section.rule_id
			else
				hentry.blocked_ip = section.remote
				hentry.category_id = section.rule_id
			end
			history_list[#history_list + 1] = hentry
		end
		total = total + 1
    end
    )
	
	result.start_index = start_index
	result.amount = #history_list
	result.sum = total
	result.history_list = history_list
	
	res.result = luci.json.encode(result)
    return res
end

function SECURITY_INST:get_db_file(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	
	local result = {}
	local tmp_rule_ver = data.security_rule_ver
	local tmp_cat_ver = data.security_cat_ver
	local rule_ver = {}
	local cat_ver = {}
	rule_ver, _ = get_security_rules_list(FILE_LIST_SECURITY_RULES)
	cat_ver, _ = get_security_rules_list(FILE_LIST_SECURITY_CATS)
	
	if tmp_rule_ver ~= rule_ver then
		sys.fork_call("cd /tmp/tm-shn && gzip -c list_security_rules.db > list_security_rules.db.gz")
	end
	if tmp_cat_ver ~= cat_ver then
		sys.fork_call("cd /tmp/tm-shn && gzip -c list_security_wrs_cats.db > list_security_wrs_cats.db.gz")
	end
	
	result.security_rule_ver = rule_ver
	result.security_rule_path = FILE_LIST_SECURITY_RULES..".gz"
	result.security_cat_ver =  cat_ver
	result.security_cat_path = FILE_LIST_SECURITY_CATS..".gz"
	
	local res = {}
	res.result = luci.json.encode(result)
    return res
end

