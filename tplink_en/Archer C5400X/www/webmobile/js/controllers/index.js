// JavaScript Document
su.controller("mainNavigator", ["$rootScope", "$scope", "$module", "$timeout", "$window", "$cloud", "$url", "$proxy", function($rootScope, $scope, $module, $timeout, $window, $cloud, $url, $proxy){
	//console.log($module)
	$scope.navigators = $module.navigators;
	// $scope.$watch(function(){
	// 	return $module.navigators
	// }, function(){
	// 	$scope.navigators = $module.navigators;
	// });
	$scope.showMenu=function(){
		$scope.showMenuStatus=!$scope.showMenuStatus;
	}
	$scope.$watch('showMenuStatus',function(){
		$rootScope.setHeight=$scope.showMenuStatus;
	});

	$scope.$on("layoutExecuted", function(e){
		// $timeout(function(){angular.element(document.querySelectorAll(".main-wrap")).removeClass("hidden")},1000);
		angular.element(document.querySelectorAll(".main-wrap")).removeClass("hidden");
	});

	function onReceive(eObject){
		var e = eObject.originalEvent || eObject;
	    //console.log("index receive from "+ e.origin, e.data, e)
	    if(e.origin !== $cloud.url.cloudOrigin && e.origin !== "_self" && e.origin != undefined){
	    	//offlienError.html
	    	// var name = $("#ul-nav").find(".selected a").attr("name");
      		//$.su.nav.goTo(name, $.su.app.runningModule.name);
	     	return;
	    }
	    var data = e.data;
	    if(typeof(e.data) == "string"){
	        data = JSON.parse(data);
	    }
	    if(data){
	        switch(data.eType){
	            case "ev_token": {
	            	//token过期，云页面提示用户发生错误，设备只更新token并不对云页面做其他操作，module=null
	            	$cloud.getToken(null, data.updateFlag);
	            	break;
	            }
	            case "ev_deviceInfo": {
	            	$cloud.getDeviceInfo();
	            	break;
	            }
	            //iframe resize
	            case "ev_reset": {
                    //$cloud.iframeResize($("#cloud-login"),data.height);
	                break;
	            }
	            //cloud request has no response
	            case "ev_error": {
	            	angular.element(document.querySelectorAll("#cloud-login")).attr("src","./pages/userrpm/offlineError.html");
	            	angular.element(document.querySelectorAll("#cloud-login")).css({"height": 460});//offlineError.html's default height
	            	break;
	            }
	            //cloud email has been changed, location redirect to root
	            case "ev_logout": {
	            	var h = function(){
						if (localStorage){
							localStorage.setItem("token", "");
						};
						location.href = "/";
					};

					var URL_LOGOUT = $url.format("/admin/system?form=logout");
					$proxy.request({url: URL_LOGOUT}, {
						"operation": "write"
					}, h, h);
	            	break;
	            }
	            //pwd has benn changed, send new pwd to server
	            case "ev_changePwd": {
	            	var password = data.password;
	            	// password = $.su.DES3.decrypt(password);
	            	// $("#cloud-password-hidden").password("setValue", password);
	            	//do-encrypt-pwd-control must have pwd-key first(otherwise doEncrypt function will not take effect), 
	            	//pwd-key comes from quick-setup/basic_account or other module, on which event been triggered.
	            	//for example: ("#cloud-password-hidden").password("setValue", data.password);
                    // $("#cloud-password-hidden").password("doEncrypt");
                    // password = $("#cloud-password-hidden").textbox("getValue");

                    var PASSWORD_CHANGE = $url.format("/admin/cloud_account?form=modify_cloud_pwd");
                    $proxy.request({url: PASSWORD_CHANGE}, {
                    	password: password
                    },function(){});
	            	break;
	            }
	            //iframe show after cloud index dom ready, to avoid web change
	            case "load": {
                    var params = {};
                    params.locale = $rootScope.locale;
                    params.force = $rootScope.force;
                    params.model = $rootScope.model;
                    params.eType = "ev_init";
                    var str = JSON.stringify(params);
                    window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                    $cloud.clearWaitingEvent(); //iframe load success
                    $cloud.postToken();
                    $cloud.getDeviceInfo();//false === don't have stok
                    // $("#cloud-login").show();
                    break;
                }
	            
	        }
	    }
	}
	$window.addEventListener('message', onReceive);

}]);

