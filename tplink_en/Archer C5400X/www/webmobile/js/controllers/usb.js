// JavaScript Document
su.controllerProvider.register("usb", ["$scope", "$url", "$proxy", "$config",
	function($scope, $url, $proxy, $config) {
		$scope.menuItem = "";
		
		if($config.PRINTER_SUPPORT){
			$scope.noPrinter = false;
		}else{
			$scope.noPrinter = true;
		}

		$scope.pageLoading.close();
	}
]);

su.controllerProvider.register("device", ["$scope", "$form", "$url", "$proxy","$http","$msg",
	function($scope, $form, $url, $proxy, $http, $msg) {
		var errorMsg =  $msg.create({
			id: "device-msg",
			content: "USB.NOT_FOUND",
			autoClose: true,
			iconCls: "alert",
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: false,
				handler: function() {}
			}
		})
		var cur_disk_num;

		$scope.scanBtn = {
			visible: true,
			disable: false
		};


		$scope.scan = function() {
			$scope.scanBtn.disabled = true;
			$proxy.request({
				url: $url.format("/admin/disk_setting?form=scan")
			}, {}, function(data, others) {
				if (typeof(data) == "undefined") return;
				cur_disk_num = data.number;
				//if(data.number>0){
					$scope.scanBtn.disabled = false;
					render_list(data);
				/*}else{
					$scope.scanBtn.disabled = false;
					errorMsg.show();
				}*/
			}, function() {
				$scope.scanBtn.disabled = false;
				errorMsg.show();

			}, function() {
				$scope.scanBtn.disabled = false;
				errorMsg.show();
			});
		};

		$scope.deviceList = [];
		$scope.$$oldData = [];
		$scope.$$newData = [];
		var last_disk_num = -1;
		var deviceListWatch;

		$scope.getDetail = function(index) {
			if (index < $scope.$$cur_disk_num) {
				var serial = $scope.$$ret_disk_info[index].serial;
				var title = $scope.$$ret_disk_info[index].name;
				var url = "/admin/disk_setting?form=contents" + "&" + "serial=" + $scope.$$ret_disk_info[index].serial;
				$proxy.request({
					url: $url.format(url)
				}, {}, function(result) {
					$scope.$$oldData[$scope.$$tempIndex] = {
						data: angular.copy(result)
					};
					$scope.$$newData[$scope.$$tempIndex] = {
						data: angular.copy(result)
					};
					var data = [];
					for (var j = 0; j < result.length; j++) {
						if($scope.$$newData[$scope.$$tempIndex].data[j]["enable"] === "on"){
							$scope.$$newData[$scope.$$tempIndex].data[j]["enable"] = "off";
						} else {
							$scope.$$newData[$scope.$$tempIndex].data[j]["enable"] = "on";
						}
						var _enable = {
							data: result[j].enable,
							options: {
								"onValue": "on",
								"offValue": "off"
							},
							proxy: {
								options: {
									url: $url.format("/admin/disk_setting?form=contents" + "&" + "serial=" + $scope.$$ret_disk_info[index].serial)
								},
								data: {
									"operation": "update",
									"index": j,
									"key": "key-" + j,
									"old": angular.extend({}, $scope.$$oldData[$scope.$$tempIndex].data[j], {
										key: "key-" + j
									}),
									"new": $scope.$$newData[$scope.$$tempIndex].data[j]
								},
								success: function(data){
									/*var proxy = _enable.proxy;
									for(var index = 0; index<$scope.deviceList.length; index++){
										if($scope.deviceList[index].serial==proxy.serial){
											for(var volumnIndex = 0; volumnIndex<$scope.deviceList[index].data.length; volumnIndex++){
												if(data.uuid==$scope.deviceList[index].data[volumnIndex].uuid.data){
													$scope.deviceList[index].data[volumnIndex].enable.data = data.enable;
													proxy.data["old"] = angular.extend({},proxy.data["old"], data);
													var tempData = angular.copy(data);
													if(data.enable === "on"){
														tempData.enable = "off";
													} else {
														tempData.enable = "on";
													}
													proxy.data["new"] = tempData;
													return;
												}
											}
										}
									}*/
								},
								serial:$scope.$$ret_disk_info[index].serial
							}
						};
						_enable.proxy.failure = (function(index, j){
							return function(){
								var failurePrompt = $msg.create({
									type: "failure",
									text: "FORM.FAILED"
								});
								var tempData = $scope.deviceList[index].data[j].enable;
								failurePrompt.show();
								if(tempData.data === "off"){
									tempData.data = "on";
								}else{
									tempData.data = "off";
								}
							};
						})($scope.$$tempIndex, j);
						_enable.proxy.error = (function(index, j){
							return function(){
								var failurePrompt = $msg.create({
									type: "failure",
									text: "FORM.FAILED"
								});
								var tempData = $scope.deviceList[index].data[j].enable;
								failurePrompt.show();
								if(tempData.data === "off"){
									tempData.data = "on";
								}else{
									tempData.data = "off";
								}
							};
						})($scope.$$tempIndex, j);

						var _free = {
							data: result[j].free
						}
						var _capacity = {
							data: result[j].capacity
						}
						var _volumn = {
							data: result[j].volumn
						}
						var _uuid = {
							data: result[j].uuid
						}
						data[j] = {};
						data[j].enable = _enable;
						data[j].free = _free;
						data[j].capacity = _capacity;
						data[j].volumn = _volumn;
						data[j].uuid = _uuid;
					}
					$scope.deviceList[$scope.$$tempIndex] = {
						serial: $scope.$$ret_disk_info[$scope.$$tempIndex].serial,
						title: $scope.$$ret_disk_info[$scope.$$tempIndex].name,
						data: data
					};
					$scope.$$tempIndex++;
					$scope.getDetail($scope.$$tempIndex);
				});
			} else {
				if ($scope.deviceList.length == $scope.$$cur_disk_num) {
					deviceListWatch = $scope.$watch("deviceList", function(newValue, oldValue) {
						if (newValue.length == $scope.$$cur_disk_num && oldValue.length == $scope.$$cur_disk_num) {
							$scope.$$newData = formatData(newValue);
							$scope.$$oldData = formatData(oldValue);
							for (var index = 0; index < newValue.length; index++) {
								if ($scope.deviceList[index].data) {
									for (var j = 0; j < newValue[index].data.length; j++) {

										if ($scope.$$newData[index].data[j].enable != $scope.$$oldData[index].data[j].enable) {
											if(newValue !== oldValue){
												if($scope.$$newData[index].data[j]["enable"] === "on"){
													$scope.$$newData[index].data[j]["enable"] = "off";
												} else {
													$scope.$$newData[index].data[j]["enable"] = "on";
												}
												if($scope.$$oldData[index].data[j]["enable"] === "on"){
													$scope.$$oldData[index].data[j]["enable"] = "off";
												} else {
													$scope.$$oldData[index].data[j]["enable"] = "on";
												}
											}
											var proxy = {
												options: {
													url: $url.format("/admin/disk_setting?form=contents" + "&" + "serial=" + $scope.$$ret_disk_info[index].serial)
												},
												data: {
													"operation": "update",
													"index": j,
													"key": "key-" + j,
													"new": {}
												},
												success: function(data){
													/*for(var index = 0; index<$scope.deviceList.length; index++){
														if($scope.deviceList[index].serial==proxy.serial){
															for(var volumnIndex = 0; volumnIndex<$scope.deviceList[index].data.length; volumnIndex++){
																if(data.uuid==$scope.deviceList[index].data[volumnIndex].uuid.data){
																	$scope.deviceList[index].data[volumnIndex].enable.data = data.enable;
																	return;
																}
															}
														}
													}*/
												},
												serial:$scope.$$ret_disk_info[index].serial
											}
											proxy.failure = (function(index, j){
												return function(){
													var failurePrompt = $msg.create({
														type: "failure",
														text: "FORM.FAILED"
													});
													var tempData = $scope.deviceList[index].data[j].enable;
													failurePrompt.show();
													if(tempData.data === "off"){
														tempData.data = "on";
													}else{
														tempData.data = "off";
													}
												};
											})(index, j);
											proxy.error = (function(index, j){
												return function(){
													var failurePrompt = $msg.create({
														type: "failure",
														text: "FORM.FAILED"
													});
													var tempData = $scope.deviceList[index].data[j].enable;
													failurePrompt.show();
													if(tempData.data === "off"){
														tempData.data = "on";
													}else{
														tempData.data = "off";
													}
												};
											})(index, j);

											proxy.data["old"] = angular.extend({}, $scope.$$oldData[index].data[j], {
												key: "key-" + j
											})
											angular.copy($scope.$$newData[index].data[j], proxy.data["new"]);
											$scope.deviceList[index].data[j].enable.proxy = proxy;
										}
									}
								}

							}
						}
					}, true)
				}

			}
		}

		function formatData(oldData) {
			var newData = [];
			for (var index = 0; index < oldData.length; index++) {
				newData[index] = {};
				newData[index].data = [];
				for (var j = 0; j < oldData[index].data.length; j++) {
					newData[index].data[j] = {};
					for (property in oldData[index].data[j]) {
						newData[index].data[j][property] = oldData[index].data[j][property].data;
					}
				}
			}
			return newData
		}

		function render_list(data) {
			if (typeof data == "undefined") {
				return;
			}
			var disk_info = [];
			cur_disk_num = data.number;
			ret_disk_info = data.list;
			$scope.$$ret_disk_info = data.list;
			$scope.$$cur_disk_num = data.number;


			$scope.deviceList.length = 0;
			if (last_disk_num == -1) {
				if(angular.isFunction(deviceListWatch)){
					deviceListWatch();
				}
				$scope.$$tempIndex = 0;
				$scope.getDetail($scope.$$tempIndex);
			}
		}

		function load() {
			$proxy.request({
				url: $url.format("/admin/disk_setting?form=metadata")
			}, {}, function(data){
				if(data){
					cur_disk_num = data.number;
					render_list(data);
				}
			},function(){
				errorMsg.show()
			},function(){
				errorMsg.show()
			});

		}

		load();

		$scope.removeDevice = function(serial) {

			$proxy.request({
				url: $url.format("/admin/disk_setting?form=remove")
			}, {
				serial:serial
			}, function(data){
				load();
			})
		}

		$scope.back = function() {
			$scope.$parent.$parent.menuItem = "";
		}
	}
]);

