jQuery.su.moduleManager.define("usageStats",{services:["moduleLoader","device"],models:["improvementModel"],views:["usageStatsView"],listeners:{ev_on_launch:function(e,n,r,o,u,i,s){n.isSupportUserExperience()&&n.loadUserExperienceModule()}},init:function(e,n,r,o,u,i){}},function(e,n,r,o,u,i){return{loadUserExperienceModule:function(){i.moduleLoader.load({module:"usageStats"},{module:"userExperience"},n.usageStatsView.userExperienceLoader)},isSupportUserExperience:function(){return i.device.getConfig().supportUXPlan}}});