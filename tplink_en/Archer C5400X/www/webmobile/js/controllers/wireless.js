// JavaScript Document
su.controllerProvider.register("wireless", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){

	$scope.pageLoading.close();
}]);

su.controllerProvider.register("wirelessSettings", ["$scope","$form","$msg","$proxy", "$const","$url", "$tool", "$timeout", function($scope, $form, $msg, $proxy, $const, $url, $tool, $timeout){
	var wirelessRegionUrl = $url.format("/admin/wireless?form=region");
	var regionOptionsUrl = $url.format("/admin/region?form=region");
	var sysWireless2gUrl = $url.format("/admin/wireless?form=syspara_2g");
	var sysWireless5gUrl = $url.format("/admin/wireless?form=syspara_5g");
	var sysWireless52gUrl = $url.format("/admin/wireless?form=syspara_5g_2");

	var lanIPv4 = $url.format("/admin/network?form=lan_ipv4");
	
	var wirelessSaveMsg = $msg.create({
		title: "WIRELESS.WIRELESS_SAVE_NOTE",
	});
	
	var options = {
		proxy:{
			url: wirelessRegionUrl
		},
		fields:[{
			name:"country"
		}],
		autoLoad: false
	}

	$form.config($scope, options);
	$scope.form.data.country.visible = false;
	$scope.form.submitBtn = {};

	$scope.form.dirtyShowSave($scope.form.submitBtn);
	/*$scope.$watch(function(){ return $scope.form.isDirty()}, function(){
		$scope.form.submitBtn.visible = $scope.form.isDirty();
	});*/
	$proxy.request({
		url: regionOptionsUrl
	},{}, function(data, others){
		for (var index = 0, len = data.length; index < len; index++) {
			data[index]["name"] = $const.COUNTRY[data[index]["name"]];
		};
		$scope.form.data.country.options = data;
		$scope.form.childScope = undefined;
		$scope.form.proxy.url = wirelessRegionUrl;

		$form.load($scope, {}, function(data, others){
			$scope.capability = data.capability;
			setMode(data.capability);
			$scope.$broadcast("regionchange", $scope.capability);
		});
	});

	$scope.lanIP = 0;
	$scope.lanMask = 0;

	$proxy.request({
		url: lanIPv4
	}, {}, function(data, others){
		$scope.lanIP = data.ipaddr;
		$scope.lanMask = data.mask_type;
	})


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

	$scope.back = function(){

		$scope.form.back(function(){
			$scope.$parent.$parent.form.menuItem = "";
		});
		//$scope.$parent.$parent.form.menuItem = "";
	};

	$scope.save = function(){
		if(angular.isDefined($scope.form.childScope)){
			var encryption = $scope.form.childScope.form.data.encryption.data;
			var serials = ["country"];

			switch(encryption){
				case "none":
					serials.push("psk_cipher", "psk_key", "psk_version", "wpa_cipher", "wpa_version", "wpa_key", "wep_key1", "wep_format1", "wep_type1", "server", "port", "wep_mode", "wep_select");
					break;
				case "psk":
					serials.push("wpa_cipher", "wpa_version", "wpa_key", "wep_key1", "wep_format1", "wep_type1", "server", "port", "wep_mode", "wep_select");
					break;
				case "wpa":
					serials.push("psk_cipher", "psk_key", "psk_version","wep_key1", "wep_format1", "wep_type1", "wep_mode", "wep_select");
					break;
				case "wep":
					serials.push("psk_cipher", "psk_key", "psk_version", "wpa_cipher", "wpa_version", "wpa_key", "server", "port");
					break;
			}

			$scope.form.serialize(serials);

			var disabledAll;
			var enable = $scope.form.childScope.form.data.enable.data;	
			if(enable == "on"){
				disabledAll = "off";
			} else {
				disabledAll = "on"
			};

			if($scope.form.modeSwitchBtn.data == "2g"){
				var disableExtra = {disabled_all : disabledAll}
			} else {
				var disableExtra = {disabled_all : disabledAll}
			}

			$scope.form.fields = [];

			var isDirty = $scope.form.isDirty();
			$scope.form.submit(disableExtra, function(data, others){
				var disabled = "";
				// if(data.disabled == "on"){
				// 	disabled = "on";
				// 	$scope.form.childScope.form.disable();
				// 	disabledMsg.show();
				// } else {
					disabled = "off";
					$scope.form.childScope.form.enable();
					disabledMsg.close();
				// }

				if($scope.form.modeSwitchBtn.data == "2g"){
					$proxy.request({
						url: sysWireless2gUrl
					}, {}, function(data, others){
						if(data && data.enable == "on"){
							$scope.form.childScope.form.data.channel.disabled = true;
						} else {
							$scope.form.childScope.form.data.channel.disabled = false;
						};
						if(disabled == "on"){
							$scope.form.childScope.form.disable();
							disabledMsg.show();
						} else {
							disabledMsg.close();
							$scope.form.childScope.form.enable();
						}
					});
				} else if($scope.form.modeSwitchBtn.data == "5g"){
					$proxy.request({
						url: sysWireless5gUrl
					}, {}, function(data, others){
						if(data && data.enable == "on"){
							$scope.form.childScope.form.data.channel.disabled = true;
						} else {
							$scope.form.childScope.form.data.channel.disabled = false;
						};
						if(disabled == "on"){
							$scope.form.childScope.form.disable();
							disabledMsg.show();
						} else {
							disabledMsg.close();
							$scope.form.childScope.form.enable();
						}
					});
				} else if($scope.form.modeSwitchBtn.data == "5g_2"){
					$proxy.request({
						url: sysWireless52gUrl
					}, {}, function(data, others){
						if(data && data.enable == "on"){
							$scope.form.childScope.form.data.channel.disabled = true;
						} else {
							$scope.form.childScope.form.data.channel.disabled = false;
						};
						if(disabled == "on"){
							$scope.form.childScope.form.disable();
							disabledMsg.show();
						} else {
							disabledMsg.close();
							$scope.form.childScope.form.enable();
						}
					});
				}
				if(isDirty){
					$timeout(function(){wirelessSaveMsg.show()},1000, false);
				}
			});
		}
	};

	var disabledMsg = $msg.create({
		iconCls: "alert",
		content: "WIRELESS.WIRELESS_TURN_OFF_INFO"
	})


	$scope.form.data.country.changeHandler = function(newVal, oldVal){
		
		if(newVal !== "" && newVal !== oldVal && oldVal !== ""){

			$scope.form.childScope = undefined;
			$scope.form.proxy.url = wirelessRegionUrl;
			$scope.form.fields = [{
				name: "country"
			}];
			$scope.form.submit({}, function(data, others){
				$scope.capability = data.capability;
				setMode(data.capability); 
				$scope.$broadcast("regionchange", $scope.capability);

			},function(){

			},function(){
				
			},true);
		}
		
	};

	//判断是否支持5g
	var setMode = function(data){
		if($tool.isEmptyObject(data.channel_5g)){

			if($scope.form.modeSwitchBtn.data == "2g"){
				$scope.form.modeSwitchBtn.options[1].disabled = true;
				$scope.form.modeSwitchBtn.options[2].disabled = true;
			} else {
				$scope.form.modeSwitchBtn.data = "2g";
				$scope.form.modeSwitchBtn.options[1].disabled = true;
				$scope.form.modeSwitchBtn.options[2].disabled = true;
			}
		} else {
			$scope.form.modeSwitchBtn.options[1].disabled = false;
			$scope.form.modeSwitchBtn.options[2].disabled = false;
		}
	};



}]);

