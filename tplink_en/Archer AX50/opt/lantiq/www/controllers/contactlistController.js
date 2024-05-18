myapp.controller('contactlistController', function ($scope, $route, $http, $location, localStorageService, modifyService, $translate, $rootScope, $interval,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
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
    var contactlistfields = [];
    $scope.objectnames = ["Device.Services.VoiceService.1.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_ContactList.X_VENDOR_COM_ContactListEntry"];
    $http.get(URL + "cgi_get_nosubobj?Object=Device.Services.VoiceService.1.VoiceProfile.1.Line").success(function (data,status) {
        if (status === 200) {
            angular.forEach(data.Objects, function (objects) {
                $scope.objectnames.push(objects.ObjName);
            })
        }
        else if (status === 203) {
            $scope["voiceprofile" + "popup"] = true;
            $scope["voiceprofile" + "popupval"] = data.Objects[0].Param[0].ParamValue;
        }
        else if (status === 206) {
            if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                $scope["voiceprofile" + "popup"] = true;
                $scope["voiceprofile" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else {
                var popupvalue = '';
                angular.forEach(data.Objects, function (object) {
                    $scope["voiceprofile" + "popup"] = true;
                    angular.forEach(object.Param, function (param) {
                        popupvalue += param.ParamName + ":" + param.ParamValue;
                    });
                });
                $scope["voiceprofile" + "popupval"] = popupvalue;
            }
        }

    });
    setTimeout(function () {
        $scope.dotremoval = [];
        angular.forEach($scope.objectnames, function (arrayobject, index) {
            var dotremovalobject = {};
            var dotremove = arrayobject.replace(/\./g, "").replace(/\*/g, "");
            $scope[dotremove + 'status'] = false;
            dotremovalobject["status"] = $scope[dotremove + 'status'];
            dotremovalobject["params"] = ["X_VENDOR_COM_UserFirstName", "X_VENDOR_COM_UserLastName", "X_VENDOR_COM_ContactNum", "X_VENDOR_COM_ContactNumTwo"]

            $scope[dotremove + "Objects"] = [];
            dotremovalobject["Objects"] = $scope[dotremove + "Objects"];
            if (index > 0) {
                $http.get(URL + "cgi_get?Object=" + arrayobject + "&X_VENDOR_COM_Name=").success(function (data,status) {
                    if (status === 200) {
                        dotremovalobject["contactlistname"] = data.Objects[0].Param[0].ParamValue + " - Contact List";
                    }
                    else if (status === 203) {
                        $scope["contactlist" + "popup"] = true;
                        $scope["contactlist" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["contactlist" + "popup"] = true;
                            $scope["contactlist" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["contactlist" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["contactlist" + "popupval"] = popupvalue;
                        }
                    }
                })
                var objectURL = arrayobject + "." + "X_VENDOR_COM_ContactList.X_VENDOR_COM_ContactListEntry"
            }
            else {
                dotremovalobject["contactlistname"] = "PSTN Line - Contact List";
                var objectURL = arrayobject.split('.*')[0]
            }
            var addobject = objectURL.replace(/\./g, "").replace(/\*/g, "")
            $scope[addobject] = {};
            dotremovalobject["paramsobject"] = $scope[addobject];
            dotremovalobject["originalobject"] = objectURL;
            $http.get(URL + "cgi_get_nosubobj?Object=" + objectURL).success(function (data,status) {
                if (status === 200) {
                    var objects = data.Objects;
                    angular.forEach(objects, function (object) {
                        var tempobj = {};
                        var params = object.Param;
                        angular.forEach(params, function (param) {
                            var paramname = param.ParamName;
                            var paramvalue = param.ParamValue;
                            if (dotremovalobject["params"].indexOf(paramname) > -1) {
                                tempobj[paramname] = paramvalue;
                            }
                        })
                        tempobj["z"] = object.ObjName;
                        $scope[dotremove + "Objects"].push(tempobj);
                    })
                }
                else if (status === 203) {
                    $scope[$scope.dotremoval + "popup"] = true;
                    $scope[$scope.dotremoval + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else if (status === 206) {
                    if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                        $scope[$scope.dotremoval + "popup"] = true;
                        $scope[$scope.dotremoval + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope[$scope.dotremoval + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope[$scope.dotremoval + "popupval"] = popupvalue;
                    }
                }
            });
            $scope.dotremoval.push(dotremovalobject)
        });
    }, 1000)

    $scope.showstatus = function (statusparam) {
        statusparam.status = true;
    }
    $scope.rowcancel = function (statusparam) {
        statusparam.status = false;
    }
    $scope.removeRow = function (event) {
        var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        } else {
            $("#ajaxLoaderSection").show();
            var url = URL + "cgi_set";
            var deleteobjects = event.currentTarget.id.split(',')
            var post = '';
            deleteobjects = modifyService.split(deleteobjects);
            angular.forEach(deleteobjects, function (obj) {
                post += "Object=" + obj + "&Operation=Del" + "&";
            })
            console.log(post)
            modifyService.genericRequest(url, post, function (response) {
//                var formname = event.currentTarget.attributes['popupinfo'].value;
                errorResponseDisplay("contactlistdelete", response);
            });
        }
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
                    popupvalue += param.ParamName + ":" + param.ParamValue;
                });
            });
            $scope[formname + "popupval"] = popupvalue;
        }
    }
    $scope.textchange = function (model) {
        contactlistfields.push(model);
    }
    $scope.editablechange = function (key, object, value) {

        if ($scope[object] == undefined)
            $scope[object] = {};
        $scope[object][key] = value;
    }
    $scope.EditableApply = function (object, operation) {
        var post = '';
        var url = URL + "cgi_set";
        post += "Object=" + object + "&Operation=" + operation
        var modelobject = object.replace(/\./g, "").replace(/\*/g, "");
        angular.forEach($scope[modelobject], function (value, key) {
            if (contactlistfields.indexOf(key) > -1) {
                post += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '') + "";
            }

        })
//        modifyService.setRequest(url, post)
        modifyService.genericRequest(url, post, function (response) {
            errorResponseDisplay("lineapply", response);
        });
    }
    $scope.rowlevelApply = function (object, operation) {
        var post = '';
        var url = URL + "cgi_set";
        post += "Object=" + object + "&Operation=" + operation
        angular.forEach($scope[object], function (value, key) {
            post += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '') + "";
        })
        modifyService.setRequest(url, post)
    }
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
})
