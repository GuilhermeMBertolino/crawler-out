myapp.controller('hybridController', function ($location,$scope, $http, $compile, localStorageService, $route, modifyService, $routeParams, $interval, $filter, $timeout, $q, $rootScope, ngDialog, $translate, clientModeService, httpService,$sanitize) {
    errormessages = [];
    var tabletimeoutarray=[];
    var tabletimeoutrepeatarray=[];
    var previoousmessages = [];
    var promisearray = [];
    var warningMessagePromiseArray = [];
    $scope.vlanidstatus = true;
    $scope.vlan_check = '';
    var pushbtn_socket = '';
    var pushbtn_socketstatus = false;
	var isReboot = false;
    $scope.notifications = [];
    var notificationstatus = true;
    var notificationdataargs = [];
    var notificationspostdata = {};
    var notificationpost = '';
     var  beerocks_websocket;
    $scope.tableiconicstatus = {};
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    $scope["DeviceX_INTEL_COM_BEEROCKSWSD"] = {};
    if($rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"] !== undefined){
    $scope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"];
    }
    else{
        $scope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = 'slave_init_done';
    }
    $scope.$on("DeviceX_INTEL_COM_BEEROCKSWSD", function (event, args) {
        $scope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"];
    });
    
    $scope.ddchildobjectIndex = '';
	var accordionAddedObjectIndex = [];
	$scope.accordion={}
	$scope.internet = {};
     
    if(localStorage.getItem('internetEdit') !== undefined && localStorage.getItem('internetEdit') !== null){
       $scope.internet.internetEdit = localStorage.getItem('internetEdit')
    }
    else{
        $scope.internet.internetEdit = "false";
    }					 
	
	//Polyfill for includes which is not supported by ie
	if (!String.prototype.includes) {
		String.prototype.includes = function(search, start) {
		  if (typeof start !== 'number') {
			start = 0;
		  }

		  if (start + search.length > this.length) {
			return false;
		  } else {
			return this.indexOf(search, start) !== -1;
		  }
		};
	 }
    
	if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function (searchElement, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);
                var len = o.length >>> 0;
                if (len === 0) {
                    return false;
                }
                var n = fromIndex | 0;
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                }

                while (k < len) {
                    if (sameValueZero(o[k], searchElement)) {
                        return true;
                    }
                    k++;
                }

               return false;
            }
        });
    }

    var jsonpromise =$interval(function () {
        if (jsonloadstatus) {
            if (breadcrumbsdata[$route.current.params.param2] == undefined) {
                $rootScope["breadcrumbs"] = JSON.parse(localStorage.getItem('breadcrumbarray'));
                if (localStorageService.get('hybrideditObject') == null){
					if($rootScope["breadcrumbs"]!==null){
					$rootScope["breadcrumbs"].push({"name": "Add", "path": 'nothing'})
					}
				}
                else{
					if($rootScope["breadcrumbs"]!==null){
					$rootScope["breadcrumbs"].push({"name": "Edit", "path": 'nothing'})
					}
				}
            }
            else {
                $rootScope["breadcrumbs"] = breadcrumbsdata[$route.current.params.param2]
                localStorage.setItem('breadcrumbarray', JSON.stringify($rootScope["breadcrumbs"]))
                if(breadcrumbstatus){
                    breadcrumbstatus=false;
                    setTimeout(function(){
                        var tabtype='home';
                        angular.forEach($rootScope["breadcrumbs"],function(breadcrumbobject,bindex){
                            if(bindex==0){
                                if(breadcrumbobject.name=="Basic"){
                                    $("#myTab li:first-child").addClass('active');
                                    $("#home").addClass('active');
                                    $("#profile").removeClass('active');
                                    $("#myTab li:nth-child(2)").removeClass('active');
                                }else{
                                    tabtype='profile';
                                    $("#myTab li:nth-child(2)").addClass('active');
                                    $("#myTab li:first-child").removeClass('active');
                                    $("#home").removeClass('active');
                                    $("#profile").addClass('active');
                                }
                            }else{
                                if (bindex==1)
                                   $rootScope.accordian(tabtype+"-"+breadcrumbobject.name+"-"+breadcrumbobject.index,true);
                                else
                                    $rootScope.accordian(breadcrumbobject.name+"-"+breadcrumbobject.order+"-"+breadcrumbobject.index,true);
                            }
                        });
                    },300);
                }
            }
            $interval.cancel(jsonpromise);
        }
    }, 500);

    $scope.homefun = function () {

        if (breadcrumbsdata[$route.current.params.param2] == undefined)
            bdata = JSON.parse(localStorage.getItem('breadcrumbarray'));

        else
            bdata = breadcrumbsdata[$route.current.params.param2];

        if (bdata[0]["name"] == "Advanced")
            tab = "profile";

        else
            tab = "home"

        $rootScope.accordian(tab + "-" + bdata[1]["name"] + "-" + bdata[1]["index"], true)

    }

    $scope.checkIpv4 = function (data) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(data))
        {

        }
        else {
            return "Invalid IPv4 Address"
        }

    };
    $scope.checkIpv6 = function (data) {
        if (/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/.test(data))
        {

        }
        else {
            return "Invalid IPv6 Address"
        }

    };
    $scope.checkmac = function (data) {
        if (/^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/.test(data))
        {

        }
        else {
            return "Invalid MAC Address"
        }

    };

    pageloadiconstatus = true;
    $scope.wifipageload = true;
    var activeLanguage = $translate.use();
    if (activeLanguage != undefined)
        activeLanguage = $translate.use().split('/');
    else
        activeLanguage = 'languages/en/multicast'.split('/');
    if (activeLanguage.length > 1)
        activeLanguage = activeLanguage[1];
    else
        activeLanguage = activeLanguage[0];
    if ($("#dataView").find("div#translation").html() != '')
        $translate.use("languages/" + activeLanguage + "/" + $("#dataView").find("div#translation").html());
    else
        $translate.use(activeLanguage);
    tableparentobjects = {};
    $scope.formsubmitstatus = false;
    $scope.randomNumber = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    if (localStorage.getItem('randomvalue') == null)
        $scope.randomvalue = $scope.randomNumber(10, 99);
    else
        $scope.randomvalue = localStorage.getItem('randomvalue')
    var currentIndex, prevIndex;
    var extension = '';
    $scope.changedobjects = [];
    $scope.newobjects = [];
    $scope.deleteobjects = [];
    $scope.objectstatus = [];
    $scope.presentAlias = ''
    var iconicparams = '';
    changedFields = [];
    var atmlinktype = {"EoA": [{"id": "Static", "name": "Static"}, {"id": "DHCP", "name": "DHCP"}, {"id": "PPPoE", "name": "PPPoE"}, {"id": "Bridge", "name": "Bridge"}],
        "IPoA": [{"id": "Static", "name": "Static"}, {"id": "DHCP", "name": "DHCP"}],
        "PPPoA": [{"id": "PPPoA", "name": "PPPoA"}]
    }

    $rootScope.$on('rootScope:broadcast', function (event, data) {
        $scope["scopevariable"] = true;
        $translate.refresh();
    });
    var orgarray = [];
    var duparray = [];
	$scope.storePageSpeed=function(){
        }
		
		
    /*
     * Creates,Modifies or Deltes table rows in SSID(With in a single post)
     * @return {undefined} refresh the page
     */
    $scope.bulkapply = function () {
        $rootScope.initialtime=Date.now();
        $('#ajaxLoaderSection').show();
        var url = URL + httpService.set_url;
        var post = '';
        var postObjects = $scope.changedobjects;
        var valid = true;
        
        var tableId = "";
        if (localStorage.getItem("xml") != "adv_ssid" || localStorage.getItem("xml") != "adv5_ssid" || localStorage.getItem("xml") != "adv5_2_ssid") {
            $("#dataView").find("table").map(function (i){
                if ($(this).attr('id') != undefined){
                   tableId = $(this).attr('id');
                   $scope["accordion"][tableId + "popup"] = false;
                   $scope["accordion"][tableId + "popupval"] = "";
        
                   var tableObjects = $scope[tableId + "table"];
                   var WPSCount = 0;
                 
                   for(var i=0;i < tableObjects.length; i++){
                       if(tableObjects[i]["DeviceWiFiAccessPointWPS__Enable"] == "true"){
                           WPSCount = WPSCount + 1;
                       }
                       if(tableObjects[i]["DeviceWiFiAccessPointWPS__Enable"] == "true" && 
                          (tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WPA-Personal" || tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WPA2-Enterprise" || tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WPA-Enterprise" || tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WPA-WPA2-Enterprise" || tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WEP-64" || tableObjects[i]["DeviceWiFiAccessPointSecurity__ModeEnabled"] == "WEP-128")){
                           $scope["accordion"][tableId + "popup"] = true;
                           $scope["accordion"][tableId + "popupval"] = "WPS cannot be configured for WPA/WEP/Enterprise securities" + ", ";

                   }
                }
                if(WPSCount > 1){
                     $scope["accordion"][tableId + "popup"] = true;
                     $scope["accordion"][tableId + "popupval"] = $scope["accordion"][tableId + "popupval"] + " WPS can be configured for only one VAP" + ", ";
                }
                if($scope["accordion"][tableId + "popupval"].endsWith(", ")){
                  $scope["accordion"][tableId + "popupval"] =  $scope["accordion"][tableId + "popupval"].substring(0, $scope["accordion"][tableId + "popupval"].length - 2)
                }
            }
            })
        } 
        
         var noOfForms = [];
            $("#dataView").find("form").map(function (i)
            {
                if ($(this).attr('id') != undefined)
                    noOfForms.push($(this).attr('name'));
            })
            /**
             * To validate all forms available in the page.
             * If any one of the form fails then global form submition got stoped.
             */ 
            angular.forEach(noOfForms, function(formname){
               if(!$scope[formname].$valid)
                    valid = false;
                    $scope[formname].$submitted = true;
                    var errorCount = Object.keys($scope[formname].$error).length;
                    $scope.formsubmitstatus = true;
                    for(var i=0; i<errorCount;i++){
                        var errorType = Object.keys($scope[formname].$error)[i];
                        var error = Object.values($scope[formname].$error)[i];
                         angular.forEach(error,function(errorObject){
                                      console.log(errorObject);
                                      var objectName = errorObject.$name;
                                      $scope[formname + '.'+ objectName + '.$error' + '.' + errorType] = true;
                                                 });
                    }
                    
            })
            
        
        var results = [];
        if(valid != false){
                
            //To remove Duplicate Objects from Array
            postObjects = $rootScope.remove_duplicates(postObjects);
            angular.forEach(postObjects, function (rowobject) {
                var obj2 = rowobject.objects.split(',');
                obj2.forEach(function (object, objindex) {
            var postBefore = "Object=" + object + "&Operation=Modify";
                    if ($scope[object.replace(/\./g, "")] != undefined) {
                        var postformat = $rootScope.poststringformat(object.replace(/\./g, ""), $scope[object.replace(/\./g, "")], changedFields, 0, $scope.objectstatus);
                        console.log(postformat)
                        if (postformat[0]) {
                            post += postBefore + postformat[1] + "&";
                        }
                    }
                })
            })
            var newpost = '';
            angular.forEach($scope.newobjects, function (addObj) {
                if (addObj.hasOwnProperty('modifiedParameters')) {
                  var finalobjects = addObj["modifiedParameters"].split(',');
				  if (localStorage.getItem("pagetype") == "/tableform/adv_ssid" ||localStorage.getItem("pagetype") == "/tableform/adv5_ssid" || localStorage.getItem("pagetype") == "/tableform/adv5_2_ssid") {
                     var swapArrayElements = function(arr, indexA, indexB) {
                     var temp = arr[indexA];
                     arr[indexA] = arr[indexB];
                     arr[indexB] = temp;
                  };
				swapArrayElements(finalobjects,2,3);

					
                    finalobjects.pop();
                    angular.forEach(finalobjects, function (key, keyindex) {
                        newpost += "Object=" + addObj.relation[keyindex].Object + "&Operation=" + addObj.relation[keyindex].Operation
                        angular.forEach($scope[key.replace(/[^a-zA-Z0-9_-]/g, '')], function (value, key1) {
                            newpost += "&" + key1 + "=" + value + "";
                        })
                        newpost += "&";
                    })
                }
					
				}
                else {
                    newpost += addObj.post;
                }
            })
            var delpost = '';
            angular.forEach(modifyService.split($scope.deleteobjects), function (delobj) {
                delpost += "Object=" + delobj + "&Operation=Del" + "&";
            })
            var finalPost = (post + newpost + delpost).replace(/(^[&\s]+)|([&\s]+$)/g, '');
            $scope.changedobjects = [];
            $scope.deleteobjects = [];
            $scope.newobjects = [];
            localStorage.removeItem('formIndex');
            results.push($http.post(url, finalPost));
			return $q.all(results).then(function(){
				// runs after all the set call are made.
                $('#ajaxLoaderSection').hide();
                finalPost="";
                post="";
                newpost="";
                delpost="";
                $route.reload();

			});
            
        }
        else
        {
            $('#ajaxLoaderSection').hide();
            return "error";
        }
    };
   
	$scope.radiofunction = function (data) {
        return data.split(',')
    }
    if (localStorage.getItem('dropdown') != null)
        var dropdownParams = localStorage.getItem('dropdown').split(',');
    /*
     * Tracks the changes of toggle button
     * @param {string} param - contains object name and param name
     */
    $scope.toggleClick = function (param) {
        var toggleparam = param.split('.')
        changedFields.push(toggleparam[0] + toggleparam[1])
    }
    
    /*
     * Tracks the changes of checkbox in editable table
     */
    $scope.checkboxchangeEditable = function (key, value, index, tabledataobject, rowIndex) {
	    var originalObjects = index.split(',');
        var modifiedObjects = [];
        angular.forEach(originalObjects, function (originalObject) {
        modifiedObjects.push(modifyService.dotstarremove(originalObject, '.*').replace(/\./g, '').replace(/\*/g, ''));
        })
        $scope[tabledataobject + "table"][rowIndex][key] = value;
        if (index.split(',')[0].match(/\d+/g)[0] <= $scope[tabledataobject + "tableOriginalIndexinnerIndex"]) {
            var applyMetadata = {};
            applyMetadata.index = index.split(',')[0].match(/\d+/g)[0];
            applyMetadata.objects = index;
            $scope.changedobjects.push(applyMetadata);
        }
        var position = modifiedObjects.indexOf(key.split('__')[0]);
        if ($scope[originalObjects[position].replace(/\./g, "")] == undefined) {
            $scope[originalObjects[position].replace(/\./g, "")] = {};
        }
        $scope[originalObjects[position].replace(/\./g, "")][key.split('__')[1]] = value;
        changedFields.push(originalObjects[position].replace(/\./g, "") + key.split('__')[1])
    }
    
    
    /*
     * Tracks the changes of textbox in editable table
     */
    $scope.textchangeEditable = function (key, value, index, tabledataobject, rowIndex) {
        var originalObjects = index.split(',');
        var modifiedObjects = [];
        angular.forEach(originalObjects, function (originalObject) {
		modifiedObjects.push(modifyService.dotstarremove(originalObject, '.*').replace(/\./g, '').replace(/\*/g, ''));
        })
        $scope[tabledataobject + "table"][rowIndex][key] = value;
        if (index.split(',')[0].match(/\d+/g)[0] <= $scope[tabledataobject + "tableOriginalIndexinnerIndex"]) {
            var applyMetadata = {};
            applyMetadata.index = index.split(',')[0].match(/\d+/g)[0];
            applyMetadata.objects = index;
            $scope.changedobjects.push(applyMetadata);
        }
        var position = modifiedObjects.indexOf(key.split('__')[0]);
        if ($scope[originalObjects[position].replace(/\./g, "")] == undefined) {
            $scope[originalObjects[position].replace(/\./g, "")] = {};
        }
        $scope[originalObjects[position].replace(/\./g, "")][key.split('__')[1]] = value;
        changedFields.push(originalObjects[position].replace(/\./g, "") + key.split('__')[1])
    }
    /*
     * Tracks the changes of dropdown in editable table
     */
	
    $scope.dropdownchangeEditable = function (key, value, index, tabledataobject, rowIndex) {
																	 
		 $timeout(function() {
         var ele = "[targetid='"+tabledataobject+"table"+rowIndex+"']";
            if($scope[$(ele).attr('tabletoggletext')][rowIndex] != "Less" && value != "None"){
                angular.element($(ele)).triggerHandler('click');
            }else if($scope[$(ele).attr('tabletoggletext')][rowIndex] == "Less" && value == "None"){
                angular.element($(ele)).triggerHandler('click');
            }
        }, 100);
		var originalObjects = index.split(',');
        var modifiedObjects = [];
        angular.forEach(originalObjects, function (originalObject) {
            modifiedObjects.push(originalObject.replace(/[^a-zA-Z]/g, ''))
        })
        $scope[tabledataobject + "table"][rowIndex][key] = value;
        if (index.split(',')[0].match(/\d+/g)[0] <= $scope[tabledataobject + "tableOriginalIndexinnerIndex"]) {
            var applyMetadata = {};
            applyMetadata.index = index.split(',')[0].match(/\d+/g)[0];
            applyMetadata.objects = index;
            $scope.changedobjects.push(applyMetadata);
        }
        var position = modifiedObjects.indexOf(key.split('__')[0]);
        if ($scope[originalObjects[position].replace(/\./g, "")] == undefined)
            $scope[originalObjects[position].replace(/\./g, "")] = {};
        $scope[originalObjects[position].replace(/\./g, "")][key.split('__')[1]] = value;
        changedFields.push(originalObjects[position].replace(/\./g, "") + key.split('__')[1])
    }
    var hasPrev = false;
    /*
     * Open table on click of More  button  in Accordion
     */
    $scope.accordiontabledetail = function ($index, event) {
        $scope.accordionexpandstatus($index, event);
        $scope.accordion.activePosition = $scope.accordion.activePosition == $index ? -1 : $index;
        if ($scope.accordion.activePosition >= 0) {
            localStorage.setItem('tableIndex', event.currentTarget.attributes['objectname'].value.split(',')[2].match(/\d+/g));
            var openSource = event.currentTarget.attributes['source'].value;
            var targetId = event.currentTarget.attributes['targetId'].value;
            var htmlSource = displayResult(openSource, 'makehtml');
            var finalhtml = $("#" + targetId).html(htmlSource)
		$("#" + targetId).find('div.ltq_breadcrumbs').addClass('hide');
            $compile(finalhtml)($scope);
            var tableelement = $("#" + targetId).find('table').attr('name');
            var fdata = $("#" + targetId).find('table').attr('filterdata');
            var tid = $("#" + targetId).find('table').attr('id');
            var index = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g);
            var objectname = tableelement.split('?')[0];
            var number = objectname.match(/\*+/g);
            if (number != null) {
                for (var k = 0; k < number.length; k++) {
                    value = '.' + number[k]
                    objectname = objectname.replace(value, "." + index[k])
                }
            }
            tableelement = objectname + "?" + tableelement.split('?')[1];
            console.log(tableelement)
            tabledatapopulation(tableelement, fdata, tid);
        }
        else {
            localStorage.removeItem('AccordioneditObject')
        }
    }
    
    /*
     * Open table on click of More  button  in table Accordion
     */
    $scope.accordiontableload = function ($index, event) {
        localStorage.setItem('Accordiontable', true);
        localStorage.setItem('Accordiontableindex', $index);
        localStorage.removeItem('dyndnsClientEdit');
        localStorage.removeItem('formIndex')
        $scope.accordionexpandstatus($index, event);
        $scope.accordion.activePosition = $scope.accordion.activePosition == $index ? -1 : $index;
        if ($scope.accordion.activePosition >= 0) {
            var openSource = event.currentTarget.attributes['source'].value;
            var targetId = event.currentTarget.attributes['targetId'].value;
            var htmlSource = displayResult(openSource, 'makehtml');
            var finalhtml = $("#" + targetId).html(htmlSource)
            $("#" + targetId).find('div.ltq_breadcrumbs').addClass('hide');
            $compile(finalhtml)($scope);
            var tableelement = $("#" + targetId).find('table').attr('name');
            var fdata = $("#" + targetId).find('table').attr('filterdata');
            var tid = $("#" + targetId).find('table').attr('id');
            /* while creating table, to satisfy the filter need to set "tparams" value*/
            $("#dataView").find("table").map(function (i)
            {
                if ($(this).attr('objparamrelation') != undefined) {
                    localStorage.setItem($(this).attr('id') + "tparams", $(this).attr('objparamrelation').split(','));
                }
                if ($(this).attr('reqcall') != 'true')
                    $scope.tableCount.push({"id": $(this).attr('id'), "formattr": $(this).attr('name')})
            });
            tabledatapopulation(tableelement, fdata, tid);
        }
        else {
            localStorage.removeItem('AccordioneditObject')
        }
    }
    
    /*
     * Open form on click of More  button  in Accordion
     */
    $scope.accordionformdetail = function ($index, event) {
        $rootScope.initialtime=Date.now();
        var accordionchildparentrelation = event.currentTarget.attributes['childparentrelation'] != undefined ? event.currentTarget.attributes['childparentrelation'].value : undefined;
  console.log("accordionchildparentrelation",accordionchildparentrelation,event.currentTarget.attributes['objectIndex'].value)
        $scope.accordionexpandstatus($index, event);
        $scope.accordion.activePosition = $scope.accordion.activePosition == $index ? -1 : $index;
        var moreIndex = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0];
        $scope.moreIndex = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0];
        var relationIndex = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0];
		// getting the list of objects for the accordion more button form
		var ObjectsPassed = event.currentTarget.attributes['objectname'].value;
		if( accordionchildparentrelation==""){
					 localStorage.setItem('ObjectsPassed', ObjectsPassed);

		}else{
			localStorage.removeItem('ObjectsPassed');
		}
		if(localStorage.getItem('ObjectsPassed')!==null){
	
		}
        if(accordionchildparentrelation == "true"){
            moreIndex = event.currentTarget.attributes['objectIndex'].value;
            $scope.moreIndex = event.currentTarget.attributes['objectIndex'].value;
            relationIndex = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0];
        }
        var tableId = event.currentTarget.attributes['tabletoggletext'].value.replace('toggle', '')
        if ($scope[tableId + "expand" + moreIndex] == undefined)
            $scope[tableId + "expand" + moreIndex] = true;
        if ($scope.accordion.activePosition >= 0) {
            $scope[tableId + "expand" + moreIndex] = false;
            var statusFlag = event.currentTarget.attributes['objectname'].value.split(',');
            localStorage.setItem('formIndex', event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0]);
            if(accordionchildparentrelation == "true"){
                localStorage.setItem('formIndex', moreIndex);
                localStorage.setItem('accordionchildparentrelation', relationIndex);
            }
            console.log(localStorage.getItem('formIndex'));
            var openSource = event.currentTarget.attributes['source'].value;
            var targetId = event.currentTarget.attributes['targetId'].value;
            var htmlSource = displayResult(openSource, 'makehtml');
            var finalhtml = $("#" + targetId).html(htmlSource);
            $("#" + targetId).find('div.ltq_breadcrumbs').addClass('hide');
            $compile(finalhtml)($scope);
            var tableelement = $("#" + targetId).find('form').attr('name1');
		var tableelementid = $("#" + targetId).find('form').attr('id');
		var url = $("#" + targetId).find('form').attr('urlobjs');
			
            if (statusFlag[statusFlag.length - 1] != "new") {
                var applyMetadata = {};
                applyMetadata.index = event.currentTarget.attributes['objectname'].value.split(',')[0].match(/\d+/g)[0];
                applyMetadata.objects = event.currentTarget.attributes['objectname'].value;
                $scope.changedobjects.push(applyMetadata);
                localStorage.setItem('accordionObject', event.currentTarget.attributes['objectname'].value);
				$timeout(function(){
					   formdatapopulation(tableelement,tableelementid,url);
				},500);
                localStorage.removeItem('ObjectsPassed');
            }
            else {
                localStorage.removeItem('formIndex');
                localStorage.removeItem('accordionchildparentrelation');
            }
        }
        else {
            localStorage.removeItem('AccordioneditObject')
        }
    };
    /*
     * Logic To know the status of a row whether it is expanded or collapsed in a accordion
     */
    $scope.accordionexpandstatus = function ($index, event) {
        var toggletext = event.currentTarget.attributes['tabletoggletext'].value
        if($scope[toggletext] == undefined){
            $scope[toggletext] = [];
            $scope[toggletext][$index] = "More";
        }
        if (!hasPrev) {
            prevIndex = $index;
        } else {
            prevIndex = currentIndex;
        }
        currentIndex = $index;
        if (prevIndex !== $index || !hasPrev) {
            $scope[toggletext][prevIndex] = "More";
            $scope[toggletext][$index] = "Less";
        } else {
            if ($scope[toggletext][$index] === "More") {
                $scope[toggletext][$index] = "Less";
            } else {
                $scope[toggletext][$index] = "More";
            }
        }
        if (!hasPrev) {
            hasPrev = true;
        }
    }
    /*
     * Open form on click of More  button  in Accordion 
     */
    $scope.accordionparametertoggledetail = function ($index, event) {
        $scope.accordionexpandstatus($index, event);
        localStorage.setItem('accordionObject', event.currentTarget.attributes['objectname'].value)
        var reqObj = event.currentTarget.attributes['objectname'].value.replace(/\./g, "").replace(/\*/g, "") + "accordion"
        $scope[reqObj] = $scope[reqObj] == $index ? -1 : $index;
        var openSource = event.currentTarget.attributes['source'].value;
        var targetId = event.currentTarget.attributes['targetId'].value;
        if ($scope[targetId] === undefined)
            $scope[targetId] = true;
        if ($scope[targetId] && $scope[targetId]) {
            var htmlSource = displayResult(openSource, 'makehtml');
            $scope[targetId] = false;
            var finalhtml = $("#" + targetId).html(htmlSource);
             $("#" + targetId).find('div.ltq_breadcrumbs').addClass('hide');
            $compile(finalhtml)($scope);
            var tableelement = $("#" + targetId).find('form').attr('name1');
			var tableelementid = $("#" + targetId).find('form').attr('id');
            formdatapopulation(tableelement,tableelementid);
        }

    };
    /*
     *  Fill dropdown fields with values  on page loading
     */
    $scope.dropdownUrlReq = function (objectname, paramname, jsonname, dependentstatus, ddoptionstatus, ddbackendvalue, ddchildobj, ddchildparam)
    {

        if (localStorage.getItem("formMode") == "add") {
            if (ddoptionstatus == "true") {
                changedFields.push(objectname + paramname);
                if (objectname + paramname == "DeviceATMLinkDestinationAddress") {
                    $scope.nextstatus = true;
                     $scope.textChange(objectname + "__" + paramname)
                }
            }
        }
        if (jsonname.indexOf(httpService.get_url) > -1) {
            var temparray = [];
            var tempUrls = [];
            
             var getDropdownData = function (data, status, headers, config) {
                  var ifParam ='';
                 var ifValue ='';
                 var ifCondition = '';
                 var ifObject = '';
                 if(status == 200 ){
                    if(objectname == "temp"){
                         if($('#' +paramname).attr('filterdata')){
                           var filterData = $('#' +paramname).attr('filterdata');
                               ifParam = filterData.split('?')[1].split('__')[0];
                               ifValue = filterData.split('?')[1].split('__')[1];
                               ifCondition = filterData.split('?')[1].split('__')[2];
                               ifObject = filterData.split('?')[0];
                         }
                     }
                     else{
                          if($('#' + objectname+paramname).attr('filterdata')){
                           var filterData = $('#' +objectname+paramname).attr('filterdata');
                              ifParam = filterData.split('?')[1].split('__')[0];
                               ifValue = filterData.split('?')[1].split('__')[1];
                               ifCondition = filterData.split('?')[1].split('__')[2];
                              ifObject = filterData.split('?')[0];
                         }
                     }
                    var dropdowndata = data.Objects;
                    if(temparray.length < 1)
                        temparray.push({"id": "", "name": "Select"})
                    angular.forEach(dropdowndata, function (dropObject) {
                       if(ifParam !== '' && ifValue !== '' && ifCondition !== ''){
                          var isPresent = false;
                        angular.forEach(dropObject.Param, function (param) {
                              if(ifCondition == 'equalsto'){
                               if(param.ParamName == ifParam && param.ParamValue == ifValue){
                                  isPresent = true;
                               }
                                   
                           }
                        });
                        if(isPresent === true){
                              var tempObj = {};
                        if (ddbackendvalue == "instance") {
                            var objindex = dropObject.ObjName.match(/\d+/g);
                            tempObj["id"] = objindex[objindex.length - 1];
                            tempObj["name"] = dropObject.Param[0].ParamValue;
                            temparray.push(tempObj)
                        }
                        else if (ddbackendvalue == "objectname") {
                            tempObj["id"] = dropObject.ObjName;
                            tempObj["name"] = dropObject.Param[0].ParamValue;
                            temparray.push(tempObj)
                        }
                        else {
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
                           }
                          }
                          
                        }
                        else{
                        var tempObj = {};
                        if (ddbackendvalue == "instance") {
                            var objindex = dropObject.ObjName.match(/\d+/g);
                            tempObj["id"] = objindex[objindex.length - 1];
                            tempObj["name"] = dropObject.Param[0].ParamValue;
                            temparray.push(tempObj)
                        }
                        else if (ddbackendvalue == "objectname") {
                            tempObj["id"] = dropObject.ObjName;
                            tempObj["name"] = dropObject.Param[0].ParamValue;
                            temparray.push(tempObj)
                        }
                        else {
                            var dropParam =  dropObject.Param[0].ParamValue;
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
                        }
                        }
                    });
                }
            };
            
            var Urlvalues = jsonname.split(',');
            angular.forEach(Urlvalues, function(Urlvalue){
                if(Urlvalue.indexOf('?') > -1){
                    var UrlQueryvalues = Urlvalue.split('?');
                    var UrlObjectValues = UrlQueryvalues[1].split('Object=');
                    angular.forEach(UrlObjectValues, function(UrlObjectValue){
                        if(UrlObjectValue != ""){
                            tempUrls.push(httpService.getDataWithFormedURL(URL + UrlQueryvalues[0]+'?Object='+UrlObjectValue).
                                success(function (data, status, headers, config) {
                                    getDropdownData(data, status, headers, config);
                                })
                                .error(function (data, status, headers, config) {
                                })
                            );
                        }
                    });
                }else{
                    tempUrls.push(httpService.getDataWithFormedURL(URL + Urlvalue).
                        success(function (data, status, headers, config) {
                            getDropdownData(data, status, headers, config);
                        })
                        .error(function (data, status, headers, config) {
                        })
                    );
                }
            });
            
            httpService.getAllData(tempUrls).then(function(){
                $scope[paramname] = temparray;
                if ($scope[objectname] == undefined)
                    $scope[objectname] = {};
                if (ddoptionstatus == "true") {
                    $scope[objectname][paramname] = temparray[1].id;
                    if (dependentstatus == "true") {
                        var regExp = /\(([^)]+)\)/;
                        var matches = regExp.exec($("#" + paramname).attr('ng-change'));
    //                                var parameters = matches[1].split(',');
                        var parameters = matches[1].split('",');
                        console.log(parameters[0])
                        var temp = parameters[0].replace(/"/g, '')
                        var temp1 = parameters[1].replace(/"/g, '')
                        var temp2 = parameters[2].replace(/"/g, '')
                        var temp3 = parameters[3].replace(/"/g, '')
                             setTimeout(function () {
                            $scope.wizardDropdown(temp, temp1, temp2, temp3)
                        }, 2000);
                    
                    }
                }
                else {
                    if ($scope[objectname][paramname] == undefined)
                        $scope[objectname][paramname] = temparray[0].id;
                }
                $("#dataView").find("dropdown-multiselect").map(function (i)
                {
                    $scope.users = [];
                    $scope.ddvalues = temparray;
                    angular.forEach($scope.ddvalues, function (doc, dropdownIndex) {
                        if (dropdownIndex != 0)
                            $scope.users.push(doc);
                    });
                })
                if (ddchildobj != undefined && ddchildparam != undefined && ddchildobj != '' && ddchildparam != '') {
                    httpService.getFillParamData("Object=" + ddchildobj.replace('*', temparray[1].objectname.match(/\d+/g)[0]) + "&" + ddchildparam + "=").success(function (data) {
                        if ($scope[ddchildobj.replace(/\./g, "").replace(/\*/g, "")] == undefined)
                            $scope[ddchildobj.replace(/\./g, "").replace(/\*/g, "")] = {};
                        $scope[ddchildobj.replace(/\./g, "").replace(/\*/g, "")][ddchildparam] = data.Objects[0].Param[0].ParamValue;
                        $scope.ddchildobjectIndex = temparray[1].objectname.match(/\d+/g)[0];
                    })
                }
            });
            
        }
        else {
            if ($scope[paramname] == undefined) {
				var validObjects =[];
                $.getJSON(jsonname + ".json", function (data) {
					if(data.url){
						httpService.getData(URL + data.url).success(function(responseData){
							if(responseData!== undefined){
								var objectnames = [];
								angular.forEach( data[paramname], function(object){
									objectnames.push(object.id);
								});
								angular.forEach(responseData.Objects, function(object){
									validObjects.push(object.ObjName);
								});
								angular.forEach(objectnames, function(object){
									if(object !== ""){
									if(validObjects.indexOf(object) === -1){
										var index = objectnames.indexOf(object);
										data[paramname].splice(index);
									}
									}
								});
								
							}
							
						}).error(function(data){


						}); 
						
					}
                    data[paramname].unshift({"id": "", "name": "Select"});
                    $scope[paramname] = data[paramname];
					
                    if ($scope[objectname] == undefined)
                        $scope[objectname] = {};
                    if ($scope[paramname][0] != undefined && $scope[objectname][paramname] == undefined) {
                        $scope[objectname][paramname] = $scope[paramname][0].id;
                    }
                    else {
                        $scope[objectname][paramname] = $scope[objectname][paramname]
                    }
                    if (ddoptionstatus == "true") {
                        if($scope[paramname] !== undefined && $scope[paramname][1] !== undefined && $scope[paramname][1] !== null){
                          $scope[objectname][paramname] = $scope[paramname][1].id;
                        }
                    }
				 
                });
            }
            else {
                  if($scope[objectname] !== undefined && $scope[objectname][paramname] !== undefined){
                       $scope[objectname][paramname] = $scope[objectname][paramname]
                }
                else{
                    
                    
                    if ($scope[objectname] == undefined)
                        $scope[objectname] = {};
                    if ($scope[paramname][0] != undefined && $scope[objectname][paramname] == undefined) {
                        $scope[objectname][paramname] = $scope[paramname][0].id;
                    }
                }
            }
        }
    }
    $scope.jsonreq = function (paramname, jsonname) {
        $.getJSON(jsonname + ".json", function (data) {
            $scope[paramname] = data[paramname];
        });
    }
    
     
    $scope.resetValue = function(childParam, paramname, parentobject){
        if(childParam !== undefined && childParam !== ''){
            var objectParams = childParam.split('&');
            angular.forEach(objectParams, function(objectParam){
                var object = objectParam.split('?')[0];
                var params = objectParam.split('?')[1];
                angular.forEach(params.split(','), function(param){
                    if(param === paramname){
                        if($scope[object.replace(/\./g, "").replace(/\*/g, "")] === undefined){
                             $scope[object.replace(/\./g, "").replace(/\*/g, "")] = {};
                        }
                        if(parentobject !== undefined && parentobject !== ''){
                             var objectname = parentobject.split('.')[0];
                        }
                        if(objectname !== undefined && objectname !== ''){
                              var isChangedFieldPresent = false;
                              $scope[object.replace(/\./g, "").replace(/\*/g, "")][param] = $scope[objectname][paramname];
                                var changedFieldName = object.replace(/\./g,"").replace(/\*/g, "") + param; 
                                    angular.forEach(changedFields, function(changedField){
                                        if(changedField === changedFieldName)                                                 {
                                                isChangedFieldPresent = true;
                                                }
                                                                
                                        });
                                       if(isChangedFieldPresent === false){
                                           changedFields.push(object.replace(/\./g,"").replace(/\*/g, "") + param)
                                        }
                        }
                        else
                            {
                                 $scope[object.replace(/\./g, "").replace(/\*/g, "")][param] = '';
                            }
                        
                    }
                    else{
                        if($scope[object.replace(/\./g, "").replace(/\*/g, "")] !== undefined){
                            $scope[object.replace(/\./g, "").replace(/\*/g, "")][param] = '';
                        }
                        
                    }
                })
            })
        }
    }
    
    $scope.nextstatus = false;
    $scope.dropdownliclick = function (event) {
        $scope.nextstatus = true;
        var dropdownselectedvalue = (event.currentTarget.attributes['parameters'].value).split('?');
        if ($scope[dropdownselectedvalue[2]] == undefined)
            $scope[dropdownselectedvalue[2]] = {};
        $scope[dropdownselectedvalue[2]][dropdownselectedvalue[1]] = dropdownselectedvalue[0];
        $scope.wizardChange(dropdownselectedvalue[2], dropdownselectedvalue[1]);
       changedFields.push(dropdownselectedvalue[2]+dropdownselectedvalue[1]);
		if(dropdownselectedvalue[2].includes("DeviceATMLink"))
		   $scope.objectstatus.push(dropdownselectedvalue[2]);
		
		
		/*Code for Client Mode - Based on the SSID's that are selected in the dropdown
		we need to make a call to get the Object of the selected dropdown value and   
		populate it into another object(Device.X_LANTIQ_COM_ClientMode.Profile.1.Security)
		we are adding an attribute getObject in the html and in xml we are adding child and getObject
		Child is the object that will have the values populated and getObject will be the Object for which
		the get call is going to take place and those values will be assigned to Child object*/
		if(event.currentTarget.hasAttributes('getObject')){
		var getObject = event.currentTarget.getAttribute('getObject');
		}
		if(getObject !== '' && getObject !== undefined){
			var children = getObject.split('-')[0];
			var childrenwithparams = children.split('&');
			var object = getObject.split('-')[1];
            var url = "Object=" + object;
			
			httpService.getData(url).success(function(data){
			var data = data;
				angular.forEach(data.Objects, function(object){
					angular.forEach(object.Param, function(param){
						angular.forEach(childrenwithparams, function(child){
							var params = child.split('?')[1].split(',');
							angular.forEach(params, function(childparam){
								if(childparam === param.ParamName){
									if(child.replace(/\./g, '').split('?')[0] === 'temp'){
										$scope[child.replace(/\./g, '').split('?')[0]] = {};
										$scope[child.replace(/\./g, '').split('?')[0]][childparam] = '';
									}
									if($scope[child.replace(/\./g, '').split('?')[0]][childparam] !== undefined){
										changedFields.push(child.replace(/\./g, '').split('?')[0] + "" +[param.ParamName]);
										$scope[child.replace(/\./g, '').split('?')[0]][param.ParamName] = param.ParamValue;
									}
								}
							});
						});
					    
					});
						
				})
				
			}).error(function(data){
				
				
			});       			
			
		}
		
    }
    $rootScope.$on('ngDialog.opened', function (e, $dialog) {
    //      
            console.log('ngDialog opened: ' + $dialog.attr('id'));
                    openeddialogue = $dialog.attr('id');
                        });
    /*
     * To show popup on click of push button in wps page  
     */
   var openeddialogue = '';
    var dialoguestatus = true;
    var wsenable = false;
	//Modify: In Process feature changes
    var fallbackinterval = '';
    /*
     * pushbtnclick used for special button click events
     * @param {type} requesttype
     * @param {type} objects
     * @param {type} event
     * @returns {undefined}
     * calls $scope.makePost(requesttype, objects, event);
     * 
     * POST call made to DUT based on the requesttype & objects (query string)
     * directive <pushbutton/> and <parameter type="pushbutton"> invokes pushbtnclick 
     */
     $scope.pushbtnclick = function (requesttype, objects, event) {
        //Modify: In Process feature changes
        var getUrl = '';
        if(arguments.length > 3 && arguments[3] !== undefined)
            getUrl = arguments[3];
            
        $rootScope["status"] = ''; 
        if(event.currentTarget.id !== undefined && !event.currentTarget.id.includes('Scan')){
        var pushbtn = $interval(function () {
            if (openeddialogue != '') {
                openeddialogue = '';
                pushbtn_socket = new WebSocket('ws://' + IP + ':5001', 'protocol_wps_status');
                console.log("websocket created")
                pushbtn_socket.onopen = function () {
                    wsEnable = true;
                   // pushbtn_socket.send("");
                };
                pushbtn_socket.onmessage = function (message) {
                  $rootScope["status"] = "socket_Status";
                    data = JSON.parse(message.data);
                 var socket_Status = data.Status.toLowerCase();
                    $rootScope.$apply(function(){
                  //$rootScope["status"] = "socket_Status";
                  //Modify: In Process feature changes
                  $rootScope["status"] = data.Status;
                  //$rootScope["dynamic"] = data.dynamicValue;
                    });
                 if (socket_Status == "in progress" | socket_Status == "inprogress" | socket_Status == "idle") {
                 $timeout(function () {
                 console.log("executed from if block");
                 //Modify: In Process feature changes
                 //ngDialog.close();
				}, 120000)
			}
			else {
			$timeout(function () {
			console.log("executed from else block");
			ngDialog.close();
			}, 4000)
		}
          };
                pushbtn_socket.onclose = function (evt) {
                    if (wsenable == false) {
                    console.log("fall back started");
                  var socket_object = event.currentTarget.attributes['source'].value.replace(/\,$/, '').split('?')[0];
                  fallbackinterval=$interval(function () {
                                  httpService.getFillParamData("Object=" + socket_object + "&Status=").success(function (data, status, headers, config) {
                                  var responsestatus = data.Objects[0].Param[0].ParamValue.toLowerCase();
                                  //Modify: In Process feature changes
                                $rootScope["status"] = data.Objects[0].Param[0].ParamValue;
                                //$rootScope["dynamic"] = data.Objects[0].Param[1].ParamValue;
                                console.log(responsestatus);
                                //Modify: In Process feature changes
			      if (responsestatus == "inprogress" | responsestatus == "in progress" | responsestatus == "idle") {
                                $timeout(function () {
                                    //Modify: In Process feature changes
                                    //$interval.cancel(fallbackinterval);
                                console.log("executed from if block");
                                    //ngDialog.close();

                                }, 120000)
                            }
                            else {
                                    $interval.cancel(fallbackinterval);
                                $timeout(function () {
                                console.log("executed from else block");
                                    ngDialog.close();
                                }, 4000)
                            }

                                });
		     	  },4000);
               };
			}
			  //console.log("Connection is closed... Bye !");  
		      $interval.cancel(pushbtn);
            }
        }, 1000)
        }
        else
        {
            $rootScope["status"] = "Scanning in Progress...";
        }
        if(getUrl !== undefined && getUrl !== ''){
            $scope.makePost(requesttype, objects, event, getUrl);
        }
        else
         $scope.makePost(requesttype, objects, event);

    }
    //Modify: In Process feature changes
    $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        $interval.cancel(fallbackinterval);
        console.log('ngDialog closed: ' + $dialog.attr('id'));
    });

    /*
     * To put request for mentioned post of xml(if param is empty read value from webpage)
     * 
     * makePost make POST call on pushbuttonclick event
     * @param {type} requesttype
     * @param {type} objects
     * @param {type} event
     * @returns {undefined}
     * invoked by $scope.pushbtnclick(requesttype, objects, event);
     */ 
   $scope.makePost = function (requesttype, objects, event) {
         var getUrl = '';
        if(arguments.length > 3 && arguments[3] !== undefined)
            getUrl = arguments[3];
        var url = URL + requesttype + "?";
        var post = '';
        $scope["formsubmitstatus"] = true;
        $scope.makePostError = false;
        angular.forEach(objects.split(','), function (indObj) {
            indobj = indObj.split('&')
            angular.forEach(indobj, function (indobjparams, index) {
                if (index == 0 | index == 1)
                    post += indobjparams + "&";
                else {
                    if (indobjparams.split('=')[1] == ""){
                        /*
                         * To make required fileds mandatory from JS
                         * There is no validation from HTML generation (from XML).
                         * So all PUSHBUTTON based form validation are done here.
                         * In WPS page different forms with same form name 
                         * So HTML validations are failing So validation done in JS
                         */
                        var element = angular.element('[ng-model="'+ indobj[0].split('=')[1].replace(/\./g, '') + '.' + indobjparams.split('=')[0] + '"]');
                        if(indobj[0].split('=')[1].replace(/\./g, '')!= undefined && ($scope[indobj[0].split('=')[1].replace(/\./g, '')][indobjparams.split('=')[0]] == "" || $scope[indobj[0].split('=')[1].replace(/\./g, '')][indobjparams.split('=')[0]] == undefined) && (element.attr("required") != undefined || element.attr("required") == "required" || element.attr("required") == "true")){
                                 $scope[event.currentTarget.attributes['formname'].value+'_form'+"."+indobj[0].split('=')[1].replace(/\./g, '')+"_"+indobjparams.split('=')[0]+'.$error.required'] = true;
                                 $scope[event.currentTarget.attributes['formname'].value+'_form'+"."+indobj[0].split('=')[1].replace(/\./g, '')+"_"+indobjparams.split('=')[0]+'.$error.pattern'] = true;
                                 $scope.makePostError = true;
                        }
                        post += indobjparams.split('=')[0] + "=" + $sanitize($scope[indobj[0].split('=')[1].replace(/\./g, '')][indobjparams.split('=')[0]]).replace(/<[^>]+>/gm, '') + "&"
                    }
                    else
                        post += indobjparams + "&";
                }
            })
            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '') + "&"
        })
        post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
        console.log(post);
      if($scope.makePostError != true){
          $scope["formsubmitstatus"] = false;
        var sourcedata = event.currentTarget.attributes['source'] != undefined ? event.currentTarget.attributes['source'].value.replace(/(^[,\s]+)|([,\s]+$)/g, '') : undefined;
        modifyService.formdataRequest(url, post, function (response) {
            if (response.status == 200) {
                var sourceobject = sourcedata != undefined ? sourcedata.split('?')[0] : undefined;
                var sourceobjectparams = sourcedata != undefined ? sourcedata.split('?')[1].split(',') : undefined;
                if (sourceobjectparams != undefined && sourceobjectparams.length > 0 && sourceobjectparams != '') {
                    var localurl = "Object=";
                    var urltoget = localurl + sourceobject + "&";
                    angular.forEach(sourceobjectparams, function (localparam) {
                        urltoget += localparam + "=&";
                    })
                    
                    httpService.getFillParamData(urltoget).success(function (data, status, headers, config) {
                        var localformdata = data.Objects[0].Param;
                        angular.forEach(localformdata, function (dropObject) {
                            console.log("Inside::::" + sourceobject.replace(/\./g, "").replace(/\*/g, "") + "::::" + dropObject.ParamName + ":::" + dropObject.ParamValue);
                            $scope[sourceobject.replace(/\./g, "").replace(/\*/g, "")][dropObject.ParamName] = dropObject.ParamValue;
                            if(dropObject.ParamValue == "false"){
                                    $scope[sourceobject.replace(/\./g, "").replace(/\*/g, "")][dropObject.ParamName] = false;
                            }
                        })
                    })
                    
                    if(getUrl !== undefined && getUrl !== ''){
                        var dropDownValues = [];
                        var paramvalue = getUrl.split('&')[1].replace(/=/g, "");
                        $scope.dropdownUrlReq(sourceobject.replace(/\./g, "").replace(/\*/g, ""), paramvalue, getUrl);
                        ngDialog.close();
                        $rootScope["status"] = "";
                    
                    }
                }
                
                }
                 if (response.status != 200) {
                      if(ngDialog !== undefined){
                          ngDialog.close();
                      }
                      $rootScope["status"] = "";
                 }
            }
        );
      }else{
          event.preventDefault();
      }
    }
    /*
     * To cancel timer 
     */
    $scope.cancelInterval = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel($scope.startTimer);
            stop = undefined;
        }
    };
    /*
     * To show or hide carousel 
     */
    $scope.carouseldisplaystatus = function (value) {
        $scope.carouselStatus = value;
        $scope.randomvalue = $scope.randomNumber(10, 99);
    }
    /*
     * To track changes of text box in form
     */
    $scope.initialstatus = false;
    $scope.textChange = function (objectname, modelvalue) {
        var objwithpar = objectname.split('__');
        if ($scope[objwithpar[0]] == undefined) {
            $scope[objwithpar[0]] = {};
        }
        if (modelvalue != undefined) {
            $scope[objwithpar[0]][objwithpar[1]] = modelvalue;
        }
        if (changedFields.indexOf(objectname) < 0) {
            changedFields.push(objwithpar[0] + objwithpar[1]);
        }
        else {
            var fieldindex = changedFields.indexOf(objwithpar[0] + objwithpar[1]);
            if (fieldindex > -1 && $scope[objwithpar[0]][objwithpar[1]] == '')
                changedFields.splice(fieldindex, 1)
        }
        objectname = objwithpar[0] + objwithpar[1];
        if (objectname == "DeviceATMLinkDestinationAddress") {
            $('#ajaxdataLoaderSection').show();
            if ($scope.initialstatus)
                $scope["modestatus"] = true;
            else
                $scope["modestatus"] = false;
            $scope.initialstatus = true;
            var elem = [];
            var ProtoElems = $("div[child='ATM-modes']").find('div.ng-hide input')
            angular.forEach(ProtoElems, function (protoElem) {
                elem.push(protoElem);
            });
            if($scope["temp"]["Protos"] != undefined && $scope["temp"]["Protos"].toLowerCase().indexOf('bridge') > -1){
                ProtoElems = $("div[child='ATM-Bridge']").find('div.ng-hide input');
                angular.forEach(ProtoElems, function (protoElem) {
                    elem.push(protoElem);
                });
            }else{
                ProtoElems = $("div[child='" + $scope.carouselselectedvalue + "']").find('div.ng-hide input');
                angular.forEach(ProtoElems, function (protoElem) {
                    elem.push(protoElem);
                });
            }
            
            if ($scope.nextstatus) {
                elem.splice(0, 3)
                $scope.nextstatus = false;
            }
            console.log(elem);
            angular.forEach(elem, function (el) {
                var dataobj = {};
                for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                    att = atts[i];
                    if (att.nodeName == "ng-model") {
                        var attrvalue = att.nodeValue.split('.');
                        dataobj.objectname = attrvalue[0]
                        dataobj.paramname = attrvalue[1]

                    }
                    if (att.nodeName == "value") {
                        var attrvalue = att.nodeValue;
                        dataobj.value = attrvalue
                    }

                }
                if ($scope[dataobj.objectname] == undefined) {
                    $scope[dataobj.objectname] = {};
                }
                if (dataobj.value.indexOf('.*') > -1) {
                    
                    var dataValue = dataobj.value.split('.*')
                    if (dataValue[1] != "" && dataobj.value.indexOf('Device.Bridging.Bridge') == -1) {
                        dataValue[1] = dataValue[1].replace(/[^A-Z0-9_-]/ig, "");
                        var url = "Object=" + dataValue[0] + "." + $scope.ddobject[dataValue[0]] + "&" + dataValue[1] + "="
                         $('#ajaxdataLoaderSection').show();
                        httpService.getFillParamData(url).
                                success(function (data, status, headers, config) {
                                    var dropdowndata = data.Objects;
                                    angular.forEach(dropdowndata, function (dropObject) {
                                        $scope[dataobj.objectname][dataobj.paramname] = dropObject.Param[0].ParamValue;
                                        $('#ajaxdataLoaderSection').hide();
                                    })
                                })
                                .error(function (data, status, headers, config) {
                                    $('#ajaxdataLoaderSection').hide();
                                });
                    }
                    function ATMLink(reqparam) {
                        $('#ajaxdataLoaderSection').hide();
                        httpService.getData("Object=" + reqparam).
                                success(function (data) {
                                    if (!(data.hasOwnProperty('status'))) {
                                        var atmobjects = ['Device.ATM.Link', 'Device.ATM.Link.*.QoS']
                                        angular.forEach(data.Objects, function (atmobj) {
                                            if (atmobjects.indexOf(modifyService.dotstarremove(atmobj.ObjName, '.*').replace(/\./g, "").replace(/\*/g, ""))) {
                                                var dataobject = atmobj.Param;
                                                var dataobjectname = modifyService.dotstarremove(atmobj.ObjName, '.*').replace(/\./g, "").replace(/\*/g, "");
                                                angular.forEach(dataobject, function (param) {
                                                    if ($scope[dataobjectname] == undefined)
                                                        $scope[dataobjectname] = {};
//                                                if (param.ParamName == "Encapsulation") {
                                                    /*To form ATM related params (Lowerlayer also)*/ 
                                                    $scope[dataobjectname][param.ParamName] = param.ParamValue
                                                    $('#ajaxdataLoaderSection').hide();
//                                                }
                                                })
                                            }

                                        })

                                    }
                                })
                                .error(function (data, status, headers, config) {
                                   $('#ajaxdataLoaderSection').hide();
                                });
                    }
                    if ($scope.ddobject[dataValue[0]] != undefined && dataValue[0] == "Device.ATM.Link") {
                        $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]]
                        ATMLink("Device.ATM.Link." + $scope.ddobject[dataValue[0]]);
                        $scope.ddobject[dataValue[0]] = undefined;
                    }

                    else {
                        var bridgeChecker1 = dataobj.value.indexOf('.*');
                        var bridgeChecker2 = dataobj.value.indexOf('Device.Bridging.Bridge');
                        console.log(bridgeChecker1,bridgeChecker2,"bridgeChecker1")
                        if(bridgeChecker1 > 1 && bridgeChecker2 > -1){
                            console.log("In BRIDGE");
                            if($scope.presentAlias)
                                    $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]] + dataValue[1] + '.' + $scope.presentAlias ;
                            console.log("bridge",dataobj.value,$scope[dataobj.objectname][dataobj.paramname],dataobj.objectname,dataobj.paramname);  
                        }else{
                            $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.presentAlias
                            console.log("$scope[objectname][paramname]",dataobj.objectname,dataobj.paramname,$scope[dataobj.objectname][dataobj.paramname]);
                            
                        }                        
                        var destinationaddressstatus = false;
                        angular.forEach($scope["DestinationAddress"], function (dataobj) {
                            if (dataobj.id != "" && dataobj.id == $scope["DeviceATMLink"]["DestinationAddress"])
                                destinationaddressstatus = true;
                        });
                        if (destinationaddressstatus == true && dataValue[0] == "Device.ATM.Link") {
                             $('#ajaxdataLoaderSection').show();
                            httpService.getFillParamData("Object=Device.ATM.Link&DestinationAddress=" + $scope["DeviceATMLink"]["DestinationAddress"]).
                                    success(function (data) {
                                        if (!(data.hasOwnProperty('status'))) {
                                            var reqobjectname = data.Objects[0].ObjName;
                                            /* ATM index copying in scope stack $scope.ddobject*/
                                            $scope.ddobject[dataValue[0] + "index"] = reqobjectname.match(/\d+/g)[0];
//                                            $scope["DeviceEthernetLink"]["LowerLayers"] = "Device.ATM.Link." + reqobjectname.match(/\d+/g)[0]
                                            $scope[dataobj.objectname][dataobj.paramname] = "Device.ATM.Link." + reqobjectname.match(/\d+/g)[0];
                                             $('#ajaxdataLoaderSection').show();
                                            ATMLink(reqobjectname)
                                        }
                                        $scope["modestatus"] = false;
                                    }).
                                    error(function (data) {
                                         $('#ajaxdataLoaderSection').show();
                                        $scope["modestatus"] = true;
                                    })

                        }
                        else {
                            $scope["modestatus"] = true;
                        }

                    }
                }
                else {
                    if (["Alias", "LowerLayers"].indexOf(dataobj.paramname) > -1) {
                        if (["Alias"].indexOf(dataobj.paramname) == 0) {
                            if ($scope.presentAlias != '')
                                $scope.presentAlias = $scope.previousAlias;
                            else
                                $scope.presentAlias = "changed"
                            
                            //If alias value have '*'
                            if(dataobj.value.indexOf('*')>-1){
                                angular.forEach($scope.ddobject,function(val,key){
                                    if(key.toLowerCase().replace('./g','').indexOf('bridge') > -1){
                                        dataobj.value = dataobj.value.replace('*',$scope.ddobject[key]);
                                    }
                                });
                            }
                            $scope.previousAlias = dataobj.value + $scope.randomvalue;
                        }
                        $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                    }
                    else {
                        $scope[dataobj.objectname][dataobj.paramname] = dataobj.value
                    }
                }
                changedFields.push(dataobj.objectname + "" + dataobj.paramname)

            })
            $('#ajaxdataLoaderSection').hide();
        }
        if (objectname == "DeviceEthernetVLANTerminationVLANID") {
            var elem = $("div[child='common']").find('div.ng-hide input');
            if (modelvalue == '') {
                if ($scope.initialAlias != undefined) {
                    $scope.vlanidstatus = false;
                    if ($scope["temp"]["Protos"].toLowerCase().indexOf('bridge') > -1)
                        $scope.presentAlias = $scope.initialAlias;
                    else
                        $scope.previousAlias = $scope.initialAlias;

                }
                $scope["DeviceEthernetVLANTermination"] = undefined;

            }
            else {
                console.log("fghjkl from else block")
                angular.forEach(elem, function (el) {
                    var dataobj = {};
                    for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                        att = atts[i];
                        if (att.nodeName == "ng-model") {
                            var attrvalue = att.nodeValue.split('.');
                            dataobj.objectname = attrvalue[0]
                            dataobj.paramname = attrvalue[1]

                        }
                        if (att.nodeName == "value") {
                            var attrvalue = att.nodeValue;
                            dataobj.value = attrvalue
                        }

                    }
                    if ($scope[dataobj.objectname] == undefined) {
                        $scope[dataobj.objectname] = {};
                    }
                    if (dataobj.value.indexOf('.*') > -1) {
                        var dataValue = dataobj.value.split('.*')
                        if (dataValue[1] != "") {
                            dataValue[1] = dataValue[1].replace(/[^A-Z0-9_-]/ig, "");
                            var url = "?Object=" + dataValue[0] + "." + $scope.ddobject[dataValue[0]] + "&" + dataValue[1] + "="
                            httpService.getFillParamData(url).
                                    success(function (data, status, headers, config) {
                                        var dropdowndata = data.Objects;
                                        angular.forEach(dropdowndata, function (dropObject) {
                                            $scope[dataobj.objectname][dataobj.paramname] = dropObject.Param[0].ParamValue;
                                        })
                                    })
                                    .error(function (data, status, headers, config) {

                                    });
                        }
                        if ($scope.ddobject[dataValue[0]] != undefined)
                            $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]]
                        else
                            $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.presentAlias
                    }
                    else {
                        if (["Alias", "LowerLayers"].indexOf(dataobj.paramname) > -1) {
                            if (["Alias"].indexOf(dataobj.paramname) == 0) {
                                if ($scope.vlan_check == '')
                                    $scope.vlan_check = $scope.presentAlias;
                                if ($scope.presentAlias != '')
                                    $scope.presentAlias = $scope.previousAlias;
                                else
                                    $scope.presentAlias = "changed"
                                $scope.previousAlias = dataobj.value + $scope.randomvalue;
                            }
                            if (modelvalue != '') {
                                $scope.initialAlias = $scope.presentAlias;
                            }
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                        }
                        else {
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value
                        }
                    }
                    console.log(modelvalue)
                    if (modelvalue == '') {
                        var fieldindex = changedFields.indexOf(dataobj.objectname + "" + dataobj.paramname);
                        if (fieldindex > -1)
                            changedFields.splice(fieldindex, 1)
                    }
                    else
                        changedFields.push(dataobj.objectname + "" + dataobj.paramname)

                })
            }
        }
    }
    $scope.wizardChange = function (objectname, paramname) {
        modelValue = $scope[objectname][paramname]
        if ($scope[paramname] != undefined) {
            angular.forEach($scope[paramname], function (obj) {
                if (obj.name == modelValue) {
                    var str = obj.objectname;
                    var rest = str.substring(0, str.lastIndexOf("."));
                    var last = str.substring(str.lastIndexOf(".") + 1, str.length);
                    $scope.ddobject[rest] = last;
                    $scope.ddobject[rest + "index"] = last;
                }
            })
        }
        if (objectname + paramname == "DeviceATMLinkDestinationAddress")
            $scope.textChange(objectname + "__" + paramname)
//        changedFields.push(objectname + paramname);
    }
    /*
     * To reload the page
     */
    $scope.reset = function () {
        $rootScope.initialtime=Date.now();
        $route.reload();
    }
    /*
     * To open form from table list in edit or add mode
     */
   $scope.formToOpen = function (param) {
        if(localStorage.getItem('internetEdit') !== undefined && localStorage.getItem('internetEdit') !== null){
           localStorage.removeItem('internetEdit')
        }
        localStorage.setItem('randomvalue', $scope.randomNumber(10, 99));
        localStorage.setItem('formMode', "add");
        if(param !== null && param !== undefined){
            httpService.checkFileExists(param, 'tableform').success(function(responseData){
                   if(responseData !== ""){
                        $location.path("/tableform/" + param);
                    }
                    else{

                    }
            }).error(function(error){

            });
        }
        
    }

 
    $scope.clientModeModalToOpen = function (formname) {
            $rootScope.initialtime=Date.now();
           ngDialog.openConfirm({
                template: formname + '.html',
                className: 'ngdialog-theme-default custom-width-600'
            }).then(function (value) {
                console.log(value);
            }, function (reason, data) {
                if(reason === "OK"){
                  $scope.selectedItem = clientModeService.getObject();
                  if($scope.DeviceX_LANTIQ_COM_ClientModeProfile1 !== undefined){
					    changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile1SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile1.SSID = $scope.selectedItem.SSID;
					    changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile1SecurityModeEnabled');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile1Security.ModeEnabled = $scope.selectedItem.ModeEnabled;
					    changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile1SecurityWEPKey');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile1Security.WEPKey = $scope.selectedItem.WEPKey;
					    changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile1SecurityKeyPassphrase');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile1Security.KeyPassphrase = $scope.selectedItem.KeyPassphrase;
                    }
					if($scope.DeviceX_LANTIQ_COM_ClientModeRule1 !== undefined){
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeRule1SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeRule1.SSID = $scope.selectedItem.SSID;
                       
                    }
					if($scope.DeviceX_LANTIQ_COM_ClientModeRule2 !== undefined){
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeRule2SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeRule2.SSID = $scope.selectedItem.SSID;
                       
                    }
					if($scope.DeviceX_LANTIQ_COM_ClientModeRule4 !== undefined){
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeRule4SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeRule4.SSID = $scope.selectedItem.SSID;
                       
                    }
					if($scope.DeviceX_LANTIQ_COM_ClientModeRule3 !== undefined){
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeRule3SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeRule3.SSID = $scope.selectedItem.SSID;
                       
                    }
					if($scope.DeviceX_LANTIQ_COM_ClientModeProfile2 !== undefined){
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile2SSID');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile2.SSID = $scope.selectedItem.SSID;
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile2SecurityModeEnabled');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile2Security.ModeEnabled = $scope.selectedItem.ModeEnabled;
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile2SecurityWEPKey');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile2Security.WEPKey = $scope.selectedItem.WEPKey;
						changedFields.push('DeviceX_LANTIQ_COM_ClientModeProfile2SecurityKeyPassphrase');
                        $scope.DeviceX_LANTIQ_COM_ClientModeProfile2Security.KeyPassphrase = $scope.selectedItem.KeyPassphrase;
                     }
				}
			   else{
				  $('#ajaxLoaderSection').hide();
				  $('#ajaxLoaderSection').hide();
			   }
            });
    }
    
    
    $scope.openWispScanResultsModal = function (formname) {
            ngDialog.openConfirm({
                template: formname + '.html',
                className: 'ngdialog-theme-default custom-width-600'
            }).then(function (value) {
                console.log(value);
            }, function (reason, data) {
                if(reason === "OK"){
                  $scope.selectedItem = clientModeService.getObject();
					if($scope.DeviceX_INTEL_COM_WISPProfile1 !== undefined){
					    changedFields.push('DeviceX_INTEL_COM_WISPProfile1SSID');
					    $scope.DeviceX_INTEL_COM_WISPProfile1.SSID = $scope.selectedItem.SSID;
					    changedFields.push('DeviceX_INTEL_COM_WISPProfile1SecurityModeEnabled');
                        $scope.DeviceX_INTEL_COM_WISPProfile1Security.ModeEnabled = $scope.selectedItem.ModeEnabled;
					    changedFields.push('DeviceX_INTEL_COM_WISPProfile1SecurityWEPKey');
                        $scope.DeviceX_INTEL_COM_WISPProfile1Security.WEPKey = $scope.selectedItem.WEPKey;
					    changedFields.push('DeviceX_INTEL_COM_WISPProfile1SecurityKeyPassphrase');
                        $scope.DeviceX_INTEL_COM_WISPProfile1Security.KeyPassphrase = $scope.selectedItem.KeyPassphrase;
                     
                    }
					if($scope.DeviceX_INTEL_COM_WISPProfile2 !== undefined){
						changedFields.push('DeviceX_INTEL_COM_WISPProfile2SSID');
                        $scope.DeviceX_INTEL_COM_WISPProfile2.SSID = $scope.selectedItem.SSID;
						changedFields.push('DeviceX_INTEL_COM_WISPProfile2SecurityModeEnabled');
                        $scope.DeviceX_INTEL_COM_WISPProfile2Security.ModeEnabled = $scope.selectedItem.ModeEnabled;
						changedFields.push('DeviceX_INTEL_COM_WISPProfile2SecurityWEPKey');
                        $scope.DeviceX_INTEL_COM_WISPProfile2Security.WEPKey = $scope.selectedItem.WEPKey;
						changedFields.push('DeviceX_INTEL_COM_WISPProfile2SecurityKeyPassphrase');
                        $scope.DeviceX_INTEL_COM_WISPProfile2Security.KeyPassphrase = $scope.selectedItem.KeyPassphrase;
                     }
				}
			   else{
				  $('#ajaxLoaderSection').hide();
				  $('#ajaxLoaderSection').hide();
			   }
            });
              

    }
    
    $scope.noOfForms = [];
    $("#dataView").find("form").map(function (i)
    {
        if ($(this).attr('id') != undefined)
            $scope.noOfForms.push({"formattr": $(this).attr('name1'), "id": $(this).attr('id'), "urlobjs": $(this).attr('urlobjs')})
    })
    $scope.noOfForms.forEach(function (formobject) {
        var forid = formobject.id;
         /**
         *  If onload ="false" then loadstatus value will be false.
         *  Default data won't work
         *  Data load control be parent object
         * 
         **/
        if (formobject != undefined && $("#" + forid).attr('loadstatus') != "false") {
           setTimeout(function () {
                formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs)
         }, 1000)

        }
        if ($("#" + forid).attr('polling')) {
			var pollingfunction=function () {
                formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs)
            }
			function properPolling(){
				tabletimeoutarray.push($timeout(pollingfunction).then(tabletimeoutrepeatarray.push($timeout((properPolling),$("#" + forid).attr('interval')))
                ));
				
                
			}
           properPolling();
			
        }

    })
    /*
     * 
     * To modify the row in a table
     */
    $scope.editableApply = function (data, componentid) {
        var d = $q.defer();
        $('#ajaxLoaderSection').show();
        var reqobjects = data.z.split(',');
        
        var post = '';
        angular.forEach(reqobjects, function (doc1) {
            post += "Object=" + doc1 + "&Operation=Modify"
            angular.forEach($scope[doc1], function (value, key) {
                post += "&" + key + "=" + encodeURIComponent(value) + "";
            })
            post += "&";
        })
        post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '')
