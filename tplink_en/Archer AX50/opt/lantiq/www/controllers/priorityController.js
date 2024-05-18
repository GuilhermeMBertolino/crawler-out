myapp.controller('priorityController', function ($scope, $route, $http, $location, localStorageService, modifyService, $translate, $rootScope, $interval,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
    /* Breadscrumbs Logic starts here */
   var jsonpromise = $interval(function () {
        console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('priorityIndex') == null)
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
    var tmpList = [];
    var tablist = [];
    var changestatus = false;
    var textboxarray = [];
    $scope.dyamicpayloadtypearray = ["G726_16", "G726_24", "G726_32", "G726_40"];
    var object = "Device.Services.VoiceService.1.VoiceProfile.1.Line." + localStorage.getItem('priorityIndex') + ".Codec.List";
    if (localStorage.getItem('priorityIndex') != null) {
        $http.get(URL + "cgi_get?Object=" + object).success(function (data,status) {
            if (status === 200) {
                var objparams = ["Codec", "Priority", "PacketizationPeriod", "X_VENDOR_COM_PayloadType"];
                var objects = data.Objects;
                angular.forEach(objects, function (object) {
                    var tempobject = {};
                    var tempobject1 = {};
                    tempobject["value"] = object.ObjName;
                    tempobject1["value"] = object.ObjName;
                    var params = object.Param;
                    angular.forEach(params, function (param) {
                        var param_name = param.ParamName;
                        var param_value = param.ParamValue;
                        if (objparams.indexOf(param_name) > -1) {
                            if (objparams.indexOf(param_name) == 0) {
                                tempobject["displayname"] = param_value;
                                tempobject1["displayname"] = param_value;
                            }
                            else if (objparams.indexOf(param_name) == 1)
                                tempobject["priority"] = parseInt(param_value);
                            else {
                                tempobject1[param_name] = param_value;
                            }
                        }
                    });
                    tmpList[tempobject["priority"] - 1] = tempobject;
                    tablist.push(tempobject1)
                })
            }
            else if (status === 203) {
                $scope["custompriority" + "popup"] = true;
                $scope["custompriority" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["custompriority" + "popup"] = true;
                    $scope["custompriority" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["custompriority" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["custompriority" + "popupval"] = popupvalue;
                }
            }
        })
    }

    $scope.textboxChange = function (param1, param2, param3) {
        if (textboxarray.indexOf(param1) == -1)
            textboxarray.push(param1)
        var obj = param1.replace(/\./g, "").replace(/\*/g, "");
        if ($scope[obj] == undefined)
            $scope[obj] = {};
        $scope[obj][param2] = param3;

    }
    $scope.list = tmpList;
    $scope.tablist = tablist;
    $scope.sortableOptions = {
        update: function (e, ui) {
            var logEntry = tmpList.map(function (i) {
                return i.value;
            }).join(', ');
//            $scope.sortingLog.push('Update: ' + logEntry);
        },
        stop: function (e, ui) {
            changestatus = true;
            // this callback has the changed model
            var logEntry = tmpList.map(function (i) {
                return i.value;
            }).join(', ');
            console.log(logEntry)
            $scope.sortingLog = logEntry;
        }
    };
    $scope.Apply = function () {
        console.log(textboxarray);
        var url = URL + "cgi_set";
        var post = '';
        if ($scope.sortingLog != undefined) {
            angular.forEach($scope.sortingLog.split(','), function (obj, index) {
                var index = parseInt(index) + 1;
                console.log(index)
                post += "Object=" + obj.trim() + "&Operation=Modify&Priority=" + index + ","
            })
        }
        angular.forEach(textboxarray, function (textboxobject) {
            changestatus = true;
            post += "Object=" + textboxobject + "&Operation=Modify"
            var obj = textboxobject.replace(/\./g, "").replace(/\*/g, "");
            angular.forEach($scope[obj], function (value, key) {
                post += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
            })
            post += ","
        })
        post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        //alert(post)
        if (changestatus) {
            $http.post(url, post).
                    success(function (data, status, headers, config) {
                        if (status === 200) {
                            $('#ajaxLoaderSection').hide();
                            location.href = "#/custom/codec"
                        }
                        else if (status === 203) {
                            $('#ajaxLoaderSection').hide();
                            $scope["prioritypostformname" + "popup"] = true;
                            $scope["prioritypostformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else if (status === 206) {
                            if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                                $scope["prioritypostformname" + "popup"] = true;
                                $scope["prioritypostformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                            }
                            else {
                                var popupvalue = '';
                                angular.forEach(data.Objects, function (object) {
                                    $scope["prioritypostformname" + "popup"] = true;
                                    angular.forEach(object.Param, function (param) {
                                        popupvalue += param.ParamName + ":" + param.ParamValue;
                                    });
                                });
                                $scope["prioritypostformname" + "popupval"] = popupvalue;
                            }
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
        else
            alert("no changes done to call set request")
    }
    $scope.cancel = function () {
        localStorage.removeItem('priorityIndex');
        location.href = "#/custom/codec"
    }
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
})