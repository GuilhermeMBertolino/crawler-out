 // JavaScript Document
var su = angular.module('su', ['ngRoute', 'ngTouch', 'pascalprecht.translate', 'suCommon']);

/*
 * 模块注册
 */
su.run(['$rootScope', '$timeout', '$route',"$location", "$translate",'$module',"$msg", "$proxy", "$url","$user", function($rootScope, $timeout, $route, $location, $translate, $module, $msg, $proxy, $url, $user){

	// 判断是否有token
	if($user.getToken() === ""){
		location.href = "./login.html"
	}

	var options = {
		url: $url.format("/admin/menu?form=mobile_menu")
	};
	
	$rootScope.pageLoading = $msg.create({
		type: "waiting",
		text: "FORM.LOADING"
	});

	$rootScope.pageLoadingCount = 0;

	$rootScope.menuDisabled = false;
	$rootScope.firstLog = false;

	$rootScope.$on("$routeChangeError", function(e, next, current){
		$rootScope.pageLoading.close();
	});

	//获取产品名
	$proxy.request({
		url: "/cgi-bin/luci/;stok=/locale?form=mobile_lan",
		showLoading: false
	},{}, function(data, others){
		if(data){
			$rootScope.siteTitle = data.model;
			$rootScope.productName = data.model;
			$translate.use(data.locale);
		}
	});

	//判断是否是第一次登陆
	$proxy.request({
		url: $url.format("/admin/firmware?form=upgrade"),
		showLoading: false
	},{},function(data, others){
		if(data && data.is_default){
			$rootScope.firstLog = true;
			// $rootScope.menuDisabled = true;
		}
		$module.config(options);
		
		$rootScope.$on("$routeChangeStart", function(e, next, current){
		 	$rootScope.pageLoading.show();
		});

		if($rootScope.firstLog){
			$location.path("/quicksetup").replace();
		}
	}, function(){
		$module.config(options);
		$rootScope.firstLog = false;
	}, function(){
		$module.config(options);
		$rootScope.firstLog = false;
	});

}]);

/*
 * 配置按需加载及路由信息
 */
su.config(['$routeProvider', '$controllerProvider', '$provide', function($routeProvider, $controllerProvider, $provide) {

	su.controllerProvider = $controllerProvider;
	su.routeProvider = $routeProvider;
	su.provide = $provide;
	
}]);

/*
 * 功能模块管理
 */