//        modifyService.setRequest(url, post,componentid)

        var formname = componentid;
        httpService.setData(post).
                success(function (data, status, headers, config) {
                    localStorage.removeItem('multistatus');
                    localStorage.removeItem('multistatusmessage')
                    $('#ajaxLoaderSection').hide();
                    if (status == 200) {
                        delete data.z
                        $route.reload();
                    }
                    else if (status == 203) {
                        $scope[formname + "popup"] = true;
                        $scope[formname + "popupval"] = data.Objects[0].Param[0].ParamValue
                        data = {status: "error", msg: "error"};
                        d.resolve(data.msg)
                    }
                    else if (status == 206) {
                        $scope[formname + "popup"] = true;
                        var popupmessage = '';
                        angular.forEach(data.Objects, function (object) {
                            angular.forEach(object.Param, function (param) {
                                popupmessage += param.ParamName + ":" + param.ParamValue + '<br>';
                            })
                        })
                        $scope[formname + "popupval"] = popupmessage;
                        data = {status: "error", msg: "Error "};
                        d.resolve(data.msg)
                    }
                    else if (status == 207) {
                        localStorage.setItem('multistatus', true);
                        localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue)
                        $route.reload();
                    }
                }).
                error(function (data, status, headers, config) {
//                    $('#ajaxLoaderSection').hide();
                });
        return d.promise;
    }
    $scope.tablePlusAddStatus = false;
    /*
     * To show or hide form for creating a new row in a table
     */
    $scope.editabletableformdisplaystatus = function (dataobject, accordionobject) {
        $scope[dataobject] = true;
        if (accordionobject == undefined)
            ;
        else {
            angular.forEach(accordionobject.split(','), function (trobject) {
                $scope[trobject.replace(/\./g, "").replace(/\*/g, "")] = {};
            })
        }
    }
    /*
     * To close the opened form in table  
     */
    $scope.rowcancel = function (dataobject) {
        $scope.open = false;
        $scope[dataobject] = false;
    }
    $scope.tableCount = [];
    /*To fill the form Fields */
    function formdatapopulation(componentdata, formid, urlobjs) {
       if (localStorage.getItem('formMode') == 'add') {

        }
        else {
            /* internet edit */
            if (localStorage.getItem('internetEdit')) {
                formedit(componentdata, formid, urlobjs);
            }
            else {
                var editObject = localStorageService.get('hybrideditObject');
                $scope[formid + "Id"] = [];
                var urlobjarray = [];
                var urlobjpairarray = [];
                if (urlobjs != undefined) {
                    urlobjs = urlobjs.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
                    angular.forEach(urlobjs, function (urlobj) {
                        var urlobjObjects = {}
                        urlobjarray.push(urlobj.split(':')[0])
                        urlobjObjects[urlobj.split(':')[0]] = urlobj.split(':')[1];
                        urlobjpairarray.push(urlobjObjects);
                    })
                }
                
                if (componentdata != "") {
                    var objectUrl = URL + httpService.get_url + '?';
                    var objectname = '';
                    var PostObjectjsonName = '';
                    var parameterlist = '';
                    if (editObject != null) {
                        // $("#Add").attr('value', 'Modify')
                        $("#Add").attr('id', 'Modify')
                        var tableObjectdata = modifyService.objectData(componentdata);
                    }
                    else
                        var tableObjectdata = modifyService.objectData(componentdata)
                    localStorage.setItem('pushbuttonformIndex',localStorage.getItem('formIndex'));
                    localStorage.removeItem('formIndex');
                    localStorage.removeItem('accordionchildparentrelation');
                    localStorage.setItem('AccordioneditObject', tableObjectdata.postObjectjsonName);
                    var formObject = tableObjectdata.postObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
                    parameterlist = tableObjectdata.parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                    formObject = modifyService.unique(formObject);
                    var position = formObject.indexOf('temp')
                    if (position > -1)
                        formObject.splice(position, 1);
                    var tempArray = [];
                    var objBeforeUnique = angular.copy(formObject);
                    objBeforeUnique = modifyService.unique(objBeforeUnique);
                    if (urlobjarray.length > 0) {
                        angular.forEach(urlobjarray, function (delobj) {
                            var index = formObject.indexOf(delobj);
                            formObject.splice(index, 1)
                        })
                        formObject = modifyService.split(formObject)
                    }
                    else
                        formObject = modifyService.split(formObject)
                    formObject.forEach(function (object) {
                        objectname += "Object=" + object.split('.*')[0] + ",";
                    });
                    var urlarray = [];
                    angular.forEach(urlobjpairarray, function (obj) {
                        urlarray.push($http.get(URL + obj[Object.keys(obj)[0]]))
                    })
                    objBeforeUnique.forEach(function (object) {
                        var digitTostar = object;
                        tempArray.push(digitTostar);
                    });
                     if (objectname != "") {
                        //var url = objectUrl + "" + objectname.replace(/(^[,\s]+)|([,\s]+$)/g, '');
						angular.forEach(objectname.split(','), function(object){
							if(object !== undefined && object !== ''){
								var url = objectUrl + "" + object.replace(/(^[,\s]+)|([,\s]+$)/g, '');
								urlarray.push($http.get(url));
							}
						})
                        
                    }
                    
                    $('#ajaxdataLoaderSection').show();
                    httpService.getAllData(urlarray).then(function(responsearray){
                        $('#ajaxdataLoaderSection').show();
                        var respstatus, respdata;
                        angular.forEach(responsearray, function (response) {
                            respstatus = response.status;
                            respdata = response.data;
                            if (response.status == 200)
                                $scope[formid + "Id"] = $scope[formid + "Id"].concat(response.data.Objects)
                        })

                        if (respstatus == 200) {
							objectLevelSuccessForForm(urlarray, formid, parameterlist, objBeforeUnique, tempArray);
                        }
                        else if (respstatus == 206) {
                            parameterLevelFailue(respdata);
                        }
                        else if (respstatus == 203) {
                            objectLevelFailure(formid);
                        }
                       $('#ajaxdataLoaderSection').hide();
                       if($('form').attr('polling')){
                        if( $rootScope.pollCounterReset>0 )  {
                            $rootScope.fetchSpeed=(Date.now()-$rootScope.initialtime)/1000;
                            $rootScope.pollCounterReset--;
                        }
                       } else {
                        $rootScope.fetchSpeed=(Date.now()- $rootScope.initialtime)/1000;

                       }
					  });
                    
                    
					}
                }

        }

    }

    
    var parameterLevelFailue = function($scope, respdata, formid){
       if (respdata.Objects.length < 2 && respdata.Objects[0].Param.length < 2) {
                                $scope[formid + "popup"] = true;
//                                $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                                $scope[formid + "popupval"] = "one object with one param"
                            }
                            else {
                                angular.forEach(respdata.Objects, function (object) {
                                    var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "")
                                    angular.forEach(object.Param, function (param) {
                                        if (param.ParamId == "-1") {
                                            $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                            $scope[respobject + "_" + param.ParamName + "val"] = "!Error";
                                        }
                                    })
                                })
                            }
   }
   
   var objectLevelFailure = function($scope, formid){
       $scope[formid + "popup"] = true;
       $scope[formid + "popupval"] = "Object level failure for form"
   }
   
   var objectLevelSuccessForForm = function(urlarray, formid, parameterlist, objBeforeUnique, tempArray){
                  var lanvalues = [];
                  var objects = $scope[formid + "Id"];
                            var postjsonArray = [];
                            parameterlist = parameterlist.split(',');
                            angular.forEach(objBeforeUnique, function (element) {
                                var element1 = element.replace(/[^a-zA-Z0-9_-]/g, '')
                                if ($scope[element1] == undefined)
                                    $scope[element1] = {};
                            });
                            for (var i = 0; i < objects.length; i++) {
								if(objects[i] != undefined){
									
								
                                var objectname = objects[i].ObjName;
									
                                if (tempArray.indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')) > -1) {
                                    var tempObject = {}
                                    tempObject.Objname = objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '');
                                    tempObjectParams = objects[i].Param;
                                    for (var j = 0; j < tempObjectParams.length; j++) {
                                        tempObject[tempObjectParams[j].ParamName] = tempObjectParams[j].ParamValue
                                    }
                                    postjsonArray.push(tempObject)
                                }
                            }}
                            angular.forEach(postjsonArray, function (objectArray, objindex) {
                                angular.forEach(parameterlist, function (element) {
                                    var formelement = element.split('?');
									  if (formelement[0] == objectArray.Objname) {
                                        if ($scope[formelement[1]] != undefined && $scope[formelement[1]].constructor == Object) {
                                            if ($scope[formelement[1]][objectArray[formelement[1]]] != undefined && Object.keys($scope[formelement[1]][objectArray[formelement[1]]]).length > 2) {
                                                $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = $scope[formelement[1]][objectArray[formelement[1]]]
                                            }
                                            else {
                                                $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = objectArray[formelement[1]]
                                            }
                                        }
                                        else {
                                            var element = angular.element('[ng-model="'+ formelement[0].replace(/[^a-zA-Z0-9_-]/g, '') + '.' + formelement[1] + '"]');
										    if (objectArray[formelement[1]] == 'true' && (element == undefined || element[0] == undefined || element[0].type != "select-one") ) {
                                                $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = true
                                                if (formelement[1] == "IEEE80211hEnabled")
                                                    $scope.dropdownUrlReq(formelement[0].replace(/\./g, "").replace(/\*/g, ""), "RegulatoryDomain", "countries5ieee", "false", "", "");
                                            }
                                            else if (objectArray[formelement[1]] == 'false' && (element == undefined || element[0] == undefined || element[0].type != "select-one") ) {
                                                $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = false
                                            }
                                            else {
                                                setDropDownData(formelement, element, objectArray);
                                            }
                                        }
                                        if ((objectArray.Objname == "Device.DHCPv4.Server.Pool.1") | ((objectArray.Objname == "Device.DHCPv4.Relay.Forwarding.1"))) {
                                            if (formelement[1] = "Enable") {
                                                lanvalues.push(objectArray[formelement[1]]);
                                            }
                                        }
                                    }
                                });
                            })
				            $scope[formid.replace('_form', '') + "loadingstatus"] = true;
                            if (parameterlist.indexOf('temp?DHCPMode') > -1) {
                                $scope['temp'] = {};
                                if (lanvalues[0] == "1")
                                    $scope['temp'].DHCPMode = "Server";
                                else if (lanvalues[5] == "1") {
                                    $scope['temp'].DHCPMode = "Relay";
                                }
                                else {
                                    $scope['temp'].DHCPMode = "Disable";
                                }
                            }
                          
   						 customCodeForEnableApplyButton();
   }
    
 
   var setDropDownData = function(formelement, element, objectArray){
       if ($scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] == undefined || $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] == ""){
                                                  if(element != undefined && element[0] != undefined && element[0].type == "select-one"){
                                                        if($scope[formelement[1]] != undefined && $scope[formelement[1]].length === 1 && $scope[formelement[1]][0].name === "Select"){
														}
                                                        else
                                                        {
                                                             $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = objectArray[formelement[1]];
                                                        }
                                                        if($scope[formelement[1]] == undefined || $scope[formelement[1]].length < 0){
                                                            for(var loop=0,loopcount=100; loop <=loopcount && ($scope[formelement[1]] == undefined || $scope[formelement[1]].length < 0); loop++)   { 
                                                                setTimeout(function () {
                                                                    console.log("Drop down fill data recieved from server");
                                                                    $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = objectArray[formelement[1]];
                                                                }, loop*10);
                                                            }
                                                            console.log("Drop down fill data not recieved from server");
                                                        }
                                                    }else{
                                                        $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = objectArray[formelement[1]]
                                                    }                                                    
                                                }                                                    
                                                else {
                                                    var dirtycheckindex = changedFields.indexOf(formelement[0].replace(/[^a-zA-Z0-9_-]/g, '') + "" + formelement[1]);
                                                    if (dirtycheckindex >= 0)
                                                        $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]];
                                                    else
                                                        $scope[formelement[0].replace(/[^a-zA-Z0-9_-]/g, '')][formelement[1]] = objectArray[formelement[1]]
                                                }
   } 

    $scope.ddobject = {};
    /*
     * function wizardDropdown
     * called on value change in dropdown, available on ng-change filed.
     * @objectname       parent object name after removing * & index
     * @paramname        current field name
     * @childcomponents  child elements configured in XML doc
     * @childparam       childparam elements configured in XML doc
     * 
     * Edits:
     * Changes made for implement, multiple params configuring in child and childparam fields in XML dropdown
     */
    $scope.wizardDropdown = function (objectname, paramname, childcomponents, childparam) {
        changedFields.push(objectname + paramname);
        var childElements = childcomponents.replace(/\./g, "").replace(/\*/g, "").replace(/\,/g, "");
        var modelValue = $scope[objectname][paramname];
        $scope.carouselselectedvalue = $scope[objectname][paramname];
        if ($scope[paramname] != undefined) {
            angular.forEach($scope[paramname], function (obj) {
                if (obj.name == modelValue) {
                    var str = obj.objectname;
                    if(!(objectname == "temp" && (paramname.toLowerCase().indexOf("bridges")>-1 || paramname.toLowerCase().indexOf("protos")>-1))){
                        $scope.dropdownMouseoverstatus = true;
                    }
                    if(str != undefined){
                        if (childparam != "")
                            $scope[childparam + "Index"] = str.match(/\d+/g)[0];
                        var rest = str.substring(0, str.lastIndexOf("."));
                        var last = str.substring(str.lastIndexOf(".") + 1, str.length);
                        /* All dropdown index object */
                        $scope.ddobject[rest] = last;
                        var dropdownIndex = str.match(/\d+/g)[0];
                        $rootScope.gwdropdownIndex=str.match(/\d+/g)[0];

						if(localStorage.getItem("xml") === "hotspot_configuration" || 
						 localStorage.getItem("xml") === "hotspot_wanmetrics" || 
						  localStorage.getItem("xml") === "hotspot_roamingconsortium" ||
						  localStorage.getItem("xml") === "hotspot_connectioncapability" ||
						   localStorage.getItem("xml") === "hotspot_nairealm" ||
						   localStorage.getItem("xml") === "hotspot_osuicons" ||
						   localStorage.getItem("xml") === "hotspot_l2firewall" ||
						   localStorage.getItem("xml") === "adv5_hotspot_configuration" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_configuration" ||
						   localStorage.getItem("xml") === "adv5_hotspot_roamingconsortium" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_roamingconsortium" ||
						   localStorage.getItem("xml") === "adv5_hotspot_connectioncapability" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_connectioncapability" ||
						   localStorage.getItem("xml") === "adv5_hotspot_nairealm" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_nairealm" ||
						   localStorage.getItem("xml") === "adv5_hotspot_wanmetrics" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_osuicons" ||
						   localStorage.getItem("xml") === "adv5_hotspot_l2firewall" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_l2firewall" ||
						   localStorage.getItem("xml") === "adv5_macFiltering" ||
						   localStorage.getItem("xml") === "adv5_2_macFiltering" ||
						   localStorage.getItem("xml") === "adv_macFiltering" ||
                           localStorage.getItem("xml") === "adv5_statistics" ||
                           localStorage.getItem("xml") === "adv_statistics" ||
                           localStorage.getItem("xml") === "adv5_2_statistics" ){
						    $('#ajaxdataLoaderSection').show();

							var url = "Object=Device.WiFi.AccessPoint&SSIDReference="+str;

                                httpService.getData(url).
                                    success(function (data, status, headers, config) {
                                     var dropdowndata = data.Objects[0].ObjName;
									var dropdownIndex=dropdowndata.match(/\d+/g)[0];
									if(localStorage.getItem("xml") === "hotspot_configuration"||
									   localStorage.getItem("xml") === "adv5_hotspot_configuration" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_configuration" 
									  ){
									var url2="Object=Device.WiFi.AccessPoint."+dropdownIndex+".Security";
									  httpService.getData(url2).success(function(){
										 // alert("success");
										  $scope[childElements + "dropdownIndex"] =dropdownIndex; 							  $scope[objectname + "dropdownIndex"] = dropdownIndex;
										 //childcomponentssubfunction(childcomponents,childparam);

									  })
									}
									 $timeout(function () {
										 $scope[objectname + "dropdownIndex"] = 							  $scope[objectname + "dropdownIndex"] = dropdownIndex;

                        $scope[childElements + "dropdownIndex"] =dropdownIndex; 							  $scope[objectname + "dropdownIndex"] = dropdownIndex;

									}).then( function(){
										
											childcomponentssubfunction(childcomponents,childparam);
										 	$('#ajaxdataLoaderSection').hide();

									} )
                                      
									 $('#ajaxdataLoaderSection').hide();
									});
						}else{
							  $scope[objectname + "dropdownIndex"] = dropdownIndex;
                        $scope[childElements + "dropdownIndex"] = dropdownIndex;
                    //    childcomponentssubfunction(childcomponents,childparam);
                   }
						}
				
						
                      
                }
            })
        }
        
        //Implentation for ATM with bridge as Proto.
        if($scope["temp"]["Mode"] == "ATM" && $scope[objectname][paramname] != "ATM"){
            console.log("else not ATM",objectname + "__" + paramname)
            if($scope['temp']['Protos'] != undefined && $scope['temp']['Protos'].toLowerCase().indexOf('bridge') > -1){
                $scope.textChange("DeviceATMLink__DestinationAddress", $scope["DeviceATMLink"]["DestinationAddress"]);
                return '';
            }else{
                if(localStorage.getItem('internetEdit') == "true")
                    $scope.Innextstatus = true;
                else
                    return '';
            }
        }
        console.log("$scope.Innextstatus",$scope.Innextstatus);

        if (($scope["temp"]["Mode"] !== "ATM" || $scope.Innextstatus == true) && $scope[objectname][paramname] != "ATM" && $scope[objectname][paramname] != "ATM-Bridge") {
            setTimeout(function () {
                $scope["modestatus"] = false;
                var elem = [];
                if($scope.Innextstatus == true && $scope["temp"]["Mode"] == "ATM"){
                    elem = $("div[child='ATM']").find('div.ng-hide input');
                }else{
                    if($scope['temp']['Protos'] == undefined || $scope['temp']['Protos']!= undefined && $scope['temp']['Protos'].toLowerCase().indexOf('bridge') == -1)
                        elem = $("div[child='allmodes']").find('div.ng-hide input');
                    else
                        elem = $("div[child='Bridge']").find('div.ng-hide input');
                }
                if($("div[child='"+ $scope[objectname][paramname] +"']").find('div.ng-hide input')[0] != undefined ){
                    var ProtoElems = $("div[child='"+ $scope[objectname][paramname] +"']").find('div.ng-hide input')
                    angular.forEach(ProtoElems, function (protoElem) {
                        elem.push(protoElem);
                    });                 
                }
                console.log(elem, $scope[objectname][paramname]);
                angular.forEach(elem, function (el) {
                    var dataobj = {};
                    for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                        att = atts[i];
                        if (att.nodeName == "ng-model") {
                            var attrvalue = att.nodeValue.split('.');
                            dataobj.objectname = attrvalue[0]
                            dataobj.paramname = attrvalue[1]

                        }
                        console.log(dataobj.objectname + "--" + dataobj.paramname)
                        if (att.nodeName == "value") {
                            var attrvalue = att.nodeValue;
                            dataobj.value = attrvalue
                        }

                    }
                    if ($scope[dataobj.objectname] == undefined) {
                        $scope[dataobj.objectname] = {};
                    }
                    //before submit
                    if (dataobj.value.indexOf('.*') > -1) {
                        var bridgeChecker1 = dataobj.value.indexOf('.*');
                        var bridgeChecker2 = dataobj.value.indexOf('Device.Bridging.Bridge');                        
                        if(bridgeChecker1 > 1 && bridgeChecker2 > -1){    
                            console.log("In BRIDGE");
                            var dataValue = dataobj.value.split('.*');
                            if($scope.presentAlias)
                                $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]] + dataValue[1] + '.' + $scope.presentAlias ;
                            console.log("bridge",dataValue,$scope[dataobj.objectname][dataobj.paramname],dataobj.objectname,dataobj.paramname);  
                        }else{
                            console.log("in here");
                            var dataValue = dataobj.value.split('.*')
                            if (dataValue[1] != "" && $scope.Innextstatus != true) {
                                dataValue[1] = dataValue[1].replace(/[^A-Z0-9_-]/ig, "");
                                var url = "Object=" + dataValue[0] + "." + $scope.ddobject[dataValue[0]] + "&" + dataValue[1] + "="
                                httpService.getFillParamData(url).
                                    success(function (data, status, headers, config) {
                                        var dropdowndata = data.Objects;
                                        angular.forEach(dropdowndata, function (dropObject) {
                                            $scope[dataobj.objectname][dataobj.paramname] = dropObject.Param[0].ParamValue;
                                        })
                                       $('#ajaxdataLoaderSection').hide();
                                    })
                                    .error(function (data, status, headers, config) {

                                    });
                            }
                            
                            
                            if ($scope.ddobject[dataValue[0]] != undefined)
                                $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]]
                            else
                                $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.presentAlias
                            
                            if($scope["temp"]["Mode"] == "ATM" && $scope.ddobject[dataValue[0]+"index"] != undefined && $scope.Innextstatus == true && dataValue[0]=="Device.ATM.Link"){
                                console.log(dataValue[0],$scope.ddobject,$scope.ddobject[dataValue[0]],$scope.ddobject[dataValue[0]+"index"]);
                                $scope[dataobj.objectname][dataobj.paramname] = dataValue[0] + "." + $scope.ddobject[dataValue[0]+"index"];
                                $scope.Innextstatus = false;
                            }
                        }
                    }
                    else {
                        if (["Alias", "LowerLayers"].indexOf(dataobj.paramname) > -1) {
                            if (["Alias"].indexOf(dataobj.paramname) == 0) {
                                if ($scope.presentAlias != '')
                                    $scope.presentAlias = $scope.previousAlias;
                                else
                                    $scope.presentAlias = "changed"
                                
                                //If alias value have '*'
                                if(dataobj.value.indexOf('*')>-1){
                                    angular.forEach($scope.ddobject,function(val,key){
                                        if(key.toLowerCase().replace('./g','').indexOf('bridge') > -1){
                                            dataobj.value = dataobj.value.replace('*',$scope.ddobject[key]);
                                        }
                                    });
                                }
                                
                                $scope.previousAlias = dataobj.value + $scope.randomvalue;  
                                console.log($scope.previousAlias, "$scope.previousAlias");
                                $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                            }
                            else {
                                
                                if (dataobj.value == ""){
                                    $scope[dataobj.objectname][dataobj.paramname] = $scope.presentAlias
                                }
                                else{
                                    $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                                }
                            }
                        }
                        else {
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value
                        }
                    }
                    changedFields.push(dataobj.objectname + "" + dataobj.paramname)
                    if($scope.Innextstatus == true){
                        $('#ajaxdataLoaderSection').hide();
                    }

                })
            }, 1000)
        }
        else {
            $scope["modestatus"] = false;
        }
        //If child components available
		childcomponentssubfunction(childcomponents,childparam);

    }
    
    
    $scope.wifi = function (modelname, dependentparam, modelvalue, pageloadstatus) {
        if (modelvalue != '') {
            var object = modelname.split('__');
            var objectname = object[0];
            var paramname = object[1];
            var objwithpar = modelname.split('__');


            if (dependentparam != '') {
                var dependentparams = dependentparam.split('&');
                angular.forEach(dependentparams, function (dependentjsonobj) {
                    var index = modelname.match(/\d+/g)[0];
                    var jsonindex = 2;
                    var paramarray = ["OperatingStandards", "Channel"]

                    if (index == 2 && paramname != "OperatingStandards") {
                        jsonindex = 5;
                    }
                    if ($scope["DeviceWiFiRadio2"] != undefined && $scope["DeviceWiFiRadio2"]["IEEE80211hEnabled"] == true && paramarray.indexOf(dependentjsonobj) > -1)
                        extension = "ieee";
                    else
                        extension = '';
                    $.getJSON(dependentjsonobj + jsonindex + "" + extension + ".json", function (data) {
                        $scope[dependentjsonobj] = [];
                        $scope.$apply(function () {
                            if (dependentparam == "OperatingStandards")
                                $scope[dependentjsonobj] = data[($scope[objectname]["RegulatoryDomain"]).trim() + "-" + modelvalue];
                            else
                                $scope[dependentjsonobj] = data[(modelvalue.replace(/\,/g, "")).trim()];
                            if ($scope[objectname] == undefined)
                                $scope[objectname] = {};
                            if ($scope[dependentjsonobj][0] != undefined && $scope[objectname][dependentjsonobj] == undefined) {
                                $scope[objectname][dependentjsonobj] = '';
                            }
                            else {
                                if (pageloadstatus != "countrychange" && !(pageloadstatus == "pageload"))
                                    changedFields.push(objwithpar[0] + "" + objwithpar[1]);
                                var value = $scope[objectname][dependentjsonobj];
                                $scope[objectname][dependentjsonobj] = '';
                                for (i = 0; i < $scope[dependentjsonobj].length; i++) {
                                    if ($scope[dependentjsonobj][i].id == value) {
                                        $scope[objectname][dependentjsonobj] = $scope[dependentjsonobj][i].id;
                                    }
                                }
                                setTimeout(function () {
                                    if (dependentparam == "Channel" && !(pageloadstatus == "pageload")) {
                                        console.log(modelname)
                                        var param = $("#Channel").attr('ng-change');
                                        var parameters = param.match(/\(([^)]+)\)/)[1].split(',');
                                        var temp = parameters[0].replace(/"/g, '')
                                        var temp1 = parameters[1].replace(/"/g, '')
                                        var temp2 = parameters[2].replace(/"/g, '').split('.');
                                        temp2 = $scope[temp2[0]][temp2[1]]

                                        $scope.wifi(temp, temp1, temp2, "countrychange");
                                    }
                                }, 1000)
                            }

                        })

                    });
                })
            }
            else if (pageloadstatus != "pageload") {

                changedFields.push(objwithpar[0] + "" + objwithpar[1]);
            }
        }
    }
	
	
    function childcomponentssubfunction(childcomponents,childparam){
					if (childcomponents != "") {
						        var childElements = childcomponents.replace(/\./g, "").replace(/\*/g, "").replace(/\,/g, "");

             $('#ajaxdataLoaderSection').hide();
            childcomponentArray = childcomponents.split(',');
            console.log(childcomponentArray);
            if(Array.isArray(childcomponentArray)){
                for (var cca = 0; cca < childcomponentArray.length; cca++) {
                    var childcomponent = childcomponentArray[cca];
                    var childElement = childcomponent.replace(/\./g, "").replace(/\*/g, "");
                    // Normal table
                    console.log(childElement, $("#" + childElement + "").attr('componenttype'));
                    if ($("#" + childElement + "").attr('componenttype') == "table" && $scope[childElements + "dropdownIndex"] != undefined) {
                        if(childcomponent.substring(childcomponent.length - 2) == '.*')
                            var reqtabobject = URL + httpService.get_url + "?Object=" + childcomponent.substring(0, childcomponent.length - 2).replace('*', $scope[childElements + "dropdownIndex"]);
                        else
                            var reqtabobject = URL + + httpService.get_url + "?Object=" + childcomponent.replace('*', $scope[childElements + "dropdownIndex"]);
                        var objecttabInformation = $("table#" + childElement + "").attr('name').replace(/(^[&\s]+)|([&\s]+$)/g, '').split('&');
                        objtabparams = objecttabInformation[0].split('?')[1].split(',')
                        objtabobject = objecttabInformation[0].split('?')[0];
                        //Due to childElement scope problem in loop, need a new variable element
                        var element = childElement;
                        modifyService.filterdata(reqtabobject, objtabobject, objtabparams, childElement, function (response) {
                            $scope[element + "table"] = [];
                            $scope[element + "table"] = response;
                        });
                    }
                    //Non - formal tables and forms
                    else if($scope[childElements + "dropdownIndex"] != undefined){
                        console.log("childcomponent",childcomponent,$scope[childElements + "dropdownIndex"]);
                        $scope[childcomponent.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] = $scope[childElements + "dropdownIndex"];
                        console.log($scope[childcomponent.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"],'$scope[childcomponent.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]');
                        objectUrl = "Object=" + childcomponent.replace('*', $scope[childElements + "dropdownIndex"]);
                        //if(childcomponent.substring(childcomponent.length - 2) == '.*' && (childcomponent.match(new RegExp(".*", "g")) || []).length >= 1)
                         //   objectUrl = objectUrl.substring(0, objectUrl.length - 2);
                        var dataGen = function(childcomponent, childElement){
                             $('#ajaxdataLoaderSection').show();
                        httpService.getData(objectUrl).
                            success(function (data, status, headers, config) {
                                objects = data.Objects;
                                var finalString = childcomponent;
                                finalString = modifyService.dotstarremove(finalString, '.*')
                                finalString = finalString.replace(/\./g, "").replace(/\*/g, "");
                                
                                
                                $scope.tabledata = [];
                                
                                var tempobject = {};                                
                                var paramscount = 0;
                                var paramsemptystatus = 0;
                                if ($("#" + childElement + "").attr('componenttype') == undefined) {
                                    if($("table#" + childElement + "").attr('name') == undefined || $("form#" + childElement + "").attr('name1') != undefined ){
                                        if(objects == undefined){
                                            $('#ajaxdataLoaderSection').hide();  
                                            $scope[finalString] = {};
                                            return;
                                        }
                                        var objectParamValues = objects[0].Param;
                                        console.log("In form");
                                        //Other than table components (for all forms)
                                        if($("#" + childElement + "").attr('name1') !== undefined){
                                        var objectInformation = $("#" + childElement + "").attr('name1').replace(/(^[,\s]+)|([,\s]+$)/g, '');
                                        var params = objectInformation.split('?')[1].split(',');
                                        for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                            if (params.indexOf(objectParamValues[pa1].ParamName) > -1) {
                                                if($scope[finalString] === undefined){
                                                    $scope[finalString] = {};
                                                }
                                                $scope[finalString][objectParamValues[pa1].ParamName] = objectParamValues[pa1].ParamValue;
//                                                console.log("finalString",finalString,objectParamValues[pa1].ParamName,$scope[finalString][objectParamValues[pa1].ParamName]);
                                                var element = angular.element('[ng-model="'+ finalString + '.' + objectParamValues[pa1].ParamName + '"]');
                                                if(objectParamValues[pa1].ParamValue == "true" && (element == undefined || element[0] == undefined || element[0].type != "select-one") )
                                                    $scope[finalString][objectParamValues[pa1].ParamName] = true;
                                                else if(objectParamValues[pa1].ParamValue == "false" && (element == undefined || element[0] == undefined || element[0].type != "select-one") )
                                                    $scope[finalString][objectParamValues[pa1].ParamName] = false;
                                            }
                                        }
                                        }
                                    }
                                    if($("table#" + childElement + "").attr('name') != undefined){
                                        console.log("in table form",$("table#" + childElement + "").attr('componentviewtype'));
                                        //For table components (For EditableTable & tablePlus)
                                        var id = $("table#" + childElement + "").attr('id');
                                        console.log(id,"id",$("table#" + childElement + ""));
                                        
                                        if($("table#" + childElement + "").attr('componentviewtype') == "EditableTable"){
						 var objectParamValues = objects[0].Param;
                                            var objectInformation = $("table#" + childElement + "").attr('name').replace(/(^[,\s]+)|([,\s]+$)/g, '');
                                            params = objectInformation.split('?')[1].split(',')
                                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                                if (params.indexOf(objectParamValues[pa1].ParamName) > -1) {
                                                    paramscount += 1;
                                                    var tablerowObject = {};
                                                    var param_name = objectParamValues[pa1].ParamName
                                                    var ParamValue = objectParamValues[pa1].ParamValue
                                                    if (ParamValue.indexOf(',') > -1) {
                                                        angular.forEach(ParamValue.split(','), function (csv) {
                                                            var csvobject = {};
                                                            csvobject[finalString + "__" + param_name] = csv;
                                                            csvobject['z'] = childcomponent.replace('*', $scope[childElements + "dropdownIndex"]);
                                                            $scope['tabledata'].push(csvobject);
                                                        })
                                                    }
                                                    else {
                                                        if (ParamValue == "")
                                                            paramsemptystatus += 1;
                                                        tablerowObject[finalString + "__" + param_name] = ParamValue;
                                                        tablerowObject['z'] = childcomponent.replace('*', $scope[childElements + "dropdownIndex"]);
                                                    }
                                                    if (Object.keys(tablerowObject).length > 0) {
                                                        if (paramsemptystatus < paramscount)
                                                            $scope['tabledata'].push(tablerowObject);
                                                    }
                                                }
                                                //If childparam configured value configured in XML with comma seperated values
                                                if (childparam != undefined && childparam != ""){
                                                    childparamArray = childparam.split(',');
                                                    for (var cp1 = 0; cp1 < childparamArray.length; cp1++) {
                                                        if(objectParamValues[pa1].ParamName == childparamArray[cp1]){
                                                            $scope[finalString][childparamArray[cp1]] = objectParamValues[pa1].ParamValue;
                                                        }
                                                    }
                                                }

                                                $scope[finalString + "table"] = [];
                                                $scope[finalString + "table"] = $scope['tabledata']
                                            }                                
                                        }else
                                            tabledatapopulation($("table#" + childElement + "").attr('name').replace('*', $scope[childElements + "dropdownIndex"]), $("table#" + childElement + "").attr('filterdata'), id, $("table#" + childElement + "").attr('urlobjs'), $("table#" + childElement + "").attr('depends'), true, $("table#" + childElement + "").attr('name'))
                                    }
                                       
                                }
                                else {
                                    console.log("in rowTable");
                                    if(objects == undefined){
                                        $('#ajaxdataLoaderSection').hide();  
                                        $scope[finalString] = {};
                                        return;
                                    }
                                    var objectParamValues = objects[0].Param;
                                    //executed for tablerow (rowTable)
                                    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                        var param_name = objectParamValues[pa1].ParamName
                                        var ParamValue = objectParamValues[pa1].ParamValue
                                        tempobject[finalString + "__" + param_name] = ParamValue;
                                        //If childparam configured value configured in XML with comma seperated values
                                        if (childparam != undefined && childparam != ""){
                                            childparamArray = childparam.split(',');
                                            for (var cp1 = 0; cp1 < childparamArray.length; cp1++) {
                                                if(objectParamValues[pa1].ParamName == childparamArray[cp1]){
                                                    $scope[finalString][childparamArray[cp1]] = objectParamValues[pa1].ParamValue;
                                                }
                                            }
                                        }
                                    }
                                    $scope['tabledata'].push(tempobject);                                    
                                    $scope[finalString + "table"] = [];
                                    $scope[finalString + "table"] = $scope['tabledata']
                                }
                            $('#ajaxdataLoaderSection').hide();                                
                            })
                            .error(function (data, status, headers, config) {
                                $('#ajaxdataLoaderSection').hide();
                            });
                        }
                        dataGen(childcomponent, childElement);
                    }
                }
            }

         }
		
	}

    /*
     * To track the changes of dropdown in a form
     */
    $scope.ddChange = function (objectname, paramname) {
		
        var objwithpar = objectname.split('__');
        if ($scope[objwithpar[0]] == undefined) {
            $scope[objwithpar[0]] = {};
        }
        if (paramname != undefined && $scope[objwithpar[0]][objwithpar[1]] == undefined) {
            $scope[objwithpar[0]][objwithpar[1]] = paramname;
        }
        var modelValue = $scope[objwithpar[0]][objwithpar[1]]
//        console.log($scope)
        $scope.ddstatus = modelValue;
		if(localStorage.getItem("xml") === "hotspot_configuration"||
									   localStorage.getItem("xml") === "adv5_hotspot_configuration" ||
						   localStorage.getItem("xml") === "adv5_2_hotspot_configuration"){
			
		
		if($scope.DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20.OSENEnabled=="true" &&
		   $scope.DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20.Enable=="false"
		  ){
			$scope.DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20.DgafDisabled="true";
			$scope.DeviceWiFiAccessPointX_LANTIQ_COM_Vendor.ProxyArp="true";
			
			changedFields.push("DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20DgafDisabled");
			changedFields.push("DeviceWiFiAccessPointX_LANTIQ_COM_VendorProxyArp");
			
		}}
        if (modelValue == "Server" && objectname == "temp__DHCPMode") {
            $scope['DeviceDHCPv4ServerPool1']['Enable'] = 1
            $scope['DeviceDHCPv4RelayForwarding1']['Enable'] = 0
            changedFields.push("DeviceDHCPv4ServerPool1Enable")
            changedFields.push("DeviceDHCPv4RelayForwarding1Enable")
        }
        else if (modelValue == "Relay" && objectname == "temp__DHCPMode") {
            $scope['DeviceDHCPv4ServerPool1']['Enable'] = 0
            $scope['DeviceDHCPv4RelayForwarding1']['Enable'] = 1
            changedFields.push("DeviceDHCPv4ServerPool1Enable")
            changedFields.push("DeviceDHCPv4RelayForwarding1Enable")
        }
        else if (modelValue == "Disable" && objectname == "temp__DHCPMode") {
            $scope['DeviceDHCPv4RelayForwarding1']['Enable'] = 0
            $scope['DeviceDHCPv4ServerPool1']['Enable'] = 0
            changedFields.push("DeviceDHCPv4ServerPool1Enable")
            changedFields.push("DeviceDHCPv4RelayForwarding1Enable")

        }
        changedFields.push(objwithpar[0] + "" + objwithpar[1]);
        if (objwithpar[1] == "LinkType")
            $scope.dropdownMouseoverstatus = true;
    }
    /*
     * To know the type of element(eg:dropdown,string or checkbox in a table) 
     */
    $scope.elementtype = function (key) {
        return key.split('__')[2] == undefined ? 'string' : key.split('__')[2];
    }
    $scope.iconictext = function (value, key) {
        var matchedvalue = '';
        if (iconicparams.indexOf(key) > -1) {
            angular.forEach($scope[key], function (object) {
                if (object.id == value) {
                    matchedvalue = object.symbol;
                    return;
                }
            })
        }
        return matchedvalue;
    }
    $scope.iconicstatus = function (iconicparam) {
        return $scope['tableiconicstatus'][iconicparam + "displaystatus"];
    }
    $scope.keyname = function (key) {
        return key.split('__')[1];
    }
    $scope.urldropdownvalue = function (array, value) {
        var fieldstatus = false;
        var selectedVal = ""
        angular.forEach($scope[array], function (object) {
            if (object.id == value) {
                selectedVal = object.name;
                fieldstatus = true;
                return;
            }
        });
        if (!fieldstatus)
            selectedVal = value;
        return selectedVal == "Select" ? '' : selectedVal;
    }
    /*
     * To generate the random number
     */
    $scope.randomNumber = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /* To add or modify the form */
    $scope.Apply = function (param1, elementstatus, tableobject) {
        $rootScope.initialtime=Date.now();
        localStorage.removeItem('formMode');
        $scope.formsubmitstatus = true;
        if ($scope.notifications.length > 0) {
            notificationstatus = false;
            $scope.notificationcall();
            notificationdataargs.push(param1);

            notificationdataargs.push(elementstatus);
            notificationdataargs.push(tableobject);
        }
        if ((param1.currentTarget.attributes['formname'] == undefined || $scope[param1.currentTarget.attributes['formname'].value + "_form"].$valid) && notificationstatus) {
            $('#ajaxLoaderSection').show();
            var formstatus = localStorageService.get('hybrideditObject');
            localStorageService.remove('hybrideditObject');
            var hparamscount = 0;
            console.log("param1.currentTarget.attributes['hiddenparams']",param1.currentTarget.attributes['hiddenparams'].value);
            if (param1.currentTarget.attributes['hiddenparams'] != undefined && param1.currentTarget.attributes['hiddenparams'].value != "")
            {
                angular.forEach(param1.currentTarget.attributes['hiddenparams'].value.replace(/\&$/, '').split('&'), function (hiddenobject) {
                    if (hiddenobject.split('?')[1] != "") {
                        var hobjectname = hiddenobject.split('?')[0].replace(/\./g, "").replace(/\*/g, "")
                        var hparameters = hiddenobject.split('?')[1].replace(/\,$/, '').split(',')
                        angular.forEach(hparameters, function (hparam) {
                            if (changedFields.indexOf(hobjectname + "" + hparam.split('__')[0]) <= -1 || hobjectname + "" + hparam.split('__')[0] == "DeviceWiFiSSIDLowerLayers") {
                                hparamscount += 1;
                                changedFields.push(hobjectname + "" + hparam.split('__')[0]);
                                if ($scope[hobjectname] == undefined)
                                    $scope[hobjectname] = {};
                                if (hparam.split('__')[0] != "" && formstatus == null)
                                    $scope[hobjectname][hparam.split('__')[0]] = hparam.split('__')[1];
                            }
                        })
                    }
                })
            }
            $scope.open = false;
									  
            var PostObjectjsonName = '';
            var accordoinPostObjectjsonName = '';
            var tableObjects = param1.currentTarget.attributes['source'].value.split('&')
            var accordionchildparentrelation = param1.currentTarget.attributes['childparentrelation'] != undefined ? param1.currentTarget.attributes['childparentrelation'].value : undefined;

            angular.forEach(tableObjects, function (doc) {
                if(accordionchildparentrelation == "true"){
                    var accordionobj = doc.split('?')[0];
                    console.log(accordionobj != undefined , $scope[accordionobj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined , accordionobj.match(/\.\*/g), accordionobj.match(/\.\*/g).length > 1);
                    if(accordionobj != undefined && $scope[accordionobj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined && accordionobj.match(/\.\*/g).length > 1){
                        accordionobj = accordionobj.replace('*',$scope[accordionobj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]);
                        PostObjectjsonName += accordionobj + ",";
                        accordoinPostObjectjsonName += doc.split('?')[0] + ",";
                        console.log("accordionobj",accordionobj,$scope[accordionobj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"],PostObjectjsonName);
                    }
//                    console.log("accordionobj",accordionobj,$scope[accordionobj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"],PostObjectjsonName);
                }else{
                    PostObjectjsonName += doc.split('?')[0] + ",";
                }
                
            });
            var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
            var accordionsource = accordoinPostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '');
            var individualObject = '';
            var formObject = source.split(',');
            var accordionformObject = accordionsource.split(',');
            formObject = modifyService.unique(formObject)
            accordionformObject = modifyService.unique(accordionformObject)
            /*  Alias Logic */
            var aliasObjects = modifyService.aliasDependency(angular.copy(formObject))
            var aliasParents = aliasObjects.parents;
            var aliasrelations = aliasObjects.childrelation;
            var position = formObject.indexOf('temp')

            if (position > -1){
                formObject.splice(position, 1);
                accordionformObject.splice(position, 1);
            }
            angular.forEach(formObject, function (objstring) {
                individualObject += objstring.replace(/[^a-zA-Z0-9_-]/g, '') + ",";
            });
            value = localStorageService.get('hybrideditObject')
            if (value != null) {
                source = value;
            }
            var obj2 = individualObject.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
            var post = '';
            var uniqueObjects = modifyService.unique(formObject);
            var accordionuniqueObjects = modifyService.unique(accordionformObject);
            formObject = modifyService.split(formObject);
            var operation = '';
            var changedfieldscount = 0;
            console.log(aliasrelations);
            obj2.forEach(function (object, objindex) {
                var combineobject = '';
                operation = param1.currentTarget.id;
                if (param1.currentTarget.id == "Add") {
                    var aliasStatus = true;
                    /* Alias Logic */
                    combineobject = uniqueObjects[objindex];
                    var parentIndex = aliasParents.indexOf(combineobject);
                    console.log(parentIndex)
                    if ((parentIndex > -1) && (aliasrelations[parentIndex].childrens.length >= 1)) {
                        if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] != undefined) {
                            if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] != "")
                                aliasStatus = false;
                        }
                        if (!(aliasrelations[parentIndex].hasOwnProperty('Alias'))) {
                            if ($scope.randomvalue == undefined)
                                $scope.randomvalue = $scope.randomNumber(10, 99)
                            aliasrelations[parentIndex].Alias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                            changedFields.push(object + "" + "Alias")
                            if ($scope[object] == undefined)
                                $scope[object] = {};
                            if (aliasStatus)
                                $scope[object]["Alias"] = aliasrelations[parentIndex].Alias;
                        }
                        combineobject = combineobject.split('.*')[0]
                    }
                    else {

                          if ((localStorage.getItem("xml") == "adv_ssid" || localStorage.getItem("xml") == "adv5_ssid" || localStorage.getItem("xml") == "adv5_2_ssid" || localStorage.getItem("xml") == "adv_ssid_form" )  && parentIndex > -1 ){
                            if ($scope.randomvalue == undefined)
                                $scope.randomvalue = $scope.randomNumber(10, 99);
							console.info(parentIndex,aliasrelations);
                            aliasrelations[parentIndex].Alias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                            changedFields.push(object + "" + "Alias")
                            if ($scope[object] == undefined)
                                $scope[object] = {};
                            if (aliasStatus)
                                $scope[object]["Alias"] = aliasrelations[parentIndex].Alias;
							changedFields.push("DeviceWiFiAccesspoint" + "" + "SSIDReference")
							    $scope["DeviceWiFiAccessPoint"]["SSIDReference"] = "Device.WiFi.SSID."+aliasrelations[parentIndex].Alias; 
                        }
                        if (parentIndex > -1)
                            combineobject = combineobject.split('.*')[0]
                        else {
                            if (!(combineobject.slice(-1) == "*"))
                                operation = "Modify";
                            combineobject = combineobject.replace('*', (aliasrelations[(aliasParents.indexOf(combineobject.split('.*')[0] + ".*"))].Alias)).split('.*')[0]
                        }
                    }

                }
                else {
                    var objectstring = uniqueObjects[objindex].split('.*')

                    if (objectstring[objectstring.length - 1 ] == "")
                        objectstring.splice(objectstring.length - 1);
                    if (objectstring.length < 2)
                        combineobject += objectstring[0];
                    else {
                        objectstring.forEach(function (doc2) {
                            combineobject += doc2;
                        })
                    }
                }
                var selectedvalues = '';
                if ($routeParams.param2 == "multicast_mcconfiguration" && param1.currentTarget.id == "Add") {
                    changedfieldscount += 1;
                    angular.forEach($scope.selectedUserIds, function (id) {
                        if (id != '')
                            selectedvalues += id + ","
                    })
                    post += "Object=" + combineobject + "&Operation=Modify&UpStreamIntrfName=" +  $sanitize(selectedvalues.replace(/\,$/, ''))
                    post = post.replace(/\,$/, '');
                }
                else {
                    var postBefore = "Object=" + combineobject + "&Operation=" + operation;
                    var arrobj1 = object
                    if(accordionchildparentrelation == "true"){
                        arrobj1 = accordionuniqueObjects[objindex].replace(/\./g,'').replace(/\*/g,'');
                        console.log('accordionuniqueObjects[objindex]',accordionuniqueObjects[objindex].replace(/\./g,'').replace(/\*/g,''),"DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20OSUproviders");
                    }
                    console.log("arrobj1",arrobj1,$scope[arrobj1],$scope['DeviceWiFiAccessPointX_LANTIQ_COM_VendorHS20OSUproviders']);
                    if ($scope[arrobj1] != undefined) {
                        var postformat = $rootScope.poststringformat(arrobj1, $scope[arrobj1], changedFields, changedfieldscount, $scope.objectstatus);
                        if (postformat[0]) {
                            post += postBefore + postformat[1] + "&";
                        }
                        changedfieldscount = postformat[2];
                    }

                }
            });
//            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
//            post = post.replace(/\&$/, '');
            
            if ($routeParams.param2 == "wisp") {
                    changedfieldscount += 1;
			        var tabSelected = $('.ipvbtn li.active').text();
				    if(tabSelected.indexOf("2.4") >= 0){
						var paramValue = $scope["DeviceX_INTEL_COM_WISPEndPoint1"]["Enable"] == true ? false : true;
						post += "Object=Device.X_INTEL_COM_WISP.EndPoint.1&Operation=Modify&Enable=" + paramValue ;
						post = post.replace(/\,$/, '');
					}
				    else{
						var paramValue = $scope["DeviceX_INTEL_COM_WISPEndPoint2"]["Enable"] == true ? false : true;
						post += "Object=Device.X_INTEL_COM_WISP.EndPoint.2&Operation=Modify&Enable=" + paramValue ;
						post = post.replace(/\,$/, '');
					}
            }
            
            post = post + notificationpost.replace(/\&$/, '');
            if (elementstatus != true) {
                if (changedfieldscount > hparamscount) {
                    var formname = param1.currentTarget.attributes['formname'].value;
                    var componentname = param1.currentTarget.attributes['formname'].value;
                    httpService.setData(post).
                            success(function (data, status, headers, config) {
                                $rootScope.pollCounterReset=1;

//                                status = 203;
                                    $scope[componentname + "popup"] = false;
                                $('#ajaxLoaderSection').hide();
                                if (status == 200) {
                                    accordionAddedObjectIndex = [];
                                    notificationpost = '';
                                    changedFields = [];
                                    errormessages = [];
                                    localStorageService.remove('hybrideditObject');
                                    $scope.objectstatus = []
                                   /* if($scope.isReboot !== undefined && $scope.isReboot !== '' && $scope.isReboot === true){
                                        $scope.Reboot(param1);
                                    }*/
									 
//                                alert(localStorage.getItem('previouspagetype').contains("custom"))
                                    if (elementstatus != undefined && (localStorage.getItem('previouspagetype').indexOf("custom") != -1)) {
                                        $scope.customCancel(elementstatus);
                                    }
                                    else {
                                        if (elementstatus != undefined) {
                                            $scope.Add(elementstatus)
                                        }
                                        else {
                                            if (param1.currentTarget.attributes["componenttype"] != undefined && param1.currentTarget.attributes["componenttype"].value == 'tablePlus')
                                                $route.reload();
                                            else {
                                                var formid = param1.currentTarget.attributes["formname"].value;
                                                var formdata = $("#" + formid).attr('name1');
                                                var urlobjs = $("#" + formid).attr('urlobjs');
                                                $scope.formsubmitstatus = false;
						angular.forEach(previoousmessages, function (errormsg) {
                                                $scope[errormsg] = false;
                                                })
                                                if($route.current.pathParams.param2 === 'client_mode' || $route.current.pathParams.param2 === 'home_wifi_ire' || $route.current.pathParams.param2 === 'home_wifi_gw'){
                                                        $rootScope.$emit('rootScope:language_changed');
                                                }
                                                formdatapopulation(formdata, formid, urlobjs);
												if(isReboot === true){
													$('#ajaxLoaderSection').show();
													setTimeout(function () {
						                                $('#ajaxLoaderSection').hide();
														$location.path("/");
													}, 180000);
												}
                                            }
                                        }
                                    }
                                }
                                else if (status == 203) {
                                            if (previoousmessages.length > 0) {
                                                angular.forEach(previoousmessages, function (errormsg) {
                                                    $scope[errormsg] = false;
                                                })
                                            }
                                    $scope[componentname + "popup"] = true;
                                    $scope[componentname + "popupval"] = data.Objects[0].Param[0].ParamValue
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
                                    var formname = param1.currentTarget.attributes['formname'].value;
                                    var popupmessage = '';
                                    $scope[formname + "popupval"] = '';
                                    angular.forEach(data.Objects, function (object) {
                                        var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                                        if (param1.currentTarget.attributes["componenttype"] != undefined && param1.currentTarget.attributes["componenttype"].value == 'tablePlus') {
                                            $scope[formname + "popup"] = true;
                                            angular.forEach(object.Param, function (param) {
                                                popupmessage += param.ParamValue;
                                            })
                                            $scope[formname + "popupval"] += popupmessage;
                                        }
                                        else {
                                            if (previoousmessages.length > 0) {
                                                angular.forEach(previoousmessages, function (errormsg) {
                                                    $scope[errormsg] = false;
                                                })
                                            }
                                            previoousmessages = [];
                                            angular.forEach(object.Param, function (param) {
                                                previoousmessages.push(respobject + "_" + param.ParamName + "responsestatus");
                                                $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                                $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue
                                                errormessages.push(param.ParamValue)
                                            })
                                        }
                                    });
                                }
                               $scope.isReboot = false;

                            }).
                            error(function (data, status, headers, config) {
                                changedFields = [];
                                $('#ajaxLoaderSection').hide();
                                $scope.formsubmitstatus = false;
                            });
                }
                else {
                    alert("None of the  Parameters have changed to update");
                    $('#ajaxLoaderSection').hide();
                }
            }
            else {
                var temp = {};
                var string = '';
                 angular.forEach(uniqueObjects, function (trobject) {
                    if($scope[tableobject + "tableObjectIndex"] != undefined && $scope[tableobject + "tableObjectIndex"] > 0){
                     string += trobject.replace(/\*/g, $scope[tableobject + "tableObjectIndex"]) + ","
                    }
                    else
                        {
                            string += trobject.replace(/\*/g, $scope[tableobject + "tableOriginalIndex"]) + ","
                        }
                })
                string += "new"
                temp.index = string;
                temp.post = post.replace(/&Object/g, ",Object");
                $scope.newobjects.push(temp);
                $scope.rowcancel(param1.currentTarget.attributes['showstatus'].value);
                $('#ajaxLoaderSection').hide();
            }
        }
        else {
            param1.preventDefault();
        }

    }
    
	$timeout(function(){					
        $("#dataView").find("table").map(function (i)
        {
            if ($(this).attr('objparamrelation') != undefined) {
                //To implement table with no Actions
                var tabparamsrder = $(this).attr('objparamrelation').split(',');
    //            tabparamsrder.splice(tabparamsrder.length - 1, 1)
                localStorage.setItem($(this).attr('id') + "tparams", tabparamsrder);
            }
            if ($(this).attr('reqcall') != 'true')
                $scope.tableCount.push({"id": $(this).attr('id'), "formattr": $(this).attr('name')})
        })
	},0);	   
	
    /* To open the form from table in add mode*/
    $scope.Add = function (param1) {
        localStorage.removeItem('formMode');
        localStorage.removeItem('dyndnsClientEdit');
        if(param1 !== null && param1 !== undefined){
            httpService.checkFileExists(param1, 'tableform').success(function(responseData){
                   if(responseData !== ""){
                        $location.path("/tableform/" + param1);
                    }
                    else{

                    }
            }).error(function(error){

            });
        }
		
        localStorage.removeItem('internetEdit');
        localStorageService.remove('hybrideditObject');
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
                })
            })
        }

    }
    /* To delete the row in table*/
    $scope.delete = function (event, user) {
        var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        } else {
            $rootScope.initialtime=Date.now();
            $("#ajaxLoaderSection").show();
            var url = URL + httpService.set_url;
            var deleteobjects = event.currentTarget.id.split(',')
            var post = '';
            var selectedvalues = '';
            if ($routeParams.param2 == "multicast_mcconfiguration") {
                var position = $scope.selectedUserIds.indexOf(user['UpStreamIntrfName']);
                if (position > -1)
                    $scope.selectedUserIds.splice(position, 1);
                angular.forEach($scope.selectedUserIds, function (id) {
                    if (id != '')
                        selectedvalues += id + ","
                })
                post += "Object=" + event.currentTarget.id + "&Operation=Modify&UpStreamIntrfName=" + selectedvalues.replace(/\,$/, '')
            }
            else
            {
                deleteobjects = modifyService.split(deleteobjects);
                angular.forEach(deleteobjects, function (obj) {
                    post += "Object=" + obj + "&Operation=Del" + "&";
                })
            }
            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '')
            modifyService.genericRequest(url, post, function (response) {
                var formname = event.currentTarget.attributes['popupinfo'].value;
                errorResponseDisplay(formname, response)
            });
        }
    }
    $scope.addObject = function (object, trObjects, event) {
        console.log("object, trObjects, event",object, trObjects, event);
        $scope[object + "tableObjectIndex"] = 0;
        var accordionchildparentrelation = event.currentTarget.attributes['childparentrelation'] != undefined ? event.currentTarget.attributes['childparentrelation'].value : undefined;
        console.log("accordionchildparentrelation",accordionchildparentrelation);
        if( isNaN($scope[object + "tableOriginalIndex"]) )
            $scope[object + "tableOriginalIndex"] = 0;
        $scope[object + "tableOriginalIndex"] += 1;
        var finalObjectIndex = $scope[object + "table"] != undefined ? $scope[object + "table"].length - 1 : -1;
        if(finalObjectIndex > -1){
            var newObjectIndex = parseInt($scope[object + "table"][finalObjectIndex]["z"].match(/\d+/g)[0]) + 1;
        }        
        var tempObject = {};
        console.log('$scope[object]',object,$scope[object],$scope[object + "tableOriginalIndex"],$scope[object + "table"]);
        if($scope[object + "table"] == undefined || ($scope[object + "table"] != undefined && $scope[object + "table"][0] == undefined) ){
            var string = '';
            angular.forEach(Object.keys($scope[object]), function (key) {
                if ( key != "Alias") {
                    tempObject[object+'__'+key] = $scope[object][key];
                }
                else
                    tempObject[key] = "";
            });
            angular.forEach(trObjects.split(','), function (trobject) {
                var trobjectval = trobject;
                if(accordionchildparentrelation == "true"){
                    console.log(trobjectval != undefined , $scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined , trobjectval.match(/\.\*/g).length > 1);
                    if(trobjectval != undefined && $scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined && trobjectval.match(/\.\*/g).length > 1){
                        trobjectval = trobjectval.replace(/\*/,$scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"])
                        console.log("trobjectval",trobjectval,trobject);
                    }
                }
                console.log("trobjectval",trobjectval,trobject);
                if(finalObjectIndex > -1 && newObjectIndex != undefined){
                    string += trobjectval.replace(/\*/g, newObjectIndex) + ",";
                }else{
                    string += trobjectval.replace(/\*/g, '1') + ",";                            
                }
            })
            string += "new"
            tempObject['z'] = string;
            tempObject['objectIndex'] = 1;
        }else{
            angular.forEach(Object.keys($scope[object + "table"][0]), function (key) {
                if (key.split('__')[0] != 'z' && key.split('__')[1] != "Alias" && key.split('__')[0] != 'objectIndex' ) {
                    tempObject[key] = $scope[key.split('__')[0]][key.split('__')[1]];
                }
                else {
                    if (key == 'z') {
                        var string = '';
                        angular.forEach(trObjects.split(','), function (trobject) {
                            var trobjectval = trobject;
                            if(accordionchildparentrelation == "true"){
                                console.log(trobjectval != undefined , $scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined , trobjectval.match(/\.\*/g).length > 1);
                                if(trobjectval != undefined && $scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"] != undefined && trobjectval.match(/\.\*/g).length > 1){
                                    trobjectval = trobjectval.replace(/\*/,$scope[trobjectval.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"])
                                    console.log("trobjectval",trobjectval,trobject);
                                }
                            }
                            console.log("trobjectval",trobjectval,trobject);
                            if(finalObjectIndex > -1 && newObjectIndex != undefined){
                                $scope[object + "tableObjectIndex"] = newObjectIndex;
                                string += trobjectval.replace(/\*/g, newObjectIndex) + ",";
                            }else{
                                string += trobjectval.replace(/\*/g, $scope[object + "tableOriginalIndex"]) + ",";                            
                            }
                        })
                        string += "new"
                        tempObject[key] = string;
                        tempObject['objectIndex'] = $scope[object + "tableOriginalIndex"];
                    }
                    else{
                        tempObject[key] = "";
                        tempObject['objectIndex'] = $scope[object + "tableOriginalIndex"];
                    }
                }
            })
        }
        console.log("tempObject",tempObject);
        if($scope[object + "table"] == undefined)
            $scope[object + "table"] = [];
        $scope[object + "table"].push(tempObject);
        setTimeout(function () {
            angular.forEach($scope.newobjects, function (matchedObject, objectindex) {
                if (matchedObject.index.split("").sort().join() == tempObject.z.split("").sort().join()) {
                    $scope.newobjects[objectindex].modifiedParameters = tempObject.z
                    var temporaryobjects = $scope.newobjects[objectindex].modifiedParameters.split(',');
					
					// for ssid page
					if (localStorage.getItem("adv_ssidaccordion") !== null || localStorage.getItem("adv5_ssidaccordion") != null || localStorage.getItem("adv5_2_ssidaccordion") != null) {
						
						// DeviceWiFiAccessPointWPS__Enable
						if(tempObject.DeviceWiFiAccessPointWPS__Enable== undefined){
							tempObject.DeviceWiFiAccessPointWPS__Enable=false;
							//alert('inside undefined')
							$scope[temporaryobjects[3].split('.').join("")]={}
							$scope[temporaryobjects[3].split('.').join("")].Enable=false;
						}else{
							
						}
						
	
											var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
				swapArrayElements(temporaryobjects,2,3);
				//alert(temporaryobjects)	
						
}

					
                    var newpost = $scope.newobjects[objectindex].post.replace(/(^[&\s]+)|([&\s]+$)/g, '').split(',')
					//// for ssid page
if (localStorage.getItem("adv_ssidaccordion") !== null ||
	localStorage.getItem("adv5_ssidaccordion") != null || 
	localStorage.getItem("adv5_2_ssidaccordion") != null) {
 
	
				neededindex=newpost[0].lastIndexOf("=")+1;
					neededalias=newpost[0].substring(neededindex);
					neededaliasnumber=neededalias.substring(neededalias.lastIndexOf("-"));
					
					console.debug(neededalias)
					$scope[temporaryobjects[3].split('.').join("")]={}

					newpost.splice(2, 0, "Object=Device.WiFi.AccessPoint.cpe-WEB-WiFiAccessPoint"+neededaliasnumber+".WPS&Operation=Modify&Enable="+tempObject.DeviceWiFiAccessPointWPS__Enable);
					var uniquepost = [];
$.each(newpost, function(i, el){
    if($.inArray(el, uniquepost) === -1) uniquepost.push(el);
});
					newpost=uniquepost;
					console.debug(newpost);
	
}		
                    var objrelationArray = [];
                    angular.forEach(newpost, function (newpostobj, objinnerIndex) {
                        var objrelation = {};
                        var tempObj = newpostobj.split('&')
                        for (i = 0; i < tempObj.length; i++) {
                            if (i != 0 && i != 1) {
                                if ($scope[temporaryobjects[objinnerIndex].replace(/[^a-zA-Z0-9_-]/g, '')] == undefined)
                                    $scope[temporaryobjects[objinnerIndex].replace(/[^a-zA-Z0-9_-]/g, '')] = {};
                                $scope[temporaryobjects[objinnerIndex].replace(/[^a-zA-Z0-9_-]/g, '')][tempObj[i].split('=')[0]] = tempObj[i].split('=')[1]
                            }
                            else
                                objrelation[tempObj[i].split('=')[0]] = tempObj[i].split('=')[1]
                        }
                        objrelationArray.push(objrelation)
                    })
                    $scope.newobjects[objectindex].relation = objrelationArray;
                }
            })
            angular.forEach(trObjects.split(','), function (trobject) {
                $scope[trobject.replace(/\./g, "").replace(/\*/g, "")] = {};
            })
        },2000)
        $scope.randomvalue = $scope.randomNumber(10, 99);
        
        accordionAddedObjectIndex.push(newObjectIndex.toString());
    }
    /*
     * To disappear the row from table  
     */
    $scope.removeRow = function (object, index) {
        var rowdeleteobj = $scope[object + "table"][index].z;
        var rowdeleteobjIndex = rowdeleteobj.split(',')[0].match(/\d+/g)[0]
        if ((parseInt(rowdeleteobjIndex) <= parseInt($scope[object + "tableOriginalIndexinnerIndex"]))) {
            angular.forEach(rowdeleteobj.split(','), function (delobject) {
                $scope.deleteobjects.push(delobject);
            })
        }
        angular.forEach($scope.newobjects, function (removelocal, innerindex) {
            if (removelocal.index == $scope[object + "table"][index].z) {
                $scope.newobjects.splice(innerindex, 1)
            }
        })
        $scope[object + "table"].splice(index, 1)

    }

    $scope.edit = function (event, formToopen) {
        localStorageService.set('hybrideditObject', event.currentTarget.id);
        localStorage.setItem('formeditobjects', event.currentTarget.id);
        if (event.currentTarget.id.match(/\.\d+/g) != null) {
            var array = modifyService.unique(event.currentTarget.id.match(/\.\d+/g));
            if (array.length > 2)
                var localstorageIndex = array.replace(/\./g, '')
            else if (array.length > 1)
                var localstorageIndex = array[1].replace(/\./g, '')
            else
                var localstorageIndex = array[0].replace(/\./g, '')
            localStorage.setItem('formIndex', localstorageIndex)
        }
        if(formToopen !== null && formToopen !== undefined){
            httpService.checkFileExists(formToopen, 'tableform').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/tableform/" + formToopen);
                    }
                    else{

                    }
            }).error(function(error){

            });
        }
		
    }
    /* To navigate to tablelist  from editable form mode when don't want to apply changes*/
    $scope.cancel = function () {
        localStorage.removeItem('internetEdit');
        localStorageService.remove('hybrideditObject');
        $("#Modify").attr('value', 'Add');
        $("#Modify").attr('id', 'Add');
    }
    /*  To show rows in table*/
        function tabledatapopulation(id, filterdata, tableId, urlobjs, depends, childtable, org_id) {
        console.log("tabledatap",id, filterdata, tableId, urlobjs, depends);
        console.log(localStorage.getItem('internetEdit'));
        if(depends != undefined && depends == "true" && localStorage.getItem('internetEdit') == undefined && childtable != true){
            return '';
        }
        /* Two support tablePlus with double '*' implementation, when reload the add page */
        if(tableId == "DeviceDynamicDNSClientHostname" && localStorage.getItem('formMode') == null && localStorage.getItem('Accordiontable') != "true")
            return '';

        if (localStorage.getItem('formMode') == null) {
            var urlobjarray = [];
            var urlobjpairarray = [];
            if (urlobjs != undefined) {
                urlobjs = urlobjs.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
                angular.forEach(urlobjs, function (urlobj) {
                    var urlobjObjects = {}
                    urlobjarray.push(urlobj.split(':')[0])
                    urlobjObjects[urlobj.split(':')[0]] = urlobj.split(':')[1];
                    urlobjpairarray.push(urlobjObjects);
                })
            }
            if (id != undefined) {
                var parentObj = '';
                var org_parentObj = '';
                var objectUrl = '';
                var PostObjectjsonName = '';
                var parameterlist = '';
                var org_parameterlist = '';
                console.log("id",id,modifyService.objectData(id));
                var tableObjectdata = modifyService.objectData(id)
                
                var jsonName = tableObjectdata.postObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                
                parameterlist = tableObjectdata.parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                
                var PostObjectjsonName = jsonName.split(',')
                if(childtable){
                    var org_tableObjectdata = modifyService.objectData(org_id);
                    var org_jsonName = org_tableObjectdata.postObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                    org_parameterlist = org_tableObjectdata.parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                    var org_PostObjectjsonName = org_jsonName.split(',')
                    console.log(org_PostObjectjsonName);
                }
                
                console.log(PostObjectjsonName);
                if (PostObjectjsonName.length < 0) {
                    var jsonName = postObjectName.split('.*')[0]
                    objectUrl = URL + httpService.get_url + '?Object=' + jsonName;
                }
                else
                {
                    var finalobjectstring = [];
                    objectUrl = URL + httpService.get_url +'?';
                    PostObjectjsonName.forEach(function (obj1) {
                        finalobjectstring.push(obj1.split('.*')[0])
                    });
                    //To find Duplicate objects while sending opjects with their parameters to server
                    var myarray = finalobjectstring;
                    PostObjectjsonName.forEach(function (obj) {
                        parentObj += obj.replace(/\./g, "").replace(/\*/g, "");
                    });
                    $scope[parentObj + "toggle"] = [];
//                    $scope[parentObj + "table"] = [];
                    if(childtable){
                        org_PostObjectjsonName.forEach(function (org_obj) {
                            org_parentObj += org_obj.replace(/\./g, "").replace(/\*/g, "");
                        });
                        $scope[org_parentObj + "toggle"] = [];
                        $scope[org_parentObj + "table"] = [];
                    }
                    if (urlobjarray.length > 0) {
                        angular.forEach(urlobjarray, function (delobj) {
                            var index = myarray.indexOf(delobj);
                            myarray.splice(index, 1)
                        })
                        myarray = modifyService.split(myarray);
                    }
                    else
                        myarray = modifyService.split(myarray);
                    var urlstatus = false;
                    myarray.forEach(function (obj) {
                        if (urlobjarray.indexOf(obj + ".*") < 0) {
                            objectUrl += 'Object=' + obj + ",";
                            urlstatus = true;
                        }
                    });
                }
                var urlarray = [];
                angular.forEach(urlobjpairarray, function (obj) {
                    urlarray.push($http.get(URL + obj[Object.keys(obj)[0]]))
                })
                var PostObjectjsonName1 = [];
//                tableparentobjects = {};
                tableparentobjects[tableId] = modifyService.aliasDependency(angular.copy(PostObjectjsonName));
                angular.forEach(tableparentobjects[tableId]['parents'], function (parentobject, doc) {
                    tableparentobjects[tableId]['parents'][doc] = modifyService.dotstarremove(parentobject, '.*')
                    parentobject = tableparentobjects[tableId]['parents'][doc]
                    if (tableparentobjects[tableId]["childrelation"][doc]["childrens"].length > 0) {
                        $scope[parentobject.replace(/\./g, "").replace(/\*/g, "") + "childrens"] = true;
                        $scope[parentobject.replace(/\./g, "").replace(/\*/g, "") + "childrenscount"] = tableparentobjects[tableId]["childrelation"][doc]["childrens"].length;
                    }
                    else
                        $scope[parentobject.replace(/\./g, "").replace(/\*/g, "") + "childrens"] = false;
                    $scope[parentobject.replace(/\./g, "").replace(/\*/g, "") + "table1"] = [];
                    $scope[parentobject.replace(/\./g, "").replace(/\*/g, "") + "count"] = [];
                })
                if (urlstatus) {
                    objectUrl = objectUrl.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                    urlarray.push($http.get(objectUrl));
                }
                $scope[tableId + "Id"] = [];
                  httpService.getAllData(urlarray).then(function (d) {
                    var respstatus, respdata;
                    angular.forEach(d, function (response) {
                        respstatus = response.status;
                        respdata = response.data;
                        if (response.status == 200)
                            $scope[tableId + "Id"] = $scope[tableId + "Id"].concat(response.data.Objects)
                    })
                    if (localStorage.getItem('multistatus') != null && localStorage.getItem('multistatus') == "true") {
                        var message = localStorage.getItem('multistatusmessage');
                        $scope[tableId + "popup"] = true;
                        $scope[tableId + "popupval"] = message;
                         localStorage.removeItem('multistatus');
                         localStorage.removeItem('multistatusmessage')
                    }
                    if (respstatus == 200) {
                        objects = $scope[tableId + "Id"];
                        var localobjects = objects;
                        var tablelocalobjects = [];
                        $scope.loopInRun = false;
                        if (localStorage.getItem('internetEdit') != null && localStorage.getItem('internetObject') != null) {
                            var intenetactiveobject = localStorage.getItem('internetObject').split(',')[0].replace(/(^[.\s]+)|([.\s]+$)/g, '');
                            var params = ["DNSServer", "Enable", "Interface"];
//                        angular.forEach(objects, function (object, ind) {
                            for (var obj = 0 ; obj <= localobjects.length - 1 && localobjects!=undefined && localobjects[obj]!=undefined ; obj++) {
                                var objectcontainstatus = false;
                                var post = 'Object=' + localobjects[obj].ObjName.substr(0, localobjects[obj].ObjName.length - 2) + "&Operation=Add";
                                var objectparams = localobjects[obj].Param;
                                angular.forEach(objectparams, function (param) {
                                    if (param.ParamName == "Interface") {
                                        post += "&" + param.ParamName + "=" + "Device.IP.Interface.cpe-WEB-IPInterface-" + localStorage.getItem('randomvalue');
                                    }
                                    else if (params.indexOf(param.ParamName) > -1) {
                                        post += "&" + param.ParamName + "=" + param.ParamValue;
                                    }
                                    if (param.ParamName == "Interface") {
                                        console.log(param.ParamValue)
                                        console.log(intenetactiveobject)
                                        if (param.ParamValue.replace(/(^[.\s]+)|([.\s]+$)/g, '') == intenetactiveobject){
                                            objectcontainstatus = true;
                                            tablelocalobjects.push(localobjects[obj])
                                        }else {
                                            localobjects.splice(obj, 1)
                                            obj--
//                                        ind--;
                                        }
                                    }
                                })
                                if (objectcontainstatus) {
                                    post["z"] = tableId + "table";
                                    $scope["tabarray"].push(post);
                                    if ($scope[tableId + "table"] == undefined)
                                        $scope[tableId + "table"] = [];
                                    $scope[tableId + "table"].push(post)
                                }
                            }
//                        )
//                        console.log(localobjects)
                            objects = localobjects;
//                            objects = tablelocalobjects;
                        }

                        PostObjectjsonName.forEach(function (replace1) {
                            var objectname = replace1;
                            objectname = modifyService.dotstarremove(objectname, '.*');
                            PostObjectjsonName1.push(objectname);
                        })
                        for (var i = 0; i < objects.length && objects!=undefined && objects[i]!=undefined; i++) {
                            var objectname = objects[i].ObjName;
                            var objectIndex = modifyService.getObjectIndex(objectname, '.*');
                            objectname = modifyService.dotstarremove(objectname, '.*');
                            if (PostObjectjsonName1.indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')) > -1) {
                                var parentcheck = tableparentobjects[tableId]['parents'].indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, ''));
                                if (parentcheck > -1) {
                                    var parIndex = tableparentobjects[tableId]['parents'].indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, ''));
                                    var temp = {};
                                    temp["objectname"] = objects[i].ObjName;
                                    temp["params"] = objects[i].Param;
                                    temp["childrens"] = [];
                                    $scope[tableparentobjects[tableId]['parents'][parIndex].replace(/\./g, "").replace(/\*/g, "") + "table1"].push(temp);
                                    if($scope[tableId+'_multiple'] == true || $scope.loopInRun == true){
                                        $scope[tableparentobjects[tableId]['parents'][parIndex].replace(/\./g, "").replace(/\*/g, "") + "count"].splice(0, 1);
                                        $scope.loopInRun = false;
                                    }                                        
                                    $scope[tableparentobjects[tableId]['parents'][parIndex].replace(/\./g, "").replace(/\*/g, "") + "count"].push($scope[tableparentobjects[tableId]['parents'][parIndex].replace(/\./g, "").replace(/\*/g, "") + "table1"].length - 1);
                                    $scope[tableparentobjects[tableId]['parents'][parIndex].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] = 0;
                                }
                                else {
                                    var childobjindex_global = 0;
                                    var childobjectname = objectname.split('.*');
                                    var indobj = '';
                                    for (j = 0; j < childobjectname.length; j++) {
                                        indobj += childobjectname[j] + ".*";
                                        var childobjindex = tableparentobjects[tableId]['parents'].indexOf(indobj);
                                        if (childobjindex > -1) {
                                            childobjindex_global = childobjindex;
                                        }
                                    }
                                    var tablelength = $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"].length - 1;
                                    var childrenobj = {};
                                    childrenobj["objectname"] = objects[i].ObjName;
                                    childrenobj["params"] = objects[i].Param;
                                    childrenobj["childrens"] = [];
                                    if (($scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "childobjects"] != undefined) && $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "childobjects"].indexOf(objectname) > -1) {
                                        $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"][tablelength]["childrens"][0]["childrens"].push(childrenobj);
                                    }
                                    else {
                                        var count = $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "count"][0];
                                        if ($scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] == undefined)
                                            $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] = 0;
                                        $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] += 1;
                                        if ($scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] == $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "childrenscount"] && ($scope[tableId+'_multiple'] == undefined || $scope[tableId+'_multiple'] != true)) {
                                            $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "count"].splice(0, 1);
                                            $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "runningcount"] = 0;
                                        }else{
                                            $scope.loopInRun = true;
                                        }
                                        if(count != undefined){
											
											if (localStorage.getItem("xml") == "adv_ssid" ||
	localStorage.getItem("xml") == "adv5_ssid" || 
	localStorage.getItem("xml") == "adv5_2_ssid") {
                                      var childPrentObjectName = childobjectname[0] + '.' + objectIndex;  
                                        for(var j = 0; j < $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"].length; j++) {
                                            if ($scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"][j].objectname === childPrentObjectName) {
                                                    $scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"][j]["childrens"].push(childrenobj);
                                                }
                                            }  
	}else{
		$scope[tableparentobjects[tableId]['parents'][childobjindex_global].replace(/\./g, "").replace(/\*/g, "") + "table1"][count]["childrens"].push(childrenobj);
	}
                                            
                                    	}
                                    }
                                }
                            }
                        }
                        $tds = parameterlist.split(',')
                        if(childtable)
                            $tds = org_parameterlist.split(',');
                        $scope.tabledata = [];
                        var tablelength = $scope[tableparentobjects[tableId]['parents'][0].replace(/\./g, "").replace(/\*/g, "") + "table1"].length
