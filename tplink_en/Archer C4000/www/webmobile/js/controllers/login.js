// JavaScript Document
var su = angular.module('su', ['ngTouch', 'pascalprecht.translate', 'suCommon']);

su.run(['$rootScope',"$timeout", "$translate","$proxy","$msg", function($rootScope,$timeout, $translate, $proxy, $msg){

	$rootScope.pageLoading = $msg.create({
		type: "waiting",
		text: "FORM.LOADING"
	});
	
	$rootScope.pageLoadingCount = 0;

	/*var fontSize = (document.body.clientWidth / 320).toFixed(2) * 16 ;
	angular.element(document.querySelector("html")).css({
		"font-size": fontSize + "px"
	})*/


	$proxy.request({
			url: "/cgi-bin/luci/;stok=/login?form=sysmode"
		}, {

		}, function(data) {
			if(data.mode == 'ap'){
				location.href = "/webpages/";
			}
		}
	);



	//获取产品名
	$proxy.request({
		url: "/cgi-bin/luci/;stok=/locale?form=mobile_lan",
		showLoading: false
	},{}, function(data, others){
		if(data){
			$rootScope.siteTitle = data.model;
			$rootScope.productName = data.model;
			$rootScope.locale = data.locale;
			$rootScope.force = data.force;
			$rootScope.model = data.model;
			$translate.use(data.locale);
		}
	});

	//图片预加载

	$timeout(function(){
		// console.log("start loading image", new Date().getTime())
		var img = "./theme/default/img/";

		new Image().src = img + "alert.png";

		new Image().src = img + "step-gray-a.png";
		new Image().src = img + "step-gray-p.png";
		new Image().src = img + "step-green-a.png";
		new Image().src = img + "step-green-p.png";
		new Image().src = img + "status-loading-gray.gif";

		new Image().src = img + "network-device.png";
		new Image().src = img + "network-guest.png";
		new Image().src = img + "network-internet.png";
		new Image().src = img + "network-usb.png";
		new Image().src = img + "network-wifi.png";

		new Image().src = img + "grid-row-device.png";
		new Image().src = img + "grid-row-usb.png";
		new Image().src = img + "grid-row-print.png";
		new Image().src = img + "grid-row-folder.png";

		new Image().src = img + "grid-usb.png";
		new Image().src = img + "grid-address.png";
		new Image().src = img + "grid-device.png";
		new Image().src = img + "grid-folder.png";
		new Image().src = img + "grid-list.png";
		new Image().src = img + "grid-qos.png";

		new Image().src = img + "status-loading.gif";

		var lastImage = new Image();
		lastImage.src = img + "status-loading.gif";
		lastImage.onload = function(){
			$rootScope.$broadcast("imageLoaded");
		}
	}, 500, false);
	
}]);

