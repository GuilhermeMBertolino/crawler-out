(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			FORGET_PASSWORD: 			"비밀번호를 분실한 경우?",
			LOGIN: 						"로그인",
			IMPORTANT_UPDATE_INFO: 		"프론트 엔트 장치와의 충돌을 피하기 위하여, 공유기의 IP 주소가 업데이트되었습니다. ",
			CONTINUE: 					"계속",

			IMPORTANT_NOTICE: 			"중요한 주의사항",
			OR: 						"계속 방문하기를 원하십니까?",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"공유기를 후면 리셋 버튼을 공장초기값으로 복원하기 위해 약 10초간 눌러 주십시오.",
			FORGET_PASSWORD_INFO_1: 	"분실한 경우 비밀번호 복구 기능을 사용할 수 있습니다. 인증 코드는 사용자 이름과 비밀번호를 재설정에 대한 지정된 이메일 주소로 전송 됩니다.",
			FORGET_PASSWORD_SEND_FAILED:"코드를 보내지 못했습니다! 인터넷 연결을 확인하시기 바랍니다.",

			VERIFICATION_CODE: 			"인증 코드",

			RECEIVE_CODE: 				"코드를 보내기",

			CONFIRM: 					"확인",

			SEC: 						" ",

			USER_CONFLICT: 				"로그인 충돌!",
			FIRST_TIME: 				"TP-LINK Archer AD7200을 구매해 주셔서 감사합니다. 시작하시려면 기기 비밀번호를 설정해 주시기 바랍니다.",
			
			USER_CONFLICT_INFO: 		"호스트 %USER% %HOST% (%IP%/%MAC%)을 가지고있는 사용자는 현재 공유기에 기록됩니다.",
			USER_CONFLICT_INFO_1: 		"사용자 %USER% (%MAC%)가 현재 공유기에 접속중입니다. 동시에 로그인할 수 없습니다. 나중에 다시 로그인하시기 바랍니다.",
			USER_CONFLICT_INFO_2: 		"사용자 %USER% (%IP%)는 현재 공유기에 기록됩니다.",
			
			LOGIN_FAILED: 				"로그인 실패!",
			LOGIN_FAILED_COUNT: 		"로그인 하지 못했습니다 %num1 시간과 여전히 있습니다 %num2 왼쪽을 시도합니다.",
			NO_COOKIE: 					"쿠키는 로그인을 사용할 수 있어야 합니다.", 

			FORGET_PASSWORD_NOTE: 		"비밀번호 복구 기능을 구성 하지 않은 경우. 공유기를 공장초기값으로 복원하려면 후면 리셋 버튼을 약 10초간 눌러주십시오."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"지금 업그레이드",
			REMIND: 						"나중에 알림",
			NOTICE:    						"안녕하세요 %PRODUCT% 공유기 용 새 펌웨어가 출시되었습니다.",
			NEVER: 							"이 버전 무시하기"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN 접속 에러!",
			STATUS: 						"상태",
			INFO: 							"정보",
			SETUP: 							"인터넷 접속을 설정합니다",
			NEVER: 							"다시 묻지 않음"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"펌웨어 버전",
			HARDWARE_VERSION: 				"하드웨어 버전",
			HELP_SUPPORT: 					"지원",
			FAQ: 							"묻고 답하기",
			CONFIRM_REBOOT: 				"공유기를 다시 부팅 하시겠습니까?",
			CONFIRM_LOGOUT: 				"로그 아웃 하시겠습니까?",
			UPGRADE_ALERT_1: 				"현재 펌웨어는 TP-LINK 클라우드 서비스를 지원하지 않습니다. www.tp-link.com 에서 최신 펌웨어를 업데이트 받아 설치하시기를 강력히 권장하는 바입니다.",
			UPGRADE_ALERT_2: 				"현재 펌웨어는 TP-LINK 클라우드 서비스를 지원하지 않습니다. 우측 상단의 업데이트를 클릭해 펌웨어를 업데이트 하시기를 강력히 권장하는 바입니다.",
			REBOOTING: 						"재부팅중",

			MODE_SWITCH: 					"모드 전환",
			ACCESS_POINT: 					"액세스 포인트",
			ACCESS_POINT_TIPS: 				"유선 네트워크를 무선 네트워크로 바꾸려면",
			ROUTER: 						"공유기",
			ROUTER_TIPS: 					"복수의 장치를 유선으로 또는 무선으로 연결할 수 있게 하려면",
			REPEATER: 						"리피터",
			REPEATER_TIPS: 					"무선 네트워크의 신호 범위를 확장하려면",
			MODE_REBOOT_TIP: 				"모드를 수정하면 이 장치를 재부팅해야 합니다. 계속하시겠습니까? ",
			MODE_FAIL_TIP: 					"모드 전환에 실패했습니다. 나중에 다시 시도하거나 공유기를 재부팅하십시오."
		},

		NAV: {
			QUICK_SETUP: 				"빠른 설치",
			BASIC: 						"기본",
			ADVANCED: 					"고급"
		},

		CONTROL: {
			MODE: 						"모드",
			LOGIN: 						"로그인",
			LED:                        "LED",
			LED_ON:                     "LED 켜기",
			LED_OFF:                    "LED 끄기",			
			LED_DISABLED:               "나이트 모드 중에는 LED 상태를 변경할 수 없습니다.",			
			LOGOUT: 					"로그아웃",
			UPDATE: 					"업데이트",
			REBOOT: 					"재부팅"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"알바니아",
			ALGERIA: 					"알제리",
			AMERICAN_SAMOA: 			"아메리칸 사모아",
			ARGENTINA: 					"아르헨티나",
			ARMENIA: 					"아르메니아",
			ARUBA: 						"아루바",
			AUSTRALIA: 					"오스트레일리아",
			AUSTRIA: 					"오스트리아",
			AZERBAIJAN: 				"아제르바이잔",
			BAHAMAS: 					"바하마",
			BAHRAIN: 					"바레인",
			BANGLADESH: 				"방글라데시",
			BARBADOS: 					"바베이도스",
			BELARUS: 					"벨라루스",
			BELGIUM: 					"벨기에",
			BELIZE: 					"벨리즈",
			BERUMUDA: 					"버뮤다",
			BOLIVIA: 					"볼리비아",
			BOSNIA_HERZEGOWINA: 		"보스니아 헤르체고비나",
			BRAZIL: 					"브라질",
			BRUNEI_DARUSSALAM: 			"브루나이",
			BULGARIA: 					"불가리아",
			CAMBODIA: 					"캄보디아",
			CANADA: 					"캐나다",
			CAYMAN_ISLANDS: 			"케이맨 제도",
			CHILE: 						"칠레",
			CHINA: 						"중국",
			COLOMBIA: 					"콜롬비아",
			COSTA_RICA: 				"코스타리카",
			CROATIA: 					"크로아티아",
			CYPRUS: 					"키프로스",
			CZECH_REPUBLIC: 			"체코",
			DENMARK: 					"덴마크",
			DOMINICAN_REPUBLIC: 		"도미니카 공화국",
			ECUADOR: 					"에콰도르",
			EGYPT: 						"이집트",
			EL_SALVADOR: 				"엘살바도르",
			ESTONIA: 					"에티오피아",
			ETHIOPIA: 					"에스토니아",
			FAEROE_ISLANDS: 			"페로 제도",
			FINLAND: 					"핀란드",
			FRANCE: 					"프랑스",
			FRENCH_GUIANA: 				"프랑스령 기아나",
			FRENCH_POLYNESIA: 			"프랑스령 폴리네시아",
			GEORGIA: 					"조지아",
			GERMANY: 					"독일",
			GREECE: 					"그리스",
			GREENLAND: 					"그린란드",
			GRENADA: 					"그레나다",
			GUADELOUPE: 				"과들루프",
			GUAM: 						"괌",
			GUATEMALA: 					"과테말라",
			HAITI: 						"아이티",
			HONDURAS: 					"온두라스",
			HONG_KONG: 					"홍콩",
			HUNGARY: 					"헝가리",
			ICELAND: 					"아이슬란드",
			INDIA: 						"인도",
			INDONESIA: 					"인도네시아",
			IRAN: 						"이란",
			IRAQ: 						"이라크",
			IRELAND: 					"아일랜드",
			ISRAEL: 					"이스라엘",
			ITALY: 						"이탈리아",
			JAMAICA: 					"자메이카",

			JAPAN: 						"일본  ",
			JAPAN_1: 					"일본 1",
			JAPAN_2: 					"일본 2",
			JAPAN_3: 					"일본 3 ",
			JAPAN_4: 					"일본 4",
			JAPAN_5: 					"일본 5",
			JAPAN_6: 					"일본 6",

			JORDAN: 					"요르단",
			KAZAKHSTAN: 				"카자흐스탄",
			KENYA: 						"케냐",

			NORTH_KOREA: 				"북한",
			KOREA_REPUBLIC: 			"대한민국",
			KOREA_REPUBLIC_3: 			"대한민국 3",

			KUWAIT: 					"쿠웨이트",
			LATVIA: 					"라트비아",
			LEBANON: 					"레바논",
			LIBYA: 						"리비아",
			LIECHTENSTEIN: 				"리히텐슈타인",
			LITHUANIA: 					"리투아니아",
			LUXEMBOURG: 				"룩셈부르크",
			MACAU: 						"마카오",
			MACEDONIA: 					"마케도니아 공화국",
			MALAWI: 					"말라위",
			MALAYSIA: 					"말레이시아",
			MALDIVES: 					"몰디브",
			MALTA: 						"몰타",
			MARTHINIQUE: 				"마르티니크섬",
			MAURITIUS: 					"모르셔스",
			MAYOTTE: 					"마요트섬",
			MEXICO: 					"멕시코",
			MONACO: 					"모나코",
			MONGOLIA: 					"몽골",
			MOROCCO: 					"모로코",
			NEPAL: 						"네팔",
			NETHERLANDS: 				"네덜란드",
			NETHERLANDS_ANTILLES: 		"네덜란드령 안틸 제도",
			
			NEW_ZEALAND: 				"뉴질랜드",
			NICARAGUA: 					"니카라과",
			NIGERIA: 					"나이지리아",
			NORWAY: 					"노르웨이",
			NORTHERN_MARIANA_ISLANDS: 	"북 마리아나 제도",
			OMAN: 						"오만",
			PAKISTAN: 					"파키스탄",
			PANAMA: 					"파나마",
			PAPUA_NEW_GUINEA: 			"파푸아 뉴기니",
			PARAGUAY: 					"파라과이",
			PERU: 						"페루",
			PHILIPPINES: 				"필리핀",
			POLAND: 					"폴란드",
			PORTUGAL: 					"포르투갈",
			PUERTO_RICO: 				"푸에르토리코",
			QATAR: 						"카타르",
			REUNION: 					"레위니옹",
			ROMANIA: 					"루마니아",
			RUSSIA: 					"러시아",
			RWANDA: 					"르완다",
			SAMOA: 						"사모아",
			SAUDI_ARABIA: 				"사우디 아라비아",
			SINGAPORE: 					"싱가포르",
			SLOVAK_REPUBLIC: 			"슬로바키아",
			SLOVENIA: 					"슬로베니아",
			SOUTH_AFRICA: 				"남아프리카 공화국",
			SPAIN: 						"스페인",
			SRI_LANKA: 					"스리랑카",
			SURINAME: 					"수리남",
			SWEDEN: 					"스웨덴",
			SWITZERLAND: 				"스위스",
			SYRIA: 						"시리아",
			TAIWAN: 					"대만",
			TANZANIA: 					"탄자니아",
			THAILAND: 					"태국",
			TRINIDAD_TOBAGO: 			"트리니다드 토바고",
			TUNISIA: 					"튀니지",
			TURKEY: 					"터키",
			UGANDA: 					"우간다",
			UKRAINE: 					"우크라이나",
			UNITED_ARAB_EMIRATES: 		"아랍에미리트",
			UNITED_KINGDOM: 			"영국",
			UNITED_STATES: 				"미국",
			URUGUAY: 					"우루과이",
			UZBEKISTAN: 				"우즈베키스탄",
			VENEZUELA: 					"베네수엘라",
			VIETNAM: 					"베트남",
			VIRGIN_ISLANDS: 			"미국령 버진 아일랜드",
			YEMEN: 						"예멘",
			ZIMBABWE: 					"짐바브웨"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) 에니웨톡, 콰절런", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) 미드웨이 제도, 사모아",
			HAWAII: 					"(GMT-10:00) 하와이",
			ALASKA: 					"(GMT-09:00) 알래스카",
			PACIFIC_TIME: 				"(GMT-08:00) 태평양 표준시",
			MOUNTAIN_TIME: 				"(GMT-07:00) 산지 표준시 (미국과 캐나다)",
			CENTRAL_TIME: 				"(GMT-06:00) 중부 표준시 (미국과 캐나다)",
			EASTERN_TIME: 				"(GMT-05:00) 동부 표준시 (미국과 캐나다)",
			CARACAS:					"(GMT-04:30) 카라카스",
			ATLANTIC_TIME: 				"(GMT-04:00) 대서양 표준시 (캐나다)",
			NEWFOUNDLAND: 				"(GMT-03:30) 뉴펀들랜드",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) 브라질리아, 브에노스아이레스",
			MID_ATLANTIC: 				"(GMT-02:00) 중부-대서양",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) 아조레스 제도, 카보베르데 제도",
			GREENWICH_MEAN_TIME: 		"(GMT) 그리니치 표준시: 더블린, 런던",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) 베를린, 스톡홀름, 로마, 베른, 브뤼셀",
			ATHENS_HELSINKI: 			"(GMT+02:00) 아테네, 헬싱키, 동유럽, 이스라엘",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) 바그다드, 쿠웨이트, 나이로비, 리야드, 모스크바",

			TEHERAN: 					"(GMT+03:30) 테헤란",

			ABU_DHABI: 					"(GMT+04:00) 아부다비, 무스카트, 카잔, 볼고그라드",

			KABUL: 						"(GMT+04:30) 카불",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) 이슬라마바드, 카라치, 에카테린부르크",

			MADRAS_CALCUTTA: 			"(GMT+05:30) 마드라스, 캘커타, 봄베이, 뉴 델리",
			KATMANDU: 					"(GMT+05:45) 카트만두",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) 알마 아타, 다카",
			RANGOON: 					"(GMT+06:30) 랑군",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) 방콕, 자카르타, 하노이",
			BEIJING_HONGKONG: 			"(GMT+08:00) 베이징, 홍콩, Perth, 싱가포르",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) 도쿄, 오사카, 삿포로, 서울, 야쿠츠크",

			ADELAIDE: 					"(GMT+09:30) 애들레이드",

			BRISBANE_CANBERRA: 			"(GMT+10:00) 브리즈번, 캔버라, 멜버른, 시드니",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) 마가단, 솔로몬 군도, 뉴칼레도니아",
			FIJI_KAMCHATKA: 			"(GMT+12:00) 피지, 캄차카 반도, 오클랜드",
			NUKU: 						"(GMT+13:00) 누쿠 알로 파"
		},

		APPLIST:{
			APP:						"응용 프로그램",
			GAME:						"게임",
			QQ:							"큐큐",
			MSN:						"MSN",
			LINE:						"LINE",
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
			TELNET:						"Telnet",
			VPN:						"VPN",
			FTP:						"FTP",
			WWW:						"WWW",
			DNS:						"DNS",
			ICMP:						"ICMP",
			SMTP:						"SMTP",
			NNTP:						"NNTP",
			POP3:						"POP3",
			HTTPS:  					"HTTPS",


			END:						""
		},

		DATE: {
			DAY: 						"날",

			MONDAY: 					"월요일",
			TUESDAY: 					"화요일",
			WEDNESDAY: 					"수요일",
			THURSDAY: 					"목요일",
			FRIDAY: 					"금요일",
			SATURDAY: 					"토요일",
			SUNDAY: 					"일요일",
			
			MON: 						"월",
			TUES: 						"화",
			WED: 						"수",
			THUR: 						"목",
			FRI: 						"금",
			SAT: 						"토",
			SUN: 						"일",

			JAN: 						"1월",
			FEB: 						"2월",
			MAR: 						"3월",
			APR: 						"4월",
			MAY: 						"5월",
			JUN: 						"6월",
			JUL: 						"7월",
			AUG: 						"8월",
			SEP: 						"9월",
			OCT: 						"10월",
			NOV: 						"11월",
			DEC: 						"12월"

		},

		HOUR: {
			AM_1: 						"오전 1시",
			AM_2: 						"오전 2시",
			AM_3: 						"오전 3시",
			AM_4: 						"오전 4시",
			AM_5: 						"오전 5시",
			AM_6: 						"오전 6시",
			AM_7: 						"오전 7시",
			AM_8: 						"오전 8시",
			AM_9: 						"오전 9시",
			AM_10: 						"오전 10시",
			AM_11: 						"오전 11시",
			AM_12: 						"오전 12시",
			PM_1: 						"오후 1시",
			PM_2: 						"오후 2시",
			PM_3: 						"오후 3시",
			PM_4: 						"오후 4시",
			PM_5: 						"오후 5시",
			PM_6: 						"오후 6시",
			PM_7: 						"오후 7시",
			PM_8: 						"오후 8시",
			PM_9: 						"오후 9시",
			PM_10: 						"오후 10시",
			PM_11: 						"오후 11시",
			PM_12: 						"오후 12시"
		},

		ORDER: {
			"1ST": 						"첫 번째",
			"2ND": 						"두 번째",
			"3RD": 						"세 번째",
			"4TH": 						"네 번째",
			"5TH": 						"마지막",
			"1ST_": 					"첫 번째",

			TH: 						"번째"
		},

		GRID: {
			CLIENT_NUMBER: 				"클라이언트 번호",

			ID: 						"ID",
			MODIFY: 					"수정",
			STATUS: 					"상태",
			ENABLE: 					"사용",

			OPERATION: 					"조작",
			CHOOSE: 					"선택",
			DESCRIPTION: 				"설명",
			

			AUTO_REFRESH: 				"자동 새로 고침",
			REFRESH: 					"새로 고침",
			NUMBER: 					"수 ",
			ENABLED: 					"사용",
			DISABLED: 					"사용 안 함",
			ACTIVE: 					"활성화",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"추가",
			CHOOSE: 					"선택",
			EDIT: 						"편집",
			DELETE: 					"삭제",
			DELETE_ALL: 				"모두 삭제",
			REMOVE: 					"제거",
			RESET: 						"재설정",
			RESET_ALL: 					"전체 해제",
			DETECT: 					"감지",
			ENABLE: 					"사용",
			DISABLE: 					"사용 안 함",
			PAUSE:						"중지",
			RESUME:						"다시 시작",
			
			REFRESH: 					"새로 고침",
			SEARCH: 					"검색…",
			BROWSE: 					"검색",

			SAVE: 						"저장",
			BACK: 						"뒤로",

			PREV: 						"이전",
			NEXT: 						"다음",
			FINISH: 					"완료",
			
			ON: 						"켜기",
			OFF: 						"끄기",
			LOW: 						"저",
			MIDDLE: 					"중",
			HIGH: 						"고",
			
			OK: 						"확인",
			CANCEL: 					"취소",

			YES: 						"예",
			NO: 						"아니오",
			
			CONNECTED: 					"연결",
			CONNECTING: 				"연결 중",
			DISCONNECTING: 				"연결 끊기  중",
			DISCONNECTED: 				"연결되지 않음",

			PASSWORD_HINT: 				"비밀 번호",
			FILEBUTTONTEXT: 			"검색",
			FILEBLANKTEXT: 				"파일을 선택하십시오.",
			NOSELECTEDTEXT: 			"옵션을 선택하십시오.",

			ADD_A_NEW_KEYWORD: 			"새 도메인 이름 추가",

			SUCCESSED: 					"성공!",
			FORM_SAVED: 				"저장",
			FORM_FAILED: 				"실패",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"저장",
			GRID_FAILED: 				"실패",
			GRID_NONE_SELECT: 			"하나 이상의 항목을 선택하세요.",
			GRID_DELETE_COMFIRM: 		"이 항목을 삭제 하시겠습니까?",
			GRID_DELETE_ALL_COMFIRM: 	"모든 항목을 삭제 하시겠습니까?",
			GRID_MAX_RULES: 			"최대 항목 초과했습니다.",
			KEYWORD_MAX_OVERFLOW: 		"키워드의 수가 한계를 초과했습니다.",

			NOTE: 						"주의:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"잘못된 형식입니다.",
			BLANKTEXT: 					"필드값은 필수입니다.",

			EMAIL: 						"잘못 된 이메일 주소입니다.",
			NUMBER: 					"잘못된 형식입니다.",

			NUMBER_MIN: 				"잘못된 값입니다. %min 보다 큰 숫자를 입력하십시오.",
			NUMBER_MAX: 				"잘못된 값입니다. %max미만의 숫자를 입력하십시오.",

			NUMBER_MIN_MAX: 			"잘못 된 값입니다. %min에서 %max 사이의 숫자를 입력 하십시오.",
			HEX: 						"이 필드는 16 진수이어야 합니다.",

			IP: 						"잘못된 형식입니다.",

			IP_NO_ALL_ZERO:				"주소는 0.0.0.0이 안됩니다.",
			IP_NO_LOOP:					"주소에는 루프백 IP가 안됩니다.",
			IP_NO_D_TYPE:				"주소는 D클래스 IP는 안됩니다.",
			IP_NO_E_TYPE:				"주소는 D클래스 IP는 안됩니다.",
			IP_NO_ALL_ONE:				"주소는 255.255.255.255은 안됩니다.",
			IP_NO_FIRST_ALL_ONE:		"주소는 255로 시작하지 않아야 합니다.",
			IP_NO_FIRST_ZERO:			"주소는 0으로 시작하지 않아야 합니다.",
			MASK_NO_ALL_ONE:			"마스크는 255.255.255.255로 할 수 없습니다.",

			IPV6: 						"잘못된 형식입니다.",
			IPV6_NOT_GLOBAL:			"잘못된 형식입니다.",
			IPV6_NOT_PREFIX:			"잘못된 형식입니다.",
			IP_DOMAIN: 					"잘못된 형식입니다.",
			IPV6_DOMAIN: 				"잘못된 형식입니다.",
			PPTP_INVALID_IP:			"잘못된 IP 주소입니다.",
			MAC: 						"잘못된 형식입니다.",
			MULTI_MAC:					"잘못된 형식입니다.",
			MAC_INVALID_BROADCAST:		"MAC은 브로드캐스트 주소일 수 없습니다. ",
			MAC_INVALID_MULTICAST:		"MAC은 멀티캐스트 주소일 수 없습니다. ",
			DATE: 						"잘못된 형식입니다.",
			DATE_INVALID: 				"01/01/1970에서 12/31/2030 사이의 날짜를 입력하십시오.",
			MASK: 						"잘못된 형식입니다.",
			DOMAIN: 					"잘못된 형식입니다.",
			STRING_DOMAIN:              "잘못된 형식입니다.",
			USER: 						"잘못된 형식입니다.",
			NOTE: 						"잘못된 형식입니다.",
			PWD: 						"잘못된 형식입니다.",
			SSID: 						"잘못된 형식입니다.",
			NAME:						"잘못된 형식입니다.",
			ASCII_VISIBLE:				"잘못된 형식입니다.",
			STRING_VISIBLE:				"잘못된 형식입니다.",
			STRING_VISIBLE_NO_COMMA:    "잘못된 형식입니다.",
			STRING_VISIBLE_ALLOW_BLANK: "잘못된 형식입니다.",
			VPN_NAME_PWD: 				"1-15자리 영문자, 숫자, - 또는 _ 를 입력해 주십시오."
		},


		ERROR: {			
			"00000001":					"잘못 된 파일 형식입니다.",
			"00000002":					"체크섬 오류가 발생했습니다.",
			"00000003":					"파일이 너무 큽니다.",
			"00000004":					"업로드 오류가 발생했습니다.",
			"00000005":					"재부팅 오류입니다.",
			"00000006":					"알수 없는 오류가 발생했습니다.",
			"00000007":					"항목이 이미 존재합니다. 또 다른 하나를 입력 하십시오.",

			"00000009":					"잘못 된 포트입니다.",
			"00000010":					"포트 번호 이어야 합니다.",

			"00000011":					"사용자 이름 값과 동일해야 합니다.",
			"00000012": 				"사용자 이름은 알파벳 문자로 시작해야 합니다.",

			"00000021":					"잘못된 형식입니다.",

			"00000032": 				"값 보다 낮아야 합니다.",
			"00000033": 				"값 보다는 더 적은 중간 및 낮아야 합니다.",
			"00000034": 				"잘못된 값입니다. 5에서 7200 사이의 숫자를 입력하십시오.",

			"00000039": 				"기본값 0을 사용하거나 30에서 86400 사이의 값을 입력하십시오.",
			"00000040": 				"SSID와 MAC 주소가 필요합니다.",

			"00000042": 				"기본값 80을 사용 또는 1024 ~ 65535 사이의 값을 입력하십시오.",

			"00000045": 				"기본 게이트웨이와 LAN IP 주소는 동일한  서브넷에 있어야 합니다. 다시 입력해주십시오.",

			"00000046": 				"IP 주소와 MAC 주소는 공백입니다. 다시 입력하십시오.",
			"00000047": 				"IP 주소가 잘못되었습니다.다시 LAN IP 주소의 동일한 서브넷에 입력해 주시기 바랍니다.",

			
			"00000049":					"대상 네트워크 유효 하지 않습니다.",

			"00000050": 				"잘못된 DNS 서버 IP 주소입니다. 다른 IP 주소를 입력하십시오.",
			"00000051": 				"MAC 주소가 이미 존재합니다. 또 다른 하나를 입력 하십시오.",
			"00000052": 				"IP 주소가 이미 존재합니다. 다른 IP 주소를 입력하십시오.",

			"00000053": 				"시작 주소는 종료 보다 더 클수 없습니다. 다시 입력해 주시기 바랍니다.",

			"00000054": 				"IP 주소가 잘못되었습니다.다시 LAN IP 주소의 동일한 서브넷에 입력해 주시기 바랍니다.",

			"00000055": 				"IP는 LAN 주소와 동일할 수 없습니다.",

			"00000056": 				"원격 IP 주소와 현재 LAN IP 주소는 동일한 서브넷에 있어서는 안됩니다. 또 다른 하나를 입력해 주시기 바랍니다.",

			"00000057": 				"잘못 된 PSK 암호를 다시 입력 해 주세요입니다.",
			"00000058": 				"잘못 된 WEP 암호를 다시 입력 해 주세요입니다.",

			"00000059": 				"잘못된 IP 주소와 서브넷 마스크입니다. 다시 입력하십시오.",

			"00000060": 				"WAN IP 주소와 LAN IP 주소는 동일한 서브넷에 해서는 안. 또 다른 하나를 입력 하십시오.",

			"00000061": 				"시작 시간이 종료 시간 보다 이전 이어야 합니다.",

			"00000062": 				"필드값은 필수입니다.",
			"00000063": 				"필드값은 필수입니다.",

			"00000064": 				"호스트를 MAC 주소를 차단합니다.",
			"00000065": 				"이 항목이 존재하는 항목과 충돌하였습니다. 확인하시기 바랍니다.",
			
			"00000066": 				"암호는 8 ~ 63 자 또는 64 자리의 16 진수이어야한다.",
			"00000067": 				"암호는 10 자리의 16 진수이어야 합니다.",
			"00000068": 				"암호는 5 ASCII 문자이어야 합니다.,",
			"00000069": 				"암호는 26 자리의 16 진수이어야 합니다.",
			"00000070": 				"암호는 13 ASCII 문자이어야 합니다.",
			"00000071": 				"암호는 32 자리의 16 진수이어야 합니다.",
			"00000072": 				"The 암호는 16 ASCII 문자이어야 합니다.",
			"00000073": 				"암호는 64 자 미만이어야 합니다.",

			"00000074": 				"잘못 된 파일 형식입니다.",

			"00000075": 				"PIN 번호는 8자여야 합니다.",

			"00000076": 				"존재하는 항목과 충돌되었습니다. 트리거 포트를 확인하고 트리거 프로토콜을 하시기 바랍니다.",
			"00000077": 				"IP는 LAN IP 주소와 동일할 수 없습니다.",
			"00000078": 				"호스트 IP 주소는 LAN IP 주소와 동일할 수 없습니다.",

			"00000080": 				"비밀번호가 일치 하지 않습니다. 다시 시도하십시오.",

			"00000083": 				"게이트웨이는 IP와 동일할 수 없습니다. ",
			"00000084": 				"기본 설정 DNS는 IP와 동일할 수 없습니다. ",
			"00000085": 				"보조 DNS는 IP와 동일할 수 없습니다. ",
			"00000086": 				"기본 설정 DNS는 보조 DNS와 동일할 수 없습니다. ",

			"00000088": 				"이 작업은 원격 관리를 허용하지 않습니다.",
			"00000089": 				"사용자는 %num번의 시도를 초과 했습니다. 두 시간 후 다시 시도 하십시오.",

			"00000090": 				"대상 LAN IP를 될 수 없습니다.",
			"00000091": 				"대상 WAN IP 수 없습니다.",

			"00000092": 				"IP 주소와 LAN IP 주소는 동일한 서브넷에 있어서는 안됩니다. 다시 입력해 주십시오.",
			"00000093": 				"WAN IP 주소와 LAN IP 주소는 동일한 서브넷에 해서는 안. 또 다른 하나를 입력 하십시오.",

			"00000094": 				"Vlan Id는 같을 수 없습니다.",
			"00000095": 				"적어도 하나의 인터넷 포트가 필요합니다.",

			"00000096": 				"키워드는 이미 존재합니다.",

			"00000097": 				"Wi-Fi 버튼이 ON될 때까지 2.4GHz 주파수 대역에 대한 구성이 적용되지 않습니다.",
			"00000098": 				"Wi-Fi 버튼이 ON될 때까지 5GHz 주파수 대역에 대한 구성이 적용되지 않습니다.",
			"00000099": 				"무선 랜 버튼이 ON 될 때까지 2.4와 5GHz의 주파수 대역에 대한 구성이 적용되지 않습니다.",

			"00000100": 				"5GHz의 네트워크 구성으로 인해 해당 지역 / 국가의 조건에서 사용할 수 없습니다.",
			"00002100": 				"60GHz 네트워크 설정은 고객님의 지역/국가 제한으로 인해 사용이 불가능합니다.",

			"00000101": 				"무선 기능이 꺼져 있습니다. 이 기능을 사용하려면 무선 랜 버튼을 켜십시오.",
			"00000102": 				"무선 기능이 꺼져 있습니다. 이 기능을 사용하려면 무선 랜 버튼을 켜십시오.",
			"00002102": 				"무선 기능이 꺼져 있습니다. 이 기능을 사용하려면 무선 랜 버튼을 켜십시오.",

			"00000103": 				"무선 기능이 꺼져 있습니다. 이 기능을 사용하려면 무선 랜 버튼을 켜십시오.",
			"00000104": 				"무선 기능을 사용할 수 없습니다.",

			"00000105": 				"QoS 및 IPTV는 동시에 활성화 될 수 없습니다",

			"00000106": 				"IP 주소는 LAN IP 주소와 동일할 수 없습니다.",
			
			"00000107": 				"대상 이미 존재합니다.",

			"00000110": 				"IP 주소와 LAN IP 주소는 동일한 서브넷에 있어야 합니다.",
			
			"00000111": 				"QoS 및 <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT</a> 부스트는 동시에 활성화 될 수 없다.",
			"00000112": 				"WDS 기능 2.4GHz 또는 5GHz 대역에서 사용할 수 있습니다.",
			"00000113": 				"WDS 및 게스트 네트워크에 동시에 사용할 수 없습니다.",
			"00000114": 				"트래픽 통계 및 <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT</a> 부스트는 동시에 활성화 될 수 없습니다.",

			"00000117": 				"도메인 이름이 이미 존재합니다.",
			"00000118": 				"도메인 이름의 수가 한계를 초과했습니다.",
			"00000119":					"NAT 부스트 사용하는 경우, <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> 는 <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">자동으로 비활성화됩니다</a>.",

			"00000120": 				"비밀번호는 5 또는 13자리 ASCII 문자이어야 합니다.",
			"00000121": 				"비밀번호는 16진수 10 또는 26자리이어야 합니다.",
			"00000122": 				"사용자 이름과 비밀번호는 공백입니다. 계속 진행하시겠습니끼?",
			"00000123": 				"저장 중… 처리하는 동안 아무 작동도 하지 마십시오.",
			"00000124": 				"반복되는 잘못된 PIN 사용 연결 때문에 공유기의 PIN이 잠겼습니다.",

			"00000125": 				"QoS 규칙의 수가 한계를 초과했습니다.",
			"00000126": 				"파일 크기가 한계를 초과했습니다.",
			"00000127": 				"파일의  내용이 잘못되었습니다.",
			"00000128": 				"적어도 하나의 응용 프로그램을 선택하십시오.",
			"00000129": 				"적어도 하나의 물리적 포트를 선택하십시오.",
			"00000130":					"WPS 기능은 사용할 수 없습니다.",
			"00000131": 				"NTP 서버는 루프백 주소가 아니어야 합니다.  ",
			"00000132": 				"모드 전환에 실패했습니다. 나중에 다시 시도하거나 공유기를 재부팅하십시오.",
			"00000133": 				"잘못된 DMZ 호스트 IP 주소입니다. 유효한 주소를 입력해주십시오.",
			"00000134":  				"잘못된 내부 IP입니다. 유효한 내부 IP를 입력해주십시오.",
			"00000135": 				"펌웨어 파일 오류",
			"00000136": 				"백업 파일 오류",
			"00000137": 				"잘못된 IP 주소입니다. 유효한 IP 주소를 입력하십시오.",
			"00000139": 				"잘못된 비밀번호 복구 매개 변수입니다.",
			"00000140": 				"잘못된 코드입니다.",
			"00000141": 				"비밀번호 복구를 사용할 수 없습니다.",
			"00000142": 				"코드를 보내지 못했습니다. 인터넷 연결을 확인하시기 바랍니다.",
			"00000143": 				"잘못된 이메일 주소입니다.",
			"00000144": 				"잘못된 이메일 메세지입니다.",
			"00000145": 				"호스트를 찾을 수 없습니다.",
			"00000146": 				"인증에 실패했습니다.",
			"00000147": 				"포트는 1 ~ 65535 사이여야 합니다.",
			"00000148": 				"포트 범위의 경우 시작 번호는 끝 번호보다 작아야 합니다. 다시 입력해 주십시오.",
			"00000149": 				"포트 번호가 겹칩니다. 다시 입력해 주십시오.",
			
			"00000150": 				"패스가 존재하지 않습니다.",
			"00000151": 				"지정 패스가 맞지 않습니다.",
			"00000152": 				"패스에 문제가 있습니다.",
			"00000153": 				"볼륨을 찾을 수 없습니다.",
			"00000154": 				"USB 기기가 없습니다.",
			
			"00000155": 				"PPTP VPN주소와 LAN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다른 주소를 입력해 주십시오.",
			"00000156": 				"PPTP VPN주소와 OpenVPN 클라이언트 IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다른 주소를 입력해 주십시오.",

			"00000222":  				"입력값 한도를 초과하였습니다.",
			"00000231": 				"입력값 중복입니다.",
			"00000232": 				"잘못된 URL입니다.",
			"00000233":					"최소 1일을 선택해 주십시오.",

			"00000301": 				"최대 공유 폴더 목록입니다.",
			"00000302": 				"볼륨에서 최대 공유 폴더 목록입니다.",
			"00000303": 				"중복된 공유 폴더 경로입니다.",
			"00000304": 				"중복된 공유 폴더 이름입니다. ",

			"00001000":					"업그레이드 작업이 실행되고 있습니다. 잠시 기다려주십시오.",
			"00001001": 				"WDS 기능은 2.4GHz거나 5GHz 밴드에서 작동할 수 있습니다. ",
			"00001002":					"잘못된 코드입니다.",

			"00001123": 				"입력 응용프로그램 규칙 항목이 공백입니다. 적어도 하나의 규칙 항목을 입력하십시오.",
			"00001124": 				"입력 물리적 포트 규칙 항목이 공백입니다. 적어도 하나의 규칙 항목을 선택하십시오.",

            "00002000": 				"ISP가 지정된 정적 공유와 충돌됩니다. 계속 진행하시겠습니까?",

            "00003000":                 "IPv6 통과 지점은 IPTV와 충돌됩니다! 이 기능을 사용하려면 IPTV 설정을 꺼주시기 바랍니다. ",
			"00004139": 				"인터넷에 접속되어있지 않음",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"요청시간 초과입니다. 인터넷 접속을 확인하신 뒤 다시 시도해 보십시오.",
			"00004141": 				"알수 없는 오류가 발생했습니다.",
			"00004142": 				"잘못된 확인 코드입니다.",
			"00004143": 				"잘못된 비밀번호입니다.",
			"00004144": 				"사용자이름이 이미 존재합니다.",
			"00004145": 				"잘못된 비밀번호입니다.",//new password
			"00004146": 				"이 기기를 해제(unbind)할 수 없습니다. 다시 시도해 주십시오.",
			"00004147": 				"해당 기기는 다른 계정에 묶여 있습니다.",
			"00004148": 				"잘못된 입력값입니다.",
			"00004149": 				"도메인 명이 이미 존재합니다.",
			"00004150": 				"펌웨어를 다운로드 할 수 없습니다. 인터넷 접속을 확인하신 뒤 다시 시도해 보십시오.",
			"00004151": 				"동일한 클라우드 계정에 1000개 이상의 도메인 명을 등록할 수 없습니다.",
			"00004152": 				"해당 기기는 다른 도메인 명에 묶여 있습니다.",
			"00004153": 				"해당 도메인 명은 다른 기기에 묶여 있습니다.",
			"00004154": 				"서버가 응답하지 않습니다. 다시 시도해 주십시오.",
			"00004155": 				"계정이 존재하지 않습니다.",
			"00004156": 				"클라우드 어플리케이션을 시작할 수 없습니다. 기기를 재부팅한 뒤 다시 시도해 주십시오.",
			"00004157": 				"클라우드 서버에 연결할 수 없습니다. 인터넷 접속을 확인하신 뒤 다시 시도해 보십시오.",
			"00004158": 				"WAN포트가 빠져 있습니다.",
			"00004159": 				"인터넷에 연결할 수 없습니다. 서비스 공급자에 문의하신 뒤 다시 시도해 주십시오. ",
			"00004160": 				"DHCP 서버에서 자동으로 IP 주소를 획득할 수 없습니다. WAN 연결 유형을 확인하거나 잠시 후 다시 시도해 주십시오.",
			"00004161": 				"PPPOE인증에 실패했습니다. 사용자 이름 및 비밀번호를 다시 확인해 주십시오.",
			"00004162": 				"PPPOE서버에 연결할 수 없습니다.",
			"00004164": 				"PPTP 인증에 실패했습니다. 사용자 이름 및 비밀번호를 다시 확인해 주십시오.",
			"00004165": 				"PPTP 서버에 연결할 수 없습니다.",
			"00004167": 				"L2TP 인증에 실패했습니다. 사용자 이름 및 비밀번호를 다시 확인해 주십시오.",
			"00004168": 				"L2TP서버에 연결할 수 없습니다.",
			"00004169": 				"알려지지 않은 에러. 다시 시도해 주십시오.",
			"00004170": 				"WAN포트가 빠져 있습니다.",
			"00004171": 				"인터넷에 접속되어있지 않음",
			"00004172": 				"연결에 실패했습니다.",
			"00004173": 				"잘못된 사용자 이름 또는 비밀번호",
			"00004174": 				"잘못 된 이메일 주소입니다.",
			"00004175": 				"잘못된 사용자 이름 형식입니다.",
			"00004176": 				"이메일이 이미 존재합니다.",
			"00004177": 				"계정 정보에 접근할 수 없습니다. 페이지를 새로고침 해 주십시오.",
			"00004178":   				"시스템 에러 페이지를 새로고침 한 뒤 다시 시도해 주십시오.",
			"00004179":   				"이 기기를 결속(bind)할 수 없습니다. 다시 시도해 주십시오.",
			"00004180":   				"해당 기기는 본 클라우드 계정에서 결속 해제되었습니다. 본인의 계정으로 다시 로그인해 이 기기를 계정에 결속해 주십시오.",
			"00004181":   				"기기가 오프라인 상태입니다. 인터넷 접속을 확인해 주십시오.",
			"00004182":   				"이메일을 보낼 수 없습니다. 인터넷 접속을 확인하신 뒤 다시 시도해 보십시오.",
			"00004183":   				"계정에는 문자가 포함되어야 합니다.(원문확인요망) ",
			"00004184":   				"비밀번호를 20회 틀리셨습니다. 2시간 뒤에 다시 시도해 주시기 바랍니다.",
			"00004185":   				"한 시간 동안 인증 코드를 10회 발급받으셨습니다. 24시간 후에 다시 시도해 주십시오.",
			"00004186":   				"죄송합니다, 계정을 활성화 할 수 없습니다. 인증 이메일을 다시 보내주시기 바랍니다.",
			"00004187":   				"죄송합니다. 링크 유효기간이 만료되었습니다. 인증 이메일을 다시 보내주시기 바랍니다.",
			"00004188":   				"죄송합니다. 링크 유효기간이 만료되었습니다. 이메일을 다시 보내주시기 바랍니다.",
			"00004189":   				"죄송합니다. 비밀번호를 재설정하지 못했습니다. 이메일을 다시 보내주시기 바랍니다.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"펌웨어 업데이트 에러가 발생했습니다.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"상태",
			NETWORK: 					"네트워크",
			NETWORK_MAP: 				"네트워크 맵",
			INTERNET: 					"인터넷",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP 서버",
			DYNAMIC_DNS: 				"동적 DNS",
			ADVANCED_ROUTING: 			"고급 라우팅",

			WIRELESS: 					"무선",
			WIRELESS_SETTINGS: 			"무선 설정",
			WDSBRIDGING: 				"WDS 브리지",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC 필터링",
			WIRE_STATISTICS: 			"통계",
			
			
			GUEST_NETWORK: 				"게스트 네트워크",
			WIRELESS_SETTINGS: 			"무선 설정",
			STORAGE_SHARING: 			"저장소 공유",
			NAT_FORWARDING: 			"NAT 포워딩",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"가상 서버",
			PORT_TRIGGERING: 			"포트 트리거링",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB 설정",
			BASIC_SET: 					"기본 설정",
			DISK_SET: 					"장치 설정",
			FOLDER_SHARING: 			"공유 액세스",
			STORAGE_SHARING: 			"저장소 공유",
			FTP_SERVER: 				"FTP 서버",
			MEDIA_SERVER: 				"미디어 서버",
			PRINT_SERVER: 				"프린터 서버",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"오프라인 다운로드",
			
			PARENTAL_CONTROL: 			"보호자 제어",

			QOS:  						"QoS",
			DATABASE:  					"데이터베이스",

			STREAMBOOST: 				"스트림 부스트",
			MAP: 						"맵",
			SB_MAP: 					"맵",
			SB_BANDWIDTH:  				"대역폭",
			SB_PRIORITY: 				"우선순위",
			SB_STATISTICS: 				"통계",

			
			SECURITY: 					"보안",
			SETTINGS: 					"설정",
			ACCESS_CONTROL: 			"액세스 제어",
			IP_MAC_BINDING: 			"IP&MAC 바인딩",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"시스템 도구",
			TIME_SETTINGS: 				"시간 설정",
			DIAGNOSTIC: 				"진단",
			FIRMWARE_UPGRADE: 			"펌웨어 업그레이드",
			BACKUP_RESTORE: 			"백업 및 복원",
			ADMINISTRATION: 			"관리",
			SYSTEM_LOG: 				"시스템 로그",
			STATISTICS: 				"트레픽 통계",
			SYSTEM_PARAMETERS: 			"시스템 매개 변수",
			VPN: 						"VPN 서버",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN 연결"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"지역 및 표준 시간대",
			INTERNET_CONNECTION_TYPE: 	"인터넷 연결 유형",
			WIRELESS_SETTINGS: 			"무선 설정",
			SUMMARY: 					"요약",
			SETUP_COMPLETE: 			"테스트 인터넷 연결",

			EXIT: 						"종료",
			NEXT: 						"다음",
			SAVE: 						"저장",
			FINISH: 					"완료",
			OK: 						"확인",
			NONE: 						"탐지에 실패했습니다.",

			REGION: 					"지역",
			TIME_ZONE: 					"시간대",
			NO_SELECT: 					"옵션을 선택하십시오.",

			AUTO_DETECT: 				"자동 감지",
			DYNAMIC_IP: 				"동적 IP",
			STATIC_IP: 					"고정 IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "참고: 만일 사용자가 연결 유형을 잘 모른다면 감지 버튼을 클릭하십시오. 사용자의 ISP가 제공하는 연결을 확실하게 확인하려면 인터넷 회선 제공업체에 문의하십시오.",

			DYNAMIC_IP_INFO: 			"ISP에서 특정된 MAC 주소에 대하여 인터넷 접근을 허용하는 경우, 주 컴퓨터의 MAC 주소를 복제해야 합니다. 만약 확실하지 않은 경우, <strong> MAC 주소를 복제하지 않습니다. <strong>를 선택하십시오.",
			MAC_CLONE_NO: 				"MAC 주소를 복제하지 마십시오",
			MAC_CLONE_YES: 				"현재 컴퓨터 MAC 주소를 복제",
			MAC_CLONE_NOTE: 			"참고: MAC 주소를 복제를 선택하려면, 이 컴퓨터의 MAC 주소가 ISP에 등록되어 있는지 확인하시기 바랍니다.",

			PPPOE_INFO: 				"PPPoE 사용자 이름 및 비밀번호를 입력해 주시기 바랍니다.",
			
			STATIC_IP_INFO: 			"사용자의 IP 정보를 입력하십시오.",

			L2TP_INFO: 					"L2TP 사용자 이름과 비밀번호를 입력 해 주시기 바랍니다.",
			PPTP_INFO: 					"PPTP 사용자 이름과 비밀번호를 입력해 주시기 바랍니다.",
			
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			SERVER_IP_ADDRESS_NAME: 	"VPN 서버 IP 또는 도메인 이름",
			IP_ADDRESS: 				"IP 주소",
			SUBNET_MASK: 				"서브넷 마스크",
			DEFAULT_GATEWAY: 			"기본 게이트웨이",
			PRIMARY_DNS: 				"기본 DNS",
			SECOND_DNS: 				"보조 DNS",
			OPTIONAL: 					"(선택 사항)",
			
			ON: 						"켜기",
			OFF: 						"끄기",
			WIRELESS_24GHZ: 			"무선 2.4GHz",
			WIRELESS_5GHZ: 				"무선 5GHz",
			WIRELESS_60GHZ: 				"60GHz 무선",
			ENABLE_WIRELESS_RADIO: 		"무선 라디오 활성화",
			NAME_SSID: 					"무선 네트워크 이름 (SSID)",

			SUMMARY_INFO1: 				"다음 버튼을 클릭하기 전에 새 무선 네트워크에 무선 장치를 다시 연결해야 합니다.",
			SUMMARY_INFO2: 				"무선 네트워크 이름과 비밀번호는 다음과 같이 설정이 수정되었습니다",
			SUMMARY_INFO3: 				"새로운 무선 네트워크에 연결했는지 확인하십시오.",

			WIRELESS_24GHZ_SSID: 		"무선 2.4GHz 이름 (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"무선 2.4GHz 비밀번호",
			WIRELESS_5GHZ_SSID: 		"무선 5GHz 이름 (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"무선 5GHz 비밀번호",
			WIRELESS_60GHZ_SSID: 		"무선 60 GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"무선 60 GHz 비밀번호",

			SORRY: 						"실패",
			SUCCESS: 					"성공!",
			TEST_INTERNET_SUCCESS_INFO: "성공! 빠른 설치 프로세스를 마치려면 종료 버튼을 클릭합니다.",

			TEST_INTERNET_FAILED_INFO_0:"모든 빠른 설치 매개변수가 정확한지 확인하고 다시 시도해 주십시오. 만약 모든 빠른 설치 매개변수가 정확하다면, 모뎀을 재부팅하고 2분 동안 기다린 후 인터넷 연결 테스트를 다시 한번 클릭합니다. 모뎀을 사용하지 않는 경우에는 인터넷 서비스 제공업체(ISP)로 연락하여 도움을 요청해야 합니다. ",
			SUMMARY_INFO4: 				"죄송합니다! 공유기는 새로운 무선 네트워크에 무선 장치가 연결되지 않았음을 감지하였습니다. 확인 후 다음을 클릭합니다.",
                                         
			CONGRATULARIONS: 			"축하합니다!",
			COMPLETE_INFO_0: 			"빠른 설치 과정이 완료되었습니다.",
			COMPLETE_INFO_1:			"아래의 인터넷 연결 테스트를 클릭 한 다음 종료 버튼을 클릭합니다.",
			TEST_INTERNET: 				"인터넷 연결 테스트",

			
			RESET_USER_TITLE: 			"새 사용자 이름 및 비밀번호 설정",
			NEW_USERNAME: 				"새 사용자 이름",
			NEW_PASSWORD: 				"새 비밀번호",
			CONFIRM_PASSWORD: 			"새 비밀번호 확인",
			CONFIRM: 					"확인"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"인터넷",
			INTERNET_STATUS:			"인터넷 상태",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"연결 유형",
			SECONDARY_CONN: 			"보조 연결",

			POOR_CONNECTED: 			"약하게 연결됨",
			UNPLUGGED: 					"WAN 포트가 연결되어 있지 않습니다. ",
			
			CONNECTED: 					"연결",
			DISCONNECTED: 				"연결 끊김",
			CONNECTING: 				"연결 중",

			INTERNET_IP_ADDR: 			"IP 주소",
			
			IP_ADDR: 					"IP 주소",
			MAC_ADDR: 					"MAC 주소",
			GATEWAY: 					"게이트웨이",

			AUTO: 						"자동",
			
			ROUTER: 					"공유기",
			WIRELESS_CLIENTS: 			"무선 클라이언트",
			HOST_CLIENTS: 				"호스트 클라이언트",
			GUEST_CLIENTS: 				"게스트 클라이언트",
			WIRE_CLIENTS: 				"유선 클라이언트",
			PRINTER: 					"프린터",
			USB_DISK: 					"USB 디스크",
			WIRELESS: 					"무선",
			NAME: 						"이름",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"채널",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"무선 2.4GHz",
			WIRELESS_5GHZ: 				"무선 5GHz",
			WIRELESS_60GHZ:				"60GHz 무선",
			
			GUEST_24GHZ: 				"게스트 네트워크 2.4GHz",
			GUEST_5GHZ: 				"게스트 네트워크 5GHz",
			
			STATUS: 					"상태",
			TOTAL: 						"합계",
			AVAILABLE: 					"가능",
			GB: 						"GB",
			BRAND: 						"브랜드",

			DYNAMIC_IP: 				"동적 IP",
			STATIC_IP: 					"고정 IP",
			SUBNET_MASK: 				"서브넷 마스크",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 Tunnel",
			NONE: 						"없음"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"인터넷",
			AUTO_DETECT: 				"자동 감지",
			INTERNET_CONN_TYPE: 		"인터넷 연결 유형",
			DYNAMIC_IP: 				"동적 IP",
			STATIC_IP: 					"고정 IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"연결안됨",
			NONE: 						"없음",
			DETECT_FAIL: 				"자동 감지 실패",
			SECONDARY_CONN: 			"보조 연결",

			DYNAMIC_YES: 				"MAC 주소를 복제하지 마십시오",
			DYNAMIC_NO: 				"현재 컴퓨터 MAC 주소를 복제",
			
			IP_ADDR: 					"IP 주소",
			SUBNET_MASK: 				"서브넷 마스크",
			DEFAULT_GATEWAY: 			"기본 게이트웨이",
			PRIMARY_DNS: 				"기본 DNS",
			SECOND_DNS: 				"보조 DNS",
			OPTIONAL: 					"(선택 사항)",
			USER_NAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			SERVER_IP_ADDR_NAME: 		"VPN 서버 IP 또는 도메인 이름",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"참고: 만일 사용자가 연결 유형을 잘 모른다면 감지 버튼을 클릭하십시오. 사용자의 ISP가 제공하는 연결을 확실하게 확인하려면 인터넷 회선 제공업체에 문의하십시오."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"무선 설정",
			MODE_2G: 					"무선 2.4GHz",
			MODE_5G: 					"무선 5GHz",
			MODE_60G: 					"60GHz 무선",
			WIRELESS_NETWORK_NAME: 		"무선 네트워크 이름 (SSID)",
			WIRELESS_PASSWORD: 			"비밀 번호",
			ENABLE_WIRELESS: 			"무선 라디오 활성화",
			SAVE: 						"저장",
			ENCRYPTION_2G_NOTICE:		"2.4GHz 암호화는 %s입니다.",
			ENCRYPTION_5G_NOTICE:		"5GHz 암호화는 %s입니다.",
			ENCRYPTION_60G_NOTICE:		"60GHz 암호화가 %s입니다.",
			ENCRYPTION_2G_NO: 			"2.4GHz 무선 네트워크가 암호화되어 있지 않습니다.",
			ENCRYPTION_5G_NO: 			"5GHz 무선 네트워크가 암호화되어 있지 않습니다.",
			ENCRYPTION_60G_NO: 			"60GHz 무선 네트워크가 암호화 되어 있지 않습니다.",
			ENCRYPTION_NO: 				"보안되지 않은 무선 네트워크는 위험을 숨겨져 있습니다.",
			ENCRYPTION_SURE: 			"계속 하시겠습니까?",
			HIDE_SSID: 					"SSID 숨김"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"기본 설정",
			TITIL_NEW:					"디스크&계정",
			DISK_SET:					"장치 설정",

			SELFLY_REMOVE:				"안전하게 제거",
			SCANING:					"스캔 중…",
			SCAN_RESULT:				"디스크 %n개를 찾았습니다. ",
			
			DISKS:						"디스크",
			USERS: 						"사용자 계정",
			DEVICENAME: 				"장치 이름",
			VOLUMN: 					"볼륨",

			USBSPACE: 					"사용한 공간",
			FREESPACE: 					"여유 공간",
			STATUS: 					"상태",
			INACT: 						"비활성화",
			USAGE: 						"사용",
			CAPACITY: 					"용량",
			OPERATION: 					"조작",
			
			ACC: 						"계정 관리", 	 	
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			USE_LOGIN: 					"로그인 사용자 사용",
			SCAN: 						"스캔",
			ENJECT_ALL: 				"모두 꺼내기",
			ENJECT: 					"꺼내기",
			ADD_USER: 					"사용자 추가",
			AUTH: 						"권한",


			LOCATION: 					"위치",
			MOBILE_ISP: 				"모바일 ISP",
			DIAL_NUMBER: 				"다이얼 번호",
			APN: 						"APN",
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			MTU_SIZE: 					"MTU 크기",
			OPTIONAL: 					"(선택 사항)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"보호자 제어",
			UNKNOWN: 					"알 수 없음",
			
			DEVICE_CTR: 				"보호자 제어된 장치",
			ID: 						"ID",
			DEVICE: 					"장치 이름",
			MAC_ADDRESS: 				"MAC 주소",
			TIME: 						"인터넷 접속 시간",
			DESCRIPTION: 				"설명",
			ENABLE: 					"사용",
			ENABLE_THIS_ENTRY: 			"이 항목 활성화",
			OPTIONAL: 					"(선택 사항)",
			BTN_VIEW: 					"기존 장치 보기",
			
			DEVICE_LIST: 				"장치 목록",
			SYSTEM_TIME: 				"시스템 시간",
			
			RESTR: 						"콘텐츠 제한",
			MODE: 						"제한",
			BLACKMODE: 					"블랙리스트",
			WHITEMODE: 					"화이트리스트",
			ACCESS_DEVICES_LIST: 		"연결된 장치 목록",
			
			CHOOSE: 					"선택",
			ADD_A_NEW_KEYWORD: 			"블록에 새로운 키워드를 추가합니다. ",
			ADD_A_NEW_DOMAIN_NAME: 		"접근을 위해 새로운 도메인 이름을 추가합니다. ",
			
			OPT: 						"조작",
			STATUS: 					"보호자 제어",
			YOURPC:						"컴퓨터"
		},
		
		BASIC_GUEST:{
			TITLE: 						"게스트 네트워크",
			MODE_2G: 					"무선 2.4GHz",
			MODE_5G: 					"무선 5GHz",
			WIRELESS_NETWORK_NAME: 		"무선 네트워크 이름 (SSID)",
			WIRELESS_PASSWORD: 			"비밀 번호",
			DYNAMIC_PASSWORD: 			"비밀 번호",
			ENABLE_WIRELESS: 			"게스트 네트워크 활성화",
			SAVE:						"저장",
			HIDE_SSID: 					"SSID 숨김",
			PASSWORD_CHANGE_CYCLE: 		"비밀번호 업데이트 간격",
			PER_DAY: 					"매일",
			PER_WEEK: 					"매주",
			PER_MONTH: 					"매월",
			NEVER: 						"업데이트 안 함",
			UNENCRYPTED:				"게스트 네트워크가 암호화되어 있지 않습니다. 사용자가 고급 메뉴에서 비밀번호를 설정할 수 있습니다."
		},

		STATUS: {
			TITLE: 						"상태",
			INTERNET:					"인터넷",
			WIRELESS:					"무선",
			LAN:						"LAN",
			USB_TITLE:					"USB 장치",
			PERFORMANCE: 				"성능",
			GUEST_NETWORK: 				"게스트 네트워크",
			ACCESS_DEVICES: 			"액세스 장치",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"연결 유형",

			MAC_ADDRESS: 				"MAC 주소",
			IP_ADDRESS: 				"IP 주소",
			RELEASE: 					"릴리스",
			RENEW: 						"갱신",
			
			DYNAMIC_IP: 				"동적 IP",
			STATIC_IP: 					"고정 IP",
			SUBNET_MASK: 				"서브넷 마스크",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 Tunnel",
			RD6:  						"6RD",
			DSLITE: 					"DS 라이트",
			PASSTHROUGH: 				"통과(브릿지)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"없음",
			
			DEFAULT_GATEWAY: 			"기본 게이트웨이",
			DNS: 						"DNS 서버",
			MAC: 						"MAC 주소",
			WDS_STATUS: 				"WDS 상태",
			
			IPV6_ADDRESS: 				"IP 주소",
			PRIMARY_DNS: 				"기본 DNS",
			SECOND_DNS: 				"보조 DNS",

			RADIO: 						"무선 라디오",

			NAME_SSID: 					"네트워크 이름(SSID)",
			NETWORK_NAME_SSID:			"네트워크 이름 (SSID)",
			HIDE_SSID: 					"SSID 숨김",
			MODE: 						"모드",
			CHANNEL: 					"채널",
			CHANNEL_WIDTH: 				"채널 폭",
			AUTO: 						"자동",
			CURRENT_CHANNEL: 			"현재 채널",

			WDS: 						"WDS 상태",
			WIRED_CLIENTS: 				"유선 클라이언트",
			WIRELESS_CLIENTS: 			"무선 클라이언트",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"링크 로컬 주소",
			ASSIGN_TYPE: 				"할당된 유형",
			
			ALLOW_TO_SEE_EACH: 			"게스트들 간에 볼 수 있도록 허용",

			TOTAL: 						"합계",
			AVAILABLE: 					"가능",

			USB: 						"USB 디스크",
			PRINTER: 					"프린터",

			CPU_LOAD: 					"CPU 부하",
			MEMORY_USAGE: 				"메모리 사용",

			IP_ADDR_P: 					"IP 주소",
			MAC_ADDR_P: 				"MAC 주소",
			CONN_TYPE_P: 				"연결 유형",

			DISABLED: 					"비활성화",
			INIT: 						"Init",
			SCAN: 						"스캔",
			AUTH: 						"인증",
			ASSOC: 						"Assoc",
			RUN: 						"실행",
			HOST: 						"호스트",
			GUEST: 						"게스트",

			ON: 						"켜기",
			OFF: 						"끄기"
		},

		INTERNET: {
			TITLE: 						"인터넷",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"인터넷 연결 유형",
			INTERNET_MAC_ADDRESS: 		"MAC 주소",
			
			CONNECT: 					"연결",
			DISCONNECT: 				"연결 끊기",

			IP_ADDR: 					"IP 주소",
			
			USE_DEFAULT_MAC: 			"기본 MAC 주소를 사용",
			USE_COMPUTER_MAC: 			"현재 컴퓨터의 MAC 주소를 사용",
			USE_CUSTOM_MAC: 			"사용자  MAC 주소를 사용",
			MAC_CLONE: 					"MAC 클론",
			
			CONFIG: 					"구성 ",
			
			IP_ADDRESS: 				"IP 주소",
			SUBNET_MASK: 				"서브넷 마스크",
			DEFAULT_GATEWAY: 			"기본 게이트웨이",
			
			MANUAL_DNS: 				"수동 DNS",
			PRIMARY_DNS: 				"기본 DNS",
			SECOND_DNS: 				"보조 DNS",
			
			RENEW: 						"갱신",
			RELEASE: 					"릴리스",
			VIEW_MODE: 					"모드 보기",
			
			GET_DYNAMICALLY_FROM_ISP: 	"ISP에서 동적으로 가져오기",
			USE_FOLLOW_IP_ADDR: 		"다음 IP 주소 사용",
			USE_FOLLOW_DNS_ADDR: 		"에서 동적으로 가져오기",
			USE_FOLLOW_DNS_SERVER: 		"다음 DNS 서버 사용",
			
			BASIC: 						"기본",
			ADVANCED: 					"고급",
			
			DNS_ADDR_MODE: 				"DNS 주소",
			MTU_SIZE: 					"MTU 크기",
			MTU_1500: 					"바이트. (기본값은 필요한 경우를 제외하고는 변경하지 마십시오, 1500.)",
			MTU_1480: 					"바이트. (기본값은 필요한 경우를 제외하고는 변경하지 마십시오, 1480입니다.)",
			MTU_1460: 					"바이트. (기본값은 필요한 경우를 제외하고는 변경하지 마십시오, 1460.)",
			MTU_1420: 					"바이트. (기본값은 필요한 경우를 제외하고는 변경하지 마십시오, 1420.)",
			
			HOST_NAME: 					"호스트 이름",

			HOST_NAME_CONFIRM: 			"호스트 이름에 잘못된 문자가 포함되어 있어 예기치 않은 시스템 동작이 발생할 수 있습니다. 계속하시겠습니까?",

			GET_IP_WITH_UNICAST_DHCP: 	"유니 캐스트 DHCP (일반적으로 필요하지 않습니다)를 사용하여 IP를 가져오기",
			OPTIONAL: 					"(선택 사항)",
			
			STATIC_IP: 					"고정 IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"자동",
						
			USER_NAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			
			INTERNET_IP_ADDR: 			"IP 주소",
			INTERNET_DNS: 				"인터넷 DNS",
			SECONDARY_CONN: 			"보조 연결",
			NONE: 						"없음",
			INTERNET_PRIMARY_DNS:		"기본 DNS",
			INTERNET_SECONDARY_DNS: 	"보조 DNS",
			
			DYNAMIC_IP: 				"동적 IP",
			DYNAMIC_IP_v6: 				"동적 IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"서비스 이름",
			ACCESS_CONCENTRATOR_NAME:  	"액세스 집중 이름",
			DETECT_ONLINE_INTERVAL: 	"온라인 간격 감지",
			INTERVAL_TIPS: 				"초. (0-120. 기본값은 10입니다.)",
			IP_ADDR_MODE:  				"IP 주소",
			CONN_MODE: 					"연결 모드",
			DHCP_LINK_UNPLUGGED: 		"WAN 포트가 연결되어 있지 않습니다. ",
			
			AUTO: 						"자동",
			ON_DEMAND: 					"주문형",
			TIME_BASED: 				"시간 기반",
			MANUALLY: 					"수동",
			MAX_IDLE_TIME: 				"최대 유휴 시간",
			MAX_IDLE_TIME_TIPS: 		"분. (0은 항상 활성을 의미합니다.)",
			PERIOD_OF_TIME: 			"시간의 기간",
			TIME_TIPS: 					"(시간:분) ",
			BIGPOND_CABLE: 				"BigPond Cable",
			AUTH_SERVER: 				"인증. 서버",
			AUTH_DOMAIN: 				"인증. 도메인",
			L2TP: 						"L2TP",
			GATEWAY: 					"게이트웨이",
			SERVER_IP_ADDR_NAME: 		"VPN 서버 IP 또는 도메인 이름",
			PPTP: 						"PPTP",
			TO: 						"받을메일",
			
			TUNNEL_6TO4: 				"6to4 Tunnel",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"비 임시 IPv6 주소를 얻으십시오",
			GET_PREFIX_DELEGATION: 		"IPv6 접두사 위임을 얻으십시오",
			IPV6_ADDR: 					"IPv6 주소",

			GET_IPV6_WAY: 				"IPv6 주소를 얻으십시오",
			AUTOMATICALLY:              "자동으로 가져 오기",
			SPECIFIED_BY_ISP: 			"ISP 정의",

			IPV6_ADDR_PREFIX: 			"IPv6 주소 접두사",
			NONE_TEMPORARY: 			"비 임시",

			PREFIX_DELEGATION: 			"접두어 위임",
			ENABLE:                     "사용",
			DISABLE:                    "사용 안함",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 마스크 길이",
			CONFIG_TYPE: 				"구성 유형",
			RD6_PREFIX: 				"6RD 접두사",
			RD6_PREFIX_LENGTH: 			"6RD 접두사 길이",
			REPLY_IPV4_ADDR: 			"테두리의 IPv4 주소를 회신",
			MANUAL: 					"수동",
			DSLITE:  					"DS 라이트",
			DS_LITE:  					"DS 라이트",
			PASS_THROUGH:  				"Pass Through (브리지)",
			LOCAL_IPV6: 				"로컬 IPv6 주소",
			PEER_IPV6: 					"피어 IPv6 주소",
			TUNNEL_ADDR: 				"Tunnel 주소",
			IPV4_NETMASK: 				"IPv4 넷마스크",
			CUSTOM: 					"사용자 지정",
		    AFTR_NAME: 					"AFTR 이름",


			
			
			IPV4_ADDR: 					"IPv4 주소",
			IPV4_MASK: 					"IPv4 서브넷 마스크",
			IPV4_GATEWAY: 				"IPv4 기본 게이트웨이",

			DUPLEX: 					"이중",
			AUTO_NEGOTIATION: 			"자동 조정",
			FULL_DUPLEX_1000: 			"1000Mbps 전이중",
			HALF_DUPLEX_1000:			"1000Mbps 반이중",
			FULL_DUPLEX_100: 			"100Mbps 전이중",
			HALF_DUPLEX_100: 			"100Mbps 반이중",
			FULL_DUPLEX_10: 			"10Mbps 전이중",
			HALF_DUPLEX_10: 			"10Mbps 반이중"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC 주소",
			IP_ADDRESS: 				"IP 주소",
			SUBNET_MASK: 				"서브넷 마스크",
			CUSTOM: 					"사용자 지정",

			IGMP: 						"IGMP 프록시 활성화",
			


			ASSIGNED_TYPE: 				"할당된 유형",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC + 태형 DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"주소 접두사",
			PREFIX_UNIT: 				"/ 64",
			ADDRESS: 					"주소",
			DELEFATED: 					"위임",
			STATIC: 					"고정",
			SITE_PREFIX: 				"사이트 접두사",
			SITE_PREFIX_LEN: 			"사이트 접두사 길이",

			PREFIX_TYPE:  				"사이트 접두사 구성 유형",
			LAN_IPV6_ADDR:  			"LAN IPv6 주소",

			RELEASE_TIME: 				"릴리스 타임",
			RELEASE_TIME_TIP: 			"초. (기본값은 필요한 경우가 아니면 변경하지 마십시오, 86400입니다)",
			ADDRESS:					"주소",
			SAVE: 						"저장",

			REBOOT_TIP: 				"공유기가 새 로그인 페이지를 건너 뛰고 있습니다. 잠시만 기다려 주십시오…"

		},

		IPTV:{
			TITLE: 						"설정",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "IPTV 활성화", 
			MODE:  						"모드",
			IGMP_PROXY: 				"IGMP 프록시",
			IGMP_VERSION: 				"IGMP 버전",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"브릿지",
			BASIC: 						"사용자 지정",
			EXSTREAM: 					"싱가포르 ExStream",
			RUSSIA:  					"러시아",
			UNIFY:  					"말레이시아 - 유니 파이",
			MAXIS:  					"말레이시아 - 맥 시스",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"인터넷",
			IP_PHONE: 					"IP-폰", 

			Q_TAG: 						"802.1Q 태그",
			ENABLE: 					"사용",
			
			INTERNET_VLAN_ID: 			"인터넷 VLAN ID",
			INTERNET_VLAN_PRIORITY: 	"인터넷 VLAN 우선 순위",
			IP_PHONE_VLAN_ID: 			"IP-전화 VLAN ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-전화 VLAN 우선 순위",
			IPTV_VLAN_ID: 				"IPTV VLAN ID",
			IPTV_VLAN_PRIORITY: 		"IPTV VLAN 우선 순위",
			IPTV_MULTI_VLAN_ID: 		"IPTV 멀티 캐스트 VLAN ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV 멀티 캐스트 VLAN 우선 순위"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP 서버",
			
			SETTINGS: 					"설정",

			DHCP_SERVER: 				"DHCP 서버",
			ENABLE_DHCP_SERVER: 		"DHCP 서버를 사용",

			IP_ADDR_POOL: 				"IP 주소 풀을",
			LEASETIME: 					"임대 시간 주소",
			LEASENOTE: 					"분.(2분과 2880분 사이여야 하고 내정값은 120분입니다.)",
			
			GATEWAY: 					"기본 게이트웨이",
			DOMAIN: 					"기본 도메인",
			PRIMARYDNS: 				"기본 DNS",
			SECONDARYDNS: 				"보조 DNS",

			OPTIONAL: 					"(선택 사항)",

			CLIENTSLIST: 				"DHCP 클라이언트 목록",
			CLIENT_NUMBER: 				"클라이언트 번호",
			CLIENT_NAME: 				"클라이언트 이름",
			MAC_ADDR: 					"MAC 주소",
			ASSIGNED_IP: 				"할당 된 IP 주소",
			LEASE_TIME: 				"임대 시간",

			RESERVATION: 				"주소 예약",

			RESERVED_IP: 				"예약 된 IP 주소",
			IP_ADDRESS: 				"IP 주소",
			DESCRIPTION: 				"설명",

			CLIENTSLIST: 				"DHCP 클라이언트 목록",
			CLIENT_NUMBER: 				"클라이언트 번호",

			ENABLE: 					"사용",
			ENABLE_THIS_ENTRY: 			"이 항목 활성화",
			BTN_VIEW:					"기존 장치 보기"
			
		},

		DDNS: {
			DDNS: 						"동적 DNS",
			SERVICEPROVIDER: 			"서비스 제공 업체",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"DynDNS",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"이동 ... 등록",
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			DOMAIN_NAME_LIST: 			"도메인 이름 목록",
			DOMAIN_NAME: 				"도메인 이름",
			LOGIN: 						"로그인",
			LOGIN_SAVE: 				"로그인 및 저장", 
			LOGOUT: 					"로그아웃",
			STATU_SUCCESS:				"성공",
			UPDATE_INTERVAL:			"업데이트 간격",
			ONE_HOUR:					"1시간",
			SIX_HOUR:					"6시간",
			TWETEEN_HOUR:				"12시간",
			ONE_DAY:					"1일",
			TWO_DAY:					"2일",
			THREE_DAY:					"3일",
			NEVER:						"업데이트 안 함",
			UPDATE:						"업데이트",
			STATU_INCORRENT:			"잘못된 사용자 이름 또는 비밀번호",
			STATU_ERR_DOMAIN:			"도메인 이름 오류",
			
			STATU_NO_LAUNCH:			"시작되지 않음",
			STATU_FAIL_DDNS: 			"DynDNS 업데이트에 실패했습니다. ",
			STATU_FAIL_NOIP: 			"No-IP 업데이트에 실패했습니다. ",
			STATU_CONN:					"연결 ..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"고급 라우팅",
			STATIC_ROUTING: 			"고정 라우팅",

			DESTINATION_NETWORK:		"대상 네트워크",
			SUBNET_MASK: 				"서브넷 마스크",
			DEFAULT_GATEWAY: 			"기본 게이트웨이",
			DESCRIPTION: 				"설명",
			
			SYSTEM_ROUTING_TABLE: 		"시스템 라우팅 테이블",
			CLIENT_NUMBER: 				"클라이언트 번호",

			GATEWAY: 					"게이트웨이",
			INTERFACE: 					"인터페이스",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"사용",
			ENABLE_THIS_ENTRY: 			"이 항목 활성화"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"설정",
			NOT_SUPPORT_5G: 			"해당 지역에서는 2.4 GHz만 허용합니다. 올바른 지역을 선택했는지 확인해 주십시오.",
			NOT_SUPPORT_60G: 			"해당 지역에서는 60 GHz만 허용합니다.",
			ENABLE_TIPS: 				"무선 라디오를 켜야 합니다. ",

			REGION: 					"지역",
			NOTICE:  					"무선 기능을 사용하려면, 무선 하드웨어 스위치가 켜져 있어야 합니다.",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"무선",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"무선 라디오 활성화",

			WIRELESS_NETWORK_NAME: 		"무선 네트워크 이름 (SSID)",
			WIRELESS_PASSWORD: 			"비밀 번호",
			HIDE_SSID: 					"SSID 숨김",

			SECURITY: 					"보안",
			NO_SECURITY: 				"비활성화 보안",
			WPA_WPA2_PERSONAL: 			"WPA / WPA2 - 개인 (권장) 버전",
			WPA_WPA2_ENTERPRISE: 		"WPA / WPA2 - Enterprise",
			WPA2_PERSONAL: 			    "WPA/WPA2-Personal (권장됨)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"버전",

			AUTO: 						"자동",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"암호화",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"모드",
			MODE_B:  					"802.11b 전용",
			MODE_G:  					"802.11g 전용",
			MODE_N:  					"802.11 n 전용",
			MODE_BG:  					"802.11b/g 혼합",
			MODE_GN: 					"802.11g/n 혼합",
			MODE_BGN:  					"802.11b/g/n 혼합",

			MODE_A_5: 					"802.11a 전용",
			MODE_AN_5: 					"802.11a/n 전용",
			MODE_N_5: 					"802.11 n 전용",
			MODE_AC_5:					"802.11ac 전용",
			MODE_NAC_5:					"802.11n/ac 전용",
			MODE_ANAC_5:				"802.11a/n/ac 전용",

			MODE_AD_60:					"802.11ad 만 사용",

			CHANNEL_WIDTH: 				"채널 폭",
			CHANNEL: 					"채널",

			TRANSMIT_POWER: 			"전송 전력",

			RADIUS_SERVER_IP: 			"RADIUS 서버 IP",
			RADIUS_PORT: 				"RADIUS 포트",
			RADIUS_PASSWORD: 			"RADIUS 비밀번호",

			TYPE: 						"유형",
			OPEN_SYSTEM: 				"개방형 시스템",
			SHARED_KEY: 				"공유 키",

			KEY_SELECTED: 				"선택한 키",
			KEY1: 						"키1",
			KEY2: 						"키2",
			KEY3: 						"키3",
			KEY4: 						"키4",

			WEP_KEY_FORMAT: 			"WEP 키 포맷",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"진수",

			KEY_TYPE: 					"키 유형",
			BIT64: 						"64-bit 암호화",
			BIT128: 					"128-bit 암호화",
			BIT152: 					"152-bit 암호화",

			KEY_VALUE: 					"키 값",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"저",
			MIDDLE: 					"중",
			HIGH: 						"고"
		},

		WPS: {

			TITLE2: 					"공유기의 PIN",
			ROUTERS_PIN_INFO: 			"다른 장치 WPS와 공유기의 핀 코드와 함께 연결할 수 있습니다",
			ENABLE_ROUTE_PIN: 			"공유기의 PIN",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"생성",
			DFT: 						"기본",

			TITLE: 						"WPS 마법사",
			SELECT_SETUP: 				"설치 방법 선택",
			PUSH_BTN: 					"푸시 버튼 (권장)",
			PUSH_DES: 					"공유기에서 물리적으로 \"푸시 버튼\" 을 누르거나 이 페이지에있는 소프트웨어 \"연결\"를 클릭",
			CONNECT: 					"연결",
			CANCEL: 					"취소",

			RESULT_HEAD: 				"무선 클라이언트",
			RESULT_END: 				"네트워크에 성공적으로 추가되었습니다.",
			NOT_FOUND: 					"주변에 검색된 클라이언트가 없습니다. 버튼을 클릭해 다시 시도해 주십시오.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"발견되지 않음",
			ENTER_CLIENT_PIN: 			"클라이언트의 PIN을 입력",
			SWITCH_NOTE:				"WPS를 이용하여 연결하려면 Wi-Fi 버튼을 통한 무선 기능을 켜주십시오.",
			SWITCH_NOTE2:				"참고 : WPS를 사용하려면 먼저 올바른 무선 매개 변수를 구성해야 합니다.",
			STATUS_PIN_ERROR: 			"잘못되었습니다. WPS PIN이 정확한지 확인하십시오.",
			STATUS_ERROR: 				"오류가 발생했습니다.",
			STATUS_CONN_ERROR: 			"연결에 실패했습니다.",
			STATUS_CONNING: 			"연결 ...",
			STATUS_CANCEL: 				"연결이 취소.",
			
			NOTE: 						"주의:",
			BUTTON: 					"Wi-Fi 버튼이 꺼져 있습니다. ",
			ENABLE: 					"무선 기능은 비활성화되어 있습니다. ",
			HIDDEN: 					"\"SSID 숨기기\"가 켜져 있습니다. ",
			ENCRYPTION: 				"암호가 틀렸습니다. ",
			WPS: 						"시스템 파라미터 페이지에서 WPS가 비활성화되어 있습니다.",

			
			STATUS_CONN_OVERLAP: 		"연결을 (OVERLAP) 실패했습니다.",
			STATUS_CONN_TIMEOUT: 		"연결을 (시간 초과)를 실패했습니다.",
			STATUS_CONN_INACT: 			"연결 비활성."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"무선 상태",
			CLIENT_NUMBER: 				"클라이언트 번호",
			MAC_ADDRESS: 				"MAC 주소",
			CONN_TYPE: 					"연결 유형",
			SECURITY: 					"보안",
			RECEIVED_PACKETS: 			"수신 패킷",
			SEND_PACKETS: 				"패킷 전송"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"설정",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"게스트들 간에 볼 수 있도록 허용",

			ALLOW_LOCAL: 				"게스트가 로컬 네트워크에 액세스 할 수 있도록 허용",
			
			WIRELESS: 					"무선",
			WIRELESS_24G_RADIO: 		"무선 2.4GHz",
			WIRELESS_5G_RADIO: 			"무선 5GHz",
			ENABLE_GUEST: 				"게스트 네트워크 활성화",

			NAME_SSID: 					"무선 네트워크 이름 (SSID)",
			HIDE_SSID: 					"SSID 숨김",
			PASSWORD_CHANGE_CYCLE: 		"비밀번호 업데이트 간격",
			PER_DAY: 					"매일",
			PER_WEEK: 					"매주",
			PER_MONTH: 					"매월",
			NEVER: 						"업데이트 안 함",
			SECURITY: 					"보안",
			NO_SECURITY: 				"비활성화 보안",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal",

			VERSION: 					"버전",
			AUTO: 						"자동",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"암호화",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"비밀 번호"
		},

		NAT:{
			SETTINGS: 					"하드웨어 NAT",
			STATUS: 					"하드웨어 NAT",
			
			ALG_TITLE: 					"응용 프로그램 계층 게이트웨이 (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG ",
			RTSP_ALG: 					"RTSP ALG ",
			PPTP_ALG: 					"PPTP Passthrough ",
			L2TP_ALG: 					"PPTP Passthrough ",
			IPSEC_ALG: 					"IPSec Passthrough ",

			ENABLE_FTP_ALG: 			"FTP ALG 사용",
			ENABLE_TFTP_ALG: 			"TFTP ALG 사용",
			ENABLE_H323_ALG: 			"H323 ALG 사용",
			ENABLE_RTSP_ALG: 			"RTSP ALG 사용",
			ENABLE_PPTP_ALG: 			"PPTP Passthrough 사용",
			ENABLE_L2TP_ALG: 			"L2TP Passthrough 사용",
			ENABLE_IPSEC_ALG: 			"IPSec Passthrough 사용",
			NAT_ENABLE_NOTICE: 			"주의: NAT 기능이 활성화될 때까지 사용자 구성은 적용되지 않습니다. "
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"가상 서버",

			SERVICE_NAME: 				"서비스 유형",
			EXTERNAL_PORT: 				"외부 포트",
			INTERNAL_IP: 				"내부 IP",
			INTERNAL_PORT: 				"내부 포트",
			PROTOCAL: 					"프로토콜",

			BTN_VIEW: 					"기존 서비스 보기",

			EXSITTING_SERVICE: 			"기존 서비스",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX 또는 XX)",
			EXT_PORT_TIPS: 				"(XX 또는 XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX 또는 빈 칸 ,1-65535)",

			NOTICE:						"원격 관리 포트와 충돌합니다. 계속 하시겠습니까?",
			NOTICE_INVALID_REMOTE:		"80 포트가 가상 서버와 충돌하기 때문에 원격 관리가 무효입니다. 원격 관리 포트를 변경하십시오. ",
			NOTICE_ENTER_ANOTHER:		"원격 관리 포트와 충돌합니다. 다른 포트를 입력하십시오.",
			NOTICE_PPTP_CONFLICT:		"PPTP VPN포트와 충돌합니다. 다른 포트를 입력해 주십시오.",
			NOTICE_OPENVPN_CONFLICT:	" OPENVPN포트와 충돌합니다. 다른 포트를 입력해 주십시오.",


			ENABLE_THIS_ENTRY: 			"사용",
			OPERATION: 					"조작",
			CHOOSE: 					"선택",
			NAT_ENABLE_NOTICE: 			"주의: NAT 기능이 활성화될 때까지 사용자 구성은 적용되지 않습니다. "
		},

		PORT_TRIGGERING:{
			TITLE: 						"포트 트리거링",
			APPLICATION: 				"응용 프로그램",
			TRIGGER_PORT: 				"포트 트리거",
			TRIGGER_PROTOCOL: 			"트리거 프로토콜",

			EXTERNAL_PORTS: 			"외부 포트",
			EXTERNAL_PROTOCOL: 			"외부 프로토콜",

			BTN_VIEW: 					"기존 응용 프로그램보기",

			EXSITTING_APPLICATION: 		"기존 응용 프로그램",
			APPLICATION_NAME: 			"응용 프로그램 이름",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX 또는 XX-XX,1-65535, 최대 5쌍)",
			
			NOTICE_PPTP_CONFLICT:		"PPTP VPN포트와 충돌합니다. 다른 포트를 입력해 주십시오.",
			NOTICE_OPENVPN_CONFLICT:	" OPENVPN포트와 충돌합니다. 다른 포트를 입력해 주십시오.",
			
			ENABLE_THIS_ENTRY: 			"사용",
			OPERATION: 					"조작",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"주의: NAT 기능이 활성화될 때까지 사용자 구성은 적용되지 않습니다. "
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"DMZ 사용",
			HARDWARESTATUS: 			"DMZ 호스트 IP 주소",
			NAT_ENABLE_NOTICE: 			"주의: NAT 기능이 활성화될 때까지 사용자 구성은 적용되지 않습니다. "
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP 서비스 목록",
			CLIENT_NUMBER: 				"클라이언트 번호",
			SERVICE: 					"서비스 설명",
			EXTERNAL_PORT: 				"외부 포트",
			PROTOCAL: 					"프로토콜",
			IP_ADDR: 					"인터넷 IP 주소",
			INTERNAL_PORT: 				"내부 포트",
			NAT_ENABLE_NOTICE: 			"주의: NAT 기능이 활성화될 때까지 사용자 구성은 적용되지 않습니다. "
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB 모뎀",
			LOCATION: 					"위치",
			MOBILE_ISP: 				"모바일 ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"연결 모드",
			CONNECT_ON_DEMAND: 			"요구 시 연결",
			CONNECT_AUTOMATICALLY: 		"자동으로 연결",
			CONNECT_MANUALLY: 			"수동으로 연결",
			MAX_IDLE_TIME: 				"최대 유휴 시간",
			CONNECTION_TIP: 			"현재 인터넷 액세스는 WAN 우선입니다.",
			IDLE_TIME_TIP: 				"연결 모드와 최대 유휴 시간은 수동으로 설정할 수 없습니다.",
			MINUTES: 					"분. (0은 항상 활성임을 의미합니다.)",

			AUTHENTICATION_TYPE: 		"인증 유형",
			AUTO: 						"자동",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"기본값은 자동입니다. 반드시 필요한 경우가 아니면 변경하지 마십시오.",

			CONNECT: 					"연결",
			DISCONNECT: 				"연결 끊기",

			SET_TIP: 					"다이얼  번호, APN, 사용자 이름, 비밀번호를 수동으로 설정합니다.",
			DIAL_NUMBER: 				"다이얼 번호",
			APN: 						"APN",
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			OPTIONAL: 					"(선택 사항)",
			MTU_SIZE: 					"MTU 크기(바이트 단위로)",
			MTU_SIZE_TIP: 				"바이트. (기본값은 필요한 경우를 제외하고는 변경하지 마십시오, 1480입니다.)",

			USE_FOLLOW_DNS_SERVER: 		"다음 DNS 주소",
			PRIMARY_DNS: 				"기본 DNS",
			SECOND_DNS: 				"보조 DNS",

			UNPLUGGED: 					"연결안됨",
			IDENTIFYING: 				"식별 중...",
			IDENTIFY_SUCCESS: 			"성공적으로 식별"
		},

		DISK_SETTING: {
			DISK_SET: 					"장치 설정",
			SCAN: 						"스캔",
			SELFLY_REMOVE: 				"안전하게 제거",
			SCAN_RESULT: 				"디스크 %n개를 찾았습니다. ",
			NOT_FOUND: 					"발견되지 않음",
			SELFLY_REMOVE: 				"안전하게 제거",
			
			VOLUMN: 					"볼륨",
			CAPACITY: 					"용량",
			FREESPACE: 					"여유 공간",
			USBSPACE: 					"사용한 공간",
			
			STATUS: 					"상태",
			INACT: 						"비활성화",
			ACTIVE: 					"활성화",
			
			USAGE: 						"사용",
			CAPACITY: 					"용량",
			OPERATION: 					"조작",	
			
			ACC: 						"계정 관리", 	 	
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			USE_LOGIN: 					"로그인 사용자 사용",
			SCAN: 						"스캔",
			ENJECT_ALL: 				"모두 꺼내기",
			ENJECT: 					"꺼내기",
			ADD_USER: 					"사용자 추가",
			AUTH: 						"권한"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"오프라인 다운로드",
			ITEMS:						"아이템",
			FILE:						"파일",
			FOLDER:						"폴더",
			SIZE:						"크기",
			STATUS:						"상태",
			DOWNLOAD:					"다운로드",
			REMAINTING:					"남은 시간",
			SPEED:						"속도",
			SOURCE:						"소스",	
			DOWNLOADTO:					"다운로드 받는 장소",	
			TORRENT_PC:					"PC 토렌트",
			TORRENT_USB:				"USB 토렌트",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP 포트",
			AMULEUDP:					"aMule UDP 포트",
			AMULESERVER:				"aMule 서버",
			SCHEDULE:					"일정",
			MAXACTIVE:					"활성화된 태스크의 최대치",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"시간대",
			DOWNLOADTIME:				"다운로드 시간",
			REPEAT:						"반복",
			SPEEDLIMIT:					"속도 제한",
			MAXDOWNLOAD:				"최고 다운로드 속도",
			MAXUPLOAD:					"최고 업로드 속도",
			SPEEDTIPS:					"(0은 무제한을 의미합니다)",
			BTPORT:						"BT 다운로드 포트",
			SEED:						"작업 완료 후에도 시드를 유지해 주십시오",
			UNIT:						"KB/S",
			MODIFY:						"수정",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"토렌트 장소",
			CONNECT:					"연결",
			DISCONNECTED:				"연결 끊김",
			CONNECTING:					"연결 중",
			GENERAL:					"일반",
			COMPLETED:					"완료",
			NEWDEVICE:					"새 기기",
			FOUNDUSB:					"새 USB 장치가 발견되었습니다",
			CONNECTEDPEERS:				"연결된 접속자",
			OF:							"1.5GB 중 169.1MB",
			NUM_OF_CON:					"연결 수",
			NUM_OF_CON_G:				"연결 수 세계 최대치",
			NUM_OF_CON_PT:				"토렌트로 연결 가능한 최대치",
			EN_DHT_NET:					"DHT 네트워크 켜짐",
			EN_PE_EX:					"접속자 교환 켜짐",
			EN_BT:						"BitTorrent 프로토콜 암호화 활성화",
			GENERAL_SETTINGS:			"일반 설정",
			BT_SETTINGS:				"BT 설정",
			AMULE_SETTINGS:				"aMule 설정",
			CLEAN:						"제거 완료",
			NONE_COMPLETE: 				"완료된 작업이 없습니다. "
		},

		FOLDER: {
			TITLE: 						"설정 공유",
			ACCOUNT_TITLE: 				"계정 공유",
			ACCOUNT:					"계정",
			AC_NOTE: 					"내용을 공유하기 위한 계정을 준비합니다. 사용자는 로그인 계정을 사용하거나 새로 만들 수 있습니다",
			
			AC_LOGIN: 					"기본 계정 사용",
			AC_FOLLOW: 					"새 계정 사용",

			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",
			CONFIRM: 					"비밀번호 확인",

			SHARING_SETTING: 			"설정 공유",
			SERVER_NAME: 				"네트워크 / 미디어 서버 이름:",

			METHOD: 					"액세스 방법",
			LINK: 						"링크",
			PORT: 						"포트",

			NETWORK_NEIGHBORHOOD: 		"네트워크 이웃",
			FTP: 						"FTP",
			FTPEX: 						"FTP (인터넷을 통한)",

			SHARE_FOLDER: 				"폴더 공유",
			SHAREING_ALL: 				"모두 공유",
			NOTE:  						"모든 파일과 폴더를 공유하거나 지정된 폴더를 공유하거나,  공유를 중단할 수 있습니다.", 
			ENABLE_AUTHENTICATION: 		"사용 인증",
			SHAREING_FOLDER: 			"폴더 공유",
			
			SHARE_NAME: 				"폴더 이름",
			FOLDER_PATH: 				"폴더 경로",
			VOLUMN_NAME: 				"볼륨 이름",

			SHARE_NAME: 				"폴더 이름",
			FOLDER_PATH: 				"폴더 경로",
			MEDIA_SHARING: 				"미디어 공유",
			STATUS: 					"상태",

			GUEST_ACCESS: 				"게스트 네트워크 액세스 허용",
			ENABLE_AUTHENTICATION: 		"사용 인증",
			ENABLE_WRITE_ACCESS: 		"쓰기 액세스 활성화",
			ENABLE_MEDIA_SHARE: 		"미디어 공유를 활성화",
			
			BROWSE: 					"검색",
			BROWSE_TITLE: 				"폴더 선택",

			NO_VOLUMN:					"공유 없음",
			
			NOTICE: 					"동적 DNS 페이지에서 나가겠습니까? 저장을 눌러 저장하고 나갑니다. 를 누르거나, 저장하지 않고 종료합니다. 눌러 설정을 취소합니다.",
			NO_CHANGE_NOTICE: 			"동적 DNS 페이지에서 나가겠습니까?",

			SAVE_FAILED_NOTICE: 		"저장 실패",
			CONTINUE: 					"나가기",
			CONTINUE_SAVE: 				"저장",
			CANCLE: 					"취소",

			ENABLE: 					"사용"

		},

		PRINT:{
			TITLE: 						"프린터 서버",
			NAME: 						"프린터 이름",
			ENABLE_PRINT_SERVER: 		"프린터 서버",
			NONE: 						"없음",
			
			NOTE_TITLE: 				"주의:",
			STEP1: 						"단계1:",
			STEP2: 						"단계2:",
			STEP3: 						"단계3:",

			NOTE1: 						"USB 케이블을 통해 공유기의 USB 포트에 USB 프린터를 연결한다.",
			NOTE2: 						"프린터 드라이버를 설치합니다. 컴퓨터 제조사의 메뉴얼 지시에 따라 진행합니다.",
			NOTE3: 						"티피링크 USB프린터 유틸리티를 설치합니다. 제공된CD(윈도우만 사용가능)나 티피링크 공식페이지에서 다운로드(윈도우와 Mac OS X) 받으실 수 있습니다(<a class=\"link\" href=\"http://www.tp-link.com/kr/Support/\" target=\"_blank\">TP-LINK</a>).",
			NOTE3_US: 					"TP-LINK USB 프린터 컨트롤러 유틸리티를 설치합니다. 설치파일은 공식 웹 사이트에서 다운로드하시기 바랍니다 : <a class=\"link\" href=\"http://www.tp-link.us/Support/\"는 http://www.tp-link.co.kr target=\"_blank\"> / / </a>"
            },

		PARENTAL_CTR:{
			TITLE: 						"보호자 제어",
			STATUS: 					"보호자 제어",
			UNKNOWN: 					"알 수 없음",

			DEVICE_CTR: 				"보호자 제어된 장치",
			DEVICE: 					"장치 이름",
			MAC_ADDRESS: 				"MAC 주소",
			TIME: 						"인터넷 접속 시간",
			DESCRIPTION: 				"설명",
			
			ENABLE_THIS_ENTRY: 			"사용",
			OPTIONAL: 					"(선택 사항)",
			BTN_VIEW: 					"기존 장치 보기",
			
			DEVICE_LIST: 				"장치 목록",
			SYSTEM_TIME: 				"시스템 시간",
			
			RESTR: 						"콘텐츠 제한",
			MODE: 						"제한",
			BLACKMODE: 					"블랙리스트",
			WHITEMODE: 					"화이트리스트",
			ACCESS_DEVICES_LIST: 		"연결된 장치 목록",
			
			CHOOSE: 					"선택",
			ADD_A_NEW_KEYWORD: 			"블록에 새로운 키워드를 추가합니다. ",
			ADD_A_NEW_DOMAIN_NAME: 		"접근을 위해 새로운 도메인 이름을 추가합니다. ",
			
			YOURPC:						"컴퓨터"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"인터넷",
			ROUTER: 					"공유기",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"기타",

			DEVICE: 					"장치",
			RATE: 						"속도",
			APPLICATION: 				"응용 프로그램",

			NAME: 						"이름",
			MAC_ADDRESS: 				"MAC 주소",
			IP_ADDRESS: 				"IP 주소",


			DEVICES: 					"장치"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"대역폭",
			TEST_BANDWIDTH: 			"대역폭 테스트",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"streamboost 활성화",
			UP_LIMITATION: 				"상한 (Mbps)",
			DOWN_LIMITATION: 			"하한(Mbps)",
			RUN_BANDWIDTH_TEST: 		"대역폭 테스트 실행",
			TESTING: 					"테스트하기",
			TEST_FAILED: 				"테스트 실패",
			TEST_SUCCEED: 				"테스트 성공",
			ENABLE_AUTOMATIC_TEST: 		"자동 테스트 활성화",
			KEEP_UP_TO_DATE: 			"streamboost 최신으로 유지",
			ENABLE_AUTOMATIC_UPDATE: 	"자동 업데이트 활성화"

		},

		PRIORITY:{
			PRIORITY: 					"우선순위",
			PRIORITY_TIPS: 				"우선순위는 사용자가 한 장치를 다른 장치보다 더 중요하게 지정할 수 있게 합니다. 이는 장치가 동일 응용 프로그램의 제한된 대역폭에 대해 경쟁할 때 유용합니다.",
			ALL_DEVICE: 				"모든 장치",
			ACTIVE_DEVICE: 				"활성 장치",
			SAVE: 						"저장",
			ID: 						"ID",
			DEVICE: 					"장치",
			TYPE: 						"유형",
			MAC_ADDRESS: 				"MAC 주소",
			STICK: 						"스틱"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"통계",
			UP_TIME: 					"업 타임",
			DOWNLOADS: 					"다운로드",
			LAST_DAY: 					"마지막 날",
			LAST_WEEK: 					"마지막 주",
			LAST_MONTH: 				"마지막 달",
			ALL_LAN_HOSTS: 				"모든 LAN 호슽",
			OTHER: 						"그 외"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"방화벽",
			ENABLE_SPI: 				"SPI 방화벽",

			DOS_PROTECTION: 			"거부 보호",
			ENABLE_DOS: 				"거부 보호",
			
			OFF: 						"끄기",
			LOW: 						"저",
			MIDDLE: 					"중",
			HIGH: 						"고",

			ICMP: 						"ICMP-FLOOD 공격 필터링",
			UDP: 						"UDP ICMP-FLOOD 공격 필터링",
			TCP: 						"TCP-SYN ICMP-FLOOD 공격 필터링",
			ENABLE_DOS_TIP:             "서비스 거부 보호 및 트래픽 통계는 반드시 동시에 활성화되어 있어야 합니다.",

			IGNORE: 					"LAN 포트에서 금지를 핑 패킷함",
			FORBID: 					"WAN 포트에서 핑 패킷을 무시",

			BLOCK_DOS: 					"차단된 DoS 호스트 목록",
			HOST_NUMBER: 				"호스트 번호",
			IP_ADDRESS: 				"IP 주소",
			MAC_ADDRESS: 				"MAC 주소"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"액세스 제어",
			ENABLE_ACCESS: 				"액세스 제어",

			ACCESS_MODE: 				"액세스 모드",
			DEFAULT_ACCESS_MODE: 		"기본 액세스 모드",
			BLACK_LIST: 				"블랙리스트",
			WHITE_LIST: 				"화이트리스트",
			
			WIRED:						"유선",
			WIRELESS:					"무선",

			DEVICE_ONLINE: 				"온라인 장치",
			NAME: 						"장치 이름",
			IP_ADDRESS: 				"IP 주소",
			MAC_ADDRESS: 				"MAC 주소",
			CONN_TYPE: 					"연결 유형",

			BLOCK: 						"블록",

			DEVICE_IN_WHITE: 			"화이트리스트에서 장치",
			DEVICE_IN_BLACK: 			"블랙리스트 장치"
		},

		IP_MAC:{
			TITLE: 						"설정",
			ENABLE_ARP: 				"ARP 바인딩",

			ARP_LIST: 					"ARP 목록",
			ARP_NUM: 					"ARP 항목 수",

			MAC_ADDRESS: 				"MAC 주소",
			IP_ADDRESS: 				"IP 주소",
			BOUND: 						"바인딩",
			UNBOUND: 					"언바인딩",

			BINDING_LIST: 				"바인딩 목록",
			DESCRIPTION: 				"설명",
			OPTIONAL: 					"(선택 사항)",
			ENABLE_THIS_ENTRY: 			"사용"
		},

		TIMESET: {
			TITLE: 						"시간 설정",
			ZONE: 						"시간대",
			DATE: 						"날짜",
			DATEFORMAT: 				"월/일/연도",
			TIME: 						"시간을",
			TIMEFORMAT: 				"(시간/분/초)",
			NTP1: 						"NTP 서버 I",
			NTP2: 						"NTP 서버 II",
			OPTIONAL: 					"(선택 사항)",

			CURRENT_TIME:  				"현재 시간",
			SET_TIME: 					"시간 설정",
			AUTOMATIC: 					"자동으로 인터넷에서 얻으십시오",
			MANUAL: 					"수동",
			AUTOMATIC_BTN: 				"확보",


			GETGMT: 					"GMT 얻기",

			
			GETGMT_SUCCESS: 			"NTP 서버에서 시간 얻기 성공 ",
			GETGMT_TIMEOUT: 			"NTP 서버에서 시간 얻기 시간 초과",
			GETGMT_WAIT: 				"기다리는 중",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"일광 절약",
			ENABLE_DAYLIGHT: 			"일광 절약 사용",
			START: 						"시작",
			END: 						"끝",

			RUNNING_STATUS: 			"상태를 실행",
			DOWN: 						"일광 절약 다운",
			UP: 						"일광 절약 업"
		},

		DIAG:{
			TITLE: 						"진단",
			DIAGNOSTIC_TOOL: 			"진단 도구",
			PING: 						"핑",
			TRACE: 						"경로 추적",

			IPADDR: 					"IP 주소 / 도메인 이름",
			COUNT: 						"핑 개수",
			
			BASIC: 						"기본",
			ADVANCED: 					"고급",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"핑 패킷 크기",
			PKTUNIT: 					"(4-1472 바이트)",

			TIMEOUT: 					"핑 시간 초과",
			TIMOUTUNIT: 				"(100-2000  밀리초)",

			TTL: 						"경로 추적 최대 TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"시작",
			STOP: 						"정지"
		},

		FIRMWARE:{
			TITLE: 						"펌웨어 업그레이드",
			FIRMWARE_INFO:  			"펌웨어가 최신 버전입니다",
			INFO: 						"기기 정보",
			REMOTE_TITLE: 				"온라인 업그레이드",
			LOCAL_TITLE: 				"로컬 업그레이드",

			NEWFILE: 					"새로운 펌웨어 파일",
			FIRMWAREVERSION: 			"펌웨어 버전",
			HARDWAREVERSION: 			"하드웨어 버전",
			LATESTVERSION: 				"최신 버전",
			CONFIRM_CONTENT:			"펌웨어를 업그레이드 하시겠습니까?",
			WARNING:					"펌웨어를 업그레이드 중입니다... <br/> 오류를 방지하기 위해 기기 전원을 끄지 마시고 업데이트 도중 작업을 실행하지 마십시오.",
			REBOOTING: 					"재부팅 중입니다... <br/> 오류를 방지하기 위해 기기 전원을 끄지 마시고 도중에 다른 작업을 실행하지 마십시오.",
			DO_NOT_OPERATE: 			"업그레이드중... <BR/> 업그레이드중에는 사용하지 마십시오.",
			FIRMWARE_UPDATING_NOTE: 	"1.펌웨어 업데이트 중...",
			REBOOTING_NOTE: 			"2.재부팅 중...",
			SCREEN_UPDATING_NOTE: 		"3.화면 업데이트 중...",
			UPGRADE_FAILED: 			"업그레이드에 실패했습니다.",
			UPGRADE: 					"업그레이드",
			CHECK: 						"확인",
			DOWNLOADING: 				"다운로드 중...",
			UPGRADE_INOF: 				"오류를 방지하기 위해 기기의 전원을 끄지 마십시오.",
			NOTE: 						"경고: ",
			NO_UPGRADE: 				"현재 버전은 최신 버전입니다",

			UPGRADING: 					"업그레이드 중...",
			RETRY: 						"재시도",
			CANCEL: 					"취소",
			ILEGAL_DEVICE:				"기기를 인식할 수 없습니다. TP-LINK 기술지원 팀에 문의해 주십시오.",
			UPGRADE_FAIL: 				"업그레이드 할 수 없습니다. 다시 시도해 주십시오.",
			CHECK_UPGRADE:				"업데이트 확인"
		},

		BACKUP:{
			BACKUP: 					"백업",
			BACKUPTIP: 					"현재 설정의 복사본을 저장",

			RESTORE: 					"복원",
			RESTORETIP: 				"파일에서 저장된 설정을 복원",
			
			RESTORE_WARN:				"공유기 복원 중… 처리하는 동안 아무 작동도 하지 마십시오.",
			RESTORE_CONFIRM_CONTENT: 	"백업 파일에서 라우터를 복원 하시겠습니까?",
			
			FILE: 						"파일",

			FACTORY: 					"공장 초기화",
			FACTORYTIP: 				"기본값으로 모든 구성 설정을 되돌립니다",
			FACTORY_CONFIRM_CONTENT:	"공장 기본값으로 라우터를 복원 하시겠습니까?",
			FACTORY_WARN:				"공유기 복원중",
			
			BACKUPBTN: 					"백업",
			RESTOREBTN: 				"복원",
			FACTORYBTN: 				"공장 초기화"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"계정 관리",
			
			OLDUSER: 					"이전 사용자 이름",
			OLDPWD: 					"이전 비밀번호",

			NEWUSER: 					"새 사용자 이름",
			NEWPWD: 					"새 비밀번호",
			CONFIRM: 					"새 비밀번호 확인",

			RECOVERYINFO: 				"비밀번호 복구",
			ENABLE_PASSWORD_RECOVERY: 	"비밀번호 복구 사용",
			FROM: 						"에서",
			TO: 						"하려면",
			SMTP_SERVER: 				"SMTP 서버",
			
			ENABLE_AUTHENTICATION: 		"사용 인증",
			USERNAME: 					"사용자 이름",
			PASSWORD: 					"비밀 번호",

			TEST_MAIL: 					"테스트 메일",

			LOCAL:						"로컬 관리",
			LOCAL_MAC_AUTH: 			"로컬 MAC 인증",
			ACCESS: 					"모든 LAN 연결 장치에 대한 액세스",
			ACCESS_TIPS: 				"LAN에 있는 모든 장치에 대한 관리를 가능하게 하거나 특정 장치에 대한 관리를 가능하게하기 위해 기능을 사용합니다",
			
			MAC_ADDRESS: 				"MAC 주소",
			VIEW_BTN: 					"기존 장치 보기",
			DESCRIPTION: 				"설명",

			EXIST_DEVICE:               "기존 장치",

			OPTIONAL: 					"(선택 사항)",
			ENABLE_THIS_ENTRY: 			"사용",

			DEVICE_NAME:				"장치 이름",
			IP_ADDRESS:					"IP 주소",
			

			REMOTE: 					"원격 관리",
			DISABLE_REMOTE_MANAGEMENR: 	"원격 관리 사용안함",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"모든 장치에 대한 원격 관리 사용",
			ENABLE_REMOTE_MANAGEMENR: 	"특정 장치에 대한 원격 관리 사용",
			WEB: 						"웹 관리 포트",

			NOTICE:						"가상 서버 포트와 충돌! 계속 하시겠습니까?",
			NOTICE_ENTER_ANOTHER:		"가상 서버 포트와 충돌합니다. 다른 포트를 입력하십시오. ",

			REMOTEIP: 					"원격 관리 IP 주소",
			REMOTEIPNOTE: 				"(모두 255.255.255.255를 입력합니다)"
			
		},

		SYSLOG:{
			TITLE: 						"시스템 로그",
			LOG_FILTER: 				"로그 필터:",
			
			TYPE_EQ: 					"유형=",
			
			ALL: 						"모두",

			FIREWALL: 					"방화벽", 
			NAT: 						"NAT",
			DDNS: 						"동적 DNS",
			UPNP:						"UPnP",
			IMB:            			"IP&MAC 바인딩",
			IPTV:						"IPTV",
			DHCPS:						"DHCP 서버",
			IGMP_PROXY:					"IGMP 프록시",
			DOMAIN_LOGIN:				"도메인 로그인",
			BASIC_SECURITY: 			"기본 보안",
			PARENTAL_CONTROL: 			"보호자 제어",
			ACCESS_CONTROL: 			"액세스 제어",
			DOS_PROTECTION: 			"거부 보호",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"트레픽 통계",
			TIME_SETTINGS: 				"시간 설정",
			ACCOUNT_MANAGEMENT: 		"계정 관리",
			LOCAL_MANAGEMENT: 			"로컬 관리",
			REMOTE_MANAGEMENT: 			"원격 관리",
			LOCALE: 					"장소",
			FACTORY_RESET: 				"공장 기본값 재설정",
			LED_CONTROLLER: 			"Led 제어기",
			NETWORK: 					"네트워크",
			USBSHARE: 					"USB 공유",
			AND: 						"그리고",
			LEVEL: 						"레벨",
			EMERGENCY:					"비상",
			ALERT:						"변경",
			CRITICAL:					"임계",
			ERROR: 						"오류",
			WARNING: 					"경고",
			NOTICE: 					"주의사항",
			INFO: 						"정보",
			DEBUG: 						"디버그",

			INDEX: 						"색인",
			TYPE: 						"유형",
			TIME: 						"시간을",
			LEVEL_COL:					"레벨",

			CONTENT: 					"콘텐츠 로그인",
			
			MAIL_LOG: 					"메일 로그",
			SAVE_LOG: 					"로그 저장",

			SEND_OK: 					"보내기 성공",
			SEND_FAILED: 				"보내기 실패",

			MAIL_SETTING: 				"메일 설정",

 			FROM: 						"에서",
 			TO: 						"하려면",
 			SMTP_SERVER: 				"SMTP 서버",
 			ENABLE_AUTHENTICATION: 		"사용 인증",

 			USERNAME: 					"사용자 이름",
 			PASSWORD: 					"비밀 번호",
 			CONFIRM_PASSWORD: 			"비밀번호 확인",

 			AUTO_MAIL: 					"자동 메일 사용",
 			LOG_AT: 					"로그인",
 			HH_MM: 						"(HH : MM) 매일",

 			LOG_EVERY: 					"모든 로그",
 			HOURS: 						"시간"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"설정",
			STATUS: 					"QoS 사용",
			UPBANDWIDTH: 				"대역폭 업로드",
			DOWNBANDWIDTH: 				"대역폭 다운로드",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"속도 테스트",
			RULE_LIST: 					"QoS 규칙 목록",
			RULE: 						"QoS 규칙",
			ID: 						"ID",
			NAME: 						"이름",
			TYPE: 						"유형",
			DETAIL: 					"세부사항",
			PRIORITY: 					"우선순위",

			APPLICATION: 				"응용 프로그램",
			APPLICATION_LIST: 			"응용 프로그램 목록",
			CUSTOM_APP: 				"사용자 지정 응용 프로그램",
			MAC_ADDR: 					"MAC 주소",
			MAC_ADDR_P: 				"MAC",
			IP_ADDR: 					"IP 주소",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"물리적 포트",

			LOW: 						"저",
			MIDDLE: 					"중",
			HIGH: 						"고",

			PROTO: 						"프로토콜",
			PORT: 						"포트",
			PROTO_P: 					"프로토콜",
			PORT_P: 					"포트",
			PORT_TIPS: 					"(XX 또는 XX-XX,1-65535, 최대 5쌍)",

			ALL: 						"모두",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"사용자 지정",

			WIFI_HOME: 					"WIFI-HOST",
			WIFI_GUEST: 				"WIFI-게스트",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"데이터베이스 업그레이드",

			NEWFILE: 					"새 데이터베이스 파일",
			FIRMWAREVERSION: 			"데이터베이스 버전",
			CONFIRM_CONTENT:			"데이터베이스를 업데이트 하시겠습니까?",
			WARNING:					"데이터베이스 업데이트 중… 처리하는 동안 아무 작동도 하지 마십시오.",
			
			UPGRADE: 					"업그레이드",

			SERVICE_RESTART: 			"QoS 서비스 재시작 중",
			
			TYPE: 						"유형",
			BY_DEVICE: 					"장치에 의해",
			BY_APP: 					"응용 프로그램",
			BY_PHY: 					"물리적 포트",

			HIGH_PRIORITY_LBL: 			"높은 우선 순위",
			MIDDLE_PRIORITY_LBL: 		"중간 우선 순위",
			LOW_PRIORITY_LBL: 			"낮은 우선 순위",

			HIGH_PRIORITY: 				"높은 우선 순위",
			MIDDLE_PRIORITY: 			"중간 우선 순위",
			LOW_PRIORITY: 				"낮은 우선 순위"

		},

		APPLICATION:{
			APP_LIST: 					"응용 프로그램 목록",
			GAME_LIST: 					"게임 목록",

			QQ: 						"큐큐"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"트레픽 통계",
			ENABLE_STATISTICS: 			"트레픽 통계",

			TITLE: 						"트레픽 통계 목록",
			IP_MAC: 					"IP 주소 / MAC 주소",
			TPKT: 						"전체 패킷",
			TBYTE: 						"총 바이트 수",
			CPKT: 						"현재 패킷",
			CBYTE: 						"현재 바이트",
			CICMP: 						"현재 ICMP 송신",
			CUDP: 						"현재 UDP 송신",
			CSYN: 						"현재 SYN 송신",
			
			DELETE_CONFIRM: 			"트래픽 통계를 삭제 하시겠습니까?",
			DELETE_ALL_CONFIRM: 		"모든 트래픽 통계를 삭제 하시겠습니까?",

			RESET_ALL: 					"전체 해제"
		},

		SYSPARA:{
			W24G: 						"무선 2.4GHz",
			W5G: 						"무선 5GHz",
			W60G: 						"60GHz 무선",
			W24G_WDS: 					"2.4GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"참고 : 무선 기능이 꺼져 있습니다. 이 기능을 사용하려면 무선 랜 버튼을 켜십시오.",

			ENABLE_TIPS: 				"무선 기능을 사용할 수 없습니다.",

			BEACON: 					"비컨 간격",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS 임계 값",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"분할 임계값",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM 간격",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"그룹 키 업데이트 기간",
			GROUPUNIT: 					"초",
			
			MU_MIMO_FEATURE: 			"다중 사용자-MIMO",
			MU_MIMO: 					"MU-MIMO를 활성화합니다. ",
			
			WMM_FEATURE: 				"WMM 기능",
			WMM: 						"WMM을 사용",

			GI_FEATURE: 				"짧은 GI 기능",
			GI: 						"짧은 GI를 사용",

			AP_FEATURE: 				"AP 고립 기능",
			AP: 						"AP 고립 기능 사용",

			WDS_FEATURE: 				"WDS 브리지",
			WDS: 						"WDS 브리지 사용",
			
			SSID_BRIDEGE: 				"SSID (브리지)",
			SURVEY: 					"무선랜 검색",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC 주소",
			SSID: 						"SSID",
			SIGNAL: 					"신호",
			CHANNEL: 					"채널",
			SECURITY: 					"보안",
			CHOSEN: 					"선택한",
			AP_NUMBER:					"AP 번호",

			TOTAL: 						"전체 항목",

			MAC: 						"MAC 주소 (브리지)",
			MACUNIT: 					"예: 00-1D-0F-11-22-33",

			SECURITY: 					"보안",
			NO: 						"아니오",
			NONE: 						"보안 없음",
			WPA: 						"WPA-PSK / WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"비밀 번호",
			
			AUTH_TYPE: 					"인증 유형",
			AUTO: 						"자동",
			OPEN: 						"개방형 시스템",
			SHARED: 					"공유 키",

			WEP_INDEX: 					"WEP 색인",
			KEY1: 						"키1",
			KEY2: 						"키2",
			KEY3: 						"키3",
			KEY4: 						"키4",

			WEP_KEY_FORMAT: 			"WEP 키 포맷",
			ASC: 						"ASCII",
			HEX: 						"진수",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"WPS를 사용",

			NAT: 						"NAT",
			ENABLE_NAT: 				"NAT를 사용",
			
			NAT_BOOST: 					"NAT부스트",
			ENABLE_NAT_BOOST: 			"NAT 부스트 활성화",
			
			MEDIA_SERVER: 				"미디어 서버",
			SCAN_INTERVAL: 				"자동 스캔 간견 (시간)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"DoS 보호 수준 설정",

			ICMP: 						"ICMP-FLOOD 패킷 수준",
			UDP: 						"UDP-FLOOD 패킷 레벨",
			TCP: 						"TCP-FLOOD 패킷 레벨",

			WDS_MODE: 					"WDS 모드",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"저",
			MIDDLE: 					"중",
			HIGH: 						"고",

			TO: 						"받을메일",
			NOTICE_NAT_REBOOT: 			"재부팅중",

			NOTICE_NAT_BOOST: 			"NAT 부스트를 수정하려면 장치를 재부팅할 것 입니다. 재부팅을 하시겠습니까?",
			NOTICE:						"공유기의 채널은 브리지 AP의 채널과 동일하지 않습니다. 변경하시겠습니까?",

			UNIT: 						"(5-7200)패킷/초",
			LED: 						"LED",
			NIGHT_MODE: 				"야간 모드",
			PERIOD_NIGHT_TIME: 			"야간 모드 기간",
			ENABLE: 					"사용",
			HH_MM: 						"(시간:분)",
			TO: 						"받을메일",
			NIGHT_MODE_NOTE:            "LED가 꺼져있습니다. 이 기능을 사용하고 싶으신 경우 LED 버튼을 누르거나 페이지 우측 상단의 LED 를 클릭하십시오.",
			NOTE2:                      "야간 모드 설정은 공유기의 시스템 시간에 맞춰 작동됩니다. 공유기 시간 설정을 하셨는지 확인해 주시기 바랍니다."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"인증서가 없습니다. VPN 서버를 활성화 하기 전에 인증서를<b>Generate</b>(생성)해 주십시오.",
			NO_CERT_NOTE2: 				"인증서가 없습니다. VPN 설정을 내보내기 전에 인증서를<b>Generate</b>(생성)해 주십시오.",
			ENABLE_VPN_SERVER: 			"VPN 서버 활성화",
			SERVICE_TYPE: 				"서비스 유형",
			SERVICE_PORT: 				"서비스 포트",
			VPN_SUBNET: 				"VPN 서브넷/넷마스크",
			CLIENTS_ACCESS: 			"클라이언트 액세스",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"홈 네트워크 전용",
			INTERNET_HOME: 				"인터넷 및 홈 네트워크",
			CERT_STR: 					"인증서가 없습니다. OK를 클릭해 생성하시거나 현재 설정을 저장해 주십시오.",
			CERT_STR2: 					"인증서가 없습니다. OK를 클릭해 생성한 다음 현재 설정을 내보내기 해주십시오.",
			CONF_FILE: 					"구성 유형", 
			EXPORT_CONF_FILE: 			"구성 내보내기",
			EXPORT: 					"내보내기",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"클라이언트 IP 주소",
			ACCOUNT_USERNAME: 			"사용자 이름",
			ACCOUNT_PASSWORD: 			"비밀 번호",
			CLIENT_IP_NOTE: 			"(클라이언트 최대 10명)",
			SAME_SUBNET_NOTE: 			"클라이언트 IP 주소와 LAN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다른 주소를 입력해 주십시오.",
			CONFLICT_WITH_DHCP: 		"클라이언트 IP 주소가 DHCP IP 주소 풀과 충돌합니다. <br/>다시 입력해 주십시오.",
			CONFLICT_WITH_RESERVED: 	"클라이언트 IP 주소가 예비 IP 주소와 충돌합니다. <br/>다시 입력해 주십시오.",
			CONFLICT_WITH_OPENVPN: 		"클라이언트 IP 주소와 OpenVPN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다른 주소를 입력해 주십시오.",
			SAME_SUBNET_NOTE2: 			"VPN 서브넷/넷마스크와 LAN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다른 주소를 입력해 주십시오.",
			CONFLICT_WITH_DHCP2: 		"VPN 서브넷/넷마스크가 DHCP IP 주소 풀과 충돌합니다. <br/>다시 입력해 주십시오.",
			CONFLICT_WITH_RESERVED2: 	"VPN 서브넷/넷마스크가 예비 IP 주소 풀과 충돌합니다. <br/>다시 입력해 주십시오.",
			CONFLICT_WITH_PPTPVPN: 		"VPN 서브넷/넷마스크와 PPTP VPN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다시 입력해 주십시오.",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN IP 주소와 OpenVPN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다시 입력해 주십시오.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN IP 주소와 PPTP VPN IP 주소는 같은 서브넷에 있어서는 안됩니다. <br/> 다시 입력해 주십시오.",
			VPN_MASK_ERROR: 			"넷마스크는 255.255.255.248보다 클 수 없습니다.<br/>다시 입력해 주십시오.",
			ACCOUNT_LIST: 				"계정 목록(최대 16개)",
			ADVANCED_SETTING: 			"고급",
			ALLOW_SAMBA: 				"Samba (Network Place) 접속 허용",
			ALLOW_NETBIOS: 				"NetBIOS 패스스루 허용",
			ALLOW_UNENCRYPTED_CONN: 	"비 암호화된 접속 허용",
			USERNAME_CONFLICT: 			"사용자이름이 이미 존재합니다. 다른 이름을 입력해 주십시오.",
				
			NOTICE_VS_CONFLICT:			"버추얼 서버 외부 포트와 충돌합니다 다른 포트를 입력해 주십시오.",
			NOTICE_PT_CONFLICT:			"포트 트리거링 외부 포트와 충돌합니다 다른 포트를 입력해 주십시오.",
			NOTICE_VS_MODIFY:			"버추얼 서버 외부 포트와 충돌합니다(1723). <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Virtual Servers</a>위 페이지로 가셔서 버추얼 서버 외부 포트를 변경해 주시기 바랍니다.",
			NOTICE_PT_MODIFY:			"포트 트리거링 외부 포트와 충돌합니다(1723). <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Port Triggering</a>위 페이지로 가셔서 포트 트리거링 외부 포트를 변경해 주시기 바랍니다.",
			
			GENERATE_CERT: 				"인증서",
			GENERATE_NEW_CERT: 			"인증서를 생성합니다.",
			GENERATE: 					"생성",
			GENERATE_TIPS: 				"인증서 생성 중...<br/>이 작업은 몇 분 정도 걸릴 수 있습니다. 잠시만 기다려 주십시오.",
			CERT_SUCCESS: 				"성공",
			CERT_FAIL: 					"실패했습니다. 다시 시도해 주십시오.",
			
			VPN_CONNECTIONS: 			"VPN 연결",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN 연결",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN 연결",
			USER: 						"사용자",
			REMOTE_IP: 					"리모트 IP",
			ASSIGNED_IP: 				"할당된 IP"
		}
	};
})(jQuery);
