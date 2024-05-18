
myapp.controller('parentalController', function ($scope, $http, $route, localStorageService, modifyService, $translate, $rootScope, $interval,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
    /* Breadscrumbs Logic starts here */

		 var jsonpromise = $interval(function () {
        console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('parentalid') == null)
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
    $scope.edit = function (event, formToopen) {
        localStorage.setItem('parentalid', event.currentTarget.attributes["id"].value)
        location.href = "#/custom/" + formToopen;
    };

    $scope.delete = function (event, user) {
        var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        }
        else {
        $("#ajaxLoaderSection").show();
        var url = URL + "cgi_set";
        var deleteobjects = event.currentTarget.id.split(',')
        var post = '';
        deleteobjects = modifyService.split(deleteobjects);
        angular.forEach(deleteobjects, function (obj) {
            post += "Object=" + obj + "&Operation=Del&" + ",";
        });
        post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        //alert(post);
//            modifyService.setRequest(url, post);
            modifyService.genericRequest(url, post, function (response) {
//                var formname = event.currentTarget.attributes['popupinfo'].value;
                errorResponseDisplay("parentaldelete", response);
            });
        }
    };
    function errorResponseDisplay(parentalpostname, response) {
    $("#ajaxLoaderSection").hide();
        var formname = parentalpostname;
        var data = response.data;
        var status = response.status;
        if (status === 200) {
            $route.reload();
        }
        else if (status === 203) {
            $scope[formname + "popup"] = true;
            $scope[formname + "popupval"] = data.Objects[0].Param[0].ParamValue;
        }
        else if (status === 207) {
            localStorage.setItem('multistatus', true);
            localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue);
            if (elementstatus != undefined) {
                $scope.Add(elementstatus);
            }
            else {
                $route.reload();
            }
        }
        else if (status === 206) {
            var popupvalue = '';
            angular.forEach(data.Objects, function (object) {
                $scope[formname + "popup"] = true;
                angular.forEach(object.Param, function (param) {
                    popupvalue += param.ParamName + ":" + param.ParamValue;
                });
            });
            $scope[formname + "popupval"] = popupvalue;
        }
    }

    $scope.reset = function () {
        $route.reload();
    };

    $scope.formToOpen = function (param) {
        location.href = "#/custom/" + param;
    };
    var parentalctrlpostarray = [];
    getFormData = function (reqParams) {
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
                            }
                        }
                    else if (status === 203) {
                        $scope["parentalformname" + "popup"] = true;
                        $scope["parentalformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["parentalformname" + "popup"] = true;
                            $scope["parentalformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
    getFormData("cgi_get_nosubobj?Object=Device.Firewall.X_LANTIQ_COM_ParentalControl");
    getFormData("cgi_get_nosubobj?Object=Device.Firewall");

    getTableData = function (reqParams) {
        $scope.tableData = [];
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope.tableData = [];
                        var params = ["Enable", "Target", "MACAddress", "TimeStart", "TimeEnd", "DaysOfTheWeek"];
                        objects = data.Objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var tempObject = {};
                            var objectParamValues = objects[obj].Param;
                            tempObject["objectname"] = objects[obj].ObjName;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (params.indexOf(param_name) > -1)
                                    tempObject[param_name] = param_value;
                            }

                            $scope.tableData.push(tempObject);
                        }
                        console.log($scope.tableData);
                    }
                    else if (status === 203) {
                        $scope["parentaltablename" + "popup"] = true;
                        $scope["parentaltablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["parentaltablename" + "popup"] = true;
                            $scope["parentaltablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["multipleparams" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["multipleparams" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getTableData("cgi_get?Object=Device.Firewall.X_LANTIQ_COM_ParentalControl.Rule");

    $scope.textChange = function (value){
        changedFields.push(value);
    };
    
    $scope.Modify = function (object, event) {
        if (event.currentTarget.attributes['formstatus'].value == "true") {
            $('#ajaxLoaderSection').show();
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set?";
            var formobjects = object.split('?');
            angular.forEach(formobjects, function (object) {
                var objectlevelurlstatus = false;
                var postobject = "Object=" + object + "&Operation=Modify";
                angular.forEach($scope[object.replace(/\./g, "")], function (value, key) {
                    if (changedFields.indexOf(object.replace(/\./g, "") + key) > -1) {
                        objectlevelurlstatus = true;
                urlstatus = true;
                        postobject += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
                    }
                });
                if (objectlevelurlstatus)
                    post += postobject + ",";
            });
            post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
//            alert(post);
            if (urlstatus) {
                //alert(post);
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                $('#ajaxLoaderSection').hide();
                                $route.reload();
                            }
                            else if (status === 203) {
                                $('#ajaxLoaderSection').hide();
                                $scope["parentalpostname" + "popup"] = true;
                                $scope["parentalpostname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
                alert("None of the parameters changed to update");
            }
        }
    };

    $scope.Add = function (param1) {
        location.href = "#/custom/" + param1;
    };
    $scope.dropdownUrlRequest = function (jsonname, paramname) {
        $http.get(jsonname + ".json").
                success(function (data, status, headers, config) {
                    var data = data[paramname];
                    $scope[paramname] = data;
                }).
                error(function (data, status, headers, config) {
                });
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});

