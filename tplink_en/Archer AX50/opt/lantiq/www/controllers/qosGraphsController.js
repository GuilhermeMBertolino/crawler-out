myapp.controller("qosGraphsController", function ($rootScope, $scope, $http, $route, $routeParams, localStorageService, modifyService, $element, $interval, $q) {
    $("#ajaxLoaderSection").show();
    pageloadiconstatus = true;
   
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
    
    getFormData = function (reqParams) {
        $http.get(URL + reqParams).
                success(function (data, status, headers, config) {
                    var forminterfaceObjects = ["Device.IP.Interface.*"];
                    objects = data.Objects;
                    for (var i = 0; i < objects.length; i++) {
                        var objectname = objects[i].ObjName;
                        if (forminterfaceObjects.indexOf(modifyService.dotstarremove(objectname, '.*')) > -1) {
                            var objectParamValues = objects[i].Param;
                            for (var pa1 = 0; pa1 < objectParamValues.length; pa1++) {
                                var param_name = objectParamValues[pa1].ParamName;
                                var ParamValue = objectParamValues[pa1].ParamValue;
                                if ($scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] === undefined)
                                    $scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")] = {};
                                $scope[modifyService.dotstarremove(objectname, '.*').replace(/\./g, "").replace(/\*/g, "")][param_name] = ParamValue;
                                if (param_name === "Name") {
                                    $scope.interfacevalue = ParamValue;
                                }
                            }
                        }
                    }
                }).
                error(function (data, status, headers, config) {
                });
    };
    getFormData("cgi_get?Object=Device.IP.Interface&X_LANTIQ_COM_DefaultGateway=true");
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
    changeUrl = "";
    $scope.textChange = function (param) {
        var value = $scope[param.split('.')[0]][param.split('.')[1]];
        changeUrl = "cgi_get_filterbyfirstparamval?Object=Device.QoS.QueueStats&X_LANTIQ_COM_LowerLayers=" + value + "&QueueOccupancyPercentage=&Queue=&OutputPackets=&X_LANTIQ_COM_InputPackets=";
        $rootScope.$broadcast('rootScope:broadcast1', changeUrl);
    };
});

