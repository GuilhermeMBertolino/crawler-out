!function(o){o.su.moduleManager.define("l2tp",{services:["ajax"],stores:["l2tpGridStore","accessStore","wanStore"],models:["l2tpVpnModel","lanAdvWanModel","lanAdvWanModel"],deps:["utils"],views:["l2tpView"],listeners:{"ev_on_launch":function(n,t,e,a,s,d,l){a.l2tpVpnModel.load(),s.wanStore.load({success:function(n){n.length<=1?a.l2tpVpnModel.wan.hide():a.l2tpVpnModel.wan.show()},fail:function(){a.l2tpVpnModel.wan.hide()},error:function(){a.l2tpVpnModel.wan.hide()}}),s.l2tpGridStore.load(),a.lanAdvWanModel.load({success:function(n){var e=a.lanAdvWanModel.getData();t.lanIpv4Ipaddr=e.lanIpv4Ipaddr,t.wanIpv4Ipaddr=e.wanIpv4Ipaddr,t.wanIpv4Pridns=e.wanIpv4Pridns||"",a.lanAdvWanModel.wanIpv4Ipaddr.disable(),a.lanAdvWanModel.wanIpv4Pridns.disable(),t.wanIpv4Ipaddr||a.lanAdvWanModel.wanIpv4Ipaddr.setError(o.su.CHAR.VPN_SERVER_L2TP.NO_INTERNET_TIPS)}})}},init:function(s,n,d,e,l,t){this.configViews({id:"l2tpView",items:[{id:"grid-l2tp",configs:{minLines:0,popEditor:{addTitle:o.su.CHAR.VPN_SERVER_L2TP.ADD_ACCOUNT,content:"#grid-l2tp-popEditor",fields:[{name:"username"},{name:"password"}]},paging:{},columns:[{text:o.su.CHAR.VPN_SERVER_L2TP.USERNAME,dataIndex:"username"},{text:o.su.CHAR.VPN_SERVER_L2TP.PASSWORD,dataIndex:"password"},{xtype:"actioncolumn",text:o.su.CHAR.VPN_SERVER_L2TP.MODIFY,renderer:function(n,e){return'<span class="icon"></span>','<span class="text"></span>',"</a>",'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete">','<span class="icon"></span>','<span class="text"></span>',"</a>",'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}}]}),this.listen({}),this.control({".index-common-save-btn":{"ev_will_auto_save":function(n,e){var t=d.l2tpVpnModel.subnet.getValue(),a=d.l2tpVpnModel.mask.getValue();if(l.utils.isSameNet(s.lanIpv4Ipaddr,t,a))return d.l2tpVpnModel.subnet.setError(o.su.CHAR.VPN_SERVER_L2TP.SAME_SUBNET_NOTE),e.preventDefault(),!1}},"#grid-l2tp":{"ev_grid_before_item_delete":function(n,e,t){}},"#delete-account-confirm":{"ev_msg_ok":function(n){e.l2tpGridStore.getData();e.l2tpGridStore.removeDataByKey(void 0),e.l2tpGridStore.sync()}}})}},function(n,e,t,a,s,d){return{}})}(jQuery);