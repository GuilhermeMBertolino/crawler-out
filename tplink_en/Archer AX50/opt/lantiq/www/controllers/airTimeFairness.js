myapp.controller("airTimeFairnessController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $timeout, $interval, $q,$sanitize) {
	
//	breadcrumbs logic
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
	
	// breadcrumbs logic ends
	
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
$scope.dropdowndata={}
	$scope.dropdowndata.selectedOption="";
	
	
    getFormData = function (reqParams) {
        $http.get(URL+"cgi_get_nosubobj?Object="+$scope.mainradioobject+".X_LANTIQ_COM_Vendor").
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectname =data.Objects[0].ObjName; //modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
								
//                                if (childparams.indexOf(param_name) > -1) {
//                                    if (param_name == "Interface") {
//                                        interfacelist.push(ParamValue);
//                                        currentInterface = ParamValue;
//                                    }
//                                    $scope.objvalues[param_name] = ParamValue;
//                                }
                            }
//                            if (objectname === childobject) {
//                                $scope.objvalues["objectname"] = objects[obj].ObjName;
//                                $scope[currentInterface] = $scope.objvalues;
//                                $scope["multiwanchildobjects"].push($scope.objvalues);
//                            }
//                            if (objectname === typeobject) {
//                                $scope.typeobj = objects[obj].ObjName;
//                            }
                        }
                        console.log($scope["multiwanchildobjects"]);
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
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                }).then(function(){
			    $rootScope.fetchSpeed=(Date.now()- $rootScope.initialtime)/1000;
			$scope.splitparamname=[];
		    if($scope.mainradioobject.split('.').join("") =="DeviceWiFiRadio1"){
				splitparamname=$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfRadioStationsAndWeights.split(',');
			
			}	else {
				splitparamname=$scope.DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfRadioStationsAndWeights.split(',');
							//alert('else')

			}
			console.info(splitparamname);
			
			$scope.tablearr=[];
			for(var i=0;i<splitparamname.length;i = i+2){
				
				
				$scope.tablearr.push({
					//id: i+1,
					stamac:splitparamname[i],
					weight:(isNaN(Number(splitparamname[i+1])))? "" :Number(splitparamname[i+1]) ,
				})
			}
			// debugger;
			console.info($scope.tablearr);
	
		});
    };	
	
	// vap single table logic
	$scope.singleVapTable=[];
	
	
		 getvapsingleformdata = function (reqParams) {
        $http.get(URL+"cgi_get_filterbyparamval?Object=Device.WiFi.SSID&X_LANTIQ_COM_Vendor_IsEndPoint=false"
				  
				  
				 // +$scope.mainradioobject
				 ).
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
                        for (var obj = 0; obj < objects.length; obj++) {
							// debugger;
                            var objectname =data.Objects[obj].ObjName; //modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
								
								if(param_name=="LowerLayers"){
									if(ParamValue !== $scope.mainradioobject+'.'){
										//debugger;  
										//$scope.singleVapTable.pop();
										//$scope.singleVapTable.pop();
										break;
									}
									
								}
								
								if(param_name=="SSID"){
									//debugger;
									$scope.singleVapTable.push(
										objectname,
										ParamValue
									);
								}
								if(param_name=="X_LANTIQ_COM_Vendor_WaveAtfVapWeight"){
									$scope.singleVapTable.push(
										ParamValue
									);
								}
								
								
//                                if (childparams.indexOf(param_name) > -1) {
//                                    if (param_name == "Interface") {
//                                        interfacelist.push(ParamValue);
//                                        currentInterface = ParamValue;
//                                    }
//                                    $scope.objvalues[param_name] = ParamValue;
//                                }
                            }
//                            if (objectname === childobject) {
//                                $scope.objvalues["objectname"] = objects[obj].ObjName;
//                                $scope[currentInterface] = $scope.objvalues;
//                                $scope["multiwanchildobjects"].push($scope.objvalues);
//                            }
//                            if (objectname === typeobject) {
//                                $scope.typeobj = objects[obj].ObjName;
//                            }
                        }
                        console.log($scope["multiwanchildobjects"]);
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
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                }).then(function(){
			$scope.vapsinglesplitparamname=[];
			console.debug("singleVapTable",$scope.singleVapTable)
			// debugger;
			var vapsinglesplitparamname=$scope.singleVapTable.join(',').split(',');
			
			console.info(vapsinglesplitparamname);
			
			$scope.singleVapTablearr=[];
			for(var i=0;i<vapsinglesplitparamname.length;i = i+3){
				
				
				$scope.singleVapTablearr.push({
					id: vapsinglesplitparamname[i],
					ssid:vapsinglesplitparamname[i+1],
					weight:(isNaN(Number(vapsinglesplitparamname[i+2])))? "" : Number(vapsinglesplitparamname[i+2]),
				})
			}
			// debugger;
			console.debug('single vap table array',$scope.singleVapTablearr);
	
		});
    };
	$timeout(function(){
			getvapsingleformdata();

	},1000)
	console.info('vap single table ',$scope.singleVapTable);


  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data) {
	  
	  
    //$scope.user not updated yet
  //  angular.extend(data, {id: id});
	  	  

//$scope.neededpost+=$scope.singleVapTablearr.id+"&Operation=Modify&X_LANTIQ_COM_Vendor_WaveAtfVapWeights="+data.weight;
	  console.info("save details",data );
	  	  $scope.vapweight=0;

	 console.info("post details",$scope.singleVapTablearr );
	  $scope.singleVapTablearr.forEach(function(item){
		  
		  $scope.vapweight+=Number(item.weight);
	  })
	  // debugger;
	  if($scope.vapweight !=undefined && $scope.vapweight>100){
		  	//  alert("error in weights");

	  }
	   $scope.vappost='';
	  console.debug(" vap ssids",$scope.singleVapTablearr)
	  $scope.newpvapost=$scope.singleVapTablearr.map(function(item){
		 $scope.vappost+="&Object="+item.id+"&Operation=Modify&X_LANTIQ_COM_Vendor_WaveAtfVapWeight="+item.weight; 
	  });
  };
	
