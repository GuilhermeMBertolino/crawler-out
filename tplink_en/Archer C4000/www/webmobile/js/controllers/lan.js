su.controllerProvider.register("lan", ["$scope", "$form", "$msg", "$proxy", "$url", "$tool",
	function($scope, $form, $msg, $proxy, $url, $tool) {
		var options = {
			proxy: {
				url: $url.format("/admin/network?form=lan_ipv4"),
				timeout: 20000
			},
			fields: [{
				name: "macaddr",
				format: "upperCase"
			}, {
				name: "ipaddr",
				vtype: {
					vtype: "ip"
				}
			}, {
				name: "mask_type"
			}, {
				name: "custom_value",
				vtype: {
					vtype: "netmask"
				},
				allowBlank: false
			}],
			autoLoad: false,
			validator: function() {
				var ipVal = $scope.form.data.ipaddr.data;
				var maskVal = $scope.form.data.mask_type.data == "custom" ? $scope.form.data.custom_value.data : $scope.form.data.mask_type.data;

				if (!$tool.isNetIpLegal(ipVal, maskVal)) {
					//$scope.form.setError();
					$scope.form.data.ipaddr.setError("ERROR.e000042");
					$scope.form.data.mask_type.setError();
					return false;
				}

				if ($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)) {
					//$scope.form.setError("ERROR.e000042");
					$scope.form.data.ipaddr.setError("ERROR.e000042");
					$scope.form.data.mask_type.setError();
					return false;
				}

				if ($tool.isSameNet(ipVal, wanIP, wanMask) || $tool.isSameNet(wanIP, ipVal, maskVal)) {
					
					$scope.form.data.ipaddr.setError("ERROR.e000043");
					return false;
				}

				if ((connType == 'l2tp' || connType == 'pptp' || connType == 'pppoe') && wanSndIP != 0 && wanSndMask != 0 && ($tool.isSameNet(ipVal, wanSndIP, wanSndMask) || $tool.isSameNet(wanSndIP, ipVal, maskVal))) {
					
					$scope.form.data.ipaddr.setError("ERROR.e000043");
					return false;
				}
				if ($tool.isSameNet(priDnsIP, ipVal, maskVal)) {
					$scope.form.data.ipaddr.setError("ERROR.e000053");
					return false;
				}

				if ($tool.isSameNet(secDnsIP, ipVal, maskVal)) {
					$scope.form.data.ipaddr.setError("ERROR.e000053");
					return false;
				}

				return true;
			}
		};
		$form.config($scope, options);
		$form.load($scope, {}, function(data) {
			$scope.pageLoading.close();
			if (data == "undefined") return;

		}, function() {
			$scope.pageLoading.close();
		}, function() {
			$scope.pageLoading.close();
		});

		var lanIP = 0;
		var lanMask = 0;
		var wanIP = 0;
		var priDnsIP = 0;
		var secDnsIP = 0;
		var wanMask = 0;
		var wanSndIP = 0;
		var wanSndMask = 0;
		var connType = 0;
		$scope.form.data.custom_value.visible = false;
		$scope.form.data.mask_type.options = [{
			"value": "255.255.255.0",
			"name": "255.255.255.0"
		}, {
			"value": "255.255.0.0",
			"name": "255.255.0.0"
		}, {
			"value": "255.0.0.0",
			"name": "255.0.0.0"
		}, {
			"value": "custom",
			"name": "LAN.CUSTOM"
		}];

		$proxy.request({
			url: $url.format("/admin/network?form=status_ipv4")
		}, {
			operation: "read"
		}, function(data) {
			lanIP = data.lan_ipv4_ipaddr;
			lanMask = data.lan_ipv4_netmask;
			wanIP = data.wan_ipv4_ipaddr;
			wanMask = data.wan_ipv4_netmask;
			priDnsIP = data.wan_ipv4_pridns;
			secDnsIP = data.wan_ipv4_snddns;
			connType = data.wan_ipv4_conntype;
			data.wan_ipv4_snd_ipaddr ? wanSndIP = data.wan_ipv4_snd_ipaddr : 1;
			data.wan_ipv4_snd_netmask ? wanSndMask = data.wan_ipv4_snd_netmask : 1;
		});

		$scope.$watch("form.data.mask_type.data", function(newValue, oldValue) {
			if (newValue == "custom") {
				$scope.form.data.custom_value.visible = true;
			}else{
				$scope.form.data.custom_value.visible = false;
			}
		})



		$scope.form.submitBtn = {
			visible: true,
			disabled: false
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);
		

		var customFields = [{
			name: "macaddr",
			mapping: "macaddr"
		}, {
			name: "ipaddr",
			mapping: "ipaddr"
		}, {
			name: "mask_type",
			mapping: "mask_type"
		}, {
			name: "custom_value",
			mapping: "custom_value"
		}];
		var noneFields = [{
			name: "macaddr",
			mapping: "macaddr"
		}, {
			name: "ipaddr",
			mapping: "ipaddr"
		}, {
			name: "mask_type",
			mapping: "mask_type"
		}]



		$scope.save = function() {
			if($scope.form.data.mask_type.data != "custom"){
				$scope.form.serialize(["custom_value"]);
			}

			$scope.form.submit({
				operation: "write"
			}, function(data) {
				function goToNewUrl(param) {
					var oriUrl = top.location.href;
					var stIindex = oriUrl.indexOf("//");
					top.location.href = oriUrl.slice(0, stIindex + 2) + param;
				}
				if (data.new_ipaddr && data.ipaddr != data.new_ipaddr) {
					$scope.lanProgressBar.handler = function () {
						$scope.lanProMsg.close();
						goToNewUrl(data.new_ipaddr);
					}
					$scope.lanProMsg.show();
					$scope.lanProgressBar.start();



					/*var o = setTimeout(function() {
						goToNewUrl(data.new_ipaddr);
					}, 10000);*/

				}
			});

		}

		$scope.lanProgressBar = {
			visible: true,
			width: 13.12,
			max: 100,
			value: 100,
			speed: 10*1000,
			handler: function() {
				
			}
		};


		$scope.lanProMsg = $msg.create({
			id: "lan-pro-msg",
			autoClose: true,
			title: "LAN.REBOOT_TIP",
			okBtn: {
				show: false,
				text: "",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				text: "",
				cls: "cancel",
				handler: function() {}
			}
		})
	}
]);