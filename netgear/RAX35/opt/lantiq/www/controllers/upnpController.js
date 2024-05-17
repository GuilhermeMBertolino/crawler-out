(function() {
  'use strict';

  myapp.controller('upnpController',  function($scope, $http, $route, $translate, $rootScope, $interval, modifyService, $q) {
      
      /* Breadscrumbs Logic starts here */
      var jsonpromise = $interval(function () {
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
    
    /* Only parameters that are available in $scope.tableValues will display in details table*/
    $scope.tableValues = ["UUID","USN","Location","ParentDevice"];
    
    $scope.iconTypeValues = {
        'MediaServer':'upnp-mediaserver',
        'MediaRenderer':'upnp-mediaserver',
        'BasicDevice':'fa-mobile',
        'CloudProxy':'fa-cloud',
        'DataStore':'fa-database',
        'DeviceManagement':'fa-cog',
        'FriendlyInfoUpdate':'fa-info-circle',
        'SolarProtectionBlind':'Upnp-solarblind',
        'LightingControls':'fa-lightbulb-o',
        'HVAC':'fan',
        'DigitalSecurityCamera':'fa-video-camera',
        'IoTManagementandControl':'Upnp-IoT',
        'MultiScreen':'upnp-multiscreen',
        'WLANAccessPoint':'fa-wifi',
        'InternetGateway':'upnp-internet',
        'DeviceProtection':'Upnp-deviceprotection',
        'Telephony':'fa-phone',
        'PrinterBasic':'fa-print',
        'PrinterEnhanced':'fa-print',
        'RemoteAccess':'Upnp-remoteaccess',
        'RemoteUIClient':'Upnp-remoteaccess',
        'Scanner':'Upnp-scanner',
        'ContentSync':'Upnp-sync',
        'DeviceSecurity':'Upnp-deviceprotection',
        'LowPower':'Upnp-Lowpower',
        'EnergyManagement':'Upnp-energymanagement',
        'QualityofService':'Upnp-qos',
        'default':'upnp-devices',
        'servicedefault':'Upnp-services'
    };
    
    $scope.textChange = function (value) {
        console.log(value);
        changedFields.push(value);
    };
    
    $scope.Apply = function(event){
        $scope.objectstatus = [];
        $scope.ddobject = {};
        var individualObject = '';
        var post = '';
        var operation = '';
        var url = URL + "cgi_set";
        $scope["modestatus"] = true;
        var formObject = ["Device.UPnP.Device"];
        var aliasObjects = modifyService.aliasDependency(angular.copy(formObject));
        var aliasParents = aliasObjects.parents;
        var aliasrelations = aliasObjects.childrelation;
        angular.forEach(formObject, function (objstring) {
            individualObject += objstring.replace(/[^a-zA-Z0-9_-]/g, '') + ",";
        });
        var obj2 = individualObject.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
        var changedfieldscount = 0;
        console.log("obj2==" + obj2);
        obj2.forEach(function (object, objindex) {
            var combineobject = '';
            operation = event.currentTarget.id;
            if (event.currentTarget.id === "Modify") {
                var aliasStatus = true;
                /* Alias Logic */
                combineobject = formObject[objindex];
                var parentIndex = aliasParents.indexOf(combineobject);
                if (parentIndex === 0) {
                    combineobject = combineobject.split('.*')[0];
                }
                if ((parentIndex > -1) && (aliasrelations[parentIndex].childrens.length >= 1)) {
                    if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")] !== undefined && $scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] !== undefined) {
                        if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] !== "")
                            aliasStatus = false;
                    }
                    if (!(aliasrelations[parentIndex].hasOwnProperty('Alias'))) {
                        if ($scope.randomvalue === undefined)
                            $scope.randomvalue = $scope.randomNumber(10, 99);
                        aliasrelations[parentIndex].Alias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                        changedFields.push(object + "" + "Alias");
                        if ($scope[object] === undefined)
                            $scope[object] = {};
                        if (aliasStatus) {
                            $scope[object]["Alias"] = aliasrelations[parentIndex].Alias;
                        }
                    }
                    combineobject = combineobject.split('.*')[0];
                }
                else {
                    if (parentIndex > -1) {
                        combineobject = combineobject.split('.*')[0];
                    }
                    else {
                        if (!(combineobject.slice(-1) === "*"))
                            operation = "Modify";
                        if ($scope.ddobject[combineobject.split('.*')[0] + "index"] !== undefined) {
                            combineobject = combineobject.replace('*', $scope.ddobject[combineobject.split('.*')[0] + "index"]);
                        }
                        else {
                            combineobject = combineobject.replace('*', (aliasrelations[(aliasParents.indexOf(combineobject.split('.*')[0] + ".*"))].Alias)).split('.*')[0];
                        }
                    }
                }
            }
            console.log("combineobject ==" + combineobject);
            var postBefore = "Object=" + combineobject + "&Operation=" + operation;
            var arrobj1 = object;
            if ($scope[arrobj1] !== undefined) {
                angular.forEach($scope[arrobj1],function(val, key){
                    if(key == "Enable"){
                        if(val == true){
                            $scope[arrobj1][key] = "true";
                        }else{
                            $scope[arrobj1][key] = "false";
                        }
                    }
                })
                var postformat = $rootScope.poststringformat(arrobj1, $scope[arrobj1], changedFields, changedfieldscount, $scope.objectstatus);
                if (postformat[0]) {
                    post += postBefore + postformat[1] + "&";
                }
                changedfieldscount = postformat[2];
            }

        });
        //No param changed.
        if(changedFields.length == 0){
            return '';
        }
        post = (post.replace(/(^[&\s]+)|([&\s]+$)/g, '') ).replace(/(^[&\s]+)|([&\s]+$)/g, '');
        $http.post(url, post).
            success(function (data, status, headers, config) {
                if (status === 200) {
                    localStorage.removeItem('hybrideditObject');
                    $('#ajaxLoaderSection').hide();
                    $route.reload();
                }
                else if (status === 203) {
                    $('#ajaxLoaderSection').hide();
                    $scope["upnp" + "popup"] = true;
                    $scope["upnp" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else if (status === 206) {
                    if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                        $scope["upnppost" + "popup"] = true;
                        $scope["upnppost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else {
                        angular.forEach(data.Objects, function (object) {
                            var respobject = modifyService.dotstarremove(object.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
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
                $('#ajaxLoaderSection').hide();
            });
    }
    
    /*
     * To reload the page
     */
    $scope.Refresh = function () {
        $route.reload();
    }
    
    $scope.treeModel = [{
        "id": "upnpdevices",
        "parent": "#",
        "text": "UPnP Devices",
        "icon":"upnp-top",
        "state": {
        }
      }];
  var d;
    $scope.getFormData = function (reqParams, parent) {
        d = $q.defer();
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    if (status === 200) {
                        var objects = data.Objects;
                        for (var i = 0; i < objects.length ; i++) {
                            var refObjectname = modifyService.dotstarremove(angular.copy(objects[i].ObjName), '.*');
                            var objectname = objects[i].ObjName;
                            var objectParamValues = objects[i].Param;
                            var tempTreeModel = {
                                "orgObject":{
                                    "objectname":objectname
                                }
                            };
                            
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                tempTreeModel.orgObject[param_name] = ParamValue;
                                if($scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")] == undefined)
                                    $scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                                if(refObjectname.replace(/\./g, "").replace(/\*/g, "") == "DeviceUPnPDevice" && param_name == "Enable"){
                                    if(ParamValue == "true")
                                        $scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = true
                                    else
                                        $scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")][param_name] = false
                                    $scope[refObjectname.replace(/\./g, "").replace(/\*/g, "")]['EnableControl'] = ParamValue;
                                }
                                if( param_name == "USN" ){
                                    if(objectname.indexOf("Device.UPnP.Discovery.Device.") > -1){
                                        tempTreeModel.id = ParamValue.split('::')[1];
                                        if(ParamValue.indexOf('device:') > -1){
                                            var type = ParamValue.substring(ParamValue.indexOf('device:')+7,ParamValue.lastIndexOf(':'))
                                            if($scope.iconTypeValues[type] != undefined && $scope.iconTypeValues[type] != ''){
                                                tempTreeModel.icon = $scope.iconTypeValues[type];
                                            }else{
                                                tempTreeModel.icon = $scope.iconTypeValues.default;
                                            }                                            
                                        }
                                        tempTreeModel.parent  = "upnpdevices";
                                    }else if(objectname.indexOf("Device.UPnP.Discovery.Service.") > -1){
                                        tempTreeModel.id = ParamValue;
                                        tempTreeModel.text = ParamValue.split('::')[1];
                                        if(ParamValue.indexOf('service:') > -1){
                                            var type = ParamValue.substring(ParamValue.indexOf('service:')+7,ParamValue.lastIndexOf(':'));
                                            if($scope.iconTypeValues[type] != undefined && $scope.iconTypeValues[type] != ''){
                                                tempTreeModel.icon = $scope.iconTypeValues[type];
                                            }else{
                                                tempTreeModel.icon = $scope.iconTypeValues['servicedefault'];
                                            }   
                                        }
                                    }
                                }
                                if(objectname.indexOf("Device") > -1){
                                    if( param_name == "X_VENDOR_COM_FriendlyName")
                                        tempTreeModel.text = ParamValue;
                                }
                                if(parent != true && param_name == "ParentDevice"){
                                    tempTreeModel.parent = ParamValue;
                                }
                            }
                            if($scope.treeModel.length == 1){
                                tempTreeModel.parent = "upnpdevices"
                                tempTreeModel.state = {
                                    "selected"  : true,                            
                                }
                            }
                            if(tempTreeModel.id != undefined){
                                console.log("tempTreeModel",tempTreeModel)
                                $scope.treeModel.push(tempTreeModel)
                            }
                            console.log("$scope.treeModel",$scope.treeModel);
                            
                            d.resolve();
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
        return d.promise;
    };
    
    $scope.getFormData("cgi_get_nosubobj?Object=Device.UPnP.Device");
    $http.get(URL + 'cgi_action?Object=Device.UPnP.Discovery&NOTIFICATION=NOTIFY_UPNP_UPDATE_REQ').
        success(function (data, status, headers, config) {            
            setTimeout(function(){
                $scope.getFormData("cgi_get?Object=Device.UPnP.Discovery")
                        .then(function(){
                           setTimeout(function(){
                                if($scope.treeModel[1] != undefined){
                                    console.log("inclick",$("li[id='" + $scope.treeModel[1].id + "'] a"));
                                    $("li[id='" + $scope.treeModel[1].id + "'] a").click();
                                }
                           },700);
                });
            },2000);
        }).
        error(function (data, status, headers, config) {
        });

        
  
      $scope.tree_core = {
        
        multiple: false,  // disable multiple node selection

        check_callback: function (operation, node, node_parent, node_position, more) {
            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
            // in case of 'rename_node' node_position is filled with the new node name

            if (operation === 'move_node') {
                return false;   // disallow all dnd operations
            }
            return true;  // allow all other operations
        }
      };
      
      $('#selectedname').text('');
      $scope.nodata = true;      
      
      $scope.nodeSelected = function(e, data) {
            //Logic to display data based on the node selected
            if(data.node.id == "upnpdevices"){
                $('#selectedname').text('');
                $scope.nodata = true;
                return'';
            }
            $scope.row = undefined;
            $scope.nodata = true
            var node = data.node.original.orgObject;
            angular.forEach($scope.tableValues, function(value, key){
                if(node && node.hasOwnProperty(value)){
                    if($scope.row == undefined)
                        $scope.row = {};
                    $scope.row[value] = node[value]                    
                }
            });
            console.log($scope.row);
            $('#selectedname').text('('+data.node.text+')');
            if($scope.row == undefined){
                $scope.nodata = true;
            }else
                $scope.nodata = false;
            $scope.$digest(); 
      };
    });

}());