$scope.saveSingleStation=function(data){
	 console.info("single station post details",$scope.tablearr );
			//$scope.combinepost();
	$scope.stationsinglepost="";
		cs=$scope.tablearr.map(function(elem){
   return elem.stamac+","+elem.weight ;
}).join(",");		
			$scope.stationsinglepost+="&Object="+$scope.mainradioobject+".X_LANTIQ_COM_Vendor&Operation=Modify&WaveAtfRadioStationsAndWeights="+cs;

}
$scope.attachdoublepost="";
$scope.saveDoubleStation=function(data){
	$scope.attachdoublepost="";
	 console.info("double station post details",$scope.tablearrforsatationdoubletick );
			//$scope.combinepost();
ds=$scope.tablearrforsatationdoubletick.map(function(elem){
			    return elem.stamac+","+elem.weight ;
}).join(",");
	//alert("SSID",$scope.dropdowndata.selectedOption )
IndexNumber=$scope.neededobject.substr($scope.neededobject.length - 1);	$scope.attachdoublepost="&Object=Device.WiFi.AccessPoint."+IndexNumber+".X_LANTIQ_COM_Vendor&Operation=Modify&WaveAtfVapStationsAndWeights="+ds;
	//alert($scope.attachdoublepost);

}

  // remove user
  $scope.removeSingleStation = function(index) {
    $scope.tablearr.splice(index, 1);
	  $scope.saveSingleStation();
  }; //removeSingleVap
	
