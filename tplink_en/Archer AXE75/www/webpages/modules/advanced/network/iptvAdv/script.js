jQuery.su.moduleManager.define("iptvAdv",{services:["moduleLoader","moduleManager"],models:["iptvVlan"],stores:[],deps:["iptvVlanAdv"],views:["iptvAdvView"],listeners:{ev_on_launch:function(e,i,a,n,t,l,p){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvVlanAdv",view:"iptvVlanView"},a.iptvAdvView.iptvVlanLoader,function(){p.moduleLoader.load({module:"iptvAdv"},{module:"iptvMultiAdv"},a.iptvAdvView.iptvMultiLoader,function(){var e=p.moduleManager.get("iptvVlanAdv");e.setMode(e.MODE.ADVANCED),e.startup()})})}},init:function(e,a,n,i,t,l){this.configViews({id:"iptvAdvView",items:[{id:"iptv-vlan-loader"},{id:"iptv-multi-loader"}]}),this.control({".index-common-save-btn":{"ev_will_auto_save":function(e,i){i.preventDefault(),n.iptvVlan.validate()&&t.iptvVlanAdv.atLeastOne()&&t.iptvVlanAdv.vidSame()&&n.iptvVlan.submit({success:function(e){e.cfg_changed&&a.iptvAdvView.iptvRebootMsg.show(function(){a.iptvAdvView.iptvRebootProgress.animate({duration:15e3,percentageStart:0,percentageEnd:100,callback:function(){a.iptvAdvView.iptvRebootMsg.hide()}})})}})}}}),this.listen()}},function(e,i,a,n,t,l){return{}}),$.su.modelManager.define("iptvVlan",{type:"model",fields:[{name:"enable"},{name:"mode"},{name:"internetVid",mapping:"internet_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"internetVprio",mapping:"internet_vprio"},{name:"internetTag",mapping:"internet_tag"},{name:"ipphoneVid",mapping:"ipphone_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"ipphoneVprio",mapping:"ipphone_vprio"},{name:"iptvVid",mapping:"iptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"iptvVprio",mapping:"iptv_vprio"},{name:"mciptvVid",mapping:"mciptv_vid",allowBlank:!1,vtype:{vtype:"number",min:2,max:4094,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},serialize:function(e){return Number(e)}},{name:"mciptvVprio",mapping:"mciptv_vprio"},{name:"mciptvEnable",mapping:"mciptv_enable"},{name:"cfg_changed"},{name:"igmp_enable"},{name:"igmp_snooping_enable",defaultValue:"on"},{name:"mcwifi_enable"},{name:"igmp_version"},{name:"qos_iptv_compatible"},{name:"wait_time"},{name:"configure"},{name:"internetItem",mapping:"internet_item"},{name:"iptvItem",mapping:"iptv_item"},{name:"ipphoneItem",mapping:"ipphone_item"},{name:"mciptvItem",mapping:"mciptv_item"},{name:"ports"},{name:"porttype"},{name:"seltype"}],proxy:{url:$.su.url("/admin/iptv?form=setting")}}),jQuery.su.moduleManager.define("iptvMultiAdv",{deps:[],services:[],models:["iptvVlan"],stores:["iptvVersionStore"],views:["iptvMultiView"],listeners:{ev_on_launch:function(e,i,a,n,t,l,p){}},init:function(e,i,a,n,t,l){this.control({}),this.listen()}},function(e,i,a,n,t,l){return{}}),jQuery,$.su.storeManager.define("iptvVersionStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.V_2,value:"2",boxlabel:"version2"},{name:$.su.CHAR.NETWORK_IPTV.V_3,value:"3",boxlabel:"version3"}]}),function(v){v.su.moduleManager.define("iptvVlanAdv",{deps:["navigatorController","quickSetup"],services:["device","moduleManager","ajax"],models:["iptvVlan","lanAdvLinkAggModel","quickSetupModel","qsSummaryModel","iptvPortModel"],stores:["modeStore","lanStore","lanTagStore","lanPriorityStore","iptvVlanStore"],views:["iptvVlanView"],listeners:{ev_on_launch:function(e,i,a,n,t,l,p){}},init:function(p,o,V,e,a,n){this.control({"#iptv-vlan-msg":{"ev_msg_ok":function(e,i){p.getMode()==p.MODE.ADVANCED&&setTimeout(function(){a.navigatorController.goTo("lanAdv")},300)},"ev_msg_cancel":function(e,i){p.getMode()==p.MODE.ADVANCED&&V.iptvVlan.mode.setValue("")}},"#iptvLan1":{"ev_view_change":function(e,i,a){var n=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();V.iptvVlan.porttype.setValue([n,t,l,p].join(" "))}},"#iptvLan2":{"ev_view_change":function(e,i,a){var n=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();V.iptvVlan.porttype.setValue([n,t,l,p].join(" "))}},"#iptvLan3":{"ev_view_change":function(e,i,a){var n=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();V.iptvVlan.porttype.setValue([n,t,l,p].join(" "))}},"#iptvLan4":{"ev_view_change":function(e,i,a){var n=o.iptvVlanView.lan1.getValue(),t=o.iptvVlanView.lan2.getValue(),l=o.iptvVlanView.lan3.getValue(),p=o.iptvVlanView.lan4.getValue();V.iptvVlan.porttype.setValue([n,t,l,p].join(" "))}}}),n.device.getLanAgg()&&V.lanAdvLinkAggModel.load(),this.listen({"models.quickSetupModel.wanPortStatus":{"ev_value_change":function(e,i,a){p.getMode()===p.MODE.QUICK_SETUP&&o.iptvVlanView["lan4"].setLabelField("1000WAN"===i?v.su.CHAR.NETWORK_MAP.PORT_2500LAN:v.su.CHAR.NETWORK_MAP.PORT_1000LAN)}},"models.iptvVlan.enable":{"ev_value_change":function(e,i,a){V.iptvVlan.mode.hide(),o.iptvVlanView.iptvConfigWrap.hide(),"on"==i||p.getMode()===p.MODE.QUICK_SETUP?(V.iptvVlan.mode.show(),V.iptvVlan.mode.setValue(V.iptvVlan.mode.getValue()),o.iptvVlanView.iptvConfigWrap.show()):(V.iptvVlan.mode.hide(),o.iptvVlanView.iptvConfigWrap.hide())}},"models.iptvVlan.mode":{"ev_value_change":function(e,i,a){"none"==i?(o.iptvVlanView.internetVlan.hide(),o.iptvVlanView.voipVlan.hide(),o.iptvVlanView.iptvVlanV.hide(),o.iptvVlanView.mciptvVlan.hide(),o.iptvVlanView.allVlan.hide()):i!=a&&n.ajax.request({proxy:"iptvProxy",data:{operation:"change",isp:i},success:function(e){V.iptvVlan.replaceData({"configure":e.configure,"internetItem":e.internet_item,"internetTag":e.internet_tag,"internetVid":e.internet_vid,"internetVprio":e.internet_vprio,"ipphoneItem":e.ipphone_item,"ipphoneVid":e.ipphone_vid,"ipphoneVprio":e.ipphone_vprio,"iptvItem":e.iptv_item,"iptvVid":e.iptv_vid,"iptvVprio":e.iptv_vprio,"mciptvEnable":e.mciptv_enable,"mciptvItem":e.mciptv_item,"mciptvVid":e.mciptv_vid,"mciptvVprio":e.mciptv_vprio,"ports":e.ports,"porttype":e.porttype,"seltype":e.seltype})}})}},"models.iptvVlan.mciptvEnable":{"ev_value_change":function(e,i,a){"on"==i?(V.iptvVlan.mciptvVid.enable(),V.iptvVlan.mciptvVprio.enable()):(V.iptvVlan.mciptvVid.disable(),V.iptvVlan.mciptvVprio.disable())}},"models.iptvVlan":{"ev_loaded":function(e,i){if(p.isRunning()){o.iptvVlanView.internetVlan.hide(),o.iptvVlanView.voipVlan.hide(),o.iptvVlanView.iptvVlanV.hide(),o.iptvVlanView.mciptvVlan.hide(),o.iptvVlanView.allVlan.show();var a,n=i,i="on"==n.configure&&p.isEditable()?"enable":"disable";if("on"==n["internetItem"]?(o.iptvVlanView.internetVlan.show(),V.iptvVlan.internetVid.setValue(n["internetVid"]),V.iptvVlan.internetVprio.setValue(n["internetVprio"]),V.iptvVlan.internetTag.setValue(n["internetTag"]),"enable"==i?(V.iptvVlan.internetVid.enable(),V.iptvVlan.internetVprio.enable(),V.iptvVlan.internetTag.enable()):(V.iptvVlan.internetVid.disable(),V.iptvVlan.internetVprio.disable(),V.iptvVlan.internetTag.disable())):o.iptvVlanView.internetVlan.hide(),"on"==n["iptvItem"]&&(o.iptvVlanView.iptvVlanV.show(),V.iptvVlan.iptvVid.setValue(n["iptvVid"]),V.iptvVlan.iptvVprio.setValue(n["iptvVprio"]),"enable"==i?(V.iptvVlan.iptvVid.enable(),V.iptvVlan.iptvVprio.enable()):(V.iptvVlan.iptvVid.disable(),V.iptvVlan.iptvVprio.disable())),"on"==n["ipphoneItem"]&&(o.iptvVlanView.voipVlan.show(),V.iptvVlan.ipphoneVid.setValue(n["ipphoneVid"]),V.iptvVlan.ipphoneVprio.setValue(n["ipphoneVprio"]),"enable"==i?(V.iptvVlan.ipphoneVid.enable(),V.iptvVlan.ipphoneVprio.enable()):(V.iptvVlan.ipphoneVid.disable(),V.iptvVlan.ipphoneVprio.disable())),"on"==n["mciptvItem"]&&(o.iptvVlanView.mciptvVlan.show(),V.iptvVlan.mciptvVid.setValue(n["mciptvVid"]),V.iptvVlan.mciptvVprio.setValue(n["mciptvVprio"]),V.iptvVlan.mciptvEnable.setValue(n["mciptvEnable"]),"enable"==i?(V.iptvVlan.mciptvEnable.enable(),"on"==V.iptvVlan.mciptvEnable.getValue()?(V.iptvVlan.mciptvVid.enable(),V.iptvVlan.mciptvVprio.enable()):(V.iptvVlan.mciptvVid.disable(),V.iptvVlan.mciptvVprio.disable())):(V.iptvVlan.mciptvVid.disable(),V.iptvVlan.mciptvVprio.disable(),V.iptvVlan.mciptvEnable.disable())),n["porttype"]!=undefined?(a=n["porttype"],o.iptvVlanView.lan1.setValue(a.split(" ")[0]),o.iptvVlanView.lan2.setValue(a.split(" ")[1]),o.iptvVlanView.lan3.setValue(a.split(" ")[2]),o.iptvVlanView.lan4.setValue(a.split(" ")[3]),"enable"==i?(o.iptvVlanView.lan1.enable(),o.iptvVlanView.lan2.enable(),o.iptvVlanView.lan3.enable(),o.iptvVlanView.lan4.enable()):(o.iptvVlanView.lan1.disable(),o.iptvVlanView.lan2.disable(),o.iptvVlanView.lan3.disable(),o.iptvVlanView.lan4.disable())):o.iptvVlanView.allVlan.hide(),n["seltype"]!=undefined){o.iptvVlanView.lan1.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan2.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan3.disableItems(["Internet","IPTV","IP-Phone","Bridge"]),o.iptvVlanView.lan4.disableItems(["Internet","IPTV","IP-Phone","Bridge"]);for(var t=0,l=n["seltype"].split(" ").length;t<l;t++)o.iptvVlanView.lan1.enableItems(n["seltype"].split(" ")[t]),o.iptvVlanView.lan2.enableItems(n["seltype"].split(" ")[t]),o.iptvVlanView.lan3.enableItems(n["seltype"].split(" ")[t]),o.iptvVlanView.lan4.enableItems(n["seltype"].split(" ")[t])}else o.iptvVlanView.allVlan.hide();"none"===V.iptvVlan.mode.getValue()&&o.iptvVlanView.allVlan.hide()}}}})}},function(t,n,l,i,p,o){var a=null;return{lanNum:4,MODE:{"ADVANCED":"advanced","QUICK_SETUP":"qs"},setMode:function(e){(a=e)===t.MODE.QUICK_SETUP&&(l.iptvVlan.enable.hide(),e=i.modeStore.getData(),v.each(e,function(e){delete e.key}),e=[{name:v.su.CHAR.NETWORK_IPTV.NONE,value:"none",boxlabel:"mode16"}].concat(e),l.iptvVlan.mode.loadItems(e))},getMode:function(){return a},startup:function(a){l.iptvVlan.load({success:function(e){var i;t.getMode()==t.MODE.ADVANCED?(p.quickSetup.isSupportSetPort()?l.iptvPortModel.load({success:function(e){t.setlanLabels()}}):t.setlanLabels(),l.iptvVlan.enable.enable(),o.device.getLanIptv()||"1"!=l.lanAdvLinkAggModel.enableAgg.getValue()||(l.iptvVlan.enable.disable(),o.device.getConfig().supportLanAggCfg&&(l.iptvVlan.mode.hide(),n.iptvVlanView.iptvConfigWrap.hide()),i='<a href="#lanAdv">'+v.su.CHAR.NETWORK_IPTV.LA+"</a>",i=v.su.CHAR.NETWORK_IPTV.IPTV_DISABLE_TIPS.replace("%function%",i),l.iptvVlan.enable.setTips(i))):(t.setlanLabels(),l.iptvVlan.enable.hide(),l.iptvVlan.mode.setLabelField(v.su.CHAR.NETWORK_IPTV.ISP_PRO),t.isEditable()?l.iptvVlan.enable.setValue("on"):(l.iptvVlan.mode.disable(),l.iptvVlan.enable.setValue("off"))),a&&(l.iptvVlan.mode.enable(),l.iptvVlan.mode.setValue(a))}})},setlanLabels:function(){var e,i=l.iptvVlan.ports.getValue().split(" ");p.quickSetup.isSupportSetPort()&&(e="1000WAN"===(t.getMode()===t.MODE.QUICK_SETUP?l.quickSetupModel:l.iptvPortModel).wanPortStatus.getValue()?v.su.CHAR.NETWORK_MAP.PORT_2500LAN:v.su.CHAR.NETWORK_MAP.PORT_1000LAN,n.iptvVlanView["lan4"].setLabelField(e),i.pop());for(var a=0;a<i.length;a++)n.iptvVlanView["lan"+(a+1)].setLabelField(v.su.CHAR.NETWORK_IPTV.LAN+i[a])},atLeastOne:function(){for(var e=t.lanNum,i=!1,a=1;a<=e;a++)"Internet"==n.iptvVlanView["lan"+a].getValue()&&(i=!0);return!!i||(n.iptvVlanView["lan"+e].setError(v.su.CHAR.ERROR["00000095"]),!1)},vidSame:function(){var e,i,a,n;return"Custom"!==l.iptvVlan.mode.getValue()||(e=+l.iptvVlan.internetVid.getValue(),i=+l.iptvVlan.ipphoneVid.getValue(),a=+l.iptvVlan.iptvVid.getValue(),n=+l.iptvVlan.mciptvVid.getValue(),e==i?(l.iptvVlan.ipphoneVid.setError(v.su.CHAR.ERROR["00000094"]),!1):i==a||e==a?(l.iptvVlan.iptvVid.setError(v.su.CHAR.ERROR["00000094"]),!1):i!=n&&e!=n&&a!=n||(l.iptvVlan.mciptvVid.setError(v.su.CHAR.ERROR["00000094"]),!1))},syncQsData:function(){var e=l.iptvVlan.getData(),a=l.quickSetupModel,i=["ispSpecialInternetVid","ispSpecialInternetVprio","ispSpecialInternetTag","ispSpecialIpphoneVid","ispSpecialIpphoneVprio","ispSpecialIptvVid","ispSpecialIptvVprio","ispSpecialMciptvEnable"];if(l.iptvVlan.validate()&&t.vidSame()&&t.atLeastOne()){switch(a.replaceData({ispSpecialMode:e.mode,ispSpecialEnable:"on"}),e.mode){case"none":a.ispSpecialEnable.setValue("off"),n(i);break;case"Bridge":a.replaceData({ispSpecialInternetTag:"off",ispSpecialMciptvEnable:"off"});break;case"Custom":a.replaceData({ispSpecialEnable:e.enable,ispSpecialInternetVid:Number(e.internetVid),ispSpecialInternetVprio:e.internetVprio,ispSpecialInternetTag:e.internetTag,ispSpecialIpphoneVid:Number(e.ipphoneVid),ispSpecialIpphoneVprio:e.ipphoneVprio,ispSpecialIptvVid:Number(e.iptvVid),ispSpecialIptvVprio:e.iptvVprio,ispSpecialMciptvEnable:e.mciptvEnable}),"on"===e.mciptvEnable&&a.replaceData({ispSpecialMciptvVid:Number(e.mciptvVid),ispSpecialMciptvVprio:e.mciptvVprio});break;default:n(i)}return"none"!==e.mode&&a.replaceData({ispSpecialPorttype:e.porttype}),l.qsSummaryModel.ispProfile.setValue(l.iptvVlan.mode.getText()),!0}return!1;function n(e){for(var i=e.length-1;i--;)a[e[i]].setValue("")}},isEditable:function(){return!(o.device.getConfig().supportLanAggCfg&&"1"==l.lanAdvLinkAggModel.enableAgg.getValue()&&!o.device.getLanIptv())}}})}(jQuery),$.su.storeManager.define("modeStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.SINGAPORE_SINGTEL,value:"ExStream",boxlabel:"mode0"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_UNIFI,value:"Unifi",boxlabel:"mode1"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS,value:"Maxis",boxlabel:"mode2"},{name:$.su.CHAR.NETWORK_IPTV.MALAYSIA_MAXIS2,value:"Maxis2",boxlabel:"mode10"},{name:$.su.CHAR.NETWORK_IPTV.CELCOM,value:"Celcom",boxlabel:"mode11"},{name:$.su.CHAR.NETWORK_IPTV.VIETNAM_VIETTEL,value:"Vietnam",boxlabel:"mode3"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_MEO,value:"MEO",boxlabel:"mode4"},{name:$.su.CHAR.NETWORK_IPTV.PORTUGAL_VODAFONE,value:"VDF",boxlabel:"mode5"},{name:$.su.CHAR.NETWORK_IPTV.AUSTRALIA_NBN,value:"nbn",boxlabel:"mode6"},{name:$.su.CHAR.NETWORK_IPTV.NEWZEALAND_UFB,value:"ufb",boxlabel:"mode7"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM1,value:"TELEKOM1",boxlabel:"mode12"},{name:$.su.CHAR.NETWORK_IPTV.TELEKOM2,value:"TELEKOM2",boxlabel:"mode13"},{name:$.su.CHAR.NETWORK_IPTV.AIS,value:"AIS",boxlabel:"mode14"},{name:$.su.CHAR.NETWORK_IPTV.CENTURYLINK,value:"CENTURYLINK",boxlabel:"mode15"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"mode8"},{name:$.su.CHAR.NETWORK_IPTV.CUSTOM,value:"Custom",boxlabel:"mode9"}]}),$.su.storeManager.define("lanStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.INTERNET,value:"Internet",boxlabel:"lanmode0"},{name:$.su.CHAR.NETWORK_IPTV.IPTV,value:"IPTV",boxlabel:"lanmode1"},{name:$.su.CHAR.NETWORK_IPTV.VOLP,value:"IP-Phone",boxlabel:"lanmode2"},{name:$.su.CHAR.NETWORK_IPTV.BRIDGE,value:"Bridge",boxlabel:"lanmode3"}]}),$.su.storeManager.define("lanTagStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.NETWORK_IPTV.TAGGED,value:"tagged",boxlabel:"lanTag0"},{name:$.su.CHAR.NETWORK_IPTV.UNTAGGED,value:"untagged",boxlabel:"lanTag1"}]}),$.su.storeManager.define("lanPriorityStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:"0",value:0,boxlabel:"lanPriority0"},{name:"1",value:1,boxlabel:"lanPriority1"},{name:"2",value:2,boxlabel:"lanPriority2"},{name:"3",value:3,boxlabel:"lanPriority3"},{name:"4",value:4,boxlabel:"lanPriority4"},{name:"5",value:5,boxlabel:"lanPriority5"},{name:"6",value:6,boxlabel:"lanPriority6"},{name:"7",value:7,boxlabel:"lanPriority7"}]}),$.su.storeManager.define("iptvVlanStore",{type:"store",fields:[{name:"lan"},{name:"lanTag"},{name:"lanComb"},{name:"lanVid",vtype:{vtype:"number",min:1,max:4096,minMaxText:$.su.CHAR.NETWORK_IPTV.VALUE_TIPS},allowBlank:!1},{name:"lanPriority"},{name:"lanTips"}],convert:function(e){for(var i=[],a=e.ports.split(" "),n=e.porttype.split(" "),t=0;t<a.length;t++)i[t]={},i[t]["lan"]="IP-Phone"===n[t]?"VoIP":n[t],i[t]["lanTag"]=e["lan"+a[t]+"Tag"],i[t]["lanVid"]=e["lan"+a[t]+"Vid"],i[t]["lanPriority"]=e["lan"+a[t]+"Priority"];return i},serialize:function(e){return{}},proxy:{url:$.su.url("/admin/iptv?form=setting")}}),$.su.define("iptvProxy",{extend:"IPFProxy",url:$.su.url("/admin/iptv?form=setting"),preventSuccessEvent:!0}),$.su.modelManager.define("iptvPortModel",{type:"model",fields:[{name:"wanPortStatus",mapping:"wan_port_status"}],proxy:{url:$.su.url("/admin/network?form=wan_port_status")}});