su.controllerProvider.register("account", ["$scope", "$form", "$url", "$proxy", "$encrypt",
	function($scope, $form, $url, $proxy, $encrypt) {
		var options = {
			proxy: {
				url: $url.format("/admin/folder_sharing?form=account")
			},
			fields: [{
				name: "account",
				allowBlank: false
			}, {
				name: "username",
				vtype: {
					vtype: "name_with_special_start"
				},
				allowBlank: false,
				minLength: 1,
				maxLength: 15
			}, {
				name: "password",
				vtype: {
					vtype: "name"
				},
				allowBlank: false,
				minLength: 1,
				maxLength: 15
			}, {
				name: "confirm",
				mapping: "confirm",
				vtype: {
					vtype: "name"
				},
				allowBlank: false,
				minLength: 1,
				maxLength: 15
			}],
			autoLoad: false,
			validator: function() {
				if ($scope.form.data.confirm.inputData != $scope.form.data.password.inputData) {
					$scope.form.data.confirm.setError("ERROR.e000048");
					return false;
				}
				return true;
			}
		};
		$form.config($scope, options);

		var form_pwd;
		var form_unm;
		$scope.form.data.account.options = [{
			"value": "admin",
			"name": "USB.AC_LOGIN"
		}, {
			"value": "custom",
			"name": "USB.AC_FOLLOW"
		}];

		$scope.form.submitBtn = {
			visible: true,
			disable: false
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		$form.load($scope, {
			operation: "read"
		}, function(data) {
			form_unm = data.username;
			form_pwd = data.password;
		})


		/*var adminFields = [{
			name: "account",
			mapping: "account"
		}, {
			name: "password",
			mapping: "password"
		}, {
			name: "confirm",
			mapping: "confirm"
		}];
		var customFields = [{
			name: "account",
			mapping: "account"
		}, {
			name: "username",
			mapping: "username"
		}, {
			name: "password",
			mapping: "password"
		}, {
			name: "confirm",
			mapping: "confirm"
		}];*/

		$scope.form.data.confirm.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};
		$scope.form.data.password.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};


		$scope.form.data.account.changeHandler = function(newValue) {
			if (newValue == "admin") {
				$scope.form.data.username.disabled = true;
				$scope.form.data.password.disabled = true;
				$scope.form.data.confirm.disabled = true;
				$scope.form.data.username.data = form_unm || '';
				$scope.form.data.password.data = form_pwd || '';
				$scope.form.data.username.setNormal();
				$scope.form.data.password.setNormal();
				$scope.form.data.confirm.setNormal();
				//$scope.form.data.confirm.data = form_pwd;
				//$scope.form.fields = adminFields;
			} else if (newValue == "custom") {
				$scope.form.data.username.disabled = false;
				$scope.form.data.password.disabled = false;
				$scope.form.data.confirm.disabled = false;
				$scope.form.data.username.setNormal();
				$scope.form.data.password.setNormal();
				$scope.form.data.confirm.setNormal();
				//$scope.form.fields = customFields;
				
				$scope.$watch("form.data.confirm.inputData", function(newValue) {
					if (newValue != $scope.form.data.password.inputData) {
						$scope.form.data.confirm.setError("ERROR.e000048");
					} else {
						$scope.form.data.confirm.setNormal();
					}
				})
			}

		};



		$scope.back = function() {
			$scope.form.back(function(){
				$scope.$parent.$parent.menuItem = "";
			});
			//$scope.$parent.$parent.menuItem = "";
		}

		$scope.save = function() {
			$scope.form.submit({}, function() {
			}, function() {
			}, function() {
			});
		}
	}
]);

