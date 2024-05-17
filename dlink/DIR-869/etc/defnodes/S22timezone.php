<? /* vi: set sw=4 ts=4: */
set("/runtime/services/timezone/valid", "1");

function add_timezone($name, $gen, $dst, $uid, $olson)
{
	$root = "/runtime/services/timezone/zone";
	add($root, "");
	$index = query($root."#");
	anchor($root.":".$index);
	set("name", $name);
	set("gen", $gen);
	set("dst", $dst);
	set("uid", $uid);
	set("olson", $olson);
}

function get_timezone_zoneindex($uid)
{
	foreach("/runtime/services/timezone/zone")
	{
		$zone_uid = query("uid");
		if ($zone_uid == $uid)
			return $InDeX;
	}
}

$USA="M4.1.0/02:00:00,M10.5.0/02:00:00";
add_timezone( "(GMT-12:00) International Date Line West", "GMT+12:00", "", 1, "");
add_timezone( "(GMT-11:00) Midway Island", "GMT+11:00", "", 2, "Pacific/Midway");
add_timezone( "(GMT-10:00) Hawaii", "GMT+10:00", "", 3, "US/Hawaii");
add_timezone( "(GMT-09:00) Alaska", "GMT+09:00", "GDT,".$USA, 4, "US/Alaska");
add_timezone( "(GMT-08:00) Pacific Time (US & Canada, Tijuana", "PST+08:00", "PDT,".$USA, 5, "Canada/Pacific");
add_timezone( "(GMT-07:00) Arizona", "GMT+07:00", "", 6, "US/Arizona");
add_timezone( "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "GMT+07:00", "GDT,".$USA, 7, "America/Chihuahua");
add_timezone( "(GMT-07:00) Mountain Time (US & Canada)", "GMT+07:00", "GDT,".$USA, 8, "Canada/Mountain");
add_timezone( "(GMT-06:00) Central America", "GMT+06:00", "", 9, "America/Belize");
add_timezone( "(GMT-06:00) Central Time (US & Canada)", "GMT+06:00", "GDT,".$USA, 10, "Canada/Central");
add_timezone( "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "GMT+06:00", "GDT,".$USA, 11, "America/Mexico_City");
add_timezone( "(GMT-06:00) Saskatchewan", "GMT+06:00", "", 12, "Canada/East-Saskatchewan");
add_timezone( "(GMT-05:00) Bogota, Lima, Quito,Indiana (East)", "GMT+05:00", "", 13, "America/Bogota");
add_timezone( "(GMT-05:00) Eastern Time (US & Canada)", "EST+05:00", "EDT,".$USA, 14, "Canada/Eastern");
add_timezone( "(GMT-04:30) Caracas", "GMT+04:30", "", 15, "America/Caracas");
add_timezone( "(GMT-04:00) Georgetown, La Paz", "GMT+04:00", "", 16, "America/Manaus");
add_timezone( "(GMT-04:00) Atlantic Time (Canada)", "GMT+04:00", "GDT,".$USA, 17, "Atlantic/Bermuda");
add_timezone( "(GMT-03:00) Santiago", "GMT+03:00", "GDT,M10.2.6/00:00:00,M3.2.6/00:00:00", 18, "America/Santiago");
add_timezone( "(GMT-03:30) Newfoundland", "GMT+03:30", "GDT,M4.1.0/02:00:00,M10.5.0/02:00:00", 19, "Canada/Newfoundland");
add_timezone( "(GMT-03:00) Brasilia", "GMT+03:00", "GDT,M11.1.0/00:00:00,M2.5.0/00:00:00", 20, "America/Sao_Paulo");
add_timezone( "(GMT-03:00) Buenos Aires", "GMT+03:00", "", 21, "America/Argentina/Buenos_Aires");
add_timezone( "(GMT-03:00) Greenland", "GMT+03:00", "GDT,".$USA, 22, "America/Godthab");
add_timezone( "(GMT-02:00) Mid-Atlantic", "GMT+02:00", "GDT,M3.5.0/02:00:00,M9.5.0/02:00:00", 23, "America/Noronha");
add_timezone( "(GMT-01:00) Azores", "GMT+01:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 24, "Atlantic/Azores");
add_timezone( "(GMT-01:00) Cape Verde Is.", "GMT+01:00", "", 25, "Atlantic/Cape_Verde");
add_timezone( "(GMT) Casablanca, Monrovia", "GMT+00:00", "", 26, "Africa/Casablanca");
add_timezone( "(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "GMT+00:00", "GDT,M3.5.0/01:00:00,M10.5.0/02:00:00", 27, "Etc/Greenwich");
add_timezone( "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "GMT-01:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 28, "Europe/Amsterdam");
add_timezone( "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "GMT-01:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 29, "Europe/Belgrade");
add_timezone( "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "GMT-01:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 30, "Europe/Brussels");
add_timezone( "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "GMT-01:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 31, "Europe/Sarajevo");
add_timezone( "(GMT+01:00) West Central Africa", "GMT-01:00", "", 32, "Africa/Brazzaville");
add_timezone( "(GMT+02:00) Athens, Istanbul, Minsk", "GMT-02:00", "GDT,M3.5.0/03:00:00,M10.5.0/04:00:00", 33, "Europe/Athens");
add_timezone( "(GMT+02:00) Bucharest", "GMT-02:00", "GDT,M3.5.0/03:00:00,M10.5.0/04:00:00", 34, "Europe/Bucharest");
add_timezone( "(GMT+02:00) Cairo", "GMT-02:00", "GDT,M4.5.5/00:00:00,M9.5.4/00:00:00", 35, "Africa/Cairo");
add_timezone( "(GMT+02:00) Harare, Pretoria", "GMT-02:00", "", 36, "Africa/Harare");
add_timezone( "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "GMT-02:00", "GDT,M3.5.0/03:00:00,M10.5.0/04:00:00", 37, "Europe/Helsinki");
add_timezone( "(GMT+02:00) Jerusalem", "GMT-02:00", "GDT,M4.5.0/00:00:00,M10.5.0/01:00:00", 38, "Asia/Jerusalem");
add_timezone( "(GMT+03:00) Baghdad", "GMT-03:00", "", 39, "Asia/Baghdad");
add_timezone( "(GMT+03:00) Kuwait, Riyadh", "GMT-03:00", "", 40, "Asia/Kuwait");
add_timezone( "(GMT+03:00) Nairobi", "GMT-03:00", "", 41, "Africa/Nairobi");
add_timezone( "(GMT+03:30) Tehran", "GMT-03:30", "GDT,M3.4.1/02:30:00,M10.4.3/03:30:00", 42, "Asia/Tehran");
add_timezone( "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "GMT-05:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 45, "Europe/Moscow");
add_timezone( "(GMT+04:00) Abu Dhabi, Muscat", "GMT-04:00", "", 43, "Asia/Muscat");
add_timezone( "(GMT+04:00) Baku, Tbilisi, Yerevan", "GMT-04:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 44, "Asia/Baku");
add_timezone( "(GMT+04:30) Kabul", "GMT-04:30", "", 46, "Asia/Kabul");
add_timezone( "(GMT+05:00) Islamabad, Karachi, Tashkent", "GMT-05:00", "", 47, "Asia/Karachi");
add_timezone( "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "GMT-05:30", "", 48, "Asia/Kolkata");
add_timezone( "(GMT+05:30) Sri Jayawardenepura", "GMT-05:30", "", 49, "Asia/Colombo");
add_timezone( "(GMT+05:45) Kathmandu", "GMT-05:45", "", 50, "Asia/Kathmandu");
add_timezone( "(GMT+06:00) Astana, Dhaka", "GMT-06:00", "", 51, "Asia/Dhaka");
add_timezone( "(GMT+05:00) Ekaterinburg", "GMT-05:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 52, "Asia/Yekaterinburg");
add_timezone( "(GMT+06:30) Rangoon", "GMT-06:30", "", 53, "Asia/Rangoon");
add_timezone( "(GMT+06:00) Almaty, Novosibirsk", "GMT-06:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 54, "Asia/Almaty");
add_timezone( "(GMT+07:00) Bangkok, Hanoi, Jakarta", "GMT-07:00", "", 55, "Asia/Bangkok");
add_timezone( "(GMT+07:00) Krasnoyarsk", "GMT-07:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 56, "Asia/Krasnoyarsk");
add_timezone( "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "CST-08:00", "", 57, "Asia/Hong_Kong");
add_timezone( "(GMT+08:00) Kuala Lumpur, Singapore", "GMT-08:00", "", 58, "Asia/Kuala_Lumpur");
add_timezone( "(GMT+08:00) Perth", "GMT-08:00", "GDT,M10.5.0/02:00:00,M3.5.0/03:00:00", 59, "Australia/Perth");
add_timezone( "(GMT+08:00) Taipei", "GMT-08:00", "", 60, "Asia/Taipei");
add_timezone( "(GMT+08:00) Ulaan Bataar", "GMT-08:00", "", 61, "Asia/Ulaanbaatar");
add_timezone( "(GMT+08:00) Irkutsk", "GMT-08:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 62, "Asia/Irkutsk");
add_timezone( "(GMT+09:00) Osaka, Sapporo, Tokyo", "GMT-09:00", "", 63, "Asia/Tokyo");
add_timezone( "(GMT+09:00) Seoul", "GMT-09:00", "", 64, "Asia/Seoul");
add_timezone( "(GMT+09:30) Adelaide", "GMT-09:30", "GDT,M10.5.0/02:00:00,M3.5.0/03:00:00", 65, "Australia/Adelaide");
add_timezone( "(GMT+09:30) Darwin", "GMT-09:30", "", 66, "Australia/Darwin");
add_timezone( "(GMT+10:00) Brisbane", "GMT-10:00", "", 67, "Australia/Brisbane");
add_timezone( "(GMT+10:00) Canberra, Melbourne, Sydney", "GMT-10:00", "GDT,M10.5.0/02:00:00,M3.5.0/03:00:00", 68, "Australia/Canberra");
add_timezone( "(GMT+10:00) Guam, Port Moresby", "GMT-10:00", "", 69, "Pacific/Guam");
add_timezone( "(GMT+10:00) Hobart", "GMT-10:00", "GDT,M10.1.0/02:00:00,M3.5.0/03:00:00", 70, "Australia/Hobart");
add_timezone( "(GMT+09:00) Yakutsk", "GMT-9:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 71, "Asia/Yakutsk");
add_timezone( "(GMT+11:00) Solomon Is., New Caledonia", "GMT-11:00", "", 72, "");
add_timezone( "(GMT+10:00) Vladivostok", "GMT-10:00", "GDT,M3.5.0/02:00:00,M10.5.0/03:00:00", 73, "Asia/Vladivostok");
add_timezone( "(GMT+10:00) Magadan", "GMT-10:00", "", 74, "Asia/Magadan");
add_timezone( "(GMT+12:00) Auckland, Wellington", "GMT-12:00", "GDT,M10.1.0/02:00:00,M3.5.0/03:00:00", 75, "Pacific/Auckland");
add_timezone( "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "GMT-12:00", "", 76, "Pacific/Fiji");
add_timezone( "(GMT+13:00) Nuku'alofa", "GMT-13:00", "", 77, "Pacific/Tongatapu");
add_timezone( "(GMT+13:00) Samoa", "GMT-13:00", "", 78, "");

/* Create /etc/TZ */
$index = query("/device/time/timezone");
if ($index=="" || $index==0) $index=61;
$zone_idx = get_timezone_zoneindex($index);
anchor("/runtime/services/timezone/zone:".$zone_idx);

$TZ = get("s","gen");
if (query("/device/time/dst")=="1") $TZ = $TZ.get("s","dst");
fwrite("w", "/etc/TZ", $TZ."\n");

/* Initialize the date to 2000/1/1. */
set("/runtime/device/date", "01/01/2000");
?>
