// JavaScript Document
su.controllerProvider.register("systemtools", ["$scope", "$form", "$proxy", "$msg", "$url", function($scope, $form, $proxy, $msg, $url) {

		
		var factory_total_time = 2 * 60 * 1000;
		var factory_query_interval = false;

		var options = {
			proxy: {
				url: $url.format("/admin/firmware?form=config")

			},
			fields: [],
			autoLoad: false
		};

		$form.config($scope, options);
		$scope.form.menuItem = "";
		$form.load($scope, {}, function(data) {
			factory_total_time = Number(data.totaltime*1000 || factory_total_time);
			$scope.pageLoading.close();
		});

		$scope.islogined = true;
		$proxy.request({
			url: $url.format("/admin/cloud_account?form=check_login"),
			showLoading: false
		},{}, function(data, others){
			if(data.islogined){
				$scope.islogined = false;
			}
			else{
				$scope.islogined = true;
			}
		});

		$scope.rebootProgressBar = {
			visible: false,
			width: 13.12,
			max: 100,
			value: 100,
			speed: 60000,
			handler: function() {}
		};

		$scope.resetProgressBar = {
			visible: false,
			width: 13.12,
			max: 100,
			value: 100,
			speed: 1000,
			handler: function() {}
		};

		function factory_getResult() {
			$proxy.request({
				url: $url.format("/admin/firmware?form=config"),
				showLoading: false
			}, {
				operation: "check"
			}, function(data) {}, function(errcode) {

				function hideProMsg() {
					clearInterval(factory_query_interval);
					$scope.resetProgressBar.close();
					factory_query_interval = false;


					// pro_bar.progressbar("hide");
					// $("#factory_pro_cnt").hide();

					resetConfirmMsg.okBtn.show = true;
					resetConfirmMsg.cancelBtn.show = true;
					resetConfirmMsg.close()
				}

				if (errcode == "err_form") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000201");
				} else if (errcode == "err_check") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000202");
				} else if (errcode == "err_sizex") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000203");
				} else if (errcode == "err_flash") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000204");
				} else if (errcode == "err_reboot") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000205");
				} else if (errcode == "err_other") {
					hideProMsg();
					resetFailedMsg.show("failure", "ERROR.e000206");
				} else {
					hideProMsg();
				}
			});
		}

		function factory_write() {

			$proxy.request({
				url: $url.format("/admin/firmware?form=config"),
				showLoading: false
			}, {
				operation: "factory",
				all: true
			}, function(data, others) {
				//clearInterval(factory_query_interval);
				//factory_query_interval = setTimeout(factory_getResult, 1000);
				
				$scope.resetProgressBar.handler = function() {
					if (localStorage) {
						localStorage.setItem("token", "");
					};
					location.href = "/";
				}

			}, function() {
				clearInterval(factory_query_interval);
				factory_getResult();
			});
		}
		var resetFailedMsg = $msg.create({
			type: "waiting",
			text: ""
		})

		var resetConfirmMsg = $msg.create({
			id: "reset-confirm-msg",
			iconCls: "alert",
			content: "SYSTEM_TOOLS.RESET_ALERT",
			autoClose: false,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {
					resetConfirmMsg.okBtn.show = false;
					resetConfirmMsg.cancelBtn.show = false;
					resetConfirmMsg.iconCls = "";
					resetConfirmMsg.title = "SYSTEM_TOOLS.RESET_NOTE";
					resetConfirmMsg.content = "";
					$scope.resetProgressBar.speed = factory_total_time;
					$scope.resetProgressBar.start();
					factory_write();
					return false;
				}
			},
			cancelBtn: {
				show: true,
				text: "FORM.CANCEL",
				cls: "cancel",
				btnCls: "btncancel",
				handler: function() {
					resetConfirmMsg.close();
				}
			}
		})

		var rebootConfirmMsg = $msg.create({
			id: "reboot-confirm-msg",
			iconCls: "alert",
			autoClose: false,
			content: "SYSTEM_TOOLS.REBOOT_ALERT",
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {
					rebootConfirmMsg.okBtn.show = false;
					rebootConfirmMsg.cancelBtn.show = false;
					rebootConfirmMsg.content= "";
					rebootConfirmMsg.title="SYSTEM_TOOLS.REBOOTING";
					rebootConfirmMsg.iconCls = "";
					$scope.rebootProgressBar.start();
					//rebootConfirmMsg.close();
					$proxy.request({
						url: $url.format("/admin/system?form=reboot"),
						showLoading: false
					}, {
						operation: "write"
					}, function(data, others) {});
					$scope.rebootProgressBar.handler = function() {
						if (localStorage) {
							localStorage.setItem("token", "");
						};
						location.href = "/";
					}
					//$scope.$apply()
					return false;
				}
			},
			cancelBtn: {
				show: true,
				text: "FORM.CANCEL",
				cls: "cancel",
				btnCls: "btncancel",
				handler: function() {
					rebootConfirmMsg.close();
				}
			}
		});

		var logoutConfirmMsg = $msg.create({
			id: "logout-confirm-msg",
			iconCls: "alert",
			autoClose: true,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {
					var h = function() {
						if (localStorage) {
							localStorage.setItem("token", "");
						};
						location.href = "/";
					};
					$proxy.request({
						url: $url.format("/admin/system?form=logout")
					}, {
						operation: "write"
					}, h, h)
				}
			},
			cancelBtn: {
				show: true,
				text: "FORM.CANCEL",
				cls: "cancel",
				btnCls: "btncancel",
				handler: function() {
					logoutConfirmMsg.close();
				}
			}
		})

		$scope.reset = function() {
			resetConfirmMsg.iconCls = "alert";
			resetConfirmMsg.title = "";
			resetConfirmMsg.content = "SYSTEM_TOOLS.RESET_ALERT";
			resetConfirmMsg.show()
		}
		$scope.reboot = function() {
			rebootConfirmMsg.content= "SYSTEM_TOOLS.REBOOT_ALERT";
			rebootConfirmMsg.title="";
			rebootConfirmMsg.iconCls = "alert";
			rebootConfirmMsg.show()
		}
		$scope.logout = function() {
			logoutConfirmMsg.show()
		}
}]);
/*
 * LED Control
 */
