!function(d){d.su.moduleManager.define("serviceFiltering",{models:["serviceFiltering","serviceFilteringGridEditorModel"],stores:["serviceFilteringGridStore","IPModeStore","serviceTpyeStore","protocolStore"],services:[],views:["serviceFilteringView"],listeners:{ev_on_launch:function(e,i,r,o,t,l,d){o.serviceFiltering.load(),t.serviceFilteringGridStore.load(),o.serviceFiltering.filterList.hide()}},init:function(e,i,o,r,t,l){this.configViews({id:"serviceFilteringView",items:[{id:"grid-serviceFiltering",configs:{minLines:0,popEditor:{addTitle:d.su.CHAR.SERVICE_FILTERING.ADD_SERVICE_FILTER,content:"#grid-serviceFiltering-popEditor",fields:[{name:"serviceType"},{name:"serviceName"},{name:"protocol"},{name:"rangeFrom"},{name:"rangeTo"},{name:"IPMode"},{name:"singleIP"},{name:"ipFrom"},{name:"ipTo"}]},paging:{},columns:[{text:d.su.CHAR.SERVICE_FILTERING.SERVICE_TYPE,dataIndex:"serviceType"},{text:d.su.CHAR.SERVICE_FILTERING.PORT,dataIndex:"port"},{text:d.su.CHAR.SERVICE_FILTERING.IP_ADDRESS,dataIndex:"IP"},{xtype:"actioncolumn",text:d.su.CHAR.SERVICE_FILTERING.MODIFY,renderer:function(e,i){var r='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit">';r+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}}]}),this.control(),this.listen({"models.serviceFiltering.enable":{"ev_value_change":function(e,i,r){"on"==i?o.serviceFiltering.filterList.show():o.serviceFiltering.filterList.hide()}},"models.serviceFilteringGridEditorModel.serviceType":{"ev_value_change":function(e,i,r){switch(o.serviceFilteringGridEditorModel.serviceName.hide(),o.serviceFilteringGridEditorModel.serviceName.disable(),o.serviceFilteringGridEditorModel.protocol.disable(),o.serviceFilteringGridEditorModel.rangeFrom.disable(),o.serviceFilteringGridEditorModel.rangeTo.disable(),i){case"Custom":o.serviceFilteringGridEditorModel.serviceName.show(),o.serviceFilteringGridEditorModel.serviceName.enable(),o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.protocol.enable(),o.serviceFilteringGridEditorModel.rangeFrom.setValue(),o.serviceFilteringGridEditorModel.rangeFrom.enable(),o.serviceFilteringGridEditorModel.rangeTo.setValue(),o.serviceFilteringGridEditorModel.rangeTo.enable();break;case"All":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1),o.serviceFilteringGridEditorModel.rangeTo.setValue(65535);break;case"Any-TCP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1),o.serviceFilteringGridEditorModel.rangeTo.setValue(65535);break;case"Any-UDP":o.serviceFilteringGridEditorModel.protocol.setValue("UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1),o.serviceFilteringGridEditorModel.rangeTo.setValue(65535);break;case"DNS":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(53),o.serviceFilteringGridEditorModel.rangeTo.setValue(53);break;case"FTP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(20),o.serviceFilteringGridEditorModel.rangeTo.setValue(21);break;case"HTTP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(80),o.serviceFilteringGridEditorModel.rangeTo.setValue(80);break;case"HTTPS":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(443),o.serviceFilteringGridEditorModel.rangeTo.setValue(443);break;case"NFS":o.serviceFilteringGridEditorModel.protocol.setValue("UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(2049),o.serviceFilteringGridEditorModel.rangeTo.setValue(2049);break;case"SMTP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(25),o.serviceFilteringGridEditorModel.rangeTo.setValue(25);break;case"SNMP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(161),o.serviceFilteringGridEditorModel.rangeTo.setValue(161);break;case"SNMP-TRAP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(162),o.serviceFilteringGridEditorModel.rangeTo.setValue(162);break;case"SSH":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(22),o.serviceFilteringGridEditorModel.rangeTo.setValue(22);break;case"VPN-IPSEC":o.serviceFilteringGridEditorModel.protocol.setValue("UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(500),o.serviceFilteringGridEditorModel.rangeTo.setValue(500);break;case"VPN-L2TP":o.serviceFilteringGridEditorModel.protocol.setValue("UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1701),o.serviceFilteringGridEditorModel.rangeTo.setValue(1701);break;case"VPN-PPTP":o.serviceFilteringGridEditorModel.protocol.setValue("TCP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1723),o.serviceFilteringGridEditorModel.rangeTo.setValue(1723);break;case"OpenVPN":o.serviceFilteringGridEditorModel.protocol.setValue("TCP_UDP"),o.serviceFilteringGridEditorModel.rangeFrom.setValue(1194),o.serviceFilteringGridEditorModel.rangeTo.setValue(1194)}}},"models.serviceFilteringGridEditorModel.IPMode":{"ev_value_change":function(e,i,r){o.serviceFilteringGridEditorModel.singleIP.hide(),o.serviceFilteringGridEditorModel.singleIP.disable(),o.serviceFilteringGridEditorModel.ipRange.hide(),o.serviceFilteringGridEditorModel.ipFrom.hide(),o.serviceFilteringGridEditorModel.ipFrom.disable(),o.serviceFilteringGridEditorModel.ipTo.hide(),o.serviceFilteringGridEditorModel.ipTo.disable(),"0"==i?(o.serviceFilteringGridEditorModel.singleIP.show(),o.serviceFilteringGridEditorModel.singleIP.enable()):"1"==i&&(o.serviceFilteringGridEditorModel.ipRange.show(),o.serviceFilteringGridEditorModel.ipFrom.show(),o.serviceFilteringGridEditorModel.ipFrom.enable(),o.serviceFilteringGridEditorModel.ipTo.show(),o.serviceFilteringGridEditorModel.ipTo.enable())}}})}},function(e,i,r,o,t,l){return{}})}(jQuery);