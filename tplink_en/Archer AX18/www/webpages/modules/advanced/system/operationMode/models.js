!function(a){a.su.modelManager.define("operationModeModel",{type:"model",fields:[{name:"support"},{name:"mode"}],proxy:{url:a.su.url("/admin/system?form=sysmode")}}),a.su.modelManager.define("operationModeControlModel",{type:"model",fields:[{name:"homeShieldConfirmMsg"},{name:"rebootConfirmMsg"},{name:"switchFailMsg"},{name:"rebootMsg"},{name:"rebootProgress"},{name:"domain"}]}),a.su.storeManager.define("operationModeStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"},{name:"content"},{name:"checked"}],data:function(){var e,o=[],n=a.su.serviceManager.get("device").getConfig().supportOperationMode,t={router:{boxlabel:a.su.CHAR.OPERATION_MODE.WIRELESS_ROUTER_MODE,value:"router",content:".router-mode-intro"},ap:{boxlabel:a.su.CHAR.OPERATION_MODE.ACCESS_POINT_MODE,value:"ap",content:".ap-mode-intro"},repeater:{boxlabel:a.su.CHAR.OPERATION_MODE.RE_MODE,value:"repeater",content:".re-mode-intro"},client:{boxlabel:a.su.CHAR.OPERATION_MODE.CLIENT_MODE,value:"client",content:".client-mode-intro"},multissid:{boxlabel:a.su.CHAR.OPERATION_MODE.SSID_MODE,value:"multissid",content:".multissid-mode-intro"}};for(e in n)o.push(t[n[e]]);return o}()})}(jQuery);