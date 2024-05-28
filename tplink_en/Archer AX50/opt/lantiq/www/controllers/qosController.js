/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myapp.controller("qosController", function ($scope,$timeout, $http, $routeParams, localStorageService, modifyService, $route, $translate, $rootScope, $interval, tourService) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    
    $scope.numberOfPages = function () {
        if ($scope.qosobjects) {
            return Math.ceil($scope.qosobjects.length / $scope.pageSize);
        }

    }
// Triggerring click from the value stored in local storage
    if (localStorage.getItem("selectedQosButton") !== null) {
		
		    $timeout(function () {
            window.addEventListener("hashchange", function () {
				if (window.location.hash == "#/custom/qospage") {
                var selectedqosvalue = localStorage.getItem("selectedQosButton");
					
					var buttontoclick=$(".qoscontainer").find("[ng-click='" + selectedqosvalue + "']");
                    $(".qoscontainer").find("[ng-click='" + selectedqosvalue + "']").trigger("click");
					
					if(selectedqosvalue!=="Router()" ){
						buttontoclick.closest('div.dropdown').find('button.qosbutton').addClass("active");
					}
				} 
			
			}, false);

                        }, 1000)

    }

    /* Finding clicked button */

    $timeout(function () {
        document.querySelector(".qoscontainer").addEventListener("click", function (e) {

                            if (e.target.nodeName == "A" || e.target.nodeName == "IMG") {
                                var selected = $("div.qoscontainer").find(".onactive").attr("ng-click");
                                console.debug(selected)
                                localStorage.setItem('selectedQosButton', selected);

                            }	}) })

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
    
    $scope.helpDetail = function () {
     tourService.startTour();
    }
    
    
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
    //    $scope.items = [1, 2];
    $scope.status = 6;
    $scope.toggleDetail = function ($index) {
//$scope.isVisible = $scope.isVisible == 0 ? true : false;
        $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
    };
//    $scope.showDetails = false;
//
//    $scope.$watch('showDetails', function () {
//        $scope.toggleText = $scope.showDetails ? 'Less' : 'More';
//    });
    $scope.edit = function (event, formToopen) {
        localStorageService.set('hybrideditObject', event.currentTarget.name);
        if (event.currentTarget.name.match(/\.\d+/g) != null) {
            if (event.currentTarget.name.match(/\.\d+/g).length > 1)
                var localstorageIndex = event.currentTarget.name.match(/\.\d+/g)[1].replace(/\./g, '');
            else
                var localstorageIndex = event.currentTarget.name.match(/\.\d+/g)[0].replace(/\./g, '');
            localStorage.setItem('formIndex', localstorageIndex);
        }
        location.href = "#/tableform/" + formToopen;
    };

    $scope.delete = function (event, precedence) {
        if (precedence === "1") {
            var answer = confirm("Management traffic prioritization would be affected. Are you sure you want to delete ?");
            if (!answer) {
                event.preventDefault();
            }
            else {
				$("#ajaxLoaderSection").show();
                var url = URL + "cgi_set";
                var deleteobjects = event.currentTarget.name.split(',');
                var post = '';
                deleteobjects = modifyService.split(deleteobjects);
                angular.forEach(deleteobjects, function (obj) {
                    post += "Object=" + obj + "&Operation=Del&" + ",";
                });
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                //alert(post);
//            modifyService.setRequest(url, post);
                modifyService.genericRequest(url, post, function (response) {
//                var formname = event.currentTarget.attributes['popupinfo'].value;
                    errorResponseDisplay("qosdelete", response);
                });
            }
        }
        else {
            var answer = confirm("Are you sure you want to Delete?");
            if (!answer) {
                event.preventDefault();
            }
            else {
				$("#ajaxLoaderSection").show();
                var url = URL + "cgi_set";
                var deleteobjects = event.currentTarget.name.split(',');
                var post = '';
                deleteobjects = modifyService.split(deleteobjects);
                angular.forEach(deleteobjects, function (obj) {
                    post += "Object=" + obj + "&Operation=Del&" + ",";
                });
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                //alert(post);
//            modifyService.setRequest(url, post);
                modifyService.genericRequest(url, post, function (response) {
//                var formname = event.currentTarget.attributes['popupinfo'].value;
                    errorResponseDisplay("qosdelete", response);
                });
            }
        }

    };

    function errorResponseDisplay(qospostname, response) {
		$("#ajaxLoaderSection").hide();
        var formname = qospostname;
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

    $scope.formToOpen = function (param) {
        location.href = "#/tableform/" + param;
    };
    $scope.customFormToOpen = function (param) {
        location.href = "#/custom/" + param;
    };
    $scope.Cancel = function (param1) {
        location.href = "#/custom/" + param1;
    };
    getQueueTableData = function (reqParams) {
        $scope.tableArray = [];
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        var params = ["Enable", "Precedence", "SchedulerAlgorithm"];
                        objects = data.Objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var tempObject = {};
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (params.indexOf(param_name) > -1)
                                    tempObject[param_name] = param_value;
                            }
                            $scope.tableArray[obj] = []
                            $scope.tableArray[obj].push(tempObject);
                        }
                        console.log($scope.tableArray);
                    }
                    else if (status === 203) {
                        $scope["queuetablename" + "popup"] = true;
                        $scope["queuetablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["queuetablename" + "popup"] = true;
                            $scope["queuetablename" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["queuetablename" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["queuetablename" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
//    getQueueTableData("cgi_get?Object=Device.QoS.Queue");
    getFormData = function (reqParams, paramName, qosobjects, requestform) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        $scope["classifiersalias"] = [];
                        $scope[qosobjects] = [];
                        objects = data.Objects;
//                    $scope.objects1 = objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var queuetempobject = {};
                            var objectstatus = false;
                            var alias = '';
                            queuetempobject["objectname"] = objects[obj].ObjName;
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                queuetempobject[param_name] = param_value
                                if (param_name == "Alias") {
                                    alias = param_value
                                }
                                if (paramName != "") {
                                    if (param_name === paramName && $scope.ehternetArray.indexOf(param_value) > -1) {
//                                $scope[qosobjects].push(objects[obj])
                                        objectstatus = true;
                                    }
                                }
                                else {
                                    objectstatus = true;
                                }
                                if ($scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objects[0].ObjName.replace(/\./g, "").replace(/\*/g, "")][param_name] = param_value;
                            }
                            if (objectstatus) {
                                $scope[qosobjects].push(queuetempobject)
                                $scope["classifiersalias"].push(alias)
                            }

                        }
                    }
                    else if (status === 203) {
                        $scope[requestform + "popup"] = true;
                        $scope[requestform + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope[requestform + "popup"] = true;
                            $scope[requestform + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope[requestform + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope[requestform + "popupval"] = popupvalue;
                        }

                    }


					angular.forEach($scope["classifiersalias"], function (alias, index) {
                console.log(index);
                $http.get(URL + "cgi_get_filterbyfirstparamval?Object=Device.QoS.Classification&TrafficClass=" + alias +"&Alias=&Enable=&X_LANTIQ_COM_LowerLayers=&Order=").
                        success(function (data, status, headers, config) {
                            if (status === 200) {
														$('#ajaxdataLoaderSection').hide();

                                var clsparams = ["Alias", "Enable", "X_LANTIQ_COM_LowerLayers", "Order"];
                                clsfierobjects = data.Objects;
								if(clsfierobjects!=undefined){
									
                                var classifiers = [];
                                for (var cls = 0; cls < clsfierobjects.length; cls++) {
                                    var clstempobject = {};
                                    var cls_objectname = clsfierobjects[cls].ObjName;
                                    clstempobject["objectname"] = cls_objectname;
                                    var cls_params = clsfierobjects[cls].Param;
                                    for (cls_param = 0; cls_param < cls_params.length; cls_param++) {
                                        var cls_param_name = cls_params[cls_param].ParamName
                                        var cls_param_value = cls_params[cls_param].ParamValue;
                                        if (clsparams.indexOf(cls_param_name) > -1) {
                                            clstempobject[cls_param_name ] = cls_param_value;
                                        }
                                    }
                                    classifiers.push(clstempobject);
                                }
                                $scope.qosobjects[index].classifiers = classifiers;
								}
//                            queueobject["classifiers"] = classifiers;
//                            $scope[qosobjects].push(queueobject)
//                            console.log("succedded", JSON.stringify($scope[qosobjects]));
                            }
                            else if (status === 203) {
                                $scope[requestform + "popup"] = true;
                                $scope[requestform + "popupval"] = data.Objects[0].Param[0].ParamValue;
                            }
                            else if (status === 206) {
                                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                                    $scope[requestform + "popup"] = true;
                                    $scope[requestform + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                }
                                else {
                                    var popupvalue = '';
                                    angular.forEach(data.Objects, function (object) {
                                        $scope[requestform + "popup"] = true;
                                        angular.forEach(object.Param, function (param) {
                                            popupvalue += param.ParamName + ":" + param.ParamValue;
                                        });
                                    });
                                    $scope[requestform + "popupval"] = popupvalue;
                                }

                            }
                        }).
                        error(function (data, status, headers, config) {
//                            queueobject["classifiers"] = [];
//                            $scope[qosobjects].push(queueobject)

                        });
            })

                }).
                error(function (data, status, headers, config) {
                });
 /*       setTimeout(function () {
            
        }, 1000); */

    };
    getEthernetFormData = function (reqParams, ethernetrequest) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        $scope.objects = objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_value = objectParamValues[i].ParamValue;
                                $scope.ehternetArray.push(param_value);
                            }
                        }
                        getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "ethernetformdata");
                    }
                    else if (status === 203) {
                        $scope[ethernetrequest + "popup"] = true;
                        $scope[ethernetrequest + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope[ethernetrequest + "popup"] = true;
                            $scope[ethernetrequest + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope[ethernetrequest + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope[ethernetrequest + "popupval"] = popupvalue;
                        }

                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getDSLFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        $scope.objects = objects;
                        $scope.numberCount = objects.length;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
//                            if (param_name === param_name.startsWith("nas"))
                                if (param_name === "BaseInterfaceName" && param_value.startsWith("nas"))
                                    $scope.ehternetArray.push(param_value);
                            }
                        }
                        getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "dslformdata");
                        getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertabledslform");
                    }
                    else if (status === 203) {
                        $scope["queuedsl" + "popup"] = true;
                        $scope["queuedsl" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["queuedsl" + "popup"] = true;
                            $scope["queuedsl" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["queuedsl" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["queuedsl" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };

    $scope.Router = function () {
        $route.reload();
    };
    $scope.EthernetWan = function () {
        $scope.status = 5;
        $scope.ehternetArray = [];
        getEthernetFormData("cgi_get_filterbyfirstparamval?Object=Device.X_LANTIQ_COM_NwHardware.WANConnection&BaseInterfaceName=eth1&ConnectionName=", "queueethernetformdata");
    };
    $scope.DSLWan = function () {
        $scope.status = 3;
        $scope.ehternetArray = [];
        getEthernetFormData("cgi_get_filterbyfirstparamval?Object=Device.X_LANTIQ_COM_NwHardware.WANConnection&BaseInterfaceName=ptm0&ConnectionName=", "queuedslwanformdata");
        getDSLFormData("cgi_get_nosubobj?Object=Device.X_LANTIQ_COM_NwHardware.WANConnection");
    };
    $scope.Lan = function () {
        $scope.status = 0;
		getLanData("cgi_get_filterbyfirstparamval?Object=Device.IP.Interface&X_LANTIQ_COM_UpStream=false&Name=&Object=Device.IP.Interface&X_LANTIQ_COM_UpStream=neutral&Name=");
       // $scope.ehternetArray = [];
       // $scope.ehternetArray.push("br-lan");
       // $scope.ehternetArray.push("lo");
       // getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "lanformdata");
       // getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablelan");
    };
    $scope.Local = function () {
        $scope.status = 1;
		getLocalData("cgi_get_filterbyfirstparamval?Object=Device.IP.Interface&X_LANTIQ_COM_UpStream=neutral&Name=");
      //  $scope.ehternetArray = [];
      //  $scope.ehternetArray.push("lo");
      //  getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "localformdata");
      //  getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablelocal");
    };
    $scope.Wlan = function () {
        $scope.status = 2;
		getWiFIData("cgi_get_fillparams?Object=Device.WiFi.Radio&Name=");
        //$scope.ehternetArray = [];
        // $scope.ehternetArray.push("br-lan");
        //getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "wlanformdata");
        //getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablewlan");
    };
    $scope.Lte = function () {
        $scope.status = 4;
        $scope.ehternetArray = [];
        $scope.ehternetArray.push("lte0");
        getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "lteformdata");
        getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablelte");
    };
    getShaperTableData = function (reqParams, paramname, request) {

        $scope.tableArray1 = [];
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
						$('#ajaxdataLoaderSection').hide();
                        var params = ["Enable", "ShapingRate", "X_LANTIQ_COM_LowerLayers"];
                        objects = data.Objects;
						if(objects!= undefined){

                        $scope.numberCount = objects.length;
                        $scope.tableArray1 = [];
                        for (var obj = 0; obj < objects.length; obj++) {
                            var tempObject = {};
                            var objectParamValues = objects[obj].Param;
                            tempObject["objectname"] = objects[obj].ObjName
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (params.indexOf(param_name) > -1)
                                    tempObject[param_name] = param_value;
                            }

                            if (paramname != undefined) {
                                if ($scope.ehternetArray.indexOf(tempObject["X_LANTIQ_COM_LowerLayers"]) > -1)
                                    $scope.tableArray1.push(tempObject);
                            }
                            else
                                $scope.tableArray1.push(tempObject);
                        }
						}
						
                        console.log($scope.ehternetArray)
                        console.log($scope.tableArray1);
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
    getShaperTableData("cgi_get?Object=Device.QoS.Shaper", undefined, "shapertable");
    getFormData("cgi_get?Object=Device.QoS.Queue", "", "qosobjects", "queueformdata");



    $scope.edittocustom = function (event, formToopen) {
        localStorage.setItem('qosid', event.currentTarget.attributes["name"].value);
        location.href = "#/custom/" + formToopen;
    };
    getQosSettingsData = function (reqParams, paramname) {
        $scope.qossettingsArray = [];
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        var params = ["DefaultTrafficClass", "DefaultDSCPMark", "DefaultEthernetPriorityMark", "X_LANTIQ_COM_QoSEnable"];
                        objects = data.Objects;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var qossettingsobject = {};
                            var objectParamValues = objects[obj].Param;
                            qossettingsobject["objectname"] = objects[obj].ObjName;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (params.indexOf(param_name) > -1)
                                    qossettingsobject[param_name] = param_value;
                            }
                            $scope.qossettingsArray.push(qossettingsobject);
                        }

                        console.log($scope.qossettingsArray);
                    }
                    else if (status === 203) {
                        $scope["qossettingsname" + "popup"] = true;
                        $scope["qossettingsname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["qossettingsname" + "popup"] = true;
                            $scope["qossettingsname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["qossettingsname" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["qossettingsname" + "popupval"] = popupvalue;
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getQosSettingsData("cgi_get_nosubobj?Object=Device.QoS");
	 $scope.$on('$destroy', function () {
        if (localStorageService.get('hybrideditObject') != null) {
            if (operationstatus) {
                localStorageService.remove('hybrideditObject');
                operationstatus = false;
            }
            else
                operationstatus = true;
        }
        else {
            operationstatus = false;
        }
 });
 getWiFIData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        $scope.ehternetArray = [];
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_value = objectParamValues[i].ParamValue;
                                $scope.ehternetArray.push(param_value);
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["getwifidata" + "popup"] = true;
                        $scope["getwifidata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["getwifidata" + "popup"] = true;
                            $scope["getwifidata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["getwifidata" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["getwifidata" + "popupval"] = popupvalue;
                        }

                    }
                    console.log($scope.ehternetArray);
                    getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "wlanformdata");
                    getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablewlan");
                }).
                error(function (data, status, headers, config) {
                });
    };

	getLanData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        $scope.ehternetArray = [];
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_value = objectParamValues[i].ParamValue;
                                $scope.ehternetArray.push(param_value);
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["getlandata" + "popup"] = true;
                        $scope["getlandata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["getlandata" + "popup"] = true;
                            $scope["getlandata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["getlandata" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["getlandata" + "popupval"] = popupvalue;
                        }

                    }
                    console.log($scope.ehternetArray);
                    getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "lanformdata");
                    getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablelan");

                }).
                error(function (data, status, headers, config) {
                });
    };
    getLocalData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        $scope.ehternetArray = [];
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_value = objectParamValues[i].ParamValue;
                                $scope.ehternetArray.push(param_value);
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["getlocaldata" + "popup"] = true;
                        $scope["getlocaldata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["getlocaldata" + "popup"] = true;
                            $scope["getlocaldata" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["getlocaldata" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["getlocaldata" + "popupval"] = popupvalue;
                        }

                    }
                    console.log($scope.ehternetArray);
                    getFormData("cgi_get?Object=Device.QoS.Queue", "X_LANTIQ_COM_LowerLayers", "qosobjects", "localformdata");
                    getShaperTableData("cgi_get?Object=Device.QoS.Shaper", "X_LANTIQ_COM_LowerLayers", "shapertablelocal");

                }).
                error(function (data, status, headers, config) {
                });
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
});


