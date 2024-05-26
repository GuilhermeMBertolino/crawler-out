"use strict";!function(){function WpsConnectionDialogController($scope){_.extend($scope,{connect:function(){$scope.wps_connection.$invalid||$scope.closeThisDialog($scope.wps)},validationPIN:function(pin){var accum;if(!pin)return null;if(pin=pin.replace(/(\-|\ )/g,""),!new RegExp("^[0-9]+(.?[0-9]+|[0-9]*)$").test(pin))return"wifi_wps_invalid_pin";if(4!=pin.length&&8!=pin.length)return"wifi_wps_invalid_pin";if(8==pin.length){var pin=parseInt(pin);if(accum=0,accum+=3*(parseInt(pin/1e7)%10),accum+=1*(parseInt(pin/1e6)%10),accum+=3*(parseInt(pin/1e5)%10),accum+=1*(parseInt(pin/1e4)%10),accum+=3*(parseInt(pin/1e3)%10),accum+=1*(parseInt(pin/100)%10),accum+=3*(parseInt(pin/10)%10),accum+=1*(parseInt(pin/1)%10),accum%10!=0)return"wifi_wps_invalid_pin"}return null},getSupportedConnectMethods:function(){return[{name:"PBC",value:"PBC"}]},wps:{method:"PBC"}})}angular.module("app").controllerProvider.register("WpsConnectionDialogController",WpsConnectionDialogController),WpsConnectionDialogController.$inject=["$scope"]}();