su.controllerProvider.register("printer", ["$scope", "$form", "$url", "$proxy",
	function($scope, $form, $url, $proxy) {

		var printChange = function(data){
			if (data.enable === "off") {
				$scope.form.data.name.data = "";
			} else {
				if (data.printer_count === 0) {
					$scope.form.data.name.data = "USB.NONE";
				} else {
					$scope.form.data.name.data = data.name;
				}
			}
		}

		var options = {
			proxy: {
				url: $url.format("/admin/print_server?form=config")
			},
			fields: [{
				name: "enable"
			}, {
				name: "name"
			}, {
				name: "printer_count"
			}],
			autoLoad: false
		};
		$form.config($scope, options);

		$form.load($scope, {}, function(data){
			printChange(data);
		})

		$scope.form.data.enable.options = {
			"onValue": "on",
			"offValue": "off"
		};

		$scope.form.data.enable.proxy = {
			options: {
				url: $url.format("/admin/print_server?form=config")
			},
			data: {
				operation: "write"
			},
			field: "enable",
			success: function(data) {
				$scope.form.data.enable.data = data.enable;
				printChange(data);
			},
			failure: function(data) {
				$scope.form.data.enable.data = "off";
			},
			error: function(data) {
				$scope.form.data.enable.data = "off";
			}
		}


		$scope.back = function() {
			$scope.$parent.$parent.menuItem = "";
		}

	}
]);

