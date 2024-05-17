"use strict";!function(){var ports=angular.module(regdep("ports"),[]);ports.service("ports",["cpe","funcs","devinfo",function(cpe,funcs,devinfo){return{pull:function(){function getPorts(mode){return Promise.all([cpe.GetParameterValues(["Device.Switch.Ports.*.Alias"],mode),devinfo.longTimeout.once("ports")]).then(function(response){var config=funcs.buildTree(response[0].result.ParameterList);return response[1]&&response[1].availPorts?_.map(response[1].availPorts,function(port){var obj;return port.link&&(obj=funcs.fetchBranch(config,port.link),obj&&(port.name=obj.Alias,port.alias=obj.Alias,port.isWan=obj.Alias.startsWith("WAN")||"SFP"==obj.Alias)),port}):Promise.reject()})}return cpe.GetParameterAttributes(["Device.DeviceInfo.DeviceMode."]).then(function(response){var response=funcs.buildTreeAttributes(response.result.ParameterList),modes=funcs.fetchBranch(response,"Device.DeviceInfo.DeviceMode.enum");return getPorts(_.find(modes,function(o){return"Router"==o}))})}}}])}();