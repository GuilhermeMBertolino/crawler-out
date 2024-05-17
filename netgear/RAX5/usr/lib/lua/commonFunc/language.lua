
local M={}

local file = require "commonFunc.file"
local fwUtils = require "commonFunc.fwUtils"
local log = require "luci.log"
log.debug(0)

function sleep(s)
  local socket=require'socket'
  local ntime = socket.gettime() + s
  repeat until socket.gettime() > ntime
end

M.langMaps1 = {
    English = "en",
    German = "de",
    Chinese = "chs",
    Japanese = "jp",
    Korean = "ko",
    Russian = "ru",
    Spanish = "es",
    Polish = "pl",
    French = "fr",
    Italian = "it",
    Swedish = "sv",
    Danish = "da",
    Dutch = "nl",
    Greek = "el",
    Norwegian = "no",
    Czech = "cs",
    Slovenian = "sl",
    Portuguese = "pt",
    Hungarian = "hu",
    Romanian = "ro",
    Finnish = "fi",
    Slovak = "sk",
    Turkish = "tr",
    ["Traditional-Chinese"] = "cht"
}

M.langMaps2 = {
    de = "German",
    ko = "Korean",
    ru = "Russian",
    es = "Spanish",
    pl = "Polish",
    fr = "French",
    it = "Italian",
    sv = "Swedish",
    da = "Danish",
    nl = "Dutch",
    el = "Greek",
    no = "Norwegian",
    nn = "Norwegian",
    nb = "Norwegian",
    cs = "Czech",
    sl = "Slovenian",
    pt = "Portuguese",
    hu = "Hungarian",
    ro = "Romanian",
    fi = "Finnish",
    sk = "Slovak",
    tr = "Turkish",
    en = "English",
    ja = "Japanese",
    zh = "Chinese",
    ["zh-tw"] = "Traditional-Chinese",
    ["zh-hk"] = "Traditional-Chinese"
}

M.languageTable =
{
    ENU="English",
    ESP="Spanish",
    DEU="German",
    SVE="Swedish",
    FRA="French",
    NLD="Dutch",
    ITA="Italian",
    DAN="Danish",
    FIN="Finnish",
    NOR="Norwegian",
    ELL="Greek",
    PTB="Portuguese",
    RUS="Russian",
    PLK="Polish",
    HUN="Hungarian",
    CSY="Czech",
    SLV="Slovenian",
    SKY="Slovak",
    ROM="Romanian",
    CHS="SimplifiedChinese",
    KOR="Korean",
    JPN="Japanese",
    TRK="Turkish",
    CHT="TraditionalChinese"
}

local sku_support_lang_list = {
        NA = "English,Spanish,Chinese,French,German,Italian,",
        AU = "English,Chinese,Italian,Germany,Dutch,Korea,",
        UK = "English,Chinese,French,German,Dutch,Korean,",
        PE = "English,German,French,Dutch,Swedish,Russian,",
        RU = "Russian,English,Polish,Dutch,Swedish,Danish,",
        PA = "English,French,Spanish,Chinese,German,Portuguese,",
        JP = "English,Chinese,Japanese,Korea,Dutch,Russia,",
        PR = "English,Chinese,Russian,Dutch,Japanese,Korean,",
        KO = "English,Chinese,Japanese,Korea,Dutch,Russia,",
        EE = "Polish,Russian,Czech,Greek,Romanian,Hungarian,",
        IN = "English,German,French,Dutch,Swedish,Russian,",
        MX = "English,French,Spanish,Chinese,German,Portuguese,"
}