su.controller('login', ['$scope','$timeout', '$user', '$proxy', '$msg','$form', "$encrypt", "$rootScope", "$window", function($scope, $timeout, $user, $proxy, $msg, $form, $encrypt, $rootScope, $window) {
	var ipConflictUrl = "/cgi-bin/luci/;stok=/domain_login?form=dlogin";
	var userConflictUrl = "/cgi-bin/luci/;stok=/login?form=limit";
	var forgetPasswordUrl = "/cgi-bin/luci/;stok=/login?form=password";
	var urlCloudLogin = "/cgi-bin/luci/;stok=/login?form=cloud_login";
	var urlLogin = "/cgi-bin/luci/;stok=/login?form=login";

	$scope.$on("imageLoaded", function(e){
		// $timeout(function(){angular.element(document.querySelectorAll(".welcome-page-wrapper")).removeClass("hidden")},1000);
		angular.element(document.querySelectorAll(".welcome-page-wrapper")).removeClass("hidden");
	});

	angular.element(document.querySelectorAll(".welcome-usb")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-usb")).addClass("animation-end");
	});
	angular.element(document.querySelectorAll(".welcome-wifi")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-wifi")).addClass("animation-end");
	});
	angular.element(document.querySelectorAll(".welcome-internet")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-internet")).addClass("animation-end");
	});
	angular.element(document.querySelectorAll(".welcome-guest")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-guest")).addClass("animation-end");
	});
	angular.element(document.querySelectorAll(".welcome-device")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-device")).addClass("animation-end");
	});
	angular.element(document.querySelectorAll(".welcome-phone")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		angular.element(document.querySelectorAll(".welcome-phone")).addClass("animation-end");
		angular.element(document.querySelectorAll(".brand-logo")).removeClass("clarity");
		angular.element(document.querySelectorAll(".welcome-page-footer")).removeClass("clarity");
		angular.element(document.querySelectorAll(".brand-logo")).addClass("show-gradually");
		angular.element(document.querySelectorAll(".welcome-page-footer")).addClass("show-gradually");
	});
	angular.element(document.querySelectorAll(".welcome-page-footer")).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
		$timeout(function(){
			angular.element(document.querySelectorAll(".brand-logo")).removeClass("welcome");
			angular.element(document.querySelectorAll(".brand-logo")).removeClass("show-gradually");
			$scope.welcomepage = true;
			// var deviceHeight = document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
			// var deviceHeight = document.body.offsetHeight;
			// var formHeight = deviceHeight - 2.5 * $rootScope.rootFontSize + "px";
			// angular.element(document.querySelectorAll("#cloud-login")).css("height", formHeight);
			adjustFrameHeight();
		},600);
	});
	if (window.sessionStorage) {
        sessionStorage.findPwdBack = "";
    }
	var adjustFrameHeight = function(){
		//var deviceHeight = document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
		var deviceWidth = document.body.offsetWidth;
		var deviceHeight = document.body.offsetHeight;
		if($window.orientation == 90 || $window.orientation == -90 || deviceWidth > deviceHeight){
			var frameHeight = deviceHeight - 2.5 * $rootScope.rootFontSize + "px";
		}else{
			var frameHeight = deviceHeight - 2.5 * $rootScope.rootFontSize + "px";
		}
		angular.element(document.querySelectorAll("#cloud-login")).css("height", frameHeight);
	};
	angular.element($window).bind("orientationchange", function(){
		$timeout(function(){
			adjustFrameHeight();
		}, 100);
	});

	$scope.loginShow = true;
	
	$form.config($scope, {
		proxy: {
			url: "/cgi-bin/luci/;stok=/login?form=check_factory_default"
		},
		autoLoad: false
	});

	var cloudLogined = false;

	$scope.firmwareDefault = false;
	$scope.form.load({}, function(data){
		if(data.is_default == true){
			$scope.loginType = "initial";
			$scope.firmwareDefault = true;
			cloudLogined = false;
			angular.element(document.querySelectorAll("div.login-main-header")).removeClass("cloud-login");
		}
		else if(data.cloud_ever_login == false){
			$scope.loginType = "normal";
			$scope.firmwareDefault = false;
			cloudLogined = false;
			angular.element(document.querySelectorAll("div.login-main-header")).removeClass("cloud-login");
		}
		else{
			$scope.loginType = "cloud";
			$scope.firmwareDefault = false;
			cloudLogined = true;
			angular.element(document.querySelectorAll("div.login-main-header")).addClass("cloud-login");
		}
	});

	$scope.form.switchDevice = {};
	$scope.form.switchDevice.options =[
		{value: "phone", text:"LOGIN.PHONE"},
		{value: "pc", text: "LOGIN.PC"}
	]

	$scope.$watch(function(){return $scope.form.switchDevice.data}, function(newVal, oldVal){
		if(newVal === "pc" && newVal !== oldVal){
			location.href = "/webpages/";
		}
	})

	//$scope.form.login = {};

	//登陆流程 
	//ip冲突
	$proxy.request({
		url: ipConflictUrl
	}, {}, function(data, others) {
		if (data && data.conflict === true) {
			var options0 = {
				id: "ip-conflict-situation-0",
				iconCls: "alert",
				cancelBtn: {
					show: false
				},
				okBtn: {
					show: true,
					text: "LOGIN.CONTINUE"
				}
			};

			var options1 = {
				id: "ip-conflict-situation-1",
				iconCls: "alert",
				cancelBtn: {
					show: false
				},
				okBtn: {
					show: false
				}
			};

			var sit0 = $msg.create(options0);
			var sit1 = $msg.create(options1);
			$scope.ipConflictNew = function(){
				sit1.close();
			}
			switch (data.mode) {
				case 0:
					sit1.close();
					sit0.show();
					$scope.ipConflictNew0 = data.new_addr;
					break;
				case 1:
					sit0.close();
					sit1.show();
					$scope.newUrl = "http://" + data.dst_addr + data.dst_webpath;
					$scope.ipConflictDst1 = data.dst_addr;
					$scope.ipConflictNew1 = data.new_addr;
					break;
			}

		}

		if (data && data.redirect) {
			location.href = data.redirect;
		}
	});


	//cookie check
	var noCookieMsg = $msg.create({
		iconCls: "alert",
		content: "LOGIN.NO_COOKIE"
	});

	if ($user.checkCookie()) {
		noCookieMsg.close();
	} else {
		noCookieMsg.show();
	}

	var usename = "",
		password = "";

	$scope.doEncrypt = function(formPassword) {
		var key = formPassword.key;
		var value = formPassword.inputData;
		if(angular.isObject(formPassword.encryption)){
			var encrypt = formPassword.encryption.method;
			var encryptParam = formPassword.encryption.params;

			var check = true;
			var param = [];
			for (var index = 0, len = encryptParam.length; index < len; index++) {
				var name = encryptParam[index];
				if (key[name] == null || key[name] == undefined) {
					check = false;
					break;
				}else{
					param[index] = key[name];
				};
			};
			if (check&&value!=undefined) {
				formPassword.data = encrypt(value, param);
			}else{
				formPassword.data = value;
			};
		}else{
			formPassword.data = value;
		}
	};

	$scope.$on("login-data", function(e, data){
		if(data.username){
			username = data.username;
		}
		if(data.password){
			var formPassword = angular.copy(data.password);
			// var submitPassword = $scope.doEncrypt(formPassword);
			// password = submitPassword;
			password = formPassword.data;
		}
	});

	$scope.userConflictMsg = $msg.create({
		id: "user-conflict-msg-container",
		iconCls: "alert",
		autoClose: false,
		autoDestory: true,
		cancelBtn: {
			show: true,
			text: "FORM.CONTINUE",
			handler: function(){
				if(cloudLogined){
					$proxy.request({
						url: urlCloudLogin
					}, {
						"operation": "login",
						"username": username,
						"password": password,
						"confirm": true
					}, function(data, others, status) {
						var token = data.stok || (function() {
							var stok = "12345",
								href = top.location.href;
							var stokPos = href.indexOf("stok=");
							if (stokPos >= 0) {
								stok = href.substring(stokPos + 5);
							};
							return stok;
						})();

						if (localStorage) {
							localStorage.setItem("token", token);
							location.href = "./";
						};
					}, function(errorcode, others, data){
						var err = data.errorcode;
						if(err){
							err = String(err).replace(/^-/, 'E');
							if(err && $cloud.cloudErrorCode.indexOf(err) != -1){
								if(err == "E5001"){
									$scope.errorInfo = {
										email: data.ownerAccount
									};
			                    }
								$scope.errorcode = "ERROR." + err;
								$scope.cloudErrorMsg.show();
								return;
							}
						}else if(errorcode){
							switch (errorcode){
								case "user conflict":
									$scope.userConflictMsg.show();
									break;
								case "login failed":
									if(data){
										var num1 = data.failureCount;
				                    	var num2 = data.attemptsAllowed;
				                    	var num3 = num2 + num1;
				                    	if(num1 >= num2){
				                    		$scope.leftAttemptsInfo = {
				                    			num1: num1,
				                    			num2: num2
				                    		}
				                    		$scope.leftAttemptsMsg.show();
				                    	} else {
				                    		var failed = $msg.create({
				                    			type:"failure",
				                    			text: "LOGIN.LOGIN_FAILED"
				                    		});
				                    		failed.show();
				                    	}
									} else{
										var failed = $msg.create({
			                    			type:"failure",
			                    			text: "LOGIN.LOGIN_FAILED"
			                    		});
			                    		failed.show();
									}
									
			                    	break;
			                    case "exceeded max attempts":
			                    	if(data){
				                    	var num1 = data.failureCount;
					                    var num2 = data.attemptsAllowed;
					                    var num3 = num2 + num1;
					                    $scope.maxAttemptsInfo = {
				                			num: num3
				                		}
				                		$scope.maxAttemptsMsg.show();
				                	} else {
										var failed = $msg.create({
			                    			type:"failure",
			                    			text: "LOGIN.LOGIN_FAILED"
			                    		});
			                    		failed.show();
									}
			                		break;
			                	default:
			                		break;
							}
						}
					});
				}
				else{
					$proxy.request({
						url: urlLogin
					}, {
						"operation": "login",
						"password": password,
						"confirm": true
					}, function(data, others, status){
						var token = data.stok || (function() {
							var stok = "12345",
								href = top.location.href;
							var stokPos = href.indexOf("stok=");
							if (stokPos >= 0) {
								stok = href.substring(stokPos + 5);
							};
							return stok;
						})();

						if (localStorage) {
							localStorage.setItem("token", token);
							location.href = "./";
						};
					}, function(errorcode, others, data){
						switch (errorcode){
							case "user conflict":
								$scope.userConflictMsg.show();
								break;
							case "login failed":
								if(data){
									var num1 = data.failureCount;
			                    	var num2 = data.attemptsAllowed;
			                    	var num3 = num2 + num1;
			                    	if(num1 >= num2){
			                    		$scope.leftAttemptsInfo = {
			                    			num1: num1,
			                    			num2: num2
			                    		}
			                    		$scope.leftAttemptsMsg.show();
			                    	} else {
			                    		var failed = $msg.create({
			                    			type:"failure",
			                    			text: "LOGIN.LOGIN_FAILED"
			                    		});

			                    		failed.show();
			                    	}
								} else{
									var failed = $msg.create({
		                    			type:"failure",
		                    			text: "LOGIN.LOGIN_FAILED"
		                    		});

		                    		failed.show();
								}
								
		                    	break;
		                    case "exceeded max attempts":
		                    	if(data){
			                    	var num1 = data.failureCount;
				                    var num2 = data.attemptsAllowed;
				                    var num3 = num2 + num1;
				                    $scope.maxAttemptsInfo = {
			                			num: num3
			                		}
			                		$scope.maxAttemptsMsg.show();
			                	} else {
									var failed = $msg.create({
		                    			type:"failure",
		                    			text: "LOGIN.LOGIN_FAILED"
		                    		});

		                    		failed.show();
								}
		                		break;
						}
					});
				}
				$scope.userConflictMsg.close();
			}
		},
		okBtn: {
			show: true,
			text: "FORM.CANCEL",
			handler: function(){
				$scope.userConflictMsg.close();
			}
		}
	});

	$scope.leftAttemptsMsg = $msg.create({
		id: "left-attempts-msg-container",
		iconCls: "alert"
	});

	$scope.maxAttemptsMsg = $msg.create({
		iconCls: "alert",
		id: "max-attempts-msg-container"
	});

	$scope.cloudErrorMsg = $msg.create({
		iconCls: "alert",
		id: "cloud-error-msg"
	});

	var cloudLoadingMsg = $msg.create({
		type: "waiting",
		tag: "cloud-loading",
		text: "FORM.LOADING",
		autoDestory: false
	});

	$scope.$on("to-login", function(e, data){
		$scope.$broadcast("to-firstLogin", data);
	});

}]);

