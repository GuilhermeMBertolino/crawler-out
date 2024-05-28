--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  crypto.lua
Details :  Crypto library. Depends on openssl-util.
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  24Apr, 2014
]]--

local sys = require "luci.sys"
local nixio = require "nixio"
local util = require "luci.util"

module("luci.model.crypto", package.seeall)

local cipher = "aes-256-cbc"

local enc_cmd = "openssl zlib -e %s | openssl " .. cipher .. " -e %s"
local dec_cmd = "openssl " .. cipher .. " -d %s %s | openssl zlib -d"
local enc_cmd_nozlib = "openssl " .. cipher .. " -e %s %s"
local dec_cmd_nozlib = "openssl " .. cipher .. " -d %s %s"
local file_opt = "-in %q"
local pwd_opt = "-k %q"
local pwdfile_opt = "-kfile /etc/secretkey"

-- dft_key/dft_iv is used for wolfssl lib, now is aes-256-cbc
local enc_nopwd_cmd = "openssl zlib -e %s | openssl " .. cipher .. " -e %s"
local dec_nopwd_cmd = "openssl " .. cipher .. " -d %s %s | openssl zlib -d"
local enc_nopwd_cmd_nozlib = "openssl " .. cipher .. " -e %s %s"
local dec_nopwd_cmd_nozlib = "openssl " .. cipher .. " -d %s %s"
local dft_key = "2EB38F7EC41D4B8E1422805BCD5F740BC3B95BE163E39D67579EB344427F7836"
local dft_iv  = "360028C9064242F81074F4C127D299F6"
local nopwd_opt = "-K " .. dft_key .. " -iv " .. dft_iv

local function build_cmd(file, pwd, nozlib, enc)
    local cmd
    if enc then
        cmd = nozlib and enc_cmd_nozlib or enc_cmd
    else
        cmd = nozlib and dec_cmd_nozlib or dec_cmd
    end
    return cmd % {file and (file_opt % file) or "",
                  pwd and (pwd_opt % pwd) or pwdfile_opt}
end

local function build_nopwd_cmd(file, nozlib, enc)
    local cmd
    if enc then
        cmd = nozlib and enc_nopwd_cmd_nozlib or enc_nopwd_cmd
    else
        cmd = nozlib and dec_nopwd_cmd_nozlib or dec_nopwd_cmd
    end
    return cmd % {file and (file_opt % file) or "", nopwd_opt}
end

function crypt_used_openssl()
    if nixio.fs.stat("/usr/bin/openssl") then
        return true
    else
        return false
    end
end

--- The iterator function returned by crypto function.
-- This function is exactly nixio.File:read without self argument.
-- See @nixio.File.read. Note that this is a case of pipes.
-- This function is as a valid LTN12 source, so, for example, call
-- luci.ltn12.pump.all(@this_function, luci.http.write) will dump all
-- the result to http.
-- @class function
-- @name crypto_result_iterator
-- @param length  (optional) amount of data to read (in Bytes). Default to 2048.
-- @return string with the characters read, or nil if it cannot read anymore.

--- Encrypt file
-- @param file    file name
-- @param nozlib  (optional) Don't compress if true.
-- @return        nil on error, or an iterator function. See @crypto_result_iterator above.
function enc_file(file, nozlib)
    if type(file) ~= "string" or #file == 0 then
        return nil
    end
    local cmd = build_nopwd_cmd(file, nozlib, true)
    return sys.ltn12_popen(cmd)
end

--- Encrypt or Decrypt file used wolfssl lib,only support aes-cbc-128/aes-cbc-192/aes-cbc-256
-- @param in_file  src file name
-- @param out_file dest file name
-- @param mode     true for enc;false for dec
-- @param key      (optional) enc key,hex format,length is 32 or 48 or 64
-- @param iv       (optional) enc iv,hex format,length must be 32
-- @param nozlib   (optional) Don't compress if true.
-- @return         true(enc OK) or false(failed)
function wolfssl_enc_dec_file(in_file, out_file, mode, key, iv, nozlib)
    if type(in_file) ~= "string" or #in_file == 0 or type(out_file) ~= "string" or #out_file == 0 then
        return false
    end

    if mode == nil then
        return false
    end

    if key == nil then
        key = dft_key
    else
        if type(key) ~= "string" or #key ~= 32 and #key ~= 48 and #key ~= 64 then
            return false
        end
    end

    if iv == nil then
        iv = dft_iv
    else
        if type(iv) ~= "string" or #iv ~= 32 then
            return false
        end
    end

    if nozlib == nil then
        nozlib = 0
    end
    
    local luarsa = require "luarsa"
    local ret = luarsa.aes_enc_file(in_file, out_file, key, iv, mode, nozlib)

    
    --if failed,create a empty out_file,because some lua files treat out_file as none-nil 
    if ret == nil then
        local file = io.open(out_file, "w")
        if file then file:close() end
    end

    return ret

end

--- Decrypt file
-- @param file    file name
-- @param nozlib  (optional) Don't compress if true.
-- @return        nil on error, or an iterator function. See @crypto_result_iterator above.
function dec_file(file, nozlib)
    if type(file) ~= "string" or #file == 0 then
        return nil
    end
    local cmd = build_nopwd_cmd(file, nozlib, false)
    return sys.ltn12_popen(cmd)
