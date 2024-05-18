(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			FORGET_PASSWORD: 			"Zapomniałeś hasła?",
			LOGIN: 						"Zaloguj",
			IMPORTANT_UPDATE_INFO: 		"Aby uniknąć konfliktu z urządzeniami końcowymi, adres IP routera został zmieniony na",
			CONTINUE: 					"Kontynuuj",

			IMPORTANT_NOTICE: 			"Ważna uwaga",
			OR: 						", czy na pewno chcesz kontynuować przeglądanie",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"Naciśnij i przytrzymaj przycisk Reset przez 10 sekund, aby przywrócić ustawienia fabryczne routera.",
			FORGET_PASSWORD_INFO_1: 	"Jeżeli funkcja Odzyskiwania hasła jest włączona. Na podany adres wysłany zostanie kod weryfikacyjny umożliwiający zresetowanie loginu i hasła.",
			FORGET_PASSWORD_SEND_FAILED:"Nie udało się wysłać kodu! Sprawdź połączenie z Internetem.",

			VERIFICATION_CODE: 			"Kod weryfikacyjny",

			RECEIVE_CODE: 				"Wyślij kod",

			CONFIRM: 					"Potwierdź",

			SEC: 						" ",

			USER_CONFLICT: 				"Konflikt danych logowania!",
			FIRST_TIME: 				"Tutaj możesz zarządzać swoim urządzeniem AD7200 firmy TP-LINK. Aby zacząć, utwórz hasło dla urządzenia.",
			
			USER_CONFLICT_INFO: 		"Użytkownik %USER% hosta %HOST% (%IP%/%MAC%) jest aktualnie zalogowany na routerze. Nie można zalogować się w tym samym czasie. Spróbuj ponownie później.",
			USER_CONFLICT_INFO_1: 		"Użytkownik %USER% (%MAC%) jest aktualnie zalogowany na routerze. Nie możesz zalogować się w tym samym czasie, spróbuj ponownie później.",
			USER_CONFLICT_INFO_2: 		"Użytkownik %USER% (%IP%) jest aktualnie zalogowany na routerze.",
			
			LOGIN_FAILED: 				"Błąd logowania!",
			LOGIN_FAILED_COUNT: 		"Logowanie nie powiodło się %num1 razy, pozostało %num2 prób.",
			NO_COOKIE: 					"Logowanie jest możliwe tylko przy włączonych plikach Cookies. Włącz pliki Cookies lub wyłącz Prywatny/Incognito tryb przeglądania.", 

			FORGET_PASSWORD_NOTE: 		"Jeżeli nie skonfigurowałeś funkcji Odzyskiwania hasła. Naciśnij i przytrzymaj przycisk Reset przez 10 sekund, aby przywrócić go do ustawień fabrycznych."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Aktualizuj teraz",
			REMIND: 						"Przypomnij mi później",
			NOTICE:    						"Nowa wersja firmware'u dostępna jest dla routera %PRODUCT%.",
			NEVER: 							"Ignoruj tę wersję"
			
		},

		WAN_ERROR: {
			TITLE: 							"Błąd połączenia WAN!",
			STATUS: 						"Stan",
			INFO: 							"Informacje",
			SETUP: 							"Ustaw połączenie z Internetem",
			NEVER: 							"Nie przypominaj ponownie"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Wersja firmware:",
			HARDWARE_VERSION: 				"Wersja sprzętowa:",
			HELP_SUPPORT: 					"Wsparcie",
			FAQ: 							"Najczęściej zadawane pytania (FAQ)",
			CONFIRM_REBOOT: 				"Czy na pewno chcesz zrestartować router?",
			CONFIRM_LOGOUT: 				"Czy na pewno chcesz się wylogować?",
			UPGRADE_ALERT_1: 				"Aktualny firmware nie obsługuje usługi TP-LINK cloud. Zaleca się pobrać najnowszy firmware ze strony www.tp-link.com i dokonać aktualizacji.",
			UPGRADE_ALERT_2: 				"Aktualny firmware nie obsługuje usługi TP-LINK cloud. Zaleca się zaktualizować firmware klikając na ikonę Aktualizacji w prawym, górnym rogu.",
			REBOOTING: 						"Restartowanie... <br/>Proszę nie wykonywać żadnych operacji podczas restartowania.",

			MODE_SWITCH: 					"Przełącznik trybu",
			ACCESS_POINT: 					"Punkt dostępowy",
			ACCESS_POINT_TIPS: 				"Aby przekształcić sieć przewodową w bezprzewodową.",
			ROUTER: 						"Router",
			ROUTER_TIPS: 					"Aby umożliwić podłączenie wielu urządzeń przewodowo lub bezprzewodowo.",
			REPEATER: 						"Wzmacniacz sygnału",
			REPEATER_TIPS: 					"Aby zwiększyć zasięg sygnału sieci bezprzewodowej.",
			MODE_REBOOT_TIP: 				"Zmiana trybu spowoduje restart urządzenia, czy na pewno chcesz kontynuować?",
			MODE_FAIL_TIP: 					"Nie udało się przełączyć trybu. Spróbuj ponownie później lub zrestartuj router."
		},

		NAV: {
			QUICK_SETUP: 				"Szybka konfiguracja",
			BASIC: 						"Podstawowe",
			ADVANCED: 					"Zaawansowane"
		},

		CONTROL: {
			MODE: 						"Tryb",
			LOGIN: 						"Zaloguj",
			LED:                        "Diody",
			LED_ON:                     "Diodywyłączone",
			LED_OFF:                    "Diodywłączone",			
			LED_DISABLED:               "Stan diod nie może być zmieniony w trybie nocnym.",			
			LOGOUT: 					"Wyloguj",
			UPDATE: 					"Aktualizuj",
			REBOOT: 					"Resetuj"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algieria",
			AMERICAN_SAMOA: 			"Samoa Amerykańskie",
			ARGENTINA: 					"Argentyna",
			ARMENIA: 					"Armenia",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australia",
			AUSTRIA: 					"Austria",
			AZERBAIJAN: 				"Azerbejdżan",
			BAHAMAS: 					"Bahamy",
			BAHRAIN: 					"Bahrajn",
			BANGLADESH: 				"Bangladesz",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Białoruś",
			BELGIUM: 					"Belgia",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermudy",
			BOLIVIA: 					"Boliwia",
			BOSNIA_HERZEGOWINA: 		"Bośnia i Hercegowina",
			BRAZIL: 					"Brazylia",
			BRUNEI_DARUSSALAM: 			"Brunei",
			BULGARIA: 					"Bułgaria",
			CAMBODIA: 					"Kambodża",
			CANADA: 					"Kanada",
			CAYMAN_ISLANDS: 			"Kajmany",
			CHILE: 						"Chile",
			CHINA: 						"Chińska Republika Ludowa",
			COLOMBIA: 					"Kolumbia",
			COSTA_RICA: 				"Kostaryka",
			CROATIA: 					"Chorwacja",
			CYPRUS: 					"Cypr",
			CZECH_REPUBLIC: 			"Republika Czeska",
			DENMARK: 					"Dania",
			DOMINICAN_REPUBLIC: 		"Republika Dominikańska",
			ECUADOR: 					"Ekwador",
			EGYPT: 						"Egipt",
			EL_SALVADOR: 				"Salwador",
			ESTONIA: 					"Estonia",
			ETHIOPIA: 					"Etiopia",
			FAEROE_ISLANDS: 			"Wyspy Owcze",
			FINLAND: 					"Finlandia",
			FRANCE: 					"Francja",
			FRENCH_GUIANA: 				"Gujana Francuska",
			FRENCH_POLYNESIA: 			"Polinezja Francuska",
			GEORGIA: 					"Gruzja",
			GERMANY: 					"Niemcy",
			GREECE: 					"Grecja",
			GREENLAND: 					"Grenlandia",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Gwadelupa",
			GUAM: 						"Guam",
			GUATEMALA: 					"Gwatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hongkong SRA",
			HUNGARY: 					"Węgry",
			ICELAND: 					"Islandia",
			INDIA: 						"Indie",
			INDONESIA: 					"Indonezja",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irlandia",
			ISRAEL: 					"Izrael",
			ITALY: 						"Włochy",
			JAMAICA: 					"Jamajka",

			JAPAN: 						"Japonia",
			JAPAN_1: 					"Japonia 1",
			JAPAN_2: 					"Japonia 2",
			JAPAN_3: 					"Japonia 3",
			JAPAN_4: 					"Japonia 4",
			JAPAN_5: 					"Japonia 5",
			JAPAN_6: 					"Japonia 6",

			JORDAN: 					"Jordania",
			KAZAKHSTAN: 				"Kazachstan",
			KENYA: 						"Kenia",

			NORTH_KOREA: 				"Korea Północna",
			KOREA_REPUBLIC: 			"Republika Korei",
			KOREA_REPUBLIC_3: 			"Republika Korei 3",

			KUWAIT: 					"Kuwejt",
			LATVIA: 					"Łotwa",
			LEBANON: 					"Liban",
			LIBYA: 						"Libia",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Litwa",
			LUXEMBOURG: 				"Luksemburg",
			MACAU: 						"Makau SRA",
			MACEDONIA: 					"Republika Macedonii",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malezja",
			MALDIVES: 					"Malediwy",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martynika",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Majotta",
			MEXICO: 					"Meksyk",
			MONACO: 					"Księstwo Monako",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Maroko",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Holandia",
			NETHERLANDS_ANTILLES: 		"Holandia-Antyle",
			
			NEW_ZEALAND: 				"Nowa Zelandia",
			NICARAGUA: 					"Nikaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norwegia",
			NORTHERN_MARIANA_ISLANDS: 	"Mariany Północne",
			OMAN: 						"Oman",
			PAKISTAN: 					"Islamska Republika Pakistanu",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua-Nowa Gwinea",
			PARAGUAY: 					"Paragwaj",
			PERU: 						"Peru",
			PHILIPPINES: 				"Republika Filipin",
			POLAND: 					"Polska",
			PORTUGAL: 					"Portugalia",
			PUERTO_RICO: 				"Portoryko",
			QATAR: 						"Katar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Rumunia",
			RUSSIA: 					"Rosja",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Arabia Saudyjska",
			SINGAPORE: 					"Singapur",
			SLOVAK_REPUBLIC: 			"Republika Słowacka",
			SLOVENIA: 					"Słowenia",
			SOUTH_AFRICA: 				"Afryka Południowa",
			SPAIN: 						"Hiszpania",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Szwecja",
			SWITZERLAND: 				"Szwajcaria",
			SYRIA: 						"Syria",
			TAIWAN: 					"Tajwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Tajlandia",
			TRINIDAD_TOBAGO: 			"Trynidad i Tobago",
			TUNISIA: 					"Tunezja",
			TURKEY: 					"Turcja",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ukraina",
			UNITED_ARAB_EMIRATES: 		"Zjednoczone Emiraty Arabskie",
			UNITED_KINGDOM: 			"Wielka Brytania",
			UNITED_STATES: 				"Stany Zjednoczone",
			URUGUAY: 					"Urugwaj",
			UZBEKISTAN: 				"Uzbekistan",
			VENEZUELA: 					"Wenezuela",
			VIETNAM: 					"Wietnam",
			VIRGIN_ISLANDS: 			"Wyspy Dziewicze (USA)",
			YEMEN: 						"Jemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(UTC-12:00) Enewetak, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(UTC-11:00) Midway, Samoa",
			HAWAII: 					"(UTC-10:00) Hawaje",
			ALASKA: 					"(UTC-09:00) Alaska",
			PACIFIC_TIME: 				"(UTC-08:00) Czas pacyficzny",
			MOUNTAIN_TIME: 				"(UTC-07:00) Czas górski (USA Kanada)",
			CENTRAL_TIME: 				"(UTC-06:00) Czas centralny (USA Kanada)",
			EASTERN_TIME: 				"(UTC-05:00) Czas wschodni (USA Kanada)",
			CARACAS:					"(UTC-04:30) Caracas",
			ATLANTIC_TIME: 				"(UTC-04:00) Czas atlantycki (Kanada)",
			NEWFOUNDLAND: 				"(UTC-03:30) Nowa Fundlandia",

			BRASILIA_BUENOS_AIRES: 		"(UTC-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(UTC-02:00) Stany środkowoatlantyckie",
			AZORES_CAPE_VERDE_IS: 		"(UTC-01:00) Azory, Wyspy Zielonego Przylądka",
			GREENWICH_MEAN_TIME: 		"(UTC) Czas uniwersalny, Dublin, Londyn",
			BERLIN_STOCKHOLM: 			"(UTC+01:00) Berlin, Sztokholm, Rzym, Berno, Bruksela",
			ATHENS_HELSINKI: 			"(UTC+02:00) Ateny, Helsinki, Europa Wschodnia, Izrael",
			BAGHDAD_KUWAIT: 			"(UTC+03:00) Bagdad, Kuwejt, Nairobi, Rijad, Moskwa",

			TEHERAN: 					"(UTC+03:30) Teheran",

			ABU_DHABI: 					"(UTC+04:00) Abu Dhabi, Maskat, Kazań, Wołgograd",

			KABUL: 						"(UTC+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(UTC+05:00) Islamabad, Karaczi, Jekaterynburg",

			MADRAS_CALCUTTA: 			"(UTC+05:30) Madras, Kalkuta, Bombaj, Nowe Delhi",
			KATMANDU: 					"(UTC+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(UTC+06:00) Ałma-Ata, Dhaka",
			RANGOON: 					"(UTC+06:30) Rangun",

			BANGKOK_JAKARTA_HANOI: 		"(UTC+07:00) Bangkok, Dżakarta, Hanoi",
			BEIJING_HONGKONG: 			"(UTC+08:00) Pekin, Hongkong, Perth, Singapur",
			TOKYO_OSAKA_SAPPORO: 		"(UTC+09:00) Tokio, Osaka, Sapporo, Seul, Jakuck",

			ADELAIDE: 					"(UTC+09:30) Adelaide",

			BRISBANE_CANBERRA: 			"(UTC+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(UTC+11:00) Magadan, Wyspy Salomona, Nowa Kaledonia",
			FIJI_KAMCHATKA: 			"(UTC+12:00) Fidżi, Kamczatka, Auckland",
			NUKU: 						"(UTC+13:00) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Usługa",
			GAME:						"GRA",
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
			DAY: 						"Dzień",

			MONDAY: 					"Poniedziałek",
			TUESDAY: 					"Wtorek",
			WEDNESDAY: 					"Środa",
			THURSDAY: 					"Czwartek",
			FRIDAY: 					"Piątek",
			SATURDAY: 					"Sobota",
			SUNDAY: 					"Niedziela",
			
			MON: 						"Pon.",
			TUES: 						"Wt.",
			WED: 						"Śr.",
			THUR: 						"Czw.",
			FRI: 						"Pt.",
			SAT: 						"Sob.",
			SUN: 						"Niedz.",

			JAN: 						"STY",
			FEB: 						"LUT",
			MAR: 						"MAR",
			APR: 						"KWI",
			MAY: 						"MAJ",
			JUN: 						"CZE",
			JUL: 						"LIP",
			AUG: 						"SIE",
			SEP: 						"WRZ",
			OCT: 						"PAŹ",
			NOV: 						"LIS",
			DEC: 						"GRU"

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
			PM_12: 						"24:00"
		},

		ORDER: {
			"1ST": 						"Pierwszy",
			"2ND": 						"2",
			"3RD": 						"3",
			"4TH": 						"4",
			"5TH": 						"Ostatni",
			"1ST_": 					"1",

			TH: 						"."
		},

		GRID: {
			CLIENT_NUMBER: 				"Ilość klientów",

			ID: 						"ID",
			MODIFY: 					"Zmień",
			STATUS: 					"Stan",
			ENABLE: 					"Włącz",

			OPERATION: 					"Operacja",
			CHOOSE: 					"Wybierz",
			DESCRIPTION: 				"Opis",
			

			AUTO_REFRESH: 				"Odświeżaj automatycznie",
			REFRESH: 					"Odśwież",
			NUMBER: 					"Ilość",
			ENABLED: 					"Włączony",
			DISABLED: 					"Wyłączony",
			ACTIVE: 					"Aktywny",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Dodaj",
			CHOOSE: 					"Wybierz",
			EDIT: 						"Edytuj",
			DELETE: 					"Kasuj",
			DELETE_ALL: 				"Kasuj wszystkie",
			REMOVE: 					"Usuń",
			RESET: 						"Resetuj",
			RESET_ALL: 					"Resetuj wszystkie",
			DETECT: 					"Wykryj",
			ENABLE: 					"Włącz",
			DISABLE: 					"Wyłącz",
			PAUSE:						"Wstrzymaj",
			RESUME:						"Wznów",
			
			REFRESH: 					"Odśwież",
			SEARCH: 					"Wyszukaj…",
			BROWSE: 					"Przeglądaj",

			SAVE: 						"Zapisz",
			BACK: 						"Cofnij",

			PREV: 						"Poprzedni",
			NEXT: 						"Dalej",
			FINISH: 					"Zakończ",
			
			ON: 						"Wł.",
			OFF: 						"Wył.",
			LOW: 						"Słabe",
			MIDDLE: 					"Średnie",
			HIGH: 						"Mocne",
			
			OK: 						"OK",
			CANCEL: 					"Anuluj",

			YES: 						"Tak",
			NO: 						"Nie",
			
			CONNECTED: 					"Połączony",
			CONNECTING: 				"Łączenie",
			DISCONNECTING: 				"Rozłączanie",
			DISCONNECTED: 				"Nie połączono",

			PASSWORD_HINT: 				"Hasło",
			FILEBUTTONTEXT: 			"Przeglądaj",
			FILEBLANKTEXT: 				"Proszę wybrać plik.",
			NOSELECTEDTEXT: 			"Wybierz opcje.",

			ADD_A_NEW_KEYWORD: 			"Dodaj Nowe słowo kluczowe",

			SUCCESSED: 					"Sukces!",
			FORM_SAVED: 				"Zapisano",
			FORM_FAILED: 				"Błąd",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Zapisano",
			GRID_FAILED: 				"Błąd",
			GRID_NONE_SELECT: 			"Wybierz przynajmniej jedną pozycję.",
			GRID_DELETE_COMFIRM: 		"Czy jesteś pewien, że chcesz usunąć te wpisy?",
			GRID_DELETE_ALL_COMFIRM: 	"Czy jesteś pewien, że chcesz usunąć wszystkie wpisy?",
			GRID_MAX_RULES: 			"Przekroczono maksymalną ilość wpisów.",
			KEYWORD_MAX_OVERFLOW: 		"Przekroczono limit słów kluczowych.",

			NOTE: 						"Uwaga:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Niewłaściwy format.",
			BLANKTEXT: 					"To pole jest wymagane.",

			EMAIL: 						"Niewłaściwy adres email.",
			NUMBER: 					"Niewłaściwy format.",

			NUMBER_MIN: 				"Niewłaściwa wartość, wprowadź liczbę większą niż %min.",
			NUMBER_MAX: 				"Niewłaściwa wartość, wprowadź liczbę mniejszą niż %max.",

			NUMBER_MIN_MAX: 			"Niewłaściwa wartość, wprowadź liczbę pomiędzy %min a %max.",
			HEX: 						"To pole wymaga cyfry szesnastkowej.",

			IP: 						"Niewłaściwy format.",

			IP_NO_ALL_ZERO:				"0.0.0.0. nie może być adresem.",
			IP_NO_LOOP:					"Adres IP loopback nie może być adresem.",
			IP_NO_D_TYPE:				"Adres nie może być adresem IP klasy D.",
			IP_NO_E_TYPE:				"Adres nie może być adresem IP klasy E.",
			IP_NO_ALL_ONE:				"255.255.255.255 nie może być adresem.",
			IP_NO_FIRST_ALL_ONE:		"Adres nie może zaczynać się od 255.",
			IP_NO_FIRST_ZERO:			"Adres nie może zaczynać się od 0.",
			MASK_NO_ALL_ONE:			"255.255.255.255 nie może być maską.",

			IPV6: 						"Niewłaściwy format.",
			IPV6_NOT_GLOBAL:			"Niewłaściwy format.",
			IPV6_NOT_PREFIX:			"Niewłaściwy format.",
			IP_DOMAIN: 					"Niewłaściwy format.",
			IPV6_DOMAIN: 				"Niewłaściwy format.",
			PPTP_INVALID_IP:			"Nieprawidłowy adres IP.",
			MAC: 						"Niewłaściwy format.",
			MULTI_MAC:					"Niewłaściwy format.",
			MAC_INVALID_BROADCAST:		"Adres MAC nie może być adresem rozgłoszeniowym.",
			MAC_INVALID_MULTICAST:		"Adres MAC nie może być adresem multicast.",
			DATE: 						"Niewłaściwy format.",
			DATE_INVALID: 				"Wprowadź datę pomiędzy 01/01/1970 a 12/31/2030.",
			MASK: 						"Niewłaściwy format.",
			DOMAIN: 					"Niewłaściwy format.",
			STRING_DOMAIN:              "Niewłaściwy format.",
			USER: 						"Niewłaściwy format.",
			NOTE: 						"Niewłaściwy format.",
			PWD: 						"Niewłaściwy format.",
			SSID: 						"Niewłaściwy format.",
			NAME:						"Niewłaściwy format.",
			ASCII_VISIBLE:				"Niewłaściwy format.",
			STRING_VISIBLE:				"Niewłaściwy format.",
			STRING_VISIBLE_NO_COMMA:    "Niewłaściwy format.",
			STRING_VISIBLE_ALLOW_BLANK: "Niewłaściwy format.",
			VPN_NAME_PWD: 				"Wprowadź 1-15 znaków alfanumerycznych, - i _."
		},


		ERROR: {			
			"00000001":					"Niewłaściwy typ pliku.",
			"00000002":					"Błąd sumy kontrolnej.",
			"00000003":					"Plik jest za duży.",
			"00000004":					"Błąd wczytywania pliku.",
			"00000005":					"Błąd restartowania.",
			"00000006":					"Nieznany błąd.",
			"00000007":					"Urządzenie jest już na liście. Wprowadź inne.",

			"00000009":					"Niewłaściwy port.",
			"00000010":					"Port musi być liczbą.",

			"00000011":					"Nazwa użytkownika musi być taka sama jak wartość pola Od.",
			"00000012": 				"Nazwa użytkownika musi zaczynać się literą.",

			"00000021":					"Niewłaściwy format.",

			"00000032": 				"Wartość musi być mniejsza niż Niska.",
			"00000033": 				"Wartość musi być mniejsza niż Średnia i Niska.",
			"00000034": 				"Niewłaściwa wartość, wprowadź numer od 5 do 7200.",

			"00000039": 				"Użyj domyślnej wartości 0 lub wprowadź liczbę od 30 do 86400.",
			"00000040": 				"SSID oraz adres MAC są wymagane.",

			"00000042": 				"Użyj domyślnej wartości 80 lub wprowadź liczbę od 1024 do 65535.",

			"00000045": 				"Brama domyślna i adres IP LAN muszą znajdować się w tej samej podsieci. Wprowadź adresy ponownie.",

			"00000046": 				"Adresy IP oraz MAC nie mogą być puste. Wprowadź je ponownie.",
			"00000047": 				"Adres IP i adres IP LAN muszą znajdować się w tej samej podsieci. Wprowadź adresy ponownie.",

			
			"00000049":					"Sieć docelowa jest niewłaściwa.",

			"00000050": 				"Niewłaściwy adres IP serwera DNS. Wprowadź inny adres.",
			"00000051": 				"Ten adres MAC już jest na liście. Wprowadź inny adres.",
			"00000052": 				"Ten adres IP już jest na liście. Wprowadź inny adres.",

			"00000053": 				"Adres początkowy nie może być wyższy niż adres końcowy. <br/>Wprowadź adres ponownie.",

			"00000054": 				"Pula adresów IP i adres IP LAN muszą znajdować się w tej samej podsieci. Wprowadź adresy ponownie.",

			"00000055": 				"Adres IP nie może być takim sam jak adres LAN.",

			"00000056": 				"Zdalny adres IP i adres IP LAN nie mogą znajdować się w tej samej podsieci. Wprowadź inny adres.",

			"00000057": 				"Niewłaściwe hasło PSK, wprowadź hasło ponownie.",
			"00000058": 				"Niewłaściwe hasło WEP, wprowadź hasło ponownie.",

			"00000059": 				"Nieprawidłowy adres IP oraz maska posieci. Wprowadź prawidłowe adresy.",

			"00000060": 				"Adres IP WAN oraz adres IP LAN nie mogą być w ten samej podsieci. <br/>Wprowadź inne adresy.",

			"00000061": 				"Czas rozpoczęcia nie może być późniejszy niż czas końcowy.",

			"00000062": 				"To pole jest wymagane.",
			"00000063": 				"To pole jest wymagane.",

			"00000064": 				"Nie możesz zablokować adresu MAC podłączonego hosta.",
			"00000065": 				"Konflikt podłączonych urządzeń. Sprawdź przyczynę.",
			
			"00000066": 				"Hasło może zawierać od 8 do 63 znaków ASCII lub do 64 znaków szesnastkowych.",
			"00000067": 				"Hasło powinno składać się z 10 znaków szesnastkowych.",
			"00000068": 				"Hasło powinno składać się z 5 znaków ASCII.",
			"00000069": 				"Hasło powinno składać się z 26 znaków szesnastkowych.",
			"00000070": 				"Hasło powinno składać się z 13 znaków ASCII",
			"00000071": 				"Hasło powinno składać się z 32 znaków szesnastkowych.",
			"00000072": 				"Hasło powinno składać się z 16 znaków ASCII",
			"00000073": 				"Hasło nie może być dłuższe niż 64 znaki.",

			"00000074": 				"Niewłaściwy typ pliku.",

			"00000075": 				"PIN powinien składać się z 8 cyfr.",

			"00000076": 				"Konflikt podłączonych urządzeń. Sprawdź port przełączania oraz protokół otwierający.",
			"00000077": 				"Adres IP nie może być takim sam jak adres IP LAN.",
			"00000078": 				"Adres IP hosta nie może być taki sam jak adres IP LAN.",

			"00000080": 				"Hasła nie są zgodne. Spróbuj ponownie.",

			"00000083": 				"Brama nie może być taka sama jak adres IP.",
			"00000084": 				"Preferowany DNS nie może być taki sam jak adres IP.",
			"00000085": 				"Alternatywny DNS nie może być taki sam jak adres IP.",
			"00000086": 				"Preferowany DNS nie może być taki sam jak alternatywny DNS.",

			"00000088": 				"Ta operacja nie jest dozwolona przy zarządzaniu zdalnym.",
			"00000089": 				"Przekroczyłeś %num prób. Spróbuj ponownie za dwie godziny.",

			"00000090": 				"Adres docelowy nie może być adresem IP LAN.",
			"00000091": 				"Adres docelowy nie może być adresem IP WAN.",

			"00000092": 				"Adres IP oraz adres IP LAN nie mogą być w ten samej podsieci. <br/>Wprowadź adresy ponownie.",
			"00000093": 				"Adres IP oraz adres IP WAN nie mogą być w ten samej podsieci. <br/>Wprowadź adresy ponownie.",

			"00000094": 				"Vlan ID nie mogą być takie same.",
			"00000095": 				"Wymagany jest co najmniej jeden port.",

			"00000096": 				"To słowo kluczowe już istnieje.",

			"00000097": 				"Zmiany w ustawieniach sieci 2,4GHZ nie zostaną zatwierdzone, dopóki przycisk Wi-Fi nie będzie włączony.",
			"00000098": 				"Zmiany w ustawieniach sieci 5GHZ nie zostaną zatwierdzone, dopóki przycisk Wi-Fi nie będzie włączony.",
			"00000099": 				"Zmiany w ustawieniach sieci 2,4GHZ i 5GHz nie zostaną zatwierdzone, dopóki przycisk Wi-Fi nie będzie włączony.",

			"00000100": 				"Zmiany w ustawieniach sieci 5GHz nie są możliwe ze względu na ograniczenia w twoim regionie/kraju.",
			"00002100": 				"Sieć 60GHz nie jest dostępna, gdyż jest to zabronione w twoim regionie/kraju.",

			"00000101": 				"Sieć bezprzewodowa jest wyłączona. Jeżeli chcesz używać tej funkcji. Naciśnij przycisk Wi-Fi.",
			"00000102": 				"Sieć bezprzewodowa jest wyłączona. Jeżeli chcesz używać tej funkcji. Naciśnij przycisk Wi-Fi.",
			"00002102": 				"Sieć bezprzewodowa jest wyłączona. Jeżeli chcesz używać tej funkcji. Naciśnij przycisk Wi-Fi.",

			"00000103": 				"Sieć bezprzewodowa jest wyłączona. Jeżeli chcesz używać tej funkcji. Naciśnij przycisk Wi-Fi.",
			"00000104": 				"Sieć bezprzewodowa jest wyłączona.",

			"00000105": 				"Funkcje QoS i IPTV nie mogą być włączone w tym samym czasie.",

			"00000106": 				"Adres IP nie może być takim sam jak adres IP LAN.",
			
			"00000107": 				"Cel już istnieje.",

			"00000110": 				"Adres IP i adres IP LAN muszą znajdować się w podsieci routera.",
			
			"00000111": 				"Funkcja QoS oraz <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> nie mogą być włączone w tym samym czasie.",
			"00000112": 				"Funkcja WDS działa w paśmie 2,4GHz lub 5GHz. Sieć dla gości nie jest dostępna dla pasma WDS.",
			"00000113": 				"Funkcja WDS oraz Sieć dla gości nie mogą być włączone w tym samym czasie.",
			"00000114": 				"Funkcja Statystyki ruchu oraz <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> nie mogą być włączone w tym samym czasie.",

			"00000117": 				"Ta domena już istnieje.",
			"00000118": 				"Przekroczono limit ilości domen.",
			"00000119":					"Funkcja NAT Boost wyłączy się gdy <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">funkcja QoS</a> lub <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\"> funkcja Statystyk ruchu</a> będzie włączona.",

			"00000120": 				"Hasło powinno składać się z 5 lub 13 znaków ASCII.",
			"00000121": 				"Hasło powinno składać się z 10 lub 26 znaków szesnastkowych.",
			"00000122": 				"Nazwa użytkownika lub hasło są puste. Czy na pewno chcez kontynuować?",
			"00000123": 				"Trwa zapisywanie… Proszę nie wykonywać żadnych operacji podczas tego procesu.",
			"00000124": 				"PIN routera został zablokowany z powodu wielu prób nawiązania połączenia za pomocą nieprawidłowego kodu PIN. Proszę wygenerować nowy PIN.",

			"00000125": 				"Przekroczono limit ilości reguł QoS.",
			"00000126": 				"Przekroczono limit wielkości pliku.",
			"00000127": 				"Zawartość pliku jest nieprawidłowa.",
			"00000128": 				"Proszę wybrać co najmniej jedną usługę.",
			"00000129": 				"Proszę wybrać co najmniej jeden port fizyczny.",
			"00000130":					"Funkcja WPS jest wyłączona.",
			"00000131": 				"Adres loopback nie może być serwerem NTP.",
			"00000132": 				"Nie udało się przełączyć trybu. Spróbuj ponownie później lub zrestartuj router.",
			"00000133": 				"Nieprawidłowy adres IP hosta DMZ. Wprowadź prawidłowy adres.",
			"00000134":  				"Nieprawidłowy adres IP. Wprowadź prawidłowy adres.",
			"00000135": 				"Błąd pliku firmware.",
			"00000136": 				"Błąd pliku zapisanych ustawień.",
			"00000137": 				"Nieprawidłowy adres IP. Wprowadź prawidłowy adres.",
			"00000139": 				"Nieprawidłowe parametry odzyskiwania hasła.",
			"00000140": 				"Nieprawidłowy kod.",
			"00000141": 				"Odzyskiwanie hasła jest wyłączone.",
			"00000142": 				"Nie udało się wysłać kodu. Sprawdź połączenie internetowe.",
			"00000143": 				"Nieprawidłowy adres e-mail.",
			"00000144": 				"Nieprawidłowa wiadomość e-mail.",
			"00000145": 				"Nie znaleziono hosta.",
			"00000146": 				"Błąd uwierzytelniania.",
			"00000147": 				"Wartość portu powinna mieścić się w przedziale 1-65535.",
			"00000148": 				"Początkowy numer portu powinen mieć mniejszą wartość niż końcowy. Wprowadź ponownie zakres portów.",
			"00000149": 				"Numery portów pokrywają się. Wprowadź je ponownie.",
			
			"00000150": 				"Ścieżka nie istnieje.",
			"00000151": 				"Nie ustawiono przydzielonej ścieżki",
			"00000152": 				"Wystąpiły błędy tej ścieżki.",
			"00000153": 				"Nie znaleziono woluminu",
			"00000154": 				"Brak urządzenia USB.",
			
			"00000155": 				"Adres IP i Adres IP LAN klienta PPTP VPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne adresy.",
			"00000156": 				"Adres IP klienta PPTP VPN i adres IP klienta OpenVPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne adresy.",

			"00000222":  				"Maksymalna liczba wpisów.",
			"00000231": 				"Powielony wpis.",
			"00000232": 				"Nieprawidłowy URL.",
			"00000233":					"Wybierz przynajmniej jeden dzień.",

			"00000301": 				"Osiągnięto maksymalną ilość udostępnionych folderów.",
			"00000302": 				"Osiągnięto maksymalną ilość udostępnionych folderów w woluminie.",
			"00000303": 				"Ścieżka udostępnionego folderu już istnieje.",
			"00000304": 				"Nazwa udostępnionego folderu już istnieje.",

			"00001000":					"Trwa aktualizacja, proszę czekać.",
			"00001001": 				"Funkcja WDS może być aktywna w paśmie 2,4GHZ lub 5GHz.",
			"00001002":					"Nieprawidłowy kod.",

			"00001123": 				"Wybierz przynajmniej jedną aplikację wejściową dla reguły.",
			"00001124": 				"Wybierz przynajmniej jeden port wejściowy dla reguły.",

            "00002000": 				"Ten wpis koliduje z trasą statyczną usługodawcy. Czy na pewno chcesz kontynuować?",

            "00003000":                 "Funkcja IPv6 Pass-Through koliduje z funkcją IPTV. Jeżeli chcesz używać tej funkcji, wyłącz IPTV.",
			"00004139": 				"Brak połączenia internetowego",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Przekroczono limit czasu dla żądania. Spradź swoje połączenie internetowe i spróbuj ponownie później.",
			"00004141": 				"Nieznany błąd.",
			"00004142": 				"Nieprawidłowy kod weryfikacyjny.",
			"00004143": 				"Nieprawidłowe hasło.",
			"00004144": 				"Ta nazwa użytkownika już istnieje.",
			"00004145": 				"Nieprawidłowe hasło.",//new password
			"00004146": 				"Nie można usunąć powiązania tego urządzenia. Spróbuj ponownie później.",
			"00004147": 				"To urządzenie zostało powiązane z innym kontem.",
			"00004148": 				"Nieprawidłowa wartość.",
			"00004149": 				"Ta nazwa domenowa już istnieje.",
			"00004150": 				"Nie udało się pobrać firmware'u. Sprawdź połączenie z Internetem i spróbuj ponownie później.",
			"00004151": 				"Nie można zarejestrować na tym samym koncie cloud więcej niż 1000 nazw domenowych.",
			"00004152": 				"To urządzenie zostało powiązane z inną nazwą domenową.",
			"00004153": 				"Ta nazwa domenowa została powiązana z innym urządzeniem.",
			"00004154": 				"Brak odpowiedzi z serwera. Spróbuj ponownie później. ",
			"00004155": 				"Konto nie istnieje.",
			"00004156": 				"Nie można uruchomić aplikacji cloud. Zrestartuj urządzenie i spróbuj ponownie później.",
			"00004157": 				"Nie można nawiązać połączenia z serwerem cloud. Sprawdź połączenie internetowe i spróbuj ponownie później.",
			"00004158": 				"Port WAN jest odłączony.",
			"00004159": 				"Nie udało się nawiązać połączenia z Internetem. Skontaktuj się ze swoim usługodawcą internetowym lub spróbuj ponownie później.",
			"00004160": 				"Nie udało się pobrać adresów IP z serwera DHCP. Sprawdź typ połączenia WAN lub spróbuj ponownie później.",
			"00004161": 				"Błąd autoryzacji PPPoE. Sprawdź swoją nazwę użytkownika i hasło. ",
			"00004162": 				"Nie udało się połączyć z serwerem PPPoE.",
			"00004164": 				"Błąd autoryzacji PPTP. Sprawdź swoją nazwę użytkownika i hasło. ",
			"00004165": 				"Nie udało się połączyć z serwerem PPTP.",
			"00004167": 				"Błąd autoryzacji L2TP. Sprawdź swoją nazwę użytkownika i hasło. ",
			"00004168": 				"Nie udało się połączyć z serwerem L2TP.",
			"00004169": 				"Nieznany błąd. Spróbuj ponownie później.",
			"00004170": 				"Port WAN jest odłączony.",
			"00004171": 				"Brak połączenia z Internetem.",
			"00004172": 				"Błąd połączenia.",
			"00004173": 				"Nieprawidłowa nazwa użytkownika lub hasło",
			"00004174": 				"Niewłaściwy adres email.",
			"00004175": 				"Nieprawidłowy format nazwy użytkownika.",
			"00004176": 				"Ten adres e-mail już istnieje",
			"00004177": 				"Nie udało się uzyskać informacji o koncie. Odświeź stronę.",
			"00004178":   				"Błąd systemu. Odśwież stronę i spróbuj ponownie.",
			"00004179":   				"Nie udało się powiązać tego urządzenia. Spróbuj ponownie później.",
			"00004180":   				"To urządzenie nie jest już powiązane z tym kontem Cloude. Zaloguj się na konto ponownie, aby powiązać z nim urządzenie.",
			"00004181":   				"Urządzenie jest w trybie offline. Sprawdź ustawienia Internetu.",
			"00004182":   				"Nie udało się wysłać wiadomości e-mail. Sprawdź połączenie internetowe i spróbuj ponownie.",
			"00004183":   				"Konto powinno zawierać od  do  znaków.",
			"00004184":   				"20 razy wprowadziłeś nieprawidłowe hasło. Spróbuj ponownie za 2 godziny.",
			"00004185":   				"W ciągu 1 godziny kod weryfikacyjny uzyskałeś 10 razy. Spróbuj ponownie za 24 godziny.",
			"00004186":   				"Niestety nie udało się aktywować twojego konta. Odbierz ponownie wiadomość weryfikacyjną.",
			"00004187":   				"Niestety link nie jest aktualny. Odbierz ponownie wiadomość weryfikacyjną.",
			"00004188":   				"Niestety link nie jest aktualny. Odbierz ponownie wiadomość weryfikacyjną.",
			"00004189":   				"Niestety nie udało się zresetować hasło. Odbierz ponownie wiadomość weryfikacyjną.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Błąd aktualizacji firmware'u.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Stan",
			NETWORK: 					"Sieć",
			NETWORK_MAP: 				"Mapa sieci",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"Serwer DHCP",
			DYNAMIC_DNS: 				"Dynamiczny DNS",
			ADVANCED_ROUTING: 			"Routing zaawansowany",

			WIRELESS: 					"Sieć bezprzewodowa",
			WIRELESS_SETTINGS: 			"Ustawienia sieci bezprzewodowej",
			WDSBRIDGING: 				"Połączenie WDS",
			WPS: 						"WPS",
			MACFILTERING: 				"Filtrowanie MAC",
			WIRE_STATISTICS: 			"Statystyki",
			
			
			GUEST_NETWORK: 				"Sieć dla gości",
			WIRELESS_SETTINGS: 			"Ustawienia sieci bezprzewodowej",
			STORAGE_SHARING: 			"Udostępnianie zasobów",
			NAT_FORWARDING: 			"Przekierowanie portów",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Serwery wirtualne",
			PORT_TRIGGERING: 			"Port Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"Ustawienia USB",
			BASIC_SET: 					"Ustawienia podstawowe",
			DISK_SET: 					"Ustawienia urządzeń",
			FOLDER_SHARING: 			"Dostęp",
			STORAGE_SHARING: 			"Udostępnianie zasobów",
			FTP_SERVER: 				"Serwer FTP",
			MEDIA_SERVER: 				"Serwer multimediów",
			PRINT_SERVER: 				"Serwer druku",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Pobieranie w trybie offline",
			
			PARENTAL_CONTROL: 			"Kontrola rodzicielska",

			QOS:  						"QoS",
			DATABASE:  					"Baza danych",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Mapa ",
			SB_MAP: 					"Mapa",
			SB_BANDWIDTH:  				"Przepustowość",
			SB_PRIORITY: 				"Priorytet",
			SB_STATISTICS: 				"Statystyki",

			
			SECURITY: 					"Zabezpieczenia",
			SETTINGS: 					"Ustawienia",
			ACCESS_CONTROL: 			"Kontrola dostępu",
			IP_MAC_BINDING: 			"Wiązanie adresów IP&MAC",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Narzędzia systemowe",
			TIME_SETTINGS: 				"Ustawienia czasu",
			DIAGNOSTIC: 				"Diagnostyka",
			FIRMWARE_UPGRADE: 			"Aktualizacja firmware",
			BACKUP_RESTORE: 			"Zapis i odczyt ustawień",
			ADMINISTRATION: 			"Administracja",
			SYSTEM_LOG: 				"Dziennik systemowy",
			STATISTICS: 				"Statystyki ruchu",
			SYSTEM_PARAMETERS: 			"Parametry systemowe",
			VPN: 						"Serwer VPN",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"Połączenia VPN"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Region i strefa czasowa",
			INTERNET_CONNECTION_TYPE: 	"Typ połączenia",
			WIRELESS_SETTINGS: 			"Ustawienia bezprzewodowe",
			SUMMARY: 					"Podsumowanie",
			SETUP_COMPLETE: 			"Testuj połączenie internetowe",

			EXIT: 						"Wyjdź",
			NEXT: 						"Dalej",
			SAVE: 						"Zapisz",
			FINISH: 					"Zakończ",
			OK: 						"OK",
			NONE: 						"Błąd wykrywania",

			REGION: 					"Region",
			TIME_ZONE: 					"Strefa czasowa",
			NO_SELECT: 					"Wybierz opcje.",

			AUTO_DETECT: 				"Wykryj",
			DYNAMIC_IP: 				"Dynamiczne IP",
			STATIC_IP: 					"Statyczne IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Jeżeli nie jesteś pewien jaki typ połączenia wybrać, wybierz opcję Wykryj lub skontaktuj się z dostawcą usług internetowych.",

			DYNAMIC_IP_INFO: 			"Jeżeli twój usługodawca zezwala na dostęp do Internetu tylko wybranemu adresowi MAC, musisz sklonować adres MAC komuptera głównego. Jeżeli nie jesteś pewien, wybierz opcję <strong>NIE klonuj adresu MAC</strong>.",
			MAC_CLONE_NO: 				"NIE klonuj adresu MAC",
			MAC_CLONE_YES: 				"Klonuj adres MAC",
			MAC_CLONE_NOTE: 			"Jeśli wybierzesz opcję Klonuj adres MAC. Upewnij się, że adres MAC komputera jest zarejestrowany u usługodawcy przed naciśnięciem Dalej.",

			PPPOE_INFO: 				"Wprowadź nazwę użytkownika oraz hasło PPPoE.",
			
			STATIC_IP_INFO: 			"Wprowadź parametry połączenia.",

			L2TP_INFO: 					"Wprowadź nazwę użytkownika oraz hasło L2TP.",
			PPTP_INFO: 					"Wprowadź nazwę użytkownika oraz hasło PPTP.",
			
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			SERVER_IP_ADDRESS_NAME: 	"Adres IP serwera DNS/Domena",
			IP_ADDRESS: 				"Adres IP",
			SUBNET_MASK: 				"Maska podsieci",
			DEFAULT_GATEWAY: 			"Brama domyślna",
			PRIMARY_DNS: 				"Preferowany DNS",
			SECOND_DNS: 				"Alternatywny DNS",
			OPTIONAL: 					"(Opcjonalnie)",
			
			ON: 						"Włączony",
			OFF: 						"Wyłączony",
			WIRELESS_24GHZ: 			"Sieć bezprzewodowa 2,4GHz",
			WIRELESS_5GHZ: 				"Sieć bezprzewodowa 5GHz",
			WIRELESS_60GHZ: 				"Sieć bezprzewodowa 60GHz",
			ENABLE_WIRELESS_RADIO: 		"Włącz sieć",
			NAME_SSID: 					"Nazwa sieci bezprzewodowej (SSID)",

			SUMMARY_INFO1: 				"Musisz połączyć swoje urządzenia z nową siecią bezprzewodową zanim naciśniesz przycisk <strong>Dalej</strong>.",
			SUMMARY_INFO2: 				"Nazwa twojej sieci bezprzewodowej oraz hasło zostały zmienione, jak pokazano poniżej:",
			SUMMARY_INFO3: 				"Upewnij się, że jesteś połączony z nową siecią bezprzewodową.",

			WIRELESS_24GHZ_SSID: 		"Nazwa sieci bezprzewodowej 2,4GHz (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Hasło sieci bezprzewodowej 2,4GHz",
			WIRELESS_5GHZ_SSID: 		"Nazwa sieci bezprzewodowej 5GHz (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Hasło sieci bezprzewodowej 5GHz",
			WIRELESS_60GHZ_SSID: 		"Nazwa sieci bezprzewodowej 60GHz",
			WIRELESS_60GHZ_PASSWORD: 	"Hasło sieci bezprzewodowej 60GHz",

			SORRY: 						"Błąd.",
			SUCCESS: 					"Sukces!",
			TEST_INTERNET_SUCCESS_INFO: "Naciśnij Zakończ, aby zakończyć proces Szybkiej konfiguracji.",

			TEST_INTERNET_FAILED_INFO_0:"Upewnij się, że wszystkie parametry Szybkiej konfiguracji są poprawne i spróbuj ponownie. Jeśli wszystkie parametry Szybkiej konfiguracji są poprawne, zrestartuj modem, odczekaj 2 minuty i ponownie naciśnij Testuj połączenie z internetem. Jeśli nie korzystasz z modemu, konieczne może być skontaktowanie się z dostawcą usług internetowych.",
			SUMMARY_INFO4: 				"Przepraszamy! Połączenie z nową siecią bezprzewodową nie jest aktywne. Nawiąż połączenie, a następnie naciśnij przycisk <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Konfiguracja zakończona!",
			COMPLETE_INFO_0: 			"Pomyślnie przeprowadziłeś Szybką konfigurację.",
			COMPLETE_INFO_1:			"Naciśnij przycisk Testuj połączenie z Internetem, a następnie przycisk Zakończ.",
			TEST_INTERNET: 				"Testuj połączenie z Internetem",

			
			RESET_USER_TITLE: 			"Zmień nazwę użytkownika i hasło",
			NEW_USERNAME: 				"Nowa nazwa użytkownika",
			NEW_PASSWORD: 				"Nowe hasło",
			CONFIRM_PASSWORD: 			"Potwierdź nowe hasło",
			CONFIRM: 					"Potwierdź"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Stan",

			GHZ24: 						"2,4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Typ połączenia",
			SECONDARY_CONN: 			"Połączenie dodatkowe",

			POOR_CONNECTED: 			"Słaby zasięg",
			UNPLUGGED: 					"Port WAN jest odłączony.",
			
			CONNECTED: 					"Połączony",
			DISCONNECTED: 				"Rozłączony",
			CONNECTING: 				"Łączenie",

			INTERNET_IP_ADDR: 			"Adres IP",
			
			IP_ADDR: 					"Adres IP",
			MAC_ADDR: 					"Adres MAC",
			GATEWAY: 					"Brama",

			AUTO: 						"Auto",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"Klienci bezprzewodowi",
			HOST_CLIENTS: 				"Klienci sieci głównej",
			GUEST_CLIENTS: 				"Klienci sieci dla gości",
			WIRE_CLIENTS: 				"Klienci przewodowi",
			PRINTER: 					"Drukarka",
			USB_DISK: 					"Dysk USB",
			WIRELESS: 					"Sieć bezprzewodowa",
			NAME: 						"Nazwa",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Kanał",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Sieć bezprzewodowa 2,4GHz",
			WIRELESS_5GHZ: 				"Sieć bezprzewodowa 5GHz",
			WIRELESS_60GHZ:				"Sieć bezprzewodowa 60GHz",
			
			GUEST_24GHZ: 				"Sieć dla gości 2,4GHz",
			GUEST_5GHZ: 				"Sieć dla gości 5GHz",
			
			STATUS: 					"Stan",
			TOTAL: 						"Całkowitapojemność",
			AVAILABLE: 					"Wolnemiejsce",
			GB: 						"GB",
			BRAND: 						"Marka",

			DYNAMIC_IP: 				"Dynamiczne IP",
			STATIC_IP: 					"Statyczne IP",
			SUBNET_MASK: 				"Maska podsieci",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Kabel BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Tunel 6do4",
			NONE: 						"Brak"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Wykryj",
			INTERNET_CONN_TYPE: 		"Typ połączenia",
			DYNAMIC_IP: 				"Dynamiczne IP",
			STATIC_IP: 					"Statyczne IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"Kabel BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Odłączony",
			NONE: 						"Brak",
			DETECT_FAIL: 				"Błąd wykrywania",
			SECONDARY_CONN: 			"Połączenie dodatkowe",

			DYNAMIC_YES: 				"NIE klonuj adresu MAC",
			DYNAMIC_NO: 				"Klonuj adres MAC",
			
			IP_ADDR: 					"Adres IP",
			SUBNET_MASK: 				"Maska podsieci",
			DEFAULT_GATEWAY: 			"Brama domyślna",
			PRIMARY_DNS: 				"Preferowany DNS",
			SECOND_DNS: 				"Alternatywny DNS",
			OPTIONAL: 					"(Opcjonalnie)",
			USER_NAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			SERVER_IP_ADDR_NAME: 		"Adres IP serwera DNS/Domena",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Jeżeli nie jesteś pewien jaki typ połączenia wybrać, wybierz opcję Wykryj lub skontaktuj się z dostawcą usług internetowych."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Ustawienia bezprzewodowe",
			MODE_2G: 					"Sieć bezprzewodowa 2,4GHz",
			MODE_5G: 					"Sieć bezprzewodowa 5GHz",
			MODE_60G: 					"Sieć bezprzewodowa 60GHz",
			WIRELESS_NETWORK_NAME: 		"Nazwa sieci bezprzewodowej (SSID)",
			WIRELESS_PASSWORD: 			"Hasło",
			ENABLE_WIRELESS: 			"Włącz sieć",
			SAVE: 						"Zapisz",
			ENCRYPTION_2G_NOTICE:		"Zabezpieczenie sieci 2,4GHz to %s.",
			ENCRYPTION_5G_NOTICE:		"Zabezpieczenie sieci 5GHz to %s.",
			ENCRYPTION_60G_NOTICE:		"Szyfrowanie sieci 60GHZ to %s.",
			ENCRYPTION_2G_NO: 			"Bezprzewodowe połączenie 2,4GHz nie jest zabezpieczone.",
			ENCRYPTION_5G_NO: 			"Bezprzewodowe połączenie 5GHz nie jest zabezpieczone.",
			ENCRYPTION_60G_NO: 			"Sieć bezprzewodowa 60GHz nie jest szyfrowana.",
			ENCRYPTION_NO: 				"Sieć bezprzewodowa bez hasła zagraża bezpieczeństwu sieci.",
			ENCRYPTION_SURE: 			"Czy na pewno chcesz kontynuować?",
			HIDE_SSID: 					"Ukryj nazwę sieci"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Ustawienia podstawowe",
			TITIL_NEW:					"Dysk i Konto",
			DISK_SET:					"Ustawienia urządzeń",

			SELFLY_REMOVE:				"Bezpieczne usuwanie",
			SCANING:					"Skanowanie…",
			SCAN_RESULT:				"Znaleziono dysków: %n",
			
			DISKS:						"Dyski",
			USERS: 						"Konta użytkowników",
			DEVICENAME: 				"Nazwa urządzenia",
			VOLUMN: 					"Wolumin",

			USBSPACE: 					"Wykorzystane miejsce",
			FREESPACE: 					"Wolne miejsce",
			STATUS: 					"Stan",
			INACT: 						"Dezaktywuj",
			USAGE: 						"Zużycie",
			CAPACITY: 					"Pojemność",
			OPERATION: 					"Operacja",
			
			ACC: 						"Zarządzanie kontami", 	 	
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			USE_LOGIN: 					"Użyj loginu użytkownika",
			SCAN: 						"Skanuj",
			ENJECT_ALL: 				"Wysuń wszystkie",
			ENJECT: 					"Wysuń",
			ADD_USER: 					"Dodaj użytkownika",
			AUTH: 						"Uprawnienia",


			LOCATION: 					"Lokalizacja",
			MOBILE_ISP: 				"Komórkowy dostawca usług internetowych ",
			DIAL_NUMBER: 				"Numer telefonu",
			APN: 						"APN",
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			MTU_SIZE: 					"Wielkość MTU(w bajtach)",
			OPTIONAL: 					"(Opcjonalnie)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Kontrola rodzicielska",
			UNKNOWN: 					"Nieznane",
			
			DEVICE_CTR: 				"Urządzenia objęte kontrolą rodzicielską",
			ID: 						"ID",
			DEVICE: 					"Nazwa urządzenia",
			MAC_ADDRESS: 				"Adres MAC",
			TIME: 						"Czas dostępu do Internetu",
			DESCRIPTION: 				"Opis",
			ENABLE: 					"Włącz",
			ENABLE_THIS_ENTRY: 			"Włącz ten wpis",
			OPTIONAL: 					"(Opcjonalnie)",
			BTN_VIEW: 					"Wyświetl urządzenia",
			
			DEVICE_LIST: 				"Lista urządzeń",
			SYSTEM_TIME: 				"Czas systemowy",
			
			RESTR: 						"Blokowanie treści",
			MODE: 						"Ograniczenia",
			BLACKMODE: 					"Czarna lista",
			WHITEMODE: 					"Biała lista",
			ACCESS_DEVICES_LIST: 		"Lista urządzeń",
			
			CHOOSE: 					"Wybierz",
			ADD_A_NEW_KEYWORD: 			"Dodaj nowe słowo kluczowe do zablokowania",
			ADD_A_NEW_DOMAIN_NAME: 		"Dodaj nową dozwoloną nazwę domeny",
			
			OPT: 						"Operacja",
			STATUS: 					"Kontrola rodzicielska",
			YOURPC:						"Twój komputer"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Sieć dla gości",
			MODE_2G: 					"Sieć bezprzewodowa 2,4GHz",
			MODE_5G: 					"Sieć bezprzewodowa 5GHz",
			WIRELESS_NETWORK_NAME: 		"Nazwa sieci bezprzewodowej (SSID)",
			WIRELESS_PASSWORD: 			"Hasło",
			DYNAMIC_PASSWORD: 			"Hasło",
			ENABLE_WIRELESS: 			"Włącz sieć dla gości",
			SAVE:						"Zapisz",
			HIDE_SSID: 					"Ukryj nazwę sieci",
			PASSWORD_CHANGE_CYCLE: 		"Interwał aktualizacji hasła",
			PER_DAY: 					"Codziennie",
			PER_WEEK: 					"Tygodniowo",
			PER_MONTH: 					"Miesięcznie",
			NEVER: 						"Nigdy",
			UNENCRYPTED:				"Sieć dla gości jest niezabezpieczona. Hasło możesz uzyskać w zakładce Zaawansowane."
		},

		STATUS: {
			TITLE: 						"Stan",
			INTERNET:					"Internet",
			WIRELESS:					"Sieć bezprzew",
			LAN:						"LAN",
			USB_TITLE:					"Urządzenia USB",
			PERFORMANCE: 				"Użycie zasobów",
			GUEST_NETWORK: 				"Sieć dla gości",
			ACCESS_DEVICES: 			"Urządzenia dostępowe",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2,4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Typ połączenia",

			MAC_ADDRESS: 				"Adres MAC",
			IP_ADDRESS: 				"Adres IP",
			RELEASE: 					"Zwolnij",
			RENEW: 						"Odnów",
			
			DYNAMIC_IP: 				"Dynamiczne IP",
			STATIC_IP: 					"Statyczne IP",
			SUBNET_MASK: 				"Maska podsieci",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Kabel BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Tunel 6do4",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass-Through (Bridge)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Brak",
			
			DEFAULT_GATEWAY: 			"Brama domyślna",
			DNS: 						"Serwer DNS",
			MAC: 						"Adres MAC",
			WDS_STATUS: 				"Stan WDS",
			
			IPV6_ADDRESS: 				"Adres IP",
			PRIMARY_DNS: 				"Preferowany DNS",
			SECOND_DNS: 				"Alternatywny DNS",

			RADIO: 						"Stan",

			NAME_SSID: 					"Nazwa sieci bezprzewodowej (SSID)",
			NETWORK_NAME_SSID:			"Nazwa sieci bezprzewodowej (SSID)",
			HIDE_SSID: 					"Ukryj nazwę sieci",
			MODE: 						"Tryb",
			CHANNEL: 					"Kanał",
			CHANNEL_WIDTH: 				"Szerokość kanału",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Bieżący kanał",

			WDS: 						"Stan WDS",
			WIRED_CLIENTS: 				"Klienci przewodowi",
			WIRELESS_CLIENTS: 			"Klienci bezprzewodowi",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Adres lokalny dla łącza",
			ASSIGN_TYPE: 				"Sposób przydziału",
			
			ALLOW_TO_SEE_EACH: 			"Pozwól gościom na komunikację między sobą",

			TOTAL: 						"Całkowitapojemność:",
			AVAILABLE: 					"Wolnemiejsce:",

			USB: 						"Dysk USB",
			PRINTER: 					"Drukarka",

			CPU_LOAD: 					"Wykorzystanie procesora",
			MEMORY_USAGE: 				"Wykorzystanie pamięci",

			IP_ADDR_P: 					"Adres IP:",
			MAC_ADDR_P: 				"Adres MAC:",
			CONN_TYPE_P: 				"Typ połączenia:",

			DISABLED: 					"Wyłączony",
			INIT: 						"Inic",
			SCAN: 						"Skan",
			AUTH: 						"Uwierz",
			ASSOC: 						"Powiąz",
			RUN: 						"Uruch",
			HOST: 						"Host",
			GUEST: 						"Gość",

			ON: 						"Włączone",
			OFF: 						"Wyłączone"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Typ połączenia",
			INTERNET_MAC_ADDRESS: 		"Adres MAC",
			
			CONNECT: 					"Połącz",
			DISCONNECT: 				"Rozłącz",

			IP_ADDR: 					"Adres IP",
			
			USE_DEFAULT_MAC: 			"Użyj domyślnego adresu MAC",
			USE_COMPUTER_MAC: 			"Użyj adresu MAC podłączonego komputera",
			USE_CUSTOM_MAC: 			"Użyj innego adresu MAC",
			MAC_CLONE: 					"Klonowanie MAC",
			
			CONFIG: 					"Konfig",
			
			IP_ADDRESS: 				"Adres IP",
			SUBNET_MASK: 				"Maska podsieci",
			DEFAULT_GATEWAY: 			"Brama domyślna",
			
			MANUAL_DNS: 				"Ręczny DNS",
			PRIMARY_DNS: 				"Preferowany DNS",
			SECOND_DNS: 				"Alternatywny DNS",
			
			RENEW: 						"Odnów",
			RELEASE: 					"Zwolnij",
			VIEW_MODE: 					"Sprawdź tryb",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Pobierz automatycznie od dostawcy usług",
			USE_FOLLOW_IP_ADDR: 		"Użyj następującego adresu IP",
			USE_FOLLOW_DNS_ADDR: 		"Użyj następujących adresów DNS",
			USE_FOLLOW_DNS_SERVER: 		"Użyj następującego serwera DNS",
			
			BASIC: 						"Podstawowe",
			ADVANCED: 					"Zaawansowane",
			
			DNS_ADDR_MODE: 				"Adresy DNS",
			MTU_SIZE: 					"Wielkość MTU",
			MTU_1500: 					"bajtów. (Domyślnie 1500, nie należy zmieniać jeśli nie jest to konieczne.)",
			MTU_1480: 					"bajtów. (Domyślnie 1480, nie należy zmieniać jeśli nie jest to konieczne.)",
			MTU_1460: 					"bajtów. (Domyślnie 1460, nie należy zmieniać jeśli nie jest to konieczne.)",
			MTU_1420: 					"bajtów. (Domyślnie 1420, nie należy zmieniać jeśli nie jest to konieczne.)",
			
			HOST_NAME: 					"Nazwa hosta",

			HOST_NAME_CONFIRM: 			"Nazwa hosta zawiera niedozwolone znaki, może powodować to nieprzewidywane działanie systemu. Czy na pewno chcesz kontynuować?",

			GET_IP_WITH_UNICAST_DHCP: 	"Uzyskaj adres IP przez DHCP typu Unicast (Najczęściej niewymagane).",
			OPTIONAL: 					"(Opcjonalnie)",
			
			STATIC_IP: 					"Statyczne IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"Auto",
						
			USER_NAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			
			INTERNET_IP_ADDR: 			"Adres IP",
			INTERNET_DNS: 				"Internet DNS",
			SECONDARY_CONN: 			"Połączenie dodatkowe",
			NONE: 						"Brak",
			INTERNET_PRIMARY_DNS:		"Preferowany DNS",
			INTERNET_SECONDARY_DNS: 	"Alternatywny DNS",
			
			DYNAMIC_IP: 				"Dynamiczne IP",
			DYNAMIC_IP_v6: 				"Dynamiczne IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Nazwa usługi",
			ACCESS_CONCENTRATOR_NAME:  	"Nazwa serwera",
			DETECT_ONLINE_INTERVAL: 	"Interwał wykrywania serwera",
			INTERVAL_TIPS: 				"sekund. (0-120. Domyślnie 10.)",
			IP_ADDR_MODE:  				"Adres IP",
			CONN_MODE: 					"Tryb połączenia",
			DHCP_LINK_UNPLUGGED: 		"Port WAN jest odłączony.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"Na żądanie",
			TIME_BASED: 				"Czasowe",
			MANUALLY: 					"Ręczne",
			MAX_IDLE_TIME: 				"Maksymalny czas nieaktywności",
			MAX_IDLE_TIME_TIPS: 		"minut. (0 oznacza ciągłe połączenie.)",
			PERIOD_OF_TIME: 			"Okres czasu",
			TIME_TIPS: 					"(GG:MM)",
			BIGPOND_CABLE: 				"Kabel BigPond",
			AUTH_SERVER: 				"Serwer uwierzytelniania",
			AUTH_DOMAIN: 				"Domena uwierzytelniania",
			L2TP: 						"L2TP",
			GATEWAY: 					"Brama",
			SERVER_IP_ADDR_NAME: 		"Adres IP serwera DNS/Domena",
			PPTP: 						"PPTP",
			TO: 						"do",
			
			TUNNEL_6TO4: 				"Tunel 6do4",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Pobierz stały adres IPv6",
			GET_PREFIX_DELEGATION: 		"Pobierz prefiks IPv6",
			IPV6_ADDR: 					"Adres IPv6",

			GET_IPV6_WAY: 				"Pobierz adres IPv6",
			AUTOMATICALLY:              "Pobierz automatycznie",
			SPECIFIED_BY_ISP: 			"Ustalony przez dostawcę usług",

			IPV6_ADDR_PREFIX: 			"Prefiks adresu IPv6",
			NONE_TEMPORARY: 			"Stały",

			PREFIX_DELEGATION: 			"Prefiks",
			ENABLE:                     "Włącz",
			DISABLE:                    "Wyłącz",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"Długość maski IPv4",
			CONFIG_TYPE: 				"Typ konfiguracji",
			RD6_PREFIX: 				"Prefiks 6RD",
			RD6_PREFIX_LENGTH: 			"Długość prefiksu 6RD",
			REPLY_IPV4_ADDR: 			"Adres IPv4 przekaźnika sieciowego",
			MANUAL: 					"Ręczna",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass Through (Bridge)",
			LOCAL_IPV6: 				"Lokalny adres IpV6",
			PEER_IPV6: 					"Równorzędny adres IpV6",
			TUNNEL_ADDR: 				"Adres tunelu",
			IPV4_NETMASK: 				"Maska sieci IPv4",
			CUSTOM: 					"Inny",
		    AFTR_NAME: 					"Nazwa AFTR",


			
			
			IPV4_ADDR: 					"Adres IPv4",
			IPV4_MASK: 					"Maska podsieci IPv4",
			IPV4_GATEWAY: 				"Brama domyślna IPv4",

			DUPLEX: 					"Dupleks",
			AUTO_NEGOTIATION: 			"Autonegocjacja",
			FULL_DUPLEX_1000: 			"1000Mb/s dla pełnego dupleksu",
			HALF_DUPLEX_1000:			"1000Mb/s dla pół-dupleksu",
			FULL_DUPLEX_100: 			"100Mb/s dla pełnego dupleksu",
			HALF_DUPLEX_100: 			"100Mb/s dla pół-dupleksu",
			FULL_DUPLEX_10: 			"10Mb/s dla pełnego dupleksu",
			HALF_DUPLEX_10: 			"10Mb/s dla pół-dupleksu"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"Adres MAC",
			IP_ADDRESS: 				"Adres IP",
			SUBNET_MASK: 				"Maska podsieci",
			CUSTOM: 					"Inny",

			IGMP: 						"Włącz IGMP Proxy",
			


			ASSIGNED_TYPE: 				"Sposób przydziału",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"Bezstanowe DHCP SLAAC+",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Prefiks adresu",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adres",
			DELEFATED: 					"Delegowany",
			STATIC: 					"Statyczny ",
			SITE_PREFIX: 				"Prefiks strony",
			SITE_PREFIX_LEN: 			"Długość prefiksu strony",

			PREFIX_TYPE:  				"Typ konfiguracji prefiksu strony",
			LAN_IPV6_ADDR:  			"Adres LAN IPV6",

			RELEASE_TIME: 				"Czas przydzielenia",
			RELEASE_TIME_TIP: 			"sekund. (Domyślnie 86400, nie należy zmieniać jeśli nie jest to konieczne.)",
			ADDRESS:					"Adres",
			SAVE: 						"Zapisz",

			REBOOT_TIP: 				"Router przechodzi do nowej strony logowania.<br/> Proszę czekać..."

		},

		IPTV:{
			TITLE: 						"Ustawienia",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Włącz IPTV", 
			MODE:  						"Tryb",
			IGMP_PROXY: 				"IGMP Proxy",
			IGMP_VERSION: 				"Wersja IGMP",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bridge",
			BASIC: 						"Inny",
			EXSTREAM: 					"Singapur-ExStream",
			RUSSIA:  					"Rosja",
			UNIFY:  					"Malezja-Unifi",
			MAXIS:  					"Malezja-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"IP-Phone", 

			Q_TAG: 						"Tag 802.1Q",
			ENABLE: 					"Włącz",
			
			INTERNET_VLAN_ID: 			"Internet Vlan ID",
			INTERNET_VLAN_PRIORITY: 	"Priorytet Internet VLAN",
			IP_PHONE_VLAN_ID: 			"IP-Phone Vlan ID",
			IP_PHONE_VLAN_PRIORITY: 	"Priorytet IP-Phone Vlan",
			IPTV_VLAN_ID: 				"IPTV Vlan ID",
			IPTV_VLAN_PRIORITY: 		"Priorytet IPTV Vlan",
			IPTV_MULTI_VLAN_ID: 		"IPTV Multicast Vlan ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"Priorytet IPTV Multicast Vlan"
		},

		DHCP_SERVER: {
			TITLE: 						"Serwer DHCP",
			
			SETTINGS: 					"Ustawienia",

			DHCP_SERVER: 				"Serwer DHCP",
			ENABLE_DHCP_SERVER: 		"Włącz serwer DHCP",

			IP_ADDR_POOL: 				"Pula adresów IP",
			LEASETIME: 					"Czas przydzielenia adresu",
			LEASENOTE: 					"minut. (2-2880. Domyślna wartość to 120.)",
			
			GATEWAY: 					"Brama domyślna",
			DOMAIN: 					"Domena domyślna",
			PRIMARYDNS: 				"Preferowany DNS",
			SECONDARYDNS: 				"Alternatywny DNS",

			OPTIONAL: 					"(Opcjonalnie)",

			CLIENTSLIST: 				"Lista klientów DHCP",
			CLIENT_NUMBER: 				"Ilość klientów",
			CLIENT_NAME: 				"Nazwa klienta",
			MAC_ADDR: 					"Adres MAC",
			ASSIGNED_IP: 				"Przydzielone IP",
			LEASE_TIME: 				"Czas przydzielenia",

			RESERVATION: 				"Rezerwacja adresów",

			RESERVED_IP: 				"Zarezerwowany adres IP",
			IP_ADDRESS: 				"Adres IP",
			DESCRIPTION: 				"Opis",

			CLIENTSLIST: 				"Lista klientów DHCP",
			CLIENT_NUMBER: 				"Ilość klientów",

			ENABLE: 					"Włącz",
			ENABLE_THIS_ENTRY: 			"Włącz ten wpis",
			BTN_VIEW:					"Wyświetl urządzenia"
			
		},

		DDNS: {
			DDNS: 						"Dynamiczny DNS",
			SERVICEPROVIDER: 			"Usługodawca",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Zarejestruj się…",
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			DOMAIN_NAME_LIST: 			"Nazwa listy domenowej",
			DOMAIN_NAME: 				"Domena",
			LOGIN: 						"Zaloguj",
			LOGIN_SAVE: 				"Zaloguj i zapisz", 
			LOGOUT: 					"Wyloguj",
			STATU_SUCCESS:				"Sukces",
			UPDATE_INTERVAL:			"Interwał aktualizacji",
			ONE_HOUR:					"1 godzina",
			SIX_HOUR:					"6 godzin",
			TWETEEN_HOUR:				"12 godzin",
			ONE_DAY:					"1 dzień",
			TWO_DAY:					"2 dni",
			THREE_DAY:					"3 dni",
			NEVER:						"nigdy",
			UPDATE:						"Aktualizuj",
			STATU_INCORRENT:			"Nieprawidłowa nazwa użytkownika lub hasło",
			STATU_ERR_DOMAIN:			"Błąd domeny",
			
			STATU_NO_LAUNCH:			"Nie załadowano",
			STATU_FAIL_DDNS: 			"Nie udało się zaktualizować DynDNS.",
			STATU_FAIL_NOIP: 			"Nie udało się zaktualizować No-IP.",
			STATU_CONN:					"Łączenie"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Routing zaawansowany",
			STATIC_ROUTING: 			"Routing statyczny",

			DESTINATION_NETWORK:		"Sieć docelowa",
			SUBNET_MASK: 				"Maska podsieci",
			DEFAULT_GATEWAY: 			"Brama domyślna",
			DESCRIPTION: 				"Opis",
			
			SYSTEM_ROUTING_TABLE: 		"Tablica routingu",
			CLIENT_NUMBER: 				"Ilość klientów",

			GATEWAY: 					"Brama",
			INTERFACE: 					"Interfejs",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Włącz",
			ENABLE_THIS_ENTRY: 			"Włącz ten wpis"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Ustawienia",
			NOT_SUPPORT_5G: 			"W tym regionie dozwolone jest jedynie pasmo 2,4GHz. Upewnij się, że wybrałeś swój region poprawnie. ",
			NOT_SUPPORT_60G: 			"W tym regionie połączenie 60GHz nie jest dostępne.",
			ENABLE_TIPS: 				"Włącz sieć bezprzewodową.",

			REGION: 					"Region",
			NOTICE:  					"Aby korzystać z funkcji sieci bezprzewodowej, bezprzewodowy sprzęt musi być uruchomiony.",
			
			MODE_2G:					"2,4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Sieć bezprzewodowa",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Włącz sieć",

			WIRELESS_NETWORK_NAME: 		"Nazwa sieci bezprzewodowej (SSID)",
			WIRELESS_PASSWORD: 			"Hasło",
			HIDE_SSID: 					"Ukryj nazwę sieci",

			SECURITY: 					"Zabezpieczenia",
			NO_SECURITY: 				"Brak zabezpieczeń",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal (Zalecane)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2-Enterprise",
			WPA2_PERSONAL: 			    "WPA2-Personal (zalecane)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Wersja",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Szyfrowanie",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Tryb",
			MODE_B:  					"Tylko 802.11b",
			MODE_G:  					"Tylko 802.11g",
			MODE_N:  					"Tylko 802.11n",
			MODE_BG:  					"Mieszany 802.11b/g",
			MODE_GN: 					"Mieszany 802.11g/n",
			MODE_BGN:  					"Mieszany 802.11b/g/n",

			MODE_A_5: 					"Tylko 802.11a",
			MODE_AN_5: 					"Mieszany 802.11a/n",
			MODE_N_5: 					"Tylko 802.11n",
			MODE_AC_5:					"Tylko 802.11ac",
			MODE_NAC_5:					"Mieszany 802.11n/ac",
			MODE_ANAC_5:				"Mieszany 802.11a/n/ac",

			MODE_AD_60:					"Tylko 802.11ad",

			CHANNEL_WIDTH: 				"Szerokość kanału",
			CHANNEL: 					"Kanał",

			TRANSMIT_POWER: 			"Moc transmisji",

			RADIUS_SERVER_IP: 			"Adres IP serwera RADIUS",
			RADIUS_PORT: 				"Port serwera RADIUS",
			RADIUS_PASSWORD: 			"Hasło serwera RADIUS",

			TYPE: 						"Typ",
			OPEN_SYSTEM: 				"Otwarty",
			SHARED_KEY: 				"Klucz wspólny",

			KEY_SELECTED: 				"Wybrany klucz",
			KEY1: 						"Klucz1",
			KEY2: 						"Klucz2",
			KEY3: 						"Klucz3",
			KEY4: 						"Klucz4",

			WEP_KEY_FORMAT: 			"Format klucza WEP",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Szesnastkowy",

			KEY_TYPE: 					"Typ klucza",
			BIT64: 						"64-bitowy",
			BIT128: 					"128-bitowy",
			BIT152: 					"152-bitowy",

			KEY_VALUE: 					"Klucz",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Niska",
			MIDDLE: 					"Średnia",
			HIGH: 						"Wysoka"
		},

		WPS: {

			TITLE2: 					"PIN routera",
			ROUTERS_PIN_INFO: 			"Inne urządzenia mogą połączyć się z routerem przy użyciu funkcji WPS, korzystając z kodu PIN routera.",
			ENABLE_ROUTE_PIN: 			"PIN routera",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Generuj",
			DFT: 						"Domyślny",

			TITLE: 						"Kreator WPS",
			SELECT_SETUP: 				"Wybierz metodę konfiguracji",
			PUSH_BTN: 					"Za pomocą przycisku (Zalecane)",
			PUSH_DES: 					"Naciśnij przycisk WPS na routerze lub naciśnij Połącz poniżej.",
			CONNECT: 					"Połącz",
			CANCEL: 					"Anuluj",

			RESULT_HEAD: 				"Klient bezprzewodowy",
			RESULT_END: 				"został dodany do sieci.",
			NOT_FOUND: 					"Nie wykryto klienta. Naciśnij przycisk, aby spróbować ponownie.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Nie znaleziono",
			ENTER_CLIENT_PIN: 			"Wprowadź kod PIN klienta",
			SWITCH_NOTE:				"Włącz sieć bezprzewodową przyciskiem, aby połączyć się za pomocą WPS.",
			SWITCH_NOTE2:				"Aby używać kreatora WPS, należy najpierw skonfigurować odpowiednie parametry sieci bezprzewodowej.",
			STATUS_PIN_ERROR: 			"Niewłaściwy PIN WPS? Sprawdź czy kod jest poprawny.",
			STATUS_ERROR: 				"Błąd.",
			STATUS_CONN_ERROR: 			"Błąd połączenia.",
			STATUS_CONNING: 			"Łączenie...",
			STATUS_CANCEL: 				"Połączenie anulowane.",
			
			NOTE: 						"Uwaga:",
			BUTTON: 					"Sieć bezprzewodowa wyłączona za pomocą przycisku.",
			ENABLE: 					"Sieć bezprzewodowa jest wyłączona.",
			HIDDEN: 					"Funkcja Ukryj SSID jest włączona.",
			ENCRYPTION: 				"Niewłaściwe szyfrowanie.",
			WPS: 						"Funkcja WPS jest wyłączona na stronie Parametrów systemowych.",

			
			STATUS_CONN_OVERLAP: 		"Błąd połączenia(OVERLAP).",
			STATUS_CONN_TIMEOUT: 		"Błąd połączenia(TIMEOUT).",
			STATUS_CONN_INACT: 			"Połączenie nieaktywne."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Aktywne odbiorniki bezprzewodowe",
			CLIENT_NUMBER: 				"Ilość klientów",
			MAC_ADDRESS: 				"Adres MAC",
			CONN_TYPE: 					"Typ połączenia",
			SECURITY: 					"Zabezpieczenia",
			RECEIVED_PACKETS: 			"Pakiety otrzymane",
			SEND_PACKETS: 				"Pakiety wysłane"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Ustawienia",
			
			MODE_2G: 					"2,4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Pozwól gościom na komunikację między sobą",

			ALLOW_LOCAL: 				"Pozwól gościom na dostęp do sieci lokalnej",
			
			WIRELESS: 					"Sieć bezprzewodowa",
			WIRELESS_24G_RADIO: 		"Sieć bezprzewodowa 2,4GHz",
			WIRELESS_5G_RADIO: 			"Sieć bezprzewodowa 5GHz",
			ENABLE_GUEST: 				"Włącz sieć dla gości",

			NAME_SSID: 					"Nazwa sieci bezprzewodowej (SSID)",
			HIDE_SSID: 					"Ukryj nazwę sieci",
			PASSWORD_CHANGE_CYCLE: 		"Interwał aktualizacji hasła",
			PER_DAY: 					"Codziennie",
			PER_WEEK: 					"Co tydzień",
			PER_MONTH: 					"Co miesiąc",
			NEVER: 						"Nigdy",
			SECURITY: 					"Zabezpieczenia",
			NO_SECURITY: 				"Brak zabezpieczeń",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal",

			VERSION: 					"Wersja",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Szyfrowanie",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Hasło"
		},

		NAT:{
			SETTINGS: 					"Sprzętowe NAT",
			STATUS: 					"Sprzętowe NAT",
			
			ALG_TITLE: 					"Application Layer Gateway (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP Passthrough",
			L2TP_ALG: 					"L2TP Passthrough",
			IPSEC_ALG: 					"IPSec Passthrough",

			ENABLE_FTP_ALG: 			"Włącz FTP ALG",
			ENABLE_TFTP_ALG: 			"Włącz TFTP ALG",
			ENABLE_H323_ALG: 			"Włącz H323 ALG",
			ENABLE_RTSP_ALG: 			"Włącz RTSP ALG",
			ENABLE_PPTP_ALG: 			"Włącz PPTP Passthrough",
			ENABLE_L2TP_ALG: 			"Włącz L2TP Passthrough",
			ENABLE_IPSEC_ALG: 			"Włącz IPSec Passthrough",
			NAT_ENABLE_NOTICE: 			"Uwaga: Zmiany konfiguracyjne będę aktywne dopiero po włączeniu funkcji NAT."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Serwery wirtualne",

			SERVICE_NAME: 				"Typ usługi",
			EXTERNAL_PORT: 				"Port zewnętrzny",
			INTERNAL_IP: 				"Adres IP",
			INTERNAL_PORT: 				"Port wewnętrzny",
			PROTOCAL: 					"Protokół",

			BTN_VIEW: 					"Wyświetl zdefiniowane usługi",

			EXSITTING_SERVICE: 			"Zdefiniowane usługi",
			
			PROTOCAL_ALL: 				"WSZYSTKIE",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX lub XX)",
			EXT_PORT_TIPS: 				"(XX lub XX-XX, 1-65535)",
			INT_PORT_TIPS: 				"(XX lub Puste, 1-65535)",

			NOTICE:						"Konfilkt z portem zarządzania zdalnego. Czy na pewno chcesz kontynuować?",
			NOTICE_INVALID_REMOTE:		"Zarządzanie zdalne nie działa przez konflikt z portem 80 serweru wirtualnego. Zmień port zarządzania zdalnego.",
			NOTICE_ENTER_ANOTHER:		"Konfilkt z portem zarządzania zdalnego. Wybierz inny port.",
			NOTICE_PPTP_CONFLICT:		"Konflikt z portem PPTP VPN. Wprowadź inny numer portu.",
			NOTICE_OPENVPN_CONFLICT:	"Konflikt z portem OPENVPN. Wprowadź inny numer portu.",


			ENABLE_THIS_ENTRY: 			"Włącz",
			OPERATION: 					"Operacja",
			CHOOSE: 					"Wybierz",
			NAT_ENABLE_NOTICE: 			"Uwaga: Zmiany konfiguracyjne będę aktywne dopiero po włączeniu funkcji NAT."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port Triggering",
			APPLICATION: 				"Usługa",
			TRIGGER_PORT: 				"Port otwierający",
			TRIGGER_PROTOCOL: 			"Protokół otwierający",

			EXTERNAL_PORTS: 			"Port zewnętrzny",
			EXTERNAL_PROTOCOL: 			"Protokół zewnętrzny",

			BTN_VIEW: 					"Wyświetl zdefiniowane usługi",

			EXSITTING_APPLICATION: 		"Zdefiniowane usługi",
			APPLICATION_NAME: 			"Nazwa usługi",
			TRIGGER_TIPS: 				"(XX, 1-65535)",
			EXTERNAL_TIPS: 				"(XX lub XX-XX, 1-65535, maksymalnie 5 par)",
			
			NOTICE_PPTP_CONFLICT:		"Konflikt z portem PPTP VPN. Wprowadź inny numer portu.",
			NOTICE_OPENVPN_CONFLICT:	"Konflikt z portem OPENVPN. Wprowadź inny numer portu.",
			
			ENABLE_THIS_ENTRY: 			"Włącz",
			OPERATION: 					"Operacja",
			
			PROTOCAL_ALL: 				"WSZYSTKIE",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Uwaga: Zmiany konfiguracyjne będę aktywne dopiero po włączeniu funkcji NAT."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Włącz DMZ",
			HARDWARESTATUS: 			"Adres IP hosta DMZ",
			NAT_ENABLE_NOTICE: 			"Uwaga: Zmiany konfiguracyjne będę aktywne dopiero po włączeniu funkcji NAT."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"Lista aktualnych ustawień UPnP",
			CLIENT_NUMBER: 				"Ilość klientów",
			SERVICE: 					"Opis usługi",
			EXTERNAL_PORT: 				"Port zewnętrzny",
			PROTOCAL: 					"Protokół",
			IP_ADDR: 					"Adres IP",
			INTERNAL_PORT: 				"Port wewnętrzny",
			NAT_ENABLE_NOTICE: 			"Uwaga: Zmiany konfiguracyjne będę aktywne dopiero po włączeniu funkcji NAT."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"Modem USB",
			LOCATION: 					"Lokalizacja",
			MOBILE_ISP: 				"Komórkowy dostawca usług internetowych ",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Tryb połączenia",
			CONNECT_ON_DEMAND: 			"Łącz na żądanie",
			CONNECT_AUTOMATICALLY: 		"Łącz automatycznie",
			CONNECT_MANUALLY: 			"Łącz ręcznie",
			MAX_IDLE_TIME: 				"Maksymalny czas nieaktywności",
			CONNECTION_TIP: 			"Aktualnie wybrana opcja to Preferowany WAN.",
			IDLE_TIME_TIP: 				"Tryb połączenia i maksymalny czas przestojów nie mogą być ustawiane ręcznie.",
			MINUTES: 					"minut. (0 oznacza ciągłe połączenie.)",

			AUTHENTICATION_TYPE: 		"Typ uwierzytelniania",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Domyślnie ustawione jest Auto, nie należy zmieniać jeśli nie jest to konieczne.",

			CONNECT: 					"Połącz",
			DISCONNECT: 				"Rozłącz",

			SET_TIP: 					"Ustaw ręcznie numer telefonu, APN, nazwę użytkownika i hasło.",
			DIAL_NUMBER: 				"Numer telefonu",
			APN: 						"APN",
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			OPTIONAL: 					"(Opcjonalnie)",
			MTU_SIZE: 					"Wielkość MTU(w bajtach)",
			MTU_SIZE_TIP: 				"Domyślnie 1480, nie należy zmieniać jeśli nie jest to konieczne",

			USE_FOLLOW_DNS_SERVER: 		"Użyj następujących adresów DNS",
			PRIMARY_DNS: 				"Preferowany DNS",
			SECOND_DNS: 				"Alternatywny DNS",

			UNPLUGGED: 					"Odłączony",
			IDENTIFYING: 				"Rozpoznawanie...",
			IDENTIFY_SUCCESS: 			"Rozpoznano"
		},

		DISK_SETTING: {
			DISK_SET: 					"Ustawienia urządzeń",
			SCAN: 						"Skanuj",
			SELFLY_REMOVE: 				"Bezpieczne usuwanie",
			SCAN_RESULT: 				"Znaleziono dysków: %n",
			NOT_FOUND: 					"Nie znaleziono",
			SELFLY_REMOVE: 				"Bezpieczne usuwanie",
			
			VOLUMN: 					"Wolumin",
			CAPACITY: 					"Pojemność",
			FREESPACE: 					"Wolne miejsce",
			USBSPACE: 					"Wykorzystane miejsce",
			
			STATUS: 					"Stan",
			INACT: 						"Dezaktywuj",
			ACTIVE: 					"Aktywny",
			
			USAGE: 						"Zużycie",
			CAPACITY: 					"Pojemność",
			OPERATION: 					"Operacja",	
			
			ACC: 						"Zarządzanie kontami", 	 	
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			USE_LOGIN: 					"Użyj loginu użytkownika",
			SCAN: 						"Skanuj",
			ENJECT_ALL: 				"Wysuń wszystkie",
			ENJECT: 					"Wysuń",
			ADD_USER: 					"Dodaj użytkownika",
			AUTH: 						"Uprawnienia"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Pobieranie w trybie offline",
			ITEMS:						"Pozycje",
			FILE:						"Plik",
			FOLDER:						"Folder",
			SIZE:						"Rozmiar",
			STATUS:						"Stan",
			DOWNLOAD:					"Pobieranie",
			REMAINTING:					"Pozostały czas",
			SPEED:						"Prędkość",
			SOURCE:						"Źródło",	
			DOWNLOADTO:					"Pobierz do",	
			TORRENT_PC:					"Torrenty z PC",
			TORRENT_USB:				"Torrenty z USB",
			SOURCE_URL:					"RL",	
			URL:						"RL",	
			AMULE:						"aMule",
			AMULETCP:					"Port aMule TCP",
			AMULEUDP:					"Port aMule UDP",
			AMULESERVER:				"Serwer aMule",
			SCHEDULE:					"Harmonogram",
			MAXACTIVE:					"Maksymalna ilość zadań",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Strefa czasowa",
			DOWNLOADTIME:				"Czas pobierania",
			REPEAT:						"Powtórz",
			SPEEDLIMIT:					"Limity prędkości",
			MAXDOWNLOAD:				"Maksymalna prędkość pobierania",
			MAXUPLOAD:					"Maksymalna prędkość wysyłania",
			SPEEDTIPS:					"(0 oznacza brak limitów.)",
			BTPORT:						"Port pobierania BT",
			SEED:						"Wysyłaj po ukończeniu pobierania",
			UNIT:						"KB/S",
			MODIFY:						"Zmień",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Lokalizacja torrenta",
			CONNECT:					"Połączony",
			DISCONNECTED:				"Rozłączony",
			CONNECTING:					"Łączenie",
			GENERAL:					"Ogólne",
			COMPLETED:					"Ukończono",
			NEWDEVICE:					"Nowe urządzenie",
			FOUNDUSB:					"Wykryto nowe urządzenie USB",
			CONNECTEDPEERS:				"Połączeni użytkownicy",
			OF:							"z",
			NUM_OF_CON:					"Liczba połączeń",
			NUM_OF_CON_G:				"Ogólna maksymalna liczba połączeń",
			NUM_OF_CON_PT:				"Maksymalna liczba połączonych peerów na jeden torrent",
			EN_DHT_NET:					"Włącz sieć DHT",
			EN_PE_EX:					"Włącz wymianę pomiędzy peerami",
			EN_BT:						"Włącz szyfrowanie protokołu BitTorrent.",
			GENERAL_SETTINGS:			"Ustawienia ogólne",
			BT_SETTINGS:				"Ustawienia BT",
			AMULE_SETTINGS:				"Ustawienia aMule",
			CLEAN:						"Usuwaj ukończone",
			NONE_COMPLETE: 				"Brak ukończonych zadań."
		},

		FOLDER: {
			TITLE: 						"Ustawienia udostępniania",
			ACCOUNT_TITLE: 				"Konto dostępowe",
			ACCOUNT:					"Konto",
			AC_NOTE: 					"Przygotuj konto do udostępniania plików. Możesz skorzystać z konta zarządzania routerem  lub utworzyć nowe konto.",
			
			AC_LOGIN: 					"Użyj domyślnego konta",
			AC_FOLLOW: 					"Użyj nowego konta",

			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",
			CONFIRM: 					"Potwierdź hasło",

			SHARING_SETTING: 			"Ustawienia udostępniania",
			SERVER_NAME: 				"Nazwa serwera sieci/multimediów",

			METHOD: 					"Metoda dostępu",
			LINK: 						"Link",
			PORT: 						"Port",

			NETWORK_NEIGHBORHOOD: 		"Otoczenie sieciowe",
			FTP: 						"FTP",
			FTPEX: 						"FTP (przez Internet)",

			SHARE_FOLDER: 				"Udostępnianie folderów",
			SHAREING_ALL: 				"Udostępnij wszystko",
			NOTE:  						"Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz, aby udostępnić tylko wybrane foldery.", 
			ENABLE_AUTHENTICATION: 		"Wymagaj uwierzytelniania",
			SHAREING_FOLDER: 			"Udostępnianie folderów",
			
			SHARE_NAME: 				"Nazwa folderu",
			FOLDER_PATH: 				"Ścieżka dostępu",
			VOLUMN_NAME: 				"Nazwa woluminu",

			SHARE_NAME: 				"Nazwa folderu",
			FOLDER_PATH: 				"Ścieżka dostępu",
			MEDIA_SHARING: 				"Udostępnianie multimediów",
			STATUS: 					"Stan",

			GUEST_ACCESS: 				"Zezwól na dostęp sieci dla gości",
			ENABLE_AUTHENTICATION: 		"Wymagaj uwierzytelniania",
			ENABLE_WRITE_ACCESS: 		"Włącz możliwość zapisu",
			ENABLE_MEDIA_SHARE: 		"Włącz udostępnianie multimediów",
			
			BROWSE: 					"Przeglądaj",
			BROWSE_TITLE: 				"Wybierz folder",

			NO_VOLUMN:					"Brak woluminu",
			
			NOTICE: 					"Czy na pewno chcesz opuścić tę stronę? Naciśnij Zapisz, aby zapisać ustawienia i zamknąć okno. Naciśnij Wyjdź, aby zamknąć stronę bez zapisywania. Naciśnij Anuluj, aby pozostać na stronie.",
			NO_CHANGE_NOTICE: 			"Czy na pewno chcesz opuścić tę stronę?",

			SAVE_FAILED_NOTICE: 		"Nie udało się zapisać",
			CONTINUE: 					"Wyjdź",
			CONTINUE_SAVE: 				"Zapisz",
			CANCLE: 					"Anuluj",

			ENABLE: 					"Włącz"

		},

		PRINT:{
			TITLE: 						"Serwer druku",
			NAME: 						"Nazwa drukarki",
			ENABLE_PRINT_SERVER: 		"Serwer druku",
			NONE: 						"Brak",
			
			NOTE_TITLE: 				"Uwaga:",
			STEP1: 						"Krok1:",
			STEP2: 						"Krok2:",
			STEP3: 						"Krok3:",

			NOTE1: 						"Zainstaluj sterowniki drukarki na komputerze.",
			NOTE2: 						"Podłącz drukarkę do portu routera za pomocą kabla USB. ",
			NOTE3: 						"Zainstaluj aplikację TP-LINK USB Printer Controller na komputerze. Pobierz ją z naszej strony internetowej: <a class=\"link\" href=\"http://www.tp-link.com.pl/Support/\">http://www.tp-link.com.pl/Support/</a>.",
			NOTE3_US: 					"Zainstaluj aplikację TP-LINK USB Printer Controller Utility. Możesz pobrać ją ze strony: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.com.pl/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Kontrola rodzicielska",
			STATUS: 					"Kontrola rodzicielska",
			UNKNOWN: 					"Nieznane",

			DEVICE_CTR: 				"Urządzenia objęte kontrolą rodzicielską",
			DEVICE: 					"Nazwa urządzenia",
			MAC_ADDRESS: 				"Adres MAC",
			TIME: 						"Czas dostępu do Internetu",
			DESCRIPTION: 				"Opis",
			
			ENABLE_THIS_ENTRY: 			"Włącz",
			OPTIONAL: 					"(Opcjonalnie)",
			BTN_VIEW: 					"Wyświetl urządzenia",
			
			DEVICE_LIST: 				"Lista urządzeń",
			SYSTEM_TIME: 				"Czas systemowy",
			
			RESTR: 						"Blokowanie treści",
			MODE: 						"Ograniczenia",
			BLACKMODE: 					"Czarna lista",
			WHITEMODE: 					"Biała lista",
			ACCESS_DEVICES_LIST: 		"Lista urządzeń",
			
			CHOOSE: 					"Wybierz",
			ADD_A_NEW_KEYWORD: 			"Dodaj nowe słowo kluczowe do zablokowania",
			ADD_A_NEW_DOMAIN_NAME: 		"Dodaj nową dozwoloną nazwę domeny",
			
			YOURPC:						"Twój komputer"
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
			OTHERS: 					"Inne",

			DEVICE: 					"Urządzenie",
			RATE: 						"Prędkość",
			APPLICATION: 				"Usługa",

			NAME: 						"Nazwa",
			MAC_ADDRESS: 				"Adres MAC",
			IP_ADDRESS: 				"Adres IP",


			DEVICES: 					"Urządzenia"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Przepustowość",
			TEST_BANDWIDTH: 			">Test przepustowości",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Włącz streamboost",
			UP_LIMITATION: 				"Prędkość wysyłania (Mb/s)",
			DOWN_LIMITATION: 			"Prędkość pobierania (Mb/s)",
			RUN_BANDWIDTH_TEST: 		"Uruchom test przepustowości",
			TESTING: 					"Testowanie",
			TEST_FAILED: 				"Błąd testu",
			TEST_SUCCEED: 				"Test zakończony",
			ENABLE_AUTOMATIC_TEST: 		"Włącz automatyczne testowanie",
			KEEP_UP_TO_DATE: 			"Aktualizuj StreamBoost",
			ENABLE_AUTOMATIC_UPDATE: 	"Włącz automatyczną aktualizację"

		},

		PRIORITY:{
			PRIORITY: 					"Priorytet",
			PRIORITY_TIPS: 				"Priorytet pozwala na ustalenie kolejności urządzeń pod względem ich znaczenia. Funkcja ta jest przydatna, gdy urządzenia przy zastosowaniu tej samej klasyfikacji konkurują o dostęp do pasma o ograniczonej częstotliwości.",
			ALL_DEVICE: 				"Wszystkie urządzenia",
			ACTIVE_DEVICE: 				"Aktywne urządzenia",
			SAVE: 						"Zapisz",
			ID: 						"ID",
			DEVICE: 					"Urządzenie",
			TYPE: 						"Typ",
			MAC_ADDRESS: 				"Adres MAC",
			STICK: 						"Pendrive"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statystyki",
			UP_TIME: 					"Czas działania",
			DOWNLOADS: 					"Pobrane",
			LAST_DAY: 					"Dzisiaj",
			LAST_WEEK: 					"Ostatni tydzień",
			LAST_MONTH: 				"Ostatni miesiąc",
			ALL_LAN_HOSTS: 				"Wszystkie hosty LAN",
			OTHER: 						"Inne"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Firewall",
			ENABLE_SPI: 				"Firewall SPI",

			DOS_PROTECTION: 			"Ochrona DoS",
			ENABLE_DOS: 				"Ochrona DoS",
			
			OFF: 						"Wyłączone",
			LOW: 						"Słabe",
			MIDDLE: 					"Średnie",
			HIGH: 						"Mocne",

			ICMP: 						"Filtrowanie ataków ICMP-FLOOD",
			UDP: 						"Filtrowanie ataków UDP-FLOOD",
			TCP: 						"Filtrowanie ataków TCP-SYN-FLOOD",
			ENABLE_DOS_TIP:             "Ochrona DoS oraz Statystyki ruchu muszą być włączone w tym samym czasie.",

			IGNORE: 					"Ignoruj pakiety ping z portu WAN",
			FORBID: 					"Blokuj pakiety ping z portów LAN",

			BLOCK_DOS: 					"Lista zablokowanych hostów DoS",
			HOST_NUMBER: 				"Ilość hostów",
			IP_ADDRESS: 				"Adres IP",
			MAC_ADDRESS: 				"Adres MAC"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Kontrola dostępu",
			ENABLE_ACCESS: 				"Kontrola dostępu",

			ACCESS_MODE: 				"Tryb pracy",
			DEFAULT_ACCESS_MODE: 		"Domyślny tryb pracy",
			BLACK_LIST: 				"Czarna lista",
			WHITE_LIST: 				"Biała lista",
			
			WIRED:						"Przewodowe",
			WIRELESS:					"Bezprzew",

			DEVICE_ONLINE: 				"Aktywne urządzenia",
			NAME: 						"Nazwa urządzenia",
			IP_ADDRESS: 				"Adres IP",
			MAC_ADDRESS: 				"Adres MAC",
			CONN_TYPE: 					"Typ połączenia",

			BLOCK: 						"Blokuj",

			DEVICE_IN_WHITE: 			"Biała lista urządzeń",
			DEVICE_IN_BLACK: 			"Czarna lista urządzeń"
		},

		IP_MAC:{
			TITLE: 						"Ustawienia",
			ENABLE_ARP: 				"Wiązanie ARP",

			ARP_LIST: 					"Lista ARP",
			ARP_NUM: 					"Ilość wpisów ARP",

			MAC_ADDRESS: 				"Adres MAC",
			IP_ADDRESS: 				"Adres IP",
			BOUND: 						"Powiązane",
			UNBOUND: 					"Niepowiązane",

			BINDING_LIST: 				"Lista powiązanych",
			DESCRIPTION: 				"Opis",
			OPTIONAL: 					"(Opcjonalnie)",
			ENABLE_THIS_ENTRY: 			"Włącz"
		},

		TIMESET: {
			TITLE: 						"Ustawienia czasu",
			ZONE: 						"Strefa czasowa",
			DATE: 						"Data",
			DATEFORMAT: 				"MM/DD/RRRR",
			TIME: 						"Czas",
			TIMEFORMAT: 				"(GG/MM/SS)",
			NTP1: 						"Serwer NTP I",
			NTP2: 						"Serwer NTP II",
			OPTIONAL: 					"(Opcjonalnie)",

			CURRENT_TIME:  				"Aktualna godzina",
			SET_TIME: 					"Ustaw czas",
			AUTOMATIC: 					"Pobierz automatycznie z Internetu",
			MANUAL: 					"Ręcznie",
			AUTOMATIC_BTN: 				"Pobierz",


			GETGMT: 					"Ustal UTC",

			
			GETGMT_SUCCESS: 			"Ustal czas za pomocą serwera NTP",
			GETGMT_TIMEOUT: 			"Ustal limit czasu za pomocą serwera NTP",
			GETGMT_WAIT: 				"Oczekiwanie",
			
			M: 							"M",
			W: 							"T",
			D: 							"D",
			H: 							"G",
			
			DAYLIGHT_SAVING: 			"Zmiana czasu",
			ENABLE_DAYLIGHT: 			"Włącz Zmianę czasu",
			START: 						"Początek",
			END: 						"Koniec",

			RUNNING_STATUS: 			"Stan",
			DOWN: 						"Zmiana czasu jest nieaktywna",
			UP: 						"Zmiana czasu jest aktywna"
		},

		DIAG:{
			TITLE: 						"Diagnostyka",
			DIAGNOSTIC_TOOL: 			"Narzędzie diagnostyczne",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"Adres IP/Domena",
			COUNT: 						"Ilość pakietów Ping",
			
			BASIC: 						"Podstawowe",
			ADVANCED: 					"Zaawansowane",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Rozmiar pakietów Ping",
			PKTUNIT: 					"(4-1472 bajtów)",

			TIMEOUT: 					"Limit czasu Ping",
			TIMOUTUNIT: 				"(100-2000 milisekund)",

			TTL: 						"Maksymalna wartość TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Początek",
			STOP: 						"Koniec"
		},

		FIRMWARE:{
			TITLE: 						"Aktualizacja firmware",
			FIRMWARE_INFO:  			"Korzystasz z najnowszej wersji firmware'u",
			INFO: 						"Informacje o urządzeniu",
			REMOTE_TITLE: 				"Aktualizacja w trybie online",
			LOCAL_TITLE: 				"Aktualizacja z pliku",

			NEWFILE: 					"Plik firmware",
			FIRMWAREVERSION: 			"Wersja firmware",
			HARDWAREVERSION: 			"Wersja sprzętowa",
			LATESTVERSION: 				"Najnowsza wersja",
			CONFIRM_CONTENT:			"Czy na pewno chcesz zaktualizować firmware?",
			WARNING:					"Aktualizacja firmware'u… <br/> Aby zapobiec błędom, pozostaw urządzenie włączone i nie wykonuj żadnych działań podczas tego procesu.",
			REBOOTING: 					"Restartowanie…<br/> Aby zapobiec błędom, nie odłączaj urządzenia od zasilania i nie wykonuj żadnych działań podczas tego procesu.",
			DO_NOT_OPERATE: 			"Aktualizacja... <br/>Proszę NIE wykonywać żadnych operacji podczas tego procesu.",
			FIRMWARE_UPDATING_NOTE: 	"1.Aktualizacja firmware'u…",
			REBOOTING_NOTE: 			"2.Restartowanie…",
			SCREEN_UPDATING_NOTE: 		"3.Aktualizacja ekranu…",
			UPGRADE_FAILED: 			"Błąd aktualizacji.",
			UPGRADE: 					"Aktualizuj",
			CHECK: 						"Sprawdź",
			DOWNLOADING: 				"Pobieranie…",
			UPGRADE_INOF: 				"Aby zapobiec błędom, nie odłączaj routera od zasilania.",
			NOTE: 						"Uwaga:",
			NO_UPGRADE: 				"To jest najnowsza wersja",

			UPGRADING: 					"Uaktualnianie…",
			RETRY: 						"Spróbuj ponownie",
			CANCEL: 					"Anuluj",
			ILEGAL_DEVICE:				"Nie udało się zidentyfikować urządzenia. Skontaktuj się ze wsparciem technicznym firmy TP-LINK.",
			UPGRADE_FAIL: 				"Nie udało się uaktualnić. Spróbuj ponownie później.",
			CHECK_UPGRADE:				"Sprawdź dostępne aktualizacje"
		},

		BACKUP:{
			BACKUP: 					"Zapisz ustawienia",
			BACKUPTIP: 					"Zapisz aktualne ustawienia routera.",

			RESTORE: 					"Przywróć ustawienia",
			RESTORETIP: 				"Przywróć ustawienia routera z pliku.",
			
			RESTORE_WARN:				"Przywracanie ustawień routera… <br/>Proszę nie wykonywać żadnych operacji podczas tego procesu.",
			RESTORE_CONFIRM_CONTENT: 	"Czy na pewno chcesz załadować ustawienia routera z pliku?",
			
			FILE: 						"Plik",

			FACTORY: 					"Przywróć ustawienia fabryczne",
			FACTORYTIP: 				"Przywróć ustawienia routera do wartości fabrycznych.",
			FACTORY_CONFIRM_CONTENT:	"Czy na pewno chcesz przywrócić router do ustawień fabrycznych?",
			FACTORY_WARN:				"Przywracanie ustawień… <br/>Proszę nie wykonywać żadnych operacji podczas tego procesu.",
			
			BACKUPBTN: 					"Zapisz ustawienia",
			RESTOREBTN: 				"Przywróć ustawienia",
			FACTORYBTN: 				"Ustawienia fabryczne"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Zarządzanie kontami",
			
			OLDUSER: 					"Aktualna nazwa użytkownika",
			OLDPWD: 					"Aktualne hasło",

			NEWUSER: 					"Nowa nazwa użytkownika",
			NEWPWD: 					"Nowe hasło",
			CONFIRM: 					"Potwierdź nowe hasło",

			RECOVERYINFO: 				"Odzyskiwanie hasła",
			ENABLE_PASSWORD_RECOVERY: 	"Włącz odzyskiwanie hasła",
			FROM: 						"Od",
			TO: 						"Do",
			SMTP_SERVER: 				"Serwer SMTP",
			
			ENABLE_AUTHENTICATION: 		"Wymagaj uwierzytelniania",
			USERNAME: 					"Nazwa użytkownika",
			PASSWORD: 					"Hasło",

			TEST_MAIL: 					"Testowy e-mail",

			LOCAL:						"Zarządzanie lokalne",
			LOCAL_MAC_AUTH: 			"Uwierzytelnianie lokalnego adresu MAC",
			ACCESS: 					"Dostęp dla wszystkich urządzeń połączonych z siecią LAN",
			ACCESS_TIPS: 				"Wybierz Włącz, aby umożliwić zarządzanie routerem wszystkim urządzeniom w sieci LAN lub Wyłącz, aby umożliwić zarządzanie tylko wybranym urządzeniom.",
			
			MAC_ADDRESS: 				"Adres MAC",
			VIEW_BTN: 					"Wyświetl urządzenia",
			DESCRIPTION: 				"Opis",

			EXIST_DEVICE:               "Lista urządzeń",

			OPTIONAL: 					"(Opcjonalnie)",
			ENABLE_THIS_ENTRY: 			"Włącz",

			DEVICE_NAME:				"Nazwa urządzenia",
			IP_ADDRESS:					"Adres IP",
			

			REMOTE: 					"Zarządzanie zdalne",
			DISABLE_REMOTE_MANAGEMENR: 	"Wyłącz Zarządzanie zdalne",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Włącz Zarządzanie zdalne dla wszystkich urządzeń",
			ENABLE_REMOTE_MANAGEMENR: 	"Włącz Zarządzanie zdalne dla wybranych urządzeń",
			WEB: 						"Port zarządzania Web",

			NOTICE:						"Konflikt z portem serwera wirtualnego! Czy na pewno chcesz kontynuować?",
			NOTICE_ENTER_ANOTHER:		"Konfilkt z portem serwera wirtualnego. Wprowadź inną wartość portu.",

			REMOTEIP: 					"Adres IP zdalnego zarządzania",
			REMOTEIPNOTE: 				"(Wprowadź 255.255.255.255 dla wszystkich)"
			
		},

		SYSLOG:{
			TITLE: 						"Dziennik systemowy",
			LOG_FILTER: 				"Filtr dzienników:",
			
			TYPE_EQ: 					"Typ=",
			
			ALL: 						"WSZYSTKIE",

			FIREWALL: 					"Firewall", 
			NAT: 						"NAT",
			DDNS: 						"Dynamiczny DNS",
			UPNP:						"UPnP",
			IMB:            			"Wiązanie adresów IP&MAC",
			IPTV:						"IPTV",
			DHCPS:						"Serwer DHCP",
			IGMP_PROXY:					"IGMP Proxy",
			DOMAIN_LOGIN:				"Login domeny",
			BASIC_SECURITY: 			"Podstawowe zabezpieczenia",
			PARENTAL_CONTROL: 			"Kontrola rodzicielska",
			ACCESS_CONTROL: 			"Kontrola dostępu",
			DOS_PROTECTION: 			"Ochrona DoS",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Statystyki ruchu",
			TIME_SETTINGS: 				"Ustawienia czasu",
			ACCOUNT_MANAGEMENT: 		"Zarządzanie kontami",
			LOCAL_MANAGEMENT: 			"Zarządzanie lokalne",
			REMOTE_MANAGEMENT: 			"Zarządzanie zdalne",
			LOCALE: 					"Lokalizacja",
			FACTORY_RESET: 				"Przywracanie ustawień fabrycznych",
			LED_CONTROLLER: 			"Kontroler diod",
			NETWORK: 					"Sieć",
			USBSHARE: 					"Udostępnianie USB",
			AND: 						"i",
			LEVEL: 						"Poziom",
			EMERGENCY:					"AWARYJNY",
			ALERT:						"ALARM",
			CRITICAL:					"KRYTYCZNY",
			ERROR: 						"BŁĄD",
			WARNING: 					"OSTRZEGAWCZE",
			NOTICE: 					"UPOMNIENIE",
			INFO: 						"INFORMACYJNE",
			DEBUG: 						"DEBUGOWANIE",

			INDEX: 						"Indeks",
			TYPE: 						"Typ",
			TIME: 						"Czas",
			LEVEL_COL:					"Poziom",

			CONTENT: 					"Treść",
			
			MAIL_LOG: 					"Wyślij dziennik",
			SAVE_LOG: 					"Zapisz dziennik",

			SEND_OK: 					"Wysłano",
			SEND_FAILED: 				"Błąd wysyłania",

			MAIL_SETTING: 				"Ustawienia poczty",

 			FROM: 						"Od",
 			TO: 						"Do",
 			SMTP_SERVER: 				"Serwer SMTP",
 			ENABLE_AUTHENTICATION: 		"Wymagaj uwierzytelniania",

 			USERNAME: 					"Nazwa użytkownika",
 			PASSWORD: 					"Hasło",
 			CONFIRM_PASSWORD: 			"Potwierdź hasło",

 			AUTO_MAIL: 					"Włącz automatyczne wysyłanie maili",
 			LOG_AT: 					"Wysyłaj o",
 			HH_MM: 						"(GG:MM) codziennie",

 			LOG_EVERY: 					"Wysyłaj co",
 			HOURS: 						"godzin"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Ustawienia",
			STATUS: 					"Włącz QoS",
			UPBANDWIDTH: 				"Prędkość wysyłania",
			DOWNBANDWIDTH: 				"Prędkość pobierania",
			SPEED_M: 					"Mb/s",
			SPEED_K: 					"Kb/s",
			TEST: 						"Test prędkości",
			RULE_LIST: 					"Lista reguł QoS",
			RULE: 						"Reguła QoS",
			ID: 						"ID",
			NAME: 						"Nazwa",
			TYPE: 						"Typ",
			DETAIL: 					"Szczegółowy",
			PRIORITY: 					"Priorytet",

			APPLICATION: 				"Usługa",
			APPLICATION_LIST: 			"Lista usług",
			CUSTOM_APP: 				"Inne usługi",
			MAC_ADDR: 					"Adres MAC",
			MAC_ADDR_P: 				"MAC:",
			IP_ADDR: 					"Adres IP",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Port fizyczny",

			LOW: 						"Słabe",
			MIDDLE: 					"Średnie",
			HIGH: 						"Mocne",

			PROTO: 						"Protokół",
			PORT: 						"Port",
			PROTO_P: 					"Protokół:",
			PORT_P: 					"Port:",
			PORT_TIPS: 					"(XX lub XX-XX, 1-65535, maksymalnie 5 par)",

			ALL: 						"WSZYSTKIE",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Inny",

			WIFI_HOME: 					"HOST-WIFI",
			WIFI_GUEST: 				"GOŚĆ-WIFI",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Aktualizacja bazy danych",

			NEWFILE: 					"Nowa baza danych",
			FIRMWAREVERSION: 			"Wersja bazy danych",
			CONFIRM_CONTENT:			"Czy na pewno chcesz zaktualizować bazę danych?",
			WARNING:					"Aktualizacja bazy danych… <br/>Proszę nie wykonywać żadnych operacji podczas tego procesu.",
			
			UPGRADE: 					"Aktualizuj",

			SERVICE_RESTART: 			"Restartowanie usługi QoS",
			
			TYPE: 						"Typ",
			BY_DEVICE: 					"Wg urządzeń",
			BY_APP: 					"Wg usługi",
			BY_PHY: 					"Wg portów",

			HIGH_PRIORITY_LBL: 			"Wysoki priorytet:",
			MIDDLE_PRIORITY_LBL: 		"Średni priorytet:",
			LOW_PRIORITY_LBL: 			"Niski priorytet:",

			HIGH_PRIORITY: 				"Wysoki priorytet",
			MIDDLE_PRIORITY: 			"Średni priorytet",
			LOW_PRIORITY: 				"Niski priorytet"

		},

		APPLICATION:{
			APP_LIST: 					"Lista usług",
			GAME_LIST: 					"Lista gier",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Statystyki ruchu",
			ENABLE_STATISTICS: 			"Statystyki ruchu",

			TITLE: 						"Lista statystyk",
			IP_MAC: 					"Adres IP/MAC",
			TPKT: 						"Suma pakietów",
			TBYTE: 						"Suma bajtów",
			CPKT: 						"Aktualne pakiety",
			CBYTE: 						"Aktualne bajty",
			CICMP: 						"Aktualne Tx ICMP",
			CUDP: 						"Aktualne Tx UDP",
			CSYN: 						"Aktualne Tx SYN",
			
			DELETE_CONFIRM: 			"Czy na pewno chcesz usunąć statystyki?",
			DELETE_ALL_CONFIRM: 		"Czy na pewno chcesz usunąć wszystkie statystyki?",

			RESET_ALL: 					"Zresetuj wszystkie"
		},

		SYSPARA:{
			W24G: 						"Sieć bezprzewodowa 2,4GHz",
			W5G: 						"Sieć bezprzewodowa 5GHz",
			W60G: 						"Sieć bezprzewodowa 60GHz",
			W24G_WDS: 					"2,4GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"Połączenie WDS 60GHz",
			SWITCH_NOTICE:  			"Sieć bezprzewodowa jest wyłączona. Jeżeli chcesz używać tej funkcji. Naciśnij przycisk Wi-Fi.",

			ENABLE_TIPS: 				"Sieć bezprzewodowa jest wyłączona.",

			BEACON: 					"Interwał pakietów Beacon",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"Próg RTS",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Próg fragmentacji",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"Interwał DTIM",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Częstotliwość aktualizacji klucza grupowego",
			GROUPUNIT: 					"sekund",
			
			MU_MIMO_FEATURE: 			"Multiuser-MIMO",
			MU_MIMO: 					"Włącz MU-MIMO",
			
			WMM_FEATURE: 				"WMM",
			WMM: 						"Włącz WMM",

			GI_FEATURE: 				"Krótki GI",
			GI: 						"Włącz krótki GI",

			AP_FEATURE: 				"Izolacja AP",
			AP: 						"Włącz izolację AP",

			WDS_FEATURE: 				"Połączenie WDS",
			WDS: 						"Włącz połączenie WDS",
			
			SSID_BRIDEGE: 				"SSID (sieci docelowej)",
			SURVEY: 					"Wykryj",

			SN: 						"SN",
			MAC_ADDRESS: 				"Adres MAC",
			SSID: 						"SSID",
			SIGNAL: 					"Sygnał",
			CHANNEL: 					"Kanał",
			SECURITY: 					"Zabezpieczenia",
			CHOSEN: 					"Wybrane",
			AP_NUMBER:					"Liczba sieci",

			TOTAL: 						"Suma pozycji",

			MAC: 						"Adres MAC (sieci docelowej)",
			MACUNIT: 					"Przykład: 00-1D-0F-11-22-33",

			SECURITY: 					"Zabezpieczenia",
			NO: 						"Nie",
			NONE: 						"Brak zabezpieczeń",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Hasło",
			
			AUTH_TYPE: 					"Typ uwierzytelniania",
			AUTO: 						"Auto",
			OPEN: 						"Otwarty",
			SHARED: 					"Klucz wspólny",

			WEP_INDEX: 					"Indeks WEP",
			KEY1: 						"Klucz1",
			KEY2: 						"Klucz2",
			KEY3: 						"Klucz3",
			KEY4: 						"Klucz4",

			WEP_KEY_FORMAT: 			"Format klucza WEP",
			ASC: 						"ASCII",
			HEX: 						"Szesnastkowy",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Włącz WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Włącz NAT",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Włącz NAT Boost",
			
			MEDIA_SERVER: 				"Serwer multimediów",
			SCAN_INTERVAL: 				"Interwał skanowania (Godziny)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"Ustawienia poziomu zabezpieczeń przed atakami DoS",

			ICMP: 						"Poziom pakietów ICMP-FLOOD",
			UDP: 						"Poziom pakietów UDP-FLOOD",
			TCP: 						"Poziom pakietów TCP-FLOOD",

			WDS_MODE: 					"Tryb WDS",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Słabe",
			MIDDLE: 					"Średnie",
			HIGH: 						"Mocne",

			TO: 						"do",
			NOTICE_NAT_REBOOT: 			"Restartowanie… <br/>Proszę nie wykonywać żadnych operacji podczas restartowania.",

			NOTICE_NAT_BOOST: 			"Zmiana ustawień NAT Boost spowoduje restart routera, czy na pewno chcesz kontynuować?",
			NOTICE:						"Kanał, z którego korzysta router jest inny niż kanał, z którego korzysta punkt dostępowy. Czy chcesz go zmienić?",

			UNIT: 						"(5-7200)Pakietów na sekundę",
			LED: 						"Diody",
			NIGHT_MODE: 				"Tryb nocny",
			PERIOD_NIGHT_TIME: 			"Harmonogram trybu nocnego",
			ENABLE: 					"Włącz tryb nocny",
			HH_MM: 						"(GG:MM)",
			TO: 						"do",
			NIGHT_MODE_NOTE:            "Funkcja kontroli diod jest wyłączona. Jeżeli chcesz z niej korzystać, naciśnij przycisk diod lub kliknij na Diody w prawym, górnym rogu strony.",
			NOTE2:                      "Czas działania trybu nocnego ustalany jest w oparciu o czas systemowy routera. Upewnij się, że ustawiłeś czas routera."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Brak certyfikatu, naciśnij <b>Generuj</b> przed włączeniem serweru VPN.",
			NO_CERT_NOTE2: 				"Brak certyfikatu, naciśnij <b>Generuj</b> przed eksportowaniem pliku konfiguracyjnego.",
			ENABLE_VPN_SERVER: 			"Włącz serwer VPN",
			SERVICE_TYPE: 				"Typ usługi",
			SERVICE_PORT: 				"Port usługi",
			VPN_SUBNET: 				"Maska sieci/podsieci VPN",
			CLIENTS_ACCESS: 			"Dostęp klienta",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Tylko sieć domowa",
			INTERNET_HOME: 				"Sieć internetowa i domowa",
			CERT_STR: 					"Brak certyfikatu, naciśnij OK, aby go wygenerować i zapisać zmiany.",
			CERT_STR2: 					"Brak certyfikatu, naciśnij OK, aby go wygenerować i wyeksportować plik konfiguracyjny.",
			CONF_FILE: 					"Plik konfiguracji", 
			EXPORT_CONF_FILE: 			"Eksportuj zmiany konfiguracyjne.",
			EXPORT: 					"Eksportuj",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Adres IP klienta",
			ACCOUNT_USERNAME: 			"Nazwa użytkownika",
			ACCOUNT_PASSWORD: 			"Hasło",
			CLIENT_IP_NOTE: 			"(do 10 klientów)",
			SAME_SUBNET_NOTE: 			"Adres IP klienta i adres IP LAN nie mogą być w tej samej podsieci. <br/>Wprowadź inne adresy.",
			CONFLICT_WITH_DHCP: 		"Konflikt adresu IP klienta z pulą adresów IP serwera DHCP. <br/>Wprowadź inne adresy.",
			CONFLICT_WITH_RESERVED: 	"Konflikt adresu IP klienta z zarezerwowanym adresem IP. <br/>Wprowadź inne adresy.",
			CONFLICT_WITH_OPENVPN: 		"Adres IP klienta i adres IP OpenVPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne adresy.",
			SAME_SUBNET_NOTE2: 			"Maska sieci/podsieci VPN i adres IP LAN nie mogą być w tej samej podsieci. <br/>Wprowadź inne wartości.",
			CONFLICT_WITH_DHCP2: 		"Konflikt maski sieci/podsieci VPN z pulą adresów IP serwera DHCP. <br/>Wprowadź inne wartości.",
			CONFLICT_WITH_RESERVED2: 	"Konflikt maski sieci/podsieci VPN z zarezerowanym adresem IP. <br/>Wprowadź inne wartości.",
			CONFLICT_WITH_PPTPVPN: 		"Maska sieci/podsieci VPN i adres IP PPTP VPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne wartości.",
			LAN_CONFLICT_WITH_OPENVPN: 	"Adres IP LAN i adres IP OPENVPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne wartości.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"Adres IP LAN i adres IP PPTP VPN nie mogą być w tej samej podsieci. <br/>Wprowadź inne wartości.",
			VPN_MASK_ERROR: 			"Maska podsieci nie może mieć wartości wyższej niż 255.255.255.248. <br/>Wprowadź wartość ponownie.",
			ACCOUNT_LIST: 				"Lista kont (maksymalnie 16 użytkowników)",
			ADVANCED_SETTING: 			"Zaawansowane",
			ALLOW_SAMBA: 				"Zezwól na dostęp do Samby (lokalizacja sieciowa)",
			ALLOW_NETBIOS: 				"Zezwól na NetBIOS passthrough",
			ALLOW_UNENCRYPTED_CONN: 	"Zezwól na połączenia nieszyfrowane",
			USERNAME_CONFLICT: 			"Ta nazwa użytkownika już istnieje. Wprowadź inną.",
				
			NOTICE_VS_CONFLICT:			"Konflikt z portem zewnętrznym serwera wirtualnego. Wprowadź inną wartość.",
			NOTICE_PT_CONFLICT:			"Konflikt z portem zewnętrznym portu triggering. Wprowadź inną wartość.",
			NOTICE_VS_MODIFY:			"Konflikt z portem zewnętrznym serwera wirtualnego (1723). Przejdź do strony <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Serwerów Wirtualnych</a> i zmień port zewnętrzny serwera wirtualnego.  ",
			NOTICE_PT_MODIFY:			"Konflikt z portem zewnętrznym portu triggering (1723). Przejdź do strony <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Serwerów Wirtualnych</a> i zmień port zewnętrzny portu triggering.  ",
			
			GENERATE_CERT: 				"Certyfikat",
			GENERATE_NEW_CERT: 			"Wygeneruj certyfikat",
			GENERATE: 					"Generuj",
			GENERATE_TIPS: 				"Generowanie certyfikatu…<br/>Potrwa to kilka minut, proszę czekać.",
			CERT_SUCCESS: 				"Gotowe",
			CERT_FAIL: 					"Błąd, spróbuj ponownie.",
			
			VPN_CONNECTIONS: 			"Połączenia VPN",
			OPEN_VPN_CONNECTIONS: 		"Połączenie OpenVPN",
			PPTP_VPN_CONNECTIONS: 		"Połączenie PPTP VPN",
			USER: 						"Użytkownik",
			REMOTE_IP: 					"Zdalne IP",
			ASSIGNED_IP: 				"Przydzielone IP"
		}
	};
})(jQuery);
