!function($){var msie=/MSIE/.test(navigator.userAgent),style=document.createElement("div").style,moz=void 0!==style.MozBorderRadius,webkit=void 0!==style.WebkitBorderRadius,radius=void 0!==style.borderRadius||void 0!==style.BorderRadius,mode=document.documentMode||0,noBottomFold=msie&&(!mode||mode<8),expr=msie&&function(){var div=document.createElement("div");try{div.style.setExpression("width","0+0"),div.style.removeExpression("width")}catch(e){return!1}return!0}();function sz(el,p){return parseInt($.css(el,p),10)||0}function hex2(s){return(s=parseInt(s,10).toString(16)).length<2?"0"+s:s}function getWidth(fx,i,width){switch(fx){case"round":return Math.round(width*(1-Math.cos(Math.asin(i/width))));case"cool":return Math.round(width*(1+Math.cos(Math.asin(i/width))));case"sharp":return width-i;case"bite":return Math.round(width*Math.cos(Math.asin((width-i-1)/width)));case"slide":return Math.round(width*Math.atan2(i,width/i));case"jut":return Math.round(width*Math.atan2(width,width-i-1));case"curl":return Math.round(width*Math.atan(i));case"tear":return Math.round(width*Math.cos(i));case"wicked":return Math.round(width*Math.tan(i));case"long":return Math.round(width*Math.sqrt(i));case"sculpt":return Math.round(width*Math.log(width-i-1,width));case"dogfold":case"dog":return 1&i?i+1:width;case"dog2":return 2&i?i+1:width;case"dog3":return 3&i?i+1:width;case"fray":return i%2*width;case"notch":return width;case"bevelfold":case"bevel":return i+1;case"steep":return i/2+1;case"invsteep":return(width-i)/2+1}}$.support=$.support||{},$.support.borderRadius=moz||webkit||radius,$.fn.corner=function(options){if(0!==this.length)return this.each(function(index){var strip,pad,cssHeight,j,bot,d,ds,bw,i,w,e,c,common,$horz,$this=$(this),o=[$this.attr($.fn.corner.defaults.metaAttr)||"",options||""].join(" ").toLowerCase(),keep=/keep/.test(o),cc=(o.match(/cc:(#[0-9a-f]+)/)||[])[1],sc=(o.match(/sc:(#[0-9a-f]+)/)||[])[1],width=parseInt((o.match(/(\d+)px/)||[])[1],10)||10,fx=(o.match(/round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/)||["round"])[0],fold=/dogfold|bevelfold/.test(o),edges={T:0,B:1},opts={TL:/top|tl|left/.test(o),TR:/top|tr|right/.test(o),BL:/bottom|bl|left/.test(o),BR:/bottom|br|right/.test(o)};if(opts.TL||opts.TR||opts.BL||opts.BR||(opts={TL:1,TR:1,BL:1,BR:1}),$.fn.corner.defaults.useNative&&"round"==fx&&(radius||moz||webkit)&&!cc&&!sc)return opts.TL&&$this.css(radius?"border-top-left-radius":moz?"-moz-border-radius-topleft":"-webkit-border-top-left-radius",width+"px"),opts.TR&&$this.css(radius?"border-top-right-radius":moz?"-moz-border-radius-topright":"-webkit-border-top-right-radius",width+"px"),opts.BL&&$this.css(radius?"border-bottom-left-radius":moz?"-moz-border-radius-bottomleft":"-webkit-border-bottom-left-radius",width+"px"),void(opts.BR&&$this.css(radius?"border-bottom-right-radius":moz?"-moz-border-radius-bottomright":"-webkit-border-bottom-right-radius",width+"px"));for(j in strip=document.createElement("div"),$(strip).css({overflow:"hidden",height:"1px",minHeight:"1px",fontSize:"1px",backgroundColor:sc||"transparent",borderStyle:"solid"}),pad={T:parseInt($.css(this,"paddingTop"),10)||0,R:parseInt($.css(this,"paddingRight"),10)||0,B:parseInt($.css(this,"paddingBottom"),10)||0,L:parseInt($.css(this,"paddingLeft"),10)||0},void 0!==typeof this.style.zoom&&(this.style.zoom=1),keep||(this.style.border="none"),strip.style.borderColor=cc||function(node){for(;node;){var rgb,v=$.css(node,"backgroundColor");if(v&&"transparent"!=v&&"rgba(0, 0, 0, 0)"!=v)return 0<=v.indexOf("rgb")?"#"+hex2((rgb=v.match(/\d+/g))[0])+hex2(rgb[1])+hex2(rgb[2]):v;if("html"==node.nodeName.toLowerCase())break;node=node.parentNode}return"#ffffff"}(this.parentNode),cssHeight=$(this).outerHeight(),edges)if((bot=edges[j])&&(opts.BL||opts.BR)||!bot&&(opts.TL||opts.TR)){for(strip.style.borderStyle="none "+(opts[j+"R"]?"solid":"none")+" none "+(opts[j+"L"]?"solid":"none"),d=document.createElement("div"),$(d).addClass("jquery-corner"),ds=d.style,bot?this.appendChild(d):this.insertBefore(d,this.firstChild),bot&&"auto"!=cssHeight?("static"==$.css(this,"position")&&(this.style.position="relative"),ds.position="absolute",ds.bottom=ds.left=ds.padding=ds.margin="0",expr?ds.setExpression("width","this.parentNode.offsetWidth"):ds.width="100%"):!bot&&msie?("static"==$.css(this,"position")&&(this.style.position="relative"),ds.position="absolute",ds.top=ds.left=ds.right=ds.padding=ds.margin="0",expr?(bw=sz(this,"borderLeftWidth")+sz(this,"borderRightWidth"),ds.setExpression("width","this.parentNode.offsetWidth - "+bw+'+ "px"')):ds.width="100%"):(ds.position="relative",ds.margin=bot?pad.B-width+"px -"+pad.R+"px -"+pad.B+"px -"+pad.L+"px":"-"+pad.T+"px -"+pad.R+"px "+(pad.T-width)+"px -"+pad.L+"px"),i=0;i<width;i++)w=Math.max(0,getWidth(fx,i,width)),(e=strip.cloneNode(!1)).style.borderWidth="0 "+(opts[j+"R"]?w:0)+"px 0 "+(opts[j+"L"]?w:0)+"px",bot?d.appendChild(e):d.insertBefore(e,d.firstChild);if(fold&&$.support.boxModel){if(bot&&noBottomFold)continue;for(c in opts)if(opts[c]&&(!bot||"TL"!=c&&"TR"!=c)&&(bot||"BL"!=c&&"BR"!=c)){switch(common={position:"absolute",border:"none",margin:0,padding:0,overflow:"hidden",backgroundColor:strip.style.borderColor},$horz=$("<div/>").css(common).css({width:width+"px",height:"1px"}),c){case"TL":$horz.css({bottom:0,left:0});break;case"TR":$horz.css({bottom:0,right:0});break;case"BL":$horz.css({top:0,left:0});break;case"BR":$horz.css({top:0,right:0})}d.appendChild($horz[0]);var $vert=$("<div/>").css(common).css({top:0,bottom:0,width:"1px",height:width+"px"});switch(c){case"TL":$vert.css({left:width});break;case"TR":$vert.css({right:width});break;case"BL":$vert.css({left:width});break;case"BR":$vert.css({right:width})}d.appendChild($vert[0])}}}});if(!$.isReady&&this.selector){var s=this.selector,c=this.context;$(function(){$(s,c).corner(options)})}return this},$.fn.uncorner=function(){return(radius||moz||webkit)&&this.css(radius?"border-radius":moz?"-moz-border-radius":"-webkit-border-radius",0),$("div.jquery-corner",this).remove(),this},$.fn.corner.defaults={useNative:!0,metaAttr:"data-corner"}}(jQuery);