su.controllerProvider.register("sharing", ["$scope", "$form", "$url", "$proxy", "$msg",
	function($scope, $form, $url, $proxy, $msg) {

		var options = {
			proxy: {
				url: $url.format("/admin/folder_sharing?form=server")
			},
			fields: [{
				name: "server",
				vtype: {
					vtype: "name_special"
				},
				minLength: 4,
				maxLength: 15,
				allowBlank: false
			}],
			autoLoad: true
		};
		$form.config($scope, options);

		$scope.access = [];
		var orignalData = {};
		$proxy.request({
			url: $url.format("/admin/folder_sharing?form=settings")
		}, {
			operation: "read"
		}, function(data) {
			if (typeof data == "undefined") return;
			var orignalEanble = [];
			var orignalPort = [];

			$scope.access.length = 0;
			for (var index = 0; index < data.length; index++) {
				var fields = [];
				var result = {}
				for (property in data[index]) {
					var item = {
						name: property
					};
					fields.push(item);
					result[property] = {};
					if (property == "protocol") {
						switch (data[index].protocol.toUpperCase()) {
							case 'SAMBA':
								result[property].data = "USB.NETWORK_NEIGHBORHOOD";
								break;
							case 'FTP':
								result[property].data = "USB.FTP";
								break;
							case 'FTPEX':
								result[property].data = "USB.FTPEX";
								break;
						}
					} else {
						result[property].data = data[index][property];
						if(property == "enable")
							orignalEanble.push(data[index][property]);
						else if(property == "port")
							orignalPort.push(data[index][property])
					}
				};
				$form.formatData(fields, result);
				$scope.access.push(result)
			}
			orignalData.enable = orignalEanble.toString();
			orignalData.port = orignalPort.toString();
		});


		$scope.form.submitBtn = {
			visible: true,
			disable: false
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn, null , function(){
			var enable = [];
			var port = [];
			for (var index = 0; index < $scope.access.length; index++) {
				enable.push($scope.access[index].enable.data);
				port.push($scope.access[index].port.data);
			}
			if(orignalData.enable === enable.toString() && orignalData.port === port.toString()){
				return true;
			}else{
				return false;
			}
		});

		$scope.back = function() {
			var enable = [];
			var port = [];
			for (var index = 0; index < $scope.access.length; index++) {
				enable.push($scope.access[index].enable.data)
				port.push($scope.access[index].port.data);
			}
			$scope.form.back(function(){
				$scope.$parent.$parent.menuItem = "";
			},null,[{"old":orignalData.enable,"new":enable.toString()},{"old":orignalData.port,"new":port.toString()}]);
			//$scope.$parent.$parent.menuItem = "";
		};

		var saveSuccessPrompt = $msg.create({
			type: "success",
			text: "FORM.SAVED"
		});

		var saveFailurePrompt = $msg.create({
			type: "failure",
			text: "FORM.FAILED"
		});

		$scope.save = function() {
			$scope.form.submitBtn.disabled = true;
			var enable = [];
			var port = [];
			for (var index = 0; index < $scope.access.length; index++) {
				enable.push($scope.access[index].enable.data)
				if ($scope.access[index].edit.data) {
					var port_val = $scope.access[index].port.data;
					if (isNaN(port_val)) {
						$scope.access[index].port.setError("ERROR.e000050");
						$scope.form.submitBtn.disabled = false;
						return;
					} else if ((port_val != 21) && ((port_val < 1024) || (port_val > 65535))) {
						$scope.access[index].port.setError("ERROR.e000051");
						$scope.form.submitBtn.disabled = false;
						return;
					} else {
						port.push($scope.access[index].port.data);
					}
				}
			};

			if(!$form.validate($scope)){
				$scope.form.submitBtn.disabled = false;
				return false;
			}

			$proxy.request({
				url: $url.format("/admin/folder_sharing?form=settings")
			},{
				operation: "save",
				enable: enable.toString(),
				port: port.toString(),
				server: $scope.form.data.server.data
			}, function(data) {

				if (typeof data == "undefined") return;
				//$scope.form.data.name_special.data = data.name_special; 
				var orignalEanble = [];
				var orignalPort = [];

				$scope.access.length = 0;
				for (var index = 0; index < data.length; index++) {
					var fields = [];
					var result = {}
					for (property in data[index]) {
						var item = {
							name: property
						};
						fields.push(item);
						result[property] = {};
						if (property == "protocol") {
							switch (data[index].protocol.toUpperCase()) {
								case 'SAMBA':
									result[property].data = "USB.NETWORK_NEIGHBORHOOD";
									break;
								case 'FTP':
									result[property].data = "USB.FTP";
									break;
								case 'FTPEX':
									result[property].data = "USB.FTPEX";
									break;
							}
						} else {
							result[property].data = data[index][property];
							if(property == "enable")
								orignalEanble.push(data[index][property]);
							else if(property == "port")
								orignalPort.push(data[index][property]);
						}
					};
					$form.formatData(fields, result);
					$scope.access.push(result);
				}
				orignalData.enable = orignalEanble.toString();
				orignalData.port = orignalPort.toString();

				$scope.form.submitBtn.disabled = false;

				saveSuccessPrompt.show();
				$form.load($scope, {}, function(){});
			}, function() {

				$scope.form.submitBtn.disabled = false;

				saveFailurePrompt.show();
			}, function() {

				$scope.form.submitBtn.disabled = false;

				saveFailurePrompt.show();
			});
		};

	}
]);

