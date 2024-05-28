myapp.controller("callingfeaturesController", function ($scope, $http, $routeParams, localStorageService, modifyService, $route, $translate, $rootScope, $interval,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    var previoousmessages = [];
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
    }, 50);*/
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
    var formob = "Device.Services.VoiceService.1.VoiceProfile.1.Line.*.CallingFeatures";
    var changedFields = [];
    var objectInfo = localStorage.getItem('hybrideditObject');
    $scope.customFormToOpen = function (param) {
        location.href = "#/custom/" + param;
    };
    $scope.Cancel = function (param1) {
        localStorage.removeItem('hybrideditObject');
        location.href = "#/tableform/" + param1;
        $route.reload();
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
//                    $scope["DeviceQoSClassification"]["Enable"] = false
                        console.log($scope);
                    }
                    else if (status === 203) {
                        $scope["callingfeaturesgetformname" + "popup"] = true;
                        $scope["callingfeaturesgetformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["callingfeaturesgetformname" + "popup"] = true;
                            $scope["callingfeaturesgetformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                                console.log(previoousmessages.length);
                                if (previoousmessages.length > 0) {
                                    angular.forEach(previoousmessages, function (errormsg) {
                                        $scope[errormsg] = false;
                                    });
                                }
                                previoousmessages = [];
                                angular.forEach(object.Param, function (param) {
                                    previoousmessages.push(respobject + "_" + param.ParamName + "responsestatus");
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
    if (objectInfo !== null) {
        objectInfo = formob.replace(/\*/g, localStorage.getItem('hybrideditObject'));
        getFormData("cgi_get?Object=" + objectInfo);
    }
    else {
        location.href = "#/tableform/line_callingfeatures";
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
        console.log(changedFields);

        $('#ajaxLoaderSection').show();
        urlstatus = false;
        var post = '';
        var url = URL + "cgi_set";
        var formobjects = ["Device.Services.VoiceService.*.VoiceProfile.*.Line.*.CallingFeatures"];
        angular.forEach(formobjects, function (object) {
            var objectlevelurlstatus = false;
            var postobject = "Object=" + objectInfo + "&Operation=" + event.currentTarget.attributes["id"].value;
            console.log(object.replace(/\./g, "").replace(/\*/g, ""))
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
        if (urlstatus) {
            $http.post(url, post).
                    success(function (data, status, headers, config) {
                        if (status === 200) {
                            $('#ajaxLoaderSection').hide();
                            localStorage.removeItem('hybrideditObject');
                            $scope.Cancel('line_callingfeatures');
                        }
                        else if (status === 203) {
                            $('#ajaxLoaderSection').hide();
                            $scope["callingfeaturespostformname" + "popup"] = true;
                            $scope["callingfeaturespostformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else if (status === 206) {
                            $('#ajaxLoaderSection').hide();
                            angular.forEach(data.Objects, function (object) {
                                var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                                if (previoousmessages.length > 0) {
                                    angular.forEach(previoousmessages, function (errormsg) {
                                        $scope[errormsg] = false;
                                    });
                                }
                                previoousmessages = [];
                                angular.forEach(object.Param, function (param) {
                                    previoousmessages.push(respobject + "_" + param.ParamName + "responsestatus");
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
            alert("None of the parameters have changed to update");
            $('#ajaxLoaderSection').hide();
        }

    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});