end

--- Encrypt string
-- @param buf     string to be encrypted.
-- @param pwd     (optional) password. If none, use password from /etc/secretkey.
-- @param nozlib  (optional) Don't compress if true.
-- @return        nil on error, or an iterator function. See @crypto_result_iterator above.
function enc(buf, pwd, nozlib)
    if type(buf) ~= "string" then
        return nil
    end
    local cmd = build_cmd(nil, pwd, nozlib, true)
    return sys.ltn12_popen(cmd, buf)
end

--- Decrypt string
-- @param buf     string to be decrypted.
-- @param pwd     (optional) password. If none, use password from /etc/secretkey.
-- @param nozlib  (optional) Don't compress if true.
-- @return        nil on error, or an iterator function. See @crypto_result_iterator above.
function dec(buf, pwd, nozlib)
    if type(buf) ~= "string" then
        return nil
    end
    local cmd = build_cmd(nil, pwd, nozlib, false)
    return sys.ltn12_popen(cmd, buf)
end

function onemesh_ltn12_open(command, wbuf)
    local fdi, fdo = nixio.pipe()
    local fdi2, fdo2
    if wbuf then
        fdi2, fdo2 = nixio.pipe()
    end
    local pid = nixio.fork()

    if pid > 0 then
        if wbuf then
            fdo2:write(wbuf)
            fdi2:close()
            fdo2:close()
        end
        fdo:close()
        local close
        return function(len)
            len = len or 2048
            local buffer = fdi:read(len)
            local wpid, stat = nixio.waitpid(pid, "nohang")
            if not close and wpid and stat == "exited" then
                close = true
            end

            if buffer and #buffer > 0 then
                return buffer
            elseif close then
                fdi:close()
                return nil
			else
				return ""
            end
        end
    elseif pid == 0 then
        nixio.dup(fdo, nixio.stdout)
        fdi:close()
        fdo:close()
        if wbuf then
            nixio.dup(fdi2, nixio.stdin)
            fdi2:close()
            fdo2:close()
        end
        nixio.exec("/bin/sh", "-c", command)
    end
end

function onemesh_enc(buf, pwd, nozlib)
    if type(buf) ~= "string" then
        return nil
    end
    local cmd = build_cmd(nil, pwd, nozlib, true)
    return onemesh_ltn12_open(cmd, buf)
end

function onemesh_dec(buf, pwd, nozlib)
    if type(buf) ~= "string" then
        return nil
    end
    local cmd = build_cmd(nil, pwd, nozlib, false)
    return onemesh_ltn12_open(cmd, buf)
end

--- Encrypt or Decrypt string used wolfssl lib,only support aes-cbc-128/aes-cbc-192/aes-cbc-256
-- @param buf    string to be encrypted or decrypted
-- @param key    enc key,hex format,length is 32 or 48 or 64
-- @param iv     enc iv,hex format,length must be 32
-- @param mode   true for enc;false for dec
-- @return       clear text or hex-format decrypted text
function wolfssl_enc_dec(buf, mode, key, iv)
    if type(buf) ~= "string" then
        return nil
    end

    if mode == nil then
        return nil
    end

    if key == nil then
        key = dft_key
    else
        if type(key) ~= "string" or #key ~= 32 and #key ~= 48 and #key ~= 64 then
            return nil
        end
    end

    if iv == nil then
        iv = dft_iv
    else
        if type(iv) ~= "string" or #iv ~= 32 then
            return nil
        end
    end

    local luarsa = require "luarsa"
    if(mode == true) then
        return luarsa.aes_enc(buf, key, iv)
    else
        return luarsa.aes_dec(buf, key, iv)
    end
end

--- Dump LTN12 source to file
-- @param src     LTN12 source
-- @param fname   file name
function dump_to_file(src, fname)
    local file = io.open(fname, "w")
    if not file then return end
    local buf = src()
    while buf do
        file:write(buf)
        buf = src()
    end
    file:close()
end

--- Encrypt file
-- @param in_file  infile name
-- @param out_file outfile name
-- @param nozlib   (optional) Don't compress if true.
-- @return         nil on error, or an iterator function. See @crypto_result_iterator above.
function enc_file_entry(in_file, out_file, nozlib)
    if crypt_used_openssl() then
        local cryfunc = enc_file(in_file)
        dump_to_file(cryfunc, out_file)
    else
        wolfssl_enc_dec_file(in_file, out_file, 1)
    end
    return
end

--- Decrypt file
-- @param in_file  infile name
-- @param out_file outfile name
-- @param nozlib   (optional) Don't compress if true.
-- @return         nil on error, or an iterator function. See @crypto_result_iterator above.
function dec_file_entry(in_file, out_file, nozlib)
    if crypt_used_openssl() then
        local cryfunc = dec_file(in_file)
        dump_to_file(cryfunc, out_file)
    else
        wolfssl_enc_dec_file(in_file, out_file, 0)
    end
    return
end

