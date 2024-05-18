--[[
Copyright(c) 2018 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  onemesh.lua
Details :  onemesh
Author  :  Cai Chenyu <caichenyu@tp-link.com.cn>
Version :  1.0.0
Date    :  09 Jun, 2018
]]--

module ("luci.controller.admin.onemesh", package.seeall)

local ctl      = require "luci.model.controller"

local nixio     = require "nixio"
local dbg       = require "luci.tools.debug"
local crypto    = require "luci.model.crypto"

local uci_r     = require("luci.model.uci").cursor()
local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
local sys       = require "luci.sys"
local dtypes   = require "luci.tools.datatypes"
local timeset   = require "luci.controller.admin.timesetting"
local uuid = require "luci.model.uuid"
local json = require "luci.json"
local wlan  = require "luci.model.wireless"
local one_mesh = require "luci.model.one_mesh"

local TMPKEY  = "1234567890abcdefonemesh    "

local ONEMESH  = "onemesh"
local TMP_ACCOUNT = "tmp_account"
local ONEMESH_PRI_SYNC = "onemesh_pri_sync"
local WIFI_IFACE = "wifi-iface"

local RE_2G = uci_r:get_profile("wireless", "wireless_mesh_ifname_2g") or "wl14"
local RE_5G = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g") or "wl04"

local ONEMESH_CLIENT = "onemesh_client"
local DEVICE_CFG_NAME = "device"

local ONEMESH_MASTER_RSA_PUB = "/tmp/onemesh_master_rsa_pub"
local ONEMESH_SYNC_WIFI_TMP_JSON="/tmp/onemesh_sync_wifi_tmp_json"

local onmesh_rsapub_lock = "/var/run/onmesh_rsapub.lck"
local onmesh_rsapub_lock_fd

local function lock(w)
    onmesh_rsapub_lock_fd = nixio.open(onmesh_rsapub_lock, "w", 600)
    onmesh_rsapub_lock_fd:flock(w and "ex" or "sh")
end

local function unlock()
    onmesh_rsapub_lock_fd:close()
    onmesh_rsapub_lock_fd = nil
end

--- Encrypt the password by using AES algorithm.
-- @param  password    Password to be encrypted. 
-- @return             String after encrypted (in base64 format).
local function aes_encrypt(password)
    if not password then 
        return false 
    end
    
    local pwd = crypto.onemesh_enc(password, TMPKEY, true)
    local tmp = pwd()
    local pwd_str = ""
    while tmp do
        pwd_str = pwd_str .. tmp
        tmp = pwd()
    end
    return nixio.bin.b64encode(pwd_str)
end

--- Decrypt the password by using AES algorithm.
-- @param  password    Password to be decrypted (in base64 format). 
-- @return             String after decrypted.
local function aes_decrypt(password)
    if not password then
        return false 
    end

    local pwd_str = ""
    local binpwd = nixio.bin.b64decode(password)
    if crypto.crypt_used_openssl() then
        local pwd = crypto.onemesh_dec(binpwd, TMPKEY, true)
        local tmp = pwd()
        while tmp do
            pwd_str = pwd_str .. tmp
            tmp = pwd()
        end
    else
        pwd_str = crypto.wolfssl_enc_dec(binpwd, false)
    end
    return pwd_str
end


local function slave_generate_slave_key()
    luci.sys.exec("openssl genrsa -out /tmp/onemesh_rsa_private_key.pem 64")
    local f = io.open("/tmp/onemesh_rsa_private_key.pem", "r")
    local buf = f:read("*a")
    f:close()   
    local tmp_buf = buf:match("%-+BEGIN RSA PRIVATE KEY%-+%s+([%w%p]+)%s+") 
    tmp_buf = tmp_buf:sub(1, 63)
    -- dbg.print("buf is " .. buf)    
    -- dbg.print("account is " .. tmp_buf)
    local enc_usr = aes_encrypt(tmp_buf)

    luci.sys.exec("openssl genrsa -out /tmp/onemesh_rsa_private_key.pem 64")
    local f = io.open("/tmp/onemesh_rsa_private_key.pem", "r")
    local buf = f:read("*a")
    f:close()   
    local tmp_buf = buf:match("%-+BEGIN RSA PRIVATE KEY%-+%s+([%w%p]+)%s+") 
    tmp_buf = tmp_buf:sub(1, 63)
    -- dbg.print("buf is " .. buf)
    -- dbg.print("password is " .. tmp_buf)
    local enc_pwd = aes_encrypt(tmp_buf)

    uci_r:section(ONEMESH, TMP_ACCOUNT, ONEMESH_PRI_SYNC, {
        username = enc_usr,
        password = enc_pwd
    })
    uci_r:commit(ONEMESH)
    return true
