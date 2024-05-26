var DragTimeLine=function(g,e){this.start=g;this.length=e;this.width=800;this.divide=24;this.height=30;this.isDragging=false;this.isEmpty=true;this.result=0;var u;var o;this.sprite=document.createElement("div");this.sprite.style.width=this.width+"px";this.sprite.style.height=this.height+"px";this.lineBase=document.createElement("div");this.lineBase.style.position="relative";this.lineBase.style.backgroundColor="#fffa72";this.lineBase.style.height=this.height+"px";this.lineBase.style.width=(this.width/this.divide)*this.length+"px";this.lineBase.style.left=(this.width/this.divide)*this.start+"px";this.lineBase.style.borderRadius="5px";this.lineBase.style.border="1px solid #999";this.lineBase.style.opacity=1;this.sprite.appendChild(this.lineBase);this.timeRange=document.createElement("div");this.timeRange.style.position="absolute";this.timeRange.style.top="4px";this.timeRange.style.left="6px";this.timeRange.style.color="#505050";this.timeRange.innerHTML="";this.lineBase.appendChild(this.timeRange);this.dragArea=document.createElement("div");this.dragArea.style.backgroundColor="red";this.dragArea.style.width="100%";this.dragArea.style.height=this.height+"px";this.dragArea.style.cursor="pointer";this.lineBase.appendChild(this.dragArea);this.extendArea1=document.createElement("div");this.extendArea1.style.position="absolute";this.extendArea1.style.top=0;this.extendArea1.style.left="-10px";this.extendArea1.style.backgroundColor="blue";this.extendArea1.style.width="20px";this.extendArea1.style.height=this.height+"px";this.extendArea1.style.cursor="pointer";this.lineBase.appendChild(this.extendArea1);this.extendArea2=document.createElement("div");this.extendArea2.style.position="absolute";this.extendArea2.style.top=0;this.extendArea2.style.right="-10px";this.extendArea2.style.backgroundColor="blue";this.extendArea2.style.width="20px";this.extendArea2.style.height=this.height+"px";this.extendArea2.style.cursor="pointer";this.lineBase.appendChild(this.extendArea2);this.dragArea.style.opacity=0;this.extendArea1.style.opacity=0;this.extendArea2.style.opacity=0;this.deletebtn=document.createElement("div");this.deletebtn.style.position="absolute";this.deletebtn.style.top="8px";this.deletebtn.style.right="20px";this.deletebtn.style.width="13px";this.deletebtn.style.height="13px";this.deletebtn.style.backgroundImage="url('image/slideshow_closeBtn.png')";this.deletebtn.style.cursor="pointer";this.lineBase.appendChild(this.deletebtn);if(this.start==0&&this.length==0){this.lineBase.style.display="none";this.isEmpty=true}else{this.isEmpty=false}var h=this;t(h.start,h.length);this.sprite.onmousedown=function(C){if(h.start==0&&h.length==0){h.isEmpty=true}if(h.isEmpty){C.preventDefault();var y=m(C).x;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z<h.divide){h.start=z;h.length=1;h.lineBase.style.display="block";h.lineBase.style.left=A*h.start+"px";h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}document.addEventListener("mousemove",w,false);document.addEventListener("mouseup",c,false)}};var w=function(C){var y=m(C).x;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z<=h.divide&&z>h.start){h.length=z-h.start;h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var c=function(y){h.isEmpty=false;document.removeEventListener("mousemove",w,false);document.removeEventListener("mouseup",c,false)};this.sprite.addEventListener("touchstart",function(C){if(h.start==0&&h.length==0){h.isEmpty=true}if(h.isEmpty){C.preventDefault();var y=C.changedTouches[0].pageX;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z<h.divide){h.start=z;h.length=1;h.lineBase.style.display="block";h.lineBase.style.left=A*h.start+"px";h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}document.addEventListener("touchmove",p,false);document.addEventListener("touchend",b,false)}});var p=function(C){var y=C.changedTouches[0].pageX;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z<=h.divide&&z>h.start){h.length=z-h.start;h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var b=function(y){h.isEmpty=false;document.removeEventListener("touchmove",p,false);document.removeEventListener("touchend",b,false)};this.dragArea.onmousedown=function(y){y.preventDefault();h.isDragging=true;u=m(y).x-a(h.lineBase).x;document.addEventListener("mousemove",s,false);document.addEventListener("mouseup",x,false)};var s=function(D){if(h.isDragging){D.preventDefault();var y=m(D).x;var C=m(D).x-u-a(h.sprite).x;var B=h.width/h.divide;var z=Math.floor(C/B);var A=h.divide-h.length;if(z>=0&&z<=A){h.lineBase.style.left=B*z+"px";h.start=z;t(h.start,h.length)}}};var x=function(y){h.isDragging=false;document.removeEventListener("mousemove",s,false);document.removeEventListener("mouseup",x,false)};this.dragArea.addEventListener("touchstart",function(y){y.preventDefault();h.isDragging=true;u=m(y).x-a(h.lineBase).x;document.addEventListener("touchmove",l,false);document.addEventListener("touchend",i,false)});var l=function(D){if(h.isDragging){D.preventDefault();var y=D.changedTouches[0].pageX;var C=m(D).x-u-a(h.sprite).x;var B=h.width/h.divide;var z=Math.floor(C/B);var A=h.divide-h.length;if(z>=0&&z<=A){h.lineBase.style.left=B*z+"px";h.start=z;t(h.start,h.length)}}};var i=function(y){h.isDragging=false;document.removeEventListener("touchmove",l,false);document.removeEventListener("touchend",i,false)};this.extendArea1.onmousedown=function(y){y.preventDefault();o=h.start+h.length;document.addEventListener("mousemove",n,false);document.addEventListener("mouseup",v,false)};var n=function(C){var y=m(C).x;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z>=0&&z<o){h.start=z;h.length=o-h.start;h.lineBase.style.left=h.start*A+"px";h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var v=function(y){document.removeEventListener("mousemove",n,false);document.removeEventListener("mouseup",v,false)};this.extendArea1.addEventListener("touchstart",function(y){y.preventDefault();o=h.start+h.length;document.addEventListener("mousemove",d,false);document.addEventListener("mouseup",f,false)});var d=function(C){var y=C.changedTouches[0].pageX;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z>=0&&z<o){h.start=z;h.length=o-h.start;h.lineBase.style.left=h.start*A+"px";h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var f=function(y){document.removeEventListener("touchmove",d,false);document.removeEventListener("touchend",f,false)};this.extendArea2.onmousedown=function(y){y.preventDefault();document.addEventListener("mousemove",r,false);document.addEventListener("mouseup",k,false)};var r=function(C){var y=m(C).x;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z<=h.divide&&z>h.start){h.length=z-h.start;h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var k=function(y){document.removeEventListener("mousemove",r,false);document.removeEventListener("mouseup",k,false)};this.extendArea2.addEventListener("touchstart",function(y){y.preventDefault();o=h.start+h.length;document.addEventListener("mousemove",j,false);document.addEventListener("mouseup",q,false)});var j=function(C){var y=C.changedTouches[0].pageX;var B=y-a(h.sprite).x;var A=h.width/h.divide;var z=Math.floor(B/A);if(z>=0&&z<o){h.start=z;h.length=o-h.start;h.lineBase.style.left=h.start*A+"px";h.lineBase.style.width=h.length*A+"px";t(h.start,h.length)}};var q=function(y){document.removeEventListener("touchmove",j,false);document.removeEventListener("touchend",q,false)};function m(y){return{x:(window.Event)?y.pageX:event.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft),y:(window.Event)?y.pageY:event.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)}}function a(A){var z=0;var B=0;while(A!=null){z+=A.offsetLeft;B+=A.offsetTop;A=A.offsetParent}return{x:z,y:B}}function t(D,B){var y=h.start+h.length;var A=D+":00 - "+y+":00";var C=D;var z=y;if(B>=4){h.timeRange.innerHTML=A}else{h.timeRange.innerHTML=""}h.result=A;h.resultST=C;h.resultET=z}this.deletebtn.onclick=function(y){h.start=0;h.length=0;h.lineBase.style.width=(h.width/h.divide)*h.length+"px";h.lineBase.style.left=(h.width/h.divide)*h.start+"px";h.result="0:00";h.timeString="0:00";if(h.start==0&&h.length==0){h.lineBase.style.display="none";h.isEmpty=true}else{h.isEmpty=false}h.resultST=0;h.resultET=0}};