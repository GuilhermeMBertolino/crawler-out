(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			FORGET_PASSWORD: 			"¿Olvidó la contraseña?",
			LOGIN: 						"Iniciar sesión",
			IMPORTANT_UPDATE_INFO: 		"Para evitar el conflicto con el dispositivo principal, la dirección IP de su router ha sido actualizado a la",
			CONTINUE: 					"Continuar",

			IMPORTANT_NOTICE: 			"Aviso importante",
			OR: 						", ¿Está seguro de que quiere continuar visitando?",
			END: 						" ",
			END2: 						" ",

			FORGET_PASSWORD_INFO_0: 	"Pulse el botón de Reset durante 10 segundos para restaurar los valores de fábrica del router.",
			FORGET_PASSWORD_INFO_1: 	"Si la función Recordar Contraseña está activada, se le enviará un código de verificación a la dirección indicada para resetear el usuario y contraseña.",
			FORGET_PASSWORD_SEND_FAILED:"Fallo al enviar el código. Por favor, compruebe su conexión a Internet.",

			VERIFICATION_CODE: 			"Código de verificacón",

			RECEIVE_CODE: 				"Enviar código",

			CONFIRM: 					"Confirmar",

			SEC: 						" ",

			USER_CONFLICT: 				"Conflicto al iniciar sesión!",
			FIRST_TIME: 				"Bienvenido a Archer AD7200, diseñado por TP-LINK en China. Para empezar, cree una contraseña  para gestionar el dispositivo.",
			
			USER_CONFLICT_INFO: 		"El usuario %USER% con el cliente %HOST% (%IP%/%MAC%) está actualmente conectado al router.",
			USER_CONFLICT_INFO_1: 		"El usuario %USER% (%MAC%) está actualmente logueado en el router. No puede acceder al mismo tiempo. Por favor inténtelo de nuevo más tarde.",
			USER_CONFLICT_INFO_2: 		"El usuario %USER% (%IP%) está actualmente conectado al router.",
			
			LOGIN_FAILED: 				"¡Fallo al iniciar sesión!",
			LOGIN_FAILED_COUNT: 		"El inicio de sesión falló %num1 veces y aún le quedan %num2 más.",
			NO_COOKIE: 					"Para iniciar sesión debe tener las cookies activadas.", 

			FORGET_PASSWORD_NOTE: 		"Si no ha configurado la función Recordar Contraseña, puede pulsar el botón de Reset durante 10 segundos para restaurar los valores de fábrica del router."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Actualizar ahora",
			REMIND: 						"Recordármelo más tarde",
			NOTICE:    						"Hay un nuevo firmware disponible para el router %PRODUCT%.",
			NEVER: 							"Ignorar esta versión"
			
		},

		WAN_ERROR: {
			TITLE: 							"¡Error de conexión de WAN!",
			STATUS: 						"Estado",
			INFO: 							"Información",
			SETUP: 							"Configure una conexión a Internet",
			NEVER: 							"No volver a mostrar este mensaje"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Versión de Firmware",
			HARDWARE_VERSION: 				"Versión de Hardware",
			HELP_SUPPORT: 					"Soporte",
			FAQ: 							"FAQ",
			CONFIRM_REBOOT: 				"¿Está seguro que desea reiniciar el router?",
			CONFIRM_LOGOUT: 				"¿Está seguro de que quiere salir?",
			UPGRADE_ALERT_1: 				"El firmware actual no admite el servicio en la nube de TP-LINK. Se recomienda encarecidamente descargar el firmware más reciente en www.tp-link y actualizarlo.",
			UPGRADE_ALERT_2: 				"El firmware actual no admite el servicio en la nube de TP-LINK. Se recomienda encarecidamente actualizar el firmware. Para ello, haga clic en el icono Actualizar en la parte superior derecha de la pantalla.",
			REBOOTING: 						"Reiniciando.",

			MODE_SWITCH: 					"Modo Switch",
			ACCESS_POINT: 					"Punto de Acceso",
			ACCESS_POINT_TIPS: 				"Para transformar redes cableadas en inalámbricas",
			ROUTER: 						"Router ",
			ROUTER_TIPS: 					"Para permitir a multiples dispositivos conectar cableada o inalámbricamente",
			REPEATER: 						"Repetidor ",
			REPEATER_TIPS: 					"Para extender la cobertura de la señal de tu red inalámbrica",
			MODE_REBOOT_TIP: 				"La Modificación del Modo se dará lugar en el reinicio del dispositivo, ¿Está seguro de que quiere continuar?",
			MODE_FAIL_TIP: 					"Modo Switch falló. Por favor, inténtelo más tarde o reinie su router."
		},

		NAV: {
			QUICK_SETUP: 				"Configuración rápida",
			BASIC: 						"Básico",
			ADVANCED: 					"Avanzado"
		},

		CONTROL: {
			MODE: 						"Modo",
			LOGIN: 						"Iniciar sesión",
			LED:                        "LED",
			LED_ON:                     "LED activado",
			LED_OFF:                    "LED desactivado",			
			LED_DISABLED:               "No se puede cambiar el estado del LED durante el periodo del modo nocturno",			
			LOGOUT: 					"Salir",
			UPDATE: 					"Actualizar",
			REBOOT: 					"Reiniciar"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albania",
			ALGERIA: 					"Algeria",
			AMERICAN_SAMOA: 			"Samoa Americana",
			ARGENTINA: 					"Argentina",
			ARMENIA: 					"Armenia",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australia",
			AUSTRIA: 					"Austria",
			AZERBAIJAN: 				"Azerbaijan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahrein",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbados",
			BELARUS: 					"Bielorrusia",
			BELGIUM: 					"Bélgica",
			BELIZE: 					"Bélice",
			BERUMUDA: 					"Bermudas",
			BOLIVIA: 					"Bolivia",
			BOSNIA_HERZEGOWINA: 		"Bosnia y Herzegovina",
			BRAZIL: 					"Brasil",
			BRUNEI_DARUSSALAM: 			"Brunéi Darussalam",
			BULGARIA: 					"Bulgaria",
			CAMBODIA: 					"Camboya",
			CANADA: 					"Canadá",
			CAYMAN_ISLANDS: 			"Islas Caimán",
			CHILE: 						"Chile",
			CHINA: 						"República popular de China",
			COLOMBIA: 					"Colombia",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Croacia",
			CYPRUS: 					"Chipre",
			CZECH_REPUBLIC: 			"República Checa",
			DENMARK: 					"Dinamarca",
			DOMINICAN_REPUBLIC: 		"República Dominicana",
			ECUADOR: 					"Ecuador",
			EGYPT: 						"Egipto",
			EL_SALVADOR: 				"El Salvador",
			ESTONIA: 					"Estonia",
			ETHIOPIA: 					"Etiopía",
			FAEROE_ISLANDS: 			"Islas Feroe",
			FINLAND: 					"Finlandia",
			FRANCE: 					"Francia",
			FRENCH_GUIANA: 				"Guinea Francesa",
			FRENCH_POLYNESIA: 			"Polinesia Francesa",
			GEORGIA: 					"Georgia",
			GERMANY: 					"Alemania",
			GREECE: 					"Grecia",
			GREENLAND: 					"Groenlandia",
			GRENADA: 					"Granada",
			GUADELOUPE: 				"Guadalupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haití",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong S.A.R., P.R.C.",
			HUNGARY: 					"Hungría",
			ICELAND: 					"Islandia",
			INDIA: 						"India",
			INDONESIA: 					"Indonesia",
			IRAN: 						"Irán",
			IRAQ: 						"Irak",
			IRELAND: 					"Irlanda",
			ISRAEL: 					"Israel",
			ITALY: 						"Italia",
			JAMAICA: 					"Jamaica",

			JAPAN: 						"Japón",
			JAPAN_1: 					"Japón 1",
			JAPAN_2: 					"Japón 2",
			JAPAN_3: 					"Japón 3",
			JAPAN_4: 					"Japón 4",
			JAPAN_5: 					"Japón 5",
			JAPAN_6: 					"Japón 6",

			JORDAN: 					"Jordania",
			KAZAKHSTAN: 				"Kazajstán",
			KENYA: 						"Kenia",

			NORTH_KOREA: 				"Corea del Norte",
			KOREA_REPUBLIC: 			"República de Corea",
			KOREA_REPUBLIC_3: 			"República de Corea 3",

			KUWAIT: 					"Kuwait",
			LATVIA: 					"Letonia",
			LEBANON: 					"Líbano",
			LIBYA: 						"Libia",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Lituania",
			LUXEMBOURG: 				"Luxemburgo",
			MACAU: 						"Macao SAR",
			MACEDONIA: 					"Antigua República Yugoslava de Macedonia",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malasia",
			MALDIVES: 					"Maldivas",
			MALTA: 						"Malta",
			MARTHINIQUE: 				"Martinica",
			MAURITIUS: 					"Islas Mauricio",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"México",
			MONACO: 					"Principado de Mónaco",
			MONGOLIA: 					"Mongolia",
			MOROCCO: 					"Marruecos",
			NEPAL: 						"Nepal",
			NETHERLANDS: 				"Países Bajos",
			NETHERLANDS_ANTILLES: 		"Antillas Holandesas",
			
			NEW_ZEALAND: 				"Nueva Zelanda",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Noruega",
			NORTHERN_MARIANA_ISLANDS: 	"Islas Marianas del Norte",
			OMAN: 						"Omán",
			PAKISTAN: 					"República Islámica de Pakistán ",
			PANAMA: 					"Panamá",
			PAPUA_NEW_GUINEA: 			"Papúa Nueva Guinea",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Perú",
			PHILIPPINES: 				"República de Filipinas",
			POLAND: 					"Polonia",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Puerto Rico",
			QATAR: 						"Catar",
			REUNION: 					"Reunión",
			ROMANIA: 					"Rumanía",
			RUSSIA: 					"Russia",
			RWANDA: 					"Ruanda",
			SAMOA: 						"Samoa ",
			SAUDI_ARABIA: 				"Arabia Saudí",
			SINGAPORE: 					"Singapur",
			SLOVAK_REPUBLIC: 			"República de Eslovaquia",
			SLOVENIA: 					"Eslovenia",
			SOUTH_AFRICA: 				"Sudáfrica",
			SPAIN: 						"España",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Suecia",
			SWITZERLAND: 				"Suiza",
			SYRIA: 						"Siria",
			TAIWAN: 					"Taiwán",
			TANZANIA: 					"Tanzania",
			THAILAND: 					"Tailandia",
			TRINIDAD_TOBAGO: 			"Trinidad y Tobago ",
			TUNISIA: 					"Túnez",
			TURKEY: 					"Turquía",
			UGANDA: 					"Uganda",
			UKRAINE: 					"Ucrania",
			UNITED_ARAB_EMIRATES: 		"Emiratos Árabes Unidos",
			UNITED_KINGDOM: 			"Reino Unido",
			UNITED_STATES: 				"Estados Unidos",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Uzbekistán",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Vietnam",
			VIRGIN_ISLANDS: 			"Islas Virgina",
			YEMEN: 						"Yemen",
			ZIMBABWE: 					"Zimbaue"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Islas Midway, Samoa",
			HAWAII: 					"(GMT-10:00) Hawaii",
			ALASKA: 					"(GMT-09:00) Alaska",
			PACIFIC_TIME: 				"(GMT-08:00) Hora del Pacífico",
			MOUNTAIN_TIME: 				"(GMT-07:00) Hora de Montaña (EE.UU. Canadá)",
			CENTRAL_TIME: 				"(GMT-06:00) Hora del Centro (EE.UU Canadá)",
			EASTERN_TIME: 				"(GMT-05:00) Hora del Este (EE.UU. Canadá)",
			CARACAS:					"(GMT-04:30) Caracas",
			ATLANTIC_TIME: 				"(GMT-04:00) Tiempo Atlántico (Canadá)",
			NEWFOUNDLAND: 				"(GMT-03:30) Isla de Terranova",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) Brasilia, Buenos Aires",
			MID_ATLANTIC: 				"(GMT-02:00) Atlántico Medio",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Azores, Cabo Verde",
			GREENWICH_MEAN_TIME: 		"(GMT) Hora principal de Greenwich, Dublín, Londres",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlín, Stocolmo, Roma, Berna, Bruselas",
			ATHENS_HELSINKI: 			"(GMT+02:00) Atenas, Helsinki, Europa del Este, Israel",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Baghdad, Kuwait, Nairobi, Riyadh, Moscú",

			TEHERAN: 					"(GMT+03:30) Teherán",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Mascate, Kazán, Volgogrado",

			KABUL: 						"(GMT+04:30) Kabul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinburgo",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Calcuta, Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandú",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Almatý, Daca",
			RANGOON: 					"(GMT+06:30) Rangún",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Yakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Beijing, Hong Kong, Perth, Singapur",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seúl, Yakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaida",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Islas Solomín, Nueva Caledonia",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nukualofa"
		},

		APPLIST:{
			APP:						"Aplicación",
			GAME:						"JUEGOS",
			QQ:							"QQ",
			MSN:						"Msn",
			LINE:						"Line",
			Skype:                      "Skypw",
			PPStream: 					"PPStream",
			SIP:  						"SIP",
			PPTC: 						"PPTC", 
			H323: 						"H323",
			HTTPFD: 					"HTPFD",
			PPTP: 						"PPTP",
			L2TP:  						"L2TP",
			IPSec:                      "IPSec",
			IMAP: 						"IMAP",
			xl_others:  				"xl_others",
			Vonage:  					"Vonage",
			netTalk:  					"netTalk",
			iTalkBB: 					"iTaklBB",
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
			DAY: 						"Día",

			MONDAY: 					"Lunes",
			TUESDAY: 					"Martes",
			WEDNESDAY: 					"Miércoles",
			THURSDAY: 					"Jueves",
			FRIDAY: 					"Viernes",
			SATURDAY: 					"Sábado",
			SUNDAY: 					"Domingo",
			
			MON: 						"Lun.",
			TUES: 						"Mar.",
			WED: 						"Mie.",
			THUR: 						"Jue.",
			FRI: 						"Vie.",
			SAT: 						"Sáb.",
			SUN: 						"Dom.",

			JAN: 						"Ene.",
			FEB: 						"Feb.",
			MAR: 						"Mar.",
			APR: 						"Abr.",
			MAY: 						"May.",
			JUN: 						"Jun.",
			JUL: 						"Jul.",
			AUG: 						"Ago.",
			SEP: 						"Sep.",
			OCT: 						"Oct.",
			NOV: 						"Nov.",
			DEC: 						"Dic."

		},

		HOUR: {
			AM_1: 						"1a.m.",
			AM_2: 						"2a.m.",
			AM_3: 						"3a.m.",
			AM_4: 						"4a.m.",
			AM_5: 						"5a.m.",
			AM_6: 						"6a.m.",
			AM_7: 						"7a.m.",
			AM_8: 						"8a.m.",
			AM_9: 						"9a.m.",
			AM_10: 						"10a.m.",
			AM_11: 						"11a.m.",
			AM_12: 						"12a.m.",
			PM_1: 						"1p.m.",
			PM_2: 						"2p.m.",
			PM_3: 						"3p.m.",
			PM_4: 						"4p.m.",
			PM_5: 						"5p.m.",
			PM_6: 						"6p.m.",
			PM_7: 						"7p.m.",
			PM_8: 						"8p.m.",
			PM_9: 						"9p.m.",
			PM_10: 						"10p.m.",
			PM_11: 						"11p.m.",
			PM_12: 						"12p.m."
		},

		ORDER: {
			"1ST": 						"Primero",
			"2ND": 						"2º",
			"3RD": 						"3º",
			"4TH": 						"4º",
			"5TH": 						"Último",
			"1ST_": 					"1º",

			TH: 						" "
		},

		GRID: {
			CLIENT_NUMBER: 				"Número de clientes",

			ID: 						"ID",
			MODIFY: 					"Modificar",
			STATUS: 					"Estado",
			ENABLE: 					"Activar",

			OPERATION: 					"Operación",
			CHOOSE: 					"Elegir",
			DESCRIPTION: 				"Descripción",
			

			AUTO_REFRESH: 				"Auto actualización",
			REFRESH: 					"Actualizar",
			NUMBER: 					"Número",
			ENABLED: 					"Habilitado",
			DISABLED: 					"Deshabilitado",
			ACTIVE: 					"Activar",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Añadir",
			CHOOSE: 					"Elegir",
			EDIT: 						"Editar",
			DELETE: 					"Eliminar",
			DELETE_ALL: 				"Borrar todo",
			REMOVE: 					"Quitar",
			RESET: 						"Reiniciar",
			RESET_ALL: 					"Resetear todo",
			DETECT: 					"Detectar",
			ENABLE: 					"Activar",
			DISABLE: 					"Desactivar",
			PAUSE:						"Pausa",
			RESUME:						"Resumen",
			
			REFRESH: 					"Actualizar",
			SEARCH: 					"Buscar…",
			BROWSE: 					"Examinar",

			SAVE: 						"Guardar",
			BACK: 						"Atrás",

			PREV: 						"Anterior",
			NEXT: 						"Siguiente",
			FINISH: 					"Finalizar",
			
			ON: 						"On",
			OFF: 						"Off",
			LOW: 						"Bajo",
			MIDDLE: 					"Medio",
			HIGH: 						"Alto",
			
			OK: 						"Aceptar",
			CANCEL: 					"Cancelar",

			YES: 						"Sí",
			NO: 						"No",
			
			CONNECTED: 					"Conectado",
			CONNECTING: 				"Conectando",
			DISCONNECTING: 				"Desconectando",
			DISCONNECTED: 				"No Conectado",

			PASSWORD_HINT: 				"Contraseña",
			FILEBUTTONTEXT: 			"Examinar",
			FILEBLANKTEXT: 				"Por favor, seleccione un archivo.",
			NOSELECTEDTEXT: 			"Seleccionar opciones.",

			ADD_A_NEW_KEYWORD: 			"Añadir una nueva palabra clave",

			SUCCESSED: 					"¡Correcto!",
			FORM_SAVED: 				"Guardado",
			FORM_FAILED: 				"Fallo",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"Guardado",
			GRID_FAILED: 				"Fallo",
			GRID_NONE_SELECT: 			"Por favor, seleccione al menos una entrada.",
			GRID_DELETE_COMFIRM: 		"¿Está seguro de que quiere borrar estas entradas?",
			GRID_DELETE_ALL_COMFIRM: 	"¿Está seguro de que quiere borrar todas las entradas?",
			GRID_MAX_RULES: 			"Número máximo de entradas superado.",
			KEYWORD_MAX_OVERFLOW: 		"El número de caracteres en la contraseña ha superado el límite.",

			NOTE: 						"Nota:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Formato no válido.",
			BLANKTEXT: 					"Campo requerido.",

			EMAIL: 						"Dirección de e-mail no válida.",
			NUMBER: 					"Formato no válido.",

			NUMBER_MIN: 				"Parámetro no válido. Por favor, introduzca un valor superior a %min.",
			NUMBER_MAX: 				"Parámetro no válido. Por favor, introduzca un valor inferior a %max.",

			NUMBER_MIN_MAX: 			"We type 0 and the system show as an error message showing the correct value is %min to %max.",
			HEX: 						"This field should be a hexadecimal number.",

			IP: 						"Formato no válido.",

			IP_NO_ALL_ZERO:				"The address should not be 0.0.0.0.",
			IP_NO_LOOP:					"The address should not be loopback IP.",
			IP_NO_D_TYPE:				"The address should not be a class D IP.",
			IP_NO_E_TYPE:				"The address should not be a class D IP.",
			IP_NO_ALL_ONE:				"The address should not be 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"The address should not start with 255.",
			IP_NO_FIRST_ZERO:			"The address should not start with 0.",
			MASK_NO_ALL_ONE:			"Mask can not be 255.255.255.255.",

			IPV6: 						"Formato no válido.",
			IPV6_NOT_GLOBAL:			"Formato no válido.",
			IPV6_NOT_PREFIX:			"Formato no válido.",
			IP_DOMAIN: 					"Formato no válido.",
			IPV6_DOMAIN: 				"Formato no válido.",
			PPTP_INVALID_IP:			"Dirección IP no válida.",
			MAC: 						"Formato no válido.",
			MULTI_MAC:					"Formato no válido.",
			MAC_INVALID_BROADCAST:		"La MAC no debe ser la dirección de broadcast.",
			MAC_INVALID_MULTICAST:		"La MAC no debe ser la dirección de multicast.",
			DATE: 						"Formato no válido.",
			DATE_INVALID: 				"Por favor introduzca una fecha entre 01/01/1970 y 12/31/2030.",
			MASK: 						"Formato no válido.",
			DOMAIN: 					"Formato no válido.",
			STRING_DOMAIN:              "Formato no válido.",
			USER: 						"Formato no válido.",
			NOTE: 						"Formato no válido.",
			PWD: 						"Formato no válido.",
			SSID: 						"Formato no válido.",
			NAME:						"Formato no válido.",
			ASCII_VISIBLE:				"Formato no válido.",
			STRING_VISIBLE:				"Formato no válido.",
			STRING_VISIBLE_NO_COMMA:    "Formato no válido.",
			STRING_VISIBLE_ALLOW_BLANK: "Formato no válido.",
			VPN_NAME_PWD: 				"Introduzca entre 1 y 15 caracteres alfanuméricos, números, - y _."
		},


		ERROR: {			
			"00000001":					"Tipo de archivo no válido.",
			"00000002":					"Error en la suma de comprobación.",
			"00000003":					"El archivo es demasiado grande.",
			"00000004":					"Error de subida.",
			"00000005":					"Error al reiniciar.",
			"00000006":					"Error desconocido.",
			"00000007":					"El parámetro ya existe. Por favor, introduzca uno distinto.",

			"00000009":					"Puerto no válido.",
			"00000010":					"El puerto debe ser un número.",

			"00000011":					"El nombre de usuario debe ser el mismo que escribió anteriormente.",
			"00000012": 				"El nombre de usuario debe empezar con una letra.",

			"00000021":					"Formato no válido.",

			"00000032": 				"El valor debe ser inferior al Bajo.",
			"00000033": 				"El valor debe ser inferior al Medio y Bajo.",
			"00000034": 				"Valor inválido, por favor introduzca un número entre 50 y 7200.",

			"00000039": 				"Por favor, use el valor por defecto 0 o introduzca un valor entre 20 y 86400.",
			"00000040": 				"Se requieren las direcciones SSID y MAC.",

			"00000042": 				"Por favor, use el valor por defecto 80 o introduzca un valor entre 1024 y 65535.",

			"00000045": 				"La puerta de enlace predeterminada y dirección IP LAN debe encontrarse en la misma subred. Por favor introdúzcala de nuevo.",

			"00000046": 				"La dirección IP y dirección MAC no pueden ser INVÁLIDAS. Por favor inténtelo de nuevo.",
			"00000047": 				"El conjunto de direcciones IP y la dirección IP LAN deben estar en la misma subred. Por favor, inténtelo de nuevo.",

			
			"00000049":					"La red de destino no es válida.",

			"00000050": 				"Dirección IP del servidor DNS incorrecto. Por favor, escriba otra dirección IP.",
			"00000051": 				"La dirección MAC ya existe. Por favro, introduzca otra.",
			"00000052": 				"La dirección IP ya existe. Por favor, introdúzca otra difererente.",

			"00000053": 				"La dirección de comienzo no debe ser mayor que la dirección de final. Por favor, inténtelo de nuevo.",

			"00000054": 				"El conjunto de direcciones IP y la dirección IP LAN deben estar en la misma subred. Por favor, inténtelo de nuevo.",

			"00000055": 				"La IP no puede ser igual que la dirección LAN.",

			"00000056": 				"La dirección IP remota y la actual dirección IP LAN no deben estar en la misma subred. Por favor, introduzca una distinta.",

			"00000057": 				"Contraseña PSK no válida. Por favor, introdúzcala de nuevo.",
			"00000058": 				"Contraseña WEP no válida. Por favor, introdúzcala de nuevo.",

			"00000059": 				"Dirección IP y Submáscara de Red inválidas, por favor introduzca una válida.",

			"00000060": 				"Las direcciones IP WAL e IP LAN no deben estar en la misma subred. Por favor, introduzca otros.",

			"00000061": 				"La hora de comienzo debe ser inferior que la hora de fin.",

			"00000062": 				"Campo requerido.",
			"00000063": 				"Campo requerido.",

			"00000064": 				"No se puede bloquear la dirección MAC del equipo.",
			"00000065": 				"El parámetro está en conflicto con los parámetros existentes. Por favor, compruébelo.",
			
			"00000066": 				"La contraseña debe tener entre 8 y 63 caracteres o 64 dígitos hexadecimales.",
			"00000067": 				"La contraseña debe tener 10 dígitos hexadecimales.",
			"00000068": 				"La contraseña debe tener 5 caracteres ASCII.",
			"00000069": 				"La contraseña debe tener  26 dígitos hexadecimales.",
			"00000070": 				"La contraseña debe tener  13 caracteres ASCII.",
			"00000071": 				"La contraseña debe tener  32 dígitos hexadecimales.",
			"00000072": 				"La contraseña debe tener  16 caracteres ASCII.",
			"00000073": 				"La contraseña debe tener menos de 64 caracteres.",

			"00000074": 				"Tipo de archivo no válido.",

			"00000075": 				"El PIN debe tener 8 dígitos.",

			"00000076": 				"La entrada está en conflicto con los parámetros existentes. Por favro, compruebe el puerto y el protocolo habilitados.",
			"00000077": 				"La dirección IP no puede ser igual que la dirección IP LAN.",
			"00000078": 				"La dirección IP del equipo no puede ser la misma que la dirección IP LAN.",

			"00000080": 				"Las contraseñas no coinciden. Por favor, vuelva a intentarlo.",

			"00000083": 				"La puerta de enlace no puede ser la misma que la IP.",
			"00000084": 				"El DNS primario no puede ser el mismo que la IP.",
			"00000085": 				"El DNS secundario no puede ser el mismo que la IP.",
			"00000086": 				"El DNS primario no puede ser el mismo que el DNS secundario.",

			"00000088": 				"Esta operación no está permitida para la gestión remota.",
			"00000089": 				"Ha excedido los %num intentos, por favor inténtelo de nuevo en dos horas.",

			"00000090": 				"La dirección de destino no puede ser la IP LAN.",
			"00000091": 				"La dirección de destino no puede ser la IP WAN.",

			"00000092": 				"La dirección IP y la dirección IP WAN no pueden estar en la misma subred. <br/>Por favor, introdúzcala de nuevo.",
			"00000093": 				"Las direcciones IP WAL e IP LAN no deben estar en la misma subred. Por favor, introduzca otros.",

			"00000094": 				"Los Ids de VLAN no pueden ser iguales.",
			"00000095": 				"Al menos se requiere un puerto de Internet",

			"00000096": 				"La contraseña ya existe.",

			"00000097": 				"Las configuraciones realizadas en las bandas de frecuencia de 2.4GHz no tendrán efecto hasta que que le botón Wi-Fi esté encendido.",
			"00000098": 				"Las configuraciones realizadas en las bandas de frecuencia de 5GHz no tendrán efecto hasta que que le botón Wi-Fi esté encendido.",
			"00000099": 				"Las configuraciones realizadas en las bandas de frecuencia de 2.4GHz y 5GHz no tomarán efecto hasta que pulse el botón de WiFi.",

			"00000100": 				"La configuración de la red de 5GHz no está disponible debido a las restricciones del pais.",
			"00002100": 				"La red de 60GHz no está disponible debido a restricciones en su región/país.",

			"00000101": 				"Su función inalámbrica está desactivada. Si quiere usar esta función, por favor pulse en botón WiFi.",
			"00000102": 				"Su función inalámbrica está desactivada. Si quiere usar esta función, por favor pulse en botón WiFi.",
			"00002102": 				"Su función inalámbrica está desactivada. Si quiere usar esta función, por favor pulse en botón WiFi.",

			"00000103": 				"Su función inalámbrica está desactivada. Si quiere usar esta función, por favor pulse en botón WiFi.",
			"00000104": 				"Su función inalámbrica está desactivada.",

			"00000105": 				"QoS e IPTV no pueden estar activos al mismo tiempo.",

			"00000106": 				"Las direcciones IP no puede ser igual que la dirección IP LAN.",
			
			"00000107": 				"El destino ya existe.",

			"00000110": 				"La dirección IP y la dirección IP LAN deben estar en la misma subred.",
			
			"00000111": 				"QoS y <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> no pueden estar activados al mismo tiempo.",
			"00000112": 				"La función WDS puede funcionar en cualquiera de las bandas de 4GHz o 5GHz.",
			"00000113": 				"WDS y Red de Invitados no pueden estar activados al mismo tiempo.",
			"00000114": 				"Las estadísticas de tráfico y <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> no pueden estar activadas al mismo tiempo.",

			"00000117": 				"El nombre de dominio ya existe.",
			"00000118": 				"El número de nombres de dominio ha superado el límite.",
			"00000119":					"Si la opción NAT Boost está habilitada, <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> se <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">deshabilitará automáticamente</a>.",

			"00000120": 				"La contraseña debe tener 5 o 13 caracteres ASCII.",
			"00000121": 				"La contraseña debe tener 10 0 26 dígitos hexadecimales.",
			"00000122": 				"El nombre de usuario o contraseña está vacío, ¿está seguro de que quiere continuar?",
			"00000123": 				"Guardando… Por favor, no actúe durante el proces.",
			"00000124": 				"El PIN del router está bloqueado debido a que conexiones han utilizado repetidamente un PIN erróneo. Por favor, genere uno nuevo.",

			"00000125": 				"El número de reglas QoS ha excedido el límite.",
			"00000126": 				"El tamaño del fichero ha excedido el límite.",
			"00000127": 				"El contenido del fichero es incorrecto.",
			"00000128": 				"Por favor, seleccione al menos una aplicación.",
			"00000129": 				"Por favor, seleccione al menos un puerto físico.",
			"00000130":					"Tu función WPS está desactivada.",
			"00000131": 				"El servidor NTP no puede hacer direcciones loopback.",
			"00000132": 				"El modo switch ha fallado. Por favor, inténtelo más tarde o reinicie su router.",
			"00000133": 				"Dirección IP del Host DMZ inválida. Por favor, introdúzaca una válida.",
			"00000134":  				"IP interna inválida. Por favor, introdúzca una válida.",
			"00000135": 				"Error en archivo de Firmware.",
			"00000136": 				"Error en archivo de Backup.",
			"00000137": 				"Dirección IP inválida, por favor introduzca una válida.",
			"00000139": 				"Parámetros de recuperación de contraseña incorrectos.",
			"00000140": 				"Código incorrecto.",
			"00000141": 				"La recuperación de la contraseña está deshabilitada.",
			"00000142": 				"Fallo al enviar el código. Por favor compruebe su conexión a Internet.",
			"00000143": 				"Dirección de email inválida.",
			"00000144": 				"Mensaje de email inválido.",
			"00000145": 				"No se pudo encontrar el host.",
			"00000146": 				"Fallo en la autenticación.",
			"00000147": 				"El puerto debería estar entre el 1 y 65535.",
			"00000148": 				"En un intervalo de puertos, el número de puerto inicial debe ser inferior al número de puerto final. Vuelva a intentarlo.",
			"00000149": 				"El número de puerto se superpone. Vuelva a intentarlo.",
			
			"00000150": 				"No existe la ruta.",
			"00000151": 				"No se ha establecido la ruta de asignación.",
			"00000152": 				"Hay algún problema con esta ruta.",
			"00000153": 				"No se ha encontrado el volumen.",
			"00000154": 				"No hay ningún dispositivo USB.",
			
			"00000155": 				"La dirección IP del cliente PPTP VPN y la dirección IP de la LAN no pueden estar en la misma subred.<br/>Vuelva a intentarlo.",
			"00000156": 				"La dirección IP del cliente PPTP VPN y la dirección IP del cliente OpenVPN no pueden estar en la misma subred.<br/>Vuelva a intentarlo.",

			"00000222":  				"Máximo de entradas.",
			"00000231": 				"Entrada duplicada.",
			"00000232": 				"URL no válida.",
			"00000233":					"Por favor seleccione al menos un día.",

			"00000301": 				"Entrada máxima de la carpeta a compartir.",
			"00000302": 				"Entrada máxima de la carpeta a compartir en un volumen.",
			"00000303": 				"Ruta de la carpeta a compartir duplicada.",
			"00000304": 				"Nombre de la carpeta a compartir duplicado.",

			"00001000":					"La operación de actualizar está realizándose, por favor espere.",
			"00001001": 				"La función WDS puede funcionar en las bandas de 2.4GHz o 5GHz.",
			"00001002":					"Código incorrecto.",

			"00001123": 				"El elemento de la regla de aplicación de entrada no es válido, por favor escribe al menos un elemento de la regla.",
			"00001124": 				"El elemento de la regla de puerto físico de entrada no es válido, por favor escribe al menos un elemento de la regla.",

            "00002000": 				"Este elemento está en conflicto con el enrutamiento estático especificado por el ISP, ¿está seguro de que quiere continuar?",

            "00003000":                 "¡El IPv6 Pass-Through está en conflicto con IPTV! Si quiere utilizar esta función, por favor apague la configuración de IPTV.",
			"00004139": 				"No hay conexión a Internet",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Se ha agotado el tiempo de espera. Compruebe la conexión a Internet y vuelva a intentarlo más tarde.",
			"00004141": 				"Error desconocido.",
			"00004142": 				"Código de verificación incorrecto.",
			"00004143": 				"Contraseña no válida.",
			"00004144": 				"El nombre de usuario ya existe.",
			"00004145": 				"Contraseña no válida.",//new password
			"00004146": 				"No se pudo desvincular el dispositivo. Vuelva a intentarlo más tarde.",
			"00004147": 				"Este dispositivo está vinculado a otra cuenta.",
			"00004148": 				"Entrada no válida.",
			"00004149": 				"Este nombre de dominio ya existe.",
			"00004150": 				"No se pudo descargar el firmware. Compruebe la conexión a Internet y vuelva a intentarlo más tarde.",
			"00004151": 				"No se pueden registrar más de 1000 nombres de dominio en la misma cuenta en la nube.",
			"00004152": 				"Este dispositivo está vinculado a otro nombre de dominio.",
			"00004153": 				"Este nombre de dominio está vinculado a otro dispositivo.",
			"00004154": 				"No hay respuesta del servidor. Vuelva a intentarlo más tarde.",
			"00004155": 				"La cuenta no existe.",
			"00004156": 				"No se pudo iniciar la aplicación en la nube. Reinicie el dispositivo y vuelva a intentarlo más tarde.",
			"00004157": 				"No se pudo establecer conexión con el servidor en la nube. Compruebe la conexión a Internet y vuelva a intentarlo más tarde.",
			"00004158": 				"El puerto WAN no está conectado.",
			"00004159": 				"No se pudo establecer la conexión a Internet. Póngase en contacto con su proveedor de servicios o vuelva a intentarlo más tarde.",
			"00004160": 				"No se pudo obtener la dirección IP del servidor DHCP. Compruebe el tipo de conexión WAN o vuelva a intentarlo más tarde.",
			"00004161": 				"Error de autenticación de PPPoE. Compruebe el nombre de usuario y contraseña.",
			"00004162": 				"No se pudo conectar con el servidor PPPoE.",
			"00004164": 				"Error de autenticación de PPTP. Compruebe el nombre de usuario y contraseña.",
			"00004165": 				"No se pudo conectar con el servidor PPTP.",
			"00004167": 				"Error de autenticación de L2TP. Compruebe el nombre de usuario y contraseña.",
			"00004168": 				"No se pudo conectar con el servidor L2TP.",
			"00004169": 				"Error desconocido. Vuelva a intentarlo más tarde.",
			"00004170": 				"El puerto WAN no está conectado.",
			"00004171": 				"No hay conexión a Internet.",
			"00004172": 				"La conexión ha fallado.",
			"00004173": 				"Nombre de usuario o contraseña incorrectos",
			"00004174": 				"Dirección de e-mail no válida.",
			"00004175": 				"Formato de nombre de usuario no válido.",
			"00004176": 				"El correo electrónico ya existe",
			"00004177": 				"No se pudo acceder a la cuenta. Actualice la página.",
			"00004178":   				"Error del sistema. Actualice la página y vuelva a intentarlo.",
			"00004179":   				"No se pudo vincular el dispositivo. Vuelva a intentarlo más tarde.",
			"00004180":   				"Se ha desvinculado el dispositivo de esta cuenta en la nube. Vuelva a iniciar sesión con su cuenta para vincular el dispositivo a su cuenta.",
			"00004181":   				"Dispositivo sin conexión. Compruebe sus ajustes de Internet.",
			"00004182":   				"No se pudo enviar el correo electrónico. Compruebe la conexión a Internet y vuelva a intentarlo.",
			"00004183":   				"Account should contain to characters. ",
			"00004184":   				"Ha introducido la contraseña de forma incorrecta 20 veces. Vuelva a intentarlo dentro de dos horas.",
			"00004185":   				"Ha obtenido el código de verificación 10 veces en una hora. Vuelva a intentarlo dentro de 24 horas.",
			"00004186":   				"No se pudo activar la cuenta. Vuelva a enviar el correo electrónico de verificación.",
			"00004187":   				"El enlace ha caducado. Vuelva a enviar el correo electrónico de verificación.",
			"00004188":   				"El enlace ha caducado. Vuelva a enviar el correo electrónico de verificación.",
			"00004189":   				"No se pudo restablecer la contraseña. Vuelva a enviar el correo electrónico de verificación.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Error de actualización del firmware.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Estado",
			NETWORK: 					"Red",
			NETWORK_MAP: 				"Mapa de red",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"Servidor DHCP",
			DYNAMIC_DNS: 				"DNS Dinámico",
			ADVANCED_ROUTING: 			"Enrutado Avanzado",

			WIRELESS: 					"Red inalámbrica",
			WIRELESS_SETTINGS: 			"Configuraciones de Red Inalámbrica",
			WDSBRIDGING: 				"Puente WDS",
			WPS: 						"WPS",
			MACFILTERING: 				"Filtrado MAC",
			WIRE_STATISTICS: 			"Estadísticas",
			
			
			GUEST_NETWORK: 				"Red de invitados",
			WIRELESS_SETTINGS: 			"Configuraciones de Red Inalámbrica",
			STORAGE_SHARING: 			"Almacenamiento compartido",
			NAT_FORWARDING: 			"NAT Forwarding",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Servidores Virtuales",
			PORT_TRIGGERING: 			"Port Triggering",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"Configuración USB",
			BASIC_SET: 					"Configuración básica",
			DISK_SET: 					"Configuración de dispositivos",
			FOLDER_SHARING: 			"Acceso compartido",
			STORAGE_SHARING: 			"Almacenamiento compartido",
			FTP_SERVER: 				"Servidor FTP",
			MEDIA_SERVER: 				"Servidor multimedia",
			PRINT_SERVER: 				"Servidor de impresión",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Descarga Offline",
			
			PARENTAL_CONTROL: 			"Controles Parentales",

			QOS:  						"QoS",
			DATABASE:  					"Base de datos",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Mapa",
			SB_MAP: 					"Mapa",
			SB_BANDWIDTH:  				"Ancho de banda",
			SB_PRIORITY: 				"Prioridad",
			SB_STATISTICS: 				"Estadísticas",

			
			SECURITY: 					"Seguridad",
			SETTINGS: 					"Configuración",
			ACCESS_CONTROL: 			"Control de acceso",
			IP_MAC_BINDING: 			"Blindaje IP&MAC",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Herramientas del Sistema",
			TIME_SETTINGS: 				"Configurarciones de la hora",
			DIAGNOSTIC: 				"Diagnósticos",
			FIRMWARE_UPGRADE: 			"Actualización de firmware",
			BACKUP_RESTORE: 			"Copia de Seguridad & Restauración",
			ADMINISTRATION: 			"Administración",
			SYSTEM_LOG: 				"Registro de Sistema",
			STATISTICS: 				"Estadísticas del tráfico",
			SYSTEM_PARAMETERS: 			"Parámetros del Sistema",
			VPN: 						"Servidor VPN",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"Conexiones VPN"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Región y Zona horaria",
			INTERNET_CONNECTION_TYPE: 	"Tipo de conexión a Internet",
			WIRELESS_SETTINGS: 			"Configuraciones Inalámbricas",
			SUMMARY: 					"Resumen",
			SETUP_COMPLETE: 			"Test de Conexión a Internet",

			EXIT: 						"Salir",
			NEXT: 						"Siguiente",
			SAVE: 						"Guardar",
			FINISH: 					"Finalizar",
			OK: 						"Aceptar",
			NONE: 						"Detección fallida.",

			REGION: 					"País",
			TIME_ZONE: 					"Zona horaria",
			NO_SELECT: 					"Seleccionar opciones.",

			AUTO_DETECT: 				"Auto Detectar",
			DYNAMIC_IP: 				"IP Dinámica",
			STATIC_IP: 					"IP Estática",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Nota: Si no está seguro de que tipo de conexión a Internet tiene, use el auto-detectar o contacte con su proveedor de servicios (ISP) para Soporte Técnico.",

			DYNAMIC_IP_INFO: 			"Si su ISP solo permite acceso a Internet a una dirección IP específica, necesitará clonar la dirección MAC de su ordenador principal. Si no está seguro, seleccione <strong>NO clonar la Dirección MAC</strong>.",
			MAC_CLONE_NO: 				"NO clonar dirección MAC",
			MAC_CLONE_YES: 				"Clonar la actual dirección MAC del ordenador",
			MAC_CLONE_NOTE: 			"Si selecciona Clonar la dirección MAC, por favor, asegúrese de que la dirección MAC del ordenador está registrada con su ISP antes de pulsar en Siguiente.",

			PPPOE_INFO: 				"Por favor, introduzca su nombre de usuario PPPoE y contraseña.",
			
			STATIC_IP_INFO: 			"Por favor, introduzca su información IP.",

			L2TP_INFO: 					"Por favor, introduzca su nombre de usuario L2TP y contraseña.",
			PPTP_INFO: 					"Por favor, introduzca su nombre de usuario PPTP y contraseña.",
			
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			SERVER_IP_ADDRESS_NAME: 	"IP del servidor VPN/Nombre de dominio",
			IP_ADDRESS: 				"Dirección IP",
			SUBNET_MASK: 				"Máscara de Subred",
			DEFAULT_GATEWAY: 			"Puerta de enlace predeterminada",
			PRIMARY_DNS: 				"DNS Primario",
			SECOND_DNS: 				"DNS Secundario",
			OPTIONAL: 					"(Opcional)",
			
			ON: 						"On",
			OFF: 						"Off",
			WIRELESS_24GHZ: 			"Wi-Fi 2.4GHz",
			WIRELESS_5GHZ: 				"Wi-Fi 5GHz",
			WIRELESS_60GHZ: 				"Wi-Fi de 60GHz",
			ENABLE_WIRELESS_RADIO: 		"Activar Señal Inalámbrica",
			NAME_SSID: 					"Nombre de Red Inalámbrica (SSID)",

			SUMMARY_INFO1: 				"Necesita reconectar sus dispositivos inalámbricos a la nueva red inalámbrica antes de pulsar en el botón Next.",
			SUMMARY_INFO2: 				"Su nombre de red inalámbrica y contraseña ha sido modificada como le indicamos a continuación",
			SUMMARY_INFO3: 				"Asegúrese de que se ha conectado a la nueva red inalámbrica.",

			WIRELESS_24GHZ_SSID: 		"Inalámbrico  2,4GHz Nombre (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Inalámbrico 2,4GHz Contraseña",
			WIRELESS_5GHZ_SSID: 		"Inalámbrico  5GHz Nombre (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Inalámbrico 5GHz Contraseña",
			WIRELESS_60GHZ_SSID: 		"SSID de Wi-Fi de 60GHz",
			WIRELESS_60GHZ_PASSWORD: 	"Contraseña de Wi-Fi de 60GHz",

			SORRY: 						"Error.",
			SUCCESS: 					"¡Correcto!",
			TEST_INTERNET_SUCCESS_INFO: "Éxito! Haga clic en Finalizar para terminar el proceso de configuración rápida.",

			TEST_INTERNET_FAILED_INFO_0:"Por favor, verifique que todos los parámetros de la Configuración Rápida son correctos e inténtelo de nuevo. Si todos los parámetros son correctos. Por favor, reinicie su módem, espere 2 minutos, y pulse en Prueba de Conexión a Internet una vez más. Si no estás utilizando un módem, contacte con su Proveedor de Servicio de Internet (ISP) para que le proporcione asistencia.",
			SUMMARY_INFO4: 				"¡Lo sentimos! Hemos detectado que no ha reconectado sus dispositivos inalámbricos a la nueva red inalámbrica. Por favor, realicelo y pulse en OK.",
                                         
			CONGRATULARIONS: 			"Enhorabuena.",
			COMPLETE_INFO_0: 			"Ha completado el proceso de configuración rápida.",
			COMPLETE_INFO_1:			"Pulse a continuación en Probar conexión a Internet, entonces pulse en Finalizar.",
			TEST_INTERNET: 				"Probar conexión a Internet",

			
			RESET_USER_TITLE: 			"Configure un nuevo nombre de usuario y contraseña",
			NEW_USERNAME: 				"Nuevo nombre de usuario",
			NEW_PASSWORD: 				"Nueva contraseña",
			CONFIRM_PASSWORD: 			"Confirmar nueva contraseña",
			CONFIRM: 					"Confirmar"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Internet Estado",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Tipo de Conexión",
			SECONDARY_CONN: 			"Conexión Secundaria",

			POOR_CONNECTED: 			"Conectado con poca señal",
			UNPLUGGED: 					"El puerto WAN está desconectado.",
			
			CONNECTED: 					"Conectado",
			DISCONNECTED: 				"Desconectado",
			CONNECTING: 				"Conectando",

			INTERNET_IP_ADDR: 			"Dirección IP",
			
			IP_ADDR: 					"Dirección IP",
			MAC_ADDR: 					"Dirección MAC",
			GATEWAY: 					"Puerta de Enlace Predeterminada",

			AUTO: 						"Auto",
			
			ROUTER: 					"Router",
			WIRELESS_CLIENTS: 			"Clientes Inalámbricos",
			HOST_CLIENTS: 				"Clientes Inalámbricos",
			GUEST_CLIENTS: 				"Clientes Invitados",
			WIRE_CLIENTS: 				"Clientes por cable",
			PRINTER: 					"Impresora",
			USB_DISK: 					"Disco USB",
			WIRELESS: 					"Red inalámbrica",
			NAME: 						"Nombre",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Canal",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"Inalámbrico 2.4GHz",
			WIRELESS_5GHZ: 				"Inalámbrico 5GHz",
			WIRELESS_60GHZ:				"Wi-Fi de 60GHz",
			
			GUEST_24GHZ: 				"Red de Invitados 2.4GHz",
			GUEST_5GHZ: 				"Red de Invitados 5GHz",
			
			STATUS: 					"Estado",
			TOTAL: 						"Total",
			AVAILABLE: 					"Disponible",
			GB: 						"GB",
			BRAND: 						"Marca",

			DYNAMIC_IP: 				"IP Dinámica",
			STATIC_IP: 					"IP Estática",
			SUBNET_MASK: 				"Máscara de Subred",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Túnel v6 a v4",
			NONE: 						"Ninguno"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Auto Detectar",
			INTERNET_CONN_TYPE: 		"Tipo de conexión a Internet",
			DYNAMIC_IP: 				"IP Dinámica",
			STATIC_IP: 					"IP Estática",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Desenchufado",
			NONE: 						"Ninguno",
			DETECT_FAIL: 				"Auto Detección fallida",
			SECONDARY_CONN: 			"Conexión Secundaria",

			DYNAMIC_YES: 				"NO clonar dirección MAC",
			DYNAMIC_NO: 				"Clonar la actual dirección MAC del ordenador",
			
			IP_ADDR: 					"Dirección IP",
			SUBNET_MASK: 				"Máscara de Subred",
			DEFAULT_GATEWAY: 			"Puerta de enlace predeterminada",
			PRIMARY_DNS: 				"DNS Primario",
			SECOND_DNS: 				"DNS Secundario",
			OPTIONAL: 					"(Opcional)",
			USER_NAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			SERVER_IP_ADDR_NAME: 		"IP del servidor VPN/Nombre de dominio",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Si no está seguro de que tipo de conexión a Internet tiene, use el auto-detectar o contacte con su proveedor de servicios (ISP) para Soporte Técnico."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Configuraciones Inalámbricas",
			MODE_2G: 					"Inalámbrico 2.4GHz",
			MODE_5G: 					"Inalámbrico 5GHz",
			MODE_60G: 					"Wi-Fi de 60GHz",
			WIRELESS_NETWORK_NAME: 		"Nombre de Red Inalámbrica (SSID)",
			WIRELESS_PASSWORD: 			"Contraseña",
			ENABLE_WIRELESS: 			"Activar Señal Inalámbrica",
			SAVE: 						"Guardar",
			ENCRYPTION_2G_NOTICE:		"La encriptación 2.4G es %s.",
			ENCRYPTION_5G_NOTICE:		"La encriptación 5G es %s.",
			ENCRYPTION_60G_NOTICE:		"El cifrado de 60GHz es %s.",
			ENCRYPTION_2G_NO: 			"La red inalámbrica de 2,4GHz no está encriptada.",
			ENCRYPTION_5G_NO: 			"La red inalámbrica de 5GHz no está encriptada.",
			ENCRYPTION_60G_NO: 			"La red inalámbrica de 60GHz no está cifrada.",
			ENCRYPTION_NO: 				"Red Inalámbrica no segura ha ocultado riesgos",
			ENCRYPTION_SURE: 			"¿Está seguro de que quiere continuar?",
			HIDE_SSID: 					"Ocultar SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Configuraciones Básicas",
			TITIL_NEW:					"Cuenta&Disco",
			DISK_SET:					"Configuración de dispositivos",

			SELFLY_REMOVE:				"Extraer de forma segura",
			SCANING:					"Escaneando…",
			SCAN_RESULT:				"Encontrado %n  del disco",
			
			DISKS:						"Discos",
			USERS: 						"Cuentas USB",
			DEVICENAME: 				"Nombre del Dispositivo",
			VOLUMN: 					"Volumen",

			USBSPACE: 					"Espacio Usado",
			FREESPACE: 					"Espacio libre",
			STATUS: 					"Estado",
			INACT: 						"Descativado",
			USAGE: 						"Uso",
			CAPACITY: 					"Capacidad",
			OPERATION: 					"Operación",
			
			ACC: 						"Administración de cuentas", 	 	
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			USE_LOGIN: 					"Utilice usuario de inicio de sesión",
			SCAN: 						"Escanear",
			ENJECT_ALL: 				"Expulsar todo",
			ENJECT: 					"Expulsar",
			ADD_USER: 					"Añadir Usuario",
			AUTH: 						"Autoridad",


			LOCATION: 					"Localización",
			MOBILE_ISP: 				"ISP Móvil",
			DIAL_NUMBER: 				"Número Dial",
			APN: 						"APN",
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			MTU_SIZE: 					"Tamaño MTU",
			OPTIONAL: 					"(Opcional)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Controles Parentales",
			UNKNOWN: 					"Desconocido",
			
			DEVICE_CTR: 				"Dispositivos bajo control parental",
			ID: 						"ID",
			DEVICE: 					"Nombre del Dispositivo",
			MAC_ADDRESS: 				"Dirección MAC",
			TIME: 						"Horario de Acceso a Internet",
			DESCRIPTION: 				"Descripción",
			ENABLE: 					"Activar",
			ENABLE_THIS_ENTRY: 			"Habilitar esta Entrada",
			OPTIONAL: 					"(Opcional)",
			BTN_VIEW: 					"Ver dispositivos existentes",
			
			DEVICE_LIST: 				"Lista de dispositivos",
			SYSTEM_TIME: 				"Hora del sistema",
			
			RESTR: 						"Restricciones de contenido",
			MODE: 						"Restricción",
			BLACKMODE: 					"Lista negra",
			WHITEMODE: 					"Lista blanca",
			ACCESS_DEVICES_LIST: 		"Lista de dispositivos de acceso",
			
			CHOOSE: 					"Elegir",
			ADD_A_NEW_KEYWORD: 			"Añada una Nueva Palabra Clave para Bloquear",
			ADD_A_NEW_DOMAIN_NAME: 		"Añada un Nuevo Nombre de Dominio para Acceder",
			
			OPT: 						"Operación",
			STATUS: 					"Control Parental",
			YOURPC:						"Su PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Red de Invitados",
			MODE_2G: 					"Inalámbrico 2.4GHz",
			MODE_5G: 					"Inalámbrico 5GHz",
			WIRELESS_NETWORK_NAME: 		"Nombre de Red Inalámbrica (SSID)",
			WIRELESS_PASSWORD: 			"Contraseña",
			DYNAMIC_PASSWORD: 			"Contraseña",
			ENABLE_WIRELESS: 			"Activar señal inalámbrica",
			SAVE:						"Guardar",
			HIDE_SSID: 					"Ocultar SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervalo de Actualización de Contraseña",
			PER_DAY: 					"Diario",
			PER_WEEK: 					"Semanal",
			PER_MONTH: 					"Mensual",
			NEVER: 						"Nunca",
			UNENCRYPTED:				"La Red de Invitados está desencriptada. Puedes configurar una contraseña en el menú Avanzado"
		},

		STATUS: {
			TITLE: 						"Estado",
			INTERNET:					"Internet",
			WIRELESS:					"Red inalámbrica",
			LAN:						"LAN",
			USB_TITLE:					"Dispositivos USB",
			PERFORMANCE: 				"Rendimiento",
			GUEST_NETWORK: 				"Red de Invitados",
			ACCESS_DEVICES: 			"Dispositivos de Acceso",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Tipo de Conexión",

			MAC_ADDRESS: 				"Dirección MAC",
			IP_ADDRESS: 				"Dirección IP",
			RELEASE: 					"Liberar",
			RENEW: 						"Renovar",
			
			DYNAMIC_IP: 				"IP Dinámica",
			STATIC_IP: 					"IP Estática",
			SUBNET_MASK: 				"Máscara de Subred",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond Cable",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Túnel v6 a v4",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"RDNSS",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"Ninguno",
			
			DEFAULT_GATEWAY: 			"Puerta de enlace predeterminada",
			DNS: 						"Servidor DNS",
			MAC: 						"Dirección MAC",
			WDS_STATUS: 				"Estado WDS",
			
			IPV6_ADDRESS: 				"Dirección IP",
			PRIMARY_DNS: 				"DNS Primario",
			SECOND_DNS: 				"DNS Secundario",

			RADIO: 						"Señal inalámbrica",

			NAME_SSID: 					"Nombre de Red (SSID)",
			NETWORK_NAME_SSID:			"Nombre de red (SSID)",
			HIDE_SSID: 					"Ocultar SSID",
			MODE: 						"Modo",
			CHANNEL: 					"Canal",
			CHANNEL_WIDTH: 				"Ancho del canal",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Canal Actual",

			WDS: 						"Estado WDS",
			WIRED_CLIENTS: 				"Clientes por cable",
			WIRELESS_CLIENTS: 			"Clientes Inalámbricos",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Máscara de Subred",
			ASSIGN_TYPE: 				"DHCP",
			
			ALLOW_TO_SEE_EACH: 			"Permitir que los clientes se vean entre ellos",

			TOTAL: 						"Total",
			AVAILABLE: 					"Disponible",

			USB: 						"Disco USB",
			PRINTER: 					"Impresora",

			CPU_LOAD: 					"Cargar CPU",
			MEMORY_USAGE: 				"Uso de memoria",

			IP_ADDR_P: 					"Dirección IP",
			MAC_ADDR_P: 				"Dirección MAC",
			CONN_TYPE_P: 				"Ctipo de Connexión",

			DISABLED: 					"Deshabilitado",
			INIT: 						"Inic",
			SCAN: 						"Escanear",
			AUTH: 						"Auten",
			ASSOC: 						"Asoc",
			RUN: 						"Funcionando",
			HOST: 						"Cliente",
			GUEST: 						"Inivitado",

			ON: 						"On",
			OFF: 						"Off"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Tipo de conexión a Internet",
			INTERNET_MAC_ADDRESS: 		"Dirección MAC",
			
			CONNECT: 					"Conectar",
			DISCONNECT: 				"Desconectar",

			IP_ADDR: 					"Dirección IP",
			
			USE_DEFAULT_MAC: 			"Utilizar la dirección MAC por defecto",
			USE_COMPUTER_MAC: 			"Utilizar la actual dirección MAC del ordenador",
			USE_CUSTOM_MAC: 			"Utilizar una dirección MAC diferente",
			MAC_CLONE: 					"Clonar MAC",
			
			CONFIG: 					"Configuración",
			
			IP_ADDRESS: 				"Dirección IP",
			SUBNET_MASK: 				"Máscara de Subred",
			DEFAULT_GATEWAY: 			"Puerta de enlace predeterminada",
			
			MANUAL_DNS: 				"DNS Manual",
			PRIMARY_DNS: 				"DNS Primario",
			SECOND_DNS: 				"DNS Secundario",
			
			RENEW: 						"Renovar",
			RELEASE: 					"Liberar",
			VIEW_MODE: 					"Modo Vista",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Obtener dinámicamente de su ISP",
			USE_FOLLOW_IP_ADDR: 		"Utilizar la siguiente dirección IP",
			USE_FOLLOW_DNS_ADDR: 		"Usar las siguientes direcciones DNS",
			USE_FOLLOW_DNS_SERVER: 		"Utilizar el siguiente servidor DNS",
			
			BASIC: 						"Básico",
			ADVANCED: 					"Avanzado",
			
			DNS_ADDR_MODE: 				"Dirección DNS",
			MTU_SIZE: 					"Tamaño MTU",
			MTU_1500: 					"bytes. (El valor por defecto es 1500, no lo cambie a menos que no sea necesario.)",
			MTU_1480: 					"bytes. (El valor por defecto es 1480, no lo cambie a menos que no sea necesario.)",
			MTU_1460: 					"bytes. (El valor por defecto es 1460, no lo cambie a menos que no sea necesario.)",
			MTU_1420: 					"bytes. (El valor por defecto es 1420, no lo cambie a menos que no sea necesario.)",
			
			HOST_NAME: 					"Nombre de equipo",

			HOST_NAME_CONFIRM: 			"El nombre del equipo contiene caracteres ilegales que pueden causar un comportamiento inesperado del sistema. ¿Está seguro de que quiere continuar?",

			GET_IP_WITH_UNICAST_DHCP: 	"Obtener IP utilizando DHCP Unicast (Normalmente no es requerido.)",
			OPTIONAL: 					"(Opcional)",
			
			STATIC_IP: 					"IP Estática",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6:		    "Auto",
						
			USER_NAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			
			INTERNET_IP_ADDR: 			"Dirección IP",
			INTERNET_DNS: 				"DNS de Internet",
			SECONDARY_CONN: 			"Conexión Secundaria",
			NONE: 						"Ninguno",
			INTERNET_PRIMARY_DNS:		"DNS Primario",
			INTERNET_SECONDARY_DNS: 	"DNS Secundario",
			
			DYNAMIC_IP: 				"IP Dinámica",
			DYNAMIC_IP_v6: 				"IP dinámica (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Nombre de Servicio",
			ACCESS_CONCENTRATOR_NAME:  	"Nombre de acceso concentrado",
			DETECT_ONLINE_INTERVAL: 	"Detectar intervalo en línea",
			INTERVAL_TIPS: 				"segundos. (0-120. El valor por defecto es 10.)",
			IP_ADDR_MODE:  				"Dirección IP",
			CONN_MODE: 					"Modo de conexión",
			DHCP_LINK_UNPLUGGED: 		"El puerto WAN está desconectado.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"Bajo demanda",
			TIME_BASED: 				"Basado en el tiempo",
			MANUALLY: 					"Manualmente",
			MAX_IDLE_TIME: 				"Máximo tiempo de inactividad",
			MAX_IDLE_TIME_TIPS: 		"minutos. (0 significa siempre activo.)",
			PERIOD_OF_TIME: 			"Periodo de tiempo",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond Cable",
			AUTH_SERVER: 				"Servidor de autenticación",
			AUTH_DOMAIN: 				"Dominio de autenticación",
			L2TP: 						"L2TP",
			GATEWAY: 					"Puerta de Enlace Predeterminada",
			SERVER_IP_ADDR_NAME: 		"IP del servidor VPN/Nombre de dominio",
			PPTP: 						"PPTP",
			TO: 						"Para",
			
			TUNNEL_6TO4: 				"Túnel v6 a v4",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Obtener una dirección IPv6 no temporal",
			GET_PREFIX_DELEGATION: 		"Obtener prefijo de delegación IPv6",
			IPV6_ADDR: 					"Dirección IPv6",

			GET_IPV6_WAY: 				"Obtener dirección IPv6",
			AUTOMATICALLY:              "Obtener automáticamente",
			SPECIFIED_BY_ISP: 			"Especificado por el ISP",

			IPV6_ADDR_PREFIX: 			"Prefijo de dirección IPv6",
			NONE_TEMPORARY: 			"No temporal",

			PREFIX_DELEGATION: 			"Delegación prefijo",
			ENABLE:                     "Habilitado",
			DISABLE:                    "Deshabilitado",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"Longitud de la máscara IPv4",
			CONFIG_TYPE: 				"Tipo de configuración",
			RD6_PREFIX: 				"Prefijo 6RD",
			RD6_PREFIX_LENGTH: 			"Longitud del prefijo 6RD",
			REPLY_IPV4_ADDR: 			"Dirección IPv4 de límite de respuesta",
			MANUAL: 					"Manual",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass Through (Bridge)",
			LOCAL_IPV6: 				"Dirección IPv6 local",
			PEER_IPV6: 					"Dirección IPv6 Par",
			TUNNEL_ADDR: 				"Dirección del tunel",
			IPV4_NETMASK: 				"Máscara de red IPv4",
			CUSTOM: 					"Personalizado",
		    AFTR_NAME: 					"Nombre AFTR",


			
			
			IPV4_ADDR: 					"Dirección IPv4",
			IPV4_MASK: 					"Máscara de Subred IPv4",
			IPV4_GATEWAY: 				"Puerta de enlace predetermina IPv4",

			DUPLEX: 					"Duplex",
			AUTO_NEGOTIATION: 			"Auto-Negociación",
			FULL_DUPLEX_1000: 			"1000Mbps full duplex",
			HALF_DUPLEX_1000:			"1000Mbps half duplex",
			FULL_DUPLEX_100: 			"100Mbps full duplex",
			HALF_DUPLEX_100: 			"100Mbps half duplex",
			FULL_DUPLEX_10: 			"10Mbps full duplex",
			HALF_DUPLEX_10: 			"10Mbps half duplex"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"Dirección MAC",
			IP_ADDRESS: 				"Dirección IP",
			SUBNET_MASK: 				"Máscara de Subred",
			CUSTOM: 					"Personalizado",

			IGMP: 						"Habilitar Proxy IGMP",
			


			ASSIGNED_TYPE: 				"DHCP",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+Stateless DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Prefijo de la dirección",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Dirección",
			DELEFATED: 					"Delegado",
			STATIC: 					"Estático",
			SITE_PREFIX: 				"Prefijo del emplazamiento",
			SITE_PREFIX_LEN: 			"Longitud del prefijo del emplazamiento",

			PREFIX_TYPE:  				"Tipo de configuración del prefijo del emplazamiento",
			LAN_IPV6_ADDR:  			"Habilitar Address IPV",

			RELEASE_TIME: 				"Tiempo de liberación",
			RELEASE_TIME_TIP: 			"segundos. (El valor por defecto es 86400, no cambiar a menos que sea necesario.)",
			ADDRESS:					"Dirección",
			SAVE: 						"Guardar",

			REBOOT_TIP: 				"El router es redireccioándose a la nueva página de acceso. <br/>  Por favor espere…"

		},

		IPTV:{
			TITLE: 						"Configuración",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "IPTV", 
			MODE:  						"Modo",
			IGMP_PROXY: 				"Proxy IGMP",
			IGMP_VERSION: 				"Versión IGMP",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Puente",
			BASIC: 						"Personalizado",
			EXSTREAM: 					"Singapore-ExStream",
			RUSSIA:  					"Russia",
			UNIFY:  					"Malaysia-Unif",
			MAXIS:  					"Malaysia-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"Teléfono-IP", 

			Q_TAG: 						"Etiquetado 802.1Q",
			ENABLE: 					"Activar",
			
			INTERNET_VLAN_ID: 			"ID Vlan Internet",
			INTERNET_VLAN_PRIORITY: 	"Prioridad Vlan Internet",
			IP_PHONE_VLAN_ID: 			"ID Vlan Teléfono-IP",
			IP_PHONE_VLAN_PRIORITY: 	"Prioridad Vlan Teléfono-IP",
			IPTV_VLAN_ID: 				"ID Vlan IPTV",
			IPTV_VLAN_PRIORITY: 		"Prioridad Vlan IPTV",
			IPTV_MULTI_VLAN_ID: 		"ID Vlan Multicast IPTV",
			IPTV_MULTI_VLAN_PRIORITY: 	"Prioridad Vlan IPTV Multicast"
		},

		DHCP_SERVER: {
			TITLE: 						"Servidor DHCP",
			
			SETTINGS: 					"Configuración",

			DHCP_SERVER: 				"Servidor DHCP",
			ENABLE_DHCP_SERVER: 		"Activar Servidor DHCP",

			IP_ADDR_POOL: 				"Rango de direcciones IP",
			LEASETIME: 					"Tiempo de concesión de direcciones",
			LEASENOTE: 					"minutos. (2-2880. El valor por defecto es 120.)",
			
			GATEWAY: 					"Puerta de enlace predeterminada",
			DOMAIN: 					"Dominio predeterminado",
			PRIMARYDNS: 				"DNS Primario",
			SECONDARYDNS: 				"DNS Secundario",

			OPTIONAL: 					"(Opcional)",

			CLIENTSLIST: 				"Lista de clientes DHCP",
			CLIENT_NUMBER: 				"Número de clientes",
			CLIENT_NAME: 				"Nombre de cliente",
			MAC_ADDR: 					"Dirección MAC",
			ASSIGNED_IP: 				"Dirección IP asignada",
			LEASE_TIME: 				"Tiempo de Concesión",

			RESERVATION: 				"Reserva de direcciones",

			RESERVED_IP: 				"Dirección IP reservada",
			IP_ADDRESS: 				"Dirección IP",
			DESCRIPTION: 				"Descripción",

			CLIENTSLIST: 				"Lista de clientes DHCP",
			CLIENT_NUMBER: 				"Número de clientes",

			ENABLE: 					"Activar",
			ENABLE_THIS_ENTRY: 			"Habilitar esta entrada",
			BTN_VIEW:					"Ver dispositivos existentes"
			
		},

		DDNS: {
			DDNS: 						"DNS dinámico",
			SERVICEPROVIDER: 			"Proveedor de Servicios",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP.",
			
			GO_TO_REGISTER: 			"Ir al registro…",
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			DOMAIN_NAME_LIST: 			"Lista de Nombres de Dominio",
			DOMAIN_NAME: 				"Nombre de dominio",
			LOGIN: 						"Iniciar sesión",
			LOGIN_SAVE: 				"Acceder y guardar", 
			LOGOUT: 					"Salir",
			STATU_SUCCESS:				"Éxito",
			UPDATE_INTERVAL:			"Intervalo de actualización",
			ONE_HOUR:					"1 hora",
			SIX_HOUR:					"6 horas",
			TWETEEN_HOUR:				"12 horas",
			ONE_DAY:					"1 día",
			TWO_DAY:					"2 días",
			THREE_DAY:					"3 días",
			NEVER:						"nunca",
			UPDATE:						"Actualizar",
			STATU_INCORRENT:			"Nombre de usuario o contraseña incorrectos",
			STATU_ERR_DOMAIN:			"Nombre de dominio incorrecto",
			
			STATU_NO_LAUNCH:			"No está ejecutándose",
			STATU_FAIL_DDNS: 			"Fallo al actualizar DynDNS.",
			STATU_FAIL_NOIP: 			"Fallo al actualizar No-IP.",
			STATU_CONN:					"Conectando..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Enrutamiento Avanzado",
			STATIC_ROUTING: 			"Enrutamiento estático",

			DESTINATION_NETWORK:		"Red de destino",
			SUBNET_MASK: 				"Máscara de Subred",
			DEFAULT_GATEWAY: 			"Puerta de enlace predeterminada",
			DESCRIPTION: 				"Descripción",
			
			SYSTEM_ROUTING_TABLE: 		"Tabla de enrutamiento del sistema",
			CLIENT_NUMBER: 				"Número de clientes",

			GATEWAY: 					"Puerta de Enlace Predeterminada",
			INTERFACE: 					"Interfaz",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Activar",
			ENABLE_THIS_ENTRY: 			"Activar esta entrada"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Configuración",
			NOT_SUPPORT_5G: 			"Esta región solo admite 2,4GHz. Asegúrese de seleccionar la región correcta.",
			NOT_SUPPORT_60G: 			"Esta región no admite 60GHz.",
			ENABLE_TIPS: 				"Debe encender la emisión inalámbrica.",

			REGION: 					"País",
			NOTICE:  					"Para utilizar la función inalámbrica, debe mantener el botón inalámbrico encendido.",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Red inalámbrica",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Activar Señal Inalámbrica",

			WIRELESS_NETWORK_NAME: 		"Nombre de Red Inalámbrica (SSID)",
			WIRELESS_PASSWORD: 			"Contraseña",
			HIDE_SSID: 					"Ocultar SSID",

			SECURITY: 					"Seguridad",
			NO_SECURITY: 				"Sin seguridad",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 - Personal (Recomendado)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - Empresarial",
			WPA2_PERSONAL: 			    "WPA2-Personal (recomendado)",
			WPA2_ENTERPRISE: 		    "WPA2-Empresa",
			WEP: 						"WEP",

			VERSION: 					"Versión",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Encriptación",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Modo",
			MODE_B:  					"Sólo 802.11b",
			MODE_G:  					"Sólo 802.11g",
			MODE_N:  					"Sólo 802.11n",
			MODE_BG:  					"802.11b/g mixto",
			MODE_GN: 					"802.11g/n mixto",
			MODE_BGN:  					"802.11b/g/n mixto",

			MODE_A_5: 					"802.11a/n solo",
			MODE_AN_5: 					"802.11a/n mixto",
			MODE_N_5: 					"Sólo 802.11n",
			MODE_AC_5:					"802.11ac/n solo",
			MODE_NAC_5:					"802.11n/ac mixto",
			MODE_ANAC_5:				"802.11a/n/ac mixto",

			MODE_AD_60:					"802.11ad solamente",

			CHANNEL_WIDTH: 				"Ancho del canal",
			CHANNEL: 					"Canal",

			TRANSMIT_POWER: 			"Fuerza de transmisión",

			RADIUS_SERVER_IP: 			"Servidor RADIUS IP",
			RADIUS_PORT: 				"Port RADIUS",
			RADIUS_PASSWORD: 			"Contraseña RADIUS",

			TYPE: 						"Tipo",
			OPEN_SYSTEM: 				"Sistema abierto",
			SHARED_KEY: 				"Clave compartida",

			KEY_SELECTED: 				"Clave Seleccionada",
			KEY1: 						"Clave1",
			KEY2: 						"Clave2",
			KEY3: 						"Clave3",
			KEY4: 						"Clave4",

			WEP_KEY_FORMAT: 			"Formato de clave WEP",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Hexadecimal",

			KEY_TYPE: 					"Tipo de clave",
			BIT64: 						"64-bit",
			BIT128: 					"128-bit",
			BIT152: 					"152Bit",

			KEY_VALUE: 					"Valor de la clave",
			
			MHZ: 						"MHz",
			MHZ20: 						"20MHz",
			MHZ40: 						"40MHz",
			MHZ80: 						"80MHz",
			
			LOW: 						"Bajo",
			MIDDLE: 					"Medio",
			HIGH: 						"Alto"
		},

		WPS: {

			TITLE2: 					"PIN del router",
			ROUTERS_PIN_INFO: 			"Otros dispositivos pueden conectarse a este router por WPS introduciendo el código PIN del router.",
			ENABLE_ROUTE_PIN: 			"PIN del router",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"Generar",
			DFT: 						"Por defecto",

			TITLE: 						"Ayuda WPS",
			SELECT_SETUP: 				"Seleccionar un método de configuración",
			PUSH_BTN: 					"Pulsar botón (Recomendado)",
			PUSH_DES: 					"Pulsar el botón del router o pulsar en \"Conectar\" en esta página.",
			CONNECT: 					"Conectar",
			CANCEL: 					"Cancelar",

			RESULT_HEAD: 				"El cliente inalámbrico",
			RESULT_END: 				"ha sido añadido a la red satisfactoriamente",
			NOT_FOUND: 					"No se ha encontrado ningún cliente. Haga clic en el botón para volver a intentarlo.",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"No encontrado",
			ENTER_CLIENT_PIN: 			"Introducir el PIN del cliente",
			SWITCH_NOTE:				"Para conectar utilizando WPS, por favor encienda la fución inalámbrica mediante el botón Wi-Fi.",
			SWITCH_NOTE2:				"Nota: Para utilizar WPS, priemro configure los parámetro inalámbricos correctos.",
			STATUS_PIN_ERROR: 			"PIN WPS no válido. Por favor, compruebe que es correcto.",
			STATUS_ERROR: 				"Error.",
			STATUS_CONN_ERROR: 			"La conexión ha fallado.",
			STATUS_CONNING: 			"Conectando...",
			STATUS_CANCEL: 				"Conexión cancelada.",
			
			NOTE: 						"Nota:",
			BUTTON: 					"El Botón Wi-Fi está apagado",
			ENABLE: 					"La función inalámbrica no está habilitada",
			HIDDEN: 					"El SSID oculto está en",
			ENCRYPTION: 				"La encriptación no es correcta",
			WPS: 						"El WPS está deshabilitado en la página de Parámetros del Sistema",

			
			STATUS_CONN_OVERLAP: 		"La conexión ha fallado(OVERLAP).",
			STATUS_CONN_TIMEOUT: 		"La conexión ha fallado(TIMEOUT).",
			STATUS_CONN_INACT: 			"Conexión inactiva."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Estaciones inalámbricas en línea",
			CLIENT_NUMBER: 				"Número de clientes",
			MAC_ADDRESS: 				"Dirección MAC",
			CONN_TYPE: 					"Tipo de Conexión",
			SECURITY: 					"Seguridad",
			RECEIVED_PACKETS: 			"Paquetes recibidos",
			SEND_PACKETS: 				"Paquetes enviados"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Configuración",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Permitir que los clientes se vean entre ellos",

			ALLOW_LOCAL: 				"Permitir que los clientes accedan a mi red local",
			
			WIRELESS: 					"Red inalámbrica",
			WIRELESS_24G_RADIO: 		"Inalámbrico 2.4GHz",
			WIRELESS_5G_RADIO: 			"Inalámbrico 5GHz",
			ENABLE_GUEST: 				"Activar señal inalámbrica",

			NAME_SSID: 					"Nombre de Red Inalámbrica (SSID)",
			HIDE_SSID: 					"Ocultar SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervalo de actualización de contraseña",
			PER_DAY: 					"Diario",
			PER_WEEK: 					"Semanal",
			PER_MONTH: 					"Mensual",
			NEVER: 						"Nunca",
			SECURITY: 					"Seguridad",
			NO_SECURITY: 				"Sin seguridad",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personal",

			VERSION: 					"Versión",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Encriptación",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Contraseña"
		},

		NAT:{
			SETTINGS: 					"Hardware NAT",
			STATUS: 					"Hardware NAT",
			
			ALG_TITLE: 					"Puerta de enlace de la capa de aplicación (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP Passthrough",
			L2TP_ALG: 					"L2TP Passthrough",
			IPSEC_ALG: 					"IPSec Passthrough",

			ENABLE_FTP_ALG: 			"Activar ALG FTP",
			ENABLE_TFTP_ALG: 			"Activar ALG TFTP",
			ENABLE_H323_ALG: 			"Activar ALG H323",
			ENABLE_RTSP_ALG: 			"Activar ALG RTSP",
			ENABLE_PPTP_ALG: 			"Activar Passthrough PPTP",
			ENABLE_L2TP_ALG: 			"Activar Passthrough L2TP",
			ENABLE_IPSEC_ALG: 			"Activar Passthrough IPSec",
			NAT_ENABLE_NOTICE: 			"Nota: Tu configuración no tendrá efecto hasta que la función NAT esté habilitada."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Servidores Virtuales",

			SERVICE_NAME: 				"Tipo de servicio",
			EXTERNAL_PORT: 				"Puerto externo",
			INTERNAL_IP: 				"IP interna",
			INTERNAL_PORT: 				"Puerto interno",
			PROTOCAL: 					"Protocolo",

			BTN_VIEW: 					"Ver servicios existentes",

			EXSITTING_SERVICE: 			"Servicios existentes",
			
			PROTOCAL_ALL: 				"Todos",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX or XX)",
			EXT_PORT_TIPS: 				"(XX or XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX or Blank ,1-65535)",

			NOTICE:						"Conflicto con el puerto de gestión remota. ¿Está seguro de que quiere continuar?",
			NOTICE_INVALID_REMOTE:		"La gestión remota no es válida debido a que el puerto 80 está en conflicto con el servidor virtual. Por favor cambie el puerto de gestión remota.",
			NOTICE_ENTER_ANOTHER:		"En conflicto con el puerto de gestión remoto. Por favor introduzca otro puerto.",
			NOTICE_PPTP_CONFLICT:		"En conflicto con el puerto PPTP VPN. Introduzca otro puerto.",
			NOTICE_OPENVPN_CONFLICT:	"En conflicto con el puerto OpenVPN. Introduzca otro puerto.",


			ENABLE_THIS_ENTRY: 			"Activar",
			OPERATION: 					"Operación",
			CHOOSE: 					"Elegir",
			NAT_ENABLE_NOTICE: 			"Nota: Tu configuración no tendrá efecto hasta que la función NAT esté habilitada."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Disparado de puertos",
			APPLICATION: 				"Aplicación",
			TRIGGER_PORT: 				"Disparado de puertos",
			TRIGGER_PROTOCOL: 			"Protocolo disparador",

			EXTERNAL_PORTS: 			"Puerto externo",
			EXTERNAL_PROTOCOL: 			"Protocolo externo",

			BTN_VIEW: 					"Ver aplicaciones existentes",

			EXSITTING_APPLICATION: 		"Aplicaciones existentes",
			APPLICATION_NAME: 			"Nombre de aplicación",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX or XX-XX,1-65535, al menos 5 pares)",
			
			NOTICE_PPTP_CONFLICT:		"En conflicto con el puerto PPTP VPN. Introduzca otro puerto.",
			NOTICE_OPENVPN_CONFLICT:	"En conflicto con el puerto OpenVPN. Introduzca otro puerto.",
			
			ENABLE_THIS_ENTRY: 			"Activar",
			OPERATION: 					"Operación",
			
			PROTOCAL_ALL: 				"Todos",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Nota: Tu configuración no tendrá efecto hasta que la función NAT esté habilitada."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Activar DMZ",
			HARDWARESTATUS: 			"Dirección IP del equipo DMZ",
			NAT_ENABLE_NOTICE: 			"Nota: Tu configuración no tendrá efecto hasta que la función NAT esté habilitada."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"Lista de servicio UPnP",
			CLIENT_NUMBER: 				"Número de clientes",
			SERVICE: 					"Descripción del servicio",
			EXTERNAL_PORT: 				"Puerto externo",
			PROTOCAL: 					"Protocolo",
			IP_ADDR: 					"Dirección IP interna",
			INTERNAL_PORT: 				"Puerto interno",
			NAT_ENABLE_NOTICE: 			"Nota: Tu configuración no tendrá efecto hasta que la función NAT esté habilitada."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"Módem USB",
			LOCATION: 					"Localización",
			MOBILE_ISP: 				"ISP Móvil",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Modo de conexión",
			CONNECT_ON_DEMAND: 			"Conectar por demanda",
			CONNECT_AUTOMATICALLY: 		"Conectar automáticamente",
			CONNECT_MANUALLY: 			"Conectar manualmente",
			MAX_IDLE_TIME: 				"Máximo tiempo de inactividad",
			CONNECTION_TIP: 			"El acceso a internet preferido actualmente es WAN",
			IDLE_TIME_TIP: 				"El modo de conexión y en Tiempp Idle Max podría no ser configurado manualmente.",
			MINUTES: 					"minutos.(0 significa que permanece activo todo el tiempo.)",

			AUTHENTICATION_TYPE: 		"Tipo de autenticación",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"El valor por defecto es Auto, no lo cambie si no es necesario.",

			CONNECT: 					"Conectar",
			DISCONNECT: 				"Desconectar",

			SET_TIP: 					"Configure el número de marcación APN, Nombre de usuario y Contraseña manualmente",
			DIAL_NUMBER: 				"Número de marcación",
			APN: 						"APN",
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			OPTIONAL: 					"(Opcional)",
			MTU_SIZE: 					"Tamaño de MTU(en bytes)",
			MTU_SIZE_TIP: 				"bytes. (El valor por defecto es 1480, no lo cambie a menos que no sea necesario.)",

			USE_FOLLOW_DNS_SERVER: 		"Utilizar las siguientes direcciones DNS",
			PRIMARY_DNS: 				"DNS Primario",
			SECOND_DNS: 				"DNS Secundario",

			UNPLUGGED: 					"Desenchufado",
			IDENTIFYING: 				"Identificando...",
			IDENTIFY_SUCCESS: 			"Identificado satisfactoriamente"
		},

		DISK_SETTING: {
			DISK_SET: 					"Configuración de dispositivos",
			SCAN: 						"Escanear",
			SELFLY_REMOVE: 				"Extraer de forma segura",
			SCAN_RESULT: 				"Encontrado %n  del disco",
			NOT_FOUND: 					"No encontrado",
			SELFLY_REMOVE: 				"Extraer de forma segura",
			
			VOLUMN: 					"Volumen",
			CAPACITY: 					"Capacidad",
			FREESPACE: 					"Espacio libre",
			USBSPACE: 					"Espacio usado",
			
			STATUS: 					"Estado",
			INACT: 						"Deshabilitar",
			ACTIVE: 					"Activar",
			
			USAGE: 						"Uso",
			CAPACITY: 					"Capacidad",
			OPERATION: 					"Operación",	
			
			ACC: 						"Administración de cuentas", 	 	
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			USE_LOGIN: 					"Utilice usuario de inicio de sesión",
			SCAN: 						"Escanear",
			ENJECT_ALL: 				"Expulsar todo",
			ENJECT: 					"Expulsar",
			ADD_USER: 					"Añadir usuario",
			AUTH: 						"Autoridad"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Descarga Offline",
			ITEMS:						"Objetos",
			FILE:						"Archivo",
			FOLDER:						"Carpeta",
			SIZE:						"Tamaño",
			STATUS:						"Estado",
			DOWNLOAD:					"Descarga",
			REMAINTING:					"Tiempo Restante",
			SPEED:						"Velocidad",
			SOURCE:						"Fuente",	
			DOWNLOADTO:					"Descargar a",	
			TORRENT_PC:					"Torrent de PC",
			TORRENT_USB:				"Torrent de USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"Puerto TCP de aMule",
			AMULEUDP:					"Puerto UDP de aMule",
			AMULESERVER:				"Servidor aMule",
			SCHEDULE:					"Programación",
			MAXACTIVE:					"Número máximo de tareas activas",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Zona Horaria",
			DOWNLOADTIME:				"Tiempo de Descarga",
			REPEAT:						"Repetir",
			SPEEDLIMIT:					"Límite de velocidad",
			MAXDOWNLOAD:				"Velocidad de descarga máxima",
			MAXUPLOAD:					"Velocidad de subida máxima",
			SPEEDTIPS:					"(0 significa ilimitada)",
			BTPORT:						"Puerto de Descarga BT",
			SEED:						"Mantener la clasificación después de completar la tarea",
			UNIT:						"KB/S",
			MODIFY:						"Modificar",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Localización del Torrent",
			CONNECT:					"Conectado",
			DISCONNECTED:				"Desconectado",
			CONNECTING:					"Conectando",
			GENERAL:					"General",
			COMPLETED:					"Completado",
			NEWDEVICE:					"Nuevo dispositivo",
			FOUNDUSB:					"Se ha detectado un nuevo USB",
			CONNECTEDPEERS:				"Pares conectados",
			OF:							"de",
			NUM_OF_CON:					"Número de conexiones",
			NUM_OF_CON_G:				"Número máximo global de conexiones",
			NUM_OF_CON_PT:				"Número máximo de pares conectados por torrent",
			EN_DHT_NET:					"Habilitar red DHT",
			EN_PE_EX:					"Habilitar intercambio entre pares",
			EN_BT:						"Habilitar cifrado de protocolo BitTorrent",
			GENERAL_SETTINGS:			"Ajustes generales",
			BT_SETTINGS:				"Ajustes de BT",
			AMULE_SETTINGS:				"Ajustes de aMule",
			CLEAN:						"Quitar completadas",
			NONE_COMPLETE: 				"Ninguna tarea completada."
		},

		FOLDER: {
			TITLE: 						"Configuración medios compartidos",
			ACCOUNT_TITLE: 				"Cuenta Compartida",
			ACCOUNT:					"Cuenta",
			AC_NOTE: 					"Preparar una cuenta de contenidos compartidos. Puede utilizar una cuenta de acceso o crear una nueva.",
			
			AC_LOGIN: 					"Usar la cuenta por defecto",
			AC_FOLLOW: 					"Usar una cuenta nueva",

			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",
			CONFIRM: 					"Confirmar Contraseña",

			SHARING_SETTING: 			"Configuración medios compartidos",
			SERVER_NAME: 				"Nombre de red/servidor de medios compartidos",

			METHOD: 					"Método de acceso",
			LINK: 						"Enlace",
			PORT: 						"Puerto",

			NETWORK_NEIGHBORHOOD: 		"Redes vecinas",
			FTP: 						"FTP",
			FTPEX: 						"FTP (Vía Internet)",

			SHARE_FOLDER: 				"Compartición de carpetas",
			SHAREING_ALL: 				"Compartir todas",
			NOTE:  						"Actívelo para compartir todos los archivos y carpetas o manténgalo apagado para compartir sólo las carpetas especificadas.", 
			ENABLE_AUTHENTICATION: 		"Activar Autentificación",
			SHAREING_FOLDER: 			"Carpetas compartidas",
			
			SHARE_NAME: 				"Nombre de la carpeta",
			FOLDER_PATH: 				"Ruta de la carpeta",
			VOLUMN_NAME: 				"Nombre del volumen",

			SHARE_NAME: 				"Nombre de la carpeta",
			FOLDER_PATH: 				"Ruta de la carpeta",
			MEDIA_SHARING: 				"Compartición de medios",
			STATUS: 					"Estado",

			GUEST_ACCESS: 				"Permitir acceso a la red de Invitados",
			ENABLE_AUTHENTICATION: 		"Activar Autentificación",
			ENABLE_WRITE_ACCESS: 		"Activar Permiso de Escritura",
			ENABLE_MEDIA_SHARE: 		"Activar Compartición de medios",
			
			BROWSE: 					"Examinar",
			BROWSE_TITLE: 				"Seleccione una carpeta",

			NO_VOLUMN:					"No existe volumen",
			
			NOTICE: 					"¿Está seguro de que quiere abandonar la página Dynamic DNS? Pulse en Save para guardar y salir. Pulse en Leave without saving para salir sin guardar los cambios. Pulse en Cancel para permanecer aquí.",
			NO_CHANGE_NOTICE: 			"¿Está seguro de que quiere abandonar la página Dynamic DNS?",

			SAVE_FAILED_NOTICE: 		"Fallo al guardar ",
			CONTINUE: 					"Salir",
			CONTINUE_SAVE: 				"Guardar",
			CANCLE: 					"Cancelar",

			ENABLE: 					"Activar"

		},

		PRINT:{
			TITLE: 						"Servidor de impresión",
			NAME: 						"Nombre impresora",
			ENABLE_PRINT_SERVER: 		"Servidor de impresión",
			NONE: 						"Ninguno",
			
			NOTE_TITLE: 				"Nota:",
			STEP1: 						"Paso1:",
			STEP2: 						"Paso2:",
			STEP3: 						"Paso3:",

			NOTE1: 						"1. Conecte una impresora USB al puerto USB del router a través de un cable USB.",
			NOTE2: 						"2. Instale el driver de la impresora en su ordenador. Consulte los manuales del fabricante para seguir las instrucciones.",
			NOTE3: 						"3. Instale la utilidad controlador de impresión de TP-LINK, ya sea desde el CD de recursos (sólo para Windows) o descargándola (tanto para Windows como para Mac OS X) de la página web oficial de <a class=\"link\" href=\"http://www.tp-link.com/es/Support/\" target=\"_blank\">TP-LINK</a>.",
			NOTE3_US: 					"Instale la Utilidad del Controlador de Impresora USB de TP-LINK. Por favor descárguelo de nuestra página web oficial: <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Controles parentales",
			STATUS: 					"Control Parental",
			UNKNOWN: 					"Desconocido",

			DEVICE_CTR: 				"Dispositivos bajo control parental",
			DEVICE: 					"Nombre del Dispositivo",
			MAC_ADDRESS: 				"Dirección MAC",
			TIME: 						"Horario de Acceso a Internet",
			DESCRIPTION: 				"Descripción",
			
			ENABLE_THIS_ENTRY: 			"Activar",
			OPTIONAL: 					"(Opcional)",
			BTN_VIEW: 					"Ver dispositivos existentes",
			
			DEVICE_LIST: 				"Lista de dispositivos",
			SYSTEM_TIME: 				"Hora del sistema",
			
			RESTR: 						"Restricciones de contenido",
			MODE: 						"Restricción",
			BLACKMODE: 					"Lista negra",
			WHITEMODE: 					"Lista blanca",
			ACCESS_DEVICES_LIST: 		"Lista de dispositivos de acceso",
			
			CHOOSE: 					"Elegir",
			ADD_A_NEW_KEYWORD: 			"Añada una Nueva Palabra Clave para Bloquear",
			ADD_A_NEW_DOMAIN_NAME: 		"Añada un Nuevo Nombre de Dominio para Acceder",
			
			YOURPC:						"Su PC"
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
			OTHERS: 					"Otros",

			DEVICE: 					"Dispositivo",
			RATE: 						"Velocidad",
			APPLICATION: 				"Aplicación",

			NAME: 						"Nombre",
			MAC_ADDRESS: 				"Dirección MAC",
			IP_ADDRESS: 				"Dirección IP",


			DEVICES: 					"Dispositivos"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Ancho de banda",
			TEST_BANDWIDTH: 			"> Probar Ancho de Banda",
			STREAMBOOST: 				"Streamboost",
			ENABLE_STREAMBOOST: 		"Habilitar streamboost",
			UP_LIMITATION: 				"Limitación de subida(Mbps)",
			DOWN_LIMITATION: 			"Limitación de bajada(Mbps)",
			RUN_BANDWIDTH_TEST: 		"Ejecutar prueba de ancho de banda",
			TESTING: 					"Probando",
			TEST_FAILED: 				"Prueba fallida",
			TEST_SUCCEED: 				"Prueba superada",
			ENABLE_AUTOMATIC_TEST: 		"Habilitar prueba automática",
			KEEP_UP_TO_DATE: 			"Mantener StreamBoost hasta la fecha",
			ENABLE_AUTOMATIC_UPDATE: 	"Habilitar actualizaciones automáticas"

		},

		PRIORITY:{
			PRIORITY: 					"Prioridad",
			PRIORITY_TIPS: 				"La prioridad le permite cambiar la importancia de un dispositivo sobre otro. Esto se utiliza cuando el dispositivo está compitiendo por el ancho de banda limitado con alguna aplicación de la misma clasificación.",
			ALL_DEVICE: 				"Todos los dispositivos",
			ACTIVE_DEVICE: 				"Dispositivo activo",
			SAVE: 						"Guardar",
			ID: 						"ID",
			DEVICE: 					"Dispositivo",
			TYPE: 						"Tipo",
			MAC_ADDRESS: 				"Dirección MAC",
			STICK: 						"Barra"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Estadísticas",
			UP_TIME: 					"Tiempo de subida",
			DOWNLOADS: 					"Descargas",
			LAST_DAY: 					"Último día",
			LAST_WEEK: 					"ültima semana",
			LAST_MONTH: 				"Último mes",
			ALL_LAN_HOSTS: 				"Todos los Hosts LAN",
			OTHER: 						"Otros"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Firewall",
			ENABLE_SPI: 				"Firewall SPI",

			DOS_PROTECTION: 			"Protección DoS",
			ENABLE_DOS: 				"Protección DoS",
			
			OFF: 						"Off",
			LOW: 						"Bajo",
			MIDDLE: 					"Medio",
			HIGH: 						"Alto",

			ICMP: 						"Filtrado de ataques ICMP-FLOOD",
			UDP: 						"Filtrado de ataques UDP-FLOOD",
			TCP: 						"Filtrado de ataques TCP-SYN-FLOOD",
			ENABLE_DOS_TIP:             "La Protección DoS y las Estadísticas de Tráfico deben estar habiltiadas al mismo tiempo.",

			IGNORE: 					"Ignorar paquetes Ping desde un puerto WAN",
			FORBID: 					"Prohibir paquetes Ping desde un puerto LAN",

			BLOCK_DOS: 					"Lista de equipos bloqueados DoS",
			HOST_NUMBER: 				"Número de equipo",
			IP_ADDRESS: 				"Dirección IP",
			MAC_ADDRESS: 				"Dirección MAC"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Control de acceso",
			ENABLE_ACCESS: 				"Control de acceso",

			ACCESS_MODE: 				"Modo de acceso",
			DEFAULT_ACCESS_MODE: 		"Modo de acceso predeterminado",
			BLACK_LIST: 				"Lista negra",
			WHITE_LIST: 				"Lista blanca",
			
			WIRED:						"Red cableada",
			WIRELESS:					"Red inalámbrica",

			DEVICE_ONLINE: 				"Dispositivos en red",
			NAME: 						"Nombre del Dispositivo",
			IP_ADDRESS: 				"Dirección IP",
			MAC_ADDRESS: 				"Dirección MAC",
			CONN_TYPE: 					"Tipo de Conexión",

			BLOCK: 						"Bloquear",

			DEVICE_IN_WHITE: 			"Dispositivos en la lista blanca",
			DEVICE_IN_BLACK: 			"Dispositivos en la lista negra"
		},

		IP_MAC:{
			TITLE: 						"Configuración",
			ENABLE_ARP: 				"Vinculación ARP",

			ARP_LIST: 					"Lista ARP",
			ARP_NUM: 					"Número de entradas ARP",

			MAC_ADDRESS: 				"Dirección MAC",
			IP_ADDRESS: 				"Dirección IP",
			BOUND: 						"Límite",
			UNBOUND: 					"Sin límite",

			BINDING_LIST: 				"Lista de vinculación",
			DESCRIPTION: 				"Descripción",
			OPTIONAL: 					"(Opcional)",
			ENABLE_THIS_ENTRY: 			"Activar"
		},

		TIMESET: {
			TITLE: 						"Configurarciones de la hora",
			ZONE: 						"Zona horaria",
			DATE: 						"Fecha",
			DATEFORMAT: 				"MM/DD/AAAA",
			TIME: 						"Hora",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"Servidor NTP I",
			NTP2: 						"Servidor NTP II",
			OPTIONAL: 					"(Opcional)",

			CURRENT_TIME:  				"Hora actual",
			SET_TIME: 					"Configurar Hora",
			AUTOMATIC: 					"Obtener automáticamente de Internet",
			MANUAL: 					"Manualmente",
			AUTOMATIC_BTN: 				"Obtener",


			GETGMT: 					"Obtener GMT",

			
			GETGMT_SUCCESS: 			"Obtener hora del servidor NTP con éxito",
			GETGMT_TIMEOUT: 			"Obtener hora del servidor NTP tiempo superado",
			GETGMT_WAIT: 				"Esperando",
			
			M: 							"M",
			W: 							"S",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Horario de verano",
			ENABLE_DAYLIGHT: 			"Habilitar horario de verano",
			START: 						"Empezar",
			END: 						"Terminar",

			RUNNING_STATUS: 			"Estado de ejecución",
			DOWN: 						"Horario de verano apagado",
			UP: 						"Horario de verano activado"
		},

		DIAG:{
			TITLE: 						"Diagnósticos",
			DIAGNOSTIC_TOOL: 			"Herramienta de diagnóstico",
			PING: 						"Ping",
			TRACE: 						"Ruta de trazado",

			IPADDR: 					"Dirección IP/ Nombre de dominio",
			COUNT: 						"Contador Ping",
			
			BASIC: 						"Básico",
			ADVANCED: 					"Avanzado",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Tamaño de paquete Ping",
			PKTUNIT: 					"(4-1472 Bytes)",

			TIMEOUT: 					"Tiempo finalizado del Ping",
			TIMOUTUNIT: 				"(100-2000 milisegundos)",

			TTL: 						"Ruta de trazado Max TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"Empezar",
			STOP: 						"Parar"
		},

		FIRMWARE:{
			TITLE: 						"Actualización de firmware",
			FIRMWARE_INFO:  			"El firmware está actualizado",
			INFO: 						"Información del dispositivo",
			REMOTE_TITLE: 				"Actualización en línea",
			LOCAL_TITLE: 				"Actualización local",

			NEWFILE: 					"Nuevo archivo Firmware",
			FIRMWAREVERSION: 			"Versión de Firmware",
			HARDWAREVERSION: 			"Versión de Hardware",
			LATESTVERSION: 				"Última versión",
			CONFIRM_CONTENT:			"¿Seguro que desea actualizar el firmware?",
			WARNING:					"Actualizando firmware… <br/> Para evitar posibles daños, mantenga el dispositivo encendido y no realice ninguna operación durante el proceso.",
			REBOOTING: 					"Reiniciando… <br/> Para evitar posibles daños, mantenga el dispositivo encendido y no realice ninguna operación durante el proceso.",
			DO_NOT_OPERATE: 			"Actualizando... <br/>Por favor NO realice cambios durante el proceso.",
			FIRMWARE_UPDATING_NOTE: 	"1. Actualizando firmware…",
			REBOOTING_NOTE: 			"2. Reiniciando…",
			SCREEN_UPDATING_NOTE: 		"3. Actualizando la pantalla…",
			UPGRADE_FAILED: 			"Actualización fallida.",
			UPGRADE: 					"Actualizar versión",
			CHECK: 						"Comprobación",
			DOWNLOADING: 				"Descargando…",
			UPGRADE_INOF: 				"Para evitar posibles daños, mantenga el router encendido.",
			NOTE: 						"Nota:",
			NO_UPGRADE: 				"Esta es la última versión",

			UPGRADING: 					"Actualizando…",
			RETRY: 						"Reintentar",
			CANCEL: 					"Cancelar",
			ILEGAL_DEVICE:				"No se pudo identificar el dispositivo. Póngase en contacto con el soporte técnico de TP-LINK.",
			UPGRADE_FAIL: 				"No se pudo actualizar. Vuelva a intentarlo más tarde.",
			CHECK_UPGRADE:				"Buscar actualización"
		},

		BACKUP:{
			BACKUP: 					"Copia de seguridad",
			BACKUPTIP: 					"Guarde una copia de la configuración actual.",

			RESTORE: 					"Restaurar",
			RESTORETIP: 				"Restaurar la configuración guardada en un archivo",
			
			RESTORE_WARN:				"Router restaurándose… <br/> Por favor, no realice ninguna operación durante el proceso.",
			RESTORE_CONFIRM_CONTENT: 	"¿Está seguro de que quiere cargar los valores del router desde un fichero de configuración?",
			
			FILE: 						"Archivo",

			FACTORY: 					"Restaurar configuración prederteminada de fábrica",
			FACTORYTIP: 				"Revierte toda la configuración hasta los valores de fábrica",
			FACTORY_CONFIRM_CONTENT:	"¿Está seguro de que quiere restaurar los valores de fábrica del router?",
			FACTORY_WARN:				"Restaurando router",
			
			BACKUPBTN: 					"Copia de seguridad",
			RESTOREBTN: 				"Restaurar",
			FACTORYBTN: 				"Restaurar de fábrica"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Administración de cuentas",
			
			OLDUSER: 					"Usuario antiguo",
			OLDPWD: 					"Contraseña antigua",

			NEWUSER: 					"Nuevo nombre de usuario",
			NEWPWD: 					"Nueva contraseña",
			CONFIRM: 					"Confirmar nueva contraseña",

			RECOVERYINFO: 				"Recuperación de contraseña",
			ENABLE_PASSWORD_RECOVERY: 	"Habilitar recuperación de contraseña",
			FROM: 						"Desde",
			TO: 						"Para",
			SMTP_SERVER: 				"Servidor SMTP",
			
			ENABLE_AUTHENTICATION: 		"Activar Autentificación",
			USERNAME: 					"Nombre de usuario",
			PASSWORD: 					"Contraseña",

			TEST_MAIL: 					"Correo de confirmación",

			LOCAL:						"Administración Local",
			LOCAL_MAC_AUTH: 			"Autenticación MAC Local",
			ACCESS: 					"Acceso para todos los dispositivos conectados en LAN",
			ACCESS_TIPS: 				"Cambia a Encendido para habilitar la administración de todos los dispositivos de la red LAN o mantenerlo Apagado para habilitar la administración de un dispositivo específico.",
			
			MAC_ADDRESS: 				"Dirección MAC",
			VIEW_BTN: 					"Ver dispositivos existentes",
			DESCRIPTION: 				"Descripción",

			EXIST_DEVICE:               "Dispositivos existentes",

			OPTIONAL: 					"(Opcional)",
			ENABLE_THIS_ENTRY: 			"Activar",

			DEVICE_NAME:				"Nombre del Dispositivo",
			IP_ADDRESS:					"Dirección IP",
			

			REMOTE: 					"Control Remoto",
			DISABLE_REMOTE_MANAGEMENR: 	"Desactivar el control remoto",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Activar el control remoto para todos los dispositivos",
			ENABLE_REMOTE_MANAGEMENR: 	"Activar el control remoto para los dispositivos especificados",
			WEB: 						"Puerto de control Web",

			NOTICE:						"Conflicto con el puerto del servidor virtual. ¿Está seguro de que quiere continuar?",
			NOTICE_ENTER_ANOTHER:		"En conflicto con un puerto de servidor virtual. Por favor introduzca otro puerto.",

			REMOTEIP: 					"Dirección IP de control remoto",
			REMOTEIPNOTE: 				"(Introduzca 255,255,255,255 para todos)"
			
		},

		SYSLOG:{
			TITLE: 						"Registro de Sistema",
			LOG_FILTER: 				"Filtro Log:",
			
			TYPE_EQ: 					"Tipo=",
			
			ALL: 						"TODOS",

			FIREWALL: 					"Cortafuegos", 
			NAT: 						"NAT",
			DDNS: 						"DNS dinámico",
			UPNP:						"UPnP",
			IMB:            			"Blindaje IP&MAC",
			IPTV:						"IPTV",
			DHCPS:						"Servidor DHCP",
			IGMP_PROXY:					"Proxy IGMP",
			DOMAIN_LOGIN:				"Iniciar sesión en dominio",
			BASIC_SECURITY: 			"Seguridad Básica",
			PARENTAL_CONTROL: 			"Control Parental",
			ACCESS_CONTROL: 			"Control de acceso",
			DOS_PROTECTION: 			"Protección DoS",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Estadísticas del tráfico",
			TIME_SETTINGS: 				"Configurarciones de la hora",
			ACCOUNT_MANAGEMENT: 		"Administración de cuentas",
			LOCAL_MANAGEMENT: 			"Administración Local",
			REMOTE_MANAGEMENT: 			"Control Remoto",
			LOCALE: 					"Local",
			FACTORY_RESET: 				"Reset de fábrica",
			LED_CONTROLLER: 			"Controlador Led",
			NETWORK: 					"Red",
			USBSHARE: 					"Compartir USB",
			AND: 						"y",
			LEVEL: 						"Nivel",
			EMERGENCY:					"EMERGENCIA",
			ALERT:						"ALERTA",
			CRITICAL:					"CRÍTICO",
			ERROR: 						"ERROR",
			WARNING: 					"PELIGRO",
			NOTICE: 					"NOTICIA",
			INFO: 						"INFO",
			DEBUG: 						"DEPURAR",

			INDEX: 						"Índice",
			TYPE: 						"Tipo",
			TIME: 						"Hora",
			LEVEL_COL:					"Nivel",

			CONTENT: 					"Contenido de registro",
			
			MAIL_LOG: 					"Registro electrónico",
			SAVE_LOG: 					"Guardar registro",

			SEND_OK: 					"Envío correcto",
			SEND_FAILED: 				"Fallo al enviar",

			MAIL_SETTING: 				"Configuración de correo",

 			FROM: 						"Desde",
 			TO: 						"Para",
 			SMTP_SERVER: 				"Servidor SMTP",
 			ENABLE_AUTHENTICATION: 		"Activar Autentificación",

 			USERNAME: 					"Nombre de usuario",
 			PASSWORD: 					"Contraseña",
 			CONFIRM_PASSWORD: 			"Confirmar Contraseña",

 			AUTO_MAIL: 					"Habilitar Correo Automático",
 			LOG_AT: 					"Registre a",
 			HH_MM: 						"(HH:MM) todos los días",

 			LOG_EVERY: 					"Registre todo",
 			HOURS: 						"Horas"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Configuración",
			STATUS: 					"Activar QoS",
			UPBANDWIDTH: 				"Ancho de banda de subida",
			DOWNBANDWIDTH: 				"Ancho de banda de bajada",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"kbps",
			TEST: 						"Prueba de velocidad",
			RULE_LIST: 					"Lista de reglas QoS",
			RULE: 						"Regla QoS",
			ID: 						"ID",
			NAME: 						"Nombre",
			TYPE: 						"Tipo",
			DETAIL: 					"Detalle",
			PRIORITY: 					"Prioridad",

			APPLICATION: 				"Aplicación",
			APPLICATION_LIST: 			"Lista de Aplicaciones",
			CUSTOM_APP: 				"Aplicación personalizada",
			MAC_ADDR: 					"Dirección MAC",
			MAC_ADDR_P: 				"MAC",
			IP_ADDR: 					"Dirección IP",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"Puerto físico",

			LOW: 						"Bajo",
			MIDDLE: 					"Medio",
			HIGH: 						"Alto",

			PROTO: 						"Protocolo",
			PORT: 						"Puerto",
			PROTO_P: 					"Protocolo",
			PORT_P: 					"Puerto",
			PORT_TIPS: 					"(XX o XX-XX,1.65535, al menos 5 pares)",

			ALL: 						"TODOS",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Personalizado",

			WIFI_HOME: 					"Equipo WIFI",
			WIFI_GUEST: 				"Invitado WIFI",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Actualizar versión de la  base de datos",

			NEWFILE: 					"Nuevo archivo de base de datos",
			FIRMWAREVERSION: 			"Versión de la base de datos",
			CONFIRM_CONTENT:			"¿Está seguro de que quiere actualizar la base de datos?",
			WARNING:					"Actualizando Base de datos… <br/> Por favor, no realice ninguna operación durante el proceso.",
			
			UPGRADE: 					"Actualizar versión",

			SERVICE_RESTART: 			"Reiniciando servicio QoS",
			
			TYPE: 						"Tipo",
			BY_DEVICE: 					"Por dispositivo",
			BY_APP: 					"Por aplicación",
			BY_PHY: 					"Por puerto físico",

			HIGH_PRIORITY_LBL: 			"Prioridad alta",
			MIDDLE_PRIORITY_LBL: 		"Prioridad media",
			LOW_PRIORITY_LBL: 			"Prioridad baja",

			HIGH_PRIORITY: 				"Prioridad alta",
			MIDDLE_PRIORITY: 			"Prioridad media",
			LOW_PRIORITY: 				"Prioridad baja"

		},

		APPLICATION:{
			APP_LIST: 					"Lista de aplicaciones",
			GAME_LIST: 					"Lista de juegos",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Estadísticas del tráfico",
			ENABLE_STATISTICS: 			"Estadísticas del tráfico",

			TITLE: 						"Lista de las estadísticas del tráfico",
			IP_MAC: 					"Dirección IP/Dirección MAC",
			TPKT: 						"Paquetes totales",
			TBYTE: 						"Bytes totales",
			CPKT: 						"Paquetes actuales",
			CBYTE: 						"Bytes actuales",
			CICMP: 						"ICMP Tx actual",
			CUDP: 						"UDP Tx actual",
			CSYN: 						"SYN Tx actual",
			
			DELETE_CONFIRM: 			"¿Está seguro de que quiere eliminar las estadísticas de tráfico?",
			DELETE_ALL_CONFIRM: 		"¿Está seguro de que quiere eliminar todas las estadísticas de tráfico?",

			RESET_ALL: 					"Resetear todo"
		},

		SYSPARA:{
			W24G: 						"Inalámbrico 2.4GHz",
			W5G: 						"Inalámbrico 5GHz",
			W60G: 						"Wi-Fi de 60GHz",
			W24G_WDS: 					"2,4GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"WDS de 60GHz",
			SWITCH_NOTICE:  			"Nota: Su función inalámbrica está desactivada. Si quiere usar esta función, por favor pulse en botón WiFi.",

			ENABLE_TIPS: 				"Su función inalámbrica está desactivada.",

			BEACON: 					"Intervalo Beacon",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"Umbral RTS",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"Umbral de fragmentación",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"Intervalo DTIM",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"Período de actualización de la clave de grupo",
			GROUPUNIT: 					"segundos",
			
			MU_MIMO_FEATURE: 			"MIMO Multiusuario",
			MU_MIMO: 					"Habilitar MU-MIMO",
			
			WMM_FEATURE: 				"Características WMM",
			WMM: 						"Habilitar WMM",

			GI_FEATURE: 				"Característica Intervalo de Guardia",
			GI: 						"Habilitar Intervalo de Guardia",

			AP_FEATURE: 				"Característica Aislamiento de AP",
			AP: 						"Habilitar Aislamiento AP",

			WDS_FEATURE: 				"Puente WDS",
			WDS: 						"Habilitar puente WDS",
			
			SSID_BRIDEGE: 				"SSID (para ser puenteada)",
			SURVEY: 					"Inspección",

			SN: 						"SN",
			MAC_ADDRESS: 				"Dirección MAC",
			SSID: 						"SSID",
			SIGNAL: 					"Señal",
			CHANNEL: 					"Canal",
			SECURITY: 					"Seguridad",
			CHOSEN: 					"Elegido",
			AP_NUMBER:					"Número AP",

			TOTAL: 						"Ítems totales",

			MAC: 						"Dirección MAC (a ser puenteada)",
			MACUNIT: 					"Ejemplo: 00-1D-0F-11-22-33",

			SECURITY: 					"Seguridad",
			NO: 						"No",
			NONE: 						"Sin seguridad",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Contraseña",
			
			AUTH_TYPE: 					"Tipo de autenticación",
			AUTO: 						"Auto",
			OPEN: 						"Sistema abierto",
			SHARED: 					"Clave compartida",

			WEP_INDEX: 					"Índice WEP",
			KEY1: 						"Clave1",
			KEY2: 						"Clave2",
			KEY3: 						"Clave3",
			KEY4: 						"Clave4",

			WEP_KEY_FORMAT: 			"Formato de clave WEP",
			ASC: 						"ASCII",
			HEX: 						"Hexadecimal",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Habilitar WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Habilitar NAT",
			
			NAT_BOOST: 					"NAT Boost",
			ENABLE_NAT_BOOST: 			"Habilitar NAT Boost",
			
			MEDIA_SERVER: 				"Servidor multimedia",
			SCAN_INTERVAL: 				"Intervalo de auto búsqueda (Horas)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"Configuración del nivel de protección DoS",

			ICMP: 						"Nivel de paquetes ICMP-FLOOD",
			UDP: 						"Nivel de paquetes UDP-FLOOD",
			TCP: 						"Nivel de paquetes TCP-FLOOD",

			WDS_MODE: 					"Modo WDS",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Bajo",
			MIDDLE: 					"Medio",
			HIGH: 						"Alto",

			TO: 						"Para",
			NOTICE_NAT_REBOOT: 			"Reiniciando.",

			NOTICE_NAT_BOOST: 			"La modificación de NAT Boost se hará efectiva cuando reinicie el dispositivo, ¿está seguro de que desea continuar?",
			NOTICE:						"El canal de su router no es el mismo que el canal del AP puenteado. ¿Quiere cambiarlo?",

			UNIT: 						"(5-7200)Paquetes/Segundos",
			LED: 						"LED",
			NIGHT_MODE: 				"Modo nocturno",
			PERIOD_NIGHT_TIME: 			"Período de modo noche",
			ENABLE: 					"Activar",
			HH_MM: 						"(HH:MM)",
			TO: 						"Para",
			NIGHT_MODE_NOTE:            "El LED está desactivado. Si desea utilizar esta función, pulse el botón LED o haga clic en el LED en la parte superior derecha de la página.",
			NOTE2:                      "El periodo correspondiente al modo nocturno se basa en la hora del sistema del router. Compruebe que se haya configurado la hora del router."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"No hay ningún certificado. <b>Genere</b> uno antes de habilitar el servidor VPN.",
			NO_CERT_NOTE2: 				"No hay ningún certificado. <b>Genere</b> uno antes de exportar la configuración.",
			ENABLE_VPN_SERVER: 			"Habilitar Servidor VPN",
			SERVICE_TYPE: 				"Tipo de servicio",
			SERVICE_PORT: 				"Puerto de servicio",
			VPN_SUBNET: 				"Subred/Máscara de red de VPN",
			CLIENTS_ACCESS: 			"Acceso cliente",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Solo red de hogar",
			INTERNET_HOME: 				"Internet y red de hogar",
			CERT_STR: 					"No hay ningún certificado. Haga clic en Aceptar para generar uno y guardar su configuración.",
			CERT_STR2: 					"No hay ningún certificado. Haga clic en Aceptar para generar uno y exportar su configuración.",
			CONF_FILE: 					"Configuration Type", 
			EXPORT_CONF_FILE: 			"Esportar la configuración",
			EXPORT: 					"Exportar",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"Dirección IP cliente",
			ACCOUNT_USERNAME: 			"Nombre de usuario",
			ACCOUNT_PASSWORD: 			"Contraseña",
			CLIENT_IP_NOTE: 			"(hasta 10 clientes)",
			SAME_SUBNET_NOTE: 			"La dirección IP del cliente y la dirección IP de la LAN no pueden estar en la misma subred. <br/> Introduzca otra dirección.",
			CONFLICT_WITH_DHCP: 		"La dirección IP del cliente está en conflicto con el grupo de direcciones IP de DHCP. <br/>Vuelva a intentarlo.",
			CONFLICT_WITH_RESERVED: 	"La dirección IP del cliente está en conflicto con la dirección IP reservada. <br/>Vuelva a intentarlo.",
			CONFLICT_WITH_OPENVPN: 		"La dirección IP del cliente y la dirección IP de OpenVPN no pueden estar en la misma subred. <br/>Vuelta a intentarlo.",
			SAME_SUBNET_NOTE2: 			"La subred/máscara de red de VPN y la dirección IP de la LAN no pueden estar en la misma subred. <br/>Vuelva a intentarlo.",
			CONFLICT_WITH_DHCP2: 		"La subred/máscara de red de VPN está en conflicto con el grupo de direcciones IP de DHCP. <br/>Vuelva a intentarlo.",
			CONFLICT_WITH_RESERVED2: 	"La subred/máscara de red de VPN está en conflicto con la dirección IP reservada. <br/>Vuelva a intentarlo.",
			CONFLICT_WITH_PPTPVPN: 		"La subred/máscara de red de VPN y la dirección IP de PPTP VPN no pueden estar en la misma subred. <br/>Vuelva a intentarlo.",
			LAN_CONFLICT_WITH_OPENVPN: 	"La dirección IP de la LAN y la dirección IP de OpenVPN no pueden estar en la misma subred. <br/>Vuelva a intentarlo.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"La dirección IP de la LAN y la dirección IP de PPTP VPN no pueden estar en la misma subred. <br/>Vuelva a intentarlo.",
			VPN_MASK_ERROR: 			"La máscara de red no puede ser mayor que 255.255.255.248. <br/>Vuelva a introducirla.",
			ACCOUNT_LIST: 				"Lista de cuentas (hasta 16 usuarios)",
			ADVANCED_SETTING: 			"Avanzado",
			ALLOW_SAMBA: 				"Permitir acceso a Samba (sitio de red)",
			ALLOW_NETBIOS: 				"Permitir passthrough de NetBIOS",
			ALLOW_UNENCRYPTED_CONN: 	"Permitir conexiones no cifradas",
			USERNAME_CONFLICT: 			"Este nombre de usuario ya existe. Introduzca otro.",
				
			NOTICE_VS_CONFLICT:			"En conflicto con el puerto externo del servidor virtual. Introduzca otro puerto.",
			NOTICE_PT_CONFLICT:			"En conflicto con el puerto externo de activación de puertos. Introduzca otro puerto.",
			NOTICE_VS_MODIFY:			"En conflicto con el puerto externo (1723) del servidor virtual. Vaya a la página  <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">Servidores virtuales</a> y modifique el puerto externo del servidor virtual.",
			NOTICE_PT_MODIFY:			"En conflicto con el puerto externo de activación de puertos (1723). Vaya a la página <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Activación de puertos</a> y modifique el puerto externo de activación de puertos.",
			
			GENERATE_CERT: 				"Certificado",
			GENERATE_NEW_CERT: 			"Genere el certificado.",
			GENERATE: 					"Generar",
			GENERATE_TIPS: 				"Generando certificado…<br/>Tardará unos minutos, espere…",
			CERT_SUCCESS: 				"¡Listo!",
			CERT_FAIL: 					"Error, vuelva a intentarlo.",
			
			VPN_CONNECTIONS: 			"Conexiones VPN",
			OPEN_VPN_CONNECTIONS: 		"Conexión OpenVPN",
			PPTP_VPN_CONNECTIONS: 		"Conexión PPTP VPN",
			USER: 						"Usuario",
			REMOTE_IP: 					"IP remota",
			ASSIGNED_IP: 				"IP asignada"
		}
	};
})(jQuery);
