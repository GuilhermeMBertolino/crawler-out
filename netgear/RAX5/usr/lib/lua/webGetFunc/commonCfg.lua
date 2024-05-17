local cgilua = require "cgilua"
local os = require"os"
local sys  = require "luci.sys"
local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
require "commonFunc.wifiUtils_commDefs"
local log = require "luci.log"
local file = require "commonFunc.file"
local json = require "luci.json"
log.debug(0)

local M = {}

function M.autoLang()

    local langMaps = require "commonFunc.language".langMaps2
    local langAbbr = ""
    local langName = ""
    local httpLangInfo = cgilua.servervariable"HTTP_ACCEPT_LANGUAGE"
    local httpLang = string.sub(httpLangInfo,1,2)
    if  httpLang == "zh" then
        if string.sub(httpLangInfo, 1, 5) == "zh-TW" then
            langAbbr = "cht"
            langName = "Traditional-Chinese"
        elseif string.sub(httpLangInfo, 1, 5)  == "zh-HK" then
            langAbbr = 'cht'
            langName = 'Traditional-Chinese'
        else
            langAbbr = 'chs'
            langName = 'Chinese'
        end
    elseif (httpLang == "no" or httpLang == "nn" or httpLang == "nb") then
        langAbbr = 'no'
        langName = 'Norwegian'
    elseif httpLang == "ja" then
        langAbbr = 'jp'
        langName = 'Japanese'
    else
        for mapsLangAbbr, mapsLangName in pairs(langMaps)  do
            if httpLang == mapsLangAbbr then
                langAbbr = mapsLangAbbr
                langName = mapsLangName
                log.force("langAbbr:"..langAbbr..", langName:"..langName)
                break;
            end
        end
    end

    local langType = uci:get("netgear", "system", "gui_language")
    local currLang= uci:get("netgear", "system", "auto_lang")
    if ((currLang and currLang == langName) or langType ~= "Auto") then
	      return 0
    end

    uci:set("netgear", "system", "auto_lang", langName)
    uci:commit("netgear")

    local file = require "commonFunc.file"
    if not file.file_exists("/etc/lang/lang-"..langAbbr..".js") then
        langAbbr = "en"
    end

    local cmd_str = "cp -f /etc/lang/lang-"..langAbbr..".js /etc/lang/mlang.js"
    os.execute(cmd_str)

    return 1
end

function M.getModelNameStr(notEmbed)
    local modelName = ""
    modelName = uci_st:get("netgear", "board", "model")
    if (modelName == nil) then return "" end

    if notEmbed == nil then
        cgilua.put(modelName)
    else
        return modelName
    end
end

function M.getNmrpSKU()
    local sku = uci_st:get("netgear", "board", "sku")
    if sku == nil then
        return "US"
    else
        return sku
    end
end

function M.getVer()
  cgilua.put('?v='..os.time(os.date("!*t")))
end


function M.getFirmwareVer(notEmbed)
    local fwVer = ""
    fwVer = uci_st:get("netgear", "fw", "cur_ver")
    if (fwVer == nil) then return "" end

    if notEmbed == nil then
        cgilua.put(fwVer)
    else
        return fwVer
    end
end

function M.getFirmwareAutoUpdate()
    local auto = uci:get("netgear", "fw", "auto_update")
    if (auto == nil) then
        return "false"
    else
        return auto
    end
end

function M.getDefaultState()
    local state = uci:get("netgear", "system", "blank_state")
    if (state == nil) then
        return "0"
    else
        return state
    end
end

function M.getWizardTNCDisable()
    local tnc = uci:get("netgear", "system", "tnc_disable")
    if tnc == nil then
        return "0"
    else
        return tnc
    end
end

function M.getWizardNightHawkAppDisable()
    local app = uci:get("netgear", "system", "app_disable")
    if app == nil then
        return "0"
    else
        return app
    end
end

function M.getLanguageVersion()
    return uci:get("netgear", "system", "lang_ver") or "V1.0.0.1"
end

function M.getGUILanguage()
  local lang = uci:get("netgear", "system", "gui_language") or "English"
  return lang
end

function M.getOperationMode(guiShow)
    local opMode = ""
    opMode = uci:get("network", "@opmode[0]", "mode")
    if (opMode == nil) then return "router" end

    if (guiShow == nil) then return opMode end

    -- for GUI display
    if (opMode == "router") then
        opMode = "Router"
    elseif (opMode == "bridge") then
        opMode = "Bridge"
    else
        opMode = "AP"
    end

    return opMode
