myapp.controller("wdsController", function ($scope, $http, $routeParams, localStorageService, modifyService, $route, $translate, $rootScope, $interval, $q,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;

    /* Breadscrumbs Logic starts here */
/*    setTimeout(function () {
        console.log(breadcrumbsdata)
        if (breadcrumbsdata[$route.current.params.param] == undefined) {
            $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));
            if (localStorage.getItem('hybrideditObject') == null)
                $rootScope["breadcrumbs"].push({"name": "Add", "path": 'nothing'})
            else
                $rootScope["breadcrumbs"].push({"name": "Edit", "path": 'nothing'})
        }
        else {
            $rootScope["breadcrumbs"] = breadcrumbsdata[$route.current.params.param]
            localStorage.setItem('breadcrumbarray', JSON.stringify($rootScope["breadcrumbs"]))
        }
        console.log($rootScope["breadcrumbs"])
    }, 100);*/
	var jsonpromise = $interval(function () {
        console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('hybrideditObject') == null)
                    $rootScope["breadcrumbs"].push({"name": "Add", "path": 'nothing'})

                else
                    $rootScope["breadcrumbs"].push({"name": "Edit", "path": 'nothing'})

            }

            else {

                $rootScope["breadcrumbs"] = breadcrumbsdata[$route.current.params.param]
                localStorage.setItem('breadcrumbarray', JSON.stringify($rootScope["breadcrumbs"]))
                if (breadcrumbstatus) {
                    breadcrumbstatus = false;
                    setTimeout(function () {
                        var tabtype = 'home';
                        angular.forEach($rootScope["breadcrumbs"], function (breadcrumbobject, bindex) {
                            if (bindex == 0) {
                                if (breadcrumbobject.name == "Basic") {
                                    $("#myTab li:first-child").addClass('active');
                                    $("#home").addClass('active');
                                    $("#profile").removeClass('active');
                                    $("#myTab li:nth-child(2)").removeClass('active');
                                }
                                else {
                                    tabtype = 'profile';
                                    $("#myTab li:nth-child(2)").addClass('active');
                                    $("#myTab li:first-child").removeClass('active');
                                    $("#home").removeClass('active');
                                    $("#profile").addClass('active');
                                }
                            }
                            else {
                                if (bindex == 1)
                                    $rootScope.accordian(tabtype + "-" + breadcrumbobject.name + "-" + breadcrumbobject.index, true);
                                else
                                    $rootScope.accordian(breadcrumbobject.name + "-" + breadcrumbobject.order + "-" + breadcrumbobject.index, true);
                            }
                        });
                    }, 300);
                }
            }
            $interval.cancel(jsonpromise);
        }
        console.log($rootScope["breadcrumbs"])

    }, 500);
    $scope.homefun = function () {
        if (breadcrumbsdata[$route.current.params.param] == undefined)
            bdata = JSON.parse(localStorage.getItem('breadcrumbarray'));
        else
            bdata = breadcrumbsdata[$route.current.params.param];
        if (bdata[0]["name"] == "Advanced")
            tab = "profile";
        else
            tab = "home"
        $rootScope.accordian(tab + "-" + bdata[1]["name"] + "-" + bdata[1]["index"], true)
    }
    /* Breadscrumbs Logic ends here */

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

    var changedFields = [];
    $scope["WaveWDSPeers"] = [];
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        var objectname = modifyService.dotstarremove(angular.copy(objects[0].ObjName), '.*');
                        var objectParamValues = objects[0].Param;
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                            if (ParamValue === "true") {
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = true;
                            }
                            else if (ParamValue === "false") {
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = false;
                            }
                            else if (param_name === "WaveWDSPeers") {
                                if (ParamValue != '') {
                                    angular.forEach(ParamValue.split(','), function (param) {
                                        var tempobject = {};
                                        tempobject["WaveWDSPeers"] = param;
                                        tempobject["objectname"] = "Device.WiFi.AccessPoint." + $scope["temp"]["SSID"] + ".X_LANTIQ_COM_Vendor";
                                        $scope["WaveWDSPeers"].push(tempobject);
                                    });
                                }
                            }
                            else {
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            }
                        }

                    }
                    else if (status === 203) {
                        $scope["getformname" + "popup"] = true;
                        $scope["getformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["getformname" + "popup"] = true;
                            $scope["getformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = modifyService.dotstarremove(angular.copy(object.ObjName), '.*').replace(/\./g, "").replace(/\*/g, "");
                                angular.forEach(object.Param, function (param) {
                                    $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                    $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
                                });
                            });
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };


    $scope.toggleClick = function (param) {
        var toggleparam = param.split('.');
        changedFields.push(toggleparam[0] + toggleparam[1]);
    };
    $scope.dropdownUrlRequest = function (objectname, paramname, jsonname) {
        if (jsonname.indexOf('cgi_get') > -1) {
            $http.get(URL + jsonname).
                    success(function (data, status, headers, config) {
                        var dropdowndata = data.Objects;
                        var temparray = [];
                        temparray.push({"id": "", "name": "Select"});
                        angular.forEach(dropdowndata, function (dropObject) {
                            var tempObj = {};
                            var dropParam = dropObject.Param[0].ParamValue;
                            if (dropParam.indexOf(',') > -1) {
                                angular.forEach(dropParam.split(','), function (csv) {
                                    var tempObj = {};
                                    tempObj.objectname = dropObject.ObjName;
                                    tempObj.id = csv;
                                    tempObj.name = csv;
                                    temparray.push(tempObj);
                                });
                            }
                            else {
                                tempObj.objectname = dropObject.ObjName;
                                tempObj.id = dropObject.ObjName.match(/\d+/g)[0];
                                tempObj.name = dropParam;
                                temparray.push(tempObj);
                            }

                        });
                        $scope[paramname] = temparray;
                        if ($scope[objectname] === undefined)
                            $scope[objectname] = {};
                        $scope[objectname][paramname] = temparray[1].id;
                        getFormData("cgi_get?Object=Device.WiFi.AccessPoint." + temparray[1].id + ".X_LANTIQ_COM_Vendor");
				  		$scope.requiredAccessPoint=temparray[1].id;

                    })
                    .error(function (data, status, headers, config) {
                    });
        }
        else {
            $.getJSON(jsonname + ".json", function (data) {
                $scope[paramname] = data[paramname];
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                if ($scope[paramname][0] !== undefined)
                    $scope[objectname][paramname] = $scope[paramname][0].id;
            });
        }
    };

    $scope.textChange = function (value) {
        changedFields.push(value);
        console.log(changedFields);
    };
	$scope.ssidChange = function (value) {
        if (value !== undefined) {
            $scope["temp"]["SSID"] = value;
            setTimeout(function () {
				 $("#ajaxLoaderSection").show();
                $scope["WaveWDSPeers"] = [];
				 $http.get(URL + "cgi_get_nosubobj?Object=Device.WiFi.AccessPoint&SSIDReference=Device.WiFi.SSID."+$scope["temp"]["SSID"]).success(function (data,status) {
            if (status === 200) {
				        $("#ajaxLoaderSection").hide();

                $scope.requiredAccessPoint = data.Objects[0].ObjName.replace(/\D/g, '');
				//alert($scope.requiredAccessPoint);
              
            }
            else if (status === 203) {
                       $("#ajaxLoaderSection").hide();

            }
            else if (status === 206) {
                     $("#ajaxLoaderSection").hide();

                }
                else {
                   
                }
            }).then(function(){
					 getFormData("cgi_get?Object=Device.WiFi.AccessPoint." + $scope.requiredAccessPoint + ".X_LANTIQ_COM_Vendor");
					  $("#ajaxLoaderSection").hide();
				 })
                
            }, 1000);
        }
    };
    $scope["wdsstatus"] = false;
    $scope.Modify = function (object, event) {
        var peersarray = [];
        angular.forEach($scope["WaveWDSPeers"], function (object) {
            peersarray.push(object["WaveWDSPeers"]);
        });

        $scope["DeviceWiFiAccessPointX_LANTIQ_COM_Vendor"]["WaveWDSPeers"] = peersarray.join();
        $scope["wdsstatus"] = true;

        if (event.currentTarget.attributes['formstatus'].value === "true") {
            $('#ajaxLoaderSection').show();
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set?";
            var objectlevelurlstatus = false;
            var postobject = "Object=" + object.replace(/\*/g, $scope.requiredAccessPoint) + "&Operation=Modify";
            angular.forEach($scope[object.replace(/\./g, "").replace(/\*/g, '')], function (value, key) {
                if (changedFields.indexOf(object.replace(/\./g, "").replace(/\*/g, '') + key) > -1) {
                    objectlevelurlstatus = true;
                    urlstatus = true;
                    postobject += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
                }
            });
            if (objectlevelurlstatus)
                post += postobject + ",";
            post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
            if (urlstatus) {
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                $('#ajaxLoaderSection').hide();
                                $route.reload();
                            }
                            else if (status === 203) {
                                $('#ajaxLoaderSection').hide();
                                $scope["postformname" + "popup"] = true;
                                $scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                            }
                            else if (status === 206) {
                                $('#ajaxLoaderSection').hide();
                                angular.forEach(data.Objects, function (object) {
                                    var respobject = modifyService.dotstarremove(angular.copy(object.ObjName), '.*').replace(/\./g, "").replace(/\*/g, "");
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
            }
            else {
                $('#ajaxLoaderSection').hide();
                alert("None of the parameters have changed to update");
            }
        }
    };
    $scope.status = false;
    $scope.showstatus = function (status, value) {
    	var val = value.split('?');
 	var object1 = val[0].replace(/\./g, "").replace(/\*/g, "");
    	var param1 = val[1].replace(/\,$/, '');
    	$scope[object1][param1] = [];
        $scope.status = status;
        $scope["macregexpression"] = false;
    };
    $scope.rowcancel = function (status) {
        $scope.status = status;
    };
    $scope.macrowApply = function (event) {
        var val = event.currentTarget.attributes['source'].value.split('?');
        var getobjectname = val[0].replace(/\./g, "").replace(/\*/g, "");
        var getparamname = val[1].replace(/\,$/, '');
        if (/^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/.test($scope[getobjectname][getparamname])) {
            $scope["macregexpression"] = false;
            var tempobject = {};
            tempobject[getparamname] = $scope[getobjectname][getparamname];
            tempobject["objectname"] = "Device.WiFi.AccessPoint." + $scope.requiredAccessPoint + ".X_LANTIQ_COM_Vendor";
            $scope[getparamname].push(tempobject);
            $scope.rowcancel(false);
            changedFields.push(getobjectname + getparamname);
        }
        else {
            $scope["macregexpression"] = true;
        }
    };

    $scope.deletemac = function (index, event) {
        var answer = confirm("Are you sure you want to Delete?");
        if (!answer) {
            event.preventDefault();
        }
        else {
            var val = event.currentTarget.attributes['source'].value.split('?');
            var getobjectname = val[0].replace(/\./g, "").replace(/\*/g, "");
            var getparamname = val[1].replace(/\,$/, '');
            $scope[getparamname].splice(index, 1);
            changedFields.push(getobjectname + getparamname);
        }
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
});
