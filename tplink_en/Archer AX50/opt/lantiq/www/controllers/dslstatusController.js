myapp.controller('dslstatusController', function ($translate, $scope, $route, $rootScope, $interval, $http, modifyService) {
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
    }, 10);*/
			 var jsonpromise = $interval(function () {
//        console.log(breadcrumbsdata)
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
//        console.log($rootScope["breadcrumbs"])

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
    
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectname = modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if (param_name == "LineNumberOfEntries") {
                                    $scope.noOfDslEntries = ParamValue;
                                }
                            }
                            console.log("$scope.noOfDslEntries",$scope.noOfDslEntries);
                        }
                    }
                    else if (status === 203) {
                        $scope["multiwanform" + "popup"] = true;
                        $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["multiwanform" + "popup"] = true;
                            $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
    getFormData("cgi_get_fillparams?Object=Device.DSL");

});


