!function(r){r.su.moduleManager.define("mapClients",{services:["ajax","timer","device","vtype"],deps:["networkMap","navigatorController"],models:["statusAll","accessControl","accessControlEnableM","speedLimitModel"],stores:["connectedClientsStore","onlineDeviceStore","bandwidthUnitStore","speedLimitDownloadStore","speedLimitUploadStore"],views:["mapClientsView"],listeners:{ev_on_launch:function(e,t,n,a,i,s,c){this.unRegisterAutoSaveData([i.connectedClientsStore,i.onlineDeviceStore,a.speedLimitModel]),t.getClients(),"router"==c.device.getCurrentMode()?t.getAccessControlMode({success:function(e){"black"===e.accessMode?n.mapClientsView.mapClientsAccessControlBtn.setText(r.su.CHAR.NETWORK_MAP.VIEW_BLACKLIST):n.mapClientsView.mapClientsAccessControlBtn.setText(r.su.CHAR.NETWORK_MAP.VIEW_WHITELIST),n.mapClientsView.blockConfirmMsg.setContent(r.su.CHAR.NETWORK_MAP.BLOCK_MSG_BLACKLIST)}}):(n.mapClientsView.mapClientsAccessControlBtn.hide(),i.connectedClientsStore.hideColumn("downloadSpeed"),i.connectedClientsStore.hideColumn("block"),i.connectedClientsStore.hideColumn("action-column"))},ev_before_destroy:function(e,t){t.beforeDestroy()}},init:function(s,a,e,o,t,i){var l=i.device.getConfig().supportSpeedLimit&&"router"===i.device.getCurrentMode(),c={"24G":{type:"2g",text:"G24"},"5G":{type:"5g",text:"G5"},"51G":{type:"5g-1",text:"G5_1"},"52G":{type:"5g-2",text:"G5_2"},"6G":{type:"6g",text:"G6"}};this.configViews({id:"mapClientsView",items:[{id:"connected-clients-grid",cls:" container widget-container "+(l?"speed-limit-grid ":""),configs:{columns:[{dataIndex:"deviceName",cls:"m-hide l-hide xl-hide label-empty",renderer:function(e,t){e="<div>"+e;return e+='<div class="phone edit" deviceName="'+t.deviceName+'" mac="'+t.mac+'"></div></div>'}},{dataIndex:"deviceType",cls:"m-hide l-hide xl-hide label-empty",renderer:function(e,t){var n="";return(n+=s.generateDeviceIcon(t))+'<div class="device-info-container widget-container">'+('<div class="mac">'+t.mac+"</div>")+('<div class="ip">'+("0.0.0.0"==t.ip?"":t.ip)+"</div>")+"</div>"}},{text:l?r.su.CHAR.NETWORK_MAP.DEVICE_INFO:r.su.CHAR.NETWORK_MAP.TYPE,dataIndex:"deviceName",width:l?220:"10%",cls:"s-hide",renderer:function(e,t){var n="";return n+=s.generateDeviceIcon(t)}},{text:r.su.CHAR.NETWORK_MAP.INFORMATION,dataIndex:"deviceName",cls:"s-hide",hideColumn:l,renderer:function(e,t){var n="";return n="object"===r.type(t)?(n=(n=(n+='<div class="device-info-container widget-container">')+'<div class="name" title="'+e+'">'+e+'</div><div class="mac">'+t.mac+"</div>")+'<div class="ip">'+("0.0.0.0"==t.ip?"":t.ip)+"</div>")+'<div class="edit" deviceName="'+e+'" mac="'+t.mac+'"></div></div>':n}},{text:r.su.CHAR.NETWORK_MAP.REAL_TIME_RATE,dataIndex:"downloadSpeed",renderer:function(e,t){var n,a;return l&&!1===t.speedLimitOnline?'<div class="real-time-offline">---</div>':(n="","object"===r.type(t)&&(a=s.convertSpeedVal(t.downloadSpeed),n=(n=(n=(n=(n+='<div class="speed-upload-container widget-container">')+'<span class="icon"></span><span class="text">'+(t=s.convertSpeedVal(t.uploadSpeed)).speed+"</span>")+'<span class="unit">'+t.unit+'</span></div><div class="speed-download-container widget-container">')+'<span class="icon"></span><span class="text">'+a.speed+"</span>")+'<span class="unit">'+a.unit+"</span></div>"),n)}},{text:r.su.CHAR.NETWORK_MAP.INTERFACE,dataIndex:"deviceTag",width:"15%",cls:"center-td s-2-col",hideColumn:l,renderer:function(e,t){var n=s.detectNetworkMode(t.deviceTag),a="",i="";if(!n)return"---";switch(n){case"LAN":a="<span class='icon icon-interface'></span>";break;case"offline":a=r.su.CHAR.NETWORK_MAP.OFFLINE;break;default:a="<span class='icon icon-wireless signal-%signal%'></span><span class='text text-%mode%'>%text%</span>".replace("%signal%",t.signal).replace("%mode%",c[n]["type"]).replace("%text%",r.su.CHAR.NETWORK_MAP[c[n]["text"]])}return(i+='<div class="interface-container widget-container">')+a+"</div>"}},{text:r.su.CHAR.NETWORK_MAP.TXRX,dataIndex:"txrate",cls:"center-td",width:"15%",renderer:function(e,t){var n;return l&&!1===t.speedLimitOnline?"---":(n="---","wired"!==t.deviceTag&&"offline"!==t.deviceTag&&null!=e&&(t.signal,-1!==e.indexOf("-")&&-1!==t.rxrate.indexOf("-")||(n=e+" / "+t.rxrate)),n)}},{text:r.su.CHAR.NETWORK_MAP.DURATION,dataIndex:"remainTime",width:"15%",cls:"center-td "+(l?"":"s-last-td"),renderer:function(e,t){var n,a,i;return l&&!1===t.speedLimitOnline?"---":(t=t.duration,i="",i+='<div class="duration-container widget-container">',n=parseInt(t/86400,10),a=parseInt(t%86400/3600,10),t=parseInt(t%3600/60,10),1===n?i=i+n+" "+r.su.CHAR.NETWORK_MAP.DAY+" ":1<n&&(i=i+n+" "+r.su.CHAR.NETWORK_MAP.DAYS+" "),(i=(i=0<a?i+a+" "+r.su.CHAR.NETWORK_MAP.H+" ":i)+t+" "+r.su.CHAR.NETWORK_MAP.MIN)+"</div>")}},{text:r.su.CHAR.NETWORK_MAP.SPEED_LIMIT,dataIndex:"enableLimit",cls:"s-last-td center-td",hideColumn:!l,renderer:function(e,t){var n,a,i;return!0===t.isGuest?"---":(a=s.convertSpeedLimitVal(t.downloadLimit,!(n="")),i=s.convertSpeedLimitVal(t.uploadLimit,!0),n+='<div class="speed-limit-info-container">',"object"===r.type(t)&&"off"!==e?(n+='<div class="speed-upload-container widget-container"><span class="icon"></span>',-1!==t.uploadLimit?n=(n+='<span class="text">'+i.speed+"</span>")+'<span class="unit">'+i.unit+"</span>":n+="---",n+='</div><div class="speed-download-container widget-container"><span class="icon"></span>',-1!==t.downloadLimit?n=(n+='<span class="text">'+a.speed+"</span>")+'<span class="unit">'+a.unit+"</span>":n+="---",n+="</div>"):n+='<div class="empty-content">---</div>',n+('<div class="edit-limit" key="'+t.key)+'"></div></div>')}},{text:r.su.CHAR.NETWORK_MAP.BLOCK,xtype:"actioncolumn",dataIndex:"block",width:"10%",renderer:function(e,t){if(l&&!1===t.speedLimitOnline)return"---";for(var n=o.onlineDeviceStore.getData(),a="",i=0,s=n.length;i<s;i++)n[i].mac==t.mac&&(a="HOST"==n[i].host?"disabled":"");var c="";return c+('<a href="javascript:void(0)" class="grid-content-btn btn-block '+a+'">')+'<span class="icon"></span>'+'<span class="text"></span>'+"</a>"}}]}}]}),this.control({"#connected-clients-grid => .btn-block":{ev_grid_action_click:function(e,t){-1<e.target.className.indexOf("disable")||(e=o.connectedClientsStore.getModelByKey(t),s.blockData={key:e.key.getValue(),deviceType:e.deviceType.getValue(),name:e.deviceName.getValue(),mac:e.mac.getValue(),ipaddr:e.ip.getValue(),conn_type:"wireless",host:"NOT HOST"},a.mapClientsView.blockConfirmMsg.show())}},"#connected-clients-grid => .edit":{click:function(e,t){a.mapClientsView.clientNameMsg.show(),a.mapClientsView.clientNameModelAlias.setValue(r(e.currentTarget).attr("deviceName")),a.mapClientsView.clientNameModelMac.setValue(r(e.currentTarget).attr("mac"))}},"#client-name-msg":{ev_msg_ok:function(e,t){var n;!0===s.checkDeviceName(a.mapClientsView.clientNameModelAlias.getValue())?(i.ajax.request({data:{operation:"write",mac:a.mapClientsView.clientNameModelMac.getValue(),alias:a.mapClientsView.clientNameModelAlias.getValue()},proxy:"changeDeviceNameProxy",success:function(e){r.each(o.connectedClientsStore.getData(),function(e,t){t.mac==a.mapClientsView.clientNameModelMac.getValue()&&(r("[data-key="+t.key+"] .device-info-container .name").text(a.mapClientsView.clientNameModelAlias.getValue()),r("#connected-clients-grid_tr_"+t.key+"_td_1 .content div").html(a.mapClientsView.clientNameModelAlias.getValue()+'<div class="phone edit" devicename="'+a.mapClientsView.clientNameModelAlias.getValue()+'" mac="'+a.mapClientsView.clientNameModelMac.getValue()+'"></div>'))})}}),a.mapClientsView.clientNameMsg.hide()):(n=r.su.CHAR.VTYPETEXT.DEVICE_NAME_INVALID,(a.mapClientsView.clientNameModelAlias.getValue().length<1||64<a.mapClientsView.clientNameModelAlias.getValue().length)&&(n=r.su.CHAR.VTYPETEXT.LEN_MIN_MAX.replace("%min",1).replace("%max",64)),a.mapClientsView.clientNameModelAlias.setError(n)),t.preventDefault()},ev_msg_cancel:function(e,t){}},"#map-clients-access-control-btn":{ev_button_click:function(e){t.navigatorController.goTo("accessControl")}},"#block-confirm-msg":{ev_msg_ok:function(e){s.blockDevice(s.blockData)}}}),this.listen({})}},function(a,n,i,s,c,o){return{delayInterval:0,currentEnablePriority:!1,currentDownloadLimitMax:1e3,currentUploadLimitMax:1e3,speedLimitMaxRules:0,isTriband:o.device.getIsTriband(),getClients:function(){a.getClientsInterval=o.timer.setInterval(a,function(){var e;"clients"!=c.networkMap.getCurrentModule()||n.mapClientsView.clientNameMsg.viewObjs[0].settings.shown||n.mapClientsView.blockConfirmMsg.viewObjs[0].settings.shown||0<a.delayInterval||(a.delayInterval=1,e={data:{operation:"loadSpeed"},success:function(e){a.delayInterval=0,c.networkMap.trigger("ev_clients_number_changed",s.connectedClientsStore.getData().length)},fail:function(){a.delayInterval=0},error:function(){a.delayInterval=0}},s.onlineDeviceStore.load({url:r.su.url("/admin/access_control?form=black_devices")}),s.connectedClientsStore.load(e))},20011,!0)},getAccessControlMode:function(e){var t;e&&(t=e.success),s.onlineDeviceStore.load({url:r.su.url("/admin/access_control?form=black_devices")}),i.accessControlEnableM.load(),i.accessControl.load({success:function(e){t&&t(i.accessControl.getData())}})},setBlackMode:function(t){"off"==i.accessControlEnableM.enable.getValue()&&i.accessControlEnableM.load({data:{operation:"write",enable:"on"}}),i.accessControl.load({data:{operation:"write",access_mode:"black"},success:function(e){n.mapClientsView.mapClientsAccessControlBtn.setText(r.su.CHAR.NETWORK_MAP.VIEW_BLACKLIST),n.mapClientsView.blockConfirmMsg.setContent(r.su.CHAR.NETWORK_MAP.BLOCK_MSG_BLACKLIST),t&&t()}})},blockDevice:function(e){function t(){o.ajax.request({data:{operation:"block",data:JSON.stringify([e]),index:s.connectedClientsStore.getIndex(e.key),key:e.key},url:r.su.url("/admin/access_control?form=black_devices"),success:function(){s.onlineDeviceStore.load({url:r.su.url("/admin/access_control?form=black_devices"),success:function(){s.connectedClientsStore.load({data:{operation:"loadDevice"},success:function(e){c.networkMap.trigger("ev_clients_number_changed",s.connectedClientsStore.getData().length)}})}})}})}"on"==i.accessControlEnableM.enable.getValue()&&"black"==i.accessControl.accessMode.getValue()?t():a.setBlackMode(t)},beforeDestroy:function(){clearInterval(null)},getIPaddr:function(e){if(deviceStatusData)for(var t in deviceStatusData)for(var n=0,a=deviceStatusData[t].length;n<a;n++)if(deviceStatusData[t][n].macaddr==e)return deviceStatusData[t][n].ipaddr||"";return""},getConnectType:function(e){if(deviceStatusData)for(var t in deviceStatusData)for(var n=0,a=deviceStatusData[t].length;n<a;n++)if(deviceStatusData[t][n].macaddr==e)return t;return""},getSignal:function(e,t){var n;o.ajax.request({data:{operation:"read",mac:e,type:"wireless"},proxy:"clientSignalProxy",success:function(e){n=a.convertSignal(e.signal),r("#connected-clients-grid_tr_"+t+" .icon-wireless").addClass("signal-"+n)}})},convertSignal:function(e){e=+e+91;return e<=0?0:e<10?1:e<20?2:e<30?3:e<50?4:5},checkDeviceName:function(e){return 0<e.length&&e.length<65&&o.vtype.validate(e,{vtype:"deviceName"})},convertSpeedVal:function(e,t){e=parseInt(e,10)*(t?1024:8);var n,t={};return t.speed=e,t.unit=r.su.CHAR.NETWORK_MAP.KBPS_BIT,0!==e&&(n=(e=e/1024)/1024,e<1?t.speed=e.toFixed(2):n<1?t.speed=e<1e3?e.toFixed(1):Math.floor(e):(t.speed=n.toFixed(1),t.unit=r.su.CHAR.NETWORK_MAP.MBPS_BIT)),t},convertSpeedLimitVal:function(e,t){var e=parseInt(e,10),n=e<1024?r.su.CHAR.NETWORK_MAP.KBPS_BIT:(e=(e/1024).toFixed(0),r.su.CHAR.NETWORK_MAP.MBPS_BIT);return{speed:e,unit:n}},generateDeviceIcon:function(e){var t="",t=(t+='<div class="device-type-container widget-container">')+('<span class="icon '+a.detectDeviceType(e.deviceType)+' ">')+"</span>";return null!=e.enableInternet&&(t+='<span class="text">'+(e.enableInternet?"":r.su.CHAR.NETWORK_MAP.INTERNET_PAUSED)+"</span>"),t+="</div>"},detectDeviceType:function(e){return"other"===(e=e.toLowerCase())?"icon-pc":"icon-"+e},detectNetworkMode:function(e){var t="";switch(e){case"2.4G":case"2.4G_guest":t="24G";break;case"5G":case"5G_guest":t=o.device.getIsTriband()?"51G":"5G";break;case"5G_1":case"5G_1_guest":t="51G";break;case"5G_2":case"5G_2_guest":t="52G";break;case"6G":t="6G";break;case"wired":t="LAN";break;case"unknown":t="";break;default:t="offline"}return t}}})}(jQuery);