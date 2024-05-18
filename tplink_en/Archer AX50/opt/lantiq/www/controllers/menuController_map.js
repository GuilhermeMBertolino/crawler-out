
myapp.controller('menuController', function ($rootScope, $scope, $route, $http, $location, localStorageService, modifyService, $q, $http, languageService, $window,$timeout) {
    $scope.dataTab = "";
    $scope.menuOptions = function () {
        var menufolder = '';

        /*        $http.get(URL + "cgi_action?Action=Role").success(function (data) {
                if ( data.Role == "su"){
                menufolder="su/";
                }
                else{
                menufolder='';
                }*/

        $rootScope.$on('rootScope:language_changed', function (event, args) {
            menuload();

        });

        $rootScope.$on('beerocksmenuchangeevent', function (event, p1,p2) {
            $timeout(function(){
                if(p1=="WDS-Repeater" && p2=="Multi-AP-Agent"){
                    
                    $http.get('menu_ire_mode.json').
                                                        success(function (data, status, headers, config) {
                                                            $scope.posts = data;
                                                        }).
                                                        error(function (data, status, headers, config) {
                                                            LoadDefaultMenu();
                                                        });
                }
              //  LoadDefaultMenu();

            },5000)

        });

        function menuload() {

            $http.get(URL + '/cgi_get_fillparams?Object=Device.X_LANTIQ_COM_ClientMode.Profile&Enable=').success(function (data, status, headers, config) {
                var responseData = data;
                if (data !== undefined && data.Objects !== undefined) {
                    if (data.Objects.length > 0) {
                        var isEnpointTrue = false;
                        angular.forEach(data.Objects, function (object) {
                            if (object.Param !== undefined && object.Param[0] !== undefined && object.Param[0].ParamValue === 'true') {
                                isEnpointTrue = true;
                            }
                        });

                        if (isEnpointTrue === true) {
                            $http.get('menu_ClientMode.json').
                            success(function (data, status, headers, config) {
                                $scope.posts = data;
                            }).
                            error(function (data, status, headers, config) {
                                LoadDefaultMenu();
                            });
                        } else {
                            $http.get(URL + '/cgi_get_fillparams?Object=Device.X_INTEL_COM_BEEROCKS&Gateway=&Onboarding=&Redirect=').success(function (data, status, headers, config) {
                                var responseData = data;
                                var objectResponse = [];
                                var objectname = [];
                                if (data !== undefined && data.Objects !== undefined) {
                                    if (data.Objects.length > 0) {
                                        var isEnpointTrue = false;
                                        angular.forEach(data.Objects, function (object) {
                                            angular.forEach(object.Param, function (objectparam) {
                                                if (objectparam !== undefined) {
                                                    if (object.ObjName === "Device.X_INTEL_COM_BEEROCKS") {
                                                        var objectDetails = {};
                                                        objectDetails.objectname = object.ObjName + '.' + objectparam.ParamName;
                                                        objectDetails.isEnpointTrue = objectparam.ParamValue;
                                                        objectResponse.push(objectDetails);
                                                        objectname.push(object.ObjName + '.' + objectparam.ParamName);
                                                    }

                                                }
                                            });

                                        });

                                        if (objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Gateway") > -1) {
                                            var index = objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Gateway");
                                            if (objectResponse[index].isEnpointTrue === "false") {
                                                if (objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Onboarding") > -1) {
                                                    var index = objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Onboarding");
                                                    if (objectResponse[index].isEnpointTrue === "true") {
                                                        $http.get('menu_ire_mode.json').
                                                        success(function (data, status, headers, config) {
                                                            $scope.posts = data;
                                                        }).
                                                        error(function (data, status, headers, config) {
                                                            LoadDefaultMenu();
                                                        });
                                                    } else if (objectResponse[index].isEnpointTrue === "false") {
														 if (objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Redirect") > -1) {
															var index = objectname.indexOf("Device.X_INTEL_COM_BEEROCKS.Redirect");
															if (objectResponse[index].isEnpointTrue === "true") {
																    $http.get('menu_operationalmode.json').success(function (data, status, headers, config) {
																		RedirectToBeerocksGatewayIP();
																		$scope.posts = data;
																	}).error(function (data, status, headers, config) {
																		LoadDefaultMenu();
																	});
															} else if (objectResponse[index].isEnpointTrue === "false") {
																 $http.get('menu_operationalmode.json').success(function (data, status, headers, config) {
																		$scope.posts = data;
																	}).error(function (data, status, headers, config) {
																		LoadDefaultMenu();
																	});
															 }
														 }
														
														
                                                       
                                                    }
                                                    OpenBeerocksWebSocketConnection();
                                                } else {
                                                    LoadDefaultMenu();
                                                }

                                            } else {
                                                LoadDefaultMenu();
                                            }


                                        } else {
                                            LoadDefaultMenu();
                                        }
                                    } else {
                                        LoadDefaultMenu();
                                    }

                                } else {
                                    LoadDefaultMenu();
                                }
                            }).
                            error(function (data, status, headers, config) {
                                LoadDefaultMenu();
                            });
                        }
                    }
                } else {
                    LoadDefaultMenu();
                }

            }).
            error(function (data, status, headers, config) {
                LoadDefaultMenu();
            });

        }
        menuload("en");
        // });
    };

    $scope.createmenu = function (json, $q, $http) {
        //console.log(json['items'][0]);
        var basic = [];
        var advanced = [];
        var menufinal = [];
        var menu_json = {};
        var items = json['items']
        var i, j, k;
        console.log(items)
        var globalorder;
        var requests = [];
        var requestcheck = [];
        for (i = 0; i < items.length; ++i) {
            var menu = items[i]['menu']
            for (j = 0; j < menu.length; ++j) {
                var item = menu[j];
                var childs = item['childrens'].sort(function (a, b) {
                    return a.order - b.order
                });
                for (k = 0; k < childs.length; ++k) {
                    var child = childs[k];
                    if (child.checkvalue && child.checkurl) {
                        requests.push($http.get(URL + child.checkurl));
                        requestcheck.push(child.name)
                    }
                }
            }
        }
        $q.all(requests).then(function (responses) {
            for (i = 0; i < items.length; ++i) {
                var menu = items[i]['menu']
                for (j = 0; j < menu.length; ++j) {
                    var item = menu[j];
                    var childs = item['childrens'].sort(function (a, b) {
                        return a.order - b.order
                    });
                    for (k = 0; k < childs.length; ++k) {
                        var child = childs[k];

                        function menuObjectCreate() {
                            if (child.view != undefined) {
                                if (item.name == "Basic") {
                                    dashboardname = "Basic";
                                    itemviewnmae = "tabHead/adv_homepage";
                                } else {
                                    dashboardname = "Advanced";
                                    itemviewnmae = "tabHead/adv_homepage";
                                }
                                breadcrumbsdata[child.view] = [{
                                    "name": dashboardname,
                                    "path": itemviewnmae
                                }];
                                globalorder = parseInt(child.order) - 1;
                                breadcrumbsdata[child.view].push({
                                    "path": child.viewtype + "/" + child.view,
                                    "name": child.name,
                                    "index": globalorder,
                                    "order": globalorder
                                })
                            }
                            var gchild = child["childrens"];
                            //gchild = gchild.sort(compare);
                            gchild = gchild.sort(function (a, b) {
                                return a.order - b.order
                            })
                            child['childrens'] = gchild;
                            for (l = 0; l < gchild.length; ++l) {
                                if (gchild[l].view != undefined) {
                                    if (item.name == "Basic") {
                                        dashboardname = "Basic";
                                        itemviewnmae = "tabHead/adv_homepage";
                                    } else {
                                        dashboardname = "Advanced";
                                        itemviewnmae = "tabHead/adv_homepage";
                                    }
                                    console.log(globalorder);
                                    breadcrumbsdata[gchild[l].view] = [{
                                        "name": dashboardname,
                                        "path": itemviewnmae
                                    }];
                                    breadcrumbsdata[gchild[l].view].push({
                                        "name": child.name,
                                        "path": "nothing",
                                        "index": parseInt(childs[k].order) - 1,
                                        "order": parseInt(gchild[l].order) - 1
                                    })
                                    breadcrumbsdata[gchild[l].view].push({
                                        "name": gchild[l].name,
                                        "path": gchild[l].viewtype + "/" + gchild[l].view,
                                        "index": parseInt(childs[k].order) - 1,
                                        "order": parseInt(gchild[l].order) - 1
                                    })
                                }
                                // check for great grand children, VOIP case
                                var ggchild = gchild[l]['childrens'];
                                //ggchild = ggchild.sort(compare);
                                ggchild = ggchild.sort(function (a, b) {
                                    return a.order - b.order
                                })
                                gchild['childrens'] = ggchild;
                                var voipchildrens = gchild['childrens']
                                for (var m = 0; m < voipchildrens.length; m++) {
                                    if (voipchildrens[m].view != undefined) {
                                        if (item.name == "Basic") {
                                            dashboardname = "Basic";
                                            itemviewnmae = "tabHead/adv_homepage";
                                        } else {
                                            dashboardname = "Advanced";
                                            itemviewnmae = "tabHead/adv_homepage";
                                        }
                                        breadcrumbsdata[voipchildrens[m].view] = [{
                                            "name": dashboardname,
                                            "path": itemviewnmae
                                        }];
                                        breadcrumbsdata[voipchildrens[m].view].push({
                                            "name": child.name,
                                            "path": "nothing",
                                            "index": parseInt(childs[k].order) - 1,
                                            "order": parseInt(voipchildrens[m].order) - 1
                                        })
                                        breadcrumbsdata[voipchildrens[m].view].push({
                                            "name": gchild[l].name,
                                            "path": "nothing",
                                            "index": parseInt(childs[k].order) - 1,
                                            "order": parseInt(voipchildrens[m].order) - 1
                                        })
                                        breadcrumbsdata[voipchildrens[m].view].push({
                                            "name": voipchildrens[m].name,
                                            "path": voipchildrens[m].viewtype + "/" + voipchildrens[m].view,
                                            "index": parseInt(childs[k].order) - 1,
                                            "order": parseInt(voipchildrens[m].order) - 1
                                        })
                                    }
                                }
                            }
                            if (item['name'] === "Basic") {
                                basic.push(child);
                            } else {
                                advanced.push(child);
                            }
                        }
                        var successindex = -1;
                        if (child.checkvalue && child.checkurl) {
                            for (p = 0; p < requestcheck.length; ++p) {
                                if (child.name == requestcheck[p])
                                    successindex = p;
                            }
                            if (successindex > -1) {
                                if (responses[successindex] != undefined && responses[successindex].data != undefined && responses[successindex].data.Objects[0].Param[0].ParamValue != child.checkvalue) {
                                    menuObjectCreate();
                                }
                            }
                        } else {
                            menuObjectCreate();
                        }
                    }
                }
            }
            jsonloadstatus = true;
            var advanced_sort = advanced.sort(function (a, b) {
                return a.order - b.order
            })
            var basic_sort = basic.sort(function (a, b) {
                return a.order - b.order
            })
            var basic_menu = {
                name: "Basic",
                id: "home",
                childrens: basic_sort
            };
            menufinal.push(basic_menu);
            var adv_menu = {
                name: "Advanced",
                id: "profile",
                childrens: advanced_sort
            };
            menufinal.push(adv_menu);
            menu_json = {
                menu: menufinal
            };
            //console.log(JSON.stringify(menu_json));
            $scope.posts = menu_json;
        });
    }
    $scope.setTabPage = function (index) {
        if ($location.path() != '/' && $location.path() != "/tabHead/adv_homepage") {
            switch (index) {
                case 0:
                    $location.path("tabHead/adv_homepage");
                    break;
                case 1:
                    $location.path("tabHead/adv_homepage");
                    break;
                default:
                    $location.path("tabHead/adv_homepage");
                    break;
            }
        }
    };
    $scope.accordian = function (id, bool) {
        var currentNode = document.getElementById(id);
        var childNodes = currentNode.parentNode.parentNode.childNodes;
        collapseAll(childNodes, currentNode);
        expandCurrent(currentNode, bool);
        highlightMenuItem(currentNode.parentNode, currentNode);
    };


    $rootScope.accordian = function (id, bool) {
        var currentNode = document.getElementById(id);
        var childNodes = currentNode.parentNode.parentNode.childNodes;
        collapseAll(childNodes, currentNode);
        expandCurrent(currentNode, bool);
        highlightMenuItem(currentNode.parentNode, currentNode);
    };

    collapseAll = function (childNodes, currentNode) {
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType !== 3) {
                for (var j = 0; j < childNodes[i].childNodes.length; j++) {
                    if (childNodes[i].childNodes[j].nodeType !== 3 && childNodes[i].childNodes[j].nodeName === "A" && childNodes[i].childNodes[j] !== currentNode) {
                        childNodes[i].childNodes[j].className = " ng-scope";
                    }
                    if (childNodes[i].childNodes[j].nodeType !== 3 && childNodes[i].childNodes[j].nodeName !== "A" && childNodes[i].childNodes[j] !== currentNode) {
                        childNodes[i].childNodes[j].className = "animation hide ng-scope";
                    }
                }
            }
        }
    };
    expandCurrent = function (currentNode, bool) {
        if (currentNode.className.indexOf("hide") != -1) {
            currentNode.className = "show animation";
        } else {
            currentNode.className = "hide animation";
        }
        if (bool) {
            var lis = currentNode.getElementsByTagName("li");
            collapseAll(lis, currentNode);
        }
    };
    highlightMenuItem = function (currentListItem, currentNode) {
        for (var i = 0; i < currentListItem.childNodes.length; i++) {
            if (currentListItem.childNodes[i].nodeType !== 3 && currentListItem.childNodes[i].nodeName === "A") {
                if (currentNode.className.indexOf("hide") !== -1) {
                    currentListItem.childNodes[i].className = "ng-scope";
                } else {
                    currentListItem.childNodes[i].className = "ng-scope menuitem-highlight";
                }


            }
        }
    };
    $scope.edit = function (event, formToopen) {
        location.href = "#/tableform/" + formToopen;
    }
    $scope.formfilldata = function (object, objectparams) {
        var orgobject = object;
        var objparams = objectparams.split('?');
        var objectwithoutdot = object.replace(/\./g, "");
        $http.get(URL + "cgi_get_nosubobj?Object=" + orgobject).success(function (data) {
            var objects = data.Objects;
            angular.forEach(objects, function (dataobject) {
                var data_objectname = dataobject.ObjName;
                var data_params = dataobject.Param;
                angular.forEach(data_params, function (param) {
                    var param_name = param.ParamName;
                    var param_value = param.ParamValue;
                    if (objparams.indexOf(param_name) > -1) {
                        if ($scope[objectwithoutdot] == undefined)
                            $scope[objectwithoutdot] = {};
                        $scope[objectwithoutdot][param_name] = param_value;
                    }

                })
            })
        })
    }
    $scope.callregister = function (scopevariable, clickedtab, req) {
        $scope[scopevariable] = clickedtab;
        var reqobjects = req.split('&');
        var finalobject = '';
        var reqobjectsarray = ["Device.Services.VoiceService.VoiceProfile.1.Line.1.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", "Device.Services.VoiceService.VoiceProfile.1.Line.1.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", "Device.Services.VoiceService.VoiceProfile.1.Line.1.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.1.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*"];
        var reqobjectsarray1 = ["Device.Services.VoiceService.VoiceProfile.*.Line.*.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*", "Device.Services.VoiceService.VoiceProfile.*.Line.*.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*", "Device.Services.VoiceService.VoiceProfile.*.Line.*.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_MissCallRegister.X_VENDOR_COM_MissCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_RecvCallRegister.X_VENDOR_COM_RecvCallRegEntry.*,Device.Services.VoiceService.X_VENDOR_COM_FxoPhyIf.*.X_VENDOR_COM_DialCallRegister.X_VENDOR_COM_DialCallRegEntry.*"];

        angular.forEach(reqobjects, function (reqobject) {
            var req = reqobject.split('?')
            var object = req[0]
            console.log("hi");
            console.log(object)
                //reqobjectsarray.push(object);
            var objparams = req[1].split(',')
            var index = reqobjectsarray.indexOf(object);
            $scope[reqobjectsarray1[index] + "params"] = objparams;
            finalobject += "Object=" + object.split('.*')[0] + ","
            console.log(finalobject)
        })

        /* angular.forEach(modifyService.split(angular.copy(reqobjects)), function (obj) {
            finalobject += "Object=" + obj.split('.*')[0] + ","
        })*/
        finalobject = finalobject.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        $scope['callregisterarray'] = [];
        $http.get(URL + "cgi_get?" + finalobject).success(function (data) {
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
        })
    }

    var RedirectToBeerocksGatewayIP = function () {
        $http.get(URL + '/cgi_get_fillparams?Object=Device.X_INTEL_COM_BEEROCKS&RedirectIP=').
        success(function (data, status, headers, config) {
            if (status === 200) {
                if (data !== undefined && data.Objects !== undefined) {
                    if (data.Objects.length > 0) {
                        angular.forEach(data.Objects, function (object) {
                            if (object.Param !== undefined && object.Param[0] !== undefined) {
                                if (object.Param[0].ParamValue !== "" && object.Param[0].ParamValue !== undefined)
                                    $window.location.href = "http://" + object.Param[0].ParamValue;

                            }
                        });
                    }
                }
            }
        }).
        error(function (data, status, headers, config) {});
    }


    var LoadDefaultMenu = function () {


        var language = languageService.getObject();
        if (language === undefined) {
            language = 'en';
        }

        $http.get(URL + "cgi_action?Action=Menu&Language=" + language).
        success(function (data, status, headers, config) {
            $scope.createmenu(data, $q, $http);
        }).
        error(function (data, status, headers, config) {});
    }

    function OpenBeerocksWebSocketConnection() {
        websocket_beerocks = new WebSocket('ws://' + IP + ':5001', 'protocol_device_update');
        websocket_beerocks.onopen = function () {
            console.log("WS LOG Connection established !!\n");
        };

        websocket_beerocks.onmessage = function (message) {
            var data = JSON.parse(message.data);
            objects = data.Objects;
            if (objects) {
                var temp = [];
                var Objindex = objects[0].ObjName;
                var refObjectName = objects[0].ObjName.replace(/\./g, "");
                $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"] = [];
                if (refObjectName === "DeviceX_INTEL_COM_BEEROCKSWSD") {
                    angular.forEach(objects[0].Param, function (obj) {
                        if (obj.ParamName == "Status" || obj.ParamName == "status") {
                            $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = obj.ParamValue;
                            $rootScope.$broadcast('DeviceX_INTEL_COM_BEEROCKSWSD');
                        }
                        if (obj.ParamName == "Error" || obj.ParamName == "error") {
                            $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["error"] = obj.ParamValue;
                            $rootScope.$broadcast('DeviceX_INTEL_COM_BEEROCKSWSD');
                        }
                        if (obj.ParamName == "Failure" || obj.ParamName == "failure") {
                            $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["failure"] = obj.ParamValue;
                            $rootScope.$broadcast('DeviceX_INTEL_COM_BEEROCKSWSD');
                        }
                        if (obj.ParamName == "Success" || obj.ParamName == "success") {
                            $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["failure"] = obj.ParamValue;
                            $rootScope.$broadcast('DeviceX_INTEL_COM_BEEROCKSWSD');
                        }

                    });
                }
            }
        };

        websocket_beerocks.onclose = function () {
            console.log("Connection is closed... Bye !");
        };
    }

})