$scope.removeSingleVap = function(index) {
    $scope.singleVapTablearr.splice(index, 1);
  };
  $scope.removeStationDoubleTable = function(index) {
    $scope.tablearrforsatationdoubletick.splice(index, 1);
	  $scope.saveDoubleStation();
  };
  // add user
  $scope.addStationTableDetails = function() {
	// rowform.$show();
    $scope.inserted = {
     // id: $scope.tablearr.length+1,
      stamac: "",
      weight: "",
       
    };
    $scope.tablearr.push($scope.inserted);
	 
  };
	 $scope.addtablearrforsatationdoubleDeatails = function() {
	// rowform.$show();
    $scope.inserted = {
     // id: $scope.tablearrforsatationdoubletick.length+1,
      stamac: "",
      weight: "",
       
    };
    $scope.tablearrforsatationdoubletick.push($scope.inserted);
	 
  };
	
	 $scope.addVapSingleDoubleTableDetails = function() {
	// rowform.$show();
    $scope.inserted = {
      id: $scope.singleVapTablearr.length+1,
      ssid: "",
      weight: "",
       
    };
    $scope.singleVapTablearr.push($scope.inserted);
	 
  };
	
	//if (objectInfo !== null) {
       setTimeout(function () {
          //  getFormData("cgi_get?Object=" + localStorage.getItem('hybrideditObject'));
			getFormData("radio1.json");
        }, 1000);
    //}
	
	// get dropdown data for SSID 
	 $scope.SSIDlist=[];
	$scope.SSIDobject=[];
	var getDropdownData=function(){
		$http.get(URL + "cgi_get_filterbyparamval?Object=Device.WiFi.SSID&X_LANTIQ_COM_Vendor_IsEndPoint=false").
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
						
		 					for (var obj = 0; obj < objects.length; obj++) {
                            var objectname =objects[obj].ObjName; //modifyService.dotstarremove(angular.copy(objects[obj].ObjName), '.*');
								
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
								
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
								// debugger
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
								if(param_name=="LowerLayers"){
									if(ParamValue !== $scope.mainradioobject+'.'){
										//debugger;  
										//$scope.singleVapTable.pop();
										//$scope.singleVapTable.pop();
										break;
									}
									
								}
								
									// remove this check
									//if(ParamValue=="Device.WiFi.Radio.1."){
										$scope.SSIDobject.push(objectname);
										//objects[obj].Param.forEach(function(obj){
											if(param_name=="SSID"){
												$scope.SSIDlist.push( {ssid: ParamValue,
																	  parent:objectname } 
																	);
												//break;
											}
//								if(param_name=="X_LANTIQ_COM_Vendor_IsEndPoint"){
//									if(ParamValue=="true"){
//										//debugger;
//										$scope.SSIDlist.pop();
//									}
//								}
//										//})
									//$scope.SSIDlist.push(objectname,objects[obj].Param);
										
										//debugger;
								//}
								
								console.log($scope.SSIDlist);
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                              
                            }
                        
                        }
						
						}	
			
		}).then(function(){
			console.debug("droppy",$scope.SSIDlist);
			$timeout(function(){
				//alert('dddd');
				// debugger
								$scope.dropdowndata.selectedOption=$scope.SSIDlist[0].parent;

			},100).then(function(){
				//alert(' called station double table');
				getFormDataforStationonDropdownChange($scope.SSIDlist[0].parent);
			})

		})
}
	$timeout(function(){
		getDropdownData();
		
	},1000)
	
	console.info('ssid',$scope.SSIDlist);
	console.info('ssid object',$scope.SSIDobject);
	 getFormDataforStationonDropdownChange = function (reqParams) {
		// debugger
		             $('#ajaxdataLoaderSection').show();

		//cgi_get_filterbyparamval?Object=Device.WiFi.AccessPoint&SSIDReference=Device.WiFi.SSID.1
        //$http.get("accesspoint_stationmac_weights.json")
			 $http.get(URL +"cgi_get_filterbyparamval?Object=Device.WiFi.AccessPoint&SSIDReference="+reqParams).
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
					//	debugger;
                        for (var obj = 0; obj < objects.length; obj++) {
							
                             $scope.neededobject =data.Objects[0].ObjName;
							
							 var objectname=data.Objects[obj].ObjName.split(".").join("");
								 //modifyService.dotstarremove(angular.copy(data.Objects[0].ObjName), '.*');
							//alert(objectname)
                            var currentInterface = '';
                            var objectParamValues = objects[obj].Param;
                            $scope.objvalues = {};
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[objectname.replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[objectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[objectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
								
								if(param_name== "SSIDReference"){
									//debugger
									if(ParamValue==reqParams || reqParams+"."){
										$scope.reqaccesspoint=$scope.neededobject;
										//alert(" access point: "+$scope.reqaccesspoint)
										
									}
								}
//                                if (childparams.indexOf(param_name) > -1) {
//                                    if (param_name == "Interface") {
//                                        interfacelist.push(ParamValue);
//                                        currentInterface = ParamValue;
//                                    }
//                                    $scope.objvalues[param_name] = ParamValue;
//                                }
                            }
//                            if (objectname === childobject) {
//                                $scope.objvalues["objectname"] = objects[obj].ObjName;
//                                $scope[currentInterface] = $scope.objvalues;
//                                $scope["multiwanchildobjects"].push($scope.objvalues);
//                            }
//                            if (objectname === typeobject) {
//                                $scope.typeobj = objects[obj].ObjName;
//                            }
                        }
                        console.log($scope["multiwanchildobjects"]);
						$('#ajaxdataLoaderSection').hide();
                    }
                    else if (status === 203) {
                        $scope["multiwanform" + "popup"] = true;
                        $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
						$('#ajaxdataLoaderSection').hide();
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["multiwanform" + "popup"] = true;
                            $scope["multiwanform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
                        }
						$('#ajaxdataLoaderSection').hide();
                    }
                }).
                error(function (data, status, headers, config) {
				 $('#ajaxLoaderSection').hide();
				 
				 $scope.networkError=true;
                }).then(function(){
			$scope.doublesplitparamname=[];
		    var accesspoint=$scope.reqaccesspoint.split('.').join("")+"X_LANTIQ_COM_Vendor";
				//alert(accesspoint); //+"X_LANTIQ_COM_Vendor
				//debugger;WaveAtfRadioStationsAndWeights
				 //debugger;
				$scope.doublesplitparamname=$scope[accesspoint]["WaveAtfVapStationsAndWeights"].split(',');
			
			console.debug("double table details",$scope.doublesplitparamname);
			//debugger;
			$scope.tablearrforsatationdoubletick=[];
			for(var i=0;i<$scope.doublesplitparamname.length;i = i+2){
				
				
				$scope.tablearrforsatationdoubletick.push({
					//id: i+1,
					stamac:$scope.doublesplitparamname[i],
					weight:$scope.doublesplitparamname[i+1],
				})
			}
			;
			console.info($scope.tablearr);
	            

		});
    };	
	
	$scope.callStationTableForDropdown=function(a){
		
	     //debugger;
        console.debug('selected SSID',a.dropdowndata.selectedOption);
		
		getFormDataforStationonDropdownChange(a.dropdowndata.selectedOption);
		;
		
		
		
	}
	