function M.language_init()

  local uci = require "luci.model.uci".cursor()
  local uci_st = require "luci.model.uci".cursor(nil, "/var/state")

    if not file.file_exists("/etc/lang/mlang.js") then
        os.execute("/bin/mkdir -p /etc/lang")
        log.force("Use default language files")
        os.execute("/bin/cp -f /www/lang/lang-en.js /etc/lang/mlang.js")
    end
    local release_ver = uci_st:get("netgear", "fw", "lang_ver")
    local lang_ver = uci:get("netgear", "system", "lang_ver")

    local release_ver_T = {}
    local lang_ver_T = {}

    release_ver_T[1], release_ver_T[2], release_ver_T[3], release_ver_T[4] = string.match(release_ver,"(.+).(%d+).(%d+).(%d+)")
    lang_ver_T[1], lang_ver_T[2], lang_ver_T[3], lang_ver_T[4] = string.match(lang_ver,"(.+).(%d+).(%d+).(%d+)")

    local sku  = uci_st:get("netgear", "board", "sku")
    local support_list = ""

    if sku and sku_support_lang_list[sku] then
        support_list =  sku_support_lang_list[sku]
    else
        support_list =  sku_support_lang_list["NA"]
    end

    for langValue in (support_list):gmatch("(.-),") do
      if M.langMaps1[langValue] then
          if (tonumber(release_ver_T[3]) > tonumber(lang_ver_T[3])) or (tonumber(release_ver_T[4]) > tonumber(lang_ver_T[4])) then
              os.execute("/bin/cp -f /www/lang/lang-"..M.langMaps1[langValue]..".js /etc/lang/lang-"..M.langMaps1[langValue]..".js")
              uci:set("netgear", "system", "lang_ver", release_ver)
              uci:commit("netgear")
          end

          if not file.file_exists("/etc/lang/lang-"..M.langMaps1[langValue]..".js") then
              os.execute("/bin/cp -f /www/lang/lang-"..M.langMaps1[langValue]..".js /etc/lang/lang-"..M.langMaps1[langValue]..".js")
          end
      end
  end

  local config_language  = uci:get("netgear", "system", "gui_language")
  local new_language = "English"

  if config_language and config_language == "Auto" then
      new_language = uci:get("netgear", "system", "auto_lang") or new_language
  end

  if not file.file_exists("/etc/lang/lang-"..M.langMaps1[new_language]..".js") then
      os.execute("/bin/cp -f /etc/lang/lang-"..M.langMaps1["English"]..".js /etc/lang/mlang.js")
  else
      os.execute("/bin/cp -f /etc/lang/lang-"..M.langMaps1[new_language]..".js /etc/lang/mlang.js")
  end

end

-------------------------------------------------------------------------------
-- set language configuration
-- @param new_language - the language user selected
-- @param isAuto - if user select 'Auto'
-- @param isDlSucceed - if the selected language download successfully or exists under /etc/lang/
-- @param langFile - the language file which will be copy and overwrite /etc/lang/mlang.js
function M.setLanguage(new_language, isAuto, isDlSucceed, langFile)
    local uci = require "luci.model.uci".cursor()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")

    if (isAuto == true) then
        if ( isDlSucceed == true ) then
            -- download sucessfully, change language to the selected one
            uci:set("netgear", "system", "gui_language", "Auto")
            uci:set("netgear", "system", "auto_lang", new_language)
            uci_st:set("netgear", "system", "lang_abbr", M.langMaps1[new_language])
        else
            -- download fail, language restore to English
            uci:delete("netgear", "system", "auto_lang")
            uci:set("netgear", "system", "gui_language", "English")
            uci_st:set("netgear", "system", "lang_abbr", M.langMaps1["English"])
        end
    else
        uci:set("netgear", "system", "gui_language", new_language)
        uci:delete("netgear", "system", "auto_lang")
        uci_st:set("netgear", "system", "lang_abbr", M.langMaps1[new_language])
    end

    uci:commit("netgear")
    table.insert(changed_config, "netgear")

    uci_st:set("netgear", "system", "lang_changed", "1")
    uci_st:save("netgear")

    os.execute("/bin/cp -f "..langFile.." /etc/lang/mlang.js")
end

