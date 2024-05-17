"use strict";!function(){var nw=angular.module(regdep("nw-name"),[]);nw.directive("nwName",function(){return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$model){function validator(value){function getLenInBytes(str){return new Blob([str]).size}var isValid,maxLength,exclude,alphanum,symbols,isValidLength,regex,wrong,alphaSymbols,patt;if($attrs.ngMaxlength||$attrs.disabled||_.isUndefined(value)||!value.toString().length)$model.$setValidity("msg_invalid_name",!0),$model.$setValidity("msg_invalid_name_length",!0);else{if(isValid=!($attrs.hasOwnProperty("nwNameNoSpace")&&/\s/.test(value)),maxLength=$attrs.nwName||64,exclude=$attrs.nwNameExclude||"",alphanum=$attrs.nwNameAlphanum||"",symbols=_.isEmpty(exclude)?null:exclude.split(""),isValidLength=getLenInBytes(value)<=maxLength,$attrs.hasOwnProperty("nwNameAscii")&&isValid&&(regex=new RegExp("^[\x00-]+$"),isValid=regex.test(value)),!_.isNull(symbols)&&isValid&&(wrong=_.find(symbols,function(elem){return value.includes(elem)}),wrong&&(isValid=!1)),!_.isEmpty(alphanum)&&isValid){alphaSymbols="",_.each(alphanum,function(sym){return alphaSymbols+="\\"+sym}),patt="^[a-zA-Z0-9"+alphaSymbols+"]+$";var regex=new RegExp(patt);isValid=regex.test(value)}$model.$setValidity("msg_invalid_name",isValid),$model.$setValidity("msg_invalid_name_length",isValidLength)}return value}$model.$parsers.unshift(validator),$model.$formatters.unshift(validator)}}})}();