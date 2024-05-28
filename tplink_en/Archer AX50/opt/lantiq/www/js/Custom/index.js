//var IP = "192.168.1.1";
//var URL = 'http://' + IP + '/cgi/';
var URL = '/cgi/';
var IP = window.location.hostname;
var Port = window.location.port;
var finaldata, mainjsondata;
var init = [];
var passwordarray = [];
var passwordarraymapping = [];
var changedFields = [];
var pageloadiconstatus = true;
var theme = localStorage.getItem("theme") != undefined ? localStorage.getItem("theme") : '';
localStorage.clear();
if(theme != '' && theme != undefined)
    localStorage.setItem("theme", theme);
var errormessages = [];
localStorage.setItem('formModedeletestatus', 'false');
var websocket_log;
var ws_throughput;
var websocket_beerocks;
var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();


        console.log('hello Welcome ...');

        logger.disableLogger();
        
// uncomment the below line to enable console logs
        // logger.enableLogger();

var myapp = angular.module('routerapp', ["ui.sortable", "pascalprecht.translate", "checklist-model", "xeditable", 'ngRoute', 'LocalStorageModule', 'uiSwitch', 'app.directives', 'ui.bootstrap', 'ngDialog', 'angular-progress-arc', 'ngSanitize']);
var globaldata = '';
var operationstatus = false;
var breadcrumbsdata = {};
var jsonloadstatus=false;
var dependencydata = null;
var breadcrumbstatus=true;
var deviceReachability = true;
myapp.config(['$routeProvider', 'ngDialogProvider','$sceDelegateProvider',
    function ($routeProvider, ngDialogProvider,$sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self'  // trust all resources from the same origin
        ]);
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            showClose: false,
            closeByDocument: false,
            closeByEscape: false
        });
        $routeProvider.when('/', {
             
                    templateUrl: "adv_homepage.html",
                    controller: 'menuController'
                })
                .when('/custom/:param', {
                    templateUrl: function (params) {
                        return params.param + '.html';
                    },
                    controller: 'menuController'
                })
                .when('/tableform/:param2', {
                    template: function (params) {
                        return displayResult(params.param2, 'makehtml');
                    },
                    controller: 'hybridController'
                })
                .when('/tableform/:param2/:param3', {
                    template: function (params) {
                        return displayResult(params.param2 + '/' + params.param3, 'makehtml');
                    },
                    controller: 'hybridController'
                })
                .when('/tabHead/:param3', {
                    templateUrl: function (params) {
                        return params.param3 + ".html";
                    }
                })
                .when('/cgi-bin/luci', {
                    controller: function () {
                        window.location.replace('/cgi-bin/luci');
                    },
                    template: "<div></div>"
                })
                .when('/50000/shdap', {
                    controller: function () {
                        $http.get('https:' ? location.protocol : 'http:' +'//' + IP + ':50000').success(function(responseData){
                           window.location = location.protocol == 'https:' ? location.protocol : 'http:' +'//' + IP + ':50000';
                        }).error(function(error){

                        });
                        
                    },
                    template: "<div></div>"
                });
    }]);
//Configuration of httpProvider caching to no-cache if browser is IE
myapp.config(['$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    var ua = navigator.userAgent.toLowerCase();
    if ( ua.match(/msie/gi) || navigator.appName.match(/Internet/gi) || navigator.msMaxTouchPoints !== void 0 ){ 
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
	
	
}]);
myapp.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('languages/en/multicast');
    $translateProvider.useMissingTranslationHandler('customTranslationHandler');
    $translateProvider.useSanitizeValueStrategy('escape');
});



myapp.run(function($rootScope,$window,pageSpeed,$sanitize) {
	$rootScope.remove_duplicates = function(objectsArray) {
    var usedObjects = {};
    var objectsArrayCopy = angular.copy(objectsArray);
    objectsArrayCopy.forEach(function(v){ 
        if(v.hasOwnProperty('objectIndex')){ 
            delete v.objectIndex 
        }
    });
     for (var i = objectsArrayCopy.length - 1; i >= 0; i--) {
         var so = JSON.stringify(objectsArrayCopy[i]);
          if (usedObjects[so]) {
             objectsArray.splice(i, 1);
         } else {
             usedObjects[so] = true;
         }
    }
    return objectsArray;
}
$rootScope.poststringformat = function(object, data, changedFields, changedfieldscount, objectstatus) {
    var poststring = ''
    var changedfieldscount = changedfieldscount;
    var objectFieldStatus = false;
    if (objectstatus.indexOf(object) <= -1) {
        for (var key in data) {
            if (changedFields.indexOf(object + "" + key) > -1) {
                changedfieldscount += 1;
                objectFieldStatus = true;
                if (angular.isObject(data[key])) {
                    poststring += "&" + key + "=" +  $sanitize(encodeURIComponent($("#" + key).val()).replace(/<[^>]+>/gm, '')) + ""
                }
                else {
                    if (data[key + "hidden"] == undefined)
                        poststring += "&" + key + "=" + $sanitize(encodeURIComponent(data[key]).replace(/<[^>]+>/gm, '')) + ""
                    else
                        poststring += "&" + key + "=" + sanitize(encodeURIComponent(data[key + "hidden"]).replace(/<[^>]+>/gm, '')) + ""
                 }
            }
        }
    }
    return[objectFieldStatus, poststring, changedfieldscount];
}
	$rootScope.webcontrol={};
                    $rootScope.webcontrol.pagespeed = 1;
	
// pageSpeed.getValues().then(function(data) {
//	 
//	 $rootScope.webcontrol={};
//                    $rootScope.webcontrol.pagespeed = data;
//                    console.info('value returned pagespeed from directive.', $rootScope.pagespeed);
//		 })
	
$window.onload = function(){
  setTimeout(function(){
    var t = performance.timing;
	    $rootScope.fetchSpeed=""
    $rootScope.fetchSpeed=((t.loadEventEnd - t.fetchStart)/1000);
  }, 0);
}
	

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
		$rootScope.initialtime=Date.now();
		$rootScope.pollCounterReset=1;
        // handle route changes 
		if (localStorage.getItem("xml") !== null) {
			localStorage.setItem("xml","");
		}

		
		 $rootScope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
			   setTimeout(function(){
        // var t = performance.timing;
        // $rootScope.fetchSpeed=((t.loadEventEnd - t.fetchStart)/1000);

  }, 0);
			 
  });

    });
});
myapp.factory('pageSpeed', function($q,$http) {
var service ={
		getValues: getValues
	};
	function getValues() {
		            var def = $q.defer();

		var post =window.location.protocol+'//' +'localhost:8080' + '/pagespeedstatus.json';
		      $http.get(post).
		success(function (data, status) {
			console.info('speed service', data);
			
			//value = data.Objects[0].Param[0].ParamValue;
			 def.resolve(data.enable);

		})
			return def.promise;

	
  }
return service;
 });

myapp.factory('$exceptionHandler', ['$log', function($log) {
    return function myExceptionHandler(exception, cause) {
      $log.error(exception.message);
    };
  }])

myapp.factory('customTranslationHandler', function () {
    return function (translationID, uses) {
        var translationmessage = '';
//        console.log(translationID)
        if (translationID.split(/[.]+/).pop() == "headername") {
            $("#headernamedata").text($("#headername").text())

        }
        else if (translationID.split(/[.]+/).pop() == "headerdescription")
        {
            $("#headerdescriptiondata").text($("#headerdescription").text())

        }
        else {
            if (globaldata[translationID] == undefined) {
                if (translationID.indexOf('required') > 0)
                    translationmessage = globaldata["requiredmessage"]
                else if (translationID.indexOf('minlen') > 0)
                    translationmessage = globaldata["minlengthmessage"]
                else if (translationID.indexOf('maxlen') > 0)
                    translationmessage = globaldata["maxlengthmessage"]
                else if (translationID.indexOf('minval') > 0)
                    translationmessage = globaldata["minnumbervalmessage"]
                else if (translationID.indexOf('maxval') > 0)
                    translationmessage = globaldata["maxnumbervalmessage"]
                else if (errormessages.indexOf(translationID) > -1)
                    translationmessage = translationID;
                else
                    translationmessage = translationID.split(/[.]+/).pop();
            }
            else {
                translationmessage = globaldata[translationID];
            }
        }
        return translationmessage;
    };
});
myapp.service('mySharedService', function ($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    this.setObject = function (msg) {
        this.message = msg;

    };
    this.getObject = function () {
        return this.message;
    };
});

myapp.service('clientModeService', function ($rootScope) {
    var clientModeService = {};

    clientModeService.message = '';

    this.setObject = function (msg) {
        this.message = msg;

    };
    this.getObject = function () {
        return this.message;
    };
});

myapp.service('languageService', function ($rootScope) {
    var languageService = {};

    languageService.language = 'en';

    this.setObject = function (msg) {
        this.language = msg;

    };
    this.getObject = function () {
        return this.language;
    };
});

myapp.factory('firewallService', function ($http,$q,$timeout) {
	var service ={
		getValues: getValues
	};
	function getValues() {
		            var def = $q.defer();

		var post = URL + 'cgi_get_nosubobj?Object=Device.Firewall';
		      $http.get(post).
		success(function (data, status) {
			console.info('firewall service', data);
			
			//value = data.Objects[0].Param[0].ParamValue;
			 def.resolve(data.Objects[0].Param[0].ParamValue);

		})
			return def.promise;

	
  }
return service;
});
myapp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

