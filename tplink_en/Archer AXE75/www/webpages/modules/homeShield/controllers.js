!function(n){n.su.moduleManager.define("homeShield",{deps:[],services:["moduleLoader"],models:[],stores:[],views:["homecareView"],listeners:{"ev_on_launch":function(e,i,a,s,t,c,r){767<window.innerWidth&&(a.homecareView.security.hide(),a.homecareView.parental.hide(),a.homecareView.analysis.hide()),this.control({"#tab-overview":{"click":function(e){i.resetTabs(),n("#tab-overview")[0].classList.add("active"),a.homecareView.overview.show()}},"#tab-security":{"click":function(e){i.resetTabs(),n("#tab-security")[0].classList.add("active"),a.homecareView.security.show()}},"#tab-parental":{"click":function(e){i.resetTabs(),n("#tab-parental")[0].classList.add("active"),a.homecareView.parental.show()}},"#tab-analysis":{"click":function(e){i.resetTabs(),n("#tab-analysis")[0].classList.add("active"),a.homecareView.analysis.show()}}})}},init:function(e,i,a,s,t,c){}},function(e,a,i,s,t,c){return{resetTabs:function(){a.homecareView.overview.hide(),a.homecareView.security.hide(),a.homecareView.parental.hide(),a.homecareView.analysis.hide();for(var e=n(".tab-item"),i=0;i<e.length;i++)e[i].className="tab-item"}}})}(jQuery);