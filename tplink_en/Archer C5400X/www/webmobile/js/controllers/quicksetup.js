// JavaScript Document
su.controllerProvider.register("quicksetup", ["$scope", "$form", "$msg", "$proxy", "$url", "$tool", "$vtype","$const",
	function($scope, $form, $msg, $proxy, $url, $tool, $vtype, $const) {
		var encryption_2g = "";
		var encryption_5g = "";
		var encryption_5g_2 = "";

		var wep_select_2g = "";
		var wep_select_5g = "";
		var wep_select_5g_2 = "";

		var wep_format_2g = "";
		var wep_format_5g = "";
		var wep_format_5g_2 = "";

		var wep_type_2g = "";
		var wep_type_5g = "";
		var wep_type_5g_2 = "";

		var wireless_5g_region_enable = true;


		var lanIP = 0;
		var lanMask = 0;
		var wanIP = 0;
		var wanMask = 0;
		var wanSndIP = 0;
		var wanSndMask = 0;


		var detectInternetConnectionTime = 0;
		var internetChooseDirtyFlag = false;
		var checkRouterTime = 0;
		var checkInternetTime = 0;
		var wireType = "wired";
		$scope.summary = 0;
		$scope.step = 1;

		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
				name: "region_country"
			}, {
				name: "time_timezone"
			}, {
				name: "network_conntype"
			}, {
				name: "network_dhcp_mac_clone_type",
				format: "upperCase",
				disabled: true
			}, {
				name: "network_dhcp_mac_custom",
				vtype: {
					vtype: "mac"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_static_ipaddr",
				vtype: {
					vtype: "ip"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_static_netmask",
				vtype: {
					vtype: "netmask"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_static_gateway",
				vtype: {
					vtype: "ip"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_static_pri_dns",
				vtype: {
					vtype: "ip"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_static_snd_dns",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_l2tp_username",
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_l2tp_password",
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_l2tp_snd_conn",
				disabled: true
			}, {
				name: "network_l2tp_dyn_server",
				vtype: {
					vtype: "string_ip_domain"
				},
				allowBlank: false,
				disabled: true
			}, {
				name: "network_l2tp_static_server",
				vtype: {
					vtype: "string_ip_domain"
				},

				allowBlank: false,
				disabled: true
			}, {
				name: "network_l2tp_static_ip",
				allowBlank: false,
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_l2tp_static_netmask",
				allowBlank: false,
				vtype: {
					vtype: "netmask"
				},
				disabled: true
			}, {
				name: "network_l2tp_static_gateway",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_l2tp_static_pridns",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_l2tp_static_snddns",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_pppoe_username",
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_pppoe_password",
				vtype: {
					vtype: "password"
				},
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_pptp_username",
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_pptp_password",
				maxLength: 119,
				minLength: 0,
				disabled: true
			}, {
				name: "network_pptp_snd_conn",
				disabled: true
			}, {
				name: "network_pptp_dyn_server",
				vtype: {
					vtype: "string_ip_domain"
				},

				allowBlank: false,
				disabled: true
			}, {
				name: "network_pptp_static_server",
				allowBlank: false,
				vtype: {
					vtype: "string_ip_domain"
				},
				disabled: true
			}, {
				name: "network_pptp_static_ip",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_pptp_static_netmask",
				vtype: {
					vtype: "netmask"
				},
				disabled: true
			}, {
				name: "network_pptp_static_gateway",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_pptp_static_pridns",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "network_pptp_static_snddns",
				vtype: {
					vtype: "ip"
				},
				disabled: true
			}, {
				name: "wireless_2g_enable",
				format: "upperCaseFirst"
			}, {
				name: "wireless_2g_ssid",
				allowBlank: false,
				vtype: {
					vtype: "string_visible_username"
				},
				autoTrim: false,
				maxLength:32
			}, {
				name: "wireless_2g_encry_password",
				maxLength: 64
			}, {
				name: "wireless_2g_wpa_key"
			}, {
				name: "wireless_2g_psk_key"
			}, {
				name: "wireless_2g_wep_key1"
			}, {
				name: "wireless_2g_encryption"
			}, {
				name: "wireless_2g_psk_version",
			}, {
				name: "wireless_2g_psk_cipher"
			}, {
				name: "wireless_2g_disabled_all"
			}, {
				name: "wireless_2g_hidden"
			}, {
				name: "wireless_5g_enable",
				format: "upperCaseFirst"
			}, {
				name: "wireless_5g_ssid",
				allowBlank: false,
				vtype: {
					vtype: "string_visible_username"
				},
				autoTrim: false,
				maxLength:32
			}, {
				name: "wireless_5g_encry_password",
				maxLength: 64
			}, {
				name: "wireless_5g_wpa_key"
			}, {
				name: "wireless_5g_psk_key"
			}, {
				name: "wireless_5g_wep_key1"
			}, {
				name: "wireless_5g_encryption"
			}, {
				name: "wireless_5g_psk_version"
			}, {
				name: "wireless_5g_psk_cipher"
			}, {
				name: "wireless_5g_disabled_all"
			}, {
				name: "wireless_5g_region_enable"
			}, {
				name: "wireless_5g_hidden"
			}, 
			{
				name: "wireless_5g_2_enable",
				format: "upperCaseFirst"
			}, {
				name: "wireless_5g_2_ssid",
				allowBlank: false,
				vtype: {
					vtype: "string_visible_username"
				},
				autoTrim: false,
				maxLength:32
			}, {
				name: "wireless_5g_2_encry_password",
				maxLength: 64
			}, {
				name: "wireless_5g_2_wpa_key"
			}, {
				name: "wireless_5g_2_psk_key"
			}, {
				name: "wireless_5g_2_wep_key1"
			}, {
				name: "wireless_5g_2_encryption"
			}, {
				name: "wireless_5g_2_psk_version"
			}, {
				name: "wireless_5g_2_psk_cipher"
			}, {
				name: "wireless_5g_2_disabled_all"
			}, {
				name: "wireless_5g_2_region_enable"
			}, {
				name: "wireless_5g_2_hidden"
			},{
				name: "ismobile"
			}],
			autoLoad: false
		};
		$form.config($scope, options);
		$scope.form.data.region_country.visible = false;
		$scope.display = {
			network_conntype: {
				data:""
			},
			region_country:{
				data:"",
				visible: false
			},
 			time_timezone:{
 				data:""
 			}
		}
		
		/*
		 *region&time
		 */

		$proxy.request({
			//url: "/cgi-bin/luci/;stok=12345/admin/region?form=region"
			url: $url.format("/admin/region?form=region")
		}, {
			operation: "read"
		}, function(data, others) {
			for (var index = 0, len = data.length; index < len; index++) {
				data[index]["name"] = $const.COUNTRY[data[index]["name"].toUpperCase()];
			};

			$scope.form.data.region_country.options = data;
			//$form.load($scope)
		});

		// $proxy.request({
		// 	url: $url.format("/admin/time?form=timezone")
		// }, {
		// 	operation: "read"
		// }, function(data, others) {
		// 	for (var index = 0, len = data.length; index < len; index++) {
		// 		data[index]["name"] = $const.TIME_ZONE[data[index]["name"].toUpperCase()];
		// 	};
		// 	$scope.form.data.time_timezone.options = data;
		// });


		$scope.regionNextBtn = {
			disabled: true,
			visible: true
		}
		$scope.form.data.region_country.changeHandler = function(newValue) {
			if (newValue) {
				$scope.regionNextBtn.disabled = false;
				for (var index = 0; index < $scope.form.data.region_country.options.length; index++) {
					if ($scope.form.data.region_country.data == $scope.form.data.region_country.options[index].value) {
						if ($scope.form.data.region_country.options[index].no_autodetect) {
							$scope.autoDetectBtn.visible = false;
						} else {
							$scope.autoDetectBtn.visible = true;
						}
						break;
					}
				}
			} else {
				$scope.regionNextBtn.disabled = true;
			}
		}


		$scope.regionNext = function(){
			if($scope.form.data.region_country.data==""||$scope.form.data.region_country.data==undefined){
				$scope.form.data.region_country.setError("ERROR.e000044");
				return false;
			}
			if($scope.form.data.time_timezone.data==""||$scope.form.data.time_timezone.data==undefined||$scope.form.data.time_timezone.data=="-1"){
				$scope.form.data.time_timezone.setError("ERROR.e000044");
				return false;
			}
			for(var index = 0; index<$scope.form.data.region_country.options.length; index++){
				if($scope.form.data.region_country.data==$scope.form.data.region_country.options[index].value){
					$scope.display.region_country.data = $scope.form.data.region_country.options[index].name;
					break;
				}
			}
			for(var index = 0; index<$scope.form.data.time_timezone.options.length; index++){
 				if($scope.form.data.time_timezone.data==$scope.form.data.time_timezone.options[index].value){
 					$scope.display.time_timezone.data = $scope.form.data.time_timezone.options[index].name;
 					break;
 				}
 			}
			$scope.next();
		}

		
		/*
		 * First Time Login Check
		 */
		/*		$proxy.request({
					url: $url.format("/admin/firmware?form=upgrade")
				}, {
					operation: "read",
				}, function(data, others) {
					if (data) {
						if (data.is_default == true) {
							$scope.step = 0;
						} else {
							$scope.step = 0;
						}
					};
				});
		$scope.$watch("step",function(n){

		})
		*/

		/*
		 *conntype
		 */
		$proxy.request({
			url: $url.format("/admin/network?form=status_ipv4")
		}, {
			operation: "read"
		}, function(data, others) {
			if (data) {
				lanIP = data.lan_ipv4_ipaddr;
				lanMask = data.lan_ipv4_netmask;
				wanIP = data.wan_ipv4_ipaddr;
				wanMask = data.wan_ipv4_netmask;
				data.wan_ipv4_snd_ipaddr ? wanSndIP = data.wan_ipv4_snd_ipaddr : 1;
				data.wan_ipv4_snd_netmask ? wanSndMask = data.wan_ipv4_snd_netmask : 1;
			};
		});


		$scope.form.data.network_conntype.options = [{
			"value": "dhcp",
			"name": "QUICK_SETUP.DYNAMIC_IP"
		}, {
			"value": "static",
			"name": "QUICK_SETUP.STATIC_IP"
		}, {
			"value": "pppoe",
			"name": "QUICK_SETUP.PPPOE"
		}, {
			"value": "l2tp",
			"name": "QUICK_SETUP.L2TP"
		}, {
			"value": "pptp",
			"name": "QUICK_SETUP.PPTP"
		}];



		$scope.autoDetectBtn = {
			disabled: false,
			visible: true
		};

		$scope.autoDetectProgressBar = {
			visible: true,
			value: 100,
			speed: 1000,
			width: 13.12,
			max: 100,
			handler: function() {

			}
		};
		

		$scope.form.data.network_conntype.changeHandler = function(newValue) {
			internetChooseDirtyFlag = true;
		};

		$scope.connectionNext = function(){
			if($scope.form.data.network_conntype.data==""||$scope.form.data.network_conntype.data==undefined||$scope.form.data.network_conntype.data=="none"){
				$scope.form.data.network_conntype.setError("ERROR.e000044");
				return false;
			}
			switch($scope.form.data.network_conntype.data){
				case "dhcp":
				$scope.display.network_conntype.data = "QUICK_SETUP.DYNAMIC_IP";
				$scope.form.data.network_dhcp_mac_clone_type.disabled = false;

				if($scope.form.data.network_dhcp_mac_clone_type.data=="custom"){
					$scope.form.data.network_dhcp_mac_custom.disabled = false;
				}
				break;
				case "static":
				$scope.display.network_conntype.data = "QUICK_SETUP.STATIC_IP";
				$scope.form.data.network_static_ipaddr.disabled = false;
				$scope.form.data.network_static_netmask.disabled = false;
				$scope.form.data.network_static_gateway.disabled = false;
				$scope.form.data.network_static_pri_dns.disabled = false;
				$scope.form.data.network_static_snd_dns.disabled = false;
				break;
				case "pppoe":
				$scope.display.network_conntype.data = "QUICK_SETUP.PPPOE";
				$scope.form.data.network_pppoe_username.disabled = false;
				$scope.form.data.network_pppoe_password.disabled = false;
				break;
				case "l2tp":
				$scope.display.network_conntype.data = "QUICK_SETUP.L2TP";
				$scope.form.data.network_l2tp_username.disabled = false;
				$scope.form.data.network_l2tp_password.disabled = false;
				$scope.form.data.network_l2tp_snd_conn.disabled = false;

				if ($scope.form.data.network_l2tp_snd_conn.data === "dynamic") {
					$scope.form.data.network_l2tp_dyn_server.disabled = false;
				} else if ($scope.form.data.network_l2tp_snd_conn.data === "static") {
					$scope.form.data.network_l2tp_static_server.disabled = false;
					$scope.form.data.network_l2tp_static_ip.disabled = false;
					$scope.form.data.network_l2tp_static_netmask.disabled = false;
					$scope.form.data.network_l2tp_static_gateway.disabled = false;
					$scope.form.data.network_l2tp_static_pridns.disabled = false;
					$scope.form.data.network_l2tp_static_snddns.disabled = false;
				}
				break;
				case "pptp":
				$scope.display.network_conntype.data = "QUICK_SETUP.PPTP";
				$scope.form.data.network_pptp_username.disabled = false;
				$scope.form.data.network_pptp_password.disabled = false;
				$scope.form.data.network_pptp_snd_conn.disabled = false;

				if ($scope.form.data.network_pptp_snd_conn.data === "dynamic") {
					$scope.form.data.network_pptp_dyn_server.disabled = false;
				} else if ($scope.form.data.network_pptp_snd_conn.data === "static") {
					$scope.form.data.network_pptp_static_server.disabled = false;
					$scope.form.data.network_pptp_static_ip.disabled = false;
					$scope.form.data.network_pptp_static_netmask.disabled = false;
					$scope.form.data.network_pptp_static_gateway.disabled = false;
					$scope.form.data.network_pptp_static_pridns.disabled = false;
					$scope.form.data.network_pptp_static_snddns.disabled = false;
				}
				
				
				break;
			}
			$scope.next();
		}


		$scope.autoDetect = function() {
			clearInterval(detectInternetConnectionTime);
			$scope.autoDetectBtn.disabled = true;


			$proxy.request({
				url: $url.format("/admin/network?form=wan_autodetect"),
				showLoading: false
			}, {
				operation: "detect"
			}, function(result) {
				var time = result.time;
				var intervalTime = 0;

				autoDetectMsg.content = "";
				autoDetectMsg.okBtn.show = false;
				autoDetectMsg.show();
				
				$scope.autoDetectProgressBar.speed = time ;
				$scope.autoDetectProgressBar.start();


				detectInternetConnectionTime = setInterval(function() {
					$proxy.request({
						url: $url.format("/admin/network?form=wan_autodetect"),
						showLoading: false
					}, {
						operation: "read"
					}, function(data) {
						intervalTime += 1000;
						if (data.conntype == "unplugged") {
							clearInterval(detectInternetConnectionTime);

							$scope.autoDetectProgressBar.close();
							autoDetectMsg.content = "QUICK_SETUP.UNPLUGGED";
							autoDetectMsg.okBtn.show = true;
						} else if (data.conntype == "none") {

							if (intervalTime >= time) {
								clearInterval(detectInternetConnectionTime);
								autoDetectMsg.content = "QUICK_SETUP.NONE";
								$scope.autoDetectProgressBar.close();
								autoDetectMsg.okBtn.show = true;
							};
						} else {
							clearInterval(detectInternetConnectionTime);

							var charStr = "";
							switch (data.conntype) {
								case "dhcp":
									charStr = "QUICK_SETUP.DYNAMIC_IP";
									break;
								case "static":
									charStr = "QUICK_SETUP.STATIC_IP";
									break;
								case "pppoe":
									charStr = "QUICK_SETUP.PPPOE";
									break;
								case "l2tp":
									charStr = "QUICK_SETUP.L2TP";
									break;
								case "pptp":
									charStr = "QUICK_SETUP.PPTP";
									break;
								default:
									charStr = "QUICK_SETUP.NONE";
							};

							autoDetectMsg.okBtn.show = true;
							$scope.autoDetectProgressBar.close();
							autoDetectMsg.content = charStr;

							$scope.form.data.network_conntype.data = data.conntype;
							if (!internetChooseDirtyFlag) {
								$scope.form.data.network_conntype.data = data.conntype;
							};
							//autoDetectMsg.close()
						};

						$scope.autoDetectBtn.disabled = false;
					}, function() {
						clearInterval(detectInternetConnectionTime);
						$scope.autoDetectProgressBar.visible = false;
						$scope.autoDetectProgressBar.speed = 1;
						$scope.autoDetectProgressBar.value = 0;
						$scope.autoDetectBtn.disabled = false;
						autoDetectMsg.okBtn.show = true;
						autoDetectMsg.content = "QUICK_SETUP.AUTO_DETECT_FAILED";
					});
				}, 1 * 1000);
			}, function() {
				clearInterval(detectInternetConnectionTime);
				$scope.autoDetectProgressBar.close();
				$scope.autoDetectBtn.disabled = false;
				autoDetectMsg.okBtn.show = true;
				autoDetectMsg.content = "QUICK_SETUP.AUTO_DETECT_FAILED";
			});
		};



		var autoDetectMsg = $msg.create({
			id: "auto-detect-msg",
			title: "QUICK_SETUP.DETECTING",
			autoClose: true,
			okBtn: {
				show: false,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				text: "FORM.CANCEL",
				cls: "cancel",
				handler: function() {}
			}
		})

		/*
		var pppoeErrorMsg = $msg.create({
			id: "pppoe-error-msg",
			content: "QUICK_SETUP.EMPTY_USERNAME",
			iconCls: "alert",
			autoClose: true,
			autoDestory: true,
			okBtn: {
				show: true,
				text: "FORM.YES",
				handler: function() {
					$scope.step = 3;
					$scope.next();
				}
			},
			cancelBtn: {
				show: true,
				text: "FORM.NO",
				handler: function() {}
			}
		})*/
		
		$scope.emptyConfirmMsg = $msg.create({
			id: "empty-confirm-msg",
			content: "",
			iconCls: "alert",
			autoClose: true,
			autoDestory: true,
			okBtn: {
				show: true,
				text: "FORM.YES",
				handler: function() {
					check5gRegionEnable();
					$scope.step = 3;
					$scope.next();
				}
			},
			cancelBtn: {
				show: true,
				text: "FORM.NO",
				handler: function() {}
			}
		})

		/*
		 *conn config
		 */
		$scope.form.data.network_dhcp_mac_clone_type.options = [{
			value: "default",
			name: "QUICK_SETUP.MAC_CLONE_NO"
		}, {
			value: "custom",
			name: "QUICK_SETUP.MAC_CLONE_YES"
		}];

		$scope.form.data.network_pptp_snd_conn.options = [{
			value: "dynamic",
			name: "QUICK_SETUP.DYNAMIC_IP"
		}, {
			value: "static",
			name: "QUICK_SETUP.STATIC_IP"
		}]

		$scope.form.data.network_l2tp_snd_conn.options = [{
			value: "dynamic",
			name: "QUICK_SETUP.DYNAMIC_IP"
		}, {
			value: "static",
			name: "QUICK_SETUP.STATIC_IP"
		}]
		
		$scope.$watch("form.data.network_dhcp_mac_clone_type.data", function(newValue, oldValue) {
			if (newValue=="custom" && $scope.form.data.network_dhcp_mac_clone_type.disabled == false) {
				$scope.form.data.network_dhcp_mac_custom.disabled = false;
			}else{
				$scope.form.data.network_dhcp_mac_custom.disabled = true;

			}
		});
		$scope.$watch("form.data.network_l2tp_static_server.data", function(newVal, oldVal){
			if(newVal){
				if($vtype.ip(newVal) == true){
					$scope.form.l2tpPridnsOptional = "FORM.OPTIONAL";
				}else{
					$scope.form.l2tpPridnsOptional = "";
				}
			}
		});
		$scope.$watch("form.data.network_pptp_static_server.data", function(newVal, oldVal){
			if(newVal){
				if($vtype.ip(newVal) == true){
					$scope.form.pptpPridnsOptional = "FORM.OPTIONAL";
				}else{
					$scope.form.pptpPridnsOptional = "";
				}
			}
		});

		$scope.form.data.network_l2tp_snd_conn.changeHandler = function(newValue, oldValue) {
			if (newValue === "dynamic") {
				$scope.form.data.network_l2tp_dyn_server.disabled = false;

				$scope.form.data.network_l2tp_static_server.disabled = true;
				$scope.form.data.network_l2tp_static_ip.disabled = true;
				$scope.form.data.network_l2tp_static_netmask.disabled = true;
				$scope.form.data.network_l2tp_static_gateway.disabled = true;
				$scope.form.data.network_l2tp_static_pridns.disabled = true;
				$scope.form.data.network_l2tp_static_snddns.disabled = true;

			} else if (newValue === "static") {
				$scope.form.data.network_l2tp_dyn_server.disabled = true;

				$scope.form.data.network_l2tp_static_server.disabled = false;
				$scope.form.data.network_l2tp_static_ip.disabled = false;
				$scope.form.data.network_l2tp_static_netmask.disabled = false;
				$scope.form.data.network_l2tp_static_gateway.disabled = false;
				$scope.form.data.network_l2tp_static_pridns.disabled = false;
				$scope.form.data.network_l2tp_static_snddns.disabled = false;
			}
		};

		$scope.form.data.network_pptp_snd_conn.changeHandler = function(newValue, oldValue) {
			if (newValue === "dynamic") {
				$scope.form.data.network_pptp_dyn_server.disabled = false;

				$scope.form.data.network_pptp_static_server.disabled = true;
				$scope.form.data.network_pptp_static_ip.disabled = true;
				$scope.form.data.network_pptp_static_netmask.disabled = true;
				$scope.form.data.network_pptp_static_gateway.disabled = true;
				$scope.form.data.network_pptp_static_pridns.disabled = true;
				$scope.form.data.network_pptp_static_snddns.disabled = true;

			} else if (newValue === "static") {
				$scope.form.data.network_pptp_dyn_server.disabled = true;

				$scope.form.data.network_pptp_static_server.disabled = false;
				$scope.form.data.network_pptp_static_ip.disabled = false;
				$scope.form.data.network_pptp_static_netmask.disabled = false;
				$scope.form.data.network_pptp_static_gateway.disabled = false;
				$scope.form.data.network_pptp_static_pridns.disabled = false;
				$scope.form.data.network_pptp_static_snddns.disabled = false;
			}
		};








		//$scope.chech5g = wireless_5g_region_enable;

		var check5gRegionEnable = function() {

			if (wireless_5g_region_enable == false) {
				$scope.form.data.wireless_5g_enable.disabled = true;
				$scope.form.data.wireless_5g_ssid.disabled = true;
				$scope.form.data.wireless_5g_encry_password.disabled = true;

				$scope.form.data.wireless_5g_2_enable.disabled = true;
				$scope.form.data.wireless_5g_2_ssid.disabled = true;
				$scope.form.data.wireless_5g_2_encry_password.disabled = true;
			};
		};

		$scope.connCnfigBack = function(){
			switch($scope.form.data.network_conntype.data){
				case "dhcp":
				$scope.display.network_conntype.data = "QUICK_SETUP.DYNAMIC_IP";
				$scope.form.data.network_dhcp_mac_clone_type.disabled = true;
				$scope.form.data.network_dhcp_mac_custom.disabled = true;
				break;
				case "static":
				$scope.display.network_conntype.data = "QUICK_SETUP.STATIC_IP";
				$scope.form.data.network_static_ipaddr.disabled = true;
				$scope.form.data.network_static_netmask.disabled = true;
				$scope.form.data.network_static_gateway.disabled = true;
				$scope.form.data.network_static_pri_dns.disabled = true;
				$scope.form.data.network_static_snd_dns.disabled = true;
				break;
				case "pppoe":
				$scope.display.network_conntype.data = "QUICK_SETUP.PPPOE";
				$scope.form.data.network_pppoe_username.disabled = true;
				$scope.form.data.network_pppoe_password.disabled = true;
				break;
				case "l2tp":
				$scope.display.network_conntype.data = "QUICK_SETUP.L2TP";
				$scope.form.data.network_l2tp_username.disabled = true;
				$scope.form.data.network_l2tp_password.disabled = true;
				$scope.form.data.network_l2tp_snd_conn.disabled = true;
				$scope.form.data.network_l2tp_dyn_server.disabled = true;
				$scope.form.data.network_l2tp_static_server.disabled = true;
				$scope.form.data.network_l2tp_static_ip.disabled = true;
				$scope.form.data.network_l2tp_static_netmask.disabled = true;
				$scope.form.data.network_l2tp_static_gateway.disabled = true;
				$scope.form.data.network_l2tp_static_pridns.disabled = true;
				$scope.form.data.network_l2tp_static_snddns.disabled = true;
				break;
				case "pptp":
				$scope.display.network_conntype.data = "QUICK_SETUP.PPTP";
				$scope.form.data.network_pptp_username.disabled = true;
				$scope.form.data.network_pptp_password.disabled = true;
				$scope.form.data.network_pptp_snd_conn.disabled = true;
				$scope.form.data.network_pptp_dyn_server.disabled = true;
				$scope.form.data.network_pptp_static_server.disabled = true;
				$scope.form.data.network_pptp_static_ip.disabled = true;
				$scope.form.data.network_pptp_static_netmask.disabled = true;
				$scope.form.data.network_pptp_static_gateway.disabled = true;
				$scope.form.data.network_pptp_static_pridns.disabled = true;
				$scope.form.data.network_pptp_static_snddns.disabled = true;
				break;
			}
			$scope.back()
		}
		$scope.connCnfigNext = function() {
			var conntype = $scope.form.data.network_conntype.data;
			
			var fieldArray = [];
			validateResult = false;
			//var childScope = $scope.form.childScope;
			switch (conntype) {
				case "dhcp":
					if($scope.form.data.network_dhcp_mac_clone_type.data=="custom"){
						if($scope.form.data.network_dhcp_mac_custom.data==""){
							$scope.form.data.network_dhcp_mac_custom.setError("ERROR.e000044");
							return false;
						}
						var msg = $vtype.mac($scope.form.data.network_dhcp_mac_custom.data);
						if(msg!==true){
							$scope.form.data.network_dhcp_mac_custom.setError(msg);
							return false;
						}
						
					}
					break;
				case "static":
					fieldArray = ["network_static_ipaddr", "network_static_netmask", "network_static_gateway", "network_static_pri_dns", "network_static_snd_dns"];
					validateResult = $scope.form.validatePartial(fieldArray);
					if(!validateResult){
						return false;
					}
					var ipVal = $scope.form.data.network_static_ipaddr.data;
					var maskVal = $scope.form.data.network_static_netmask.data;

					if (!$tool.isNetIpLegal(ipVal, maskVal)) {
						$scope.form.data.network_static_ipaddr.setError("ERROR.e000052");

						$scope.form.data.network_static_netmask.setError();

						return false;
					}

					if ($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)) {
						$scope.form.data.network_static_ipaddr.setError("ERROR.e000052");
						$scope.form.data.network_static_netmask.setError();
						return false;
					}

					if ($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)) {
						$scope.form.data.network_static_ipaddr.setError("ERROR.e000043");

						$scope.form.data.network_static_netmask.setError();
						return false;
					}
					break;
				case "pppoe":
					if($scope.form.data.network_pppoe_username.data==""&&$scope.form.data.network_pppoe_password.data==""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_INFO";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_pppoe_username.data==""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_USERNAME";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_pppoe_password.data==""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_PASSWORD";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					break;
				case "l2tp":
					fieldArray = ["network_l2tp_username", "network_l2tp_password"];
					
					if ($scope.form.data.network_l2tp_snd_conn.data == "dynamic") {
						fieldArray.push("network_l2tp_dyn_server");
						validateResult = $scope.form.validatePartial(fieldArray);
						if(!validateResult){
							return false;
						}
					}
					else{

						var ipVal = $scope.form.data.network_l2tp_static_ip.data;
						var maskVal = $scope.form.data.network_l2tp_static_netmask.data;
						var serverVal = $scope.form.data.network_l2tp_static_server.data

						var validateIp = $vtype.ip;
						var validateDomain = $vtype.domain;
					
						fieldArray.push("network_l2tp_static_server", "network_l2tp_static_ip", "network_l2tp_static_netmask", "network_l2tp_static_gateway", "network_l2tp_static_pridns", "network_l2tp_static_snddns");
						validateResult = $scope.form.validatePartial(fieldArray);
						if(!validateResult){
							return false;
						}

						if (serverVal != "" && validateIp(serverVal) == true && !$tool.isSameNet(serverVal, ipVal, maskVal)) {
							if ($scope.form.data.network_l2tp_static_gateway.data == "") {
								$scope.form.data.network_l2tp_static_gateway.setError("ERROR.e000044");
								return false;
							}
						}

						if (serverVal != "" && validateDomain(serverVal) == true) {

							if (!$tool.isSameNet($scope.form.data.network_l2tp_static_pridns.data, ipVal, maskVal) && $scope.form.data.network_l2tp_static_gateway.data == "") {
								$scope.form.data.network_l2tp_static_gateway.setError("ERROR.e000045");
								return false;
							}

							if ($scope.form.data.network_l2tp_static_pridns.data == "") {
								$scope.form.data.network_l2tp_static_pridns.setError("ERROR.e000044");
								return false;
							}
						}

						if (!$tool.isNetIpLegal(ipVal, maskVal)) {
							$scope.form.data.network_l2tp_static_ip.setError("ERROR.e000042");
							$scope.form.data.network_l2tp_static_netmask.setError();
							return false;
						}

						if ($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)) {
							$scope.form.data.network_l2tp_static_ip.setError("ERROR.e000042");
							$scope.form.data.network_l2tp_static_netmask.setError();
							return false;
						}

						if ($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)) {
							$scope.form.data.network_l2tp_static_ip.setError("ERROR.e000043");
							$scope.form.data.network_l2tp_static_netmask.setError();
							return false;
						}
					}
					
					if($scope.form.data.network_l2tp_username.data == "" && $scope.form.data.network_l2tp_password.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_INFO";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_l2tp_username.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_USERNAME";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_l2tp_password.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_PASSWORD";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					break;
				case "pptp":
					fieldArray = ["network_pptp_username", "network_pptp_password"];
					
					if ($scope.form.data.network_pptp_snd_conn.data == "dynamic") {
						fieldArray.push("network_pptp_dyn_server");
						validateResult = $scope.form.validatePartial(fieldArray);
						if(!validateResult){
							return false;
						}
					}
					else{

						var ipVal = $scope.form.data.network_pptp_static_ip.data;
						var maskVal = $scope.form.data.network_pptp_static_netmask.data;
						var serverVal = $scope.form.data.network_pptp_static_server.data

						var validateIp = $vtype.ip;
						var validateDomain = $vtype.domain;
					
						fieldArray.push("network_pptp_static_server", "network_pptp_static_ip", "network_pptp_static_netmask", "network_pptp_static_gateway", "network_pptp_static_pridns", "network_pptp_static_snddns");
						validateResult = $scope.form.validatePartial(fieldArray);
						if(!validateResult){
							return false;
						}

						if (serverVal != "" && validateIp(serverVal) == true && !$tool.isSameNet(serverVal, ipVal, maskVal)) {
							if ($scope.form.data.network_pptp_static_gateway.data == "") {
								$scope.form.data.network_pptp_static_gateway.setError("ERROR.e000044");
								return false;
							}
						}

						if (serverVal != "" && validateDomain(serverVal) == true) {

							if (!$tool.isSameNet($scope.form.data.network_pptp_static_pridns.data, ipVal, maskVal) && $scope.form.data.network_pptp_static_gateway.data == "") {
								$scope.form.data.network_pptp_static_gateway.setError("ERROR.e000045");
								return false;
							}

							if ($scope.form.data.network_pptp_static_pridns.data == "") {
								$scope.form.data.network_pptp_static_pridns.setError("ERROR.e000044");
								return false;
							}
						}

						if (!$tool.isNetIpLegal(ipVal, maskVal)) {
							$scope.form.data.network_pptp_static_ip.setError("ERROR.e000042");
							$scope.form.data.network_pptp_static_netmask.setError();
							return false;
						}

						if ($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)) {
							$scope.form.data.network_pptp_static_ip.setError("ERROR.e000042");
							$scope.form.data.network_pptp_static_netmask.setError();
							return false;
						}

						if ($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)) {
							$scope.form.data.network_pptp_static_ip.setError("ERROR.e000043");
							$scope.form.data.network_pptp_static_netmask.setError();
							return false;
						}
					}
					
					if($scope.form.data.network_pptp_username.data == "" && $scope.form.data.network_pptp_password.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_INFO";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_pptp_username.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_USERNAME";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					else if($scope.form.data.network_pptp_password.data == ""){
						$scope.emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_PASSWORD";
						$scope.emptyConfirmMsg.show();
						return false;
					}
					break;
				default:
			};

			check5gRegionEnable();
			$scope.next();
		}
		/*
		 *wireless
		 */
		var wirelessSettings = {
			enable2g: "",
			ssid2g: "",
			pwd2g: "",
			hide2g: "",

			enable5g: "",
			ssid5g: "",
			pwd5g: "",
			hide5g: "",

			enable5g_2: "",
			ssid5g_2: "",
			pwd5g_2: "",
			hide5g_2: "",

			changeFlag: false
		};

		$scope.$watch("form.data.wireless_2g_enable.data", function(newValue, oldValue) {
			if(newValue === "on"){
				$scope.form.data.wireless_2g_disabled_all.data = "off";
			}
			else{
				$scope.form.data.wireless_2g_disabled_all.data = "on";
			}
			
			if (newValue != wirelessSettings.enable2g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_enable.data", function(newValue, oldValue) {
			if(newValue === "on"){
				$scope.form.data.wireless_5g_disabled_all.data = "off";
			}
			else{
				$scope.form.data.wireless_5g_disabled_all.data = "on";
			}
			
			if (newValue != wirelessSettings.enable5g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_2_enable.data", function(newValue, oldValue) {
			if(newValue === "on"){
				$scope.form.data.wireless_5g_2_disabled_all.data = "off";
			}
			else{
				$scope.form.data.wireless_5g_2_disabled_all.data = "on";
			}
			
			if (newValue != wirelessSettings.enable5g_2) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_2g_ssid.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.ssid2g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_ssid.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.ssid5g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_2_ssid.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.ssid5g_2) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_2g_encry_password.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.pwd2g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_encry_password.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.pwd5g) {
				wirelessSettings.changeFlag = true;
			}
		})
		$scope.$watch("form.data.wireless_5g_2_encry_password.data", function(newValue, oldValue) {
			if (newValue != wirelessSettings.pwd5g_2) {
				wirelessSettings.changeFlag = true;
			}
		})


		$scope.form.data.wireless_2g_enable.data = "on";
		$scope.form.data.wireless_5g_enable.data = "off";
		$scope.form.data.wireless_5g_2_enable.data = "off";
		$scope.wirelessCfmMsg = $msg.create({
			id: "wireless-cfm-msg",
			iconCls: "alert",
			autoClose: true,
			autoDestory: true,
			notice_2g: {
				content: "",
				visible: true
			},
			notice_5g: {
				content: "",
				visible: true
			},
			notice_5g_2: {
				content: "",
				visible: true
			},
			//content: ,根据验证生成
			okBtn: {
				show: true,
				text: "FORM.YES",
				handler: function(){
					$scope.summary = 0;
					$scope.step = 4;
					$scope.next();
				}
				
			},
			cancelBtn: {
				show: true,
				text: "FORM.NO",
				cls: "cancel",
				handler: function() {}
			}
		})
		/*var wirelessGoNext = function() {
			//$("form#wireless_setting").form("submit");
			//summary内容显示
			

			if (wireType === "wired"){
		        $("div#quicksetup-summary").addClass("wired");
		    }else{
		        $("div#quicksetup-summary").removeClass("wired");
		    };

			var wireless2g = $("input#chk-enable-wireless-radio-2g").checkbox("getValue");
		    if (wireless2g[0]){
		        $("input#display-wireless-enable-2g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.ON);
		        $("div#display-wireless-2g-container-summary").addClass("enabled").removeClass("disabled");
		    }else{
		        $("input#display-wireless-enable-2g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.OFF);
		        $("div#display-wireless-2g-container-summary").removeClass("enabled").addClass("disabled");
		    };
		    
		    var wireless5g = $("input#chk-enable-wireless-radio-5g").checkbox("getValue");
		    if (wireless5g[0]){
		        $("input#display-wireless-enable-5g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.ON);
		        $("div#display-wireless-5g-container-summary").addClass("enabled").removeClass("disabled");
		    }else{
		        $("input#display-wireless-enable-5g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.OFF);
		        $("div#display-wireless-5g-container-summary").removeClass("enabled").addClass("disabled");
		    };

			    var ssid2g = $("input#txt-wireless-name-ssid-2g").textbox("getValue");
		    $("input#display-wireless-name-ssid-2g-summary").textbox("setValue", ssid2g);
		    $("input#reconnect-network-wireless-ssid-2g").textbox("setValue", ssid2g);
		    
		    var wirelessPassword2g = $("input#txt-wireless-password-2g").textbox("getValue");
		    $("input#display-wireless-password-2g-summary").textbox("setValue", wirelessPassword2g);
		    $("input#reconnect-network-wireless-password-2g").textbox("setValue", wirelessPassword2g);
		    
		    var ssid5g = $("input#txt-wireless-name-ssid-5g").textbox("getValue");
		    $("input#display-wireless-name-ssid-5g-summary").textbox("setValue", ssid5g);
		    $("input#reconnect-network-wireless-ssid-5g").textbox("setValue", ssid5g);
		    
		    var wirelessPassword5g = $("input#txt-wireless-password-5g").textbox("getValue");
		    $("input#display-wireless-password-5g-summary").textbox("setValue", wirelessPassword5g);
		    $("input#reconnect-network-wireless-password-5g").textbox("setValue", wirelessPassword5g);

			
		}*/

		$scope.wirelessBack = function() {

			check5gRegionEnable()
			$scope.back();

		}
		$scope.wirelessNext = function() {
			if(!$scope.form.validatePartial(["wireless_2g_ssid","wireless_5g_ssid","wireless_5g_2_ssid","wireless_2g_encry_password","wireless_5g_encry_password","wireless_5g_2_encry_password"])){
				return false;
			}
			if(!($scope.form.data.wireless_2g_ssid.valid&&$scope.form.data.wireless_5g_ssid.valid&&$scope.form.data.wireless_5g_2_ssid.valid&&$scope.form.data.wireless_2g_encry_password.valid&&$scope.form.data.wireless_5g_encry_password.valid&&$scope.form.data.wireless_5g_2_encry_password.valid)){
				return false;
			}
			/*
			 *验证，然后修改w$scope.wirelessCfmMsg.content
			 */
			var serial = [];
			var unserial = [];
			var validator = function(value, encryption, handler_true, handler_false, _format, _type) {
				var result = [],
					handler_true = handler_true || function() {},
					handler_false = handler_false || function() {};
				switch (encryption) {
					case "psk":
						var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
						if (!reg.test(value)) {
							// result = [false, encryption, "psk"];
							result = ["ERROR.e000034"];
						} else {
							// result = [true, encryption, "psk"];
							result = [true];
						};
						//console.dir(result);
						break;
					case "wep":
						var asc_64_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\"\"\\\|\/\?\.\,\<\>\ ]{5}$/;
						var asc_128_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\"\"\\\|\/\?\.\,\<\>\ ]{13}$/;
						var asc_152_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\"\"\\\|\/\?\.\,\<\>\ ]{16}$/;


						var hex_64_reg = /^[0-9a-fA-F]{10}$/;
						var hex_128_reg = /^[0-9a-fA-F]{26}$/;
						var hex_152_reg = /^[0-9a-fA-F]{32}$/;

						_type = parseInt(_type, 10);
						switch (_type) {
							case 64:
								if (_format == "asic") {
									if (!asc_64_reg.test(value)) {
										result = ["ERROR.e000035"];
									} else {
										result = [true];
									};
								} else {
									if (!hex_64_reg.test(value)) {
										result = ["ERROR.e000036"];
									} else {
										result = [true];
									};
								};
								break;
							case 128:
								if (_format == "asic") {
									if (!asc_128_reg.test(value)) {
										result = ["ERROR.e000038"];
									} else {
										result = [true];
									};
								} else {
									if (!hex_128_reg.test(value)) {
										result = ["ERROR.e000037"];
									} else {
										result = [true];
									};
								};
								break;
							case 152:
								if (_format == "asic") {
									if (!asc_152_reg.test(value)) {
										result = ["ERROR.e000040"];
									} else {
										result = [true];
									};
								} else {
									if (!hex_152_reg.test(value)) {
										result = ["ERROR.e000039"];
									} else {
										result = [true];
									};
								};
								break;
						};
						break;
					case "wpa":
						var reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\"\"\\\|\/\?\.\,\<\>\ ]{1,64}$/;
						if (reg.test(value)) {
							// result = [true, encryption, "wpa"];
							result = [true];
						} else {
							// result = [false, encryption, "wpa"];
							result = ["ERROR.e000041"];
						};
						break;
					default: //none
						// result = [true, encryption, "none"];
						result = [true];
						break;
				};
				//console.dir(result);
				if (result[0] === true) {
					handler_true(result);
					return true;
				} else {
					handler_false(result);
					return false;
				};

				// return result[0];
			};

			var v5 = false;
			var v6 = false;

			var v7 = false;
			var v8 = false;

			wirelessSettings.changeFlag = false;

		///////////////////////2GHz
			var enable2g = $scope.form.data.wireless_2g_enable.data;
			if (enable2g != wirelessSettings.enable2g) {
				wirelessSettings.changeFlag = true;
			};


			var ssid2g = $scope.form.data.wireless_2g_ssid.data;
			if (ssid2g != wirelessSettings.ssid2g) {
				wirelessSettings.changeFlag = true;
			};
			var hide2g = $scope.form.data.wireless_2g_hidden.data;
			hide2g = (hide2g.length == 0) ? "off" : "on";
			if (hide2g != wirelessSettings.hide2g) {
				wirelessSettings.changeFlag = true;
			};
			var password2g = $scope.form.data.wireless_2g_encry_password.data;
			if (password2g != wirelessSettings.pwd2g) {
				wirelessSettings.changeFlag = true;
			};


			var encryptionNew2g = "";
			if (password2g == "") {
				encryptionNew2g = "none";
				$scope.form.data.wireless_2g_encryption.data = "none";
				v5 = true;
			} else {
				encryptionNew2g = (encryption_2g === "none" || !encryption_2g) ? "psk" : encryption_2g;
				$scope.form.data.wireless_2g_encryption.data = encryptionNew2g;
				if (encryptionNew2g == "psk") {
					$scope.form.data.wireless_2g_psk_version.data = "auto";
					$scope.form.data.wireless_2g_psk_cipher.data = "auto";

					//$("#wireless_2g_psk_version").prop("disabled", false);待修改
					//$("#wireless_2g_psk_cipher").prop("disabled", false);待修改
					// $scope.form.unserialize(["wireless_2g_psk_version", "wireless_2g_psk_version"]);
				} else {
					serial.push("wireless_2g_psk_version", "wireless_2g_psk_cipher")
				}
				v5 = validator(password2g, encryptionNew2g, null, function(res) {
					$scope.form.data.wireless_2g_encry_password.setError(res[0]);
				}, wep_format_2g, wep_type_2g);
			};

			$scope.wirelessCfmMsg.notice_2g.content = "";
			$scope.wirelessCfmMsg.notice_2g.visible = true;
			switch (encryptionNew2g) {
				case "wep":
					$scope.wirelessCfmMsg.notice_2g.content = "QUICK_SETUP.WEP_2G";
					$scope.form.data.wireless_2g_wep_key1.data = password2g;
					//$("input.wep_key_2g[wep_key_selected]").val(password2g);//待修改
					unserial.push("wireless_2g_wep_key1");

					break;
				case "psk":
					$scope.wirelessCfmMsg.notice_2g.content = "QUICK_SETUP.WPA_PERSONAL_2G";
					//$("#encryption_2g_notice").css("display", "none");//赋值不显示？
					$scope.form.data.wireless_2g_psk_key.data = password2g;
					unserial.push("wireless_2g_psk_key");
					v7 = true;
					break;
				case "wpa":
					$scope.wirelessCfmMsg.notice_2g.content = "QUICK_SETUP.WPA_ENTR_2G";
					$scope.form.data.wireless_2g_wpa_key.data = password2g;
					unserial.push("wireless_2g_wpa_key");
					break;
				default:
					//text = $.su.CHAR.WIRELESS.NO_SECURITY;
					$scope.wirelessCfmMsg.notice_2g.content = "QUICK_SETUP.NO_ENCRY_2G"
					serial.push("wireless_2g_wpa_key", "wireless_2g_psk_key", "wireless_2g_wep_key1");
					//$("input#wpa_key_2g").prop("disabled", true);//设置字段不显示
					//$("input#psk_key_2g").prop("disabled", true);//设置字段不显示
					//$("input#wep_key1_2g").prop("disabled", true);//设置字段不显示
					break;
			}

		////////////////////////5GHz-1
			var enable5g = $scope.form.data.wireless_5g_enable.data;
			if (enable5g != wirelessSettings.enable5g) {
				wirelessSettings.changeFlag = true;
			};
			var ssid5g = $scope.form.data.wireless_5g_ssid.data;
			if (ssid5g != wirelessSettings.ssid5g) {
				wirelessSettings.changeFlag = true;
			};
			var hide5g = $scope.form.data.wireless_5g_hidden.data;
			if (hide5g != wirelessSettings.hide5g) {
				wirelessSettings.changeFlag = true;
			};
			var password5g = $scope.form.data.wireless_5g_encry_password.data;
			if (password5g != wirelessSettings.pwd5g) {
				wirelessSettings.changeFlag = true;
			};

			var encryptionNew5g = "";
			if (password5g == "") {
				encryptionNew5g = "none";
				$scope.form.data.wireless_5g_encryption.data = "none";
				v6 = true;
			} else {
				encryptionNew5g = (encryption_5g === "none" || !encryption_5g) ? "psk" : encryption_5g;
				$scope.form.data.wireless_5g_encryption.data = encryptionNew5g;
				if (encryptionNew5g == "psk") {
					$scope.form.data.wireless_5g_psk_version.data = "auto";
					$scope.form.data.wireless_5g_psk_cipher.data = "auto";
					//$("#wireless_5g_psk_version").prop("disabled", false);待修改
					//$("#wireless_5g_psk_cipher").prop("disabled", false);待修改
				} else {
					serial.push("wireless_5g_psk_version", "wireless_5g_psk_cipher")
				}
				v6 = validator(password5g, encryptionNew5g, null, function(res) {
					$scope.form.data.wireless_5g_encry_password.setError(res[0]);

				}, wep_format_5g, wep_type_5g);
			};

			$scope.wirelessCfmMsg.notice_5g.content = "";
			$scope.wirelessCfmMsg.notice_5g.visible = true;
			switch (encryptionNew5g) {
				case "wep":
					$scope.wirelessCfmMsg.notice_5g.content = "QUICK_SETUP.WEP_5G_1";
					$scope.form.data.wireless_5g_wep_key1.data = password5g;
					unserial.push("wireless_5g_wep_key1");
					break;
				case "psk":
					$scope.wirelessCfmMsg.notice_5g.content = "QUICK_SETUP.WPA_PERSONAL_5G_1";
					//$("#encryption_5g_notice").css("display", "none");//待修改
					$scope.form.data.wireless_5g_psk_key.data = password5g;
					unserial.push("wireless_5g_psk_key");
					v8 = true;
					break;
				case "wpa":
					$scope.wirelessCfmMsg.notice_5g.content = "QUICK_SETUP.WPA_ENTR_5G_1";
					$scope.form.data.wireless_5g_wpa_key.data = password5g;
					unserial.push("wireless_5g_wpa_key");
					break;
				default:
					$scope.wirelessCfmMsg.notice_5g.content = "QUICK_SETUP.NO_ENCRY_5G_1";
					serial.push("wireless_5g_wpa_key", "wireless_5g_psk_key", "wireless_5g_wep_key1");
					/*$("input#wpa_key_5g").prop("disabled", true);
                    $("input#psk_key_5g").prop("disabled", true);
                    $("input#wep_key1_5g").prop("disabled", true);*/
					break;
			};
		/////////////////////////////// 5GHz-2
			var enable5g_2 = $scope.form.data.wireless_5g_2_enable.data;
			if (enable5g_2 != wirelessSettings.enable5g_2) {
				wirelessSettings.changeFlag = true;
			};
			var ssid5g_2 = $scope.form.data.wireless_5g_2_ssid.data;
			if (ssid5g_2 != wirelessSettings.ssid5g_2) {
				wirelessSettings.changeFlag = true;
			};
			var hide5g_2 = $scope.form.data.wireless_5g_2_hidden.data;
			if (hide5g_2 != wirelessSettings.hide5g_2) {
				wirelessSettings.changeFlag = true;
			};
			var password5g_2 = $scope.form.data.wireless_5g_2_encry_password.data;
			if (password5g_2 != wirelessSettings.pwd5g_2) {
				wirelessSettings.changeFlag = true;
			};

			var encryptionNew5g_2 = "";
			if (password5g_2 == "") {
				encryptionNew5g_2 = "none";
				$scope.form.data.wireless_5g_2_encryption.data = "none";
				v6 = true;
			} else {
				encryptionNew5g_2 = (encryption_5g_2 === "none" || !encryption_5g_2) ? "psk" : encryption_5g_2;
				$scope.form.data.wireless_5g_2_encryption.data = encryptionNew5g_2;
				if (encryptionNew5g_2 == "psk") {
					$scope.form.data.wireless_5g_2_psk_version.data = "auto";
					$scope.form.data.wireless_5g_2_psk_cipher.data = "auto";
					//$("#wireless_5g_psk_version").prop("disabled", false);待修改
					//$("#wireless_5g_psk_cipher").prop("disabled", false);待修改
				} else {
					serial.push("wireless_5g_2_psk_version", "wireless_5g_2_psk_cipher")
				}
				v6 = validator(password5g_2, encryptionNew5g_2, null, function(res) {
					$scope.form.data.wireless_5g_2_encry_password.setError(res[0]);

				}, wep_format_5g_2, wep_type_5g_2);
			};

			$scope.wirelessCfmMsg.notice_5g_2.content = "";
			$scope.wirelessCfmMsg.notice_5g_2.visible = true;

			switch (encryptionNew5g_2) {
				case "wep":
					$scope.wirelessCfmMsg.notice_5g_2.content = "QUICK_SETUP.WEP_5G_2";
					$scope.form.data.wireless_5g_2_wep_key1.data = password5g_2;
					unserial.push("wireless_5g_2_wep_key1");
					break;
				case "psk":
					$scope.wirelessCfmMsg.notice_5g_2.content = "QUICK_SETUP.WPA_PERSONAL_5G_2";
					//$("#encryption_5g_notice").css("display", "none");//待修改
					$scope.form.data.wireless_5g_2_psk_key.data = password5g_2;
					unserial.push("wireless_5g_2_psk_key");
					v8 = true;
					break;
				case "wpa":
					$scope.wirelessCfmMsg.notice_5g_2.content = "QUICK_SETUP.WPA_ENTR_5G_2";
					$scope.form.data.wireless_5g_2_wpa_key.data = password5g_2;
					unserial.push("wireless_5g_2_wpa_key");
					break;
				default:
					$scope.wirelessCfmMsg.notice_5g_2.content = "QUICK_SETUP.NO_ENCRY_5G_2";
					serial.push("wireless_5g_2_wpa_key", "wireless_5g_2_psk_key", "wireless_5g_2_wep_key1");
					/*$("input#wpa_key_5g").prop("disabled", true);
                    $("input#psk_key_5g").prop("disabled", true);
                    $("input#wep_key1_5g").prop("disabled", true);*/
					break;
			};
		///////////////////////////////////
			$scope.form.unserialize(unserial);
			$scope.form.serialize(serial);

			if (wireless_5g_region_enable) {
				if($scope.form.data.wireless_5g_ssid.data==""){
					$scope.form.data.wireless_5g_ssid.setError("ERROR.e000218");
					return false;
				}
			} else {
				$scope.wirelessCfmMsg.notice_5g.visible = false;
			};
			if (v5 && v6) {
				if ((v7 && v8) || (v7 && (!wireless_5g_region_enable && !v8))) {
					//wirelessGoNext();
					$scope.summary = 0;
					$scope.next();
				} else {
					$scope.wirelessCfmMsg.show();
				};
			};


			//return false;
		}


		/*
		 *summary
		 */
		$scope.form.submitBtn = {
			visible: true,
			disabled: false
		};
		$scope.summaryBack = function() {
			$scope.back();
			$scope.form.data.wireless_2g_encryption.data = encryption_2g;
			$scope.form.data.wireless_5g_encryption.data = encryption_5g;

		}
		$scope.save = function() {
			var submitCallback = function() {

				if (wireType == "wired" || wirelessSettings.changeFlag === false) {
					//有线连接的情况
					var count = 0;
					var countMax = 9;

					$scope.saveProgressBar.start();
					saveMsg.show();
					

					clearInterval(checkRouterTime);
					checkRouterTime = setInterval(function() {
						$proxy.request({
							url: $url.format("/admin/quick_setup?form=check_router"),
							showLoading: false
						}, {
							operation: "read"
						}, function() {
							clearInterval(checkRouterTime);
							//$scope.saveProgressBar.speed = 5;
							$scope.saveProgressBar.handler = function() {

								saveMsg.close();
								$scope.$apply();
								$scope.next();
								//quickSetupWizard.wizard("goTo", "setup-complete");
							}

							$scope.saveProgressBar.close("success");
							
						}, function() {
							count++;
							if (count >= countMax) {
								clearInterval(checkRouterTime);
								$scope.saveProgressBar.handler = function() {

									saveMsg.close();
									$scope.$apply();
									$scope.next();
									//quickSetupWizard.wizard("goTo", "setup-complete");
									
								}
								$scope.saveProgressBar.close("success");
							};
						});
					}, 1 * 1000);
					//});

				} else {
					
					// $scope.saveProgressBar.speed = 1 * 1000;
					
					$scope.saveProgressBar.handler = function(){
						$scope.summary = 1;
						
						saveMsg.close();
					}
					$scope.saveProgressBar.start();
					saveMsg.show();
					
					
					//无线连接的状态
					/*					$scope.saveProgressBar.fn = function(){
						$scope.saveProgressBar.value = 0;
						$scope.saveProgressBar.speed = 1;
						$scope.saveProgressBar.visible = false;
						$scope.saveBtn.disabled = false;
						saveMsg.close();
						
					}
					$scope.saveProgressBar.success = true;*/
				};
			};

			var ssid2g = $scope.form.data.wireless_2g_ssid.data;
			var password2g = $scope.form.data.wireless_2g_encry_password.data;

			var ssid5g = $scope.form.data.wireless_5g_ssid.data;
			var password5g = $scope.form.data.wireless_5g_encry_password.data;
			
			var ssid5g_2 = $scope.form.data.wireless_5g_2_ssid.data;
			var password5g_2 = $scope.form.data.wireless_5g_2_encry_password.data;
			
			$scope.form.submit({
				operation: "write",
				ismobile: '1'
			}, function() {
				$scope.form.data.wireless_2g_ssid.data = ssid2g;
				$scope.form.data.wireless_2g_encry_password.data = password2g;

				$scope.form.data.wireless_5g_ssid.data = ssid5g;
				$scope.form.data.wireless_5g_encry_password.data = password5g;

				$scope.form.data.wireless_5g_2_ssid.data = ssid5g_2;
				$scope.form.data.wireless_5g_2_encry_password.data = password5g_2;

				submitCallback();
			}, function() {
				$msg.create({
					type:"failure",
					text:"FORM.FAILURE"
				}).show();
				
				/***********/
				//quicksetupForm.form("prompt", false); //待修改
				/***********/
			}, function() {
				submitCallback();
			}, false, true, true);

		};
		$scope.btnReconnectCheck = {
			disabled: false,
			visible: true
		}
		$scope.reconnect = function() {
			var count = 0,
				maxCount = 4,
				wanCount = 0,
				wanMaxCount = 9;

			loadMsg.show()
			//出现菊花
			//var statusReconnect = $("input#status-reconnect-network");
			//statusReconnect.status("setLoading");
			$scope.btnReconnectCheck.disabled = true;

			clearInterval(checkRouterTime);
			checkRouterTime = setInterval(function() {
				if (count <= maxCount) {
					$proxy.request({
						url: $url.format("/admin/quick_setup?form=check_router"),
						showLoading: false
					}, {
						operation: "read"
					}, function() {
						//返回成功
						//alert("successed")
						clearInterval(checkRouterTime);
						$scope.next();
						$scope.form.submitBtn.disabled = false;
						loadMsg.close()
						//关闭菊花

						$scope.btnReconnectCheck.disabled = false;
					}, function() {
						//返回失败
						//alert("failed")
						//btn.button("enable");
						//clearInterval(checkRouterTime);
						//statusReconnect.status("setNormal");
						//提示用户
						wanCount++;
						if (wanCount > wanMaxCount) {
							clearInterval(checkRouterTime);
							loadMsg.close()
							//关闭菊花
							$scope.next();
							$scope.btnReconnectCheck.disabled = false;
						};
					}, function() {
						//失联状态
						//alert("error")
						count++;
						if (count > maxCount) {
							clearInterval(checkRouterTime);
							$scope.summary = 2;
							//关闭菊花
							loadMsg.close()
							$scope.btnReconnectCheck.disabled = false;

						};
					});
				} else {
					clearInterval(checkRouterTime);
				};
			}, 1 * 1000);
		}
		$scope.summaryOkBtn = {
			visible: true,
			disabled: false
		};
		$scope.summaryOk = function() {
			$scope.summaryOkBtn.disabled = true;
			$proxy.request({
				url: $url.format("/admin/quick_setup?form=check_router")
			}, {
				operation: "read"
			}, function() {
				$scope.form.submitBtn.disabled = false;
				$scope.summaryOkBtn.disabled = false;
				$scope.next();
			}, function() {
				$scope.form.submitBtn.disabled = false;
				$scope.summaryOkBtn.disabled = false;
				$scope.next();
			}, function() {
				location.reload();
			})
		}

		$scope.saveProgressBar = {
			visible: true,
			width: 13.12,
			max: 100,
			value: 100,
			speed: 3000,
			handler: function() {}
		};
		var loadMsg = $msg.create({
			type: "waiting",
			text: "FORM.WAITING"
		})

		var saveMsg = $msg.create({
			id: "save-msg",
			autoClose: false,
			title: "QUICK_SETUP.WAIT_INFO",
			okBtn: {
				show: false,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				cls: "cancel",
				handler: function() {}
			}
		})

		/*
		 *testConn
		 */
		var testSuccessMsg = $msg.create({
			id: "test-success-msg",
			autoClose: true,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				handler: function() {}
			}
		});
		var testFailureMsg = $msg.create({
			id: "test-failure-msg",
			autoClose: true,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				handler: function() {}
			}
		});


		$scope.testInternetConn = function() {
			$proxy.request({
				url: $url.format("/admin/quick_setup?form=check_internet")
			}, {
				operation: "read"
			}, function() {
				testSuccessMsg.show();
			}, function() {
				testFailureMsg.show();
			}, function() {
				testFailureMsg.show();
			})
		}


		$scope.finish = function() {
			$scope.step = 1;
			location.href = "#/network";
		}
		$scope.wirelessHardwareOffNote = {};

		$proxy.request({
			url: './data/timezone.json'
		}, {
			operation: "read"
		}, function(data, others) {
			for (var index = 0, len = data.length; index < len; index++) {
				data[index]["name"] = $const.TIME_ZONE[data[index]["name"].toUpperCase()];
			};
			$scope.form.data.time_timezone.options = data;


			$form.load($scope, {}, function(data) {
			if (data && data.wire_type) {
				wireType = data.wire_type;
			};
			var serial = [];
			//wireless部分数据加载
			if (data.wireless_2g_enable == "on") {
				$scope.form.data.wireless_2g_disabled_all.data = "off";
			} else {
				$scope.form.data.wireless_2g_disabled_all.data = "on";
			}

			if (data.wireless_5g_enable == "on") {
				$scope.form.data.wireless_5g_disabled_all.data = "off";
			} else {
				$scope.form.data.wireless_5g_disabled_all.data = "on";
			}


			if (data.wireless_5g_2_enable == "on") {
				$scope.form.data.wireless_5g_2_disabled_all.data = "off";
			} else {
				$scope.form.data.wireless_5g_2_disabled_all.data = "on";
			}

			//2g
			encryption_2g = data.wireless_2g_encryption || "psk";
			wep_select_2g = data.wireless_2g_wep_select;
			wep_format_2g = data["wireless_2g_wep_format" + wep_select_2g];
			wep_type_2g = data["wireless_2g_wep_type" + wep_select_2g];

			var keyContainer2g = $scope.form.data.wireless_2g_encry_password;


			$scope.form.data.wireless_2g_psk_key.data = data.wireless_2g_psk_key;


			$scope.form.data.wireless_2g_wpa_key.data = data.wireless_2g_wpa_key;


			$scope.form.data.wireless_2g_wep_key1.data = data.wireless_2g_wep_key1;



			$scope.form.data.wireless_2g_encryption.data = encryption_2g;


			wirelessSettings.enable2g = data.wireless_2g_enable;
			wirelessSettings.ssid2g = data.wireless_2g_ssid;
			wirelessSettings.hide2g = data.wireless_2g_hidden;

			switch (encryption_2g) {
				case "psk":
					keyContainer2g.data = data.wireless_2g_psk_key;
					wirelessSettings.pwd2g = data.wireless_2g_psk_key;
					serial.push("wireless_2g_wpa_key", "wireless_2g_wep_key1");
					break;
				case "wep":
					var keyIndex = data.wireless_2g_wep_select;
					keyContainer2g.data = data["wireless_2g_wep_key" + keyIndex];
					wirelessSettings.pwd2g = data["wireless_2g_wep_key" + keyIndex];
					serial.push("wireless_2g_wpa_key", "wireless_2g_psk_key");
					break;
				case "wpa":
					keyContainer2g.data = data.wireless_2g_wpa_key;
					wirelessSettings.pwd2g = data.wireless_2g_wpa_key;
					serial.push("wireless_2g_wep_key1", "wireless_2g_psk_key");
					break;
				default:
					serial.push("wireless_2g_wep_key1", "wireless_2g_psk_key", "wireless_2g_wpa_key")
					wirelessSettings.pwd2g = "";
					break;
			};

			//5g
			encryption_5g = data.wireless_5g_encryption || "psk";
			wep_select_5g = data.wireless_5g_wep_select;
			wep_format_5g = data["wireless_5g_wep_format" + wep_select_5g];
			wep_type_5g = data["wireless_5g_wep_type" + wep_select_5g];

			var keyContainer5g = $scope.form.data.wireless_5g_encry_password;

			$scope.form.data.wireless_5g_psk_key.data = data.wireless_5g_psk_key;
			$scope.form.data.wireless_5g_wpa_key.data = data.wireless_5g_wpa_key;

			$scope.form.data.wireless_5g_wep_key1.data = data.wireless_5g_wep_key1;


			$scope.form.data.wireless_5g_encryption.data = encryption_5g;

			wirelessSettings.enable5g = data.wireless_5g_enable;
			wirelessSettings.ssid5g = data.wireless_5g_ssid;
			wirelessSettings.hide5g = data.wireless_5g_hidden;

			wirelessSettings.enable5g_2 = data.wireless_5g_2_enable;
			wirelessSettings.ssid5g_2 = data.wireless_5g_2_ssid;
			wirelessSettings.hide5g_2 = data.wireless_5g_2_hidden;


			switch (encryption_5g) {
				case "psk":
					keyContainer5g.data = data.wireless_5g_psk_key;
					wirelessSettings.pwd5g = data.wireless_5g_psk_key;
					serial.push("wireless_5g_wpa_key", "wireless_5g_wep_key1");
					break;
				case "wep":
					var keyIndex = data.wireless_5g_wep_select;
					keyContainer5g.data = data["wireless_5g_wep_key" + keyIndex];
					wirelessSettings.pwd5g = data["wireless_5g_wep_key" + keyIndex];
					serial.push("wireless_5g_wpa_key", "wireless_5g_psk_key");
					break;
				case "wpa":
					keyContainer5g.data = data.wireless_5g_wpa_key;
					wirelessSettings.pwd5g = data.wireless_5g_wpa_key;
					serial.push("wireless_5g_wep_key1", "wireless_5g_psk_key");
					break;
				default:
					wirelessSettings.pwd5g = "";
					serial.push("wireless_5g_wep_key1", "wireless_5g_psk_key", "wireless_5g_wpa_key")
					break;
			};

			//5g_2
			encryption_5g_2 = data.wireless_5g_2_encryption || "psk";
			wep_select_5g_2 = data.wireless_5g_2_wep_select;
			wep_format_5g_2 = data["wireless_5g_2_wep_format" + wep_select_5g_2];
			wep_type_5g_2 = data["wireless_5g_2_wep_type" + wep_select_5g_2];

			var keyContainer5g_2 = $scope.form.data.wireless_5g_2_encry_password;

			$scope.form.data.wireless_5g_2_psk_key.data = data.wireless_5g_2_psk_key;
			$scope.form.data.wireless_5g_2_wpa_key.data = data.wireless_5g_2_wpa_key;

			$scope.form.data.wireless_5g_2_wep_key1.data = data.wireless_5g_2_wep_key1;


			$scope.form.data.wireless_5g_2_encryption.data = encryption_5g_2;

			wirelessSettings.enable5g_2 = data.wireless_5g_2_enable;
			wirelessSettings.ssid5g_2 = data.wireless_5g_2_ssid;
			wirelessSettings.hide5g_2 = data.wireless_5g_2_hidden;

			wirelessSettings.enable5g_2_2 = data.wireless_5g_2_2_enable;
			wirelessSettings.ssid5g_2_2 = data.wireless_5g_2_2_ssid;
			wirelessSettings.hide5g_2_2 = data.wireless_5g_2_2_hidden;

			switch (encryption_5g_2) {
				case "psk":
					keyContainer5g_2.data = data.wireless_5g_2_psk_key;
					wirelessSettings.pwd5g_2 = data.wireless_5g_2_psk_key;
					serial.push("wireless_5g_2_wpa_key", "wireless_5g_2_wep_key1");
					break;
				case "wep":
					var keyIndex = data.wireless_5g_2_wep_select;
					keyContainer5g_2.data = data["wireless_5g_2_wep_key" + keyIndex];
					wirelessSettings.pwd5g_2 = data["wireless_5g_2_wep_key" + keyIndex];
					serial.push("wireless_5g_2_wpa_key", "wireless_5g_2_psk_key");
					break;
				case "wpa":
					keyContainer5g_2.data = data.wireless_5g_2_wpa_key;
					wirelessSettings.pwd5g_2 = data.wireless_5g_2_wpa_key;
					serial.push("wireless_5g_2_wep_key1", "wireless_5g_2_psk_key");
					break;
				default:
					wirelessSettings.pwd5g_2 = "";
					serial.push("wireless_5g_2_wep_key1", "wireless_5g_2_psk_key", "wireless_5g_2_wpa_key")
					break;
			};

		/////////////////////////////////////////
			$scope.form.serialize(serial);
			//判断国家地区是否支持信道
			var regionCapability = data.region_capability;
			var channel5g = regionCapability.channel_5g;
			var isEmptyObject = true;
			for (p in channel5g) {
				isEmptyObject = false;
			}
			if (isEmptyObject) {
				wireless_5g_region_enable = false;
				$scope.form.data.wireless_5g_region_enable.data = "off";
			} else {
				wireless_5g_region_enable = true;
				$scope.form.data.wireless_5g_region_enable.data = "on";
			};

			//判断2.4G，5G硬件开关是否禁用
			var v1 = data.wireless_5g_disabled == "on";
			var v2 = data.wireless_2g_disabled == "on";
			var t = "";
			if (!wireless_5g_region_enable) {
				t += "ERROR.e000207";
			};

			// if (v1 && v2) {
			// 	t += "ERROR.e000208";
			// } else if (v1) {
			// 	if (wireless_5g_region_enable) {
			// 		t += "ERROR.e000209";
			// 	};
			// } else if (v2) {
			// 	t += "ERROR.e000210"
			// } else {
			// 	//
			// };

			if (t) {
				$scope.wirelessHardwareOffNote.content = t;
				$scope.wirelessHardwareOffNote.visible = true;
			} else {
				$scope.wirelessHardwareOffNote.visible = false;
			};

			wirelessSettings.changeFlag = false;

			$scope.pageLoading.close();
		});
		});



	}
]);

