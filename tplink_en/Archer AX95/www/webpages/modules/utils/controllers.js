!function(o){o.su.moduleManager.define("utils",{deps:[],models:[],stores:[],services:["time"],views:[],listeners:{ev_on_launch:function(t,n,r,e,i,u,o){}},init:function(t,n,r,e,i,u){}},function(i,t,n,r,e,u){return{valInObjArr:function(t,n){for(var r=n.length,e=0;e<r;e++)if(t==n[e].value)return!0;return!1},ipToInt:function(t){var n;if(t)return 4==(n=t.split(".")).length&&/^\s*[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\s*$/.test(t)?Number(n[0])*(1<<24)+(Number(n[1])<<16|Number(n[2])<<8|Number(n[3])):-1},isEmptyObject:function(t){for(var n in t)return!1;return!0},isHostIp:function(t,n,r){var e;return""!=t&&(t=(e=i.ipToInt)(t),n=e(n),0!=(r=e(r))&&(4294967295&t)==(n&r))},isNetIp:function(t,n){var r=i.ipToInt;return!!t&&0==(r(t)&~r(n))},isNetIpLegal:function(t,n){var r=i.ipToInt;return!!t&&(0!=(n=r(t)&(t=r(n)))&&n!=t)},isBroadCastIp:function(t,n){var r=i.ipToInt;return!!t&&(r(t)&~(t=r(n)))==~t},isSameNet:function(t,n,r){var e;return""!=t&&(t=(e=i.ipToInt)(t),n=e(n),0!=(r=e(r))&&(t&r)==(n&r))},getLimitIp:function(t,n,r){for(var e,i=t.split("."),u=n.split("."),o=i.length,a=(u.length,[]),s=0;s<o;++s)"min"==r?a.push(i[s]&u[s]):(e=parseInt(u[s]))<128?a.push(i[s]|128+(~e-128<<24>>24)):a.push(i[s]|~e<<24>>24);return a.join(".")},getAutoUpdateTimeStoreData:function(){for(var t=[],n=function(t){for(var n,r=[],e="",i=0;i<24;i++)t?n=i:(n=i%12||12,e=12<=i?"PM":"AM"),r.push(("0"+n).slice(-2)+":00"+e);return r}(u.time.getHour24()),r=" "+o.su.CHAR.NETWORK_INTERNET.NEXT_DAY_TIP,e=0;e<24;e++)t.push({name:n[e]+" - "+n[(e+2)%24]+(21<e?r:""),value:e});return t},format:{stringFormat:function(t){return t.toString()},intFormat:function(t){return isNaN(parseInt(t))?t:parseInt(t,10)},floatFormat:function(t){return isNaN(parseFloat(t))?t:parseFloat(t)},booleanFormat:function(t){return!!t},ip:function(t){t=o.trim(t);if(!/^[0-9\.]+$/.test(t))return t;for(var n=[],r=t.split("."),e=r.length,i=0;i<e;i++){if(isNaN(parseInt(r[i],10)))return""==r[i]?n.join("."):t;n.push(parseInt(r[i],10))}return n.join(".")},port:function(t){var n=t;return isNaN(parseInt(t,10))?n:parseInt(t,10)},number:function(t){var n=t;return isNaN(parseInt(t,10))?n:parseInt(t,10)}}}})}(jQuery);