end

local function slave_get_slave_key()
    local data = {}

    local enc_usr = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "username")
    local enc_pwd = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "password")

    if nil == enc_usr or  "" == enc_usr or nil == enc_pwd or "" == enc_pwd then
        slave_generate_slave_key()
        enc_usr = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "username")
        enc_pwd = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "password")        
    end

    local pla_usr = aes_decrypt(enc_usr)
    local pla_pwd = aes_decrypt(enc_pwd)

    if pla_usr and pla_pwd then
        data = {
            username = pla_usr,
            password = pla_pwd
        }
    end

    -- dbg.dumptable(data)
    return data
end

function master_get_slave_key(mac)
    local pla_usr = false
    local pla_pwd = false
    local data = {}

    uci_r:foreach(ONEMESH_CLIENT, DEVICE_CFG_NAME,
        function(section)
                if (section["mac"] == mac) then
                    pla_usr = aes_decrypt(section["tmp_username"])
                    pla_pwd = aes_decrypt(section["tmp_password"])
                end
        end
    )

    if pla_usr and pla_pwd then
        data = {
            tmp_username = pla_usr,
            tmp_password = pla_pwd
        }
    end
    return data
end

function master_set_slave_key(mac, username, password, want_to_join)
    local sname

    uci_r:foreach(ONEMESH_CLIENT, DEVICE_CFG_NAME,
        function(section)
            if section["mac"] and section["mac"] == mac then
                sname = section[".name"]
            end
        end
    )

    local enc_usr = aes_encrypt(username)
    local enc_pwd = aes_encrypt(password)

    uci_r:section(ONEMESH_CLIENT, DEVICE_CFG_NAME, sname, {
        mac = mac,
        tmp_username = enc_usr,
        tmp_password = enc_pwd,
        joined = want_to_join,
    })
    uci_r:commit(ONEMESH_CLIENT)

    return true
end

function master_get_rsa_pub_key()
    local data = {}
    data = asycrypto.read_pubkey()
    return data
end

function slave_store_rsa_pub_key(http_form)
    if http_form.n == nil or http_form.e == nil then
        return false
    end

    lock(true)
    local f = io.open(ONEMESH_MASTER_RSA_PUB, "w")
    f:write("n=",http_form.n,"\n","e=",http_form.e,"\n")
    f:close()
    unlock()  
    return true 
end

local function slave_fetch_rsa_pub_key()
    local tmp_n = ""
    local tmp_e = ""
    local data = {}

    lock()
    local f = io.open(ONEMESH_MASTER_RSA_PUB, "r")
    local buf = f:read("*a")
    f:close()
    unlock() 

    tmp_n, tmp_e = buf:match("n=([%w%p]+)%s+e=([%w%p]+)%s*")
    data = {
        n = tmp_n, 
        e = tmp_e
    }

    -- dbg.dumptable(data)
    return data
end

local function rsa_enc_slave_key(username, password, n, e)
    local pubkey = {}
    local data = {}
    pubkey.n = n
    pubkey.e = e

    local enc_usr = asycrypto.encrypt(username, pubkey)
    local enc_pwd = asycrypto.encrypt(password, pubkey)

    data = {
        enc_tmp_username = enc_usr,
        enc_tmp_password = enc_pwd
    }

    -- dbg.dumptable(data)
    return data
end

