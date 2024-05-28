!function(m){m.su.moduleManager.define("timeSettings",{models:["timeSettings","language","daylight","time24Model","autoUpgradeModel","regionModel"],stores:["languageStore","setTimeHourStore","setTimeMinStore","setTimeSecStore","startMonthStore","startWeekStore","startWeekdayStore","startHourStore","setTimeModeStore","timezoneStore","autoUpdateTimeStore","availableRegionStore","allRegionStore"],services:["ajax","language","time","device","moduleManager"],views:["timeSettingsView"],deps:["utils"],listeners:{ev_on_launch:function(e,t,i,a,n,s,o){this.unRegisterAutoSaveData([a.time24Model]),o.time.on("on_time_change",t.onTimeChange),o.time.on("on_hour24_change",t.onHour24Change),a.timeSettings.date.setFormat(o.device.getDateFormat()),n.languageStore.load({success:function(){var e=o.device.getLocale();t.unRegisterAutoSaveData([a.language]),a.language.language.setValue(e),a.language.language.record(),t.registerAutoSaveData([a.language])}}),t.initRegion(),a.time24Model.load(),a.timeSettings.load(),a.daylight.load(),(t.isRouterMode||t.isAccessPointDevice)&&a.autoUpgradeModel.load({success:function(e){t.autoUpdateEnable=e.enable}})},ev_before_destroy:function(e,t){t.beforeDestroy()}},init:function(r,l,g,e,t,u){this.listen({"models.time24Model":{ev_loaded:function(e,t){u.time.setHour24("on"===g.time24Model.hour24Enable.getValue())},ev_model_submit:function(e,t){u.time.setHour24("on"===g.time24Model.hour24Enable.getValue())}},"models.daylight":{ev_loaded:function(e){"on"===g.daylight.dstEnable.getValue()||g.daylight.dstStatus.getValue()?g.daylight.dstStatus.show():g.daylight.dstStatus.hide(),r.getTimeFormat()}},"models.timeSettings":{ev_loaded:function(e,t){var i=t.date.split("/");r.sysTimeYear=parseInt(i[2],10),r.sysTimeHash=r.parseFormat(i[0],2)+r.parseFormat(i[1],2)+r.parseFormat(t.time.split(":")[0],2),r.getTimeFormat()}},"models.timeSettings.type":{ev_value_change:function(e,t,i){"on"===r.autoUpdateEnable&&"auto"!==t&&"null"!==i&&t!==i?r.setTimeCheckMsg(t):"manual"===t?(l.timeSettingsView.manualFieldset.show(),u.device.getConfig().supportSystemTimeAllTimeZone||(g.timeSettings.timezone.hide(),g.timeSettings.timezone.disable()),l.timeSettingsView.internetFieldset.hide(),g.timeSettings.time.enable(),g.timeSettings.date.enable()):"auto"===t?(l.timeSettingsView.manualFieldset.hide(),u.device.getConfig().supportSystemTimeAllTimeZone||(g.timeSettings.timezone.show(),g.timeSettings.timezone.enable()),l.timeSettingsView.internetFieldset.show(),g.timeSettings.time.disable(),g.timeSettings.date.disable()):(l.timeSettingsView.manualFieldset.hide(),u.device.getConfig().supportSystemTimeAllTimeZone||(g.timeSettings.timezone.hide(),g.timeSettings.timezone.disable()),l.timeSettingsView.internetFieldset.hide(),g.timeSettings.time.enable(),g.timeSettings.date.enable())}},"models.timeSettings.timezone":{ev_value_change:function(e,t,i){var a,n,s;null!==i&&(a=g.timeSettings.time.getValue().split(":"),s=parseInt(a[0],10),n=parseInt(a[1],10),n=(s=parseInt(60*s,10)+parseInt(n,10)+parseInt(t,10)-parseInt(i,10))%60,(i=24==(i=24<(t=parseInt(s/60,10))?t-24:t)&&0<n?0:i)<0&&(0==i?i=23:i+=24),n<0&&(n+=60),n<10&&(n="0"+n),s=(i=i<10?"0"+i:i).toString()+":"+n.toString()+":"+a[2],g.timeSettings.time.setValue(s))}},"models.time24Model.hour24Enable":{ev_value_change:function(e,t,i){i&&i!==t&&g.time24Model.submit()}},"models.daylight.dstEnable":{ev_value_change:function(e,t,i){"on"===t?l.timeSettingsView.daylightFieldset.show():l.timeSettingsView.daylightFieldset.hide()}},"models.daylight.startMonth":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.startWeek":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.startDay":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.startHour":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.endMonth":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.endWeek":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.endDay":{ev_value_change:function(e,t,i){r.getTimeFormat()}},"models.daylight.endHour":{ev_value_change:function(e,t,i){r.getTimeFormat()}}}),this.control({".index-common-save-btn":{ev_will_auto_save:function(e,t){t.preventDefault(),g.regionModel.isDirty()&&g.regionModel.submit();var i,a,n,s=m.Deferred(),o=m.Deferred();g.timeSettings.isDirty()?("pc"===(t=g.timeSettings.type.getValue())?(a=(n=function(e){return e<10?"0"+e:e})((i=new Date).getMonth()+1)+"/"+n(i.getDate())+"/"+n(i.getFullYear()),n=n(i.getHours())+":"+n(i.getMinutes())+":"+n(i.getSeconds()),g.timeSettings.time.setValue(n),g.timeSettings.date.setValue(a),m.when(s).then(function(){u.time.sync()})):"auto"===t?(l.timeSettingsView.ntpStatus.hide(),m.when(s).then(function(){l.timeSettingsView.ntpStatus.show(),l.timeSettingsView.ntpStatus.setLoading(m.su.CHAR.TIMESETTING.GETGMT_WAIT),g.timeSettings.startGmt({success:function(){r.syncGmt(function(e){u.time.sync(),g.daylight.load()})},fail:function(){l.timeSettingsView.ntpStatus.hide()},error:function(){l.timeSettingsView.ntpStatus.hide()}})})):m.when(s).then(function(){u.time.sync()}),g.timeSettings.submit({success:function(){s.resolve()}})):s.resolve(),g.daylight.isDirty()?g.daylight.submit({success:function(){o.resolve()}}):o.resolve(),m.when(s,o).then(function(){g.language.language.isDirty()&&u.language.switchTo(g.language.language.getValue()),g.daylight.load()})}},"#set-time-check-msg":{ev_msg_ok:function(e,t){t.preventDefault(),u.moduleManager.get("navigatorController").goTo("firmware")},ev_msg_no:function(e,t){g.timeSettings.type.setValue("auto")}}})}},function(T,f,p,n,t,s){var i=null;return{autoUpdateEnable:"",sysTimeYear:"2017",sysTimeHash:"",isRouterMode:"router"==s.device.getCurrentMode(),isAccessPointDevice:s.device.getConfig().isAccessPointDevice,syncGmt:function(e){function t(t){s.ajax.request({proxy:"timeSettingsGmtProxy",method:"refresh",success:function(e){if(void 0===e.status)return f.timeSettingsView.ntpStatus.hide(),clearInterval(i),i=null,!1;switch(parseInt(e.status,10)){case 747301:clearInterval(i),i=null,f.timeSettingsView.ntpStatus.setSuccess(m.su.CHAR.TIMESETTING.GETGMT_SUCCESS),t&&t(e);break;case 747302:clearInterval(i),i=null,f.timeSettingsView.ntpStatus.setFailed(m.su.CHAR.TIMESETTING.GETGMT_TIMEOUT);break;case 747303:f.timeSettingsView.ntpStatus.setLoading(m.su.CHAR.TIMESETTING.GETGMT_WAIT);break;default:clearInterval(i),i=null}}})}clearInterval(i),i=setInterval(function(){t(e)},2e3),t(e)},onTimeChange:function(e,t){var i=s.time.getHour24(),a=s.device.getTimeFormat(),t=s.time.format(t,a,i);f.timeSettingsView.currentTime.setValue(t)},onHour24Change:function(e,t){t?(n.startHourStore.loadData(T.startHour24Data),p.timeSettings.time.setHourSystem("24")):(n.startHourStore.loadData(T.startHourData),p.timeSettings.time.setHourSystem("12")),T.setAutoUpdateTimeStore()},clearCurrentTime:function(){clearInterval(i),i=null},beforeDestroy:function(){T.clearCurrentTime(),s.time.off("on_time_change",T.onTimeChange),s.time.off("on_hour24_change",T.onHour24Change)},startHourData:function(){for(var e,t=[],i=0;i<=23;i++)t[e=i]={},0===i?(t[e].name="12:00 AM",t[e].value="12am"):i<=11?(t[e].name=i+":00 AM",t[e].value=i+"am"):12===i?(t[e].name="12:00 PM",t[e].value="12pm"):(t[e].name=i-12+":00 PM",t[e].value=i-12+"pm");return t[0].selected=!0,t}(),startHour24Data:function(){for(var e,t=[],i=0;i<=23;i++)t[e=i]={},t[e].name=("0"+i).slice(-2)+":00",t[e].value=0===i?"12am":i<=11?i+"am":12===i?"12pm":i-12+"pm";return t[0].selected=!0,t}(),parseFormat:function(e,t){for(e=e.toString();e.length<t;)e="0"+e;return e},getTimeFormat:function(){var e=T.sysTimeYear,t=T.sysTimeHash,i=p.daylight.startMonth,a=p.daylight.startWeek,n=p.daylight.startDay,s=p.daylight.startHour,o=p.daylight.endMonth,r=p.daylight.endWeek,l=p.daylight.endDay,g=p.daylight.endHour,u=i.getValue(),m=a.getValue(),d=n.getValue(),s=s.getValue(),c=o.getValue(),S=r.getValue(),h=l.getValue(),g=g.getValue();if(!(u&&m&&d&&s&&c&&S&&h&&g))return!1;var v,i=parseInt(i.getLiIndex(u))+1,u=parseInt(a.getLiIndex(m))+1,a=parseInt(n.getLiIndex(d))+1,m=parseInt(o.getLiIndex(c))+1,n=parseInt(r.getLiIndex(S))+1,d=parseInt(l.getLiIndex(h))+1,o=-1!==s.indexOf("am")?(v=parseInt(s),parseInt(g)):(v=parseInt(s)+12,parseInt(g)+12),c=new Date(e,i,1),r=parseInt(c.getDay()),S=new Date(e,m,1),l=parseInt(S.getDay()),a=7*u-r+a+1+(a<r?7:0),d=7*n-l+d+1+(d<l?7:0),h=T.parseFormat(i,2)+T.parseFormat(a,2)+T.parseFormat(v,2),s=T.parseFormat(m,2)+T.parseFormat(d,2)+T.parseFormat(o,2),g=f.timeSettingsView.daylightStart,c=f.timeSettingsView.daylightEnd;h<s?t<s?(g.setSubLabel(e),c.setSubLabel(e)):(g.setSubLabel(e+1),c.setSubLabel(e+1)):t<s?(g.setSubLabel(e-1),c.setSubLabel(e)):(g.setSubLabel(e),c.setSubLabel(e+1))},setAutoUpdateTimeStore:function(){var e=t.utils.getAutoUpdateTimeStoreData();n.autoUpdateTimeStore.loadData(e)},initRegion:function(){p.regionModel.load({success:function(e){p.regionModel.getData().regionSelectEnable&&(p.regionModel.country.show(),f.timeSettingsView.timeSettingsPanel.setTitle(m.su.CHAR.TIMESETTING.REGION_TIME),f.timeSettingsView.timeSettingsPanel.setInstruction(m.su.CHAR.TIMESETTING.SYSTEM_TIME_REGION_TIP),n.availableRegionStore.loadData(T.getAvailableRegions()))}})},getAvailableRegions:function(){for(var e=p.regionModel.getData(),t=(regionList=e.regionList,[]),i=0;i<regionList.length;i++){var a=regionList[i],a=n.allRegionStore.getModelByKey(a).getData();t.push(a)}return t},setTimeCheckMsg:function(e){e="manual"===e?m.su.CHAR.FIRMWARE.SET_TIME_CHECK_NOTE2:m.su.CHAR.FIRMWARE.SET_TIME_CHECK_NOTE1;f.timeSettingsView.setTimeCheckMsg.setContent(e),f.timeSettingsView.setTimeCheckMsg.show()}}})}(jQuery);