su.factory('$module', ['$rootScope', '$route', '$http',"$proxy","$url", function($rootScope, $route, $http, $proxy, $url){

	var routerObj = {
		"network-map": {
			id: 0,
			name: "network",
			url: "#network",
			text: "MENU.NETWORK_MAP",
			path: "/network",
			controller: "network",
			controllerJs: "./js/controllers/network.js",
			templateUrl: "./partials/network.html"
		},
		"quick-setup": {
			id: 1,
			name: "quicksetup",
			url: "#quicksetup",
			text: "MENU.QUICK_SETUP",
			path: "/quicksetup",
			controller: "quicksetup",
			controllerJs: "./js/controllers/quicksetup.js",
			templateUrl: "./partials/quicksetup.html"
		},
		"internet": {
			id: 2,
			name: "internet",
			url: "#internet",
			text: "MENU.INTERNET",
			path: "/internet",
			controller: "internet",
			controllerJs: "./js/controllers/internet.js",
			templateUrl: "./partials/internet.html"
		},
		"wireless": {
			id: 3,
			name: "wireless",
			url: "#wireless",
			text: "MENU.WIRELESS",
			path: "/wireless",
			controller: "wireless",
			controllerJs: "./js/controllers/wireless.js",
			templateUrl: "./partials/wireless.html"
		},
		"guest-network": {
			id: 4,
			name: "guest",
			url: "#guest",
			text: "MENU.GUEST_NETWORK",
			path: "/guest",
			controller: "guest",
			controllerJs: "./js/controllers/guest.js",
			templateUrl: "./partials/guest.html"
		},
		"parental-control": {
			id: 5,
			name: "parental",
			url: "#parental",
			text: "MENU.PARENTAL_CONTROL",
			path: "/parental",
			controller: "parental",
			controllerJs: "./js/controllers/parental.js",
			templateUrl: "./partials/parental.html"
		},
		"lan": {
			id: 6,
			name: "lan",
			url: "#lan",
			text: "MENU.LAN",
			path: "/lan",
			controller: "lan",
			controllerJs: "./js/controllers/lan.js",
			templateUrl: "./partials/lan.html"
		},
		"dhcp": {
			id: 7,
			name: "dhcp",
			url: "#dhcp",
			text: "MENU.DHCP",
			path: "/dhcp",
			controller: "dhcpServer",
			controllerJs: "./js/controllers/dhcp.js",
			templateUrl: "./partials/dhcp.html"
		},
		"usb-settings": {
			id: 8,
			name: "usb",
			url: "#usb",
			text: "MENU.USB_SETTINGS",
			path: "/usb",
			controller: "usb",
			controllerJs: "./js/controllers/usb.js",
			templateUrl: "./partials/usb.html"
		},
		"qos": {
			id: 9,
			name: "qos",
			url: "#qos",
			text: "MENU.QOS",
			path: "/qos",
			controller: "qos",
			controllerJs: "./js/controllers/qos.js",
			templateUrl: "./partials/qos.html"
		},
		"cloud-services": {
			id: 10,
			name: "cloud",
			url: "#cloud",
			text: "MENU.CLOUD_SERVICES",
			path: "/cloud",
			controller: "cloud",
			controllerJs: "./js/controllers/cloud.js",
			templateUrl: "./partials/cloud.html"
		},
		"system-tools": {
			id: 11,
			name: "systemtools",
			url: "#systemtools",
			text: "MENU.SYSTEM_TOOLS",
			path: "/systemtools",
			controller: "systemtools",
			controllerJs: "./js/controllers/systemtools.js",
			templateUrl: "./partials/systemtools.html"
		}
	};

	var routerArr = ["network-map", "quick-setup", "internet", "wireless", "guest-network", "parental-control", "lan", "dhcp", "usb-settings", "qos", "cloud-services", "system-tools"];

	var defaults = {
		"method": "post"
	};

	var module = {
		navigators: [],
		current: "",
		config: function(options){
			var options = angular.extend(defaults, options);

			$http({
				method: options.method,
				url: options.url
			}).success(function(data, status, headers, config){
				if(data.data){
					var menu = data["data"]["menu"];

					for (var index = 0, len = menu.length; index < len; index++) {
						var item = menu[index]["name"];

						if(!angular.isObject(routerObj[item])){
							continue;
						}
						
						var obj = routerObj[item];

						//module.navigators[obj.id] = obj;
						module.navigators.push(obj);

						var fn = (function(obj){
							var js = obj.controllerJs;
							return ["$q", "$rootScope", function($q, $rootScope){
								var delay = $q.defer();
								$script([js], function() {
									$rootScope.$apply(function() {
										$rootScope.currentPage = obj.name;
										delay.resolve();
									});
								});
								return delay.promise;
							}];
						})(obj);
						
						var route = {
							templateUrl: obj.templateUrl,
							controller: obj.controller,
							resolve: {
								delay: fn
							}
						};
						su.routeProvider.when(obj.path, route);
					};

					su.routeProvider.otherwise({
						redirectTo: "/network"
					});
					$route.reload();
				}
			});
		},
		constructor: function(router, fn){
			$rootScope.$on("$routeChangeSuccess", function(e, current, pre){
				if(angular.isDefined(current) && angular.isDefined(current.controller) && router.toLowerCase() === current.controller.toLowerCase()){
					fn();
				}
			});
		}, 
		destory: function(router, fn){
			$rootScope.$on("$routeChangeStart", function(e, next, current){
				if(angular.isDefined(current) && angular.isDefined(current.controller) && router.toLowerCase() === current.controller.toLowerCase()){
					fn();
				}
			});
		}
	};

	$rootScope.$on("$routeChangeSuccess", function(e, current, pre){
		module.current = current.controller;

		if(current.controller == "network"){
			$rootScope.$on("$viewContentLoaded",function(){
				var centerContainer = document.getElementsByClassName("widget-nav-content")[0];
				angular.element(centerContainer).addClass("animation");
			});
		}
	});

	return module;
}]);








