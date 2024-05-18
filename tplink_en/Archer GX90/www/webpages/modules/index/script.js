!function(d){d.su.moduleManager.define("index",{services:["moduleManager","device","ajax"],stores:["languageStore","searchStore"],deps:["navigatorController","main"],views:["index"],listeners:{"ev_on_launch":function(e,t,n,a,o,i,r){try{d.su.encryptor=d.encrypt.encryptManager.getEncryptor()}catch(e){location.href="./error.html"}d("#navigator").attr("tabindex","0"),d(".page-content").attr("tabindex","1");var s=r.device.getProductName();document.title=s,n.index.productName.setValue(s);var u=i.main.getCloudInfo();u&&u.islogined?n.index.userButton.setText(u.username):n.index.userButton.setText(d.su.CHAR.INDEX.TPLINK_ID);var c=r.device.getCurrentMode();i.navigatorController.pcMainMenu=n.index.pcMainMenu,i.navigatorController.pcSliderNavigator=n.index.pcSliderNavigator,i.navigatorController.pageContainer=n.index.pageContainer,i.navigatorController.loadingSimpleDom=n.index.pageLoadingSd,i.navigatorController.loadNavigatorData(c,function(e){var t=i.navigatorController.indexShouldLoad||location.hash&&location.hash.substr(1)||i.navigatorController._getFirstChildrenPage(e[0].name);i.navigatorController.goTo(t),i.navigatorController.indexShouldLoad=null}),"ap"==c&&(n.index.userButton.hide(),d("#user-button").next(".func-bar-separator").hide()),i.main.showUpgradeHint?n.index.upgradeButton.show():n.index.upgradeButton.hide()}},init:function(o,a,e,t,i,n){d(window).off("ev_resize.menu").on("ev_resize.menu",function(e,t,n,a){"s"==a&&"s"!=t?i.navigatorController.pcSliderNavigatorReset():"s"!=a&&"s"==t&&o.setMobileMenuStatus("close")}),this.control({"#main-menu":{"ev_navigator_clicked":function(e,t){if("logout"==t)return a.index.logoutConfirmMsg.show(),void o.setMobileMenuStatus("close");if("tplinkId"==t)return i.navigatorController.goTo("tpLinkCloud"),void o.setMobileMenuStatus("close");if("support"!=t)if("feedback"!=t){var n=i.navigatorController.mainMenuClicked(t,"s"==d.su.widgetSize);n&&n.children&&0<n.children.length&&"s"==d.su.widgetSize?o.setMobileMenuStatus("level2",n.text):o.setMobileMenuStatus("close")}else window.open(d("#feedback-link").attr("href"));else window.open(d("#support-link").attr("href"))}},"#navigator":{"ev_navigator_clicked":function(e,t){var n=i.navigatorController.pcNavigatorClicked(t);n&&n.children&&0!=n.children.length||o.setMobileMenuStatus("close")},"ev_navigator_loaded":function(e,t,n){n||(0===t.length?d(".page").addClass("no-navigator"):d(".page").removeClass("no-navigator"))},"ev_navigator_opened":function(e){}},".index-common-save-btn":{"ev_button_click":function(e){var t=this,n=d.su.getDefaultEvent(this,function(){t.submitDirtyData(function(){d(e.target).trigger("ev_auto_saved")})});d(e.target).trigger("ev_will_auto_save",[n.ev,t._toSaveArr]),n.exe()}},"#back-to-top":{"ev_button_click":function(){d(".page-content").animate({scrollTop:"0px"},200)}},"#menu-button":{"click":function(){var e=o.menuBtn().status();"close"==e||e===undefined?o.setMobileMenuStatus("level1"):"level2"==e?o.setMobileMenuStatus("level1"):o.setMobileMenuStatus("close")}},"#search-button":{"ev_button_click":function(){i.navigatorController.goTo("search")}},"#user-button":{"ev_button_click":function(){i.navigatorController.goTo("tpLinkCloud")}},"#logout-button":{"ev_button_click":function(){a.index.logoutConfirmMsg.show()}},"#upgrade-button":{"ev_button_click":function(){i.navigatorController.goTo("firmware")}},".logout-confirm-msg":{"ev_msg_ok":function(){o.logout()}}}),this.listen()}},function(r,s,e,t,u,n){var a=function(e,t){return d.inArray(e,t)};return{"LOGOUT_URL":d.su.url("/admin/system?form=logout"),"logout":function(){n.ajax.request({url:r.LOGOUT_URL,success:function(){u.main.loadLoginPage()},fail:function(){u.main.loadLoginPage()},error:function(){u.main.loadLoginPage()}})},"showError":function(e){},"mobileTopBar":s.index.mobileTopBar,"menuBtn":function(){return s.index.mobileTopBar.leftBtn()},"funcBtn":function(){return s.index.mobileTopBar.rightBtn()},"setMobileMenuStatus":function(e,t){var n=r.mobileTopBar;if(0!=n.viewObjs.length){var a=r.menuBtn(),o=r.funcBtn(),i=a.status();switch(e){case"level1":n.setCenterText(""),n.addClass("menu-open"),a.status("level1"),o.addClass("s-hide"),u.navigatorController.pcSliderNavigatorReset(),s.index.pcSliderNavigator.addClass("s-hide"),s.index.pcMainMenu.removeClass("s-hide"),"close"!=i&&i!=undefined||(s.index.pcMainMenu.addClass("menu-open"),setTimeout(function(){s.index.pcMainMenu.removeClass("menu-open")},300));break;case"level2":n.setCenterText(t),n.addClass("menu-open"),a.status("level2"),o.addClass("s-hide"),s.index.pcMainMenu.addClass("s-hide"),s.index.pcSliderNavigator.removeClass("s-hide");break;case"close":default:"level1"==i?(s.index.pcMainMenu.addClass("menu-close"),setTimeout(function(){s.index.pcMainMenu.removeClass("menu-close"),s.index.pcMainMenu.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide")},300)):"level2"==i?(s.index.pcSliderNavigator.addClass("menu-close"),setTimeout(function(){s.index.pcSliderNavigator.removeClass("menu-close"),s.index.pcSliderNavigator.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide")},300)):(s.index.pcSliderNavigator.addClass("s-hide"),s.index.pcSliderNavigator.addClass("s-hide"),n.setCenterText(""),n.removeClass("menu-open"),a.status("close"),o.removeClass("s-hide"))}}},"_toSaveArr":[],"_dataCheckDirtyTimeout":{},"_dataAutoSaveHock":function(e){var t=a(this,r._toSaveArr);this.isDirty()?t<0&&r._toSaveArr.push(this):0<=t&&r._toSaveArr.splice(t,1),r.updateSaveBtnDisplayStatus()},"_toSaveLoadingArr":[],"_dataSaveLoadingHook":function(e){var t=a(this,r._toSaveLoadingArr),n=0<=a(this,r._toSaveArr);("ev_model_before_submit"===e.type||"ev_store_before_sync"===e.type)&&n?t<0&&r._toSaveLoadingArr.push(this):0<=t&&r._toSaveLoadingArr.splice(t,1),r.updateSaveBtnLoadingStatus()},"submitDirtyData":function(a){for(var o=this._toSaveArr.length,e=0;e<o;e++)if(this._toSaveArr[e].validate&&!this._toSaveArr[e].validate())return!1;d.each(this._toSaveArr,function(e,t){var n=d.su.getDefaultEvent(t,function(){t.submit?t.submit({success:function(){0==--o&&a&&a()}}):t.sync({success:function(){0==--o&&a&&a()}})});t.trigger("ev_will_auto_save",[n.ev]),n.exe()})},"registerAutoSaveData":function(e){e.on("ev_data_change",r._dataAutoSaveHock),e.on("ev_data_record",r._dataAutoSaveHock),e.on("ev_loaded",r._dataAutoSaveHock),e.on("ev_model_submit",r._dataAutoSaveHock),e.on("ev_store_sync_success",r._dataAutoSaveHock)},"unRegisterAutoSaveData":function(e){e.off("ev_data_change",r._dataAutoSaveHock),e.off("ev_data_record",r._dataAutoSaveHock),e.off("ev_loaded",r._dataAutoSaveHock),e.off("ev_model_submit",r._dataAutoSaveHock),e.off("ev_store_sync_success",r._dataAutoSaveHock);var t=a(e,r._toSaveArr);0<=t&&r._toSaveArr.splice(t,1),r.updateSaveBtnDisplayStatus()},"updateSaveBtnDisplayStatus":d.su.debounce(function(){0==r._toSaveArr.length&&d.isEmptyObject(r._saveBtnManualShowHideMap)?(r.hideSaveBtn(),r.hideLoadingSaveBtn()):r.showSaveBtn()},0),registerSaveLoading:function(e){e.on("ev_model_before_submit",r._dataSaveLoadingHook),e.on("ev_model_submit_complete",r._dataSaveLoadingHook),e.on("ev_store_before_sync",r._dataSaveLoadingHook),e.on("ev_store_sync_complete",r._dataSaveLoadingHook)},unRegisterSaveLoading:function(e){e.off("ev_model_before_submit",r._dataSaveLoadingHook),e.off("ev_model_submit_complete",r._dataSaveLoadingHook),e.off("ev_store_before_sync",r._dataSaveLoadingHook),e.off("ev_store_sync_complete",r._dataSaveLoadingHook);var t=a(e,r._toSaveLoadingArr);0<=t&&r._toSaveLoadingArr.splice(t,1),r.updateSaveBtnLoadingStatus()},updateSaveBtnLoadingStatus:d.su.debounce(function(){0===r._toSaveLoadingArr.length?r.hideLoadingSaveBtn():r.showLoadingSaveBtn()},0),hideSaveBtn:function(){d(".index-common-save-btn").addClass("hidden")},showSaveBtn:function(){d(".index-common-save-btn").removeClass("hidden")},disableSaveBtn:function(){s.index.saveButton.disable()},enableSaveBtn:function(){s.index.saveButton.enable()},showLoadingSaveBtn:function(){s.index.saveButton.loading(!0)},hideLoadingSaveBtn:function(){s.index.saveButton.loading(!1)},_saveBtnManualShowHideMap:{},alwaysShowSaveBtn:function(e){r._saveBtnManualShowHideMap[e]=!0,s.index.saveButton.show()},cancelAlwaysShowSaveBtn:function(e){delete r._saveBtnManualShowHideMap[e],r.updateSaveBtnDisplayStatus()},hideSupportTips:function(){s.index.supportTips.hideTips()},showLoading:function(){u.main.showMask(),d("#page-loading-sd").show()},hideLoading:function(){u.main.hideMask(),d("#page-loading-sd").hide()},changeTPLinkID:function(e){s.index.userButton.setText(e)},reloadMenu:function(){u.navigatorController.reloadRouterMenu()}}})}(jQuery),$.su.storeManager.define("searchStore",{type:"store",fields:[{name:"name"},{name:"text"}],data:[]}),function(g){g.su.moduleManager.define("navigatorController",{services:["moduleLoader","moduleManager","ajax","device"],stores:[],views:[],deps:["main"],listeners:{},init:function(t,e,n,a,o,i){g(window).off("hashchange").on("hashchange",function(){var e=location.hash&&location.hash.substr(1);t.currentPage!=e&&t.goTo(e)})}},function(l,e,t,n,i,h){var r,s,o;return{navigatorUrl:{router:"./config/navigator.json?t=6ee9015e",ap:"./config/navigator.ap.json?t=6ee9015e"},currentMode:"router",pcMainMenu:null,pcSliderNavigator:null,pageContainer:null,loadingSimpleDom:null,currentPage:null,indexShouldLoad:null,navigatorData:null,moduleNotInMenu:["search","quickSetup","quickSetupAp","index"],notDefaultPage:["quickSetupAp","quickSetup"],convert:(o=function(e){for(var t=0;t<e.length;t++){var n=e[t].text,a=g.su.CHAR.MENU_ITEMS_NAME[n];a!==undefined?e[t].text=a:g.su.debug.warn("'"+e[t].name+"' has no menu name text defined in $.su.CHAR"),e[t].children&&o(e[t].children)}},function(e){o(e)}),filter:function(e){var t=h.device.getCurrentDial();if("ocn"===t||"v6plus"===t||"dslite"===t){var a=h.device.getConfig().dsliteV6plusHiddenModules;if(a&&g.isArray(a)&&0<a.length){var o=function(e){for(var t=e.length;t--;){var n=e[t];0<=a.indexOf(n.name)?e.splice(t,1):n.children&&0<n.children.length&&o(n.children)}};o(e)}}},_hashItems:function(){var e=r;"array"===g.type(e)&&function u(e,t,n){for(var a=e.length,o=0;o<a;o++){var i=e[o],r=i["name"];i.module=i.module||i.name;var s=t.slice(0);s.push(r),n[r]={path:s,self:i},i["children"]&&u(i["children"],s,n)}}(e,[],s={})},reloadRouterMenu:function(){if(l.navigatorData){var e=JSON.parse(l.navigatorData);l.filter(e),l.convert(e),l.loadItems(e);var t=l.currentPage;l.currentPage=null,l._syncNavigatorView(t),l.currentPage=t}},loadNavigatorData:function(t,n){g.get(this.navigatorUrl[t],null,function(e){"router"===(l.currentMode=t)&&(l.navigatorData=JSON.stringify(e),l.filter(e)),l.convert(e),l.loadItems(e),n&&n(e)},"json")},loadItems:function(e){r=e,this._hashItems(),this.pcMainMenu&&this.pcMainMenu.loadItems(this._calcMainNavigatorItems()),this.pcSliderNavigator&&this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems())},getItems:function(){return r},getItemsInfo:function(){return s},getV6DsliteHiddenName:function(){var e=h.device.getConfig().dsliteV6plusHiddenModules;if(e&&g.isArray(e)&&0<e.length){var t;l.navigatorData?t=JSON.parse(l.navigatorData):g.ajax({url:this.navigatorUrl[this.currentMode],type:"get",dataType:"json",async:!1,success:function(e){t=e,l.navigatorData=JSON.stringify(t)}});var o=[],i=e.join(",");!function d(e){for(var t,n=e.length;n--;){t=e[n],0<=i.indexOf(t.name)&&o.push(t.text);var a=t.children;a&&g.isArray(a)&&0<a.length&&d(a)}}(t);for(var n,a={},r=[],s=o.length,u=g.su.CHAR.MENU_ITEMS_NAME;s--;)a[n=o[s]]||(a[n]=u[n]);for(var c in a)r.push(a[c]);return r}return[]},pcSliderNavigatorReset:function(){var e;this.currentPage&&s[this.currentPage]&&(e=s[this.currentPage].path[0])&&(this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[]),this._syncNavigatorView(this.currentPage))},mainMenuClicked:function(e,t){return h.moduleManager.hasModule(e)?this.goTo(e):t?this.currentPage&&s[this.currentPage]&&s[this.currentPage].path[0]==e?(this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[],t),this._syncNavigatorView(this.currentPage)):this.pcSliderNavigator.loadItems(this._calcSliderNavigatorItems(e)||[],t):this.goTo(this._getDefaultPage(e)),s[e]&&s[e].self},pcNavigatorClicked:function(e){var t=s[e]["self"]["module"];return h.moduleManager.hasModule(t)&&this.goTo(e),s[e].self},mobileNavigatorClicked:function(e){var t=s[e]["self"]["module"];h.moduleManager.hasModule(t)&&(this.goTo(e),this.mobileNavigator.hide())},_calcMainNavigatorItems:function(){var e=h.device.getCurrentMode(),t=[{name:"search",text:g.su.CHAR.COMMON.SEARCH,cls:"search"},{name:"logout",text:g.su.CHAR.INDEX.LOGOUT,cls:"logout"},{name:"feedback",text:g.su.CHAR.INDEX.FEEDBACK,cls:"feedback"},{name:"support",text:g.su.CHAR.INDEX.SUPPORT,cls:"support"}];if("ap"!=e){var n="",a=i.main.getCloudInfo();n=a&&a.islogined?a.username:g.su.CHAR.INDEX.TPLINK_ID,t.splice(1,0,{name:"tplinkId",text:n,cls:"tplinkId"})}for(var o=0;o<t.length;o++)r.push(t[o]);return r},_calcSliderNavigatorItems:function(e){return e?s[e]["self"]["children"]:[]},_calcMobileNavigatorItems:function(){var e=r.slice(0);return e.push({name:"search",text:g.su.CHAR.COMMON.SEARCH}),e},_getMainMenuDefaultPage:function(e){return"router"==l.currentMode?"networkStatus":"networkMap"},_getDefaultPage:function(e){if(e){for(var t=l.getItemsInfo(),n=0;n<l.moduleNotInMenu.length;n++)if(l.moduleNotInMenu[n]==e)return e;var a=t[e];if(a){var o=a.self.module;for(a=a.self;!h.moduleManager.hasModule(o)&&a.children&&0<a.children.length;)for(n=0;n<a.children.length;n++)if(g.inArray(a.children[n].name,l.notDefaultPage)<0){a=a.children[n];break}return a.name}return this._getMainMenuDefaultPage(e)}return this._getMainMenuDefaultPage(e)},_getFirstChildrenPage:function(e){return s[e]&&s[e].self?s[e].self.children?this._getFirstChildrenPage(s[e].self.children[0].name):e:this._getMainMenuDefaultPage(e)},goTo:function(e){var t=this;""!=e&&("quickSetup"===(e=t._getDefaultPage(e))||"login"===e||"quickSetupAp"===e?i.main.loadBasicModule(e,function(){t.currentPage=e,location.hash=e}):"index"===e?i.main.loadBasicModule(e,function(){t.currentPage=e,location.hash=""}):h.moduleManager.get("index")?(h.moduleManager.get("index").showLoading(),this._syncNavigatorView(e),this.loadPage(e,function(){h.moduleManager.get("index").hideLoading()})):(t.indexShouldLoad=e,i.main.loadBasicModule("index",function(){})))},_syncNavigatorView:function(e,t){var n=s[e];if(!n)return this.pcMainMenu.unSelectAll(),void this.pcSliderNavigator.loadItems([]);var a=n.path,o=a.length;if(!this.currentPage||!s[this.currentPage]||s[this.currentPage].path[0]!=a[0]||"quickSetup"==this.currentPage||"quickSetupAp"==this.currentPage){var i=this._calcSliderNavigatorItems(a[0]);i&&0<i.length?this.pcSliderNavigator&&this.pcSliderNavigator.loadItems(i):this.pcSliderNavigator&&this.pcSliderNavigator.loadItems([])}switch(o){case 1:this.pcMainMenu.select(a[0]);break;case 2:this.pcMainMenu.select(a[0]),this.pcSliderNavigator.select(a[1]);break;case 3:this.pcMainMenu.select(a[0]),this.pcSliderNavigator.open(a[1]),this.pcSliderNavigator.select(a[2])}},loadPage:function(e,t){var n,a=this,o=s[e];n=o?o.self.module:e,this.currentPage=e,location.hash=e,h.moduleLoader.load({module:"index"},{module:n},this.pageContainer,function(){a.pageContainer.removeClass(function(e,t){var n=t.match(/\bmodule-\w*\b/g);if(n)return n[0]}).addClass("module-"+e),g.isFunction(t)&&t()})},getCurrentPage:function(){return this.currentPage}}})}(jQuery),function(u){u.su.moduleManager.define("search",{services:["moduleLoader","moduleManager","ajax","device"],stores:["searchResult"],deps:["navigatorController","index"],views:["searchView"],listeners:{"ev_on_launch":function(e,n,t,a,o,i,r){u(".page").addClass("no-bottom"),o.searchResult.hide(),o.searchResult.loadData([]),t.searchView.searchKeyword.focus(),u.each(r.device.getConfig(),function(e,t){!t&&n.configRules[e]&&n.rules.push(n.configRules[e])})},"ev_before_view_unload":function(){u(".page").removeClass("no-bottom")}},init:function(t,e,n,a,o,i){this.control({"#search-keyword":{"keyup":function(e){"Enter"!==e.key&&13!==e.keyCode||t.beginSearch()}},"#begin-search":{"ev_button_click":"beginSearch"}})}},function(c,e,t,n,a,o){return{menuMap:a.navigatorController.getItemsInfo(),rules:[],beginSearch:function(){n.searchResult.show();var r=e.searchView.searchKeyword.getValue();if(r){var s=[];u.each(c.menuMap,function(e,t){var n=t.self.text;if(c.testMatch(n,r)){for(var a=0;a<c.rules.length;a++)if(n.match(c.rules[a]))return;s.push(c.generatePageItem({name:e,menuPath:t.path}))}if(c.searchItemMap[e]){var o=c.searchItemMap[e]["char"],i=c.searchChar(o,r);0<i.length&&(s=s.concat(c.generateSearchStringItems({name:e,menuPath:t.path},i)))}}),n.searchResult.loadData(s),n.searchResult.setSearchWorld(r)}else n.searchResult.loadData([])},searchChar:function(e,t){var n=[],a=!1;for(var o in e)if(e.hasOwnProperty(o)){for(var i=0;i<c.rules.length;i++)if(o.match(c.rules[i])){a=!0;break}if(a){a=!1;continue}var r=e[o];if("string"==typeof r){if(r.match(/^_/)||r.match(/_err$/i))continue;c.testMatch(r,t)&&n.push({string:r,introduction:c.getSearchStringInstroduction(e,o)})}else"object"==typeof r&&(n=n.concat(c.searchChar(r,t)))}return n},testMatch:function(e,t){if("string"==typeof t)return 0<=e.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())},getPageInstroduction:function(e){return c.searchItemMap[e]&&c.searchItemMap[e].introduction||""},getSearchStringInstroduction:function(e,t){return e[t+"_INSTRODUCTION"]||""},generatePageItem:function(e){for(var t=[],n=e.name,a=e.menuPath,o=a.length,i=0;i<o;i++)t.push(c.menuMap[a[i]].self.text);return{name:n,path:t,introduction:c.getPageInstroduction(n)}},generateSearchStringItems:function(e,t){for(var n=[],a=[],o=e.name,i=e.menuPath,r=0,s=i.length;r<s;r++)a.push(c.menuMap[i[r]].self.text);for(s=t.length,r=0;r<s;r++){var u=a.slice(0);u.push(t[r].string),n.push({name:o,path:u,introduction:t[r].introduction})}return n},configRules:{isTriband:/5GHZ_|5G_|G5_|GHZ5_|51G|52G|5G1|5G2|DISAPPEAR_DFS_NOTE/},searchItemMap:{networkMap:{"char":u.su.CHAR.NETWORK_MAP},internetBasic:{introduction:u.su.CHAR.NETWORK_INTERNET.INTERNET_INSTRUCTION},wirelessBasic:{introduction:u.su.CHAR.WIRELESS_SETTINGS.WIRELESS_SETTINGS_INTRO},gameAccelerator:{"char":u.su.CHAR.GAME_ACCELERATOR,introduction:u.su.CHAR.GAME_ACCELERATOR.INSTRUCTION},alexa:{"char":u.su.CHAR.SMART_GAME_ASSISTANT_ALEXA,introduction:"default"},ifttt:{"char":u.su.CHAR.SMART_GAME_ASSISTANT_IFTTT,introduction:"default"},parentalControls:{"char":u.su.CHAR.PARENTAL_CONTROLS,introduction:u.su.CHAR.PARENTAL_CONTROLS.INSTRUCTION},antivirus:{"char":u.su.CHAR.ANTIVIRUS,introduction:"default"},parentalControlsGC:{"char":u.su.CHAR.PARENTAL_CONTROLS,introduction:u.su.CHAR.PARENTAL_CONTROLS.INSTRUCTION},antivirusGC:{"char":u.su.CHAR.ANTIVIRUS,introduction:"default"},qos:{"char":u.su.CHAR.QOS,introduction:u.su.CHAR.QOS.INSTRUCTION},networkStatus:{"char":u.su.CHAR.NETWORK_STATUS,introduction:u.su.CHAR.NETWORK_STATUS.STATUS_INSTRUCTION},internetAdv:{"char":u.su.CHAR.NETWORK_INTERNET,introduction:u.su.CHAR.NETWORK_INTERNET.INTERNET_INSTRUCTION},lanAdv:{"char":u.su.CHAR.NETWORK_LAN,introduction:u.su.CHAR.NETWORK_LAN.LAN_INSTRUCTION},iptvAdv:{"char":u.su.CHAR.NETWORK_IPTV,introduction:u.su.CHAR.NETWORK_IPTV.IPTV_INTRODUCTION},dhcpServerAdv:{"char":u.su.CHAR.NETWORK_DHCP,introduction:u.su.CHAR.NETWORK_DHCP.DHCP_SERVER_INSTRUCTION},ddnsAdv:{"char":u.su.CHAR.NETWORK_DDNS,introduction:u.su.CHAR.NETWORK_DDNS.DDNS_INTRODUCTION},routingAdv:{"char":u.su.CHAR.NETWORK_ROUTING,introduction:u.su.CHAR.NETWORK_ROUTING.STATIC_ROUTING_INSTRUCTION},tpLinkCloud:{"char":u.su.CHAR.TP_LINK_CLOUD,introduction:u.su.CHAR.TP_LINK_CLOUD.INSTRUCTION},wirelessSettingsAdv:{"char":u.su.CHAR.WIRELESS_SETTINGS,introduction:u.su.CHAR.WIRELESS_SETTINGS.WIRELESS_SETTINGS_INTRO},guestNetworkAdv:{"char":u.su.CHAR.GUEST_NETWORK,introduction:u.su.CHAR.GUEST_NETWORK.GUEST_NETWORK_INSTRUCTION},wirelessSchedule:{"char":u.su.CHAR.WIRELESS_SCHEDULE,introduction:u.su.CHAR.WIRELESS_SCHEDULE.INSTRUCTION},wps:{"char":u.su.CHAR.WPS,introduction:u.su.CHAR.WPS.INSTRUCTION},additionalSettings:{"char":u.su.CHAR.ADDITIONAL_SETTINGS,introduction:u.su.CHAR.ADDITIONAL_SETTINGS.INSTRUCTION},usbDevice:{"char":u.su.CHAR.USB_DEVICE},storageSharing:{"char":u.su.CHAR.STORAGE_SHARING,introduction:"default"},mediaServer:{"char":u.su.CHAR.MEDIA_SERVER,introduction:"default"},timeMachine:{"char":u.su.CHAR.TIME_MACHINE,introduction:u.su.CHAR.TIME_MACHINE.TIME_MACHINE_INTRO},printerServer:{"char":u.su.CHAR.PRINTER_SERVER,introduction:u.su.CHAR.PRINTER_SERVER.PRINTER_SHARING_INTRO},portForwarding:{"char":u.su.CHAR.PORT_FORWARDING,introduction:u.su.CHAR.PORT_FORWARDING.INSTRUCTION},portForwardingGC:{"char":u.su.CHAR.PORT_FORWARDING,introduction:u.su.CHAR.PORT_FORWARDING.INSTRUCTION},portTriggering:{"char":u.su.CHAR.PORT_TRIGGERING,introduction:u.su.CHAR.PORT_TRIGGERING.INSTRUCTION},upnp:{"char":u.su.CHAR.UPNP,introduction:u.su.CHAR.UPNP.INSTRUCTION1},dmz:{"char":u.su.CHAR.DMZ,introduction:u.su.CHAR.DMZ.INSTRUCTION},firewall:{"char":u.su.CHAR.FIREWALL,introduction:u.su.CHAR.FIREWALL.FIREWALL_INTRO},accessControl:{"char":u.su.CHAR.ACCESS_CONTROL,introduction:u.su.CHAR.ACCESS_CONTROL.ACCESS_CONTROL_INTRODUCTION},serviceFiltering:{"char":u.su.CHAR.SERVICE_FILTERING,introduction:u.su.CHAR.SERVICE_FILTERING.SERVICE_FILTERING_INSTRUCTION},IPMACBinding:{"char":u.su.CHAR.IP_MAC_BINDING,introduction:u.su.CHAR.IP_MAC_BINDING.IPMAC_INSTRUCTION},alg:{"char":u.su.CHAR.ALG,introduction:u.su.CHAR.ALG.ALG_INSTRUCTION},ipv6firewall:{"char":u.su.CHAR.IPV6FIREWALL,introduction:u.su.CHAR.IPV6FIREWALL.I6FWINTRO},openVpn:{"char":u.su.CHAR.VPN_SERVER_OPENVPN,introduction:u.su.CHAR.VPN_SERVER_OPENVPN.OPENVPN_INTRO},openVpnGC:{"char":u.su.CHAR.VPN_SERVER_OPENVPN,introduction:u.su.CHAR.VPN_SERVER_OPENVPN.OPENVPN_INTRO},pptp:{"char":u.su.CHAR.VPN_SERVER_PPTP,introduction:u.su.CHAR.VPN_SERVER_PPTP.PPTP_INFO},pptpGC:{"char":u.su.CHAR.VPN_SERVER_PPTP,introduction:u.su.CHAR.VPN_SERVER_PPTP.PPTP_INFO},l2tp:{"char":u.su.CHAR.VPN_SERVER_L2TP,introduction:"default"},ipsec:{"char":u.su.CHAR.VPN_SERVER_IPSEC,introduction:"default"},connections:{"char":u.su.CHAR.VPN_SERVER_CONNECTIONS,introduction:u.su.CHAR.VPN_SERVER_CONNECTIONS.VPN_CONNECTIONS_CLIENT_INFO},connectionsGC:{"char":u.su.CHAR.VPN_SERVER_CONNECTIONS,introduction:u.su.CHAR.VPN_SERVER_CONNECTIONS.VPN_CONNECTIONS_CLIENT_INFO},vpnClient:{"char":u.su.CHAR.VPN_CLIENT,introduction:"default"},ipv6:{"char":u.su.CHAR.IPV6,introduction:u.su.CHAR.IPV6.INSTRUCTION},firmware:{"char":u.su.CHAR.FIRMWARE,introduction:u.su.CHAR.FIRMWARE.UPGRADE_TIP},backupRestore:{"char":u.su.CHAR.BACKUP_RESTORE,introduction:u.su.CHAR.BACKUP_RESTORE.BACKUP_INSTRUCTION+u.su.CHAR.BACKUP_RESTORE.RESTORE_INSTRUCTION},administration:{"char":u.su.CHAR.ADMINISTRATION,introduction:u.su.CHAR.ADMINISTRATION.CHANGE_PASSWORD_INSTRUCTION+u.su.CHAR.ADMINISTRATION.PASSWORD_RECOVERY_INSTRUCTION+u.su.CHAR.ADMINISTRATION.LOCAL_MANAGEMENT_INSTRUCTION+u.su.CHAR.ADMINISTRATION.REMOTE_MANAGEMENT},sysLog:{"char":u.su.CHAR.SYSTEM_LOG,introduction:u.su.CHAR.SYSTEM_LOG.SYSTEM_LOG_INSTRUCTION},diagnostics:{"char":u.su.CHAR.DIAGNOSTICS,introduction:u.su.CHAR.DIAGNOSTICS.DIAGNOSTICS_INSTRUCTION},timeSettings:{"char":u.su.CHAR.TIMESETTING,introduction:u.su.CHAR.TIMESETTING.LANGUAGE_TIP+" "+u.su.CHAR.TIMESETTING.SYSTEM_TIME_TIP},reboot:{"char":u.su.CHAR.REBOOT,introduction:u.su.CHAR.REBOOT.REBOOT_TIP},operationMode:{"char":u.su.CHAR.OPERATION_MODE,introduction:"default"},led:{"char":u.su.CHAR.LED,introduction:u.su.CHAR.LED.LED_CONTROL_TIP},wakeLan:{"char":u.su.CHAR.WOL,introduction:u.su.CHAR.OPERATION_MODE.OPERATION_MODE_INTRODUCTION}}}})}(jQuery),$.su.storeManager.define("searchResult",{type:"store",fields:[{name:"name"},{name:"path"},{name:"introduction"}],data:[]});