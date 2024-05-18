myapp.controller("hotspotVenueInfoController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $timeout, $interval, $q,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    var previoousmessages = [];
    /* Breadscrumbs Logic starts here */
    var jsonpromise = $interval(function () {
//        console.log(breadcrumbsdata)
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
//        console.log($rootScope["breadcrumbs"])

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
        location.href = "#/custom/" + param1;
    };
    changedFields = [];
    var objectInfo = localStorage.getItem('hybrideditObject');
    var interfacelist = [];
    
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {

                    if (status === 200) {
                        objects = data.Objects;
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
                            }
                        }
                    }
                    else if (status === 203) {
                        $scope["venuinfoform" + "popup"] = true;
                        $scope["venuinfoform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                            $scope["venuinfoform" + "popup"] = true;
                            $scope["venuinfoform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
                });
    };
    $scope.addReplaceValue = {};
    
    $scope.dropdownUrl = function (objectname, paramname, jsonname) {
        if (jsonname.indexOf('cgi_get') > -1) {
            $http.get(URL + jsonname).
                    success(function (data, status, headers, config) {
                        var dropdowndata = data.Objects;
                        var temparray = [];
//                        temparray.push({"id": "", "name": "Select"});
                        console.log(dropdowndata);
                        angular.forEach(dropdowndata, function (dropObject) {
                            var tempObj = {};
                            var dropParam = dropObject.Param[0].ParamValue;
                            tempObj.objectname = dropObject.ObjName;
                            tempObj.value = dropParam;
                            tempObj.content = dropParam;
                            if(dropObject.Param[2].ParamValue.indexOf('Bridged') == -1)
                                temparray.push(tempObj);
                            $scope.addReplaceValue[dropObject.Param[0].ParamValue] = dropObject.Param[1].ParamValue;
                        });
                        $scope[paramname] = temparray;
                        if ($scope[objectname] === undefined)
                            $scope[objectname] = {};
                        $scope[objectname][paramname] = temparray[0].id;
//                        if (paramname == "Interface")
//                            $('#source').shuttle();
                        var t = $('#test').bootstrapTransfer(
                                {'target_id': 'multi-select-input',
                                    'height': '150px',
                                    'hilite_selection': true});
                        t.populate($scope["Interface"]);
                        setTimeout(function () {
                            t.set_values(interfacelist);
                        }, 1000);
                        console.log($scope[paramname]);
                    })

                    .error(function (data, status, headers, config) {
                    });
        }
        else {

            $.getJSON(jsonname + ".json", function (data) {
                $scope[paramname] = data[paramname];
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                if ($scope[paramname][0] !== undefined)
                    $scope[objectname][paramname] = $scope[paramname][0].id;
            });
        }
    };
    
    $scope.dropdownUrlRequest = function (objectname, paramname, jsonname) {
        if (jsonname.indexOf('cgi_get') > -1) {
            var temparray = [];
            temparray.push({"id": "", "name": "Select"});
            var tempUrls = [];
            var getDropdownData = function (data, status, headers, config) {
                if( status == 200 ){
                    var dropdowndata = data.Objects;
                    angular.forEach(dropdowndata, function (dropObject) {
                        var tempObj = {};
                        var dropParam = dropObject.Param[0].ParamValue;
                        console.log("dropParam",dropParam);
                        if (dropParam.indexOf(',') > -1) {
                            angular.forEach(dropParam.split(','), function (csv) {
                                var tempObj = {};
                                tempObj.objectname = dropObject.ObjName;
                                tempObj.id = csv;
                                tempObj.name = csv;
                                temparray.push(tempObj);
                            });
                        }
                        else {
                            tempObj.objectname = dropObject.ObjName;
                            tempObj.id = dropObject.ObjName.match(/\d+/g)[0];
                            tempObj.name = dropParam;
                            temparray.push(tempObj);
                        }
                        console.log("temparray",temparray);
                    });
                }
            };

            var Urlvalues = jsonname.split(',');
            angular.forEach(Urlvalues, function(Urlvalue){
                console.log(Urlvalue.indexOf('?'));
                if(Urlvalue.indexOf('?') > -1){
                    var UrlQueryvalues = Urlvalue.split('?');
                    var UrlObjectValues = UrlQueryvalues[1].split('Object=');
                    angular.forEach(UrlObjectValues, function(UrlObjectValue){
                        if(UrlObjectValue != ""){
                            tempUrls.push($http.get(URL + UrlQueryvalues[0]+'?Object='+UrlObjectValue).
                                success(function (data, status, headers, config) {
                                    getDropdownData(data, status, headers, config);
                                })
                                .error(function (data, status, headers, config) {
                                })
                            );
                        }
                    });
                }else{
                    tempUrls.push($http.get(URL + Urlvalue).
                        success(function (data, status, headers, config) {
                            getDropdownData(data, status, headers, config);
                        })
                        .error(function (data, status, headers, config) {
                        })
                    );
                }
            });

            $q.all(tempUrls).then(function(){
                $scope[paramname] = temparray;
                if ($scope[objectname] === undefined)
                    $scope[objectname] = {};
                $scope[objectname][paramname] = temparray[0].id;
                if(temparray[1] != undefined)
                    $scope[objectname][paramname] = temparray[1].id;
                if(objectname == "temp"){
                    setTimeout(function(){
                        $scope.ssidChange($scope[objectname][paramname]);
                    },300);
                }
                $("#dataView").find("dropdown-multiselect").map(function (i)
                {
                    $scope.users = [];
                    $scope.ddvalues = temparray;
                    angular.forEach($scope.ddvalues, function (doc, dropdownIndex) {
                        if (dropdownIndex !== 0)
                            $scope.users.push(doc);
                    });
                });
            });
            console.log("drop url");
        }
        else {
            $.getJSON(jsonname + ".json", function (data) {
                if(paramname == "VenueType"){
                    if ($scope[objectname] === undefined)
                        $scope[objectname] = {};
                    if ($scope[objectname][paramname] == undefined && $scope[paramname] !== undefined && $scope[paramname][0] !== undefined)
                        $scope[objectname][paramname] = $scope[paramname][0].id;
                    $scope[paramname] = data[paramname][$scope[objectname]["VenueGroup"]];
                    console.log($scope[objectname]["VenueGroup"],'$scope[objectname]["VenueGroup"]',objectname);
                }else{
                    $scope[paramname] = data[paramname];
                    if ($scope[objectname] === undefined)
                        $scope[objectname] = {};
                    if ($scope[paramname] !== undefined && $scope[paramname][0] !== undefined)
                        $scope[objectname][paramname] = $scope[paramname][0].id;
                }
                
                if(paramname == "VenueGroup"){
                    $scope.dropdownUrlRequest('DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20', 'VenueType', 'hotspotvenuetype');
                }
            });
        }
    };
    
    $scope.$watch("DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20.VenueGroup",function( newval, oldval){
//       console.log($scope["DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20"]);
//       console.log(oldval, newval, "old new");
       $scope.dropdownUrlRequest('DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20', 'VenueType', 'hotspotvenuetype');
    }, true);
    var currentval = "cgi_get?Object=Device.WiFi.AccessPoint.*.X_LANTIQ_COM_Vendor.HS20";
    
    $scope.ssidChange = function (value) {
		        $("#ajaxLoaderSection").show();

        console.log("ssidChange",value);
        if (value !== undefined) {
            $scope["temp"]["SSID"] = value;
            $timeout(function () {
//                $scope.dropdownUrlRequest('DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20', 'Enable', 'hotspotenable')
                 $http.get(URL + "cgi_get_nosubobj?Object=Device.WiFi.AccessPoint&SSIDReference=Device.WiFi.SSID."+$scope["temp"]["SSID"]).success(function (data,status) {
            if (status === 200) {
				        $("#ajaxLoaderSection").hide();

                $scope.requiredAccessPoint = data.Objects[0].ObjName.replace(/\D/g, '');
				//alert($scope.requiredAccessPoint);
              
            }
            else if (status === 203) {
                       $("#ajaxLoaderSection").hide();

            }
            else if (status === 206) {
                     $("#ajaxLoaderSection").hide();

                }
                else {
                   
                }
            }).then(function(){
				getFormData("cgi_get?Object=Device.WiFi.AccessPoint." + $scope.requiredAccessPoint + ".X_LANTIQ_COM_Vendor.HS20");
                getFormTableData("Device.WiFi.AccessPoint." + $scope.requiredAccessPoint + ".X_LANTIQ_COM_Vendor.HS20.VenueName");
			        $("#ajaxLoaderSection").hide();

            })	
				
        })
				

			}
        
    };
    

    
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
    
    var venuenamefields = [];
    $scope.maintableobject;
    
    getFormTableData = function(objname){
        console.log("objname getFormTableData", objname );
        $scope.dotremoval = [];
        var dotremovalobject = {};

        var dropdownIndex = objname.match(/\d+/g)[0];
        $scope[objname + "dropdownIndex"] =dropdownIndex; 
        var dotremove = objname.replace(/\./g, "").replace(/\*/g, "");
        $scope[dotremove + 'status'] = false;
        
        dotremovalobject["params"] = ["VenueName"];
        dotremovalobject["status"] = $scope[dotremove + 'status'];
        
        $scope[dotremove + "Objects"] = [];
        $scope.maintableobject = dotremove + "Objects";
        dotremovalobject["Objects"] = $scope[dotremove + "Objects"];
        
        var addobject = objname.replace(/\./g, "").replace(/\*/g, "")
        $scope[addobject] = {};
        dotremovalobject["paramsobject"] = $scope[addobject];
        dotremovalobject["originalobject"] = objname;
            
        $http.get(URL + "cgi_get?Object=" + objname).success(function (data,status) {
            if (status === 200) {
                var objects = data.Objects;
                angular.forEach(objects, function (object) {
                    var tempobj = {};
                    var params = object.Param;
                    angular.forEach(params, function (param) {
                        var paramname = param.ParamName;
                        var paramvalue = param.ParamValue;
                        if (dotremovalobject["params"].indexOf(paramname) > -1) {
                            tempobj[paramname] = paramvalue;
                        }
                    })
                    tempobj["z"] = object.ObjName;
                    console.log("tempobj",tempobj);
                    $scope[dotremove + "Objects"].push(tempobj);
                })
            }
            else if (status === 203) {
                $scope["venuinfoform" + "popup"] = true;
                $scope["venuinfoform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
            }
            else if (status === 206) {
                if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                    $scope["venuinfoform" + "popup"] = true;
                    $scope["venuinfoform" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                }
                else {
                    var popupvalue = '';
                    angular.forEach(data.Objects, function (object) {
                        $scope["venuinfoform" + "popup"] = true;
                        angular.forEach(object.Param, function (param) {
                            popupvalue += param.ParamName + ":" + param.ParamValue;
                        });
                    });
                    $scope["venuinfoform" + "popupval"] = popupvalue;
                }
            }
            console.log("$scope.dotremoval",$scope.dotremoval, $scope[dotremove + "Objects"]);
        });
        $scope.dotremoval.push(dotremovalobject);
        console.log("$scope.dotremoval",$scope.dotremoval);
        
    }
    
    $scope.editablechange = function (key, object, value) {
        if ($scope[object] == undefined)
            $scope[object] = {};
        $scope[object][key] = value;
    };
    
    $scope.showstatus = function (statusparam) {
        console.log("statusparam",statusparam);
        statusparam.status = true;
    }
    $scope.rowcancel = function (statusparam) {
        console.log("statusparam",statusparam);
        statusparam.status = false;
    }
    $scope.removeRow = function (event, index, obj) {
        var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        } else {
//            if($scope.tableplusarray.length > 0 && obj.localadd != undefined && obj.localadd.localaddfun){
//                var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
//                var currenttablearray = modifyService.dotstarremove(tableid, '.*').replace(/\./g, "").replace(/\*/g, "") +"table";
//                $scope[currenttablearray].splice(currentid, 1);
//                $scope.tableplusarray.splice(obj.localadd.localaddval, 1);
//            }else{
//                var tableid = event.currentTarget.attributes['id'].value
//                var curlen = $scope.tableplusarray.length;
//                for(var i=0 ; i < curlen ; i++){
//                    var currenttabarrayobj = $scope.tableplusarray[i].split('&')[0].split('Object=')[1];
//                    if(currenttabarrayobj == tableid)
//                        $scope.tableplusarray.splice(i, 1);
//                }
//                var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
//                var currenttablearray = modifyService.dotstarremove(tableid, '.*').replace(/\./g, "").replace(/\*/g, "") +"table";
//                var url = "Object=" + tableid + "&Operation=Del" + "&"
//                console.log("url",url,currenttablearray)
//                $scope[currenttablearray].splice(currentid, 1);
//                $scope.tableplusarray.push(url);
//            }
            console.log("index,row",index,obj);
            var modelobject = modifyService.dotstarremove(obj.z, '.*').replace(/\./g, "").replace(/\*/g, "")
            
            var url = '';
//            var url = URL + "cgi_set";
            var deleteobjects = event.currentTarget.id.split(',')
            var post = '';
            deleteobjects = modifyService.split(deleteobjects);
            angular.forEach(deleteobjects, function (obj) {
             //   post += "Object=" + obj + "&Operation=Del" + "&";
            url += "Object=" + obj + "&Operation=Del" + "&";
            })
            console.log(post,modelobject,$scope[modelobject + "Objects"],$scope[$scope.maintableobject]);
            $scope[$scope.maintableobject].splice(index, 1);
            $scope.tableplusarray.push(url);
        }
    }
    
    $scope.textchange = function (model) {
        console.log("model",model);
        
        venuenamefields.push(model);
    }
    
    $scope.textChange = function (value) {
        console.log("value",value);
        changedFields.push(value);
    };
    
    $scope.EditableApply = function (object, operation) {
        var tempobj = {};
        
        var post = '';
        var url = URL + "cgi_set";
        post += "Object=" + object.originalobject + "&Operation=" + operation;
        var modelobject = object.originalobject.replace(/\./g, "").replace(/\*/g, "");
        angular.forEach($scope[modelobject], function (value, key) {
            if (venuenamefields.indexOf(key) > -1) {
                post += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '') + "";
                tempobj[key] = value;
            }
        });
        
        tempobj["z"] = object.originalobject;
//        tempobj["localadd"] = {};
//        tempobj["localadd"]["localaddfun"] = true;
//        tempobj["localadd"]["localaddval"] = $scope.tableplusarray.length;
        $scope[modelobject + "Objects"].push(tempobj);
        $scope.rowcancel(object);
        $scope.tableplusarray.push(post);
        console.log(post, modelobject,$scope[modelobject + "Objects"], $scope.tableplusarray);
    }
    $scope.tableplusarray = [];
    $scope.rowlevelApply = function (object, operation, data, id) {
        var post = '';
        var url = URL + "cgi_set";
        post += "Object=" + object + "&Operation=" + operation
        angular.forEach($scope[object], function (value, key) {
            post += "&" + key + "=" + $sanitize(value).replace(/<[^>]+>/gm, '') + "";
        });
        $scope.tableplusarray.push(post);
        console.log("data, {id: id}",data, {id: id}, post, $scope.tableplusarray);
    }
    
    $scope.Apply = function (object, event) {
        $scope.venuinfostatus = true;
        if (event.currentTarget.attributes['formstatus'].value === "true" | changedFields.length >= 1) {
            urlstatus = false;
            var post = '';
            var url = URL + "cgi_set";
            var objectlevelurlstatus = false;
            var postobject = "Object=" + object.replace(/\*/g, $scope.requiredAccessPoint) + "&Operation=Modify";
            angular.forEach($scope[object.replace(/\./g, "").replace(/\*/g, '')], function (value, key) {
                if (changedFields.indexOf(object.replace(/\./g, "").replace(/\*/g, '') + key) > -1) {
                    objectlevelurlstatus = true;
                    urlstatus = true;
                    postobject += "&" + key + "=" + value;
                }
            });
            if (objectlevelurlstatus)
                post += postobject + ",";
            
            post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
            
            console.log($scope.tableplusarray,"$scope.tableplusarray","post",post)
            post += "&";
            
            if ($scope.tableplusarray.length > 0 ) {
                angular.forEach($scope.tableplusarray, function (postobject) {
                    var postobjectsplit = postobject.split('&');
                    postobjectsplit = postobjectsplit[0].split('Object=');
                    console.log("postobjectsplit",postobjectsplit,postobjectsplit[1].replace(/\./g, "").replace(/\*/g, ""),$scope[postobjectsplit[1].replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]);
                    postobject = postobject.replace('*',$scope[postobjectsplit[1].replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]);
                    post += postobject + "&"
                })
            }
            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
            console.log("final post",post);
            $scope['post'] = post;
            modifyService.genericRequest(url, post, function (response) {
                var formname = event.currentTarget.attributes['formname'].value;
                errorResponseDisplay(formname, response);
            });
        }
        else {
            alert("no params changed to update");
        }
    }
    
    function errorResponseDisplay(formname, response) {
        var formname = formname;
        var data = response.data;
        var status = response.status;
        $("#ajaxLoaderSection").hide();
        if (status == 200) {
            $route.reload();
        }
        else if (status == 203) {
            $scope[formname + "popup"] = true;
            $scope[formname + "popupval"] = data.Objects[0].Param[0].ParamValue
        }
        else if (status == 207) {
            localStorage.setItem('multistatus', true);
            localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue)
            if (elementstatus != undefined) {
                $scope.Add(elementstatus);
            }
            else {
                $route.reload();
            }
        }
        else if (status == 206) {
            angular.forEach(data.Objects, function (object) {
                var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "")
                angular.forEach(object.Param, function (param) {
                    $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                    $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue
//                                            $("#" + respobject + "_" + param.ParamName + "responsestatus").text(param.ParamValue);
                });
            });
        }
    }
    
});