su.controllerProvider.register("led-control", ["$scope", "$form", "$proxy", "$msg", "$url",
	function($scope, $form, $proxy, $msg, $url) {
		var options = {
			proxy: {
				url: $url.format("/admin/ledpm?form=setting")

			},
			fields: [{
				name: "enable"
			}, {
				name: "time_end",
				allowBlank: false
			}, {
				name: "time_start", //value
				allowBlank: false
			}],
			autoLoad: true,
			validator: function() {
				if ($scope.form.data.time_start.data == $scope.form.data.time_end.data) {
					$scope.form.data.time_end.setError();
					$scope.form.setError("ERROR.e000047");
					return false;
				}
				return true;
			}
		};

		$form.config($scope, options);
		$scope.form.submitBtn = {};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		$scope.form.data.time_end.options = [];
		$scope.form.data.time_start.options = [];
		for (var index = 0; index < 48; index++) {
			var hour = parseInt(index / 2);
			if (hour < 10) {
				hour = "0" + hour;
			} else {
				hour = "" + hour;
			}

			if (index % 2) {
				minute = "30";
			} else {
				minute = "00";
			}

			$scope.form.data.time_end.options[index] = {
				"value": hour + ":" + minute,
				"name": hour + ":" + minute
			}
			$scope.form.data.time_start.options[index] = {
				"value": hour + ":" + minute,
				"name": hour + ":" + minute
			}
		}


		$scope.form.data.time_start.changeHandler = function(newValue, oldValue) {

			var end = $scope.form.data.time_end.options;
			if ($scope.form.data.time_start.data && newValue) {

				for (var index = 0; index < 48; index++) {
					$scope.form.data.time_end.options[index].name = $scope.form.data.time_end.options[index].name.substr(0, 5);
					if (end[index].value.split(":")[0] < newValue.split(":")[0]) {
						$scope.form.data.time_end.options[index].name += "(+1)"
					} else if (end[index].value.split(":")[0] == newValue.split(":")[0] && end[index].value.split(":")[1] < newValue.split(":")[1]) {
						$scope.form.data.time_end.options[index].name += "(+1)"
					}
				}
			}
		}

		// $scope.form.data.enable.changeHandler = function(newValue, oldValue) {
		// 	if (newValue == "off") {
		// 		$scope.form.data.time_start.disabled = true;
		// 		$scope.form.data.time_end.disabled = true;
		// 	} else {
		// 		$scope.form.data.time_start.disabled = false;
		// 		$scope.form.data.time_end.disabled = false;
		// 	}
		// }


		$scope.submit = function() {
			$scope.form.submit()
		}
		$scope.back = function(){
			$scope.form.back(function(){
				$scope.$parent.form.menuItem = "";
			});
			//$scope.$parent.form.menuItem = "";
			//$scope.$apply()
		}
	}
]);
/*
 * time setting
 */
