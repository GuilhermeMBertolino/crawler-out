!function(a){a.su.moduleManager.define("diagnostics",{models:["diagnosticsModel","portMirrorModel"],stores:["diagnosticsResultStore","diagnosticToolStore","portReflectToStore","portReflectFromStore"],services:["ajax","timer"],views:["diagnosticsView"],listeners:{"ev_on_launch":function(t,o,e,i,s,a,n){this.unRegisterAutoSaveData([i.diagnosticsModel]),this.initDiagnostics(),o.getLanNumber(function(t){var e=o.lanNum=t.total;s.portReflectToStore.loadData(o.createReflectToPort(e)),s.portReflectFromStore.loadData(o.createReflectFromPort(e)),i.portMirrorModel.load()})},"ev_before_destroy":function(){this.beforeDestroy()}},init:function(s,i,a,t,e,o){this.configViews({}),this.listen({"models.diagnosticsModel.type":{"ev_value_change":function(t,e,o){var i=a.diagnosticsModel;e!==o&&s.clearLog(),e===s.PING_TOOL?(i.count.show(),i.count.enable(),i.pktsize.show(),i.pktsize.enable(),i.ttl.hide(),i.ttl.disable()):e===s.NSLOOKUP_TOOL?(i.count.hide(),i.pktsize.hide(),i.ttl.hide(),i.count.disable(),i.pktsize.disable(),i.ttl.disable()):e===s.TRACEROUTE_TOOL&&(i.ttl.enable(),i.ttl.show(),i.count.hide(),i.pktsize.hide(),i.count.disable(),i.pktsize.disable())}},"models.portMirrorModel.enable":{"ev_value_change":function(t,e,o){"on"===e?i.diagnosticsView.reflectWidget.show():i.diagnosticsView.reflectWidget.hide()}},"models.portMirrorModel.mirroringPort":{"ev_value_change":function(t,e,o){this.disableReflectFrom(e)}}}),this.control({"#start-btn":{"ev_button_click":function(){a.diagnosticsModel.validate()&&this.startDiagnostics()}},"#stop-btn":{"ev_button_click":function(){this.stopDiagnostics()}}})}},function(o,i,l,r,t,s){var e=null;return{PING_TOOL:0,NSLOOKUP_TOOL:2,TRACEROUTE_TOOL:1,getLanNumber:function(t){t&&t({total:8})},initDiagnostics:function(){l.diagnosticsModel.reset(),l.diagnosticsModel.type.enable(),l.diagnosticsModel.ipaddr.enable(),l.diagnosticsModel.count.enable(),l.diagnosticsModel.pktsize.enable(),l.diagnosticsModel.ttl.enable(),l.diagnosticsModel.count.enable(),i.diagnosticsView.startButton.enable(),i.diagnosticsView.startButton.show(),i.diagnosticsView.stopButton.disable(),i.diagnosticsView.stopButton.hide(),o.clearLog()},createReflectToPort:function(t){for(var e=[],o=1;o<=t;o++)e.push({name:"lan"+o,boxlabel:a.su.CHAR.DIAGNOSTICS.LAN+o,value:o});return e},createReflectFromPort:function(t){for(var e=[],o=1;o<=t;o++)e.push({name:"lan"+o,boxlabel:a.su.CHAR.DIAGNOSTICS.LAN+o,value:"lan"+o});return e.push({name:"wan",boxlabel:a.su.CHAR.DIAGNOSTICS["WAN"],value:"wan"}),e},startDiagnostics:function(){s.timer.clearInterval(o,e);var t={};switch(t.type=parseInt(l.diagnosticsModel.type.getValue(),10),t.ipaddr=l.diagnosticsModel.ipaddr.getValue(),t.type){case o.PING_TOOL:t.count=l.diagnosticsModel.count.getValue(),t.pktsize=l.diagnosticsModel.pktsize.getValue();break;case o.TRACEROUTE_TOOL:t.ttl=l.diagnosticsModel.ttl.getValue()}l.diagnosticsModel.type.disable(),l.diagnosticsModel.ipaddr.disable(),l.diagnosticsModel.count.disable(),l.diagnosticsModel.pktsize.disable(),l.diagnosticsModel.ttl.disable(),l.diagnosticsModel.count.disable(),i.diagnosticsView.startButton.disable(),i.diagnosticsView.startButton.hide(),i.diagnosticsView.stopButton.enable(),i.diagnosticsView.stopButton.show(),s.ajax.request({proxy:"diagnosticsProxy",method:"start",data:t,success:function(t){1===parseInt(t.finish,10)&&o.stopDiagnostics()}}),e=s.timer.setInterval(o,function(){o.continueDiagnostics()},1e3)},continueDiagnostics:function(){var t={};t.type=parseInt(l.diagnosticsModel.type.getValue(),10),t.ipaddr=l.diagnosticsModel.ipaddr.getValue(),s.ajax.request({proxy:"diagnosticsProxy",method:"goAhead",data:t,success:function(t){1===parseInt(t.finish,10)&&o.stopDiagnostics(),r.diagnosticsResultStore.loadData(t.result,!0)}})},stopDiagnostics:function(){var t={};t["type"]=parseInt(l.diagnosticsModel.type.getValue(),10),t["ipaddr"]=l.diagnosticsModel.ipaddr.getValue();var e=l.diagnosticsModel.type.getValue();l.diagnosticsModel.type.setValue(e),i.diagnosticsView.startButton.enable(),i.diagnosticsView.startButton.show(),i.diagnosticsView.stopButton.disable(),i.diagnosticsView.stopButton.hide(),l.diagnosticsModel.type.enable(),l.diagnosticsModel.ipaddr.enable(),e===o.PING_TOOL?(l.diagnosticsModel.count.enable(),l.diagnosticsModel.pktsize.enable()):e===o.TRACEROUTE_TOOL&&(l.diagnosticsModel.ttl.enable(),l.diagnosticsModel.ttl.show()),s.ajax.request({proxy:"diagnosticsProxy",method:"stop",data:t,success:function(t){r.diagnosticsResultStore.loadData(t.result,!0)}}),this.stopInterval()},beginDiagnostics:function(){s.timer.clearInterval(o,e),e=s.timer.setInterval(o,function(){o.startDiagnostics()},1e3),o.startDiagnostics()},stopInterval:function(){s.timer.clearInterval(o,e),e=null},clearLog:function(){r.diagnosticsResultStore.loadData([])},beforeDestroy:function(){this.stopInterval()},disableReflectFrom:function(t){var e=l.portMirrorModel.from.getValue(),o=r.portReflectFromStore.getData();if(!e){e={};for(var i=0,s=o.length;i<s;i++)e[o[i].name]="off"}for(var a in e)if(e.hasOwnProperty(a)&&-1!==a.indexOf("lan")){var n=parseInt(a.split("lan")[1],10);parseInt(t,10)===n?(e[a]="off",l.portMirrorModel.from.disableItem(n-1)):l.portMirrorModel.from.enableItem(n-1)}l.portMirrorModel.from.setValue(e)}}})}(jQuery);