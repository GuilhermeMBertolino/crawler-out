"use strict";angular.module("app").controller("WanIpv6DynamicCtrl",["$scope","wanPageCommon",function($scope,wanPageCommon){$scope.validateDnsServers=function(){return wanPageCommon.validateDnsServers($scope.conn.DNSIPv6Server1,$scope.conn.DNSIPv6Server2)}}]);