su.controllerProvider.register("time-settings", ["$scope", "$form", "$proxy", "$const", "$url", "$msg",
	function($scope, $form, $proxy, $const, $url, $msg) {
		var options = {
			proxy: {
				url: $url.format("/admin/time?form=settings&form=dst")
			},
			fields: [{
				name: "time",
				allowBlank:false
			}, {
				name: "current_time",
				isDetect: false
			}, {
				name: "type",
				allowBlank: false
			}, {
				name: "timezone",
				allowBlank: false
			}, {
				name: "ntp_svr1",
				allowBlank: false,
				vtype:"string_ip_domain"
			}, {
				name: "ntp_svr2",
				allowBlank: true,
				vtype:"string_ip_domain"
			}, {
				name: "date",
				vtype:"date",
				allowBlank: false
			}, {
				name: "dst_enable"
			}, {
				name: "start_year",
				isDetect: false
			}, {
				name: "start_month",
				allowBlank: false
			}, {
				name: "start_day",
				allowBlank: false
			}, {
				name: "start_week",
				allowBlank: false
			}, {
				name: "start_hour",
				allowBlank: false
			}, {
				name: "end_year",
				isDetect: false
			}, {
				name: "end_month",
				allowBlank: false
			}, {
				name: "end_day",
				allowBlank: false
			}, {
				name: "end_week",
				allowBlank: false
			}, {
				name: "end_hour",
				allowBlank: false
			}, {
				name: "dst_status",
				isDetect: false
			}, {
				name: "status"
			}],
			autoLoad: false
		};

		$form.config($scope, options);

		var sysTimeHash = "";
		var startTimeHash = "";
		var endTimeHash = "";
		var sysTimeYear = "2013";
		var t_getgmt = 0;


		$scope.form.data.type.options = [{
			"value": "auto",
			"name": "SYSTEM_TOOLS.AUTOMATIC"
		}, {
			"value": "manual",
			"name": "SYSTEM_TOOLS.MANUAL"
		}];
		$scope.parseFormat = function(value, width) {
			var value = value.toString();
			while (value.length < width) value = "0" + value;
			return value;
		};

		$scope.get_time_format = function(){
			
			var start_month = getComboIndex(month, $scope.form.data.start_month.data)+1;
			var start_week = getComboIndex(week, $scope.form.data.start_week.data)+1;
			var start_weekday = getComboIndex(day, $scope.form.data.start_day.data)+1;
			var start_hour = getComboIndex(hour, $scope.form.data.start_hour.data)+1;



			var end_month = getComboIndex(month, $scope.form.data.end_month.data)+1;
			var end_week = getComboIndex(week, $scope.form.data.end_week.data)+1;
			var end_weekday = getComboIndex(day, $scope.form.data.end_day.data)+1;
			var end_hour = getComboIndex(hour, $scope.form.data.end_hour.data)+1;

			//start month 1st day is week @fWeek
			var sdObj = new Date(sysTimeYear, start_month, 1);
			var sfWeek = parseInt(sdObj.getDay());

			//end month 1st day is week @eWeek
			var edObj = new Date(sysTimeYear, end_month, 1);
			var efWeek = parseInt(edObj.getDay());

			var start_day = start_week * 7 - sfWeek + start_weekday + 1 + (start_weekday < sfWeek ? 7 : 0);
			var end_day = end_week * 7 - efWeek + end_weekday + 1 + (end_weekday < efWeek ? 7 : 0);


			startTimeHash = $scope.parseFormat(start_month, 2) + $scope.parseFormat(start_day, 2) + $scope.parseFormat(start_hour, 2);
			endTimeHash = $scope.parseFormat(end_month, 2) + $scope.parseFormat(end_day, 2) + $scope.parseFormat(end_hour, 2);
			// //console.log(startTimeHash, endTimeHash);

			if (startTimeHash < endTimeHash) {
				if (sysTimeHash < endTimeHash) {
					$scope.form.data.start_year.data = sysTimeYear.toString();
					$scope.form.data.end_year.data = sysTimeYear.toString();

				} else {
					$scope.form.data.start_year.data = (sysTimeYear + 1).toString();
					$scope.form.data.end_year.data = (sysTimeYear + 1).toString();
				}
			} else {
				if (sysTimeHash < endTimeHash) {
					$scope.form.data.start_year.data = (sysTimeYear - 1).toString();
					$scope.form.data.end_year.data = sysTimeYear.toString();
				} else {
					$scope.form.data.start_year.data = sysTimeYear.toString();
					$scope.form.data.end_year.data = (sysTimeYear + 1).toString();
				}
			}
		};

		var month = [{
			"value": "Jan",
			"name": "DATE.JAN"
		}, {
			"value": "Feb",
			"name": "DATE.FEB"
		}, {
			"value": "Mar",
			"name": "DATE.MAR"
		}, {
			"value": "Apr",
			"name": "DATE.APR"
		}, {
			"value": "May",
			"name": "DATE.MAY"
		}, {
			"value": "Jun",
			"name": "DATE.JUN"
		}, {
			"value": "Jul",
			"name": "DATE.JUL"
		}, {
			"value": "Aug",
			"name": "DATE.AUG"
		}, {
			"value": "Sep",
			"name": "DATE.SEP"
		}, {
			"value": "Oct",
			"name": "DATE.OCT"
		}, {
			"value": "Nov",
			"name": "DATE.NOV"
		}, {
			"value": "Dec",
			"name": "DATE.DEC"
		}
		];

		var week = [{
			"value": "1st",
			"name": "ORDER.1ST"
		}, {
			"value": "2nd",
			"name": "ORDER.2ND"
		}, {
			"value": "3rd",
			"name": "ORDER.3RD"
		}, {
			"value": "4th",
			"name": "ORDER.4TH"
		}, {
			"value": "5th",
			"name": "ORDER.5TH"
		}];

		var day = [{
			"value": "Mon",
			"name": "DATE.MON"
		}, {
			"value": "Tues",
			"name": "DATE.TUES"
		}, {
			"value": "Wed",
			"name": "DATE.WED"
		}, {
			"value": "Thur",
			"name": "DATE.THUR"
		}, {
			"value": "Fri",
			"name": "DATE.FRI"
		}, {
			"value": "Sat",
			"name": "DATE.SAT"
		}, {
			"value": "Sun",
			"name": "DATE.SUN"
		}];

		var hour = [{
			"value": "1am",
			"name": "HOUR.AM_1"
		}, {
			"value": "2am",
			"name": "HOUR.AM_2"
		}, {
			"value": "3am",
			"name": "HOUR.AM_3"
		}, {
			"value": "4am",
			"name": "HOUR.AM_4"
		}, {
			"value": "5am",
			"name": "HOUR.AM_5"
		}, {
			"value": "6am",
			"name": "HOUR.AM_6"
		}, {
			"value": "7am",
			"name": "HOUR.AM_7"
		}, {
			"value": "8am",
			"name": "HOUR.AM_8"
		}, {
			"value": "9am",
			"name": "HOUR.AM_9"
		}, {
			"value": "10am",
			"name": "HOUR.AM_10"
		}, {
			"value": "11am",
			"name": "HOUR.AM_11"
		}, {
			"value": "12am",
			"name": "HOUR.AM_12"
		}, {
			"value": "1pm",
			"name": "HOUR.PM_1"
		}, {
			"value": "2pm",
			"name": "HOUR.PM_2"
		}, {
			"value": "3pm",
			"name": "HOUR.PM_3"
		}, {
			"value": "4pm",
			"name": "HOUR.PM_4"
		}, {
			"value": "5pm",
			"name": "HOUR.PM_5"
		}, {
			"value": "6pm",
			"name": "HOUR.PM_6"
		}, {
			"value": "7pm",
			"name": "HOUR.PM_7"
		}, {
			"value": "8pm",
			"name": "HOUR.PM_8"
		}, {
			"value": "9pm",
			"name": "HOUR.PM_9"
		}, {
			"value": "10pm",
			"name": "HOUR.PM_10"
		}, {
			"value": "11pm",
			"name": "HOUR.PM_11"
		}, {
			"value": "12pm",
			"name": "HOUR.PM_12"
		}];

		var getComboIndex = function(options, value){
			for(var index = 0; index < options.length; index++){
				if(options[index].value == value){
					return index;
				}
			}
			return -1;
		};

		$scope.form.data.start_month.options = month;
		$scope.form.data.start_week.options = week;
		$scope.form.data.start_day.options = day;
		$scope.form.data.start_hour.options = hour;

		$scope.form.data.end_month.options = month;
		$scope.form.data.end_week.options = week;
		$scope.form.data.end_day.options = day;
		$scope.form.data.end_hour.options = hour;


		//$scope.form.data.start_month.changeHandler = get_time_format();
		$scope.form.data.start_month.changeHandler = $scope.get_time_format;
		$scope.form.data.start_week.changeHandler = $scope.get_time_format;
		$scope.form.data.start_day.changeHandler = $scope.get_time_format;
		$scope.form.data.start_hour.changeHandler = $scope.get_time_format;
		$scope.form.data.end_month.changeHandler = $scope.get_time_format;
		$scope.form.data.end_week.changeHandler = $scope.get_time_format;
		$scope.form.data.end_day.changeHandler = $scope.get_time_format;
		$scope.form.data.end_hour.changeHandler = $scope.get_time_format;


		$scope.form.data.dst_enable.changeHandler = function(newValue){
			if(newValue=="on"){
				$scope.form.data.start_year.disabled = false;
				$scope.form.data.end_year.disabled = false;
				$scope.form.data.start_day.disabled = false;
				$scope.form.data.start_month.disabled = false;
				$scope.form.data.start_week.disabled = false;
				$scope.form.data.start_hour.disabled = false;
				$scope.form.data.end_day.disabled = false;
				$scope.form.data.end_month.disabled = false;
				$scope.form.data.end_hour.disabled = false;
				$scope.form.data.end_week.disabled = false;
			} else {
				$scope.form.data.start_year.disabled = true;
				$scope.form.data.end_year.disabled = true;
				$scope.form.data.start_day.disabled = true;
				$scope.form.data.start_month.disabled = true;
				$scope.form.data.start_week.disabled = true;
				$scope.form.data.start_hour.disabled = true;
				$scope.form.data.end_day.disabled = true;
				$scope.form.data.end_month.disabled = true;
				$scope.form.data.end_week.disabled = true;
				$scope.form.data.end_hour.disabled = true;
			}
		};
		$scope.form.data.timezone.changeHandler = function(newValue, oldValue){
			
			if(oldValue.length != 0) {

				var old_hour = $scope.form.data.time.getHour();
				var old_min = $scope.form.data.time.getMin();

				var old_total_min = parseInt(old_hour*60,10)+parseInt(old_min,10);
				// //console.log(old_total_min,newValue,oldValue);
				var new_total_min = old_total_min + parseInt(newValue,10) - parseInt(oldValue,10);

				var min_new = new_total_min%60;
				// //console.log(min_new);

				var hour_temp = parseInt(new_total_min/60, 10);
				var hour_new = hour_temp > 24 ? hour_temp - 24 : hour_temp;
				if((hour_new == 24) && (min_new > 0))
				{
					hour_new = 0;
				}

				if(hour_new < 0)
				{
					if(hour_new == 0) 
					{
						hour_new = 23;
					}
					else
					{
						hour_new += 24;
					}
				}

				if(min_new < 0)
				{
					min_new += 60;
				}

				
				// //console.log(min_new);
				if(min_new < 10)
				{
					min_new = "0" + min_new;
				}

				if(hour_new < 10)
				{
					hour_new = "0" + hour_new;
				}
				
				var new_time_str  = hour_new.toString() +":"+ min_new.toString() +":"+ $scope.form.data.time.getSec();
				$scope.form.data.time.data = new_time_str;
				// //console.log(new_time_str);
			}
		}

		function dataFormat(data){
			var date_arr = data.date.split("/");
			sysTimeHash = $scope.parseFormat(date_arr[0], 2) + $scope.parseFormat(date_arr[1], 2) +  $scope.parseFormat(data.time.split(":")[0], 2);
			
			sysTimeYear = parseInt(date_arr[2], 10);

			$scope.get_time_format();

			var str = data.date + " " + data.time;
			$scope.form.data.current_time.data = str;

			// $scope.dst_status = {};

			if (data.dst_status === "") {
				$scope.form.data.dst_status.data = "";
			}
			if (data.dst_status === "down") {
				$scope.form.data.dst_status.data = "SYSTEM_TOOLS.DOWN";
			}
			if (data.dst_status === "up") {
				$scope.form.data.dst_status.data = "SYSTEM_TOOLS.UP";
			}
		}

		$proxy.request({
			url: $url.format("/admin/time?form=timezone")
		}, {
			operation: "read"
		}, function(data, others) {
			for (var index = 0, len = data.length; index < len; index++) {
				data[index]["name"] = $const.TIME_ZONE[data[index]["name"].toUpperCase()];
			};
			$scope.form.data.timezone.options = data;
			$form.load($scope, {}, function(data) {
				dataFormat(data);
			});
			
		});

		$scope.getGmtBtn = {
			visible: true,
			disable: false
		}

		
		var dyndnsWaiting = $msg.create({
			type: "waiting",
			text: "SYSTEM_TOOLS.GETGMT_WAIT"
		})
		var dyndnsSuccess = $msg.create({
			type: "success",
			text: "SYSTEM_TOOLS.GETGMT_SUCCESS"
		})

		var dyndnsFailure = $msg.create({
			type: "failure",
			text: "SYSTEM_TOOLS.GETGMT_TIMEOUT"
		})

		function refreshTime(data){
			$scope.form.data.type.data = data.type;
			$scope.form.data.ntp_svr1.data = data.ntp_svr1;
			$scope.form.data.ntp_svr2.data = data.ntp_svr2;
			$scope.form.data.timezone.data = data.timezone;
		}

		function refreshState() {
			clearInterval(t_getgmt);
			t_getgmt = 0;
			if (t_getgmt == 0) {

				
				t_getgmt = setInterval(function() {
					$proxy.request({
						url: $url.format("/admin/time?form=settings"),
						showLoading:false
					}, {
						operation: "refresh"
					}, function(data) {
						var data = data || {};

						if (typeof data.status != "undefined") {
							if (data.status == 747301) {
								dyndnsWaiting.close();
								dyndnsSuccess.show();
								//load Data
								//$form.loadData($scope,data);
								refreshTime(data);
								dataFormat(data);
								clearInterval(t_getgmt);
								t_getgmt = 0;
							}
							if (data.status == 747302) {
								dyndnsWaiting.close();
								dyndnsFailure.show();
								clearInterval(t_getgmt);
								t_getgmt = 0;
							}
							if (data.status == 747303) {
								
							}
							$scope.getGmtBtn.disabled = false;
						}
					}, function() {
						dyndnsWaiting.close();
						dyndnsFailure.show();
						$scope.getGmtBtn.disabled = false;
					}, function() {
						dyndnsWaiting.close();
						dyndnsFailure.show();
						$scope.getGmtBtn.disabled = false;
					});
				}, 2 * 1000);
			}
		}

		$scope.obtain = function() {
			dyndnsWaiting.show();
			$proxy.request({
				url: $url.format("/admin/time?form=settings"),
				showLoading:false
			}, {
				operation: "gmt",
				current_time: $scope.form.data.current_time.data,
				type: $scope.form.data.type.data,
				timezone: $scope.form.data.timezone.data,
				ntp_svr1: $scope.form.data.ntp_svr1.data,
				ntp_svr2: $scope.form.data.ntp_svr2.data,
				status: $scope.form.data.status.data
			}, function() {
				$scope.getGmtBtn.disabled = true;
				refreshState();
			}, function(){
				dyndnsWaiting.close();
				
				dyndnsFailure.show()
			})
		};

		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		$scope.submit = function() {
			var serial = []
			if($scope.form.data.type.data=="manual"){
				serial.push("timezone","ntp_svr2","ntp_svr1")
			}else{
				serial.push("date","time")
			}
			$scope.form.serialize(serial)
			$scope.form.submit({}, function(data){
				dataFormat(data);
			});
		}
		$scope.back = function(){
			$scope.form.back(function(){
				$scope.$parent.form.menuItem = "";
			});
			//$scope.$parent.form.menuItem = "";
		}
	}
]);
/*
 * administration
 */
