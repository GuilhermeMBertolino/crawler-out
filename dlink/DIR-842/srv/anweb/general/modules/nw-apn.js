"use strict";!function(){var nw=angular.module(regdep("nw-apn"),[]);nw.directive("nwApn",function(){return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$model){function validation(value){return value&&(value=value.replace(/(^\s+|\s+$)/g,"")),value?/^([a-zA-Z0-9]([a-zA-Z0-9\-\.\_]{0,63})?)$/.test(value):!0}function change(value){var result;return!_.isUndefined(value)&&value.toString().length&&value.toString().length>64&&!$attrs.disabled?$model.$setValidity("msg_input_lenght_more_max",!1):_.isUndefined(value)||!value.toString().length||$attrs.disabled?($model.$setValidity("invalid_value",!0),$model.$setValidity("msg_input_lenght_more_max",!0)):(result=validation(value),$model.$setValidity("invalid_value",result),$model.$setValidity("msg_input_lenght_more_max",!0)),value}$model.$parsers.unshift(change),$model.$formatters.unshift(change)}}})}();