// JavaScript Document
su.controllerProvider.register("parental", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	
	var parentalEnableUrl = $url.format("/admin/parental_control?form=enable");

	var options = {
		proxy: {
			url: parentalEnableUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "host_mac"
		}],
		autoLoad: false
	};

	$form.config($scope, options);
	$form.load($scope, {}, function(){
		$scope.pageLoading.close();
	}, function(){
		$scope.pageLoading.close();
	})

	$scope.form.data.enable.options = {
		offValue: "off",
		onValue: "on"
	};

	$scope.form.data.enable.proxy = {
		options:{
			url: parentalEnableUrl
		},
		field: "enable",
		data: {
			operation: "write"
		},
		success: function(data, others){
			$scope.form.loadData(data);
		}
	}

}]);

su.controllerProvider.register("parentalDevice", ["$scope","$grid","$msg","$proxy", "$const","$url","$tool","$timeout", function($scope, $grid, $msg, $proxy, $const, $url, $tool, $timeout){
	
	var deviceUrl = $url.format("/admin/parental_control?form=device");

	var options = {
		proxy:{
			url: deviceUrl
		},
		fields:[{
			name: "name",
			allowBlank:false,
			minLength:0,
			maxLength:32,
			vtype:"string_visible_allow_blank"
		},{
			name: "mac",
			maxLength:17,
			allowBlank:false,
			vtype:"mac",
			format: "upperCase"
		},{
			name: "calendar"
		},{
			name: "note",
			vtype:"string_visible_allow_blank",
			maxLength:32
		},{
			name: "enable",
			format: "upperCaseFirst"
		}],

		columns:[{
			type: "icon",
			cls:"device-row-icon"
		},{
			type: "title",
			name: "name",
			cls: "device-row-content"
		},{
			type: "text",
			name: "mac",
			label: "PARENTAL_CTR.MAC_ADDRESS",
			cls: "device-row-content"
		},{
			type: "text",
			name: "enable",
			label: "PARENTAL_CTR.STATUS",
			cls: "device-row-content"
		}],

		editor:{
			validator: function(scope){
				var hostMac = scope.$parent.$parent.form.data.host_mac.data;
				var gridData = scope.grid.data;
				var mac = scope.form.data.mac.data;
				var editIndex = scope.grid.updateIndex;

				if(hostMac.toUpperCase() == mac.toUpperCase()){
					//scope.form.setError();
					scope.form.data.mac.setError("ERROR.e000120");
					return false;
				}

				for (var index = 0, len = gridData.length; index < len; index++) {
					if(editIndex != index && gridData[index].mac.data.toUpperCase() == mac.toUpperCase() ){
						//scope.form.setError("");
						scope.form.data.mac.setError("ERROR.e000118");
						return false;
					}
				};

				return true;
			}
		},

		autoLoad: true
	};

	$grid.config($scope, options);

	$scope.deviceGrid = {
		gridTitle: "PARENTAL_CTR.DEVICE_CTR",
		legendTitle: "PARENTAL_CTR.DEVICE_NUMBER",
		editable: true,
		backMenuBtn:{
			onClick: function(){
				$scope.$parent.$parent.form.menuItem = "";
			}
		},
		nullBtn:{
			text: "PARENTAL_CTR.ADD_DEVICE"
		},
		nullText: "PARENTAL_CTR.NO_DEVICE",
		nullIconCls: "device-none-icon"
	};

	$scope.viewDevices = function(){
		$scope.form.deviceList = "deviceList";
	}

	$scope.done = function(){
		$scope.form.data.calendar.save = 1;
		$scope.form.accessTime = "";
	}

	$scope.back = function(){
		$scope.form.accessTime = "";
	}
	
	$timeout(function(){
		var formContent = angular.element(document.querySelectorAll(".parental-device")).parent();
		var formHeader = angular.element(document.querySelectorAll(".parental-device")).children().children()[1];
		formContent.css("padding-top", angular.element(formHeader)[0].clientHeight + "px");
	}, 100);	
}]);