su.controllerProvider.register("administration", ["$scope", "$form", "$proxy", "$msg", "$url", "$encrypt",
	function($scope, $form, $proxy, $msg, $url, $encrypt) {
		$scope.menuItem = "";
		$scope.back = function(){
			$scope.$parent.form.menuItem = "";
		}
		/*var options = {
			proxy: {
				url: $url.format("/admin/administration?form=account&form=recovery")
			},
			fields: [{
				name: "old_acc",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}, {
				name: "old_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}, {
				name: "new_acc",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}, {
				name: "new_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}, {
				name: "cfm_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}, {
				name: "enable_rec"
			}, {
				name: "from",
				vtype: {
					vtype: "email"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "to",
				vtype: {
					vtype: "email"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "smtp",
				vtype: {
					vtype: "string_ip_domain"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "enable_auth"
			}, {
				name: "username",
				vtype: {
					vtype: "email"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "password",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 15,
				allowBlank: false
			}],
			autoLoad: true,
			validator: function() {
				if ($scope.form.data.enable_rec.data == "on" && $scope.form.data.enable_auth.data == "on") {
					if ($scope.form.data.from.data != $scope.form.data.username.data) {
						$scope.form.data.username.setError("ERROR.e000049");
						return false;
					}
				}
				if ($scope.form.data.cfm_pwd.inputData != $scope.form.data.new_pwd.inputData) {
					$scope.form.data.cfm_pwd.setError("ERROR.e000048")
					return false;
				}
				return true;
			}
		};
		$form.config($scope, options);

		$scope.form.data.enable_rec.data = "off";


		$scope.form.data.enable_auth.data = "on";

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
		$scope.form.data.old_pwd.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};
		$scope.form.data.password.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};


		$scope.testMailBtn = {
			disabled: false,
			visible: true,
		}
		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		}
		var testMailMsg = $msg.create({
			id: "test-mail-msg",
			autoClose: true,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: true,
				text: "FORM.CANCEL",
				handler: function() {}
			},
			//content: "SYSTEM_TOOLS.RESET_ALERT",
		});


		var passwordCheck = function(new_pwd, cfm_pwd) {
			if (cfm_pwd == new_pwd) {
				$scope.form.data.cfm_pwd.setNormal();
			} else {
				$scope.form.data.cfm_pwd.setError("ERROR.e000048")
			};
		};

		

		$scope.$watch("form.data.new_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (newValue&&newValue!="") {
				passwordCheck(new_pwd, cfm_pwd)
			}
		});
		$scope.$watch("form.data.cfm_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (newValue&&newValue!="") {
				passwordCheck(new_pwd, cfm_pwd)
			}
		});
		$scope.testMail = function() {
			$scope.testMailBtn.disabled = true;
			$proxy.request({
				url: $url.format("/admin/administration?form=testmail")
			}, {}, function(data, others) {
				$scope.testMailBtn.disabled = false;
				if (data.success) {
					$msg.create({
						type:"success",
						text:"SYSTEM_TOOLS.s000095"
					}).show()
					//testMailMsg.content = "SYSTEM_TOOLS.s000095";
					//testMailMsg.show()
				} else {
					$msg.create({
						type:"failure",
						text:"SYSTEM_TOOLS.s000096"
					}).show()
					//testMailMsg.content = "SYSTEM_TOOLS.s000096";
					//testMailMsg.show()
				}
			}, function() {
				$msg.create({
					type:"failure",
					text:"SYSTEM_TOOLS.s000096"
				}).show()
				$scope.testMailBtn.disabled = false;
			}, function() {
				$msg.create({
					type:"failure",
					text:"SYSTEM_TOOLS.s000096"
				}).show()
				$scope.testMailBtn.disabled = false;
			});

		}

		$scope.submit = function() {
			var serial = [];
			if($scope.form.data.enable_rec.data!="on"){
				serial.push("from","to","smtp","enable_auth","username","password")
			}else{
				if($scope.form.data.enable_auth.data!="on"){
					serial.push("username","password")
				}
			}
			$scope.form.serialize(serial);
			$scope.form.submit();
		}*/
	}
]);
/*
 * administration
 */
