var getDeviceSettings=new SOAPGetDeviceSettingsResponse();function ModelInfo(a,c,b){this.modelName=a;this.hwVer=c;this.fwVer=b}function getDeviceInfo(){var a=$.Deferred();var b=new SOAPAction();b.sendSOAPAction("GetDeviceSettings",null,getDeviceSettings).done(function(d){var e=d.LatestFirmwareVersion;if(e==""||e=="."){e=0}var c=new ModelInfo(d.ModelName,d.HardwareVersion,d.FirmwareVersion);sessionStorage.setItem("modelInfomation",JSON.stringify(c));sessionStorage.setItem("currentFWVersion",d.FirmwareVersion);sessionStorage.setItem("newFWVersion",e);a.resolve()}).fail(function(){a.reject()});return a.promise()}function setLang(){var a=new Array("en-us","zh-tw","zh-cn","ko-kr","fr-fr","pt-br","es-es","it-it","de-de","ru-ru");try{var e=localStorage.getItem("language");if(e==null){e="en-us";var d=null;if(navigator.appName=="Netscape"){d=navigator.language}else{d=navigator.browserLanguage}d=d.toLowerCase();for(var c=0;c<a.length;c++){if(d==a[c]){e=d}}localStorage.setItem("language",e)}InitLANG(e)}catch(b){if(b.code===DOMException.QUOTA_EXCEEDED_ERR&&localStorage.length===0){alert(I18N("j","The Private Browsing feature of Safari is incompatible with this device's interface. You will need to disable Private Browsing to log in."))}throw b}}function initEnv(){var a=$.Deferred();var b=getDeviceInfo();$.when(b).done(function(){a.resolve()}).fail(function(){a.reject()});setLang();return a.promise()};