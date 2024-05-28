(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			FORGET_PASSWORD: 			"Quên mật mã?",
			LOGIN: 						"Đăng nhập",
			IMPORTANT_UPDATE_INFO: 		"Để tránh xung đột với thiết bị đầu cuối, địa chỉ IP router của bạn đã được cập nhật thành",
			CONTINUE: 					"Tiếp tục",

			IMPORTANT_NOTICE: 			"Lưu ý quan trọng",
			OR: 						", bạn có chắc chắn muốn tiếp tục đến",
			END: 						".",
			END2: 						"?",

			FORGET_PASSWORD_INFO_0: 	"Nhấn và giữ nút Reset trong 10 giây để khôi phục router về cài đặt mặc định",
			FORGET_PASSWORD_INFO_1: 	"Nếu chức năng Khôi phục mật mã đã được kích hoạt. Một mã xác minh sẽ được gửi đến địa chỉ email được chỉ định để cài đặt lại tên đăng nhập và mật mã",
			FORGET_PASSWORD_SEND_FAILED:"Gửi mã thất bại! Vui lòng kiểm tra kết nối Internet của bạn.",

			VERIFICATION_CODE: 			"Mã xác nhận",

			RECEIVE_CODE: 				"Gửi mã",

			CONFIRM: 					"Xác nhận",

			SEC: 						" ",

			USER_CONFLICT: 				"Xung đột đăng nhập!",
			FIRST_TIME: 				"Chào mừng đến với Archer AD7200, thiết kế bởi TP-LINK tại Trung Quốc. Để bắt đầu, tạo một mật mã mới để quản lý thiết bị.",
			
			USER_CONFLICT_INFO: 		"Người dùng %USER% với máy chủ %HOST% (%IP%/%MAC%) hiện đang đăng nhập vào Router. Bạn không thể đăng nhập cùng lúc. Vui lòng thử lại sau",
			USER_CONFLICT_INFO_1: 		"Người dùng %USER% (%MAC%) đang đăng nhập vào router. Bạn không thể đăng nhập cùng lúc. Vui lòng thử lại sau.",
			USER_CONFLICT_INFO_2: 		"Người dùng %USER% (%IP%) hiện đang đăng nhập vào Router. Bạn không thể đăng nhập cùng lúc. Vui lòng thử lại sau",
			
			LOGIN_FAILED: 				"Đăng nhập thất bại!",
			LOGIN_FAILED_COUNT: 		"Đăng nhập thất bại lần thứ %num1 , bạn vẫn còn  %num2 lần thử nữa.",
			NO_COOKIE: 					"Cần kích hoạt Cookies để đăng nhập. Vui lòng kích hoạt Cookies hoặc tắt chế độ duyệt Ẩn danh/Riêng tư.", 

			FORGET_PASSWORD_NOTE: 		"Nếu bạn chưa cấu hình chức năng Khôi phục mật mã. Bạn có thể nhấn và giữ nút Reset trong 10 giây để khôi phục Router về cài đặt mặc định."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Nâng câp ngay",
			REMIND: 						"Nhắc tôi sau",
			NOTICE:    						"Xin chào, đã có một firmware mới cho router %PRODUCT%.",
			NEVER: 							"Ignore this version"
			
		},

		WAN_ERROR: {
			TITLE: 							"Lỗi kết nối WAN!",
			STATUS: 						"Trạng thái",
			INFO: 							"Thông tin",
			SETUP: 							"Thiết lập một kết nối Internet",
			NEVER: 							"Không nhắc tôi nữa"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Phiên bản Firmware",
			HARDWARE_VERSION: 				"Phiên bản phần cứng",
			HELP_SUPPORT: 					"Hỗ trợ",
			FAQ: 							"Các câu hỏi thường gặp",
			CONFIRM_REBOOT: 				"Bạn chắc chắn muốn khởi động lại router?",
			CONFIRM_LOGOUT: 				"Bạn chắc chắn muốn đăng xuất?",
			UPGRADE_ALERT_1: 				"Firmware hiện tại không hỗ trợ dịch vụ cloud của TP-LINK. Chúng tôi khuyến nghị bạn tải về firmware mới nhất tại www.tp-link.com và nâng cấp.",
			UPGRADE_ALERT_2: 				"Firmware hiện tại không hỗ trợ dịch vụ cloud của TP-LINK. Chúng tôi khuyến nghị bạn nâng cấp firmware bằng cách nhấn biểu tượng Nâng cấp ở góc trên bên phải.",
			REBOOTING: 						"Đang khởi động lại... <br/>Vui lòng không thực hiện hành động khác trong quá trình khởi động lại.",

			MODE_SWITCH: 					"Chuyển chế độ",
			ACCESS_POINT: 					"Điểm truy cập",
			ACCESS_POINT_TIPS: 				"Chuyển đổi mạng dây sang không dây",
			ROUTER: 						"Router",
			ROUTER_TIPS: 					"Cho phép nhiều thiết bị kết nối có dây hoặc không dây",
			REPEATER: 						"Lặp sóng",
			REPEATER_TIPS: 					"Mở rộng vùng phủ sóng mạng không dây của bạn",
			MODE_REBOOT_TIP: 				"Thay đổi chế độ sẽ khởi động lại thiết bị này, bạn chắc chắn muốn tiếp tục?",
			MODE_FAIL_TIP: 					"Thay đổi chế độ thất bại. Vui lòng thử lại sau hoặc khởi động lại router của bạn."
		},

		NAV: {
			QUICK_SETUP: 				"Cài đặt nhanh",
			BASIC: 						"Cơ bản",
			ADVANCED: 					"Nâng cao"
		},

		CONTROL: {
			MODE: 						"Chế độ",
			LOGIN: 						"Đăng nhập",
			LED:                        "Đèn LED",
			LED_ON:                     "Đèn LED sáng",
			LED_OFF:                    "Đèn LED tắt",			
			LED_DISABLED:               "Trạng thái đèn LED không thể thay đổi trong khoảng thời gian chế độ ban đêm",			
			LOGOUT: 					"Đăng xuất",
			UPDATE: 					"Nâng cấp",
			REBOOT: 					"Khởi động lại"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algeria",
			AMERICAN_SAMOA: 			"American Samoa",
			ARGENTINA: 					"Argentina",
			ARMENIA: 					"Armenia",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australia",
			AUSTRIA: 					"Austria",
			AZERBAIJAN: 				"Azerbaijan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahrain",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Belarus",
			BELGIUM: 					"Belgium",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Berumuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnia and Herzegowina",
			BRAZIL: 					"Brazil",
			BRUNEI_DARUSSALAM: 			"Brunei Darussalam",
			BULGARIA: 					"Bulgaria",
			CAMBODIA: 					"Cambodia",
			CANADA: 					"Canada",
			CAYMAN_ISLANDS: 			"Cayman Islands",
			CHILE: 						"Chile",
			CHINA: 						"People's Republic of China",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Croatia",
			CYPRUS: 					"Cyprus",
			CZECH_REPUBLIC: 			"Czech Republic",
			DENMARK: 					"Denmark",
			DOMINICAN_REPUBLIC: 		"Dominican Republic",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egypt",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estonia",
			ETHIOPIA: 					"Ethiopia",
			FAEROE_ISLANDS: 			"Faeroe Islands",
			FINLAND: 					"Finland",
			FRANCE: 					"France",
			FRENCH_GUIANA: 				"French Guiana",
			FRENCH_POLYNESIA: 			"French Polynesia",
			GEORGIA: 					"Georgia",
			GERMANY: 					"Germany",
			GREECE: 					"Greece",
			GREENLAND: 					"Greenland",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong S.A.R., P.R.C.",
			HUNGARY: 					"Hungary",
			ICELAND: 					"Iceland",
			INDIA: 						"India",
			INDONESIA: 					"Indonesia",
			IRAN: 						"Iran",
			IRAQ: 						"Iraq",
			IRELAND: 					"Ireland",
			ISRAEL: 					"Israel",
			ITALY: 						"Italy",
			JAMAICA: 					"Jamaica",

			JAPAN: 						"Japan",
			JAPAN_1: 					"Japan 1",
			JAPAN_2: 					"Japan 2",
			JAPAN_3: 					"Japan 3",
			JAPAN_4: 					"Japan 4",
			JAPAN_5: 					"Japan 5",
			JAPAN_6: 					"Japan 6",

			JORDAN: 					"Jordan",
			KAZAKHSTAN: 				"Kazakhstan",
			KENYA: 						"Kenya",

			NORTH_KOREA: 				"North Korea",
			KOREA_REPUBLIC: 			"Korea Republic",
			KOREA_REPUBLIC_3: 			"Korea Republic 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Latvia",
			LEBANON: 					"Lebanon",
			LIBYA: 						"Libya",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Lithuania",
			LUXEMBOURG: 				"Luxembourg",
			MACAU: 						"Macau SAR",
			MACEDONIA: 					"the Former Yugoslav Republic of Macedonia",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malaysia",
			MALDIVES: 					"Maldives",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexico",
			MONACO: 					"Principality of Monaco",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Morocco",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Netherlands",
			NETHERLANDS_ANTILLES: 		"Netherlands-Antilles",
			
			NEW_ZEALAND: 				"New Zealand",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norway",
			NORTHERN_MARIANA_ISLANDS: 	"Northern Mariana Islands",
			OMAN: 						"Oman",
			PAKISTAN: 					"Islamic Republic of Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua New Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Republic of the Philippines",
			POLAND: 					"Poland",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Romania",
			RUSSIA: 					"Russia",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Saudi Arabia",
			SINGAPORE: 					"Singapore",
			SLOVAK_REPUBLIC: 			"Slovak Republic",
			SLOVENIA: 					"Slovenia",
			SOUTH_AFRICA: 				"South Africa",
			SPAIN: 						"Spain",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Suriname",
			SWEDEN: 					"Sweden",
			SWITZERLAND: 				"Switzerland",
			SYRIA: 						"Syria",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Thailand",
			TRINIDAD_TOBAGO: 			"Trinidad y Tobago",
			TUNISIA: 					"Tunisia",
			TURKEY: 					"Turkey",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraine",
			UNITED_ARAB_EMIRATES: 		"United Arab Emirates",
			UNITED_KINGDOM: 			"United Kingdom",
			UNITED_STATES: 				"United States",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Uzbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Việt Nam",
			VIRGIN_ISLANDS: 			"Virgin Islands(U.S.)",
			YEMEN: 						"Yemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway Island,Samoa",
			HAWAII: 					"(GMT-10:00) Hawaii",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Pacific Time",
			MOUNTAIN_TIME: 				"(GMT-07:00) Mountain Time (US Canada)",
			CENTRAL_TIME: 				"(GMT-06:00) Central Time (US Canada)",
			EASTERN_TIME: 				"(GMT-05:00) Eastern Time (US Canada)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Atlantic Time (Canada)",
			NEWFOUNDLAND: 				"(GMT-03:30) Newfoundland",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Mid-Atlantic",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azores, Cape Verde Is",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich Mean Time, Dublin, London",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlin, Stockholm, Rome, Bern, Brussels",
			ATHENS_HELSINKI: 			"(GMT+02:00) Athens, Helsinki, Eastern Europe, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Baghdad, Kuwait, Nairobi, Riyadh, Moscow",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Calcutta, Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hà Nội",
			BEIJING_HONGKONG: 			"(GMT+08:00) Beijing, Hong Kong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seoul, Yakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomon Is., New Caledonia",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Ứng dụng",
			GAME:						"Trò chơi",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"Line",
			Skype:                      "Skype",
			PPStream: 					"PPStream",
			SIP:  						"SIP",
			PPTC: 						"PPTC", 
			H323: 						"H323",
			HTTPFD: 					"HTTPFD",
			PPTP: 						"PPTP",
			L2TP:  						"L2TP",
			IPSec:                      "IPSec",
			IMAP: 						"IMAP",
			xl_others:  				"xl_khác",
			Vonage:  					"Vonage",
			netTalk:  					"netTalk",
			iTalkBB: 					"iTalkBB",
			HTTP: 						"HTTP",
			MMS:  						"MMS",
			RTSP:                       "RTSP",
			WOW:						"wow",
			LOL:						"lol",
			SSH:						"SSH",
			TELNET:						"telnet",
			VPN:						"vpn",
			FTP:						"ftp",
			WWW:						"www",
			DNS:						"dns",
			ICMP:						"icmp",
			SMTP:						"smtp",
			NNTP:						"nntp",
			POP3:						"pop3",
			HTTPS:  					"https",


			END:						""
		},

		DATE: {
			DAY: 						"Ngày",

			MONDAY: 					"Thứ hai",
			TUESDAY: 					"Thứ ba",
			WEDNESDAY: 					"Thứ tư",
			THURSDAY: 					"Thứ năm",
			FRIDAY: 					"Thứ sáu",
			SATURDAY: 					"Thứ bảy",
			SUNDAY: 					"Chủ Nhật",
			
			MON: 						"T2.",
			TUES: 						"T3.",
			WED: 						"T4.",
			THUR: 						"T5.",
			FRI: 						"T6.",
			SAT: 						"T7.",
			SUN: 						"CN.",

			JAN: 						"Th1.",
			FEB: 						"Th2.",
			MAR: 						"Th3.",
			APR: 						"Th4.",
			MAY: 						"Th5.",
			JUN: 						"Th6.",
			JUL: 						"Th7.",
			AUG: 						"Th8.",
			SEP: 						"Th9.",
			OCT: 						"Th10.",
			NOV: 						"Th11.",
			DEC: 						"Th12."

		},

		HOUR: {
			AM_1: 						"1 SA",
			AM_2: 						"2 SA",
			AM_3: 						"3 SA",
			AM_4: 						"4 SA",
			AM_5: 						"5 SA",
			AM_6: 						"6 SA",
			AM_7: 						"7 SA",
			AM_8: 						"8 SA",
			AM_9: 						"9 SA",
			AM_10: 						"10 SA",
			AM_11: 						"11 TR",
			AM_12: 						"12 TR",
			PM_1: 						"1 TR",
			PM_2: 						"2 TR",
			PM_3: 						"3 CH",
			PM_4: 						"4 CH",
			PM_5: 						"5 CH",
			PM_6: 						"6 CH",
			PM_7: 						"7 TO",
			PM_8: 						"8 TO",
			PM_9: 						"9 TO",
			PM_10: 						"10 TO",
			PM_11: 						"11 TO",
			PM_12: 						"12 TO"
		},

		ORDER: {
			"1ST": 						"Đầu tiên",
			"2ND": 						"Thứ hai",
			"3RD": 						"Thứ ba",
			"4TH": 						"Thứ tư",
			"5TH": 						"Cuối cùng",
			"1ST_": 					"Thứ nhất",

			TH: 						"th"
		},

		GRID: {
			CLIENT_NUMBER: 				"Số lượng máy khách",

			ID: 						"STT",
			MODIFY: 					"Tùy chỉnh",
			STATUS: 					"Trạng thái",
			ENABLE: 					"Kích hoạt",

			OPERATION: 					"Hoạt động",
			CHOOSE: 					"Chọn",
			DESCRIPTION: 				"Mô tả",
			

			AUTO_REFRESH: 				"Làm mới tự động",
			REFRESH: 					"Làm mới",
			NUMBER: 					"Số",
			ENABLED: 					"Đã kích hoạt",
			DISABLED: 					"Đã vô hiệu hóa",
			ACTIVE: 					"Kích hoạt",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Thêm",
			CHOOSE: 					"Chọn",
			EDIT: 						"Sửa",
			DELETE: 					"Xóa",
			DELETE_ALL: 				"Xóa tất cả",
			REMOVE: 					"Gỡ",
			RESET: 						"Thiết lập lại",
			RESET_ALL: 					"Thiết lập lại tất cả",
			DETECT: 					"Phát hiện",
			ENABLE: 					"Kích hoạt",
			DISABLE: 					"Vô hiệu hóa",
			PAUSE:						"Tạm dừng",
			RESUME:						"Tiếp tục",
			
			REFRESH: 					"Làm mới",
			SEARCH: 					"Tìm kiếm…",
			BROWSE: 					"Duyệt",

			SAVE: 						"Lưu",
			BACK: 						"Quay lại",

			PREV: 						"Trước",
			NEXT: 						"Tiếp",
			FINISH: 					"Hoàn tất",
			
			ON: 						"Mở",
			OFF: 						"Tắt",
			LOW: 						"Thấp",
			MIDDLE: 					"Trung bình",
			HIGH: 						"Cao",
			
			OK: 						"OK",
			CANCEL: 					"Hủy",

			YES: 						"Có",
			NO: 						"Không",
			
			CONNECTED: 					"Đã kết nối",
			CONNECTING: 				"Đang kết nối",
			DISCONNECTING: 				"Đang ngắt kết nối",
			DISCONNECTED: 				"Chưa kết nối",

			PASSWORD_HINT: 				"Mật mã",
			FILEBUTTONTEXT: 			"Duyệt",
			FILEBLANKTEXT: 				"Vui lòng chọn một tập tin",
			NOSELECTEDTEXT: 			"Chọn lựa chọn.",

			ADD_A_NEW_KEYWORD: 			"Thêm từ khóa",

			SUCCESSED: 					"Thành công!",
			FORM_SAVED: 				"Đã lưu",
			FORM_FAILED: 				"Thất bại",
			GRID_ID_COLUMN: 			"STT",
			GRID_SAVED: 				"Đã lưu",
			GRID_FAILED: 				"Thất bại",
			GRID_NONE_SELECT: 			"Vui lòng chọn ít nhất một mục.",
			GRID_DELETE_COMFIRM: 		"Bạn chắc chắn muốn xóa những mục này?",
			GRID_DELETE_ALL_COMFIRM: 	"Bạn chắc chắn muốn xóa tất cả các mục?",
			GRID_MAX_RULES: 			"Đã đạt số mục tối đa.",
			KEYWORD_MAX_OVERFLOW: 		"Số lượng từ khóa đã đạt đến giới hạn.",

			NOTE: 						"Lưu ý:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Định dạng không hợp lệ.",
			BLANKTEXT: 					"Mục này là bắt buộc.",

			EMAIL: 						"Địa chỉ email không hợp lệ.",
			NUMBER: 					"Định dạng không hợp lệ.",

			NUMBER_MIN: 				"Giá trị không hợp lệ, vui lòng nhập một số lớn hơn %min.",
			NUMBER_MAX: 				"Giá trị không hợp lệ, vui lòng nhập một số nhỏ hơn %max.",

			NUMBER_MIN_MAX: 			"Giá trị không hợp lệ, vui lòng nhập một số nằm trong khoảng %min và %max.",
			HEX: 						"Mục này phải là số thập lục phân",

			IP: 						"Định dạng không hợp lệ.",

			IP_NO_ALL_ZERO:				"Địa chỉ không thể là 0.0.0.0.",
			IP_NO_LOOP:					"Địa chỉ không thể là địa chỉ IP loopback.",
			IP_NO_D_TYPE:				"Địa chỉ không thể là địa chỉ IP lớp D.",
			IP_NO_E_TYPE:				"Địa chỉ không thể là địa chỉ IP lớp D.",
			IP_NO_ALL_ONE:				"Địa chỉ không thể là 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"Địa chỉ không thể bắt đầu với 255.",
			IP_NO_FIRST_ZERO:			"Địa chỉ không thể bắt đầu với 0.",
			MASK_NO_ALL_ONE:			"Mask không thể là 255.255.255.255.",

			IPV6: 						"Định dạng không hợp lệ.",
			IPV6_NOT_GLOBAL:			"Định dạng không hợp lệ.",
			IPV6_NOT_PREFIX:			"Định dạng không hợp lệ.",
			IP_DOMAIN: 					"Định dạng không hợp lệ.",
			IPV6_DOMAIN: 				"Định dạng không hợp lệ.",
			PPTP_INVALID_IP:			"Địa chỉ IP không hợp lệ",
			MAC: 						"Định dạng không hợp lệ.",
			MULTI_MAC:					"Định dạng không hợp lệ.",
			MAC_INVALID_BROADCAST:		"Địa chỉ MAC không thể là địa chỉ broadcast.",
			MAC_INVALID_MULTICAST:		"Địa chỉ MAC không thể là địa chỉ multicast.",
			DATE: 						"Định dạng không hợp lệ.",
			DATE_INVALID: 				"Vui lòng nhập một ngày trong khoảng 01/01/1970 đến 31/12/2030",
			MASK: 						"Định dạng không hợp lệ.",
			DOMAIN: 					"Định dạng không hợp lệ.",
			STRING_DOMAIN:              "Định dạng không hợp lệ.",
			USER: 						"Định dạng không hợp lệ.",
			NOTE: 						"Định dạng không hợp lệ.",
			PWD: 						"Định dạng không hợp lệ.",
			SSID: 						"Định dạng không hợp lệ.",
			NAME:						"Định dạng không hợp lệ.",
			ASCII_VISIBLE:				"Định dạng không hợp lệ.",
			STRING_VISIBLE:				"Định dạng không hợp lệ.",
			STRING_VISIBLE_NO_COMMA:    "Định dạng không hợp lệ.",
			STRING_VISIBLE_ALLOW_BLANK: "Định dạng không hợp lệ.",
			VPN_NAME_PWD: 				"Vui lòng nhập 1-15 ký tự chữ, số, - và _."
		},


		ERROR: {			
			"00000001":					"Định dạng tập tin không hợp lệ.",
			"00000002":					"Lỗi kiểm tra.",
			"00000003":					"Tập tin quá lớn.",
			"00000004":					"Lỗi tải lên.",
			"00000005":					"Lỗi khởi động lại.",
			"00000006":					"Lỗi không rõ.",
			"00000007":					"Mục đã tồn tại. Vui lòng nhập giá trị khác.",

			"00000009":					"Cổng không hợp lệ.",
			"00000010":					"Cổng phải là số.",

			"00000011":					"Tên đăng nhập phải giống với giá trị Từ",
			"00000012": 				"Tên đăng nhập phải bắt đầu bằng ký tự la tinh",

			"00000021":					"Định dạng không hợp lệ.",

			"00000032": 				"Giá trị phải thấp hơn Thấp.",
			"00000033": 				"Giá trị phải thấp hơn Trung bình và Thấp.",
			"00000034": 				"Giá trị không hợp lệ, bui lòng nhập một giá trị trong khoảng 5 và 7200.",

			"00000039": 				"Vui lòng sử dụng giá trị mặc định 0 hoặc nhập một giá trị từ 30 đến 86400.",
			"00000040": 				"Cần SSID và địa chỉ MAC.",

			"00000042": 				"Vui lòng sử dụng giá trị mặc định 80 hoặc nhập một giá trị từ 1024 đến 65535.",

			"00000045": 				"Gateway mặc định và địa chỉ IP LAN cần nằm trong cùng lớp mạng. Vui lòng nhập lại.",

			"00000046": 				"Không thể để TRỐNG địa chỉ IP và địa chỉ MAC. Vui lòng nhập lại.",
			"00000047": 				"Địa chỉ IP và địa chỉ LAN cần nằm trong cùng lớp mạng. Vui lòng nhập lại.",

			
			"00000049":					"Mạng đích đến không hợp lệ",

			"00000050": 				"Địa chỉ IP máy chủ DNS không chính xác. Vui lòng nhập địa chỉ IP khác.",
			"00000051": 				"Địa chỉ MAC đã tồn tại. Vui lòng nhập giá trị khác.",
			"00000052": 				"Địa chỉ IP này đã tồn tại. Vui lòng nhập giá trị khác.",

			"00000053": 				"Địa chỉ bắt đầu không được lớn hơn địa chỉ kết thúc. <br/>Vui lòng nhập lại.",

			"00000054": 				"Vùng địa chỉ IP và địa chỉ IP LAN cần nằm trong cùng lớp mạng. Vui lòng nhập lại.",

			"00000055": 				"IP không thể giống địa chỉ LAN",

			"00000056": 				"Địa chỉ IP từ xa và địa chỉ IP LAN hiện tại không thể nằm cùng lớp mạng. Vui lòng nhập một giá trị khác.",

			"00000057": 				"Mật mã PSK không hợp lệ, vui lòng nhập lại.",
			"00000058": 				"Mật mã WEP không hợp lệ, vui lòng nhập lại.",

			"00000059": 				"Địa chỉ IP và Subnet Mask không hợp lệ, vui lòng nhập một địa chỉ hợp lệ.",

			"00000060": 				"Địa chỉ IP WAN và IP LAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập một giá trị khác.",

			"00000061": 				"Thời gian bắt đầu phải sớm hơn thời gian kết thúc.",

			"00000062": 				"Mục này là bắt buộc.",
			"00000063": 				"Mục này là bắt buộc.",

			"00000064": 				"Không thể khóa địa chỉ MAC máy chủ.",
			"00000065": 				"Mục này xung đột với mục đã tồn tại, vui lòng kiểm tra lại.",
			
			"00000066": 				"Mật mã cần có từ 8 đến 63 ký tự hoặc 8 đến 64 ký tự thập lục phân.",
			"00000067": 				"Mật mã phải là 10 ký tự thập lục phân.",
			"00000068": 				"Mật mã phải là 5 ký tự ASCII.",
			"00000069": 				"Mật mã phải là 26 ký tự thập lục phân.",
			"00000070": 				"Mật mã phải là 13 ký tự ASCII.",
			"00000071": 				"Mật mã phải là 32 ký tự thập lục phân.",
			"00000072": 				"Mật mã phải là 16 ký tự ASCII",
			"00000073": 				"Mật mã phải ít hơn 64 ký tự.",

			"00000074": 				"Định dạng tập tin không hợp lệ.",

			"00000075": 				"Mã PIN phải có 8 chữ số",

			"00000076": 				"Mục xung đột với mục đã có. Vui lòng kiểm tra cổng kích hoạt và giao thức kích hoạt.",
			"00000077": 				"Địa chỉ IP không thể giống địa chỉ IP LAN",
			"00000078": 				"Địa chỉ IP máy chủ không được trùng với  địa chỉ IP LAN.",

			"00000080": 				"Mật mã không khớp. Vui lòng thử lại.",

			"00000083": 				"Gateway không thể giống IP.",
			"00000084": 				"DNS chính khôg thể giống IP.",
			"00000085": 				"DNS thứ hai khôg thể giống IP.",
			"00000086": 				"DNS chính không thể giống DNS thứ hai.",

			"00000088": 				"Hoạt động này không được thực hiện khi quản lý từ xa",
			"00000089": 				"Bạn đã đạt đến %num lần thử. Vui lòng thử lại sau hai giờ nữa.",

			"00000090": 				"Đích đến không thể là địa chỉ IP LAN.",
			"00000091": 				"Đích đến không thể là địa chỉ IP WAN",

			"00000092": 				"Địa chỉ IP và địa chỉ IP LAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",
			"00000093": 				"Địa chỉ IP và địa chỉ IP ƯAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",

			"00000094": 				"ID VLAN không thể giống nhau",
			"00000095": 				"Cần ít nhất một cổng Internet",

			"00000096": 				"Từ khóa đã tồn tại",

			"00000097": 				"Cấu hình trên băng tần 2.4GHz sẽ không có hiệu lực cho đến khi mở nút Wi-Fi.",
			"00000098": 				"Cấu hình trên băng tần 5GHz sẽ không có hiệu lực cho đến khi mở nút Wi-Fi.",
			"00000099": 				"Cấu hình trên băng tần 2.4GHz và băng tần 5GHz sẽ không có hiệu lực cho đến khi mở nút Wi-Fi.",

			"00000100": 				"Cấu hình mạng 5GHz sẽ không khả dụng do các hạn chế trong khu vực/ đất nước của bạn.",
			"00002100": 				"Mạng 60GHz không khả dụng do giới hạn trong khu vực/quốc gia của bạn.",

			"00000101": 				"Chức năng không dây của bạn đã được tắt. Nếu bạn muốn sử dụng chức năng này. Vui lòng mở nút Wi-Fi.",
			"00000102": 				"Chức năng không dây của bạn đã được tắt. Nếu bạn muốn sử dụng chức năng này. Vui lòng mở nút Wi-Fi.",
			"00002102": 				"Chức năng không dây của bạn đã được tắt. Nếu bạn muốn sử dụng chức năng này. Vui lòng mở nút Wi-Fi.",

			"00000103": 				"Chức năng không dây của bạn đã được tắt. Nếu bạn muốn sử dụng chức năng này. Vui lòng mở nút Wi-Fi.",
			"00000104": 				"Chức năng không dây của bạn đã bị vô hiệu hóa.",

			"00000105": 				"Không thể cùng lúc kích hoạt QoS và IPTV.",

			"00000106": 				"Địa chỉ IP không thể nằm cùng lớp mạng với địa chỉ IP LAN.",
			
			"00000107": 				"Đích đến đã tồn tại",

			"00000110": 				"Địa chỉ IP và địa chỉ IP LAN không được nằm cùng lớp mạng.",
			
			"00000111": 				"QoS và <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> không thể kích hoạt cùng lúc.",
			"00000112": 				"Chức năng WDS có thể làm việc trên băng tần 2.4GHz hoặc 5GHz. Tuy nhiên, Mạng khách sẽ không khả dụng trên băng tần WDS.",
			"00000113": 				"Không thể cùng lúc kích hoạt WDS và Mạng khách.",
			"00000114": 				"Thống kê lưu lượng  và <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> không thể được kích hoạt cùng lúc.",

			"00000117": 				"Tên miền đã tồn tại.",
			"00000118": 				"Số lượng tên miền đã đạt giới hạn.",
			"00000119":					"NAT Boost sẽ bị vô hiệu hóa khi hoặc <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> hoặc <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Thống kê lưu lượng</a> được kích hoạt.",

			"00000120": 				"Mật mã có từ 5 đến 13 ký tự ASCII.",
			"00000121": 				"Mật mã có từ 10đến 26 ký tự Thập lục phân.",
			"00000122": 				"Tên đăng nhập và mật mã trống, bạn chắc chắn muốn tiếp tục?",
			"00000123": 				"Đang lưu… Vui lòng không thực hiện hành động nào trong quá trình này.",
			"00000124": 				"PIN của router đã bị khóa do kết nối sử dụng sai PIN nhiều lần. Vui lòng tạo một mã PIN mới.",

			"00000125": 				"Số lượng điều luật QoS đã đạt giới hạn.",
			"00000126": 				"Kích thước tập tin đã đạt giới hạn.",
			"00000127": 				"Nội dung tập tin không chính xác.",
			"00000128": 				"Vui lòng chọn ít nhất một ứng dụng.",
			"00000129": 				"Vui lòng chọn ít nhất một cổng vật lý.",
			"00000130":					"Chức năng WPS đã bị vô hiệu hóa.",
			"00000131": 				"Máy chủ NTP không được là địa chỉ loopback.",
			"00000132": 				"Thay đổi chế độ thất bại. Vui lòng thử lại sau hoặc khởi động lại router của bạn.",
			"00000133": 				"Địa chỉ IP máy chủ DMZ không hợp lệ. Vui lòng nhập một giá trị hợp lệ.",
			"00000134":  				"IP nội bộ không hợp lệ. Vui lòng nhập một giá trị hợp lệ.",
			"00000135": 				"Tập tin Firmware lỗi.",
			"00000136": 				"Tập tin Sao lưu lỗi.",
			"00000137": 				"Địa chỉ IP không hợp lệ, vui lòng nhập một địa chỉ hợp lệ.",
			"00000139": 				"Thông số khôi phục mật mã không chính xác.",
			"00000140": 				"Mã không chính xác.",
			"00000141": 				"Khôi phục mật mã đã bị vô hiệu hóa.",
			"00000142": 				"Gửi mã thất bại. Vui lòng kiểm tra kết nối Internet của bạn.",
			"00000143": 				"Địa chỉ email không hợp lệ.",
			"00000144": 				"Tin nhắn email không hợp lệ.",
			"00000145": 				"Không tìm được máy chủ.",
			"00000146": 				"Xác thực thất bại.",
			"00000147": 				"Cổng phải từ 1 đến 65535.",
			"00000148": 				"Đối với khoảng cổng, cổng bắt đầu phải nhỏ hơn cổng kết thúc.\nVui lòng nhập lại.",
			"00000149": 				"Số cổng bị trùng. Vui lòng nhập lại.",
			
			"00000150": 				"Đường dẫn không tồn tại",
			"00000151": 				"Đường dẫn chỉ định chưa được thiết lập.",
			"00000152": 				"Có vấn đề với đường dẫn này.",
			"00000153": 				"Không tìm thấy ổ cứng",
			"00000154": 				"Không có thiết bị USB",
			
			"00000155": 				"Địa chỉ IP máy khách VPN PPTP và địa chỉ IP LAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập một giá trị khác.",
			"00000156": 				"Địa chỉ IP máy khách VPN PPTP và địa chỉ IP máy khách OpenVPN không thể nằm cùng lớp mạng. <br/> Vui lòng nhập một giá trị khác.",

			"00000222":  				"Số mục tối đa.",
			"00000231": 				"Mục bị lặp",
			"00000232": 				"URL không hợp lệ.",
			"00000233":					"Vui lòng chọn ít nhất một ngày.",

			"00000301": 				"Mục thư mục chia sẻ tối đa.",
			"00000302": 				"Mục thư mục chia sẻ tối đa trong một đĩa.",
			"00000303": 				"Nhân đôi đường dẫn thư mục chia sẻ.",
			"00000304": 				"Nhân đôi tên thư mục chia sẻ.",

			"00001000":					"Hoạt động nâng cấp đang chạy, vui lòng đợi.",
			"00001001": 				"Tính năng WDS có thể hoạt động cả ở băng tần 2.4GHz và 5GHz.",
			"00001002":					"Mã không chính xác.",

			"00001123": 				"Mục điều luật ứng dụng nhập trống, vui lòng nhập ít nhất một mục điều luật.",
			"00001124": 				"Mục điều luật cổng vật lý nhập trống, vui lònh nhập ít nhất một mục điều luật.",

            "00002000": 				"Mục này xung đột với định tuyến tĩnh xác định bởi ISP, bạn chắc chắn muốn tiếp tục?",

            "00003000":                 "IPv6 Pass-Through xung đột với IPTV! Nếu bạn muốn sử dụng tính năng này, vui lòng vô hiệu hóa cài đặt IPTV.",
			"00004139": 				"Không có kết nối Internet",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Hết thời gian chờ. Vui lòng kiểm tra kết nối Internet và thử lại sau.",
			"00004141": 				"Lỗi không rõ.",
			"00004142": 				"Mã xác thực không chính xác.",
			"00004143": 				"Mật mã không hợp lệ.",
			"00004144": 				"Tên đăng nhập đã tồn tại",
			"00004145": 				"Mật mã không hợp lệ.",//new password
			"00004146": 				"Không thể gỡ thiết bị này. Vui lòng thử lại sau.",
			"00004147": 				"Thiết bị này đã được kết hợp với một tài khoản khác.",
			"00004148": 				"Đầu vào không hợp lệ.",
			"00004149": 				"Tên miền đã tồn tại.",
			"00004150": 				"Không thể tải firmware. Vui lòng kiểm tra kết nối Internet và thử lại sau.",
			"00004151": 				"Không thể đăng ký hơn 1000 tên miền với cùng một tài khoản cloud.",
			"00004152": 				"Thiết bị này đã được kết hợp với một tên miền khác.",
			"00004153": 				"Tên miền này đã được kết hợp với một thiết bị khác.",
			"00004154": 				"Không có phản hồi từ máy chủ. Vui lòng thử lại sau.",
			"00004155": 				"Tài khoản không tồn tại.",
			"00004156": 				"Không thể bắt đầu ứng dụng cloud. Vui lòng khởi động lại thiết bị và thử lại.",
			"00004157": 				"Không thể kết nối máy chủ cloud. Vui lòng kiểm tra kết nối Internet của bạn và thử lại sau.",
			"00004158": 				"Cổng WAN đã bị tháo.",
			"00004159": 				"Không thể kết nối Internet. Vui lòng liên hệ với nhà cung cấp dịch vụ của bạn hoặc thử lại sau.",
			"00004160": 				"Không thể lấy địa chỉ IP từ máy chủ DHCP. Vui lòng kiểm tra dạng kết nối WAN hoặc thử lại sau.",
			"00004161": 				"Xác thực PPPoE thất bại. Vui lòng kiểm tra tên đăng nhập và mật mã.",
			"00004162": 				"Không thể kết nối đến máy chủ PPPoE.",
			"00004164": 				"Xác thực PPTP thất bại. Vui lòng kiểm tra tên đăng nhập và mật mã của bạn.",
			"00004165": 				"Không thể kết nối đến máy chủ PPTP.",
			"00004167": 				"Xác thực L2TP thất bại. Vui lòng kiểm tra tên đăng nhập và mật mã.",
			"00004168": 				"Không thể kết nối đến L2TP.",
			"00004169": 				"Lỗi không rõ. Vui lòng thử lại.",
			"00004170": 				"Cổng WAN đã bị tháo.",
			"00004171": 				"Không có kết nối Internet",
			"00004172": 				"Kết nối thất bại.",
			"00004173": 				"Sai tên đăng nhập và mật mã",
			"00004174": 				"Địa chỉ email không hợp lệ.",
			"00004175": 				"Định dạng tên đăng nhập không hợp lệ.",
			"00004176": 				"Email đã tồn tại.",
			"00004177": 				"Không thể truy cập thông tin tài khoản. Vui lòng làm mới trang.",
			"00004178":   				"Lỗi hệ thống. Vui lòng làm mới trang và thử lại.",
			"00004179":   				"Không thể kết hợp thiết bị này. Vui lòng thử lại sau.",
			"00004180":   				"Thiết bị này đã được gỡ bỏ khỏi tài khoản Cloud này. Vui lòng đăng nhập lại vào tài khoản cloud để kết hợp thiết bị này với tài khoản của bạn.",
			"00004181":   				"Thiết bị đang offline. Vui lòng kiểm tra cài đặt kết nối Internet.",
			"00004182":   				"Không thể gửi email. Vui lòng kiểm tra kết nối Internet của bạn và thử lại.",
			"00004183":   				"Tài khoản cần phải có ký tự.",
			"00004184":   				"Bạn đã nhập sai mật mã 20 lần. Vui lòng thử lại sau 2 tiếng nữa.",
			"00004185":   				"Bạn đã nhận mã xác minh 10 lần trong 1 tiếng. Vui lòng thử lại sau 24 tiếng nữa.",
			"00004186":   				"Xin lỗi, không thể kích hoạt tài khoản của bạn. Vui lòng gửi lại email xác nhận.",
			"00004187":   				"Xin lỗi, đường dẫn đã hết hạn. Vui lòng gửi lại email xác nhận.",
			"00004188":   				"Xin lỗi, đường dẫn đã hết hạn. Vui lòng gửi lại email.",
			"00004189":   				"Xin lỗi, không thể khôi phục mật mã của bạn. Vui lòng gửi lại email.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Nâng cấp firmware lỗi.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Trạng thái",
			NETWORK: 					"Mạng",
			NETWORK_MAP: 				"Bản đồ mạng",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"Máy chủ DHCP",
			DYNAMIC_DNS: 				"DNS động",
			ADVANCED_ROUTING: 			"Định tuyến nâng cao",

			WIRELESS: 					"Không dây",
			WIRELESS_SETTINGS: 			"Cài đặt không dây",
			WDSBRIDGING: 				"Cầu nối WDS",
			WPS: 						"WPS",
			MACFILTERING: 				"Lọc địa chỉ MAC",
			WIRE_STATISTICS: 			"Thống kê",
			
			
			GUEST_NETWORK: 				"Mạng khách",
			WIRELESS_SETTINGS: 			"Cài đặt không dây",
			STORAGE_SHARING: 			"Chia sẻ lưu trữ",
			NAT_FORWARDING: 			"Chuyển tiếp NAT",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Máy chủ ảo",
			PORT_TRIGGERING: 			"Cổng kích hoạt",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"Cài đặt USB",
			BASIC_SET: 					"Cài đặt cơ bản",
			DISK_SET: 					"Cài đặt thiết bị",
			FOLDER_SHARING: 			"Chia sẻ truy cập",
			STORAGE_SHARING: 			"Chia sẻ lưu trữ",
			FTP_SERVER: 				"Máy chủ FTP",
			MEDIA_SERVER: 				"Máy chủ đa phương tiện",
			PRINT_SERVER: 				"Máy chủ in ấn",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Tải offline",
			
			PARENTAL_CONTROL: 			"Quyền kiểm soát của phụ huynh",

			QOS:  						"QoS",
			DATABASE:  					"Cơ sở dữ liệu",

			STREAMBOOST: 				"Dòng tăng cường",
			MAP: 						"Bản đồ",
			SB_MAP: 					"Bản đồ",
			SB_BANDWIDTH:  				"Băng thông",
			SB_PRIORITY: 				"Ưu tiên",
			SB_STATISTICS: 				"Thống kê",

			
			SECURITY: 					"Bảo mật",
			SETTINGS: 					"Cài đặt",
			ACCESS_CONTROL: 			"Kiểm soát truy cập",
			IP_MAC_BINDING: 			"Kết hợp IP & MAC",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Công cụ hệ thống",
			TIME_SETTINGS: 				"Cài đặt thời gian",
			DIAGNOSTIC: 				"Chẩn đoán",
			FIRMWARE_UPGRADE: 			"Nâng cấp Firmware",
			BACKUP_RESTORE: 			"Sao lưu & Phục hồi",
			ADMINISTRATION: 			"Quản trị viên",
			SYSTEM_LOG: 				"Bản ghi hệ thống",
			STATISTICS: 				"Thống kê lưu lượng",
			SYSTEM_PARAMETERS: 			"Thông số hệ thống",
			VPN: 						"Máy chủ VPN",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"Kết nối VPN"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Khu vực và Vùng thời gian",
			INTERNET_CONNECTION_TYPE: 	"Dạng kết nối Internet",
			WIRELESS_SETTINGS: 			"Cài đặt không dây",
			SUMMARY: 					"Tóm tắt",
			SETUP_COMPLETE: 			"Kiểm tra kết nối Internet",

			EXIT: 						"Thoát",
			NEXT: 						"Tiếp",
			SAVE: 						"Lưu",
			FINISH: 					"Hoàn tất",
			OK: 						"OK",
			NONE: 						"Phát hiện thất bại.",

			REGION: 					"Khu vực",
			TIME_ZONE: 					"Vùng thời gian",
			NO_SELECT: 					"Chọn lựa chọn.",

			AUTO_DETECT: 				"Tự động phát hiện",
			DYNAMIC_IP: 				"IP Động",
			STATIC_IP: 					"IP Tĩnh",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Nếu bạn không chắc về Dạng kết nối Internet của mình, xin vui lòng sử dụng Tự động phát hiện hoặc liên hệ với Nhà cung cấp dịch vụ Internet (ISP) của bạn để được giúp đỡ.",

			DYNAMIC_IP_INFO: 			"Nếu ISP của bạn chỉ cho phép truy cập Internet với một địa chỉ MAC, bạn cần phải sao chép địa chỉ MAC máy tính chính của bạn. Nếu bạn không chắc chắn, chọn <strong>Không sao chép địa chỉ MAC</strong>.",
			MAC_CLONE_NO: 				"Không sao chép địa chỉ MAC",
			MAC_CLONE_YES: 				"Sao chép địa chỉ MAC máy tính hiện hành",
			MAC_CLONE_NOTE: 			"Nếu bạn chọn Sao chép địa chỉ MAC, vui lòng chắc chắn địa chỉ MAC của máy tính này được đăng ký với ISP của bạn trước khi bấm chọn Tiếp.",

			PPPOE_INFO: 				"Vui lòng nhập tên đăng nhập và mật mã PPPoE của bạn.",
			
			STATIC_IP_INFO: 			"Vui lòng nhập thông tin IP của bạn.",

			L2TP_INFO: 					"Vui lòng nhập tên đăng nhập và mật mã kết nối L2TP của bạn.",
			PPTP_INFO: 					"Vui lòng nhập tên đăng nhập và mật mã kết nối PPTP của bạn",
			
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			SERVER_IP_ADDRESS_NAME: 	"IP /Tên miền máy chủ VPN",
			IP_ADDRESS: 				"Địa chỉ IP",
			SUBNET_MASK: 				"Subnet Mask",
			DEFAULT_GATEWAY: 			"Gateway mặc định",
			PRIMARY_DNS: 				"DNS thứ nhất",
			SECOND_DNS: 				"DNS thứ hai",
			OPTIONAL: 					"(Tùy chọn)",
			
			ON: 						"Mở",
			OFF: 						"Tắt",
			WIRELESS_24GHZ: 			"Không dây 2.4GHz",
			WIRELESS_5GHZ: 				"Không dây 5GHz",
			WIRELESS_60GHZ: 				"Không dây 60Ghz",
			ENABLE_WIRELESS_RADIO: 		"Kích hoạt vô tuyến không dây",
			NAME_SSID: 					"Tên mạng không dây (SSID)",

			SUMMARY_INFO1: 				"Bạn cần kết nối lại thiết bị không dây của bạn đến mạng không dây mới trước khi bấm chọn nút <strong>Tiếp</strong>.",
			SUMMARY_INFO2: 				"Tên mạng không dây và mật mã của bạn đã được chỉnh sửa như bên dưới:",
			SUMMARY_INFO3: 				"Đảm bảo bạn đã kết nối đến mạng không dây mới.",

			WIRELESS_24GHZ_SSID: 		"Tên mạng không dây 2.4GHz( SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Mật mã mạng không dây 2.4GHz",
			WIRELESS_5GHZ_SSID: 		"Tên mạng không dây 5GHz( SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Mật mã mạng không dây 5GHz",
			WIRELESS_60GHZ_SSID: 		"SSID không dây 60GHz",
			WIRELESS_60GHZ_PASSWORD: 	"Mật mã không dây 60GHz",

			SORRY: 						"Thất bại.",
			SUCCESS: 					"Thành công!",
			TEST_INTERNET_SUCCESS_INFO: "Bấm chọn Hoàn tất để kết thúc quá trình Cài đặt nhanh.",

			TEST_INTERNET_FAILED_INFO_0:"Vui lòng kiểm tra tất cả các thông số Cài đặt nhanh đều chính xác và thử lại lần nữa. Nếu tất cả các thông số Cài đặt nhanh đều chính xác. Vui lòng khởi động lại modem của bạn, chờ 2 phút, và bấm chọn Kiểm tra kết nối Internet một lần nữa. Nếu bạn không sử dụng modem, xin vui lòng liên hệ Nhà cung cấp dịch vụ Internet (ISP) của bạn để được giúp đỡ.",
			SUMMARY_INFO4: 				"Xin lỗi! Chúng tôi phát hiện bạn hiện không kết nối lại thiết bị không dây của mình đến mạng không dây mới. Vui lòng thực hiện và bấm chọn <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Chúc mừng!",
			COMPLETE_INFO_0: 			"Bạn đã hoàn tất quá trình Cài đặt nhanh.",
			COMPLETE_INFO_1:			"Bấm chọn Kiểm tra kết nối Internet phía dưới, sau đó bấm chọn Hoàn tất.",
			TEST_INTERNET: 				"Kiểm tra kết nối Internet",

			
			RESET_USER_TITLE: 			"Cài đặt tên đăng nhập và mật mã mới",
			NEW_USERNAME: 				"Tên đăng nhập mới",
			NEW_PASSWORD: 				"Mật mã mới",
			CONFIRM_PASSWORD: 			"Xác nhận mật mã mới",
			CONFIRM: 					"Xác nhận"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Trạng thái Internet",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Dạng kết nối",
			SECONDARY_CONN: 			"Kết nối thứ hai",

			POOR_CONNECTED: 			"Kết nối yếu",
			UNPLUGGED: 					"Cổng WAN đã bị tháo",
			
			CONNECTED: 					"Đã kết nối",
			DISCONNECTED: 				"Đã ngắt kết nối",
			CONNECTING: 				"Đang kết nối",

			INTERNET_IP_ADDR: 			"Địa chỉ IP",
			
			IP_ADDR: 					"Địa chỉ IP",
			MAC_ADDR: 					"Địa chỉ MAC",
			GATEWAY: 					"Gateway",

			AUTO: 						"Tự động",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"Máy khách không dây",
			HOST_CLIENTS: 				"Máy khách chủ",
			GUEST_CLIENTS: 				"Máy khách",
			WIRE_CLIENTS: 				"Máy khách có dây",
			PRINTER: 					"Máy in",
			USB_DISK: 					"Ổ cứng USB",
			WIRELESS: 					"Không dây",
			NAME: 						"Tên",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kênh",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Không dây 2.4GHz",
			WIRELESS_5GHZ: 				"Không dây 5GHz",
			WIRELESS_60GHZ:				"Không dây 60Ghz",
			
			GUEST_24GHZ: 				"Mạng khách 2.4GHz",
			GUEST_5GHZ: 				"Mạng khách 5GHz",
			
			STATUS: 					"Trạng thái",
			TOTAL: 						"Tổng",
			AVAILABLE: 					"Khả dụng",
			GB: 						"GB",
			BRAND: 						"Thương hiệu",

			DYNAMIC_IP: 				"IP Động",
			STATIC_IP: 					"IP Tĩnh",
			SUBNET_MASK: 				"Subnet Mask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Cáp BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Đường hầm 6to4",
			NONE: 						"Không"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Tự động phát hiện",
			INTERNET_CONN_TYPE: 		"Dạng kết nối Internet",
			DYNAMIC_IP: 				"IP Động",
			STATIC_IP: 					"IP Tĩnh",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"Cáp BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Đã tháo",
			NONE: 						"Không",
			DETECT_FAIL: 				"Tự động phát hiện thất bại",
			SECONDARY_CONN: 			"Kết nối thứ hai",

			DYNAMIC_YES: 				"Không sao chép địa chỉ MAC",
			DYNAMIC_NO: 				"Sao chép địa chỉ MAC máy tính hện tại",
			
			IP_ADDR: 					"Địa chỉ IP",
			SUBNET_MASK: 				"Subnet Mask",
			DEFAULT_GATEWAY: 			"Gateway mặc định",
			PRIMARY_DNS: 				"DNS thứ nhất",
			SECOND_DNS: 				"DNS thứ hai",
			OPTIONAL: 					"(Tùy chọn)",
			USER_NAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			SERVER_IP_ADDR_NAME: 		"IP /Tên miền máy chủ VPN",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Nếu bạn không chắc về Dạng kết nối Internet của mình, xin vui lòng sử dụng Tự động phát hiện hoặc liên hệ với Nhà cung cấp dịch vụ Internet (ISP) của bạn để được giúp đỡ."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Cài đặt không dây",
			MODE_2G: 					"Không dây 2.4GHz",
			MODE_5G: 					"Không dây 5GHz",
			MODE_60G: 					"Không dây 60Ghz",
			WIRELESS_NETWORK_NAME: 		"Tên mạng không dây (SSID)",
			WIRELESS_PASSWORD: 			"Mật mã",
			ENABLE_WIRELESS: 			"Kích hoạt vô tuyến không dây",
			SAVE: 						"Lưu",
			ENCRYPTION_2G_NOTICE:		"Mã hóa 2.4GHz là %s.",
			ENCRYPTION_5G_NOTICE:		"Mã hóa 5GHz là %s.",
			ENCRYPTION_60G_NOTICE:		"Mã hóa 60GHz là %s.",
			ENCRYPTION_2G_NO: 			"Mạng không dây 2.4GHz không được mã hóa.",
			ENCRYPTION_5G_NO: 			"Mạng không dây 5GHz không được mã hóa.",
			ENCRYPTION_60G_NO: 			"Mạng không dây 60GHz không được mã hóa",
			ENCRYPTION_NO: 				"Mạng không dây không có bảo mật tiềm ẩn nhiều nguy cơ không an toàn.",
			ENCRYPTION_SURE: 			"Bạn chắn chắn muốn tiếp tục?",
			HIDE_SSID: 					"Giấu SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Cài đặt cơ bản",
			TITIL_NEW:					"Ổ cứng & Tài khoản",
			DISK_SET:					"Cài đặt thiết bị",

			SELFLY_REMOVE:				"Tháo an toàn",
			SCANING:					"Đang quét…",
			SCAN_RESULT:				"Đã tìm thấy %n đĩa",
			
			DISKS:						"Ổ cứng",
			USERS: 						"Tài khoản người dùng",
			DEVICENAME: 				"Tên thiết bị",
			VOLUMN: 					"Nhãn",

			USBSPACE: 					"Dung lượng đã sử dụng",
			FREESPACE: 					"Dung lượng trống",
			STATUS: 					"Trạng thái",
			INACT: 						"Chưa kích hoạt",
			USAGE: 						"Sử dụng",
			CAPACITY: 					"Dung lượng",
			OPERATION: 					"Hoạt động",
			
			ACC: 						"Tài khoản quản lý", 	 	
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			USE_LOGIN: 					"Sử dụng đăng nhập người dùng",
			SCAN: 						"Quét",
			ENJECT_ALL: 				"Tháo tất cả",
			ENJECT: 					"Tháo",
			ADD_USER: 					"Thêm người dùng",
			AUTH: 						"Quyền",


			LOCATION: 					"Vị trí",
			MOBILE_ISP: 				"ISP Mobile",
			DIAL_NUMBER: 				"Số quay",
			APN: 						"APN",
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			MTU_SIZE: 					"Kích thước MTU (bằng byte)",
			OPTIONAL: 					"(Tùy chọn)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Quyền kiểm soát của phụ huynh",
			UNKNOWN: 					"Không rõ",
			
			DEVICE_CTR: 				"Thiết bị dưới Quyền kiểm soát của phụ huynh",
			ID: 						"STT",
			DEVICE: 					"Tên thiết bị",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			TIME: 						"Thời gian truy cập Internet",
			DESCRIPTION: 				"Mô tả",
			ENABLE: 					"Kích hoạt",
			ENABLE_THIS_ENTRY: 			"Kích hoạt mục này",
			OPTIONAL: 					"(Tùy chọn)",
			BTN_VIEW: 					"Xem thiết bị hiện có",
			
			DEVICE_LIST: 				"Danh sách thiết bị",
			SYSTEM_TIME: 				"Thời gian hệ thống",
			
			RESTR: 						"Nội dung giới hạn",
			MODE: 						"Giới hạn",
			BLACKMODE: 					"Sổ đen",
			WHITEMODE: 					"Sổ trắng",
			ACCESS_DEVICES_LIST: 		"Danh sách thiết bị truy cập",
			
			CHOOSE: 					"Chọn",
			ADD_A_NEW_KEYWORD: 			"Thêm một Từ khóa để Chặn",
			ADD_A_NEW_DOMAIN_NAME: 		"Thêm một Tên miền mới để Truy cập",
			
			OPT: 						"Hoạt động",
			STATUS: 					"Quyền kiểm soát của phụ huynh",
			YOURPC:						"Máy tính của bạn"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Mạng khách",
			MODE_2G: 					"Không dây 2.4GHz",
			MODE_5G: 					"Không dây 5GHz",
			WIRELESS_NETWORK_NAME: 		"Tên mạng không dây (SSID)",
			WIRELESS_PASSWORD: 			"Mật mã",
			DYNAMIC_PASSWORD: 			"Mật mã",
			ENABLE_WIRELESS: 			"Kích hoạt Mạng khách",
			SAVE:						"Lưu",
			HIDE_SSID: 					"Giấu SSID",
			PASSWORD_CHANGE_CYCLE: 		"Khoảng thời gian cập nhật mật mã",
			PER_DAY: 					"Mỗi ngày",
			PER_WEEK: 					"Mỗi tuần",
			PER_MONTH: 					"Mỗi tháng",
			NEVER: 						"Không bao giờ",
			UNENCRYPTED:				"Mạng khách không được mã hóa. Bạn có thể thiết lập mật mã tại Trình đơn nâng cao"
		},

		STATUS: {
			TITLE: 						"Trạng thái",
			INTERNET:					"Internet",
			WIRELESS:					"Không dây",
			LAN:						"LAN",
			USB_TITLE:					"Thiết bị USB",
			PERFORMANCE: 				"Hiệu suất",
			GUEST_NETWORK: 				"Mạng khách",
			ACCESS_DEVICES: 			"Thiết bị truy cập",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Dạng kết nối",

			MAC_ADDRESS: 				"Địa chỉ MAC",
			IP_ADDRESS: 				"Địa chỉ IP",
			RELEASE: 					"Giải phóng",
			RENEW: 						"Làm mới",
			
			DYNAMIC_IP: 				"IP Động",
			STATIC_IP: 					"IP Tĩnh",
			SUBNET_MASK: 				"Subnet Mask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Cáp BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Đường hầm 6to4",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass Through(Cầu nối)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Không",
			
			DEFAULT_GATEWAY: 			"Gateway mặc định",
			DNS: 						"Máy chủ DNS",
			MAC: 						"Địa chỉ MAC",
			WDS_STATUS: 				"Trạng thái WDS",
			
			IPV6_ADDRESS: 				"Địa chỉ IP",
			PRIMARY_DNS: 				"DNS thứ nhất",
			SECOND_DNS: 				"DNS thứ hai",

			RADIO: 						"Vô tuyến không dây",

			NAME_SSID: 					"Tên (SSID)",
			NETWORK_NAME_SSID:			"Tên mạng (SSID)",
			HIDE_SSID: 					"Giấu SSID",
			MODE: 						"Chế độ",
			CHANNEL: 					"Kênh",
			CHANNEL_WIDTH: 				"Độ rộng kênh",
			AUTO: 						"Tự động",
			CURRENT_CHANNEL: 			"Kênh hiện tại",

			WDS: 						"Trạng thái WDS",
			WIRED_CLIENTS: 				"Máy khách có dây",
			WIRELESS_CLIENTS: 			"Máy khách không dây",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Địa chỉ đường dẫn nội bộ",
			ASSIGN_TYPE: 				"Dạng gán",
			
			ALLOW_TO_SEE_EACH: 			"Cho phép thiết bị trong  Mạng khách liên lạc",

			TOTAL: 						"Tổng:",
			AVAILABLE: 					"Khả dụng:",

			USB: 						"Ổ cứng USB",
			PRINTER: 					"Máy in",

			CPU_LOAD: 					"Tải CPU",
			MEMORY_USAGE: 				"Bộ nhớ sử dụng",

			IP_ADDR_P: 					"Địa chỉ IP:",
			MAC_ADDR_P: 				"Địa chỉ MAC:",
			CONN_TYPE_P: 				"Dạng kết nối:",

			DISABLED: 					"Đã vô hiệu hóa",
			INIT: 						"Khởi tạo",
			SCAN: 						"Quét",
			AUTH: 						"Xác thực",
			ASSOC: 						"Liên kết",
			RUN: 						"Chạy",
			HOST: 						"Máy chủ",
			GUEST: 						"Máykhách",

			ON: 						"Mở",
			OFF: 						"Tắt"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Dạng kết nối Internet",
			INTERNET_MAC_ADDRESS: 		"Địa chỉ MAC",
			
			CONNECT: 					"Kết nối",
			DISCONNECT: 				"Ngắt kết nối",

			IP_ADDR: 					"Địa chỉ IP",
			
			USE_DEFAULT_MAC: 			"Sử dụng địa chỉ MAC mặc định",
			USE_COMPUTER_MAC: 			"Sử dụng địa chỉ MAC máy tính hiện tại",
			USE_CUSTOM_MAC: 			"Sử dụng địa chỉ MAC tùy chỉnh",
			MAC_CLONE: 					"Sao địa chỉ MAC",
			
			CONFIG: 					"Cấu hình",
			
			IP_ADDRESS: 				"Địa chỉ IP",
			SUBNET_MASK: 				"Subnet Mask",
			DEFAULT_GATEWAY: 			"Gateway mặc định",
			
			MANUAL_DNS: 				"DNS thủ công",
			PRIMARY_DNS: 				"DNS thứ nhất",
			SECOND_DNS: 				"DNS thứ hai",
			
			RENEW: 						"Làm mới",
			RELEASE: 					"Giải phóng",
			VIEW_MODE: 					"Chế độ xem",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Lấy địa chỉ động từ ISP",
			USE_FOLLOW_IP_ADDR: 		"Sử dụng địa chỉ IP sau",
			USE_FOLLOW_DNS_ADDR: 		"Sử dụng địa chỉ DNS sau",
			USE_FOLLOW_DNS_SERVER: 		"Sử dụng máy chủ DNS sau",
			
			BASIC: 						"Cơ bản",
			ADVANCED: 					"Nâng cao",
			
			DNS_ADDR_MODE: 				"Địa chỉ DNS",
			MTU_SIZE: 					"Kích thước MTU",
			MTU_1500: 					"bytes. (Giá trị mặc định là 1500, vui lòng không thay đổi trừ khi thật sự cần thiết.)",
			MTU_1480: 					"bytes. (Giá trị mặc định là 1480, vui lòng không thay đổi trừ khi thật sự cần thiết.)",
			MTU_1460: 					"bytes. (Giá trị mặc định là 1460, vui lòng không thay đổi trừ khi thật sự cần thiết.)",
			MTU_1420: 					"bytes. (Giá trị mặc định là 1420, vui lòng không thay đổi trừ khi thật sự cần thiết.)",
			
			HOST_NAME: 					"Tên máy chủ",

			HOST_NAME_CONFIRM: 			"Tên máy chủ chứa ký tự không hợp lệ, có thể gây ra phản ứng bất thường cho hệ thống. Bạn chắc chắn muốn tiếp tục?",

			GET_IP_WITH_UNICAST_DHCP: 	"Lấy IP thông qua DHCP Unicast (Thông thường không yêu cầu)",
			OPTIONAL: 					"(Tùy chọn)",
			
			STATIC_IP: 					"IP Tĩnh",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"Tự động",
						
			USER_NAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			
			INTERNET_IP_ADDR: 			"Địa chỉ IP",
			INTERNET_DNS: 				"DNS Internet",
			SECONDARY_CONN: 			"Kết nối thứ hai",
			NONE: 						"Không",
			INTERNET_PRIMARY_DNS:		"DNS thứ nhất",
			INTERNET_SECONDARY_DNS: 	"DNS thứ hai",
			
			DYNAMIC_IP: 				"IP Động",
			DYNAMIC_IP_v6: 				"IP động (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Tên dịch vụ",
			ACCESS_CONCENTRATOR_NAME:  	"Tên trung tâm truy cập",
			DETECT_ONLINE_INTERVAL: 	"Phát hiện khoảng thời gian trực tuyến",
			INTERVAL_TIPS: 				"giây. (0-120. Giá trị mặc định là 10)",
			IP_ADDR_MODE:  				"Địa chỉ IP",
			CONN_MODE: 					"Chế độ kết nối",
			DHCP_LINK_UNPLUGGED: 		"Cổng WAN đã bị tháo",
			
			AUTO: 						"Tự động",
			ON_DEMAND: 					"Theo yêu cầu",
			TIME_BASED: 				"Theo thời gian",
			MANUALLY: 					"Thủ công",
			MAX_IDLE_TIME: 				"Thời gian nghỉ tối đa",
			MAX_IDLE_TIME_TIPS: 		"phút. (0 nghĩa là luôn kích hoạt.)",
			PERIOD_OF_TIME: 			"Khoảng thời gian",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"Cáp BigPond",
			AUTH_SERVER: 				"Máy chủ xác thực",
			AUTH_DOMAIN: 				"Tên miền xác thực",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"IP /Tên miền máy chủ VPN",
			PPTP: 						"PPTP",
			TO: 						"đến",
			
			TUNNEL_6TO4: 				"Đường hầm 6to4",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Lấy địa chỉ IPv6 non-temporary",
			GET_PREFIX_DELEGATION: 		"LấyIPv6 prefix delegation",
			IPV6_ADDR: 					"Địa chỉ IPv6",

			GET_IPV6_WAY: 				"Lấy địa chỉ IPv6",
			AUTOMATICALLY:              "Lấy tự động",
			SPECIFIED_BY_ISP: 			"Được xác định bởi ISP",

			IPV6_ADDR_PREFIX: 			"IPv6 Address Prefix",
			NONE_TEMPORARY: 			"Non-temporary",

			PREFIX_DELEGATION: 			"Prefix delegation",
			ENABLE:                     "Kích hoạt",
			DISABLE:                    "Vô hiệu hóa",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"Độ dài Mask IPv4",
			CONFIG_TYPE: 				"Dạng cấu hình",
			RD6_PREFIX: 				"Tiền tố 6RD",
			RD6_PREFIX_LENGTH: 			"Độ dài tiền tố 6RD",
			REPLY_IPV4_ADDR: 			"Biên trả lời địa chỉ IPv4",
			MANUAL: 					"Thủ công",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass Through(Cầu nối)",
			LOCAL_IPV6: 				"Địa chỉ IPv6 nội bộ",
			PEER_IPV6: 					"Địa chỉ IPv6 Peer",
			TUNNEL_ADDR: 				"Địa chỉ đường hầm",
			IPV4_NETMASK: 				"Mặt nạ IPv4",
			CUSTOM: 					"Tùy chỉnh",
		    AFTR_NAME: 					"Tên AFTR",


			
			
			IPV4_ADDR: 					"Địa chỉ IPv4",
			IPV4_MASK: 					"Subnet Mask IPv4",
			IPV4_GATEWAY: 				"Gateway IPv4  mặc định",

			DUPLEX: 					"Song công",
			AUTO_NEGOTIATION: 			"Tự động Negotiation",
			FULL_DUPLEX_1000: 			"1000Mbps song công",
			HALF_DUPLEX_1000:			"1000Mbps bán song công",
			FULL_DUPLEX_100: 			"100Mbps song công",
			HALF_DUPLEX_100: 			"100Mbps bán song công",
			FULL_DUPLEX_10: 			"10Mbps song công",
			HALF_DUPLEX_10: 			"10Mbps bán song công"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"IPv4 LAN",
			LAN_IPv6: 					"IPv6 LAN",

			MAC_ADDRESS: 				"Địa chỉ MAC",
			IP_ADDRESS: 				"Địa chỉ IP",
			SUBNET_MASK: 				"Subnet Mask",
			CUSTOM: 					"Tùy chỉnh",

			IGMP: 						"Kích hoạt IGMP Proxy",
			


			ASSIGNED_TYPE: 				"Dạng gán",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC + Stateless DHCP",
			RDNSS: 						"SLAAC + RDNSS",

			PREFIX: 					"Địa chỉ tiền tố",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Địa chỉ",
			DELEFATED: 					"Ủy quyền",
			STATIC: 					"Tĩnh",
			SITE_PREFIX: 				"Tiền tố trang",
			SITE_PREFIX_LEN: 			"Độ dài tiền tố trang",

			PREFIX_TYPE:  				"Dạng cấu hình tiền tố trang",
			LAN_IPV6_ADDR:  			"Địa chỉ IPv6 LAN",

			RELEASE_TIME: 				"Thời gian giải phóng",
			RELEASE_TIME_TIP: 			"giây. (Giá trị mặc định là 86400, không thay đổi trừ trường hợp cần thiết.)",
			ADDRESS:					"Địa chỉ",
			SAVE: 						"Lưu",

			REBOOT_TIP: 				"Router đang chuyển sang trang đăng nhập mới. <br/> Vui lòng đợi..."

		},

		IPTV:{
			TITLE: 						"Cài đặt",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Kích hoạt IPTV", 
			MODE:  						"Chế độ",
			IGMP_PROXY: 				"Proxy IGMP",
			IGMP_VERSION: 				"Phiên bản IGMP",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Cầu nối",
			BASIC: 						"Tùy chỉnh",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Russia",
			UNIFY:  					"Malaysia-Unifi",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-Phone", 

			Q_TAG: 						"802.1Q Tag",
			ENABLE: 					"Kích hoạt",
			
			INTERNET_VLAN_ID: 			"Internet Vlan ID",
			INTERNET_VLAN_PRIORITY: 	"Internet Vlan Priority",
			IP_PHONE_VLAN_ID: 			"IP-Phone Vlan ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-Phone Vlan Priority",
			IPTV_VLAN_ID: 				"IPTV Vlan ID",
			IPTV_VLAN_PRIORITY: 		"IPTV Vlan Priority",
			IPTV_MULTI_VLAN_ID: 		"IPTV Multicast Vlan ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV Multicast Vlan Priority"
		},

		DHCP_SERVER: {
			TITLE: 						"Máy chủ DHCP",
			
			SETTINGS: 					"Cài đặt",

			DHCP_SERVER: 				"Máy chủ DHCP",
			ENABLE_DHCP_SERVER: 		"Kích hoạt Máy chủ DHCP",

			IP_ADDR_POOL: 				"Dãy địa chỉ IP",
			LEASETIME: 					"Thời gian thuê địa chỉ",
			LEASENOTE: 					"phút. (2-2880. Giá trị mặc định là 120.)",
			
			GATEWAY: 					"Gateway mặc định",
			DOMAIN: 					"Tên miền mặc định",
			PRIMARYDNS: 				"DNS thứ nhất",
			SECONDARYDNS: 				"DNS thứ hai",

			OPTIONAL: 					"(Tùy chọn)",

			CLIENTSLIST: 				"Danh sách máy khách DHCP",
			CLIENT_NUMBER: 				"Số lượng máy khách",
			CLIENT_NAME: 				"Tên máy khách",
			MAC_ADDR: 					"Địa chỉ MAC",
			ASSIGNED_IP: 				"Địa chỉ IP được gán",
			LEASE_TIME: 				"Thời gian thuê",

			RESERVATION: 				"Dành riêng địa chỉ",

			RESERVED_IP: 				"Địa chỉ IP dành riêng",
			IP_ADDRESS: 				"Địa chỉ IP",
			DESCRIPTION: 				"Mô tả",

			CLIENTSLIST: 				"Danh sách máy khách DHCP",
			CLIENT_NUMBER: 				"Số lượng máy khách",

			ENABLE: 					"Kích hoạt",
			ENABLE_THIS_ENTRY: 			"Kích hoạt mục này",
			BTN_VIEW:					"Xem thiết bị hiện có"
			
		},

		DDNS: {
			DDNS: 						"DNS động",
			SERVICEPROVIDER: 			"Nhà cung cấp dịch vụ",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Đăng ký...",
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			DOMAIN_NAME_LIST: 			"Danh sách tên miền",
			DOMAIN_NAME: 				"Tên miền",
			LOGIN: 						"Đăng nhập",
			LOGIN_SAVE: 				"Đăng nhập và Lưu", 
			LOGOUT: 					"Đăng xuất",
			STATU_SUCCESS:				"Thành công",
			UPDATE_INTERVAL:			"Thời gian cập nhật",
			ONE_HOUR:					"1 giờ",
			SIX_HOUR:					"6 giờ",
			TWETEEN_HOUR:				"12 giờ",
			ONE_DAY:					"1 ngày",
			TWO_DAY:					"2 ngày",
			THREE_DAY:					"3 ngày",
			NEVER:						"không bao giờ",
			UPDATE:						"Nâng cấp",
			STATU_INCORRENT:			"Sai tên đăng nhập và mật mã",
			STATU_ERR_DOMAIN:			"Lỗi tên miền",
			
			STATU_NO_LAUNCH:			"Chưa khởi chạy",
			STATU_FAIL_DDNS: 			"Cập nhật DynDNS thất bại.",
			STATU_FAIL_NOIP: 			"Cập nhật No-IP thất bại.",
			STATU_CONN:					"Đang kết nối..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Định tuyến nâng cao",
			STATIC_ROUTING: 			"Định tuyến tĩnh",

			DESTINATION_NETWORK:		"Mạng đích đến",
			SUBNET_MASK: 				"Subnet Mask",
			DEFAULT_GATEWAY: 			"Gateway mặc định",
			DESCRIPTION: 				"Mô tả",
			
			SYSTEM_ROUTING_TABLE: 		"Bảng định tuyến hệ thống",
			CLIENT_NUMBER: 				"Số lượng máy khách",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Giao diện",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Kích hoạt",
			ENABLE_THIS_ENTRY: 			"Kích hoạt mục này"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Cài đặt",
			NOT_SUPPORT_5G: 			"Khu vực này chỉ hỗ trợ mạng 2.4GHz. Vui lòng đảm bảo bạn chọn đúng khu vực.",
			NOT_SUPPORT_60G: 			"Khu vực này không hỗ trợ mạng 60GHz",
			ENABLE_TIPS: 				"Bạn cần phải bật vô tuyến không dây.",

			REGION: 					"Khu vực",
			NOTICE:  					"Để sử dụng chức năng không dây, bạn cần mở nút không dây",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Không dây",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Kích hoạt vô tuyến không dây",

			WIRELESS_NETWORK_NAME: 		"Tên mạng không dây (SSID)",
			WIRELESS_PASSWORD: 			"Mật mã",
			HIDE_SSID: 					"Giấu SSID",

			SECURITY: 					"Bảo mật",
			NO_SECURITY: 				"Không bảo mật",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 - Cá nhân(Khuyến nghị)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - Doanh nghiệp",
			WPA2_PERSONAL: 			    "WPA2-Cá nhân (Khuyến nghị)",
			WPA2_ENTERPRISE: 		    "WPA2-Doanh nghiệp",
			WEP: 						"WEP",

			VERSION: 					"Phiên bản",

			AUTO: 						"Tự động",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Mã hóa",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Chế độ",
			MODE_B:  					"Chỉ 802.11b",
			MODE_G:  					"Chỉ 802.11g",
			MODE_N:  					"Chỉ 802.11n",
			MODE_BG:  					"Hỗnhợp 802.11b/g",
			MODE_GN: 					"Hỗnhợp 802.11g/n",
			MODE_BGN:  					"Hỗnhợp 802.11b/g/n",

			MODE_A_5: 					"Chỉ 802.11a",
			MODE_AN_5: 					"Hỗnhợp 802.11a/n",
			MODE_N_5: 					"Chỉ 802.11n",
			MODE_AC_5:					"Chỉ 802.11ac",
			MODE_NAC_5:					"Hỗnhợp 802.11n/ac",
			MODE_ANAC_5:				"Hỗnhợp 802.11a/n/ac",

			MODE_AD_60:					"Chỉ 802.11ad",

			CHANNEL_WIDTH: 				"Độ rộng kênh",
			CHANNEL: 					"Kênh",

			TRANSMIT_POWER: 			"Công suất truyền tải",

			RADIUS_SERVER_IP: 			"IP máy chủ RADIUS",
			RADIUS_PORT: 				"Cổng RADIUS",
			RADIUS_PASSWORD: 			"Mật mã RADIUS",

			TYPE: 						"Dạng",
			OPEN_SYSTEM: 				"Hệ thống mở",
			SHARED_KEY: 				"Mật mã chia sẻ",

			KEY_SELECTED: 				"Mã được chọn",
			KEY1: 						"Mã 1",
			KEY2: 						"Mã 2",
			KEY3: 						"Mã 3",
			KEY4: 						"Mã 4",

			WEP_KEY_FORMAT: 			"Định dạng mã WEP",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Thập lục phân",

			KEY_TYPE: 					"Dạng mã",
			BIT64: 						"64-bit",
			BIT128: 					"128-bit",
			BIT152: 					"152 Bit",

			KEY_VALUE: 					"Giá trị mã",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Thấp",
			MIDDLE: 					"Trung bình",
			HIGH: 						"Cao"
		},

		WPS: {

			TITLE2: 					"Mã PIN của Router",
			ROUTERS_PIN_INFO: 			"Các thiết bị khác có thể kết nối đến router bằng WPS với mã Pin của router.",
			ENABLE_ROUTE_PIN: 			"Mã PIN của Router",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Tạo",
			DFT: 						"Mặc định",

			TITLE: 						"Thuật sỹ WPS",
			SELECT_SETUP: 				"Chọn một phương pháp cài đặt",
			PUSH_BTN: 					"Nhấn nút (Khuyến nghị)",
			PUSH_DES: 					"Nhấn nút kết nối vật lý trên router hoặc nhấn nút \"Kết nối\" tại trang này.",
			CONNECT: 					"Kết nối",
			CANCEL: 					"Hủy",

			RESULT_HEAD: 				"Máy khách không dây",
			RESULT_END: 				"đã được thêm vào mạng thành công",
			NOT_FOUND: 					"Không tìm thấy máy khách nào quanh đây. Bấm nút để thử lại.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Không tìm thấy",
			ENTER_CLIENT_PIN: 			"Nhập mã PIN máy khách",
			SWITCH_NOTE:				"Để kết nối sử dụng WPS, vui lòng bật tính năng không dây bằng nút WIFI.",
			SWITCH_NOTE2:				"Để sử dụng thuật sỹ WPS, bạn cần phải cầu hình thông số không dây chính xác trước.",
			STATUS_PIN_ERROR: 			"Mã PIN WPS không hợp lệ? Vui lòng kiểm tra",
			STATUS_ERROR: 				"Lỗi.",
			STATUS_CONN_ERROR: 			"Kết nối thất bại.",
			STATUS_CONNING: 			"Đang kết nối...",
			STATUS_CANCEL: 				"Đã hủy kết nối.",
			
			NOTE: 						"Lưu ý:",
			BUTTON: 					"Nút WIFI đã tắt",
			ENABLE: 					"Tính năng không dây chưa được kích hoạt",
			HIDDEN: 					"Giấu SSID đã bật",
			ENCRYPTION: 				"Mã hóa không chính xác",
			WPS: 						"Đã vô hiệu hóa WPS trong trang Thông số hệ thống",

			
			STATUS_CONN_OVERLAP: 		"Kết nối thất bại (Chồng lấp).",
			STATUS_CONN_TIMEOUT: 		"Kết nối thất bại (Hết giờ).",
			STATUS_CONN_INACT: 			"Kết nối không được kích hoạt."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Máykhách không dây trực tuyến",
			CLIENT_NUMBER: 				"Số lượng máy khách",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			CONN_TYPE: 					"Dạng kết nối",
			SECURITY: 					"Bảo mật",
			RECEIVED_PACKETS: 			"Gói tin đã nhận",
			SEND_PACKETS: 				"Gói tin đã gửi"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Cài đặt",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Cho phép thiết bị trong  Mạng khách liên lạc",

			ALLOW_LOCAL: 				"Cho phép máy khách truy cập mạng nội bộ của tôi",
			
			WIRELESS: 					"Không dây",
			WIRELESS_24G_RADIO: 		"Không dây 2.4GHz",
			WIRELESS_5G_RADIO: 			"Không dây 5GHz",
			ENABLE_GUEST: 				"Kích hoạt Mạng khách",

			NAME_SSID: 					"Tên mạng không dây (SSID)",
			HIDE_SSID: 					"Giấu SSID",
			PASSWORD_CHANGE_CYCLE: 		"Khoảng thời gian cập nhật mật mã",
			PER_DAY: 					"Mỗi ngày",
			PER_WEEK: 					"Mỗi tuần",
			PER_MONTH: 					"Mỗi tháng",
			NEVER: 						"Không bao giờ",
			SECURITY: 					"Bảo mật",
			NO_SECURITY: 				"Không bảo mật",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Cá nhân",

			VERSION: 					"Phiên bản",
			AUTO: 						"Tự động",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Mã hóa",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Mật mã"
		},

		NAT:{
			SETTINGS: 					"NAT phần cứng",
			STATUS: 					"NAT phần cứng",
			
			ALG_TITLE: 					"Gateway lớp ứng dụng (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP Passthrough",
			L2TP_ALG: 					"L2TP Passthrough",
			IPSEC_ALG: 					"IPSec Passthrough",

			ENABLE_FTP_ALG: 			"Kích hoạt FTP ALG",
			ENABLE_TFTP_ALG: 			"Kích hoạt TFTP ALG",
			ENABLE_H323_ALG: 			"Kích hoạt H323 ALG",
			ENABLE_RTSP_ALG: 			"Kích hoạt RTSP ALG",
			ENABLE_PPTP_ALG: 			"Kích hoạt PPTP Passthrough",
			ENABLE_L2TP_ALG: 			"Kích hoạt L2TP Passthrough",
			ENABLE_IPSEC_ALG: 			"Kích hoạt IPSec Passthrough",
			NAT_ENABLE_NOTICE: 			"Lưu ý: Cấu hình của bạn sẽ không có hiệu lực cho đến khi chức năng NAT được kích hoạt."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Máy chủ ảo",

			SERVICE_NAME: 				"Dạng dịch vụ",
			EXTERNAL_PORT: 				"Cổng ngoài",
			INTERNAL_IP: 				"IP nội bộ",
			INTERNAL_PORT: 				"Cổng trong",
			PROTOCAL: 					"Giao thức",

			BTN_VIEW: 					"Xem các dịch vụ hiện có",

			EXSITTING_SERVICE: 			"Các dịch vụ hiện có",
			
			PROTOCAL_ALL: 				"Tất cả",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX hoặc XX)",
			EXT_PORT_TIPS: 				"(XX hoặc XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX hoặc Trống ,1-65535)",

			NOTICE:						"Xung đột với cổng quản lý từ xa. Bạn chắc chắn muốn tiếp tục?",
			NOTICE_INVALID_REMOTE:		"Quản lý từ xa không hợp lệ do cổng 80 xung đột với máy chủ ảo. Vui lòng thay đổi cổng quản lý từ xa.",
			NOTICE_ENTER_ANOTHER:		"Xung đột với cổng quản lý từ xa. Vui lòng nhập một cổng khác.",
			NOTICE_PPTP_CONFLICT:		"Xung đột với cổng VPN PPTP. Vui lòng chọn một cổng khác.",
			NOTICE_OPENVPN_CONFLICT:	"Xung đột với cổng OPENVPN. Vui lòng chọn một cổng khác.",


			ENABLE_THIS_ENTRY: 			"Kích hoạt",
			OPERATION: 					"Hoạt động",
			CHOOSE: 					"Chọn",
			NAT_ENABLE_NOTICE: 			"Lưu ý: Cấu hình của bạn sẽ không có hiệu lực cho đến khi chức năng NAT được kích hoạt."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Kích hoạt cổng",
			APPLICATION: 				"Ứng dụng",
			TRIGGER_PORT: 				"Cổng kích hoạt",
			TRIGGER_PROTOCOL: 			"Giao thức kích hoạt",

			EXTERNAL_PORTS: 			"Cổng ngoài",
			EXTERNAL_PROTOCOL: 			"Giao thức mở rộng",

			BTN_VIEW: 					"Xem ứng dụng hiện có",

			EXSITTING_APPLICATION: 		"Ứng dụng hiện có",
			APPLICATION_NAME: 			"Tên ứng dụng",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX hoặc XX-XX,1-65535,nhiều nhất 5 cặp)",
			
			NOTICE_PPTP_CONFLICT:		"Xung đột với cổng VPN PPTP. Vui lòng chọn một cổng khác.",
			NOTICE_OPENVPN_CONFLICT:	"Xung đột với cổng OPENVPN. Vui lòng chọn một cổng khác.",
			
			ENABLE_THIS_ENTRY: 			"Kích hoạt",
			OPERATION: 					"Hoạt động",
			
			PROTOCAL_ALL: 				"Tất cả",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Lưu ý: Cấu hình của bạn sẽ không có hiệu lực cho đến khi chức năng NAT được kích hoạt."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Kích hoạt DMZ",
			HARDWARESTATUS: 			"Địa chỉ IP máy chủ DMZ",
			NAT_ENABLE_NOTICE: 			"Lưu ý: Cấu hình của bạn sẽ không có hiệu lực cho đến khi chức năng NAT được kích hoạt."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"Danh sách dịch vụ UPnP",
			CLIENT_NUMBER: 				"Số lượng máy khách",
			SERVICE: 					"Mô tả dịch vụ",
			EXTERNAL_PORT: 				"Cổng ngoài",
			PROTOCAL: 					"Giao thức",
			IP_ADDR: 					"Địa chỉ IP nội bộ",
			INTERNAL_PORT: 				"Cổng trong",
			NAT_ENABLE_NOTICE: 			"Lưu ý: Cấu hình của bạn sẽ không có hiệu lực cho đến khi chức năng NAT được kích hoạt."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"Modem USB",
			LOCATION: 					"Vị trí",
			MOBILE_ISP: 				"Mobile ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Chế độ kết nối",
			CONNECT_ON_DEMAND: 			"Kết nối theo yêu cầu",
			CONNECT_AUTOMATICALLY: 		"Kết nối tự động",
			CONNECT_MANUALLY: 			"Kết nối thủ công",
			MAX_IDLE_TIME: 				"Thời gian nghỉ tối đa",
			CONNECTION_TIP: 			"Truy cập Internet hiện tại là Ưu tiên WAN",
			IDLE_TIME_TIP: 				"Chế độ kết nối và Thời gian nghỉ tối đa không thể cấu hình thủ công",
			MINUTES: 					"phút. (0 nghĩa là luôn kích hoạt.)",

			AUTHENTICATION_TYPE: 		"Dạng xác thực",
			AUTO: 						"Tự động",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Giá trị mặc định là Tự động, vui lòng không thay đổi trừ trường hợp cần thiết",

			CONNECT: 					"Kết nối",
			DISCONNECT: 				"Ngắt kết nối",

			SET_TIP: 					"Đặt số quay, APN, Tên đăng nhập và Mật mã thủ công.",
			DIAL_NUMBER: 				"Số quay",
			APN: 						"APN",
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			OPTIONAL: 					"(Tùy chọn)",
			MTU_SIZE: 					"Kích thước MTU (bằng byte)",
			MTU_SIZE_TIP: 				"Giá trị mặc định là 1480, vui lòng không thay đổi trừ khi thật sự cần thiết.",

			USE_FOLLOW_DNS_SERVER: 		"Sử dụng địa chỉ DNS sau",
			PRIMARY_DNS: 				"DNS thứ nhất",
			SECOND_DNS: 				"DNS thứ hai",

			UNPLUGGED: 					"Đã tháo",
			IDENTIFYING: 				"Đang nhận dạng...",
			IDENTIFY_SUCCESS: 			"Nhận dạng thành công"
		},

		DISK_SETTING: {
			DISK_SET: 					"Cài đặt thiết bị",
			SCAN: 						"Quét",
			SELFLY_REMOVE: 				"Tháo an toàn",
			SCAN_RESULT: 				"Đã tìm thấy %n đĩa",
			NOT_FOUND: 					"Không tìm thấy",
			SELFLY_REMOVE: 				"Tháo an toàn",
			
			VOLUMN: 					"Nhãn",
			CAPACITY: 					"Dung lượng",
			FREESPACE: 					"Dung lượng trống",
			USBSPACE: 					"Dung lượng đã sử dụng",
			
			STATUS: 					"Trạng thái",
			INACT: 						"Không kích hoạt",
			ACTIVE: 					"Kích hoạt",
			
			USAGE: 						"Sử dụng",
			CAPACITY: 					"Dung lượng",
			OPERATION: 					"Hoạt động",	
			
			ACC: 						"Tài khoản quản lý", 	 	
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			USE_LOGIN: 					"Sử dụng đăng nhập người dùng",
			SCAN: 						"Quét",
			ENJECT_ALL: 				"Tháo tất cả",
			ENJECT: 					"Tháo",
			ADD_USER: 					"Thêm người dùng",
			AUTH: 						"Quyền"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Tải offline",
			ITEMS:						"Mục",
			FILE:						"Tập tin",
			FOLDER:						"Thư mục",
			SIZE:						"Kích thước",
			STATUS:						"Trạng thái",
			DOWNLOAD:					"Tải về",
			REMAINTING:					"Thời gian còn lại",
			SPEED:						"Tốc độ",
			SOURCE:						"Nguồn",	
			DOWNLOADTO:					"Tải về",	
			TORRENT_PC:					"Torrent từ PC",
			TORRENT_USB:				"Torrent từ USB",
			SOURCE_URL:					"RL",	
			URL:						"RL",	
			AMULE:						"aMule",
			AMULETCP:					"Cổng TCP aMule",
			AMULEUDP:					"Cổng UDP aMule",
			AMULESERVER:				"Máy chủ aMule",
			SCHEDULE:					"Thời gian biểu",
			MAXACTIVE:					"Số tác vụ kích hoạt tối đa",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Múi giờ",
			DOWNLOADTIME:				"Thời gian tải về",
			REPEAT:						"Lặp lại",
			SPEEDLIMIT:					"Giới hạn tốc độ",
			MAXDOWNLOAD:				"Tốc độ tải xuống tối đa",
			MAXUPLOAD:					"Tốc độ tải lên tối đa",
			SPEEDTIPS:					"(0 nghĩa là không giới hạn)",
			BTPORT:						"Cổng tải xuống BT",
			SEED:						"Giữ Seeding sau khi công việc hoàn tất",
			UNIT:						"KB/S",
			MODIFY:						"Tùy chỉnh",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Vị trí torrent",
			CONNECT:					"Đã kết nối",
			DISCONNECTED:				"Đã ngắt kết nối",
			CONNECTING:					"Đang kết nối",
			GENERAL:					"Tổng quan",
			COMPLETED:					"Hoàn tất",
			NEWDEVICE:					"Thiết bị mới",
			FOUNDUSB:					"Đã phát hiện một USV mới",
			CONNECTEDPEERS:				"Đã kết nối điểm",
			OF:							"của",
			NUM_OF_CON:					"Số kết nối",
			NUM_OF_CON_G:				"Số kết nối toàn cầu tối đa",
			NUM_OF_CON_PT:				"Số điểm kết nối trên Torrent tối đa",
			EN_DHT_NET:					"Kích hoạt mạng DHT",
			EN_PE_EX:					"Kích hoạt trao đổi điểm",
			EN_BT:						"Kích hoạt mã hóa giao thức BitTorrent",
			GENERAL_SETTINGS:			"Cài đặt chung",
			BT_SETTINGS:				"Cài đặt BT",
			AMULE_SETTINGS:				"Cài đặt aMule",
			CLEAN:						"Xóa hoàn tất",
			NONE_COMPLETE: 				"Tác vụ chưa hoàn thành."
		},

		FOLDER: {
			TITLE: 						"Cài đặt chia sẻ",
			ACCOUNT_TITLE: 				"Tài khoản chia sẻ",
			ACCOUNT:					"Tài khoản",
			AC_NOTE: 					"Chuẩn bị một tài khoản để chia sẻ nội dung. Bạn có thể sử dụng tài khoản đăng nhập hoặc tạo tài khoản mới.",
			
			AC_LOGIN: 					"Sử dụng tài khoản mặc định",
			AC_FOLLOW: 					"Sử dụng tài khoản mới",

			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",
			CONFIRM: 					"Xác nhận mật mã",

			SHARING_SETTING: 			"Cài đặt chia sẻ",
			SERVER_NAME: 				"Tên Mạng/Máy chủ đa phương tiện",

			METHOD: 					"Phương thức truy cập",
			LINK: 						"Đường dẫn",
			PORT: 						"Cổng",

			NETWORK_NEIGHBORHOOD: 		"Mạng lân cận",
			FTP: 						"FTP",
			FTPEX: 						"FTP (Qua Internet)",

			SHARE_FOLDER: 				"Chia sẻ thư mục",
			SHAREING_ALL: 				"Chia sẻ tất cả",
			NOTE:  						"Chuyển sang Mở để chia sẻ tất cả tập tin và thư mục hoặc giữ giá trị Tắt để chỉ  chia sẻ các thư mục xác định.", 
			ENABLE_AUTHENTICATION: 		"Kích hoạt xác thực",
			SHAREING_FOLDER: 			"Thư mục chia sẻ",
			
			SHARE_NAME: 				"Tên thư mục",
			FOLDER_PATH: 				"Đường dẫn thư mục",
			VOLUMN_NAME: 				"Tên nhãn",

			SHARE_NAME: 				"Tên thư mục",
			FOLDER_PATH: 				"Đường dẫn thư mục",
			MEDIA_SHARING: 				"Chia sẻ đa phương tiện",
			STATUS: 					"Trạng thái",

			GUEST_ACCESS: 				"Cho phép truy cập Mạng khách",
			ENABLE_AUTHENTICATION: 		"Kích hoạt xác thực",
			ENABLE_WRITE_ACCESS: 		"Kích hoạt cho phép thay đổi",
			ENABLE_MEDIA_SHARE: 		"Kích hoạt Chia sẻ đa phương tiện",
			
			BROWSE: 					"Duyệt",
			BROWSE_TITLE: 				"Chọn một thư mục",

			NO_VOLUMN:					"Không nhãn",
			
			NOTICE: 					"Bạn chắc chắn muốn thoát đến trang DNS động? Bấm chọn Lưu để lưu và thoát.Nhấn Thoát để thoát mà không lưu. Nhấn Hủy để ở lại trang này.",
			NO_CHANGE_NOTICE: 			"Bạn chắc chắn muốn thoát đến trang DNS động? Bấm chọn Lưu để lưu và thoát.",

			SAVE_FAILED_NOTICE: 		"Lưu thất bại",
			CONTINUE: 					"Thoát",
			CONTINUE_SAVE: 				"Lưu",
			CANCLE: 					"Hủy",

			ENABLE: 					"Kích hoạt"

		},

		PRINT:{
			TITLE: 						"Máy chủ in ấn",
			NAME: 						"Tên máy in",
			ENABLE_PRINT_SERVER: 		"Máy chủ in ấn",
			NONE: 						"Không",
			
			NOTE_TITLE: 				"Lưu ý:",
			STEP1: 						"Bước 1:",
			STEP2: 						"Bước 2:",
			STEP3: 						"Bước 3:",

			NOTE1: 						"Cài đặt driver máy in cho máy tính của bạn",
			NOTE2: 						"Kết nối cổng USB máy in đến cổng USB của router bằng cáp USB.",
			NOTE3: 						"Cài đặt Tiện ích điều khiển máy in cổng USB của TP-LINK. Vui lòng tải về từ website chínhthức của chúng tôi: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/vn/Support/\">http://www.tp-link.com/vn/Support/</a>.",
			NOTE3_US: 					"Cài đặt Tiện ích điều khiển máy in USB của TP-LINK. Vui lòng tải về từ trang web chính thức của chúng tôi: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Quyền kiểm soát của phụ huynh",
			STATUS: 					"Quyền kiểm soát của phụ huynh",
			UNKNOWN: 					"Không rõ",

			DEVICE_CTR: 				"Thiết bị dưới Quyền kiểm soát của phụ huynh",
			DEVICE: 					"Tên thiết bị",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			TIME: 						"Thời gian truy cập Internet",
			DESCRIPTION: 				"Mô tả",
			
			ENABLE_THIS_ENTRY: 			"Kích hoạt",
			OPTIONAL: 					"(Tùy chọn)",
			BTN_VIEW: 					"Xem thiết bị hiện có",
			
			DEVICE_LIST: 				"Danh sách thiết bị",
			SYSTEM_TIME: 				"Thời gian hệ thống",
			
			RESTR: 						"Nội dung giới hạn",
			MODE: 						"Giới hạn",
			BLACKMODE: 					"Sổ đen",
			WHITEMODE: 					"Sổ trắng",
			ACCESS_DEVICES_LIST: 		"Danh sách thiết bị truy cập",
			
			CHOOSE: 					"Chọn",
			ADD_A_NEW_KEYWORD: 			"Thêm một Từ khóa để Chặn",
			ADD_A_NEW_DOMAIN_NAME: 		"Thêm một Tên miền mới để Truy cập",
			
			YOURPC:						"Máy tính của bạn"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internet",
			ROUTER: 					"Router",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Khác",

			DEVICE: 					"Thiết bị",
			RATE: 						"Đánh giá",
			APPLICATION: 				"Ứng dụng",

			NAME: 						"Tên",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			IP_ADDRESS: 				"Địa chỉ IP",


			DEVICES: 					"Thiết bị"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Băng thông",
			TEST_BANDWIDTH: 			">Kiểm tra băng thông",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Kích hoạt streamboost",
			UP_LIMITATION: 				"Giới hạn tải lên (Mbps)",
			DOWN_LIMITATION: 			"Giới hạn tải xuống (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Chạy kiểm tra băng thông",
			TESTING: 					"Đang kiểm tra",
			TEST_FAILED: 				"Kiểm tra thất bại",
			TEST_SUCCEED: 				"Kiểm tra thành công",
			ENABLE_AUTOMATIC_TEST: 		"Kích hoạt kiểm tra tự động",
			KEEP_UP_TO_DATE: 			"Cập nhật StreamBoost",
			ENABLE_AUTOMATIC_UPDATE: 	"Kích hoạt Câp nhật tự động"

		},

		PRIORITY:{
			PRIORITY: 					"Độ ưu tiên",
			PRIORITY_TIPS: 				"Độ ưu tiên cho phép bạn thay đổi tầm quan trọng của một thiết bị với thiết bị khác. Ứng dụng này rất hữu ích khi thiết bị đang tranh băng thông với ứng dụng cùng phân lớp",
			ALL_DEVICE: 				"Tất cả thiết bị",
			ACTIVE_DEVICE: 				"Thiết bị kích hoạt",
			SAVE: 						"Lưu",
			ID: 						"STT",
			DEVICE: 					"Thiết bị",
			TYPE: 						"Dạng",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			STICK: 						"Dán"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Thống kê",
			UP_TIME: 					"Thời gian hoạt động",
			DOWNLOADS: 					"Tải về",
			LAST_DAY: 					"Ngày hôm qua",
			LAST_WEEK: 					"Tuần trước",
			LAST_MONTH: 				"Tháng trước",
			ALL_LAN_HOSTS: 				"Tất cả máy chủ LAN",
			OTHER: 						"Khác"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Tường lửa",
			ENABLE_SPI: 				"Tường lửa SPI",

			DOS_PROTECTION: 			"Bảo vệ DoS",
			ENABLE_DOS: 				"Bảo vệ DoS",
			
			OFF: 						"Tắt",
			LOW: 						"Thấp",
			MIDDLE: 					"Trung bình",
			HIGH: 						"Cao",

			ICMP: 						"Lọc tấn công ICMP-FLOOD",
			UDP: 						"Lọc tấn công UDP-FLOOD",
			TCP: 						"Lọc tấn công TCP-SYN-FLOOD",
			ENABLE_DOS_TIP:             "Bảo vệ DoS và Thống kê lưu lượng cần được kích hoạt cùng lúc.",

			IGNORE: 					"Bỏ qua gói tin Ping từ cổng WAN",
			FORBID: 					"Cấm gói tin Ping từ cổng LAN",

			BLOCK_DOS: 					"Danh sách máy chủ DoS bị chặn",
			HOST_NUMBER: 				"Số máy chủ",
			IP_ADDRESS: 				"Địa chỉ IP",
			MAC_ADDRESS: 				"Địa chỉ MAC"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Kiểm soát truy cập",
			ENABLE_ACCESS: 				"Kiểm soát truy cập",

			ACCESS_MODE: 				"Chế độ truy cập",
			DEFAULT_ACCESS_MODE: 		"Chế độ truy cập mặc dịnh",
			BLACK_LIST: 				"Sổ đen",
			WHITE_LIST: 				"Sổ trắng",
			
			WIRED:						"Có dây",
			WIRELESS:					"Không dây",

			DEVICE_ONLINE: 				"Thiết bị trực tuyến",
			NAME: 						"Tên thiết bị",
			IP_ADDRESS: 				"Địa chỉ IP",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			CONN_TYPE: 					"Dạng kết nối",

			BLOCK: 						"Khóa",

			DEVICE_IN_WHITE: 			"Thiết bị trong Sổ trắng",
			DEVICE_IN_BLACK: 			"Thiết bị trong Sổ đen"
		},

		IP_MAC:{
			TITLE: 						"Cài đặt",
			ENABLE_ARP: 				"Kết hợp ARP",

			ARP_LIST: 					"Danh sách ARP",
			ARP_NUM: 					"Số mục ARP",

			MAC_ADDRESS: 				"Địa chỉ MAC",
			IP_ADDRESS: 				"Địa chỉ IP",
			BOUND: 						"Kết hợp",
			UNBOUND: 					"Tháo",

			BINDING_LIST: 				"Danh sách kết hợp",
			DESCRIPTION: 				"Mô tả",
			OPTIONAL: 					"(Tùy chọn)",
			ENABLE_THIS_ENTRY: 			"Kích hoạt"
		},

		TIMESET: {
			TITLE: 						"Cài đặt thời gian",
			ZONE: 						"Vùng thời gian",
			DATE: 						"Ngày",
			DATEFORMAT: 				"MM/DD/YYYY",
			TIME: 						"Giờ",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"Máy chủ NTP I",
			NTP2: 						"Máy chủ NTP II",
			OPTIONAL: 					"(Tùy chọn)",

			CURRENT_TIME:  				"Thời gian hiện tại",
			SET_TIME: 					"Đặt thời gian",
			AUTOMATIC: 					"Lấy tự động từ Internet",
			MANUAL: 					"Thủ công",
			AUTOMATIC_BTN: 				"Lấy",


			GETGMT: 					"Lấy GMT",

			
			GETGMT_SUCCESS: 			"Lấy thời gian từ máy chủ NTP thành công",
			GETGMT_TIMEOUT: 			"Hết thời gian lấy thời gian từ máy chủ NTP",
			GETGMT_WAIT: 				"Đang đợi",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Chế độ tiết kiệm",
			ENABLE_DAYLIGHT: 			"Kích hoạt Chế độ tiết kiệm",
			START: 						"Bắt đầu",
			END: 						"Kết thúc",

			RUNNING_STATUS: 			"Trạng thái hoạt động",
			DOWN: 						"Chế độ tiết kiệm đã tắt",
			UP: 						"Chế độ tiết kiệm đã mở"
		},

		DIAG:{
			TITLE: 						"Chẩn đoán",
			DIAGNOSTIC_TOOL: 			"Công cụ chẩn đoán",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"Địa chỉ IP/ Tên miền",
			COUNT: 						"Đếm Ping",
			
			BASIC: 						"Cơ bản",
			ADVANCED: 					"Nâng cao",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Kích thước gói tin Ping",
			PKTUNIT: 					"(4-1472 Bytes)",

			TIMEOUT: 					"Ping Timeout",
			TIMOUTUNIT: 				"(100-2000 Mili giây)",

			TTL: 						"Traceroute Max TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Bắt đầu",
			STOP: 						"Dừng"
		},

		FIRMWARE:{
			TITLE: 						"Nâng cấp Firmware",
			FIRMWARE_INFO:  			"Firmware đã được cập nhật",
			INFO: 						"Thông tin thiết bị",
			REMOTE_TITLE: 				"Nâng cấp trực tuyến",
			LOCAL_TITLE: 				"Nâng cấp cục bộ",

			NEWFILE: 					"Tập tin Firmware mới",
			FIRMWAREVERSION: 			"Phiên bản Firmware",
			HARDWAREVERSION: 			"Phiên bản Phần cứng",
			LATESTVERSION: 				"Phiên bản mới nhất",
			CONFIRM_CONTENT:			"Bạn chắc chắn muốn nâng cấp firmware?",
			WARNING:					"Đang nâng cấp firmware…<br/> Để tránh hư hại, vui lòng giữ nguồn thiết bị và không thực hiện bất cứ thao tác nào trong quá trình này.",
			REBOOTING: 					"Đang khởi động lại… <br/> Để tránh hư hại, vui lòng giữ nguồn thiết bị và không thực hiện bất cứ thao tác nào trong quá trình này.",
			DO_NOT_OPERATE: 			"Đang nâng cấp...<br/>Vui lòng không thực hiện hoạt động khác trong quá trình này.",
			FIRMWARE_UPDATING_NOTE: 	"1. Đang nâng cấp firmware…",
			REBOOTING_NOTE: 			"2. Đang khởi động lại…",
			SCREEN_UPDATING_NOTE: 		"3. Đâng cập nhật màn hình…",
			UPGRADE_FAILED: 			"Nâng cấp thất bại.",
			UPGRADE: 					"Nâng cấp",
			CHECK: 						"Kiểm tra",
			DOWNLOADING: 				"Đang tải…",
			UPGRADE_INOF: 				"Để tránh hư hại, vui lòng giữ nguồn router.",
			NOTE: 						"Lưu ý:",
			NO_UPGRADE: 				"Đây là phên bản mới nhất",

			UPGRADING: 					"Đang nâng cấp …",
			RETRY: 						"Thử lại",
			CANCEL: 					"Hủy",
			ILEGAL_DEVICE:				"Không thể nhận dạng thiết bị. Vui lòng liên hệ kỹ thuât của TP-LINK để được hỗ trợ.",
			UPGRADE_FAIL: 				"Không thể nâng cấp. Vui lòng thử lại sau.",
			CHECK_UPGRADE:				"Kiểm tra để nâng cấp"
		},

		BACKUP:{
			BACKUP: 					"Sao lưu",
			BACKUPTIP: 					"Lưu một bản sao chép cài đặt hiện tại của bạn.",

			RESTORE: 					"Khôi phục",
			RESTORETIP: 				"Khôi phục cài đặt đã lưu từ tập tin.",
			
			RESTORE_WARN:				"Router đang khôi phục... <br/>Vui lòng không thực hiện hành độnh khác trong quá trình này.",
			RESTORE_CONFIRM_CONTENT: 	"Bạn chắc chắn muốn khôi phục cài đặt cho router từ tập tin sao lưu?",
			
			FILE: 						"Tập tin",

			FACTORY: 					"Khôi phục cài đặt mặc định",
			FACTORYTIP: 				"Khôi phục tất cả cài đặt cấu hình về giá trị mặc định.",
			FACTORY_CONFIRM_CONTENT:	"Bạn chắc chắn muốn khôi phục router về cài đặt gốc?",
			FACTORY_WARN:				"Router đang khôi phục... <br/>Vui lòng không thực hiện hành độnh khác trong quá trình này.",
			
			BACKUPBTN: 					"Sao lưu",
			RESTOREBTN: 				"Khôi phục",
			FACTORYBTN: 				"Khôi phục cài đặt gốc"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Tài khoản quản lý",
			
			OLDUSER: 					"Tên đăng nhập cũ",
			OLDPWD: 					"Mật mã cũ",

			NEWUSER: 					"Tên đăng nhập mới",
			NEWPWD: 					"Mật mã mới",
			CONFIRM: 					"Xác nhận mật mã mới",

			RECOVERYINFO: 				"Khôi phục mật mã",
			ENABLE_PASSWORD_RECOVERY: 	"Kích hoạt khôi phục mật mã",
			FROM: 						"Từ",
			TO: 						"Đến",
			SMTP_SERVER: 				"Máy chủ SMTP",
			
			ENABLE_AUTHENTICATION: 		"Kích hoạt xác thực",
			USERNAME: 					"Tên đăng nhập",
			PASSWORD: 					"Mật mã",

			TEST_MAIL: 					"Kiểm tra thư",

			LOCAL:						"Quản lý nội bộ",
			LOCAL_MAC_AUTH: 			"Xác thực MAC nội bộ",
			ACCESS: 					"Cho tất cả thiết bị kết nối từ LAN truy cập",
			ACCESS_TIPS: 				"Chuyển sang Mở để kích hoạt chế độ quản lý cho tất cả thiết bị trong mạng LAN hoặc giữ giá trị Tắt để kích hoạt quản lý đối với một thiết bị xác định.",
			
			MAC_ADDRESS: 				"Địa chỉ MAC",
			VIEW_BTN: 					"Xem thiết bị hiện có",
			DESCRIPTION: 				"Mô tả",

			EXIST_DEVICE:               "Thiết bị hiện có",

			OPTIONAL: 					"(Tùy chọn)",
			ENABLE_THIS_ENTRY: 			"Kích hoạt",

			DEVICE_NAME:				"Tên thiết bị",
			IP_ADDRESS:					"Địa chỉ IP",
			

			REMOTE: 					"Quản lý từ xa",
			DISABLE_REMOTE_MANAGEMENR: 	"Vô hiệu hóa quản lý từ xa",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Kích hoạt quản lý từ xa cho tất cả thiết bị",
			ENABLE_REMOTE_MANAGEMENR: 	"Kích hoạt quản lý từ xa Các thiết bị xác định",
			WEB: 						"Cổng quản lý Web",

			NOTICE:						"Xung đột với cổng máy chủ ảo! Bạn chắc chắn muốn tiếp tục?",
			NOTICE_ENTER_ANOTHER:		"Xung đột với cổng máy chủ ảo. Vui lòng nhập cổng khác.",

			REMOTEIP: 					"Địa chỉ IP quản lý từ xa",
			REMOTEIPNOTE: 				"(Nhập 255.255.255.255 cho tất cả)"
			
		},

		SYSLOG:{
			TITLE: 						"Bản ghi hệ thống",
			LOG_FILTER: 				"Lọc bản ghi:",
			
			TYPE_EQ: 					"Dạng=",
			
			ALL: 						"Tất cả",

			FIREWALL: 					"Tường lửa", 
			NAT: 						"NAT",
			DDNS: 						"DNS động",
			UPNP:						"UPnP",
			IMB:            			"Kết hợp IP & MAC",
			IPTV:						"IPTV",
			DHCPS:						"Máy chủ DHCP",
			IGMP_PROXY:					"IGMP Proxy",
			DOMAIN_LOGIN:				"Tên miền đăng nhập",
			BASIC_SECURITY: 			"Bảo mật cơ bản",
			PARENTAL_CONTROL: 			"Quyền kiểm soát của phụ huynh",
			ACCESS_CONTROL: 			"Kiểm soát truy cập",
			DOS_PROTECTION: 			"Bảo vệ DoS",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Thống kê lưu lượng",
			TIME_SETTINGS: 				"Cài đặt thời gian",
			ACCOUNT_MANAGEMENT: 		"Tài khoản quản lý",
			LOCAL_MANAGEMENT: 			"Quản lý nội bộ",
			REMOTE_MANAGEMENT: 			"Quản lý từ xa",
			LOCALE: 					"Cục bộ",
			FACTORY_RESET: 				"Khôi phục cài đặt gốc",
			LED_CONTROLLER: 			"Bộ điều khiển Led",
			NETWORK: 					"Mạng",
			USBSHARE: 					"Chia sẻ USB",
			AND: 						"và",
			LEVEL: 						"Cấp",
			EMERGENCY:					"KHẨN CẤP",
			ALERT:						"BÁO ĐỘNG",
			CRITICAL:					"QUAN TRỌNG",
			ERROR: 						"LỖI",
			WARNING: 					"CẢNH BÁO",
			NOTICE: 					"LƯU Ý",
			INFO: 						"THÔNG TIN",
			DEBUG: 						"DEBUG",

			INDEX: 						"Số thứ tự",
			TYPE: 						"Dạng",
			TIME: 						"Giờ",
			LEVEL_COL:					"Cấp",

			CONTENT: 					"Nội dung bản ghi",
			
			MAIL_LOG: 					"Thư bản ghi",
			SAVE_LOG: 					"Lưu bản ghi",

			SEND_OK: 					"Gửi OK",
			SEND_FAILED: 				"Gửi thất bại",

			MAIL_SETTING: 				"Cài đặt thư",

 			FROM: 						"Từ",
 			TO: 						"Đến",
 			SMTP_SERVER: 				"Máy chủ SMTP",
 			ENABLE_AUTHENTICATION: 		"Kích hoạt xác thực",

 			USERNAME: 					"Tên đăng nhập",
 			PASSWORD: 					"Mật mã",
 			CONFIRM_PASSWORD: 			"Xác nhận mật mã",

 			AUTO_MAIL: 					"Kích hoạt thư tự động",
 			LOG_AT: 					"Bản ghi tại",
 			HH_MM: 						"(HH:MM) mọi ngày",

 			LOG_EVERY: 					"Bản ghi mọi",
 			HOURS: 						"giờ"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Cài đặt",
			STATUS: 					"Kích hoạt QoS",
			UPBANDWIDTH: 				"Băng thông tải lên",
			DOWNBANDWIDTH: 				"Băng thông tải xuống",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Kiểm tra tốc độ",
			RULE_LIST: 					"Danh sách điều luật QoS",
			RULE: 						"Điều luật QoS",
			ID: 						"STT",
			NAME: 						"Tên",
			TYPE: 						"Dạng",
			DETAIL: 					"Chi tiết",
			PRIORITY: 					"Ưu tiên",

			APPLICATION: 				"Ứng dụng",
			APPLICATION_LIST: 			"Danh sách ứng dụng",
			CUSTOM_APP: 				"Ứng dụng tùy chỉnh",
			MAC_ADDR: 					"Địa chỉ MAC",
			MAC_ADDR_P: 				"Mac:",
			IP_ADDR: 					"Địa chỉ IP",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Cổng vật lý",

			LOW: 						"Thấp",
			MIDDLE: 					"Trung bình",
			HIGH: 						"Cao",

			PROTO: 						"Giao thức",
			PORT: 						"Cổng",
			PROTO_P: 					"Giao thức:",
			PORT_P: 					"Cổng:",
			PORT_TIPS: 					"(XX hoặc XX-XX,1-65535,nhiều nhất là 5 cặp)",

			ALL: 						"Tất cả",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Tùy chỉnh",

			WIFI_HOME: 					"Máy chủ-WiFi",
			WIFI_GUEST: 				"Máy khách - WIFI",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Nâng cấp cơ sở dữ liệu",

			NEWFILE: 					"Tập tin cơ sở dữ liệu mới",
			FIRMWAREVERSION: 			"Phiên bản cơ sở dữ liệu",
			CONFIRM_CONTENT:			"Bạn chắc chắn muốn nâng cấp cơ sở dữ liệu?",
			WARNING:					"Cơ sở dữ liệu đang nâng cấp... <br/>Vui lòng không thực hiện hành động khác trong quá trình này.",
			
			UPGRADE: 					"Nâng cấp",

			SERVICE_RESTART: 			"Dịch vụ QoS đang khởi động lại",
			
			TYPE: 						"Dạng",
			BY_DEVICE: 					"Theo thiết bị",
			BY_APP: 					"Theo ứng dụng",
			BY_PHY: 					"Theo cổng vật lý",

			HIGH_PRIORITY_LBL: 			"Ưu tiên cao:",
			MIDDLE_PRIORITY_LBL: 		"Ưu tiên vừa:",
			LOW_PRIORITY_LBL: 			"Ưu tiên thấp:",

			HIGH_PRIORITY: 				"Ưu tiên cao",
			MIDDLE_PRIORITY: 			"Ưu tiên vừa",
			LOW_PRIORITY: 				"Ưu tiên thấp"

		},

		APPLICATION:{
			APP_LIST: 					"Danh sách ứng dụng",
			GAME_LIST: 					"Danh sách trò chơi",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Thống kê lưu lượng",
			ENABLE_STATISTICS: 			"Thống kê lưu lượng",

			TITLE: 						"Danh sách thống kê lưu lượng",
			IP_MAC: 					"Địa chỉ IP/Địa chỉ MAC",
			TPKT: 						"Tổng gói tin",
			TBYTE: 						"Tổng Bytes",
			CPKT: 						"Gói tin hiện tại",
			CBYTE: 						"Bytes hiện tại",
			CICMP: 						"ICMP Tx hiện tại",
			CUDP: 						"UDP Tx hiện tại",
			CSYN: 						"SYN Tx hiện tại",
			
			DELETE_CONFIRM: 			"Bạn chắc chắn muốn xóa thống kê lưu lượng?",
			DELETE_ALL_CONFIRM: 		"Bạn chắc chắn muốn xóa tất cả thống kê lưu lượng?",

			RESET_ALL: 					"Đặt lại tất cả"
		},

		SYSPARA:{
			W24G: 						"Không dây 2.4GHz",
			W5G: 						"Không dây 5GHz",
			W60G: 						"Không dây 60Ghz",
			W24G_WDS: 					"WDS 2.4GHz",
			W5G_WDS: 					"WDS 5GHz",
			W60G_WDS: 					"WDS 60GHz",
			SWITCH_NOTICE:  			"Chức năng không dây của bạn đã tắt. Nếu bạn muốn sử dụng chức năng này. Vui lòng mở nút Wi-Fi",

			ENABLE_TIPS: 				"Chức năng không dây đã bị vô hiệu hóa.",

			BEACON: 					"Khoảng thời gian Beacon",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"Ngưỡng RTS",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Ngưỡng phân mảnh",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"Khoảng thời gian DTIM",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Thời gian cập nhập mã nhóm",
			GROUPUNIT: 					"giây",
			
			MU_MIMO_FEATURE: 			"Đa người dùng-MIMO",
			MU_MIMO: 					"Kích hoạt MU-MIMO",
			
			WMM_FEATURE: 				"Tính năng WMM",
			WMM: 						"Kích hoạt WMM",

			GI_FEATURE: 				"Tính năng Short GI",
			GI: 						"Kích hoạt Short GI",

			AP_FEATURE: 				"Tính năng cô lập trạm không dây",
			AP: 						"Kích hoạt cô lập trạm không dây",

			WDS_FEATURE: 				"Cầu nối WDS",
			WDS: 						"Kích hoạt cầu nối WDS",
			
			SSID_BRIDEGE: 				"SSID (để bắt cầu)",
			SURVEY: 					"Khảo sát",

			SN: 						"SN",
			MAC_ADDRESS: 				"Địa chỉ MAC",
			SSID: 						"SSID",
			SIGNAL: 					"Tín hiệu",
			CHANNEL: 					"Kênh",
			SECURITY: 					"Bảo mật",
			CHOSEN: 					"Đã chọn",
			AP_NUMBER:					"Số lượng AP",

			TOTAL: 						"Tổng mục",

			MAC: 						"Địa chỉ MAC (để bắt cầu)",
			MACUNIT: 					"Ví dụ: 00-1D-0F-11-22-33",

			SECURITY: 					"Bảo mật",
			NO: 						"Không",
			NONE: 						"Không bảo mật",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Mật mã",
			
			AUTH_TYPE: 					"Dạng xác thực",
			AUTO: 						"Tự động",
			OPEN: 						"Hệ thống mở",
			SHARED: 					"Mật mã chia sẻ",

			WEP_INDEX: 					"Chỉ số WEP",
			KEY1: 						"Mã 1",
			KEY2: 						"Mã 2",
			KEY3: 						"Mã 3",
			KEY4: 						"Mã 4",

			WEP_KEY_FORMAT: 			"Định dạng mã WEP",
			ASC: 						"ASCII",
			HEX: 						"Thập lục phân",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Kích hoạt WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Kích hoạt NAT",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Kích hoạt NAT Boost",
			
			MEDIA_SERVER: 				"Máy chủ truyền thông",
			SCAN_INTERVAL: 				"Khoảng thời gian quét tự động (giờ)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"Cài đặt cấp bảo vệ DoS",

			ICMP: 						"Cấp gói tin ICMP-FLOOD",
			UDP: 						"Cấp gói tin UDP-FLOOD",
			TCP: 						"Cấp gói tin TCP-FLOOD",

			WDS_MODE: 					"Chế độ WDS",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Thấp",
			MIDDLE: 					"Trung bình",
			HIGH: 						"Cao",

			TO: 						"đến",
			NOTICE_NAT_REBOOT: 			"Đang khởi động lại... <br/>Vui lòng không thực hiện hành động khác trong quá trình này.",

			NOTICE_NAT_BOOST: 			"Thay đổi NAT Boots sẽ khởi động lại thiết bị, bạn chắc chắn muốn tiếp tục?",
			NOTICE:						"Kênh router của bạn không trùng với kênh của AP được bắt cầu. Bạn có muốn thay đổi?",

			UNIT: 						"(5-7200)Gói tin/Giây",
			LED: 						"LED",
			NIGHT_MODE: 				"Chế độ ban đêm",
			PERIOD_NIGHT_TIME: 			"Khoảng chế độ ban đêm",
			ENABLE: 					"Kích hoạt chế độ ban đêm",
			HH_MM: 						"(HH:MM)",
			TO: 						"đến",
			NIGHT_MODE_NOTE:            "Đèn LED của bạn đã tắt. Nếu bạn muốn dùng tính năng này, vui lòng bấm chọn nút LED hoặc bấm LED ở góc trên bên phải của trang này.",
			NOTE2:                      "Thời gian của chế độ ban đêm có hiệu lực dựa trên thời gian hệ thống của router.  Vui lòng đảm bảo bạn đã cài đặt thời gian của router."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Hiện không có chứng nhận, vui lòng <b>Tạo</b> một chứng nhận trước khi kích hoạt máy chủ VPN.",
			NO_CERT_NOTE2: 				"Hiện không có chứng nhận, vui lòng <b>Tạo</b> một chứng nhận trước khi xuất tập tin cấu hình.",
			ENABLE_VPN_SERVER: 			"Kích hoạt Máy chủ VPN ",
			SERVICE_TYPE: 				"Dạng dịch vụ",
			SERVICE_PORT: 				"Cổng dịch vụ",
			VPN_SUBNET: 				"Subnet/Netmask VPN",
			CLIENTS_ACCESS: 			"Truy cập máy khách",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Chỉ mạng gia đình",
			INTERNET_HOME: 				"Mạng gia đình và Internet",
			CERT_STR: 					"Hiện không có chứng nhận, bấm chọn OK để tạo một chứng nhận và lưu cấu hình của bạn.",
			CERT_STR2: 					"Hiện không có chứng nhận, bấm chọn OK để tạo một chứng nhận và xuất cấu hình của bạn.",
			CONF_FILE: 					"Tập tin cấu hình", 
			EXPORT_CONF_FILE: 			"Xuất cấu hình",
			EXPORT: 					"Xuất",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Địa chỉ IP máy khách",
			ACCOUNT_USERNAME: 			"Tên đăng nhập",
			ACCOUNT_PASSWORD: 			"Mật mã",
			CLIENT_IP_NOTE: 			"(lên đến 10 máy khách)",
			SAME_SUBNET_NOTE: 			"Địa chỉ IP máy khách và địa chỉ IP LAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập một giá trị khác.",
			CONFLICT_WITH_DHCP: 		"Địa chỉ IP máy khách xung đột với khoảng địa chỉ IP DHCP. <br/>Vui lòng nhập lại.",
			CONFLICT_WITH_RESERVED: 	"Địa chỉ IP máy khách xung đột với địa chỉ IP dành riêng. <br/>Vui lòng nhập lại.",
			CONFLICT_WITH_OPENVPN: 		"Địa chỉ IP máy khách và địa chỉ IP OpenVPN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",
			SAME_SUBNET_NOTE2: 			"Subnet/Netmask VPN và địa chỉ IP LAN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập một giá trị khác.",
			CONFLICT_WITH_DHCP2: 		"Subnet/Netmask xung đột với khoảng địa chỉ IP DHCP. <br/>Vui lòng nhập lại.",
			CONFLICT_WITH_RESERVED2: 	"Subnet/Netmask xung đột với địa chỉ IP dành riêng. <br/>Vui lòng nhập lại.",
			CONFLICT_WITH_PPTPVPN: 		"Subnet/Netmask VPN và địa chỉ IP VPN PPTP không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",
			LAN_CONFLICT_WITH_OPENVPN: 	"Địa chỉ IP LAN và địa chỉ IP OPENVPN không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"Địa chỉ IP LAN và địa chỉ IP VPN PPTP không thể nằm cùng lớp mạng. <br/>Vui lòng nhập lại.",
			VPN_MASK_ERROR: 			"Netmask không thể lớn hơn 255.255.255.248. <br/>Vui lòng nhập lại.",
			ACCOUNT_LIST: 				"Danh sách tài khoản (lên đến 16 người dùng)",
			ADVANCED_SETTING: 			"Nâng cao",
			ALLOW_SAMBA: 				"Cho phép truy cập Samba (Network Place)",
			ALLOW_NETBIOS: 				"Cho phép NetBIOS passthrough",
			ALLOW_UNENCRYPTED_CONN: 	"Cho phép kết nối không mã hóa",
			USERNAME_CONFLICT: 			"Tên đăng nhập đã tồn tại. Vui lòng nhập một giá trị khác.",
				
			NOTICE_VS_CONFLICT:			"Xung đột với cổng ngoài mạng ảo. Vui lòng nhập một cổng khác.",
			NOTICE_PT_CONFLICT:			"Xung đột với cổng ngoài cổng kích hoạt. Vui lòng nhập một cổng khác.",
			NOTICE_VS_MODIFY:			"Xung đột với cổng ngoài mạng ảo(1723). Vui lòng truy cập trang <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Mạng ảo</a> và chỉnh sửa cổng ngoài mạng ảo.",
			NOTICE_PT_MODIFY:			"Xung đột với cổng ngoài mạng ảo(1723). Vui lòng truy cập trang <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Cổng kích hoạt</a> và chỉnh sửa cổng ngoài cổng kích hoạt.",
			
			GENERATE_CERT: 				"Chứng nhận",
			GENERATE_NEW_CERT: 			"Tạo chứng nhận",
			GENERATE: 					"Tạo",
			GENERATE_TIPS: 				"Đang tạo chứng nhận… <br/>Quá trình này sẽ tốn vài phút, vui lòng đợi.",
			CERT_SUCCESS: 				"Thành công",
			CERT_FAIL: 					"Thất bại, vui lòng thử lại.",
			
			VPN_CONNECTIONS: 			"Kết nối VPN",
			OPEN_VPN_CONNECTIONS: 		"Kết nối OpenVPN",
			PPTP_VPN_CONNECTIONS: 		"Kết nối VPN PPTP",
			USER: 						"Người dùng",
			REMOTE_IP: 					"IP từ xa",
			ASSIGNED_IP: 				"IP được gán"
		}
	};
})(jQuery);
