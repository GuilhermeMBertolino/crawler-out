"use strict";!function(){angular.module("app").controllerProvider.register("UrlFilterListCtrl",["$scope","$state","translate","urlfilterUtil","funcs","pageDetails",function($scope,$state,translate,util,funcs){function defaultRule(){var rule={};return rule.url="",rule}function updateRule(action,rule,inx){switch(rule&&(rule=angular.fromJson(angular.toJson(rule))),action){case"add":helper.addRule(rule);break;case"set":helper.setRule(rule,inx);break;case"remove":urlfilter.isRLX819XFilter?helper.removeRuleDNS(inx):helper.removeRule(inx)}urlfilter.list=helper.getList()}function wasModified(){return urlfilter.isRLX819XFilter?!1:helper?helper.wasModified(urlfilter.config):!1}$scope.urlfilter={isActivate:!1,isFirewallMode:"Firewall"===util.deviceMode,maxItemsCount:4,config:null,list:null,apply:function(){function success(){$state.reload(),$scope.overlay.circular.stop(overlayId)}function error(response){$scope.overlay.circular.stop(overlayId),overlayId=null,$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})}if($scope.form.$valid&&wasModified()){if("Black"==urlfilter.config.clients_mode&&0==urlfilter.clientsList.length)return void alert(translate("wan_clients_list_empty"));overlayId=$scope.overlay.circular.start();var settings=util.needPrepareSettings()?helper.prepareSettings(funcs.deepClone(urlfilter)):funcs.deepClone(urlfilter);util.push(settings).then(success)["catch"](error)}},addRule:function(){var rule=defaultRule();$scope.urlfilter.focus=!0,updateRule("add",rule)},setRule:function(rule,inx){updateRule("set",rule,inx)},removeRule:function(inx){updateRule("remove",null,inx)},getTypesList:function(){var result=[];return result.push({name:"urlflt_type_exlude",value:"Exclude"}),result.push({name:"urlflt_type_include",value:"Include"}),result},validationUrl:function(url,index){function containsProtocol(url){return/^(ht|f)tp(s?)\:/.test(url)}function isUniq(url,without){return _.every(urlfilter.list,function(elem,index){return elem.__removed?!0:without==index?!0:elem.url!=url})}return url?containsProtocol(url)?"urlflt_error_rule_url_contains_protocol":isUniq(url,index)?null:"urlflt_error_rule_is_not_uniq":null},supportedParam:function(param){return _.has(urlfilter.config,param)},wasModified:wasModified,addressesList:[],clientsList:[],filterTypes:[],wanGroups:[],addFilter:function(){$state.go("^.add")},editFilter:function(item){$state.go("^.edit",{inx:item.__id})},removeFilter:function(items){function success(){$scope.overlay.circular.stop(overlayId),$state.reload()}function error(){$scope.overlay.circular.stop(overlayId),overlayId=null,$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})}var config,indexes=[];_.forEach(items,function(i){return indexes.push(i.__id)}),config=_.omit(urlfilter.config,indexes),overlayId=$scope.overlay.circular.start(),util.push({config:config}).then(success)["catch"](error)},isEmptyRules:function(){return _.isEmpty(urlfilter.config)},isFull:function(list){return list.length>urlfilter.maxItemsCount},getClientsList:function(item){var clients=[];return _.forEach(item.clients_list,function(l){return clients.push(l.mac)}),clients.length>0?clients:"-"},getTplName:function(tpl){switch(tpl){case"full":return translate("urlflt_dns_tpl_full");case"begin":return translate("urlflt_dns_tpl_begin");case"end":return translate("urlflt_dns_tpl_end");case"middle":return translate("urlflt_dns_tpl_middle")}},getScheduleIndexesLink:function(item){var links=["__id"];return links},getStateInfo:function(item){return item.enable?"on":"off"},getMiniInfo:function(item){var info=[],clientsList=urlfilter.getClientsList(item),list=_.isUndefined(item.list[0])?void 0:item.list[0].url+" (".concat(urlfilter.getTplName(item.list[0].match_mode),")..."),clients="-"!=clientsList?clientsList[0]+"...":void 0;return list&&(info.push(translate("Include"==item.type?"urlflt_dns_addresses_allow":"urlflt_dns_addresses_block")+":"),info.push(list)),clients&&(info.push(translate("Black"==item.clients_mode?"urlflt_dns_clients_allow":"urlflt_dns_clients_block")+":"),info.push(clients)),info},isRLX819XFilter:autoconf.BR2_PACKAGE_ANWEB_RLX_819X_DNS_FILTER||autoconf.BR2_PACKAGE_ANWEB_DNS_FILTER};var helper,urlfilter=$scope.urlfilter,overlayId=null;$scope.tableTitle="urlflt_nav",$scope.emptyRulesDesc="urlflt_rules_empty",function(){function success(){helper=util.makeHelper(),urlfilter.config=helper.getConfig(),urlfilter.list=helper.getList(),urlfilter.clientsList=helper.getClientsList(),urlfilter.filterTypes=helper.getFilterTypes(),urlfilter.wanGroups=helper.getGroupsList(),urlfilter.focus=!1,urlfilter.isActivate=!0,$scope.$emit("pageload"),overlayId&&($scope.overlay.circular.stop(overlayId),overlayId=null)}function error(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}util.pull().then(success)["catch"](error)}()}])}();