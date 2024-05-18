myapp.controller('formController', function ($scope, $route, $http, localStorageService, $location, $routeParams, modifyService) {
    var parameterlist = '';
    var tableObjectdata = modifyService.objectData($("#dataView").find('form').attr('name'))
    var formObjects = tableObjectdata.postObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
    parameterlist = tableObjectdata.parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '')
    parameterlist = parameterlist.split(',')
    var changedFields = [];
    $scope.textChange = function (objectname) {
        changedFields.push(objectname);
    }
    var editObject = localStorageService.get('hybrideditObject');
    console.log(editObject);
    if (editObject != null) {
        $("#Add").attr('value', 'Modify')
        $("#Add").attr('id', 'Modify')
        //        localStorageService.clearAll();
        editObject = editObject.split(',')
        var url = URL + "cgi_get?"
        var data = angular.copy(editObject);
        var retdata = modifyService.split(data);
        angular.forEach(formObjects, function (values) {
//            var number = values.match(/\d+/g);
//            if (number.length > 0) {
//                for (var k = 0; k < number.length; k++) {
//                    value = '.' + number[k]
//                    values = values.replace(value, '')
//                }
            //            }
            $scope[values.replace(/\./g, "").replace(/\*/g, "")] = {};
        });
        angular.forEach(retdata, function (values) {
            url += "Object=" + values + ",";
        });
        url = url.replace(/(^[,\s]+)|([,\s]+$)/g, '')
        $http.get(url).success(function (data, status, headers, config) {
            var objects = data.Objects
            //            objects = modifyService.split(data.Objects);
            var postjsonArray = [];
            for (var i = 0; i < objects.length; i++) {
                var objectname = objects[i].ObjName;
                console.log(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, ''));
                if (editObject.indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')) > -1) {
                    var tempObject = {};
                    var number = objectname.match(/\d+/g);
                    if ((number != null) && (number.length > 0)) {
                        for (var k = 0; k < number.length; k++) {
                            value = '.' + number[k]
                            objectname = objectname.replace(value, '.*')
                        }
                    }
                    console.log(objectname);
                    // tempObject.Objname = objectname.replace(/[0-9]/g, "*")
                    //tempObject.Objname = objectname;

                    tempObject.Objname = objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '');
                    console.log(tempObject.Objname);
                    tempObjectParams = objects[i].Param;
                    for (var j = 0; j < tempObjectParams.length; j++) {
                        tempObject[tempObjectParams[j].ParamName] = tempObjectParams[j].ParamValue
                    }
                    postjsonArray.push(tempObject)
                }
            }
            angular.forEach(postjsonArray, function (objectArray) {
                angular.forEach(parameterlist, function (element) {
                    var formelement = element.split('?')
                    var formindividulaObject = formelement[0];
                    var number = formindividulaObject.match(/\d+/g);
                    if ((number != null) && (number.length > 0)) {
                        for (var k = 0; k < number.length; k++) {
                            value = '.' + number[k]
                            formindividulaObject = formindividulaObject.replace(value, '.*')
                        }
                    }
                    if (formindividulaObject == objectArray.Objname) {
                        $scope[formelement[0].replace(/\./g, "").replace(/\*/g, "")][formelement[1]] = objectArray[formelement[1]]
                    }
                });
            })
        }).error(function (data, status, headers, config) {
        });
    }
    $scope.Add = function (param1) {
        location.href = "#/tableform/" + param1
        localStorageService.remove('hybrideditObject');
    }

    $scope.ddChange = function (objectname, paramname) {
        changedFields.push(objectname + paramname)
    }
    $scope.toggleClick = function (param) {
        var toggleparam = param.split('.')
        changedFields.push(toggleparam[0] + toggleparam[1])
    }


    $scope.dropdownUrlReq = function (objectname, paramname, jsonname) {
        //        var url = URL + "cgi_get?Object=" + objecturl
        if (jsonname.indexOf('cgi_get') > -1) {
            //        if (jsonname.contains('cgi_get')) {
            $http.get(URL + jsonname).
                    success(function (data, status, headers, config) {
                        var dropdowndata = data.Objects;
                        var temparray = [];
                        temparray.push({"id": "Select", "name": "Select"})
                        angular.forEach(dropdowndata, function (dropObject) {
                            var tempObj = {};
                            var dropParam = dropObject.Param[0].ParamValue;
                            if (dropParam.indexOf(',') > -1) {
                                angular.forEach(dropParam.split(','), function (csv) {
                                    var tempObj = {};
                                    tempObj.objectname = dropObject.ObjName;
                                    tempObj.id = csv
                                    tempObj.name = csv;
                                    temparray.push(tempObj)
                                })
                            }
                            else {
                                tempObj.objectname = dropObject.ObjName;
                                tempObj.id = dropParam
                                tempObj.name = dropParam;
                                temparray.push(tempObj)
                            }
                        })

                        $scope[paramname] = temparray;
                        if ($scope[objectname] == undefined)
                            $scope[objectname] = {};
                        $scope[objectname][paramname] = temparray[0].id;
                        var multiSelectArray = $("#dataView").find("dropdown-multiselect").map(function (i)
                        {
                            var dropdownValues = $(this).attr('source')
                            var parametername = $(this).attr('parameter')
                            $scope.users = [];
                            $scope.ddvalues = temparray;
                            angular.forEach($scope.ddvalues, function (doc) {
                                $scope.users.push(doc);
                            });
                        })
                    })
                    .error(function (data, status, headers, config) {

                    });
        }
        else {
            $.getJSON(jsonname + ".json", function (data) {
                $scope[paramname] = data[paramname];
            });
        }
    }


    $scope.Apply = function (param1, param2) {
        var source = '';
        localStorageService.remove('hybrideditObject');
        var url = URL + "cgi_set";
        var objectdata = param1.currentTarget.attributes['source'].value.split('&')
        angular.forEach(objectdata, function (formObj) {
            source += formObj.split('?')[0] + ",";
        });
        var individualObject = '';
        var formObject = source.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
        angular.forEach(formObject, function (objstring) {
            individualObject += objstring.replace(/[^a-zA-Z0-9_-]/g, '') + ",";
        });
        value = localStorageService.get('hybrideditObject')
        if (value != null) {
            source = value;
        }
        var obj2 = individualObject.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
        var post = '';
        obj2.forEach(function (object, objindex) {
            var objectstring = formObject[objindex].split('.*')
            var combineobject = '';
            if (objectstring[objectstring.length - 1 ] == "")
                objectstring.splice(objectstring.length - 1);
            if (objectstring.length < 2)
                combineobject += objectstring[0];
            else {
                objectstring.forEach(function (doc2) {
                    combineobject += doc2;
                })
            }
            if (param1.currentTarget.id == "Add")
                post += "Object=" + combineobject + "&Operation=" + param1.currentTarget.id;
            else {
                post += "Object=" + editObject[objindex] + "&Operation=" + param1.currentTarget.id;
            }
            var arrobj1 = object
            if ($scope[arrobj1] != undefined) {

                $.each($scope[arrobj1], function (key, value) {
                    if (changedFields.indexOf(object + "" + key) > -1)
                        post += "&" + key + "=" + $scope[arrobj1][key] + ""
                });
            }
            post += ','
        })
        post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '')
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    localStorageService.remove('hybrideditObject');
                    //alert("success:::::" + post)
                    $scope.Add(param2)
                }).
                error(function (data, status, headers, config) {
                });
    }
})
