"use strict";!function(){angular.module("app").controllerProvider.register("IPFilterRuleCtrl",["$scope","$rootScope","$state","devinfo","translate","history","ipfilterUtil",function($scope,$rootScope,$state,devinfo,translate,history,util){function isSupported(param){return helper?helper.isSupported(param):void 0}function getActionList(){return helper.getActions()}function getProtocolList(){return helper.getProtocols()}function getDirectionList(){return helper.getDirections()}function getDestDirectionList(){var result=[];return result="ipv6"==ipfilter.ipversion?_.filter(helper.getDestDirections("v6"),function(d){return"GRE"!=d.name&&"PPTP"!=d.name&&"L2TP"!=d.name}):helper.getDestDirections("v4"),ipfilter.rule&&__backupRule&&ipfilter.rule.is_ipv6==__backupRule.is_ipv6&&(_.findWhere(result,{value:ipfilter.rule.destDirection})||(ipfilter.rule.destDirection=result[0].value)),result}function getSourceDirectionList(){var result=[];return result="ipv6"==ipfilter.ipversion?_.filter(helper.getSourceDirections("v6"),function(d){return"GRE"!=d.name&&"PPTP"!=d.name&&"L2TP"!=d.name}):helper.getSourceDirections("v4"),ipfilter.rule&&__backupRule&&ipfilter.rule.is_ipv6==__backupRule.is_ipv6&&(_.findWhere(result,{value:ipfilter.rule.sourceDirection})||(ipfilter.rule.sourceDirection=result[0].value)),result}function wasModified(){return!_.isEqual(ipfilter.rule,__backupRule)}function __pullError(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}function changeIP(obj,direction){if(ipfilter.rule){var result=[];obj.begin&&result.push(obj.begin),obj.end&&result.push(obj.end);var value=result.join("-");"source"==direction?ipfilter.rule.ips=value:ipfilter.rule.ipd=value}}function getZoneInterfaces(zoneDirection,orig){if(ipfilter.rule){var result=[];if("dest"==orig){var list=ipfilter.getDestDirectionList(),direction=ipfilter.rule.destDirection,zone=_.findWhere(list,{value:direction}),zoneName=1==zone.value?"fw":zone.name.toLowerCase();result=util.getZoneInterfaces(zoneName,ipfilter.ipversion)}else{var list=ipfilter.getSourceDirectionList(),direction=ipfilter.rule.sourceDirection,zone=_.findWhere(list,{value:direction}),zoneName=zone.name.toLowerCase();result=util.getZoneInterfaces(zoneName,ipfilter.ipversion)}return result}}function changeDir(dir,orig){var zoneIfaces=getZoneInterfaces(dir,orig);"dest"!=orig||_.findWhere(zoneIfaces,{value:ipfilter.rule.destDirIface})||(ipfilter.rule.destDirIface=zoneIfaces[0].value),"source"!=orig||_.findWhere(zoneIfaces,{value:ipfilter.rule.sourceDirIface})||(ipfilter.rule.sourceDirIface=zoneIfaces[0].value)}$scope.ipfilter={isActivate:!1,action:null,rule:null,ipversion:null,client:null,ip:{source:{},destination:{}},apply:function(){function success(){$state.go(currentState+".info")}function error(response){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})}if($scope.form.$valid){if(_.has(ipfilter.rule,"name")){var name=helper.isUniqueName(ipfilter.rule,__index);if(name)return void alert(translate("name_exists"))}var confilct=helper.conflicts(ipfilter.rule,__index);if(confilct)return void alert(translate("ipflt_rule_conflict"));if(!_.isUndefined(ipfilter.client)){var accessLost=helper.accessWillLost(ipfilter.rule,ipfilter.client);if(accessLost&&!confirm(translate("ipflt_access_lost_rule")))return}if(ipfilter.rule.action){var isLocalRule=helper.isLocalRule(ipfilter.rule);if(isLocalRule&&!confirm(translate("ipflt_is_local_rule")))return}var overlay=$scope.overlay.circular,overlayId=overlay.start();util.applyRule(ipfilter.rule,__index).then(success)["catch"](error)["finally"](overlay.stop.bind(overlay,overlayId))}},remove:function(){function success(){history.setCleanLastHistory(!0),$state.go(currentState+".info")}function error(response){$state.go("error",{code:"msg_remove_error",message:"msg_rpc_remove_error"})}if(confirm(translate("ipflt_remove_rule_warn"))){var overlay=$scope.overlay.circular,overlayId=overlay.start();$rootScope.$emit("unsavedStop",!0);var removeList=helper.makeRemoveList([__index]);util.removeRules(removeList).then(success)["catch"](error)["finally"](overlay.stop.bind(overlay,overlayId))}},isSupported:isSupported,isDisabled:function(param){function portDisabled(){return 3==rule.proto||4==rule.proto}var rule=ipfilter.rule;if(!rule)return!1;switch(param){case"ports":case"portd":return portDisabled();case"source_port":return portDisabled()||!ipfilter.manualSrcPort}},getIPVersionList:function(){return[{name:"IPv4",value:"ipv4"},{name:"IPv6",value:"ipv6"}]},getActionList:getActionList,getProtocolList:getProtocolList,getDirectionList:getDirectionList,getSourceDirectionList:getSourceDirectionList,getDestDirectionList:getDestDirectionList,validation:function(value,param){return ipfilter.rule?helper.validation(ipfilter.rule,param):null},changeIPVersion:function(version){ipfilter.rule.is_ipv6="ipv6"==version,ipfilter.rule.is_ipv6==__backupRule.is_ipv6?(ipfilter.rule.destDirection=__backupRule.destDirection,ipfilter.rule.sourceDirection=__backupRule.sourceDirection):(ipfilter.rule.sourceDirection=getSourceDirectionList()[0].value,ipfilter.rule.destDirection=getDestDirectionList()[0].value),changeDir(ipfilter.rule.sourceDirection,"source"),changeDir(ipfilter.rule.destDirection,"dest")},wasModified:wasModified,onAutoSrcPortChange:function(){ipfilter.manualSrcPort||(ipfilter.rule.ports="")},getNoteExampleIp:function(){return isSupported("is_ipv6")?"ipflt_ip_note":"ipflt_ip_note_ipv4_only"},getZoneInterfaces:getZoneInterfaces,changeDir:changeDir,checkUniqDirection:function(){return ipfilter.rule.sourceDirection==ipfilter.rule.destDirection?"msg_error_value_is_not_uniq":null}};var ipfilter=$scope.ipfilter,__index=_.isUndefined($state.params.inx)?void 0:parseInt($state.params.inx);$scope.useSchedule=_.isUndefined($state.params.useSchedule)?!1:"true"==$state.params.useSchedule?!0:!1;var helper,__backupRule=null;!function(){function pullClient(){function success(result){ipfilter.client=result.client,prepare(),$scope.ipfilter.loading=!1}helper=util.makeHelper(),devinfo.once("client").then(success,__pullError)}function prepare(){_.isUndefined(__index)?(ipfilter.rule=helper.getDefaultTemplate(),isSupported("id")&&(ipfilter.rule.id=helper.getBiggestID()),ipfilter.action="add"):(ipfilter.rule=helper.getRule(__index),ipfilter.action="edit"),ipfilter.manualSrcPort=!!ipfilter.rule.ports,ipfilter.ipversion=isSupported("is_ipv6")&&ipfilter.rule.is_ipv6?"ipv6":"ipv4",prepareIP("source"),prepareIP("destination"),ipfilter.isActivate=!0,__backupRule=angular.copy(ipfilter.rule),$scope.$emit("pageload")}function prepareIP(direction){var ip="source"==direction?ipfilter.rule.ips:ipfilter.rule.ipd,arrIp=ip?ip.split("-"):[];ipfilter.ip[direction].begin=arrIp[0]||"",ipfilter.ip[direction].end=arrIp[1]||""}return $scope.ipfilter.loading=!0,util.wasActivate()?void pullClient():void util.pull().then(pullClient)["catch"](__pullError)}(),$scope.$watchCollection("ipfilter.ip.source",function(value){changeIP(value,"source")}),$scope.$watchCollection("ipfilter.ip.destination",function(value){changeIP(value,"destination")});var currentState=$state.current.name.split(".");currentState.pop(),currentState=currentState.join(".")}])}();