/*
su.controllerProvider.register("resetAccount", ["$rootScope", "$scope", "$form", "$proxy", "$url", "$msg", "$encrypt",
	function($rootScope, $scope, $form, $proxy, $url, $msg, $encrypt) {
		var options = {
			proxy: {
				url: $url.format("/admin/administration?form=account")
			},
			fields: [{
				name: "new_acc",
				vtype: "ascii_visible",
				allowBlank: false,
				maxLength: 15
			}, {
				name: "new_pwd",
				vtype: "ascii_visible",
				allowBlank: false,
				maxLength: 15
			}, {
				name: "cfm_pwd",
				vtype: "ascii_visible",
				allowBlank: false,
				maxLength: 15
			}],
			autoLoad: true,
			validator: function() {
				if ($scope.form.data.new_pwd.inputData != $scope.form.data.cfm_pwd.inputData) {//加密数据存在inputData里，而非data
					$scope.form.data.cfm_pwd.setError("ERROR.e000048")
					return false;
				};
				return true;
			}
		};
		$form.config($scope, options);

		$scope.form.data.new_pwd.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};
		$scope.form.data.cfm_pwd.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};

		var passwordCheck = function(new_pwd, cfm_pwd) {
			if (cfm_pwd == new_pwd) {

				$scope.form.data.cfm_pwd.setNormal()

			} else {

				$scope.form.data.cfm_pwd.setError("ERROR.e000048")
			};
		};
		$scope.$watch("form.data.new_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (cfm_pwd) {
				passwordCheck(new_pwd, cfm_pwd)
			}
		});
		$scope.$watch("form.data.cfm_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (new_pwd) {
				passwordCheck(new_pwd, cfm_pwd)
			}
		});

		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		}

		$scope.done = function() {
			$scope.form.submit({
				"operation": "set"
			}, function() {
				$rootScope.firstLog = false;
				$rootScope.menuDisabled = false;
			}, function() {
				
			}, function() {
			},true, false, true)
		}
		$scope.skip = function() {
			$rootScope.firstLog = false;
			$rootScope.menuDisabled = false;
			//$scope.$parent.step = 1;
		}

	}
]);
*/

