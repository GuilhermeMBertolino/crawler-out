"use strict";!function(){angular.module("app").controllerProvider.register("IPsecRuleCtrl",["$scope","$state","funcs","translate","history","IPsecUtil","ngDialog","navShared",function($scope,$state,funcs,translate,history,util,ngDialog,navShared){function renewIfaceList(){ipsec.advancedIfaceList=getList("advanced_iface_list")}function getList(param){switch(param){case"advanced_iface_list":return helper.getList(param,ipsec.rule,$scope.ipVersion.value);case"left_iface":return[{name:translate("st_not_selected"),value:""}].concat(helper.getList(param,ipsec.rule,$scope.ipVersion.value));case"left_group":return[{name:translate("st_not_selected"),value:""}].concat(helper.getList(param,ipsec.rule));case"left_type":return"Firewall"!=ipsec.rule.devMode?[{name:translate("interface"),value:"iface"},{name:translate("default_gateway"),value:"group"}]:[{name:translate("interface"),value:"iface"},{name:translate("wan_group"),value:"group"}];case"tcpmss":return[{name:translate("ipsec_manual"),value:1}].concat(helper.getList(param,ipsec.rule));case"iface":return[{name:translate("wan_auto"),value:"auto"}].concat(helper.getList(param,ipsec.rule));case"DPD":return[{name:"ipsec_dpd_action_restart",value:"restart"},{name:"ipsec_dpd_action_hold",value:"hold"},{name:"ipsec_dpd_action_clear",value:"clear"},{name:"off",value:"none"}];default:return helper.getList(param,ipsec.rule);case"proto":return[{name:translate("st_not_selected"),value:0},{name:"TCP",value:6},{name:"UDP",value:17},{name:"GRE",value:47},{name:"IPIP",value:4}]}}function getFilterList(param,rule){return util.wasActivate()?helper.getFilterList(param,rule):[]}function removeNets(items,indexes){_.each(items,function(item){item.index&&ipsec.rule.delete_nets.push(item.index)});var indexes=indexes.sort().reverse();_.each(indexes,function(ind){ipsec.rule.nets.splice(ind,1)})}function showNetsDialog(options){function startDialog(options){return ngDialog.open({template:"dialogs/ipsec_nets_form/dialog.tpl.html",controller:"IPsecNetsFormDialogCtrl",resolve:funcs.getLazyResolve("dialogs/ipsec_nets_form/ctrl.lazy.js","IPsecNetsFormDialogCtrl"),scope:$scope,data:options})}function closeDialog(result){if(result&&result.value){var value=result.value;_.has(value,"write")&&(_.isUndefined(inx)?ipsec.rule.nets.push(value.write):ipsec.rule.nets[inx]=value.write),_.has(value,"remove")&&removeNets(value.remove.items,value.remove.index)}}var inx=options.inx;options.list=angular.copy(ipsec.rule.nets),options.data.ipVersion=$scope.ipVersion.value,options.data.ikeVersion=ipsec.rule.version,_.has(options,"inx")&&options.list.splice(inx,1),startDialog(options).closePromise.then(closeDialog)}function isDupAnonymous(){if(ipsec.rule.anonymous){var tunnels=helper.getTunnels();return _.some(tunnels,function(tunnel){return tunnel.anonymous&&__index!=tunnel.__index})}}function isIpVersionChanged(){var changed=!1;return 1==ipsec.rule.version&&!_.isEmpty(ipsec.rule.nets)&&(ipsec.rule.nets[0].ipVersion&&$scope.ipVersion.value!=ipsec.rule.nets[0].ipVersion||"ipv4"==$scope.ipVersion.value&&ipsec.rule.nets[0].source&&!funcs.is.ipv4(ipsec.rule.nets[0].source.split("/")[0])||"ipv6"==$scope.ipVersion.value&&ipsec.rule.nets[0].source&&!funcs.is.ipv6(ipsec.rule.nets[0].source.split("/")[0]))&&(changed=!0),2==ipsec.rule.version&&!_.isEmpty(ipsec.rule.nets)&&(ipsec.rule.nets[0].ipVersion&&$scope.ipVersion.value!=ipsec.rule.nets[0].ipVersion||"ipv4"==$scope.ipVersion.value&&ipsec.rule.nets[0].source&&!funcs.is.ipv4(ipsec.rule.nets[0].source[0].source.split("/")[0])||"ipv6"==$scope.ipVersion.value&&ipsec.rule.nets[0].source&&!funcs.is.ipv6(ipsec.rule.nets[0].source[0].source.split("/")[0]))&&(changed=!0),changed}function errorPull(){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}function changeAlg(phase){var modeParam="IKE"==phase?"ike_crypto_mode":"esp_crypto_mode",modes=helper.getList(modeParam,ipsec.rule),modeValue="IKE"==phase?"modeIKE":"modeESP";_.find(modes,{value:ipsec.rule[modeValue]})||(ipsec.rule[modeValue]=modes[0].value);var sizeKeyParam="IKE"==phase?"ike_crypto_skey":"esp_crypto_skey",keys=helper.getList(sizeKeyParam,ipsec.rule),sizeKeyValue="IKE"==phase?"sizeKeyIKE":"sizeKeyESP";_.contains(keys,ipsec.rule[sizeKeyValue])||(ipsec.rule[sizeKeyValue]=keys[0])}function changeHash(phase){var modeParam="IKE"==phase?"ike_hash_mode":"esp_hash_mode",modes=helper.getList(modeParam,ipsec.rule),modeValue="IKE"==phase?"ikeHashMode":"espHashMode";_.find(modes,{value:ipsec.rule[modeValue]})||(ipsec.rule[modeValue]=modes[0].value);var sizeKeyParam="IKE"==phase?"ike_hash_skey":"esp_hash_skey",keys=helper.getList(sizeKeyParam,ipsec.rule),sizeKeyValue="IKE"==phase?"ikeHashSKey":"espHashSKey";_.contains(keys,ipsec.rule[sizeKeyValue])||(ipsec.rule[sizeKeyValue]=keys[0])}function getFirewallAutoConfigDialog(){var type=translate("shorewall_autoconfig_vpn_connection",{trustAsHtml:!0});return util.getFirewallAutoConfigNote(type,$scope)}var ipsec=$scope.ipsec={isActivate:!1,advancedIfaceList:{},apply:function(){function push(){overlayId=overlay.start(),applyObj?util.apply(applyObj).then(success)["catch"](error)["finally"](overlay.stop.bind(overlay,overlayId)):success()}function applyPrepareRule(){2==ipsec.rule.version&&_.has(ipsec.rule,"aggressive")&&null!=ipsec.rule.aggressive&&(ipsec.rule.aggressive=!1),"tunnel"==ipsec.rule.type?(ipsec.rule.left_proto=0,ipsec.rule.right_proto=0):navShared.isFirewallMode?([6,17].includes(ipsec.rule.left_proto)||(ipsec.rule.left_port=0),[6,17].includes(ipsec.rule.right_proto)||(ipsec.rule.right_port=0)):(ipsec.rule.left_port=0,ipsec.rule.right_port=0)}function success(){overlay.stop(overlay,overlayId),$state.go(currentState+".info")}function error(){overlay.stop(overlay,overlayId),$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})}if(!$scope.form.$invalid){if("transport"!=ipsec.rule.type&&!ipsec.rule.nets.length)return void alert(translate("ipsec_warning_nets_empty"));if(isDupAnonymous())return void alert(translate("ipsec_anonymous_exist"));if(isIpVersionChanged())return void alert(translate("ipsec_warning_nets_ip_version"));ipsec.isFormSubmitted=!0;var overlay=$scope.overlay.circular,overlayId=null;applyPrepareRule();var applyObj=helper.applyRule(ipsec.rule,__index);"Firewall"==ipsec.rule.devMode&&"add"==ipsec.action?getFirewallAutoConfigDialog().then(function(res){return applyObj.firewallAutoConfig=res.value}).then(push):push()}},remove:function(){var removeConnections=helper.removeRules([__index]),overlay=$scope.overlay.circular,overlayId=overlay.start();util.apply(removeConnections).then(function(){history.setCleanLastHistory(!0),$state.go(currentState+".info")},function(error){$state.go("error",{code:"msg_remove_error",message:"msg_rpc_remove_error"})})["finally"](overlay.stop.bind(overlay,overlayId))},wasModified:function(){function checkModifiedNets(nets1,nets2){return nets1=angular.copy(nets1),nets2=angular.copy(nets2),nets1.length!=nets2.length?!0:_.some(nets1,function(v,k){return!_.isEqual(v,nets2[k])})}return ipsec.isFormSubmitted?!1:ipsec.rule&&__backupRule&&_.keys(ipsec.rule).length!=_.keys(__backupRule).length||_.some(ipsec.rule,function(value,key){return"nets"==key?checkModifiedNets(value,__backupRule.nets):!_.isEqual(value,__backupRule[key])})},getList:getList,getFilterList:getFilterList,nets:{add:function(){var data={source:"",dest:""};1==ipsec.rule.tcpmss&&(data.mtu=1300),showNetsDialog({data:data})},remove:removeNets,edit:function(item,index){var data={source:item.source,dest:item.dest,index:item.index};1==ipsec.rule.tcpmss&&(data.mtu=item.mtu),showNetsDialog({inx:index,data:data})},constraint:function(){return ipsec.rule.nets.length>0?!0:ipsec.rule.nets.length>0&&2==ipsec.rule.version?!0:void 0}},changeEnableDPD:function(){},checkLength:function(ruleName,length){return ruleName&&ruleName.length>length?translate("msg_maxlength_symb")+" "+length:null},checkFQDNIdent:function(value){return value?(value.length>128&&translate("msg_maxlength_symb")+" 128",funcs.is.ipv4(value)||funcs.is.ipv6(value)?translate("invalid_value"):null):null},checkUnique:function(ruleName,type){return util.checkUnique(ruleName,ipsec.rule.__index,type)?null:"msg_error_value_is_not_uniq"},support:function(param){switch(param){case"left_proto":case"right_proto":return"transport"==ipsec.rule.type&&navShared.isFirewallMode;case"left_port":case"right_port":var proto="left_port"==param?ipsec.rule.left_proto:ipsec.rule.right_proto;return"tunnel"==ipsec.rule.type||"transport"==ipsec.rule.type&&[6,17].includes(proto)}return _.has(ipsec.rule,param)},getName:function(param){switch(param){case"Disabled":return"st_disabled";case"Enabled":return"st_enabled";case"Force":return"force"}},showMode:function(alg){return"null"!=alg&&"chacha20poly1305"!=alg},showSizeKey:function(alg){return"3des"!=alg&&"des"!=alg&&"null"!=alg},changeAlg:changeAlg,changeHash:changeHash,changeVersion:function(){var algIKE=helper.getList("alg",ipsec.rule);_.find(algIKE,{value:ipsec.rule.alg})||(ipsec.rule.alg=algIKE[0].value);var algESP=helper.getList("alg_ph2",ipsec.rule);_.find(algESP,{value:ipsec.rule.alg_ph2})||(ipsec.rule.alg_ph2=algESP[0].value);var hashIKE=helper.getList("hash",ipsec.rule);_.find(hashIKE,{value:ipsec.rule.hash})||(ipsec.rule.hash=hashIKE[0].value);var hashESP=helper.getList("auth_alg",ipsec.rule);_.find(hashESP,{value:ipsec.rule.auth_alg})||(ipsec.rule.auth_alg=hashESP[0].value),changeAlg("IKE"),changeAlg("ESP"),changeHash("IKE"),changeHash("ESP")},validation:function(value,length){return value&&value.length>length?translate("msg_maxlength_symb")+" "+length:null},isDelBtnNeeded:function(){return"edit"==ipsec.action&&!navShared.isFirewallMode},getFirewallAutoConfigDialog:getFirewallAutoConfigDialog},__index=_.isUndefined($state.params.inx)?void 0:parseInt($state.params.inx),__backupRule=null,currentState=$state.current.name.split(".");currentState.pop(),currentState=currentState.join(".");var helper;!function(){function __activate(){helper=util.makeHelper(),_.isUndefined(__index)?(ipsec.rule=helper.getDefaultTemplate(!0),ipsec.action="add"):(ipsec.rule=helper.getRule(__index),ipsec.action="edit"),ipsec.rule.leftType||(ipsec.rule.leftType=ipsec.getList("left_type")[0].value,ipsec.rule.leftIface=""),__backupRule=angular.copy(ipsec.rule);var ipv6=_.isUndefined(ipsec.rule.ipv6)?!1:ipsec.rule.ipv6;$scope.ipVersion={list:["ipv4","ipv6"],value:ipv6?"ipv6":"ipv4"},renewIfaceList(),ipsec.isActivate=!0,$scope.$emit("pageload")}return util.wasActivate()?void __activate():void util.pull().then(__activate)["catch"](errorPull)}(),$scope.$watch("ipVersion.value",function(value,oldValue){value!=oldValue&&"undefined"!=typeof oldValue&&(ipsec.rule.nat_t="ipv6"==value?!1:!0,ipsec.rule.ipv6="ipv6"==value?!0:!1,ipsec.rule.leftIface="",renewIfaceList())},!0)}])}();