//                console.log($scope[tableparentobjects[tableId]['parents'][0].replace(/\./g, "").replace(/\*/g, "") + "table"])
                        function rowtable(index) {
                            var newrow = false;
                            var i = index;
                            var editdeleteobject = '';
                            var tot = {};
                            var tempobjectstatus = false;
                            angular.forEach(tableparentobjects[tableId]['parents'], function (doc, docIndex) {
                                /* Check ifparam condition in XML */
                                if (filterdata != undefined)
                                    var fparams = filterdata.split('&')
                                var obj = doc.replace(/\./g, "").replace(/\*/g, "")
                                editdeleteobject += $scope[obj + "table1"][i].objectname + ",";
                                var objectParamValues = $scope[obj + "table1"][i].params;
                                $.each($tds, function (index, element) {
                                    for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                        var param_name = objectParamValues[pa1].ParamName
                                        var ParamValue = objectParamValues[pa1].ParamValue
                                        if (filterdata != "" && filterdata != undefined) {
                                            for (fp = 0; fp < fparams.length; fp++) {
                                                var fp1 = fparams[fp];
                                                fp2 = fp1.split('__');
                                                if ((param_name == fp2[0].split('?')[1]) && (fp2[1] == ParamValue)) {
                                                    tempobjectstatus = true;
                                                }
                                            }
                                        }
                                        else {
                                            tempobjectstatus = true;
                                        }
                                        if ((modifyService.dotstarremove($scope[obj + "table1"][i].objectname, '.*') == modifyService.dotstarremove(element.split('?')[0]), '.*') && (element.split('?')[1] == param_name)) {
                                            var key = element.split('?')[0].replace(/\./g, "").replace(/\*/g, "")
//                                        if (dropdownParams.indexOf(key + "__" + param_name) > -1)
//                                            tot[key + "__" + param_name + "__dropdown"] = ParamValue;
//                                        else
//                                            tot[key + "__" + param_name + "__string"] = ParamValue;
                                            tot[key + "__" + param_name] = ParamValue;
                                            if ($routeParams.param2 == "multicast_mcconfiguration") {
                                                var paramvalues = ParamValue.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
                                                $scope.selectedUserIds = paramvalues;
                                            }
                                        }
                                    }
                                })

                                function childobject(chldarray) {
                                    var childrenarray = chldarray;
                                    for (j = 0; j < childrenarray.length; j++) {
                                        var obj = childrenarray[j].objectname.replace(/\./g, "").replace(/\*/g, "")
                                        editdeleteobject += childrenarray[j].objectname + ","
                                        var objectParamValues = childrenarray[j].params;
                                        $.each($tds, function (index, element) {
                                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                                var param_name = objectParamValues[pa1].ParamName
                                                var ParamValue = objectParamValues[pa1].ParamValue
                                                if ((modifyService.dotstarremove(childrenarray[j].objectname, '.*') == modifyService.dotstarremove(element.split('?')[0], '.*')) && (element.split('?')[1] == param_name)) {
                                                    var key = element.split('?')[0].replace(/\./g, "").replace(/\*/g, "")
//                                                if (dropdownParams.indexOf(key + "__" + param_name) > -1)
//                                                    tot[key + "__" + param_name + "__dropdown"] = ParamValue;
//                                                else
//                                                    tot[key + "__" + param_name + "__string"] = ParamValue;
                                                    tot[key + "__" + param_name] = ParamValue;
                                                }
                                            }
                                        })
                                    }
                                }
                                if ($scope[tableparentobjects[tableId]['parents'][docIndex].replace(/\./g, "").replace(/\*/g, "") + "childrens"]) {
                                    var childrenarray = $scope[obj + "table1"][i].childrens;
                                    if (childrenarray.length > 0) {
                                        if (tableparentobjects[tableId]['childrelation'][docIndex].childrens.length == childrenarray.length)
                                            childobject(childrenarray);
                                        else {
                                            $scope[obj + "table1"][i].childrens = childrenarray.splice(1);
                                            childobject(childrenarray);
                                            newrow = true;
                                        }
                                    }
                                    else {
                                        tempobjectstatus = false;
                                    }
                                }

                            })
                            tot['objectIndex'] = index + 1;
                            tot.z = editdeleteobject.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                            if ($routeParams.param2 == "multicast_mcconfiguration") {
                                angular.forEach(($scope.selectedUserIds), function (dropdownvalue) {
                                    if (dropdownvalue != '') {
                                        var mconfig = {};
                                        mconfig['UpStreamIntrfName'] = dropdownvalue;
                                        mconfig['z'] = tot.z
                                        $scope['tabledata'].push(mconfig)
                                    }
                                })
                            }
                            else {
                                if (tempobjectstatus || $scope[tableId+'_multiple'])
                                    $scope['tabledata'].push(tot);
                            }
                            if (newrow)
                                rowtable(i);
                        }
                        for (i = 0; i < tablelength; i++) {
                            rowtable(i);
                        }
                        if(childtable){
                            console.log('org_parentObj + "table"', org_parentObj + "table");
                            $scope[org_parentObj + "table"] = [];
                            $scope[org_parentObj + "table"] = $rootScope.remove_duplicates($scope['tabledata'])
                            if ($scope[org_parentObj + "table"] != undefined && $scope[org_parentObj + "table"].length > 0) {
                                $scope[org_parentObj + "tableOriginalIndex"] = $scope['tabledata'].length;
                                $scope[org_parentObj + "tableOriginalIndexinnerIndex"] = $scope[org_parentObj + "table"][$scope['tabledata'].length - 1].z.split(',')[0].match(/\d+/g)[0];
                            }
                        }else{
                            console.log('parentObj + "table"', parentObj + "table");
                            $scope[parentObj + "table"] = [];
                            $scope[parentObj + "table"] = $rootScope.remove_duplicates($scope['tabledata'])
                            if ($scope[parentObj + "table"] != undefined && $scope[parentObj + "table"].length > 0) {
                                $scope[parentObj + "tableOriginalIndex"] = $scope['tabledata'].length;
                                $scope[parentObj + "tableOriginalIndexinnerIndex"] = $scope[parentObj + "table"][$scope['tabledata'].length - 1].z.split(',')[0].match(/\d+/g)[0];
                            }
                        }
                        
                        if(localStorage.getItem('Accordiontable') == "true"){
                            localStorage.removeItem('Accordiontable')
                            localStorage.removeItem('Accordiontableindex')
                        }

                    }
                    else if (respstatus == 203) {
                        $scope[tableId + "popup"] = true;
//                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                        $scope[tableId + "popupval"] = "Object level failure for form 203"
                    }
                    else if (respstatus == 206) {
                        $scope[tableId + "popup"] = true;
                        var popupmessage = '';
                        angular.forEach(respdata.Objects, function (object) {
                            angular.forEach(object.Param, function (param) {
                                if (param.ParamId == "-1")
                                    popupmessage += param.ParamName + ":" + param.ParamValue;
                            })
                        })
                        $scope[tableId + "popupval"] = popupmessage;
                    }
                })
            }
        }
    }
    
    $timeout(function(){
        $scope.tableCount.forEach(function (tableAttributes) {
            var id = tableAttributes.id;
            if ($("#" + id).attr('polling')) {
                   id = tableAttributes.id;

                function tablePollingFunction(){
                     tabledatapopulation(tableAttributes.formattr, $("#" + id).attr('filterdata'), id, $("#" + id).attr('urlobjs'), $("#" + id).attr('depends'))

                }

                function tableFinalPollingFunction(){
                    tabletimeoutarray.push($timeout(tablePollingFunction).then(tabletimeoutrepeatarray.push($timeout(tableFinalPollingFunction,$("#" + id).attr('interval')))
                    ))



                }

                tableFinalPollingFunction();

            }
            /**
             *  If onload ="false" then loadstatus value will be false.
             *  Default data won't work
             *  Data load control be parent object
             * 
             **/
            if ($("#" + id).attr('loadstatus') != "false") {
                tabledatapopulation(tableAttributes.formattr, $("#" + id).attr('filterdata'), id, $("#" + id).attr('urlobjs'), $("#" + id).attr('depends'))
            }
            if ($("#" + id).attr('iconicparams') != undefined && $("#" + id).attr('iconicparams') != '')
                iconicparams += $("#" + id).attr('iconicparams').replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
        })
    },0);
			
    $scope.sectionstatus = "1";
    /**
     * dependent, scope level function
     * To fill the dropdown values when cursor moved to dropdown
     * Function with promised return
     * @params: 
     * param1 Objectname
     * param2 object param name
     * param3 digits/index/'*' removed objectname
     * validvaluesstatus : flag used to fill the dropdown : true/false
     * @returns Promise object
     * Used in internet page
     * 
     * */
    $scope.dependent = function (param1, param2, param3, validvaluesstatus) {
        var deferred = $q.defer();
        if ($scope.dropdownMouseoverstatus) {
            if ($scope["temp"]["Mode"] == "ATM") {
                if ($scope["DeviceATMLink"]["LinkType"] != undefined) {
                    //To fill Connection type dropdown when mode is "ATM"
                    $scope[param2] = atmlinktype[$scope["DeviceATMLink"]["LinkType"]]
                    //To select first value
                    $scope["temp"]["Protos"] = $scope[param2][0].id;
                }
                else {
                    //Throws alert when Link Type is empty
                    $scope[param2] = [];
                    alert("Please Select Link Type to Select Protos");
                }
                //Promise resolve
                deferred.resolve('');
            } else {
                httpService.getDataWithFormedURL(URL + param1.replace('*', $scope[param2 + "Index"]) + "&" + param2 + "=").
                        success(function (data, status, headers, config) {
                            var dropdowndata = data.Objects;
                            var temparray = [];
                            temparray.push({"id": "Select", "name": "Select"});
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
                            $scope[param2] = temparray;
                            if ($scope['temp'] == undefined)
                                $scope['temp'] = {};
                            $scope['temp'][param2] = temparray[0].id;
                            if (validvaluesstatus == "true") {
                                $scope[param3][param2] = temparray[1].id;
                            }
                            //Promise resolve
                            deferred.resolve('');
                        })
                        .error(function (data, status, headers, config) {
                            //Promise resolve
                            deferred.resolve('');
                        });
            }
        }
        $scope.dropdownMouseoverstatus = false;
        //return Promise
        return deferred.promise;
    }
    /* To navigate to next section in  Carousel */
    $scope.macFilterApply = function (event) {
         if ($scope.notifications.length > 0) {
            notificationstatus = false;
            $scope.notificationcall("macFilter");
            notificationdataargs.push(event);
        }
        if (changedFields.length > 1 | $scope.deleterow && notificationstatus) {
            $scope.formsubmitstatus = true;
            var formname = event.currentTarget.attributes['formname'].value + "_form";
            if ($scope[formname].$valid) {
                $('#ajaxLoaderSection').show();
                var url = URL + httpService.set_url;
                var post = '';
                var PostObjectjsonName = '';
                var tableObjects = event.currentTarget.attributes['source'].value.split('&')
                angular.forEach(tableObjects, function (doc) {
                    PostObjectjsonName += doc.split('?')[0] + ",";
                     $scope[doc.split('?')[0] + "params"] = doc.split('?')[1].split();
                });
                var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                var formObject = source.split(',');
                formObject = modifyService.unique(formObject)
                var position = formObject.indexOf('temp')
                if (position > -1)
                    formObject.splice(position, 1);
                angular.forEach(formObject, function (obj) {
                    post += "?" + "Object=" + obj.replace('*', $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]) + "&Operation=Modify";
                    if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
	                   angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                            if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"] != undefined | $scope.deleterow && $scope[obj + "params"].indexOf(key) <= -1) {
                               var keyvalue = '';
                                angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"], function (rowobj) {
                                    keyvalue += encodeURIComponent($sanitize(rowobj[obj.replace(/\./g, "").replace(/\*/g, "") + "__" + key]).replace(/<[^>]+>/gm, '')) + ",";
                                })
                                post += "&" + key + "=" + $sanitize(keyvalue.replace(/(^[,\s]+)|([,\s]+$)/g, '')).replace(/<[^>]+>/gm, '') + ","
//                                delete $scope[obj.replace(/\./g, "").replace(/\*/g, "")][key + "status"]
                            }
                            else {
                            
                                if (changedFields.indexOf(obj.replace(/\./g, "").replace(/\*/g, "") + key) > -1)
                                    post += "&" + key + "=" + $sanitize($scope[obj.replace(/\./g, "").replace(/\*/g, "")][key]).replace(/<[^>]+>/gm, '')
                            }
                        });
                        if(notificationpost !== undefined && notificationpost !== null && notificationpost !== ''){
                            post = post + '&' + notificationpost;
                        }
                    }
                })
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '')
//            modifyService.setRequest(url, post)
                modifyService.genericRequest(url, post, function (response) {
                    var formname = event.currentTarget.attributes['formname'].value;
                    errorResponseDisplay(formname, response);
                    var status = response.status;
                    if (status == 200) {
                        angular.forEach(formObject, function (obj) {
                            if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
                                   angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                                    if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"] != undefined ) {
                                        delete $scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"]
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        else if(notificationstatus){
            alert("No params changed to update");
        }
    }
    
    /**
     * Flog to check whether relationalForm submited or not.
     * true  - Not submited
     * false - Already submitted
     */
    $scope.relationalFormsApply = true;
    /*
     * relationalFormsApply
     * To fullfil all below requirements new custom function relationalFormsApply and 
     * XML parameter type="submitbutton" is used for submit but new attribue added relationname.
     * 
     * All pages which are having child & parent relationship at table and form level
     * are may have multiple forms and tables (Editabletable and tablePlus) 
     * and won't support default apply, needs a custom apply.
     *      
     * On apply we will get all form names combinedly as a single string 
     * in event and it's not possible seperate forms to validate, So all forms fails.
     * which are need to be done by using formname for individual forms.
     * 
     * Used to perform apply operation for all hotSpot pages
     * Using default Apply function we can apply but validation won't work which leads other failures.
     * HotSpot pages have multiple forms but single Apply, So on Apply this function is used.
     * 
     * New button implemented type="relationsubmitbutton", which will help to seperate all forms.
     * 
     */
    $scope.relationalFormsApply = function (event) {
        $rootScope.initialtime=Date.now();
        console.log("changedFields",changedFields,$scope.deleterow);
        if (changedFields.length >= 1 || $scope.deleterow) {
            $scope.formsubmitstatus = true;
            $scope.valid = true;
            var relationalformnames = event.currentTarget.attributes['relationformname'].value.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',') ;
            /**
             * To validate all forms available in the page.
             * If any one of the form fails then global form submition got stoped.
             */ 
            angular.forEach(relationalformnames, function(relationalformname){
                if($scope[relationalformname + "_form"] !== undefined){
					if(!$scope[relationalformname + "_form"].$valid)
						$scope.valid = false;
				}
            })
            //When forms are valid
            if ($scope.valid) {
                $('#ajaxLoaderSection').show();
                var url = URL + httpService.set_url;
                var post = '';
                var PostObjectjsonName = '';
                var tableObjects = event.currentTarget.attributes['source'].value.split('&')
                angular.forEach(tableObjects, function (doc) {
                    PostObjectjsonName += doc.split('?')[0] + ",";
                     $scope[doc.split('?')[0] + "params"] = doc.split('?')[1].split(',');
                     console.log(doc.split('?')[0] + "params", doc.split('?')[1].split(','));
                });
                var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                var formObject = source.split(',');
                formObject = modifyService.unique(formObject)
                var position = formObject.indexOf('temp')
                if (position > -1)
                    formObject.splice(position, 1);
                console.log("formObject",formObject,tableObjects);
                var currentpost = "";
                /*
                 * To generate post for modified fields.
                 */
                angular.forEach(formObject, function (obj) {
                    console.log('$scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]',obj,$scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"],obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex");
			
                    post += "&Object=" + obj.replace('*', $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]) + "&Operation=Modify";
                    currentpost += "&Object=" + obj.replace('*', $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]) + "&Operation=Modify";
                    console.log($scope[obj.replace(/\./g, "").replace(/\*/g, "")],'$scope[obj.replace(/\./g, "").replace(/\*/g, "")]');
                    if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
	                   angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                               console.log(key,$scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"], $scope.deleterow,obj + "params", $scope[obj + "params"].indexOf(key));
                               /**
                                * To validate the fields of the Editable.
                                * Editable consists of comma seperated values
                                * of single parameter in an object.
                                * To make post for Editable tables.
                                */
                            if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"] != undefined | $scope.deleterow && $scope[obj + "params"].indexOf(key) <= -1) {
                               var keyvalue = '';
                                angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"], function (rowobj) {
                                    keyvalue += rowobj[obj.replace(/\./g, "").replace(/\*/g, "") + "__" + key] + ",";
                                })
                                post += "&" + key + "=" + $sanitize(keyvalue.replace(/(^[,\s]+)|([,\s]+$)/g, '')).replace(/<[^>]+>/gm, '') + ","
                            }
                            else {
                            
                                if (changedFields.indexOf(obj.replace(/\./g, "").replace(/\*/g, "") + key) > -1)
                                    post += "&" + key + "=" + $sanitize($scope[obj.replace(/\./g, "").replace(/\*/g, "")][key]).replace(/<[^>]+>/gm, '')
                            }
                        })
                    }
                })
                if(post === currentpost)
                    post = '';
                post = post.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                post = post.replace('&', '');
                console.log("post",post);
                console.log($scope.tabarray,"$scope.tabarray")
                /*
                 * $scope.tabarray have all the modifications done in tableplus.
                 * post information related to
                 * deleted row and new row and modified row
                 * available in $scope.tabarray.
                 */
                post += "&";
                if ($scope.tabarray.length > 0 ) {
                    angular.forEach($scope.tabarray, function (postobject) {
                        var postobjectsplit = postobject.split('&');
                        postobjectsplit = postobjectsplit[0].split('Object=');
                        console.log("postobjectsplit",postobjectsplit,postobjectsplit[1].replace(/\./g, "").replace(/\*/g, ""),$scope[postobjectsplit[1].replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]);
                        postobject = postobject.replace('*',$scope[postobjectsplit[1].replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]);
                        post += postobject + "&"
                    })
                }
                post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
                console.log("post",post);
                /*
                 * To generate post for accordion.
                 * post information related to
                 * deleted row and new row and modified row
                 * available in $scope.newobjects and $scope.changedobjects 
                 * and $scope.deleteobjects respectivley.
                 * new row      === $scope.newobjects
                 * modified row === $scope.changedobjects
                 * deleted row  === $scope.deleteobjects
                 */
                var postObjects = $scope.changedobjects;
                var modifiedpost = '';
                //To remove Duplicate Objects from Array
                postObjects = $rootScope.remove_duplicates(postObjects);
                //Post generation for modified fields
                angular.forEach(postObjects, function (rowobject) {
                    var obj2 = rowobject.objects.split(',');
                    obj2.forEach(function (object, objindex) {
                        var postBefore = "Object=" + object + "&Operation=Modify";
                        if ($scope[object.replace(/\./g, "")] != undefined) {
                            var postformat = $rootScope.poststringformat(object.replace(/\./g, ""), $scope[object.replace(/\./g, "")], changedFields, 0, $scope.objectstatus);
                            console.log(postformat)
                            if (postformat[0]) {
                                modifiedpost += postBefore + postformat[1] + "&";
                            }
                        }
                    })
                })
                
                //Post generation for new objects
                var newpost = '';
                console.log("$scope.newobjects",$scope.newobjects);
                angular.forEach($scope.newobjects, function (addObj) {
                    if (addObj.hasOwnProperty('modifiedParameters')) {
                        $scope.finalobjects = addObj["modifiedParameters"].split(',')
                        $scope.finalobjects.pop();
                        console.log("finalobjects",$scope.finalobjects);
                        angular.forEach($scope.finalobjects, function (key, keyindex) {
                            console.log(key.replace(/[^a-zA-Z0-9_-]/g, ''),$scope[key.replace(/[^a-zA-Z0-9_-]/g, '')]);
                            newpost += "Object=" + addObj.relation[keyindex].Object + "&Operation=" + addObj.relation[keyindex].Operation
                            angular.forEach($scope[key.replace(/[^a-zA-Z0-9_-]/g, '')], function (value, key1) {
								// decoding for accordion double encoding
								var newvalue=decodeURIComponent(value);
                                newpost += "&" + key1 + "=" + encodeURIComponent($sanitize(newvalue).replace(/<[^>]+>/gm, '')) + "";
                            })
                            newpost += "&";
                        })
                    }
                    else {
                        newpost += addObj.post;
                    }
                })
                
                //Post generation for modified objects
                var delpost = '';
                angular.forEach(modifyService.split($scope.deleteobjects), function (delobj) {
                    delpost += "Object=" + delobj + "&Operation=Del" + "&";
                })
                var finalPost = (modifiedpost + newpost + delpost).replace(/(^[&\s]+)|([&\s]+$)/g, '');
                post += '&'+finalPost;
                console.log("finalPost",finalPost,post);   
                
                if(post == '' || post == '&'){
                    $('#ajaxLoaderSection').hide();
                    alert("no params changed to update");
                    return;
                }
                     
                /*
                 * Final form submition.
                 * cgi_get call made to DUT.
                 */
                $scope['relationalFormsPost'] = post;
                modifyService.genericRequest(url, post, function (response) {
                    $('#ajaxLoaderSection').hide();
                    var formnames = event.currentTarget.attributes['relationformname'].value.split(',');
                    formname = formnames[0] == 'temp' ? formnames[1] : formnames[0];
                    console.log("forname",formname)
                    errorResponseDisplay(formname, response)
                    var status = response.status;
                    if (status == 200) {
                        angular.forEach(formObject, function (obj) {
                            if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
                                   angular.forEach($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (value, key) {
                                    if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"] != undefined ) {
                                        delete $scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"]
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        else {
            alert("no params changed to update");
        }
    }
    
    $scope.macrowApply = function (event) {
        var showstatusvariable = event.currentTarget.attributes['showstatus'].value;
        var tableObjects = event.currentTarget.attributes['source'].value.replace(/(^[,\s]+)|([,\s]+$)/g, '').split('&')
        var PostObjectjsonName = '';
        var params = [];
        angular.forEach(tableObjects, function (doc) {
            PostObjectjsonName += doc.split('?')[0] + ",";
            params.push(doc.split('?')[1])
        });
        var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
        var formObject = source.split(',');
        formObject = modifyService.unique(formObject)
        var position = formObject.indexOf('temp')
        if (position > -1)
            formObject.splice(position, 1);
        var totalobj = '';
        var index = '';
        var tableobj = '';
        $scope['formsubmitstatus'] = true;
        if (event.currentTarget.attributes['formname'] !== undefined && !$scope[event.currentTarget.attributes['formname'].value + "_editabletableform"].$valid) {
            $scope['DeviceWiFiAccessPointX_LANTIQ_COM_Vendor_editabletableform.DeviceWiFiAccessPointX_LANTIQ_COM_Vendor_MACAddressControlList.$error.pattern']=true;
            $scope['formsubmitstatus'] = true;
            return '';
        }
        angular.forEach(formObject, function (obj) {
            tableobj = obj;
            index = $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"]
            totalobj += obj.replace('*', $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"])
        })
        var tempobject = {};
        if (index != undefined) {
            angular.forEach(formObject, function (obj) {
                if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
                    $.each($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (key, value) {

                        if (changedFields.indexOf(obj.replace(/\./g, "").replace(/\*/g, "") + "" + key) > -1 && params.indexOf(key) > -1) {
                            $scope[obj.replace(/\./g, "").replace(/\*/g, "")+ "_status_" + key + "changed"] = "changed";
                            $sanitize(tempobject[obj.replace(/\./g, "").replace(/\*/g, "") + "__" + key] = $scope[obj.replace(/\./g, "").replace(/\*/g, "")][key]).replace(/<[^>]+>/gm, '')
                        }
                    });
                    tempobject['z'] = obj.replace('*', $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "dropdownIndex"])
                }
                console.log(tempobject);
                $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"].push(tempobject)
                $scope.rowcancel(showstatusvariable)
                $scope[obj.replace(/\./g, "").replace(/\*/g, "")][params[0]] = '';
            })
        }
        else {
            $scope.rowcancel(showstatusvariable)
            $scope[tableobj.replace(/\./g, "").replace(/\*/g, "")][params[0]] = '';
        }
    }
    $scope.deleterow = false;
    $scope.deletemacrow = function (user, index) {
        $scope.deleterow = true;
        var objectname = modifyService.dotstarremove(user.z, '').replace(/\./g, "").replace(/\*/g, "")
        $scope[Object.keys(user)[0].split('__')[0]][Object.keys(user)[0].split('__')[1]] = '';
        $scope[objectname + "table"].splice(index, 1)
    }

    $scope.dynDnsApply = function (param1, elementstatus, tableobject) {
        console.log(param1);
        localStorage.removeItem('formMode');
        $scope.formsubmitstatus = true;
        if ($scope.notifications.length > 0) {
            notificationstatus = false;
            $scope.notificationcall();
            notificationdataargs.push(param1);

            notificationdataargs.push(elementstatus);
            notificationdataargs.push(tableobject);
        }
        if ((param1.currentTarget.attributes['formname'] == undefined || $scope[param1.currentTarget.attributes['formname'].value + "_form"].$valid) && notificationstatus) {
            $('#ajaxLoaderSection').show();
            var formstatus = localStorageService.get('hybrideditObject');
            localStorageService.remove('hybrideditObject');
            var hparamscount = 0;
            if (param1.currentTarget.attributes['hiddenparams'] != undefined)
            {
                angular.forEach(param1.currentTarget.attributes['hiddenparams'].value.replace(/\&$/, '').split('&'), function (hiddenobject) {
                    if (hiddenobject.split('?')[1] != "") {
                        var hobjectname = hiddenobject.split('?')[0].replace(/\./g, "").replace(/\*/g, "")
                        var hparameters = hiddenobject.split('?')[1].replace(/\,$/, '').split(',')
                        angular.forEach(hparameters, function (hparam) {
                            if (changedFields.indexOf(hobjectname + "" + hparam.split('__')[0]) <= -1) {
                                hparamscount += 1;
                                changedFields.push(hobjectname + "" + hparam.split('__')[0]);
                                if ($scope[hobjectname] == undefined)
                                    $scope[hobjectname] = {};
                                if (hparam.split('__')[0] != "" && formstatus == null)
                                    $scope[hobjectname][hparam.split('__')[0]] = hparam.split('__')[1];
                            }
                        })
                    }
                })
            }
            $scope.open = false;
            
            var PostObjectjsonName = '';
            var tableObjects = param1.currentTarget.attributes['source'].value.split('&')
            angular.forEach(tableObjects, function (doc) {
                PostObjectjsonName += doc.split('?')[0] + ",";
            });
            var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
            var individualObject = '';
            var formObject = source.split(',');
            formObject = modifyService.unique(formObject)
            /*  Alias Logic */
            var aliasObjects = modifyService.aliasDependency(angular.copy(formObject))
            console.log(aliasObjects,"aliasObjects");
            var aliasParents = aliasObjects.parents;
            var aliasrelations = aliasObjects.childrelation;
            var position = formObject.indexOf('temp')

            if (position > -1)
                formObject.splice(position, 1);
            angular.forEach(formObject, function (objstring) {
                individualObject += objstring.replace(/[^a-zA-Z0-9_-]/g, '') + ",";
            });
            value = localStorageService.get('hybrideditObject')
            if (value != null) {
                source = value;
            }
            var obj2 = individualObject.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
            var post = '';
            var uniqueObjects = modifyService.unique(formObject);
            formObject = modifyService.split(formObject);
            var operation = '';
            var changedfieldscount = 0;
            console.log(aliasrelations);
            obj2.forEach(function (object, objindex) {
                var combineobject = '';
                console.log(" param1.currentTarget.id", param1.currentTarget.id, localStorage.getItem('dyndnsClientEdit'))
                operation = localStorage.getItem('dyndnsClientEdit') != undefined && localStorage.getItem('dyndnsClientEdit') == "true" ? "Modify" : param1.currentTarget.id;
                if (param1.currentTarget.id == "Add") {
                    var aliasStatus = true;
                    /* Alias Logic */
                    combineobject = uniqueObjects[objindex];
                    var parentIndex = aliasParents.indexOf(combineobject);
                    console.log(parentIndex,"parentIndex",(parentIndex > -1) , (aliasrelations[parentIndex].childrens.length >= 1))
                    if (((parentIndex > -1) && (aliasrelations[parentIndex].childrens.length >= 1)) || $scope.tabarray.length > 0) {
                        if (localStorage.getItem('dyndnsClientEdit') == "true")
                            aliasStatus = false;
                        if (!(aliasrelations[parentIndex].hasOwnProperty('Alias'))) {
                            if ($scope.randomvalue == undefined)
                                $scope.randomvalue = $scope.randomNumber(10, 99)
                            aliasrelations[parentIndex].Alias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                            $scope.presentparentAlias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                            changedFields.push(object + "" + "Alias")
                            if ($scope[object] == undefined)
                                $scope[object] = {};
                            console.log(aliasStatus,'aliasStatus')
                            if (aliasStatus)
                                $scope[object]["Alias"] = aliasrelations[parentIndex].Alias;
                        }
                        combineobject = combineobject.split('.*')[0]
                    }
                    else {
                        if (parentIndex > -1)
                            combineobject = combineobject.split('.*')[0]
                        else {
                            if (!(combineobject.slice(-1) == "*"))
                                operation = "Modify";
                            combineobject = combineobject.replace('*', (aliasrelations[(aliasParents.indexOf(combineobject.split('.*')[0] + ".*"))].Alias)).split('.*')[0]
                        }
                    }

                }
                else {
                    var objectstring = uniqueObjects[objindex].split('.*')

                    if (objectstring[objectstring.length - 1 ] == "")
                        objectstring.splice(objectstring.length - 1);
                    if (objectstring.length < 2)
                        combineobject += objectstring[0];
                    else {
                        objectstring.forEach(function (doc2) {
                            combineobject += doc2;
                        })
                    }
                }
                var selectedvalues = '';
                if ($routeParams.param2 == "multicast_mcconfiguration" && param1.currentTarget.id == "Add") {
                    changedfieldscount += 1;
                    angular.forEach($scope.selectedUserIds, function (id) {
                        if (id != '')
                            selectedvalues += id + ","
                    })
                    post += "Object=" + combineobject + "&Operation=Modify&UpStreamIntrfName=" + selectedvalues.replace(/\,$/, '')
                    post = post.replace(/\,$/, '');
                }
                else {
                    var postBefore = "Object=" + combineobject + "&Operation=" + operation;
                    var arrobj1 = object
                    if ($scope[arrobj1] != undefined) {
                        var postformat = $rootScope.poststringformat(arrobj1, $scope[arrobj1], changedFields, changedfieldscount, $scope.objectstatus);
                        if (postformat[0]) {
                            post += postBefore + postformat[1] + "&";
                        }
                        changedfieldscount = postformat[2];
                    }

                }
            });
            console.log($scope.tabarray,"$scope.tabarray")
            if ($scope.tabarray.length > 0 ) {
                angular.forEach($scope.tabarray, function (postobject) {
                    changedfieldscount += 1;
                    console.log(postobject,"postobject",$scope.presentparentAlias,changedfieldscount)
                    postobject = postobject.replace('*',$scope.presentparentAlias);
                    post += postobject + "&"
                })
            }
//            post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
            post = post + notificationpost.replace(/\&$/, '');
            if (elementstatus != true) {
                console.log(changedfieldscount , hparamscount, "changedfieldscount > hparamscount");
                if (changedfieldscount > hparamscount) {
                    var formname = param1.currentTarget.attributes['formname'].value;
                    var componentname = param1.currentTarget.attributes['formname'].value;
                    httpService.setData(post).
                            success(function (data, status, headers, config) {
//                                status = 203;
                                    $scope[componentname + "popup"] = false;
                                $('#ajaxLoaderSection').hide();
                                if (status == 200) {
                                    notificationpost = '';
                                    changedFields = [];
                                    errormessages = [];
                                    localStorageService.remove('hybrideditObject');
                                    localStorage.removeItem('dyndnsClientEdit');
                                    $scope.objectstatus = []

//                                alert(localStorage.getItem('previouspagetype').contains("custom"))
                                    if (elementstatus != undefined && (localStorage.getItem('previouspagetype').indexOf("custom") != -1)) {
                                        $scope.customCancel(elementstatus);
                                    }
                                    else {
                                        if (elementstatus != undefined) {
                                            $scope.Add(elementstatus)
                                        }
                                        else {
                                            if (param1.currentTarget.attributes["componenttype"] != undefined && param1.currentTarget.attributes["componenttype"].value == 'tablePlus')
                                                $route.reload();
                                            else {
                                                var formid = param1.currentTarget.attributes["formname"].value;
                                                var formdata = $("#" + formid).attr('name1');
                                                var urlobjs = $("#" + formid).attr('urlobjs');
                                                $scope.formsubmitstatus = false;
						angular.forEach(previoousmessages, function (errormsg) {
                                                $scope[errormsg] = false;
                                                })
                                                formdatapopulation(formdata, formid, urlobjs);
                                            }
                                        }
                                    }
                                }
                                else if (status == 203) {
                                            if (previoousmessages.length > 0) {
                                                angular.forEach(previoousmessages, function (errormsg) {
                                                    $scope[errormsg] = false;
                                                })
                                            }
                                    $scope[componentname + "popup"] = true;
                                    $scope[componentname + "popupval"] = data.Objects[0].Param[0].ParamValue
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
                                    var formname = param1.currentTarget.attributes['formname'].value;
                                    var popupmessage = '';
                                    $scope[formname + "popupval"] = '';
                                    angular.forEach(data.Objects, function (object) {
                                        var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                                        if (param1.currentTarget.attributes["componenttype"] != undefined && param1.currentTarget.attributes["componenttype"].value == 'tablePlus') {
                                            $scope[formname + "popup"] = true;
                                            angular.forEach(object.Param, function (param) {
                                                popupmessage += param.ParamValue;
                                            })
                                            $scope[formname + "popupval"] += popupmessage;
                                        }
                                        else {
                                            if (previoousmessages.length > 0) {
                                                angular.forEach(previoousmessages, function (errormsg) {
                                                    $scope[errormsg] = false;
                                                })
                                            }
                                            previoousmessages = [];
                                            angular.forEach(object.Param, function (param) {
                                                previoousmessages.push(respobject + "_" + param.ParamName + "responsestatus");
                                                $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                                $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue
                                                errormessages.push(param.ParamValue)
                                            })
                                        }
                                    });
                                }

                            }).
                            error(function (data, status, headers, config) {
                                changedFields = [];
                                $('#ajaxLoaderSection').hide();
                                $scope.formsubmitstatus = false;
                            });
                }
                else {
					//Need to check it
                    //$scope.formsubmitstatus = false;
                    alert("None of the  Parameters have changed to update");
                    $('#ajaxLoaderSection').hide();
                }
            }
            else {
                var temp = {};
                var string = '';
                angular.forEach(uniqueObjects, function (trobject) {
                    string += trobject.replace(/\*/g, $scope[tableobject + "tableOriginalIndex"]) + ","
                })
                string += "new"
                temp.index = string;
                temp.post = post.replace(/&Object/g, ",Object");
                $scope.newobjects.push(temp);
                $scope.rowcancel(param1.currentTarget.attributes['showstatus'].value);
                $('#ajaxLoaderSection').hide();
            }
        }
        else {
            param1.preventDefault();
        }

    }
    
    $scope["internetclick"] = true;
    $scope.internetApply = function (param1, formtoopen) {
        var formmodestatus = localStorage.getItem('internetEdit');

        if (formmodestatus == "true") {

            $(':input:visible:not(.offscreen)').each(function (i) {

                if ($(this).attr('ng-model') !== undefined) {

                    var modelpair = $(this).attr('ng-model').split('.');
                    var vlan = "DeviceEthernetVLANTerminationVLANID";
                    if ($scope[modelpair[0]] != undefined && $scope[modelpair[0]][modelpair[1]] != undefined) {

                        if (changedFields.indexOf(modelpair[0] + modelpair[1]) == -1) {

                            if (modelpair[0] + modelpair[1] == vlan)
                                $scope.textChange(modelpair[0] + "__" + modelpair[1], $scope[modelpair[0]][modelpair[1]])
                            else
                                changedFields.push(modelpair[0] + modelpair[1]);
                        }
                    }
                }
                console.log(changedFields);
            });
        }
        else {
            $(':input:visible:not(.offscreen)').each(function (i) {
                if ($(this).attr('ng-model') !== undefined) {
                    var modelpair = $(this).attr('ng-model').split('.');
                    if ($scope[modelpair[0]] != undefined && $scope[modelpair[0]][modelpair[1]] != undefined) {
                        if (changedFields.indexOf(modelpair[0] + modelpair[1]) == -1 && $scope[modelpair[0]][modelpair[1]] != '')
                            changedFields.push(modelpair[0] + modelpair[1]);
                    }
                }
            })
        }

        localStorage.removeItem('formMode');
        $scope.formsubmitstatus = true;
        if (param1.currentTarget.attributes['formname'] == undefined || $scope[param1.currentTarget.attributes['formname'].value + "_form"].$valid) {
            $('#ajaxLoaderSection').show();
            console.log($scope["internetclick"])
	        var post = '';
            if ($scope["internetclick"]) {
                console.log($scope["internetclick"])
                var PostObjectjsonName = '';
                var tableObjects = param1.currentTarget.attributes['source'].value.split('&')
                angular.forEach(tableObjects, function (doc) {
                    PostObjectjsonName += doc.split('?')[0] + ",";
                });
                var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                var individualObject = '';
                var formObject = source.split(',');
                formObject = modifyService.unique(formObject)
                var element = $scope['temp']['Protos']
//                var elem = $("div[child='" + element + "']").find('div.ng-hide input')
                var elem = [];
                if(element.toLowerCase().indexOf('bridge') == -1)
                    elem = $("div[child='allmodes']").find('div.ng-hide input');
                if($scope["DeviceEthernetVLANTermination"]["Enable"] != undefined && $scope["DeviceEthernetVLANTermination"]["Enable"] == 1){
                    var commonElems = $("div[child='common']").find('div.ng-hide input');
                    angular.forEach(commonElems, function (commonElem) {
                        elem.push(commonElem);
                    });
                }
                if($("div[child='"+ element +"']").find('div.ng-hide input') != undefined ){
                    var ProtoElems = $("div[child='"+ element +"']").find('div.ng-hide input')
                    angular.forEach(ProtoElems, function (protoElem) {
                        protoElem.attributes["mode"] = "nomode";
                        console.log(protoElem.attributes["mode"],protoElem)
                        elem.push(protoElem);
                    });
                    if($scope['temp']['Mode'] == "ATM"){
                        var ProtoElems = $("div[child='ATM-modes']").find('div.ng-hide input')
                        angular.forEach(ProtoElems, function (protoElem) {
                            elem.push(protoElem);
                        });
                        ProtoElems = $("div[child='ATM']").find('div.ng-hide input')
                        angular.forEach(ProtoElems, function (protoElem) {
                            elem.push(protoElem);
                        });
                    }
                    if($scope["DeviceEthernetVLANTermination"]["Enable"] != undefined && $scope["DeviceEthernetVLANTermination"]["Enable"] == 1 && element.toLowerCase().indexOf('bridge') > -1){
                        var commonElems = $("div[child='common']").find('div.ng-hide input');
                        angular.forEach(commonElems, function (commonElem) {
                            elem.push(commonElem);
                        });
                    }
                }
                if(element.toLowerCase().indexOf('bridge') > -1 && $scope['temp']['Mode'] == "ATM"){
                    elem = [];
                    elem = $("div[child='ATM-Bridge']").find('div.ng-hide input');
                    if($scope["DeviceEthernetVLANTermination"]["Enable"] != undefined && $scope["DeviceEthernetVLANTermination"]["Enable"] == 1 && element.toLowerCase().indexOf('bridge') > -1){
                        var commonElems = $("div[child='common']").find('div.ng-hide input');
                        angular.forEach(commonElems, function (commonElem) {
                            elem.push(commonElem);
                        });
                    }
                }
                var aliascompareobjects = angular.copy(formObject);
                var stringObjects = modifyService.unique(aliascompareobjects)
                var originalObjects = [];
                angular.forEach(stringObjects, function (indobject) {
                    originalObjects.push(indobject.replace(/\./g, "").replace(/\*/g, "").replace("Device", ''))
                })
                console.log($scope["temp"]["Mode"],$scope["temp"]["Protos"]);
				angular.forEach(elem, function (el) {
                    var dataobj = {};
                    var paramvaluestatus = false;
                    for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                        att = atts[i];
                        if (att.nodeName == "ng-model") {
                            var attrvalue = att.nodeValue.split('.');
                            dataobj.objectname = attrvalue[0]
                            dataobj.paramname = attrvalue[1]
                        }
                        if (att.nodeName == "value") {
                            paramvaluestatus = true;
                            var attrvalue = att.nodeValue;
                            dataobj.value = attrvalue
                        }

                    }
                    if ($scope[dataobj.objectname] == undefined) {
                        $scope[dataobj.objectname] = {};
                    }
                    //While submit
                    if (["Alias", "LowerLayers"].indexOf(dataobj.paramname) > -1)
                    {
                        if (["Alias"].indexOf(dataobj.paramname) == 0) {
                            $scope.nextAlias = dataobj.value + $scope.randomvalue;
                        }
                        if (["LowerLayers"].indexOf(dataobj.paramname) == 0) {
                            if (dataobj.value == "") {
                                console.log($scope.previousAlias)
                                $scope[dataobj.objectname][dataobj.paramname] = stringObjects[originalObjects.indexOf($scope.previousAlias.split('-')[2])].split('.*')[0] + "." + $scope.previousAlias;
                            }
                            else{
                                if(dataobj.value.indexOf('*') == -1 && (el.attributes["mode"] != undefined || el.attributes["mode"] == "nomode")){
                                    console.log("in mode & not *");
                                   $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.previousAlias; 
                                }
                                if(el.attributes["mode"] == undefined || el.attributes["mode"] != "nomode")
                                    $scope.previousAlias = $scope.nextAlias;
                            }
                            if(el.attributes["mode"] != undefined && el.attributes["mode"] == "nomode"){                                
								$scope.previousAlias = $scope.nextAlias;
                                }
                            
                        }
                        else {
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                        }
                        
                        if(dataobj.objectname == "DeviceEthernetVLANTermination" && $scope["DeviceEthernetVLANTermination"]["Enable"] != undefined && $scope["DeviceEthernetVLANTermination"]["Enable"] == 1){
                            console.log("else",$scope.previousAlias,"next",$scope.nextAlias);
                            $scope.previousAlias = $scope.nextAlias;
                        }
                        console.log("val upd",$scope[dataobj.objectname][dataobj.paramname]);
                    }
                    else {

                        if (dataobj.value != undefined && dataobj.value.slice(-1) == '-')
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value + $scope.randomvalue;
                        else
                            $scope[dataobj.objectname][dataobj.paramname] = dataobj.value
                    }
                    if (paramvaluestatus)
                        changedFields.push(dataobj.objectname + "" + dataobj.paramname)
                })
                if ($scope["temp"]["Protos"].toLowerCase().indexOf('bridge') > -1 ) {
																																				 
                    if ($scope["DeviceEthernetVLANTermination"] != undefined && $scope["DeviceEthernetVLANTermination"]["VLANID"] != undefined && $scope.vlanidstatus && $scope["DeviceEthernetVLANTermination"]["Enable"] != 0){
                        $scope["DeviceIPInterface"]["LowerLayers"] = stringObjects[originalObjects.indexOf($scope.previousAlias.split('-')[2])].split('.*')[0] + "." + $scope.previousAlias;
                        console.log(stringObjects[originalObjects.indexOf($scope.previousAlias.split('-')[2])].split('.*')[0] + "." + $scope.previousAlias);
                    }else
                    {
																																					
                        if ($scope.vlan_check == "")
                            $scope["DeviceIPInterface"]["LowerLayers"] = stringObjects[originalObjects.indexOf($scope.presentAlias.split('-')[2])].split('.*')[0] + "." + $scope.presentAlias;
                        else
                            $scope["DeviceIPInterface"]["LowerLayers"] = stringObjects[originalObjects.indexOf($scope.vlan_check.split('-')[2])].split('.*')[0] + "." + $scope.vlan_check;
                    }
                }


                /*  Alias Logic */
                var aliasObjects = modifyService.aliasDependency(angular.copy(formObject))
                var aliasParents = aliasObjects.parents;
                var aliasrelations = aliasObjects.childrelation;
                var position = formObject.indexOf('temp')

                if (position > -1)
                    formObject.splice(position, 1);
                angular.forEach(formObject, function (objstring) {
                    individualObject += objstring.replace(/[^a-zA-Z0-9_-]/g, '') + ",";
                });
                value = localStorageService.get('hybrideditObject')
                if (value != null) {
                    source = value;
                }
                var obj2 = individualObject.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
                var uniqueObjects = formObject;
				var operation = '';
                var changedfieldscount = 0;
                changedFields = modifyService.unique(angular.copy(changedFields));
                /*if ($scope["modestatus"] == false) {
                 angular.forEach(changedFields, function (param, pindex) {
                 console.log(param+"----"+param.startsWith("DeviceATMLink")+"---"+pindex)
                 if (param.startsWith("DeviceATMLink")){
                 changedFields.splice(pindex-1, 1)
                 }
                 })
                 } */
                obj2.forEach(function (object, objindex) {

                    var combineobject = '';
                    operation = param1.currentTarget.id;
                    if (param1.currentTarget.id == "Add") {
                        var aliasStatus = true;
                        /* Alias Logic */
                        combineobject = uniqueObjects[objindex];
                        console.log(combineobject)
                        var parentIndex = aliasParents.indexOf(combineobject);
                        if ((parentIndex > -1) && (aliasrelations[parentIndex].childrens.length >= 1)) {
                            if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")] != undefined && $scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] != undefined) {
                                if ($scope[aliasrelations[parentIndex].parent.replace(/\./g, "").replace(/\*/g, "")]["Alias"] != "")
                                    aliasStatus = false;
                            }
                            if (!(aliasrelations[parentIndex].hasOwnProperty('Alias'))) {
                                if ($scope.randomvalue == undefined)
                                    $scope.randomvalue = $scope.randomNumber(10, 99)
                                aliasrelations[parentIndex].Alias = "cpe-WEB-" + object.substring(6) + "-" + $scope.randomvalue;
                                changedFields.push(object + "" + "Alias")
                                if ($scope[object] == undefined)
                                    $scope[object] = {};
                                if (aliasStatus)
                                    $scope[object]["Alias"] = aliasrelations[parentIndex].Alias;
                            }
                            combineobject = combineobject.split('.*')[0]
                        }
                        else {
                            if (parentIndex > -1)
                                combineobject = combineobject.split('.*')[0]
                            else {

                                if (!(combineobject.slice(-1) == "*"))
                                    operation = "Modify";
                                if ($scope.ddobject[combineobject.split('.*')[0] + "index"] != undefined)
                                    combineobject = combineobject.replace('*', $scope.ddobject[combineobject.split('.*')[0] + "index"])
                                else
                                    combineobject = combineobject.replace('*', (aliasrelations[(aliasParents.indexOf(combineobject.split('.*')[0] + ".*"))].Alias)).split('.*')[0]
                            }
                        }

                    }
                    else {
                        var objectstring = uniqueObjects[objindex].split('.*')

                        if (objectstring[objectstring.length - 1 ] == "")
                            objectstring.splice(objectstring.length - 1);
                        if (objectstring.length < 2)
                            combineobject += objectstring[0];
                        else {
                            objectstring.forEach(function (doc2) {
                                combineobject += doc2;
                            })
                        }
                    }
                    if(combineobject.toLowerCase().indexOf('device.bridging.bridge') > -1 && uniqueObjects[objindex].indexOf('.*') > 1 ){
                        var bridgecombineobject = uniqueObjects[objindex].split('.*');
                        var postBefore = "Object=" + bridgecombineobject[0] + '.' + $scope.ddobject[bridgecombineobject[0]] + bridgecombineobject[1] + "&Operation=" + operation;
                    }else
                        var postBefore = "Object=" + combineobject + "&Operation=" + operation;
                    var arrobj1 = object

                    if ($scope[arrobj1] != undefined && $scope["modestatus"] == true) {
                        if($scope[arrobj1]['Alias'] != undefined){
                            if($scope[arrobj1]['Alias'].indexOf('*')>-1){
                                    angular.forEach($scope.ddobject,function(val,key){
                                        if(key.toLowerCase().replace('./g','').indexOf('bridge') > -1){
                                            $scope[arrobj1]['Alias'] = $scope[arrobj1]['Alias'].replace('*',$scope.ddobject[key]);
                                        }
                                    });
                                }
                        }

                        var postformat = $rootScope.poststringformat(arrobj1, $scope[arrobj1], changedFields, changedfieldscount, $scope.objectstatus);
                        if (postformat[0]) {
                            post += postBefore + postformat[1] + "&";
                        }
                        changedfieldscount = postformat[2];
                    }
                    else {
                        $scope["modestatus"] = true
                    }


                });
                $scope["post"] = post;
            }
            else {
                post = $scope["post"];
                var postlist = post.split('Object=')
                postlist.splice(0, 1);
                var latestpost = '';
                angular.forEach(postlist, function (postobject) {
                    var individualobjectlist = postobject.split('&');
                    latestpost += "Object=" + individualobjectlist[0] + "&";
                    var modelobjectname = individualobjectlist[0].replace(/\./g, "").replace(/\*/g, "")
                    if(individualobjectlist[0].indexOf('cpe-WEB-') > -1){
                        var startChar = individualobjectlist[0].indexOf('cpe-WEB-');
                        var endChar = ('cpe-WEB-'+individualobjectlist[0].substring(6, individualobjectlist[0].indexOf('cpe-WEB-')).replace(/\./g, "")).length + 3 ;
                        console.log("endChar",startChar,startChar+endChar,individualobjectlist[0].substring(startChar,startChar+endChar));
                        modelobjectname = individualobjectlist[0].replace(individualobjectlist[0].substring(startChar,startChar+endChar),'').replace(/\./g, "").replace(/\*/g, "");
                    }
                    if(individualobjectlist[0].indexOf('Device.ATM.Link') > -1 && modelobjectname.indexOf('QoS') > -1 || individualobjectlist[0].indexOf('Device.Bridging.Bridge') > -1){
                        modelobjectname = individualobjectlist[0].replace(/\./g, "").replace(/\*/g, "").replace(/\d/g,"");
                    }
                    console.log("ndividualobjectlist[0]",individualobjectlist[0]);
                    individualobjectlist.splice(individualobjectlist.length - 1, 1);
                    angular.forEach(individualobjectlist, function (params, index) {
                        if (index == 1)
                            latestpost += params;
                        else if (index == 0)
                            ;
                        else {
                            var paramname = params.split('=');
                            latestpost += "&" + paramname[0] + "=" + encodeURIComponent($scope[modelobjectname][paramname[0]])
                        }
                    })
                    latestpost += "&";
                })
                post = latestpost;

            }


            if ($scope.tabarray.length > 0 && ($scope["temp"]["Protos"]=="Static")) {
                angular.forEach($scope.tabarray, function (postobject) {
                    var latestpostobject = '';
                    postsplitarr = postobject.split('&');
                    angular.forEach(postsplitarr, function(postsplit){
                        var latestpostsplit = '';
                        if(postsplit.indexOf('=') > 0){
                            postsplit2 = postsplit.split('=');
                            console.log("postsplit2",postsplit2);
                            if(postsplit2[0] !== 'Object' && postsplit2[0] !== 'Operation'){
                                latestpostsplit = postsplit2[0] + '=' + encodeURIComponent(postsplit2[1]);
                            }else{
                                latestpostsplit = postsplit2[0] + '=' + postsplit2[1];
                            }                            
                            console.log("postsplit",postsplit,latestpostsplit)
                        }
                        latestpostobject = latestpostobject + '&' + latestpostsplit;
                        
                        console.log("latestpostobject",latestpostobject)
                        
                    });
                     latestpostobject = latestpostobject.replace(/(^[&\s]+)|([&\s]+$)/g, '')
                    console.log(postobject,latestpostobject,"postobject");
                        post += latestpostobject + "&"
                })
            }
            var deletepost = '';
            angular.forEach(lowerlayersArrray, function (deleteobject) {
                deletepost += "Object=" + deleteobject + "&Operation=Del&"
            })
			post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '')
			var formname = param1.currentTarget.attributes['formname'].value;
            httpService.setData(post).
                    success(function (data, status, headers, config) {
                        $scope["internetclick"] = false;
                        $('#ajaxLoaderSection').hide();
                        $('#ajaxdataLoaderSection').hide();
                        if (status == 200) {
                            localStorage.removeItem('internetEdit')
                            changedFields = [];
                            localStorageService.remove('hybrideditObject');
                            $scope.objectstatus = []
                            if (formtoopen != undefined) {
                                if (deletepost != '') {
                                    $('#ajaxdataLoaderSection').show();
                                    httpService.setData(deletepost).success(function (data, status) {
                                        $('#ajaxdataLoaderSection').show();
                                        $scope.Add(formtoopen);
                                    })
                                }
                                else
                                    $scope.Add(formtoopen);
                            }
                            else
                                $route.reload();
                        }
                        else if (status == 203) {
                            $scope[formname + "popup"] = true;
                            $scope[formname + "popupval"] = data.Objects[0].Param[0].ParamValue
                        }
                        else if (status == 207) {
                            localStorage.setItem('multistatus', true);
                            localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue)
                            if (formtoopen != undefined) {
                                $scope.Add(formtoopen);
                            }
                        }
                        else if (status == 206) {
                            angular.forEach(data.Objects, function (object) {
                                var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "")
                                if (respobject != "DeviceDNSClientServer") {
                                    angular.forEach(object.Param, function (param) {
                                        $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                        $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue

                                    })
                                }
                                else {
                                    console.log(object.Param)
                                    $scope[respobject + "popup"] = true;
                                    $scope[respobject + "popupval"] = object.Param[0].ParamValue;
                                }
                            })
                        }


                    }).
                    error(function (data, status, headers, config) {
                        $('#ajaxLoaderSection').hide();
                    });
        }
        else {
            console.log("from else");
            param1.preventDefault();
        }
    }
    $scope.textchangeEditable1 = function (key, value, editobjects, originalobjects) {
        var originalobjects = originalobjects.split(',')
        var editobjects = editobjects.split(',')
        var originalobjectsremoval = [];
        angular.forEach(originalobjects, function (object) {
            originalobjectsremoval.push(object.replace(/\./g, "").replace(/\*/g, ""))
        })
        var changedFieldObjectIndex = originalobjectsremoval.indexOf(key.split('__')[0])
        if ($scope[editobjects[changedFieldObjectIndex]] == undefined)
            $scope[editobjects[changedFieldObjectIndex]] = {};
        $scope[editobjects[changedFieldObjectIndex]][key.split('__')[1]] = value;
    }
    
    /*Internet edit */
    $scope.editInternet = function (event, formToopen) {
        localStorage.setItem('randomvalue', $scope.randomNumber(10, 99));
        localStorage.setItem('internetEdit', true);
        localStorage.setItem('internetObject', event.currentTarget.attributes['id'].value)
        if(formToopen !== null && formToopen !== undefined){
            httpService.checkFileExists(formToopen, 'tableform').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/tableform/" + formToopen);
                    }
            }).error(function(error){

            });
        }
    }
    
    /* dynamic DNS edit */
    $scope.dyndnsClientEdit = function (event, formToopen) {
        localStorage.setItem('randomvalue', $scope.randomNumber(10, 99));
        localStorageService.set('hybrideditObject', event.currentTarget.id);
        localStorage.setItem('formeditobjects', event.currentTarget.id);
        localStorage.setItem('dyndnsClientEdit', true);
        if (event.currentTarget.id.match(/\.\d+/g) != null) {
            var array = modifyService.unique(event.currentTarget.id.match(/\.\d+/g));
            var localstorageIndex = array[0].replace(/\./g, '')
            localStorage.setItem('formIndex', localstorageIndex)
        }
        localStorage.removeItem('Accordiontable');
        localStorage.removeItem('Accordiontableindex');
        console.log(localStorage.getItem('formIndex'))
        if(formToopen !== null && formToopen !== undefined){
            httpService.checkFileExists(formToopen, 'tableform').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/tableform/" + formToopen);
                    }
            }).error(function(error){

            });
        }
		
        
    }
    
    $scope.tabarray = [];
    $scope.localadd = function (event) {
        var objshowvalue = event.currentTarget.attributes['source'].value.split('?')[0];
        var showstatusvariable = event.currentTarget.attributes['showstatus'].value;
        if (event.currentTarget.attributes['formname'] !== undefined && !$scope[event.currentTarget.attributes['formname'].value + "_form"].$valid) {
            return '';
        }
        var tabobj = 'DeviceDNSRelayForwarding';
        if (objshowvalue !== "Device.DNS.Client.Server.*" || objshowvalue === "Device.DNS.Client.Server.*" && $scope.tabarray.length < 2 ) {
            var url = '?';
            if (event.currentTarget.attributes['hiddenparams'] != undefined)
            {
                angular.forEach(event.currentTarget.attributes['hiddenparams'].value.replace(/\&$/, '').split('&'), function (hiddenobject) {
                    if (hiddenobject.split('?')[1] != "") {
                        var hobjectname = hiddenobject.split('?')[0].replace(/\./g, "").replace(/\*/g, "")
                        var hparameters = hiddenobject.split('?')[1].replace(/\,$/, '').split(',')
                        angular.forEach(hparameters, function (hparam) {
                            changedFields.push(hobjectname + "" + hparam.split('__')[0]);
                            if ($scope[hobjectname] == undefined)
                                $scope[hobjectname] = {};
                            if (hparam.split('__')[0] != "") {
                                var hdata = hparam.split('__')[1];
                                if (hdata[hdata.length - 1] == "-") {
                                    $scope[hobjectname][hparam.split('__')[0]] = hparam.split('__')[1] + $scope.randomvalue;
                                }
                                else
                                    $scope[hobjectname][hparam.split('__')[0]] = hparam.split('__')[1];
                            }
                        })
                    }
                })
            }
            var tableObjects = event.currentTarget.attributes['source'].value.replace(/(^[,\s]+)|([,\s]+$)/g, '').split('&')
            var PostObjectjsonName = '';
            var params = [];
            angular.forEach(tableObjects, function (doc) {
                PostObjectjsonName += doc.split('?')[0] + ",";
                angular.forEach(doc.split('?')[1].split(','), function (parameter) {
                    params.push(parameter)
                })
            });
            var source = PostObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '')
            var formObject = source.split(',');
            formObject = modifyService.unique(formObject)
            var position = formObject.indexOf('temp')
            if (position > -1)
                formObject.splice(position, 1);
            var tempobject = {};
            angular.forEach(formObject, function (obj) {
                tabobj = obj;
                if ($scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"] == undefined)
                    $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"] = [];
                var objsep = obj.split('.*');
                if(objsep.length > 2){
                    var postObjname = '';
                    for(var j=0 ; j< objsep.length-2 ; j++){
                        postObjname += objsep[j] + '.*';
                    }
                    postObjname += objsep[j];
                    url += "Object=" + postObjname + "&Operation=Add" + "&"
                }else{
                    url += "Object=" + obj.split('.*')[0] + "&Operation=Add" + "&"
                }                
                if ($scope[obj.replace(/\./g, "").replace(/\*/g, "")] != undefined) {
                    $.each($scope[obj.replace(/\./g, "").replace(/\*/g, "")], function (key, value) {
                        console.log(key)
                        if (changedFields.indexOf(obj.replace(/\./g, "").replace(/\*/g, "") + "" + key) > -1 && params.indexOf(key) > -1) {
                            url += key + "=" + value + "&"
                            tempobject[obj.replace(/\./g, "").replace(/\*/g, "") + "__" + key] = $scope[obj.replace(/\./g, "").replace(/\*/g, "")][key]
//                        $scope[obj.replace(/\./g, "").replace(/\*/g, "")][key] = '';
                        }
                    });
                }
                tempobject["z"] = obj.replace(/\./g, "").replace(/\*/g, "");
                console.log($scope.tabarray.length,"$scope.tabarray.length");
                tempobject["localadd"] = {};
                tempobject["localadd"]["localaddfun"] = true;
                tempobject["localadd"]["localaddval"] = $scope.tabarray.length;
                $scope[obj.replace(/\./g, "").replace(/\*/g, "") + "table"].push(tempobject);
                $scope[obj.replace(/\./g, "").replace(/\*/g, "")] = undefined;
            })
            url = url.replace(/\&$/, '');
            $scope.tabarray.push(url);
            $scope.rowcancel(showstatusvariable);
        }
        else {
            $scope[tabobj] = undefined;
            $scope.rowcancel(showstatusvariable);
            alert("Maximum DNS Servers allowed per connection :2");
        }
    }
    $scope.customdelete = function (event, obj) {
        var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
        var tableid = event.currentTarget.attributes['id'].value
        var currenttablearray = modifyService.dotstarremove(tableid, '.*').replace(/\./g, "").replace(/\*/g, "") +"table";
        $scope[currenttablearray].splice(currentid, 1);
        $scope.tabarray.splice(currentid, 1);
        console.log("$scope.tabarray",$scope.tabarray);
    }
    
    $scope.tableplusCustomdelete = function (event, index, obj) {
        console.log(event, obj, index, "event")
        if($scope.tabarray.length > 0 && obj.localadd != undefined && obj.localadd.localaddfun){
            var tableid = event.currentTarget.attributes['id'].value
            var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
            var currenttablearray = modifyService.dotstarremove(tableid, '.*').replace(/\./g, "").replace(/\*/g, "") +"table";
            $scope[currenttablearray].splice(currentid, 1);
            $scope.tabarray.splice(obj.localadd.localaddval, 1);
        }else{
            var tableid = event.currentTarget.attributes['id'].value
            var curlen = $scope.tabarray.length;
            for(var i=0 ; i < curlen ; i++){
                var currenttabarrayobj = $scope.tabarray[i].split('&')[0].split('Object=')[1];
                if(currenttabarrayobj == tableid)
                    $scope.tabarray.splice(i, 1);
            }
            var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
            var currenttablearray = modifyService.dotstarremove(tableid, '.*').replace(/\./g, "").replace(/\*/g, "") +"table";
            var url = "Object=" + tableid + "&Operation=Del" + "&"
            console.log("url",url,currenttablearray)
            $scope[currenttablearray].splice(currentid, 1);
            $scope.tabarray.push(url);
        }
        
    }
    
    $scope.dyndnsCustomdelete = function (event, obj, index) {
        console.log(event, obj, index, "event")
        var currentid = event.currentTarget.attributes['tableplusrowindex'].value;
        var tableid = event.currentTarget.attributes['id'].value
        console.log(currentid,tableid);
        var indexarray = modifyService.unique(tableid.match(/\.\d+/g));
        console.log("indexarray",indexarray);
        var objsep = modifyService.dotstarremove(tableid, '.*').split('.*');
        console.log(objsep,"objsep");
        var postObjname = '';
        for(var j=0 ; j< objsep.length-2 ; j++){
            postObjname += objsep[j] + indexarray[j];
        }
        postObjname += objsep[j];
        var url = "Object=" + tableid + "&Operation=Del" + "&"
        console.log("postObjname",postObjname, url);
        var currenttablearray = postObjname.replace(/\./g, "").replace(/\*/g, "") +"table";
        console.log("currenttablearray",currenttablearray);
        $scope[currenttablearray].splice(currentid, 1);
        $scope.tabarray.push(url);
    }
    
    $scope.view = function (event, param1) {
        sessionStorage.setItem('hybrideditObject', event.currentTarget.attributes["id"].value)
        localStorage.setItem('hybrideditObject', event.currentTarget.attributes["id"].value)
        if(param1 !== null && param1 !== undefined){
            httpService.checkFileExists(param1, 'custom').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/custom/" + param1);
                    }
            }).error(function(error){

            });	
        }
    };
    $scope.HelpFun = function (helpbtn) {
        $scope[helpbtn] = !$scope[helpbtn]
    }
    $scope.back = function (param1) {
        if(param1 !== null && param1 !== undefined){
            httpService.checkFileExists(param1, 'custom').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/custom/" + param1);
                    }
            }).error(function(error){

            });	
        }
    };
    $scope.downloadFile = function (event) {
									 
        var action = "?Action=";
        var filename = event.currentTarget.attributes["id"].value;
        if (filename != "") {
            var post = action + "LogFileDownload&Name=" + filename + "";
            window.location = httpService.set_action_url + post;
        }
        else {
            alert("No File Exist");
        }
    };
    var lowerlayersArrray = [];
    function formedit(componentdata, formid, urlobjs) {
        var internetformdata = componentdata.split('&');
        angular.forEach(internetformdata, function (objectwithparam) {
            var objects = objectwithparam.split('?')
            var object = objects[0];
            orgarray.push(object)
            duparray.push(modifyService.dotstarremove(angular.copy(object), '.*'))
            var params = objects[1].split(',')
            if (object != "temp") {
                angular.forEach(params, function (params1) {
                    if ($scope["form_" + object] == undefined)
                        $scope["form_" + object] = [];
                    $scope["form_" + object].push(params1)
                })
            }
//            console.log(object)
//            console.log($scope["form_" + object])
        })

        var editObject = localStorage.getItem('internetObject');
        $scope[formid + "Id"] = [];
        httpService.getFillParamData("Object=Device.X_LANTIQ_COM_NwHardware.WANGroup&Mode=&MappingLowerLayer=").
                success(function (data, status, headers, config) {
                    $scope["Modes"] = [];
                    $scope["Lowerlayers"] = [];
                    var Obj = data.Objects;
                    for (var i = 0; i < Obj.length; i++) {
                        var params = Obj[i].Param;
                        for (k = 0; k < params.length; k++) {
                            if (params[k].ParamName == "Mode")
                                $scope["Modes"].push(params[k].ParamValue)
                            else
                                $scope["Lowerlayers"].push(params[k].ParamValue)
                        }

                    }
                }).
                error(function (data, status, headers, config) {

                })


        if (componentdata != "") {
           
            var objectname = '';
            var PostObjectjsonName = '';
            var parameterlist = '';
            if (editObject != null) {
                // $("#Add").attr('value', 'Modify')
                $("#Add").attr('id', 'Modify')
                var tableObjectdata = modifyService.objectData(componentdata);
            }
            else
                var tableObjectdata = modifyService.objectData(componentdata)

            localStorage.removeItem('formIndex');
            var formObject = tableObjectdata.postObjectjsonName.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
            parameterlist = tableObjectdata.parameterlist.replace(/(^[,\s]+)|([,\s]+$)/g, '')
            var reqobjects = editObject.split(',');
            var requesturl = modifyService.split(angular.copy(editObject).split(','))
            var uniqueobjects = modifyService.unique(angular.copy(formObject));
            httpService.getData("Object=" + requesturl)
                    .success(function (data, status, headers, config) {
                        lowerlayersArrray.push(requesturl)
                        var objects = data.Objects;
                        angular.forEach(objects, function (object, i) {
                            var objectname = objects[i].ObjName;
                            var params = objects[i].Param;
                            if (requesturl.indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')) > -1) {
                                var lowerlayers = internet_lowerlayers(objectname, params)
                                lowerlayersArrray.push(lowerlayers)
                                lowerlayersRequest(lowerlayers);
                            }
                        })
                    })
                    .error(function (data, status, headers, config) {

                    })
        }

    }

    function internet_lowerlayers(objectname, params, status) {
        orgarray = modifyService.unique(orgarray)
        duparray = modifyService.unique(duparray)
        var lowerlayers = '';
        var objectname = modifyService.dotstarremove(objectname, '.*');
        var dupindex = duparray.indexOf(objectname.replace(/(^[.\s]+)|([.\s]+$)/g, ''));
        var orgarrayvalue = orgarray[dupindex]
        for (i = 0; i < params.length; i++) {
            var param_name = params[i].ParamName;
            var param_value = params[i].ParamValue;
            if (param_name == "LowerLayers") {
                lowerlayers = param_value;
            }
            else if (status != false) {
                console.log(objectname)
                if (orgarrayvalue!=undefined && $scope["form_" + orgarrayvalue.replace(/(^[.\s]+)|([.\s]+$)/g, '')].indexOf(param_name) > -1) {
                    if ($scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")] == undefined)
                        $scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")] = {};
                    //   $scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")][param_name] = param_value
                    if (param_value == "true") {
                        $scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")][param_name] = true
                    }
                    else if (param_value == "false") {
                        $scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")][param_name] = false
                    }
                    else
                        $scope[orgarrayvalue.replace(/\./g, "").replace(/\*/g, "")][param_name] = param_value

                    if (param_name == "DestinationAddress") {
                        $scope.nextstatus = true;
                        setTimeout(function () {
                            $scope.textChange("DeviceATMLink__DestinationAddress", $scope["DeviceATMLink"]["DestinationAddress"])
                        }, 2000);

                    }
                }
            }
        }
        return lowerlayers;
    }
    var lowerlayersRequestHelper = 0;
    function lowerlayersRequest(reqobjectname, status1) {
        httpService.getNoSubObjectData("Object=" + reqobjectname.replace(/(^[.\s]+)|([.\s]+$)/g, ''))
                .success(function (data, status, headers, config) {
                    var objects = data.Objects;
                    angular.forEach(objects, function (object, i) {
                        var objectname = objects[i].ObjName;
                        var params = objects[i].Param;
                        var reqobjectParams = objects[i].Param;                        
                        if($scope["Lowerlayers"] == undefined && lowerlayersRequestHelper < 10){
                            console.log("$scope[Lowerlayers] Enpty Scenario");
                            lowerlayersRequest(reqobjectname, status1);
                            lowerlayersRequestHelper++;
                            return;
                        }
                        if (reqobjectname.replace(/(^[.\s]+)|([.\s]+$)/g, '') == objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')) {
                            if (status1 == false)
                                var lowerlayers = internet_lowerlayers(objectname, params, false)
                            else
                                var lowerlayers = internet_lowerlayers(objectname, params)
                            if ($scope["Lowerlayers"].indexOf(lowerlayers) < 0 && lowerlayers.indexOf("ATM.Link") < 0) {
                                lowerlayersArrray.push(lowerlayers);
                                if (status1 == false)
                                    lowerlayersRequest(lowerlayers, false);
                                else
                                    lowerlayersRequest(lowerlayers);
                            }
                            else if (status1 != false) {
                                if (lowerlayers.indexOf("ATM.Link") > 0)
                                    httpService.getData("Object=" + lowerlayers).success(function (data) {
                                        var Objects = data.Objects;
                                        for (var i = 0; i < 2; i++) {
                                            var dhcpobjectname = Objects[i].ObjName;
                                            var dhcpparams = Objects[i].Param;
                                            internet_lowerlayers(dhcpobjectname, dhcpparams)
                                        }
                                    })
                                var index = $scope["Lowerlayers"].indexOf(lowerlayers)
                                if (index < 0) {
                                    var lowerlayerstatus = true;
                                    angular.forEach($scope["Lowerlayers"], function (string, lowerlayerindex) {
                                        if (string.indexOf("Device.DSL") > -1 && lowerlayerstatus) {
                                            index = lowerlayerindex;
                                            lowerlayerstatus = false;
                                        }
                                    })
                                }
//                                if (reqobjectname.indexOf("Device.Bridging.Bridge") > -1)
//                                {
//                                    index = parseInt(index) + 1;
//                                }
                                /* When Bridge type to preserve index of the bridge */
                                if (reqobjectname.indexOf("Device.Bridging.Bridge.") > -1)
                                {
                                    var obj = "Device.Bridging.Bridge."
                                    var rest = reqobjectname.substring(obj.length,obj.length+1);
                                    if($scope.ddobject["Device.Bridging.Bridge"] == undefined)
                                        $scope.ddobject["Device.Bridging.Bridge"] = rest;
                                }
                                $scope["temp"]["Mode"] = $scope["Modes"][index]
                                var regExp = /\(([^)]+)\)/;
                                var matches = regExp.exec($("#Mode").attr('ng-change'));
//                                var parameters = matches[1].split(',');
                                var parameters = matches[1].split('",');
                                var temp = parameters[0].replace(/"/g, '')
                                var temp1 = parameters[1].replace(/"/g, '')
                                var temp2 = parameters[2].replace(/"/g, '')
                                var temp3 = parameters[3].replace(/"/g, '')
                                $scope.wizardDropdown(temp, temp1, temp2, temp3);
                                var interneteditsubobject = localStorage.getItem('internetObject').split(',')[1]
                                var interneteditsubobject_index = interneteditsubobject.match(/\d+/g)
                                interneteditsubobject_index.splice(1, 1)
                                console.log(interneteditsubobject_index)
                                httpService.getData("Object=" + interneteditsubobject).
                                        success(function (data, status, headers, config) {
                                            var dataobjects = data.Objects;
                                            angular.forEach(dataobjects, function (dataobj) {
                                                var objectname = dataobj.ObjName
                                                var params = dataobj.Param;
                                                var regExp = /\(([^)]+)\)/;
                                                var matches = regExp.exec($("#Protos").attr('ng-mouseover'));
                                                var parameters = matches[1].split(',');
                                                var temp = parameters[0].replace(/"/g, '')
                                                var temp1 = parameters[1].replace(/"/g, '')
                                                if ($scope["DeviceATMLink"] == undefined)
                                                    $scope["DeviceATMLink"] = {};
//                                                $scope["DeviceATMLink"]["LinkType"] = "EoA"
                                                if($scope["temp"]["Mode"] == "ATM" && $scope["DeviceATMLink"]["LinkType"] == undefined){
                                                    lowerlayersRequest(reqobjectname, status1);
                                                    console.log('LinkType undefined scenario');
                                                }else{
                                                    var promise = $scope.dependent(temp, temp1);
                                                    promise.then(function(val) {
                                                        var protosvalue = '';
//                                                    setTimeout(function () {
                                                        for (var pa = 0; pa < params.length; pa++) {
                                                            var subparamname = params[pa].ParamName
                                                            var subparamvalue = params[pa].ParamValue
                                                            console.log("subparamname",subparamname,subparamvalue);
                                                            if (subparamname == "AddressingType") {
                                                                protosvalue = subparamvalue;
                                                                if (protosvalue === "X_LANTIQ_COM_PPPoE") {
                                                                    $scope["temp"]["Protos"] = "PPPoE"
                                                                }else if(protosvalue === "X_LANTIQ_COM_Bridged"){
                                                                    if(reqobjectname.indexOf('Bridge') > -1 && reqobjectname.indexOf('Port') > -1){
                                                                        setTimeout(function () {
                                                                            var bridgeObj = reqobjectname.split('Port');
                                                                            httpService.getNoSubObjectData("Object=" + bridgeObj[0]).
                                                                            success(function (data, status, headers, config) {
                                                                                var bridgedataobjects = data.Objects;
                                                                                angular.forEach(bridgedataobjects, function (bridgedataobj) {
                                                                                    var bridgedataobjparams = bridgedataobj.Param;
                                                                                    angular.forEach(bridgedataobjparams, function (bridgedataobjparam) {
                                                                                        console.log("bridgedataobjparam",bridgedataobjparam)
                                                                                        if(bridgedataobjparam.ParamName === "X_LANTIQ_COM_Name"){
                                                                                            $scope["temp"]["Bridges"] = bridgedataobjparam.ParamValue;
                                                                                            $scope["dropdownMouseoverstatus"] = false;
                                                                                        }
                                                                                    });
                                                                                });
                                                                            });
                                                                        },900);
                                                                    }
                                                                    $scope["temp"]["Protos"] = "Bridge";  
                                                                }else if(protosvalue == "X_LANTIQ_COM_PPPoA"){
                                                                    $scope["temp"]["Protos"] = "PPPoA";
                                                                }else if(protosvalue == "X_LANTIQ_COM_Auto"){
                                                                    //Implementation for Auto
                                                                    $scope["temp"]["Protos"] = "Auto";
                                                                }else {
                                                                    $scope["temp"]["Protos"] = subparamvalue
                                                                }
                                                                $scope["dropdownMouseoverstatus"] = false;
                                                            }
                                                            $scope["dropdownMouseoverstatus"] = false;
                                                            setTimeout(function () {
                                                                $scope["dropdownMouseoverstatus"] = false;
                                                            }, 500);                                                            
                                                        }
                                                        if (protosvalue === "PPPoE" || protosvalue === "X_LANTIQ_COM_PPPoE") {
                                                            var pppoevalues = ["Device.DHCPv6.Client"]
                                                            angular.forEach(pppoevalues, function (object) {
                                                                httpService.getFillParamData("Object=" + object + "&Interface=" + localStorage.getItem('internetObject').split(',')[0]).
                                                                        success(function (data) {
                                                                            var Objects = data.Objects;
                                                                            for (var i = 0; i < Objects.length; i++) {
                                                                                var dhcpobjectname = Objects[i].ObjName;
                                                                                var dhcpparams = Objects[i].Param;
                                                                                internet_lowerlayers(dhcpobjectname, dhcpparams)
                                                                            }
                                                                        })
                                                            })

                                                        }
                                                        else if (protosvalue == "Static") {
                                                            var staticvalues = ["Device.IP.Interface.*.IPv4Address.*", "Device.IP.Interface.*.IPv6Address.*", "Device.Routing.Router.1.IPv4Forwarding.*", "Device.Routing.Router.1.IPv6Forwarding.*"]
                                                            angular.forEach(staticvalues, function (obj, index) {
                                                                var finalobj = '';
                                                                var suburl = '';
                                                                if (index == 0 || index == 1) {
                                                                    console.log(obj)
                                                                    var replaceobj = obj.split('*');
                                                                    console.log(replaceobj)
																						 
                                                                    angular.forEach(replaceobj, function (splitobj, splitindex) {
                                                                        if (splitobj != "")
                                                                            finalobj += splitobj + interneteditsubobject_index[splitindex]
                                                                    })
                                                                    
                                                                    httpService.getData("Object=" + finalobj).success(function (data) {
                                                                    var Objects = data.Objects;
                                                                    for (var i = 0; i < Objects.length; i++) {
                                                                        var dhcpobjectname = Objects[i].ObjName;
                                                                        var dhcpparams = Objects[i].Param;
                                                                        internet_lowerlayers(dhcpobjectname, dhcpparams)
                                                                    }
                                                                   })
                                                                }
                                                                else {
																								   
                                                                    finalobj = obj.split('.*')[0] + "&Interface=" + localStorage.getItem('internetObject').split(',')[0] + ".";
																 

                                                                    httpService.getFillParamData("Object=" + finalobj).success(function (data) {
                                                                    var Objects = data.Objects;
                                                                    for (var i = 0; i < Objects.length; i++) {
                                                                        var dhcpobjectname = Objects[i].ObjName;
                                                                        var dhcpparams = Objects[i].Param;
                                                                        internet_lowerlayers(dhcpobjectname, dhcpparams)
                                                                     }
                                                                   })
                                                                }

                                                                
                                                            })
                                                        }
                                                        else if (protosvalue == "DHCP") {
                                                            var pppoevalues = ["Device.DHCPv6.Client", "Device.DHCPv4.Client"]
                                                            angular.forEach(pppoevalues, function (object) {
                                                                httpService.getFillParamData("Object=" + object + "&Interface=" + localStorage.getItem('internetObject').split(',')[0] + ".").
                                                                        success(function (data) {
                                                                            var Objects = data.Objects;
                                                                            for (var i = 0; i < Objects.length; i++) {
                                                                                var dhcpobjectname = Objects[i].ObjName;
                                                                                var dhcpparams = Objects[i].Param;
                                                                                internet_lowerlayers(dhcpobjectname, dhcpparams)
                                                                            }
                                                                        })
                                                            })
                                                        }
                                                         //For Auto implementation
                                                        else if (protosvalue == "X_LANTIQ_COM_Auto" || protosvalue == "Auto") {
                                                            var pppoevalues = ["Device.X_LANTIQ_COM_Auto.Client"]
                                                            angular.forEach(pppoevalues, function (object) {
                                                                httpService.getFillParamData("Object=" + object + "&Interface=" + localStorage.getItem('internetObject').split(',')[0] + ".").
                                                                        success(function (data) {
                                                                            var Objects = data.Objects;
                                                                            for (var i = 0; i < Objects.length; i++) {
                                                                                var dhcpobjectname = Objects[i].ObjName;
                                                                                var dhcpparams = Objects[i].Param;
                                                                                internet_lowerlayers(dhcpobjectname, dhcpparams)
                                                                            }
                                                                        })
                                                            })
                                                        }
//                                                    }, 500);
                                                    });
                                                }
                                            })
                                        })
                            }
                        }
                    })

                })
                .error(function (data, status, headers, config) {

                })
    }


    $scope.getRoles = function (param, jsonflag) {
        if ($scope[param.split('.')[0]] != undefined && $scope[param.split('.')[0]] [param.split('.')[1]] != undefined) {
            if (jsonflag == "true") {
                var temparray = [];
                angular.forEach($scope[param.split('.')[1]], function (value) {
                    if ($scope[param.split('.')[0]][param.split('.')[1]].split(',').indexOf(value.id) > -1) {
                        temparray.push(value);
                    }
                })
                return temparray;
            }
            else {
                return $scope[param.split('.')[0]][param.split('.')[1]].split(',');
            }
        }
    }
    $scope.check = function (value, checked, param, jsonflag) {
        var param = param.split('.');
        changedFields.push(param[0] + param[1])
        if ($scope[param[0]] == undefined) {
            $scope[param[0]] = {};
        }
        if ($scope[param[0]][param[1]] == undefined)
            $scope[param[0]][param[1]] = '';
        $scope[param[0]][param[1]] = $scope[param[0]][param[1]].replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',')
        if (jsonflag == "true") {
            var valuestatus = true;
            angular.forEach($scope[param[0]][param[1]], function (value1, index) {
                if (value1 == value.id) {
                    valuestatus = false;
                    $scope[param[0]][param[1]].splice(index, 1);
                }
            })
            if (valuestatus)
                $scope[param[0]][param[1]].push(value.id);
        }
        else {
            idx = $scope[param[0]][param[1]].indexOf(value);
            if (idx >= 0 && !checked) {
                $scope[param[0]][param[1]].splice(idx, 1);
            }
            if (idx < 0 && checked) {
                $scope[param[0]][param[1]].push(value);
            }
        }
//        if (jsonflag)
        $scope[param[0]][param[1]] = $scope[param[0]][param[1]].join().replace(/(^[,\s]+)|([,\s]+$)/g, '');
    };
    $scope.checkboxurl = function (req, param, dependentstatus) {
        console.log(dependentstatus)
        $scope[param] = '';
        if (req.indexOf(httpService.get_url) > -1) {
            httpService.getDataWithFormedURL(URL + req).success(function (data) {
                $scope[param] = [];
                var dropdowndata = data.Objects;
                if (dependentstatus != '') {
                    var Objects = data.Objects;
                    angular.forEach(Objects, function (object) {
                        var mcboxobject = {};
                        if (dependentstatus == "instance") {
                            var objindex = object.ObjName.match(/\d+/g);
                            mcboxobject["id"] = objindex[objindex.length - 1];
                        }
                        else {
                            mcboxobject["id"] = object.ObjName;
                            httpService.getFillParamData("Object=" + mcboxobject.id + "&" + dependentstatus + "=").success(function (data) {
                                mcboxobject.id = data.Objects[0].Param[0].ParamValue;
                            })
                        }
                        mcboxobject["name"] = object.Param[0].ParamValue;
                        $scope[param].push(mcboxobject)

                    })
//                    angular.forEach($scope[param], function (object) {

//                    })

                }
                else {
                    angular.forEach(dropdowndata, function (dropObject) {
                        var dropParam = dropObject.Param[0].ParamValue;
                        if (dropParam.indexOf(',') > -1) {
                            $scope[param] = dropParam;
                        }
                        else {
                            $scope[param] += dropParam + ","
                        }
                    })
                    $scope[param] = $scope[param].replace(/(^[,\s]+)|([,\s]+$)/g, '')
                }
            })
        }
        else {
            httpService.getDataWithFormedURL(req + ".json").success(function (data) {
                $scope[param] = data[param]
            })
        }
    }
    $scope.commaremoval = function (values, name) {
        $scope[name] = [];
        angular.forEach(values.split(','), function (val) {
            var tempobj = {};
            tempobj["id"] = val;
            tempobj["name"] = val;
            $scope[name].push(tempobj)
        })
    }
    $scope.internetdelete = function (event) {
        var answer = confirm("Are you sure you want to Delete?")
        if (!answer) {
            event.preventDefault();
        } else {
            $('#ajaxLoaderSection').show()
            httpService.getFillParamData("Object=Device.X_LANTIQ_COM_NwHardware.WANGroup&Mode=&MappingLowerLayer=").
                    success(function (data, status, headers, config) {
                        $scope["Modes"] = [];
                        $scope["Lowerlayers"] = [];
                        var Obj = data.Objects;
                        for (var i = 0; i < Obj.length; i++) {
                            var params = Obj[i].Param;
                            for (k = 0; k < params.length; k++) {
                                if (params[k].ParamName == "Mode")
                                    $scope["Modes"].push(params[k].ParamValue)
                                else
                                    $scope["Lowerlayers"].push(params[k].ParamValue)
                            }

                        }
                    }).
                    error(function (data, status, headers, config) {

                    })
            var datarequest = modifyService.split(event.currentTarget.attributes['id'].value.split(','));
            httpService.getNoSubObjectData("Object=" + datarequest)
                    .success(function (data, status, headers, config) {
                        lowerlayersArrray.push(datarequest[0])
                        var objects = data.Objects;
                        angular.forEach(objects, function (object, i) {
                            var objectname = objects[i].ObjName;
                            var params = objects[i].Param;
                            var lowerlayers = internet_lowerlayers(objectname, params, false)
                            lowerlayersArrray.push(lowerlayers)
                            setTimeout(function () {
                                lowerlayersRequest(lowerlayers, false);
                                }, 50);
                        })
                    })
                    .error(function (data, status, headers, config) {

                    })
            var url = URL + httpService.set_url;
            var post = '';
            setTimeout(function () {
                angular.forEach(lowerlayersArrray, function (deleteobject) {
                    post += "Object=" + deleteobject + "&Operation=Del&,"
                })
                modifyService.genericRequest(url, post, function (response) {
                    var formname = event.currentTarget.attributes['popupinfo'].value;
                    errorResponseDisplay(formname, response)
                });
            }, 1500)
        }
    }
    $scope.$on('$destroy', function () {
        
        angular.forEach(tabletimeoutarray, function(interval) {
    $timeout.cancel(interval);
});
        
//  clearing all the timeouts created during polling when scope destroys.    
        angular.forEach(tabletimeoutrepeatarray, function(interval) {
    $timeout.cancel(interval);
});

        if (localStorageService.get('hybrideditObject') != null) {
            if (operationstatus) {
                localStorageService.remove('hybrideditObject');
                operationstatus = false;
            }
            else
                operationstatus = true;
        }
        else {
            operationstatus = false;
        }
        angular.forEach(passwordarray, function (passwordobject) {
            if (angular.isDefined(passwordobject)) {
                $interval.cancel(passwordobject);
                passwordobject = undefined;
            }
        })
        angular.forEach(promisearray, function (promiseobject) {
            if (angular.isDefined(promiseobject)) {
                $interval.cancel(promiseobject);
                promiseobject = undefined;
            }
        })
        
         angular.forEach(warningMessagePromiseArray, function (promiseobject) {
            if (angular.isDefined(promiseobject)) {
                $interval.cancel(promiseobject);
                promiseobject = undefined;
            }
        })

    });
    $scope.helpDetail = function (event) {
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
        $scope["helpfile"] = helpfile;
        $scope['scopevariable'] = !$scope['scopevariable'];
    };
    $scope.addcustomform = function (param1) {
       if(param1 !== null && param1 !== undefined){
             httpService.checkFileExists(param1, 'custom').success(function(responseData){
               if(responseData !== ""){
                   $location.path("/custom/" + param1);
                }
        }).error(function(error){
            
        });	
       }
      	
    };
    $scope.modifycustomform = function (event, param1) {
        if (event.currentTarget.id.match(/\.\d+/g) != null) {
            if (event.currentTarget.id.match(/\.\d+/g).length > 2)
                var localstorageIndex = event.currentTarget.id.match(/\.\d+/g)[2].replace(/\./g, '')
            else if (event.currentTarget.id.match(/\.\d+/g).length > 1)
                var localstorageIndex = event.currentTarget.id.match(/\.\d+/g)[1].replace(/\./g, '')
            else
                var localstorageIndex = event.currentTarget.id.match(/\.\d+/g)[0].replace(/\./g, '')
            localStorage.setItem('hybrideditObject', localstorageIndex);
        }
        if(param1 !== null && param1 !==undefined){
            httpService.checkFileExists(param1, 'custom').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/custom/" + param1);
                    }
            }).error(function(error){

            });	
        }
        
    };
    $scope.customCancel = function (param1) {
      if(param1 !== null && param1 !==undefined){
           httpService.checkFileExists(param1, 'custom').success(function(responseData){
                   if(responseData !== ""){
                       $location.path("/custom/" + param1);
                    }
            }).error(function(error){

            });	
      }
    };
    $scope.limit = function (statusvariable) {
        if ($scope[statusvariable + "table"] == undefined || $scope[statusvariable + "table"].length < 2) {
            $scope[statusvariable + "showstatus"] = true;
        }
        else {
            alert("Maximum DNS Servers allowed per connection :2");
        }
    }

     $scope.$on('$locationChangeStart', function (event) {
        $(window).resize();
     });
	
	$scope.internetstatic = function (event, index) {
        console.log(event)
        var requrl = $scope.tabarray[index].split('&');
        var requrlkey = "DNSServer";
        var tablevariable = modifyService.dotstarremove(event["z"], '.*').replace(/\./g, "").replace(/\*/g, "").replace('table', '');
        console.log(tablevariable);
        angular.forEach(requrl, function(reqEle, keyIndex){
            if(reqEle.split('=')[0] == requrlkey){
                requrl[keyIndex] = requrlkey + "=" + event[tablevariable + "__" + requrlkey];
            }
        });
        console.log(requrl);
        $scope[event["z"]][index] = event;
        $scope.tabarray[index] = requrl.join('&');
    }
    
    $scope.dyndnsstatic = function (event, index) {
        console.log(event,$scope.tabarray,index)
        if($scope.tabarray.length > 0 && $scope.tabarray[index] != undefined){
            var requrl = $scope.tabarray[index].split('&');
            var requrlkey = "DNSServer";
            var tablevariable = modifyService.dotstarremove(event["z"], '.*').replace(/\./g, "").replace(/\*/g, "").replace('table', '');
            console.log(tablevariable);
            requrl[3] = requrlkey + "=" + event[tablevariable + "__" + requrlkey];
            console.log(requrl);
            $scope[event["z"]][index] = event;
            $scope.tabarray[index] = requrl.join('&');
        }else{
            console.log(event,"event");
            var paramName, paramValue, objectname, postparam = '';
            angular.forEach(event,function(value,key){
                console.log(key,value);                
                if(key.indexOf("__") > -1){                   
                    paramName = key.split("__")[1];
                    paramValue = value;
                    postparam += paramName + "=" + paramValue;
                }
                if (key == 'z') {
                    objectname = value;
                }
                
            });
            var url = "Object=" + objectname + "&Operation=Modify&" + postparam + "&";
            console.log(url,"url value");
            $scope.tabarray.push(url);
        }
    }
    
    $scope.tableplusstaticedit = function (data, index, localadd) {
        console.log(data,$scope.tabarray,index, localadd)
        var paramName, paramValue, objectname, postparam = '';
        if($scope.tabarray.length > 0 && localadd != undefined && localadd.localaddfun){
            var currenttabarray = $scope.tabarray[localadd.localaddval].split('&');
            console.log(currenttabarray);
            angular.forEach(data,function(value,key){
                console.log(key,value);                
                if(key.indexOf("__") > -1){                   
                    paramName = key.split("__")[1];
                    paramValue = value;
                    postparam += '&' + paramName + "=" + $sanitize(paramValue).replace(/<[^>]+>/gm, '');
                }
                if (key == 'z') {
                    objectname = $sanitize(value).replace(/<[^>]+>/gm, '');
                }
                
            });
            var url = "Object=" + objectname + "&Operation=Add" + postparam + "&";
            console.log(url,"url value");
            $scope.tabarray[localadd.localaddval] = url;
        }else{
            console.log(data,"data",localadd);
            var paramName, paramValue, objectname, postparam = '';
            angular.forEach(data,function(value,key){
                console.log(key,value);                
                if(key.indexOf("__") > -1){                   
                    paramName = key.split("__")[1];
                    paramValue = value;
                    postparam += '&' + paramName + "=" + paramValue;
                }
                if (key == 'z') {
                    objectname = value;
                }
                
            });
            var url = "Object=" + objectname + "&Operation=Modify" + postparam + "&";
            console.log(url,"url value");
            $scope.tabarray.push(url);
        }
    }
    
    $scope.popupclose = function (scopeparam) {
        $scope[scopeparam] = false;
    }
    
    $scope.initTabs = function (value) {
        if (value !== undefined && value !== '') {
            var urls = value;
            var Objects = urls.split('&');
            var url = '';
            angular.forEach(Objects, function (object) {
                url = url + 'Object=' + object.replace('?', '&') + "=&";
            });

            httpService.getData(url).then(function (responsearray) {
                $('#ajaxdataLoaderSection').show();
                var respstatus, respdata;

                if (responsearray.status == 200) {
                    if (responsearray.data.Objects !== undefined && responsearray.data.Objects !== null) {
                        angular.forEach(responsearray.data.Objects, function (object) {
                            var objectName = object.ObjName.replace(/\./g, '').replace(/\*/g, '');
                            $scope[objectName] = [];
                            angular.forEach(object.Param, function (param) {
                                $scope[objectName][param.ParamName] = param.ParamValue;
                            });

                        })
                    }
                } else if (responsearray.status == 206) {

                } else if (responsearray.status == 203) {

                }
                $('#ajaxdataLoaderSection').hide();
            });
        }
    }
    

    $scope.initevent = function (value) {
       $('.ipvbtn a:first').click();
    }
    $('.tabs-container').on('click', '.nav-tabs a', function (e) {
        $rootScope.initialtime=Date.now();
        e.preventDefault();
        var source = e.currentTarget.attributes['source'].value;
        var id = e.currentTarget.attributes['href'].value.substring(1);
        if ($scope[id + "clickstatus"] == undefined) {
            $scope[id + "clickstatus"] = "clicked";
            var htmlSource = displayResult(source, 'makehtml');
            var finalhtml = $("#" + id).html(htmlSource)
            $("#" + id).find('div.ltq_breadcrumbs').addClass('hide')
            $compile(finalhtml)($scope);
        }
        $scope.noOfForms = [];
        $scope.tableCount = [];
        $("#" + id).find("form").map(function (i)
        {
            if ($(this).attr('id') != undefined)
                $scope.noOfForms.push({"formattr": $(this).attr('name1'), "id": $(this).attr('id'), "urlobjs": $(this).attr('urlobjs')})
        })
        $("#" + id).find("table").map(function (i)
        {
            if ($(this).attr('objparamrelation') != undefined) {
                var tabparamsrder = $(this).attr('objparamrelation').split(',');
                //To implement table with no Actions
//                tabparamsrder.splice(tabparamsrder.length - 1, 1)
                localStorage.setItem($(this).attr('id') + "tparams", tabparamsrder);
            }

            $scope.tableCount.push({"id": $(this).attr('id'), "formattr": $(this).attr('name')})
        })
        angular.forEach(promisearray, function (promiseobject) {
            if (angular.isDefined(promiseobject)) {
                $interval.cancel(promiseobject);
                promiseobject = undefined;
            }
        });
        $scope.tableCount.forEach(function (tableAttributes) {
            var id = tableAttributes.id;
            if ($("#" + id).attr('polling')) {
                promisearray.push($interval(function () {
                    id = tableAttributes.id;
                    tabledatapopulation(tableAttributes.formattr, $("#" + id).attr('filterdata'), id, $("#" + id).attr('urlobjs'), $("#" + id).attr('depends'))
                }, $("#" + id).attr('interval')));
            }
            tabledatapopulation(tableAttributes.formattr, $("#" + id).attr('filterdata'), id, $("#" + id).attr('urlobjs'), $("#" + id).attr('depends'))
            if ($("#" + id).attr('iconicparams') != undefined && $("#" + id).attr('iconicparams') != ' ')
                iconicparams += $("#" + id).attr('iconicparams').replace(/(^[,\s]+)|([,\s]+$)/g, '').split(',');
        })
        $scope.noOfForms.forEach(function (formobject) {
            if (formobject != undefined) {
                if ($("#" + formobject.id).attr('polling')) {
                    promisearray.push($interval(function () {
                         
                            formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs)
                        
                    }, $("#" + formobject.id).attr('interval')));
                }
                else{
                   
                            formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs)
                       
                }
              
            }
        })
        
        $(this).tab('show');
    });