function slave_offer_enc_slave_key()
    local data= {}

    local rsapub = slave_fetch_rsa_pub_key()
    local slave_key = slave_get_slave_key()
    data = rsa_enc_slave_key(slave_key.username, slave_key.password, rsapub.n, rsapub.e)

    -- dbg.dumptable(data)
    return data
end

local function rsa_dec_slave_key(enc_usr, enc_pwd)
    local pla_usr = asycrypto.decrypt(enc_usr)
    local pla_pwd = asycrypto.decrypt(enc_pwd)

    data = {
        tmp_username = pla_usr,
        tmp_password = pla_pwd
    }

    -- dbg.dumptable(data)
    return data
end

function master_accept_enc_slave_key(http_form)
    if http_form.mac == nil or http_form.enc_usr == nil or http_form.enc_pwd == nil 
       or http_form.want_to_join == nil then
        return false
    end

    if http_form.want_to_join ~= "1" and http_form.want_to_join ~= "0" then
        -- dbg.print("invalid data, http_form.want_to_join " .. http_form.want_to_join)
        return false;
    end 

    local slave_key = rsa_dec_slave_key(http_form.enc_usr, http_form.enc_pwd)

    return master_set_slave_key(http_form.mac, slave_key.tmp_username, slave_key.tmp_password,
                                http_form.want_to_join)
end

function master_decrypt_enc_slave_key(http_form)
    if http_form.enc_usr == nil or http_form.enc_pwd == nil then
        return false
    end
    local slave_key = rsa_dec_slave_key(http_form.enc_usr, http_form.enc_pwd)
    return slave_key
end

function master_generate_group_id()
    local group_id_random = uuid.generate_random()

    uci_r:section(ONEMESH, ONEMESH, ONEMESH, {
        group_id = group_id_random
    })
    uci_r:commit(ONEMESH)
end

function generate_random_string(length)
    local randomNum  = 0
    local seed = tostring(os.time())
    local rnd  = io.open("/dev/urandom", "rb")
    local characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    local randomString = ""

    if rnd then
        seed = rnd:read(3)
        rnd:close()
    end

    for i = 1, 3 do
        randomNum = randomNum * 256 + string.byte(seed, i)
    end

    math.randomseed(randomNum)

    for j = 1, length do
        randomNum = math.random(62)
        randomString = randomString .. characterSet:sub(randomNum,randomNum)
    end

    -- dbg.print("randomString is " .. randomString)
    return randomString
end

function master_generate_backhaul_wcfg()
    local rssid 
    local rpkey

    rssid = generate_random_string(30)
    rpkey = generate_random_string(30)
    uci_r:section(ONEMESH, WIFI_IFACE, RE_2G, {
        ssid = rssid,
        psk_key = rpkey
    })

    rssid = generate_random_string(30)
    rpkey = generate_random_string(30)
    uci_r:section(ONEMESH, WIFI_IFACE, RE_5G, {
        ssid = rssid,
        psk_key = rpkey
    })

    local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
    if support_triband == "yes" then
        local RE_5G2 = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g_2") or "wl24"
        rssid = generate_random_string(30)
        rpkey = generate_random_string(30)
        uci_r:section(ONEMESH, WIFI_IFACE, RE_5G2, {
	    ssid = rssid,
	    psk_key = rpkey
        })
    end

    uci_r:commit(ONEMESH)
end

