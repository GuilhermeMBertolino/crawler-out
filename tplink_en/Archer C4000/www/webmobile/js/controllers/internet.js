su.controllerProvider.register('internet', ['$scope','$form','$proxy','$url','$const','$msg','$interval', function($scope, $form, $proxy, $url, $const, $msg, $interval){
	var wanSatusUrl = $url.format("/admin/network?form=wan_ipv4_status&form=mac_clone_advanced");
	var optionsUrl = $url.format("/admin/network?form=wan_ipv4_protos");
	var statusIpv4Url = $url.format("/admin/network?form=status_ipv4");
	
	var serials = [];
	var refreshIpv4Result = null;

	var options = {
		proxy: {
			url: wanSatusUrl
		},
		fields: [{
			name: "conntype",
			allowBlank: false
		},{
			name: "mac_clone_type"
		},{
			name: "mac_custom",
			allowBlank: false,
			vtype:"mac"
		}],
		autoLoad: false
	}

	$form.config($scope, options);
	$scope.form.submitBtn = {};
	$scope.form.dirtyShowSave($scope.form.submitBtn);

	$proxy.request({
		url: optionsUrl
	},{
		advanced: true
	}, function(data, others){
		for (var index = 0, len = data.length; index < len; index++) {
			data[index]["name"] = $const.CONN_TYPE[data[index]["value"].toUpperCase()];
		};
		$scope.form.data.conntype.options = data;
		$form.load($scope, {}, function(data, others){
			$scope.pageLoading.close();
		}, function(){
			$scope.pageLoading.close();
		}, function(){
			$scope.pageLoading.close();
		});
	});

	$scope.form.data.mac_clone_type.options = [
		{value: "default", name: "INTERNET.MAC_DEFAULT" },
		{value: "custom", name: "INTERNET.MAC_CUSTOM" }
	];
	$scope.refreshIpv4Action;
	
	var emptyConfirmMsg = $msg.create({
		//id: "empty-confirm-msg",
		content: "",
		iconCls: "alert",
		autoClose: true,
		autoDestory: true,
		okBtn: {
			show: true,
			text: "FORM.YES",
			handler: function() {
				var conntype = $scope.form.data.conntype.data;
					
				$scope.form.serialize(serials);
				$scope.form.submit({},function(data, others){
					$interval.cancel($scope.refreshIpv4Action);
					if(conntype === data.conntype){
						if(refreshIpv4Result !== null)
							$scope.refreshIpv4Action = $interval(refreshIpv4Result, 1000, 0, false);
					}
				});
			}
		},
		cancelBtn: {
			show: true,
			text: "FORM.NO",
			handler: function() {
			}
		}
	});
	
	$scope.charConfirmMsg = $msg.create({
		content: "INTERNET.HOST_NAME_CONFIRM",
		iconCls: "alert",
		autoClose: true,
		autoDestory: true,
		okBtn: {
			show: true,
			text: "FORM.YES",
			handler: function(){
				var conntype = $scope.form.data.conntype.data;
				
				$scope.form.serialize(serials);
				$scope.form.submit({},function(data, others){
					$interval.cancel($scope.refreshIpv4Action);
					if(conntype === data.conntype){
						if(refreshIpv4Result !== null)
							$scope.refreshIpv4Action = $interval(refreshIpv4Result, 1000, 0, false);
					}
				}, function(){}, function(){}, true, true, true, false);
			}
		},
		cancelBtn: {
			show: true,
			text: "FORM.NO",
			handler: function() {
			}
		}
	});

	$scope.save = function(){
		serials = [];
		refreshIpv4Result = null;

		var conntype = $scope.form.data.conntype.data;
		var macType = $scope.form.data.mac_clone_type.data;

		if(conntype == "none" || conntype === ""){
			$scope.form.data.conntype.setError("ERROR.e000104");
			return;
		}
		
		serials.push("conntype");
		if(macType == "default"){
			serials.push("mac_custom");
		}

		switch(conntype){
			
			case "dhcp":
				var expanderShow = $scope.form.childScope.form.expanderShow;
				var dnsMode = $scope.form.childScope.form.data.dns_mode.data;
				var hostname = $scope.form.childScope.form.data.hostname.data;
				
				// var pattern_hostname = /[\~\!\@\#\$\%\^\&\*\(\)\+\=\|\\\{\}\[\]\:\"\;\'\<\>\?\,\.\/]+/;

				if(expanderShow){
					if(dnsMode == "dynamic"){
						serials.push("manual_pridns", "manual_snddns");
					} else {
						serials.push("dyn_pridns", "dyn_snddns");
					}
				} else {
					serials.push("dns_mode","manual_pridns", "manual_snddns", "dyn_pridns", "dyn_snddns", "mtu", "hostname", "unicast");
				}
				refreshIpv4Result =  $scope.form.childScope.refreshDhcpResult;
				
				/*if(pattern_hostname.test(hostname)){
					charConfirmMsg.show();
					return false;
				}*/
				
				break;
			case "bigpond":
				var connMode = $scope.form.childScope.form.data.conn_mode.data;
				if(connMode == "auto"){
					serials.push("manual_idle", "demand_idle");
				} else if (connMode == "manually"){
					serials.push("demand_idle");
				} else if (connMode == "demand"){
					serials.push("manual_idle");
				}
				refreshIpv4Result =  $scope.form.childScope.refreshBigpondResult;
				break;
			case "pppoe":
				var expanderShow = $scope.form.childScope.form.expanderShow;
				var sndConn = $scope.form.childScope.form.data.snd_conn.data;
				var ipMode = $scope.form.childScope.form.data.ip_mode.data;
				var dnsMode = $scope.form.childScope.form.data.dns_mode.data;
				var connMode = $scope.form.childScope.form.data.conn_mode.data;
				
				var username = $scope.form.childScope.form.data.username.data;
				var password = $scope.form.childScope.form.data.password.data;
				
				if(expanderShow){
					if(sndConn == "none"){
						serials.push("dyn_ip", "dyn_netmask", "static_ip", "static_netmask");
					} else if (sndConn == "dynamic"){
						serials.push("static_ip", "static_netmask");
					} else if (sndConn == "static"){
						serials.push("dyn_ip", "dyn_netmask");
					};

					if(ipMode == "dynamic"){
						serials.push("specific_ip");
					}

					if(dnsMode == "dynamic"){
						serials.push("static_pridns", "static_snddns");
					} else {
						serials.push("dyn_pridns", "dyn_snddns");
					}

					if(connMode == "auto"){
						serials.push("manual_idle", "demand_idle", "time_start", "time_end");
					} else if (connMode == "manually"){
						serials.push("demand_idle", "time_start", "time_end");
					} else if (connMode == "demand"){
						serials.push("manual_idle", "time_start", "time_end");
					} else if (connMode == "time_based"){
						serials.push("manual_idle", "demand_idle");
					}
				} else {
					serials.push("snd_conn", "dyn_ip", "dyn_netmask", "static_ip", "static_netmask", "mtu", "server", "access", "interval", "ip_mode", "specific_ip");
					serials.push("dns_mode", "static_pridns", "static_snddns", "dyn_pridns", "dyn_snddns", "conn_mode", "manual_idle", "demand_idle", "time_start", "time_end");
				}
				
				refreshIpv4Result =  $scope.form.childScope.refreshPppoeResult;
				
				if(username === "" && password === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_INFO"
					emptyConfirmMsg.show();
					return false;
				}
				else if(username === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_USERNAME"
					emptyConfirmMsg.show();
					return false;
				}
				else if(password === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_PASSWORD"
					emptyConfirmMsg.show();
					return false;
				}
				
				break;
			case "l2tp":
				refreshIpv4Result =  $scope.form.childScope.refreshL2tpResult;
			case "pptp":
				var sndConn = $scope.form.childScope.form.data.snd_conn.data;
				var connMode = $scope.form.childScope.form.data.conn_mode.data;
				
				var username = $scope.form.childScope.form.data.username.data;
				var password = $scope.form.childScope.form.data.password.data;

				if (sndConn == "dynamic"){
					serials.push("static_ip", "static_netmask", "static_server", "static_pridns", "static_snddns", "static_gateway");
				} else if (sndConn == "static"){
					serials.push("dyn_ip", "dyn_netmask", "dyn_server", "dyn_pridns", "dyn_snddns", "dyn_gateway");
				};

				if(connMode == "auto"){
					serials.push("manual_idle", "demand_idle");
				} else if (connMode == "manually"){
					serials.push("demand_idle");
				} else if (connMode == "demand"){
					serials.push("manual_idle");
				}
				refreshIpv4Result = refreshIpv4Result===null?$scope.form.childScope.refreshPptpResult:refreshIpv4Result;
				
				if(username === "" && password === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_INFO"
					emptyConfirmMsg.show();
					return false;
				}
				else if(username === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_USERNAME"
					emptyConfirmMsg.show();
					return false;
				}
				else if(password === ""){
					emptyConfirmMsg.content = "QUICK_SETUP.EMPTY_PASSWORD"
					emptyConfirmMsg.show();
					return false;
				}
				break;		
		}

		$scope.form.serialize(serials);
		
		$scope.form.submit({},function(data, others){
			$interval.cancel($scope.refreshIpv4Action);
			if(conntype === data.conntype){
				if(refreshIpv4Result !== null)
					$scope.refreshIpv4Action = $interval(refreshIpv4Result, 1000, 0, false);
			}
		});
	};

	$scope.lanIP = 0;
	$scope.lanMask = 0;
	$scope.wanIP = 0;
	$scope.wanMask = 0;
	$scope.wanSndIP = 0;
	$scope.wanSndMask = 0;

	$proxy.request({
		url: statusIpv4Url
	},{}, function(data, others){
		$scope.lanIP = data.lan_ipv4_ipaddr;
		$scope.lanMask = data.lan_ipv4_netmask;
		$scope.wanIP = data.wan_ipv4_ipaddr;
		$scope.wanMask = data.wan_ipv4_netmask;
		data.wan_ipv4_snd_ipaddr ? $scope.wanSndIP = data.wan_ipv4_snd_ipaddr : 1;
		data.wan_ipv4_snd_netmask ? $scope.wanSndMask = data.wan_ipv4_snd_netmask : 1;
	});
	
}]);

