!function(o){o.su.moduleManager.define("iptvAdv",{services:["moduleLoader","moduleManager","device"],models:["iptvVlan","iptvUdpModel"],stores:[],deps:["iptvVlanAdv"],views:["iptvAdvView"],listeners:{ev_on_launch:function(e,i,n,a,t,l,p){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvVlanAdv",view:"iptvVlanView"},n.iptvAdvView.iptvVlanLoader,function(){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvMultiAdv"},n.iptvAdvView.iptvMultiLoader,function(){var e=p.moduleManager.get("iptvVlanAdv");e.setMode(e.MODE.ADVANCED),e.startup()}),!0===o.su.serviceManager.get("device").getConfig().supportUdpProxy?(n.iptvAdvView.iptvUdpPanel.show(),p.moduleLoader.load({module:"iptvAdv"},{module:"iptvUdp"},n.iptvAdvView.iptvUdpLoader,function(){})):n.iptvAdvView.iptvUdpPanel.hide()})}},init:function(e,n,a,i,t,l){this.configViews({id:"iptvAdvView",items:[{id:"iptv-vlan-loader"},{id:"iptv-multi-loader"},{id:"iptv-udp-loader"}]}),this.control({".index-common-save-btn":{ev_will_auto_save:function(e,i){i.preventDefault(),a.iptvVlan.validate()&&a.iptvUdpModel.validate()&&(a.iptvUdpModel.isDirty()&&a.iptvUdpModel.submit(),t.iptvVlanAdv.atLeastOne())&&t.iptvVlanAdv.vidSame()&&a.iptvVlan.isDirty()&&a.iptvVlan.submit({success:function(e){e.cfg_changed&&n.iptvAdvView.iptvRebootMsg.show(function(){n.iptvAdvView.iptvRebootProgress.animate({duration:15e3,percentageStart:0,percentageEnd:100,callback:function(){n.iptvAdvView.iptvRebootMsg.hide()}})})}})}}}),this.listen()}},function(e,i,n,a,t,l){return{}})}(jQuery),$.su.modelManager.define("iptvVlan",{type:"model",fields:[{name:"enable"},{name:"mode"},{name:"internetVid",mapping:"internet_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"internetVprio",mapping:"internet_vprio"},{name:"internetTag",mapping:"internet_tag"},{name:"iptvTag",mapping:"iptv_tag"},{name:"ipphoneVid",mapping:"ipphone_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"ipphoneVprio",mapping:"ipphone_vprio"},{name:"iptvVid",mapping:"iptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"iptvVprio",mapping:"iptv_vprio"},{name:"mciptvVid",mapping:"mciptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"mciptvVprio",mapping:"mciptv_vprio"},{name:"mciptvEnable",mapping:"mciptv_enable"},{name:"cfg_changed"},{name:"igmp_enable"},{name:"igmp_snooping_enable",defaultValue:"on"},{name:"mcwifi_enable"},{name:"igmp_version"},{name:"qos_iptv_compatible"},{name:"wait_time"},{name:"configure"},{name:"internetItem",mapping:"internet_item"},{name:"iptvItem",mapping:"iptv_item"},{name:"ipphoneItem",mapping:"ipphone_item"},{name:"mciptvItem",mapping:"mciptv_item"},{name:"ports"},{name:"porttype"},{name:"seltype"},{name:"supportModeList",mapping:"support_mode_list"}],proxy:{url:$.su.url("/admin/iptv?form=setting")}}),jQuery.su.moduleManager.define("iptvMultiAdv",{deps:[],services:["device"],models:["iptvVlan"],stores:["iptvVersionStore"],views:["iptvMultiView"],listeners:{ev_on_launch:function(e,i,n,a,t,l,p){}},init:function(e,i,n,a,t,l){this.control(),this.listen()}},function(e,i,n,a,t,l){return{}}),jQuery,$.su.storeManager.define("iptvVersionStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.V_2,value:"2",boxlabel:"version2"},{name:$.su.CHAR.NETWORK_IPTV.V_3,value:"3",boxlabel:"version3"}]}),jQuery.su.moduleManager.define("iptvUdp",{deps:[],services:[],models:["iptvUdpModel"],stores:[],views:["iptvUdpView"],listeners:{ev_on_launch:function(e,i,n,a,t,l,p){a.iptvUdpModel.load()}},init:function(e,i,a,n,t,l){this.control({}),this.listen({"models.iptvUdpModel.udp_proxy_enable":{ev_value_change:function(e,i,n){"on"==i?a.iptvUdpModel.udp_proxy.enable():a.iptvUdpModel.udp_proxy.disable()}}})}},function(e,i,n,a,t,l){return{}}),jQuery,$.su.modelManager.define("iptvUdpModel",{type:"model",fields:[{name:"udp_proxy_enable"},{name:"udp_proxy",defaultValue:4022,vtype:{vtype:"number",min:1024,max:65535}}],proxy:{url:$.su.url("/admin/iptv?form=udp_proxy_setting")}}),function(r){r.su.moduleManager.define("iptvVlanAdv",{deps:["navigatorController"],services:["device","moduleManager","ajax"],models:["iptvVlan","lanAdvLinkAggModel","quickSetupModel","qsSummaryModel","wanPortStatusModel"],stores:["modeStore","lanStore","lanTagStore","lanPriorityStore","iptvVlanStore"],views:["iptvVlanView"],listeners:{ev_on_launch:function(e,i,n,a,t,l,p){}},init:function(p,o,v,V,n,t){this.control({"#iptv-vlan-msg":{ev_msg_ok:function(e,i){p.getMode()==p.MODE.ADVANCED&&setTimeout(function(){n.navigatorController.goTo("lanAdv")},300)},ev_msg_cancel:function(e,i){p.getMode()==p.MODE.ADVANCED&&v.iptvVlan.mode.setValue("")}},"#iptvLan1":{ev_view_change:function(e,i,n){var a=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();v.iptvVlan.porttype.setValue([a,t,l,p].join(" "))}},"#iptvLan2":{ev_view_change:function(e,i,n){var a=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();v.iptvVlan.porttype.setValue([a,t,l,p].join(" "))}},"#iptvLan3":{ev_view_change:function(e,i,n){var a=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();v.iptvVlan.porttype.setValue([a,t,l,p].join(" "))}},"#iptvLan4":{ev_view_change:function(e,i,n){var a=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();v.iptvVlan.porttype.setValue([a,t,l,p].join(" "))}}}),t.device.getLanAgg()&&v.lanAdvLinkAggModel.load(),this.listen({"models.quickSetupModel.wanPortStatus":{ev_value_change:function(e,i,n){p.getMode()===p.MODE.QUICK_SETUP&&p.setWanLanLabel(i)}},"models.iptvVlan.enable":{ev_value_change:function(e,i,n){v.iptvVlan.mode.hide(),o.iptvVlanView.iptvConfigWrap.hide();var a=v.iptvVlan.mode.getValue();("on"==i||p.getMode()===p.MODE.QUICK_SETUP&&"none"!==a)&&(v.iptvVlan.mode.show(),v.iptvVlan.mode.setValue(a),o.iptvVlanView.iptvConfigWrap.show())}},"models.iptvVlan.mode":{ev_value_change:function(e,i,n){var a=p.getMode();"none"==i?o.iptvVlanView.iptvConfigWrap.hide():("none"==n&&a==p.MODE.QUICK_SETUP&&o.iptvVlanView.iptvConfigWrap.show(),i!=n&&t.ajax.request({proxy:"iptvProxy",data:{operation:"change",isp:i},success:function(e){v.iptvVlan.replaceData({configure:e.configure,internetItem:e.internet_item,internetTag:e.internet_tag,internetVid:e.internet_vid,internetVprio:e.internet_vprio,ipphoneItem:e.ipphone_item,ipphoneVid:e.ipphone_vid,ipphoneVprio:e.ipphone_vprio,iptvItem:e.iptv_item,iptvTag:e.iptv_tag,iptvVid:e.iptv_vid,iptvVprio:e.iptv_vprio,mciptvEnable:e.mciptv_enable,mciptvItem:e.mciptv_item,mciptvVid:e.mciptv_vid,mciptvVprio:e.mciptv_vprio,ports:e.ports,porttype:e.porttype,seltype:e.seltype})}}))}},"models.iptvVlan.mciptvEnable":{ev_value_change:function(e,i,n){"on"==i?(v.iptvVlan.mciptvVid.enable(),v.iptvVlan.mciptvVprio.enable()):(v.iptvVlan.mciptvVid.disable(),v.iptvVlan.mciptvVprio.disable())}},"models.iptvVlan.internetTag":{ev_value_change:function(e,i,n){"on"==i?(v.iptvVlan.internetVid.enable(),v.iptvVlan.internetVprio.enable()):(v.iptvVlan.internetVid.disable(),v.iptvVlan.internetVprio.disable(),"off"==v.iptvVlan.iptvTag.getValue()&&v.iptvVlan.iptvTag.setValue("on"))}},"models.iptvVlan.iptvTag":{ev_value_change:function(e,i,n){"on"==i?(v.iptvVlan.iptvVid.enable(),v.iptvVlan.iptvVprio.enable(),v.iptvVlan.mciptvEnable.enable(),v.iptvVlan.mciptvEnable.setTips("")):(v.iptvVlan.iptvVid.disable(),v.iptvVlan.iptvVprio.disable(),v.iptvVlan.mciptvEnable.setValue("off"),v.iptvVlan.mciptvEnable.disable(),v.iptvVlan.mciptvEnable.setTips(r.su.CHAR.NETWORK_IPTV.IPTV_MUL_TIP),"off"==v.iptvVlan.internetTag.getValue()&&v.iptvVlan.internetTag.setValue("on"))}},"models.iptvVlan":{ev_loaded:function(e,i){if(p.isRunning()){"TELEKOM1"===v.iptvVlan.mode.getValue()?V.lanStore.loadData(p.DT_DEFAULT_OPTION):V.lanStore.loadData(p.LAN_OPTION),o.iptvVlanView.internetVlan.hide(),o.iptvVlanView.voipVlan.hide(),o.iptvVlanView.iptvVlanV.hide(),o.iptvVlanView.mciptvVlan.hide(),o.iptvVlanView.allVlan.show();var n,a=i,i="on"==a.configure&&p.isEditable()?"enable":"disable";if("on"==a["internetItem"]?(o.iptvVlanView.internetVlan.show(),v.iptvVlan.internetVid.setValue(a["internetVid"]),v.iptvVlan.internetVprio.setValue(a["internetVprio"]),v.iptvVlan.internetTag.setValue(a["internetTag"]),"enable"==i?(v.iptvVlan.internetTag.enable(),"on"==v.iptvVlan.internetTag.getValue()?(v.iptvVlan.internetVid.enable(),v.iptvVlan.internetVprio.enable()):(v.iptvVlan.internetVid.disable(),v.iptvVlan.internetVprio.disable())):(v.iptvVlan.internetVid.disable(),v.iptvVlan.internetVprio.disable(),v.iptvVlan.internetTag.disable())):o.iptvVlanView.internetVlan.hide(),"on"==a["iptvItem"]&&(o.iptvVlanView.iptvVlanV.show(),v.iptvVlan.iptvVid.setValue(a["iptvVid"]),v.iptvVlan.iptvVprio.setValue(a["iptvVprio"]),v.iptvVlan.iptvTag.setValue(a["iptvTag"]),"enable"==i?(v.iptvVlan.iptvTag.enable(),"on"==(n=v.iptvVlan.iptvTag.getValue())?(v.iptvVlan.iptvVid.enable(),v.iptvVlan.iptvVprio.enable()):(v.iptvVlan.iptvVid.disable(),v.iptvVlan.iptvVprio.disable())):(v.iptvVlan.iptvVid.disable(),v.iptvVlan.iptvVprio.disable(),v.iptvVlan.iptvTag.disable())),"on"==a["ipphoneItem"]&&(o.iptvVlanView.voipVlan.show(),v.iptvVlan.ipphoneVid.setValue(a["ipphoneVid"]),v.iptvVlan.ipphoneVprio.setValue(a["ipphoneVprio"]),"enable"==i?(v.iptvVlan.ipphoneVid.enable(),v.iptvVlan.ipphoneVprio.enable()):(v.iptvVlan.ipphoneVid.disable(),v.iptvVlan.ipphoneVprio.disable())),"on"==a["mciptvItem"]&&(o.iptvVlanView.mciptvVlan.show(),v.iptvVlan.mciptvVid.setValue(a["mciptvVid"]),v.iptvVlan.mciptvVprio.setValue(a["mciptvVprio"]),v.iptvVlan.mciptvEnable.setValue(a["mciptvEnable"]),n=v.iptvVlan.iptvTag.getValue(),"enable"==i&&"on"==n?(v.iptvVlan.mciptvEnable.enable(),v.iptvVlan.mciptvEnable.setTips(""),"on"==v.iptvVlan.mciptvEnable.getValue()?(v.iptvVlan.mciptvVid.enable(),v.iptvVlan.mciptvVprio.enable()):(v.iptvVlan.mciptvVid.disable(),v.iptvVlan.mciptvVprio.disable())):(v.iptvVlan.mciptvVid.disable(),v.iptvVlan.mciptvVprio.disable(),v.iptvVlan.mciptvEnable.disable(),v.iptvVlan.mciptvEnable.setTips(r.su.CHAR.NETWORK_IPTV.IPTV_MUL_TIP))),a["porttype"]!=undefined?(n=a["porttype"],o.iptvVlanView.lan1.setValue(n.split(" ")[0]),o.iptvVlanView.lan2.setValue(n.split(" ")[1]),o.iptvVlanView.lan3.setValue(n.split(" ")[2]),o.iptvVlanView.lan4.setValue(n.split(" ")[3]),"enable"==i?(o.iptvVlanView.lan1.enable(),o.iptvVlanView.lan2.enable(),o.iptvVlanView.lan3.enable(),o.iptvVlanView.lan4.enable()):(o.iptvVlanView.lan1.disable(),o.iptvVlanView.lan2.disable(),o.iptvVlanView.lan3.disable(),o.iptvVlanView.lan4.disable())):o.iptvVlanView.allVlan.hide(),a["seltype"]!=undefined){o.iptvVlanView.lan1.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan2.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan3.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan4.disableItems(["Internet","IPTV","IP-Phone","Bridge"]);for(var t=0,l=a["seltype"].split(" ").length;t<l;t++)o.iptvVlanView.lan1.enableItems(a["seltype"].split(" ")[t]),o.iptvVlanView.lan2.enableItems(a["seltype"].split(" ")[t]),o.iptvVlanView.lan3.enableItems(a["seltype"].split(" ")[t]),o.iptvVlanView.lan4.enableItems(a["seltype"].split(" ")[t])}else o.iptvVlanView.allVlan.hide();"none"===v.iptvVlan.mode.getValue()&&o.iptvVlanView.allVlan.hide()}}}})}},function(t,a,l,n,e,p){var i=null,o=p.device.getWanLanPorts(),v={wanlan1g:"1Gbps LAN",wanlan2g5:"2.5Gbps LAN",wanlan10g:"10Gbps LAN"};return{lanNum:4,MODE:{ADVANCED:"advanced",QUICK_SETUP:"qs"},isCoincidedWithIptv:p.device.isCoincidedWithIptv(),setMode:function(e){i=e},getMode:function(){return i},LAN_OPTION:[{name:r.su.CHAR.NETWORK_IPTV.INTERNET,value:"Internet",boxlabel:"lanmode0"},{name:r.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:r.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}],DT_DEFAULT_OPTION:[{name:r.su.CHAR.NETWORK_IPTV.INTERNET_IPTV,value:"Internet",boxlabel:"lanmode0"},{name:r.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:r.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:r.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}],startup:function(i){l.iptvVlan.load({success:function(e){t.initModeStore(),t.getMode()==t.MODE.ADVANCED?(t.isCoincidedWithIptv?l.wanPortStatusModel.load({success:function(e){t.setLanLabels()}}):t.setLanLabels(),l.iptvVlan.enable.enable()):(t.setLanLabels(),l.iptvVlan.enable.hide(),l.iptvVlan.mode.setLabelField(r.su.CHAR.NETWORK_IPTV.ISP_PRO),t.isEditable()?l.iptvVlan.enable.setValue("on"):l.iptvVlan.enable.setValue("off")),i&&(l.iptvVlan.mode.enable(),l.iptvVlan.mode.setValue(i)),t.setDisabledTip()}})},setDisabledTip:function(){var e=p.device.getConfig().supportLanAggCfg,i=t.getMode()===t.MODE.ADVANCED,n=i?l.iptvVlan.enable:l.iptvVlan.mode;t.isEditable()?(l.iptvVlan.enable.enable(),l.iptvVlan.enable.setTips(""),l.iptvVlan.mode.enable(),l.iptvVlan.mode.setTips("")):(e&&i&&(l.iptvVlan.mode.hide(),a.iptvVlanView.iptvConfigWrap.hide()),e=i?'<a href="#lanAdv">'+r.su.CHAR.NETWORK_IPTV.LA+"</a>":r.su.CHAR.NETWORK_IPTV.LA,i=r.su.CHAR.NETWORK_IPTV.IPTV_DISABLE_TIPS.replace("%function%",e),n.disable(),n.setTips(i))},setLanLabels:function(){var e,i=l.iptvVlan.ports.getValue().split(" ");t.isCoincidedWithIptv&&(e=(t.getMode()===t.MODE.QUICK_SETUP?l.quickSetupModel:l.wanPortStatusModel).wanPortStatus.getValue(),t.setWanLanLabel(e),i.pop());for(var n=0;n<i.length;n++)a.iptvVlanView["lan"+(n+1)].setLabelField("LAN "+i[n])},setWanLanLabel:function(e){t.isCoincidedWithIptv&&o.length&&(e=1^o.indexOf(e),e=o[e],a.iptvVlanView["lan4"].setLabelField(v[e]))},atLeastOne:function(){for(var e=t.lanNum,i=!1,n=1;n<=e;n++)"Internet"==a.iptvVlanView["lan"+n].getValue()&&(i=!0);return!!i||(a.iptvVlanView["lan"+e].setError(r.su.CHAR.ERROR["00000095"]),!1)},vidSame:function(){var e;return!("Custom"===l.iptvVlan.mode.getValue()&&((e=function(e,i){var n=+l.iptvVlan[e].getValue(),a=+l.iptvVlan[i].getValue(),e=l.iptvVlan[e].isEnabled(),i=l.iptvVlan[i].isEnabled();return!(!e||!i||n!=a)})("internetVid","ipphoneVid")?(l.iptvVlan.ipphoneVid.setError(r.su.CHAR.ERROR["00000094"]),1):e("ipphoneVid","iptvVid")||e("internetVid","iptvVid")?(l.iptvVlan.iptvVid.setError(r.su.CHAR.ERROR["00000094"]),1):(e("ipphoneVid","mciptvVid")||e("internetVid","mciptvVid")||e("iptvVid","mciptvVid"))&&(l.iptvVlan.mciptvVid.setError(r.su.CHAR.ERROR["00000094"]),1)))},syncQsData:function(){var e=l.iptvVlan.getData(),n=l.quickSetupModel,i=["ispSpecialInternetVid","ispSpecialInternetVprio","ispSpecialInternetTag","ispSpecialIpphoneVid","ispSpecialIpphoneVprio","ispSpecialIptvTag","ispSpecialIptvVid","ispSpecialIptvVprio","ispSpecialMciptvEnable"];if(l.iptvVlan.validate()&&t.vidSame()&&t.atLeastOne()||"none"==e.mode){switch(n.replaceData({ispSpecialMode:e.mode,ispSpecialEnable:"on"}),e.mode){case"none":n.ispSpecialEnable.setValue("off"),a(i);break;case"Bridge":n.replaceData({ispSpecialInternetTag:"off",ispSpecialIptvTag:"off",ispSpecialMciptvEnable:"off"});break;case"Custom":n.replaceData({ispSpecialEnable:e.enable,ispSpecialInternetVid:Number(e.internetVid),ispSpecialInternetVprio:e.internetVprio,ispSpecialInternetTag:e.internetTag,ispSpecialIpphoneVid:Number(e.ipphoneVid),ispSpecialIpphoneVprio:e.ipphoneVprio,ispSpecialIptvTag:e.iptvTag,ispSpecialIptvVid:Number(e.iptvVid),ispSpecialIptvVprio:e.iptvVprio,ispSpecialMciptvEnable:e.mciptvEnable}),"on"===e.mciptvEnable&&n.replaceData({ispSpecialMciptvVid:Number(e.mciptvVid),ispSpecialMciptvVprio:e.mciptvVprio});break;default:a(i)}return"none"!==e.mode&&n.replaceData({ispSpecialPorttype:e.porttype}),l.qsSummaryModel.ispProfile.setValue(l.iptvVlan.mode.getText()),!0}return!1;function a(e){for(var i=e.length-1;i--;)n[e[i]].setValue("")}},isEditable:function(){return!(p.device.getConfig().supportLanAggCfg&&"1"==l.lanAdvLinkAggModel.enableAgg.getValue()&&!p.device.getLanIptv())},initModeStore:function(){var e=t.filterModeSotre(),i=t.getNoneModeOption();n.modeStore.loadItems(i.concat(e))},filterModeSotre:function(){var e=n.modeStore.getData(),i=l.iptvVlan.supportModeList.getValue();return i&&i.length?r.grep(e,function(e){return-1<r.inArray(e.value,i)}):e},getNoneModeOption:function(){return t.getMode()!==t.MODE.QUICK_SETUP?[]:[{name:r.su.CHAR.NETWORK_IPTV.NONE,value:"none",boxlabel:"mode16"}]}}})}(jQuery),$.su.storeManager.define("modeStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.SINGAPORE_SINGTEL,value:"ExStream",boxlabel:"mode0"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_UNIFI,value:"Unifi",boxlabel:"mode1"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS,value:"Maxis",boxlabel:"mode2"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS2,value:"Maxis2",boxlabel:"mode10"},{name:$.su.CHAR.NETWORK_IPTV.CELCOM,value:"Celcom",boxlabel:"mode11"},{name:$.su.CHAR.NETWORK_IPTV.VIETNAM_VIETTEL,value:"Vietnam",boxlabel:"mode3"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_MEO,value:"MEO",boxlabel:"mode4"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_VODAFONE,value:"VDF",boxlabel:"mode5"},{name:$.su.CHAR.NETWORK_IPTV.AUSTRALIA_NBN,value:"nbn",boxlabel:"mode6"},{name:$.su.CHAR.NETWORK_IPTV.NEWZEALAND_UFB,value:"ufb",boxlabel:"mode7"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM1,value:"TELEKOM1",boxlabel:"mode12"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM2,value:"TELEKOM2",boxlabel:"mode13"},{name:$.su.CHAR.NETWORK_IPTV.AIS,value:"AIS",boxlabel:"mode14"},{name:$.su.CHAR.NETWORK_IPTV.CENTURYLINK,value:"CENTURYLINK",boxlabel:"mode15"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"mode8"},{name:$.su.CHAR.NETWORK_IPTV.CUSTOM,value:"Custom",boxlabel:"mode9"}]}),$.su.storeManager.define("lanStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.INTERNET,value:"Internet",boxlabel:"lanmode0"},{name:$.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:$.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}]}),$.su.storeManager.define("lanTagStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.TAGGED,value:"tagged",boxlabel:"lanTag0"},{name:$.su.CHAR.NETWORK_IPTV.UNTAGGED,value:"untagged",boxlabel:"lanTag1"}]}),$.su.storeManager.define("lanPriorityStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:"0",value:0,boxlabel:"lanPriority0"},{name:"1",value:1,boxlabel:"lanPriority1"},{name:"2",value:2,boxlabel:"lanPriority2"},{name:"3",value:3,boxlabel:"lanPriority3"},{name:"4",value:4,boxlabel:"lanPriority4"},{name:"5",value:5,boxlabel:"lanPriority5"},{name:"6",value:6,boxlabel:"lanPriority6"},{name:"7",value:7,boxlabel:"lanPriority7"}]}),$.su.storeManager.define("iptvVlanStore",{type:"store",fields:[{name:"lan"},{name:"lanTag"},{name:"lanComb"},{name:"lanVid",vtype:{vtype:"number",min:1,max:4096,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},allowBlank:!1},{name:"lanPriority"},{name:"lanTips"}],convert:function(e){for(var i=[],n=e.ports.split(" "),a=e.porttype.split(" "),t=0;t<n.length;t++)i[t]={},i[t]["lan"]="IP-Phone"===a[t]?"VoIP":a[t],i[t]["lanTag"]=e["lan"+n[t]+"Tag"],i[t]["lanVid"]=e["lan"+n[t]+"Vid"],i[t]["lanPriority"]=e["lan"+n[t]+"Priority"];return i},serialize:function(e){return{}},proxy:{url:$.su.url("/admin/iptv?form=setting")}}),$.su.define("iptvProxy",{extend:"IPFProxy",url:$.su.url("/admin/iptv?form=setting"),preventSuccessEvent:!0});