su.controllerProvider.register("2g", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	var wireless2gUrl = $url.format("/admin/wireless?form=wireless_2g");
	var wireless2gSubmitUrl = $url.format("/admin/wireless?form=wireless_2g&form=region");
	var sysWireless2gUrl = $url.format("/admin/wireless?form=syspara_2g");
	var parent = $scope.$parent.$parent;

	var global_hwmode_2g_options = [];
	var globalCapability = {};
	var globalHtmodeOptions = [];

	//设置当前子scope
	var setChildScope = function(){
		parent.form.childScope = $scope;
		parent.form.proxy.url = wireless2gUrl;
	};

	//根据国家设置对应下拉选项
	var setOptions = function(capability){
		globalCapability = capability;
		var hwmode_2g = capability.hwmode_2g;
		var htmode_2g = capability.htmode_2g;
		var channel_2g = capability.channel_2g;

		var hwmode_2g_options = [];
		for (var index = 0, len=hwmode_2g.length; index < len; index++) {
			hwmode_2g_options[index] = {};
			hwmode_2g_options[index].value = hwmode_2g[index];
			hwmode_2g_options[index].name = $const.MODE["MODE_" + hwmode_2g[index].toUpperCase()];
		};
		$scope.form.data.hwmode.options = hwmode_2g_options;
		global_hwmode_2g_options = angular.copy($scope.form.data.hwmode.options);

		var htmode_2g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];

		for (var index = 0, len=htmode_2g.length; index < len; index++) {
			var item = {};
			item.value = htmode_2g[index];
			item.name = htmode_2g[index] + "Mhz";
			htmode_2g_options.push(item);
		};
		$scope.form.data.htmode.options = htmode_2g_options;
		globalHtmodeOptions = angular.copy(htmode_2g_options);

		var channel_2g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];
		for (var index = 0, len=channel_2g.length; index < len; index++) {
			var item = {};
			item.value = channel_2g[index];
			item.name = channel_2g[index].toString();
			channel_2g_options.push(item);
		};
		$scope.form.data.channel.options = channel_2g_options;
	};

	var getHtChannel = function(chan, width){
		var newchan=[];
		newchan[0] = {"name":"WIRELESS.AUTO", "value":"auto"};
		var len = chan.length;
		
		if (!(width % 20)) 
		{
			var prev = -1;
			var count = 0;
			for (var i = 0; i <= len; i ++)
			{
				var tempObj = {};
				if(typeof(chan[i]) === "number"){
					ch = parseInt(chan[i]);
				}
				else{
					ch = chan[i];
				}
				if (prev < 0 || prev + 4 == ch) 
				{
					count += 20;
				} 
				else 
				{
					while (count % width)
					{
						newchan.pop()
						count -= 20;
					}
					if (isNaN(ch)) {
						break;
					}
					count = 20;
				}
				prev = ch-0;
				tempObj.name 	= ch.toString();
				tempObj.value 	= ch;
				newchan.push(tempObj);
			}
		}
		return newchan;
	};

	var disabledMsg = $msg.create({
		iconCls: "alert",
		content: "WIRELESS.WIRELESS_TURN_OFF_INFO"
	})
	var formLoad = function(){
		var disable2g = "";
		$scope.form.load({}, function(data, others){
			// if(data.disabled == "on"){
			// 	disabled2g = "on";
			// 	disabledMsg.show();
			// 	parent.form.disable();
			// 	//$scope.form.disable();
			// } else {
				disabled2g = "off";
				disabledMsg.close();
				parent.form.enable();
			// };

			$proxy.request({
				url: sysWireless2gUrl
			}, {}, function(data, others){
				if(data && data.enable == "on"){
					$scope.form.data.channel.disabled = true;
				} else {
					$scope.form.data.channel.disabled = false;
				};
				// if(disabled2g == "on"){
				// 	$scope.form.disable();
				// 	disabledMsg.show();
				// } else {
				// 	disabledMsg.close();
				// 	$scope.form.enable();
				// }
			});
		});
	}

	var options = {
		proxy:{
			url: wireless2gUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "ssid",
			maxLength:32,
			autoTrim:false,
			allowBlank:false
		},{
			name: "hidden"
		},{
			name: "encryption",
			allowBlank:false
		},{
			name: "psk_version"
		},{
			name: "psk_cipher"
		},{
			name: "psk_key"
		},{
			name: "wpa_version"
		},{
			name: "wpa_cipher"
		},{
			name: "server",
			maxLength:15,
			allowBlank: false,
			vtype:"ip"
		},{
			name: "port",
			maxLength:5,
			allowBlank: false,
			vtype:{
				vtype:"number",
				config: {
					min:1,
					max:65535
				}
			}
		},{
			name: "wpa_key",
			maxLength:64,
			autoTrim:false,
			allowBlank:false,
			vtype: "password"
		},{
			name: "wep_mode"
		},{
			name: "wep_select"
		},{
			name: "wep_format1"
		},{
			name: "wep_type1"
		},{
			name: "wep_key1"
		},{
			name: "htmode",
			allowBlank:false
		},{
			name: "hwmode",
			allowBlank:false
		},{
			name: "channel",
			allowBlank:false
		},{
			name: "txpower",
			allowBlank:false
		}],
		validator: function(scope){
			var encryption = scope.form.data.encryption.data;
			var lanIP = parent.lanIP;
			if(encryption == "none"){
				return true;
			}

			if(encryption == "wpa"){
				var server = scope.form.data.server.data;
				if($tool.ipToInt(server) == $tool.ipToInt(lanIP)){
					scope.form.data.server.setError("ERROR.e000106");
					return false;
				}
			};

			if(encryption == "psk"){
				var pskKey = scope.form.data.psk_key.data;
				var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
				if(reg.test(pskKey))
				{
					return true;
				}
				else
				{
					scope.form.data.psk_key.setError("ERROR.e000107");
					return false;
				} 
			};

			if(encryption == "wep"){
				var format = scope.form.data.wep_format1.data;
				var type = scope.form.data.wep_type1.data;
				var key = scope.form.data.wep_key1.data;

				var asc_64_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}$/;
				var asc_128_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13}$/;
				var asc_152_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{16}$/;
				

				var hex_64_reg = /^[0-9a-fA-F]{10}$/;
				var hex_128_reg = /^[0-9a-fA-F]{26}$/;
				var hex_152_reg = /^[0-9a-fA-F]{32}$/;

				if(format == "asic")
				{
					if(type == 64)
					{
						if(asc_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000108");
							return false;
						}
					}
					else if(type == 128)
					{
						if(asc_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000109");
							return false;
						}
					}
					else
					{
						if(asc_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000110");
							return false;
						}
					}
				}
				else
				{
					if(type == 64)
					{
						if(hex_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000111");
							return false;
						}
					}
					else if(type == 128)
					{
						if(hex_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000112");
							return false;
						}
					}
					else
					{
						if(hex_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000113");
							return false;
						}
					}
				}
			}

			return true;

		},
		autoLoad: false
	}

	$form.config($scope, options);
	$scope.form.data.encryption.options = [
		{value: "none", name: "WIRELESS.NO_SECURITY"},
		{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
		{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
		{value: "wep", name: "WIRELESS.WEP"}
	];

	$scope.form.data.txpower.options = [
		{value: "low", name: "WIRELESS.LOW"},
		{value: "middle", name: "WIRELESS.MIDDLE"},
		{value: "high", name: "WIRELESS.HIGH"}
	];

	$scope.form.data.psk_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA_PSK"},
		{value: "rsn", name: "WIRELESS.WPA2_PSK"}
	];

	$scope.form.data.psk_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wpa_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA"},
		{value: "rsn", name: "WIRELESS.WPA2"}
	];

	$scope.form.data.wpa_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wep_mode.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "open", name: "WIRELESS.OPEN_SYSTEM"},
		{value: "shared", name: "WIRELESS.SHARED_KEY"}
	];

	$scope.form.data.wep_format1.options = [
		{value: "asic", name: "WIRELESS.ASCII"},
		{value: "hex", name: "WIRELESS.HEXADECIMAL"}
	];

	$scope.form.data.wep_type1.options = [
		{value: "64", name: "WIRELESS.BIT64"},
		{value: "128", name: "WIRELESS.BIT128"},
		{value: "152", name: "WIRELESS.BIT152"}
	];

	setChildScope();

	if($scope.$parent.$parent.capability){
		setOptions($scope.$parent.$parent.capability);

		formLoad();
	}

	$scope.$on("regionchange", function(e, capability){
		setOptions(capability);

		formLoad();
		setChildScope();
	});

	$scope.form.data.encryption.changeHandler =  function(){
		var psk_cipher = $scope.form.data.psk_cipher.data || "";
		var wpa_cipher = $scope.form.data.wpa_cipher.data || "";
		var hwmode = $scope.form.data.hwmode.data || "";

		var hwmode_2g_options_extra = $tool.deleteInArray(global_hwmode_2g_options, ["n"]);
		var cipher_options_extra = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.hwmode.options = global_hwmode_2g_options;
		$scope.form.data.psk_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.wpa_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		switch($scope.form.data.encryption.data){
			case "psk":
				if((psk_cipher == "tkip" && hwmode == "n")){
					$scope.form.data.psk_cipher.data = "auto"
				}

				if(psk_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmode_2g_options_extra;
				}

				if(hwmode == "n"){
					$scope.form.data.psk_cipher.options = cipher_options_extra;
				}
				break;

			case "wpa":
				if((wpa_cipher == "tkip" && hwmode == "n")){
					$scope.form.data.wpa_cipher.data = "auto"
				}

				if(wpa_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmode_2g_options_extra;
				}

				if(hwmode == "n"){
					$scope.form.data.wpa_cipher.options = cipher_options_extra;
				}
				break;
			case "wep":
				$scope.form.data.hwmode.options = hwmode_2g_options_extra;
				break;

		}
	};

	$scope.form.data.psk_cipher.changeHandler = function(){
		var hwmode_2g_options_extra = $tool.deleteInArray(global_hwmode_2g_options, ["n"]);
		$scope.form.data.hwmode.options = global_hwmode_2g_options;

		if($scope.form.data.encryption.data === "psk"){
			if($scope.form.data.psk_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmode_2g_options_extra;
			}
		}
	};

	$scope.form.data.wpa_cipher.changeHandler = function(){
		var hwmode_2g_options_extra = $tool.deleteInArray(global_hwmode_2g_options, ["n"]);
		$scope.form.data.hwmode.options = global_hwmode_2g_options;

		if ($scope.form.data.encryption.data === "wpa"){
			if($scope.form.data.wpa_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmode_2g_options_extra;
			}
		}
	};

	$scope.form.data.hwmode.changeHandler = function(){
		var hwmode = $scope.form.data.hwmode.data;
		if(hwmode == "n"){
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		} else {
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
				{value: "wep", name: "WIRELESS.WEP"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		};

		if(globalCapability.channel_2g && globalCapability.channel_2g.length > 13){
			var channelVal = $scope.form.data.channel.data;
			var channel20 = getHtChannel(globalCapability.channel_2g, 20);

			if(hwmode != "b") {
				channel20.pop();
			}

			$scope.form.data.channel.options = channel20;

			if($tool.valInArray(channelVal, channel20) !== -1){
				$scope.form.data.channel.data = channelVal;
			} else {
				$scope.form.data.channel.data = "auto";
			}
		};

		switch(hwmode){
			case "b":
			case "g":
			case "bg":
				var htmodeOptions = $tool.deleteInArray(globalHtmodeOptions, ["40"]);
				$scope.form.data.htmode.options = htmodeOptions;
				$scope.form.data.htmode.data = "auto";
				$scope.form.data.htmode.visible = false;
				break;
			case "n":
			case "gn":
			case "bgn":
			default:
				$scope.form.data.htmode.options = globalHtmodeOptions;
				$scope.form.data.htmode.visible = true;
		}
	};	

}]);

