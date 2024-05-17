"use strict";function LoginDialog2Ctrl($scope,$interval,$http,devinfo,translate){function startBanTimer(banTimeRemain){function formatStr(count){return new Date(1e3*count).toUTCString().match(/\d\d:\d\d:\d\d/)[0]}$scope.fm.banTimeRemainStr=formatStr(banTimeRemain);var intervalID=$interval(function(){banTimeRemain--,0>=banTimeRemain?($scope.fm.banTimeRemain=null,$scope.fm.banTimeRemainStr="",$scope.fm.errorMessage="",$interval.cancel(intervalID)):$scope.fm.banTimeRemainStr=formatStr(banTimeRemain)},1e3)}var body=angular.element(document.getElementsByTagName("body")),bodyClass="login_dialog_opened",data=$scope.ngDialogData,readOnlyUsername=autoconf.BR2_PACKAGE_ANWEB_CUSTOM_GCRP_28893;$scope.langList=autoconf.__lang_arr||["eng","rus"],devinfo.skipAuth.once("version").then(function(res){$scope.devInfo={},$scope.devInfo.fw_name=res.modelName,$scope.devInfo.hwRevision=res.hwRevision,$scope.devInfo.fw_version=res.version,res.lang&&translate.changeLanguage(res.lang)},function(err){console.log(err)}),$scope.fm={readOnlyUsername:readOnlyUsername,username:readOnlyUsername?autoconf.BR2_PACKAGE_ANWEB_ADMIN_NAME:"",password:"",errorMessage:data.getErrorMessage(data.authReason)||"",staySignedIn:data.staySignedIn,banReason:data.banReason,banTimeRemain:data.banTimeRemain,tryCountRemain:data.tryCountRemain,tryCount:data.tryCount},$scope.fm.banTimeRemain?(startBanTimer($scope.fm.banTimeRemain),$scope.fm.errorMessage="try-count-limit"==$scope.fm.banReason?"dlg_login_max_count_exc":"dlg_login_max_users_exc"):$scope.fm.errorMessage="",$scope.login=function(){if(!$scope.form.$invalid){var fm=$scope.fm;data.login(fm.username,fm.password,fm.staySignedIn).then(function(credentials){_.defer($scope.closeThisDialog,credentials)})["catch"](function(error){fm.banReason=error.banReason,fm.banTimeRemain=error.banTimeRemain,fm.tryCount=error.tryCount,fm.tryCountRemain=error.tryCountRemain,fm.errorMessage="try-count-limit"==fm.banReason?"dlg_login_max_count_exc":error.message,fm.banTimeRemain&&startBanTimer(fm.banTimeRemain)})}},$scope.clear=function(){$scope.fm.username="",$scope.fm.password=""},$scope.$on("ngDialog.opened",function(){body.addClass(bodyClass)}),$scope.$on("ngDialog.closing",function(){body.removeClass(bodyClass)})}