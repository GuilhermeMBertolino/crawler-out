"use strict";function AdBlockCtrl($scope,translate,device,$state,funcs,util,ngDialog){function success(){adblock.data=util.getData(),adblock.isActivate=!0,$scope.$emit("pageload")}function activate(){return util.pull().then(success)["catch"](errorPull)}function errorPull(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}function errorPush(){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})}var adblock={isActivate:!1,data:null,add:function(){adblock.data.Filter.push({URL:""})},remove:function(index){adblock.data.Filter.splice(index,1)},save:function(){if(!$scope.adBlockForm.$invalid){var overlay=$scope.overlay.circular,overlayId=overlay.start();util.push(adblock.data).then(activate)["catch"](errorPush)["finally"](overlay.stop.bind(overlay,overlayId))}},urlValidator:function(value,index){for(var i in adblock.data.Filter)if(value==adblock.data.Filter[i].URL&&i!=index)return"msg_error_value_is_not_uniq";return null},wasModified:function(){return util.isModified()},refresh:activate,openFileBrowser:function(path){ngDialog.open({template:"dialogs/filebrowser/dialog.tpl.html",controller:"DialogFileBrowserCtrl",resolve:funcs.getLazyResolve("dialogs/filebrowser/ctrl.lazy.js","DialogFileBrowserCtrl"),data:{title:"",path:path},scope:$scope}).closePromise.then(function(data){data.value&&(adblock.data.Path=data.value)})},changeTMPPath:function(value){adblock.data.Path=value?"/tmp":""},isPlugged:function(){return util.getStorageStatus()}};$scope.adblock=adblock,activate().then(function(){util.subscribe($scope)})}angular.module("app").controllerProvider.register("AdBlockCtrl",["$scope","translate","device","$state","funcs","adblockUtil","ngDialog",AdBlockCtrl]);