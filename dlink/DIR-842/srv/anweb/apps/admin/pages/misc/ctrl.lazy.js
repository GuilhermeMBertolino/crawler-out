"use strict";!function(){angular.module("app").controllerProvider.register("MiscCtrl",["$scope","miscUtil","snackbars","navigationFilter","translate","navShared",function($scope,util,snackbars,filter,translate,navShared){function init(){function getFuncsList(){var result=[];return $scope.settings.netfilter&&(result.push("SIP"),result.push("RTSP")),$scope.isFirewallMode&&result.push("TWIN IP (IP Passthrough)"),result.join(", ")}function getPassThroughFuncs(){var result=[];for(var i in $scope.passThroughs)result.push($scope.passThroughs[i]);return _.sortBy(result,function(elem){return elem}).join("/")}util.pull().then(function(){$scope.settings=util.getConfig(),__backupTwinIp=angular.copy($scope.settings.twinIp),__backupNetfilter=angular.copy($scope.settings.netfilter),__backupPassThrough=angular.copy($scope.settings.passThrough),__backupRlxIptvQos=angular.copy($scope.settings.rlxIptvQos),$scope.funcsList=getFuncsList(),$scope.passThroughFuncs=getPassThroughFuncs(),$scope.passthroughsRef=autoconf.BR2_PACKAGE_ANWEB_DSYSINIT?$scope.settings.passThrough.Settings:$scope.settings.passThrough,$scope.$emit("pageload")})["catch"](function(){snackbars.add("msg_rpc_read_error")})["finally"](function(){overlayId&&($scope.overlay.circular.stop(overlayId),overlayId=null)})}var __backupNetfilter=null,__backupPassThrough=null,__backupRlxIptvQos=null,__backupTwinIp=null,overlayId=null,rules=filter.rules();$scope.isFirewallMode=navShared.isFirewallMode,$scope.passThroughs=function(){var passthroughs={};return passthroughs.pppoe="PPPoE",$scope.isFirewallMode||(passthroughs.ipsec="IPsec",passthroughs.l2tp="L2TP",passthroughs.pptp="PPTP"),passthroughs}(),$scope.passthroughsRef={},$scope.settings={},init(),$scope.wasModified=function(){return __backupNetfilter&&!_.isEqual(__backupNetfilter,angular.copy($scope.settings.netfilter))||__backupPassThrough&&!_.isEqual(__backupPassThrough,angular.copy($scope.settings.passThrough))||__backupRlxIptvQos&&!_.isEqual(__backupRlxIptvQos,angular.copy($scope.settings.rlxIptvQos))||__backupTwinIp&&!_.isEqual(__backupTwinIp,angular.copy($scope.settings.twinIp))},$scope.supportRlxIptvQos=function(){return!!$scope.settings.rlxIptvQos&&!rules.HideRlxIptvQos},$scope.setIface=function(){},$scope.getLabel=function(label){return translate("miscel_pass_through",{name:label,abr:"name"})},$scope.getDesc=function(proto){return translate("miscel_proto_desc",{name:proto,abr:"name"})},$scope.isDisabledSubmit=function(){return $scope.miscForm.$pristine},$scope.save=function(){$scope.miscForm.$valid&&(overlayId=$scope.overlay.circular.start(),util.apply($scope.settings).then(function(){snackbars.add("msg_rpc_write_success"),init()})["catch"](function(response){$scope.overlay.circular.stop(overlayId),overlayId=null,snackbars.add("msg_rpc_write_error")}))}}])}();