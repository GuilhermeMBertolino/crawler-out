"use strict";!function(){var nw=angular.module(regdep("nw-hostname"),[]);nw.directive("nwHostname",["funcs",function(funcs){return{restrict:"A",require:"ngModel",link:function($scope,$elem,$attrs,$model){function validator(value){return _.isUndefined(value)||_.isNull(value)||$attrs.disabled?($model.$setValidity("msg_invalid_name_length",!0),$model.$setValidity("invalid_forbiddenChar",!0)):($model.$setValidity("invalid_forbiddenChar",isHostname(value)),$model.$setValidity("msg_invalid_name_length",value.length<64)),value}function isHostname(hostname){var exclude,wrong;return hostname=hostname.replace(/(^\s+|\s+$)/g,""),hostname=punycode.toASCII(hostname),hostname&&!_.isUndefined($attrs.nwHostnameDeny)&&(exclude=$attrs.nwHostnameDeny.split(),wrong=_.find(exclude,function(elem){return-1!=hostname.indexOf(elem)}))?!1:!_.isUndefined($attrs.nwHostnameAllowIpAddress)&&funcs.is[$attrs.nwHostnameAllowIpAddress]?hostname?funcs.is[$attrs.nwHostnameAllowIpAddress](hostname)||!reDd.test(hostname)&&re.test(hostname):!0:hostname?!reDd.test(hostname)&&re.test(hostname):!0}var allowSymbol="";$attrs.nwHostnameAllow&&(allowSymbol=$attrs.nwHostnameAllow);var allSymbols="[a-zA-Z0-9-\\."+allowSymbol+"]",patt="^(?="+allSymbols+"+$)(?:[A-Za-z0-9\\-]|[A-Za-z0-9\\*[A-Za-z0-9"+allowSymbol+"]\\.)*(?:[A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-"+allowSymbol+"]*[A-Za-z0-9])$";_.isUndefined($attrs.nwHostnamePart)||(patt="^(?="+allSymbols+"+$)[\\.]{0,1}(?:([a-zA-Z0-9]\\.{0,1})|([a-zA-Z0-9][a-zA-Z0-9\\-"+allowSymbol+"]*[a-zA-Z0-9])\\.)*(?:[A-Za-z0-9]|([A-Za-z0-9][A-Za-z0-9\\-"+allowSymbol+"]*[A-Za-z0-9.]))$");var re=new RegExp(patt),reDd=new RegExp("^([0-9]+\\.)+[0-9]*$");$model.$parsers.unshift(validator),$model.$formatters.unshift(validator),$model.$formatters.unshift(function(value){return punycode.toUnicode(value)||""}),$model.$parsers.unshift(function(value){return punycode.toASCII(value)||""})}}}]),nw.directive("nwPunycode",function(){return{restrict:"A",scope:{text:"=nwPunycode"},link:function($scope,$elem){$scope.$watch("text",function(){$elem.text($scope.text?punycode.toUnicode($scope.text):"")})}}}),nw.filter("punycode",function(){return function(hostname){return punycode.toUnicode(hostname)}})}();