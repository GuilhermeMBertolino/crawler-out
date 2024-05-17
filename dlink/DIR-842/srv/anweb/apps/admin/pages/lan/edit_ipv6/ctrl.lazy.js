"use strict";angular.module("app").controllerProvider.register("LanEditIPv6Ctrl",["oneWayRequest","$q","$rootScope","$scope","$state","lanPage","LanPageCommon","funcs","ngDialog","pageDetails","translate","devinfo","systemActionService",function(oneWayRequest,$q,$rs,$scope,$state,lanPage,LanPageCommon,funcs,ngDialog,pageDetails,translate,devinfo,systemActionService){function findFirstNonTypicalPrefix(){for(var addr,address=$scope.lan.IPv6.__AddressArray,i=0;i<address.length;i++)if(addr=address[i].IPAddress,hasNonTypicalPrefix(addr,i))return addr;return null}function hasNonTypicalPrefix(addr,inx){if(addr&&!$scope.validateIPv6(addr,inx)){var arr=addr.split("/"),net=funcs.ipv6.subnet.getNetwork(arr[0],arr[1]);if(funcs.is.ipv6(net.net)&&net.prefix!=prefixForPoolConstructor)return!0}return!1}function findInReservation(addr){return $scope.lan.DHCPServer.ReservationArray.find(function(e){return!funcs.ipv6.address.compare(e.IPv6,addr)})}function onLoad(data){var lan=$scope.lan=data.View.LAN.List[thisInstInx];if($scope.needShowDropMultiCastWarn=funcs.newConfig.some(data.Device.WiFi.Radio,function(r){return r.Advanced.DropMulticast}),clientInfo.sitsOnEditable=doesClientSitOnEditable(lan),lanPageCommon.prepareIPv6ModelForForm(lan),initAddressingType=lan.IPv6.AddressingType,initDNSAuto=lan.IPv6.DHCP.__DNSAuto,"DHCPv6"==lan.IPv6.AddressingType){updating=!0;var pathsToUpdate=["IPv6.Address.","IPv6.Gateway","IPv6.DNS."].map(function(e){return thisInstPath+e});lanPage.subscribe($scope,onUpdate,pathsToUpdate)}}function onUpdate(){var lan=$scope.lan;"DHCPv6"==lan.IPv6.AddressingType&&(lan.IPv6.__AddressArray=lanPageCommon.getIPv6AddressArray(lan.IPv6.Address),lan.IPv6.__Gateway=lan.IPv6.Gateway,initDNSAuto&&lan.IPv6.DHCP.__DNSAuto&&(lan.IPv6.__DNSArray=lanPageCommon.getDNSAddressArray(lan.IPv6.DNS)))}function openKnownClientsDialog(data){return ngDialog.open({template:"dialogs/device_clients_list/dialog.tpl.html",controller:"DeviceClientsListDialogCtrl",data:data})}function openStaticIPDialog(data){return ngDialog.open({template:"dialogs/dhcp_static_address/dialog.tpl.html",controller:"DHCPStaticAddressDialogCtrl",scope:$scope,data:data})}function openDNSHostsDialog(data){return ngDialog.open({template:"dialogs/dns_hosts/dialog.tpl.html",controller:"DnsHostsDialogCtrl",resolve:funcs.getLazyResolve("dialogs/dns_hosts/ctrl.lazy.js","DnsHostsDialogCtrl"),data:data,scope:$scope})}function isPoolShortIPv6Valid(addr,prefix){var res=funcs.ipv6.subnet.getNetwork(addr,prefix);return"::"==res.net}function validatePoolEdgeIPv6(value){return funcs.is.ipv6(value)?isPoolShortIPv6Valid(value,prefixForPoolConstructor)?null:translate("lan_error_dhcp_invalid_pool_short_ipv6",{bits:prefixForPoolConstructor,examples:"::2"}):"msg_invalid_ipv6"}function conflictsWithOtherLocalIPv6(value,inx){var otherIPs,ipv6=$scope.lan.IPv6;return otherIPs=ipv6.__AddressArray.filter(function(e,i){return i!=inx}),otherIPs.filter(function(e){return e.IPAddress&&isIPv6Prefix(e.IPAddress)}).find(function(e){var arr=e.IPAddress.split("/"),net=funcs.ipv6.subnet.getNetwork(arr[0],arr[1]);return funcs.ipv6.subnet.belongNetwork(net.net,value,net.prefix)})}function isIPv6Prefix(addr){var arr=addr.split("/");return funcs.is.ipv6(arr[0])&&funcs.is.number(arr[1])}function getClientNewIPv4Host(){var newHostInfo=null,lan=$scope.lan,warn=translate("lan_warn_redirect_ip",{ip:"IPv4",abr:"ip"});return"Static"==lan.IPv4.AddressingType?newHostInfo={warn:warn,value:lanPageCommon.splitIPPrefix(lan.IPv4.Static.IPAddress)[0]}:"Unknown"==lan.IPv4.AddressingType&&(newHostInfo={warn:warn,value:lanPageCommon.splitIPPrefix(lanPageCommon.getFirstInstance(lan.IPv4.Address).IPAddress)[0]}),newHostInfo}function getClientNewIPv6Host(warn){var newHostInfo=null,lan=$scope.lan;if(warn||(warn=translate("lan_warn_redirect_ip",{ip:"IPv6",abr:"ip"})),"Staticv6"==lan.IPv6.AddressingType&&lan.IPv6.Static.IPAddress)newHostInfo={warn:warn,value:lanPageCommon.splitIPPrefix(lan.IPv6.Static.IPAddress)[0]};else if("Unknown"==lan.IPv6.AddressingType){var arr=lan.IPv6.__AddressArray.filter(function(e){return e.IPAddress});arr.length&&(newHostInfo={warn:warn,value:lanPageCommon.splitIPPrefix(lan.IPv6.__AddressArray[0].IPAddress)[0]})}return newHostInfo}function getClientNewDomainNameHost(warn){var newHostInfo=null,lan=$scope.lan;return lan.DomainName&&(newHostInfo={warn:warn||"lan_warn_redirect_domain_name",value:lan.DomainName}),newHostInfo}function isIPv6WebHost(ipPrefix){var addr=lanPageCommon.splitIPPrefix(ipPrefix)[0];return addr&&funcs.is.ipv6(webHost)?0==funcs.ipv6.address.compare(addr,webHost):!1}function getClientNewHost(){var lan=$scope.lan;if(!clientInfo.sitsOnEditable)return null;if(funcs.is.ipv4(webHost)||webHost==lan.DomainName||funcs.is.ipv6(webHost)&&("DHCPv6"==lan.IPv6.AddressingType&&"DHCPv6"==initAddressingType||"Unknown"==lan.IPv6.AddressingType&&lan.IPv6.__AddressArray.find(function(e){return isIPv6WebHost(e.IPAddress)})||"Staticv6"==lan.IPv6.AddressingType&&isIPv6WebHost(lan.IPv6.Static.IPAddress)))return null;var newHostInfo={warn:"lan_warn_redirect_no_ip"};return funcs.is.hostname(webHost)?newHostInfo=getClientNewDomainNameHost("lan_warn_redirect_new_domain_name")||getClientNewIPv4Host()||getClientNewIPv6Host()||{warn:"lan_warn_redirect_no_ip"}:funcs.is.ipv6(webHost)&&(newHostInfo=getClientNewIPv6Host(translate("lan_warn_redirect_new_ip",{ip:"IPv6",abr:"ip"}))||getClientNewIPv4Host()||getClientNewDomainNameHost()||{warn:"lan_warn_redirect_no_ip"}),newHostInfo}function doesClientSitOnEditable(lan){var address=lan.IPv6.Address;return webHost==lan.DomainName||address&&Object.keys(address).map(function(k){return address[k].IPAddress}).find(function(e){return isIPv6WebHost(e)})?!0:!1}function goAwayOnSuccess(newHost){Object.keys(allLANData.View.LAN.List).length>1?pageDetails.lanList[0].go(newHost):pageDetails.lanEditIPv6[0].go(newHost,{data:null,inx:thisInstInx},{reload:!0})}function checkDHCPPoolAndLocalIPsIntersection(startIP,endIP,addressArray){var ipv6=$scope.lan.IPv6;if("Staticv6"==ipv6.AddressingType)return checkDHCPPoolAndLocalOneIPIntersection(startIP,endIP,ipv6.Static.IPAddress);for(var i in addressArray)if(checkDHCPPoolAndLocalOneIPIntersection(startIP,endIP,addressArray[i].IPAddress))return!0;return!1}function checkDHCPPoolAndLocalOneIPIntersection(startIP,endIP,ip){if(!$scope.validateIPv6(ip,0)){var arr=ip.split("/"),nodeAddr=funcs.ipv6.subnet.splitToNetworkAndNode(arr[0],arr[1]).node;if(funcs.ipv6.subnet.belongNetworkRange({start:startIP,end:endIP},nodeAddr))return!0}return!1}function prepareModelForSubmit(){var wdk=lanPage.getWorkDataKeeper(),basePath="View.LAN.List.".concat(thisInstInx);lanPageCommon.prepareIPv6ModelForSubmit(wdk,basePath+".")}function getLocalAddressArrForCurrentAddressingType(){var arr,ipv6=$scope.lan.IPv6;return arr="Staticv6"==ipv6.AddressingType?[ipv6.Static.IPAddress]:ipv6.__AddressArray.map(function(e){return e.IPAddress})}var lanPageCommon=LanPageCommon(),allLANData=$state.params.data,thisInstInx=$state.params.inx,thisInstPath="List."+thisInstInx+".",prefixForPoolConstructor=64,initAddressingType=null,initDNSAuto=!1,clientInfo={},webHost=document.location.hostname,updating=!1;$scope.hostsMin=6,$scope.hostsMax=16777214,$scope.prefixForPoolConstructor=prefixForPoolConstructor.toString(),$scope.hostsMax=254,devinfo.once("client").then(function(res){return res.client&&"WLAN"==res.client.name&&(clientInfo.directWiFiConnection=!0),allLANData?lanPage.setData(allLANData):lanPage.pull(thisInstPath)}).then(function(data){allLANData=data,onLoad(data),$scope.$emit("pageload")})["catch"](function(error){$state.go("error",{code:"msg_pull_error",message:"msg_error_desc"})}),$scope.goToIPv4=function(){var data=lanPage.getWorkDataKeeper().initialTree;$state.go(pageDetails.lanEdit[0].state,{inx:thisInstInx,data:data})},$scope.addLocalIPv6=function(){$scope.lan.IPv6.__AddressArray.push({IPAddress:"",__inx:$scope.lan.IPv6.__AddressArray.length})},$scope.removeLocalIPv6=function(inx){$scope.lan.IPv6.__AddressArray.splice(inx,1),lanPageCommon.indexIPv6AddressArray($scope.lan.IPv6.__AddressArray)},$scope.removeDHCPRelayAddress=function(inx){$scope.lan.DHCPServer.DHCPv6.__RelayArray.splice(inx,1)},$scope.addDHCPRelayAddress=function(){$scope.lan.DHCPServer.DHCPv6.__RelayArray.push({IPAddress:""})},$scope.allowDeleteRelayIP=function(){return $scope.lan.DHCPServer.DHCPv6.__RelayArray.length>1},$scope.addStaticIPv6=function(){var reservArr=$scope.lan.DHCPServer.DHCPv6.__ReservationArray;openStaticIPDialog({used:reservArr,ipVersion:"ipv6",gw:$scope.lan.IPv6.Gateway,lanIPv6Arr:getLocalAddressArrForCurrentAddressingType()}).closePromise.then(function(data){if(data.value&&"$escape"!=data.value){var value=data.value;reservArr.push({IPAddress:value.ip,MACAddress:value.mac,Hostname:value.hostname,Lease:value.lease})}})},$scope.editStaticIPv6=function(item,inx){var used=$scope.lan.DHCPServer.DHCPv6.__ReservationArray.filter(function(e,i){return i!=inx});openStaticIPDialog({used:used,ipVersion:"ipv6",lanIPv6Arr:getLocalAddressArrForCurrentAddressingType(),gw:$scope.lan.IPv6.Gateway,ip:item.IPAddress,mac:item.MACAddress,hostname:item.Hostname,lease:item.Lease}).closePromise.then(function(data){data.value&&"$escape"!=data.value&&(item.IPAddress=data.value.ip,item.MACAddress=data.value.mac,item.Hostname=data.value.hostname,item.Lease=data.value.lease)})},$scope.deleteStaticIPv6=function(items,keys){lanPageCommon.deleteItems($scope.lan.DHCPServer.DHCPv6,"__ReservationArray",keys)},$scope.addDNSHost=function(){var hostsArr=$scope.lan.DHCPServer.DHCPv6.__HostsArray;openDNSHostsDialog({ipVersion:"ipv6",hostsArr:hostsArr}).closePromise.then(function(data){if(data.value&&"$escape"!=data.value){var host=data.value.host;hostsArr.push(host)}})},$scope.editDNSHost=function(item,inx){var hostsArr=$scope.lan.DHCPServer.DHCPv6.__HostsArray;openDNSHostsDialog({ipVersion:"ipv6",hostsArr:hostsArr,inx:inx}).closePromise.then(function(data){if(data.value&&"$escape"!=data.value){var host=data.value.host;item.Hostname=host.Hostname,item.__AddressArray=host.__AddressArray}})},$scope.deleteDNSHosts=function(items,keys){lanPageCommon.deleteItems($scope.lan.DHCPServer.DHCPv6,"__HostsArray",keys)},$scope.submit=function(form){if(form.$valid){var confirmed,newHostInfo=getClientNewHost();if(confirmed=confirm(newHostInfo?translate(newHostInfo.warn):translate("msg_warn_submit")),!confirmed)return void(form.$canceled=!0);prepareModelForSubmit();var overlay=$scope.overlay.circular,overlayId=overlay.start(),newHost=newHostInfo?newHostInfo.value:null;oneWayRequest({req:lanPage.push(),minTime:3e3,maxTime:12e4,newHost:newHostInfo?newHostInfo.value:null}).then(function(res){if(overlay.stop(overlayId),res.data&&res.data.needReboot&&confirm(translate("notice_save_and_reboot_desc")))return systemActionService.reboot({newHost:newHost});var d=$q.defer();return d.resolve(),d.promise}).then(function(){!$rs.dlinkMobileApp.isUserInMobileApp()&&clientInfo.directWiFiConnection&&alert(translate("lan_warn_check_wifi")),goAwayOnSuccess(newHost)})["catch"](function(error){$state.go("error",{code:"msg_push_error",message:"msg_error_desc"})})["finally"](function(){overlay.stop(overlayId)})}},$scope.addKnownClients=function(){openKnownClientsDialog({ipversion:"ipv4",comment:"lan_dhcp_stat_addr_select_clients_comment"}).closePromise},$scope.showDNSServer=function(){return lanPageCommon.showDNSv6Server($scope.lan)},$scope.showNonTypicalPrefixWarning=function(){var ipv6=$scope.lan.IPv6,type=ipv6.AddressingType;return"Staticv6"==type?hasNonTypicalPrefix(ipv6.Static.IPAddress,0):"Unknown"==type?!!findFirstNonTypicalPrefix():!1},$scope.showDHCPPoolIntersectionWarning=function(){var startIP=$scope.lan.DHCPServer.DHCPv6.StartIP,endIP=$scope.lan.DHCPServer.DHCPv6.EndIP;return $scope.validateStartIPv6(startIP)||$scope.validateEndIPv6(endIP)?!1:checkDHCPPoolAndLocalIPsIntersection(startIP,endIP,$scope.lan.IPv6.__AddressArray)},$scope.dnsHostAddressArrayToString=lanPageCommon.dnsHostAddressArrayToString,$scope.getInstanceNumber=function(multiObject){var count=0;return multiObject&&(count=Object.keys(multiObject).length),count},$scope.changed=function(){return $scope.lan?(prepareModelForSubmit(),lanPage.changed()):void 0},$scope.openDHCPServerAddressPoolDialog=function(){var data={ipVersion:6,gateway:$scope.lan.IPv6.Gateway};data.ipPrefix="Staticv6"==$scope.lan.IPv6.AddressingType?$scope.lan.IPv6.Static.IPAddress:$scope.lan.IPv6.__AddressArray[0].IPAddress,$scope.lan.IPv6.Gateway&&(data.gateway=$scope.lan.IPv6.Gateway),ngDialog.open({template:"dialogs/dhcp_server_address_pool/dialog.tpl.html",controller:"DHCPServerAddressPoolDialogCtrl",data:data,scope:$scope}).closePromise.then(function(data){data.value&&"$escape"!=data.value&&($scope.lan.DHCPServer.DHCPv6.StartIP=data.value.start,$scope.lan.DHCPServer.DHCPv6.EndIP=data.value.end)})},$scope.suggestRangeDisable=function(){var gateway=$scope.lan.IPv6.__Gateway;if("Staticv6"==$scope.lan.IPv6.AddressingType){var addr=$scope.lan.IPv6.Static.IPAddress;return!(addr&&isIPv6Prefix(addr))||gateway&&!funcs.is.ipv6(gateway)}var arr=$scope.lan.IPv6.__AddressArray;return!(arr&&1==arr.length&&isIPv6Prefix(arr[0].IPAddress))||gateway&&!funcs.is.ipv6(gateway)},$scope.onAddressingTypeChange=function(){var ipv6=$scope.lan.IPv6,addrType=ipv6.AddressingType;"Staticv6"==addrType&&(ipv6.__AddressArray.length&&ipv6.__AddressArray[0].IPAddress&&(ipv6.Static.IPAddress=ipv6.__AddressArray[0].IPAddress),ipv6.__Gateway||(ipv6.__Gateway=ipv6.Static.Gateway))},$scope.removeDNSAddress=function(inx){lanPageCommon.removeDNSAddress($scope.lan.IPv6,inx)},$scope.addDNSAddress=function(){lanPageCommon.addDNSAddress($scope.lan.IPv6)},$scope.allowDeleteDNSAddress=function(){return lanPageCommon.allowDeleteDNSAddress($scope.lan.IPv6)},$scope.onDNSAutoChange=function(){updating&&onUpdate()},$scope.haveAPFeatures=function(){return lanPage.haveAPFeatures($scope.lan.IPv6)},$scope.getManagedAddressArray=lanPageCommon.getManagedAddressArray,$scope.getUnmanagedAddressArray=lanPageCommon.getUnmanagedAddressArray,$scope.getLeaseColumn=lanPageCommon.getLeaseColumn,$scope.getReservationItemSecondaryLine=lanPageCommon.getReservationItemSecondaryLine,$scope.validateStartIPv6=function(value){var res=validatePoolEdgeIPv6(value);if(res)return res;var endIP=$scope.lan.DHCPServer.DHCPv6.EndIP;return funcs.is.ipv6(endIP)&&(res=funcs.ipv6.address.compare(value,endIP),res>0)?"lan_error_dhcp_start_ip_more_stop_ip":null},$scope.validateEndIPv6=function(value){var res=validatePoolEdgeIPv6(value);if(res)return res;var startIP=$scope.lan.DHCPServer.StartIP;return funcs.is.ipv6(startIP)&&(res=funcs.ipv6.address.compare(value,startIP),0>res)?"lan_error_dhcp_stop_ip_less_start_ip":null},$scope.validateRelayIPv6=function(value,required){if(value){if(!funcs.is.ipv6(value))return"msg_invalid_ipv6"}else{var relayArr=$scope.lan.DHCPServer.DHCPv6.__RelayArray;if($scope.form.relay_ip.$dirty&&required&&!relayArr.find(function(e){return e.IPAddress}))return"msg_need_addr"}return null},$scope.validateIPv6=function(value,inx){if(value){var arr=value.split("/"),addr=arr[0],prefix=arr[1],addrType=$scope.lan.IPv6.AddressingType;if(!funcs.is.ipv6(addr))return"msg_invalid_ipv6";if(!funcs.is.number(prefix))return"msg_invalid_ipv6_prefix";if(prefix>128||1>prefix)return"lan_error_subnet_ipv6_prefix_out_of_range";if(funcs.ipv6.subnet.checkReserved(addr,prefix))return"lan_error_ip_is_reserved";if("Unknown"==addrType&&conflictsWithOtherLocalIPv6(value,inx))return"lan_error_subnet_conflicts";if("Stateful"==$scope.lan.DHCPServer.Mode){var obj=findInReservation(addr);if(obj)return translate("lan_error_ip_is_used_as_static_ip",{mac:obj.MAC})}}return null},$scope.validateDNSAddress=function(value,inx){return lanPageCommon.validateDNSAddress(value,inx,$scope.lan.IPv6.__DNSArray,"ipv6")},$scope.validateGateway=function(value){if(!value)return null;if(!funcs.is.ipv6(value))return"msg_invalid_ipv6";var ip0=$scope.lan.IPv6.__AddressArray[0].IPAddress,arr=ip0.split("/"),addr0=arr[0],prefix0=arr[1];if(!funcs.ipv6.address.compare(value,addr0))return"lan_error_gw_ip_address_is_used_as_lan_ip";if(funcs.ipv6.subnet.checkReserved(value,prefix0))return"lan_error_ip_is_reserved";if(!funcs.ipv6.subnet.belongNetwork(funcs.ipv6.subnet.getNetwork(addr0,prefix0).net,value,prefix0))return"lan_error_gateway_not_belong_subnets";if("Stateful"==$scope.lan.DHCPServer.Mode){var obj=findInReservation(value);if(obj)return translate("lan_error_ip_is_used_as_static_ip",{mac:obj.MAC})}return null}}]);