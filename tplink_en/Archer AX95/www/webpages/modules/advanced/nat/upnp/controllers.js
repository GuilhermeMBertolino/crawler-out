!function(l){l.su.moduleManager.define("upnp",{deps:[],services:[],models:["natEnable","upnpEnable"],stores:["upnpClientStore"],views:["upnpView"],listeners:{ev_on_launch:function(n,e,t,i,p,u,a){i.upnpEnable.enable.hideTips(),t.upnpView.upnpClientListPanel.hide(),i.natEnable.load({success:function(n,e){"on"==n.enable?(i.upnpEnable.enable.enable(),i.upnpEnable.enable.hideTips(),i.upnpEnable.load({success:function(n,e){"on"==n.enable?(t.upnpView.upnpClientListPanel.show(),p.upnpClientStore.load()):t.upnpView.upnpClientListPanel.hide()}})):(i.upnpEnable.enable.disable(),i.upnpEnable.enable.showTips(),t.upnpView.upnpClientListPanel.hide())}}),this.control({"#upnp-enable":{ev_view_change:function(n,e){i.upnpEnable.submit({success:function(n,e){"on"==n.enable&&p.upnpClientStore.load()}})}},"#upnp-client-grid":{ev_grid_tbar_refresh:function(n){p.upnpClientStore.load({success:function(){l.su.moduleManager.query("main").showNotice(l.su.CHAR.COMMON.SAVED)}})}}}),this.listen({"models.upnpEnable.enable":{ev_value_change:function(n,e,i){"on"==e?t.upnpView.upnpClientListPanel.show():t.upnpView.upnpClientListPanel.hide()}}})}},init:function(n,e,i,t,p,u){this.configViews({id:"upnpView",items:[{id:"upnp-client-grid",settings:{statusBarText:l.su.CHAR.UPNP.TOTAL_CLIENTS},configs:{columns:[{text:l.su.CHAR.UPNP.SERVICE_DESCRIPTION,dataIndex:"name"},{text:l.su.CHAR.UPNP.CLIENT_IP_ADDRESS,dataIndex:"ipaddr"},{text:l.su.CHAR.UPNP.INTERNAL_PORT,dataIndex:"internalPort"},{text:l.su.CHAR.UPNP.EXTERNAL_PORT,dataIndex:"externalPort"},{text:l.su.CHAR.UPNP.PROTOCOL,dataIndex:"protocol",width:"10%"}]}}]})}},function(n,e,i,t,p,u){})}(jQuery);