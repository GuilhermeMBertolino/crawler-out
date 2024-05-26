"use strict";!function(){angular.module("app").service("PortSettingsUtil",["$rootScope","cpe","device","devinfo","funcs","oneWayRequest",function($rootScope,cpe,device,devinfo,funcs,oneWayRequest){function applyGlobal(input){var result={};return funcs.setValue("Device.Switch.Switches.1.",{MaxReceiveFrameSize:input.maxReceiveFrameSize},result),cpe.ApplyDifference(result)}function applyGlobal(input){var result={};return funcs.setValue("Device.Switch.Switches.1.",{MaxReceiveFrameSize:input.maxReceiveFrameSize},result),cpe.ApplyDifference(result)}function makeHelper(){return new device.portSettings.Helper(config)}function getSpeedList(port){var result=[];return result.push("auto"),port.speedAvail?result=result.concat(port.speedAvail):attrs.speedList&&(result=result.concat(attrs.speedList)),result}var config=null,attrs=null,converter=device.portSettings.converter,constants={pullPaths:["Device.Switch.Ports.order","Device.Switch.Ports.*.Enable","Device.Switch.Ports.*.Alias","Device.Switch.Ports.*.Status","Device.Switch.Ports.*.Advertisement","Device.Switch.Ports.*.FlowControl","Device.Switch.Ports.*.Standard","Device.Statistics.Port.*.CrossLink","Device.Statistics.Port.*.Autonegotiation","Device.Statistics.Port.*.Speed","Device.Statistics.Port.*.Duplex","Device.Statistics.Port.*.FlowControl"],"switch":"Device.Switch.",stats:"Device.Statistics.Port."};return{preload:function(){return $rootScope.portsDefer.promise.then(function(data){config={preload:!0,ports:_.map(data,function(port){return{name:port.name}})}})},pull:function(){function success(response){return config=funcs.buildTree(response[0].result.ParameterList),attrs=converter.attrs(funcs.buildTreeAttributes(response[1].result.ParameterList)),funcs.deepClone(config),config=converter.cpeToNative(config,autoconf.BR2_PACKAGE_ANWEB_SWITCH),Promise.resolve()}function error(response){var error=response&&response.error?response.error:{};return Promise.reject(error)}return Promise.all([cpe.GetParameterValues(constants.pullPaths,void 0,!0),cpe.GetParameterAttributes([constants["switch"]],void 0,!0)]).then(success,error)},apply:function(input){var data=converter.nativeToCpe(input);return _.isEmpty(data)?Promise.resolve():oneWayRequest({req:new Promise(function(resolve,reject){cpe.ApplyDifference(data)["catch"](function(response){response&&response.error?reject():resolve()})}),minTime:3e3,maxTime:1e4})},applyGlobal:applyGlobal,subscribe:function(cb,$scope){devinfo.subscribe(constants["switch"]+"|"+constants.stats,function(response){if(response&&response[constants["switch"]]){var sw=funcs.splitTree(response[constants["switch"]]),stats=funcs.splitTree(response[constants.stats]),input=funcs.buildTree(sw.concat(stats)),ports=converter.cpeToNative(input,autoconf.BR2_PACKAGE_ANWEB_SWITCH),helper=new device.portSettings.Helper(ports);ports=helper.getData(),cb&&cb(ports)}},$scope)},makeHelper:makeHelper,getSpeedList:getSpeedList}}])}();