function get_onemesh_info()
    local data = {}

    local tmp_group_id = uci_r:get(ONEMESH, ONEMESH, "group_id")

    if nil == tmp_group_id or  "" == tmp_group_id then
        tmp_group_id = "-1"   
    end

    local tmp_role = uci_r:get(ONEMESH, ONEMESH, "role")

    local tmp_slave_auto_attach_needed = uci_r:get(ONEMESH, ONEMESH, "slave_auto_attach_needed")
    if nil == tmp_slave_auto_attach_needed or "" == tmp_slave_auto_attach_needed then
        tmp_slave_auto_attach_needed = "1"
    end

    local tmp_slave_auto_join_needed = uci_r:get(ONEMESH, ONEMESH, "slave_auto_join_needed")
    if nil == tmp_slave_auto_join_needed or "" == tmp_slave_auto_join_needed then
        tmp_slave_auto_join_needed = "1"
    end

    local tmp_master_auto_probe_needed = uci_r:get(ONEMESH, ONEMESH, "master_auto_probe_needed")
    if nil == tmp_master_auto_probe_needed or "" == tmp_master_auto_probe_needed then
        tmp_master_auto_probe_needed = "1"
    end

    if tmp_group_id and tmp_role then
        data = {
            group_id = tmp_group_id,
            role = tmp_role,
            slave_auto_attach_needed = tmp_slave_auto_attach_needed,
            slave_auto_join_needed = tmp_slave_auto_join_needed,
            master_auto_probe_needed = tmp_master_auto_probe_needed
        }
    end

    return data
end

function onemesh_set_role(http_form)
    if "master" ~= http_form.role and "slave" ~= http_form.role then
        return false
    end

    uci_r:section(ONEMESH, ONEMESH, ONEMESH, {
        role = http_form.role
    })
    uci_r:commit(ONEMESH)
    return true
end

function onemesh_set_group_id(http_form)
    if http_form.group_id == nil then
        return false
    end

    uci_r:section(ONEMESH, ONEMESH, ONEMESH, {
        group_id = http_form.group_id
    })
    uci_r:commit(ONEMESH)
    return true
end

function onemesh_set_slave_attach(http_form)
    if http_form.slave_auto_attach_needed == nil or http_form.setJoin == nil then
        return false
    end

    if http_form.setJoin == "1" and http_form.slave_auto_join_needed == nil then
        return false
    end

    -- dbg.print("onemesh_set_slave_attach")
    -- dbg.dumptable(http_form)

    if http_form.setJoin == "1" then
        uci_r:section(ONEMESH, ONEMESH, ONEMESH, {
            slave_auto_attach_needed = http_form.slave_auto_attach_needed,
            slave_auto_join_needed = http_form.slave_auto_join_needed
        })
    else
        uci_r:section(ONEMESH, ONEMESH, ONEMESH, {
            slave_auto_attach_needed = http_form.slave_auto_attach_needed
        })
    end

    uci_r:commit(ONEMESH)
    return true
end

function slave_mac_info_func(http_form)
    local tmp_exist  = false
    local tmp_joined = "0"
    local pla_usr = false
    local pla_pwd = false
    local usr_pwd_invalid = false

    local data = {}

    if http_form.slaveMac == nil then
        return false
    end

    uci_r:foreach(ONEMESH_CLIENT, DEVICE_CFG_NAME,
        function(section)
                if section["mac"] == http_form.slaveMac then
                    tmp_exist = true
                    if section["joined"] == "1" then
                        tmp_joined = "1"
                    end

                    pla_usr = aes_decrypt(section["tmp_username"])
                    pla_pwd = aes_decrypt(section["tmp_password"])                    
                end
        end
    )

    if nil == pla_usr or false == pla_usr or nil == pla_pwd or false == pla_pwd then
        -- dbg.print("username or password is nil")
        usr_pwd_invalid = true
    end
  
    if true == tmp_exist then

        if false == usr_pwd_invalid then
            data = {
                exist = "1",
                joined = tmp_joined,
                tmp_username = pla_usr,
                tmp_password = pla_pwd,           
            }
        else
            data = {
                exist = "1",
                joined = tmp_joined,          
            }
        end
    else
        data = {
            exist = "0",
            joined = tmp_joined,
        }
    end 

    -- dbg.dumptable(data)
    return data
end


function set_mainTrans_wcfg_flag_func(http_form)
    if http_form.mac == nil or http_form.mainWCfgTransNeeded == nil then
        return false
    end

    local sname

    uci_r:foreach(ONEMESH_CLIENT, DEVICE_CFG_NAME,
        function(section)
            if section["mac"] and section["mac"] == http_form.mac then
                sname = section[".name"]
            end
        end
    )

    uci_r:section(ONEMESH_CLIENT, DEVICE_CFG_NAME, sname, {
        mac = http_form.mac,
        mainWCfgTransNeeded = http_form.mainWCfgTransNeeded
    })
    uci_r:commit(ONEMESH_CLIENT)

    return true
