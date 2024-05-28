(function (angular) {

    'use strict';

    var app = angular.module('angular-progress-arc', []);

    app.provider('progressArcDefaults', function () {

        var defaults = {
            size: 200,
            strokeWidth: 20,
            stroke: 'black',
            background: null
        };

        this.setDefault = function (name, value) {
            defaults[name] = value;
            return this;
        };

        this.$get = function () {
            return function (attr) {
                angular.forEach(defaults, function (value, key) {
                    if (!attr[key]) {
                        attr[key] = value;
                    }
                });
            };
        };
    });

    app.directive('progressArc', ['progressArcDefaults', function (progressArcDefaults) {
        return {
            restrict: 'E',
            scope: {
                size:             '@', // Size of element in pixels.
                strokeWidth:      '@', // Width of progress arc stroke.
                stroke:           '@', // Color/appearance of stroke.
                counterClockwise: '@', // Boolean value indicating
                complete:         '&', // Expression evaluating to float [0.0, 1.0]
                background:       '@',  // Color of the background ring. Defaults to null.
                coretext:         '@'
             

            },
            compile: function (element, attr) {

                progressArcDefaults(attr);

                return function (scope, element, attr) {
                    // Firefox has a bug where it doesn't handle rotations and stroke dashes correctly.
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=949661
                    scope.offset = /firefox/i.test(navigator.userAgent) ? -89.9 : -90;
                    var updateRadius = function () {
                        scope.strokeWidthCapped = Math.min(scope.strokeWidth, scope.size / 2 - 1);
                        scope.radius = Math.max((scope.size - scope.strokeWidthCapped) / 2 - 1, 0);
                        scope.circumference = 2 * Math.PI * scope.radius;
                        scope.secondcircumference = 2 * Math.PI * scope.radius;
                        scope.thirdcircumference = 2 * Math.PI * scope.radius;
                        scope.backgrounddashoffset = "167";
                        scope.secondbackgrounddashoffset ="285";
                        scope.thirdbackgrounddashoffset ="355";
                        scope.secondStroke = "#00B0FF";
                        scope.secondBackground = "#E0F7FA";
                        scope.thirdStroke = "#1DE9B6";
                        scope.thirdBackground = "#E0F2F1";
                        scope.centerRadius = 45;
                        scope.coretext = scope.coretext;
                    };
                    scope.$watchCollection('[size, strokeWidth]', updateRadius);
                    updateRadius();
                };
            },
            
            template:
                '<svg ng-attr-width="{{size}}" ng-attr-height="{{size}}">' +
                    '<circle class="ngpa-background" fill="none" ' +
                        'ng-if="background" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'ng-attr-r="{{radius}}" ' +
                        'ng-attr-stroke="{{background}}" ' +
                        'ng-attr-stroke-width="{{strokeWidthCapped}}"' +
                        'ng-attr-stroke-dasharray="{{circumference}}"' +
                        'ng-attr-stroke-dashoffset="{{backgrounddashoffset}}"' +
                        'circumference="{{circumference}}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>' +
                    '<circle class="ngpa-progress" fill="none" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'ng-attr-r="{{radius}}" ' +
                        'ng-attr-stroke="{{stroke}}" ' +
                        'ng-attr-stroke-width="{{strokeWidthCapped}}"' +
                        'ng-attr-stroke-dasharray="{{circumference}}"' +
                        'ng-attr-stroke-dashoffset="{{(1 - complete()) * circumference}}"' +
                        'circumference="{{circumference}}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>' +
                      '<circle class="ngpa-background" fill="none" ' +
                        'ng-if="background" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'ng-attr-r="{{radius-strokeWidthCapped+10}}" ' +
                        'ng-attr-stroke="{{secondBackground}}" ' +
                        'circumference="{{secondcircumference}}"' +
                        'ng-attr-stroke-width="{{strokeWidthCapped-10}}"' +
                        'ng-attr-stroke-dasharray="{{secondcircumference}}"' +
                        'ng-attr-stroke-dashoffset="{{secondbackgrounddashoffset}}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>' +
                    '<circle class="ngpa-progress" fill="none" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'ng-attr-r="{{radius-strokeWidthCapped+10}}" ' +
                        'ng-attr-stroke="{{secondStroke}}" ' +
                        'circumference="{{secondcircumference}}"' +
                        'ng-attr-stroke-width="{{strokeWidthCapped -10}}"' +
                        'ng-attr-stroke-dasharray="{{secondcircumference}}"' +
                        'ng-attr-stroke-dashoffset="{{(1 - complete()) * circumference< 285?285:(1 - complete()) * circumference }}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>' +
                    '<circle class="ngpa-background" fill="none" ' +
                        'ng-if="background" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'circumference="{{thirdcircumference}}"' +
                        'ng-attr-r="{{radius-strokeWidthCapped-strokeWidthCapped+30}}" ' +
                        'ng-attr-stroke="{{thirdBackground}}" ' +
                        'ng-attr-stroke-width="{{strokeWidthCapped -20}}"' +
                        'ng-attr-stroke-dasharray="{{thirdcircumference}}"' +
                        'ng-attr-stroke-dashoffset="{{thirdbackgrounddashoffset}}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>' +
                    '<circle class="ngpa-progress" fill="none" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'circumference="{{thirdcircumference}}"' +
                        'ng-attr-r="{{radius-strokeWidthCapped-strokeWidthCapped+30}}" ' +
                        'ng-attr-stroke="{{thirdStroke}}" ' +
                        'ng-attr-stroke-width="{{strokeWidthCapped - 20}}"' +
                        'ng-attr-stroke-dasharray="{{thirdcircumference}}"' +
                        'ng-attr-stroke-dashoffset="{{(1 - complete()) * circumference < 355?355:(1 - complete()) * circumference}}"' +
                        'ng-attr-transform="rotate({{offset}}, {{size/2}}, {{size/2}})' +
                            '{{ (counterClockwise && counterClockwise != \'false\') ? \' translate(0, \' + size + \') scale(1, -1)\' : \'\' }}"' +
                        '/>'+ 
            '<circle class="ngpa-progress" fill="#14b78e" ' +
                        'ng-attr-cx="{{size/2}}" ' +
                        'ng-attr-cy="{{size/2}}" ' +
                        'circumference="{{thirdcircumference}}"' +
                        'ng-attr-r="{{centerRadius}}" ' + 
                        '/>'+ 
            '<text x="50%" y="50%" text-anchor="middle" stroke="white" stroke-width="2px" dy=".2em">{{coretext}}'+ '</text>'+
                '</svg>'
        };
    }]);

})(window.angular);
