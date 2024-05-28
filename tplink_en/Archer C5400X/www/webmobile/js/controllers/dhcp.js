// JavaScript Document
su.controllerProvider.register("dhcpServer", ["$scope","$url", "$proxy", function($scope, $url, $proxy){
	var statusIpv4Url = $url.format("/admin/network?form=status_ipv4");

	$scope.lanIP = 0;
	$scope.lanMask = 0;

	$proxy.request({
		url: statusIpv4Url
	}, {}, function(data, others){
		$scope.lanIP = data.lan_ipv4_ipaddr;
		$scope.lanMask = data.lan_ipv4_netmask;
	});

	$scope.pageLoading.close();
}]);

su.controllerProvider.register("dhcpSetting", ["$scope", "$form", "$url", "$tool", function($scope, $form, $url, $tool){

	var parent = $scope.$parent.$parent;

	var dhcpSettingUrl = $url.format("/admin/dhcps?form=setting");
	var options = {
		proxy:{
			url: dhcpSettingUrl
		},
		fields:[{
			name: "enable"
		},{
			name: "ipaddr_start",
			allowBlank: false,
			vtype: 'ip'
		},{
			name: "ipaddr_end",
			allowBlank: false,
			vtype: 'ip'
		},{
			name: "leasetime",
			vtype: {
            	vtype: "number",
            	config: {
            		max: 2880,
	            	min: 1
            	}
	        }
		},{
			name: "gateway",
			vtype: 'ip'
		},{
			name: "pri_dns",
			vtype: 'ip'
		},{
			name: "snd_dns",
			vtype: 'ip'
		}],
		validator: function(scope){
			var ipStart = scope.form.data.ipaddr_start.data;
			var ipEnd = scope.form.data.ipaddr_end.data;
			var gateway = scope.form.data.gateway.data;
			var lanIP = scope.$parent.$parent.lanIP;
			var lanMask = scope.$parent.$parent.lanMask;

			if($tool.ipToInt(ipStart) > $tool.ipToInt(ipEnd)){
				//scope.form.setError();
				scope.form.data.ipaddr_end.setError("ERROR.e000115");
				return false;
			};

			if(!$tool.isSameNet(ipStart, lanIP, lanMask)){
				//scope.form.setError();
				scope.form.data.ipaddr_start.setError("ERROR.e000116");
				return false;
			}

			if(!$tool.isSameNet(ipEnd, lanIP, lanMask)){
				//scope.form.setError();
				scope.form.data.ipaddr_end.setError("ERROR.e000116");
				return false;
			}

			if($tool.isNetIp(ipStart, lanMask) || $tool.isBroadCastIp(ipStart, lanMask)){
				//scope.form.setError();
				scope.form.data.ipaddr_start.setError("ERROR.e000127");
				return false;
			}

			if($tool.isNetIp(ipEnd, lanMask) || $tool.isBroadCastIp(ipEnd, lanMask)){
				//scope.form.setError();
				scope.form.data.ipaddr_end.setError("ERROR.e000127");
				return false;
			}

			if(gateway && !$tool.isSameNet(gateway, lanIP, lanMask)){
				//scope.form.setError();
				scope.form.data.gateway.setError("ERROR.e000117");
				return false;
			}

			if($tool.isNetIp(gateway, lanMask) || $tool.isBroadCastIp(gateway, lanMask)){
				//scope.form.setError();
				scope.form.data.gateway.setError("ERROR.e000127");
				return false;
			}

			return true;
		},
		autoLoad: true
	};

	$form.config($scope, options);

	$scope.$watch(function(){return parent.lanIP}, function(newVal, oldVal){
		$scope.form.data.current_ip = {
			data: newVal
		};
	});
	
	$scope.form.submitBtn = {
		visible: false,
		disabled: false
	};
	$scope.form.dirtyShowSave($scope.form.submitBtn);
	$scope.form.data.enable.options={
		offValue: "off",
		onValue: "on"
	}

	$scope.back = function(){
		$scope.form.back(function(){
			$scope.$parent.$parent.form.menuItem = "";
		});
		//$scope.$parent.$parent.form.menuItem = "";
	}

	$scope.save = function(){
		$scope.form.submit();
	}

}]);


