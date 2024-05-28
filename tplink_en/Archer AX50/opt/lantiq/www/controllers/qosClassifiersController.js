myapp.controller("qosClassifiersController", function ($scope, $http, $routeParams, localStorageService, modifyService, $route, $translate, $rootScope, $interval, $q,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
     $(window).resize();
    /* Breadscrumbs Logic starts here */
/*    setTimeout(function () {
        console.log(breadcrumbsdata)
        if (breadcrumbsdata[$route.current.params.param] == undefined) {
            $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));
            if (localStorage.getItem('qosid') == null)
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

                if (localStorage.getItem('qosid') == null)
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
    customchangedFields = [];

    var objectInfo = localStorage.getItem('qosid');
    $scope["qosclassifiersformstatus"] = false;
    $scope.toggleDetails = function ($index) {
        $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
    };
    $scope.customFormToOpen = function (param) {
        location.href = "#/custom/" + param;
    };
    $scope.Cancel = function (param1) {
        localStorage.removeItem('qosid');
        location.href = "#/custom/" + param1;
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
    $scope.toggleClick = function (param) {
        var toggleparam = param.split('.');
        customchangedFields.push(toggleparam[0] + toggleparam[1]);
    };
    $scope.dropdownUrlRequest = function (objectname, paramname, jsonname) {
        if (jsonname.indexOf('cgi_get') > -1) {
            var temparray = [];
            temparray.push({"id": "", "name": "Select"});
            var tempUrls = [];
            var getDropdownData = function (data, status, headers, config) {
                if( status == 200 ){
                    var dropdowndata = data.Objects;
                    angular.forEach(dropdowndata, function (dropObject) {
                        var tempObj = {};
                        var dropParam = dropObject.Param[0].ParamValue;
                        if (dropParam.indexOf(',') > -1) {
                            angular.forEach(dropParam.split(','), function (csv) {
                                var tempObj = {};
                                tempObj.objectname = dropObject.ObjName;
                                tempObj.id = csv;
                                tempObj.name = csv;
                                temparray.push(tempObj);
                            });
                        }
                        else {
                            tempObj.objectname = dropObject.ObjName;
                            tempObj.id = dropParam;
                            tempObj.name = dropParam;
                            temparray.push(tempObj);
                        }
                    });
                }
            };

            var Urlvalues = jsonname.split(',');
            angular.forEach(Urlvalues, function(Urlvalue){
                if(Urlvalue.indexOf('?') > -1){
                    var UrlQueryvalues = Urlvalue.split('?');
                    var UrlObjectValues = UrlQueryvalues[1].split('Object=');
                    angular.forEach(UrlObjectValues, function(UrlObjectValue){
                        if(UrlObjectValue != ""){
                            tempUrls.push($http.get(URL + UrlQueryvalues[0]+'?Object='+UrlObjectValue).
                                success(function (data, status, headers, config) {
                                    getDropdownData(data, status, headers, config);
                                })
                                .error(function (data, status, headers, config) {
                                })
                            );
                        }
                    });
                 }else{
                    tempUrls.push($http.get(URL + Urlvalue).
                        success(function (data, status, headers, config) {
                            getDropdownData(data, status, headers, config);
                        })
                        .error(function (data, status, headers, config) {
                        })
                    );
                }
            });

            $q.all(tempUrls).then(function(){
                $scope[paramname] = temparray;
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                $scope[objectname][paramname] = temparray[0].id;
                $("#dataView").find("dropdown-multiselect").map(function (i)
                {
                    $scope.users = [];
                    $scope.ddvalues = temparray;
                    angular.forEach($scope.ddvalues, function (doc, dropdownIndex) {
                        if (dropdownIndex !== 0)
                            $scope.users.push(doc);
                    });
                });
            });
        }
        else {
            $.getJSON(jsonname + ".json", function (data) {
                $scope[paramname] = data[paramname];
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                if ($scope[paramname][0] !== undefined)
                    $scope[objectname][paramname] = $scope[paramname][0].id;
            });
        }
    };
    if (objectInfo !== null) {
	    setTimeout(function () {
           getFormData("cgi_get?Object=" + localStorage.getItem('qosid'));
		},1000);
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
        if (customchangedFields.indexOf(value) < 0)
            customchangedFields.push(value);
    };
    $scope.Modify = function (event) {
        var portstatus = false;
        $scope["qosclassifiersformstatus"] = true;
        if (event.currentTarget.attributes['formstatus'].value == "true") {

            var deststartport = $scope["DeviceQoSClassification"]["DestPort"];
            var destendport = $scope["DeviceQoSClassification"]["DestPortRangeMax"];
            var sourcestartport = $scope["DeviceQoSClassification"]["SourcePort"];
            var sourceendport = $scope["DeviceQoSClassification"]["SourcePortRangeMax"];
//            if ((destendport != undefined && (deststartport == undefined || deststartport == '')) || (destendport != '' && (deststartport == undefined || deststartport == ''))) {
//                portstatus = false;
//            }
////            if ((sourceendport != undefined || sourceendport != "") && sourcestartport == undefined) {
////                portstatus = false;
////            }
            var sourcestatus = true;
            var destinationstatus = true;
            if (sourcestartport == undefined || sourcestartport == '') {
                if (sourceendport == undefined || sourceendport == '')
                    sourcestatus = true;
                else
                    sourcestatus = false;
            }
            else if ((sourceendport != undefined || sourceendport != '')) {
                if (parseInt(sourceendport) >= parseInt(sourcestartport))
                    sourcestatus = true;
                else
                    sourcestatus = false;
            }
            if (deststartport == undefined || deststartport == '') {
                if (destendport == undefined || destendport == '')
                    destinationstatus = true;
                else
                    destinationstatus = false;
            }
            else if ((destendport != undefined || destendport != '')) {
                if (parseInt(destendport) >= parseInt(deststartport))
                    destinationstatus = true;
                else
                    destinationstatus = false;
            }

            if ((sourcestatus && destinationstatus)) {
                $('#ajaxLoaderSection').show();
                if (objectInfo === null)
                    objectInfo = "Device.QoS.Classification";
//        else
//            objectInfo = localStorage.getItem('qosid')
                urlstatus = false;
                var post = '';
                var url = URL + "cgi_set";
                var formobjects = ["Device.QoS.Classification.*"];
                angular.forEach(formobjects, function (object) {
                    var objectlevelurlstatus = false;
                    var postobject = "Object=" + objectInfo + "&Operation=" + event.currentTarget.attributes["id"].value;
                    angular.forEach($scope[object.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                        if (customchangedFields.indexOf(object.replace(/\./g, "").replace(/\*/g, "") + key) > -1) {
                            objectlevelurlstatus = true;
                            urlstatus = true;
							if (value === '' && event.currentTarget.attributes["id"].value === "Add");
                           	else
								postobject += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
                        }
                    });
                    if (objectlevelurlstatus)
                        post += postobject + ",";
                });
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');


                if (urlstatus) {
                    //alert(post);
                    $http.post(url, post).
                            success(function (data, status, headers, config) {
                                if (status === 200) {
                                    localStorage.removeItem('qosid');
                                    $scope.Cancel('qospage');
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
                                    localStorage.setItem('qosclassifierstatus', true);
                                    localStorage.setItem('qosclassifiermessage', data.Objects[0].Param[0].ParamValue);
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
            else {
                $('#ajaxLoaderSection').hide();
                alert("Please check Port Range values");
            }

        }
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
    
    $scope.$on('$destroy', function () {
      if (localStorage.getItem('qosid') != null) {
          localStorage.removeItem('qosid');
      }  
    });
    
});

myapp.directive("customHiddenDomRemoval", function () {
    function link(scope, element, attrs) {
        scope.$on("$destroy",
                function handleDestroyEvent() {
                    var ngmodelname = attrs["ngModel"].split('.');
                    if (scope[ngmodelname[0]] != undefined) {
                        if (scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] != undefined)
                            scope[ngmodelname[0]][ngmodelname[1]] = scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"];
                        var modelindex = customchangedFields.indexOf(ngmodelname[0] + ngmodelname[1]);
                        if (modelindex > -1)
                            customchangedFields.splice(modelindex, 1);
                    }
                }
        );

        element.bind('focus', function () {
            var model = attrs.ngModel.split('.');
            if (scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] == undefined) {
                scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] = element.val();
            }
        });
    }
    return({
        link: link,
        restrict: "C"
    });
});
