"use strict";!function(){angular.module("app").service("dynPortMappingUtil",["cpe","device","funcs","navShared","$injector",function(cpe,device,funcs,navShared){function getConfig(){return config?config:[]}function getAttrs(){return attrs?attrs:{}}function wasActivate(){return activate}function getRule(inx){var ret={};return config&&(ret=config.Rules.find(function(rule){return Number(rule.__index)==inx})),ret}function getDefault(){return defaultRule?defaultRule:{}}var firewallShared,config=null,attrs=null,__initConfig=null,__initAttrs=null,activate=!1,defaultRule=null,converter=device.dynPortMapping.converter,paths={network:"Device.Network.",portMapping:"Device.Services.DynamicPortMapping.",mode:"Device.DeviceInfo.DeviceMode",usbConns:"Device.USB.Connection.",statistics:"Device.Statistics.DynamicPortMapping."},pullValues=[paths.network,paths.portMapping,paths.mode,paths.statistics],pullAttrs=[paths.portMapping],isFirewallMode=navShared.isFirewallMode;return{pull:function(){function success(response){var data=response[0].result.Config,dataAttr=funcs.buildTreeAttributes(response[1].result.ParameterList);return __initConfig=funcs.deepClone(data),__initAttrs=funcs.deepClone(dataAttr),config=converter.dsysinitToNative(data),attrs=converter.attrs(dataAttr,data),defaultRule=converter.defaultRule(dataAttr,isFirewallMode),activate=!0,Promise.resolve()}function error(response){return Promise.reject()}return Promise.all([cpe.GetConfig(pullValues),cpe.GetParameterAttributes(pullAttrs)]).then(success,error)},apply:function(rule,index){rule.Mode=config.Mode;var data=converter.nativeToDsysinit(rule),initRule=funcs.fetchBranch(__initConfig,paths.portMapping+rule.__index+".");initRule=initRule?funcs.setValue(paths.portMapping+rule.__index,initRule,{}):{},isFirewallMode&&!rule.__index&&firewallShared.firewallAutoConfig(data,paths.portMapping+"new_inst_1","Dual");var diff=funcs.newConfig.makeDiff(initRule,data,__initAttrs);return _.isEmpty(diff)?Promise.resolve():(activate=!1,cpe.ApplyDifference(diff))},getConfig:getConfig,getAttrs:getAttrs,removeRules:function(indexes){var newConfig=funcs.deepClone(__initConfig);_.each(indexes,function(index){funcs.cutBranch(newConfig,paths.portMapping+index)});var diff=funcs.newConfig.makeDiff(__initConfig,newConfig,__initAttrs);return cpe.ApplyDifference(diff)},getRule:getRule,getDefault:getDefault,wasActivate:wasActivate}}])}();