/*su.controllerProvider.register("qsDhcp", ["$scope", "$form", "$proxy", "$url",
	function($scope, $form, $proxy, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
				name: "network_dhcp_mac_custom",
				vtype: {
					vtype: "mac"
				},
				allowBlank: false
			}],
			autoLoad: true
		};
		$form.config($scope, options);



		var parent = $scope.$parent.$parent;
		var conntype = parent.form.data.network_conntype;
		var macCloneType = parent.form.data.network_dhcp_mac_clone_type;

		$scope.$watch(function() {
			return conntype.data
		}, function(newValue, oldValue) {
			if (conntype.data === "dhcp") {
				parent.form.childScope = $scope;
			}
		});
		macCloneType.changeHandler = function(newValue, oldValue) {
			if (newValue!=="custom") {
				$scope.form.serialize(["network_dhcp_mac_custom"])
				//parent.form.childScope = $scope;
			}
		}
	}
]);
su.controllerProvider.register("qsStatic", ["$scope", "$form", "$proxy", "$url",
	function($scope, $form, $proxy, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
				name: "network_static_ipaddr",
				vtype: {
					vtype: "ip",
				},
				allowBlank: false
			}, {
				name: "network_static_netmask",
				vtype: {
					vtype: "netmask",
				},
				allowBlank: false
			}, {
				name: "network_static_gateway",
				vtype: {
					vtype: "ip",
				},
				allowBlank: false
			}, {
				name: "network_static_pri_dns",
				vtype: {
					vtype: "ip",
				},
				allowBlank: false
			}, {
				name: "network_static_snd_dns",
				vtype: {
					vtype: "ip",
				},
			}],
			autoLoad: true
		};
		$form.config($scope, options);
		var parent = $scope.$parent.$parent;
		var conntype = parent.form.data.network_conntype;

		$scope.$watch(function() {
			return conntype.data
		}, function(newValue, oldValue) {
			if (conntype.data === "static") {
				parent.form.childScope = $scope;
			}
		}, true);

	}
]);
su.controllerProvider.register("qsPppoe", ["$scope", "$form", "$proxy", "$url",
	function($scope, $form, $proxy, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
					name: "network_pppoe_username",
					vtype: {
						vtype: "string_visible",
					},
					maxLength: 119,
					minLength: 0
				}, {
					name: "network_pppoe_password",
					vtype: {
						vtype: "password",
					},
					maxLength: 119,
					minLength: 0
				}

			],
			autoLoad: true
		};
		$form.config($scope, options);

		var parent = $scope.$parent.$parent;
		var conntype = parent.form.data.network_conntype;

		$scope.$watch(function() {
			return conntype.data
		}, function(newValue, oldValue) {
			if (conntype.data === "pppoe") {
				parent.form.childScope = $scope;
			}
		}, true);
	}
]);
su.controllerProvider.register("qsL2tp", ["$scope", "$form", "$proxy", "$url",
	function($scope, $form, $proxy, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
				name: "network_l2tp_username",
				vtype: {
					vtype: "string_visible",
				},
				maxLength: 119,
				minLength: 0
			}, {
				name: "network_l2tp_password",
				maxLength: 119,
				minLength: 0
			}, {
				name: "network_l2tp_snd_conn"
			}, {
				name: "network_l2tp_dyn_server",
				vtype: {
					vtype: "ip_domain",
				},
				allowBlank: false,
			}, {
				name: "network_l2tp_static_server",
				vtype: {
					vtype: "ip_domain",
				},

				allowBlank: false,
			}, {
				name: "network_l2tp_static_ip",
				allowBlank: false,
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_l2tp_static_netmask",
				allowBlank: false,
				vtype: {
					vtype: "netmask"
				}
			}, {
				name: "network_l2tp_static_gateway",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_l2tp_static_pridns",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_l2tp_static_snddns",
				vtype: {
					vtype: "ip"
				}
			}],
			autoLoad: true
		};
		$form.config($scope, options);

		var parent = $scope.$parent.$parent;
		var conntype = parent.form.data.network_conntype;

		$scope.form.data.network_l2tp_snd_conn.options = [{
			value: "dynamic",
			name: "QUICK_SETUP.DYNAMIC_IP"
		}, {
			value: "static",
			name: "QUICK_SETUP.STATIC_IP"
		}]

		$scope.$watch(function() {
			return conntype.data
		}, function(newValue, oldValue) {
			if (conntype.data === "l2tp") {
				parent.form.childScope = $scope;
			}
		});

		var dynamicField = [{
			name: "network_l2tp_username"
		}, {
			name: "network_l2tp_password"
		}, {
			name: "network_l2tp_snd_conn"
		}, {
			name: "network_l2tp_dyn_server"
		}];
		var staticField = [{
			name: "network_l2tp_username"
		}, {
			name: "network_l2tp_password"
		}, {
			name: "network_l2tp_snd_conn"
		}, {
			name: "network_l2tp_static_server"
		}, {
			name: "network_l2tp_static_ip"
		}, {
			name: "network_l2tp_static_netmask"
		}, {
			name: "network_l2tp_static_gateway"
		}, {
			name: "network_l2tp_static_pridns"
		}, {
			name: "network_l2tp_static_snddns"
		}]


		$scope.form.data.network_l2tp_snd_conn.changeHandler = function(newValue, oldValue) {
			if (newValue === "dynamic") {
				$scope.form.fields = dynamicField;
			} else if (newValue === "static") {
				$scope.form.fields = staticField;
			}
		};

	}
]);
su.controllerProvider.register("qsPptp", ["$scope", "$form", "$proxy", "$url",
	function($scope, $form, $proxy, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/quick_setup?form=quick_setup")
			},
			fields: [{
				name: "network_pptp_username",
				vtype: {
					vtype: "string_visible",
				},
				maxLength: 119,
				minLength: 0
			}, {
				name: "network_pptp_password",
				maxLength: 119,
				minLength: 0
			}, {
				name: "network_pptp_snd_conn",
				vtype: {
					vtype: "ip_domain",
				},
				allowBlank: false
			}, {
				name: "network_pptp_dyn_server",
				vtype: {
					vtype: "ip_domain",
				},

				allowBlank: false
			}, {
				name: "network_pptp_static_server",
				allowBlank: false,
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_pptp_static_ip",
				vtype: {
					vtype: "netmask"
				}
			}, {
				name: "network_pptp_static_netmask",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_pptp_static_gateway",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_pptp_static_pridns",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "network_pptp_static_snddns",
				vtype: {
					vtype: "ip"
				}
			}],
			autoLoad: true
		};
		$form.config($scope, options);

		var parent = $scope.$parent.$parent;
		var conntype = parent.form.data.network_conntype;

		$scope.form.data.network_pptp_snd_conn.options = [{
			value: "dynamic",
			name: "QUICK_SETUP.DYNAMIC_IP"
		}, {
			value: "static",
			name: "QUICK_SETUP.STATIC_IP"
		}]

		$scope.$watch(function() {
			return conntype.data
		}, function(newValue, oldValue) {
			if (conntype.data === "pptp") {
				parent.form.childScope = $scope;
			}
		}, true);

		var dynamicField = [{
			name: "network_pptp_username"
		}, {
			name: "network_pptp_password"
		}, {
			name: "network_pptp_snd_conn"
		}, {
			name: "network_pptp_dyn_server"
		}];
		var staticField = [{
			name: "network_pptp_username"
		}, {
			name: "network_pptp_password"
		}, {
			name: "network_pptp_snd_conn"
		}, {
			name: "network_pptp_static_server"
		}, {
			name: "network_pptp_static_ip"
		}, {
			name: "network_pptp_static_netmask"
		}, {
			name: "network_pptp_static_gateway"
		}, {
			name: "network_pptp_static_pridns"
		}, {
			name: "network_pptp_static_snddns"
		}]


		$scope.form.data.network_pptp_snd_conn.changeHandler = function(newValue, oldValue) {
			if (newValue === "dynamic") {
				$scope.form.fields = dynamicField;
			} else if (newValue === "static") {
				$scope.form.fields = staticField;
			}
		};

	}
]);*/