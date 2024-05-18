var app_directives = angular.module('app.directives', []);
app_directives.directive('dropdownMultiselect', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            open: '='
        },
        template:
                "<div class='btn-group' data-ng-class='{open: open}'>" +
                "<button class='btn btn-default' >{{selectedValues}}</button>" +
                "<button class='btn btn-default dropdown-toggle' data-ng-click = 'openDropdown()'><span class = 'caret'></span></button>" +
                "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
                "<li><a data-ng-click='selectionControl()'><span ng-class='{\"fa fa-square-o\": !allSelect , \"fa fa-check-square-o\": allSelect}' aria-hidden = 'true'></span> Select All</a></li>" +
//                "<li><a data-ng-click='deselectAll();'><span class = 'fa fa-square-o 'aria-hidden = 'true'></span> Unselect All</a></li>" +
                "<li class='divider'></li>" +
                "<li data-ng-repeat='option in options'><a data-ng-click = 'toggleSelectItem(option)'><span data-ng-class = 'getClassName(option)'aria-hidden = 'true' ></span> {{option.name}}</a ></li>" +
                "</ul>" +
                "</div>",
        controller: function ($scope, $attrs) {
//            $scope.model = $scope[$attrs.parameter];
            $scope.model = $scope.selectedUserIds;
            $scope.allSelect = false;
            $scope.childScope = $scope.open;
            $scope.selectedValues = "Select";
            $scope.openDropdown = function () {
                $scope.open = !$scope.open;
            };
            $scope.selectionControl = function () {
                $scope.allSelect = !$scope.allSelect;
                if ($scope.allSelect) {
                    $scope.selectAll();
                } else {
                    $scope.deselectAll();
                }
            }
            $scope.selectAll = function () {
                $scope.model = [];
                angular.forEach($scope.options, function (item, index) {
                    $scope.model.push(item.id);
                });
                prepareSeletedItems();
            };
            $scope.deselectAll = function () {
                $scope.model = [];
                $scope.selectedValues = "Select";
            };
            $scope.toggleSelectItem = function (option) {
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item === option.id) {
                        intIndex = index;
                    }
                });
                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                }
                else {
                    $scope.model.push(option.id);
                }
                prepareSeletedItems();
            };
            $scope.getClassName = function (option) {
                var varClassName = 'fa fa-square-o';
                angular.forEach($scope.model, function (item, index) {
                    if (item === option.id) {
                        varClassName = 'fa fa-check-square-o';
                    }
                });
                return (varClassName);
            };
            prepareSeletedItems = function () {
                if (($scope.model.length < 3) && ($scope.model.length !== 0)) {
                    var temp = [];
                    angular.forEach($scope.model, function (mItem, index) {
                        angular.forEach($scope.$parent.users, function (uItem, index) {
//                            console.log(uItem.id, mItem);
                            if (uItem.id === mItem) {
                                temp.push(uItem.name);
                            }
                        });
                    });
                    $scope.selectedValues = temp.join(", ");
                }
                else if ($scope.model.length === 0) {
                    $scope.selectedValues = "Select";
                }
                else if ($scope.model.length === 4) {
                    $scope.selectedValues = "All Selected" + " (" + $scope.model.length + ")";
                }
                else {
                    $scope.selectedValues = $scope.model.length + " Selected";
                }
            };
        }
    };
});