su.controller('firstLogin', ['$scope','$timeout', '$user', '$proxy', '$msg','$form', "$encrypt", "$rootScope", function($scope, $timeout, $user, $proxy, $msg, $form, $encrypt, $rootScope) {
	var URL_INIT_LOGIN = "/cgi-bin/luci/;stok=/login?form=initial_login";

	$proxy.request({
		url: "/cgi-bin/luci/;stok=/locale?form=mobile_lan",
		showLoading: false
	},{}, function(data, others){
		if(data){
			$scope.loginInfo = {
				model: data.model
			};
		}
	});
	
	var options = {
		proxy: {
			url: URL_INIT_LOGIN
		},
		fields: [{
			name: "confirm",
			maxLength: 32,
	        minLength: 1,
	        allowBlank: false,
	        validatechange: function(){
	        	var new_pwd = $scope.form.data.password.inputData;
		        var cfm_val = $scope.form.data.confirm.inputData;
		        if(new_pwd == '' || cfm_val == '') {
		            $scope.form.data.confirm.setNormal();
		            return true;
		        }
		        if (new_pwd != cfm_val){
		        	$scope.form.data.confirm.data = false;
		            $scope.form.data.confirm.setError("ERROR.e000048");
		            return false;
		        }else{
		        	$scope.form.data.confirm.data = true;
		            $scope.form.data.confirm.setNormal();
		            return true;
		        };
	        }
		},{
			name: "password",
			maxLength: 32,
	        minLength: 1,
	        allowBlank: false
		}],
		autoLoad: false,
		prompt: {
			show: false
		}
	};

	$form.config($scope, options);

	$scope.$on("to-firstLogin", function(e, data){
		$scope.form.loadData(data);
	});
	$scope.form.load({}, function(){
		// $timeout(function(){
		// 	$scope.welcomepage = true;
		// },2000);
	});

	$scope.form.data.confirm.encryption = "confirm";
	$scope.form.data.password.encryption = {
		name: "rsa",
		method: $encrypt.rsa,
		params: ["n", "e"]
	};

	$scope.form.submitBtn = {};

	$scope.login = function() {
		$timeout(function(){document.activeElement.blur();});
		if ($user.checkCookie()) {
			$user.login($scope, {
				operation: "login"
			}, function(data, others) {
				var token = data.stok || (function() {
					var stok = "12345",
						href = top.location.href;
					var stokPos = href.indexOf("stok=");
					if (stokPos >= 0) {
						stok = href.substring(stokPos + 5);
					};
					return stok;
				})();

				if (localStorage) {
					localStorage.setItem("token", token);
					location.href = "./";
				};
				
			}, function(errorcode, others, data) {
				switch (errorcode){
					case "user conflict":
						$scope.$parent.userConflictMsg.show();
						break;
					case "login failed":
						if(data){
							var num1 = data.failureCount;
	                    	var num2 = data.attemptsAllowed;
	                    	var num3 = num2 + num1;
	                    	if(num1 >= num2){
	                    		$scope.$parent.leftAttemptsInfo = {
	                    			num1: num1,
	                    			num2: num2
	                    		}
	                    		$scope.$parent.leftAttemptsMsg.show();
	                    	} else {
	                    		var failed = $msg.create({
	                    			type:"failure",
	                    			text: "LOGIN.LOGIN_FAILED"
	                    		});

	                    		failed.show();
	                    	}
						} else{
							var failed = $msg.create({
                    			type:"failure",
                    			text: "LOGIN.LOGIN_FAILED"
                    		});

                    		failed.show();
						}
						
                    	break;
                    case "exceeded max attempts":
                    	if(data){
	                    	var num1 = data.failureCount;
		                    var num2 = data.attemptsAllowed;
		                    var num3 = num2 + num1;
		                    $scope.$parent.maxAttemptsInfo = {
	                			num: num3
	                		}
	                		$scope.$parent.maxAttemptsMsg.show();
	                	} else {
							var failed = $msg.create({
                    			type:"failure",
                    			text: "LOGIN.LOGIN_FAILED"
                    		});

                    		failed.show();
						}
                		break;
				}
				
			});
		}
	}


}]);

