jQuery.su.moduleManager.define("internetBasic",{services:["moduleLoader","moduleManager"],views:["internetBasicView"],listeners:{ev_on_launch:function(e,n,t,i,r,a,o){o.moduleLoader.load({module:"internetBasic"},{module:"internet",view:"internetViewBasic"},t.internetBasicView.internetLoader,function(){var e=o.moduleManager.get("internet");e.setMode(e.MODE.BASIC),e.startup()})}}},function(e,n,t,i,r,a){return{}});