//    $scope.$watch('DeviceWiFiRadio1.RegulatoryDomain', function () {
//        if ($scope.wifipageload) {
//            setTimeout(function () {
//                $scope.wifipageload = false;
//                if ($scope["DeviceWiFiRadio1"] != undefined && $scope["DeviceWiFiRadio1"]["RegulatoryDomain"] != '' && $scope["DeviceWiFiRadio1"]["RegulatoryDomain"] != undefined) {
//                    var initparams = ["RegulatoryDomain", "Channel", "OperatingStandards"];
//                    angular.forEach(initparams, function (param, index) {
//                        var param = $("#" + param).attr('ng-change');
//                        var parameters = param.match(/\(([^)]+)\)/)[1].split(',');
//                        var temp = parameters[0].replace(/"/g, '')
//                        var temp1 = parameters[1].replace(/"/g, '')
//                        var temp2 = parameters[2].replace(/"/g, '').split('.');
//                        temp2 = $scope[temp2[0]][temp2[1]]
//                        $scope.wifi(temp, temp1, temp2, "pageload");
//                    })
//                }
//            }, 2000)
//        }
//
//
//    });
//    $scope.$watch('DeviceWiFiRadio2.RegulatoryDomain', function () {
//        if ($scope.wifipageload) {
//            setTimeout(function () {
//                $scope.wifipageload = false;
//                if ($scope["DeviceWiFiRadio2"] != undefined && $scope["DeviceWiFiRadio2"]["RegulatoryDomain"] != '') {
//                    var initparams = ["RegulatoryDomain", "Channel", "OperatingStandards"];
//                    angular.forEach(initparams, function (param, index) {
//                        var param = $("#" + param).attr('ng-change');
//                        var parameters = param.match(/\(([^)]+)\)/)[1].split(',');
//                        var temp = parameters[0].replace(/"/g, '')
//                        var temp1 = parameters[1].replace(/"/g, '')
//                        var temp2 = parameters[2].replace(/"/g, '').split('.');
//                        temp2 = $scope[temp2[0]][temp2[1]]
//                        $scope.wifi(temp, temp1, temp2, "pageload");
//                    })
//                }
//            }, 2000)
//        }
//
//
//    });
    $scope.passchange = function (param) {
        var paramtype = $("#" + param).attr('type');
        if (paramtype == "password")
            $("#" + param).attr('type', 'text');
        else
            $("#" + param).attr('type', 'password');
    }
    
    $scope.defaultvalue = function (objectname, paramname, value) {
        if ($scope[objectname] == undefined || $scope[objectname][paramname] == undefined) {
            if ($scope[objectname] == undefined) {
                $scope[objectname] = {};
                console.log("hi");
            }
            if ($scope[objectname][paramname] == undefined) {
                if (value == "true" || value == "false") {
                    if (value == "true") {
                        console.log(value);
                        $scope[objectname][paramname] = true;
                    }
                    else {
                        $scope[objectname][paramname] = false;
                    }
                }
                else if (value.indexOf('cgi_get') > -1) {
                    $http.get(URL + value).success(function (data, status, headers, config) {
                        $scope[objectname][paramname] = data.Objects[0].Param[0].ParamValue;
                    }).error(function (data, status, headers, config) {

                    })
                }
                else {
                    $scope[objectname][paramname] = value;
                }
            }
        }

    }
    
    var setScopeDefaultValue = function(objectname, paramname, value){
         if ($scope[objectname] == undefined) {
                $scope[objectname] = {};
            }
            if ($scope[objectname][paramname] == undefined) {
                if (value == "true" || value == "false") {
                    if (value == "true") {
                        $scope[objectname][paramname] = true;
                    }
                    else {
                        $scope[objectname][paramname] = false;
                    }
                }
                else if (value.indexOf(httpService.get_url) > -1) {
                    $http.get(URL + value).success(function (data, status, headers, config) {
                        $scope[objectname][paramname] = data.Objects[0].Param[0].ParamValue;
                    }).error(function (data, status, headers, config) {

                    })
                }
                else {
                    $scope[objectname][paramname] = value;
                }
            }
    }