su.controllerProvider.register('static', ['$scope','$form','$proxy','$url',"$tool", function($scope, $form, $proxy, $url, $tool){
	var staticUrl = $url.format("/admin/network?form=wan_ipv4_staticip");
	var staticSubmitUrl = $url.format("/admin/network?form=wan_ipv4_staticip&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;

	var options = {
		proxy:{
			url: staticUrl
		},
		fields:[{
			name: "ipaddr",
			allowBlank: false,
			vtype:"ip"
		},
		{
			name: "netmask",
			allowBlank: false,
			vtype: "netmask"
		},
		{
			name: "gateway",
			allowBlank: false,
			vtype:"ip"
		},
		{
			name: "pri_dns",
			allowBlank: false,
			vtype:"ip"
		},
		{
			name: "snd_dns",
			vtype:"ip"
		},
		{
			name: "mtu",
			allowBlank: false,
			maxLength: 4,
	        vtype: {
	            vtype: "number",
	            config:{
	            	max: 1500,
	            	min: 576
	            }
	        }
		}],
		validator: function(scope){

			var ipVal = scope.form.data.ipaddr.data;
			var maskVal = scope.form.data.netmask.data;
			var gatewayVal = scope.form.data.gateway.data;
			var priDnsVal = scope.form.data.pri_dns.data;
			var sndDnsVal = scope.form.data.snd_dns.data;

			var lanIP = scope.$parent.$parent.lanIP;
			var lanMask = scope.$parent.$parent.lanMask;

			if(!$tool.isNetIpLegal(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.ipaddr.setError();
				scope.form.data.netmask.setError("ERROR.e000101");
				
				return false;
			};

			if($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.ipaddr.setError();
				scope.form.data.netmask.setError("ERROR.e000101");
				
				return false;
			};

			if($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)){
				//scope.form.setError("ERROR.e000102");
				scope.form.data.ipaddr.setError();
				scope.form.data.netmask.setError("ERROR.e000102");
				
				return false;
			};
			if($tool.isSameNet(priDnsVal, lanIP, lanMask)){
				scope.form.data.pri_dns.setError("ERROR.e000053");
				return false;
			};

			if($tool.isSameNet(sndDnsVal, lanIP, lanMask)){
				scope.form.data.snd_dns.setError("ERROR.e000053");
				return false;
			};

			return true;
		},
		autoLoad: true
	};

	$form.config($scope, options);

	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "static"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = staticSubmitUrl;
			
		}
	});
}]);

