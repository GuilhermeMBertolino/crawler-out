!function(o){o.su.moduleManager.define("iptvAdv",{services:["moduleLoader","moduleManager"],models:["iptvVlan","iptvUdpModel"],deps:["iptvVlanAdv"],views:["iptvAdvView"],listeners:{ev_on_launch:function(e,i,t,n,a,l,p){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvVlanAdv",view:"iptvVlanView"},t.iptvAdvView.iptvVlanLoader,function(){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvMultiAdv"},t.iptvAdvView.iptvMultiLoader,function(){var e=p.moduleManager.get("iptvVlanAdv");e.setMode(e.MODE.ADVANCED),e.startup()}),!0===o.su.serviceManager.get("device").getConfig().supportUdpProxy?(t.iptvAdvView.iptvUdpPanel.show(),p.moduleLoader.load({module:"iptvAdv"},{module:"iptvUdp"},t.iptvAdvView.iptvUdpLoader,function(){})):t.iptvAdvView.iptvUdpPanel.hide()})}},init:function(n,a,l,e,p,i){this.configViews({id:"iptvAdvView",items:[{id:"iptv-vlan-loader"},{id:"iptv-multi-loader"},{id:"iptv-udp-loader"}]}),this.control({".index-common-save-btn":{ev_will_auto_save:function(e,i){var t;i.preventDefault(),l.iptvVlan.validate()&&l.iptvUdpModel.validate()&&(l.iptvUdpModel.isDirty()&&l.iptvUdpModel.submit(),i=!l.iptvVlan.iptvAllowLanNoInternet.getValue()||!1,p.iptvVlanAdv.vidSame()&&l.iptvVlan.isDirty()&&(t=n.isNoInternetLan(),!i&&t?a.iptvAdvView.changeSingleInternetMsg.show():p.iptvVlanAdv.atLeastOne()&&n.submitIptvData()))}},"#change-single-internet-msg":{ev_msg_ok:function(e){n.submitIptvData()}}}),this.listen()}},function(e,i,t,n,a,l){return{submitIptvData:function(){t.iptvVlan.submit({success:function(e){e.cfg_changed&&i.iptvAdvView.iptvRebootMsg.show(function(){i.iptvAdvView.iptvRebootProgress.animate({duration:15e3,percentageStart:0,percentageEnd:100,callback:function(){i.iptvAdvView.iptvRebootMsg.hide()}})})}})},isNoInternetLan:function(){for(var e=t.iptvVlan.portSettings.getValue(),i=0;i<e.length;i++)if("Internet"==e[i].type)return!1;return!0}}})}(jQuery),$.su.modelManager.define("iptvVlan",{type:"model",fields:[{name:"enable"},{name:"mode"},{name:"internetVid",mapping:"internet_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"internetVprio",mapping:"internet_vprio"},{name:"internetTag",mapping:"internet_tag"},{name:"iptvTag",mapping:"iptv_tag"},{name:"ipphoneVid",mapping:"ipphone_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"ipphoneVprio",mapping:"ipphone_vprio"},{name:"iptvVid",mapping:"iptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"iptvVprio",mapping:"iptv_vprio"},{name:"mciptvVid",mapping:"mciptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"mciptvVprio",mapping:"mciptv_vprio"},{name:"mciptvEnable",mapping:"mciptv_enable"},{name:"cfg_changed"},{name:"igmp_enable"},{name:"igmp_snooping_enable",defaultValue:"on"},{name:"igmp_fast_leave"},{name:"igmp_version"},{name:"qos_iptv_compatible"},{name:"wait_time"},{name:"configure"},{name:"internetItem",mapping:"internet_item"},{name:"iptvItem",mapping:"iptv_item"},{name:"ipphoneItem",mapping:"ipphone_item"},{name:"mciptvItem",mapping:"mciptv_item"},{name:"seltype"},{name:"portSettings",mapping:"port_settings"},{name:"supportModeList",mapping:"support_mode_list"},{name:"iptvAllowLanNoInternet",mapping:"iptv_allow_lan_no_internet"},{name:"iptvAllowLanConfigure",mapping:"iptv_allow_lan_configure"}],serialize:function(e){return e.port_settings=JSON.stringify(e.port_settings),e},proxy:{url:$.su.url("/admin/iptv?form=setting")}}),$.su.storeManager.define("lanPortStore",{keyProperty:"name",fields:[{name:"name"},{name:"type"}]}),jQuery.su.moduleManager.define("iptvMultiAdv",{models:["iptvVlan"],stores:["iptvVersionStore"],services:["device"],views:["iptvMultiView"],listeners:{ev_on_launch:function(e,i,t,n,a,l,p){1!=p.device.getConfig().supportIGMPFastLeave&&n.iptvVlan.igmp_fast_leave.hide()}},init:function(e,i,t,n,a,l){}},function(e,i,t,n,a,l){return{}}),jQuery,$.su.storeManager.define("iptvVersionStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.V_2,value:"2",boxlabel:"version2"},{name:$.su.CHAR.NETWORK_IPTV.V_3,value:"3",boxlabel:"version3"}]}),jQuery.su.moduleManager.define("iptvUdp",{models:["iptvUdpModel"],views:["iptvUdpView"],listeners:{ev_on_launch:function(e,i,t,n,a,l,p){n.iptvUdpModel.load()}},init:function(e,i,n,t,a,l){this.control({}),this.listen({"models.iptvUdpModel.udp_proxy_enable":{ev_value_change:function(e,i,t){"on"==i?n.iptvUdpModel.udp_proxy.enable():n.iptvUdpModel.udp_proxy.disable()}}})}},function(e,i,t,n,a,l){return{}}),jQuery,$.su.modelManager.define("iptvUdpModel",{type:"model",fields:[{name:"udp_proxy_enable"},{name:"udp_proxy",defaultValue:4022,vtype:{vtype:"number",min:1024,max:65535}}],proxy:{url:$.su.url("/admin/iptv?form=udp_proxy_setting")}}),function(r){r.su.moduleManager.define("iptvVlanAdv",{services:["device","ajax"],models:["iptvVlan","lanAdvLinkAggModel","quickSetupModel","qsSummaryModel"],stores:["modeStore","lanStore","lanPortStore","lanPriorityStore","iptvVlanStore"],views:["iptvVlanView"],listeners:{ev_on_launch:function(e,i,t,n,a,l,p){"KR"===p.device.getConfig().country&&i.handleKRSet()}},init:function(a,l,p,o,e,v){v.device.getLanAgg()&&p.lanAdvLinkAggModel.load(),this.listen({"models.iptvVlan.enable":{ev_value_change:function(e,i,t){p.iptvVlan.mode.hide(),l.iptvVlanView.iptvConfigWrap.hide();var n=p.iptvVlan.mode.getValue();("on"==i||a.getMode()===a.MODE.QUICK_SETUP&&"none"!==n)&&(p.iptvVlan.mode.show(),p.iptvVlan.mode.setValue(n),l.iptvVlanView.iptvConfigWrap.show())}},"models.iptvVlan.mode":{ev_value_change:function(e,i,t){var n=a.getMode();"none"==i?l.iptvVlanView.iptvConfigWrap.hide():("none"==t&&n==a.MODE.QUICK_SETUP&&l.iptvVlanView.iptvConfigWrap.show(),i!=t&&null!=t&&v.ajax.request({proxy:"iptvProxy",data:{operation:"change",isp:i},success:function(e){e.enable=p.iptvVlan.enable.getValue(),e.mode=p.iptvVlan.mode.getValue(),p.iptvVlan.replaceData(e,!0)}}))}},"models.iptvVlan.mciptvEnable":{ev_value_change:function(e,i,t){"on"==i?(p.iptvVlan.mciptvVid.enable(),p.iptvVlan.mciptvVprio.enable()):(p.iptvVlan.mciptvVid.disable(),p.iptvVlan.mciptvVprio.disable())}},"models.iptvVlan.internetTag":{ev_value_change:function(e,i,t){"on"==i?(p.iptvVlan.internetVid.enable(),p.iptvVlan.internetVprio.enable()):(p.iptvVlan.internetVid.disable(),p.iptvVlan.internetVprio.disable(),"off"==p.iptvVlan.iptvTag.getValue()&&p.iptvVlan.iptvTag.setValue("on"))}},"models.iptvVlan.iptvTag":{ev_value_change:function(e,i,t){"on"==i?(p.iptvVlan.iptvVid.enable(),p.iptvVlan.iptvVprio.enable(),p.iptvVlan.mciptvEnable.enable(),p.iptvVlan.mciptvEnable.setTips("")):(p.iptvVlan.iptvVid.disable(),p.iptvVlan.iptvVprio.disable(),p.iptvVlan.mciptvEnable.setValue("off"),p.iptvVlan.mciptvEnable.disable(),p.iptvVlan.mciptvEnable.setTips(r.su.CHAR.NETWORK_IPTV.IPTV_MUL_TIP),"off"==p.iptvVlan.internetTag.getValue()&&p.iptvVlan.internetTag.setValue("on"))}},"models.iptvVlan":{ev_loaded:function(e,i){var t,n;a.isRunning()&&("TELEKOM1"===p.iptvVlan.mode.getValue()?o.lanStore.loadData(a.DT_DEFAULT_OPTION):o.lanStore.loadData(a.LAN_OPTION),l.iptvVlanView.internetVlan.hide(),l.iptvVlanView.voipVlan.hide(),l.iptvVlanView.iptvVlanV.hide(),l.iptvVlanView.mciptvVlan.hide(),l.iptvVlanView.allVlan.show(),t="on"==(i=i).configure&&a.isEditable()?"enable":"disable","on"==i["internetItem"]?(l.iptvVlanView.internetVlan.show(),p.iptvVlan.internetVid.setValue(i["internetVid"]),p.iptvVlan.internetVprio.setValue(i["internetVprio"]),p.iptvVlan.internetTag.setValue(i["internetTag"]),"enable"==t?(p.iptvVlan.internetTag.enable(),"on"==p.iptvVlan.internetTag.getValue()?(p.iptvVlan.internetVid.enable(),p.iptvVlan.internetVprio.enable()):(p.iptvVlan.internetVid.disable(),p.iptvVlan.internetVprio.disable())):(p.iptvVlan.internetVid.disable(),p.iptvVlan.internetVprio.disable(),p.iptvVlan.internetTag.disable())):l.iptvVlanView.internetVlan.hide(),"on"==i["iptvItem"]&&(l.iptvVlanView.iptvVlanV.show(),p.iptvVlan.iptvVid.setValue(i["iptvVid"]),p.iptvVlan.iptvVprio.setValue(i["iptvVprio"]),p.iptvVlan.iptvTag.setValue(i["iptvTag"]),"enable"==t?(p.iptvVlan.iptvTag.enable(),"on"==(n=p.iptvVlan.iptvTag.getValue())?(p.iptvVlan.iptvVid.enable(),p.iptvVlan.iptvVprio.enable()):(p.iptvVlan.iptvVid.disable(),p.iptvVlan.iptvVprio.disable())):(p.iptvVlan.iptvVid.disable(),p.iptvVlan.iptvVprio.disable(),p.iptvVlan.iptvTag.disable())),"on"==i["ipphoneItem"]&&(l.iptvVlanView.voipVlan.show(),p.iptvVlan.ipphoneVid.setValue(i["ipphoneVid"]),p.iptvVlan.ipphoneVprio.setValue(i["ipphoneVprio"]),"enable"==t?(p.iptvVlan.ipphoneVid.enable(),p.iptvVlan.ipphoneVprio.enable()):(p.iptvVlan.ipphoneVid.disable(),p.iptvVlan.ipphoneVprio.disable())),"on"==i["mciptvItem"]&&(l.iptvVlanView.mciptvVlan.show(),p.iptvVlan.mciptvVid.setValue(i["mciptvVid"]),p.iptvVlan.mciptvVprio.setValue(i["mciptvVprio"]),p.iptvVlan.mciptvEnable.setValue(i["mciptvEnable"]),n=p.iptvVlan.iptvTag.getValue(),"enable"==t&&"on"==n?(p.iptvVlan.mciptvEnable.enable(),p.iptvVlan.mciptvEnable.setTips(""),"on"==p.iptvVlan.mciptvEnable.getValue()?(p.iptvVlan.mciptvVid.enable(),p.iptvVlan.mciptvVprio.enable()):(p.iptvVlan.mciptvVid.disable(),p.iptvVlan.mciptvVprio.disable())):(p.iptvVlan.mciptvVid.disable(),p.iptvVlan.mciptvVprio.disable(),p.iptvVlan.mciptvEnable.disable(),p.iptvVlan.mciptvEnable.setTips(r.su.CHAR.NETWORK_IPTV.IPTV_MUL_TIP))),i.portSettings?(o.lanPortStore.loadData(i.portSettings),a.initLanPort(),n=p.iptvVlan.iptvAllowLanConfigure.getValue(),"enable"==t||n?o.lanStore.enable():o.lanStore.disable()):l.iptvVlanView.allVlan.hide(),i.seltype?(o.lanStore.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.lanStore.enableItems(i.seltype)):l.iptvVlanView.allVlan.hide(),"none"===p.iptvVlan.mode.getValue()&&l.iptvVlanView.allVlan.hide(),a.disableLanProtIfSinglePort())}},"stores.lanPortStore":{ev_data_change:function(e,i,t,n,a){1==(a.getData()!=p.iptvVlan.portSettings.getData())&&p.iptvVlan.portSettings.setValue(a.getData())}}})}},function(n,a,l,p,e,o){var i=null;return{lanNum:4,MODE:{ADVANCED:"advanced",QUICK_SETUP:"qs"},setMode:function(e){i=e},getMode:function(){return i},LAN_OPTION:[{name:r.su.CHAR.NETWORK_IPTV.INTERNET,value:"Internet",boxlabel:"lanmode0"},{name:r.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:r.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}],DT_DEFAULT_OPTION:[{name:r.su.CHAR.NETWORK_IPTV.INTERNET_IPTV,value:"Internet",boxlabel:"lanmode0"},{name:r.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:r.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}],startup:function(i){l.iptvVlan.load({success:function(e){n.initModeStore(),n.getMode()==n.MODE.ADVANCED?l.iptvVlan.enable.enable():(l.iptvVlan.enable.hide(),"KR"!==o.device.getConfig().country&&l.iptvVlan.mode.setLabelField(r.su.CHAR.NETWORK_IPTV.ISP_PRO),n.isEditable()?l.iptvVlan.enable.setValue("on"):l.iptvVlan.enable.setValue("off")),i&&(l.iptvVlan.mode.enable(),l.iptvVlan.mode.setValue(i)),n.setDisabledTip()}})},setDisabledTip:function(){var e=o.device.getConfig().supportLanAggCfg,i=n.getMode()===n.MODE.ADVANCED,t=i?l.iptvVlan.enable:l.iptvVlan.mode;n.isEditable()?(l.iptvVlan.enable.enable(),l.iptvVlan.enable.setTips(""),l.iptvVlan.mode.enable(),l.iptvVlan.mode.setTips("")):(e&&i&&(l.iptvVlan.mode.hide(),a.iptvVlanView.iptvConfigWrap.hide()),e=i?'<a href="#lanAdv">'+r.su.CHAR.NETWORK_IPTV.LA+"</a>":r.su.CHAR.NETWORK_IPTV.LA,i=r.su.CHAR.NETWORK_IPTV.IPTV_DISABLE_TIPS.replace("%function%",e),t.disable(),t.setTips(i))},atLeastOne:function(){var e=p.lanPortStore,i=e.getData(),t=!1,n=e.getSize()-1;return i.forEach(function(e){"Internet"==e.type&&(t=!0)}),!!t||(e.getModelByIndex(n).setErrorHtml(r.su.CHAR.ERROR["00000095"]),!1)},vidSame:function(){var e;return"Custom"!==l.iptvVlan.mode.getValue()||((e=function(e,i){var t=+l.iptvVlan[e].getValue(),n=+l.iptvVlan[i].getValue(),e=l.iptvVlan[e].isEnabled(),i=l.iptvVlan[i].isEnabled();return!(!e||!i||t!=n)})("internetVid","ipphoneVid")?(l.iptvVlan.ipphoneVid.setError(r.su.CHAR.ERROR["00000094"]),!1):e("ipphoneVid","iptvVid")||e("internetVid","iptvVid")?(l.iptvVlan.iptvVid.setError(r.su.CHAR.ERROR["00000094"]),!1):!(e("ipphoneVid","mciptvVid")||e("internetVid","mciptvVid")||e("iptvVid","mciptvVid"))||(l.iptvVlan.mciptvVid.setError(r.su.CHAR.ERROR["00000094"]),!1))},syncQsData:function(){var e=l.iptvVlan.getData();return!!(l.iptvVlan.validate()&&n.vidSame()&&n.atLeastOne()||"none"==e.mode)&&(n.replaceQsData(),!0)},replaceQsData:function(){var e=l.iptvVlan.getData(),t=l.quickSetupModel,i=["ispSpecialInternetVid","ispSpecialInternetVprio","ispSpecialInternetTag","ispSpecialIpphoneVid","ispSpecialIpphoneVprio","ispSpecialIptvTag","ispSpecialIptvVid","ispSpecialIptvVprio","ispSpecialMciptvEnable"];switch(t.replaceData({ispSpecialMode:e.mode,ispSpecialEnable:"on"}),e.mode){case"none":t.ispSpecialEnable.setValue("off"),n(i);break;case"Bridge":case"Bridge_KT":case"Bridge_SKT":case"Bridge_LG":t.replaceData({ispSpecialInternetTag:"off",ispSpecialIptvTag:"off",ispSpecialMciptvEnable:"off"});break;case"Custom":t.replaceData({ispSpecialEnable:e.enable,ispSpecialInternetVid:Number(e.internetVid),ispSpecialInternetVprio:e.internetVprio,ispSpecialInternetTag:e.internetTag,ispSpecialIpphoneVid:Number(e.ipphoneVid),ispSpecialIpphoneVprio:e.ipphoneVprio,ispSpecialIptvTag:e.iptvTag,ispSpecialIptvVid:Number(e.iptvVid),ispSpecialIptvVprio:e.iptvVprio,ispSpecialMciptvEnable:e.mciptvEnable,ispSpecialIptvAllowLanNoInternet:e.iptvAllowLanNoInternet}),"on"===e.mciptvEnable&&t.replaceData({ispSpecialMciptvVid:Number(e.mciptvVid),ispSpecialMciptvVprio:e.mciptvVprio});break;default:n(i)}function n(e){for(var i=e.length-1;i--;)t[e[i]].setValue("")}"none"!==e.mode&&t.replaceData({ispSpecialPortSettings:e.portSettings}),l.qsSummaryModel.ispProfile.setValue(l.iptvVlan.mode.getText())},isEditable:function(){return!(o.device.getConfig().supportLanAggCfg&&"1"==l.lanAdvLinkAggModel.enableAgg.getValue()&&!o.device.getLanIptv())},initModeStore:function(){var e=n.filterModeSotre(),i=n.getNoneModeOption();p.modeStore.loadItems(i.concat(e))},filterModeSotre:function(){var e=p.modeStore.getData(),i=l.iptvVlan.supportModeList.getValue();return i&&i.length?r.grep(e,function(e){return-1<r.inArray(e.value,i)}):e},getNoneModeOption:function(){return n.getMode()!==n.MODE.QUICK_SETUP?[]:[{name:r.su.CHAR.NETWORK_IPTV.NONE,value:"none",boxlabel:"mode16"}]},initLanPort:function(){var e=l.iptvVlan.portSettings.getValue();p.lanPortStore.loadData(e),n.hideExtraError(),n.setPortLabelField()},setPortLabelField:function(){for(var e=p.lanPortStore.getSize(),i=0;i<e;i++){var t=p.lanPortStore.getModelByIndex(i),n=o.device.getPortName(t.name.getValue());t.type.setLabelField(n)}},hideExtraError:function(){r('#iptv-vlan-port .repeat-item:last-child [widget="errortip"] div:nth-child(2)').addClass("hidden")},isNoInternetLan:function(){for(var e=l.iptvVlan.portSettings.getValue(),i=0;i<e.length;i++)if("Internet"==e[i].type)return!1;return!0},disableLanProtIfSinglePort:function(){var e=1==p.lanPortStore.getSize();n.getMode()==n.MODE.QUICK_SETUP&&e&&(n.disableLanPortSettings(),a.iptvVlanView.qsSinglePortNote.show())},disableLanPortSettings:function(){var e=r("#iptv-vlan-port [widget=combobox]");e&&e.addClass("disabled")},handleKRSet:function(){l.iptvVlan.mode.setLabelField(r.su.CHAR.NETWORK_IPTV.ISP);var e=p.modeStore.getData(),i=e.findIndex(function(e){return"Bridge"===e.value});-1!==i&&(e.splice(i,1,{name:r.su.CHAR.NETWORK_IPTV.BRIDGE+"(KT)",value:"Bridge_KT",boxlabel:"mode17"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE+"(SKT)",value:"Bridge_SKT",boxlabel:"mode18"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE+"(LG U+)",value:"Bridge_LG",boxlabel:"mode19"}),p.modeStore.loadData(e))}}})}(jQuery),$.su.storeManager.define("modeStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.SINGAPORE_SINGTEL,value:"ExStream",boxlabel:"mode0"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_UNIFI,value:"Unifi",boxlabel:"mode1"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS,value:"Maxis",boxlabel:"mode2"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS2,value:"Maxis2",boxlabel:"mode10"},{name:$.su.CHAR.NETWORK_IPTV.CELCOM,value:"Celcom",boxlabel:"mode11"},{name:$.su.CHAR.NETWORK_IPTV.VIETNAM_VIETTEL,value:"Vietnam",boxlabel:"mode3"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_MEO,value:"MEO",boxlabel:"mode4"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_VODAFONE,value:"VDF",boxlabel:"mode5"},{name:$.su.CHAR.NETWORK_IPTV.AUSTRALIA_NBN,value:"nbn",boxlabel:"mode6"},{name:$.su.CHAR.NETWORK_IPTV.NEWZEALAND_UFB,value:"ufb",boxlabel:"mode7"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM1,value:"TELEKOM1",boxlabel:"mode12"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM2,value:"TELEKOM2",boxlabel:"mode13"},{name:$.su.CHAR.NETWORK_IPTV.AIS,value:"AIS",boxlabel:"mode14"},{name:$.su.CHAR.NETWORK_IPTV.CENTURYLINK,value:"CENTURYLINK",boxlabel:"mode15"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"mode8"},{name:$.su.CHAR.NETWORK_IPTV.CUSTOM,value:"Custom",boxlabel:"mode9"}]}),$.su.storeManager.define("lanStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.INTERNET,value:"Internet",boxlabel:"lanmode0"},{name:$.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:$.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}]}),$.su.storeManager.define("lanPriorityStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:"0",value:0,boxlabel:"lanPriority0"},{name:"1",value:1,boxlabel:"lanPriority1"},{name:"2",value:2,boxlabel:"lanPriority2"},{name:"3",value:3,boxlabel:"lanPriority3"},{name:"4",value:4,boxlabel:"lanPriority4"},{name:"5",value:5,boxlabel:"lanPriority5"},{name:"6",value:6,boxlabel:"lanPriority6"},{name:"7",value:7,boxlabel:"lanPriority7"}]}),$.su.storeManager.define("iptvVlanStore",{type:"store",fields:[{name:"lan"},{name:"name"}],convert:function(e){for(var i=[],t=e.port_settings,n=0;n<t.length;n++){i[n]={};var a=t[n];i[n]["lan"]="IP-Phone"===a.type?"VoIP":a.type,i[n]["name"]=a.name}return i},serialize:function(e){return{}},proxy:{url:$.su.url("/admin/iptv?form=setting")}}),$.su.define("iptvProxy",{extend:"IPFProxy",url:$.su.url("/admin/iptv?form=setting"),preventSuccessEvent:!0});