su.controllerProvider.register("folder", ["$scope", "$form", "$url", "$proxy", "$grid", "$controller",
	function($scope, $form, $url, $proxy, $grid, $controller) {
		$scope.gridEditing = false;
		var options = {
			proxy: {
				url: $url.format("/admin/folder_sharing?form=mode&form=auth")
			},
			fields: [{
				name: "share_all"
			}, {
				name: "authentication"

			}],
			autoLoad: false
		};
		$form.config($scope, options);


		/*		$scope.form.data.share_all = {
			data: "off"
		}*/
		$scope.form.data.share_all.options = {
			"onValue": "on",
			"offValue": "off"
		};
		$scope.form.data.share_all.proxy = {
			options: {
				url: $url.format("/admin/folder_sharing?form=mode"),
				timeout: 12 * 1000
			},
			data: {
				operation: "write"
			},
			field: "share_all",
			success: function(data, others){
				$scope.form.data.share_all.data = data.share_all;
				if ($scope.form.data.share_all.data == "on") {
					$scope.chooseGrid = "all";
					$scope.folderGridConfig.editBtn.visible = false;
					$scope.form.data.authentication.visible = true;
				} else if ($scope.form.data.share_all.data  == "off") {
					$scope.chooseGrid = "folderGrid";
					$scope.folderGridConfig.editBtn.visible = true;
					$scope.form.data.authentication.visible = false;
				}
			}
		}
		/*		$scope.form.data.authentication = {
			data: "off"
		}*/
		$scope.form.data.authentication.options = {
			"onValue": "on",
			"offValue": "off"
		};
		$scope.form.data.authentication.proxy = {
			options: {
				url: $url.format("/admin/folder_sharing?form=auth"),
				timeout: 12 * 1000
			},
			data: {
				operation: "write"
			},
			field: "authentication",
			success: function(data, others){
				$scope.form.data.authentication.data = data.authentication;
			}
		}
		



		/*$scope.$watch("form.data.share_all.data", function(newValue, oldValue) {
			if (newValue == "on" && oldValue == "off") {
				$scope.folderGridConfig.editBtn.visible = false;
				$scope.form.data.authentication.visible = true;
			} else if (newValue == "off" && oldValue == "on") {
				$scope.folderGridConfig.editBtn.visible = true;
				$scope.form.data.authentication.visible = false;
			}
		})*/

		$scope.folderGridConfig = {
			editable: true,
			removable: true,
			editBtn: {
				disabled: false,
				visible: true,
				text: "FORM.EDIT"
			},
			backMenuBtn: {
				onClick: function() {
					$scope.$parent.$parent.menuItem = "";
				}
			},
			nullBtn: {
				disabled: false,
				visible: true,
				text: "FORM.ADD"
			},
			gridTitle: "USB.SHARE_FOLDER",
			formTitle: {
				add: "USB.ADD_FOLDER",
				modify: "USB.MODIFY_FOLDER"
			},
			nullIconCls: "folder-sharing-none-icon",
			nullText: "USB.NO_FOLDER",
			legendTitle: ""
		};
		$scope.allGridConfig = {
			editable: false,
			removable: false,
			editBtn: {
				disabled: false,
				visible: false,
				text: "FORM.EDIT"
			},
			backMenuBtn: {
				onClick: function() {
					$scope.$parent.$parent.menuItem = "";
				}
			},
			nullBtn: {
				disabled: true,
				visible: false,
				text: "FORM.ADD"
			},
			gridTitle: "USB.SHARE_FOLDER",
			formTitle: {
				add: "USB.ADD_FOLDER",
				modify: "USB.MODIFY_FOLDER"
			},
			nullIconCls: "folder-sharing-none-icon",
			nullText: "USB.NO_FOLDER",
			legendTitle: ""
		};

		$scope.$on("gridEditing", function(event, gridEditing) {
			$scope.gridEditing = gridEditing;
		})

		$form.load($scope, {}, function(data){
			if ($scope.form.data.share_all.data == "on") {
				$scope.chooseGrid = "all";
				$scope.folderGridConfig.editBtn.visible = false;
				$scope.form.data.authentication.visible = true;
			} else if ($scope.form.data.share_all.data  == "off") {
				$scope.chooseGrid = "folderGrid";
				$scope.folderGridConfig.editBtn.visible = true;
				$scope.form.data.authentication.visible = false;
			}
		})

	}
]);