su.controllerProvider.register("account", ["$scope", "$form", "$proxy", "$msg", "$url", "$encrypt",
	function($scope, $form, $proxy, $msg, $url, $encrypt) {
		$scope.menuItem = ""
		var options = {
			proxy: {
				url: $url.format("/admin/administration?form=account")
			},
			fields: [{
				name: "old_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "new_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "cfm_pwd",
				vtype: {
					vtype: "ascii_visible"
				},
				minLength: 1,
				maxLength: 32,
				allowBlank: false
			}],
			autoLoad: true,
			validator: function() {
				if ($scope.form.data.cfm_pwd.inputData != $scope.form.data.new_pwd.inputData) {
					$scope.form.data.cfm_pwd.setError("ERROR.e000048")
					return false;
				}
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
		$scope.form.data.old_pwd.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};



		
		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);
		/*var testMailMsg = $msg.create({
			id: "test-mail-msg",
			autoClose: true,
			okBtn: {
				show: true,
				text: "FORM.OK",
				handler: function() {}
			},
			cancelBtn: {
				show: true,
				text: "FORM.CANCEL",
				handler: function() {}
			},
			//content: "SYSTEM_TOOLS.RESET_ALERT",
		})*/


		var passwordCheck = function(new_pwd, cfm_pwd) {
			if (cfm_pwd == new_pwd) {
				$scope.form.data.cfm_pwd.setNormal();
			} else {
				$scope.form.data.cfm_pwd.setError("ERROR.e000048")
			};
		};

		

		$scope.$watch("form.data.new_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (newValue&&newValue!="") {
				if(cfm_pwd !== '')
					passwordCheck(new_pwd, cfm_pwd);
			}
		});
		$scope.$watch("form.data.cfm_pwd.inputData", function(newValue, oldValue) {
			var cfm_pwd = $scope.form.data.cfm_pwd.inputData;
			var new_pwd = $scope.form.data.new_pwd.inputData;
			if (newValue&&newValue!="") {
				passwordCheck(new_pwd, cfm_pwd);
			}
		});
		
		$scope.submit = function() {

			$scope.form.submit({
				operation: "write"
			}, function() {
				$scope.form.setSnapshot($scope.form.data);
			}, function() {

			}, function() {

			}, true, false, true);
		}
		$scope.back = function(){
			$scope.form.back(function(){
				$scope.$parent.$parent.menuItem = "";
			});
			//$scope.$parent.$parent.menuItem = "";
		}
	}
]);
/*
 * pwd recovery
 */
 /*
su.controllerProvider.register("recovery", ["$scope", "$form", "$proxy", "$msg", "$url", "$encrypt",
	function($scope, $form, $proxy, $msg, $url, $encrypt) {
		var options = {
			proxy: {
				url: $url.format("/admin/administration?form=recovery")
			},
			fields: [{
				name: "enable_rec"
			}, {
				name: "from",
				vtype: {
					vtype: "email"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "to",
				vtype: {
					vtype: "email"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "smtp",
				vtype: {
					vtype: "ip_domain"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "enable_auth"
			}, {
				name: "username",
				vtype: {
					vtype: "string_visible"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}, {
				name: "password",
				vtype: {
					vtype: "string_visible"
				},
				minLength: 2,
				maxLength: 32,
				allowBlank: false
			}],
			autoLoad: true,
			validator: function() {
				if ($scope.form.data.enable_rec.data == "on" && $scope.form.data.enable_auth.data == "on") {
					if ($scope.form.data.from.data != $scope.form.data.username.data) {
						$scope.form.data.username.setError("ERROR.e000049");
						return false;
					}
				}
				return true;
			}
		};
		$form.config($scope, options);

		$scope.form.data.enable_rec.data = "off";


		$scope.form.data.enable_auth.data = "on";

		$scope.form.data.password.encryption = {
			name: "rsa",
			method: $encrypt.rsa,
			params: ["n", "e"]
		};

		$scope.testMailBtn = {
			disabled: false,
			visible: true
		}
		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		var waitingMsg = $msg.create({
			type:"waiting",
			text:"FORM.LOADING"
		})

		$scope.testMail = function() {
			$scope.testMailBtn.disabled = true;
			waitingMsg.show()
			$proxy.request({
				url: $url.format("/admin/administration?form=testmail"),
				showLoading:false
			}, {}, function(data, others, status) {
				$scope.testMailBtn.disabled = false;
				waitingMsg.close();
				if (status === 200) {
					$msg.create({
						type:"success",
						text:"FORM.SUCCESS"
					}).show()
					//testMailMsg.content = "SYSTEM_TOOLS.s000095";
					//testMailMsg.show()
				} else {
					$msg.create({
						type:"failure",
						text:"FORM.FAILURE"
					}).show()
					//testMailMsg.content = "SYSTEM_TOOLS.s000096";
					//testMailMsg.show()
				}
			}, function() {
				waitingMsg.close();
				$msg.create({
					type:"failure",
					text:"FORM.FAILURE"
				}).show()
				$scope.testMailBtn.disabled = false;
			}, function() {
				waitingMsg.close();
				$msg.create({
					type:"failure",
					text:"FORM.FAILURE"
				}).show()
				$scope.testMailBtn.disabled = false;
			},false);

		}

		$scope.submit = function() {
			var serial = [];
			if($scope.form.data.enable_rec.data!="on"){
				serial.push("from","to","smtp","username","password");
			}else{
				if($scope.form.data.enable_auth.data!="on"){
					serial.push("username","password");
				}
			}
			$scope.form.serialize(serial);
			$scope.form.submit();
		}
		$scope.back = function(){
			$scope.form.back(function(){
				$scope.$parent.$parent.menuItem = "";
			});
			//$scope.$parent.$parent.menuItem = "";
		}
	}
]);
*/
/*
 * language
 */