su.controllerProvider.register('dhcp', ['$scope','$form','$proxy','$url','$tool','$interval', function($scope, $form, $proxy, $url, $tool, $interval){
	var dhcpUrl = $url.format("/admin/network?form=wan_ipv4_dynamic");
	var dhcpSubmitUrl = $url.format("/admin/network?form=wan_ipv4_dynamic&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;

	var switchBtnStatus = function(data){
		switch(data.conn_status.toLowerCase()){
			case "connected":
				$scope.form.renew.disabled = true;
				$scope.form.release.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
			case "disconnected":
				$scope.form.renew.disabled = false;
				$scope.form.release.disabled = true;
				parent.form.submitBtn.disabled = false;
				break;
			case "connecting":
				$scope.form.renew.disabled = false;
				$scope.form.release.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
		}
	}

	var options = {
		proxy:{
			url: dhcpUrl
		},
		fields:[{
			name: "ipaddr",
			isDetect: false
		},
		{
			name: "netmask",
			isDetect: false
		},
		{
			name: "gateway",
			isDetect: false
		},
		{
			name: "pri_dns",
			isDetect: false
		},
		{
			name: "snd_dns",
			isDetect: false
		},
		{
			name: "dns_mode"
		},
		{
			name: "dyn_pridns",
			isDetect: false
		},
		{
			name: "dyn_snddns",
			isDetect: false
		},
		{
			name: "manual_pridns",
			allowBlank: false,
			vtype:  "ip"
		},
		{
			name: "manual_snddns",
			allowBlank: true,
			vtype: "ip"
		},
		{
			name: "mtu",
			allowBlank: false,
			maxLength: 4,
			vtype:{
				vtype: "number",
				config: {
					max: 1500,
					min: 576
				}
			}
		},
		{
			name: "hostname",
			maxLength: 63,
			vtype: "string_visible"
		},
		{
			name: "unicast"
		}],
		validator: function(scope){
			var pattern_hostname = /[\~\!\@\#\$\%\^\&\*\(\)\+\=\|\\\{\}\[\]\:\"\;\'\<\>\?\,\.\/]+/;
			var hostname = scope.form.data.hostname.data;

			if($scope.form.expanderShow)
			if(pattern_hostname.test(hostname)){
				parent.charConfirmMsg.show();
				return false;
			}
			var expanderShow = $scope.form.expanderShow;
			var dnsMode = $scope.form.data.dns_mode.data;
			if((expanderShow) && (dnsMode == "static")){	
				var priDnsVal = scope.form.data.manual_pridns.data;
				var sndDnsVal = scope.form.data.manual_snddns.data;
				var lanIP = scope.$parent.$parent.lanIP;
				var lanMask = scope.$parent.$parent.lanMask;

				if($tool.isSameNet(priDnsVal, lanIP, lanMask)){
					scope.form.data.manual_pridns.setError("ERROR.e000053");
					return false;
				};

				if($tool.isSameNet(sndDnsVal, lanIP, lanMask)){
					scope.form.data.manual_snddns.setError("ERROR.e000053");
					return false;
				};
			}

			return true;
		},
		autoLoad: false
	};
	$form.config($scope, options);

	$scope.form.release = {};
	$scope.form.renew = {};
	$scope.unplugged;

	$scope.refreshDhcpResult = function(){
		$proxy.request({
			url: dhcpUrl,
			showLoading: false
		},{
			operator: "read"
		}, function(data, others){
			if(data.conntype === "dhcp"){
				$scope.form.data.ipaddr.data = data.ipaddr;
				$scope.form.data.netmask.data = data.netmask;
				$scope.form.data.gateway.data = data.gateway;
				$scope.form.data.pri_dns.data = data.pri_dns;
				$scope.form.data.snd_dns.data = data.snd_dns;
				$scope.form.data.dyn_pridns.data = data.dyn_pridns;
				$scope.form.data.dyn_snddns.data = data.dyn_snddns;
				switchBtnStatus(data);
				if(data.link_status === 'unplugged'){
					$scope.unplugged = true;
				}
				else{
					$scope.unplugged = false;
				}
			}
		});
	}
	$scope.$on('$destroy', function(){
		if(parent.refreshIpv4Action){
			$interval.cancel(parent.refreshIpv4Action);
		}
	});
	
	$form.load($scope, {},function(data, others){
		if(data.link_status === 'unplugged'){
			$scope.unplugged = true;
		}
		else{
			$scope.unplugged = false;
		}
		if(data.conntype === "dhcp"){
			parent.refreshIpv4Action = $interval($scope.refreshDhcpResult, 1000, 0, false);
		}
	});

	$scope.form.data.dns_mode.options=[
		{value: "dynamic", name: "INTERNET.GET_DYNAMICALLY_FROM_ISP" },
		{value: "static", name: "INTERNET.USE_FOLLOW_DNS_ADDR" }
	];

	$scope.release = function(){
		$scope.form.load({
			operation: "release"
		},function(data, others){
			$scope.form.release.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.release.disabled = false;
		},function(){
			$scope.form.release.disabled = false;
		},false);

		$scope.form.release.disabled = true;
	};

	$scope.renew = function(){
		$scope.form.load({
			operation: "renew"
		}, function(data, othrs){
			$scope.form.renew.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.renew.disabled = false;
		},function(){
			$scope.form.renew.disabled = false;
		},false);

		$scope.form.renew.disabled = true;
	};

	
	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "dhcp"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = dhcpSubmitUrl;
			
		}
	});



}]);

