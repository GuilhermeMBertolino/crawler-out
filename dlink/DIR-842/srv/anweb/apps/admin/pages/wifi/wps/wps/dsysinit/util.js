"use strict";!function(){angular.module("app").service("wifiWpsUtil",["cpe","$state","devinfo","device","funcs","scheduler",function(cpe,$state,devinfo,device,funcs,scheduler){function getConfig(){return configButton?configButton:null}function getCommands(){return commands}function getScheduleWarning(){return scheduleWarning}var config,attrs,configButton,helper,inx=null,commands=null,scheduleWarning=[];return{pull:function(){function success(response){function makeButton(buttons){function makeLink(Commands){return funcs.newConfig.normalize(Commands)}var commandButton=funcs.newConfig.directTransformTemplate(buttons.Commands,makeLink);return funcs.newConfig.normalize(commandButton)}var tree=response[0].result.Config,config=funcs.deepClone(tree),buttons=funcs.newConfig.normalize(funcs.fetchBranch(config,"Device.System.Buttons."));return commands=funcs.newConfig.normalize(funcs.fetchBranch(config,"Device.System.Command.")),configButton=funcs.newConfig.directTransformTemplate(buttons,makeButton),Promise.resolve()}function error(){return Promise.reject()}return scheduleWarning=[],device.schedule.pull().then(function(){config=device.schedule.getTree(),attrs=device.schedule.getAttrs(),helper=new device.schedule.helper(initRulesConfig);var initRulesConfig=config.Device.System.Scheduler.Config;if("2.4GHz"==$state.params.freq){var band=angular.copy(device.wifi.getBand(0,"2.4GHz"));band&&(inx=band.radio.Inx)}else{var band=angular.copy(device.wifi.getBand(0,"5GHz"));band&&(inx=band.radio.Inx)}var link="Device.WiFi.Radio.",linkBroadcast=link+inx+".AccessPoint.\\d+.",linkBand=link+inx+".";inx&&device.schedule.existsLink(linkBroadcast)&&scheduleWarning.push("broadcast"),inx&&device.schedule.existsLink(linkBand)&&scheduleWarning.push("radio")}),Promise.all([cpe.GetConfig(["Device.System.Buttons.","Device.System.Command."])]).then(success,error)},getConfig:getConfig,getCommands:getCommands,getScheduleWarning:getScheduleWarning,deleteScheduler:function(type){function getBranches(rule){return _.map(indexesLink,function(indexes){return scheduler.getFullLink(rule,indexes)})}var indexes;if("radioEnable"==type)indexes=inx;else{var inxSsid=$state.params.inx||"1";indexes=[inx,inxSsid]}var indexesLink=scheduler.parseIndexesLink(indexes),branches=getBranches(type),usedBranchSchedules=helper.getUsedBranchSchedules(config,branches),newConfig=helper.getRemoveBranchConfig(config,usedBranchSchedules,branches),diff=funcs.newConfig.makeDiff(config,newConfig,attrs);return _.isEmpty(diff)?Promise.resolve():cpe.ApplyDifference(diff)},checkStatus:function(action,cb,$scope){return!0},unlock:function(){return!0},subscribeStatus:function(handler){devinfo.onceAndSubscribe("Device.Services.EasyMesh.",function(responce){var result={},easymesh=funcs.fetchBranch(responce["Device.Services.EasyMesh."],"Device.Services.EasyMesh.");"Enabled"==easymesh.Status&&(result.EasyMesh=easymesh.DeviceState,result.Enable=easymesh.Enable),handler&&handler(result)})}}}])}();