"use strict";!function(){function WizardPortsController($scope,util,translate,device,devinfo,ngDialog,funcs,snackbars,navFilter,$state){function activate(overlayId){util.pull().then(function(){util.updateAvailableSourcesList(),updateViewModel(),devinfo.onceAndSubscribe("client|ports|Device.WiFi.Radio.*.AccessPoint.*.Interface",function(data){data&&(updatePortInfo(data),showNotification(data))},$scope)})["catch"](function(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})})["finally"](function(){overlayId&&overlay.stop(overlayId),$scope.$emit("pageload")})}function getSourcesList(){var list=_.map($scope.sources,function(value,inx){return{label:value.name,value:inx}});return list.unshift({label:translate("ports_wizard_port_free"),value:null}),list}function updatePortInfo(data){var managementPort=_.find(data.availPorts,function(port){return port.management});$scope.managementPort=managementPort?managementPort.alias?managementPort.alias:managementPort.name:null,!managementPort&&data.client&&data.client.SSID&&($scope.managementPort=data.client.SSID);var internetPort=data?_.findWhere(data.availPorts,{name:"internet"})||_.findWhere(data.availPorts,{name:"port5"}):null;internetPort&&($scope.internetType=internetPort.mediaType)}function showNotification(data){var client=data.client,hasManagamentPort=data?_.findWhere(data.availPorts,{management:!0}):null;!_.isEmpty(client)&&"LAN"==client.name&&_.isUndefined(hasManagamentPort)?$scope.needShowNotification=!0:_.isEmpty(client)&&_.isUndefined(hasManagamentPort)&&($scope.needShowNotification=!0)}function updateViewModel(){$scope.sources=util.getAvailableSources(),$scope.ports=util.getLanPorts(),$scope.sourcesList=getSourcesList()}function editSource(sourceId,source){var model=_.extend({},source),dialog=ngDialog.open({template:"dialogs/wizards/ports/dialog.tpl.html",controller:"PortsWizardSourceDialogController",resolve:funcs.getLazyResolve("dialogs/wizards/ports/ctrl.lazy.js","PortsWizardSourceDialogController"),data:{action:sourceId?"edit":"add",source:model,sources:$scope.sources,connections:$scope.connections,availIfaces:getAvailIfaces(),busyPVC:$scope.getBusyPVC(),reservedNames:getReservedNames(),reservedVlans:getReservedVlans(),isEditable:sourceIsEditable(source),vlanIdRequired:util.hasDefaultWanSource(),wanPorts:getWANPorts()}});dialog.closePromise.then(function(result){if(result&&result.value&&!_.isString(result.value)){var mapped=mapSource(result.value);result.value.isDeleted?util.removeSource(sourceId):result.value.isNew&&null==sourceId?util.addSource(mapped):util.updateSource(sourceId,mapped),updateViewModel()}})}function getReservedVlans(){return _.compact(_.pluck($scope.sources,"vid"))}function getReservedNames(){return _.pluck($scope.sources,"name")}function getAvailIfaces(){return _.without($scope.availIfaces(),"ATM")}function sourceIsEditable(source){return!source||"bridge"==source.type||"wan_tag"==source.type}function getWANPorts(sourceId){var wanPortList=[];return sourceId?wanPortList.push({name:$scope.sources[sourceId].name,value:$scope.sources[sourceId].wanPort}):_.each($scope.sources,function(elem){"wan"==elem.type&&wanPortList.push({name:elem.name,value:elem.wanPort})}),wanPortList}function getWANPort(sourceId){return sourceId?$scope.sources[sourceId].wanPort:_.find($scope.sources,function(s){return s.wanPort}).wanPort}function mapSource(data){var changeData={name:data.name,l2Key:data.l2Key,enabled:!!data.enabled,vid:data.vid,type:getType(data),vpi:data.vpi,vci:data.vci,qos:data.qos,encap:data.encap,port:data.port};return _.extend(data,changeData)}function getType(data){switch(data.port){case"ATM":return"atm";case"PTM":return"ethernet"}return"ethernet"}function canTogglePortSimple(port){return!getPortDisabledMessage(port)}function getPortDisabledMessage(port){return portIsManagement(port)?"summary_on_this_port":util.portInBridge(port)?"ports_wizard_in_bridge":util.hasDefaultWanSource()?null:"ports_wizard_no_default_wan"}function portIsManagement(port){return port.alias==$scope.managementPort}function showSimpleMode(){return!$scope.forceExtendedMode}_.extend($scope,{availIfaces:function(){return[]},getBusyPVC:function(){return[]},connections:function(){return[]},internetType:null,isSimpleModeOnly:function(){return autoconf.BR2_PACKAGE_ANWEB_CUSTOM_KOREA_21883||autoconf.BR2_PACKAGE_ANWEB_CUSTOM_BELTELECOM_36527},isShowPort:function(port){return port.upstream?!1:port.isWifi&&navRules.HideWiFiAccessPointBySSID?!_.contains(navRules.HideWiFiAccessPointBySSID,port.alias):!0},getSourcesList:null,getPortTitle:function(port){return port.alias},editSource:editSource,createSource:function(sourceId){editSource(null,{isNew:!0,enabled:!0,type:"wan_tag",wanPort:getWANPort(sourceId)})},getPortIconClass:function(item){return item.isWifi?"wifi":"ethernet"},getSourceIconClass:function(){return"fiber"==$scope.internetType?"fiber":"pon"==$scope.internetType?"pon":"ethernet"},portIsSelected:function(port){return!!port.bridge},portIsBusy:function(){return!1},portIsNotEditable:function(){return!1},togglePortSimple:function(port){return showSimpleMode()&&canTogglePortSimple(port)&&!portIsManagement(port)?port.bridge&&port.bridge==util.getDefaultSourceId()?void(port.bridge=null):void(port.bridge=util.getDefaultSourceId()):void 0},save:function(){function error(){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"}),overlay.stop(overlayId)}function sourceHasPorts(sourceId){return _.some($scope.ports,function(port){return port.bridge==sourceId})}var message,invalidBridges=_.filter($scope.sources,function(source,inx){return"bridge"==source.type&&!sourceHasPorts(inx)});if(invalidBridges.length)return message=translate("ports_wizard_need_select_ports")+" "+_.map(invalidBridges,function(b){return'"'.concat(b.name,'"')}).join(","),void alert(message);var overlayId=overlay.start();util.push().then(function(){snackbars.add("msg_apply_success"),activate(overlayId)})["catch"](error)},showSimpleMode:showSimpleMode,canTogglePortSimple:canTogglePortSimple,getPortDisabledMessage:getPortDisabledMessage,toggleMode:function(){$scope.forceExtendedMode=!$scope.forceExtendedMode},portIsManagement:portIsManagement,isUnactiveWifi:function(item){return item&&item.isWifi&&/^\w+-na$/.test(item.name)},getWANBridge:function(){return _.pick($scope.sources,function(br){return"wan"==br.type||"wan_tag"==br.type})},updateViewModel:updateViewModel,wasModified:util.wasModified});var navRules=navFilter.rules(),overlay=$scope.overlay.circular;$scope.needShowNotification=!1,activate()}angular.module("app").controllerProvider.register("WizardPortsController",WizardPortsController),WizardPortsController.$inject=["$scope","PallocUtil","translate","device","devinfo","ngDialog","funcs","snackbars","navigationFilter","$state"]}();