su.controllerProvider.register("parentalDeviceList", ["$scope","$grid","$msg","$proxy", "$const","$url","$tool", function($scope, $grid, $msg, $proxy, $const, $url, $tool){
	
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
			name: "mac"
		}],

		columns:[{
			type: "icon",
			cls:"view-device-row-icon"
		},{
			type: "title",
			name: "name",
			cls:"view-device-row-content"
		},{
			type: "text",
			name: "ipaddr",
			label: "PARENTAL_CTR.IP_ADDR",
			cls:"view-device-row-content"
		},{
			type: "text",
			name: "mac",
			label: "PARENTAL_CTR.MAC_ADDRESS",
			cls:"view-device-row-content"
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
		if(index !== undefined && index !== ""){
			$scope.$parent.form.data.name.data = $scope.checkedDeviceList.options[index]["name"].data;
			$scope.$parent.form.data.mac.data = $scope.checkedDeviceList.options[index]["mac"].data;

			$scope.$parent.form.data.name.setNormal();
			$scope.$parent.form.data.mac.setNormal();
		}
		
		$scope.$parent.form.deviceList = "";
		$scope.checkedDeviceList.data = "";
	}

	
}]);

su.controllerProvider.register("restriction", ["$scope","$form","$msg","$proxy", "$const","$url","$tool", function($scope, $form, $msg, $proxy, $const, $url, $tool){
	
	var restrictionUrl = $url.format("/admin/parental_control?form=mode");

	var globalWhite;
	var globalBlack;
	var mode;

	var options={
		proxy:{
			url: restrictionUrl
		},
		fields:[{
			name: "access_mode"
		},{
			name: "black"
		},{
			name: "white"
		}],
		autoLoad: false
	};

	$form.config($scope, options);
	$form.load($scope, {}, function(data, others){
		$scope.maxBlack = data.others.max_rules_black;
		$scope.maxWhite = data.others.max_rules_white; 
	});

	$scope.form.submitBtn = {};
	$scope.form.dirtyShowSave($scope.form.submitBtn);

	$scope.form.data.access_mode.options = [
		{value: "black", name: "PARENTAL_CTR.BLACKMODE"},
		{value: "white", name: "PARENTAL_CTR.WHITEMODE"}
	];

	$scope.back = function(){
		// $scope.$parent.form.menuItem = "";
		$scope.form.back(function(){
			$scope.$parent.form.menuItem = "";
		});
	};

	$scope.save = function(){

		if($scope.form.data.access_mode.data == "black"){
			// mode = "black";
			// globalWhite = angular.toJson($scope.form.data.white.data);
			$scope.form.fields = [{
				name: "access_mode"
			},{
				name: "black"
			}];

			$scope.form.serialize(["white"]);
			if($scope.form.data.black.data === ""){
				$scope.form.data.black.data = [];
			}
		} else {
			// mode = "white";
			// globalBlack = angular.toJson($scope.form.data.black.data);
			$scope.form.fields = [{
				name: "access_mode"
			},{
				name: "white"
			}];

			$scope.form.serialize(["black"]);
			if($scope.form.data.white.data === ""){
				$scope.form.data.white.data = [];
			}
		}

		$scope.form.submit();



		// if(mode === "black"){
		// 	$scope.form.data.white.data = globalWhite;
		// } else {
		// 	$scope.form.data.black.data = globalBlack;
		// }
	}
}]);

su.controllerProvider.register("black", ["$scope","$grid","$msg","$proxy", "$const","$url","$tool", function($scope, $grid, $msg, $proxy, $const, $url, $tool){
	
	var parent = $scope.$parent.$parent;
	var blacklist = [];

	var options = {
		fields: [{
			name: "keyword",
			vtype:"string_visible_no_comma",
			allowBlank: false,
			maxLength:255
		}],
		columns: [{
			type: "title",
			name: "keyword",
			cls: "parent-grid-text-cls"
		}],
		autoLoad: false,
		editor:{
			proxy: {
				url: null
			},
			validator: function(scope){
				var gridData = scope.grid.data;
				var keyword = scope.form.data.keyword.data;
				var editIndex = scope.grid.updateIndex;

				for (var index = 0, len = gridData.length; index < len; index++) {
					if(editIndex != index && keyword == gridData[index].keyword.data){
						//scope.form.setError();
						scope.form.data.keyword.setError("ERROR.e000121");
						return false;
					}
				};

				return true;
			}
		}
	};

	$grid.config($scope, options);

	$scope.$watch(function(){return parent.form.data.black.data}, function(newVal, oldVal){
		newVal = angular.fromJson(newVal);
		blacklist = [];
		if(angular.isArray(newVal)){
			for (var index = 0, len = newVal.length; index < len; index++) {
				var blackObj = {};
				blackObj["keyword"] = newVal[index];
				blacklist.push(blackObj);
			};

			$grid.loadData($scope, blacklist, "load");
		}
		$scope.grid.max = parent.maxBlack;
	});

	$scope.$watch(function(){return $scope.grid.data}, function(newVal, oldVal){
		var blacklist = [];
		for (var index = 0, len = $scope.grid.data.length; index < len; index++){
			blacklist.push($scope.grid.data[index]["keyword"].data);
		}
		parent.form.data.black.data = angular.toJson(blacklist);
	}, true);


	$scope.blackGrid = {
		gridTitle: "PARENTAL_CTR.BLACKMODE",
		editable: true,
		backMenuBtn:{
			onClick: function(){
				$scope.$parent.$parent.form.mode = "";
			}
		},
		saveBtn: {
			text: "FORM.DONE"
		},
		nullBtn: {
			text: "PARENTAL_CTR.ADD_BLACK"
		},
		nullText: "PARENTAL_CTR.NO_BLACK",
		nullIconCls: "list-none-icon"
	};

	$scope.grid.load = function(data, success, failure, error, showLoading){
		
		var success = success || function(){};
		var failure = failure || function(){};
		var error = error || function(){};

		var success2 = function(data, others){
			var newVal = angular.fromJson(data.black);
		
			blacklist = [];
			if(angular.isArray(newVal)){
				for (var index = 0, len = newVal.length; index < len; index++) {
					var blackObj = {};
					blackObj["keyword"] = newVal[index];
					blacklist.push(blackObj);
				};

				$grid.loadData($scope, blacklist, "load");
				success();
			}
			
		}

		parent.form.load(data, success2, failure, error, showLoading);
	}

}]);

