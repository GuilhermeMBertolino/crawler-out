// JavaScript Document
su.controllerProvider.register("guest", ["$scope", "$form", "$msg", "$proxy", "$url", "$tool", "$timeout",
	function($scope, $form, $msg, $proxy, $url, $tool, $timeout) {

		var encryption = "psk";
		var wep_select_2g = "1";
		var wep_select_5g = "1";

		var URL_WIRELESS_2G_NEW = $url.format("/admin/wireless?form=wireless_2g");
		var URL_WIRELESS_5G_NEW = $url.format("/admin/wireless?form=wireless_5g");

		var options = {
			proxy: {
				url: $url.format("/admin/wireless?form=guest&form=guest_2g&form=guest_5g&form=guest_5g_2&form=guest_2g5g")
			},
			fields: [{
				name: "guest_isolate"
			}, {
				name: "guest_access"
			},{
				name: "guest_2g_enable"
			}, {
				name: "guest_2g_ssid",
				autoTrim: false,
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 32,
				allowBlank: false
			}, {
				name: "guest_2g_hidden"
			},{
				name: "guest_5g_enable"
			}, {
				name: "guest_5g_ssid",
				autoTrim: false,
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 32,
				allowBlank: false
			}, {
				name: "guest_5g_hidden"
			},{
				name: "guest_5g_2_enable"
			}, {
				name: "guest_5g_2_ssid",
				autoTrim: false,
				vtype: {
					vtype: "string_visible_allow_blank"
				},
				maxLength: 32,
				allowBlank: false
			}, {
				name: "guest_5g_2_hidden"
			},{
				name: "guest_2g5g_encryption"
			},{
				name: "guest_2g5g_psk_key",
				maxLength: 64
			},{
				name: "guest_2g5g_cipher"
			},{
				name: "guest_2g5g_psk_version",
				maxLength: 64
			}],
			autoLoad: false,
			validator: function(){
				var reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\]{8,63}|[0-9a-fA-F]{8,64}$/;

				$timeout.cancel(sePwdtError);

					 if ($scope.form.data.guest_2g5g_encryption.data == "psk") {
					var pwdVal = $scope.form.data.guest_2g5g_psk_key.data;
					if(!reg.test(pwdVal)){
						var sePwdtError = $timeout(function(){
							$scope.form.data["guest_2g5g_psk_key"].setError("ERROR.e000034");
							$scope.$apply();
						});
							return false;
						}
					}

				return true;
			}
		};
		$form.config($scope, options);

		$scope.form.name = "guest";

		$scope.form.data.guest_2g_hidden.data = "on";

		$scope.form.data.guest_2g5g_encryption.options = {
			"onValue": "psk",
			"offValue": "none"
		};

		$scope.form.modeSwitchBtn = {
			options:[{
				value: "2g",
				text: "WIRELESS.MODE_2G"
			},{
				value: "5g",
				text: "WIRELESS.MODE_5G_1"
			},{
				value: "5g_2",
				text: "WIRELESS.MODE_5G_2"
			}]
		};

		// parent.form.childScope = $scope;

		$form.load($scope, {}, function(data) {
			encryption = data.guest_2g5g_encryption;
			wep_select_2g = data.guest_2g_wep_select;

			var str = "";

			$proxy.request({
				url: $url.format("/admin/wireless?form=region")
			}, {
				operation: "read"
			}, function(data) {
				var channel_5g = data.capability.channel_5g;

				if ($tool.isEmptyObject(channel_5g)) {
					if($scope.form.modeSwitchBtn.data == "5g"){
						$scope.form.modeSwitchBtn.data = "2g";
					}
					$scope.form.modeSwitchBtn.options[1].disabled = true;
				}else{
					$scope.form.modeSwitchBtn.options[1].disabled = false;
				}
			});

			$scope.pageLoading.close();

		}, function() {
			$scope.pageLoading.close();
		}, function() {
			$scope.pageLoading.close();
		});

		var guestSaveMsg = $msg.create({
			content: "GUEST_SETTINGS.GUEST_SAVE_NOTE",
		});

		$scope.form.submitBtn = {
			visible: true,
			disabled: false
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		$scope.save = function() {

			var isDirty = $scope.form.isDirty();

			$scope.form.submit({
				operation: "write"
			},function(data){
				if(isDirty){
					$timeout(function(){guestSaveMsg.show()},1000, false);
				}
			});

			/*if(angular.isDefined($scope.form.childScope)){
				var serial = [];
				if($scope.form.childScope.form.name == "guest2g"){
					if($scope.form.childScope.form.data.guest_2g_encryption.data == "none"){
						serial.push("guest_2g_psk_key");
					}
				}else if($scope.form.childScope.form.name == "guest5g"){
					if($scope.form.childScope.form.data.guest_5g_encryption.data == "none"){
						serial.push("guest_5g_psk_key");
					}
				}

				$scope.form.serialize(serial);

				var isDirty = $scope.form.isDirty();
				$scope.form.submit({
					operation: "write"
				},function(data){
					if(isDirty){
						$timeout(function(){guestSaveMsg.show()},1000, false);
					}
				});
			}*/
		};
				

		//////////////////////////////////////////////////////////////////


	var wireless_2g_disabled = "off";
	var wireless_2g_disabled_all = "off";
	var parent = $scope.$parent.$parent;

	$proxy.request({
		url: $url.format("/admin/wireless?form=wireless_2g")
	}, {

	}, function(data) {
		if (typeof data == "undefined") {
			return;
		}
		wireless_2g_disabled = data.disabled;
		wireless_2g_disabled_all = data.disabled_all;

		var wds_guest_compatible = data.extinfo.wds_guest_compatible;
		// if (wireless_2g_disabled == "on") {
		// 	$scope.form.data.guest_2g_enable.disabled = true;
		// 	$scope.form.data.guest_2g_ssid.disabled = true;
		// 	$scope.form.data.guest_2g_hidden.disabled = true;
		// } else {
			$scope.form.data.guest_2g_enable.disabled = false;
			$scope.form.data.guest_2g_ssid.disabled = false;
			$scope.form.data.guest_2g_hidden.disabled = false;
			if (wireless_2g_disabled_all == "on") {
				$scope.form.data.guest_2g_enable.disabled = true;
				//$scope.form.data.guest_2g_enable.data = "off";

				//$("#status_2g").checkbox("setTips", $.su.CHAR.WIRELESS.ENABLE_TIPS);//待修改
			} else {
				$scope.form.data.guest_2g_enable.disabled = false;
				//$scope.form.data.guest_2g_enable.data = "off";

				//$("#status_2g").checkbox("setTips", "");//待修改
				if (wds_guest_compatible == "no") {
					$proxy.request({
						url: $url.format("/admin/wireless?form=syspara_2g")
					}, {
						operation: "read"
					}, function(data) {
						enable = data.enable;
						if (enable == "on") {
							$scope.form.data.guest_2g_enable.disabled = true;
						} else {
							$scope.form.data.guest_2g_enable.disabled = false;
							// $("input#enable_2g").switchbutton("enable");
							// $("input#enable_2g").switchbutton("setTips", "");
						}
					});
				}
			}
		// }
	});


		//////////////////////////////////////////////////////////////////

	var wireless_5g_disabled = "off";
	var wireless_5g_disabled_all = "off";
	var parent = $scope.$parent.$parent;

		/*$scope.form.data.guest_5g_encryption.options = {
		"onValue": "psk",
		"offValue": "none"
		};*/

	$proxy.request({
		url: $url.format("/admin/wireless?form=wireless_5g")
	}, {

	}, function(data) {
		if (typeof data == "undefined") {
			return;
		}
		wireless_5g_disabled = data.disabled;
		wireless_5g_disabled_all = data.disabled_all;

		var wds_guest_compatible = data.extinfo.wds_guest_compatible;
		// if (wireless_5g_disabled == "on") {
		// 	$scope.form.data.guest_5g_enable.disabled = true;
		// 	$scope.form.data.guest_5g_ssid.disabled = true;
		// 	$scope.form.data.guest_5g_hidden.disabled = true;
		// } else {
			$scope.form.data.guest_5g_enable.disabled = false;
			$scope.form.data.guest_5g_ssid.disabled = false;
			$scope.form.data.guest_5g_hidden.disabled = false;
			if (wireless_5g_disabled_all == "on") {
				$scope.form.data.guest_5g_enable.disabled = true;
				//$scope.form.data.guest_5g_enable.data = "off";
				//$("#status_5g").checkbox("setTips", $.su.CHAR.WIRELESS.ENABLE_TIPS);//待修改
			} else {
				$scope.form.data.guest_5g_enable.disabled = false;
					//$scope.form.data.guest_5g_enable.data = "off";

				//$("#status_5g").checkbox("setTips", "");//待修改

				if (wds_guest_compatible == "no") {
					$proxy.request({
						url: $url.format("/admin/wireless?form=syspara_5g")
					}, {
						operation: "read"
					}, function(data) {
						enable = data.enable;
						if (enable == "on") {
							$scope.form.data.guest_5g_enable.disabled = true;
						} else {
							$scope.form.data.guest_5g_enable.disabled = false;
						}
					});
				}
			}
		// }
	});



		//////////////////////////////////////////////////////////////////

	var wireless_5g_2_disabled = "off";
	var wireless_5g_2_disabled_all = "off";
	var parent = $scope.$parent.$parent;

		/*$scope.form.data.guest_5g_2_encryption.options = {
		"onValue": "psk",
		"offValue": "none"
		};*/

	$proxy.request({
		url: $url.format("/admin/wireless?form=wireless_5g_2")
	}, {

	}, function(data) {
		if (typeof data == "undefined") {
			return;
		}
		wireless_5g_2_disabled = data.disabled;
		wireless_5g_2_disabled_all = data.disabled_all;

		var wds_guest_compatible = data.extinfo.wds_guest_compatible;
		// if (wireless_5g_2_disabled == "on") {
		// 	$scope.form.data.guest_5g_2_enable.disabled = true;
		// 	$scope.form.data.guest_5g_2_ssid.disabled = true;
		// 	$scope.form.data.guest_5g_2_hidden.disabled = true;
		// } else {
			$scope.form.data.guest_5g_2_enable.disabled = false;
			$scope.form.data.guest_5g_2_ssid.disabled = false;
			$scope.form.data.guest_5g_2_hidden.disabled = false;
			if (wireless_5g_2_disabled_all == "on") {
				$scope.form.data.guest_5g_2_enable.disabled = true;
				//$scope.form.data.guest_5g_2_enable.data = "off";
				//$("#status_5g_2").checkbox("setTips", $.su.CHAR.WIRELESS.ENABLE_TIPS);//待修改
			} else {
				$scope.form.data.guest_5g_2_enable.disabled = false;
					//$scope.form.data.guest_5g_2_enable.data = "off";

				//$("#status_5g_2").checkbox("setTips", "");//待修改

				if (wds_guest_compatible == "no") {
					$proxy.request({
							url: $url.format("/admin/wireless?form=syspara_5g_2")
					}, {
						operation: "read"
					}, function(data) {
						enable = data.enable;
						if (enable == "on") {
							$scope.form.data.guest_5g_2_enable.disabled = true;
						} else {
							$scope.form.data.guest_5g_2_enable.disabled = false;
						}
					});
				}
			}
		// }
	});

	////////////

	}
]);
