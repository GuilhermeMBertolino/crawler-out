// JavaScript Document
su.controllerProvider.register('network', ["$rootScope", "$location","$scope","$form","$msg","$proxy", "$const","$url","$tool","$timeout", "$config",
 function($rootScope, $location, $scope, $form, $msg, $proxy, $const, $url, $tool, $timeout, $config){
	// $rootScope.currentPage = "network";

	//$scope.noUSB="noUSB";
	if($config.PRINTER_SUPPORT){
		$scope.noPrinter = false;
	}else{
		$scope.noPrinter = true;
	}
	
	var options = {
		proxy:{
			url:  $url.format('/admin/status?form=all')
		},
		fields:[{
			name: "wan_macaddr",
			format: "upperCase"
		},{
			name: "wan_ipv4_ipaddr"
		},{
			name: "wan_ipv4_netmask"
		},{
			name: "wan_ipv4_gateway"
		},{
			name: "wan_ipv4_pridns"
		},{
			name: "wan_ipv4_snddns"
		},{
			name: "wan_ipv4_conntype"
		},{
			name: "wireless_2g_enable",
			format: "upperCaseFirst"
		},{
			name: "wireless_2g_ssid"
		},{
			name: "wireless_2g_hwmode"
		},{
			name: "wireless_2g_channel",
			format: "upperCaseFirst"
		},{
			name: "wireless_5g_enable",
			format: "upperCaseFirst"
		},{
			name: "wireless_5g_ssid"
		},{
			name: "wireless_5g_hwmode"
		},{
			name: "wireless_5g_channel",
			format: "upperCaseFirst"
		},{
			name: "wireless_5g_2_enable",
			format: "upperCaseFirst"
		},{
			name: "wireless_5g_2_ssid"
		},{
			name: "wireless_5g_2_hwmode"
		},{
			name: "wireless_5g_2_channel",
			format: "upperCaseFirst"
		},{
			name: "guest_2g_enable",
			format: "upperCaseFirst"
		},{
			name: "guest_2g_ssid"
		},{
			name: "guest_isolate",
			format: "upperCaseFirst"
		},{
			name: "guest_5g_enable",
			format: "upperCaseFirst"
		},{
			name: "guest_5g_ssid"
		},{
			name: "guest_isolate",
			format: "upperCaseFirst"
		},{
			name: "guest_5g_2_enable",
			format: "upperCaseFirst"
		},{
			name: "guest_5g_2_ssid"
		},{
			name: "guest_isolate",
			format: "upperCaseFirst"
		},{
			name: "access_devices_wired"
		},{
			name: "access_devices_wireless_host"
		},{
			name: "access_devices_wireless_guest"
		},{
			name: "printer_name"
		},{
			name: "usb_storages"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$form.load($scope,{}, function(data, others){
			$scope.form.data.access_devices_wireless_host.data=($scope.form.data.access_devices_wireless_host.data)?$scope.form.data.access_devices_wireless_host.data:[];
			$scope.form.data.access_devices_wireless_guest.data=($scope.form.data.access_devices_wireless_guest.data)?$scope.form.data.access_devices_wireless_guest.data:[];
			$scope.form.data.wireless_2g_hwmode.data=$const.MODE["MODE_" + $scope.form.data.wireless_2g_hwmode.data.toUpperCase()]
			$scope.form.data.wireless_5g_hwmode.data=$const.MODE["MODE_" + $scope.form.data.wireless_5g_hwmode.data.toUpperCase()]
			$scope.form.data.wireless_5g_2_hwmode.data=$const.MODE["MODE_" + $scope.form.data.wireless_5g_2_hwmode.data.toUpperCase()]
			$scope.form.data.wan_ipv4_conntype.data=$const.CONN_TYPE[$scope.form.data.wan_ipv4_conntype.data.toUpperCase()]
			$scope.device_num=$scope.form.data.access_devices_wireless_guest.data.length+$scope.form.data.access_devices_wireless_host.data.length+$scope.form.data.access_devices_wired.data.length;
			if($scope.form.data.printer_name.data){
				$scope.form.data.printer=[{
					'hostname':$scope.form.data.printer_name.data
				}]
			}else{
				$scope.form.data.printer=[]
			}

			if($tool.isEmptyObject(data.usb_storages)){
				$scope.form.data.usb_storages.data = [];
			}
			if(data.hideUSB){
				$scope.noUSB="noUSB";
			}
		});
	}
	$form.config($scope, options);
	formLoad();
	$scope.href="";
	$scope.switchHref=function(e){
		$scope.href=e;
		$rootScope.currentPage = "";
	}
	$scope.back=function(){
		$scope.href='';
		$rootScope.currentPage = "network";
	}
	/*$scope.edit=function(n){
		$location.path(n);
	}*/

	$rootScope.pageLoading.close();
	// $timeout(function(){
	// 	angular.element(document.getElementsByClassName("widget-nav-inner-background")[1]).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
	// 		if(angular.element(document.getElementsByClassName("widget-nav-inner-background")[1]).hasClass("last")){
	// 			angular.element(document.querySelectorAll(".widget-nav-content")).removeClass("animation");
	// 			angular.element(document.getElementsByClassName("widget-nav-inner-background")[0]).removeClass("last");
	// 			angular.element(document.getElementsByClassName("widget-nav-inner-background")[1]).removeClass("last");
	// 		}
	// 	});
	// },100);
	
}]);
su.controllerProvider.register('buttonGroup', ['$scope','$form','$proxy','$url','$const', function($scope, $form, $proxy, $url, $const){
	$scope.form={};
	/*$scope.form.switchDevice = {};
	$scope.form.switchDevice.options =[
		{value: "phone", text:"NETWORK.PHONE"},
		{value: "pc", text: "NETWORK.PC"}
	]
	$scope.$watch(function(){return $scope.form.switchDevice.data}, function(newVal, oldVal){
		if(newVal === "pc" && newVal !== oldVal){
			location.href = "/webpages/";
		}
	})*/
	$scope.switchToPC = function(){
		location.href = "/webpages/";
	};
}]);
su.controllerProvider.register('networkInternet', ['$scope','$form','$proxy','$url','$const', function($scope, $form, $proxy, $url, $const){
	var options = {
		proxy:{
			url:  $url.format('/admin/status?form=internet')
		},
		fields:[{
			name: "internet_status"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$form.load($scope,{}, function(data, others){
		if( data.internet_status.toUpperCase() == 'CONNECTED' ){
			$scope.checkInternet = "connect";
		}else if(  data.internet_status.toUpperCase() == 'UNPLUGGED' ){
			$scope.checkInternet = "disconnect";
		}else if(  data.internet_status.toUpperCase()=='POOR_CONNECTED' ){
			$scope.checkInternet = "poor-conn";
		}else if( data.internet_status.toUpperCase() == 'DISCONNECTED' ){
			$scope.checkInternet = "poor-conn";
		}else if( data.internet_status.toUpperCase() == 'CONNECTING' ){
			$scope.checkInternet = "poor-conn";
		}
			//$scope.checkInternet=$scope.form.data.internet_status.data=="connected";
		});
	}
	$form.config($scope, options);
	formLoad();
}]);
su.controllerProvider.register('routerStatus', ['$scope','$form', "$proxy", '$url', '$rootScope', '$q',
	function($scope, $form, $proxy, $url, $rootScope, $q){
		/*var options = {
			proxy: $url.format("/admin/firmware?form=upgrade");
			fields = [{
				name: "firmware_version"
			},{
				name: "hardware_version"
			}],
			autoLoad: false
		}
		$form.config($scope, options);
		$form.load($scope, {}, function(data, others){

		});*/
		var fields = [];
		$scope.formData = {};
		var deferred = $q.defer();
		var promise = deferred.promise;

		fields.push({name:"model"});
		$scope.formData["model"] = {};
		$scope.formData["model"].data = $rootScope.productName;
		promise.then(function(){
			$proxy.request({
				url: $url.format("/admin/status?form=internet")
			},{
				operation: "read"
			}, function(data){
				if(data){
					fields.push({name:"internet_status"});
					$scope.formData["internet_status"] = {};

					switch( data["internet_status"].toUpperCase() ){
						case 'CONNECTED':
							$scope.formData["internet_status"].data = "NETWORK.CONNECTED";
							break;
						case 'DISCONNECTED':
							$scope.formData["internet_status"].data = "NETWORK.DISCONNECTED";
							break;
						case 'CONNECTING':
							$scope.formData["internet_status"].data = "NETWORK.CONNECTING";
							break;
						case 'UNPLUGGED':
							$scope.formData["internet_status"].data = "NETWORK.UNPLUGGED";
							break;
						case 'POOR_CONNECTED':
							$scope.formData["internet_status"].data = "NETWORK.POOR_CONNECTED";
							break;
					}
					//$scope.formData["internet_status"].data = data["internet_status"];
				}
				$form.formatData(fields, $scope.formData);
			});
		});

		$proxy.request({
			url: $url.format("/admin/firmware?form=upgrade")
		},{
			operation: "read"
		}, function(data){
			for(var name in data){
				var item = {
					name: name
				};
				fields.push(item);
				$scope.formData[name] = {};
				$scope.formData[name].data = data[name];
			}
			deferred.resolve();
		});
}]);
/*
su.controllerProvider.register('internet', ['$scope','$form','$proxy','$url','$const', function($scope, $form, $proxy, $url, $const){
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy: {
			url:  $url.format("/admin/network?form=wan_ipv4_status&form=mac_clone_advanced")
		},
		fields: [{
			name: "conntype"
		},{
			name: "mac_default"
		},{
			name: "ipaddr"
		},{
			name: "netmask"
		},{
			name: "gateway"
		},{
			name: "pri_dns"
		},{
			name: "snd_dns"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$scope.form.load({}, function(data, others){
			if($scope.form.data.conntype.data=='static'){
				url=$url.format("/admin/network?form=wan_ipv4_staticip");
			}else if($scope.form.data.conntype.data=='dhcp'){
				url=$url.format("/admin/network?form=wan_ipv4_dynamic");
			}else if($scope.form.data.conntype.data=='pppoe'){
				url=$url.format("/admin/network?form=wan_ipv4_pppoe");
			}else if($scope.form.data.conntype.data=='bigpond'){
				url=$url.format("/admin/network?form=wan_ipv4_bigpond");
			}else if($scope.form.data.conntype.data=='l2tp'){
				url=$url.format("/admin/network?form=wan_ipv4_l2tp");
			}else if($scope.form.data.conntype.data=='pptp'){
				url=$url.format("/admin/network?form=wan_ipv4_pptp");
			}
			var connect=$scope.form.data.conntype;
			var mac=$scope.form.data.mac_default;
			var options = {
				proxy: {
					url:  url
				},
				fields: [{
					name: "ipaddr"
				},{
					name: "netmask"
				},{
					name: "gateway"
				},{
					name: "pri_dns"
				},{
					name: "snd_dns"
				}],
				autoLoad: false
			}
			$form.config($scope, options);
			$scope.form.data.conntype=connect;
			$scope.form.data.mac_default=mac;
			$scope.form.load({}, function(data, others){
				setReadOnly();
			});
		});
	}
	$form.config($scope, options);
	formLoad();
}]);
su.controllerProvider.register('2g', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	var wireless2gUrl = $url.format("/admin/wireless?form=wireless_2g");
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: wireless2gUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "ssid"
		},{
			name: "hwmode"
		},{
			name: "channel"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$scope.form.data.enable={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true
		}
		$scope.form.load({}, function(data, others){
			setReadOnly();
		});
	}
	$form.config($scope, options);
	formLoad();

}]);
su.controllerProvider.register('5g', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	var wireless5gUrl = $url.format("/admin/wireless?form=wireless_5g");
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: wireless5gUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "ssid"
		},{
			name: "hwmode"
		},{
			name: "channel"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$scope.form.data.enable={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true
		}
		$scope.form.load({}, function(data, others){
			setReadOnly();
		});
	}
	$form.config($scope, options);
	formLoad();

}]);
su.controllerProvider.register('g2g', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	//var wireless5gUrl = $url.format("/admin/wireless?form=guest&form=guest_2g");
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: $url.format("/admin/wireless?form=guest_2g")
		},
		fields: [{
			name: "enable"
		}, {
			name: "ssid"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$scope.form.data.enable={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true
		}
		$scope.form.data.allow={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true,
			data:'off'
		}
		$scope.form.load({}, function(data, others){
			setReadOnly();
		});
	}
	$form.config($scope, options);
	formLoad();

}]);
su.controllerProvider.register('g5g', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	//var wireless5gUrl = $url.format("/admin/wireless?form=guest&form=guest_5g");
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: $url.format("/admin/wireless?form=guest_5g")
		},
		fields:[{
			name: "enable"
		},{
			name: "ssid"
		}],
		autoLoad: false
	}
	var formLoad = function(){
		$scope.form.data.enable={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true
		}
		$scope.form.data.allow={
			options:{
				'onValue':'on',
				'offValue':'off'
			},
			disabled:true,
			data:'off'
		}
		$scope.form.load({}, function(data, others){
			setReadOnly();
		});
	}
	$form.config($scope, options);
	formLoad();

}]);*/
// su.controllerProvider.register('networkUsb', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	//var wireless5gUrl = $url.format("/admin/wireless?form=guest&form=guest_5g");
	// var setReadOnly=function(){
		// for(var i in $scope.form.data){
			// $scope.form.data[i].readOnly=true;
		// }
	// }
	// var options = {
		// proxy:{
			// url: $url.format("/admin/disk_setting?form=scan")
		// },
		// fields:[{
			// name: "list"
		// }],
		// autoLoad: false
	// }
	// var formLoad = function(){
		
		// $scope.form.load({}, function(data, others){
			// setReadOnly();
			// $scope.form.load({}, function(data, others){
				// for(var i=0;i<$scope.form.data.list.data.length;i++){
					// var url="/admin/disk_setting?form=contents&serial=" +$scope.form.data.list.data[i].serial;
					// var usbDataTmp=[];
					// var data;
					// $proxy.request({
						// url: $url.format(url)
					// }, {}, function(result) {
						// usbDataTmp.push(result);
						// if(usbDataTmp.length==i){
							// for(var j=0;j<usbDataTmp.length;j++){
								// $scope.form.data.list.data[j].data=usbDataTmp[j];	
								// $scope.form.data.list.data[j].title=$scope.form.data.list.data[j].name;
								// for(var k in $scope.form.data.list.data[j].data){
									// for(var h in $scope.form.data.list.data[j].data[k]){
										// data=$scope.form.data.list.data[j].data[k][h];
										// $scope.form.data.list.data[j].data[k][h]={
											// 'data':data
										// };
									// }
								// }
							// }
						// }
					// });
				// }
			// });
		// });
	// }
	// $form.config($scope, options);
	// formLoad();

// }]);
/*
su.controllerProvider.register('wireless', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	//var wireless5gUrl = $url.format("/admin/wireless?form=guest&form=guest_5g");cgi-bin/luci/;stok=12345
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: $url.format("/admin/parental_control?form=device")
		},
		fields:[],
		autoLoad: false
	}
	var formLoad = function(){
		
		$scope.form.load({}, function(data, others){
			$scope.form.data=[]
			for(var i =0;i<data.length;i++){
				if(data[i].enable=='on'){
					$scope.form.data.push(data[i])
				}
			}
			for(i=0;i<data.length;i++){
				for(var j in $scope.form.data[i]){
					var tmp=$scope.form.data[i][j];
					$scope.form.data[i][j]={
						'data':tmp
					};
				}
			}
		});
	}
	$form.config($scope, options);
	formLoad();

}]);
su.controllerProvider.register('wired', ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	//var wireless5gUrl = $url.format("/admin/wireless?form=guest&form=guest_5g");cgi-bin/luci/;stok=12345
	var setReadOnly=function(){
		for(var i in $scope.form.data){
			$scope.form.data[i].readOnly=true;
		}
	}
	var options = {
		proxy:{
			url: $url.format("/admin/parental_control?form=device")
		},
		fields:[],
		autoLoad: false
	}
	var formLoad = function(){
		
		$scope.form.load({}, function(data, others){
			$scope.form.data=[]
			for(var i =0;i<data.length;i++){
				if(data[i].enable=='off'){
					$scope.form.data.push(data[i])
				}
			}
			for(i=0;i<data.length;i++){
				for(var j in $scope.form.data[i]){
					var tmp=$scope.form.data[i][j];
					$scope.form.data[i][j]={
						'data':tmp
					};
				}
			}
		});
	}
	$form.config($scope, options);
	formLoad();

}]);
*/