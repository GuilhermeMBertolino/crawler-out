"use strict";angular.module("trouble").controller("errorCableCtrl",["$scope",function($scope){$scope.DSLMode?($scope.title="dcc_trouble_cablerr_title_dsl",$scope.message="dcc_trouble_cablerr_gen_dsl"):$scope.EtherwanMode?($scope.title="dcc_trouble_cablerr_title",$scope.message="dcc_trouble_cablerr_gen_etherwan"):($scope.title="dcc_trouble_cablerr_title",$scope.message="dcc_trouble_cablerr_gen")}]);