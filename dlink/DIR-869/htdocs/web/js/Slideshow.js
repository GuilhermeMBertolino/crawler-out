var Slideshow=function(b){this.parentDiv=document.getElementById(b);this.parentDiv.style.fontSize="0";this.itemContainer;this.itemContainerId;this.pageDotsContainer;this.itemWidth=200;this.width=900;this.height=100;this.slidePos=0;this.slideStep;this.isSliding=false;this.itemPerPage=4;this.nowPage=0;this.nextBtn;this.prevBtn;this.btnWidth=50;this.itemArray=new Array();this.dataArray=new Array();this.pageDotArray=new Array();this.container=document.createElement("div");this.container.style.position="relative";this.container.style.margin="0";this.container.style.display="inline-block";this.container.style.width=(this.width-this.btnWidth*2)+"px";this.container.style.height=this.height+"px";this.container.style.verticalAlign="top";this.container.style.overflow="hidden";this.itemContainer=document.createElement("div");this.itemContainer.style.position="absolute";this.itemContainer.style.top="0";this.itemContainer.style.left="0";this.itemContainer.style.margin="0";this.itemContainer.style.padding="0";this.itemContainer.dislay="inline-block";this.itemContainerId="ss_itemContainer";this.itemContainer.setAttribute("id",this.itemContainerId);this.container.appendChild(this.itemContainer);this.nextBtn=document.createElement("div");this.nextBtn.style.margin="0";this.nextBtn.style.display="inline-block";this.nextBtn.style.cursor="pointer";this.nextBtn.style.width=this.btnWidth+"px";this.nextBtn.style.height=this.height+"px";this.nextBtn.style.backgroundImage="url('image/slidebtn_next.png')";this.nextBtn.style.backgroundRepeat="no-repeat";this.nextBtn.style.backgroundSize="contain";var a=this;this.nextBtn.onclick=function(){a.nextPage()};this.prevBtn=document.createElement("div");this.prevBtn.style.margin="0";this.prevBtn.style.display="inline-block";this.prevBtn.style.cursor="pointer";this.prevBtn.style.width=this.btnWidth+"px";this.prevBtn.style.height=this.height+"px";this.prevBtn.style.backgroundImage="url('image/slidebtn_prev.png')";this.prevBtn.style.backgroundRepeat="no-repeat";this.prevBtn.style.backgroundSize="contain";var a=this;this.prevBtn.onclick=function(){a.prevPage()};this.pagedotDiv=document.createElement("div");this.pagedotDiv.style.display="inline-block";this.pagedotDiv.style.width=this.width+"px";this.pagedotDiv.style.minHeight="6px";this.pagedotDiv.style.textAlign="center";this.parentDiv.appendChild(this.prevBtn);this.parentDiv.appendChild(this.container);this.parentDiv.appendChild(this.nextBtn);this.parentDiv.appendChild(this.pagedotDiv)};Slideshow.prototype.addItem=function(f){var e=f.element;e.style.display="inline-block";this.itemArray.push(e);this.dataArray.push(f);this.itemContainer.appendChild(e);this.itemContainer.style.width=(this.itemArray.length*this.itemWidth)+"px";var g=0;for(var d=0;d<this.dataArray.length;d++){g+=this.itemWidth}var b=(this.width-this.btnWidth*2);var c=Math.floor((g-1)/b)+1;if(c>this.pageDotArray.length){var a=document.createElement("div");a.style.display="inline-block";a.style.backgroundImage="url('image/slideshow_pagedot.png')";a.style.width="6px";a.style.margin="0 5px";a.style.height="6px";this.pageDotArray.push(a);this.pagedotDiv.appendChild(a)}this.update()};Slideshow.prototype.update=function(){var b=0;for(var c=0;c<this.dataArray.length;c++){if(this.dataArray[c].priority=="none"){b+=this.itemWidth}}var a=(this.width-this.btnWidth*2);var d=Math.floor((b-1)/a)+1;for(var c=0;c<this.pageDotArray.length;c++){if(c<=d-1){this.pageDotArray[c].style.display="inline-block"}else{this.pageDotArray[c].style.display="none"}}this.updatePageDotPageBtn()};Slideshow.prototype.updatePageDotPageBtn=function(){for(var c=0;c<this.pageDotArray.length;c++){if(c==this.nowPage){this.pageDotArray[c].style.opacity="1"}else{this.pageDotArray[c].style.opacity="0.3"}}if(this.nowPage<=0){this.prevBtn.style.opacity="0.5"}else{this.prevBtn.style.opacity="1"}var d=0;for(var c=0;c<this.dataArray.length;c++){if(this.dataArray[c].priority=="none"){d+=this.itemWidth}}var b=(this.width-this.btnWidth*2);var a=Math.floor((d-1)/b);if(this.nowPage>=a){this.nextBtn.style.opacity="0.5"}else{this.nextBtn.style.opacity="1"}};Slideshow.prototype.getAllChildWidth=function(){var a=0;for(var b=0;b<this.itemArray.length;b++){a+=parseInt(this.itemArray[b].style.width.replace("px",""))}return a};Slideshow.prototype.nextPage=function(){var e=this.getAllChildWidth();var d=(this.width-this.btnWidth*2);var b=Math.floor((e-1)/d);var a=0-(this.nowPage*d);if(this.nowPage<b){this.nowPage++;var a=0-(this.nowPage*d);$(this.itemContainer).stop();$(this.itemContainer).animate({left:a},800,"easeOutCubic")}else{var c=this;$("#"+this.itemContainerId).animate({left:(a-25)},100,"swing",function(){$("#"+c.itemContainerId).animate({left:a},400,"easeInSine")})}this.updatePageDotPageBtn()};Slideshow.prototype.putAndSlideToLast=function(g,e){var d=this.itemArray.indexOf(g);if(d!=-1){this.itemContainer.appendChild(g);var h=0;for(var f=0;f<this.dataArray.length;f++){if(this.dataArray[f].priority=="none"){h+=this.itemWidth}}var c=(this.width-this.btnWidth*2);var b=Math.floor((h-1)/c);if(this.nowPage!=b){this.nowPage=b;var a=0-(this.nowPage*c);$(this.itemContainer).stop();$(this.itemContainer).animate({left:a},800,"easeOutCubic",e)}else{e()}this.update()}};Slideshow.prototype.updateToLastPage=function(){var e=0;for(var d=0;d<this.dataArray.length;d++){if(this.dataArray[d].priority=="none"){e+=this.itemWidth}}var c=(this.width-this.btnWidth*2);var b=Math.floor((e-1)/c);if(this.nowPage>b&&b>=0){this.nowPage=b;var a=0-(this.nowPage*c);$(this.itemContainer).stop();$(this.itemContainer).animate({left:a},800,"easeOutCubic")}this.update()};Slideshow.prototype.prevPage=function(){var e=this.getAllChildWidth();var d=(this.width-this.btnWidth*2);var b=Math.floor(e/d);var a=0-(this.nowPage*d);if(this.nowPage>0){this.nowPage--;var a=0-(this.nowPage*d);$(this.itemContainer).stop();$(this.itemContainer).animate({left:a},800,"easeOutCubic")}else{var c=this;$("#"+this.itemContainerId).animate({left:(a+25)},100,"swing",function(){$("#"+c.itemContainerId).animate({left:a},400,"easeInSine")})}this.updatePageDotPageBtn()};$.extend($.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return $.easing[$.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-$.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return $.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return $.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});