myapp.filter('keys', function () {
    return function (input, param1) {
        var params;
        if (!input) {
            return [];
        }
        var index = Object.keys(input).indexOf("$$hashKey");
        if (index > -1) {
            Object.keys(input).splice(index, 1);
        }
        delete input.$$hashKey
        if (localStorage.getItem(param1 + 'tparams') != undefined) {
            var params = localStorage.getItem(param1 + 'tparams').split(',');
            params.push('z')
        }
        else
            params = Object.keys(input);
        return params;
    }
})
myapp.filter('keys1', function () {
    return function (input, param1) {
        params = Object.keys(input);
        return params;
    }
})
myapp.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});
myapp.service('modifyService', function ($http, $route) {

    this.toArrayOfObjects = function (array) {
        var finalarray = [];
        finalarray.push({"id":"","name":"Select"})
        for (i = 0; i < array.length; i++) {
            var temp = {};

            if (array[i].indexOf(';') > 0) {
                temp["id"] = array[i].replace(/\;/g, ",");
                temp["name"] = array[i].split(';').join("");
            }
            else {
                temp["id"] = array[i];
                temp["name"] = array[i];
            }
            finalarray.push(temp);

        }
        return finalarray;
    }
	
    this.filterdata = function (url, originalobject, tabobjparams, id, doneCallback) {
        var tabdata = [];
        $http.get(url).
                then(function (resp) {
                    var objects = resp.data.Objects;
                    angular.forEach(objects, function (object) {
                        var temp = {};
                        var objectname = object.ObjName;
                        if (this.dotstarremove(objectname, '.*').replace(/(^[.\s]+)|([.\s]+$)/g, '') == this.dotstarremove(originalobject, '.*')) {
                            angular.forEach(object.Param, function (objparams) {
                                if (tabobjparams.indexOf(objparams.ParamName) > -1) {
                                    temp[id + "__" + objparams.ParamName] = objparams.ParamValue;
                                }
                            })
                            temp["z"] = objectname;
                            tabdata.push(temp);
                        }
                    })
                    doneCallback(tabdata);
                });

        // when the async http call is done, execute the callback
    }
	this.formdataRequest = function (url, post, formcallback) {
        $http.post(url, post).
                then(function (resp) {
                    formcallback(resp); // when the async http call is done, execute the callback
                });
    }
    this.setRequest = function (url, post, componenttype) {
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    $('#ajaxLoaderSection').hide();
                    if (componenttype == "form")
                        ;
                    else
                        $route.reload();
                }).
                error(function (data, status, headers, config) {
                    $('#ajaxLoaderSection').hide();
                });
    }
    this.genericRequest = function (url, post, doneCallback) {
        $http.post(url, post).
                then(function (resp) {
                    doneCallback(resp); // when the async http call is done, execute the callback
                });
    }
    this.dotstarremove = function (objectname, replacecharacter) {
        var objectname = objectname;
        var number = objectname.match(/\d+/g);
        if (number != null) {
            for (var k = 0; k < number.length; k++) {
                value = '.' + number[k]
                objectname = objectname.replace(value, replacecharacter);
            }
        }

        return objectname;
    }
// 	 this.getObjectIndex = function (objectname, replacecharacter) {
//        var objectname = objectname;
//		var objectIndex = 0;
//        var matches = objectname.match(/\d+/g);
//		var matchLength = matches.length;
//        var number = matches[0];
//        if (number != null) {
//            objectIndex = number;
//        }
//
//        return objectIndex;
//    }
	this.getObjectIndex = function (objectname, replacecharacter) {
        var objectname = objectname;
		var objectIndex = 0;
        var matches = objectname.match(/\d+/g);
         if(matches !== null){
            var matchLength = matches.length;
            var number = matches[0];
            if (number != null) {
                objectIndex = number;
            }
         }
        return objectIndex;
    }  
    this.unique = function (origArr) {
        var newArr = [],
                origLen = origArr.length, found, x, y;
        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x] === newArr[y]) {
                    found = true;
                    break;
                }
            }
            if (!found)
                newArr.push(origArr[x]);
        }
        return newArr.sort(function (a, b) {
            return a.length - b.length; // ASC -> a - b; DESC -> b - a
        });
    };
    this.split = function (origArr) {
        function sortArrayBasedOnStringLength() {
            testArray.sort(function (a, b) {
                return a.length - b.length; // ASC -> a - b; DESC -> b - a
            });
        }
        function isSubset(minimalString, currentMinimalString) {
            var bool = true;
            var minimalStringArray = minimalString.split(".");
            var currentMinimalStringArray = currentMinimalString.split(".");
            for (var i = 0; i < minimalStringArray.length; i++) {
                if (minimalStringArray[i] !== currentMinimalStringArray[i]) {
                    bool = false;
                }
            }
            return bool;
        }
        var testArray = origArr;
        var minimalArray = [];
        var arrayLength = testArray.length;
        sortArrayBasedOnStringLength();
        for (var i = 0; arrayLength > 0; ) {
            var currentMinimalString = testArray[i];
            var bool = true;
            for (var j = 0; j < arrayLength; ) {
                if (isSubset(currentMinimalString, testArray[j])) {
                    if (bool) {
                        bool = false;
                        minimalArray.push(currentMinimalString);
                    }
                    testArray.splice(j, 1);
                    arrayLength = testArray.length;
                } else {
                    j++;
                }
            }
        }
        return minimalArray;
    };
    this.aliasDependency = function (origArr) {
        function sortArrayBasedOnStringLength() {
            testArray.sort(function (a, b) {
                return a.length - b.length; // ASC -> a - b; DESC -> b - a
            });
        }
        function isSubset(minimalString, currentMinimalString) {
            var bool = true;
            var minimalStringArray = minimalString.split(".");
            var currentMinimalStringArray = currentMinimalString.split(".");
            for (var i = 0; i < minimalStringArray.length; i++) {
                if (minimalStringArray[i] !== currentMinimalStringArray[i]) {
                    bool = false;
                }
            }
            return bool;
        }
        var testArray = origArr;
        var aliasArray = {};
        var minimalArray = [];
        var parentArray = [];
        var arrayLength = testArray.length;
        sortArrayBasedOnStringLength();
        for (var i = 0; arrayLength > 0; ) {
            var currentMinimalString = testArray[i];
            var minimalObj = {}
            minimalObj.childrens = []
            var bool = true;
            for (var j = 0; j < arrayLength; ) {
                if (isSubset(currentMinimalString, testArray[j])) {
                    if (bool) {
                        bool = false;
                        minimalObj.parent = currentMinimalString;
                        parentArray.push(currentMinimalString);
                    } else {
                        minimalObj.childrens.push(testArray[j])
                    }
                    testArray.splice(j, 1);
                    arrayLength = testArray.length;
                } else {
                    j++;
                }
            }
            minimalArray.push(minimalObj);
        }
        aliasArray.parents = parentArray;
        aliasArray.childrelation = minimalArray;
        return aliasArray;
    };
    this.objectData = function (objData) {
        var len = objData.length;
        if (objData[len - 1] == '&') {
            objData = objData.substring(0, len - 1);
        }
        console.log(objData);
        var tabData = {};
        var PostObjectjsonName = '';
        var parameterlist = '';
        var tableObjects = objData.split('&')
        angular.forEach(tableObjects, function (doc) {
            var doc2 = doc.split('?')[1].replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
            angular.forEach(doc2, function (doc1) {
                parameterlist += doc.split('?')[0] + "?" + doc1 + ",";
            })
            PostObjectjsonName += doc.split('?')[0] + ",";
        });
        tabData.parameterlist = parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        tabData.postObjectjsonName = PostObjectjsonName;
        return tabData;
    }
});

//Advanced Widget implemenation
myapp.directive('advWidget', function () {
    return {
        restrict: "E",
        templateUrl: "./advwidget.html",
        scope: {},
        controller: function ($scope, $http, $attrs, $interval) {
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.time = $attrs.time;
            /* var myArray = ['#ff0000', '#9a00c3', '#173945', '#cc5200', '#61a598', '#6a78ab', '#36465d', '#00b8ff', '#912d3f', '#ada3e0', '#281090', '#5a8487', '#f4760d', '#504d76', '#8b7d7b'];*/
            var myArray = ['#7e57c2', '#3f51b5', '#00acc1', '#7CBD65', '#646768', '#fc5757', '#ff9300', '#ab7942'];
            $scope.colors6 = myArray[Math.floor(Math.random() * myArray.length)];
            var webname = JSON.parse($attrs.webname);

            var refreshData = function () {
                var temp = {};
                var index = 0;
                $scope.objects = [];
                $http.get(URL + $attrs.url).
                        success(function (data, status, headers, config) {
                            angular.forEach(data.Objects, function (object) {
                                angular.forEach(object.Param, function (param) {
                                    temp[webname[index]] = param.ParamValue;
//                                    console.log(webname[index] + "," + param.ParamValue);
                                    index = index + 1;
                                });
                            });
                            $scope.objects.push(temp);
                        }).
                        error(function (data, status, headers, config) {
                        });
            };
            if ($attrs.polling == "true" && $scope.time != ""){
            var promise = {};
                if($attrs.checker=="true"){
                    var checkvalue = "true";
                    if($attrs.checkervalue != "" && $attrs.checkervalue != undefined){
                        checkvalue = $attrs.checkervalue;
                    }
                    $http.get(URL + $attrs.checkerurl).
               		    success(function (data, status, headers, config){
               		    console.log(data.Objects[0].Param[0].ParamValue === checkvalue); 
               			if(data.Objects[0].Param[0].ParamValue === checkvalue){
              			      promise = $interval(refreshData, $scope.time);
               			}
                   });
              }else{
                  promise = $interval(refreshData, $scope.time);
              }
            }
//            else
//                refreshData();
// Cancel interval on page changes
            $scope.$on('$destroy', function () {
                if (angular.isDefined(promise)) {
                    $interval.cancel(promise);
                    promise = undefined;
                }
            });
            refreshData();
        }
    };
});

