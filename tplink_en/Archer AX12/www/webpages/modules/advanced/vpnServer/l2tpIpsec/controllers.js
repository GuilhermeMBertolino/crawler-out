!function(P){P.su.moduleManager.define("l2tpIpsec",{stores:["l2tpIpsecEncryptionStore","l2tpIpsecGridStore","dhcpAddressList"],models:["l2tpIpsecModel","dhcpServer","openVpnModel","pptpVpnModel"],deps:["utils","main"],views:["l2tpIpsecView"],listeners:{ev_on_launch:function(e,t,p,s,o,r,l){s.l2tpIpsecModel.load(),o.l2tpIpsecGridStore.load(),s.openVpnModel.load(),s.dhcpServer.load(),s.pptpVpnModel.load(),o.dhcpAddressList.load()}},init:function(c,o,u,I,_,e){var r,l;this.configViews({id:"l2tpIpsecView",items:[{id:"grid-l2tp-ipsec",configs:{minLines:0,popEditor:{addTitle:P.su.CHAR.VPN_SERVER_PPTP.ADD_ACCOUNT,editTitle:P.su.CHAR.VPN_SERVER_PPTP.EDIT_ACCOUNT,addBtnText:P.su.CHAR.OPERATION.ADD_UPPERCASE,editBtnText:P.su.CHAR.OPERATION.ADD_UPPERCASE,content:"#grid-l2tp-ipsec-popEditor",fields:[{name:"username"},{name:"password"}]},paging:{},columns:[{text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.USERNAME,dataIndex:"username"},{text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.PASSWORD,dataIndex:"password",cls:"password-td",xtype:"customWidget",widgetName:"password",settings:{labelField:null,readOnly:!0}},{xtype:"actioncolumn",text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.MODIFY,renderer:function(e,t){var p='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit">';p+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}}]}),this.listen({"models.l2tpIpsecModel.enable":{ev_value_change:function(e,t){"on"===t?o.l2tpIpsecView.l2tpIpsecFieldset.show():o.l2tpIpsecView.l2tpIpsecFieldset.hide()}},"models.l2tpIpsecModel.maxconn":{ev_value_change:function(e,t){u.l2tpIpsecModel.toIpAddr.setTips(P.su.CHAR.VPN_SERVER_L2TP_IPSEC.CLIENT_IP_TIPS.replace("%max%",t))}},"models.l2tpIpsecModel.encrypt":{ev_value_change:function(e,t){"on"===t?(u.l2tpIpsecModel.ipsecKey.enable(),u.l2tpIpsecModel.ipsecKey.show()):(u.l2tpIpsecModel.ipsecKey.disable(),u.l2tpIpsecModel.ipsecKey.hide())}},"models.l2tpIpsecModel":{ev_loaded:function(e,t){l=t.enable},ev_model_submit_complete:function(e,t,p){"success"==t&&(l=p.enable)}}}),this.control({".index-common-save-btn":{ev_will_auto_save:function(e,t){var p=u.l2tpIpsecModel.fromIpAddr.getValue(),s=u.l2tpIpsecModel.toIpAddr.getValue(),o=u.dhcpServer.ipaddrStart.getValue(),r=(u.dhcpServer.ipaddrEnd.getValue(),I.dhcpAddressList.getData()),l=u.openVpnModel.subnet.getValue(),d=(u.openVpnModel.mask.getValue(),u.pptpVpnModel.fromIpAddr.getValue()),n=(u.pptpVpnModel.toIpAddr.getValue(),I.l2tpIpsecGridStore.getData()),a=u.l2tpIpsecModel.enable.getValue();if(u.l2tpIpsecModel.fromIpAddr.setNormal(),u.l2tpIpsecModel.toIpAddr.setNormal(),!0!==c.validateIpRange())return t.preventDefault(),!1;if(P.su.ipToInt(p)>P.su.ipToInt(s))return u.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE),t.preventDefault(),!1;if(10<=P.su.ipToInt(s)-P.su.ipToInt(p))return u.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT),t.preventDefault(),!1;if(_.utils.isSameNet(p,o,"255.255.255.0"))return u.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_DHCP),t.preventDefault(),!1;if(_.utils.isSameNet(s,o,"255.255.255.0"))return u.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_DHCP),t.preventDefault(),!1;for(var i=0;i<r.length;i++)if(P.su.ipToInt(r[i].ip)>=P.su.ipToInt(p)&&P.su.ipToInt(r[i].ip)<=P.su.ipToInt(s))return u.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_RESERVED),t.preventDefault(),!1;return _.utils.isSameNet(p,l,"255.255.255.0")?(u.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_OPENVPN),t.preventDefault(),!1):_.utils.isSameNet(s,l,"255.255.255.0")?(u.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_OPENVPN),t.preventDefault(),!1):_.utils.isSameNet(p,d,"255.255.255.0")?(u.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_PPTPVPN),t.preventDefault(),!1):_.utils.isSameNet(s,d,"255.255.255.0")?(u.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_PPTPVPN),t.preventDefault(),!1):0!=n.length||"on"!=a||(_.main.showNotice(P.su.CHAR.VPN_SERVER_L2TP_IPSEC.NO_ACCOUNT_TIP,1),t.preventDefault(),!1)}},"#ipaddr-start":{ev_textbox_focus:function(){u.l2tpIpsecModel.fromIpAddr.setNormal(),u.l2tpIpsecModel.toIpAddr.setNormal()},ev_textbox_blur:function(){c.validateIpRange()}},"#ipaddr-end":{ev_textbox_focus:function(){u.l2tpIpsecModel.fromIpAddr.setNormal(),u.l2tpIpsecModel.toIpAddr.setNormal()},ev_textbox_blur:function(){c.validateIpRange()}},"#grid-l2tp-ipsec":{ev_grid_before_item_delete:function(e,t,p){var s=I.l2tpIpsecGridStore.getData();r=p,t.preventDefault(),("on"==l&&1==s.length?o.l2tpIpsecView.deleteAccountAlert:o.l2tpIpsecView.deleteAccountConfirm).show()},ev_grid_before_save:function(e,t){for(var p=I.l2tpIpsecGridStore.getEditingModel(),s=I.l2tpIpsecGridStore.getStoreData(),o=p.username.getValue(),r=p.key.getValue(),l=0;l<s.length;l++)if(o===s[l].username&&r!=s[l].key)return p.username.setError(P.su.CHAR.VPN_SERVER_PPTP.USERNAME_CONFLICT),t.preventDefault(),!1;return!0}},"#delete-account-confirm":{ev_msg_ok:function(e){I.l2tpIpsecGridStore.getData();I.l2tpIpsecGridStore.removeDataByKey(r),I.l2tpIpsecGridStore.sync()}}})}},function(e,t,p,s,o,r){return{validateIpRange:function(){var e=p.l2tpIpsecModel.fromIpAddr.getValue(),t=p.l2tpIpsecModel.toIpAddr.getValue();return P.su.ipToInt(e)>P.su.ipToInt(t)?(p.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE),P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE):!(10<=P.su.ipToInt(t)-P.su.ipToInt(e))||(p.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT),P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT)}}})}(jQuery);