jQuery.su.moduleManager.define("dhcpServerAdv",{models:[],services:["moduleLoader"],stores:[],views:["dhcpServerAdvView"],listeners:{ev_on_launch:function(e,t,d,a,s,i,n){n.moduleLoader.load({module:"dhcpServerAdv"},{module:"dhcpServerSettingAdv"},d.dhcpServerAdvView.dhcpServerSettingLoader),n.moduleLoader.load({module:"dhcpServerAdv"},{module:"addressReservationAdv"},d.dhcpServerAdvView.dhcpAddressResvationLoader),n.moduleLoader.load({module:"dhcpServerAdv"},{module:"dhcpClientListAdv"},d.dhcpServerAdvView.dhcpClientListLoader)}},init:function(e,t,d,a,s,i){this.configViews({id:"dhcpServerAdvView",items:[{id:"dhcp-server-setting-loader"},{id:"dhcp-address-reservation-loader"},{id:"dhcp-client-list-loader"}]})}},function(e,t,d,a,s,i){return{}}),$.su.modelManager.define("dhcpServer",{type:"model",fields:[{name:"enable"},{name:"ipaddrStart",mapping:"ipaddr_start",vtype:"ip",validator:function(e,t){return!($.su.ipToInt(e)>$.su.ipToInt(t.ipaddrEnd.getValue()))||$.su.CHAR.NETWORK_DHCP.IP_RANGE},allowBlank:!1},{name:"ipaddrEnd",mapping:"ipaddr_end",vtype:"ip",validator:function(e,t){return!($.su.ipToInt(e)<$.su.ipToInt(t.ipaddrStart.getValue()))||$.su.CHAR.NETWORK_DHCP.IP_RANGE},allowBlank:!1},{name:"leasetime",vtype:{vtype:"number",min:"1",max:"2880",minMaxText:$.su.CHAR.NETWORK_INTERNET.VALUE_TIPS+" "+$.su.CHAR.NETWORK_INTERNET.VALUE_DEFAULT+"120."},defaultValue:"120",allowBlank:!1},{name:"gateway",vtype:"ip",allowBlank:!0},{name:"priDns",mapping:"pri_dns",vtype:"ip",allowBlank:!0},{name:"sndDns",mapping:"snd_dns",vtype:"ip",allowBlank:!0}],proxy:{url:$.su.url("/admin/dhcps?form=setting")}}),$.su.storeManager.define("dhcpAddressList",{type:"store",fields:[{name:"mac",vtype:"mac",allowBlank:!1},{name:"ip",vtype:"ip",allowBlank:!1},{name:"enable",defaultValue:"on"},{name:"hostname"}],proxy:{url:$.su.url("/admin/dhcps?form=reservation")}}),$.su.storeManager.define("dhcpConnectedDeviceList",{type:"store",fields:[{name:"key"},{name:"name"},{name:"macaddr"},{name:"ipaddr"},{name:"leasetime"}],data:[],proxy:{url:$.su.url("/admin/dhcps?form=client")}}),$.su.modelManager.define("dhcpEditAddressReservation",{type:"model",fields:[{name:"key"},{name:"name",allowBlank:!1},{name:"mac",vtype:"mac",allowBlank:!1},{name:"ip",vtype:"ip",allowBlank:!1},{name:"enable"}]}),function(o){o.su.moduleManager.define("addressReservationAdv",{models:["dhcpServer","dhcpEditAddressReservation"],services:["ajax"],deps:["utils"],stores:["dhcpAddressList","dhcpConnectedDeviceList"],views:["addressReservationAdvView"],listeners:{ev_on_launch:function(e,t,d,a,s,i,n){s.dhcpAddressList.load(),this.unRegisterAutoSaveData([a.dhcpServer,s.dhcpAddressList]),d.addressReservationAdvView.addAddressReservationErrText.setText(o.su.CHAR.ERROR["00000153"])}},init:function(a,d,s,i,e,t){this.configViews({id:"addressReservationAdvView",items:[{id:"grid-addressList",configs:{minLines:0,popEditor:{addTitle:o.su.CHAR.NETWORK_DHCP.ADD_RESERVATION_TITLE,editTitle:o.su.CHAR.NETWORK_DHCP.MODIFY_RESERVATION_TITLE,content:"#reservation-entry-edit",customBtns:"#dhcp-edit-btns",fields:[{name:"mac"},{name:"ip"},{name:"enable"}]},paging:{},columns:[{text:o.su.CHAR.NETWORK_DHCP.DEVICE_NAME,dataIndex:"hostname",width:"25%"},{text:o.su.CHAR.NETWORK_DHCP.MAC,dataIndex:"mac",width:"22%"},{text:o.su.CHAR.NETWORK_DHCP.STATUS,dataIndex:"enable",xtype:"customWidget",widgetName:"switch",settings:{trueValue:"on",falseValue:"off"},cls:"status l-hide xl-hide"},{text:o.su.CHAR.NETWORK_DHCP.RESERVED_IP,dataIndex:"ip",width:"25%"},{text:o.su.CHAR.NETWORK_DHCP.STATUS,dataIndex:"enable",xtype:"customWidget",widgetName:"switch",settings:{trueValue:"on",falseValue:"off"},cls:"status s-hide m-hide",width:"17%"},{xtype:"actioncolumn",text:o.su.CHAR.NETWORK_DHCP.MODIFY,renderer:function(e,t){var d='<a href="javascript:void(0)" class="grid-content-btn dhcpAddressList-edit grid-content-btn-edit btn-edit">';d+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn dhcpAddressList-edit grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"reservation-entry-add-box"},{id:"reservation-entry-edit-box"},{id:"reservation-entry-change-msg"},{id:"reservation-entry-del-msg"},{id:"connected-device-box"},{id:"connected-device-list",configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"macaddr"},{type:"ip",dataIndex:"ipaddr"}]}]}),this.control({"#grid-addressList":{"ev_grid_before_edit":function(e,t,d){d===undefined?a.itemKey="add":a.itemKey=d}},"#edit-connected-device":{"ev_button_click":function(e,t){i.dhcpConnectedDeviceList.load({success:function(){d.addressReservationAdvView.addDevice.setPosition("center","center")}}),d.addressReservationAdvView.addDevice.setTitle(o.su.CHAR.NETWORK_DHCP.CONNECTED_DEVICES),d.addressReservationAdvView.addDevice.show()}},"#connected-device-list":{"ev_item_click":function(e,t){t&&(s.dhcpEditAddressReservation.name.setValue(t.name),s.dhcpEditAddressReservation.ip.setValue(t.ipaddr),o("#edit-reservation-entry-ip").triggerHandler("ev_textbox_blur"),s.dhcpEditAddressReservation.mac.setValue(t.macaddr),o("#edit-reservation-entry-mac").triggerHandler("ev_textbox_blur")),d.addressReservationAdvView.addDevice.close()}},"#edit-reservation-entry-mac":{"ev_textbox_blur":function(e){var t=s.dhcpEditAddressReservation.mac.getValue(),d=s.dhcpEditAddressReservation.ip.getValue(),t=a.isEditMacIllegal(t);t?(s.dhcpEditAddressReservation.mac.setError(t),i.dhcpAddressList.getPlugin("popEditor").saveObj.disable()):a.isEditIpIllegal(d)||i.dhcpAddressList.getPlugin("popEditor").saveObj.enable()}},"#edit-reservation-entry-ip":{"ev_textbox_blur":function(e){var t=s.dhcpEditAddressReservation.mac.getValue(),d=s.dhcpEditAddressReservation.ip.getValue(),d=a.isEditIpIllegal(d);d?(s.dhcpEditAddressReservation.ip.setError(d),i.dhcpAddressList.getPlugin("popEditor").saveObj.disable()):a.isEditMacIllegal(t)||i.dhcpAddressList.getPlugin("popEditor").saveObj.enable()}}}),this.listen({"stores.dhcpAddressList":{"ev_data_change":function(e,t,d){t.value!==t.oldValue&&"enable"===d.getName()&&i.dhcpAddressList.sync()}},"stores.dhcpAddressList.dataObj":{"ev_store_sync_error":function(e,t){"imb duplication"===t&&d.addressReservationAdvView.addAddressReservationErrMsg.show()},"ev_store_sync_success":function(e,t){i.dhcpAddressList.load()}}})}},function(s,e,i,n,r,t){return{itemKey:"",isEditMacIllegal:function(e){i.dhcpServer.getData();for(var t=n.dhcpAddressList.getData(),d=0;d<t.length;d++)if(t[d].mac===e&&("add"===s.itemKey||t[d].key!==s.itemKey))return o.su.CHAR.NETWORK_DHCP.MAC_RESERVED;return!1},isEditIpIllegal:function(e){var t=i.dhcpServer.getData(),d=n.dhcpAddressList.getData();if(r.utils.ipToInt(e)<r.utils.ipToInt(t.ipaddrStart)||r.utils.ipToInt(e)>r.utils.ipToInt(t.ipaddrEnd))return o.su.CHAR.NETWORK_DHCP.IP_NO_IN_RANGE;for(var a=0;a<d.length;a++)if(d[a].ip===e&&("add"===s.itemKey||d[a].key!==s.itemKey))return o.su.CHAR.NETWORK_DHCP.IP_RESERVED;return!1}}})}(jQuery),function(n){n.su.moduleManager.define("dhcpClientListAdv",{models:[],services:[],stores:["dhcpConnectedDeviceList"],views:["dhcpClientListAdvView"],listeners:{ev_on_launch:function(e,t,d,a,s,i,n){s.dhcpConnectedDeviceList.load()}},init:function(e,t,d,a,s,i){this.configViews({id:"dhcpClientListAdvView",items:[{id:"grid-clientList",settings:{statusBarText:n.su.CHAR.NETWORK_DHCP.TOTAL_CLIENTS},configs:{minLines:0,paging:{},columns:[{text:n.su.CHAR.NETWORK_DHCP.DEVICE_NAME,dataIndex:"name",renderer:function(e){return"--"===e?"---":e}},{text:n.su.CHAR.NETWORK_DHCP.MAC,dataIndex:"macaddr",width:"30%"},{text:n.su.CHAR.NETWORK_DHCP.ASSIGNED_IP,dataIndex:"ipaddr",width:"30%"},{text:n.su.CHAR.NETWORK_DHCP.LEASE_TIME,cls:"center-td",dataIndex:"leasetime"}]}}]}),this.listen(),this.control({"#grid-clientList":{"ev_grid_tbar_refresh":function(e){a.dhcpConnectedDeviceList.load({success:function(){n.su.moduleManager.query("main").showNotice(n.su.CHAR.COMMON.SAVED)}})}}})}},function(e,t,d,a,s,i){return{}})}(jQuery),function(o){o.su.moduleManager.define("dhcpServerSettingAdv",{models:["dhcpServer","lanAdvLanModel"],services:[],stores:[],views:["dhcpServerSettingAdvView"],deps:["index","utils"],listeners:{ev_on_launch:function(e,t,d,a,s,i,n){a.dhcpServer.load()}},init:function(i,e,n,t,r,d){n.lanAdvLanModel.load({success:function(){i.lanIp=n.lanAdvLanModel.ipaddr.getValue();var e=n.lanAdvLanModel.maskType.getValue();switch(i.mask="",e){case 0:i.mask="255.255.255.0";break;case 1:i.mask="255.255.0.0";break;case 2:i.mask="255.0.0.0";break;default:i.mask=n.lanAdvLanModel.customValue.getValue()}}}),this.listen({}),this.control({".index-common-save-btn":{"ev_will_auto_save":function(e,t){var d,a,s;"on"==n.dhcpServer.enable.getValue()&&(d=n.dhcpServer.ipaddrStart.getValue(),a=n.dhcpServer.ipaddrEnd.getValue(),s=n.dhcpServer.gateway.getValue(),!r.utils.isSameNet(d,i.lanIp,i.mask)&&n.dhcpServer.ipaddrStart.validate()&&(n.dhcpServer.ipaddrStart.setError(o.su.CHAR.NETWORK_DHCP.LAN_TIP),t.preventDefault()),!r.utils.isSameNet(a,i.lanIp,i.mask)&&n.dhcpServer.ipaddrEnd.validate()&&(n.dhcpServer.ipaddrEnd.setError(o.su.CHAR.NETWORK_DHCP.LAN_TIP),t.preventDefault()),0!==s.length&&!r.utils.isSameNet(s,i.lanIp,i.mask)&&n.dhcpServer.gateway.validate()&&(n.dhcpServer.gateway.setError(o.su.CHAR.NETWORK_DHCP.LAN_TIP),t.preventDefault()),(r.utils.isNetIp(d,i.mask)||r.utils.isBroadCastIp(d,i.mask))&&n.dhcpServer.gateway.validate()&&(n.dhcpServer.ipaddrStart.setError(o.su.CHAR.ERROR["00000059"]),t.preventDefault()),(r.utils.isNetIp(a,i.mask)||r.utils.isBroadCastIp(a,i.mask))&&n.dhcpServer.gateway.validate()&&(n.dhcpServer.ipaddrEnd.setError(o.su.CHAR.ERROR["00000059"]),t.preventDefault()),0!==s.length)&&(r.utils.isNetIp(s,i.mask)||r.utils.isBroadCastIp(s,i.mask))&&n.dhcpServer.gateway.validate()&&(n.dhcpServer.gateway.setError(o.su.CHAR.ERROR["00000059"]),t.preventDefault())}}})}},function(e,t,d,a,s,i){return{}})}(jQuery);