//Basic WiFi widget implementation
//myapp.directive('basicWifiWidget', function () {
//    return {
//        restrict: "E",
//        templateUrl: "./basicwifiwidget.html",
//        scope: {},
//        controller: function ($scope, $http, $attrs) {
//            $scope.title = $attrs.title;
//            $scope.image = $attrs.image;
//            $scope.color = $attrs.color;
//            $scope.icon = $attrs.icon;
//            $scope.label = $attrs.label;
//            $scope.onimage = $attrs.onimage;
//            $scope.offimage = $attrs.offimage;
//            $scope.objects = [];
//            var temp = {};
//            $http.get($attrs.url).
//                    success(function (data, status, headers, config) {
//                        angular.forEach(data.Objects, function (object) {
//                            angular.forEach(object.Param, function (param) {
//                                temp[param.ParamName] = param.ParamValue;
////                                console.log(param.ParamName + "," + param.ParamValue);
//                            });
//                        });
//                        $scope.objects.push(temp);
//                        objects = data.Objects;
//                        for (var i = 0; i < objects.length; i++)
//                            if ($scope.objects[i].Status === "Up") {
//                                $scope.icon = $attrs.onimage;
//                            }
//                            else {
//                                $scope.icon = $attrs.offimage;
//                            }
//
//                    }).
//                    error(function (data, status, headers, config) {
//                    });
//        }
//    };
//});
//Basic WiFi widget implementation
myapp.directive('basicWifiWidget', function () {
    return {
        restrict: "E",
        templateUrl: "./basicwifiwidget.html",
        scope: {},
        controller: function ($scope, $http, $attrs, $route) {
            $scope.image = $attrs.image;
            $scope.color = $attrs.color;
            $scope.urls = $attrs.urls;
            $scope.label = $attrs.label;
            $scope.truevalue = $attrs.truevalue;
            $scope.falsevalue = $attrs.falsevalue;
            var urlsInfo = $scope.urls;
            var spliturlsInfo = urlsInfo.split("=")[1];
            var objectInfo = spliturlsInfo.split("&")[0];
            var paramInfo = spliturlsInfo.split("&")[1];
            $scope.paramname = paramInfo;
            getWiFiData = function () {
                $http.get(URL + $scope.urls).
                        success(function (data, status, headers, config) {
                            $scope["modelname"] = [];
                            $scope["modelstatus"] = [];
                            $scope["modelobjects"] = [];
                            objects = data.Objects;
                            for (var obj = 0; obj < objects.length; obj++) {
                                var modeltempobject = {};
                                var name = '';
                                var status = '';
                                modeltempobject["objectname"] = objects[obj].ObjName;
                                var objectParamValues = objects[obj].Param;
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;

                                    if (param_name === "SupportedFrequencyBands") {
                                        modeltempobject["SupportedFrequencyBands"] = param_value;
                                    }
                                    if (param_name === paramInfo) {
                                        if (param_value === $attrs.truevalue)
                                            modeltempobject[paramInfo] = true;
                                        else
                                            modeltempobject[paramInfo] = false;
                                    }

                                }
                                $scope["modelobjects"].push(modeltempobject);
                                $scope["modelname"].push(name);
                                $scope["modelstatus"].push(status);
                            }
                        }).
                        error(function (data, status, headers, config) {
                        });
            };
            getWiFiData();

            $scope.basictoggleclick = function (value) {
                if (value === true) {
                    value = $scope.truevalue;
                }
                else {
                    value = $scope.falsevalue;
                }
                var post = '';
                var url = URL + "cgi_set";
                post += "Object=" + objectInfo + "&Operation=Modify";
                post += '&' + paramInfo + "=" + value;
                //alert(post);
                $http.post(url, post).
                        success(function (data, status, headers, config) {
                            $route.reload();
                        }).
                        error(function (data, status, headers, config) {
                        });

            };
        }
    };
});

//Basic Port Status widget implementation
myapp.directive('basicPortStatusWidget', function () {
    return {
        restrict: "E",
        templateUrl: "./basicportstatuswidget.html",
        scope: {},
        controller: function ($scope, $http, $attrs) {
            $scope.title = $attrs.title;
            $scope.color = $attrs.color;
            $scope.onimage = $attrs.onimage;
            $scope.offimage = $attrs.offimage;
            $scope.icon = $attrs.icon;
            $scope.statusImages = [];
            $scope.text = [];
            var count = 0, urls = [];
            var getData = function (url) {
                count++;
                if (count > urls.length) {
                    return;
                } else {
                    $http.get(URL + url).
                            success(function (data, status, headers, config) {
                                objects = data.Objects;
                                if (objects) {
                                    angular.forEach(objects[0].Param, function (obj) {
                                        if (count % 2 != 0) {
                                            if (obj.ParamName == "Status") {
                                                var image = getStatusImage(obj.ParamValue);
                                                $scope.statusImages.push(image);
                                            }
                                        } else {
                                            if (obj.ParamName == "Name") {
                                                $scope.text.push(obj.ParamValue)
                                            }
                                        }
                                    });

                                }
                                getData(urls[count]);
                            }).
                            error(function (data, status, headers, config) {
                            });
                }
            }
            var getStatusImage = function (status) {
                console.log("Status", status);
                if (status === "Up") {
                    return $attrs.onimage;
                } else {
                    return $attrs.offimage;
                }
            };
            if ($attrs.urls) {
                urls = JSON.parse($attrs.urls);
                getData(urls[0]);
            }

        }
    };
});

/* 
 * 
 * Dynamic Port Status widget implementation
 * Supports websockets and polling
 * Dynamic data updation in UI
 * 
 */
myapp.directive('dynamicPortStatusWidget', function () {
    return {
        restrict: "E",
        templateUrl: "./dynamicportstatuswidget.html",
        scope: {},
        controller: function ($scope, $http, $attrs, $interval, $rootScope) {
            $scope.title = $attrs.title;
            $scope.color = $attrs.color;
            $scope.onimage = $attrs.onimage;
            $scope.offimage = $attrs.offimage;
            $scope.icon = $attrs.icon;
            $scope.statusImages = [];
            $scope.text = [];
            $scope.wsprotocol = ($attrs.wsprotocol!='' && $attrs.wsprotocol!=undefined) ? $attrs.wsprotocol : 'protocol_device_update';
            $scope.dynamicPortData = {};
            var count = 0, urls = [];
            var params = {};
            var fallbackpromise;
            var dynamicPortStatusSocket;
            var dynamicPortStatus;
            var scopeDestroy = false;
            
            if($attrs.params != undefined && $attrs.params != '')
                params = JSON.parse($attrs.params);
            
            $scope.params = params;
            var urlParamString = '';
            if( params != undefined && params != '' ){
                angular.forEach(params, function (param) {
                    urlParamString = urlParamString + '&' + param + '=';
                });
            }
            var dynamicSocketStarter = function(){
                var dynamicPortSocketEnable = false;
                //Websocket interval start
                dynamicPortStatus = $interval(function () {
                    //Web socket creation
                    dynamicPortStatusSocket = new WebSocket('ws://' + IP + ':5001', $scope.wsprotocol);
                    //Websocket onopen event
                    dynamicPortStatusSocket.onopen = function () {
                        dynamicPortSocketEnable = true;
                        console.log("in  Open")
                        if($attrs.socket == "false"){
                            dynamicPortStatusSocket.close();
                            dynamicPortSocketEnable = false;
                        }
                       // dynamicPortStatusSocket.send("");
                    };
                    //Websocket onmessage event
                    dynamicPortStatusSocket.onmessage = function (message) {
                        data = JSON.parse(message.data);
                        objects = data.Objects;
                        if (objects) {
                            var temp = [];
                            var Objindex = objects[0].ObjName.match(/\d+/g)[0];
                            var refObjectName = objects[0].ObjName.replace(/\./g,"");
                            angular.forEach(objects[0].Param, function (obj) {
                                if (obj.ParamName == "Status") {
                                    var image = getStatusImage(obj.ParamValue);
                                    temp.push(image);
                                }else if(params.indexOf(obj.ParamName) > -1)
                                    temp[params.indexOf(obj.ParamName)] = obj.ParamValue;
                                if($scope.dynamicPortData.hasOwnProperty(refObjectName))
                                    $scope.dynamicPortData[refObjectName] =  temp;
                            });
                            console.log("dynamicPortStatusSocket --> $scope.dynamicPortData",$scope.dynamicPortData)
                        }
                    };
                    //Websocket onclose event
                    //Invoked on close of websocket
                    //And also invoked on failure of socket sonnection
                    dynamicPortStatusSocket.onclose = function (evt) {
                        console.log("in close", dynamicPortSocketEnable)
                        if (dynamicPortSocketEnable == false && !scopeDestroy) {
                            if ($attrs.urls) {
                                urls = JSON.parse($attrs.urls);
                                console.log("in close 1",$attrs.polling)
                                if ($attrs.urls && $attrs.polling == "true"){
                                    console.log("in close 2",urls[0])
                                    $scope.time = $attrs.time != '' && $attrs.time != undefined ? $attrs.time : 10000;
                                    
                                    fallbackpromise = $interval(function () {
                                        count = 0;
                                        getData(urls[0]);
                                    },$scope.time);
                                }
                            }
                        }else{
                            if(deviceReachability && !scopeDestroy)
                                dynamicSocketStarter();
                        }
                    };
                    $interval.cancel(dynamicPortStatus);
                }, 10000);
            }
            dynamicSocketStarter();
            // Cancel interval on page changes
            $scope.$on('$destroy', function () {
                if (angular.isDefined(fallbackpromise)) {
                    //closing the polling on $scope destroy
                    $interval.cancel(fallbackpromise);
                    fallbackpromise = undefined;
                }
                if (angular.isDefined(dynamicPortStatus)) {
                    //closing the polling on $scope destroy
                    $interval.cancel(dynamicPortStatus);
                    dynamicPortStatus = undefined;
                }
                if (angular.isDefined(dynamicPortStatusSocket) && dynamicPortStatusSocket != '') {
                    scopeDestroy = true;
                    dynamicPortStatusSocket.close();
                }
            });     
            /*
             * getData function
             * param current running URL
             * Query string formed using urlParamString
             */ 
            var getData = function (url) {                
                count++;
                if (count > urls.length) {
                    return;
                } else {
                    if(urlParamString != undefined && urlParamString != '')
                        url = url + urlParamString;
                    $http.get(URL + url).
                            success(function (data, status, headers, config) {
                                objects = data.Objects;
                                if (objects) {
                                    var temp = [];
                                    var Objindex = objects[0].ObjName.match(/\d+/g)[0];
                                    var refObjectName = objects[0].ObjName.replace(/\./g,"");
                                    angular.forEach(objects[0].Param, function (obj) {
                                        if (obj.ParamName == "Status") {
                                            var image = getStatusImage(obj.ParamValue);
                                            temp.push(image);
                                        }else
                                            temp.push(obj.ParamValue);
                                        $scope.dynamicPortData[refObjectName] =  temp;
                                    });

                                }
                                getData(urls[count]);
                                console.log("$scope.dynamicPortData",$scope.dynamicPortData);
                            }).
                            error(function (data, status, headers, config) {
                            });
                }
            }
            //To get images based on status
            var getStatusImage = function (status) {
                if (status === "Up") {
                    return $attrs.onimage;
                } else {
                    return $attrs.offimage;
                }
            };
            //Onload data UI data creation
            if ($attrs.urls) {
                urls = JSON.parse($attrs.urls);
                getData(urls[0]);
            }
        }
    };
});

