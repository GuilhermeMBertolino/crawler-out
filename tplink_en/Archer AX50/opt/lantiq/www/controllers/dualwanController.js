myapp.controller("dualwanController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $interval) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    $scope.multiwanobjects = [];
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

    $scope.formToOpen = function (param) {
        location.href = "#/custom/" + param;
    };

    $scope.edit = function (event, formToopen) {
        localStorage.setItem('hybrideditObject', event.currentTarget.attributes["id"].value)
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
            modifyService.genericRequest(url, post, function (response) {
                errorResponseDisplay("wanconnectionsdelete", response);
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

    getwanConnections = function (reqParams) {
        var reqdataarray = [];
        $scope.tableDataArray = [];
        $scope.tablevalues = [];
        var post = 'cgi_get?';
        var reqdata = reqParams.split('&');
        angular.forEach(reqdata, function (reqobject) {
            var req = reqobject.split('?');
            var indobj = req[0];
            reqdataarray.push(indobj);
            var indobjparams = req[1].split(',');
            angular.forEach(indobjparams, function (param) {
                if ($scope[indobj + "params"] === undefined)
                    $scope[indobj + "params"] = [];
                $scope[indobj + "params"].push(param);
            });
        });
        var reqdataunique = modifyService.split(angular.copy(reqdataarray));
        angular.forEach(reqdataunique, function (parameter) {
            post += "Object=" + parameter.split(".*")[0] + ",";
        });
        post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        $http.get(URL + post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objobjname = objects[obj].ObjName;
                            var objectindex = reqdataarray.indexOf(modifyService.dotstarremove(objobjname, '.*'));
                            if (objectindex > -1) {
                                if (objectindex === 0) {
                                    $scope.multiwanobjects.push(objects[obj].ObjName)
                                    var objectParamValues = objects[obj].Param;
                                    for (var i = 0; i < objectParamValues.length; i++) {
                                        var param_name = objectParamValues[i].ParamName;
                                        var param_value = objectParamValues[i].ParamValue;
                                        if (param_name === "WANConnectionsNumberOfEntries") {
                                            if ($scope[reqdataarray[objectindex] + "data"] === undefined)
                                                $scope[reqdataarray[objectindex] + "data"] = [];
                                            if (param_value !== " ")
                                                $scope[reqdataarray[objectindex] + "data"].push(parseInt(param_value));
                                        }
                                        else if (param_name === "Name") {
                                            if ($scope[reqdataarray[objectindex] + "tbdata"] === undefined)
                                                $scope[reqdataarray[objectindex] + "tbdata"] = [];
                                            $scope[reqdataarray[objectindex] + "tbdata"].push(param_value);
                                        }
                                    }
                                }
                                if (objectindex === 1) {
                                    var objectParamValues = objects[obj].Param;
                                    for (var i = 0; i < objectParamValues.length; i++) {
                                        var param_name = objectParamValues[i].ParamName;
                                        var param_value = objectParamValues[i].ParamValue;
                                        if (param_name === "Name") {
                                            if ($scope[reqdataarray[objectindex] + "tbdata"] === undefined)
                                                $scope[reqdataarray[objectindex] + "tbdata"] = [];
                                            $scope[reqdataarray[objectindex] + "tbdata"].push(param_value);
                                        }
                                    }
                                }
                                if (objectindex === 2) {
                                    var objectParamValues = objects[obj].Param;
                                    for (var i = 0; i < objectParamValues.length; i++) {
                                        var param_name = objectParamValues[i].ParamName;
                                        var param_value = objectParamValues[i].ParamValue;
                                        if (param_name === "Interface") {
                                            if ($scope[reqdataarray[objectindex] + "tbdata"] === undefined)
                                                $scope[reqdataarray[objectindex] + "tbdata"] = [];
                                            $scope[reqdataarray[objectindex] + "tbdata"].push(param_value);
                                        }
                                        if (param_name === "WANStatus") {
                                            if ($scope[reqdataarray[objectindex] + "tbdata"] === undefined)
                                                $scope[reqdataarray[objectindex] + "tbdata"] = [];
                                            $scope[reqdataarray[objectindex] + "tbdata"].push(param_value);
                                        }
                                    }
                                }

                            }

                        }

                        var name = ($scope[reqdataarray[0] + "tbdata"]);
                        var type = ($scope[reqdataarray[1] + "tbdata"]);
                        var wanconnections = ($scope[reqdataarray[2] + "tbdata"]);
                        var noofnames = $scope[reqdataarray[0] + "data"];
                        var noofwanconnections = $scope[reqdataarray[0] + "data"];

                        var Arr2 = [], Arr3 = [];
                        for (i = 0; i < wanconnections.length; i++) {
                            if ((i + 2) % 2 === 0) {
                                Arr3.push(wanconnections[i]);
                            }
                            else {
                                Arr2.push(wanconnections[i]);
                            }
                        }
                        $scope.str = [];
                        for (var i = 0; i < noofwanconnections.length; i++)
                        {
                            $scope.str = [];
                            for (var j = 0; j < noofwanconnections[i]; j++)
                            {
                                var wanobject = {};
                                wanobject["interfacename"] = Arr3[j];
                                wanobject["interfacestatus"] = Arr2[j];
                                $scope.str.push(wanobject);
                            }
                            Arr3.splice(0, noofwanconnections[i]);
                            Arr2.splice(0, noofwanconnections[i]);
                            var rowname = name[0];
                            var rowtype = type[0];
                            var tempobj = {};
                            for (var pool = 0; pool < noofnames.length; pool++) {
                                tempobj["Name"] = rowname;
                                tempobj["Type"] = rowtype;
                                for (var claddress = 0; claddress < noofwanconnections[pool]; claddress++) {
                                    tempobj["Name"] = rowname;
                                    tempobj["Type"] = rowtype;
                                }
                            }
                            type.splice(0, 1);
                            name.splice(0, 1);
                            tempobj["waninfo"] = $scope.str;
                            $scope.tablevalues.push(tempobj);      
                            console.log("$scope.tablevalues.waninfo",$scope.tablevalues[0].waninfo);
                            for(var wi=0 ; wi < $scope.tablevalues[0].waninfo.length ; wi++) {
                                var tempfun = function(wi){ 
                                    $http.get(URL + 'cgi_get_filterbyfirstparamval?Object=Device.X_LANTIQ_COM_NwHardware.WANConnection&UciSection='+$scope.tablevalues[0].waninfo[wi].interfacename+'&ConnectionName=').
                                    success(function (data, status, headers, config) {
                                        console.log("data.Objects.Param[0].ParamValue",data.Objects[0].Param[0].ParamValue); 
                                        $scope.tablevalues[0].waninfo[wi].interfacename = data.Objects[0].Param[0].ParamValue;                                    
                                    });
                                }
                                tempfun(wi);
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["wanconnections" + "popup"] = true;
                        $scope["wanconnections" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["wanconnections" + "popup"] = true;
                            $scope["wanconnections" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["wanconnections" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["wanconnections" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getwanConnections("Device.X_LANTIQ_COM_Multiwan.Multiwan.*?Name&Device.X_LANTIQ_COM_Multiwan.Multiwan.*.Type?Name&Device.X_LANTIQ_COM_Multiwan.Multiwan.*.WANConnections.*?Interface,WANStatus");
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };

});