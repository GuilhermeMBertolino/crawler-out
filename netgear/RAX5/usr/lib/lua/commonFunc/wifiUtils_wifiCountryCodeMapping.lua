
--This wifi utility lua is using to get default wireless country code for each Netgear Product SKU.
--The product sku for Netgear represents some area suck like "NA(North America)" or single country such like "JP(Japan)".
--We need to give it a defualt wireless "country code" for MTK's wifi driver and wifi profile setting.
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end
local log = require "luci.log"
    log.debug(0)

--Mapping table between Netgear Product SKU value and ISO-3166-1, the 2 characters country code.
local nmrpSku_wifiCountryCode_Mapping = {
    ["NA"] = "US",
    ["WW"] = "GB", --Because the timezone is set to London. Netgear HomeRouter Spec rev. 16a, page 470.
    ["GR"] = "DE",
    ["PR"] = "CN",
    ["RU"] = "RU",
    ["BZ"] = "BR",
    ["IN"] = "IN",
    ["KO"] = "KR",
    ["JP"] = "JP",
    ["CA"] = "CA",
    ["US"] = "US",
    ["MX"] = "MX",
    ["PA"] = "CA"  --2022.05.25, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). The default country is mapping to Canada.
}

--The input parameter, "nmrpSku", must be one of NMRP region name. Netgear HomeRouter Spec rev. 16a, page 405, 406.
--And that is also same as what we set in board pdata, "sku" option.
function getISO3166CountryCodeByNmrpSku( nmrpSku )
    for key, value in pairs(nmrpSku_wifiCountryCode_Mapping) do
        if nmrpSku == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

--Re-package the function by print() function to write standard out for external interpreater/application, suck like: linux shell.
function _sh_getISO3166CountryCodeByNmrpSku( nmrpSku )
    print( getISO3166CountryCodeByNmrpSku(nmrpSku) )
end

--Mapping table between Netgear Wireless GUI "Region" value and ISO-3166-1, the 2 characters country code.
local wifiGuiRegion_iso3166CountryCode_Mapping = {
    --["AF"] = "",
    --["TH"] = "",
    ["AU"] = "AU",
    ["CA"] = "CA",
    ["CN"] = "CN",
    ["EU"] = "GB", --"EU" is special reserve in ISO 3166, could we set it to MTK's driver directly?
    ["IN"] = "IN",
    --["IL"] = "IL",
    ["JP"] = "JP",
    ["KR"] = "KR",
    --["MY"] = "MY",
    ["MX"] = "MX",
    --["DZ"] = "DZ",
    --["QA"] = "QA",
    --["KW"] = "KW",
    --["TR"] = "TR",
    ["AE"] = "AE",
    --["RU"] = "RU",
    ["SG"] = "SG",
    --["BR"] = "BR",
    ["TW"] = "TW",
    ["US"] = "US",
    ["HK"] = "HK",
    ["VN"] = "VN"
}
--The input parameter, "iso3166_countryCode", is one of ISO3166, 2 characters abbreviation in upper case. 
--The returned key will be the wireless "country" which WLG_wireless.html using to select its' "Region" drop list.
function getWifiGUI_RegionByISO3166( iso3166_countryCode )
    for key, value in pairs(wifiGuiRegion_iso3166CountryCode_Mapping) do
        if iso3166_countryCode == value then
            return key
        end
    end
    return nil --If not found any matched key, return nil.
end

--The input parameter, "wifiGuiRegion", is value of wifi GUI's "Region" selection list.
--The output value is using to set value for "CountryCode" for MTK's wireless profile setting and MTK's wifi driver.
function getISO3166byWifiGUI_Region( GUI_wifiRegion )
    for key, value in pairs(wifiGuiRegion_iso3166CountryCode_Mapping) do
        if GUI_wifiRegion == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