-------------------------------------------------------------------------------
-- called when language is changed by GUI
-- @param new_language - the language user selected
-- @param isAuto - if user select 'Auto'
-- @return 0 - Change successfully    1 - Fail for internet connection issue     2 - Fail for other reasons
function M.language_changed(new_language, isAuto)
    local uci = require "luci.model.uci".cursor()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")

    local langFile_etc = "/etc/lang/lang-"..M.langMaps1[new_language]..".js"
    local langFile_default = "/etc/lang/lang-"..M.langMaps1['English']..".js"
    local langFile = langFile_default
    local isDlSucceed = false
    local previousLang = ""

    -- check if selected language is already stored on flash (/etc/lang/)
    local isLangOnFlash = M.isSelectedLangStoredOnFlash(new_language)

    -- check if the selected language is already stored in the string table on flash(/etc/lang/)
    if ( isLangOnFlash == "true" ) then
        -- the selected language is already stored on flash(/etc/lang/)
        -- do not connect to the update server to check for newer version of string table
        log.force("the selected language is already on flash")
        isDlSucceed = true
        -- use the selected language file under /etc/lang/
        langFile = langFile_etc
        M.setLanguage(new_language, isAuto, isDlSucceed, langFile)

        return 0
    else
        log.force("the selected language is not stored on flash")
        -- the selected language is not stored on flash(/etc/lang/)
        -- get internet status
        local internet_res = uci_st:get("network", "inet", "check")
        isDlSucceed = false
        if ( internet_res == "0" ) then
            -- the selected language is not stored on flash and no internet connection
            if isAuto == true then
                -- 'Auto' selected, restore to 'English'
                log.force("No internet connection and 'Auto' selected, restore to 'English'")
                -- use default language file
                langFile = langFile_default
                M.setLanguage(new_language, isAuto, isDlSucceed, langFile)
            else
                -- not 'Auto' selected, just keep the previous setting

            end

            return 1

        else
            log.force("the selected language is not stored on flash and internet is available")
            -- the selected language is not stored on flash and internet is available, try download the string table from NTGR update server
            local lang_ver = uci:get("netgear", "system", "lang_ver") or "V1.0.0.0"
            local fork_exec = require"commonFunc.fork".fork_exec
            local cmdStr = "/sbin/pufwUpgrade -l '"..new_language.."' -v '"..lang_ver.."'"
            fork_exec(cmdStr)
            log.force("Do language download, cmdStr="..cmdStr)
            if M.langMaps1[new_language] then
                local socket = require'socket'
                local startTime = socket.gettime()
                repeat
                    sleep(1)
                until (socket.gettime() - startTime > 10 or file.file_exists(langFile_etc) )
                
                if file.file_exists(langFile_etc) then
                    -- the selected language string table download successfully
                    isDlSucceed = true
                    -- use the selected language file under /etc/lang/
                    langFile = langFile_etc
                    M.setLanguage(new_language, isAuto, isDlSucceed, langFile)

                    return 0
                else
                    -- the selected language string table download fail
                    isDlSucceed = false
                    if isAuto == true then
                        -- 'Auto' selected, restore to 'English'
                        log.force("Internet available and 'Auto' selected, but download failed, restore to 'English'")
                        -- use default language file
                        langFile = langFile_default
                        M.setLanguage(new_language, isAuto, isDlSucceed, langFile)
                    else
                        -- not 'Auto' selected, just keep the previous setting
                    end

                    return 2
                end
            end
        end
    end
end

function M.getChangeLanguageResult()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
    local seconds = 10
    localresult = false
    while seconds > 0 do
        if type(uci_st:get("netgear", "system", "lang_changed")) == "string" then
            result = true
            break
        end
        sleep(1)
        seconds = seconds - 1
    end

    return result
end

function M.getSupportLanguageListForGUI()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
    local sku  = uci_st:get("netgear", "board", "sku")
      local support_list = ""
      local returnList =""
    if sku and sku_support_lang_list[sku] then
        support_list =  sku_support_lang_list[sku]
    else
        support_list =  sku_support_lang_list["NA"]
    end

    for langValue in (support_list):gmatch("(.-),") do
        returnList = returnList..langValue..","
    end
    returnList = returnList.."Auto"

    return returnList
end

function M.isSkuSupportLanguageListForGUI()

    local cgilua = require "cgilua"
    local httpLangInfo = cgilua.servervariable"HTTP_ACCEPT_LANGUAGE"
    local httpLang = string.sub(httpLangInfo,1,2)
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
    local uci = require "luci.model.uci".cursor()
    local sku  = uci_st:get("netgear", "board", "sku")
    local support_list = ""

    httpLang = M.langMaps2[httpLang]

    if sku and sku_support_lang_list[sku] then
        support_list =  sku_support_lang_list[sku]
    else
        support_list =  sku_support_lang_list["NA"]
    end

    if support_list:find(httpLang) == nil then
        return "false"
    end

    return "true"
end

-- check if the selected language is already stored on flash
function M.isSelectedLangStoredOnFlash(selectLang)
    local ret = "false"

    if M.langMaps1[selectLang] then
        local langFile_etc = "/etc/lang/lang-"..M.langMaps1[selectLang]..".js"
        if file.file_exists(langFile_etc) then
            ret = "true"
        end
    end

    return ret
end

function M.getLanguageDownloadResult()
    local uci_st = require "luci.model.uci".cursor(nil,"/var/state")
    return uci_st:get("netgear", "system", "lang_download_done")
end
return M
