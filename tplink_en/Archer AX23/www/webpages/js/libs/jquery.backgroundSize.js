!function(g,t,c){var a,o,n,h,r,d,e=g("<div>")[0],l=/url\(["']?(.*?)["']?\)/,i=[],u={top:0,left:0,bottom:1,right:1,center:.5};"backgroundSize"in e.style&&!g.debugBGS||(g.cssHooks.backgroundSize={set:function(t,e){var s=!g.data(t,"bgsImg");g.data(t,"bgsValue",e),s?(i.push(t),g.refreshBackgroundDimensions(t,!0),e=g("<div>").css({position:"absolute",zIndex:-1,top:0,right:0,left:0,bottom:0,overflow:"hidden"}),s=g("<img>").css({position:"absolute"}).appendTo(e),e.prependTo(t),g.data(t,"bgsImg",s[0]),e=(g.css(t,"backgroundPosition")||g.css(t,"backgroundPositionX")+" "+g.css(t,"backgroundPositionY")).split(" "),g.data(t,"bgsPos",[u[e[0]]||parseFloat(e[0])/100,u[e[1]]||parseFloat(e[1])/100]),"auto"==g.css(t,"zIndex")&&(t.style.zIndex=0),"static"==g.css(t,"position")&&(t.style.position="relative"),g.refreshBackgroundImage(t)):g.refreshBackground(t)},get:function(t){return g.data(t,"bgsValue")||""}},g.cssHooks.backgroundImage={set:function(t,e){return g.data(t,"bgsImg")?g.refreshBackgroundImage(t,e):e}},g.refreshBackgroundDimensions=function(t,e){var s=g(t),s={width:s.innerWidth(),height:s.innerHeight()},i=g.data(t,"bgsDim"),i=!i||s.width!=i.width||s.height!=i.height;g.data(t,"bgsDim",s),i&&!e&&g.refreshBackground(t)},g.refreshBackgroundImage=function(e,t){var s=g.data(e,"bgsImg"),t=(l.exec(t||g.css(e,"backgroundImage"))||[])[1];t!=(s&&s.src)&&(s.style.height=s.style.width="auto",s.onload=function(){var t={width:s.width,height:s.height};1==t.width&&1==t.height||(g.data(e,"bgsImgDim",t),g.data(e,"bgsConstrain",!1),g.refreshBackground(e),s.style.visibility="visible",s.onload=null)},s.style.visibility="hidden",s.src=t,(s.readyState||s.complete)&&(s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",s.src=t),e.style.backgroundImage="none")},g.refreshBackground=function(t){var e,s,i=g.data(t,"bgsValue"),a=g.data(t,"bgsDim"),o=g.data(t,"bgsImgDim"),n=g(g.data(t,"bgsImg")),h=g.data(t,"bgsPos"),r=g.data(t,"bgsConstrain"),d=a.width/a.height,o=o.width/o.height;"contain"==i?d<o?(g.data(t,"bgsConstrain",e="width"),s=c.floor((a.height-a.width/o)*h[1]),n.css({top:s}),e!=r&&n.css({width:"100%",height:"auto",left:0})):(g.data(t,"bgsConstrain",e="height"),s=c.floor((a.width-a.height*o)*h[0]),n.css({left:s}),e!=r&&n.css({height:"100%",width:"auto",top:0})):"cover"==i&&(d<o?(g.data(t,"bgsConstrain",e="height"),s=c.floor((a.height*o-a.width)*h[0]),n.css({left:-s}),e!=r&&n.css({height:"100%",width:"auto",top:0})):(g.data(t,"bgsConstrain",e="width"),s=c.floor((a.width/o-a.height)*h[1]),n.css({top:-s}),e!=r&&n.css({width:"100%",height:"auto",left:0})))},a=g.event,o={_:0},n=0,d=a.special.throttledresize={setup:function(){g(this).on("resize",d.handler)},teardown:function(){g(this).off("resize",d.handler)},handler:function(t,e){var s=this,i=arguments;h=!0,r||(g(o).animate(o,{duration:Infinity,step:function(){(++n>d.threshold&&h||e)&&(t.type="throttledresize",a.dispatch.apply(s,i),h=!1,n=0),9<n&&(g(o).stop(),r=!1,n=0)}}),r=!0)},threshold:1},g(t).on("throttledresize",function(){g(i).each(function(){g.refreshBackgroundDimensions(this)})}))}(jQuery,window,(document,Math));