myapp.directive('throughputChart', function (mySharedService) {
    return {
        restrict: "E",
        templateUrl: 'linechart.html',
        scope: {},
        controller: function ($scope, $element, $http, $attrs, $interval, $location, $compile, mySharedService) {

            $scope.timeaxis = 0;
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.wsprotocol = $attrs.wsprotocol;
            $scope.wsparams = $attrs.wsparams;
            $scope.url = $attrs.url;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.labels = $attrs.labels;
            $scope.fillcolors = $attrs.fillcolors;
            $scope.strokecolors = $attrs.strokecolors;
            $scope.pointcolors = $attrs.pointcolors;
            $scope.units = $attrs.units;
            $scope.color = $attrs.color;
            $scope.path = $location.url();
            $scope.idvalue = $attrs.idvalue;
            if ($scope.url) {
                // url was given a params so continue using it
            } else {
                // Create URL from wsparams
                var wsparamssplit = $attrs.wsparams.split(" ");
                // ignore the first one
                $scope.pollinterval = parseInt(wsparamssplit[1].trim());
                if ($scope.wsparams.indexOf("*") > -1) {
                    $scope.url = "cgi/cgi_get_fillparams?Object=" + mySharedService.getObject();
                    console.log($scope.url);
                }
                else {
                    $scope.url = "cgi/cgi_get_fillparams?Object=" + wsparamssplit[2].trim();
                    console.log($scope.url);
                }
                // Multi Object support-start
                var wsobjectsplit = $attrs.wsparams.split("Object=");
                $scope.pollinterval = parseInt(wsobjectsplit[0].match(/\d+/g));
                $scope.url = "cgi/cgi_get_fillparams?";
                // remove the first one
                wsobjectsplit.splice(0, 1);
                angular.forEach(wsobjectsplit, function (wsobject, index) {
                var wsobjectdata = wsobject.split(' ')
                $scope.url += "Object=" + wsobjectdata[0];
                for (var i = 1; i < wsobjectdata.length; i++) {
                   if (wsobjectdata[i] != "")
                      $scope.url += "&" + wsobjectdata[i] + "=";
                    }
				   $scope.url += "&";
				})
 	            $scope.url.replace(/\&$/, '');
 	            console.log($scope.url);
	        }
            var options = {
                tooltips: {
                        titleFontSize: 14,
                        bodyFontSize: 14,
                        mode: 'label'
                    },
                    animation: {
                        numsteps: 15
                    },
                    legend: {
                        display: false
                    },
                    legendCallback: function(chart) {
                        var text = [];
                        text.push('<ul class="' + chart.id + '-legend">');
                        for (var i = 0; i < chart.data.datasets.length; i++) {
                            text.push('<li class="' + chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled" ng-click="toggleLine(this,$event);updateDataset(event, ' + '\'' + chart.legend.legendItems[i].datasetIndex + '\'' + ')"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
                            if (chart.data.datasets[i].label) {
                                text.push(chart.data.datasets[i].label);
                            }
                            text.push('</li>');
                        }
                        text.push('</ul>');
                        return text.join('');
                    },
                    scales: { 
                        yAxes: [{
                            ticks: {
                               beginAtZero: true
                            }
                        }]
                    }
            };
            if ($attrs.units) {
                options = {
                    // String - Template string for single tooltips
                    tooltips: {
                        titleFontSize: 14,
                        bodyFontSize: 14,
                        mode: 'label',
					},
                    animation: {
                        numsteps: 15
                    },
                    legend: {
                        display: false
                    },
                    legendCallback: function(chart) {
                        var text = [];
                        text.push('<ul class="' + chart.id + '-legend">');
                        for (var i = 0; i < chart.data.datasets.length; i++) {
                            text.push('<li class="' + chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled" ng-click="toggleLine(this,$event);updateDataset(event, ' + '\'' + chart.legend.legendItems[i].datasetIndex + '\'' + ')"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
                            if (chart.data.datasets[i].label) {
                                text.push(chart.data.datasets[i].label);
                            }
                            text.push('</li>');
                        }
                        text.push('</ul>');
                        return text.join('');
                    },
                    scales: { 
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                
                };

            }
            var latestLabel = [];
            var promise;
            var el = $element.find(".line")[0];
            var ctx = el.getContext('2d');
            var setCount = 1;
            startingData = {
                labels: [1],
                datasets: [],
                idvalue : $attrs.idvalue
            },
            latestLabel = startingData.labels[0];
            var labelsData = JSON.parse($attrs.labels);
            var fillcolorsData = JSON.parse($attrs.fillcolors);
            var strokecolorsData = JSON.parse($attrs.strokecolors);
			var backgroundcolorsData = JSON.parse($attrs.strokecolors);
            var pointcolorsData = JSON.parse($attrs.pointcolors);
            console.log("labelsData",labelsData);
            for (var i = 0; i < labelsData.length; ++i) {
                var tmp = {};
                tmp['label'] = labelsData[i];
                tmp['strokeColor'] = strokecolorsData[i];
                tmp['borderColor'] = strokecolorsData[i];
                tmp['pointColor'] = pointcolorsData[i];
                tmp['data'] = [0];
				var backgroundColorOpaqueIndex = backgroundcolorsData[i].lastIndexOf(',');
                var backgroundColor =  backgroundcolorsData[i].substr(0, backgroundColorOpaqueIndex + 1) + "0.5"  + backgroundcolorsData[i].substr(backgroundColorOpaqueIndex + 2);
   				tmp['backgroundColor'] = backgroundColor;
                startingData.datasets.push(tmp);
            }
            
            var prevData = []; // to get the delta
            var wsEnable = false; // webscoket success checking
            // Reduce the animation steps for demo clarity.
            var throughputChart = new Chart(ctx,
                                            { type: 'line',
                                              data: startingData,
                                              options: options
                                            });
            setTimeout(function(){                                                             var legend = throughputChart.generateLegend();                               $('#'+$attrs.idvalue).html(legend);                                           $compile($('#'+$attrs.idvalue.replace(/ /g,"")).html(legend))($scope);  },100); 

            
            updateData = function () {
                $http.get($scope.url).
                        success(function (data, status, headers, config) {
                            var tmpData = []

                            var chartIndex = 0;
                            angular.forEach(data.Objects, function (object, objIndex) {
                                angular.forEach(object.Param, function (param, index) {
                                    var label_class = labelsData[chartIndex].replace(/[^a-zA-Z0-9]/g, "");
                                    var isEnabled = $('#'+$attrs.idvalue).find('li.'+label_class)[0].className.indexOf('enabled')

                                    var val = param.ParamValue;
                                    console.log("Prev Val: " + prevData[index]);
                                    console.log("Val : " + val);
                                    if (setCount > 1) {
                                        valc = ((val - prevData[chartIndex]) * 8) / (Math.pow(10, 6) * $scope.pollinterval);

                                        if (valc < 0) {
                                            valc = 0;
                                        }
                                        tmpData.push(valc);
                                        prevData[chartIndex] = val;
                                    } else {
                                        prevData.push(val);
                                        val = (val * 8) / (Math.pow(10, 6) * $scope.pollinterval);
                                        if (val < 0) {
                                            val = 0;
                                        }
                                        tmpData.push(val);
                                    }
                                    if (isEnabled === -1)
                                        tmpData[chartIndex] = '';
                                    chartIndex++;
                                });
                            });
                            throughputChart.data.labels.push(++latestLabel);
                            for(var i=0;i<throughputChart.data.datasets.length;i++){
                                throughputChart.data.datasets[i].data.push(tmpData[i]);
                            }

                            throughputChart.update();
                            setCount++;
                            // Remove the first point so we dont just add values forever
                            if (latestLabel > 7){
                                for(var i=0;i<throughputChart.data.datasets.length;i++){
                                    throughputChart.data.datasets[i].data.splice(0, 1);
								}
								throughputChart.data.labels.splice(0, 1);
								
                            }
							throughputChart.update();
                        })
                        .error(function (data, status, headers, config) {
                        });
            };

            if ($scope.wsprotocol.length > 0) {
                ws_throughput = new WebSocket('ws://' + IP + ':5001', $scope.wsprotocol);
                ws_throughput.onopen = function () {
                    wsEnable = true;
                    if ($scope.wsparams.indexOf("*") > -1) {
                        ws_throughput.send($scope.wsparams.replace(/\*/g, mySharedService.getObject()));
                        console.log($scope.wsparams.replace(/\*/g, mySharedService.getObject()));
                    }
                    else {
                        ws_throughput.send($scope.wsparams);
                    }
                };

                ws_throughput.onmessage = function (message) {
                    console.log("through pu message emited");
                    var data = JSON.parse(message.data);
                    console.log(JSON.stringify(message.data));
                    var tmpData = [];
                    angular.forEach(data.Objects, function (object, index) {
                        angular.forEach(object.Param, function (param, index) {
                            var label_class = labelsData[index].replace(" ", "_");
                            var isEnabled = document.getElementsByClassName(label_class)[0].className.indexOf('enabled')
                            console.log("Enabled: " + isEnabled);

                            var val = param.ParamValue;

                            if (setCount > 1) {
                                console.log("Val: " + val);
                                console.log("Prev Val: " + prevData[index]);
                                valc = ((val - prevData[index]) * 8) / (Math.pow(10, 6) * $scope.pollinterval);
                                if (valc < 0) {
                                    valc = 0;
                                }
                                tmpData.push(valc);
                                console.log("Valc: " + valc);
                                prevData[index] = val;
                            } else {
                                prevData.push(val);
                                if (val < 0) {
                                    val = 0;
                                }
                                tmpData.push(val);
                            }
                            if (isEnabled === -1)
                                tmpData[index] = '';
                            console.log(tmpData);

                        });
                    });
                    //throughputChart.addData([fval, sval], ++latestLabel);
                    throughputChart.addData(tmpData, ++latestLabel);
                    setCount++;
                    // Remove the first point so we dont just add values forever
                    if (latestLabel > 7)
                        throughputChart.removeData();
                   
                    if ($scope.path != $location.url()) {
                        console.log("Called")
                        ws_throughput.close();
                    }
                };
                ws_throughput.onclose = function (evt) {
                    if (wsEnable == false) {
                        //fallback to polling
                        // fallback to polling
                        console.log("fallback");
                        promise = $interval(updateData, $scope.pollinterval * 1000);
                        updateData();
                    }
                    console.log("Connection is closed... Bye !");
                };
            } else { //  we need only polling
                var promise = $interval(updateData, $scope.pollinterval * 1000);
                updateData();
            }
            $scope.$on('$destroy', function () {
                console.log(angular.isDefined(promise));
                if (angular.isDefined(promise)) {
                    $interval.cancel(promise);
                    promise = undefined;
                }
            });

            
            $scope.updateDataset = function(e, datasetIndex) {
                var index = datasetIndex;
                var meta = throughputChart.getDatasetMeta(index);

                // See controller.isDatasetVisible comment
                meta.hidden = meta.hidden === null? !throughputChart.data.datasets[index].hidden : null;

                // We hid a dataset ... rerender the chart
                throughputChart.update();
            };
            $scope.toggleLine = function (t, event) {
                console.log("target: " + event.currentTarget);
                console.log("Object:" + t);
                console.log("class:" + event.currentTarget.className);

                if ((event.currentTarget.className).indexOf('enabled') === -1)
                    event.currentTarget.className += ' enabled';
                else {
                    event.currentTarget.className = (event.currentTarget.className).replace('enabled', '');
                }
            };
        }
    };
});

myapp.directive('doughnutChart', function () {
    return {
        restrict: "E",
        templateUrl: 'doughnutchart.html',
        scope: {},
        controller: function ($scope, $http, $attrs, $interval, $location) {
           
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.label = $attrs.label;
            $scope.url = $attrs.url;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.color = $attrs.color;
            $scope.wsprotocol = $attrs.wsprotocol;
            $scope.wsparams = $attrs.wsparams;
            $scope.path = $location.url();
            if ($scope.url) {
                // url was given a params so continue using it
            } else {
                // Create URL from wsparams
                var wsparamssplit = $attrs.wsparams.split(" ");
                // ignore the first one
                $scope.pollinterval = parseInt(wsparamssplit[1].trim());
                $scope.url = "cgi/cgi_get_fillparams?" + wsparamssplit[2].trim();
                for (var i = 3; i < wsparamssplit.length; ++i) {
                    $scope.url = $scope.url + "&" + wsparamssplit[i] + "="
                }
            }
            var options = {
                elements: {
                    arc: {
                      borderWidth: 0
                    }
                  },
                animation: {
                    animateRotate: false,
                    animateScale: true
                },
                cutoutPercentage: 50,
                tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                return value;
                            }
                        }
                }
            };
            if ($scope.units) {
                options = {
                   elements: {
                    arc: {
                      borderWidth: 0
                    }
                  },
                animation: {
                    animateRotate: false,
                    animateScale: true
                },
                cutoutPercentage: 50,
                tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                return value + " " + $scope.units;
                            }
                        }
                }
                };

            }
            var color = JSON.parse($scope.color);
            var label = JSON.parse($scope.label);
            var el = document.getElementById('doughnut');
            var ctx = el.getContext('2d');
            var tmpvalues = [];
            datavalue = [];
            var total = 0;
            var free = 0;
            var buffer = 0;
            var cache = 0;
            var usedMemory = 0;
            var freeMemory = 0;
            /* var options = {
             segmentShowStroke: false,
             animateRotate: true,
             animateScale: false,
             percentageInnerCutout: 50,
             tooltipTemplate: "<%= value %>"
             };
             */
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: tmpvalues,
                options: options
            });
            var wsEnable = false; // webscoket success checking
            var promise;
            var loopCount = 1;
            updateDoughnut = function () {
                if (loopCount === 0) {
                    tmpvalues = [];
                }
                $http.get($scope.url).
                        success(function (data, status, headers, config) {
                            objects = data.Objects;
                            if (objects) {
                                angular.forEach(objects[0].Param, function (object) {
                                    if (object.ParamName === "Total") {
                                        total = parseInt(object.ParamValue);
                                        $scope.totalvalue = "Total" + "-" + total + " kB";
                                    }
                                    if (object.ParamName === "Free") {
                                        free = parseInt(object.ParamValue);
                                        $scope.freevalue = "Free" + "-" + free + " kB";
                                    }
                                    if (object.ParamName === "X_LANTIQ_COM_Buffer") {
                                        buffer = parseInt(object.ParamValue);
                                        $scope.buffervalue = "Buffer" + "-" + buffer + " kB";
                                    }
                                    if (object.ParamName === "X_LANTIQ_COM_Cached") {
                                        cache = parseInt(object.ParamValue);
                                        $scope.cachevalue = "Cache" + "-" + cache + " kB";
                                    }
                                });
                                var tmp = free + buffer + cache;
                                usedMemory = (total - tmp);
                                freeMemory = (total - usedMemory);

                            }
                            var temp = {};
                            temp["label"] = label[0] + "-" + usedMemory + " kB";
                            temp["value"] = usedMemory;
                            temp["color"] = color[0];
                            tmpvalues.push(temp);
                            var temp1 = {};
                            temp1["label"] = label[1] + "-" + freeMemory + " kB";
                            temp1["value"] = freeMemory;
                            temp1["color"] = color[1];
                            tmpvalues.push(temp1);
                            for (var i = 0; i < tmpvalues.length; i++) {
                                if (loopCount === 1) {
                                    myDoughnutChart.addData(tmpvalues[i]);
                                    // document.getElementById('label').innerHTML = myDoughnutChart.generateLegend();
                                }
                                else {
                                    myDoughnutChart.segments[i].value = tmpvalues[i].value;
                                    myDoughnutChart.segments[i].label = tmpvalues[i].label;
                                    myDoughnutChart.segments[i].color = tmpvalues[i].color;
                                    i
                                    // document.getElementById('label').innerHTML = myDoughnutChart.generateLegend();
                                }
                            }
                            document.getElementById('label').innerHTML = myDoughnutChart.generateLegend();
                            myDoughnutChart.update();
                            loopCount = 0;
                        }).
                        error(function (data, status, headers, config) {
                        });
            };


            if ($scope.wsprotocol.length > 0) {
                var ws_memory = new WebSocket('ws://' + IP + ':5001', $scope.wsprotocol);
//                var ws_throughput = new WebSocket('ws://192.168.1.235:5001', $scope.wsprotocol);
                ws_memory.onopen = function () {
                    wsEnable = true;
                    ws_memory.send($scope.wsparams);
                };
                ws_memory.onmessage = function (message) {
                    if (loopCount === 0) {
                        tmpvalues = [];
                    }
                    data = JSON.parse(message.data);
                    objects = data.Objects;
                    if (objects) {
                        angular.forEach(objects[0].Param, function (object) {
                            if (object.ParamName === "Total") {
                                total = parseInt(object.ParamValue);
                                $scope.totalvalue = object.ParamName + "-" + Math.round((total / 1024)) + " kB";
                            }
                            if (object.ParamName === "Free") {
                                free = parseInt(object.ParamValue);
                                $scope.freevalue = object.ParamName + "-" + Math.round((free / 1024)) + " kB";
                            }
                            if (object.ParamName === "X_LANTIQ_COM_Buffer") {
                                buffer = parseInt(object.ParamValue);
                                $scope.buffervalue = object.ParamName + "-" + Math.round((buffer / 1024)) + " kB";
                            }
                            if (object.ParamName === "X_LANTIQ_COM_Cached") {
                                cache = parseInt(object.ParamValue);
                                $scope.cachevalue = object.ParamName + "-" + Math.round((cache / 1024)) + " kB";
                            }
                        });
                        var tmp = free + buffer + cache;
                        usedMemory = Math.round(((total - tmp) / 1024));
                        freeMemory = Math.round(((total - usedMemory) / 1024));
                    }
                    tmpvalues = [];
                    var temp = {};
                    temp["label"] = label[0] + "-" + usedMemory + " kB";
                    temp["value"] = usedMemory;
                    temp["color"] = color[0];
                    tmpvalues.push(temp);
                    var temp = {};
                    temp["label"] = label[1] + "-" + freeMemory + " kB";
                    temp["value"] = freeMemory;
                    temp["color"] = color[1];
                    tmpvalues.push(temp);

                    for (var i = 0; i < tmpvalues.length; i++) {
                        if (loopCount === 1) {
                            myDoughnutChart.addData(tmpvalues[i]);
                            document.getElementById('label').innerHTML = myDoughnutChart.generateLegend();
                        }
                        else {
                            myDoughnutChart.segments[i].value = tmpvalues[i].value;
                            myDoughnutChart.segments[i].label = tmpvalues[i].label + "-" + tmpvalues[i].value;
                            myDoughnutChart.segments[i].color = tmpvalues[i].color;
                        }
                    }
                    myDoughnutChart.update();
                    loopCount = 0;
                    if ($scope.path != $location.url()) {
                        ws_memory.close();
                    }
                };
                ws_memory.onclose = function (evt) {
                    if (wsEnable == false) {
                        //fallback to polling
                        console.log("fallback");
                        promise = $interval(updateDoughnut, $scope.pollinterval * 1000);
                        updateDoughnut();
                    }
                    console.log("Connection is closed... Bye !");
                };
            } else { //  we need only polling
                var promise = $interval(updateDoughnut, $scope.pollinterval * 1000);
                updateDoughnut();
            }
            $scope.$on('$destroy', function () {
                console.log(angular.isDefined(promise));
                if (angular.isDefined(promise)) {
                    $interval.cancel(promise);
                    promise = undefined;
                }
            });
        }
    };
});
myapp.directive('cpuChart', function ($q, $interval, $timeout) {
    return {
        restrict: "E",
        templateUrl: 'cpuchart.html',
        scope: {},
        controller: function ($scope, $http, $attrs) {
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.time = $attrs.time;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.wsprotocol = $attrs.wsprotocol;
            $scope.wsparams = $attrs.wsparams;
            $scope.labels = [];
            var promise;
            var wsEnable = false;
            var pageload = true;
            $timeout(function () {
                var cpus = [];
                getCPUChartData = function () {
                    var urls = JSON.parse($attrs.url);
                    var promises = urls.map(function (url) {
                        return $http.get(url);
                    });
                    $q.all(promises).then(function (responses) {
                        console.log("Response", responses);
                        objects = responses[1].data.Objects;
                        $scope.clkfrequency = [];
                        for (var obj = 0; obj < objects.length; obj++) {
                            var objectParamValues = objects[obj].Param;
                            for (var i = 0; i < objectParamValues.length; i++) {
                                var param_name = objectParamValues[i].ParamName;
                                var param_value = objectParamValues[i].ParamValue;
                                if (param_name === "ClockFrequency") {
                                    $scope.clkfrequency.push(param_value);
                                }
                                console.log($scope.clkfrequency);
                            }
                        }
                        $scope.clkfrequency = parseInt($scope.clkfrequency);
                        $scope.props = {};
                        objects = responses[0].data.Objects;
                        if (pageload)
                            $scope["labels"] = objects;
                        setTimeout(function () {
                            for (var obj = 0; obj < objects.length; obj++) {
                                if (pageload) {
                                    var obj1 = new JustGage({
                                        id: "g" + (obj + 2),
                                        value: getRandomInt(0, 100),
                                        min: 0,
                                        max: 100,
                                        title: "Core" + (obj + 1) + " in %"
                                    });
                                    cpus.push(obj1);
                                }
                                var avgVal = 0;
                                var objectParamValues = objects[obj].Param;
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;
                                    if (param_name === "CPUCycles") {
                                        $scope.props[param_name] = param_value;
                                        avgVal = parseInt(param_value);
                                    }
                                }
                                avgVal = Math.round((avgVal * 100) / (Math.pow(10, 6) * $scope.clkfrequency));
				if(avgVal > 100)
					avgVal = 100;

                                cpus[obj].refresh(avgVal);

                                if (objects.length == obj + 1) {
                                    pageload = false;
                                }
                            }
                        }, 500)
                    });
                };

                if ($scope.wsprotocol.length > 0) {
                    ws_throughput = new WebSocket('ws://' + IP + ':5001', $scope.wsprotocol);
//                var ws_throughput = new WebSocket('ws://192.168.1.235:5001', $scope.wsprotocol);
                    ws_throughput.onopen = function () {
                        wsEnable = true;
                        ws_throughput.send($scope.wsparams);
                    };
                    ws_throughput.onmessage = function (message) {
                        $q.all(promises).then(function (responses) {
                            console.log("Response", responses);
                            objects = message.Objects;
                            $scope.clkfrequency = [];
                            $scope.props = {};
                            for (var obj = 0; obj < objects.length; obj++) {
                                var avgVal = 0;
                                var objectParamValues = objects[obj].Param;
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;
                                    $scope.props[param_name] = param_value;
                                    avgVal = avgVal + parseInt(param_value);
                                    if (param_name === "ClockFrequency") {
                                        $scope.clkfrequency.push(param_value);
                                    }
                                    console.log($scope.clkfrequency);
                                }
                                $scope.clkfrequency = parseInt($scope.clkfrequency);
                                avgVal = Math.round(avgVal / $scope.clkfrequency);
                                cpus[obj].refresh(avgVal);
                            }
                        });
                    };
                    ws_throughput.onclose = function (evt) {
                        if (wsEnable == false) {
                            //fallback to polling
                            console.log("fallback");
                            promise = $interval(getCPUChartData, $scope.pollinterval);
                            getCPUChartData();
                        }
                        console.log("Connection is closed... Bye !");
                    };
                } else { //  we need only polling
                    var promise = $interval(getCPUChartData, $scope.pollinterval);
                    getCPUChartData();
                }
                // Cancel interval on page changes
                $scope.$on('$destroy', function () {
                    if (angular.isDefined(promise)) {
                        $interval.cancel(promise);
                        promise = undefined;
                    }
                });

            });
        }
    };
});


