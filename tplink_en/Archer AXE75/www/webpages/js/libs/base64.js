!function(r){r.su=r.su||{},r.su.b64Encode=function(r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if("string"!=typeof r)return r;r=function(r){{if("string"!=typeof r)return r;r=r.replace(/\r\n/g,"\n")}var t,e="",o=0;for(;o<r.length;o++)(t=r.charCodeAt(o))<128?e+=String.fromCharCode(t):e=127<t&&t<2048?(e+=String.fromCharCode(t>>6|192))+String.fromCharCode(63&t|128):(e=(e+=String.fromCharCode(t>>12|224))+String.fromCharCode(t>>6&63|128))+String.fromCharCode(63&t|128);return e}(r);for(var e,o,n,a,f,h,C="",i=0;i<r.length;)n=(e=r.charCodeAt(i++))>>2,a=(3&e)<<4|(e=r.charCodeAt(i++))>>4,f=(15&e)<<2|(o=r.charCodeAt(i++))>>6,h=63&o,isNaN(e)?f=h=64:isNaN(o)&&(h=64),C+=t.charAt(n)+t.charAt(a)+t.charAt(f)+t.charAt(h);return C},r.su.b64Decode=function(r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if("string"!=typeof r)return r;r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");for(var e,o,n,a,f,h,C="",i=0;i<r.length;)n=t.indexOf(r.charAt(i++)),e=(15&(a=t.indexOf(r.charAt(i++))))<<4|(f=t.indexOf(r.charAt(i++)))>>2,o=(3&f)<<6|(h=t.indexOf(r.charAt(i++))),C+=String.fromCharCode(n<<2|a>>4),64!=f&&(C+=String.fromCharCode(e)),64!=h&&(C+=String.fromCharCode(o));var d=C;if("string"!=typeof d)return d;for(var c="",g=0,A=0;g<d.length;)(A=d.charCodeAt(g))<128?(c+=String.fromCharCode(A),g++):191<A&&A<224?(c+=String.fromCharCode((31&A)<<6|63&d.charCodeAt(g+1)),g+=2):(c+=String.fromCharCode((15&A)<<12|(63&d.charCodeAt(g+1))<<6|63&d.charCodeAt(g+2)),g+=3);return c}}(jQuery);