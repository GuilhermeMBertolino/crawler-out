// JavaScript Document
su.controllerProvider.register("qos", ["$scope","$grid","$url", "$proxy",function($scope, $grid, $url, $proxy){
	var qosSettingsUrl = $url.format("/admin/qos?form=settings");

	$scope.pageLoading.close();

}]);

su.controllerProvider.register("qosSettings", ["$scope","$form","$url","$proxy","$msg", function($scope, $form, $url, $proxy, $msg){
	var qosSettingsUrl = $url.format("/admin/qos?form=settings");
	var iptvUrl = $url.format("/admin/iptv?form=setting");
	var sysNatUrl = $url.format("/admin/nat?form=setting");

	var waitTime = 1000;
	var boost_enable;
	var boost_enable;

	var options = {
		proxy: {
			url: qosSettingsUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "up_band",
			allowBlank:false,
			maxLength:4,
			vtype:{
				vtype:'number',
				config:{
					min:0,
					max:1000
				}
			}
		},{
			name: "up_unit"
		},{
			name: "down_band",
			allowBlank:false,
			maxLength:4,
			vtype:{
				vtype:'number',
				config:{
					min:0,
					max:1000
				}
			}
		},{
			name: "down_unit"
		},{
			name: "high"
		},{
			name: "middle"
		},{
			name: "low"
		}],
		autoLoad: false
	};

	$form.config($scope, options);
	$form.load($scope, {}, function(data, others){
		waitTime = data.time * 1000 || waitTime;
	});
	$scope.form.submitBtn = {};
	$scope.form.dirtyShowSave($scope.form.submitBtn);

	$scope.form.data.up_unit.options = [
		{value: "kbps", name:"QOS.SPEED_K"},
		{value: "mbps", name: "QOS.SPEED_M"}
	];

	$scope.form.data.down_unit.options = [
		{value: "kbps", name:"QOS.SPEED_K"},
		{value: "mbps", name: "QOS.SPEED_M"}
	];

	$scope.back = function(){
		$scope.form.back(function(){
			$scope.$parent.form.menuItem = "";
		});
		//$scope.$parent.form.menuItem = "";
	};

	$scope.save = function(){
		if($scope.form.validate()){
			$scope.qosProgressBar.start();
			qosProgerssMsg.show();
		}
		
		$scope.form.submit({}, function(){
			$scope.qosProgressBar.close("success");
		}, function(){
			$scope.qosProgressBar.close("success");
		}, function(){
			$scope.qosProgressBar.close("success");
		},  true, true, false);
	};

	var qosProgerssMsg = $msg.create({
		id: "qos-progress-msg",
		title: "QOS.SERVICE_RESTART",
		okBtn: {
			show: false
		},
		cancelBtn: {
			show: false
		}
	});

	$scope.qosProgressBar = {
		value: 100,
		speed: 1000,
		max: 100,
		width: 13.12,
		visible: true,
		handler: function(){
			qosProgerssMsg.close();			
		}
	};

	var changeRange = function(index, newVal, oldVal){
		var high = $scope.form.data.high.data;
		var middle = $scope.form.data.middle.data;
		var low = $scope.form.data.low.data;

		if(high - 5 < middle){
			$scope.form.data.middle.data = high - 5;
			middle = $scope.form.data.middle.data;
		}

		if(middle - 5 < low){
			$scope.form.data.low.data = middle - 5;
			low = $scope.form.data.low.data;
		}

		var max = 100;
		if(index == "high"){
			max = 100 - high - middle;
			max = max < (middle -5) ? max : (middle-5);
			$scope.form.data.low.range = [5, max];

			max = 100 - high - low;
			max = max < (high -5) ? max : (high-5);
			$scope.form.data.middle.range = [10, max];
		}

		if(index == "middle"){
			max = 100 - high - middle;
			max = max < (middle -5) ? max : (middle-5);
			$scope.form.data.low.range = [5, max];

			max = 100 - middle - low;
			$scope.form.data.high.range = [15, max];
		}

		if(index == "low"){
			max = 100 - low - middle;
			$scope.form.data.high.range = [15, max];
			max = 100 - high - low;
			max = max < (high -5) ? max : (high-5);
			$scope.form.data.middle.range = [10, max];
		}
	};

	$scope.$watch(function(){return $scope.form.data.high.data}, function(newVal, oldVal){
		changeRange("high", newVal, oldVal);
	});

	$scope.$watch(function(){return $scope.form.data.middle.data}, function(newVal, oldVal){
		changeRange("middle", newVal, oldVal);
	});

	$scope.$watch(function(){return $scope.form.data.low.data}, function(newVal, oldVal){
		changeRange("low", newVal, oldVal);
	});


	$scope.natRebootProgressBar = {
		visible: false,
		width: 13.12,
		max: 100,
		value: 100,
		speed: 60000,
		handler: function() {}
	};

	var natCloseConfirmMsg = $msg.create({
		content: "QOS.QOS_NAT_CONFLICT",
		id: "nat-reboot-confirm-msg",
		//timeout: "2000"
		//iconCls: "alert",
		autoClose: false,

		okBtn:{
			text: "FORM.CONTINUE",
			show: true,
			handler: function(){

				natCloseConfirmMsg.okBtn.show = false;
				natCloseConfirmMsg.cancelBtn.show = false;
				natCloseConfirmMsg.content= "";
				natCloseConfirmMsg.title="QOS.REBOOTING";
				natCloseConfirmMsg.iconCls = "";

				$scope.natRebootProgressBar.start();
				$proxy.request({
					url: sysNatUrl,
				},{
					operation: "write",
					enable: nat_enable,
					boost_enable: "off"
				}, function(data, others){
					boost_enable = false;
				});
				
				$scope.natRebootProgressBar.handler = function() {
					if (localStorage) {
						localStorage.setItem("token", "");
					};
					location.href = "/";
				}
				
				return false;
			}
		},

		cancelBtn: {
			text: "FORM.CANCEL",
			show: true,
			handler: function(){
				natCloseConfirmMsg.close();
				//$scope.form.data.enable.data = "off";
			}
		}
	});

	$scope.form.data.enable.changeHandler = function(newVal, oldVal){
		if(newVal == "on" && boost_enable){
			$scope.form.data.enable.data = "off";
			natCloseConfirmMsg.show();
		}
	};

/*
	$proxy.request({
		url: iptvUrl
	},{}, function(data, others){
		if(data.qos_iptv_compatible == "no"){
			if(data.enable == "on"){
				$scope.form.disable();
				qosDisableMsg.show();
			}
		}
	});
*/
	$proxy.request({
		url: sysNatUrl
	},{}, function(data, others){
		nat_enable = data.enable;
		if(data.hw_enable == "on"){
			//$scope.form.disable();
			//$scope.form.data.enable.disabled = true;
			//qosDisableMsg.title = "ERROR.e000125";
			//qosDisableMsg.show();
			boost_enable = true;
		}
		else{
			boost_enable = false;
		}
	});
 

}]);

