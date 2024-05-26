"use strict";!function(){angular.module("app").controller("WanInfoAdvancedCtrl",["$scope","$state","translate","wanPageCommon","wanPage","navShared",function($scope,$state,translate,wanPageCommon,wanPage,navShared){function getBreakMsgRemove(conns){var alrt,alrtConnCount,alertConns=[];conns.filter(function(e){return e.reserve});var msg;if(alertConns.length){msg="".concat(translate("wan_delete_conn_err")," (").concat(alertConns.map(function(alrt){return alrt.conn}),").");for(var i in alertConns)alrt=alertConns[i],alrtConnCount=alrt.conn.split(",").length,msg+=alrtConnCount>1?"\n".concat(translate("connections")," (").concat(alrt.conn,") ").concat(alrt.msg,"."):"\n".concat(translate("connection")," (").concat(alrt.conn,") ").concat(alrt.msg,".")}var trconn;if($scope.customRules.DenyEditingTRConnection&&"admin"==localStorage.getItem("auth-dsysinit.Login")){var trconn=conns.find(function(conn){return conn.tr});trconn&&(msg="".concat(translate("wan_delete_tr")," (").concat(trconn.name,")."))}return msg}function getConfirmMsgRemove(conns){if(isFirewallMode)return translate("action_delete_confirm",{name:translate("connections")});var uniqGroups,haConns,warnText,alrt,connCount,alertConns=[],gateways=autoconf.BR2_PACKAGE_ANWEB_DSYSINIT?conns.filter(function(e){return e.gwif&&!e.usedInNotDefaultGroup}).map(function(e){return e.name}):conns.filter(function(e){return e.gwif}).map(function(e){return e.name});gateways.length&&alertConns.push(gateways.length>1?{conn:gateways.join(", "),msg:translate("wan_default_gateway_warning_connections2")}:{conn:gateways.join(", "),msg:translate("wan_default_gateway_warning_connection2")});var gatewaysInGroups=conns.filter(function(e){return e.gwif&&e.usedInNotDefaultGroup}).map(function(e){return{connName:e.name,groupName:e.groupName}});gatewaysInGroups.length&&(uniqGroups=[],_.each(gatewaysInGroups,function(gw){uniqGroups.push(gw.groupName)}),uniqGroups=_.uniq(uniqGroups),_.each(uniqGroups,function(name){var gwListNames=gatewaysInGroups.filter(function(gw){return gw.groupName==name}).map(function(e){return e.connName});alertConns.push(gwListNames.length>1?{conn:gwListNames.join(", "),msg:translate("wan_default_gateway_warning_connections2")+" "+translate("in_group")+" "+name}:{conn:gwListNames.join(", "),msg:translate("wan_default_gateway_warning_connection2")+" "+translate("in_group")+" "+name})}));var trConn=conns.find(function(e){return e.tr});trConn&&alertConns.push({conn:trConn.name,msg:translate("wan_tr_warning")});var voipConn=conns.find(function(e){return e.voip});voipConn&&alertConns.push({conn:voipConn.name,msg:translate("wan_voip_warning")});var httpaccessConn=_.filter(conns,function(e){return e.httpaccess});httpaccessConn.length&&(haConns=[],_.each(httpaccessConn,function(hc){haConns.push(hc.name)}),warnText=haConns.length>1?"wan_warning_in_use_pl":"wan_warning_in_use",alertConns.push({conn:haConns.join(", "),msg:translate(warnText,{name:translate("raccess_in")})}));var msg="",allAlertConnCount=0,allAlertConnNames=[];if(alertConns.length)for(var i in alertConns)alrt=alertConns[i],connCount=alrt.conn.split(",").length,allAlertConnCount+=connCount,allAlertConnNames=allAlertConnNames.concat(alrt.conn.split(", ")),msg+=connCount>1?"".concat(translate("connections")," (").concat(alrt.conn,") ").concat(alrt.msg,".\n"):"".concat(translate("connection")," (").concat(alrt.conn,") ").concat(alrt.msg,".\n");return msg+=translate(allAlertConnCount>1&&_.uniq(allAlertConnNames).length>1?"wan_connections_warning":"wan_connections_warning_one")}var igmpNav,href,name,isFirewallMode=navShared.isFirewallMode;$scope.simpleModeAvail=$state.params.simpleModeAvail,$scope.isFirewallMode=isFirewallMode,$scope.data=$state.params.data;var flatConnList=$scope.data.__flatConnList,getTypeLangKey=wanPageCommon.getTypeLangKey;$scope.list=flatConnList.map(function(e,i,all){var typeText=translate(getTypeLangKey(e,e.__Type)),ifaceText=wanPageCommon.getIfaceText(e,all),statusText=wanPage.getStatusText($scope.data,e),strStatusText=wanPageCommon.getStrStatusText(statusText),status=wanPageCommon.getStatus(statusText),ret={name:e.Name,type:typeText,iface:ifaceText,status:status,statusText:strStatusText,shortInfo:typeText+"/"+ifaceText,path:e.__Path,gwif:e.DefaultGateway||e.DefaultGatewayv6,usedInNotDefaultGroup:autoconf.BR2_PACKAGE_ANWEB_DSYSINIT?wanPage.wanUsedInNotDefaultGroup($scope.data,e):void 0,groupName:autoconf.BR2_PACKAGE_ANWEB_DSYSINIT?wanPage.getGroupName($scope.data,e):void 0,tr:wanPage.wanUsedInTr69($scope.data,e),voip:wanPage.wanUsedInVoIP($scope.data,e),reserve:wanPage.wanUsedInReserve($scope.data,e),httpaccess:wanPage.wanUsedInHttpaccess($scope.data,e)};return ret}).sort(function(a,b){return a.name<b.name?-1:a.name>b.name?1:0}),$scope.pageDetails.igmp&&(igmpNav=$scope.pageDetails.igmp[0],href=igmpNav.url,name=translate(igmpNav.menu.name),$scope.igmpDesc=translate("igmp_wan_desc",{link:"<a href='"+href+"'>"+name+"</a>",trustAsHtml:!0})),$scope.switchToSimpleMode=function(){$scope.$emit("switchWanPageMode",!1)},$scope.reconnect=function(conns){var paths=conns.map(function(e){return e.path}),overlay=$scope.overlay.circular.start();wanPage.reconnect(paths,$scope.data).then(function(){$scope.$emit("pageNeedUpdate")})["catch"](function(){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})})["finally"](function(){$scope.overlay.circular.stop(overlay)})},$scope.remove=function(conns){function del(depsToDel){var overlayId=overlay.start();wanPage.remove(paths,$scope.data,depsToDel).then(function(){$scope.$emit("pageNeedUpdate")})["catch"](function(){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})})["finally"](function(){overlay.stop(overlayId)})}function depsCheckSuccess(deps){var _deps$allLinks$concat,_deps$allLinks,_deps$removableLinks$,_deps$removableLinks,_deps$linksToHide$con,_deps$linksToHide,hiddenDeps=wanPage.getHiddenDeps(paths,$scope.data),depsDataFromPage={depLinks:{allLinks:null!==(_deps$allLinks$concat=null===(_deps$allLinks=deps.allLinks)||void 0===_deps$allLinks?void 0:_deps$allLinks.concat(hiddenDeps))&&void 0!==_deps$allLinks$concat?_deps$allLinks$concat:[],removableLinks:null!==(_deps$removableLinks$=null===(_deps$removableLinks=deps.removableLinks)||void 0===_deps$removableLinks?void 0:_deps$removableLinks.concat(hiddenDeps))&&void 0!==_deps$removableLinks$?_deps$removableLinks$:[],linksToHide:null!==(_deps$linksToHide$con=null===(_deps$linksToHide=deps.linksToHide)||void 0===_deps$linksToHide?void 0:_deps$linksToHide.concat(hiddenDeps))&&void 0!==_deps$linksToHide$con?_deps$linksToHide$con:[],cascadeLinks:deps.cascadeLinks},callbackDelFn:del};return wanPage.depsChecker.openDialogIfDepsExists(depsDataFromPage)}function errorRemove(){$state.go("error",{code:"msg_push_error",message:"msg_push_error"})}var breakMsg=getBreakMsgRemove(conns);if(breakMsg)return void alert(breakMsg);var confirmMsg=getConfirmMsgRemove(conns);if(!confirmMsg||confirm(confirmMsg)){var overlay=$scope.overlay.circular,paths=conns.map(function(e){return e.path});if($scope.removeWanConns=del,isFirewallMode){var overlayId=overlay.start();wanPage.checkLinksDeps(paths,$scope.data).then(depsCheckSuccess,errorRemove)["finally"](overlay.stop.bind(overlay,overlayId))}else del()}},$scope.edit=function(item){$scope.customRules.DenyEditingTRConnection&&item.tr&&"admin"==localStorage.getItem("auth-dsysinit.Login")?alert(translate("wan_edit_tr")):$scope.$emit("goToEditing",item.path)},$scope.add=function(){$scope.$emit("goToAdding")}}])}();