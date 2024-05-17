"use strict";angular.module("app").controllerProvider.register("dhcpStatsCtrl",["$scope","StatsDHCPUtil","devinfo","funcs","translate","ngDialog",function($scope,util,devinfo,funcs,translate,ngDialog){function onInfoLoaded(input){$scope.dhcpStats=input,$scope.$emit("pageload")}function translater(value){return translate("units_dt_"+value)}function mapModelToViewModel(item){return _.extend({},item,{leaseExpiresTime:$scope.getLeaseExpiresTime(item)})}var helper;!function(){util.pull().then(function(){helper=util.makeHelper(),onInfoLoaded(helper.getData()),util.subscribeInfo(onInfoLoaded,$scope)})}(),$scope.getLeaseExpiresTime=function(item){var data=helper.getLeaseExpiresTime(item);return"-"!=data?data.toString(translater):data},$scope.showDetails=function(item,key){devinfo.suspend();var dlg=ngDialog.open({template:"dialogs/stats/dhcp_stat_details/dialog.tpl.html",controller:"dhcpStatDetailsCtrl",resolve:funcs.getLazyResolve("dialogs/stats/dhcp_stat_details/ctrl.lazy.js","dhcpStatDetailsCtrl"),data:{header:item.hostname,model:mapModelToViewModel(item)}});dlg.closePromise.then(function(){devinfo.resume()})}}]);