// 将priority公用方法提出来
su.provide.factory("$qosCommon", ["$grid","$url", "$proxy", "$tool","$const","$msg", function($grid, $url, $proxy, $tool, $const, $msg){
	
	return {
		initQos: function($scope, level){

			var qosSettingsUrl = $url.format("/admin/qos?form=settings");
			var qosListUrl = $url.format("/admin/qos?form=list");
			var qosApplistUrl = $url.format("/admin/qos?form=applist");
			var qosAddUrl = $url.format("/admin/qos?form=add");

			var maxRules = 32;

			var appListObj = {};
			var phyListObj = {
				wireless: "QOS.WIFI_HOST", 
				guest: "QOS.WIFI_GUEST", 
				port1: "QOS.PORT1",
				port2: "QOS.PORT2",
				port3: "QOS.PORT3",
				port4: "QOS.PORT4"
			};


			var deviceColumns = [{
				type: "icon",
				cls: "qos-row-icon"
			},{
				type: "title",
				name: "name",
				cls: "qos-row-content"
			},{
				type: "text",
				name: "mac",
				label: "QOS.MAC_ADDRESS",
				cls: "qos-row-content"
			},{
				type: "text",
				name: "ip",
				label: "QOS.IP_ADDRESS",
				cls: "qos-row-content"
			}];

			var appColumns = [{
				type:"title",
				name: "name",
				cls: "qos-grid-text-cls"
			}];

			var appCustomColumns = [{
				type: "title",
				name: "name",
				cls: "qos-app-custom-title"
			},{
				type: "text",
				name: "proto",
				label: "QOS.PROTO_P",
				cls: "qos-app-custom-content"
			},{
				type: "text",
				name: "port",
				label: "QOS.PORT_P",
				cls: "qos-app-custom-content"
			}];

			var phyColumns = [{
				type: "title",
				name: "name",
				cls: "qos-grid-text-cls"
			}];

			$scope.$watch(function(){return $scope.grid.data.length}, function(newVal, oldVal){
				var deviceData = [];
				var appData = [];
				var phyData = [];
				var data = $scope.grid.data;
				$scope.grid.transIndex = {};

				
				if(newVal !== oldVal){
					for (var index = 0; index < newVal; index++) {
						data[index].id = $tool.randomId();
						$scope.grid.transIndex[data[index].id] = index;

						if(data[index].priority.data === level){
							if(data[index].type.data === "device"){
								data[index].columns = deviceColumns;
								deviceData.push(data[index]);
							} else if (data[index].type.data === "app"){
								
								if(data[index].custom.data){
									data[index].columns = appCustomColumns;
								} else {
									data[index].columns = appColumns;
									data[index].name.data = $const.APP[appListObj[data[index].app.data]] || appListObj[data[index].app.data];
								}
								appData.push(data[index]);
							} else if (data[index].type.data === "port"){
								data[index].columns = phyColumns;
								data[index].name.data = phyListObj[data[index].phy.data]
								phyData.push(data[index]);
							}
						}
					};
					$scope.grid.deviceData = deviceData;
					$scope.grid.appData = appData;
					$scope.grid.phyData = phyData;
					$scope.grid.actuallLength = $scope.grid.deviceData.length+$scope.grid.appData.length+$scope.grid.phyData.length;
				}
			});
			
			function is_portcharacter(port_string,ch)
			{
				var c;
				for (var i = 0; i < port_string.length; i++)
				{
					c = port_string.charAt(i);
					if (ch.indexOf(c) == -1)
						return false;
				}
				return true;
			}

			function portverify(port_string)
			{

				if(!is_portcharacter(port_string,"0123456789"))
				{
					return false;
				}
				if (parseInt(port_string,10) <= 0 || parseInt(port_string,10) > 65535)
				{
					return false;
				}
				return true;
			}


			function is_port(port_string)
			{
				if (!portverify(port_string))
				{
					return false;
				}
				return true;
			}

			function port_confilict(subport1, subport2){
				var start1,end1;
				var start2,end2;

				subport1 = subport1.split('-');
				subport2 = subport2.split('-');

				if(subport1.length == 1 && subport1 != ""){
					start1 = parseInt(subport1[0], 10);
				}
				else if(subport1.length == 2 && subport1[0] != "" && subport1[1] != ""){
					if(subport1[0] >= subport1[1])
						return "port_err";
					start1 = parseInt(subport1[0], 10);
					end1 = parseInt(subport1[1], 10);
				}
				else
					return "port_err";
				if(subport2.length == 1 && subport2 != ""){
					start2 = parseInt(subport2[0], 10);
				}
				else if(subport2.length == 2 && subport2[0] != "" && subport2[1] != ""){
					if(subport2[0] >= subport2[1])
						return "port_err";
					start2 = parseInt(subport2[0], 10);
					end2 = parseInt(subport2[1], 10);
				}
				else
					return "port_err";

				if(end1){
					if(end2){
						return (start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)
					}
					else{
						return start2 >= start1 && start2 <= end1;
					}
				}
				else{
					if(end2){
						return start1 >= start2 && start1 <=end2;
					}
					else
						return start1 == start2;
				}
			}

			var subIsPort = function(port_string){
				
				if (!is_portcharacter(port_string,ch=",-0123456789"))
				{
					return false;
				}
				var sub_port_array;
				var single_port_array;
				var re;
				var sub_re;

				re = new RegExp(",");
				sub_re = new RegExp("-");
				sub_port_array = port_string.split(re);

				if (sub_port_array.length > 5 || sub_port_array.length < 1 )
				{
					return false;
				}

				for (var i = 0; i < sub_port_array.length; i++)
				{
					if (sub_port_array[i] == "" )
					{
						return false;
					}

					single_port_array = sub_port_array[i].split(sub_re);

					for (var k = i+1; k < sub_port_array.length; k++) {
						if(port_confilict(sub_port_array[i],sub_port_array[k]) != false){
							return false;
						}
						/*
						if (sub_port_array[i] == sub_port_array[k]){
							return false;
						}
						*/
					}

					//single_port_array = sub_port_array[i].split(sub_re);

					if (single_port_array.length != 1 && single_port_array.length != 2)
					{

						return false;
					}
					if(single_port_array.length == 2 && (Number(single_port_array[0])>=single_port_array[1]))
						return false;


					for (var j = 0;j < single_port_array.length; ++j )
					{
						if (single_port_array[j] == "" )
						{

							return false;
						}

						if (!is_port(single_port_array[j]))
						{
							return false;
						}
					}			
				}
				return true;
			}

			var options = {
				proxy: {
					url: qosListUrl
				},
				fields:[{
					name: "priority"
				},{
					name: "method",
					allowBlank:false
				},{
					name: "type"
				},{
					name: "device_name",
					allowBlank:false,
					maxLength:32
				},{
					name: "custom"
				},{
					name: "custom_name",
					allowBlank: false
				},{
					name: "name"
				},{
					name: "mac",
					allowBlank:false,
					vtype:"mac",
					format: "upperCase"
				},{
					name: "ip"
				},{
					name: "rule_app"
				},{
					name: "app"
				},{
					name: "proto",
					allowBlank:false,
					format: "upperCaseFirst"
				},{
					name: "port",
					allowBlank: false
				},{
					name: "phy"
				}],
				editor:{
					proxy:{
						url: qosAddUrl
					},
					validator: function(scope){
						var method = $scope.form.data.method.data;
						var gridData = $scope.grid.data;

						if(method == "device"){
							var deviceName = $scope.form.data.device_name.data;
							var mac = $scope.form.data.mac.data;

							for (var index = 0, len = gridData.length; index < len; index++) {
								if(gridData[index].type.data === "device" && mac.toUpperCase() == gridData[index].mac.data.toUpperCase()){
									//scope.form.setError();
									scope.form.data.mac.setError("ERROR.e000123");
									return false;
								}
							};
						}

						if(method == "app"){
							var app = $scope.form.data.rule_app.data.split(",");
							var customName = $scope.form.data.custom_name.data;
							var proto = $scope.form.data.proto.data;
							var port = $scope.form.data.port.data;

							if(scope.form.expanderShow){
								if(!subIsPort(port)){
									scope.form.data.port.setError("ERROR.e000001");
									return false;
								}
							}

							for (var index = 0, len = gridData.length; index < len; index++) {
								if(gridData[index].type.data !== "app") continue;
								if(!gridData[index].custom.data){
									for (var i = 0; i < app.length; i++) {
										if(app[i] == gridData[index].app.data){
											scope.form.setError("ERROR.e000123");
											//scope.form.data.rule_app.setError("e000123");
											return false;
										}
									};
								}
								if(gridData[index].custom.data && scope.form.expanderShow){
										
									if(customName.toUpperCase() == gridData[index].name.data.toUpperCase()){
										//scope.form.setError("e000123");
										scope.form.data.custom_name.setError("ERROR.e000123");
										return false;
									}

									if(((proto.toUpperCase() == "ALL") 
										|| (gridData[index].proto.data.toUpperCase() == "ALL") 
										|| (proto.toUpperCase() == gridData[index].proto.data.toUpperCase())) 
										&& (!subIsPort(port+","+gridData[index].port.data))
									){
										//scope.form.setError();
										scope.form.data.port.setError("ERROR.e000123");
										return false;
									}
								}
							};
						}

						if(method == "phy"){
							var phy = $scope.form.data.phy.data;
							for (var index = 0, len = gridData.length; index < len; index++) {
								if(gridData[index].type.data === "port" && phy.toUpperCase() == gridData[index].phy.data.toUpperCase()){
									scope.form.setError("ERROR.e000123");
									//scope.form.data.phy.setError("e000123");
									return false;
								}
							};
						}

						return true;
					}
				},
				autoLoad: false
			};

			$grid.config($scope, options);
			$scope.grid.deviceData = [];
			$scope.grid.appData = [];
			$scope.grid.phyData = [];

			$scope.grid.insert = function(data, success, failure, error){
				
				var data = angular.extend({
					operation:"add",
					priority: level

				}, data);

				var success = success || function(){};
				var failure = failure || function(){};
				var error = error || function(){};
				$scope.isGrid = false;
				if($scope.form.data.method.data == "device"){
					$scope.form.serialize(["priority","name", "custom","custom_name","type","rule_app","app", "proto", "port", "phy", "ip"]);
				} else if ($scope.form.data.method.data == "app"){
					if(!$scope.form.expanderShow){
						$scope.form.serialize(["priority","name", "custom","device_name","type","app", "phy", "mac","custom_name", "proto", "port", "ip"]);
					} else {
						$scope.form.serialize(["priority","name", "custom","device_name","type","app", "phy", "mac", "ip"]);
					}
				} else if ($scope.form.data.method.data == "phy"){
					$scope.form.serialize(["priority","name", "custom","custom_name","device_name","type","rule_app","app","proto", "port", "mac", "ip"]);
				}
				
				$scope.form.submit(data, function(data, others){
					$scope.isGrid = true;
					var copyData = angular.copy(data);
					
					$scope.grid.loadData(copyData, "load");
					success(data, others);
					$scope.form.clear();
				}, function(errorcode, others, data){
					failure(errorcode, others, data);
				}, function(status){
					error(status);
				},true, false);
			}

			$scope.grid.remove = function(scope, data, success, failure, error){

				if(scope.isGrid && scope.form.proxy.url !== null){
					var data = angular.extend({
						operation:"remove"
					}, data);

					var success = success || function(){};
					var failure = failure || function(){};
					var error = error || function(){};

					var successPrompt = $msg.create({
						type: "success",
						text: "FORM.SUCCESS"
					});

					var failurePrompt = $msg.create({
						type: "failure",
						text: "FORM.FAILED"
					});

					$proxy.request(scope.grid.proxy, data, function(data, others){
						scope.grid.loadData(data, "load");
						//scope.grid.deleteIndex = "";
						successPrompt.show();
						success(data, others);
					}, function(errorcode, others, data){
						failurePrompt.show();
						failure(errorcode, others, data);
					}, function(status){
						failurePrompt.show();
						error(status);
					});
				}
			}

			$proxy.request({
				url: qosApplistUrl
			},{
				operation: "load"
			}, function(data, others){
				var options = [];
				for (var index = 0, len = data.length; index < len; index++) {
					var children = data[index].children;

					for (var item = 0, count = children.length; item < count; item++) {
						var obj = {};
						obj["name"] = children[item].name;
						obj["value"] = children[item].id;
						options.push(obj);

						appListObj[children[item].id] = children[item].name
					};
				};

				$scope.form.data.rule_app.options = options;
				$grid.load($scope, {
					operation: "read"
				}, function(data, others){
					$scope.grid.max = (others ? others.max_rules : '') || maxRules;
				});
			});

			if(level === "high"){
				$scope.highPriority = {
					gridTitle: "QOS.HIGH_PRIORITY",
					legendTitle: "QOS.DEVICE",
					editable: true,
					backMenuBtn:{
						onClick: function(){
							$scope.$parent.$parent.form.menuItem = "";
						}
					},
					nullBtn:{
						text: "QOS.ADD_HIGH_PRIORITY"
					},
					nullText: "QOS.NO_HIGH_PRIORITY",
					nullIconCls: "qos-none-icon"
				};
			} 

			if(level === "middle"){
				$scope.middlePriority = {
					gridTitle: "QOS.MIDDLE_PRIORITY",
					legendTitle: "QOS.DEVICE",
					editable: true,
					backMenuBtn:{
						onClick: function(){
							$scope.$parent.$parent.form.menuItem = "";
						}
					},
					nullBtn:{
						text: "QOS.ADD_MIDDLE_PRIORITY"
					},
					nullText: "QOS.NO_MIDDLE_PRIORITY",
					nullIconCls: "qos-none-icon"
				};
			} 

			if(level === "low"){
				$scope.lowPriority = {
					gridTitle: "QOS.LOW_PRIORITY",
					legendTitle: "QOS.DEVICE",
					editable: true,
					backMenuBtn:{
						onClick: function(){
							$scope.$parent.$parent.form.menuItem = "";
						}
					},
					nullBtn:{
						text: "QOS.ADD_LOW_PRIORITY"
					},
					nullText: "QOS.NO_LOW_PRIORITY",
					nullIconCls: "qos-none-icon"
				};
			} 

			$scope.form.data.method.options = [
				{value: "device", name: "QOS.BY_DEVICE"}
			];

			$scope.form.data.proto.options = [
				{value: "all", name: "QOS.ALL"},
				{value: "tcp", name: "QOS.TCP"},
				{value: "udp", name: "QOS.UDP"}
			];

			$scope.form.data.rule_app.options = [];

			$proxy.request({
				url: qosSettingsUrl
			},{}, function(data, others){
				var options = [
					{value: "device", name: "QOS.BY_DEVICE"}
				];

				if(data.enable_app == "on"){
					options.push({value: "app", name: "QOS.BY_APP"});
				}

				if(data.enable_phy == "on"){
					options.push({value: "phy", name: "QOS.BY_PHY"})
				}
				$scope.form.data.method.options = options;
			});

			

			$scope.viewDevices = function(){
				$scope.form.deviceList = "deviceList";
			};

			$scope.form.data.phy.options = [
				{value: "wireless", name: "QOS.WIFI_HOST"},
				{value: "guest", name: "QOS.WIFI_GUEST"},
				{value: "port1", name: "QOS.PORT1"},
				{value: "port2", name: "QOS.PORT2"},
				{value: "port3", name: "QOS.PORT3"},
				{value: "port4", name: "QOS.PORT4"}
			]
		},

		initDeviceList: function($scope, level){
			var deviceListUrl = $url.format("/admin/access_control?form=black_devices");

			var options = {
				proxy:{
					url: deviceListUrl
				},
				fields:[{
					name: "name"
				},{
					name: "ipaddr"
				},{
					name: "mac",
					format: "upperCase"
				}],

				columns:[{
					type: "icon",
					cls: "qos-row-icon"
				},{
					type: "title",
					name: "name"
				},{
					type: "text",
					name: "ipaddr",
					label: "QOS.IP_ADDRESS"
				},{
					type: "text",
					name: "mac",
					label: "QOS.MAC_ADDRESS"
				}],
				autoLoad: false
			};

			$grid.config($scope, options);
			$grid.load($scope,{}, function(data, others){
				$scope.checkedDeviceList.options = $scope.grid.data;
			})
			
			$scope.checkedDeviceList = {
				columns:$scope.grid.columns,
				options: []
			};

			$scope.back = function(){
				$scope.$parent.form.deviceList = "";
				$scope.checkedDeviceList.data = "";
			}

			$scope.done = function(){
				var index = $scope.checkedDeviceList.data;
				if(index !== undefined & index !== ""){
					$scope.$parent.form.data.device_name.data = $scope.checkedDeviceList.options[index]["name"].data;
					$scope.$parent.form.data.mac.data = $scope.checkedDeviceList.options[index]["mac"].data;
					$scope.$parent.form.data.ip.data = $scope.checkedDeviceList.options[index]["ipaddr"].data;

					$scope.$parent.form.data.device_name.setNormal();
					$scope.$parent.form.data.mac.setNormal();
					$scope.$parent.form.data.ip.setNormal();
				}
				
				$scope.checkedDeviceList.data = "";
				$scope.$parent.form.deviceList = "";
			}
		}
	}

}]);

su.controllerProvider.register("highPriority", ["$scope","$qosCommon", function($scope, $qosCommon){
	
	$qosCommon.initQos($scope, "high");

}]);

su.controllerProvider.register("highDeviceList", ["$scope","$qosCommon", function($scope, $qosCommon){
	
	$qosCommon.initDeviceList($scope);
}]);

su.controllerProvider.register("middlePriority", ["$scope","$qosCommon", function($scope, $qosCommon){
	
	$qosCommon.initQos($scope, "middle");
}]);

su.controllerProvider.register("middleDeviceList", ["$scope","$qosCommon", function($scope, $qosCommon){
	
	$qosCommon.initDeviceList($scope);
}]);

su.controllerProvider.register("lowPriority", ["$scope", "$qosCommon", function($scope, $qosCommon){
	
	$qosCommon.initQos($scope, "low");
}]);

su.controllerProvider.register("lowDeviceList", ["$scope", "$qosCommon", function($scope, $qosCommon){

	$qosCommon.initDeviceList($scope);
}]);