module("luci.model.dstRuleTbl", package.seeall)

local dbg   = require "luci.tools.debug"

--[[
	dst rule table
	{ "rule_id", "zone_id", "dst_savings", "start_dst", "end_dst" },
]]

AFRICA_TBL = {
	{ "0", "Africa/Abidjan", "0", "0", "0" },
	{ "1", "Africa/Accra", "0", "0", "0" },
	{ "2", "Africa/Addis_Ababa", "0", "0", "0" },
	{ "3", "Africa/Algiers", "0", "0", "0" },
	{ "4", "Africa/Asmara", "0", "0", "0" },
	{ "5", "Africa/Asmera", "0", "0", "0" },
	{ "6", "Africa/Bamako", "0", "0", "0" },
	{ "7", "Africa/Bangui", "0", "0", "0" },
	{ "8", "Africa/Banjul", "0", "0", "0" },
	{ "9", "Africa/Bissau", "0", "0", "0" },
	{ "10", "Africa/Blantyre", "0", "0", "0" },
	{ "11", "Africa/Brazzaville", "0", "0", "0" },
	{ "12", "Africa/Bujumbura", "0", "0", "0" },
	{ "13", "Africa/Cairo", "0", "0", "0" },
	{ "14", "Africa/Casablanca", "60", "2017:10:5:1:120", "2018:3:4:1:120" },
	{ "15", "Africa/Casablanca", "60", "2017:5:4:1:120", "2017:7:1:1:120" },
	{ "16", "Africa/Ceuta", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "17", "Africa/Conakry", "0", "0", "0" },
	{ "18", "Africa/Dakar", "0", "0", "0" },
	{ "19", "Africa/Dar_es_Salaam", "0", "0", "0" },
	{ "20", "Africa/Djibouti", "0", "0", "0" },
	{ "21", "Africa/Douala", "0", "0", "0" },
	{ "22", "Africa/El_Aaiun", "60", "2017:10:5:1:120", "2018:3:4:1:120" },
	{ "23", "Africa/El_Aaiun", "60", "2017:5:4:1:120", "2017:7:1:1:120" },
	{ "24", "Africa/Freetown", "0", "0", "0" },
	{ "25", "Africa/Gaborone", "0", "0", "0" },
	{ "26", "Africa/Harare", "0", "0", "0" },
	{ "27", "Africa/Johannesburg", "0", "0", "0" },
	{ "28", "Africa/Juba", "0", "0", "0" },
	{ "29", "Africa/Kampala", "0", "0", "0" },
	{ "30", "Africa/Khartoum", "0", "0", "0" },
	{ "31", "Africa/Kigali", "0", "0", "0" },
	{ "32", "Africa/Kinshasa", "0", "0", "0" },
	{ "33", "Africa/Lagos", "0", "0", "0" },
	{ "34", "Africa/Libreville", "0", "0", "0" },
	{ "35", "Africa/Lome", "0", "0", "0" },
	{ "36", "Africa/Luanda", "0", "0", "0" },
	{ "37", "Africa/Lubumbashi", "0", "0", "0" },
	{ "38", "Africa/Lusaka", "0", "0", "0" },
	{ "39", "Africa/Malabo", "0", "0", "0" },
	{ "40", "Africa/Maputo", "0", "0", "0" },
	{ "41", "Africa/Maseru", "0", "0", "0" },
	{ "42", "Africa/Mbabane", "0", "0", "0" },
	{ "43", "Africa/Mogadishu", "0", "0", "0" },
	{ "44", "Africa/Monrovia", "0", "0", "0" },
	{ "45", "Africa/Nairobi", "0", "0", "0" },
	{ "46", "Africa/Ndjamena", "0", "0", "0" },
	{ "47", "Africa/Niamey", "0", "0", "0" },
	{ "48", "Africa/Nouakchott", "0", "0", "0" },
	{ "49", "Africa/Ouagadougou", "0", "0", "0" },
	{ "50", "Africa/Porto-Novo", "0", "0", "0" },
	{ "51", "Africa/Sao_Tome", "0", "0", "0" },
	{ "52", "Africa/Timbuktu", "0", "0", "0" },
	{ "53", "Africa/Tripoli", "0", "0", "0" },
	{ "54", "Africa/Tunis", "0", "0", "0" },
--	{ "55", "Africa/Windhoek", "0", "0", "0" },		-- use 56
	{ "56", "Africa/Windhoek", "60", "2017:9:1:1:60", "2018:4:1:1:0" },
}

