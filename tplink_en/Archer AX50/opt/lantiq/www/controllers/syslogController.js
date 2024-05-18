/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myapp.controller("syslogController", function ($scope, $http, $route, $translate, $rootScope, $interval) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
    
    /* Breadscrumbs Logic starts here */
/*    setTimeout(function () {
        console.log(breadcrumbsdata)
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
        }
        console.log($rootScope["breadcrumbs"])
    }, 100);*/
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
    var filter = "all";
    var count = 0;
    $scope.logs = [
        {
            "time": "Jun 8 00:00:00",
            "type": "web",
            "level": "info",
            "content": "Start Log",
            "class": "black_bg"
        }
    ];

    $scope.filterType = function () {
        filter = $scope.type;
        console.log(filter);
    };
    $scope.newLog = {};

    websocket_log = new WebSocket('ws://' + IP + ':5001', 'protocol_system_log');
    websocket_log.onopen = function () {
        console.log("WS LOG Connection established !!\n");
        websocket_log.send(sessionStorage.getItem('hybrideditObject'));
    };

    websocket_log.onmessage = function (message) {
        
        var row = message.data;
        var p1 = row.substring(0, row.indexOf("-")).trim();
        var items = p1.split(" "); //Jul  8 06:18:04 syslog:debug
        var items1 = [];
        if (items.length == 5)
            items1 = items[4].split(":");
        else
            items1 = items[3].split(":");
        $scope.newLog.type = items1[0];
        $scope.newLog.level = items1[1];

        if ($scope.newLog.level === 'err' || $scope.newLog.level === 'critical')
            $scope.newLog.class = "org_bg";
        else if ($scope.newLog.level === 'alert' || $scope.newLog.level === 'emergency')
            $scope.newLog.class = "mrn_bg";
        else {
            $scope.newLog.class = "black_bg";
        }
        if (items.length == 5)
            $scope.newLog.time = items[0] + " " + items[3];
        else
            $scope.newLog.time = items[0] + " " + items[2];
        $scope.newLog.content = row.substring(row.indexOf("-") + 1, row.length).trim();
        //var tr = "<tr class='"+cls+"'><td>"+dt+"</td><td>"+type+"</td><td>"+notice+"</td><td>"+p2+"</td></tr>";
        //websocket_log.close();
        //console.log(row);
        if ($scope.newLog.level === filter) {
            //$scope.logs.push(angular.copy($scope.newLog));
            $scope.logs.splice(0, 0, angular.copy($scope.newLog));
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            //$scope.newLog = {};
        }
        if (filter === "all") {
            $scope.logs.splice(0, 0, angular.copy($scope.newLog));
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        count = count + 1;
//        if (count > 100) {
//            //$('#log tr:first').remove();
//            websocket_log.close();
//        }

    };

    websocket_log.onclose = function () {
        console.log("Connection is closed... Bye !");
    };

    $scope.back = function (param1) {
        location.href = "#/tableform/" + param1
    }
    $scope.clearAll = function () {
        /*var hybrideditObject = localStorage.getItem('hybrideditObject');
         localStorage.removeItem('hybrideditObject');
         var url = URL + "cgi_set";
         var post = "?Object=" + hybrideditObject + "&Operation=Modify&X_LANTIQ_COM_ClearLog=true";
         $http.post(url, post).
         success(function (data, status, headers, config) {
         $route.reload();
         }).
         error(function (data, status, headers, config) {
         });*/
        $scope.logs = [];
    };
    $(window).on('beforeunload', function () {
        websocket_log.close();
    });
});
