"use strict";!function(){angular.module("app").service("pingUtil",["funcs","$timeout","cpe","pingTracerouteFlow",function(funcs,$timeout,cpe,flow){function stopPing($scope){pingConnection&&pingConnection.close&&(pingConnection.close(),pingConnection=null)}function authCheck(){return cpe.GetParameterValues(["Device.Users.CurrentUser."])}var pingConnection=null;return{init:function(){return Promise.resolve()},startPing:function(params,flowDetector,$scope){var ping=params.is_ipv6?"ping6":"ping",load={method:ping,params:{host:params.host}};return _.has(params,"count")&&(load.params["-c"]=params.count.toString()),_.has(params,"packetsize")&&(load.params["-s"]=params.packetsize.toString()),_.has(params,"timeout")&&(load.params["-W"]=params.timeout.toString()),load=JSON.stringify(load),authCheck().then(function(){pingConnection=flow.start(load,flowDetector,$scope)})},stopPing:stopPing}}])}();