//	$scope.combinepost=function(){
//		$scope.combinedstationsinglepost=$scope.tablearr.map(function(elem){
//			
//				    return elem.stamac+","+elem.weight ;
//
//			
//}).join(",");
//			$scope.combinedstationdoublepost=$scope.tablearrforsatationdoubletick.map(function(elem){
//			
//				    return elem.stamac+","+elem.weight ;
//
//			
//}).join(",");
//		
//		
//		console.info("combine station single post ",$scope.combinedstationsinglepost);
//		console.info("combine station double post ",$scope.combinedstationdoublepost);
//	}
//	$timeout(function(){
//		$scope.combinepost();
//	},5000)
	//$scope.data.selectedOption=$scope.SSIDlist[0];
	//singleVapTablearr
	
		 $scope.validateVapWeightRequired = function(value) {
	if(!value)
		return "This field is required";
		   	  var vapweight=0;
;
	  $scope.singleVapTablearr.forEach(function(item){
		  
		  vapweight+=Number(item.weight);
	  })
	  if(vapweight>100) {
		  return "sum of weights should not go above 100";
	  }
  };
	
	 $scope.validateStationRequired = function(value) {
	if(!value)
		return "This field is required";
		   	  var vapweight=0;
;
	  $scope.tablearr.forEach(function(item){
		  
		  vapweight+=Number(item.weight);
	  })
	  if(vapweight>100) {
		  return "sum of weights should not go above 100";
	  }
  };
	
		 $scope.validateStationDoubleWeightRequired = function(value) {
	if(!value)
		return "This field is required";
		   	  var vapweight=0;
;
	  $scope.tablearrforsatationdoubletick.forEach(function(item){
		  
		  vapweight+=Number(item.weight);
	  })
	  if(vapweight>100) {
		  return "sum of weights should not go above 100";
	  }
  };
	
	$scope.validateMacAddress=function(value) {
		
		if(!value)
		return "This field is required";
	
		if(!(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)))

		return "Invalid Mac address";
  };
	
  $scope.$watch(
                    "DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfAlgoType",
                    function handleFooChange( newValue, oldValue ) {
                        console.debug( "vm.fooCount:", newValue );
						if(newValue=="Global"){
							if( $scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfVapEnabled){
								$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfVapEnabled='false';
							}
							if($scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfStationEnabled){
							$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfStationEnabled='false';
						}
						}
                    }
                );
	
	 $scope.$watch(
                    "DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfAlgoType",
                    function handleFooChange( newValue, oldValue ) {
                        console.debug( "vm.fooCount:", newValue );
						if(newValue=="Global"){
							if( $scope.DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfVapEnabled){
								$scope.DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfVapEnabled='false';
							}
							
							if($scope.DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfStationEnabled){
							$scope.DeviceWiFiRadio2X_LANTIQ_COM_Vendor.WaveAtfStationEnabled='false';
						}
					}
						
						
                    }
                );
	
	
	$scope.submit=function(){
		$rootScope.initialtime=Date.now();
		$('#ajaxLoaderSection').show();

		if( $scope.myForm.$valid ){
				var changedFields=[];
			angular.forEach($scope.myForm, function(value, key) {
		  if(key[0] == '$') return;
		  console.debug("changed fields",key, value.$pristine)
		  if(value.$pristine==false){
			  changedFields.push(key)
			  console.debug(changedFields);
		  }});
						
						
			 finalChangedfields= changedFields.map(function(item){
				// debugger;
			var lIndex  = item.lastIndexOf("_");

			item = item.substring(0, lIndex) + "." + item.substr(lIndex + 1);

			return item;


			  })
 console.debug("final changed fields",finalChangedfields);
						
						

				
$scope.post="";
		//alert("submitted"+" "+$scope.mainradioobject+$scope.rowform2);
		
		$scope.post= "Object="+$scope.mainradioobject+"."+"X_LANTIQ_COM_Vendor"
		+"&Operation=Modify";
	
		if($scope[$scope.mainradioobject.split(".").join("")+"X_LANTIQ_COM_Vendor"]["WaveAtfAlgoType"]=="Global"){
				$scope.post="";
				$scope.post= "Object="+$scope.mainradioobject+"."+"X_LANTIQ_COM_Vendor"
		+"&Operation=Modify&WaveAtfVapEnabled=false&WaveAtfStationEnabled=false";
			}
		
		finalChangedfields.forEach(function(item){
			console.debug(item)
			//debugger;
			var addy ="";
			addy="&"+item.split('.')[1]+"="+$sanitize($scope[item.split('.')[0]][item.split('.')[1]]).replace(/<[^>]+>/gm, '');
			$scope.post+=addy;
		})
		
		if(finalChangedfields.length==0){
			$scope.post="";
		}
//			if($scope[$scope.mainradioobject.split(".").join("")+"X_LANTIQ_COM_Vendor"]["WaveAtfAlgoType"]=="Global"){
//				$scope.post="";
//				$scope.post= "Object="+$scope.mainradioobject+"."+"X_LANTIQ_COM_Vendor"
//		+"&Operation=Modify&WaveAtfVapEnabled=0&WaveAtfStationEnabled=0";
//			}
		
		if($scope[$scope.mainradioobject.split(".").join("") +"X_LANTIQ_COM_Vendor"]["WaveAtfVapEnabled"]=='true'){
			
			if ($scope.newpvapost!=undefined){
				$scope.post+=$scope.vappost;
			}
		}
			//debugger
			if($scope[$scope.mainradioobject.split(".").join("") +"X_LANTIQ_COM_Vendor"]["WaveAtfStationEnabled"]=='true'){
			if($scope.stationsinglepost!=undefined){
				$scope.post+=$scope.stationsinglepost;
			}
			}
//		$scope.singleVapTablearr.map(function(item){
//		 $scope.post+="&"+item.id+"&Operation=Modify&X_LANTIQ_COM_Vendor_WaveAtfVapWeights="+item.weight; 
//	  });
			// debugger
			//alert($scope.attachdoublepost)
		if($scope[$scope.mainradioobject.split(".").join("") +"X_LANTIQ_COM_Vendor"]["WaveAtfVapEnabled"]=='true'
		  
		  && $scope[$scope.mainradioobject.split(".").join("") +"X_LANTIQ_COM_Vendor"]["WaveAtfStationEnabled"]=='true'){	
		if($scope.attachdoublepost !="" && $scope.attachdoublepost !=undefined){
				$scope.post+=$scope.attachdoublepost;
			}
		}
			
//	cs=$scope.tablearr.map(function(elem){
//    return elem.stamac+","+elem.weight ;
//}).join(",");		
//			$scope.post+="&"+$scope.mainradioobject+".X_LANTIQ_COM_Vendor&Operation=Modify&WaveAtfRadioStationsAndWeights="+cs;
			
			
			
			
			//if()
			
//			ds=$scope.tablearrforsatationdoubletick.map(function(elem){
//			    return elem.stamac+","+elem.weight ;
//}).join(",");
//			$scope.post+="&Device.Wifi.Access"
			console.debug($scope.post)
			
			
			
			
//	cons	&WaveAtfEnabled="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfEnabled+"&WaveAtfDistributionType="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfDistributionType+"&WaveAtfAlgoType="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfAlgoType+"&WaveAtfInterval="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfInterval
//		+"&WaveAtfFreeTime="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfFreeTime
//		+"&WaveAtfVapEnabled="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfVapEnabled
//		+"&WaveAtfStationEnabled="+$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor.WaveAtfStationEnabled

		
		//alert(post)
			
			// posting it to server
			//debugger;
			$http.post(URL + "cgi_set?",$scope.post).success(function (data, status, headers, config) {

					if (status === 200) {
						$('#ajaxLoaderSection').hide();
						$route.reload();
					} else if (status === 203) {
						$('#ajaxLoaderSection').hide();
						$scope["postformname" + "popup"] = true;
						$scope["postformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
					} else if (status === 206) {
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
	}
	
	});