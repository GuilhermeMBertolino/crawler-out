﻿var wireless = {};
(function () {
var object = { ...system.wlBandSeq };
var array = Object.keys(object);
for (var i = 0; i < array.length; i++) {
var key = array[i];
var wl_unit = object[key].wl_unit;
var prefix = object[key].prefix;
var nvram = httpApi.nvramGet([
'wl' + wl_unit + '_ssid',
'wl' + wl_unit + '_country_code',
'wl' + wl_unit + '_version',
'wl' + wl_unit + '_bw_160',
]);
wireless[key] = new wlObjConstructor();
wireless[key].ssid = nvram['wl' + wl_unit + '_ssid'];
wireless[key].capability = httpApi.hookGet('wl_cap_' + prefix).split(' ');
wireless[key].channel = httpApi.hookGet('channel_list_' + prefix);
wireless[key].chanspecs = httpApi.hookGet('chanspecs_' + prefix);
wireless[key].countryCode = nvram['wl' + wl_unit + '_country_code'];
wireless[key].acsCH13Support = wireless[key].channel.length > 11 ? true : false;
wireless[key].sdkVersion = nvram['wl' + wl_unit + '_version'].split('.')[0];
wireless[key].xboxOpt = isSupport('optimize_xbox');
wireless[key].noVHTSupport = isSupport('no_vht');
wireless[key].heFrameSupport = (function () {
var tmp = wireless[key].capability.find((element) => element === '11ax');
return tmp === '11ax' ? true : false;
})();
wireless[key].mboSupport = (function () {
var tmp = wireless[key].capability.find((element) => element === '11ax');
return tmp === '11ax' ? true : false;
})();
wireless[key].twtSupport = (function () {
var tmp = wireless[key].capability.find((element) => element === '11ax');
return tmp === '11ax' ? true : false;
})();
wireless[key].chanspecs.forEach(function (element) {
if (
element.indexOf('u') !== -1 || // 40 MHz
element.indexOf('l') !== -1 ||
element.indexOf('/40') != -1
) {
wireless[key].channel40MHz.push(element);
} else if (element.indexOf('/80') != -1) {
wireless[key].channel80MHz.push(element);
} else if (element.indexOf('/160') != -1) {
wireless[key].channel160MHz.push(element);
} else {
wireless[key].channel20MHz.push(element);
}
});
wireless[key].axSupport = (function () {
var tmp = wireless[key].capability.find((element) => element === '11ax');
return tmp === '11ax' ? true : false;
})();
wireless[key].acSupport = key === '2g' ? false : isSupport('11AC');
wireless[key].bw80MHzSupport = (function () {
if (system.BRCMplatform) {
return wireless[key].channel80MHz.length !== 0 ? true : false;
} else {
return key === '2g' ? false : isSupport('11AC');
}
})();
wireless[key].bw160MHzSupport = (function () {
if (system.BRCMplatform) {
return wireless[key].channel160MHz.length !== 0 ? true : false;
} else {
return key === '2g' ? false : isSupport('vht160');
}
})();
wireless[key].bw160Enabled = nvram['wl' + wl_unit + '_bw_160'] === '1' ? true : false;
wireless[key].dfsSupport = wireless[key].channel.some((element) => element === '56' || element === '100');
}
})();

