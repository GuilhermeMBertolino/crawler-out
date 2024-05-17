"use strict";!function(){angular.module("app").service("redirectUtil",["funcs","device","cpe",function(funcs,device,cpe){function getModulesList(){var result=nativeConfig?_.keys(nativeConfig.Modules):[];return result.filter(function(e){return"CustomHealthCheck"!=e})}var redirectPath="Device.Services.Redirect.",dsysinitConfig=null,dsysinitAttrs=null,nativeConfig=null,__initDsysinitConfig=null;return{pull:function(){function success(response){dsysinitConfig=funcs.buildTree(response[0].result.ParameterList),dsysinitAttrs=funcs.buildTreeAttributes(response[1].result.ParameterList);var redirect=funcs.newConfig.normalize(funcs.fetchBranch(dsysinitConfig,redirectPath));return nativeConfig=redirect[1]||getDefaultConfig(dsysinitAttrs),__initDsysinitConfig=angular.copy(dsysinitConfig),Promise.resolve(nativeConfig)}function getDefaultConfig(attrs){var rootAttrs=funcs.fetchBranch(attrs,redirectPath+"#template."),defaultConfig=funcs.newConfig.makeDefaultModel(rootAttrs);return defaultConfig=_.pick(defaultConfig,"Enable","Modules"),defaultConfig.Enable=!1,defaultConfig.NetworkGroup="Device.Network.Group.1.",defaultConfig}return Promise.all([cpe.GetParameterValues([redirectPath]),cpe.GetParameterAttributes([redirectPath])]).then(success)},apply:function(redirect){var curDsysinitConfig=funcs.setValue(redirectPath+"1",redirect,{}),diff=funcs.newConfig.makeDiff(__initDsysinitConfig,curDsysinitConfig,dsysinitAttrs);return cpe.ApplyDifference(diff)},getModulesList:getModulesList}}])}();