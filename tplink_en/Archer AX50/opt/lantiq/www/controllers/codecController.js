myapp.controller('codeController', function ($scope, $route, $http, $location, localStorageService, modifyService, $translate, $rootScope, $interval) {
   $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    $scope.codecs = [];
    /* Breadscrumbs Logic starts here */
/*    setTimeout(function () {
        console.log(breadcrumbsdata)
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
        }
        console.log($rootScope["breadcrumbs"])
    }, 100);*/
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
$http.get(URL + "cgi_get_fillparams?Object=Device.Services.VoiceService.1.VoiceProfile.1.Line.1.Codec.List&Codec=").success(function (data, status) {
       if (status == 200) {
        angular.forEach(data.Objects, function (object) {
       $scope.codecs.push(object.Param[0].ParamValue);
      })
       console.log($scope.codecs)
       }
    })
     $scope.getHtml = function (counter) {
             console.log(counter)
                     return 'codec.' + counter;
                         }
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
    $scope["codecparams"] = [];
    $scope["codecparams1"] = [];
    var checkboxListArray = [];
//    $scope["lines"] = ["Line0", "Line1", "Line2", "Line3"]
    var checkboxarray = [];
    $http.get(URL + "cgi_get?Object=Device.Services.VoiceService.1.VoiceProfile.1.Line").success(function (data,status) {
        if (status === 200) {
            var objparams = ["Enable", "Codec", "Priority"];
            var reqobject = ["Device.Services.VoiceService.*.VoiceProfile.*.Line.*.Codec.List.*"]
            var objects = data.Objects;
            var linestatus = 1;
            var rowindex = 0;
            $scope.rows = [];
            $scope.rows[rowindex] = [];
            $scope.rows1 = [];
            $scope.rows1[rowindex] = [];
            console.log(objects)
            angular.forEach(objects, function (object) {
                 console.log(modifyService.dotstarremove(angular.copy(object.ObjName), '.*'))
                if (reqobject.indexOf(modifyService.dotstarremove(angular.copy(object.ObjName), '.*')) > -1) {
                    linestatus += 1;
                    if (linestatus == $scope.codecs.length + 2) {
                        rowindex += 1
                        linestatus = 2;
                    }
                    var tempobject = {};
                    var tempobject1 = {};
                    tempobject["objectname"] = object.ObjName;
                    tempobject1["objectname"] = object.ObjName;
                    var params = object.Param;
                    angular.forEach(params, function (param) {
                        var param_name = param.ParamName;
                        var param_value = param.ParamValue;
                        if (objparams.indexOf(param_name) > -1) {
                            if (objparams.indexOf(param_name) == 0) {
                                tempobject1[param_name] = param_value
                                tempobject[param_name] = param_value;
                            }
                            else if (objparams.indexOf(param_name) == 2) {
                                tempobject1[param_name] = param_value
                                tempobject[param_name] = parseInt(param_value);
                            }
                            else if (objparams.indexOf(param_name) == 1)
                                tempobject[param_name] = param_value;
                        }
                    })
//                $scope["codecparams"].push(tempobject);
//                $scope["codecparams1"].push(tempobject1)
                    if ($scope.rows[rowindex] == undefined) {
                        $scope.rows[rowindex] = [];
                    }
                    if ($scope.rows1[rowindex] == undefined) {
                        $scope.rows1[rowindex] = [];
                    }
                    $scope.rows[rowindex].push(tempobject)
                    $scope.rows1[rowindex].push(tempobject1)
                    console.log(tempobject)
                }

            })
        }
        else if (status === 203) {
            $scope["codecpage" + "popup"] = true;
            $scope["codecpage" + "popupval"] = data.Objects[0].Param[0].ParamValue;
        }
        else if (status === 206) {
            if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                $scope["codecpage" + "popup"] = true;
                $scope["codecpage" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else {
                var popupvalue = '';
                angular.forEach(data.Objects, function (object) {
                    $scope["codecpage" + "popup"] = true;
                    angular.forEach(object.Param, function (param) {
                        popupvalue += param.ParamName + ":" + param.ParamValue;
                    });
                });
                $scope["codecpage" + "popupval"] = popupvalue;
            }
        }
    })
    $scope.checkboxChange = function (object, value) {
        var index = checkboxarray.indexOf(object);
        if (index > -1) {
            checkboxListArray[index][object] = value;
        } else {
            checkboxarray.push(object);
            var checkboxobject = {};
            checkboxobject[object] = value;
            checkboxListArray.push(checkboxobject)
        }
    }
    $scope.codecApply = function () {
        $rootScope.initialtime=Date.now();
        var length = checkboxListArray.length;
        var url = URL + "cgi_set";
        var post = '';
        angular.forEach(checkboxListArray, function (checkobject) {
            angular.forEach(checkobject, function (value, param) {
                post += "Object=" + param + "&Operation=Modify&" + "Enable=" + value + ","
            })
        })
        post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        //alert(post)
        if (length > 0)
//            modifyService.setRequest(url, post);
        {
            modifyService.genericRequest(url, post, function (response) {
                errorResponseDisplay("codecapply", response);
            });
        }
        else
            alert("no changes done to call set request")
    }
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
                    popupvalue += param.ParamValue;
                });
            });
            $scope[formname + "popupval"] = popupvalue;
        }
    }

    $scope.editcodecpriority = function (param, index) {
        localStorage.setItem('priorityIndex', index)
        location.href = "#/custom/" + param;
    }
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
})
