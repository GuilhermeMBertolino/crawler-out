/*
 * jQuery corner plugin: simple corner rounding
 * Examples and documentation at: http://jquery.malsup.com/corner/
 * version 2.13 (19-FEB-2013)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Dave Methvin and Mike Alsup
 */
(function(c){var f=/MSIE/.test(navigator.userAgent);var a=document.createElement("div").style,i=a.MozBorderRadius!==undefined,k=a.WebkitBorderRadius!==undefined,e=a.borderRadius!==undefined||a.BorderRadius!==undefined,d=document.documentMode||0,m=f&&(!d||d<8),j=f&&(function(){var o=document.createElement("div");try{o.style.setExpression("width","0+0");o.style.removeExpression("width")}catch(n){return false}return true})();c.support=c.support||{};c.support.borderRadius=i||k||e;function h(n,o){return parseInt(c.css(n,o),10)||0}function l(n){n=parseInt(n,10).toString(16);return(n.length<2)?"0"+n:n}function b(p){while(p){var n=c.css(p,"backgroundColor"),o;if(n&&n!="transparent"&&n!="rgba(0, 0, 0, 0)"){if(n.indexOf("rgb")>=0){o=n.match(/\d+/g);return"#"+l(o[0])+l(o[1])+l(o[2])}return n}if(p.nodeName.toLowerCase()=="html"){break}p=p.parentNode}return"#ffffff"}function g(p,n,o){switch(p){case"round":return Math.round(o*(1-Math.cos(Math.asin(n/o))));case"cool":return Math.round(o*(1+Math.cos(Math.asin(n/o))));case"sharp":return o-n;case"bite":return Math.round(o*(Math.cos(Math.asin((o-n-1)/o))));case"slide":return Math.round(o*(Math.atan2(n,o/n)));case"jut":return Math.round(o*(Math.atan2(o,(o-n-1))));case"curl":return Math.round(o*(Math.atan(n)));case"tear":return Math.round(o*(Math.cos(n)));case"wicked":return Math.round(o*(Math.tan(n)));case"long":return Math.round(o*(Math.sqrt(n)));case"sculpt":return Math.round(o*(Math.log((o-n-1),o)));case"dogfold":case"dog":return(n&1)?(n+1):o;case"dog2":return(n&2)?(n+1):o;case"dog3":return(n&3)?(n+1):o;case"fray":return(n%2)*o;case"notch":return o;case"bevelfold":case"bevel":return n+1;case"steep":return n/2+1;case"invsteep":return(o-n)/2+1}}c.fn.corner=function(n){if(this.length===0){if(!c.isReady&&this.selector){var o=this.selector,p=this.context;c(function(){c(o,p).corner(n)})}return this}return this.each(function(x){var v=c(this),E=[v.attr(c.fn.corner.defaults.metaAttr)||"",n||""].join(" ").toLowerCase(),L=/keep/.test(E),D=((E.match(/cc:(#[0-9a-f]+)/)||[])[1]),q=((E.match(/sc:(#[0-9a-f]+)/)||[])[1]),H=parseInt((E.match(/(\d+)px/)||[])[1],10)||10,F=/round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/,s=((E.match(F)||["round"])[0]),t=/dogfold|bevelfold/.test(E),r={T:0,B:1},A={TL:/top|tl|left/.test(E),TR:/top|tr|right/.test(E),BL:/bottom|bl|left/.test(E),BR:/bottom|br|right/.test(E)},I,O,G,J,z,P,C,M,K,y,N,Q,B,u;if(!A.TL&&!A.TR&&!A.BL&&!A.BR){A={TL:1,TR:1,BL:1,BR:1}}if(c.fn.corner.defaults.useNative&&s=="round"&&(e||i||k)&&!D&&!q){if(A.TL){v.css(e?"border-top-left-radius":i?"-moz-border-radius-topleft":"-webkit-border-top-left-radius",H+"px")}if(A.TR){v.css(e?"border-top-right-radius":i?"-moz-border-radius-topright":"-webkit-border-top-right-radius",H+"px")}if(A.BL){v.css(e?"border-bottom-left-radius":i?"-moz-border-radius-bottomleft":"-webkit-border-bottom-left-radius",H+"px")}if(A.BR){v.css(e?"border-bottom-right-radius":i?"-moz-border-radius-bottomright":"-webkit-border-bottom-right-radius",H+"px")}return}I=document.createElement("div");c(I).css({overflow:"hidden",height:"1px",minHeight:"1px",fontSize:"1px",backgroundColor:q||"transparent",borderStyle:"solid"});O={T:parseInt(c.css(this,"paddingTop"),10)||0,R:parseInt(c.css(this,"paddingRight"),10)||0,B:parseInt(c.css(this,"paddingBottom"),10)||0,L:parseInt(c.css(this,"paddingLeft"),10)||0};if(typeof this.style.zoom!==undefined){this.style.zoom=1}if(!L){this.style.border="none"}I.style.borderColor=D||b(this.parentNode);G=c(this).outerHeight();for(J in r){z=r[J];if((z&&(A.BL||A.BR))||(!z&&(A.TL||A.TR))){I.style.borderStyle="none "+(A[J+"R"]?"solid":"none")+" none "+(A[J+"L"]?"solid":"none");P=document.createElement("div");c(P).addClass("jquery-corner");C=P.style;z?this.appendChild(P):this.insertBefore(P,this.firstChild);if(z&&G!="auto"){if(c.css(this,"position")=="static"){this.style.position="relative"}C.position="absolute";C.bottom=C.left=C.padding=C.margin="0";if(j){C.setExpression("width","this.parentNode.offsetWidth")}else{C.width="100%"}}else{if(!z&&f){if(c.css(this,"position")=="static"){this.style.position="relative"}C.position="absolute";C.top=C.left=C.right=C.padding=C.margin="0";if(j){M=h(this,"borderLeftWidth")+h(this,"borderRightWidth");C.setExpression("width","this.parentNode.offsetWidth - "+M+'+ "px"')}else{C.width="100%"}}else{C.position="relative";C.margin=!z?"-"+O.T+"px -"+O.R+"px "+(O.T-H)+"px -"+O.L+"px":(O.B-H)+"px -"+O.R+"px -"+O.B+"px -"+O.L+"px"}}for(K=0;K<H;K++){y=Math.max(0,g(s,K,H));N=I.cloneNode(false);N.style.borderWidth="0 "+(A[J+"R"]?y:0)+"px 0 "+(A[J+"L"]?y:0)+"px";z?P.appendChild(N):P.insertBefore(N,P.firstChild)}if(t&&c.support.boxModel){if(z&&m){continue}for(Q in A){if(!A[Q]){continue}if(z&&(Q=="TL"||Q=="TR")){continue}if(!z&&(Q=="BL"||Q=="BR")){continue}B={position:"absolute",border:"none",margin:0,padding:0,overflow:"hidden",backgroundColor:I.style.borderColor};u=c("<div/>").css(B).css({width:H+"px",height:"1px"});switch(Q){case"TL":u.css({bottom:0,left:0});break;case"TR":u.css({bottom:0,right:0});break;case"BL":u.css({top:0,left:0});break;case"BR":u.css({top:0,right:0});break}P.appendChild(u[0]);var R=c("<div/>").css(B).css({top:0,bottom:0,width:"1px",height:H+"px"});switch(Q){case"TL":R.css({left:H});break;case"TR":R.css({right:H});break;case"BL":R.css({left:H});break;case"BR":R.css({right:H});break}P.appendChild(R[0])}}}}})};c.fn.uncorner=function(){if(e||i||k){this.css(e?"border-radius":i?"-moz-border-radius":"-webkit-border-radius",0)}c("div.jquery-corner",this).remove();return this};c.fn.corner.defaults={useNative:true,metaAttr:"data-corner"}})(jQuery);