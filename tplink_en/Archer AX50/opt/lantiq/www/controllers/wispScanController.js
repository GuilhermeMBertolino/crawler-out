myapp.controller("wispScanController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $interval, clientModeService) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    $scope.DeviceWiFiEndPoint1Profiletable = [];
	$scope.DeviceWiFiEndPoint2Profiletable = [];
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

    $scope.setSelectedItem = function(data){
        clientModeService.setObject(data);
    }
   
    
	
	var ScanOnEndpoint = function(setParams, reqParams){
	      $scope.isScanning = true;
       var url = URL + "cgi_set?";
       var data = setParams;
        modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                 var reqdataarray = [];
        $scope.tableDataArray = [];
        $scope.tablevalues = [];
        var post = 'cgi_get?' + "Object=" + reqParams;;
        $http.get(URL + post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        objects = data.Objects;
                        var objectCount = 0;
                            if(objects !== '' && objects !== undefined){
                        for (var obj = 0; obj < objects.length; obj++) {
                            if(obj%2 == 1){
                            var objobjname = objects[obj].ObjName;
                            var objectindex = objobjname.indexOf(reqdataarray);
                            if (objectindex > -1) {
                                if (objectindex === 0) {
                                    var objectParamValues = objects[obj].Param;
                                    
                                    for (var i = 0; i < objectParamValues.length; i++) {
                                        if( $scope.DeviceWiFiEndPoint1Profiletable !== undefined){
                                        $scope.DeviceWiFiEndPoint1Profiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                        }
                                        if( $scope.DeviceWiFiEndPoint2Profiletable !== undefined){
                                        $scope.DeviceWiFiEndPoint2Profiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                        }
                                        
                                    }
                                    objectCount = objectCount + 1;
                                }
                                

                            }

                        }
                        
                        else {
                            if( $scope.DeviceWiFiEndPoint1Profiletable !== undefined){
                            $scope.DeviceWiFiEndPoint1Profiletable[objectCount] = [];
                            }
                            if( $scope.DeviceWiFiEndPoint2Profiletable !== undefined){
                            $scope.DeviceWiFiEndPoint2Profiletable[objectCount] = [];
                            }
                            
                            var objectParamValues = objects[obj].Param;
                              for (var i = 0; i < objectParamValues.length; i++) {
                                  if( $scope.DeviceWiFiEndPoint1Profiletable !== undefined){
                            
                                        $scope.DeviceWiFiEndPoint1Profiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                  }
                                  if( $scope.DeviceWiFiEndPoint2Profiletable !== undefined){
                            
                                        $scope.DeviceWiFiEndPoint2Profiletable[objectCount][objectParamValues[i].ParamName] = objectParamValues[i].ParamValue;
                                  }
                             }
                        }
                    }
                        if( $scope.DeviceWiFiEndPoint1Profiletable !== undefined){
                            
                    $scope.selectedItem = $scope.DeviceWiFiEndPoint1Profiletable[0];
                         clientModeService.setObject($scope.DeviceWiFiEndPoint1Profiletable[0]);
                        }
                        if( $scope.DeviceWiFiEndPoint2Profiletable !== undefined){
                            
                    $scope.selectedItem = $scope.DeviceWiFiEndPoint2Profiletable[0];
                         clientModeService.setObject($scope.DeviceWiFiEndPoint2Profiletable[0]);
                        }
                        
                    }
                    }
                    else if (status === 203) {
                        $scope["wispscan" + "popup"] = true;
                        $scope["wispscan" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["wispscan" + "popup"] = true;
                            $scope["wispscan" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else {
                            var popupvalue = '';
                            angular.forEach(data.Objects, function (object) {
                                $scope["wispscan" + "popup"] = true;
                                angular.forEach(object.Param, function (param) {
                                    popupvalue += param.ParamName + ":" + param.ParamValue;
                                });
                            });
                            $scope["wispscan" + "popupval"] = popupvalue;
                        }
                    }
                    $scope.isScanning = false;
                }).
                error(function (data, status, headers, config) {
                     $scope.isScanning = false;
                });
                
                }
            else{
                $scope.isScanning = false;
            }
	});
	}
									  
	
	
	
    $scope.PerformScan = function(setParams,reqParams){
		ScanOnEndpoint(setParams, reqParams);
	}
    
        
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
});