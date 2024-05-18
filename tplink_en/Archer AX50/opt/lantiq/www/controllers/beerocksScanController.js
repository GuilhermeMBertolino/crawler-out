myapp.controller("beerocksScanController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $interval, clientModeService, $timeout) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    var max_scan_attempt = 0;
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

    $scope.setSelectedItem = function (data) {
        clientModeService.setObject(data);
    }

    var EnableEndpoint = function (endPoint, getSSIDsObjectName) {
        $scope.isScanning = true;
        var url = URL + "cgi_set?";
        var data = "Object=" + endPoint + "&Operation=Modify&Enable=true";
        if (endPoint === "Device.WiFi.EndPoint.1") {
            data = data + "&Object=Device.WiFi.SSID.4&Operation=Modify&Enable=true&Object=Device.WiFi.SSID.4&Operation=Modify&X_LANTIQ_COM_Vendor_BridgeName=br-lan";

        }
        if (endPoint === "Device.WiFi.EndPoint.2") {
            data = data + "&Object=Device.WiFi.SSID.5&Operation=Modify&Enable=true&Object=Device.WiFi.SSID.5&Operation=Modify&X_LANTIQ_COM_Vendor_BridgeName=br-lan";

        }
        if (endPoint === "Device.WiFi.EndPoint.3") {
            data = data + "&Object=Device.WiFi.SSID.6&Operation=Modify&Enable=true&Object=Device.WiFi.SSID.6&Operation=Modify&X_LANTIQ_COM_Vendor_BridgeName=br-lan";

        }
        modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                ScanOnEndpoint(endPoint, getSSIDsObjectName);
            } else {
                if (endPoint === "Device.WiFi.EndPoint.1" && secondRadioUp === true) {
                    EnableEndpoint("Device.WiFi.EndPoint.2", "Device.WiFi.EndPoint.2.Profile");
                } else if (endPoint === "Device.WiFi.EndPoint.2" && thirdRadioUp === true) {
                    EnableEndpoint("Device.WiFi.EndPoint.3", "Device.WiFi.EndPoint.3.Profile");
                } else {
                    $scope.isScanning = false;
                }

            }

        })

    }


    var DisableEndpoint = function (endPoint) {
        var url = URL + "cgi_set?";
        var data = "Object=" + endPoint + "&Operation=Modify&Enable=false";
        if (endPoint === "Device.WiFi.EndPoint.1")
            data = data + "&Object=Device.WiFi.SSID.4&Operation=Modify&Enable=false";
        if (endPoint === "Device.WiFi.EndPoint.2")
            data = data + "&Object=Device.WiFi.SSID.5&Operation=Modify&Enable=false";
        if (endPoint === "Device.WiFi.EndPoint.3")
            data = data + "&Object=Device.WiFi.SSID.6&Operation=Modify&Enable=false";
        modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                if (endPoint === "Device.WiFi.EndPoint.1" && secondRadioUp === true) {
                    EnableEndpoint("Device.WiFi.EndPoint.2", "Device.WiFi.EndPoint.2.Profile");
                } else if ((endPoint === "Device.WiFi.EndPoint.2" || endPoint === "Device.WiFi.EndPoint.1") && thirdRadioUp === true) {
                    EnableEndpoint("Device.WiFi.EndPoint.3", "Device.WiFi.EndPoint.3.Profile");
                } else {
                    $scope.isScanning = false;
                }
            } else {

                $scope.isScanning = false;
            }

        })

    }



    var ScanOnEndpoint = function (endPoint, getSSIDsObjectName) {
        $scope.DeviceWiFiEndPointProfiletable = [];
        var objectCount = 0;
        var url = URL + "cgi_set?";
        var data = "Object=" + endPoint + "&Operation=Modify&X_LANTIQ_COM_Vendor_ScanStatus=Scanning";
        modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                max_scan_attempt = max_scan_attempt + 1;
                var reqdataarray = [];
                $scope.tableDataArray = [];
                $scope.tablevalues = [];
                var post = "cgi_get?Object=" + getSSIDsObjectName;
                $http.get(URL + post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        var found = false;
                        objects = data.Objects;
                        if (objects !== '' && objects !== undefined) {
                            for (var obj = 0; obj < objects.length; obj++) {
                                if (obj % 2 == 1) {
                                    var objobjname = objects[obj].ObjName;
                                    var objectindex = objobjname.indexOf(reqdataarray);
                                    if (objectindex > -1) {
                                        if (objectindex === 0) {
                                            var objectParamValues = objects[obj].Param;

                                            for (var i = 0; i < objectParamValues.length; i++) {
                                                if ($scope.DeviceWiFiEndPointProfiletable !== undefined) {


                                                    $scope.DeviceWiFiEndPointProfiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                                }


                                            }
                                            objectCount = objectCount + 1;
                                        }


                                    }

                                } else {
                                    if ($scope.DeviceWiFiEndPointProfiletable !== undefined) {
                                        $scope.DeviceWiFiEndPointProfiletable[objectCount] = [];
                                    }


                                    var objectParamValues = objects[obj].Param;
                                    for (var i = 0; i < objectParamValues.length; i++) {
                                        if ($scope.DeviceWiFiEndPointProfiletable !== undefined) {
                                           $scope.DeviceWiFiEndPointProfiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                        }

                                    }
                                }
                            }
                            if ($scope.DeviceWiFiEndPointProfiletable !== undefined) {
                                for (var i = 0; i < $scope.DeviceWiFiEndPointProfiletable.length; i++) {
                                    if ($scope.DeviceWiFiEndPointProfiletable[i].ModeEnabled == '') {
                                        found = true;
                                        break;
                                    }
                                }
                                if (found) {
                                    if (max_scan_attempt < 3) {
                                        $timeout(function () {
                                            ScanOnEndpoint(endPoint, getSSIDsObjectName);
                                        }, 10000);

                                    }
                                }
                                $scope.selectedItem = $scope.DeviceWiFiEndPointProfiletable[0];
                                clientModeService.setObject($scope.DeviceWiFiEndPointProfiletable[0]);
                            }
                        } else {
                            found = true;
                            if (max_scan_attempt < 3) {
                                $timeout(function () {
                                    ScanOnEndpoint(endPoint, getSSIDsObjectName);
                                }, 10000);

                            }
                        }
                        if (!found || max_scan_attempt >= 3) {
                            DisableEndpoint(endPoint);
                        }
                    } else {
                        $scope.isScanning = false;

                    }


                }).
                error(function (data, status, headers, config) {
                    $scope.isScanning = false;
                });

            } else {

            }


        })
    }

    var firstRadioUp = false;
    var secondRadioUp = false;
    var thirdRadioUp = false;

    var CheckRadioBandStatus = function () {
        var url = URL + "cgi_get_fillparams?";
        var data = "Object=Device.WiFi.Radio&Status=";
        modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                if (response.data.Objects !== undefined) {
                    angular.forEach(response.data.Objects, function (object) {
                        if (object.ObjName === "Device.WiFi.Radio.1") {
                            if (object.Param[0].ParamValue !== undefined && object.Param[0].ParamValue === "Up") {
                                firstRadioUp = true;
                            }
                        }
                        if (object.ObjName === "Device.WiFi.Radio.2") {
                            if (object.Param[0].ParamValue !== undefined && object.Param[0].ParamValue === "Up") {
                                secondRadioUp = true;
                            }
                        }
                        if (object.ObjName === "Device.WiFi.Radio.3") {
                            if (object.Param[0].ParamValue !== undefined && object.Param[0].ParamValue === "Up") {
                                thirdRadioUp = true;
                            }
                        }
                    })
                }
            } else {

                $scope.isScanning = false;
            }
            if (firstRadioUp === true)
                EnableEndpoint("Device.WiFi.EndPoint.1", "Device.WiFi.EndPoint.1.Profile");
            else if (secondRadioUp === true)
                EnableEndpoint("Device.WiFi.EndPoint.2", "Device.WiFi.EndPoint.2.Profile")
            else
                EnableEndpoint("Device.WiFi.EndPoint.3", "Device.WiFi.EndPoint.3.Profile")
        });
    }


    $scope.PerformScan = function () {
        //CheckRadioBandStatus();
        EnableEndpoint("Device.WiFi.EndPoint.1", "Device.WiFi.EndPoint.1.Profile");

    }



    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };

});