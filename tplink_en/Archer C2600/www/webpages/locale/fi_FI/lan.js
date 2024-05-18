(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			FORGET_PASSWORD: 			"Unohditko salasanan?",
			LOGIN: 						"Kirjaudu",
			IMPORTANT_UPDATE_INFO: 		"Jotta vältytään ristiriidalta laitteen kanssa, reitittimen IP-osoitteeksi on vaihdettu",
			CONTINUE: 					"Jatka",

			IMPORTANT_NOTICE: 			"Tärkeä huomautus",
			OR: 						", haluatko varmasti siirtyä",
			END: 						".",
			END2: 						"?",

			FORGET_PASSWORD_INFO_0: 	"Paina Reset-painiketta 10 sekuntia palauttaaksesi reitittimen tehdasasetuksiin.",
			FORGET_PASSWORD_INFO_1: 	"Jos Salasanan palautus -ominaisuus on käytössä. Ilmoitettuun sähköpostiosoitteeseen lähetetään tarkistuskoodi, jolla voidaan nollata käyttäjätunnus ja salasana.",
			FORGET_PASSWORD_SEND_FAILED:"Koodin lähetys ei onnistunut! Tarkista internet-yhteys.",

			VERIFICATION_CODE: 			"Tarkistuskoodi",

			RECEIVE_CODE: 				"Lähetä koodi",

			CONFIRM: 					"Vahvista",

			SEC: 						"s",

			USER_CONFLICT: 				"Kirjautumisristiriita!",
			FIRST_TIME: 				"Tervetuloa TP-LINKin Kiinassa suunnitteleman Archer AD7200 -laitteen käyttäjäksi. Luo aluksi laitteelle sen hallinnointisalasana.",
			
			USER_CONFLICT_INFO: 		"Käyttäjä %USER% käyttäen isäntälaitetta %HOST% (%IP%/%MAC%) on kirjautunut reitittimeen. Et voi kirjautua samanaikaisesti. Yritä uudelleen myöhemmin.",
			USER_CONFLICT_INFO_1: 		"Käyttäjä %USER% (%MAC%) on tällä hetkellä kirjautunut reitittimeen. Et voi kirjautua samanaikaisesti. Yritä uudelleen myöhemmin.",
			USER_CONFLICT_INFO_2: 		"Käyttäjä %USER% (%IP%) on kirjautunut reitittimeen. Et voi kirjautua samanaikaisesti. Yritä uudelleen myöhemmin.",
			
			LOGIN_FAILED: 				"Kirjautumisvirhe!",
			LOGIN_FAILED_COUNT: 		"Kirjautuminen epäonnistui %num1 kertaa, ja sinulla on %num2 yritystä jäljelä.",
			NO_COOKIE: 					"Kirjautuminen edellyttää, että evästeet ovat käytössä. Ota evästeet käyttöön tai poista yksityinen/Incognito-selaustila käytöstä.", 

			FORGET_PASSWORD_NOTE: 		"Jos et ole määrittänyt Salasanan palautus -ominaisuutta. Voit painaa Reset-painiketta 10 sekuntia palauttaaksesi reitittimen tehdasasetuksiin."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Päivitä nyt",
			REMIND: 						"Muistuta myöhemmin",
			NOTICE:    						"Hei, %PRODUCT% -reitittimelle on saatavilla uusi laiteohjelmisto.",
			NEVER: 							"Ohita tämä versio"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN-yhteysvirhe!",
			STATUS: 						"Tila",
			INFO: 							"Tiedot",
			SETUP: 							"Määritä Internet-yhteys",
			NEVER: 							"Älä muistuta uudelleen"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Laiteohjelmistoversio:",
			HARDWARE_VERSION: 				"Laitteistoversio:",
			HELP_SUPPORT: 					"Tuki",
			FAQ: 							"FAQ",
			CONFIRM_REBOOT: 				"Haluatko varmasti käynnistää reitittimen uudelleen?",
			CONFIRM_LOGOUT: 				"Haluatko varmasti kirjautua ulos?",
			UPGRADE_ALERT_1: 				"Nykyinen laiteohjelmisto ei tue TP-LINKin pilvipalvelua. Suosittelemme, että lataat uusimman laiteohjelmiston osoitteesta www.tp-link.com ja päivität sen.",
			UPGRADE_ALERT_2: 				"Nykyinen laiteohjelmisto ei tue TP-LINKin pilvipalvelua. Suosittelemme, että päivität laiteohjelmiston napsauttamalla oikean ylänurkan päivityskuvaketta.",
			REBOOTING: 						"Käynnistyy uudelleen... <br/>Älä käytä uudelleenkäynnistyksen aikana.",

			MODE_SWITCH: 					"Tilakytkin",
			ACCESS_POINT: 					"Tukiasema",
			ACCESS_POINT_TIPS: 				"Langallisen verkon muuntaminen langattomaksi.",
			ROUTER: 						"Reititin",
			ROUTER_TIPS: 					"Useiden laitteiden salliminen yhdistää langallisesti tai langattomasti.",
			REPEATER: 						"Toistin",
			REPEATER_TIPS: 					"Laajentaa langattoman verkon signaalialuetta.",
			MODE_REBOOT_TIP: 				"Tilan muuttaminen saa laitteen käynnistymään uudelleen. Haluatko varmasti jatkaa?",
			MODE_FAIL_TIP: 					"Tilakytkinvirhe. Yritä uudelleen tai käynnistä reititin uudelleen."
		},

		NAV: {
			QUICK_SETUP: 				"Pika-asennus",
			BASIC: 						"Perusasetukset",
			ADVANCED: 					"Lisäasetukset"
		},

		CONTROL: {
			MODE: 						"Tila",
			LOGIN: 						"Kirjaudu",
			LED:                        "Merkkivalo",
			LED_ON:                     "Merkkivalo palaa",
			LED_OFF:                    "Merkkivalo on sammuksissa",			
			LED_DISABLED:               "Merkkivalon tilaa ei voi muuttaa yötilassa",			
			LOGOUT: 					"Kirjaudu ulos",
			UPDATE: 					"Päivitä",
			REBOOT: 					"Käynnistä uudelleen"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algeria",
			AMERICAN_SAMOA: 			"Amerikan Samoa",
			ARGENTINA: 					"Argentiina",
			ARMENIA: 					"Armenia",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australia",
			AUSTRIA: 					"Itävalta",
			AZERBAIJAN: 				"Azerbaidžan",
			BAHAMAS: 					"Bahama",
			BAHRAIN: 					"Bahrain",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Valko-Venäjä",
			BELGIUM: 					"Belgia",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnia ja Hertsegovina",
			BRAZIL: 					"Brasilia",
			BRUNEI_DARUSSALAM: 			"Brunei",
			BULGARIA: 					"Bulgaria",
			CAMBODIA: 					"Kambodža",
			CANADA: 					"Kanada",
			CAYMAN_ISLANDS: 			"Caymansaaret",
			CHILE: 						"Chile",
			CHINA: 						"Kiina (Kansantasavalta)",
			COLOMBIA: 					"Kolumbia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Kroatia",
			CYPRUS: 					"Kypros",
			CZECH_REPUBLIC: 			"Tšekin tasavalta",
			DENMARK: 					"Tanska",
			DOMINICAN_REPUBLIC: 		"Dominikaaninen tasavalta",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egypti",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Viro",
			ETHIOPIA: 					"Etiopia",
			FAEROE_ISLANDS: 			"Färsaaret",
			FINLAND: 					"Suomi",
			FRANCE: 					"Ranska",
			FRENCH_GUIANA: 				"Ranskan Guayana",
			FRENCH_POLYNESIA: 			"Ranskan Polynesia",
			GEORGIA: 					"Georgia",
			GERMANY: 					"Saksa",
			GREECE: 					"Kreikka",
			GREENLAND: 					"Grönlanti",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hongkongin erityishallintoalue, Kiinan kansantasavalta",
			HUNGARY: 					"Unkari",
			ICELAND: 					"Islanti",
			INDIA: 						"Intia",
			INDONESIA: 					"Indonesia",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irlanti",
			ISRAEL: 					"Israel",
			ITALY: 						"Italia",
			JAMAICA: 					"Jamaika",

			JAPAN: 						"Japani",
			JAPAN_1: 					"Japani 1",
			JAPAN_2: 					"Japani 2",
			JAPAN_3: 					"Japani 3",
			JAPAN_4: 					"Japani 4",
			JAPAN_5: 					"Japani 5",
			JAPAN_6: 					"Japani 6",

			JORDAN: 					"Jordania",
			KAZAKHSTAN: 				"Kazakstan",
			KENYA: 						"Kenia",

			NORTH_KOREA: 				"Pohjois-Korea",
			KOREA_REPUBLIC: 			"Korean tasavalta",
			KOREA_REPUBLIC_3: 			"Korean tasavalta 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Latvia",
			LEBANON: 					"Libanon",
			LIBYA: 						"Libya",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Liettua",
			LUXEMBOURG: 				"Luxemburg",
			MACAU: 						"Macaon erikoishallintoalue",
			MACEDONIA: 					"Makedonia (entinen Jugoslavian tasavalta)",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malesia",
			MALDIVES: 					"Malediivit",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Meksiko",
			MONACO: 					"Monacon ruhtinaskunta",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Marokko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Alankomaat",
			NETHERLANDS_ANTILLES: 		"Alankomaiden Antillit",
			
			NEW_ZEALAND: 				"Uusi-Seelanti",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norja",
			NORTHERN_MARIANA_ISLANDS: 	"Pohjois-Mariaanit",
			OMAN: 						"Oman",
			PAKISTAN: 					"Pakistanin islamilainen tasavalta",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua-Uusi-Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Peru",
			PHILIPPINES: 				"Filippiinien tasavalta",
			POLAND: 					"Puola",
			PORTUGAL: 					"Portugali",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Réunion",
			ROMANIA: 					"Romania",
			RUSSIA: 					"Venäjä",
			RWANDA: 					"Ruanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Saudi-Arabia",
			SINGAPORE: 					"Singapore",
			SLOVAK_REPUBLIC: 			"Slovakian tasavalta",
			SLOVENIA: 					"Slovenia",
			SOUTH_AFRICA: 				"Etelä-Afrikka",
			SPAIN: 						"Espanja",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Ruotsi",
			SWITZERLAND: 				"Sveitsi",
			SYRIA: 						"Syyria",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tansania",
			THAILAND: 					"Thaimaa",
			TRINIDAD_TOBAGO: 			"Trinidad ja Tobago",
			TUNISIA: 					"Tunisia",
			TURKEY: 					"Turkki",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraina",
			UNITED_ARAB_EMIRATES: 		"Arabiemiirikunnat",
			UNITED_KINGDOM: 			"Iso-Britannia",
			UNITED_STATES: 				"Yhdysvallat",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Uzbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Yhdysvaltain Neitsytsaaret",
			YEMEN: 						"Jemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Enewetak, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway Island, Samoa",
			HAWAII: 					"(GMT-10:00) Havaiji",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Tyynenmeren normaaliaika",
			MOUNTAIN_TIME: 				"(GMT-07:00) Kalliovuorten aikavyöhyke (USA ja Kanada)",
			CENTRAL_TIME: 				"(GMT-06:00) Keskiaikavyöhyke (USA ja Kanada)",
			EASTERN_TIME: 				"(GMT-05:00) Itäinen aikavyöhyke (USA ja Kanada)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Atlantin aikavyöhyke (Kanada)",
			NEWFOUNDLAND: 				"(GMT-03:30) Newfoundland",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Keski-Atlantin aikavyöhyke",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azorit, Kap Verde",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwichin normaaliaika, Dublin, Lontoo",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berliini, Tukholma, Rooma, Bern, Bryssel",
			ATHENS_HELSINKI: 			"(GMT+02:00) Ateena, Helsinki, Itä-Eurooppa, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Bagdad, Kuwait, Nairobi, Riyadh, Moskova",

			TEHERAN: 					"(GMT+03:30) Teheran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Kalkutta, Mumbai, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Peking, Hongkong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokio, Osaka, Sapporo, Soul, Jakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solamon, Uusi-Kaledonia",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fidji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Käyttö",
			GAME:						"PELI",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"Linja",
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
			DAY: 						"Päivä",

			MONDAY: 					"Maanantai",
			TUESDAY: 					"Tiistai",
			WEDNESDAY: 					"Keskiviikko",
			THURSDAY: 					"Torstai",
			FRIDAY: 					"Perjantai",
			SATURDAY: 					"Lauantai",
			SUNDAY: 					"Sunnuntai",
			
			MON: 						"Ma",
			TUES: 						"Ti",
			WED: 						"Ke",
			THUR: 						"To",
			FRI: 						"Pe",
			SAT: 						"La",
			SUN: 						"Su",

			JAN: 						"Tammi",
			FEB: 						"Helmi",
			MAR: 						"Maalis",
			APR: 						"Huhti",
			MAY: 						"Touko",
			JUN: 						"Kesä",
			JUL: 						"Heinä",
			AUG: 						"Elo",
			SEP: 						"Syys",
			OCT: 						"Loka",
			NOV: 						"Marras",
			DEC: 						"Joulu"

		},

		HOUR: {
			AM_1: 						"klo 1",
			AM_2: 						"klo 2",
			AM_3: 						"klo 3",
			AM_4: 						"klo 4",
			AM_5: 						"klo 5",
			AM_6: 						"klo 6",
			AM_7: 						"klo 7",
			AM_8: 						"klo 8",
			AM_9: 						"klo 9",
			AM_10: 						"klo 10",
			AM_11: 						"klo 11",
			AM_12: 						"klo 12",
			PM_1: 						"klo 13",
			PM_2: 						"klo 14",
			PM_3: 						"klo 15",
			PM_4: 						"klo 16",
			PM_5: 						"klo 17",
			PM_6: 						"klo 18",
			PM_7: 						"klo 19",
			PM_8: 						"klo 20",
			PM_9: 						"klo 21",
			PM_10: 						"klo 22",
			PM_11: 						"klo 23",
			PM_12: 						"klo 24"
		},

		ORDER: {
			"1ST": 						"Ensimmäinen",
			"2ND": 						"2",
			"3RD": 						"3",
			"4TH": 						"4",
			"5TH": 						"Viimeinen",
			"1ST_": 					"1",

			TH: 						". "
		},

		GRID: {
			CLIENT_NUMBER: 				"Asiakaslaitenumero",

			ID: 						"Tunnus",
			MODIFY: 					"Muokkaa",
			STATUS: 					"Tila",
			ENABLE: 					"Ota käyttöön",

			OPERATION: 					"Käyttö",
			CHOOSE: 					"Valitse",
			DESCRIPTION: 				"Kuvaus",
			

			AUTO_REFRESH: 				"Automaattipäivitys",
			REFRESH: 					"Päivitä",
			NUMBER: 					"Numero",
			ENABLED: 					"Käytössä",
			DISABLED: 					"Poissa käytöstä",
			ACTIVE: 					"Käytössä",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Lisää",
			CHOOSE: 					"Valitse",
			EDIT: 						"Muokkaa",
			DELETE: 					"Poista",
			DELETE_ALL: 				"Poista kaikki",
			REMOVE: 					"Poista",
			RESET: 						"Nollaa",
			RESET_ALL: 					"Palauta kaikki",
			DETECT: 					"Tunnista",
			ENABLE: 					"Ota käyttöön",
			DISABLE: 					"Poista käytöstä",
			PAUSE:						"Tauko",
			RESUME:						"Jatka",
			
			REFRESH: 					"Päivitä",
			SEARCH: 					"Etsi...",
			BROWSE: 					"Selaa",

			SAVE: 						"Tallenna",
			BACK: 						"Takaisin",

			PREV: 						"Edellinen",
			NEXT: 						"Seuraava",
			FINISH: 					"Valmis",
			
			ON: 						"Päällä",
			OFF: 						"Sammuksissa",
			LOW: 						"Matala",
			MIDDLE: 					"Keskiosa",
			HIGH: 						"Korkea",
			
			OK: 						"OK",
			CANCEL: 					"Peruuta",

			YES: 						"Kyllä",
			NO: 						"Ei",
			
			CONNECTED: 					"Yhdistetty",
			CONNECTING: 				"Yhdistetään",
			DISCONNECTING: 				"Yhteyttä katkaistaan",
			DISCONNECTED: 				"Ei kytketty",

			PASSWORD_HINT: 				"Salasana",
			FILEBUTTONTEXT: 			"Selaa",
			FILEBLANKTEXT: 				"Valitse tiedosto.",
			NOSELECTEDTEXT: 			"Valitse asetukset.",

			ADD_A_NEW_KEYWORD: 			"Lisää uusi avainsana",

			SUCCESSED: 					"Onnistui!",
			FORM_SAVED: 				"Tallennettu",
			FORM_FAILED: 				"Epäonnistui",
			GRID_ID_COLUMN: 			"Tunnus",
			GRID_SAVED: 				"Tallennettu",
			GRID_FAILED: 				"Epäonnistui",
			GRID_NONE_SELECT: 			"Valitse vähintään yksi syöte.",
			GRID_DELETE_COMFIRM: 		"Haluatko varmasti poistaa nämä syötteet?",
			GRID_DELETE_ALL_COMFIRM: 	"Haluatko varmasti poistaa kaikki syötteet?",
			GRID_MAX_RULES: 			"Suurin syötteiden määrä ylitetty.",
			KEYWORD_MAX_OVERFLOW: 		"Avainsanojen määrä ylittää raja-arvon.",

			NOTE: 						"Huomautus:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Virheellinen muoto.",
			BLANKTEXT: 					"Tämä kenttä on pakollinen.",

			EMAIL: 						"Sähköpostiosoite ei kelpaa.",
			NUMBER: 					"Virheellinen muoto.",

			NUMBER_MIN: 				"Virheellinen arvo, anna arvo, joka on suurempi kuin %min.",
			NUMBER_MAX: 				"Virheellinen arvo, anna arvo, joka on pienempi kuin %max.",

			NUMBER_MIN_MAX: 			"Virheellinen arvo, anna arvo, joka on välillä %min - %max.",
			HEX: 						"Tämän kentän tulisi olla heksadesimaalinen luku.",

			IP: 						"Virheellinen muoto.",

			IP_NO_ALL_ZERO:				"Osoite ei saa olla 0.0.0.0.",
			IP_NO_LOOP:					"Osoite ei saa olla silmukkaosoite.",
			IP_NO_D_TYPE:				"Osoite ei saa olla luokan D IP.",
			IP_NO_E_TYPE:				"Osoite ei saa olla luokan E IP.",
			IP_NO_ALL_ONE:				"Osoite ei saa olla 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"Osoite ei saa alkaa luvulla 255.",
			IP_NO_FIRST_ZERO:			"Osoite ei saa alkaa luvulla 0.",
			MASK_NO_ALL_ONE:			"Peite ei saa olla 255.255.255.255.",

			IPV6: 						"Virheellinen muoto.",
			IPV6_NOT_GLOBAL:			"Virheellinen muoto.",
			IPV6_NOT_PREFIX:			"Virheellinen muoto.",
			IP_DOMAIN: 					"Virheellinen muoto.",
			IPV6_DOMAIN: 				"Virheellinen muoto.",
			PPTP_INVALID_IP:			"Virheellinen IP-osoite.",
			MAC: 						"Virheellinen muoto.",
			MULTI_MAC:					"Virheellinen muoto.",
			MAC_INVALID_BROADCAST:		"MAC:in ei tule olla lähetysosoite.",
			MAC_INVALID_MULTICAST:		"MAC:in ei tule olla monilähetysosoite.",
			DATE: 						"Virheellinen muoto.",
			DATE_INVALID: 				"Anna päiväys väliltä 01/01/1970 - 12/31/2030.",
			MASK: 						"Virheellinen muoto.",
			DOMAIN: 					"Virheellinen muoto.",
			STRING_DOMAIN:              "Virheellinen muoto.",
			USER: 						"Virheellinen muoto.",
			NOTE: 						"Virheellinen muoto.",
			PWD: 						"Virheellinen muoto.",
			SSID: 						"Virheellinen muoto.",
			NAME:						"Virheellinen muoto.",
			ASCII_VISIBLE:				"Virheellinen muoto.",
			STRING_VISIBLE:				"Virheellinen muoto.",
			STRING_VISIBLE_NO_COMMA:    "Virheellinen muoto.",
			STRING_VISIBLE_ALLOW_BLANK: "Virheellinen muoto.",
			VPN_NAME_PWD: 				"Anna 1-15 kirjainta, numeroa, - tai _."
		},


		ERROR: {			
			"00000001":					"Virheellinen tiedostotyyppi.",
			"00000002":					"Tarkistussummavirhe.",
			"00000003":					"Tiedosto on liian suuri.",
			"00000004":					"Lähetysvirhe.",
			"00000005":					"Uudelleenkäynnistysvirhe.",
			"00000006":					"Tuntematon virhe.",
			"00000007":					"Kohde on jo olemassa. Anna joku muu.",

			"00000009":					"Virheellinen portti.",
			"00000010":					"Portin tulee olla numero.",

			"00000011":					"Käyttäjätunnuksen on oltava sama kuin From-kentässä.",
			"00000012": 				"Käyttäjätunnuksen on alettava aakkosella.",

			"00000021":					"Virheellinen muoto.",

			"00000032": 				"Arvon on oltava pienempi kuin Matala.",
			"00000033": 				"Arvon on oltava pienempi kuin Keski ja Matala.",
			"00000034": 				"Virheellinen arvo, anna numero välillä 5-7200.",

			"00000039": 				"Käytä oletusarvoa 0 tai anna arvo väliltä 30-86400.",
			"00000040": 				"SSID ja MAC-osoite ovat pakollisia.",

			"00000042": 				"Käytä oletusarvoa 80 tai anna arvo väliltä 1024-65535.",

			"00000045": 				"Oletusyhdyskäytävän ja LAN-verkon IP-osoitteen tulee olla samassa aliverkossa. Syötä uudelleen.",

			"00000046": 				"IP-osoite ja MAC-osoite eivät saa olla NOLLA. Syötä uudelleen.",
			"00000047": 				"IP-osoitteen ja LAN-verkon IP-osoitteen tulee olla samassa aliverkossa. Syötä uudelleen.",

			
			"00000049":					"Verkkokohde on virheellinen.",

			"00000050": 				"Virheellinen DNS-palvelimen IP-osoite. Anna toinen IP-osoite.",
			"00000051": 				"Tämä MAC-osoite on jo olemassa. Anna joku muu.",
			"00000052": 				"Tämä IP-osoite on jo olemassa. Anna joku muu.",

			"00000053": 				"Aloitusosoitteen ei saa olla suurempi kuin lopetusosoitteen. <br/>Syötä uudelleen.",

			"00000054": 				"IP-osoitevarannon ja LAN-verkon IP-osoitteen on oltava samassa aliverkossa. Syötä uudelleen.",

			"00000055": 				"IP ei voi olla sama kuin LAN-osoite.",

			"00000056": 				"Etä-IP-osoitteen ja nykyisen LAN-verkon IP-osoitteen ei saa olla samassa aliverkossa. Anna joku muu.",

			"00000057": 				"Virheellinen PSK-salasana, syötä uudelleen.",
			"00000058": 				"Virheellinen WEP-salasana, syötä uudelleen.",

			"00000059": 				"Virheellinen IP-osoite ja aliverkon peite. Valitse oikeat arvot.",

			"00000060": 				"WAN-verkon IP-osoitteen ja LAN-verkon IP-osoitteen ei saa olla samassa aliverkossa. <br/>Anna toinen.",

			"00000061": 				"Aloitusajan tulee olla lopetusaikaa aikaisempi.",

			"00000062": 				"Tämä kenttä on pakollinen.",
			"00000063": 				"Tämä kenttä on pakollinen.",

			"00000064": 				"Isäntälaitteen MAC-osoitetta ei voi estää.",
			"00000065": 				"Tämä kohde on ristiriidassa olemassa olevien kohteiden kanssa. Tarkista asia.",
			
			"00000066": 				"Salasanan tulee olla 8-63 merkkiä tai 64 heksadesimaalilukua pitkä.",
			"00000067": 				"Salasanan tulee olla 10 heksadesimaalilukua pitkä.",
			"00000068": 				"Salasanan tulee 5 ASCII-merkkiä pitkä.",
			"00000069": 				"Salasanan tulee olla 26 heksadesimaalilukua pitkä.",
			"00000070": 				"Salasanan tulee 13 ASCII-merkkiä pitkä.",
			"00000071": 				"Salasanan tulee olla 32 heksadesimaalilukua pitkä.",
			"00000072": 				"Salasanan tulee 16 ASCII-merkkiä pitkä.",
			"00000073": 				"Salasanan tulee alle 64 merkkiä pitkä.",

			"00000074": 				"Virheellinen tiedostotyyppi.",

			"00000075": 				"PIN-koodissa on oltava 8 numeroa.",

			"00000076": 				"Syöte on ristiriidassa olemassa olevien kohteiden kanssa. Tarkista käynnistysportti ja käynnistysprotokolla.",
			"00000077": 				"IP-osoite ei saa olla sama kuin LAN-verkon IP-osoite.",
			"00000078": 				"Isäntälaitteen IP-osoite ei saa olla sama kuin LAN-verkon IP-osoite.",

			"00000080": 				"Salasanat eivät vastaa. Yritä uudelleen.",

			"00000083": 				"Yhdyskäytävä ei voi olla sama kuin IP.",
			"00000084": 				"Ensisijainen DNS ei voi olla sama kuin IP.",
			"00000085": 				"Toissijainen DNS ei voi olla sama kuin IP.",
			"00000086": 				"Ensisijainen DNS ei voi olla sama kuin toissijainen DNS.",

			"00000088": 				"Tätä toimintoa ei sallita etähallinnassa.",
			"00000089": 				"Olet ylittänyt %num yritystä. Yritä uudelleen kahden tunnin kuluttua.",

			"00000090": 				"Kohde ei voi olla LAN-verkon IP-osoite.",
			"00000091": 				"Kohde ei voi olla WAN-verkon IP-osoite.",

			"00000092": 				"IP-osoitteen ja LAN-verkon IP-osoitteen ei saa olla samassa aliverkossa. <br/>Syötä uudelleen.",
			"00000093": 				"IP-osoitteen ja WAN-verkon IP-osoitteen ei saa olla samassa aliverkossa. <br/>Syötä uudelleen.",

			"00000094": 				"VLAN-tunnukset eivät voi olla samat.",
			"00000095": 				"Vaaditaan vähintään yksi Internet-portti.",

			"00000096": 				"Avainsana on jo olemassa.",

			"00000097": 				"2,4 GHz:n taajuusalueisiin tehdyt konfiguraatiot astuvat voimaan vasta, kun Wi-Fi-painike on ON.",
			"00000098": 				"5 GHz:n taajuusalueisiin tehdyt konfiguraatiot astuvat voimaan vasta, kun Wi-Fi-painike on ON.",
			"00000099": 				"2,4 ja 5 GHz:n taajuusalueisiin tehdyt konfiguraatiot astuvat voimaan vasta, kun Wi-Fi-painike on ON.",

			"00000100": 				"5 GHz:n verkkokokoonpano ei ole käytettävissä alueesi/maasi rajoitusten takia.",
			"00002100": 				"60 GHz:n verkko ei ole käytettävissä alueesi/maasi rajoitusten takia.",

			"00000101": 				"Langaton toiminto on poissa päältä. Jos haluat käyttää tätä toimintoa, kytke Wi-Fi-painike päälle.",
			"00000102": 				"Langaton toiminto on poissa päältä. Jos haluat käyttää tätä toimintoa, kytke Wi-Fi-painike päälle.",
			"00002102": 				"Langaton toiminto on poissa päältä. Jos haluat käyttää tätä toimintoa, kytke Wi-Fi-painike päälle.",

			"00000103": 				"Langaton toiminto on poissa päältä. Jos haluat käyttää tätä toimintoa, kytke Wi-Fi-painike päälle.",
			"00000104": 				"Langaton toiminto on poissa käytöstä.",

			"00000105": 				"QoS ja IPTV eivät voi olla käytössä samaan aikaan.",

			"00000106": 				"IP-osoite ei saa olla sama kuin LAN-verkon IP-osoite.",
			
			"00000107": 				"Kohde on jo olemassa.",

			"00000110": 				"IP-osoitteen ja LAN-verkon IP-osoitteen tulee olla samassa aliverkossa.",
			
			"00000111": 				"QoS ja <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> eivät voi olla käytössä samaan aikaan.",
			"00000112": 				"WDS-toiminto voi toimia joko 2,4 GHz:n tai 5 GHz:n alueella. Lisäksi, vierasverkko ei ole käytettävissä WDS-alueella.",
			"00000113": 				"WDS ja vierasverkko eivät voi olla käytössä samaan aikaan.",
			"00000114": 				"Liikennetilastot ja <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> eivät voi olla käytössä samaan aikaan.",

			"00000117": 				"Toimialueen nimi on jo olemassa.",
			"00000118": 				"Toimialueen nimien määrä ylittää raja-arvon.",
			"00000119":					"NAT Boost poistetaan käytöstä, kun joko <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> tai <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Liikennetilastot</a> on käytössä.",

			"00000120": 				"Salasanan tulee 5-13 ASCII-merkkiä pitkä.",
			"00000121": 				"Salasanan tulee olla 10-26 heksadesimaalilukua pitkä.",
			"00000122": 				"Käyttäjätunnus tai salasana on tyhjä, haluatko varmasti jatkaa?",
			"00000123": 				"Tallennetaan... Älä käytä tämän toiminnon aikana.",
			"00000124": 				"Reitittimen PIN-koodi on lukittu usean väärää PIN-koodia käyttävän yhdistysyrityksen takia. Luo uusi koodi.",

			"00000125": 				"QoS-sääntöjen määrä ylittää raja-arvon.",
			"00000126": 				"Tiedostokoko ylittää raja-arvon.",
			"00000127": 				"Tiedoston sisältö on virheellinen.",
			"00000128": 				"Valitse vähintään yksi sovellus.",
			"00000129": 				"Valitse vähintään yksi fyysinen portti.",
			"00000130":					"WPS-toiminto on poissa käytöstä.",
			"00000131": 				"NTP-palvelin ei saa olla silmukkaosoite.",
			"00000132": 				"Tilakytkinvirhe. Yritä uudelleen tai käynnistä reititin uudelleen.",
			"00000133": 				"Virheellinen DMZ-isäntälaitteen IP-osoite. Anna kelvollinen arvo.",
			"00000134":  				"Sisäinen IP-osoite ei kelpaa. Anna kelvollinen arvo.",
			"00000135": 				"Laitetiedostovirhe.",
			"00000136": 				"Varmuuskopiotiedostovirhe.",
			"00000137": 				"Virheellinen IP-osoite. Valitse oikea arvo.",
			"00000139": 				"Virheelliset salasanan palautusparametrit.",
			"00000140": 				"Virheellinen koodi.",
			"00000141": 				"Salasanan palautus on poistettu käytöstä.",
			"00000142": 				"Koodia ei voitu lähettää. Tarkista Internet-yhteys.",
			"00000143": 				"Virheelliset sähköpostiosoitteet.",
			"00000144": 				"Virheellinen sähköpostiviesti.",
			"00000145": 				"Isäntää ei löytynyt.",
			"00000146": 				"Todennus epäonnistui.",
			"00000147": 				"Portin tulee olla välillä 1-65535.",
			"00000148": 				"Porttialueen aloitusportin numeron on oltava pienempi kuin lopetusportin numeron. Syötä uudelleen.",
			"00000149": 				"Portin numero on päällekkäinen. Syötä uudelleen.",
			
			"00000150": 				"Polkua ei ole olemassa.",
			"00000151": 				"Varattua polkua ei ole asetettu.",
			"00000152": 				"Tämän polun kanssa ilmeni ongelma.",
			"00000153": 				"Asemaa ei löydy.",
			"00000154": 				"Ei USB-laitetta.",
			
			"00000155": 				"PPTP VPN -asiakaslaitteen IP-osoite ja LAN-verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Anna toinen.",
			"00000156": 				"PPTP VPN -asiakaslaitteen ja OpenVPN-asiakaslaitteen IP-osoite ja LAN-verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Anna toinen.",

			"00000222":  				"Suurin syötteiden määrä.",
			"00000231": 				"Kaksinkertainen syöte.",
			"00000232": 				"Virheellinen URL-osoite.",
			"00000233":					"Valitse vähintään yksi päivä.",

			"00000301": 				"Suurin jakokansion syöte.",
			"00000302": 				"Suurin jakokansion syöte asemalla.",
			"00000303": 				"Kaksinkertainen jakokansion polku.",
			"00000304": 				"Kaksinkertainen jakokansion nimi.",

			"00001000":					"Päivitys on käynnissä, odota.",
			"00001001": 				"WDS-toiminto voi toimia joko 2,4 GHz:n tai 5 GHz:n taajuusalueella.",
			"00001002":					"Virheellinen koodi.",

			"00001123": 				"Syöttösäännön objekti on nolla, anna vähintään yksi sääntöobjekti.",
			"00001124": 				"Syötön fyysisen portin objekti on nolla, valitse vähintään yksi sääntöobjekti. ",

            "00002000": 				"Tämä objekti on ristiriidassa ISP:n määrittämän staattisen reitityksen kanssa. Haluatko varmasti jatkaa?",

            "00003000":                 "IPv6 Pass-Through on ristiriidassa IPTV:n kanssa! Jos haluat käyttää tätä toimintoa, poista IPTV-asetukset käytöstä.",
			"00004139": 				"Ei internet-yhteyttä",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Pyyntö aikakatkaistu. Tarkista Internet-yhteys ja yritä myöhemmin uudelleen.",
			"00004141": 				"Tuntematon virhe.",
			"00004142": 				"Väärä tarkistuskoodi.",
			"00004143": 				"Salasana ei kelpaa.",
			"00004144": 				"Käyttäjätunnus on jo olemassa.",
			"00004145": 				"Salasana ei kelpaa.",//new password
			"00004146": 				"Tämän laitteen sidontaa ei voi purkaa. Yritä uudelleen myöhemmin.",
			"00004147": 				"Tämä laite on sidottu toiseen tiliin.",
			"00004148": 				"Virheellinen syöte.",
			"00004149": 				"Tämä verkkotunnus on jo olemassa.",
			"00004150": 				"Laiteohjelmiston lataus ei onnistu. Tarkista Internet-yhteys ja yritä myöhemmin uudelleen.",
			"00004151": 				"Samalle pilvitilille voi rekisteröidä enintään 1000 verkkotunnusta.",
			"00004152": 				"Tämä laite on sidottu toiseen verkkotunnukseen.",
			"00004153": 				"Tämä verkkotunnus on sidottu toiseen laitteeseen.",
			"00004154": 				"Palvelin ei vastaa. Yritä uudelleen myöhemmin.",
			"00004155": 				"Tili puuttuu.",
			"00004156": 				"Pilvisovellusta ei voi käynnistää. Käynnistä tämä laite uudestaan ja yritä myöhemmin uudelleen.",
			"00004157": 				"Pilvipalvelimeen ei voi muodostaa yhteyttä. Tarkista Internet-yhteys ja yritä myöhemmin uudelleen.",
			"00004158": 				"WAN-portti on irti.",
			"00004159": 				"Internet-yhteyttä ei voi muodostaa. Ota yhteys palveluntarjoajaan tai yrityä uudelleen myöhennin. ",
			"00004160": 				"IP-osoitetta ei saada DHCP-palvelimelta. Tarkista WAN-yhteystyyppi ja yritä myöhemmin uudelleen.",
			"00004161": 				"PPPoE:n todennus epäonnistui. Tarkista käyttäjätunnus ja salasana.",
			"00004162": 				"Yhteyttä PPPoE-palvelimeen ei voitu muodostaa.",
			"00004164": 				"PPTP:n todennus epäonnistui. Tarkista käyttäjätunnus ja salasana.",
			"00004165": 				"Yhteyttä PPTP- palvelimeen ei voitu muodostaa.",
			"00004167": 				"L2TP-todennus epäonnistui. Tarkista käyttäjätunnus ja salasana.",
			"00004168": 				"Yhteyttä L2TP-palvelimeen ei voitu muodostaa.",
			"00004169": 				"Tuntematon virhe. Yritä uudelleen myöhemmin.",
			"00004170": 				"WAN-portti on irti.",
			"00004171": 				"Ei Internet-yhteyttä",
			"00004172": 				"Yhteys epäonnistu",
			"00004173": 				"Virheellinen käyttäjätunnus tai salasana",
			"00004174": 				"Sähköpostiosoite ei kelpaa.",
			"00004175": 				"Virheellinen käyttäjätunnuksen muoto.",
			"00004176": 				"Sähköpostiosoite on jo olemassa.",
			"00004177": 				"Tilitietoja ei voi käyttää. Päivitä sivu.",
			"00004178":   				"Järjestelmävirhe. Päivitä sivu ja yritä uudelleen.",
			"00004179":   				"Tätä laitetta ei voi sitoa. Yritä uudelleen myöhemmin.",
			"00004180":   				"Tämän laitteen sindonta tähän pilvitiliin on purettu. Kirjaudu uudelleen tilillesi sitoaksesi laitteen tilillesi.",
			"00004181":   				"Laite on offline. Tarkista Internet-asetukset.",
			"00004182":   				"Sähköpostin lähetys ei onnistu. Tarkista Internet-yhteys ja yritä uudelleen.",
			"00004183":   				"Account should contain to characters. ",
			"00004184":   				"Olet kirjoittanut salasanan virheellisesti 20 kertaa. Yritä uudelleen 2 tunnin kuluttua.",
			"00004185":   				"Olet saanut tarkistuskoodin 10 kertaa 1 tunnissa. Yritä uudelleen 24 tunnin kuluttua.",
			"00004186":   				"Tiliäsi ei valitettavasti voi aktivoida. Lähetä tarkistussähköposti uudelleen.",
			"00004187":   				"Valitettavasti tämä linkki on vanhentunut. Lähetä tarkistussähköposti uudelleen.",
			"00004188":   				"Valitettavasti tämä linkki on vanhentunut. Lähetä sähköposti uudelleen.",
			"00004189":   				"Salasanaasi ei valitettavasti voi nollata. Lähetä sähköposti uudelleen.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Laiteohjelmiston päivitysvirhe.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Tila",
			NETWORK: 					"Verkko",
			NETWORK_MAP: 				"Verkkokartta",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DHCP-palvelin",
			DYNAMIC_DNS: 				"Dynaaminen DNS",
			ADVANCED_ROUTING: 			"Edistynyt reititys",

			WIRELESS: 					"Langaton yhteys",
			WIRELESS_SETTINGS: 			"Langattoman verkon asetukset",
			WDSBRIDGING: 				"WDS-välitili",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC-suodatus",
			WIRE_STATISTICS: 			"Tilastotiedot",
			
			
			GUEST_NETWORK: 				"Vierasverkko",
			WIRELESS_SETTINGS: 			"Langattoman verkon asetukset",
			STORAGE_SHARING: 			"Tallennuslaitteen jakaminen",
			NAT_FORWARDING: 			"NAT-välitys",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Näennäispalvelimet",
			PORT_TRIGGERING: 			"Port Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB-asetukset",
			BASIC_SET: 					"Perusasetukset",
			DISK_SET: 					"Laitteen asetukset",
			FOLDER_SHARING: 			"Jaettujen resurssien käyttäminen",
			STORAGE_SHARING: 			"Tallennuslaitteen jakaminen",
			FTP_SERVER: 				"FTP-palvelin",
			MEDIA_SERVER: 				"Media-palvelin",
			PRINT_SERVER: 				"Tulostinpalvelin",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Offline-lataus",
			
			PARENTAL_CONTROL: 			"Lapsilukko",

			QOS:  						"QoS",
			DATABASE:  					"Tietokanta",

			STREAMBOOST: 				"Suoratoiston tehostus",
			MAP: 						"Kartta",
			SB_MAP: 					"Kartta",
			SB_BANDWIDTH:  				"Kaistanleveys",
			SB_PRIORITY: 				"Prioriteetti",
			SB_STATISTICS: 				"Tilastotiedot",

			
			SECURITY: 					"Suojaus",
			SETTINGS: 					"Asetukset",
			ACCESS_CONTROL: 			"Käytönohjaus",
			IP_MAC_BINDING: 			"IP- ja MAC-sidonta",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Järjestelmätyökalut",
			TIME_SETTINGS: 				"Aika-asetukset",
			DIAGNOSTIC: 				"Diagnostiikka",
			FIRMWARE_UPGRADE: 			"Laitteisto-ohjelmiston päivitys",
			BACKUP_RESTORE: 			"Varmuuskopiointi ja palauttaminen",
			ADMINISTRATION: 			"Valvonta",
			SYSTEM_LOG: 				"Järjestelmäloki",
			STATISTICS: 				"Liikennetilastot",
			SYSTEM_PARAMETERS: 			"Järjestelmäparametrit",
			VPN: 						"VPN-palvelin",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN-yhteydet"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Alue ja aikavyöhyke",
			INTERNET_CONNECTION_TYPE: 	"Internet-yhteystyyppi",
			WIRELESS_SETTINGS: 			"Langattoman verkon asetukset",
			SUMMARY: 					"Yhteenveto",
			SETUP_COMPLETE: 			"Yhteyden testaus",

			EXIT: 						"Poistu",
			NEXT: 						"Seuraava",
			SAVE: 						"Tallenna",
			FINISH: 					"Valmis",
			OK: 						"OK",
			NONE: 						"Tunnistus epäonnistui.",

			REGION: 					"Alue",
			TIME_ZONE: 					"Aikavyöhyke",
			NO_SELECT: 					"Valitse asetukset.",

			AUTO_DETECT: 				"Automaattinen tunnistus",
			DYNAMIC_IP: 				"Dynaaminen IP-osoite",
			STATIC_IP: 					"Staattinen IP-osoite",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Jos et ole varma, mikä Internet-yhteystyyppisi on, käytä automaattista tunnistusta tai pyydä ISP:ltä apua.",

			DYNAMIC_IP_INFO: 			"Jos ISP:si sallii Internet-yhteyden vain tiettyyn MAC-osoitteeseen, sinun on kloonattava ensisijaisen tietokoneen MAC-osoite. Jos et ole varma, valitse <strong>ÄLÄ kloonaa MAC-osoitetta</strong>.",
			MAC_CLONE_NO: 				"ÄLÄ kloonaa MAC-osoitetta",
			MAC_CLONE_YES: 				"Kloonaa tämän tietokoneen MAC-osoite",
			MAC_CLONE_NOTE: 			"Jos valitset kloonata MAC-osoitteen. Varmista, että ISP on rekisteröinyt tämän tietokoneen MAC-osoitteen, ennen kuin napsautat Seuraava.",

			PPPOE_INFO: 				"Anna PPPoE-käyttäjätunnus ja -salasana.",
			
			STATIC_IP_INFO: 			"Anna IP-tietosi.",

			L2TP_INFO: 					"Anna L2TP-käyttäjätunnus ja -salasana.",
			PPTP_INFO: 					"Anna PPTP-käyttäjätunnus ja -salasana.",
			
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			SERVER_IP_ADDRESS_NAME: 	"VPN-palvelimen IP/toimialueen nimi",
			IP_ADDRESS: 				"IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			DEFAULT_GATEWAY: 			"Oletusyhdyskäytävä",
			PRIMARY_DNS: 				"Ensisijainen DNS",
			SECOND_DNS: 				"Toissijainen DNS",
			OPTIONAL: 					"(valinnainen)",
			
			ON: 						"Päällä",
			OFF: 						"Sammuksissa",
			WIRELESS_24GHZ: 			"Langaton 2,4GHz",
			WIRELESS_5GHZ: 				"Langaton 5GHz",
			WIRELESS_60GHZ: 				"60 GHz:n langaton verkko",
			ENABLE_WIRELESS_RADIO: 		"Ota langaton radio käyttöön",
			NAME_SSID: 					"Langattoman verkon nimi (SSID)",

			SUMMARY_INFO1: 				"Langattomat laitteet on yhdistettävä uudelleen uuteen langattomaan verkkoon ennen <strong>Seuraava</strong> -painikkeen napsauttamista.",
			SUMMARY_INFO2: 				"Langattoman verkon nimi ja salasana on muutettu seuraavasti:",
			SUMMARY_INFO3: 				"Varmista, että olet yhteydessä uuteen langattomaan verkkoon.",

			WIRELESS_24GHZ_SSID: 		"Langattoman 2,4 GHz:n verkon nimi (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Langattoman 2,4 GHz:n verkon salasana:",
			WIRELESS_5GHZ_SSID: 		"Langattoman 5 GHz:n verkon nimi (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Langattoman 5 GHz:n verkon salasana:",
			WIRELESS_60GHZ_SSID: 		"Langattoman 60 GHz:n verkon SSID",
			WIRELESS_60GHZ_PASSWORD: 	"Langattoman 60 GHz:n verkon salasana",

			SORRY: 						"Epäonnistui.",
			SUCCESS: 					"Onnistui!",
			TEST_INTERNET_SUCCESS_INFO: "Suorita pika-asennus loppuun valitsemalla Valmis.",

			TEST_INTERNET_FAILED_INFO_0:"Varmista, että pika-asennusparametrit ovat oikein, ja yritä uudelleen. Jos kaikki pika-asennusparametrit ovat oikein. Käynnistä modeemi uudelleen, odota 2 minuuttia ja napsauta vielä kerran Testaa Internet-yhteys. Jos et käytä modeemia, voit joutua pyytämään apua Internet-palveluntarjoajalta (ISP).",
			SUMMARY_INFO4: 				"Valitamme! Huomaamme, että et ole yhdistänyt langatonta laitetta uudelleen uuteen langattomaan verkkoon. Tee niin ja napsauta <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Onnittelut!",
			COMPLETE_INFO_0: 			"Olet suorittanut pika-asennuksen loppuun.",
			COMPLETE_INFO_1:			"Napsauta alta Testaa Internet-yhteys ja napsauta sitten Valmis.",
			TEST_INTERNET: 				"Testaa Internet-yhteys",

			
			RESET_USER_TITLE: 			"Määritä uusi käyttäjätunnus ja salasana",
			NEW_USERNAME: 				"Uusi käyttäjätunnus",
			NEW_PASSWORD: 				"Uusi salasana",
			CONFIRM_PASSWORD: 			"Vahvista uusi salasana",
			CONFIRM: 					"Vahvista"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Internet-tila",

			GHZ24: 						"2,4 GHz",
			GHZ5: 						"5 GHz",
			GHZ60: 						"60 GHz",
			
			CONNECTION_TYPE: 			"Yhteystyyppi",
			SECONDARY_CONN: 			"Toissijainen yhteys",

			POOR_CONNECTED: 			"Heikko yhteys",
			UNPLUGGED: 					"WAN-portti on irti.",
			
			CONNECTED: 					"Yhdistetty",
			DISCONNECTED: 				"Yhteys katkaistu",
			CONNECTING: 				"Yhdistetään",

			INTERNET_IP_ADDR: 			"IP-osoite",
			
			IP_ADDR: 					"IP-osoite",
			MAC_ADDR: 					"MAC-osoite",
			GATEWAY: 					"Yhdyskäytävä",

			AUTO: 						"Automaattinen",
			
			ROUTER: 					"Reititin",
			WIRELESS_CLIENTS: 			"Langattomat asiakaslaitteet",
			HOST_CLIENTS: 				"Isäntälaitteen asiakkaat",
			GUEST_CLIENTS: 				"Vieraslaitteen asiakkaat",
			WIRE_CLIENTS: 				"Langattoman verkon asiakkaat",
			PRINTER: 					"Tulostin",
			USB_DISK: 					"USB-levy",
			WIRELESS: 					"Langaton yhteys",
			NAME: 						"Nimi",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanava",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Langaton 2,4GHz",
			WIRELESS_5GHZ: 				"Langaton 5 GHz",
			WIRELESS_60GHZ:				"60 GHz:n langaton verkko",
			
			GUEST_24GHZ: 				"Vierasverkko 2,4 Ghz",
			GUEST_5GHZ: 				"Vierasverkko 5 Ghz",
			
			STATUS: 					"Tila",
			TOTAL: 						"Yhteensä",
			AVAILABLE: 					"Käytettävissä",
			GB: 						"Gt",
			BRAND: 						"Merkki",

			DYNAMIC_IP: 				"Dynaaminen IP-osoite",
			STATIC_IP: 					"Staattinen IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-kaapeli",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-tunneli",
			NONE: 						"Ei mitään"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Automaattinen tunnistus",
			INTERNET_CONN_TYPE: 		"Internet-yhteystyyppi",
			DYNAMIC_IP: 				"Dynaaminen IP-osoite",
			STATIC_IP: 					"Staattinen IP-osoite",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond-kaapeli",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"Dhcp",
			UNPLUGGED: 					"Irrotettu",
			NONE: 						"Ei mitään",
			DETECT_FAIL: 				"Automaattitunnistus epäonnistui",
			SECONDARY_CONN: 			"Toissijainen yhteys",

			DYNAMIC_YES: 				"ÄLÄ kloonaa MAC-osoitetta",
			DYNAMIC_NO: 				"Kloonaa tämän tietokoneen MAC-osoite",
			
			IP_ADDR: 					"IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			DEFAULT_GATEWAY: 			"Oletusyhdyskäytävä",
			PRIMARY_DNS: 				"Ensisijainen DNS",
			SECOND_DNS: 				"Toissijainen DNS",
			OPTIONAL: 					"(valinnainen)",
			USER_NAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			SERVER_IP_ADDR_NAME: 		"VPN-palvelimen IP/toimialueen nimi",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Jos et ole varma, mikä Internet-yhteystyyppisi on, käytä automaattista tunnistusta tai pyydä ISP:ltä apua."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Langattoman verkon asetukset",
			MODE_2G: 					"Langaton 2,4 GHz",
			MODE_5G: 					"Langaton 5 GHz",
			MODE_60G: 					"60 GHz:n langaton verkko",
			WIRELESS_NETWORK_NAME: 		"Langattoman verkon nimi (SSID)",
			WIRELESS_PASSWORD: 			"Salasana",
			ENABLE_WIRELESS: 			"Ota langaton radio käyttöön",
			SAVE: 						"Tallenna",
			ENCRYPTION_2G_NOTICE:		"2,4 GHz:n salaus on %s.",
			ENCRYPTION_5G_NOTICE:		"5 GHz:n salaus on %s.",
			ENCRYPTION_60G_NOTICE:		"60 GHz:n salaus on %s.",
			ENCRYPTION_2G_NO: 			"2,4 GHz:n langaton verkko ei ole salattu.",
			ENCRYPTION_5G_NO: 			"5 GHz:n langaton verkko ei ole salattu.",
			ENCRYPTION_60G_NO: 			"60 GHz:n langaton verkko ei ole salattu.",
			ENCRYPTION_NO: 				"Suojaamattomassa langattomassa verkossa piilee kätkettyjä vaaroja.",
			ENCRYPTION_SURE: 			"Haluatko varmasti jatkaa?",
			HIDE_SSID: 					"Piilota SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Perusasetukset",
			TITIL_NEW:					"Levy ja tili",
			DISK_SET:					"Laitteen asetukset",

			SELFLY_REMOVE:				"Poista turvallisesti",
			SCANING:					"Skannataan...",
			SCAN_RESULT:				"Löytyi %n levy",
			
			DISKS:						"Levyt",
			USERS: 						"Käyttäjätili",
			DEVICENAME: 				"Laitteen nimi",
			VOLUMN: 					"Asema",

			USBSPACE: 					"Käytetty tila",
			FREESPACE: 					"Vapaa tila",
			STATUS: 					"Tila",
			INACT: 						"Poista käytöstä",
			USAGE: 						"Käyttö",
			CAPACITY: 					"Kapasiteetti",
			OPERATION: 					"Toiminta",
			
			ACC: 						"Tilinhallinta", 	 	
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			USE_LOGIN: 					"Käytä kirjautunutta käyttäjää",
			SCAN: 						"Skannaa",
			ENJECT_ALL: 				"Poista kaikki",
			ENJECT: 					"Poista",
			ADD_USER: 					"Lisää käyttäjä",
			AUTH: 						"Valtuudet",


			LOCATION: 					"Sijainti",
			MOBILE_ISP: 				"Mobiili-ISP",
			DIAL_NUMBER: 				"Soita numeroon",
			APN: 						"APN",
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			MTU_SIZE: 					"MTU-koko (tavuissa)",
			OPTIONAL: 					"(valinnainen)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Lapsilukko",
			UNKNOWN: 					"Tuntematon",
			
			DEVICE_CTR: 				"Lapsilukituksen alaiset laitteet",
			ID: 						"Tunnus",
			DEVICE: 					"Laitteen nimi",
			MAC_ADDRESS: 				"MAC-osoite",
			TIME: 						"Internetin käyttöaika",
			DESCRIPTION: 				"Kuvaus",
			ENABLE: 					"Ota käyttöön",
			ENABLE_THIS_ENTRY: 			"Ota tämä kohta käyttöön",
			OPTIONAL: 					"(valinnainen)",
			BTN_VIEW: 					"Näytä olemassa olevat laitteet",
			
			DEVICE_LIST: 				"Device List",
			SYSTEM_TIME: 				"Järjestelmän kellonaika",
			
			RESTR: 						"Sisältörajoitus",
			MODE: 						"Rajoitus",
			BLACKMODE: 					"Musta lista",
			WHITEMODE: 					"Valkoinen lista",
			ACCESS_DEVICES_LIST: 		"Käytä laiteluetteloa",
			
			CHOOSE: 					"Valitse",
			ADD_A_NEW_KEYWORD: 			"Lisää uusi estettävä avainsana",
			ADD_A_NEW_DOMAIN_NAME: 		"Käyttö edellyttää uuden verkkotunnuksen lisäämistä",
			
			OPT: 						"Toiminta",
			STATUS: 					"Lapsilukko",
			YOURPC:						"PC:si"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Vierasverkko",
			MODE_2G: 					"Langaton 2,4 GHz",
			MODE_5G: 					"Langaton 5 GHz",
			WIRELESS_NETWORK_NAME: 		"Langattoman verkon nimi (SSID)",
			WIRELESS_PASSWORD: 			"Salasana",
			DYNAMIC_PASSWORD: 			"Salasana",
			ENABLE_WIRELESS: 			"Ota vierasverkko käyttöön",
			SAVE:						"Tallenna",
			HIDE_SSID: 					"Piilota SSID",
			PASSWORD_CHANGE_CYCLE: 		"Salasanan päivitysväli",
			PER_DAY: 					"Päivittäinen",
			PER_WEEK: 					"Viikoittain",
			PER_MONTH: 					"Kuukausittain",
			NEVER: 						"Ei koskaan",
			UNENCRYPTED:				"Vierasverkkoa ei ole salattu. Voit asettaa salasanan lisäasetusvalikosta."
		},

		STATUS: {
			TITLE: 						"Tila",
			INTERNET:					"Internet",
			WIRELESS:					"Langaton yhteys",
			LAN:						"LAN",
			USB_TITLE:					"USB-laitteet",
			PERFORMANCE: 				"Suorituskyky",
			GUEST_NETWORK: 				"Vierasverkko",
			ACCESS_DEVICES: 			"Käytä laitteita",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4 GHz",
			HZ5G: 						"5 GHz",
			HZ60G: 						"60 GHz",

			CONNECTION_TYPE: 			"Yhteystyyppi",

			MAC_ADDRESS: 				"MAC-osoite",
			IP_ADDRESS: 				"IP-osoite",
			RELEASE: 					"Vapauta",
			RENEW: 						"Uudista",
			
			DYNAMIC_IP: 				"Dynaaminen IP-osoite",
			STATIC_IP: 					"Staattinen IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond-kaapeli",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4-tunneli",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Läpivienti (Välitili)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Ei mitään",
			
			DEFAULT_GATEWAY: 			"Oletusyhdyskäytävä",
			DNS: 						"DNS-palvelin",
			MAC: 						"MAC-osoite",
			WDS_STATUS: 				"WDS:n tila",
			
			IPV6_ADDRESS: 				"IP-osoite",
			PRIMARY_DNS: 				"Ensisijainen DNS",
			SECOND_DNS: 				"Toissijainen DNS",

			RADIO: 						"Langaton radio",

			NAME_SSID: 					"Nimi (SSID)",
			NETWORK_NAME_SSID:			"Verkon nimi (SSID)",
			HIDE_SSID: 					"Piilota SSID",
			MODE: 						"Tila",
			CHANNEL: 					"Kanava",
			CHANNEL_WIDTH: 				"Kanavanleveys",
			AUTO: 						"Automaattinen",
			CURRENT_CHANNEL: 			"Nykyinen kanava",

			WDS: 						"WDS:n tila",
			WIRED_CLIENTS: 				"Langattoman verkon asiakkaat",
			WIRELESS_CLIENTS: 			"Langattomat asiakaslaitteet",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Link-local-osoite",
			ASSIGN_TYPE: 				"Määrätty tyyppi",
			
			ALLOW_TO_SEE_EACH: 			"Anna vieraiden nähdä toisensa",

			TOTAL: 						"Yhteensä:",
			AVAILABLE: 					"Käytettävissä:",

			USB: 						"USB-levy",
			PRINTER: 					"Tulostin",

			CPU_LOAD: 					"Suorittimen kuorma",
			MEMORY_USAGE: 				"Muistin käyttö",

			IP_ADDR_P: 					"IP-osoite:",
			MAC_ADDR_P: 				"MAC-osoite:",
			CONN_TYPE_P: 				"Yhteystyyppi:",

			DISABLED: 					"Poissa käytöstä",
			INIT: 						"Alusta",
			SCAN: 						"Skannaa",
			AUTH: 						"Vahvista",
			ASSOC: 						"Assoc",
			RUN: 						"Suorita",
			HOST: 						"Isäntä",
			GUEST: 						"Vieras",

			ON: 						"Päällä",
			OFF: 						"Sammuksissa"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Internet-yhteystyyppi",
			INTERNET_MAC_ADDRESS: 		"MAC-osoite",
			
			CONNECT: 					"Yhdistä",
			DISCONNECT: 				"Katkaise yhteys",

			IP_ADDR: 					"IP-osoite",
			
			USE_DEFAULT_MAC: 			"Käytä oletus-MAC-osoitetta",
			USE_COMPUTER_MAC: 			"Käytä tämän tietokoneen MAC-osoitetta",
			USE_CUSTOM_MAC: 			"Käytä mukautettua MAC-osoitetta",
			MAC_CLONE: 					"MAC-osoitteen kloonaus",
			
			CONFIG: 					"Kokoonpano",
			
			IP_ADDRESS: 				"IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			DEFAULT_GATEWAY: 			"Oletusyhdyskäytävä",
			
			MANUAL_DNS: 				"Manuaalinen DNS",
			PRIMARY_DNS: 				"Ensisijainen DNS",
			SECOND_DNS: 				"Toissijainen DNS",
			
			RENEW: 						"Uudista",
			RELEASE: 					"Vapauta",
			VIEW_MODE: 					"Näytä tila",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Hae dynaamisesti ISP:ltä",
			USE_FOLLOW_IP_ADDR: 		"Käytä seuraavaa IP-osoitetta",
			USE_FOLLOW_DNS_ADDR: 		"Käytä seuraavaa DNS-osoitetta",
			USE_FOLLOW_DNS_SERVER: 		"Käytä seuraavaa DNS-palvelinta",
			
			BASIC: 						"Perusasetukset",
			ADVANCED: 					"Lisäasetukset",
			
			DNS_ADDR_MODE: 				"DNS-osoite",
			MTU_SIZE: 					"MTU-koko",
			MTU_1500: 					"tavua. (Oletus on 1500, älä muuta ellei välttämätöntä.)",
			MTU_1480: 					"tavua. (Oletus on 1480, älä muuta ellei välttämätöntä.)",
			MTU_1460: 					"tavua. (Oletus on 1460, älä muuta ellei välttämätöntä.)",
			MTU_1420: 					"tavua. (Oletus on 1420, älä muuta ellei välttämätöntä.)",
			
			HOST_NAME: 					"Isännän nimi",

			HOST_NAME_CONFIRM: 			"Isäntänimi sisältää luvattomia merkkejä, jotka voivat saada järjestelmän käyttäytymään odottamattomasti. Haluatko varmasti jatkaa?",

			GET_IP_WITH_UNICAST_DHCP: 	"Hanki IP Unicast DHCP:llä (Tätä ei tavallisesti tarvita.)",
			OPTIONAL: 					"(valinnainen)",
			
			STATIC_IP: 					"Staattinen IP-osoite",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"Automaattinen",
						
			USER_NAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			
			INTERNET_IP_ADDR: 			"IP-osoite",
			INTERNET_DNS: 				"Internet DNS",
			SECONDARY_CONN: 			"Toissijainen yhteys",
			NONE: 						"Ei mitään",
			INTERNET_PRIMARY_DNS:		"Ensisijainen DNS",
			INTERNET_SECONDARY_DNS: 	"Toissijainen DNS",
			
			DYNAMIC_IP: 				"Dynaaminen IP-osoite",
			DYNAMIC_IP_v6: 				"Dynaaminen IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Palvelun nimi",
			ACCESS_CONCENTRATOR_NAME:  	"Käytön keskittimen nimi",
			DETECT_ONLINE_INTERVAL: 	"Tunnista online-aikaväli",
			INTERVAL_TIPS: 				"sekuntia. (0-120. Oletusarvo on 10.)",
			IP_ADDR_MODE:  				"IP-osoite",
			CONN_MODE: 					"Yhteystila",
			DHCP_LINK_UNPLUGGED: 		"WAN-portti on irti.",
			
			AUTO: 						"Automaattinen",
			ON_DEMAND: 					"Tarpeen mukaan",
			TIME_BASED: 				"Aikapohjainen",
			MANUALLY: 					"Käsin",
			MAX_IDLE_TIME: 				"Suurin käyttämättömyysaika",
			MAX_IDLE_TIME_TIPS: 		"minuuttia. (0 tarkoittaa aina käytössä.)",
			PERIOD_OF_TIME: 			"Aikajakso",
			TIME_TIPS: 					"(hh:mm)",
			BIGPOND_CABLE: 				"BigPond-kaapeli",
			AUTH_SERVER: 				"Todennuspalvelin",
			AUTH_DOMAIN: 				"Vahvista toimialue",
			L2TP: 						"L2TP",
			GATEWAY: 					"Yhdyskäytävä",
			SERVER_IP_ADDR_NAME: 		"VPN-palvelimen IP/toimialueen nimi",
			PPTP: 						"PPTP",
			TO: 						"kohtaan",
			
			TUNNEL_6TO4: 				"6to4-tunneli",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Hanki vakituinen IPv6-osoite",
			GET_PREFIX_DELEGATION: 		"Hanki IPv6-etuliitteen siirto",
			IPV6_ADDR: 					"IPv6-osoite",

			GET_IPV6_WAY: 				"Hanki IPv6-osoite",
			AUTOMATICALLY:              "Hanki automaattisesti",
			SPECIFIED_BY_ISP: 			"ISP määrittää",

			IPV6_ADDR_PREFIX: 			"IPv6-osoitteen etuliite",
			NONE_TEMPORARY: 			"Vakituinen",

			PREFIX_DELEGATION: 			"Etuliitteen siirto",
			ENABLE:                     "Ota käyttöön",
			DISABLE:                    "Poista käytöst'",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4-peitteen pituus",
			CONFIG_TYPE: 				"Määritystyyppi",
			RD6_PREFIX: 				"6RD-etuliite",
			RD6_PREFIX_LENGTH: 			"6RD-etuliitteen pituus",
			REPLY_IPV4_ADDR: 			"Border Reply IPv4-osoite",
			MANUAL: 					"Manuaalinen",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Läpivienti (Välitili)",
			LOCAL_IPV6: 				"Paikallinen IpV6-osoite",
			PEER_IPV6: 					"Vertaisjärjestelmän IpV6-osoite",
			TUNNEL_ADDR: 				"Tunnelin osoite",
			IPV4_NETMASK: 				"IPv4-verkkopeite",
			CUSTOM: 					"Mukautettu",
		    AFTR_NAME: 					"AFTR-nimi",


			
			
			IPV4_ADDR: 					"IPv4-osoite",
			IPV4_MASK: 					"IPv4-aliverkon peite",
			IPV4_GATEWAY: 				"IPv4-oletusyhdyskäytävä",

			DUPLEX: 					"Kaksipuolinen",
			AUTO_NEGOTIATION: 			"Automaattinen neuvottelu",
			FULL_DUPLEX_1000: 			"1000 Mbps:n täysi kaksipuolisuus",
			HALF_DUPLEX_1000:			"1000 Mbps:n yksipuolisuus",
			FULL_DUPLEX_100: 			"100 Mbps:n täysi kaksipuolisuus",
			HALF_DUPLEX_100: 			"100 Mbps:n yksipuolisuus",
			FULL_DUPLEX_10: 			"10 Mbps:n täysi kaksipuolisuus",
			HALF_DUPLEX_10: 			"10 Mbps:n yksipuolisuus"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC-osoite",
			IP_ADDRESS: 				"IP-osoite",
			SUBNET_MASK: 				"Aliverkon peite",
			CUSTOM: 					"Mukautettu",

			IGMP: 						"Ota IGMP-välityspalvelin käyttöön",
			


			ASSIGNED_TYPE: 				"Määrätty tyyppi",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+tilaton DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Osoitteen etuliite",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Osoite",
			DELEFATED: 					"Siirretty",
			STATIC: 					"Staattinen",
			SITE_PREFIX: 				"Sivuston etuliite",
			SITE_PREFIX_LEN: 			"Sivuston etuliitteen pituus",

			PREFIX_TYPE:  				"Sivuston etuliitteen määritystyyppi",
			LAN_IPV6_ADDR:  			"LAN IPv6-osoite",

			RELEASE_TIME: 				"Vapautusaika",
			RELEASE_TIME_TIP: 			"sekuntia. (Oletus on 86400, älä muuta ellei välttämätöntä.)",
			ADDRESS:					"Osoite",
			SAVE: 						"Tallenna",

			REBOOT_TIP: 				"Reititin siirtyy uudelle kirjautumissivulle. <br/> Odota..."

		},

		IPTV:{
			TITLE: 						"Asetukset",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Ota IPTV käyttöön", 
			MODE:  						"Tila",
			IGMP_PROXY: 				"IGMP-välityspalvelin",
			IGMP_VERSION: 				"IGMP-versio",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Välitili",
			BASIC: 						"Mukautettu",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Venäjä",
			UNIFY:  					"Malesia-Unifi",
			MAXIS:  					"Malesia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-puhelin", 

			Q_TAG: 						"802.1Q-tunniste",
			ENABLE: 					"Ota käyttöön",
			
			INTERNET_VLAN_ID: 			"Internet VLAN -tunnus",
			INTERNET_VLAN_PRIORITY: 	"Internet VLAN -prioriteetti",
			IP_PHONE_VLAN_ID: 			"IP-puhelimen VLAN-tunnus",
			IP_PHONE_VLAN_PRIORITY: 	"IP-puhelimen VLAN-prioriteetti",
			IPTV_VLAN_ID: 				"IPTV:n VLAN -tunnus",
			IPTV_VLAN_PRIORITY: 		"IPTV VLAN -prioriteetti",
			IPTV_MULTI_VLAN_ID: 		"IPTV:n Multicast VLAN -tunnus",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV Multicast VLAN -prioriteetti"
		},

		DHCP_SERVER: {
			TITLE: 						"DHCP-palvelin",
			
			SETTINGS: 					"Asetukset",

			DHCP_SERVER: 				"DHCP-palvelin",
			ENABLE_DHCP_SERVER: 		"Ota DHCP-palvelin käyttöön",

			IP_ADDR_POOL: 				"IP-osoitevaranto",
			LEASETIME: 					"Osoitteen vuokra-aika",
			LEASENOTE: 					" minuuttia. (2-2880. Oletusarvo on 120.)",
			
			GATEWAY: 					"Oletusyhdyskäytävä",
			DOMAIN: 					"Oletustoimialue",
			PRIMARYDNS: 				"Ensisijainen DNS",
			SECONDARYDNS: 				"Toissijainen DNS",

			OPTIONAL: 					"(valinnainen)",

			CLIENTSLIST: 				"DHCP-asiakasluettelo",
			CLIENT_NUMBER: 				"Asiakaslaitenumero",
			CLIENT_NAME: 				"Asiakkaan nimi",
			MAC_ADDR: 					"MAC-osoite",
			ASSIGNED_IP: 				"Määrätty IP-osoite",
			LEASE_TIME: 				"Vuokra-aika",

			RESERVATION: 				"Osoitteen varaus",

			RESERVED_IP: 				"Varattu IP-osoite",
			IP_ADDRESS: 				"IP-osoite",
			DESCRIPTION: 				"Kuvaus",

			CLIENTSLIST: 				"DHCP-asiakasluettelo",
			CLIENT_NUMBER: 				"Asiakaslaitenumero",

			ENABLE: 					"Ota käyttöön",
			ENABLE_THIS_ENTRY: 			"Ota tämä kohta käyttöön",
			BTN_VIEW:					"Näytä olemassa olevat laitteet"
			
		},

		DDNS: {
			DDNS: 						"Dynaaminen DNS",
			SERVICEPROVIDER: 			"Palveluntarjoaja",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Siirry rekisteröintiin...",
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			DOMAIN_NAME_LIST: 			"Toimialueen nimiluettelo",
			DOMAIN_NAME: 				"Toimialue",
			LOGIN: 						"Kirjaudu",
			LOGIN_SAVE: 				"Kirjaudu ja tallenna", 
			LOGOUT: 					"Kirjaudu ulos",
			STATU_SUCCESS:				"Onnistu",
			UPDATE_INTERVAL:			"Päivitysaikaväli",
			ONE_HOUR:					"1 tunti",
			SIX_HOUR:					"6 tuntia",
			TWETEEN_HOUR:				"12 tuntia",
			ONE_DAY:					"1 päivä",
			TWO_DAY:					"2 päivää",
			THREE_DAY:					"3 päivää",
			NEVER:						"ei saa koskaan",
			UPDATE:						"Päivitä",
			STATU_INCORRENT:			"Virheellinen käyttäjätunnus tai salasana",
			STATU_ERR_DOMAIN:			"Virhe toimialueen nimessä",
			
			STATU_NO_LAUNCH:			"Ei käynnisty",
			STATU_FAIL_DDNS: 			"DynDNS:n päivitys ei onnistunut.",
			STATU_FAIL_NOIP: 			"No-IP:n päivitys ei onnistunut.",
			STATU_CONN:					"Yhdistetään"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Edistynyt reititys",
			STATIC_ROUTING: 			"Staattinen reititys",

			DESTINATION_NETWORK:		"Verkkokohde",
			SUBNET_MASK: 				"Aliverkon peite",
			DEFAULT_GATEWAY: 			"Oletusyhdyskäytävä",
			DESCRIPTION: 				"Kuvaus",
			
			SYSTEM_ROUTING_TABLE: 		"Järjestelmän reititystaulukko",
			CLIENT_NUMBER: 				"Aktiivisten reittien määrä",

			GATEWAY: 					"Yhdyskäytävä",
			INTERFACE: 					"Liitäntä",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Ota käyttöön",
			ENABLE_THIS_ENTRY: 			"Ota tämä kohta käyttöön"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Asetukset",
			NOT_SUPPORT_5G: 			"Alue tukee ainoastaan 2,4 GHz:iä. Varmista, että valitset oikeaan alueen.",
			NOT_SUPPORT_60G: 			"Alue ei tue 60 GHz:iä.",
			ENABLE_TIPS: 				"Kytke langaton radio päälle.",

			REGION: 					"Alue",
			NOTICE:  					"Jotta voit käyttää langatonta toimintoa, langaton laitteisto on oltava päällä.",
			
			MODE_2G:					"2,4 GHz",
			MODE_5G:					"5 GHz",
			MODE_60G: 					"60 GHz",

			WIRELESS: 					"Langaton yhteys",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Ota langaton radio käyttöön",

			WIRELESS_NETWORK_NAME: 		"Langattoman verkon nimi (SSID)",
			WIRELESS_PASSWORD: 			"Salasana",
			HIDE_SSID: 					"Piilota SSID",

			SECURITY: 					"Suojaus",
			NO_SECURITY: 				"Ei suojausta",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal (suositellaan)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2-Enterprise",
			WPA2_PERSONAL: 			    "WPA2-Personal (suositellaan)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Versio",

			AUTO: 						"Automaattinen",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Salaus",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Tila",
			MODE_B:  					"802.11b",
			MODE_G:  					"Ainoastaan 802,11g",
			MODE_N:  					"Ainoastaan 802.11n",
			MODE_BG:  					"802.11 b/g",
			MODE_GN: 					"802.11g/n",
			MODE_BGN:  					"802.11b/g/n",

			MODE_A_5: 					"Ainoastaan 802.11a",
			MODE_AN_5: 					"802.11a/n yhdistetty",
			MODE_N_5: 					"Ainoastaan 802.11n",
			MODE_AC_5:					"Ainoastaan 802.11ac",
			MODE_NAC_5:					"802.11n/ac yhdistetty",
			MODE_ANAC_5:				"802.11a/n/ac yhdistetty",

			MODE_AD_60:					"Vain 802.11ad",

			CHANNEL_WIDTH: 				"Kanavanleveys",
			CHANNEL: 					"Kanava",

			TRANSMIT_POWER: 			"Lähetysteho",

			RADIUS_SERVER_IP: 			"RADIUS-palvelimen IP-osoite",
			RADIUS_PORT: 				"RADIUS-portti",
			RADIUS_PASSWORD: 			"RADIUS-salasana",

			TYPE: 						"Tyyppi",
			OPEN_SYSTEM: 				"Avoin järjestelmä",
			SHARED_KEY: 				"Jaettu avain",

			KEY_SELECTED: 				"Avain valittu",
			KEY1: 						"Avain1",
			KEY2: 						"Avain2",
			KEY3: 						"Avain3",
			KEY4: 						"Avain4",

			WEP_KEY_FORMAT: 			"WEP-avaimen muoto",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Heksadesimaali",

			KEY_TYPE: 					"Avaimen tyyppi",
			BIT64: 						"64-bittinen",
			BIT128: 					"128-bittinen",
			BIT152: 					"152-bittinen",

			KEY_VALUE: 					"Avainarvo",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Matala",
			MIDDLE: 					"Keskitaso",
			HIGH: 						"Korkea"
		},

		WPS: {

			TITLE2: 					"Reitittimen PIN-koodi",
			ROUTERS_PIN_INFO: 			"Muut laitteet voivat muodostaa yhteyden tähän reitittimeen WPS:llä käyttäen reitittimen PIN-koodia.",
			ENABLE_ROUTE_PIN: 			"Reitittimen PIN-koodi",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Luo",
			DFT: 						"Oletus",

			TITLE: 						"Ohjattu WPS-toiminto",
			SELECT_SETUP: 				"Valitse asetusmenetelmä",
			PUSH_BTN: 					"Paina painiketta (suositellaan)",
			PUSH_DES: 					"Paina reitittimen fyysistä painiketta tai napsauta ohjelmiston Connect (Yhdistä) -painiketta tällä sivulla.",
			CONNECT: 					"Yhdistä",
			CANCEL: 					"Peruuta",

			RESULT_HEAD: 				"Langaton asiakas",
			RESULT_END: 				"on lisätty verkkoon.",
			NOT_FOUND: 					"Asiakaslaitetta ei löydy. Napsauta painiketta yrittääksesi uudelleen.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Ei löydy",
			ENTER_CLIENT_PIN: 			"Anna asiakkaan PIN-koodi",
			SWITCH_NOTE:				"Jotta voit muodostaa yhteyden WPS:llä, kytke langaton toiminto päälle Wi-Fi-painikkeella.",
			SWITCH_NOTE2:				"Jotta voit käyttää ohjattua WPS-toimintoa, sinun tulee määrittää ensin langattomat parametrit.",
			STATUS_PIN_ERROR: 			"Onko WPS PIN virheellinen? Tarkista, onko se oikein.",
			STATUS_ERROR: 				"Virhe.",
			STATUS_CONN_ERROR: 			"Yhteys epäonnistu",
			STATUS_CONNING: 			"Yhdistetään...",
			STATUS_CANCEL: 				"Yhteys peruutettu.",
			
			NOTE: 						"Huomautus:",
			BUTTON: 					"WIFI-painike on pois päältä",
			ENABLE: 					"Langaton toiminto ei ole käytössä",
			HIDDEN: 					"Piilota SSID on päällä",
			ENCRYPTION: 				"Salaus ei ole oikea",
			WPS: 						"WPS on poissa käytöstä Järjestelmäparametrit-sivulla",

			
			STATUS_CONN_OVERLAP: 		"Yhteys epäonnistui (LOMITTAINEN).",
			STATUS_CONN_TIMEOUT: 		"Yhteys epäonnistui (AIKAKATKAISU).",
			STATUS_CONN_INACT: 			"Yhteys ei ole käytössä."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Langattomat asemat verkossa",
			CLIENT_NUMBER: 				"Asiakaslaitenumero",
			MAC_ADDRESS: 				"MAC-osoite",
			CONN_TYPE: 					"Yhteystyyppi",
			SECURITY: 					"Suojaus",
			RECEIVED_PACKETS: 			"Vastaanotetut paketit",
			SEND_PACKETS: 				"Lähetyt paketit"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Asetukset",
			
			MODE_2G: 					"2,4 GHz",
			MODE_5G:					"5 GHz",

			ALLOW_EACH: 				"Anna vieraiden nähdä toisensa",

			ALLOW_LOCAL: 				"Anna vieraiden käyttää paikallsverkkoa",
			
			WIRELESS: 					"Langaton yhteys",
			WIRELESS_24G_RADIO: 		"Langaton 2,4 GHz",
			WIRELESS_5G_RADIO: 			"Langaton 5 GHz",
			ENABLE_GUEST: 				"Ota vierasverkko käyttöön",

			NAME_SSID: 					"Langattoman verkon nimi (SSID)",
			HIDE_SSID: 					"Piilota SSID",
			PASSWORD_CHANGE_CYCLE: 		"Salasanan päivitysväli",
			PER_DAY: 					"Päivittäinen",
			PER_WEEK: 					"Viikoittain",
			PER_MONTH: 					"Kuukausittain",
			NEVER: 						"Ei koskaan",
			SECURITY: 					"Suojaus",
			NO_SECURITY: 				"Ei suojausta",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 – Personal",

			VERSION: 					"Versio",
			AUTO: 						"Automaattinen",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Salaus",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Salasana"
		},

		NAT:{
			SETTINGS: 					"Laitteisto-NAT",
			STATUS: 					"Laitteisto-NAT",
			
			ALG_TITLE: 					"ALG (Application Layer Gateway)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP-läpivienti",
			L2TP_ALG: 					"L2TP-läpivienti",
			IPSEC_ALG: 					"IPSec-läpivienti",

			ENABLE_FTP_ALG: 			"Ota FTP ALG käyttöön",
			ENABLE_TFTP_ALG: 			"Ota TFTP ALG käyttöön",
			ENABLE_H323_ALG: 			"Ota H323 ALG käyttöön",
			ENABLE_RTSP_ALG: 			"Ota RTSP ALG käyttöön",
			ENABLE_PPTP_ALG: 			"Ota PPTP-läpivienti käyttöön",
			ENABLE_L2TP_ALG: 			"Ota PPTPL2TP-läpivienti käyttöön",
			ENABLE_IPSEC_ALG: 			"Ota IPSec-läpivienti käyttöön",
			NAT_ENABLE_NOTICE: 			"Huomautus: Kokoonpanosi ei astu voimaan ennen kuin NAT-toiminto otetaan käyttöön."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Virtuaalipalvelimet",

			SERVICE_NAME: 				"Palvelun tyyppi",
			EXTERNAL_PORT: 				"Ulkoinen portti",
			INTERNAL_IP: 				"Sisäinen IP",
			INTERNAL_PORT: 				"Sisäinen portti",
			PROTOCAL: 					"Protokolla",

			BTN_VIEW: 					"Näytä olemassa olevat palvelut",

			EXSITTING_SERVICE: 			"Olemassa olevat palvelut",
			
			PROTOCAL_ALL: 				"KAIKKI",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX tai XX)",
			EXT_PORT_TIPS: 				"(XX tai XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX tai tyhjä,1-65535)",

			NOTICE:						"Ristiriidassa etähallintaportin kanssa. Haluatko varmasti jatkaa?",
			NOTICE_INVALID_REMOTE:		"Etähallinta ei kelpaa, koska portti 80 on ristiriidassa virtuaalipalvelimen kanssa. Vaihda etähallintaportti.",
			NOTICE_ENTER_ANOTHER:		"Ristiriidassa etähallintaportin kanssa. Valitse toinen portti.",
			NOTICE_PPTP_CONFLICT:		"Ristiriidassa PPTP VPN -portin kanssa. Valitse toinen portti.",
			NOTICE_OPENVPN_CONFLICT:	"Ristiriidassa OPENVPN-portin kanssa. Valitse toinen portti.",


			ENABLE_THIS_ENTRY: 			"Ota käyttöön",
			OPERATION: 					"Toiminta",
			CHOOSE: 					"Valitse",
			NAT_ENABLE_NOTICE: 			"Huomautus: Kokoonpanosi ei astu voimaan ennen kuin NAT-toiminto otetaan käyttöön."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port Triggering",
			APPLICATION: 				"Sovellus",
			TRIGGER_PORT: 				"Triggering Port",
			TRIGGER_PROTOCOL: 			"Triggering-protokolla",

			EXTERNAL_PORTS: 			"Ulkoinen portti",
			EXTERNAL_PROTOCOL: 			"Ulkoinen protokolla",

			BTN_VIEW: 					"Näytä olemassa olevat sovellukset",

			EXSITTING_APPLICATION: 		"Olemassa olevat sovellukset",
			APPLICATION_NAME: 			"Sovelluksen nimi",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX tai XX-XX,1-65535,enintään 5 paria)",
			
			NOTICE_PPTP_CONFLICT:		"Ristiriidassa PPTP VPN -portin kanssa. Valitse toinen portti.",
			NOTICE_OPENVPN_CONFLICT:	"Ristiriidassa OPENVPN-portin kanssa. Valitse toinen portti.",
			
			ENABLE_THIS_ENTRY: 			"Ota käyttöön",
			OPERATION: 					"Toiminta",
			
			PROTOCAL_ALL: 				"KAIKKI",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Huomautus: Kokoonpanosi ei astu voimaan ennen kuin NAT-toiminto otetaan käyttöön."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Ota DMZ käyttöön",
			HARDWARESTATUS: 			"DMZ-isännän IP-osoite",
			NAT_ENABLE_NOTICE: 			"Huomautus: Kokoonpanosi ei astu voimaan ennen kuin NAT-toiminto otetaan käyttöön."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP-palveluluettelo",
			CLIENT_NUMBER: 				"Asiakaslaitenumero",
			SERVICE: 					"Palvelun kuvaus",
			EXTERNAL_PORT: 				"Ulkoinen portti",
			PROTOCAL: 					"Protokolla",
			IP_ADDR: 					"Sisäinen IP-osoite",
			INTERNAL_PORT: 				"Sisäinen portti",
			NAT_ENABLE_NOTICE: 			"Huomautus: Kokoonpanosi ei astu voimaan ennen kuin NAT-toiminto otetaan käyttöön."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB-modeemi",
			LOCATION: 					"Sijainti",
			MOBILE_ISP: 				"Mobiili-ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Yhteystila",
			CONNECT_ON_DEMAND: 			"Yhdistä tarvittaessa",
			CONNECT_AUTOMATICALLY: 		"Yhdistä automaattisesti",
			CONNECT_MANUALLY: 			"Yhdistä manuaalisesti",
			MAX_IDLE_TIME: 				"Suurin käyttämättömyysaika",
			CONNECTION_TIP: 			"Nykyinen Internet-käyttö on WAN Preferred.",
			IDLE_TIME_TIP: 				"Yhteystilaa ja suurinta käyttämättömyysaikaa ei voi määrittää manuaalisesti.",
			MINUTES: 					"minuuttia. (0 tarkoittaa aktiivinen aina.)",

			AUTHENTICATION_TYPE: 		"Todennustyyppi",
			AUTO: 						"Automaattinen",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Oletus on Auto, älä muuta ellei välttämätöntä.",

			CONNECT: 					"Yhdistä",
			DISCONNECT: 				"Katkaise yhteys",

			SET_TIP: 					"Määritä Soita numeroon, APN, Käyttäjätunnus ja Salasana manuaalisesti.",
			DIAL_NUMBER: 				"Soita numeroon",
			APN: 						"APN",
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			OPTIONAL: 					"(valinnainen)",
			MTU_SIZE: 					"MTU-koko (tavuissa)",
			MTU_SIZE_TIP: 				"Oletus on 1480, älä muuta ellei välttämätöntä.",

			USE_FOLLOW_DNS_SERVER: 		"Käytä seuraavia DNS-palvelimia",
			PRIMARY_DNS: 				"Ensisijainen DNS",
			SECOND_DNS: 				"Toissijainen DNS",

			UNPLUGGED: 					"Irrotettu",
			IDENTIFYING: 				"Tunnistetaan...",
			IDENTIFY_SUCCESS: 			"Tunnistus onnistui"
		},

		DISK_SETTING: {
			DISK_SET: 					"Laitteen asetukset",
			SCAN: 						"Skannaa",
			SELFLY_REMOVE: 				"Poista turvallisesti",
			SCAN_RESULT: 				"Löytyi %n levy",
			NOT_FOUND: 					"Ei löydy",
			SELFLY_REMOVE: 				"Poista turvallisesti",
			
			VOLUMN: 					"Asema",
			CAPACITY: 					"Kapasiteetti",
			FREESPACE: 					"Vapaa tila",
			USBSPACE: 					"Käytetty tila",
			
			STATUS: 					"Tila",
			INACT: 						"Poista käytöstä",
			ACTIVE: 					"Käytössä",
			
			USAGE: 						"Käyttö",
			CAPACITY: 					"Kapasiteetti",
			OPERATION: 					"Toiminta",	
			
			ACC: 						"Tilinhallinta", 	 	
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			USE_LOGIN: 					"Käytä kirjautunutta käyttäjää",
			SCAN: 						"Skannaa",
			ENJECT_ALL: 				"Poista kaikki",
			ENJECT: 					"Poista",
			ADD_USER: 					"Lisää käyttäjä",
			AUTH: 						"Valtuudet"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline-lataus",
			ITEMS:						"Tuotteet",
			FILE:						"Tiedosto",
			FOLDER:						"Kansio",
			SIZE:						"Koko",
			STATUS:						"Tila",
			DOWNLOAD:					"Lataa",
			REMAINTING:					"Jäljellä oleva aika",
			SPEED:						"Nopeus",
			SOURCE:						"Lähde",	
			DOWNLOADTO:					"Lataa kohteeseen",	
			TORRENT_PC:					"Virta PC:ltä",
			TORRENT_USB:				"Virta USB:ltä",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMulen TCP-portti",
			AMULEUDP:					"aMulen UDP-portti",
			AMULESERVER:				"aMule-palvelin",
			SCHEDULE:					"Aikataulu",
			MAXACTIVE:					"Aktiivisten tehtävien maksimimäärä",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Aikavyöhyke",
			DOWNLOADTIME:				"Latausaika",
			REPEAT:						"Toista",
			SPEEDLIMIT:					"Nopeusrajoitukset",
			MAXDOWNLOAD:				"Suurin latausnopeus",
			MAXUPLOAD:					"Suurin lähetysnopeus",
			SPEEDTIPS:					"(0 tarkoittaa rajaton.)",
			BTPORT:						"BT-latausportti",
			SEED:						"Jatka alkuarvon antamista tehtävän suorittamisen jälkeen",
			UNIT:						"KB/S",
			MODIFY:						"Muokkaa",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Torrentin sijainti",
			CONNECT:					"Yhdistetty",
			DISCONNECTED:				"Yhteys katkaistu",
			CONNECTING:					"Yhdistetään",
			GENERAL:					"Yleistä",
			COMPLETED:					"Valmis",
			NEWDEVICE:					"Uusi laite",
			FOUNDUSB:					"Löytyi uusi USB",
			CONNECTEDPEERS:				"Yhdistetyt vertaislaitteet",
			OF:							"/",
			NUM_OF_CON:					"Yhteyksien määrä",
			NUM_OF_CON_G:				"Yhteyksien globaali maksimimäärä",
			NUM_OF_CON_PT:				"Yhdistettyjen vertaislaitteiden maksimimäärä virtaa kohden",
			EN_DHT_NET:					"Ota DHT-verkko käyttöön",
			EN_PE_EX:					"Ota vertaislaitteiden vaihto käyttöön",
			EN_BT:						"Ota BitTorrent-protokollan salaus käyttöön",
			GENERAL_SETTINGS:			"Yleisasetukset",
			BT_SETTINGS:				"BT-asetukset",
			AMULE_SETTINGS:				"aMule-asetukset",
			CLEAN:						"Poisto suoritettu",
			NONE_COMPLETE: 				"Ei suoritettua tehtävää."
		},

		FOLDER: {
			TITLE: 						"Jakoasetukset",
			ACCOUNT_TITLE: 				"Jakotili",
			ACCOUNT:					"Tili",
			AC_NOTE: 					"Valmistele tili sisällön jakamiselle. Voit käyttää kirjautumistiliä tai luoda uuden.",
			
			AC_LOGIN: 					"Käytä oletustiliä",
			AC_FOLLOW: 					"Käytä uutta tiliä",

			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",
			CONFIRM: 					"Vahvista salasana",

			SHARING_SETTING: 			"Jakoasetukset",
			SERVER_NAME: 				"Verkon/mediapalvelimen nimi",

			METHOD: 					"Käyttömenetelmä",
			LINK: 						"Linkki",
			PORT: 						"Portti",

			NETWORK_NEIGHBORHOOD: 		"Verkkoympäristö",
			FTP: 						"FTP",
			FTPEX: 						"FTP (Internetin kautta)",

			SHARE_FOLDER: 				"Kansion jakaminen",
			SHAREING_ALL: 				"Jaa kaikki",
			NOTE:  						"Valitse On jakaaksesi kaikki tiedostot ja kansiot tai jätä Off jakaaksesi vain valitut kansiot.", 
			ENABLE_AUTHENTICATION: 		"Ota todennus käyttöön",
			SHAREING_FOLDER: 			"Kansioiden jakaminen",
			
			SHARE_NAME: 				"Kansion nimi",
			FOLDER_PATH: 				"Kansion polku",
			VOLUMN_NAME: 				"Aseman nimi",

			SHARE_NAME: 				"Kansion nimi",
			FOLDER_PATH: 				"Kansion polku",
			MEDIA_SHARING: 				"Median jakaminen",
			STATUS: 					"Tila",

			GUEST_ACCESS: 				"Salli vierasverkkokäyttö",
			ENABLE_AUTHENTICATION: 		"Ota todennus käyttöön",
			ENABLE_WRITE_ACCESS: 		"Ota kirjoitusoikeus käyttöön",
			ENABLE_MEDIA_SHARE: 		"Ota median jakaminen käyttöön",
			
			BROWSE: 					"Selaa",
			BROWSE_TITLE: 				"Valitse kansio",

			NO_VOLUMN:					"Ei asemaa",
			
			NOTICE: 					"Haluatko varmasti siirtyä dynaamisen DNS:n sivulle? Paina Tallenna tallentaaksesi ja siirtyäksesi. Paina Poistu poistuaksesi tallentamatta. Paina Peruuta jäädäksesi.",
			NO_CHANGE_NOTICE: 			"Haluatko varmasti siirtyä dynaamisen DNS:n sivulle?",

			SAVE_FAILED_NOTICE: 		"Tallennus epäonnistui",
			CONTINUE: 					"Poistu",
			CONTINUE_SAVE: 				"Tallenna",
			CANCLE: 					"Peruuta",

			ENABLE: 					"Ota käyttöön"

		},

		PRINT:{
			TITLE: 						"Tulostinpalvelin",
			NAME: 						"Tulostimen nimi",
			ENABLE_PRINT_SERVER: 		"Tulostinpalvelin",
			NONE: 						"Ei mitään",
			
			NOTE_TITLE: 				"Huomautus:",
			STEP1: 						"Vaihe 1:",
			STEP2: 						"Vaihe 2:",
			STEP3: 						"Vaihe 3:",

			NOTE1: 						"Asenna tulostimen ohjain tietokoneeseen",
			NOTE2: 						"Kytke USB-tulostin reitittimen USB-porttiin USB-kaapelilla.",
			NOTE3: 						"Asenna TP-LINK USB Printer Controller -apuohjelma. Lataa se viralliselta sivustoltamme: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/fi/Support/\">http://www.tp-link.com/fi/Support/</a>.",
			NOTE3_US: 					"Asenna TP-LINK USB Printer Controller -apuohjelma. Voit ladata sen viralliselta sivustoltamme: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Lapsilukko",
			STATUS: 					"Lapsilukko",
			UNKNOWN: 					"Tuntematon",

			DEVICE_CTR: 				"Lapsilukituksen alaiset laitteet",
			DEVICE: 					"Laitteen nimi",
			MAC_ADDRESS: 				"MAC-osoite",
			TIME: 						"Internetin käyttöaika",
			DESCRIPTION: 				"Kuvaus",
			
			ENABLE_THIS_ENTRY: 			"Ota käyttöön",
			OPTIONAL: 					"(valinnainen)",
			BTN_VIEW: 					"Näytä olemassa olevat laitteet",
			
			DEVICE_LIST: 				"Laiteluettelo",
			SYSTEM_TIME: 				"Järjestelmän kellonaika",
			
			RESTR: 						"Sisältörajoitus",
			MODE: 						"Rajoitus",
			BLACKMODE: 					"Musta lista",
			WHITEMODE: 					"Valkoinen lista",
			ACCESS_DEVICES_LIST: 		"Käytä laiteluetteloa",
			
			CHOOSE: 					"Valitse",
			ADD_A_NEW_KEYWORD: 			"Lisää uusi estettävä avainsana",
			ADD_A_NEW_DOMAIN_NAME: 		"Käyttö edellyttää uuden verkkotunnuksen lisäämistä",
			
			YOURPC:						"PC:si"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internet",
			ROUTER: 					"Reititin",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Muut",

			DEVICE: 					"Laite",
			RATE: 						"Arvostele",
			APPLICATION: 				"Sovellus",

			NAME: 						"Nimi",
			MAC_ADDRESS: 				"MAC-osoite",
			IP_ADDRESS: 				"IP-osoite",


			DEVICES: 					"Laitteet"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Kaistanleveys",
			TEST_BANDWIDTH: 			">Testaa kaistanleveys",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Ota streamboost käyttöön",
			UP_LIMITATION: 				"Lähetysrajoitus (Mbps)",
			DOWN_LIMITATION: 			"Latausrajoitus (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Suorita kaistanleveystesti",
			TESTING: 					"Testataan",
			TEST_FAILED: 				"Testiä ei läpäisty",
			TEST_SUCCEED: 				"Testi onnistui",
			ENABLE_AUTOMATIC_TEST: 		"Ota automaattinen testaus käyttöön",
			KEEP_UP_TO_DATE: 			"Pidä StreamBoost ajan tasalla",
			ENABLE_AUTOMATIC_UPDATE: 	"Ota automaattinen päivitys käyttöön"

		},

		PRIORITY:{
			PRIORITY: 					"Prioriteetti",
			PRIORITY_TIPS: 				"Prioriteetilla voit muuttaa yhden laitteen tärkeyttä toiseen nähden. Tästä on hyötyä, kun laitteet kilpailevat kaistanleveydestä saman luokan sovellusten kanssa.",
			ALL_DEVICE: 				"Kaikki laitteet",
			ACTIVE_DEVICE: 				"Aktiivinen laite",
			SAVE: 						"Tallenna",
			ID: 						"Tunnus",
			DEVICE: 					"Laite",
			TYPE: 						"Tyyppi",
			MAC_ADDRESS: 				"MAC-osoite",
			STICK: 						"Liitä"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Tilastotiedot",
			UP_TIME: 					"Käyttöaika",
			DOWNLOADS: 					"Lataukset",
			LAST_DAY: 					"Eilinen",
			LAST_WEEK: 					"Viime viikko",
			LAST_MONTH: 				"Viime kuu",
			ALL_LAN_HOSTS: 				"Kaikki LAN-isännät",
			OTHER: 						"Muu"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Palomuuri",
			ENABLE_SPI: 				"SPI-palomuuri",

			DOS_PROTECTION: 			"DoS-suojaus",
			ENABLE_DOS: 				"DoS-suojaus",
			
			OFF: 						"Pois",
			LOW: 						"Matala",
			MIDDLE: 					"Keskitaso",
			HIGH: 						"Korkea",

			ICMP: 						"ICMP-FLOOD-suojausten suodatus",
			UDP: 						"UDP-FLOOD-suojausten suodatus",
			TCP: 						"TCP-SYN-FLOOD-suojausten suodatus",
			ENABLE_DOS_TIP:             "DoS-suojaus ja Liikennetilastot on oltava käytössä samanaikaisesti.",

			IGNORE: 					"Ohita WAN-portin ping-paketti",
			FORBID: 					"Kiellä LAN-portin ping-paketti",

			BLOCK_DOS: 					"Estettyjen DoS-isäntien luettelo",
			HOST_NUMBER: 				"Isännän numero",
			IP_ADDRESS: 				"IP-osoite",
			MAC_ADDRESS: 				"MAC-osoite"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Käytönohjaus",
			ENABLE_ACCESS: 				"Käytönohjaus",

			ACCESS_MODE: 				"Käyttötila",
			DEFAULT_ACCESS_MODE: 		"Oletuskäyttötila",
			BLACK_LIST: 				"Musta lista",
			WHITE_LIST: 				"Valkoinen lista",
			
			WIRED:						"Langallinen",
			WIRELESS:					"Langaton",

			DEVICE_ONLINE: 				"Verkon laitteet",
			NAME: 						"Laitteen nimi",
			IP_ADDRESS: 				"IP-osoite",
			MAC_ADDRESS: 				"MAC-osoite",
			CONN_TYPE: 					"Yhteystyyppi",

			BLOCK: 						"Estä",

			DEVICE_IN_WHITE: 			"Valkoisen listan laitteet",
			DEVICE_IN_BLACK: 			"Mustan listan laitteet"
		},

		IP_MAC:{
			TITLE: 						"Asetukset",
			ENABLE_ARP: 				"ARP-sidonta",

			ARP_LIST: 					"ARP-luettelo",
			ARP_NUM: 					"ARP-syötenumero",

			MAC_ADDRESS: 				"MAC-osoite",
			IP_ADDRESS: 				"IP-osoite",
			BOUND: 						"Sidottu",
			UNBOUND: 					"Sitomaton",

			BINDING_LIST: 				"Sidontaluettelo",
			DESCRIPTION: 				"Kuvaus",
			OPTIONAL: 					"(valinnainen)",
			ENABLE_THIS_ENTRY: 			"Ota käyttöön"
		},

		TIMESET: {
			TITLE: 						"Aika-asetukset",
			ZONE: 						"Aikavyöhyke",
			DATE: 						"Päivämäärä",
			DATEFORMAT: 				"KK/PP/VVVV",
			TIME: 						"Aika",
			TIMEFORMAT: 				"(TT/MM/SS)",
			NTP1: 						"NTP-palvelin 1",
			NTP2: 						"NTP-palvelin II",
			OPTIONAL: 					"(valinnainen)",

			CURRENT_TIME:  				"Nykyinen aika",
			SET_TIME: 					"Aseta aika",
			AUTOMATIC: 					"Hanki automaattisesti Internetistä",
			MANUAL: 					"Manuaalisesti",
			AUTOMATIC_BTN: 				"Hanki",


			GETGMT: 					"Hanki GMT",

			
			GETGMT_SUCCESS: 			"Ajan hankkiminen NTP-palvelimelta onnistui",
			GETGMT_TIMEOUT: 			"Ajan hankkiminen NTP-palvelimelta aikakatkaistiin",
			GETGMT_WAIT: 				"Odotetaan",
			
			M: 							"K",
			W: 							"V",
			D: 							"P",
			H: 							"T",
			
			DAYLIGHT_SAVING: 			"Kesäaika",
			ENABLE_DAYLIGHT: 			"Ota kesäaika käyttöön",
			START: 						"Aloita",
			END: 						"Lopeta",

			RUNNING_STATUS: 			"Suoritustila",
			DOWN: 						"Kesäaika ei toimi",
			UP: 						"Kesäaika toimii"
		},

		DIAG:{
			TITLE: 						"Diagnostiikka",
			DIAGNOSTIC_TOOL: 			"Diagnoosityökalu",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"IP-osoite/toimialueen nimi",
			COUNT: 						"Ping-määrä",
			
			BASIC: 						"Perusasetukset",
			ADVANCED: 					"Lisäasetukset",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Ping-paketin koko",
			PKTUNIT: 					"(4-1472 tavua)",

			TIMEOUT: 					"Ping-aikakatkaisu",
			TIMOUTUNIT: 				"(100-2000 millisekuntia)",

			TTL: 						"Traceroute Max TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Aloita",
			STOP: 						"Lopeta"
		},

		FIRMWARE:{
			TITLE: 						"Laiteohjelmiston päivitys",
			FIRMWARE_INFO:  			"Laiteohjelmistosi on ajan tasalla",
			INFO: 						"Laitetiedot",
			REMOTE_TITLE: 				"Online-päivitys",
			LOCAL_TITLE: 				"Paikallinen päivitys",

			NEWFILE: 					"Uusi laiteohjelmistotiedosto",
			FIRMWAREVERSION: 			"Laiteohjelmaversio",
			HARDWAREVERSION: 			"Laitteistoversio",
			LATESTVERSION: 				"Viimeisin versio",
			CONFIRM_CONTENT:			"Haluatko varmasti päivittää laiteohjelmiston?",
			WARNING:					"Laiteohjelmistoa päivitetään... <br/> Välttääksesi vauriot pidä laite käynnissä ja odota tekemättä mitään tämän prosessin ajan.",
			REBOOTING: 					"Käynnistyy uudelleen... <br/> Välttääksesi vauriot pidä laite käynnissä ja odota tekemättä mitään tämän prosessin ajan.",
			DO_NOT_OPERATE: 			"Päivitetään... <br/>ÄLÄ käytä tämän aikana.",
			FIRMWARE_UPDATING_NOTE: 	"1.Laiteohjelmistoa päivitetään...",
			REBOOTING_NOTE: 			"2.Käynnistyy uudelleen...",
			SCREEN_UPDATING_NOTE: 		"3.Näyttöä päivitetään...",
			UPGRADE_FAILED: 			"Päivitys epäonnistui.",
			UPGRADE: 					"Päivitä",
			CHECK: 						"Tarkista",
			DOWNLOADING: 				"Ladataan...",
			UPGRADE_INOF: 				"Pidä reititin käynnissä välttyäksesi vauriot.",
			NOTE: 						"Huomautus: ",
			NO_UPGRADE: 				"Tämä on uusin versio",

			UPGRADING: 					"Päivitetään...",
			RETRY: 						"Yritä uudelleen",
			CANCEL: 					"Peruuta",
			ILEGAL_DEVICE:				"Laitetta ei voi tunnistaa. Ota yhteys TP-LINKin tekniseen tukeen.",
			UPGRADE_FAIL: 				"Päivitys ei onnistu. Yritä uudelleen myöhemmin.",
			CHECK_UPGRADE:				"Tarkista päivityksen saatavuus"
		},

		BACKUP:{
			BACKUP: 					"Varmuuskopiointi",
			BACKUPTIP: 					"Tallenna kopio nykyasetuksista.",

			RESTORE: 					"Palauta",
			RESTORETIP: 				"Palauta tallennetut asetukset tiedostosta.",
			
			RESTORE_WARN:				"Reititintä palautetaan... <br/>Älä käytä laitetta tämän aikana.",
			RESTORE_CONFIRM_CONTENT: 	"Haluatko varmasti palauttaa reitittimen varmuuskopiointitiedostosta?",
			
			FILE: 						"Tiedosto",

			FACTORY: 					"Tehdasasetusten palautus",
			FACTORYTIP: 				"Palauta kaikki kokoonpanoasetukset oletusarvoihin.",
			FACTORY_CONFIRM_CONTENT:	"Haluatko varmasti palauttaa reitittimen tehdasasetuksiin?",
			FACTORY_WARN:				"Reititintä palautetaan... <br/>Älä käytä laitetta tämän aikana.",
			
			BACKUPBTN: 					"Varmuuskopiointi",
			RESTOREBTN: 				"Palauta",
			FACTORYBTN: 				"Tehdasasetusten palauttaminen"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Tilinhallinta",
			
			OLDUSER: 					"Vanha käyttäjätunnus",
			OLDPWD: 					"Vanha salasana",

			NEWUSER: 					"Uusi käyttäjätunnus",
			NEWPWD: 					"Uusi salasana",
			CONFIRM: 					"Vahvista uusi salasana",

			RECOVERYINFO: 				"Salasanan palauttaminen",
			ENABLE_PASSWORD_RECOVERY: 	"Ota salasanojen palautus käyttöön",
			FROM: 						"Mistä",
			TO: 						"Mihin",
			SMTP_SERVER: 				"SMTP-palvelin",
			
			ENABLE_AUTHENTICATION: 		"Ota todennus käyttöön",
			USERNAME: 					"Käyttäjätunnus",
			PASSWORD: 					"Salasana",

			TEST_MAIL: 					"Testaa posti",

			LOCAL:						"Paikallinen hallinta",
			LOCAL_MAC_AUTH: 			"Paikallinen MAC-todennus",
			ACCESS: 					"Pääsy kaikille LAN-verkkoon yhdistetyille laitteille",
			ACCESS_TIPS: 				"Kytke On ottaaksesi käyttöön kaikkien LAN-verkon laitteiden hallinnan tai Off ottaaksesi käyttöön tietyn laitteen hallinnan.",
			
			MAC_ADDRESS: 				"MAC-osoite",
			VIEW_BTN: 					"Näytä olemassa olevat laitteet",
			DESCRIPTION: 				"Kuvaus",

			EXIST_DEVICE:               "Olemassa olevat laitteet",

			OPTIONAL: 					"(valinnainen)",
			ENABLE_THIS_ENTRY: 			"Ota käyttöön",

			DEVICE_NAME:				"Laitteen nimi",
			IP_ADDRESS:					"IP-osoite",
			

			REMOTE: 					"Etähallinta",
			DISABLE_REMOTE_MANAGEMENR: 	"Poista etähallinta käytöstä",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Ota etähallinta käyttöön kaikille laitteille",
			ENABLE_REMOTE_MANAGEMENR: 	"Ota etähallinta käyttöön tietyille laitteille",
			WEB: 						"Verkkohallintaportti",

			NOTICE:						"Ristiriidassa virtuaalipalvelimen portin kanssa! Haluatko varmasti jatkaa?",
			NOTICE_ENTER_ANOTHER:		"Ristiriidassa virtuaalipalvelimen portin kanssa. Valitse toinen portti.",

			REMOTEIP: 					"Etähallinnan IP-osoite",
			REMOTEIPNOTE: 				"(Syötä kaikkiin 255.255.255.255)"
			
		},

		SYSLOG:{
			TITLE: 						"Järjestelmäloki",
			LOG_FILTER: 				"Lokisuodatin:",
			
			TYPE_EQ: 					"Tyyppi=",
			
			ALL: 						"KAIKKI",

			FIREWALL: 					"Palomuuri", 
			NAT: 						"NAT",
			DDNS: 						"Dynaaminen DNS",
			UPNP:						"UPnP",
			IMB:            			"IP- ja MAC-sidonta",
			IPTV:						"IPTV",
			DHCPS:						"DHCP-palvelin",
			IGMP_PROXY:					"IGMP-välityspalvelin",
			DOMAIN_LOGIN:				"Toimialueen kirjautuminen",
			BASIC_SECURITY: 			"Perussuojaus",
			PARENTAL_CONTROL: 			"Käytönvalvonta",
			ACCESS_CONTROL: 			"Käytönohjaus",
			DOS_PROTECTION: 			"DoS-suojaus",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Liikennetilastot",
			TIME_SETTINGS: 				"Aika-asetukset",
			ACCOUNT_MANAGEMENT: 		"Tilinhallinta",
			LOCAL_MANAGEMENT: 			"Paikallinen hallinta",
			REMOTE_MANAGEMENT: 			"Etähallinta",
			LOCALE: 					"Paikka",
			FACTORY_RESET: 				"Tehdasasetusten palautus",
			LED_CONTROLLER: 			"Led-ohjain",
			NETWORK: 					"Verkko",
			USBSHARE: 					"USB-osuus",
			AND: 						"ja",
			LEVEL: 						"Taso",
			EMERGENCY:					"HÄTÄ-",
			ALERT:						"ILMOITUS",
			CRITICAL:					"KRIITTINEN",
			ERROR: 						"VIRHE",
			WARNING: 					"VAROITUS",
			NOTICE: 					"HUOMAUTUS",
			INFO: 						"INFO",
			DEBUG: 						"VIRHEENKORJAUS",

			INDEX: 						"Hakemisto",
			TYPE: 						"Tyyppi",
			TIME: 						"Aika",
			LEVEL_COL:					"Taso",

			CONTENT: 					"Lokin sisältö",
			
			MAIL_LOG: 					"Postiloki",
			SAVE_LOG: 					"Tallenna loki",

			SEND_OK: 					"Lähetys OK",
			SEND_FAILED: 				"Lähetys epäonnistui",

			MAIL_SETTING: 				"Postiasetukset",

 			FROM: 						"Mistä",
 			TO: 						"Mihin",
 			SMTP_SERVER: 				"SMTP-palvelin",
 			ENABLE_AUTHENTICATION: 		"Ota todennus käyttöön",

 			USERNAME: 					"Käyttäjätunnus",
 			PASSWORD: 					"Salasana",
 			CONFIRM_PASSWORD: 			"Vahvista salasana",

 			AUTO_MAIL: 					"Ota automaattinen posti käyttöön",
 			LOG_AT: 					"Kirjaudu kohteeseen",
 			HH_MM: 						"(TT:MM) joka päivä",

 			LOG_EVERY: 					"Kirjaa joka",
 			HOURS: 						"tuntia"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Asetukset",
			STATUS: 					"Ota QoS käyttöön",
			UPBANDWIDTH: 				"Lähetyskaistanleveys",
			DOWNBANDWIDTH: 				"Latauskaistanleveys",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Nopeustesti",
			RULE_LIST: 					"QoS-sääntöluettelo",
			RULE: 						"QoS-sääntö",
			ID: 						"Tunnus",
			NAME: 						"Nimi",
			TYPE: 						"Tyyppi",
			DETAIL: 					"Yksityiskohta",
			PRIORITY: 					"Prioriteetti",

			APPLICATION: 				"Sovellus",
			APPLICATION_LIST: 			"Ohjelmaluettelo",
			CUSTOM_APP: 				"Mukautettu sovellus",
			MAC_ADDR: 					"MAC-osoite",
			MAC_ADDR_P: 				"Mac:",
			IP_ADDR: 					"IP-osoite",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Fyysinen portti",

			LOW: 						"Matala",
			MIDDLE: 					"Keskitaso",
			HIGH: 						"Korkea",

			PROTO: 						"Protokolla",
			PORT: 						"Portti",
			PROTO_P: 					"Protokolla:",
			PORT_P: 					"Portti:",
			PORT_TIPS: 					"(XX tai XX-XX,1-65535,enintään 5 paria)",

			ALL: 						"KAIKKI",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP tai UDP:",
			CUSTOM: 					"Mukautettu",

			WIFI_HOME: 					"WIFI-ISÄNTÄ",
			WIFI_GUEST: 				"WIFI-VIERAS",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Tietokannan päivitys",

			NEWFILE: 					"Uusi tietokantatiedosto",
			FIRMWAREVERSION: 			"Tietokannan versio",
			CONFIRM_CONTENT:			"Haluatko varmasti päivittää tietokannan?",
			WARNING:					"Tietokantaa päivitetään... <br/>Älä käytä laitetta tämän aikana.",
			
			UPGRADE: 					"Päivitä",

			SERVICE_RESTART: 			"QoS-palvelu käynnistyy uudelleen",
			
			TYPE: 						"Tyyppi",
			BY_DEVICE: 					"Laitteen mukaan",
			BY_APP: 					"Sovelluksen mukaan",
			BY_PHY: 					"Fyysisen portin mukaan",

			HIGH_PRIORITY_LBL: 			"Suuri prioriteetti:",
			MIDDLE_PRIORITY_LBL: 		"Keskitason prioriteetti:",
			LOW_PRIORITY_LBL: 			"Alhainen prioriteetti:",

			HIGH_PRIORITY: 				"Suuri prioriteetti",
			MIDDLE_PRIORITY: 			"Keskitason prioriteetti",
			LOW_PRIORITY: 				"Alhainen prioriteetti"

		},

		APPLICATION:{
			APP_LIST: 					"Sovellusluettelo",
			GAME_LIST: 					"Peliluettelo",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Liikennetilastot",
			ENABLE_STATISTICS: 			"Liikennetilastot",

			TITLE: 						"Liikennetilastoluettelo",
			IP_MAC: 					"IP-osoite/Mac-osoite",
			TPKT: 						"Paketteja kaikkiaan",
			TBYTE: 						"Tavuja kaikkiaan",
			CPKT: 						"Nykyiset paketit",
			CBYTE: 						"Nykyiset tavut",
			CICMP: 						"Nykyinen ICMP Tx",
			CUDP: 						"Nykyinen UDP Tx",
			CSYN: 						"Nykyinen SYN Tx",
			
			DELETE_CONFIRM: 			"Haluatko varmasti poistaa liikennetilastot?",
			DELETE_ALL_CONFIRM: 		"Haluatko varmasti poistaa kaikki liikennetilastot?",

			RESET_ALL: 					"Nollaa kaikki"
		},

		SYSPARA:{
			W24G: 						"Langaton 2,4 GHz",
			W5G: 						"Langaton 5 GHz",
			W60G: 						"60 GHz:n langaton verkko",
			W24G_WDS: 					"2,4 GHz WDS",
			W5G_WDS: 					"5 GHz WDS",
			W60G_WDS: 					"60 GHz:n WDS",
			SWITCH_NOTICE:  			"Langaton toiminto on poissa päältä. Jos haluat käyttää tätä toimintoa, kytke Wi-Fi-painike päälle.",

			ENABLE_TIPS: 				"Langaton toiminto on poissa käytöstä.",

			BEACON: 					"Jäljitysväli",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS-kynnys",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Pirstoutuneisuuskynnys",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM-aikaväli",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Ryhmäavaimen päivitysika",
			GROUPUNIT: 					"sekuntia",
			
			MU_MIMO_FEATURE: 			"Usean käyttäjän MIMO",
			MU_MIMO: 					"Ota MU-MIMO käyttöön",
			
			WMM_FEATURE: 				"WMM-ominaisuus",
			WMM: 						"Ota WMM käyttöön",

			GI_FEATURE: 				"Lyhyt GI -ominaisuus",
			GI: 						"Ota lyhyt GI käyttöön",

			AP_FEATURE: 				"AP-eristysominaisuus",
			AP: 						"Ota AP-eristys käyttöön",

			WDS_FEATURE: 				"WDS-välitili",
			WDS: 						"Ota WDS-välitili käyttöön",
			
			SSID_BRIDEGE: 				"SSID (välitili luotava)",
			SURVEY: 					"Kysely",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC-osoite",
			SSID: 						"SSID",
			SIGNAL: 					"Signaali",
			CHANNEL: 					"Kanava",
			SECURITY: 					"Suojaus",
			CHOSEN: 					"Valittu",
			AP_NUMBER:					"AP-numero",

			TOTAL: 						"Yhteensä",

			MAC: 						"MAC-osoite (välitili luotava)",
			MACUNIT: 					"Esimerkki: 00-1D-0F-11-22-33",

			SECURITY: 					"Suojaus",
			NO: 						"Ei",
			NONE: 						"Ei suojausta",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Salasana",
			
			AUTH_TYPE: 					"Todennustyyppi",
			AUTO: 						"Automaattinen",
			OPEN: 						"Avoin järjestelmä",
			SHARED: 					"Jaettu avain",

			WEP_INDEX: 					"WEP-indeksi",
			KEY1: 						"Avain1",
			KEY2: 						"Avain2",
			KEY3: 						"Avain3",
			KEY4: 						"Avain4",

			WEP_KEY_FORMAT: 			"WEP-avaimen muoto",
			ASC: 						"ASCII",
			HEX: 						"Heksadesimaali",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Ota WPS käyttöön",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Ota NAT käyttöön",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Ota NAT Boost käyttöön",
			
			MEDIA_SERVER: 				"Media-palvelin",
			SCAN_INTERVAL: 				"Automaattinen skannausväli (tuntia)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"DoS-suojaustason asetukset",

			ICMP: 						"ICMP-FLOOD-pakettitaso",
			UDP: 						"UDP-FLOOD-pakettitaso",
			TCP: 						"TCP-FLOOD-pakettitaso",

			WDS_MODE: 					"WDS-tila",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Matala",
			MIDDLE: 					"Keskitaso",
			HIGH: 						"Korkea",

			TO: 						"kohtaan",
			NOTICE_NAT_REBOOT: 			"Käynnistyy uudelleen... <br/>Älä käytä uudelleenkäynnistyksen aikana.",

			NOTICE_NAT_BOOST: 			"NAT Boostin muuttaminen saa laitteen käynnistymään uudelleen. Haluatko varmasti jatkaa?",
			NOTICE:						"Reitittimesi kanava ei ole sama kuin sillatun tukiaseman kanava. Haluatko vaihtaa sen?",

			UNIT: 						"(5-7200) pakettia/s",
			LED: 						"Merkkivalo",
			NIGHT_MODE: 				"Yötila",
			PERIOD_NIGHT_TIME: 			"Yötila-aika",
			ENABLE: 					"Ota yötila käyttöön",
			HH_MM: 						"(TT:MM)",
			TO: 						"kohtaan",
			NIGHT_MODE_NOTE:            "Merkkivalo sammutetaan. Jos haluat käyttää tätä toimintoa, paina merkkivalopainiketta tai napsauta sivun oikeassa yläkulmassa olevaa merkkivaloa.",
			NOTE2:                      "Yötila-aika alkaa reitittimen järjestelmäajan mukaisesti. Varmista, että olet määrittänyt reitittimen ajan."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Tällä hetkellä ei sertifikaattia, <b>tuota</b> sertifikaatti ennen VPN-palvelimen käyttöönottoa.",
			NO_CERT_NOTE2: 				"Tällä hetkellä ei sertifikaattia, <b>tuota</b> sertifikaatti ennen kokoonpanon vientiä.",
			ENABLE_VPN_SERVER: 			"Ota VPN-palvelin käyttöön",
			SERVICE_TYPE: 				"Palvelun tyyppi",
			SERVICE_PORT: 				"Palveluportti",
			VPN_SUBNET: 				"VPN:n aliverkon/verkon peite",
			CLIENTS_ACCESS: 			"Asiakaspääsy",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Vain kotiverkko",
			INTERNET_HOME: 				"Internet ja kotiverkko",
			CERT_STR: 					"Tällä hetkellä ei sertifikaattia, napsauta OK luodaksesi sertifikaatti ja tallenna kokoonpano.",
			CERT_STR2: 					"Tällä hetkellä ei sertifikaattia, napsauta OK luodaksesi sertifikaatti ja vie kokoonpano.",
			CONF_FILE: 					"Määritystiedosto", 
			EXPORT_CONF_FILE: 			"Vie kokoonpano.",
			EXPORT: 					"Vie",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Asiakkaan IP-osoite",
			ACCOUNT_USERNAME: 			"Käyttäjätunnus",
			ACCOUNT_PASSWORD: 			"Salasana",
			CLIENT_IP_NOTE: 			"(enintään 10 asiakasta)",
			SAME_SUBNET_NOTE: 			"Asiakaslaitteen IP-osoite ja LAN-verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Anna toinen.",
			CONFLICT_WITH_DHCP: 		"Asiakaslaitteen IP-osoite on ristiriidassa DHCP IP-osoiteryhmän kanssa. <br/>Syötä uudelleen.",
			CONFLICT_WITH_RESERVED: 	"Asiakaslaitteen IP-osoite on ristiriidassa varatun IP-osoitteen kanssa. <br/>Syötä uudelleen.",
			CONFLICT_WITH_OPENVPN: 		"Asiakaslaitteen IP-osoite ja OpenVPN-verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Syötä uudelleen.",
			SAME_SUBNET_NOTE2: 			"VPN:n aliverkon/verkon peite ja LAN-IP-osoite eivät saa olla samassa aliverkossa. <br/>Anna toinen.",
			CONFLICT_WITH_DHCP2: 		"VPN:n aliverkon/verkon peite on ristiriidassa DHCP IP-osoiteryhmän kanssa. <br/>Syötä uudelleen.",
			CONFLICT_WITH_RESERVED2: 	"VPN:n aliverkon/verkon peite on ristiriidassa varatun IP-osoitteen kanssa. <br/>Syötä uudelleen.",
			CONFLICT_WITH_PPTPVPN: 		"VPN:n aliverkon/verkon peite ja PPTP VPN:n IP-osoite eivät saa olla samassa aliverkossa. <br/>Syötä uudelleen.",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN-verkon IP-osoite ja OpenVPN-verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Syötä uudelleen.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN-verkon IP-osoite ja PPTP VPN -verkon IP-osoite eivät saa olla samassa aliverkossa. <br/>Syötä uudelleen.",
			VPN_MASK_ERROR: 			"Verkon peite ei voi olla suurempi kuin 255.255.255.248. <br/>Syötä uudelleen.",
			ACCOUNT_LIST: 				"Tililuettelo (enintään 16 käyttäjää)",
			ADVANCED_SETTING: 			"Lisäasetukset",
			ALLOW_SAMBA: 				"Salli Samba (Network Place) -käyttö",
			ALLOW_NETBIOS: 				"Salli NetBIOS-läpilasku",
			ALLOW_UNENCRYPTED_CONN: 	"Salli salaamattomat yhteydet",
			USERNAME_CONFLICT: 			"Tämä käyttäjätunnus on jo olemassa. Anna toinen.",
				
			NOTICE_VS_CONFLICT:			"Ristiriidassa virtuaalipalvelimen ulkoisen portin kanssa. Valitse toinen portti.",
			NOTICE_PT_CONFLICT:			"Ristiriidassa portintunnistuksen ulkoisen portin kanssa. Valitse toinen portti.",
			NOTICE_VS_MODIFY:			"Ristiriidassa virtuaalipalvelimen ulkoisen portin (1723) kanssa. Siirry sivulle <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Virtual Servers (Virtuaalipalvelimet)</a> ja vaihda virtuaalipalvelimen ulkoinen portti.",
			NOTICE_PT_MODIFY:			"Ristiriidassa portintunnistuksen ulkoisen portin (1723) kanssa. Siirry sivulle <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Port Triggering (Portin tunnistus)</a> ja vaihda portintunnistuksen ulkoinen portti.",
			
			GENERATE_CERT: 				"Sertifikaatti",
			GENERATE_NEW_CERT: 			"Luo sertifikaatti.",
			GENERATE: 					"Luo",
			GENERATE_TIPS: 				"Sertifikaattia luodaan...<br/>Tähän menee muutama minuutti, odota.",
			CERT_SUCCESS: 				"Onnistui",
			CERT_FAIL: 					"Ei onnistunut. Yritä uudelleen.",
			
			VPN_CONNECTIONS: 			"VPN-yhteydet",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN-yhteys",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN -yhteys",
			USER: 						"Käyttäjä",
			REMOTE_IP: 					"Etä-IP",
			ASSIGNED_IP: 				"Määrätty IP"
		}
	};
})(jQuery);