end

function get_password_strictly_with_name(username)
    -- dbg.print("get_password_strictly username ".. username)

    local enc_usr = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "username")
    local enc_pwd = uci_r:get(ONEMESH, ONEMESH_PRI_SYNC, "password")

    if nil == enc_usr or nil == enc_pwd then
        return false
    end

    local pla_usr = aes_decrypt(enc_usr)
    local pla_pwd = aes_decrypt(enc_pwd)

    if nil == pla_usr or false == pla_usr or nil == pla_pwd or false == pla_pwd then
        return false
    end

    if username == pla_usr then
        return pla_pwd
    end
    return false
end

function get_dev_info(form) 
    local dev_info = {}

    dev_info.deviceModel = sys.exec("getfirm MODEL") or ""
    dev_info.deviceMac = sys.exec("getfirm MAC") or ""
    dev_info.deviceType = uci_r:get_profile("global", "device_type") or "WirelessRouter"
    
    return dev_info
end

-- FOR WIRELESS INFO --
function wireless_status_all(formvalue)
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
	local form = {}
	if support_triband == "no" then
        form = {"wireless_2g", "wireless_5g"}
    else
        if support_6g == "yes" then
            form = {"wireless_2g", "wireless_5g", "wireless_6g"}
        else
            form = {"wireless_2g", "wireless_5g", "wireless_5g_2"}
        end
    end
    return wlan.Apcfg(form):read()
end

