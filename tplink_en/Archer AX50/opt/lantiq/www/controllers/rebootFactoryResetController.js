myapp.controller("rebootFactoryResetController", function ($scope, $http, $route, $translate, $rootScope, $interval) {
    
    /* Breadscrumbs Logic starts here */
 /*   setTimeout(function () {
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
    var url = URL + "cgi_action";
    var action = "Action=";
    $scope.Reboot = function(event) {
    var answer = confirm("Alert !! System will Reboot immediately");
            if (!answer) {
              event.preventDefault();
            }
            else{
        $('#ajaxLoaderSection').show();
        var post = action + "Reboot";
        //alert(post);
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
//                        $route.reload();
                        setTimeout(function () {
                            $('#ajaxLoaderSection').hide();
                            location.href = "#/";
                        }, 180000);
                    }
                    else if (status === 203) {
                        $('#ajaxLoaderSection').hide();
                        $scope["rebootformname" + "popup"] = true;
                        $scope["rebootformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["rebootformname" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["rebootformname" + "popupval"] = popupvalue;
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log("from error block");
                    $('#ajaxLoaderSection').hide();
                });
                }
    };
    $scope.factoryReset = function (event) {
    var answer = confirm("Alert !! All the previous configuration will be lost. Press OK to confirm");
      if (!answer) {
            event.preventDefault();
       }
       else{
        $('#ajaxLoaderSection').show();
        var post = action + "FactoryReset";
        //alert(post);
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
//                        $route.reload();
                        setTimeout(function () {
                            $('#ajaxLoaderSection').hide();
                            location.href = "#/";
                        }, 180000);
                    }
                    else if (status === 203) {
                        $('#ajaxLoaderSection').hide();
                        $scope["factoryresetformname" + "popup"] = true;
                        $scope["factoryresetformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["factoryresetformname" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["factoryresetformname" + "popupval"] = popupvalue;
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log("from error block");
                    $('#ajaxLoaderSection').hide();
                });
    };
    }
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});
