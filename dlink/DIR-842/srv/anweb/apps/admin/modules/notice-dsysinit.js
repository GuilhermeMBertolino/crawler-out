"use strict";angular.module(regdep("notice"),[]).service("notice",["$rootScope","$state","devinfo","funcs","translate","systemActionService","navigationFilter","cpe",function($rs,$state,devinfo,funcs,translate,systemAction,navFilter,cpe){function update(notice){function callActions(list){flags.resume=!0;var seq=_.reduce(list,function(p,action){return p.then(function(){return action()})},Promise.resolve());return seq.then(function(){return flags.resume=!1})}function checkMobileAppSettings(){flags.mobileAppSettingsChecked||($rs.dlinkMobileApp.isUserInMobileApp()?$rs.dlinkMobileApp.isNotificationsBlocked().then(function(blocked){flags.mobileAppSettingsChecked=!0,flags.mobileAppFwUpdateBlocked=blocked}):flags.mobileAppSettingsChecked=!0)}function hasNotice(notifications,notice){return _.some(notifications,function(e){return e.name==notice.name})}if(notice&&!flags.resume){var notificationsList=function(notice,noticeConfig,navRules){function addNotice(list,notice){notice&&list.push(notice)}function makeFirmwareRemoteUpdateNotice(notice,noticeConfig,navRules){var updateStatus=notice.updateStatus;if(!updateStatus||"Available"!=updateStatus)return null;var output=noticeConfig.FirmwareRemoteUpdate;return output.params={updateVersion:notice.updateVersion,updateURL:notice.updateURL,updateMD5:notice.updateMD5},output.actions[0].params=output.params,output}function getModemName(modem,key){return modem.Internal?translate("wan_modem")+" "+key:modem.Vendor+" "+modem.Model}var output=[];return addNotice(output,function(notice,noticeConfig,name){return notice[name]?noticeConfig[name]:null}(notice,noticeConfig,"DebugMode")),addNotice(output,function(notice,noticeConfig){var systemNotice=notice.systemNotice;return systemNotice?"NeedSaveAndReboot"==systemNotice?noticeConfig.NeedSaveAndReboot:"NeedImmediateReboot"==systemNotice?noticeConfig.NeedImmediateReboot:"NeedSave"==systemNotice?noticeConfig.NeedSave:null:null}(notice,noticeConfig)),checkMobileAppSettings(),flags.mobileAppSettingsChecked&&!flags.mobileAppFwUpdateBlocked&&addNotice(output,makeFirmwareRemoteUpdateNotice(notice,noticeConfig,navRules)),output=output.concat(function(notice,noticeConfig){var noticeCfg=[],factoryNotice=notice.factoryNotice;return _.each(factoryNotice,function(ntc,key){if(ntc){var cfg=noticeConfig[key];noticeCfg.push(cfg)}}),noticeCfg}(notice,noticeConfig)),addNotice(output,function(notice,noticeConfig){if(!notice.unreadMessages)return null;var noticeCfg=noticeConfig.unreadMessages;return notice.unreadMessagesList&&0!=notice.unreadMessagesList.length?(noticeCfg.actions=_.map(notice.unreadMessagesList,function(elem){return{icon:"go_to_page",text:translate("usb_modem_sms_you_have_unread_messages_read")+" "+getModemName(elem.modem,elem.inx)+" ("+elem.unread+")",primary:!0,handler:function(){$state.go("settings.usbmodem.sms",{modem:elem.inx,param:"sms"})}}}),noticeCfg):noticeCfg}(notice,noticeConfig)),addNotice(output,function(notice,noticeConfig){if(!notice.needEnterPINPUK)return null;var noticeCfg=noticeConfig.needEnterPINPUK;return notice.PINPUKModemList&&0!=notice.PINPUKModemList.length?(noticeCfg.actions=_.map(notice.PINPUKModemList,function(elem){return{icon:"go_to_page",text:getModemName(elem.modem,elem.inx)+": "+translate("notice_need_enter_pin_enter")+" "+elem.state,primary:!0,handler:function(){$state.go("settings.usbmodem.basic",{modem:elem.inx})}}}),noticeCfg):noticeCfg}(notice,noticeConfig)),_.each(function(notice,noticeConfig){function groupIfaces(ifaces,type){var output={};return _.each(ifaces,function(elem){var netFuncs="v4"==type?funcs.ipv4:funcs.ipv6,changeKey=!1,index=_.findKey(output,function(obj,key){var keyNetwork,elemNetwork,keyAddr=key.split("/"),elemAddr=elem.addr.split("/");return"v4"==type?(keyNetwork={ip:keyAddr[0],mask:netFuncs.mask["long"](keyAddr[1])},elemNetwork={ip:elemAddr[0],mask:netFuncs.mask["long"](elemAddr[1])}):(keyNetwork={ip:keyAddr[0],prefix:keyAddr[1]},elemNetwork={ip:elemAddr[0],prefix:elemAddr[1]}),netFuncs.subnet.containsNetwork(elemNetwork,keyNetwork)?!0:netFuncs.subnet.containsNetwork(keyNetwork,elemNetwork)?(changeKey=!0,!0):!1});index?(output[index].push({iface:elem.iface,type:elem.type,group:elem.groupId,groupName:elem.groupName}),changeKey&&(output[elem.addr]=funcs.deepClone(output[index]),delete output[index])):output[elem.addr]=[{iface:elem.iface,type:elem.type,group:elem.groupId,groupName:elem.groupName}]}),output}function checkLANOverlap(notice,type){var lans=_.where(notice,{type:"lan"}),output=groupIfaces(lans,type),lanOverlap=_.some(output,function(gr){var groups=_.pluck(gr,"group"),diffGroups=_.difference(groups);return diffGroups.length>1});if(lanOverlap){var noticeCfg=noticeConfig.overlappingMultiLAN;return noticeCfg.params={ipv4:"v4"==type,ipv6:"v6"==type},noticeCfg.actions[0].params=noticeCfg.params,noticeCfg}}var status=notice.overlappingSubnetsv4&&notice.overlappingSubnetsv4.length||notice.overlappingSubnetsv6&&notice.overlappingSubnetsv6.length;if(!status)return{};var result={ipv4:{},ipv6:{}},outConfig=[];if(notice.overlappingSubnetsv4.length){outConfig.push(checkLANOverlap(notice.overlappingSubnetsv4,"v4"));var groups=_.groupBy(notice.overlappingSubnetsv4,"groupId");_.each(groups,function(obj,groupKey){result.ipv4[groupKey]=groupIfaces(obj,"v4")})}if(notice.overlappingSubnetsv6.length){outConfig.push(checkLANOverlap(notice.overlappingSubnetsv6,"v6"));var groups=_.groupBy(notice.overlappingSubnetsv6,"groupId");_.each(groups,function(obj,groupKey){result.ipv6[groupKey]=groupIfaces(obj,"v6")})}return _.each(result,function(elem,key){_.each(elem,function(obj,grKey){outConfig=outConfig.concat(_.map(obj,function(grIface,grAddr){if(!(grIface.length<2)){var output,types=_.pluck(grIface,"type");if(output=_.contains(types,"lan")?_.contains(types,"wan")?noticeConfig.overlappingWANLAN:noticeConfig.overlappingLAN:noticeConfig.overlappingMultiWAN)return output.params={ipv4:"ipv4"==key,ipv6:"ipv6"==key},output.actions[0].params=output.params,output}}))})}),_.compact(outConfig)}(notice,noticeConfig),function(elem){addNotice(output,elem)}),output}(notice,noticeConfig,navRules),actionsList=function(notice,actionsConfig,navRules){function addAction(list,action){action&&list.push(action)}function makeNeedChangeDefault(notice,actionsConfig){var systemNotice=notice.systemNotice,params={needChangePass:"NeedChangePass"==systemNotice};return params.needChangeSSID24=notice.factorySettings?notice.needChangeSSID24:"NeedChangePass"==systemNotice&&notice.needChangeSSID24,params.needChangeSSID5=notice.factorySettings?notice.needChangeSSID5:"NeedChangePass"==systemNotice&&notice.needChangeSSID5,_.some(params,function(v){return v})?actionsConfig.needChangeDefault.bind(actionsConfig,params):null}var output=[],rules=navFilter.rules();return rules.HideChangePasswordDialog||addAction(output,makeNeedChangeDefault(notice,actionsConfig)),output}(notice,actionsConfig,navRules),newNotifications=function(currentNotifications,compareNotifications){return compareNotifications.length?_.filter(currentNotifications,function(notice){return!hasNotice(compareNotifications,notice)}):currentNotifications}(notificationsList,notifications),oldNotifications=function(currentNotifications,compareNotifications){return currentNotifications.length?_.filter(compareNotifications,function(notice){return!hasNotice(currentNotifications,notice)}):compareNotifications}(notificationsList,notifications);oldNotifications.length&&$rs.$emit("notification-remove",oldNotifications),newNotifications.length&&$rs.$emit("notification",newNotifications),notifications=notificationsList,actionsList.length&&callActions(actionsList)}}var navRules=navFilter.rules()||{},updateMacIcon=autoconf.BR2_PACKAGE_ANWEB_SWITCH?"need_update_mac_sw":"need_update_mac",noticeConfig={NeedSave:{name:"Save",priority:100,getDescription:function(){return"notice_save_desc"},actions:[{icon:"save",primary:!0,text:"act_save",handler:function(){var overlay=$rs.overlay.circular,overlayId=overlay.start();return cpe.SaveConfig()["finally"](overlay.stop.bind(overlay,overlayId))}},{icon:"arrow-revert",primary:!1,text:"act_cancel",handler:function(){return confirm(translate("notification_reset_changes_confirm"))?systemAction.reboot():void 0}}]},NeedSaveAndReboot:{priority:100,name:"saveAndReboot",icon:"save_and_reboot",getDescription:function(){return"notice_save_and_reboot_desc"},actions:[{icon:"apply",primary:!0,name:"saveAndReboot",text:"act_reboot",handler:function(){return confirm(translate("notice_save_and_reboot_confirm"))?systemAction.reboot():void 0}}]},NeedImmediateReboot:{priority:100,name:"immediateReboot",icon:"reboot",getDescription:function(){return"notice_necessary_reboot"},actions:[{icon:"apply",primary:!0,name:"immediateReboot",text:"act_reboot",handler:function(){return confirm(translate("notice_save_and_reboot_confirm"))?systemAction.reboot():void 0}}]},FirmwareRemoteUpdate:{name:"FirmwareRemoteUpdate",priority:10,getDescription:function(){return translate("notice_fwupdate_available_desc")+" "+this.params.updateVersion+" "+translate("notice_fwupdate_available_desc2")},icon:"firmware_remote_update",actions:[{icon:"apply",text:"notice_fwupdate_available_title",primary:!0,handler:function(){return confirm(translate("firmware_update_confirm"))?systemAction.remoteUpdate(this.params.updateURL,this.params.updateMD5):void 0}}]},needUpdateMAC:{name:"needUpdateMac",priority:101,getDescription:function(){return translate("notice_need_update_mac")},icon:updateMacIcon},needUpdateHW:{name:"needUpdateHW",priority:101,getDescription:function(){return translate("notice_need_update_hw")},icon:updateMacIcon},needUpdateCountryCode:{name:"needUpdateCountryCode",priority:101,getDescription:function(){return translate("notice_need_update_country_code")},icon:updateMacIcon},needUpdatePIN:{name:"needUpdatePIN",priority:101,getDescription:function(){return translate("notice_need_update_pin")},icon:updateMacIcon},needUpdateSerialNumber:{name:"needUpdateSerialNumber",priority:101,getDescription:function(){return translate("notice_need_update_serial_number")},icon:updateMacIcon},overlappingWANLAN:{name:"overlappingWANLAN",priority:5,getDescription:function(){return translate("notice_wan_intersected_subnet_desc")},actions:[{icon:"go_to_page",text:"notice_enable_go",primary:!0,handler:function(){var stateName=this.params.ipv6?"edit_ipv6":"edit";$state.go("settings.lan."+stateName,{data:null,inx:1})}}]},overlappingMultiWAN:{name:"overlappingMultiWAN",priority:5,getDescription:function(){return translate("notice_multi_wan_subnet_desc")},actions:[{icon:"go_to_page",text:"notice_enable_go",primary:!0,handler:function(){"settings.internet.wan.info"!=!$state.current.name&&$state.go("settings.internet.wan.info")}}]},overlappingMultiLAN:{name:"overlappingMultiLAN",priority:5,getDescription:function(){return translate("notice_multi_lan_subnet_desc")},actions:[{icon:"go_to_page",text:"notice_enable_go",primary:!0,handler:function(){var stateName=this.params.ipv6?"edit_ipv6":"edit";$state.go("settings.lan."+stateName,{data:null,inx:1})}}]},overlappingLAN:{name:"overlappingLAN",priority:5,getDescription:function(){return translate("notice_lan_intersected_subnet_desc")},actions:[{icon:"go_to_page",text:"notice_enable_go",primary:!0,handler:function(){var stateName=this.params.ipv6?"edit_ipv6":"edit";$state.go("settings.lan."+stateName,{data:null,inx:1})}}]},unreadMessages:{name:"unreadMessages",priority:8,getDescription:function(){return translate("usb_modem_sms_you_have_unread_messages")},icon:"unread_mess"},needEnterPINPUK:{name:"needEnterPINPUK",priority:7,getDescription:function(){return translate("dcc_sim_blocked")},icon:"sim_card"},DebugMode:{name:"DebugMode",priority:102,getDescription:function(){return translate("notice_debug_mode_desc")},icon:"notice"},PaktError:{name:"PaktError",priority:102,getDescription:function(){return translate("dcc_pakt_error")+": "+translate("dcc_pakt_error_code")+" - 0"+this.params.paktCode},icon:"notice"}},actionsConfig={needChangeDefault:function(params){return systemAction.changeDefaultParams(params)}},notifications=[],flags={resume:!1,mobileAppSettingsChecked:!1,mobileAppFwUpdateBlocked:!1};return{start:function(){devinfo.onceAndSubscribe("notice",update)},stop:function(){devinfo.unsubscribe("notice",update)}}}]).run(["notice",function(notice){notice.start()}]);