su.controllerProvider.register('pppoe', ['$scope','$form','$proxy', '$url',"$tool", "$vtype", "$interval", function($scope, $form, $proxy, $url, $tool, $vtype, $interval){
	var pppoeUrl = $url.format("/admin/network?form=wan_ipv4_pppoe");
	var pppoeSubmitUrl = $url.format("/admin/network?form=wan_ipv4_pppoe&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;
	//var refreshIpv4Action

	var switchBtnStatus = function(data){
		switch(data.conn_status.toLowerCase()){
			case "connected":
				$scope.form.renew.disabled = true;
				$scope.form.release.disabled = false;
				$scope.form.connect.disabled = true;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
			case "disconnected":
				$scope.form.renew.disabled = false;
				$scope.form.release.disabled = true;
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = true;
				parent.form.submitBtn.disabled = false;
				break;
			case "connecting":
				$scope.form.renew.disabled = false;
				$scope.form.release.disabled = false;
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
		};

		if(data.dyn_ip == "" || data.dyn_ip == "0.0.0.0"){
			$scope.form.renew.disabled = false;
			$scope.form.release.disabled = true;
		} else {
			$scope.form.renew.disabled = true;
			$scope.form.release.disabled = false;
		}
	}

	var formSerialize = function(){
		var serials = [];
		var expanderShow = $scope.form.expanderShow;
		var sndConn = $scope.form.data.snd_conn.data;
		var ipMode = $scope.form.data.ip_mode.data;
		var dnsMode = $scope.form.data.dns_mode.data;
		var connMode = $scope.form.data.conn_mode.data;

		if(expanderShow){
			if(sndConn == "none"){
				serials.push("dyn_ip", "dyn_netmask", "static_ip", "static_netmask");
			} else if (sndConn == "dynamic"){
				serials.push("static_ip", "static_netmask");
			} else if (sndConn == "static"){
				serials.push("dyn_ip", "dyn_netmask");
			};

			if(ipMode == "dynamic"){
				serials.push("specific_ip");
			}

			if(dnsMode == "dynamic"){
				serials.push("static_pridns", "static_snddns");
			} else {
				serials.push("dyn_pridns", "dyn_snddns");
			}

			if(connMode == "auto"){
				serials.push("manual_idle", "demand_idle", "time_start", "time_end");
			} else if (connMode == "manually"){
				serials.push("demand_idle", "time_start", "time_end");
			} else if (connMode == "demand"){
				serials.push("manual_idle", "time_start", "time_end");
			} else if (connMode == "time_based"){
				serials.push("manual_idle", "demand_idle");
			}
		} else {
			serials.push("snd_conn", "dyn_ip", "dyn_netmask", "static_ip", "static_netmask", "mtu", "server", "access", "interval", "ip_mode", "specific_ip");
			serials.push("dns_mode", "static_pridns", "static_snddns", "dyn_pridns", "dyn_snddns", "conn_mode", "manual_idle", "demand_idle", "time_start", "time_end");
		}

		$scope.form.serialize(serials);
	}
	
	$scope.timervalid = false;

	var options = {
		proxy:{
			url: pppoeUrl
		},
		fields:[{
			name: "username",
			maxLength: 118,
        	minLength: 0,
        	autoTrim: false
		},
		{
			name: "password",
			vtype: 'password',
	        maxLength: 118,
	        minLength: 0,
	        autoTrim: false
		},
		{
			name: "inet_ip",
			isDetect: false
		},
		{
			name: "inet_pridns",
			isDetect: false
		},
		{
			name: "inet_snddns",
			isDetect: false
		},
		{
			name: "snd_conn"
		},
		{
			name: "dyn_ip",
			isDetect: false
		},
		{
			name: "dyn_netmask",
			isDetect: false
		},
		{
			name: "static_ip",
			vtype: "ip"
		},
		{
			name: "static_netmask",
			vtype: "netmask"
		},
		{
			name: "mtu",
			maxLength: 4,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 1492,
	            	min: 576
	            }
	        }
		},
		{
			name: "server",
			maxLength: 31,
	        minLength: 0,
			vtype: 'string_visible_allow_blank',
			autoTrim: false
		},
		{
			name: "access",
			vtype: 'string_visible_allow_blank',
	        maxLength: 31,
	        minLength: 0
		},
		{
			name: "interval",
			allowBlank: false,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 120,
	            	min: 0
	            }
	        }
		},
		{
			name: "ip_mode"
		},
		{
			name: "specific_ip",
			allowBlank:false,
			vtype: "ip"
		},
		{
			name: "dns_mode"
		},
		{
			name: "dyn_pridns",
			isDetect: false
		},
		{
			name: "dyn_snddns",
			isDetect: false
		},
		{
			name: "static_pridns",
			allowBlank: false,
			vtype: "ip"
		},
		{
			name: "static_snddns",
			vtype: "ip"
		},
		{
			name: "conn_mode"
		},
		{
			name: "demand_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 99,
	            	min: 0
	            }
	        }
		},
		{
			name: "time_start"
		},
		{
			name: "time_end"
		},
		{
			name: "manual_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 99,
	            	min: 0
	            }
	        }
		}],
		validator: function(scope){
			var sndConn = scope.form.data.snd_conn.data;
			if(sndConn == "static"){
				var ipVal = scope.form.data.static_ip.data;
				var maskVal = scope.form.data.static_netmask.data;

				var lanIP = scope.$parent.$parent.lanIP;
				var lanMask = scope.$parent.$parent.lanMask;

				if(!$tool.isNetIpLegal(ipVal, maskVal)){
					//scope.form.setError("ERROR.e000101");
					scope.form.data.static_ip.setError();
					scope.form.data.static_netmask.setError("ERROR.e000101");
					return false;
				};

				if($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)){
					//scope.form.setError("ERROR.e000101");
					scope.form.data.static_ip.setError();
					scope.form.data.static_netmask.setError("ERROR.e000101");
					return false;
				};

				if($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)){
					//scope.form.setError("ERROR.e000102");
					scope.form.data.static_ip.setError();
					scope.form.data.static_netmask.setError("ERROR.e000102");
					return false;
				}
			}

			var dnsMode = scope.form.data.dns_mode.data;
			if(dnsMode == "static"){
				var priDnsVal = scope.form.data.static_pridns.data;
				var sndDnsVal = scope.form.data.static_snddns.data;
				var lanIP = scope.$parent.$parent.lanIP;
				var lanMask = scope.$parent.$parent.lanMask;

				if($tool.isSameNet(priDnsVal, lanIP, lanMask)){
					scope.form.data.static_pridns.setError("ERROR.e000053");
					return false;
				};

				if($tool.isSameNet(sndDnsVal, lanIP, lanMask)){
					scope.form.data.static_snddns.setError("ERROR.e000053");
					return false;
				};
			}
			var timeStart = scope.form.data.time_start.data;
			var timeEnd = scope.form.data.time_end.data;
			
			scope.timervalid = true;

			timeStart = parseInt(timeStart.split(":")[0] + timeStart.split(":")[1], 10);
			timeEnd = parseInt(timeEnd.split(":")[0] + timeEnd.split(":")[1], 10);

			if(timeStart >= timeEnd){
				//scope.form.setError("ERROR.e000103");
				scope.form.data.time_end.setError("ERROR.e000103");
				return false;
			}
			else{
				scope.form.data.time_end.setNormal();
			}
			return true;
		},
		autoLoad: false
	};
	
	$form.config($scope, options);

	$scope.form.connect = {};
	$scope.form.disconnect = {};
	$scope.form.renew = {};
	$scope.form.release = {};

	$scope.refreshPppoeResult = function(){
		$proxy.request({
			url: pppoeUrl,
			showLoading: false
		}, {
			operation: "read"
		}, function(data, others) {
			if(data.conntype === "pppoe"){
				$scope.form.data.inet_ip.data = data.inet_ip;
				$scope.form.data.inet_pridns.data = data.inet_pridns;
				$scope.form.data.inet_snddns.data = data.inet_snddns;
				$scope.form.data.dyn_ip.data = data.dyn_ip;
				$scope.form.data.dyn_netmask.data = data.dyn_netmask;
				$scope.form.data.dyn_pridns.data = data.dyn_pridns;
				$scope.form.data.dyn_snddns.data = data.dyn_snddns;
				switchBtnStatus(data);
			}
		});
	}
	$scope.$on('$destroy', function(){
		if(parent.refreshIpv4Action){
			$interval.cancel(parent.refreshIpv4Action);
		}
	});
	
	$form.load($scope, {},function(data, others){
		if(data.conntype === "pppoe"){
			parent.refreshIpv4Action = $interval($scope.refreshPppoeResult, 1000, 0, false);
		}
	});

	$scope.form.data.snd_conn.options = [
		{value: "none", name: "INTERNET.NONE" },
		{value: "dynamic", name: "INTERNET.DYNAMIC_IP" },
		{value: "static", name: "INTERNET.STATIC_IP" }
	];

	$scope.form.data.ip_mode.options = [
		{value: "dynamic", name: "INTERNET.GET_DYNAMICALLY_FROM_ISP" },
		{value: "static", name: "INTERNET.USE_FOLLOW_IP_ADDR" }
	];

	$scope.form.data.dns_mode.options = [
		{value: "dynamic", name: "INTERNET.GET_DYNAMICALLY_FROM_ISP" },
		{value: "static", name: "INTERNET.USE_FOLLOW_DNS_ADDR" }
	];

	$scope.form.data.conn_mode.options = [
		{value: "auto", name: "INTERNET.AUTO" },
		{value: "demand", name: "INTERNET.ON_DEMAND" },
		{value: "time_based", name: "INTERNET.TIME_BASED"},
		{value: "manually", name: "INTERNET.MANUALLY" }
	];

	$scope.connect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "connect"
		},function(data, others){
			$scope.form.connect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.connect.disabled = false;
		},function(){
			$scope.form.connect.disabled = false;
		},false);

		$scope.form.connect.disabled = true;
	};

	$scope.disconnect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "disconnect"
		},function(data, others){
			$scope.form.disconnect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.disconnect.disabled = false;
		},function(){
			$scope.form.disconnect.disabled = false;
		},false);

		$scope.form.disconnect.disabled = true;
	};

	$scope.release = function(){
		$scope.form.load({
			operation: "release"
		},function(data, others){
			$scope.form.release.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.release.disabled = false;
		},function(){
			$scope.form.release.disabled = false;
		});

		$scope.form.release.disabled = true;
	};

	$scope.renew = function(){
		$scope.form.load({
			operation: "renew"
		}, function(data, others){
			$scope.form.renew.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.renew.disabled = false;
		},function(){
			$scope.form.renew.disabled = false;
		});

		$scope.form.renew.disabled = true;
	};

	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "pppoe"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = pppoeSubmitUrl;
		}
	});

}]);