//Dependant dropdowns unique logic
    var dependencydatastatus = true;
//    var dependencydata = [];
    var dependencyarray = [];
    var dependencystatusarray = [];
    $scope.depenencyUrl = function (objectname, paramname, dependentparams, loadingstatus, jsonname) {
		if (jsonname.indexOf(httpService.get_url) > -1) {
			httpService.getData(URL + jsonname).success(function (data, status, headers, config) {
                 if(status == 200 ){
					 var temparray = [];
					 var tempUrls = [];
					 var dropdowndata = data.Objects;
				
						  if(temparray.length < 1){
							temparray.push({"id": "", "name": "Select"});
							angular.forEach(dropdowndata, function (dropObject) {
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
                              	
							});
						  }
							$scope[paramname] = temparray;
						 }
				     
                    }).error(function (data, status, headers, config) {

            })
		}
		else{
			$.getJSON(jsonname + ".json", function (data) {
					data[paramname].unshift({"id": "", "name": "Select"});
					$scope[paramname] = data[paramname];
					if ($scope[objectname] == undefined)
						$scope[objectname] = {};
					if ($scope[paramname][0] != undefined && $scope[objectname][paramname] == undefined) {
						$scope[objectname][paramname] = $scope[paramname][0].id;
					}
					else {
						$scope[objectname][paramname] = $scope[objectname][paramname]
					}
				}).error(function() { 
				       var temparray = [];
				       var dropdownvalues = jsonname.split(',');
					   angular.forEach(dropdownvalues, function (dropObject) {
									var tempObj = {};
									tempObj["id"] = dropObject;
									tempObj["name"] = dropObject;
									temparray.push(tempObj)
					    });
						$scope[paramname] = temparray;	
				});
		}
        var parentobject = undefined;
        $scope.dependencychange(objectname, parentobject, paramname, dependentparams, loadingstatus, 'init');
    }
    $scope.dependencychange = function (objectname, parentobject, paramname, dependentparams, loadingstatus, initOrChange) {
        if (dependencydatastatus) {
            dependencydatastatus = false;
            $('#ajaxLoaderSection').show();
            if(dependencydata == null || dependencydata == undefined){
                httpService.getRulesJson();
										  
				   
            }
        }
        if (loadingstatus == undefined) {
            changedFields.push(objectname + "" + paramname);
            $scope.permutationmanipulation(objectname, parentobject, paramname, dependentparams, loadingstatus, initOrChange);
        }
        else {

            dependencystatusarray.push(paramname + "intervalstatus");
            dependencyarray.push($interval(function () {
                $scope.permutationmanipulation(objectname, parentobject, paramname, dependentparams, loadingstatus, initOrChange);
            }, 1000));
        }
    }

    $scope.permutationmanipulation = function (objectname, parentobject, paramname, dependentparams, loadingstatus, initOrChange) {
        if(dependencydata == undefined || dependencydata.length < 1){
            $('#ajaxLoaderSection').show()
            setTimeout(function () {                
                $scope.permutationmanipulation(objectname, parentobject, paramname, dependentparams, loadingstatus, initOrChange);
            }, 500);
            return '';
        }
        $('#ajaxLoaderSection').hide();
        if ($scope[loadingstatus + "loadingstatus"] | loadingstatus == undefined) {
            var key = '';
            var keyList = [];
            var temp  = [];
            var temp1 = [];
            var temp2 = [];
            var temp3 = [];
            var dependentparamsintervallist = [];
            var dependencyparamsintervallist = dependentparams!=undefined ? dependentparams.split(',') : '';
            if(initOrChange == 'init'){
                
                var element = angular.element('[ng-model="'+objectname+'.'+paramname + '"]');
                var currentdependentparamsintervallist = element.attr("dependsonparams").split(',');
                angular.forEach(currentdependentparamsintervallist, function (currentdependsonparams) {
                    if(currentdependsonparams == undefined || currentdependsonparams == "")
                        return ;
                    var currentindobj = currentdependsonparams.split('?');
                    var currentindobjparams = currentindobj[1].split('&');
                    for (i = 0; i < currentindobjparams.length; i++) {
                        key += modifyService.dotstarremove(currentindobj[0], '.*') + "." + currentindobjparams[i] + "-" + ($scope[currentindobj[0].replace(/\./g, '')][currentindobjparams[i]] + "").replace(/\s*$/, '').replace(/\,/g, '') + "-";
                    }
                });          
                key = key.replace(/\-$/, '').trim();
                keyList.push(key);
                key = "";
            }
            angular.forEach(dependencyparamsintervallist, function (dependentparam) {
                if(dependentparam == undefined || dependentparam == "")
                    return ;
                var indobj = dependentparam.split('?');
                var indobjparams = indobj[1].split('&');
                for (i = 0; i < indobjparams.length; i++) {       
                    var subElement = angular.element('[ng-model="'+indobj[0].replace(/\./g, '')+'.'+indobjparams[i] + '"]');
                    dependentparamsintervallist = subElement.attr("dependsonparams").split(',');
                    angular.forEach(dependentparamsintervallist, function (dependsonparams) {
                        var indobj1 = dependsonparams.split('?');
                        var indobjparams1 = indobj1[1].split('&');
                        for (j = 0; j < indobjparams1.length; j++) {
                            key += modifyService.dotstarremove(indobj1[0], '.*') + "." + indobjparams1[j] + "-" + ($scope[indobj1[0].replace(/\./g, '')][indobjparams1[j]] + "").replace(/\s*$/, '').replace(/\,/g, '') + "-";
                        }
                    });          
                    key = key.replace(/\-$/, '').trim();
                    console.log("key",key);
                    keyList.push(key)
                    key = "";
                }
            });
            var notifystatus = false;
            var notificationmessage = '';
            if(keyList.length == 0){
                key = modifyService.dotstarremove(parentobject, '.*') + "." + paramname + "-" + ($scope[parentobject.replace(/\./g, '').replace(/\*/g, '')][paramname] + "").replace(/\s*$/, '').replace(/\,/g, '').replace(/\-/g, '');
                keyList.push(key);
            }
         angular.forEach(keyList, function (key) {
            if (dependencydata[key] != undefined && dependencydata[key][0].hasOwnProperty("message")) {
                notifystatus = true;
                notificationmessage = dependencydata[key][0]["message"];
				if(!$scope.notifications.includes(notificationmessage)){
                  $scope.notifications.push(dependencydata[key][0]["message"]);
				}
                notificationspostdata[notificationmessage] = {};
            }
			if (dependencydata[key] != undefined) {
                angular.forEach(dependencydata[key], function (dependentjsonobject, loopindex) {
				if((initOrChange == undefined || initOrChange == 'init' && dependentjsonobject.param !== paramname) && dependentjsonobject.object != undefined){
                        var setvaluestatus = true;
                        var matches = objectname.match(/\d+/g);
                        var index = '';
                        if(matches !== null && matches !== undefined && matches.length > 0){
                           index = matches[0];
                        }
                        else if($scope.ddchildobjectIndex !== null && $scope.ddchildobjectIndex !== undefined && $scope.ddchildobjectIndex !== ''){
                            index = $scope.ddchildobjectIndex;
                        }
                        var currentElement = angular.element('[ng-model="'+dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)+'.'+dependentjsonobject.param + '"]');
                        if (dependentjsonobject.hasOwnProperty('value')){
                            currentElement.parent().parent().removeClass('ng-hide');
                            currentElement.parent().parent().addClass('ng-show');                                
                            if (currentElement.hasClass('switch')) {
                                currentElement.attr('ng-disable', false);
                                //for toggle have either true/false, so need of assignment.
                            }else{
                                //ng-repeat values assigned from here(for Dropdowns).
                                $scope[dependentjsonobject.param] = modifyService.toArrayOfObjects(dependentjsonobject.value.split(','));
                                currentElement.removeAttr('disabled');
                            }
                        }
                        if (dependentjsonobject.action == "RO") {
                            var ROindex = objectname.match(/\d+/g)[0];
                            currentElement.parent().parent().removeClass('ng-hide')
                            currentElement.parent().parent().addClass('ng-show');
                            if (currentElement.hasClass('switch')) {
                                currentElement.attr('ng-disable', true);
                            }
                            else
                                currentElement.attr('disabled', '');
                            if (loadingstatus == undefined && setvaluestatus) {
                                if (dependentjsonobject.hasOwnProperty('select')) {
                                    $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param] = dependentjsonobject.select.replace(/\;/g, ',');
                                }
                            }
                        }
                        else if (dependentjsonobject.action == "hide") {
                            currentElement.parent().parent().addClass('ng-hide');
                            if (currentElement.hasClass('switch')) {
                                currentElement.attr('ng-disable', false);
                            }
                            else
                                currentElement.removeAttr('disabled');
                            if (loadingstatus == undefined && setvaluestatus) {
                                if (dependentjsonobject.hasOwnProperty('select')) {
                                    $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param] = dependentjsonobject.select.replace(/\;/g, ',');
                                }
                            }
                        }
                        else if (dependentjsonobject.action == "setvalue") {
                            currentElement.parent().parent().removeClass('ng-hide');
                            currentElement.parent().parent().addClass('ng-show');
                            if (currentElement.hasClass('switch')) {
                                currentElement.attr('ng-disable', false);
                            }
                            else
                                currentElement.removeAttr('disabled');
                            if (notifystatus) {
                                if (!($scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)] != undefined && $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)].hasOwnProperty(dependentjsonobject.param))) {
                                    setvaluestatus = false;
                                    if (notificationspostdata[notificationmessage].hasOwnProperty(dependentjsonobject.object.replace(/\*/g, index))) {
                                        notificationspostdata[notificationmessage][dependentjsonobject.object.replace(/\*/g, index)] += dependentjsonobject.param + "=" + dependentjsonobject.value + "&";
                                    }
                                    else {
                                        notificationspostdata[notificationmessage][dependentjsonobject.object.replace(/\*/g, index)] = dependentjsonobject.param + "=" + dependentjsonobject.value + "&";
                                    }
                                }
                            }
//                            console.log(loadingstatus,setvaluestatus,dependentjsonobject.hasOwnProperty('select'),"ref");
                            if (loadingstatus == undefined && setvaluestatus) {
                                if (dependentjsonobject.hasOwnProperty('select')) {
                                    if (currentElement.hasClass('switch') && dependentjsonobject.select.replace(/\;/g, ',') == "false") {                                        
                                        $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param] = false;
                                    }else
                                        $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param] = dependentjsonobject.select.replace(/\;/g, ',');
                                }
                                else
                                    $scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param] = '';
                            }
                            console.log($scope[dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index)][dependentjsonobject.param],dependentjsonobject.object.replace(/\./g, '').replace(/\*/g, index),dependentjsonobject.param,$scope[dependentjsonobject.param]);
                        }
                        if (loopindex == dependencydata[key].length - 1 && loadingstatus == undefined && $("#" + dependentjsonobject.param).attr('validation') == "true")
                        {
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(currentElement.attr('ng-change'));
                            var parameters = matches[1].split(',');
                            temp.push(parameters[0].replace(/"/g, ''));
                            temp1.push(parameters[1].replace(/"/g, ''));
                            temp2.push(parameters[2].replace(/"/g, ''));
                            temp3.push(parameters[3].replace(/"/g, ''))
                            //$scope.dependencychange(temp, temp1, temp2, temp3);
                        }
                    }
                })
            }
        });
        if(temp.length > 0){
            angular.forEach(temp, function (tempElement, tempIndex) {
                $scope.dependencychange(temp[tempIndex], temp1[tempIndex], temp2[tempIndex], temp3[tempIndex]);
            });
        }
            setTimeout(function () {
                $interval.cancel(dependencyarray[dependencystatusarray.indexOf(paramname + "intervalstatus")]);
            }, 1100)


        }
    }