su.controllerProvider.register("5g", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	var wireless5gUrl = $url.format("/admin/wireless?form=wireless_5g");
	var wireless5gSubmitUrl = $url.format("/admin/wireless?form=wireless_5g&form=region");
	var sysWireless5gUrl = $url.format("/admin/wireless?form=syspara_5g");

	var parent = $scope.$parent.$parent;
	var globalHwmodeOptions = [];
	var globalCapability = {};
	var globalHtmodeOptions = [];

	var setChildScope = function(){
		parent.form.childScope = $scope;
		parent.form.proxy.url = wireless5gUrl;
	};

	var setOptions = function(capability){
		globalCapability = capability;
		var hwmode_5g = capability.hwmode_5g;
		var htmode_5g = capability.htmode_5g;
		var channel_5g = capability.channel_5g;

		var hwmode_5g_options = [];
		for (var index = 0, len=hwmode_5g.length; index < len; index++) {
			hwmode_5g_options[index] = {};
			hwmode_5g_options[index].value = hwmode_5g[index];
			hwmode_5g_options[index].name = $const.MODE["MODE_" + hwmode_5g[index].toUpperCase()];
		};
		$scope.form.data.hwmode.options = hwmode_5g_options;
		globalHwmodeOptions = hwmode_5g_options;
		
		var htmode_5g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];
		for (var index = 0, len=htmode_5g.length; index < len; index++) {
			var item = {};
			item.value = htmode_5g[index];
			item.name = htmode_5g[index] + "Mhz";
			htmode_5g_options.push(item);
		};
		$scope.form.data.htmode.options = htmode_5g_options;
		globalHtmodeOptions = htmode_5g_options;

		var channel_5g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];
		for (var index = 0, len=channel_5g.length; index < len; index++) {
			var item = {};
			item.value = channel_5g[index];
			item.name = channel_5g[index].toString();
			channel_5g_options.push(item);
		};
		$scope.form.data.channel.options = channel_5g_options;
		
	}

	var getHtChannel = function(chan, width){
		var newchan=[];
		newchan[0] = {"name":"WIRELESS.AUTO", "value":"auto"};
		var len = chan.length;
		
		if (!(width % 20)) 
		{
			var prev = -1;
			var count = 0;
			for (var i = 0; i <= len; i ++)
			{
				var tempObj = {};
				if(typeof(chan[i]) === "number"){
					ch = parseInt(chan[i]);
				}
				else{
					ch = chan[i];
				}
				if (prev < 0 || prev + 4 == ch) 
				{
					count += 20;
				} 
				else 
				{
					while (count % width)
					{
						newchan.pop()
						count -= 20;
					}
					if (isNaN(ch)) {
						break;
					}
					count = 20;
				}
				prev = ch-0;
				tempObj.name 	= ch.toString();
				tempObj.value 	= ch;
				newchan.push(tempObj);
			}
		}
		return newchan;
	};

	var disabledMsg = $msg.create({
		iconCls: "alert",
		content: "WIRELESS.WIRELESS_TURN_OFF_INFO"
	})
	var formLoad = function(){
		var disable5g = "";
		$scope.form.load({}, function(data, others){
			// if(data.disabled == "on"){
			// 	disabled5g = "on";
			// 	disabledMsg.show();
			// 	parent.form.disable();
			// } else {
				disabled5g = "off";
				disabledMsg.close();
				parent.form.enable();
			// };

			$proxy.request({
				url: sysWireless5gUrl
			}, {}, function(data, others){
				if(data && data.enable == "on"){
					$scope.form.data.channel.disabled = true;
				} else {
					$scope.form.data.channel.disabled = false;
				};
				// if(disabled5g == "on"){
				// 	disabledMsg.show();
				// 	$scope.form.disable();
				// } else {
				// 	disabledMsg.close();
				// 	$scope.form.enable();
				// }
			});
		});
	}

	var options = {
		proxy: {
			url: wireless5gUrl
		},
		fields: [{
			name: "enable"
		},{
			name: "ssid",
			maxLength:32,
			autoTrim:false,
			allowBlank:false,
			vtype: "string_visible_allow_blank"
		},{
			name: "hidden"
		},{
			name: "encryption",
			allowBlank:false
		},{
			name: "psk_version"
		},{
			name: "psk_cipher"
		},{
			name: "psk_key"
		},{
			name: "wpa_version"
		},{
			name: "wpa_cipher"
		},{
			name: "server",
			maxLength:15,
			allowBlank: false,
			vtype: "ip"
		},{
			name: "port",
			maxLength:5,
			allowBlank: false,
			vtype:{
				vtype:"number",
				config:{
					min:1,
					max:65535
				}
			}
		},{
			name: "wpa_key",
			maxLength:64,
			allowBlank:false,
			vtype:"password"
		},{
			name: "wep_mode"
		},{
			name: "wep_select"
		},{
			name: "wep_format1"
		},{
			name: "wep_type1"
		},{
			name: "wep_key1"
		},{
			name: "hwmode",
			allowBlank:false
		},{
			name: "htmode",
			allowBlank:false
		},{
			name: "channel",
			allowBlank:false
		},{
			name: "txpower",
			allowBlank:false
		}],
		validator: function(scope){
			var encryption = scope.form.data.encryption.data;
			var lanIP = parent.lanIP;
			if(encryption == "none"){
				return true;
			}

			if(encryption == "wpa"){
				var server = scope.form.data.server.data;
				if($tool.ipToInt(server) == $tool.ipToInt(lanIP)){
					scope.form.data.server.setError("ERROR.e000106");
					return false;
				}
			};

			if(encryption == "psk"){
				var pskKey = scope.form.data.psk_key.data;
				var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
				if(reg.test(pskKey))
				{
					return true;
				}
				else
				{
					scope.form.data.psk_key.setError("ERROR.e000107");
					return false;
				} 
			};

			if(encryption == "wep"){
				var format = scope.form.data.wep_format1.data;
				var type = scope.form.data.wep_type1.data;
				var key = scope.form.data.wep_key1.data;

				var asc_64_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}$/;
				var asc_128_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13}$/;
				var asc_152_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{16}$/;
				

				var hex_64_reg = /^[0-9a-fA-F]{10}$/;
				var hex_128_reg = /^[0-9a-fA-F]{26}$/;
				var hex_152_reg = /^[0-9a-fA-F]{32}$/;

				if(format == "asic")
				{
					if(type == 64)
					{
						if(asc_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000108");
							return false;
						}
					}
					else if(type == 128)
					{
						if(asc_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000109");
							return false;
						}
					}
					else
					{
						if(asc_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000110");
							return false;
						}
					}
				}
				else
				{
					if(type == 64)
					{
						if(hex_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000111");
							return false;
						}
					}
					else if(type == 128)
					{
						if(hex_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000112");
							return false;
						}
					}
					else
					{
						if(hex_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000113");
							return false;
						}
					}
				}
			}

			return true;

		},
		autoLoad: false
	}

	$form.config($scope, options);

	$scope.form.data.encryption.options = [
		{value: "none", name: "WIRELESS.NO_SECURITY"},
		{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
		{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
		{value: "wep", name: "WIRELESS.WEP"}
	];

	$scope.form.data.txpower.options = [
		{value: "low", name: "WIRELESS.LOW"},
		{value: "middle", name: "WIRELESS.MIDDLE"},
		{value: "high", name: "WIRELESS.HIGH"}
	];

	$scope.form.data.psk_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA_PSK"},
		{value: "rsn", name: "WIRELESS.WPA2_PSK"}
	];

	$scope.form.data.psk_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wpa_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA"},
		{value: "rsn", name: "WIRELESS.WPA2"}
	];

	$scope.form.data.wpa_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wep_mode.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "open", name: "WIRELESS.OPEN_SYSTEM"},
		{value: "shared", name: "WIRELESS.SHARED_KEY"}
	];

	$scope.form.data.wep_format1.options = [
		{value: "asic", name: "WIRELESS.ASCII"},
		{value: "hex", name: "WIRELESS.HEXADECIMAL"}
	];

	$scope.form.data.wep_type1.options = [
		{value: "64", name: "WIRELESS.BIT64"},
		{value: "128", name: "WIRELESS.BIT128"},
		{value: "152", name: "WIRELESS.BIT152"}
	];


	setChildScope();

	if($scope.$parent.$parent.capability){
		setOptions($scope.$parent.$parent.capability);

		formLoad();
	}

	$scope.$on("regionchange", function(e, capability){
		if(!$tool.isEmptyObject(capability.channel_5g)){
			setOptions(capability);
			formLoad();
			setChildScope();
		}
	});

	//disabled_all 字段随enable的值变化
	// $scope.$watch(function(){return $scope.form.data.enable.data}, function(newVal, oldVal){
	// 	if(newVal !== oldVal){
	// 		if(newVal == "on"){
	// 			$scope.form.data.disabled_all.data = "off";
	// 		} else {
	// 			$scope.form.data.disabled_all.data = "on";
	// 		}
	// 	}
	// });

	$scope.form.data.encryption.changeHandler = function(){
		var psk_cipher = $scope.form.data.psk_cipher.data || "";
		var wpa_cipher = $scope.form.data.wpa_cipher.data || "";
		var hwmode = $scope.form.data.hwmode.data || "";

		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["n_5","ac_5","nac_5"]);
		var cipherOptionsExtra = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.hwmode.options = globalHwmodeOptions;
		$scope.form.data.psk_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.wpa_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		switch($scope.form.data.encryption.data){
			case "psk":
				if((psk_cipher == "tkip") && (hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5")){
					$scope.form.data.psk_cipher.data = "auto"
				}

				if(psk_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				}

				if(hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5"){
					$scope.form.data.psk_cipher.options = cipherOptionsExtra;
				}
				break;

			case "wpa":
				if((wpa_cipher == "tkip") && (hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5")){
					$scope.form.data.wpa_cipher.data = "auto"
				}

				if(wpa_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				}

				if(hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5"){
					$scope.form.data.wpa_cipher.options = cipherOptionsExtra;
				}
				break;

			case "wep":
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				break;
		}
	};

	$scope.form.data.psk_cipher.changeHandler = function(){
		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["n_5","ac_5","nac_5"]);
		$scope.form.data.hwmode.options = globalHwmodeOptions;

		if($scope.form.data.encryption.data === "psk"){
			if($scope.form.data.psk_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
			}
		}
	};

	$scope.form.data.wpa_cipher.changeHandler = function(){
		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["ac_5","n_5","nac_5"]);
		$scope.form.data.hwmode.options = globalHwmodeOptions;

		if ($scope.form.data.encryption.data === "wpa"){
			if($scope.form.data.wpa_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
			}
		}
	};

	$scope.form.data.hwmode.changeHandler = function(){
		
		var hwmode = $scope.form.data.hwmode.data;
		if( hwmode == "ac_5" || hwmode == "n_5" || hwmode == "nac_5"){
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		} else {
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
				{value: "wep", name: "WIRELESS.WEP"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		};

		switch(hwmode){
			case "a_5":
				var htmodeOptions = $tool.deleteInArray(globalHtmodeOptions, ["40", "80"]);
				$scope.form.data.htmode.options = htmodeOptions;
				$scope.form.data.htmode.data = "auto";
				$scope.form.data.htmode.visible = false;
				break;
			case "n_5":
			case "an_5":
				var chwidth = $scope.form.data.htmode;
				var htmodeOptions = $tool.deleteInArray(globalHtmodeOptions, ["80"]);
				$scope.form.data.htmode.options = htmodeOptions;
				if(chwidth == "80"){
					$scope.form.data.htmode.data = "auto";
				};
				$scope.form.data.htmode.visible = true;
			case "ac_5":
			case "nac_5":
			case "anac_5":
			default:
				$scope.form.data.htmode.options = globalHtmodeOptions;
				$scope.form.data.htmode.visible = true;
		}
	};

	$scope.form.data.htmode.changeHandler = function(newVal, oldVal){
		if(globalCapability && globalCapability.channel_5g){
			channel_5g = globalCapability.channel_5g;
			var channel_val = $scope.form.data.channel.data;

			switch(newVal){
				case "auto":
				case "20":
					var channel20 = getHtChannel(channel_5g, 20);
					$scope.form.data.channel.options = channel20;

					if($tool.valInArray(channel_val, channel20) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
				case "40":
					var channel40 = getHtChannel(channel_5g, 40);
					$scope.form.data.channel.options = channel40;

					if($tool.valInArray(channel_val, channel40) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
				case "80":
					var channel80 = getHtChannel(channel_5g, 80);
					$scope.form.data.channel.options = channel80;

					if($tool.valInArray(channel_val, channel80) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
			}
		}
	};

	

}]);


su.controllerProvider.register("5g_2", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	var wireless52gUrl = $url.format("/admin/wireless?form=wireless_5g_2");
	var wireless52gSubmitUrl = $url.format("/admin/wireless?form=wireless_5g_2&form=region");
	var sysWireless52gUrl = $url.format("/admin/wireless?form=syspara_5g_2");

	var parent = $scope.$parent.$parent;
	var globalHwmodeOptions = [];
	var globalCapability = {};
	var globalHtmodeOptions = [];

	var setChildScope = function(){
		parent.form.childScope = $scope;
		parent.form.proxy.url = wireless52gUrl;
	};

	var setOptions = function(capability){
		globalCapability = capability;
		var hwmode_5g = capability.hwmode_5g_2;
		var htmode_5g = capability.htmode_5g_2;
		var channel_5g = capability.channel_5g_2;

		var hwmode_5g_options = [];
		for (var index = 0, len=hwmode_5g.length; index < len; index++) {
			hwmode_5g_options[index] = {};
			hwmode_5g_options[index].value = hwmode_5g[index];
			hwmode_5g_options[index].name = $const.MODE["MODE_" + hwmode_5g[index].toUpperCase()];
		};
		$scope.form.data.hwmode.options = hwmode_5g_options;
		globalHwmodeOptions = hwmode_5g_options;
		
		var htmode_5g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];
		for (var index = 0, len=htmode_5g.length; index < len; index++) {
			var item = {};
			item.value = htmode_5g[index];
			item.name = htmode_5g[index] + "Mhz";
			htmode_5g_options.push(item);
		};
		$scope.form.data.htmode.options = htmode_5g_options;
		globalHtmodeOptions = htmode_5g_options;

		var channel_5g_options = [{
			value: "auto", name: "WIRELESS.AUTO"
		}];
		for (var index = 0, len=channel_5g.length; index < len; index++) {
			var item = {};
			item.value = channel_5g[index];
			item.name = channel_5g[index].toString();
			channel_5g_options.push(item);
		};
		$scope.form.data.channel.options = channel_5g_options;
		
	}

	var getHtChannel = function(chan, width){
		var newchan=[];
		newchan[0] = {"name":"WIRELESS.AUTO", "value":"auto"};
		var len = chan.length;
		
		if (!(width % 20)) 
		{
			var prev = -1;
			var count = 0;
			for (var i = 0; i <= len; i ++)
			{
				var tempObj = {};
				if(typeof(chan[i]) === "number"){
					ch = parseInt(chan[i]);
				}
				else{
					ch = chan[i];
				}
				if (prev < 0 || prev + 4 == ch) 
				{
					count += 20;
				} 
				else 
				{
					while (count % width)
					{
						newchan.pop()
						count -= 20;
					}
					if (isNaN(ch)) {
						break;
					}
					count = 20;
				}
				prev = ch-0;
				tempObj.name 	= ch.toString();
				tempObj.value 	= ch;
				newchan.push(tempObj);
			}
		}
		return newchan;
	};

	var disabledMsg = $msg.create({
		iconCls: "alert",
		content: "WIRELESS.WIRELESS_TURN_OFF_INFO"
	})

	var formLoad = function(){
		var disable5g = "";
		$scope.form.load({}, function(data, others){
			// if(data.disabled == "on"){
			// 	disabled5g = "on";
			// 	disabledMsg.show();
			// 	parent.form.disable();
			// } else {
				disabled5g = "off";
				disabledMsg.close();
				parent.form.enable();
			// };

			$proxy.request({
				url: sysWireless52gUrl
			}, {}, function(data, others){
				if(data && data.enable == "on"){
					$scope.form.data.channel.disabled = true;
				} else {
					$scope.form.data.channel.disabled = false;
				};
				// if(disabled5g == "on"){
				// 	disabledMsg.show();
				// 	$scope.form.disable();
				// } else {
				// 	disabledMsg.close();
				// 	$scope.form.enable();
				// }
			});
		});
	}

	var options = {
		proxy: {
			url: wireless52gUrl
		},
		fields: [{
			name: "enable"
		},{
			name: "ssid",
			maxLength:32,
			autoTrim:false,
			allowBlank:false,
			vtype: "string_visible_allow_blank"
		},{
			name: "hidden"
		},{
			name: "encryption",
			allowBlank:false
		},{
			name: "psk_version"
		},{
			name: "psk_cipher"
		},{
			name: "psk_key"
		},{
			name: "wpa_version"
		},{
			name: "wpa_cipher"
		},{
			name: "server",
			maxLength:15,
			allowBlank: false,
			vtype: "ip"
		},{
			name: "port",
			maxLength:5,
			allowBlank: false,
			vtype:{
				vtype:"number",
				config:{
					min:1,
					max:65535
				}
			}
		},{
			name: "wpa_key",
			maxLength:64,
			allowBlank:false,
			vtype:"password"
		},{
			name: "wep_mode"
		},{
			name: "wep_select"
		},{
			name: "wep_format1"
		},{
			name: "wep_type1"
		},{
			name: "wep_key1"
		},{
			name: "hwmode",
			allowBlank:false
		},{
			name: "htmode",
			allowBlank:false
		},{
			name: "channel",
			allowBlank:false
		},{
			name: "txpower",
			allowBlank:false
		}],
		validator: function(scope){
			var encryption = scope.form.data.encryption.data;
			var lanIP = parent.lanIP;
			if(encryption == "none"){
				return true;
			}

			if(encryption == "wpa"){
				var server = scope.form.data.server.data;
				if($tool.ipToInt(server) == $tool.ipToInt(lanIP)){
					scope.form.data.server.setError("ERROR.e000106");
					return false;
				}
			};

			if(encryption == "psk"){
				var pskKey = scope.form.data.psk_key.data;
				var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
				if(reg.test(pskKey))
				{
					return true;
				}
				else
				{
					scope.form.data.psk_key.setError("ERROR.e000107");
					return false;
				} 
			};

			if(encryption == "wep"){
				var format = scope.form.data.wep_format1.data;
				var type = scope.form.data.wep_type1.data;
				var key = scope.form.data.wep_key1.data;

				var asc_64_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}$/;
				var asc_128_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13}$/;
				var asc_152_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{16}$/;
				

				var hex_64_reg = /^[0-9a-fA-F]{10}$/;
				var hex_128_reg = /^[0-9a-fA-F]{26}$/;
				var hex_152_reg = /^[0-9a-fA-F]{32}$/;

				if(format == "asic")
				{
					if(type == 64)
					{
						if(asc_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000108");
							return false;
						}
					}
					else if(type == 128)
					{
						if(asc_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000109");
							return false;
						}
					}
					else
					{
						if(asc_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000110");
							return false;
						}
					}
				}
				else
				{
					if(type == 64)
					{
						if(hex_64_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000111");
							return false;
						}
					}
					else if(type == 128)
					{
						if(hex_128_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000112");
							return false;
						}
					}
					else
					{
						if(hex_152_reg.test(key))
						{
							return true;
						}
						else
						{
							scope.form.data.wep_key1.setError("ERROR.e000113");
							return false;
						}
					}
				}
			}

			return true;

		},
		autoLoad: false
	}

	$form.config($scope, options);

	$scope.form.data.encryption.options = [
		{value: "none", name: "WIRELESS.NO_SECURITY"},
		{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
		{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
		{value: "wep", name: "WIRELESS.WEP"}
	];

	$scope.form.data.txpower.options = [
		{value: "low", name: "WIRELESS.LOW"},
		{value: "middle", name: "WIRELESS.MIDDLE"},
		{value: "high", name: "WIRELESS.HIGH"}
	];

	$scope.form.data.psk_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA_PSK"},
		{value: "rsn", name: "WIRELESS.WPA2_PSK"}
	];

	$scope.form.data.psk_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wpa_version.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "wpa", name: "WIRELESS.WPA"},
		{value: "rsn", name: "WIRELESS.WPA2"}
	];

	$scope.form.data.wpa_cipher.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "tkip", name: "WIRELESS.TKIP"},
		{value: "aes", name: "WIRELESS.AES"}
	];

	$scope.form.data.wep_mode.options = [
		{value: "auto", name: "WIRELESS.AUTO"},
		{value: "open", name: "WIRELESS.OPEN_SYSTEM"},
		{value: "shared", name: "WIRELESS.SHARED_KEY"}
	];

	$scope.form.data.wep_format1.options = [
		{value: "asic", name: "WIRELESS.ASCII"},
		{value: "hex", name: "WIRELESS.HEXADECIMAL"}
	];

	$scope.form.data.wep_type1.options = [
		{value: "64", name: "WIRELESS.BIT64"},
		{value: "128", name: "WIRELESS.BIT128"},
		{value: "152", name: "WIRELESS.BIT152"}
	];


	setChildScope();

	if($scope.$parent.$parent.capability){
		setOptions($scope.$parent.$parent.capability);

		formLoad();
	}

	$scope.$on("regionchange", function(e, capability){
		if(!$tool.isEmptyObject(capability.channel_5g)){
			setOptions(capability);
			formLoad();
			setChildScope();
		}
	});

	//disabled_all 字段随enable的值变化
	// $scope.$watch(function(){return $scope.form.data.enable.data}, function(newVal, oldVal){
	// 	if(newVal !== oldVal){
	// 		if(newVal == "on"){
	// 			$scope.form.data.disabled_all.data = "off";
	// 		} else {
	// 			$scope.form.data.disabled_all.data = "on";
	// 		}
	// 	}
	// });

	$scope.form.data.encryption.changeHandler = function(){
		var psk_cipher = $scope.form.data.psk_cipher.data || "";
		var wpa_cipher = $scope.form.data.wpa_cipher.data || "";
		var hwmode = $scope.form.data.hwmode.data || "";

		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["n_5","ac_5","nac_5"]);
		var cipherOptionsExtra = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.hwmode.options = globalHwmodeOptions;
		$scope.form.data.psk_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		$scope.form.data.wpa_cipher.options = [
			{value: "auto", name: "WIRELESS.AUTO"},
			{value: "tkip", name: "WIRELESS.TKIP"},
			{value: "aes", name: "WIRELESS.AES"}
		];

		switch($scope.form.data.encryption.data){
			case "psk":
				if((psk_cipher == "tkip") && (hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5")){
					$scope.form.data.psk_cipher.data = "auto"
				}

				if(psk_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				}

				if(hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5"){
					$scope.form.data.psk_cipher.options = cipherOptionsExtra;
				}
				break;

			case "wpa":
				if((wpa_cipher == "tkip") && (hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5")){
					$scope.form.data.wpa_cipher.data = "auto"
				}

				if(wpa_cipher == "tkip"){
					$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				}

				if(hwmode == "n_5" || hwmode == "ac_5" || hwmode == "nac_5"){
					$scope.form.data.wpa_cipher.options = cipherOptionsExtra;
				}
				break;

			case "wep":
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
				break;
		}
	};

	$scope.form.data.psk_cipher.changeHandler = function(){
		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["n_5","ac_5","nac_5"]);
		$scope.form.data.hwmode.options = globalHwmodeOptions;

		if($scope.form.data.encryption.data === "psk"){
			if($scope.form.data.psk_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
			}
		}
	};

	$scope.form.data.wpa_cipher.changeHandler = function(){
		var hwmodeOptionsExtra = $tool.deleteInArray(globalHwmodeOptions, ["ac_5","n_5","nac_5"]);
		$scope.form.data.hwmode.options = globalHwmodeOptions;

		if ($scope.form.data.encryption.data === "wpa"){
			if($scope.form.data.wpa_cipher.data == "tkip"){
				$scope.form.data.hwmode.options = hwmodeOptionsExtra;
			}
		}
	};

	$scope.form.data.hwmode.changeHandler = function(){
		
		var hwmode = $scope.form.data.hwmode.data;
		if( hwmode == "ac_5" || hwmode == "n_5" || hwmode == "nac_5"){
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		} else {
			$scope.form.data.encryption.options = [
				{value: "none", name: "WIRELESS.NO_SECURITY"},
				{value: "psk", name: "WIRELESS.WPA_WPA2_PERSONAL"},
				{value: "wpa", name: "WIRELESS.WPA_WPA2_ENTERPRISE"},
				{value: "wep", name: "WIRELESS.WEP"}
			];

			$scope.form.data.psk_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];

			$scope.form.data.wpa_cipher.options = [
				{value: "auto", name: "WIRELESS.AUTO"},
				{value: "tkip", name: "WIRELESS.TKIP"},
				{value: "aes", name: "WIRELESS.AES"}
			];
		};

		switch(hwmode){
			case "a_5":
				var htmodeOptions = $tool.deleteInArray(globalHtmodeOptions, ["40", "80"]);
				$scope.form.data.htmode.options = htmodeOptions;
				$scope.form.data.htmode.data = "auto";
				$scope.form.data.htmode.visible = false;
				break;
			case "n_5":
			case "an_5":
				var chwidth = $scope.form.data.htmode;
				var htmodeOptions = $tool.deleteInArray(globalHtmodeOptions, ["80"]);
				$scope.form.data.htmode.options = htmodeOptions;
				if(chwidth == "80"){
					$scope.form.data.htmode.data = "auto";
				};
				$scope.form.data.htmode.visible = true;
			case "ac_5":
			case "nac_5":
			case "anac_5":
			default:
				$scope.form.data.htmode.options = globalHtmodeOptions;
				$scope.form.data.htmode.visible = true;
		}
	};

	$scope.form.data.htmode.changeHandler = function(newVal, oldVal){
		if(globalCapability && globalCapability.channel_5g_2){
			channel_5g = globalCapability.channel_5g_2;
			var channel_val = $scope.form.data.channel.data;

			switch(newVal){
				case "auto":
				case "20":
					var channel20 = getHtChannel(channel_5g, 20);
					$scope.form.data.channel.options = channel20;

					if($tool.valInArray(channel_val, channel20) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
				case "40":
					var channel40 = getHtChannel(channel_5g, 40);
					$scope.form.data.channel.options = channel40;

					if($tool.valInArray(channel_val, channel40) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
				case "80":
					var channel80 = getHtChannel(channel_5g, 80);
					$scope.form.data.channel.options = channel80;

					if($tool.valInArray(channel_val, channel80) !== -1){
						$scope.form.data.channel.data = channel_val;
					} else {
						$scope.form.data.channel.data = "auto";
					}
					break;
			}
		}
	};

	

}]);

