!function(r){r.su.moduleManager.define("wirelessSchedule",{deps:["navigatorController"],services:["ajax","time","device"],models:["wirelessSchedule","timeSettings"],stores:["scheduleStore","hourComboStore","minuteComboStore","ampmComboStore"],views:["wirelessScheduleView"],listeners:{ev_on_launch:function(e,s,t,i,n,a,r){t.wirelessScheduleView.wirelessScheduleEnableCfg.hide(),i.wirelessSchedule.load({success:function(e){i.timeSettings.load({success:function(e){"auto"==e.type?i.wirelessSchedule.enable.enable():i.wirelessSchedule.enable.disable()}})}})},ev_before_destroy:function(e,s){s.clearUpdateTime()}},init:function(i,a,e,o,s,l){this.configViews({id:"wirelessScheduleView",items:[{id:"grid-schedule",configs:{tbar:{add:{text:r.su.CHAR.OPERATION.ADD,index:0}},popEditor:{addTitle:r.su.CHAR.WIRELESS_SCHEDULE.ADD_SCHEDULE,editTitle:r.su.CHAR.WIRELESS_SCHEDULE.MODIFY_SCHEDULE,content:"#grid-schedule-editor",fields:[{name:"timeFrom"},{name:"timeTo"},{name:"repeat"}]},columns:[{text:r.su.CHAR.WIRELESS_SCHEDULE.WIRELESS_OFF_TIME,dataIndex:"time",renderer:function(e){if(e){var s=e.split("-")[0],t=e.split("-")[1],i="";0==parseInt(s.split(":")[0],10)?i+="12 "+r.su.CHAR.WIRELESS_SCHEDULE.AM:parseInt(s.split(":")[0],10)<12?i+=s+" "+r.su.CHAR.WIRELESS_SCHEDULE.AM:12==parseInt(s.split(":")[0],10)?i+="12 "+r.su.CHAR.WIRELESS_SCHEDULE.PM:i+=parseInt(s.split(":")[0],10)-12+" "+r.su.CHAR.WIRELESS_SCHEDULE.PM,i+="-",0==parseInt(t.split(":")[0],10)?i+="12 "+r.su.CHAR.WIRELESS_SCHEDULE.AM:parseInt(t.split(":")[0],10)<12?i+=t+" "+r.su.CHAR.WIRELESS_SCHEDULE.AM:12==parseInt(t.split(":")[0],10)?i+="12 "+r.su.CHAR.WIRELESS_SCHEDULE.PM:i+=parseInt(t.split(":")[0],10)-12+" "+r.su.CHAR.WIRELESS_SCHEDULE.PM;var n=parseInt(s.split(":")[0],10);return parseInt(t.split(":")[0],10)<=n&&(i+=" ("+r.su.CHAR.WIRELESS_SCHEDULE.NEXT_DAY+")"),i}}},{text:r.su.CHAR.WIRELESS_SCHEDULE.REPEAT,dataIndex:"repeat",renderer:function(e){var s=e.split(",");if("eve"==s[0])return r.su.CHAR.WIRELESS_SCHEDULE.EVE;if("weekdays"==s[0])return r.su.CHAR.WIRELESS_SCHEDULE.WEEKDAYS;if("weekends"==s[0])return r.su.CHAR.WIRELESS_SCHEDULE.WEEKENDS;for(var t="",i=0;i<s.length;i++){switch(s[i]){case"sun":t+=r.su.CHAR.WIRELESS_SCHEDULE.SUN;break;case"mon":t+=r.su.CHAR.WIRELESS_SCHEDULE.MON;break;case"tue":t+=r.su.CHAR.WIRELESS_SCHEDULE.TUES;break;case"wed":t+=r.su.CHAR.WIRELESS_SCHEDULE.WED;break;case"thu":t+=r.su.CHAR.WIRELESS_SCHEDULE.THUR;break;case"fri":t+=r.su.CHAR.WIRELESS_SCHEDULE.FRI;break;case"sat":t+=r.su.CHAR.WIRELESS_SCHEDULE.SAT}i!=s.length-1&&(t+=",")}return t}},{xtype:"actioncolumn",text:r.su.CHAR.WIRELESS_SCHEDULE.MODIFY,renderer:function(e,s){return'<span class="icon"></span>','<span class="text"></span>',"</a>",'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete">','<span class="icon"></span>','<span class="text"></span>',"</a>",'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}}]}),this.listen({"models.wirelessSchedule.enable":{"ev_value_change":function(e,s,t){"on"==s?(l.ajax.request({proxy:"wirelessScheduleAddListProxy",method:"read",success:function(e){o.scheduleStore.loadData(e.data,!0)}}),a.wirelessScheduleView.wirelessScheduleEnableCfg.show(),l.time.on("on_time_change",i.onTimeChange),l.time.on("on_hour24_change",i.onHour24Change)):(a.wirelessScheduleView.wirelessScheduleEnableCfg.hide(),l.time.off("on_time_change",i.onTimeChange),l.time.off("on_hour24_change",i.onHour24Change))}},"stores.scheduleStore":{"ev_data_change":function(e,s,t){s.value!=s.oldValue&&"enable"==t.getName()&&o.scheduleStore.sync()},"ev_before_sync":function(e,s,t){s.preventDefault();for(var i=o.scheduleStore.getStoreData(),n=[],a=0;a<i.length;a++){var r=i[a].repeat;switch(r){case"weekends":r="sat,sun";break;case"weekdays":r="mon,tue,wed,thu,fri"}n.push(r+":["+parseInt(i[a].timeFrom)+","+parseInt(i[a].timeTo)+"]")}l.ajax.request({proxy:"wirelessScheduleAddListProxy",method:"write",data:{list:JSON.stringify(n)},success:function(e){o.scheduleStore.loadData(e.data,!0)}})}},"views.wirelessScheduleView.timeFrom":{"ev_value_change":function(e,s){var t=s,i=a.wirelessScheduleView.timeTo.getValue();if("string"==typeof t&&"string"==typeof i){var n=parseInt(t.split(":")[0],10);parseInt(i.split(":")[0],10)<=n?a.wirelessScheduleView.timeTo.setShortTips(r.su.CHAR.WIRELESS_SCHEDULE.NEXT_DAY_TIP):a.wirelessScheduleView.timeTo.setShortTips("")}}},"views.wirelessScheduleView.timeTo":{"ev_value_change":function(e,s){var t=a.wirelessScheduleView.timeFrom.getValue(),i=s;if("string"==typeof t&&"string"==typeof i){var n=parseInt(t.split(":")[0],10);parseInt(i.split(":")[0],10)<=n?a.wirelessScheduleView.timeTo.setShortTips(r.su.CHAR.WIRELESS_SCHEDULE.NEXT_DAY_TIP):a.wirelessScheduleView.timeTo.setShortTips("")}}}})}},function(e,n,s,t,i,a){return{onTimeChange:function(e,s){var t=a.time.getHour24(),i=a.time.format(s,"yyyy-MM-dd HH:mm:ss",t);n.wirelessScheduleView.currentTime.setValue(i)},onHour24Change:function(e,s){s?(n.wirelessScheduleView.timeFrom.setHourSystem("24"),n.wirelessScheduleView.timeTo.setHourSystem("24")):(n.wirelessScheduleView.timeFrom.setHourSystem("12"),n.wirelessScheduleView.timeTo.setHourSystem("12"))},clearUpdateTime:function(){a.time.off("on_time_change",e.onTimeChange),a.time.off("on_hour24_change",e.onHour24Change)}}})}(jQuery);