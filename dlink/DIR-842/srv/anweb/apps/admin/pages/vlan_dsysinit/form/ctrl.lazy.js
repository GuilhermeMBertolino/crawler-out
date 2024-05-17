"use strict";angular.module("app").controllerProvider.register("VlanFormCtrl",["$scope","$state","devinfo","VlanUtil","funcs","translate","snackbars","cookie","navShared",function($scope,$state,devinfo,util,funcs,translate,snackbars,cookie,navShared){function portManagmentSubscribe(){function setPorts(res){if(res&&res.availPorts){var managementPortUpdated=Object.values(res.availPorts).find(function(port){return port.management&&!port.isWan});if(managementPortUpdated&&(managementPort.link=managementPortUpdated.link,managementPort.vlan=managementPortUpdated.managementBridge),!managementPortUpdated){var neighbours=funcs.fetchBranch(res["Device.Statistics.Neighbours."],"Device.Statistics.Neighbours."),wifiInfo=res["Device.WiFi.Radio.*.AccessPoint.*.Interface"];if(!neighbours||!wifiInfo)return;var info=_.find(neighbours,{IPAddress:res.remoteAddress});info&&""!=info.Port&&(managementPort.vlan=info.Interface.split(".")[4],managementPort.link=funcs.fetchBranch(wifiInfo,info.Port).Interface)}}}var strReq="ports|Device.Statistics.Neighbours.|Device.WiFi.Radio.*.AccessPoint.*.Interface";devinfo.onceAndSubscribe(strReq,setPorts,$scope)}function getPortTypes(ports){var result=[{value:"port",langkey:"ports"}];return _.some(ports,function(port){return"wifi"==port.Type})&&result.push({value:"wifi",langkey:"wireless_iface"}),_.some(ports,function(port){return"eogre"==port.Type})&&result.push({value:"eogre",langkey:"eogre_iface"}),_.some(ports,function(port){return"eoip"==port.Type})&&result.push({value:"eoip",langkey:"eoip_iface"}),_.some(ports,function(port){return"l2tpv3"==port.Type})&&result.push({value:"l2tpv3",langkey:"L2TPv3"}),_.some(ports,function(port){return"usb"==port.Type})&&result.push({value:"usb",langkey:"USB"}),_.some(ports,function(port){return"atm"==port.Type})&&result.push({value:"atm",langkey:"ATM"}),_.some(ports,function(port){return"ptm"==port.Type})&&result.push({value:"ptm",langkey:"PTM"}),result}function checkValidName(value){function isUnique(listVlans,value){return _.every(listVlans,function(vlan){return vlan.Name!=value||vlan.__inxBridge===inxBridge})}return value?/^[0-9a-zA-Z_]+$/.test(value)?value.length>32?"msg_invalid_name_length":listVlans&&!isUnique(listVlans,value)?"msg_error_value_is_not_uniq":null:"msg_invalid_name":null}function checkValidVID(value){function isUnique(listVlans,value){return _.every(listVlans,function(vlan){return vlan.VID!=value||vlan.__inxBridge===inxBridge})}return value&&listVlans&&!isUnique(listVlans,value)?"msg_error_value_is_not_uniq":null}function isRequiredVID(){return _.some($scope.vlan.instance.Ports,function(port){return"tagged"==port.State})||!_.isUndefined($scope.vlan.instance.Vlan.MVR)&&$scope.vlan.instance.Vlan.MVR}function disabledMVR(){return inxBridge||_.find(listVlans,function(vlan){return vlan.MVR})}function changeMVR(){$scope.vlan.instance.Vlan.MVR?_.each($scope.vlan.instance.Ports,function(port){"port"==port.Type&&(_.find(port.AvailStates,function(state){return"untagged"==state.value})||port.AvailStates.push({label:"vlan_port_type_u",value:"untagged"}))}):__backupInstance&&($scope.vlan.instance.Ports=angular.copy(__backupInstance.Ports))}function isManagementPort(port){var isManagementVlan=managementPort.vlan==inxBridge,isManagementLink=port.Link===managementPort.link;return isManagementVlan&&isManagementLink}function wasModified(){var instance=angular.copy($scope.vlan.instance);return __backupInstance&&!funcs.deepEqual(instance,__backupInstance)}function checkAllPortExcluded(){var result=!1;return $scope.vlan.instance&&(result=_.every($scope.vlan.instance.Ports,function(port){return"excluded"==port.State})),result}function checkHasUpstreamPort(){return _.some($scope.vlan.instance.Ports,function(port){return"excluded"!=port.State&&port.IsWan})}function isShowDualLAN(){function includeWAN(){return _.some($scope.vlan.instance.Ports,function(port){return port.IsWan&&"excluded"!=port.State})}return util.isSupportDualLAN()&&"1"!==inxBridge&&!includeWAN()}function getPortsConflictConn(){var backupIncludedWanPorts=_.filter(__backupInstance.Ports,function(port){return port.IsWan&&"excluded"!=port.State}).map(function(port){return port.Name}),excludedWanPorts=_.filter($scope.vlan.instance.Ports,function(port){return port.IsWan&&"excluded"==port.State}).map(function(port){return port.Name});return _.intersection(backupIncludedWanPorts,excludedWanPorts)}$scope.vlan={instance:null,conns:[],servers:[],groups:[],routs:[],backupCreateIface:null,isAllPortExcluded:!1,isActivate:!1,portTypes:[],apply:function(){function success(){snackbars.add("msg_apply_success"),overlay.stop(overlayId),$state.go("^.list")}function error(error){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"}),overlay.stop(overlayId)}var changes=funcs.getChangesExpanded(angular.copy($scope.vlan.instance),__backupInstance),idsChangedPorts=Object.keys(changes.Ports).map(function(x){return Number(x)}),changedPorts=$scope.vlan.instance.Ports.filter(function(__,portIndex){return idsChangedPorts.includes(portIndex)});if(!changedPorts.some(function(x){return isManagementPort(x)})||confirm(translate("vlan_management_port_confirm"))){if(checkAllPortExcluded())return void($scope.vlan.isAllPortExcluded=!0);if(inxBridge&&conns.length){var conflictPorts=getPortsConflictConn();if(conflictPorts.length)return void alert(translate("vlan_not_exlude_port",{port:conflictPorts.join(", "),abr:"port"})+". "+translate("vlan_need_remove_conns")+": "+conns.join(", "))}var conflictPorts;if($scope.vlan.instance.Vlan.MVR&&!checkHasUpstreamPort())return void($scope.vlan.isNotUpstreamPort=!0);var overlayId=overlay.start();return util.apply($scope.vlan.instance,inxBridge).then(success)["catch"](error)}},changeStatePort:function(port){$scope.vlan.isAllPortExcluded=checkAllPortExcluded(),!_.isUndefined($scope.vlan.instance.Vlan.MVR)&&$scope.vlan.instance.Vlan.MVR&&($scope.vlan.isNotUpstreamPort=!checkHasUpstreamPort())},changeCreateInterface:function(){$scope.vlan.instance.Vlan.CreateInterface||($scope.vlan.instance.DualLAN=!1)},checkValidName:checkValidName,checkValidVID:checkValidVID,getIfaceNote:function(){return conns?translate("vlan_iface_disabled_note",{list:$scope.vlan.conns.join(", "),abr:"list"}):null},getServerNote:function(){return servers?translate("vlan_server_disabled_note",{list:$scope.vlan.servers.join(", "),abr:"list"}):null},getRoutNote:function(){return routs?translate("vlan_rout_disabled_note",{list:$scope.vlan.routs.join(", "),abr:"list"}):null},getGroupNote:function(){return groups?translate("vlan_group_disabled_note",{list:$scope.vlan.groups.join(", "),abr:"list"}):null},getEogreNote:function(){var href=$scope.pageDetails.eogreInfo[0].url,name="EoGRE";return translate("vlan_eogre_tag_note",{link:"<a href='"+href+"'>"+name+"</a>",trustAsHtml:!0})},getEoipNote:function(){var href=$scope.pageDetails.eoipInfo[0].url,name="EoIP";return translate("vlan_eoip_tag_note",{link:"<a href='"+href+"'>"+name+"</a>",trustAsHtml:!0})},getIfaceIcon:function(type,port){var result;return"port"==type&&("WAN"==port.Name,result="ethernet","SFP"==port.Name&&(result="fiber")),("atm"==type||"ptm"==type)&&(result="dsl"),result?result:type},getPorts:function(ports,type){return _.filter(ports,function(port){return port.Type==type})},isManagementPort:isManagementPort,isDisabledPort:function(port){return!isManagementPort(port)||isAP||isFirewallMode||$scope.vlan.instance.Vlan.MVR?$scope.vlan.instance.Vlan.ForceBridge&&port.IsWan?!0:isShowDualLAN()&&port.IsWan&&$scope.vlan.instance.DualLAN?!0:"atm"!=port.Type&&"ptm"!=port.Type||!port.IsWan&&!$scope.vlan.instance.Vlan.ForceBridge?!1:!0:!0},isRequiredVID:isRequiredVID,isSupportVPR:util.isSupportVPR,isShowVPR:function(){return!_.isUndefined($scope.vlan.instance.Vlan.VID)||isRequiredVID()},isShowMVR:function(){return!_.isUndefined($scope.vlan.instance.Vlan.MVR)},disabledMVR:disabledMVR,changeMVR:changeMVR,isValidForm:function(){return!(!$scope.vlan_form.$valid||!$scope.vlan.instance.Vlan.Name||$scope.vlan.isAllPortExcluded||$scope.vlan.isDoubleTaggedPort||$scope.vlan.isNotUpstreamPort||isRequiredVID()&&(!$scope.vlan.instance.Vlan.VID||util.isSupportVPR()&&_.isUndefined($scope.vlan.instance.Vlan.VPR)))},wasModified:wasModified,disabledDualLAN:function(){return!$scope.vlan.DualLAN||!$scope.vlan.instance.Vlan.CreateInterface||!!$scope.vlan.DualLAN.Enable&&($scope.vlan.DualLAN.inxBridge!=inxBridge||""!=$scope.vlan.DualLAN.conn)},isShowDualLAN:isShowDualLAN};var isFirewallMode=navShared.isFirewallMode,overlay=$scope.overlay.circular,mode=cookie.get("device_mode"),isAP="ap"==mode;$scope.isAP=isAP;var listVlans,conns,groups,routs,servers,__backupInstance=null,managementPort={link:null,vlan:null},inxBridge=$state.params.inx||null;!function(){function success(){if(listVlans=util.getListVlans().List,$scope.vlan.instance=util.getInstanceVlan(inxBridge),$scope.vlan.constraints=util.getConstraints(),$scope.vlan.portTypes=getPortTypes($scope.vlan.instance.Ports),$scope.vlan.isActivate=!0,util.isSupportDualLAN()&&($scope.vlan.DualLAN=util.getInfoDualLAN(),devinfo.once("net").then(function(res){$scope.vlan.DualLAN.infoNetLans=_.map(res.lan,function(lan){return funcs.ipv4.subnet.getNetworkRange(lan.ip,lan.mask)})})),__backupInstance=angular.copy($scope.vlan.instance),inxBridge){var vlan=_.find(listVlans,function(vlan){return vlan.__inxBridge==inxBridge});conns=vlan.Conns,groups=vlan.Groups,routs=vlan.Routs,servers=vlan.Servers,$scope.vlan.conns=conns,$scope.vlan.servers=servers,$scope.vlan.routs=routs,$scope.vlan.groups=groups,conns.length>0?$scope.vlan.needShowConnWarn=!0:servers&&servers.length>0?$scope.vlan.needShowServerWarn=!0:groups.length>0&&1!=inxBridge?$scope.vlan.needShowGroupWarn=!0:$scope.vlan.needShowConnWarn=!1,routs.length>0&&($scope.vlan.needShowRoutWarn=!0),(1==inxBridge||conns.length>0||groups.length>0||routs.length>0||servers&&servers.length>0)&&($scope.vlan.CreateInterfaceDisabled=!0)}}function error(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}function finallyCb(){$scope.$emit("pageload")}portManagmentSubscribe(),util.pull().then(success)["catch"](error)["finally"](finallyCb)}()}]);