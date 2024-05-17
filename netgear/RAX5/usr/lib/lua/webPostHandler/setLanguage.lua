local M = {}
local validator = require "commonFunc.validator"
local log = require "luci.log"
log.debug(0)

function setLanguage_validator(parm, value)
    local ret = false
    if(parm == "language") then
        local langMaps = require "commonFunc.language".langMaps1
        if langMaps[value] ~= nil or value == "Auto"then
            ret = true
        end
    end
    return ret
end

local setLanguage_maps =
{
    language = { data_type = "language", handler = setLanguage_validator }
}

function M.setLanguage_handler(json)
    log.debug(0)
    log.console_r(json)

    local uci = require "luci.model.uci".cursor()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
    local language = require "commonFunc.language"
    local langMaps1 = require "commonFunc.language".langMaps1
    local select_language = "English"
    local isAuto = false

    uci_st:revert("netgear", "system", "lang_changed")
    uci_st:revert("netgear", "system", "lang_abbr")
    uci_st:save("netgear")
    uci:delete("netgear", "system", "lang_download_done")

    if (validator.post_data_validate(json, setLanguage_maps) == false) then
        log.print("Failed to parse the input JSON data!!!")
        return {status="error", message=tostring(json) }
    end

    if json.language == "Auto" then
        local cgilua = require "cgilua"
        local httpLangInfo = cgilua.servervariable"HTTP_ACCEPT_LANGUAGE"
        local httpLang = string.sub(httpLangInfo,1,2)
        local langMaps2 = require "commonFunc.language".langMaps2
        local setAutoLang = ""
        if  httpLang == "zh" then
            if string.sub(httpLangInfo, 1, 5) == "zh-TW" then
                setAutoLang = "Traditional-Chinese"
            elseif string.sub(httpLangInfo, 1, 5)  == "zh-HK" then
                setAutoLang = 'Traditional-Chinese'
            else
                setAutoLang = 'Chinese'
            end
        elseif (httpLang == "no" or httpLang == "nn" or httpLang == "nb") then
            setAutoLang = 'Norwegian'
        elseif httpLang == "ja" then
            setAutoLang = 'Japanese'
        end

        log.force("Set Auto Language:"..setAutoLang)
        select_language = setAutoLang or select_language
        isAuto = true
    else
        select_language = json.language
    end

    --select_language = json.language
    local do_lang_change =  require "commonFunc.language".language_changed(select_language, isAuto)

    if do_lang_change == 0 then
        return {status="success", message="Finish language Setup"}
    elseif do_lang_change == 1 then
        return {status="error", message="Language download failed for internet connection"}
    elseif do_lang_change == 2 then
        return {status="error", message="Language download failed for other reasons"}
    end
end

return M
