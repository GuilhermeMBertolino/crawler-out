myapp.controller('statisticsController', function ($scope, $route, $http, $location, modifyService, $interval, $translate, $rootScope, $q) {
	//console.log(URL);
    var jsonpromise = $interval(function () {
       // console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
            /*    $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('hybrideditObject') == null)
                    $rootScope["breadcrumbs"].push({"name": "Add", "path": 'nothing'})

                else
                    $rootScope["breadcrumbs"].push({"name": "Edit", "path": 'nothing'})
	*/
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

    /* WAN related code */
    var wansetcountsent = 1;
    var wanprevDatasent = {};
    var wansetcountsentrec = 1;
    var wanprevDatarec = {};
    var prevdatarate = {};
    var prevdataratereceive = {};
    getWanFormData = function (reqParams) {
	console.log("getWANForm called")
	console.log(URL);
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    $scope.IP = IP.replace(/\./g, "");
                    if (status === 200) {
                        objects = data.Objects;
                        var objectParamValues = objects[0].Param;
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};

                            if (param_name == "BytesSent") {
                                var val = ParamValue;
                                if (wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Sent: " + wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Sent: " + val);
                                if (wansetcountsent > 1) {
                                    if ((val - wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]) < 0)
                                    {
                                        valc = prevdatarate[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")];
                                    }
                                    else {
                                        valc = ((val - wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]) * 8) / (Math.pow(10, 6) * 6);
                                    }
                                    console.log("Valc is sent: " + valc);
                                    if (valc < 1024) {
                                        if (valc < 0) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc) + " Mbps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (valc / 1024).toFixed(2) + " Gbps";
                                    }
                                    wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                    prevdatarate[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = Math.round(valc);
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val = 0;
                                    wanprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                    val = (val * 8) / (Math.pow(10, 6) * 6);
                                    if (val < 1024) {
                                        if (val < 0) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                    }

                                }
                                wansetcountsent++;
                            }

                            if (param_name == "BytesReceived") {
                                var val1 = ParamValue;
                                if (wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Rece: " + wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Rece: " + val1);
                                if (wansetcountsentrec > 1) {
                                    if ((val1 - wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]) < 0) {
                                        valc = prevdataratereceive[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]
                                    }
                                    else {
                                        valc = ((val1 - wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]) * 8) / (Math.pow(10, 6) * 6);
                                    }
                                    console.log("Valc is Rece: " + valc);
                                    if (valc < 1024) {
                                        if (valc < 0) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc) + " Mbps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (valc / 1024).toFixed(2) + " Gbps";
                                    }
                                    wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                    prevdataratereceive[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = valc;
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val1 = 0;
                                    wanprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                    val1 = (val1 * 8) / (Math.pow(10, 6) * 6);
                                    if (val1 < 1024) {
                                        if (val1 < 0) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " Mbps";
                                    }
                                }
                                wansetcountsentrec++;
                            }

                            if (param_name == "Status") {
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["statistics" + "popup"] = true;
                        $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["statistics" + "popup"] = true;
                            $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
    /*WiFi Scalability*/
    var wansetcountpktsent = 1;
    var wanprevDatapktsent = {};
    var wansetcountsentpktrec = 1;
    var wanprevDatapktrec = {};
    getAppFormData = function (reqParams, IP) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    $scope.packetIP = IP.replace(/\./g, "");
                    if (status === 200) {
                        objects = data.Objects;
                        var objectParamValues = objects[0].Param;
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};

                            if (param_name == "PacketsSent") {
                                var val = ParamValue;
                                if (wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Sent: " + wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Sent: " + val);
                                if (wansetcountpktsent > 1) {
                                    var valc = ((val - wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")])) / 6;
                                    console.log("Valc is sent: " + valc);
                                    if (valc < 0) {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc) + " pps";
                                    }
                                    wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val = 0;
                                    wanprevDatapktsent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                    val = (val * 8) / (Math.pow(10, 6) * 6);
                                    if (val < 0) {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                }
                                wansetcountpktsent++;
                            }

                            if (param_name == "PacketsReceived") {
                                var val1 = ParamValue;
                                if (wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Rece: " + wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Rece: " + val1);
                                if (wansetcountsentpktrec > 1) {
                                    var valc = ((val1 - wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")])) / (6);
                                    console.log("Valc is Rece: " + valc);
                                    if (valc < 0) {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc) + " pps";
                                    }
                                    wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val1 = 0;
                                    wanprevDatapktrec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                    val1 = (val1 * 8) / (Math.pow(10, 6) * 6);
                                    if (val1 < 0) {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = 0 + " pps";
                                    }
                                }
                                wansetcountsentpktrec++;
                            }

                            if (param_name == "Status") {
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["statistics" + "popup"] = true;
                        $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["statistics" + "popup"] = true;
                            $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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

    /*NAS(SATA)*/
    var nassetcountsent = 1;
    var nasprevDatasent = {};
    var nassetcountsentrec = 1;
    var nasprevDatarec = {};
    var threshold = 100;
    getNasFormData = function (reqParams, IP) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    $scope.IPAddress = IP.replace(/\./g, "");
                    if (status === 200) {
                        objects = data.Objects;
                        var objectParamValues = objects[0].Param;
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};

                            if (param_name == "BytesSent") {
                                var val = ParamValue;
                                if (nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Sent: " + nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Sent: " + val);
                                if (nassetcountsent > 1) {
                                    var valc = ((val - nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")])) / (Math.pow(10, 6) * 3);
                                    console.log("Valc is sent: " + valc);
                                    if (valc < 1024) {
                                        if (valc < threshold) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = "";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (valc * .91).toFixed(2) + " MBps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc / 1024) + " GBps";
                                    }
                                    nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val = 0;
                                    nasprevDatasent[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val;
                                    val = (val) / (Math.pow(10, 6) * 6);
                                    if (val < 1024) {
                                        if (val < threshold) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = "";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (val * .91).toFixed(2) + " MBps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(val / 1024) + " GBps";
                                    }

                                }
                                nassetcountsent++;
                            }

                            if (param_name == "BytesReceived") {
                                var val1 = ParamValue;
                                if (nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] == undefined) {
                                    nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = 0;
                                }
                                console.log("Prev Val Rece: " + nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")]);
                                console.log("Val is Rece: " + val1);
                                if (nassetcountsentrec > 1) {
                                    var valc = ((val1 - nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")])) / (Math.pow(10, 6) * 3);
                                    console.log("Valc is Rece: " + valc);
                                    if (valc < 1024) {
                                        if (valc < threshold) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = "";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (valc * .91).toFixed(2)+ " MBps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(valc / 1024) + " GBps";
                                    }
                                    nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                }
                                else {
                                    console.log("Entering to else condition");
//                                    val1 = 0;
                                    nasprevDatarec[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = val1;
                                    val1 = (val1) / (Math.pow(10, 6) * 6);
                                    if (val1 < 1024) {
                                        if (val1 < threshold) {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = "";
                                        }
                                        else {
                                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = (val1 * .91).toFixed(2) + " MBps";
                                        }
                                    }
                                    else {
                                        $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = Math.round(val1 / 1024) + " GBps";
                                    }
                                }
                                nassetcountsentrec++;
                            }

                            if (param_name == "Status") {
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["statistics" + "popup"] = true;
                        $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["statistics" + "popup"] = true;
                            $scope["statistics" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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

    /* CPU related code */
    getcpustatus = function (obj1, obj2, IP) {
        var urls = [obj1, obj2];
        var promises = urls.map(function (url) {
            return $http.get(URL + url);
        });
        $q.all(promises).then(function (responses) {
            objects1 = responses[1].data.Objects;
            $scope.clkfrequency = [];
            for (var obj = 0; obj < objects1.length; obj++) {
                var objectParamValues = objects1[obj].Param;
                for (var i = 0; i < objectParamValues.length; i++) {
                    var param_name = objectParamValues[i].ParamName;
                    var param_value = objectParamValues[i].ParamValue;
                    if (param_name === "ClockFrequency") {
                        $scope.clkfrequency = param_value;
                    }
                }
            }
            $scope.clkfrequency = parseInt($scope.clkfrequency);
            $scope.props = {};
            objects2 = responses[0].data.Objects;
            var avgVal = 0;
            for (var obj = 0; obj < objects2.length; obj++) {
                var objectParamValues = objects2[obj].Param;
                for (var i = 0; i < objectParamValues.length; i++) {
                    var param_name = objectParamValues[i].ParamName;
                    var param_value = objectParamValues[i].ParamValue;
                    if (param_name === "CPUCycles") {
                        avgVal = avgVal + parseInt(param_value);
                    }
                }
            }
            //  $scope.cpustatus = avgVal;
            avgVal = Math.round((avgVal * 100) / (Math.pow(10, 6) * $scope.clkfrequency));
            if (avgVal > 100)
            {
                avgVal = 100;
            }
            $scope.cpuload = avgVal + " %";
        });

    };

    /*Core mark calculation*/
    getcpumarkCalculation = function (reqParams, IP) {
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

                            if (param_name == "BytesSent") {
                                $scope.cpustatus = ParamValue;
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["coremark" + "popup"] = true;
                        $scope["coremark" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["coremark" + "popup"] = true;
                            $scope["coremark" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
                    objects = data.Objects;
                    var objectParamValues = objects[0].Param;
                    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                        var param_name = objectParamValues[pa1].ParamName;
                        var ParamValue = objectParamValues[pa1].ParamValue;
                        if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};

                        if (param_name == "Value") {
                            $scope.cpustatus = ParamValue;
                        }
                    }
                });
    };

    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
    /*On Click WAN to LAN*/
    $scope.wantolanactive = true;
    $scope.wantolaninactive = false;
    var wantolanPromise = '';
    $scope.wantolanactivefun = function (value) {
	console.log("wantolanactivefun called")
        $scope.wantolanactive = value;
        $scope.wantolaninactive = true;
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.5.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.5&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.2.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.2&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.3.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.3&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.4.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.4&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.DSL.Line.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.DSL.Line.1&Status=");
        wantolanPromise = $interval(function () {
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.5.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.5&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
       	getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.2.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.2&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.3.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.3&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.4.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.4&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.DSL.Line.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.DSL.Line.1&Status=");
        }, 6000);

    };
    $scope.wantolaninactivefun = function (value) {
        $scope.wantolanactive = true;
        $scope.wantolaninactive = value;
        $interval.cancel(wantolanPromise);
    };

    /*On Click Phone Call*/
    $scope.phonecallactive = true;
    $scope.phonecallinactive = false;
    var phonecallPromise = '';
    $scope.phonecallactivefun = function (value) {
        $scope.phonecallactive = value;
        $scope.phonecallinactive = true;
        phonecallPromise = $interval(function () {

        }, 6000);
    };
    $scope.phonecallinactivefun = function (value) {
        $scope.phonecallactive = true;
        $scope.phonecallinactive = value;
        $interval.cancel(phonecallPromise);
    };

    /*On Click LAN to NAS*/
    $scope.lantonasactive = true;
    $scope.lantonasinactive = false;
    var lantonasPromise = '';
    $scope.lantonasactivefun = function (value) {
        $scope.lantonasactive = value;
        $scope.lantonasinactive = true;
        getNasFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
        getNasFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
        lantonasPromise = $interval(function () {
            getNasFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
            getNasFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
        }, 3000);
    };
    $scope.lantonasinactivefun = function (value) {
        $scope.lantonasactive = true;
        $scope.lantonasinactive = value;
        $interval.cancel(lantonasPromise);
    };

    /*On Click Coremark*/
    $scope.coremarkactive = true;
    $scope.coremarkinactive = false;
    var coremarkPromise = '';
    var coremarkPromise1 = '';
    $scope.coremarkactivefun = function (value) {
        $scope.coremarkactive = value;
        $scope.coremarkinactive = true;
        getcpustatus("cgi_get_fillparams?Object=Device.DeviceInfo.X_LANTIQ_COM_CPUStatus.Processor&CPUCycles=", "cgi_get_fillparams?Object=Device.DeviceInfo.X_LANTIQ_COM_CPUStatus&ClockFrequency=");
        getcpumarkCalculation("cgi_get?Object=Device.Ethernet.Interface.4.Stats&BytesSent=");
        coremarkPromise = $interval(function () {
            getcpustatus("cgi_get_fillparams?Object=Device.DeviceInfo.X_LANTIQ_COM_CPUStatus.Processor&CPUCycles=", "cgi_get_fillparams?Object=Device.DeviceInfo.X_LANTIQ_COM_CPUStatus&ClockFrequency=");
        }, 16000);
        coremarkPromise1 = $interval(function () {
            getcpumarkCalculation("cgi_get?Object=Device.Ethernet.Interface.4.Stats&BytesSent=");
        }, 30000);
    };
    $scope.coremarkinactivefun = function (value) {
        $scope.coremarkactive = true;
        $scope.coremarkinactive = value;
        $interval.cancel(coremarkPromise);
        $interval.cancel(coremarkPromise1);
    };

    /*On Click LAN to WiFi*/
    $scope.lantowifiactive = true;
    $scope.lantowifiinactive = false;
    var lantowifiPromise = '';
    $scope.lantowifiactivefun = function (value) {
        $scope.lantowifiactive = value;
        $scope.lantowifiinactive = true;
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.1.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2.Stats&BytesSent=&BytesReceived=");
        getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.1&Status=");
        getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2&Status=");
        lantowifiPromise = $interval(function () {
            getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1.Stats&BytesSent=&BytesReceived=");
            getWanFormData("cgi_get_fillparams?Object=Device.Ethernet.Interface.1&Status=");
            getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.1.Stats&BytesSent=&BytesReceived=");
            getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2.Stats&BytesSent=&BytesReceived=");
            getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.1&Status=");
            getWanFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2&Status=");
        }, 6000);
    };
    $scope.lantowifiinactivefun = function (value) {
        $scope.lantowifiactive = true;
        $scope.lantowifiinactive = value;
        $interval.cancel(lantowifiPromise);
    };

    /*On Click WiFi Scalability*/
    $scope.wifiscalabilityactive = true;
    $scope.wifiscalabilityinactive = false;
    var wifiscalabilityPromise = '';
    $scope.wifiscalabilityactivefun = function (value) {
        $scope.wifiscalabilityactive = value;
        $scope.wifiscalabilityinactive = true;
        getAppFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2.Stats&PacketsSent=&PacketsReceived=");
        getAppFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2&Status=");
        wifiscalabilityPromise = $interval(function () {
            getAppFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2.Stats&PacketsSent=&PacketsReceived=");
            getAppFormData("cgi_get_fillparams?Object=Device.WiFi.Radio.2&Status=");
        }, 6000);
    };
    $scope.wifiscalabilityinactivefun = function (value) {
        $scope.wifiscalabilityactive = true;
        $scope.wifiscalabilityinactive = value;
        $interval.cancel(wifiscalabilityPromise);
    };
    $scope.$on('$destroy', function () {
        if (angular.isDefined(wantolanPromise)) {
            $interval.cancel(wantolanPromise);
            wantolanPromise = undefined;
        }
        if (angular.isDefined(phonecallPromise)) {
            $interval.cancel(phonecallPromise);
            phonecallPromise = undefined;
        }
        if (angular.isDefined(lantonasPromise)) {
            $interval.cancel(lantonasPromise);
            lantonasPromise = undefined;
        }
        if (angular.isDefined(coremarkPromise)) {
            $interval.cancel(coremarkPromise);
            coremarkPromise = undefined;
        }
        if (angular.isDefined(coremarkPromise1)) {
            $interval.cancel(coremarkPromise1);
            coremarkPromise1 = undefined;
        }
        if (angular.isDefined(lantowifiPromise)) {
            $interval.cancel(lantowifiPromise);
            lantowifiPromise = undefined;
        }
        if (angular.isDefined(wifiscalabilityPromise)) {
            $interval.cancel(wifiscalabilityPromise);
            wifiscalabilityPromise = undefined;
        }
    });
});
