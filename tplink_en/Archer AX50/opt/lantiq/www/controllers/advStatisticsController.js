myapp.controller("advStatisticsController", function ($scope, $http, $route, $translate, $rootScope, mySharedService, $interval) {
//    $("#ajaxLoaderSection").show();
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

    var objectInfo = localStorage.getItem('hybrideditObject');
    console.log(localStorage.getItem('hybrideditObject'));

    getTableData = function (reqParams) {
        console.log("Called");
        $scope.tableData = [];
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope.tableData = [];
                        $scope.params = ["MACAddress", "AuthenticationState", "LastDataDownlinkRate", "LastDataUplinkRate", "SignalStrength", "Retransmissions", "Active"];
                        tabobject = data.Objects[0];
                        tabobjectparams = tabobject.Param;
                        console.log(data.Objects[0])
                        for (var i = 0; i < tabobjectparams.length; i++) {
                            var param_name = tabobjectparams[i].ParamName;
                            var param_value = tabobjectparams[i].ParamValue;
                            if ($scope["params"].indexOf(param_name) > -1) {
                                var tempObject = {};
                                tempObject[param_name] = param_value;
                                $scope.tableData.push(tempObject);
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
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["statistics" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["statistics" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };

    if (objectInfo !== null) {
        getTableData("cgi_get_nosubobj?Object=" + localStorage.getItem('hybrideditObject'));
        mySharedService.setObject(objectInfo);
    }

    $scope.back = function (param1) {
        location.href = "#/tableform/" + param1;
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
    $scope.$on('$destroy', function () {
        console.log("conncection closed berfor lowsdlf")
        ws_throughput.close();
        
    });
});


