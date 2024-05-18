/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myapp.controller("backupRestoreController", function ($scope, $http, $route, $window, fileUpload, $translate, $rootScope, $interval, modifyService, ngDialog,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
     $scope.success = false;
    $scope.error = false;
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
    var changedFields = [];
    var url = URL + "cgi_action";
    var action = "Action=";
    var restorename = "restore";
    var firmwarename = "firmware";
    $scope.backUp = function () {
        $('#ajaxLoaderSection').show();
        var post = action + "BackUp";
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $('#ajaxLoaderSection').hide();
                        $window.open('http://' + IP + '/db-backup.tar.gz', '_blank');
                    }
                    else if (status === 203) {
                        $('#ajaxLoaderSection').hide();
                        $scope["backupformname" + "popup"] = true;
                        $scope["backupformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["backupformname" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["backupformname" + "popupval"] = popupvalue;
                    }
                }).
                error(function (data, status, headers, config) {
                    $('#ajaxLoaderSection').hide();
                    console.log("from error block");
                });
    };
    $scope.Restore = function () {
         ngDialog.openConfirm({
            template: 'templateRestore',
            className: 'ngdialog-theme-default dialogwidth800',
            scope: $scope
        }).then(function (value) {
            $('#ajaxLoaderSection').show();
            var url = URL + "cgi_set";
            var restoreaction = "?Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4&Operation=Modify&State=UPG_REQ&FileType=VENDOR_CFG";
            var file = $scope.myFile;
            fileUpload.uploadFileToUrl(file, url, restoreaction, restorename, $scope);
        });
    };
    $scope.firmwareUpgrade = function () {
        ngDialog.openConfirm({
            template: 'templateUpdate',
            className: 'ngdialog-theme-default dialogwidth800',
            scope: $scope
        }).then(function (value) {
                $('#ajaxLoaderSection').show();
                var url = URL + "cgi_set";
                var firmwareaction = "?Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4&Operation=Modify&State=UPG_REQ&FileType=FIRMWARE";
                var file = $scope.myFile;
                fileUpload.uploadFileToUrl(file, url, firmwareaction, firmwarename, $scope);
            }, function (reason) {
            notificationdataargs = [];
        });
    };
    //Version and Last Image Updagrade
    getFormData = function (reqParams, request) {
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
                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            if (param_name === "Version") {
                                $scope.version = ParamValue;
                            }
                            if (param_name === "State") {
                                $scope.state = ParamValue;
                                if ($scope.state === "NONE") {
                                    $scope.colorId = "black_color";
                                    $scope.stateValue = "None";
                                }
                                if ($scope.state === "UPG_REQ" || $scope.state === "UPG_PROGRESS") {
                                    $scope.colorId = "orange_color";
                                    $scope.stateValue = "In progress";
                                }
                                if ($scope.state === "UPG_FAIL" || $scope.state === "UPG_FAIL_INT") {
                                    $scope.colorId = "red_color";
                                    $scope.stateValue = "Fail";
                                }
                                if ($scope.state === "UPG_SUCC" || $scope.state === "UPG_COMPLETE") {
                                    $scope.colorId = "green_color";
                                    $scope.stateValue = "SUCCESS ";
                                }
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope[request + "popup"] = true;
                        $scope[request + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope[request + "popup"] = true;
                            $scope[request + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope[request + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope[request + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getFormData("cgi_get_nosubobj?Object=Device.X_LANTIQ_COM_Upgrade", "DeviceX_LANTIQ_COM_Upgrade");
    getFormData("cgi_get?Object=Device.X_LANTIQ_COM_Upgrade.Upgrade&LatestUpgrade=1", "DeviceX_LANTIQ_COM_UpgradeUpgradeLatestUpgrade1");
    var promise = ''
    getUpgradeFirmwareData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        var objectParamValues = objects[0].Param;
                        var SwUpdtStatestatus = false;
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};
                            $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                            if (param_name == 'SwUpdtState') {
                                SwUpdtStatestatus = true;
                            }

                            if (param_name == "SwUpdtStatus") {
                                $scope.SwUpdtStatusprsntval = ParamValue;
                                if ($scope.SwUpdtStatusprvsval == undefined) {
                                    $scope.SwUpdtStatusprvsval = $scope.SwUpdtStatusprsntval;
                                    setTimeout(function () {
                                        $('#ajaxLoaderSection').hide();
                                        $interval.cancel(promise);
                                    }, 90000);
                                }
                                else {
                                    if ($scope.SwUpdtStatusprsntval != $scope.SwUpdtStatusprvsval) {
                                        $('#ajaxLoaderSection').hide();
                                        $interval.cancel(promise);
                                    }
                                }
                                if (ParamValue == "Sync") {
                                     $('#ajaxLoaderSection').hide();
                                     $scope.error = false;
                                    $scope.success = true;
                                    $scope.updatestatusmessage = "Your system is up to date";
                                }
                                if (ParamValue == "Unsync") {
                                     $scope.error = false;
                                    $scope.success = true;
                                     $('#ajaxLoaderSection').hide();
                                    $scope.updatestatusmessage = "New Firmware Available";
                                }
                                if(ParamValue == "ServerUnReachable"){
                                    $scope.success = false;
                                    $scope.error = true;
                                     $('#ajaxLoaderSection').hide();
                                    $scope.updatestatusmessage = "Server is not reachable";
                                }
                            }
                        }
                        if (SwUpdtStatestatus)
                            $scope.showfirmwareparams = true;
                        else
                            $scope.showfirmwareparams = false;
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
    setTimeout(function () {
        $('#ajaxLoaderSection').show();
        getUpgradeFirmwareData("cgi_get?Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4");
		$('#ajaxLoaderSection').hide();
    }, 10);

    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
    
    $scope.defaultvalue = function (objectname, paramname, value) {
        if ($scope[objectname] == undefined || $scope[objectname][paramname] == undefined) {
            if ($scope[objectname] == undefined) {
                $scope[objectname] = {};
                console.log("hi");
            }
            if ($scope[objectname][paramname] == undefined) {
                
                    $scope[objectname][paramname] = value;
                }
            }
        

    }

    
    $scope.checkforUpdate = function () {
        $('#ajaxLoaderSection').show();
        var url = URL + "cgi_action?";
        var post = "Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4&NOTIFICATION=NOTIFY_FW_UPGRADE&State=UPG_CHECK&FileType=FIRMWARE";
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $('#ajaxLoaderSection').show();
                        getUpgradeFirmwareData("cgi_get?Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4");
                    
                        //promise = $interval(refreshData, 4000);
                        // Cancel interval on page changes
                        $scope.$on('$destroy', function () {
                            if (angular.isDefined(promise)) {
                                $interval.cancel(promise);
                                promise = undefined;
                            }
                        });
                    }
                    else if (status === 203) {
                        $('#ajaxLoaderSection').hide();
                        $scope["checkforupdate" + "popup"] = true;
                        $scope["checkforupdate" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["checkforupdate" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["checkforupdate" + "popupval"] = popupvalue;
                        $('#ajaxLoaderSection').hide();
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log("from error block");
                    $('#ajaxLoaderSection').hide();
                });
    };

    $scope.updatefromServer = function () {
        $('#ajaxLoaderSection').show();
        var url = URL + "cgi_action?";
        var post = "Object=Device.X_LANTIQ_COM_Upgrade.Upgrade.4&NOTIFICATION=NOTIFY_FW_UPGRADE&State=UPG_REMOTE_UPDT&FileType=FIRMWARE";

        ngDialog.openConfirm({
            template: 'templateUpdate',
            className: 'ngdialog-theme-default dialogwidth800',
            scope: $scope
        }).then(
                function (value) {
                    console.log("confirm");
                    $http.post(url, post).
                            success(function (data, status, headers, config) {
                                if (status === 200) {
                                    setTimeout(function () {
                                        location.href = "#/";
                                        $('#ajaxLoaderSection').hide();
                                    }, 90000);
                                }
                                else if (status === 203) {
                                    $('#ajaxLoaderSection').hide();
                                    $scope["checkforupdate" + "popup"] = true;
                                    $scope["checkforupdate" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                }
                                else if (status === 206) {
                                    var popupvalue = '';
                                    angular.forEach(data.Objects, function (object) {
                                        $scope["checkforupdate" + "popup"] = true;
                                        angular.forEach(object.Param, function (param) {
                                            popupvalue += param.ParamName + ":" + param.ParamValue;
                                        });
                                    });
                                    $scope["checkforupdate" + "popupval"] = popupvalue;
                                    $('#ajaxLoaderSection').hide();
                                }
                            }).
                            error(function (data, status, headers, config) {
                                console.log("from error block");
                                $('#ajaxLoaderSection').hide();
                            });
                }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
            $('#ajaxLoaderSection').hide();
        });

    };

    $scope.textChange = function (value) {
        console.log(value);
        changedFields.push(value);
    };

    $scope["upgradefirmwarestatus"] = false;
    $scope.saveChanges = function (object, event) {
        $scope["upgradefirmwarestatus"] = true;
        if (event.currentTarget.attributes['formstatus'].value == "true") {
            $('#ajaxLoaderSection').show();
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set?"
            var formobjects = object.split('?');
            angular.forEach(formobjects, function (object) {
                var objectlevelurlstatus = false;
                var postobject = "Object=" + object + "&Operation=Modify";
                angular.forEach($scope[object.replace(/\./g, "")], function (value, key) {
                    if (changedFields.indexOf(object.replace(/\./g, "") + key) > -1) {
                        objectlevelurlstatus = true;
                        urlstatus = true;
                        postobject += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '');
                    }
                });
                if (objectlevelurlstatus)
                    post += postobject + ",";
            });
            post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            if ($scope["DeviceX_LANTIQ_COM_UpgradeUpgrade4"]["SwUpdtState"] == "Automatic") {
                if (urlstatus) {
                    ngDialog.openConfirm({
                        template: 'templateRemove',
                        className: 'ngdialog-theme-default dialogwidth800',
                        scope: $scope
                    }).then(
                            function (value) {
                                console.log("confirm");
                                $http.post(url, post).
                                        success(function (data, status, headers, config) {
                                            if (status === 200) {
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
                                        }).
                                        error(function (data, status, headers, config) {
                                            $('#ajaxLoaderSection').hide();
                                        });
                            }, function (reason) {
                        $('#ajaxLoaderSection').hide();
                        console.log('Modal promise rejected. Reason: ', reason);
                    });
                }
                else {
                    $('#ajaxLoaderSection').hide();
                    alert("None of the parameters have changed to update");
                }
            }
            else {
                if (urlstatus) {
                    $http.post(url, post).
                            success(function (data, status, headers, config) {
                                if (status === 200) {
                                    $('#ajaxLoaderSection').hide();
                                    $route.reload();
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
        }
    };

});
myapp.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
myapp.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl, action, name, $scope) {
            if (file !== "" && file !== undefined)
            {
                var fd = new FormData();
                fd.append(name, file);
                setTimeout(function () {
                    window.location.href = '/#/';
                    $rootScope.$emit('rootScope:language_changed');
                    $route.reload();
                },180000);
                $http.post(uploadUrl + action, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                        .success(function (data, status, headers, config, resp) {
                            if (status === 200) {
                                //alert("Success: " + resp);
                                setTimeout(function () {
                                    $('#ajaxLoaderSection').hide();
                                    location.href = "#/";
                                }, 180000);
                            }
                            else if (status === 203) {
                                $('#ajaxLoaderSection').hide();
                                $scope["fileuploadformname" + "popup"] = true;
                                $scope["fileuploadformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                            }
                            else if (status === 206) {
                                $('#ajaxLoaderSection').hide();
                                var popupvalue = '';
                                angular.forEach(data.Objects, function (object) {
                                    $scope["fileuploadformname" + "popup"] = true;
                                    angular.forEach(object.Param, function (param) {
                                        popupvalue += param.ParamName + ":" + param.ParamValue;
                                    });
                                });
                                $scope["fileuploadformname" + "popupval"] = popupvalue;
                            }
                        })
                        .error(function (data, status, headers, config, err) {
                            //alert("Error: " + err);
                            $('#ajaxLoaderSection').hide();
                        });
            }
            else {
                alert("No file selected");
                $('#ajaxLoaderSection').hide();
            }
        };
    }]);

myapp.directive('fuFileDropper', function () {
    return {
        restrict: 'EA',
        require: '?ngModel',
        replace: true,
        transclude: true,
        template: '<div class="fu-drop-area" ng-transclude></div>',
        link: function (scope, element, attrs, ngModel) {
            var dropZone = element;
            var dropZoneDom = element.get(0);
            dropZoneDom.addEventListener('dragover', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
                dropZone.addClass("dragover");
            }, false);
            dropZoneDom.addEventListener('dragleave', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                dropZone.removeClass("dragover");
            }, false);
            dropZoneDom.addEventListener('drop', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                dropZone.removeClass("dragover");
                scope.$apply(function () {
                    ngModel.$setViewValue(evt.dataTransfer.files);
                    scope.myFile = evt.dataTransfer.files[0];
                    if (attrs.type === "restore") {
                        scope.Restore();
                    }
                    if (attrs.type === "firmware") {
                        scope.firmwareUpgrade();
                    }
                });
            }, false);
        }
    };
});