myapp.directive('occupancyChart', function () {
    return {
        restrict: "E",
        templateUrl: 'barchart.html',
        scope: {
            interfaceName: '=interface'
        },
        controller: function ($rootScope, $scope, $http, $attrs, $interval, $compile, $element) {
            $scope.timeaxis = 0;
            $scope.color = $attrs.color;
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.fillcolors = $attrs.fillcolors;
            $scope.strokecolors = $attrs.strokecolors;
            $scope.highlightfill = $attrs.highlightfill;
            $scope.highlightstroke = $attrs.highlightstroke;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.urls = $attrs.url;
            $scope.units = $attrs.units;
            var latestLabel = [];
            var myLiveChart = null;
            var promise = '';
            var el = $element.find(".bar")[0];
            var ctx = el.getContext('2d');
            $scope.queuenameArray = [];

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
                            text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(" ","_") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
                        }],
					    xAxes: [{barPercentage: 15}]
                }
            };
            if ($scope.units) {
                options = {
                    tooltips: {
                        titleFontSize: 14,
                        bodyFontSize: 14,
                        mode: 'label',
						callbacks: {
							label: function(tooltipItems, data) {
								return tooltipItems.yLabel + " " + $scope.units;
							}
						}
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
                            text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(" ","_") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
                        }],
					    xAxes: [{barPercentage: 1.0,
								categoryPercentage: 1.0}]
                }
                };
            }


            startingData = {
                labels: [1],
                datasets: []
            },
            latestLabel = startingData.labels[0];
            var fillcolorsData = JSON.parse($scope.fillcolors);
            var strokecolorsData = JSON.parse($scope.strokecolors);
            var highlightfillData = JSON.parse($scope.highlightfill);
            var highlightstrokeData = JSON.parse($scope.highlightstroke);

            $rootScope.$on('rootScope:broadcast1', function (event, data) {
                $interval.cancel(promise);
                startingData = {
                    labels: [1],
                    datasets: []
                },
                latestLabel = startingData.labels[0];
                fillcolorsData = JSON.parse($scope.fillcolors);
                strokecolorsData = JSON.parse($scope.strokecolors);
                highlightfillData = JSON.parse($scope.highlightfill);
                highlightstrokeData = JSON.parse($scope.highlightstroke);
                getQosStatsData(data, "add");
                promise = $interval(setInterval, $scope.pollinterval);
                $scope.queuenameArray = [];
            });

            function getQosStatsData(reqParams, charttype) {
                $scope.queueindexarray1 = [];
                $http.get(URL + reqParams).
                        success(function (data, status, headers, config) {
                            objects1 = data.Objects;
                            qosstatsArray = [];
                            for (var obj = 0; obj < objects1.length; obj++) {
                                var objectParamValues = objects1[obj].Param;
                                var qostatsobject = {};
                                var queueobject = {};
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;
                                    if (param_name === "QueueOccupancyPercentage") {
                                        qostatsobject[param_name] = param_value;
                                    }
                                    if (param_name === "Queue") {
                                        queueobject[param_name] = param_value;
                                        $scope.queueindexarray1.push(param_value);
                                    }
                                }

                                if ($scope.queueindex1 !== undefined) {
                                    var label_class = $scope.queuenameArray[$scope.queueindex1];
                                    $scope.isEnabled = document.getElementsByClassName(label_class)[0].className.indexOf('enabled');
                                    console.log("Enabled for barchart: " + $scope.isEnabled);
                                }

                                tmpValues = parseInt(qostatsobject.QueueOccupancyPercentage);
                                console.log("QueueOccupancyPercentage:" + tmpValues);
                                qosstatsArray.push(tmpValues);
                                if ($scope.isEnabled === -1)
                                    qosstatsArray[$scope.queueindex1] = '';
//                                console.log(qosstatsArray)

                                if (charttype === "add") {
                                    $scope.queuenameArray.push(queueobject.Queue);
                                }
                            }
                            if (charttype === "add") {
                                startingData.datasets = [];
                                for (var i = 0; i < qosstatsArray.length; ++i) {
                                    var tmp = {};
                                    tmp['label'] = $scope.queuenameArray[i];
                                    tmp['fillColor'] = fillcolorsData[i];
                                    tmp['strokeColor'] = strokecolorsData[i];
                                    tmp['highlightFill'] = highlightfillData[i];
                                    tmp['highlightStroke'] = highlightstrokeData[i];
                                    tmp['data'] = [0];
									tmp['backgroundColor'] = fillcolorsData[i];
									tmp['borderColor'] = strokecolorsData[i];
									tmp['borderWidth'] = 2;
                                    startingData.datasets.push(tmp);
                                }
                                ;
                                // Reduce the animation steps for demo clarity.                                
                                myLiveChart = new Chart(ctx,{
									type: 'bar',
                                    data: startingData,
                                    options: options
								});
//                                document.getElementById('js-legend1').innerHTML = myLiveChart.generateLegend();
                                var legend = myLiveChart.generateLegend();
                                $('.js-legend1').html(legend);
                                $compile($('.js-legend1').html(legend))($scope);
								
								myLiveChart.data.labels.push(++latestLabel);
								myLiveChart.data.datasets[0].data.push(qosstatsArray[0]);
								myLiveChart.update();
								// Remove the first point so we dont just add values forever
								myLiveChart.data.datasets[0].data.splice(0, 1);
								myLiveChart.data.labels.splice(0, 1);
								
								myLiveChart.update();
                                
                            }
                        }).
                        error(function (data, status, headers, config) {
                        });
            }
            setTimeout(function () {
                if ($scope.interfaceName !== "") {
                    $scope.urls = "cgi_get_filterbyfirstparamval?Object=Device.QoS.QueueStats&X_LANTIQ_COM_LowerLayers=" + $scope.interfaceName + "&QueueOccupancyPercentage=&Queue=&OutputPackets=&X_LANTIQ_COM_InputPackets=";
                    getQosStatsData($scope.urls, "add");
                }
                else {
                    getQosStatsData($scope.urls, "add");
                }
            }, 1000);
            function setInterval() {
                if (changeUrl === "") {
                    getQosStatsData($scope.urls);
                }
                else {
                    $scope.urls = changeUrl;
                    getQosStatsData($scope.urls);
                }
                if (latestLabel === 1) {
					myLiveChart.data.labels.push(++latestLabel);
					myLiveChart.data.datasets[0].data.push(qosstatsArray[0]);
					myLiveChart.update();
					// Remove the first point so we dont just add values forever
					myLiveChart.data.datasets[0].data.splice(0, 1);
					myLiveChart.data.labels.splice(0, 1);
					myLiveChart.update();
                }
                else {
//                        ++latestLabel;
                    for (var i = 0; i < $scope.queuenameArray.length; ++i) {

                        myLiveChart.data.datasets[0].data[i] = qosstatsArray[0];
                        myLiveChart.data.datasets[0].fillColor = fillcolorsData[i];
                        myLiveChart.data.datasets[0].strokeColor = strokecolorsData[i];
						myLiveChart.data.datasets[0].backgroundColor = fillcolorsData[i];
						myLiveChart.data.datasets[0].borderColor = strokecolorsData[i];
                        myLiveChart.data.datasets[0].highlightFill = highlightfillData[i];
                        myLiveChart.data.datasets[0].highlightStroke = highlightstrokeData[i];
						myLiveChart.data.datasets[0].borderWidths = 2;
                    }
                    myLiveChart.update();
                }
            }

            promise = $interval(setInterval, $scope.pollinterval);
            // Cancel interval on page changes
            $scope.$on('$destroy', function () {
                if (angular.isDefined(promise)) {
                    $interval.cancel(promise);
                    promise = undefined;
                }
            });
            $scope.toggleLine1 = function (t, event) {
                console.log("target: " + event.currentTarget);
                console.log("Object:" + t);
                console.log("class:" + event.currentTarget.className);
                var classname = event.currentTarget.className.split(' ');
                $scope.queueindex1 = $scope.queueindexarray1.indexOf(classname[0]);
                if ((event.currentTarget.className).indexOf('enabled') === -1)
                    event.currentTarget.className += ' enabled';
                else {
                    event.currentTarget.className = (event.currentTarget.className).replace('enabled', '');
                }
            };

        }
    };
});