su.controllerProvider.register("wirelessSchedule", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){



}]);

su.controllerProvider.register("wps", ["$scope","$interval", "$form","$msg","$proxy", "$const","$url","$tool", function($scope, $interval, $form, $msg, $proxy, $const, $url, $tool){

	var wpsConnectUrl = $url.format("/admin/wireless?form=wps_connect");
	var wpsPinUrl = $url.format("/admin/wireless?form=wps_pin");
	var wireless2gUrl = $url.format("/admin/wireless?form=wireless_2g");
	var wireless5gUrl = $url.format("/admin/wireless?form=wireless_5g")

	var pushInterval=false;
    var pinInterval=false;

	var time = "";
	var wizardOn = 1;
	var disabled;

	var pushCount = 0;
	var pinCount = 0;

	var wireless2gDisabled = "off";
	var wireless2gDisabledAll = "off";

	var wireless5gDisabled = "off";
	var wireless5gDisabledAll = "off";

	var options = {
		proxy:{
			url: wpsConnectUrl
		},
		fields:[{
			name: "wps_pin",
			maxLength:8,
			minLength:8,
			allowBlank:false,
			vtype:{
				vtype:'number',
				config: {
					max:99999999
				}
				
			}
		},{
			name: "client_pin",
			readOnly: true,
			isDetect: false
		}],
		validator: function(scope){
			var wpsPin = scope.form.data.wps_pin.data;

			if(wpsPin.toString().length != 8){
				scope.form.data.wps_pin.setError("ERROR.e000114");
				return false;
			}
			return true;
		},
		prompt:{
			show: false
		},
		autoLoad: false
	};

	$form.config($scope, options);

	$scope.setupmethod = {};
	$scope.setupmethod.options = [
		{value: "0", name: "WIRELESS.PUSH_BTN"},
		{value: "1", name: "WIRELESS.PIN_CODE"}
	];
	$scope.setupmethod.valid = true;
	$scope.setupmethod.data = 0;

	$scope.pushConnectBtn = {};
	$scope.pinConnectBtn = {};
	$scope.generateBtn = {};
	$scope.defaultBtn = {};

	$scope.pushCancelBtn = {
		visible: false
	};

	$scope.wpsSwitch = {};
	$scope.wpsSwitch.options = {
		"onValue": "on",
		"offValue": "off"
	}


	$scope.form.submitBtn = {};

	$scope.back = function(){
		$scope.form.data.wps_pin.data = "";
		$scope.form.back(function(){
			$scope.$parent.$parent.form.menuItem = "";
		});
		//$scope.$parent.$parent.form.menuItem = "";
	};

	$scope.setupmethod.changeHandler = function(newVal, oldVal){
		if(oldVal != "" && newVal == 1){
			$proxy.request({
				url: wpsConnectUrl,
				showLoading: false
			},{
				option: "cancel"
			});
			$interval.cancel(pinInterval);
			pinInterval = false;
		} else if(oldVal != ""){
			$proxy.request({
				url: wpsConnectUrl,
				showLoading: false
			},{
				option: "cancel"
			});
			$interval.cancel(pushInterval);
			pushInterval = false;

			if($scope.pushCancelBtn.visible){
				$scope.pushCancelBtn.visible = false;
				$scope.pushConnectBtn.visible = true;
			}
		}
	};

	/*var pushStatus = $msg.create({
		type: "failure",
		text: "ERROR.e000211"
	});

	var pinStatus = $msg.create({
		type: "failure",
		text: "ERROR.e000211"
	});
	*/
	var pinProgerssMsg = $msg.create({
		id: "pin-progress-msg",
		title: "WIRELESS.CONNECTING",
		okBtn: {
			show: true,
			text: "FORM.CANCEL",
			handler: function(){
				$proxy.request({
					url: wpsConnectUrl,
					showLoading: false
				},{
					option: "cancel"
				});

				$interval.cancel(pinInterval);
				pinInterval = false;

				$scope.pinProgressBar.close();
			}
		},
		cancelBtn: {
			show: false
		}
		
	});

	$scope.pinProgressBar = {
		value: 100,
		speed: 10000,
		width: 13.12,
		max: 100,
		visible: true,
		handler: function(){
			pinProgerssMsg.close();
		}
	};
	$scope.push_status = {
		text: "",
		status: ""
	};

	$scope.pushConnect = function(){
		$scope.pushConnectBtn.disabled = true;
		$scope.pushConnectBtn.visible = false;
		$scope.pushCancelBtn.visible = true;
		$scope.push_status.text = "";
		$scope.push_status.status = "";
		
		$proxy.request({
			url: wpsConnectUrl,
			showLoading: false
		},{
			option: "connect"
		}, function(data, others){
			$scope.pushConnectBtn.disabled = false;
			if(data.wps_status != "ok")
			{
				$scope.pushCancelBtn.visible = false;
				$scope.pushConnectBtn.visible = true;

				if(data.wps_status == "error")
				{
					$scope.push_status.text = "ERROR.e000211";
					//pushStatus.show("failure", "ERROR.e000211");
				}
				if(data.wps_status == "failed")
				{
					$scope.push_status.text = "ERROR.e000219";
					//pushStatus.show("failure", "ERROR.e000219");
				}
				if(data.wps_status == "overlap")
				{
					$scope.push_status.text = "ERROR.e000212";
					//pushStatus.show("failure", "ERROR.e000212");
				}
				if(data.wps_status == "timeout")
				{
					$scope.push_status.text = "ERROR.e000213";
					//pushStatus.show("failure", "ERROR.e000213");
				}
				if(data.wps_status == "na")
				{
					$scope.push_status.text = "ERROR.e000214";
					//pushStatus.show("failure", "ERROR.e000214");
				}
				$scope.push_status.status = "failed";

			}
			else{
				$scope.pushConnectBtn.visible = false;
				$scope.pushCancelBtn.visible = true;

				var query_time = time;
				if(!pushInterval){
					pushCount = 0;
					pushInterval = $interval(pushResult, 1000, 0, false);
				} else {
					$interval.cancel(pushInterval);
					pushInterval = false;
					pushCount = 0;
					pushInterval = $interval(pushResult, 1000, 0, false);
				}
			}
		})
	};

	$scope.pushCancel = function(){
		$proxy.request({
			url: wpsConnectUrl,
			showLoading: false
		},{
			option: "cancel"
		});

		$scope.pushCancelBtn.visible = false;
		$scope.pushConnectBtn.visible = true;
		$interval.cancel(pushInterval);
		pushInterval = false;
	};
	
	$scope.pin_status = {
		text: "",
		status: "",
	};
	
	$scope.pinConnect = function(){

		$scope.form.serialize(["client_pin"]);
		if(!$scope.form.validate()){
			return;
		}

		$scope.pinConnectBtn.disabled = true;
		$proxy.request({
			url: wpsConnectUrl,
			showLoading: false
		},{
			option: "connect",
			wps_pin: $scope.form.data.wps_pin.data
		},function(data, others){
			$scope.pinConnectBtn.disabled = false;
			if(data.wps_status == "error"){
				$scope.pin_status.text = "ERROR.e000211";
				$scope.pin_status.status = "failed";
				//pinStatus.show("failure", "ERROR.e000211");
			} else {
				
				pinProgerssMsg.show();
				time ? $scope.pinProgressBar.speed = time : "";
				$scope.pinProgressBar.start();

				if(!pinInterval){
					pinCount = 0;
					pinInterval = $interval(pinResult, 1000, false);
				} else {
					pinCount = 0;
					$interval.cancel(pinInterval);
					pinInterval = false;
				}
			}
		},function(errorcode, others, data){
			if(data.wps_status == "error"){
				$scope.pin_status.text = "ERROR.e000211";
				$scope.pin_status.status = "failed";
				//pinStatus.show("failure", "ERROR.e000211");
			} else {
				$scope.pin_status.text = "FORM.FAILED";
				$scope.pin_status.status = "failed";
				//pinStatus.show("failure", "FORM.FAILED");
			}
			$scope.pinConnectBtn.disabled = false;
		},function(){
			$scope.pin_status.text = "FORM.FAILED";
			$scope.pin_status.status = "failed";
			//pinStatus.show("failure", "FORM.FAILED");
			$scope.pinConnectBtn.disabled = false;
		})
	};


	$scope.generate = function(){
		$scope.generateBtn.disabled = true;
		$proxy.request({
			url: wpsPinUrl
		},{
			operation: "write",
			option: "generate"
		}, function(data, others){
			$scope.generateBtn.disabled = false;
			$scope.form.data.client_pin.data = data.wps_pin;
		}, function(){
			$scope.generateBtn.disabled = false;
		}, function(){
			$scope.generateBtn.disabled = false;
		})
	};

	$scope['default'] = function(){
		$scope.defaultBtn.disabled = true;
		$proxy.request({
			url: wpsPinUrl
		},{
			operation: "write",
			option: "default"

		}, function(data, others){
			$scope.defaultBtn.disabled = false;
			$scope.form.data.client_pin.data = data.wps_pin;
		}, function(){
			$scope.generateBtn.disabled = false;
		}, function(){
			$scope.defaultBtn.disabled = false;
		})
	};

	$scope.wpsSwitch.proxy = {
		options:{
			url: wpsPinUrl
		},
		field: "wps_label",
		data: {
			operation: "write"
		},
		success:function(data, others){
			$scope.wpsSwitch.data = data.wps_label;
		}
	}

	var pushResult = function(){
		$proxy.request({
			url: wpsConnectUrl,
			showLoading: false
		}, {
			option: "pbc"
		}, function(data, others){
			pushCount++;
			if(data && data.wps_status == "success"){
				
				$scope.push_status.text = "FORM.SUCCESS";
				$scope.push_status.status = "success";
				//pushStatus.show("success", "FORM.SUCCESS");
				$interval.cancel(pushInterval);
				pushInterval = false;
				$scope.pushConnectBtn.visible = true;
				$scope.pushCancelBtn.visible = false;

				pushCount = 0;
			} else if (data.wps_status != "ok"){
				if(data.wps_status == "error")
				{
					$scope.push_status.text = "ERROR.e000211";
					//pushStatus.show("failure", "ERROR.e000211");
				}
				if(data.wps_status == "failed")
				{
					$scope.push_status.text = "ERROR.e000219";
					//pushStatus.show("failure", "ERROR.e000219");
				}
				if(data.wps_status == "overlap")
				{
					$scope.push_status.text = "ERROR.e000212";
					//pushStatus.show("failure", "ERROR.e000212");
				}
				if(data.wps_status == "timeout")
				{
					$scope.push_status.text = "ERROR.e000213";
					//pushStatus.show("failure", "ERROR.e000213");
				}
				if(data.wps_status == "na")
				{
					$scope.push_status.text = "ERROR.e000214";
					//pushStatus.show("failure", "ERROR.e000214");
				}
				$scope.push_status.status = "failed";

				$interval.cancel(pushInterval);
				pushInterval = false;

				$scope.pushConnectBtn.visible = true;
				$scope.pushCancelBtn.visible = false;

				pushCount = 0;

			}

			if(pushCount >= time/1000){
				if(pushInterval){
					$interval.cancel(pushInterval);
					pushInterval = false;

					$scope.pushConnectBtn.visible = true;
					$scope.pushCancelBtn.visible = false;

					$scope.push_status.text = "ERROR.e000215";
					$scope.push_status.status = "failed";
					//pushStatus.show("failure", "ERROR.e000215");
					pushCount = 0;
				}
			}
		})
	};
	
	var pinResult = function(){
		$proxy.request({
			url: wpsConnectUrl,
			showLoading: false
		},{
			option: "pin"
		}, function(data, others){
			pinCount++;

			if(data && data.wps_status == "success"){
				
				$scope.pinProgressBar.close("success");
				
				$scope.pin_status.text = "FORM.SUCCESS";
				$scope.pin_status.status = "success";

				//pinStatus.show("success", "FORM.SUCCESS");

				$interval.cancel(pinInterval);
				pinInterval = false;
				pinCount = 0;
			} else if (data.wps_status !== "ok"){
				if(data.wps_status == "error"){
					$scope.pin_status.text = "ERROR.e000211";
					//pinStatus.show("failure", "ERROR.e000211");
				};

				if(data.wps_status == "failed"){
					$scope.pin_status.text = "ERROR.e000219";
					//pinStatus.show("failure", "ERROR.e000211");
				};

				if(data.wps_status == "overlap")
				{
					$scope.pin_status.text = "ERROR.e000212";
					//pinStatus.show("failure", "ERROR.e000212");
				}
				if(data.wps_status == "timeout")
				{
					$scope.pin_status.text = "ERROR.e000213";
					//pinStatus.show("failure", "ERROR.e000213");
				}
				if(data.wps_status == "na")
				{
					$scope.pin_status.text = "ERROR.e000214";
					//pinStatus.show("failure", "ERROR.e000214");
				}
				$scope.pin_status.status = "failed";

				$interval.cancel(pinInterval);
				pinInterval = false;

				$scope.pinConnectBtn.disabled = false;
				pinProgerssMsg.close();
				pinCount = 0;
			}

			if(pinCount >= time/1000){
				if(pinInterval){
					$interval.cancel(pinInterval);
					pinInterval = false;

					$scope.pinConnectBtn.disabled = false;
					pinProgerssMsg.close();
					pinCount = 0;
					
					$scope.pin_status.text = "ERROR.e000215";
					$scope.pin_status.status = "failed";
					//pinStatus.show("failure", "ERROR.e000215");

				}
			}
		})
	};


	var wpsMsg = $msg.create({
		iconCls: "alert",
		content:"WIRELESS.WIRELESS_TURN_ON_INFO"
	});

	$proxy.request({
		url: wpsPinUrl
	},{}, function(data, others){
		if(data){
			$scope.wpsSwitch.data = data.wps_label;
			$scope.form.data.client_pin.data = data.wps_pin;
		}
	})

	$proxy.request({
		url: wpsConnectUrl
	},{}, function(data, others){
		if(data){
			time = data.wps_timeout;
			wizardOn = data.available;
			disabled = data.disabled;
			if(wizardOn){
				// if(disabled == "on"){
				// 	wpsMsg.show();
				// }
				$scope.wizardOn = false;
			} else {
				// if(disabled == "on"){
				// 	wpsMsg.show();
				// } else {
				//	wpsMsg.title = "WIRELESS.WIRELESS_PARAMETERS_INFO";
					wpsMsg.show();
				// }
				$scope.setupmethod.data = 1;
				$scope.wizardOn = true;
			}
		}
	});

	$proxy.request({
		url: wireless2gUrl
	}, {}, function(data, others){
		if(data){
			wireless2gDisabled = data.disabled;
			wireless2gDisabledAll = data.disabled_all;
		};

		$proxy.request({
			url: wireless5gUrl
		},{}, function(data, others){
			if(data){
				wireless5gDisabled = data.disabled;
				wireless5gDisabledAll = data.disabled_all;
			};

			// if(wireless2gDisabled == "on" && wireless5gDisabled == "on"){
			// 	$scope.setupmethod.disabled = true;
			// 	$scope.pushConnectBtn.disabled = true;
			// 	$scope.pushCancelBtn.disabled = true;
			// 	$scope.pinConnectBtn.disabled = true;
			// 	$scope.generateBtn.disabled = true;
			// 	$scope.defaultBtn.disabled = true;
			// 	$scope.form.data.client_pin.disabled = true;
			// 	$scope.form.data.wps_pin.disabled = true;

			// 	wpsMsg.title = "WIRELESS.WIRELESS_TURN_OFF_INFO";
			// 	wpsMsg.show();
			// } else {
				$scope.setupmethod.disabled = false;
				$scope.pushConnectBtn.disabled = false;
				$scope.pushCancelBtn.disabled = false;
				$scope.pinConnectBtn.disabled = false;
				$scope.generateBtn.disabled = false;
				$scope.defaultBtn.disabled = false;
				$scope.form.data.client_pin.disabled = false;
				$scope.form.data.wps_pin.disabled = false;

				if(wireless2gDisabledAll == "on" && wireless5gDisabledAll == "on"){
					$scope.wpsSwitch.disabled = true;
				}
			// }
		})
	})

	$scope.$on("$destroy", function(){
		if(pushInterval){
			$interval.cancel(pushInterval);
			pushInterval = false;
		};
		if(pinInterval){
			$interval.cancel(pinInterval);
			pinInterval = false;
		}
	});

}]);
