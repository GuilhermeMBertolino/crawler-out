"use strict";function ConfirmDialog3Ctrl($scope,$state){var warnings=$scope.ngDialogData.warnings;$scope.isWanReservWarning=!1,$scope.isVoIPWarning=!1,$scope.isOnlyCancel=!1;for(var i in warnings)"wan_reserv"==warnings[i].warning&&($scope.isWanReservWarning=!0),"voip_error"==warnings[i].warning&&($scope.isVoIPWarning=!0,$scope.isOnlyCancel=!0),_.contains(["firewall_zones","firewall_masq","firewall_policy","firewall_rules","igmpx_stream"],warnings[i].warning)&&($scope.isOnlyCancel=!0);$scope.confirm=function(){return $scope.isWanReservWarning?($state.go("settings.wanFailover"),void $scope.closeThisDialog(!1)):void $scope.closeThisDialog({confirm:!0,isVoIp:$scope.isVoIPWarning})},$scope.cancel=function(){$scope.closeThisDialog(!1)}}ConfirmDialog3Ctrl.$inject=["$scope","$state"];