myapp.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        restrict: "C",
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {

                if (value == null)
                    return '';
                else
                    return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                console.log(value + "from formatter");
                return parseFloat(value, 10);
            });
        }
    };
});

myapp.controller('headercontroller', function ($translate, $scope, $rootScope, $http, languageService) {
	$scope.trlanguage = function (event, language) {
        $("#header_home").html(language)
        $.getJSON(event.currentTarget.attributes['value'].value + ".json", function (data) {
            globaldata = data;
            if ($("#dataView").find("div#translation").html() != '')
                $translate.use("languages/" + event.currentTarget.attributes['value'].value + "/" + $("#dataView").find("div#translation").html());
            else
                $translate.use(event.currentTarget.attributes['value'].value);
            $(".language").toggle();
            
        });
	    languageService.setObject(event.currentTarget.attributes['value'].value);
		$rootScope.$broadcast('rootScope:language_changed');
    }
    $scope.langclick = function () {
        $rootScope.$broadcast('rootScope:broadcast', 'Broadcast');
        $(".language").toggle();
        if ($(".notificationdiv").show()) {
            $(".notificationdiv").hide();
        }
    }
    var url = URL + "cgi_action";
    var action = "Action=";
    $scope.Logout = function () {
        location.href = "/";
        var post = action + "LogOut";
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    location.href = "";
                    $('#ajaxLoaderSection').hide();
                }).
                error(function (data, status, headers, config) {
                    location.href = "";
                    console.log("from error block");
                    $('#ajaxLoaderSection').hide();
                });
    };

})
myapp.run(function ($rootScope, $anchorScroll, $location, $translate, $http, tourService) {
    $.getJSON("en.json", function (data) {
        globaldata = data;
    });
    $rootScope.$watch(function () {
        return $location.path();
    },
            function (a) {
                if (localStorage.getItem('formModedeletestatus') == 'true')
                    localStorage.removeItem('formMode')
                if ((localStorage.getItem('formMode') != null) && (localStorage.getItem('formMode') == 'add'))
                    localStorage.setItem('formModedeletestatus', 'true')
                else
                    localStorage.setItem('formModedeletestatus', 'false')
                localStorage.setItem('previouspagetype', localStorage.getItem('pagetype'));
                localStorage.setItem('pagetype', a)
                console.log(localStorage.getItem('pagetype'));
                console.log(localStorage.getItem('previouspagetype'));
                if (localStorage.getItem('previouspagetype') === "/custom/syslogtable") {
                    websocket_log.close();
                }
            });
    $rootScope.$on("$locationChangeSuccess", function () {
        $anchorScroll();
    });
    $rootScope.helpTextDetails = function (event) {
        var activeLanguage = $translate.use();
        if (activeLanguage != undefined)
            activeLanguage = $translate.use().split('/');
        else
            activeLanguage = 'en'.split('/');
        if (activeLanguage.length > 1)
            activeLanguage = activeLanguage[1];
        else
            activeLanguage = activeLanguage[0];
        var helpfile = event.currentTarget.attributes['helpfile'].value.replace('*', activeLanguage);
        $rootScope["helpfile"] = helpfile;
        $rootScope['scopevariable'] = !$rootScope['scopevariable'];
    };
    
    $rootScope.startTour = function(page){
        tourService.setTour(page);
        //tourService.startTour();
    }
    $rootScope.$on('rootScope:broadcast', function (event, data) {
        $rootScope["scopevariable"] = true;
        $translate.refresh();

    });
getDSLStatus = function (reqParams, request) {
    $http.get(URL + reqParams).
    success(function (data, status, headers, config) {
    $rootScope.dslmodevalues = [];
    objects = data.Objects;
    for (var obj = 0; obj < objects.length; obj++) {
    var objectParamValues = objects[obj].Param;
    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
    var param_name = objectParamValues[pa1].ParamName;
    var ParamValue = objectParamValues[pa1].ParamValue;
    if (param_name === "Mode") {
    $rootScope.dslmodevalues.push(ParamValue);
    }
    }
	}
    console.log($rootScope.dslmodevalues);
    if ($rootScope.dslmodevalues.indexOf('ATM') > -1 || $rootScope.dslmodevalues.indexOf('PTM') > -1) {
    $rootScope.message = true;
    console.log($rootScope.message);
    }
    else{
    $rootScope.message = false;
    console.log($rootScope.message);
    }
    }).
    error(function (data, status, headers, config) {
    });
    };
    getDSLStatus("cgi_get_fillparams?Object=Device.X_LANTIQ_COM_NwHardware.WANGroup&Mode=");

/* Function to check number of DSL lines and send true if >1 and false if not */

getDSLLineCheck = function (reqParams, request) {
    $http.get(URL + reqParams).
    success(function (data, status, headers, config) {
    objects = data.Objects;
    for (var obj = 0; obj < objects.length; obj++) {
    var objectParamValues = objects[obj].Param;
    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
    var param_name = objectParamValues[pa1].ParamName;
    var ParamValue = objectParamValues[pa1].ParamValue;
    	if (ParamValue > 1) {
    		$rootScope.linemessage = true;
    		console.log($rootScope.linemessage);
    	}
    	else{
    		$rootScope.linemessage = false;
    		console.log($rootScope.linemessage);
    	}
    }
    }
    }).
    error(function (data, status, headers, config) {
    });
    };
    getDSLLineCheck("cgi_get_fillparams?Object=Device.DSL&LineNumberOfEntries=");
});