//Model Dialogue Confirmation logic
    $scope.openConfirm = function (message, page) {
        $rootScope["notifymessage"] = message
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            console.log(notificationspostdata[message]);
            angular.forEach(notificationspostdata[message], function (value, key) {
                notificationpost += "Object=" + key + "&Operation=Modify&" + value;
            });
            delete notificationspostdata[message];
            $scope.notifications.splice(0, 1);
            if ($scope.notifications.length > 0) {
                $scope.notificationcall();
            }
            else {
                notificationstatus = true;
                console.log(notificationpost.replace(/\&$/, ''));
                 if(page === "macFilter"){
                   $scope.macFilterApply(notificationdataargs[0]);
                }
                else{
                $scope.Apply(notificationdataargs[0], notificationdataargs[1], notificationdataargs[2]);
                }
            }
        }, function (reason) {
            notificationdataargs = [];
        });
    };
    $scope.notificationcall = function (page) {
        $scope.openConfirm($scope.notifications[0], page);
    }
	
	/*Reset button action in IPV6*/
    $scope.resetipv6 = function () {
		$scope.DeviceIPv6={};
		$scope.DeviceRouterAdvertisementInterfaceSetting1={};
			 
            $scope.noOfForms.forEach(function (formobject) {
                var forid = formobject.id;
                if (formobject != undefined) {
                    
                        formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs);
                    
                }
                if ($("#" + forid).attr('polling')) {
                    promisearray.push($interval(function () {
						formdatapopulation(formobject.formattr, formobject.id, formobject.urlobjs);
                    }, $("#" + forid).attr('interval')));
                }
            });
            
        
       
    };
    
	
	
    
    $scope.checkWarningMessageCondition = function(ifparam,ifcondition,ifvalue,url, polling, interval, warningname){
        if(url !== undefined && url !== ''){
            warningMessageCall(ifparam,ifcondition,ifvalue,url, warningname);
            if(polling !== undefined && interval !== undefined && polling !== '' && interval !== '' && polling === 'true'){
                warningMessagePromiseArray.push($interval(function () {
                     warningMessageCall(ifparam,ifcondition,ifvalue,url, warningname)
                  }, interval));
            }
        }
    };
    
    
    function warningMessageCall(ifparam,ifcondition,ifvalue,url, messagename){
          httpService.getData(URL + url).success(function (data, status, headers, config) {
                        
                        if(data !== undefined && data.Objects !== undefined){
                              angular.forEach(data.Objects, function(object){
                                  angular.forEach(object.Param, function(param){
                                     
                                          if(param.ParamName === ifparam){
                                              if(ifcondition === 'equalsto'){
                                                  if(ifvalue === param.ParamValue){
                                                      $scope[messagename] = true;
                                                  }
                                                  else{
                                                      $scope[messagename] = false;
                                                  }
                                              }
                                          }
                                    
                                  })
                              })
                        }
                    }).error(function (data, status, headers, config) {

                    })       
    };
    
    
     $scope.PollingForParameter = function(objectname, paramname, interval){
         warningMessagePromiseArray.push($interval(function () {
                 var url = "Object=" +objectname + "&" + paramname + "=";
                    httpService.getData(url).success(function (data, status, headers, config) {
                        if(data !== undefined && data !== '' && data.Objects !== undefined && data.Objects[0] !== undefined){
                           $scope[objectname.replace(/\./g, '').replace(/\*/g, '')][paramname] = data.Objects[0].Param[0].ParamValue;
                           
                        }
                    }).error(function (data, status, headers, config) {

                    })  
                    }, interval ));
    }; 
    
    
    function customCodeForEnableApplyButton(){
         if($route.current.pathParams.param2 === 'client_mode'){
            //$rootScope.$emit('rootScope:language_changed');
             if($scope.DeviceX_LANTIQ_COM_ClientModeEndPoint1 !== undefined){
             $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint1.EnableApply = '';

            $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint1.EnableApply = $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint1.Enable;
            }
            if($scope.DeviceX_LANTIQ_COM_ClientModeEndPoint2 !== undefined){
                $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint2.EnableApply = ''; $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint2.EnableApply = $scope.DeviceX_LANTIQ_COM_ClientModeEndPoint2.Enable;
            }
            if($scope.DeviceX_LANTIQ_COM_ClientModeProfile1 !== undefined ){
                 $scope.DeviceX_LANTIQ_COM_ClientModeProfile1.EnableApply = '';  $scope.DeviceX_LANTIQ_COM_ClientModeProfile1.EnableApply = $scope.DeviceX_LANTIQ_COM_ClientModeProfile1.Enable;
            }
            if($scope.DeviceX_LANTIQ_COM_ClientModeProfile2 !== undefined ){
                 $scope.DeviceX_LANTIQ_COM_ClientModeProfile2.EnableApply = ''; $scope.DeviceX_LANTIQ_COM_ClientModeProfile2.EnableApply = $scope.DeviceX_LANTIQ_COM_ClientModeProfile2.Enable;
            }
         }
         
            if($route.current.pathParams.param2 === 'home_wifi_gw'){
                //$rootScope.$emit('rootScope:language_changed');
                 $scope.$watch('DeviceX_INTEL_COM_BEEROCKS.Operational', function (newValue, oldValue, scope) {
                     if(newValue!=="1"){
                        $scope.DeviceX_INTEL_COM_BEEROCKS.EnableApply="";
                         $scope.DeviceX_INTEL_COM_BEEROCKS.EnableApply = true;
                $("body").find("input[type='button']").attr("disabled","disabled").css("cursor","not-allowed").closest( "i.btn" ).addClass('disabled');
                         
                     }
                     if(newValue=="1"){
                         $scope.DeviceX_INTEL_COM_BEEROCKS.EnableApply = false;
                $("body").find("input[type='button']").removeAttr("disabled","disabled").closest( "i.btn" ).removeClass('disabled');
                         
                     }
    });
                
            }
        
        if($route.current.pathParams.param2 === 'wisp'){
            if($scope.DeviceX_INTEL_COM_WISPEndPoint1 !== undefined){
             $scope.DeviceX_INTEL_COM_WISPEndPoint1.EnableApply = '';

            $scope.DeviceX_INTEL_COM_WISPEndPoint1.EnableApply = $scope.DeviceX_INTEL_COM_WISPEndPoint1.Enable;
            }
            if($scope.DeviceX_INTEL_COM_WISPEndPoint2 !== undefined){
                $scope.DeviceX_INTEL_COM_WISPEndPoint2.EnableApply = ''; $scope.DeviceX_INTEL_COM_WISPEndPoint2.EnableApply = $scope.DeviceX_INTEL_COM_WISPEndPoint2.Enable;
            }            
        }
    }
    
    $scope.WanModeChangeApply = function ($event) {
        var url = "Object=Device.DeviceInfo&HardwareVersion=";
		httpService.getData(url).success(function (data, status, headers, config) {
            if (data !== undefined && data !== '' && data.Objects !== undefined && data.Objects[0] !== undefined) {
			var hardwareVersion = data.Objects[0].Param[0].ParamValue;
                if (hardwareVersion.includes("RX220") || hardwareVersion.includes("RX300") || hardwareVersion.includes("RX330") || hardwareVersion.includes("rx220") || hardwareVersion.includes("rx300") || hardwareVersion.includes("rx330")) {
                    $rootScope["notifymessage"] = 'This will cause the device to reboot.';
                    ngDialog.openConfirm({
                        template: 'modalDialogId',
                        className: 'ngdialog-theme-default'
                    }).then(function (value) {
                        $rootScope["notifymessage"] = '';
                        isReboot = true;
                        $scope.Apply($event);

                    }, function (reason) {
                        $rootScope["notifymessage"] = '';
                    });
                } else {
                    $scope.Apply($event);
                }
            }

        }).error(function (data, status, headers, config) {

        })
    }
   
   
    $scope.checkButtonState = function(user,dependsonelement,dependsonvalue){
        if(user !== undefined && user !== null){
        if(user.z !== null && user.z !== undefined){
            var objects = user.z.split(',');
            angular.forEach(objects, function(object){
               var objectWithoutIndex = object.replace(/\./g, "").replace(/\*/g, "").replace(/\d+$/g,""); 
               if(user[objectWithoutIndex+"__" + dependsonelement] !== undefined){
                   if(user[objectWithoutIndex+"__" + dependsonelement] == dependsonvalue){
                        $scope["connect"+user.objectIndex] = false;
                   }
                   else{
                       $scope["connect"+user.objectIndex] = true;
                   }
               }
            });
        }    
         
        }
    }
    
    function changeButtonState(connectIndex, event){
        event.currentTarget.innerText == "Connect"? $scope["connect"+ connectIndex] =  false : $scope["connect"+ connectIndex] = true;
		}
     
     $scope.connectDisconnectButtonClick = function (requestType, requestObjects, getUrl, event) {
         $('#ajaxLoaderSection').show();
         var objectIndex;
         var tableId = event.currentTarget.getAttribute('tableid');
         var connectIndex;
         var internetObjectIndex;
         var objectIds = event.currentTarget.attributes['id'].value.split(',');
         angular.forEach(objectIds, function (objectId) {
             for(var i =0;i < $scope[tableId + 'table'].length;i ++){
                 if($scope[tableId + 'table'][i].z.includes(objectId)){
                     objectIndex = i;
                 }
             }
             
             if (objectId.includes("connect")) {
                 connectIndex = objectId.replace(/\D+/g, '');
             }
             
             
         });
         
         
         
         if(objectIds[0].includes("Device.IP.Interface")){
                internetObjectIndex = objectIds[0].replace(/\D+/g, '');
                var interfaceName = $scope[tableId + 'table'][objectIndex].DeviceIPInterface__Name;
         
         }

         var url = URL + requestType + "?";
         var post = '';
         var uciSection = '';
         var tableObject = $scope[tableId + 'table'][objectIndex];
         $scope["formsubmitstatus"] = true;
         angular.forEach(requestObjects.split(','), function (indObj) {
             indobj = indObj.split('&');
             if (indobj.length > 1) {
                 angular.forEach(indobj, function (indobjparams, index) {
                     if (indobjparams.toLowerCase().includes('interface')) {
                         if (indobjparams.includes('*')) {
                             indobjparams = indobjparams.replace('*', objectIndex);
                         }
                         httpService.getNoSubObjectData("Object=Device.X_LANTIQ_COM_NwHardware.WANConnection&ConnectionName=&UciSection=")
                             .success(function (data, status, headers, config) {
                                 if (status == 200) {
                                     if (data !== undefined && data !== null) {
                                         angular.forEach(data.Objects, function (object) {
                                             if (object !== undefined && object !== null) {
                                                 if (object.Param[0].ParamName === "ConnectionName") {
                                                     if (object.Param[0].ParamValue === interfaceName) {
                                                         if (object.Param[1].ParamName === "UciSection") {
                                                             uciSection = object.Param[1].ParamValue;
                                                         }
                                                     }
                                                 }
                                             }

                                         });

                                         post += indobjparams + uciSection;
                                         post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
                                         
                                         modifyService.formdataRequest(url, post, function (response) {
                                             if (response.status == 200) {
                                                 if (getUrl.includes('*')) {
                                                     getUrl = getUrl.replace('*', internetObjectIndex);
                                                 }


                                                 var object = getUrl.split('&')[0];
                                                 var objectName = object.split('=')[1];

                                                 var parameter = getUrl.split('&')[1];
                                                 var parameterName = parameter.split('=')[0];
                                                setTimeout(function(){
                                                 httpService.getData(getUrl).success(function (data, status, headers, config) {
                                                     if (status == 200) {
                                                         if (data !== null && data !== undefined) {
                                                             if (data.Objects !== null && data.Objects !== undefined && data.Objects[0] !== undefined && data.Objects[0] !== null) {
                                                                 if (data.Objects[0].Param !== undefined && data.Objects[0].Param !== null) {
                                                                     if (data.Objects[0].Param[0] !== undefined && data.Objects[0].Param[0] !== null) {
                                                                        for (var key in $scope[tableId + 'table'][objectIndex]) {
                                                                                     if (key.includes(parameterName)) {
                                                                                     if($scope[tableId + 'table'][objectIndex][key] != data.Objects[0].Param[0].ParamValue){
                                                                                        $scope[tableId + 'table'][objectIndex][key] = data.Objects[0].Param[0].ParamValue;
                                                                                        changeButtonState(connectIndex, event);
                                                                                     }
                                                                                      }
                                                                                 }
                                                                     }
                                                                 }
                                                             }
                                                         }
                                                         if (ngDialog !== undefined) {
                                                             ngDialog.close();
                                                         }
                                                     } else if (status == 203) {
                                                         $scope[tableId + "popup"] = true;
                                                         //                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                                                         $scope[tableId + "popupval"] = "Object level failure for form 203";
                                                         if (ngDialog !== undefined) {
                                                             ngDialog.close();
                                                         }
                                                         $rootScope["status"] = "";

                                                     } else if (status == 206) {
                                                         $scope[tableId + "popup"] = true;
                                                         var popupmessage = '';
                                                         angular.forEach(data.Objects, function (object) {
                                                             angular.forEach(object.Param, function (param) {
                                                                 if (param.ParamId == "-1")
                                                                     popupmessage += param.ParamName + ":" + param.ParamValue;
                                                             })
                                                         })
                                                         $scope[tableId + "popupval"] = popupmessage;
                                                         if (ngDialog !== undefined) {
                                                             ngDialog.close();
                                                         }
                                                         $rootScope["status"] = "";

                                                     }

                                                 })
                                                 $('#ajaxLoaderSection').hide();
                                                },3000);

                                                 
                                             } else if (response.status == 203) {
                                                 $scope[tableId + "popup"] = true;
                                                 //                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                                                 $scope[tableId + "popupval"] = "Object level failure for form 203";
                                                 if (ngDialog !== undefined) {
                                                     ngDialog.close();
                                                 }
                                                 $rootScope["status"] = "";
                                                 $('#ajaxLoaderSection').hide();

                                             } else if (response.status == 206) {
                                                 $scope[tableId + "popup"] = true;
                                                 var popupmessage = '';
                                                 angular.forEach(response.data.Objects, function (object) {
                                                     angular.forEach(object.Param, function (param) {
                                                         if (param.ParamId == "-1")
                                                             popupmessage += param.ParamName + ":" + param.ParamValue;
                                                     })
                                                 })
                                                 $scope[tableId + "popupval"] = popupmessage;
                                                 if (ngDialog !== undefined) {
                                                     ngDialog.close();
                                                 }
                                                 $rootScope["status"] = "";
                                                 $('#ajaxLoaderSection').hide();
                                             }

                                         });
                                     }
                                 } else if (status == 203) {
                                     $scope[tableId + "popup"] = true;
                                     //                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                                     $scope[tableId + "popupval"] = "Object level failure for form 203";
                                     if (ngDialog !== undefined) {
                                         ngDialog.close();
                                     }
                                     $rootScope["status"] = "";
                                     $('#ajaxLoaderSection').hide();
                                 } else if (status == 206) {
                                     $scope[tableId + "popup"] = true;
                                     var popupmessage = '';
                                     angular.forEach(data.Objects, function (object) {
                                         angular.forEach(object.Param, function (param) {
                                             if (param.ParamId == "-1")
                                                 popupmessage += param.ParamName + ":" + param.ParamValue;
                                         })
                                     })
                                     $scope[tableId + "popupval"] = popupmessage;
                                     if (ngDialog !== undefined) {
                                         ngDialog.close();
                                     }
                                     $rootScope["status"] = "";
                                     $('#ajaxLoaderSection').hide();
                                 }
                             })
                             .error(function (data, status, headers, config) {
                                 $('#ajaxLoaderSection').hide();
                             })

                     } else {
                         if (indobjparams.split('=')[1] == "") {
                             if (event !== null && event !== undefined && event.currentTarget !== null && event.currentTarget !== undefined) {
                                 post += indobjparams.split('=')[0] + "=";
                                 post += event.currentTarget.innerText !== null && event.currentTarget.innerText !== undefined ? event.currentTarget.innerText === "Connect" ? "Connect" + "&" : "Disconnect" + "&" : "Disconnect" + "&";
                             } else {
                                 post += indobjparams.split('=')[0] + "=" + "Connect" + "&";
                             }
                         } else
                             post += indobjparams + "&";


                     }
                 })
             } else {
                 if (indobjparams.split('=')[1] == "") {
                     if (event !== null && event !== undefined && event.currentTarget !== null && event.currentTarget !== undefined) {
                         post += indobjparams.split('=')[0] + "=";
                         post += event.currentTarget.innerText !== null && event.currentTarget.innerText !== undefined ? event.currentTarget.innerText === "Connect" ? "Connect" + "&" : "Disconnect" + "&" : "Disconnect" + "&";
                     } else {
                         post += indobjparams.split('=')[0] + "=" + "Connect" + "&";
                     }
                 } else
                     post += indobjparams + "&";

                 post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '');
                 post = post.replace(/(^[&\s]+)|([&\s]+$)/g, '') + "&"
                 modifyService.formdataRequest(url, post, function (response) {
                     if (response.status == 200) {
                         if (getUrl.includes('*')) {
                             getUrl = getUrl.replace('*', objectIndex);
                         }


                         var object = getUrl.split('&')[0];
                         var objectName = object.split('=')[1];

                         var parameter = getUrl.split('&')[1];
                         var parameterName = parameter.split('=')[0];
                        setTimeout(function(){
                         httpService.getData(getUrl).success(function (data, status, headers, config) {
                             if (status == 200) {
                                 if (data !== null && data !== undefined) {
                                     if (data.Objects !== null && data.Objects !== undefined && data.Objects[0] !== undefined && data.Objects[0] !== null) {
                                         if (data.Objects[0].Param !== undefined && data.Objects[0].Param !== null) {
                                             if (data.Objects[0].Param[0] !== undefined && data.Objects[0].Param[0] !== null) {
                                                 for (var key in $scope[tableId + 'table'][objectIndex]) {
                                                                                     if (key.includes(parameterName)) {
                                                                                     if($scope[tableId + 'table'][objectIndex][key] != data.Objects[0].Param[0].ParamValue){
                                                                                        $scope[tableId + 'table'][objectIndex][key] = data.Objects[0].Param[0].ParamValue;
                                                                                        changeButtonState(connectIndex, event);
                                                                                     }
                                                                                      }
                                                                                 }

                                             }
                                         }
                                     }
                                 }
                                 if (ngDialog !== undefined) {
                                     ngDialog.close();
                                 }
                             } else if (status == 203) {
                                 $scope[tableId + "popup"] = true;
                                 //                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                                 $scope[tableId + "popupval"] = "Object level failure for form 203";
                                 if (ngDialog !== undefined) {
                                     ngDialog.close();
                                 }
                                 $rootScope["status"] = "";

                             } else if (status == 206) {
                                 $scope[tableId + "popup"] = true;
                                 var popupmessage = '';
                                 angular.forEach(data.Objects, function (object) {
                                     angular.forEach(object.Param, function (param) {
                                         if (param.ParamId == "-1")
                                             popupmessage += param.ParamName + ":" + param.ParamValue;
                                     })
                                 })
                                 $scope[tableId + "popupval"] = popupmessage;
                                 if (ngDialog !== undefined) {
                                     ngDialog.close();
                                 }
                                 $rootScope["status"] = "";

							}

                         })
                         $('#ajaxLoaderSection').hide();
                        }, 3000);
                     } else if (response.status == 203) {
                         $scope[tableId + "popup"] = true;
                         //                            $scope[formid + "popupval"] = respdata.Objects[0].Param[0].ParamValue
                         $scope[tableId + "popupval"] = "Object level failure for form 203";
                         if (ngDialog !== undefined) {
                             ngDialog.close();
                         }
                         $rootScope["status"] = "";
                         $('#ajaxLoaderSection').hide();

                     } else if (response.status == 206) {
                         $scope[tableId + "popup"] = true;
                         var popupmessage = '';
                         angular.forEach(response.data.Objects, function (object) {
                             angular.forEach(object.Param, function (param) {
                                 if (param.ParamId == "-1")
                                     popupmessage += param.ParamName + ":" + param.ParamValue;
                             })
                         })
                         $scope[tableId + "popupval"] = popupmessage;
                         if (ngDialog !== undefined) {
                             ngDialog.close();
                         }
                         $rootScope["status"] = "";
                         $('#ajaxLoaderSection').hide();
                     }

                 });

             }

         })


     }
     
     $scope.Reboot = function(event) {
        var url = URL + "cgi_action";
       var action = "Action=";
       $('#ajaxLoaderSection').show();
        var post = action + "Reboot";
        //alert(post);
        $http.post(url, post).
                success(function (data, status, headers, config) {
                    if (status === 200) {
//                        $route.reload();
                        setTimeout(function () {
                            $('#ajaxLoaderSection').hide();
                            location.href = "#/";
                        }, 180000);
                    }
                    else if (status === 203) {
                        $('#ajaxLoaderSection').hide();
                        $scope["rebootformname" + "popup"] = true;
                        $scope["rebootformname" + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    }
                    else if (status === 206) {
                        var popupvalue = '';
                        angular.forEach(data.Objects, function (object) {
                            $scope["rebootformname" + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupvalue += param.ParamName + ":" + param.ParamValue;
                            });
                        });
                        $scope["rebootformname" + "popupval"] = popupvalue;
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log("from error block");
                    $('#ajaxLoaderSection').hide();
                });
                
    };
    
    function BeerocksWebSocketConnection(){
        $rootScope["beerocksProgressValue"] = 0;
              beerocks_websocket = new WebSocket('ws://' + IP + ':5001', 'protocol_device_update');
                    beerocks_websocket.onopen = function () {
                        wsEnable = true;
                         ngDialog.openConfirm({
                                template: 'beerocksDialogId',
                                className: 'ngdialog-theme-default'
                         }).then(function (value) {
                           ngDialog.close();
                         })
                    };
                    beerocks_websocket.onmessage = function (message) {
                      data = JSON.parse(message.data);
                        objects = data.Objects;
                        if (objects) {
                            var temp = [];
                            var Objindex = objects[0].ObjName;
                            var refObjectName = objects[0].ObjName.replace(/\./g,"");
							if(refObjectName === "DeviceX_INTEL_COM_BEEROCKSWSD"){
								angular.forEach(objects[0].Param, function (obj) {
									if (obj.ParamName == "Status" || obj.ParamName == "status") {
                                       $rootScope["beerocksStatus"] = obj.ParamValue;
                                        if(obj.ParamValue === "reboot"){
										   $scope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = 'slave_init_start';
                                           $timeout(function() {
                                              createWebSocketConnection();
                                           }, 100000);
                                        }
									}
									if (obj.ParamName == "Error" || obj.ParamName == "error") {
									   $rootScope["beerocksStatus"] = obj.ParamValue;
                                    
									}
                                    if (obj.ParamName == "progress"){
                                       $rootScope["beerocksProgressValue"] = +obj.ParamValue;
                                      
									}
                                    
								});
						    }
                        }
                   };
                          
                    beerocks_websocket.onclose = function (evt) {
                        if (wsenable == false) {
                              ngDialog.close();
                        }
                        
                    };
       
    }
	
	
	function createWebSocketConnection(){
        if(beerocks_websocket != undefined){       
            beerocks_websocket.close();
        }
        
		       var  websocket = new WebSocket('ws://' + IP + ':5001', 'protocol_device_update');
                    websocket.onopen = function () {
                        wsEnable = true;
                         
                    };
                    websocket.onmessage = function (message) {
                      data = JSON.parse(message.data);
                        objects = data.Objects;
                        if (objects) {
                            var temp = [];
                            var Objindex = objects[0].ObjName;
                            var refObjectName = objects[0].ObjName.replace(/\./g,"");
							if(refObjectName === "DeviceX_INTEL_COM_BEEROCKSWSD"){
								angular.forEach(objects[0].Param, function (obj) {
									if (obj.ParamName == "Status" || obj.ParamName == "status") {
									   $rootScope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = obj.ParamValue;
                                       $scope["DeviceX_INTEL_COM_BEEROCKSWSD"]["status"] = obj.ParamValue;
									}
									
								});
						    }
                        }
                   };
                          
                    websocket.onclose = function (evt) {
                        
                    };
            
	}
    
     
    $scope.checkEditableDisable = function (key, value, index, tabledataobject, rowIndex, paramDetails) {
        var paramName = '';
        var objectIndex = index.split(',')[0].match(/\d+/g)[0];
        var isNew = index.lastIndexOf(',new');
        if(isNew === -1){
            
        if (key.toUpperCase() !== 'DELETE' && key.toUpperCase() !== 'EDIT') {
           paramName  = key.split('__')[1];
        }
        else{
            paramName = key.toUpperCase();
        }
        var objParamDetailsValue = $("tbody").attr('obj-param-details');
        var paramsAttributesArray = objParamDetailsValue.split('-');
        for (var i = 0; i < paramsAttributesArray.length; i++) {
                var param = paramsAttributesArray[i].split('?')[0];
                if (param.toUpperCase() == paramName.toUpperCase()) {
                    var attributeString = paramsAttributesArray[i].split('?')[1];
                    if (attributeString.split(':')[0] == 'access') {
                        var conditionString = attributeString.split(':')[1];
                        if(conditionString !== ""){
                        var objectName = conditionString.split('==')[0];
                        var isStarObject = objectName.lastIndexOf('*');
                            if(isStarObject > -1){
                                var object = objectName.split('*')[0];
                                var param1 = objectName.split('*')[1].replace(/\./g, '').replace(/\ /g, '');
                                object = object + "*";
                                objectName = object.replace(/\*/g, objectIndex);
                                for (var j = 0; j < $scope[object.replace(/\./g, '').replace(/\*/g, '') + 'table1'].length; j++) {
                                    if ($scope[object.replace(/\./g, '').replace(/\*/g, '') + 'table1'][j]['objectname'].replace(/\./g, '') == objectName.replace(/\./g, '')) {
                                        for (var k = 0; k < $scope[object.replace(/\./g, '').replace(/\*/g, '') + 'table1'][j]['params'].length; k++) {
                                            if ($scope[object.replace(/\./g, '').replace(/\*/g, '') + 'table1'][j]['params'][k].ParamName == param1) {
                                                return $scope[object.replace(/\./g, '').replace(/\*/g, '') + 'table1'][j]['params'][k].ParamValue == conditionString.split('==')[1].replace(/\ /g, '');
                                            }
                                        }
                                    }

                                 }
                            }
                            else{
                                var object = objectName.split('.')[0];
                                var param1 = objectName.split('.')[1].replace(/\./g, '').replace(/\ /g, '');
                                for (var k = 0; k < $scope[object.replace(/\./g, '').replace(/\*/g, '')]['params'].length; k++) {
                                            if ($scope[object.replace(/\./g, '').replace(/\*/g, '')]['params'][k].ParamName == param1) {
                                                return $scope[object.replace(/\./g, '').replace(/\*/g, '')]['params'][k].ParamValue == conditionString.split('==')[1].replace(/\ /g, '');
                                            }
                                        }
                                    }
                             }
                        
                        else{
                            return false;
                        }
                    }
                }
            }
        }
    }
     
   $scope.DefaultValuesFormApply = function ($event,elementstatus) {
        var formName = $scope[$event.currentTarget.form.name];
        var formValid = $scope[$event.currentTarget.form.name].$valid;
        if (formName != undefined && formValid == true) {
            $('#ajaxLoaderSection').show();
            console.log($event);
            var post = "";
            var url = URL + "cgi_set";
            var objects = [];
            var objectParameterList = [];
            var formObjects = $event.currentTarget.attributes['source'].value.split('&');
            angular.forEach(formObjects, function (object) {

                var objectName = object.split('?')[0];
                if (!objects.includes(objectName)) {
                    objects.push(objectName);
                    var parameterList = object.split('?')[1];
                    var parameters = parameterList.split(',');
                    objectParameterList.push({
                        object: objectName,
                        parameter: parameters
                    });
                } else {
                    for (var i = 0; i < objectParameterList.length; i++) {
                        var parameterList = object.split('?')[1];
                        var parameters = parameterList.split(',');
                        if (objectParameterList[i].object === objectName) {
                            objectParameterList[i].parameter.push.apply(objectParameterList[i].parameter, parameters);
                        }
                    }
                }
            })
            angular.forEach(objectParameterList, function (object) {
                var objectName = object.object;
                if (objectName !== "temp") {
                    var parameters = object.parameter;
                    parameters = $rootScope.remove_duplicates(parameters);
                    if(localStorage.getItem('qosadd') != null && localStorage.getItem('qosadd') == 'true'){
                        post = post + "&Object=" + objectName.replace(/\*/g, '') + "&Operation=Add";
                    }
                    else{
                        post = post + "&Object=" + objectName + "&Operation=Modify";
                    }
                    angular.forEach(parameters, function (parameter) {
                        var currentElement = angular.element('[ng-model="' + objectName.replace(/\./g, '').replace(/\*/g, '') + '.' + parameter + '"]');
                        if (currentElement.length > 0) {
																								   angular.forEach(currentElement, function(element){
                            var elementType = element.getAttribute('type');

                            if (elementType === null) {
                                elementType = element.type;
                            }
																									   if ((elementType !== null && elementType !== undefined) && elementType !== "Button") {

                                post = post + "&" + parameter + "=";
                                if ($route.current.pathParams.param2 === 'home_wifi_ire' && parameter == "Onboarding") {
                                    if ($scope[objectName.replace(/\./g, '').replace(/\*/g, '')][parameter] == true) {
                                        post = post + "false";
                                    }else{
                                        post = post + "false";
                                    }
                                } else {
																																	if(elementType != "checkbox"){
                                    paramValue = $scope[objectName.replace(/\./g, '').replace(/\*/g, '')][parameter] == undefined ? "" : $scope[objectName.replace(/\./g, '').replace(/\*/g, '')][parameter];
                                    post = post + $sanitize(paramValue).replace(/<[^>]+>/gm, '');
																																	}
																																	else{
																																				paramValue = $scope[objectName.replace(/\./g, '').replace(/\*/g, '')][parameter] == undefined ? element.checked.toString() : $scope[objectName.replace(/\./g, '').replace(/\*/g, '')][parameter];
                                    post = post + $sanitize(paramValue).replace(/<[^>]+>/gm, '');
																																	}
                                }
                            }
																											});


                        }
                    });
                }

            });

            post = post.replace("&", "");


            $http.post(url, post).
            success(function (data, status, headers, config) {
                if (status == 200) {
                    notificationpost = '';
                    changedFields = [];
                    errormessages = [];
                    localStorageService.remove('hybrideditObject');
                    $scope.objectstatus = []
                    if ($scope.isReboot !== undefined && $scope.isReboot !== '' && $scope.isReboot === true && $route.current.pathParams.param2 === 'home_wireless') {
                        $scope.Reboot($event);
                    }
                    //                                alert(localStorage.getItem('previouspagetype').contains("custom"))
                    if (elementstatus != undefined && (localStorage.getItem('previouspagetype').indexOf("custom") != -1)) {
                        $scope.customCancel(elementstatus);
                    } else {
                        if (elementstatus != undefined) {
                            $scope.Add(elementstatus)
                        } else {
                            if ($event.currentTarget.attributes["componenttype"] != undefined && $event.currentTarget.attributes["componenttype"].value == 'tablePlus')
                                $route.reload();
                            else {
                                var formid = $event.currentTarget.attributes["formname"].value;
                                var formdata = $("#" + formid).attr('name1');
                                var urlobjs = $("#" + formid).attr('urlobjs');
                                $scope.formsubmitstatus = false;
                                angular.forEach(previoousmessages, function (errormsg) {
                                    $scope[errormsg] = false;
                                })
                                if ($route.current.pathParams.param2 === 'client_mode' || $route.current.pathParams.param2 === 'home_wifi_ire' || $route.current.pathParams.param2 === 'home_wifi_gw') {
                                    $rootScope.$emit('rootScope:language_changed');
                                }
                                formdatapopulation(formdata, formid, urlobjs);
                                if ($scope.isReboot === true && ($route.current.pathParams.param2 === 'home_wifi_ire' || $route.current.pathParams.param2 === 'home_wifi_gw')) {
                                    $('#ajaxLoaderSection').show();
                                    setTimeout(function () {
                                        $('#ajaxLoaderSection').hide();
                                        location.href = "#/";
                                    }, 180000);
                                } else {
                                    $('#ajaxLoaderSection').hide();
                                }
                            }
                        }
                    }
                } else if (status == 203) {
                    var formname = $event.currentTarget.attributes['formname'].value;
                    if (previoousmessages.length > 0) {
                        angular.forEach(previoousmessages, function (errormsg) {
                            $scope[errormsg] = false;
                        })
                    }
                    $scope[formname + "popup"] = true;
                    $scope[formname + "popupval"] = data.Objects[0].Param[0].ParamValue;
                    $('#ajaxLoaderSection').hide();
                } else if (status == 207) {
                    localStorage.setItem('multistatus', true);
                    localStorage.setItem('multistatusmessage', data.Objects[0].Param[0].ParamValue)
                    if (elementstatus != undefined) {
                        $scope.Add(elementstatus);
                    } else {
                        $route.reload();
                    }
                    $('#ajaxLoaderSection').hide();
                } else if (status == 206) {
                    var formname = $event.currentTarget.attributes['formname'].value;
                    var popupmessage = '';
                    $scope[formname + "popupval"] = '';
                    angular.forEach(data.Objects, function (object) {
                        var respobject = object.ObjName.replace(/\./g, "").replace(/\*/g, "");
                        if ($event.currentTarget.attributes["componenttype"] != undefined && $event.currentTarget.attributes["componenttype"].value == 'tablePlus') {
                            $scope[formname + "popup"] = true;
                            angular.forEach(object.Param, function (param) {
                                popupmessage += param.ParamValue;
                            })
                            $scope[formname + "popupval"] += popupmessage;
                        } else {
                            if (previoousmessages.length > 0) {
                                angular.forEach(previoousmessages, function (errormsg) {
                                    $scope[errormsg] = false;
                                })
                            }
                            previoousmessages = [];
                            angular.forEach(object.Param, function (param) {
                                previoousmessages.push(respobject + "_" + param.ParamName + "responsestatus");
                                $scope[respobject + "_" + param.ParamName + "responsestatus"] = true;
                                $scope[respobject + "_" + param.ParamName + "val"] = param.ParamValue
                                errormessages.push(param.ParamValue)
                            })
                        }
                        $('#ajaxLoaderSection').hide();
                    });
                } else {
                    $('#ajaxLoaderSection').hide();
                }
                $scope.isReboot = false;

            }).
            error(function (data, status, headers, config) {
                changedFields = [];
                $('#ajaxLoaderSection').hide();
                $scope.formsubmitstatus = false;
            });

        } else {
            if (formName != undefined) {
                $scope[$event.currentTarget.form.name].$submitted = true;
                var errorCount = Object.keys($scope[$event.currentTarget.form.name].$error).length;
                $scope.formsubmitstatus = true;
                for (var i = 0; i < errorCount; i++) {
                    var errorType = Object.keys($scope[$event.currentTarget.form.name].$error)[i];
                    var error = Object.values($scope[$event.currentTarget.form.name].$error)[i];
                    angular.forEach(error, function (errorObject) {
                        console.log(errorObject);
                        var objectName = errorObject.$name;
                        $scope[$event.currentTarget.form.name + '.' + objectName + '.$error' + '.' + errorType] = true;
                    });
                }
            }
            $event.preventDefault();
        }
};
    
    $scope.BeerocksApply = function($event){

            if(websocket_beerocks !== undefined){
                 websocket_beerocks.close();
            }
            var formObject = $scope[$event.currentTarget.form.name];
            var formValid = $scope[$event.currentTarget.form.name].$valid;
            if (formObject != undefined && formValid  == true){
            if($route.current.pathParams.param2 === 'home_wifi_ire')
            {
                 $rootScope["notifymessage"] = 'Apply configuration. Are you sure?';
                ngDialog.openConfirm({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default'
                }).then(function (value) {
                    $rootScope["notifymessage"] = '';
                    $scope.isReboot = true;
                    $scope.DefaultValuesFormApply($event);

                    BeerocksWebSocketConnection();
				});


            }
            else{
           if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSEnable")){
               $rootScope["notifymessage"] = 'This will cause the device to reboot.';
                    ngDialog.openConfirm({
                        template: 'modalDialogId',
                        className: 'ngdialog-theme-default'
                    }).then(function (value) {
                        $rootScope["notifymessage"] = '';
                        $scope.Apply($event);

                        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSEnable")){
                        var index =  changedFields.indexOf("DeviceX_INTEL_COM_BEEROCKSEnable");
                        changedFields.splice(index, 1 );
                            $scope.isReboot = true;
                      }
                        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSMaster")){
                        var index =  changedFields.indexOf("DeviceX_INTEL_COM_BEEROCKSMaster");
                        changedFields.splice(index, 1);
                            $scope.isReboot = true;
                      }
                    }, function (reason) {
                       $rootScope["notifymessage"] = '';
                       if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSEnable")){
                        $scope.DeviceX_INTEL_COM_BEEROCKS.Enable = $scope.DeviceX_INTEL_COM_BEEROCKS.Enable === 0? 1:0;
                        var index =  changedFields.indexOf("DeviceX_INTEL_COM_BEEROCKSEnable");
                        changedFields.splice(index, 1 );
                      }
                        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSMaster")){
                        $scope.DeviceX_INTEL_COM_BEEROCKS.Master = $scope.DeviceX_INTEL_COM_BEEROCKS.Master  === 0? 1:0;
                        var index =  changedFields.indexOf("DeviceX_INTEL_COM_BEEROCKSMaster");
                        changedFields.splice(index, 1);
                      }
                    });
               }
               else{

                   $scope.Apply($event);



               }
            }
            }
            else{
                 if(formObject != undefined){
                    $scope[$event.currentTarget.form.name].$submitted = true;
                    var errorCount = Object.keys($scope[$event.currentTarget.form.name].$error).length;
                    $scope.formsubmitstatus = true;
                    for(var i=0; i<errorCount;i++){
                        var errorType = Object.keys($scope[$event.currentTarget.form.name].$error)[i];
                        var error = Object.values($scope[$event.currentTarget.form.name].$error)[i];
                         angular.forEach(error,function(errorObject){
                                      console.log(errorObject);
                                      var objectName = errorObject.$name;
                                      $scope[$event.currentTarget.form.name + '.'+ objectName + '.$error' + '.' + errorType] = true;
                                                 });
                }
               }
                 $event.preventDefault();
            }
        
    };
	
	$scope.RebootApply=function($event){

        var param1=$scope.DeviceX_INTEL_COM_BEEROCKS.OperatingMode;
        var param2=$scope.DeviceX_INTEL_COM_BEEROCKS.ManagementMode;

        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSOperatingMode") || changedFields.includes("DeviceX_INTEL_COM_BEEROCKSManagementMode")){


        $rootScope["notifymessage"] = 'Device may go for a reboot';
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            $rootScope["notifymessage"] = '';
            $scope.Apply($event);
            $rootScope.$emit('beerocksmenuchangeevent',param1,param2);

        });

    }else{
        $scope.Apply($event);
        $rootScope.$emit('beerocksmenuchangeevent',param1,param2);
    }

    }

    $scope.AddNetwork = function () {
        ngDialog.openConfirm({ template: 'addnetwork.html', className: 'ngdialog-theme-default',
        controller:"addNetworkController" });
    };

    $scope.AccessPointNetworkApply=function($event){
        if(changedFields.length>1){
        $('#ajaxdataLoaderSection').show();

        var currentIndex="";
        var addPost="Object=Device.X_INTEL_COM_BEEROCKS.WiFi.Front.Ap."+$rootScope.gwdropdownIndex+"&Operation=Modify";
        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSWiFiFrontApSSID")) 
        addPost+="&SSID="+$scope.DeviceX_INTEL_COM_BEEROCKSWiFiFrontAp.SSID;
        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSWiFiFrontApModeEnabled")) 
        addPost+="&ModeEnabled="+$scope.DeviceX_INTEL_COM_BEEROCKSWiFiFrontAp.ModeEnabled;
        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSWiFiFrontApKeyPassphrase")) 
        addPost+="&KeyPassphrase="+$scope.DeviceX_INTEL_COM_BEEROCKSWiFiFrontAp.KeyPassphrase;
        if(changedFields.includes("DeviceX_INTEL_COM_BEEROCKSWiFiFrontApHidden")) 
        addPost+="&Hidden="+$scope.DeviceX_INTEL_COM_BEEROCKSWiFiFrontAp.Hidden;
        $http.post(URL + "cgi_set?",addPost).success(function(){

            $location.path("/tableform/home_wifi_gw");
            $route.reload();
            $('#ajaxdataLoaderSection').hide();

        })
    }else{
        alert("None of the parameters changed to update")
    }

    }

    $scope.RemoveNetwork=function($event){

        var currentIndex="";
        if($rootScope.gwdropdownIndex!=1){
            $('#ajaxdataLoaderSection').show();

            $http.post(URL + "cgi_set?","Object=Device.X_INTEL_COM_BEEROCKS.WiFi.Front.Ap."+$rootScope.gwdropdownIndex+'&Operation=Modify&EntryValid=false').success(function(){

                $location.path("/tableform/home_wifi_gw");
                $route.reload();
                $('#ajaxdataLoaderSection').hide();

    
            })
        }else{
            alert("Default VAP can not be removed");
            $('#ajaxdataLoaderSection').hide();

        }
        
    }

    $scope.WPSAccesspintGW=function($event){
        $('#ajaxdataLoaderSection').show();

        var currentIndex="";
        $http.post(URL + "cgi_set?","Object=Device.X_INTEL_COM_BEEROCKS&Operation=Modify&WPSEvent=wps-pbc-ap").success(function(){
            
            $('#ajaxdataLoaderSection').hide();

        })
    }

    $scope.WPSAccesspintIRE=function($event){
        $('#ajaxdataLoaderSection').show();

        var currentIndex="";
        $http.post(URL + "cgi_set?","Object=Device.X_INTEL_COM_BEEROCKS&Operation=Modify&WPSEvent=wps-pbc-ep").success(function(){
            
            $('#ajaxdataLoaderSection').hide();

        })
    }
   

    
 
						// Custom validation for WLAN LOGGER form
				$timeout(function () {
					if (localStorage.getItem("xml") == "wifi5_2_wlanLogger" ||
						localStorage.getItem("xml") == "wifi5_wlanLogger" ||
						localStorage.getItem("xml") == "wifi2.4_wlanLogger") 
                    {
						angular.element(document).ready(function () {
							console.log('page loading completed');

							var form = $('form#DeviceWiFiRadio1X_LANTIQ_COM_Vendor:first');

							if (localStorage.getItem("xml") == "wifi5_wlanLogger") {
								var form = $('form#DeviceWiFiRadio2X_LANTIQ_COM_Vendor:first');
							}

							if (localStorage.getItem("xml") == "wifi5_2_wlanLogger") {
								var form = $('form#DeviceWiFiRadio3X_LANTIQ_COM_Vendor:first');
							}

							var button = form.closest("div.panel-body").find('input[type="button"]');

							button.on("click", function (e) {
								var selectedvalue = form.find("select").val();
								if (selectedvalue === "0") {
									$timeout(function () {
										$scope.DeviceWiFiRadio1X_LANTIQ_COM_Vendor_WaveDriverDebugLevelresponsestatus = false;
										e.preventDefault();
									})
									form.find("select").next().hide().next().removeClass("ng-hide");
								}
							})

							form.find("select").change(function () {
								if ($(this).val() !== "0") {
									$(this).next().next().addClass("ng-hide");
								}
							});

						});
					}
				},0)
    
     $scope.BeerocksModalForScan = function (formname) {
    
           ngDialog.openConfirm({
                template: formname + '.html',
                className: 'ngdialog-theme-default custom-width-600'
            }).then(function (value) {
                console.log(value);
            }, function (reason, data) {
                if(reason === "OK"){
                  $scope.selectedItem = clientModeService.getObject();
					  if($scope.DeviceX_INTEL_COM_BEEROCKSWiFi === undefined){
						  $scope.DeviceX_INTEL_COM_BEEROCKSWiFi = [];
					  }
					    changedFields.push('DeviceX_INTEL_COM_BEEROCKSWiFiSSID');
                        $scope.DeviceX_INTEL_COM_BEEROCKSWiFi.SSID = $scope.selectedItem.SSID;
					    changedFields.push('DeviceX_INTEL_COM_BEEROCKSWiFiModeEnabled');
                        $scope.DeviceX_INTEL_COM_BEEROCKSWiFi.ModeEnabled = $scope.selectedItem.ModeEnabled;
					    changedFields.push('DeviceX_INTEL_COM_BEEROCKSWiFiWEPKey');
                        $scope.DeviceX_INTEL_COM_BEEROCKSWiFi.WEPKey = $scope.selectedItem.WEPKey;
					    changedFields.push('DeviceX_INTEL_COM_BEEROCKSWiFiKeyPassphrase');
                        $scope.DeviceX_INTEL_COM_BEEROCKSWiFi.KeyPassphrase = $scope.selectedItem.KeyPassphrase;
                      
                    
                }
			   else{
				  $('#ajaxLoaderSection').hide();
				  $('#ajaxLoaderSection').hide();
			   }
            });
              

    }

})
