myapp.controller("virtualServerController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $element, $translate, $rootScope, $interval, $q,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
    /* Breadscrumbs Logic starts here */
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
    var objectInfo = localStorage.getItem('hybrideditObject');
    var reqobject = "Device.NAT.PortMapping.*";
    $scope.testAccounts = null;
//    var defaultarray = ["DeviceNATPortMapping.AllInterfaces"];
    var stringval = "DeviceNATPortMapping.AllInterfaces";
    $scope["virtualformstatus"] = false;
    $scope.Cancel = function (param1) {
        localStorage.removeItem('hybrideditObject');
        location.href = "#/tableform/" + param1;
    };
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
                            if (ParamValue == "true") {
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = true;
                            }
                            else if (ParamValue == "false") {
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = false;
                            }
                            else
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
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
                                var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
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
    $scope.dropdownUrlRequestInfo = function (objectname, paramname, jsonname) {
        if (jsonname.indexOf('cgi_get') > -1) {
            var temparray = [];
            temparray.push({"id": "", "name": "Select"});
            var tempUrls = [];
            var getDropdownData = function (data, status, headers, config) {
                if( status == 200 ){
                    var dropdowndata = data.Objects;
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
                            tempObj.id = dropParam;
                            tempObj.name = dropParam;
                            temparray.push(tempObj);
                        }
                    });
                }
            };

            var Urlvalues = jsonname.split(',');
            angular.forEach(Urlvalues, function(Urlvalue){
                if(Urlvalue.indexOf('?') > -1){
                    var UrlQueryvalues = Urlvalue.split('?');
                    var UrlObjectValues = UrlQueryvalues[1].split('Object=');
                    angular.forEach(UrlObjectValues, function(UrlObjectValue){
                        if(UrlObjectValue != ""){
                            tempUrls.push($http.get(URL + UrlQueryvalues[0]+'?Object='+UrlObjectValue).
                                success(function (data, status, headers, config) {
                                    getDropdownData(data, status, headers, config);
                                })
                                .error(function (data, status, headers, config) {
                                })
                            );
                        }
                    });
                }else{
                    tempUrls.push($http.get(URL + Urlvalue).
                        success(function (data, status, headers, config) {
                            getDropdownData(data, status, headers, config);
                        })
                        .error(function (data, status, headers, config) {
                        })
                    );
                }
            });

            $q.all(tempUrls).then(function(){
                $scope[paramname] = temparray;
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                $scope[objectname][paramname] = temparray[0].id;
                $("#dataView").find("dropdown-multiselect").map(function (i)
                {
                    $scope.users = [];
                    $scope.ddvalues = temparray;
                    angular.forEach($scope.ddvalues, function (doc, dropdownIndex) {
                        if (dropdownIndex !== 0)
                            $scope.users.push(doc);
                    });
                });
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
    if (objectInfo !== null) {
        reqobject = reqobject.replace('*', localStorage.getItem('hybrideditObject'));
        setTimeout(function () {
            getFormData("cgi_get?Object=" + reqobject);
        }, 500);
    }


    if (objectInfo !== null) {
        $("#Modify").show();
        $("#Add").hide();
    }
    else {
        $("#Modify").hide();
        $("#Add").show();
    }
    $scope.textChange = function (value) {
        changedFields.push(value);
    };
    $scope.Modify = function (event) {

        $scope["virtualformstatus"] = true;
        if (event.currentTarget.attributes['formstatus'].value === "true") {
            if (event.currentTarget.attributes["id"].value == "Add") {
                changedFields.push("DeviceNATPortMappingProtocol", "DeviceNATPortMappingExternalPort", "DeviceNATPortMappingExternalPortEndRange", "DeviceNATPortMappingInternalPort");
            }
//            angular.forEach(defaultarray, function (arrayvalue) {
            var splitvalue = stringval.split('.');
            var combinevalue = splitvalue[0] + splitvalue[1];
            if ($scope[splitvalue[0]][splitvalue[1]] === "" || $scope[splitvalue[0]][splitvalue[1]] === 0 || $scope[splitvalue[0]][splitvalue[1]] === undefined) {
                changedFields.push(combinevalue);
                $scope[splitvalue[0]][splitvalue[1]] = 0;
            }
//            });

//            if (changedFields.indexOf("DeviceNATPortMappingExternalPortEndRange") <= -1) {
////                if ($scope["DeviceNATPortMapping"]["ExternalPortEndRange"] == undefined) {
//                    changedFields.push("DeviceNATPortMappingExternalPortEndRange")
//                    $scope["DeviceNATPortMapping"]["ExternalPortEndRange"] = parseInt($scope["DeviceNATPortMapping"]["ExternalPort"]) + 1;
////                }
//            }

            if ($scope["DeviceNATPortMapping"]["AllInterfaces"] === "1") {
                var index = changedFields.indexOf("DeviceNATPortMappingX_LANTIQ_COM_INTERFACE");
                if (index > -1) {
                    changedFields.splice(index, 1);
                }
            }

            $('#ajaxLoaderSection').show();
            if (objectInfo === null)
                objectInfo = "Device.NAT.PortMapping";
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set";
            var formobjects = ["Device.NAT.PortMapping.*"];
            angular.forEach(formobjects, function (object) {
                var objectlevelurlstatus = false;
                var postobject = "Object=" + reqobject.split('.*')[0] + "&Operation=" + event.currentTarget.attributes["id"].value;
                angular.forEach($scope[object.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                    if (changedFields.indexOf(object.replace(/\./g, "").replace(/\*/g, "") + key) > -1) {
                        objectlevelurlstatus = true;
                        urlstatus = true;
                        postobject += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
                    }
                });
                if (objectlevelurlstatus)
                    post += postobject + ",";
            });
            post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            if (event.currentTarget.attributes["id"].value == "Add") {
                if (urlstatus) {
                    //alert(post);
                    $http.post(url, post).
                            success(function (data, status, headers, config) {
                                if (status === 200) {
                                    localStorage.removeItem('hybrideditObject');
                                    $scope.Cancel('virtualserver');
                                    $('#ajaxLoaderSection').hide();
                                }
                                else if (status === 203) {
                                    $('#ajaxLoaderSection').hide();
                                    $scope["postformname" + "popup"] = true;
                                    $scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                }
                                else if (status === 206) {
                                    $('#ajaxLoaderSection').hide();
                                    angular.forEach(data.Objects, function (object) {
                                        var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                                        angular.forEach(object.Param, function (param) {
                                            $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                            $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
                                        });
                                    });
                                }
                                else if (status === 207) {
                                    console.log(data.Objects[0].Param[0].ParamValue);
                                    localStorage.setItem('multistatus', true);
                                    localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue);
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
            else {
                var port2 = parseInt($scope["DeviceNATPortMapping"]["ExternalPortEndRange"]);
                var port1 = parseInt($scope["DeviceNATPortMapping"]["ExternalPort"]);
                if (port2 === 0) {
                    if (urlstatus) {
                        //alert(post);
                        $http.post(url, post).
                                success(function (data, status, headers, config) {
                                    if (status === 200) {
                                        localStorage.removeItem('hybrideditObject');
                                        $scope.Cancel('virtualserver');
                                        $('#ajaxLoaderSection').hide();
                                    }
                                    else if (status === 203) {
                                        $('#ajaxLoaderSection').hide();
                                        $scope["postformname" + "popup"] = true;
                                        $scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                    }
                                    else if (status === 206) {
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
                } else if (isNaN(parseInt(port2))
 || (port1 <= port2)) {
                    if (urlstatus) {
                        //alert(post);
                        $http.post(url, post).
                                success(function (data, status, headers, config) {
                                    if (status === 200) {
                                        localStorage.removeItem('hybrideditObject');
                                        $scope.Cancel('virtualserver');
                                        $('#ajaxLoaderSection').hide();
                                    }
                                    else if (status === 203) {
                                        $('#ajaxLoaderSection').hide();
                                        $scope["postformname" + "popup"] = true;
                                        $scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                    }
                                    else if (status === 206) {
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
                    }
                    else {
                        $('#ajaxLoaderSection').hide();
                        alert("None of the parameters have changed to update");
                    }
                }
                else {
                    $('#ajaxLoaderSection').hide();
                    alert("ExternalPortEndRange value should be always greater than ExternalPort");
                }

            }
        }
    };
    $scope.onfocus = function (id) {
        angular.element("#" + id).focus();
    };
    $http.get('virtualserver.json').success(function (data)
    {
        $scope.testAccounts = data.objects;
        console.log("Accounts=", $scope.testAccounts[0].name);
    });
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});