su.controllerProvider.register("dhcpClientsList", ["$scope", "$grid", "$url", function($scope, $grid, $url){
	var dhcpClientsUrl = $url.format("/admin/dhcps?form=client");
	var options = {
		proxy:{
			url: dhcpClientsUrl
		},
		fields:[{
			name: "name"
		},{
			name: "macaddr",
			format: "upperCase"
		},{
			name: "ipaddr"
		},{
			name: "leasetime"
		}],
		autoLoad: true,
		columns:[{
			type: "icon",
			cls: "dhcp-row-icon"
		},{
			type: "title",
			name: "name",
			cls: "dhcp-row-content"
		},{
			type: "text",
			name: "macaddr",
			label: "DHCP_SERVER.MAC_ADDR",
			cls: "dhcp-row-content"
		},{
			type: "text",
			name: "ipaddr",
			label: "DHCP_SERVER.ASSIGNED_IP",
			cls: "dhcp-row-content"
		},{
			type: "text",
			name: "leasetime",
			label: "DHCP_SERVER.LEASE_TIME",
			cls: "dhcp-row-content"
		}]
	};

	$scope.clientGrid = {
		gridTitle: "DHCP_SERVER.CLIENTSLIST",
		legendTitle: "DHCP_SERVER.CLIENT_NUMBER",
		editable: false,
		removable: false,
		editBtn: {
			visible: false
		},
		backMenuBtn:{
			onClick: function(){
				$scope.$parent.$parent.form.menuItem = "";
			}
		},
		nullText: "DHCP_SERVER.NO_CLIENT",
		nullIconCls: "dhcp-none-icon",
		nullBtn:{
			text: "DHCP_SERVER.ADD_ADDR",
			visible: false
		}
	}
	
	$grid.config($scope,options);
}]);

su.controllerProvider.register("addrReservation", ["$scope", "$grid", "$url", "$tool",  function($scope, $grid, $url, $tool){
	var reservationUrl = $url.format("/admin/dhcps?form=reservation");
	
	var options = {
		proxy:{
			url: reservationUrl
		},

		fields:[{
			name: "mac",
			vtype: 'mac',
			allowBlank: false,
			format: "upperCase"
		},{
			name: "ip",
			allowBlank: false,
			vtype: 'ip'
		},{
			name: "name",
			mapping: "comment",
			maxLength: 32,
	        vtype: "string_visible_allow_blank"
		},{
			name: "enable",
			format: "upperCaseFirst"
		}],	
		columns:[{
			type: "icon",
			cls: "dhcp-row-icon"
		},{
			type: "text",
			name: "mac",
			label: "DHCP_SERVER.MAC_ADDR",
			cls: "addrReverse-row-content"
		},{
			type: "text",
			name: "ip",
			label: "DHCP_SERVER.REVESERD_IP",
			cls: "addrReverse-row-content"
		},{
			type: "text",
			name: "name",
			label: "DHCP_SERVER.DESCRIPTION",
			cls: "addrReverse-row-content"
		},{
			type: "text",
			name: "enable",
			label: "DHCP_SERVER.STATUS",
			cls: "addrReverse-row-content"
		}],
		autoLoad: true,
		editor: {
			validator: function(scope){
				var gridData = scope.grid.data;
				var editindex = scope.grid.updateIndex;
				var lanIP = scope.$parent.$parent.lanIP;
				var lanMask = scope.$parent.$parent.lanMask;


				var mac = scope.form.data.mac.data;
				var ip = scope.form.data.ip.data;

				for (var index = 0, len = gridData.length; index < len; index++) {
					if(editindex != index && mac.toUpperCase() == gridData[index].mac.data.toUpperCase()){
						
						//scope.form.setError();
						scope.form.data.mac.setError("ERROR.e000118");
						return false;
					}

					if(editindex != index && ip == gridData[index].ip.data){
						//scope.form.setError();
						scope.form.data.ip.setError("ERROR.e000119");
						return false;
					}

				};

				if(!$tool.isSameNet(ip, lanIP, lanMask)){
					//scope.form.setError();
					scope.form.data.ip.setError("ERROR.e000126");
					return false;
				}

				if($tool.isNetIp(ip, lanMask) || $tool.isBroadCastIp(ip,lanMask)){
					//scope.form.setError();
					scope.form.data.ip.setError("ERROR.e000101");
					return false;
				}

				if($tool.ipToInt(ip) == $tool.ipToInt(lanIP)){
					//scope.form.setError();
					scope.form.data.ip.setError("ERROR.e000106");
					return false;
				}

				return true;
				
			}
		}
	}
	
	$grid.config($scope,options);

	$scope.addrGrid = {
		gridTitle: "DHCP_SERVER.RESERVATION",
		editable: true,
		backMenuBtn:{
			onClick: function(){
				$scope.$parent.$parent.form.menuItem = "";
			}
		},
		nullBtn:{
			text: "DHCP_SERVER.ADD_ADDR"
		},
		nullText: "DHCP_SERVER.NO_ADDR",
		nullIconCls: "addrReverse-none-icon"
	}
}]);
