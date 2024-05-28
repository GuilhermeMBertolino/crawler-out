myapp.controller("dualEthWanFormController", function ($scope, $location, $http, $route, $routeParams, httpService, localStorageService, modifyService, $translate, $rootScope, $timeout, $interval, $q, ngDialog) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    $scope.changedCheckboxValues = [];
    var ethernetInterfaceList = [];
    /* Breadscrumbs Logic starts here */
    var jsonpromise = $interval(function () {
        //  console.log(breadcrumbsdata)
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));

                if (localStorage.getItem('hybrideditObject') == null)
                    if ($rootScope["breadcrumbs"]) {
                        $rootScope["breadcrumbs"].push({
                            "name": "Add",
                            "path": 'nothing'
                        })
                    }
                    else {
                        if ($rootScope["breadcrumbs"]) {

                            $rootScope["breadcrumbs"].push({
                                "name": "Edit",
                                "path": 'nothing'
                            })
                        }
                    }
            } else {

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
                                } else {
                                    tabtype = 'profile';
                                    $("#myTab li:nth-child(2)").addClass('active');
                                    $("#myTab li:first-child").removeClass('active');
                                    $("#home").removeClass('active');
                                    $("#profile").addClass('active');
                                }
                            } else {
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
        // console.log($rootScope["breadcrumbs"])

    }, 500);
    $scope.homefun = function () {
        if (breadcrumbsdata[$route.current.params.param] === undefined)
            bdata = JSON.parse(localStorage.getItem('breadcrumbarray'));
        else
            bdata = breadcrumbsdata[$route.current.params.param];
        if (bdata[0]["name"] === "Advanced")
            tab = "profile";
        else
            tab = "home";
        $rootScope.accordian(tab + "-" + bdata[1]["name"] + "-" + bdata[1]["index"], true);
    };
    /* Breadscrumbs Logic ends here */

    /* Translation starts here */
    var activeLanguage = $translate.use();
    if (activeLanguage !== undefined)
        activeLanguage = $translate.use().split('/');
    else
        activeLanguage = 'en'.split('/');
    if (activeLanguage.length > 1)
        activeLanguage = activeLanguage[1];
    else
        activeLanguage = activeLanguage[0];
    if ($("#dataView").find("div#translation").html() !== '')
        $translate.use("languages/" + activeLanguage + "/" + $("#dataView").find("div#translation").html());
    else
        $translate.use(activeLanguage);
    /* Translation ends here */

    var removedValues = [];
    $scope.check = function (value, checked, param) {
        var param = param.split('.');
        if ($scope[param[0]] == undefined) {
            $scope[param[0]] = {};
        }


        var idx = $scope[param[0]][param[1]].indexOf(value);

        if (idx >= 0 && !checked) {
            $scope[param[0]][param[1]].splice(idx, 1);
            $scope.changedCheckboxValues = $scope[param[0]][param[1]];
            var originalIdx = $scope.DeviceEthernetInterface.OriginalUpstream.indexOf(value);
            if (originalIdx >= 0) {
                removedValues.push($scope.DeviceEthernetInterface.OriginalUpstream[originalIdx]);
            }

        }
        if (idx < 0 && checked) {
            $scope[param[0]][param[1]].push(value);
            $scope.changedCheckboxValues = $scope[param[0]][param[1]];
            var removedValueIndex = removedValues.indexOf(value);
            if (removedValueIndex >= 0) {
                removedValues.splice(removedValueIndex, 1);
            }

        }
    };

    $scope.shouldChange = function (value, checked, param) {
        var param = param.split('.');
        var idx = $scope[param[0]][param[1]].indexOf(value);
        if ($scope[param[0]][param[1]].length == 2) {
            if (!checked) {
                return true;
            } else
                return false;
        }

    }

    $scope.bondModeValues = [
        { model: "Round robin (balance-rr)", value: "0" },
        { model: "XOR (balance-xor)", value: "2" },
        { model: "Broadcast", value: "3" },
        { model: "802.3ad dynamic link aggregation (LACP)", value: "4" },
        { model: "Adaptive transmit load-balancing (balance-tlb)", value: "5" },
        { model: "Adaptive load-balancing (balance-alb)", value: "6" }

    ];

    var Apply = function () {

        var postUrl = '';
        if ($scope.DeviceEthernetInterface.OriginalUpstream.length == 1 && $scope.DeviceEthernetInterface.Upstream.length == 2) {
            var index = $scope.DeviceEthernetInterface.OriginalUpstream.indexOf($scope.DeviceEthernetInterface.Upstream[0]);
            var index2 = $scope.DeviceEthernetInterface.OriginalUpstream.indexOf($scope.DeviceEthernetInterface.Upstream[1]);
            if (index >= 0 || index2 >= 0) {
                alert("None of the  Parameters have changed to update");
                $('#ajaxLoaderSection').hide();
                return;
            }
        }
        angular.forEach($scope.DeviceEthernetInterface.Upstream, function (lanPort) {
            var objectName = '';
            if (lanPort != "eth1") {
                postUrl = postUrl + '&Object=';
                angular.forEach(ethernetInterfaceList, function (params) {
                    if (params.paramvalue == lanPort) {
                        objectName = params.objectname;
                    }

                })
                postUrl = postUrl + objectName + '&Operation=Modify&Upstream=true';
            }
        })
        angular.forEach(removedValues, function (lanPort) {
            var objectName = '';
            if (lanPort != "eth1") {
                postUrl = postUrl + '&Object=';
                angular.forEach(ethernetInterfaceList, function (params) {
                    if (params.paramvalue == lanPort) {
                        objectName = params.objectname;
                    }

                })
                postUrl = postUrl + objectName + '&Operation=Modify&Upstream=false';
            }
        })
        postUrl = postUrl.substr(1);
        var url = URL + "cgi_set";
        $http.post(url, postUrl).
            success(function (data, status, headers, config) {
                if (status === 200) {
                    $('#ajaxLoaderSection').show();
                    setTimeout(function () {
                        $('#ajaxLoaderSection').hide();
                    }, 180000);
                } else if (status === 203) {
                    $('#ajaxLoaderSection').hide();
                    $scope["dualethwanformpost" + "popup"] = true;
                    $scope["dualethwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;

                } else if (status === 206) {
                    if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                        $scope["dualethwanformpost" + "popup"] = true;
                        $scope["dualethwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        $('#ajaxLoaderSection').hide();
                    }

                } else if (status === 207) {
                    console.log(data.Objects[0].Param[0].ParamValue);
                    localStorage.setItem('dualethwanformstatus', true);
                    localStorage.setItem('dualethwanformmessage', data.Objects[0].Param[0].ParamValue);
                }
            }).
            error(function (data, status, headers, config) {
                $('#ajaxLoaderSection').hide();
            });
    }

    $scope.Modify = function ($event) {
        $rootScope["notifymessage"] = 'This will cause the device to reboot.';
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            Apply();
        }, function (reason) {

        });
    }


    $scope.getRoles = function () {
        return $scope.DeviceEthernetInterface.Upstream;
    }

    var getData = function () {

        $http.get(URL + "cgi_get_fillparams?Object=Device.Ethernet.Interface&Name=&Upstream").
            success(function (data, status, headers, config) {
                if (status === 200) {
                    objects = data.Objects;
                    $scope.DeviceEthernetInterface = [];
                    var DeviceEthernetInterface = [];
                    DeviceEthernetInterface.Name = '';
                    DeviceEthernetInterface.Upstream = [];
                    DeviceEthernetInterface.OriginalUpstream = [];
                    DeviceEthernetInterface.DisableList = [];
                    for (var obj = 0; obj < objects.length; obj++) {
                        var objectname = objects[obj].ObjName;
                        var currentInterface = '';
                        var objectParamValues = objects[obj].Param;
                        $scope.objvalues = {};
                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                            var param_name = objectParamValues[pa1].ParamName;
                            var ParamValue = objectParamValues[pa1].ParamValue;
                            if (param_name == "Name") {
                                DeviceEthernetInterface.Name += ParamValue + ',';
                                if (ParamValue == "eth1") {
                                    DeviceEthernetInterface.DisableList.push(ParamValue);
                                }
                                var ethernetInterface = {
                                    'paramvalue': ParamValue,
                                    'objectname': objectname
                                }
                                ethernetInterfaceList.push(ethernetInterface);
                            }
                            if (param_name == "Upstream") {
                                if (ParamValue == "true" || ParamValue == "1") {
                                    if (objectParamValues[pa1 - 1].ParamName == "Name") {
                                        DeviceEthernetInterface.Upstream.push(objectParamValues[pa1 - 1].ParamValue);
                                        if (objectParamValues[pa1 - 1].ParamValue != "eth1") {
                                            DeviceEthernetInterface.OriginalUpstream.push(objectParamValues[pa1 - 1].ParamValue);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var nameIndex = DeviceEthernetInterface.Name.lastIndexOf(',');
                    DeviceEthernetInterface.Name = DeviceEthernetInterface.Name.slice(0, nameIndex);
                    $scope.listWantoLan = DeviceEthernetInterface.Name.split(',').filter(function (item) {
                        if (item !== "") {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    $scope.DeviceEthernetInterface = DeviceEthernetInterface;
                } else if (status === 203) {
                    $scope["dualethwanform" + "popup"] = true;
                    $scope["dualethwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                } else if (status === 206) {
                    if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                        $scope["dualethwanform" + "popup"] = true;
                        $scope["dualethwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    } else {
                        angular.forEach(data.Objects, function (object) {
                            var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                            //  console.log(previoousmessages.length);
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
            error(function (data, status, headers, config) { });
    };
    getData();

    $scope.shouldDisable = function (role) {
        arr1 = $scope.DeviceEthernetInterface.DisableList;

        if (arr1.indexOf(role) > -1) {
            return true;
        }

    }

    $scope.Reset = function () {
        $scope.DeviceEthernetInterface.Upstream = [];
        ethernetInterfaceList = [];
        removedValues = [];
        $scope.changedCheckboxValues = [];
        getData();
    }


    // link aggregation 

    /**
     * Load Link aggregation table data
     */

    $scope.LoadLinkAggregationTableData = function (q1) {
        $scope.LinkAggregationTableData = [];
        $http.get(URL + q1).success(function (data, status, headers, config) {
            var mainArray = data.Objects;
            mainArray.forEach(function (item, index, list) {
                var tempObject = {};

                tempObject["objectname"] = item.ObjName

                item.Param.forEach(function (param) {
                    var temp = {};
                    if (param.ParamName == "LagMode") {
                        if (param.ParamValue == "1") {
                            tempObject[param["ParamName"]] = "LAN";

                        }
                        if (param.ParamValue == "2") {
                            tempObject[param["ParamName"]] = "WAN";

                        }
                    } else {
                        tempObject[param["ParamName"]] = param["ParamValue"];
                    }
                })
                $scope.LinkAggregationTableData.push(tempObject)
            });
        })
    }
    if ($location.path() == "/custom/dual_eth_wan") {

        $scope.LoadLinkAggregationTableData("cgi_get?Object=Device.X_INTEL_COM_Bond.System");
    }
    /**
     *  Add new lagmode
     */

    $scope.add = function () {
        localStorage.setItem("operation", "ADD");
        $location.path("/custom/add_new_lagmode_form");

    }

    $scope.LagModeValues = [
        { model: "LAN", value: "1" },
        { model: "WAN", value: "2" }

    ];

    /**
     * List all LAN interfaces
     */

    $scope.getLanModeValues = function () {
        $scope.LanCheckList = [];
        $http.get(URL + "cgi_get_fillparams?Object=Device.Ethernet.Interface&Upstream=false").
            success(function (data, status, headers, config) {
                if (status === 200) {
                    var objects = data.Objects;
                    objects.forEach(function (element, index) {
                        element.Param.forEach(function (e, i) {
                            if (e.ParamName == "Name") {
                                $scope.LanCheckList.push(e.ParamValue);
                            }
                        })
                    })
                }
            })
    }

    $scope.getLanModeValues();
    $scope.LanCheckList = $scope.LanCheckList.filter(function (e) {
        if (e == "") {
            return false;
        } else {
            return true;
        }
    })
    /**
     * List all WAN interfaces
     */

    $scope.getWanModeValues = function () {
        $scope.WanCheckList = [];
        $http.get(URL + "cgi_get_fillparams?Object=Device.Ethernet.Interface&Upstream=true").
            success(function (data, status, headers, config) {
                if (status === 200) {
                    var objects = data.Objects;
                    objects.forEach(function (element, index) {
                        element.Param.forEach(function (e, i) {
                            if (e.ParamName == "Name") {
                                $scope.WanCheckList.push(e.ParamValue);
                            }
                        })
                    })
                }
            })
    }

    $scope.getWanModeValues();

    $scope.WanCheckList = $scope.WanCheckList.filter(function (e) {
        if (e == "") {
            return false;
        } else {
            return true;
        }
    })

    $scope.lanvalues = [];
    $scope.wanvalues = [];

    /**
    *   Validation for selecting two WAN interfaces
    */

    $scope.shouldSelectOnlyTwo = function (role, checked) {

        if ($scope.lanvalues.length == 2) {
            if (checked) {
                return false;
            }
            else {
                return true;
            }

        }

    }

    /**
     *   Validation for selecting two WAN interfaces
     */

    $scope.shouldSelectOnlyTwoWan = function (role, checked) {

        if ($scope.wanvalues.length == 2) {
            if (checked) {
                return false;
            }
            else {
                return true;
            }

        }

    }

    /***
     * 
     */

    $scope.switchChanged = function () {
        $scope.BondEnabledChanged = true;
    }

    /**
     * Cancel button
     */

    $scope.cancel = function () {
        localStorage.removeItem("operation");
        localStorage.removeItem("edit_object");
        $location.path("/custom/dual_eth_wan");


    }

    /**
     * allow configuring only one LAG
     */

    $scope.yourChecker = function ($index, tabledata, LinkAggregationTableData) {
        console.debug("index", $index);

        console.debug("all data", LinkAggregationTableData)

        if (tabledata.BondEnable == "true") {
            return false;
        } else if (tabledata.BondEnable == "false") {
            for (var i = 0; i < LinkAggregationTableData.length; i++) {
                if (LinkAggregationTableData[i].BondEnable == "true") {
                    return true;
                } 
            }


        }
    }

    /**
     * Clearing local storage on route change
     */
    $scope.$on('$routeChangeStart', function (scope, next, current) {
        if ($location.path() == "/custom/dual_eth_wan") {
            localStorage.removeItem("operation");
            localStorage.removeItem("edit_object");
        }
    });

    /***
     *  edit 
     */

    $scope.edit = function (objectname, tabledata) {

        localStorage.setItem("operation", "EDIT");
        localStorage.setItem("edit_object", objectname);
        $location.path("/custom/add_new_lagmode_form_edit");


    }
    /**
     * Load edit form data
     */



    $scope.LoadEditFormData = function () {
        var edit_object = localStorage.getItem("edit_object");

        $timeout(function () {
            $http.get(URL + "cgi_get?Object=" + edit_object).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        var objects = data.Objects;
                        objects.forEach(function (element, index) {
                            element.Param.forEach(function (e, i) {

                                $scope[e.ParamName] = e.ParamValue;

                            })
                        })
                        if ($scope.BondEnable == "false") {
                            $scope.BondEnable = false;
                        }
                        if ($scope.BondEnable == "true") {
                            $scope.BondEnable = true;
                        }
                        $scope.BondMode = 2;
                        if ($scope.LagMode == "1") {
                            $scope.lanvalues = $scope.BondMembers.split(" ").filter(function (e) {
                                if ($scope.LanCheckList.indexOf(e) !== -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).filter(function (e) {
                                if (e == "") {
                                    return false;
                                } else {
                                    return true;
                                }
                            });


                        }
                        if ($scope.LagMode == "2") {
                            $scope.wanvalues = $scope.BondMembers.split(" ").filter(function (e) {
                                if ($scope.WanCheckList.indexOf(e) !== -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).filter(function (e) {
                                if (e == "") {
                                    return false;
                                } else {
                                    return true;
                                }
                            });

                        }
                    }
                })
        }, 2000)
    }

    if ($location.path() == "/custom/add_new_lagmode_form_edit") {
        $scope.LoadEditFormData();
    }

    /**
     * Showing reload dialog while apply
     */

    $scope.LinkFirstApply = function ($event) {
        $rootScope["notifymessage"] = 'This will cause the device to reboot.';
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            addApply();
        }, function (reason) {

        });
    }

    /**
     * apply for add form
     */

    function addApply() {
        if ($scope.linkaggregationaddform.$pristine) {
            alert("None of the parameters were changed");
        }
        if ($scope.linkaggregationaddform.$valid) {
            if (localStorage.getItem("operation") == "ADD") {
                var url = URL + "cgi_set";
                var addpost = "Object=Device.X_INTEL_COM_Bond.System&Operation=Add" + "&BondMode=" + $scope.BondMode + "&LagMode=" + $scope.LagMode;
                if ($scope.lanvalues && $scope.lanvalues.length == 2) {
                    addpost += "&BondMembers=" + $scope.lanvalues.join(" ");
                }
                if ($scope.wanvalues && $scope.wanvalues.length == 2) {
                    addpost += "&BondMembers=" + $scope.wanvalues.join(" ");
                }
                $http.post(url, addpost).success(function (data, status) {
                    if (status === 203) {
                        alert(data.Objects[0].Param[0].ParamValue);
                    }
                })

            }
        }

    }

    /**
     * reboot dialog and apply for edit form
     */

    $scope.LinkEditApply = function ($event) {
        $rootScope["notifymessage"] = 'This will cause the device to reboot.';
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            editApply();
        }, function (reason) {

        });
    }


    function editApply() {
        if ($scope.linkaggregationeditform.$valid) {

            if ($scope.LagMode =="2") {
                var url = URL + "cgi_set";
                var editpost = "";
                var Object = localStorage.getItem("edit_object");
                editpost = "Object=" + Object + "&Operation=Modify&BondEnable=" + $scope.BondEnable + "&BondMode=" + $scope.BondMode + "&LagMode="
                    + $scope.LagMode + "&BondMembers=" + $scope.wanvalues.join(" ");

                $http.post(url, editpost).success(function () {

                })
            } else {

            }
            if ($scope.LagMode =="1") {
                var url = URL + "cgi_set";
                var editpost = "";
                var Object = localStorage.getItem("edit_object");
                editpost = "Object=" + Object + "&Operation=Modify&BondEnable=" + $scope.BondEnable + "&BondMode=" + $scope.BondMode + "&LagMode="
                    + $scope.LagMode + "&BondMembers=" + $scope.lanvalues.join(" ");

                $http.post(url, editpost).success(function () {

                })
            } else {

            }
        }

    }


});
