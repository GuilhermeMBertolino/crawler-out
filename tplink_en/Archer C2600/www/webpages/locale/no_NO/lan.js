(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			FORGET_PASSWORD: 			"Glemt passord?",
			LOGIN: 						"Logg inn",
			IMPORTANT_UPDATE_INFO: 		"For å unngå konflikt med frontenheten, vil IP-adressen for ruteren din oppdateres til",
			CONTINUE: 					"Fortsett",

			IMPORTANT_NOTICE: 			"Viktig merknad",
			OR: 						", er du sikker på at du vil fortsette til",
			END: 						".",
			END2: 						"?",

			FORGET_PASSWORD_INFO_0: 	"Trykk og hold Gjenopprett-knappen i 10 sekunder for å gjenopprette ruteren til fabrikkinnstillingene.",
			FORGET_PASSWORD_INFO_1: 	"Hvis gjenopprett passord-funksjonen er aktivert. En verifiseringskode vil bli sendt til den angitte e-postadresse for å tilbakestille brukernavn og passord.",
			FORGET_PASSWORD_SEND_FAILED:"Kan ikke sende koden! Kontroller at du er koblet til Internett.",

			VERIFICATION_CODE: 			"Verifiseringskode",

			RECEIVE_CODE: 				"Send kode",

			CONFIRM: 					"Bekreft",

			SEC: 						"s",

			USER_CONFLICT: 				"Konflikt med innlogging",
			FIRST_TIME: 				"Velkommen til å bruke Archer AD7200 designet av TP-LINK i China. For å beginne, opprett et enhetspassord for å administrere den.",
			
			USER_CONFLICT_INFO: 		"Brukeren %USER% med verten %HOST% (%IP%/%MAC%) er logget inn på ruteren. Du kan ikke logge inn på samme tid. Prøv igjen senere.",
			USER_CONFLICT_INFO_1: 		"Brukeren %USER% (%MAC%) er logget inn på ruteren. Du kan ikke logge inn på samme tid. Prøv igjen senere.",
			USER_CONFLICT_INFO_2: 		"Brukeren %USER% (%IP%) er logget inn på ruteren. Du kan ikke logge inn på samme tid. Prøv igjen senere.",
			
			LOGIN_FAILED: 				"Påloggingsfeil!",
			LOGIN_FAILED_COUNT: 		"Innlogging feilet %num1 ganger, men du har fortsatt %num2 gjenstående forsøk.",
			NO_COOKIE: 					"Informasjonskapsler må være aktivert for å logge inn. Aktiver informasjonskapsler eller slå av privat/inkognito surfemodus.", 

			FORGET_PASSWORD_NOTE: 		"Hvis du ikke har konfigurert gjenopprett passord-funksjonen. Du kan trykke og holde Gjenopprett-knappen i 10 sekunder for å gjenopprette ruteren til fabrikkinnstillingene."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Oppgrader nå",
			REMIND: 						"Påminn meg senere",
			NOTICE:    						"Hei, en ny fastvare er tilgjengelig for %PRODUCT%-ruteren.",
			NEVER: 							"Ignorer denne versjonen"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN-tilkoblingsfeil!",
			STATUS: 						"Status",
			INFO: 							"Informasjon",
			SETUP: 							"Konfigurer en Internett-forbindelse",
			NEVER: 							"Ikke påminn meg igjen"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Fastvareversjon:",
			HARDWARE_VERSION: 				"Maskinvareversjon:",
			HELP_SUPPORT: 					"Støtte",
			FAQ: 							"Vanlige spørsmål",
			CONFIRM_REBOOT: 				"Er du sikker på at du vil omstarte ruteren?",
			CONFIRM_LOGOUT: 				"Er du sikker på at du vil logge ut?",
			UPGRADE_ALERT_1: 				"Nåværende fastvare støtter ikke TP-Link sin sky-tjeneste. Vi anbefaler på det sterkeste at du laster ned den nyeste fastvaren hos www.tp-link.com og oppdaterer den.",
			UPGRADE_ALERT_2: 				"Nåværende fastvare støtter ikke TP-Link sin sky-tjeneste. Vi anbefaler på det sterkeste at du oppdaterer ved å klikke på oppdateringsikonet oppe i høyre hjørne.",
			REBOOTING: 						"Omstarter ... <br/>Ikke bruk ruteren mens den omstarter.",

			MODE_SWITCH: 					"Endre modus",
			ACCESS_POINT: 					"Tilgangspunkt",
			ACCESS_POINT_TIPS: 				"For å gjøre om kablet nettverk til trådløst.",
			ROUTER: 						"Ruter",
			ROUTER_TIPS: 					"For å tillate at flere enheter kobler til med kabel eller trådløst.",
			REPEATER: 						"Repeater",
			REPEATER_TIPS: 					"For å utvide signaldekningen for det trådløse nettverket.",
			MODE_REBOOT_TIP: 				"Ved endring av modus vil denne enheten omstarte. Er du sikker på at du vil fortsette?",
			MODE_FAIL_TIP: 					"Kan ikke endre modus. Prøv igjen senere eller omstarte ruteren."
		},

		NAV: {
			QUICK_SETUP: 				"Hurtiginstallasjon",
			BASIC: 						"Grunnleggende",
			ADVANCED: 					"Avansert"
		},

		CONTROL: {
			MODE: 						"Modus",
			LOGIN: 						"Logg inn",
			LED:                        "LED",
			LED_ON:                     "LED på",
			LED_OFF:                    "LED av",			
			LED_DISABLED:               "LED-statusen kan ikke bli endret under nattmodusperioden",			
			LOGOUT: 					"Logg ut",
			UPDATE: 					"Oppdater",
			REBOOT: 					"Omstart"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algerie",
			AMERICAN_SAMOA: 			"Amerikansk Samoa",
			ARGENTINA: 					"Argentina",
			ARMENIA: 					"Armenia",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australia",
			AUSTRIA: 					"Østerrike",
			AZERBAIJAN: 				"Aserbajdsjan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahrain",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Hviterussland",
			BELGIUM: 					"Belgia",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnia-Hercegovina",
			BRAZIL: 					"Brasil",
			BRUNEI_DARUSSALAM: 			"Brunei Darussalam",
			BULGARIA: 					"Bulgaria",
			CAMBODIA: 					"Kambodsja",
			CANADA: 					"Canada",
			CAYMAN_ISLANDS: 			"Caymanøyene",
			CHILE: 						"Chile",
			CHINA: 						"Folkerepublikken Kina",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Kroatia",
			CYPRUS: 					"Kypros",
			CZECH_REPUBLIC: 			"Tsjekkia",
			DENMARK: 					"Danmark",
			DOMINICAN_REPUBLIC: 		"Den dominikanske republikk",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egypt",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estland",
			ETHIOPIA: 					"Etiopia",
			FAEROE_ISLANDS: 			"Færøyene",
			FINLAND: 					"Finland",
			FRANCE: 					"Frankrike",
			FRENCH_GUIANA: 				"Fransk Guyana",
			FRENCH_POLYNESIA: 			"Fransk Polynesia",
			GEORGIA: 					"Georgia",
			GERMANY: 					"Tyskland",
			GREECE: 					"Hellas",
			GREENLAND: 					"Grønland",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong",
			HUNGARY: 					"Ungarn",
			ICELAND: 					"Island",
			INDIA: 						"India",
			INDONESIA: 					"Indonesia",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irland",
			ISRAEL: 					"Israel",
			ITALY: 						"Italia",
			JAMAICA: 					"Jamaica",

			JAPAN: 						"Japan",
			JAPAN_1: 					"Japan 1",
			JAPAN_2: 					"Japan 2",
			JAPAN_3: 					"Japan 3",
			JAPAN_4: 					"Japan 4",
			JAPAN_5: 					"Japan 5",
			JAPAN_6: 					"Japan 6",

			JORDAN: 					"Jordan",
			KAZAKHSTAN: 				"Kasakhstan",
			KENYA: 						"Kenya",

			NORTH_KOREA: 				"Nord-Korea",
			KOREA_REPUBLIC: 			"Sør-Korea",
			KOREA_REPUBLIC_3: 			"Sør-Korea 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Latvia",
			LEBANON: 					"Lebanon",
			LIBYA: 						"Libya",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Litauen",
			LUXEMBOURG: 				"Luxembourg",
			MACAU: 						"Macau SAR",
			MACEDONIA: 					"den tidligere Jugoslaviske republikken Makedonia",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malaysia",
			MALDIVES: 					"Maldivene",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexico",
			MONACO: 					"Fyrstedømmet Monaco",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Marokko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Nederland",
			NETHERLANDS_ANTILLES: 		"De nederlandske Antillene",
			
			NEW_ZEALAND: 				"New Zealand",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norge",
			NORTHERN_MARIANA_ISLANDS: 	"Marianaøyene",
			OMAN: 						"Oman",
			PAKISTAN: 					"Den islamske republikken Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua Ny-Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Republikken Filipinene",
			POLAND: 					"Polen",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Romania",
			RUSSIA: 					"Russland",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Saudi-Arabia",
			SINGAPORE: 					"Singapor",
			SLOVAK_REPUBLIC: 			"Den slovakiske republikk",
			SLOVENIA: 					"Slovenia",
			SOUTH_AFRICA: 				"Sør-Afrika",
			SPAIN: 						"Spania",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Sverige",
			SWITZERLAND: 				"Sveits",
			SYRIA: 						"Syria",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Thailand",
			TRINIDAD_TOBAGO: 			"Trinidad og Tobago",
			TUNISIA: 					"Tunisia",
			TURKEY: 					"Tyrkia",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraina",
			UNITED_ARAB_EMIRATES: 		"De forente arabiske emirater",
			UNITED_KINGDOM: 			"Storbritannia",
			UNITED_STATES: 				"USA",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Usbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Jomfruøyene (USA)",
			YEMEN: 						"Yemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway Island, Samoa",
			HAWAII: 					"(GMT-10:00) Hawaii",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Pacific Time",
			MOUNTAIN_TIME: 				"(GMT-07:00) Mountain Time (USA og Canada)",
			CENTRAL_TIME: 				"(GMT-06:00) Central Time (USA og Canada)",
			EASTERN_TIME: 				"(GMT-05:00) Eastern Time (USA og Canada)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Atlantic Time (Canada)",
			NEWFOUNDLAND: 				"(GMT-03:30) Newfoundland",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Mid-Atlantic",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azorene, Kapp Verde",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich-tid, Dublin, London",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlin, Stockholm, Roma, Bern, Brussel",
			ATHENS_HELSINKI: 			"(GMT+02:00) Aten, Helsinki, Østeuropa, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Bagdad, Kuwait, Nairobi, Riyadh, Moskva",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Calcutta, Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Beijing, Hong Kong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seoul, Yakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomon Is., New Caledonia",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Program",
			GAME:						"GAME",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"linje",
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
			xl_others:  				"xl_andre",
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

			MONDAY: 					"Mandag",
			TUESDAY: 					"Tirsdag",
			WEDNESDAY: 					"Onsdag",
			THURSDAY: 					"Torsdag",
			FRIDAY: 					"Fredag",
			SATURDAY: 					"Lørdag",
			SUNDAY: 					"Søndag",
			
			MON: 						"Man.",
			TUES: 						"Tir.",
			WED: 						"Ons.",
			THUR: 						"Tor.",
			FRI: 						"Fre.",
			SAT: 						"Lør.",
			SUN: 						"Søn.",

			JAN: 						"Jan.",
			FEB: 						"Feb.",
			MAR: 						"Mar.",
			APR: 						"Apr.",
			MAY: 						"Mai.",
			JUN: 						"Jun.",
			JUL: 						"Jul.",
			AUG: 						"Aug.",
			SEP: 						"Sep.",
			OCT: 						"Okt.",
			NOV: 						"Nov.",
			DEC: 						"Des."

		},

		HOUR: {
			AM_1: 						"kl. 01",
			AM_2: 						"kl. 02",
			AM_3: 						"kl. 03",
			AM_4: 						"kl. 04",
			AM_5: 						"kl. 05",
			AM_6: 						"kl. 06",
			AM_7: 						"kl. 07",
			AM_8: 						"kl. 08",
			AM_9: 						"kl. 09",
			AM_10: 						"kl. 10",
			AM_11: 						"kl. 11",
			AM_12: 						"kl. 12",
			PM_1: 						"kl. 13",
			PM_2: 						"kl. 14",
			PM_3: 						"kl. 15",
			PM_4: 						"kl. 16",
			PM_5: 						"kl. 17",
			PM_6: 						"kl. 18",
			PM_7: 						"kl. 19",
			PM_8: 						"kl. 20",
			PM_9: 						"kl. 21",
			PM_10: 						"kl. 22",
			PM_11: 						"kl. 23",
			PM_12: 						"kl. 24"
		},

		ORDER: {
			"1ST": 						"Første",
			"2ND": 						"Andre",
			"3RD": 						"Tredje",
			"4TH": 						"Fjerde",
			"5TH": 						"Siste",
			"1ST_": 					"Første",

			TH: 						"?"
		},

		GRID: {
			CLIENT_NUMBER: 				"Klientnummer",

			ID: 						"ID",
			MODIFY: 					"Endre",
			STATUS: 					"Status",
			ENABLE: 					"Aktiver",

			OPERATION: 					"Drift",
			CHOOSE: 					"Velg",
			DESCRIPTION: 				"Beskrivelse",
			

			AUTO_REFRESH: 				"Oppdater automatisk",
			REFRESH: 					"Oppdater",
			NUMBER: 					"Nummer",
			ENABLED: 					"Aktivert",
			DISABLED: 					"Deaktivert",
			ACTIVE: 					"Aktive",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Legg til",
			CHOOSE: 					"Velg",
			EDIT: 						"Rediger",
			DELETE: 					"Slett",
			DELETE_ALL: 				"Slett alle",
			REMOVE: 					"Fjern",
			RESET: 						"Tilbakestill",
			RESET_ALL: 					"Tilbakestill alle",
			DETECT: 					"Oppdag",
			ENABLE: 					"Aktiver",
			DISABLE: 					"Deaktiver",
			PAUSE:						"Pause ",
			RESUME:						"Fortsett",
			
			REFRESH: 					"Oppdater",
			SEARCH: 					"Søk ...",
			BROWSE: 					"Bla gjennom",

			SAVE: 						"Lagre",
			BACK: 						"Tilbake",

			PREV: 						"Forr",
			NEXT: 						"Neste",
			FINISH: 					"Fullfør",
			
			ON: 						"På",
			OFF: 						"Av",
			LOW: 						"Lav",
			MIDDLE: 					"Middels",
			HIGH: 						"Høy",
			
			OK: 						"OK",
			CANCEL: 					"Avbryt",

			YES: 						"Ja",
			NO: 						"Nei",
			
			CONNECTED: 					"Tilkoblet",
			CONNECTING: 				"Kobler til",
			DISCONNECTING: 				"Kobler fra",
			DISCONNECTED: 				"Ikke tilkoblet",

			PASSWORD_HINT: 				"Passord",
			FILEBUTTONTEXT: 			"Bla gjennom",
			FILEBLANKTEXT: 				"Velg en fil.",
			NOSELECTEDTEXT: 			"Velg alternativer.",

			ADD_A_NEW_KEYWORD: 			"Legg til nytt søkeord",

			SUCCESSED: 					"Vellykket!",
			FORM_SAVED: 				"Lagret",
			FORM_FAILED: 				"Feilet",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Lagret",
			GRID_FAILED: 				"Feilet",
			GRID_NONE_SELECT: 			"Velg minst en oppføring.",
			GRID_DELETE_COMFIRM: 		"Er du sikker på at du vil slette disse oppføringene?",
			GRID_DELETE_ALL_COMFIRM: 	"Er du sikker på at du vil slette alle disse oppføringene?",
			GRID_MAX_RULES: 			"Maks. antall oppføringer er nådd.",
			KEYWORD_MAX_OVERFLOW: 		"Antall søkeord har overskredet maksgrensen.",

			NOTE: 						"Merk:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Ugyldig format.",
			BLANKTEXT: 					"Dette feltet er obligatorisk.",

			EMAIL: 						"Ugyldig e-postadresse.",
			NUMBER: 					"Ugyldig format.",

			NUMBER_MIN: 				"Ugyldig verdi. Angi et tall som er større enn %min.",
			NUMBER_MAX: 				"Ugyldig verdi. Angi et tall som er mindre enn %min.",

			NUMBER_MIN_MAX: 			"Ugyldig verdi. Angi et tall mellom %min og %max.",
			HEX: 						"Dette feltet skal være et heksadesimalt tall.",

			IP: 						"Ugyldig format.",

			IP_NO_ALL_ZERO:				"Adressen skal ikke være 0.0.0.0.",
			IP_NO_LOOP:					"Adressen skal ikke være en tilbakekoblingsadresse.",
			IP_NO_D_TYPE:				"Adressen skal ikke være en klasse D IP-adresse.",
			IP_NO_E_TYPE:				"Adressen skal ikke være en klasse E IP-adresse.",
			IP_NO_ALL_ONE:				"Adressen skal ikke være 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"Adressen skal ikke starte med 255.",
			IP_NO_FIRST_ZERO:			"Adressen skal ikke starte med 0.",
			MASK_NO_ALL_ONE:			"Masken kan ikke være 255.255.255.255.",

			IPV6: 						"Ugyldig format.",
			IPV6_NOT_GLOBAL:			"Ugyldig format.",
			IPV6_NOT_PREFIX:			"Ugyldig format.",
			IP_DOMAIN: 					"Ugyldig format.",
			IPV6_DOMAIN: 				"Ugyldig format.",
			PPTP_INVALID_IP:			"Ugyldig IP-adresse.",
			MAC: 						"Ugyldig format.",
			MULTI_MAC:					"Ugyldig format.",
			MAC_INVALID_BROADCAST:		"MAC bør ikke være kringkastingsadresse.",
			MAC_INVALID_MULTICAST:		"MAC bør ikke være multikastingsadresse.",
			DATE: 						"Ugyldig format.",
			DATE_INVALID: 				"Angi en dato mellom 01/01/1970 og 12/31/2030.",
			MASK: 						"Ugyldig format.",
			DOMAIN: 					"Ugyldig format.",
			STRING_DOMAIN:              "Ugyldig format.",
			USER: 						"Ugyldig format.",
			NOTE: 						"Ugyldig format.",
			PWD: 						"Ugyldig format.",
			SSID: 						"Ugyldig format.",
			NAME:						"Ugyldig format.",
			ASCII_VISIBLE:				"Ugyldig format.",
			STRING_VISIBLE:				"Ugyldig format.",
			STRING_VISIBLE_NO_COMMA:    "Ugyldig format.",
			STRING_VISIBLE_ALLOW_BLANK: "Ugyldig format.",
			VPN_NAME_PWD: 				"Skriv inn 1 – 15 alfategn, numre, - og _."
		},


		ERROR: {			
			"00000001":					"Ugyldig filtype.",
			"00000002":					"Kontrollsumfeil.",
			"00000003":					"Filen er for stor.",
			"00000004":					"Opplastingsfeil.",
			"00000005":					"Omstartsfeil.",
			"00000006":					"Ukjent feil.",
			"00000007":					"Elementet eksisterer allerede. Angi et annet element.",

			"00000009":					"Ugyldig port.",
			"00000010":					"Porten skal være et tall.",

			"00000011":					"Brukernavn skal være det samme med Fra-verdi.",
			"00000012": 				"Brukernavnet må starte med et alfabetisk tegn.",

			"00000021":					"Ugyldig format.",

			"00000032": 				"Verdien må være mindre enn Lav.",
			"00000033": 				"Verdien må være mindre enn Middels og Lav.",
			"00000034": 				"Ugyldig verdi. Angi et tall mellom 5 og 7200.",

			"00000039": 				"Bruk standardverdien 0 eller angi en verdi mellom 30 og 86400.",
			"00000040": 				"SSID- og MAC-adresse er obligatorisk.",

			"00000042": 				"Bruk standardverdien 80 eller angi en verdi mellom 1024 og 65535.",

			"00000045": 				"Standard gateway- og LAN IP-adresse bør være i samme delnett. Angi på nytt.",

			"00000046": 				"IP-adresse og MAC-adresse kan ikke være NULL. Angi på nytt.",
			"00000047": 				"Standard IP-adresse og LAN IP-adresse bør være i samme delnett. Angi på nytt.",

			
			"00000049":					"Ugyldig nettverksmål.",

			"00000050": 				"Ugyldig IP-adresse for DNS-server. Angi en annen IP-adresse.",
			"00000051": 				"Denne MAC-adressen eksisterer allerede. Angi et annet element.",
			"00000052": 				"Denne IP-adressen eksisterer allerede. Angi et annet element.",

			"00000053": 				"Startadressen kan ikke være større enn sluttadressen. <br/>Angi på nytt.",

			"00000054": 				"IP-adresseutvalg og LAN IP-adresse bør være i samme delnett. Angi på nytt.",

			"00000055": 				"IP-adresse kan ikke være det samme som LAN-adresse.",

			"00000056": 				"Ekstern IP-adresse og gjeldende LAN IP-adresse bør ikke være i samme delnett. Angi et annet element.",

			"00000057": 				"Ugyldig PSK-passord. Skriv inn på nytt.",
			"00000058": 				"Ugyldig WEP-passord. Skriv inn på nytt.",

			"00000059": 				"Ugyldig IP-adresse og nettverksmaske. Angi en gyldig verdi.",

			"00000060": 				"WAN IP-adresse og LAN IP-adresse bør være i samme delnett. <br/>Angi en annen verdi.",

			"00000061": 				"Starttid må være tidligere enn sluttid.",

			"00000062": 				"Dette feltet er obligatorisk.",
			"00000063": 				"Dette feltet er obligatorisk.",

			"00000064": 				"Kan ikke blokkere MAC-adressen til verten.",
			"00000065": 				"Dette elementet er i konflikt med eksisterte elementer. Vennligst sjekk.",
			
			"00000066": 				"Passordet skal bestå av mellom 8 og 63 tegn eller 64 heksadesimale sifre.",
			"00000067": 				"Passordet skal bestå av 10 heksadesimale sifre.",
			"00000068": 				"Passordet skal bestå av 5 ASCII-sifre.",
			"00000069": 				"Passordet skal bestå av 26 heksadesimale sifre.",
			"00000070": 				"Passordet skal bestå av 13 ASCII-sifre.",
			"00000071": 				"Passordet skal bestå av 32 heksadesimale sifre.",
			"00000072": 				"Passordet skal bestå av 16 ASCII-sifre.",
			"00000073": 				"Passordet skal bestå av mindre enn 64 sifre.",

			"00000074": 				"Ugyldig filtype.",

			"00000075": 				"PIN-koden bør inneholde 8 sifre.",

			"00000076": 				"Oppføringen er i konflikt med eksisterte elementer. Sjekk utløsende port og protokoll.",
			"00000077": 				"IP-adresse kan ikke være det samme som LAN IP-adresse.",
			"00000078": 				"Vertens IP-adresse kan ikke være det samme som LAN IP-adresse.",

			"00000080": 				"Feil passord. Prøv igjen.",

			"00000083": 				"Gateway kan ikke være det samme som IP.",
			"00000084": 				"Primær DNS kan ikke være det samme som IP.",
			"00000085": 				"Sekundær DNS kan ikke være det samme som IP.",
			"00000086": 				"Primær DNS kan ikke være det samme som sekundær DNS.",

			"00000088": 				"Denne handlingen kan ikke utføres med fjernadministrasjon.",
			"00000089": 				"Du har overgått %num forsøk. Prøv igjen etter to timer.",

			"00000090": 				"Målet kan ikke være LAN IP-adressen.",
			"00000091": 				"Målet kan ikke være WAN IP-adressen.",

			"00000092": 				"IP-adressen og LAN IP-adressen bør ikke være i samme delnett. <br/>Angi på nytt.",
			"00000093": 				"IP-adressen og LAN IP-adressen bør ikke være i samme delnett. <br/>Angi på nytt.",

			"00000094": 				"VLAN-ID-ene kan ikke være like.",
			"00000095": 				"Minst én Internett-port er påkrevd.",

			"00000096": 				"Nøkkelordet finnes allerede.",

			"00000097": 				"Konfigurasjoner som gjøres på 2,4 GHz frekvensbånd vil ikke tre i kraft før Wi-Fi-knappen er slått PÅ.",
			"00000098": 				"Konfigurasjoner som gjøres på 5 GHz frekvensbånd vil ikke tre i kraft før Wi-Fi-knappen er slått PÅ.",
			"00000099": 				"Konfigurasjoner som gjøres på 2,4 GHz og 5 GHz frekvensbånd vil ikke tre i kraft før Wi-Fi-knappen er slått PÅ.",

			"00000100": 				"Konfigurasjonen for 5 GHz-nettverket er ikke tilgjengelig på grunn av begrensningene i din region/land.",
			"00002100": 				"60GHz-nettverket er ikke tilgjengelig grunnet begrensninger i ditt område/land.",

			"00000101": 				"Trådløsfunksjonen er skrudd av.  Hvis du vil bruke denne funksjonen, kan du skru på Wi-Fi-knappen.",
			"00000102": 				"Trådløsfunksjonen er skrudd av. Hvis du vil bruke denne funksjonen, kan du skru på Wi-Fi-knappen.",
			"00002102": 				"Trådløsfunksjonen er skrudd av. Hvis du vil bruke denne funksjonen, kan du skru på Wi-Fi-knappen.",

			"00000103": 				"Trådløsfunksjonen er skrudd av. Hvis du vil bruke denne funksjonen, kan du skru på Wi-Fi-knappen.",
			"00000104": 				"Trådløsfunksjonen er deaktivert.",

			"00000105": 				"QoS og IPTV kan ikke være aktivert på samme tid.",

			"00000106": 				"IP-adresse kan ikke være det samme som LAN IP-adresse.",
			
			"00000107": 				"Målet finnes allerede.",

			"00000110": 				"IP-adresse og LAN IP-adresse bør være i samme delnett.",
			
			"00000111": 				"QoS og <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> kan ikke være aktivert på samme tid.",
			"00000112": 				"WDS-funksjonen kan fungere på både 2,4 GHz og 5 GHz-båndet. Gjestenettverket er ikke tilgjengelig på WDS-båndet.",
			"00000113": 				"WDS- og gjestenettverk kan ikke være aktiverte på samme tid.",
			"00000114": 				"Trafikkstatistikk og <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> kan ikke være aktiverte på samme tid.",

			"00000117": 				"Domenenavnet finnes allerede.",
			"00000118": 				"Antall domenenavn har overskredet maksgrensen.",
			"00000119":					"NAT Boost vil bli deaktivert når <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">trafikkstatistikk</a> for enten <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> eller er aktivert.",

			"00000120": 				"Passordet skal bestå av 5 eller 13 ASCII-tegn.",
			"00000121": 				"Passordet skal bestå av 10 eller 26 heksadesimale sifre.",
			"00000122": 				"Brukernavnet eller passordet er tomt, er du sikker på at du vil fortsette?",
			"00000123": 				"Lagrer... Ikke bruk enheten under denne prosessen.",
			"00000124": 				"Ruterens PIN-kode er låst på grunn av gjentatte tilkoblinger med feil PIN-kode. Generere ny kode.",

			"00000125": 				"Antallet QoS-regler har overskredet grensen.",
			"00000126": 				"Filstørrelsen har overskredet grensen.",
			"00000127": 				"Filens innhold er feil.",
			"00000128": 				"Velg minst ett program.",
			"00000129": 				"Velg minst en fysisk port.",
			"00000130":					"WPS-funksjonen er deaktivert.",
			"00000131": 				"NTP-server bør ikke være en tilbakekoblingsadresse.",
			"00000132": 				"Kan ikke endre modus. Prøv igjen senere eller omstarte ruteren.",
			"00000133": 				"Ugyldig IP-adresse for DMZ-vert. Angi en gyldig adresse.",
			"00000134":  				"Ugyldig intern IP-adresse. Angi en gyldig adresse.",
			"00000135": 				"Filfeil for fastvare.",
			"00000136": 				"Filfeil for sikkerhetskopi.",
			"00000137": 				"Ugyldig IP-adresse. Angi en gyldig verdi.",
			"00000139": 				"Ugyldige parametre for tilbakestilling av passord.",
			"00000140": 				"Ugyldig kode.",
			"00000141": 				"Tilbakestilling av passord er deaktivert.",
			"00000142": 				"Klarte ikke å sende koden. Sjekk Internett-forbindelsen din.",
			"00000143": 				"Ugyldige e-postadresser.",
			"00000144": 				"Ugyldig e-postmelding.",
			"00000145": 				"Kunne ikke finne verten.",
			"00000146": 				"Autentisering feilet.",
			"00000147": 				"Porten må være mellom 1 og 65535.",
			"00000148": 				"I et portintervall bør startportnummeret være lavere enn sluttportnummeret. Angi på nytt.",
			"00000149": 				"Portnummer overlappes. Angi på nytt.",
			
			"00000150": 				"Bane eksisterer ikke.",
			"00000151": 				"Tildelingsbane er ikke angitt.",
			"00000152": 				"Et problem med denne banen.",
			"00000153": 				"Finner ikke kolonne.",
			"00000154": 				"Ingen USB-enhet.",
			
			"00000155": 				"PPTP VPN-kundens IP-adresse og LAN IP-adresse kan ikke være i samme delnett. <br/>Angi en annen verdi.",
			"00000156": 				"PPTP VPN-kundens IP-adresse og OpenVPN-kundens IP-adresse kan ikke være i samme delnett. <br/>Angi en annen verdi.",
			
			"00000213":					"DNS-serverens IP-adressen og LAN IP-adressen kan ikke være i samme undernet. <br/>Indtast en anden.",

			"00000222":  				"Maksimum oppføringer.",
			"00000231": 				"Duplisert oppføring.",
			"00000232": 				"Ugyldig URL.",
			"00000233":					"Velg minst en dag.",

			"00000301": 				"Maks. antall oppførte delingsmapper.",
			"00000302": 				"Maks. antall oppførte delingsmapper i et volum.",
			"00000303": 				"Duplisert bane for delingsmappe.",
			"00000304": 				"Duplisert delingsmappenavn.",

			"00001000":					"Oppgradering pågår. Vennligst vent.",
			"00001001": 				"WDS-funksjonen kan fungere på både 2,4 GHz og 5 GHz-båndet.",
			"00001002":					"Ugyldig kode.",

			"00001123": 				"Regel for inngangsprogram er null. Du må angi minst én regel.",
			"00001124": 				"Regel for fysisk inngangsport er null. Du må velge minst én regel. ",

            "00002000": 				"Dette elementet er i konflikt med statisk ruting-informasjonen fra Internettleverandøren. Er du sikker på at du vil fortsette?",

            "00003000":                 "IPv6-utpassering er i konflikt med IPTV! Hvis du vil bruke denne funksjonen, må du slå av IPTV-innstillingene.",
			"00004139": 				"Ingen Internett-tilkobling",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Forespørsel ble tidsavbrutt. Sjekk Internett-forbindelsen din og prøv igjen senere.",
			"00004141": 				"Ukjent feil.",
			"00004142": 				"Ugyldig bekreftelsekode.",
			"00004143": 				"Ugyldig passord.",
			"00004144": 				"Brukernavn eksisterer allerede.",
			"00004145": 				"Ugyldig passord.",//new password
			"00004146": 				"Kan ikke oppheve bindingen av denne enheten. Prøv igjen senere.",
			"00004147": 				"Denne enheten har blitt bundet til en annen konto.",
			"00004148": 				"Ugyldig inndata.",
			"00004149": 				"Dette domenenavnet finnes allerede.",
			"00004150": 				"Kan ikke laste ned fastvaren. Sjekk Internett-forbindelsen din og prøv igjen senere.",
			"00004151": 				"Samme sky-konto kan ikke registrere mer enn 1000 domenenavn.",
			"00004152": 				"Denne enheten har blitt bundet til et annet domenenavn.",
			"00004153": 				"Dette domenenavnet har blitt bundet til en annen konto.",
			"00004154": 				"Ingen respons fra serveren. Prøv igjen senere.",
			"00004155": 				"Konto eksisterer ikke.",
			"00004156": 				"Kan ikke starte sky-applikasjonen. Start enheten på nytt og prøv igjen senere.",
			"00004157": 				"Kan ikke koble til sky-serveren. Sjekk Internett-forbindelsen din og prøv igjen senere.",
			"00004158": 				"WAN-porten er frakoblet.",
			"00004159": 				"Kan ikke koble til Internett. Kontakt Internett-leverandøren din eller prøv igjen senere. ",
			"00004160": 				"Kan ikke hente IP-adresse fra DHCP-serveren. Sjekk WAN-forbindelsetypen din eller prøv igjen senere.",
			"00004161": 				"PPPoE-autentisering mislykket. Kontroller brukernavnet og passordet ditt.",
			"00004162": 				"Kan ikke koble til PPPoE-serveren.",
			"00004164": 				"PPTP-autentisering mislykket. Kontroller brukernavnet og passordet ditt.",
			"00004165": 				"Kan ikke koble til PPTP-serveren.",
			"00004167": 				"L2TP-autentisering mislykket. Kontroller brukernavnet og passordet ditt.",
			"00004168": 				"Kan ikke koble til L2TP-serveren.",
			"00004169": 				"Ukjent feil. Prøv igjen senere.",
			"00004170": 				"WAN-porten er frakoblet.",
			"00004171": 				"Ingen Internett-tilkobling.",
			"00004172": 				"Tilkobling mislyktes.",
			"00004173": 				"Feil brukernavn eller passord",
			"00004174": 				"Ugyldig e-postadresse.",
			"00004175": 				"Ugyldig brukernavnformat.",
			"00004176": 				"E-post eksisterer allerede",
			"00004177": 				"Kan ikke hente kontoinformasjon. Oppdater siden.",
			"00004178":   				"Systemfeil. Oppdater siden og prøv igjen.",
			"00004179":   				"Kan ikke binde denne enheten. Prøv igjen senere.",
			"00004180":   				"Denne enhetens binding har blitt opphevet fra denne Sky-kontoen. Logg på kontoen din igjen for å binde enheten til kontoen din.",
			"00004181":   				"Enheten er frakoblet. Sjekk Internett-innstillingene dine.",
			"00004182":   				"Kan ikke sende e-posten. Sjekk Internett-forbindelsen din og prøv igjen senere.",
			"00004183":   				"Account should contain to characters. ",
			"00004184":   				"Du har skrevet inn feil passord 20 ganger. Prøv igjen om to timer.",
			"00004185":   				"Du har fått verifikasjonskoden for 10 timer om én time. Prøv igjen om 24 timer.",
			"00004186":   				"Beklager, kan ikke aktivere kontoen din. Vennligst send verifikasjonse-posten.",
			"00004187":   				"Beklager, koblingen er utdatert. Vennligst send verifikasjonse-posten.",
			"00004188":   				"Beklager, koblingen er utdatert. Vennligst send e-posten på nytt.",
			"00004189":   				"Beklager, kan ikke tilbakestille passordet ditt. Vennligst send e-posten på nytt.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Oppgraderingsfeil for fastvare.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Status",
			NETWORK: 					"Nettverk",
			NETWORK_MAP: 				"Nettverkskart",
			INTERNET: 					"Internett",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP-server",
			DYNAMIC_DNS: 				"Dynamisk DNS",
			ADVANCED_ROUTING: 			"Avansert ruting",

			WIRELESS: 					"Trådløs",
			WIRELESS_SETTINGS: 			"Trådløsinnstillinger",
			WDSBRIDGING: 				"WDS-overføring",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC-filtrering",
			WIRE_STATISTICS: 			"Statistikk",
			
			
			GUEST_NETWORK: 				"Gjestenettverk",
			WIRELESS_SETTINGS: 			"Trådløsinnstillinger",
			STORAGE_SHARING: 			"Lagringsdeling",
			NAT_FORWARDING: 			"NAT-videresending",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Virtuelle servere",
			PORT_TRIGGERING: 			"Port-utløsing",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB-innstillinger",
			BASIC_SET: 					"Grunnleggende innstillinger",
			DISK_SET: 					"Enhetsinnstillinger",
			FOLDER_SHARING: 			"Tilgang til deling",
			STORAGE_SHARING: 			"Lagringsdeling",
			FTP_SERVER: 				"FTP-server",
			MEDIA_SERVER: 				"Medieserver",
			PRINT_SERVER: 				"Utskriftserver",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Offline-nedlasting",
			
			PARENTAL_CONTROL: 			"Foreldre Kontroll",

			QOS:  						"QoS",
			DATABASE:  					"Database",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Kart",
			SB_MAP: 					"Kart",
			SB_BANDWIDTH:  				"Båndbredde",
			SB_PRIORITY: 				"Prioritet",
			SB_STATISTICS: 				"Statistikk",

			
			SECURITY: 					"Sikkerhet",
			SETTINGS: 					"Innstillinger",
			ACCESS_CONTROL: 			"Tilgangskontroll",
			IP_MAC_BINDING: 			"IP&MAC-binding",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Systemverktøy",
			TIME_SETTINGS: 				"Tidsinnstillinger",
			DIAGNOSTIC: 				"Diagnostikk",
			FIRMWARE_UPGRADE: 			"Fastvareoppgradering",
			BACKUP_RESTORE: 			"Fabrikkinnstillinger",
			ADMINISTRATION: 			"Administrasjon",
			SYSTEM_LOG: 				"Systemlogg",
			STATISTICS: 				"Traffikkstatistikk",
			SYSTEM_PARAMETERS: 			"Systemparametere",
			VPN: 						"VPN-server",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN-tilkoblinger"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Region og tidssone",
			INTERNET_CONNECTION_TYPE: 	"Internett-tilkoblingstype",
			WIRELESS_SETTINGS: 			"Trådløsinnstillinger",
			SUMMARY: 					"Sammendrag",
			SETUP_COMPLETE: 			"Test Internett-tilkobling",

			EXIT: 						"Avslutt",
			NEXT: 						"Neste",
			SAVE: 						"Lagre",
			FINISH: 					"Fullfør",
			OK: 						"OK",
			NONE: 						"Søk feilet.",

			REGION: 					"Region",
			TIME_ZONE: 					"Tidssone",
			NO_SELECT: 					"Velg alternativer.",

			AUTO_DETECT: 				"Automatisk oppdagelse",
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Hvis du ikke er sikker på hvilken type Internett-tilkobling du har, kan du bruke automatisk gjenkjenning eller kontakte din internettleverandør (ISP) for å få hjelp.",

			DYNAMIC_IP_INFO: 			"Hvis din Internettleverandør kun tillater tilgang til en bestemt MAC-adresse, må du klone MAC-adressen for hoveddatamaskinen. vis du er usikker, velg <strong>IKKE klone MAC-adresse</strong>.",
			MAC_CLONE_NO: 				"IKKE klone MAC-adressen",
			MAC_CLONE_YES: 				"Klone datamaskinens gjeldende MAC-adresse",
			MAC_CLONE_NOTE: 			"Hvis du velger å klone MAC-adressen. Sørg for at MAC-adressen til denne maskinen er registrert hos din ISP før du klikker på Neste.",

			PPPOE_INFO: 				"Angi ditt brukernavn og passord for PPPoE.",
			
			STATIC_IP_INFO: 			"Angi din IP-informasjon.",

			L2TP_INFO: 					"Angi ditt brukernavn og passord for L2TP",
			PPTP_INFO: 					"Angi ditt brukernavn og passord for PPTP.",
			
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			SERVER_IP_ADDRESS_NAME: 	"IP/Domenenavn for VPN-server",
			IP_ADDRESS: 				"IP-adresse",
			SUBNET_MASK: 				"Nettverksmaske",
			DEFAULT_GATEWAY: 			"Standard gateway",
			PRIMARY_DNS: 				"Primær DNS",
			SECOND_DNS: 				"Sekundær DNS",
			OPTIONAL: 					"(valgfritt)",
			
			ON: 						"På",
			OFF: 						"Av",
			WIRELESS_24GHZ: 			"Trådløst 2,4 GHz",
			WIRELESS_5GHZ: 				"Trådløst 5GHz",
			WIRELESS_60GHZ: 				"60GHz Trådløst nettverk",
			ENABLE_WIRELESS_RADIO: 		"Aktiver trådløs radio",
			NAME_SSID: 					"Navn på trådløst nettverk (SSID)",

			SUMMARY_INFO1: 				"Du må koble dine trådløse enheter til det det nye trådløse nettverket før du klikker på <strong>Neste</strong>-knappen.",
			SUMMARY_INFO2: 				"Den trådløse enhetens navn og passord ble endret til det følgende:",
			SUMMARY_INFO3: 				"Sørg for at du har koblet til det nye trådløse nettverket.",

			WIRELESS_24GHZ_SSID: 		"Navn på trådløst, 2,4 GHz nettverk (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Passord for trådløst, 2,4 GHz nettverk",
			WIRELESS_5GHZ_SSID: 		"Navn på trådløst, 5 GHz nettverk (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Passord for trådløst, 5 GHz nettverk",
			WIRELESS_60GHZ_SSID: 		"Trådløst 60GHz-SSID",
			WIRELESS_60GHZ_PASSWORD: 	"Trådløst 60GHz-passord",

			SORRY: 						"Mislyktes.",
			SUCCESS: 					"Vellykket!",
			TEST_INTERNET_SUCCESS_INFO: "Klikk Finish (Fullfør) for å fullføre hurtigkonfigureringen.",

			TEST_INTERNET_FAILED_INFO_0:"Kontroller at alle hurtigoppsettparametrene er korrekte og prøv igjen. Dersom alle hurtigoppsettparameterne er riktige. Omstarte modemet, vent 2 minutter, og klikk så på Test Internett-tilkoblingen en gang til. Hvis du ikke bruker et modem, må du kanskje kontakte din Internett-leverandør (ISP) for å få hjelp.",
			SUMMARY_INFO4: 				"Beklager! Vi oppdaget at du ikke har koblet den trådløse enheten til det nye trådløse nettverket. Koble til og klikk deretter på <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Gratulerer!",
			COMPLETE_INFO_0: 			"Du har fullført hurtigoppsettet.",
			COMPLETE_INFO_1:			"Klikk Test Internett-tilkobling under, og klikk deretter på Fullfør.",
			TEST_INTERNET: 				"Test Internett-forbindelsen",

			
			RESET_USER_TITLE: 			"Sett opp et nytt brukernavn og passord",
			NEW_USERNAME: 				"Nytt brukernavn",
			NEW_PASSWORD: 				"Nytt passord",
			CONFIRM_PASSWORD: 			"Bekreft nytt passord",
			CONFIRM: 					"Bekreft"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internett",
			INTERNET_STATUS:			"Internett-status",

			GHZ24: 						"2,4 GHz",
			GHZ5: 						"5 GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Tilkoblingstype",
			SECONDARY_CONN: 			"Sekundær forbindelse",

			POOR_CONNECTED: 			"Dårlig tilkobling",
			UNPLUGGED: 					"WAN-porten er frakoblet.",
			
			CONNECTED: 					"Tilkoblet",
			DISCONNECTED: 				"Frakoblet",
			CONNECTING: 				"Kobler til",

			INTERNET_IP_ADDR: 			"IP-adresse",
			
			IP_ADDR: 					"IP-adresse",
			MAC_ADDR: 					"MAC-adresse",
			GATEWAY: 					"Gateway",

			AUTO: 						"Auto",
			
			ROUTER: 					"Ruter",
			WIRELESS_CLIENTS: 			"Trådløse Enheter",
			HOST_CLIENTS: 				"Vertsklienter",
			GUEST_CLIENTS: 				"Gjesteklienter",
			WIRE_CLIENTS: 				"Kablede Enheter",
			PRINTER: 					"Skriver",
			USB_DISK: 					"USB-enhet",
			WIRELESS: 					"Trådløs",
			NAME: 						"Navn",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanal",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Trådløst 2,4 GHz",
			WIRELESS_5GHZ: 				"Trådløst 5GHz",
			WIRELESS_60GHZ:				"60GHz Trådløst nettverk",
			
			GUEST_24GHZ: 				"Gjestenettverk 2,4 GHz",
			GUEST_5GHZ: 				"Gjestenettverk 5 GHz",
			
			STATUS: 					"Status",
			TOTAL: 						"Totalt",
			AVAILABLE: 					"Tilgjengelig",
			GB: 						"GB",
			BRAND: 						"Merke",

			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP",
			SUBNET_MASK: 				"Nettverksmaske",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-tunnel",
			NONE: 						"Ingen"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internett",
			AUTO_DETECT: 				"Automatisk oppdagelse",
			INTERNET_CONN_TYPE: 		"Internett-tilkoblingstype",
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond-kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"Dhcp",
			UNPLUGGED: 					"Frakoblet",
			NONE: 						"Ingen",
			DETECT_FAIL: 				"Automatisk gjenkjenning mislyktes",
			SECONDARY_CONN: 			"Sekundær forbindelse",

			DYNAMIC_YES: 				"IKKE klone MAC-adressen",
			DYNAMIC_NO: 				"Klone datamaskinens gjeldende MAC-adresse",
			
			IP_ADDR: 					"IP-adresse",
			SUBNET_MASK: 				"Nettverksmaske",
			DEFAULT_GATEWAY: 			"Standard gateway",
			PRIMARY_DNS: 				"Primær DNS",
			SECOND_DNS: 				"Sekundær DNS",
			OPTIONAL: 					"(valgfritt)",
			USER_NAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			SERVER_IP_ADDR_NAME: 		"IP/Domenenavn for VPN-server",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Hvis du ikke er sikker på hvilken type Internett-tilkobling du har, kan du bruke automatisk gjenkjenning eller kontakte din internettleverandør (ISP) for å få hjelp."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Trådløsinnstillinger",
			MODE_2G: 					"Trådløst 2,4 GHz",
			MODE_5G: 					"Trådløst 5GHz",
			MODE_60G: 					"60GHz Trådløst nettverk",
			WIRELESS_NETWORK_NAME: 		"Navn på trådløst nettverk (SSID)",
			WIRELESS_PASSWORD: 			"Passord",
			ENABLE_WIRELESS: 			"Aktiver trådløs radio",
			SAVE: 						"Lagre",
			ENCRYPTION_2G_NOTICE:		"2,4 GHz-kryptering er %s.",
			ENCRYPTION_5G_NOTICE:		"5 GHz-kryptering er %s.",
			ENCRYPTION_60G_NOTICE:		"60GHz-kryptering er %s.",
			ENCRYPTION_2G_NO: 			"2,4 GHz trådløst nettverk er ikke kryptert.",
			ENCRYPTION_5G_NO: 			"5 GHz trådløst nettverk er ikke kryptert.",
			ENCRYPTION_60G_NO: 			"60GHz trådløst nettverk er ikke kryptert.",
			ENCRYPTION_NO: 				"Et usikret trådløst nettverk har skulte farer.",
			ENCRYPTION_SURE: 			"Er du sikker på at du vil fortsette?",
			HIDE_SSID: 					"Skjul SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Grunnleggende innstillinger",
			TITIL_NEW:					"Disk og konto",
			DISK_SET:					"Enhetsinnstillinger",

			SELFLY_REMOVE:				"Trygg fjerning",
			SCANING:					"Skanner ...",
			SCAN_RESULT:				"Fant %n disk",
			
			DISKS:						"Disker",
			USERS: 						"Brukerkonto",
			DEVICENAME: 				"Enhetsnavn",
			VOLUMN: 					"Volum",

			USBSPACE: 					"Brukt plass",
			FREESPACE: 					"Ledig plass",
			STATUS: 					"Status",
			INACT: 						"Deaktiver aktivitet",
			USAGE: 						"Bruk",
			CAPACITY: 					"Kapasitet",
			OPERATION: 					"Drift",
			
			ACC: 						"Kontobehandling", 	 	
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			USE_LOGIN: 					"Use Login user",
			SCAN: 						"Søk",
			ENJECT_ALL: 				"Løs ut alle",
			ENJECT: 					"Løs ut",
			ADD_USER: 					"Legg til bruker",
			AUTH: 						"Autoritet",


			LOCATION: 					"Sted",
			MOBILE_ISP: 				"Mobil ISP",
			DIAL_NUMBER: 				"Direktenummer",
			APN: 						"APN",
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			MTU_SIZE: 					"MTU-størrelse (i bytes)",
			OPTIONAL: 					"(valgfritt)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Foreldrekontroll",
			UNKNOWN: 					"Ukjent",
			
			DEVICE_CTR: 				"Enheter med foreldrekontroll",
			ID: 						"ID",
			DEVICE: 					"Enhetsnavn",
			MAC_ADDRESS: 				"MAC-adresse",
			TIME: 						"Internett-tilgangstid",
			DESCRIPTION: 				"Beskrivelse",
			ENABLE: 					"Aktiver",
			ENABLE_THIS_ENTRY: 			"Aktiver denne oppføringen",
			OPTIONAL: 					"(valgfritt)",
			BTN_VIEW: 					"Vis eksisterende enheter",
			
			DEVICE_LIST: 				"Enhetsliste",
			SYSTEM_TIME: 				"Systemtid",
			
			RESTR: 						"Innholdsbegrensning",
			MODE: 						"Begrensning",
			BLACKMODE: 					"Inkluder i svarteliste",
			WHITEMODE: 					"Inkluder i hviteliste",
			ACCESS_DEVICES_LIST: 		"Få tilgang til enhetsliste",
			
			CHOOSE: 					"Velg",
			ADD_A_NEW_KEYWORD: 			"Legg til nytt søkeord for å blokkere",
			ADD_A_NEW_DOMAIN_NAME: 		"Legg til et nytt domenenavn for å få tilgang",
			
			OPT: 						"Drift",
			STATUS: 					"Foreldrekontroll",
			YOURPC:						"Din PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Gjestenettverk",
			MODE_2G: 					"Trådløst 2,4 GHz",
			MODE_5G: 					"Trådløst 5GHz",
			WIRELESS_NETWORK_NAME: 		"Navn på trådløst nettverk (SSID)",
			WIRELESS_PASSWORD: 			"Passord",
			DYNAMIC_PASSWORD: 			"Passord",
			ENABLE_WIRELESS: 			"Aktiver gjestenettverk",
			SAVE:						"Lagre",
			HIDE_SSID: 					"Skjul SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervall for oppdatering av passord",
			PER_DAY: 					"Daglig",
			PER_WEEK: 					"Ukentlig",
			PER_MONTH: 					"Månedlig",
			NEVER: 						"Aldri",
			UNENCRYPTED:				"Gjestenettverk er ukryptert. Du kan angi et passord fra Avansert-menyen."
		},

		STATUS: {
			TITLE: 						"Status",
			INTERNET:					"Internett",
			WIRELESS:					"Trådløs",
			LAN:						"LAN",
			USB_TITLE:					"USB-enheter",
			PERFORMANCE: 				"Ytelse",
			GUEST_NETWORK: 				"Gjestenettverk",
			ACCESS_DEVICES: 			"Få tilgang til enheter",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4 GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Tilkoblingstype",

			MAC_ADDRESS: 				"MAC-adresse",
			IP_ADDRESS: 				"IP-adresse",
			RELEASE: 					"Frigi",
			RENEW: 						"Forny",
			
			DYNAMIC_IP: 				"Dynamisk IP",
			STATIC_IP: 					"Statisk IP",
			SUBNET_MASK: 				"Nettverksmaske",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-kabel",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-tunnel",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Gjennomgang  (bro)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Ingen",
			
			DEFAULT_GATEWAY: 			"Standard gateway",
			DNS: 						"DNS-server",
			MAC: 						"MAC-adresse",
			WDS_STATUS: 				"WDS-status",
			
			IPV6_ADDRESS: 				"IP-adresse",
			PRIMARY_DNS: 				"Primær DNS",
			SECOND_DNS: 				"Sekundær DNS",

			RADIO: 						"Trådløs radio",

			NAME_SSID: 					"Navn (SSID)",
			NETWORK_NAME_SSID:			"Nettverksnavn (SSID)",
			HIDE_SSID: 					"Skjul SSID",
			MODE: 						"Modus",
			CHANNEL: 					"Kanal",
			CHANNEL_WIDTH: 				"Kanalbredde",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Gjeldende kanal",

			WDS: 						"WDS-status",
			WIRED_CLIENTS: 				"Kablede Enheter",
			WIRELESS_CLIENTS: 			"Trådløse Enheter",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Koblingslokaladresse",
			ASSIGN_TYPE: 				"Tildelt type",
			
			ALLOW_TO_SEE_EACH: 			"Gjør det mulig for gjester å se hverandre",

			TOTAL: 						"Totalt:",
			AVAILABLE: 					"Tilgjengelig:",

			USB: 						"USB-disk",
			PRINTER: 					"Skriver",

			CPU_LOAD: 					"CPU-belastning",
			MEMORY_USAGE: 				"Bruk av minne",

			IP_ADDR_P: 					"IP-adresse:",
			MAC_ADDR_P: 				"MAC-adresse:",
			CONN_TYPE_P: 				"Tilkoblingstype:",

			DISABLED: 					"Deaktivert",
			INIT: 						"Init",
			SCAN: 						"Søk",
			AUTH: 						"Forf.",
			ASSOC: 						"Tilkn.",
			RUN: 						"Kjør",
			HOST: 						"Vert",
			GUEST: 						"Gjest",

			ON: 						"På",
			OFF: 						"Av"
		},

		INTERNET: {
			TITLE: 						"Internett",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Internett-tilkoblingstype",
			INTERNET_MAC_ADDRESS: 		"MAC-adresse",
			
			CONNECT: 					"Koble til",
			DISCONNECT: 				"Koble fra",

			IP_ADDR: 					"IP-adresse",
			
			USE_DEFAULT_MAC: 			"Bruk standard MAC-adresse",
			USE_COMPUTER_MAC: 			"Bruk datamaskinens gjeldende MAC-adresse",
			USE_CUSTOM_MAC: 			"Bruk tilpasset MAC-adresse",
			MAC_CLONE: 					"MAC Clone",
			
			CONFIG: 					"Konfig.",
			
			IP_ADDRESS: 				"IP-adresse",
			SUBNET_MASK: 				"Nettverksmaske",
			DEFAULT_GATEWAY: 			"Standard gateway",
			
			MANUAL_DNS: 				"Manuell DNS",
			PRIMARY_DNS: 				"Primær DNS",
			SECOND_DNS: 				"Sekundær DNS",
			
			RENEW: 						"Forny",
			RELEASE: 					"Frigi",
			VIEW_MODE: 					"Visningsmodus",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Få dynamisk fra ISP",
			USE_FOLLOW_IP_ADDR: 		"Bruk følgende IP-adresse",
			USE_FOLLOW_DNS_ADDR: 		"Bruk følgende DNS-adresser",
			USE_FOLLOW_DNS_SERVER: 		"Bruk følgende DNS-server",
			
			BASIC: 						"Grunnleggende",
			ADVANCED: 					"Avansert",
			
			DNS_ADDR_MODE: 				"DNS-adresse",
			MTU_SIZE: 					"MTU-størrelse",
			MTU_1500: 					"byte. (Standardverdi er 1500. Ikke endre dette med mindre det er nødvendig.)",
			MTU_1480: 					"byte. (Standardverdi er 1480. Ikke endre dette med mindre det er nødvendig.)",
			MTU_1460: 					"byte. (Standardverdi er 1460. Ikke endre dette med mindre det er nødvendig.)",
			MTU_1420: 					"byte. (Standardverdi er 1420. Ikke endre dette med mindre det er nødvendig.)",
			
			HOST_NAME: 					"Vertsnavn",

			HOST_NAME_CONFIRM: 			"Vertsnavnet inneholder ulovlige tegn som kan føre til uventet systematferd. Er du sikker på at du vil fortsette?",

			GET_IP_WITH_UNICAST_DHCP: 	"Få IP ved hjelp Unicast DHCP (Det er normalt ikke obligatorisk.)",
			OPTIONAL: 					"(valgfritt)",
			
			STATIC_IP: 					"Statisk IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6:					"Auto",
			
			USER_NAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			
			INTERNET_IP_ADDR: 			"IP-adresse",
			INTERNET_DNS: 				"Internett-DNS",
			SECONDARY_CONN: 			"Sekundær forbindelse",
			NONE: 						"Ingen",
			INTERNET_PRIMARY_DNS:		"Primær DNS",
			INTERNET_SECONDARY_DNS: 	"Sekundær DNS",
			
			DYNAMIC_IP: 				"Dynamisk IP",
			DYNAMIC_IP_v6: 				"Dynamisk IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Tjenestenavn",
			ACCESS_CONCENTRATOR_NAME:  	"Navn på tilgangskonsentrator",
			DETECT_ONLINE_INTERVAL: 	"Oppdag online intervall",
			INTERVAL_TIPS: 				"sekunder. (0–120. Standard er 10.)",
			IP_ADDR_MODE:  				"IP-adresse",
			CONN_MODE: 					"Tilkoblingsmodus",
			DHCP_LINK_UNPLUGGED: 		"WAN-porten er frakoblet.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"Ved behov",
			TIME_BASED: 				"Tidsbasert",
			MANUALLY: 					"Manuelt",
			MAX_IDLE_TIME: 				"Maks. tid uten aktivitet",
			MAX_IDLE_TIME_TIPS: 		"minutter. (0 betyr alltid aktiv.)",
			PERIOD_OF_TIME: 			"Tidsperiode",
			TIME_TIPS: 					"(TT:MM)",
			BIGPOND_CABLE: 				"BigPond-kabel",
			AUTH_SERVER: 				"Forf. Server",
			AUTH_DOMAIN: 				"Forf. Domene",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"IP/Domenenavn for VPN-server",
			PPTP: 						"PPTP",
			TO: 						"til",
			
			TUNNEL_6TO4: 				"6to4-tunnel",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Få ikke-midlertidig IPv6-adresse",
			GET_PREFIX_DELEGATION: 		"Få IPv6-prefiks delegasjon ",
			IPV6_ADDR: 					"IPv6-adresse",

			GET_IPV6_WAY: 				"Få IPv6-adresse",
			AUTOMATICALLY:              "Hent automatisk",
			SPECIFIED_BY_ISP: 			"Spesifisert etter ISP",

			IPV6_ADDR_PREFIX: 			"IPv6-adresseprefiks",
			NONE_TEMPORARY: 			"Ikke-midlertidig",

			PREFIX_DELEGATION: 			"Prefiksdelegering",
			ENABLE:                     "Aktiver",
			DISABLE:                    "Deaktiver",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 maskelengde",
			CONFIG_TYPE: 				"Konfigurasjonstype",
			RD6_PREFIX: 				"6RD-prefiks",
			RD6_PREFIX_LENGTH: 			"6RD prefikslengde",
			REPLY_IPV4_ADDR: 			"Border reply IPv4-adresse",
			MANUAL: 					"Håndbok",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Gjennomgang  (bro)",
			LOCAL_IPV6: 				"Lokal IPv6-adresse",
			PEER_IPV6: 					"Ekstern maskins IPv6-adresse",
			TUNNEL_ADDR: 				"Tunneladresse",
			IPV4_NETMASK: 				"IPv4-nettmaske",
			CUSTOM: 					"Tilpasset",
		    AFTR_NAME: 					"AFTR-navn",
			PPP_SHARE_V6:				"PPPoE samme sesjon med IPv4-tilkobling",
			PPP_SHARE_V4:				"PPPoE samme sesjon med IPv6-tilkobling",


			
			
			IPV4_ADDR: 					"IPv4-adresse",
			IPV4_MASK: 					"IPv4-nettverksmaske",
			IPV4_GATEWAY: 				"IPv4 standard gateway",

			DUPLEX: 					"Dupleks",
			AUTO_NEGOTIATION: 			"Automatisk forhandling",
			FULL_DUPLEX_1000: 			"1000 Mbps full dupleks",
			HALF_DUPLEX_1000:			"1000 Mbps halv dupleks",
			FULL_DUPLEX_100: 			"100 Mbps full dupleks",
			HALF_DUPLEX_100: 			"100 Mbps halv dupleks",
			FULL_DUPLEX_10: 			"10 Mbps full dupleks",
			HALF_DUPLEX_10: 			"10 Mbps halv dupleks"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC-adresse",
			IP_ADDRESS: 				"IP-adresse",
			SUBNET_MASK: 				"Nettverksmaske",
			CUSTOM: 					"Tilpasset",

			IGMP: 						"Aktiver IGMP-proksy",
			


			ASSIGNED_TYPE: 				"Tildelt type",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+Tilstandsløs DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Adresseprefiks",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adresse",
			DELEFATED: 					"Delegert",
			STATIC: 					"Statisk",
			SITE_PREFIX: 				"Sideprefiks",
			SITE_PREFIX_LEN: 			"Lengde på sideprefiks",

			PREFIX_TYPE:  				"Konfigurasjonstype for områdeprefiks",
			LAN_IPV6_ADDR:  			"LAN IPv6-adresse",

			RELEASE_TIME: 				"Utløsingstid",
			RELEASE_TIME_TIP: 			"sekunder. (Standardverdi er 86400. Ikke endre dette med mindre det er nødvendig.)",
			ADDRESS:					"Adresse",
			SAVE: 						"Lagre",

			REBOOT_TIP: 				"Ruteren hopper til den nye påloggingssiden. <br/> Vent litt ..."

		},

		IPTV:{
			TITLE: 						"Innstillinger",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Aktiver IPTV", 
			MODE:  						"Modus",
			IGMP_PROXY: 				"IGMP-proxy",
			IGMP_VERSION: 				"IGMP-Versjon",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bro",
			BASIC: 						"Tilpasset",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Russland",
			UNIFY:  					"Malaysia-Unifi",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internett",
			IP_PHONE: 					"IP-telefon", 

			Q_TAG: 						"802.1Q-kode",
			ENABLE: 					"Aktiver",
			
			INTERNET_VLAN_ID: 			"Internett VLAN-ID",
			INTERNET_VLAN_PRIORITY: 	"Internett VLAN-prioritet",
			IP_PHONE_VLAN_ID: 			"IP-telefon VLAN-ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP-telefon VLAN-prioritet",
			IPTV_VLAN_ID: 				"IPTV VLAN-ID",
			IPTV_VLAN_PRIORITY: 		"IPTV VLAN-prioritet",
			IPTV_MULTI_VLAN_ID: 		"IPTV Multicast VLAN-ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV Multicast VLAN-prioritet"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP-server",
			
			SETTINGS: 					"Innstillinger",

			DHCP_SERVER: 				"DHCP-server",
			ENABLE_DHCP_SERVER: 		"Aktiver DHCP Server",

			IP_ADDR_POOL: 				"IP-adresseutvalg",
			LEASETIME: 					"Leasingavtaletid for adresse",
			LEASENOTE: 					"minutter. (2-2880. Standardverdi er 120.)",
			
			GATEWAY: 					"Standard gateway",
			DOMAIN: 					"Standard domene",
			PRIMARYDNS: 				"Primær DNS",
			SECONDARYDNS: 				"Sekundær DNS",

			OPTIONAL: 					"(valgfritt)",

			CLIENTSLIST: 				"DHCP-klientliste",
			CLIENT_NUMBER: 				"Klientnummer",
			CLIENT_NAME: 				"Klientnavn",
			MAC_ADDR: 					"MAC-adresse",
			ASSIGNED_IP: 				"Tildelt IP-adresse",
			LEASE_TIME: 				"Leasingavtaletid",

			RESERVATION: 				"Adressereservasjon",

			RESERVED_IP: 				"Reservert IP-adresse",
			IP_ADDRESS: 				"IP-adresse",
			DESCRIPTION: 				"Beskrivelse",

			CLIENTSLIST: 				"DHCP-klientliste",
			CLIENT_NUMBER: 				"Klientnummer",

			ENABLE: 					"Aktiver",
			ENABLE_THIS_ENTRY: 			"Godta denne oppføringen",
			BTN_VIEW:					"Vis eksisterende enheter"
			
		},

		DDNS: {
			DDNS: 						"Dynamisk DNS",
			SERVICEPROVIDER: 			"Tjenestetilbyder",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Gå til registrering...",
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			DOMAIN_NAME_LIST: 			"Navneliste for domene",
			DOMAIN_NAME: 				"Domenenavn",
			LOGIN: 						"Logg inn",
			LOGIN_SAVE: 				"Logg inn og lagre", 
			LOGOUT: 					"Logg ut",
			STATU_SUCCESS:				"Etterfølge",
			UPDATE_INTERVAL:			"Oppdateringsintervall",
			ONE_HOUR:					"1 time",
			SIX_HOUR:					"6 timer",
			TWETEEN_HOUR:				"12 timer",
			ONE_DAY:					"1 dag",
			TWO_DAY:					"2 dager",
			THREE_DAY:					"3 dager",
			NEVER:						"aldri",
			UPDATE:						"Oppdater",
			STATU_INCORRENT:			"Feil brukernavn eller passord",
			STATU_ERR_DOMAIN:			"Feil domenenavn",
			
			STATU_NO_LAUNCH:			"Starter ikke",
			STATU_FAIL_DDNS: 			"Kunne ikke oppdatere DynDNS.",
			STATU_FAIL_NOIP: 			"Kunne ikke oppdatere No-IP.",
			STATU_CONN:					"Kobler til"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Avansert ruting",
			STATIC_ROUTING: 			"Statisk ruting",

			DESTINATION_NETWORK:		"Nettverksmål",
			SUBNET_MASK: 				"Nettverksmaske",
			DEFAULT_GATEWAY: 			"Standard gateway",
			DESCRIPTION: 				"Beskrivelse",
			
			SYSTEM_ROUTING_TABLE: 		"Systemrutingtabell",
			CLIENT_NUMBER: 				"Aktivt rutingnummer",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Grensesnitt",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Aktiver",
			ENABLE_THIS_ENTRY: 			"Godta denne oppføringen"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Innstillinger",
			NOT_SUPPORT_5G: 			"Denne regionen støtter kun 2,4 GHz. Pass på at du velger riktig region.",
			NOT_SUPPORT_60G: 			"Denne regionen støtter ikke 60GHz.",
			ENABLE_TIPS: 				"Du bør skru på trådløs radio.",

			REGION: 					"Region",
			NOTICE:  					"For å bruke trådløsfunksjonen bør lar du trådløsbryteren på maskinvaren stå påslått.",
			
			MODE_2G:					"2,4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Trådløst",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Aktiver trådløs radio",

			WIRELESS_NETWORK_NAME: 		"Navn på trådløst nettverk (SSID)",
			WIRELESS_PASSWORD: 			"Passord",
			HIDE_SSID: 					"Skjul SSID",

			SECURITY: 					"Sikkerhet",
			NO_SECURITY: 				"Ingen sikkerhet",
			WPA_WPA2_PERSONAL: 			"Personlig WPA/WPA2 (anbefalt)",
			WPA_WPA2_ENTERPRISE: 		"Enterprise-WPA/WPA2",
			WPA2_PERSONAL: 			    "WPA2-Personal (anbefalt)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Versjon",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Kryptering",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Modus",
			MODE_B:  					"Kun 802.11b",
			MODE_G:  					"Kun 802.11g",
			MODE_N:  					"Kun 802.11n",
			MODE_BG:  					"Blandet 802.11b/g",
			MODE_GN: 					"Blandet 802.11g/n",
			MODE_BGN:  					"Blandet 802.11b/g/n",

			MODE_A_5: 					"Kun 802.11a",
			MODE_AN_5: 					"Blandet 802.11a/n",
			MODE_N_5: 					"Kun 802.11n",
			MODE_AC_5:					"Kun 802.11ac",
			MODE_NAC_5:					"Blandet 802.11n/ac",
			MODE_ANAC_5:				"Blandet 802.11a/n/ac",

			MODE_AD_60:					"Kun 802.11ad",

			CHANNEL_WIDTH: 				"Kanalbredde",
			CHANNEL: 					"Kanal",

			TRANSMIT_POWER: 			"Overføringskraft",

			RADIUS_SERVER_IP: 			"RADIUS server-IP",
			RADIUS_PORT: 				"RADIUS-port",
			RADIUS_PASSWORD: 			"RADIUS-passord",

			TYPE: 						"Type",
			OPEN_SYSTEM: 				"Åpne system",
			SHARED_KEY: 				"Delt nøkkel",

			KEY_SELECTED: 				"Nøkkel valgt",
			KEY1: 						"Nøkkel1",
			KEY2: 						"Nøkkel2",
			KEY3: 						"Nøkkel3",
			KEY4: 						"Nøkkel4",

			WEP_KEY_FORMAT: 			"WEP-nøkkel-format",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Heksadesimal",

			KEY_TYPE: 					"Nøkkeltype",
			BIT64: 						"64-biters",
			BIT128: 					"128-biters",
			BIT152: 					"152-biters",

			KEY_VALUE: 					"Nøkkelverdi",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Lav",
			MIDDLE: 					"Middels",
			HIGH: 						"Høy"
		},

		WPS: {

			TITLE2: 					"Ruterens PIN-kode",
			ROUTERS_PIN_INFO: 			"Andre enheter kan koble til denne ruteren via WPS med ruterens PIN-kode.",
			ENABLE_ROUTE_PIN: 			"Ruterens PIN-kode",
			ROUTE_PIN: 					"PIN-kode",
			GENERAL: 					"Generer",
			DFT: 						"Standard",

			TITLE: 						"WPS-veiviser",
			SELECT_SETUP: 				"Velg installasjonsmetode",
			PUSH_BTN: 					"Knapp (anbefalt)",
			PUSH_DES: 					"Trykk på den fysiske knappen på ruteren eller klikk på Koble til i programvaren via denne siden.",
			CONNECT: 					"Koble til",
			CANCEL: 					"Avbryt",

			RESULT_HEAD: 				"Trådløsklienten",
			RESULT_END: 				"ble lagt til i nettverket.",
			NOT_FOUND: 					"Finner ingen kunder. Klikk på knappen for å prøve igjen.",

			PIN_NUMBER: 				"PIN-kode",
			
			PIN_BTN: 					"PIN-kode",
			NOT_FOUND: 					"Ikke funnet",
			ENTER_CLIENT_PIN: 			"Skriv inn klientens PIN-kode",
			SWITCH_NOTE:				"For å koble til via WPS, slår du på den trådløse funksjonen med WIFI-knappen.",
			SWITCH_NOTE2:				"Hvis du vil bruke WPS-veiviseren bør du først konfigurere de riktige trådløse parameterne.",
			STATUS_PIN_ERROR: 			"Ugyldig PIN-kode for WPS? Kryss av om dette er riktig.",
			STATUS_ERROR: 				"Feil.",
			STATUS_CONN_ERROR: 			"Tilkobling mislyktes.",
			STATUS_CONNING: 			"Kobler til ...",
			STATUS_CANCEL: 				"Tilkobling ble avbrutt.",
			
			NOTE: 						"Merk:",
			BUTTON: 					"WIFI-knappen er av",
			ENABLE: 					"Den trådløse funksjonen er ikke aktivert",
			HIDDEN: 					"Skjul SSID er på",
			ENCRYPTION: 				"Krypteringen er ikke riktig",
			WPS: 						"WPS er deaktivert på siden Systemparametere",

			
			STATUS_CONN_OVERLAP: 		"Tilkobling mislyktes(OVERLAPPING).",
			STATUS_CONN_TIMEOUT: 		"Tilkobling mislyktes(TIDSAVBRUDD).",
			STATUS_CONN_INACT: 			"Tilkobling inaktiv."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Påloggede radiostasjoner",
			CLIENT_NUMBER: 				"Klientnummer",
			MAC_ADDRESS: 				"MAC-adresse",
			CONN_TYPE: 					"Tilkoblingstype",
			SECURITY: 					"Sikkerhet",
			RECEIVED_PACKETS: 			"Mottatte pakker",
			SEND_PACKETS: 				"Sendte pakker"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Innstillinger",
			
			MODE_2G: 					"2,4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Gjør det mulig for gjester å se hverandre",

			ALLOW_LOCAL: 				"Gjør det mulig for gjester å få tilgang til det lokale nettverket",
			
			WIRELESS: 					"Trådløst",
			WIRELESS_24G_RADIO: 		"Trådløst 2,4 GHz",
			WIRELESS_5G_RADIO: 			"Trådløst 5 GHz",
			ENABLE_GUEST: 				"Aktiver gjestenettverk",

			NAME_SSID: 					"Navn på trådløst nettverk (SSID)",
			HIDE_SSID: 					"Skjul SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervall for oppdatering av passord",
			PER_DAY: 					"Daglig",
			PER_WEEK: 					"Ukentlig",
			PER_MONTH: 					"Månedlig",
			NEVER: 						"Aldri",
			SECURITY: 					"Sikkerhet",
			NO_SECURITY: 				"Ingen sikkerhet",	
			WPA_WPA2_PERSONAL: 			"Personlig WPA/WPA2",

			VERSION: 					"Versjon",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Kryptering",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Passord"
		},

		NAT:{
			SETTINGS: 					"Maskinvare-NAT",
			STATUS: 					"Maskinvare-NAT",
			
			ALG_TITLE: 					"Application Layer Gateway (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP direkte",
			L2TP_ALG: 					"L2TP direkte",
			IPSEC_ALG: 					"IPSec direkte",

			ENABLE_FTP_ALG: 			"Aktiver FTP ALG",
			ENABLE_TFTP_ALG: 			"Aktiver TFTP ALG",
			ENABLE_H323_ALG: 			"Aktiver H323 ALG",
			ENABLE_RTSP_ALG: 			"Aktiver RTSP ALG",
			ENABLE_PPTP_ALG: 			"Aktiver PPTP direkte",
			ENABLE_L2TP_ALG: 			"Aktiver L2TP direkte",
			ENABLE_IPSEC_ALG: 			"Aktiver IPSec direkte",
			NAT_ENABLE_NOTICE: 			"Merk: Konfigurasjonene vil ikke tre i kraft før NAT-funksjonen er aktivert."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Virtuelle servere",

			SERVICE_NAME: 				"Tjenestetype",
			EXTERNAL_PORT: 				"Ekstern port",
			INTERNAL_IP: 				"Intern  IP",
			INTERNAL_PORT: 				"Intern port",
			PROTOCAL: 					"Protokoll",

			BTN_VIEW: 					"Vis eksisterende tjenester",

			EXSITTING_SERVICE: 			"Eksisterende tjenester",
			
			PROTOCAL_ALL: 				"ALLE",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX eller XX)",
			EXT_PORT_TIPS: 				"(XX eller XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX eller blank ,1-65535)",

			NOTICE:						"I konflikt med fjernadministrasjonsport. Er du sikker på at du vil fortsette?",
			NOTICE_INVALID_REMOTE:		"Eksternbehandling er ugyldig fordi 80-porten er i konflikt med den virtuelle serveren. Endre fjernadministrasjonsport.",
			NOTICE_ENTER_ANOTHER:		"I konflikt med fjernadministrasjonsport. Angi en annen port.",
			NOTICE_PPTP_CONFLICT:		"I konflikt med PPTP VPN-porten. Angi en annen port.",
			NOTICE_OPENVPN_CONFLICT:	"I konflikt med OpenVPN-porten. Angi en annen port.",


			ENABLE_THIS_ENTRY: 			"Aktiver",
			OPERATION: 					"Drift",
			CHOOSE: 					"Velg",
			NAT_ENABLE_NOTICE: 			"Merk: Konfigurasjonene vil ikke tre i kraft før NAT-funksjonen er aktivert."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port-utløsing",
			APPLICATION: 				"Program",
			TRIGGER_PORT: 				"Triggering Port",
			TRIGGER_PROTOCOL: 			"Triggering Protocol",

			EXTERNAL_PORTS: 			"Ekstern port",
			EXTERNAL_PROTOCOL: 			"Ekstern protokoll",

			BTN_VIEW: 					"Vis eksisterende programmer",

			EXSITTING_APPLICATION: 		"Eksisterende programmer",
			APPLICATION_NAME: 			"Programnavn",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX eller XX-XX,1-65535,med maks. fem par)",
			
			NOTICE_PPTP_CONFLICT:		"I konflikt med PPTP VPN-porten. Angi en annen port.",
			NOTICE_OPENVPN_CONFLICT:	"I konflikt med OpenVPN-porten. Angi en annen port.",
			
			ENABLE_THIS_ENTRY: 			"Aktiver",
			OPERATION: 					"Drift",
			
			PROTOCAL_ALL: 				"ALLE",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Merk: Konfigurasjonene vil ikke tre i kraft før NAT-funksjonen er aktivert."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Aktiver DMZ",
			HARDWARESTATUS: 			"DMZ IP-adresse for vert",
			NAT_ENABLE_NOTICE: 			"Merk: Konfigurasjonene vil ikke tre i kraft før NAT-funksjonen er aktivert."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP-tjenesteliste",
			CLIENT_NUMBER: 				"Klientnummer",
			SERVICE: 					"Tjenestebeskrivelse",
			EXTERNAL_PORT: 				"Ekstern port",
			PROTOCAL: 					"Protokoll",
			IP_ADDR: 					"Intern IP-adresse",
			INTERNAL_PORT: 				"Intern port",
			NAT_ENABLE_NOTICE: 			"Merk: Konfigurasjonene vil ikke tre i kraft før NAT-funksjonen er aktivert."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB-modem",
			LOCATION: 					"Plassering",
			MOBILE_ISP: 				"Mobil ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Tilkoblingsmodus",
			CONNECT_ON_DEMAND: 			"Koble til ved behov",
			CONNECT_AUTOMATICALLY: 		"Koble til automatisk",
			CONNECT_MANUALLY: 			"Koble til manuelt",
			MAX_IDLE_TIME: 				"Maks. tid uten aktivitet",
			CONNECTION_TIP: 			"Den nåværende internettilgangen er WAN-prioritert.",
			IDLE_TIME_TIP: 				"Tilkoblingstype og maks. tid uten aktivitet kan ikke angis manuelt.",
			MINUTES: 					"minutter. (0 betyr at den forblir aktiv til enhver tid.)",

			AUTHENTICATION_TYPE: 		"Godkjenningstype",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Standardinnstillingen er Auto. Ikke endre dette med mindre det er nødvendig.",

			CONNECT: 					"Koble til",
			DISCONNECT: 				"Koble fra",

			SET_TIP: 					"Angi direktenummer, APN, brukernavn og passord manuelt.",
			DIAL_NUMBER: 				"Direktenummer",
			APN: 						"APN",
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			OPTIONAL: 					"(valgfritt)",
			MTU_SIZE: 					"MTU-størrelse (i bytes)",
			MTU_SIZE_TIP: 				"Standardverdi er 1480. Ikke endre dette med mindre det er nødvendig.",

			USE_FOLLOW_DNS_SERVER: 		"Bruk følgende DNS-servere",
			PRIMARY_DNS: 				"Primær DNS",
			SECOND_DNS: 				"Sekundær DNS",

			UNPLUGGED: 					"Frakoblet",
			IDENTIFYING: 				"Identifiserer...",
			IDENTIFY_SUCCESS: 			"Identify successfully"
		},

		DISK_SETTING: {
			DISK_SET: 					"Enhetsinnstillinger",
			SCAN: 						"Søk",
			SELFLY_REMOVE: 				"Trygg fjerning",
			SCAN_RESULT: 				"Fant %n disk",
			NOT_FOUND: 					"Ikke funnet",
			SELFLY_REMOVE: 				"Trygg fjerning",
			
			VOLUMN: 					"Volum",
			CAPACITY: 					"Kapasitet",
			FREESPACE: 					"Ledig plass",
			USBSPACE: 					"Brukt plass",
			
			STATUS: 					"Status",
			INACT: 						"Deaktiver aktivitet",
			ACTIVE: 					"Aktive",
			
			USAGE: 						"Bruk",
			CAPACITY: 					"Kapasitet",
			OPERATION: 					"Drift",	
			
			ACC: 						"Kontobehandling", 	 	
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			USE_LOGIN: 					"Use Login user",
			SCAN: 						"Søk",
			ENJECT_ALL: 				"Løs ut alle",
			ENJECT: 					"Løs ut",
			ADD_USER: 					"Legg til bruker",
			AUTH: 						"Autoritet"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline-nedlasting",
			ITEMS:						"Elementer",
			FILE:						"Fil",
			FOLDER:						"Mappe",
			SIZE:						"Størrelse",
			STATUS:						"Status",
			DOWNLOAD:					"Last ned",
			REMAINTING:					"Gjenstående tid",
			SPEED:						"Hastighet",
			SOURCE:						"Kilde",	
			DOWNLOADTO:					"Last ned til",	
			TORRENT_PC:					"Torrent fra PC",
			TORRENT_USB:				"Torrent fra USB:",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP-port",
			AMULEUDP:					"aMule UDP-port",
			AMULESERVER:				"aMULE-Server",
			SCHEDULE:					"Plan",
			MAXACTIVE:					"Maksimalt antall aktive oppgaver",
			MAXACTIVENUM:				"(1 – 10)",
			TIMEZONE:					"Tidssone",
			DOWNLOADTIME:				"Nedlastingstid",
			REPEAT:						"Gjenta",
			SPEEDLIMIT:					"Maksimalhastigheter",
			MAXDOWNLOAD:				"Maksimal nedlastingshastighet",
			MAXUPLOAD:					"Maksimal opplastingshastighet",
			SPEEDTIPS:					"(0 betyr ubegrenset.)",
			BTPORT:						"BT-nedlastingsport",
			SEED:						"Forsett å seede etter oppgaven er utført",
			UNIT:						"KB/S",
			MODIFY:						"Modifiser",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrent-plassering",
			CONNECT:					"Tilkoblet",
			DISCONNECTED:				"Frakoblet",
			CONNECTING:					"Kobler til",
			GENERAL:					"Generelt",
			COMPLETED:					"Fullført",
			NEWDEVICE:					"Ny enhet",
			FOUNDUSB:					"Oppdaget en ny USB",
			CONNECTEDPEERS:				"Tilkoblede noder",
			OF:							"av",
			NUM_OF_CON:					"Antall forbindelser",
			NUM_OF_CON_G:				"Globalt maksimalt antall forbindelser",
			NUM_OF_CON_PT:				"Maksimalt antall tilkoblede noder per torrent.",
			EN_DHT_NET:					"Aktiver DHT-nettverk",
			EN_PE_EX:					"Aktiver nodeutveksling",
			EN_BT:						"Aktiver BitTorrent protokollkryptering",
			GENERAL_SETTINGS:			"Generelle innstillinger",
			BT_SETTINGS:				"BT-innstillinger",
			AMULE_SETTINGS:				"aMule-innstillinger",
			CLEAN:						"Fjern fullførte",
			NONE_COMPLETE: 				"Ingen oppgaver er fullført."
		},

		FOLDER: {
			TITLE: 						"Innstillinger for deling",
			ACCOUNT_TITLE: 				"Konto for deling",
			ACCOUNT:					"Konto",
			AC_NOTE: 					"Klargjør en konto for å dele innhold. Du kan bruke innloggingskontoen eller opprette en ny konto.",
			
			AC_LOGIN: 					"Bruk standardkonto",
			AC_FOLLOW: 					"Bruk ny konto",

			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",
			CONFIRM: 					"Bekreft passord",

			SHARING_SETTING: 			"Innstillinger for deling",
			SERVER_NAME: 				"Nettverk/media-servernavn",

			METHOD: 					"Tilgangsmetode",
			LINK: 						"Kobling",
			PORT: 						"Port",

			NETWORK_NEIGHBORHOOD: 		"Andre maskiner",
			FTP: 						"FTP",
			FTPEX: 						"FTP (via Internett)",

			SHARE_FOLDER: 				"Mappedeling",
			SHAREING_ALL: 				"Del alle",
			NOTE:  						"Slå på for å dele alle filer og mapper, eller hold den av får kun å dele de spesifiserte mappene", 
			ENABLE_AUTHENTICATION: 		"Aktiver godkjenning",
			SHAREING_FOLDER: 			"Delingsmappe",
			
			SHARE_NAME: 				"Mappenavn",
			FOLDER_PATH: 				"Mappebane",
			VOLUMN_NAME: 				"Volumnavn",

			SHARE_NAME: 				"Mappenavn",
			FOLDER_PATH: 				"Mappebane",
			MEDIA_SHARING: 				"Mediadeling",
			STATUS: 					"Status",

			GUEST_ACCESS: 				"Tillat gjester å bruke nettverket",
			ENABLE_AUTHENTICATION: 		"Aktiver godkjenning",
			ENABLE_WRITE_ACCESS: 		"Aktiver skrivetilgang",
			ENABLE_MEDIA_SHARE: 		"Aktiver mediadeling",
			
			BROWSE: 					"Bla gjennom",
			BROWSE_TITLE: 				"Velg en mappe",

			NO_VOLUMN:					"Ingen volum",
			
			NOTICE: 					"Er du sikker på at du vil gå til dynamisk DNS-siden? Trykk på Lagre for å lagre og forlate siden. Trykk på Forlat for å forlate siden uten å lagre. Trykk på Avbryt for å forbli på siden.",
			NO_CHANGE_NOTICE: 			"Er du sikker på at du vil gå til dynamisk DNS-siden?",

			SAVE_FAILED_NOTICE: 		"Lagring mislyktes",
			CONTINUE: 					"Forlat",
			CONTINUE_SAVE: 				"Lagre",
			CANCLE: 					"Avbryt",

			ENABLE: 					"Aktiver"

		},

		PRINT:{
			TITLE: 						"Utskriftserver",
			NAME: 						"Skrivernavn",
			ENABLE_PRINT_SERVER: 		"Utskriftserver",
			NONE: 						"Ingen",
			
			NOTE_TITLE: 				"Merk:",
			STEP1: 						"Trinn 1:",
			STEP2: 						"Trinn 2:",
			STEP3: 						"Trinn 3:",

			NOTE1: 						"Installer skriverdriveren på datamaskinen",
			NOTE2: 						"Koble USB-skriveren til USB-porten på ruteren via en USB-kabel.",
			NOTE3: 						"Installer TP-LINK USB Printer Controller Utility. Last den ned fra vår offisielle hjemmeside: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/no/Support/\">http://www.tp-link.com/no/Support/</a>.",
			NOTE3_US: 					"Installer TP-LINK USB Printer Controller Utility. Last den ned fra vår offisielle hjemmeside: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Sperrefunksjon",
			STATUS: 					"Sperrefunksjon",
			UNKNOWN: 					"Ukjent",

			DEVICE_CTR: 				"Enheter med sperrefunksjoner",
			DEVICE: 					"Enhetsnavn",
			MAC_ADDRESS: 				"MAC-adresse",
			TIME: 						"Internett-tilgangstid",
			DESCRIPTION: 				"Beskrivelse",
			
			ENABLE_THIS_ENTRY: 			"Aktiver",
			OPTIONAL: 					"(valgfritt)",
			BTN_VIEW: 					"Vis eksisterende enheter",
			
			DEVICE_LIST: 				"Enhetsliste",
			SYSTEM_TIME: 				"Systemtid",
			
			RESTR: 						"Innholdsbegrensning",
			MODE: 						"Begrensning",
			BLACKMODE: 					"Inkluder i svarteliste",
			WHITEMODE: 					"Inkluder i hviteliste",
			ACCESS_DEVICES_LIST: 		"Få tilgang til enhetsliste",
			
			CHOOSE: 					"Velg",
			ADD_A_NEW_KEYWORD: 			"Legg til nytt søkeord for å blokkere",
			ADD_A_NEW_DOMAIN_NAME: 		"Legg til et nytt domenenavn for å få tilgang",
			
			YOURPC:						"Din PC"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internett",
			ROUTER: 					"Ruter",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Andre",

			DEVICE: 					"Enhet",
			RATE: 						"Frekvens",
			APPLICATION: 				"Program",

			NAME: 						"Navn",
			MAC_ADDRESS: 				"MAC-adresse",
			IP_ADDRESS: 				"IP-adresse",


			DEVICES: 					"Enheter"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Båndbredde",
			TEST_BANDWIDTH: 			">Test båndvidde",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Aktiver streamboost",
			UP_LIMITATION: 				"Dataopplastingsbegrensning (Mbps)",
			DOWN_LIMITATION: 			"Datanedlastingsbegrensning (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Kjør båndbredde-test",
			TESTING: 					"Tester",
			TEST_FAILED: 				"Test mislyktes",
			TEST_SUCCEED: 				"Test vellykket",
			ENABLE_AUTOMATIC_TEST: 		"Aktiver automatisk testing",
			KEEP_UP_TO_DATE: 			"Hold StreamBoost oppdatert",
			ENABLE_AUTOMATIC_UPDATE: 	"Aktiver automatisk oppdatering"

		},

		PRIORITY:{
			PRIORITY: 					"Prioritet",
			PRIORITY_TIPS: 				"Prioritet lar deg endre viktigheten av en enhet i forhold til en annen. Dette er nyttig når enheten konkurrerer om begrenset båndbredde med bruk av samme klassifisering.",
			ALL_DEVICE: 				"Alle enheter",
			ACTIVE_DEVICE: 				"Aktive enheter",
			SAVE: 						"Lagre",
			ID: 						"ID",
			DEVICE: 					"Enhet",
			TYPE: 						"Type",
			MAC_ADDRESS: 				"MAC-adresse",
			STICK: 						"Stick"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistikk",
			UP_TIME: 					"Opplastingstid",
			DOWNLOADS: 					"Nedlastinger",
			LAST_DAY: 					"Siste dag",
			LAST_WEEK: 					"Siste uke",
			LAST_MONTH: 				"Siste måned",
			ALL_LAN_HOSTS: 				"Alle LAN-verter",
			OTHER: 						"Annet"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Brannmur",
			ENABLE_SPI: 				"SPI-brannmur",

			DOS_PROTECTION: 			"DoS-beskyttelse",
			ENABLE_DOS: 				"DoS-beskyttelse",
			
			OFF: 						"Av",
			LOW: 						"Lav",
			MIDDLE: 					"Middels",
			HIGH: 						"Høy",

			ICMP: 						"ICMP-FLOOD Attack-filtrering",
			UDP: 						"UDP-FLOOD Attack-filtrering",
			TCP: 						"TCP-SYN-FLOOD Attack-filtrering",
			ENABLE_DOS_TIP:             "DoS-beskyttelse og trafikkstatistikk må aktiveres samtidig.",

			IGNORE: 					"Ignorer pingpakke",
			FORBID: 					"Forby pingpakke for LAN-porten",

			BLOCK_DOS: 					"Liste med blokkerte DoS-verter",
			HOST_NUMBER: 				"Vertsnummer",
			IP_ADDRESS: 				"IP-adresse",
			MAC_ADDRESS: 				"MAC-adresse"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Tilgangskontroll",
			ENABLE_ACCESS: 				"Tilgangskontroll",

			ACCESS_MODE: 				"Tilgangspunkt-modus",
			DEFAULT_ACCESS_MODE: 		"Standard tilgangspunkt",
			BLACK_LIST: 				"Inkluder i svarteliste",
			WHITE_LIST: 				"Inkluder i hviteliste",
			
			WIRED:						"Kablet",
			WIRELESS:					"Trådløs",

			DEVICE_ONLINE: 				"Enheter online",
			NAME: 						"Enhetsnavn",
			IP_ADDRESS: 				"IP-adresse",
			MAC_ADDRESS: 				"MAC-adresse",
			CONN_TYPE: 					"Tilkoblingstype",

			BLOCK: 						"Blokker",

			DEVICE_IN_WHITE: 			"Enheter på hviteliste",
			DEVICE_IN_BLACK: 			"Enheter på svarteliste"
		},

		IP_MAC:{
			TITLE: 						"Innstillinger",
			ENABLE_ARP: 				"ARP-binding",

			ARP_LIST: 					"ARP-liste",
			ARP_NUM: 					"ARP-oppføringsnummer",

			MAC_ADDRESS: 				"MAC-adresse",
			IP_ADDRESS: 				"IP-adresse",
			BOUND: 						"Bundet",
			UNBOUND: 					"Ubundet",

			BINDING_LIST: 				"Bindingsliste",
			DESCRIPTION: 				"Beskrivelse",
			OPTIONAL: 					"(valgfritt)",
			ENABLE_THIS_ENTRY: 			"Aktiver"
		},

		TIMESET: {
			TITLE: 						"Tidsinnstillinger",
			ZONE: 						"Tidssone",
			DATE: 						"Dato",
			DATEFORMAT: 				"MM/DD/ÅÅÅÅ",
			TIME: 						"Tid",
			TIMEFORMAT: 				"(TT/MM/SS)",
			NTP1: 						"NTP-server I",
			NTP2: 						"NTP-server II",
			OPTIONAL: 					"(valgfritt)",

			CURRENT_TIME:  				"Gjeldende klokkeslett",
			SET_TIME: 					"Angi klokkeslett",
			AUTOMATIC: 					"Hent automatisk fra Internett",
			MANUAL: 					"Manuelt",
			AUTOMATIC_BTN: 				"Hent",


			GETGMT: 					"Hent GMT",

			
			GETGMT_SUCCESS: 			"Hentet tid fra NTP-server",
			GETGMT_TIMEOUT: 			"Tidsavbrudd forhindret henting av tid fra NTP-server",
			GETGMT_WAIT: 				"Venter",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Sommertid",
			ENABLE_DAYLIGHT: 			"Aktiver sommertid",
			START: 						"Start",
			END: 						"Slutt",

			RUNNING_STATUS: 			"Driftstatus",
			DOWN: 						"Sommertid er nede",
			UP: 						"Sommertid er oppe"
		},

		DIAG:{
			TITLE: 						"Diagnostikk",
			DIAGNOSTIC_TOOL: 			"Diagnostisk verktøy",
			PING: 						"Ping",
			TRACE: 						"Søkerute",

			IPADDR: 					"IP-adresse/domenenavn",
			COUNT: 						"Ping-antall",
			
			BASIC: 						"Grunnleggende",
			ADVANCED: 					"Avansert",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Størrelse på pingpakke",
			PKTUNIT: 					"(4–1472 byte)",

			TIMEOUT: 					"Ping-tidsavbrudd",
			TIMOUTUNIT: 				"(100–2000 millisekunder)",

			TTL: 						"Maks. TTL for søkerute",
			TTLUNIT: 					"(1–30)",
			
			START: 						"Start",
			STOP: 						"Stopp"
		},

		FIRMWARE:{
			TITLE: 						"Fastvareoppgradering",
			FIRMWARE_INFO:  			"Fastvaren din er oppdatert",
			INFO: 						"Enhetsinformasjon",
			REMOTE_TITLE: 				"Tilkoblet oppgradering",
			LOCAL_TITLE: 				"Lokal oppgradering",

			NEWFILE: 					"Ny fastvarefil",
			FIRMWAREVERSION: 			"Fastvareversjon",
			HARDWAREVERSION: 			"Maskinvareversjon",
			LATESTVERSION: 				"Siste versjon",
			CONFIRM_CONTENT:			"Er du sikker på at du vil oppdatere fastvaren?",
			WARNING:					"Fastvare oppdateres … <br/> For å unngå skade, la enheten være påslått og vent uten å utføre noen handlinger under denne prosessen.",
			REBOOTING: 					"Starter på nytt ... <br/> For å unngå skade, la enheten være påslått og vent uten å utføre noen handlinger under denne prosessen.",
			DO_NOT_OPERATE: 			"Oppgraderer... <br/>IKKE kjør under prosessen.",
			FIRMWARE_UPDATING_NOTE: 	"1.Fastvare oppdateres...",
			REBOOTING_NOTE: 			"Starter på nytt …",
			SCREEN_UPDATING_NOTE: 		"3.Skjerm oppdateres …",
			UPGRADE_FAILED: 			"Oppgraderingen feilet.",
			UPGRADE: 					"Oppgrader",
			CHECK: 						"Sjekk",
			DOWNLOADING: 				"Laster ned …",
			UPGRADE_INOF: 				"For å unngå skade, hold ruteren påslått.",
			NOTE: 						"Merk: ",
			NO_UPGRADE: 				"Dette er den nyeste versjonen",

			UPGRADING: 					"Oppgraderer …",
			RETRY: 						"Prøv igjen",
			CANCEL: 					"Avbryt",
			ILEGAL_DEVICE:				"Kan ikke identifisere enheten. Kontakt TP-LINK sin tekniske støtte.",
			UPGRADE_FAIL: 				"Kan ikke oppgradere. Prøv igjen senere.",
			CHECK_UPGRADE:				"Sjekk etter oppgraderinger"
		},

		BACKUP:{
			BACKUP: 					"Sikkerhetskopier",
			BACKUPTIP: 					"Lagre en kopi av gjeldende innstillinger.",

			RESTORE: 					"Gjenopprett",
			RESTORETIP: 				"Gjenopprette lagrede innstillinger fra en fil.",
			
			RESTORE_WARN:				"Gjenoppretter ruter... <br/>Ikke bruk enheten under denne prosessen.",
			RESTORE_CONFIRM_CONTENT: 	"Er du sikker på at du vil gjenopprette ruteren fra sikkerhetskopien?",
			
			FILE: 						"Fil",

			FACTORY: 					"Tilbakestille enheten til fabrikkstandard",
			FACTORYTIP: 				"Tilbakestille alle konfigurasjonsinnstillingene til standardverdiene.",
			FACTORY_CONFIRM_CONTENT:	"Er du sikker på at du vil tilbakestille ruteren til fabrikkstandard?",
			FACTORY_WARN:				"Gjenoppretter ruter... <br/>Ikke bruk enheten under denne prosessen.",
			
			BACKUPBTN: 					"Sikkerhetskopier",
			RESTOREBTN: 				"Gjenopprett",
			FACTORYBTN: 				"Tilbakestille enheten til fabrikkstandard"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Kontobehandling",
			
			OLDUSER: 					"Gammelt brukernavn",
			OLDPWD: 					"Gammelt passord",

			NEWUSER: 					"Nytt brukernavn",
			NEWPWD: 					"Nytt passord",
			CONFIRM: 					"Bekreft nytt passord",

			RECOVERYINFO: 				"Gjenoppretting av passord",
			ENABLE_PASSWORD_RECOVERY: 	"Aktiver gjenoppretting av passord",
			FROM: 						"Fra",
			TO: 						"Til",
			SMTP_SERVER: 				"SMTP-server",
			
			ENABLE_AUTHENTICATION: 		"Aktiver godkjenning",
			USERNAME: 					"Brukernavn",
			PASSWORD: 					"Passord",

			TEST_MAIL: 					"Test-e-post",

			LOCAL:						"Lokal behandling",
			LOCAL_MAC_AUTH: 			"Lokal MAC-godkjenning",
			ACCESS: 					"Tilgang for alle LAN-tilkoblede enheter",
			ACCESS_TIPS: 				"Skru på for å aktivere behandling for alle enhetene på LAN eller la stå av for å aktivere behandling for en bestemt enhet.",
			
			MAC_ADDRESS: 				"MAC-adresse",
			VIEW_BTN: 					"Vis eksisterende enheter",
			DESCRIPTION: 				"Beskrivelse",

			EXIST_DEVICE:               "Eksisterende enheter",

			OPTIONAL: 					"(valgfritt)",
			ENABLE_THIS_ENTRY: 			"Aktiver",

			DEVICE_NAME:				"Enhetsnavn",
			IP_ADDRESS:					"IP-adresse",
			

			REMOTE: 					"Ekstern behandling",
			DISABLE_REMOTE_MANAGEMENR: 	"Deaktiver ekstern behandling",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Aktiver ekstern behandling for alle enheter",
			ENABLE_REMOTE_MANAGEMENR: 	"Aktiver ekstern behandling for spesifiserte enheter",
			WEB: 						"Webbehandlingport",

			NOTICE:						"I konflikt med virtuell server-port! Er du sikker på at du vil fortsette?",
			NOTICE_ENTER_ANOTHER:		"I konflikt med virtuell serverport. Angi en annen port.",

			REMOTEIP: 					"IP-adresse for ekstern behandling",
			REMOTEIPNOTE: 				"(Skriv inn 255.255.255.255 for alle)"
			
		},

		SYSLOG:{
			TITLE: 						"Systemlogg",
			LOG_FILTER: 				"Loggfilter:",
			
			TYPE_EQ: 					"Type=",
			
			ALL: 						"ALLE",

			FIREWALL: 					"Brannmur", 
			NAT: 						"NAT",
			DDNS: 						"Dynamisk DNS",
			UPNP:						"UPnP",
			IMB:            			"IP&MAC-binding",
			IPTV:						"IPTV",
			DHCPS:						"DHCP-server",
			IGMP_PROXY:					"IGMP-proxy",
			DOMAIN_LOGIN:				"Innlogging til domene",
			BASIC_SECURITY: 			"Grunnleggende sikkerhet",
			PARENTAL_CONTROL: 			"Sperrefunksjon",
			ACCESS_CONTROL: 			"Tilgangskontroll",
			DOS_PROTECTION: 			"DoS-beskyttelse",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Traffikkstatistikk",
			TIME_SETTINGS: 				"Tidsinnstillinger",
			ACCOUNT_MANAGEMENT: 		"Kontobehandling",
			LOCAL_MANAGEMENT: 			"Lokal behandling",
			REMOTE_MANAGEMENT: 			"Ekstern behandling",
			LOCALE: 					"Lokal",
			FACTORY_RESET: 				"Tilbakestille til fabrikkinnstillinger",
			LED_CONTROLLER: 			"Led Controller",
			NETWORK: 					"Nettverk",
			USBSHARE: 					"USB-deling",
			AND: 						"og",
			LEVEL: 						"Nivå",
			EMERGENCY:					"NØDSITUASJON",
			ALERT:						"VARSEL",
			CRITICAL:					"KRITISK",
			ERROR: 						"FEIL",
			WARNING: 					"ADVARSEL",
			NOTICE: 					"MERKNAD",
			INFO: 						"INFO",
			DEBUG: 						"FEILSØK",

			INDEX: 						"Indeks",
			TYPE: 						"Type",
			TIME: 						"Tid",
			LEVEL_COL:					"Nivå",

			CONTENT: 					"Logginnhold",
			
			MAIL_LOG: 					"E-postlogg",
			SAVE_LOG: 					"Lagre logg",

			SEND_OK: 					"Send OK",
			SEND_FAILED: 				"Sending mislyktes",

			MAIL_SETTING: 				"E-postinnstillinger",

 			FROM: 						"Fra",
 			TO: 						"Til",
 			SMTP_SERVER: 				"SMTP-server",
 			ENABLE_AUTHENTICATION: 		"Aktiver godkjenning",

 			USERNAME: 					"Brukernavn",
 			PASSWORD: 					"Passord",
 			CONFIRM_PASSWORD: 			"Bekreft passord",

 			AUTO_MAIL: 					"Aktiver automatisk e-post",
 			LOG_AT: 					"Logg kl. ",
 			HH_MM: 						"(TT:MM) hver dag",

 			LOG_EVERY: 					"Logg hver",
 			HOURS: 						"timer"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Innstillinger",
			STATUS: 					"Aktiver QoS",
			UPBANDWIDTH: 				"Last opp båndbredde",
			DOWNBANDWIDTH: 				"Last ned båndbredde",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Hastighetstest",
			RULE_LIST: 					"QoS regelliste",
			RULE: 						"QoS-regel",
			ID: 						"ID",
			NAME: 						"Navn",
			TYPE: 						"Type",
			DETAIL: 					"Detaljer",
			PRIORITY: 					"Prioritet",

			APPLICATION: 				"Program",
			APPLICATION_LIST: 			"Programliste",
			CUSTOM_APP: 				"Egendefinert program",
			MAC_ADDR: 					"MAC-adresse",
			MAC_ADDR_P: 				"Mac:",
			IP_ADDR: 					"IP-adresse",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Fysisk port",

			LOW: 						"Lav",
			MIDDLE: 					"Middels",
			HIGH: 						"Høy",

			PROTO: 						"Protokoll",
			PORT: 						"Port",
			PROTO_P: 					"Protokoll:",
			PORT_P: 					"Port:",
			PORT_TIPS: 					"(XX eller XX-XX,1-65535,med maks. fem par)",

			ALL: 						"ALLE",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Tilpasset",

			WIFI_HOME: 					"WIFI-VERT",
			WIFI_GUEST: 				"WIFI-GJEST",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Databaseoppgradering",

			NEWFILE: 					"Ny databasefil",
			FIRMWAREVERSION: 			"Databaseversjon",
			CONFIRM_CONTENT:			"Er du sikker på at du vil oppdatere databasen?",
			WARNING:					"Oppdaterer database... <br/>Ikke bruk enheten under denne prosessen.",
			
			UPGRADE: 					"Oppgrader",

			SERVICE_RESTART: 			"QoS-tjenesten omstarter",
			
			TYPE: 						"Type",
			BY_DEVICE: 					"Etter enhet",
			BY_APP: 					"Etter program",
			BY_PHY: 					"Etter fysisk port",

			HIGH_PRIORITY_LBL: 			"Høy prioritet:",
			MIDDLE_PRIORITY_LBL: 		"Middels prioritet:",
			LOW_PRIORITY_LBL: 			"Lav prioritet:",

			HIGH_PRIORITY: 				"Høy prioritet",
			MIDDLE_PRIORITY: 			"Middels prioritet",
			LOW_PRIORITY: 				"Lav prioritet"

		},

		APPLICATION:{
			APP_LIST: 					"Programliste",
			GAME_LIST: 					"Spill-liste",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Trafikkstatistikk",
			ENABLE_STATISTICS: 			"Trafikkstatistikk",

			TITLE: 						"Liste over trafikkstatistikk",
			IP_MAC: 					"IP-addresse/MAC-addresse",
			TPKT: 						"Totalt antall pakker",
			TBYTE: 						"Totalt antall bytes",
			CPKT: 						"Gjeldende pakker",
			CBYTE: 						"Gjeldende bytes",
			CICMP: 						"Gjeldende ICMP Tx",
			CUDP: 						"Gjeldende UDP Tx",
			CSYN: 						"Gjeldende SYN Tx",
			
			DELETE_CONFIRM: 			"Er du sikker på at du vil slette alle disse trafikkstatistikkene?",
			DELETE_ALL_CONFIRM: 		"Er du sikker på at du vil slette alle disse trafikkstatistikkene?",

			RESET_ALL: 					"Tilbakestill alle"
		},

		SYSPARA:{
			W24G: 						"Trådløst 2,4 GHz",
			W5G: 						"Trådløst 5 GHz",
			W60G: 						"60GHz Trådløst nettverk",
			W24G_WDS: 					"2,4 GHz WDS",
			W5G_WDS: 					"5 GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"Trådløsfunksjonen er skrudd av. Hvis du vil bruke denne funksjonen, kan du skru på Wi-Fi-knappen.",

			ENABLE_TIPS: 				"Trådløsfunksjonen er deaktivert.",

			BEACON: 					"Signalintervall",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS-terskel",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Fragmenteringsterskel",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM-intervall",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Oppdateringsperiode for gruppenøkkel",
			GROUPUNIT: 					"sekunder",
			
			MU_MIMO_FEATURE: 			"Flerbruker-MIMO",
			MU_MIMO: 					"Aktiver MU-MIMO",
			
			WMM_FEATURE: 				"WMM-funksjon",
			WMM: 						"Aktiver WMM",

			GI_FEATURE: 				"Kort GI-funksjon",
			GI: 						"Aktiver kort GI",

			AP_FEATURE: 				"AP-isolasjonsfunksjon",
			AP: 						"Aktiver AP-isolasjon",

			WDS_FEATURE: 				"WDS-overføring",
			WDS: 						"Aktiver WDS-overføring",
			
			SSID_BRIDEGE: 				"SSID (til overføring)",
			SURVEY: 					"Spørreundersøkelse",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC-adresse",
			SSID: 						"SSID",
			SIGNAL: 					"Signal",
			CHANNEL: 					"Kanal",
			SECURITY: 					"Sikkerhet",
			CHOSEN: 					"Valgt",
			AP_NUMBER:					"AP-nummer",

			TOTAL: 						"Totalt antall elementer",

			MAC: 						"MAC-adresse (til overføring)",
			MACUNIT: 					"Eksempel: 00-1D-0F-11-22-33",

			SECURITY: 					"Sikkerhet",
			NO: 						"Nei",
			NONE: 						"Ingen sikkerhet",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Passord",
			
			AUTH_TYPE: 					"Forf. Type",
			AUTO: 						"Auto",
			OPEN: 						"Åpne system",
			SHARED: 					"Delt nøkkel",

			WEP_INDEX: 					"WEP-indeks",
			KEY1: 						"Nøkkel1",
			KEY2: 						"Nøkkel2",
			KEY3: 						"Nøkkel3",
			KEY4: 						"Nøkkel4",

			WEP_KEY_FORMAT: 			"WEP-nøkkel-format",
			ASC: 						"ASCII",
			HEX: 						"Heksadesimal",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Aktiver WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Aktiver NAT",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Aktiver NAT Boost",
			
			MEDIA_SERVER: 				"Medieserver",
			SCAN_INTERVAL: 				"Intervall for automatisk skanning (timer)",
			SCAN_UNIT: 					"(2–48)",

			DOS_PROTECTION: 			"Nivåinnstillinger for DoS-beskyttelse",

			ICMP: 						"Nivå for ICMP-FLOOD-pakker",
			UDP: 						"Nivå for UPD-FLOOD-pakker",
			TCP: 						"Nivå for TCP-FLOOD-pakker",

			WDS_MODE: 					"WDS-modus",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Lav",
			MIDDLE: 					"Middels",
			HIGH: 						"Høy",

			TO: 						"til",
			NOTICE_NAT_REBOOT: 			"Omstarter ... <br/>Ikke bruk ruteren mens den omstarter.",

			NOTICE_NAT_BOOST: 			"Ved endring av NAT Boost vil denne enheten omstarte. Er du sikker på at du vil fortsette?",
			NOTICE:						"Ruterens kanal er ikke det samme som overført AP-kanal. Vil du endre det?",

			UNIT: 						"(5–7200)Pakker/sek.",
			LED: 						"LED",
			NIGHT_MODE: 				"Nattmodus",
			PERIOD_NIGHT_TIME: 			"Periode for nattmodus",
			ENABLE: 					"Aktiver nattmodus",
			HH_MM: 						"(TT:MM)",
			TO: 						"til",
			NIGHT_MODE_NOTE:            "LED-en din er avslått. Hvis du vil bruke denne funksjonen, trykk på LED-knappen eller klikk på LED oppe i høyre hjørne på siden.",
			NOTE2:                      "Nattmodusperioden tar effekt basert på ruterens systemtid. Forsikre deg om at du allerede har angitt tiden på ruteren."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Ingen sertifikat for øyeblikket, <b>generer</b> et før du aktiverer en VPN-server.",
			NO_CERT_NOTE2: 				"Ingen sertifikat for øyeblikket, <b>generer</b> et før du eksporterer konfigurasjonen.",
			ENABLE_VPN_SERVER: 			"Aktiver DHCP-server",
			SERVICE_TYPE: 				"Tjenestetype",
			SERVICE_PORT: 				"Tjenesteport",
			VPN_SUBNET: 				"VPN Delnett/Nettmaske",
			CLIENTS_ACCESS: 			"Klienttilgang",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Kun hjemmenettverk",
			INTERNET_HOME: 				"Internett og hjemmenettverk",
			CERT_STR: 					"Ingen sertifikat for øyeblikket, klikk OK for å generere en og lagre konfigurasjonen din.",
			CERT_STR2: 					"Ingen sertifikat for øyeblikket, klikk OK for å generere en og eksportere konfigurasjonen din.",
			CONF_FILE: 					"Konfigurasjonsfil", 
			EXPORT_CONF_FILE: 			"Eksporter konfigurasjonen.",
			EXPORT: 					"Eksporter",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"IP-adresse for klient",
			ACCOUNT_USERNAME: 			"Brukernavn",
			ACCOUNT_PASSWORD: 			"Passord",
			CLIENT_IP_NOTE: 			"(opptil 10 klienter)",
			SAME_SUBNET_NOTE: 			"Kundens IP-adresse og LAN IP-adresse kan ikke være i samme delnett. <br/>Angi en annen verdi.",
			CONFLICT_WITH_DHCP: 		"Kundens IP-adresse er i konflikt med puljen til DHCP IP-adressen. <br/>Angi på nytt.",
			CONFLICT_WITH_RESERVED: 	"Kundens IP-adresse er i konflikt med den reserverte IP-adressen. <br/>Angi på nytt.",
			CONFLICT_WITH_OPENVPN: 		"Kundens IP-adresse og OpenVPN-IP-adresse kan ikke være i samme delnett. <br/>Angi på nytt.",
			SAME_SUBNET_NOTE2: 			"VPN-delnettet/nettmasken og LAN IP-adressen kan ikke være i samme delnett. <br/>Angi en annen verdi.",
			CONFLICT_WITH_DHCP2: 		"VPN-delnettet/nettmasken er i konflikt med puljen til DHCP IP-adressen. <br/>Angi på nytt.",
			CONFLICT_WITH_RESERVED2: 	"VPN-delnettet/nettmasken er i konflikt med den reserverte IP-adressen. <br/>Angi på nytt.",
			CONFLICT_WITH_PPTPVPN: 		"VPN delnettet/nettmasken og PPTP VPN-IP-adressen kan ikke være i samme delnett. <br/>Angi på nytt.",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN-IP-adressen og OpenVPN-IP-adressen kan ikke være i samme delnett. <br/>Angi på nytt.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN IP-adressen og PPTP VPN-IP-adressen kan ikke være i samme delnett. <br/>Angi på nytt.",
			VPN_MASK_ERROR: 			"Nettmasken kan ikke være større enn 255.255.255.248. <br/>Angi på nytt.",
			ACCOUNT_LIST: 				"Kontoliste (opptil 16 brukere)",
			ADVANCED_SETTING: 			"Avansert",
			ALLOW_SAMBA: 				"Tillatt Samba (Nettverksplass) tilgang",
			ALLOW_NETBIOS: 				"Tillatt NetBIOS-gjennomgang",
			ALLOW_UNENCRYPTED_CONN: 	"Tillatt ukrypterte tilkoblinger",
			USERNAME_CONFLICT: 			"Dette brukernavnet eksisterer allerede. Angi et annet element.",
				
			NOTICE_VS_CONFLICT:			"I konflikt med den virtuelle serverens eksterne port. Angi en annen port.",
			NOTICE_PT_CONFLICT:			"I konflikt med portutløserens eksterne port. Angi en annen port.",
			NOTICE_VS_MODIFY:			"I konflikt med den virtuelle serverens eksterne port(1723). Vennligst gå til <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">«Virtuell server»</a>-siden og endre den virtuelle serverens eksterne port.",
			NOTICE_PT_MODIFY:			"I konflikt med portutløserens eksterne port(1723). Vennligst gå til <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">«Portutløser»</a>-siden og endre portutløserens eksterne port.",
			
			GENERATE_CERT: 				"Sertifikat",
			GENERATE_NEW_CERT: 			"Generer sertifikatet.",
			GENERATE: 					"Generer",
			GENERATE_TIPS: 				"Sertifikat genereres …<br/>Dette vil ta noen minutter, vennligst vent.",
			CERT_SUCCESS: 				"Vellykket",
			CERT_FAIL: 					"Mislykket, prøv igjen.",
			
			VPN_CONNECTIONS: 			"VPN-tilkoblinger",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN-tilkobling",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN-tilkobling",
			USER: 						"Bruker",
			REMOTE_IP: 					"Ekstern IP",
			ASSIGNED_IP: 				"Tilordnet IP"
		}
	};
})(jQuery);
