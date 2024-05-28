(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			FORGET_PASSWORD: 			"Password dimenticata?",
			LOGIN: 						"Login",
			IMPORTANT_UPDATE_INFO: 		"Per evitare il conflitto con il dispositivo front-end, l'indirizzo IP del router è stato aggiornato in",
			CONTINUE: 					"Continua",

			IMPORTANT_NOTICE: 			"Avviso importante",
			OR: 						", siete sicuri di volere continuare la visita",
			END: 						".",
			END2: 						"?",

			FORGET_PASSWORD_INFO_0: 	"Premete il pulsante Reset per 10 secondi per ripristinare le impostazioni di fabbrica del router.",
			FORGET_PASSWORD_INFO_1: 	"Se la funzione Recupero Password è abilitata, verrà inviato all'indirizzo e-mail indicato un codice di verifica per ripristinare Username e password.",
			FORGET_PASSWORD_SEND_FAILED:"Impossibile inviare il codice! Controllate la connessione a Internet.",

			VERIFICATION_CODE: 			"Codice di verifica",

			RECEIVE_CODE: 				"Invia codice",

			CONFIRM: 					"Conferma",

			SEC: 						"s",

			USER_CONFLICT: 				"Conflitto Login!",
			FIRST_TIME: 				"Benvenuto in Archer AD7200 sviluppato da TP-LINK in Cina. Per cominciare, crea una password per gestire il dispositivo.",
			
			USER_CONFLICT_INFO: 		"Utente %USER% con  host %HOST% (%IP%/%MAC%) attualmente connesso al router. Impossibile accedere contemporaneamente con un altro utente. Riprovate più tardi.",
			USER_CONFLICT_INFO_1: 		"L'utente %USER% (%MAC%) è attualmente loggato al router. Non potete fare login contemporaneamente. Riprovate in un secondo momento.",
			USER_CONFLICT_INFO_2: 		"Utente %USER% (%IP%) attualmente connesso al router. Impossibile accedere contemporaneamente con un altro utente. Riprovate più tardi.",
			
			LOGIN_FAILED: 				"Login non riuscito!",
			LOGIN_FAILED_COUNT: 		"Login non riuscito per %num1 volte. Ancora %num2 tentativi rimasti.",
			NO_COOKIE: 					"Per accedere è necessario abilitare i cookie. Abilitate i cookie o disattivate la modalità di navigazione Privata/In incognito.", 

			FORGET_PASSWORD_NOTE: 		"Se la funzione Recupero password non è stata configurata, premete il pulsante Reset per 10 secondi per ripristinare le impostazioni di fabbrica del router."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Esegui upgrade ora",
			REMIND: 						"Ricordamelo più tardi",
			NOTICE:    						"È disponibile un nuovo firmware per il router %PRODUCT%.",
			NEVER: 							"Ignora questa versione"
			
		},

		WAN_ERROR: {
			TITLE: 							"Errore di connessione WAN.",
			STATUS: 						"Stato",
			INFO: 							"Informazioni",
			SETUP: 							"Imposta una connessione internet",
			NEVER: 							"Non ricordarmelo più"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Versione Firmware:",
			HARDWARE_VERSION: 				"Versione hardware:",
			HELP_SUPPORT: 					"Supporto",
			FAQ: 							"FAQ",
			CONFIRM_REBOOT: 				"Siete sicuri di volere riavviare il router?",
			CONFIRM_LOGOUT: 				"Siete sicuri di volervi disconnettere?",
			UPGRADE_ALERT_1: 				"Il firmware corrente non supporta il servizio cloud TP-LINK. Ti consigliamo vivamente di scaricare il firmware più recente da www.tp-link.com e di eseguire l'aggiornamento.",
			UPGRADE_ALERT_2: 				"Il firmware corrente non supporta il servizio cloud TP-LINK. Ti consigliamo vivamente di aggiornare il firmware cliccando l'icona di aggiornamento nell'angolo in alto a destra.",
			REBOOTING: 						"Riavvio in corso... <br/>Non utilizzare durante il processo di riavvio.",

			MODE_SWITCH: 					"Cambio Modalità",
			ACCESS_POINT: 					"Access point",
			ACCESS_POINT_TIPS: 				"Per trasformare la rete cablata in rete wireless.",
			ROUTER: 						"Router",
			ROUTER_TIPS: 					"Per consentire a più dispositivi di connettersi in modalità cablata o wireless.",
			REPEATER: 						"Repeater",
			REPEATER_TIPS: 					"Per estendere la copertura del segnale di rete wireless.",
			MODE_REBOOT_TIP: 				"La modifica della modalità richiede il riavvio del dispositivo. Siete sicuri di volere continuare?",
			MODE_FAIL_TIP: 					"Cambio modalità non riuscito. Riprovate più tardi o riavviate il router."
		},

		NAV: {
			QUICK_SETUP: 				"Quick Setup",
			BASIC: 						"Base",
			ADVANCED: 					"Avanzata"
		},

		CONTROL: {
			MODE: 						"Modalità",
			LOGIN: 						"Login",
			LED:                        "LED",
			LED_ON:                     "LED On",
			LED_OFF:                    "LED Off",			
			LED_DISABLED:               "Lo stato del LED non può essere modificato quando è attiva la modalità notte.",			
			LOGOUT: 					"Logout",
			UPDATE: 					"Aggiorna",
			REBOOT: 					"Riavvio"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algeria",
			AMERICAN_SAMOA: 			"Samoa americane",
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
			BELARUS: 					"Bielorussia",
			BELGIUM: 					"Belgio",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermuda",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnia ed Erzegovina",
			BRAZIL: 					"Brasile",
			BRUNEI_DARUSSALAM: 			"Brunei Darussalam",
			BULGARIA: 					"Bulgaria",
			CAMBODIA: 					"Cambogia",
			CANADA: 					"Canada",
			CAYMAN_ISLANDS: 			"Isole Cayman",
			CHILE: 						"Cile",
			CHINA: 						"Repubblica Popolare della Cina",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Croazia",
			CYPRUS: 					"Cipro",
			CZECH_REPUBLIC: 			"Repubblica Ceca",
			DENMARK: 					"Danimarca",
			DOMINICAN_REPUBLIC: 		"Repubblica Dominicana",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egitto",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estonia",
			ETHIOPIA: 					"Etiopia",
			FAEROE_ISLANDS: 			"Isole Faroe",
			FINLAND: 					"Finlandia",
			FRANCE: 					"Francia",
			FRENCH_GUIANA: 				"Guiana Francese",
			FRENCH_POLYNESIA: 			"Polinesia Francese",
			GEORGIA: 					"Georgia",
			GERMANY: 					"Germania",
			GREECE: 					"Grecia",
			GREENLAND: 					"Groenlandia",
			GRENADA: 					"Grenada",
			GUADELOUPE: 				"Guadalupa",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haiti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong",
			HUNGARY: 					"Ungheria",
			ICELAND: 					"Islanda",
			INDIA: 						"India",
			INDONESIA: 					"Indonesia",
			IRAN: 						"Iran",
			IRAQ: 						"Iraq",
			IRELAND: 					"Irlanda",
			ISRAEL: 					"Israele",
			ITALY: 						"Italia",
			JAMAICA: 					"Giamaica",

			JAPAN: 						"Giappone",
			JAPAN_1: 					"Giappone 1",
			JAPAN_2: 					"Giappone 2",
			JAPAN_3: 					"Giappone 3",
			JAPAN_4: 					"Giappone 4",
			JAPAN_5: 					"Giappone 5",
			JAPAN_6: 					"Giappone 6",

			JORDAN: 					"Giordania",
			KAZAKHSTAN: 				"Kazakhstan",
			KENYA: 						"Kenya",

			NORTH_KOREA: 				"Corea del Nord",
			KOREA_REPUBLIC: 			"Corea",
			KOREA_REPUBLIC_3: 			"Corea 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Lettonia",
			LEBANON: 					"Libano",
			LIBYA: 						"Libia",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Lituania",
			LUXEMBOURG: 				"Lussemburgo",
			MACAU: 						"Macao",
			MACEDONIA: 					"Repubblica Yugoslava di Macedonia",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malesia",
			MALDIVES: 					"Maldive",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinica",
			MAURITIUS: 					"Mauritius",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Messico",
			MONACO: 					"Principato di Monaco",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Marocco",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Paesi Bassi",
			NETHERLANDS_ANTILLES: 		"Antille Olandesi",
			
			NEW_ZEALAND: 				"Nuova Zelanda",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norvegia",
			NORTHERN_MARIANA_ISLANDS: 	"Marianne Settentrionali",
			OMAN: 						"Oman",
			PAKISTAN: 					"Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papua Nuova Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Perù",
			PHILIPPINES: 				"Filippine",
			POLAND: 					"Polonia",
			PORTUGAL: 					"Portogallo",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Reunion",
			ROMANIA: 					"Romania",
			RUSSIA: 					"Russia",
			RWANDA: 					"Ruanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Arabia Saudita",
			SINGAPORE: 					"Singapore",
			SLOVAK_REPUBLIC: 			"Slovacchia",
			SLOVENIA: 					"Slovenia",
			SOUTH_AFRICA: 				"Sud Africa",
			SPAIN: 						"Spagna",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Suriname",
			SWEDEN: 					"Svezia",
			SWITZERLAND: 				"Svizzera",
			SYRIA: 						"Siria",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Tailandia",
			TRINIDAD_TOBAGO: 			"Trinidad e Tobago",
			TUNISIA: 					"Tunisia",
			TURKEY: 					"Turchia",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ucraina",
			UNITED_ARAB_EMIRATES: 		"Emirati Arabi Uniti",
			UNITED_KINGDOM: 			"Regno Unito",
			UNITED_STATES: 				"Stati Uniti",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Uzbekistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Isole Vergini, USA",
			YEMEN: 						"Yemen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT - 11.00 h) Isole Midway, Samoa",
			HAWAII: 					"(GMT - 10.00 h) Hawaii",
			ALASKA: 					"(GMT - 09.00 h) Alaska",
			PACIFIC_TIME: 				"(GMT - 08.00 h) Costa Pacifica",
			MOUNTAIN_TIME: 				"(GMT - 07.00 h) Fuso occidentale (USA e  Canada)",
			CENTRAL_TIME: 				"(GMT - 06.00 h) Fuso centrale (USA e  Canada)",
			EASTERN_TIME: 				"(GMT - 05.00 h) Fuso orientale (USA e  Canada)",
			CARACAS:					"(GMT - 04.30 h) Caracas",
			ATLANTIC_TIME: 				"(GMT - 04.00 h) Costa atlantica  (Canada)",
			NEWFOUNDLAND: 				"(GMT - 03.30 h) Terranova",

			BRASILIA_BUENOS_AIRES: 		"(GMT - 03.00 h) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT - 02.00 h) Medioatlantico",
			AZORES_CAPE_VERDE_IS: 		"(GMT - 01.00) Azzorre, Is. di Capo Verde",
			GREENWICH_MEAN_TIME: 		"(GMT) Ora di Greenwich; Dublino, Londra",
			BERLIN_STOCKHOLM: 			"(GMT + 01.00 h) Berlino, Stoccolma, Roma, Berna, Bruxelles",
			ATHENS_HELSINKI: 			"(GMT + 02.00 h) Atene, Helsinki, Europa Orientale, Israele",
			BAGHDAD_KUWAIT: 			"(GMT + 03.00 h) Baghdad, Kuwait, Nairobi, Riyadh, Mosca",

			TEHERAN: 					"(GMT + 03.30 h) Teheran",

			ABU_DHABI: 					"(GMT + 04.00 h) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT + 04.30 h) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT + 05.00 h) Islamabad, Karachi, Ekaterinburg",

			MADRAS_CALCUTTA: 			"(GMT + 05.30 h) Madras, Calcutta, Mumbay, Nuova Delhi",
			KATMANDU: 					"(GMT + 05.45 h) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT + 06.00 h) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT + 06.30 h) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT + 07.00) Bangkok, Giacarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT + 08.00 h) Pechino, Hong Kong, Perth, Singapore",
			TOKYO_OSAKA_SAPPORO: 		"(GMT + 09.00 h) Tokyo, Osaka, Sapporo, Seoul, Yakutsk",

			ADELAIDE: 					"(GMT + 09.30) Adelaide",

			BRISBANE_CANBERRA: 			"(GMT + 10.00 h) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT + 11.00 h) Magadan, Isole Salomone, Nuova Caledonia",
			FIJI_KAMCHATKA: 			"(GMT + 12.00 h) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT + 13.00 h) Nuku'alofa"
		},

		APPLIST:{
			APP:						"Applicazione",
			GAME:						"GIOCO",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"Linea",
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
			DAY: 						"Giorno",

			MONDAY: 					"Lunedì",
			TUESDAY: 					"Martedì",
			WEDNESDAY: 					"Mercoledì",
			THURSDAY: 					"Giovedì",
			FRIDAY: 					"Venerdì",
			SATURDAY: 					"Sabato",
			SUNDAY: 					"Domenica",
			
			MON: 						"Lun.",
			TUES: 						"Mar.",
			WED: 						"Mer.",
			THUR: 						"Gio.",
			FRI: 						"Ven.",
			SAT: 						"Sab.",
			SUN: 						"Dom.",

			JAN: 						"Gen.",
			FEB: 						"Feb.",
			MAR: 						"Mar.",
			APR: 						"Apr.",
			MAY: 						"Mag.",
			JUN: 						"Giu.",
			JUL: 						"Lug.",
			AUG: 						"Ago.",
			SEP: 						"Set.",
			OCT: 						"Ott.",
			NOV: 						"Nov.",
			DEC: 						"Dic."

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
			"1ST": 						"Primo",
			"2ND": 						"2°",
			"3RD": 						"3°",
			"4TH": 						"4°",
			"5TH": 						"5°",
			"1ST_": 					"1°",

			TH: 						"o"
		},

		GRID: {
			CLIENT_NUMBER: 				"Numero cliente",

			ID: 						"ID",
			MODIFY: 					"Modifica",
			STATUS: 					"Stato",
			ENABLE: 					"Abilita",

			OPERATION: 					"Operazione",
			CHOOSE: 					"Scegli",
			DESCRIPTION: 				"Descrizione",
			

			AUTO_REFRESH: 				"Aggiornamento automatico",
			REFRESH: 					"Aggiorna",
			NUMBER: 					"Numero",
			ENABLED: 					"Abilitato",
			DISABLED: 					"Disabilitato",
			ACTIVE: 					"Attivo",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Aggiungi",
			CHOOSE: 					"Scegli",
			EDIT: 						"Modifica",
			DELETE: 					"Elimina",
			DELETE_ALL: 				"Elimina tutto",
			REMOVE: 					"Rimuovi",
			RESET: 						"Reset",
			RESET_ALL: 					"Reset Totale",
			DETECT: 					"Rileva",
			ENABLE: 					"Abilita",
			DISABLE: 					"Disabilita",
			PAUSE:						"Pausa",
			RESUME:						"Ricomincia",
			
			REFRESH: 					"Aggiorna",
			SEARCH: 					"Ricerca...",
			BROWSE: 					"Browse",

			SAVE: 						"Salva",
			BACK: 						"Indietro",

			PREV: 						"Prec",
			NEXT: 						"Avanti",
			FINISH: 					"Fine",
			
			ON: 						"Attivo",
			OFF: 						"Disattivo",
			LOW: 						"Bassa",
			MIDDLE: 					"Media",
			HIGH: 						"Alta",
			
			OK: 						"OK",
			CANCEL: 					"Cancella",

			YES: 						"Sì",
			NO: 						"No",
			
			CONNECTED: 					"Connesso",
			CONNECTING: 				"Connessione in corso",
			DISCONNECTING: 				"Disconnessione in corso",
			DISCONNECTED: 				"Non connesso",

			PASSWORD_HINT: 				"Password",
			FILEBUTTONTEXT: 			"Browse",
			FILEBLANKTEXT: 				"Selezionate un file.",
			NOSELECTEDTEXT: 			"Selezionate le opzioni.",

			ADD_A_NEW_KEYWORD: 			"Aggiungi Nuova Parola Chiave",

			SUCCESSED: 					"Operazione riuscita!",
			FORM_SAVED: 				"Salvato",
			FORM_FAILED: 				"Salvataggio non riuscito",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Salvata",
			GRID_FAILED: 				"Operazione non riuscita",
			GRID_NONE_SELECT: 			"Selezionate almeno una voce.",
			GRID_DELETE_COMFIRM: 		"Siete sicuri di volere eliminare queste voci?",
			GRID_DELETE_ALL_COMFIRM: 	"Siete sicuri di volere eliminare tutte le voci?",
			GRID_MAX_RULES: 			"Numero massimo di voci superato.",
			KEYWORD_MAX_OVERFLOW: 		"Il numero di parole chiave ha superato il limite.",

			NOTE: 						"Nota:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Formato non valido.",
			BLANKTEXT: 					"Campo obbligatorio.",

			EMAIL: 						"Indirizzo email non valido.",
			NUMBER: 					"Formato non valido.",

			NUMBER_MIN: 				"Valore non valido, immettete un numero maggiore di %min.",
			NUMBER_MAX: 				"Valore non valido, immettete un numero minore di%max.",

			NUMBER_MIN_MAX: 			"Valore non valido, immettete un numero compreso tra %min e %max.",
			HEX: 						"Il campo deve essere un numero esadecimale.",

			IP: 						"Formato non valido.",

			IP_NO_ALL_ZERO:				"L'indirizzo non può essere 0.0.0.0.",
			IP_NO_LOOP:					"L'indirizzo non può essere un indirizzo di loopback.",
			IP_NO_D_TYPE:				"L'indirizzo non può essere un IP di classe D.",
			IP_NO_E_TYPE:				"L'indirizzo non può essere un IP di classe E.",
			IP_NO_ALL_ONE:				"L'indirizzo non può essere 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"L'indirizzo non può iniziare con 255.",
			IP_NO_FIRST_ZERO:			"L'indirizzo non può iniziare con 0.",
			MASK_NO_ALL_ONE:			"La maschera non può essere 255.255.255.255.",

			IPV6: 						"Formato non valido.",
			IPV6_NOT_GLOBAL:			"Formato non valido.",
			IPV6_NOT_PREFIX:			"Formato non valido.",
			IP_DOMAIN: 					"Formato non valido.",
			IPV6_DOMAIN: 				"Formato non valido.",
			PPTP_INVALID_IP:			"Indirizzo IP non valido.",
			MAC: 						"Formato non valido.",
			MULTI_MAC:					"Formato non valido.",
			MAC_INVALID_BROADCAST:		"MAC non deve essere un indirizzo broadcast.",
			MAC_INVALID_MULTICAST:		"MAC non deve essere un indirizzo multicast.",
			DATE: 						"Formato non valido.",
			DATE_INVALID: 				"Immettete una data compresa tra 01/01/1970 e 31/12/2030.",
			MASK: 						"Formato non valido.",
			DOMAIN: 					"Formato non valido.",
			STRING_DOMAIN:              "Formato non valido.",
			USER: 						"Formato non valido.",
			NOTE: 						"Formato non valido.",
			PWD: 						"Formato non valido.",
			SSID: 						"Formato non valido.",
			NAME:						"Formato non valido.",
			ASCII_VISIBLE:				"Formato non valido.",
			STRING_VISIBLE:				"Formato non valido.",
			STRING_VISIBLE_NO_COMMA:    "Formato non valido.",
			STRING_VISIBLE_ALLOW_BLANK: "Formato non valido.",
			VPN_NAME_PWD: 				"Inserisci da 1 a 15 caratteri alfanumerici, numeri, - e _."
		},


		ERROR: {			
			"00000001":					"Tipo di file non valido.",
			"00000002":					"Errore di checksum.",
			"00000003":					"Il file è troppo grande.",
			"00000004":					"Errore di Upload.",
			"00000005":					"Errore di riavvio.",
			"00000006":					"Errore sconosciuto.",
			"00000007":					"Elemento già esistente. Immettete un altro elemento.",

			"00000009":					"Porta non valida.",
			"00000010":					"La porta deve essere un numero.",

			"00000011":					"La Username deve essere lo stesso utilizzato per il valore Da.",
			"00000012": 				"La Username deve iniziare con una lettera dell'alfabeto.",

			"00000021":					"Formato non valido.",

			"00000032": 				"Il valore deve essere inferiore a Bassa.",
			"00000033": 				"Il valore deve essere inferiore a Media e Bassa.",
			"00000034": 				"Valore non valido, immettete un numero compreso tra 5 e 7200.",

			"00000039": 				"Utilizzate il valore predefinito 0 oppure immettete un valore compreso tra 30 e 86400.",
			"00000040": 				"Sono necessari SSID e MAC.",

			"00000042": 				"Utilizzate il valore predefinito 80 oppure immettete un valore compreso tra 1024 e 65535.",

			"00000045": 				"Gateway predefinito e indirizzo IP LAN devono essere nella stessa subnet. Reimmetteteli.",

			"00000046": 				"Indirizzo IP e Indirizzo MAC non possono essere VUOTI. Reimmetteteli.",
			"00000047": 				"Gli indirizzi IP e IP LAN devono essere nella stessa subnet. Reimmetteteli.",

			
			"00000049":					"Destinazione di rete non valida.",

			"00000050": 				"Indirizzo IP del server DNS non valido. Immettete un altro indirizzo IP.",
			"00000051": 				"Indirizzo MAC già esistente. Immettete un altro indirizzo.",
			"00000052": 				"Indirizzo IP già esistente. Immettete un altro indirizzo.",

			"00000053": 				"L'indirizzo iniziale non può essere maggiore dell'indirizzo finale. <br/>Reimmettetelo.",

			"00000054": 				"Il pool di indirizzi IP e l'indirizzo IP LAN devono essere nella stessa subnet. Reimmetteteli.",

			"00000055": 				"L'IP non può essere uguale all'indirizzo LAN.",

			"00000056": 				"L'indirizzo IP remoto e l'indirizzo IP LAN corrente non devono essere nella stessa subnet. Immettete un altro indirizzo.",

			"00000057": 				"Password PSK non valida. Reimmettetela.",
			"00000058": 				"Password WEP non valida. Reimmettetela. ",

			"00000059": 				"Indirizzo IP e Subnet Mask non validi, immettetene di validi.",

			"00000060": 				"L'indirizzo IP WAN e l'indirizzo IP LAN non devono essere nella stessa subnet. <br/>Immettete un altro indirizzo.",

			"00000061": 				"L'ora di inizio deve essere precedente all'ora di fine.",

			"00000062": 				"Campo obbligatorio.",
			"00000063": 				"Campo obbligatorio.",

			"00000064": 				"Impossibile bloccare l'indirizzo MAC dell'host.",
			"00000065": 				"L'elemento è in conflitto con gli elementi esistenti. Controllate.",
			
			"00000066": 				"La password deve essere composta da 8-63 caratteri o 64 cifre esadecimali.",
			"00000067": 				"La password deve essere composta da 10 cifre esadecimali.",
			"00000068": 				"La password deve essere composta da 5 caratteri ASCII.",
			"00000069": 				"La password deve essere composta da 26 cifre esadecimali.",
			"00000070": 				"La password deve essere composta da 13 caratteri ASCII.",
			"00000071": 				"La password deve essere composta da 32 cifre esadecimali.",
			"00000072": 				"La password deve essere composta da 16 caratteri ASCII.",
			"00000073": 				"La password deve essere inferiore a 64 caratteri.",

			"00000074": 				"Tipo di file non valido.",

			"00000075": 				"Il PIN deve essere formato da 8 cifre.",

			"00000076": 				"La voce entra in conflitto con le voci esistenti. Verificate la porta e il protocollo di attivazione.",
			"00000077": 				"L'indirizzo IP non può essere uguale all'indirizzo IP LAN.",
			"00000078": 				"L'indirizzo IP host non può essere uguale all'indirizzo IP LAN. ",

			"00000080": 				"Le password non corrispondono. Riprovate.",

			"00000083": 				"Il Gateway non può essere uguale all'IP.",
			"00000084": 				"Il DNS Primario non può essere uguale all'IP.",
			"00000085": 				"Il DNS Secondario non può essere uguale all'IP.",
			"00000086": 				"Il DNS Primario non può essere uguale al DNS Secondario.",

			"00000088": 				"Operazione non consentita per la gestione remota.",
			"00000089": 				"Sono stati superati %num tentativi. Riprovate tra due ore.",

			"00000090": 				"La destinazione non può essere l'indirizzo IP LAN.",
			"00000091": 				"La destinazione non può essere l'indirizzo IP WAN.",

			"00000092": 				"Indirizzo IP e indirizzo IP WAN non devono essere nella stessa subnet.  <br/>Reimmettetelo.",
			"00000093": 				"Indirizzo IP e indirizzo IP WAN non devono essere nella stessa subnet.  <br/>Reimmettetelo.",

			"00000094": 				"Gli ID VLAN non possono essere uguali.",
			"00000095": 				"è necessaria almeno una porta Internet",

			"00000096": 				"Parola chiave già esistente.",

			"00000097": 				"La configurazione della frequenza 2.4GHz non avrà effetto prima che abbiate attivato il pulsante Wi-Fi.",
			"00000098": 				"La configurazione della frequenza 5GHz non avrà effetto prima che abbiate attivato il pulsante Wi-Fi.",
			"00000099": 				"Le configurazioni delle frequenza 2.4 e 5GHz non avranno effetto prima che abbiate attivato il pulsante Wi-Fi.",

			"00000100": 				"La configurazione di rete 5GHz non è disponibile a causa delle restrizioni in vigore nella vostra regione/nazione.",
			"00002100": 				"La rete a 60 GHz non è disponibile a causa dei limiti della tua regione/del tuo paese.",

			"00000101": 				"La funzione wireless è disattivata. Se desiderate utilizzare questa funzione. Attivate il pulsante Wi-Fi.",
			"00000102": 				"La funzione wireless è disattivata. Se desiderate utilizzare questa funzione. Attivate il pulsante Wi-Fi.",
			"00002102": 				"La funzione wireless è disattivata. Se desiderate utilizzare questa funzione. Attivate il pulsante Wi-Fi.",

			"00000103": 				"La funzione wireless è disattivata. Se desiderate utilizzare questa funzione. Attivate il pulsante Wi-Fi.",
			"00000104": 				"La funzione wireless è disabilitata.",

			"00000105": 				"QoS e IPTV non possono essere attivati contemporaneamente.",

			"00000106": 				"L'indirizzo IP non può essere uguale all'indirizzo IP LAN.",
			
			"00000107": 				"Destinazione già esistente.",

			"00000110": 				"L'indirizzo IP e l'indirizzo IP LAN devono essere nella stessa subnet.",
			
			"00000111": 				"QoS e <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">Incremento NAT</a> non possono essere abilitati contemporaneamente.",
			"00000112": 				"La funzione WDS può funzionare sia in 2.4 che in 5GHz. Inoltre, la rete ospiti non è disponibile sulla banda WDS.",
			"00000113": 				"WDS e rete ospiti non possono essere attivate contemporaneamente.",
			"00000114": 				"Le statistiche di traffico e <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">Incremento NAT</a> non possono essere abilitate contemporaneamente.",

			"00000117": 				"Nome di dominio già esistente.",
			"00000118": 				"Il numero dei nomi di dominio ha superato il limite.",
			"00000119":					"Incremento NAT sarà disabilitato quando <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> o <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Statistiche di traffico</a> sarà abilitata.",

			"00000120": 				"La password deve essere composta da 5 o 13 caratteri ASCII. ",
			"00000121": 				"La password deve essere composta da 10 o 26 cifre esadecimali.",
			"00000122": 				"Username o password sono vuote. Siete sicuri di volere continuare?",
			"00000123": 				"Salvataggio in corso ... Non utilizzare durante l'operazione.",
			"00000124": 				"Il PIN del router è bloccato a causa di numerosi tentativi di connessione effettuati con un PIN errato. Generate un nuovo PIN.",

			"00000125": 				"Il numero di regole QoS ha superato il limite.",
			"00000126": 				"La dimensione del file ha superato il limite.",
			"00000127": 				"Il contenuto del file non è corretto.",
			"00000128": 				"Selezionate almeno un'applicazione. ",
			"00000129": 				"Selezionate almeno una porta fisica.",
			"00000130":					"La funzione WPS è disabilitata.",
			"00000131": 				"Il server NTP non può essere un indirizzo di loopback.",
			"00000132": 				"Scelta modalità non riuscita. Riprovate più tardi o riavviate il router.",
			"00000133": 				"Indirizzo IP host DMZ non valido. Immettete un indirizzo valido.",
			"00000134":  				"IP interno non valido. Immettete un indirizzo valido.",
			"00000135": 				"Errore Firmware.",
			"00000136": 				"Errore file di backup.",
			"00000137": 				"Indirizzo IP non valido, immettetene un altro.",
			"00000139": 				"Parametri recupero password non corretti.",
			"00000140": 				"Codice non corretto.",
			"00000141": 				"Recupero Password disabilitato.",
			"00000142": 				"Invio codice fallito. Verificate la vostra connessione Internet.",
			"00000143": 				"Indirizzi email non validi.",
			"00000144": 				"Messaggio email non valido.",
			"00000145": 				"Potreste non avere trovato l'host.",
			"00000146": 				"Autenticazione fallita.",
			"00000147": 				"La porta deve essere compresa fra 1 e 65535.",
			"00000148": 				"In un intervallo di porte, il numero della porta iniziale deve essere inferiore al numero della porta finale. Inserisci di nuovo",
			"00000149": 				"I numeri di porta si sovrappongono. Inserisci di nuovo",
			
			"00000150": 				"Il percorso non esiste.",
			"00000151": 				"Percorso di allocazione non impostato.",
			"00000152": 				"Problemi con questo percorso.",
			"00000153": 				"Volume non trovato.",
			"00000154": 				"Nessun dispositivo USB",
			
			"00000155": 				"L'indirizzo IP del client PPTP VPN e l'indirizzo IP LAN non possono essere nella stessa subnet. <br/>Inseriscine un altro.",
			"00000156": 				"L'indirizzo IP del client PPTP VPN e l'indirizzo IP del client OpenVPN non possono essere nella stessa subnet. <br/>Inseriscine un altro.",

			"00000222":  				"Inserimenti massimi.",
			"00000231": 				"Voce duplicata.",
			"00000232": 				"URL non valido",
			"00000233":					"Selezionate almeno un giorno.",

			"00000301": 				"Voci cartelle massime condivise.",
			"00000302": 				"Voci cartelle massime condivise in un volume.",
			"00000303": 				"Percorso cartella condivisa duplicato.",
			"00000304": 				"Nome cartella condivisa duplicato.",

			"00001000":					"Aggiornamento in corso, attendere.",
			"00001001": 				"La funzione WDS funziona con entrambe le frequenze 2.4GHz e 5GHz.",
			"00001002":					"Codice non corretto.",

			"00001123": 				"Non è stata immessa nessuna regola applicativa. Immettetene almeno una.",
			"00001124": 				"Non è stata immessa nessuna porta fisica. Sceglietene almeno una.",

            "00002000": 				"Questa voce è in conflitto con il routing statico specificato dall'ISP. Siete sicuri di volere continuare?",

            "00003000":                 "IPv6 Pass-Through è in conflitto con IPTV! Se volete usare questa funzione, disattivate le impostazioni IPTV.",
			"00004139": 				"Nessuna connessione internet",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Timeout della richiesta. Controlla la connessione internet e riprova più tardi.",
			"00004141": 				"Errore sconosciuto.",
			"00004142": 				"Codice di verifica errato.",
			"00004143": 				"Password non valida.",
			"00004144": 				"Il nome utente esiste già.",
			"00004145": 				"Password non valida.",//new password
			"00004146": 				"Impossibile separare questo dispositivo. Riprova più tardi.",
			"00004147": 				"Questo dispositivo è stato associato a un altro account.",
			"00004148": 				"Inserimento non valido.",
			"00004149": 				"Questo nome di dominio esiste già.",
			"00004150": 				"Impossibile scaricare il firmware. Controlla la connessione internet e riprova più tardi.",
			"00004151": 				"Non puoi registrare più di 1000 nomi di dominio sullo stesso account cloud.",
			"00004152": 				"Questo dispositivo è stato associato a un altro nome di dominio.",
			"00004153": 				"Questo dispositivo è stato associato a un altro dispositivo.",
			"00004154": 				"Nessuna risposta dal server. Riprova più tardi.",
			"00004155": 				"L'account non esiste.",
			"00004156": 				"Impossibile avviare l'applicazione cloud. Riavvia questo dispositivo e riprova più tardi.",
			"00004157": 				"Impossibile collegarsi al server cloud. Controlla la connessione internet e riprova più tardi.",
			"00004158": 				"La porta WAN non è collegata.",
			"00004159": 				"Impossibile collegarsi a internet. Contatta il tuo fornitore di servizi o riprova più tardi.",
			"00004160": 				"Impossibile ottenere l'indirizzo IP dal server DHCP. Controlla il tipo di connessione WAN o riprova più tardi.",
			"00004161": 				"Autenticazione PPPoE non riuscita. Controlla nome utente e password.",
			"00004162": 				"Impossibile collegarsi al server PPPoE.",
			"00004164": 				"Autenticazione PPTP non riuscita. Controlla nome utente e password.",
			"00004165": 				"Impossibile collegarsi al server PPTP.",
			"00004167": 				"Autenticazione L2TP non riuscita. Controlla nome utente e password.",
			"00004168": 				"Impossibile collegarsi al server L2TP.",
			"00004169": 				"Errore sconosciuto. Riprova più tardi.",
			"00004170": 				"La porta WAN non è collegata.",
			"00004171": 				"Nessuna connessione internet.",
			"00004172": 				"Connessione non riuscita.",
			"00004173": 				"Username o password errati",
			"00004174": 				"Indirizzo email non valido.",
			"00004175": 				"Formato nome utente non valido.",
			"00004176": 				"L'e-mail esiste già",
			"00004177": 				"Impossibile accedere alle informazioni sull'account. Aggiorna la pagina.",
			"00004178":   				"Errore di sistema. Aggiorna la pagina e riprova.",
			"00004179":   				"Impossibile associare questo dispositivo. Riprova più tardi.",
			"00004180":   				"Questo dispositivo è stato separato da questo account cloud. Ripeti l'accesso con il tuo account per associare il dispositivo al tuo account.",
			"00004181":   				"Questo dispositivo è offiline. Controlla le impostazioni internet.",
			"00004182":   				"Impossibile inviare e-mail. Controlla la connessione internet e riprova.",
			"00004183":   				"Account should contain  to  characters. ",
			"00004184":   				"Ha inserito la password sbagliata per 20 volte. Riprova tra 2 ore.",
			"00004185":   				"Hai ottenuto il codice di verifica per 10 volte in 1 ora. Riprova tra 24 ore.",
			"00004186":   				"Impossibile attivare il tuo account. Rinvia l'e-mail di verifica.",
			"00004187":   				"Il link è scaduto. Rinvia l'e-mail di verifica.",
			"00004188":   				"Il link è scaduto. Rinvia l'e-mail.",
			"00004189":   				"Impossibile ripristinare la tua password. Rinvia l'e-mail.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Errore di upgrade del firmware.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Stato",
			NETWORK: 					"Rete",
			NETWORK_MAP: 				"Mappa di rete",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"Server DHCP",
			DYNAMIC_DNS: 				"DNS dinamico",
			ADVANCED_ROUTING: 			"Routing avanzato",

			WIRELESS: 					"Wireless",
			WIRELESS_SETTINGS: 			"Impostazioni wireless",
			WDSBRIDGING: 				"Bridging WDS",
			WPS: 						"WPS",
			MACFILTERING: 				"Filtro MAC",
			WIRE_STATISTICS: 			"Statistiche",
			
			
			GUEST_NETWORK: 				"Rete Ospiti",
			WIRELESS_SETTINGS: 			"Impostazioni wireless",
			STORAGE_SHARING: 			"Condivisione storage",
			NAT_FORWARDING: 			"NAT Forwarding",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Server Virtuali",
			PORT_TRIGGERING: 			"Port Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"Impostazioni USB",
			BASIC_SET: 					"Impostazioni di base",
			DISK_SET: 					"Impostazioni dispositivo",
			FOLDER_SHARING: 			"Condivisione Accesso",
			STORAGE_SHARING: 			"Condivisione storage",
			FTP_SERVER: 				"Server FTP",
			MEDIA_SERVER: 				"Server Multimediale",
			PRINT_SERVER: 				"Print Server",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Offline Download",
			
			PARENTAL_CONTROL: 			"Parental Control",

			QOS:  						"QoS",
			DATABASE:  					"Database",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Mappa",
			SB_MAP: 					"Mappa",
			SB_BANDWIDTH:  				"Larghezza banda",
			SB_PRIORITY: 				"Priorità",
			SB_STATISTICS: 				"Statistiche",

			
			SECURITY: 					"Sicurezza",
			SETTINGS: 					"Impostazioni",
			ACCESS_CONTROL: 			"Controllo Accesso",
			IP_MAC_BINDING: 			"Binding IP e MAC",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Strumenti di sistema",
			TIME_SETTINGS: 				"Impostazione data/ora",
			DIAGNOSTIC: 				"Diagnostica",
			FIRMWARE_UPGRADE: 			"Aggiornamento Firmware",
			BACKUP_RESTORE: 			"Ripristino e backup",
			ADMINISTRATION: 			"Amministrazione",
			SYSTEM_LOG: 				"Log di sistema",
			STATISTICS: 				"Statistiche di traffico",
			SYSTEM_PARAMETERS: 			"Parametri di sistema",
			VPN: 						"Server VPN",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"Connessioni VPN"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Regione e fuso orario",
			INTERNET_CONNECTION_TYPE: 	"Tipo di connessione Internet",
			WIRELESS_SETTINGS: 			"Impostazioni wireless",
			SUMMARY: 					"Sommario",
			SETUP_COMPLETE: 			"Test Connessione Internet",

			EXIT: 						"Esci",
			NEXT: 						"Avanti",
			SAVE: 						"Salva",
			FINISH: 					"Fine",
			OK: 						"OK",
			NONE: 						"Rilevazione fallita.",

			REGION: 					"Regione",
			TIME_ZONE: 					"Fuso orario",
			NO_SELECT: 					"Selezionate le opzioni.",

			AUTO_DETECT: 				"Rilevamento automatico",
			DYNAMIC_IP: 				"IP dinamico",
			STATIC_IP: 					"IP statico",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Se non siete sicuri di conoscere il Tipo di connessione Internet, utilizzate la funzione Rilevamento automatico o contattate il vostro ISP per assistenza. ",

			DYNAMIC_IP_INFO: 			"Se il vostro ISP consente l'accesso a Internet solo ad uno specifico indirizzo MAC, dovete clonare l'indirizzo MAC del computer primario. Se non ne siete certi, selezionate <strong>NON clonare l'Indirizzo MAC</strong>.",
			MAC_CLONE_NO: 				"NON clonare indirizzo MAC",
			MAC_CLONE_YES: 				"Clona indirizzo MAC computer corrente",
			MAC_CLONE_NOTE: 			"Se selezionate Clona indirizzo MAC, assicuratevi che l'indirizzo MAC del computer sia stato registrato con l'ISP prima di fare clic su Avanti.",

			PPPOE_INFO: 				"immettete Username e password PPPoE.",
			
			STATIC_IP_INFO: 			"immettete le informazioni IP.",

			L2TP_INFO: 					"immettete Username e password L2TP.",
			PPTP_INFO: 					"immettete Username e password PPTP.",
			
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			SERVER_IP_ADDRESS_NAME: 	"VPN Server IP/Nome Dominio",
			IP_ADDRESS: 				"Indirizzo IP",
			SUBNET_MASK: 				"Subnet mask",
			DEFAULT_GATEWAY: 			"Gateway predefinito",
			PRIMARY_DNS: 				"DNS primario",
			SECOND_DNS: 				"DNS secondario",
			OPTIONAL: 					"(facoltativo)",
			
			ON: 						"Attivo",
			OFF: 						"Disattivo",
			WIRELESS_24GHZ: 			"Wireless 2.4GHz",
			WIRELESS_5GHZ: 				"Wireless 5GHz",
			WIRELESS_60GHZ: 				"Wireless 60 GHz",
			ENABLE_WIRELESS_RADIO: 		"Abilita wireless",
			NAME_SSID: 					"Nome di rete wireless (SSID)",

			SUMMARY_INFO1: 				"Ricollegate i dispositivi wireless alla nuova rete wireless prima di fare clic sul pulsante <strong>Avanti</strong>.",
			SUMMARY_INFO2: 				"I tuoi nome wireless e password sono stati modificati:",
			SUMMARY_INFO3: 				"Assicuratevi di essere connessi alla nuova rete wireless.",

			WIRELESS_24GHZ_SSID: 		"Nome rete wireless 2.4GHz (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Password rete wireless 2.4GHz",
			WIRELESS_5GHZ_SSID: 		"Nome rete wireless 5GHz (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Password rete wireless 5GHz",
			WIRELESS_60GHZ_SSID: 		"SSID 60 GHz wireless",
			WIRELESS_60GHZ_PASSWORD: 	"Password 60 GHz wireless",

			SORRY: 						"Operazione non riuscita.",
			SUCCESS: 					"Operazione riuscita!",
			TEST_INTERNET_SUCCESS_INFO: "Fate clic su Fine per terminare il processo di impostazione rapida.",

			TEST_INTERNET_FAILED_INFO_0:"Verificate che tutti i parametri del Quick Setup siano corretti e riprovate. Se tutti i parametri del Quick Setup, riavviate il modem, attendete 2 minuti, quindi rifate clic su Prova connessione Internet. Se non utilizzate un modem, contattate il vostro ISP per assistenza.",
			SUMMARY_INFO4: 				"E' stato rilevato che non avete riconnesso il dispositivo wireless alla nuova rete wireless. Fatelo e fate clic su <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Congratulazioni!",
			COMPLETE_INFO_0: 			"Avete completato il processo di Quick Setup.",
			COMPLETE_INFO_1:			"Fate clic su Prova connessione Internet, quindi fate clic su Fine. ",
			TEST_INTERNET: 				"Prova Connessione Internet",

			
			RESET_USER_TITLE: 			"Impostate nuovi username e password",
			NEW_USERNAME: 				"Nuova usrname",
			NEW_PASSWORD: 				"Nuova password",
			CONFIRM_PASSWORD: 			"Confermate la nuova password",
			CONFIRM: 					"Conferma"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Stato Internet",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60 GHz",
			
			CONNECTION_TYPE: 			"Tipo di connessione",
			SECONDARY_CONN: 			"Connessione secondaria",

			POOR_CONNECTED: 			"Connessione scadente",
			UNPLUGGED: 					"La porta WAN è scollegata.",
			
			CONNECTED: 					"Connesso",
			DISCONNECTED: 				"Disconnesso",
			CONNECTING: 				"Connessione in corso",

			INTERNET_IP_ADDR: 			"Indirizzo IP",
			
			IP_ADDR: 					"Indirizzo IP",
			MAC_ADDR: 					"Indirizzo MAC",
			GATEWAY: 					"Gateway",

			AUTO: 						"Automatica",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"Client wireless",
			HOST_CLIENTS: 				"Client wireless",
			GUEST_CLIENTS: 				"Client ospiti",
			WIRE_CLIENTS: 				"Client cablati",
			PRINTER: 					"Stampante",
			USB_DISK: 					"Disco USB",
			WIRELESS: 					"Wireless",
			NAME: 						"Nome",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Canale",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Wireless 2.4GHz",
			WIRELESS_5GHZ: 				"Wireless 5GHz",
			WIRELESS_60GHZ:				"Wireless 60 GHz",
			
			GUEST_24GHZ: 				"Rete Ospiti 2.4GHz",
			GUEST_5GHZ: 				"Rete Ospiti 5GHz",
			
			STATUS: 					"Stato",
			TOTAL: 						"Totale",
			AVAILABLE: 					"Disponibile",
			GB: 						"GB",
			BRAND: 						"Marca",

			DYNAMIC_IP: 				"IP dinamico",
			STATIC_IP: 					"IP statico",
			SUBNET_MASK: 				"Subnet mask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"cavo BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"tunnel 6to4",
			NONE: 						"Nessuno"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Rilevamento automatico",
			INTERNET_CONN_TYPE: 		"Tipo di connessione Internet",
			DYNAMIC_IP: 				"IP dinamico",
			STATIC_IP: 					"IP statico",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"Cavo BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Scollegato",
			NONE: 						"Nessuna",
			DETECT_FAIL: 				"Rilevamento automatico non riuscito",
			SECONDARY_CONN: 			"Connessione secondaria",

			DYNAMIC_YES: 				"NON clonare indirizzo MAC",
			DYNAMIC_NO: 				"Clona indirizzo MAC computer corrente",
			
			IP_ADDR: 					"Indirizzo IP",
			SUBNET_MASK: 				"Subnet mask",
			DEFAULT_GATEWAY: 			"Gateway predefinito",
			PRIMARY_DNS: 				"DNS primario",
			SECOND_DNS: 				"DNS secondario",
			OPTIONAL: 					"(facoltativo)",
			USER_NAME: 					"Username",
			PASSWORD: 					"Password",
			SERVER_IP_ADDR_NAME: 		"VPN Server IP/Nome Dominio",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Se non siete sicuri di conoscere il Tipo di connessione Internet, utilizzate la funzione Rilevamento Automatico o contattate il vostro ISP per assistenza."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Impostazioni wireless",
			MODE_2G: 					"Wireless 2.4GHz",
			MODE_5G: 					"Wireless 5GHz",
			MODE_60G: 					"Wireless 60 GHz",
			WIRELESS_NETWORK_NAME: 		"Nome di rete wireless (SSID)",
			WIRELESS_PASSWORD: 			"Password",
			ENABLE_WIRELESS: 			"Abilita wireless",
			SAVE: 						"Salva ",
			ENCRYPTION_2G_NOTICE:		"La crittografia 2.4GHz è %s.",
			ENCRYPTION_5G_NOTICE:		"La crittografia 5GHz è %s.",
			ENCRYPTION_60G_NOTICE:		"La crittografia a 60 GHz è %s.",
			ENCRYPTION_2G_NO: 			"La rete wireless 2.4GHz non è crittografata.",
			ENCRYPTION_5G_NO: 			"La rete wireless 5GHz non è crittografata.",
			ENCRYPTION_60G_NO: 			"La rete wireless a 60 GHz non è crittografata.",
			ENCRYPTION_NO: 				"Una rete wireless non sicura è esposta a pericoli.",
			ENCRYPTION_SURE: 			"Siete sicuri di volere continuare?",
			HIDE_SSID: 					"Nascondi SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Impostazioni di Base",
			TITIL_NEW:					"Disco e account",
			DISK_SET:					"Impostazioni dispositivo",

			SELFLY_REMOVE:				"Rimozione sicura",
			SCANING:					"Analisi in corso...",
			SCAN_RESULT:				"Disco %n trovato",
			
			DISKS:						"Dischi",
			USERS: 						"Account utente",
			DEVICENAME: 				"Nome dispositivo",
			VOLUMN: 					"Volume",

			USBSPACE: 					"Spazio utilizzato",
			FREESPACE: 					"Spazio libero",
			STATUS: 					"Stato",
			INACT: 						"Disattiva",
			USAGE: 						"Utilizzo",
			CAPACITY: 					"Capacità",
			OPERATION: 					"Operazione",
			
			ACC: 						"Gestione account", 	 	
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			USE_LOGIN: 					"Utilizza utente Login ",
			SCAN: 						"Scansiona",
			ENJECT_ALL: 				"Espelli tutti",
			ENJECT: 					"Espelli",
			ADD_USER: 					"Aggiungi utente",
			AUTH: 						"Autorità",


			LOCATION: 					"Luogo",
			MOBILE_ISP: 				"ISP mobile",
			DIAL_NUMBER: 				"Componi numero",
			APN: 						"APN",
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			MTU_SIZE: 					"Dimensione MTU (in byte)",
			OPTIONAL: 					"(facoltativa)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Parental Control",
			UNKNOWN: 					"Sconosciuto",
			
			DEVICE_CTR: 				"Dispositivi sottoposti al Parental Control",
			ID: 						"ID",
			DEVICE: 					"Nome dispositivo",
			MAC_ADDRESS: 				"Indirizzo MAC",
			TIME: 						"Tempo d'accesso a Internet",
			DESCRIPTION: 				"Descrizione",
			ENABLE: 					"Abilita",
			ENABLE_THIS_ENTRY: 			"Abilita questa voce",
			OPTIONAL: 					"(facoltativa)",
			BTN_VIEW: 					"Visualizza dispositivi esistenti",
			
			DEVICE_LIST: 				"Elenco dispositivi",
			SYSTEM_TIME: 				"Ora sistema",
			
			RESTR: 						"Restrizione sul contenuto",
			MODE: 						"Restrizione",
			BLACKMODE: 					"Black list",
			WHITEMODE: 					"White list",
			ACCESS_DEVICES_LIST: 		"Elenco dispositivi di accesso",
			
			CHOOSE: 					"Scegli",
			ADD_A_NEW_KEYWORD: 			"Aggiungete Una Nuova Parola Chiave da Bloccare",
			ADD_A_NEW_DOMAIN_NAME: 		"Aggiungete un Nuovo Nome Dominio per l'Accesso",
			
			OPT: 						"Operazione",
			STATUS: 					"Parental Control",
			YOURPC:						"Vostro PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Rete Ospiti",
			MODE_2G: 					"Wireless 2.4GHz",
			MODE_5G: 					"Wireless 5GHz",
			WIRELESS_NETWORK_NAME: 		"Nome di rete wireless (SSID)",
			WIRELESS_PASSWORD: 			"Password",
			DYNAMIC_PASSWORD: 			"Password",
			ENABLE_WIRELESS: 			"Abilita Rete Ospiti",
			SAVE:						"Salva ",
			HIDE_SSID: 					"Nascondi SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervallo Aggiornamento Password",
			PER_DAY: 					"Giornaliero",
			PER_WEEK: 					"Settimanale",
			PER_MONTH: 					"Mensile",
			NEVER: 						"Mai",
			UNENCRYPTED:				"Rete Ospiti non crittografata. Potete impostare una password nel menu Avanzate."
		},

		STATUS: {
			TITLE: 						"Stato",
			INTERNET:					"Internet",
			WIRELESS:					"Wireless",
			LAN:						"LAN",
			USB_TITLE:					"Dispositivi USB",
			PERFORMANCE: 				"Prestazioni",
			GUEST_NETWORK: 				"Rete Ospiti",
			ACCESS_DEVICES: 			"Dispositivi di Accesso",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60 GHz",

			CONNECTION_TYPE: 			"Tipo di Connessione",

			MAC_ADDRESS: 				"Indirizzo MAC",
			IP_ADDRESS: 				"Indirizzo IP",
			RELEASE: 					"Rilascia",
			RENEW: 						"Rinnova",
			
			DYNAMIC_IP: 				"IP dinamico",
			STATIC_IP: 					"IP statico",
			SUBNET_MASK: 				"Subnet mask",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Cavo BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Tunnel 6to4",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Pass-Through (bridge)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Nessuna",
			
			DEFAULT_GATEWAY: 			"Gateway predefinito",
			DNS: 						"Server DNS",
			MAC: 						"Indirizzo MAC",
			WDS_STATUS: 				"Stato WDS",
			
			IPV6_ADDRESS: 				"Indirizzo IP",
			PRIMARY_DNS: 				"DNS primario",
			SECOND_DNS: 				"DNS secondario",

			RADIO: 						"Wireless",

			NAME_SSID: 					"Nome (SSID)",
			NETWORK_NAME_SSID:			"Nome di rete (SSID)",
			HIDE_SSID: 					"Nascondi SSID",
			MODE: 						"Modalità",
			CHANNEL: 					"Canale",
			CHANNEL_WIDTH: 				"Ampiezza Canale",
			AUTO: 						"Automatica",
			CURRENT_CHANNEL: 			"Canale corrente",

			WDS: 						"Stato WDS",
			WIRED_CLIENTS: 				"Client cablati",
			WIRELESS_CLIENTS: 			"Client wireless",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Indirizzo locale del collegamento",
			ASSIGN_TYPE: 				"Tipo assegnato",
			
			ALLOW_TO_SEE_EACH: 			"Consenti agli ospiti di vedersi fra loro",

			TOTAL: 						"Totale:",
			AVAILABLE: 					"Disponibile:",

			USB: 						"Disco USB",
			PRINTER: 					"Stampante",

			CPU_LOAD: 					"Carico CPU",
			MEMORY_USAGE: 				"Utilizzo memoria",

			IP_ADDR_P: 					"Indirizzo IP:",
			MAC_ADDR_P: 				"Indirizzo MAC:",
			CONN_TYPE_P: 				"Tipo di connessione:",

			DISABLED: 					"Disabilitato",
			INIT: 						"Iniz.",
			SCAN: 						"Scansiona",
			AUTH: 						"Autent.",
			ASSOC: 						"Associa",
			RUN: 						"Esegui",
			HOST: 						"Host",
			GUEST: 						"Ospiti",

			ON: 						"Attivo",
			OFF: 						"Disattivo"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Tipo di Connessione Internet",
			INTERNET_MAC_ADDRESS: 		"Indirizzo MAC",
			
			CONNECT: 					"Connetti",
			DISCONNECT: 				"Disconnetti",

			IP_ADDR: 					"Indirizzo IP",
			
			USE_DEFAULT_MAC: 			"Utilizza indirizzo MAC predefinito",
			USE_COMPUTER_MAC: 			"Utilizza indirizzo MAC computer corrente",
			USE_CUSTOM_MAC: 			"Utilizza indirizzo MAC personalizzato",
			MAC_CLONE: 					"Clona MAC",
			
			CONFIG: 					"Config.",
			
			IP_ADDRESS: 				"Indirizzo IP",
			SUBNET_MASK: 				"Subnet mask",
			DEFAULT_GATEWAY: 			"Gateway predefinito",
			
			MANUAL_DNS: 				"DNS manuale",
			PRIMARY_DNS: 				"DNS primario",
			SECOND_DNS: 				"DNS secondario",
			
			RENEW: 						"Rinnova",
			RELEASE: 					"Rilascia",
			VIEW_MODE: 					"Modalità di visualizzazione",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Ottieni dinamicamente dall'ISP",
			USE_FOLLOW_IP_ADDR: 		"Utilizza il seguente indirizzo IP",
			USE_FOLLOW_DNS_ADDR: 		"Utilizza i seguenti indirizzi DNS",
			USE_FOLLOW_DNS_SERVER: 		"Utilizza il seguente server DNS",
			
			BASIC: 						"Base",
			ADVANCED: 					"Avanzate",
			
			DNS_ADDR_MODE: 				"Indirizzo DNS",
			MTU_SIZE: 					"Dimensione MTU",
			MTU_1500: 					"byte. (la dimensione predefinita è 1500, non cambiatela se non è necessario).",
			MTU_1480: 					"byte. (la dimensione predefinita è 1480, non cambiatela se non è necessario).",
			MTU_1460: 					"byte. (la dimensione predefinita è 1460, non cambiatela se non è necessario).",
			MTU_1420: 					"byte. (la dimensione predefinita è 1420, non cambiatela se non è necessario).",
			
			HOST_NAME: 					"Nome host",

			HOST_NAME_CONFIRM: 			"Il nome host contiene caratteri non validi che possono causare un comportamento imprevisto del sistema. Siete sicuri di volere continuare?",

			GET_IP_WITH_UNICAST_DHCP: 	"Ottenete l'IP utilizzando Unicast DHCP (solitamente non è necessario).",
			OPTIONAL: 					"(facoltativa)",
			
			STATIC_IP: 					"IP statico",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"Automatica",
						
			USER_NAME: 					"Username",
			PASSWORD: 					"Password",
			
			INTERNET_IP_ADDR: 			"Indirizzo IP",
			INTERNET_DNS: 				"DNS di Internet",
			SECONDARY_CONN: 			"Connessione secondaria",
			NONE: 						"Nessuna",
			INTERNET_PRIMARY_DNS:		"DNS primario",
			INTERNET_SECONDARY_DNS: 	"DNS secondario",
			
			DYNAMIC_IP: 				"IP dinamico",
			DYNAMIC_IP_v6: 				"IP Dinamico (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Nome servizio",
			ACCESS_CONCENTRATOR_NAME:  	"Nome Concentratore di Accesso",
			DETECT_ONLINE_INTERVAL: 	"Rileva intervallo online",
			INTERVAL_TIPS: 				"secondi. (0-120. L'impostazione predefinita è 10).",
			IP_ADDR_MODE:  				"Indirizzo IP",
			CONN_MODE: 					"Modalità di connessione",
			DHCP_LINK_UNPLUGGED: 		"La porta WAN è scollegata.",
			
			AUTO: 						"Automatica",
			ON_DEMAND: 					"Su richiesta",
			TIME_BASED: 				"Basata sul tempo",
			MANUALLY: 					"Manuale",
			MAX_IDLE_TIME: 				"Tempo massimo di inattività ",
			MAX_IDLE_TIME_TIPS: 		"minuti (0 significa sempre attivo).",
			PERIOD_OF_TIME: 			"Periodo di tempo",
			TIME_TIPS: 					"(HH.MM)",
			BIGPOND_CABLE: 				"Cavo BigPond",
			AUTH_SERVER: 				"Server  di autentic.",
			AUTH_DOMAIN: 				"Dominio di autentic.",
			L2TP: 						"L2TP",
			GATEWAY: 					"Gateway",
			SERVER_IP_ADDR_NAME: 		"VPN Server IP/Nome Dominio",
			PPTP: 						"PPTP",
			TO: 						"a",
			
			TUNNEL_6TO4: 				"Tunnel 6to4",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Ottieni indirizzo IPv6 non temporaneo",
			GET_PREFIX_DELEGATION: 		"Otteni delega di prefisso IPv6",
			IPV6_ADDR: 					"Indirizzo IPv6",

			GET_IPV6_WAY: 				"Ottieni indirizzo IPv6",
			AUTOMATICALLY:              "Ottieni automaticamente",
			SPECIFIED_BY_ISP: 			"Specificato dall'ISP",

			IPV6_ADDR_PREFIX: 			"Prefisso indirizzo IPv6",
			NONE_TEMPORARY: 			"Non temporaneo",

			PREFIX_DELEGATION: 			"Delega di prefisso",
			ENABLE:                     "Abilita",
			DISABLE:                    "Disabilita",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"Lunghezza maschera IPv4",
			CONFIG_TYPE: 				"Tipo di configurazione",
			RD6_PREFIX: 				"Prefisso 6RD",
			RD6_PREFIX_LENGTH: 			"Lunghezza prefisso 6RD",
			REPLY_IPV4_ADDR: 			"Indirizzo IPv4 border relay",
			MANUAL: 					"Manuale",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass-Through (bridge)",
			LOCAL_IPV6: 				"Indirizzo IPv6 locale",
			PEER_IPV6: 					"Indirizzo IPv6 peer",
			TUNNEL_ADDR: 				"Indirizzo tunnel",
			IPV4_NETMASK: 				"Netmask IPv4",
			CUSTOM: 					"Personalizzato",
		    AFTR_NAME: 					"Nome AFTR",


			
			
			IPV4_ADDR: 					"Indirizzo IPv4",
			IPV4_MASK: 					"Subnet Mask IPv4",
			IPV4_GATEWAY: 				"Gateway predefinito IPv4",

			DUPLEX: 					"Duplex",
			AUTO_NEGOTIATION: 			"Negoziazione automatica",
			FULL_DUPLEX_1000: 			"Full duplex 1000 Mbps",
			HALF_DUPLEX_1000:			"Half duplex 1000 Mbps",
			FULL_DUPLEX_100: 			"Full duplex 100 Mbps",
			HALF_DUPLEX_100: 			"Half duplex 100 Mbps",
			FULL_DUPLEX_10: 			"Full duplex 10 Mbps",
			HALF_DUPLEX_10: 			"Half duplex 10 Mbps"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"Indirizzo MAC",
			IP_ADDRESS: 				"Indirizzo IP",
			SUBNET_MASK: 				"Subnet mask",
			CUSTOM: 					"Personalizza",

			IGMP: 						"Abilita proxy IGMP",
			


			ASSIGNED_TYPE: 				"Tipo assegnato",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC + Stateless DHCP",
			RDNSS: 						"SLAAC + RDNSS",

			PREFIX: 					"Prefisso indirizzo",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Indirizzo",
			DELEFATED: 					"Delegato",
			STATIC: 					"Statico",
			SITE_PREFIX: 				"Prefisso sito",
			SITE_PREFIX_LEN: 			"Lunghezza prefisso sito",

			PREFIX_TYPE:  				"Tipo di configurazione prefisso sito",
			LAN_IPV6_ADDR:  			"Indirizzo IPV6 LAN",

			RELEASE_TIME: 				"Durata rilascio",
			RELEASE_TIME_TIP: 			"secondi. (la dimensione predefinita è 86400, non cambiatela se non è necessario).",
			ADDRESS:					"Indirizzo",
			SAVE: 						"Salva ",

			REBOOT_TIP: 				"Il router sta passando alla nuova pagina di accesso. <br/> Attendete..."

		},

		IPTV:{
			TITLE: 						"Impostazioni",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Abilita IPTV", 
			MODE:  						"Modalità",
			IGMP_PROXY: 				"Proxy IGMP",
			IGMP_VERSION: 				"Versione IGMP",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Bridge",
			BASIC: 						"Personalizza",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Russia",
			UNIFY:  					"Malaysia-Unifi",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"Telefono IP", 

			Q_TAG: 						"Tag 802.1Q",
			ENABLE: 					"Abilita",
			
			INTERNET_VLAN_ID: 			"ID VLAN Internet",
			INTERNET_VLAN_PRIORITY: 	"Priorità VLAN Internet",
			IP_PHONE_VLAN_ID: 			"ID VLAN ID telefono IP",
			IP_PHONE_VLAN_PRIORITY: 	"Priorità VLAN telefono IP",
			IPTV_VLAN_ID: 				"ID VLAN IPTV",
			IPTV_VLAN_PRIORITY: 		"Priorità VLAN IPTV",
			IPTV_MULTI_VLAN_ID: 		"ID VLAN multicast IPTV",
			IPTV_MULTI_VLAN_PRIORITY: 	"Priorità VLAN multicast IPTV"
		},

		DHCP_SERVER: {
			TITLE: 						"Server DHCP",
			
			SETTINGS: 					"Impostazioni",

			DHCP_SERVER: 				"Server DHCP",
			ENABLE_DHCP_SERVER: 		"Abilita server DHCP",

			IP_ADDR_POOL: 				"Pool di indirizzi IP",
			LEASETIME: 					"Durata lease indirizzo",
			LEASENOTE: 					"minuti. (2-2880. Il valore di default è 120.)",
			
			GATEWAY: 					"Gateway predefinito",
			DOMAIN: 					"Dominio predefinito",
			PRIMARYDNS: 				"DNS primario",
			SECONDARYDNS: 				"DNS secondario",

			OPTIONAL: 					"(facoltativo).",

			CLIENTSLIST: 				"Elenco client DHCP",
			CLIENT_NUMBER: 				"Numero client",
			CLIENT_NAME: 				"Nome client",
			MAC_ADDR: 					"Indirizzo MAC",
			ASSIGNED_IP: 				"Indirizzo IP assegnato",
			LEASE_TIME: 				"Durata lease",

			RESERVATION: 				"Riserva Indirizzi",

			RESERVED_IP: 				"Indirizzo IP riservato",
			IP_ADDRESS: 				"Indirizzo IP",
			DESCRIPTION: 				"Descrizione",

			CLIENTSLIST: 				"Elenco client DHCP",
			CLIENT_NUMBER: 				"Numero client",

			ENABLE: 					"Abilita",
			ENABLE_THIS_ENTRY: 			"Abilita questa entry",
			BTN_VIEW:					"Visualizza dispositivi esistenti"
			
		},

		DDNS: {
			DDNS: 						"DNS dinamico",
			SERVICEPROVIDER: 			"Service Provider",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"Vai alla registrazione...",
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			DOMAIN_NAME_LIST: 			"Elenco Nomi Dominio",
			DOMAIN_NAME: 				"Nome Dominio",
			LOGIN: 						"Login",
			LOGIN_SAVE: 				"Login e Salva", 
			LOGOUT: 					"Logout",
			STATU_SUCCESS:				"Operazione riuscita",
			UPDATE_INTERVAL:			"Intervallo di aggiornamento",
			ONE_HOUR:					"1 ora",
			SIX_HOUR:					"6 ore",
			TWETEEN_HOUR:				"12 ore",
			ONE_DAY:					"1 giorno",
			TWO_DAY:					"2 giorni",
			THREE_DAY:					"3 giorni",
			NEVER:						"mai",
			UPDATE:						"Aggiorna",
			STATU_INCORRENT:			"Username o password errati",
			STATU_ERR_DOMAIN:			"Errore nome dominio",
			
			STATU_NO_LAUNCH:			"Nessun avvio",
			STATU_FAIL_DDNS: 			"Aggiornamento DynDNS fallito.",
			STATU_FAIL_NOIP: 			"Aggiornamento No-IP fallito.",
			STATU_CONN:					"Connessione in corso"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Routing avanzato",
			STATIC_ROUTING: 			"Routing statico",

			DESTINATION_NETWORK:		"Destinazione rete",
			SUBNET_MASK: 				"Subnet mask",
			DEFAULT_GATEWAY: 			"Gateway predefinito",
			DESCRIPTION: 				"Descrizione",
			
			SYSTEM_ROUTING_TABLE: 		"Tabella di routing del sistema",
			CLIENT_NUMBER: 				"Numeri di route attivi",

			GATEWAY: 					"Gateway",
			INTERFACE: 					"Interfaccia",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Abilita",
			ENABLE_THIS_ENTRY: 			"Abilita questa voce"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Impostazioni",
			NOT_SUPPORT_5G: 			"La regione supporta solo 2,4 GHz. Assicurati di selezionare la regione corretta.",
			NOT_SUPPORT_60G: 			"La regione non supporta 60 GHz.",
			ENABLE_TIPS: 				"Dovete accendere il wireless.",

			REGION: 					"Regione",
			NOTICE:  					"Per utilizzare la funzione wireless, il dispositivo wireless deve essere acceso.",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60 GHz",

			WIRELESS: 					"Wireless",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Abilita Wireless",

			WIRELESS_NETWORK_NAME: 		"Nome di rete wireless (SSID)",
			WIRELESS_PASSWORD: 			"Password",
			HIDE_SSID: 					"Nascondi SSID",

			SECURITY: 					"Sicurezza",
			NO_SECURITY: 				"Nessuna sicurezza",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal (scelta consigliata)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2-Enterprise",
			WPA2_PERSONAL: 			    "WPA2-Personal (scelta consigliata)",
			WPA2_ENTERPRISE: 		    "WPA2-Enterprise",
			WEP: 						"WEP",

			VERSION: 					"Versione",

			AUTO: 						"Automatica",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Crittografia",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Modalità",
			MODE_B:  					"Solo 802.11b",
			MODE_G:  					"Solo 802.11g",
			MODE_N:  					"Solo 802.11n",
			MODE_BG:  					"802.11b/g mista",
			MODE_GN: 					"802.11g/n mista",
			MODE_BGN:  					"802.11b/g/n mista ",

			MODE_A_5: 					"Solo 802.11a",
			MODE_AN_5: 					"802.11a/n mista",
			MODE_N_5: 					"Solo 802.11n",
			MODE_AC_5:					"Solo 802.11ac",
			MODE_NAC_5:					"802.11n/ac mista",
			MODE_ANAC_5:				"802.11a/n/ac mista",

			MODE_AD_60:					"Solo 802.11ad",

			CHANNEL_WIDTH: 				"Larghezza canale",
			CHANNEL: 					"Canale",

			TRANSMIT_POWER: 			"Potenza di trasmissione",

			RADIUS_SERVER_IP: 			"IP server RADIUS",
			RADIUS_PORT: 				"Porta RADIUS",
			RADIUS_PASSWORD: 			"Password RADIUS",

			TYPE: 						"Tipo",
			OPEN_SYSTEM: 				"Sistema aperto",
			SHARED_KEY: 				"Chiave condivisa",

			KEY_SELECTED: 				"Chiave selezionata",
			KEY1: 						"Chiave 1",
			KEY2: 						"Chiave 2",
			KEY3: 						"Chiave 3",
			KEY4: 						"Chiave 4",

			WEP_KEY_FORMAT: 			"Formato chiave WEP",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Esadecimale",

			KEY_TYPE: 					"Tipo di chiave",
			BIT64: 						"64 bit",
			BIT128: 					"128 bit",
			BIT152: 					"152 bit",

			KEY_VALUE: 					"Valore chiave",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Bassa",
			MIDDLE: 					"Media",
			HIGH: 						"Alta"
		},

		WPS: {

			TITLE2: 					"PIN del router",
			ROUTERS_PIN_INFO: 			"Altri dispositivi possono connettersi a questo router tramite WPS con il PIN del router.",
			ENABLE_ROUTE_PIN: 			"PIN del router",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Genera",
			DFT: 						"Default",

			TITLE: 						"Procedura guidata WPS",
			SELECT_SETUP: 				"Selezionate un metodo di configurazione ",
			PUSH_BTN: 					"Pulsante (consigliata)",
			PUSH_DES: 					"Premete il pulsante fisico PUSH sul router o fate clic sul comando software Connetti in questa pagina.",
			CONNECT: 					"Connetti",
			CANCEL: 					"Annulla",

			RESULT_HEAD: 				"Il client wireless",
			RESULT_END: 				"è stato aggiunto alla rete.",
			NOT_FOUND: 					"Nessun client nelle vicinanze. Clicca il pulsante per riprovare.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"Non trovato",
			ENTER_CLIENT_PIN: 			"Immettete il PIN del client",
			SWITCH_NOTE:				"Per connettervi usando WPS, attivate la funzione wireless mediante il tasto WIFI.",
			SWITCH_NOTE2:				"Per utilizzare WPS Wizard, è necessario configurare prima i parametri wireless.",
			STATUS_PIN_ERROR: 			"PIN WPS non valido? Verificare se è corretto.",
			STATUS_ERROR: 				"Errore.",
			STATUS_CONN_ERROR: 			"Connessione non riuscita.",
			STATUS_CONNING: 			"Connessione in corso...",
			STATUS_CANCEL: 				"Connessione annullata.",
			
			NOTE: 						"Nota:",
			BUTTON: 					"Il Tasto WIFI è spento",
			ENABLE: 					"La funzione wireless non è abilitata",
			HIDDEN: 					"E' attivato Nascondi SSID",
			ENCRYPTION: 				"La crittografia non è corretta",
			WPS: 						"WPS è disabilitato nella pagina dei Parametri di Sistema",

			
			STATUS_CONN_OVERLAP: 		"connessione non riuscita (SOVRAPPOSIZIONE).",
			STATUS_CONN_TIMEOUT: 		"connessione non riuscita (TIMEOUT).",
			STATUS_CONN_INACT: 			"Connessione inattiva."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Stazioni Wireless Online",
			CLIENT_NUMBER: 				"Numero Client",
			MAC_ADDRESS: 				"Indirizzo MAC",
			CONN_TYPE: 					"Tipo di connessione",
			SECURITY: 					"Sicurezza",
			RECEIVED_PACKETS: 			"Pacchetti ricevuti",
			SEND_PACKETS: 				"Pacchetti inviati"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Impostazioni",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Consenti agli ospiti di vedersi fra loro",

			ALLOW_LOCAL: 				"Consenti agli ospiti di accedere alla rete locale",
			
			WIRELESS: 					"Wireless",
			WIRELESS_24G_RADIO: 		"Wireless 2.4GHz",
			WIRELESS_5G_RADIO: 			"Wireless 5GHz",
			ENABLE_GUEST: 				"Abilita Rete Ospiti",

			NAME_SSID: 					"Nome di rete wireless (SSID)",
			HIDE_SSID: 					"Nascondi SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervallo di aggiornamento password",
			PER_DAY: 					"Giornaliero",
			PER_WEEK: 					"Settimanale",
			PER_MONTH: 					"Mensile",
			NEVER: 						"Mai",
			SECURITY: 					"Sicurezza",
			NO_SECURITY: 				"Nessuna sicurezza",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal",

			VERSION: 					"Versione",
			AUTO: 						"Automatica",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Crittografia",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Password"
		},

		NAT:{
			SETTINGS: 					"NAT Hardware",
			STATUS: 					"NAT Hardware",
			
			ALG_TITLE: 					"Gateway di livello applicazione (ALG)",

			FTP_ALG: 					"ALG FTP",
			TFTP_ALG: 					"ALG TFTP",
			H323_ALG: 					"ALG H323",
			RTSP_ALG: 					"ALG RTSP",
			PPTP_ALG: 					"Passthrough PPTP",
			L2TP_ALG: 					"Passthrough L2TP",
			IPSEC_ALG: 					"Passthrough IPSec",

			ENABLE_FTP_ALG: 			"Abilita ALG FTP",
			ENABLE_TFTP_ALG: 			"Abilita ALG TFTP",
			ENABLE_H323_ALG: 			"Abilita ALG H323",
			ENABLE_RTSP_ALG: 			"Abilita ALG RTSP",
			ENABLE_PPTP_ALG: 			"Abilita passthrough PPTP",
			ENABLE_L2TP_ALG: 			"Abilita passthrough L2TP",
			ENABLE_IPSEC_ALG: 			"Abilita passthrough IPSec",
			NAT_ENABLE_NOTICE: 			"Nota: le configurazioni non avranno effetto se la funzione NAT non è abilitata."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Server virtuali",

			SERVICE_NAME: 				"Tipo di servizio",
			EXTERNAL_PORT: 				"Porta esterna",
			INTERNAL_IP: 				"IP interno",
			INTERNAL_PORT: 				"Porta interna",
			PROTOCAL: 					"Protocollo",

			BTN_VIEW: 					"Visualizza i servizi esistenti",

			EXSITTING_SERVICE: 			"Servizi esistenti",
			
			PROTOCAL_ALL: 				"Tutti",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX o XX)",
			EXT_PORT_TIPS: 				"(XX o XX-XX, 1-65535)",
			INT_PORT_TIPS: 				"(XX o vuoto, 1-65535)",

			NOTICE:						"Conflitto con la porta di gestione remota. Siete sicuri di volere continuare?",
			NOTICE_INVALID_REMOTE:		"La gestione da remoto non è valida a causa del conflitto della porta 80 con il virtual server. Cambiate la porta di gestione remota.",
			NOTICE_ENTER_ANOTHER:		"In conflitto con la porta di gestione remota. Immettete un'altra porta.",
			NOTICE_PPTP_CONFLICT:		"In conflitto con la porta PPTP VPN. Inserisci un'altra porta.",
			NOTICE_OPENVPN_CONFLICT:	"In conflitto con la porta OPENVPN. Inserisci un'altra porta.",


			ENABLE_THIS_ENTRY: 			"Abilita",
			OPERATION: 					"Operazione",
			CHOOSE: 					"Scegli",
			NAT_ENABLE_NOTICE: 			"Nota: le configurazioni non avranno effetto se la funzione NAT non è abilitata."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Port Triggering",
			APPLICATION: 				"Applicazione",
			TRIGGER_PORT: 				"Port Triggering",
			TRIGGER_PROTOCOL: 			"Protocollo Triggering",

			EXTERNAL_PORTS: 			"Porta esterna",
			EXTERNAL_PROTOCOL: 			"Protocollo esterno",

			BTN_VIEW: 					"Visualizza applicazioni esistenti",

			EXSITTING_APPLICATION: 		"Applicazioni esistenti",
			APPLICATION_NAME: 			"Nome applicazione",
			TRIGGER_TIPS: 				"(XX, 1-65535)",
			EXTERNAL_TIPS: 				"(XX o XX-XX, 1-65535, massimo 5 coppie)",
			
			NOTICE_PPTP_CONFLICT:		"In conflitto con la porta PPTP VPN. Inserisci un'altra porta.",
			NOTICE_OPENVPN_CONFLICT:	"In conflitto con la porta OPENVPN. Inserisci un'altra porta.",
			
			ENABLE_THIS_ENTRY: 			"Abilita",
			OPERATION: 					"Operazione",
			
			PROTOCAL_ALL: 				"Tutti",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Nota: le configurazioni non avranno effetto se la funzione NAT non è abilitata."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Abilita DMZ",
			HARDWARESTATUS: 			"Indirizzo IP host DMZ",
			NAT_ENABLE_NOTICE: 			"Nota: le configurazioni non avranno effetto se la funzione NAT non è abilitata."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"Elenco servizi UPnP",
			CLIENT_NUMBER: 				"Numero client",
			SERVICE: 					"Descrizione del servizio",
			EXTERNAL_PORT: 				"Porta esterna",
			PROTOCAL: 					"Protocollo",
			IP_ADDR: 					"Indirizzo IP interno",
			INTERNAL_PORT: 				"Porta interna",
			NAT_ENABLE_NOTICE: 			"Nota: le configurazioni non avranno effetto se la funzione NAT non è abilitata."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"Modem USB",
			LOCATION: 					"Percorso",
			MOBILE_ISP: 				"ISP mobile",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Modalità di connessione",
			CONNECT_ON_DEMAND: 			"Connessione a richiesta",
			CONNECT_AUTOMATICALLY: 		"Connessione automatica",
			CONNECT_MANUALLY: 			"Connessione manuale",
			MAX_IDLE_TIME: 				"Tempo massimo di inattività",
			CONNECTION_TIP: 			"L'Accesso a Internet corrente è WAN Preferred.",
			IDLE_TIME_TIP: 				"La modalità di connessione e il tempo massimo di inattività non possono essere impostati manualmente.",
			MINUTES: 					"minuti. (0 significa che restano sempre attive).",

			AUTHENTICATION_TYPE: 		"Tipo di autenticazione",
			AUTO: 						"Automatica",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"L'impostazione predefinita è Automatica, non cambiatela se non è necessario. ",

			CONNECT: 					"Connetti",
			DISCONNECT: 				"Disconnetti",

			SET_TIP: 					"Impostate manualmente Dial Number, APN, Username e Password.",
			DIAL_NUMBER: 				"Dial Number",
			APN: 						"APN",
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			OPTIONAL: 					"(facoltativa).",
			MTU_SIZE: 					"Dimensione MTU (in byte)",
			MTU_SIZE_TIP: 				"la dimensione predefinita è 1480, non cambiatela se non è necessario",

			USE_FOLLOW_DNS_SERVER: 		"Utilizza i seguenti server DNS",
			PRIMARY_DNS: 				"DNS primario",
			SECOND_DNS: 				"DNS secondario",

			UNPLUGGED: 					"Scollegato",
			IDENTIFYING: 				"Identificazione in corso...",
			IDENTIFY_SUCCESS: 			"Identificazione completata"
		},

		DISK_SETTING: {
			DISK_SET: 					"Impostazioni dispositivo",
			SCAN: 						"Scansiona",
			SELFLY_REMOVE: 				"Rimozione sicura",
			SCAN_RESULT: 				"Disco %n trovato",
			NOT_FOUND: 					"Non trovato",
			SELFLY_REMOVE: 				"Rimozione sicura",
			
			VOLUMN: 					"Volume",
			CAPACITY: 					"Capacità",
			FREESPACE: 					"Spazio libero",
			USBSPACE: 					"Spazio utilizzato",
			
			STATUS: 					"Stato",
			INACT: 						"Disattiva",
			ACTIVE: 					"Attiva",
			
			USAGE: 						"Utilizzo",
			CAPACITY: 					"Capacità",
			OPERATION: 					"Operazione",	
			
			ACC: 						"Gestione account", 	 	
			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			USE_LOGIN: 					"Utilizza accesso utente",
			SCAN: 						"Scansiona",
			ENJECT_ALL: 				"Espelli tutti",
			ENJECT: 					"Espelli",
			ADD_USER: 					"Aggiungi utente",
			AUTH: 						"Autorità"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Offline Download",
			ITEMS:						"Unità",
			FILE:						"File",
			FOLDER:						"Cartella",
			SIZE:						"Dimensioni",
			STATUS:						"Stato",
			DOWNLOAD:					"Download",
			REMAINTING:					"Tempo rimanente",
			SPEED:						"Velocità",
			SOURCE:						"Sorgente",	
			DOWNLOADTO:					"Download in",	
			TORRENT_PC:					"Torrent da PC",
			TORRENT_USB:				"Torrent da USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"Porta TCP aMule",
			AMULEUDP:					"Porta UDP aMule",
			AMULESERVER:				"Server aMule",
			SCHEDULE:					"Schedulazione",
			MAXACTIVE:					"Numero massimo di operazioni attive",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Fuso Orario",
			DOWNLOADTIME:				"Tempo Download",
			REPEAT:						"Ripeti",
			SPEEDLIMIT:					"Limiti Velocità",
			MAXDOWNLOAD:				"Velocità massima download",
			MAXUPLOAD:					"Velocità massima upload",
			SPEEDTIPS:					"(0 significa illimitato)",
			BTPORT:						"Porta Download BT",
			SEED:						"Tenete Seeding dopo che la task è stata completata",
			UNIT:						"KB/S",
			MODIFY:						"Modifica",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Location Torrent",
			CONNECT:					"Connesso",
			DISCONNECTED:				"Disconnesso",
			CONNECTING:					"Connessione in corso",
			GENERAL:					"Generale",
			COMPLETED:					"Completato",
			NEWDEVICE:					"Nuovo dispositivo",
			FOUNDUSB:					"Rilevato nuovo USB",
			CONNECTEDPEERS:				"Peer connessi",
			OF:							"di",
			NUM_OF_CON:					"Numero di connessioni",
			NUM_OF_CON_G:				"Numero max globale di connessioni",
			NUM_OF_CON_PT:				"Numero massimo di peer connessi per Torrent",
			EN_DHT_NET:					"Abilita rete DHT",
			EN_PE_EX:					"Abilita scambio peer",
			EN_BT:						"Abilita crittografia protocollo BitTorrent",
			GENERAL_SETTINGS:			"Impostazioni generali",
			BT_SETTINGS:				"Impostazioni BT",
			AMULE_SETTINGS:				"Impostazioni aMule",
			CLEAN:						"Rimozione completata",
			NONE_COMPLETE: 				"Nessun'operazione completata."
		},

		FOLDER: {
			TITLE: 						"Impostazioni di condivisione",
			ACCOUNT_TITLE: 				"Account di condivisione",
			ACCOUNT:					"Account",
			AC_NOTE: 					"Preparate un account per la condivisione di contenuti. Potete utilizzare l'account di accesso o crearne uno nuovo.",
			
			AC_LOGIN: 					"Utilizza account predefinito",
			AC_FOLLOW: 					"Utilizza nuovo account",

			USERNAME: 					"Username",
			PASSWORD: 					"Password",
			CONFIRM: 					"Conferma password",

			SHARING_SETTING: 			"Impostazioni Condivisione",
			SERVER_NAME: 				"Nome rete/server multimediale",

			METHOD: 					"Metodo di accesso",
			LINK: 						"Collegamento",
			PORT: 						"Porta",

			NETWORK_NEIGHBORHOOD: 		"Risorse di rete",
			FTP: 						"FTP",
			FTPEX: 						"FTP (via Internet)",

			SHARE_FOLDER: 				"Condivisione cartella",
			SHAREING_ALL: 				"Condividi tutte",
			NOTE:  						"Attivate per condividere tutti i file e le cartelle o disattivate per condividere solo le cartelle selezionate.", 
			ENABLE_AUTHENTICATION: 		"Abilita autenticazione",
			SHAREING_FOLDER: 			"Cartelle di condivisione",
			
			SHARE_NAME: 				"Nome cartella",
			FOLDER_PATH: 				"Percorso cartella",
			VOLUMN_NAME: 				"Nome volume",

			SHARE_NAME: 				"Nome cartella",
			FOLDER_PATH: 				"Percorso cartella",
			MEDIA_SHARING: 				"Condivisione file multimediali",
			STATUS: 					"Stato",

			GUEST_ACCESS: 				"Consenti Accesso a Rete Ospiti",
			ENABLE_AUTHENTICATION: 		"Abilita autenticazione",
			ENABLE_WRITE_ACCESS: 		"Attiva accesso in scrittura",
			ENABLE_MEDIA_SHARE: 		"Attiva condivisione file multimediali",
			
			BROWSE: 					"Sfoglia",
			BROWSE_TITLE: 				"Seleziona una cartella",

			NO_VOLUMN:					"Nessun volume",
			
			NOTICE: 					"Siete sicuri di volere uscira dalla pagina DNS Dinamico? Premete Salva per salvare e uscire. Premete Esci per uscire senza salvare. Premete Annulla per rimanere.",
			NO_CHANGE_NOTICE: 			"Siete sicuri di volere uscira dalla pagina DNS Dinamico?",

			SAVE_FAILED_NOTICE: 		"Salvataggio non riuscito",
			CONTINUE: 					"Esci",
			CONTINUE_SAVE: 				"Salva",
			CANCLE: 					"Annulla",

			ENABLE: 					"Abilita"

		},

		PRINT:{
			TITLE: 						"Print Server",
			NAME: 						"Nome stampante",
			ENABLE_PRINT_SERVER: 		"Print Server",
			NONE: 						"Nessuna",
			
			NOTE_TITLE: 				"Nota:",
			STEP1: 						"Passaggio 1:",
			STEP2: 						"Passaggio 2:",
			STEP3: 						"Passaggio 3:",

			NOTE1: 						"Installate il driver della stampante sul computer",
			NOTE2: 						"Collegate la stampante USB alla porta USB del router tramite un cavo USB.",
			NOTE3: 						"Installate TP-LINK USB Printer Controller Utility. Scaricatela dal nostro sito ufficiale: <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/it/Support/\">http://www.tp-link.com/it/Support/</a>.",
			NOTE3_US: 					"Installate la Utility USB Printer Controller di TP-LINK. Scaricatela dal sito web ufficiale TP-LINK: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Parental Control",
			STATUS: 					"Parental Control",
			UNKNOWN: 					"Sconosciuto",

			DEVICE_CTR: 				"Dispositivi sottoposti al Parental Control",
			DEVICE: 					"Nome dispositivo",
			MAC_ADDRESS: 				"Indirizzo MAC",
			TIME: 						"Tempo d'accesso a Internet",
			DESCRIPTION: 				"Descrizione",
			
			ENABLE_THIS_ENTRY: 			"Abilita",
			OPTIONAL: 					"(facoltativa).",
			BTN_VIEW: 					"Visualizza dispositivi esistenti",
			
			DEVICE_LIST: 				"Elenco dispositivi",
			SYSTEM_TIME: 				"Ora sistema",
			
			RESTR: 						"Restrizione sul contenuto",
			MODE: 						"Restrizione",
			BLACKMODE: 					"Black list",
			WHITEMODE: 					"White list",
			ACCESS_DEVICES_LIST: 		"Elenco dispositivi di accesso",
			
			CHOOSE: 					"Scegli",
			ADD_A_NEW_KEYWORD: 			"Aggiungete Una Nuova Parola Chiave da Bloccare",
			ADD_A_NEW_DOMAIN_NAME: 		"Aggiungete un Nuovo Nome Dominio per l'Accesso",
			
			YOURPC:						"Vostro PC"
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
			OTHERS: 					"Altri",

			DEVICE: 					"Dispositivo",
			RATE: 						"Tasso",
			APPLICATION: 				"Applicazione",

			NAME: 						"Nome",
			MAC_ADDRESS: 				"Indirizzo MAC",
			IP_ADDRESS: 				"Indirizzo IP",


			DEVICES: 					"Dispositivi"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Larghezza di banda",
			TEST_BANDWIDTH: 			">Test larghezza di banda",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Abilita streamboost",
			UP_LIMITATION: 				"Limite superiore (Mbps)",
			DOWN_LIMITATION: 			"Limite inferiore (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Esegui test larghezza d banda",
			TESTING: 					"Test in corso",
			TEST_FAILED: 				"Test non riuscito",
			TEST_SUCCEED: 				"Test riuscito",
			ENABLE_AUTOMATIC_TEST: 		"Abilita test automatico",
			KEEP_UP_TO_DATE: 			"Mantieni StreamBoost aggiornato",
			ENABLE_AUTOMATIC_UPDATE: 	"Abilita aggiornamento automatico"

		},

		PRIORITY:{
			PRIORITY: 					"Priorità",
			PRIORITY_TIPS: 				"La priorità consente di modificare l'importanza di un dispositivo rispetto a un altro. L'opzione è utile se più dispositivi sono in competizione per utilizzare una banda limitata avendo la stessa classificazione.",
			ALL_DEVICE: 				"Tutti i dispositivi",
			ACTIVE_DEVICE: 				"Dispositivo attivo",
			SAVE: 						"Salva ",
			ID: 						"ID",
			DEVICE: 					"Dispositivo",
			TYPE: 						"Tipo",
			MAC_ADDRESS: 				"Indirizzo MAC",
			STICK: 						"Stick"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistiche",
			UP_TIME: 					"Tempo di attività",
			DOWNLOADS: 					"Download",
			LAST_DAY: 					"Ultimo giorno",
			LAST_WEEK: 					"Settimana scorsa",
			LAST_MONTH: 				"Mese scorso",
			ALL_LAN_HOSTS: 				"Tutti gli host LAN",
			OTHER: 						"Altro"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Firewall",
			ENABLE_SPI: 				"Firewall SPI",

			DOS_PROTECTION: 			"Protezione DoS",
			ENABLE_DOS: 				"Protezione DoS",
			
			OFF: 						"Disattivo",
			LOW: 						"Bassa",
			MIDDLE: 					"Media",
			HIGH: 						"Alta",

			ICMP: 						"ICMP-FLOOD Attack Filtering",
			UDP: 						"UDP-FLOOD Attack Filtering",
			TCP: 						"TCP-SYN-FLOOD Attack Filtering",
			ENABLE_DOS_TIP:             "Protezione DoS e Statistiche Traffico devono essere abilitate in contemporanea.",

			IGNORE: 					"Ignora pacchetti ping da porta WAN",
			FORBID: 					"Vieta pacchetti ping da porta LAN",

			BLOCK_DOS: 					"Elenco host DoS bloccati",
			HOST_NUMBER: 				"Numero Host",
			IP_ADDRESS: 				"Indirizzo IP",
			MAC_ADDRESS: 				"Indirizzo MAC"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Controllo di accesso",
			ENABLE_ACCESS: 				"Controllo di accesso",

			ACCESS_MODE: 				"Modalità di accesso",
			DEFAULT_ACCESS_MODE: 		"Modalità di accesso predefinito",
			BLACK_LIST: 				"Black list",
			WHITE_LIST: 				"White list",
			
			WIRED:						"Cablato",
			WIRELESS:					"Wireless",

			DEVICE_ONLINE: 				"Dispositivi online",
			NAME: 						"Nome dispositivo",
			IP_ADDRESS: 				"Indirizzo IP",
			MAC_ADDRESS: 				"Indirizzo MAC",
			CONN_TYPE: 					"Tipo di connessione",

			BLOCK: 						"Blocca",

			DEVICE_IN_WHITE: 			"Dispositivi in white list",
			DEVICE_IN_BLACK: 			"Dispositivi in black list"
		},

		IP_MAC:{
			TITLE: 						"Impostazioni",
			ENABLE_ARP: 				"Binding ARP",

			ARP_LIST: 					"Elenco ARP",
			ARP_NUM: 					"Numero voce ARP",

			MAC_ADDRESS: 				"Indirizzo MAC",
			IP_ADDRESS: 				"Indirizzo IP",
			BOUND: 						"Associato",
			UNBOUND: 					"Non associato",

			BINDING_LIST: 				"Elenco associazioni",
			DESCRIPTION: 				"Descrizione",
			OPTIONAL: 					"(facoltativa).",
			ENABLE_THIS_ENTRY: 			"Abilita"
		},

		TIMESET: {
			TITLE: 						"Impostazioni data/ora",
			ZONE: 						"Fuso orario",
			DATE: 						"Data",
			DATEFORMAT: 				"GG/MM/AAAA",
			TIME: 						"Ora",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"Server NTP I",
			NTP2: 						"Server NTP II",
			OPTIONAL: 					"(facoltativa).",

			CURRENT_TIME:  				"Ora corrente",
			SET_TIME: 					"Imposta ora corrente",
			AUTOMATIC: 					"Ottieni automaticamente da Internet",
			MANUAL: 					"Manualmente",
			AUTOMATIC_BTN: 				"Ottieni",


			GETGMT: 					"Ottieni GMT",

			
			GETGMT_SUCCESS: 			"Ottieni ora da server NTP - operazione riuscita",
			GETGMT_TIMEOUT: 			"Ottieni ora da server NTP - tempo scaduto",
			GETGMT_WAIT: 				"Attesa",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Ora legale",
			ENABLE_DAYLIGHT: 			"Attiva ora legale",
			START: 						"Inizio",
			END: 						"Fine",

			RUNNING_STATUS: 			"Stato esecuzione",
			DOWN: 						"Ora legale disattivata",
			UP: 						"Ora legale attiva"
		},

		DIAG:{
			TITLE: 						"Diagnostica",
			DIAGNOSTIC_TOOL: 			"Strumento di Diagnostico",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"Indirizzo IP/Nome dominio",
			COUNT: 						"Conteggio ping",
			
			BASIC: 						"Base",
			ADVANCED: 					"Avanzate",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Dimensione pacchetto ping",
			PKTUNIT: 					"(4-1472 byte)",

			TIMEOUT: 					"Timeout ping",
			TIMOUTUNIT: 				"(100-2000 millisecondi)",

			TTL: 						"TTL max. Traceroute",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Inizio",
			STOP: 						"Arresto"
		},

		FIRMWARE:{
			TITLE: 						"Aggiornamento Firmware",
			FIRMWARE_INFO:  			"Il firmware è aggiornato.",
			INFO: 						"Informazioni su dispositivo",
			REMOTE_TITLE: 				"Upgrade online",
			LOCAL_TITLE: 				"Upgrade locale",

			NEWFILE: 					"Nuovo Firmware",
			FIRMWAREVERSION: 			"Versione Firmware",
			HARDWAREVERSION: 			"Versione hardware",
			LATESTVERSION: 				"Ultima versione",
			CONFIRM_CONTENT:			"Eseguire l'upgrade del firmware?",
			WARNING:					"Upgrade del firmware... <br/> Per evitare danni, mentre è in corso il processo lascia acceso il dispositivo e attendi senza eseguire operazioni.",
			REBOOTING: 					"Riavvia... <br/> Per evitare danni, mentre è in corso il processo lascia acceso il dispositivo e attendi senza eseguire operazioni.",
			DO_NOT_OPERATE: 			"Upgrade in corso... <br/>NON fate nulla durante il processo.",
			FIRMWARE_UPDATING_NOTE: 	"1.Aggiornamento del firmware...",
			REBOOTING_NOTE: 			"2.Riavvio...",
			SCREEN_UPDATING_NOTE: 		"3.Aggiornamento dello schermo...",
			UPGRADE_FAILED: 			"Upgrade fallito.",
			UPGRADE: 					"Aggiorna",
			CHECK: 						"Controlla",
			DOWNLOADING: 				"Download...",
			UPGRADE_INOF: 				"Per evitare danni, lascia acceso il router.",
			NOTE: 						"Nota:",
			NO_UPGRADE: 				"questa è l'ultima versione.",

			UPGRADING: 					"Upgrade...",
			RETRY: 						"Riprova",
			CANCEL: 					"Annulla",
			ILEGAL_DEVICE:				"Impossibile identificare il dispositivo. Contatta l'assistenza tecnica TP-LINK.",
			UPGRADE_FAIL: 				"Impossibile eseguire l'upgrade. Riprova più tardi.",
			CHECK_UPGRADE:				"Controlla se sono disponibili upgrade"
		},

		BACKUP:{
			BACKUP: 					"Backup",
			BACKUPTIP: 					"Salva una copia delle impostazioni correnti.",

			RESTORE: 					"Ripristino",
			RESTORETIP: 				"Ripristina le impostazioni salvate da un file.",
			
			RESTORE_WARN:				"Ripristino del router in corso... <br/>Non utilizzate durante il processo.",
			RESTORE_CONFIRM_CONTENT: 	"Ripristinare il router dal file di backup?",
			
			FILE: 						"File",

			FACTORY: 					"Ripristino Impostazione di Default",
			FACTORYTIP: 				"Ripristina i valori di default di tutte le impostazioni di configurazione.",
			FACTORY_CONFIRM_CONTENT:	"Siete sicuri di volere ripristinare le impostazioni didefault del router?",
			FACTORY_WARN:				"Ripristino del router in corso... <br/>Non utilizzate durante il processo.",
			
			BACKUPBTN: 					"Backup",
			RESTOREBTN: 				"Ripristino",
			FACTORYBTN: 				"Ripristino Impostazioni di Fabbrica"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Gestione account",
			
			OLDUSER: 					"Vecchia Username",
			OLDPWD: 					"Vecchia password",

			NEWUSER: 					"Nuova Username",
			NEWPWD: 					"Nuova password",
			CONFIRM: 					"Conferma nuova password",

			RECOVERYINFO: 				"Recupero password",
			ENABLE_PASSWORD_RECOVERY: 	"Abilita Recupero password",
			FROM: 						"Da",
			TO: 						"A",
			SMTP_SERVER: 				"Server SMTP",
			
			ENABLE_AUTHENTICATION: 		"Abilita autenticazione",
			USERNAME: 					"Username",
			PASSWORD: 					"Password",

			TEST_MAIL: 					"Test Mail",

			LOCAL:						"Gestione Locale",
			LOCAL_MAC_AUTH: 			"Autenticazione MAC locale",
			ACCESS: 					"Accesso per tutti i dispositivi connessi alla LAN",
			ACCESS_TIPS: 				"Attivate per abilitare la gestione di tutti i dispositivi connessi alla LAN o disattivate per abilitare la gestione di un dispositivo specifico.",
			
			MAC_ADDRESS: 				"Indirizzo MAC",
			VIEW_BTN: 					"Visualizza dispositivi esistenti",
			DESCRIPTION: 				"Descrizione",

			EXIST_DEVICE:               "Dispositivi esistenti",

			OPTIONAL: 					"(facoltativa).",
			ENABLE_THIS_ENTRY: 			"Abilita",

			DEVICE_NAME:				"Nome dispositivo",
			IP_ADDRESS:					"Indirizzo IP",
			

			REMOTE: 					"Gestione remota",
			DISABLE_REMOTE_MANAGEMENR: 	"Disabilita gestione remota",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Abilita gestione remota per tutti i dispositivi",
			ENABLE_REMOTE_MANAGEMENR: 	"Abilita gestione remota per i dispositivi specificati",
			WEB: 						"Porta di Gestione Web",

			NOTICE:						"Conflitto con la porta del server virtuale! Continuare?",
			NOTICE_ENTER_ANOTHER:		"In conflitto con la porta del server virtuale. Immettete un'altra porta.",

			REMOTEIP: 					"Indirizzo IP di Gestione Remota",
			REMOTEIPNOTE: 				"(Immettete 255.255.255.255 per tutti)"
			
		},

		SYSLOG:{
			TITLE: 						"Log di sistema",
			LOG_FILTER: 				"Filtro log:",
			
			TYPE_EQ: 					"Type=",
			
			ALL: 						"Tutti",

			FIREWALL: 					"Firewall", 
			NAT: 						"NAT",
			DDNS: 						"DNS dinamico",
			UPNP:						"UPnP",
			IMB:            			"Binding IP e MAC",
			IPTV:						"IPTV",
			DHCPS:						"Server DHCP",
			IGMP_PROXY:					"Proxy IGMP",
			DOMAIN_LOGIN:				"Accesso al dominio:",
			BASIC_SECURITY: 			"Sicurezza di base",
			PARENTAL_CONTROL: 			"Parental Control",
			ACCESS_CONTROL: 			"Controllo Accesso",
			DOS_PROTECTION: 			"Protezione DoS",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Statistiche Traffico",
			TIME_SETTINGS: 				"Impostazione data/ora",
			ACCOUNT_MANAGEMENT: 		"Gestione account",
			LOCAL_MANAGEMENT: 			"Gestione locale",
			REMOTE_MANAGEMENT: 			"Gestione remota",
			LOCALE: 					"Locale",
			FACTORY_RESET: 				"Ripristino Impostazioni di Fabbrica",
			LED_CONTROLLER: 			"Controller LED",
			NETWORK: 					"Rete",
			USBSHARE: 					"Condivisione USB",
			AND: 						"e",
			LEVEL: 						"Livello",
			EMERGENCY:					"EMERGENCY",
			ALERT:						"ALERT",
			CRITICAL:					"CRITICAL",
			ERROR: 						"ERROR",
			WARNING: 					"WARNING",
			NOTICE: 					"NOTICE",
			INFO: 						"INFO",
			DEBUG: 						"DEBUG",

			INDEX: 						"Indice",
			TYPE: 						"Tipo",
			TIME: 						"Ora",
			LEVEL_COL:					"Livello",

			CONTENT: 					"Contenuto Log",
			
			MAIL_LOG: 					"Log Mail",
			SAVE_LOG: 					"Salva Log",

			SEND_OK: 					"Invio OK",
			SEND_FAILED: 				"Invio non riuscito",

			MAIL_SETTING: 				"Impostazioni Mail",

 			FROM: 						"Da",
 			TO: 						"A",
 			SMTP_SERVER: 				"Server SMTP",
 			ENABLE_AUTHENTICATION: 		"Abilita autenticazione",

 			USERNAME: 					"Username",
 			PASSWORD: 					"Password",
 			CONFIRM_PASSWORD: 			"Conferma password",

 			AUTO_MAIL: 					"Abilita invio mail automatico",
 			LOG_AT: 					"Ora di accesso ",
 			HH_MM: 						"(HH:MM) tutti i giorni",

 			LOG_EVERY: 					"Accedi ogni",
 			HOURS: 						"ore"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Impostazioni",
			STATUS: 					"Abilita QoS",
			UPBANDWIDTH: 				"Banda in Upload",
			DOWNBANDWIDTH: 				"Banda in Download",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Speed Test",
			RULE_LIST: 					"Elenco regole QoS",
			RULE: 						"Regola QoS",
			ID: 						"ID",
			NAME: 						"Nome",
			TYPE: 						"Tipo",
			DETAIL: 					"Dettaglio",
			PRIORITY: 					"Priorità",

			APPLICATION: 				"Applicazione",
			APPLICATION_LIST: 			"Elenco applicazioni",
			CUSTOM_APP: 				"Applicazione personalizzata",
			MAC_ADDR: 					"Indirizzo MAC",
			MAC_ADDR_P: 				"MAC:",
			IP_ADDR: 					"Indirizzo IP",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Porta fisica",

			LOW: 						"Bassa",
			MIDDLE: 					"Media",
			HIGH: 						"Alta",

			PROTO: 						"Protocollo",
			PORT: 						"Porta",
			PROTO_P: 					"Protocollo:",
			PORT_P: 					"Porta:",
			PORT_TIPS: 					"(XX o XX-XX, 1-65535, massimo 5 coppie)",

			ALL: 						"Tutti",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Personalizzato",

			WIFI_HOME: 					"WIFI-HOST",
			WIFI_GUEST: 				"WIFI-OSPITIspiti",
			PORT1: 						"LAN 1",
			PORT2: 						"LAN 2",
			PORT3: 						"LAN 3",
			PORT4: 						"LAN 4",

			DATABASE_UPGRADE: 			"Aggiornamento Database",

			NEWFILE: 					"Nuovo File Database",
			FIRMWAREVERSION: 			"Versione Database",
			CONFIRM_CONTENT:			"Aggiornare il Database?",
			WARNING:					"Aggiornamento Database in corso... <br/>Non utilizzate durante il processo.",
			
			UPGRADE: 					"Aggiorna",

			SERVICE_RESTART: 			"Riavvio servizio QoS",
			
			TYPE: 						"Tipo",
			BY_DEVICE: 					"Per dispositivo",
			BY_APP: 					"Per applicazione",
			BY_PHY: 					"Per porta fisica",

			HIGH_PRIORITY_LBL: 			"Priorità alta:",
			MIDDLE_PRIORITY_LBL: 		"Priorità media:",
			LOW_PRIORITY_LBL: 			"Priorità bassa:",

			HIGH_PRIORITY: 				"Priorità alta",
			MIDDLE_PRIORITY: 			"Priorità media",
			LOW_PRIORITY: 				"Priorità bassa"

		},

		APPLICATION:{
			APP_LIST: 					"Elenco applicazioni",
			GAME_LIST: 					"Elenco giochi",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Statistiche di traffico",
			ENABLE_STATISTICS: 			"Statistiche di traffico",

			TITLE: 						"Elenco statistiche di traffico",
			IP_MAC: 					"Indirizzo IP/Indirizzo MAC",
			TPKT: 						"Totale pacchetti",
			TBYTE: 						"Totale byte",
			CPKT: 						"Pacchetti correnti",
			CBYTE: 						"Byte correnti",
			CICMP: 						"Tx ICMP corrente",
			CUDP: 						"Tx UDP corrente",
			CSYN: 						"Tx SYN corrente",
			
			DELETE_CONFIRM: 			"Siete sicuri di volere eliminare le statistiche di traffico? ",
			DELETE_ALL_CONFIRM: 		"Siete sicuri di volere eliminare tutte le statistiche di traffico? ",

			RESET_ALL: 					"Reset Totale"
		},

		SYSPARA:{
			W24G: 						"Wireless 2.4GHz",
			W5G: 						"Wireless 5GHz",
			W60G: 						"Wireless 60 GHz",
			W24G_WDS: 					"WDS 2.4GHz",
			W5G_WDS: 					"WDS 5GHz",
			W60G_WDS: 					"WDS 60 GHz",
			SWITCH_NOTICE:  			"La funzione wireless è disattivata. Se desiderate utilizzare questa funzione, attivate il pulsante Wi-Fi.",

			ENABLE_TIPS: 				"La funzione wireless è disabilitata.",

			BEACON: 					"Intervallo beacon",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"Soglia RTS",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Soglia frammentazione",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"Intervallo DTIM",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Group Key Update Period",
			GROUPUNIT: 					"secondi",
			
			MU_MIMO_FEATURE: 			"Multiuser-MIMO",
			MU_MIMO: 					"Abilitita MU-MIMO",
			
			WMM_FEATURE: 				"Funzione WMM",
			WMM: 						"Abilita WMM",

			GI_FEATURE: 				"Funzione Short GI",
			GI: 						"Abilita Short GI",

			AP_FEATURE: 				"Funzione AP Isolation",
			AP: 						"Abilita AP Isolation",

			WDS_FEATURE: 				"Bridging WDS",
			WDS: 						"Abilita WDS Bridging",
			
			SSID_BRIDEGE: 				"SSID (to be bridged)",
			SURVEY: 					"Survey",

			SN: 						"SN",
			MAC_ADDRESS: 				"Indirizzo MAC",
			SSID: 						"SSID",
			SIGNAL: 					"Segnale",
			CHANNEL: 					"Canale",
			SECURITY: 					"Sicurezza",
			CHOSEN: 					"Scelto",
			AP_NUMBER:					"Numero AP",

			TOTAL: 						"Totale elementi",

			MAC: 						"Indirizzo MAC (per connessione bridge)",
			MACUNIT: 					"Esempio: 00-1D-0F-11-22-33",

			SECURITY: 					"Sicurezza",
			NO: 						"No",
			NONE: 						"Nessuna Sicurezza",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Password",
			
			AUTH_TYPE: 					"Tipo autent.",
			AUTO: 						"Automatica",
			OPEN: 						"Open System",
			SHARED: 					"Shared Key",

			WEP_INDEX: 					"Indice WEP",
			KEY1: 						"Chiave 1",
			KEY2: 						"Chiave 2",
			KEY3: 						"Chiave 3",
			KEY4: 						"Chiave 4",

			WEP_KEY_FORMAT: 			"Formato chiave WEP",
			ASC: 						"ASCII",
			HEX: 						"Esadecimale",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Abilita WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Abilita NAT",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Abilita NAT Boost",
			
			MEDIA_SERVER: 				"Server multimediale",
			SCAN_INTERVAL: 				"Intervallo di analisi automatica (ore)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"Impostazione Livello DoS Protection",

			ICMP: 						"Livello pacchetti ICMP-FLOOD",
			UDP: 						"Livello pacchetti UDP-FLOOD",
			TCP: 						"Livello pacchetti TCP-FLOOD",

			WDS_MODE: 					"Modalità WDS",
			WDS1: 						"WDS 1",
			WDS2: 						"WDS 2",

			LOW: 						"Bassa",
			MIDDLE: 					"Media",
			HIGH: 						"Alta",

			TO: 						"a",
			NOTICE_NAT_REBOOT: 			"Riavvio in corso... <br/>Non utilizzare durante il processo di riavvio.",

			NOTICE_NAT_BOOST: 			"La modifica dell'incremento NAT comporterà il riavvio del dispositivo. Siete sicuri di volere continuare?",
			NOTICE:						"Il canale del vostro router non è lo stesso dell'AP in bridge. Volete cambiarlo?",

			UNIT: 						"(5-7200) pacchetti/s",
			LED: 						"LED",
			NIGHT_MODE: 				"Modalità notte",
			PERIOD_NIGHT_TIME: 			"Modalità notturna",
			ENABLE: 					"Attiva modalità notturna",
			HH_MM: 						"(HH.MM)",
			TO: 						"a",
			NIGHT_MODE_NOTE:            "Il LED è spento. Se desideri utilizzare questa funzione, premi il pulsante LED o clicca sul LED nell'angolo in alto a destra della pagina.",
			NOTE2:                      "Il periodo in modalità notte comincia in base all'ora di sistema del router. Verifica di avere già impostato l'orario sul router."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Nessun certificato corrente, utilizza <b>Genera</b> per generarne uno prima di abilitare il server VPN.",
			NO_CERT_NOTE2: 				"Nessun certificato corrente, utilizza <b>Genera</b> per generarne uno prima di esportare la configurazione.",
			ENABLE_VPN_SERVER: 			"Abilita server VPN",
			SERVICE_TYPE: 				"Tipo di servizio",
			SERVICE_PORT: 				"Porta servizio",
			VPN_SUBNET: 				"Subnet/Netmask VPN",
			CLIENTS_ACCESS: 			"Accesso client",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Solo rete domestica",
			INTERNET_HOME: 				"Internet e rete domestica",
			CERT_STR: 					"Nessun certificato corrente; clicca OK per generarne uno e salvare la configurazione.",
			CERT_STR2: 					"Nessun certificato corrente; clicca OK per generarne uno ed esportare la configurazione.",
			CONF_FILE: 					"File di configurazione", 
			EXPORT_CONF_FILE: 			"Esporta la configurazione.",
			EXPORT: 					"Esporta",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Indirizzo IP client",
			ACCOUNT_USERNAME: 			"Username",
			ACCOUNT_PASSWORD: 			"Password",
			CLIENT_IP_NOTE: 			"(Fino a 10 client)",
			SAME_SUBNET_NOTE: 			"L'indirizzo IP client e l'indirizzo IP LAN non possono essere nella stessa subnet. <br/>Inseriscine un altro.",
			CONFLICT_WITH_DHCP: 		"L'indirizzo IP client è in conflitto con il pool di indirizzi IP DHCP. <br/>Ripeti l'inserimento.",
			CONFLICT_WITH_RESERVED: 	"L'indirizzo IP client è in conflitto con l'indirizzo IP riservato. <br/>Ripeti l'inserimento.",
			CONFLICT_WITH_OPENVPN: 		"L'indirizzo IP client e l'indirizzo IP OpenVPN non possono essere nella stessa subnet. <br/>Ripeti l'inserimento.",
			SAME_SUBNET_NOTE2: 			"Subnet/Netmask VPN e l'indirizzo IP LAN non possono essere nella stessa subnet. <br/>Inseriscine un altro.",
			CONFLICT_WITH_DHCP2: 		"Subnet/Netmask VPN è in conflitto con il pool di indirizzi IP DHCP. <br/>Ripeti l'inserimento.",
			CONFLICT_WITH_RESERVED2: 	"Subnet/Netmask VPN è in conflitto con l'indirizzo IP riservato. <br/>Ripeti l'inserimento.",
			CONFLICT_WITH_PPTPVPN: 		"Subnet/Netmask VPN e l'indirizzo IP VPN PPTP non possono essere nella stessa subnet. <br/>Ripeti l'inserimento.",
			LAN_CONFLICT_WITH_OPENVPN: 	"L'indirizzo IP LAN e l'indirizzo IP OPENVPN non possono essere nella stessa subnet. <br/>Ripeti l'inserimento.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"L'indirizzo IP LAN e l'indirizzo IP VPN PPTP non possono essere nella stessa subnet. <br/>Ripeti l'inserimento.",
			VPN_MASK_ERROR: 			"La netmask non può essere maggiore di 255.255.255.248. <br/>Ripeti l'inserimento.",
			ACCOUNT_LIST: 				"Elenco account (fino a 16 utenti)",
			ADVANCED_SETTING: 			"Avanzate",
			ALLOW_SAMBA: 				"Consenti accesso Samba (risorsa di rete)",
			ALLOW_NETBIOS: 				"Consenti passthrough NetBIOS",
			ALLOW_UNENCRYPTED_CONN: 	"Consenti connessioni non crittografate",
			USERNAME_CONFLICT: 			"Questo nome utente esiste già. Inseriscine un altro.",
				
			NOTICE_VS_CONFLICT:			"In conflitto con la porta esterna del server virtuale. Inserisci un'altra porta.",
			NOTICE_PT_CONFLICT:			"In conflitto con la porta esterna di port triggering. Inserisci un'altra porta.",
			NOTICE_VS_MODIFY:			"In conflitto con la porta esterna del server virtuale (1723). Accedi alla pagina <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Server virtuali</a> e modifica la porta esterna del server virtuale.",
			NOTICE_PT_MODIFY:			"In conflitto con la porta esterna di port triggering (1723). Accedi alla pagina <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Port triggering</a> e modifica la porta esterna di port triggering.",
			
			GENERATE_CERT: 				"Certificato",
			GENERATE_NEW_CERT: 			"Genera il certificato.",
			GENERATE: 					"Genera",
			GENERATE_TIPS: 				"Generazione certificato...<br/>Occorre qualche minuto, attendi.",
			CERT_SUCCESS: 				"Eseguito correttamente",
			CERT_FAIL: 					"Operazione non riuscita, riprova.",
			
			VPN_CONNECTIONS: 			"Connessioni VPN",
			OPEN_VPN_CONNECTIONS: 		"Connessione OpenVPN",
			PPTP_VPN_CONNECTIONS: 		"Connessione VPN PPTP",
			USER: 						"Utente",
			REMOTE_IP: 					"IP remoto",
			ASSIGNED_IP: 				"IP assegnato"
		}
	};
})(jQuery);