su.controllerProvider.register("white", ["$scope","$grid","$msg","$proxy", "$const","$url","$tool", function($scope, $grid, $msg, $proxy, $const, $url, $tool){
	var parent = $scope.$parent.$parent;
	var whitelist = [];

	var options = {
		fields: [{
			name: "domain",
			allowBlank: false,
			maxLength:255,
			vtype:"domain"
		}],
		columns: [{
			type: "title",
			name: "domain",
			cls: "parent-grid-text-cls"
		}],
		autoLoad: false,
		editor:{
			proxy: {
				url: null
			},
			validator: function(scope){
				var gridData = scope.grid.data;
				var keyword = scope.form.data.domain.data;
				var editIndex = scope.grid.updateIndex;

				for (var index = 0, len = gridData.length; index < len; index++) {
					if(editIndex != index && keyword == gridData[index].domain.data){
						//scope.form.setError();
						scope.form.data.domain.setError("ERROR.e000122");
						return false;
					}
				};

				return true;
			}
		}
	};

	$grid.config($scope, options);

	$scope.$watch(function(){return parent.form.data.white.data}, function(newVal, oldVal){
		newVal = angular.fromJson(newVal);
		whitelist = [];
		if(angular.isArray(newVal)){
			for (var index = 0, len = newVal.length; index < len; index++) {
				var blackObj = {};
				blackObj["domain"] = newVal[index];
				whitelist.push(blackObj);
			};

			$grid.loadData($scope, whitelist, "load");
		}

		$scope.grid.max = parent.maxWhite;
	});

	$scope.$watch(function(){return $scope.grid.data}, function(newVal, oldVal){
		var whitelist = [];
		for (var index = 0, len = $scope.grid.data.length; index < len; index++){
			whitelist.push($scope.grid.data[index]["domain"].data);
		}
		parent.form.data.white.data = angular.toJson(whitelist);
	}, true);


	$scope.whiteGrid = {
		gridTitle: "PARENTAL_CTR.WHITEMODE",
		editable: true,
		backMenuBtn:{
			onClick: function(){
				$scope.$parent.$parent.form.mode = "";
			}
		},
		saveBtn: {
			text: "FORM.DONE"
		},
		nullBtn: {
			text: "PARENTAL_CTR.ADD_WHITE"
		},
		nullText: "PARENTAL_CTR.NO_WHITE",
		nullIconCls: "list-none-icon"
	};

	$scope.grid.load = function(data, success, failure, error, showLoading){

		var success = success || function(){};
		var failure = failure || function(){};
		var error = error || function(){};

		var success2 = function(data, others){
			var newVal = angular.fromJson(data.white);
		
			whitelist = [];
			if(angular.isArray(newVal)){
				for (var index = 0, len = newVal.length; index < len; index++) {
					var blackObj = {};
					blackObj["domain"] = newVal[index];
					whitelist.push(blackObj);
				};

				$grid.loadData($scope, whitelist, "load");

				
				success();
			}
		}

		parent.form.load(data, success2, failure, error, showLoading);
		
	}
}]);
