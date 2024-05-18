myapp.controller("dualwanFormController", function ($scope, $http, $route, $routeParams, localStorageService, modifyService, $translate, $rootScope, $timeout, $interval, $q,$sanitize) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    var previoousmessages = [];
    var childobject = "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.WANConnections.*";
    var childparams = ["Interface", "Weight", "Bandwidth", "Reliability", "Count", "Timeout", "Interval", "Up", "Down","TrackIp1","TrackIp2","TrackIp3","TrackIp4"];
    var typeobject = "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.Type";
    var typeparams = ["Name", "TestURL", "Policy"];
    var shuttle_status = false;
    /* Breadscrumbs Logic starts here */
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
    var changedFields = [];
    var objectInfo = localStorage.getItem('hybrideditObject');
    var interfacelist = [];
    $scope["multiwanchildobjects"] = [];
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
                                if (childparams.indexOf(param_name) > -1) {
                                    if (param_name == "Interface") {
                                        interfacelist.push(ParamValue);
                                        currentInterface = ParamValue;
                                    }
                                    $scope.objvalues[param_name] = ParamValue;
                                }
                            }
                            if (objectname === childobject) {
                                $scope.objvalues["objectname"] = objects[obj].ObjName;
                                $scope[currentInterface] = $scope.objvalues;
                                $scope["multiwanchildobjects"].push($scope.objvalues);
                            }
                            if (objectname === typeobject) {
                                $scope.typeobj = objects[obj].ObjName;
                            }
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
                            tempObj.id = dropParam;
                            tempObj.name = dropParam;
                            temparray.push(tempObj);
                        }
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
    $scope.randomNumber = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (objectInfo !== null) {
        setTimeout(function () {
            getFormData("cgi_get?Object=" + localStorage.getItem('hybrideditObject'));
        }, 1000);
    }
    if (objectInfo !== null) {
        $("#Modify").show();
        $("#Add").hide();
    }
    else {
        $("#Modify").hide();
        $("#Add").show();
    }
    $scope.textChange = function (value) {
        console.log(value);
        changedFields.push(value);
    };
    $scope["dualwanformstatus"] = false;
    $scope.Add = function (event) {
        var localpost = '';
        $scope["dualwanformstatus"] = true;
        if (event.currentTarget.attributes['formstatus'].value === "true") {
            /*Add Operation*/
            $scope.objectstatus = [];
            $scope.ddobject = {};
            var trackIPcount = [];
            var trackReliability = [];
            if (event.currentTarget.attributes["id"].value === "Add") {
                var individualObject = '';
                var post = '';
                var operation = '';
                var url = URL + "cgi_set";
                $scope["modestatus"] = true;
                var formObject = ["Device.X_LANTIQ_COM_Multiwan.Multiwan.*", "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.Type", "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.MPTCP", "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.TCPPing", "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.WANConnections.*"];                
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
                    if (event.currentTarget.id === "Add") {
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
                                    console.log($scope[object]["Alias"]);
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
                            if(key == "Enabled"){
                                if(val == true){
                                    $scope[arrobj1][key] = 1;
                                }else{
                                    $scope[arrobj1][key] = 0;
                                }
                                console.log("$scope[arrobj1]",$scope[arrobj1]);
                            }
                        })
                        var postformat = $rootScope.poststringformat(arrobj1, $scope[arrobj1], changedFields, changedfieldscount, $scope.objectstatus);
                        if (postformat[0]) {
                            post += postBefore + postformat[1] + "&";
                        }
                        changedfieldscount = postformat[2];
                    }

                    if (objindex == obj2.length - 1) {

                        angular.forEach($scope["multiwanchildobjects"], function (wanobject, index) {
                            delete wanobject.$$hashKey;
                            trackIPcount[index] = 0; 
                            if(wanobject.TrackIp1 != '')
                                trackIPcount[index]++
                            if(wanobject.TrackIp2 != '')
                                trackIPcount[index]++
                            if(wanobject.TrackIp3 != '')
                                trackIPcount[index]++
                            if(wanobject.TrackIp4 != '')
                                trackIPcount[index]++
                            trackReliability[index] = wanobject.Reliability;
                            localpost += "&" + postBefore;
                            for (param in wanobject) {
                                if (param != "objectname"){
                                    if (param == "Interface"){
                                        console.log("wanobject[param]",param,wanobject[param],$scope.addReplaceValue[wanobject[param]]);
                                        localpost += "&" + param + "=" + $sanitize($scope.addReplaceValue[wanobject[param]]).replace(/<[^>]+>/gm, '');
                                    }else{
                                        localpost += "&" + param + "=" + wanobject[param];
                                    }                                    
                                }                                
                            }
                        })
                    }
                });
