myapp.controller('advHomePageController', function ($scope, $route, $http, $location, modifyService, $interval, $translate, httpService,$sanitize) {
	$("#ajaxLoaderSection").show();
	pageloadiconstatus = true;
	// Set the default value of inputType
	$scope.inputType = 'password';
    httpService.getRulesJson();
	// Hide & show password function
	$scope.hideShowPassword = function () {
		if ($scope.inputType == 'password')
			$scope.inputType = 'text';
		else
			$scope.inputType = 'password';
	};
	/* Translation starts here */
	var activeLanguage = $translate.use();
	if (activeLanguage != undefined)
		activeLanguage = $translate.use().split('/');
	else
		activeLanguage = 'en'.split('/');
	if (activeLanguage.length > 1)
		activeLanguage = activeLanguage[1];
	else
		activeLanguage = activeLanguage[0];
	if ($("#dataView").find("div#translation").html() != '')
		$translate.use("languages/" + activeLanguage + "/" + $("#dataView").find("div#translation").html());
	else
		$translate.use(activeLanguage);
	/* Translation ends here */
	/*    var randomArray = ['#ff0000', '#9a00c3', '#173945', '#cc5200', '#61a598', '#6a78ab', '#36465d', '#00b8ff', '#912d3f', '#ada3e0', '#281090', '#5a8487', '#f4760d', '#504d76', '#8b7d7b'];*/
	var randomArray = ['#7e57c2', '#3f51b5', '#00acc1', '#7CBD65', '#646768', '#fc5757', '#ff9300', '#ab7942'];
	$scope.colors1 = randomArray[Math.floor(Math.random() * randomArray.length)];

	$scope._activeTab = 1;
	$scope.clickstatus = "div1";
	var changedFields = [];
	$scope.showDetails = false;
    
    function setWifiSecurityBasedOnRadioBandSelected(radioBandType){
        if(radioBandType === "WiFi2.4")
                $scope._activeTab = 1;
        if(radioBandType === "WiFi5")
                $scope._activeTab = 2;
        if(radioBandType === "" || radioBandType === undefined)
                $scope._activeTab = 1;
    }
    
	$scope.toggleDetails = function (event, radioBandType) {
		$scope.clickstatus = "div" + event.currentTarget.attributes['data-target'].value;
        if($scope.clickstatus === "div2"){
            setWifiSecurityBasedOnRadioBandSelected(radioBandType);
        }
		console.log($scope.clickstatus)
	};
    
    
    
	$scope['modeenabled'] = [
		{
			"id": "1",
			"name": 'WPA2-Personal'
		},
		{
			"id": "2",
			"name": 'WPA-Personal'
		},
		{
			"id": "3",
			"name": 'WPA-WPA2-Personal'
		},
		{
			"id": "4",
			"name": 'WPA2-Enterprise'
		},
		{
			"id": "5",
			"name": 'WEP-64'
		},
		{
			"id": "6",
			"name": 'WEP-128'
		},
		{
			"id": "7",
			"name": 'None'
		},
		{
			"id": "8",
			"name": 'WPA-Enterprise'
		},
		{
			"id": "9",
			"name": 'WPA-WPA2-Enterprise'
		}
    ];
	getFormData = function (reqParams, request) {
		$http.get(URL + reqParams).
		success(function (data, status, headers, config) {
			if (status === 200) {
				objects = data.Objects;
				var objectParamValues = objects[0].Param;
				for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
					var param_name = objectParamValues[pa1].ParamName;
					var ParamValue = objectParamValues[pa1].ParamValue;
					if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
						$scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};
					$scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;

					if (param_name === "SupportedFrequencyBands") {
						$scope.SupportedFrequencyBands = ParamValue;
						console.log("$scope.SupportedFrequencyBands ==" + $scope.SupportedFrequencyBands);
					}
                    if (param_name === "MACAddress") {
                        $scope.MacAddress = ParamValue;

                    }
					if (param_name === "RadioNumberOfEntries") {
						$scope.RadioNumberOfEntries = ParamValue;
						if ($scope.RadioNumberOfEntries === '1') {
							$scope.wifi5status = '';
							getFormData("cgi_get_nosubobj?Object=Device.WiFi.Radio&SupportedFrequencyBands=", "frequencyband");
						} else {
							$scope.wifi5status = 'col2';
						}
					}
				}
				$scope["SSIDchange"] = false;
				$scope["DefaultActionchange"] = false;
                $scope[request + "popup"] = false;
			} else if (status === 203) {
				$scope[request + "popup"] = true;
				$scope[request + "popupval"] = data.Objects[0].Param[0].ParamValue;
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope[request + "popup"] = true;
					$scope[request + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					angular.forEach(data.Objects, function (object) {
						var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
						angular.forEach(object.Param, function (param) {
							$scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
							$scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
						});
					});
				}
			}

		}).
		error(function (data, status, headers, config) {});
	};
	getTableData = function (reqParams) {
		$scope.tableArray = [];
		$http.get(URL + reqParams).
		success(function (data, status, headers, config) {
			if (status === 200) {
				var params = ["Chaddr", "MinAddress"];
				objects = data.Objects;
				$scope.numberCount = objects.length;
				for (var obj = 0; obj < objects.length; obj++) {
					var tempObject = {};
					var objectParamValues = objects[obj].Param;
					for (var i = 0; i < objectParamValues.length; i++) {
						var param_name = objectParamValues[i].ParamName;
						var param_value = objectParamValues[i].ParamValue;
						if (params.indexOf(param_name) > -1)
							tempObject[param_name] = param_value;
					}
					$scope.tableArray.push(tempObject);
				}
				console.log($scope.tableArray);
                $scope["tablename" + "popup"] = false;
			} else if (status === 203) {
				$scope["tablename" + "popup"] = true;
				$scope["tablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope["tablename" + "popup"] = true;
					$scope["tablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					var popupvalue = '';
					angular.forEach(data.Objects, function (object) {
						$scope["tablename" + "popup"] = true;
						angular.forEach(object.Param, function (param) {
							popupvalue += param.ParamName + ":" + param.ParamValue;
						});
					});
					$scope["tablename" + "popupval"] = popupvalue;
				}
			}
		}).
		error(function (data, status, headers, config) {});
	};
		$scope.noofclients = 0;

	getNumberOfClients = function (reqParams) {
		$scope.tablevalues = [];
		var reqdataarray = [];
		$scope.tableDataArray = [];
		var post = 'cgi_get?';
		var reqdata = reqParams.split('&');
		angular.forEach(reqdata, function (reqobject) {
			var req = reqobject.split('?');
			var indobj = req[0];
			reqdataarray.push(indobj);
			var indobjparams = req[1].split(',');
			angular.forEach(indobjparams, function (param) {
				if ($scope[indobj + "params"] === undefined)
					$scope[indobj + "params"] = [];
				$scope[indobj + "params"].push(param);
			});
		});
		console.log("reqdataarray", reqdataarray);
		var reqdataunique = modifyService.split(angular.copy(reqdataarray));
		angular.forEach(reqdataunique, function (parameter) {
			post += "Object=" + parameter.split(".*")[0] + ",";
		});
		post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
		console.log(post);

		$http.get(URL + post).
		success(function (data, status, headers, config) {
			if (status === 200) {
				objects = data.Objects;
				for (var obj = 0; obj < objects.length; obj++) {
					var objobjname = objects[obj].ObjName;
					var objectindex = reqdataarray.indexOf(modifyService.dotstarremove(objobjname, '.*'));
					console.log("objectindex", objectindex, objobjname);
					if (objectindex > -1) {

						if (objectindex == 0) {
							var objectParamValues = objects[obj].Param;
							for (var i = 0; i < objectParamValues.length; i++) {
								var param_name = objectParamValues[i].ParamName;
								var param_value = objectParamValues[i].ParamValue;
								if (param_name === "HostNumberOfEntries") {
									if ($scope[reqdataarray[objectindex] + "data"] == undefined)
										$scope[reqdataarray[objectindex] + "data"] = [];
									if (param_value != " ")
										$scope.noofclients = parseInt(param_value);
									$scope[reqdataarray[objectindex] + "data"].push(parseInt(param_value));
								}
							}
						}
						if (objectindex == 1) {
							var tempObj = {};
							var objectParamValues = objects[obj].Param;
							for (var i = 0; i < objectParamValues.length; i++) {
								var param_name = objectParamValues[i].ParamName;
								var param_value = objectParamValues[i].ParamValue;
								
								if (param_name === "IPv4AddressNumberOfEntries") {
									var length = $scope[reqdataarray[0] + "data"].length;
									if ($scope[reqdataarray[objectindex] + "data"] == undefined) {
										$scope[reqdataarray[objectindex] + "data"] = [];
									}
									if ($scope[reqdataarray[objectindex] + "data"][length - 1] == undefined)
										$scope[reqdataarray[objectindex] + "data"][length - 1] = [];
									$scope[reqdataarray[objectindex] + "data"][length - 1].push(parseInt(param_value));
								} else if (param_name === "PhysAddress") {
									tempObj[param_name] = param_value;
								} else if (param_name === "HostName") {
									tempObj[param_name] = param_value;
								} else if (param_name === "IPAddress") {
									tempObj[param_name] = param_value;
								}
							}
							if ($scope[reqdataarray[objectindex] + "tbdata"] == undefined)
								$scope[reqdataarray[objectindex] + "tbdata"] = [];
							$scope[reqdataarray[objectindex] + "tbdata"].push(tempObj);
						}
					}

				}
				var noofclients = $scope.noofclients;
				for (var pool = 0; pool < noofclients; pool++) {
					var tempobj = {};
					tempobj["IPAddress"] = $scope[reqdataarray[1] + "tbdata"][pool]["IPAddress"];
					tempobj["HostName"] = $scope[reqdataarray[1] + "tbdata"][pool]["HostName"];
					tempobj["PhysAddress"] = $scope[reqdataarray[1] + "tbdata"][pool]["PhysAddress"];
					$scope.tablevalues.push(tempobj);
				}
				console.log($scope.tablevalues);
                $scope["numberofclients" + "popup"] = false;
			} else if (status === 203) {
				$scope["numberofclients" + "popup"] = true;
				$scope["numberofclients" + "popupval"] = data.Objects[0].Param[0].ParamValue;
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope["numberofclients" + "popup"] = true;
					$scope["numberofclients" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					var popupvalue = '';
					angular.forEach(data.Objects, function (object) {
						$scope["numberofclients" + "popup"] = true;
						angular.forEach(object.Param, function (param) {
							popupvalue += param.ParamName + ":" + param.ParamValue;
						});
					});
					$scope["numberofclients" + "popupval"] = popupvalue;
				}
			}
		}).
		error(function (data, status, headers, config) {});
	};
	getFirstQueryData = function (reqParams) {
		$http.get(URL + reqParams).
		success(function (data, status, headers, config) {
			if (status === 200) {
				var formObjects = ["Device.IP.Interface.*.IPv4Address.*", "Device.IP.Interface.*"]
				objects = data.Objects;
				for (var i = 0; i < objects.length; i++) {
					var objectname = objects[i].ObjName;
					if (formObjects.indexOf(modifyService.dotstarremove(objectname, '.*')) > -1) {
						//                            console.log(objects[i].ObjName)
						var objectParamValues = objects[i].Param;
						for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
							var param_name = objectParamValues[pa1].ParamName;
							var ParamValue = objectParamValues[pa1].ParamValue;
                            if(param_name=="LowerLayers"){
                                $scope.lowerlayers=ParamValue.slice(0, -1);
                            }
							if ($scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] === undefined)
								$scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] = {};
							$scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
						}
					}
				}
				firstObject = objects[0];
				var firstObjectName = firstObject.ObjName;
				var object = modifyService.dotstarremove(firstObjectName, '');
                $scope["getfirstsubquery" + "popup"] = false;
				getThirdQueryData("cgi_get_filterbyfirstparamval?Object=Device.DNS.Client.Server&Interface=", firstObjectName);

				getSecondQueryData("cgi_get?Object=Device.Routing.Router.1.IPv4Forwarding&Interface=", firstObjectName);
			} else if (status === 203) {
                  $http.get(URL + '/cgi_get_fillparams?Object=Device.X_INTEL_COM_BEEROCKS&Gateway=').success(function (responseData, status, headers, config) {
                                      var responseData = responseData;
                                      if (responseData != null && responseData !== undefined && responseData.Objects !== undefined) {
                                          if (responseData.Objects[0] !== undefined && responseData.Objects[0].Param !== undefined && responseData.Objects[0].Param[0] !== undefined) {
                                              if (responseData.Objects[0].Param[0].ParamValue === "false") {

                                              } else {
                                                  if (data.Objects[0].Param[0].ParamValue.indexOf("No content in recived msg") == -1) {
                                                       $scope["getfirstsubquery" + "popup"] = true;
                                                       $scope["getfirstsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                }
                    }
                    } else {
                            if (data.Objects[0].Param[0].ParamValue.indexOf("No content in recived msg") = -1) {
                                $scope["getfirstsubquery" + "popup"] = true;
                                $scope["getfirstsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                            }
                    }
                    } else {
                        $scope["getfirstsubquery" + "popup"] = true;
                        $scope["getfirstsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }

                }).
                error(function (data, status, headers, config) {
                    $scope["getfirstsubquery" + "popup"] = true;
                    $scope["getfirstsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                });
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope["getfirstsubquery" + "popup"] = true;
					$scope["getfirstsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					var popupvalue = '';
					angular.forEach(data.Objects, function (object) {
						$scope["getfirstsubquery" + "popup"] = true;
						angular.forEach(object.Param, function (param) {
							popupvalue += param.ParamName + ":" + param.ParamValue;
						});
					});
					$scope["getfirstsubquery" + "popupval"] = popupvalue;
				}
			}
		}).
		error(function (data, status, headers, config) {});
	};
	getSecondQueryData = function (reqParams, firstObjectName) {
		$http.get(URL + reqParams + firstObjectName).
		success(function (data, status, headers, config) {
			if (status === 200) {
				var formObjects = ["Device.Routing.Router.*.IPv4Forwarding.*"]
				objects = data.Objects;
				for (var i = 0; i < objects.length; i++) {
					var objectname = objects[i].ObjName;
					var objectParamValues = objects[i].Param;
					for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
						var param_name = objectParamValues[pa1].ParamName;
						var ParamValue = objectParamValues[pa1].ParamValue;
						if ($scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] === undefined)
							$scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] = {};
						$scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
					}
				}
                $scope["getsecondsubquery" + "popup"] = false;
			} else if (status === 203) {
				$scope["getsecondsubquery" + "popup"] = true;
				$scope["getsecondsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope["getsecondsubquery" + "popup"] = true;
					$scope["getsecondsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					var popupvalue = '';
					angular.forEach(data.Objects, function (object) {
						$scope["getsecondsubquery" + "popup"] = true;
						angular.forEach(object.Param, function (param) {
							popupvalue += param.ParamName + ":" + param.ParamValue;
						});
					});
					$scope["getsecondsubquery" + "popupval"] = popupvalue;
				}
			}
		}).
		error(function (data, status, headers, config) {});
	};
	getThirdQueryData = function (reqParams, firstObjectName) {
		//        console.log(reqParams + firstObjectName);
		$http.get(URL + reqParams + firstObjectName + "." + "&DNSServer=&Status=").
		success(function (data, status, headers, config) {
			if (status === 200) {
				objects = data.Objects;
                if(objects !== undefined){
				   for (var i = 0; i < objects.length; i++) {
					if (i === 0) {
						angular.forEach(objects[i].Param, function (obj) {
							if (obj.ParamName === "Status") {
								$scope.primarystatus = obj.ParamValue;
							}

							if (obj.ParamName === "DNSServer") {
								$scope.primarydns = obj.ParamValue;
							}
						});
					}
					if (i === 1) {
						angular.forEach(objects[i].Param, function (obj) {
							if (obj.ParamName === "Status") {
								$scope.secondarystatus = obj.ParamValue;
							}

							if (obj.ParamName === "DNSServer") {
								$scope.secondarydns = obj.ParamValue;
							}
						});
					}
				}
                }
                $scope["getthirdsubquery" + "popup"] = false;
			} else if (status === 203) {
				$scope["getthirdsubquery" + "popup"] = true;
				$scope["getthirdsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
			} else if (status === 206) {
				if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
					$scope["getthirdsubquery" + "popup"] = true;
					$scope["getthirdsubquery" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				} else {
					var popupvalue = '';
					angular.forEach(data.Objects, function (object) {
						$scope["getthirdsubquery" + "popup"] = true;
						angular.forEach(object.Param, function (param) {
							popupvalue += param.ParamName + ":" + param.ParamValue;
						});
					});
					$scope["getthirdsubquery" + "popupval"] = popupvalue;
				}
			}
		}).
		error(function (data, status, headers, config) {});
	};
	getFormData("cgi_get_nosubobj?Object=Device.WiFi&RadioNumberOfEntries=", "numberofentries");
	getFormData("cgi_get?Object=Device.WiFi.SSID.1", "DeviceWiFiSSID1");
	getFormData("cgi_get?Object=Device.WiFi.SSID.2", "DeviceWiFiSSID2");
	getFormData("cgi_get?Object=Device.IP.Interface.1.IPv4Address.1", "DeviceIPInterface1IPv4Address1");
	getFormData("cgi_get?Object=Device.WiFi.AccessPoint.1.Security", "DeviceWiFiAccessPoint1Security");
	getFormData("cgi_get?Object=Device.WiFi.AccessPoint.2.Security", "DeviceWiFiAccessPoint2Security");
	getFormData("cgi_get_nosubobj?Object=Device.X_INTEL_COM_BEEROCKS&Enable=", "DeviceX_INTEL_COM_BEEROCKS");																										 
    getFormData("cgi_get_nosubobj?Object=Device.X_INTEL_COM_BEEROCKS&Enable=", "DeviceX_INTEL_COM_BEEROCKS");
    var promisemac = $interval(function() {
        $scope.macaddressurl="cgi_get?Object="+$scope.lowerlayers;

        getFormData($scope.macaddressurl,$scope.lowerlayers);
         if($scope.lowerlayers){
            $interval.cancel(promisemac);
         }
    }, 1000);



	//    getTableData("cgi_get?Object=Device.DHCPv4.Server.Pool.1");
	//getNumberOfClients("Device.Hosts.?HostNumberOfEntries&Device.Hosts.Host.*?PhysAddress,IPv4AddressNumberOfEntries,HostName,IPv4Address");
	var promise2=$interval(function(){
		getNumberOfClients("Device.Hosts.?HostNumberOfEntries&Device.Hosts.Host.*?PhysAddress,IPv4AddressNumberOfEntries,HostName,IPv4Address")

		},2500);
	getFirstQueryData("cgi_get?Object=Device.IP.Interface&X_LANTIQ_COM_DefaultGateway=true");
	var refreshData = function () {
		getFirstQueryData("cgi_get?Object=Device.IP.Interface&X_LANTIQ_COM_DefaultGateway=true");
	};
	var promise = $interval(refreshData, 6000);
	// Cancel interval on page changes
	$scope.$on('$destroy', function () {
		if (angular.isDefined(promise)) {
			$interval.cancel(promise);
			$interval.cancel(promise2);
			promise = undefined;
		}
	});
	$scope.textChange = function (value) {
		changedFields.push(value);
	};
	$scope["advformstatus"] = false;
	$scope.wifi2Apply = function (object, event) {
		$scope["advformstatus"] = true;
		if (event.currentTarget.attributes['formstatus'].value == "true") {
			$('#ajaxLoaderSection').show();
			urlstatus = false;
			var post = '';
			var url = URL + "cgi_set?"
			var formobjects = object.split('?');
			angular.forEach(formobjects, function (object) {
				var objectlevelurlstatus = false;
				var postobject = "Object=" + object + "&Operation=Modify"
				angular.forEach($scope[object.replace(/\./g, "")], function (value, key) {
					if (changedFields.indexOf(object.replace(/\./g, "") + key) > -1) {
						objectlevelurlstatus = true;
						urlstatus = true;
						postobject += "&" + key + "=" + $sanitize(encodeURIComponent(value)).replace(/<[^>]+>/gm, '');
					}
				});
				if (objectlevelurlstatus)
					post += postobject + ",";
			});
			post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
			//            alert(post);
			if (urlstatus) {
				$http.post(url, post).
				success(function (data, status, headers, config) {
					if (status === 200) {
						$('#ajaxLoaderSection').hide();
                        $scope["postformname" + "popup"] = false;
						$route.reload();
					} else if (status === 203) {
						$('#ajaxLoaderSection').hide();
						$scope["postformname" + "popup"] = true;
						$scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
					} else if (status === 206) {
						$('#ajaxLoaderSection').hide();
						angular.forEach(data.Objects, function (object) {
							var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
							angular.forEach(object.Param, function (param) {
								$scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
								$scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
							});
						});
					}
				}).
				error(function (data, status, headers, config) {
					$('#ajaxLoaderSection').hide();
				});
			} else {
				$('#ajaxLoaderSection').hide();
				alert("None of the parameters have changed to update");
			}
		}
	};
	$scope.popupclose = function (scopeparam) {
		$scope[scopeparam] = false;
	}

});
