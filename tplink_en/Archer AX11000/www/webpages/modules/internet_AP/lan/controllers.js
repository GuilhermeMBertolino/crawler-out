!function(t){t.su.moduleManager.define("lanAPAdv",{models:["lanAPModel"],stores:["lanAdvSubnetCombo","ipTypeStore"],services:["device"],deps:["utils"],views:["lanAPView"],listeners:{"ev_on_launch":function(e,l,a,n,o,d,t){n.lanAPModel.load(),1==t.device.getConfig().supportRELanDns?(n.lanAPModel.pri_dns.enable(),n.lanAPModel.snd_dns.enable(),n.lanAPModel.pri_dns.show(),n.lanAPModel.snd_dns.show()):(n.lanAPModel.pri_dns.disable(),n.lanAPModel.snd_dns.disable(),n.lanAPModel.pri_dns.hide(),n.lanAPModel.snd_dns.hide())}},init:function(e,o,d,l,a,n){this.control({".index-common-save-btn":{"ev_will_auto_save":function(e,l){l.preventDefault();var l=d.lanAPModel.lan_type.getValue(),a=d.lanAPModel.isDirty(),n=d.lanAPModel.ipaddr.isDirty();"dynamic"!==l?d.lanAPModel.validate()&&a&&this.lanValidate()&&(n?o.lanAPView.lanApIpChangeMsg.show():(l=d.lanAPModel.ipaddr.getValue(),this.startReboot(l))):this.startReboot("tplinkwifi.net")}},"#lan-ap-ip-change":{"ev_msg_ok":function(){var e=d.lanAPModel.ipaddr.getValue();this.startReboot(e)}}}),this.listen({"models.lanAPModel.mask_type":{"ev_value_change":function(e,l,a){3===l?(d.lanAPModel.custom_value.show(),"static"===d.lanAPModel.lan_type.getValue()?d.lanAPModel.custom_value.enable():d.lanAPModel.custom_value.disable()):(d.lanAPModel.custom_value.hide(),d.lanAPModel.custom_value.disable())}},"models.lanAPModel.lan_type":{"ev_value_change":function(e,l,a){"static"===l?(d.lanAPModel.ipaddr.enable(),d.lanAPModel.mask_type.enable(),3===parseInt(d.lanAPModel.mask_type.getValue())?d.lanAPModel.custom_value.enable():d.lanAPModel.custom_value.disable(),d.lanAPModel.lan_gw.enable(),1==n.device.getConfig().supportRELanDns&&(d.lanAPModel.pri_dns.enable(),d.lanAPModel.snd_dns.enable())):(d.lanAPModel.ipaddr.disable(),d.lanAPModel.mask_type.disable(),d.lanAPModel.custom_value.disable(),d.lanAPModel.lan_gw.disable(),d.lanAPModel.pri_dns.disable(),d.lanAPModel.snd_dns.disable())}}})}},function(l,a,n,e,o,d){return{lanValidate:function(){var e=n.lanAPModel.ipaddr.getValue(),l=parseInt(n.lanAPModel.mask_type.getValue()),l=3===l?n.lanAPModel.custom_value.getValue():["255.255.255.0","255.255.0.0","255.0.0.0"][l],a=n.lanAPModel.lan_gw.getValue();return o.utils.isNetIp(e,l)||o.utils.isBroadCastIp(e,l)?(n.lanAPModel.ipaddr.setError(t.su.CHAR.ERROR["00000059"]),!1):o.utils.isSameNet(a,e,l)?!o.utils.isNetIp(a,l)&&!o.utils.isBroadCastIp(a,l)||(n.lanAPModel.lan_gw.setError(t.su.CHAR.ERROR["00000059"]),!1):(n.lanAPModel.lan_gw.setError(t.su.CHAR.ERROR["00000045"]),!1)},goToNewUrl:function(e){var l=top.location.href,a=l.indexOf("//");top.location.href=l.slice(0,a+2)+e},startReboot:function(e){a.lanAPView.lanApAdvRebootAnimate.show(),n.lanAPModel.submit({success:function(){setTimeout(function(){a.lanAPView.lanApAdvRebootAnimate.close(function(){l.goToNewUrl(e)})},4e4)}})}}})}(jQuery);