//                $scope["post"] = post;
//                console.log($scope["post"]);
            }
            var trackIPCountVal = trackIPcount[0] > trackIPcount[1] ? trackIPcount[0] : trackIPcount[1];
            var trackReliabilityVal = trackReliability[0] > trackReliability[1] ? trackReliability[0] : trackReliability[1];
            console.log("trackIPcount", trackIPCountVal, trackReliabilityVal);
            if(trackReliabilityVal > trackIPCountVal){
                $scope.dualwanform.Reliability.$error.max = true; 
                return'';
            }else
                $scope.dualwanform.Reliability.$error.max = false; 
            
            post = (post.replace(/(^[&\s]+)|([&\s]+$)/g, '') + localpost).replace(/(^[&\s]+)|([&\s]+$)/g, '');
            $("#ajaxLoaderSection").show();
            $http.post(url, post).
                    success(function (data, status, headers, config) {
                        $("#ajaxLoaderSection").hide();
                        if (status === 200) {
                            localStorage.removeItem('hybrideditObject');
                            $scope.Cancel('dualwan');
                            $('#ajaxLoaderSection').hide();
                        }
                        else if (status === 203) {
                            $('#ajaxLoaderSection').hide();
                            $scope["multiwanformpost" + "popup"] = true;
                            $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                        }
                        else if (status === 206) {
                            if (data.Objects.length < 2 && data.Objects[0].Param.length < 2) {
                                $scope["multiwanformpost" + "popup"] = true;
                                $scope["multiwanformpost" + "popupval"] = data.Objects[0].Param[0].ParamValue;
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
    };
    $scope.Modify = function (event) {
        $scope["dualwanformstatus"] = true;
        if (event.currentTarget.attributes["id"].value === "Modify") {
            $('#ajaxLoaderSection').show();
            var post = '';
            urlstatus = false;
            var wanconnection_post = '';
            angular.forEach($scope["multiwanchildobjects"], function (data) {
                delete data.$$hashKey;
                var booleanstatus = false;
                if (data.objectname == "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.WANConnections") {
                    var localpost = "Object=" + objectInfo + ".WANConnections" + "&Operation=Add&";
                }
                else {
                    var localpost = "Object=" + data.objectname + "&Operation=Modify&";
                }
                for (params in data) {
                    if (changedFields.indexOf(data.objectname + params) > -1) {
                        booleanstatus = true;
                        urlstatus = true;
                        localpost += params + "=" + $sanitize(data[params]).replace(/<[^>]+>/gm, '') + "&";
                    }
                }
                if (booleanstatus)
                    wanconnection_post += localpost;
            });
            post = wanconnection_post;
            var url = URL + "cgi_set";
            var formobjects = ["Device.X_LANTIQ_COM_Multiwan.Multiwan.*", "Device.X_LANTIQ_COM_Multiwan.Multiwan.*.Type"];
            angular.forEach(formobjects, function (object) {
                if (object === typeobject) {
                    objectInfo = $scope.typeobj;
                }
                var objectlevelurlstatus = false;
                var postobject = "Object=" + objectInfo + "&Operation=" + event.currentTarget.attributes["id"].value;
                angular.forEach($scope[object.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                    if (changedFields.indexOf(object.replace(/\./g, "").replace(/\*/g, "") + key) > -1) {
                        objectlevelurlstatus = true;
                        urlstatus = true;
                        postobject += "&" + key + "=" + value;
                    }
                });
                if (objectlevelurlstatus)
                    post += postobject + "&";
            });
            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
            if (urlstatus) {
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            if (status === 200) {
                                localStorage.removeItem('hybrideditObject');
                                $scope.Cancel('dualwan');
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
    };
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    };
    $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanMPTCP = {};
    $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanMPTCP.Enabled = 0;
    $scope.TCP_Ping = false;
    $scope.MPTCPreq = false;
    $scope.TCPreq = false;
    $scope.mptcpClick = function(eve){
        var nameElement = angular.element('#DeviceX_LANTIQ_COM_MultiwanMultiwanType_Name');
        var DestIpElement = angular.element('#DeviceX_LANTIQ_COM_MultiwanMultiwanType_DestIp');
        if($scope.DeviceX_LANTIQ_COM_MultiwanMultiwanMPTCP.Enabled){
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.Name = "LoadBalanced";
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.DestIp = "0.0.0.0/0";
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeName");
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeDestIp");
            nameElement.attr('disabled', '');    
            DestIpElement.attr('disabled', '');   
        }else{
            nameElement.removeAttr('disabled');
            DestIpElement.removeAttr('disabled');
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.Name = "";
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.DestIp = "";
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeName");
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeDestIp");
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanMPTCP = {};
        }
    }
    $scope.tproxyClick = function(eve){
        var nameElement = angular.element('#DeviceX_LANTIQ_COM_MultiwanMultiwanType_Name');
        var DestIpElement = angular.element('#DeviceX_LANTIQ_COM_MultiwanMultiwanType_DestIp');
        if($scope.DeviceX_LANTIQ_COM_MultiwanMultiwan.TProxy){
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.Name = "LoadBalanced";
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.DestIp = "0.0.0.0/0";
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeName");
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeDestIp");
            nameElement.attr('disabled', '');
            DestIpElement.attr('disabled', '');
        }else{
            nameElement.removeAttr('disabled');
            DestIpElement.removeAttr('disabled');
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.Name = "";
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanType.DestIp = "";
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeName");
            $scope.textChange("DeviceX_LANTIQ_COM_MultiwanMultiwanTypeDestIp");
        }
    }
    $scope.tcpClick = function(eve){
        if($scope.DeviceX_LANTIQ_COM_MultiwanMultiwanTCPPing.Enabled){
            //When TCp Ping Enable
        }else{
            $scope.DeviceX_LANTIQ_COM_MultiwanMultiwanTCPPing = {};
        }
    }
    
    $(function () {

        $scope.dropdownUrl('DeviceX_LANTIQ_COM_MultiwanMultiwanWANConnections', 'Interface', 'cgi_get_fillparams?Object=Device.X_LANTIQ_COM_NwHardware.WANConnection&ConnectionName=&UciSection=&AddressType=')



        $.fn.bootstrapTransfer = function (options) {
            var settings = $.extend({}, $.fn.bootstrapTransfer.defaults, options);
            var _this;
            /* #=============================================================================== */
            /* # Expose public functions */
            /* #=============================================================================== */
            this.populate = function (input) {
                _this.populate(input);
            };
            this.set_values = function (values) {
                _this.set_values(values);
            };
            this.get_values = function () {
                return _this.get_values();
            };
            return this.each(function () {
                _this = $(this);
                /* #=============================================================================== */
                /* # Add widget markup */
                /* #=============================================================================== */
                _this.append($.fn.bootstrapTransfer.defaults.template);
                _this.addClass("bootstrap-transfer-container");
                /* #=============================================================================== */
                /* # Initialize internal variables */
                /* #=============================================================================== */
                _this.$filter_input = _this.find('.filter-input');
                _this.$remaining_select = _this.find('select.remaining');
                _this.$target_select = _this.find('select.target');
                _this.$add_btn = _this.find('.selector-add');
                _this.$remove_btn = _this.find('.selector-remove');
                _this.$choose_all_btn = _this.find('.selector-chooseall');
                _this.$clear_all_btn = _this.find('.selector-clearall');
                _this._remaining_list = [];
                _this._target_list = [];
                /* #=============================================================================== */
                /* # Apply settings */
                /* #=============================================================================== */
                /* target_id */
                if (settings.target_id != '')
                    _this.$target_select.attr('id', settings.target_id);
                /* height */
                _this.find('select.filtered').css('height', settings.height);
                /* #=============================================================================== */
                /* # Wire internal events */
                /* #=============================================================================== */
                _this.$add_btn.click(function () {
                    var data = _this.$remaining_select.val();
                    for (var i = 0; i < data.length; i++) {
                        var n = interfacelist.indexOf(data[i]);
                        if (n === -1) {
                            if ($scope[data[i]] == undefined) {
                                var temp = {};
                                interfacelist.push(data[i]);
                                temp["Interface"] = data[i];
                                temp["Weight"] = '';
                                temp["Bandwidth"] = '';
                                temp["Reliability"] = '';
                                temp["Count"] = '';
                                temp["Timeout"] = '';
                                temp["Interval"] = '';
                                temp["Up"] = '';
                                temp["Down"] = '';
                                temp["TrackIp1"] = '';
                                temp["TrackIp2"] = '';
                                temp["TrackIp3"] = '';
                                temp["TrackIp4"] = '';
                                temp["objectname"] = 'Device.X_LANTIQ_COM_Multiwan.Multiwan.*.WANConnections';
                                $scope.$apply(function () {
                                    $scope["multiwanchildobjects"].push(temp);
                                });
//                                console.log($scope["multiwanchildobjects"]);
                            }
                            else {
                                $scope.$apply(function () {
                                    console.log("Else block");
                                    $scope["multiwanchildobjects"].push($scope[data[i]]);
                                });
                            }

                        }


                    }

                    _this.move_elems(_this.$remaining_select.val(), false, true);
                });
                _this.$remove_btn.click(function () {
                    console.log(interfacelist);
                    console.log($scope["multiwanchildobjects"]);
                    var remdata = _this.$target_select.val();
                    console.log(remdata);
                    for (var i = 0; i < remdata.length; i++) {
                        var n = interfacelist.indexOf(remdata[i]);
                        console.log(n);
                        console.log(interfacelist.indexOf(remdata[i]));
                        if (n !== -1) {
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    $scope[remdata[i]] = $scope["multiwanchildobjects"][n];
                                    interfacelist.splice(n, 1);
                                    $scope["multiwanchildobjects"].splice(n, 1);
                                });
                            }, 500);
                            console.log($scope["multiwanchildobjects"]);
                        }
                    }
                    _this.move_elems(_this.$target_select.val(), true, false);
                });
                _this.$choose_all_btn.click(function () {
                    _this.move_all(false, true);
                });
                _this.$clear_all_btn.click(function () {
                    _this.move_all(true, false);
                });
                _this.$filter_input.keyup(function () {
                    _this.update_lists(true);
                });
                /* #=============================================================================== */
                /* # Implement public functions */
                /* #=============================================================================== */
                _this.populate = function (input) {
                    // input: [{value:_, content:_}]
                    _this.$filter_input.val('');
                    for (var i in input) {
                        var e = input[i];
                        _this._remaining_list.push([{value: e.value, content: e.content}, true]);
                        _this._target_list.push([{value: e.value, content: e.content}, false]);
                    }
                    _this.update_lists(true);
                };
                _this.set_values = function (values) {
                    _this.move_elems(values, false, true);
                };
                _this.get_values = function () {
                    return _this.get_internal(_this.$target_select);
                };
                /* #=============================================================================== */
                /* # Implement private functions */
                /* #=============================================================================== */
                _this.get_internal = function (selector) {
                    var res = [];
                    selector.find('option').each(function () {
                        res.push($(this).val());
                    })
                    return res;
                };
                _this.to_dict = function (list) {
                    var res = {};
                    for (var i in list)
                        res[list[i]] = true;
                    return res;
                }
                _this.update_lists = function (force_hilite_off) {
                    var old;
                    if (!force_hilite_off) {
                        old = [_this.to_dict(_this.get_internal(_this.$remaining_select)),
                            _this.to_dict(_this.get_internal(_this.$target_select))];
                    }
                    _this.$remaining_select.empty();
                    _this.$target_select.empty();
                    var lists = [_this._remaining_list, _this._target_list];
                    var source = [_this.$remaining_select, _this.$target_select];
                    for (var i in lists) {
                        for (var j in lists[i]) {
                            var e = lists[i][j];
                            if (e[1]) {
                                var selected = '';
                                if (!force_hilite_off && settings.hilite_selection && !old[i].hasOwnProperty(e[0].value)) {
                                    selected = 'selected="selected"';
                                }
                                source[i].append('<option ' + selected + 'value=' + e[0].value + '>' + e[0].content + '</option>');
                            }
                        }
                    }
                    _this.$remaining_select.find('option').each(function () {
                        var inner = _this.$filter_input.val().toLowerCase();
                        var outer = $(this).html().toLowerCase();
                        if (outer.indexOf(inner) == -1) {
                            $(this).remove();
                        }
                    })
                };
                _this.move_elems = function (values, b1, b2) {
                    for (var i in values) {
                        val = values[i];
                        for (var j in _this._remaining_list) {
                            var e = _this._remaining_list[j];
                            if (e[0].value == val) {
                                e[1] = b1;
                                _this._target_list[j][1] = b2;
                            }
                        }
                    }
                    _this.update_lists(false);
                };
                _this.move_all = function (b1, b2) {
                    for (var i in _this._remaining_list) {
                        _this._remaining_list[i][1] = b1;
                        _this._target_list[i][1] = b2;
                    }
                    _this.update_lists(false);
                };
                _this.data('bootstrapTransfer', _this);
                return _this;
            });
        };
        $.fn.bootstrapTransfer.defaults = {
            'template':
                    '<table width="100%" cellspacing="0" cellpadding="0" class="hide">\
                <tr>\
                    <td width="40%">\
                        <div class="selector-available">\
                            <h2>Internet Connections</h2>\
                            <div class="selector-filter hide">\
                                <table width="100%" border="0">\
                                    <tr>\
                                        <td style=width:30px">\
                                            <i class="fa fa-search"></i>\
                                        </td>\
                                        <td>\
                                            <div style="padding:10px 0 0;">\
                                                <input type="text" class="filter-input">\
                                            </div>\
                                        </td>\
                                    </tr>\
                                </table>\
                            </div>\
                            <select multiple="multiple" class="filtered remaining">\
                            </select>\
                            <a href="#" class="selector-chooseall hide">Choose all</a>\
                        </div>\
                    </td>\
                    <td width="10%">\
                        <div class="selector-chooser">\
                            <a  class="selector-add"><i class="fa fa-arrow-right btn-info"></i></a>\
                            <a  class="selector-remove"><i class="fa fa-arrow-left btn-info"></i></a>\
                        </div>\
                    </td>\
                    <td width="40%">\
                        <div class="selector-chosen">\
                            <h2>Multi WAN Entries</h2>\
                            <div class="selector-filter right hide">\
                                <p>Select then click</p><span class="illustration"></span>\
                            </div>\
                            <select multiple="multiple" class="filtered target">\
                            </select>\
                            <a href="#" class="selector-clearall hide">Clear all</a>\
                        </div>\
                    </td>\
                </tr>\
            </table>',
            'height': '10em',
            'hilite_selection': true,
            'target_id': ''
        }




        //console.log(t.get_values());
    });
});