end

function M.getApModeHint()
    local opMode = uci:get("network", "@opmode[0]", "mode")
    if (opMode == "ap") then
        return '<font color="#EEDA00" mlang="MRS078"></font><font color="#EEDA00">:</font><font color="#EEDA00" mlang="ATM080"></font>'
    else
        return ""
    end
end

function M.getCpuLoad()
    --get idle part percent
    local cpuidle = sys.exec("top -n 1 | grep 'CPU[:]' | awk -F ' ' '{print$8}' | awk -F '%' '{print$1}'")

    --get CPU load
    local cpuLoad = (100 - tonumber(cpuidle))
    --append %
    cpuLoad = cpuLoad.."%"

    return cpuLoad
end

function M.getmemoryUsage()
    -- get the used memory size
    local memUsed = sys.exec("free | grep Mem[:] | awk -F ' ' '{print$3}' ")
    -- get total memory size
    local memTotal = sys.exec("free | grep Mem[:] | awk -F ' ' '{print$2}'")

    memUsed = math.floor(tonumber(memUsed)/1024)
    memTotal = math.floor(tonumber(memTotal)/1024)

    --we use RAM with size 256MB or 512MB
    if memTotal <= 256 then
        memTotal = 256
    else
        memTotal = 512
    end

    return memUsed.."MB/"..memTotal.."MB"
end

function M.getflashUsage()
    --get used/total flash(overlay) size
    local overlayUsed = sys.exec("df -h -P /overlay | grep overlay | awk -F ' ' '{print$3}' | awk -F 'M' '{print$1}'")
    local overlayTotal = sys.exec("df -h -P /overlay | grep overlay | awk -F ' ' '{print$2}' | awk -F 'M' '{print$1}'")

    return overlayUsed.."MB/"..overlayTotal.."MB"
end

function M.getInternetStatus()
    local internet_status = uci_st:get("network", "inet", "check")

    if ( internet_status ~= nil and internet_status == "1" )  then
        cgilua.put( "<span class=\"Status-normal\" mlang=\"D-genie_25\">STATUS</span>:&nbsp;&nbsp;&nbsp;<span id=\"wait_ping\" class=\"Condition-normal\" mlang=\"genie_49\">GOOD</span>")
    else
        cgilua.put( "<span id=\"wait_ping\" class=\"Status-normal\" mlang=\"3G303\">Not Connected</span>")
    end
end

function M.getInternetResult()
    local internet_res = uci_st:get("network", "inet", "check")

    if ( internet_res ~= nil and internet_res == "1" ) then
        internet_res = "0"
    else
        internet_res = "1"
    end
    cgilua.put(internet_res)
end

function M.bodyBegin(fetchData, helpName, headerMlang, headerName, preFilloutCallback, postFilloutCallback)

 cgilua.put(string.format('\
    <script language="javascript" type="text/javascript">\
        $(document).ready(function()\
        {\
            fetchData(\'target\', \'%s\', \'%s\', \'%s\');\
        });\
    </script>\
    <body onload="window.top.change_size($(this));loadhelp(\'%s\',\'\');" class="page-body" onResize="window.top.change_size($(this));">\
	<div class="page-header" style="position: relative;" mlang="%s">%s</div>\
	<form id="target"  name="formname" method="POST" >\
	<input type="hidden" name="buttonHit">\
	<input type="hidden" name="buttonValue">', fetchData, preFilloutCallback, postFilloutCallback, helpName, headerMlang, headerName))
end

function M.bodyEnd(btnType, refreshUrl)
	cgilua.put(M.genDefaultBtns(btnType, refreshUrl))
	cgilua.put(M.genHelpSection());
end

