jQuery.su.moduleManager.define("wirelessSettingsAdv",{services:["moduleLoader","moduleManager","device"],views:["wirelessSettingsAdvView"],listeners:{ev_on_launch:function(e,s,i,d,l,r,t){switch(t.device.getCurrentMode()){case"client":case"repeater":s.loadModule("wirelessRepeater");break;case"multissid":s.loadModule("wirelessMultissid");break;default:s.loadModule("wirelessRouter",function(){var e=t.moduleManager.get("wirelessRouter");e.setMode(e.MODE.ADVANCED)})}}}},function(e,i,s,d,l,r){return{loadModule:function(e,s){r.moduleLoader.load({module:"wirelessSettingsAdv"},{module:e},i.wirelessSettingsAdvView.wirelessSettingsLoader,function(){s&&s()})}}});