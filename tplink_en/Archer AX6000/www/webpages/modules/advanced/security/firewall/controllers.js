!function(u){u.su.moduleManager.define("firewall",{services:[],stores:[],models:["firewall","ipv4Status"],views:["firewallView"],listeners:{ev_on_launch:function(e,l,i,n,a,s,t){n.ipv4Status.load({success:function(){var e={"dslite":u.su.CHAR.NETWORK_INTERNET.DSLITE_CONFLICT_TIPS,"v6plus":u.su.CHAR.NETWORK_INTERNET.V6PLUS_CONFLICT_TIPS,"ocn":u.su.CHAR.NETWORK_INTERNET.OCN_CONFLICT_TIPS}[n.ipv4Status.conntype.getValue()],l=n.firewall.enable;e?(l.disable(),l.setTips(e)):l.enable()}}),n.firewall.load()}},init:function(e,l,n,i,a,s){this.control(),this.listen({"models.firewall.enable":{"ev_value_change":function(e,l,i){i&&i!==l&&n.firewall.submit()}},"models.firewall.lanPing":{"ev_value_change":function(e,l,i){i&&i!==l&&n.firewall.submit()}},"models.firewall.wanPing":{"ev_value_change":function(e,l,i){i&&i!==l&&n.firewall.submit()}}})}},function(e,l,i,n,a,s){return{}})}(jQuery);