function M.genDefaultBtns(btnType, refreshUrl)

		if tonumber(btnType) == 1 then
			return cgilua.put(string.format('\
				<!-- btns -->\
				<div class="form-btn-row">\
					<button type="button" value="test"  onClick="formSubmit($(this));" name="Test" id="test" class="button-common common_bt" mlang="SWP045" >Test</button>\
					<button type="button" value="BUTTON"  onClick="location.href=\'%s\';" name="Cancel" id="cancel" class="button-cancel cancel_bt" mlang="UAS021">Cancel</button>\
					<button type="button" value="apply"  onClick="formSubmit($(this))" name="apply" id="apply" class="button-apply apply_bt" mlang="LUP004" >Apply</button>\
				</div>\
				</form>', refreshUrl))
		elseif tonumber(btnType) == 2 then
			return cgilua.put(string.format('\
				<!-- btns -->\
				<div class="form-btn-row">\
				</div>\
				</form>'))
		else
			return cgilua.put(string.format('\
				<!-- btns -->\
				<div class="form-btn-row">\
					<button type="button" value="BUTTON"  onClick="location.href=\'%s\';" name="Cancel" id="cancel" class="button-cancel cancel_bt" mlang="UAS021">Cancel</button>\
					<button type="button" value="apply"  onClick="formSubmit($(this))" name="apply" id="apply" class="button-apply apply_bt" mlang="LUP004" >Apply</button>\
				</div>\
				</form>', refreshUrl))
		end
end

function M.genHelpSection()
return cgilua.put('\
    <div class="help-section">\
      <div class="help-frame-div" >\
          <iframe id="helpframe" class="help-iframe" scrolling="no" name="helpframe" frameborder="0">\
          </iframe>\
    </div>\
    <div class="help-btns">\
      <div class="subhead2-bottom" >\
      <span style="float:left;padding-left:10px;padding-top:5px">\
        <img src="images/help-icon.png" onmouseover="changeCursorPointer();" onclick="showHelpIframe();" onmouseout="changeCursorDefault();">\
      </span>\
      <span class="subhead2-text" style="float:left;padding-left:3px;" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" mlang="genie_51" >\
        Help Center\
      </span>\
      <span class="button-help-arrow">\
        <img src="images/helparrowup-icon.png" id="help-button" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" >\
      </span>\
      <span class="subhead2-text" style="text-decoration:underline;float:right;padding-right:10px" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" mlang="genie_51" >\
        Help Center\
      </span>\
    </div>\
    </div>\
  </div>\
  </body>')
end

function M.generate_EmbedProgressBar()
    cgilua.put('\
        <div class="form-group" id="pgbar-div" style="display:none;height:600px;overflow:auto;scrolling:auto">\
            <div class="form-row prgbar">\
                <h1 name="barTitle" id="pls_wait_div" mlang="D-genie_377">Rebooting the router now, please wait K</h1>\
            </div>\
            <div class="form-row prgbar">\
                <input type="text" name="progress" id="progress" value="" disabled />\
            </div>\
            <div class="divider">&nbsp;</div>\
        </div>')
end

function M._genCsrfTokenFile(input, filename)
    local token = require("webGetFunc.token")
    local csrftoken = token.genUniqueToken()
    local file = io.open(filename, "w")
    file:write(csrftoken.."\n")
    file:close()

    if input == "noOutput" then
        return ""
    end

    if input == "tokenNumber" then
        return '\"'..csrftoken..'\"'
    end

    if input == "pureToken" then
        return csrftoken
    end

    if input == "inlineHTML" then
        return string.format('<input type="hidden" name="csrftokenJs" value="%s">',csrftoken)
    end
end

function M.genCsrfTokenFile(input)
    if input ~= "pureToken" then
    cgilua.put( M._genCsrfTokenFile(input, "/var/CsrfTokenFile"))
    else
        return M._genCsrfTokenFile(input, "/var/CsrfTokenFile")
    end
end

function M.genCsrfTokenTopFile(input)
    cgilua.put( M._genCsrfTokenFile(input, "/var/CsrfTokenFile_top"))
end

function M.genCsrfTokenSubFile(input)
    cgilua.put( M._genCsrfTokenFile(input, "/var/CsrfTokenFile_sub"))
end

function M.genCsrfTokenSub2File(input)
    cgilua.put( M._genCsrfTokenFile(input, "/var/CsrfTokenFile_sub2"))
end

function M.getWirelessRadioResult2()
    local radioOn_2g = "off"
    local radioOn_5g = "off"

    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn") == "true" then
        radioOn_2g = "on"
    end

    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn") == "true" then
        radioOn_5g = "on"
    end

    if radioOn_2g == "on" and radioOn_5g == "on" then
        return "both"
    elseif radioOn_2g == "on" and radioOn_5g == "off" then
        return "2g"
    elseif radioOn_2g == "off" and radioOn_5g == "on" then
        return "5g"
    else
        return "none"
    end
end