su.controllerProvider.register("language", ["$route", "$scope", "$form", "$proxy", "$translate", "$msg", "$url",
	function($route, $scope, $form, $proxy, $translate, $msg, $url) {
		var options = {
			proxy: {
				url: "/cgi-bin/luci/;stok=/locale?form=mobile_lan"
			},
			fields: [{
				name: "locale",
				allowBlank: false
			}],
			autoLoad: true
		};

		$form.config($scope, options);

		$scope.form.data.locale.options = [{
			"value": "en_US",
			"name": "SYSTEM_TOOLS.EN_US"
		}];//待修改

		$scope.form.submitBtn = {
			disabled: false,
			visible: true
		};
		$scope.form.dirtyShowSave($scope.form.submitBtn);

		$scope.submit = function() {
			$scope.form.submit({}, function(data, others){
				if(data){
					$translate.use(data.locale);
					$route.reload();
				}
			})
		}
		$scope.back = function(){
			$scope.form.back(function(){
				$scope.$parent.form.menuItem = "";
			});
			//$scope.$parent.form.menuItem = "";
		}

		// $scope.$watch("form.data.locale.data", function(newValue, oldValue) {
		// 	if (newValue != oldValue) {
		// 		$translate.use(newValue);
		// 	}
		// })
	}
]);
