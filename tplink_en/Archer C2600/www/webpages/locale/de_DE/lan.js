(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			FORGET_PASSWORD: 			"Passwort vergessen?",
			LOGIN: 						"Login",
			IMPORTANT_UPDATE_INFO: 		"Um einen Adresskonflikt zu vermeiden, wurde die IP-Adresse Ihres Routers geändert auf",
			CONTINUE: 					"Fortfahren",

			IMPORTANT_NOTICE: 			"Wichtiger Hinweis",
			OR: 						", wollen Sie diesen Ort weiterhin besuchen?",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"Drücken Sie die RESET-Taste 10 Sekunden, um Ihren Router auf Werkseinstellungen zurückzusetzen.",
			FORGET_PASSWORD_INFO_1: 	"Ist die Passwortwiederherstellung aktiviert, wird ein Verifizierungscode an die hinterlegte E-Mail-Adresse geschickt. Mit diesem können Sie Benutzernamen und Passwort zurücksetzen.",
			FORGET_PASSWORD_SEND_FAILED:"Code konnte nicht geschickt werden. Bitte überprüfen Sie Ihre Internetverbindung.",

			VERIFICATION_CODE: 			"Bestätigungscode",

			RECEIVE_CODE: 				"Code schicken",

			CONFIRM: 					"Bestätigen",

			SEC: 						" ",

			USER_CONFLICT: 				"Es ist bereits ein Benutzer angemeldet.",
			FIRST_TIME: 				"Wir begrüßen Sie bei der Verwendung des Archer AD7200, entwickelt von TP-LINK in China. Vergeben Sie bitte zu Beginn ein Gerätepasswort, um es zu verwalten.",
			
			USER_CONFLICT_INFO: 		"Benutzer %USER% mit Host %HOST% (%IP%/%MAC%) ist aktuell in den Router eingeloggt. Bitte versuchen Sie es später noch einmal.",
			USER_CONFLICT_INFO_1: 		"Der Nutzer %User (%MAC%) ist derzeit am Router eingeloggt. Sie können es nachher nochmals versuchen, da ein zeitgleicher Zugriff nicht möglich ist.",
			USER_CONFLICT_INFO_2: 		"Benutzer %USER% (%IP%) ist aktuell in den Router eingeloggt. Bitte versuchen Sie es später noch einmal.",
			
			LOGIN_FAILED: 				"Fehlerhafte Zugangsdaten.",
			LOGIN_FAILED_COUNT: 		"Ihr Login ist nun schon %num1-mal fehlgeschlagen. Sie haben noch %num2 Versuche.",
			NO_COOKIE: 					"Cookies müssen aktiviert sein, damit Sie sich einloggen können.", 

			FORGET_PASSWORD_NOTE: 		"Ist die Passwortwiederherstellung nicht aktiviert, können Sie die RESET-Taste 10 Sekunden drücken, um Ihren Router auf Werkseinstellungen zurückzusetzen."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Jetzt upgraden",
			REMIND: 						"Später erinnern",
			NOTICE:    						"Hallo, es ist eine neue Firmware für den %PRODUCT% Router verfügbar.",
			NEVER: 							"Diese Version ignorieren"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN-Verbindungsfehler!",
			STATUS: 						"Status",
			INFO: 							"Informationen",
			SETUP: 							"Eine Internetverbindung einrichten",
			NEVER: 							"Nicht mehr erinnern"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Firmwareversion",
			HARDWARE_VERSION: 				"Hardwareversion",
			HELP_SUPPORT: 					"Support",
			FAQ: 							"FAQ (Häufig gestellte Fragen)",
			CONFIRM_REBOOT: 				"Router wirklich neustarten?",
			CONFIRM_LOGOUT: 				"Wirklich ausloggen?",
			UPGRADE_ALERT_1: 				"Die aktuelle Firmware unterstützt nicht den TP-LINK-Cloud-Service. Wir empfehlen dringend, die neueste Firmware unter www.tp-link.com herunterzuladen, und sie zu aktualisieren.",
			UPGRADE_ALERT_2: 				"Die aktuelle Firmware unterstützt nicht den TP-LINK-Cloud-Service. Wir empfehlen dringend, die Firmware durch Anklicken des Aktualisierungs-Symbols in der rechten oberen Ecke zu aktualisieren.",
			REBOOTING: 						"Neustart",

			MODE_SWITCH: 					"Umschalten der Betriebsart",
			ACCESS_POINT: 					"Accesspoint",
			ACCESS_POINT_TIPS: 				"Rüstet ein Kabelnetz um die WLAN-Komponente auf.",
			ROUTER: 						"Router",
			ROUTER_TIPS: 					"Aufbau eines privaten Netzes mit WLAN-Zugang.",
			REPEATER: 						"Repeater",
			REPEATER_TIPS: 					"Vergrößern eines vorhandenen WLANs.",
			MODE_REBOOT_TIP: 				"Ein Ändern der Betriebsart wird einen Geräteneustart zur Folge haben. Fortfahren?",
			MODE_FAIL_TIP: 					"Die Betriebsart konnte nicht geändert werden. Bitte versuchen Sie es später erneut oder starten Sie das Gerät neu."
		},

		NAV: {
			QUICK_SETUP: 				"Schnellinstallation",
			BASIC: 						"Basiseinstellungen",
			ADVANCED: 					"Erweitert"
		},

		CONTROL: {
			MODE: 						"Modus",
			LOGIN: 						"Einloggen",
			LED:                        "LED",
			LED_ON:                     "LEDs ein",
			LED_OFF:                    "LEDs aus",			
			LED_DISABLED:               "Der LED-Status kann während des Nachtmodus nicht geändert werden.",			
			LOGOUT: 					"Ausloggen",
			UPDATE: 					"Aktualisieren",
			REBOOT: 					"Neustart"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albanien",
			ALGERIA: 					"Algerien",
			AMERICAN_SAMOA: 			"Amerikanisch-Samoa",
			ARGENTINA: 					"Argentinien",
			ARMENIA: 					"Armenien",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australien",
			AUSTRIA: 					"Österreich",
			AZERBAIJAN: 				"Azerbaidschan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahrain",
			BANGLADESH: 				"Bangladesch",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Weißrussland",
			BELGIUM: 					"Belgien",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermuda",
			BOLIVIA: 					"Bolivien",
			BOSNIA_HERZEGOWINA: 		"Bosnien-Herzegowina",
			BRAZIL: 					"Brasilien",
			BRUNEI_DARUSSALAM: 			"Brunei-Darussalam",
			BULGARIA: 					"Bulgarien",
			CAMBODIA: 					"Kambodscha",
			CANADA: 					"Kanada",
			CAYMAN_ISLANDS: 			"Cayman-Inseln",
			CHILE: 						"Chile",
			CHINA: 						"Volksrepublik China",
			COLOMBIA: 					"Kolumbien",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Kroatien",
			CYPRUS: 					"Zypern",
			CZECH_REPUBLIC: 			"Tschechische Republik",
			DENMARK: 					"Dänemark",
			DOMINICAN_REPUBLIC: 		"Dominikanischec Republik",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Ägypten",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estland",
			ETHIOPIA: 					"Äthiopien",
			FAEROE_ISLANDS: 			"Färöer-Inseln",
			FINLAND: 					"Finnland",
			FRANCE: 					"Frankreich",
			FRENCH_GUIANA: 				"Französisch-Guyana",
			FRENCH_POLYNESIA: 			"Französisch-Polynesien",
			GEORGIA: 					"Georgien",
			GERMANY: 					"DEUTSCHLAND",
			GREECE: 					"Griechenland",
			GREENLAND: 					"Grönland",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong-Kong",
			HUNGARY: 					"Ungarn",
			ICELAND: 					"Island",
			INDIA: 						"Indien",
			INDONESIA: 					"Indonesien",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irland",
			ISRAEL: 					"Israel",
			ITALY: 						"Italien",
			JAMAICA: 					"Jamaika",

			JAPAN: 						"Japan",
			JAPAN_1: 					"Japan 1",
			JAPAN_2: 					"Japan 2",
			JAPAN_3: 					"Japan 3",
			JAPAN_4: 					"Japan 4",
			JAPAN_5: 					"Japan 5",
			JAPAN_6: 					"Japan 6",

			JORDAN: 					"Jordanien",
			KAZAKHSTAN: 				"Kasachstan",
			KENYA: 						"Kenia",

			NORTH_KOREA: 				"Nordkorea",
			KOREA_REPUBLIC: 			"Südkorea",
			KOREA_REPUBLIC_3: 			"Südkorea 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Lettland",
			LEBANON: 					"Libanon",
			LIBYA: 						"Libyen",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Litauen",
			LUXEMBOURG: 				"Luxemburg",
			MACAU: 						"Macau",
			MACEDONIA: 					"frühere jugoslawische Republik Mazedonien",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malaysia",
			MALDIVES: 					"Malediven",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexiko",
			MONACO: 					"Fürstentum Monaco",
			MONGOLIA: 					"Mongolei",
			MOROCCO: 					"Marokko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Niederlande",
			NETHERLANDS_ANTILLES: 		"Niederländische Antillen",
			
			NEW_ZEALAND: 				"Neuseeland",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norwegen",
			NORTHERN_MARIANA_ISLANDS: 	"Nördliche Marianen",
			OMAN: 						"Oman",
			PAKISTAN: 					"Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua-Neuguinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Philippinen",
			POLAND: 					"Polen",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Katar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Rumänien",
			RUSSIA: 					"Russland",
			RWANDA: 					"Ruanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Saudi-Arabien",
			SINGAPORE: 					"Singapur",
			SLOVAK_REPUBLIC: 			"Slowakei",
			SLOVENIA: 					"Slowenien",
			SOUTH_AFRICA: 				"Südafrika",
			SPAIN: 						"Spanien",
			SRI_LANKA: 					"Sri-Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Schweden",
			SWITZERLAND: 				"Schweiz",
			SYRIA: 						"Syrien",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tansania",
			THAILAND: 					"Thailand",
			TRINIDAD_TOBAGO: 			"Trinidad und Tobago",
			TUNISIA: 					"Tunesien",
			TURKEY: 					"Türkei",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraine",
			UNITED_ARAB_EMIRATES: 		"Vereinigte Arabische Emirate",
			UNITED_KINGDOM: 			"Britisches Königreich",
			UNITED_STATES: 				"Vereinigte Staaten von Amerika",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Usbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Jungfraueninseln (U.S.)",
			YEMEN: 						"Jemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midwayinsel, Samoa",
			HAWAII: 					"(GMT-10:00) Hawaii",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Pacific Time",
			MOUNTAIN_TIME: 				"(GMT-07:00) Mountain Time (USA, Kanada)",
			CENTRAL_TIME: 				"(GMT-06:00) Central Time (USA, Kanada)",
			EASTERN_TIME: 				"(GMT-05:00) Eastern Time (USA, Kanada)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Atlantic-Time (USA, Kanada)",
			NEWFOUNDLAND: 				"(GMT-03:30) Neufundland",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilien, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Mittelatlantik",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azoren, Cape-Verde-Inseln",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich Mean Time, Dublin, London",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlin, Stockholm, Rom, Bern, Brüssel",
			ATHENS_HELSINKI: 			"(GMT+02:00) Athen, Helsinki, Osteuropa, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Bagdad, Kuwait, Nairobi, Riad, Moskau",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Kalkutta, Bombay, Neu-Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Peking, Hong-Kong, Perth, Singapur",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokio, Osaka, Sapporo, Seoul, Yakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomon-Inseln, Neukaledonien",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Applikation",
			GAME:						"Spiele",
			QQ:							"QQ",
			MSN:						"MSN",
			LINE:						"Line",
			Skype:                      "Skype",
			PPStream: 					"PPStream",
			SIP:  						"SIP",
			PPTC: 						"PPTC", 
			H323: 						"H323",
			HTTPFD: 					"HTTPFD",
			PPTP: 						"PPTP",
			L2TP:  						"L2TP",
			IPSec:                      "IPsec",
			IMAP: 						"IMAP",
			xl_others:  				"xl_sonstige",
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
			DAY: 						"Wochentag",

			MONDAY: 					"Montag",
			TUESDAY: 					"Dienstag",
			WEDNESDAY: 					"Mittwoch",
			THURSDAY: 					"Donnerstag",
			FRIDAY: 					"Freitag",
			SATURDAY: 					"Samstag",
			SUNDAY: 					"Sonntag",
			
			MON: 						"Mo",
			TUES: 						"Di",
			WED: 						"Mi",
			THUR: 						"Do",
			FRI: 						"Fr",
			SAT: 						"Sa",
			SUN: 						"So",

			JAN: 						"Jan",
			FEB: 						"Feb",
			MAR: 						"März",
			APR: 						"Apr",
			MAY: 						"Mai",
			JUN: 						"Juni",
			JUL: 						"Juli",
			AUG: 						"Aug",
			SEP: 						"Sep",
			OCT: 						"Okt",
			NOV: 						"Nov",
			DEC: 						"Dez"

		},

		HOUR: {
			AM_1: 						"1:00",
			AM_2: 						"2:00",
			AM_3: 						"3:00",
			AM_4: 						"4:00",
			AM_5: 						"5:00",
			AM_6: 						"6:00",
			AM_7: 						"7:00",
			AM_8: 						"8:00",
			AM_9: 						"9:00",
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
			PM_12: 						"0:00"
		},

		ORDER: {
			"1ST": 						"Erster",
			"2ND": 						"2.",
			"3RD": 						"3.",
			"4TH": 						"4.",
			"5TH": 						"Letzter",
			"1ST_": 					"1",

			TH: 						"."
		},

		GRID: {
			CLIENT_NUMBER: 				"Clientanzahl",

			ID: 						"Nr.",
			MODIFY: 					"Bearbeiten",
			STATUS: 					"Status",
			ENABLE: 					"Aktivieren",

			OPERATION: 					"Vorgang",
			CHOOSE: 					"Auswählen",
			DESCRIPTION: 				"Beschreibung",
			

			AUTO_REFRESH: 				"Automatisch aktualisieren",
			REFRESH: 					"Neu laden",
			NUMBER: 					"Anzahl",
			ENABLED: 					"Aktiviert",
			DISABLED: 					"Deaktiviert",
			ACTIVE: 					"Aktiv",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Hinzufügen",
			CHOOSE: 					"Auswählen",
			EDIT: 						"Bearbeiten",
			DELETE: 					"Löschen",
			DELETE_ALL: 				"Protokoll löschen",
			REMOVE: 					"Entfernen",
			RESET: 						"Zurücksetzen",
			RESET_ALL: 					"Alle zurücksetzen",
			DETECT: 					"Erkennen",
			ENABLE: 					"Aktivieren",
			DISABLE: 					"Deaktivieren",
			PAUSE:						"Pause",
			RESUME:						"Fortsetzen",
			
			REFRESH: 					"Neu laden",
			SEARCH: 					"Suchen…",
			BROWSE: 					"Durchsuchen",

			SAVE: 						"Speichern",
			BACK: 						"Zurück",

			PREV: 						"Zurück",
			NEXT: 						"Weiter",
			FINISH: 					"Fertigstellen",
			
			ON: 						"Ein",
			OFF: 						"Aus",
			LOW: 						"Niedrig",
			MIDDLE: 					"Mittel",
			HIGH: 						"Hoch",
			
			OK: 						"OK",
			CANCEL: 					"Abbrechen",

			YES: 						"Ja",
			NO: 						"Nein",
			
			CONNECTED: 					"Verbunden",
			CONNECTING: 				"Verbinden",
			DISCONNECTING: 				"Trennen",
			DISCONNECTED: 				"Getrennt",

			PASSWORD_HINT: 				"Passwort",
			FILEBUTTONTEXT: 			"Durchsuchen",
			FILEBLANKTEXT: 				"Bitte wählen Sie eine Datei aus.",
			NOSELECTEDTEXT: 			"Optionen wählen.",

			ADD_A_NEW_KEYWORD: 			"Schlüsselwort hinzufügen",

			SUCCESSED: 					"Fertig.",
			FORM_SAVED: 				"Gespeichert",
			FORM_FAILED: 				"Fehlgeschlagen",
			GRID_ID_COLUMN: 			"Nr.",
			GRID_SAVED: 				"Gespeichert",
			GRID_FAILED: 				"Fehlgeschlagen",
			GRID_NONE_SELECT: 			"Bitte wählen Sie mindestens einen Eintrag aus.",
			GRID_DELETE_COMFIRM: 		"Einträge wirklich löschen?",
			GRID_DELETE_ALL_COMFIRM: 	"Wirklich alle Einträge löschen?",
			GRID_MAX_RULES: 			"Die Liste ist voll.",
			KEYWORD_MAX_OVERFLOW: 		"Die Anzahl der Schlüsselwörter hat ihre Grenze erreicht.",

			NOTE: 						"Hinweis:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Ungültiges Format.",
			BLANKTEXT: 					"Bitte füllen Sie dieses Feld aus.",

			EMAIL: 						"Ungültige E-Mail-Adresse.",
			NUMBER: 					"Ungültiges Format.",

			NUMBER_MIN: 				"Ungültiger Wert. Bitte geben Sie einen Wert größer als %min ein.",
			NUMBER_MAX: 				"Ungültiger Wert. Bitte geben Sie einen Wert kleiner als %max ein.",

			NUMBER_MIN_MAX: 			"Ungültiger Wert. Bitte geben Sie einen Wert von %min bis %max ein.",
			HEX: 						"Bitte geben Sie hier eine Hexadezimalziffer ein.",

			IP: 						"Ungültiges Format.",

			IP_NO_ALL_ZERO:				"Die Adresse darf nicht 0.0.0.0 lauten.",
			IP_NO_LOOP:					"Die Adresse darf keine Loopback-IP-Adresse sein.",
			IP_NO_D_TYPE:				"Die Adresse darf keine Class-D-IP-Adresse sein.",
			IP_NO_E_TYPE:				"Die Adresse darf keine Class-D-IP-Adresse sein.",
			IP_NO_ALL_ONE:				"Die Adresse darf nicht 255.255.255.255 lauten.",
			IP_NO_FIRST_ALL_ONE:		"Die Adresse darf nicht mit 255 anfangen.",
			IP_NO_FIRST_ZERO:			"Die Adresse darf nicht mit 0 anfangen.",
			MASK_NO_ALL_ONE:			"Die Subnetzmaske darf nicht 255.255.255.255 lauten.",

			IPV6: 						"Ungültiges Format.",
			IPV6_NOT_GLOBAL:			"Ungültiges Format.",
			IPV6_NOT_PREFIX:			"Ungültiges Format.",
			IP_DOMAIN: 					"Ungültiges Format.",
			IPV6_DOMAIN: 				"Ungültiges Format.",
			PPTP_INVALID_IP:			"Ungültige IP-Adresse.",
			MAC: 						"Ungültiges Format.",
			MULTI_MAC:					"Ungültiges Format.",
			MAC_INVALID_BROADCAST:		"Die MAC-Adresse sollte nicht gleich der Broadcast Adresse sein.",
			MAC_INVALID_MULTICAST:		"Die MAC-Adresse sollte nicht gleich der Multicast Adresse sein.",
			DATE: 						"Ungültiges Format.",
			DATE_INVALID: 				"Bitte geben Sie ein Datum vom 1. Januar 1970 bis zum 31. Dezember 2030 ein.",
			MASK: 						"Ungültiges Format.",
			DOMAIN: 					"Ungültiges Format.",
			STRING_DOMAIN:              "Ungültiges Format.",
			USER: 						"Ungültiges Format.",
			NOTE: 						"Ungültiges Format.",
			PWD: 						"Ungültiges Format.",
			SSID: 						"Ungültiges Format.",
			NAME:						"Ungültiges Format.",
			ASCII_VISIBLE:				"Ungültiges Format.",
			STRING_VISIBLE:				"Ungültiges Format.",
			STRING_VISIBLE_NO_COMMA:    "Ungültiges Format.",
			STRING_VISIBLE_ALLOW_BLANK: "Ungültiges Format.",
			VPN_NAME_PWD: 				"Bitte geben Sie 1–15 alphanumerische Zeichen, - und _ ein."
		},


		ERROR: {			
			"00000001":					"Ungültiger Dateityp.",
			"00000002":					"Prüfsummentest negativ.",
			"00000003":					"Diese Datei ist zu groß.",
			"00000004":					"Uploadfehler.",
			"00000005":					"Rebootfehler.",
			"00000006":					"Unbekannter Fehler.",
			"00000007":					"Dieses Element existiert bereits.",

			"00000009":					"Ungültige Portangabe.",
			"00000010":					"Die Portnummer muss numerisch sein.",

			"00000011":					"Der Benutzername muss mit dem Von-Wert übereinstimmen.",
			"00000012": 				"Der Benutzername muss mit einem Buchstaben beginnen.",

			"00000021":					"Ungültiges Format.",

			"00000032": 				"Der Wert muss weniger als Niedrig sein.",
			"00000033": 				"Der Wert muss weniger als Mittel und Niedrig sein.",
			"00000034": 				"Bitte geben Sie eine Zahl von 5 bis 7200 ein.",

			"00000039": 				"Bitte verwenden Sie den Standardwert 0 oder einen im Bereich von 30 bis 86400.",
			"00000040": 				"Bitte geben Sie SSID und MAC-Adresse an.",

			"00000042": 				"Bitte verwenden Sie den Standardwert 80 oder einen im Bereich von 1024 bis 65535.",

			"00000045": 				"Standardgateway und LAN-IP-Adresse müssen im selben Subnetz liegen.",

			"00000046": 				"IP-Adress und MAC-Adresse sollte nicht leer sein. Bitte erneut eintragen.",
			"00000047": 				"IP-Adresspool and LAN-IP-Adresse müssen im selben Subnetz liegen.",

			
			"00000049":					"Ungültige Zielnetzangabe.",

			"00000050": 				"Ungültige DNS-Server-IP-Adresse.",
			"00000051": 				"Diese MAC-Adresse existiert bereits.",
			"00000052": 				"Diese IP-Adresse existiert bereits.",

			"00000053": 				"Die Startadresse darf nicht größer als die Endadresse sein.",

			"00000054": 				"IP-Adresspool and LAN-IP-Adresse müssen im selben Subnetz liegen.",

			"00000055": 				"Die eingegebene IP-Adresse darf nicht identisch mit der LAN-IP-Adresse sein.",

			"00000056": 				"Die Remote-IP-Adresse und die LAN-IP-Adresse dürfen sich nicht im selben Subnetz befinden.",

			"00000057": 				"Ungültiges PSK-Passwort.",
			"00000058": 				"Ungültiges WEP-Passwort.",

			"00000059": 				"Ungültige IP-Adresse und Subnetzmaske. Bitte tragen Sie einen gültigen Wert ein.",

			"00000060": 				"WAN- und LAN-IP-Adresse dürfen nicht im selben Subnetz liegen. Bitte ändern.",

			"00000061": 				"Die Startzeit muss vor der Endzeit liegen.",

			"00000062": 				"Bitte füllen Sie dieses Feld aus.",
			"00000063": 				"Bitte füllen Sie dieses Feld aus.",

			"00000064": 				"Diese MAC-Adresse kann nicht blockiert werden.",
			"00000065": 				"Dieses Element erzeugt einen Konflikt mit einem bestehenden.",
			
			"00000066": 				"Das Passwort muss 8 bis 63 Zeichen lang sein.",
			"00000067": 				"Das Passwort muss aus 10 Hexadezimalzeichen bestehen.,",
			"00000068": 				"Das Passwort muss aus 5 ASCII-Zeichen bestehen.,",
			"00000069": 				"Das Passwort muss aus 26 Hexadezimalzeichen bestehen.",
			"00000070": 				"Das Passwort muss aus 13 ASCII-Zeichen bestehen.",
			"00000071": 				"Das Passwort muss aus 32 Hexadezimalzeichen bestehen.",
			"00000072": 				"Das Passwort muss aus 16 ASCII-Zeichen bestehen.",
			"00000073": 				"Das Passwort muss kürzer als 64 Zeichen sein.",

			"00000074": 				"Ungültiger Dateityp.",

			"00000075": 				"Die PIN muss 8 Ziffern enthalten.",

			"00000076": 				"Dieser Eintrag erzeugt einen Konflikt mit einem bestehenden.",
			"00000077": 				"Die eingegebene IP-Adresse darf nicht identisch mit der LAN-IP-Adresse sein.",
			"00000078": 				"Die Host-IP-Adresse darf nicht mit der LAN-IP-Adresse übereinstimmen.",

			"00000080": 				"Fehler beim Bestätigen des Passworts.",

			"00000083": 				"Das Gateway kann nicht dasselbe wie die IP-Adresse sein.",
			"00000084": 				"Primärer DNS kann nicht dieselbe IP wie die IP-Adresse sein.",
			"00000085": 				"Sekundärer DNS kann nicht dieselbe IP wie die IP-Adresse sein.",
			"00000086": 				"Primär DNS kann nicht mit dem sekundären DNS übereinstimmen.",

			"00000088": 				"Dieser Vorgang ist über Fernwartung nicht möglich.",
			"00000089": 				"Ihr Login ist nun %num-mal fehlgeschlagen. Bitte warten Sie zwei Stunden und versuchen Sie es dann noch einmal.",

			"00000090": 				"Die Ziel-IP-Adresse darf nicht mit der LAN-IP-Adresse übereinstimmen.",
			"00000091": 				"Die Ziel-IP-Adresse darf nicht mit der WAN-IP-Adresse übereinstimmen.",

			"00000092": 				"Die eingegebene IP-Adresse und die LAN-IP-Adresse dürfen nicht im selben Subnetz liegen.<br/> Bitte korrigieren.",
			"00000093": 				"WAN- und LAN-IP-Adresse dürfen nicht im selben Subnetz liegen. Bitte ändern.",

			"00000094": 				"VLAN-IDs dürfen nicht mehrfach vergeben werden.",
			"00000095": 				"Es wird mindestens ein Internetport benötigt.",

			"00000096": 				"Dieses Schlüsselwort existiert bereits.",

			"00000097": 				"Die Änderungen an Ihrem 2,4GHz-WLAN werden erst wirksam, wenn Sie das WLAN aktivieren.",
			"00000098": 				"Die Änderungen an Ihrem 5GHz-WLAN werden erst wirksam, wenn Sie das WLAN aktivieren.",
			"00000099": 				"Änderungen an Ihrem 2,4- und 5GHz-WLAN werden erst wirksam, wenn die WiFi-Taste betätigt wird.",

			"00000100": 				"Die 5GHz-WLAN-Konfiguration ist an Ihrem Standort aus gesetzlichen Gründen nicht verfügbar.",
			"00002100": 				"Das 60-GHz-Netzwerk ist aufgrund von Beschränkungen in Ihrem Land/Ihrer Region nicht verfügbar.",

			"00000101": 				"Ihr WLAN ist abgeschaltet. Um diese Funktion zu nutzen, schalten Sie es bitte mittels der WiFi-Taste ein.",
			"00000102": 				"Ihr WLAN ist abgeschaltet. Um diese Funktion zu nutzen, schalten Sie es bitte mittels der WiFi-Taste ein.",
			"00002102": 				"Ihr WLAN ist abgeschaltet. Um diese Funktion zu nutzen, schalten Sie es bitte mittels der WiFi-Taste ein.",

			"00000103": 				"Ihr WLAN ist abgeschaltet. Um diese Funktion zu nutzen, schalten Sie es bitte mittels der WiFi-Taste ein.",
			"00000104": 				"Ihr WLAN ist abgeschaltet.",

			"00000105": 				"QoS und IPTV dürfen nicht zugleich aktiv sein.",

			"00000106": 				"Die eingegebene IP-Adresse darf nicht identisch mit der LAN-IP-Adresse sein.",
			
			"00000107": 				"Dieses Ziel existiert bereits.",

			"00000110": 				"IP-Adresse und LAN-IP-Adresse müssen sich im selben Subnetz befinden.",
			
			"00000111": 				"QoS und <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT-Boost</a> können nicht gleichzeitig verwendet werden.",
			"00000112": 				"WDS kann nur auf einem WLAN-Band zugleich  verwendet werden.",
			"00000113": 				"WDS und Gastnetz können nicht zugleich verwendet werden.",
			"00000114": 				"Traffikstatistiken und <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT-Boost</a> können nicht gleichzeitig verwendet werden.",

			"00000117": 				"Dieser Domänenname existiert bereits.",
			"00000118": 				"Die Anzahl der Domänennamen hat ihre Grenze erreicht.",
			"00000119":					"Ist NAT-Boost aktiviert, kann <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> nicht <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">verwendet werden</a>.",

			"00000120": 				"Das Passwort muss aus 5 oder 13 ASCII-Zeichen bestehen.",
			"00000121": 				"Das Passwort muss aus 10 oder 26 Hexadezimal-Zeichen bestehen.",
			"00000122": 				"Benutzername und/oder Passwort fehlt.Dennoch fortfahren?",
			"00000123": 				"Speichern….",
			"00000124": 				"Die WPS-PIN des Routers wurde deaktiviert, da mehrfach eine falsche PIN zur Verbindung verwendet wurde. Bitte erzeugen Sie eine neue PIN.",

			"00000125": 				"Die Anzahl der QoS-Regeln hat ihre Grenze erreicht.",
			"00000126": 				"Diese Datei ist zu groß.",
			"00000127": 				"Diese Datei enthält ungültigen Inhalt.",
			"00000128": 				"Bitte wählen Sie mindestens eine Applikation aus.",
			"00000129": 				"Bitte wählen Sie mindestens einen physischen Port aus.",
			"00000130":					"WPS ist gegenwärtig deaktiviert.",
			"00000131": 				"Die NTP-Serveradresse darf nicht die Loopback-Adresse sein.",
			"00000132": 				"Die Betriebsart konnte nicht geändert werden. Bitte versuchen Sie es später erneut oder starten Sie das Gerät neu.",
			"00000133": 				"Ungültige DMZ-Host-IP-Adresse.",
			"00000134":  				"Ungültige interne IP-Adresse.",
			"00000135": 				"Fehlerhafte Firmwaredatei.",
			"00000136": 				"Fehlerhafte Konfigurationsdatei.",
			"00000137": 				"Ungültige IP-Adresse und Subnetzmaske. Bitte tragen Sie einen gültigen Wert ein.",
			"00000139": 				"Passwortwiederherstellungsparameter fehlerhaft.",
			"00000140": 				"Falscher Code.",
			"00000141": 				"Passwortwiederherstellung ist deaktiviert.",
			"00000142": 				"Code konnte nicht gesendet werden. Bitte überprüfen Sie Ihre Internetverbindung.",
			"00000143": 				"Ungültige E-Mail-Adresse.",
			"00000144": 				"Ungültige E-Mail-Nachricht.",
			"00000145": 				"Konnte Host nicht finden.",
			"00000146": 				"Authentifizierung fehlgeschlagen.",
			"00000147": 				"Bitte geben Sie eine Portnummer von 1 bis 65535 ein.",
			"00000148": 				"Für einen Portbereich muss die Nummer des Start-Ports kleiner sein als jene des End-Ports. Bitte geben Sie sie erneut ein.",
			"00000149": 				"Port-Nummern-Überschneidung. Bitte geben Sie sie erneut ein.",
			
			"00000150": 				"Pfad nicht vorhanden.",
			"00000151": 				"Zuordnungspfad nicht gesetzt.",
			"00000152": 				"Probleme mit diesem Pfad.",
			"00000153": 				"Laufwerk nicht gefunden.",
			"00000154": 				"Kein USB-Gerät.",
			
			"00000155": 				"Die PPTP-VPN-Client-IP-Adresse und die LAN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie eine andere ein.",
			"00000156": 				"Die PPTP-VPN-Client-IP-Adresse und die OpenVPN-Client-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie eine andere ein.",
			
			"00000213":"Die DNS-Server-IP-Adresse und die LAN-IP-Adresse dürfen sich nicht im selben Subnetz befinden.",

			"00000222":  				"Maximale Einträge.",
			"00000231": 				"Doppelter Eintrag.",
			"00000232": 				"Ungültige URL.",
			"00000233":					"Bitte wählen Sie mindestens einen Tag aus",

			"00000301": 				"Maximale Anzahl an Ordnereinträgen.",
			"00000302": 				"Maximale Anzahl an Ordnereinträgen in einem Volumen.",
			"00000303": 				"Doppelter Freigabepfad.",
			"00000304": 				"Doppelter Freigabename.",

			"00001000":					"Update läuft, bitte warten.",
			"00001001": 				"WDS kann nur auf 2,4 oder 5GHz benutzt werden.",
			"00001002":					"Falscher Code.",

			"00001123": 				"Die Eingabe ist leer, bitte setzen Sie mindestens eine Regel.",
			"00001124": 				"Die Eingabe für den Port ist leer, bitte setzen Sie mindestens eine Regel.",

            "00002000": 				"Dieser Eintrag steht im Konflikt mit der statischen Route des ISP, wollen Sie wirklich fortfahren?",

            "00003000":                 "IPv6-Passthrough steht im Konflikt mit IPTV! Falls Sie diese Funktion nutzen möchten, schalten Sie bitte IPTV aus.",
			"00004139": 				"Keine Internetverbindung",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Anforderungs-Zeitüberschreitung. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es später erneut.",
			"00004141": 				"Unbekannter Fehler.",
			"00004142": 				"Falscher Bestätigungscode.",
			"00004143": 				"Ungültiges Passwort.",
			"00004144": 				"Benutzername ist bereits vorhanden.",
			"00004145": 				"Ungültiges Passwort.",//new password
			"00004146": 				"Die Bindung für dieses Gerät kann nicht aufgehoben werden. Bitte versuchen Sie es später erneut.",
			"00004147": 				"Dieses Gerät wurde an ein anderes Konto gebunden.",
			"00004148": 				"Ungültige Eingabe.",
			"00004149": 				"Dieser Domain-Name ist bereits vorhanden.",
			"00004150": 				"Die Firmware kann nicht heruntergeladen werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es später erneut.",
			"00004151": 				"Es dürfen maximal 1000 Domain-Namen vom selben Cloud-Konto registriert werden.",
			"00004152": 				"Dieses Gerät wurde an einen anderen Domain-Namen gebunden.",
			"00004153": 				"Dieser Domain-Name wurde an ein anderes Gerät gebunden.",
			"00004154": 				"Keine Antwort vom Server. Bitte versuchen Sie es später erneut.",
			"00004155": 				"Konto nicht vorhanden.",
			"00004156": 				"Cloud-Anwendung kann nicht gestartet werden. Bitte starten Sie dieses Gerät neu, und versuchen Sie es später erneut.",
			"00004157": 				"Verbindung mit dem Cloud-Server kann nicht hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es später erneut.",
			"00004158": 				"Der WAN-Port ist abgesteckt.",
			"00004159": 				"Keine Verbindung zum Internet möglich. Bitte wenden Sie sich an Ihren Internetanbieter, oder versuchen Sie es später erneut. ",
			"00004160": 				"IP-Adresse vom DHCP-Server konnte nicht abgerufen werden. Bitte überprüfen Sie den WAN-Verbindungstyp, oder versuchen Sie es später erneut.",
			"00004161": 				"PPPoE-Authentifizierung fehlgeschlagen. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.",
			"00004162": 				"Verbindung mit PPPoE-Server kann nicht hergestellt werden.",
			"00004164": 				"PPTP-Authentifizierung fehlgeschlagen. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.",
			"00004165": 				"Verbindung mit PPTP-Server kann nicht hergestellt werden.",
			"00004167": 				"L2TP-Authentifizierung fehlgeschlagen. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.",
			"00004168": 				"Verbindung mit dem L2TP-Server kann nicht hergestellt werden.",
			"00004169": 				"Unbekannter Fehler. Bitte versuchen Sie es später erneut.",
			"00004170": 				"Der WAN-Port ist abgesteckt.",
			"00004171": 				"Keine Internetverbindung.",
			"00004172": 				"Verbindungsfehler.",
			"00004173": 				"Falsche Zugangsdaten",
			"00004174": 				"Ungültige E-Mail-Adresse.",
			"00004175": 				"Ungültiges Benutzername-Format.",
			"00004176": 				"E-Mail-Adresse bereits vorhanden",
			"00004177": 				"Auf die Kontoinformationen konnte nicht zugegriffen werden. Bitte aktualisieren Sie die Seite.",
			"00004178":   				"Systemfehler. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",
			"00004179":   				"Dieses Gerät kann nicht gebunden werden. Bitte versuchen Sie es später erneut.",
			"00004180":   				"Die Bindung dieses Geräts mit diesem Cloud-Konto wurde aufgehoben. Bitte melden Sie sich mit Ihrem Konto erneut an, um das Gerät an Ihr Konto zu binden.",
			"00004181":   				"Das Gerät ist offline. Bitte prüfen Sie Ihre Interneteinstellungen.",
			"00004182":   				"Die E-Mail konnte nicht versandt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
			"00004183":   				"Account should contain to characters. ",
			"00004184":   				"Sie haben dieses Passwort bereits 20 Mal falsch eingegeben. Bitte versuchen Sie es in 2 Stunden wieder.",
			"00004185":   				"Sie haben den Überprüfungscode in 1 Stunde bereits 10 Mal erhalten. Bitte versuchen Sie es in 24 Stunden wieder.",
			"00004186":   				"Ihr Konto kann leider nicht aktiviert werden. Bitte senden Sie die Bestätigungs-E-Mail erneut.",
			"00004187":   				"Dieser Link ist leider nicht mehr aktuell. Bitte senden Sie die Bestätigungs-E-Mail erneut.",
			"00004188":   				"Dieser Link ist leider nicht mehr aktuell. Bitte senden Sie die E-Mail erneut.",
			"00004189":   				"Ihr Passwort kann leider nicht zurückgesetzt werden. Bitte senden Sie die E-Mail erneut.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Firmware-Upgrade-Fehler.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Status",
			NETWORK: 					"Netz",
			NETWORK_MAP: 				"Netzplan",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP-Server",
			DYNAMIC_DNS: 				"Dynamisches DNS",
			ADVANCED_ROUTING: 			"Erweitertes Routing",

			WIRELESS: 					"WLAN",
			WIRELESS_SETTINGS: 			"WLAN-Einstellungen",
			WDSBRIDGING: 				"WDS-Bridging",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC-Adressfilterung",
			WIRE_STATISTICS: 			"Statistiken",
			
			
			GUEST_NETWORK: 				"Gastnetz",
			WIRELESS_SETTINGS: 			"WLAN-Einstellungen",
			STORAGE_SHARING: 			"Datenträgerfreigabe",
			NAT_FORWARDING: 			"NAT",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Virtuelle Server",
			PORT_TRIGGERING: 			"Port-Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB-Einstellungen",
			BASIC_SET: 					"Grundeinstellungen",
			DISK_SET: 					"Geräteeinstellungen",
			FOLDER_SHARING: 			"Freigaben",
			STORAGE_SHARING: 			"Datenträgerfreigabe",
			FTP_SERVER: 				"FTP-Server",
			MEDIA_SERVER: 				"Mediaserver",
			PRINT_SERVER: 				"Printserver",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Offline herunterladen",
			
			PARENTAL_CONTROL: 			"Kindersicherung",

			QOS:  						"QoS",
			DATABASE:  					"Datenbank",

			STREAMBOOST: 				"Stream-Boost",
			MAP: 						"Abbildung",
			SB_MAP: 					"Abbildung",
			SB_BANDWIDTH:  				"Datenrate",
			SB_PRIORITY: 				"Priorität",
			SB_STATISTICS: 				"Statistiken",

			
			SECURITY: 					"Sicherheit",
			SETTINGS: 					"Einstellungen",
			ACCESS_CONTROL: 			"Kindersicherung",
			IP_MAC_BINDING: 			"IP-/MAC-Adr.-Bdg.",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Systemtools",
			TIME_SETTINGS: 				"Uhrzeiteinstellungen",
			DIAGNOSTIC: 				"Diagnose",
			FIRMWARE_UPGRADE: 			"Firmware-Upgrade",
			BACKUP_RESTORE: 			"Konfigurationsmenü",
			ADMINISTRATION: 			"Verwaltung",
			SYSTEM_LOG: 				"Systemprotokoll",
			STATISTICS: 				"Trafficstatistiken",
			SYSTEM_PARAMETERS: 			"Systemparameter",
			VPN: 						"VPN-Server",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP-VPN",
			VPN_CONNECTIONS: 			"VPN-Verbindungen"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Region und Zeitzone",
			INTERNET_CONNECTION_TYPE: 	"Internetverbindungstyp",
			WIRELESS_SETTINGS: 			"WLAN-Einstellungen",
			SUMMARY: 					"Zusammenfassung",
			SETUP_COMPLETE: 			"Internetverbindung testen.",

			EXIT: 						"Schließen",
			NEXT: 						"Weiter",
			SAVE: 						"Speichern",
			FINISH: 					"Fertigstellen",
			OK: 						"OK",
			NONE: 						"Erkennung fehlgeschlagen.",

			REGION: 					"Region",
			TIME_ZONE: 					"Zeitzone",
			NO_SELECT: 					"Optionen wählen.",

			AUTO_DETECT: 				"Automatische Erkennung",
			DYNAMIC_IP: 				"Dynamische IP-Adresse",
			STATIC_IP: 					"Statische IP-Adresse",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Sind Sie sich bezüglich Ihres Internetverbindungstyps unsicher, verwenden Sie die automatische Erkennung oder fragen Sie Ihren Internetdiensteanbieter.",

			DYNAMIC_IP_INFO: 			"Falls ihr Internetdienstanbieter den Internetzugang nur für eine spezifische MAC-Adresse freigibt, müssen Sie die MAC-Adresse des Hauptcomputers klonen. Falls Sie sich unsicher sind, wählen Sie bitte: <strong> MAC-Adresse nicht klonen </strong>",
			MAC_CLONE_NO: 				"MAC-Adresse NICHT klonen",
			MAC_CLONE_YES: 				"MAC-Adresse des aktuellen Computers auf den WAN-Port klonen",
			MAC_CLONE_NOTE: 			"Klonen Sie die MAC-Adresse, stellen Sie sicher, dass Sie den Computer mit der bei Ihrem Internetdiensteanbieter registrierten MAC-Adresse benutzen. Klicken Sie dann Weiter.",

			PPPOE_INFO: 				"Bitte geben Sie hier Ihre PPPoE-Zugangsdaten ein",
			
			STATIC_IP_INFO: 			"Bitte geben Sie hier Ihre IP-Konfiguration ein.",

			L2TP_INFO: 					"Bitte geben Sie hier Ihre L2TP-Zugangsdaten ein",
			PPTP_INFO: 					"Bitte geben Sie hier Ihre PPTP-Zugangsdaten ein",
			
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			SERVER_IP_ADDRESS_NAME: 	"IP-Adresse/Domänenname des VPN-Servers",
			IP_ADDRESS: 				"IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			DEFAULT_GATEWAY: 			"Standardgateway",
			PRIMARY_DNS: 				"Haupt-DNS-Server",
			SECOND_DNS: 				"Backup-DNS-Server",
			OPTIONAL: 					"(optional)",
			
			ON: 						"Ein",
			OFF: 						"Aus",
			WIRELESS_24GHZ: 			"2,4GHz-WLAN",
			WIRELESS_5GHZ: 				"5GHz-WLAN",
			WIRELESS_60GHZ: 				"60 GHz WLAN",
			ENABLE_WIRELESS_RADIO: 		"WLAN aktivieren",
			NAME_SSID: 					"WLAN-Name (SSID)",

			SUMMARY_INFO1: 				"Bevor Sie Weiter klicken, verbinden Sie sich bitte mittels Ihrer neuen Zugangsdaten mit Ihrem WLAN.",
			SUMMARY_INFO2: 				"Ihr WLAN-Name und -Passwort wurden auf folgende Werte geändert",
			SUMMARY_INFO3: 				"Stellen Sie sicher, dass Sie über diese Parameter verbunden sind.",

			WIRELESS_24GHZ_SSID: 		"Name des 2,4GHz-WLANs",
			WIRELESS_24GHZ_PASSWORD: 	"Passwort des 2,4GHz-WLANs",
			WIRELESS_5GHZ_SSID: 		"Name des 5GHz-WLANs",
			WIRELESS_5GHZ_PASSWORD: 	"Passwort des 5GHz-WLANs",
			WIRELESS_60GHZ_SSID: 		"WLAN 60 GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"WLAN 60 GHz Passwort",

			SORRY: 						"Fehlgeschlagen.",
			SUCCESS: 					"Internetverbindung erfolgreich",
			TEST_INTERNET_SUCCESS_INFO: "Erfoglreich abgeschlossen. Klicken Sie Fertigstellen, um den Schnellinstallationsassistenten zu schließen.",

			TEST_INTERNET_FAILED_INFO_0:"Bitte stellen Sie sicher, dass alle während der Schnellinstallation vergebenen Parameter korrekt sind. Haben Sie keinen Internetzugriff, starten Sie Ihr Modem neu, warten Sie 2 Minuten und klicken Sie nochmals \"Internetverbindung testen\". Haben Sie kein Modem, kann es erforderlich sein, Ihren Internetdiensteanbieter um Hilfe zu bitten.",
			SUMMARY_INFO4: 				"Vorsicht! Es scheint, als haben Sie sich noch nicht mittels Ihrer neuen WLAN-Zugangsdaten verbunden. Bitte holen Sie dies nach und klicken Sie dann OK.",
                                         
			CONGRATULARIONS: 			"Fertig!",
			COMPLETE_INFO_0: 			"Der Schnellinstallationsvorgang ist beendet.",
			COMPLETE_INFO_1:			"Klicken Sie unten Internetverbindung testen, dann Fertigstellen.",
			TEST_INTERNET: 				"Internetverbindung testen",

			
			RESET_USER_TITLE: 			"Benutzername/Passwort ändern",
			NEW_USERNAME: 				"Neuer Benutzername",
			NEW_PASSWORD: 				"Neues Passwort",
			CONFIRM_PASSWORD: 			"Neues Passwort bestätigen",
			CONFIRM: 					"Bestätigen"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Internetverbindungsstatus",

			GHZ24: 						"2,4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60 GHz",
			
			CONNECTION_TYPE: 			"Verbindungstyp",
			SECONDARY_CONN: 			"Zweitverbindung",

			POOR_CONNECTED: 			"Offline",
			UNPLUGGED: 					"keine WAN-Verbindung",
			
			CONNECTED: 					"Verbunden",
			DISCONNECTED: 				"Getrennt",
			CONNECTING: 				"Verbinden",

			INTERNET_IP_ADDR: 			"IP-Adresse",
			
			IP_ADDR: 					"IP-Adresse",
			MAC_ADDR: 					"MAC-Adresse",
			GATEWAY: 					"Gateway",

			AUTO: 						"Automatisch",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"WLAN-Teilnehmer",
			HOST_CLIENTS: 				"Hauptnetz",
			GUEST_CLIENTS: 				"Gastnetz",
			WIRE_CLIENTS: 				"Kabelgebundene Teilnehmer",
			PRINTER: 					"Drucker",
			USB_DISK: 					"USB-Datenträger",
			WIRELESS: 					"WLAN",
			NAME: 						"Name",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanal",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"2,4GHz-WLAN",
			WIRELESS_5GHZ: 				"5GHz-WLAN",
			WIRELESS_60GHZ:				"60 GHz WLAN",
			
			GUEST_24GHZ: 				"2,4GHz-Gastnetz",
			GUEST_5GHZ: 				"5GHz-Gastnetz",
			
			STATUS: 					"Status",
			TOTAL: 						"Gesamt",
			AVAILABLE: 					"Verfügbar",
			GB: 						"GB",
			BRAND: 						"Name",

			DYNAMIC_IP: 				"Dynamische IP-Adresse",
			STATIC_IP: 					"Statische IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-Kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-Tunnel",
			NONE: 						"Nicht vorhanden"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Automatische Erkennung",
			INTERNET_CONN_TYPE: 		"Internetverbindungstyp",
			DYNAMIC_IP: 				"Dynamische IP-Adresse",
			STATIC_IP: 					"Statische IP-Adresse",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond-Kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Nicht angeschlossen",
			NONE: 						"Nicht vorhanden",
			DETECT_FAIL: 				"Automatische Erkennung fehlgeschlagen.",
			SECONDARY_CONN: 			"Zweitverbindung",

			DYNAMIC_YES: 				"MAC-Adresse NICHT klonen",
			DYNAMIC_NO: 				"MAC-Adresse des aktuellen Computers auf den WAN-Port klonen",
			
			IP_ADDR: 					"IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			DEFAULT_GATEWAY: 			"Standardgateway",
			PRIMARY_DNS: 				"Haupt-DNS-Server",
			SECOND_DNS: 				"Backup-DNS-Server",
			OPTIONAL: 					"(optional)",
			USER_NAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			SERVER_IP_ADDR_NAME: 		"IP-Adresse/Domänenname des VPN-Servers",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Sind Sie sich bezüglich Ihres Internetverbindungstyps unsicher, verwenden Sie die automatische Erkennung oder fragen Sie Ihren Internetdiensteanbieter."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"WLAN-Einstellungen",
			MODE_2G: 					"2,4GHz-WLAN",
			MODE_5G: 					"5GHz-WLAN",
			MODE_60G: 					"60 GHz WLAN",
			WIRELESS_NETWORK_NAME: 		"WLAN-Name (SSID)",
			WIRELESS_PASSWORD: 			"Passwort",
			ENABLE_WIRELESS: 			"WLAN aktivieren",
			SAVE: 						"Speichern",
			ENCRYPTION_2G_NOTICE:		"Das 2,4GHz-WLAN ist mit %s verschlüsselt.",
			ENCRYPTION_5G_NOTICE:		"Das 5GHz-WLAN ist mit %s verschlüsselt.",
			ENCRYPTION_60G_NOTICE:		"Die 60-GHz-Verschlüsselung ist %s.",
			ENCRYPTION_2G_NO: 			"Das 2,4GHz-WLAN ist nicht verschlüsselt.",
			ENCRYPTION_5G_NO: 			"Das 5GHz-WLAN ist nicht verschlüsselt.",
			ENCRYPTION_60G_NO: 			"Das 60-GHz-WLAN ist nicht verschlüsselt.",
			ENCRYPTION_NO: 				"Ungesicherte WLAN Netzwerke können ein Sicherheitsrisiko sein.",
			ENCRYPTION_SURE: 			"Fortfahren?",
			HIDE_SSID: 					"SSID verbergen"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Grundeinstellungen",
			TITIL_NEW:					"Datenträger und Benutzerkonto",
			DISK_SET:					"Geräteeinstellungen",

			SELFLY_REMOVE:				"Sicher entfernen",
			SCANING:					"Suche…",
			SCAN_RESULT:				"Es wurden %n Laufwerke gefunden",
			
			DISKS:						"Datenträger",
			USERS: 						"Benutzerkonto",
			DEVICENAME: 				"Gerätename",
			VOLUMN: 					"Partition",

			USBSPACE: 					"Belegter Speicherplatz",
			FREESPACE: 					"Freier Speicherplatz",
			STATUS: 					"Status",
			INACT: 						"Deaktivieren",
			USAGE: 						"Belegung",
			CAPACITY: 					"Kapazität",
			OPERATION: 					"Vorgang",
			
			ACC: 						"Benutzerkonten", 	 	
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			USE_LOGIN: 					"Login-User benutzen",
			SCAN: 						"Suchen",
			ENJECT_ALL: 				"Alle sicher entfernen",
			ENJECT: 					"Sicher entfernen",
			ADD_USER: 					"Benutzer anlegen",
			AUTH: 						"Privileg",


			LOCATION: 					"Standort",
			MOBILE_ISP: 				"Mobilfunkanbieter",
			DIAL_NUMBER: 				"Einwahlnummer",
			APN: 						"APN",
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			MTU_SIZE: 					"MTU-Größe",
			OPTIONAL: 					"(optional)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Kindersicherung",
			UNKNOWN: 					"Unbekannt",
			
			DEVICE_CTR: 				"Der Kindersicherung unterliegende Geräte",
			ID: 						"Nr.",
			DEVICE: 					"Gerätename",
			MAC_ADDRESS: 				"MAC-Adresse",
			TIME: 						"Zeitfenster für Internetzugriff",
			DESCRIPTION: 				"Beschreibung",
			ENABLE: 					"Aktivieren",
			ENABLE_THIS_ENTRY: 			"Diesen Eintrag aktivieren",
			OPTIONAL: 					"(optional)",
			BTN_VIEW: 					"Existierende Geräte",
			
			DEVICE_LIST: 				"Geräteliste",
			SYSTEM_TIME: 				"Systemzeit",
			
			RESTR: 						"Contentfilter",
			MODE: 						"Einschränkung",
			BLACKMODE: 					"Blacklist",
			WHITEMODE: 					"Whitelist",
			ACCESS_DEVICES_LIST: 		"Geräteliste",
			
			CHOOSE: 					"Auswählen",
			ADD_A_NEW_KEYWORD: 			"Tragen Sie ein Schlüsselwort zum Blockieren ein",
			ADD_A_NEW_DOMAIN_NAME: 		"Tragen Sie eine neue Domäne, welche Zugriff erhalten soll ein",
			
			OPT: 						"Vorgang",
			STATUS: 					"Kindersicherung",
			YOURPC:						"Ihr PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Gastnetz",
			MODE_2G: 					"2,4GHz-WLAN",
			MODE_5G: 					"5GHz-WLAN",
			WIRELESS_NETWORK_NAME: 		"WLAN-Name (SSID)",
			WIRELESS_PASSWORD: 			"Passwort",
			DYNAMIC_PASSWORD: 			"Passwort",
			ENABLE_WIRELESS: 			"Gastnetz aktivieren",
			SAVE:						"Speichern",
			HIDE_SSID: 					"SSID verbergen",
			PASSWORD_CHANGE_CYCLE: 		"Passwortaktualisierungsintervall",
			PER_DAY: 					"Täglich",
			PER_WEEK: 					"Wöchentlich",
			PER_MONTH: 					"Monatlich",
			NEVER: 						"Nie",
			UNENCRYPTED:				"Das Gast-WLAN ist unverschlüsselt. In den erweiterten Einstellungen können Sie ein Passwort setzen."
		},

		STATUS: {
			TITLE: 						"Status",
			INTERNET:					"Internet",
			WIRELESS:					"WLAN",
			LAN:						"LAN",
			USB_TITLE:					"USB-Geräte",
			PERFORMANCE: 				"Performance",
			GUEST_NETWORK: 				"Gastnetz",
			ACCESS_DEVICES: 			"Gerätezugriff",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60 GHz",

			CONNECTION_TYPE: 			"Verbindungstyp",

			MAC_ADDRESS: 				"MAC-Adresse",
			IP_ADDRESS: 				"IP-Adresse",
			RELEASE: 					"Zurückgeben",
			RENEW: 						"Erneuern",
			
			DYNAMIC_IP: 				"Dynamische IP-Adresse",
			STATIC_IP: 					"Statische IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-Kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-Tunnel",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Passthrough (Bridge)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Nicht vorhanden",
			
			DEFAULT_GATEWAY: 			"Standardgateway",
			DNS: 						"DNS-Server",
			MAC: 						"MAC-Adresse",
			WDS_STATUS: 				"WDS-Status",
			
			IPV6_ADDRESS: 				"IP-Adresse",
			PRIMARY_DNS: 				"Haupt-DNS-Server",
			SECOND_DNS: 				"Backup-DNS-Server",

			RADIO: 						"WLAN aktivieren",

			NAME_SSID: 					"WLAN-Name (SSID)",
			NETWORK_NAME_SSID:			"WLAN-Name (SSID)",
			HIDE_SSID: 					"SSID verbergen",
			MODE: 						"Modus",
			CHANNEL: 					"Kanal",
			CHANNEL_WIDTH: 				"Kanalbreite",
			AUTO: 						"Automatisch",
			CURRENT_CHANNEL: 			"Aktueller Kanal",

			WDS: 						"WDS-Status",
			WIRED_CLIENTS: 				"Kabelgebundene Teilnehmer",
			WIRELESS_CLIENTS: 			"WLAN-Teilnehmer",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Link-lokale Adresse",
			ASSIGN_TYPE: 				"Zugewiesener Typ",
			
			ALLOW_TO_SEE_EACH: 			"Gäste dürfen einander sehen",

			TOTAL: 						"Gesamt",
			AVAILABLE: 					"Verfügbar",

			USB: 						"USB-Datenträger",
			PRINTER: 					"Drucker",

			CPU_LOAD: 					"CPU-Last",
			MEMORY_USAGE: 				"Speichernutzung",

			IP_ADDR_P: 					"IP-Adress",
			MAC_ADDR_P: 				"MAC-Adresse",
			CONN_TYPE_P: 				"Verbindungstyp",

			DISABLED: 					"Deaktiviert",
			INIT: 						"Initialisieren",
			SCAN: 						"Suchen",
			AUTH: 						"Authorisieren",
			ASSOC: 						"Assoziieren",
			RUN: 						"Läuft",
			HOST: 						"WLAN-Gerät",
			GUEST: 						"Gast",

			ON: 						"Ein",
			OFF: 						"Aus"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Internetverbindungstyp",
			INTERNET_MAC_ADDRESS: 		"MAC-Adresse",
			
			CONNECT: 					"Verbinden",
			DISCONNECT: 				"Trennen",

			IP_ADDR: 					"IP-Adresse",
			
			USE_DEFAULT_MAC: 			"Standard-MAC-Adresse verwenden",
			USE_COMPUTER_MAC: 			"MAC-Adresse dieses Computers verwenden",
			USE_CUSTOM_MAC: 			"Benutzerdefinierte MAC-Adresse verwenden",
			MAC_CLONE: 					"MAC-Adresse klonen",
			
			CONFIG: 					"Konfigurieren",
			
			IP_ADDRESS: 				"IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			DEFAULT_GATEWAY: 			"Standardgateway",
			
			MANUAL_DNS: 				"Manuell definierter DNS-Server",
			PRIMARY_DNS: 				"Haupt-DNS-Server",
			SECOND_DNS: 				"Backup-DNS-Server",
			
			RENEW: 						"Erneuern",
			RELEASE: 					"Zurückgeben",
			VIEW_MODE: 					"Ansichtsmodus",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Dynamisch vom Internetdiensteanbieter beziehen",
			USE_FOLLOW_IP_ADDR: 		"Folgende IP-Adresse verwenden",
			USE_FOLLOW_DNS_ADDR: 		"Folgende DNS-Serveradressen benutzen",
			USE_FOLLOW_DNS_SERVER: 		"Folgende DNS-Server verwenden",
			
			BASIC: 						"Grundeinstellungen",
			ADVANCED: 					"Erweitert",
			
			DNS_ADDR_MODE: 				"DNS-Serveradresse",
			MTU_SIZE: 					"MTU-Größe",
			MTU_1500: 					"Byte. (Standardwert: 1500, bitte nur ändern, wenn erforderlich)",
			MTU_1480: 					"Byte. (Standardwert: 1480, bitte nur ändern, wenn erforderlich)",
			MTU_1460: 					"Byte. (Standardwert: 1460, bitte nur ändern, wenn erforderlich)",
			MTU_1420: 					"Byte. (Standardwert: 1420, bitte nur ändern, wenn erforderlich)",
			
			HOST_NAME: 					"Hostname",

			HOST_NAME_CONFIRM: 			"Der Hostname enthält unzulässige Zeichen, die unerwartete Fehler verursachen können. Fortfahren?",

			GET_IP_WITH_UNICAST_DHCP: 	"IP-Adresse über Unicast abrufen (normalerweise nicht erforderlich)",
			OPTIONAL: 					"(optional)",
			
			STATIC_IP: 					"Statische IP-Adresse",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6:					"Automatisch",
			
			USER_NAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			
			INTERNET_IP_ADDR: 			"IP-Adresse",
			INTERNET_DNS: 				"Internet-DNS-Server",
			SECONDARY_CONN: 			"Zweitverbindung",
			NONE: 						"Nicht vorhanden",
			INTERNET_PRIMARY_DNS:		"Haupt-DNS-Server",
			INTERNET_SECONDARY_DNS: 	"Backup-DNS-Server",
			
			DYNAMIC_IP: 				"Dynamische IP-Adresse",
			DYNAMIC_IP_v6: 				"Dyn. IP-Adr. (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Dienstname",
			ACCESS_CONCENTRATOR_NAME:  	"Name des Access Concentrators",
			DETECT_ONLINE_INTERVAL: 	"Intervall für Online-Erkennung",
			INTERVAL_TIPS: 				"Sekunden (0..120, Standardwert: 10).",
			IP_ADDR_MODE:  				"IP-Adresse",
			CONN_MODE: 					"Verbindungsmodus",
			DHCP_LINK_UNPLUGGED: 		"WAN-Port nicht verbunden.",
			
			AUTO: 						"Automatisch",
			ON_DEMAND: 					"Bei Bedarf",
			TIME_BASED: 				"Zeitbasierend",
			MANUALLY: 					"Manuell",
			MAX_IDLE_TIME: 				"Maximale Leerlaufzeit",
			MAX_IDLE_TIME_TIPS: 		"Minuten. (0 bedeutet dauerhafte Aktivität)",
			PERIOD_OF_TIME: 			"Zeitraum",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond-Kabel",
			AUTH_SERVER: 				"Authentifizierungsserver",
			AUTH_DOMAIN: 				"Authentifizierungsdomäne",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"IP-Adresse/Domänenname des VPN-Servers",
			PPTP: 						"PPTP",
			TO: 						"An",
			
			TUNNEL_6TO4: 				"6to4-Tunnel",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Nicht-temporäre IPv6-Adresse abrufen",
			GET_PREFIX_DELEGATION: 		"IPv6-Präfixdelegation beziehen",
			IPV6_ADDR: 					"IPv6-Adresse",

			GET_IPV6_WAY: 				"IPv6-Adresse abrufen",
			AUTOMATICALLY:              "Automatisch beziehen",
			SPECIFIED_BY_ISP: 			"Vom ISP angegeben",

			IPV6_ADDR_PREFIX: 			"IPv6-Adresspräfix",
			NONE_TEMPORARY: 			"Nicht-temporär",

			PREFIX_DELEGATION: 			"Präfix-Delegation",
			ENABLE:                     "Aktivieren",
			DISABLE:                    "Deaktivieren",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4-Maskenlänge",
			CONFIG_TYPE: 				"Konfigurationstyp",
			RD6_PREFIX: 				"6RD-Präfix",
			RD6_PREFIX_LENGTH: 			"6RD-Präfixlänge",
			REPLY_IPV4_ADDR: 			"Border-Reply-IPv4-Adresse",
			MANUAL: 					"Manuell",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Passthrough (Bridge)",
			LOCAL_IPV6: 				"Lokale IPv6-Adresse",
			PEER_IPV6: 					"Peer-IPv6-Adresse",
			TUNNEL_ADDR: 				"Tunneladresse",
			IPV4_NETMASK: 				"IPv4-Netzmaske",
			CUSTOM: 					"Benutzerdefiniert",
		    AFTR_NAME: 					"AFTR-Name",
			PPP_SHARE_V6:				"Gleiche PPPoE-Session wie bei der IPv6-Verbindung",
			PPP_SHARE_V4:				"Gleiche PPPoE-Session wie bei der IPv4-Verbindung",


			
			
			IPV4_ADDR: 					"IPv4-Adresse",
			IPV4_MASK: 					"IPv4-Subnetzmaske",
			IPV4_GATEWAY: 				"IPv4-Standardgateway",

			DUPLEX: 					"Duplex",
			AUTO_NEGOTIATION: 			"Autoabstimmung",
			FULL_DUPLEX_1000: 			"1000Mbps, Vollduplex",
			HALF_DUPLEX_1000:			"1000Mbps, Halbduplex",
			FULL_DUPLEX_100: 			"100Mbps, Vollduplex",
			HALF_DUPLEX_100: 			"100Mbps, Halbduplex",
			FULL_DUPLEX_10: 			"10Mbps, Vollduplex",
			HALF_DUPLEX_10: 			"10Mbps, Halbduplex"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN-IPv4",
			LAN_IPv6: 					"LAN-IPv6",

			MAC_ADDRESS: 				"MAC-Adresse",
			IP_ADDRESS: 				"IP-Adresse",
			SUBNET_MASK: 				"Subnetzmaske",
			CUSTOM: 					"Benutzerdefiniert",

			IGMP: 						"IGMP-Proxy aktivieren",
			


			ASSIGNED_TYPE: 				"Zugewiesener Typ",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC + Zustandsloses DHCP",
			RDNSS: 						"SLAAC + RDNSS",

			PREFIX: 					"Adressenpräfix",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adresse",
			DELEFATED: 					"Delegiert",
			STATIC: 					"Statisch",
			SITE_PREFIX: 				"Site-Präfix",
			SITE_PREFIX_LEN: 			"Site-Präfixlänge",

			PREFIX_TYPE:  				"Site-Präfixkonfigurationstyp",
			LAN_IPV6_ADDR:  			"LAN-IPv6-Adresse",

			RELEASE_TIME: 				"Adresshaltezeit",
			RELEASE_TIME_TIP: 			"Sekunden (Standardwert: 86400, bitte nur ändern, falls erforderlich)",
			ADDRESS:					"Adresse",
			SAVE: 						"Speichern",

			REBOOT_TIP: 				"Der Router leitet Sie auf die Login-Seite weiter.<br/>Bitte warten…"

		},

		IPTV:{
			TITLE: 						"Einstellungen",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "IPTV aktivieren", 
			MODE:  						"Modus",
			IGMP_PROXY: 				"IGMP-Proxy",
			IGMP_VERSION: 				"IGMP-Version",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bridge",
			BASIC: 						"Benutzerdefiniert",
			EXSTREAM: 					"Singapur-ExStream",
			RUSSIA:  					"Russland",
			UNIFY:  					"Malaysia-Unifi",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-Telefon", 

			Q_TAG: 						"802.1Q-Tag",
			ENABLE: 					"Aktivieren",
			
			INTERNET_VLAN_ID: 			"Internet-VLAN-ID",
			INTERNET_VLAN_PRIORITY: 	"Internet-VLAN-Priorität",
			IP_PHONE_VLAN_ID: 			"IP-Telefon-VLAN-ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-Telefon-VLAN-Priorität",
			IPTV_VLAN_ID: 				"IPTV-VLAN-ID",
			IPTV_VLAN_PRIORITY: 		"IPTV-VLAN-Priorität",
			IPTV_MULTI_VLAN_ID: 		"IPTV-Multicast-VLAN-ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV-Multicast-VLAN-Priorität"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP-Server",
			
			SETTINGS: 					"Einstellungen",

			DHCP_SERVER: 				"DHCP-Server",
			ENABLE_DHCP_SERVER: 		"DHCP-Server aktivieren",

			IP_ADDR_POOL: 				"IP-Adresspool",
			LEASETIME: 					"Adresshaltezeit",
			LEASENOTE: 					"Minuten(2-2880. Der Standardwert ist 120).",
			
			GATEWAY: 					"Standardgateway",
			DOMAIN: 					"Standarddomäne",
			PRIMARYDNS: 				"Haupt-DNS-Server",
			SECONDARYDNS: 				"Backup-DNS-Server",

			OPTIONAL: 					"(optional)",

			CLIENTSLIST: 				"DHCP-Clientliste",
			CLIENT_NUMBER: 				"Clientanzahl",
			CLIENT_NAME: 				"Clientname",
			MAC_ADDR: 					"MAC-Adresse",
			ASSIGNED_IP: 				"Zugewiesene IP-Adresse",
			LEASE_TIME: 				"Adresshaltezeit",

			RESERVATION: 				"Adressreservierung",

			RESERVED_IP: 				"Reservierte IP-Adresse",
			IP_ADDRESS: 				"IP-Adresse",
			DESCRIPTION: 				"Beschreibung",

			CLIENTSLIST: 				"DHCP-Clientliste",
			CLIENT_NUMBER: 				"Clientanzahl",

			ENABLE: 					"Aktivieren",
			ENABLE_THIS_ENTRY: 			"Diesen Eintrag aktivieren",
			BTN_VIEW:					"Existierende Geräte"
			
		},

		DDNS: {
			DDNS: 						"Dynamisches DNS",
			SERVICEPROVIDER: 			"Service-Provider",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"DynDNS",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Zur Registrierung…",
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			DOMAIN_NAME_LIST: 			"Liste der Domänennamen",
			DOMAIN_NAME: 				"Domänenname",
			LOGIN: 						"Einloggen",
			LOGIN_SAVE: 				"Login und speichern", 
			LOGOUT: 					"Ausloggen",
			STATU_SUCCESS:				"Fertig.",
			UPDATE_INTERVAL:			"Update-Intervall",
			ONE_HOUR:					"1 Stunde",
			SIX_HOUR:					"6 Stunden",
			TWETEEN_HOUR:				"12 Stunden",
			ONE_DAY:					"1 Tag",
			TWO_DAY:					"2 Tage",
			THREE_DAY:					"3 Tage",
			NEVER:						"Nie",
			UPDATE:						"Aktualisieren",
			STATU_INCORRENT:			"Falsche Zugangsdaten",
			STATU_ERR_DOMAIN:			"Ungültiger Domänenname",
			
			STATU_NO_LAUNCH:			"Fehler",
			STATU_FAIL_DDNS: 			"Konnte DynDNS nicht aktualisieren.",
			STATU_FAIL_NOIP: 			"Konnte No-IP nicht aktualisieren.",
			STATU_CONN:					"Verbinden..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Erweitertes Routing",
			STATIC_ROUTING: 			"Statisches Routing",

			DESTINATION_NETWORK:		"Zielnetz",
			SUBNET_MASK: 				"Subnetzmaske",
			DEFAULT_GATEWAY: 			"Standard-gateway",
			DESCRIPTION: 				"Beschrei- bung",
			
			SYSTEM_ROUTING_TABLE: 		"Systemroutingtabelle",
			CLIENT_NUMBER: 				"Clientanzahl",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Schnitt-stelle",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Aktivieren",
			ENABLE_THIS_ENTRY: 			"Eintrag aktivieren"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Einstellungen",
			NOT_SUPPORT_5G: 			"Die Region unterstützt nur 2,4 GHz. Bitte wählen Sie die richtige Region.",
			NOT_SUPPORT_60G: 			"Die Region unterstützt nicht 60 GHz.",
			ENABLE_TIPS: 				"Sie sollten das WLAN aktivieren.",

			REGION: 					"Region",
			NOTICE:  					"Um WLAN zu verwenden, muss das WLAN mittels des WLAN-Schalters eingeschaltet sein.",
			
			MODE_2G:					"2,4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60 GHz",

			WIRELESS: 					"WLAN",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"WLAN aktivieren",

			WIRELESS_NETWORK_NAME: 		"WLAN-Name (SSID)",
			WIRELESS_PASSWORD: 			"Passwort",
			HIDE_SSID: 					"SSID verbergen",

			SECURITY: 					"Sicherheit",
			NO_SECURITY: 				"Nicht vorhanden",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal (empfohlen)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2-Enterprise",
			WPA2_PERSONAL: 			    "WPA2-Persönlich (empfohlen)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Version",

			AUTO: 						"Automatisch",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Verschlüsselung",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Modus",
			MODE_B:  					"Nur 802.11b",
			MODE_G:  					"Nur 802.11g",
			MODE_N:  					"Nur 802.11n",
			MODE_BG:  					"802.11b/g gemischt",
			MODE_GN: 					"802.11g/n gemischt",
			MODE_BGN:  					"802.11b/g/n gemischt",

			MODE_A_5: 					"Nur 802.11a",
			MODE_AN_5: 					"802.11a/n gemischt",
			MODE_N_5: 					"Nur 802.11n",
			MODE_AC_5:					"nur 802.11ac",
			MODE_NAC_5:					"802.11n/ac gemischt",
			MODE_ANAC_5:				"802.11a/n/ac gemischt",

			MODE_AD_60:					"Nur 802.11ad",

			CHANNEL_WIDTH: 				"Kanalbreite",
			CHANNEL: 					"Kanal",

			TRANSMIT_POWER: 			"Sendeleistung",

			RADIUS_SERVER_IP: 			"IP-Adresse des RADIUS-Servers",
			RADIUS_PORT: 				"RADIUS-Port",
			RADIUS_PASSWORD: 			"RADIUS-Passwort",

			TYPE: 						"Typ",
			OPEN_SYSTEM: 				"Offen",
			SHARED_KEY: 				"Shared-Key",

			KEY_SELECTED: 				"Ausgewählter Schlüssel",
			KEY1: 						"Schlüssel 1",
			KEY2: 						"Schlüssel 2",
			KEY3: 						"Schlüssel 3",
			KEY4: 						"Schlüssel 4",

			WEP_KEY_FORMAT: 			"WEP-Schlüsselformat",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Hexadezimal",

			KEY_TYPE: 					"Schlüsseltyp",
			BIT64: 						"64 Bit",
			BIT128: 					"128 Bit",
			BIT152: 					"152 Bit",

			KEY_VALUE: 					"Schlüssel",
			
			MHZ: 						"MHz",
			MHZ20: 						"20MHz",
			MHZ40: 						"40MHz",
			MHZ80: 						"80MHz",
			
			LOW: 						"Niedrig",
			MIDDLE: 					"Mittel",
			HIGH: 						"Hoch"
		},

		WPS: {

			TITLE2: 					"Router-PIN",
			ROUTERS_PIN_INFO: 			"Verbindung durch Eingabe der Router-PIN erlauben.",
			ENABLE_ROUTE_PIN: 			"Router-PIN",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Erzeugen",
			DFT: 						"Standard",

			TITLE: 						"WPS-Assistent",
			SELECT_SETUP: 				"Wählen Sie eine Einrichtungsmethode",
			PUSH_BTN: 					"Tastendruck (empfohlen)",
			PUSH_DES: 					"Drücken Sie am Router die WPS-Taste oder klickern Sie auf dieser Seite \"Verbinden\".",
			CONNECT: 					"Verbinden",
			CANCEL: 					"Abbrechen",

			RESULT_HEAD: 				"Das WLAN-Gerät",
			RESULT_END: 				"wurde erfolgreich zu Ihrem WLAN hinzugefügt.",
			NOT_FOUND: 					"Kein Client gefunden. Klicken Sie auf die Schaltfläche, um es erneut zu versuchen.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Nicht gefunden",
			ENTER_CLIENT_PIN: 			"PIN des Clients",
			SWITCH_NOTE:				"Um WPS zu nutzen, aktivieren Sie bitte die WLAN Funktion über den WLAN Knopf.",
			SWITCH_NOTE2:				"Um WPS zu benutzen, sollte Ihr WLAN richtig parametriert sein.",
			STATUS_PIN_ERROR: 			"Ungültige WPS-PIN? Bitte überprüfen Sie sie.",
			STATUS_ERROR: 				"Fehler.",
			STATUS_CONN_ERROR: 			"Verbindungsfehler.",
			STATUS_CONNING: 			"Verbinden...",
			STATUS_CANCEL: 				"Verbindungsvorgang abgebrochen.",
			
			NOTE: 						"Hinweis:",
			BUTTON: 					"Der WLAN Knopf ist aus",
			ENABLE: 					"Die WLAN Funktion ist nicht aktiviert",
			HIDDEN: 					"Die SSID wird versteckt",
			ENCRYPTION: 				"Verschlüsselung ist nicht korrekt konfiguriert",
			WPS: 						"WPS ist auf der Systemparameter Seite deaktiviert worden.",

			
			STATUS_CONN_OVERLAP: 		"Verbindungsfehler (OVERLAP).",
			STATUS_CONN_TIMEOUT: 		"Verbindungsfehler(TIMEOUT).",
			STATUS_CONN_INACT: 			"Verbindung inaktiv."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Verbundene WLAN-Geräte",
			CLIENT_NUMBER: 				"Clientanzahl",
			MAC_ADDRESS: 				"MAC-Adresse",
			CONN_TYPE: 					"Verbindungstyp",
			SECURITY: 					"Sicherheit",
			RECEIVED_PACKETS: 			"Empfangene Pakete",
			SEND_PACKETS: 				"Gesendete Pakete"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Einstellungen",
			
			MODE_2G: 					"2,4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Gäste dürfen einander sehen",

			ALLOW_LOCAL: 				"Gästen Zugriff auf mein lokales Netz ermöglichen",
			
			WIRELESS: 					"WLAN",
			WIRELESS_24G_RADIO: 		"2,4GHz-WLAN",
			WIRELESS_5G_RADIO: 			"5GHz-WLAN",
			ENABLE_GUEST: 				"Gastnetz aktivieren",

			NAME_SSID: 					"WLAN-Name (SSID)",
			HIDE_SSID: 					"SSID verbergen",
			PASSWORD_CHANGE_CYCLE: 		"Passwortaktualisierungsintervall",
			PER_DAY: 					"Täglich",
			PER_WEEK: 					"Wöchentlich",
			PER_MONTH: 					"Monatlich",
			NEVER: 						"Nie",
			SECURITY: 					"Sicherheit",
			NO_SECURITY: 				"Nicht vorhanden",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal",

			VERSION: 					"Version",
			AUTO: 						"Automatisch",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Verschlüsselung",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Passwort"
		},

		NAT:{
			SETTINGS: 					"Hardware-NAT",
			STATUS: 					"Hardware-NAT",
			
			ALG_TITLE: 					"Applikation-Layer-Gateway (ALG)",

			FTP_ALG: 					"FTP-ALG",
			TFTP_ALG: 					"TFTP-ALG",
			H323_ALG: 					"H323-ALG",
			RTSP_ALG: 					"RTSP-ALG",
			PPTP_ALG: 					"PPTP-Passthrough",
			L2TP_ALG: 					"L2TP-Passthrough",
			IPSEC_ALG: 					"IPsec-Passthrough",

			ENABLE_FTP_ALG: 			"FTP-ALG aktivieren",
			ENABLE_TFTP_ALG: 			"TFTP-ALG aktivieren",
			ENABLE_H323_ALG: 			"H323-ALG aktivieren",
			ENABLE_RTSP_ALG: 			"RTSP-ALG aktivieren",
			ENABLE_PPTP_ALG: 			"PPTP-Passthrough aktivieren",
			ENABLE_L2TP_ALG: 			"L2TP-Passthrough aktivieren",
			ENABLE_IPSEC_ALG: 			"IPsec-Passthrough aktivieren",
			NAT_ENABLE_NOTICE: 			"Hinweis: Ihre Konfiguration wird erst wirksam, wenn NAT aktiviert wird."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Virtuelle Server",

			SERVICE_NAME: 				"Diensttyp",
			EXTERNAL_PORT: 				"Externer Port",
			INTERNAL_IP: 				"Interne IP-Adresse",
			INTERNAL_PORT: 				"Interner Port",
			PROTOCAL: 					"Protokoll",

			BTN_VIEW: 					"Bekannte Dienste anzeigen",

			EXSITTING_SERVICE: 			"Bekannte Dienste",
			
			PROTOCAL_ALL: 				"Alle",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX oder XX)",
			EXT_PORT_TIPS: 				"(XX oder XX-XX, 1..65535)",
			INT_PORT_TIPS: 				"(XX oder freilassen, 1..65535)",

			NOTICE:						"Dieser Eintrag erzeugt einen Konflikt mit dem Fernwartungsport. Fortfahren?",
			NOTICE_INVALID_REMOTE:		"Remote Manage ist ungültig, da Port 80 in Konflikt steht. Bitte ändern Sie den Remote Management Port. ",
			NOTICE_ENTER_ANOTHER:		"Steht im Konflikt mit dem Remote Management Port. Bitte ändern Sie ihren Eintrag.",
			NOTICE_PPTP_CONFLICT:		"Im Konflikt mit dem PPTP-VPN-Port. Bitte geben Sie einen anderen Port ein.",
			NOTICE_OPENVPN_CONFLICT:	"Im Konflikt mit dem OPENVPN-Port. Bitte geben Sie einen anderen Port ein.",


			ENABLE_THIS_ENTRY: 			"Aktivieren",
			OPERATION: 					"Vorgang",
			CHOOSE: 					"Auswählen",
			NAT_ENABLE_NOTICE: 			"Hinweis: Ihre Konfiguration wird erst wirksam, wenn NAT aktiviert wird."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port-Triggering",
			APPLICATION: 				"Applikation",
			TRIGGER_PORT: 				"Triggerport",
			TRIGGER_PROTOCOL: 			"Triggerprotokoll",

			EXTERNAL_PORTS: 			"Externer Port",
			EXTERNAL_PROTOCOL: 			"Externes Protokoll",

			BTN_VIEW: 					"Bekannte Applikationen",

			EXSITTING_APPLICATION: 		"Bestehende Applikationen",
			APPLICATION_NAME: 			"Applikationsname",
			TRIGGER_TIPS: 				"(XX, 1..65535)",
			EXTERNAL_TIPS: 				"(XX oder XX-XX, 1..65535, maximal 5 Paare)",
			
			NOTICE_PPTP_CONFLICT:		"Im Konflikt mit dem PPTP-VPN-Port. Bitte geben Sie einen anderen Port ein.",
			NOTICE_OPENVPN_CONFLICT:	"Im Konflikt mit dem OPENVPN-Port. Bitte geben Sie einen anderen Port ein.",
			
			ENABLE_THIS_ENTRY: 			"Aktivieren",
			OPERATION: 					"Vorgang",
			
			PROTOCAL_ALL: 				"Alle",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Hinweis: Ihre Konfiguration wird erst wirksam, wenn NAT aktiviert wird."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"DMZ aktivieren",
			HARDWARESTATUS: 			"IP-Adresse des DMZ-Hosts",
			NAT_ENABLE_NOTICE: 			"Hinweis: Ihre Konfiguration wird erst wirksam, wenn NAT aktiviert wird."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP-Dienstliste",
			CLIENT_NUMBER: 				"Clientanzahl",
			SERVICE: 					"Dienstbeschreibung",
			EXTERNAL_PORT: 				"Externer Port",
			PROTOCAL: 					"Protokoll",
			IP_ADDR: 					"Interne IP-Adresse",
			INTERNAL_PORT: 				"Interner Port",
			NAT_ENABLE_NOTICE: 			"Hinweis: Ihre Konfiguration wird erst wirksam, wenn NAT aktiviert wird."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB-Modem",
			LOCATION: 					"Standort",
			MOBILE_ISP: 				"Mobilfunkanbieter",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Verbindungsmodus",
			CONNECT_ON_DEMAND: 			"Verbinden bei Bedarf",
			CONNECT_AUTOMATICALLY: 		"Automatisch verbinden",
			CONNECT_MANUALLY: 			"Manuell verbinden",
			MAX_IDLE_TIME: 				"Maximale Leerlaufzeit",
			CONNECTION_TIP: 			"Der aktuelle Internetzugangsmodus ist WAN bevorzugt.",
			IDLE_TIME_TIP: 				"Verbindungsmodus und Maximale Leerlaufzeit konnten nicht manuell gesetzt werden.",
			MINUTES: 					"Minuten (0 bedeutet immer online).",

			AUTHENTICATION_TYPE: 		"Authentifizierungstyp",
			AUTO: 						"Automatisch",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Der Standardwert ist Auto, bitte nur ändern, falls erforderlich.",

			CONNECT: 					"Verbinden",
			DISCONNECT: 				"Trennen",

			SET_TIP: 					"Einwahlnummer, APN, Benutzernamen und Passwort manuell setzen.",
			DIAL_NUMBER: 				"Einwahlnummer",
			APN: 						"APN",
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			OPTIONAL: 					"(optional)",
			MTU_SIZE: 					"MTU-Größe (in Byte)",
			MTU_SIZE_TIP: 				"Byte. (Standardwert: 1480, bitte nur ändern, wenn erforderlich)",

			USE_FOLLOW_DNS_SERVER: 		"Folgende DNS-Serveradressen benutzen",
			PRIMARY_DNS: 				"Haupt-DNS-Server",
			SECOND_DNS: 				"Backup-DNS-Server",

			UNPLUGGED: 					"Nicht angeschlossen",
			IDENTIFYING: 				"Identifizierung…",
			IDENTIFY_SUCCESS: 			"Erfoglreich identifiziert."
		},

		DISK_SETTING: {
			DISK_SET: 					"Geräteeinstellungen",
			SCAN: 						"Suchen",
			SELFLY_REMOVE: 				"Sicher entfernen",
			SCAN_RESULT: 				"Es wurden %n Laufwerke gefunden",
			NOT_FOUND: 					"Nicht gefunden",
			SELFLY_REMOVE: 				"Sicher entfernen",
			
			VOLUMN: 					"Partition",
			CAPACITY: 					"Kapazität",
			FREESPACE: 					"Freier Speicherplatz",
			USBSPACE: 					"Belegter Speicherplatz",
			
			STATUS: 					"Status",
			INACT: 						"Deaktivieren",
			ACTIVE: 					"Aktiv",
			
			USAGE: 						"Belegung",
			CAPACITY: 					"Kapazität",
			OPERATION: 					"Vorgang",	
			
			ACC: 						"Benutzerkonten", 	 	
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			USE_LOGIN: 					"Login-User benutzen",
			SCAN: 						"Suchen",
			ENJECT_ALL: 				"Alle sicher entfernen",
			ENJECT: 					"Sicher entfernen",
			ADD_USER: 					"Benutzer hinzufügen",
			AUTH: 						"Privileg"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline herunterladen",
			ITEMS:						"Elemente",
			FILE:						"Datei",
			FOLDER:						"Ordner",
			SIZE:						"Größe",
			STATUS:						"Status",
			DOWNLOAD:					"Download",
			REMAINTING:					"Restzeit",
			SPEED:						"Geschwindigkeit",
			SOURCE:						"Quelle",	
			DOWNLOADTO:					"Herunterladen nach",	
			TORRENT_PC:					"Torrent vom PC",
			TORRENT_USB:				"Torrent von USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule-TCP-Port",
			AMULEUDP:					"aMule-UDP-Port",
			AMULESERVER:				"aMule-Server",
			SCHEDULE:					"Zeitplan",
			MAXACTIVE:					"Maximale Anzahl der aktiven Aufgaben",
			MAXACTIVENUM:				"(1–10)",
			TIMEZONE:					"Zeitzone",
			DOWNLOADTIME:				"Downloadzeit",
			REPEAT:						"Wiederholen",
			SPEEDLIMIT:					"Geschwindigkeitsbegrenzung",
			MAXDOWNLOAD:				"Maximale Downloadgeschwindigkeit",
			MAXUPLOAD:					"Maximale Uploadgeschwindigkeit",
			SPEEDTIPS:					"(0 bedeutet unbegrenzt)",
			BTPORT:						"BT-Download-Port",
			SEED:						"auch nach Abschluss des Downloads",
			UNIT:						"KB/S",
			MODIFY:						"Bearbeiten",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrent-Standort",
			CONNECT:					"Verbunden",
			DISCONNECTED:				"Getrennt",
			CONNECTING:					"Verbinden",
			GENERAL:					"Allgemeines",
			COMPLETED:					"Abgeschlossen",
			NEWDEVICE:					"Neues Gerät",
			FOUNDUSB:					"Neues USB entdeckt",
			CONNECTEDPEERS:				"Verbundene Peers",
			OF:							"von",
			NUM_OF_CON:					"Anzahl der Verbindungen",
			NUM_OF_CON_G:				"Globale maximale Anzahl der Verbindungen",
			NUM_OF_CON_PT:				"Maximale Anzahl der verbundenen Peers pro Torrent",
			EN_DHT_NET:					"DHT-Netzwerk aktivieren",
			EN_PE_EX:					"Peer-Exchange aktivieren",
			EN_BT:						"BitTorrent-Protokollverschlüsselung aktivieren",
			GENERAL_SETTINGS:			"Allgemeine Einstellungen",
			BT_SETTINGS:				"BT-Einstellungen",
			AMULE_SETTINGS:				"aMule-Einstellungen",
			CLEAN:						"Entfernen abgeschlossen",
			NONE_COMPLETE: 				"Keine abgeschlossene Aufgabe."
		},

		FOLDER: {
			TITLE: 						"Freigabeeinstellungen",
			ACCOUNT_TITLE: 				"Benutzerkonto",
			ACCOUNT:					"Konto",
			AC_NOTE: 					"Hier können Sie für Ihre Freigaben Benutzerkonten anlegen oder einfach das Standard-Loginkonto benutzen.",
			
			AC_LOGIN: 					"Standardkonto verwenden",
			AC_FOLLOW: 					"Neues Konto verwenden",

			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",
			CONFIRM: 					"Passwort bestätigen",

			SHARING_SETTING: 			"Freigabeeinstellungen",
			SERVER_NAME: 				"Servername",

			METHOD: 					"Zugriffsmethode",
			LINK: 						"Link",
			PORT: 						"Port",

			NETWORK_NEIGHBORHOOD: 		"Samba/UNC",
			FTP: 						"FTP",
			FTPEX: 						"FTP (über Internet)",

			SHARE_FOLDER: 				"Ordnerfreigabe",
			SHAREING_ALL: 				"Komplett freigeben",
			NOTE:  						"Einschalten, um den ganzen Datenträger freizugeben oder ausschalten, um einzelne Ordner separat freizugeben.", 
			ENABLE_AUTHENTICATION: 		"Authentifizierung aktivieren",
			SHAREING_FOLDER: 			"Ordnerfreigabe",
			
			SHARE_NAME: 				"Ordnername",
			FOLDER_PATH: 				"Ordnerpfad",
			VOLUMN_NAME: 				"Datenträger- name",

			SHARE_NAME: 				"Ordnername",
			FOLDER_PATH: 				"Ordnerpfad",
			MEDIA_SHARING: 				"Medienfreigabe",
			STATUS: 					"Status",

			GUEST_ACCESS: 				"Zugriff vom Gastnetz zulassen",
			ENABLE_AUTHENTICATION: 		"Authentifizierung aktivieren",
			ENABLE_WRITE_ACCESS: 		"Schreibzugriff erlauben",
			ENABLE_MEDIA_SHARE: 		"Medienfreigabe erlauben",
			
			BROWSE: 					"Durchsuchen",
			BROWSE_TITLE: 				"Ordner auswählen",

			NO_VOLUMN:					"kein Datenträger",
			
			NOTICE: 					"Wirklich Seite des Dynamischen DNS laden? Klicken Sie Speichern, um Ihre Änderungen zu speichern und diese Seite zu verlassen. Klicken Sie Verlassen, um die Seite zu verlassen, ohne Ihre Daten zu speichern.",
			NO_CHANGE_NOTICE: 			"Wirklich Seite des Dynamischen DNS laden?",

			SAVE_FAILED_NOTICE: 		"Speichern fehlgeschlagen",
			CONTINUE: 					"Verlassen",
			CONTINUE_SAVE: 				"Speichern",
			CANCLE: 					"Abbrechen",

			ENABLE: 					"Aktivieren"

		},

		PRINT:{
			TITLE: 						"Printserver",
			NAME: 						"Druckername",
			ENABLE_PRINT_SERVER: 		"Printserver",
			NONE: 						"Nicht vorhanden",
			
			NOTE_TITLE: 				"Hinweis:",
			STEP1: 						"Schritt 1:",
			STEP2: 						"Schritt 2:",
			STEP3: 						"Schritt 3:",

			NOTE1: 						"Verbinden Sie einen unterstützten USB-Drucker mit dem USB-Port des Routers.",
			NOTE2: 						"Installieren Sie auf Ihrem Computer den Druckertreiber. Details hierzu finden Sie im Druckerhandbuch.",
			NOTE3: 						"Installieren Sie das USB-Printer-Controller-Utility von TP-LINK, entweder von der mitgelieferten CD (nur Windows) oder laden Sie es sich von der TP-LINK-Webseite  <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com.de/Support/\">http://www.tp-link.com.de/Support/</a> herunter (Windows und MacOS X).",
			NOTE3_US: 					"Installieren Sie die TP-LINK USB Printer Controller Utility. Bitte laden Sie diese von unserer offiziellen Homepage herunter: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Kindersicherung",
			STATUS: 					"Kindersicherung",
			UNKNOWN: 					"Unbekannt",

			DEVICE_CTR: 				"Der Kindersicherung unterliegende Geräte",
			DEVICE: 					"Gerätename",
			MAC_ADDRESS: 				"MAC-Adresse",
			TIME: 						"Zeitfenster für Internetzugriff",
			DESCRIPTION: 				"Beschreibung",
			
			ENABLE_THIS_ENTRY: 			"Aktivieren",
			OPTIONAL: 					"(optional)",
			BTN_VIEW: 					"Existierende Geräte",
			
			DEVICE_LIST: 				"Geräteliste",
			SYSTEM_TIME: 				"Systemzeit",
			
			RESTR: 						"Contentfilter",
			MODE: 						"Einschränkung",
			BLACKMODE: 					"Blacklist",
			WHITEMODE: 					"Whitelist",
			ACCESS_DEVICES_LIST: 		"Geräteliste",
			
			CHOOSE: 					"Auswählen",
			ADD_A_NEW_KEYWORD: 			"Tragen Sie ein Schlüsselwort zum Blockieren ein",
			ADD_A_NEW_DOMAIN_NAME: 		"Tragen Sie eine neue Domäne, welche Zugriff erhalten soll ein",
			
			YOURPC:						"Ihr PC"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internet",
			ROUTER: 					"Router",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MacOS/iOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Sonstiges",

			DEVICE: 					"Gerät",
			RATE: 						"Rate",
			APPLICATION: 				"Applikation",

			NAME: 						"Name",
			MAC_ADDRESS: 				"MAC-Adresse",
			IP_ADDRESS: 				"IP-Adresse",


			DEVICES: 					"Geräte"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Datenrate",
			TEST_BANDWIDTH: 			">Datenrate testen",
			STREAMBOOST: 				"Streamboost",
			ENABLE_STREAMBOOST: 		"Streamboost aktivieren",
			UP_LIMITATION: 				"Upload-Begrenzung (Mbps)",
			DOWN_LIMITATION: 			"Download-Begrenzung (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Datenratentest starten",
			TESTING: 					"Testen",
			TEST_FAILED: 				"Test fehlgeschlagen",
			TEST_SUCCEED: 				"Test abgeschlossen",
			ENABLE_AUTOMATIC_TEST: 		"Automatisches Testen aktivieren",
			KEEP_UP_TO_DATE: 			"Streamboost aktuell halten",
			ENABLE_AUTOMATIC_UPDATE: 	"Automatisches Update aktivieren"

		},

		PRIORITY:{
			PRIORITY: 					"Priorität",
			PRIORITY_TIPS: 				"Mittels Priorität können Sie Ihre Geräte nach Wichtigkeit ordnen. Dies ist hilfreich, wenn mehrere Geräte derselben Klassifikation um Leitungskapazität konkurrieren.",
			ALL_DEVICE: 				"Alle Geräte",
			ACTIVE_DEVICE: 				"Aktives Gerät",
			SAVE: 						"Speichern",
			ID: 						"Nr.",
			DEVICE: 					"Gerät",
			TYPE: 						"Typ",
			MAC_ADDRESS: 				"MAC-Adresse",
			STICK: 						"Stick"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistiken",
			UP_TIME: 					"Systemlaufzeit",
			DOWNLOADS: 					"Downloads",
			LAST_DAY: 					"Letzter Tag",
			LAST_WEEK: 					"Letzte Woche",
			LAST_MONTH: 				"Letzter Monat",
			ALL_LAN_HOSTS: 				"Alle LAN-Geräte",
			OTHER: 						"Sonstige"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Firewall",
			ENABLE_SPI: 				"SPI-Firewall",

			DOS_PROTECTION: 			"DoS-Schutz",
			ENABLE_DOS: 				"DoS-Schutz",
			
			OFF: 						"Aus",
			LOW: 						"Niedrig",
			MIDDLE: 					"Mittel",
			HIGH: 						"Hoch",

			ICMP: 						"Schutz vor ICMP-FLOOD-Angriffen",
			UDP: 						"Schutz vor UDP-FLOOD-Angriffen",
			TCP: 						"Schutz vor TCP-SYN-FLOOD-Angriffen",
			ENABLE_DOS_TIP:             "Dos Sicherheit und die Traffic Statistiken müssen gleichzeitig aktiv sein.",

			IGNORE: 					"Ping-Pakete auf den WAN-Port ignorieren",
			FORBID: 					"Ping-Pakete von LAN-Seite ignorieren",

			BLOCK_DOS: 					"Liste blockierter DoS-Hosts",
			HOST_NUMBER: 				"Anzahl Hosts",
			IP_ADDRESS: 				"IP-Adresse",
			MAC_ADDRESS: 				"MAC-Adresse"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Kindersicherung",
			ENABLE_ACCESS: 				"Kindersicherung",

			ACCESS_MODE: 				"Zugriffsmodus",
			DEFAULT_ACCESS_MODE: 		"Standardzugriffsmodus",
			BLACK_LIST: 				"Blacklist",
			WHITE_LIST: 				"Whitelist",
			
			WIRED:						"Kabel",
			WIRELESS:					"WLAN",

			DEVICE_ONLINE: 				"Verbundene Geräte",
			NAME: 						"Gerätename",
			IP_ADDRESS: 				"IP-Adresse",
			MAC_ADDRESS: 				"MAC-Adresse",
			CONN_TYPE: 					"Verbindungstyp",

			BLOCK: 						"Blockieren",

			DEVICE_IN_WHITE: 			"Geräte in der Whitelist",
			DEVICE_IN_BLACK: 			"Geräte in der Blacklist"
		},

		IP_MAC:{
			TITLE: 						"Einstellungen",
			ENABLE_ARP: 				"ARP-Binding",

			ARP_LIST: 					"ARP-List",
			ARP_NUM: 					"Anzahl ARP-Einträge",

			MAC_ADDRESS: 				"MAC-Adresse",
			IP_ADDRESS: 				"IP-Adresse",
			BOUND: 						"Gebunden",
			UNBOUND: 					"Ungebunden",

			BINDING_LIST: 				"Bindungsliste",
			DESCRIPTION: 				"Beschreibung",
			OPTIONAL: 					"(optional)",
			ENABLE_THIS_ENTRY: 			"Aktivieren"
		},

		TIMESET: {
			TITLE: 						"Uhrzeiteinstellungen",
			ZONE: 						"Zeitzone",
			DATE: 						"Datum",
			DATEFORMAT: 				"MM/TT/JJJJ",
			TIME: 						"Zugriff erlaubt",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"NTP-Server I",
			NTP2: 						"NTP-Server II",
			OPTIONAL: 					"(optional)",

			CURRENT_TIME:  				"Aktuelle Uhrzeit",
			SET_TIME: 					"Zeit einstellen",
			AUTOMATIC: 					"Automatisch aus dem Internet abrufen",
			MANUAL: 					"Manuell",
			AUTOMATIC_BTN: 				"Abrufen",


			GETGMT: 					"GMT abrufen",

			
			GETGMT_SUCCESS: 			"GMT erfoglreich abgerufen",
			GETGMT_TIMEOUT: 			"Timeout beim Abrufen der GMT",
			GETGMT_WAIT: 				"Warten…",
			
			M: 							"M",
			W: 							"W",
			D: 							"T",
			H: 							"Std",
			
			DAYLIGHT_SAVING: 			"Sommerzeit",
			ENABLE_DAYLIGHT: 			"Sommerzeit aktivieren",
			START: 						"Start",
			END: 						"Ende",

			RUNNING_STATUS: 			"Status",
			DOWN: 						"Außerhalb des Sommerzeitfensters",
			UP: 						"Innerhalb des Sommerzeitfensters"
		},

		DIAG:{
			TITLE: 						"Diagnose",
			DIAGNOSTIC_TOOL: 			"Diagnosetool",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"IP-Adresse/Domänenname",
			COUNT: 						"Pinganzahl",
			
			BASIC: 						"Grundeinstellungen",
			ADVANCED: 					"Erweitert",
			
			COUNTUNIT: 					"(1..50)",

			PKT: 						"Pingpaketgröße",
			PKTUNIT: 					"(4..1472 Byte)",

			TIMEOUT: 					"Ping-Timeout",
			TIMOUTUNIT: 				"(100..2000ms)",

			TTL: 						"Maximale TTL für Traceroute",
			TTLUNIT: 					"(1..30)",
			
			START: 						"Start",
			STOP: 						"Stop"
		},

		FIRMWARE:{
			TITLE: 						"Firmware-Upgrade",
			FIRMWARE_INFO:  			"Ihre Firmware ist auf dem neuesten Stand",
			INFO: 						"Geräteinformationen",
			REMOTE_TITLE: 				"Online-Upgrade",
			LOCAL_TITLE: 				"Lokales Upgrade",

			NEWFILE: 					"Datei mit neuer Firmware",
			FIRMWAREVERSION: 			"Firmwareversion",
			HARDWAREVERSION: 			"Hardwareversion",
			LATESTVERSION: 				"Letzte Version",
			CONFIRM_CONTENT:			"Möchten Sie die Firmware wirklich upgraden?",
			WARNING:					"Firmware-Upgrade... <br/> Um Schäden zu vermeiden, lassen Sie das Gerät eingeschaltet, und warten Sie während dieses Vorgangs, ohne das Gerät zu bedienen.",
			REBOOTING: 					"Neustart... <br/> Um Schäden zu vermeiden, lassen Sie das Gerät eingeschaltet, und warten Sie während dieses Vorgangs, ohne das Gerät zu bedienen.",
			DO_NOT_OPERATE: 			"Upgrade läuft... <br/>Bitte führen Sie während dieses Prozesses keinerlei Aktionen aus.",
			FIRMWARE_UPDATING_NOTE: 	"1.Firmware-Aktualisierung...",
			REBOOTING_NOTE: 			"2.Neustart...",
			SCREEN_UPDATING_NOTE: 		"3.Bildschirm-Aktualisierung...",
			UPGRADE_FAILED: 			"Upgrade fehlgeschlagen.",
			UPGRADE: 					"Upgrade",
			CHECK: 						"Überprüfen",
			DOWNLOADING: 				"Downloaden...",
			UPGRADE_INOF: 				"Um Schäden zu vermeiden, lassen Sie bitte den Router eingeschaltet.",
			NOTE: 						"Anm.: ",
			NO_UPGRADE: 				"Dies ist die aktuellste Version",

			UPGRADING: 					"Upgraden...",
			RETRY: 						"Erneut versuchen",
			CANCEL: 					"Abbrechen",
			ILEGAL_DEVICE:				"Gerät wird nicht erkannt. Bitte wenden Sie sich an den technischen Support von TP-LINK.",
			UPGRADE_FAIL: 				"Upgrade kann nicht durchgeführt werden. Bitte versuchen Sie es später erneut.",
			CHECK_UPGRADE:				"Auf Upgrades überprüfen"
		},

		BACKUP:{
			BACKUP: 					"Speichern",
			BACKUPTIP: 					"Aktuelle Einstellungen in einer Datei speichern.",

			RESTORE: 					"Wiederherstellen",
			RESTORETIP: 				"Gespeicherte Konfiguration aus einer Datei wiedergerstellen.",
			
			RESTORE_WARN:				"Wiederherstellen…<br/>Bitte führen Sie keine Aktion aus.",
			RESTORE_CONFIRM_CONTENT: 	"Wirklich alte Routerkonfiguration wiederherstellen?",
			
			FILE: 						"Datei",

			FACTORY: 					"Werkseinstellungen wiederherstellen",
			FACTORYTIP: 				"Aktuelle Routerkonfiguration verwerfen.",
			FACTORY_CONFIRM_CONTENT:	"Router wirklich auf Werkseinstellungen zurücksetzen?",
			FACTORY_WARN:				"Router wird wiederhergestellt.",
			
			BACKUPBTN: 					"Speichern",
			RESTOREBTN: 				"Wiederherstellen",
			FACTORYBTN: 				"Router zurücksetzen"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Benutzerkonten",
			
			OLDUSER: 					"Alter Benutzername",
			OLDPWD: 					"Altes Passwort",

			NEWUSER: 					"Neuer Benutzername",
			NEWPWD: 					"Neues Passwort",
			CONFIRM: 					"Neues Passwort bestätigen",

			RECOVERYINFO: 				"Passwortwiederherstellung",
			ENABLE_PASSWORD_RECOVERY: 	"Passwortwiederherstellung aktivieren",
			FROM: 						"Von",
			TO: 						"An",
			SMTP_SERVER: 				"SMTP-Server",
			
			ENABLE_AUTHENTICATION: 		"Authentifizierung aktivieren",
			USERNAME: 					"Benutzername",
			PASSWORD: 					"Passwort",

			TEST_MAIL: 					"Testmail schicken",

			LOCAL:						"Lokale Verwaltung",
			LOCAL_MAC_AUTH: 			"Lokale MAC-Authentifzierung",
			ACCESS: 					"Zugriff für alle lokalen Geräte erlauben",
			ACCESS_TIPS: 				"Aktiviert bedeutet, dass alle lokalen Geräte die Weboberfläche erreichen können. Deaktiviert bedeutet, dass Sie nur von den spezifizierten Geräten den Router verwalten können.",
			
			MAC_ADDRESS: 				"MAC-Adresse",
			VIEW_BTN: 					"Existierende Geräte",
			DESCRIPTION: 				"Beschreibung",

			EXIST_DEVICE:               "Existierende Geräte",

			OPTIONAL: 					"(optional)",
			ENABLE_THIS_ENTRY: 			"Aktivieren",

			DEVICE_NAME:				"Gerätename",
			IP_ADDRESS:					"IP-Adresse",
			

			REMOTE: 					"Fernwartung",
			DISABLE_REMOTE_MANAGEMENR: 	"Fernwartung deaktivieren",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Fernwartung für alle Geräte zugänglich machen",
			ENABLE_REMOTE_MANAGEMENR: 	"Fernwartung nur für angegebene Geräte zulassen",
			WEB: 						"Fernwartungsport",

			NOTICE:						"Dieser Port erzeugt einen Konflikt mit einem Virtuellen Server. Fortfahren?",
			NOTICE_ENTER_ANOTHER:		"Dieser Eintrag steht im Konflikt mit einer Portweiterleitung. Bitte wählen Sie einen anderen Port.",

			REMOTEIP: 					"Für Fernwartung zugelassene IP-Adresse",
			REMOTEIPNOTE: 				"(Geben Sie 255.255.255.255 ein, um alle zuzulassen)"
			
		},

		SYSLOG:{
			TITLE: 						"Systemprotokoll",
			LOG_FILTER: 				"Protokoll-filter:",
			
			TYPE_EQ: 					"typ=",
			
			ALL: 						"Alle",

			FIREWALL: 					"Firewall", 
			NAT: 						"NAT",
			DDNS: 						"Dynamisches DNS",
			UPNP:						"UPnP",
			IMB:            			"IP-/MAC-Adress-Bindung",
			IPTV:						"IPTV",
			DHCPS:						"DHCP-Server",
			IGMP_PROXY:					"IGMP-Proxy",
			DOMAIN_LOGIN:				"Login über Domänennamen",
			BASIC_SECURITY: 			"Grundsicherheit",
			PARENTAL_CONTROL: 			"Kindersicherung",
			ACCESS_CONTROL: 			"Kindersicherung",
			DOS_PROTECTION: 			"DoS-Schutz",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Trafficstatistiken",
			TIME_SETTINGS: 				"Uhrzeiteinstellungen",
			ACCOUNT_MANAGEMENT: 		"Benutzerkonten",
			LOCAL_MANAGEMENT: 			"Lokale Verwaltung",
			REMOTE_MANAGEMENT: 			"Fernwartung",
			LOCALE: 					"Lokal",
			FACTORY_RESET: 				"Werkseinstellungen wiederherstellen",
			LED_CONTROLLER: 			"LED-Controller",
			NETWORK: 					"Netz",
			USBSHARE: 					"USB-Datenträgerfreigabe",
			AND: 						"und",
			LEVEL: 						"Ebene",
			EMERGENCY:					"NOTFALL",
			ALERT:						"ALARM",
			CRITICAL:					"KRITISCH",
			ERROR: 						"FEHLER",
			WARNING: 					"WARNUNG",
			NOTICE: 					"HINWEIS",
			INFO: 						"INFORMATION",
			DEBUG: 						"DEBUG",

			INDEX: 						"Index",
			TYPE: 						"Typ",
			TIME: 						"Zugriff erlaubt",
			LEVEL_COL:					"Ebene",

			CONTENT: 					"Information",
			
			MAIL_LOG: 					"Protokoll jetzt verschicken",
			SAVE_LOG: 					"Protokoll speichern",

			SEND_OK: 					"Protokoll gesendet",
			SEND_FAILED: 				"Senden fehlgeschlagen",

			MAIL_SETTING: 				"E-Mail-Einstellungen",

 			FROM: 						"Von",
 			TO: 						"An",
 			SMTP_SERVER: 				"SMTP-Server",
 			ENABLE_AUTHENTICATION: 		"Authentifizierung aktivieren",

 			USERNAME: 					"Benutzername",
 			PASSWORD: 					"Passwort",
 			CONFIRM_PASSWORD: 			"Passwort bestätigen",

 			AUTO_MAIL: 					"Automail-Funktion aktivieren",
 			LOG_AT: 					"Protokoll schicken um",
 			HH_MM: 						"(HH:MM) Täglich",

 			LOG_EVERY: 					"Protokoll alle",
 			HOURS: 						"Stunden schicken"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Einstellungen",
			STATUS: 					"QoS aktivieren",
			UPBANDWIDTH: 				"Upload-Datenrate",
			DOWNBANDWIDTH: 				"Download-Datenrate",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"kbps",
			TEST: 						"Geschwindigkeitstest",
			RULE_LIST: 					"QoS-Regelliste",
			RULE: 						"QoS-Regel",
			ID: 						"Nr.",
			NAME: 						"Name",
			TYPE: 						"Typ",
			DETAIL: 					"Detail",
			PRIORITY: 					"Priorität",

			APPLICATION: 				"Applikation",
			APPLICATION_LIST: 			"Applikationsliste",
			CUSTOM_APP: 				"Benutzerdefinierte Applikation",
			MAC_ADDR: 					"MAC-Adresse",
			MAC_ADDR_P: 				"MAC-Adresse",
			IP_ADDR: 					"IP-Adresse",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Physischer Port",

			LOW: 						"Niedrig",
			MIDDLE: 					"Mittel",
			HIGH: 						"Hoch",

			PROTO: 						"Protokoll",
			PORT: 						"Port",
			PROTO_P: 					"Protokoll",
			PORT_P: 					"Port",
			PORT_TIPS: 					"(XX oder XX-XX, 1..65535, maximal 5 Paare)",

			ALL: 						"Alle",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Benutzerdefiniert",

			WIFI_HOME: 					"Haupt-WLAN",
			WIFI_GUEST: 				"Gast-WLAN",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Datenbank-Upgrade",

			NEWFILE: 					"Neue Datenbank-Datei",
			FIRMWAREVERSION: 			"Datenbankversion",
			CONFIRM_CONTENT:			"Datenbank wirklich aktualisieren?",
			WARNING:					"Aktualisierung der Datenbank…<br/>Bitte führen Sie keine Aktion aus.",
			
			UPGRADE: 					"Upgrade",

			SERVICE_RESTART: 			"QoS-Dienst startet neu",
			
			TYPE: 						"Typ",
			BY_DEVICE: 					"Gerätebezogen",
			BY_APP: 					"Applikationsbezogen",
			BY_PHY: 					"Portbezogen",

			HIGH_PRIORITY_LBL: 			"Hohe Priorität",
			MIDDLE_PRIORITY_LBL: 		"Mitlere Priorität",
			LOW_PRIORITY_LBL: 			"Niedrige Priorität",

			HIGH_PRIORITY: 				"Hohe Priorität",
			MIDDLE_PRIORITY: 			"Mitlere Priorität",
			LOW_PRIORITY: 				"Niedrige Priorität"

		},

		APPLICATION:{
			APP_LIST: 					"Applikationsliste",
			GAME_LIST: 					"Spieleliste",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Trafficstatistiken",
			ENABLE_STATISTICS: 			"Trafficstatistiken",

			TITLE: 						"Trafficstatistikenliste",
			IP_MAC: 					"IP-Adresse/MAC-Adresse",
			TPKT: 						"Pakete insgesamt",
			TBYTE: 						"Byte insgesamt",
			CPKT: 						"Pakete aktuell",
			CBYTE: 						"Byte aktuell",
			CICMP: 						"Aktuell gesendete ICMPs",
			CUDP: 						"Aktuell gesendete UDPs",
			CSYN: 						"Aktuell gesendete SYNs",
			
			DELETE_CONFIRM: 			"Trafficstatistiken wirklich löschen?",
			DELETE_ALL_CONFIRM: 		"Alle Trafficstatistiken wirklich löschen?",

			RESET_ALL: 					"Alle zurücksetzen"
		},

		SYSPARA:{
			W24G: 						"2,4GHz-WLAN",
			W5G: 						"5GHz-WLAN",
			W60G: 						"60 GHz WLAN",
			W24G_WDS: 					"2,4GHz-WDS",
			W5G_WDS: 					"5GHz-WDS",
			W60G_WDS: 					"60 GHz WDS",
			SWITCH_NOTICE:  			"Hinweis: Ihr WLAN ist abgeschaltet. Um diese Funktion zu nutzen, schalten Sie es bitte mittels der WiFi-Taste ein.",

			ENABLE_TIPS: 				"Ihr WLAN ist abgeschaltet.",

			BEACON: 					"Ortungsintervall",
			BEACONUNIT: 				"(40..1000)",

			RTS: 						"RTS-Grenzwert",
			RTSUNIT: 					"(1..2346)",
			
			FRAG: 						"Fragmentierungsgrenzwert",
			FRAGUNIT: 					"(256..2346)",

			DTIM: 						"RTIM-Intervall",
			DTIMUNIT: 					"(1..15)",

			GROUP: 						"Gruppenschlüsselaktualisierungsintervall",
			GROUPUNIT: 					"Sekunden",
			
			MU_MIMO_FEATURE: 			"Multiuser-MIMO",
			MU_MIMO: 					"Aktivieren von MU-MIMO",
			
			WMM_FEATURE: 				"WMM-Funktion",
			WMM: 						"WMM aktivieren",

			GI_FEATURE: 				"Short-GI",
			GI: 						"Short-GI aktivieren",

			AP_FEATURE: 				"AP-Isolation",
			AP: 						"WLAN-Clients dürfen einander nicht sehen",

			WDS_FEATURE: 				"WDS-Bridging",
			WDS: 						"WDS-Bridging aktivieren",
			
			SSID_BRIDEGE: 				"zu bridgende SSID",
			SURVEY: 					"Suchen",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC-Adresse",
			SSID: 						"SSID",
			SIGNAL: 					"Signalstärke",
			CHANNEL: 					"Kanal",
			SECURITY: 					"Sicherheit",
			CHOSEN: 					"Gewählt",
			AP_NUMBER:					"Anzahl gefundener WLANs",

			TOTAL: 						"Anzahl Elemente",

			MAC: 						"zu bridgende MAC-Adresse",
			MACUNIT: 					"Beispiel: 00-1D-0F-11-22-33",

			SECURITY: 					"Sicherheit",
			NO: 						"Nein",
			NONE: 						"Keine Sicherheit",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Passwort",
			
			AUTH_TYPE: 					"Authentifizierungstyp",
			AUTO: 						"Automatisch",
			OPEN: 						"Offen",
			SHARED: 					"Shared-Key",

			WEP_INDEX: 					"WEP-Schlüsselindex",
			KEY1: 						"Schlüssel 1",
			KEY2: 						"Schlüssel 2",
			KEY3: 						"Schlüssel 3",
			KEY4: 						"Schlüssel 4",

			WEP_KEY_FORMAT: 			"WEP-Schlüsselformat",
			ASC: 						"ASCII",
			HEX: 						"Hexadezimal",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"WPS aktivieren",

			NAT: 						"NAT",
			ENABLE_NAT: 				"NAT aktivieren",
			
			NAT_BOOST: 					"NAT-Boost",
			ENABLE_NAT_BOOST: 			"NAT-Boost aktivieren",
			
			MEDIA_SERVER: 				"Mediaserver",
			SCAN_INTERVAL: 				"Automatische Suche alle (Stunden)",
			SCAN_UNIT: 					"(2..48)",

			DOS_PROTECTION: 			"DoS-Schutzebene",

			ICMP: 						"ICMP-FLOOD-Pakete",
			UDP: 						"UDP-FLOOD-Pakete",
			TCP: 						"TCP-FLOOD-Pakete",

			WDS_MODE: 					"WDS-Modus",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Niedrig",
			MIDDLE: 					"Mittel",
			HIGH: 						"Hoch",

			TO: 						"An",
			NOTICE_NAT_REBOOT: 			"Neustart",

			NOTICE_NAT_BOOST: 			"Eine Änderung am NAT-Boost wird einen Routerneustart zur Folge haben. Fortfahren?",
			NOTICE:						"Der Kanal ihres Routers ist nicht derselbe, wie der des Aps. Möchten Sie diesen ändern?",

			UNIT: 						"(5..7200) Pakete/Sekunde",
			LED: 						"LED",
			NIGHT_MODE: 				"Nachtmodus",
			PERIOD_NIGHT_TIME: 			"Nachtzeit",
			ENABLE: 					"Aktivieren",
			HH_MM: 						"(HH:MM)",
			TO: 						"An",
			NIGHT_MODE_NOTE:            "Ihre LED ist ausgeschaltet. Wenn Sie diese Funktion verwenden möchten, drücken Sie bitte die LED-Taste oder klicken Sie auf die LED rechts oben auf der Seite.",
			NOTE2:                      "Der Nachtmodus-Zeitraum orientiert sich an der Systemzeit des Routers. Bitte vergewissern Sie sich, dass die Systemzeit des Routers korrekt eingestellt ist."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Zurzeit kein Zertifikat vorhanden, bitte <b>Erzeugen</b> Sie eines, bevor Sie den VPN-Server aktivieren.",
			NO_CERT_NOTE2: 				"Zurzeit kein Zertifikat vorhanden, bitte <b>Erzeugen</b> Sie eines, bevor Sie die Konfiguration exportieren.",
			ENABLE_VPN_SERVER: 			"VPN-Server aktivieren",
			SERVICE_TYPE: 				"Diensttyp",
			SERVICE_PORT: 				"Dienstport",
			VPN_SUBNET: 				"VPN-Subnetz/Netzmaske",
			CLIENTS_ACCESS: 			"Clientzugriff",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Nur Heimnetz",
			INTERNET_HOME: 				"Internet und Heimnetz",
			CERT_STR: 					"Zurzeit kein Zertifikat vorhanden, klicken Sie auf OK, um eines zu erzeugen und Ihre Konfiguration zu speichern.",
			CERT_STR2: 					"Zurzeit kein Zertifikat vorhanden, klicken Sie auf OK, um eines zu erzeugen und Ihre Konfiguration zu exportieren.",
			CONF_FILE: 					"Konfigurationstyp", 
			EXPORT_CONF_FILE: 			"Konfiguration exportieren",
			EXPORT: 					"Exportieren",

			PPTPVPN: 					"PPTP-VPN",
			CLIENT_IP_ADDRESS: 			"Client-IP-Adresse",
			ACCOUNT_USERNAME: 			"Benutzername",
			ACCOUNT_PASSWORD: 			"Passwort",
			CLIENT_IP_NOTE: 			"(bis zu 10 Clients)",
			SAME_SUBNET_NOTE: 			"Die Client-IP-Adresse und die LAN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie eine andere ein.",
			CONFLICT_WITH_DHCP: 		"Die Client-IP-Adresse steht im Konflikt mit dem DHCP-IP-Adresspool. <br/>Bitte geben Sie sie erneut ein.",
			CONFLICT_WITH_RESERVED: 	"Die Client-IP-Adresse steht im Konflikt mit der reservierten IP-Adresse. <br/>Bitte geben Sie sie erneut ein.",
			CONFLICT_WITH_OPENVPN: 		"Die Client-IP-Adresse und die OpenVPN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie sie erneut ein.",
			SAME_SUBNET_NOTE2: 			"Die VPN-Subnetz/Netzmaske und die LAN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie eine andere ein.",
			CONFLICT_WITH_DHCP2: 		"Die VPN-Subnetz/Netzmaske steht im Konflikt mit dem DHCP-IP-Adresspool. <br/>Bitte geben Sie sie erneut ein.",
			CONFLICT_WITH_RESERVED2: 	"Die VPN-Subnetz/Netzmaske steht im Konflikt mit der reservierten IP-Adresse. <br/>Bitte geben Sie sie erneut ein.",
			CONFLICT_WITH_PPTPVPN: 		"Die VPN-Subnetz/Netzmaske und die PPTP-VPN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie sie erneut ein.",
			LAN_CONFLICT_WITH_OPENVPN: 	"Die LAN-IP-Adresse und die OPENVPN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie sie erneut ein.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"Die LAN-IP-Adresse und die PPTP-VPN-IP-Adresse dürfen nicht im selben Subnetz liegen. <br/>Bitte geben Sie sie erneut ein.",
			VPN_MASK_ERROR: 			"Die Netzmaske kann nicht größer als 255.255.255.248 sein. <br/>Bitte geben Sie sie erneut ein.",
			ACCOUNT_LIST: 				"Kontenliste (bis zu 16 Benutzer)",
			ADVANCED_SETTING: 			"Erweitert",
			ALLOW_SAMBA: 				"Samba (Netzwerkumgebung) -Zugriff gestatten",
			ALLOW_NETBIOS: 				"NetBIOS-Passthrough erlauben",
			ALLOW_UNENCRYPTED_CONN: 	"Unverschlüsselte Verbindungen zulassen",
			USERNAME_CONFLICT: 			"Dieser Benutzername ist bereits vorhanden. Bitte geben Sie einen anderen ein.",
				
			NOTICE_VS_CONFLICT:			"Im Konflikt mit dem externen Port des virtuellen Servers. Bitte geben Sie einen anderen Port ein.",
			NOTICE_PT_CONFLICT:			"Im Konflikt mit dem Port-Triggering des externen Ports. Bitte geben Sie einen anderen Port ein.",
			NOTICE_VS_MODIFY:			"Im Konflikt mit dem externen Port des virtuellen Servers (1723). Bitte gehen Sie zur Seite <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Virtuelle Server</a> und ändern Sie den externen Port des virtuellen Servers.",
			NOTICE_PT_MODIFY:			"Im Konflikt mit dem Port-Triggering des externen Ports (1723). Bitte gehen Sie zur Seite <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Port-Triggering</a> und ändern Sie den externen Port des Port-Triggerings.",
			
			GENERATE_CERT: 				"Zertifikat",
			GENERATE_NEW_CERT: 			"Erzeugen Sie das Zertifikat.",
			GENERATE: 					"Erzeugen",
			GENERATE_TIPS: 				"Zertifikat wird erzeugt...<br/>Dies kann einige Minuten in Anspruch nehmen, bitte warten.",
			CERT_SUCCESS: 				"Erfolgreich",
			CERT_FAIL: 					"Fehlgeschlagen, bitte versuchen Sie es erneut.",
			
			VPN_CONNECTIONS: 			"VPN-Verbindungen",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN-Verbindung",
			PPTP_VPN_CONNECTIONS: 		"PPTP-VPN-Verbindung",
			USER: 						"Benutzer",
			REMOTE_IP: 					"Remote-IP-Adresse",
			ASSIGNED_IP: 				"Zugewiesene IP-Adresse"
		}
	};
})(jQuery);