function M.getWirelessRadioResult()
    local is2gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_2G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    local is5gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_5G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    local radioOn_2g = "off"
    local radioOn_5g = "off"

    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn") == "true" and tonumber(is2gWifi_intf_up) > 0 then
        radioOn_2g = "on"
    elseif uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn") == "false" and tonumber(is2gWifi_intf_up) > 0 then
        log.debug(1)
        log.console("WARNING: Wireless 2.4G Radio set to disable in UCI but the interface is UP in run-time!")
        log.debug(0)
        radioOn_2g = "on"
    else
        if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn") == "true" and tonumber(is2gWifi_intf_up) <= 0 then
            log.debug(1)
            log.console("WARNING: Wireless 2.4G Radio set to enable in UCI but the interface is NOT UP in run-time!")
            log.debug(0)
        end
        radioOn_2g = "off"
    end

    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn") == "true" and tonumber(is5gWifi_intf_up) > 0 then
        radioOn_5g = "on"
    elseif uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn") == "false" and tonumber(is5gWifi_intf_up) > 0 then
        log.debug(1)
        log.console("WARNING: Wireless 5G Radio set to disable in UCI but the interface is UP in run-time!")
        log.debug(0)
        radioOn_5g = "on"
    else
        if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn") == "true" and tonumber(is5gWifi_intf_up) <= 0 then
            log.debug(1)
            log.console("WARNING: Wireless 5G Radio set to enable in UCI but the interface is NOT UP in run-time!")
            log.debug(0)
        end
        radioOn_5g = "off"
    end

    if radioOn_2g == "on" and radioOn_5g == "on" then
        cgilua.put("both")
    elseif radioOn_2g == "on" and radioOn_5g == "off" then
        cgilua.put("2g")
    elseif radioOn_2g == "off" and radioOn_5g == "on" then
        cgilua.put("5g")
    else
        cgilua.put("none")
    end
end

function M.getWirelessSecurityResult()
    local wifi2g_securityType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType")
    local wifi5g_securityType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType")

    if tonumber(wifi2g_securityType) > 1 and tonumber(wifi5g_securityType) > 1 then
        cgilua.put("both")
    elseif tonumber(wifi2g_securityType) > 1 and tonumber(wifi5g_securityType) <= 1 then
        cgilua.put("2g")
    elseif tonumber(wifi2g_securityType) <= 1 and tonumber(wifi5g_securityType) > 1 then
        cgilua.put("5g")
    else
        cgilua.put("none")
    end
end

function M.getWanLanConflictFile()
    if (file.file_exists("/tmp/conflict_alarm")) then
        return 1;
    else
        return 0;
    end
end

function M.removeWanLanConflictFile()
    os.remove("/tmp/conflict_alarm")
end

function M.getLanInstanceIpAddr()
    local ip = ""
    local ifstatus_lan = sys.exec("ifstatus lan 2>/dev/null")
    local lan = json.decode(ifstatus_lan)

    if (lan ~= nil) then
        if (lan["ipv4-address"] and lan["ipv4-address"][1] and
            lan["ipv4-address"][1]["address"]) then
            ip = lan["ipv4-address"][1]["address"]
        end
    end
    return ip
end

function M.getSerialNumber()
    local sn = uci_st:get("netgear", "board", "sn")
    return (sn ~= nil) and sn or ""
end

function M.getBridgeSupport()
    local bridge_support = uci_st:get("netgear", "system", "bridge_support")

    if (bridge_support ~= nil) then
        return bridge_support
    else
        return "0"
    end
end

function M.getArmorStatus()
    local armor_protection = sys.exec("d2 -s armorstatus[0].protectionStatus | xargs echo -n")

    if armor_protection == "true" then
        local activate_status = sys.exec("d2 -s armorstatus[0].activateState | xargs echo -n")
        if activate_status == "true" then
            cgilua.put("2") -- show enable
        else
            cgilua.put("1") -- show not activated
        end
    else
        cgilua.put("0") -- show not enable
    end

end

function M.getVal_armor_enable()
    local armor_status = sys.exec("d2 -s armorstatus[0].protectionStatus | xargs echo -n");
    -- armor_status = true , or none
    if armor_status == "true" then
        cgilua.put("true")
    else
        cgilua.put("false")
    end
end

function M.getVal_armorAd_disable()
    local armorAd_disable = sys.exec("uci get armor.status.ad_disable | xargs echo -n");
    if armorAd_disable == "true" then
        cgilua.put("true")
    else
        cgilua.put("false")
    end
end

return M