myapp.directive('ipAddress', function () {
    return {
        restrict: 'C',
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            setTimeout(function () {
                var models = attrs.ngModel.split('.');
                if (attrs.xmltype == "ipv4") {
                    if ($scope[models[0]] == undefined) {
                        $scope[models[0]] = {};
                        $scope[models[0]][models[1]] = '';
                    }
                    element.ipAddress($scope[models[0]][models[1]]);
                }
                else {
                    if ($scope[models[0]] == undefined) {
                        $scope[models[0]] = {};
                        $scope[models[0]][models[1]] = '';
                    }
                    element.ipAddress({v: 6, value: $scope[models[0]][models[1]]});
                }
                read()
                if (!ngModel) {
                    return;
                }
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };
                // Listen for change events to enable binding
                element.bind('blur keyup change', function () {
                    $scope.$apply(read);
                });
                // Write data to the model
                function read() {
                    $scope[models[0]][models[1] + "hidden"] = element.val()
                    ngModel.$setViewValue(element.val().replace(/[^a-fA-F0-9]+/g, ''));
                }
            }, 3000);
        }
    }
})
myapp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});
myapp.directive('triggerEvent', function ($rootScope, $interval) {
    return {
        require: 'ngModel',
        restrict: "A",
        link: function (scope, elem, attrs, model) {
            var origVal = elem.val();
            scope.check = function () {
//                console.log(elem.val())
                var newVal = elem.val();
                if (scope[passwordarraymapping.indexOf(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]) + "count"] == undefined)
                    scope[passwordarraymapping.indexOf(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]) + "count"] = 0;
                scope[passwordarraymapping.indexOf(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]) + "count"] += 1;
                var triggeredindex = passwordarraymapping.indexOf(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]);
                if (origVal !== newVal) {
                    model.$setViewValue(newVal);
                    if (changedFields.indexOf(attrs.ngModel.split('.')[0] + attrs.ngModel.split('.')[1]) < 0)
                        changedFields.push(attrs.ngModel.split('.')[0] + attrs.ngModel.split('.')[1])
                    if (scope.$parent != null && scope.$parent[attrs.ngModel.split('.')[0]] == undefined) {
                        scope.$parent[attrs.ngModel.split('.')[0]] = {};
                    }
                    if (scope.$parent != null) {
                        scope.$parent[attrs.ngModel.split('.')[0]][attrs.ngModel.split('.')[1]] = newVal;
                        console.log("value set from here")
                    }
                    $interval.cancel(passwordarray[triggeredindex]);
                    passwordarray.splice(triggeredindex, 1)
                    passwordarraymapping.splice(triggeredindex, 1)
                }
                else {
                    if (scope[passwordarraymapping.indexOf(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]) + "count"] > 20) {
                        $interval.cancel(passwordarray[triggeredindex]);
                        passwordarray.splice(triggeredindex, 1)
                        passwordarraymapping.splice(triggeredindex, 1)
                    }
                }


            }
            passwordarray.push($interval(scope.check, 100));
            passwordarraymapping.push(attrs.ngModel.split('.')[0] + "" + attrs.ngModel.split('.')[1]);
            scope.check();
        }
    };
});
myapp.directive("hiddenDomRemoval", function () {
    function link(scope, element, attrs) {
        scope.$on("$destroy",
                function handleDestroyEvent() {
                    var ngmodelname = attrs["ngModel"].split('.');
                    if (scope[ngmodelname[0]] != undefined) {
                        if (scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] != undefined)
                            scope[ngmodelname[0]][ngmodelname[1]] = scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"];
                        var modelindex = changedFields.indexOf(ngmodelname[0] + ngmodelname[1]);
                        if (modelindex > -1) {
                            if (ngmodelname[0] == "DeviceDHCPv4ServerPool1" || ngmodelname[0] == "DeviceDHCPv4RelayForwarding1") {
                                if (ngmodelname[1] == "Enable") {

                                } else {
                                    changedFields.splice(modelindex, 1);
                                }
                            }
                            else
                                changedFields.splice(modelindex, 1);
                        }
                    }
                }
        );
        element.bind('focus', function () {
            var model = attrs.ngModel.split('.');
            if (scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] == undefined) {
                if (element[0].type == 'select-one') {
                    if (isNaN(parseInt(element.val())) || scope[attrs["ngModel"].split('.')[1]] == undefined)
                        scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] = element.val();
                    else
                        scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] = scope[attrs["ngModel"].split('.')[1]][element.val()].id;
                } else
                    scope[attrs.ngModel.replace(/\./g, "") + "initialvalue"] = element.val();
            }
        })
    }
    return({
        link: link,
        restrict: "C"
    });
});
myapp.directive('helpClick', function ($rootScope) {
    return {
        require: '?ngModel',
        restrict: "A",
        link: function (scope, elem, attrs, model) {
            elem.bind('click', function () {
                scope[attrs.descHelp] = !scope[attrs.descHelp];
                scope.$apply()
            });
        }
    };
});

