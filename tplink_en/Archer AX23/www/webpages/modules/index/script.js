!function(c){c.su.moduleManager.define("index",{services:["moduleManager","device","ajax"],stores:["languageStore","searchStore"],deps:["navigatorController","main"],views:["index"],listeners:{"ev_on_launch":function(e,t,n,a,o,i,r){try{c.su.encryptor=c.encrypt.encryptManager.getEncryptor()}catch(e){location.href="./error.html"}c("#navigator").attr("tabindex","0"),c(".page-content").attr("tabindex","1");var s=r.device.getProductName(),s=(document.title=s,n.index.productName.setValue(s),i.main.getCloudInfo()),s=(s&&s.islogined?n.index.userButton.setText(s.username):n.index.userButton.setText(c.su.CHAR.INDEX.TPLINK_ID),r.device.getCurrentMode());i.navigatorController.pcMainMenu=n.index.pcMainMenu,i.navigatorController.pcSliderNavigator=n.index.pcSliderNavigator,i.navigatorController.pageContainer=n.index.pageContainer,i.navigatorController.loadingSimpleDom=n.index.pageLoadingSd,i.navigatorController.loadNavigatorData(s,function(e){e=i.navigatorController.indexShouldLoad||location.hash&&location.hash.substr(1)||i.navigatorController._getFirstChildrenPage(e[0].name);i.navigatorController.goTo(e),i.navigatorController.indexShouldLoad=null}),"ap"==s&&(n.index.userButton.hide(),c("#user-button").next(".func-bar-separator").hide()),i.main.showUpgradeHint?n.index.upgradeButton.show():n.index.upgradeButton.hide()}},init:function(o,n,e,t,i,a){c(window).off("ev_resize.menu").on("ev_resize.menu",function(e,t,n,a){"s"==a&&"s"!=t?i.navigatorController.pcSliderNavigatorReset():"s"!=a&&"s"==t&&o.setMobileMenuStatus("close")}),this.control({"#main-menu":{"ev_navigator_clicked":function(e,t){return"logout"==t?(n.index.logoutConfirmMsg.show(),void o.setMobileMenuStatus("close")):"tplinkId"==t?(i.navigatorController.goTo("tpLinkCloud"),void o.setMobileMenuStatus("close")):void("support"!=t?"feedback"!=t?(t=i.navigatorController.mainMenuClicked(t,"s"==c.su.widgetSize))&&t.children&&0<t.children.length&&"s"==c.su.widgetSize?o.setMobileMenuStatus("level2",t.text):o.setMobileMenuStatus("close"):window.open(c("#feedback-link").attr("href")):window.open(c("#support-link").attr("href")))}},"#navigator":{"ev_navigator_clicked":function(e,t){t=i.navigatorController.pcNavigatorClicked(t);t&&t.children&&0!=t.children.length||o.setMobileMenuStatus("close")},"ev_navigator_loaded":function(e,t,n){n||(0===t.length?c(".page").addClass("no-navigator"):c(".page").removeClass("no-navigator"))},"ev_navigator_opened":function(e){}},".index-common-save-btn":{"ev_button_click":function(e){var t=this,n=c.su.getDefaultEvent(this,function(){t.submitDirtyData(function(){c(e.target).trigger("ev_auto_saved")})});c(e.target).trigger("ev_will_auto_save",[n.ev,t._toSaveArr]),n.exe()}},"#back-to-top":{"ev_button_click":function(){c(".page-content").animate({scrollTop:"0px"},200)}},"#menu-button":{"click":function(){var e=o.menuBtn().status();"close"==e||e===undefined||"level2"==e?o.setMobileMenuStatus("level1"):o.setMobileMenuStatus("close")}},"#search-button":{"ev_button_click":function(){i.navigatorController.goTo("search")}},"#user-button":{"ev_button_click":function(){i.navigatorController.goTo("tpLinkCloud")}},"#logout-button":{"ev_button_click":function(){n.index.logoutConfirmMsg.show()}},"#upgrade-button":{"ev_button_click":function(){i.navigatorController.goTo("firmware")}},".logout-confirm-msg":{"ev_msg_ok":function(){o.logout()}}}),this.listen()}},function(r,s,e,t,u,n){var a=function(e,t){return c.inArray(e,t)};return{"LOGOUT_URL":c.su.url("/admin/system?form=logout"),"logout":function(){n.ajax.request({url:r.LOGOUT_URL,success:function(){u.main.loadLoginPage()},fail:function(){u.main.loadLoginPage()},error:function(){u.main.loadLoginPage()}})},"showError":function(e){},"mobileTopBar":s.index.mobileTopBar,"menuBtn":function(){return s.index.mobileTopBar.leftBtn()},"funcBtn":function(){return s.index.mobileTopBar.rightBtn()},"setMobileMenuStatus":function(e,t){var n=r.mobileTopBar;if(0!=n.viewObjs.length){var a=r.menuBtn(),o=r.funcBtn(),i=a.status();switch(e){case"level1":n.setCenterText(""),n.addClass("menu-open"),a.status("level1"),o.addClass("s-hide"),u.navigatorController.pcSliderNavigatorReset(),s.index.pcSliderNavigator.addClass("s-hide"),s.index.pcMainMenu.removeClass("s-hide"),"close"!=i&&i!=undefined||(s.index.pcMainMenu.addClass("menu-open"),setTimeout(function(){s.index.pcMainMenu.removeClass("menu-open")},300));break;case"level2":n.setCenterText(t),n.addClass("menu-open"),a.status("level2"),o.addClass("s-hide"),s.index.pcMainMenu.addClass("s-hide"),s.index.pcSliderNavigator.removeClass("s-hide");break;default:"level1"==i?(s.index.pcMainMenu.addClass("menu-close"),setTimeout(function(){s.index.pcMainMenu.removeClass("menu-close"),s.index.pcMainMenu.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide")},300)):"level2"==i?(s.index.pcSliderNavigator.addClass("menu-close"),setTimeout(function(){s.index.pcSliderNavigator.removeClass("menu-close"),s.index.pcSliderNavigator.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide")},300)):(s.index.pcSliderNavigator.addClass("s-hide"),s.index.pcSliderNavigator.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide"))}}},"_toSaveArr":[],"_dataCheckDirtyTimeout":{},"_dataAutoSaveHock":function(e){var t=a(this,r._toSaveArr);this.isDirty()?t<0&&r._toSaveArr.push(this):0<=t&&r._toSaveArr.splice(t,1),r.updateSaveBtnDisplayStatus()},"_toSaveLoadingArr":[],"_dataSaveLoadingHook":function(e){var t=a(this,r._toSaveLoadingArr),n=0<=a(this,r._toSaveArr);("ev_model_before_submit"===e.type||"ev_store_before_sync"===e.type)&&n?t<0&&r._toSaveLoadingArr.push(this):0<=t&&r._toSaveLoadingArr.splice(t,1),r.updateSaveBtnLoadingStatus()},"submitDirtyData":function(a){for(var o=this._toSaveArr.length,e=0;e<o;e++)if(this._toSaveArr[e].validate&&!this._toSaveArr[e].validate())return!1;c.each(this._toSaveArr,function(e,t){var n=c.su.getDefaultEvent(t,function(){t.submit?t.submit({success:function(){0==--o&&a&&a()}}):t.sync({success:function(){0==--o&&a&&a()}})});t.trigger("ev_will_auto_save",[n.ev]),n.exe()})},"registerAutoSaveData":function(e){e.on("ev_data_change",r._dataAutoSaveHock),e.on("ev_data_record",r._dataAutoSaveHock),e.on("ev_loaded",r._dataAutoSaveHock),e.on("ev_model_submit",r._dataAutoSaveHock),e.on("ev_store_sync_success",r._dataAutoSaveHock)},"unRegisterAutoSaveData":function(e){e.off("ev_data_change",r._dataAutoSaveHock),e.off("ev_data_record",r._dataAutoSaveHock),e.off("ev_loaded",r._dataAutoSaveHock),e.off("ev_model_submit",r._dataAutoSaveHock),e.off("ev_store_sync_success",r._dataAutoSaveHock);e=a(e,r._toSaveArr);0<=e&&r._toSaveArr.splice(e,1),r.updateSaveBtnDisplayStatus()},"updateSaveBtnDisplayStatus":c.su.debounce(function(){0==r._toSaveArr.length&&c.isEmptyObject(r._saveBtnManualShowHideMap)?(r.hideSaveBtn(),r.hideLoadingSaveBtn()):r.showSaveBtn()},0),registerSaveLoading:function(e){e.on("ev_model_before_submit",r._dataSaveLoadingHook),e.on("ev_model_submit_complete",r._dataSaveLoadingHook),e.on("ev_store_before_sync",r._dataSaveLoadingHook),e.on("ev_store_sync_complete",r._dataSaveLoadingHook)},unRegisterSaveLoading:function(e){e.off("ev_model_before_submit",r._dataSaveLoadingHook),e.off("ev_model_submit_complete",r._dataSaveLoadingHook),e.off("ev_store_before_sync",r._dataSaveLoadingHook),e.off("ev_store_sync_complete",r._dataSaveLoadingHook);e=a(e,r._toSaveLoadingArr);0<=e&&r._toSaveLoadingArr.splice(e,1),r.updateSaveBtnLoadingStatus()},updateSaveBtnLoadingStatus:c.su.debounce(function(){0===r._toSaveLoadingArr.length?r.hideLoadingSaveBtn():r.showLoadingSaveBtn()},0),hideSaveBtn:function(){c(".index-common-save-btn").addClass("hidden")},showSaveBtn:function(){c(".index-common-save-btn").removeClass("hidden")},disableSaveBtn:function(){s.index.saveButton.disable()},enableSaveBtn:function(){s.index.saveButton.enable()},showLoadingSaveBtn:function(){s.index.saveButton.loading(!0)},hideLoadingSaveBtn:function(){s.index.saveButton.loading(!1)},_saveBtnManualShowHideMap:{},alwaysShowSaveBtn:function(e){r._saveBtnManualShowHideMap[e]=!0,s.index.saveButton.show()},cancelAlwaysShowSaveBtn:function(e){delete r._saveBtnManualShowHideMap[e],r.updateSaveBtnDisplayStatus()},hideSupportTips:function(){s.index.supportTips.hideTips()},showLoading:function(){u.main.showMask(),c("#page-loading-sd").show()},hideLoading:function(){u.main.hideMask(),c("#page-loading-sd").hide()},changeTPLinkID:function(e){s.index.userButton.setText(e)},reloadMenu:function(){u.navigatorController.reloadRouterMenu()}}})}(jQuery),$.su.storeManager.define("searchStore",{type:"store",fields:[{name:"name"},{name:"text"}],data:[]}),function(h){h.su.moduleManager.define("navigatorController",{services:["moduleLoader","moduleManager","ajax","device"],stores:[],views:[],deps:["main"],listeners:{},init:function(t,e,n,a,o,i){h(window).off("hashchange").on("hashchange",function(){var e=location.hash&&location.hash.substr(1);t.currentPage!=e&&t.goTo(e)})}},function(l,e,s,u,o,g){var i,r,a,t=g.device.getConfig().country,n=["ru","kr","de"];return{navigatorUrl:{router:-1<n.indexOf(t)?"./config/navigator."+t+".json":"./config/navigator.json?t=29dee038",ap:-1<n.indexOf(t)?"./config/navigator.ap."+t+".json":"./config/navigator.ap.json?t=29dee038"},currentMode:"router",pcMainMenu:null,pcSliderNavigator:null,pageContainer:null,loadingSimpleDom:null,currentPage:null,indexShouldLoad:null,navigatorData:null,moduleNotInMenu:["search","quickSetup","quickSetupAp","index"],notDefaultPage:["quickSetupAp","quickSetup"],convert:(a=function(e){for(var t=0;t<e.length;t++){var n=e[t].text,n=h.su.CHAR.MENU_ITEMS_NAME[n];n!==undefined?e[t].text=n:h.su.debug.warn("'"+e[t].name+"' has no menu name text defined in $.su.CHAR"),e[t].children&&a(e[t].children)}},function(e){a(e)}),filter:function(e){var a,o,t=g.device.getCurrentDial();!("ocn"===t||"v6plus"===t||"dslite"===t)||(a=g.device.getConfig().dsliteV6plusHiddenModules)&&h.isArray(a)&&0<a.length&&(o=function(e){for(var t=e.length;t--;){var n=e[t];0<=a.indexOf(n.name)?e.splice(t,1):n.children&&0<n.children.length&&o(n.children)}})(e)},_hashItems:function(){var e=i;"array"===h.type(e)&&function u(e,t,n){for(var a=e.length,o=0;o<a;o++){var i=e[o],r=i["name"],s=(i.module=i.module||i.name,t.slice(0));s.push(r),n[r]={path:s,self:i},i["children"]&&u(i["children"],s,n)}}(e,[],r={})},reloadRouterMenu:function(){var e;l.navigatorData&&(e=JSON.parse(l.navigatorData),l.filter(e),l.convert(e),l.loadItems(e),e=l.currentPage,l.currentPage=null,l._syncNavigatorView(e),l.currentPage=e)},loadNavigatorData:function(t,n){h.get(this.navigatorUrl[t],null,function(e){"router"===(l.currentMode=t)&&(l.navigatorData=JSON.stringify(e),l.filter(e)),l.convert(e),l.loadItems(e),n&&n(e)},"json")},loadItems:function(e){i=e,this._hashItems(),this.pcMainMenu&&this.pcMainMenu.loadItems(this._calcMainNavigatorItems()),this.pcSliderNavigator&&this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems())},getItems:function(){return i},getItemsInfo:function(){return r},getV6DsliteHiddenName:function(){var e=g.device.getConfig().dsliteV6plusHiddenModules;if(e&&h.isArray(e)&&0<e.length){l.navigatorData?t=JSON.parse(l.navigatorData):h.ajax({url:this.navigatorUrl[this.currentMode],type:"get",dataType:"json","async":!1,success:function(e){t=e,l.navigatorData=JSON.stringify(t)}});var t,a=[],o=e.join(",");!function c(e){for(var t=e.length;t--;){n=e[t],0<=o.indexOf(n.name)&&a.push(n.text);var n=n.children;n&&h.isArray(n)&&0<n.length&&c(n)}}(t);for(var n,i,r={},s=[],u=a.length,d=h.su.CHAR.MENU_ITEMS_NAME;u--;)r[n=a[u]]||(r[n]=d[n]);for(i in r)s.push(r[i]);return s}return[]},pcSliderNavigatorReset:function(){var e;this.currentPage&&r[this.currentPage]&&(e=r[this.currentPage].path[0])&&(this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[]),this._syncNavigatorView(this.currentPage))},mainMenuClicked:function(e,t){return g.moduleManager.hasModule(e)?this.goTo(e):t?this.currentPage&&r[this.currentPage]&&r[this.currentPage].path[0]==e?(this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[],t),this._syncNavigatorView(this.currentPage)):this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[],t):this.goTo(this._getDefaultPage(e)),r[e]&&r[e].self},pcNavigatorClicked:function(e){var t=r[e]["self"]["module"];return g.moduleManager.hasModule(t)&&this.goTo(e),r[e].self},mobileNavigatorClicked:function(e){var t=r[e]["self"]["module"];g.moduleManager.hasModule(t)&&(this.goTo(e),this.mobileNavigator.hide())},_calcMainNavigatorItems:function(){var e,t=g.device.getCurrentMode(),n=[{name:"search",text:h.su.CHAR.COMMON.SEARCH,cls:"search"},{name:"logout",text:h.su.CHAR.INDEX.LOGOUT,cls:"logout"},{name:"feedback",text:h.su.CHAR.INDEX.FEEDBACK,cls:"feedback"},{name:"support",text:h.su.CHAR.INDEX.SUPPORT,cls:"support"}];"ap"!=t&&(t="",t=(e=o.main.getCloudInfo())&&e.islogined?e.username:h.su.CHAR.INDEX.TPLINK_ID,n.splice(1,0,{name:"tplinkId",text:t,cls:"tplinkId"}));for(var a=0;a<n.length;a++)i.push(n[a]);return i},_calcSliderNavigatorItems:function(e){return e?r[e]["self"]["children"]:[]},_calcMobileNavigatorItems:function(){var e=i.slice(0);return e.push({name:"search",text:h.su.CHAR.COMMON.SEARCH}),e},_getMainMenuDefaultPage:function(e){return"router"==l.currentMode?"networkStatus":"networkMap"},_getDefaultPage:function(e){if(e){for(var t=l.getItemsInfo(),n=0;n<l.moduleNotInMenu.length;n++)if(l.moduleNotInMenu[n]==e)return e;if(o=t[e]){for(var a=o.self.module,o=o.self;!g.moduleManager.hasModule(a)&&o.children&&0<o.children.length;)for(n=0;n<o.children.length;n++)if(h.inArray(o.children[n].name,l.notDefaultPage)<0){o=o.children[n];break}return o.name}return this._getMainMenuDefaultPage(e)}return this._getMainMenuDefaultPage(e)},_getFirstChildrenPage:function(e){return r[e]&&r[e].self?r[e].self.children?this._getFirstChildrenPage(r[e].self.children[0].name):e:this._getMainMenuDefaultPage(e)},goTo:function(e){var t=this;""!=e&&("quickSetup"===(e=t._getDefaultPage(e))||"login"===e||"quickSetupAp"===e?o.main.loadBasicModule(e,function(){t.currentPage=e,location.hash=e}):"index"===e?o.main.loadBasicModule(e,function(){t.currentPage=e,location.hash=""}):g.moduleManager.get("index")?(g.moduleManager.get("index").showLoading(),this._syncNavigatorView(e),this.loadPage(e,function(){g.moduleManager.get("index").hideLoading()})):(t.indexShouldLoad=e,o.main.loadBasicModule("index",function(){})))},_syncNavigatorView:function(e,t){e=r[e];if(!e)return this.pcMainMenu.unSelectAll(),void this.pcSliderNavigator.loadItems([]);var n,a=e.path,e=a.length;switch(this.currentPage&&r[this.currentPage]&&r[this.currentPage].path[0]==a[0]&&"quickSetup"!=this.currentPage&&"quickSetupAp"!=this.currentPage||((n=this._calcSliderNavigatorItems(a[0]))&&0<n.length?this.pcSliderNavigator&&this.pcSliderNavigator.loadItems(n):this.pcSliderNavigator&&this.pcSliderNavigator.loadItems([])),e){case 1:this.pcMainMenu.select(a[0]);break;case 2:this.pcMainMenu.select(a[0]),this.pcSliderNavigator.select(a[1]);break;case 3:this.pcMainMenu.select(a[0]),this.pcSliderNavigator.open(a[1]),this.pcSliderNavigator.select(a[2])}},loadPage:function(e,t){var n=this,a=r[e],a=a?a.self.module:e;this.currentPage=e,location.hash=e,g.moduleLoader.load({module:"index"},{module:a},this.pageContainer,function(){n.pageContainer.removeClass(function(e,t){t=t.match(/\bmodule-\w*\b/g);if(t)return t[0]}).addClass("module-"+e),h.isFunction(t)&&t()})},getCurrentPage:function(){return this.currentPage}}})}(jQuery),function(s){s.su.moduleManager.define("search",{services:["moduleLoader","moduleManager","ajax","device"],stores:["searchResult"],deps:["navigatorController","index"],views:["searchView"],listeners:{"ev_on_launch":function(e,n,t,a,o,i,r){s(".page").addClass("no-bottom"),o.searchResult.hide(),o.searchResult.loadData([]),t.searchView.searchKeyword.focus(),s.each(r.device.getConfig(),function(e,t){!t&&n.configRules[e]&&n.rules.push(n.configRules[e])})},"ev_before_view_unload":function(){s(".page").removeClass("no-bottom")}},init:function(t,e,n,a,o,i){this.control({"#search-keyword":{"keyup":function(e){"Enter"!==e.key&&13!==e.keyCode||t.beginSearch()}},"#begin-search":{"ev_button_click":"beginSearch"}})}},function(c,e,t,n,a,o){return{menuMap:a.navigatorController.getItemsInfo(),rules:[],beginSearch:function(){n.searchResult.show();var i,r=e.searchView.searchKeyword.getValue();r?(i=[],s.each(c.menuMap,function(e,t){var n,a=t.self.text;if(c.testMatch(a,r)){for(var o=0;o<c.rules.length;o++)if(a.match(c.rules[o]))return;i.push(c.generatePageItem({name:e,menuPath:t.path}))}c.searchItemMap[e]&&(n=c.searchItemMap[e]["char"],0<(n=c.searchChar(n,r)).length&&(i=i.concat(c.generateSearchStringItems({name:e,menuPath:t.path},n))))}),n.searchResult.loadData(i),n.searchResult.setSearchWorld(r)):n.searchResult.loadData([])},searchChar:function(e,t){var n,a=[],o=!1;for(n in e)if(e.hasOwnProperty(n)){for(var i,r=0;r<c.rules.length;r++)if(n.match(c.rules[r])){o=!0;break}o?o=!1:"string"==typeof(i=e[n])?i.match(/^_/)||i.match(/_err$/i)||c.testMatch(i,t)&&a.push({string:i,introduction:c.getSearchStringInstroduction(e,n)}):"object"==typeof i&&(a=a.concat(c.searchChar(i,t)))}return a},testMatch:function(e,t){if("string"==typeof t)return 0<=e.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())},getPageInstroduction:function(e){return c.searchItemMap[e]&&c.searchItemMap[e].introduction||""},getSearchStringInstroduction:function(e,t){return e[t+"_INSTRODUCTION"]||""},generatePageItem:function(e){for(var t=[],n=e.name,a=e.menuPath,o=a.length,i=0;i<o;i++)t.push(c.menuMap[a[i]].self.text);return{name:n,path:t,introduction:c.getPageInstroduction(n)}},generateSearchStringItems:function(e,t){for(var n=[],a=[],o=e.name,i=e.menuPath,r=0,s=i.length;r<s;r++)a.push(c.menuMap[i[r]].self.text);for(s=t.length,r=0;r<s;r++){var u=a.slice(0);u.push(t[r].string),n.push({name:o,path:u,introduction:t[r].introduction})}return n},configRules:{isTriband:/5GHZ_|5G_|G5_|GHZ5_|51G|52G|5G1|5G2|DISAPPEAR_DFS_NOTE/},searchItemMap:{networkMap:{"char":s.su.CHAR.NETWORK_MAP},internetBasic:{introduction:s.su.CHAR.NETWORK_INTERNET.INTERNET_INSTRUCTION},wirelessBasic:{introduction:s.su.CHAR.WIRELESS_SETTINGS.WIRELESS_SETTINGS_INTRO},gameAccelerator:{"char":s.su.CHAR.GAME_ACCELERATOR,introduction:s.su.CHAR.GAME_ACCELERATOR.INSTRUCTION},alexa:{"char":s.su.CHAR.SMART_GAME_ASSISTANT_ALEXA,introduction:"default"},ifttt:{"char":s.su.CHAR.SMART_GAME_ASSISTANT_IFTTT,introduction:"default"},parentalControls:{"char":s.su.CHAR.PARENTAL_CONTROLS,introduction:s.su.CHAR.PARENTAL_CONTROLS.INSTRUCTION},antivirus:{"char":s.su.CHAR.ANTIVIRUS,introduction:"default"},parentalControlsGC:{"char":s.su.CHAR.PARENTAL_CONTROLS,introduction:s.su.CHAR.PARENTAL_CONTROLS.INSTRUCTION},antivirusGC:{"char":s.su.CHAR.ANTIVIRUS,introduction:"default"},qos:{"char":s.su.CHAR.QOS,introduction:s.su.CHAR.QOS.INSTRUCTION},networkStatus:{"char":s.su.CHAR.NETWORK_STATUS,introduction:s.su.CHAR.NETWORK_STATUS.STATUS_INSTRUCTION},internetAdv:{"char":s.su.CHAR.NETWORK_INTERNET,introduction:s.su.CHAR.NETWORK_INTERNET.INTERNET_INSTRUCTION},lanAdv:{"char":s.su.CHAR.NETWORK_LAN,introduction:s.su.CHAR.NETWORK_LAN.LAN_INSTRUCTION},iptvAdv:{"char":s.su.CHAR.NETWORK_IPTV,introduction:s.su.CHAR.NETWORK_IPTV.IPTV_INTRODUCTION},dhcpServerAdv:{"char":s.su.CHAR.NETWORK_DHCP,introduction:s.su.CHAR.NETWORK_DHCP.DHCP_SERVER_INSTRUCTION},ddnsAdv:{"char":s.su.CHAR.NETWORK_DDNS,introduction:s.su.CHAR.NETWORK_DDNS.DDNS_INTRODUCTION},routingAdv:{"char":s.su.CHAR.NETWORK_ROUTING,introduction:s.su.CHAR.NETWORK_ROUTING.STATIC_ROUTING_INSTRUCTION},tpLinkCloud:{"char":s.su.CHAR.TP_LINK_CLOUD,introduction:s.su.CHAR.TP_LINK_CLOUD.INSTRUCTION},wirelessSettingsAdv:{"char":s.su.CHAR.WIRELESS_SETTINGS,introduction:s.su.CHAR.WIRELESS_SETTINGS.WIRELESS_SETTINGS_INTRO},guestNetworkAdv:{"char":s.su.CHAR.GUEST_NETWORK,introduction:s.su.CHAR.GUEST_NETWORK.GUEST_NETWORK_INSTRUCTION},wirelessSchedule:{"char":s.su.CHAR.WIRELESS_SCHEDULE,introduction:s.su.CHAR.WIRELESS_SCHEDULE.INSTRUCTION},wps:{"char":s.su.CHAR.WPS,introduction:s.su.CHAR.WPS.INSTRUCTION},additionalSettings:{"char":s.su.CHAR.ADDITIONAL_SETTINGS,introduction:s.su.CHAR.ADDITIONAL_SETTINGS.INSTRUCTION},usbDevice:{"char":s.su.CHAR.USB_DEVICE},storageSharing:{"char":s.su.CHAR.STORAGE_SHARING,introduction:"default"},mediaServer:{"char":s.su.CHAR.MEDIA_SERVER,introduction:"default"},timeMachine:{"char":s.su.CHAR.TIME_MACHINE,introduction:s.su.CHAR.TIME_MACHINE.TIME_MACHINE_INTRO},printerServer:{"char":s.su.CHAR.PRINTER_SERVER,introduction:s.su.CHAR.PRINTER_SERVER.PRINTER_SHARING_INTRO},portForwarding:{"char":s.su.CHAR.PORT_FORWARDING,introduction:s.su.CHAR.PORT_FORWARDING.INSTRUCTION},portForwardingGC:{"char":s.su.CHAR.PORT_FORWARDING,introduction:s.su.CHAR.PORT_FORWARDING.INSTRUCTION},portTriggering:{"char":s.su.CHAR.PORT_TRIGGERING,introduction:s.su.CHAR.PORT_TRIGGERING.INSTRUCTION},upnp:{"char":s.su.CHAR.UPNP,introduction:s.su.CHAR.UPNP.INSTRUCTION1},dmz:{"char":s.su.CHAR.DMZ,introduction:s.su.CHAR.DMZ.INSTRUCTION},firewall:{"char":s.su.CHAR.FIREWALL,introduction:s.su.CHAR.FIREWALL.FIREWALL_INTRO},accessControl:{"char":s.su.CHAR.ACCESS_CONTROL,introduction:s.su.CHAR.ACCESS_CONTROL.ACCESS_CONTROL_INTRODUCTION},serviceFiltering:{"char":s.su.CHAR.SERVICE_FILTERING,introduction:s.su.CHAR.SERVICE_FILTERING.SERVICE_FILTERING_INSTRUCTION},IPMACBinding:{"char":s.su.CHAR.IP_MAC_BINDING,introduction:s.su.CHAR.IP_MAC_BINDING.IPMAC_INSTRUCTION},alg:{"char":s.su.CHAR.ALG,introduction:s.su.CHAR.ALG.ALG_INSTRUCTION},ipv6firewall:{"char":s.su.CHAR.IPV6FIREWALL,introduction:s.su.CHAR.IPV6FIREWALL.I6FWINTRO},openVpn:{"char":s.su.CHAR.VPN_SERVER_OPENVPN,introduction:s.su.CHAR.VPN_SERVER_OPENVPN.OPENVPN_INTRO},openVpnGC:{"char":s.su.CHAR.VPN_SERVER_OPENVPN,introduction:s.su.CHAR.VPN_SERVER_OPENVPN.OPENVPN_INTRO},pptp:{"char":s.su.CHAR.VPN_SERVER_PPTP,introduction:s.su.CHAR.VPN_SERVER_PPTP.PPTP_INFO},pptpGC:{"char":s.su.CHAR.VPN_SERVER_PPTP,introduction:s.su.CHAR.VPN_SERVER_PPTP.PPTP_INFO},l2tp:{"char":s.su.CHAR.VPN_SERVER_L2TP,introduction:"default"},ipsec:{"char":s.su.CHAR.VPN_SERVER_IPSEC,introduction:"default"},connections:{"char":s.su.CHAR.VPN_SERVER_CONNECTIONS,introduction:s.su.CHAR.VPN_SERVER_CONNECTIONS.VPN_CONNECTIONS_CLIENT_INFO},connectionsGC:{"char":s.su.CHAR.VPN_SERVER_CONNECTIONS,introduction:s.su.CHAR.VPN_SERVER_CONNECTIONS.VPN_CONNECTIONS_CLIENT_INFO},vpnClient:{"char":s.su.CHAR.VPN_CLIENT,introduction:"default"},ipv6:{"char":s.su.CHAR.IPV6,introduction:s.su.CHAR.IPV6.INSTRUCTION},firmware:{"char":s.su.CHAR.FIRMWARE,introduction:s.su.CHAR.FIRMWARE.UPGRADE_TIP},backupRestore:{"char":s.su.CHAR.BACKUP_RESTORE,introduction:s.su.CHAR.BACKUP_RESTORE.BACKUP_INSTRUCTION+s.su.CHAR.BACKUP_RESTORE.RESTORE_INSTRUCTION},administration:{"char":s.su.CHAR.ADMINISTRATION,introduction:s.su.CHAR.ADMINISTRATION.CHANGE_PASSWORD_INSTRUCTION+s.su.CHAR.ADMINISTRATION.PASSWORD_RECOVERY_INSTRUCTION+s.su.CHAR.ADMINISTRATION.LOCAL_MANAGEMENT_INSTRUCTION+s.su.CHAR.ADMINISTRATION.REMOTE_MANAGEMENT},sysLog:{"char":s.su.CHAR.SYSTEM_LOG,introduction:s.su.CHAR.SYSTEM_LOG.SYSTEM_LOG_INSTRUCTION},diagnostics:{"char":s.su.CHAR.DIAGNOSTICS,introduction:s.su.CHAR.DIAGNOSTICS.DIAGNOSTICS_INSTRUCTION},timeSettings:{"char":s.su.CHAR.TIMESETTING,introduction:s.su.CHAR.TIMESETTING.LANGUAGE_TIP+" "+s.su.CHAR.TIMESETTING.SYSTEM_TIME_TIP},reboot:{"char":s.su.CHAR.REBOOT,introduction:s.su.CHAR.REBOOT.REBOOT_TIP},operationMode:{"char":s.su.CHAR.OPERATION_MODE,introduction:"default"},led:{"char":s.su.CHAR.LED,introduction:s.su.CHAR.LED.LED_CONTROL_TIP},wakeLan:{"char":s.su.CHAR.WOL,introduction:s.su.CHAR.OPERATION_MODE.OPERATION_MODE_INTRODUCTION}}}})}(jQuery),$.su.storeManager.define("searchResult",{type:"store",fields:[{name:"name"},{name:"path"},{name:"introduction"}],data:[]});