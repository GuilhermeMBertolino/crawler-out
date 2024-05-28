(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			FORGET_PASSWORD: 			"Glömt lösenord?",
			LOGIN: 						"Logga in",
			IMPORTANT_UPDATE_INFO: 		"För att undvika konflikt med front-end device, har routerns IP-adress  uppdaterats till",
			CONTINUE: 					"Fortsätta",

			IMPORTANT_NOTICE: 			"Viktigt meddelande",
			OR: 						"Är du säker på att du vill fortsätta att besöka",
			END: 						".",
			END2: 						"?",

			FORGET_PASSWORD_INFO_0: 	"Tryck på och håll in knappen Återställ i 10 sekunder för att återställa routern till fabriksinställningarna.",
			FORGET_PASSWORD_INFO_1: 	"Om lösenord återställning funktionen är aktiverad. En verifikation kod kommer att skickas till angiven e-postadress för återställning användarnamn och lösenord.",
			FORGET_PASSWORD_SEND_FAILED:"Det gick inte att skicka koden! Kontrollera din Internet-anslutning.",

			VERIFICATION_CODE: 			"Verifieringskod",

			RECEIVE_CODE: 				"Skicka kod",

			CONFIRM: 					"Bekräfta",

			SEC: 						"s",

			USER_CONFLICT: 				"Inloggnings konflikt!",
			FIRST_TIME: 				"Välkommen att använda Archer AD7200 som designats av TP-LINK i Kina. Börja med att skapa ett lösenord för enheten.",
			
			USER_CONFLICT_INFO: 		"Användare %USER%med värd %HOST%( %IP%/ %MAC%) är inloggad på routern.  Du kan inte logga in på samma gång. Försök igen senare.",
			USER_CONFLICT_INFO_1: 		"Användare %USER% (%MAC%) är inloggad på routern. Du kan inte logga in samtidigt. Var snäll och försök senare.",
			USER_CONFLICT_INFO_2: 		"Användare %USER%( %IP%) är inloggad på routern.  Du kan inte logga in på samma gång. Försök igen senare.",
			
			LOGIN_FAILED: 				"Inloggningen misslyckades!",
			LOGIN_FAILED_COUNT: 		"Inloggningen misslyckades för %num1 gånger och du har fortfarande %num2 försök kvar. ",
			NO_COOKIE: 					"Cookies måste vara aktiverade för att logga in. Vänligen aktivera Cookies eller stäng av privata/Incognito browsing mode.", 

			FORGET_PASSWORD_NOTE: 		"Om du inte har konfigurerat Password Recovery funktion. Du kan trycka på och hålla ned knappen Återställ i 10 sekunder för att återställa routern till fabriksinställningarna."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Uppgradera nu",
			REMIND: 						"Påminn mig senare",
			NOTICE:    						"Hej, en ny firmware finns tillgänglig för %PRODUCT% router.",
			NEVER: 							"Ignorera denna version"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN-anslutning fel!",
			STATUS: 						"Status",
			INFO: 							"Information",
			SETUP: 							"Ställ in en Internet-anslutning",
			NEVER: 							"Påminn mig inte igen"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Version av firmware:",
			HARDWARE_VERSION: 				"Maskinvaruversion:",
			HELP_SUPPORT: 					"Stöd",
			FAQ: 							"VANLIGA FRÅGOR",
			CONFIRM_REBOOT: 				"Är du säker på att du vill starta om routern?",
			CONFIRM_LOGOUT: 				"Är du säker på att du vill logga ut?",
			UPGRADE_ALERT_1: 				"Nuvarande firmware stöder inte TP-LINK molntjänst. Vi rekommenderar starkt att du laddar ner den senaste firmware på www.tp-link.com och uppdaterar den.",
			UPGRADE_ALERT_2: 				"Nuvarande firmware stöder inte TP-LINK molntjänst. Vi rekommenderar starkt att du uppdaterar firmware genom att klicka på ikonen Uppdatera i det övre högra hörnet.",
			REBOOTING: 						"Startar om ... <BR/> Använd inte under omstarten. ",

			MODE_SWITCH: 					"Lägesknapp",
			ACCESS_POINT: 					"Åtkomstpunkt",
			ACCESS_POINT_TIPS: 				"Att omvandla kabelanslutet nätverk till trådlös.",
			ROUTER: 						"Routern",
			ROUTER_TIPS: 					"Att låta flera enheter att ansluta wiredly eller trådlöst.",
			REPEATER: 						"Repeater",
			REPEATER_TIPS: 					"Att förlänga signaltäckningen för ditt trådlösa nätverk.",
			MODE_REBOOT_TIP: 				"Ändring av läget kommer att resultera i omstart av enheten, är du säker på att du vill fortsätta?",
			MODE_FAIL_TIP: 					"Ändringen misslyckades. Försök igen senare eller starta om din router."
		},

		NAV: {
			QUICK_SETUP: 				"Snabbinstallation",
			BASIC: 						"Grundläggande",
			ADVANCED: 					"Avancerad"
		},

		CONTROL: {
			MODE: 						"Läge",
			LOGIN: 						"Logga in",
			LED:                        "LED",
			LED_ON:                     "LED på",
			LED_OFF:                    "LED av",			
			LED_DISABLED:               "LED status kan inte ändras under perioden nattläge",			
			LOGOUT: 					"Logga ut",
			UPDATE: 					"Uppdatera",
			REBOOT: 					"Starta om"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albanien",
			ALGERIA: 					"Algeriet",
			AMERICAN_SAMOA: 			"Amerikanska Samoa",
			ARGENTINA: 					"Argentina",
			ARMENIA: 					"Armenien",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australien",
			AUSTRIA: 					"Österrike",
			AZERBAIJAN: 				"Azerbajdzjan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahrain",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Vitryssland",
			BELGIUM: 					"Belgien",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Berumuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnien och Herzegowina",
			BRAZIL: 					"Brasilien",
			BRUNEI_DARUSSALAM: 			"Brunei Darussalam",
			BULGARIA: 					"Bulgarien",
			CAMBODIA: 					"Kambodja",
			CANADA: 					"Kanada",
			CAYMAN_ISLANDS: 			"Caymanöarna",
			CHILE: 						"Chile",
			CHINA: 						"Folkrepubliken Kina",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Kroatien",
			CYPRUS: 					"Cypern",
			CZECH_REPUBLIC: 			"Tjeckiska republiken",
			DENMARK: 					"Danmark",
			DOMINICAN_REPUBLIC: 		"Dominikanska republiken",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egypten",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estland",
			ETHIOPIA: 					"Etiopien",
			FAEROE_ISLANDS: 			"Färöarna",
			FINLAND: 					"Finland",
			FRANCE: 					"Frankrike",
			FRENCH_GUIANA: 				"Franska Guyana",
			FRENCH_POLYNESIA: 			"Franska Polynesien",
			GEORGIA: 					"Georgien",
			GERMANY: 					"Tyskland",
			GREECE: 					"Grekland",
			GREENLAND: 					"Grönland",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong S.A. R. , S. R. C.",
			HUNGARY: 					"Ungern",
			ICELAND: 					"Island",
			INDIA: 						"Indien",
			INDONESIA: 					"Indonesien",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irland",
			ISRAEL: 					"Israel",
			ITALY: 						"Italien",
			JAMAICA: 					"Jamaica",

			JAPAN: 						"Japan",
			JAPAN_1: 					"Japan 1",
			JAPAN_2: 					"Japan 2",
			JAPAN_3: 					"Japan 3",
			JAPAN_4: 					"Japan 4",
			JAPAN_5: 					"Japan 5",
			JAPAN_6: 					"Japan 6",

			JORDAN: 					"Jordanien",
			KAZAKHSTAN: 				"Kazakstan",
			KENYA: 						"Kenya",

			NORTH_KOREA: 				"Nordkorea",
			KOREA_REPUBLIC: 			"Republiken Korea",
			KOREA_REPUBLIC_3: 			"Republiken Korea 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Lettland",
			LEBANON: 					"Libanon",
			LIBYA: 						"Libyen",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Litauen",
			LUXEMBOURG: 				"Luxemburg",
			MACAU: 						"Macao SAR",
			MACEDONIA: 					"Före detta jugoslaviska republiken Makedonien",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malaysia",
			MALDIVES: 					"Maldiverna",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexiko",
			MONACO: 					"Furstendömet Monaco",
			MONGOLIA: 					"Mongoliet",
			MOROCCO: 					"Marocko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Nederländerna",
			NETHERLANDS_ANTILLES: 		"Netherlands-Antilles",
			
			NEW_ZEALAND: 				"Nya Zeeland",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norge",
			NORTHERN_MARIANA_ISLANDS: 	"Nordmarianerna",
			OMAN: 						"Oman",
			PAKISTAN: 					"Islamiska republiken Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua Nya Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Filippinerna",
			POLAND: 					"Polen",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Rumänien",
			RUSSIA: 					"Ryssland",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa.",
			SAUDI_ARABIA: 				"Saudiarabien",
			SINGAPORE: 					"Singapore",
			SLOVAK_REPUBLIC: 			"Slovakien",
			SLOVENIA: 					"Slovenien",
			SOUTH_AFRICA: 				"Sydafrika",
			SPAIN: 						"Spanien",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Sverige",
			SWITZERLAND: 				"Schweiz",
			SYRIA: 						"Syrien",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Thailand",
			TRINIDAD_TOBAGO: 			"Trinidad Tobago y",
			TUNISIA: 					"Tunisien",
			TURKEY: 					"Turkiet",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraina",
			UNITED_ARAB_EMIRATES: 		"Förenade Arabemiraten",
			UNITED_KINGDOM: 			"Storbritannien",
			UNITED_STATES: 				"Förenta Staterna",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Uzbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Viet Nam",
			VIRGIN_ISLANDS: 			"Virgin Islands (U.S. )",
			YEMEN: 						"Yemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway Island,Samoa.",
			HAWAII: 					"(GMT-10:00) Hawaii",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Stillahavstid",
			MOUNTAIN_TIME: 				"(GMT-07:00) Mountain (USA Kanada)",
			CENTRAL_TIME: 				"(GMT-06:00) Central Time (USA Kanada)",
			EASTERN_TIME: 				"(GMT-05:00) Östtid (USA Kanada)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Atlanttid (Kanada)",
			NEWFOUNDLAND: 				"(GMT-03:30) Newfoundland",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Mid-Atlantic",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azorerna, Kap Verde",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich Mean Time, Dublin, London",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlin, Stockholm, Rom, Bern, Bryssel",
			ATHENS_HELSINKI: 			"(GMT+02:00) Aten, Helsingfors, östra Europa, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Bagdad, Kuwait, Nairobi, Riyadh, Moskva",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Jekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras och Calcutta och Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata , Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Peking, Hongkong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seoul, Yakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomonöarna, Nya Kaledonien",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamtjatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Ansökan",
			GAME:						"SPEL",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"Linje",
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
			xl_others:  				"Xl_others",
			Vonage:  					"Vonage",
			netTalk:  					"Nettalk",
			iTalkBB: 					"iTalkBB",
			HTTP: 						"HTTP",
			MMS:  						"MMS",
			RTSP:                       "RTSP",
			WOW:						"Wow",
			LOL:						"Lol",
			SSH:						"SSH",
			TELNET:						"Telnet",
			VPN:						"VPN",
			FTP:						"Ftp",
			WWW:						"Www",
			DNS:						"Dns",
			ICMP:						"Icmp",
			SMTP:						"Smtp",
			NNTP:						"Nntp",
			POP3:						"Pop3",
			HTTPS:  					"Https",


			END:						""
		},

		DATE: {
			DAY: 						"Dag",

			MONDAY: 					"Måndag",
			TUESDAY: 					"Tisdag",
			WEDNESDAY: 					"Onsdag",
			THURSDAY: 					"Torsdag",
			FRIDAY: 					"Fredag",
			SATURDAY: 					"Lördag",
			SUNDAY: 					"Söndag",
			
			MON: 						"Mon.",
			TUES: 						"Tis. ",
			WED: 						"Ons. ",
			THUR: 						"Tor.",
			FRI: 						"Fre. ",
			SAT: 						"Sat.",
			SUN: 						"Sun.",

			JAN: 						"Jan.",
			FEB: 						"Feb.",
			MAR: 						"Mar.",
			APR: 						"Apr.",
			MAY: 						"Maj.",
			JUN: 						"Jun.",
			JUL: 						"Jul.",
			AUG: 						"Aug.",
			SEP: 						"Sep.",
			OCT: 						"Okt.",
			NOV: 						"Nov.",
			DEC: 						"Dec."

		},

		HOUR: {
			AM_1: 						"1",
			AM_2: 						"2",
			AM_3: 						"3",
			AM_4: 						"4",
			AM_5: 						"5",
			AM_6: 						"6",
			AM_7: 						"7",
			AM_8: 						"8",
			AM_9: 						"9",
			AM_10: 						"10",
			AM_11: 						"11",
			AM_12: 						"12",
			PM_1: 						"13",
			PM_2: 						"14",
			PM_3: 						"15",
			PM_4: 						"16",
			PM_5: 						"17",
			PM_6: 						"18",
			PM_7: 						"19",
			PM_8: 						"20",
			PM_9: 						"21",
			PM_10: 						"22",
			PM_11: 						"23",
			PM_12: 						"24"
		},

		ORDER: {
			"1ST": 						"1:a",
			"2ND": 						"2:a",
			"3RD": 						"3:e",
			"4TH": 						"4:e",
			"5TH": 						"Sista",
			"1ST_": 					"1:a",

			TH: 						" "
		},

		GRID: {
			CLIENT_NUMBER: 				"Kundnummer",

			ID: 						"ID",
			MODIFY: 					"Ändra",
			STATUS: 					"Status",
			ENABLE: 					"Aktivera",

			OPERATION: 					"Funktion",
			CHOOSE: 					"Välj",
			DESCRIPTION: 				"Beskrivning",
			

			AUTO_REFRESH: 				"Automatisk uppdatering",
			REFRESH: 					"Uppdatera",
			NUMBER: 					"Nummer",
			ENABLED: 					"Aktiverad",
			DISABLED: 					"Inaktiverad",
			ACTIVE: 					"Aktiv",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Lägg till",
			CHOOSE: 					"Välj",
			EDIT: 						"Redigera",
			DELETE: 					"Ta bort",
			DELETE_ALL: 				"Ta bort alla",
			REMOVE: 					"Ta bort",
			RESET: 						"Återställ",
			RESET_ALL: 					"Nollställ alla",
			DETECT: 					"Upptäcka",
			ENABLE: 					"Aktivera",
			DISABLE: 					"Avaktivera",
			PAUSE:						"Pausa",
			RESUME:						"Återuppta",
			
			REFRESH: 					"Uppdatera",
			SEARCH: 					"Sök ...",
			BROWSE: 					"Bläddra",

			SAVE: 						"Spara",
			BACK: 						"Tillbaka",

			PREV: 						"Före",
			NEXT: 						"Nästa",
			FINISH: 					"Avsluta",
			
			ON: 						"På",
			OFF: 						"Avstängd",
			LOW: 						"Låg",
			MIDDLE: 					"Medel",
			HIGH: 						"Hög",
			
			OK: 						"OK",
			CANCEL: 					"Avbryt",

			YES: 						"Ja",
			NO: 						"Nej",
			
			CONNECTED: 					"Ansluten",
			CONNECTING: 				"Ansluta",
			DISCONNECTING: 				"Urkoppling",
			DISCONNECTED: 				"Inte ansluten",

			PASSWORD_HINT: 				"Lösenord",
			FILEBUTTONTEXT: 			"Bläddra",
			FILEBLANKTEXT: 				"Välj en fil.",
			NOSELECTEDTEXT: 			"Välj alternativ.",

			ADD_A_NEW_KEYWORD: 			"Lägg till ett nytt sökord",

			SUCCESSED: 					"Framgång!",
			FORM_SAVED: 				"Sparade",
			FORM_FAILED: 				"Misslyckades",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Sparade",
			GRID_FAILED: 				"Misslyckades",
			GRID_NONE_SELECT: 			"Välj minst en post.",
			GRID_DELETE_COMFIRM: 		"Är du säker på att du vill ta bort dessa poster?",
			GRID_DELETE_ALL_COMFIRM: 	"Är du säker på att du vill ta bort alla poster?",
			GRID_MAX_RULES: 			"Maximalt antal poster har överskridits.",
			KEYWORD_MAX_OVERFLOW: 		"Antal nyckelord har överskridit gränsen.",

			NOTE: 						"Obs!"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Ogiltigt format.",
			BLANKTEXT: 					"Det här fältet är obligatoriskt.",

			EMAIL: 						"Ogiltig e-postadress.",
			NUMBER: 					"Ogiltigt format.",

			NUMBER_MIN: 				"Ogiltigt värde, ange ett nummer större än %min . ",
			NUMBER_MAX: 				"Ogiltigt värde, ange ett nummer mindre än %max . ",

			NUMBER_MIN_MAX: 			"Ogiltigt värde, ange ett nummer mellan%min och %max.",
			HEX: 						"Det här fältet ska vara ett hexadecimalt tal.",

			IP: 						"Ogiltigt format.",

			IP_NO_ALL_ZERO:				"Adressen ska inte vara 0.0.0.0.",
			IP_NO_LOOP:					"Adressen ska inte vara loopback-adress.",
			IP_NO_D_TYPE:				"Adressen ska inte vara en klass D IP.",
			IP_NO_E_TYPE:				"Adressen ska inte vara en klass E IP.",
			IP_NO_ALL_ONE:				"Adressen ska inte vara 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"Adressen ska inte börja med 255.",
			IP_NO_FIRST_ZERO:			"Adressen ska inte börja med 0.",
			MASK_NO_ALL_ONE:			"Mask kan inte vara 255.255.255.255.",

			IPV6: 						"Ogiltigt format.",
			IPV6_NOT_GLOBAL:			"Ogiltigt format.",
			IPV6_NOT_PREFIX:			"Ogiltigt format.",
			IP_DOMAIN: 					"Ogiltigt format.",
			IPV6_DOMAIN: 				"Ogiltigt format.",
			PPTP_INVALID_IP:			"Ogiltig IP-adress.",
			MAC: 						"Ogiltigt format.",
			MULTI_MAC:					"Ogiltigt format.",
			MAC_INVALID_BROADCAST:		"O MAC não deve ser um endereço de Broadcast.",
			MAC_INVALID_MULTICAST:		"O MAC não deve ser um endereço de Multicast.",
			DATE: 						"Ogiltigt format.",
			DATE_INVALID: 				"Ange ett datum mellan 01/01/1970 och 12/31/2030.",
			MASK: 						"Ogiltigt format.",
			DOMAIN: 					"Ogiltigt format.",
			STRING_DOMAIN:              "Ogiltigt format.",
			USER: 						"Ogiltigt format.",
			NOTE: 						"Ogiltigt format.",
			PWD: 						"Ogiltigt format.",
			SSID: 						"Ogiltigt format.",
			NAME:						"Ogiltigt format.",
			ASCII_VISIBLE:				"Ogiltigt format.",
			STRING_VISIBLE:				"Ogiltigt format.",
			STRING_VISIBLE_NO_COMMA:    "Ogiltigt format.",
			STRING_VISIBLE_ALLOW_BLANK: "Ogiltigt format.",
			VPN_NAME_PWD: 				"Ange 1-15 bokstäver, siffror, - och _."
		},


		ERROR: {			
			"00000001":					"Ogiltig filtyp.",
			"00000002":					"Kontrollsummefel.",
			"00000003":					"Filen är för stor.",
			"00000004":					"Fel vid uppladdning.",
			"00000005":					"Starta om fel.",
			"00000006":					"Okänt fel.",
			"00000007":					"Objektet finns redan. Ange en annan.",

			"00000009":					"Ogiltig port.",
			"00000010":					"Porten skall vara en siffra.",

			"00000011":					"Användarnamnet ska vara samma med från-värdet.",
			"00000012": 				"Användarnamnet måste börja med en bokstav.",

			"00000021":					"Ogiltigt format.",

			"00000032": 				"Värdet måste vara lägre än Låg.",
			"00000033": 				"Värdet måste vara mindre än Mellan och Låg.",
			"00000034": 				"Ogiltigt värde, ange ett nummer mellan 5 och 7200.",

			"00000039": 				"Använd det förvalda värdet 0 eller ange ett värde mellan 30 och 86400.",
			"00000040": 				"SSID och MAC-adress krävs.",

			"00000042": 				"Använd det förvalda värdet 80 eller ange ett värde mellan 1024 och 65535.",

			"00000045": 				"Standard-gateway och LAN-IP-adress ska vara i samma subnät. Ange igen.",

			"00000046": 				"IP-adress och MAC-adress bör inte vara NULL. Ange igen.",
			"00000047": 				"IP-adressen och LAN-IP-adress ska vara i samma subnät. Ange igen.",

			
			"00000049":					"Nätverket är ogiltig.",

			"00000050": 				"Bad DNS-serverns IP-adress. Ange en annan IP-adress.",
			"00000051": 				"Den här MAC-adressen finns redan. Ange en annan.",
			"00000052": 				"Den här IP-adressen finns redan. Ange en annan.",

			"00000053": 				"Startadressen bör inte vara större än den avslutande adressen. <BR/> ange igen. ",

			"00000054": 				"IP-adresser och LAN-IP-adress ska vara i samma subnät. Ange igen.",

			"00000055": 				"IP-adress kan inte vara samma som LAN-adressen.",

			"00000056": 				"Fjärr-IP-adress och aktuella LAN-IP-adressen får inte vara i samma subnät. Ange en annan.",

			"00000057": 				"Ogiltig PSK lösenord, mata in igen.",
			"00000058": 				"Ogiltig WEP-lösenord, mata in igen.",

			"00000059": 				"Ogiltig IP-adress och nätmask, ange en giltig.",

			"00000060": 				"WAN-IP-adressen och LAN-IP-adressen får inte vara i samma subnät. <BR/> ange ett annat. ",

			"00000061": 				"Tidens början bör vara tidigare än slutdatumet.",

			"00000062": 				"Det här fältet är obligatoriskt.",
			"00000063": 				"Det här fältet är obligatoriskt.",

			"00000064": 				"Kan inte blockera värdens MAC-adress.",
			"00000065": 				"Denna punkt är oförenlig med existerande objekt. Vänligen kontrollera.",
			
			"00000066": 				"Lösenordet måste vara 8 till 63 tecken eller 64 hexadecimala siffror.",
			"00000067": 				"Lösenordet bör vara 10 hexadecimala siffror.",
			"00000068": 				"Lösenordet måste vara 5 ASCII-tecken.",
			"00000069": 				"Lösenordet bör vara 26 hexadecimala siffror.",
			"00000070": 				"Lösenordet måste vara 13 ASCII-tecken.",
			"00000071": 				"Lösenordet bör vara 32 hexadecimala siffror.",
			"00000072": 				"Lösenordet måste vara 16 ASCII-tecken.",
			"00000073": 				"Lösenordet bör vara mindre än 64 tecken.",

			"00000074": 				"Ogiltig filtyp.",

			"00000075": 				"PIN ska vara 8 siffror.",

			"00000076": 				"Posten är i konflikt med existerande objekt. Vänligen kontrollera trigger port och protokoll.",
			"00000077": 				"IP-adress kan inte vara samma som LAN-IP-adress.",
			"00000078": 				"Värdens IP-adress kan inte vara samma som LAN-IP-adress.",

			"00000080": 				"Lösenorden stämmer inte överens. Försök igen.",

			"00000083": 				"Gateway kan inte vara samma som IP.",
			"00000084": 				"Primär DNS kan inte vara samma som IP.",
			"00000085": 				"Sekundär DNS kan inte vara samma som IP.",
			"00000086": 				"Primär DNS kan inte vara samma som sekundär DNS.",

			"00000088": 				"Operationen är inte tillåten för fjärrkontroll.",
			"00000089": 				"Du har överskridit %num försök.  Försök igen om två timmar.",

			"00000090": 				"Målet kan inte vara LAN-IP-adress.",
			"00000091": 				"Målet kan inte vara WAN-IP-adress.",

			"00000092": 				"IP-adressen och LAN-IP-adressen får inte vara i samma subnät. <BR/> ange igen. ",
			"00000093": 				"IP-adressen och LAN-IP-adressen får inte vara i samma subnät. <BR/> ange igen. ",

			"00000094": 				"VLAN-ID kan inte vara samma.",
			"00000095": 				"Minst en internet-port behövs.",

			"00000096": 				"Nyckelordet finns redan.",

			"00000097": 				"Utförda konfigurationer för 2,4 GHz kommer inte att träda i kraft förrän Wi-Fi -knappen är PÅ.",
			"00000098": 				"Utförda konfigurationer för 5GHz kommer inte att träda i kraft förrän Wi-Fi -knappen är PÅ.",
			"00000099": 				"Utförda konfigurationer för 2,4 GHz och 5 GHz frekvensband kommer inte att träda i kraft förrän Wi-Fi -knappen är PÅ.",

			"00000100": 				"5GHz nätet är inte tillgängligt på grund av begränsningar i ditt region/land.",
			"00002100": 				"60GHz nätverket är inte tillgängligt på grund av begränsningar i din region / land.",

			"00000101": 				"Den trådlösa funktionen är avstängd. Om du vill använda den här funktionen. Slå på Wi-Fi -knappen.",
			"00000102": 				"Den trådlösa funktionen är avstängd. Om du vill använda den här funktionen. Slå på Wi-Fi -knappen.",
			"00002102": 				"Den trådlösa funktionen är avstängd. Om du vill använda den här funktionen. Slå på Wi-Fi -knappen.",

			"00000103": 				"Den trådlösa funktionen är avstängd. Om du vill använda den här funktionen. Slå på Wi-Fi -knappen.",
			"00000104": 				"Den trådlösa funktionen är deaktiverad.",

			"00000105": 				"QoS och IPTV kan inte aktiveras samtidigt.",

			"00000106": 				"IP-adress kan inte vara samma som LAN-IP-adress.",
			
			"00000107": 				"Destination finns redan.",

			"00000110": 				"IP-adressen och LAN-IP-adress ska vara i samma subnät.",
			
			"00000111": 				"QoS och <a onclick= \"$.su.menu.advanced.goTo('system-parameters');\" src= \"void(0) \">NAT Öka</a> kan inte aktiveras samtidigt. ",
			"00000112": 				"WDS funktionen kan arbeta antingen i 2.4GHz eller 5GHz-bandet. Nätetverket är inte tillgängligt på WDS bandet.",
			"00000113": 				"WDS och nätverk kan inte aktiveras samtidigt.",
			"00000114": 				"Trafikstatistik och <a onclick= \"$.su.menu.advanced.goTo('system-parameters');\" src= \"void(0) \">NAT Öka</a> kan inte aktiveras samtidigt. ",

			"00000117": 				"Domännamnet finns redan.",
			"00000118": 				"Antalet domännamn har överskridit gränsen.",
			"00000119":					"NAT-Boost inaktiveras när antingen <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> eller <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Trafik statistik</a> är aktiverad.",

			"00000120": 				"Lösenordet måste vara 5 eller 13 ASCII-tecken.",
			"00000121": 				"Lösenordet bör vara 10 eller 26 hexadecimala siffror.",
			"00000122": 				"Användarnamnet eller lösenordet är tomt, är du säker på att du vill fortsätta?",
			"00000123": 				"Sparar ... Använd inte under processen.",
			"00000124": 				"Routerns PIN-kod är låsta på grund av upprepade gånger med fel PIN-KOD. Skapa en ny.",

			"00000125": 				"Antalet QoS-regler har överskridit gränsen.",
			"00000126": 				"Filen har överskridit gränsen.",
			"00000127": 				"Innehållet i filen är felaktig.",
			"00000128": 				"Välj minst en tillämpning.",
			"00000129": 				"Välj minst en fysisk port.",
			"00000130":					"WPS-funktionen är avaktiverad.",
			"00000131": 				"NTP-server får inte vara loopback-adress.",
			"00000132": 				"Läges ändring misslyckades. Försök igen senare eller starta om din router.",
			"00000133": 				"Ogiltig IP-adress för DMZ-värd. Ange ett giltigt värde.",
			"00000134":  				"Ogiltiga interna IP. Ange ett giltigt värde.",
			"00000135": 				"Fil fel.",
			"00000136": 				"Säkerhetskopia fel.",
			"00000137": 				"Ogiltig IP-adress, ange en giltig.",
			"00000139": 				"Felaktigta parametrar för återhämtning av lösenord.",
			"00000140": 				"Felaktig kod.",
			"00000141": 				"Återhämtning av lösenord är deaktiverad.",
			"00000142": 				"Det gick inte att skicka kod. Kontrollera din Internet-anslutning.",
			"00000143": 				"Ogiltiga epost-adresser.",
			"00000144": 				"Ogiltigt epost-meddelande.",
			"00000145": 				"Det gick inte att hitta värddatorn.",
			"00000146": 				"Autentisering misslyckades.",
			"00000147": 				"Porten skall vara mellan 1 och 65535.",
			"00000148": 				"För ett portintervall, skall startportnummer vara mindre än slutportnummer. Ange igen.",
			"00000149": 				"Portnummer överlappar. Ange igen.",
			
			"00000150": 				"Vägen existerar inte .",
			"00000151": 				"Tilldelningsläge inte inställd.",
			"00000152": 				"Problem med denna väg.",
			"00000153": 				"Volym hittades inte.",
			"00000154": 				"Ingen USB-enhet.",
			
			"00000155": 				"PPTP VPN-klient IP-adress och LAN IP-adressen inte kan vara i samma subnät. <br/> Ange en annan.",
			"00000156": 				"PPTP VPN-klient IP-adress och OpenVPN klient IP-adress kan inte vara i samma subnät. <br/> Ange en annan.",
			
			"00000213":					"DNS-serverns IP-adress och LAN-IP-adressen får inte vara samma subnät. <br/>ange annan.",

			"00000222":  				"Högsta antal poster.",
			"00000231": 				"Duplicerad post.",
			"00000232": 				"Ogiltig URL.",
			"00000233":					"Välj minst en dag.",

			"00000301": 				"Maximalt antal mappdelningar",
			"00000302": 				"Maximalt antal mappdelningar i en volym",
			"00000303": 				"Duplicera delad mappsökväg.",
			"00000304": 				"Duplicera delad mappnamn.",

			"00001000":					"Uppgraderingen pågår, var god vänta.",
			"00001001": 				"WDS-funktionen kan arbeta antingen vid 2,4 GHz eller 5 GHz.",
			"00001002":					"Felaktig kod.",

			"00001123": 				"Den inmatade regeln saknas, ange åtminstone en regel.",
			"00001124": 				"Den fysiska portregel är noll, välj minst en regel.",

            "00002000": 				"Det här objektet är i konflikt med ISP-specifikt statisk routing, är du säker på att du vill fortsätta?",

            "00003000":                 "IPv6 passthrough konflikter med IPTV! Om du vill använda denna funktion, vänligen stänga IPTV inställningar.",
			"00004139": 				"Ingen Internet-anslutning",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Begäran tog för lång tid. Kontrollera din Internet-anslutning och försök igen senare.",
			"00004141": 				"Okänt fel.",
			"00004142": 				"Felaktig verifieringskod.",
			"00004143": 				"Felaktigt lösenord.",
			"00004144": 				"Användarnamn existerar redan.",
			"00004145": 				"Felaktigt lösenord.",//new password
			"00004146": 				"Kunde inte Unbind denna enhet. Försök igen senare.",
			"00004147": 				"Denna enhet har bundits till ett annat konto.",
			"00004148": 				"Felaktig inmatning.",
			"00004149": 				"Det här domännamnet finns redan.",
			"00004150": 				"Det gick inte att hämta den fasta programvaran. Kontrollera din Internet-anslutning och försök igen senare.",
			"00004151": 				"Inte mer än 1000 domännamn kan registreras på  samma clous-konto.",
			"00004152": 				"Denna enhet har bundits till ett annat domännamn.",
			"00004153": 				"Det här domännamnet har bundits till en annan enhet.",
			"00004154": 				"Inget svar från servern. Försök igen senare.",
			"00004155": 				"Konto existerar inte.",
			"00004156": 				"Det går inte att starta moln-program. Starta om enheten och försök igen senare.",
			"00004157": 				"Det går inte att ansluta till moln-server. Kontrollera din Internet-anslutning och försök igen senare.",
			"00004158": 				"WAN-porten är ansluten.",
			"00004159": 				"Det går inte att ansluta till Internet. Kontakta din operatör eller försök igen senare.",
			"00004160": 				"Det går inte att erhålla IP-adress från DHCP-servern. Kontrollera WAN-anslutnings typ eller försök igen senare.",
			"00004161": 				"PPPoE-autentisering misslyckades. Kontrollera ditt användarnamn och lösenord.",
			"00004162": 				"Det går inte att ansluta till PPPoE-servern.",
			"00004164": 				"PPTP autentiseringen misslyckades. Kontrollera ditt användarnamn och lösenord.",
			"00004165": 				"Det går inte att ansluta till PPTP-servern.",
			"00004167": 				"L2TP autentiseringen misslyckades. Kontrollera ditt användarnamn och lösenord.",
			"00004168": 				"Det går inte att ansluta till L2TP-servern.",
			"00004169": 				"Okänt fel. Försök igen senare.",
			"00004170": 				"WAN-porten är ansluten.",
			"00004171": 				"Ingen Internet-anslutning.",
			"00004172": 				"Anslutningen misslyckades.",
			"00004173": 				"Fel användarnamn eller lösenord",
			"00004174": 				"Ogiltig e-postadress.",
			"00004175": 				"Ogiltigt format på användarnamn.",
			"00004176": 				"E-post finns redan",
			"00004177": 				"Det går inte att få tillgång till kontoinformation. Uppdatera sidan.",
			"00004178":   				"Systemfel. Uppdatera sidan och försök igen.",
			"00004179":   				"Kunde inte binda denna enhet. Försök igen senare.",
			"00004180":   				"Denna enhet har varit obundet från moln-konto. Logga in med ditt konto igen för att binda enheten med ditt konto.",
			"00004181":   				"Enheten är offline. Kontrollera dina Internetinställningar.",
			"00004182":   				"Det går inte att skicka e-post. Kontrollera din Internet-anslutning och försök igen.",
			"00004183":   				"Account should contain to characters. ",
			"00004184":   				"Du har angett fel lösenord 20 gånger. Försök igen om 2 timmar.",
			"00004185":   				"Du har fått verifieringskoden 10 gånger på en timme. Försök igen om 24 timmar.",
			"00004186":   				"Tyvärr, går inte att aktivera ditt konto. Vänligen skicka e-post för verifiering.",
			"00004187":   				"Tyvärr, är länken föråldrad. Vänligen skicka e-post för verifiering.",
			"00004188":   				"Tyvärr, är länken föråldrad. Vänligen skicka e-post igen.",
			"00004189":   				"Tyvärr, kan inte återställa ditt lösenord. Vänligen skicka e-post igen.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Firmware uppgraderingsfel.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Status",
			NETWORK: 					"Nätverk",
			NETWORK_MAP: 				"Nätverkskarta",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP-server",
			DYNAMIC_DNS: 				"Dynamisk DNS",
			ADVANCED_ROUTING: 			"Avancerad routing",

			WIRELESS: 					"Trådlöst",
			WIRELESS_SETTINGS: 			"Trådlösa inställningar",
			WDSBRIDGING: 				"WDS överbrygga",
			WPS: 						"WPS Bridging",
			MACFILTERING: 				"MAC-filtrering",
			WIRE_STATISTICS: 			"Statistik",
			
			
			GUEST_NETWORK: 				"Gästnätverk",
			WIRELESS_SETTINGS: 			"Trådlösa inställningar",
			STORAGE_SHARING: 			"Delad lagring",
			NAT_FORWARDING: 			"NAT-vidarekoppling",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Virtuella servrar",
			PORT_TRIGGERING: 			"Portutlösare",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB-inställningar",
			BASIC_SET: 					"Grundläggande inställningar",
			DISK_SET: 					"Enhetsinställningar",
			FOLDER_SHARING: 			"Dela tillgång",
			STORAGE_SHARING: 			"Delad lagring",
			FTP_SERVER: 				"FTP-server",
			MEDIA_SERVER: 				"Media Server",
			PRINT_SERVER: 				"Skrivarservern",
			G3_G4: 						"3G/ 4G",
			OFFLINE_DOWNLOAD: 			"Offline-hämtning",
			
			PARENTAL_CONTROL: 			"Föräldrakontroll",

			QOS:  						"QoS",
			DATABASE:  					"Databas",

			STREAMBOOST: 				"Strömnings boost",
			MAP: 						"Karta",
			SB_MAP: 					"Karta",
			SB_BANDWIDTH:  				"Bandbredd",
			SB_PRIORITY: 				"Prioritet",
			SB_STATISTICS: 				"Statistik",

			
			SECURITY: 					"Säkerhet",
			SETTINGS: 					"Inställningar",
			ACCESS_CONTROL: 			"Åtkomstkontroll",
			IP_MAC_BINDING: 			"IP&MAC bindning",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Systemverktyg",
			TIME_SETTINGS: 				"Tidsinställningar",
			DIAGNOSTIC: 				"Felsökning",
			FIRMWARE_UPGRADE: 			"Uppgradering av fast programvara",
			BACKUP_RESTORE: 			"Säkerhetskopiering och återställning",
			ADMINISTRATION: 			"Administration",
			SYSTEM_LOG: 				"Systemlogg",
			STATISTICS: 				"Trafikstatistik",
			SYSTEM_PARAMETERS: 			"Systemparametrar",
			VPN: 						"VPN-server",
			OPEN_VPN: 					"ÖppenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN-anslutningar"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Region och tidszon",
			INTERNET_CONNECTION_TYPE: 	"Typ av Internet-anslutning",
			WIRELESS_SETTINGS: 			"Trådlösa inställningar",
			SUMMARY: 					"Sammanfattning",
			SETUP_COMPLETE: 			"Testa din anslutning",

			EXIT: 						"Avsluta",
			NEXT: 						"Nästa",
			SAVE: 						"Spara",
			FINISH: 					"Avsluta",
			OK: 						"OK",
			NONE: 						"Test misslyckades.",

			REGION: 					"Region",
			TIME_ZONE: 					"Tidszon",
			NO_SELECT: 					"Välj alternativ.",

			AUTO_DETECT: 				"Automatisk upptäckt",
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP-adress",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Om du inte är säker på vilken typ av Internet-anslutning du har, använd Auto Detect eller kontakta din Internet-leverantör (ISP) för att få hjälp.",

			DYNAMIC_IP_INFO: 			"Om din ISP bara tillåter Internet till en specifik MAC-adress, måste du klona MAC-adressen från den primära datorn. Om du är osäker, välj <strong> INTE klona MAC-adress </strong>.",
			MAC_CLONE_NO: 				"Klona inte  MAC-adressen",
			MAC_CLONE_YES: 				"Klona nuvarande dator MAC-adress",
			MAC_CLONE_NOTE: 			"Om du väljer Clone MAC-adress. Kontrollera att MAC-adressen på den här datorn är registrerad hos din Internet-leverantör innan du klickar på Nästa.",

			PPPOE_INFO: 				"Ange PPPoE-användarnamn och lösenord.",
			
			STATIC_IP_INFO: 			"Ange IP-information.",

			L2TP_INFO: 					"Ange ditt L2TP användarnamn och lösenord",
			PPTP_INFO: 					"Ange ditt PPTP-användarnamn och lösenord.",
			
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			SERVER_IP_ADDRESS_NAME: 	"VPN-server IP/domännamn",
			IP_ADDRESS: 				"IP-adress",
			SUBNET_MASK: 				"Nätmask",
			DEFAULT_GATEWAY: 			"Standard-gateway",
			PRIMARY_DNS: 				"Primär DNS",
			SECOND_DNS: 				"Sekundär DNS",
			OPTIONAL: 					"(Tillval)",
			
			ON: 						"På",
			OFF: 						"Avstängd",
			WIRELESS_24GHZ: 			"Trådlös 2,4 GHz",
			WIRELESS_5GHZ: 				"Trådlös 5GHz",
			WIRELESS_60GHZ: 				"60GHz trådlöst",
			ENABLE_WIRELESS_RADIO: 		"Aktivera trådlöst nätverk",
			NAME_SSID: 					"Namn på trådlöst nätverk (SSID)",

			SUMMARY_INFO1: 				"Du behöver koppla in din trådlösa enheter till det nya trådlösa nätverket innan du klickar på <strong>Nästa</strong> knappen.",
			SUMMARY_INFO2: 				"Det trådlösa nätverkets namn och lösenord har ändrats enligt nedan:",
			SUMMARY_INFO3: 				"Kontrollera att du har kopplat till den nya trådlösa nätverk.",

			WIRELESS_24GHZ_SSID: 		"Trådlös 2,4 GHz namn (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Trådlös 2,4 GHz lösenord",
			WIRELESS_5GHZ_SSID: 		"Trådlös 5GHz namn (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Trådlös 5GHz lösenord",
			WIRELESS_60GHZ_SSID: 		"Trådlöst 60GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"Trådlöst 60GHz lösenord",

			SORRY: 						"Misslyckades.",
			SUCCESS: 					"Framgång!",
			TEST_INTERNET_SUCCESS_INFO: "Klicka på Avsluta för att avsluta Snabbinstallation.",

			TEST_INTERNET_FAILED_INFO_0:"Kontrollera att alla Quick Setup parametrar är korrekta och försök igen. Om alla Quick Setup parametrar är korrekta. Starta om modemet, vänta 2 minuter och klicka på Testa Internet-anslutning. Om du inte använder ett modem, kan du behöva kontakta din Internet-leverantör (ISP) för att få hjälp.",
			SUMMARY_INFO4: 				"Tyvärr! Vi upptäcker att du inte anslutit den trådlösa enheten till det nya trådlösa nätverket. Var snäll och gör det och klicka sedan på <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Grattis!",
			COMPLETE_INFO_0: 			"Du har slutfört den snabba installationen.",
			COMPLETE_INFO_1:			"Klicka på Testa Internet anslutning nedan, klicka sedan på Slutför.",
			TEST_INTERNET: 				"Testa Internet-anslutning",

			
			RESET_USER_TITLE: 			"Ställ in ett nytt användarnamn och lösenord",
			NEW_USERNAME: 				"Nytt användarnamn",
			NEW_PASSWORD: 				"Nytt lösenord",
			CONFIRM_PASSWORD: 			"Bekräfta nytt lösenord",
			CONFIRM: 					"Bekräfta"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Internet Status",

			GHZ24: 						"2,4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Anslutningstyp",
			SECONDARY_CONN: 			"Sekundär anslutning",

			POOR_CONNECTED: 			"Dålig anslutning",
			UNPLUGGED: 					"Ej ansluten",
			
			CONNECTED: 					"Ansluten",
			DISCONNECTED: 				"Urkopplad",
			CONNECTING: 				"Ansluta",

			INTERNET_IP_ADDR: 			"IP-adress",
			
			IP_ADDR: 					"IP-adress",
			MAC_ADDR: 					"MAC-adress",
			GATEWAY: 					"Gateway",

			AUTO: 						"Auto",
			
			ROUTER: 					"Routern",
			WIRELESS_CLIENTS: 			"Trådlösa klienter",
			HOST_CLIENTS: 				"Värd klienter",
			GUEST_CLIENTS: 				"Gäst klienter",
			WIRE_CLIENTS: 				"Fasta klienter",
			PRINTER: 					"Skrivare",
			USB_DISK: 					"USB-disk",
			WIRELESS: 					"Trådlöst",
			NAME: 						"Namn",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanal",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Trådlös 2,4 GHz",
			WIRELESS_5GHZ: 				"Trådlös 5GHz",
			WIRELESS_60GHZ:				"60GHz trådlöst",
			
			GUEST_24GHZ: 				"Gäst nätverk 2,4 GHz",
			GUEST_5GHZ: 				"Gäst nätverk 5GHz",
			
			STATUS: 					"Status",
			TOTAL: 						"Totalt",
			AVAILABLE: 					"Tillgängliga",
			GB: 						"GB",
			BRAND: 						"Märke",

			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP-adress",
			SUBNET_MASK: 				"Nätmask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6Till4 Tunnel",
			NONE: 						"Ingen"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Automatisk upptäckt",
			INTERNET_CONN_TYPE: 		"Typ av Internet-anslutning",
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP-adress",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"Dhcp",
			UNPLUGGED: 					"Urkopplad",
			NONE: 						"Ingen",
			DETECT_FAIL: 				"Automatisk avkänning misslyckades",
			SECONDARY_CONN: 			"Sekundär anslutning",

			DYNAMIC_YES: 				"Klona inte  MAC-adressen",
			DYNAMIC_NO: 				"Klona nuvarande dator MAC-adress",
			
			IP_ADDR: 					"IP-adress",
			SUBNET_MASK: 				"Nätmask",
			DEFAULT_GATEWAY: 			"Standard-gateway",
			PRIMARY_DNS: 				"Primär DNS",
			SECOND_DNS: 				"Sekundär DNS",
			OPTIONAL: 					"(Tillval)",
			USER_NAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			SERVER_IP_ADDR_NAME: 		"VPN-server IP/domännamn",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Om du inte är säker på vilken typ av Internet-anslutning du har, använd Auto Detect eller kontakta din Internet-leverantör (ISP) för att få hjälp."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Trådlösa inställningar",
			MODE_2G: 					"Trådlös 2,4 GHz",
			MODE_5G: 					"Trådlös 5GHz",
			MODE_60G: 					"60GHz trådlöst",
			WIRELESS_NETWORK_NAME: 		"Namn på trådlöst nätverk (SSID)",
			WIRELESS_PASSWORD: 			"Lösenord",
			ENABLE_WIRELESS: 			"Aktivera trådlöst nätverk",
			SAVE: 						"Spara",
			ENCRYPTION_2G_NOTICE:		"2,4 GHz kryptering är %s.",
			ENCRYPTION_5G_NOTICE:		"5GHz kryptering är %s.",
			ENCRYPTION_60G_NOTICE:		"60GHz kryptering är %s.",
			ENCRYPTION_2G_NO: 			"2,4 GHz trådlösa nätverket är inte krypterat.",
			ENCRYPTION_5G_NO: 			"5GHz trådlösa nätverket är inte krypterat.",
			ENCRYPTION_60G_NO: 			"60GHz trådlöst nätverk är inte krypterad.",
			ENCRYPTION_NO: 				"Oskyddat trådlöst nätverk kan ha dolda faror.",
			ENCRYPTION_SURE: 			"Är du säker på att du vill fortsätta?",
			HIDE_SSID: 					"Dölj SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Grundläggande inställningar",
			TITIL_NEW:					"Disk&konto",
			DISK_SET:					"Enhetsinställningar",

			SELFLY_REMOVE:				"Ta bort säkert",
			SCANING:					"Skanna ...",
			SCAN_RESULT:				"Hitatde disk %n",
			
			DISKS:						"Disk",
			USERS: 						"Användarkonto",
			DEVICENAME: 				"Enhetens namn",
			VOLUMN: 					"Volym",

			USBSPACE: 					"Använt utrymme",
			FREESPACE: 					"Ledigt utrymme",
			STATUS: 					"Status",
			INACT: 						"Inaktivera",
			USAGE: 						"Användning",
			CAPACITY: 					"Kapacitet",
			OPERATION: 					"Funktion",
			
			ACC: 						"Kontohantering", 	 	
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			USE_LOGIN: 					"Använd Logga in användare",
			SCAN: 						"Skanna",
			ENJECT_ALL: 				"Mata ut alla",
			ENJECT: 					"Mata ut",
			ADD_USER: 					"Lägg till användare",
			AUTH: 						"Myndigheten",


			LOCATION: 					"Placering",
			MOBILE_ISP: 				"Mobil INTERNET-LEVERANTÖR",
			DIAL_NUMBER: 				"Slå nummer",
			APN: 						"APN",
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			MTU_SIZE: 					"MTU-storlek (i byte)",
			OPTIONAL: 					"(Tillval)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Föräldrakontroll",
			UNKNOWN: 					"Okänd",
			
			DEVICE_CTR: 				"Enheter under föräldrakontroll",
			ID: 						"ID",
			DEVICE: 					"Enhetens namn",
			MAC_ADDRESS: 				"MAC-adress",
			TIME: 						"Internet-åtkomst tid",
			DESCRIPTION: 				"Beskrivning",
			ENABLE: 					"Aktivera",
			ENABLE_THIS_ENTRY: 			"Aktivera den här funktionen",
			OPTIONAL: 					"(Tillval)",
			BTN_VIEW: 					"Visa befintliga enheter",
			
			DEVICE_LIST: 				"Enhetslista",
			SYSTEM_TIME: 				"Systemtid",
			
			RESTR: 						"Innehåll begränsning",
			MODE: 						"Begränsning",
			BLACKMODE: 					"Blacklist",
			WHITEMODE: 					"Whitelist",
			ACCESS_DEVICES_LIST: 		"Gå till listan över enheter",
			
			CHOOSE: 					"Välj",
			ADD_A_NEW_KEYWORD: 			"Lägg till ett nytt nyckelord för att blockera",
			ADD_A_NEW_DOMAIN_NAME: 		"Lägg till en ny domännamn för att komma åt.",
			
			OPT: 						"Funktion",
			STATUS: 					"Föräldrakontroll",
			YOURPC:						"Din PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Gäst nätverk",
			MODE_2G: 					"Trådlös 2,4 GHz",
			MODE_5G: 					"Trådlös 5GHz",
			WIRELESS_NETWORK_NAME: 		"Namn på trådlöst nätverk (SSID)",
			WIRELESS_PASSWORD: 			"Lösenord",
			DYNAMIC_PASSWORD: 			"Lösenord",
			ENABLE_WIRELESS: 			"Aktivera gästnätverk",
			SAVE:						"Spara",
			HIDE_SSID: 					"Dölj SSID",
			PASSWORD_CHANGE_CYCLE: 		"Lösenords intervall uppdatering",
			PER_DAY: 					"Dagligen",
			PER_WEEK: 					"Varje vecka",
			PER_MONTH: 					"Varje månad",
			NEVER: 						"Aldrig",
			UNENCRYPTED:				"Gäst nätverket är okrypterat. Du kan sätter ett lösenord på menyn Avancerat."
		},

		STATUS: {
			TITLE: 						"Status",
			INTERNET:					"Internet",
			WIRELESS:					"Trådlöst",
			LAN:						"LAN",
			USB_TITLE:					"USB-enheter",
			PERFORMANCE: 				"Prestanda",
			GUEST_NETWORK: 				"Gäst nätverk",
			ACCESS_DEVICES: 			"Få åtkomst till enheter",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Anslutningstyp",

			MAC_ADDRESS: 				"MAC-adress",
			IP_ADDRESS: 				"IP-adress",
			RELEASE: 					"Släpp",
			RENEW: 						"Förnya",
			
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP-adress",
			SUBNET_MASK: 				"Nätmask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6Till4 Tunnel",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass-Through (Bridge)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Ingen",
			
			DEFAULT_GATEWAY: 			"Standard-gateway",
			DNS: 						"DNS-server",
			MAC: 						"MAC-adress",
			WDS_STATUS: 				"WDS Status",
			
			IPV6_ADDRESS: 				"IP-adress",
			PRIMARY_DNS: 				"Primär DNS",
			SECOND_DNS: 				"Sekundär DNS",

			RADIO: 						"Trådlös radio",

			NAME_SSID: 					"Namn (SSID)",
			NETWORK_NAME_SSID:			"Nätverksnamn (SSID)",
			HIDE_SSID: 					"Dölj SSID",
			MODE: 						"Läge",
			CHANNEL: 					"Kanal",
			CHANNEL_WIDTH: 				"Kanalbredd",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Aktuell kanal",

			WDS: 						"WDS Status",
			WIRED_CLIENTS: 				"Fasta klienter",
			WIRELESS_CLIENTS: 			"Trådlösa klienter",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Länk-lokal adress",
			ASSIGN_TYPE: 				"Tilldelad typ",
			
			ALLOW_TO_SEE_EACH: 			"Tillåt att gäster kan se varandra",

			TOTAL: 						"Totalt:",
			AVAILABLE: 					"Tillgänglig:",

			USB: 						"USB-disk",
			PRINTER: 					"Skrivare",

			CPU_LOAD: 					"Processorbelastning",
			MEMORY_USAGE: 				"Minnesanvändning",

			IP_ADDR_P: 					"IP-adress:",
			MAC_ADDR_P: 				"MAC-adress:",
			CONN_TYPE_P: 				"Anslutningstyp:",

			DISABLED: 					"Inaktiverad",
			INIT: 						"Init.",
			SCAN: 						"Skanna",
			AUTH: 						"Aukt.",
			ASSOC: 						"Assoc",
			RUN: 						"Kör",
			HOST: 						"Värd",
			GUEST: 						"Gäst",

			ON: 						"På",
			OFF: 						"Avstängd"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Typ av Internet-anslutning",
			INTERNET_MAC_ADDRESS: 		"MAC-adress",
			
			CONNECT: 					"Anslut",
			DISCONNECT: 				"Koppla loss",

			IP_ADDR: 					"IP-adress",
			
			USE_DEFAULT_MAC: 			"Använd standard MAC-adress",
			USE_COMPUTER_MAC: 			"Använd styrenhetens MAC-adress",
			USE_CUSTOM_MAC: 			"Använd egen MAC-adress",
			MAC_CLONE: 					"MAC-klon",
			
			CONFIG: 					"Konfig.",
			
			IP_ADDRESS: 				"IP-adress",
			SUBNET_MASK: 				"Nätmask",
			DEFAULT_GATEWAY: 			"Standard-gateway",
			
			MANUAL_DNS: 				"Manuell DNS",
			PRIMARY_DNS: 				"Primär DNS",
			SECOND_DNS: 				"Sekundär DNS",
			
			RENEW: 						"Förnya",
			RELEASE: 					"Släpp",
			VIEW_MODE: 					"Visningsläge",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Få dynamiskt från internetleverantören",
			USE_FOLLOW_IP_ADDR: 		"Använd följande IP-adress",
			USE_FOLLOW_DNS_ADDR: 		"Använd följande DNS-adresser",
			USE_FOLLOW_DNS_SERVER: 		"Använd följande DNS-server",
			
			BASIC: 						"Grundläggande",
			ADVANCED: 					"Avancerad",
			
			DNS_ADDR_MODE: 				"DNS-adress",
			MTU_SIZE: 					"MTU-storlek",
			MTU_1500: 					"Byte. (Standard är 1500, ändras inte om inte nödvändigt.)",
			MTU_1480: 					"Byte. (Standard är 1480, ändras inte om inte nödvändigt.)",
			MTU_1460: 					"Byte. (Standard är 1460, ändras inte om inte nödvändigt.)",
			MTU_1420: 					"Byte. (Standard är 1420, ändras inte om inte nödvändigt.)",
			
			HOST_NAME: 					"Värdnamn",

			HOST_NAME_CONFIRM: 			"Värdnamnet innehåller otillåtna tecken som kan orsaka oväntat system beteende. Är du säker på att du vill fortsätta?",

			GET_IP_WITH_UNICAST_DHCP: 	"Hämta IP-med-unicast-DHCP (vanligtvis  krävs det inte.)",
			OPTIONAL: 					"(Tillval)",
			
			STATIC_IP: 					"Statisk IP-adress",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6:		    "Auto",
						
			USER_NAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			
			INTERNET_IP_ADDR: 			"IP-adress",
			INTERNET_DNS: 				"Internet DNS",
			SECONDARY_CONN: 			"Sekundär anslutning",
			NONE: 						"Ingen",
			INTERNET_PRIMARY_DNS:		"Primär DNS",
			INTERNET_SECONDARY_DNS: 	"Sekundär DNS",
			
			DYNAMIC_IP: 				"Dynamisk IP",
			DYNAMIC_IP_v6: 				"Dynamisk IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Service Namn",
			ACCESS_CONCENTRATOR_NAME:  	"Access Concentrator namn",
			DETECT_ONLINE_INTERVAL: 	"Upptäck Online-intervall",
			INTERVAL_TIPS: 				"Sekunder. (0-120. Standardvärdet är 10.)",
			IP_ADDR_MODE:  				"IP-adress",
			CONN_MODE: 					"Anslutningsläge",
			DHCP_LINK_UNPLUGGED: 		"WAN-porten är urkopplad.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"På begäran",
			TIME_BASED: 				"Tidsbaserade",
			MANUALLY: 					"Manuellt",
			MAX_IDLE_TIME: 				"Maximal vilotid",
			MAX_IDLE_TIME_TIPS: 		"Minuter. (0 Betyder alltid aktiv.)",
			PERIOD_OF_TIME: 			"Tidsperiod",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond kabel",
			AUTH_SERVER: 				"Auth. Server",
			AUTH_DOMAIN: 				"Auth. Domän",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"VPN-server IP/domännamn",
			PPTP: 						"PPTP",
			TO: 						"Till",
			
			TUNNEL_6TO4: 				"6till4 tunnel",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Få tillfällig IPv6-adress",
			GET_PREFIX_DELEGATION: 		"Få IPv6 prefix delegation",
			IPV6_ADDR: 					"IPv6-adress",

			GET_IPV6_WAY: 				"Få IPv6-adress",
			AUTOMATICALLY:              "Få automatiskt",
			SPECIFIED_BY_ISP: 			"Anges av LEVERANTÖREN",

			IPV6_ADDR_PREFIX: 			"IPv6 Adress Prefix",
			NONE_TEMPORARY: 			"Tillfälliga",

			PREFIX_DELEGATION: 			"Prefix delegation",
			ENABLE:                     "Aktivera",
			DISABLE:                    "Deaktivera",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 masklängd",
			CONFIG_TYPE: 				"Typ av konfiguration",
			RD6_PREFIX: 				"6RD Prefix",
			RD6_PREFIX_LENGTH: 			"6RD Prefix längd",
			REPLY_IPV4_ADDR: 			"Gräns svar IPv4-adress",
			MANUAL: 					"Manuell",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Genomströmning (Bridge)",
			LOCAL_IPV6: 				"Lokala ipv6-adress",
			PEER_IPV6: 					"Peer-ipv6-adress",
			TUNNEL_ADDR: 				"Tunnel adress",
			IPV4_NETMASK: 				"IPv4 nätmask",
			CUSTOM: 					"Anpassad",
		    AFTR_NAME: 					"AFTR namn",
			PPP_SHARE_V6:				"PPPoE samma session med IPv4-anslutning",
			PPP_SHARE_V4:				"PPPoE samma session med IPv6-anslutning",

			
			
			IPV4_ADDR: 					"IPv4-adress",
			IPV4_MASK: 					"IPv4 nätmask",
			IPV4_GATEWAY: 				"IPv4-standard gateway",

			DUPLEX: 					"Dubbelsidig utskrift",
			AUTO_NEGOTIATION: 			"Automatisk förhandling",
			FULL_DUPLEX_1000: 			"1000Mbps full duplex",
			HALF_DUPLEX_1000:			"1000Mbit/s halv duplex",
			FULL_DUPLEX_100: 			"100 Mbit/s full duplex",
			HALF_DUPLEX_100: 			"100 Mbit/s halv duplex",
			FULL_DUPLEX_10: 			"10 Mbit/s full duplex",
			HALF_DUPLEX_10: 			"10 Mbit/s halv duplex"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC-adress",
			IP_ADDRESS: 				"IP-adress",
			SUBNET_MASK: 				"Nätmask",
			CUSTOM: 					"Anpassad",

			IGMP: 						"Aktivera IGMP-Proxy",
			


			ASSIGNED_TYPE: 				"Tilldelad typ",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+statslösa DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Adress Prefix",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adress",
			DELEFATED: 					"Delegerad",
			STATIC: 					"Statisk",
			SITE_PREFIX: 				"Destinationsplatsens prefix",
			SITE_PREFIX_LEN: 			"Destinationsplatsens prefixlängd",

			PREFIX_TYPE:  				"Platsprefixets typ av konfiguration",
			LAN_IPV6_ADDR:  			"LAN IPV6-adress",

			RELEASE_TIME: 				"Frigörelsetid",
			RELEASE_TIME_TIP: 			"Sekunder. (Standard är 86400, ändras inte om inte nödvändigt.)",
			ADDRESS:					"Adress",
			SAVE: 						"Spara",

			REBOOT_TIP: 				"Routern hoppar över till den nya inloggningssidan. <BR/> Vänligen vänta ... "

		},

		IPTV:{
			TITLE: 						"Inställningar",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Aktivera IPTV", 
			MODE:  						"Läge",
			IGMP_PROXY: 				"IGMP-Proxy",
			IGMP_VERSION: 				"IGMP version",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bro",
			BASIC: 						"Anpassad",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Ryssland",
			UNIFY:  					"Malaysia-Unifi",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-telefon", 

			Q_TAG: 						"802.1Q Tag",
			ENABLE: 					"Aktivera",
			
			INTERNET_VLAN_ID: 			"Internet VLAN-ID",
			INTERNET_VLAN_PRIORITY: 	"Internet VLAN prioritet",
			IP_PHONE_VLAN_ID: 			"IP-telefonen VLAN-ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-telefon VLAN prioritet",
			IPTV_VLAN_ID: 				"IPTV-VLAN-ID",
			IPTV_VLAN_PRIORITY: 		"IPTV-VLAN prioritet",
			IPTV_MULTI_VLAN_ID: 		"IPTV Multicast VLAN-ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV Multicast VLAN prioritet"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP-server",
			
			SETTINGS: 					"Inställningar",

			DHCP_SERVER: 				"DHCP-server",
			ENABLE_DHCP_SERVER: 		"Aktivera DHCP-server",

			IP_ADDR_POOL: 				"IP-adresser",
			LEASETIME: 					"Adress lånetid",
			LEASENOTE: 					"minuter. (2-2880. Standardvärdet är 120.)",
			
			GATEWAY: 					"Standard-gateway",
			DOMAIN: 					"Standarddomän",
			PRIMARYDNS: 				"Primär DNS",
			SECONDARYDNS: 				"Sekundär DNS",

			OPTIONAL: 					"(Tillval)",

			CLIENTSLIST: 				"DHCP-Klient Lista",
			CLIENT_NUMBER: 				"Kundnummer",
			CLIENT_NAME: 				"Klientnamn",
			MAC_ADDR: 					"MAC-adress",
			ASSIGNED_IP: 				"Tilldelad IP-adress",
			LEASE_TIME: 				"Lånetid",

			RESERVATION: 				"Adress bokning",

			RESERVED_IP: 				"Reserverad IP-adress",
			IP_ADDRESS: 				"IP-adress",
			DESCRIPTION: 				"Beskrivning",

			CLIENTSLIST: 				"DHCP-Klient Lista",
			CLIENT_NUMBER: 				"Kundnummer",

			ENABLE: 					"Aktivera",
			ENABLE_THIS_ENTRY: 			"Aktivera den här funktionen",
			BTN_VIEW:					"Visa befintliga enheter"
			
		},

		DDNS: {
			DDNS: 						"Dynamisk DNS",
			SERVICEPROVIDER: 			"Tjänsteleverantör",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Gå till registrera dig ...",
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			DOMAIN_NAME_LIST: 			"Domän namn lista",
			DOMAIN_NAME: 				"Domännamn",
			LOGIN: 						"Logga in",
			LOGIN_SAVE: 				"Logga in och spara", 
			LOGOUT: 					"Logga ut",
			STATU_SUCCESS:				"Lyckas",
			UPDATE_INTERVAL:			"Uppdateringsintervall",
			ONE_HOUR:					"1 timme",
			SIX_HOUR:					"6 timmar",
			TWETEEN_HOUR:				"12 timmar",
			ONE_DAY:					"1 dag",
			TWO_DAY:					"2 dagar",
			THREE_DAY:					"3 dagar",
			NEVER:						"Aldrig",
			UPDATE:						"Uppdatera",
			STATU_INCORRENT:			"Fel användarnamn eller lösenord",
			STATU_ERR_DOMAIN:			"Domän namn fel",
			
			STATU_NO_LAUNCH:			"Lanserar inte",
			STATU_FAIL_DDNS: 			"Misslyckades att uppdatera DynDNS.",
			STATU_FAIL_NOIP: 			"Misslyckades att uppdatera No-IP.",
			STATU_CONN:					"Ansluta"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Avancerad routing",
			STATIC_ROUTING: 			"Statisk routing",

			DESTINATION_NETWORK:		"Nätverksdestination",
			SUBNET_MASK: 				"Nätmask",
			DEFAULT_GATEWAY: 			"Standard-gateway",
			DESCRIPTION: 				"Beskrivning",
			
			SYSTEM_ROUTING_TABLE: 		"System routingtabell",
			CLIENT_NUMBER: 				"Aktiva rutters nummer",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Gränssnitt",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Aktivera",
			ENABLE_THIS_ENTRY: 			"Aktivera den här funktionen"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Inställningar",
			NOT_SUPPORT_5G: 			"Regionen stöder endast 2,4 GHz. Se till att du väljer rätt region.",
			NOT_SUPPORT_60G: 			"Regionen stöder inte 60GHz.",
			ENABLE_TIPS: 				"Du bör slå på Wi-Fi.",

			REGION: 					"Region",
			NOTICE:  					"För att använda den trådlösa funktionen, bör du ha trådlös maskinvara påslagen.",
			
			MODE_2G:					"2,4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Trådlöst",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Aktivera trådlöst nätverk",

			WIRELESS_NETWORK_NAME: 		"Namn på trådlöst nätverk (SSID)",
			WIRELESS_PASSWORD: 			"Lösenord",
			HIDE_SSID: 					"Dölj SSID",

			SECURITY: 					"Säkerhet",
			NO_SECURITY: 				"Ingen säkerhet",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personligt (rekommenderas)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2-Företag",
			WPA2_PERSONAL: 			    "WPA2-Personligt (rekommenderas)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Version",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Kryptering",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Läge",
			MODE_B:  					"Endast 802.11b",
			MODE_G:  					"Endast 802.11g",
			MODE_N:  					"Endast 802.11n",
			MODE_BG:  					"802.11b/g blandad",
			MODE_GN: 					"802.11g/n blandad",
			MODE_BGN:  					"802.11b/g/n blandad",

			MODE_A_5: 					"Endast 802.11a",
			MODE_AN_5: 					"802.11a/n blandad",
			MODE_N_5: 					"Endast 802.11n",
			MODE_AC_5:					"Endast 802.11ac ",
			MODE_NAC_5:					"802.11n/ac blandad",
			MODE_ANAC_5:				"802.11a/n/ac blandad",

			MODE_AD_60:					"endast 802.11ad",

			CHANNEL_WIDTH: 				"Kanalbredd",
			CHANNEL: 					"Kanal",

			TRANSMIT_POWER: 			"Överföringsenergi",

			RADIUS_SERVER_IP: 			"RADIUS server IP",
			RADIUS_PORT: 				"RADIUS port",
			RADIUS_PASSWORD: 			"RADIUS lösenord",

			TYPE: 						"Typ",
			OPEN_SYSTEM: 				"Öppet system",
			SHARED_KEY: 				"Delad nyckel",

			KEY_SELECTED: 				"Nyckel som valts",
			KEY1: 						"Nyckel 1",
			KEY2: 						"Nyckel 2",
			KEY3: 						"Nyckel 3",
			KEY4: 						"Nyckel 4",

			WEP_KEY_FORMAT: 			"WEP nyckelformat",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Hexadecimal",

			KEY_TYPE: 					"Typ av nyckel",
			BIT64: 						"64-Bitars",
			BIT128: 					"128-Bitars",
			BIT152: 					"152-Bitars",

			KEY_VALUE: 					"Nyckelvärde",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Låg",
			MIDDLE: 					"Mellan",
			HIGH: 						"Hög"
		},

		WPS: {

			TITLE2: 					"Routerns PIN-KOD",
			ROUTERS_PIN_INFO: 			"Andra enheter kan ansluta till routern med WPS med routerns PIN-KOD.",
			ENABLE_ROUTE_PIN: 			"Routerns PIN-KOD",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Generera",
			DFT: 						"Standard",

			TITLE: 						"WPS-guiden",
			SELECT_SETUP: 				"Välja en installationsmetod",
			PUSH_BTN: 					"Tryck på knappen (rekommenderas)",
			PUSH_DES: 					"Tryck på den fysiska sätt på knappen på routern eller klicka på programvaran Anslut på den här sidan.",
			CONNECT: 					"Anslut",
			CANCEL: 					"Avbryt",

			RESULT_HEAD: 				"Den trådlösa klienten",
			RESULT_END: 				"Har lagts till i nätverket.",
			NOT_FOUND: 					"Ingen klient hittas. Klicka på knappen för att försöka igen.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Hittades inte",
			ENTER_CLIENT_PIN: 			"Ange kundens PIN-KOD",
			SWITCH_NOTE:				"För att ansluta med WPS, var vänlig slå på den trådlösa funktionen genom WiFi-knappen.",
			SWITCH_NOTE2:				"För att använda WPS-guiden bör du konfigurera rätt trådlösa parametrar först.",
			STATUS_PIN_ERROR: 			"Ogiltig WPS PIN? Kontrollera om det är korrekt.",
			STATUS_ERROR: 				"Fel.",
			STATUS_CONN_ERROR: 			"Anslutningen misslyckades.",
			STATUS_CONNING: 			"Anslutning ...",
			STATUS_CANCEL: 				"Anslutningen avbröts.",
			
			NOTE: 						"Obs!",
			BUTTON: 					"WIFI-knappen är avstängd",
			ENABLE: 					"WiFi är inte aktiverad",
			HIDDEN: 					"Dold SSID är aktiverat.",
			ENCRYPTION: 				"Kryptering är inte korrekt.",
			WPS: 						"WPS är inaktiverad på sidan för systemparametrarna.",

			
			STATUS_CONN_OVERLAP: 		"Anslutningen misslyckades (ÖVERLAPPNING).",
			STATUS_CONN_TIMEOUT: 		"Anslutningen misslyckades (TIMEOUT).",
			STATUS_CONN_INACT: 			"Anslutningen inaktiv."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Trådlösa stationer Online",
			CLIENT_NUMBER: 				"Kundnummer",
			MAC_ADDRESS: 				"MAC-adress",
			CONN_TYPE: 					"Anslutningstyp",
			SECURITY: 					"Säkerhet",
			RECEIVED_PACKETS: 			"Mottagna paket",
			SEND_PACKETS: 				"Skickade paket"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Inställningar",
			
			MODE_2G: 					"2,4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Tillåt att gäster kan se varandra",

			ALLOW_LOCAL: 				"Ge gäster tillgång till mitt lokala nätverk",
			
			WIRELESS: 					"Trådlöst",
			WIRELESS_24G_RADIO: 		"Trådlöst 2,4 GHz",
			WIRELESS_5G_RADIO: 			"Trådlöst 5GHz",
			ENABLE_GUEST: 				"Aktivera gästnätverk",

			NAME_SSID: 					"Namn på trådlöst nätverk (SSID)",
			HIDE_SSID: 					"Dölj SSID",
			PASSWORD_CHANGE_CYCLE: 		"Lösenords intervall uppdatering",
			PER_DAY: 					"Dagligen",
			PER_WEEK: 					"Varje vecka",
			PER_MONTH: 					"Varje månad",
			NEVER: 						"Aldrig",
			SECURITY: 					"Säkerhet",
			NO_SECURITY: 				"Ingen säkerhet",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personligt",

			VERSION: 					"Version",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Kryptering",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Lösenord"
		},

		NAT:{
			SETTINGS: 					"Hårdvara NAT",
			STATUS: 					"Hårdvara NAT",
			
			ALG_TITLE: 					"Application Layer Gateway (ALG)",

			FTP_ALG: 					"FTP-ALG",
			TFTP_ALG: 					"TFTP-ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP-vidarekoppling",
			L2TP_ALG: 					"L2TP-vidarekoppling",
			IPSEC_ALG: 					"IPSec-vidarekoppling",

			ENABLE_FTP_ALG: 			"Aktivera FTP-ALG",
			ENABLE_TFTP_ALG: 			"Aktivera TFTP-ALG",
			ENABLE_H323_ALG: 			"Aktivera H323 ALG",
			ENABLE_RTSP_ALG: 			"Aktivera RTSP ALG",
			ENABLE_PPTP_ALG: 			"Aktivera PPTP-vidarekoppling",
			ENABLE_L2TP_ALG: 			"Aktivera L2TP-vidarekoppling",
			ENABLE_IPSEC_ALG: 			"Aktivera IPSec-vidarekoppling",
			NAT_ENABLE_NOTICE: 			"Obs! Dina konfigurationer påverkas inte förrän NAT-funktionen är aktiverad."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Virtuella servrar",

			SERVICE_NAME: 				"Typ av tjänst",
			EXTERNAL_PORT: 				"Extern port",
			INTERNAL_IP: 				"Inre IP",
			INTERNAL_PORT: 				"Intern port",
			PROTOCAL: 					"Protokoll",

			BTN_VIEW: 					"Visa befintliga tjänster",

			EXSITTING_SERVICE: 			"Befintliga tjänster",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX eller XX)",
			EXT_PORT_TIPS: 				"(XX eller XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX eller tom ,1-65535)",

			NOTICE:						"I konflikt med remote management port. Är du säker på att du vill fortsätta?",
			NOTICE_INVALID_REMOTE:		"Fjärrhanteringen är ogiltigt berorende på att 80-porten är i konflikt med den virtuella servern. Ändra fjärrhanteringsporten.",
			NOTICE_ENTER_ANOTHER:		"I konflikt med porten för fjärrhanteringen. Ange en annan port.",
			NOTICE_PPTP_CONFLICT:		"I konflikt med PPTP VPN-porten. Ange en annan port.",
			NOTICE_OPENVPN_CONFLICT:	"I konflikt med OpenVPN porten. Ange en annan port.",


			ENABLE_THIS_ENTRY: 			"Aktivera",
			OPERATION: 					"Funktion",
			CHOOSE: 					"Välj",
			NAT_ENABLE_NOTICE: 			"Obs! Dina konfigurationer påverkas inte förrän NAT-funktionen är aktiverad."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Portutlösare",
			APPLICATION: 				"Ansökan",
			TRIGGER_PORT: 				"Aktiverings porten",
			TRIGGER_PROTOCOL: 			"Utlösande protokoll",

			EXTERNAL_PORTS: 			"Extern port",
			EXTERNAL_PROTOCOL: 			"Externa protokoll",

			BTN_VIEW: 					"Visa befintliga applikationer",

			EXSITTING_APPLICATION: 		"Befintliga applikationer",
			APPLICATION_NAME: 			"Programnamn",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX eller XX-XX,1-65535, som mest 5 par)",
			
			NOTICE_PPTP_CONFLICT:		"I konflikt med PPTP VPN-porten. Ange en annan port.",
			NOTICE_OPENVPN_CONFLICT:	"I konflikt med OpenVPN porten. Ange en annan port.",
			
			ENABLE_THIS_ENTRY: 			"Aktivera",
			OPERATION: 					"Funktion",
			
			PROTOCAL_ALL: 				"ALL",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Obs! Dina konfigurationer påverkas inte förrän NAT-funktionen är aktiverad."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Aktivera DMZ",
			HARDWARESTATUS: 			"IP-adress för DMZ-värd",
			NAT_ENABLE_NOTICE: 			"Obs! Dina konfigurationer påverkas inte förrän NAT-funktionen är aktiverad."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP-tjänst",
			CLIENT_NUMBER: 				"Kundnummer",
			SERVICE: 					"Servicebeskrivning",
			EXTERNAL_PORT: 				"Extern port",
			PROTOCAL: 					"Protokoll",
			IP_ADDR: 					"Intern IP-adress",
			INTERNAL_PORT: 				"Intern port",
			NAT_ENABLE_NOTICE: 			"Obs! Dina konfigurationer påverkas inte förrän NAT-funktionen är aktiverad."
		},

		G3_G4:{
			TITLE: 						"3G/ 4G",
			USB_MODEM: 					"USB-modem",
			LOCATION: 					"Placering",
			MOBILE_ISP: 				"Mobila internet-leverantör",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Anslutningsläge",
			CONNECT_ON_DEMAND: 			"Anslut på begäran",
			CONNECT_AUTOMATICALLY: 		"Anslut automatiskt",
			CONNECT_MANUALLY: 			"Anslut manuellt",
			MAX_IDLE_TIME: 				"Maximal vilotid",
			CONNECTION_TIP: 			"Den aktuella Internet är WAN-föredraget.",
			IDLE_TIME_TIP: 				"Anslutningsläge och Max Idle Time kan inte ställas in manuellt.",
			MINUTES: 					"Minuter. (0 Betyder vara aktiv hela tiden.)",

			AUTHENTICATION_TYPE: 		"Autentiseringstyp",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Standardvärdet är Automatisk, ändras inte såvida det inte är nödvändigt.",

			CONNECT: 					"Anslut",
			DISCONNECT: 				"Koppla loss",

			SET_TIP: 					"Ställ in Slå nummer, APN, användarnamn och lösenord manuellt.",
			DIAL_NUMBER: 				"Slå nummer",
			APN: 						"APN",
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			OPTIONAL: 					"(Tillval)",
			MTU_SIZE: 					"MTU-storlek (i byte)",
			MTU_SIZE_TIP: 				"Standardvärdet är 1480, ändras inte om inte nödvändigt",

			USE_FOLLOW_DNS_SERVER: 		"Använd följande DNS-servrar",
			PRIMARY_DNS: 				"Primär DNS",
			SECOND_DNS: 				"Sekundär DNS",

			UNPLUGGED: 					"Urkopplad",
			IDENTIFYING: 				"Identifiera ...",
			IDENTIFY_SUCCESS: 			"Identifiering framgångsrikt"
		},

		DISK_SETTING: {
			DISK_SET: 					"Enhetsinställningar",
			SCAN: 						"Skanna",
			SELFLY_REMOVE: 				"Ta bort säkert",
			SCAN_RESULT: 				"Hittade %n disk",
			NOT_FOUND: 					"Hittades inte",
			SELFLY_REMOVE: 				"Ta bort säkert",
			
			VOLUMN: 					"Volym",
			CAPACITY: 					"Kapacitet",
			FREESPACE: 					"Ledigt utrymme",
			USBSPACE: 					"Använt utrymme",
			
			STATUS: 					"Status",
			INACT: 						"Inaktivera",
			ACTIVE: 					"Aktiv",
			
			USAGE: 						"Användning",
			CAPACITY: 					"Kapacitet",
			OPERATION: 					"Funktion",	
			
			ACC: 						"Kontohantering", 	 	
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			USE_LOGIN: 					"Använd Logga in användare",
			SCAN: 						"Skanna",
			ENJECT_ALL: 				"Mata ut alla",
			ENJECT: 					"Mata ut",
			ADD_USER: 					"Lägg till användare",
			AUTH: 						"Myndigheten"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline-hämtning",
			ITEMS:						"Poster",
			FILE:						"Fil",
			FOLDER:						"Mapp",
			SIZE:						"Storlek",
			STATUS:						"Status",
			DOWNLOAD:					"Nedladdning",
			REMAINTING:					"Återstående tid",
			SPEED:						"Hastighet",
			SOURCE:						"Källa",	
			DOWNLOADTO:					"Ladda ner till",	
			TORRENT_PC:					"Torrent från PC",
			TORRENT_USB:				"Torrent från USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP-port",
			AMULEUDP:					"aMule UDP-port",
			AMULESERVER:				"aMule Server",
			SCHEDULE:					"Schema",
			MAXACTIVE:					"Maximalt antal aktiva uppgifter",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Tidszon",
			DOWNLOADTIME:				"Nedladdningstid",
			REPEAT:						"Upprepa",
			SPEEDLIMIT:					"Hastighetsbegränsning",
			MAXDOWNLOAD:				"Maximal hämtningshastighet",
			MAXUPLOAD:					"Maximal uppladdningshastighet",
			SPEEDTIPS:					"(0 betyder obegränsat.)",
			BTPORT:						"BT nedladdningsport",
			SEED:						"Fortsätt dela ut efter uppgift slutförd",
			UNIT:						"KB/S",
			MODIFY:						"Ändra",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrent placering",
			CONNECT:					"Ansluten",
			DISCONNECTED:				"Urkopplad",
			CONNECTING:					"Ansluta",
			GENERAL:					"Allmän",
			COMPLETED:					"Avslutad",
			NEWDEVICE:					"Ny enhet",
			FOUNDUSB:					"Upptäckt ett nytt USB",
			CONNECTEDPEERS:				"Anslutna klienter",
			OF:							"av",
			NUM_OF_CON:					"Antal anslutningar",
			NUM_OF_CON_G:				"Maximalt antal anslutningar globalt",
			NUM_OF_CON_PT:				"Maximalt antal anslutna Peers per Torrent",
			EN_DHT_NET:					"Aktivera DHT Network",
			EN_PE_EX:					"Aktivera Peer Exchange",
			EN_BT:						"Aktivera BitTorrent Protocol Encryption",
			GENERAL_SETTINGS:			"Allmänna inställningar",
			BT_SETTINGS:				"BT-inställningar",
			AMULE_SETTINGS:				"aMule inställningar",
			CLEAN:						"Avlägsna fullbordad",
			NONE_COMPLETE: 				"Inga utförd uppgift."
		},

		FOLDER: {
			TITLE: 						"Dela inställningar",
			ACCOUNT_TITLE: 				"Dela konto",
			ACCOUNT:					"Konto",
			AC_NOTE: 					"Skapa ett konto för att dela innehåll. Du kan använda det inloggade  kontot eller skapa en nytt.",
			
			AC_LOGIN: 					"Använd Standard konto",
			AC_FOLLOW: 					"Använd nytt konto",

			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",
			CONFIRM: 					"Bekräfta lösenord",

			SHARING_SETTING: 			"Dela inställningar",
			SERVER_NAME: 				"Nätverk/Media Server namn",

			METHOD: 					"Gå till metoden",
			LINK: 						"Länk",
			PORT: 						"Port",

			NETWORK_NEIGHBORHOOD: 		"Nätverket",
			FTP: 						"FTP",
			FTPEX: 						"FTP (via Internet)",

			SHARE_FOLDER: 				"Mappdelning",
			SHAREING_ALL: 				"Dela alla",
			NOTE:  						"Växla mellan på för att dela filer och mappar eller håll den avstängd för att bara dela de preciserade mapparna.", 
			ENABLE_AUTHENTICATION: 		"Aktivera autentisering",
			SHAREING_FOLDER: 			"Dela mappar",
			
			SHARE_NAME: 				"Mappnamn",
			FOLDER_PATH: 				"Sökväg",
			VOLUMN_NAME: 				"Volymnamn",

			SHARE_NAME: 				"Mappnamn",
			FOLDER_PATH: 				"Sökväg",
			MEDIA_SHARING: 				"Mediedelning",
			STATUS: 					"Status",

			GUEST_ACCESS: 				"Ge gäst tillgång till nätverket",
			ENABLE_AUTHENTICATION: 		"Aktivera autentisering",
			ENABLE_WRITE_ACCESS: 		"Aktivera skrivåtkomst",
			ENABLE_MEDIA_SHARE: 		"Aktivera mediedelning",
			
			BROWSE: 					"Bläddra",
			BROWSE_TITLE: 				"Välj en mapp",

			NO_VOLUMN:					"Ingen volym",
			
			NOTICE: 					"Är du säker på att du vill lämna för den dynamiska DNS-sidan? Tryck på Spara för att spara och avsluta. Tryck på Avsluta för att lämna utan att spara. Tryck på Avbryt om du vill stanna.",
			NO_CHANGE_NOTICE: 			"Är du säker på att du vill lämna för den dynamiska DNS-sidan?",

			SAVE_FAILED_NOTICE: 		"Det gick inte att spara",
			CONTINUE: 					"Lämna",
			CONTINUE_SAVE: 				"Spara",
			CANCLE: 					"Avbryt",

			ENABLE: 					"Aktivera"

		},

		PRINT:{
			TITLE: 						"Skrivarservern",
			NAME: 						"Skrivarnamn",
			ENABLE_PRINT_SERVER: 		"Skrivarservern",
			NONE: 						"Ingen",
			
			NOTE_TITLE: 				"Obs!",
			STEP1: 						"Steg 1:",
			STEP2: 						"Steg 2:",
			STEP3: 						"Steg 3:",

			NOTE1: 						"Installera skrivardrivrutinen på datorn",
			NOTE2: 						"Anslut USB-skrivare till USB-porten på routern via en USB-kabel.",
			NOTE3: 						"Installera TP-LINK USB Printer Utility Controller. Hämta den från vår officiella webbplats: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/se/Support/\">http://www.tp-link.com/se/Support/</a>.",
			NOTE3_US: 					"Installera TP-LINK USB Printer-kontrollverktyg. Ladda ner den från vår officiella hemsida: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Föräldrakontroll",
			STATUS: 					"Föräldrakontroll",
			UNKNOWN: 					"Okänd",

			DEVICE_CTR: 				"Enheter under föräldrakontroll",
			DEVICE: 					"Enhetens namn",
			MAC_ADDRESS: 				"MAC-adress",
			TIME: 						"Internet-åtkomst tid",
			DESCRIPTION: 				"Beskrivning",
			
			ENABLE_THIS_ENTRY: 			"Aktivera",
			OPTIONAL: 					"(Tillval)",
			BTN_VIEW: 					"Visa befintliga enheter",
			
			DEVICE_LIST: 				"Enhetslista",
			SYSTEM_TIME: 				"Systemtid",
			
			RESTR: 						"Innehåll begränsning",
			MODE: 						"Begränsning",
			BLACKMODE: 					"Blacklist",
			WHITEMODE: 					"Whitelist",
			ACCESS_DEVICES_LIST: 		"Gå till listan över enheter",
			
			CHOOSE: 					"Välj",
			ADD_A_NEW_KEYWORD: 			"Lägg till ett nytt nyckelord för att blockera",
			ADD_A_NEW_DOMAIN_NAME: 		"Lägg till en ny domännamn för att komma åt.",
			
			YOURPC:						"Din PC"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internet",
			ROUTER: 					"Routern",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Andra",

			DEVICE: 					"Enhet",
			RATE: 						"Kurs",
			APPLICATION: 				"Ansökan",

			NAME: 						"Namn",
			MAC_ADDRESS: 				"MAC-adress",
			IP_ADDRESS: 				"IP-adress",


			DEVICES: 					"Enheter"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Bandbredd",
			TEST_BANDWIDTH: 			"> Testa bandbredd ",
			STREAMBOOST: 				"Streamboost",
			ENABLE_STREAMBOOST: 		"Aktivera streamboost",
			UP_LIMITATION: 				"Övre begränsning (Mbit/s)",
			DOWN_LIMITATION: 			"Nedre begränsning (Mbit/s)",
			RUN_BANDWIDTH_TEST: 		"Kör bandbreddstest ",
			TESTING: 					"Testar",
			TEST_FAILED: 				"Testet misslyckades",
			TEST_SUCCEED: 				"Testet lyckades",
			ENABLE_AUTOMATIC_TEST: 		"Aktivera automatisk test",
			KEEP_UP_TO_DATE: 			"Håll StreamBoost uppdaterad",
			ENABLE_AUTOMATIC_UPDATE: 	"Aktivera automatiska uppdateringar"

		},

		PRIORITY:{
			PRIORITY: 					"Prioritet",
			PRIORITY_TIPS: 				"Med prioritet kan du ändra betydelsen av en enhet över en annan. Detta är användbart när enheten konkurrerar om begränsad bandbredd med tillämpning av samma klassificering.",
			ALL_DEVICE: 				"Alla enheter",
			ACTIVE_DEVICE: 				"Aktiv enhet",
			SAVE: 						"Spara",
			ID: 						"ID",
			DEVICE: 					"Enhet",
			TYPE: 						"Typ",
			MAC_ADDRESS: 				"MAC-adress",
			STICK: 						"Stick"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistik",
			UP_TIME: 					"Tid",
			DOWNLOADS: 					"Nedladdningar",
			LAST_DAY: 					"Sista dagen",
			LAST_WEEK: 					"Förra veckan",
			LAST_MONTH: 				"Förra månaden",
			ALL_LAN_HOSTS: 				"Alla LAN-värdar",
			OTHER: 						"Andra"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Brandvägg",
			ENABLE_SPI: 				"SPI-brandvägg",

			DOS_PROTECTION: 			"DoS-skydd",
			ENABLE_DOS: 				"DoS-skydd",
			
			OFF: 						"Avstängd",
			LOW: 						"Låg",
			MIDDLE: 					"Medel",
			HIGH: 						"Hög",

			ICMP: 						"Filtrering av ICMP-FLOOD attack ",
			UDP: 						"Filtrering av UDP-FLOOD attack ",
			TCP: 						"Filtrering av TCP-SYN-FLOOD attack ",
			ENABLE_DOS_TIP:             "DoS-skydd och trafikstatistik måste vara aktiverat samtidigt.",

			IGNORE: 					"Ignorera Pingpaket från WAN-porten",
			FORBID: 					"Förbjud pingpaket alltifrån LAN-port",

			BLOCK_DOS: 					"Blockerade DoS värd lista",
			HOST_NUMBER: 				"Värd nummer",
			IP_ADDRESS: 				"IP-adress",
			MAC_ADDRESS: 				"MAC-adress"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Åtkomstkontroll",
			ENABLE_ACCESS: 				"Åtkomstkontroll",

			ACCESS_MODE: 				"Åtkomstläge",
			DEFAULT_ACCESS_MODE: 		"Standard åtkomstläge",
			BLACK_LIST: 				"Blacklist",
			WHITE_LIST: 				"Whitelist",
			
			WIRED:						"Fast",
			WIRELESS:					"Trådlöst",

			DEVICE_ONLINE: 				"Enheter online",
			NAME: 						"Enhetens namn",
			IP_ADDRESS: 				"IP-adress",
			MAC_ADDRESS: 				"MAC-adress",
			CONN_TYPE: 					"Anslutningstyp",

			BLOCK: 						"Blockera",

			DEVICE_IN_WHITE: 			"Enheter i Whitelist",
			DEVICE_IN_BLACK: 			"Enheter i Blacklist"
		},

		IP_MAC:{
			TITLE: 						"Inställningar",
			ENABLE_ARP: 				"ARP-bindning",

			ARP_LIST: 					"ARP-lista",
			ARP_NUM: 					"ARP-nummer",

			MAC_ADDRESS: 				"MAC-adress",
			IP_ADDRESS: 				"IP-adress",
			BOUND: 						"Bundna",
			UNBOUND: 					"Obunden",

			BINDING_LIST: 				"Bindande lista",
			DESCRIPTION: 				"Beskrivning",
			OPTIONAL: 					"(Tillval)",
			ENABLE_THIS_ENTRY: 			"Aktivera"
		},

		TIMESET: {
			TITLE: 						"Tidsinställningar",
			ZONE: 						"Tidszon",
			DATE: 						"Datum",
			DATEFORMAT: 				"MM/DD/ÅÅÅÅ",
			TIME: 						"Tid",
			TIMEFORMAT: 				"(TT/MM/SS)",
			NTP1: 						"NTP Server I",
			NTP2: 						"NTP Server II",
			OPTIONAL: 					"(Tillval)",

			CURRENT_TIME:  				"Aktuell tid",
			SET_TIME: 					"Ställ in tiden",
			AUTOMATIC: 					"Få automatiskt via Internet",
			MANUAL: 					"Manuellt",
			AUTOMATIC_BTN: 				"Få",


			GETGMT: 					"Få GMT",

			
			GETGMT_SUCCESS: 			"Få tid från NTP-server Success",
			GETGMT_TIMEOUT: 			"Få tid från NTP-server Time Out",
			GETGMT_WAIT: 				"Väntar",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Sommartid",
			ENABLE_DAYLIGHT: 			"Aktivera sommartid",
			START: 						"Start",
			END: 						"Slut",

			RUNNING_STATUS: 			"Igång",
			DOWN: 						"Sommartid är nere",
			UP: 						"Sommartid är upp"
		},

		DIAG:{
			TITLE: 						"Felsökning",
			DIAGNOSTIC_TOOL: 			"Felsökningsverktyget",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"IP-adress eller domännamn",
			COUNT: 						"Pingräknare",
			
			BASIC: 						"Grundläggande",
			ADVANCED: 					"Avancerad",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Ping paketstorlek",
			PKTUNIT: 					"(4-1472 Byte)",

			TIMEOUT: 					"Tidsgräns för ping",
			TIMOUTUNIT: 				"(100-2000 Millisekunder)",

			TTL: 						"Traceroute Max TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Start",
			STOP: 						"Stopp"
		},

		FIRMWARE:{
			TITLE: 						"Uppgradering av fast programvara",
			FIRMWARE_INFO:  			"Din firmware är uppdaterad",
			INFO: 						"Enhetsinformation",
			REMOTE_TITLE: 				"Online Upgrade",
			LOCAL_TITLE: 				"Lokal uppgradering",

			NEWFILE: 					"Ny fil med fast programvara",
			FIRMWAREVERSION: 			"Version av fast programvara",
			HARDWAREVERSION: 			"Maskinvaruversion",
			LATESTVERSION: 				"Senaste version",
			CONFIRM_CONTENT:			"Är du säker på att du vill uppgradera firmware?",
			WARNING:					"Firmware upgradering... <br/> För att undvika skador, håll enheten påslagen och vänta utan någon åtgärd under denna process.",
			REBOOTING: 					"Rebooting... <br/> För att undvika skador, håll enheten påslagen och vänta utan någon åtgärd under denna process.",
			DO_NOT_OPERATE: 			"Uppgradering ... <br/ >Utför INGET annat under processen.",
			FIRMWARE_UPDATING_NOTE: 	"1.Firmware Uppdatering ...",
			REBOOTING_NOTE: 			"2.Rebooting ...",
			SCREEN_UPDATING_NOTE: 		"3.Screen Uppdatering ...",
			UPGRADE_FAILED: 			"Uppgraderingen misslyckades.",
			UPGRADE: 					"Uppgradering",
			CHECK: 						"Kontrollera",
			DOWNLOADING: 				"Nedladdning ...",
			UPGRADE_INOF: 				"För att undvika skador, håll routern påslagen.",
			NOTE: 						"Notera:",
			NO_UPGRADE: 				"Detta är den senaste versionen",

			UPGRADING: 					"Uppgradering ...",
			RETRY: 						"Försöka igen",
			CANCEL: 					"Avbryt",
			ILEGAL_DEVICE:				"Kunde inte identifiera enheten. Vänligen kontakta TP-LINK teknisk support.",
			UPGRADE_FAIL: 				"Det går inte att uppgradera. Försök igen senare.",
			CHECK_UPGRADE:				"Kontrollera om uppgradering"
		},

		BACKUP:{
			BACKUP: 					"Säkerhetskopiering",
			BACKUPTIP: 					"Spara en kopia av dina aktuella inställningar.",

			RESTORE: 					"Återställa",
			RESTORETIP: 				"Återställ sparade inställningar från en fil.",
			
			RESTORE_WARN:				"Återställ routern ... <br/>Använd inte under processen.",
			RESTORE_CONFIRM_CONTENT: 	"Är du säker på att du vill återställa routern från säkerhetskopian?",
			
			FILE: 						"Filen",

			FACTORY: 					"Fabriksåterställning",
			FACTORYTIP: 				"Återställ alla inställningar till sina standardvärden.",
			FACTORY_CONFIRM_CONTENT:	"Är du säker på att du vill återställa routern till fabriksinställningarna?",
			FACTORY_WARN:				"Återställer routern ... <br/>Använd inte under processen.",
			
			BACKUPBTN: 					"Säkerhetskopiering",
			RESTOREBTN: 				"Återställa",
			FACTORYBTN: 				"Fabriksåterställning"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Kontohantering",
			
			OLDUSER: 					"Gammalt användarnamn",
			OLDPWD: 					"Gammalt lösenord",

			NEWUSER: 					"Nytt användarnamn",
			NEWPWD: 					"Nytt lösenord",
			CONFIRM: 					"Bekräfta nytt lösenord",

			RECOVERYINFO: 				"Fråga efter lösenord",
			ENABLE_PASSWORD_RECOVERY: 	"Aktivera fråga efter lösenord",
			FROM: 						"Från",
			TO: 						"Till",
			SMTP_SERVER: 				"SMTP-server",
			
			ENABLE_AUTHENTICATION: 		"Aktivera autentisering",
			USERNAME: 					"Användarnamn",
			PASSWORD: 					"Lösenord",

			TEST_MAIL: 					"Testmeddelande",

			LOCAL:						"Lokal hantering",
			LOCAL_MAC_AUTH: 			"Lokal MAC-autentisering",
			ACCESS: 					"Tillträde för alla LAN-anslutna enheter",
			ACCESS_TIPS: 				"Växla på för att möjliggör förvaltning för alla enheter på LAN eller håll den avstängd för att möjliggöra förvaltning för en viss enhet.",
			
			MAC_ADDRESS: 				"MAC-adress",
			VIEW_BTN: 					"Visa befintliga enheter",
			DESCRIPTION: 				"Beskrivning",

			EXIST_DEVICE:               "Befintliga enheter",

			OPTIONAL: 					"(Tillval)",
			ENABLE_THIS_ENTRY: 			"Aktivera",

			DEVICE_NAME:				"Enhetens namn",
			IP_ADDRESS:					"IP-adress",
			

			REMOTE: 					"Fjärrhantering",
			DISABLE_REMOTE_MANAGEMENR: 	"Avaktivera fjärrhantering",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Aktivera funktionen för alla enheter",
			ENABLE_REMOTE_MANAGEMENR: 	"Aktivera funktionen för angivna enheter",
			WEB: 						"Web Management Port",

			NOTICE:						"I konflikt med den virtuella server porten! Är du säker på att du vill fortsätta?",
			NOTICE_ENTER_ANOTHER:		"I konflikt med den virtuella serverporten . Ange en annan port.",

			REMOTEIP: 					"Remote Management IP-adress",
			REMOTEIPNOTE: 				"(Ange 255.255.255.255 för alla)"
			
		},

		SYSLOG:{
			TITLE: 						"Systemlogg",
			LOG_FILTER: 				"Logg filtret:",
			
			TYPE_EQ: 					"Typ=",
			
			ALL: 						"ALL",

			FIREWALL: 					"Brandvägg", 
			NAT: 						"NAT",
			DDNS: 						"Dynamisk DNS",
			UPNP:						"UPnP",
			IMB:            			"IP&MAC bindning",
			IPTV:						"IPTV",
			DHCPS:						"DHCP-server",
			IGMP_PROXY:					"IGMP-Proxy",
			DOMAIN_LOGIN:				"Domän inloggning",
			BASIC_SECURITY: 			"Grundläggande säkerhet",
			PARENTAL_CONTROL: 			"Föräldrakontroll",
			ACCESS_CONTROL: 			"Åtkomstkontroll",
			DOS_PROTECTION: 			"DoS-skydd",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Trafikstatistik",
			TIME_SETTINGS: 				"Tidsinställningar",
			ACCOUNT_MANAGEMENT: 		"Kontohantering",
			LOCAL_MANAGEMENT: 			"Lokal hantering",
			REMOTE_MANAGEMENT: 			"Fjärrhantering",
			LOCALE: 					"Lokal",
			FACTORY_RESET: 				"Fabriksåterställning",
			LED_CONTROLLER: 			"Indikatorlampa",
			NETWORK: 					"Nätverk",
			USBSHARE: 					"USB delning",
			AND: 						"och",
			LEVEL: 						"Nivå",
			EMERGENCY:					"NÖDSTOPP",
			ALERT:						"VARNING",
			CRITICAL:					"KRITISKA",
			ERROR: 						"FEL",
			WARNING: 					"VARNING",
			NOTICE: 					"MÄRK",
			INFO: 						"INFO",
			DEBUG: 						"TESTAR FÖR FEL",

			INDEX: 						"Index",
			TYPE: 						"Typ",
			TIME: 						"Tid",
			LEVEL_COL:					"Nivå",

			CONTENT: 					"Logg innehåll",
			
			MAIL_LOG: 					"E-post logg",
			SAVE_LOG: 					"Spara logg",

			SEND_OK: 					"Skicka OK",
			SEND_FAILED: 				"Sändningen misslyckades",

			MAIL_SETTING: 				"E-postinställningar",

 			FROM: 						"Från",
 			TO: 						"Till",
 			SMTP_SERVER: 				"SMTP-server",
 			ENABLE_AUTHENTICATION: 		"Aktivera autentisering",

 			USERNAME: 					"Användarnamn",
 			PASSWORD: 					"Lösenord",
 			CONFIRM_PASSWORD: 			"Bekräfta lösenord",

 			AUTO_MAIL: 					"Aktivera Auto Mail",
 			LOG_AT: 					"Logga in på",
 			HH_MM: 						"(HH:MM) dagligen",

 			LOG_EVERY: 					"Logga in varje",
 			HOURS: 						"Timmar"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Inställningar",
			STATUS: 					"Aktivera QoS",
			UPBANDWIDTH: 				"Bandbredd uppladdning",
			DOWNBANDWIDTH: 				"Bandbredd nedladdning",
			SPEED_M: 					"Mbit/s",
			SPEED_K: 					"Kbit/s",
			TEST: 						"Hastighetstest",
			RULE_LIST: 					"QoS-regel lista",
			RULE: 						"QoS-regel",
			ID: 						"ID",
			NAME: 						"Namn",
			TYPE: 						"Typ",
			DETAIL: 					"Detalj",
			PRIORITY: 					"Prioritet",

			APPLICATION: 				"Program",
			APPLICATION_LIST: 			"Programlistan",
			CUSTOM_APP: 				"Anpassat program",
			MAC_ADDR: 					"MAC-adress",
			MAC_ADDR_P: 				"Mac:",
			IP_ADDR: 					"IP-adress",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Fysisk port",

			LOW: 						"Låg",
			MIDDLE: 					"Medel",
			HIGH: 						"Hög",

			PROTO: 						"Protokoll",
			PORT: 						"Port",
			PROTO_P: 					"Protokoll:",
			PORT_P: 					"Port:",
			PORT_TIPS: 					"(XX eller XX-XX,1-65535, som mest 5 par)",

			ALL: 						"ALL",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Anpassad",

			WIFI_HOME: 					"WIFI-vÄRD",
			WIFI_GUEST: 				"WIFI-gäst",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Uppgradering av databas",

			NEWFILE: 					"Ny databasfil",
			FIRMWAREVERSION: 			"Databasversion",
			CONFIRM_CONTENT:			"Är du säker på att du vill uppdatera databasen?",
			WARNING:					"Databasen uppdateras ... <br/>Använd inte under processen.",
			
			UPGRADE: 					"Uppgradering",

			SERVICE_RESTART: 			"QoS-tjänsten startas om",
			
			TYPE: 						"Typ",
			BY_DEVICE: 					"Per enhet",
			BY_APP: 					"Per program",
			BY_PHY: 					"Genom fysisk port",

			HIGH_PRIORITY_LBL: 			"Hög prioritet:",
			MIDDLE_PRIORITY_LBL: 		"Mitt prioritet:",
			LOW_PRIORITY_LBL: 			"Låg prioritet:",

			HIGH_PRIORITY: 				"Hög prioritet",
			MIDDLE_PRIORITY: 			"Medel prioritet",
			LOW_PRIORITY: 				"Låg prioritet"

		},

		APPLICATION:{
			APP_LIST: 					"Programlistan",
			GAME_LIST: 					"Spellista",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Trafikstatistik",
			ENABLE_STATISTICS: 			"Trafikstatistik",

			TITLE: 						"Trafikstatistiklista",
			IP_MAC: 					"IP-adress eller MAC-adress",
			TPKT: 						"Totala paket",
			TBYTE: 						"Totalt antal byte",
			CPKT: 						"Aktuella paket",
			CBYTE: 						"Nuvarande byte",
			CICMP: 						"Nuvarande ICMP-Tx",
			CUDP: 						"Nuvarande UDP-Tx",
			CSYN: 						"Nuvarande SYN Tx",
			
			DELETE_CONFIRM: 			"Är du säker på att du vill ta bort trafikstatistiken?",
			DELETE_ALL_CONFIRM: 		"Är du säker på att du vill ta bort all trafik statistik?",

			RESET_ALL: 					"Nollställ alla"
		},

		SYSPARA:{
			W24G: 						"Trådlös 2,4GHz",
			W5G: 						"Trådlös 5GHz",
			W60G: 						"60GHz trådlöst",
			W24G_WDS: 					"2,4 GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"Den trådlösa funktionen är avstängd. Om du vill använda den här funktionen. Slå på Wi-Fi-knappen.",

			ENABLE_TIPS: 				"Den trådlösa funktionen är inaktiverad.",

			BEACON: 					"Signalintervall",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS-gränsvärde",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Fragmenteringströskel",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM-intervall",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Uppdateringsperiod för gruppnyckel",
			GROUPUNIT: 					"Sekunder",
			
			MU_MIMO_FEATURE: 			"Multiuser-MIMO",
			MU_MIMO: 					"Aktivera MU-MIMO",
			
			WMM_FEATURE: 				"WMM-funktionen",
			WMM: 						"Aktivera WMM",

			GI_FEATURE: 				"Kort GI funktion",
			GI: 						"Aktivera kort GI",

			AP_FEATURE: 				"AP Isolation funktion",
			AP: 						"Aktivera AP-isolering",

			WDS_FEATURE: 				"WDS överbrygga",
			WDS: 						"Aktivera WDS överbryggning",
			
			SSID_BRIDEGE: 				"SSID (förbikopplad)",
			SURVEY: 					"Undersökning",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC-adress",
			SSID: 						"SSID",
			SIGNAL: 					"Signal",
			CHANNEL: 					"Kanal",
			SECURITY: 					"Säkerhet",
			CHOSEN: 					"Valt",
			AP_NUMBER:					"AP nummer",

			TOTAL: 						"Totalt antal poster",

			MAC: 						"MAC-adressen (överbryggas)",
			MACUNIT: 					"Exempel: 00-1D-0F-11-22-33",

			SECURITY: 					"Säkerhet",
			NO: 						"Nej",
			NONE: 						"Ingen säkerhet",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Lösenord",
			
			AUTH_TYPE: 					"Auth. Typ",
			AUTO: 						"Auto",
			OPEN: 						"Öppet system",
			SHARED: 					"Delad nyckel",

			WEP_INDEX: 					"WEP-index",
			KEY1: 						"Nyckel 1",
			KEY2: 						"Nyckel 2",
			KEY3: 						"Nyckel 3",
			KEY4: 						"Nyckel 4",

			WEP_KEY_FORMAT: 			"WEP nyckelformat",
			ASC: 						"ASCII",
			HEX: 						"Hexadecimala",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Aktivera WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Aktivera NAT",
			
			NAT_BOOST: 					"NAT-Boost",
			ENABLE_NAT_BOOST: 			"Aktivera NAT Boost",
			
			MEDIA_SERVER: 				"Mediaserver",
			SCAN_INTERVAL: 				"Autoscan intervall (timmar)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"Inställningar av DoS-skyddsnivå",

			ICMP: 						"Nivå av ICMP-FLOOD paket ",
			UDP: 						"Nivå av UDP-FLOOD paket ",
			TCP: 						"Nivå av TCP-FLOOD paket ",

			WDS_MODE: 					"WDS-läge",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Låg",
			MIDDLE: 					"Medel",
			HIGH: 						"Hög",

			TO: 						"Till",
			NOTICE_NAT_REBOOT: 			"Startar om ... <br/> Använd inte under omstarten.",

			NOTICE_NAT_BOOST: 			"Ändring av NAT-Boost resulterar i en omstart av enheten, är du säker på att du vill fortsätta?",
			NOTICE:						"Routerns kanal är inte samma som den brygg-AP:s kanal. Vill du ändra det?",

			UNIT: 						"(5-7200)paket/sek.",
			LED: 						"LED",
			NIGHT_MODE: 				"Nattläge",
			PERIOD_NIGHT_TIME: 			"Period av nattläge",
			ENABLE: 					"Aktivera nattläge",
			HH_MM: 						"(HH:MM)",
			TO: 						"Till",
			NIGHT_MODE_NOTE:            "Din LED är avstängd. Om du vill använda den här funktionen, tryck på LED-knappen eller klicka på lysdioden på det övre högra hörnet på sidan.",
			NOTE2:                      "Perioden nattläge träder i kraft baserad på routerns systemtid. Se till att du redan har ställt in tid på routern."
		},
		VPN:{
			OPEN_VPN: 					"ÖppenVPN",
			NO_CERT_NOTE: 				"Inget certifikat för närvarande, <b>skapa</ b> (Generate) en innan du aktiverar VPN-server.",
			NO_CERT_NOTE2: 				"Inget certifikat för närvarande, vänligen  <b>skapa</ b> (Generate) en före exportera konfigurationen.",
			ENABLE_VPN_SERVER: 			"Aktivera VPN-server",
			SERVICE_TYPE: 				"Typ av tjänst",
			SERVICE_PORT: 				"Service Port",
			VPN_SUBNET: 				"VPN-Subnät / nätmask",
			CLIENTS_ACCESS: 			"Klientåtkomst",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Endast hemnätverk",
			INTERNET_HOME: 				"Internet och hemnätverk",
			CERT_STR: 					"Inget certifikat för närvarande klicka på OK för att skapa ett och spara din konfiguration.",
			CERT_STR2: 					"Inget certifikat för närvarande klicka du på OK för att skapa ett och exportera konfigurationen.",
			CONF_FILE: 					"Konfigurationsfil", 
			EXPORT_CONF_FILE: 			"Exportera konfigurationen.",
			EXPORT: 					"Exportera",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Klient-IP-adress",
			ACCOUNT_USERNAME: 			"Användarnamn",
			ACCOUNT_PASSWORD: 			"Lösenord",
			CLIENT_IP_NOTE: 			"(Upp till 10 klienter)",
			SAME_SUBNET_NOTE: 			"Kundens IP-adress och LAN-IP-adress kan inte vara i samma subnät. <br/> Ange en annan.",
			CONFLICT_WITH_DHCP: 		"Klient IP-adresskonflikter med DHCP IP-adresspoolen. <br/> Ange igen.",
			CONFLICT_WITH_RESERVED: 	"Klient IP-adresskonflikter med den reserverade IP-adressen. <br/> Ange igen.",
			CONFLICT_WITH_OPENVPN: 		"Kunden IP-adress och OpenVPN IP-adress kan inte vara i samma subnät. <br/> Ange igen.",
			SAME_SUBNET_NOTE2: 			"VPN Subnet / nätmask och LAN IP-adress kan inte vara i samma subnät. <br/> Ange en annan.",
			CONFLICT_WITH_DHCP2: 		"VPN Subnet / Nätmask strider mot DHCP IP-adresspoolen. <br/> Ange igen.",
			CONFLICT_WITH_RESERVED2: 	"VPN Subnet / Nätmask strider mot reserverade IP-adressen. <br/> Ange igen.",
			CONFLICT_WITH_PPTPVPN: 		"VPN Subnet / nätmask och PPTP VPN IP-adress kan inte vara i samma subnät. <br/> Ange igen.",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN IP-adressen och OpenVPN IP-adress kan inte vara i samma subnät. <br/> Ange igen.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN IP-adressen och PPTP VPN IP-adress kan inte vara i samma subnät. <br/> Ange igen.",
			VPN_MASK_ERROR: 			"Nätmasken kan inte vara större än 255.255.255.248. <br/> Ange igen.",
			ACCOUNT_LIST: 				"Kontolista (upp till 16 användare)",
			ADVANCED_SETTING: 			"Avancerad",
			ALLOW_SAMBA: 				"Tillåt Samba (nätverksplats) tillgång",
			ALLOW_NETBIOS: 				"Tillåt NetBIOS-genomströmning",
			ALLOW_UNENCRYPTED_CONN: 	"Tillåt Okrypterade anslutningar",
			USERNAME_CONFLICT: 			"Detta användarnamn existerar redan. Ange ett annat.",
				
			NOTICE_VS_CONFLICT:			"I strid med den virtuella serverns externa port. Ange en annan port.",
			NOTICE_PT_CONFLICT:			"I konflikt med port som triggar extern port. Ange en annan port.",
			NOTICE_VS_MODIFY:			"I konflikt med virtuella serverns externa port(1723). Gå till sidan <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Virtual Servers</a> och modifiera den virtuella serverns externa port.",
			NOTICE_PT_MODIFY:			"I konflikt med porten som triggar extern port(1723). Gå till sidan <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Port Triggering</a> och ange port triggning av extern port.",
			
			GENERATE_CERT: 				"Certifikat",
			GENERATE_NEW_CERT: 			"Skapa certifikatet.",
			GENERATE: 					"Generera",
			GENERATE_TIPS: 				"Certifikat skapas... <br/> Det kommer att ta ett par minuter, var god vänta.",
			CERT_SUCCESS: 				"Lyckades",
			CERT_FAIL: 					"Misslyckades, försök igen.",
			
			VPN_CONNECTIONS: 			"VPN-anslutningar",
			OPEN_VPN_CONNECTIONS: 		"Öppen VPN anslutning",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN-anslutning",
			USER: 						"Användare",
			REMOTE_IP: 					"Remote IP",
			ASSIGNED_IP: 				"Tilldelad IP"
		}
	};
})(jQuery);