function sync_wifi_specified(http_form)
    if http_form.mac == nil then
        return false
    end

    if not dtypes.macaddr(http_form.mac:gsub("%-", ":")) then
        -- dbg.printf("mac error: " .. http_form.mac)
        return false
    end

	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
    local status_all = wireless_status_all()
    if not status_all or type(status_all) ~= "table" then
        dbg.print("cannot get the wireless status")
		if support_triband == "no" then
			status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1}
		else
			status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1, ["wireless_5g_2_current_channel"]=-1}
		end
    end

    local wifi_data = {}
    local ifname_2g = uci_r:get_profile("wireless", "wireless_ifname_2g") or "wl11"
    local ifname_5g = uci_r:get_profile("wireless", "wireless_ifname_5g") or "wl01"
    local wifi_24g  = uci_r:get_all("wireless", ifname_2g)
    local wifi_5g   = uci_r:get_all("wireless", ifname_5g)
    local wifi_24g_disabled = uci_r:get("wireless", wifi_24g.device, "disabled") or "off"
    local wifi_5g_disabled = uci_r:get("wireless", wifi_5g.device, "disabled") or "off"
    local tmp1 = {
        ssid = wifi_24g.ssid,
        encryption = wifi_24g.encryption,
        psk_key = wifi_24g.psk_key or "12345678",
        psk_version = wifi_24g.psk_version,
        psk_cipher = wifi_24g.psk_cipher,
        wep_mode = wifi_24g.wep_mode,
        wep_format1 = wifi_24g.wep_format1,
        wep_type1 = wifi_24g.wep_type1,
        wep_key1 = wifi_24g.wep_key1 or "1234567890",
        -- channel  = uci_r:get_all("wireless", "wifi0", "channel"),
        channel = tonumber(status_all["wireless_2g_current_channel"]),
        enable   = (wifi_24g.enable == "on" and wifi_24g_disabled ~= "on") and 1 or 0,
        hide_ssid = (wifi_24g.hidden == "on") and 1 or 0,
        backhaul_ssid = uci_r:get_all("onemesh", RE_2G, "ssid"), -- 隐藏backhaul SSID
        backhaul_key  = uci_r:get_all("onemesh", RE_2G, "psk_key")   -- 隐藏backhaul 密码
    }
    local tmp2 = {
        ssid = wifi_5g.ssid,
        encryption = wifi_5g.encryption,
        psk_key = wifi_5g.psk_key or "12345678",
        psk_version = wifi_5g.psk_version,
        psk_cipher = wifi_5g.psk_cipher,
        wep_mode = wifi_5g.wep_mode,
        wep_format1 = wifi_5g.wep_format1,
        wep_type1 = wifi_5g.wep_type1,
        wep_key1 = wifi_5g.wep_key1 or "1234567890",
        -- channel  = uci_r:get_all("wireless", "wifi1", "channel"),
        channel = tonumber(status_all["wireless_5g_current_channel"]),
        enable   = (wifi_5g.enable == "on" and wifi_5g_disabled ~= "on") and 1 or 0,
        hide_ssid = (wifi_5g.hidden == "on") and 1 or 0,
        backhaul_ssid = uci_r:get_all("onemesh", RE_5G, "ssid"),  -- 隐藏backhaul SSID
        backhaul_key  = uci_r:get_all("onemesh", RE_5G, "psk_key") -- 隐藏backhaul 密码
    }
    wifi_data["2.4G"] = tmp1
    wifi_data["5G"]   = tmp2
	if support_triband == "yes" then
		local RE_5G2 = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g_2") or "wl24"
		local ifname_5g2 = uci_r:get_profile("wireless", "wireless_ifname_5g_2") or "wl21"
		local wifi_5g2 = uci_r:get_all("wireless", ifname_5g2)
		local wifi_5g2_disabled = uci_r:get("wireless", wifi_5g2.device, "disabled") or "off"
		local tmp3 = {
			ssid = wifi_5g2.ssid,
			encryption = wifi_5g2.encryption,
			psk_key = wifi_5g2.psk_key or "12345678",
			psk_version = wifi_5g2.psk_version,
			psk_cipher = wifi_5g2.psk_cipher,
			wep_mode = wifi_5g2.wep_mode,
			wep_format1 = wifi_5g2.wep_format1,
			wep_type1 = wifi_5g2.wep_type1,
			wep_key1 = wifi_5g2.wep_key1 or "1234567890",
			-- channel  = uci_r:get_all("wireless", "wifi1", "channel"),
			channel = tonumber(status_all["wireless_5g_2_current_channel"]),
			enable   = (wifi_5g2.enable == "on" and wifi_5g2_disabled ~= "on") and 1 or 0,
			hide_ssid = (wifi_5g2.hidden == "on") and 1 or 0,
			backhaul_ssid = uci_r:get_all("onemesh", RE_5G2, "ssid"),  -- 隐藏backhaul SSID
			backhaul_key  = uci_r:get_all("onemesh", RE_5G2, "psk_key") -- 隐藏backhaul 密码
		}
		wifi_data["5G2"] = tmp3
	end
    local wifi_msg = json.encode(wifi_data)
    -- dbg.print(wifi_msg)

    os.remove(ONEMESH_SYNC_WIFI_TMP_JSON)
    local f = io.open(ONEMESH_SYNC_WIFI_TMP_JSON, "w")
    f:write(wifi_msg)
    f:close()  

    local json_object = {}
    json_object["load"] = ONEMESH_SYNC_WIFI_TMP_JSON
    json_object["timeout"] = 5
    json_object["target_id"] = http_form.mac

    local json_msg = json.encode(json_object)
    -- dbg.printf("ubus call sync sync_wifi '" .. json_msg .. "' &")
    sys.fork_call("ubus call sync sync_wifi '" .. json_msg .. "' &")

    return true
end

