!function(o){o.su.moduleManager.define("utils",{deps:[],models:[],stores:[],services:[],views:[],listeners:{"ev_on_launch":function(n,t,r,e,i,u,o){}},init:function(n,t,r,e,i,u){}},function(i,n,t,r,e,u){return{valInObjArr:function(n,t){for(var r=t.length,e=0;e<r;e++)if(n==t[e].value)return!0;return!1},ipToInt:function(n){var t;if(n)return 4==(t=n.split(".")).length&&/^\s*[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\s*$/.test(n)?Number(t[0])*(1<<24)+(Number(t[1])<<16|Number(t[2])<<8|Number(t[3])):-1},isEmptyObject:function(n){for(var t in n)return!1;return!0},isHostIp:function(n,t,r){var e;return""!=n&&(n=(e=i.ipToInt)(n),t=e(t),0!=(r=e(r)))&&(4294967295&n)==(t&r)},isNetIp:function(n,t){var r=i.ipToInt;return!!n&&0==(r(n)&~r(t))},isNetIpLegal:function(n,t){var r=i.ipToInt;return!!n&&0!=(t=r(n)&(n=r(t)))&&t!=n},isBroadCastIp:function(n,t){var r=i.ipToInt;return!!n&&(r(n)&~(n=r(t)))==~n},isSameNet:function(n,t,r){var e;return""!=n&&(n=(e=i.ipToInt)(n),t=e(t),0!=(r=e(r)))&&(n&r)==(t&r)},getLimitIp:function(n,t,r){for(var e,i=n.split("."),u=t.split("."),o=i.length,s=(u.length,[]),a=0;a<o;++a)"min"==r?s.push(i[a]&u[a]):(e=parseInt(u[a]),s.push(e<128?i[a]|128+(~e-128<<24>>24):i[a]|~e<<24>>24));return s.join(".")},format:{stringFormat:function(n){return n.toString()},intFormat:function(n){return isNaN(parseInt(n))?n:parseInt(n,10)},floatFormat:function(n){return isNaN(parseFloat(n))?n:parseFloat(n)},booleanFormat:function(n){return!!n},ip:function(n){n=o.trim(n);if(!/^[0-9\.]+$/.test(n))return n;for(var t=[],r=n.split("."),e=r.length,i=0;i<e;i++){if(isNaN(parseInt(r[i],10)))return""==r[i]?t.join("."):n;t.push(parseInt(r[i],10))}return t.join(".")},port:function(n){var t=n;return isNaN(parseInt(n,10))?t:parseInt(n,10)},number:function(n){var t=n;return isNaN(parseInt(n,10))?t:parseInt(n,10)}}}})}(jQuery);