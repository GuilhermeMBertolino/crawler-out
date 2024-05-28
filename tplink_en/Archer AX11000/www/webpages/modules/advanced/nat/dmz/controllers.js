!function(m){m.su.moduleManager.define("dmz",{deps:["index"],services:["vtype","ajax"],models:["dmz","lanAdvLanModel"],stores:["portForwardingConnectedDevicesStore","lanAdvSubnetCombo"],views:["dmzView"],listeners:{"ev_on_launch":function(e,t,n,i,d,r,a){n.dmzView.dmzIpAddressWrapper.hide(),n.dmzView.natNotEnabled.hide(),a.ajax.request({proxy:"natSettingProxy",success:function(e){"off"==e.enable?n.dmzView.natNotEnabled.show():n.dmzView.natNotEnabled.hide()}}),i.dmz.load(),i.lanAdvLanModel.load(),this.control({"#dmz-ip-address":{"ev_textbox_blur":function(){var e=t.ipFilter(i.dmz.ipAddr.getValue()),e=a.vtype.validate(e,"ip");1!=e?i.dmz.ipAddr.setError(e):i.dmz.ipAddr.setNormal()}},"#dmz-connected-devices-btn":{"ev_button_click":function(e){n.dmzView.dmzConnectedDevices.show(),d.portForwardingConnectedDevicesStore.load()}},"#dmz-connected-devices-items":{"ev_item_click":function(e,d){i.dmz.ipAddr.setValue(d.ipAddress),n.dmzView.dmzConnectedDevices.close()}},".index-common-save-btn":{"ev_will_auto_save":function(e,d){"on"!=i.dmz.enable.getValue()||t.checkIPAddrSubmit()||d.preventDefault()}}}),this.listen({"models.dmz.enable":{"ev_value_change":function(e,d,t){"on"==d?n.dmzView.dmzIpAddressWrapper.show():n.dmzView.dmzIpAddressWrapper.hide()}}})}},init:function(e,d,t,n,i,r){this.configViews({id:"dmzView",items:[{id:"dmz-connected-devices-items",configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"ip",dataIndex:"ipAddress"},{type:"mac",dataIndex:"macAddress"}]}]})}},function(e,d,o,s,t,n){return{ipToInt:function(e){var d=e.split(".");return 4==d.length&&/^\s*[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[ 0-9]{1,3}\.{1}[0-9]{1,3}\s*$/.test(e)?Number(d[0])*(1<<24)+(Number(d[1])<<16|Number(d[2])<<8|Number(d[3])):-1},isSameNet:function(e,d,t){var n;return""!=e&&(e=(n=this.ipToInt)(e),d=n(d),0!=(t=n(t)))&&(e&t)==(d&t)},getLimitIp:function(e,d,t){for(var n,i=e.split("."),r=d.split("."),a=i.length,o=(r.length,[]),s=0;s<a;++s)"min"==t?o.push(i[s]&r[s]):(n=parseInt(r[s]),o.push(n<128?i[s]|128+(~n-128<<24>>24):i[s]|~n<<24>>24));return o.join(".")},"checkIPAddrSubmit":function(){for(var e,d=this,t=d.ipFilter(o.dmz.ipAddr.getValue()),n=o.lanAdvLanModel.ipaddr.getValue(),i=o.lanAdvLanModel.maskType.getValue(),r=s.lanAdvSubnetCombo.getData(),a=0;a<r.length;a++)r[a].value==i&&(e=r[a].name);return e==m.su.CHAR.NETWORK_LAN.CUSTOM&&(e=o.lanAdvLanModel.customValue.getValue()),d.isSameNet(t,n,e)?t==d.getLimitIp(n,e,"min")||t==d.getLimitIp(n,e,"max")?(o.dmz.ipAddr.setError(m.su.CHAR.DMZ.ERROR2),!1):t!=n||(o.dmz.ipAddr.setError(m.su.CHAR.DMZ.ERROR3),!1):(o.dmz.ipAddr.setError(m.su.CHAR.DMZ.ERROR1),!1)},ipFilter:function(e){return"string"===m.type(e)?e.split(/\s+/)[0]:e}}})}(jQuery);