//Loading Icon Implementation

myapp.directive("rawAjaxBusyIndicator", function () {
    return {
        link: function (scope, element) {
            scope.$on("ajax-start", function () {
                element.show();
            });
            scope.$on("ajax-stop", function () {
                element.hide();
                pageloadiconstatus = false;
			 scope.$root.fetchSpeed=(Date.now()- scope.$root.initialtime)/1000;
            });
        }
    };
});
myapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        var requests = 0;
        function show() {
            if (!requests && pageloadiconstatus) {
                $rootScope.$broadcast("ajax-start");
            }
            requests++;
        }

        function hide() {
            requests--;
            if (!requests && pageloadiconstatus) {
                $rootScope.$broadcast("ajax-stop");
            }
        }
        return {
            'request': function (config) {
                show();
                return $q.when(config);
            }, 'response': function (response) {
                hide();
                return $q.when(response);
            }, 'responseError': function (rejection) {
                hide();
                return $q.reject(rejection);
            }
        };
    });
});
myapp.directive('checkStrength', function () {

    return {
        replace: false,
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {

            var strength = {
                colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                mesureStrength: function (p) {

                    var _force = 0;
                    var _regex = /[$-/:-?{-~!"^_`\[\]]/g;

                    var _lowerLetters = /[a-z]+/.test(p);
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);

                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                    var _passedMatches = $.grep(_flags, function (el) {
                        return el === true;
                    }).length;

                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;

                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

                    return _force;

                },
                getColor: function (s) {

                    var idx = 0;
                    if (s <= 10) {
                        idx = 0;
                    }
                    else if (s <= 20) {
                        idx = 1;
                    }
                    else if (s <= 30) {
                        idx = 2;
                    }
                    else if (s <= 40) {
                        idx = 3;
                    }
                    else {
                        idx = 4;
                    }

                    return {idx: idx + 1, col: this.colors[idx]};

                }
            };

            scope.$watch(iAttrs.checkStrength, function () {
                var componentinfo = iAttrs.checkStrength.split('.')
                if (scope[componentinfo[0]] == undefined || scope[componentinfo[0]][componentinfo[1]] === '') {
                    iElement.css({"display": "none"});
                } else {
                    if (scope[componentinfo[0]][componentinfo[1]] != undefined) {
                        var c = strength.getColor(strength.mesureStrength(scope[componentinfo[0]][componentinfo[1]]));

                        iElement.children('li')
                                .css({"background": "#DDD"})
                                .slice(0, c.idx)
                                .css({"background": c.col});
                    }
                    iElement.css({"display": "inline"});
                }
            });

        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };

});
 myapp.filter('removeSpaces', [function() {
 return function(string) {
 if (!angular.isString(string)) {
     return string;                
   }              
  return string.replace(/[\s]/g, '');
 };                                                                                               
}]);

//Logic for reachability test
//Directive 
myapp.directive('reachabilityTest', function ($rootScope, $interval, $location, $http, $route, ngDialog,$timeout) {
    return {
        restrict: "E",
        template: '',
        link: function (scope, elem, attrs, model) {
            if(attrs.polling == "true"){
                var timeout = attrs.timeout ? attrs.timeout : '30000';
                $interval(function () {
//                        Uncomment while using IDE
//                        IP = IP == "localhost" ? "192.168.1.1" : IP;
//                        var testURLPort = ''
//                        Comment while using IDE                        
       var testURLPort = window.location.port ? ':' + window.location.port: '';
                   var testURL = window.location.protocol+'//' + IP + testURLPort;
                   $http.get(testURL).success(function(data) {
                       $rootScope["notreachable"] = 0;
                       deviceReachability = true;
                   })
                   .error(function(data, status) {
                       deviceReachability = false;
                       console.error("DUT/Device not reachacle, redirecting to dashboard");
                       if( $rootScope["notreachable"] == undefined )
                           $rootScope["notreachable"] = 1;
                       else
                           $rootScope["notreachable"] += 1;
                       if($rootScope["notifymessage"] == undefined || $rootScope["notreachable"]<= 1){
                           $rootScope["notifymessage"] = "DUT/Device not reachacle, redirecting to dashboard";
                           ngDialog.openConfirm({
                                   template: 'modalDialogId',
                                  className: 'ngdialog-theme-default'
                           }).then(function (value) {
                               $location.path('/tabHead/adv_homepage');
                            	$route.reload();

                           });
                      }
                   })
                   .finally(function() {
                   });
               },timeout);
           }
        }
   };
});

/* Directive for jsTree
 * 
 * Usage:
 * From json file
 * <js-tree tree-data="json" tree-src="jsondata.json"></js-tree>
 * Using scope varible
 * <js-tree tree-data="scope" tree-model="treeModel"></js-tree>
 * Using HTML file
 * <js-tree tree-data="html" tree-src="html.html"></js-tree>
 * 
 */
myapp.directive('jsTree', function($http) {

  var treeDir = {
    restrict: 'EA',
    fetchResource: function(url, cb) {
      return $http.get(url).then(function(data) {
        if (cb) cb(data.data);
      });
    },

    managePlugins: function(s, e, a, config) {
      if (a.treePlugins) {
        config.plugins = a.treePlugins.split(',');
        config.core = config.core || {};
        config.core.check_callback = config.core.check_callback || true;

        if (config.plugins.indexOf('state') >= 0) {
          config.state = config.state || {};
          config.state.key = a.treeStateKey;
        }

        if (config.plugins.indexOf('search') >= 0) {
          var to = false;
          if (e.next().attr('class') !== 'ng-tree-search') {
            e.after('<input type="text" placeholder="Search Tree" class="ng-tree-search"/>')
              .next()
              .on('keyup', function(ev) {
                if (to) {
                  clearTimeout(to);
                }
                to = setTimeout(function() {
                  treeDir.tree.jstree(true).search(ev.target.value);
                }, 250);
              });
          }
        }

        if (config.plugins.indexOf('checkbox') >= 0) {
          config.checkbox = config.checkbox || {};
          config.checkbox.keep_selected_style = false;
        }

        if (config.plugins.indexOf('contextmenu') >= 0) {
          if (a.treeContextmenu) {
            config.contextmenu = config.contextmenu || {};

            if (a.treeContextmenuaction != undefined) {
              config.contextmenu.items = function(e) {
                return s.$eval(a.treeContextmenuaction)(e);
              }
            } else {
              config.contextmenu.items = function() {
                return s[a.treeContextmenu];
              }
            }
          }
        }

        if (config.plugins.indexOf('types') >= 0) {
          if (a.treeTypes) {
            config.types = s[a.treeTypes];
            console.log(config);
          }
        }

        if (config.plugins.indexOf('dnd') >= 0) {
          if (a.treeDnd) {
            config.dnd = s[a.treeDnd];
            console.log(config);
          }
        }
      }
      return config;
    },
    manageEvents: function(s, e, a) {
      if (a.treeEvents) {
        var evMap = a.treeEvents.split(';');
        for (var i = 0; i < evMap.length; i++) {
          if (evMap[i].length > 0) {
            var evt = evMap[i].split(':')[0];
            if (evt.indexOf('.') < 0) {
              evt = evt + '.jstree';
            }
            var cb = evMap[i].split(':')[1];
            treeDir.tree.on(evt, s[cb]);
          }
        }
      }
    },
    link: function(s, e, a) { 
      $(function() {
        var config = {};
	
        config.core = {};
        if (a.treeCore) {
          config.core = $.extend(config.core, s[a.treeCore]);
        }

        a.treeData = a.treeData ? a.treeData.toLowerCase() : '';
        a.treeSrc = a.treeSrc ? a.treeSrc.toLowerCase() : '';

        if (a.treeData == 'html') {
          treeDir.fetchResource(a.treeSrc, function(data) {
            e.html(data);
            treeDir.init(s, e, a, config);
          });
        } else if (a.treeData == 'json') {
          treeDir.fetchResource(a.treeSrc, function(data) {
            config.core.data = data;
            treeDir.init(s, e, a, config);
          });
        } else if (a.treeData == 'scope') {
          s.$watch(a.treeModel, function(n, o) {
            if (n) {
              config.core.data = s[a.treeModel];
              $(e).jstree('destroy');
              treeDir.init(s, e, a, config);
            }
          }, true);
          config.core.data = s[a.treeModel];
          treeDir.init(s, e, a, config);
        } else if (a.treeAjax) {
          config.core.data = {
            'url': a.treeAjax,
            'data': function(node) {
              return {
                'id': node.id != '#' ? node.id : 1
              };
            }
          };
          treeDir.init(s, e, a, config);
        }
      });

    },
    init: function(s, e, a, config) {
      treeDir.managePlugins(s, e, a, config);
      this.tree = $(e).jstree(config);
      treeDir.manageEvents(s, e, a);
    }
  };

  return treeDir;

});

/* 
 * Switch widget
 * 
 * switchWidget render switch in UI
 * while doing disable/enable cgi_set request sent to server
 * Used directly enable or disable a feature
 * 
 */
myapp.directive('switchWidget', function ( modifyService, ngDialog,firewallService) {
    var switchWidget = {
        restrict: "E",
        templateUrl: "./switchwidget.html",
        scope: {
            ngModel: '=',
            customfun: '&customfun',
            textChange: '&textchange'
        },
        controller: function ($scope, $http, $attrs, $interval, $rootScope) {
            $scope.object = $attrs.object;
            $scope.param = $attrs.param;
            $scope.id = $attrs.id;
            $scope.label = $attrs.label;
            $scope.dispay = true;
            var getUrl = "";
            var setUrl = "";
            var finalPost = '';
            getData = function($attrs){
                getUrl = URL + "cgi_get_fillparams?Object=" + $attrs.object + '&' + $attrs.param + '=';
                $http.get(getUrl).
                    success(function (data, status, headers, config){
                        if(status == 200 && data.Objects != undefined ){
                            if($scope[$attrs.object] == undefined)
                                $scope[$attrs.object] = {};
                            if(data.Objects[0].Param[0].ParamValue === "true" || data.Objects[0].Param[0].ParamValue === "1"){
                                $scope[$attrs.object][$attrs.param] = true;
                            }else if(data.Objects[0].Param[0].ParamValue === "false" || data.Objects[0].Param[0].ParamValue === "0"){
                                $scope[$attrs.object][$attrs.param] = false;
                            }
                            $scope.ngModel = $scope[$attrs.object][$attrs.param];
                        }
                    });
            };
            
            
            if($attrs.checkdisplay == "true" && $attrs.checkurl != "" && $attrs.checkurl != undefined){
                var checkvalue = "true";
                if($attrs.checkvalue != "" && $attrs.checkvalue != undefined){
                    checkvalue = $attrs.checkvalue;
                }
                $http.get(URL + $attrs.checkurl).
                    success(function (data, status, headers, config){
                    console.log(data.Objects[0].Param[0].ParamValue , checkvalue); 
                        if(data.Objects[0].Param[0].ParamValue !== checkvalue){
                              $scope.dispay = false;
                        }
                    });
            }
            
            getData($attrs);
    
            var state = '', value='';
            
            $scope.onToggle = function(object, param){
                setUrl = URL + "cgi_set";
                if($attrs.cgiset == "true" || $attrs.cgiset == "1"){
                    if(!$scope.ngModel == true){
                        state = "Enable";
                        value = $attrs.cgiset === "1" ? 1 : true
                    }else{
                        state = "Disable"
                        value = $attrs.cgiset === "1" ? 0 : false;
                    }
                    finalPost = "Object="+object+"&Operation=Modify&" + param +"=" + value + "&";
					
                    if($scope.label.toLowerCase() == "qos"){
                        $rootScope["notifymessage"] = state + " QoS rules configured in QoS webpage";
                    }
                    else if($scope.label.toLowerCase() == "wifi2_4"){
                        $rootScope["notifymessage"] = state + " WiFi2.4";
                    }
                    else{
                        $rootScope["notifymessage"] = state + " " + $scope.label;
                    }
                    ngDialog.openConfirm({
                            template: 'SwitchmodalDialogId',
                           className: 'ngdialog-theme-default',
                           preCloseCallback:function(){ 
                               $scope.ngModel = !$scope.ngModel;
                           }
                    }).then(function (value) {
                        $('#ajaxLoaderSection').show();
                        $http.post(setUrl, finalPost).
                            success(function (data, status, headers, config) {
                                $('#ajaxLoaderSection').hide();
							
                                if(status != 200){
                                    $scope.ngModel = !$scope.ngModel;
                                }
							if(finalPost.indexOf('Device.Firewall')!==-1){
										firewallService.getValues().then(function(data) {
                    $rootScope.firewall = data;
                    console.info('value returned from directive.', $rootScope.firewall);
                });
							}
				
                            }).
                            error(function (data, status, headers, config) {
                                $('#ajaxLoaderSection').hide();
                                $scope.ngModel = !$scope.ngModel;
                            });
                    })
                }
                if($attrs.textchange != "" && $attrs.textchange != undefined){
                    $scope.textChange({
                        value: object.replace(/\./g,"") + param
                    });
                }
                if($attrs.customfun != undefined && $attrs.customfun != ""){
                        $scope.customfun();                     
                }
            };
                
        }
    };
    return switchWidget;
});
/* 
 * Push Button widget
 * 
 * PushButtonWidget render pushbutton in UI
 * cgi request type decided based on the mode of button (start mode/stop mode)
 * and also based on the values of starturl and stopurl
 * Widget used for XML element type="pushbutton" and also used in custom pages directly as widget
 * Usage in XML
 * <parameter 
 *       name = "WPSPushbutton" 
 *       //popup = "true"
 *       startname = "Start"
 *       stopname = "Stop"
 *       cgistarturl = "cgi_action" 
 *       cgistopurl = "cgi_action" 
 *       startobjectquery = "Object=Device.WiFi.AccessPoint.2.X_LANTIQ_COM_Vendor.WPS&amp;NOTIFICATION=NOTIFY_WIFI_WPS_ACTION&amp;Action=PBC&amp;type=false"
 *       stopobjectquery = "Object=Device.WiFi.AccessPoint.2.X_LANTIQ_COM_Vendor.WPS&amp;NOTIFICATION=NOTIFY_WIFI_WPS_ACTION&amp;Action=PBC&amp;type=false"
 *       //startclick = "startFunction"
 *       //stopclick = "stopFunction"
 *       timer = "60000"
 *       routeurl = "pushbtnclick" 
 *       type="pushbutton" 
 *       webname="WPS Pushbutton" >
 *   </parameter>
 *
 * Usage in custom pages
 * <push-button-widget 
 *      id="WPSPushbutton" 
 *      //ng-dialog-class="ngdialog-theme-default" 
 *      //ng-dialog="firstDialogId" 
 *      type="pushbutton" 
 *      routeurl="pushbtnclick" 
 *      timer="60000" 
 *      //stopclick="stopFunction" 
 *      //startclick="startFunction" 
 *      stopobjectquery="Object=Device.WiFi.AccessPoint.2.X_LANTIQ_COM_Vendor.WPS&NOTIFICATION=NOTIFY_WIFI_WPS_ACTION&Action=PBC&type=false" 
 *      startobjectquery="Object=Device.WiFi.AccessPoint.2.X_LANTIQ_COM_Vendor.WPS&NOTIFICATION=NOTIFY_WIFI_WPS_ACTION&Action=PBC&type=false" 
 *      cgistopurl="cgi_action" 
 *      cgistarturl="cgi_action" 
 *      stopname="Stop" 
 *      startname="Start" 
 *      name="WPSPushbutton" 
 *      source="Device.WiFi.AccessPoint.2.X_LANTIQ_COM_Vendor.WPS?PIN" 
 *      webname="WPS Pushbutton"
 *      formname="Provide-Current-Parent-Form-Name">
 *   </push-button-widget>
 * 
 * attributes with //(symbol) are need to implement.
 */
myapp.directive('pushButtonWidget', function () {
    var PushButtonWidget = {
        restrict: "E",
        template: '<div class="btn-align custom_btn"><input type="button" class="waves-effect waves-light btn btn-info " id="{{name}}" value="{{value}}" ng-click="clickfun($event, startclick, stopclick)" formname="{{formname}}" source="{{source}}"></input></div>',
        scope: true,
        controller: function ($scope, $attrs, $rootScope, ngDialog) {
            angular.forEach($attrs,function(value, key){
                $scope[key] = value;
            });
            $scope.clicked = false;
            $scope.value = $attrs.startname;
            
            $scope.clickfun = function($event){
                var formIndex = localStorage.getItem('pushbuttonformIndex');
                var pushbtnclick = function(url, query, $event, displayvalue, clicked){
                    $scope.pushbtnclick(url, query, $event);
                    $scope.value = displayvalue;
                    $scope.clicked = clicked;
                };
                console.log("pushbuttonformIndex",formIndex);
                if($scope.clicked == false){
                    pushbtnclick($attrs.cgistarturl, $attrs.startobjectquery.replace(/\*/g, formIndex), $event, $attrs.stopname, true);
                    setTimeout(function(){
                        if($scope.clicked == true){
                            pushbtnclick($attrs.cgistopurl, $attrs.stopobjectquery.replace(/\*/g, formIndex), $event, $attrs.startname, false);
                        }
                    },$attrs.timer);
                }else if($scope.clicked == true){
                    pushbtnclick($attrs.cgistopurl, $attrs.stopobjectquery.replace(/\*/g, formIndex), $event, $attrs.startname, false);
                }
            };
        }
    };
    return PushButtonWidget;
});

