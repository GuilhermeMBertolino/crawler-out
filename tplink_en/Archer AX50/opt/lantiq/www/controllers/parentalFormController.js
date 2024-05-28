/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myapp.controller("parentalFormController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $interval,$sanitize) {
   /* $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;*/
    
    /* Breadscrumbs Logic starts here */
/*    setTimeout(function () {
        console.log(breadcrumbsdata)
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
        }
        console.log($rootScope["breadcrumbs"])
    }, 100); */
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
    
	/*Translation starts here */
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
    var parentalpostarray = [];
    var objectInfo = localStorage.getItem('parentalid');
    $scope["parentalformstatus"] = false;
    $scope.lengthstatus = false;
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope.props = {};
                        $scope.formArray = [];
                        objects = data.Objects;
                        $scope.objects = objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (param_name == "DaysOfTheWeek") {
                                    $scope.props[param_name] = param_value.split(',')
                                }
                                else
                                    $scope.props[param_name] = param_value;
                            }
                        }
                        $scope["Enablechange"] = false;
                        $scope["Targetchange"] = false;
                        $scope["MACAddresschange"] = false;
                        $scope["TimeStartchange"] = false;
                        $scope["TimeEndchange"] = false;
                        $scope["DaysOfTheWeekchange"] = false;
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
    if (objectInfo != null)
        getFormData("cgi_get?Object=" + localStorage.getItem('parentalid'));
    else
        $scope["Targetchange"] = true;
    $scope.Cancel = function (param1) {
        localStorage.removeItem('parentalid');
        location.href = "#/custom/" + param1;
    };
    $scope.customtextchange = function (value) {
        $scope[value + "change"] = true;
    };
    $scope.customdropdownchange = function (value) {
        $scope[value + "change"] = true;
    };
    $scope.custommacaddresschange = function (value) {
        $scope[value + "change"] = true;
    };
    $scope.customtimestartchange = function (value) {
        $scope[value + "change"] = true;
    };
    $scope.customtimeendchange = function (value) {
        $scope[value + "change"] = true;
    };


    if (objectInfo !== null) {
        $("#Modify").show();
        $("#Add").hide();
    }
    else {
        $("#Modify").hide();
        $("#Add").show();
    }

    $scope.AddPC = function (event) {

        $scope.checkdays = $scope.checkDaysOfTheWeek();
        $scope["parentalformstatus"] = true;
//        if ($scope["props"]["DaysOfTheWeek"] == undefined)
//            $scope.lengthstatus = true;
//        else
//            $scope.lengthstatus = $scope["props"]["DaysOfTheWeek"].length > 0 ? false : true;
        if (event.currentTarget.attributes['formstatus'].value == "true" && $scope.checkdays == 0) {
            $('#ajaxLoaderSection').show();
            if (objectInfo == null)
                objectInfo = "Device.Firewall.X_LANTIQ_COM_ParentalControl.Rule";
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set?";
            if (parentalpostarray.length > 0) {
                urlstatus = true;
                angular.forEach(parentalpostarray, function (obj) {
                    post += obj + ",";
                });
            }
            post = "Object=" + objectInfo + "&Operation=" + event.currentTarget.attributes["id"].value;
            if ($scope["Enablechange"]) {
                urlstatus = true;
                post += "&Enable=" + $scope["props"]["Enable"];
            }
            if ($scope["Targetchange"]) {
                urlstatus = true;
                post += "&Target=" + $sanitize($scope["props"]["Target"]).replace(/<[^>]+>/gm, '');
            }
            if ($scope["MACAddresschange"]) {
                urlstatus = true;
                post += "&MACAddress=" + $scope["props"]["MACAddress"];
            }
            if ($scope["TimeStartchange"]) {
                urlstatus = true;
                post += "&TimeStart=" + $scope["props"]["TimeStart"];
            }
            if ($scope["TimeEndchange"]) {
                urlstatus = true;
                post += "&TimeEnd=" + $scope["props"]["TimeEnd"];
            }
            if ($scope["DaysOfTheWeekchange"]) {
                urlstatus = true;
                var daystring = '';
                angular.forEach($scope.props["DaysOfTheWeek"], function (day) {
                    daystring += day + ",";
                });
                post += "&DaysOfTheWeek=" + daystring.replace(/(^[,\s]+)|([,\s]+$)/g, '');
            }
            //alert(post);
            if (urlstatus) {
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                localStorage.removeItem('parentalid');
                                $scope.Cancel('parentalcontrol');
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
                                localStorage.setItem('parentalformstatus', true);
                                localStorage.setItem('parentalformmessage', data.Objects[0].Param[0].ParamValue);
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
    $scope.dayofTheWeek = function (value) {
        if ($scope["props"] === undefined) {
            $scope["props"] = {};
        }
        if ($scope["props"]["DaysOfTheWeek"] === undefined) {
            $scope["props"]["DaysOfTheWeek"] = [];
        }
        $scope["DaysOfTheWeekchange"] = true;
        $scope.props["DaysOfTheWeek"] = $scope.props["DaysOfTheWeek"]
        console.log($scope.props["DaysOfTheWeek"].indexOf(value))
        if ($scope.props["DaysOfTheWeek"].indexOf(value) > -1) {
            var index = $scope.props["DaysOfTheWeek"].indexOf(value);
            $scope.props["DaysOfTheWeek"].splice(index, 1);
        }
        else {
            $scope.props["DaysOfTheWeek"].push(value);
        }

    };
    $scope.checkDaysOfTheWeek = function (value) {
        if ($scope['props']["DaysOfTheWeek"] === undefined || $scope['props']["DaysOfTheWeek"].length == 0)
            return -1;
        return 0;
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});