AMERICA_TBL = {
	{ "57", "America/Adak", "60", "2017:3:2:1:720", "2017:11:1:1:660" },
	{ "58", "America/Anchorage", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "59", "America/Anguilla", "0", "0", "0" },
	{ "60", "America/Antigua", "0", "0", "0" },
	{ "61", "America/Araguaina", "0", "0", "0" },
	{ "62", "America/Argentina/Buenos_Aires", "0", "0", "0" },
	{ "63", "America/Argentina/Catamarca", "0", "0", "0" },
	{ "64", "America/Argentina/ComodRivadavia", "0", "0", "0" },
	{ "65", "America/Argentina/Cordoba", "0", "0", "0" },
	{ "66", "America/Argentina/Jujuy", "0", "0", "0" },
	{ "67", "America/Argentina/La_Rioja", "0", "0", "0" },
	{ "68", "America/Argentina/Mendoza", "0", "0", "0" },
	{ "69", "America/Argentina/Rio_Gallegos", "0", "0", "0" },
	{ "70", "America/Argentina/Salta", "0", "0", "0" },
	{ "71", "America/Argentina/San_Juan", "0", "0", "0" },
	{ "72", "America/Argentina/San_Luis", "0", "0", "0" },
	{ "73", "America/Argentina/Tucuman", "0", "0", "0" },
	{ "74", "America/Argentina/Ushuaia", "0", "0", "0" },
	{ "75", "America/Aruba", "0", "0", "0" },
--	{ "76", "America/Asuncion", "0", "0", "0" },		--use 77
	{ "77", "America/Asuncion", "60", "2017:10:1:1:240", "2018:3:4:1:180" },
	{ "78", "America/Atikokan", "0", "0", "0" },
	{ "79", "America/Atka", "60", "2017:3:2:1:720", "2017:11:1:1:660" },
	{ "80", "America/Bahia", "0", "0", "0" },
	{ "81", "America/Bahia_Banderas", "60", "2017:4:1:1:480", "2017:10:5:1:420" },
	{ "82", "America/Barbados", "0", "0", "0" },
	{ "83", "America/Belem", "0", "0", "0" },
	{ "84", "America/Belize", "0", "0", "0" },
	{ "85", "America/Blanc-Sablon", "0", "0", "0" },
	{ "86", "America/Boa_Vista", "0", "0", "0" },
	{ "87", "America/Bogota", "0", "0", "0" },
	{ "88", "America/Boise", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "89", "America/Buenos_Aires", "0", "0", "0" },
	{ "90", "America/Cambridge_Bay", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
--	{ "91", "America/Campo_Grande", "0", "0", "0" },	--use 92
	{ "92", "America/Campo_Grande", "60", "2017:10:3:1:240", "2018:2:3:1:180" },
	{ "93", "America/Cancun", "60", "2015:2:1:1:480", "2015:2:1:1:480" },
	{ "94", "America/Caracas", "0", "0", "0" },
	{ "95", "America/Catamarca", "0", "0", "0" },
	{ "96", "America/Cayenne", "0", "0", "0" },
	{ "97", "America/Cayman", "0", "0", "0" },
	{ "98", "America/Chicago", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "99", "America/Chihuahua", "60", "2017:4:1:1:540", "2017:10:5:1:480" },
	{ "100", "America/Coral_Harbour", "0", "0", "0" },
	{ "101", "America/Cordoba", "0", "0", "0" },
	{ "102", "America/Costa_Rica", "0", "0", "0" },
	{ "103", "America/Creston", "0", "0", "0" },
--	{ "104", "America/Cuiaba", "0", "0", "0" },			--use 105
	{ "105", "America/Cuiaba", "60", "2017:10:3:1:240", "2018:2:3:1:180" },
	{ "106", "America/Curacao", "0", "0", "0" },
	{ "107", "America/Danmarkshavn", "0", "0", "0" },
	{ "108", "America/Dawson", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "109", "America/Dawson_Creek", "0", "0", "0" },
	{ "110", "America/Denver", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "111", "America/Detroit", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "112", "America/Dominica", "0", "0", "0" },
	{ "113", "America/Edmonton", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "114", "America/Eirunepe", "0", "0", "0" },
	{ "115", "America/El_Salvador", "0", "0", "0" },
	{ "116", "America/Ensenada", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "117", "America/Fort_Nelson", "0", "0", "0" },
	{ "118", "America/Fort_Wayne", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "119", "America/Fortaleza", "0", "0", "0" },
	{ "120", "America/Glace_Bay", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "121", "America/Godthab", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "122", "America/Goose_Bay", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "123", "America/Grand_Turk", "60", "2015:11:1:1:360", "2015:11:1:1:360" },
	{ "124", "America/Grenada", "0", "0", "0" },
	{ "125", "America/Guadeloupe", "0", "0", "0" },
	{ "126", "America/Guatemala", "0", "0", "0" },
	{ "127", "America/Guayaquil", "0", "0", "0" },
	{ "128", "America/Guyana", "0", "0", "0" },
	{ "129", "America/Halifax", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "130", "America/Havana", "60", "2017:3:2:1:300", "2017:11:1:1:300" },
	{ "131", "America/Hermosillo", "0", "0", "0" },
	{ "132", "America/Indiana/Indianapolis", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "133", "America/Indiana/Knox", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "134", "America/Indiana/Marengo", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "135", "America/Indiana/Petersburg", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "136", "America/Indiana/Tell_City", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "137", "America/Indiana/Vevay", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "138", "America/Indiana/Vincennes", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "139", "America/Indiana/Winamac", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "140", "America/Indianapolis", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "141", "America/Inuvik", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "142", "America/Iqaluit", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "143", "America/Jamaica", "0", "0", "0" },
	{ "144", "America/Jujuy", "0", "0", "0" },
	{ "145", "America/Juneau", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "146", "America/Kentucky/Louisville", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "147", "America/Kentucky/Monticello", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "148", "America/Knox_IN", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "149", "America/Kralendijk", "0", "0", "0" },
	{ "150", "America/La_Paz", "0", "0", "0" },
	{ "151", "America/Lima", "0", "0", "0" },
	{ "152", "America/Los_Angeles", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "153", "America/Louisville", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "154", "America/Lower_Princes", "0", "0", "0" },
	{ "155", "America/Maceio", "0", "0", "0" },
	{ "156", "America/Managua", "0", "0", "0" },
	{ "157", "America/Manaus", "0", "0", "0" },
	{ "158", "America/Marigot", "0", "0", "0" },
	{ "159", "America/Martinique", "0", "0", "0" },
	{ "160", "America/Matamoros", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "161", "America/Mazatlan", "60", "2017:4:1:1:540", "2017:10:5:1:480" },
	{ "162", "America/Mendoza", "0", "0", "0" },
	{ "163", "America/Menominee", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "164", "America/Merida", "60", "2017:4:1:1:480", "2017:10:5:1:420" },
	{ "165", "America/Metlakatla", "0", "0", "0" },
--	{ "166", "America/Metlakatla", "0", "2017:11:1:1:600", "2018:3:2:1:660" },		dst_savings = 0 ??
	{ "167", "America/Mexico_City", "60", "2017:4:1:1:480", "2017:10:5:1:420" },
	{ "168", "America/Miquelon", "60", "2017:3:2:1:300", "2017:11:1:1:240" },
	{ "169", "America/Moncton", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "170", "America/Monterrey", "60", "2017:4:1:1:480", "2017:10:5:1:420" },
	{ "171", "America/Montevideo", "0", "0", "0" },
	{ "172", "America/Montreal", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "173", "America/Montserrat", "0", "0", "0" },
	{ "174", "America/Nassau", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "175", "America/New_York", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "176", "America/Nipigon", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "177", "America/Nome", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "178", "America/Noronha", "0", "0", "0" },
	{ "179", "America/North_Dakota/Beulah", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "180", "America/North_Dakota/Center", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "181", "America/North_Dakota/New_Salem", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "182", "America/Ojinaga", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "183", "America/Panama", "0", "0", "0" },
	{ "184", "America/Pangnirtung", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "185", "America/Paramaribo", "0", "0", "0" },
	{ "186", "America/Phoenix", "0", "0", "0" },
	{ "187", "America/Port_of_Spain", "0", "0", "0" },
	{ "188", "America/Port-au-Prince", "60", "2015:11:1:1:360", "2015:11:1:1:360" },
	{ "189", "America/Porto_Acre", "0", "0", "0" },
	{ "190", "America/Porto_Velho", "0", "0", "0" },
	{ "191", "America/Puerto_Rico", "0", "0", "0" },
	{ "192", "America/Rainy_River", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "193", "America/Rankin_Inlet", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "194", "America/Recife", "0", "0", "0" },
	{ "195", "America/Regina", "0", "0", "0" },
	{ "196", "America/Resolute", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "197", "America/Rio_Branco", "0", "0", "0" },
	{ "198", "America/Rosario", "0", "0", "0" },
	{ "199", "America/Santa_Isabel", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "200", "America/Santarem", "0", "0", "0" },
--	{ "201", "America/Santiago", "0", "0", "0" },		use 202
	{ "202", "America/Santiago", "60", "2017:8:2:1:240", "2018:5:2:1:180" },
	{ "203", "America/Santo_Domingo", "0", "0", "0" },
--	{ "204", "America/Sao_Paulo", "0", "0", "0" },		use 205
	{ "205", "America/Sao_Paulo", "60", "2017:10:3:1:180", "2018:2:3:1:120" },
	{ "206", "America/Scoresbysund", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "207", "America/Shiprock", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "208", "America/Sitka", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "209", "America/St_Barthelemy", "0", "0", "0" },
	{ "210", "America/St_Johns", "60", "2017:3:2:1:330", "2017:11:1:1:270" },
	{ "211", "America/St_Kitts", "0", "0", "0" },
	{ "212", "America/St_Lucia", "0", "0", "0" },
	{ "213", "America/St_Thomas", "0", "0", "0" },
	{ "214", "America/St_Vincent", "0", "0", "0" },
	{ "215", "America/Swift_Current", "0", "0", "0" },
	{ "216", "America/Tegucigalpa", "0", "0", "0" },
	{ "217", "America/Thule", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "218", "America/Thunder_Bay", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "219", "America/Tijuana", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "220", "America/Toronto", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "221", "America/Tortola", "0", "0", "0" },
	{ "222", "America/Vancouver", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "223", "America/Virgin", "0", "0", "0" },
	{ "224", "America/Whitehorse", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "225", "America/Winnipeg", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "226", "America/Yakutat", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "227", "America/Yellowknife", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
}

ANTARCICA_TBL = {
	{ "228", "Antarctica/Casey", "0", "0", "0" },
	{ "229", "Antarctica/Davis", "0", "0", "0" },
	{ "230", "Antarctica/DumontDUrville", "0", "0", "0" },
	{ "231", "Antarctica/Macquarie", "0", "0", "0" },
	{ "232", "Antarctica/Mawson", "0", "0", "0" },
--	{ "233", "Antarctica/McMurdo", "0", "0", "0" },		use 234
	{ "234", "Antarctica/McMurdo", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
--	{ "235", "Antarctica/Palmer", "0", "0", "0" },		use 236
	{ "236", "Antarctica/Palmer", "60", "2017:8:2:1:240", "2018:5:2:1:180" },
	{ "237", "Antarctica/Rothera", "0", "0", "0" },
--	{ "238", "Antarctica/South_Pole", "0", "0", "0" },	use 239
	{ "239", "Antarctica/South_Pole", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
	{ "240", "Antarctica/Syowa", "0", "0", "0" },
	{ "241", "Antarctica/Troll", "120", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "242", "Antarctica/Vostok", "0", "0", "0" },
}

ASIA_TBL = {
	{ "244", "Asia/Aden", "0", "0", "0" },
	{ "245", "Asia/Almaty", "0", "0", "0" },
	{ "246", "Asia/Amman", "60", "2017:3:5:5:1320", "2017:10:4:5:1320" },
	{ "247", "Asia/Anadyr", "0", "0", "0" },
	{ "248", "Asia/Aqtau", "0", "0", "0" },
	{ "249", "Asia/Aqtobe", "0", "0", "0" },
	{ "250", "Asia/Ashgabat", "0", "0", "0" },
	{ "251", "Asia/Ashkhabad", "0", "0", "0" },
	{ "252", "Asia/Baghdad", "0", "0", "0" },
	{ "253", "Asia/Bahrain", "0", "0", "0" },
	{ "254", "Asia/Baku", "60", "2015:10:4:1:0", "2015:10:4:1:0" },
	{ "255", "Asia/Bangkok", "0", "0", "0" },
	{ "256", "Asia/Barnaul", "0", "0", "0" },
	{ "257", "Asia/Beirut", "60", "2017:3:4:7:1320", "2017:10:5:7:1260" },
	{ "258", "Asia/Bishkek", "0", "0", "0" },
	{ "259", "Asia/Brunei", "0", "0", "0" },
	{ "260", "Asia/Calcutta", "0", "0", "0" },
	{ "261", "Asia/Chita", "0", "0", "0" },
	{ "262", "Asia/Choibalsan", "0", "0", "0" },
--	{ "263", "Asia/Choibalsan", "0", "2017:9:5:6:900", "2018:3:5:6:1080" },		dst_savings = 0??
	{ "264", "Asia/Chongqing", "0", "0", "0" },
	{ "265", "Asia/Chungking", "0", "0", "0" },
	{ "266", "Asia/Colombo", "0", "0", "0" },
	{ "267", "Asia/Dacca", "0", "0", "0" },
	{ "268", "Asia/Damascus", "60", "2017:3:5:5:1320", "2017:10:4:5:1260" },
	{ "269", "Asia/Dhaka", "0", "0", "0" },
	{ "270", "Asia/Dili", "0", "0", "0" },
	{ "271", "Asia/Dubai", "0", "0", "0" },
	{ "272", "Asia/Dushanbe", "0", "0", "0" },
	{ "273", "Asia/Gaza", "60", "2017:3:4:6:1380", "2017:10:4:5:1260" },
	{ "274", "Asia/Harbin", "0", "0", "0" },
	{ "275", "Asia/Hebron", "60", "2017:3:4:6:1380", "2017:10:4:5:1260" },
	{ "276", "Asia/Ho_Chi_Minh", "0", "0", "0" },
	{ "277", "Asia/Hong_Kong", "0", "0", "0" },
	{ "278", "Asia/Hovd", "0", "0", "0" },
--	{ "279", "Asia/Hovd", "0", "2017:9:5:6:960", "2018:3:5:6:1140" },		dst_savings - 0??
	{ "280", "Asia/Irkutsk", "0", "0", "0" },
	{ "281", "Asia/Istanbul", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "282", "Asia/Jakarta", "0", "0", "0" },
	{ "283", "Asia/Jayapura", "0", "0", "0" },
	{ "284", "Asia/Jerusalem", "60", "2017:3:4:6:0", "2017:10:5:7:1380" },
	{ "285", "Asia/Kabul", "0", "0", "0" },
	{ "286", "Asia/Kamchatka", "0", "0", "0" },
	{ "287", "Asia/Karachi", "0", "0", "0" },
	{ "288", "Asia/Kashgar", "0", "0", "0" },
	{ "289", "Asia/Kathmandu", "0", "0", "0" },
	{ "290", "Asia/Katmandu", "0", "0", "0" },
	{ "291", "Asia/Khandyga", "0", "0", "0" },
	{ "292", "Asia/Kolkata", "0", "0", "0" },
	{ "293", "Asia/Krasnoyarsk", "0", "0", "0" },
	{ "294", "Asia/Kuala_Lumpur", "0", "0", "0" },
	{ "295", "Asia/Kuching", "0", "0", "0" },
	{ "296", "Asia/Kuwait", "0", "0", "0" },
	{ "297", "Asia/Macao", "0", "0", "0" },
	{ "298", "Asia/Macau", "0", "0", "0" },
	{ "299", "Asia/Magadan", "0", "0", "0" },
	{ "300", "Asia/Makassar", "0", "0", "0" },
	{ "301", "Asia/Manila", "0", "0", "0" },
	{ "302", "Asia/Muscat", "0", "0", "0" },
	{ "303", "Asia/Nicosia", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "304", "Asia/Novokuznetsk", "0", "0", "0" },
	{ "305", "Asia/Novosibirsk", "0", "0", "0" },
	{ "306", "Asia/Omsk", "0", "0", "0" },
	{ "307", "Asia/Oral", "0", "0", "0" },
	{ "308", "Asia/Phnom_Penh", "0", "0", "0" },
	{ "309", "Asia/Pontianak", "0", "0", "0" },
	{ "310", "Asia/Pyongyang", "0", "0", "0" },
	{ "311", "Asia/Qatar", "0", "0", "0" },
	{ "312", "Asia/Qyzylorda", "0", "0", "0" },
	{ "313", "Asia/Rangoon", "0", "0", "0" },
	{ "314", "Asia/Riyadh", "0", "0", "0" },
	{ "315", "Asia/Saigon", "0", "0", "0" },
	{ "316", "Asia/Sakhalin", "0", "0", "0" },
	{ "317", "Asia/Samarkand", "0", "0", "0" },
	{ "318", "Asia/Seoul", "0", "0", "0" },
	{ "319", "Asia/Shanghai", "0", "0", "0" },
	{ "320", "Asia/Singapore", "0", "0", "0" },
	{ "321", "Asia/Srednekolymsk", "0", "0", "0" },
	{ "322", "Asia/Taipei", "0", "0", "0" },
	{ "323", "Asia/Tashkent", "0", "0", "0" },
	{ "324", "Asia/Tbilisi", "0", "0", "0" },
	{ "325", "Asia/Tehran", "60", "2017:3:4:3:1230", "2017:9:4:5:1170" },
	{ "326", "Asia/Tel_Aviv", "60", "2017:3:4:6:0", "2017:10:5:7:1380" },
	{ "327", "Asia/Thimbu", "0", "0", "0" },
	{ "328", "Asia/Thimphu", "0", "0", "0" },
	{ "329", "Asia/Tokyo", "0", "0", "0" },
	{ "330", "Asia/Tomsk", "0", "0", "0" },
	{ "331", "Asia/Ujung_Pandang", "0", "0", "0" },
	{ "332", "Asia/Ulaanbaatar", "0", "0", "0" },
--	{ "333", "Asia/Ulaanbaatar", "0", "2017:9:5:6:900", "2018:3:5:6:1080" },	dst_savings = 0??
	{ "334", "Asia/Ulan_Bator", "0", "0", "0" },
--	{ "335", "Asia/Ulan_Bator", "0", "2017:9:5:6:900", "2018:3:5:6:1080" },		dst_savings = 0??
	{ "336", "Asia/Urumqi", "0", "0", "0" },
	{ "337", "Asia/Ust-Nera", "0", "0", "0" },
	{ "338", "Asia/Vientiane", "0", "0", "0" },
	{ "339", "Asia/Vladivostok", "0", "0", "0" },
	{ "340", "Asia/Yakutsk", "0", "0", "0" },
	{ "341", "Asia/Yekaterinburg", "0", "0", "0" },
	{ "342", "Asia/Yerevan", "0", "0", "0" },
}

ATLANTIC_TBL = {
	{ "343", "Atlantic/Azores", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "344", "Atlantic/Bermuda", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "345", "Atlantic/Canary", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "346", "Atlantic/Cape_Verde", "0", "0", "0" },
	{ "347", "Atlantic/Faeroe", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "348", "Atlantic/Faroe", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "349", "Atlantic/Jan_Mayen", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "350", "Atlantic/Madeira", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "351", "Atlantic/Reykjavik", "0", "0", "0" },
	{ "352", "Atlantic/South_Georgia", "0", "0", "0" },
	{ "353", "Atlantic/St_Helena", "0", "0", "0" },
	{ "354", "Atlantic/Stanley", "0", "0", "0" },
}

AUSTRALIA_TBL = {
--	{ "355", "Australia/ACT", "0", "0", "0" },		use 356
	{ "356", "Australia/ACT", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
--	{ "357", "Australia/Adelaide", "0", "0", "0" },		use 358
	{ "358", "Australia/Adelaide", "60", "2017:9:5:7:990", "2018:3:5:7:990" },
	{ "359", "Australia/Brisbane", "0", "0", "0" },
--	{ "360", "Australia/Broken_Hill", "0", "0", "0" },		use 361
	{ "361", "Australia/Broken_Hill", "60", "2017:9:5:7:990", "2018:3:5:7:990" },
--	{ "362", "Australia/Canberra", "0", "0", "0" },			use 363
	{ "363", "Australia/Canberra", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
--	{ "364", "Australia/Currie", "0", "0", "0" },			use 365
	{ "365", "Australia/Currie", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
	{ "366", "Australia/Darwin", "0", "0", "0" },
	{ "367", "Australia/Eucla", "0", "0", "0" },
--	{ "368", "Australia/Hobart", "0", "0", "0" },		use 369
	{ "369", "Australia/Hobart", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
--	{ "370", "Australia/LHI", "0", "0", "0" },			use 371
	{ "371", "Australia/LHI", "30", "2017:9:5:7:930", "2018:3:5:7:900" },
	{ "372", "Australia/Lindeman", "0", "0", "0" },
--	{ "373", "Australia/Lord_Howe", "0", "0", "0" },		use 374
	{ "374", "Australia/Lord_Howe", "30", "2017:9:5:7:930", "2018:3:5:7:900" },
--	{ "375", "Australia/Melbourne", "0", "0", "0" },		use 376
	{ "376", "Australia/Melbourne", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
	{ "377", "Australia/North", "0", "0", "0" },
--	{ "378", "Australia/NSW", "0", "0", "0" },		use 379
	{ "379", "Australia/NSW", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
	{ "380", "Australia/Perth", "0", "0", "0" },
	{ "381", "Australia/Queensland", "0", "0", "0" },
--	{ "382", "Australia/South", "0", "0", "0" },	use 383
	{ "383", "Australia/South", "60", "2017:9:5:7:990", "2018:3:5:7:990" },
--	{ "384", "Australia/Sydney", "0", "0", "0" },	use 385
	{ "385", "Australia/Sydney", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
--	{ "386", "Australia/Tasmania", "0", "0", "0" },	use 387
	{ "387", "Australia/Tasmania", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
--	{ "388", "Australia/Victoria", "0", "0", "0" },	use 389
	{ "389", "Australia/Victoria", "60", "2017:9:5:7:960", "2018:3:5:7:960" },
	{ "390", "Australia/West", "0", "0", "0" },
--	{ "391", "Australia/Yancowinna", "0", "0", "0" },	use 392
	{ "392", "Australia/Yancowinna", "60", "2017:9:5:7:990", "2018:3:5:7:990" },
}

BRAZIL_TBL = {
	{ "393", "Brazil/Acre", "0", "0", "0" },
	{ "394", "Brazil/DeNoronha", "0", "0", "0" },
--	{ "395", "Brazil/East", "0", "0", "0" },		use 396
	{ "396", "Brazil/East", "60", "2017:10:3:1:180", "2018:2:3:1:120" },
	{ "397", "Brazil/West", "0", "0", "0" },
}

CANADA_TBL = {
	{ "398", "Canada/Atlantic", "60", "2017:3:2:1:360", "2017:11:1:1:300" },
	{ "399", "Canada/Central", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "400", "Canada/Eastern", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "401", "Canada/East-Saskatchewan", "0", "0", "0" },
	{ "402", "Canada/Mountain", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "403", "Canada/Newfoundland", "60", "2017:3:2:1:330", "2017:11:1:1:270" },
	{ "404", "Canada/Pacific", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "405", "Canada/Saskatchewan", "0", "0", "0" },
	{ "406", "Canada/Yukon", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
}

ETC_TBL = {
	{ "419", "Etc/GMT", "0", "0", "0" },
	{ "420", "Etc/GMT+0", "0", "0", "0" },
	{ "421", "Etc/GMT+1", "0", "0", "0" },
	{ "422", "Etc/GMT+10", "0", "0", "0" },
	{ "423", "Etc/GMT+11", "0", "0", "0" },
	{ "424", "Etc/GMT+12", "0", "0", "0" },
	{ "425", "Etc/GMT+2", "0", "0", "0" },
	{ "426", "Etc/GMT+3", "0", "0", "0" },
	{ "427", "Etc/GMT+4", "0", "0", "0" },
	{ "428", "Etc/GMT+5", "0", "0", "0" },
	{ "429", "Etc/GMT+6", "0", "0", "0" },
	{ "430", "Etc/GMT+7", "0", "0", "0" },
	{ "431", "Etc/GMT+8", "0", "0", "0" },
	{ "432", "Etc/GMT+9", "0", "0", "0" },
	{ "433", "Etc/GMT0", "0", "0", "0" },
	{ "434", "Etc/GMT-0", "0", "0", "0" },
	{ "435", "Etc/GMT-1", "0", "0", "0" },
	{ "436", "Etc/GMT-10", "0", "0", "0" },
	{ "437", "Etc/GMT-11", "0", "0", "0" },
	{ "438", "Etc/GMT-12", "0", "0", "0" },
	{ "439", "Etc/GMT-13", "0", "0", "0" },
	{ "440", "Etc/GMT-14", "0", "0", "0" },
	{ "441", "Etc/GMT-2", "0", "0", "0" },
	{ "442", "Etc/GMT-3", "0", "0", "0" },
	{ "443", "Etc/GMT-4", "0", "0", "0" },
	{ "444", "Etc/GMT-5", "0", "0", "0" },
	{ "445", "Etc/GMT-6", "0", "0", "0" },
	{ "446", "Etc/GMT-7", "0", "0", "0" },
	{ "447", "Etc/GMT-8", "0", "0", "0" },
	{ "448", "Etc/GMT-9", "0", "0", "0" },
	{ "449", "Etc/Greenwich", "0", "0", "0" },
	{ "450", "Etc/UCT", "0", "0", "0" },
	{ "451", "Etc/Universal", "0", "0", "0" },
	{ "452", "Etc/UTC", "0", "0", "0" },
	{ "453", "Etc/Zulu", "0", "0", "0" },
}

EUROPE_TBL = {
	{ "454", "Europe/Amsterdam", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "455", "Europe/Andorra", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "456", "Europe/Astrakhan", "0", "0", "0" },
	{ "457", "Europe/Athens", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "458", "Europe/Belfast", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "459", "Europe/Belgrade", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "460", "Europe/Berlin", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "461", "Europe/Bratislava", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "462", "Europe/Brussels", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "463", "Europe/Bucharest", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "464", "Europe/Budapest", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "465", "Europe/Busingen", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "466", "Europe/Chisinau", "60", "2017:3:4:1:0", "2017:10:5:1:0" },
	{ "467", "Europe/Copenhagen", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "468", "Europe/Dublin", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "469", "Europe/Gibraltar", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "470", "Europe/Guernsey", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "471", "Europe/Helsinki", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "472", "Europe/Isle_of_Man", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "473", "Europe/Istanbul", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "474", "Europe/Jersey", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "475", "Europe/Kaliningrad", "0", "0", "0" },
	{ "476", "Europe/Kiev", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "477", "Europe/Kirov", "0", "0", "0" },
	{ "478", "Europe/Lisbon", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "479", "Europe/Ljubljana", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "480", "Europe/London", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "481", "Europe/Luxembourg", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "482", "Europe/Madrid", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "483", "Europe/Malta", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "484", "Europe/Mariehamn", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "485", "Europe/Minsk", "0", "0", "0" },
	{ "486", "Europe/Monaco", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "487", "Europe/Moscow", "0", "0", "0" },
	{ "488", "Europe/Nicosia", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "489", "Europe/Oslo", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "490", "Europe/Paris", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "491", "Europe/Podgorica", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "492", "Europe/Prague", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "493", "Europe/Riga", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "494", "Europe/Rome", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "495", "Europe/Samara", "0", "0", "0" },
	{ "496", "Europe/San_Marino", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "497", "Europe/Sarajevo", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "498", "Europe/Simferopol", "0", "0", "0" },
	{ "499", "Europe/Skopje", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "500", "Europe/Sofia", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "501", "Europe/Stockholm", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "502", "Europe/Tallinn", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "503", "Europe/Tirane", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "504", "Europe/Tiraspol", "60", "2017:3:4:1:0", "2017:10:5:1:0" },
	{ "505", "Europe/Ulyanovsk", "0", "0", "0" },
	{ "506", "Europe/Uzhgorod", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "507", "Europe/Vaduz", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "508", "Europe/Vatican", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "509", "Europe/Vienna", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "510", "Europe/Vilnius", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "511", "Europe/Volgograd", "0", "0", "0" },
	{ "512", "Europe/Warsaw", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "513", "Europe/Zagreb", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "514", "Europe/Zaporozhye", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "515", "Europe/Zurich", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
}

INDIAN_TBL = {
	{ "526", "Indian/Antananarivo", "0", "0", "0" },
	{ "527", "Indian/Chagos", "0", "0", "0" },
	{ "528", "Indian/Christmas", "0", "0", "0" },
	{ "529", "Indian/Cocos", "0", "0", "0" },
	{ "530", "Indian/Comoro", "0", "0", "0" },
	{ "531", "Indian/Kerguelen", "0", "0", "0" },
	{ "532", "Indian/Mahe", "0", "0", "0" },
	{ "533", "Indian/Maldives", "0", "0", "0" },
	{ "534", "Indian/Mauritius", "0", "0", "0" },
	{ "535", "Indian/Mayotte", "0", "0", "0" },
	{ "536", "Indian/Reunion", "0", "0", "0" },
}

PACIFIC_TBL = {
--	{ "554", "Pacific/Apia", "0", "0", "0" },		use 555
	{ "555", "Pacific/Apia", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
--	{ "556", "Pacific/Auckland", "0", "0", "0" },		use 557
	{ "557", "Pacific/Auckland", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
	{ "558", "Pacific/Bougainville", "0", "0", "0" },
--	{ "559", "Pacific/Chatham", "0", "0", "0" },		use 560
	{ "560", "Pacific/Chatham", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
	{ "561", "Pacific/Chuuk", "0", "0", "0" },
--	{ "562", "Pacific/Easter", "0", "0", "0" },		use 563
	{ "563", "Pacific/Easter", "60", "2017:8:2:1:240", "2018:5:2:1:180" },
	{ "564", "Pacific/Efate", "0", "0", "0" },
	{ "565", "Pacific/Enderbury", "0", "0", "0" },
	{ "566", "Pacific/Fakaofo", "0", "0", "0" },
--	{ "567", "Pacific/Fiji", "0", "0", "0" },		use 568
	{ "568", "Pacific/Fiji", "60", "2017:11:1:7:840", "2018:1:3:7:840" },
	{ "569", "Pacific/Funafuti", "0", "0", "0" },
	{ "570", "Pacific/Galapagos", "0", "0", "0" },
	{ "571", "Pacific/Gambier", "0", "0", "0" },
	{ "572", "Pacific/Guadalcanal", "0", "0", "0" },
	{ "573", "Pacific/Guam", "0", "0", "0" },
	{ "574", "Pacific/Honolulu", "0", "0", "0" },
	{ "575", "Pacific/Johnston", "0", "0", "0" },
	{ "576", "Pacific/Kiritimati", "0", "0", "0" },
	{ "577", "Pacific/Kosrae", "0", "0", "0" },
	{ "578", "Pacific/Kwajalein", "0", "0", "0" },
	{ "579", "Pacific/Majuro", "0", "0", "0" },
	{ "580", "Pacific/Marquesas", "0", "0", "0" },
	{ "581", "Pacific/Midway", "0", "0", "0" },
	{ "582", "Pacific/Nauru", "0", "0", "0" },
	{ "583", "Pacific/Niue", "0", "0", "0" },
	{ "584", "Pacific/Norfolk", "0", "0", "0" },
	{ "585", "Pacific/Noumea", "0", "0", "0" },
	{ "586", "Pacific/Pago_Pago", "0", "0", "0" },
	{ "587", "Pacific/Palau", "0", "0", "0" },
	{ "588", "Pacific/Pitcairn", "0", "0", "0" },
	{ "589", "Pacific/Pohnpei", "0", "0", "0" },
	{ "590", "Pacific/Ponape", "0", "0", "0" },
	{ "591", "Pacific/Port_Moresby", "0", "0", "0" },
	{ "592", "Pacific/Rarotonga", "0", "0", "0" },
	{ "593", "Pacific/Saipan", "0", "0", "0" },
	{ "594", "Pacific/Samoa", "0", "0", "0" },
	{ "595", "Pacific/Tahiti", "0", "0", "0" },
	{ "596", "Pacific/Tarawa", "0", "0", "0" },
	{ "597", "Pacific/Tongatapu", "0", "0", "0" },
	{ "598", "Pacific/Truk", "0", "0", "0" },
	{ "599", "Pacific/Wake", "0", "0", "0" },
	{ "600", "Pacific/Wallis", "0", "0", "0" },
	{ "601", "Pacific/Yap", "0", "0", "0" },
}

US_TBL = {
	{ "612", "US/Alaska", "60", "2017:3:2:1:660", "2017:11:1:1:600" },
	{ "613", "US/Aleutian", "60", "2017:3:2:1:720", "2017:11:1:1:660" },
	{ "614", "US/Arizona", "0", "0", "0" },
	{ "615", "US/Central", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "616", "US/Eastern", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "617", "US/East-Indiana", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "618", "US/Hawaii", "0", "0", "0" },
	{ "619", "US/Indiana-Starke", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "620", "US/Michigan", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "621", "US/Mountain", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "622", "US/Pacific", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "623", "US/Pacific-New", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "624", "US/Samoa", "0", "0", "0" },
}

OTHER_TBL = {
	{ "243", "Arctic/Longyearbyen", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "407", "CET", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
--	{ "408", "Chile/Continental", "0", "0", "0" },		use 409
	{ "409", "Chile/Continental", "60", "2017:8:2:1:240", "2018:5:2:1:180" },
--	{ "410", "Chile/EasterIsland", "0", "0", "0" },		use 411
	{ "411", "Chile/EasterIsland", "60", "2017:8:2:1:240", "2018:5:2:1:180" },
	{ "412", "CST6CDT", "60", "2017:3:2:1:480", "2017:11:1:1:420" },
	{ "413", "Cuba", "60", "2017:3:2:1:300", "2017:11:1:1:300" },
	{ "414", "EET", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "415", "Egypt", "0", "0", "0" },
	{ "416", "Eire", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "417", "EST", "0", "0", "0" },
	{ "418", "EST5EDT", "60", "2017:3:2:1:420", "2017:11:1:1:360" },
	{ "516", "GB", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "517", "GB-Eire", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "518", "GMT", "0", "0", "0" },
	{ "519", "GMT+0", "0", "0", "0" },
	{ "520", "GMT0", "0", "0", "0" },
	{ "521", "GMT-0", "0", "0", "0" },
	{ "522", "Greenwich", "0", "0", "0" },
	{ "523", "Hongkong", "0", "0", "0" },
	{ "524", "HST", "0", "0", "0" },
	{ "525", "Iceland", "0", "0", "0" },
	{ "537", "Iran", "60", "2017:3:4:3:1230", "2017:9:4:5:1170" },
	{ "538", "Israel", "60", "2017:3:4:6:0", "2017:10:5:7:1380" },
	{ "539", "Jamaica", "0", "0", "0" },
	{ "540", "Japan", "0", "0", "0" },
	{ "541", "Kwajalein", "0", "0", "0" },
	{ "542", "Libya", "0", "0", "0" },
	{ "543", "MET", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "544", "Mexico/BajaNorte", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "545", "Mexico/BajaSur", "60", "2017:4:1:1:540", "2017:10:5:1:480" },
	{ "546", "Mexico/General", "60", "2017:4:1:1:480", "2017:10:5:1:420" },
	{ "547", "MST", "0", "0", "0" },
	{ "548", "MST7MDT", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
	{ "549", "Navajo", "60", "2017:3:2:1:540", "2017:11:1:1:480" },
--	{ "550", "NZ", "0", "0", "0" },		use 551
	{ "551", "NZ", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
--	{ "552", "NZ-CHAT", "0", "0", "0" },		use 553
	{ "553", "NZ-CHAT", "60", "2017:9:4:7:840", "2018:3:5:7:840" },
	{ "602", "Poland", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "603", "Portugal", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "604", "PRC", "0", "0", "0" },
	{ "605", "PST8PDT", "60", "2017:3:2:1:600", "2017:11:1:1:540" },
	{ "606", "ROC", "0", "0", "0" },
	{ "607", "ROK", "0", "0", "0" },
	{ "608", "Singapore", "0", "0", "0" },
	{ "609", "Turkey", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "610", "UCT", "0", "0", "0" },
	{ "611", "Universal", "0", "0", "0" },
	{ "625", "UTC", "0", "0", "0" },
	{ "626", "WET", "60", "2017:3:4:1:60", "2017:10:5:1:60" },
	{ "627", "W-SU", "0", "0", "0" },
	{ "628", "Zulu", "0", "0", "0" },
}

ZONE_TBL = {
	{"Africa", AFRICA_TBL},
	{"America", AMERICA_TBL},
	{"Antarctica", ANTARCICA_TBL},
	{"Asia", ASIA_TBL},
	{"Atlantic", ATLANTIC_TBL},
	{"Australia", AUSTRALIA_TBL},
	{"Brazil", BRAZIL_TBL},
	{"Canada", CANADA_TBL},
	{"Etc", ETC_TBL},
	{"Europe", EUROPE_TBL},
	{"Indian", INDIAN_TBL},
	{"Pacific", PACIFIC_TBL},
	{"US", US_TBL},
}

--[[
	tbl					zone
	AFRICA_TBL			Africa/*
	AMERICA_TBL			America/*
	ANTARCICA_TBL		Antarctica/*
	ASIA_TBL			Asia/*
	ATLANTIC_TBL		Atlantic/*
	AUSTRALIA_TBL		Australia/*
	BRAZIL_TBL			Brazil/*
	CANADA_TBL			Canada/*
	ETC_TBL				Etc/*
	EUROPE_TBL			Europe/*
	INDIAN_TBL			Indian/*
	PACIFIC_TBL			Pacific/*
	US_TBL				US/*
	OTHER_TBL			other zoneId...
]]
function getDstRule(zoneId)

	-- handle nil zoneId
	if not zoneId then
		zoneId = "Etc/GMT+0"
	end

	local zone = zoneId:match("(%a+)/") or zoneId
	local tbl
	local ret = {}

	for k, v in ipairs(ZONE_TBL) do
		if zone == v[1] then
			tbl = v[2]
			break
		end
	end

	if not tbl then
		tbl = OTHER_TBL
	end

	for k, v in ipairs(tbl) do
		-- If startDST == 0, just return a null table
		if zoneId == v[2] and tonumber(v[4]) ~= 0 then
			ret[1] = {}
			ret[1].startDST = v[4]
			ret[1].endDST = v[5]
			ret[1].dstSavings = v[3]
			break
		end
	end

	return ret
end
