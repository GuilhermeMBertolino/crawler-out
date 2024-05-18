!function(u){u.su.moduleManager.define("firmware",{models:["firmwareSetModel","onlineUpgradeModel","statusAll","autoUpgradeModel","timeSettings"],stores:["upgradeLogStore","autoUpdateTimeStore"],deps:["main","quickSetup"],services:["ajax","language","vtype","time","moduleManager","device"],views:["firmwareView","firmwareQsView"],listeners:{"ev_on_launch":function(e,r,t,n,a,o,i){if(i.device.getConfig().supportAutoUpdate){i.time.on("on_time_change",r.onTimeChange);for(var s=[],l=0;l<11;l++)s.push({name:l+":00AM to "+(l+2)+":00AM",value:l});s.push({name:"11:00AM to 1:00PM",value:11});for(l=0;l<11;l++)s.push({name:l+":00PM to "+(l+2)+":00PM",value:l+12});s.push({name:"11:00PM to 1:00AM",value:23}),a.autoUpdateTimeStore.loadData(s),n.autoUpgradeModel.load(),t.firmwareView.autoUpdateWrap.hide()}n.timeSettings.load({success:function(e){r.timeType=e.type}}),t.firmwareView.upgradeOption.hide(),n.firmwareSetModel.load({success:function(){var e=n.firmwareSetModel.getData(),e=(r.rebootTime=parseInt(1e3*e.totalTime||r.rebootTime,10),e.hardwareVersion);i.device.getConfig().supportFirmwareInfoReplace&&(e=e.replace("v1.0","v1.0/v1.20")),t.firmwareView.hardwareVersion.setValue(e)}}),n.onlineUpgradeModel.load(),n.statusAll.load({success:function(){var e=n.statusAll.getData(),r=e.wireless2gEnable,a=e.wireless5gEnable,e=e.wireless5g2Enable;"on"===r?t.firmwareView.reconnect2g.show():t.firmwareView.reconnect2g.hide(),"on"===a?t.firmwareView.reconnect5g1.show():t.firmwareView.reconnect5g1.hide(),"on"===e?t.firmwareView.reconnect5g2.show():t.firmwareView.reconnect5g2.hide()}}),i.ajax.request({proxy:"checkWireTypeProxy",success:function(e){r.wireType=e.wire_type}}),r.setMode(null),"ap"!==i.device.getCurrentMode()&&i.device.getConfig().supportAutoUpdate||t.firmwareView.autoUpdateField.hide()},"ev_before_destroy":function(){this.beforeDestroy()}},init:function(n,o,a,t,e,i){this.configViews({}),this.listen({"models.onlineUpgradeModel":{"ev_loaded":function(){var e=a.onlineUpgradeModel.getData();o.firmwareView.checkUpgradesBtn.loading(!1),o.firmwareView.checkUpgradesBtn.hide(),e.latestFlag?(o.firmwareView.upgradeOption.hide(),o.firmwareView.checkUpgradesBtn.show(),o.firmwareView.checkUpgradesBtn.setTips(u.su.CHAR.FIRMWARE.FIRMWARE_UPTO_DATE)):(o.firmwareView.checkUpgradesBtn.hide(),o.firmwareView.checkUpgradesBtn.setTips(),o.firmwareView.upgradeOption.show(),i.ajax.request({proxy:"checkUpgradeNumberProxy",success:function(e){parseInt(e.updateNumber,10)}}))}},"models.onlineUpgradeModel.detail":{"ev_value_change":function(e,r){r=(r=r.replace(/\\t/g," ")).replace(/\\'/g,"'");t.upgradeLogStore.loadData(r.split("\\n"),!0)}},"models.autoUpgradeModel.enable":{"ev_value_change":function(e,r){"on"==r?o.firmwareView.autoUpdateWrap.show():o.firmwareView.autoUpdateWrap.hide()}}}),this.control({"#firmware-check-upgrades-btn":{"ev_button_click":function(){n.startCheckUpgrade()}},"#firmware-whats-new":{"ev_button_click":function(){t.upgradeLogStore.toggle()}},"#online-upgrade-btn":{"ev_button_click":function(){n.modeFlag="online",o.firmwareView.confirmUpgrade.show()}},"#manual-upgrade-file":{"ev_file_change":function(e,r){var r=this.checkFileName(r,"bin"),a=o.firmwareView.firmwareFile;!0===r?a.setNormal():a.setError(r)}},"#local-upgrade-btn":{"ev_button_click":function(){n.modeFlag="manual";var e=o.firmwareView.firmwareFile,r=e.getFileName(),r=this.checkFileName(r,"bin");!0===r?(e.setNormal(),o.firmwareView.confirmUpgrade.show()):e.setError(r)}},"#firmware-upgrade-msg":{"ev_msg_ok":function(){"online"===n.modeFlag?n.startOnlineUpgrade():"manual"===n.modeFlag&&n.startLocalUpgrade()}},"#qs-upgrade-retry-btn":{"ev_button_click":function(){n.startOnlineUpgrade()}},".qs-upgrade-skip-btn":{"ev_button_click":function(){n.goToSummary()}},"#reconnect-msg":{"ev_msg_ok":function(e,r){var a=u.Deferred(),t=o.firmwareView.reconnectMsg;r.preventDefault(),t.disableButton("ok"),n.checkRouter({success:function(){a.resolve()},fail:function(){a.resolve()},error:function(){a.reject()}}),a.then(function(){t.close(),t.enableButton("ok"),localStorage&&localStorage.setItem("token",""),window.location.href="/"},function(){t.enableButton("ok")})}},"#firmware-auto-update":{"ev_view_change":function(e,r){"on"==r.value&&"auto"!=n.timeType?o.firmwareView.autoUpdateCheckMsg.show():a.autoUpgradeModel.submit()}},"#auto-update-settings":{"ev_button_click":function(){i.moduleManager.get("navigatorController").goTo("timeSettings")}},"#auto-update-check-msg":{"ev_msg_ok":function(e,r){i.moduleManager.get("navigatorController").goTo("timeSettings")},"ev_msg_no":function(e,r){a.autoUpgradeModel.enable.setValue("off")}}})}},function(n,o,i,e,s,l){var a=0,t=0,c=null;return{wireType:"",timeType:"",modeFlag:"",rebootTime:12e4,queryLocalInterval:!1,queryLocalIntervalMax:!1,queryOnlineInterval:!1,checkDownloadInterval:!1,MODE:{"QUICK_SETUP":"qs","NETWORK_MAP":"networkMap"},setMode:function(e){c=e},getMode:function(){return c},setQsState:function(e){s.quickSetup.upgradeState=e},resetProBar:function(){o.firmwareView.proBar.stop(),o.firmwareView.proBar.reset(),o.firmwareView.progressbarWrap.hide()},startCheckUpgrade:function(){o.firmwareView.checkUpgradesBtn.setTips(),o.firmwareView.checkUpgradesBtn.setNormal(),o.firmwareView.checkUpgradesBtn.loading(!0);var e=u.Deferred(),r=u.Deferred();u.Deferred();n.detectInternet(function(){e.resolve()},function(){n.showCheckError(u.su.CHAR.ERROR["10000139"])},function(){n.showCheckError(u.su.CHAR.ERROR["10000139"])}),u.when(e).then(function(){n.detectDevice(function(){r.resolve()},function(){n.showUpgradeError()},function(){n.showUpgradeError()})}),u.when(r).then(function(){i.onlineUpgradeModel.load({fail:function(){n.showCheckError(u.su.CHAR.ERROR["10000193"])},error:function(){n.showCheckError(u.su.CHAR.ERROR["10000193"])}})})},goToSummary:function(){s.quickSetup.submitQsWirelssData()},startOnlineUpgrade:function(){var r,a=n.getMode(),e=(a!==n.MODE.QUICK_SETUP&&s.main.showProBar(u.su.CHAR.FIRMWARE.DOWNLOADING,u.su.CHAR.FIRMWARE.UPGRADE_PROCESS_TIP),u.Deferred()),t=u.Deferred();u(".qs-download-fail-icon").removeClass("upgrade"),o.firmwareQsView.qsFwUpgradeProgress.show(),o.firmwareQsView.qsFwUpgradeFail.hide(),o.firmwareQsView.qsFailNote.setText(u.su.CHAR.FIRMWARE.DOWNLOAD_FAIL),o.firmwareQsView.qsUpgradeRoad.setText(u.su.CHAR.FIRMWARE.TRY_AGAIN),o.firmwareQsView.qsUpgradeDownloadBtns.show(),o.firmwareQsView.qsUpgradeNextBtn.hide(),a===n.MODE.QUICK_SETUP?(errorHandler=this.qsErrorHandler.bind(this),r=this.qsErrorHandler.bind(this)):a===n.MODE.NETWORK_MAP?(errorHandler=s.main.showError,r=s.main.showError,u.su.moduleManager.get("networkMap").beforeDestroy()):(errorHandler=n.showCheckError,r=n.showOnlineUpgradeError),n.detectInternet(function(){e.resolve()},function(){s.main.hideProBar(),errorHandler(u.su.CHAR.ERROR["10000139"])},function(){s.main.hideProBar(),errorHandler(u.su.CHAR.ERROR["10000139"])}),u.when(e).then(function(){n.detectDevice(function(){t.resolve()},function(){s.main.hideProBar(),errorHandler(u.su.CHAR.ERROR["10000139"])},function(){s.main.hideProBar(),errorHandler(u.su.CHAR.ERROR["10000139"])})}),u.when(t).then(function(){i.onlineUpgradeModel.getProxy().upgrade({success:function(e){a===n.MODE.QUICK_SETUP&&n.setUpgradedValue(!0),n.detectDownloadStatus()},fail:function(e){r(u.su.CHAR.ERROR["10000194"])},error:function(){r(u.su.CHAR.ERROR["10000194"])}})})},qsErrorHandler:function(){this.setQsState("upgradeFailed"),o.firmwareQsView.qsFwUpgradeProgress.hide(),o.firmwareQsView.qsFwUpgradeFail.show()},startLocalUpgrade:function(){o.firmwareView.proBar.reset(),o.firmwareView.proBarTitle.setText(u.su.CHAR.FIRMWARE.UPLOADING),o.firmwareView.proBarTips.setText(u.su.CHAR.FIRMWARE.UPGRADE_PROCESS_TIP),o.firmwareView.confirmUpgrade.hide(),o.firmwareView.progressbarWrap.show(),l.ajax.upload({proxy:"uploadFirmwareProxy",fileId:"manual-upgrade-file",timeout:72e4,success:function(e){o.firmwareView.confirmUpgrade.hide(),n.queryLocalInterval||(o.firmwareView.proBarTitle.setText(u.su.CHAR.FIRMWARE.UPGRADING),o.firmwareView.proBar.reset(),o.firmwareView.progressbarWrap.show(),clearInterval(n.queryLocalInterval),n.queryLocalInterval=setInterval(n.detectLocalUpgradeStatus,1e3),l.device.getConfig().supportUpgradeQuery?n.queryLocalIntervalMax=setTimeout(function(){clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,n.resetProBar(),n.showUpgradeFailedMsg(res.errorcode)},15e3):o.firmwareView.proBar.animate({percentageStart:0,percentageEnd:100,duration:1e3*i.firmwareSetModel.upgradetime.getValue(),callback:function(){clearInterval(n.queryLocalInterval),n.resetProBar(),n.startReboot(n.rebootTime,!0)}}))},fail:function(e){o.firmwareView.progressbarWrap.hide(),clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,n.showUpgradeFailedMsg("err_flash")},error:function(){o.firmwareView.progressbarWrap.hide(),clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,n.showUpgradeFailedMsg("err_flash")}})},detectInternet:function(r,a,t){l.ajax.request({proxy:"checkInternetProxy",success:function(e){r&&r(e)},fail:function(e){a&&a(e)},error:function(e){t&&t(e)}})},detectDevice:function(r,a,t){l.ajax.request({proxy:"checkDeviceProxy",success:function(e){r&&r(e)},fail:function(e){a&&a(e)},error:function(e){t&&t(e)}})},detectDownloadStatus:function(){var r=this.getMode();o.firmwareView.confirmUpgrade.hide(),clearInterval(n.checkDownloadInterval),n.checkDownloadInterval=setInterval(function(){l.ajax.request({proxy:"checkDownloadStatusProxy",success:function(e){a=0;e=parseInt(e.percent,10);r===n.MODE.QUICK_SETUP?o.firmwareQsView.qsFwUpgradeBar.setValue(e):s.main.setProBarValue(e),100===e&&(clearInterval(n.checkDownloadInterval),n.checkDownloadInterval=null,setTimeout(n.detectOnlineUpgradeStatus,1e3))},fail:function(e){15===++a&&(a=0,clearInterval(n.checkDownloadInterval),n.checkDownloadInterval=null,s.main.hideProBar(),c===n.MODE.QUICK_SETUP?(n.setUpgradedValue(!1),n.qsErrorHandler()):((e=e.errorcode)&&(e=e.toString().replace(/^-/,"E"),s.main.setUpgradeRetryContent(u.su.CHAR.ERROR[e])),s.main.setUpgradeRetryContent(u.su.CHAR.ERROR["10000191"]),s.main.showUpgradeRetry()))},error:function(){15===++a&&(a=0,clearInterval(n.checkDownloadInterval),n.checkDownloadInterval=null,s.main.hideProBar(),c===n.MODE.QUICK_SETUP?(n.setUpgradedValue(!1),n.qsErrorHandler()):(s.main.setUpgradeRetryContent(u.su.CHAR.ERROR["10000191"]),s.main.showUpgradeRetry()))}})},1e3)},detectOnlineUpgradeStatus:function(){u(".qs-download-fail-icon").addClass("upgrade"),o.firmwareQsView.qsFailNote.setText(u.su.CHAR.FIRMWARE.UPGRADE_FAIL_NOTE),o.firmwareQsView.qsUpgradeRoad.setText(u.su.CHAR.FIRMWARE.UPGRADE_FAIL_ROAD),o.firmwareQsView.qsUpgradeDownloadBtns.hide(),o.firmwareQsView.qsUpgradeNextBtn.show();var r=n.getMode();r!==n.MODE.QUICK_SETUP&&s.main.showProBar(u.su.CHAR.FIRMWARE.UPGRADING,u.su.CHAR.FIRMWARE.UPGRADE_PROCESS_TIP),o.firmwareQsView.qsFwUpgradeBar.reset(),o.firmwareQsView.qsFwUpgradeBar.setText(u.su.CHAR.FIRMWARE.UPGRADING),clearInterval(n.queryOnlineInterval),n.queryOnlineInterval=setInterval(function(){l.ajax.request({proxy:"checkUpgradeStatusProxy",success:function(e){t=0;e=parseInt(e.percent,10);r===n.MODE.QUICK_SETUP?o.firmwareQsView.qsFwUpgradeBar.setValue(e):s.main.setProBarValue(e),100===e&&(clearInterval(n.queryOnlineInterval),n.queryOnlineInterval=null,s.main.hideProBar(),r===n.MODE.QUICK_SETUP?(n.setQsState("upgradeSucceed"),s.quickSetup.submitQsWirelssData({success:function(){o.firmwareQsView.qsFwUpgradeBar.setText(u.su.CHAR.FIRMWARE.REBOOTING),o.firmwareQsView.qsFwUpgradeBar.animate({percentageStart:0,percentageEnd:100,duration:n.rebootTime,callback:function(){localStorage&&localStorage.setItem("token",""),s.quickSetup.goTo("qsSummary")}})}})):n.startReboot(n.rebootTime,!0))},fail:function(e){e=e.errorcode;15===++t&&(t=0,clearInterval(n.queryOnlineInterval),n.queryOnlineInterval=null,s.main.hideProBar(),c===n.MODE.QUICK_SETUP?(n.setUpgradedValue(!1),n.qsErrorHandler()):("err_reboot"===e?s.main.setUpgradeRetryContent(u.su.CHAR.ERROR["00000005_UPGRADE"]):s.main.setUpgradeRetryContent(u.su.CHAR.ERROR["10000192_UPGRADE"]),s.main.showUpgradeRetry()))}})},1e3)},detectLocalUpgradeStatus:function(){function e(e){l.device.getConfig().supportUpgradeQuery||n.queryLocalInterval&&(clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,n.resetProBar(),n.showUpgradeFailedMsg(e.errorcode))}l.ajax.request({proxy:"checkUpgradeStatusProxy",success:function(e){e=parseInt(e.percent,10);l.device.getConfig().supportUpgradeQuery&&(clearTimeout(n.queryLocalIntervalMax),o.firmwareView.proBar.setValue(e)),100===e&&(clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,n.resetProBar(),n.startReboot(n.rebootTime,!0))},fail:e,error:e})},startReboot:function(e,r){s.main.startReboot(e,function(){localStorage&&localStorage.setItem("token",""),n.getMode()==n.MODE.NETWORK_MAP&&localStorage.setItem("upgradeSuccess","1"),"wired"==n.wireType?window.location.href="/":o.firmwareView.reconnectMsg.show()},r?u.su.CHAR.FIRMWARE.UPGRADE_PROCESS_TIP:"")},checkFileName:function(e,r){return l.vtype.validate(e,{vtype:"string_file",extension:r})},showCheckError:function(e){o.firmwareView.upgradeOption.hide(),o.firmwareView.checkUpgradesBtn.show(),o.firmwareView.checkUpgradesBtn.loading(!1),o.firmwareView.checkUpgradesBtn.setError(e)},showOnlineUpgradeError:function(e){o.firmwareView.onlineUpgradeBtn.setError(e)},showUpgradeError:function(){o.firmwareView.checkUpgradesBtn.loading(!1),o.firmwareView.upgradeErrorMsg.show()},showUpgradeFailedMsg:function(e){switch(e){case"err_form":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000001"]);break;case"err_check":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000002"]);break;case"err_sizex":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000003"]);break;case"err_flash":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000004"]);break;case"err_reboot":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000005"]);break;case"err_other":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["00000006"]);break;case"err_failed":o.firmwareView.upgradeFailMsg.setContent(u.su.CHAR.ERROR["10000192"])}o.firmwareView.upgradeFailMsg.show()},failureRetry:function(){var r=this;i.onlineUpgradeModel.getProxy().upgrade({success:function(e){r.getMode()!==r.MODE.QUICK_SETUP&&s.main.showProBar(u.su.CHAR.FIRMWARE.DOWNLOADING,u.su.CHAR.FIRMWARE.UPGRADE_PROCESS_TIP),r.detectDownloadStatus()},fail:function(e){r.showOnlineUpgradeError(u.su.CHAR.ERROR["10000191"])},error:function(){r.showOnlineUpgradeError(u.su.CHAR.ERROR["10000191"])}})},removeInterval:function(){clearInterval(n.queryLocalInterval),n.queryLocalInterval=null,clearInterval(n.queryOnlineInterval),n.queryOnlineInterval=null,clearInterval(n.checkDownloadInterval),n.checkDownloadInterval=null,o.firmwareView.proBar.stop()},beforeDestroy:function(){n.removeInterval(),l.time.off("on_time_change",n.onTimeChange)},setUpgradedValue:function(e){l.ajax.request({proxy:"firmwareProxy",method:"write",data:{upgraded:e}})},checkRouter:function(e){var r,a,t;e&&(r=e.success,a=e.fail,t=e.error),l.ajax.request({proxy:"checkRouterProxy",success:function(e){r&&r(e)},fail:function(e){a&&a(e)},error:function(e){t&&t(e)}})},onTimeChange:function(e,r){var a=l.time.getHour24(),r=l.time.format(r,"yyyy-MM-dd HH:mm:ss",a);o.firmwareView.currentTime.setValue(r)}}})}(jQuery);