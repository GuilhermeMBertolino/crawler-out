"use strict";function ipsecStatDetails($scope){$scope.model=$scope.ngDialogData.model,$scope.getHeader=function(){return $scope.ngDialogData.header},$scope.isEmpty=function(value){return _.isEmpty(value)},$scope.getNameClass=function(){return"connected"==$scope.model.ParentState?"green":"red"},$scope.getStatusIcon=function(status){switch(status){case"connected":return"on";case"wan_status_cable_disconnected":return"disconnected";case"disconnected":case"st_disabled":case"ipsec_status_aborted":return"off";default:return"pending"}}}angular.module("app").controllerProvider.register("ipsecStatDetailsCtrl",["$scope",ipsecStatDetails]);