function sync_wifi_all()
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
    local status_all = wireless_status_all()
    if not status_all or type(status_all) ~= "table" then
        dbg.print("cannot get the wireless status")
		if support_triband == "no" then
			status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1}
		else
			status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1, ["wireless_5g_2_current_channel"]=-1}
		end
    end

    local wifi_data = {}
    local ifname_2g = uci_r:get_profile("wireless", "wireless_ifname_2g") or "wl11"
    local ifname_5g = uci_r:get_profile("wireless", "wireless_ifname_5g") or "wl01"
    local wifi_24g  = uci_r:get_all("wireless", ifname_2g)
    local wifi_5g   = uci_r:get_all("wireless", ifname_5g)
    local wifi_24g_disabled = uci_r:get("wireless", wifi_24g.device, "disabled") or "off"
    local wifi_5g_disabled = uci_r:get("wireless", wifi_5g.device, "disabled") or "off"
    local tmp1 = {
        ssid = wifi_24g.ssid,
        encryption = wifi_24g.encryption,
        psk_key = wifi_24g.psk_key or "12345678",
        psk_version = wifi_24g.psk_version,
        psk_cipher = wifi_24g.psk_cipher,
        wep_mode = wifi_24g.wep_mode,
        wep_format1 = wifi_24g.wep_format1,
        wep_type1 = wifi_24g.wep_type1,
        wep_key1 = wifi_24g.wep_key1 or "1234567890",
        -- channel  = uci_r:get_all("wireless", "wifi0", "channel"),
        channel = tonumber(status_all["wireless_2g_current_channel"]),
        enable   = (wifi_24g.enable == "on" and wifi_24g_disabled ~= "on") and 1 or 0,
        hide_ssid = (wifi_24g.hidden == "on") and 1 or 0,
        backhaul_ssid = uci_r:get_all("onemesh", RE_2G, "ssid"), -- 隐藏backhaul SSID
        backhaul_key  = uci_r:get_all("onemesh", RE_2G, "psk_key")   -- 隐藏backhaul 密码
    }
    local tmp2 = {
        ssid = wifi_5g.ssid,
        encryption = wifi_5g.encryption,
        psk_key = wifi_5g.psk_key or "12345678",
        psk_version = wifi_5g.psk_version,
        psk_cipher = wifi_5g.psk_cipher,
        wep_mode = wifi_5g.wep_mode,
        wep_format1 = wifi_5g.wep_format1,
        wep_type1 = wifi_5g.wep_type1,
        wep_key1 = wifi_5g.wep_key1 or "1234567890",
        -- channel  = uci_r:get_all("wireless", "wifi1", "channel"),
        channel = tonumber(status_all["wireless_5g_current_channel"]),
        enable   = (wifi_5g.enable == "on" and wifi_5g_disabled ~= "on") and 1 or 0,
        hide_ssid = (wifi_5g.hidden == "on") and 1 or 0,
        backhaul_ssid = uci_r:get_all("onemesh", RE_5G, "ssid"),  -- 隐藏backhaul SSID
        backhaul_key  = uci_r:get_all("onemesh", RE_5G, "psk_key") -- 隐藏backhaul 密码
    }
    wifi_data["2.4G"] = tmp1
    wifi_data["5G"]   = tmp2
	if support_triband == "yes" then
		local RE_5G2 = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g_2") or "wl24"
		local ifname_5g2 = uci_r:get_profile("wireless", "wireless_ifname_5g_2") or "wl21"
		local wifi_5g2 = uci_r:get_all("wireless", ifname_5g2)
		local wifi_5g2_disabled = uci_r:get("wireless", wifi_5g2.device, "disabled") or "off"
		local tmp3 = {
			ssid = wifi_5g2.ssid,
			encryption = wifi_5g2.encryption,
			psk_key = wifi_5g2.psk_key or "12345678",
			psk_version = wifi_5g2.psk_version,
			psk_cipher = wifi_5g2.psk_cipher,
			wep_mode = wifi_5g2.wep_mode,
			wep_format1 = wifi_5g2.wep_format1,
			wep_type1 = wifi_5g2.wep_type1,
			wep_key1 = wifi_5g2.wep_key1 or "1234567890",
			-- channel  = uci_r:get_all("wireless", "wifi1", "channel"),
			channel = tonumber(status_all["wireless_5g_2_current_channel"]),
			enable   = (wifi_5g2.enable == "on" and wifi_5g2_disabled ~= "on") and 1 or 0,
			hide_ssid = (wifi_5g2.hidden == "on") and 1 or 0,
			backhaul_ssid = uci_r:get_all("onemesh", RE_5G2, "ssid"),  -- 隐藏backhaul SSID
			backhaul_key  = uci_r:get_all("onemesh", RE_5G2, "psk_key") -- 隐藏backhaul 密码
		}
		wifi_data["5G2"] = tmp3
	end
    local wifi_msg = json.encode(wifi_data)
    -- dbg.print(wifi_msg)

    os.remove(ONEMESH_SYNC_WIFI_TMP_JSON)
    local f = io.open(ONEMESH_SYNC_WIFI_TMP_JSON, "w")
    f:write(wifi_msg)
    f:close()  

    local json_object = {}
    json_object["load"] = ONEMESH_SYNC_WIFI_TMP_JSON
    json_object["timeout"] = 5

    local ubus  = require "ubus"
    local _ubus = ubus.connect()
    _ubus:call("sync", "sync_wifi", json_object)
    _ubus:close()

    return true
