(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			FORGET_PASSWORD: 			"忘記密碼？",
			LOGIN: 						"登入",
			IMPORTANT_UPDATE_INFO: 		"為了避免與前端設備衝突，您的路由器IP位址已經被變更為",
			CONTINUE: 					"繼續",

			IMPORTANT_NOTICE: 			"重要注意事項",
			OR: 						"，您確定要繼續拜訪",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"壓按路由器後方的Reset按鈕約10秒再放開，路由器會將設定值清空回到原廠設定。",
			FORGET_PASSWORD_INFO_1: 	"如果\"密碼復原\"功能是啟用的話，一個用於恢復使用者名稱與密碼預設值的驗證碼將會被送到您之前設定的指定電子信箱。",
			FORGET_PASSWORD_SEND_FAILED:"寄送驗證碼失敗！請檢查您的網際網路連線是否正常？",

			VERIFICATION_CODE: 			"驗證碼",

			RECEIVE_CODE: 				"送出驗證碼",

			CONFIRM: 					"確認",

			SEC: 						" ",

			USER_CONFLICT: 				"登入發生衝突！",
			FIRST_TIME: 				"歡迎使用由TP-LINK設計的Archer AD7200。首先，請創建一個設備密碼來管理它。",
			
			USER_CONFLICT_INFO: 		"使用者%USER%使用主機 %HOST% (%IP%/%MAC%) 目前已經登入本路由器。您無法在同時間登入，請稍候再試。",
			USER_CONFLICT_INFO_1: 		"使用者 %USER% (%MAC%)目前已經登入路由器。您無法同時登入。請稍後再試。",
			USER_CONFLICT_INFO_2: 		"使用者 %USER% (%IP%)目前已經登入本路由器。您無法在同時間登入，請稍候再試。",
			
			LOGIN_FAILED: 				"登入失敗！",
			LOGIN_FAILED_COUNT: 		"您已經登入失敗 %num1 次，您尚有 %num2 次的機會可以嘗試登入。",
			NO_COOKIE: 					"您必須啟用Cookies以進行登入動作。請啟用Cookies或關閉隱身(私人瀏覽)模式。", 

			FORGET_PASSWORD_NOTE: 		"如果您之前沒有設定\"密碼復原\"功能，您可以壓按路由器後方的恢復原廠預設值按鈕約10秒再放開，路由器會將設定值清空回到原廠設定。"
		},

		UPGRADE: {
			UPGRADE_NOW: 					"立刻升級",
			REMIND: 						"稍後提醒我",
			NOTICE:    						"您好，%PRODUCT%路由器有可用的新韌體囉！",
			NEVER: 							"忽略此版本"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN連線錯誤！",
			STATUS: 						"狀態",
			INFO: 							"資訊",
			SETUP: 							"設定網際網路連線",
			NEVER: 							"別再提醒我"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"韌體版本：",
			HARDWARE_VERSION: 				"硬體版本：",
			HELP_SUPPORT: 					"支援",
			FAQ: 							"問與答(FAQ)",
			CONFIRM_REBOOT: 				"您確定要重新啟動路由器嗎？",
			CONFIRM_LOGOUT: 				"您確定要登出嗎？",
			UPGRADE_ALERT_1: 				"目前的韌體不支援TP-LINK雲端服務。我們強烈建議您到www.tp-link.com下載最新韌體並更新。",
			UPGRADE_ALERT_2: 				"目前的韌體不支援TP-LINK雲端服務。我們強烈建議您透過點選位於右上角的更新圖示來更新韌體。",
			REBOOTING: 						"重新啟動中…<br/>在重新啟動程序完成前請不要進行任何操作。",

			MODE_SWITCH: 					"模式切換",
			ACCESS_POINT: 					"基地台",
			ACCESS_POINT_TIPS: 				"將有線網路轉換為無線網路。",
			ROUTER: 						"路由器",
			ROUTER_TIPS: 					"允許多重設備以有線、無線方式連接。",
			REPEATER: 						"中繼器",
			REPEATER_TIPS: 					"可以擴展您既有無線網路的訊號覆蓋範圍。",
			MODE_REBOOT_TIP: 				"修改使用模式將會使本設備重新啟動，您確定要繼續嗎？",
			MODE_FAIL_TIP: 					"模式切換失敗。請稍後再重試一次或重新啟動您的路由器。"
		},

		NAV: {
			QUICK_SETUP: 				"快速設定",
			BASIC: 						"基本設定",
			ADVANCED: 					"進階設定"
		},

		CONTROL: {
			MODE: 						"模式",
			LOGIN: 						"登入",
			LED:                        "LED",
			LED_ON:                     "LED開啟",
			LED_OFF:                    "LED關閉",			
			LED_DISABLED:               "在夜間模式期間，LED狀態無法改變。",			
			LOGOUT: 					"登出",
			UPDATE: 					"更新",
			REBOOT: 					"重新啟動"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"阿爾巴尼亞",
			ALGERIA: 					"阿爾及利亞",
			AMERICAN_SAMOA: 			"美屬薩摩亞群島",
			ARGENTINA: 					"阿根廷",
			ARMENIA: 					"亞美尼亞",
			ARUBA: 						"阿魯巴國",
			AUSTRALIA: 					"澳大利亞",
			AUSTRIA: 					"奧地利",
			AZERBAIJAN: 				"亞塞拜然",
			BAHAMAS: 					"巴哈馬",
			BAHRAIN: 					"巴林",
			BANGLADESH: 				"孟加拉",
			BARBADOS: 					"巴貝多",
			BELARUS: 					"白俄羅斯",
			BELGIUM: 					"比利時",
			BELIZE: 					"貝里斯",
			BERUMUDA: 					"百慕達",
			BOLIVIA: 					"玻利維亞",
			BOSNIA_HERZEGOWINA: 		"波士尼亞與赫塞哥維納",
			BRAZIL: 					"巴西",
			BRUNEI_DARUSSALAM: 			"汶萊",
			BULGARIA: 					"保加利亞",
			CAMBODIA: 					"柬埔寨",
			CANADA: 					"加拿大",
			CAYMAN_ISLANDS: 			"英屬開曼群島",
			CHILE: 						"智利",
			CHINA: 						"中華人民共和國",
			COLOMBIA: 					"哥倫比亞",
			COSTA_RICA: 				"哥斯大黎加",
			CROATIA: 					"克羅埃西亞",
			CYPRUS: 					"賽普勒斯",
			CZECH_REPUBLIC: 			"捷克共和國",
			DENMARK: 					"丹麥",
			DOMINICAN_REPUBLIC: 		"多明尼加共和國",
			ECUADOR: 					"厄瓜多",
			EGYPT: 						"埃及",
			EL_SALVADOR: 				"薩爾瓦多",
			ESTONIA: 					"愛沙尼亞",
			ETHIOPIA: 					"衣索比亞",
			FAEROE_ISLANDS: 			"法羅群島",
			FINLAND: 					"芬蘭",
			FRANCE: 					"法國",
			FRENCH_GUIANA: 				"法屬圭亞那",
			FRENCH_POLYNESIA: 			"法屬玻里尼西亞",
			GEORGIA: 					"喬治亞",
			GERMANY: 					"德國",
			GREECE: 					"希臘",
			GREENLAND: 					"格陵蘭",
			GRENADA: 					"格瑞那達",
			GUADELOUPE: 				"法屬瓜德羅普",
			GUAM: 						"美屬關島",
			GUATEMALA: 					"瓜地馬拉",
			HAITI: 						"海地",
			HONDURAS: 					"宏都拉斯",
			HONG_KONG: 					"香港",
			HUNGARY: 					"匈牙利",
			ICELAND: 					"冰島",
			INDIA: 						"印度",
			INDONESIA: 					"印尼",
			IRAN: 						"伊朗",
			IRAQ: 						"伊拉克",
			IRELAND: 					"愛爾蘭",
			ISRAEL: 					"以色列",
			ITALY: 						"義大利",
			JAMAICA: 					"牙買加",

			JAPAN: 						"日本",
			JAPAN_1: 					"日本1",
			JAPAN_2: 					"日本2",
			JAPAN_3: 					"日本3",
			JAPAN_4: 					"日本4",
			JAPAN_5: 					"日本5",
			JAPAN_6: 					"日本6",

			JORDAN: 					"約旦",
			KAZAKHSTAN: 				"哈薩克",
			KENYA: 						"肯亞",

			NORTH_KOREA: 				"北韓",
			KOREA_REPUBLIC: 			"南韓",
			KOREA_REPUBLIC_3: 			"南韓3",

			KUWAIT: 					"科威特",
			LATVIA: 					"拉脫維亞",
			LEBANON: 					"黎巴嫩",
			LIBYA: 						"利比亞",
			LIECHTENSTEIN: 				"列支敦斯登",
			LITHUANIA: 					"立陶宛",
			LUXEMBOURG: 				"盧森堡",
			MACAU: 						"澳門",
			MACEDONIA: 					"前南斯拉夫馬其頓共和國",
			MALAWI: 					"馬拉威",
			MALAYSIA: 					"馬來西亞",
			MALDIVES: 					"馬爾地夫",
			MALTA: 						"馬爾他",
			MARTHINIQUE: 				"法屬馬丁尼克",
			MAURITIUS: 					"模里西斯",
			MAYOTTE: 					"法屬馬約特",
			MEXICO: 					"墨西哥",
			MONACO: 					"摩納哥",
			MONGOLIA: 					"蒙古國",
			MOROCCO: 					"摩洛哥",
			NEPAL: 						"尼泊爾",
			NETHERLANDS: 				"荷蘭",
			NETHERLANDS_ANTILLES: 		"荷屬安地列斯",
			
			NEW_ZEALAND: 				"紐西蘭",
			NICARAGUA: 					"尼加拉瓜",
			NIGERIA: 					"奈及利亞",
			NORWAY: 					"挪威",
			NORTHERN_MARIANA_ISLANDS: 	"北馬里亞納群島",
			OMAN: 						"阿曼",
			PAKISTAN: 					"巴基斯坦伊斯蘭共和國",
			PANAMA: 					"巴拿馬",
			PAPUA_NEW_GUINEA: 			"巴布亞新幾內亞",
			PARAGUAY: 					"巴拉圭",
			PERU: 						"祕魯",
			PHILIPPINES: 				"菲律賓",
			POLAND: 					"波蘭",
			PORTUGAL: 					"葡萄牙",
			PUERTO_RICO: 				"波多黎各",
			QATAR: 						"卡達",
			REUNION: 					"法屬留尼旺",
			ROMANIA: 					"羅馬尼亞",
			RUSSIA: 					"俄羅斯",
			RWANDA: 					"盧安達",
			SAMOA: 						"薩摩亞",
			SAUDI_ARABIA: 				"沙烏地阿拉伯",
			SINGAPORE: 					"新加坡",
			SLOVAK_REPUBLIC: 			"斯洛伐克共和國",
			SLOVENIA: 					"斯洛維尼亞",
			SOUTH_AFRICA: 				"南非",
			SPAIN: 						"西班牙",
			SRI_LANKA: 					"斯里蘭卡",
			SURINAME: 					"蘇利南",
			SWEDEN: 					"瑞典",
			SWITZERLAND: 				"瑞士",
			SYRIA: 						"敘利亞",
			TAIWAN: 					"臺灣",
			TANZANIA: 					"坦尚尼亞",
			THAILAND: 					"泰國",
			TRINIDAD_TOBAGO: 			"千里達及托巴哥",
			TUNISIA: 					"突尼西亞",
			TURKEY: 					"土耳其",
			UGANDA: 					"烏干達",
			UKRAINE: 					"烏克蘭",
			UNITED_ARAB_EMIRATES: 		"阿拉伯聯合大公國",
			UNITED_KINGDOM: 			"英國",
			UNITED_STATES: 				"美國",
			URUGUAY: 					"烏拉圭",
			UZBEKISTAN: 				"烏茲別克",
			VENEZUELA: 					"委內瑞拉",
			VIETNAM: 					"越南",
			VIRGIN_ISLANDS: 			"美屬維京群島",
			YEMEN: 						"葉門",
			ZIMBABWE: 					"辛巴威"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) 埃內韋塔克、瓜加林", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) 中途島、薩摩亞",
			HAWAII: 					"(GMT-10:00) 夏威夷",
			ALASKA: 					"(GMT-09:00) 阿拉斯加",
			PACIFIC_TIME: 				"(GMT-08:00) 太平洋時間",
			MOUNTAIN_TIME: 				"(GMT-07:00) 山區時間 (美國 加拿大)",
			CENTRAL_TIME: 				"(GMT-06:00) 中部時間 (美國 加拿大)",
			EASTERN_TIME: 				"(GMT-05:00) 東部時間 (美國 加拿大)",
			CARACAS:					"(GMT-04:30) 卡拉卡斯",
			ATLANTIC_TIME: 				"(GMT-04:00) 大西洋時間 (加拿大)",
			NEWFOUNDLAND: 				"(GMT-03:30) 紐芬蘭",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) 巴西利雅、布宜諾斯艾利斯",
			MID_ATLANTIC: 				"(GMT-02:00) 大西洋中部",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) 亞速爾群島、維德角群島",
			GREENWICH_MEAN_TIME: 		"(GMT) 格林威治標準時間、都柏林、倫敦",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) 柏林、斯德哥爾摩、羅馬、伯恩、布魯塞爾",
			ATHENS_HELSINKI: 			"(GMT+02:00) 雅典、赫爾辛基、東歐、以色列",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) 巴格達、科威特、奈洛比、利雅德、莫斯科",

			TEHERAN: 					"(GMT+03:30) 德黑蘭",

			ABU_DHABI: 					"(GMT+04:00) 阿布達比、馬斯喀特、喀山、伏爾加格勒",

			KABUL: 						"(GMT+04:30) 喀布爾",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) 伊斯蘭堡，喀拉蚩，葉卡捷琳堡",

			MADRAS_CALCUTTA: 			"(GMT+05:30) 馬德拉斯，加爾各答，孟買，新德里",
			KATMANDU: 					"(GMT+05:45) 加德滿都",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) 阿拉木圖，達卡",
			RANGOON: 					"(GMT+06:30) 仰光",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) 曼谷，雅加達，河內",
			BEIJING_HONGKONG: 			"(GMT+08:00) 北京，台北，香港，伯斯，新加坡",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) 東京，大阪，札幌，漢城，雅庫茨克",

			ADELAIDE: 					"(GMT+09:30) 阿得萊德",

			BRISBANE_CANBERRA: 			"(GMT+10:00) 布里斯本、坎培拉、墨爾本、雪梨",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) 馬加丹，所羅門群島，新喀里多尼亞",
			FIJI_KAMCHATKA: 			"(GMT+12:00) 斐濟，堪察加半島，奧克蘭",
			NUKU: 						"(GMT+13:00) 努瓜婁發"
		},

		APPLIST:{
			APP:						"應用程式",
			GAME:						"遊戲",
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
			xl_others:  				"xl_others",
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
			DAY: 						"星期",

			MONDAY: 					"星期一",
			TUESDAY: 					"星期二",
			WEDNESDAY: 					"星期三",
			THURSDAY: 					"星期四",
			FRIDAY: 					"星期五",
			SATURDAY: 					"星期六",
			SUNDAY: 					"星期日",
			
			MON: 						"星期一",
			TUES: 						"星期二",
			WED: 						"星期三",
			THUR: 						"星期四",
			FRI: 						"星期五",
			SAT: 						"星期六",
			SUN: 						"星期日",

			JAN: 						"一月",
			FEB: 						"二月",
			MAR: 						"三月",
			APR: 						"四月",
			MAY: 						"五月",
			JUN: 						"六月",
			JUL: 						"七月",
			AUG: 						"八月",
			SEP: 						"九月",
			OCT: 						"十月",
			NOV: 						"十一月",
			DEC: 						"十二月"

		},

		HOUR: {
			AM_1: 						"上午1點",
			AM_2: 						"上午2點",
			AM_3: 						"上午3點",
			AM_4: 						"上午4點",
			AM_5: 						"上午5點",
			AM_6: 						"上午6點",
			AM_7: 						"上午7點",
			AM_8: 						"上午8點",
			AM_9: 						"上午9點",
			AM_10: 						"上午10點",
			AM_11: 						"上午11點",
			AM_12: 						"上午12點",
			PM_1: 						"下午1點",
			PM_2: 						"下午2點",
			PM_3: 						"下午3點",
			PM_4: 						"下午4點",
			PM_5: 						"下午5點",
			PM_6: 						"下午6點",
			PM_7: 						"下午7點",
			PM_8: 						"下午8點",
			PM_9: 						"下午9點",
			PM_10: 						"下午10點",
			PM_11: 						"下午11點",
			PM_12: 						"下午12點"
		},

		ORDER: {
			"1ST": 						"第一",
			"2ND": 						"第二",
			"3RD": 						"第三",
			"4TH": 						"第四",
			"5TH": 						"最後",
			"1ST_": 					"第一",

			TH: 						"第"
		},

		GRID: {
			CLIENT_NUMBER: 				"使用者數量",

			ID: 						"ID",
			MODIFY: 					"修改",
			STATUS: 					"狀態",
			ENABLE: 					"啟用",

			OPERATION: 					"運作",
			CHOOSE: 					"選擇",
			DESCRIPTION: 				"描述",
			

			AUTO_REFRESH: 				"自動重整",
			REFRESH: 					"重新整理",
			NUMBER: 					"數量",
			ENABLED: 					"啟用",
			DISABLED: 					"停用",
			ACTIVE: 					"啟動",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"增加",
			CHOOSE: 					"選擇",
			EDIT: 						"編輯",
			DELETE: 					"刪除",
			DELETE_ALL: 				"全部刪除",
			REMOVE: 					"移除",
			RESET: 						"重置",
			RESET_ALL: 					"全部重置",
			DETECT: 					"偵測",
			ENABLE: 					"啟用",
			DISABLE: 					"停用",
			PAUSE:						"暫停",
			RESUME:						"恢復",
			
			REFRESH: 					"重新整理",
			SEARCH: 					"搜尋…",
			BROWSE: 					"瀏覽",

			SAVE: 						"儲存",
			BACK: 						"上一步",

			PREV: 						"上一頁",
			NEXT: 						"下一步",
			FINISH: 					"結束",
			
			ON: 						"開",
			OFF: 						"關",
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",
			
			OK: 						"確定",
			CANCEL: 					"取消",

			YES: 						"是",
			NO: 						"否",
			
			CONNECTED: 					"已連線",
			CONNECTING: 				"連線中",
			DISCONNECTING: 				"斷線中",
			DISCONNECTED: 				"未連線",

			PASSWORD_HINT: 				"密碼",
			FILEBUTTONTEXT: 			"瀏覽",
			FILEBLANKTEXT: 				"請選擇一個檔案",
			NOSELECTEDTEXT: 			"選擇項目",

			ADD_A_NEW_KEYWORD: 			"增加新關鍵字",

			SUCCESSED: 					"成功！",
			FORM_SAVED: 				"已儲存",
			FORM_FAILED: 				"失敗",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"已儲存",
			GRID_FAILED: 				"失敗",
			GRID_NONE_SELECT: 			"請至少選擇一個項目。",
			GRID_DELETE_COMFIRM: 		"您確定要刪除這些項目嗎？",
			GRID_DELETE_ALL_COMFIRM: 	"您確定要刪除全部的項目嗎？",
			GRID_MAX_RULES: 			"超出最大項目。",
			KEYWORD_MAX_OVERFLOW: 		"關鍵字數量超出限制。",

			NOTE: 						"請注意："
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"錯誤的格式。",
			BLANKTEXT: 					"此欄位為必填。",

			EMAIL: 						"錯誤的電子郵件位址。",
			NUMBER: 					"錯誤的格式。",

			NUMBER_MIN: 				"錯誤的數值，請輸入%min以上的數值。",
			NUMBER_MAX: 				"錯誤的數值，請輸入%max以下的數值。",

			NUMBER_MIN_MAX: 			"錯誤的數值，請輸入%min 到%max之間的數值。",
			HEX: 						"此欄位必須是十六進位數字。",

			IP: 						"錯誤的格式。",

			IP_NO_ALL_ZERO:				"位址不應該是0.0.0.0。",
			IP_NO_LOOP:					"位址不應該是回環位址。",
			IP_NO_D_TYPE:				"位址不應該是Class D IP。",
			IP_NO_E_TYPE:				"位址不應該是Class E IP。",
			IP_NO_ALL_ONE:				"位址不應該是255.255.255.255。",
			IP_NO_FIRST_ALL_ONE:		"位址不應該以255作為開頭。",
			IP_NO_FIRST_ZERO:			"位址不應該以0作為開頭。",
			MASK_NO_ALL_ONE:			"遮罩不可以是255.255.255.255。",

			IPV6: 						"錯誤的格式。",
			IPV6_NOT_GLOBAL:			"錯誤的格式。",
			IPV6_NOT_PREFIX:			"錯誤的格式。",
			IP_DOMAIN: 					"錯誤的格式。",
			IPV6_DOMAIN: 				"錯誤的格式。",
			PPTP_INVALID_IP:			"無效的IP位址。",
			MAC: 						"錯誤的格式。",
			MULTI_MAC:					"錯誤的格式。",
			MAC_INVALID_BROADCAST:		"MAC不可以是廣播位址。",
			MAC_INVALID_MULTICAST:		"MAC不可以是群播位址。",
			DATE: 						"錯誤的格式。",
			DATE_INVALID: 				"請輸入介於1970.01.01到2030.12.31之間的日期。",
			MASK: 						"錯誤的格式。",
			DOMAIN: 					"錯誤的格式。",
			STRING_DOMAIN:              "錯誤的格式。",
			USER: 						"錯誤的格式。",
			NOTE: 						"錯誤的格式。",
			PWD: 						"錯誤的格式。",
			SSID: 						"錯誤的格式。",
			NAME:						"錯誤的格式。",
			ASCII_VISIBLE:				"錯誤的格式。",
			STRING_VISIBLE:				"錯誤的格式。",
			STRING_VISIBLE_NO_COMMA:    "錯誤的格式。",
			STRING_VISIBLE_ALLOW_BLANK: "錯誤的格式。",
			VPN_NAME_PWD: 				"請輸入1-15字母字元、數字、-和_。"
		},


		ERROR: {			
			"00000001":					"錯誤的檔案類型。",
			"00000002":					"校驗碼錯誤。",
			"00000003":					"檔案過大。",
			"00000004":					"上傳錯誤。",
			"00000005":					"重啟錯誤。",
			"00000006":					"未知的錯誤。",
			"00000007":					"此項目已經存在，請輸入另外一個。",

			"00000009":					"錯誤的通訊埠。",
			"00000010":					"通訊埠必須是一個數字。",

			"00000011":					"使用者名稱必須與從值相同。",
			"00000012": 				"使用者名稱必須以英文開頭。",

			"00000021":					"錯誤的格式。",

			"00000032": 				"數值必須小於低。",
			"00000033": 				"數值必須小於中等與低。",
			"00000034": 				"錯誤的數值，請輸入5到7200之間的數字。",

			"00000039": 				"請使用預設值0或請輸入30到86400之間的數值。",
			"00000040": 				"必須填入SSID與MAC位址。",

			"00000042": 				"請使用預設值80或請輸入1024到65535之間的數值。",

			"00000045": 				"預設閘道與LAN IP位址必須在相同網段內，請重新輸入。",

			"00000046": 				"IP位址與MAC位址不應該是無效的。請再次輸入。",
			"00000047": 				"IP位址必須與LAN IP位址在相同網段內，請重新輸入。",

			
			"00000049":					"目的地網路錯誤。",

			"00000050": 				"錯誤的 DNS 伺服器IP位址。請輸入另一個IP位址。",
			"00000051": 				"此MAC位址已經存在，請輸入另一個。",
			"00000052": 				"此IP位址已經存在，請輸入另一個。",

			"00000053": 				"開始的IP位址不應該大於結束的IP位址。<br/>請重新輸入。",

			"00000054": 				"IP位址範圍必須與LAN IP位址在相同網段內，請重新輸入。",

			"00000055": 				"IP不可以與LAN位址相同。",

			"00000056": 				"遠端IP位址不可與目前的LAN IP位址在相同的網段內，請輸入另一個。",

			"00000057": 				"錯誤的PSK密碼，請重新輸入一次。",
			"00000058": 				"錯誤的WEP密碼，請重新輸入一次。",

			"00000059": 				"無效的IP位址與子網路遮罩，請輸入有效值。",

			"00000060": 				"WAN IP位址與LAN IP位址不可以在相同網段內。<br/>請輸入另一個。",

			"00000061": 				"開始時間不可以早於結束時間。",

			"00000062": 				"此欄位為必填。",
			"00000063": 				"此欄位為必填。",

			"00000064": 				"不能阻擋該主機的MAC位址。",
			"00000065": 				"此項目與已存在的項目發生衝突，請檢查。",
			
			"00000066": 				"密碼必須在8-63個字之間或是64個十六進位數字。",
			"00000067": 				"密碼必須是10個十六進位數字。",
			"00000068": 				"密碼必須是5個ASCII字元。",
			"00000069": 				"密碼必須是26個十六進位數字。",
			"00000070": 				"密碼必須是13個ASCII字元。",
			"00000071": 				"密碼必須是32個十六進位數字。",
			"00000072": 				"密碼必須是16個ASCII字元。",
			"00000073": 				"密碼必須小於64個字元。",

			"00000074": 				"錯誤的檔案類型。",

			"00000075": 				"PIN碼必須是8個數字。",

			"00000076": 				"此項目與已存在的項目衝突，請檢查觸發通訊埠與觸發通訊協定。",
			"00000077": 				"IP位址不可以與LAN IP位址相同。",
			"00000078": 				"主機IP位址不可與LAN IP位址相同。",

			"00000080": 				"密碼不正確，請重試一次。",

			"00000083": 				"閘道不可與IP相同。",
			"00000084": 				"主要DNS不可與IP相同。",
			"00000085": 				"次要DNS不可與IP相同。",
			"00000086": 				"主要DNS不可與次要DNS相同。",

			"00000088": 				"遠端管理者不被允許進行本項操作。",
			"00000089": 				"您已經企圖登入超過%num次，請2小時後再試一次。",

			"00000090": 				"目的地IP位址不可以是LAN IP。",
			"00000091": 				"目的地IP位址不可以是WAN IP。",

			"00000092": 				"IP位址不可與LAN IP位址在相同網段內。<br/>請重新輸入。",
			"00000093": 				"IP位址不可與WAN IP位址在相同網段內。<br/>請重新輸入。",

			"00000094": 				"VLAN ID不可以相同。",
			"00000095": 				"至少需要一個VLAN ID。",

			"00000096": 				"該關鍵字已經存在。",

			"00000097": 				"在Wi-Fi按鈕被切換到開之前，對2.4GHz的頻段進行的設定將不會生效。",
			"00000098": 				"在Wi-Fi按鈕被切換到開之前，對5GHz的頻段進行的設定將不會生效。",
			"00000099": 				"在Wi-Fi按鈕被切換到開之前，對2.4GHz和5GHz頻段進行的設定將不會生效。",

			"00000100": 				"由於您的地區/國家的限制，因此您無法進行5GHz網路設定。",
			"00002100": 				"因為您的地區或國家的限制，60GHz網路是不可用的。",

			"00000101": 				"您的無線網路功能已經被關閉。如果您想要使用這個功能，請打開路由器上的實體Wi-Fi按鈕。",
			"00000102": 				"您的無線網路功能已經被關閉。如果您想要使用這個功能，請打開路由器上的實體Wi-Fi按鈕。",
			"00002102": 				"您的無線網路功能已經被關閉。如果您想要使用這個功能，請打開路由器上的實體Wi-Fi按鈕。",

			"00000103": 				"您的無線網路功能已經被關閉。如果您想要使用這個功能，請打開路由器上的實體Wi-Fi按鈕。",
			"00000104": 				"您的無線網路功能已經被關閉。",

			"00000105": 				"QoS 與 IPTV 功能不可同時啟用。",

			"00000106": 				"IP位址不可以與LAN IP位址相同。",
			
			"00000107": 				"目的地已經存在。",

			"00000110": 				"該IP位址必須與LAN IP位址在相同網段內。",
			
			"00000111": 				"無法同時開啟QoS 與<a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT 加速</a>。",
			"00000112": 				"WDS功能可以運作在 2.4GHz 或 5GHz 等頻道。另外，使用WDS後將不可再使用訪客網路。",
			"00000113": 				"WDS與訪客網路不可同時啟用。",
			"00000114": 				"無法同時開啟流量統計與<a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT加速</a>。",

			"00000117": 				"該網域名稱已經存在。",
			"00000118": 				"網域名稱的字數超過限制。",
			"00000119":					"當<a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> 或 <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">流量統計</a> 啟用後，NAT加速功能將會被停用。",

			"00000120": 				"密碼應該是5或13個字的ASCII碼。",
			"00000121": 				"密碼應該是10或26個字的十六進位碼。",
			"00000122": 				"使用者名稱或密碼是空白的，您確定要繼續嗎？",
			"00000123": 				"儲存中…儲存過程中請勿進行其他操作",
			"00000124": 				"因為持續輸入錯誤的PIN碼，路由器的PIN碼已經被鎖定。請創造一個新的PIN碼。",

			"00000125": 				"QoS規則數量超過限制。",
			"00000126": 				"檔案大小超過限制。",
			"00000127": 				"檔案內容不正確。",
			"00000128": 				"請至少選擇一項應用程式。",
			"00000129": 				"請至少選擇一個實體連接埠。",
			"00000130":					"您的WPS功能是停用的。",
			"00000131": 				"NTP伺服器不應該是loopback位址",
			"00000132": 				"模式切換失敗。請稍後再試或重新啟動路由器。",
			"00000133": 				"錯誤的DMZ主機IP位址。請輸入正確的位址。",
			"00000134":  				"錯誤的內部IP。請輸入正確的。",
			"00000135": 				"韌體檔案錯誤",
			"00000136": 				"備份檔案錯誤",
			"00000137": 				"無效的IP位址，請輸入有效的IP位址。",
			"00000139": 				"錯誤的密碼還原參數。",
			"00000140": 				"錯誤的代碼。",
			"00000141": 				"密碼還原是停用的。",
			"00000142": 				"傳送代碼失敗。請檢查您的網際網路連線。",
			"00000143": 				"錯誤的電子郵件位址。",
			"00000144": 				"錯誤的電子郵件訊息。",
			"00000145": 				"無法找到主機。",
			"00000146": 				"驗證失敗。",
			"00000147": 				"通訊埠必須在1到65535之間",
			"00000148": 				"對通訊埠範圍來說，開始通訊埠號碼必須小於結束通訊埠號碼。請再次輸入。",
			"00000149": 				"通訊埠號碼重疊。請再次輸入。",
			
			"00000150": 				"路徑不存在。",
			"00000151": 				"未設定分配路徑。",
			"00000152": 				"此路徑有些問題。",
			"00000153": 				"未找到磁碟區。",
			"00000154": 				"沒有USB設備。",
			
			"00000155": 				"PPTP VPN用戶端IP位址與LAN IP位址不可以在相同子網路中。<br/>請輸入另一個。",
			"00000156": 				"PPTP VPN用戶端IP位址與OpenVPN用戶端 IP位址不可以在相同子網路中。<br/>請輸入另一個。",

			"00000222":  				"最大條目。",
			"00000231": 				"重複的條目。",
			"00000232": 				"無效的URL。",
			"00000233":					"請至少選擇一天。",

			"00000301": 				"已達最大共享資料夾數目。",
			"00000302": 				"磁碟區中已達最大共享資料夾數目。",
			"00000303": 				"重複的共享資料夾路徑。",
			"00000304": 				"重複的共享資料夾名稱。",

			"00001000":					"升級程序正在運作中，請稍候。",
			"00001001": 				"WDS功能可以運作在2.4GHz或5GHz頻段。",
			"00001002":					"錯誤的代碼。",

			"00001123": 				"輸入的應用程式規則項目是無效的，請選擇至少一個規則項目。",
			"00001124": 				"輸入的實體連接埠規則項目是無效的，請選擇至少一個規則項目。",

            "00002000": 				"此項目與ISP特定的固定路由衝突，您確定要繼續嗎？",

            "00003000":                 "IPv6 穿透與IPTV衝突！如果您要繼續使用此能，請關閉IPTV設定。",
			"00004139": 				"沒有網際網路連線",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"請求逾時。請檢查您的網際網路連線並稍後再試。",
			"00004141": 				"未知的錯誤。",
			"00004142": 				"不正確的驗證碼。",
			"00004143": 				"無效的密碼。",
			"00004144": 				"使用者名稱已存在。",
			"00004145": 				"無效的密碼。",//new password
			"00004146": 				"無法解除綁定該設備。請稍後再試。",
			"00004147": 				"此設備已經被綁定到另一個帳號。",
			"00004148": 				"無效的輸入。",
			"00004149": 				"此網域名稱已存在。",
			"00004150": 				"無法下載該韌體，請檢查您的網際網路連線並稍後再試。",
			"00004151": 				"同一個雲端帳號不能註冊超過1000個網域名稱。",
			"00004152": 				"此設備已經被綁定到另一個網域名稱。",
			"00004153": 				"此網域名稱已經被綁定到另一個設備。",
			"00004154": 				"伺服器沒有反應。請稍後再試。",
			"00004155": 				"帳號不存在。",
			"00004156": 				"無法開始雲端應用。請重啟此設備並稍後再試。",
			"00004157": 				"無法連線到雲端伺服器。請檢查您的網際網路連線並稍後再試。",
			"00004158": 				"WAN連接埠已拔除網路線。",
			"00004159": 				"無法連線到網際網路。請聯絡您的服務供應商或稍後再試。",
			"00004160": 				"無法從DHCP伺服器取得IP位址。請檢查WAN連線類型或稍後再試。",
			"00004161": 				"PPPoE驗證失敗。請檢查您的使用者名稱與密碼。",
			"00004162": 				"無法連線到PPPoE伺服器。",
			"00004164": 				"PPTP驗證失敗。請檢查您的使用者名稱與密碼。",
			"00004165": 				"無法連線到PPTP伺服器。",
			"00004167": 				"L2TP驗證失敗。請檢查您的使用者名稱與密碼。",
			"00004168": 				"無法連線到L2TP伺服器。",
			"00004169": 				"未知的錯誤。請稍後再試。",
			"00004170": 				"WAN連接埠已拔除網路線。",
			"00004171": 				"沒有網際網路連線。",
			"00004172": 				"連線失敗。",
			"00004173": 				"不正確的使用者名稱或密碼",
			"00004174": 				"錯誤的電子郵件位址。",
			"00004175": 				"無效的使用者名稱格式。",
			"00004176": 				"電子郵件已經存在",
			"00004177": 				"無法存取該帳號資訊。請重新整理頁面。",
			"00004178":   				"系統錯誤。請重新整理頁面並再試一次。",
			"00004179":   				"無法綁定此設備。請稍後再試。",
			"00004180":   				"此設備已經從此雲端帳號解除綁定。請再次用您的帳號登入，以您的帳號綁定此設備。",
			"00004181":   				"該設備是離線的。請檢查您的網際網路設定。",
			"00004182":   				"無法發送電子郵件。請檢查您的網際網路連線並再試一次。",
			"00004183":   				"帳號應包含字元。",
			"00004184":   				"您已經輸入不正確的密碼20次。請在2小時後再試。",
			"00004185":   				"您已經在1小時內取得驗證碼10次。請在24小時後再試。",
			"00004186":   				"抱歉，無法啟動您的帳號。請重新發送驗證電子郵件。",
			"00004187":   				"抱歉，該連結已經過期。請重新發送驗證電子郵件。",
			"00004188":   				"抱歉，該連結已經過期。請重新發送電子郵件。",
			"00004189":   				"抱歉，無法重置您的密碼。請重新發送電子郵件。",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"韌體升級錯誤。",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"狀態",
			NETWORK: 					"網路",
			NETWORK_MAP: 				"網路地圖",
			INTERNET: 					"網際網路",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP 伺服器",
			DYNAMIC_DNS: 				"動態 DNS",
			ADVANCED_ROUTING: 			"進階路由",

			WIRELESS: 					"無線網路",
			WIRELESS_SETTINGS: 			"無線網路設定",
			WDSBRIDGING: 				"WDS 橋接",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC位址管理",
			WIRE_STATISTICS: 			"統計",
			
			
			GUEST_NETWORK: 				"訪客網路",
			WIRELESS_SETTINGS: 			"無線網路設定",
			STORAGE_SHARING: 			"存儲共享",
			NAT_FORWARDING: 			"NAT 導向",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"虛擬伺服器",
			PORT_TRIGGERING: 			"通訊埠觸發",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB 設定",
			BASIC_SET: 					"基本設定",
			DISK_SET: 					"設備設定",
			FOLDER_SHARING: 			"共用存取",
			STORAGE_SHARING: 			"存儲共享",
			FTP_SERVER: 				"FTP伺服器",
			MEDIA_SERVER: 				"多媒體伺服器",
			PRINT_SERVER: 				"列印伺服器",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"離線下載",
			
			PARENTAL_CONTROL: 			"家長監護",

			QOS:  						"QoS",
			DATABASE:  					"資料庫",

			STREAMBOOST: 				"串流加速",
			MAP: 						"地圖",
			SB_MAP: 					"地圖",
			SB_BANDWIDTH:  				"頻寬",
			SB_PRIORITY: 				"優先級",
			SB_STATISTICS: 				"統計",

			
			SECURITY: 					"安全性",
			SETTINGS: 					"設定",
			ACCESS_CONTROL: 			"存取管理",
			IP_MAC_BINDING: 			"IP&MAC 綁定",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"系統工具",
			TIME_SETTINGS: 				"時間設定",
			DIAGNOSTIC: 				"診斷",
			FIRMWARE_UPGRADE: 			"韌體升級",
			BACKUP_RESTORE: 			"備份與復原",
			ADMINISTRATION: 			"管理",
			SYSTEM_LOG: 				"系統日誌",
			STATISTICS: 				"流量統計",
			SYSTEM_PARAMETERS: 			"系統參數",
			VPN: 						"VPN伺服器",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN連接"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"地區與時區",
			INTERNET_CONNECTION_TYPE: 	"網際網路連線類型",
			WIRELESS_SETTINGS: 			"無線網路設定",
			SUMMARY: 					"摘要",
			SETUP_COMPLETE: 			"測試您的連線",

			EXIT: 						"離開",
			NEXT: 						"下一步",
			SAVE: 						"儲存",
			FINISH: 					"結束",
			OK: 						"確定",
			NONE: 						"無",

			REGION: 					"地區",
			TIME_ZONE: 					"時區",
			NO_SELECT: 					"選擇項目",

			AUTO_DETECT: 				"自動偵測",
			DYNAMIC_IP: 				"浮動 IP",
			STATIC_IP: 					"固定 IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "請注意： 如果您不確定您的網路連線類型是哪一種，可以使用「自動偵測」功能或與您的網路業者(ISP)連繫。",

			DYNAMIC_IP_INFO: 			"如果您的ISP僅允許一個特定的MAC位址進行網際網路存取，則您需要複製主要電腦的MAC位址。如果您不確定，請選擇 <strong>請勿複製MAC位址</strong> 。",
			MAC_CLONE_NO: 				"請勿複製 MAC位址",
			MAC_CLONE_YES: 				"複製目前電腦的MAC位址",
			MAC_CLONE_NOTE: 			"注：如果您選擇複製MAC地址，請確定該電腦的MAC位址已經被ISP登記為通行名單，接著請點選 下一步 繼續設定。",

			PPPOE_INFO: 				"請輸入網路業者(ISP)所提供的使用者名稱與密碼。(請注意：中華電信-Hinet的使用者名稱有固定格式「8位數字@hinet.net」，例如：「87654321@hinet.net」這樣的帳號才是正確格式，如「87654321」或「HN87654321@hinet.net」，都是錯誤格式。)",
			
			STATIC_IP_INFO: 			"請輸入網路業者(ISP)所提供的IP參數值。",

			L2TP_INFO: 					"請輸入網路業者(ISP)所提供的L2TP的使用者名稱與密碼。(一般在台灣不會使用此上網類型)",
			PPTP_INFO: 					"請輸入網路業者(ISP)所提供的PPTP的使用者名稱與密碼。(一般在台灣不會使用此上網類型)",
			
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			SERVER_IP_ADDRESS_NAME: 	"VPN 伺服器 IP/網域名稱",
			IP_ADDRESS: 				"IP 位址",
			SUBNET_MASK: 				"子網路遮罩",
			DEFAULT_GATEWAY: 			"預設閘道",
			PRIMARY_DNS: 				"主要 DNS",
			SECOND_DNS: 				"次要 DNS",
			OPTIONAL: 					"(選填)",
			
			ON: 						"開",
			OFF: 						"關",
			WIRELESS_24GHZ: 			"無線網路 2.4GHz",
			WIRELESS_5GHZ: 				"無線網路 5GHz",
			WIRELESS_60GHZ: 				"60GHz無線",
			ENABLE_WIRELESS_RADIO: 		"啟用無線網路功能",
			NAME_SSID: 					"無線網路名稱 (SSID)",

			SUMMARY_INFO1: 				"在按下 <strong>下一步</strong> 按鈕前，需要將您的無線設備重新連線到新的無線網路。",
			SUMMARY_INFO2: 				"您的無線名稱和密碼已被修改為如下：",
			SUMMARY_INFO3: 				"請確保您已經連線到新的無線網路。",

			WIRELESS_24GHZ_SSID: 		"2.4GHz 無線網路名稱(SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"2.4GHz 無線網路密碼",
			WIRELESS_5GHZ_SSID: 		"5GHz 無線網路名稱(SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"5GHz 無線網路密碼",
			WIRELESS_60GHZ_SSID: 		"無線60GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"無線60GHz密碼",

			SORRY: 						"失敗。",
			SUCCESS: 					"成功！",
			TEST_INTERNET_SUCCESS_INFO: "設定成功！請點選 結束 以完成快速設定步驟。",

			TEST_INTERNET_FAILED_INFO_0:"請檢查是否所有快速設定參數都是正確的，並再重試一次。如果所有快速設定參數都是正確的。請將數據機重新啟動，等待2分鐘再點選測試網際網路連線一次。如果您沒有使用數據機，您也許需要聯繫您的ISP業者以尋求協助。",
			SUMMARY_INFO4: 				"很抱歉！我們偵測到您尚未將您的無線設備重連線到新的無線網路，請執行這個步驟然後點選OK！",
                                         
			CONGRATULARIONS: 			"恭喜您！",
			COMPLETE_INFO_0: 			"您已經完成了快速安裝步驟。",
			COMPLETE_INFO_1:			"點選以下的測試網際網路連接，然後點選 結束。",
			TEST_INTERNET: 				"測試網際網路連接",

			
			RESET_USER_TITLE: 			"設定一個新使用者名稱與密碼",
			NEW_USERNAME: 				"新使用者名稱",
			NEW_PASSWORD: 				"新密碼",
			CONFIRM_PASSWORD: 			"確認新密碼",
			CONFIRM: 					"確認"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"網際網路",
			INTERNET_STATUS:			"網際網路狀態",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"連線類型",
			SECONDARY_CONN: 			"第二連線",

			POOR_CONNECTED: 			"較差的連接",
			UNPLUGGED: 					"WAN連接埠未插入網路線",
			
			CONNECTED: 					"已連線",
			DISCONNECTED: 				"已中斷連線",
			CONNECTING: 				"連線中",

			INTERNET_IP_ADDR: 			"IP 位址",
			
			IP_ADDR: 					"IP 位址",
			MAC_ADDR: 					"MAC 位址",
			GATEWAY: 					"閘道",

			AUTO: 						"自動",
			
			ROUTER: 					"路由器",
			WIRELESS_CLIENTS: 			"無線網路使用者",
			HOST_CLIENTS: 				"無線使用者",
			GUEST_CLIENTS: 				"訪客使用者",
			WIRE_CLIENTS: 				"有線使用者",
			PRINTER: 					"印表機",
			USB_DISK: 					"USB 磁碟",
			WIRELESS: 					"無線網路",
			NAME: 						"名稱",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"頻道",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"無線網路 2.4GHz",
			WIRELESS_5GHZ: 				"無線網路 5GHz",
			WIRELESS_60GHZ:				"60GHz無線",
			
			GUEST_24GHZ: 				"訪客網路 2.4GHz",
			GUEST_5GHZ: 				"訪客網路 5GHz",
			
			STATUS: 					"狀態",
			TOTAL: 						"總計",
			AVAILABLE: 					"可用",
			GB: 						"GB",
			BRAND: 						"品牌",

			DYNAMIC_IP: 				"浮動 IP",
			STATIC_IP: 					"固定 IP",
			SUBNET_MASK: 				"子網路遮罩",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 通道",
			NONE: 						"無"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"網際網路",
			AUTO_DETECT: 				"自動偵測",
			INTERNET_CONN_TYPE: 		"網際網路連線類型",
			DYNAMIC_IP: 				"浮動 IP",
			STATIC_IP: 					"固定 IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"未插入網路線",
			NONE: 						"無",
			DETECT_FAIL: 				"自動偵測失敗",
			SECONDARY_CONN: 			"第二連線",

			DYNAMIC_YES: 				"請勿複製 MAC位址",
			DYNAMIC_NO: 				"複製目前電腦的MAC位址",
			
			IP_ADDR: 					"IP 位址",
			SUBNET_MASK: 				"子網路遮罩",
			DEFAULT_GATEWAY: 			"預設閘道",
			PRIMARY_DNS: 				"主要 DNS",
			SECOND_DNS: 				"次要 DNS",
			OPTIONAL: 					"(選填)",
			USER_NAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			SERVER_IP_ADDR_NAME: 		"VPN 伺服器 IP/網域名稱",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"如果您不確定您的網路連線類型是哪一種，可以使用「自動偵測」功能或請與您的網路業者(ISP)連繫。"
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"無線網路設定",
			MODE_2G: 					"無線網路 2.4GHz",
			MODE_5G: 					"無線網路 5GHz",
			MODE_60G: 					"60GHz無線",
			WIRELESS_NETWORK_NAME: 		"無線網路名稱 (SSID)",
			WIRELESS_PASSWORD: 			"密碼",
			ENABLE_WIRELESS: 			"啟用無線網路功能",
			SAVE: 						"儲存",
			ENCRYPTION_2G_NOTICE:		"2.4G 的加密是 XXX。",
			ENCRYPTION_5G_NOTICE:		"5G 的加密是 XXX。",
			ENCRYPTION_60G_NOTICE:		"60GHz加密是%s。",
			ENCRYPTION_2G_NO: 			"2.4GHz無線網路沒有加密。",
			ENCRYPTION_5G_NO: 			"5GHz無線網路沒有加密。",
			ENCRYPTION_60G_NO: 			"60GHz無線網路未加密。",
			ENCRYPTION_NO: 				"無安全性的無線網路有潛在危險。",
			ENCRYPTION_SURE: 			"您確定要繼續嗎？",
			HIDE_SSID: 					"隱藏 SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"基本設定",
			TITIL_NEW:					"磁碟與帳號",
			DISK_SET:					"設備設定",

			SELFLY_REMOVE:				"安全移除",
			SCANING:					"掃描中…",
			SCAN_RESULT:				"找到 %n 個磁碟",
			
			DISKS:						"磁碟",
			USERS: 						"使用者帳號",
			DEVICENAME: 				"設備名稱",
			VOLUMN: 					"磁碟區",

			USBSPACE: 					"已用空間",
			FREESPACE: 					"剩餘空間",
			STATUS: 					"狀態",
			INACT: 						"停止",
			USAGE: 						"使用",
			CAPACITY: 					"容量",
			OPERATION: 					"運作",
			
			ACC: 						"帳號管理 ", 	 	
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			USE_LOGIN: 					"使用登入使用者",
			SCAN: 						"掃描",
			ENJECT_ALL: 				"全部退出",
			ENJECT: 					"退出",
			ADD_USER: 					"增加使用者",
			AUTH: 						"權限",


			LOCATION: 					"位置",
			MOBILE_ISP: 				"電信業者",
			DIAL_NUMBER: 				"撥號號碼",
			APN: 						"APN",
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			MTU_SIZE: 					"MTU 大小",
			OPTIONAL: 					"(選填)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"家長監護",
			UNKNOWN: 					"未知的",
			
			DEVICE_CTR: 				"家長監護下之設備",
			ID: 						"ID",
			DEVICE: 					"設備名稱",
			MAC_ADDRESS: 				"MAC 位址",
			TIME: 						"網際網路存取時間",
			DESCRIPTION: 				"描述",
			ENABLE: 					"啟用",
			ENABLE_THIS_ENTRY: 			"啟用這個項目",
			OPTIONAL: 					"(選填)",
			BTN_VIEW: 					"查看現有設備",
			
			DEVICE_LIST: 				"設備列表",
			SYSTEM_TIME: 				"系統時間",
			
			RESTR: 						"內容限制",
			MODE: 						"限制",
			BLACKMODE: 					"黑名單",
			WHITEMODE: 					"白名單",
			ACCESS_DEVICES_LIST: 		"存取設備列表",
			
			CHOOSE: 					"選擇",
			ADD_A_NEW_KEYWORD: 			"新增一個封鎖的關鍵字",
			ADD_A_NEW_DOMAIN_NAME: 		"新增一個可以存取的網域名稱",
			
			OPT: 						"運作",
			STATUS: 					"家長監護",
			YOURPC:						"您的電腦"
		},
		
		BASIC_GUEST:{
			TITLE: 						"訪客網路",
			MODE_2G: 					"無線網路 2.4GHz",
			MODE_5G: 					"無線網路 5GHz",
			WIRELESS_NETWORK_NAME: 		"無線網路名稱 (SSID)",
			WIRELESS_PASSWORD: 			"密碼",
			DYNAMIC_PASSWORD: 			"密碼",
			ENABLE_WIRELESS: 			"啟用訪客網路",
			SAVE:						"儲存",
			HIDE_SSID: 					"隱藏 SSID",
			PASSWORD_CHANGE_CYCLE: 		"密碼更新間隔",
			PER_DAY: 					"每天",
			PER_WEEK: 					"每周",
			PER_MONTH: 					"每月",
			NEVER: 						"永不",
			UNENCRYPTED:				"訪客網路是未加密的。您可以在進階選單中設定密碼。"
		},

		STATUS: {
			TITLE: 						"狀態",
			INTERNET:					"網際網路",
			WIRELESS:					"無線網路",
			LAN:						"LAN",
			USB_TITLE:					"USB 設備",
			PERFORMANCE: 				"效能",
			GUEST_NETWORK: 				"訪客網路",
			ACCESS_DEVICES: 			"存取設備",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"連線類型",

			MAC_ADDRESS: 				"MAC 位址",
			IP_ADDRESS: 				"IP 位址",
			RELEASE: 					"釋放",
			RENEW: 						"更新",
			
			DYNAMIC_IP: 				"浮動 IP",
			STATIC_IP: 					"固定 IP",
			SUBNET_MASK: 				"子網路遮罩",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 通道",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass-Through (橋接)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"無",
			
			DEFAULT_GATEWAY: 			"預設閘道",
			DNS: 						"DNS伺服器",
			MAC: 						"MAC 位址",
			WDS_STATUS: 				"WDS 狀態",
			
			IPV6_ADDRESS: 				"IP 位址",
			PRIMARY_DNS: 				"主要 DNS",
			SECOND_DNS: 				"次要 DNS",

			RADIO: 						"無線網路功能",

			NAME_SSID: 					"無線網路名稱 (SSID)",
			NETWORK_NAME_SSID:			"無線網路名稱 (SSID)",
			HIDE_SSID: 					"隱藏 SSID",
			MODE: 						"模式",
			CHANNEL: 					"頻道",
			CHANNEL_WIDTH: 				"頻道寬度",
			AUTO: 						"自動",
			CURRENT_CHANNEL: 			"目前的頻道",

			WDS: 						"WDS 狀態",
			WIRED_CLIENTS: 				"有線使用者",
			WIRELESS_CLIENTS: 			"無線網路使用者",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"本地連線位址",
			ASSIGN_TYPE: 				"分配類型",
			
			ALLOW_TO_SEE_EACH: 			"允許訪客互相連線",

			TOTAL: 						"總計",
			AVAILABLE: 					"可用",

			USB: 						"USB 磁碟",
			PRINTER: 					"印表機",

			CPU_LOAD: 					"CPU 負載",
			MEMORY_USAGE: 				"記憶體使用率",

			IP_ADDR_P: 					"IP 位址",
			MAC_ADDR_P: 				"MAC 位址",
			CONN_TYPE_P: 				"連線類型",

			DISABLED: 					"停用",
			INIT: 						"初始",
			SCAN: 						"掃描",
			AUTH: 						"驗證",
			ASSOC: 						"連接",
			RUN: 						"運作",
			HOST: 						"主機",
			GUEST: 						"訪客",

			ON: 						"開",
			OFF: 						"關"
		},

		INTERNET: {
			TITLE: 						"網際網路",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"網際網路連線類型",
			INTERNET_MAC_ADDRESS: 		"MAC 位址",
			
			CONNECT: 					"連線",
			DISCONNECT: 				"斷線",

			IP_ADDR: 					"IP 位址",
			
			USE_DEFAULT_MAC: 			"使用預設的 MAC 位址",
			USE_COMPUTER_MAC: 			"使用目前電腦的 MAC 位址",
			USE_CUSTOM_MAC: 			"使用自訂的 MAC 位址",
			MAC_CLONE: 					"複製MAC位址",
			
			CONFIG: 					"設定",
			
			IP_ADDRESS: 				"IP 位址",
			SUBNET_MASK: 				"子網路遮罩",
			DEFAULT_GATEWAY: 			"預設閘道",
			
			MANUAL_DNS: 				"手動DNS",
			PRIMARY_DNS: 				"主要 DNS",
			SECOND_DNS: 				"次要 DNS",
			
			RENEW: 						"更新",
			RELEASE: 					"釋放",
			VIEW_MODE: 					"觀看模式",
			
			GET_DYNAMICALLY_FROM_ISP: 	"從ISP動態獲取",
			USE_FOLLOW_IP_ADDR: 		"使用下列的IP 位址",
			USE_FOLLOW_DNS_ADDR: 		"使用下列的DNS位址",
			USE_FOLLOW_DNS_SERVER: 		"使用下列的DNS伺服器",
			
			BASIC: 						"基本設定：",
			ADVANCED: 					"進階設定：",
			
			DNS_ADDR_MODE: 				"DNS 位址",
			MTU_SIZE: 					"MTU 大小",
			MTU_1500: 					"位元組。 (預設值為1500，若非必要請勿變更。)",
			MTU_1480: 					"位元組。 (預設值為1480，若非必要請勿變更。)",
			MTU_1460: 					"位元組。 (預設值為1460，若非必要請勿變更。)",
			MTU_1420: 					"位元組。 (預設值為1420，若非必要請勿變更。)",
			
			HOST_NAME: 					"主機名稱",

			HOST_NAME_CONFIRM: 			"該主機名稱包含非法字元，可能會導致意外的系統行為。您確定要繼續嗎？",

			GET_IP_WITH_UNICAST_DHCP: 	"使用單播 DHCP 取得IP位址(通常不需勾選此項目)",
			OPTIONAL: 					"(選填)",
			
			STATIC_IP: 					"固定 IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"自動",
						
			USER_NAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			
			INTERNET_IP_ADDR: 			"IP 位址",
			INTERNET_DNS: 				"網際網路DNS",
			SECONDARY_CONN: 			"第二連線",
			NONE: 						"無",
			INTERNET_PRIMARY_DNS:		"主要 DNS",
			INTERNET_SECONDARY_DNS: 	"次要 DNS",
			
			DYNAMIC_IP: 				"浮動 IP",
			DYNAMIC_IP_v6: 				"浮動IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"服務名稱",
			ACCESS_CONCENTRATOR_NAME:  	"存取集中器(AC)名稱",
			DETECT_ONLINE_INTERVAL: 	"偵測連線間隔",
			INTERVAL_TIPS: 				"秒。(範圍在0-120之間，預設值為10。)",
			IP_ADDR_MODE:  				"IP 位址",
			CONN_MODE: 					"連線模式",
			DHCP_LINK_UNPLUGGED: 		"WAN連接埠未插入網路線",
			
			AUTO: 						"自動",
			ON_DEMAND: 					"依需求",
			TIME_BASED: 				"依時間",
			MANUALLY: 					"手動",
			MAX_IDLE_TIME: 				"最長閒置時間",
			MAX_IDLE_TIME_TIPS: 		"分。 (0 代表永遠啟動)",
			PERIOD_OF_TIME: 			"時間間隔",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond Cable",
			AUTH_SERVER: 				"驗證伺服器",
			AUTH_DOMAIN: 				"驗證域名",
			L2TP: 						"L2TP",
			GATEWAY: 					"閘道",
			SERVER_IP_ADDR_NAME: 		"VPN 伺服器 IP/網域名稱",
			PPTP: 						"PPTP",
			TO: 						"到",
			
			TUNNEL_6TO4: 				"6to4 通道",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"取得非暫時性 IPv6 位址",
			GET_PREFIX_DELEGATION: 		"取得 IPv6 前綴授權",
			IPV6_ADDR: 					"IPv6 位址",

			GET_IPV6_WAY: 				"取得 IPv6 位址",
			AUTOMATICALLY:              "自動取得",
			SPECIFIED_BY_ISP: 			"由ISP指定",

			IPV6_ADDR_PREFIX: 			"IPv6 位址前綴",
			NONE_TEMPORARY: 			"非暫時性",

			PREFIX_DELEGATION: 			"前綴授權",
			ENABLE:                     "啟用",
			DISABLE:                    "停用",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 遮罩長度",
			CONFIG_TYPE: 				"設定類型",
			RD6_PREFIX: 				"6RD 前綴",
			RD6_PREFIX_LENGTH: 			"6RD 前綴長度",
			REPLY_IPV4_ADDR: 			"Border Reply IPv4 位址",
			MANUAL: 					"手動",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass-Through (橋接)",
			LOCAL_IPV6: 				"本地IPv6位址",
			PEER_IPV6: 					"對等IPv6位址",
			TUNNEL_ADDR: 				"通道位址",
			IPV4_NETMASK: 				"IPv4網路遮罩",
			CUSTOM: 					"自訂",
		    AFTR_NAME: 					"AFTR 名稱",


			
			
			IPV4_ADDR: 					"IPv4 位址",
			IPV4_MASK: 					"IPv4 子網路遮罩",
			IPV4_GATEWAY: 				"IPv4 預設閘道",

			DUPLEX: 					"雙工",
			AUTO_NEGOTIATION: 			"自動協商",
			FULL_DUPLEX_1000: 			"1000Mbps 全雙工",
			HALF_DUPLEX_1000:			"1000Mbps 半雙工",
			FULL_DUPLEX_100: 			"100Mbps 全雙工",
			HALF_DUPLEX_100: 			"100Mbps 半雙工",
			FULL_DUPLEX_10: 			"10Mbps 全雙工",
			HALF_DUPLEX_10: 			"10Mbps 半雙工"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"區域網路IPv4",
			LAN_IPv6: 					"區域網路IPv6",

			MAC_ADDRESS: 				"MAC 位址",
			IP_ADDRESS: 				"IP 位址",
			SUBNET_MASK: 				"子網路遮罩",
			CUSTOM: 					"自訂",

			IGMP: 						"啟用IGMP代理",
			


			ASSIGNED_TYPE: 				"分配類型",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+Stateless DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"位址前綴",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"位址",
			DELEFATED: 					"授權",
			STATIC: 					"固定的",
			SITE_PREFIX: 				"局部前綴",
			SITE_PREFIX_LEN: 			"局部前綴長度",

			PREFIX_TYPE:  				"局部前綴設定類型",
			LAN_IPV6_ADDR:  			"區域網路IPv6位址",

			RELEASE_TIME: 				"釋放時間",
			RELEASE_TIME_TIP: 			"秒。 (預設值為86400，若非必要請勿變更)",
			ADDRESS:					"位址",
			SAVE: 						"儲存",

			REBOOT_TIP: 				"路由器正跳到新的登入頁面。<br/> 請稍候…"

		},

		IPTV:{
			TITLE: 						"設定",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "啟用 IPTV", 
			MODE:  						"模式",
			IGMP_PROXY: 				"IGMP 代理",
			IGMP_VERSION: 				"IGMP版本",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"橋接",
			BASIC: 						"自訂",
			EXSTREAM: 					"新加坡-ExStream",
			RUSSIA:  					"俄羅斯",
			UNIFY:  					"馬來西亞-Unifi",
			MAXIS:  					"馬來西亞-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"網際網路",
			IP_PHONE: 					"IP-電話", 

			Q_TAG: 						"802.1Q Tag",
			ENABLE: 					"啟用",
			
			INTERNET_VLAN_ID: 			"網際網路 VLAN ID",
			INTERNET_VLAN_PRIORITY: 	"網際網路 VLAN 優先級",
			IP_PHONE_VLAN_ID: 			"IP-電話 VLAN ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-電話 VLAN 優先級",
			IPTV_VLAN_ID: 				"IPTV VLAN ID",
			IPTV_VLAN_PRIORITY: 		"IPTV VLAN 優先級",
			IPTV_MULTI_VLAN_ID: 		"IPTV 組播 VLAN ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV 組播 VLAN 優先級"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP 伺服器",
			
			SETTINGS: 					"設定",

			DHCP_SERVER: 				"DHCP 伺服器",
			ENABLE_DHCP_SERVER: 		"啟用 DHCP 伺服器",

			IP_ADDR_POOL: 				"IP 位址範圍",
			LEASETIME: 					"位址租用時間",
			LEASENOTE: 					"分鐘。(2到2880。預設值為120。)",
			
			GATEWAY: 					"預設閘道",
			DOMAIN: 					"預設網域",
			PRIMARYDNS: 				"主要 DNS",
			SECONDARYDNS: 				"次要 DNS",

			OPTIONAL: 					"(選填)",

			CLIENTSLIST: 				"DHCP 使用者列表",
			CLIENT_NUMBER: 				"使用者數量",
			CLIENT_NAME: 				"使用者名稱",
			MAC_ADDR: 					"MAC 位址",
			ASSIGNED_IP: 				"分配的IP 位址",
			LEASE_TIME: 				"租用時間",

			RESERVATION: 				"保留指定IP位址",

			RESERVED_IP: 				"保留 IP 位址",
			IP_ADDRESS: 				"IP 位址",
			DESCRIPTION: 				"描述",

			CLIENTSLIST: 				"DHCP 使用者列表",
			CLIENT_NUMBER: 				"使用者數量",

			ENABLE: 					"啟用",
			ENABLE_THIS_ENTRY: 			"啟用這個項目",
			BTN_VIEW:					"查看現有設備"
			
		},

		DDNS: {
			DDNS: 						"動態 DNS",
			SERVICEPROVIDER: 			"服務提供者",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"去註冊…",
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			DOMAIN_NAME_LIST: 			"網域名稱列表",
			DOMAIN_NAME: 				"網域名稱",
			LOGIN: 						"登入",
			LOGIN_SAVE: 				"登入與儲存", 
			LOGOUT: 					"登出",
			STATU_SUCCESS:				"成功",
			UPDATE_INTERVAL:			"更新間隔",
			ONE_HOUR:					"1小時",
			SIX_HOUR:					"6小時",
			TWETEEN_HOUR:				"12小時",
			ONE_DAY:					"1天",
			TWO_DAY:					"2天",
			THREE_DAY:					"3天",
			NEVER:						"永不",
			UPDATE:						"更新",
			STATU_INCORRENT:			"不正確的使用者名稱或密碼",
			STATU_ERR_DOMAIN:			"網域名稱錯誤",
			
			STATU_NO_LAUNCH:			"未啟動",
			STATU_FAIL_DDNS: 			"更新DynDNS失敗。",
			STATU_FAIL_NOIP: 			"更新No-IP失敗。",
			STATU_CONN:					"連線中..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"進階路由",
			STATIC_ROUTING: 			"固定路由",

			DESTINATION_NETWORK:		"目標網路",
			SUBNET_MASK: 				"子網路遮罩",
			DEFAULT_GATEWAY: 			"預設閘道",
			DESCRIPTION: 				"描述",
			
			SYSTEM_ROUTING_TABLE: 		"系統路由表",
			CLIENT_NUMBER: 				"使用者數量",

			GATEWAY: 					"閘道",
			INTERFACE: 					"介面",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"啟用",
			ENABLE_THIS_ENTRY: 			"啟用這個項目"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"設定",
			NOT_SUPPORT_5G: 			"該地區僅支援2.4GHz。請確保您選擇了正確的地區。",
			NOT_SUPPORT_60G: 			"該地區不支援60GHz。",
			ENABLE_TIPS: 				"您應該要先開啟無線射頻。",

			REGION: 					"地區",
			NOTICE:  					"若要使用無線網路功能，您必須保持實體無線網路開關為開啟狀態。",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"無線網路",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"啟用無線網路功能",

			WIRELESS_NETWORK_NAME: 		"無線網路名稱 (SSID)",
			WIRELESS_PASSWORD: 			"密碼",
			HIDE_SSID: 					"隱藏 SSID",

			SECURITY: 					"安全性",
			NO_SECURITY: 				"無安全性",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 - 個人(建議選項)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - 企業",
			WPA2_PERSONAL: 			    "WPA2-個人（推薦）",
			WPA2_ENTERPRISE: 		    "WPA2-企業",
			WEP: 						"WEP",

			VERSION: 					"版本",

			AUTO: 						"自動",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"加密",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"模式",
			MODE_B:  					"只使用802.11b",
			MODE_G:  					"只使用802.11g",
			MODE_N:  					"只使用802.11n",
			MODE_BG:  					"混合使用802.11b/g",
			MODE_GN: 					"混合使用802.11g/n",
			MODE_BGN:  					"混合使用802.11b/g/n",

			MODE_A_5: 					"只使用802.11a",
			MODE_AN_5: 					"混合使用802.11a/n",
			MODE_N_5: 					"只使用802.11n",
			MODE_AC_5:					"只使用802.11ac",
			MODE_NAC_5:					"混合使用802.11ac/n",
			MODE_ANAC_5:				"混合使用802.11a/n/ac",

			MODE_AD_60:					"僅使用802.11ad",

			CHANNEL_WIDTH: 				"頻道寬度",
			CHANNEL: 					"頻道",

			TRANSMIT_POWER: 			"傳輸功率",

			RADIUS_SERVER_IP: 			"RADIUS 伺服器 IP位址",
			RADIUS_PORT: 				"RADIUS 通訊埠",
			RADIUS_PASSWORD: 			"RADIUS 連線密碼",

			TYPE: 						"類型",
			OPEN_SYSTEM: 				"開放系統",
			SHARED_KEY: 				"共用金鑰",

			KEY_SELECTED: 				"選擇金鑰",
			KEY1: 						"金鑰1",
			KEY2: 						"金鑰2",
			KEY3: 						"金鑰3",
			KEY4: 						"金鑰4",

			WEP_KEY_FORMAT: 			"WEP 金鑰格式",
			ASCII: 						"ASCII碼",
			HEXADECIMAL: 				"十六進位碼",

			KEY_TYPE: 					"金鑰類型",
			BIT64: 						"64-bit",
			BIT128: 					"128-bit",
			BIT152: 					"152-bit",

			KEY_VALUE: 					"金鑰值",
			
			MHZ: 						"MHz",
			MHZ20: 						"20MHz",
			MHZ40: 						"40MHz",
			MHZ80: 						"80MHz",
			
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高"
		},

		WPS: {

			TITLE2: 					"路由器的PIN",
			ROUTERS_PIN_INFO: 			"其他設備無法透過輸入此路由器WPS的PIN碼與此路由器進行連線。",
			ENABLE_ROUTE_PIN: 			"路由器的PIN",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"生成",
			DFT: 						"預設值",

			TITLE: 						"WPS引導",
			SELECT_SETUP: 				"選擇一個設定模式",
			PUSH_BTN: 					"按按鈕 (建議選項)",
			PUSH_DES: 					"壓按路由器上的實體 \"按鈕\" 或點選本頁面內的\"連線\"",
			CONNECT: 					"連線",
			CANCEL: 					"取消",

			RESULT_HEAD: 				"無線網路使用者",
			RESULT_END: 				"已經成功地被加入到網路中。",
			NOT_FOUND: 					"周圍沒找到用戶端。點選按鈕再試一次。",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"沒有找到",
			ENTER_CLIENT_PIN: 			"輸入使用者端的 PIN",
			SWITCH_NOTE:				"若要使用WPS連接，請先透過Wi-Fi按鈕開啟無線功能。",
			SWITCH_NOTE2:				"請注意：在使用WPS功能前，您必須先設定正確的無線網路參數。",
			STATUS_PIN_ERROR: 			"不正確的 WPS PIN碼！ 請再檢查一次。",
			STATUS_ERROR: 				"錯誤。",
			STATUS_CONN_ERROR: 			"連線失敗。",
			STATUS_CONNING: 			"連線中...",
			STATUS_CANCEL: 				"已取消連線。",
			
			NOTE: 						"請注意：",
			BUTTON: 					"Wi-Fi按鈕是關閉的",
			ENABLE: 					"無線功能未啟用",
			HIDDEN: 					"隱藏SSID是開啟的",
			ENCRYPTION: 				"加密不正確",
			WPS: 						"在系統參數頁面中，WPS是停用的。",

			
			STATUS_CONN_OVERLAP: 		"連線失敗(重疊)。",
			STATUS_CONN_TIMEOUT: 		"連線失敗(逾時)。",
			STATUS_CONN_INACT: 			"連線無效。"

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"連線中的無線設備",
			CLIENT_NUMBER: 				"使用者數量",
			MAC_ADDRESS: 				"MAC 位址",
			CONN_TYPE: 					"連線類型",
			SECURITY: 					"安全性",
			RECEIVED_PACKETS: 			"已接收封包",
			SEND_PACKETS: 				"已傳送封包"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"設定",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"允許訪客可以互相連線",

			ALLOW_LOCAL: 				"允許訪客可以存取我的本地網路",
			
			WIRELESS: 					"無線網路",
			WIRELESS_24G_RADIO: 		"無線網路 2.4GHz",
			WIRELESS_5G_RADIO: 			"無線網路 5GHz",
			ENABLE_GUEST: 				"啟用訪客網路",

			NAME_SSID: 					"無線網路名稱 (SSID)",
			HIDE_SSID: 					"隱藏 SSID",
			PASSWORD_CHANGE_CYCLE: 		"密碼更新間隔",
			PER_DAY: 					"每天",
			PER_WEEK: 					"每周",
			PER_MONTH: 					"每月",
			NEVER: 						"永不",
			SECURITY: 					"安全性",
			NO_SECURITY: 				"無安全性",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-個人",

			VERSION: 					"版本",
			AUTO: 						"自動",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"加密",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"密碼"
		},

		NAT:{
			SETTINGS: 					"硬體NAT",
			STATUS: 					"硬體NAT",
			
			ALG_TITLE: 					"應用層閘道 (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP 穿透",
			L2TP_ALG: 					"L2TP 穿透",
			IPSEC_ALG: 					"IPSec 穿透",

			ENABLE_FTP_ALG: 			"啟用 FTP ALG",
			ENABLE_TFTP_ALG: 			"啟用 TFTP ALG",
			ENABLE_H323_ALG: 			"啟用 H323 ALG",
			ENABLE_RTSP_ALG: 			"啟用 RTSP ALG",
			ENABLE_PPTP_ALG: 			"啟用 PPTP 穿透",
			ENABLE_L2TP_ALG: 			"啟用 L2TP 穿透",
			ENABLE_IPSEC_ALG: 			"啟用 IPSec 穿透",
			NAT_ENABLE_NOTICE: 			"請注意：在NAT功能啟用後，您的設定才會生效。"
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"虛擬伺服器",

			SERVICE_NAME: 				"服務類型",
			EXTERNAL_PORT: 				"外部通訊埠",
			INTERNAL_IP: 				"內部 IP",
			INTERNAL_PORT: 				"內部通訊埠",
			PROTOCAL: 					"通訊協定",

			BTN_VIEW: 					"查看現有服務",

			EXSITTING_SERVICE: 			"現有服務",
			
			PROTOCAL_ALL: 				"全部",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX 或 XX)",
			EXT_PORT_TIPS: 				"(XX 或 XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX 或 空白 ,1-65535)",

			NOTICE:						"與遠端管理通訊埠發生衝突！您確定要繼續嗎？",
			NOTICE_INVALID_REMOTE:		"遠端管理是無效的，因為通訊埠80與虛擬伺服器發生衝突。請變更遠端管理通訊埠。",
			NOTICE_ENTER_ANOTHER:		"與遠端管理通訊埠衝突。請輸入另一個通訊埠。",
			NOTICE_PPTP_CONFLICT:		"與PPTP VPN通訊埠發生衝突了。請輸入另一個通訊埠。",
			NOTICE_OPENVPN_CONFLICT:	"與OPENVPN通訊埠發生衝突了。請輸入另一個通訊埠。",


			ENABLE_THIS_ENTRY: 			"啟用",
			OPERATION: 					"運作",
			CHOOSE: 					"選擇",
			NAT_ENABLE_NOTICE: 			"請注意：在NAT功能啟用後，您的設定才會生效。"
		},

		PORT_TRIGGERING:{
			TITLE: 						"通訊埠觸發",
			APPLICATION: 				"應用程式",
			TRIGGER_PORT: 				"觸發通訊埠",
			TRIGGER_PROTOCOL: 			"觸發通訊協定",

			EXTERNAL_PORTS: 			"外部通訊埠",
			EXTERNAL_PROTOCOL: 			"外部通訊協定",

			BTN_VIEW: 					"查看現有應用程式",

			EXSITTING_APPLICATION: 		"現有應用程式",
			APPLICATION_NAME: 			"應用程式名稱",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX 或 XX-XX,1-65535,最多 5 組)",
			
			NOTICE_PPTP_CONFLICT:		"與PPTP VPN通訊埠發生衝突了。請輸入另一個通訊埠。",
			NOTICE_OPENVPN_CONFLICT:	"與OPENVPN通訊埠發生衝突了。請輸入另一個通訊埠。",
			
			ENABLE_THIS_ENTRY: 			"啟用",
			OPERATION: 					"運作",
			
			PROTOCAL_ALL: 				"全部",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"請注意：在NAT功能啟用後，您的設定才會生效。"
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"啟用 DMZ",
			HARDWARESTATUS: 			"DMZ 主機 IP 位址",
			NAT_ENABLE_NOTICE: 			"請注意：在NAT功能啟用後，您的設定才會生效。"
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP 服務列表",
			CLIENT_NUMBER: 				"使用者數量",
			SERVICE: 					"服務描述",
			EXTERNAL_PORT: 				"外部通訊埠",
			PROTOCAL: 					"通訊協定",
			IP_ADDR: 					"內部 IP 位址",
			INTERNAL_PORT: 				"內部通訊埠",
			NAT_ENABLE_NOTICE: 			"請注意：在NAT功能啟用後，您的設定才會生效。"
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB數據機",
			LOCATION: 					"地區",
			MOBILE_ISP: 				"電信業者",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"連線模式",
			CONNECT_ON_DEMAND: 			"依需求連線",
			CONNECT_AUTOMATICALLY: 		"自動連線",
			CONNECT_MANUALLY: 			"手動連線",
			MAX_IDLE_TIME: 				"最長閒置時間",
			CONNECTION_TIP: 			"目前的網際網路存取為WAN優先。",
			IDLE_TIME_TIP: 				"連線模式與最長閒置時間不能手動設定。",
			MINUTES: 					"分鐘。(0代表會持續連線。)",

			AUTHENTICATION_TYPE: 		"驗證類型",
			AUTO: 						"自動",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"預設值為自動，若無特別需求請勿改變。",

			CONNECT: 					"連線",
			DISCONNECT: 				"斷線",

			SET_TIP: 					"手動設定撥號號瑪、APN、使用者名稱與密碼。",
			DIAL_NUMBER: 				"撥號號碼",
			APN: 						"APN",
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			OPTIONAL: 					"(選填)",
			MTU_SIZE: 					"MTU大小(以位元組計算)",
			MTU_SIZE_TIP: 				"位元組。 (預設值為1480，若非必要請勿變更。)",

			USE_FOLLOW_DNS_SERVER: 		"使用下列的DNS位址",
			PRIMARY_DNS: 				"主要 DNS",
			SECOND_DNS: 				"次要 DNS",

			UNPLUGGED: 					"未插入",
			IDENTIFYING: 				"辨識中…",
			IDENTIFY_SUCCESS: 			"辨識成功"
		},

		DISK_SETTING: {
			DISK_SET: 					"設備設定",
			SCAN: 						"掃描",
			SELFLY_REMOVE: 				"安全移除",
			SCAN_RESULT: 				"找到 %n 個磁碟",
			NOT_FOUND: 					"未找到",
			SELFLY_REMOVE: 				"安全移除",
			
			VOLUMN: 					"磁碟區",
			CAPACITY: 					"容量",
			FREESPACE: 					"剩餘空間",
			USBSPACE: 					"已用空間",
			
			STATUS: 					"狀態",
			INACT: 						"停止",
			ACTIVE: 					"啟動",
			
			USAGE: 						"使用",
			CAPACITY: 					"容量",
			OPERATION: 					"運作",	
			
			ACC: 						"帳號管理 ", 	 	
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			USE_LOGIN: 					"使用登入使用者",
			SCAN: 						"掃描",
			ENJECT_ALL: 				"全部退出",
			ENJECT: 					"退出",
			ADD_USER: 					"增加使用者",
			AUTH: 						"權限"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"離線下載",
			ITEMS:						"項目",
			FILE:						"檔案",
			FOLDER:						"資料夾",
			SIZE:						"大小",
			STATUS:						"狀態",
			DOWNLOAD:					"下載",
			REMAINTING:					"剩餘時間",
			SPEED:						"速度",
			SOURCE:						"來源",	
			DOWNLOADTO:					"下載到",	
			TORRENT_PC:					"從PC來的Torrent",
			TORRENT_USB:				"從USB來的Torrent",
			SOURCE_URL:					"RL",	
			URL:						"RL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP通訊埠",
			AMULEUDP:					"aMule UDP通訊埠",
			AMULESERVER:				"aMule伺服器",
			SCHEDULE:					"排程",
			MAXACTIVE:					"活動任務的最大數量",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"時區",
			DOWNLOADTIME:				"下載時間",
			REPEAT:						"重複",
			SPEEDLIMIT:					"速度限制",
			MAXDOWNLOAD:				"最大下載速度",
			MAXUPLOAD:					"最大上傳速度",
			SPEEDTIPS:					"(0代表不限制。)",
			BTPORT:						"BT下載通訊埠",
			SEED:						"在任務完成後仍保持種子傳輸",
			UNIT:						"KB/S",
			MODIFY:						"修改",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrent位置",
			CONNECT:					"已連線",
			DISCONNECTED:				"已中斷連線",
			CONNECTING:					"連線中",
			GENERAL:					"一般",
			COMPLETED:					"完成",
			NEWDEVICE:					"新設備",
			FOUNDUSB:					"偵測到新USB",
			CONNECTEDPEERS:				"已連線端點",
			OF:							"/",
			NUM_OF_CON:					"連線數量",
			NUM_OF_CON_G:				"全球最大連線數量",
			NUM_OF_CON_PT:				"每個Torrent連接端點的最大數量",
			EN_DHT_NET:					"啟用DHT網路",
			EN_PE_EX:					"啟用端點交換",
			EN_BT:						"啟用BitTorrent協定加密",
			GENERAL_SETTINGS:			"一般設定",
			BT_SETTINGS:				"BT設定",
			AMULE_SETTINGS:				"aMule設定",
			CLEAN:						"已完成移除",
			NONE_COMPLETE: 				"沒有已完成任務。"
		},

		FOLDER: {
			TITLE: 						"共用設定",
			ACCOUNT_TITLE: 				"共用帳號",
			ACCOUNT:					"帳號",
			AC_NOTE: 					"為共用內容準備一個帳號。您可以使用登入帳號或建立一個新帳號",
			
			AC_LOGIN: 					"使用預設帳號",
			AC_FOLLOW: 					"使用新帳號",

			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",
			CONFIRM: 					"確認密碼",

			SHARING_SETTING: 			"共用設定",
			SERVER_NAME: 				"網路/媒體 伺服器名稱",

			METHOD: 					"存取方式",
			LINK: 						"連接",
			PORT: 						"通訊埠",

			NETWORK_NEIGHBORHOOD: 		"網路芳鄰",
			FTP: 						"FTP",
			FTPEX: 						"FTP (透過網際網路)",

			SHARE_FOLDER: 				"資料夾共用",
			SHAREING_ALL: 				"全部共用",
			NOTE:  						"切換到開以共用所有文件和文件夾或保持它關閉以只共用指定的文件夾。", 
			ENABLE_AUTHENTICATION: 		"啟用驗證",
			SHAREING_FOLDER: 			"共用資料夾",
			
			SHARE_NAME: 				"資料夾名稱",
			FOLDER_PATH: 				"資料夾路徑",
			VOLUMN_NAME: 				"磁碟區名稱",

			SHARE_NAME: 				"資料夾名稱",
			FOLDER_PATH: 				"資料夾路徑",
			MEDIA_SHARING: 				"多媒體共用",
			STATUS: 					"狀態",

			GUEST_ACCESS: 				"允許訪客網路存取",
			ENABLE_AUTHENTICATION: 		"啟用驗證",
			ENABLE_WRITE_ACCESS: 		"啟用寫入存取",
			ENABLE_MEDIA_SHARE: 		"啟用媒體共用",
			
			BROWSE: 					"瀏覽",
			BROWSE_TITLE: 				"選擇一個資料夾",

			NO_VOLUMN:					"沒有磁碟區",
			
			NOTICE: 					"您確定要離開DDNS頁面？按儲存可以存檔並退出。按離開可以不存檔並離開。按取消可停留在本頁面。",
			NO_CHANGE_NOTICE: 			"您確定要離開DDNS頁面？",

			SAVE_FAILED_NOTICE: 		"儲存失敗",
			CONTINUE: 					"離開",
			CONTINUE_SAVE: 				"儲存",
			CANCLE: 					"取消",

			ENABLE: 					"啟用"

		},

		PRINT:{
			TITLE: 						"列印伺服器",
			NAME: 						"印表機名稱",
			ENABLE_PRINT_SERVER: 		"列印伺服器",
			NONE: 						"無",
			
			NOTE_TITLE: 				"請注意：",
			STEP1: 						"步驟1：",
			STEP2: 						"步驟2：",
			STEP3: 						"步驟3：",

			NOTE1: 						"在您的電腦上安裝印表機驅動程式。此步驟請參考印表機說明書進行。",
			NOTE2: 						"將USB印表機連接至路由器的USB埠。",
			NOTE3: 						"在您的電腦上安裝「TP-LINK USB Printer Controller」程式。請從我們的官方網站(<a class=\"link\" href=\"http://www.tp-link.com/tw/Support/\" target=\"_blank\">www.tp-link.com</a>)上，下載「TP-LINK USB Printer Controller Utility」",
			NOTE3_US: 					"若要安裝TP-LINK USB Printer Controller Utility。請從我們的官方網站： <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a> 下載。"
            },

		PARENTAL_CTR:{
			TITLE: 						"家長監護",
			STATUS: 					"家長監護",
			UNKNOWN: 					"未知的",

			DEVICE_CTR: 				"家長監護下之設備",
			DEVICE: 					"設備名稱",
			MAC_ADDRESS: 				"MAC 位址",
			TIME: 						"網際網路存取時間",
			DESCRIPTION: 				"描述",
			
			ENABLE_THIS_ENTRY: 			"啟用",
			OPTIONAL: 					"(選填)",
			BTN_VIEW: 					"查看現有設備",
			
			DEVICE_LIST: 				"設備列表",
			SYSTEM_TIME: 				"系統時間",
			
			RESTR: 						"內容限制",
			MODE: 						"限制",
			BLACKMODE: 					"黑名單",
			WHITEMODE: 					"白名單",
			ACCESS_DEVICES_LIST: 		"存取設備列表",
			
			CHOOSE: 					"選擇",
			ADD_A_NEW_KEYWORD: 			"新增一個封鎖的關鍵字",
			ADD_A_NEW_DOMAIN_NAME: 		"新增一個可以存取的網域名稱",
			
			YOURPC:						"您的電腦"
		},

		STREAMBOOST: {
			TITLE: 						"串流加速",
			INTERNET: 					"網際網路",
			ROUTER: 					"路由器",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"其他",

			DEVICE: 					"設備",
			RATE: 						"率",
			APPLICATION: 				"應用程式",

			NAME: 						"名稱",
			MAC_ADDRESS: 				"MAC 位址",
			IP_ADDRESS: 				"IP 位址",


			DEVICES: 					"設備"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"頻寬",
			TEST_BANDWIDTH: 			">測試頻寬",
			STREAMBOOST: 				"串流加速",
			ENABLE_STREAMBOOST: 		"啟用串流加速",
			UP_LIMITATION: 				"上傳限制(Mbps)",
			DOWN_LIMITATION: 			"下載限制(Mbps)",
			RUN_BANDWIDTH_TEST: 		"執行頻寬測試",
			TESTING: 					"測試中",
			TEST_FAILED: 				"測試失敗",
			TEST_SUCCEED: 				"測試成功",
			ENABLE_AUTOMATIC_TEST: 		"啟用自動測試",
			KEEP_UP_TO_DATE: 			"保持串流加速",
			ENABLE_AUTOMATIC_UPDATE: 	"啟用自動更新"

		},

		PRIORITY:{
			PRIORITY: 					"優先級",
			PRIORITY_TIPS: 				"優先級可以讓您修改設備的重要性。這對於您想要讓某些設備能有比較優先的封包傳輸權有極高的助益。",
			ALL_DEVICE: 				"全部設備",
			ACTIVE_DEVICE: 				"活動的設備",
			SAVE: 						"儲存",
			ID: 						"ID",
			DEVICE: 					"設備",
			TYPE: 						"類型",
			MAC_ADDRESS: 				"MAC 位址",
			STICK: 						"黏貼"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"統計",
			UP_TIME: 					"總計時間",
			DOWNLOADS: 					"下載",
			LAST_DAY: 					"最後一天",
			LAST_WEEK: 					"最後一週",
			LAST_MONTH: 				"最後一月",
			ALL_LAN_HOSTS: 				"全部LAN主機",
			OTHER: 						"其他"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"防火牆",
			ENABLE_SPI: 				"SPI 防火牆",

			DOS_PROTECTION: 			"DoS 防護",
			ENABLE_DOS: 				"DoS 防護",
			
			OFF: 						"關",
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			ICMP: 						"ICMP-FLOOD 攻擊防護",
			UDP: 						"UDP-FLOOD 攻擊防護",
			TCP: 						"TCP-SYN-FLOOD 攻擊防護",
			ENABLE_DOS_TIP:             "DoS防護與流量統計必須同時開啟。",

			IGNORE: 					"忽視來自於 WAN 連接埠的PING封包",
			FORBID: 					"禁止來自於 LAN 連接埠的PING封包",

			BLOCK_DOS: 					"阻擋的 DoS 主機列表",
			HOST_NUMBER: 				"主機數量",
			IP_ADDRESS: 				"IP 位址",
			MAC_ADDRESS: 				"MAC 位址"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"存取管理",
			ENABLE_ACCESS: 				"存取管理",

			ACCESS_MODE: 				"存取模式",
			DEFAULT_ACCESS_MODE: 		"預設存取模式",
			BLACK_LIST: 				"黑名單",
			WHITE_LIST: 				"白名單",
			
			WIRED:						"有線網路",
			WIRELESS:					"無線網路",

			DEVICE_ONLINE: 				"在線設備",
			NAME: 						"設備名稱",
			IP_ADDRESS: 				"IP 位址",
			MAC_ADDRESS: 				"MAC 位址",
			CONN_TYPE: 					"連線類型",

			BLOCK: 						"阻擋",

			DEVICE_IN_WHITE: 			"在白名單內的設備",
			DEVICE_IN_BLACK: 			"在黑名單內的設備"
		},

		IP_MAC:{
			TITLE: 						"設定",
			ENABLE_ARP: 				"ARP 綁定",

			ARP_LIST: 					"ARP 列表",
			ARP_NUM: 					"ARP 項目數",

			MAC_ADDRESS: 				"MAC 位址",
			IP_ADDRESS: 				"IP 位址",
			BOUND: 						"已綁定",
			UNBOUND: 					"未綁定",

			BINDING_LIST: 				"綁定列表",
			DESCRIPTION: 				"描述",
			OPTIONAL: 					"(選填)",
			ENABLE_THIS_ENTRY: 			"啟用"
		},

		TIMESET: {
			TITLE: 						"時間設定",
			ZONE: 						"時區",
			DATE: 						"日期",
			DATEFORMAT: 				"MM/DD/YYYY",
			TIME: 						"時間",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"NTP 伺服器 I",
			NTP2: 						"NTP 伺服器 II",
			OPTIONAL: 					"(選填)",

			CURRENT_TIME:  				"目前時間",
			SET_TIME: 					"設定時間",
			AUTOMATIC: 					"從網際網路自動取得",
			MANUAL: 					"手動",
			AUTOMATIC_BTN: 				"取得",


			GETGMT: 					"取得GMT時間",

			
			GETGMT_SUCCESS: 			"從NTP伺服器取得時間成功",
			GETGMT_TIMEOUT: 			"從NTP伺服器取得時間逾時",
			GETGMT_WAIT: 				"等待中",
			
			M: 							"月",
			W: 							"週",
			D: 							"日",
			H: 							"時",
			
			DAYLIGHT_SAVING: 			"日光節約",
			ENABLE_DAYLIGHT: 			"啟用 日光節約",
			START: 						"開始",
			END: 						"結束",

			RUNNING_STATUS: 			"運行狀態",
			DOWN: 						"日光節約已關閉",
			UP: 						"日光節約已開啟"
		},

		DIAG:{
			TITLE: 						"診斷",
			DIAGNOSTIC_TOOL: 			"診斷工具",
			PING: 						"Ping",
			TRACE: 						"追蹤路由",

			IPADDR: 					"IP 位址/ 網域名稱",
			COUNT: 						"Ping 次數",
			
			BASIC: 						"基本",
			ADVANCED: 					"進階設定：",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Ping 封包大小",
			PKTUNIT: 					"(4-1472 位元組)",

			TIMEOUT: 					"Ping 逾時",
			TIMOUTUNIT: 				"(100-2000 毫秒)",

			TTL: 						"追蹤路由最大 TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"開始",
			STOP: 						"停止"
		},

		FIRMWARE:{
			TITLE: 						"韌體升級",
			FIRMWARE_INFO:  			"您的韌體已是最新",
			INFO: 						"設備資訊",
			REMOTE_TITLE: 				"線上升級",
			LOCAL_TITLE: 				"本地升級",

			NEWFILE: 					"新韌體檔",
			FIRMWAREVERSION: 			"韌體版本",
			HARDWAREVERSION: 			"硬體版本",
			LATESTVERSION: 				"最新版本",
			CONFIRM_CONTENT:			"您確定要升級韌體嗎？",
			WARNING:					"韌體升級中… <br/> 為避免任何損害，在處理期間，請等待並保持電源開啟且不要進行任何操作。",
			REBOOTING: 					"重新啟動中… <br/> 為避免任何損害，在處理期間，請等待並保持電源開啟且不要進行任何操作。",
			DO_NOT_OPERATE: 			"升級中…<br/>在升級處理期間請勿進行任何操作。",
			FIRMWARE_UPDATING_NOTE: 	"1. 韌體升級中…",
			REBOOTING_NOTE: 			"2. 重新啟動中…",
			SCREEN_UPDATING_NOTE: 		"3. 螢幕更新中…",
			UPGRADE_FAILED: 			"升級失敗。",
			UPGRADE: 					"升級",
			CHECK: 						"檢查",
			DOWNLOADING: 				"下載中…",
			UPGRADE_INOF: 				"為避免任何損害，請保持路由器的電源開啟。",
			NOTE: 						"注意：",
			NO_UPGRADE: 				"此為最新版本",

			UPGRADING: 					"升級中…",
			RETRY: 						"重試",
			CANCEL: 					"取消",
			ILEGAL_DEVICE:				"無法辨識該設備。請聯絡TP-LINK技術支援。",
			UPGRADE_FAIL: 				"無法升級。請稍後再試。",
			CHECK_UPGRADE:				"檢查升級"
		},

		BACKUP:{
			BACKUP: 					"備份",
			BACKUPTIP: 					"儲存您目前設定值",

			RESTORE: 					"復原",
			RESTORETIP: 				"從備份檔復原已儲存的設定",
			
			RESTORE_WARN:				"路由器復原中…<br/>還原過程中請勿進行其他操作。",
			RESTORE_CONFIRM_CONTENT: 	"您確定要幫路由器恢復至這個備份檔案的設定嗎？",
			
			FILE: 						"檔案",

			FACTORY: 					"恢復原廠預設值",
			FACTORYTIP: 				"將所有的設定值清除，回到原廠狀態",
			FACTORY_CONFIRM_CONTENT:	"您確定要將路由器恢復至原廠預設值嗎？",
			FACTORY_WARN:				"路由器復原中",
			
			BACKUPBTN: 					"備份",
			RESTOREBTN: 				"復原",
			FACTORYBTN: 				"恢復原廠預設值"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"帳號管理",
			
			OLDUSER: 					"舊使用者名稱",
			OLDPWD: 					"舊密碼",

			NEWUSER: 					"新使用者名稱",
			NEWPWD: 					"新密碼",
			CONFIRM: 					"確認新密碼",

			RECOVERYINFO: 				"密碼復原",
			ENABLE_PASSWORD_RECOVERY: 	"啟用 密碼復原",
			FROM: 						"寄件人",
			TO: 						"收件人",
			SMTP_SERVER: 				"SMTP 伺服器",
			
			ENABLE_AUTHENTICATION: 		"啟用驗證",
			USERNAME: 					"使用者名稱",
			PASSWORD: 					"密碼",

			TEST_MAIL: 					"測試信件",

			LOCAL:						"本地管理",
			LOCAL_MAC_AUTH: 			"本地MAC驗證",
			ACCESS: 					"允許所有LAN連線的設備存取",
			ACCESS_TIPS: 				"切換至開啟，以允許所有LAN連線的設備存取，或保持它關閉，僅讓指定的設備進行管理。",
			
			MAC_ADDRESS: 				"MAC 位址",
			VIEW_BTN: 					"查看現有設備",
			DESCRIPTION: 				"描述",

			EXIST_DEVICE:               "現有設備",

			OPTIONAL: 					"(選填)",
			ENABLE_THIS_ENTRY: 			"啟用",

			DEVICE_NAME:				"設備名稱",
			IP_ADDRESS:					"IP 位址",
			

			REMOTE: 					"遠端管理",
			DISABLE_REMOTE_MANAGEMENR: 	"停用 遠端管理",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"啟用 全部設備遠端管理",
			ENABLE_REMOTE_MANAGEMENR: 	"啟用 指定設備遠端管理",
			WEB: 						"網頁管理通訊埠",

			NOTICE:						"與虛擬伺服器通訊埠發生衝突！您確定要繼續嗎？",
			NOTICE_ENTER_ANOTHER:		"與虛擬伺服器通訊埠衝突。請輸入另一個通訊埠。",

			REMOTEIP: 					"遠端管理 IP 位址",
			REMOTEIPNOTE: 				"(輸入 255.255.255.255 可開放給全部IP位址)"
			
		},

		SYSLOG:{
			TITLE: 						"系統日誌",
			LOG_FILTER: 				"日誌篩選：",
			
			TYPE_EQ: 					"類型=",
			
			ALL: 						"全部",

			FIREWALL: 					"防火牆", 
			NAT: 						"NAT",
			DDNS: 						"動態 DNS",
			UPNP:						"UPnP",
			IMB:            			"IP&MAC 綁定",
			IPTV:						"IPTV",
			DHCPS:						"DHCP 伺服器",
			IGMP_PROXY:					"IGMP 代理",
			DOMAIN_LOGIN:				"域名登入",
			BASIC_SECURITY: 			"基本安全性",
			PARENTAL_CONTROL: 			"家長監護",
			ACCESS_CONTROL: 			"存取管理",
			DOS_PROTECTION: 			"DoS 防護",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"流量統計",
			TIME_SETTINGS: 				"時間設定",
			ACCOUNT_MANAGEMENT: 		"帳號管理",
			LOCAL_MANAGEMENT: 			"本地管理",
			REMOTE_MANAGEMENT: 			"遠端管理",
			LOCALE: 					"區域",
			FACTORY_RESET: 				"恢復原廠預設值",
			LED_CONTROLLER: 			"LED控制器",
			NETWORK: 					"網路",
			USBSHARE: 					"USB共享",
			AND: 						"與",
			LEVEL: 						"層級",
			EMERGENCY:					"緊急",
			ALERT:						"警示",
			CRITICAL:					"嚴重",
			ERROR: 						"錯誤",
			WARNING: 					"警告",
			NOTICE: 					"注意",
			INFO: 						"資訊",
			DEBUG: 						"除錯",

			INDEX: 						"索引",
			TYPE: 						"類型",
			TIME: 						"時間",
			LEVEL_COL:					"層級",

			CONTENT: 					"日誌內容",
			
			MAIL_LOG: 					"郵件日誌",
			SAVE_LOG: 					"儲存日誌",

			SEND_OK: 					"寄送成功",
			SEND_FAILED: 				"寄送失敗",

			MAIL_SETTING: 				"郵件設定",

 			FROM: 						"寄件人",
 			TO: 						"收件人",
 			SMTP_SERVER: 				"SMTP 伺服器",
 			ENABLE_AUTHENTICATION: 		"啟用驗證",

 			USERNAME: 					"使用者名稱",
 			PASSWORD: 					"密碼",
 			CONFIRM_PASSWORD: 			"確認密碼",

 			AUTO_MAIL: 					"啟用 自動寄信",
 			LOG_AT: 					"記錄在",
 			HH_MM: 						"每天(HH:MM)",

 			LOG_EVERY: 					"記錄每隔",
 			HOURS: 						"小時"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"設定",
			STATUS: 					"啟用 QoS",
			UPBANDWIDTH: 				"上傳頻寬",
			DOWNBANDWIDTH: 				"下載頻寬",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"速度測試",
			RULE_LIST: 					"QoS 規則列表",
			RULE: 						"QoS 規則",
			ID: 						"ID",
			NAME: 						"名稱",
			TYPE: 						"類型",
			DETAIL: 					"詳細",
			PRIORITY: 					"優先級",

			APPLICATION: 				"應用程式",
			APPLICATION_LIST: 			"應用程式列表",
			CUSTOM_APP: 				"自訂應用程式",
			MAC_ADDR: 					"MAC 位址",
			MAC_ADDR_P: 				"MAC",
			IP_ADDR: 					"IP 位址",
			IP_P: 						"IP：",
			PHYSICAL_PORT: 				"實體連接埠",

			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			PROTO: 						"通訊協定",
			PORT: 						"通訊埠",
			PROTO_P: 					"通訊協定",
			PORT_P: 					"通訊埠",
			PORT_TIPS: 					"(XX 或 XX-XX,1-65535,最多 5 組)",

			ALL: 						"全部",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"自訂",

			WIFI_HOME: 					"WIFI-主機",
			WIFI_GUEST: 				"WIFI-訪客",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"資料庫升級",

			NEWFILE: 					"新資料庫檔案",
			FIRMWAREVERSION: 			"資料庫版本",
			CONFIRM_CONTENT:			"您確定要更新資料庫嗎？",
			WARNING:					"資料庫更新中... <br/>更新過程中請不要進行其他操作。",
			
			UPGRADE: 					"升級",

			SERVICE_RESTART: 			"QoS服務重啟",
			
			TYPE: 						"類型",
			BY_DEVICE: 					"依設備",
			BY_APP: 					"依應用程式",
			BY_PHY: 					"依實體連接埠",

			HIGH_PRIORITY_LBL: 			"高優先級",
			MIDDLE_PRIORITY_LBL: 		"中優先級",
			LOW_PRIORITY_LBL: 			"低優先級",

			HIGH_PRIORITY: 				"高優先級",
			MIDDLE_PRIORITY: 			"中優先級",
			LOW_PRIORITY: 				"低優先級"

		},

		APPLICATION:{
			APP_LIST: 					"應用程式列表",
			GAME_LIST: 					"遊戲列表",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"流量統計",
			ENABLE_STATISTICS: 			"流量統計",

			TITLE: 						"流量統計列表",
			IP_MAC: 					"IP 位址/MAC 位址",
			TPKT: 						"總計封包數",
			TBYTE: 						"總計位元組",
			CPKT: 						"目前封包數",
			CBYTE: 						"目前位元組",
			CICMP: 						"目前的ICMP Tx",
			CUDP: 						"目前的UDP Tx",
			CSYN: 						"目前的SYN Tx",
			
			DELETE_CONFIRM: 			"您確定要刪除這些流量統計嗎？",
			DELETE_ALL_CONFIRM: 		"您確定要刪除全部的流量統計嗎？",

			RESET_ALL: 					"全部重置"
		},

		SYSPARA:{
			W24G: 						"無線網路 2.4GHz",
			W5G: 						"無線網路 5GHz",
			W60G: 						"60GHz無線",
			W24G_WDS: 					"2.4GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"請注意：您的無線網路功能已經被關閉。如果您想使用這個功能，請打開路由器上的實體Wi-Fi按鈕。",

			ENABLE_TIPS: 				"您的無線網路功能已經被關閉。",

			BEACON: 					"Beacon 間隔",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS 臨界值",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Fragmentation 臨界值",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM 間隔",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"群組金鑰更新周期",
			GROUPUNIT: 					"秒",
			
			MU_MIMO_FEATURE: 			"多使用者-MIMO",
			MU_MIMO: 					"啟用MU-MIMO",
			
			WMM_FEATURE: 				"WMM 功能",
			WMM: 						"啟用 WMM",

			GI_FEATURE: 				"Short GI 功能",
			GI: 						"啟用 Short GI",

			AP_FEATURE: 				"AP 隔離功能",
			AP: 						"啟用 AP 隔離",

			WDS_FEATURE: 				"WDS 橋接",
			WDS: 						"啟用 WDS 橋接",
			
			SSID_BRIDEGE: 				"SSID (被橋接端)",
			SURVEY: 					"搜尋AP",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC 位址",
			SSID: 						"SSID",
			SIGNAL: 					"訊號",
			CHANNEL: 					"頻道",
			SECURITY: 					"安全性",
			CHOSEN: 					"選擇",
			AP_NUMBER:					"AP 數量",

			TOTAL: 						"總計項目",

			MAC: 						"MAC 位址 (被橋接端)",
			MACUNIT: 					"例如：00-1D-0F-11-22-33",

			SECURITY: 					"安全性",
			NO: 						"否",
			NONE: 						"無",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"密碼",
			
			AUTH_TYPE: 					"驗證類型",
			AUTO: 						"自動",
			OPEN: 						"開放系統",
			SHARED: 					"共用金鑰",

			WEP_INDEX: 					"金鑰索引",
			KEY1: 						"金鑰1",
			KEY2: 						"金鑰2",
			KEY3: 						"金鑰3",
			KEY4: 						"金鑰4",

			WEP_KEY_FORMAT: 			"WEP 金鑰格式",
			ASC: 						"ASCII碼",
			HEX: 						"十六進位碼",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"啟用 WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"啟用 NAT",
			
			NAT_BOOST: 					"NAT 加速",
			ENABLE_NAT_BOOST: 			"啟用NAT加速",
			
			MEDIA_SERVER: 				"多媒體伺服器",
			SCAN_INTERVAL: 				"自動掃描間隔(小時)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"DoS 防護等級設定",

			ICMP: 						"ICMP-FLOOD 封包等級",
			UDP: 						"UDP-FLOOD 封包等級",
			TCP: 						"TCP-FLOOD 封包等級",

			WDS_MODE: 					"WDS 模式",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			TO: 						"到",
			NOTICE_NAT_REBOOT: 			"重新啟動中",

			NOTICE_NAT_BOOST: 			"修改NAT加速將導致本設備的重新啟動，您確定要繼續嗎？",
			NOTICE:						"您的路由器頻道與被橋接的AP的頻道不同。您要變更嗎？",

			UNIT: 						"(5-7200)封包/秒",
			LED: 						"LED",
			NIGHT_MODE: 				"夜間模式",
			PERIOD_NIGHT_TIME: 			"夜間模式期間",
			ENABLE: 					"啟用",
			HH_MM: 						"(HH:MM)",
			TO: 						"到",
			NIGHT_MODE_NOTE:            "您的LED是關閉的。如果您想要使用此功能，請按一下LED按鈕或點選頁面右上方的LED。",
			NOTE2:                      "夜間模式週期是基於路由器的系統時間而生效。請確認您已經設定路由器的時間。"
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"目前沒有憑證，在啟用VPN伺服器前，請先<b>生成</b>一個。",
			NO_CERT_NOTE2: 				"目前沒有憑證，在匯出設定前，請先<b>生成</b>一個。",
			ENABLE_VPN_SERVER: 			"啟用VPN伺服器",
			SERVICE_TYPE: 				"服務類型",
			SERVICE_PORT: 				"服務通訊埠",
			VPN_SUBNET: 				"VPN子網路/網路閘道",
			CLIENTS_ACCESS: 			"使用者存取",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"僅家用網路",
			INTERNET_HOME: 				"網際網路與家用網路",
			CERT_STR: 					"目前沒有憑證，點選確定以生成一個並儲存您的設定。",
			CERT_STR2: 					"目前沒有憑證，點選確定以生成一個並匯出您的設定。",
			CONF_FILE: 					"設定檔", 
			EXPORT_CONF_FILE: 			"匯出設定檔",
			EXPORT: 					"匯出",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"使用者IP位址",
			ACCOUNT_USERNAME: 			"使用者名稱",
			ACCOUNT_PASSWORD: 			"密碼",
			CLIENT_IP_NOTE: 			"(最多10個使用者)",
			SAME_SUBNET_NOTE: 			"用戶端IP位址與LAN IP位址不能在相同的子網路中。<br/>請輸入另一個。",
			CONFLICT_WITH_DHCP: 		"用戶端IP位址與DHCP IP位址池發生衝突。<br/>請再次輸入。",
			CONFLICT_WITH_RESERVED: 	"用戶端IP位址與保留IP位址發生衝突。<br/>請再次輸入。",
			CONFLICT_WITH_OPENVPN: 		"用戶端IP位址與OpenVPN IP位址不能在相同的子網路中。<br/>請再次輸入。",
			SAME_SUBNET_NOTE2: 			"VPN子網路/網路閘道與LAN IP位址不能在相同的子網路中。<br/>請輸入另一個。",
			CONFLICT_WITH_DHCP2: 		"VPN子網路/網路閘道與DHCP IP位址池發生衝突。<br/>請再次輸入。",
			CONFLICT_WITH_RESERVED2: 	"VPN子網路/網路閘道與保留IP位址發生衝突。<br/>請再次輸入。",
			CONFLICT_WITH_PPTPVPN: 		"VPN子網路/網路閘道與PPTP VPN IP位址不能在相同的子網路中。<br/>請再次輸入。",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN IP位址與OPENVPN IP位址不能在相同的子網路中。<br/>請再次輸入。",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN IP位址與PPTP VPN IP位址不能在相同的子網路中。<br/>請再次輸入。",
			VPN_MASK_ERROR: 			"網路遮罩不可大於255.255.255.248。<br/>請再次輸入。",
			ACCOUNT_LIST: 				"帳號列表（最多16個使用者）",
			ADVANCED_SETTING: 			"進階設定：",
			ALLOW_SAMBA: 				"允許Samba（網路芳鄰）存取",
			ALLOW_NETBIOS: 				"允許NetBIOS穿透",
			ALLOW_UNENCRYPTED_CONN: 	"允許未加密連線",
			USERNAME_CONFLICT: 			"此使用者名稱已存在。請輸入另一個。",
				
			NOTICE_VS_CONFLICT:			"與虛擬伺服器的外部通訊埠發生衝突。請輸入另一個通訊埠。",
			NOTICE_PT_CONFLICT:			"與通訊埠觸發的外部通訊埠發生衝突。請輸入另一個通訊埠。",
			NOTICE_VS_MODIFY:			"與虛擬伺服器的外部通訊埠(1723)發生衝突。請前往<a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">虛擬伺服器</a>頁面並修改虛擬伺服器的外部通訊埠。",
			NOTICE_PT_MODIFY:			"與通訊埠觸發的外部通訊埠(1723)發生衝突。請前往<a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">通訊埠觸發</a>頁面並修改通訊埠觸發的外部通訊埠。",
			
			GENERATE_CERT: 				"憑證",
			GENERATE_NEW_CERT: 			"生成憑證",
			GENERATE: 					"生成",
			GENERATE_TIPS: 				"憑證生成中…<br/>這將會花一些時間，請稍候。",
			CERT_SUCCESS: 				"成功",
			CERT_FAIL: 					"失敗，請再試一遍。",
			
			VPN_CONNECTIONS: 			"VPN連線",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN 連線",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN 連線",
			USER: 						"使用者",
			REMOTE_IP: 					"遠端IP",
			ASSIGNED_IP: 				"分配的IP"
		}
	};
})(jQuery);
