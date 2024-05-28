myapp.controller('coreController', function ($translate, $scope, $route, $rootScope, $interval, $http, modifyService) {
    $scope.progress = 0.01;
    $scope.progress1 = 0.01;
    $scope.size = 250;
   $scope.LoadButton = function(){
       $('#arc2').addClass('pulse');
      var url = URL + "cgi_action?";
       var data = "Action=Loadvmb";
       modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                  $scope.progress = 0.01;
       var progressinterval  = $interval(function(){$scope.progress = $scope.progress + 0.01;
                      if($scope.progress > 0.75){
                         $interval.cancel(progressinterval);
                           $('#arc2').removeClass('hwprogressarcslow');
                           $('#arc2').addClass('hwprogressarc');
       
                          $scope.Load = false;
                      }
                    }, 10); 
                   $scope.getData();
                }
            else{
                $('#arc2').removeClass('pulse');
            }
    })
        
   
   }
   
    var progressinterval  = $interval(function(){$scope.progress = $scope.progress + 0.01;
                      if($scope.progress > 0.75){
                         $interval.cancel(progressinterval);
                         $('#arc2').addClass('pulse');
                          $scope.Load = false;
                      }
                    }, 10);    
    
    var progressinterval2  = $interval(function(){$scope.progress1 = $scope.progress1 + 0.01;
      if($scope.progress1 > 0.75){
         $interval.cancel(progressinterval2);
      }
    }, 10);
    
    $scope.Unload = function(){
       $('#arc2').removeClass('hwprogressarc');
       $('#arc2').addClass('hwprogressarcslow');
                  
       var url = URL + "cgi_action?";
       var data = "Action=Unloadvmb"
       modifyService.formdataRequest(url, data, function (response) {
            if (response.status == 200) {
                 var progressinterval  = $interval(function(){$scope.progress = $scope.progress - 0.01;
                      if($scope.progress < 0){
                         $interval.cancel(progressinterval);
                          $('#arc2').removeClass('pulse');
                          $scope.Load = true;
                      }
                    }, 10);  
                    $scope.getData();
                }
            else{
                $('#arc2').removeClass('hwprogressarcslow');
                 $('#arc2').addClass('hwprogressarc');
            }
    })
        
    }
    $scope.Load = false;
    
    $scope.getData = function(){
        var post = "cgi_get?Object=coreid";
				$http.get(URL + post).
						success(function (data, status, headers, config) {
							if (status === 200) {
                                angular.forEach(data.Objects, function(object){
                                   $scope[object.ObjName.replace(/\./g, '')] = [];
                                    angular.forEach(object.Param, function(param){
                                        $scope[object.ObjName.replace(/\./g, '')][param.ParamName.replace(/\ /g, '')] = param.ParamValue;
                                    })
                                });
                            }
											
							
						}).
						error(function (data, status, headers, config) {
							 $scope.isScanning = false;
						});
                
}
    
});