su.controllerProvider.register("shareFolder", ["$scope", "$form", "$url", "$proxy", "$grid", "$msg", "$tool",
	function($scope, $form, $url, $proxy, $grid, $msg, $tool) {
		$scope.menuItem = "";
		var options = {
			proxy: {
				url: $url.format("/admin/folder_sharing?form=partial")
			},
			fields: [{
				name: "volumn_name",
				mapping: "volumn"
			}, {
				name: "name",
				vtype: {
					vtype: "name"
				},
				allowBlank: false,
				minLength: 4,
				maxLength: 32
			}, {
				name: "path"				
			}, {
				name: "uuid"
			}, {
				name: "enable",
				format: "upperCaseFirst"
			}, {
				name: "authentication",
				format: "upperCaseFirst"
			}, {
				name: "guest_network",
				format: "upperCaseFirst"
			}, {
				name: "writable",
				format: "upperCaseFirst"
			}, {
				name: "media_server",
				format: "upperCaseFirst"
			}, {
				name: "volumn",
				mapping: "uuid",
				allowBlank: false
			}],
			columns: [{
				name: "",
				label: "",
				type: "icon",
				cls: "folder-row-icon"
			}, {
				name: "name",
				label: "",
				type: "title",
				cls: "usb-row-content"
			}, {
				name: "path",
				label: "USB.FOLDER_PATH",
				type: "text",
				cls: "usb-row-content"
			}, {
				name: "volumn_name",
				label: "USB.VOLUMN_NAME",
				type: "text",
				cls: "usb-row-content"
			}, {
				name: "media_server",
				label: "USB.MEDIA_SHARING",
				type: "text",
				cls: "usb-row-content"
			}],
			autoLoad: false,
			editor: {
				proxy: {
					url: $url.format("/admin/folder_sharing?form=partial")
				},
				fields: [{
					name: "volumn",
					allowBlank: false
				}, {
					name: "name",
					vtype: {
						vtype: "name"
					},
					allowBlank: false,
					minLength: 1,
					maxLength: 32
				}, {
					name: "path"				
				}, {
					name: "uuid"
				}, {
					name: "enable",
					format: "upperCaseFirst"
				}, {
					name: "authentication",
					format: "upperCaseFirst"
				}, {
					name: "guest_network",
					format: "upperCaseFirst"
				}, {
					name: "writable",
					format: "upperCaseFirst"
				}, {
					name: "media_server",
					format: "upperCaseFirst"
				}],
				validator: function(){
					if($scope.form.data.path.data==""){
						$msg.create({
							id: "folder-save-msg",
							content: "USB.PATH_REQUIRED",
							iconCls: "alert",
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
						}).show();
						return false;
					}
					$scope.form.data.enable.data = "on";

					return true;
				}
			}
		}
		$grid.config($scope, options);



		$proxy.request({
			url: $url.format("/admin/folder_sharing?form=volumn")
		}, {}, function(data) {
			$scope.form.data.volumn.options = $tool.isEmptyObject(data) ? [] : data;
			$grid.load($scope);
		});
		$scope.form.data.path.url = $url.format("/admin/folder_sharing?form=tree");
		$scope.form.data.path.uuid = $scope.form.data.volumn;
		$scope.form.data.path.item = "";


		$scope.back = function() {
			//$scope.$parent.$parent.menuItem = "";
			$scope.form.data.path.item="";
			if($scope.form.data.path.data!=""){
				$scope.form.data.path.setNormal()
			}
		}
		$scope.done = function(){
			$scope.form.data.path.item="";
			if($scope.form.data.path.data!=""){
				$scope.form.data.path.setNormal();
			}
		}



	}
]);