su.controllerProvider.register('bigpond', ['$scope','$form','$proxy', '$url', '$interval', function($scope, $form, $proxy, $url, $interval){
	var bigpondUrl = $url.format("/admin/network?form=wan_ipv4_bigpond");
	var bigpondSubmitUrl = $url.format("/admin/network?form=wan_ipv4_bigpond&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;

	var switchBtnStatus = function(data){
		switch(data.conn_status.toLowerCase()){
			case "connected":
				$scope.form.connect.disabled = true;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
			case "disconnected":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = true;
				parent.form.submitBtn.disabled = false;
				break;
			case "connecting":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
		}
	}
	var formSerialize = function(){
		var serials = [];
		var connMode = $scope.form.data.conn_mode.data;
		if(connMode == "auto"){
			serials.push("manual_idle", "demand_idle");
		} else if (connMode == "manually"){
			serials.push("demand_idle");
		} else if (connMode == "demand"){
			serials.push("manual_idle");
		}
		$scope.form.serialize(serials);
	}

	var options = {
		proxy:{
			url: bigpondUrl
		},
		fields:[{
			name: "username",
			maxLength: 118,
			minLength: 0,
			vtype: "string_visible_allow_blank"
		},
		{
			name: "password",
			maxLength: 118,
			minLength: 0,
			vtype: 'password'
		},
		{
			name: "server",
			maxLength: 31,
			minLength: 0,
			vtype: 'string_visible'
		},
		{
			name: "domain",
			maxLength: 31,
			minLength: 0,
			vtype: 'string_visible'
		},
		{
			name: "mtu",
			allowBlank: false,
			maxLength: 4,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 1500,
	            	min: 576
	            }
	        }
		},
		{
			name: "conn_mode"
		},
		{
			name: "demand_idle",
			allowBlank: false,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 99,
	            	min: 0
	            }
	        }
		},
		{
			name: "manual_idle",
			allowBlank: false,
	        vtype: {
	            vtype: "number",
	            config: {
		            max: 99,
		            min: 0
		        }
	        }
		}],
		autoLoad: false
	};

	$form.config($scope, options);

	$scope.form.connect = {};
	$scope.form.disconnect = {};

	$scope.refreshBigpondResult = function(){
		$proxy.request({
			url: bigpondUrl,
			showLoading: false
		},{
			operator: "read"
		}, function(data, other){
			if(data.conntype === "bigpond"){
				switchBtnStatus(data);
			}
		});
	}
	$scope.$on('$destroy', function(){
		if(parent.refreshIpv4Action){
			$interval.cancel(parent.refreshIpv4Action);
		}
	});
	
	$form.load($scope, {},function(data, others){
		if(data.conntype === "bigpond"){
			parent.refreshIpv4Action = $interval($scope.refreshBigpondResult, 1000, 0, false);
		}
	});

	$scope.form.data.conn_mode.options = [
		{value: "auto", name: "INTERNET.AUTO" },
		{value: "demand", name: "INTERNET.ON_DEMAND" },
		{value: "manually", name: "INTERNET.MANUALLY" }
	];

	$scope.connect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "connect"
		},function(data, others){
			$scope.form.connect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.connect.disabled = false;
		},function(){
			$scope.form.connect.disabled = false;
		},false);

		$scope.form.connect.disabled = true;
	};

	$scope.disconnect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "disconnect"
		},function(data, others){
			$scope.form.disconnect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.disconnect.disabled = false;
		},function(){
			$scope.form.disconnect.disabled = false;
		},false);

		$scope.form.disconnect.disabled = true;
	};

	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "bigpond"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = bigpondSubmitUrl;
			
		}
	});

}]);