myapp.directive('qosChart', function () {
    return {
        restrict: "E",
        templateUrl: 'qoschart.html',
        scope: {
            interfaceName: '=interface'
        },
        controller: function ($rootScope, $scope, $http, $attrs, $interval, $element, $compile) {
            $scope.timeaxis = 0;
            $scope.color = $attrs.color;
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.titleclass = $scope.title.split(' ')[0];
            $scope.fillcolors = $attrs.fillcolors;
            $scope.strokecolors = $attrs.strokecolors;
            $scope.highlightfill = $attrs.highlightfill;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.units = $attrs.units;
            $scope.urls = $attrs.url;
            var myLineChart = null;
            var promise1 = '';
            var el = $element.find(".line")[0];
            var ctx = el.getContext('2d');
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
                            text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
            if ($scope.units) {
                options = {
                    // String - Template string for single tooltips
                    tooltips: {
                        titleFontSize: 14,
                        bodyFontSize: 14,
                        mode: 'label',
						callbacks: {
							label: function(tooltipItems, data) { 
								return tooltipItems.xLabel + " : " + tooltipItems.yLabel + " " + $scope.units;
							}
						}
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
                                    text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
            }
			}
            var latestLabel1 = [];
            $scope.queuenameArray1 = [];
            var setCount = 1;
            var prevData = [];

            startingData1 = {
                labels: [1],
                datasets: []
            },
            latestLabel1 = startingData1.labels[0];
            var fillcolorsData1 = JSON.parse($scope.fillcolors);
            var strokecolorsData1 = JSON.parse($scope.strokecolors);
            var highlightfillData1 = JSON.parse($scope.highlightfill);
            var backgroundcolorsData1 = JSON.parse($scope.strokecolors);

            $rootScope.$on('rootScope:broadcast1', function (event, data) {
                if (myLineChart !== undefined || myLineChart !== null) {
                    myLineChart.destroy();
                    delete myLineChart;
                }
                angular.forEach(myLineChart.datasets, function (dataset) {
                    for (i in dataset.points)
                        myLineChart.data.datasets[i].data.splice(0,1);
                    
                    myLineChart.update();
                });
                $interval.cancel(promise1);

                startingData1 = {
                    labels: [1],
                    datasets: []
                },
                latestLabel1 = startingData1.labels[0];
                fillcolorsData1 = JSON.parse($scope.fillcolors);
                strokecolorsData1 = JSON.parse($scope.strokecolors);
                highlightfillData1 = JSON.parse($scope.highlightfill);
                setCount = 1;
                getQosStatsData1(data, "add");
                promise1 = $interval(setInterval1, $scope.pollinterval);
                $scope.queuenameArray1 = [];
            });

            function getQosStatsData1(reqParams, charttype) {
                $scope.queueindexarray = [];
                $http.get(URL + reqParams).
                        success(function (data, status, headers, config) {
                            var tmpData = [];
                            objects2 = data.Objects;
                            qosstatsArray1 = [];
                            for (var obj = 0; obj < objects2.length; obj++) {
                                if (charttype == "add") {
                                    prevData[obj] = [];
                                }
                                var objectParamValues = objects2[obj].Param;
                                var qostatsobject = {};
                                var queueobject = {};
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;
                                    if (param_name === "OutputPackets") {
                                        qostatsobject[param_name] = param_value;
                                    }
                                    if (param_name === "Queue") {
                                        queueobject[param_name] = param_value;
                                        $scope.queueindexarray.push(param_value);
                                    }
                                }

                                if ($scope.queueindex != undefined) {
                                    var label_class = $scope.titleclass + "_" + $scope.queuenameArray1[$scope.queueindex]
                                    $scope.isEnabled1 = document.getElementsByClassName(label_class)[0].className.indexOf('enabled')
                                    console.log("Enabled: " + $scope.isEnabled1);
                                }
                                if (setCount > 1) {
                                    console.log("parseInt(qostatsobject.OutputPackets) : " + parseInt(qostatsobject.OutputPackets));
                                    console.log(" prevData : " + prevData[obj][prevData[obj].length - 1]);
                                    valc = (parseInt(qostatsobject.OutputPackets) - prevData[obj][prevData[obj].length - 1]) / ($scope.pollinterval * (Math.pow(10, -3)));
                                    console.log("Valc is : " + valc);
                                    tmpData.push(valc);
                                    pdata = parseInt(qostatsobject.OutputPackets);
                                    console.log("pdata : " + pdata);
                                    prevData[obj].push(pdata);
                                }
                                else {
                                    parseInt(qostatsobject.OutputPackets);
                                    valc = (parseInt(qostatsobject.OutputPackets)) / ($scope.pollinterval * (Math.pow(10, -3)));
                                    prevData[obj].push(parseInt(qostatsobject.OutputPackets));
                                    tmpData.push(valc);
                                }
                                if ($scope.isEnabled1 === -1)
                                    tmpData[$scope.queueindex] = '';
                                qosstatsArray1 = tmpData;
                                if (charttype === "add") {
                                    $scope.queuenameArray1.push(queueobject.Queue);
                                }
                            }

                            if (charttype === "add") {
                                startingData1.datasets = [];
                                for (var i = 0; i < qosstatsArray1.length; ++i) {
                                    var tmp = {};
                                    tmp['label'] = $scope.queuenameArray1[i];
                                    tmp['fillColor'] = fillcolorsData1[i];
                                    tmp['strokeColor'] = strokecolorsData1[i];
                                    tmp['pointColor'] = highlightfillData1[i];
                                    tmp['data'] = [0];
                                    tmp['borderColor'] = strokecolorsData1[i];
                                    var backgroundColorOpaqueIndex = backgroundcolorsData1[i].lastIndexOf(',');
                                    var backgroundColor =  backgroundcolorsData1[i].substr(0, backgroundColorOpaqueIndex + 1) + "0.5"  + backgroundcolorsData1[i].substr(backgroundColorOpaqueIndex + 2);
                                    tmp['backgroundColor'] = backgroundColor;
                                    startingData1.datasets.push(tmp);
                                }
                                ;
                                // Reduce the animation steps for demo clarity.

                                myLineChart = new Chart(ctx, {
                                              type: 'line',
                                              data: startingData1,
                                              options: options
                                            
                                });
//                                document.getElementById('js-legend').innerHTML = myLineChart.generateLegend();
                                var legend = myLineChart.generateLegend();
                                $('.js-legend').html(legend);
                                $compile($('.js-legend').html(legend))($scope);
                            }
                        }).
                        error(function (data, status, headers, config) {
                        });
            }
            setTimeout(function () {
                if ($scope.interfaceName !== "") {
                    $scope.urls = "cgi_get_filterbyfirstparamval?Object=Device.QoS.QueueStats&X_LANTIQ_COM_LowerLayers=" + $scope.interfaceName + "&QueueOccupancyPercentage=&Queue=&OutputPackets=&X_LANTIQ_COM_InputPackets=";
                    getQosStatsData1($scope.urls, "add");
                }
                else {
                    getQosStatsData1($scope.urls, "add");
                }
            }, 1000);

            function setInterval1() {
                if (changeUrl === "") {
                    getQosStatsData1($scope.urls);
                }
                else {
                    $scope.urls = changeUrl;
                    getQosStatsData1($scope.urls);
                }
                myLineChart.data.labels.push(++latestLabel1);
                myLineChart.data.datasets[0].data.push(qosstatsArray1[0]);
                setCount++;
                myLineChart.update();
                // Remove the first point so we dont just add values forever
                if (latestLabel1 > 3)
                {
                    myLineChart.data.datasets[0].data.splice(0, 1);
					myLineChart.data.labels.splice(0, 1);
                }
                myLineChart.update();
            }

            promise1 = $interval(setInterval1, $scope.pollinterval);
            // Cancel interval on page changes
            $scope.$on('$destroy', function () {
                if (angular.isDefined(promise1)) {
                    $interval.cancel(promise1);
                    promise1 = undefined;
                }
            });
            $scope.toggleLine = function (t, event) {
                console.log("target: " + event.currentTarget);
                console.log("Object:" + t);
                console.log("class:" + event.currentTarget.className);
                var classname = event.currentTarget.className.split(' ')[0].split('_')[1];
                $scope.queueindex = $scope.queueindexarray.indexOf(classname);
                if ((event.currentTarget.className).indexOf('enabled') === -1)
                    event.currentTarget.className += ' enabled';
                else {
                    event.currentTarget.className = (event.currentTarget.className).replace('enabled', '');
                }
            };
        
    }

	};
});
myapp.directive('qosChart1', function () {
    return {
        restrict: "E",
        templateUrl: 'qoschartrx.html',
        scope: {
            interfaceName: '=interface'
        },
        controller: function ($rootScope, $scope, $http, $attrs, $interval, $element, $compile) {
            $scope.timeaxis = 0;
            $scope.color = $attrs.color;
            $scope.title = $attrs.title;
            $scope.icon = $attrs.icon;
            $scope.titleclass = $scope.title.split(' ')[0];
            $scope.fillcolors = $attrs.fillcolors;
            $scope.strokecolors = $attrs.strokecolors;
            $scope.highlightfill = $attrs.highlightfill;
            $scope.pollinterval = $attrs.pollinterval;
            $scope.urls = $attrs.url;
            $scope.units = $attrs.units;
            var myLineChart1 = null;
            var promise2 = '';
            var el = $element.find(".line")[0];
            var ctx = el.getContext('2d');
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
                            text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
            if ($scope.units) {
                options = {
                    tooltips: {
                        titleFontSize: 14,
                        bodyFontSize: 14,
                        mode: 'label',
						callbacks: {
							label: function(tooltipItems, data) { 
								return tooltipItems.xLabel + " : " + tooltipItems.yLabel + " " + $scope.units;
							}
						}
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
                            text.push('<li class="' + $scope.titleclass + "_" +  chart.data.datasets[i].label.replace(/[^a-zA-Z0-9]/g, "") +' enabled"><span style="background-color:' + chart.data.datasets[i].strokeColor + '"></span>');
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
            var latestLabel2 = [];
            $scope.queuenameArray2 = [];
            var setCount = 1;
            var prevData = [];


            startingData2 = {
                labels: [1],
                datasets: []
            },
            latestLabel2 = startingData2.labels[0];
            var fillcolorsData2 = JSON.parse($scope.fillcolors);
            var strokecolorsData2 = JSON.parse($scope.strokecolors);
            var highlightfillData2 = JSON.parse($scope.highlightfill);
			var backgroundcolorsData2 =  JSON.parse($scope.strokecolors);

            $rootScope.$on('rootScope:broadcast1', function (event, data) {
                if (myLineChart1 !== undefined || myLineChart1 !== null) {
                    myLineChart1.destroy();
                    delete myLineChart1;
                }
                angular.forEach(myLineChart1.datasets, function (dataset) {
                    for (i in dataset.points)
                        myLineChart1.removeData();
                });
                $interval.cancel(promise2);

                startingData2 = {
                    labels: [1],
                    datasets: []
                },
                latestLabel2 = startingData2.labels[0];
                fillcolorsData2 = JSON.parse($scope.fillcolors);
                strokecolorsData2 = JSON.parse($scope.strokecolors);
                highlightfillData2 = JSON.parse($scope.highlightfill);
				backgroundcolorsData2 =  JSON.parse($scope.strokecolors);
                setCount = 1;
                getQosStatsData2(data, "add");
                promise2 = $interval(setInterval2, $scope.pollinterval);
                $scope.queuenameArray2 = [];
            });

            function getQosStatsData2(reqParams, charttype) {
                $scope.queueindexarray2 = [];
                $http.get(URL + reqParams).
                        success(function (data, status, headers, config) {
                            var tmpData = [];
                            objects3 = data.Objects;
                            qosstatsArray2 = [];
                            for (var obj = 0; obj < objects3.length; obj++) {
                                if (charttype == "add") {
                                    prevData[obj] = [];
                                }
                                var objectParamValues = objects3[obj].Param;
                                var qostatsobject = {};
                                var queueobject = {};
                                for (var i = 0; i < objectParamValues.length; i++) {
                                    var param_name = objectParamValues[i].ParamName;
                                    var param_value = objectParamValues[i].ParamValue;
                                    if (param_name === "X_LANTIQ_COM_InputPackets") {
                                        qostatsobject[param_name] = param_value;
                                    }
                                    if (param_name === "Queue") {
                                        queueobject[param_name] = param_value;
                                        $scope.queueindexarray2.push(param_value);
                                    }
                                }
                                if ($scope.queueindex2 != undefined) {
                                    var label_class = $scope.titleclass + "_" + $scope.queuenameArray2[$scope.queueindex2]
                                    $scope.isEnabled1 = document.getElementsByClassName(label_class)[0].className.indexOf('enabled')
                                    console.log("Enabled: " + $scope.isEnabled1);
                                }
                                if (setCount > 1) {
                                    console.log("parseInt(qostatsobject.X_LANTIQ_COM_InputPackets) : " + parseInt(qostatsobject.X_LANTIQ_COM_InputPackets));
                                    console.log(" prevData : " + prevData[obj][prevData[obj].length - 1]);
                                    valc = (parseInt(qostatsobject.X_LANTIQ_COM_InputPackets) - prevData[obj][prevData[obj].length - 1]) / ($scope.pollinterval * (Math.pow(10, -3)));
                                    console.log("Valc is : " + valc);
                                    tmpData.push(valc);
                                    pdata = parseInt(qostatsobject.X_LANTIQ_COM_InputPackets);
                                    console.log("pdata : " + pdata);
                                    prevData[obj].push(pdata);
                                }
                                else {
                                    console.log("Entering to else condition");
                                    console.log("$scope.pollinterval : " + $scope.pollinterval);
                                    console.log("parseInt(qostatsobject.X_LANTIQ_COM_InputPackets) : " + parseInt(qostatsobject.X_LANTIQ_COM_InputPackets));
                                    valc = (parseInt(qostatsobject.X_LANTIQ_COM_InputPackets)) / ($scope.pollinterval * (Math.pow(10, -3)));
                                    prevData[obj].push(parseInt(qostatsobject.X_LANTIQ_COM_InputPackets));
                                    tmpData.push(valc);
                                }
                                if ($scope.isEnabled1 === -1)
                                    tmpData[$scope.queueindex2] = '';
                                qosstatsArray2 = tmpData;
                                if (charttype === "add") {
                                    $scope.queuenameArray2.push(queueobject.Queue);
                                }
                            }

                            if (charttype === "add") {
                                startingData2.datasets = [];
                                for (var i = 0; i < qosstatsArray2.length; ++i) {
                                    var tmp = {};
                                    tmp['label'] = $scope.queuenameArray2[i];
                                    tmp['fillColor'] = fillcolorsData2[i];
                                    tmp['strokeColor'] = strokecolorsData2[i];
                                    tmp['pointColor'] = highlightfillData2[i];
                                    tmp['data'] = [0];
									tmp['borderColor'] = strokecolorsData2[i];
                                    var backgroundColorOpaqueIndex = backgroundcolorsData2[i].lastIndexOf(',');
                                    var backgroundColor =  backgroundcolorsData2[i].substr(0, backgroundColorOpaqueIndex + 1) + "0.5"  + backgroundcolorsData2[i].substr(backgroundColorOpaqueIndex + 2);
                                    tmp['backgroundColor'] = backgroundColor;
                                    startingData2.datasets.push(tmp);
                                }
                                ;
                                // Reduce the animation steps for demo clarity.

                                myLineChart1 = new Chart(ctx,
                                    { type: 'line',
                                              data: startingData2,
                                              options: options
                                            }
                                );
//                                document.getElementById('js-legend').innerHTML = myLineChart1.generateLegend();
                                var legend = myLineChart1.generateLegend();
                                $('.js-legend').html(legend);
                                $compile($('.js-legend').html(legend))($scope);
                            }
                        }).
                        error(function (data, status, headers, config) {
                        });
            }
            setTimeout(function () {
                if ($scope.interfaceName !== "") {
                    $scope.urls = "cgi_get_filterbyfirstparamval?Object=Device.QoS.QueueStats&X_LANTIQ_COM_LowerLayers=" + $scope.interfaceName + "&QueueOccupancyPercentage=&Queue=&OutputPackets=&X_LANTIQ_COM_InputPackets=";
                    getQosStatsData2($scope.urls, "add");
                }
                else {
                    getQosStatsData2($scope.urls, "add");
                }
            }, 1000);
            function setInterval2() {
                if (changeUrl === "") {
                    getQosStatsData2($scope.urls);
                }
                else {
                    $scope.urls = changeUrl;
                    getQosStatsData2($scope.urls);
                }
                
                myLineChart1.data.labels.push(++latestLabel2);
                myLineChart1.data.datasets[0].data.push(qosstatsArray2[0]);
                myLineChart1.update();
                setCount++;
                // Remove the first point so we dont just add values forever
                if (latestLabel2 > 3){
                    myLineChart1.data.datasets[0].data.splice(0, 1);
                    myLineChart1.data.labels.splice(0, 1);
                }
                
                myLineChart1.update();
                
            }

            promise2 = $interval(setInterval2, $scope.pollinterval);
            // Cancel interval on page changes
            $scope.$on('$destroy', function () {
                if (angular.isDefined(promise2)) {
                    $interval.cancel(promise2);
                    promise2 = undefined;
                }
            });
            $scope.toggleLine = function (t, event) {
                console.log("target: " + event.currentTarget);
                console.log("Object:" + t);
                console.log("class:" + event.currentTarget.className);
                var classname = event.currentTarget.className.split(' ')[0].split('_')[1];
                $scope.queueindex2 = $scope.queueindexarray2.indexOf(classname);
                if ((event.currentTarget.className).indexOf('enabled') === -1)
                    event.currentTarget.className += ' enabled';
                else {
                    event.currentTarget.className = (event.currentTarget.className).replace('enabled', '');
                }
            };
            
        }
    };
});