end
-- FOR WIRELESS INFO END--

function do_leave_onemesh()
    local args = {}
    local re_list, _, _, _ = one_mesh.api_arrange_mesh_clients(1)

    args.operation = "unlink"

    for _, re in pairs(re_list) do
        local real_mac = ( re.mac ):gsub(":", "-"):upper()
        args.mac = real_mac
        one_mesh.manage_available_mesh_dev(args)
    end
end

function read_onemesh_settings()
    local ret = {}
    local sclist = one_mesh.get_sclient_list_all() or {}
    ret.enable = uci_r:get("onemesh", "onemesh", "enable") or "on"
    local time = uci_r:get_profile("global", "wls_reboot_time") or 20
    -- 每个RE在leave时会额外耗时6秒，加上无线重启时间。
    ret.time = #sclist*6 + time
    return ret
end

function write_onemesh_settings(http_form)
    local ret = {}
    local enable = http_form.enable

    if enable ~= nil then
        uci_r:set("onemesh", "onemesh", "enable", enable)
    else
        dbg.printf("enable is nil")
        return false
    end
    uci_r:commit("onemesh")

    ret.enable = enable or "on"
    if enable == "off" then
        sys.fork_exec("lua -e 'require(\"luci.controller.admin.onemesh\").do_leave_onemesh()';wifi onemesh")
    else
        sys.fork_exec("wifi onemesh")       
    end

    return ret
end

local dispatch_tbl = {
    onemesh_enable = {
        ["read"] = {cb=read_onemesh_settings},
        ["write"] = {cb=write_onemesh_settings}
    },
    rsa_public = {
        ["master_get"]     = {cb = master_get_rsa_pub_key},
        ["slave_store"]    = {cb = slave_store_rsa_pub_key}
    },
    slave_key = {
        ["slave_offer"]    = {cb = slave_offer_enc_slave_key},
        ["master_accept"]  = {cb = master_accept_enc_slave_key},
        ["master_decrypt"]  = {cb = master_decrypt_enc_slave_key}
    },
    slave_info = {
        ["slave_mac_info"]= {cb = slave_mac_info_func},
        ["set_mainTrans_wcfg_flag"] = {cb = set_mainTrans_wcfg_flag_func}
    },
    onemesh_info = {
        ["get_info"]       = {cb = get_onemesh_info},
        ["set_role"]       = {cb = onemesh_set_role},
        ["set_group_id"]   = {cb = onemesh_set_group_id},
        ["set_slave_attach"] = {cb = onemesh_set_slave_attach}                        
    },
    device_info = {
        ["get_dev_info"] = {cb = get_dev_info}
    },
    sync_server_cmd = {
        ["sync_wifi_specified"] = {cb = sync_wifi_specified}
    } 
}

function dispatch(http_form)
    local function hook(success, action)
        if success and action.cmd then
            if type(action.cmd) == "table" then
                for i = 1, #action.cmd - 1 do
                    sys.fork_call(action.cmd[i])
                end
                sys.fork_exec(action.cmd[#action.cmd])
            else
                sys.fork_exec(action.cmd)
            end
        end
        return true
    end

    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook})
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "onemesh"}, call("_index")).leaf = true
end
