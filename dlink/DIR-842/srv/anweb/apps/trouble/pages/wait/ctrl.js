"use strict";angular.module("trouble").controller("waitCtrl",["$scope","$timeout","$state","devinfo","checkPing",function($scope,$timeout,$state,devinfo,checkPing){$scope.WAIT_TIMEOUT=3e4;var connected=!1,stamp=Date.now(),pingDelay=5e3;~["l2tp","pptp","pppoe","pppoedual","pppoev6"].indexOf($scope.connType)&&($scope.WAIT_TIMEOUT+=45e3),$scope.onBarStatus=function(status){connected||"finished"==status&&$scope.showNextError()},devinfo.once("net").then(function(data){data&&"wait"==$state.current.name&&!function nextCheckPing(){$timeout(function(){console.log("check started"),checkPing.check({is_ipv6:!!data.ipv6gw,work_timeout:pingDelay}).then(function(){connected=!0,$scope.forceConnectedState(),console.log("check successful")})["catch"](function(){console.log("check failed")})["finally"](function(){connected||$scope.WAIT_TIMEOUT-pingDelay<Date.now()-stamp?console.log("check stop"):nextCheckPing()})},pingDelay)}()})}]);