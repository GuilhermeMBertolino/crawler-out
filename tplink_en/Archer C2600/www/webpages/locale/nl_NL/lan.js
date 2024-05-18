(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			FORGET_PASSWORD: 			"Wachtwoord vergeten?",
			LOGIN: 						"Inloggen",
			IMPORTANT_UPDATE_INFO: 		"Om het conflict met het front-end apparaat te voorkomen, is het IP-adres van uw router gewijzigd in",
			CONTINUE: 					"Doorgaan",

			IMPORTANT_NOTICE: 			"Belangrijke mededeling",
			OR: 						", weet u zeker dat u wilt doorgaan met bezoeken van",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"Hou de Reset toets 10 seconden ingedrukt om de router naar fabrieksinstellingen terug te zetten.",
			FORGET_PASSWORD_INFO_1: 	"Als de functie Wachtwoord vergeten ingeschakeld is. Wordt een verificatiecode naar het opgegeven e-mailadres gestuurd, om de gebruikersnaam en het wachtwoord opnieuw in te stellen.",
			FORGET_PASSWORD_SEND_FAILED:"De code is niet verzonden! Controleer uw Internet verbinding.",

			VERIFICATION_CODE: 			"Verificatiecode",

			RECEIVE_CODE: 				"Stuur code",

			CONFIRM: 					"Bevestigen",

			SEC: 						" ",

			USER_CONFLICT: 				"Inlog conflict!",
			FIRST_TIME: 				"Welkom bij het gebruik van de Archer AD7200 ontworpen door TP-LINK in China. Om te beginnen, creëer een apparaat wachtwoord om deze te beheren.",
			
			USER_CONFLICT_INFO: 		"Gebruiker %USER% met host %HOST% (%IP%/%MAC%) is momenteel op de router ingelogd. U kunt niet tegelijkertijd inloggen. Probeer het later opnieuw.",
			USER_CONFLICT_INFO_1: 		"Gebruiker %USER% (%MAC%) is momenteel ingelogd op de router. U kunt niet gelijktijdig inloggen. Probeert u het later nog eens.",
			USER_CONFLICT_INFO_2: 		"Gebruiker  %USER% (%IP%) is momenteel op de router ingelogd. U kunt niet tegelijkertijd inloggen. Probeer het later opnieuw.",
			
			LOGIN_FAILED: 				"Inloggen mislukt!",
			LOGIN_FAILED_COUNT: 		"Inloggen is %num1 maal mislukt en u hebt nog %num2 pogingen over.",
			NO_COOKIE: 					"Cookies moeten ingeschakeld zijn om in te loggen. Schakel cookies in, of zet Privé/Incognito browsen uit.", 

			FORGET_PASSWORD_NOTE: 		"Als u de functie Wachtwoord vergeten niet geconfigureerd hebt, houdt u de Reset toets 10 seconden ingedrukt om de router op fabrieksinstellingen terug te zetten."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Nu bijwerken",
			REMIND: 						"Herinner mij later",
			NOTICE:    						"Hallo, er is een nieuwe firmware beschikbaar voor de  %PRODUCT% router.",
			NEVER: 							"Negeer deze versie."
			
		},

		WAN_ERROR: {
			TITLE: 							"Wan connectie fout!",
			STATUS: 						"Status",
			INFO: 							"Informatie",
			SETUP: 							"Stel een internet verbinding in",
			NEVER: 							"Herinner mij niet nogmaals"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Firmware versie:",
			HARDWARE_VERSION: 				"Hardware versie:",
			HELP_SUPPORT: 					"Support",
			FAQ: 							"Vaak gestelde vragen",
			CONFIRM_REBOOT: 				"Weet u zeker dat u de router opnieuw wilt starten?",
			CONFIRM_LOGOUT: 				"Weet u zeker dat u wilt uitloggen?",
			UPGRADE_ALERT_1: 				"De huidige firmware ondersteunt niet de TP-LINK Cloud service. We raden u sterk aan dat u de laatste firmware download op www.tp-link.com en de firmware bijwerkt.",
			UPGRADE_ALERT_2: 				"De huidige firmware ondersteunt niet de TP-LINK cloud service. We raden u sterk aan dat u de firmware bijwerkt door te klikken op het Update icoon in de hoek rechtsboven.",
			REBOOTING: 						"Opnieuw starten... <br/>A.u.b. niet bedienen tijdens het opnieuw starten.",

			MODE_SWITCH: 					"Modus veranderen",
			ACCESS_POINT: 					"Access Point",
			ACCESS_POINT_TIPS: 				"Bekabeld netwerk in draadloos netwerk omzetten.",
			ROUTER: 						"Router",
			ROUTER_TIPS: 					"Meerdere apparaten via kabel of draadloos verbinding laten maken.",
			REPEATER: 						"Repeater",
			REPEATER_TIPS: 					"De signaaldekking van uw draadloze netwerk vergroten.",
			MODE_REBOOT_TIP: 				"Bij veranderen van Modus wordt dit apparaat opnieuw gestart; weet u zeker dat u wilt doorgaan?",
			MODE_FAIL_TIP: 					"Modus veranderen mislukt. Probeer het later opnieuw, of start de router opnieuw."
		},

		NAV: {
			QUICK_SETUP: 				"Quick start",
			BASIC: 						"Basis",
			ADVANCED: 					"Geavanceerd"
		},

		CONTROL: {
			MODE: 						"Modus",
			LOGIN: 						"Inloggen",
			LED:                        "LED",
			LED_ON:                     "LED Aan",
			LED_OFF:                    "Led Uit",			
			LED_DISABLED:               "De LED status kan niet gewijzigd worden tijdens de nacht mode periode.",			
			LOGOUT: 					"Uitloggen",
			UPDATE: 					"Update",
			REBOOT: 					"Herstarten"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albanië",
			ALGERIA: 					"Algerije",
			AMERICAN_SAMOA: 			"Amerikaans Samoa",
			ARGENTINA: 					"Argentinië",
			ARMENIA: 					"Armenië",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australië",
			AUSTRIA: 					"Oostenrijk",
			AZERBAIJAN: 				"Azerbeidjan",
			BAHAMAS: 					"Bahama's",
			BAHRAIN: 					"Bahrein",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbodos",
			BELARUS: 					"Wit-Rusland",
			BELGIUM: 					"België",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnië en Herzegowina",
			BRAZIL: 					"Brazilië",
			BRUNEI_DARUSSALAM: 			"Brunei Dar Es Salaam",
			BULGARIA: 					"Bulgarije",
			CAMBODIA: 					"Cambodja",
			CANADA: 					"Canada",
			CAYMAN_ISLANDS: 			"Kaaiman Eilanden",
			CHILE: 						"Chili",
			CHINA: 						"Volksrepubliek China",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Kroatië",
			CYPRUS: 					"Cyprus",
			CZECH_REPUBLIC: 			"Tsjechische Republiek",
			DENMARK: 					"Denemarken",
			DOMINICAN_REPUBLIC: 		"Dominicaanse Republiek",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egypte",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estland",
			ETHIOPIA: 					"Ethiopië",
			FAEROE_ISLANDS: 			"Faröer Eilanden",
			FINLAND: 					"Finland",
			FRANCE: 					"Frankrijk",
			FRENCH_GUIANA: 				"Frans Guyana",
			FRENCH_POLYNESIA: 			"Frans Polynesië",
			GEORGIA: 					"Georgië",
			GERMANY: 					"Duitsland",
			GREECE: 					"Griekenland",
			GREENLAND: 					"Groenland",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haïti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong S.A.R., P.R.C.",
			HUNGARY: 					"Hongarije",
			ICELAND: 					"IJsland",
			INDIA: 						"India",
			INDONESIA: 					"Indonesië",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Ierland",
			ISRAEL: 					"Israël",
			ITALY: 						"Italië",
			JAMAICA: 					"Jamaica",

			JAPAN: 						"Japan",
			JAPAN_1: 					"Japan 1",
			JAPAN_2: 					"Japan 2",
			JAPAN_3: 					"Japan 3",
			JAPAN_4: 					"Japan 4",
			JAPAN_5: 					"Japan 5",
			JAPAN_6: 					"Japan 6",

			JORDAN: 					"Jordanië",
			KAZAKHSTAN: 				"Kazachstan",
			KENYA: 						"Kenia",

			NORTH_KOREA: 				"Noord-Korea",
			KOREA_REPUBLIC: 			"Republiek Korea",
			KOREA_REPUBLIC_3: 			"Republiek Korea 3",

			KUWAIT: 					"Koeweit",
			LATVIA: 					"Letland",
			LEBANON: 					"Libanon",
			LIBYA: 						"Libië",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Litouwen",
			LUXEMBOURG: 				"Luxemburg",
			MACAU: 						"Macau SAR",
			MACEDONIA: 					"Voormalige Joegoslavische Republiek Macedonië",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Maleisië",
			MALDIVES: 					"Maldiven",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexico",
			MONACO: 					"Vorstendom Monaco",
			MONGOLIA: 					"Mongolië",
			MOROCCO: 					"Marokko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Nederland",
			NETHERLANDS_ANTILLES: 		"Nederlandse Antillen",
			
			NEW_ZEALAND: 				"Nieuw-Zeeland",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Noorwegen",
			NORTHERN_MARIANA_ISLANDS: 	"Noordelijke Mariana Eilanden",
			OMAN: 						"Oman",
			PAKISTAN: 					"Islamitische Republiek Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papoea Nieuw-Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Republiek Filippijnen",
			POLAND: 					"Polen",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Roemenië",
			RUSSIA: 					"Rusland",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Saoedi Arabië",
			SINGAPORE: 					"Singapore",
			SLOVAK_REPUBLIC: 			"Republiek Slowakije",
			SLOVENIA: 					"Slovenië",
			SOUTH_AFRICA: 				"Zuid-Afrika",
			SPAIN: 						"Spanje",
			SRI_LANKA: 					"Saoedi Arabië",
			SURINAME: 					"Suriname",
			SWEDEN: 					"Zweden",
			SWITZERLAND: 				"Zwitserland",
			SYRIA: 						"Syrië",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Thailand",
			TRINIDAD_TOBAGO: 			"Trinidad y Tobago",
			TUNISIA: 					"Tunesië",
			TURKEY: 					"Turkije",
			UGANDA: 					"Oeganda",
			UKRAINE: 					"Oekraïne",
			UNITED_ARAB_EMIRATES: 		"Verenigde Arabische Emiraten",
			UNITED_KINGDOM: 			"Verenigd Koninkrijk",
			UNITED_STATES: 				"Verenigde Staten",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Oezbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Maagden Eilanden (VS)",
			YEMEN: 						"Jemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway Eiland, Samoa",
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
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azoren, Kaapverdische eil.",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich Mean Time, Dublin, Londen, Amsterdam",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlijn, Stockholm, Rome, Bern, Brussel",
			ATHENS_HELSINKI: 			"(GMT+02:00) Athene, Helsinki, Oost-Europa, Israël",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Baghdad, Koeweit, Nairobi, Riyadh, Moskou",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kaboel",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Jekaterinenburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Calcutta, Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Beijing, Hong Kong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seoul, Jakoetsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomon eil., Nieuw-Caledonië",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamtsjatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Applicatie",
			GAME:						"GAME",
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
			DAY: 						"Dag",

			MONDAY: 					"Maandag",
			TUESDAY: 					"Dinsdag",
			WEDNESDAY: 					"Woensdag",
			THURSDAY: 					"Donderdag",
			FRIDAY: 					"Vrijdag",
			SATURDAY: 					"Zaterdag",
			SUNDAY: 					"Zondag",
			
			MON: 						"Ma",
			TUES: 						"Di",
			WED: 						"Wo",
			THUR: 						"Do",
			FRI: 						"Vr",
			SAT: 						"Za",
			SUN: 						"Zo",

			JAN: 						"Jan",
			FEB: 						"Feb",
			MAR: 						"Mrt",
			APR: 						"Apr",
			MAY: 						"Mei",
			JUN: 						"Jun",
			JUL: 						"Jul",
			AUG: 						"Aug",
			SEP: 						"Sep",
			OCT: 						"Okt",
			NOV: 						"Nov",
			DEC: 						"Dec"

		},

		HOUR: {
			AM_1: 						"01:00",
			AM_2: 						"02:00",
			AM_3: 						"03:00",
			AM_4: 						"04:00",
			AM_5: 						"05:00",
			AM_6: 						"06:00",
			AM_7: 						"07:00",
			AM_8: 						"08:00",
			AM_9: 						"09:00",
			AM_10: 						"10:00",
			AM_11: 						"11:00",
			AM_12: 						"12:00",
			PM_1: 						"13:00",
			PM_2: 						"14:00",
			PM_3: 						"15:00",
			PM_4: 						"16:00",
			PM_5: 						"17:00",
			PM_6: 						"18:00",
			PM_7: 						"19:00",
			PM_8: 						"20:00",
			PM_9: 						"21:00",
			PM_10: 						"22:00",
			PM_11: 						"23:00",
			PM_12: 						"24:00"
		},

		ORDER: {
			"1ST": 						"Eerste",
			"2ND": 						"2e",
			"3RD": 						"3e",
			"4TH": 						"4e",
			"5TH": 						"Laatste",
			"1ST_": 					"1e",

			TH: 						"e"
		},

		GRID: {
			CLIENT_NUMBER: 				"Cliënt nummer",

			ID: 						"ID",
			MODIFY: 					"Wijzigen",
			STATUS: 					"Status",
			ENABLE: 					"Inschakelen",

			OPERATION: 					"Werking",
			CHOOSE: 					"Kiezen",
			DESCRIPTION: 				"Beschrijving",
			

			AUTO_REFRESH: 				"Auto vernieuwen",
			REFRESH: 					"Vernieuwen",
			NUMBER: 					"Nummer",
			ENABLED: 					"Ingeschakeld",
			DISABLED: 					"Uitgeschakeld",
			ACTIVE: 					"Actief",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Toevoegen",
			CHOOSE: 					"Kiezen",
			EDIT: 						"Wijzigen",
			DELETE: 					"Verwijderen",
			DELETE_ALL: 				"Alles verwijderen",
			REMOVE: 					"Verwijderen",
			RESET: 						"Reset",
			RESET_ALL: 					"Alles resetten",
			DETECT: 					"Detecteren",
			ENABLE: 					"Inschakelen",
			DISABLE: 					"Uitschakelen",
			PAUSE:						"Pauze",
			RESUME:						"Hervatten",
			
			REFRESH: 					"Vernieuwen",
			SEARCH: 					"Zoeken…",
			BROWSE: 					"Bladeren",

			SAVE: 						"Opslaan",
			BACK: 						"Terug",

			PREV: 						"Vor.",
			NEXT: 						"Volg.",
			FINISH: 					"Voltooien",
			
			ON: 						"Aan",
			OFF: 						"Uit",
			LOW: 						"Laag",
			MIDDLE: 					"Middel",
			HIGH: 						"Hoog",
			
			OK: 						"OK",
			CANCEL: 					"Annuleren",

			YES: 						"Ja",
			NO: 						"Nee",
			
			CONNECTED: 					"Verbonden",
			CONNECTING: 				"Verbinden",
			DISCONNECTING: 				"Verbreken",
			DISCONNECTED: 				"Niet verbonden",

			PASSWORD_HINT: 				"Wachtwoord",
			FILEBUTTONTEXT: 			"Bladeren",
			FILEBLANKTEXT: 				"Selecteer een bestand.",
			NOSELECTEDTEXT: 			"Selecteer opties.",

			ADD_A_NEW_KEYWORD: 			"Nieuw trefwoord toevoegen",

			SUCCESSED: 					"Geslaagd!",
			FORM_SAVED: 				"Opgeslagen",
			FORM_FAILED: 				"Mislukt",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Opgeslagen",
			GRID_FAILED: 				"Mislukt",
			GRID_NONE_SELECT: 			"Selecteer ten minste één item.",
			GRID_DELETE_COMFIRM: 		"Weet u zeker dat u deze items wilt verwijderen?",
			GRID_DELETE_ALL_COMFIRM: 	"Weet u zeker dat u alle items wilt verwijderen?",
			GRID_MAX_RULES: 			"Maximum aantal items overschreden.",
			KEYWORD_MAX_OVERFLOW: 		"Het aantal trefwoorden heeft de limiet overschreden.",

			NOTE: 						"NB:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Ongeldig formaat.",
			BLANKTEXT: 					"Dit veld is vereist.",

			EMAIL: 						"Ongeldig e-mailadres.",
			NUMBER: 					"Ongeldig formaat.",

			NUMBER_MIN: 				"Ongeldige waarde. Voer een getal groter dan %min in.",
			NUMBER_MAX: 				"Ongeldige waarde. Voer een getal kleiner dan %max in.",

			NUMBER_MIN_MAX: 			"Ongeldige waarde. Voer een getal tussen %min en %max.in.",
			HEX: 						"Dit veld moet een hexadecimaal getal bevatten.",

			IP: 						"Ongeldig formaat.",

			IP_NO_ALL_ZERO:				"Het adres mag niet 0.0.0.0 zijn.",
			IP_NO_LOOP:					"Het adres mag geen loopback adres zijn.",
			IP_NO_D_TYPE:				"Het adres mag geen IP klasse D zijn.",
			IP_NO_E_TYPE:				"Het adres mag geen IP klasse E zijn.",
			IP_NO_ALL_ONE:				"Het adres mag niet 255.255.255.255 zijn.",
			IP_NO_FIRST_ALL_ONE:		"Het adres mag niet met 255 beginnen.",
			IP_NO_FIRST_ZERO:			"Het adres mag niet met 0 beginnen.",
			MASK_NO_ALL_ONE:			"Het masker mag niet 255.255.255.255 zijn.",

			IPV6: 						"Ongeldig formaat.",
			IPV6_NOT_GLOBAL:			"Ongeldig formaat.",
			IPV6_NOT_PREFIX:			"Ongeldig formaat.",
			IP_DOMAIN: 					"Ongeldig formaat.",
			IPV6_DOMAIN: 				"Ongeldig formaat.",
			PPTP_INVALID_IP:			"Onjuist IP adres",
			MAC: 						"Ongeldig formaat.",
			MULTI_MAC:					"Ongeldig formaat.",
			MAC_INVALID_BROADCAST:		"MAC moet geen broadcast adres zijn.",
			MAC_INVALID_MULTICAST:		"MAC moet geen multicast adres zijn.",
			DATE: 						"Ongeldig formaat.",
			DATE_INVALID: 				"Voer een datum tussen 01/01/1970 en 31/12/2030 in.",
			MASK: 						"Ongeldig formaat.",
			DOMAIN: 					"Ongeldig formaat.",
			STRING_DOMAIN:              "Ongeldig formaat.",
			USER: 						"Ongeldig formaat.",
			NOTE: 						"Ongeldig formaat.",
			PWD: 						"Ongeldig formaat.",
			SSID: 						"Ongeldig formaat.",
			NAME:						"Ongeldig formaat.",
			ASCII_VISIBLE:				"Ongeldig formaat.",
			STRING_VISIBLE:				"Ongeldig formaat.",
			STRING_VISIBLE_NO_COMMA:    "Ongeldig formaat.",
			STRING_VISIBLE_ALLOW_BLANK: "Ongeldig formaat.",
			VPN_NAME_PWD: 				"Invoer 1-15 alfa karakters, nummers, -en _."
		},


		ERROR: {			
			"00000001":					"Ongeldig bestandstype.",
			"00000002":					"Checksum fout.",
			"00000003":					"Het bestand is te groot.",
			"00000004":					"Upload fout.",
			"00000005":					"Herstart fout.",
			"00000006":					"Onbekende fout.",
			"00000007":					"Het item is al aanwezig. Voer een ander item in.",

			"00000009":					"Ongeldige poort.",
			"00000010":					"De poort moet een getal zijn.",

			"00000011":					"Gebruikersnaam moet hetzelfde zijn als Van waarde.",
			"00000012": 				"De gebruikersnaam moet met een letter beginnen.",

			"00000021":					"Ongeldig formaat.",

			"00000032": 				"Waarde moet minder dan Laag zijn.",
			"00000033": 				"Waarde moet minder dan Middel en Laag zijn.",
			"00000034": 				"Ongeldige waarde; voer een getal tussen 5 en 7200 in.",

			"00000039": 				"Gebruik de standaardwaarde 0, of voer een waarde tussen 30 en 86400 in.",
			"00000040": 				"SSID en MAC-adres zijn vereist.",

			"00000042": 				"Gebruik de standaardwaarde 80, of voer een waarde tussen 1024 en 65535 in.",

			"00000045": 				"Standaard gateway en LAN IP-adres moeten zich in hetzelfde subnet bevinden. A.u.b. opnieuw invoeren.",

			"00000046": 				"IP adres en MAC adres kan geen nul zijn. gelieve opnieuw in te voeren",
			"00000047": 				"IP-adres en LAN IP-adres moeten zich in hetzelfde subnet bevinden. A.u.b. opnieuw invoeren.",

			
			"00000049":					"Bestemming netwerk is ongeldig.",

			"00000050": 				"IP-adres van DNS server onjuist. Voer een ander IP-adres in.",
			"00000051": 				"Dit MAC-adres is al aanwezig. Voer een ander adres in.",
			"00000052": 				"Dit IP-adres is al aanwezig. Voer een ander adres in.",

			"00000053": 				"Het beginadres mag niet groter dan het eindadres zijn. <br/>A.u.b. opnieuw invoeren.",

			"00000054": 				"IP-adrespool en LAN IP-adres moeten zich in hetzelfde subnet bevinden. A.u.b. opnieuw invoeren.",

			"00000055": 				"IP mag niet hetzelfde als het LAN-adres zijn.",

			"00000056": 				"Het externe IP-adres en het huidige LAN IP-adres mogen zich niet in hetzelfde subnet bevinden. Voer een ander adres in.",

			"00000057": 				"Ongeldig PSK wachtwoord, a.u.b. opnieuw invoeren.",
			"00000058": 				"Ongeldig WEP wachtwoord, a.u.b. opnieuw invoeren.",

			"00000059": 				"Ongeldig IP adres en Subnet Mask, gelieve een geldige invoeren.",

			"00000060": 				"WAN IP-adres en LAN IP-adres mogen niet in hetzelfde subnet zijn. Voer een andere waarde in.",

			"00000061": 				"De begintijd moet eerder dan de eindtijd zijn.",

			"00000062": 				"Dit veld is vereist.",
			"00000063": 				"Dit veld is vereist.",

			"00000064": 				"Het host MAC-adres kan niet worden geblokkeerd.",
			"00000065": 				"Dit item conflicteert met bestaande items, a.u.b. controleren.",
			
			"00000066": 				"Het wachtwoord moet uit 8 t/m 63 tekens of 64 hexadecimale tekens bestaan.",
			"00000067": 				"Het wachtwoord moet uit 10 hexadecimale tekens bestaan.",
			"00000068": 				"Het wachtwoord moet uit 5 ASCII tekens bestaan.",
			"00000069": 				"Het wachtwoord moet uit 26 hexadecimale tekens bestaan.",
			"00000070": 				"Het wachtwoord moet uit 13 ASCII tekens bestaan.",
			"00000071": 				"Het wachtwoord moet uit 32 hexadecimale tekens bestaan.",
			"00000072": 				"Het wachtwoord moet uit 16 ASCII tekens bestaan.",
			"00000073": 				"Het wachtwoord moet minder dan 64 tekens lang zijn.",

			"00000074": 				"Ongeldig bestandstype.",

			"00000075": 				"De pincode moet 8 cijfers zijn.",

			"00000076": 				"De invoer conflicteert met bestaande items, controleer trigger poort en trigger protocol.",
			"00000077": 				"IP-adres mag niet hetzelfde zijn als het LAN IP-adres.",
			"00000078": 				"Host IP-adres mag niet hetzelfde zijn als het LAN IP-adres.",

			"00000080": 				"Wachtwoorden zijn niet identiek. Probeer het opnieuw.",

			"00000083": 				"Gateway kan niet hetzelfde zijn als IP.",
			"00000084": 				"Primair DNS kan niet hetzelfde zijn als IP.",
			"00000085": 				"Secundair DNS kan niet hetzelfde zijn als IP.",
			"00000086": 				"Primair DNS kan niet hetzelfde zijn als secundair DNS.",

			"00000088": 				"Deze bewerking is niet toegestaan voor beheer op afstand.",
			"00000089": 				"U hebt meer dan %num pogingen gehad,probeer het over twee uur nog eens.",

			"00000090": 				"De bestemming mag niet het LAN IP-adres zijn.",
			"00000091": 				"De bestemming mag niet het WAN IP-adres zijn.",

			"00000092": 				"Het IP-adres en het LAN IP-adres mogen niet in hetzelfde subnet zijn.<br/>Voer een andere waarde in.",
			"00000093": 				"Het IP-adres en het WAN IP-adres mogen niet in hetzelfde subnet zijn.<br/>Voer een andere waarde in.",

			"00000094": 				"De Vlan ID's mogen niet hetzelfde zijn.",
			"00000095": 				"Ten minste één ethernet aansluiting is vereist.",

			"00000096": 				"Het sleutelwoord is al aanwezig.",

			"00000097": 				"Configuraties uitgevoerd op de 2,4 GHz frequentieband worden pas van kracht nadat de Wi-Fi toets ingeschakeld is.",
			"00000098": 				"Configuraties uitgevoerd op de 5 GHz frequentieband worden pas van kracht nadat de Wi-Fi toets ingeschakeld is.",
			"00000099": 				"Configuraties uitgevoerd op de 2,4 GHz en 5 GHz frequentiebanden worden pas van kracht nadat de Wi-Fi toets ingeschakeld is.",

			"00000100": 				"De 5 GHz netwerk configuratie is niet beschikbaar vanwege de beperkingen in uw regio/land.",
			"00002100": 				"Het 60GHz netwerk is niet beschikbaar als gevolg van beperkingen in uw regio/land.",

			"00000101": 				"De draadloos functie is uitgeschakeld. Als u deze functie wilt gebruiken, moet u de Wi-Fi toets inschakelen.",
			"00000102": 				"De draadloos functie is uitgeschakeld. Als u deze functie wilt gebruiken, moet u de Wi-Fi toets inschakelen.",
			"00002102": 				"De draadloos functie is uitgeschakeld. Als u deze functie wilt gebruiken, moet u de Wi-Fi toets inschakelen.",

			"00000103": 				"De draadloos functie is uitgeschakeld. Als u deze functie wilt gebruiken, moet u de Wi-Fi toets inschakelen.",
			"00000104": 				"De draadloos functie is uitgeschakeld.",

			"00000105": 				"QoS en IPTV kunnen niet tegelijkertijd ingeschakeld zijn.",

			"00000106": 				"IP-adres mag niet hetzelfde zijn als het LAN IP-adres.",
			
			"00000107": 				"De bestemming is al aanwezig.",

			"00000110": 				"Het IP-adres en het LAN IP-adres mogen zich niet in hetzelfde subnet bevinden.",
			
			"00000111": 				"QoS en <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> kunnen niet tegelijkertijd ingeschakeld zijn.",
			"00000112": 				"De WDS functie kan op de 2,4 GHz of 5 GHz band werken. Tevens is het Gasten netwerk niet beschikbaar op de WDS band.",
			"00000113": 				"WDS en Gasten netwerk kunnen niet tegelijkertijd ingeschakeld zijn.",
			"00000114": 				"Verkeersstatistieken en <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> kunnen niet tegelijkertijd ingeschakeld zijn.",

			"00000117": 				"De domeinnaam is al aanwezig.",
			"00000118": 				"Het aantal domeinnamen heeft de limiet overschreden.",
			"00000119":					"NAT Boost wordt uitgeschakeld wanneer ofwel <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> of <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Verkeersstatistieken</a> ingeschakeld wordt.",

			"00000120": 				"Het wachtwoord moet uit 5 of 13 ASCII-tekens bestaan.",
			"00000121": 				"Het wachtwoorde moet uit 10 of 26 hexadecimale tekens bestaan.",
			"00000122": 				"Gebruikersnaam en wachtwoord is leeg, weet u zeker dat u verder wilt?",
			"00000123": 				"Opslaan… A.u.b. niet bedienen tijdens dit proces.",
			"00000124": 				"De PIN van de router is geblokkeerd vanwege herhaaldelijk verbinden m.b.v. onjuiste PIN. Maak een nieuwe aan.",

			"00000125": 				"Het aantal QoS regels heeft de limiet overschreden.",
			"00000126": 				"De bestandsgrootte heeft de limiet overschreden.",
			"00000127": 				"De inhoud van het bestand is onjuist.",
			"00000128": 				"Selecteer ten minste één applicatie.",
			"00000129": 				"Selecteer ten minste één fysieke poort.",
			"00000130":					"Uw WPS functie is uitgeschakeld.",
			"00000131": 				"NTP Server mag geen loopback adres hebben.",
			"00000132": 				"Modus wisselen mislukt. Probeer het later opnieuw, of start de router opnieuw op.",
			"00000133": 				"Ongeldig DMZ Host IP-adres. Voer een geldig adres in.",
			"00000134":  				"Ongeldig Intern IP. Voer een geldig adres in.",
			"00000135": 				"Firmware bestand fout.",
			"00000136": 				"Backup bestand fout.",
			"00000137": 				"Ongeldig IP adres en Subnet Mask, gelieve een geldige invoeren.",
			"00000139": 				"Onjuiste parameters voor wachtwoord opvragen.",
			"00000140": 				"Onjuiste code.",
			"00000141": 				"Wachtwoord opvragen is uitgeschakeld.",
			"00000142": 				"De code is niet verzonden. Controleer uw Internet verbinding.",
			"00000143": 				"Ongeldige e-mailadressen.",
			"00000144": 				"Ongeldig e-mailbericht.",
			"00000145": 				"Kon de host niet vinden.",
			"00000146": 				"Verificatie mislukt.",
			"00000147": 				"De poort moet tussen 1 en 65535 zijn.",
			"00000148": 				"Voor een poortbereik, moet het nummer van de start poort lager zijn dan het eind poort nummer. Voer opnieuw in alstublieft.",
			"00000149": 				"Poort nummer overlapt. Voer opnieuw in alstublieft.",
			
			"00000150": 				"Pad bestaat niet.",
			"00000151": 				"Toegewezen pad niet ingesteld.",
			"00000152": 				"Sommige problemen met dit pad.",
			"00000153": 				"Volume niet gevonden.",
			"00000154": 				"Geen USB apparaat.",
			
			"00000155": 				"PPTP VPN cliënt IP adres en LAN IP adres kunnen zich niet in hetzelfde subnet bevinden <br/>  Voer opnieuw in alstublieft.",
			"00000156": 				"PPTP VPN cliënt IP adres en OpenVPN client IP adres kunnen zich niet in hetzelfde subnet bevinden. <br/>  Voer opnieuw in alstublieft.",
			
			"00000213":					"DNS server IP-adres en LAN IP-adres kunnen zich niet in hetzelfde subnet bevinden. <br/>Gelieve een andere invoeren.",

			"00000222":  				"Maximum invoer.",
			"00000231": 				"Gedupliceerde invoer.",
			"00000232": 				"Ongeldige URL",
			"00000233":					"Selecteert u minstens 1 dag.",

			"00000301": 				"Maximaal folder delen toegang.",
			"00000302": 				"Maximaal folder delen toegang tot volume.",
			"00000303": 				"Gedupliceerd gedeelde folder pad.",
			"00000304": 				"Gedupliceerd gedeelde folder naam.",

			"00001000":					"Upgrade operatie is bezig, eventjes geduld alstublieft.",
			"00001001": 				"De WDS functie kan werken met zowel de 2,4GHz als de 5GHz verbinding.",
			"00001002":					"Onjuiste code.",

			"00001123": 				"De ingevoerde applicatie regel item is nul, voert u minstens 1 regel item in.",
			"00001124": 				"De ingevoerde poort regel item is nul, kiest u alstublieft minstens 1 regel item.",

            "00002000": 				"Dit item is in conflict met de ISP- specifieke statische routering, weet u zeker dat u verder wilt?",

            "00003000":                 "Ipv6 Pass-Through is in conflict met IPTV. Als u deze functie wilt gebruiken, schakelt u dan alstublieft de IPTV Instellingen uit.",
			"00004139": 				"Geen Internet Verbinding",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Time-Out. Controleer uw Internet verbinding en probeer later opnieuw.",
			"00004141": 				"Onbekende fout.",
			"00004142": 				"Onjuiste verificatie code.",
			"00004143": 				"Onjuist wachtwoord",
			"00004144": 				"Gebruikersnaam bestaat al.",
			"00004145": 				"Onjuist wachtwoord",//new password
			"00004146": 				"Niet in staat om dit apparaat te ontbinden. Probeer het later opnieuw.",
			"00004147": 				"Dit apparaat is gekoppeld aan een ander account.",
			"00004148": 				"Ongeldige invoer.",
			"00004149": 				"Dit domeinnaam bestaat al.",
			"00004150": 				"Niet mogelijk om de firmware te downloaden. Controleer uw internet verbinding en probeer later opnieuw.",
			"00004151": 				"Niet meer dan 1000 domein namen kunnen registreerd worden door hetzelfde cloud account.",
			"00004152": 				"Dit apparaat is gekoppeld aan een ander domein naam.",
			"00004153": 				"Deze domein naam is gekoppeld aan een ander apparaat.",
			"00004154": 				"Geen reactie van de server. Probeer het later opnieuw.",
			"00004155": 				"Account bestaat niet.",
			"00004156": 				"Niet mogelijk om de cloud applicatie te starten. Herstart dit apparaat en probeer later opnieuw.",
			"00004157": 				"Niet mogelijk om te verbinden met de cloud server. Controleer uw Internet verbinding en probeer later opnieuw.",
			"00004158": 				"De WAN poort is niet aangesloten.",
			"00004159": 				"Niet mogelijk om te verbinden met het Internet. Neem contact op met uw service provider of probeer later opnieuw.",
			"00004160": 				"Niet mogelijk om een IP adres van de DHCP server te verkrijgen. Controleer de WAN connectie type of probeer later opnieuw.",
			"00004161": 				"PPPoE authenticatie mislukt. Controleer uw gebruikersnaam en wachtwoord.",
			"00004162": 				"Niet mogelijk om te verbinden met de PPPoE server.",
			"00004164": 				"PPTP authenticatie mislukt. Controleer uw gebruikersnaam en wachtwoord.",
			"00004165": 				"Niet mogelijk om te verbinden met de PPTP server.",
			"00004167": 				"L2TP authenticatie mislukt. Controleer uw gebruikersnaam en wachtwoord.",
			"00004168": 				"Niet mogelijk om te verbinden met de L2TP server.",
			"00004169": 				"Onbekende fout. Probeer later opnieuw.",
			"00004170": 				"De WAN poort is niet aangesloten.",
			"00004171": 				"Geen Internet Verbinding",
			"00004172": 				"Verbinden mislukt.",
			"00004173": 				"Gebruikersnaam of wachtwoord onjuist",
			"00004174": 				"Ongeldig e-mailadres.",
			"00004175": 				"Ongeldig gebruikersnaam formaat.",
			"00004176": 				"Email bestaat al.",
			"00004177": 				"Niet mogelijk om toegang te krijgen tot account informatie. Refresh de pagina.",
			"00004178":   				"Systeem fout. Refresh de pagina en probeer opnieuw.",
			"00004179":   				"Niet mogelijk om dit apparaat te binden. Probeer later opnieuw.",
			"00004180":   				"Dit apparaat is ontbonden van dit Cloud Account. Log in met uw account in het apparaat aan uw account te binden. ",
			"00004181":   				"Het apparaat is offline. Controleer uw internet instellingen.",
			"00004182":   				"Niet gelukt om email te verzenden. Controleer uw internet verbinding en probeer opnieuw.",
			"00004183":   				"Account dient overeen te komen met karakters.",
			"00004184":   				"U heeft het wachtwoord 20 keer fout ingevoerd. Probeert u het na 2 uur nogmaals.",
			"00004185":   				"U heeft de verificatie code reeds 10 keer ontvangen binnen 1 uur. Probeert u het na 24 uur opnieuw.",
			"00004186":   				"Excuus, niet mogelijk om uw account te activeren. Stuur nogmaals de verificatie email.",
			"00004187":   				"Excuus, de link is verouderd. Stuur nogmaals de verificatie email.",
			"00004188":   				"Excuus, de link is verouderd. Stuur nogmaals de email.",
			"00004189":   				"Excuus, niet gelukt om uw wachtwoord te resetten. Stuur nogmaals de email.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Firmware upgrade fout.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Status",
			NETWORK: 					"Netwerk",
			NETWORK_MAP: 				"Netwerk overzicht",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP server",
			DYNAMIC_DNS: 				"Dynamisch DNS",
			ADVANCED_ROUTING: 			"Geavanceerde routering",

			WIRELESS: 					"Draadloos",
			WIRELESS_SETTINGS: 			"Draadloze instellingen",
			WDSBRIDGING: 				"WDS Bridging",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC Filtering",
			WIRE_STATISTICS: 			"Statistieken",
			
			
			GUEST_NETWORK: 				"Gastnetwerk",
			WIRELESS_SETTINGS: 			"Draadloze instellingen",
			STORAGE_SHARING: 			"Opslag delen",
			NAT_FORWARDING: 			"NAT Forwarding",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Virtuele servers",
			PORT_TRIGGERING: 			"Port Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB-instellingen",
			BASIC_SET: 					"Basis instellingen",
			DISK_SET: 					"Apparaatinstellingen",
			FOLDER_SHARING: 			"Toegang delen",
			STORAGE_SHARING: 			"Opslag delen",
			FTP_SERVER: 				"FTP Server",
			MEDIA_SERVER: 				"Media Server",
			PRINT_SERVER: 				"Print Server",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Offline download",
			
			PARENTAL_CONTROL: 			"Ouderlijk toezicht",

			QOS:  						"QoS",
			DATABASE:  					"Database",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Map",
			SB_MAP: 					"Map",
			SB_BANDWIDTH:  				"Bandbreedte",
			SB_PRIORITY: 				"Prioriteit",
			SB_STATISTICS: 				"Statistieken",

			
			SECURITY: 					"Beveiliging",
			SETTINGS: 					"Instellingen",
			ACCESS_CONTROL: 			"Toegangscontrole",
			IP_MAC_BINDING: 			"IP&MAC Binding",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Systeemfuncties",
			TIME_SETTINGS: 				"Tijd instellingen",
			DIAGNOSTIC: 				"Diagnose",
			FIRMWARE_UPGRADE: 			"Firmware upgrade",
			BACKUP_RESTORE: 			"Backup en herstel",
			ADMINISTRATION: 			"Beheer",
			SYSTEM_LOG: 				"Systeemlog",
			STATISTICS: 				"Verkeersstatistieken",
			SYSTEM_PARAMETERS: 			"Systeem parameters",
			VPN: 						"VPN Server",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN verbindingen"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Regio en tijdzone",
			INTERNET_CONNECTION_TYPE: 	"Type Internetverbinding",
			WIRELESS_SETTINGS: 			"Draadloze instellingen",
			SUMMARY: 					"Samenvatting",
			SETUP_COMPLETE: 			"Internet verbinding testen",

			EXIT: 						"Afsluiten",
			NEXT: 						"Volgende",
			SAVE: 						"Opslaan",
			FINISH: 					"Voltooien",
			OK: 						"OK",
			NONE: 						"Detectie mislukt.",

			REGION: 					"Regio",
			TIME_ZONE: 					"Tijdzone",
			NO_SELECT: 					"Selecteer opties.",

			AUTO_DETECT: 				"Auto-detecteren",
			DYNAMIC_IP: 				"Dynamisch IP",
			STATIC_IP: 					"Statisch IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Als u niet zeker weet welke type Internetverbinding u heeft, maak dan gebruik van de Auto-detectie functie of neem contact op met uw ISP voor verdure hulp.",

			DYNAMIC_IP_INFO: 			"Als uw Internetprovider alleen toegang verleend aan een specifiek MAC adres, dan zult u het MAC adres van uw primaire computer moeten klonen. Als u hier niet zeker van bent, selecteer: <strong>Do NOT clone MAC Address</strong>.",
			MAC_CLONE_NO: 				"NIET het MAC-adres klonen",
			MAC_CLONE_YES: 				"MAC-adres van huidige computer klonen",
			MAC_CLONE_NOTE: 			"Als u MAC-adres klonen selecteert, moet u controleren of het MAC-adres van deze computer bij uw ISP is geregistreerd voordat u op Volgende klikt.",

			PPPOE_INFO: 				"Voer uw PPPoE gebruikersnaam en wachtwoord in.",
			
			STATIC_IP_INFO: 			"Voer uw IP-gegevens in.",

			L2TP_INFO: 					"Voer uw L2TP gebruikersnaam en wachtwoord in.",
			PPTP_INFO: 					"Voer uw PPTP gebruikersnaam en wachtwoord in.",
			
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			SERVER_IP_ADDRESS_NAME: 	"VPN Server IP/Domeinnaam",
			IP_ADDRESS: 				"IP-adres",
			SUBNET_MASK: 				"Subnetmasker",
			DEFAULT_GATEWAY: 			"Standaard gateway",
			PRIMARY_DNS: 				"Primaire DNS",
			SECOND_DNS: 				"Secundaire DNS",
			OPTIONAL: 					"(Optioneel)",
			
			ON: 						"Aan",
			OFF: 						"Uit",
			WIRELESS_24GHZ: 			"Draadloos 2,4 GHz",
			WIRELESS_5GHZ: 				"Draadloos 5 GHz",
			WIRELESS_60GHZ: 				"60GHz draadloos",
			ENABLE_WIRELESS_RADIO: 		"Draadloze radio inschakelen",
			NAME_SSID: 					"Naam draadloos netwerk (SSID)",

			SUMMARY_INFO1: 				"Uw draadloze apparaten moeten opnieuw met het nieuwe draadloze netwerk verbinding hebben gemaakt voordat u de op de knop <strong>Volgende</strong> klikt.",
			SUMMARY_INFO2: 				"Uw draadloze netwerk naam en wachtwoord zijn gewijzigd zoals hieronder getoond",
			SUMMARY_INFO3: 				"Controleer of u met het nieuwe draadloze netwerk verbonden bent.",

			WIRELESS_24GHZ_SSID: 		"Draadloos 2,4 GHz naam (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Draadloos 2,4 GHz wachtwoord",
			WIRELESS_5GHZ_SSID: 		"Draadloos 5 GHz naam (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Draadloos 5 GHz wachtwoord",
			WIRELESS_60GHZ_SSID: 		"Draadloos 60GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"Draadloos 60GHz Wachtwoord",

			SORRY: 						"Mislukt.",
			SUCCESS: 					"Geslaagd!",
			TEST_INTERNET_SUCCESS_INFO: "Geslaagd! Klik op Voltooien om snelle instellingen te voltooien.",

			TEST_INTERNET_FAILED_INFO_0:"Controleer of alle parameters van Snelle instelling correct zijn en probeer het opnieuw. Als alle parameters van Snelle instelling correct zijn, start u het modem opnieuw, wacht u 2 minuten en klikt u nogmaals op Internet verbinding testen. Als u geen modem gebruikt, moet u mogelijk met uw Internet Service Provider (ISP) contact opnemen voor hulp.",
			SUMMARY_INFO4: 				"Sorry! Wij detecteren dat u uw draadloze apparaat nog niet opnieuw met het nieuwe draadloze netwerk verbonden hebt. Doe dit a.u.b. en klik daarna op <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Gefeliciteerd!",
			COMPLETE_INFO_0: 			"U heeft de Snelle Installatie voltooid.",
			COMPLETE_INFO_1:			"Klik op Internet verbinding testen hieronder en daarna op Voltooien.",
			TEST_INTERNET: 				"Internet verbinding testen",

			
			RESET_USER_TITLE: 			"Nieuwe gebruikersnaam en wachtwoord instellen",
			NEW_USERNAME: 				"Nieuwe gebruikersnaam",
			NEW_PASSWORD: 				"Nieuw wachtwoord",
			CONFIRM_PASSWORD: 			"Nieuw wachtwoord bevestigen",
			CONFIRM: 					"Bevestigen"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Internet status",

			GHZ24: 						"2,4 GHz",
			GHZ5: 						"5 GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Type verbinding",
			SECONDARY_CONN: 			"Secundaire verbinding",

			POOR_CONNECTED: 			"Slechte verbinding",
			UNPLUGGED: 					"Er is niets op de WAN-aansluiting aangesloten.",
			
			CONNECTED: 					"Verbonden",
			DISCONNECTED: 				"Verbroken",
			CONNECTING: 				"Verbinden",

			INTERNET_IP_ADDR: 			"IP-adres",
			
			IP_ADDR: 					"IP-adres",
			MAC_ADDR: 					"MAC-adres",
			GATEWAY: 					"Gateway",

			AUTO: 						"Auto",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"Draadloze clients",
			HOST_CLIENTS: 				"Host clients",
			GUEST_CLIENTS: 				"Gast clients",
			WIRE_CLIENTS: 				"Bekabelde clients",
			PRINTER: 					"Printer",
			USB_DISK: 					"USB-schijf",
			WIRELESS: 					"Draadloos",
			NAME: 						"Naam",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanaal",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Draadloos 2,4 GHz",
			WIRELESS_5GHZ: 				"Draadloos 5 GHz",
			WIRELESS_60GHZ:				"60GHz draadloos",
			
			GUEST_24GHZ: 				"Gasten netwerk 2,4 GHz",
			GUEST_5GHZ: 				"Gasten netwerk 5 GHz",
			
			STATUS: 					"Status",
			TOTAL: 						"Totaal",
			AVAILABLE: 					"Beschikbaar",
			GB: 						"GB",
			BRAND: 						"Merk",

			DYNAMIC_IP: 				"Dynamisch IP",
			STATIC_IP: 					"Statisch IP",
			SUBNET_MASK: 				"Subnetmasker",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 Tunnel",
			NONE: 						"Geen"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Auto-detecteren",
			INTERNET_CONN_TYPE: 		"Type Internetverbinding",
			DYNAMIC_IP: 				"Dynamisch IP",
			STATIC_IP: 					"Statisch IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Afgekoppeld",
			NONE: 						"Geen",
			DETECT_FAIL: 				"Auto-detecteren mislukt",
			SECONDARY_CONN: 			"Secundaire verbinding",

			DYNAMIC_YES: 				"NIET het MAC-adres klonen",
			DYNAMIC_NO: 				"MAC-adres van huidige computer klonen",
			
			IP_ADDR: 					"IP-adres",
			SUBNET_MASK: 				"Subnetmasker",
			DEFAULT_GATEWAY: 			"Standaard gateway",
			PRIMARY_DNS: 				"Primaire DNS",
			SECOND_DNS: 				"Secundaire DNS",
			OPTIONAL: 					"(Optioneel)",
			USER_NAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			SERVER_IP_ADDR_NAME: 		"VPN server IP/Domeinnaam",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Als u niet zeker weet welk type Internetverbinding u heeft, gebruikt u de functie Auto-detecteren, of neemt u contact op met uw Internet Service Provider (ISP) voor hulp."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Draadloze instellingen",
			MODE_2G: 					"Draadloos 2,4 GHz",
			MODE_5G: 					"Draadloos 5 GHz",
			MODE_60G: 					"60GHz draadloos",
			WIRELESS_NETWORK_NAME: 		"Naam draadloos netwerk (SSID)",
			WIRELESS_PASSWORD: 			"Wachtwoord",
			ENABLE_WIRELESS: 			"Draadloze radio inschakelen",
			SAVE: 						"Opslaan",
			ENCRYPTION_2G_NOTICE:		"2,4 G versleuteling is %s.",
			ENCRYPTION_5G_NOTICE:		"5 G versleuteling is %s.",
			ENCRYPTION_60G_NOTICE:		"60GHz encryptie is %s",
			ENCRYPTION_2G_NO: 			"2,4 GHz draadloos netwerk is niet versleuteld.",
			ENCRYPTION_5G_NO: 			"5 GHz draadloos netwerk is niet versleuteld.",
			ENCRYPTION_60G_NO: 			"60GHz draadloze netwerk is niet gecodeerd.",
			ENCRYPTION_NO: 				"Onbeveiligde draadoze netwerken hebben verborgen gevaren.",
			ENCRYPTION_SURE: 			"Weet u zeker dat u wilt doorgaan?",
			HIDE_SSID: 					"SSID verbergen"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Basis instellingen",
			TITIL_NEW:					"Schijf en account",
			DISK_SET:					"Apparaatinstellingen",

			SELFLY_REMOVE:				"Veilig verwijderen",
			SCANING:					"Scannen…",
			SCAN_RESULT:				"Schijf %n  gevonden",
			
			DISKS:						"Schijven",
			USERS: 						"Gebruikersaccount",
			DEVICENAME: 				"Naam apparaat",
			VOLUMN: 					"Volume",

			USBSPACE: 					"Gebruikte ruimte",
			FREESPACE: 					"Vrije ruimte",
			STATUS: 					"Status",
			INACT: 						"Deactiveren",
			USAGE: 						"Gebruik",
			CAPACITY: 					"Capaciteit",
			OPERATION: 					"Werking",
			
			ACC: 						"Accountbeheer", 	 	
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			USE_LOGIN: 					"Gebruik login van gebruiker",
			SCAN: 						"Scannen",
			ENJECT_ALL: 				"Alle uitwerpen",
			ENJECT: 					"Uitwerpen",
			ADD_USER: 					"Gebruiker toevoegen",
			AUTH: 						"Autoriteit",


			LOCATION: 					"Locatie",
			MOBILE_ISP: 				"Mobiel ISP",
			DIAL_NUMBER: 				"Kies nummer",
			APN: 						"APN",
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			MTU_SIZE: 					"MTU grootte (in bytes)",
			OPTIONAL: 					"(Optioneel)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Ouderlijk toezicht",
			UNKNOWN: 					"Onbekend",
			
			DEVICE_CTR: 				"Apparaten onder ouderlijk toezicht",
			ID: 						"ID",
			DEVICE: 					"Naam apparaat",
			MAC_ADDRESS: 				"MAC-adres",
			TIME: 						"Internet toegangstijd",
			DESCRIPTION: 				"Beschrijving",
			ENABLE: 					"Inschakelen",
			ENABLE_THIS_ENTRY: 			"Dit item inschakelen",
			OPTIONAL: 					"(Optioneel)",
			BTN_VIEW: 					"Aanwezige apparaten bekijken",
			
			DEVICE_LIST: 				"Apparatenlijst",
			SYSTEM_TIME: 				"Systeemtijd",
			
			RESTR: 						"Inhoud beperken",
			MODE: 						"Beperking",
			BLACKMODE: 					"Zwarte lijst",
			WHITEMODE: 					"Witte lijst",
			ACCESS_DEVICES_LIST: 		"Apparatenlijst openen",
			
			CHOOSE: 					"Kiezen",
			ADD_A_NEW_KEYWORD: 			"Voeg een nieuw trefwoord in om te blokkkeren.",
			ADD_A_NEW_DOMAIN_NAME: 		"Voeg een nieuw domeinnaam in om toegang te verkrijgen.",
			
			OPT: 						"Werking",
			STATUS: 					"Ouderlijk toezicht",
			YOURPC:						"Uw PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Gasten netwerk",
			MODE_2G: 					"Draadloos 2,4 GHz",
			MODE_5G: 					"Draadloos 5 GHz",
			WIRELESS_NETWORK_NAME: 		"Naam draadloos netwerk (SSID)",
			WIRELESS_PASSWORD: 			"Wachtwoord",
			DYNAMIC_PASSWORD: 			"Wachtwoord",
			ENABLE_WIRELESS: 			"Gastnetwerk inschakelen",
			SAVE:						"Opslaan",
			HIDE_SSID: 					"SSID verbergen",
			PASSWORD_CHANGE_CYCLE: 		"Interval wachtwoord vernieuwen",
			PER_DAY: 					"Dagelijks",
			PER_WEEK: 					"Wekelijks",
			PER_MONTH: 					"Maandelijks",
			NEVER: 						"Nooit",
			UNENCRYPTED:				"Gasten netwerk is niet versleuteld. U kunt een wachtwoord instellen via het menu Geavanceerd."
		},

		STATUS: {
			TITLE: 						"Status",
			INTERNET:					"Internet",
			WIRELESS:					"Draadloos",
			LAN:						"LAN",
			USB_TITLE:					"USB-apparaten",
			PERFORMANCE: 				"Prestaties",
			GUEST_NETWORK: 				"Gastnetwerk",
			ACCESS_DEVICES: 			"Toegang apparaten",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4 GHz",
			HZ5G: 						"5 GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Type verbinding",

			MAC_ADDRESS: 				"MAC-adres",
			IP_ADDRESS: 				"IP-adres",
			RELEASE: 					"Vrijgeven",
			RENEW: 						"Vernieuwen",
			
			DYNAMIC_IP: 				"Dynamisch IP",
			STATIC_IP: 					"Statisch IP",
			SUBNET_MASK: 				"Subnetmasker",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 Tunnel",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass-Through (Bridge)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Geen",
			
			DEFAULT_GATEWAY: 			"Standaard gateway",
			DNS: 						"DNS Server",
			MAC: 						"MAC-adres",
			WDS_STATUS: 				"WDS status",
			
			IPV6_ADDRESS: 				"IP-adres",
			PRIMARY_DNS: 				"Primaire DNS",
			SECOND_DNS: 				"Secundaire DNS",

			RADIO: 						"Draadloze radio",

			NAME_SSID: 					"Naam (SSID)",
			NETWORK_NAME_SSID:			"Naam netwerk (SSID)",
			HIDE_SSID: 					"SSID verbergen",
			MODE: 						"Modus",
			CHANNEL: 					"Kanaal",
			CHANNEL_WIDTH: 				"Kanaal breedte",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Huidige kanaal",

			WDS: 						"WDS status",
			WIRED_CLIENTS: 				"Bekabelde clients",
			WIRELESS_CLIENTS: 			"Draadloze clients",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Link-local adres",
			ASSIGN_TYPE: 				"Toegewezen type",
			
			ALLOW_TO_SEE_EACH: 			"Gasten mogen elkaar zien",

			TOTAL: 						"Totaal",
			AVAILABLE: 					"Beschikbaar",

			USB: 						"USB-schijf",
			PRINTER: 					"Printer",

			CPU_LOAD: 					"CPU belasting",
			MEMORY_USAGE: 				"Geheugengebruik",

			IP_ADDR_P: 					"IP-adres",
			MAC_ADDR_P: 				"MAC-adres",
			CONN_TYPE_P: 				"Type verbinding",

			DISABLED: 					"Uitgeschakeld",
			INIT: 						"Init",
			SCAN: 						"Scannen",
			AUTH: 						"Ver",
			ASSOC: 						"Toew",
			RUN: 						"Start",
			HOST: 						"Host",
			GUEST: 						"Gast",

			ON: 						"Aan",
			OFF: 						"Uit"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Type Internetverbinding",
			INTERNET_MAC_ADDRESS: 		"MAC-adres",
			
			CONNECT: 					"Verbinden",
			DISCONNECT: 				"Verbreken",

			IP_ADDR: 					"IP-adres",
			
			USE_DEFAULT_MAC: 			"Standaard MAC-adres gebruiken",
			USE_COMPUTER_MAC: 			"MAC-adres van huidige computer gebruiken",
			USE_CUSTOM_MAC: 			"Aangepast MAC-adres gebruiken",
			MAC_CLONE: 					"MAC klonen",
			
			CONFIG: 					"Config",
			
			IP_ADDRESS: 				"IP-adres",
			SUBNET_MASK: 				"Subnetmasker",
			DEFAULT_GATEWAY: 			"Standaard gateway",
			
			MANUAL_DNS: 				"Handmatige DNS",
			PRIMARY_DNS: 				"Primaire DNS",
			SECOND_DNS: 				"Secundaire DNS",
			
			RENEW: 						"Vernieuwen",
			RELEASE: 					"Vrijgeven",
			VIEW_MODE: 					"Bekijk modus",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Krijg dynamisch van ISP",
			USE_FOLLOW_IP_ADDR: 		"Gebruik het volgende IP-adres",
			USE_FOLLOW_DNS_ADDR: 		"Gebruik de volgende DNS-adressen",
			USE_FOLLOW_DNS_SERVER: 		"Gebruik de volgende DNS server",
			
			BASIC: 						"Basis",
			ADVANCED: 					"Geavanceerd",
			
			DNS_ADDR_MODE: 				"DNS-adres",
			MTU_SIZE: 					"MTU grootte",
			MTU_1500: 					"bytes. (Standaard is 1500, niet wijzigen tenzij noodzakelijk.)",
			MTU_1480: 					"bytes. (Standaard is 1480, niet wijzigen tenzij noodzakelijk.)",
			MTU_1460: 					"bytes. (Standaard is 1460, niet wijzigen tenzij noodzakelijk.)",
			MTU_1420: 					"bytes. (Standaard is 1420, niet wijzigen tenzij noodzakelijk.)",
			
			HOST_NAME: 					"Host naam",

			HOST_NAME_CONFIRM: 			"De host-naam bevat ongeldige tekens, die onverwacht systeemgedrag kunnen veroorzaken. Weet u zeker dat u wilt doorgaan?",

			GET_IP_WITH_UNICAST_DHCP: 	"Verkrijg IP m.b.v. Unicast DHCP (is meestal niet nodig.)",
			OPTIONAL: 					"(Optioneel)",
			
			STATIC_IP: 					"Statisch IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6:		    "Auto",
						
			USER_NAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			
			INTERNET_IP_ADDR: 			"IP-adres",
			INTERNET_DNS: 				"Internet DNS",
			SECONDARY_CONN: 			"Secundaire verbinding",
			NONE: 						"Geen",
			INTERNET_PRIMARY_DNS:		"Primaire DNS",
			INTERNET_SECONDARY_DNS: 	"Secundaire DNS",
			
			DYNAMIC_IP: 				"Dynamisch IP",
			DYNAMIC_IP_v6: 				"Dynamisch IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Service naam",
			ACCESS_CONCENTRATOR_NAME:  	"Access Concentrator naam",
			DETECT_ONLINE_INTERVAL: 	"Online interval detecteren",
			INTERVAL_TIPS: 				"seconden. (0-120. Standaard is 10.)",
			IP_ADDR_MODE:  				"IP-adres",
			CONN_MODE: 					"Verbindingsmodus",
			DHCP_LINK_UNPLUGGED: 		"Er is niets op de WAN-aansluiting aangesloten.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"Op aanvraag",
			TIME_BASED: 				"Tijdbasis",
			MANUALLY: 					"Handmatig",
			MAX_IDLE_TIME: 				"Max. tijd inactief",
			MAX_IDLE_TIME_TIPS: 		"minuten. (0 betekent altijd actief.)",
			PERIOD_OF_TIME: 			"Periode",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond kabel",
			AUTH_SERVER: 				"Ver. Server",
			AUTH_DOMAIN: 				"Ver. Domein",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"VPN server IP/Domeinnaam",
			PPTP: 						"PPTP",
			TO: 						"naar",
			
			TUNNEL_6TO4: 				"6to4 Tunnel",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Niet-tijdelijk IPv6 adres verkrijgen",
			GET_PREFIX_DELEGATION: 		"IPv6 voorvoegsel delegatie verkrijgen",
			IPV6_ADDR: 					"IPv6 adres",

			GET_IPV6_WAY: 				"IPv6 adres verkrijgen",
			AUTOMATICALLY:              "Automatisch verkrijgen",
			SPECIFIED_BY_ISP: 			"Opgegeven door ISP",

			IPV6_ADDR_PREFIX: 			"IPv6 adres voorvoegsel",
			NONE_TEMPORARY: 			"Niet-tijdelijk",

			PREFIX_DELEGATION: 			"Voorvoegsel delegatie",
			ENABLE:                     "Inschakelen",
			DISABLE:                    "Uitschakelen",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 masker lengte",
			CONFIG_TYPE: 				"Type configuratie",
			RD6_PREFIX: 				"6RD voorvoegsel",
			RD6_PREFIX_LENGTH: 			"6RD voorvoegsel lengte",
			REPLY_IPV4_ADDR: 			"Border Reply IPv4 adres",
			MANUAL: 					"Handmatig",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass Through (Bridge)",
			LOCAL_IPV6: 				"Lokaal IPv6 adres",
			PEER_IPV6: 					"Peer IPv6 adres",
			TUNNEL_ADDR: 				"Tunnel adres",
			IPV4_NETMASK: 				"IPv4 netmasker",
			CUSTOM: 					"Aangepast",
		    AFTR_NAME: 					"AFTR naam",
			PPP_SHARE_V6:				"PPPoE zelfde sessie met IPv4 verbinding",
			PPP_SHARE_V4:				"PPPoE zelfde sessie met IPv6 verbinding",


			
			
			IPV4_ADDR: 					"IPv4 adres",
			IPV4_MASK: 					"IPv4 subnetmasker",
			IPV4_GATEWAY: 				"IPv4 standaard gateway",

			DUPLEX: 					"Duplex",
			AUTO_NEGOTIATION: 			"Auto Negotiation",
			FULL_DUPLEX_1000: 			"1000 Mbps full duplex",
			HALF_DUPLEX_1000:			"1000 Mbps half duplex",
			FULL_DUPLEX_100: 			"100 Mbps full duplex",
			HALF_DUPLEX_100: 			"100 Mbps half duplex",
			FULL_DUPLEX_10: 			"10 Mbps full duplex",
			HALF_DUPLEX_10: 			"10 Mbps half duplex"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC-adres",
			IP_ADDRESS: 				"IP-adres",
			SUBNET_MASK: 				"Subnetmasker",
			CUSTOM: 					"Aangepast",

			IGMP: 						"IGMP Proxy inschakelen",
			


			ASSIGNED_TYPE: 				"Toegewezen type",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+Stateless DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Adres voorvoegsel",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adres",
			DELEFATED: 					"Gedelegeerd",
			STATIC: 					"Statisch",
			SITE_PREFIX: 				"Site voorvoegsel",
			SITE_PREFIX_LEN: 			"Lengte site voorvoegsel",

			PREFIX_TYPE:  				"Configuratie type site voorvoegsel",
			LAN_IPV6_ADDR:  			"LAN IPv6 adres",

			RELEASE_TIME: 				"Vrijgeeftijd",
			RELEASE_TIME_TIP: 			"seconden. (Standaard is 86400, niet wijzigen tenzij noodzakelijk.)",
			ADDRESS:					"Adres",
			SAVE: 						"Opslaan",

			REBOOT_TIP: 				"De router gaat naar de nieuwe inlogpagina <br/>Even geduld…"

		},

		IPTV:{
			TITLE: 						"Instellingen",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "IPTV inschakelen", 
			MODE:  						"Modus",
			IGMP_PROXY: 				"IGMP proxy",
			IGMP_VERSION: 				"IGMP versie",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bridge",
			BASIC: 						"Aangepast",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Rusland",
			UNIFY:  					"Maleisië-Unifi",
			MAXIS:  					"Maleisië-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-telefoon", 

			Q_TAG: 						"802.1Q Tag",
			ENABLE: 					"Inschakelen",
			
			INTERNET_VLAN_ID: 			"Internet Vlan ID",
			INTERNET_VLAN_PRIORITY: 	"Internet Vlan prioriteit",
			IP_PHONE_VLAN_ID: 			"IP-telefoon Vlan ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-telefoon Vlan prioriteit",
			IPTV_VLAN_ID: 				"IPTV Vlan ID",
			IPTV_VLAN_PRIORITY: 		"IPTV Vlan prioriteit",
			IPTV_MULTI_VLAN_ID: 		"IPTV Multicast Vlan ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV Multicast Vlan prioriteit"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP server",
			
			SETTINGS: 					"Instellingen",

			DHCP_SERVER: 				"DHCP server",
			ENABLE_DHCP_SERVER: 		"DHCP server inschakelen",

			IP_ADDR_POOL: 				"IP-adres pool",
			LEASETIME: 					"Adres lease-tijd",
			LEASENOTE: 					"minuten. (2-2880. Standaard waarde is 120.)",
			
			GATEWAY: 					"Standaard gateway",
			DOMAIN: 					"Standaard domein",
			PRIMARYDNS: 				"Primaire DNS",
			SECONDARYDNS: 				"Secundaire DNS",

			OPTIONAL: 					"(Optioneel)",

			CLIENTSLIST: 				"DHCP Client Lijst",
			CLIENT_NUMBER: 				"Client nummer",
			CLIENT_NAME: 				"Naam client",
			MAC_ADDR: 					"MAC-adres",
			ASSIGNED_IP: 				"Toegewezen IP-adres",
			LEASE_TIME: 				"Lease-tijd",

			RESERVATION: 				"Adres Reservering",

			RESERVED_IP: 				"Gereserveerd IP-adres",
			IP_ADDRESS: 				"IP-adres",
			DESCRIPTION: 				"Beschrijving",

			CLIENTSLIST: 				"DHCP Client Lijst",
			CLIENT_NUMBER: 				"Client nummer",

			ENABLE: 					"Inschakelen",
			ENABLE_THIS_ENTRY: 			"Dit item inschakelen",
			BTN_VIEW:					"Aanwezige apparaten bekijken"
			
		},

		DDNS: {
			DDNS: 						"Dynamisch DNS",
			SERVICEPROVIDER: 			"Service Provider",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"NO-IP",
			
			GO_TO_REGISTER: 			"Ga naar register…",
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			DOMAIN_NAME_LIST: 			"Lijst van domeinnamen",
			DOMAIN_NAME: 				"Domeinnaam",
			LOGIN: 						"Inlogen",
			LOGIN_SAVE: 				"Inloggen en opslaan", 
			LOGOUT: 					"Uitloggen",
			STATU_SUCCESS:				"Geslaagd",
			UPDATE_INTERVAL:			"Update interval",
			ONE_HOUR:					"1 uur",
			SIX_HOUR:					"6 uur",
			TWETEEN_HOUR:				"12 uur",
			ONE_DAY:					"1 dag",
			TWO_DAY:					"2 dagen",
			THREE_DAY:					"3 dagen",
			NEVER:						"nooit",
			UPDATE:						"Update",
			STATU_INCORRENT:			"Gebruikersnaam of wachtwoord onjuist",
			STATU_ERR_DOMAIN:			"Domeinnaam fout",
			
			STATU_NO_LAUNCH:			"Start niet",
			STATU_FAIL_DDNS: 			"Gefaald om DynDNS te updaten.",
			STATU_FAIL_NOIP: 			"Gefaald om Geen IP te updaten.",
			STATU_CONN:					"Verbinden"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Geavanceerde routering",
			STATIC_ROUTING: 			"Statische routering",

			DESTINATION_NETWORK:		"Bestemming netwerk",
			SUBNET_MASK: 				"Subnetmasker",
			DEFAULT_GATEWAY: 			"Standaard gateway",
			DESCRIPTION: 				"Beschrijving",
			
			SYSTEM_ROUTING_TABLE: 		"Systeem routering tabel",
			CLIENT_NUMBER: 				"Aantal actieve routes",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Interface",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Inschakelen",
			ENABLE_THIS_ENTRY: 			"Dit item inschakelen"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Instellingen",
			NOT_SUPPORT_5G: 			"De regio ondersteund alleen 2.4GHz. Verzeker uzelf dat u de juiste regio selecteerd.",
			NOT_SUPPORT_60G: 			"De regio ondersteund geen 60Ghz.",
			ENABLE_TIPS: 				"U dient de draadloze radio in te schakelen.",

			REGION: 					"Regio",
			NOTICE:  					"Om de draadloos functie te gebruiken, moet de draadloos schakelaar ingeschakeld blijven.",
			
			MODE_2G:					"2,4 GHz",
			MODE_5G:					"5 GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Draadloos",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Draadloze radio inschakelen",

			WIRELESS_NETWORK_NAME: 		"Naam draadloos netwerk (SSID)",
			WIRELESS_PASSWORD: 			"Wachtwoord",
			HIDE_SSID: 					"SSID verbergen",

			SECURITY: 					"Beveiliging",
			NO_SECURITY: 				"Geen beveiliging",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 - Personal (aanbevolen)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - Enterprise",
			WPA2_PERSONAL: 			    "WPA2-Persoonlijk (Aanbevolen)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Versie",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Versleuteling",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Modus",
			MODE_B:  					"Alleen 802.11b",
			MODE_G:  					"Alleen 802.11g",
			MODE_N:  					"Alleen 802.11n",
			MODE_BG:  					"802.11b/g gemengd",
			MODE_GN: 					"802.11g/n gemengd",
			MODE_BGN:  					"802.11b/g/n gemengd",

			MODE_A_5: 					"Alleen 802.11a",
			MODE_AN_5: 					"802.11a/n gemengd",
			MODE_N_5: 					"Alleen 802.11n",
			MODE_AC_5:					"Alleen 802.11ac",
			MODE_NAC_5:					"802.11n/ac gemengd",
			MODE_ANAC_5:				"802.11a/n/ac gemengd",

			MODE_AD_60:					"alleen 802.11ad ",

			CHANNEL_WIDTH: 				"Kanaal breedte",
			CHANNEL: 					"Kanaal",

			TRANSMIT_POWER: 			"Zendvermogen",

			RADIUS_SERVER_IP: 			"RADIUS server IP",
			RADIUS_PORT: 				"RADIUS poort",
			RADIUS_PASSWORD: 			"RADIUS wachtwoord",

			TYPE: 						"Type",
			OPEN_SYSTEM: 				"Open systeem",
			SHARED_KEY: 				"Gedeelde sleutel",

			KEY_SELECTED: 				"Geselecteerde sleutel",
			KEY1: 						"Sleutel1",
			KEY2: 						"Sleutel2",
			KEY3: 						"Sleutel3",
			KEY4: 						"Sleutel4",

			WEP_KEY_FORMAT: 			"WEP sleutel formaat",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Hexadecimaal",

			KEY_TYPE: 					"Type sleutel",
			BIT64: 						"64-bits",
			BIT128: 					"128-bits",
			BIT152: 					"152-bits",

			KEY_VALUE: 					"Sleutel waarde",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Laag",
			MIDDLE: 					"Middel",
			HIGH: 						"Hoog"
		},

		WPS: {

			TITLE2: 					"PIN van router",
			ROUTERS_PIN_INFO: 			"Andere apparaten kunnen met deze router verbinden d.m.v. WPS met de PIN-code van de router.",
			ENABLE_ROUTE_PIN: 			"PIN van router",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Genereren",
			DFT: 						"Standaard",

			TITLE: 						"WPS wizard",
			SELECT_SETUP: 				"Selecteer een instelmethode",
			PUSH_BTN: 					"Drukknop (aanbevolen)",
			PUSH_DES: 					"Druk op de fysieke drukknop op de router, of klik op de software-knop Verbinden op deze pagina.",
			CONNECT: 					"Verbinden",
			CANCEL: 					"Annuleren",

			RESULT_HEAD: 				"De draadloos client",
			RESULT_END: 				"is met succes aan het netwerk toegevoegd.",
			NOT_FOUND: 					"Geen cliënt gevonden. Klik op de knop om nogmaals te proberen.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Niet gevonden",
			ENTER_CLIENT_PIN: 			"Voer de PIN-code van de client in",
			SWITCH_NOTE:				"Om verbinding te maken via WPS, schakel de draadloze functie in met de WIFI knop.",
			SWITCH_NOTE2:				"Om WPS Wizard te gebruiken, moet u eerst de juiste draadloze parameters configureren.",
			STATUS_PIN_ERROR: 			"Ongeldige WPS PIN? Controleer of deze correct is.",
			STATUS_ERROR: 				"Fout.",
			STATUS_CONN_ERROR: 			"Verbinden mislukt.",
			STATUS_CONNING: 			"Verbinden...",
			STATUS_CANCEL: 				"Verbinden geannuleerd.",
			
			NOTE: 						"NB:",
			BUTTON: 					"WIFI knop is uit.",
			ENABLE: 					"Draadloze functie is niet ingeschakeld.",
			HIDDEN: 					"Verberg SSID is aan",
			ENCRYPTION: 				"Encryptie is niet correct",
			WPS: 						"WPS is uitgeschakeld in de Systeem Parameters pagina.",

			
			STATUS_CONN_OVERLAP: 		"Verbinden mislukt (OVERLAP).",
			STATUS_CONN_TIMEOUT: 		"Verbinden mislukt (TIMEOUT).",
			STATUS_CONN_INACT: 			"Verbinding inactief."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Draadloze stations online",
			CLIENT_NUMBER: 				"Client nummer",
			MAC_ADDRESS: 				"MAC-adres",
			CONN_TYPE: 					"Type verbinding",
			SECURITY: 					"Beveiliging",
			RECEIVED_PACKETS: 			"Ontvangen pakketten",
			SEND_PACKETS: 				"Verzonden pakketten"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Instellingen",
			
			MODE_2G: 					"2,4 GHz",
			MODE_5G:					"5 GHz",

			ALLOW_EACH: 				"Gasten mogen elkaar zien",

			ALLOW_LOCAL: 				"Geef gasten toegang tot mijn lokale netwerk",
			
			WIRELESS: 					"Draadloos",
			WIRELESS_24G_RADIO: 		"Draadloos 2,4 GHz",
			WIRELESS_5G_RADIO: 			"Draadloos 5 GHz",
			ENABLE_GUEST: 				"Gastnetwerk inschakelen",

			NAME_SSID: 					"Naam draadloos netwerk (SSID)",
			HIDE_SSID: 					"SSID verbergen",
			PASSWORD_CHANGE_CYCLE: 		"Wachtwoord update interval",
			PER_DAY: 					"Dagelijks",
			PER_WEEK: 					"Wekelijks",
			PER_MONTH: 					"Maandelijks",
			NEVER: 						"Nooit",
			SECURITY: 					"Beveiliging",
			NO_SECURITY: 				"Geen beveiliging",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Persoonlijk",

			VERSION: 					"Versie",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Versleuteling",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Wachtwoord"
		},

		NAT:{
			SETTINGS: 					"Hardware NAT",
			STATUS: 					"Hardware NAT",
			
			ALG_TITLE: 					"Application Layer Gateway (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP Passthrough",
			L2TP_ALG: 					"L2TP Passthrough",
			IPSEC_ALG: 					"IPSec Passthrough",

			ENABLE_FTP_ALG: 			"FTP ALG inschakelen",
			ENABLE_TFTP_ALG: 			"TFTP ALG inschakelen",
			ENABLE_H323_ALG: 			"H323 ALG inschakelen",
			ENABLE_RTSP_ALG: 			"RTSP ALG inschakelen",
			ENABLE_PPTP_ALG: 			"PPTP Passthrough inschakelen",
			ENABLE_L2TP_ALG: 			"L2TP Passthrough inschakelen",
			ENABLE_IPSEC_ALG: 			"IPSec Passthrough inschakelen",
			NAT_ENABLE_NOTICE: 			"NB: uw configuraties worden pas van kracht nadat de NAT functie ingeschakeld is."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Virtuele servers",

			SERVICE_NAME: 				"Type service",
			EXTERNAL_PORT: 				"Externe poort",
			INTERNAL_IP: 				"Intern IP",
			INTERNAL_PORT: 				"Interne poort",
			PROTOCAL: 					"Protocol",

			BTN_VIEW: 					"Bestaande services bekijken",

			EXSITTING_SERVICE: 			"Bestaande services",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX of XX)",
			EXT_PORT_TIPS: 				"(XX of XX-XX, 1-65535)",
			INT_PORT_TIPS: 				"(XX of blanco, 1-65535)",

			NOTICE:						"In conflict met de poort voor beheer op afstand. Weet u zeker dat u wilt doorgaan?",
			NOTICE_INVALID_REMOTE:		"Afstand beheer is ongeldig vanwege het poort 80 conflict met de virtuele server. Veranderd u alstublieft de beheer op afstand poort.",
			NOTICE_ENTER_ANOTHER:		"In conflict met het beheer op afstand poort. Selecteert u alstublieft een andere poort.",
			NOTICE_PPTP_CONFLICT:		"In conflict met de PPTP VPN poort. Voer een andere poort in.",
			NOTICE_OPENVPN_CONFLICT:	"In conflict met de OPENVPN poort. Voer een andere poort in.",


			ENABLE_THIS_ENTRY: 			"Inschakelen",
			OPERATION: 					"Werking",
			CHOOSE: 					"Kiezen",
			NAT_ENABLE_NOTICE: 			"NB: uw configuraties worden pas van kracht nadat de NAT functie ingeschakeld is."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port Triggering",
			APPLICATION: 				"Applicatie",
			TRIGGER_PORT: 				"Triggering poort",
			TRIGGER_PROTOCOL: 			"Triggering protocol",

			EXTERNAL_PORTS: 			"Externe poort",
			EXTERNAL_PROTOCOL: 			"Extern protocol",

			BTN_VIEW: 					"Bestaande applicaties bekijken",

			EXSITTING_APPLICATION: 		"Bestaande applicaties",
			APPLICATION_NAME: 			"Naam applicatie",
			TRIGGER_TIPS: 				"(XX, 1-65535)",
			EXTERNAL_TIPS: 				"(XX of XX-XX, 1-65535, max. 5 paren)",
			
			NOTICE_PPTP_CONFLICT:		"In conflict met de PPTP VPN poort. Voer een andere poort in.",
			NOTICE_OPENVPN_CONFLICT:	"In conflict met de OPENVPN poort. Voer een andere poort in.",
			
			ENABLE_THIS_ENTRY: 			"Inschakelen",
			OPERATION: 					"Werking",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"NB: uw configuraties worden pas van kracht nadat de NAT functie ingeschakeld is."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"DMZ inschakelen",
			HARDWARESTATUS: 			"DMZ host IP-adres",
			NAT_ENABLE_NOTICE: 			"NB: uw configuraties worden pas van kracht nadat de NAT functie ingeschakeld is."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP service lijst",
			CLIENT_NUMBER: 				"Client nummer",
			SERVICE: 					"Beschrijving service",
			EXTERNAL_PORT: 				"Externe poort",
			PROTOCAL: 					"Protocol",
			IP_ADDR: 					"Intern IP-adres",
			INTERNAL_PORT: 				"Interne poort",
			NAT_ENABLE_NOTICE: 			"NB: uw configuraties worden pas van kracht nadat de NAT functie ingeschakeld is."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB-modem",
			LOCATION: 					"Locatie",
			MOBILE_ISP: 				"Mobiele ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Verbindingsmodus",
			CONNECT_ON_DEMAND: 			"Verbinden op aanvraag",
			CONNECT_AUTOMATICALLY: 		"Automatisch verbinden",
			CONNECT_MANUALLY: 			"Handmatig verbinden",
			MAX_IDLE_TIME: 				"Max. tijd inactief",
			CONNECTION_TIP: 			"De huidige Internet toegang is WAN voorkeur.",
			IDLE_TIME_TIP: 				"De Verbindingsmodus en Max. tijd inactief konden niet handmatig worden ingesteld.",
			MINUTES: 					"minuten. (0 betekent altijd actief blijven.)",

			AUTHENTICATION_TYPE: 		"Verificatie type",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Standaard is Auto; niet wijzigen tenzij noodzakelijk.",

			CONNECT: 					"Verbinden",
			DISCONNECT: 				"Verbreken",

			SET_TIP: 					"Kiesnummer, APN, gebruikersnaam en wachtwoord handmatig instellen.",
			DIAL_NUMBER: 				"Kiesnummer",
			APN: 						"APN",
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			OPTIONAL: 					"(Optioneel)",
			MTU_SIZE: 					"MTU grootte (in bytes)",
			MTU_SIZE_TIP: 				"Standaard is 1480, niet wijzigen tenzij noodzakelijk.",

			USE_FOLLOW_DNS_SERVER: 		"Gebruik de volgende DNS servers",
			PRIMARY_DNS: 				"Primaire DNS",
			SECOND_DNS: 				"Secundaire DNS",

			UNPLUGGED: 					"Afgekoppeld",
			IDENTIFYING: 				"Identificeren…",
			IDENTIFY_SUCCESS: 			"Identificatie geslaagd"
		},

		DISK_SETTING: {
			DISK_SET: 					"Apparaatinstellingen",
			SCAN: 						"Scannen",
			SELFLY_REMOVE: 				"Veilig verwijderen",
			SCAN_RESULT: 				"Schijf %n  gevonden",
			NOT_FOUND: 					"Niet gevonden",
			SELFLY_REMOVE: 				"Veilig verwijderen",
			
			VOLUMN: 					"Volume",
			CAPACITY: 					"Capaciteit",
			FREESPACE: 					"Vrije ruimte",
			USBSPACE: 					"Gebruikte ruimte",
			
			STATUS: 					"Status",
			INACT: 						"Deactiveren",
			ACTIVE: 					"Actief",
			
			USAGE: 						"Gebruik",
			CAPACITY: 					"Capaciteit",
			OPERATION: 					"Werking",	
			
			ACC: 						"Accountbeheer", 	 	
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			USE_LOGIN: 					"Gebruik login van gebruiker",
			SCAN: 						"Scannen",
			ENJECT_ALL: 				"Alles uitwerpen",
			ENJECT: 					"Uitwerpen",
			ADD_USER: 					"Gebruiker toevoegen",
			AUTH: 						"Autoriteit"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline download",
			ITEMS:						"Items",
			FILE:						"Bestand",
			FOLDER:						"Map",
			SIZE:						"Grootte",
			STATUS:						"Status",
			DOWNLOAD:					"Downloaden",
			REMAINTING:					"Resterende tijd",
			SPEED:						"Snelheid",
			SOURCE:						"Bron",	
			DOWNLOADTO:					"Downloaden naar",	
			TORRENT_PC:					"Torrent van PC",
			TORRENT_USB:				"Torrent van USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP poort",
			AMULEUDP:					"aMule UDP poort",
			AMULESERVER:				"aMule Server",
			SCHEDULE:					"Schema",
			MAXACTIVE:					"Maximum Aantal van Actieve Taken",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Tijdzone",
			DOWNLOADTIME:				"Download tijd",
			REPEAT:						"Herhalen",
			SPEEDLIMIT:					"Snelheidslimieten",
			MAXDOWNLOAD:				"Maximum download snelheid",
			MAXUPLOAD:					"Maximum upload snelheid",
			SPEEDTIPS:					"(0 betekend onbeperkt.)",
			BTPORT:						"BT download poort",
			SEED:						"Blijf seeden na taak voltooid",
			UNIT:						"KB/S",
			MODIFY:						"Wijzigen",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrent locatie",
			CONNECT:					"Verbonden",
			DISCONNECTED:				"Verbroken",
			CONNECTING:					"Verbinden",
			GENERAL:					"Algemeen",
			COMPLETED:					"Voltooid",
			NEWDEVICE:					"Nieuw Apparaat",
			FOUNDUSB:					"Nieuwe USB gedetecteerd",
			CONNECTEDPEERS:				"Verbonden Peers",
			OF:							"of",
			NUM_OF_CON:					"Aantal verbindingen",
			NUM_OF_CON_G:				"Globaal Maximum Aantal Verbindingen.",
			NUM_OF_CON_PT:				"Maximum Aantal van Verbonden Peers per Torrent.",
			EN_DHT_NET:					"DHT Netwerk inschakelen.",
			EN_PE_EX:					"Peer Exchange inschakelen.",
			EN_BT:						"BitTorrent Protocol Encryptie inschakelen.",
			GENERAL_SETTINGS:			"Algemene Instellingen",
			BT_SETTINGS:				"BT Instellingen",
			AMULE_SETTINGS:				"aMule Instellingen",
			CLEAN:						"Verwijderen Voltooid.",
			NONE_COMPLETE: 				"Geen voltooide taken."
		},

		FOLDER: {
			TITLE: 						"Instellingen voor delen",
			ACCOUNT_TITLE: 				"Account voor delen",
			ACCOUNT:					"Account",
			AC_NOTE: 					"Een account maken voor het delen van inhoud. U kunt het inlog account gebruiken of een nieuw account aanmaken.",
			
			AC_LOGIN: 					"Standaard account gebruiken",
			AC_FOLLOW: 					"Nieuw account aanmaken",

			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",
			CONFIRM: 					"Wachtwoord bevestigen",

			SHARING_SETTING: 			"Instellingen voor delen",
			SERVER_NAME: 				"Netwerk/Mediaserver naam",

			METHOD: 					"Toegangsmethode",
			LINK: 						"Koppeling",
			PORT: 						"Poort",

			NETWORK_NEIGHBORHOOD: 		"Netwerk omgeving",
			FTP: 						"FTP",
			FTPEX: 						"FTP (via Internet)",

			SHARE_FOLDER: 				"Mappen delen",
			SHAREING_ALL: 				"Alles delen",
			NOTE:  						"Zet Aan om alle bestanden en mappen te delen, of Uit om alleen de geselecteerde mappen te delen.", 
			ENABLE_AUTHENTICATION: 		"Verificatie inschakelen",
			SHAREING_FOLDER: 			"Mappen voor delen",
			
			SHARE_NAME: 				"Mapnaam",
			FOLDER_PATH: 				"Mappad",
			VOLUMN_NAME: 				"Volume naam",

			SHARE_NAME: 				"Naam van map",
			FOLDER_PATH: 				"Mappad",
			MEDIA_SHARING: 				"Media delen",
			STATUS: 					"Status",

			GUEST_ACCESS: 				"Toegang via Gasten netwerk toestaan",
			ENABLE_AUTHENTICATION: 		"Verificatie inschakelen",
			ENABLE_WRITE_ACCESS: 		"Schrijftoegang inschakelen",
			ENABLE_MEDIA_SHARE: 		"Media delen inschakelen",
			
			BROWSE: 					"Bladeren",
			BROWSE_TITLE: 				"Selecteer een map.",

			NO_VOLUMN:					"Geen volume",
			
			NOTICE: 					"Weet u zeker dat u de Dynamisch DNS pagina wilt verlaten? Druk op Opslaan om de pagina op te slaan en te verlaten. Druk op Verlaten om de pagina te verlaten zonder op te slaan. Druk op Annuleren om op de pagina te blijven.",
			NO_CHANGE_NOTICE: 			"Weet u zeker dat u de Dynamisch DNS pagina wilt verlaten?",

			SAVE_FAILED_NOTICE: 		"Opslaan mislukt",
			CONTINUE: 					"Verlaten",
			CONTINUE_SAVE: 				"Opslaan",
			CANCLE: 					"Annuleren",

			ENABLE: 					"Inschakelen"

		},

		PRINT:{
			TITLE: 						"Print Server",
			NAME: 						"Naam printer",
			ENABLE_PRINT_SERVER: 		"Print Server",
			NONE: 						"Geen",
			
			NOTE_TITLE: 				"NB:",
			STEP1: 						"Stap 1:",
			STEP2: 						"Stap 2:",
			STEP3: 						"Stap 3:",

			NOTE1: 						"Installeer het printer stuurprogramma op uw computer.",
			NOTE2: 						"Sluit een USB-printer op de USB-aansluiting van de router aan m.b.v. een USB-kabel.",
			NOTE3: 						"Installeer het TP-LINK USB Printer Controller hulpprogramma. Download het hulpprogramma van onze officiële website: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/nl/Support/\">www.tp-link.com/nl/Support/</a>.",
			NOTE3_US: 					"Installeer de TP-LINK USB Printer Controller Hulpprogramma. Download deze van onze officiële website: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>. "
            },

		PARENTAL_CTR:{
			TITLE: 						"Ouderlijk toezicht",
			STATUS: 					"Ouderlijk toezicht",
			UNKNOWN: 					"Onbekend",

			DEVICE_CTR: 				"Apparaten onder Ouderlijk toezicht",
			DEVICE: 					"Naam apparaat",
			MAC_ADDRESS: 				"MAC-adres",
			TIME: 						"Internet toegangstijd",
			DESCRIPTION: 				"Beschrijving",
			
			ENABLE_THIS_ENTRY: 			"Inschakelen",
			OPTIONAL: 					"(Optioneel)",
			BTN_VIEW: 					"Aanwezige apparaten bekijken",
			
			DEVICE_LIST: 				"Apparatenlijst",
			SYSTEM_TIME: 				"Systeemtijd",
			
			RESTR: 						"Inhoud beperken",
			MODE: 						"Beperking",
			BLACKMODE: 					"Zwarte lijst",
			WHITEMODE: 					"Witte lijst",
			ACCESS_DEVICES_LIST: 		"Apparatenlijst openen",
			
			CHOOSE: 					"Kiezen",
			ADD_A_NEW_KEYWORD: 			"Voeg een nieuw trefwoord in om te blokkkeren.",
			ADD_A_NEW_DOMAIN_NAME: 		"Voeg een nieuw domeinnaam in om toegang te verkrijgen.",
			
			YOURPC:						"Uw PC"
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
			OTHERS: 					"Overige",

			DEVICE: 					"Apparaat",
			RATE: 						"Snelheid",
			APPLICATION: 				"Applicatie",

			NAME: 						"Naam",
			MAC_ADDRESS: 				"MAC-adres",
			IP_ADDRESS: 				"IP-adres",


			DEVICES: 					"Apparaten"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Bandbreedte",
			TEST_BANDWIDTH: 			">Bandbreedte testen",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Streamboost inschakelen",
			UP_LIMITATION: 				"Limiet up (Mbps)",
			DOWN_LIMITATION: 			"Limiet down (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Bandbreedte test uitvoeren",
			TESTING: 					"Testen",
			TEST_FAILED: 				"Test mislukt",
			TEST_SUCCEED: 				"Test geslaagd",
			ENABLE_AUTOMATIC_TEST: 		"Automatische test inschakelen",
			KEEP_UP_TO_DATE: 			"Streamboost up-to-date houden",
			ENABLE_AUTOMATIC_UPDATE: 	"Automatische update inschakelen"

		},

		PRIORITY:{
			PRIORITY: 					"Prioriteit",
			PRIORITY_TIPS: 				"Met prioriteit kunt u de belangrijkheid van één apparaat boven die van een ander stellen. Dat is handig als apparaten moeten concurreren om beperkte bandbreedte als ze dezelfde classificatie hebben.",
			ALL_DEVICE: 				"Alle apparaten",
			ACTIVE_DEVICE: 				"Actief apparaat",
			SAVE: 						"Opslaan",
			ID: 						"ID",
			DEVICE: 					"Apparaat",
			TYPE: 						"Type",
			MAC_ADDRESS: 				"MAC-adres",
			STICK: 						"Plakken"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistieken",
			UP_TIME: 					"Actieve tijd",
			DOWNLOADS: 					"Downloads",
			LAST_DAY: 					"Afgelopen dag",
			LAST_WEEK: 					"Afgelopen week",
			LAST_MONTH: 				"Afgelopen maand",
			ALL_LAN_HOSTS: 				"Alle LAN hosts",
			OTHER: 						"Overige"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Firewall",
			ENABLE_SPI: 				"SPI firewall",

			DOS_PROTECTION: 			"DoS bescherming",
			ENABLE_DOS: 				"DoS bescherming",
			
			OFF: 						"Uit",
			LOW: 						"Laag",
			MIDDLE: 					"Middel",
			HIGH: 						"Hoog",

			ICMP: 						"ICMP-FLOOD Attack Filtering",
			UDP: 						"UDP-FLOOD Attack Filtering",
			TCP: 						"TCP-SYN-FLOOD Attack Filtering",
			ENABLE_DOS_TIP:             "DoS Protectie en Verkeer Statistieken moeten gelijktijdig ingeschakeld zijn.",

			IGNORE: 					"Ping Packet van WAN-poort negeren",
			FORBID: 					"Ping Packet van LAN-poort verbieden",

			BLOCK_DOS: 					"Lijst van geblokkeerde DoS hosts",
			HOST_NUMBER: 				"Host nummer",
			IP_ADDRESS: 				"IP-adres",
			MAC_ADDRESS: 				"MAC-adres"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Toegangscontrole",
			ENABLE_ACCESS: 				"Toegangscontrole",

			ACCESS_MODE: 				"Toegangsmodus",
			DEFAULT_ACCESS_MODE: 		"Standaard toegangsmodus",
			BLACK_LIST: 				"Zwarte lijst",
			WHITE_LIST: 				"Witte lijst",
			
			WIRED:						"Via kabel",
			WIRELESS:					"Draadloos",

			DEVICE_ONLINE: 				"Online apparaten",
			NAME: 						"Naam apparaat",
			IP_ADDRESS: 				"IP-adres",
			MAC_ADDRESS: 				"MAC-adres",
			CONN_TYPE: 					"Type verbinding",

			BLOCK: 						"Blokkeren",

			DEVICE_IN_WHITE: 			"Apparaten in witte lijst",
			DEVICE_IN_BLACK: 			"Apparaten in zwarte lijst"
		},

		IP_MAC:{
			TITLE: 						"Instellingen",
			ENABLE_ARP: 				"ARP Binding",

			ARP_LIST: 					"ARP lijst",
			ARP_NUM: 					"ARP item nummer",

			MAC_ADDRESS: 				"MAC-adres",
			IP_ADDRESS: 				"IP-adres",
			BOUND: 						"Gebonden",
			UNBOUND: 					"Niet gebonden",

			BINDING_LIST: 				"Binding lijst",
			DESCRIPTION: 				"Beschrijving",
			OPTIONAL: 					"(Optioneel)",
			ENABLE_THIS_ENTRY: 			"Inschakelen"
		},

		TIMESET: {
			TITLE: 						"Tijdinstellingen",
			ZONE: 						"Tijdzone",
			DATE: 						"Datum",
			DATEFORMAT: 				"DD/MM/JJJJ",
			TIME: 						"Tijd",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"NTP server I",
			NTP2: 						"NTP server II",
			OPTIONAL: 					"(Optioneel)",

			CURRENT_TIME:  				"Huidige tijd",
			SET_TIME: 					"Tijd instellen",
			AUTOMATIC: 					"Automatisch van het Internet verkrijgen",
			MANUAL: 					"Handmatig",
			AUTOMATIC_BTN: 				"Verkrijgen",


			GETGMT: 					"GMT verkrijgen",

			
			GETGMT_SUCCESS: 			"Tijd van NTP server verkrijgen geslaagd",
			GETGMT_TIMEOUT: 			"Tijd van NTP server verkrijgen time-out",
			GETGMT_WAIT: 				"Wachten",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Zomertijd",
			ENABLE_DAYLIGHT: 			"Zomertijd inschakelen",
			START: 						"Begin",
			END: 						"Einde",

			RUNNING_STATUS: 			"Status in werking",
			DOWN: 						"Zomertijd is uitgeschakeld",
			UP: 						"Zomertijd is ingeschakeld"
		},

		DIAG:{
			TITLE: 						"Diagnose",
			DIAGNOSTIC_TOOL: 			"Diagnosefunctie",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"IP-adres/Domeinnaam",
			COUNT: 						"Aantal pings",
			
			BASIC: 						"Basis",
			ADVANCED: 					"Geavanceerd",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Ping pakket grootte",
			PKTUNIT: 					"(4-1472 bytes)",

			TIMEOUT: 					"Ping time-out",
			TIMOUTUNIT: 				"(100-2000 milliseconden)",

			TTL: 						"Traceroute max. TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Start",
			STOP: 						"Stop"
		},

		FIRMWARE:{
			TITLE: 						"Firmware upgrade",
			FIRMWARE_INFO:  			"Uw firmware is actueel",
			INFO: 						"Apparaat Informatie",
			REMOTE_TITLE: 				"Online Upgrade",
			LOCAL_TITLE: 				"Lokaal Upgrade",

			NEWFILE: 					"Nieuw firmware bestand",
			FIRMWAREVERSION: 			"Firmware versie",
			HARDWAREVERSION: 			"Hardware versie",
			LATESTVERSION: 				"Laatste Versie",
			CONFIRM_CONTENT:			"Bent u zeker om de firmware te upgraden?",
			WARNING:					"Firmware is aan het upgraden…<br/>  Om schade te voorkomen, laat het apparaat aan staan en wacht zonder een handeling uit voeren tijdens dit proces.",
			REBOOTING: 					"Herstarten… <br/>  Om schade te voorkomen, laat het apparaat aan staan en wacht zonder een handeling uit voeren tijdens dit proces.",
			DO_NOT_OPERATE: 			"Upgraden... <br/>A.u.b. NIET gebruiken gedurende het proces.",
			FIRMWARE_UPDATING_NOTE: 	"1. Firmware aan het bijwerken…",
			REBOOTING_NOTE: 			"2. Herstarten…",
			SCREEN_UPDATING_NOTE: 		"3. Scherm aan het bijwerken…",
			UPGRADE_FAILED: 			"Upgrade mislukt.",
			UPGRADE: 					"Upgrade",
			CHECK: 						"Controleren",
			DOWNLOADING: 				"Aan het downloaden…",
			UPGRADE_INOF: 				"Om schade te voorkomen, laat de router aan staan.",
			NOTE: 						"Opmerking:",
			NO_UPGRADE: 				"Dit is de recentste versie",

			UPGRADING: 					"Aan het bijwerken…",
			RETRY: 						"Probeer opnieuw",
			CANCEL: 					"Annuleren",
			ILEGAL_DEVICE:				"Niet mogelijk om het apparaat te identificeren. Neem contact op met TP-LINK Technisch support.",
			UPGRADE_FAIL: 				"Upgraden niet gelukt. Probeer later opnieuw.",
			CHECK_UPGRADE:				"Controleer voor upgrades."
		},

		BACKUP:{
			BACKUP: 					"Backup",
			BACKUPTIP: 					"Een kopie van de huidige instellingen opslaan.",

			RESTORE: 					"Terugzetten",
			RESTORETIP: 				"Eerder opgeslagen instellingen terugzetten.",
			
			RESTORE_WARN:				"Router herstellen… <br/>Niet bedienen tijdens dit proces.",
			RESTORE_CONFIRM_CONTENT: 	"Weet u zeker dat u de router m.b.v. het backup-bestand wilt herstellen?",
			
			FILE: 						"Bestand",

			FACTORY: 					"Fabrieksinstellingen herstellen",
			FACTORYTIP: 				"Alle configuratie instellingen terugzetten naar de fabrieksinstellingen.",
			FACTORY_CONFIRM_CONTENT:	"Weet u zeker dat u de router naar fabrieksinstellingen wilt terugzetten?",
			FACTORY_WARN:				"Router herstellen… <br/>Niet bedienen tijdens dit proces.",
			
			BACKUPBTN: 					"Backup",
			RESTOREBTN: 				"Terugzetten",
			FACTORYBTN: 				"Fabriek-reset"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Accountbeheer",
			
			OLDUSER: 					"Oude gebruikersnaam",
			OLDPWD: 					"Oud wachtwoord",

			NEWUSER: 					"Nieuwe gebruikersnaam",
			NEWPWD: 					"Nieuw wachtwoord",
			CONFIRM: 					"Nieuw wachtwoord bevestigen",

			RECOVERYINFO: 				"Wachtwoord opvragen",
			ENABLE_PASSWORD_RECOVERY: 	"Wachtwoord opvragen inschakelen",
			FROM: 						"Van",
			TO: 						"Naar",
			SMTP_SERVER: 				"SMTP server",
			
			ENABLE_AUTHENTICATION: 		"Verificatie inschakelen",
			USERNAME: 					"Gebruikersnaam",
			PASSWORD: 					"Wachtwoord",

			TEST_MAIL: 					"Testmail",

			LOCAL:						"Lokaal beheer",
			LOCAL_MAC_AUTH: 			"Lokale MAC verificatie",
			ACCESS: 					"Toegang voor alle met LAN verbonden apparaten",
			ACCESS_TIPS: 				"Zet Aan om beheer van alle apparaten in het LAN mogelijk te maken, of laat Uit staan om beheer van een specifiek apparaat mogelijk te maken.",
			
			MAC_ADDRESS: 				"MAC-adres",
			VIEW_BTN: 					"Aanwezige apparaten bekijken",
			DESCRIPTION: 				"Beschrijving",

			EXIST_DEVICE:               "Aanwezige apparaten",

			OPTIONAL: 					"(Optioneel)",
			ENABLE_THIS_ENTRY: 			"Inschakelen",

			DEVICE_NAME:				"Naam apparaat",
			IP_ADDRESS:					"IP-adres",
			

			REMOTE: 					"Beheer op afstand",
			DISABLE_REMOTE_MANAGEMENR: 	"Beheer op afstand uitschakelen",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Beheer op afstand voor alle apparaten inschakelen",
			ENABLE_REMOTE_MANAGEMENR: 	"Beheer op afstand voor opgegeven apparaten inschakelen",
			WEB: 						"Webbeheer poort",

			NOTICE:						"In conflict met de virtuele server poort! Weet u zeker dat u wilt doorgaan?",
			NOTICE_ENTER_ANOTHER:		"In conflict met de virtuele server poort. Geef een andere poort op.",

			REMOTEIP: 					"IP-adres Beheer op afstand",
			REMOTEIPNOTE: 				"(255.255.255.255 voor alle invoeren)"
			
		},

		SYSLOG:{
			TITLE: 						"Systeemlog",
			LOG_FILTER: 				"Log filter:",
			
			TYPE_EQ: 					"Type=",
			
			ALL: 						"ALLE",

			FIREWALL: 					"Firewall", 
			NAT: 						"NAT",
			DDNS: 						"Dynamisch DNS",
			UPNP:						"UPnP",
			IMB:            			"IP&MAC Binding",
			IPTV:						"IPTV",
			DHCPS:						"DHCP server",
			IGMP_PROXY:					"IGMP proxy",
			DOMAIN_LOGIN:				"Domein login",
			BASIC_SECURITY: 			"Basis beveiliging",
			PARENTAL_CONTROL: 			"Ouderlijk toezicht",
			ACCESS_CONTROL: 			"Toegangscontrole",
			DOS_PROTECTION: 			"DoS bescherming",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Verkeersstatistieken",
			TIME_SETTINGS: 				"Tijdinstellingen",
			ACCOUNT_MANAGEMENT: 		"Accountbeheer",
			LOCAL_MANAGEMENT: 			"Lokaal beheer",
			REMOTE_MANAGEMENT: 			"Beheer op afstand",
			LOCALE: 					"Landinstellingen",
			FACTORY_RESET: 				"Fabriek-reset",
			LED_CONTROLLER: 			"LED controller",
			NETWORK: 					"Netwerk",
			USBSHARE: 					"USB delen",
			AND: 						"en",
			LEVEL: 						"Niveau",
			EMERGENCY:					"NOODGEVAL",
			ALERT:						"ALARM",
			CRITICAL:					"KRITIEK",
			ERROR: 						"FOUT",
			WARNING: 					"WAARSCHUWING",
			NOTICE: 					"MEDEDELING",
			INFO: 						"INFO",
			DEBUG: 						"DEBUG",

			INDEX: 						"Index",
			TYPE: 						"Type",
			TIME: 						"Tijd",
			LEVEL_COL:					"Niveau",

			CONTENT: 					"Loginhoud",
			
			MAIL_LOG: 					"Log mailen",
			SAVE_LOG: 					"Log opslaan",

			SEND_OK: 					"Verzenden OK",
			SEND_FAILED: 				"Verzenden mislukt",

			MAIL_SETTING: 				"E-mail instellingen",

 			FROM: 						"Van",
 			TO: 						"Naar",
 			SMTP_SERVER: 				"SMTP server",
 			ENABLE_AUTHENTICATION: 		"Verificatie inschakelen",

 			USERNAME: 					"Gebruikersnaam",
 			PASSWORD: 					"Wachtwoord",
 			CONFIRM_PASSWORD: 			"Wachtwoord bevestigen",

 			AUTO_MAIL: 					"Auto Mail inschakelen",
 			LOG_AT: 					"Log op",
 			HH_MM: 						"(HH:MM) dagelijks",

 			LOG_EVERY: 					"Log elke",
 			HOURS: 						"uur"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Instellingen",
			STATUS: 					"QoS inschakelen",
			UPBANDWIDTH: 				"Upload bandbreedte",
			DOWNBANDWIDTH: 				"Download bandbreedte",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Spelheid testen",
			RULE_LIST: 					"Lijst QoS regels",
			RULE: 						"QoS regel",
			ID: 						"ID",
			NAME: 						"Naam",
			TYPE: 						"Type",
			DETAIL: 					"Detail",
			PRIORITY: 					"Prioriteit",

			APPLICATION: 				"Applicatie",
			APPLICATION_LIST: 			"Applicatielijst",
			CUSTOM_APP: 				"Aangepaste applicatie",
			MAC_ADDR: 					"MAC-adres",
			MAC_ADDR_P: 				"Mac:",
			IP_ADDR: 					"IP-adres",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Fysieke poort",

			LOW: 						"Laag",
			MIDDLE: 					"Middel",
			HIGH: 						"Hoog",

			PROTO: 						"Protocol",
			PORT: 						"Poort",
			PROTO_P: 					"Protocol:",
			PORT_P: 					"Poort:",
			PORT_TIPS: 					"(XX of XX-XX, 1-65535, max. 5 paren)",

			ALL: 						"ALLE",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Aangepast",

			WIFI_HOME: 					"WIFI-HOST",
			WIFI_GUEST: 				"WIFI-GAST",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Database upgrade",

			NEWFILE: 					"Nieuw database bestand",
			FIRMWAREVERSION: 			"Database versie",
			CONFIRM_CONTENT:			"Weet u zeker dat u de database wilt updaten?",
			WARNING:					"Database updaten… <br/>Niet bedienen tijdens dit proces.",
			
			UPGRADE: 					"Upgrade",

			SERVICE_RESTART: 			"Qos service opnieuw starten",
			
			TYPE: 						"Type",
			BY_DEVICE: 					"Per apparaat",
			BY_APP: 					"Per applicatie",
			BY_PHY: 					"Per fysieke poort",

			HIGH_PRIORITY_LBL: 			"Hoge prioriteit:",
			MIDDLE_PRIORITY_LBL: 		"Middel prioriteit:",
			LOW_PRIORITY_LBL: 			"Lage prioriteit:",

			HIGH_PRIORITY: 				"Hoge prioriteit",
			MIDDLE_PRIORITY: 			"Middel prioriteit",
			LOW_PRIORITY: 				"Lage prioriteit"

		},

		APPLICATION:{
			APP_LIST: 					"Applicatielijst",
			GAME_LIST: 					"Game-lijst",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Verkeersstatistieken",
			ENABLE_STATISTICS: 			"Verkeersstatistieken",

			TITLE: 						"Verkeersstatistieken lijst",
			IP_MAC: 					"IP-adres/MAC-adres",
			TPKT: 						"Totale pakketten",
			TBYTE: 						"Totale bytes",
			CPKT: 						"Huidige pakketten",
			CBYTE: 						"Huidige bytes",
			CICMP: 						"Huidige ICMP Tx",
			CUDP: 						"Huidige UDP Tx",
			CSYN: 						"Huidige SYN Tx",
			
			DELETE_CONFIRM: 			"Weet u zeker dat u de verkeersstatistieken wilt verwijderen?",
			DELETE_ALL_CONFIRM: 		"Weet u zeker dat u alle verkeersstatistieken wilt verwijderen?",

			RESET_ALL: 					"Alles resetten"
		},

		SYSPARA:{
			W24G: 						"Draadloos 2,4 GHz",
			W5G: 						"Draadloos 5 GHz",
			W60G: 						"60GHz draadloos",
			W24G_WDS: 					"2,4 GHz WDS",
			W5G_WDS: 					"5 GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"De draadloos functie is uitgeschakeld. Als u deze functie wilt gebruiken, moet u de Wi-Fi toets inschakelen.",

			ENABLE_TIPS: 				"De draadloos functie is uitgeschakeld.",

			BEACON: 					"Beacon Interval",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS Threshold",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Fragmentation Threshold",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM Interval",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Groepssleutel update periode",
			GROUPUNIT: 					"seconden",
			
			MU_MIMO_FEATURE: 			"Multiuser - MIMO",
			MU_MIMO: 					"Schakel Mu-MIMO in.",
			
			WMM_FEATURE: 				"WMM functie",
			WMM: 						"WMM inschakelen",

			GI_FEATURE: 				"Short GI functie",
			GI: 						"Short GI inschakelen",

			AP_FEATURE: 				"AP Isolation functie",
			AP: 						"AP Isolation inschakelen",

			WDS_FEATURE: 				"WDS Bridging",
			WDS: 						"WDS Bridging inschakelen",
			
			SSID_BRIDEGE: 				"SSID (te bridgen)",
			SURVEY: 					"Zoeken",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC-adres",
			SSID: 						"SSID",
			SIGNAL: 					"Signaal",
			CHANNEL: 					"Kanaal",
			SECURITY: 					"Beveiliging",
			CHOSEN: 					"Gekozen",
			AP_NUMBER:					"AP nummer",

			TOTAL: 						"Totale items",

			MAC: 						"MAC-adres (te bridgen)",
			MACUNIT: 					"Voorbeeld: 00-1D-0F-11-22-33",

			SECURITY: 					"Beveiliging",
			NO: 						"Nee",
			NONE: 						"Geen beveiliging",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Wachtwoord",
			
			AUTH_TYPE: 					"Ver. type",
			AUTO: 						"Auto",
			OPEN: 						"Open systeem",
			SHARED: 					"Gedeelde sleutel",

			WEP_INDEX: 					"WEP index",
			KEY1: 						"Sleutel1",
			KEY2: 						"Sleutel2",
			KEY3: 						"Sleutel3",
			KEY4: 						"Sleutel4",

			WEP_KEY_FORMAT: 			"WEP sleutel formaat",
			ASC: 						"ASCII",
			HEX: 						"Hexadecimaal",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"WPS inschakelen",

			NAT: 						"NAT",
			ENABLE_NAT: 				"NAT inschakelen",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"NAT Boost inschakelen",
			
			MEDIA_SERVER: 				"Media Server",
			SCAN_INTERVAL: 				"Auto Scan interval (uren)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"DoS bescherming niveau instellingen",

			ICMP: 						"ICMP-FLOOD pakketten niveau",
			UDP: 						"UDP-FLOOD pakketten niveau",
			TCP: 						"TCP-FLOOD pakketten niveau",

			WDS_MODE: 					"WDS modus",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Laag",
			MIDDLE: 					"Middel",
			HIGH: 						"Hoog",

			TO: 						"naar",
			NOTICE_NAT_REBOOT: 			"Opnieuw starten… <br/>Niet bedienen tijdens het opnieuw starten.",

			NOTICE_NAT_BOOST: 			"Bij een wijziging van NAT Boost zal dit apparaat opnieuw worden gestart. Weet u zeker dat u wilt doorgaan?",
			NOTICE:						"Uw router's kanaal is niet hetzelfde als van uw brug AP kanaal. Wilt u dit veranderen?",

			UNIT: 						"(5-7200) packets/sec",
			LED: 						"LED",
			NIGHT_MODE: 				"Nachtmodus",
			PERIOD_NIGHT_TIME: 			"Nachtmodus periode",
			ENABLE: 					"Nachtmodus inschakelen",
			HH_MM: 						"(HH:MM)",
			TO: 						"naar",
			NIGHT_MODE_NOTE:            "Uw LED is uitgeschakeld. Als u deze functie wilt gebruiken, drukt u dan op de LED knop of klik op LED in de rechter bovenhoek van de pagina.",
			NOTE2:                      "De nacht modus periode gaat in op basis van de router's systeem tijd. Controleer of u de tijdinstellingen al op uw router heeft ingesteld."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Momenteel geen certificaat, <b>Genereer<b> er één voordat u de VPN Server inschakelt.",
			NO_CERT_NOTE2: 				"Momenteel geen certificaat, <b>Genereer<b> er één voordat u configuratie exporteert.",
			ENABLE_VPN_SERVER: 			"VPN server inschakelen",
			SERVICE_TYPE: 				"Type service",
			SERVICE_PORT: 				"Servicepoort",
			VPN_SUBNET: 				"VPN Subnet/Netmask.",
			CLIENTS_ACCESS: 			"Client toegang",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Alleen thuisnetwerk",
			INTERNET_HOME: 				"Internet en thuisnetwerk",
			CERT_STR: 					"Momenteel geen certificaat, klik OK om er één te genereren en uw configuratie op te slaan.",
			CERT_STR2: 					"Momenteel geen certificaat, klik OK om er één te genereren en uw configuratie te exporteren.",
			CONF_FILE: 					"Configuratiebestand", 
			EXPORT_CONF_FILE: 			"Configuratie exporteren.",
			EXPORT: 					"Exporteren",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"IP-adres client",
			ACCOUNT_USERNAME: 			"Gebruikersnaam",
			ACCOUNT_PASSWORD: 			"Wachtwoord",
			CLIENT_IP_NOTE: 			"(max. 10 clients)",
			SAME_SUBNET_NOTE: 			"Het IP adres van de cliënt en het LAN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br/> Voer een andere in.",
			CONFLICT_WITH_DHCP: 		"Het IP adres van de cliënt conflicteerd  met de DHCP IP adres pool. <br/> Voer nogmaals in.",
			CONFLICT_WITH_RESERVED: 	"Het IP adres van de cliënt conflicteerd  met het gereserveerde IP adres. <br/> Voer nogmaals in.",
			CONFLICT_WITH_OPENVPN: 		"Het IP adres en OpenVPN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br/> Voer nogmaals in.",
			SAME_SUBNET_NOTE2: 			"Het VPN Subnet/Netmask en LAN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br/> Voer een andere in.",
			CONFLICT_WITH_DHCP2: 		"Het VPN Subnet/Netmask conflicteerd  met de DHCP IP adres pool. <br/> Voer nogmaals in.",
			CONFLICT_WITH_RESERVED2: 	"Het VPN Subnet/Netmask conflicteerd met het gereserveerde IP adres. <br> Voer nogmaals in.",
			CONFLICT_WITH_PPTPVPN: 		"Het VPN Subnet/Netmask en PPTP VPN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br> Voer nogmaals in.",
			LAN_CONFLICT_WITH_OPENVPN: 	"Het LAN IP adres en OPENVPN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br> Voer nogmaals in.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"Het LAN IP adres en PPTP VPN IP adres kunnen zich niet in hetzelfde subnet bevinden. <br> Voer nogmaals in.",
			VPN_MASK_ERROR: 			"Het netmask kan niet groter zijn dan 255.255.255.248. <br> Voer nogmaals in.",
			ACCOUNT_LIST: 				"Account lijst (tot 16 gebruikers)",
			ADVANCED_SETTING: 			"Geavanceerd",
			ALLOW_SAMBA: 				"Sta Stamba (Network Place) toegang toe.",
			ALLOW_NETBIOS: 				"Sta NetBIOS passthrough toe.",
			ALLOW_UNENCRYPTED_CONN: 	"Sta ongecodeerde verbindingen toe.",
			USERNAME_CONFLICT: 			"Deze gebruikersnaam bestaat al. Voer een andere in.",
				
			NOTICE_VS_CONFLICT:			"In conflict met de virtuele server externe poort. Voer een andere poort in.",
			NOTICE_PT_CONFLICT:			"In conflict met de poort triggering externe poort. Voer een andere poort in.",
			NOTICE_VS_MODIFY:			"In conflict met de virtuele server externe poort. Ga naar <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">  Virtuele Servers</a> pagina en wijzig de virtuele server externe poort.",
			NOTICE_PT_MODIFY:			"In conflict met de poort triggering externe poort(1723). Ga naar <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">  Poort Triggering </a> pagina en wijzig de poort triggering externe poort.",
			
			GENERATE_CERT: 				"Certificaat",
			GENERATE_NEW_CERT: 			"Genereer het certificaat.",
			GENERATE: 					"Genereren",
			GENERATE_TIPS: 				"Certificaat aan het genereren… <br/> Dit kan enkele minuten duren, wacht a.u.b.",
			CERT_SUCCESS: 				"Gelukt",
			CERT_FAIL: 					"Mislukt, probeer opnieuw.",
			
			VPN_CONNECTIONS: 			"VPN verbindingen",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN verbinding",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN verbinding",
			USER: 						"Gebruiker",
			REMOTE_IP: 					"Extern IP",
			ASSIGNED_IP: 				"Toegewezen IP"
		}
	};
})(jQuery);