--Lookup table between GUI or up-layer application and mapping to which "CountryRegion" for MTK wifi driver used.
--The mapping may be multiple to same value. Because the mapping may take different source suck like: "EU"(from Ntgr GUI) and "GE"(From Ntgr SOAP), they should map to "CountryRegion=0"(channel 1~13).
--I think the "GE" in SOAP V3.98 Definition is typo. "GE" represents "Georgia" rather than "United Kingdom". 
--Note: the "CountryRegion" in MTK's wireless profile setting means 2.4G's channel support list category, ex. if the value is 0, it represents supported channel is 1~11. if the value is 1, it represents supported channel is 1~13.
local wifiRegion_24G_supportedChannel_Mapping = {
    ["NA"] = "0",
    ["EU"] = "1",
    ["GB"] = "1",
    ["GE"] = "1",
    --["AF"] = "0", --Remove "Africa" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["TH"] = "0", --Remove "Asia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["AU"] = "0",
    ["CA"] = "0",
    ["CN"] = "0",
    ["IN"] = "0",
    --["IL"] = "0", --Remove "Isreal" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["JP"] = "1",
    ["KR"] = "0",
    --["MY"] = "0", --Remove "Malaysia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["MX"] = "0",
    --["DZ"] = "0", --Remove "Middle East(Algeria/Syria/Yemen)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["QA"] = "0", --Remove "Middle East(Iran/Lebanon/Qatar)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["KW"] = "0", --Remove "Middle East(Tunisia/Kuwait)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["TR"] = "0", --Remove "Middle East(Turkey)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["AE"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it.
    --["RU"] = "0", --Remove "Russia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["SG"] = "0",
    --["BR"] = "0", --Remove "South America" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["TW"] = "0",
    ["US"] = "0",
    ["HK"] = "0",
    ["VN"] = "0",
    --["EG"] = "0", --Remove "Egypt" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["ID"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it. It's appears in SOAP V3.98 "Definition" sheet.
    ["PH"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it. It's appears in SOAP V3.98 "Definition" sheet.
    ["SA"] = "0" --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it.
}

--The input parameter, "ntgrWirelessRegion", is the source from Netgear GUI or Netgear SOAP.
--The return value is integer index for MTK wireless profile setting, "CountryRegion" option.
function get24gSupportedChannelByNtgrWirelessRegion( ntgrWirelessRegion )
    for key, value in pairs(wifiRegion_24G_supportedChannel_Mapping) do
        if ntgrWirelessRegion == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

--Re-package the function by print() function to write standard out for external interpreater/application, suck like: linux shell.
function _sh_get24gSupportedChannelByNtgrWirelessRegion( ntgrWirelessRegion )
    print( get24gSupportedChannelByNtgrWirelessRegion(ntgrWirelessRegion) )
end

--Lookup table between GUI or up-layer application and mapping to which "CountryRegionABand" for MTK wifi driver used.
--The mapping may be multiple to same value. Because the mapping may take different source suck like: "EU"(from Ntgr GUI) and "GE"(From Ntgr SOAP), they should map to "CountryRegionABand=1".
--I think the "GE" in SOAP V3.98 Definition is typo. "GE" represents "Georgia" rather than "United Kingdom". 
--Note: the "CountryRegionABand" in MTK's wireless profile setting means 5G's channel support list category,
--sample:
--     0: 36, 40, 44, 48,52, 56, 60, 64, 149, 153, 157, 161, 165.
--    13: 36, 40, 44, 48,52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165.
local wifiRegion_5G_supportedChannel_Mapping = {
    ["NA"] = "26", --Same as "US".
    ["EU"] = "1",
    ["GB"] = "1",
    ["GE"] = "1",
    --["AF"] = "0", --Remove "Africa" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["TH"] = "0", --Remove "Asia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["AU"] = "9", --without ch144.
    ["CA"] = "14",
    ["CN"] = "0",
    ["IN"] = "0",
    --["IL"] = "0", --Remove "Isreal" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["JP"] = "12",
    ["KR"] = "7", --CountryRegionABand=7 includes ch132, ch136, ch140, but HomreRouterSpec rev. 16 shows not support these 3 channels for Korea country. Handle it by GUI and cgi.
    --["MY"] = "0", --Remove "Malaysia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["MX"] = "9",
    --["DZ"] = "0", --Remove "Middle East(Algeria/Syria/Yemen)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["QA"] = "0", --Remove "Middle East(Iran/Lebanon/Qatar)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["KW"] = "0", --Remove "Middle East(Tunisia/Kuwait)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    --["TR"] = "0", --Remove "Middle East(Turkey)" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["AE"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it.
    --["RU"] = "0", --Remove "Russia" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["SG"] = "7",
    --["BR"] = "0", --Remove "South America" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["TW"] = "13", --CountryRegionABand=7 includes ch52, but HomreRouterSpec rev. 16 shows not support this channels for Taiwan country. Handle it by GUI and cgi.
    ["US"] = "26", --For Netgear requirement, they want to open U-NII-4 channels. In MTK's solution, it supports ch169~ch177 in U-NII-4 and the newly region in "CountryRegionABand" is 26.
    ["HK"] = "7",
    ["VN"] = "7",
    --["EG"] = "0", --Remove "Egypt" wifi country in WW sku and in HomreRouterSpec rev. 16, page 145.
    ["ID"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it. It's appears in SOAP V3.98 "Definition" sheet.
    ["PH"] = "0", --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it. It's appears in SOAP V3.98 "Definition" sheet.
    ["SA"] = "0" --No 5G supported channel definition in HomreRouterSpec rev. 16 and also No said to remove it.
}

--The input parameter, "ntgrWirelessRegion", is the source from Netgear GUI or Netgear SOAP.
--The return value is integer index for MTK wireless profile setting, "CountryRegion" option.
function get5gSupportedChannelByNtgrWirelessRegion( ntgrWirelessRegion )
    for key, value in pairs(wifiRegion_5G_supportedChannel_Mapping) do
        if ntgrWirelessRegion == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

--Re-package the function by print() function to write standard out for external interpreater/application, suck like: linux shell.
function _sh_get5gSupportedChannelByNtgrWirelessRegion( ntgrWirelessRegion )
    print( get5gSupportedChannelByNtgrWirelessRegion(ntgrWirelessRegion) )
end

--Valid wifi "region" for Netgear wireless GUI and Netgear product.
--Please update it according Netgear Home Router Spec requirement or Netgear PE's requirement.
local valid_wifiRegion = {
--"AF",
--"TH",
--"IL",
--"MY",
--"DZ",
--"QA",
--"KW",
--"TR",
--"RU",
--"BR",
--"EG",
"NA",
"EU",
"GB",
"GE",
"AU",
"CA",
"CN",
"IN",
"JP",
"KR",
"MX",
"AE",
"SG",
"TW",
"US",
"HK",
"VN",
"ID",
"PH",
"SA"
}

function isValid_wifiRegion_forNtgr( ntgrWirelessRegion )
    for key, value in pairs(valid_wifiRegion) do
        log.console(__FUNCTION__()..":"..__LINE__()..", valid_wifiRegion.value="..value..", ntgrWirelessRegion="..ntgrWirelessRegion);
        if ntgrWirelessRegion == value then
            return true
        end
    end
    return false
end

local valid_DSRC_channels = { "167", "169", "171", "173", "175", "177" }
function isInDSRC_band( channel_5g )
    for key, value in pairs(valid_DSRC_channels) do
        log.console(__FUNCTION__()..":"..__LINE__()..", valid_DSRC_channels.value="..value..", channel_5g="..channel_5g);
        if channel_5g == value then
            return true
        end
    end
    return false
end

local valid_5GBand4_channels = { "149", "153", "157", "161", "165" };
function isIn5GBand4( channel_5g )
    for key, value in pairs(valid_5GBand4_channels) do
        log.console(__FUNCTION__()..":"..__LINE__()..", valid_5GBand4_channels.value="..value..", channel_5g="..channel_5g);
        if channel_5g == value then
            return true
        end
    end
    return false
end

local ntgr_available_channels_2G = {
--["AF"],
--["TH"],
--["IL"],
--["MY"],
--["DZ"],
--["QA"],
--["KW"],
--["TR"],
--["RU"],
--["BR"],
--["EG"],
    --["NA"],
    --["EU"],
    --["GB"],
    --["GE"],
    --["AU"],
    ["CA"] = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" }, --2022.05.26, PegaBU6, YochengLian, Open it to support PA Sku(Pan north America Sku).
    --["CN"],
    --["IN"],
    --["JP"],
    --["KR"],
    --["MX"],
    --["AE"],
    --["SG"],
    ["TW"] = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" }, --2022.05.26, PegaBU6, YochengLian, Open it to support PA Sku(Pan north America Sku).
    --["HK"],
    --["VN"],
    --["ID"],
    --["PH"],
    --["SA"],
    ["US"] = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" }
}

local ntgr_available_channels_5G = {
--["AF"],
--["TH"],
--["IL"],
--["MY"],
--["DZ"],
--["QA"],
--["KW"],
--["TR"],
--["RU"],
--["BR"],
--["EG"],
    --["NA"],
    --["EU"],
    --["GB"],
    --["GE"],
    --["AU"],
    ["CA"] = { "36", "40", "44", "48", "149", "153", "157", "161", "165" }, --2022.05.26, PegaBU6, YochengLian, Open it to support PA Sku(Pan north America Sku). NO DFS channels support for RAX5.
    --["CN"],
    --["IN"],
    --["JP"],
    --["KR"],
    --["MX"],
    --["AE"],
    --["SG"],
    ["TW"] = { "36", "40", "44", "48", "149", "153", "157", "161", "165" }, --2022.05.26, PegaBU6, YochengLian, Open it to support PA Sku(Pan north America Sku). NO DFS channels support for RAX5.
    --["HK"],
    --["VN"],
    --["ID"],
    --["PH"],
    --["SA"]
    --["US"] = { "36", "40", "44", "48", "149", "153", "157", "161", "165", "169", "173", "177" } --NO DFS channels support for now(2022.02.22) by Netgear PE's requirement. It may need to update if Netgear want to support DFS channels.
    ["US"] = { "36", "40", "44", "48", "149", "153", "157", "161", "165" } --NO DFS channels support for now(2022.02.22) by Netgear PE's requirement. It may need to update if Netgear want to support DFS channels. --SOAP AutoTest Tool V4.9 does not support ch169~177, no provide it to SOAP autoTest Tool otherwise it will cause test case failed.
}
--This function is mapping to Netgear Homew Router Spec or PE's requirement. It's not the wifi driver's capability.
function getAvailableChannels(whichBand, ntgr_wifiRegion)
    if whichBand == nil then whichBand = "2.4G" end
    if ntgr_wifiRegion == nil then ntgr_wifiRegion = "US" end

    if isValid_wifiRegion_forNtgr(ntgr_wifiRegion) ~= true then
        return false
    end

    if whichBand == "2.4G" then
        return ntgr_available_channels_2G[ntgr_wifiRegion]
    elseif whichBand == "5G" then
        return ntgr_available_channels_5G[ntgr_wifiRegion]
    end
end

--2022.05.26, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku).
--Mapping table between Netgear Wireless GUI "Region" value and country from ip location(also be ISO-3166-1 format).
--SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
local wifiGuiRegion_ipLocationCountry_Mapping = {
    ["US"] = "US", --United State.
    ["AS"] = "US", --America Samoa.
    ["GU"] = "US", --Guam.
    ["MP"] = "US", --Northern Mariana Islands.
    ["PR"] = "US", --Puerto Rico.
    ["UM"] = "US", --United States Minor Outlying Islands.
    ["VI"] = "US", --Virgin Islands.
    ["TW"] = "TW", --Taiwan
    ["CA"] = "CA" --Canada
}
--Mapping the auto detected country(by ip location) to Netgear specific region mapping.
--Note: RAX5 needs to support "PA" Sku(2022.05.11, please refer the e-mail, "[RAX5]SKU condolidation (NA to PAS)").
function getAutoWifiRegionMapping( country_FromIpLocation )
    for key, value in pairs(wifiGuiRegion_ipLocationCountry_Mapping) do
        if country_FromIpLocation == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

--"SWS003" : "Africa",    | "SWS011" : "Middle East",                                      | "SWS085" : "Middle East(Saudi Arabia)",         |
--"SWS004" : "Asia",      | "SWS012" : "Mexico",                                           | "SWS086" : "Middle East(United Arab Emirates)", |
--"SWS005" : "Australia", | "SWS013" : "South America",                                    |                                                 |
--"SWS006" : "Canada",    | "SWS057" : "North America",                                    |                                                 |
--"SWS007" : "Europe",    | "SWS015" : "United States",                                    |                                                 |
--"SWS008" : "Israel",    | "SWS082" : "Middle East(Algeria/Syria/Yemen)",                 |                                                 |
--"SWS009" : "Japan",     | "SWS084" : "Middle East(Turkey/Egypt/Tunisia/Kuwait)",         |                                                 |
--"SWS010" : "Korea",     | "SWS083" : "Middle East(Iran/Lebanon/Qatar)",                  |                                                 |
--"3G22"   : "Austria",   | "3G32"   : "India",            | "3G42" : "Portugal",          |
--"3G23"   : "Belgium",   | "3G33"   : "Indonesia",        | "3G43" : "Russia",            |
--"3G24"   : "Brazil",    | "3G34"   : "Italy",            | "3G44" : "Singapore",         |
--"3G25"   : "Chile",     | "3G35"   : "Malaysia",         | "3G45" : "Slovakia",          |
--"3G26"   : "Czech",     | "3G36"   : "Netherlands",      | "3G46" : "South&nbsp;Africa", |
--"3G27"   : "Finland",   | "3G37"   : "New&nbsp;Zealand", | "3G47" : "Sweden",            |
--"3G28"   : "France",    | "3G38"   : "Norway",           | "3G48" : "Switzerland",       |
--"3G29"   : "Germany",   | "3G39"   : "Peru",             | "3G49" : "Taiwan",            |
--"3G30"   : "Hong Kong", | "3G40"   : "Philippines",      | "3G50" : "Thailand",          |
--"3G31"   : "Hungary",   | "3G41"   : "Poland",           |                               |
--"PCVP_046" : "China",
--"PCVP_047" : "Middle East(Egypt/Tunisia/Kuwait)",
--"PCVP_048" : "Middle East(Turkey)",
--"PCVP_049" : "Middle East(Saudi Arabia/United Arab Emirates)",
--2022.08,15 PegaBU6, YochengLian, To show wifi region in ADVANCED Home page. We must return multi-language string for it.
--The "key"(index) should be one of 2-letters ISO 3166 and the data source may come from ipLocation detectioin(record in /var/state/ipLocation).
--TODO: finish the mapping for known country.
local wifiGuiRegion_NtgrMLangTag_PASku_Mapping = {
    ["US"] = "SWS015", --United State.
    ["AS"] = "SWS015", --America Samoa.
    ["GU"] = "SWS015", --Guam.
    ["MP"] = "SWS015", --Northern Mariana Islands.
    ["PR"] = "SWS0155", --Puerto Rico.
    ["UM"] = "SWS015", --United States Minor Outlying Islands.
    ["VI"] = "SWS015", --Virgin Islands.
    ["TW"] = "3G49", --Taiwan.
    ["CA"] = "SWS006", --Canada
    --["AF"] = "", --Afghanistan.
    --["TH"] = "3G50", --Thailand.
    --["AU"] = "SWS005", --Australia.
    --["CN"] = "PCVP_046", --China.
    --["EU"] = "SWS007", --Europe.
    --["GB"] = "SWS007", --Europe, United Kingdom of Great Britain and Northern Ireland.
    --["IN"] = "3G32", --India.
    --["IL"] = "SWS008", --Israel.
    --["JP"] = "SWS009", --Japan.
    --["KR"] = "SWS010", --Korea.
    --["MY"] = "3G35", --Malaysia.
    --["MX"] = "SWS012", --Mexico.
    --["DZ"] = "SWS082", --Middle East(Algeria/Syria/Yemen).
    --["QA"] = "SWS083", --Middle East(Iran/Lebanon/Qatar).
    --["KW"] = "PCVP_047", --Middle East(Egypt/Tunisia/Kuwait).
    --["TR"] = "PCVP_048", --Middle East(Turkey).
    --["AE"] = "PCVP_049", --Middle East(Saudi Arabia/United Arab Emirates).
    --["SA"] = "PCVP_049", --Middle East(Saudi Arabia/United Arab Emirates).
    --["RU"] = "3G43", --Russia.
    --["SG"] = "3G44", --Singapore.
    --["BR"] = "3G24", --Brazil.
    --["HK"] = "3G30", --Hong Kong.
    --["VN"] = "", --Viet Nam.
    --["EG"] = "PCVP_047", --Middle East(Egypt/Tunisia/Kuwait).
    --["NA"] = "", --SWS057, --North America. Should NOT be "Namibia" for Netgear Spec and Netgear production.
    --["GE"] = "", --Should be "Georgia". No translation string for now.
    --["ID"] = "3G33", --Indonesia.
    --["PH"] = "3G40" --Philippines.
}
--Mapping the ISO-3166 2-letters abbreviation(by ip location detected) to Netgear multi-language tag(for HTML) mapping.
--The second parameter is optional to choose different mapping for different Netgear shipping "sku". For now, the default is "PA" sku.("PA" sku can be regards as US+CA with ip location auto detected feature.)
--Note: RAX5 needs to support "PA" Sku(2022.05.11, please refer the e-mail, "[RAX5]SKU condolidation (NA to PAS)").
function getWifiRegion_mLangTag_Mapping( iso3166_2letters, nmrpSku )
    local mLang_mapping_table = nil
    if  (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
        mLang_mapping_table = wifiGuiRegion_NtgrMLangTag_PASku_Mapping --change this mapping if 2nd or more sku need to implement/support on RAX5.
    else
        mLang_mapping_table = wifiGuiRegion_NtgrMLangTag_PASku_Mapping --TODO: change this mapping if 2nd or more sku need to implement/support on RAX5.
    end

    for key, value in pairs(mLang_mapping_table) do
        if iso3166_2letters == key then
            return value
        end
    end

    log.force(__FUNCTION__()..":"..__LINE__()..", Can not find mLang tag for wifi region, uses default \"SWS006\"(\"Canada\") to instead of!")
    return "SWS006" --If not found any matched key, return nil.
end

--2022.06.09, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku) and MTK Multiple Sku(actually, it's "Multiple power table").
--Mapping table between Netgear Wireless GUI "Region" value and the wifi power the "wifiRegion" should use.(These two items followed Netgear requirement.)
--SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
local wifiGuiRegion_powerTableIndex_Mapping = {
    ["US"] = "2", --United State, mapping to "Sku_03.dat". And the "SkuTableIdx" in wifi dat file is 2.
    ["TW"] = "2", --Taiwan, mapping to "Sku_03.dat". And the "SkuTableIdx" in wifi dat file is 2.
    ["CA"] = "1" --Canada, mapping to "Sku_02.dat". And the "SkuTableIdx" in wifi dat file is 1.
}
--Mapping the Netgear wifi region(GUI item) and the corresponsing power table index that MTK driver will use.
function getPowerTableIndex_by_NtgrWifiRegion( Ntgr_wifiRegion )
    for key, value in pairs(wifiGuiRegion_powerTableIndex_Mapping) do
        if Ntgr_wifiRegion == key then
            return value
        end
    end
    return nil --If not found any matched key, return nil.
end

