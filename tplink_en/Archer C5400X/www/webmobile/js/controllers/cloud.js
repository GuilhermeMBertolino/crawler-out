// JavaScript Document
su.controllerProvider.register("cloud", ["$scope", "$form", "$msg", "$proxy", "$url", "$tool", "$timeout", "$cloud", "$encrypt", "$window", "$user", "$rootScope", function($scope, $form, $msg, $proxy, $url, $tool, $timeout, $cloud, $encrypt, $window, $user, $rootScope) {
	//
	var cloudLogin = false;
	var adjustFrameHeight = function(){
		//var deviceHeight = document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
		var deviceWidth = document.body.offsetWidth;
		var deviceHeight = document.body.offsetHeight;
		if($window.orientation == 90 || $window.orientation == -90 || deviceWidth > deviceHeight){
			var frameHeight = deviceHeight - 2.5 * $rootScope.rootFontSize + "px";
		}else{
			var frameHeight = deviceHeight - 2.5 * $rootScope.rootFontSize + "px";
		}
		angular.element(document.querySelectorAll("#cloud-page")).css("height", frameHeight);
		//angular.element(document.querySelectorAll(".cloud-login-form")).css("height", frameHeight);
		angular.element(document.querySelectorAll("#cloud-login")).css("height", frameHeight);
	};
	adjustFrameHeight();

	angular.element($window).bind("orientationchange", function(){
		$timeout(function(){
			adjustFrameHeight();
		}, 600);
	});
	
	var URL_CLOUD_LOGIN = $url.format("/admin/cloud_account?form=user_login");
	var URL_CHECK_LOGIN = $url.format("/admin/cloud_account?form=check_login");
	var URL_CHECK_INTERNET = $url.format("/admin/cloud_account?form=check_internet");
	var URL_CHECK_CONNECTION = $url.format("/admin/cloud_account?form=check_cloud_connection");
	var URL_CLOUD_CHANGENAME = $url.format("/admin/cloud_account?form=tmp_cmd");

	var options = {
		proxy: {
			url: URL_CLOUD_LOGIN
		},
		fields: [{
			name: "username",
			allowBlank: false,
	        vtype: "email",
	        maxLength: 64
		},{
			name: "password",
			maxLength: 32,
	        minLength: 6,
	        allowBlank: false
		}],
		autoLoad: false,
		prompt: {
			show: false
		}
	};

	$form.config($scope, options);

	$scope.form.load({}, function(){
		// $timeout(function(){
		// 	$scope.welcomepage = true;
		// },2000);
		$scope.pageLoading.close();
	});

	$scope.form.data.password.encryption = {
		name: "rsa",
		method: $encrypt.rsa,
		params: ["n", "e"]
	};

	$scope.islogined = false;
	
	$proxy.request({url:URL_CHECK_INTERNET}, {}, function(data, others, status){
		
		$proxy.request({url: URL_CHECK_CONNECTION}, {}, function(data, others, status){

	$proxy.request({url:URL_CHECK_LOGIN}, {}, function(data, others, status){
		if(data.islogined){
			$scope.islogined = true;
    		angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
				onReceive({data:{eType:"ev_goto",url:"cloudServices"},source:null,origin:"_self"});
				}else{
				angular.element(document.querySelectorAll(".cloud-login-form")).removeClass("hidden");
		}
	}, function(){
			angular.element(document.querySelectorAll(".cloud-login-form")).removeClass("hidden");
			});

		}, function(){
			angular.element(document.querySelectorAll(".cloud-no-device")).removeClass("hidden");
		});
	}, function(){
		angular.element(document.querySelectorAll(".cloud-offline")).removeClass("hidden");
	});
	
	$scope.forgotPassword = function(){
		angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
		onReceive({data:{eType:"ev_goto",url:"findPwdMobile"},source:null,origin:"_self"});
	}

	$scope.signUp = function(){
		angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
		onReceive({data:{eType:"ev_goto",url:"registerMobile"},source:null,origin:"_self"});
	}

	$scope.login = function(){
		var username = "username";
		var password = "123456789";
		onReceive({data:{eType:"ev_login",account:{cloudUserName: username, cloudPassword: password}},source:null,origin:"_self"});
	}

	var loginFailedMsg = $msg.create({
		id: "login-failed-msg",
		iconCls: "alert",
		autoClose: false,
		okBtn: {
			show: true,
			text: "FORM.OK",
			handler: function() {
				loginFailedMsg.close();
			}
		},
		cancelBtn: {
			show: false,
			text: "FORM.CANCEL",
			cls: "cancel",
			btnCls: "btncancel",
			handler: function() {
				loginFailedMsg.close();
			}
		}
	});

	function onReceive(eObject){
        var e = eObject.originalEvent || eObject;
        // console.log("login.html receive from "+ e.origin, e.data, e)
        if(e.origin !== $cloud.url.cloudOrigin && e.origin !== "_self" && e.origin != undefined){
            return;
        }
        var data = e.data;
        if(typeof(e.data) == "string"){
            data = JSON.parse(data);
        }
        if(data){
            switch(data.eType){
                //module change
                case "ev_goto": {
                    if(data.url){
                        //getToken and set iframe's src, then set wating event(10s timeout)
                        $cloud.getToken(data.url);
                    }
                    else{
                        if(data.index == "activation"){
                            ;
                        }
                    }
                    if("login" == data.url || "login" == data.index){
                        angular.element(document.querySelectorAll(".cloud-login-form")).removeClass("hidden");
                        angular.element(document.querySelectorAll("#cloud-login")).addClass("hidden");
                    }
                    else if("findPwdMobile" == data.url || "findPwdMobile" == data.index){
                        angular.element(document.querySelectorAll(".cloud-login-form")).addClass("hidden");
                    }
                    else if("registerMobile" == data.url || "registerMobile" == data.index){
                    	angular.element(document.querySelectorAll(".cloud-login-form")).addClass("hidden");
                    }
                    else if("cloudServices" == data.url || "cloudServices" == data.index){
                    	angular.element(document.querySelectorAll(".cloud-login-form")).addClass("hidden");
                    	angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
                    }
                    break;
                }
                case "ev_unbind": {
                	var URL_UNBIND_ACCOUNT = $url.format("/admin/cloud_account?form=cloud_unbind");
                	var URL_LOGOUT = $url.format("/admin/system?form=logout");

                	var h = function(){
						if (localStorage){
							localStorage.setItem("token", "");
						};
						location.href = "/";
					};

					$proxy.request({url: URL_UNBIND_ACCOUNT}, {"operation": "write"}, function(){
						$proxy.request({url: URL_LOGOUT}, {
							"operation": "write"
						}, h, h);
					}, function(errcode, others, data){
						var errorcode = data.errorcode;
	                    errorcode && (errorcode = String(errorcode).replace(/^-/, 'E'));
	                    if(errorcode && $cloud.cloudErrorCode.indexOf(errorcode) != -1){
	                        var errorType = "ERROR." + errorcode;
	                        loginFailedMsg.content = errorType;
	                        loginFailedMsg.show();
	                    }
					}, function(){
					});
                	break;
                }
                case "ev_login": {
                	$user.login($scope, {
						"operation": "write"
					}, function(data, others){
						onReceive({data:{eType:"ev_goto",url:"cloudServices"},source:null,origin:"_self"});
					}, function(errorcode, others, data){
						var errorcode = data.errorcode;
	                    errorcode && (errorcode = String(errorcode).replace(/^-/, 'E'));
	                    if(errorcode && $cloud.cloudErrorCode.indexOf(errorcode) != -1){
	                        var errorType = "ERROR." + errorcode;
	                        loginFailedMsg.content = errorType;
	                        loginFailedMsg.show();
	                    }
					}, function(){
						loginFailedMsg.content = "ERROR.E5000";
	                    loginFailedMsg.show();
					});
					break;
                }
                case "ev_checkPwd": {
                	var operationType = data.operation;
                	$scope.form.data.username.data = data.account.cloudUserName;
                	$scope.form.data.password.inputData = data.account.cloudPassword;
                	$scope.form.submit({
                	}, function(data, others){
                		var params = {};
                		params.eType = "ev_checkPwdResult";
                		params.operation = operationType;
                		params.pwdCorrect = true;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	}, function(errorcode, others, status){
                		var params = {};
                		params.eType = "ev_checkPwdResult";
                		params.operation = operationType;
                		params.pwdCorrect = false;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	}, function(){
                		var params = {};
                		params.eType = "ev_checkPwdResult";
                		params.operation = operationType;
                		params.pwdCorrect = false;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	}, true, false);
                	break;
                }
                case "ev_changeName": {
                	var newName = data.newName;
                	$proxy.request({url:URL_CLOUD_CHANGENAME}, {
                		"operation": "set_dev_info",
                		"alias": newName
                	}, function(data, others, status){
                		var params = {};
                		params.eType = "ev_changeNameResult";
                		params.errorCode = true;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	}, function(errorcode, others, status){
                		var params = {};
                		params.eType = "ev_changeNameResult";
                		params.errorCode = false;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	}, function(data, status){
                		var params = {};
                		params.eType = "ev_changeNameResult";
                		params.errorCode = false;
                		var str = JSON.stringify(params);
		        		window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $cloud.url.cloudOrigin);
                	});
                	break;
                }
                case "ev_showMask": {
                	angular.element(document.querySelectorAll(".cloud-mask")).removeClass("hidden");
                	break;
                }
                case "ev_hideMask": {
                	angular.element(document.querySelectorAll(".cloud-mask")).addClass("hidden");
                	break;
                }
            }
        }
    }

    $window.addEventListener('message', onReceive);

	
	
}]);