su.controller('normalLogin', ['$scope','$timeout', '$user', '$proxy', '$msg','$form', "$encrypt", function($scope, $timeout, $user, $proxy, $msg, $form, $encrypt) {
	var URL_LOGIN = "/cgi-bin/luci/;stok=/login?form=login";
	var forgetPasswordUrl = "/cgi-bin/luci/;stok=/login?form=password";

	var options = {
		proxy: {
			url: URL_LOGIN
		},
		fields: [{
			name: "password",
			maxLength: 32,
	        minLength: 1,
	        allowBlank: false
		}],
		autoLoad: false,
		prompt: {
			show: false
		}
	};

	$form.config($scope, options);

	$scope.form.load({}, function(data){
		$scope.$emit("to-login", data);
	});

	$scope.form.data.password.encryption = {
		name: "rsa",
		method: $encrypt.rsa,
		params: ["n", "e"]
	};

	$scope.login = function() {
		$timeout(function(){document.activeElement.blur();});
		if ($user.checkCookie()) {
			$user.login($scope, {
				operation: "login"
			}, function(data, others) {
				var token = data.stok || (function() {
					var stok = "12345",
						href = top.location.href;
					var stokPos = href.indexOf("stok=");
					if (stokPos >= 0) {
						stok = href.substring(stokPos + 5);
					};
					return stok;
				})();

				if (localStorage) {
					localStorage.setItem("token", token);
					location.href = "./";
				};
				
			}, function(errorcode, others, data) {
				switch (errorcode){
					case "user conflict":
					var loginData = {};
						loginData.password = $scope.form.data.password;
						$scope.$emit("login-data", loginData);
						$scope.$parent.userConflictMsg.show();
						break;
					case "login failed":
						if(data){
							var num1 = data.failureCount;
	                    	var num2 = data.attemptsAllowed;
	                    	var num3 = num2 + num1;
	                    	if(num1 >= num2){
	                    		$scope.$parent.leftAttemptsInfo = {
	                    			num1: num1,
	                    			num2: num2
	                    		}
	                    		$scope.$parent.leftAttemptsMsg.show();
	                    	} else {
	                    		var failed = $msg.create({
	                    			type:"failure",
	                    			text: "LOGIN.LOGIN_FAILED"
	                    		});

	                    		failed.show();
	                    	}
						} else{
							var failed = $msg.create({
                    			type:"failure",
                    			text: "LOGIN.LOGIN_FAILED"
                    		});

                    		failed.show();
						}
						
                    	break;
                    case "exceeded max attempts":
                    	if(data){
	                    	var num1 = data.failureCount;
		                    var num2 = data.attemptsAllowed;
		                    var num3 = num2 + num1;
		                    $scope.$parent.maxAttemptsInfo = {
	                			num: num3
	                		}
	                		$scope.$parent.maxAttemptsMsg.show();
	                	} else {
							var failed = $msg.create({
                    			type:"failure",
                    			text: "LOGIN.LOGIN_FAILED"
                    		});

                    		failed.show();
						}
                		break;
				}
				
			});
		}
	}

	$scope.form.submitBtn = {};

	var forgotPasswordMsg = $msg.create({
		iconCls: "alert",
		content: "LOGIN.FORGET_PASSWORD_NOTE_2"
	});

}]);

