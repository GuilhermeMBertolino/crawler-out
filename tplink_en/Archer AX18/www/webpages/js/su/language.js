!function(c){function e(e){this.settings=c.extend({},{locale:"en_US",URL_LAN_CHECK:c.su.url("/locale?form=lang"),DEFAULT_LAN_TYPE:"en_US",URL_JS:"./locale/%LAN_TYPE%/lan.js",URL_CSS:"./locale/%LAN_TYPE%/lan.css?t=715b0013",URL_HELP:"./locale/%LAN_TYPE%/help.js"},e),this.init()}c.su=c.su||{},c.su.Language=(e.prototype.init=function(){this.getLocale()},e.prototype.getLocale=function(t,e){var a=this,s=this.settings.URL_LAN_CHECK;c.ajax({type:"GET",url:s,async:!1,dataType:"json",data:{operation:"read"},success:function(e){e.success&&e.data&&e.data.locale?a.changeType(e.data):a.reset(),t&&t.call(a,e.data)},error:function(){a.reset(),e&&e.call(a)}})},e.prototype.defineGlobal=function(){},e.prototype.getDeviceLanguage=function(){},e.prototype.getClientLanguage=function(){},e.prototype.reset=function(){this.changeType({locale:this.settings.DEFAULT_LAN_TYPE,force:!1,model:"",region:"",rebootTime:0})},e.prototype.switchTo=function(e,t,a){var s=this,n=this.settings;e&&(n=n.URL_LAN_CHECK,c.ajax({type:"POST",url:n,async:!1,dataType:"json",cache:!1,data:{operation:"write",locale:e},success:function(e){location.reload(),t&&t.call(s)},error:function(){s.reset(),a&&a.call(s)}}))},e.prototype.changeType=function(e){var t=this.settings,e=e.locale||t.DEFAULT_LAN_TYPE,a=t.URL_JS.replace("%LAN_TYPE%",e),s=t.URL_CSS.replace("%LAN_TYPE%",e),t=t.URL_HELP.replace("%LAN_TYPE%",e);c("script#lan-js").remove(),c("link#lan-css").remove(),c("script#lan-help").remove(),c("head").append('<script id="lan-js" type="text/javascript" src="'+a+' "><\/script>').append('<link id="lan-css" type="text/css" rel="stylesheet" href="'+s+' "/>').append('<script id="lan-help" type="text/javascript" src="'+t+' "><\/script>').append('<script type="text/javascript" src="./locale/language.js" ><\/script>')},e)}(jQuery);