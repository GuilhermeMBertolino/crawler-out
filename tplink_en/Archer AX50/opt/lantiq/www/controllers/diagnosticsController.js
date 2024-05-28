myapp.controller('diagnosticsController', function ($scope, $http, $route, localStorageService, modifyService, $translate, $rootScope, $interval) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    $scope.erroronvalidation = false;


    var jsonpromise = $interval(function () {
        console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('hybrideditObject') == null)
                    $rootScope["breadcrumbs"].push({
                        "name": "Add",
                        "path": 'nothing'
                    })

                else
                    $rootScope["breadcrumbs"].push({
                        "name": "Edit",
                        "path": 'nothing'
                    })

            } else {

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
                                } else {
                                    tabtype = 'profile';
                                    $("#myTab li:nth-child(2)").addClass('active');
                                    $("#myTab li:first-child").removeClass('active');
                                    $("#home").removeClass('active');
                                    $("#profile").addClass('active');
                                }
                            } else {
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
    $scope.Linkmapping = {};
    $scope.Linkmapping[""] = "UNKNOWN";
    $scope.Linkmapping["G.992.3_Annex_K_ATM"] = "ADSL";
    $scope.Linkmapping["G.992.3_Annex_K_PTM"] = "ADSL";
    $scope.Linkmapping["G.993.2_Annex_K_ATM"] = "VDSL";
    $scope.Linkmapping["G.993.2_Annex_K_PTM"] = "VDSL";
    $scope.Linkmapping["G.994.1"] = "Auto";
    var changedFields = [];
    var traceroutetestchangedFields = [];
    $scope.loading = false;
    $scope.loading1 = false;
    $scope.loadingipping = false;
    $scope.loadingipping1 = false;
    $scope.loadingtrace = false;
    $scope.loadingtrace1 = false;
    $scope["diagnoseformstatus"] = false;

    getRequestData = function (reqParams) {
        $scope.loading = true;
        $scope.loading1 = true;
        $http.get(URL + reqParams).
        success(function (data, status, headers, config) {
            if (status === 200) {
                objects = data.Objects;
                console.log(objects)
                for (var obj = 0; obj < objects.length; obj++) {
                    // setTimeout(function () {
                    var objectParamValues = objects[obj].Param;
                    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                        var param_name = objectParamValues[pa1].ParamName;
                        var ParamValue = objectParamValues[pa1].ParamValue;
                        if ($scope[objects[obj].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                            $scope[objects[obj].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};
                        $scope[objects[obj].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                    }
                    //  }, 2000);
                }
                $scope.loading1 = false;
                //                    $('.ajaxPrgressbarSection').hide();
            } else if (status === 203) {
                $scope["startformname" + "popup"] = true;
                $scope["startformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            } else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["startformname" + "popup"] = true;
                    $scope["startformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
        error(function (data, status, headers, config) {
            $scope.loading1 = false;
            //                    $('.ajaxPrgressbarSection').hide();
        });
    };
    getRequestData("cgi_get?Object=Device.SelfTestDiagnostics");
    $scope.startData = function () {
        $scope.loading = false;
        setTimeout(function () {
            getRequestData("cgi_get?Object=Device.SelfTestDiagnostics");
        }, 100);
    };

    $scope.textChange = function (value) {
        changedFields.push(value);
    };

    getIPPingFormData = function (reqParams) {
        $scope.loadingipping = true;
        $scope.loadingipping1 = true;
        $scope.ippingArray = [];
        $http.get(URL + reqParams).
        success(function (data, status, headers, config) {
            if (status === 200) {
                objects = data.Objects;
                $scope.objects = objects;
                for (var obj = 0; obj < objects.length; obj++) {
                    var objectParamValues = objects[obj].Param;
                    var ippingobject = {};
                    for (var i = 0; i < objectParamValues.length; i++) {
                        var param_name = objectParamValues[i].ParamName;
                        var param_value = objectParamValues[i].ParamValue;
                        ippingobject[param_name] = param_value;
                    }
                    $scope.ippingArray.push(ippingobject);
                }
                $scope.loadingipping1 = false;
                //                    $('.ajaxPrgressbarSection').hide();
            } else if (status === 203) {
                $scope["ippingformname" + "popup"] = true;
                $scope["ippingformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            } else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["ippingformname" + "popup"] = true;
                    $scope["ippingformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
        error(function (data, status, headers, config) {
            $scope.loadingipping1 = false;
            //                    $('.ajaxPrgressbarSection').hide();
        });
    };
    $scope.startIPPingTest = function (object, event) {
        $scope["diagnoseformstatus"] = true;
        $scope.loadingipping = false;
        if (event.currentTarget.attributes['formstatus'].value == "true") {
            if ($scope["IPHost"] !== "" && $scope["IPHost"] !== undefined) {
                urlstatus = false;
                var post = '';
                var url = URL + "cgi_set?";
                var formobjects = object.split('?');
                angular.forEach(formobjects, function (object) {
                    var objectlevelurlstatus = false;
                    var postobject = "Object=" + object + "&Operation=Modify";
                    //            angular.forEach($scope[object.replace(/\./g, "")], function (value, key) {
                    //            if (changedFields.indexOf("IPHost") > -1) {
                    objectlevelurlstatus = true;
                    urlstatus = true;
                    postobject += "&NumberOfRepetitions=1&Host" + "=" + $scope["IPHost"];
                    //            }
                    //            });
                    if (objectlevelurlstatus)
                        post += postobject + ",";
                });
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                //        changedFields = [];
                //alert(post);
                if (urlstatus) {
                    $http.post(url, post).
                    success(function (data, status, headers, config) {
                        if (status === 200) {
                            setTimeout(function () {
                                getIPPingFormData("cgi_get?Object=Device.IP.Diagnostics.IPPing");
                            }, 100);
                        } else if (status === 203) {
                            $scope["ipping" + "popup"] = true;
                            $scope["ipping" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        } else if (status === 206) {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                                angular.forEach(object.Param, function (param) {
                                    $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                    $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
                                });
                            });
                        }
                    }).
                    error(function (data, status, headers, config) {});
                } else {
                    alert("Parameter is Empty");
                }
            } else {
                alert("Value is Empty");
            }
        }
    };

    $scope.textChangeTracerouteTest = function (value) {
        traceroutetestchangedFields.push(value);
    };




    $scope.startTracerouteTest = function (object) {

        $scope.loadingtrace = false;
        $scope.loadingtrace1 = true;
        if ($scope["TraceRouteHost"] !== "" && $scope["TraceRouteHost"] !== undefined) {


            //test ipv4

            $scope.validipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test($scope["TraceRouteHost"]);


            //test ipv6  

            $scope.validipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test($scope["TraceRouteHost"]);

            $scope.validurl = /^((https?|ftp):\/\/)?([a-z]+[.])?[a-z0-9-]+([.][a-z]{1,4}){1,2}(\/.*[?].*)?$/i.test($scope["TraceRouteHost"]);
            console.info('scopy', $scope["TraceRouteHost"])
            console.info('url test', $scope.validurl)
            console.info('ipv4 test', $scope.validipv4)
            console.info('ipv6 test', $scope.validipv6)




            if ($scope.validurl || $scope.validipv4 || $scope.validipv6) {
                console.info('scope success', $scope["TraceRouteHost"])
                urlstatus = false;
                var post = '';
                var url = URL + "cgi_set?";
                var formobjects = object.split('?');
                angular.forEach(formobjects, function (object) {
                    var objectlevelurlstatus = false;
                    var postobject = "Object=" + object + "&Operation=Modify";
                    //                angular.forEach($scope[object.replace(/\./g, "")], function (value, key) {
                    //                if (traceroutetestchangedFields.indexOf(object.replace(/\./g, "") + key) > -1) {
                    objectlevelurlstatus = true;
                    urlstatus = true;
                    postobject += "&Host" + "=" + $scope["TraceRouteHost"];
                    //                }
                    //                });
                    if (objectlevelurlstatus)
                        post += postobject + ",";
                });
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                //alert(post);
                if (urlstatus) {
                    $http.post(url, post).
                    success(function (data, status, headers, config) {
                        if (status === 200) {
                            setTimeout(function () {
                                getFormData("cgi_get?Object=Device.IP.Diagnostics.TraceRoute");
                            }, 100);
                        } else if (status === 203) {
                            $scope["traceroute" + "popup"] = true;
                            $scope["traceroute" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        } else if (status === 206) {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                                angular.forEach(object.Param, function (param) {
                                    $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                    $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue;
                                });
                            });
                        }
                    }).
                    error(function (data, status, headers, config) {});
                } else {
                    alert("Parameter is Empty");
                }
            } else {
                $scope.loadingtrace = false;
                $scope.loadingtrace1 = false;

                $scope.erroronvalidation = true;

            }


        } else {
            alert("Value is Empty");
        }
    };

    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
        success(function (data, status, headers, config) {
            if (status === 200) {
                objects = data.Objects;
                $scope.diagnoseArray = [];
                for (var obj = 0; obj < objects.length; obj++) {
                    if (objects[obj].ObjName === "Device.IP.Diagnostics.TraceRoute") {
                        var objectParamValues = objects[obj].Param;
                        var diagnoseobject = {};
                        for (var i = 0; i < objectParamValues.length; i++) {
                            if (objectParamValues[i].ParamName === "DiagnosticsState") {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                diagnoseobject[param_name] = param_value;
                            } else if (objectParamValues[i].ParamName === "RouteHopsNumberOfEntries") {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                diagnoseobject[param_name] = param_value;
                            }
                        }
                        if (diagnoseobject.DiagnosticsState === "Error_CannotResolveHostName") {
                            $scope.loadingtrace = true;
                            $scope["error_responsestatus"] = true;
                            console.log($scope["error_responsestatus"]);
                            $scope["err_val"] = "Cannot resolve host name.";
                            $scope.loadingtrace1 = false;
                        } else {
                            getTraceRoute("cgi_get?Object=Device.IP.Diagnostics.TraceRoute.RouteHops", diagnoseobject);
                        }
                    }
                }
            } else if (status === 203) {
                $scope["routehopentries" + "popup"] = true;
                $scope["routehopentries" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            } else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["routehopentries" + "popup"] = true;
                    $scope["routehopentries" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
    getTraceRoute = function (reqParams, diagnoseobject) {
        $scope.loadingtrace = true;
        /*  $scope.loadingtrace1 = true;*/
        $http.get(URL + reqParams).
        success(function (data, status, headers, config) {
            if (status === 200) {
                objects = data.Objects;
                $scope.tracerouteArray = [];
                for (var obj = 0; obj < diagnoseobject.RouteHopsNumberOfEntries; obj++) {
                    var objectParamValues = objects[obj].Param;
                    var tracerouteobject = {};
                    for (var i = 0; i < objectParamValues.length; i++) {
                        var param_name = objectParamValues[i].ParamName;
                        var param_value = objectParamValues[i].ParamValue;
                        tracerouteobject[param_name] = param_value;
                    }
                    $scope.tracerouteArray.push(tracerouteobject);
                }
                $scope.loadingtrace1 = false;
                //                    $('.ajaxPrgressbarSection').hide();
            } else if (status === 203) {
                $scope["traceroutedata" + "popup"] = true;
                $scope["traceroutedata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            } else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["traceroutedata" + "popup"] = true;
                    $scope["traceroutedata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
        error(function (data, status, headers, config) {
            //                    $('.ajaxPrgressbarSection').hide();
            $scope.loadingtrace1 = false;
        });
    };

    $scope.selectIPPing = function () {
        $scope.loadingipping = false;
    };
    $scope.selectTrace = function () {
        $scope.loadingtrace = false;
        $scope.erroronvalidation = false;
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});