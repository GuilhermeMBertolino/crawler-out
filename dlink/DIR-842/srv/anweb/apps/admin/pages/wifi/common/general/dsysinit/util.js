"use strict";!function(){angular.module("app").service("wifiGeneralUtil",["device","cpe","funcs","devinfo",function(device,cpe,funcs,devinfo){return{subscribeChannelsInfo:function(cb,$scope){devinfo.collect.subscribe("Device.Statistics.WiFi.Radio.*.Channel|Device.Statistics.WiFi.Radio.*.CrossLink|Device.WiFi.Radio.*.OperatingFrequencyBand",function(response){var output;response&&response.collect&&(output={},_.each(funcs.fetchBranch(response.collect,"Device.Statistics.WiFi.Radio."),function(elem){var band=funcs.fetchBranch(response.collect,elem.CrossLink).OperatingFrequencyBand;"2.4GHz"==band?output.Current_channel=elem.Channel:output["5G_Current_channel"]=elem.Channel}),cb&&cb(output))},$scope)},startReselectChan:function(freq){return cpe.GetParameterValues(["Device.WiFi.Radio.*.OperatingFrequencyBand"],null,!0).then(function(response){var _i,_Object$keys,config=funcs.buildTree(response.result.ParameterList),radio=funcs.fetchBranch(config,"Device.WiFi.Radio.");for(_i=0,_Object$keys=Object.keys(radio);_i<_Object$keys.length;_i++){var key=_Object$keys[_i];if(radio[key].OperatingFrequencyBand==freq)return cpe.Execute("Device.WiFi.Radio.".concat(key,".AutoChannelRefresh"),void 0)}return Promise.reject()})}}}])}();