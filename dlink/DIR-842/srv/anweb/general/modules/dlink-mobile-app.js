"use strict";!function(){function dLinkMobileAppAvailable(){return"undefined"!=typeof dlinkMobileApp}function getBrowserBridge(){return{"void":function(name){return function(){}},promise:function(name){return function(){return Promise.reject("not mobile app")}},withArgs:function(name,stringify){return function(arg){}},promiseWithArgs:function(name,stringify){return function(arg){return Promise.reject("not mobile app")}},isExist:function(name){return!1},customLocalDomainCheck:!1}}function getAndroidBridge(){return{"void":function(name){return function(){dlinkMobileApp[name]()}},promise:function(name){return function(){return Promise.resolve(dlinkMobileApp[name]())}},withArgs:function(name,stringify){return function(arg){var data=arg;stringify&&(data=JSON.stringify(arg)),dlinkMobileApp[name](data)}},promiseWithArgs:function(name,stringify){return function(arg){var data=arg;return stringify&&(data=JSON.stringify(arg)),Promise.resolve(dlinkMobileApp[name](data))}},isExist:function(name){return"undefined"!=typeof dlinkMobileApp[name]},customLocalDomainCheck:!0}}function getIosBridge(){function callNativeIOS(methodName,params){return new Promise(function(resolve,reject){var promiseId=generateUUID();promises[promiseId]={resolve:resolve,reject:reject};try{params.promiseId=promiseId,window.webkit.messageHandlers[methodName].postMessage(params)}catch(exception){reject("error while calling native function")}})}function generateUUID(){var d=(new Date).getTime(),uuid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=(d+16*Math.random())%16|0;return d=Math.floor(d/16),("x"==c?r:3&r|8).toString(16)});return uuid}return{"void":function(name){return function(){window.webkit.messageHandlers[name].postMessage({})}},promise:function(name){return function(){return callNativeIOS(name,{})}},withArgs:function(name,stringify){return function(arg){window.webkit.messageHandlers[name].postMessage(arg)}},promiseWithArgs:function(name,stringify){return function(arg){return callNativeIOS(name,{data:arg})}},isExist:function(name){return"undefined"!=typeof window.webkit.messageHandlers[name]},customLocalDomainCheck:!1}}var mobileAppModule=angular.module(regdep("dlink-mobile-app"),[]);mobileAppModule.service("mobileapp",["$rootScope","$injector",function($rootScope,$injector){function radioToAccessPoint(radio){if("undefined"!=typeof radio){var accessPoint={};if(radio.AccessPoint){accessPoint.frequency=radio.OperatingFrequencyBand;var firstAccessPoint=radio.AccessPoint[1];if(firstAccessPoint)return accessPoint.index=1,accessPoint.ssid=firstAccessPoint.SSID,accessPoint.password=firstAccessPoint.Security.PreSharedKey,accessPoint.broadcast=firstAccessPoint.Broadcast,accessPoint}}}function saveWrapperForIpChangedFunc(ipConfig){var funcName="ipAddressChangedAdvanced";current.isExist(funcName)&&current.withArgs(funcName,!0)(ipConfig)}function saveWrapperForDomainNameFunc(domainName){var funcName="domainNameChanged";current.isExist(funcName)&&current.withArgs(funcName,!1)(domainName)}function getValue(key){var funcName="getValue";return current.isExist(funcName)?current.promiseWithArgs("getValue",!1)(key):Promise.reject("function does not exist")}function saveValue(key,value){var funcName="saveValue";if(current.isExist(funcName)){var data={};data.key=key,data.value=value,current.withArgs("saveValue",!0)(data)}}var current;current=/DRCU\/IOS/i.test(navigator.userAgent)?getIosBridge():dLinkMobileAppAvailable()?getAndroidBridge():getBrowserBridge();var allServicesAvailable=$injector.has("translate")&&$injector.has("devinfo")&&$injector.has("systemUtil")&&$injector.has("snackbars");if(dLinkMobileAppAvailable()&&allServicesAvailable){var translate=$injector.get("translate"),devinfo=$injector.get("devinfo"),util=$injector.get("systemUtil"),snackbars=$injector.get("snackbars");dlinkMobileApp.askUserToChangeLanguage=function(message,userLanguageCode){devinfo.once("version").then(function(result){var langList="eng chs cht kor rus spa";if(result.lang!==userLanguageCode&&langList.indexOf(userLanguageCode)>=0)if(confirm(message)){var lang=userLanguageCode,overlay=$rootScope.overlay.circular,overlayId=overlay.start();util.changeLang(lang).then(translate.changeLanguage.bind(translate,lang))["catch"](snackbars.add.bind(snackbars,translate("sysconfig_change_lang_error")))["finally"](overlay.stop.bind(overlay,overlayId))}else current["void"]("userRefuseToChangeLanguage")()})}}return{isUserInMobileApp:function(){return dLinkMobileAppAvailable()},closeWebInterface:current["void"]("exit"),openWifiSettings:current["void"]("openWifiSettings"),askUserToLogout:current["void"]("askUserToLogout"),deviceResetStarted:current["void"]("deviceReset"),isPhoneConnectedToRouter:current.promise("isPhoneConnectedToRouter"),isNotificationsBlocked:current.promise("isNotificationsBlocked"),ipAddressChanged:current.withArgs("ipAddressChanged",!1),hasAdvancedIpAddressChanged:current.isExist("ipAddressChangedAdvanced"),ipAddressChangedAdvanced:current.withArgs("ipAddressChangedAdvanced",!0),updatePassword:current.withArgs("updatePassword",!0),wifiConnectionChanged:function(platformFunc){return function(newWifiSettings){if("undefined"==typeof newWifiSettings)return Promise.reject("no new wifi settings");if("undefined"==typeof newWifiSettings.ProfileId)return Promise.reject("no profile id");if("undefined"==typeof newWifiSettings.SSID)return Promise.reject("no ssid");if("undefined"==typeof newWifiSettings.Frequency)return Promise.reject("no frequency");"undefined"==typeof newWifiSettings.PreSharedKey&&(newWifiSettings.PreSharedKey=null);var converted={index:newWifiSettings.ProfileId,ssid:newWifiSettings.SSID,password:newWifiSettings.PreSharedKey,frequency:newWifiSettings.Frequency};return platformFunc(JSON.stringify(converted)),Promise.resolve()}}(current.withArgs("wifiPointChanged",!1)),getCredentials:function(promiseFunc){return function(){return promiseFunc().then(function(data){var credentials=JSON.parse(data);return"undefined"==typeof credentials?Promise.reject("credentials undefined"):"undefined"==typeof credentials.username?Promise.reject("credentials.username undefined"):"undefined"==typeof credentials.password?Promise.reject("credentials.password undefined"):Promise.resolve(credentials)})}}(current.promise("getCredentials")),isDomainNameUsing:current.promise("isDomainNameUsing"),customLocalDomainCheck:current.customLocalDomainCheck,wizardCompleted:function(passwordFunc,wifiFunc,ipAddressFunc,domainNameFunc){return function(_native){if(dLinkMobileAppAvailable()){var config=_native.Config;if(config.SystemPassword){var passwords={};passwords.username=config.SystemPassword.Login,passwords.password=config.SystemPassword.Password,passwordFunc(passwords)}if(config.WiFi&&config.WiFi.Radio){var point=radioToAccessPoint(config.WiFi.Radio[1]);point&&wifiFunc(JSON.stringify(point)),point=radioToAccessPoint(config.WiFi.Radio[2]),point&&wifiFunc(JSON.stringify(point))}if(config.LAN&&config.LAN[1]){var domainName,ip=config.LAN[1].IPv4;ip.StaticIP[1]&&ip.StaticIP[1].AddnHostname&&(domainName=ip.StaticIP[1].AddnHostname,domainNameFunc(domainName));var converted={disconnect:!1,save:!0,mask:null};"Static"===ip.AddressingMode&&ip.StaticIP[1]?(converted.address=ip.StaticIP[1].Address,converted.mask=ip.StaticIP[1].SubnetMask,ipAddressFunc(converted)):"Dynamic"===ip.AddressingMode&&domainName&&(converted.address=domainName,ipAddressFunc(converted))}}}}(current.withArgs("updatePassword",!0),current.withArgs("wifiPointChanged",!1),saveWrapperForIpChangedFunc,saveWrapperForDomainNameFunc),getValue:getValue,saveValue:saveValue,hasSaveValueFunc:current.isExist("saveValue"),hasGetValueFunc:current.isExist("getValue")}}]).run(["$rootScope","mobileapp",function($rootScope,mobileapp){$rootScope.dlinkMobileApp=mobileapp}])}();