su.controllerProvider.register('l2tp', ['$scope','$form','$proxy', '$url',"$tool", "$vtype", "$interval", function($scope, $form, $proxy, $url, $tool, $vtype, $interval){
	var l2tpUrl = $url.format("/admin/network?form=wan_ipv4_l2tp");
	var l2tpSubmitUrl = $url.format("/admin/network?form=wan_ipv4_l2tp&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;

	var options = {
		proxy:{
			url: l2tpUrl
		},
		fields:[{
			name: "username",
			maxLength: 118,
			minLength: 0,
			vtype: "string_visible_allow_blank",
			autoTrim: false
		},
		{
			name: "password",
			maxLength: 118,
			minLength: 0,
			vtype: 'password',
			autoTrim: false
		},
		{
			name: "inet_ip",
			isDetect: false
		},
		{
			name: "inet_pridns",
			isDetect: false
		},
		{
			name: "inet_snddns",
			isDetect: false
		},
		{
			name: "snd_conn"
		},
		{
			name: "dyn_server",
			allowBlank: false,
			maxLength: 63,
			minLength: 0,
			vtype: 'string_ip_domain'
		},
		{
			name: "dyn_ip",
			isDetect: false
		},
		{
			name: "dyn_netmask",
			isDetect: false
		},
		{
			name: "dyn_gateway",
			isDetect: false
		},
		{
			name: "dyn_pridns",
			isDetect: false
		},
		{
			name: "dyn_snddns",
			isDetect: false
		},
		{
			name: "static_pridns"
		},
		{
			name: "static_snddns"
		},
		{
			name: "static_server",
			allowBlank: false,
			maxLength: 63,
			minLength: 0,
			vtype: 'string_ip_domain'
		},
		{
			name: "static_ip",
			allowBlank: false,
			vtype: 'ip'
		},
		{
			name: "static_netmask",
			allowBlank: false,
			vtype: 'netmask'
		},
		{
			name: "static_gateway",
			vtype: 'ip'
		},
		{
			name: "static_pridns",
			vtype: 'ip'
		},
		{
			name: "static_snddns",
			vtype: 'ip'
		},
		{
			name: "mtu",
			maxLength: 4,
	        vtype: {
	            vtype: "number",
	            config: {
	                max: 1460,
	            	min: 576	
	            }
	        }
		},
		{
			name: "conn_mode"
		},
		{
			name: "demand_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 99,
	            	min: 0
	            }
	        }
		},
		{
			name: "manual_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 99,
	            	min: 0
	            }
	        }
		}],
		validator: function(scope){
			var sndConn = scope.form.data.snd_conn.data;
			if(sndConn === "dynamic"){
				return true;
			};

			var ipVal = scope.form.data.static_ip.data;
			var maskVal = scope.form.data.static_netmask.data;
			var serverVal = scope.form.data.static_server.data;
			var gatewayVal = scope.form.data.static_gateway.data;
			var priDnsVal = scope.form.data.static_pridns.data;
			var sndDnsVal = scope.form.data.static_snddns.data;

			var lanIP = scope.$parent.$parent.lanIP;
			var lanMask = scope.$parent.$parent.lanMask;

			if(serverVal != "" && $vtype.ip(serverVal) == true && !$tool.isSameNet(serverVal, ipVal, maskVal)){
				if(gatewayVal === ""){
					//scope.form.setError("ERROR.e000104");
					scope.form.data.static_gateway.setError("ERROR.e000104")
					return false;
				}
			}

			if(serverVal != "" && $vtype.ip(serverVal) !== true){
				if(!$tool.isSameNet(priDnsVal, ipVal, maskVal) && gatewayVal == ""){
					//scope.form.setError("ERROR.e000104");
					scope.form.data.static_gateway.setError("ERROR.e000104")
					return false;
				}

				if(priDnsVal == ""){
					//scope.form.setError("ERROR.e000105");
					scope.form.data.static_pridns.setError("ERROR.e000104");
					return false;
				}
			}

			if(!$tool.isNetIpLegal(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000101");
				return false;
			}

			if($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000101");
				return false;
			}

			if($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)){
				//scope.form.setError("ERROR.e000102");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000101");
				return false;
			}

			if($tool.isSameNet(priDnsVal, lanIP, lanMask)){
				scope.form.data.static_pridns.setError("ERROR.e000053");
				return false;
			}

			if($tool.isSameNet(sndDnsVal, lanIP, lanMask)){
				scope.form.data.static_snddns.setError("ERROR.e000053");
				return false;
			}
			return true;

		},
		autoLoad: false
	};

	$form.config($scope, options);

	$scope.form.connect = {};
	$scope.form.disconnect = {};

	var switchBtnStatus = function(data){
		switch(data.conn_status.toLowerCase()){
			case "connected":
				$scope.form.connect.disabled = true;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
			case "disconnected":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = true;
				parent.form.submitBtn.disabled = false;
				break;
			case "connecting":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
		}
	}

	var formSerialize = function(){
		var serials = [];
		var sndConn = $scope.form.data.snd_conn.data;
		var connMode = $scope.form.data.conn_mode.data;

		if (sndConn == "dynamic"){
			serials.push("static_ip", "static_netmask", "static_server", "static_pridns", "static_snddns", "static_gateway");
		} else if (sndConn == "static"){
			serials.push("dyn_ip", "dyn_netmask", "dyn_server", "dyn_pridns", "dyn_snddns", "dyn_gateway");
		};

		if(connMode == "auto"){
			serials.push("manual_idle", "demand_idle");
		} else if (connMode == "manually"){
			serials.push("demand_idle");
		} else if (connMode == "demand"){
			serials.push("manual_idle");
		}
		$scope.form.serialize(serials);
	}
	
	$scope.refreshL2tpResult = function(){
		$proxy.request({
			url: l2tpUrl,
			showLoading: false
		},{
			operation: "read"
		},function(data,other){
			if(data.conntype === "l2tp"){
				$scope.form.data.inet_ip.data = data.inet_ip;
				$scope.form.data.inet_pridns.data = data.inet_pridns;
				$scope.form.data.inet_snddns.data = data.inet_snddns;
				$scope.form.data.dyn_ip.data = data.dyn_ip;
				$scope.form.data.dyn_netmask.data = data.dyn_netmask;
				$scope.form.data.dyn_gateway.data = data.dyn_gateway;
				$scope.form.data.dyn_pridns.data = data.dyn_pridns;
				$scope.form.data.dyn_snddns.data = data.dyn_snddns;
				switchBtnStatus(data);
			}
		});
	}
	$scope.$on('$destroy', function(){
		if(parent.refreshIpv4Action){
			$interval.cancel(parent.refreshIpv4Action);
		}
	});

	$form.load($scope, {},function(data, others){
		if(data.conntype === "l2tp"){
			parent.refreshIpv4Action = $interval($scope.refreshL2tpResult, 1000, 0, false);
		}
	});

	$scope.form.data.snd_conn.options = [
		{value: "dynamic", name: "INTERNET.DYNAMIC_IP" },
		{value: "static", name: "INTERNET.STATIC_IP" }
	];

	$scope.form.data.conn_mode.options = [
		{value: "auto", name: "INTERNET.AUTO" },
		{value: "demand", name: "INTERNET.ON_DEMAND" },
		{value: "manually", name: "INTERNET.MANUALLY" }
	];

	$scope.connect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "connect"
		},function(data, others){
			$scope.form.connect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.connect.disabled = false;
		},function(){
			$scope.form.connect.disabled = false;
		},false);
		$scope.form.connect.disabled = true;
	};

	$scope.disconnect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "disconnect"
		},function(data, others){
			$scope.form.disconnect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.disconnect.disabled = false;
		},function(){
			$scope.form.disconnect.disabled = false;
		},false);
		$scope.form.disconnect.disabled = true;
	};
	
	$scope.$watch("form.data.static_server.data", function(newVal, oldValue){
		if(newVal){
			if($vtype.ip(newVal) == true){
				$scope.form.pridnsOptional = "FORM.OPTIONAL";
			}else{
				$scope.form.pridnsOptional = "";
			}
		}
	});

	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "l2tp"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = l2tpSubmitUrl;
			
		}
	});

}]);

