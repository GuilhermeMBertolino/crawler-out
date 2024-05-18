myapp.controller("addNetworkController", function ($scope,$location, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $interval, $timeout,httpService) {
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
    $scope.addNetworkDropDown=["WPA-Personal","WPA2-Personal"
,"WPA-WPA2-Personal","WPA2-Enterprise","WEP-64","WEP-128","None"]
   

$scope.addNewNetwork=function(){
    var currentIndex="";
    httpService.getData(URL + "Object=Device.X_INTEL_COM_BEEROCKS.WiFi.Front.Ap&EntryValid=false").success(function(data){
        $('#ajaxdataLoaderSection').show();

        var response=data.Objects;

        for (var i=0;i<response.length;i++){
            var objectname=response[i].ObjName;
             currentIndex=objectname[objectname.length -1];
            var EntryValid=response[i].Param[4].ParamName;
            var EntryValidValue=response[i].Param[4].ParamValue;

            if (EntryValidValue==="false"){
                    break;
                }

        }
        if(currentIndex!="" && currentIndex<5){
            var post="Object=Device.X_INTEL_COM_BEEROCKS.WiFi.Front.Ap."+currentIndex+"&Operation=Modify&EntryValid=true";
            if($scope.selected.SSID)
            post+="&SSID="+$scope.selected.SSID;
            if($scope.selected.ModeEnabled)
            post+="&ModeEnabled="+$scope.selected.ModeEnabled;
            if($scope.selected.KeyPassphrase)
            post+="&KeyPassphrase="+$scope.selected.KeyPassphrase;
            if($scope.selected.Hidden)
            post+="&Hidden="+$scope.selected.Hidden;
            if($scope.selected){
            $http.post(URL + "cgi_set?",post).success(function(){
                $('#ajaxdataLoaderSection').show();

                        $location.path("/tableform/home_wifi_gw");
                        $route.reload();
                        $('#ajaxdataLoaderSection').hide();

                        $scope.closeThisDialog("OK");
                        return true;
                    })

                }
            
                }
    })

}
});
