!function(P){P.su.moduleManager.define("l2tpIpsec",{services:["ajax"],stores:["l2tpIpsecEncryptionStore","l2tpIpsecGridStore","dhcpAddressList"],models:["l2tpIpsecModel","dhcpServer","openVpnModel","pptpVpnModel"],deps:["utils","main"],views:["l2tpIpsecView"],listeners:{"ev_on_launch":function(e,t,p,s,r,o,l){s.l2tpIpsecModel.load(),r.l2tpIpsecGridStore.load(),s.openVpnModel.load(),s.dhcpServer.load(),s.pptpVpnModel.load(),r.dhcpAddressList.load()}},init:function(c,r,I,u,_,e){var o,l;this.configViews({id:"l2tpIpsecView",items:[{id:"grid-l2tp-ipsec",configs:{minLines:0,popEditor:{addTitle:P.su.CHAR.VPN_SERVER_PPTP.ADD_ACCOUNT,editTitle:P.su.CHAR.VPN_SERVER_PPTP.EDIT_ACCOUNT,addBtnText:P.su.CHAR.OPERATION.ADD_UPPERCASE,editBtnText:P.su.CHAR.OPERATION.ADD_UPPERCASE,content:"#grid-l2tp-ipsec-popEditor",fields:[{name:"username"},{name:"password"}]},paging:{},columns:[{text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.USERNAME,dataIndex:"username"},{text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.PASSWORD,dataIndex:"password"},{xtype:"actioncolumn",text:P.su.CHAR.VPN_SERVER_L2TP_IPSEC.MODIFY,renderer:function(e,t){var p='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit">';p+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}}]}),this.listen({"models.l2tpIpsecModel.enable":{"ev_value_change":function(e,t){"on"===t?r.l2tpIpsecView.l2tpIpsecFieldset.show():r.l2tpIpsecView.l2tpIpsecFieldset.hide()}},"models.l2tpIpsecModel.maxconn":{"ev_value_change":function(e,t){I.l2tpIpsecModel.toIpAddr.setTips(P.su.CHAR.VPN_SERVER_L2TP_IPSEC.CLIENT_IP_TIPS.replace("%max%",t))}},"models.l2tpIpsecModel.encrypt":{"ev_value_change":function(e,t){"on"===t?(I.l2tpIpsecModel.ipsecKey.enable(),I.l2tpIpsecModel.ipsecKey.show()):(I.l2tpIpsecModel.ipsecKey.disable(),I.l2tpIpsecModel.ipsecKey.hide())}},"models.l2tpIpsecModel":{"ev_loaded":function(e,t){l=t.enable},"ev_model_submit_complete":function(e,t,p){"success"==t&&(l=p.enable)}}}),this.control({".index-common-save-btn":{"ev_will_auto_save":function(i,e){var t=I.l2tpIpsecModel.fromIpAddr.getValue(),p=I.l2tpIpsecModel.toIpAddr.getValue(),s=I.dhcpServer.ipaddrStart.getValue(),r=(I.dhcpServer.ipaddrEnd.getValue(),u.dhcpAddressList.getData()),o=I.openVpnModel.subnet.getValue(),l=(I.openVpnModel.mask.getValue(),I.pptpVpnModel.fromIpAddr.getValue()),d=(I.pptpVpnModel.toIpAddr.getValue(),u.l2tpIpsecGridStore.getData()),n=I.l2tpIpsecModel.enable.getValue();if(I.l2tpIpsecModel.fromIpAddr.setNormal(),I.l2tpIpsecModel.toIpAddr.setNormal(),!0!==c.validateIpRange())return e.preventDefault(),!1;if(P.su.ipToInt(t)>P.su.ipToInt(p))return I.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE),e.preventDefault(),!1;if(10<=P.su.ipToInt(p)-P.su.ipToInt(t))return I.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT),e.preventDefault(),!1;if(_.utils.isSameNet(t,s,"255.255.255.0"))return I.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_DHCP),e.preventDefault(),!1;if(_.utils.isSameNet(p,s,"255.255.255.0"))return I.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_DHCP),e.preventDefault(),!1;for(var a=0;a<r.length;a++)if(P.su.ipToInt(r[a].ip)>=P.su.ipToInt(t)&&P.su.ipToInt(r[a].ip)<=P.su.ipToInt(p))return I.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_RESERVED),e.preventDefault(),!1;return _.utils.isSameNet(t,o,"255.255.255.0")?(I.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_OPENVPN),e.preventDefault(),!1):_.utils.isSameNet(p,o,"255.255.255.0")?(I.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_OPENVPN),e.preventDefault(),!1):_.utils.isSameNet(t,l,"255.255.255.0")?(I.l2tpIpsecModel.fromIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_PPTPVPN),e.preventDefault(),!1):_.utils.isSameNet(p,l,"255.255.255.0")?(I.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.CONFLICT_WITH_PPTPVPN),e.preventDefault(),!1):0!=d.length||"on"!=n||(_.main.showNotice(P.su.CHAR.VPN_SERVER_L2TP_IPSEC.NO_ACCOUNT_TIP,1),e.preventDefault(),!1)}},"#ipaddr-start":{"ev_textbox_focus":function(){I.l2tpIpsecModel.fromIpAddr.setNormal(),I.l2tpIpsecModel.toIpAddr.setNormal()},"ev_textbox_blur":function(){c.validateIpRange()}},"#ipaddr-end":{"ev_textbox_focus":function(){I.l2tpIpsecModel.fromIpAddr.setNormal(),I.l2tpIpsecModel.toIpAddr.setNormal()},"ev_textbox_blur":function(){c.validateIpRange()}},"#grid-l2tp-ipsec":{"ev_grid_before_item_delete":function(e,t,p){var s=u.l2tpIpsecGridStore.getData();o=p,t.preventDefault(),("on"==l&&1==s.length?r.l2tpIpsecView.deleteAccountAlert:r.l2tpIpsecView.deleteAccountConfirm).show()},"ev_grid_before_save":function(e,t){for(var p=u.l2tpIpsecGridStore.getEditingModel(),s=u.l2tpIpsecGridStore.getStoreData(),r=p.username.getValue(),o=p.key.getValue(),l=0;l<s.length;l++)if(r===s[l].username&&o!=s[l].key)return p.username.setError(P.su.CHAR.VPN_SERVER_PPTP.USERNAME_CONFLICT),t.preventDefault(),!1;return!0}},"#delete-account-confirm":{"ev_msg_ok":function(e){u.l2tpIpsecGridStore.getData();u.l2tpIpsecGridStore.removeDataByKey(o),u.l2tpIpsecGridStore.sync()}}})}},function(e,t,p,s,r,o){return{validateIpRange:function(){var e=p.l2tpIpsecModel.fromIpAddr.getValue(),t=p.l2tpIpsecModel.toIpAddr.getValue();return P.su.ipToInt(e)>P.su.ipToInt(t)?(p.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE),P.su.CHAR.VPN_SERVER_PPTP.IP_RANGE):!(10<=P.su.ipToInt(t)-P.su.ipToInt(e))||(p.l2tpIpsecModel.toIpAddr.setError(P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT),P.su.CHAR.VPN_SERVER_PPTP.PORT_RANGE_OUT)}}})}(jQuery);