su.controllerProvider.register("shareAll", ["$scope", "$form", "$url", "$proxy", "$grid",
	function($scope, $form, $url, $proxy, $grid) {

		var options = {

			proxy: {
				url: $url.format("/admin/folder_sharing?form=all")
			},
			fields: [{
				name: "name",
				vtype: {
					vtype: "name"
				},
				allowBlank: false,
				minLength: 4,
				maxLength: 32
			}, {
				name: "path",
				allowBlank: false
			}, {
				name: "volumn",
				allowBlank: false
			}, {
				name: "uuid"
			}, {
				name: "enable"
			}, {
				name: "media_server"
			}],
			columns: [{
				name: "",
				label: "",
				type: "icon",
				cls: "folder-row-icon"
			}, {
				name: "name",
				label: "usb-row-content",
				type: "title",
				cls: "usb-row-content"
			}, {
				name: "path",
				label: "USB.FOLDER_PATH",
				type: "text",
				cls: "usb-row-content"
			}, {
				name: "volumn",
				label: "USB.VOLUMN_NAME",
				type: "text",
				cls: "usb-row-content"
			}],
			autoLoad: true,
			editor: {
				proxy: {
					url: $url.format("/admin/folder_sharing?form=all")
				}
			}
		}

		$grid.config($scope, options);



		$scope.$on("gridEditing", function(event, gridEditing) {
			$scope.gridEditing = gridEditing;
		})

	}
]);