su.controller('cloudLogin', ['$scope','$timeout', '$user', '$proxy', '$msg','$form', "$encrypt", "$cloud", "$window", "$rootScope", function($scope, $timeout, $user, $proxy, $msg, $form, $encrypt, $cloud, $window, $rootScope) {
	
	var loginUrl = "/cgi-bin/luci/;stok=/login?form=cloud_login";

	var options = {
		proxy: {
			url: loginUrl
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
	});

	$scope.form.data.password.encryption = {
		name: "rsa",
		method: $encrypt.rsa,
		params: ["n", "e"]
	};

	$scope.login = function() {
		$timeout(function(){document.activeElement.blur();});
		if ($user.checkCookie()) {
			$user.login($scope, {
				operation: "login"
			}, function(data, others) {
				var token = data.stok || (function() {
					var stok = "12345",
						href = top.location.href;
					var stokPos = href.indexOf("stok=");
					if (stokPos >= 0) {
						stok = href.substring(stokPos + 5);
					};
					return stok;
				})();

				if (localStorage) {
					localStorage.setItem("token", token);
					location.href = "./";
				};
				
			}, function(errorcode, others, data) {
				var err = data.errorcode;
				if(err){
					err = String(err).replace(/^-/, 'E');
					if(err && $cloud.cloudErrorCode.indexOf(err) != -1){
						if(err == "E5001"){
							$scope.$parent.errorInfo = {
								email: data.ownerAccount
							};
	                    }
						$scope.$parent.errorcode = "ERROR." + err;
						$scope.$parent.cloudErrorMsg.show();
						return;
					}
				}else if(errorcode){
					switch (errorcode){
						case "user conflict":
							var loginData = {};
							loginData.username = $scope.form.data.username.data;
							loginData.password = $scope.form.data.password;
							$scope.$emit("login-data", loginData);
							$scope.$parent.userConflictMsg.show();
							break;
						case "login failed":
							if(data){
								var num1 = data.failureCount;
		                    	var num2 = data.attemptsAllowed;
		                    	var num3 = num2 + num1;
		                    	if(num1 >= num2){
		                    		$scope.$parent.leftAttemptsInfo = {
		                    			num1: num1,
		                    			num2: num2
		                    		}
		                    		$scope.$parent.leftAttemptsMsg.show();
		                    	} else {
		                    		var failed = $msg.create({
		                    			type:"failure",
		                    			text: "LOGIN.LOGIN_FAILED"
		                    		});
		                    		failed.show();
		                    	}
							} else{
								var failed = $msg.create({
	                    			type:"failure",
	                    			text: "LOGIN.LOGIN_FAILED"
	                    		});
	                    		failed.show();
							}
							
	                    	break;
	                    case "exceeded max attempts":
	                    	if(data){
		                    	var num1 = data.failureCount;
			                    var num2 = data.attemptsAllowed;
			                    var num3 = num2 + num1;
			                    $scope.$parent.maxAttemptsInfo = {
		                			num: num3
		                		}
		                		$scope.$parent.maxAttemptsMsg.show();
		                	} else {
								var failed = $msg.create({
	                    			type:"failure",
	                    			text: "LOGIN.LOGIN_FAILED"
	                    		});
	                    		failed.show();
							}
	                		break;
	                	default:
	                		break;
					}
				}
			});
		}
	}

	$scope.form.forgotPassword = {};
	$scope.forgotPassword = function(){
		angular.element(document.querySelectorAll("#cloud-login-wrap")).removeClass("hidden");
		onReceive({data:{eType:"ev_goto",url:"findPwdMobile"},source:null,origin:"_self"});
	}
	$scope.form.submitBtn = {};

	$scope.signUp = function(){
		angular.element(document.querySelectorAll("#cloud-login-wrap")).removeClass("hidden");
		onReceive({data:{eType:"ev_goto",url:"registerMobile"},source:null,origin:"_self"});
	}

	for(var i=0; i<$msg.statusMessage.length; i++){
		if($msg.statusMessage[i].tag == "cloud-loading"){
			var waitingMsg = $msg.statusMessage[i];
		}
	}

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
                        $cloud.getToken(data.url, null, false);
                    }
                    else{
                        if(data.index == "activation"){
                            ;
                        }
                    }
                    if("login" == data.url || "login" == data.index){
                        angular.element(document.querySelectorAll(".login-main-wrap")).removeClass("hidden");
                        angular.element(document.querySelectorAll("#cloud-login-wrap")).addClass("hidden");
                    }
                    else if("findPwdMobile" == data.url || "findPwdMobile" == data.index){
                        angular.element(document.querySelectorAll(".login-main-wrap")).addClass("hidden");
                        //waitingMsg.show();
                    }
                    else if("registerMobile" == data.url || "registerMobile" == data.index){
                    	angular.element(document.querySelectorAll(".login-main-wrap")).addClass("hidden");
                    	//waitingMsg.show();
                    }
                    break;
                }
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
                    $cloud.getDeviceInfo(false);//false === don't have stok
                    angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
                }
                case "ev_reset": {
                    $cloud.iframeResize(angular.element(document.querySelectorAll("#cloud-login")), data.height);
                    break;
                }
                //cloud request has no response
                case "ev_error": {
                    // angular.element(document.querySelectorAll("#cloud-login")).attr("src","./pages/userrpm/offlineError.html");
                    // $("#cloud-login").css({"height": 460});//offlineError.html's default height
                    break;
                }
                case "ev_windowResize": {
                    var hasFrame = false;
                    try{
                        window.frames["cloud-login"] && window.frames["cloud-login"].name;
                    }catch(error){
                        hasFrame = true;
                    }
                    if(hasFrame){
                        // var params = {};
                        // params.eType = "ev_windowResize";
                        // params.windowHeight = $(window).height() - 90;//window's height - headHeight
                        // params.windowWidth = $(window).width();//window's width
                        // params.iframeTop = $("#cloud-login").offset().top //iframe top
                        // var str = JSON.stringify(params);
                        // window.frames["cloud-login"].postMessage(str, $.su.url.cloudOrigin);
                    }
                }
            }
        }
    }
    
    angular.element(window).on("message", onReceive);
    angular.element(window).on("ev_watingTimeout", function(){
    	$cloud.clearWaitingEvent();
        // angular.element(document.querySelectorAll("#cloud-login")).attr("src","./partials/offlineError.html");
        angular.element(document.querySelectorAll("#cloud-login")).removeClass("hidden");
        waitingMsg.close();
    });

    // $timeout(function() {angular.element(document.querySelectorAll("#cloud-login")).triggerHandler('click');}, 0);
    // angular.element(window).on("", function(){console.log(1)});
    // console.log(angular.element(window), window, angular.element(document.querySelectorAll("#cloud-login")));

	
}]);
