
myapp.controller('callregisterController', function ($scope, $route, $http, $location, localStorageService, modifyService, $translate, $rootScope, $interval) {
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
    $scope.callregister = function (scopevariable, clickedtab, req) {
        console.log(scopevariable);
        console.log(clickedtab)
        $scope[scopevariable] = clickedtab;
        var reqobjects = req.split('&');
        var finalobject = '';
        var reqobjectsarray = ["Device.Services.VoiceService.1.VoiceProfile.1.Line.1.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", "Device.Services.VoiceService.1.VoiceProfile.1.Line.1.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", "Device.Services.VoiceService.1.VoiceProfile.1.Line.1.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*","Device.Services.VoiceService.1.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*","Device.Services.VoiceService.1.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*","Device.Services.VoiceService.1.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*"];
        var reqobjectsarray1 = ["Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", "Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", "Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*","Device.Services.VoiceService.*.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*","Device.Services.VoiceService.*.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*","Device.Services.VoiceService.*.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*"];
        angular.forEach(reqobjects, function (reqobject) {
            var req = reqobject.split('?')
            var object = req[0]
            //reqobjectsarray.push(object);
            var objparams = req[1].split(',')
            var index = reqobjectsarray.indexOf(object);
            $scope[reqobjectsarray1[index] + "params"] = objparams;
            finalobject += "Object=" + object.split('.*')[0] + ","
        })

        /* angular.forEach(modifyService.split(angular.copy(reqobjects)), function (obj) {
         finalobject += "Object=" + obj.split('.*')[0] + ","
         })*/

        finalobject = finalobject.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        $scope['callregisterarray'] = [];
        $http.get(URL + "cgi_get?" + finalobject).success(function (data,status) {
            if (status === 200) {
                var objects = data.Objects;
                angular.forEach(objects, function (object) {
                    var objectname = modifyService.dotstarremove(object.ObjName, '.*')
                    if (reqobjectsarray1.indexOf(objectname) > -1) {
                        var tempobj = {};
                        angular.forEach(object.Param, function (params) {
                            var param_name = params.ParamName;
                            var param_value = params.ParamValue;
                            console.log(objectname + "params")
                            if ($scope[objectname + "params"].indexOf(param_name) > -1) {
                                tempobj[param_name] = param_value
                            }
                        })

                        $scope['callregisterarray'].push(tempobj);
                    }
                })
            }
            else if (status === 203) {
                $scope["callregister" + "popup"] = true;
                $scope["callregister" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["callregister" + "popup"] = true;
                    $scope["callregister" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["callregister" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["callregister" + "popupval"] = popupvalue;
                }
            }

        })
        $scope["pstllinecallhistoryobject"] = finalobject.split('=')[1];
    }
    $scope.linecallregister = function (scopevariable, clickedtab, req, subrequest) {
        var lineinstance = req;
        $scope[scopevariable] = clickedtab;
        var req = req + "." + subrequest;
        var reqobjects = req.split('&');
        var finalobject = '';
        var reqobjectsarray = [lineinstance + ".X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", lineinstance + ".X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", lineinstance + ".X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*"];
        var reqobjectsarray1 = ["Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", "Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", "Device.Services.VoiceService.*.VoiceProfile.*.Line.*.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*"];
        angular.forEach(reqobjects, function (reqobject) {
            var req = reqobject.split('?')
            var object = req[0]
            //reqobjectsarray.push(object);
            var objparams = req[1].split(',')
            var index = reqobjectsarray.indexOf(object);
            $scope[reqobjectsarray1[index] + "params"] = objparams;
            finalobject += "Object=" + object.split('.*')[0] + ","
        })

        /* angular.forEach(modifyService.split(angular.copy(reqobjects)), function (obj) {
         finalobject += "Object=" + obj.split('.*')[0] + ","
         })*/

        finalobject = finalobject.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        $scope[lineinstance.replace(/\./g, "")] = [];

//        $scope[lineinstance] = [];
        $http.get(URL + "cgi_get?" + finalobject).success(function (data,status) {
            if (status === 200) {
                var objects = data.Objects;
                angular.forEach(objects, function (object) {
                    var objectname = modifyService.dotstarremove(object.ObjName, '.*')
                    if (reqobjectsarray1.indexOf(objectname) > -1) {
                        var tempobj = {};
                        angular.forEach(object.Param, function (params) {
                            var param_name = params.ParamName;
                            var param_value = params.ParamValue;
                            if ($scope[objectname + "params"].indexOf(param_name) > -1) {
                                tempobj[param_name] = param_value
                            }
                        })

                        $scope[lineinstance.replace(/\./g, "")].push(tempobj);
//                    $scope[lineinstance].push(tempobj);
                    }
                })
            }
            else if (status === 203) {
                $scope["linecallregister" + "popup"] = true;
                $scope["linecallregister" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["linecallregister" + "popup"] = true;
                    $scope["linecallregister" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["linecallregister" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["linecallregister" + "popupval"] = popupvalue;
                }
            }
        })
        angular.forEach($scope["lines"], function (line) {
            if (line.objname == lineinstance) {
                line.activetab = finalobject.split('=')[1];
            }
        })
    }
    $http.get(URL + "cgi_get_nosubobj?Object=Device.Services.VoiceService.1.VoiceProfile.1.Line").success(function (data,status) {
        if (status === 200) {
            $scope["lines"] = [];
            $scope["linestatus"] = [];
            angular.forEach(data.Objects, function (object, index) {
                var tempobj = {};
                tempobj["objname"] = object.ObjName;
                $scope["lines"].push(tempobj);


                $scope["linestatus"].push("linestatus" + index);
                $scope["linestatus" + index] = 'missedcall';
            })
            console.log($scope["lines"])
        }
        else if (status === 203) {
            $scope["lines" + "popup"] = true;
            $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
        }
        else if (status === 206) {
            if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                $scope["lines" + "popup"] = true;
                $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else {
                var popupvalue = '';
                angular.forEach(data.Objects, function (object) {
                    $scope["lines" + "popup"] = true;
                    angular.forEach(object.Param, function (param) {
                        popupvalue += param.ParamName + ":" + param.ParamValue;
                    });
                });
                $scope["lines" + "popupval"] = popupvalue;
            }
        }

    });
    $scope.replacedigit = function (value) {
        return $scope[value.replace(/\./g, "")];
    }
    $scope.historydelete = function (event) {
		var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        }
		else{
			$("#ajaxLoaderSection").show();
        var url = URL + "cgi_set";
        var post = '';
        var deleteobject = $scope[event.currentTarget.attributes['id'].value];
        $http.get(URL + "cgi_get?Object=" + deleteobject).success(function (data,status) {
            if (status === 200) {
				$("#ajaxLoaderSection").hide();
                if (!(data.hasOwnProperty('status'))) {
                    var objects = data.Objects;
                    angular.forEach(objects, function (object) {
                        post += "Object=" + object.ObjName + "&Operation=Del" + "&";
                    });
                    console.log(post)
                    // modifyService.setRequest(url, post)
                }
            }
            else if (status === 203) {
                $scope["lines" + "popup"] = true;
                $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				$("#ajaxLoaderSection").hide();
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["lines" + "popup"] = true;
                    $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["lines" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["lines" + "popupval"] = popupvalue;
                }
				$("#ajaxLoaderSection").hide();
            }
        });
		}
    }

    $scope.linedelete = function (event) {
		var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        }
		else{
			$("#ajaxLoaderSection").show();
        var url = URL + "cgi_set";
        var deleteobject = event.currentTarget.attributes['id'].value;
        var post = '';
        $http.get(URL + "cgi_get?Object=" + deleteobject).success(function (data,status) {
            if (status === 200) {
				$("#ajaxLoaderSection").hide();
                if (!(data.hasOwnProperty('status'))) {
                    var objects = data.Objects;
                    angular.forEach(objects, function (object) {
                        post += "Object=" + object.ObjName + "&Operation=Del" + "&";
                    });
                    console.log(post)
                    modifyService.setRequest(url, post)
                }
            }
            else if (status === 203) {
                $scope["lines" + "popup"] = true;
                $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
				$("#ajaxLoaderSection").hide();
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["lines" + "popup"] = true;
                    $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["lines" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["lines" + "popupval"] = popupvalue;
                }
				$("#ajaxLoaderSection").hide();
            }
        });
		}
    }
    $scope.deleteAll = function (event) {
		var answer = confirm("Are you sure you want to Delete All?")
        if (!answer) {
            event.preventDefault();
        }
		else{
			$("#ajaxLoaderSection").show();
        var post = '';
        var deletearray = [];
        var url = URL + "cgi_set";
        var callregisterentries = ["X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry", "X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry", "X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry"]
        var initialvalue = event.currentTarget.attributes['id'].value;
        angular.forEach(callregisterentries, function (entry) {
            $http.get(URL + "cgi_get?Object=" + initialvalue + "." + entry).success(function (data,status) {
                if (status === 200) {
					$("#ajaxLoaderSection").hide();
                    if (!(data.hasOwnProperty('status'))) {
                        var objects = data.Objects;
                        angular.forEach(objects, function (object) {
                            deletearray.push(object.ObjName);
                        });
                    }
                }
                else if (status === 203) {
                    $scope["lines" + "popup"] = true;
                    $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
					$("#ajaxLoaderSection").hide();
                }
                else if (status === 206) {
                    if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                        $scope["lines" + "popup"] = true;
                        $scope["lines" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["lines" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["lines" + "popupval"] = popupvalue;
                    }
					$("#ajaxLoaderSection").hide();
                }
            });
        })
        setTimeout(function () {
            angular.forEach(deletearray, function (deleteobject) {
                post += "Object=" + deleteobject + "&Operation=Del" + "&";
            });
            console.log(post)
            modifyService.setRequest(url, post);
        }, 1000)
    }
	}
        
        $scope.popupclose = function (scopeparam) {
            $scope[scopeparam] = false;
        }
});