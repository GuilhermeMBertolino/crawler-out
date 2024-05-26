"use strict";!function(){angular.module(regdep("wifiScan"),["devinfo","device"]).service("wifiScan",["devinfo","funcs",function(devinfo,funcs){function getTemplate(){return funcs.deepClone(template)}function getPoints(data,path){var list=funcs.fetchBranch(data[path],path);return Object.values(funcs.newConfig.normalize(list))}function normalize(list){return list.filter(function(obj){return obj.SSID}).map(function(obj){return{SSID:obj.SSID,BSSID:obj.BSSID,Mode:obj.Mode,Channel:obj.Channel,AdvancedChannel:obj.AdvancedChannel,ModeEnabled:getMode(obj.ModeEnabled),EncryptionType:"TKIPAES"==obj.EncryptionType?"TKIP+AES":obj.EncryptionType,SignalStrength:obj.SignalQuality,Band:obj.OperatingFrequencyBand}})}function getMode(mode){var modes={OPEN:"None",SHARED:"None","WEP-64":"WEP-64","WEP-128":"WEP-128",WPAPSK:"WPA-Personal",WPA2PSK:"WPA2-Personal",WPAPSKWPA2PSK:"WPA-WPA2-Personal",WPA:"WPA-Enterprise",WPA2:"WPA2-Enterprise",WPA1WPA2:"WPA-WPA2-Enterprise",WEP:"WEP",WPA3SAE:"WPA3",WPA2PSKWPA3SAE:"WPA2-WPA3"};return modes[mode]}var template=null,constants={TIMEOUT:6e4,CONFIG_WIFI_SITES:"Device.Statistics.WiFi.Radio.1.SiteSurvey.",CONFIG_WIFI_SITES_5G:"Device.Statistics.WiFi.Radio.2.SiteSurvey.",CONFIG_MODES:"Device.WiFi.APProfile.1.Security.ModesSupported"};return{pullInfo:function(){return devinfo.once([constants.CONFIG_MODES].join("|")).then(function(response){var modesRaw=funcs.fetchBranch(response[constants.CONFIG_MODES],constants.CONFIG_MODES).split(","),modes=_.chain(modesRaw).map(function(o){return getMode(o)}).compact().value().join(",");template={Band:"2.4GHz",Security:{ModesSupported:modes,ModeEnabled:"None",EncryptionType:"AES",WEPKey1:"",WEPKey2:"",WEPKey3:"",WEPKey4:"",OpenWEP:!1,OpenWEPType:"WEP-64",DefaultKeyID:1,WEPasHEX:!1}}})},pullScan:function(){return new Promise(function(resolve){function handler(data){var list=zones.reduce(function(points,path){return data[path]?points.concat(getPoints(data,path)):points},[]);resolve(normalize(list))}var zones=[constants.CONFIG_WIFI_SITES,constants.CONFIG_WIFI_SITES_5G];devinfo.once(zones.join("|"),{timeout:constants.TIMEOUT}).then(handler)})},getTemplate:getTemplate}}])}();