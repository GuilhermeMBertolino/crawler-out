myapp.controller("bridgeFormController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $timeout, $interval, $q) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
      var changedFields = [];
       $scope.changedCheckboxValues = [];

    /* Breadscrumbs Logic starts here */
    var jsonpromise = $interval(function () {
      //  console.log(breadcrumbsdata)
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

    $scope.Cancel = function (param1) {
        localStorage.removeItem('hybrideditObject');
        location.href = "#/tableform/" + param1;
    };
    var objectInfo = localStorage.getItem('hybrideditObject');
   
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
						var indilist='';
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectname = modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
								
								if(param_name=="X_LANTIQ_COM_BridgeMembers"){
									
									indilist+=ParamValue+',';
									
								}
                            }
                            
                            
                        }
                       $scope.indilist=indilist;
						
						console.log($scope.indilist);
						//$scope.$emit('myCustomEvent', indilist);

                    }
                    else if (status === 203) {
                        $scope["multiwanform" + "popup"] = true;
                        $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["multiwanform" + "popup"] = true;
                            $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                             //   console.log(previoousmessages.length);
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
                error(function (data, status, headers, config) {
                });
    };
	
	
	 if (objectInfo !== null) {
        setTimeout(function () {
            getFormData("cgi_get?Object=Device.Bridging.Bridge." + localStorage.getItem('hybrideditObject'));
        }, 1000);
    }
	
    if (objectInfo !== null) {
        $("#Modify").show();
        $("#Add").hide();
    }else {
        $("#Modify").hide();
        $("#Add").show();
    }
	
	$scope.Modify=function($event){
		var post='';
		console.log('inside modify');
		urlstatus=false;
		        $scope["dualwanformstatus"] = true;
        if ($event.currentTarget.attributes["id"].value === "Modify") {
            $('#ajaxLoaderSection').show();
            var localpost = "Object=Device.Bridging.Bridge."+ objectInfo + "&Operation=Modify&X_LANTIQ_COM_BridgeMembers=";
            var url = URL + "cgi_set";
           if($scope.changedCheckboxValues.length!==0){
			   urlstatus=true;
			   post = "Object=Device.Bridging.Bridge."+ objectInfo + "&Operation=Modify&X_LANTIQ_COM_BridgeMembers="+encodeURIComponent($scope.changedCheckboxValues.join().replace(/^,/, ''));
			   debugger;
			   console.log(url);
		   }
            if (urlstatus) {
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                localStorage.removeItem('hybrideditObject');
                                $scope.Cancel('bridgetable');
                                $('#ajaxLoaderSection').hide();
                            }
                            else if (status === 203) {
                                $('#ajaxLoaderSection').hide();
                                $scope["multiwanformpost" + "popup"] = true;
                                $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                $('#ajaxLoaderSection').hide();
                            }
                            else if (status === 206) {
                                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                                    $scope["multiwanformpost" + "popup"] = true;
                                    $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                    $('#ajaxLoaderSection').hide();
                                }
                                else {
                                    angular.forEach(data.Objects, function (object) {
                                        var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                                        console.log(previoousmessages.length);
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
                                    $('#ajaxLoaderSection').hide();
                                }
                            }
                            else if (status === 207) {
                                console.log(data.Objects[0].Param[0].ParamValue);
                                localStorage.setItem('dualwanformstatus', true);
                                localStorage.setItem('dualwanformmessage', data.Objects[0].Param[0].ParamValue);
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
	
	
	// for add 
	
	$scope.Add=function($event){
		var post='';
		console.log('inside add');
		urlstatus=false;
		        $scope["dualwanformstatus"] = true;
        if ($event.currentTarget.attributes["id"].value === "Add") {
            $('#ajaxLoaderSection').show();
            var localpost = "Object=Device.Bridging.Bridge."+ objectInfo + "&Operation=Modify&X_LANTIQ_COM_BridgeMembers=";
            var url = URL + "cgi_set";
           if($scope.changedCheckboxValues.length!==0){
			   urlstatus=true;
			   post = "Object=Device.Bridging.Bridge"+  "&Operation=Add&X_LANTIQ_COM_BridgeMembers="+encodeURIComponent($scope.changedCheckboxValues.join().replace(/^,/, ''));
			   
			   console.log(url);
		   }
            if (urlstatus) {
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                localStorage.removeItem('hybrideditObject');
                                $scope.Cancel('bridgetable');
                                $('#ajaxLoaderSection').hide();
                            }
                            else if (status === 203) {
                                $('#ajaxLoaderSection').hide();
                                $scope["multiwanformpost" + "popup"] = true;
                                $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                $('#ajaxLoaderSection').hide();
                            }
                            else if (status === 206) {
                                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                                    $scope["multiwanformpost" + "popup"] = true;
                                    $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                                    $('#ajaxLoaderSection').hide();
                                }
                                else {
                                    angular.forEach(data.Objects, function (object) {
                                        var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                                        console.log(previoousmessages.length);
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
                                    $('#ajaxLoaderSection').hide();
                                }
                            }
                            else if (status === 207) {
                                console.log(data.Objects[0].Param[0].ParamValue);
                                localStorage.setItem('dualwanformstatus', true);
                                localStorage.setItem('dualwanformmessage', data.Objects[0].Param[0].ParamValue);
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
	
	// check function
	
	
	    $scope.check = function (value, checked, param, jsonflag) {
        var param = param.split('.');
        changedFields.push(param[0] + param[1])
        if ($scope[param[0]] == undefined) {
            $scope[param[0]] = {};
        }
        if ($scope[param[0]][param[1]] == undefined)
            $scope[param[0]][param[1]] = '';
        $scope[param[0]][param[1]] = $scope[param[0]][param[1]].replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
        if (jsonflag == "true") {
            var valuestatus = true;
            angular.forEach($scope[param[0]][param[1]], function (value1, index) {
                if (value1 == value.id) {
                    valuestatus = false;
                    $scope[param[0]][param[1]].splice(index, 1);
                }
            })
            if (valuestatus)
                $scope[param[0]][param[1]].push(value.id);
        }
        else {
            idx = $scope[param[0]][param[1]].indexOf(value);
            if (idx >= 0 && !checked) {
			
                $scope[param[0]][param[1]].splice(idx, 1);
				$scope.changedCheckboxValues=$scope[param[0]][param[1]];
				debugger
            }
            if (idx < 0 && checked) {
                $scope[param[0]][param[1]].push(value);
				console.clear();
				console.log($scope[param[0]][param[1]]);
				$scope.changedCheckboxValues=$scope[param[0]][param[1]];
				debugger;
            }
        }
//        if (jsonflag)
        $scope[param[0]][param[1]] = $scope[param[0]][param[1]].join().replace(/(^[,\s]+)|([,\s]+$)/g, '');
			
			console.log('finally checked values after selection and deselection',$scope(DeviceBridgingBridge.X_LANTIQ_COM_BridgeMembers))
			console.log('finally checked values after selection and deselection',$scope(changedCheckboxValues))
		
debugger;
    };
	
	// check box population
	
	    $scope.checkboxurl = function (req, param, dependentstatus) {
      //  console.log(dependentstatus)
        $scope[param] = '';
        if (req.indexOf('cgi_get') > -1) {
            $http.get(URL + req).success(function (data) {
                $scope[param] = [];
                var dropdowndata = data.Objects;
                if (dependentstatus != '') {
                    var Objects = data.Objects;
                    angular.forEach(Objects, function (object) {
                        var mcboxobject = {};
                        if (dependentstatus == "instance") {
                            var objindex = object.ObjName.match(/\d+/g);
                            mcboxobject["id"] = objindex[objindex.length - 1];
                        }
                        else {
                            mcboxobject["id"] = object.ObjName;
                            $http.get(URL + "cgi_get_fillparams?Object=" + mcboxobject.id + "&" + dependentstatus + "=").success(function (data) {
                                mcboxobject.id = data.Objects[0].Param[0].ParamValue;
                            })
                        }
                        mcboxobject["name"] = object.Param[0].ParamValue;
                        $scope[param].push(mcboxobject)

                    })
//                    angular.forEach($scope[param], function (object) {

//                    })

                }
                else {
                    angular.forEach(dropdowndata, function (dropObject) {
                        var dropParam = dropObject.Param[0].ParamValue;
                        if (dropParam.indexOf(',') > -1) {
                            $scope[param] = dropParam;
                        }
                        else {
                            $scope[param] += dropParam + ","
                        }
                    })
                    $scope[param] = $scope[param].replace(/(^[,\s]+)|([,\s]+$)/g, '')
                    $scope[param] = $scope[param].split(',');
                    $scope[param] = $scope[param].filter(function(n){ return n != "" }).join(',')
                }
            })
        }
        else {
            $http.get(req + ".json").success(function (data) {
                $scope[param] = data[param]
            })
        }
    }
	
		$scope.getRoles = function (param, jsonflag) {
        if ($scope[param.split('.')[0]] != undefined && $scope[param.split('.')[0]] [param.split('.')[1]] != undefined) {
            if (jsonflag == "true") {
                var temparray = [];
                angular.forEach($scope[param.split('.')[1]], function (value) {
                    if ($scope[param.split('.')[0]][param.split('.')[1]].split(',').indexOf(value.id) > -1) {
                        temparray.push(value);
                    }
                })
                return temparray;
            }
            else {
                return $scope[param.split('.')[0]][param.split('.')[1]].split(',');
				debugger;
            }
        }
    }
		
		
		    getBridgeData = function () {
        $http.get(URL + "cgi_get?Object=Device.Bridging.Bridge").
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
						var fullist='';
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectname = modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
								
								if(param_name=="X_LANTIQ_COM_BridgeMembers"){
										fullist+=ParamValue+',';

									if(localStorage.getItem('hybrideditObject') ===null){
										$scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name]='';
									}
									
								}
                            }
                            
                            
                        }
                      $scope.fullist=fullist;
					//console.log($scope.fullist);
                    }
                    else if (status === 203) {
                        $scope["multiwanform" + "popup"] = true;
                        $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["multiwanform" + "popup"] = true;
                            $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
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
                error(function (data, status, headers, config) {
                });
    };
	getBridgeData();
	
	
	// for making check box disabled
	
	$scope.shouldDisable=function(role){
		
	//	console.log('role',role);
		
		//$scope.$on('myCustomEvent', function (event, data) {
			//$scope.indilist=data;
 // console.log(data); // 'Data to send'
		//	console.log('inside disabled');
			
		//console.log('full bridge array',arr1);
								//	console.log('indi bridge ',$scope.indilist);
	//	console.log('full list from bridge :', $scope.fullist);
			arr1=$scope.fullist.split(',');
		if (localStorage.getItem('hybrideditObject') === null ){
			$scope.indilist='';
		}
		
			arr2=$scope.indilist.split(',');
									//console.log('full bridge array',arr1);
								//	console.log('indi bridge array',arr2);
modified = arr1.filter(function(val) {
  return arr2.indexOf(val) == -1;
});

//		console.log('modified :', modified);
//		console.log('role :', role);
//			
//				console.log('modified join',modified.join());
				result=modified.join();
		
		
		if(result.indexOf(role)!=-1 || role==undefined){
			return true;
		}	
		
//});	
	}
					

	
	
//console.clear();
	//console.log($scope(DeviceBridgingBridge.X_LANTIQ_COM_BridgeMembers));
   // end of controller
});


