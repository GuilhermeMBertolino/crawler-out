!function(o){o.su.moduleManager.define("printerServer",{services:["ajax"],stores:[],views:["printerServerView"],models:["printerSharing"],listeners:{ev_on_launch:function(e,r,i,n,t,s,o){n.printerSharing.load()}},init:function(e,r,n,i,t,s){this.configViews({id:"printerServerView",items:[{id:"printer-server-name-displaylabel",renderer:function(e){return"string"!=typeof e?o.su.CHAR.PRINTER_SERVER.NONE:e}}]}),this.control({"#printer-server-switch":{ev_view_change:function(e,r,i){n.printerSharing.isDirty()&&n.printerSharing.submit()}}})}},function(e,r,i,n,t,s){return{}})}(jQuery);