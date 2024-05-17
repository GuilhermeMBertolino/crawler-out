"use strict";!function(){angular.module("app").service("StatsDHCPUtil",["cpe","device","devinfo","funcs","statsDHCPConstants",function(cpe,device,devinfo,funcs,constants){function makeHelper(){return new device.statsDHCP.Helper(config)}var config=null,converter=device.statsDHCP.converter;return{pull:function(){function success(response){return config=funcs.buildTree(response[0].result.ParameterList),config=converter.dsysinitToNative(config),Promise.resolve()}function error(response){return Promise.reject()}return Promise.all([cpe.GetParameterValues([constants.servers,constants.stats])]).then(success,error)},subscribeInfo:function(cb,$scope){devinfo.onceAndSubscribe(constants.servers+"|"+constants.stats,function(response){if(response&&response[constants.servers]){var servers=funcs.splitTree(response[constants.servers]),stats=funcs.splitTree(response[constants.stats]),input=servers.concat(stats),data=converter.dsysinitToNative(funcs.buildTree(input));cb&&cb(data)}},$scope)},makeHelper:makeHelper}}])}();