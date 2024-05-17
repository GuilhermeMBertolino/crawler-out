"use strict";!function(){var nw=angular.module(regdep("nw-network"),[]);nw.directive("nwAutocompleteNetworkSubnetMask",["$compile","$timeout","funcs",function($compile,$timeout,funcs){function getRanges(){var ranges=ipv4.mask.range("0.0.0.0","255.255.255.255");return _.map(ranges,function(value){return{title:value,value:value}})}var ipv4=funcs.ipv4,attr={ipAddress:"nwAutocompleteNetworkIpAddressValue",minHosts:"nwAutocompleteNetworkSubnetMaskMinHosts",maxHosts:"nwAutocompleteNetworkSubnetMaskMaxHosts",useEndAddress:"nwAutocompleteUseEndAddress"};return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$ctrl){function correctRange(minHosts,maxHosts){$scope.subnetMask.ranges=getRanges(),_.isNumber(minHosts)&&correctMinRange(minHosts),_.isNumber(maxHosts)&&correctMaxRange(maxHosts)}function correctMinRange(hosts){var ranges=$scope.subnetMask.ranges,index=function(ranges,hosts){var inx,current;for(inx=ranges.length-1;inx>=0;inx--)if(current=ipv4.mask.hosts(ranges[inx].value),current>=hosts)return inx;return null}(ranges,hosts);_.isNull(index)||$scope.subnetMask.ranges.splice(index+1,ranges.length-1)}function correctMaxRange(hosts){var ranges=$scope.subnetMask.ranges,index=function(ranges,hosts){var inx,current;for(inx=0;inx<ranges.length;inx++)if(current=ipv4.mask.hosts(ranges[inx].value),hosts>=current)return inx;return null}(ranges,hosts);_.isNull(index)||$scope.subnetMask.ranges.splice(0,index)}function getDefaultValue(){var ip=$scope.subnetMask.ipAddress;return _.has($attrs,attr.useEndAddress)&&function(ip){return funcs.is.ipv4(ip)&&"0"!=ip.split(".")[3]}(ip)?"255.255.255.255":function(ip){var ipClass=funcs.ipv4.subnet.getNetworkClass(ip);switch(ipClass){case"A":return"255.0.0.0";case"B":return"255.255.0.0";case"C":return"255.255.255.0";case null:return"";default:return"255.255.255.0"}}(ip)}(function(){return _.has($attrs,"nwAutocomplete")&&_.has($attrs,"nwAutocompleteOptions")})()||function(){$element.attr("nw-autocomplete",""),$element.attr("nw-autocomplete-options","subnetMask.ranges"),$compile($element)($scope)}(),$scope.subnetMask={ipAddress:null,ranges:getRanges(),minHosts:2,maxHosts:16777214},correctMinRange($scope.subnetMask.minHosts),correctMaxRange($scope.subnetMask.maxHosts),$attrs.$observe(attr.minHosts,function(hosts){_.isUndefined(hosts)||(hosts=parseInt(hosts),$scope.subnetMask.minHosts=hosts,correctRange(hosts,$scope.subnetMask.maxHosts))}),$attrs.$observe(attr.maxHosts,function(hosts){_.isUndefined(hosts)||(hosts=parseInt(hosts),$scope.subnetMask.maxHosts=hosts,correctRange($scope.subnetMask.minHosts,hosts))}),$attrs.$observe(attr.ipAddress,function(ip){$scope.subnetMask.ipAddress=ip?ip:null}),$element.bind("focus",function(){var value;if(!$ctrl.$modelValue){if(value=getDefaultValue($scope.subnetMask.ipAddress),!value)return;$scope.$broadcast("autocomplete.stop"),$ctrl.$setViewValue(value),$ctrl.$render(),$scope.$apply(),$timeout(function(){$scope.$broadcast("autocomplete.start")},100)}})}}}]),nw.directive("nwAutocompleteNetworkGwip",["funcs",function(funcs){funcs.ipv4;var attr={ipAddress:"nwAutocompleteNetworkIpAddressValue",subnetMask:"nwAutocompleteNetworkSubnetMaskValue"};return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$ctrl){function getDefaultValue(){var range,ip=$scope.gwip.ipAddress,mask=$scope.gwip.subnetMask;return ip&&funcs.is.ipv4(ip)&&mask&&funcs.is.mask(mask)?(range=funcs.ipv4.subnet.getNetworkRange(ip,mask),ip!=range.start?range.start:range.end):null}$scope.gwip={ipAddress:null,subnetMask:null},$attrs.$observe(attr.ipAddress,function(ip){$scope.gwip.ipAddress=ip?ip:null}),$attrs.$observe(attr.subnetMask,function(mask){$scope.gwip.subnetMask=mask?mask:null}),$element.bind("focus",function(){var value;if(!$ctrl.$modelValue){if(value=getDefaultValue(),!value)return;$ctrl.$setViewValue(value),$ctrl.$render(),$scope.$apply()}})}}}]),nw.directive("nwNetworkValidation",["nwNetworkCheckValidation",function(validation){return{restrict:"A",require:"ngModel",scope:{param:"@nwNetworkValidation",address:"=nwNetworkAddress",subnetMask:"=nwNetworkSubnetMask",gwip:"=nwNetworkGatewayIpAddress",dnsServer1:"=nwNetworkDnsServerOne",dnsServer2:"=nwNetworkDnsServerTwo"},link:function($scope,$element,$attrs,$ctrl){function change(value){return checkValidation(value),value}function checkValidation(value){var param=paramsMap[$scope.param],data={};switch(data[param]=value,param){case"Address":data.SubnetMask=$attrs.nwNetworkValidationSubnetMaskValue;break;case"SubnetMask":data.Address=$scope.address,data.SubnetMask=$scope.subnetMask;case"GatewayIPAddress":data.Address=$scope.address,data.SubnetMask=$scope.subnetMask;break;case"DNSServer1":data.DNSServer2=$scope.dnsServer2;break;case"DNSServer2":data.DNSServer1=$scope.dnsServer1}var only={};only[param]=!0;var error=validation(data,only)[param];(error||currentError)&&error!=currentError&&($ctrl.$setValidity(currentError,!0),currentError=error),error&&$ctrl.$setValidity(error,!1)}var paramsMap={address:"Address",subnetMask:"SubnetMask",gwip:"GatewayIPAddress",dnsServer1:"DNSServer1",dnsServer2:"DNSServer2"},currentError="";"subnetMask"==$scope.param&&$scope.$watch("address",function(){checkValidation($ctrl.$viewValue)}),"subnetMask"==$scope.param&&$scope.$watch("subnetMask",function(){checkValidation($ctrl.$viewValue)}),"gwip"==$scope.param&&$scope.$watch("address",function(){checkValidation($ctrl.$viewValue)}),"gwip"==$scope.param&&$scope.$watch("subnetMask",function(){checkValidation($ctrl.$viewValue)}),"dnsServer1"==$scope.param&&$scope.$watch("dnsServer2",function(){checkValidation($ctrl.$viewValue)}),"dnsServer2"==$scope.param&&$scope.$watch("dnsServer1",function(){checkValidation($ctrl.$viewValue)}),$ctrl.$parsers.unshift(change),$ctrl.$formatters.unshift(change)}}}]),nw.factory("nwNetworkCheckValidation",["funcs",function(funcs){var is=funcs.is,ipv4=funcs.ipv4;return funcs.subnet,function(obj,only){function isNeed(name){return!only||only[name]}function checkValidation(obj,param){function isInvalidAddress(addr){return addr&&!is.ipv4(addr)}function isInvalidSubnetMask(msk){return msk&&!is.mask(msk)}function isReserved(addr,msk){return addr&&msk&&funcs.ipv4.subnet.checkReserved(addr,msk)}function isInvalidGwip(gwip){return gwip&&!is.ipv4(gwip)}function isInvalidDns(dns){return dns&&!is.ipv4(dns)}function isNeedCustomCheck2KOM(){return autoconf.BR2_PACKAGE_ANWEB_CUSTOM_2KOM_21535}function checkGwipRangeValidation(obj){function getRanges(addr,mask){var ranges=[];return addr&&mask&&ranges.push(ipv4.subnet.getNetworkRange(addr,mask)),ranges}return!obj.GatewayIPAddress||isInvalidAddress(obj.Address)||isInvalidSubnetMask(obj.SubnetMask)?"":function(addr,gwip){return addr==gwip}(obj.Address,obj.GatewayIPAddress)?"msg_ip_address_is_used":function(obj){var ranges=getRanges(obj.Address,obj.SubnetMask);return ranges.length?!_.some(ranges,function(range){return ipv4.subnet.belongNetworkRange(range,obj.GatewayIPAddress)}):!1}(obj)?"msg_error_gateway_ip_address_out_of_range":""}function checkDNSValidation(){return function(obj){return obj.DNSServer1&&obj.DNSServer2&&obj.DNSServer1==obj.DNSServer2}(obj)?"msg_error_dns_servers_is_equal":"0.0.0.0"==obj[param]||"255.255.255.255"==obj[param]?"msg_not_allowed_addr":""}switch(param){case"Address":return isInvalidAddress(obj.Address)?"msg_invalid_ipv4":isReserved(obj.Address,obj.SubnetMask)?"lan_error_ip_is_reserved":isNeedCustomCheck2KOM()&&obj.Address&&!funcs.customValidation.validStaticIP_2KOM_21748(obj.Address,obj.SubnetMask)?"msg_not_allowed_addr":"";case"SubnetMask":return isInvalidSubnetMask(obj.SubnetMask)?"msg_invalid_mask":isNeedCustomCheck2KOM()&&obj.Address&&obj.SubnetMask&&funcs.customValidation.validStaticIP_2KOM_21748(obj.Address,obj.SubnetMask)&&!funcs.customValidation.validSubnetMask_2KOM_21748(obj.Address,obj.SubnetMask)?"msg_invalid_mask":"";case"GatewayIPAddress":return isInvalidGwip(obj.GatewayIPAddress)?"msg_invalid_ipv4":checkGwipRangeValidation(obj);case"DNSServer1":return isInvalidDns(obj[param])?"msg_invalid_ipv4":isNeedCustomCheck2KOM()&&!funcs.customValidation.validDNS_2KOM_21748(obj.DNSServer1)?"msg_not_allowed_addr":checkDNSValidation(obj);case"DNSServer2":if(isInvalidDns(obj[param]))return"msg_invalid_ipv4";if(isNeedCustomCheck2KOM()){if(!funcs.customValidation.validDNS_2KOM_21748(obj.DNSServer2))return"msg_not_allowed_addr";if(!funcs.customValidation.validAllDNS_2KOM_21748(obj.DNSServer1,obj.DNSServer2))return"msg_not_allowed_addr"}return checkDNSValidation(obj)}return errors}var errors={Address:"",SubnetMask:"",GatewayIPAddress:"",DNSServer1:"",DNSServer2:""};return isNeed("Address")&&(errors.Address=checkValidation(obj,"Address")),isNeed("SubnetMask")&&(errors.SubnetMask=checkValidation(obj,"SubnetMask")),isNeed("GatewayIPAddress")&&(errors.GatewayIPAddress=checkValidation(obj,"GatewayIPAddress")),isNeed("DNSServer1")&&(errors.DNSServer1=checkValidation(obj,"DNSServer1")),isNeed("DNSServer2")&&(errors.DNSServer2=checkValidation(obj,"DNSServer2")),errors}}]),nw.directive("nwStrictIpValidation",["funcs",function(funcs){var reserved=[{start:"0.0.0.0",end:"0.255.255.255"},{start:"127.0.0.0",end:"127.255.255.255"},{start:"224.0.0.0",end:"239.255.255.255"},{start:"255.255.255.255",end:"255.255.255.255"}];return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$ctrl){function validation(value){var is;return funcs.is.ipv4(value)&&(is=_.some(reserved,function(range){return funcs.ipv4.subnet.belongNetworkRange(range,value)}),$ctrl.$setValidity("msg_invalid_ipv4",!is)),value}$ctrl.$parsers.unshift(validation),$ctrl.$formatters.unshift(validation)}}}]),nw.directive("nwNetworkType",["funcs",function(funcs){return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$ctrl){function validation(value){var isValid="ipv4"==version?validationIpv4(value):validationIpv6(value);return isValid?cleanValidError():$ctrl.$setValidity("msg_invalid_"+version+"_subnet",!1),value}function validationIpv4(value){if(!value)return!0;if(!funcs.is.ipv4Network(value))return!1;var ip=value.split("/")[0],mask=value.split("/")[1],net=funcs.ipv4.address.and(ip,funcs.ipv4.mask["long"](mask));return ip!=net?!1:!0}function validationIpv6(value){if(!value)return!0;if(!funcs.is.ipv6Network(value))return!1;var ip=value.split("/")[0],prefix=value.split("/")[1]?value.split("/")[1]:"128",net=funcs.ipv6.subnet.getNetworkAddress(ip,prefix);return funcs.ipv6.address.full(ip.toUpperCase())!=funcs.ipv6.address.full(net.toUpperCase())?!1:!0}function cleanValidError(){$ctrl.$setValidity("msg_invalid_ipv4_subnet",!0),$ctrl.$setValidity("msg_invalid_ipv6_subnet",!0)}var version="ipv4";$attrs.$observe({version:"nwNetworkTypeVersion"}.version,function(value){_.isUndefined(value)||(version=value,cleanValidError())}),$ctrl.$parsers.unshift(validation),$ctrl.$formatters.unshift(validation)}}}]),nw.directive("nwIpExtType",["funcs",function(funcs){return{restrict:"A",require:"ngModel",link:function($scope,$element,$attrs,$ctrl){function validation(value){var isValid="ipv4"==version?validationIpv4(value):validationIpv6(value);return isValid?cleanValidError():$ctrl.$setValidity("msg_invalid_"+version+"_ext",!1),value}function validationIpv4(value){if(!value)return!0;var arrVal=value.split("/"),ip=arrVal[0],mask=arrVal[1];return funcs.is.ipv4(ip)?""==mask?!1:_.isUndefined(mask)||funcs.is.ipv4Prefix(mask)?!0:!1:!1}function validationIpv6(value){if(!value)return!0;var arrVal=value.split("/"),ip=arrVal[0],prefix=arrVal[1];return funcs.is.ipv6(ip)?""==prefix?!1:_.isUndefined(prefix)||funcs.is.ipv6Prefix(prefix)?!0:!1:!1}function cleanValidError(){$ctrl.$setValidity("msg_invalid_ipv4_ext",!0),$ctrl.$setValidity("msg_invalid_ipv6_ext",!0)}var version="ipv4";$attrs.$observe({version:"nwIpExtTypeVersion"}.version,function(value){_.isUndefined(value)||(version=value,cleanValidError())}),$ctrl.$parsers.unshift(validation),$ctrl.$formatters.unshift(validation)}}}])}();