su.controllerProvider.register('pptp', ['$scope','$form','$proxy', '$url',"$vtype","$tool","$interval", function($scope, $form, $proxy, $url, $vtype, $tool, $interval){
	var pptpUrl = $url.format("/admin/network?form=wan_ipv4_pptp");
	var pptpSubmitUrl = $url.format("/admin/network?form=wan_ipv4_pptp&form=mac_clone_advanced");

	var parent = $scope.$parent.$parent;
	var conntype = parent.form.data.conntype;

	var options = {
		proxy:{
			url: pptpUrl
		},
		fields:[{
			name: "username",
			maxLength: 118,
			minLength: 0,
			vtype: "string_visible_allow_blank",
			autoTrim: false
		},
		{
			name: "password",
			maxLength: 118,
			minLength: 0,
			vtype: 'password',
			autoTrim: false
		},
		{
			name: "inet_ip",
			isDetect: false
		},
		{
			name: "inet_pridns",
			isDetect: false
		},
		{
			name: "inet_snddns",
			isDetect: false
		},
		{
			name: "snd_conn"
		},
		{
			name: "dyn_server",
			allowBlank: false,
			maxLength: 63,
			minLength: 0,
			vtype: "string_ip_domain"
		},
		{
			name: "dyn_ip",
			isDetect: false
		},
		{
			name: "dyn_netmask",
			isDetect: false
		},
		{
			name: "dyn_gateway",
			isDetect: false
		},
		{
			name: "dyn_pridns",
			isDetect: false
		},
		{
			name: "dyn_snddns",
			isDetect: false
		},
		{
			name: "static_server",
			allowBlank: false,
			maxLength: 63,
			minLength: 0,
			vtype: "string_ip_domain"
		},
		{
			name: "static_ip",
			allowBlank: false,
			vtype: 'ip'
		},
		{
			name: "static_netmask",
			allowBlank: false,
			vtype: 'netmask'
		},
		{
			name: "static_gateway",
			vtype: 'ip'
		},
		{
			name: "static_pridns",
			vtype: 'ip'
		},
		{
			name: "static_snddns",
			vtype: 'ip'
		},
		{
			name: "mtu",
			maxLength: 4,
	        vtype: {
	            vtype: "number",
	            config: {
	            	max: 1420,
	            	min: 576	            	
	            }
	        }
		},
		{
			name: "conn_mode"
		},
		{
			name: "demand_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
		            max: 99,
		            min: 0
		        }
	        }

		},
		{
			name: "manual_idle",
			allowBlank: false,
			maxLength: 2,
	        vtype: {
	            vtype: "number",
	            config: {
		            max: 99,
		            min: 0
		        }
	        }
		}],
		validator: function(scope){
			var sndConn = scope.form.data.snd_conn.data;
			if(sndConn === "dynamic"){
				return true;
			};

			var ipVal = scope.form.data.static_ip.data;
			var maskVal = scope.form.data.static_netmask.data;
			var serverVal = scope.form.data.static_server.data;
			var gatewayVal = scope.form.data.static_gateway.data;
			var priDnsVal = scope.form.data.static_pridns.data;
			var sndDnsVal = scope.form.data.static_snddns.data;

			var lanIP = scope.$parent.$parent.lanIP;
			var lanMask = scope.$parent.$parent.lanMask;

			if(serverVal != "" && $vtype.ip(serverVal) == true && !$tool.isSameNet(serverVal, ipVal, maskVal)){
				if(gatewayVal === ""){
					//scope.form.setError("ERROR.e000104");
					scope.form.data.static_gateway.setError("ERROR.e000104");
					return false;
				}
			}

			if(serverVal != "" && $vtype.ip(serverVal) != true){
				if(!$tool.isSameNet(priDnsVal, ipVal, maskVal) && gatewayVal == ""){
					//scope.form.setError("ERROR.e000104");
					scope.form.data.static_gateway.setError("ERROR.e000104");
					return false;
				}

				if(priDnsVal == ""){
					//scope.form.setError("ERROR.e000105");
					scope.form.data.static_pridns.setError("ERROR.e000104");
					return false;
				}
			}

			if(!$tool.isNetIpLegal(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000101");
				return false;
			}

			if($tool.isNetIp(ipVal, maskVal) || $tool.isBroadCastIp(ipVal, maskVal)){
				//scope.form.setError("ERROR.e000101");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000101");
				return false;
			}

			if($tool.isSameNet(lanIP, ipVal, maskVal) || $tool.isSameNet(ipVal, lanIP, lanMask)){
				//scope.form.setError("ERROR.e000102");
				scope.form.data.static_ip.setError();
				scope.form.data.static_netmask.setError("ERROR.e000102");
				return false;
			}

			if($tool.isSameNet(priDnsVal, lanIP, lanMask)){
				scope.form.data.static_pridns.setError("ERROR.e000053");
				return false;
			}

			if($tool.isSameNet(sndDnsVal, lanIP, lanMask)){
				scope.form.data.static_snddns.setError("ERROR.e000053");
				return false;
			}
			return true;
		},
		autoLoad: false
	};

	$form.config($scope, options);

	$scope.form.connect = {};
	$scope.form.disconnect = {};
	var switchBtnStatus = function(data){
		switch(data.conn_status.toLowerCase()){
			case "connected":
				$scope.form.connect.disabled = true;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
			case "disconnected":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = true;
				parent.form.submitBtn.disabled = false;
				break;
			case "connecting":
				$scope.form.connect.disabled = false;
				$scope.form.disconnect.disabled = false;
				parent.form.submitBtn.disabled = false;
				break;
		}
	};

	var formSerialize = function(){
		var serials = [];
		var sndConn = $scope.form.data.snd_conn.data;
		var connMode = $scope.form.data.conn_mode.data;

		if (sndConn == "dynamic"){
			serials.push("static_ip", "static_netmask", "static_server", "static_pridns", "static_snddns", "static_gateway");
		} else if (sndConn == "static"){
			serials.push("dyn_ip", "dyn_netmask", "dyn_server", "dyn_pridns", "dyn_snddns", "dyn_gateway");
		};

		if(connMode == "auto"){
			serials.push("manual_idle", "demand_idle");
		} else if (connMode == "manually"){
			serials.push("demand_idle");
		} else if (connMode == "demand"){
			serials.push("manual_idle");
		}

		$scope.form.serialize(serials);
	}
	
	$scope.refreshPptpResult = function(){
		$proxy.request({
			url: pptpUrl,
			showLoading: false
		},{
			operetor: "read"
		},function(data, other){
			if(data.conntype === "pptp"){
				$scope.form.data.inet_ip.data = data.inet_ip;
				$scope.form.data.inet_pridns.data = data.inet_pridns;
				$scope.form.data.inet_snddns.data = data.inet_snddns;
				$scope.form.data.dyn_ip.data = data.dyn_ip;
				$scope.form.data.dyn_netmask.data = data.dyn_netmask;
				$scope.form.data.dyn_gateway.data = data.dyn_gateway;
				$scope.form.data.dyn_pridns.data = data.dyn_pridns;
				$scope.form.data.dyn_snddns.data = data.dyn_snddns;
				switchBtnStatus(data);
			}
		});
	};
	$scope.$on('$destroy', function(){
		if(parent.refreshIpv4Action){
			$interval.cancel(parent.refreshIpv4Action);
		}
	});

	$form.load($scope, {},function(data, others){
		if(data.conntype === "pptp"){
			parent.refreshIpv4Action = $interval($scope.refreshPptpResult, 1000, 0, false);
		}
	});

	$scope.form.data.snd_conn.options = [
		{value: "dynamic", name: "INTERNET.DYNAMIC_IP" },
		{value: "static", name: "INTERNET.STATIC_IP" }
	];

	$scope.form.data.conn_mode.options = [
		{value: "auto", name: "INTERNET.AUTO" },
		{value: "demand", name: "INTERNET.ON_DEMAND" },
		{value: "manually", name: "INTERNET.MANUALLY" }
	];

	$scope.connect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "connect"
		},function(data, others){
			$scope.form.connect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.connect.disabled = false;
		},function(){
			$scope.form.connect.disabled = false;
		},false);
		$scope.form.connect.disabled = true;
	};

	$scope.disconnect = function(){
		formSerialize();
		$scope.form.submit({
			operation: "disconnect"
		},function(data, others){
			$scope.form.disconnect.disabled = false;
			switchBtnStatus(data);
		},function(){
			$scope.form.disconnect.disabled = false;
		},function(){
			$scope.form.disconnect.disabled = false;
		},false);
		$scope.form.disconnect.disabled = true;
	};

	$scope.$watch("form.data.static_server.data", function(newVal, oldValue){
		if(newVal){
			if($vtype.ip(newVal) == true){
				$scope.form.pridnsOptional = "FORM.OPTIONAL";
			}else{
				$scope.form.pridnsOptional = "";
			}
		}
	});

	$scope.$watch(function(){return conntype.data}, function(newValue, oldValue){
		if(conntype.data === "pptp"){
			parent.form.childScope = $scope;
			parent.form.proxy.url = pptpSubmitUrl;
			
		}
	});
}]);