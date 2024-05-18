var strMode_N = [
	["802.11n only","n-only"],
	["802.11g/n mixed","gn"],
	["802.11b/g/n mixed","n"]
];

var strMode_AN = [
	["802.11a only","a"],
	["802.11n only","n-only"],
	["802.11a/n mixed","an"]
];

var strMode_AC = [
	["802.11ac only","ac-only"],
	["802.11ac/n mixed","nac"],
	["802.11a/n/ac mixed","ac"]
];

var strMode = {
	'n-only': '802.11n only',
	'gn': '802.11gn mixed',
	'n': '802.11bgn mixed',
	'a': '802.11a only',
	'an': '802.11an mixed',
	'ac-only': '802.11ac only',
	'nac': '802.11ac/n mixed',
	'ac': '802.11a/n/ac mixed'
};

var strBandWidth = [
    ["Auto","Auto"],
    ["20MHz","20M"],
    ["40MHz","40M"]
];

var strBandWidth_AC = [
    ["80MHz","80M"]
];

var typeArray = [
    "Mobilephone",
    "Telephone",
    "Long Distance",
    "International Call",
    "Other",
    "Pick up the phone and dial *20 to listen to voice messages."
];
var callsArray = [
    "All incoming calls",
    "Call to ",
    "Call to ",
    "Call from ",
    "All anonymous call",
    "Anonymous call to "
];
var fwArray = [
    "Unconditional",
    "No answer"
];
var phone = [
    "Private",
    "Work",
    "Cell"
];
var showtype = [
    "Auto",
    "-Please Select-",
    ".pri",
    ".cell",
    ".work",
    "Automatically",
    "All",
    "The router can record voice messages with a total length of %.",
    "LAN",
    "Any_WAN"
];
var processType = [
    "unconnected",
    "connected",
    "conference",
    "local transfer",
    "remote transfer",
    "local forward",
    "remote forward",
    "unknown"
];
var callType = [
    "Incoming",
    "Outgoing",
    "Unknown",
    "Forward",
    "Missed"
];