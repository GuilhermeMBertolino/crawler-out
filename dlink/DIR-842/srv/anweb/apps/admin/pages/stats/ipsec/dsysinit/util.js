"use strict";!function(){angular.module("app").service("statsIPsecUtil",["devinfo","device","translate","funcs",function(devinfo,device,translate,funcs){var paths={stats:"Device.Statistics.IPsec.",network:"Device.Network.Connection.IPsec."},converter=device.statsIPsec.converter;return{subscribeInfo:function(cb,$scope){function getBytesInfo(item){function sizeTranslater(value){return translate("units_"+value)}function getValue(value){return _.isFinite(value)&&value>0?funcs.lookSize(value).toString(sizeTranslater):"-"}if(_.isUndefined(item.BytesReceived)&&_.isUndefined(item.BytesSent))return null;var received=parseInt(item.BytesReceived),sent=parseInt(item.BytesSent);return getValue(received)+" / "+getValue(sent)}devinfo.onceAndSubscribe(paths.stats+"|"+paths.network,function(response){var stats,network,input,data=[];response&&response[paths.stats]&&response[paths.network]&&(stats=funcs.splitTree(response[paths.stats]),network=funcs.splitTree(response[paths.network]),input=funcs.buildTree(stats.concat(network)),data=converter.dsysinitToNative(input),_.map(data,function(item){return item.Bytes=getBytesInfo(item),item})),cb&&cb(data)},$scope)}}}])}();