
--This wifi utility lua is target for getting Netgear GUI's HTML value of radio button(Security Mode).
--and the string value for setting to MTK's wiireless config.

--Wireless security mode, mapping between GUI value and MTK wireless setting.
local wifiSecurityModeMapping = {
    ["1"] = "OPEN",
    ["2"] = "WPA2PSK",
    ["3"] = "WPAPSKWPA2PSK",
    ["4"] = "WPA1WPA2",
    ["5"] = "WPA3PSK",
    ["6"] = "WPA2PSKWPA3PSK"
    --["XX"] = "SHARED" then  --Netgear GUI NO define.
    --["XX"] = "WEPAUTO" then --Netgear GUI NO define.
    --["XX"] = "WPAPSK" then  --Netgear GUI NO define. --WPA1 PSK mode.
    --["XX"] = "WPA" then     --Netgear GUI NO define. --WPA1 enterprise mode.
    --["XX"] = "WPA2" then    --Netgear GUI NO define. --WPA2 enterprise mode.
}

function getWifiSecModeByDesc( mtk_settingStr )
    for key, value in pairs(wifiSecurityModeMapping) do
        if mtk_settingStr == value then
            return key
        end
    end
end

function getWifiSecDescByChosedNum( ntgr_wifiSec_guiValue )
    for key, value in pairs(wifiSecurityModeMapping) do
        if ntgr_wifiSec_guiValue == key then
            return value
        end
    end
end

--Wireless enterprise security(RADIUS) encryption mode, mapping between GUI value and MTK wireless setting.
local wifiRadiusEncModeMapping = {
    ["-1"] = "NONE", --Netgear GUI NO define.
    --["-1"] = "WEP",    --Netgear GUI NO define.
    --["-1"] = "TKIP",   --Netgear GUI NO define.
    ["0"] = "AES",
    ["1"] = "TKIPAES"
    --["-1"] = "GCMP256" --Netgear GUI NO define.
}

function getWifiRadiusEncModeByDesc( mtk_settingStr )
    for key, value in pairs(wifiRadiusEncModeMapping) do
        if mtk_settingStr == value then
            return key
        end
    end
end

function getWifiRadiusEncDescByChosedNum( ntgr_wifiRadiusEnc_guiValue )
    for key, value in pairs(wifiRadiusEncModeMapping) do
        if ntgr_wifiRadiusEnc_guiValue == key then
            return value
        end
    end
end

-- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
--   WPA3: PMFMFPC=1, PMFMFPR=1
--   WPA2/WPA3: PMFMFPC=1, PMFMFPR=0
--   WPA2: PMFMFPC=0, PMFMFPR=0
function getWifiMFPCByUCISecType( priSecType, guestSecType )
    local mfpc

    if priSecType == "5" or priSecType == "6" then
        mfpc = "1"
    else
        mfpc = "0"
    end

    if guestSecType == "5" or guestSecType == "6" then
        mfpc= mfpc..";1"
    else
        mfpc = mfpc..";0"
    end

    return mfpc
end

function getWifiMFPRByUCISecType( priSecType, guestSecType )
    local mfpr
   
    if priSecType == "5" then
        mfpr = "1"
    else
        mfpr = "0"
    end
    
    if guestSecType == "5" then
        mfpr = mfpr..";1"
    else
        mfpr = mfpr..";0"
    end
    
    return mfpr
end
