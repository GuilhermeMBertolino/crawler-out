(function(){$.su.module=$.su.module||{};$.su.module.commonApi=$.su.module.commonApi||{};var _fn=function(){return null};var returnGet=function(variable){return variable};$.su.module.createObject=function(type){var _private=function(){};_private.prototype=type=="empty"?$.su.module.commonApi.empty:$.su.module.commonApi;return new _private()};$.su.module.commonApi.empty={disable:_fn,enable:_fn,show:_fn,hide:_fn,setValue:_fn,setTipes:_fn,init:_fn,changeProxy:returnGet,extendField:returnGet,helpInit:_fn,addHelpContent:returnGet};$.su.module.commonApi.enable=function(params){var objType="";if(!$.isArray(params)){params=[params]}for(var i=0;i<params.length;i++){params[i]=params[i].jquery?params[i]:$(params[i]);objType=params[i].get(0).xtype;if(objType){params[i][objType]("enable")}else{return false}}};$.su.module.commonApi.disable=function(params){var objType="";if(!$.isArray(params)){params=[params]}for(var i=0;i<params.length;i++){params[i]=params[i].jquery?params[i]:$(params[i]);objType=params[i].get(0).xtype;if(objType){params[i][objType]("disable")}else{return false}}};$.su.module.commonApi.show=function(params){var objType="";if(!$.isArray(params)){params=[params]}for(var i=0;i<params.length;i++){params[i]=params[i].jquery?params[i]:$(params[i]);objType=params[i].get(0).xtype;if(objType){params[i][objType]("show")}else{params[i].show()}}};$.su.module.commonApi.hide=function(params){var objType="";if(!$.isArray(params)){params=[params]}for(var i=0;i<params.length;i++){params[i]=params[i].jquery?params[i]:$(params[i]);objType=params[i].get(0).xtype;if(objType){params[i][objType]("hide")}else{params[i].hide()}}};$.su.module.commonApi.setTips=function(selector,value){var objType="";selector=selector.jquery?selector:$(selector);objType=selector.get(0).xtype;if(objType){selector[objType]("setTips",value)}else{return false}};$.su.module.commonApi.setValue=function(selector,value){var objType="";selector=selector.jquery?selector:$(selector);objType=selector.get(0).xtype;if(objType){selector[objType]("setValue",value)}else{return false}};$.su.module.commonApi.val=function(selector,value){var objType="";selector=selector.jquery?selector:$(selector);selector.val(value)}})();