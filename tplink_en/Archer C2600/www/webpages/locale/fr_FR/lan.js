(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			FORGET_PASSWORD: 			"Mot de passe oublié ?",
			LOGIN: 						"Connexion",
			IMPORTANT_UPDATE_INFO: 		"Pour éviter un conflit avec l'appareil en amont, l'adresse IP de votre routeur à été modifiée comme suit :",
			CONTINUE: 					"Continuer",

			IMPORTANT_NOTICE: 			"Information importante",
			OR: 						", êtes vous sûr de vouloir continuer à visiter ",
			END: 						".",
			END2: 						" ? ",

			FORGET_PASSWORD_INFO_0: 	"Maintenir appuyé le bouton reset 10 secondes le bouton reset du routeur pour le réinitialiser à ses paramètres d'usine.",
			FORGET_PASSWORD_INFO_1: 	"Si la fonction de récupération du Mot de passe est active. Un code de vérification va être envoyé à l'adresse Email définie pour réinitialiser le nom d'utilisateur et le Mot de passe.",
			FORGET_PASSWORD_SEND_FAILED:"Echec de l'envoi du code ! Merci de vérifier votre connexion à internet.",

			VERIFICATION_CODE: 			"Code de vérification",

			RECEIVE_CODE: 				"Envoi du Code",

			CONFIRM: 					"Confirmer",

			SEC: 						"s",

			USER_CONFLICT: 				"Conflit de connexion !",
			FIRST_TIME: 				"Bienvenu dans l'interface de l'Archer AD7200 conçu en Chine par TP-LINK. Pour commencer, merci de créer un mot de passe d'administration.",
			
			USER_CONFLICT_INFO: 		"L'utilisateur %USER% utilisant la configuration %HOST% (%IP%/%MAC%) est connecté au routeur. Vous ne pouvez pas vous connecter en même temps. Merci d'essayer plus tard.",
			USER_CONFLICT_INFO_1: 		"L'utilisateur %USER% (%MAC%) est actuellement connecté au routeur. Vous ne pouvez pas vous connecter simultanément. Merci de réessayer plus tard.",
			USER_CONFLICT_INFO_2: 		"L'utilisateur %USER% (%IP%)  est connecté au routeur. Vous ne pouvez pas vous connecter en même temps. Merci d'essayer plus tard.",
			
			LOGIN_FAILED: 				"Erreur de connexion !",
			LOGIN_FAILED_COUNT: 		"La connexion a échoué  %num1 fois et Il vous reste  %num2 essai(s).",
			NO_COOKIE: 					"Les cookies doivent être autorisés pour vous connecter. Merci d'autoriser les cookies ou de sortir du mode Privé/Incognito de votre navigateur.", 

			FORGET_PASSWORD_NOTE: 		"Si vous n'avez pas configuré la fonction de récupération du Mot de passe. Vous pouvez maintenir appuyé 10 secondes le bouton reset du routeur pour le réinitialiser à ses paramètres d'usine."
		},

		UPGRADE: {
			UPGRADE_NOW: 					"Mettre à jour maintenant",
			REMIND: 						"Me le rappeler plus tard.",
			NOTICE:    						"Bonjour, un nouveau firmware est disponible pour le routeur %PRODUCT%.",
			NEVER: 							"Ignorer cette version"
			
		},

		WAN_ERROR: {
			TITLE: 							"Erreur de connexion WAN !",
			STATUS: 						"Etat",
			INFO: 							"Information",
			SETUP: 							"Paramétrer une connexion internet",
			NEVER: 							"Ne pas me le rappeler"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"Version logicielle",
			HARDWARE_VERSION: 				"Version matérielle",
			HELP_SUPPORT: 					"Support",
			FAQ: 							"Questions Fréquentes (FAQ)",
			CONFIRM_REBOOT: 				"Etes vous certain de vouloir redémarrer le routeur ?",
			CONFIRM_LOGOUT: 				"Etes vous certain de vouloir vous déconnecter ?",
			UPGRADE_ALERT_1: 				"Le firmware actuel ne supporte pas le service Cloud TP-LINK. Nous vous recommandons fortement de télécharger le firmware le plus récent depuis ww.tp-link.fr puis de l'installer.",
			UPGRADE_ALERT_2: 				"Le firmware actuel ne supporte pas le service Cloud TP-LINK. Nous vous recommandons fortement de le mettre à jour en cliquant sur l'icône Mise à jour dans le coin supérieur droit.",
			REBOOTING: 						"Redémarrage... <br/> Ne pas utiliser pendant le redémarrage.",

			MODE_SWITCH: 					"Mode Switch",
			ACCESS_POINT: 					"Point d'accès",
			ACCESS_POINT_TIPS: 				"Pour configurer le réseau filaire en réseau Wi-Fi.",
			ROUTER: 						"Routeur",
			ROUTER_TIPS: 					"Pour permettre à plusieurs appareils de se connecter en Wi-Fi ou en Ethernet.",
			REPEATER: 						"Répéteur",
			REPEATER_TIPS: 					"Pour étendre la portée de votre réseau Wi-Fi",
			MODE_REBOOT_TIP: 				"Le changement de mode implique le redémarrage de l'appareil, êtes vous sûr de vouloir continuer ?",
			MODE_FAIL_TIP: 					"Echec du passage au mode Switch, merci de réessayer ou de redémarrer votre routeur."
		},

		NAV: {
			QUICK_SETUP: 				"Configuration rapide",
			BASIC: 						"Configuration Basique",
			ADVANCED: 					"Configuration Avancée"
		},

		CONTROL: {
			MODE: 						"Mode",
			LOGIN: 						"Se connecter",
			LED:                        "DEL",
			LED_ON:                     "DEL Allumée",
			LED_OFF:                    "DEL Eteinte",			
			LED_DISABLED:               "L'tat de la DEL ne peut être modifié pendant la période d'activité du mode nuit",			
			LOGOUT: 					"Se déconnecter",
			UPDATE: 					"Mise à jour",
			REBOOT: 					"Redém-arrer"
		},

		LANGUAGE: {
			EN_US: 						"English"
		},

		REGION: {
			ALBANIA: 					"Albanie",
			ALGERIA: 					"Algérie",
			AMERICAN_SAMOA: 			"Samoa américaines",
			ARGENTINA: 					"Argentine",
			ARMENIA: 					"Arménie",
			ARUBA: 						"Aruba",
			AUSTRALIA: 					"Australie",
			AUSTRIA: 					"Autriche",
			AZERBAIJAN: 				"Azerbaïdjan",
			BAHAMAS: 					"Bahamas",
			BAHRAIN: 					"Bahreïn",
			BANGLADESH: 				"Bangladesh",
			BARBADOS: 					"Barbade",
			BELARUS: 					"Belarus",
			BELGIUM: 					"Belgique",
			BELIZE: 					"Belize",
			BERUMUDA: 					"Bermudes",
			BOLIVIA: 					"Bolivie",
			BOSNIA_HERZEGOWINA: 		"Bosnie Herzégovine",
			BRAZIL: 					"Brésil",
			BRUNEI_DARUSSALAM: 			"Brunei ",
			BULGARIA: 					"Bulgarie",
			CAMBODIA: 					"Cambodge",
			CANADA: 					"Canada",
			CAYMAN_ISLANDS: 			"Iles Cayman",
			CHILE: 						"Chili",
			CHINA: 						"Chine",
			COLOMBIA: 					"Colombie",
			COSTA_RICA: 				"Costa Rica",
			CROATIA: 					"Croatie",
			CYPRUS: 					"Chypre",
			CZECH_REPUBLIC: 			"République Tchèque",
			DENMARK: 					"Danemark",
			DOMINICAN_REPUBLIC: 		"République Dominicaine",
			ECUADOR: 					"Equateur",
			EGYPT: 						"Egypte",
			EL_SALVADOR: 				"Salvador",
			ESTONIA: 					"Estonie",
			ETHIOPIA: 					"Ethiopie",
			FAEROE_ISLANDS: 			"Iles Féroé",
			FINLAND: 					"Finlande",
			FRANCE: 					"France",
			FRENCH_GUIANA: 				"Guyane Française",
			FRENCH_POLYNESIA: 			"Polynésie Française",
			GEORGIA: 					"Géorgie",
			GERMANY: 					"Allemagne",
			GREECE: 					"Grèce",
			GREENLAND: 					"Groenland",
			GRENADA: 					"Grenade",
			GUADELOUPE: 				"Guadeloupe",
			GUAM: 						"Guam",
			GUATEMALA: 					"Guatemala",
			HAITI: 						"Haïti",
			HONDURAS: 					"Honduras",
			HONG_KONG: 					"Hong Kong",
			HUNGARY: 					"Hongrie",
			ICELAND: 					"Islande",
			INDIA: 						"Inde",
			INDONESIA: 					"Indonésie",
			IRAN: 						"Iran",
			IRAQ: 						"Irak",
			IRELAND: 					"Irlande",
			ISRAEL: 					"Israël",
			ITALY: 						"Italie",
			JAMAICA: 					"Jamaïque",

			JAPAN: 						"Japon",
			JAPAN_1: 					"Japon 1",
			JAPAN_2: 					"Japon 2",
			JAPAN_3: 					"Japon 3",
			JAPAN_4: 					"Japon 4",
			JAPAN_5: 					"Japon 5",
			JAPAN_6: 					"Japon 6",

			JORDAN: 					"Jordanie",
			KAZAKHSTAN: 				"Kazakhstan",
			KENYA: 						"Kenya",

			NORTH_KOREA: 				"Corée du Nord",
			KOREA_REPUBLIC: 			"Corée du Sud",
			KOREA_REPUBLIC_3: 			"Corée du Sud 3",

			KUWAIT: 					"Koweït",
			LATVIA: 					"Lettonie",
			LEBANON: 					"Liban",
			LIBYA: 						"Libye",
			LIECHTENSTEIN: 				"Liechtenstein",
			LITHUANIA: 					"Lituanie",
			LUXEMBOURG: 				"Luxembourg",
			MACAU: 						"Macao",
			MACEDONIA: 					"Macédoine",
			MALAWI: 					"Malawi",
			MALAYSIA: 					"Malaisie",
			MALDIVES: 					"Maldives",
			MALTA: 						"Malte",
			MARTHINIQUE: 				"Martinique",
			MAURITIUS: 					"Maurice",
			MAYOTTE: 					"Mayotte",
			MEXICO: 					"Mexique",
			MONACO: 					"Monaco",
			MONGOLIA: 					"Mongolie",
			MOROCCO: 					"Maroc",
			NEPAL: 						"Népal",
			NETHERLANDS: 				"Hollande",
			NETHERLANDS_ANTILLES: 		"Antilles néerlandaises",
			
			NEW_ZEALAND: 				" Nouvelle Zélande",
			NICARAGUA: 					"Nicaragua",
			NIGERIA: 					"Nigeria",
			NORWAY: 					"Norvège",
			NORTHERN_MARIANA_ISLANDS: 	"Iles Mariannes nord",
			OMAN: 						"Oman",
			PAKISTAN: 					"Pakistan",
			PANAMA: 					"Panama",
			PAPUA_NEW_GUINEA: 			"Papouasie nouvelle guinée",
			PARAGUAY: 					"Paraguay",
			PERU: 						"Pérou",
			PHILIPPINES: 				"Philippines",
			POLAND: 					"Pologne",
			PORTUGAL: 					"Portugal",
			PUERTO_RICO: 				"Porto Rico",
			QATAR: 						"Qatar",
			REUNION: 					"Ile de la réunion",
			ROMANIA: 					"Roumanie",
			RUSSIA: 					"Russie",
			RWANDA: 					"Rwanda",
			SAMOA: 						"Samoa",
			SAUDI_ARABIA: 				"Arabie Saoudite",
			SINGAPORE: 					"Singapour",
			SLOVAK_REPUBLIC: 			"Slovaquie",
			SLOVENIA: 					"Slovénie",
			SOUTH_AFRICA: 				"Afrique du Sud",
			SPAIN: 						"Espagne",
			SRI_LANKA: 					"Sri Lanka",
			SURINAME: 					"Surinam",
			SWEDEN: 					"Suède",
			SWITZERLAND: 				"Suisse",
			SYRIA: 						"Syrie",
			TAIWAN: 					"Taiwan",
			TANZANIA: 					"Tanzanie",
			THAILAND: 					"Thaïlande",
			TRINIDAD_TOBAGO: 			"Trinidad et Tobago",
			TUNISIA: 					"Tunisie",
			TURKEY: 					"Turquie",
			UGANDA: 					"Ouganda",
			UKRAINE: 					"Ukraine",
			UNITED_ARAB_EMIRATES: 		"Emirats Arabes Unis",
			UNITED_KINGDOM: 			"Royaume Uni",
			UNITED_STATES: 				"Etats Unis d'Amérique",
			URUGUAY: 					"Uruguay",
			UZBEKISTAN: 				"Ouzbékistan",
			VENEZUELA: 					"Venezuela",
			VIETNAM: 					"Viêt-Nam",
			VIRGIN_ISLANDS: 			"Iles Vierges (USA)",
			YEMEN: 						"Yémen",
			ZIMBABWE: 					"Zimbabwe"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) Eniwetok, Kwajalein", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) Midway ,Samoa",
			HAWAII: 					"(GMT-10:00) Hawaï",
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
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) Açores, Cap Vert",
			GREENWICH_MEAN_TIME: 		"(GMT) Greenwich Mean Time, Dublin, Londres",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) Berlin, Stockholm, Rome, Paris, Bruxelles",
			ATHENS_HELSINKI: 			"(GMT+02:00) Athènes, Helsinki, Eastern Europe, Israël",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) Bagdad, Koweït, Nairobi, Ryad, Moscou",

			TEHERAN: 					"(GMT+03:30) Téhéran",

			ABU_DHABI: 					"(GMT+04:00) Abu Dhabi, Muscat, Kazan, Volgograd",

			KABUL: 						"(GMT+04:30) Kaboul",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) Islamabad, Karachi, Ekaterinbourg",

			MADRAS_CALCUTTA: 			"(GMT+05:30) Madras, Calcutta, Bombay, New Delhi",
			KATMANDU: 					"(GMT+05:45) Katmandu",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) Alma-Ata, Dhaka",
			RANGOON: 					"(GMT+06:30) Rangoon",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) Bangkok, Jakarta, Hanoi",
			BEIJING_HONGKONG: 			"(GMT+08:00) Pékin, Hong Kong, Perth, Singapour",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) Tokyo, Osaka, Sapporo, Seoul, Iakutsk",

			ADELAIDE: 					"(GMT+09:30) Adelaïde",

			BRISBANE_CANBERRA: 			"(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) Magadan, Solomon Is., New Calédonie",
			FIJI_KAMCHATKA: 			"(GMT+12:00) Fiji, Kamchatka, Auckland",
			NUKU: 						"(GMT+13:00) Nuku’alofa"
		},

		APPLIST:{
			APP:						"Application",
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
			DAY: 						"Jour",

			MONDAY: 					"Lundi",
			TUESDAY: 					"Mardi",
			WEDNESDAY: 					"Mercredi",
			THURSDAY: 					"Jeudi",
			FRIDAY: 					"Vendredi",
			SATURDAY: 					"Samedi",
			SUNDAY: 					"Dimanche",
			
			MON: 						"Lun.",
			TUES: 						"Mar.",
			WED: 						"Mer.",
			THUR: 						"Jeu.",
			FRI: 						"Ven.",
			SAT: 						"Sam.",
			SUN: 						"Dim.",

			JAN: 						"Jan.",
			FEB: 						"Fév.",
			MAR: 						"Mar.",
			APR: 						"Avr.",
			MAY: 						"Mai.",
			JUN: 						"Juin",
			JUL: 						"Juil",
			AUG: 						"Aou.",
			SEP: 						"Sep.",
			OCT: 						"Oct.",
			NOV: 						"Nov.",
			DEC: 						"Déc."

		},

		HOUR: {
			AM_1: 						"01 H.",
			AM_2: 						"02 H.",
			AM_3: 						"03 H.",
			AM_4: 						"04 H.",
			AM_5: 						"05 H.",
			AM_6: 						"06 H.",
			AM_7: 						"07 H.",
			AM_8: 						"08 H.",
			AM_9: 						"09 H.",
			AM_10: 						"10 H.",
			AM_11: 						"11 H.",
			AM_12: 						"12 H.",
			PM_1: 						"13 H.",
			PM_2: 						"14 H.",
			PM_3: 						"15 H.",
			PM_4: 						"16 H.",
			PM_5: 						"17 H.",
			PM_6: 						"18 H.",
			PM_7: 						"19 H.",
			PM_8: 						"20 H.",
			PM_9: 						"21 H.",
			PM_10: 						"22 H.",
			PM_11: 						"23 H.",
			PM_12: 						"24 H."
		},

		ORDER: {
			"1ST": 						"Premier",
			"2ND": 						"2ème",
			"3RD": 						"2ème",
			"4TH": 						"3ème",
			"5TH": 						"Dernier",
			"1ST_": 					"1er",

			TH: 						" "
		},

		GRID: {
			CLIENT_NUMBER: 				"Client N°",

			ID: 						"N°",
			MODIFY: 					"Modifier",
			STATUS: 					"Etat",
			ENABLE: 					"Activer",

			OPERATION: 					"Action",
			CHOOSE: 					"Sélectionner",
			DESCRIPTION: 				"Description",
			

			AUTO_REFRESH: 				"Actualisation auto",
			REFRESH: 					"Actualiser",
			NUMBER: 					"Numéro",
			ENABLED: 					"Activé",
			DISABLED: 					"Désactivé",
			ACTIVE: 					"Actif",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"Ajouter",
			CHOOSE: 					"Sélectionner",
			EDIT: 						"Editer",
			DELETE: 					"Supprimer",
			DELETE_ALL: 				"Tout supprimer",
			REMOVE: 					"Enlever",
			RESET: 						"Réinitialiser",
			RESET_ALL: 					"Tout réinitialiser",
			DETECT: 					"Détecter",
			ENABLE: 					"Activer",
			DISABLE: 					"Désactiver",
			PAUSE:						"Pause",
			RESUME:						"Reprendre",
			
			REFRESH: 					"Actualiser",
			SEARCH: 					"Cherche...",
			BROWSE: 					"Naviguer",

			SAVE: 						"Sauvegarder",
			BACK: 						"Retour",

			PREV: 						"Précédant",
			NEXT: 						"Suivant",
			FINISH: 					"Terminé",
			
			ON: 						"Actif",
			OFF: 						"Inactif",
			LOW: 						"Faible",
			MIDDLE: 					"Moyen",
			HIGH: 						"Elevé",
			
			OK: 						"OK",
			CANCEL: 					"Annuler",

			YES: 						"Oui",
			NO: 						"Non",
			
			CONNECTED: 					"Connecté",
			CONNECTING: 				"Connexion",
			DISCONNECTING: 				"Déconnexion",
			DISCONNECTED: 				"Déconnecté",

			PASSWORD_HINT: 				"Mot de passe",
			FILEBUTTONTEXT: 			"Naviguer",
			FILEBLANKTEXT: 				"Merci de choisir un fichier.",
			NOSELECTEDTEXT: 			"Choisir les options.",

			ADD_A_NEW_KEYWORD: 			"Ajouter un mot clé",

			SUCCESSED: 					"Réussi !",
			FORM_SAVED: 				"Sauvegardé",
			FORM_FAILED: 				"Echoué",
			GRID_ID_COLUMN: 			"N°",
			GRID_SAVED: 				"Sauvegardé",
			GRID_FAILED: 				"Echoué",
			GRID_NONE_SELECT: 			"Merci de sélectionner une entrée.",
			GRID_DELETE_COMFIRM: 		"Etes vous sûr de vouloir supprimer ces entrées ?",
			GRID_DELETE_ALL_COMFIRM: 	"Etes vous sûr de vouloir supprimer toutes ces entrées ?",
			GRID_MAX_RULES: 			"Nombre d'entrées maximum dépassé.",
			KEYWORD_MAX_OVERFLOW: 		"Le nombre de mot clés excède la limite.",

			NOTE: 						"Remarque:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"Format incorrect.",
			BLANKTEXT: 					"Ce champ est requis.",

			EMAIL: 						"Adresse email incorrecte.",
			NUMBER: 					"Format incorrect.",

			NUMBER_MIN: 				"Valeur incorrecte. Merci de saisir un nombre supérieur à %min.",
			NUMBER_MAX: 				"Valeur incorrect. Merci de saisir un nombre inférieur à %max.",

			NUMBER_MIN_MAX: 			"Valeur incorrecte. Merci de saisir un nombre compris entre %min et %max.",
			HEX: 						"Le champ doit contenir un nombre hexadécimal.",

			IP: 						"Format incorrect.",

			IP_NO_ALL_ZERO:				"l'adresse IP ne peut pas être 0.0.0.0.",
			IP_NO_LOOP:					"l'adresse IP ne peut pas être l'adresse de bouclage.",
			IP_NO_D_TYPE:				"L'adresse IP ne peut être de classe D.",
			IP_NO_E_TYPE:				"L'adresse IP ne peut être de classe D.",
			IP_NO_ALL_ONE:				"L'adresse IP ne peut pas être : 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"L'adresse IP ne peut commencer par 255.",
			IP_NO_FIRST_ZERO:			"L'adresse IP ne peut commencer par 0.",
			MASK_NO_ALL_ONE:			"Le masque ne peut être 255.255.255.255.",

			IPV6: 						"Format incorrect.",
			IPV6_NOT_GLOBAL:			"Format incorrect.",
			IPV6_NOT_PREFIX:			"Format incorrect.",
			IP_DOMAIN: 					"Format incorrect.",
			IPV6_DOMAIN: 				"Format incorrect.",
			PPTP_INVALID_IP:			"Adresse IP invalide.",
			MAC: 						"Format incorrect.",
			MULTI_MAC:					"Format incorrect.",
			MAC_INVALID_BROADCAST:		"L'adresse MAC ne peut être une adresse Broadcast.",
			MAC_INVALID_MULTICAST:		"L'adresse MAC ne peut être une adresse Multicast.",
			DATE: 						"Format incorrect.",
			DATE_INVALID: 				"Merci d'entrer une date comprise entre 01/01/1970 et 31/12/2030.",
			MASK: 						"Format incorrect.",
			DOMAIN: 					"Format incorrect.",
			STRING_DOMAIN:              "Format incorrect.",
			USER: 						"Format incorrect.",
			NOTE: 						"Format incorrect.",
			PWD: 						"Format incorrect.",
			SSID: 						"Format incorrect.",
			NAME:						"Format incorrect.",
			ASCII_VISIBLE:				"Format incorrect.",
			STRING_VISIBLE:				"Format incorrect.",
			STRING_VISIBLE_NO_COMMA:    "Format incorrect.",
			STRING_VISIBLE_ALLOW_BLANK: "Format incorrect.",
			VPN_NAME_PWD: 				"Merci de saisir 1 à 15 lettres, chiffre ou -et_."
		},


		ERROR: {			
			"00000001":					"Type de fichier incorrect.",
			"00000002":					"Erreur de somme de contrôle.",
			"00000003":					"Le fichier est trop volumineux.",
			"00000004":					"Erreur de téléversement.",
			"00000005":					"Erreur de redémarrage.",
			"00000006":					"Erreur non définie.",
			"00000007":					"L'élément existe déjà, merci de refaire la saisie.",

			"00000009":					"Port incorrect.",
			"00000010":					"Le port est un nombre.",

			"00000011":					"Le nom d'utilisateur doit être identique à la valeur De.",
			"00000012": 				"le nom d'utilisateur doit commencer par une lettre.",

			"00000021":					"Format incorrect.",

			"00000032": 				"La valeur doit être inférieure à faible.",
			"00000033": 				"La valeur doit être inférieure à moyenne et faible.",
			"00000034": 				"Valeur incorrecte, merci de saisir un nombre compris entre 5 et 7200.",

			"00000039": 				"Merci d'utiliser la valeur par défaut : 0 ou saisir une valeur comprise entre 30 et 86400.",
			"00000040": 				"le SSID et l'adresse MAC sont requis.",

			"00000042": 				"Merci d'utiliser la valeur par défaut : 80 ou saisir une valeur comprise entre 1024 et 65535.",

			"00000045": 				"La passerelle par défaut et l'adresse IP LAN doivent être dans le même sous-réseau. Merci de refaire la saisie.",

			"00000046": 				"L'adresse IP et l'adresse MAC ne peuvent être non renseignées, merci de compléter ces champs.",
			"00000047": 				"L'adresse IP LAN et la plage DHCP doivent être dans le même sous réseau. Merci de refaire la saisie.",

			
			"00000049":					"Réseau de destination incorrect.",

			"00000050": 				"Adresse IP de serveur DNS incorrecte, Merci de saisir une autre adresse IP.",
			"00000051": 				"Cette adresse MAC existe déjà. Merci de refaire la saisie.",
			"00000052": 				"L'adresse IP existe déjà. Merci d'en saisir une autre.",

			"00000053": 				"l'adresse IP de départ ne peut être plus grande que l'adresse IP de fin. <br/>Merci de refaire la saisie.",

			"00000054": 				"L'adresse IP LAN et la plage DHCP doivent être dans le même sous réseau. Merci de refaire la saisie.",

			"00000055": 				"L'adresse IP ne peut être identique à l'adresse IP LAN.",

			"00000056": 				"L'adresse IP distante et l'adresse IP LAN ne peuvent être dans le même sous réseau. Merci de refaire la saisie.",

			"00000057": 				"Mot de passe PSK incorrect, merci de refaire la saisie.",
			"00000058": 				"Mot de passe WEP incorrect, merci de refaire la saisie.",

			"00000059": 				"Masque de sous-réseau et adresse MAC invalides, merci de refaire les saisies.",

			"00000060": 				"L'adresse IP WAN et l'adresse IP LAN ne peuvent être dans le même sous réseau.<br/>Merci de refaire la saisie.",

			"00000061": 				"L'heure de début doit être antérieure à l'heure de fin.",

			"00000062": 				"Ce champ est requis.",
			"00000063": 				"Ce champ est requis.",

			"00000064": 				"Il est impossible de bloquer le client administrant actuellement le routeur",
			"00000065": 				"Cet élément est en conflit avec un autre merci de vérifier.",
			
			"00000066": 				"Le Mot de passe doit comporter entre 8 et 63 caractères ou 64 caractères hexadécimaux.",
			"00000067": 				"Le Mot de passe doit comporter 10 caractères hexadécimaux.",
			"00000068": 				"Le Mot de passe doit comporter 5 caractères ASCII.",
			"00000069": 				"Le Mot de passe doit comporter 26 caractères hexadécimaux.",
			"00000070": 				"Le Mot de passe doit comporter 13 caractères ASCII.",
			"00000071": 				"Le Mot de passe doit comporter 32 caractères hexadécimaux.",
			"00000072": 				"Le Mot de passe doit comporter 16 caractères ASCII.",
			"00000073": 				"Le Mot de passe doit comporter moins de 64 caractères.",

			"00000074": 				"Type de fichier incorrect.",

			"00000075": 				"Le code pin doit comporter 8 chiffres.",

			"00000076": 				"La saisie est en conflit avec d'autres préexistantes, merci de vérifier port et protocole de déclenchement.",
			"00000077": 				"L'adresse IP ne peut être identique à l'adresse IP LAN.",
			"00000078": 				"l'adresse IP de l'hôte ne peut être dans le même sous réseau que l'adresse IP LAN.",

			"00000080": 				"Erreur de confirmation du Mot de passe, merci de recommencer.",

			"00000083": 				"La passerelle ne peut être identique à l'adresse IP.",
			"00000084": 				"Le DNS primaire ne peut être identique à l'adresse IP.",
			"00000085": 				"Le DNS secondaire ne peut être identique à l'adresse IP.",
			"00000086": 				"Le DNS primaire ne peut être identique au DNS secondaire.",

			"00000088": 				"Cette action n'est pas autorisée pour l'administration distante.",
			"00000089": 				"Vous avez dépassé dix essais, merci d'essayer dans deux heures.",

			"00000090": 				"l'adresse IP de destination ne peut être l'adresse IP LAN.",
			"00000091": 				"l'adresse IP de destination ne peut être l'adresse IP WAN.",

			"00000092": 				"La passerelle par défaut et l'adresse IP LAN doivent être dans le même sous-réseau. <br/> Merci de refaire la saisie.",
			"00000093": 				"L'adresse IP WAN et l'adresse IP LAN ne peuvent être dans le même sous réseau. Merci de refaire la saisie.",

			"00000094": 				"Les ID de VLAN ne peuvent être identiques.",
			"00000095": 				"Au moins un port internet requis.",

			"00000096": 				"Le mot existe déjà.",

			"00000097": 				"Les réglages définis pour les fréquences 2.4GHz ne seront pas actifs tant que le bouton Wi-Fi n'est pas sur la position ON.",
			"00000098": 				"Les réglages définis pour les fréquences 5GHz ne seront pas actifs tant que le bouton Wi-Fi n'est pas sur la position ON.",
			"00000099": 				"Les réglages définis pour les fréquences 2.4GHz et 5GHz ne seront pas actifs tant que le bouton Wi-Fi n'est pas sur la position ON.",

			"00000100": 				"Le réseau 5GHz n'est pas disponible en raison des restrictions qui s'appliquent dans votre pays.",
			"00002100": 				"Le réseau Wi-Fi 60GHz n'est pas disponible en raison de restrictions dans votre région/pays.",

			"00000101": 				"Le signal Wi-Fi est désactivé. Si vous souhaitez utiliser le Wi-Fi, placez le bouton Wi-Fi sur la position ON.",
			"00000102": 				"Le signal Wi-Fi est désactivé. Si vous souhaitez utiliser le Wi-Fi, placez le bouton Wi-Fi sur la position ON.",
			"00002102": 				"Le signal Wi-Fi est désactivé. Si vous souhaitez utiliser le Wi-Fi, placez le bouton Wi-Fi sur la position ON.",

			"00000103": 				"Le signal Wi-Fi est désactivé. Si vous souhaitez utiliser le Wi-Fi, placez le bouton Wi-Fi sur la position ON.",
			"00000104": 				"Le signal Wi-Fi est désactivé.",

			"00000105": 				"QoS et IPTV ne peuvent être activés simultanément.",

			"00000106": 				"L'adresse IP ne peut être identique à l'adresse IP LAN.",
			
			"00000107": 				"La destination existe déjà.",

			"00000110": 				"l'adresse IP et l'adresse LAN IP doivent être dans le même sous réseau.",
			
			"00000111": 				"QoS et <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> ne peuvent être activés en même temps.",
			"00000112": 				"La fonction WDS peut fonctionner en 2.4GHZ ou en 5GHz.",
			"00000113": 				"WDS et réseau invités ne peuvent être activés en même temps.",
			"00000114": 				"Les statistiques de trafic et <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT Boost</a> ne peuvent être activés en même temps.",

			"00000117": 				"Le nom de domaine existe déjà.",
			"00000118": 				"Le nombre de nom de domaine excède la limite.",
			"00000119":					"NAT Boost sera désactivé quand la <a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> ou les <a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">Statistiques de trafic</a> sont actifs.",

			"00000120": 				"Le Mot de passe doit comporter entre 5 et 13 caractères ASCII.",
			"00000121": 				"Le Mot de passe doit comporter entre 10 et 26 caractères hexadécimaux.",
			"00000122": 				"Le nom d'utilisateur ou le mot de passe est non renseigné, êtes vous sûr de vouloir continuer ?",
			"00000123": 				"Sauvegarde… Merci de ne pas utiliser pendant ce processus.",
			"00000124": 				"Le code PIN du routeur est bloqué en raison d'un nombre excessif de connexions avec un code erroné. Merci de générer un nouveau code.",

			"00000125": 				"Le nombre de règles de QoS excède la limite.",
			"00000126": 				"La taille du fichier excède la limite.",
			"00000127": 				"Le contenu du fichier est incorrect.",
			"00000128": 				"Merci de choisir au moins une application.",
			"00000129": 				"Merci de choisir au moins un port physique.",
			"00000130":					"La fonction WPS est désactivée.",
			"00000131": 				"L'adresse du serveur NTP ne peut être une adresse de bouclage.",
			"00000132": 				"Echec du mode switch. Merci de réessayer ou de redémarrer le routeur.",
			"00000133": 				"Adresse IP de DMZ incorrecte. Merci d'en saisir une autre.",
			"00000134":  				"Adresse IP interne incorrecte. Merci d'en saisir une autre.",
			"00000135": 				"Erreur de fichier Firmware.",
			"00000136": 				"Erreur de fichier de sauvegarde.",
			"00000137": 				"Adresse IP invalide, merci de refaire la saisie.",
			"00000139": 				"Paramètres de récupération du mot de passe incorrects.",
			"00000140": 				"Code incorrect.",
			"00000141": 				"Récupération du mot de passe désactivée.",
			"00000142": 				"Echec de l'envoi du code. Merci de vérifier votre connexion à internet.",
			"00000143": 				"Adresses email invalides.",
			"00000144": 				"Contenu de l'email invalide.",
			"00000145": 				"Ne peut joindre l'hôte.",
			"00000146": 				"Echec de l'authentification.",
			"00000147": 				"Le port doit être compris entre 1 et 65535.",
			"00000148": 				"Pour une étendue de ports, le numéro du port de départ doit être inférieur à celui de fin. Merci de modifier votre saisie.",
			"00000149": 				"Recouvrement de numéros de port. Merci de refaire la saisie.",
			
			"00000150": 				"Chemin non trouvé.",
			"00000151": 				"Chemin d'allocation non défini.",
			"00000152": 				"Des problèmes avec ce chemin :",
			"00000153": 				"Volume non trouvé.",
			"00000154": 				"Aucun appareil USB.",
			
			"00000155": 				"L'adresse IP du client VPN PPTP ne peut être située dans le même sous-réseau que l'adresse IP LAN.</br>Merci d'en saisir une autre.",
			"00000156": 				"L'adresse IP du client VPN PPTP ne peut être située dans le même sous-réseau que l'adresse IP du client OpenVPN.</br>Merci d'en saisir une autre.",

			"00000222":  				"Nombre maximal d'éléments.",
			"00000231": 				"Elément en double.",
			"00000232": 				"URL incorrecte.",
			"00000233":					"Merci de sélectionner au moins un jour.",

			"00000301": 				"Nombre maximal de partages réseaux atteint.",
			"00000302": 				"Nombre maximal de partages réseaux pour un volume atteint.",
			"00000303": 				"Chemin de partage réseau déjà défini.",
			"00000304": 				"Nom de partage déjà utilisé.",

			"00001000":					"Mise à jour en cours, merci de patienter.",
			"00001001": 				"La fonction WDS peut fonctionner dans les bandes 2.4 ou 5GHz.",
			"00001002":					"Code incorrect.",

			"00001123": 				"La règle applicative est non définie; merci de saisir au moins une règle.",
			"00001124": 				"Le numéro de port de la règle est non défini; merci de choisir au moins une règle.",

            "00002000": 				"Cet élément est en conflit avec le routage statique spécifié par le FAI, êtes vous sûr de vouloir continuer ?",

            "00003000":                 "La traversée IPv6 est en conflit avec le mode IPTV ! Si vous voulez utiliser cette fonction, merci de désactiver la configuration IPTV.",
			"00004139": 				"Pas de connexion à internet.",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"Requête hors délai. Merci de vérifier votre connexion à internet puis réessayer.",
			"00004141": 				"Erreur non définie.",
			"00004142": 				"Code de vérification incorrect.",
			"00004143": 				"Mot de passe incorrect.",
			"00004144": 				"Nom d'utilisateur déjà défini.",
			"00004145": 				"Mot de passe incorrect.",//new password
			"00004146": 				"Impossible de dissocier cet appareil. Merci de réessayer plus tard.",
			"00004147": 				"Cet appareil est déjà associé à un autre compte.",
			"00004148": 				"Saisie incorrecte.",
			"00004149": 				"Ce nom de domaine existe déjà.",
			"00004150": 				"Impossible de télécharger le firmware. Merci de vérifier votre connexion internet puis réessayer.",
			"00004151": 				"Il n'est pas possible d'enregistrer plus de 1000 noms de domaines par compte Cloud.",
			"00004152": 				"Cet appareil est déjà associé à un autre nom de domaine.",
			"00004153": 				"Ce nom de domaine a été associé à un autre appareil.",
			"00004154": 				"Aucune réponse du serveur. Merci d'essayer plus tard.",
			"00004155": 				"Le compte n'existe pas.",
			"00004156": 				"Impossible de démarrer l'application Cloud. Merci de redémarrer cet appareil et réessayer plus tard.",
			"00004157": 				"Impossible de se connecter au serveur Cloud. Merci de vérifier votre connexion internet puis réessayer.",
			"00004158": 				"Le port WAN est déconnecté.",
			"00004159": 				"Impossible de se connecter au serveur Cloud. Merci de vérifier contacter votre fournisseur d'accès puis réessayer.",
			"00004160": 				"Impossible d'obtenir une adresse IP depuis le serveur DHCP. Merci de vérifier le type de connexion WAN ou réessayer plus tard.",
			"00004161": 				"Echec de l'authentification PPPoE. Merci de vérifier votre nom d'utilisateur et votre mot de passe.",
			"00004162": 				"Impossible de se connecter au serveur PPPoE.",
			"00004164": 				"Echec de l'authentification PPTP. Merci de vérifier votre nom d'utilisateur et votre mot de passe.",
			"00004165": 				"Impossible de se connecter au serveur PPTP.",
			"00004167": 				"Echec de l'authentification L2TP. Merci de vérifier votre nom d'utilisateur et votre mot de passe.",
			"00004168": 				"Impossible de se connecter au serveur L2TP.",
			"00004169": 				"Erreur inconnue. Merci de réessayer plus tard.",
			"00004170": 				"Le port WAN est déconnecté.",
			"00004171": 				"Pas de connexion à internet.",
			"00004172": 				"Echec de connexion.",
			"00004173": 				"Nom ou Mot de passe incorrect",
			"00004174": 				"Adresse email incorrecte.",
			"00004175": 				"Format de nom d'utilisateur incorrect.",
			"00004176": 				"L'email existe déjà",
			"00004177": 				"Impossible d'accéder aux informations de compte. Merci de rafraichir la page.",
			"00004178":   				"Erreur système. Merci de rafraichir la page et d'essayer à nouveau.",
			"00004179":   				"Impossible d'associer cet appareil. Merci de réessayer plus tard.",
			"00004180":   				"Cet appareil à été dissocié de compte Cloud. Merci de vous reconnecter à ce compte pour l'y associer à nouveau.",
			"00004181":   				"Appareil hors ligne. Merci de vérifier vos paramètres internet.",
			"00004182":   				"Impossible d'envoyer l'email. Merci de vérifier votre connexion internet puis réessayer.",
			"00004183":   				"Le compte doit comporter xx à xx caractères.",
			"00004184":   				"Vous avez saisi incorrectement le mot de passe : 20 fois. Attendez 2H pour essayer à nouveau.",
			"00004185":   				"Vous avez requis le code de vérifications 10 fois en 1 heure. Attendez 24H pour essayer à nouveau.",
			"00004186":   				"Désolé, impossible d'activer votre compte. Merci de renvoyer l'email de vérification.",
			"00004187":   				"Désolé le lien n'est plus actif. Merci de renvoyer l'email de vérification.",
			"00004188":   				"Désolé le lien n'est plus actif. Merci de renvoyer l'email.",
			"00004189":   				"Désolé, impossible de réinitialiser votre mot de passe. Merci de renvoyer l'email.",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"Erreur de mise à jour du firmware.",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"Etat",
			NETWORK: 					"Network",
			NETWORK_MAP: 				"Cartographie du réseau",
			INTERNET: 					"Internet",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"Serveur DHCP",
			DYNAMIC_DNS: 				"DNS Dynamique",
			ADVANCED_ROUTING: 			"Routage Avancé",

			WIRELESS: 					"Wi-Fi",
			WIRELESS_SETTINGS: 			"Paramètres Wi-Fi",
			WDSBRIDGING: 				"Pontage WDS",
			WPS: 						"WPS",
			MACFILTERING: 				"Filtrage MAC",
			WIRE_STATISTICS: 			"Statistiques",
			
			
			GUEST_NETWORK: 				"Réseau invités",
			WIRELESS_SETTINGS: 			"Paramètres Wi-Fi",
			STORAGE_SHARING: 			"Partage de stockage",
			NAT_FORWARDING: 			"Transferts NAT",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"Serveurs Virtuels",
			PORT_TRIGGERING: 			"Déclenchement par Port",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"Paramètres USB",
			BASIC_SET: 					"Paramètres basiques",
			DISK_SET: 					"Paramètres d'appareil",
			FOLDER_SHARING: 			"Partages",
			STORAGE_SHARING: 			"Partage de stockage",
			FTP_SERVER: 				"Serveur FTP",
			MEDIA_SERVER: 				"Serveur de médias",
			PRINT_SERVER: 				"Serveur d'impression",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"Téléchargement hors connexion",
			
			PARENTAL_CONTROL: 			"Contrôle parental",

			QOS:  						"QoS",
			DATABASE:  					"Base de données",

			STREAMBOOST: 				"Stream Boost",
			MAP: 						"Carte",
			SB_MAP: 					"Carte",
			SB_BANDWIDTH:  				"Bande passante",
			SB_PRIORITY: 				"Priorité",
			SB_STATISTICS: 				"Statistiques",

			
			SECURITY: 					"Sécurité",
			SETTINGS: 					"Paramètres",
			ACCESS_CONTROL: 			"Contrôle d'accès",
			IP_MAC_BINDING: 			"Association IP&MAC",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"Outils Système",
			TIME_SETTINGS: 				"Paramètres de temps",
			DIAGNOSTIC: 				"Diagnostics",
			FIRMWARE_UPGRADE: 			"Mise à jour logicielle",
			BACKUP_RESTORE: 			"Sauvegarde et restauration",
			ADMINISTRATION: 			"Administration",
			SYSTEM_LOG: 				"Journal système",
			STATISTICS: 				"Statistiques de trafic",
			SYSTEM_PARAMETERS: 			"Paramètres système",
			VPN: 						"Serveur VPN",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"VPN PPTP",
			VPN_CONNECTIONS: 			"Connexions VPN"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"Pays et fuseau horaire",
			INTERNET_CONNECTION_TYPE: 	"Type de connexion internet",
			WIRELESS_SETTINGS: 			"Paramètres Wi-Fi",
			SUMMARY: 					"Résumé",
			SETUP_COMPLETE: 			"Test de la connexion internet",

			EXIT: 						"Sortir",
			NEXT: 						"Suivant",
			SAVE: 						"Sauvegarder",
			FINISH: 					"Terminé",
			OK: 						"OK",
			NONE: 						"Echec de la détection.",

			REGION: 					"Pays",
			TIME_ZONE: 					"Fuseau horaire",
			NO_SELECT: 					"Choisir les options.",

			AUTO_DETECT: 				"Détection automatique",
			DYNAMIC_IP: 				"IP Dynamique",
			STATIC_IP: 					"IP Statique",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "Remarque : Si vous n'êtes pas sûr du type de votre connexion internet, utilisez la Détection automatique ou consultez votre Fournisseur d'Accès à Internet (FAI) pour solliciter son assistance.",

			DYNAMIC_IP_INFO: 			"Si votre FAI n'autorise l'accès internet qu'à une adresse MAC spécifique, vous devez cloner l'adresse MAC de l'ordinateur primaire. Si vous n'êtes pas sûr, Sélectionner <strong>Ne PAS cloner l'adresse MAC</strong>.",
			MAC_CLONE_NO: 				"Ne pas cloner l'adresse MAC",
			MAC_CLONE_YES: 				"Cloner l'adresse MAC de l'ordinateur",
			MAC_CLONE_NOTE: 			"Si vous choisissez de cloner l'adresse MAC. Assurez vous que l'adresse MAC de l'ordinateur est enregistrée auprès de votre FAI avant de cliquer sur Suivant.",

			PPPOE_INFO: 				"Merci de saisir vos nom d'utilisateur et Mot de passe PPPoE.",
			
			STATIC_IP_INFO: 			"Merci de saisir vos paramètres IP.",

			L2TP_INFO: 					"Merci de saisir vos nom d'utilisateur et Mot de passe L2TP.",
			PPTP_INFO: 					"Merci de saisir vos nom d'utilisateur et Mot de passe PPTP.",
			
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			SERVER_IP_ADDRESS_NAME: 	"IP de serveur VPN/Nom de domaine",
			IP_ADDRESS: 				"Adresse IP",
			SUBNET_MASK: 				"Masque de sous réseau",
			DEFAULT_GATEWAY: 			"Passerelle par défaut",
			PRIMARY_DNS: 				"DNS Primaire",
			SECOND_DNS: 				"DNS Secondaire",
			OPTIONAL: 					"(Optionnel)",
			
			ON: 						"Actif",
			OFF: 						"Inactif",
			WIRELESS_24GHZ: 			"Wi-Fi 2.4GHz",
			WIRELESS_5GHZ: 				"Wi-Fi 5GHz",
			WIRELESS_60GHZ: 				"Wi-Fi 60GHz",
			ENABLE_WIRELESS_RADIO: 		"Activer l'émetteur Wi-Fi",
			NAME_SSID: 					"Nom de réseau (SSID)",

			SUMMARY_INFO1: 				"Vous devez reconnecter vos appareils au nouveau réseau Wi-Fi avant de cliquer sur le bouton  <strong>Suivant</strong>.",
			SUMMARY_INFO2: 				"Le nom de votre réseau Wi-Fi et son Mot de passe ont été modifiés comme suit",
			SUMMARY_INFO3: 				"Assurez vous de vous connecter au nouveau réseau.",

			WIRELESS_24GHZ_SSID: 		"Nom du réseau 2.4GHz (SSID)",
			WIRELESS_24GHZ_PASSWORD: 	"Mot de passe du réseau 2,4GHz",
			WIRELESS_5GHZ_SSID: 		"Nom du réseau 5GHz (SSID)",
			WIRELESS_5GHZ_PASSWORD: 	"Mot de passe du réseau 5GHz",
			WIRELESS_60GHZ_SSID: 		"SSID Wi-Fi 60GHz",
			WIRELESS_60GHZ_PASSWORD: 	"Mot de passe Wi-Fi 60GHz",

			SORRY: 						"Echec.",
			SUCCESS: 					"Réussi !",
			TEST_INTERNET_SUCCESS_INFO: "Réussi ! Cliquer sur OK puis Terminer pour achever le paramétrage rapide.",

			TEST_INTERNET_FAILED_INFO_0:"Merci de vérifier que tous les paramètres sont corrects puis essayez à nouveau. Si tous les paramètres sont corrects. Merci de redémarrer votre modem, attendez 2 minutes et cliquez à nouveau sur tester la connexion internet. Si vous n'utilisez pas un modem, vous devriez contacter votre FAI (Fournisseur d'accès à internet) pour solliciter son aide.",
			SUMMARY_INFO4: 				"Désolé ! Nous avons détecté que vous n'avez pas reconnecté vos appareils au nouveau réseau Wi-Fi. Merci de le faire puis cliquez sur <strong>OK</strong>.",
                                         
			CONGRATULARIONS: 			"Félicitations !",
			COMPLETE_INFO_0: 			"Vous avez achevé le paramétrage rapide.",
			COMPLETE_INFO_1:			"Cliquer sur le test de connexion internet ci-dessous, puis cliquez sur terminé.",
			TEST_INTERNET: 				"Test de connexion internet",

			
			RESET_USER_TITLE: 			"Définir un nouveau nom d'utilisateur et un nouveau Mot de passe",
			NEW_USERNAME: 				"Nouveau nom d'utilisateur",
			NEW_PASSWORD: 				"Nouveau Mot de passe",
			CONFIRM_PASSWORD: 			"Confirmer le Mot de passe",
			CONFIRM: 					"Confirmer"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"Internet",
			INTERNET_STATUS:			"Etat Internet ",

			GHZ24: 						"2. 4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"Type de connexion",
			SECONDARY_CONN: 			"Connexion secondaire",

			POOR_CONNECTED: 			"Connexion limitée",
			UNPLUGGED: 					"Le port WAN n'est pas connecté.",
			
			CONNECTED: 					"Connecté",
			DISCONNECTED: 				"Déconnecté",
			CONNECTING: 				"Connexion",

			INTERNET_IP_ADDR: 			"Adresse IP",
			
			IP_ADDR: 					"Adresse IP",
			MAC_ADDR: 					"Adresse MAC",
			GATEWAY: 					"Passerelle",

			AUTO: 						"Auto",
			
			ROUTER: 					"Routeur",
			WIRELESS_CLIENTS: 			"Clients Wi-Fi",
			HOST_CLIENTS: 				"Clients Wi-Fi",
			GUEST_CLIENTS: 				"Invités",
			WIRE_CLIENTS: 				"Clients filaires",
			PRINTER: 					"imprimante",
			USB_DISK: 					"Disque USB",
			WIRELESS: 					"Wi-Fi",
			NAME: 						"Nom",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"Canal",
			MAC: 						"Adresse MAC",
			
			WIRELESS_24GHZ: 			"Wi-Fi 2.4GHz",
			WIRELESS_5GHZ: 				"Wi-Fi 5GHz",
			WIRELESS_60GHZ:				"Wi-Fi 60GHz",
			
			GUEST_24GHZ: 				"Réseau invités 2.4GHz",
			GUEST_5GHZ: 				"Réseau invités 5GHz",
			
			STATUS: 					"Etat",
			TOTAL: 						"Capacité",
			AVAILABLE: 					"Disponible",
			GB: 						"Go",
			BRAND: 						"Marque",

			DYNAMIC_IP: 				"IP Dynamique",
			STATIC_IP: 					"IP Statique",
			SUBNET_MASK: 				"Masque de sous réseau",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Câble BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Tunnel 6to4",
			NONE: 						"aucun"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"Internet",
			AUTO_DETECT: 				"Détection automatique",
			INTERNET_CONN_TYPE: 		"Type de connexion internet",
			DYNAMIC_IP: 				"IP Dynamique",
			STATIC_IP: 					"IP Statique",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"Câble BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"Débranché",
			NONE: 						"aucun",
			DETECT_FAIL: 				"Echec de la détection automatique",
			SECONDARY_CONN: 			"Connexion secondaire",

			DYNAMIC_YES: 				"Ne pas cloner l’adresse MAC de l’ordinateur",
			DYNAMIC_NO: 				"Cloner l'adresse MAC de l'ordinateur",
			
			IP_ADDR: 					"Adresse IP",
			SUBNET_MASK: 				"Masque de sous réseau",
			DEFAULT_GATEWAY: 			"Passerelle par défaut",
			PRIMARY_DNS: 				"DNS Primaire",
			SECOND_DNS: 				"DNS Secondaire",
			OPTIONAL: 					"(Optionnel)",
			USER_NAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			SERVER_IP_ADDR_NAME: 		"IP de serveur VPN/Nom de domaine",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"Si vous n'êtes pas sûr du type de votre connexion internet, utilisez la Détection automatique ou consultez votre Fournisseur d'Accès à Internet (FAI) pour solliciter son assistance."
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"Paramètres Wi-Fi",
			MODE_2G: 					"Wi-Fi 2.4GHz",
			MODE_5G: 					"Wi-Fi 5GHz",
			MODE_60G: 					"Wi-Fi 60GHz",
			WIRELESS_NETWORK_NAME: 		"Nom de réseau (SSID)",
			WIRELESS_PASSWORD: 			"Mot de passe",
			ENABLE_WIRELESS: 			"Activer l'émetteur Wi-Fi",
			SAVE: 						"Sauvegarder",
			ENCRYPTION_2G_NOTICE:		"Le réseau 2.4GHz est chiffré en  %s.",
			ENCRYPTION_5G_NOTICE:		"Le réseau 5GHz est chiffré en  %s.",
			ENCRYPTION_60G_NOTICE:		"Le chiffrement 60GHz est %s.",
			ENCRYPTION_2G_NO: 			"Le réseau 2,4GHz n'est pas sécurisé.",
			ENCRYPTION_5G_NO: 			"Le réseau 5GHz n'est pas sécurisé.",
			ENCRYPTION_60G_NO: 			"Le réseau Wi-Fi 60GHz n'est pas chiffré.",
			ENCRYPTION_NO: 				"Un réseau Wi-Fi non sécurisé est source de dangers cachés.",
			ENCRYPTION_SURE: 			"Etes vous sur de vouloir continuer ?",
			HIDE_SSID: 					"Masquer le SSID"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"Paramètres basiques",
			TITIL_NEW:					"Disque et compte",
			DISK_SET:					"Disques USB",

			SELFLY_REMOVE:				"Déconnexion sécurisée",
			SCANING:					"Détection.",
			SCAN_RESULT:				"%n  disque(s) détecté(s).",
			
			DISKS:						"Disques",
			USERS: 						"Compte utilisateur",
			DEVICENAME: 				"Nom d'appareil",
			VOLUMN: 					"Volume",

			USBSPACE: 					"Espace utilisé",
			FREESPACE: 					"Espace libre",
			STATUS: 					"Visibilité réseau",
			INACT: 						"Inactivé",
			USAGE: 						"Utilisation",
			CAPACITY: 					"Capacité",
			OPERATION: 					"Action",
			
			ACC: 						"Gestion de compte", 	 	
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			USE_LOGIN: 					"Utiliser l'utilisateur de connexion",
			SCAN: 						"Rechercher",
			ENJECT_ALL: 				"Tout éjecter",
			ENJECT: 					"Ejecter",
			ADD_USER: 					"Ajouter un utilisateur",
			AUTH: 						"Autorité",


			LOCATION: 					"Adresse",
			MOBILE_ISP: 				"FAI Mobile",
			DIAL_NUMBER: 				"Numéro de connexion",
			APN: 						"APN",
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			MTU_SIZE: 					"Taille de la MTU",
			OPTIONAL: 					"(Optionnel)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"Contrôle parental",
			UNKNOWN: 					"Inconnu",
			
			DEVICE_CTR: 				"Appareils soumis au contrôle parental",
			ID: 						"N°",
			DEVICE: 					"Nom d'appareil",
			MAC_ADDRESS: 				"Adresse MAC",
			TIME: 						"Horaires d'accès à Internet",
			DESCRIPTION: 				"Description",
			ENABLE: 					"Activer",
			ENABLE_THIS_ENTRY: 			"Activer cette entrée",
			OPTIONAL: 					"(Optionnel)",
			BTN_VIEW: 					"Visualiser les appareils connectés",
			
			DEVICE_LIST: 				"liste d'appareils",
			SYSTEM_TIME: 				"Heure système",
			
			RESTR: 						"Restriction de contenu",
			MODE: 						"Restriction",
			BLACKMODE: 					"Liste noire",
			WHITEMODE: 					"Liste Blanche",
			ACCESS_DEVICES_LIST: 		"liste des appareils",
			
			CHOOSE: 					"Sélectionner",
			ADD_A_NEW_KEYWORD: 			"Ajouter un nouveau mot clé à bloquer.",
			ADD_A_NEW_DOMAIN_NAME: 		"Ajouter un nouveau nom de domaine autorisé.",
			
			OPT: 						"Action",
			STATUS: 					"Contrôle parental",
			YOURPC:						"Votre ordinateur"
		},
		
		BASIC_GUEST:{
			TITLE: 						"Réseau invités",
			MODE_2G: 					"Wi-Fi 2.4GHz",
			MODE_5G: 					"Wi-Fi 5GHz",
			WIRELESS_NETWORK_NAME: 		"Nom de réseau (SSID)",
			WIRELESS_PASSWORD: 			"Mot de passe",
			DYNAMIC_PASSWORD: 			"Mot de passe",
			ENABLE_WIRELESS: 			"Activer Réseau invités",
			SAVE:						"Sauvegarder",
			HIDE_SSID: 					"Masquer le SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervalle de mise à jour du Mot de passe",
			PER_DAY: 					"Quotidien",
			PER_WEEK: 					"Hebdomadaire",
			PER_MONTH: 					"Mensuel",
			NEVER: 						"Jamais",
			UNENCRYPTED:				"Le réseau invité n'est pas sécurisé. Vous pouvez définir un Mot de passe dans le menu Avancé."
		},

		STATUS: {
			TITLE: 						"Etat",
			INTERNET:					"Internet",
			WIRELESS:					"Wi-Fi",
			LAN:						"LAN",
			USB_TITLE:					"Appareils USB",
			PERFORMANCE: 				"Performances",
			GUEST_NETWORK: 				"Réseau invités",
			ACCESS_DEVICES: 			"Accès appareils ",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2. 4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"Type de connexion",

			MAC_ADDRESS: 				"Adresse MAC",
			IP_ADDRESS: 				"Adresse IP",
			RELEASE: 					"Libérer",
			RENEW: 						"Renouveler",
			
			DYNAMIC_IP: 				"IP Dynamique",
			STATIC_IP: 					"IP Statique",
			SUBNET_MASK: 				"Masque de sous réseau",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"Câble BigPond",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"Tunnel 6to4",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"Passthrough (Pont)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"aucun",
			
			DEFAULT_GATEWAY: 			"Passerelle par défaut",
			DNS: 						"Serveur DNS",
			MAC: 						"Adresse MAC",
			WDS_STATUS: 				"Etat WDS",
			
			IPV6_ADDRESS: 				"Adresse IP",
			PRIMARY_DNS: 				"DNS Primaire",
			SECOND_DNS: 				"DNS Secondaire",

			RADIO: 						"émetteur Wi-Fi",

			NAME_SSID: 					"Nom de réseau (SSID)",
			NETWORK_NAME_SSID:			"Nom de réseau (SSID)",
			HIDE_SSID: 					"Masquer le SSID",
			MODE: 						"Mode",
			CHANNEL: 					"Canal",
			CHANNEL_WIDTH: 				"Largeur de canal",
			AUTO: 						"Auto",
			CURRENT_CHANNEL: 			"Canal actuel",

			WDS: 						"Etat WDS",
			WIRED_CLIENTS: 				"Clients filaires",
			WIRELESS_CLIENTS: 			"Clients Wi-Fi",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"Adresse lien local",
			ASSIGN_TYPE: 				"Type assigné",
			
			ALLOW_TO_SEE_EACH: 			"Permettre aux invités de se voir",

			TOTAL: 						"Capacité :",
			AVAILABLE: 					"Disponible :",

			USB: 						"Disque USB",
			PRINTER: 					"imprimante",

			CPU_LOAD: 					"Charge processeur",
			MEMORY_USAGE: 				"Mémoire utilisée",

			IP_ADDR_P: 					"Adresse IP :",
			MAC_ADDR_P: 				"Adresse MAC :",
			CONN_TYPE_P: 				"Type de connexion :",

			DISABLED: 					"Désactivé",
			INIT: 						"Initialisation",
			SCAN: 						"Rechercher",
			AUTH: 						"Auth",
			ASSOC: 						"Assoc",
			RUN: 						"Run",
			HOST: 						"Clients",
			GUEST: 						"Invités",

			ON: 						"Actif",
			OFF: 						"Inactif"
		},

		INTERNET: {
			TITLE: 						"Internet",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"Type de connexion internet",
			INTERNET_MAC_ADDRESS: 		"Adresse MAC",
			
			CONNECT: 					"Connecter",
			DISCONNECT: 				"Déconnecter",

			IP_ADDR: 					"Adresse IP",
			
			USE_DEFAULT_MAC: 			"Utiliser l'adresse MAC par défaut",
			USE_COMPUTER_MAC: 			"Utiliser l'adresse MAC de l'ordinateur",
			USE_CUSTOM_MAC: 			"Utiliser une autre adresse MAC",
			MAC_CLONE: 					"Clonage MAC",
			
			CONFIG: 					"Configuration",
			
			IP_ADDRESS: 				"Adresse IP",
			SUBNET_MASK: 				"Masque de sous réseau",
			DEFAULT_GATEWAY: 			"Passerelle par défaut",
			
			MANUAL_DNS: 				"DNS manuels",
			PRIMARY_DNS: 				"DNS Primaire",
			SECOND_DNS: 				"DNS Secondaire",
			
			RENEW: 						"Renouveler",
			RELEASE: 					"Libérer",
			VIEW_MODE: 					"Mode de visualisation",
			
			GET_DYNAMICALLY_FROM_ISP: 	"Obtenir dynamiquement du FAI",
			USE_FOLLOW_IP_ADDR: 		"Utiliser l'Adresse IP suivante",
			USE_FOLLOW_DNS_ADDR: 		"Utiliser les adresse DNS suivantes",
			USE_FOLLOW_DNS_SERVER: 		"Utiliser les serveurs DNS suivant",
			
			BASIC: 						"Basique",
			ADVANCED: 					"Avancé",
			
			DNS_ADDR_MODE: 				"Adresse DNS",
			MTU_SIZE: 					"Taille de la MTU",
			MTU_1500: 					"octets. (par défaut 1500, Ne pas changer sans raisons. )",
			MTU_1480: 					"octets. (Par défaut 1480, ne pas modifier sans raisons. )",
			MTU_1460: 					"octets. (Par défaut 1460, ne pas modifier sans raisons. )",
			MTU_1420: 					"octets. (Par défaut 1420, ne pas modifier sans raisons. )",
			
			HOST_NAME: 					"Nom d'hôte",

			HOST_NAME_CONFIRM: 			"Le nom d'hôte contient des caractères interdits qui peuvent conduire à un comportement système inattendu. Etes vous sûr de vouloir continuer ?",

			GET_IP_WITH_UNICAST_DHCP: 	"Obtenir une IP via DHCP Unicast (habituellement non requis. )",
			OPTIONAL: 					"(Optionnel)",
			
			STATIC_IP: 					"IP Statique",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"Auto",
						
			USER_NAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			
			INTERNET_IP_ADDR: 			"Adresse IP",
			INTERNET_DNS: 				"DNS internet",
			SECONDARY_CONN: 			"Connexion secondaire",
			NONE: 						"aucun",
			INTERNET_PRIMARY_DNS:		"DNS Primaire",
			INTERNET_SECONDARY_DNS: 	"DNS Secondaire",
			
			DYNAMIC_IP: 				"IP Dynamique",
			DYNAMIC_IP_v6: 				"IP Dynamique (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"Nom de service",
			ACCESS_CONCENTRATOR_NAME:  	"Nom du concentrateur d'accès",
			DETECT_ONLINE_INTERVAL: 	"Détecter l'intervalle en ligne",
			INTERVAL_TIPS: 				"secondes. (0 à 120. Par défaut 10.)",
			IP_ADDR_MODE:  				"Adresse IP",
			CONN_MODE: 					"Mode de connexion",
			DHCP_LINK_UNPLUGGED: 		"Le port WAN n'est pas connecté.",
			
			AUTO: 						"Auto",
			ON_DEMAND: 					"A la demande",
			TIME_BASED: 				"Planifiée",
			MANUALLY: 					"Manuellement",
			MAX_IDLE_TIME: 				"Durée d'inactivité Max",
			MAX_IDLE_TIME_TIPS: 		"minutes. (0 signifie toujours actif. )",
			PERIOD_OF_TIME: 			"Durée",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"Câble BigPond",
			AUTH_SERVER: 				"Serveur d'Auth.",
			AUTH_DOMAIN: 				"Domaine d'Auth.",
			L2TP: 						"L2TP",
			GATEWAY: 					"Passerelle",
			SERVER_IP_ADDR_NAME: 		"IP de serveur VPN/Nom de domaine",
			PPTP: 						"PPTP",
			TO: 						"A",
			
			TUNNEL_6TO4: 				"Tunnel 6to4",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"Obtenir une Adresse IPv6 non temporaire",
			GET_PREFIX_DELEGATION: 		"Obtenir une délégation de préfixe IPv6",
			IPV6_ADDR: 					"Adresse IPv6",

			GET_IPV6_WAY: 				"Obtenir une Adresse IPv6",
			AUTOMATICALLY:              "Obtenir automatiquement",
			SPECIFIED_BY_ISP: 			"Spécifié par le FAI",

			IPV6_ADDR_PREFIX: 			"Préfixe d'adresse IPv6",
			NONE_TEMPORARY: 			"Non-temporaire",

			PREFIX_DELEGATION: 			"Délégation de préfixe",
			ENABLE:                     "Activer",
			DISABLE:                    "Désactiver",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"longueur du masque IPv4",
			CONFIG_TYPE: 				"Type de configuration",
			RD6_PREFIX: 				"Préfixe 6RD",
			RD6_PREFIX_LENGTH: 			"Longueur du préfixe 6RD",
			REPLY_IPV4_ADDR: 			"Adresse border reply IPv4",
			MANUAL: 					"Manuel",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"Pass Through (Pont)",
			LOCAL_IPV6: 				"Adresse locale IPv6",
			PEER_IPV6: 					"Adresse pair IPv6",
			TUNNEL_ADDR: 				"Adresse du tunnel",
			IPV4_NETMASK: 				"Masque IPv4",
			CUSTOM: 					"Autre",
		    AFTR_NAME: 					"Nom AFTR",


			
			
			IPV4_ADDR: 					"Adresse IPv4",
			IPV4_MASK: 					"Masque de sous-réseau IPv4",
			IPV4_GATEWAY: 				"Passerelle par défaut IPv4",

			DUPLEX: 					"Duplex",
			AUTO_NEGOTIATION: 			"Auto Négociation",
			FULL_DUPLEX_1000: 			"1000Mbps duplex intégral",
			HALF_DUPLEX_1000:			"1000Mbps semi duplex",
			FULL_DUPLEX_100: 			"100Mbps duplex intégral",
			HALF_DUPLEX_100: 			"100Mbps semi duplex",
			FULL_DUPLEX_10: 			"10Mbps duplex intégral",
			HALF_DUPLEX_10: 			"10Mbps semi duplex"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"Adresse MAC",
			IP_ADDRESS: 				"Adresse IP",
			SUBNET_MASK: 				"Masque de sous réseau",
			CUSTOM: 					"Autre",

			IGMP: 						"Activer IGMP Proxy",
			


			ASSIGNED_TYPE: 				"Type assigné",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+Stateless DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"Préfixe d'adresse",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"Adresse",
			DELEFATED: 					"Délégué",
			STATIC: 					"Statique",
			SITE_PREFIX: 				"Préfixe de site",
			SITE_PREFIX_LEN: 			"Longueur de préfixe de site",

			PREFIX_TYPE:  				"Type de configuration de préfixe de site",
			LAN_IPV6_ADDR:  			"Adresse LAN IPv6",

			RELEASE_TIME: 				"Durée du bail",
			RELEASE_TIME_TIP: 			"secondes. (Par défaut 86400, ne pas modifier sans raisons. )",
			ADDRESS:					"Adresse",
			SAVE: 						"Sauvegarder",

			REBOOT_TIP: 				"Le routeur vous redirige vers la nouvelle page d'authentification. <br/> Merci de patienter..."

		},

		IPTV:{
			TITLE: 						"Paramètres",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "Activer IPTV", 
			MODE:  						"Mode",
			IGMP_PROXY: 				"Proxy IGMP",
			IGMP_VERSION: 				"Version IGMP",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"Pont",
			BASIC: 						"Autre",
			EXSTREAM: 					"Singapour-ExStream",
			RUSSIA:  					"Russie",
			UNIFY:  					"Malaisie-Unifi",
			MAXIS:  					"Malaisie-Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"Internet",
			IP_PHONE: 					"Téléphone IP", 

			Q_TAG: 						"Tag 802. 1Q",
			ENABLE: 					"Activer",
			
			INTERNET_VLAN_ID: 			"N° VLAN Internet",
			INTERNET_VLAN_PRIORITY: 	"Priorité VLAN Internet",
			IP_PHONE_VLAN_ID: 			"N° VLAN Téléphone IP",
			IP_PHONE_VLAN_PRIORITY: 	"Priorité VLAN Téléphone IP",
			IPTV_VLAN_ID: 				"N° VLAN IPTV",
			IPTV_VLAN_PRIORITY: 		"Priorité VLAN IPTV",
			IPTV_MULTI_VLAN_ID: 		"N° VLAN IPTV Multicast",
			IPTV_MULTI_VLAN_PRIORITY: 	"Priorité VLAN IPTV Multicast"
		},

		DHCP_SERVER: {
			TITLE: 						"Serveur DHCP",
			
			SETTINGS: 					"Paramètres",

			DHCP_SERVER: 				"Serveur DHCP",
			ENABLE_DHCP_SERVER: 		"Activer Serveur DHCP",

			IP_ADDR_POOL: 				"Adresse IP Plage",
			LEASETIME: 					"Durée du bail",
			LEASENOTE: 					"minutes. (2 à 2880, par défaut 120)",
			
			GATEWAY: 					"Passerelle par défaut",
			DOMAIN: 					"Domaine par défaut",
			PRIMARYDNS: 				"DNS Primaire",
			SECONDARYDNS: 				"DNS Secondaire",

			OPTIONAL: 					"(Optionnel)",

			CLIENTSLIST: 				"Liste de clients DHCP",
			CLIENT_NUMBER: 				"Client N°",
			CLIENT_NAME: 				"Nom du client",
			MAC_ADDR: 					"Adresse MAC",
			ASSIGNED_IP: 				"Adresse IP assignée",
			LEASE_TIME: 				"Durée du bail",

			RESERVATION: 				"Réservation d'adresses",

			RESERVED_IP: 				"Réservée Adresse IP",
			IP_ADDRESS: 				"Adresse IP",
			DESCRIPTION: 				"Description",

			CLIENTSLIST: 				"Liste de clients DHCP",
			CLIENT_NUMBER: 				"Client N°",

			ENABLE: 					"Activer",
			ENABLE_THIS_ENTRY: 			"Activer cette entrée",
			BTN_VIEW:					"Visualiser les appareils connectés"
			
		},

		DDNS: {
			DDNS: 						"DNS Dynamique",
			SERVICEPROVIDER: 			"Fournisseur de service",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"Dyndns",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"S'enregistrer...",
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			DOMAIN_NAME_LIST: 			"Liste de noms de domaine",
			DOMAIN_NAME: 				"Nom de domaine",
			LOGIN: 						"Se connecter",
			LOGIN_SAVE: 				"Se connecter et Sauvegarder", 
			LOGOUT: 					"Se déconnecter",
			STATU_SUCCESS:				"Réussi",
			UPDATE_INTERVAL:			"Intervalle de mise à jour",
			ONE_HOUR:					"1 heure",
			SIX_HOUR:					"6 heures",
			TWETEEN_HOUR:				"12 heures",
			ONE_DAY:					"1 jour",
			TWO_DAY:					"2 jours",
			THREE_DAY:					"3 jours",
			NEVER:						"jamais",
			UPDATE:						"Mise à jour",
			STATU_INCORRENT:			"Nom ou Mot de passe incorrect",
			STATU_ERR_DOMAIN:			"Erreur de nom de domaine",
			
			STATU_NO_LAUNCH:			"Non lancé",
			STATU_FAIL_DDNS: 			"Echec de la mise à jour du compte Dyndns.",
			STATU_FAIL_NOIP: 			"Echec de la mise à jour du compte NO-IP.",
			STATU_CONN:					"Connexion en cours..."
		},

		ADVANCED_ROUTING: {
			TITLE: 						"Routage Avancé",
			STATIC_ROUTING: 			"Routage statique",

			DESTINATION_NETWORK:		"Réseau de destination",
			SUBNET_MASK: 				"Masque de sous-réseau",
			DEFAULT_GATEWAY: 			"Passerelle par défaut",
			DESCRIPTION: 				"Description",
			
			SYSTEM_ROUTING_TABLE: 		"Table de routage système",
			CLIENT_NUMBER: 				"Client N°",

			GATEWAY: 					"Passerelle",
			INTERFACE: 					"Interface",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"Activer",
			ENABLE_THIS_ENTRY: 			"Activer cette entrée"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"Paramètres",
			NOT_SUPPORT_5G: 			"Cette région ne supporte que les réseaux 2.4GHz. Assurez vous d'avoir sélectionné le pays adéquat.",
			NOT_SUPPORT_60G: 			"Cette région ne supporte pas les réseaux 60GHz.",
			ENABLE_TIPS: 				"Vous devez activer l'émission du Wi-Fi.",

			REGION: 					"Pays",
			NOTICE:  					"Pour utiliser le Wi-Fi, vous devez laisser le bouton Wi-Fi sur la position On.",
			
			MODE_2G:					"2. 4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"Wi-Fi",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"Activer l'émetteur Wi-Fi",

			WIRELESS_NETWORK_NAME: 		"Nom de réseau (SSID)",
			WIRELESS_PASSWORD: 			"Mot de passe",
			HIDE_SSID: 					"Masquer le SSID",

			SECURITY: 					"Sécurité",
			NO_SECURITY: 				"Pas de sécurité",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2 - Personnel (Recommandé)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - Entreprise",
			WPA2_PERSONAL: 			    "WPA2 - Personnel (Recommandé)",
			WPA2_ENTERPRISE: 		    "WPA2 - Entreprise",
			WEP: 						"WEP",

			VERSION: 					"Version",

			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"Chiffrement",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"Mode",
			MODE_B:  					"802.11b",
			MODE_G:  					"802.11g",
			MODE_N:  					"802.11n",
			MODE_BG:  					"802.11bg",
			MODE_GN: 					"802.11gn",
			MODE_BGN:  					"802.11bgn",

			MODE_A_5: 					"802.11n uniquement",
			MODE_AN_5: 					"802.11a/n",
			MODE_N_5: 					"802.11n uniquement",
			MODE_AC_5:					"802.11ac uniquement",
			MODE_NAC_5:					"802.11n/ac",
			MODE_ANAC_5:				"802.11a/n/ac",

			MODE_AD_60:					"802.11ad uniquement",

			CHANNEL_WIDTH: 				"Largeur de canal",
			CHANNEL: 					"Canal",

			TRANSMIT_POWER: 			"Puissance d'émission",

			RADIUS_SERVER_IP: 			"IP du serveur Radius",
			RADIUS_PORT: 				"Port radius",
			RADIUS_PASSWORD: 			"Mot de passe Radius",

			TYPE: 						"Type",
			OPEN_SYSTEM: 				"Système ouvert",
			SHARED_KEY: 				"Clé partagée",

			KEY_SELECTED: 				"Clé choisie",
			KEY1: 						"Clé 1",
			KEY2: 						"Clé 2",
			KEY3: 						"Clé 3",
			KEY4: 						"Clé 4",

			WEP_KEY_FORMAT: 			"Format de clé WEP",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"Hexadécimal",

			KEY_TYPE: 					"Type de clé",
			BIT64: 						"64 bit",
			BIT128: 					"128 bit",
			BIT152: 					"152 bit",

			KEY_VALUE: 					"Valeur de la clé",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"Faible",
			MIDDLE: 					"Moyen",
			HIGH: 						"Elevé"
		},

		WPS: {

			TITLE2: 					"Code WPS",
			ROUTERS_PIN_INFO: 			"D'autres appareils peuvent se connecter au routeur en WPS avec le code WPS du routeur.",
			ENABLE_ROUTE_PIN: 			"Code WPS",
			ROUTE_PIN: 					"Code PIN",
			GENERAL: 					"Générer",
			DFT: 						"Par défaut",

			TITLE: 						"Assistant WPS",
			SELECT_SETUP: 				"Choisir une méthode de paramétrage",
			PUSH_BTN: 					"Appui du bouton (Recommandé)",
			PUSH_DES: 					"Appuyer le bouton WPS du routeur ou cliquer sur le bouton logiciel ''Se Connecter'' de cette page.",
			CONNECT: 					"Connecter",
			CANCEL: 					"Annuler",

			RESULT_HEAD: 				"le client Wi-Fi",
			RESULT_END: 				"a été ajouté au réseau avec succès.",
			NOT_FOUND: 					"Aucun client trouvé. Cliquer sur le bouton pour essayer à nouveau.",

			PIN_NUMBER: 				"Code PIN",
			
			PIN_BTN: 					"Code PIN",
			NOT_FOUND: 					"Non trouvé",
			ENTER_CLIENT_PIN: 			"Entrer le Code WPS du client",
			SWITCH_NOTE:				"Pour se connecter en WPS, merci d'activer le Wi-Fi via le bouton dédié",
			SWITCH_NOTE2:				"Remarque pour utiliser WPS vous devez configurer le Wii correctement au préalable.",
			STATUS_PIN_ERROR: 			"Code PIN WPS incorrect ? Merci de le vérifier.",
			STATUS_ERROR: 				"Erreur.",
			STATUS_CONN_ERROR: 			"Echec de connexion.",
			STATUS_CONNING: 			"Connexion en cours...",
			STATUS_CANCEL: 				"Connexion annulée.",
			
			NOTE: 						"Remarque:",
			BUTTON: 					"Position du bouton Wi-Fi sur Off",
			ENABLE: 					"Emission du signal Wi-Fi désactivée",
			HIDDEN: 					"Masquage du SSID activé",
			ENCRYPTION: 				"Chiffrement incorrect",
			WPS: 						"WPS est désactivé dans la page des paramètres système",

			
			STATUS_CONN_OVERLAP: 		"Echec de connexion (Chevauchement).",
			STATUS_CONN_TIMEOUT: 		"Echec de connexion (Temps dépassé).",
			STATUS_CONN_INACT: 			"Connexion inactive."

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"Clients Wi-Fi connectés",
			CLIENT_NUMBER: 				"Client N°",
			MAC_ADDRESS: 				"Adresse MAC",
			CONN_TYPE: 					"Type de connexion",
			SECURITY: 					"Sécurité",
			RECEIVED_PACKETS: 			"Paquets reçus",
			SEND_PACKETS: 				"Paquets émis"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"Paramètres",
			
			MODE_2G: 					"2. 4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"Permettre aux invités de se voir",

			ALLOW_LOCAL: 				"Permettre aux invités d'accéder à mon réseau local",
			
			WIRELESS: 					"Wi-Fi",
			WIRELESS_24G_RADIO: 		"Wi-Fi 2.4GHz",
			WIRELESS_5G_RADIO: 			"Wi-Fi 5GHz",
			ENABLE_GUEST: 				"Activer Réseau invités",

			NAME_SSID: 					"Nom de réseau (SSID)",
			HIDE_SSID: 					"Masquer le SSID",
			PASSWORD_CHANGE_CYCLE: 		"Intervalle de mise à jour du Mot de passe",
			PER_DAY: 					"Quotidien",
			PER_WEEK: 					"Hebdomadaire",
			PER_MONTH: 					"Mensuel",
			NEVER: 						"Jamais",
			SECURITY: 					"Sécurité",
			NO_SECURITY: 				"Pas de sécurité",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-Personnel",

			VERSION: 					"Version",
			AUTO: 						"Auto",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"Chiffrement",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"Mot de passe"
		},

		NAT:{
			SETTINGS: 					"NAT matériel",
			STATUS: 					"NAT matériel",
			
			ALG_TITLE: 					"Application Layer Gateway (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"Passthrough PPTP",
			L2TP_ALG: 					"Passthrough L2TP",
			IPSEC_ALG: 					"Passthrough IPSec",

			ENABLE_FTP_ALG: 			"Activer FTP ALG",
			ENABLE_TFTP_ALG: 			"Activer TFTP ALG",
			ENABLE_H323_ALG: 			"Activer H323 ALG",
			ENABLE_RTSP_ALG: 			"Activer RTSP ALG",
			ENABLE_PPTP_ALG: 			"Activer PPTP Passthrough",
			ENABLE_L2TP_ALG: 			"Activer L2TP Passthrough",
			ENABLE_IPSEC_ALG: 			"Activer IPSec Passthrough",
			NAT_ENABLE_NOTICE: 			"Remarque: Vos configuration ne seront pas activés tant que le NAT est actif."
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"Serveurs Virtuels",

			SERVICE_NAME: 				"Type de Service",
			EXTERNAL_PORT: 				"Port externe",
			INTERNAL_IP: 				"IP Interne",
			INTERNAL_PORT: 				"Port Interne",
			PROTOCAL: 					"Protocole",

			BTN_VIEW: 					"Visualiser les services existants",

			EXSITTING_SERVICE: 			"Services existants",
			
			PROTOCAL_ALL: 				"Tous",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX or XX)",
			EXT_PORT_TIPS: 				"(XX ou XX-XX ,1-65535)",
			INT_PORT_TIPS: 				"(XX ou Vide ,1-65535)",

			NOTICE:						"2. En conflit avec le port d'administration distante. Etes vous sûr de vouloir continuer ?",
			NOTICE_INVALID_REMOTE:		"Administration distante impossible en raison d'un conflit sur le port 80 avec un serveur virtuel.",
			NOTICE_ENTER_ANOTHER:		"En conflit avec le port d'administration distante. Merci de choisir un autre numéro de port.",
			NOTICE_PPTP_CONFLICT:		"En conflit avec le port VPN PPTP. Merci de saisir un autre numéro de port.",
			NOTICE_OPENVPN_CONFLICT:	"En conflit avec le port OpenVPN. Merci de saisir un autre numéro de port.",


			ENABLE_THIS_ENTRY: 			"Activer",
			OPERATION: 					"Action",
			CHOOSE: 					"Sélectionner",
			NAT_ENABLE_NOTICE: 			"Remarque: Vos configuration ne seront pas activés tant que le NAT est actif."
		},

		PORT_TRIGGERING:{
			TITLE: 						"Déclenchement par Port",
			APPLICATION: 				"Application",
			TRIGGER_PORT: 				"Port déclencheur",
			TRIGGER_PROTOCOL: 			"Protocole déclencheur",

			EXTERNAL_PORTS: 			"Port externe",
			EXTERNAL_PROTOCOL: 			"Protocole externe",

			BTN_VIEW: 					"Visualiser les applications existantes",

			EXSITTING_APPLICATION: 		"Applications existantes",
			APPLICATION_NAME: 			"Nom d'application",
			TRIGGER_TIPS: 				"(XX,1-65535)",
			EXTERNAL_TIPS: 				"(XX ou XX-XX,1-65535,au moins 5 paires)",
			
			NOTICE_PPTP_CONFLICT:		"En conflit avec le port VPN PPTP. Merci de saisir un autre numéro de port.",
			NOTICE_OPENVPN_CONFLICT:	"En conflit avec le port OpenVPN. Merci de saisir un autre numéro de port.",
			
			ENABLE_THIS_ENTRY: 			"Activer",
			OPERATION: 					"Action",
			
			PROTOCAL_ALL: 				"Tous",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"Remarque: Vos configuration ne seront pas activés tant que le NAT est actif."
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"Activer DMZ",
			HARDWARESTATUS: 			"Adresse IP Hôte DMZ",
			NAT_ENABLE_NOTICE: 			"Remarque: Vos configuration ne seront pas activés tant que le NAT est actif."
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"Liste de services UPnP",
			CLIENT_NUMBER: 				"Client N°",
			SERVICE: 					"Description du service",
			EXTERNAL_PORT: 				"Port externe",
			PROTOCAL: 					"Protocole",
			IP_ADDR: 					"Adresse IP interne",
			INTERNAL_PORT: 				"Port Interne",
			NAT_ENABLE_NOTICE: 			"Remarque: Vos configuration ne seront pas activés tant que le NAT est actif."
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"Modem USB",
			LOCATION: 					"Pays",
			MOBILE_ISP: 				"FAI Mobile",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"Mode de connexion",
			CONNECT_ON_DEMAND: 			"Connexion à la demande",
			CONNECT_AUTOMATICALLY: 		"Connexion automatique",
			CONNECT_MANUALLY: 			"Connexion manuelle",
			MAX_IDLE_TIME: 				"Durée d'inactivité Max",
			CONNECTION_TIP: 			"L'accès internet est défini à : Préférence au WAN.",
			IDLE_TIME_TIP: 				"Le mode de connexion et le temps d'inactivité maximale ne peuvent être définis manuellement.",
			MINUTES: 					"minutes, (0 signifie actif en permanence.)",

			AUTHENTICATION_TYPE: 		"Type d'authentification",
			AUTO: 						"Auto",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"Par défaut positionné sur Auto, ne pas changer sauf nécessité.",

			CONNECT: 					"Se connecter",
			DISCONNECT: 				"Se déconnecter",

			SET_TIP: 					"Définir le n° de connexion, l'APN, le nom et le Mot de passe manuellement.",
			DIAL_NUMBER: 				"Numéro de connexion",
			APN: 						"APN",
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			OPTIONAL: 					"(Optionnel)",
			MTU_SIZE: 					"Taille du MTU (en octets)",
			MTU_SIZE_TIP: 				"Par défaut 1480, ne pas modifier sans raisons. ",

			USE_FOLLOW_DNS_SERVER: 		"Utiliser les serveurs DNS suivants",
			PRIMARY_DNS: 				"DNS Primaire",
			SECOND_DNS: 				"DNS Secondaire",

			UNPLUGGED: 					"Débranché",
			IDENTIFYING: 				"Identification...",
			IDENTIFY_SUCCESS: 			"Identifié avec succès"
		},

		DISK_SETTING: {
			DISK_SET: 					"Disques USB",
			SCAN: 						"Rechercher",
			SELFLY_REMOVE: 				"Déconnexion sécurisée",
			SCAN_RESULT: 				"%n  disque(s) détecté(s).",
			NOT_FOUND: 					"Non trouvé",
			SELFLY_REMOVE: 				"Déconnexion sécurisée",
			
			VOLUMN: 					"Volume",
			CAPACITY: 					"Capacité",
			FREESPACE: 					"Espace libre",
			USBSPACE: 					"Espace utilisé",
			
			STATUS: 					"Etat",
			INACT: 						"Désactiver",
			ACTIVE: 					"Actif",
			
			USAGE: 						"Utilisation",
			CAPACITY: 					"Capacité",
			OPERATION: 					"Action",	
			
			ACC: 						"Gestion de compte", 	 	
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			USE_LOGIN: 					"Utiliser le compte par défaut",
			SCAN: 						"Rechercher",
			ENJECT_ALL: 				"Tout éjecter",
			ENJECT: 					"Ejecter",
			ADD_USER: 					"Ajouter un utilisateur",
			AUTH: 						"Autorité"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"Téléchargement hors connexion.",
			ITEMS:						"Eléments",
			FILE:						"Fichier",
			FOLDER:						"Dossier",
			SIZE:						"Taille",
			STATUS:						"Etat ",
			DOWNLOAD:					"Téléchargement",
			REMAINTING:					"Temps restant",
			SPEED:						"Vitesse",
			SOURCE:						"Source",	
			DOWNLOADTO:					"Télécharger vers",	
			TORRENT_PC:					"Torrent depuis le PC",
			TORRENT_USB:				"Torrent depuis l'USB",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"Port TCP aMule",
			AMULEUDP:					"Port UDP aMule",
			AMULESERVER:				"Serveur aMule",
			SCHEDULE:					"Planification",
			MAXACTIVE:					"Nombre maximal de tâches actives",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"Fuseau horaire",
			DOWNLOADTIME:				"Durée de téléchargement",
			REPEAT:						"Répéter",
			SPEEDLIMIT:					"Limitation de débit",
			MAXDOWNLOAD:				"Vitesse de téléchargement maximale",
			MAXUPLOAD:					"Vitesse de téléversement maximale",
			SPEEDTIPS:					"(0 signifie illimité.)",
			BTPORT:						"Port de téléchargement BT",
			SEED:						"Continuer à diffuser après achèvement du téléchargement",
			UNIT:						"KB/S",
			MODIFY:						"Modifier",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"Emplacement du fichier Torrent",
			CONNECT:					"Connecté",
			DISCONNECTED:				"Déconnecté",
			CONNECTING:					"Connexion",
			GENERAL:					"Général",
			COMPLETED:					"Achevé",
			NEWDEVICE:					"Nouvel appareil",
			FOUNDUSB:					"Nouveau périphérique USB détecté",
			CONNECTEDPEERS:				"Pairs connectés",
			OF:							"de",
			NUM_OF_CON:					"Nombre de connexions.",
			NUM_OF_CON_G:				"Nombre maximum global de connexion.",
			NUM_OF_CON_PT:				"Nombre maximal de Pairs connectés par Torrent",
			EN_DHT_NET:					"Activer le réseau DHT",
			EN_PE_EX:					"Permettre l'échange pair à pair",
			EN_BT:						"Activer le chiffrement du protocole Bit Torrent",
			GENERAL_SETTINGS:			"Paramètres généraux.",
			BT_SETTINGS:				"Paramètres BT",
			AMULE_SETTINGS:				"Paramètres aMule",
			CLEAN:						"Suppression achevée",
			NONE_COMPLETE: 				"Aucune tâche achevée."
		},

		FOLDER: {
			TITLE: 						"Paramètres de partage",
			ACCOUNT_TITLE: 				"Compte de partage",
			ACCOUNT:					"Compte",
			AC_NOTE: 					"Préparer un compte pour partager les contenus. Vous pouvez utiliser le compte de connexion au routeur ou en créer un autre.",
			
			AC_LOGIN: 					"Utiliser le compte par défaut",
			AC_FOLLOW: 					"Utiliser un nouveau compte",

			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",
			CONFIRM: 					"Confirmer le Mot de passe",

			SHARING_SETTING: 			"Paramètres de partage",
			SERVER_NAME: 				"Nom duserveur : de médias/réseau",

			METHOD: 					"Méthode d'accès",
			LINK: 						"Lien",
			PORT: 						"Port",

			NETWORK_NEIGHBORHOOD: 		"Voisinage réseau",
			FTP: 						"FTP",
			FTPEX: 						"FTP (via internet)",

			SHARE_FOLDER: 				"Dossier de partage",
			SHAREING_ALL: 				"Partager tout",
			NOTE:  						"Basculer sur On pour partager tous les dossiers et fichiers ou conserver sur Off pour ne partager que les dossiers spécifiés.", 
			ENABLE_AUTHENTICATION: 		"Activer Authentification",
			SHAREING_FOLDER: 			"Dossiers de partage",
			
			SHARE_NAME: 				"Nom de dossier",
			FOLDER_PATH: 				"Chemin d'accès",
			VOLUMN_NAME: 				"Nom de volume",

			SHARE_NAME: 				"Nom de dossier",
			FOLDER_PATH: 				"Chemin d'accès",
			MEDIA_SHARING: 				"Serveur de médias",
			STATUS: 					"Etat",

			GUEST_ACCESS: 				"Autoriser l'accès aux invités",
			ENABLE_AUTHENTICATION: 		"Activer Authentification",
			ENABLE_WRITE_ACCESS: 		"Activer l'écriture",
			ENABLE_MEDIA_SHARE: 		"Activer le partage de médias",
			
			BROWSE: 					"Naviguer",
			BROWSE_TITLE: 				"Choisir un dossier",

			NO_VOLUMN:					"Aucune imprimante détectée",
			
			NOTICE: 					"Etes vous sûr de vouloir quitter la page DNS Dynamique ? Presser Sauvegarder pour enregistrer et quitter. Presser Quitter pour quitter sans sauvegarder. Presser Annuler pour rester.",
			NO_CHANGE_NOTICE: 			"Etes vous sûr de vouloir quitter la page DNS Dynamique ?",

			SAVE_FAILED_NOTICE: 		"Echec de la sauvegarde",
			CONTINUE: 					"Quitte",
			CONTINUE_SAVE: 				"Sauvegarder",
			CANCLE: 					"Annuler",

			ENABLE: 					"Activer"

		},

		PRINT:{
			TITLE: 						"Serveur d'impression",
			NAME: 						"Nom de l'imprimante",
			ENABLE_PRINT_SERVER: 		"Serveur d'impression",
			NONE: 						"Aucune imprimante détectée",
			
			NOTE_TITLE: 				"Remarque:",
			STEP1: 						"Etape 1 :",
			STEP2: 						"Etape 2 :",
			STEP3: 						"Etape 3 :",

			NOTE1: 						"Connecter l'imprimante USB au routeur avec un cordon USB.",
			NOTE2: 						"Installer les pilotes de l'imprimante sur votre ordinateur en vous référant aux instructions du mode d'emploi.",
			NOTE3: 						"Installer l'utilitaire TP-LINK ''Contrôleur d'imprimante USB'' depuis le cd de ressources (Windows uniquement) ou téléchargé  (Windows & OS X) depuis  <a class=\"link\" target=\"blank\" href=\"http://www.tp-link.com/fr/Support/\">http://www.tp-link.fr/Support/</a>.",
			NOTE3_US: 					"Installer le contrôleur d'imprimantes USB TP-LINK. Merci de le télécharger depuis notre site : <a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>."
            },

		PARENTAL_CTR:{
			TITLE: 						"Contrôle parental",
			STATUS: 					"Contrôle parental",
			UNKNOWN: 					"Inconnu",

			DEVICE_CTR: 				"Appareils soumis au contrôle parental",
			DEVICE: 					"Nom d'appareil",
			MAC_ADDRESS: 				"Adresse MAC",
			TIME: 						"Horaires d'accès à Internet",
			DESCRIPTION: 				"Description",
			
			ENABLE_THIS_ENTRY: 			"Activer",
			OPTIONAL: 					"(Optionnel)",
			BTN_VIEW: 					"Visualiser les appareils connectés",
			
			DEVICE_LIST: 				"Liste d'appareils",
			SYSTEM_TIME: 				"Heure système",
			
			RESTR: 						"Restriction de contenu",
			MODE: 						"Restriction",
			BLACKMODE: 					"Liste noire",
			WHITEMODE: 					"Liste Blanche",
			ACCESS_DEVICES_LIST: 		"liste des appareils",
			
			CHOOSE: 					"Sélectionner",
			ADD_A_NEW_KEYWORD: 			"Ajouter un nouveau mot clé à bloquer.",
			ADD_A_NEW_DOMAIN_NAME: 		"Ajouter un nouveau nom de domaine autorisé.",
			
			YOURPC:						"Votre ordinateur"
		},

		STREAMBOOST: {
			TITLE: 						"Streamboost",
			INTERNET: 					"Internet",
			ROUTER: 					"Routeur",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"OS X/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"Autres",

			DEVICE: 					"Appareil",
			RATE: 						"Débit",
			APPLICATION: 				"Application",

			NAME: 						"Nom",
			MAC_ADDRESS: 				"Adresse MAC",
			IP_ADDRESS: 				"Adresse IP",


			DEVICES: 					"Appareils"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"Bande passante",
			TEST_BANDWIDTH: 			">Tester la bande passante",
			STREAMBOOST: 				"streamboost",
			ENABLE_STREAMBOOST: 		"Activer streamboost",
			UP_LIMITATION: 				"Limitation téléversement (Mbps)",
			DOWN_LIMITATION: 			"Limitation téléchargement (Mbps)",
			RUN_BANDWIDTH_TEST: 		"Lancer le test de bande passante",
			TESTING: 					"Test",
			TEST_FAILED: 				"Echec du test",
			TEST_SUCCEED: 				"Succès du test",
			ENABLE_AUTOMATIC_TEST: 		"Activer test automatique",
			KEEP_UP_TO_DATE: 			"Conserver Streamboost à jour",
			ENABLE_AUTOMATIC_UPDATE: 	"Activer mise à jour automatique"

		},

		PRIORITY:{
			PRIORITY: 					"Priorité",
			PRIORITY_TIPS: 				"Les priorités vous permettent de modifier l'importance d'un appareil par rapport à un autre. C'est utile quand les appareils concourent pour des applications identiques en présence d'une bande passante limitée.",
			ALL_DEVICE: 				"Tous les appareils",
			ACTIVE_DEVICE: 				"Appareil actif",
			SAVE: 						"Sauvegarder",
			ID: 						"N°",
			DEVICE: 					"Appareil",
			TYPE: 						"Type",
			MAC_ADDRESS: 				"Adresse MAC",
			STICK: 						"Bâton"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"Statistiques",
			UP_TIME: 					"Durée d'activité",
			DOWNLOADS: 					"Téléchargements",
			LAST_DAY: 					"depuis 1 jour",
			LAST_WEEK: 					"depuis 1 semaine",
			LAST_MONTH: 				"depuis 1 mois",
			ALL_LAN_HOSTS: 				"Tous les hôtes LAN",
			OTHER: 						"Autre"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"Pare-feu",
			ENABLE_SPI: 				"Pare-feu SPI",

			DOS_PROTECTION: 			"Protection DoS",
			ENABLE_DOS: 				"Protection DoS",
			
			OFF: 						"Inactif",
			LOW: 						"Faible",
			MIDDLE: 					"Moyen",
			HIGH: 						"Elevé",

			ICMP: 						"Filtrage des attaques ICMP-FLOOD",
			UDP: 						"Filtrage des attaques UDP-FLOOD",
			TCP: 						"Filtrage des attaques TCP-SYN-FLOOD",
			ENABLE_DOS_TIP:             "La protection contre les Dénis de Service (DoS) et les statistiques de trafic doivent être activés simultanément.",

			IGNORE: 					"Ignorer les paquets PING issus du port WAN",
			FORBID: 					"Interdire les paquets PING issus du port LAN",

			BLOCK_DOS: 					"Liste d'hôtes DoS bloqués",
			HOST_NUMBER: 				"Hôte N°",
			IP_ADDRESS: 				"Adresse IP",
			MAC_ADDRESS: 				"Adresse MAC"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"Contrôle d'accès",
			ENABLE_ACCESS: 				"Contrôle d'accès",

			ACCESS_MODE: 				"Mode d'accès",
			DEFAULT_ACCESS_MODE: 		"Mode d'accès par défaut",
			BLACK_LIST: 				"Liste noire",
			WHITE_LIST: 				"Liste Blanche",
			
			WIRED:						"Filaire",
			WIRELESS:					"Wi-Fi",

			DEVICE_ONLINE: 				"Appareils connectés",
			NAME: 						"Nom d'appareil",
			IP_ADDRESS: 				"Adresse IP",
			MAC_ADDRESS: 				"Adresse MAC",
			CONN_TYPE: 					"Type de connexion",

			BLOCK: 						"Bloquer",

			DEVICE_IN_WHITE: 			"Appareils en liste blanche",
			DEVICE_IN_BLACK: 			"Appareils en liste noire"
		},

		IP_MAC:{
			TITLE: 						"Paramètres",
			ENABLE_ARP: 				"Association ARP",

			ARP_LIST: 					"Liste ARP",
			ARP_NUM: 					"N° d'entrée ARP",

			MAC_ADDRESS: 				"Adresse MAC",
			IP_ADDRESS: 				"Adresse IP",
			BOUND: 						"Lier",
			UNBOUND: 					"Délier",

			BINDING_LIST: 				"Liste d'associations",
			DESCRIPTION: 				"Description",
			OPTIONAL: 					"(Optionnel)",
			ENABLE_THIS_ENTRY: 			"Activer"
		},

		TIMESET: {
			TITLE: 						"Paramètres de temps",
			ZONE: 						"Fuseau horaire",
			DATE: 						"Date",
			DATEFORMAT: 				"MM/JJ/AAAA",
			TIME: 						"Heure",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"Serveur NTP primaire",
			NTP2: 						"Serveur NTP secondaire",
			OPTIONAL: 					"(Optionnel)",

			CURRENT_TIME:  				"Date et heure actuelle",
			SET_TIME: 					"Définir date et heure",
			AUTOMATIC: 					"Obtenir automatiquement depuis internet",
			MANUAL: 					"Manuellement",
			AUTOMATIC_BTN: 				"Obtenir",


			GETGMT: 					"Obtenir GMT",

			
			GETGMT_SUCCESS: 			"Succès de l'obtention de l'heure depuis le serveur NTP",
			GETGMT_TIMEOUT: 			"Echec de l'obtention de l'heure depuis le serveur NTP",
			GETGMT_WAIT: 				"Attente",
			
			M: 							"M",
			W: 							"S",
			D: 							"J",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"Heure d'été",
			ENABLE_DAYLIGHT: 			"Activer heure d'été",
			START: 						"Début",
			END: 						"Fin",

			RUNNING_STATUS: 			"Etat",
			DOWN: 						"Heure d'été inactive",
			UP: 						"Heure d'été active"
		},

		DIAG:{
			TITLE: 						"Diagnostics",
			DIAGNOSTIC_TOOL: 			"Outil de Diagnostic",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"Adresse IP/ Nom de domaine",
			COUNT: 						"Nombre de Ping",
			
			BASIC: 						"Basique",
			ADVANCED: 					"Avancé",
			
			COUNTUNIT: 					"(1 à 50)",

			PKT: 						"Taille du paquet Ping",
			PKTUNIT: 					"(4 à 1472 octets)",

			TIMEOUT: 					"Ping hors délai",
			TIMOUTUNIT: 				"(100-200 milli secondes)",

			TTL: 						"TTL Max Traceroute",
			TTLUNIT: 					"(1 à 30)",
			
			START: 						"Début",
			STOP: 						"Stop"
		},

		FIRMWARE:{
			TITLE: 						"Mise à jour logicielle",
			FIRMWARE_INFO:  			"Le firmware est à jour.",
			INFO: 						"Informations sur l'appareil",
			REMOTE_TITLE: 				"Mise à jour en ligne",
			LOCAL_TITLE: 				"Mise à jour locale",

			NEWFILE: 					"Fichier de mise à jour",
			FIRMWAREVERSION: 			"Version logicielle",
			HARDWAREVERSION: 			"Version matérielle",
			LATESTVERSION: 				"Version la plus récente",
			CONFIRM_CONTENT:			"Etes vous sûr de vouloir mettre à jour le firmware ?",
			WARNING:					"Mise à jour du firmware en cours…</br>Pour éviter tout dommage, Maintenir l'appareil sous tension et éviter tout accès au produit durant cette opération.",
			REBOOTING: 					"Redémarrage en cours…</b>Pour éviter tout dommage, Maintenir l'appareil sous tension et éviter tout accès au produit durant cette opération.",
			DO_NOT_OPERATE: 			"Mise à jour…<br/>Merci de ne pas intervenir pendant la procédure.",
			FIRMWARE_UPDATING_NOTE: 	"1. Mise à jour du firmware….",
			REBOOTING_NOTE: 			"2. Redémarrage en cours…",
			SCREEN_UPDATING_NOTE: 		"3. Mise à jour de l'écran…",
			UPGRADE_FAILED: 			"Echec de la mise à jour.",
			UPGRADE: 					"Mettre à jour",
			CHECK: 						"Vérifier",
			DOWNLOADING: 				"Téléchargement en cours…",
			UPGRADE_INOF: 				"Pour éviter tout dommage, Maintenir l'appareil sous tension.",
			NOTE: 						"Remarque: ",
			NO_UPGRADE: 				"C'est la version la plus récente.",

			UPGRADING: 					"Mise à jour en cours…",
			RETRY: 						"Réessayer",
			CANCEL: 					"Annuler",
			ILEGAL_DEVICE:				"Impossible d'identifier l'appareil. Merci de contacter le support technique TP-LINK.",
			UPGRADE_FAIL: 				"Impossible de mettre à jour. Merci de réessayer plus tard.",
			CHECK_UPGRADE:				"Vérifier l'existence d'une mise à jour"
		},

		BACKUP:{
			BACKUP: 					"Sauvegarde",
			BACKUPTIP: 					"Sauvegarder une copie de vos paramètres actuels.",

			RESTORE: 					"Restaurer",
			RESTORETIP: 				"Restaurer depuis un fichier de sauvegarde.",
			
			RESTORE_WARN:				"Restauration du routeur... <br/> Merci de ne pas utiliser durant ce processus.",
			RESTORE_CONFIRM_CONTENT: 	"Etes vous sûr de vouloir restaurer le routeur depuis un fichier de sauvegarde ?",
			
			FILE: 						"Fichier",

			FACTORY: 					"Paramètres par défaut",
			FACTORYTIP: 				"Reconfigurer le routeur à ses paramètres par défaut.",
			FACTORY_CONFIRM_CONTENT:	"Etes vous sûr de vouloir restaurer les paramètres d'usine du routeur ?",
			FACTORY_WARN:				"Restauration du routeur... <br/> Merci de ne pas utiliser durant ce processus.",
			
			BACKUPBTN: 					"Sauvegarde",
			RESTOREBTN: 				"Restaurer",
			FACTORYBTN: 				"Restaurer aux paramètres d'usine"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"Gestion de compte",
			
			OLDUSER: 					"Ancien nom d'utilisateur",
			OLDPWD: 					"Ancien Mot de passe",

			NEWUSER: 					"Nouveau nom d'utilisateur",
			NEWPWD: 					"Nouveau Mot de passe",
			CONFIRM: 					"Confirmer Mot de passe",

			RECOVERYINFO: 				"Récupération du Mot de passe",
			ENABLE_PASSWORD_RECOVERY: 	"Activer récupération du Mot de passe",
			FROM: 						"De",
			TO: 						"A",
			SMTP_SERVER: 				"Serveur SMTP",
			
			ENABLE_AUTHENTICATION: 		"Activer Authentification",
			USERNAME: 					"Nom d'utilisateur",
			PASSWORD: 					"Mot de passe",

			TEST_MAIL: 					"Test d'envoi",

			LOCAL:						"Administration Locale",
			LOCAL_MAC_AUTH: 			"Authentification de l'adresse MAC locale",
			ACCESS: 					"Accès autorisé à tous les appareils connectés au LAN",
			ACCESS_TIPS: 				"Basculer sur On pour autoriser tous les appareils connectés au LAN à administrer le routeur ou conserver sur Off pour n'autoriser que l'appareil spécifié.",
			
			MAC_ADDRESS: 				"Adresse MAC",
			VIEW_BTN: 					"Visualiser les appareils connectés",
			DESCRIPTION: 				"Description",

			EXIST_DEVICE:               "Appareils existants",

			OPTIONAL: 					"(Optionnel)",
			ENABLE_THIS_ENTRY: 			"Activer",

			DEVICE_NAME:				"Nom d'appareil",
			IP_ADDRESS:					"Adresse IP",
			

			REMOTE: 					"Administration distante",
			DISABLE_REMOTE_MANAGEMENR: 	"Désactiver l'administration distante",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"Activer l'administration distante pour tous les appareils",
			ENABLE_REMOTE_MANAGEMENR: 	"Activer l'administration distante pour les appareils spécifiés",
			WEB: 						"port d'administration Web",

			NOTICE:						"En conflit avec le port de serveur virtuel ! Etes vous sûr de vouloir continuer ?",
			NOTICE_ENTER_ANOTHER:		"En conflit avec le port d'un serveur virtuel. Merci de choisir un autre numéro de port.",

			REMOTEIP: 					"Adresse IP d'administration distante",
			REMOTEIPNOTE: 				"(Saisir 255.255.255.255 pour toutes)"
			
		},

		SYSLOG:{
			TITLE: 						"Journal système",
			LOG_FILTER: 				"Filtre de journal :",
			
			TYPE_EQ: 					"Type =",
			
			ALL: 						"Tout",

			FIREWALL: 					"Pare-feu", 
			NAT: 						"NAT",
			DDNS: 						"DNS Dynamique",
			UPNP:						"UPnP",
			IMB:            			"Association IP&MAC",
			IPTV:						"IPTV",
			DHCPS:						"Serveur DHCP",
			IGMP_PROXY:					"Proxy IGMP",
			DOMAIN_LOGIN:				"Domaine d'authentification",
			BASIC_SECURITY: 			"Sécurité de base",
			PARENTAL_CONTROL: 			"Contrôle parental",
			ACCESS_CONTROL: 			"Contrôle d'accès",
			DOS_PROTECTION: 			"Protection DoS",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"Statistiques de trafic",
			TIME_SETTINGS: 				"Paramètres de temps",
			ACCOUNT_MANAGEMENT: 		"Gestion de compte",
			LOCAL_MANAGEMENT: 			"Administration Locale",
			REMOTE_MANAGEMENT: 			"Administration distante",
			LOCALE: 					"Locale",
			FACTORY_RESET: 				"Réinitialisation aux paramètres d'usine",
			LED_CONTROLLER: 			"Contrôleur DEL",
			NETWORK: 					"Network",
			USBSHARE: 					"Partage USB",
			AND: 						"et",
			LEVEL: 						"Niveau",
			EMERGENCY:					"Urgence",
			ALERT:						"Alerte",
			CRITICAL:					"Critique",
			ERROR: 						"Erreur",
			WARNING: 					"Attention",
			NOTICE: 					"Notification",
			INFO: 						"Information",
			DEBUG: 						"Débogage",

			INDEX: 						"Index",
			TYPE: 						"Type",
			TIME: 						"Heure",
			LEVEL_COL:					"Niveau",

			CONTENT: 					"Contenu",
			
			MAIL_LOG: 					"Envoyer journal",
			SAVE_LOG: 					"Sauvegarder journal",

			SEND_OK: 					"Envoyer OK",
			SEND_FAILED: 				"Envoyer Echec",

			MAIL_SETTING: 				"Paramètres d'email",

 			FROM: 						"De",
 			TO: 						"A",
 			SMTP_SERVER: 				"Serveur SMTP",
 			ENABLE_AUTHENTICATION: 		"Activer Authentification",

 			USERNAME: 					"Nom d'utilisateur",
 			PASSWORD: 					"Mot de passe",
 			CONFIRM_PASSWORD: 			"Confirmer le Mot de passe",

 			AUTO_MAIL: 					"Activer planification Email",
 			LOG_AT: 					"Envoyer à",
 			HH_MM: 						"(HH:MM) Au quotidien",

 			LOG_EVERY: 					"Envoyer toutes les",
 			HOURS: 						"heures"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"Paramètres",
			STATUS: 					"Activer QoS",
			UPBANDWIDTH: 				"Bande passante de téléversement",
			DOWNBANDWIDTH: 				"Bande passante de téléchargement",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"Test de vitesse",
			RULE_LIST: 					"Liste de règles de QoS",
			RULE: 						"Règle QoS",
			ID: 						"N°",
			NAME: 						"Nom",
			TYPE: 						"Type",
			DETAIL: 					"Détail",
			PRIORITY: 					"Priorité",

			APPLICATION: 				"Application",
			APPLICATION_LIST: 			"Liste d'applications",
			CUSTOM_APP: 				"Application personnalisée",
			MAC_ADDR: 					"Adresse MAC",
			MAC_ADDR_P: 				"MAC",
			IP_ADDR: 					"Adresse IP",
			IP_P: 						"Adresse IP :",
			PHYSICAL_PORT: 				"Port physique",

			LOW: 						"Faible",
			MIDDLE: 					"Moyen",
			HIGH: 						"Elevé",

			PROTO: 						"Protocole",
			PORT: 						"Port",
			PROTO_P: 					"Protocole :",
			PORT_P: 					"Port :",
			PORT_TIPS: 					"(XX ou XX-XX,1 à 65535, au moins 5 paires)",

			ALL: 						"Tous",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"Personnalisé",

			WIFI_HOME: 					"Client Wi-Fi",
			WIFI_GUEST: 				"Invité Wi-Fi",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"Mise à jour de la base de données",

			NEWFILE: 					"Nouvelle base de données",
			FIRMWAREVERSION: 			"Version de la base de données",
			CONFIRM_CONTENT:			"Etes vous sûr de vouloir mettre à jour la base de données ?",
			WARNING:					"Mise à jour de la base…<br/>Merci de ne pas utiliser pendant le processus.",
			
			UPGRADE: 					"Mettre à jour",

			SERVICE_RESTART: 			"Redémarrage du service QoS",
			
			TYPE: 						"Type",
			BY_DEVICE: 					"Par appareil",
			BY_APP: 					"Par Application",
			BY_PHY: 					"Par port physique",

			HIGH_PRIORITY_LBL: 			"Priorité élevée :",
			MIDDLE_PRIORITY_LBL: 		"Priorité moyenne :",
			LOW_PRIORITY_LBL: 			"Priorité faible :",

			HIGH_PRIORITY: 				"Priorité élevée :",
			MIDDLE_PRIORITY: 			"Priorité moyenne :",
			LOW_PRIORITY: 				"Priorité faible :"

		},

		APPLICATION:{
			APP_LIST: 					"Liste d'applications",
			GAME_LIST: 					"Liste de jeux",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"Statistiques de trafic",
			ENABLE_STATISTICS: 			"Statistiques de trafic",

			TITLE: 						"Liste de statistiques de trafic",
			IP_MAC: 					"Adresse IP/Adresse MAC",
			TPKT: 						"Total Paquets",
			TBYTE: 						"Total octets",
			CPKT: 						"Paquets par intervalle",
			CBYTE: 						"octets par intervalle",
			CICMP: 						"ICMP Tx par intervalle",
			CUDP: 						"UDP Tx par intervalle",
			CSYN: 						"SYN Tx par intervalle",
			
			DELETE_CONFIRM: 			"Etes vous sûr de vouloir supprimer les statistiques de trafic ?",
			DELETE_ALL_CONFIRM: 		"Etes vous sûr de vouloir supprimer toutes les statistiques de trafic ?",

			RESET_ALL: 					"Tout réinitialiser"
		},

		SYSPARA:{
			W24G: 						"Wi-Fi 2.4GHz",
			W5G: 						"Wi-Fi 5GHz",
			W60G: 						"Wi-Fi 60GHz",
			W24G_WDS: 					"WDS 2.4GHz",
			W5G_WDS: 					"WDS 5GHz",
			W60G_WDS: 					"WDS 60GHz",
			SWITCH_NOTICE:  			"Remarque : Le signal Wi-Fi est désactivé. Si vous souhaitez utiliser le Wi-Fi, placez le bouton Wi-Fi sur la position ON.",

			ENABLE_TIPS: 				"Le signal Wi-Fi est désactivé.",

			BEACON: 					"Intervalle entre balises",
			BEACONUNIT: 				"(40 à 1000)",

			RTS: 						"Seuil RTS",
			RTSUNIT: 					"(1 à 2346)",
			
			FRAG: 						"Seuil de fragmentation",
			FRAGUNIT: 					"(256 à 2346)",

			DTIM: 						"Intervalle DTIM",
			DTIMUNIT: 					"(1 à 15)",

			GROUP: 						"Intervalle de génération",
			GROUPUNIT: 					"secondes",
			
			MU_MIMO_FEATURE: 			"MIMO Multi-utilisateurs",
			MU_MIMO: 					"Activer MU-MIMO",
			
			WMM_FEATURE: 				"WMM",
			WMM: 						"Activer WMM",

			GI_FEATURE: 				"GI court",
			GI: 						"Activer GI court",

			AP_FEATURE: 				"Isolement",
			AP: 						"Activer Isolement",

			WDS_FEATURE: 				"Pontage WDS",
			WDS: 						"Activer pontage WDS",
			
			SSID_BRIDEGE: 				"SSID (distant)",
			SURVEY: 					"Détecter",

			SN: 						"N° de série",
			MAC_ADDRESS: 				"Adresse MAC",
			SSID: 						"SSID",
			SIGNAL: 					"Signal",
			CHANNEL: 					"Canal",
			SECURITY: 					"Sécurité",
			CHOSEN: 					"Choisi",
			AP_NUMBER:					"N° PA",

			TOTAL: 						"Nombre d'éléments",

			MAC: 						"Adresse MAC (distante)",
			MACUNIT: 					"Exemple : 00-1d-0f-11-22-33",

			SECURITY: 					"Sécurité",
			NO: 						"Non",
			NONE: 						"Pas de sécurité",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"Mot de passe",
			
			AUTH_TYPE: 					"Type auth.",
			AUTO: 						"Auto",
			OPEN: 						"Système ouvert",
			SHARED: 					"Clé partagée",

			WEP_INDEX: 					"Index WEP",
			KEY1: 						"Clé 1",
			KEY2: 						"Clé 2",
			KEY3: 						"Clé 3",
			KEY4: 						"Clé 4",

			WEP_KEY_FORMAT: 			"Format de clé WEP ",
			ASC: 						"ASCII",
			HEX: 						"Hexadécimal",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"Activer WPS",

			NAT: 						"NAT",
			ENABLE_NAT: 				"Activer NAT",
			
			NAT_BOOST: 					"Boost NAT",
			ENABLE_NAT_BOOST: 			"Activer Boost NAT",
			
			MEDIA_SERVER: 				"Serveur de médias",
			SCAN_INTERVAL: 				"Intervalle de détection automatique (Heures)",
			SCAN_UNIT: 					"(2 à 48)",

			DOS_PROTECTION: 			"Paramètres de niveau de la protection DoS",

			ICMP: 						"Niveau de paquets ICMP-FLOOD",
			UDP: 						"Niveau de paquets UDP-FLOOD",
			TCP: 						"Niveau de paquets TCP-FLOOD",

			WDS_MODE: 					"Mode WDS",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"Faible",
			MIDDLE: 					"Moyen",
			HIGH: 						"Elevé",

			TO: 						"A",
			NOTICE_NAT_REBOOT: 			"Redémarrage... <br/>Merci de ne pas utiliser pendant le processus.",

			NOTICE_NAT_BOOST: 			"Toute modification de la fonction NAT Boost impliquera un redémarrage de l'appareil, êtes vous sûr de vouloir continuer ?",
			NOTICE:						"Le canal Wi-Fi de votre routeur diffère de celui utilisé par le point d'accès ponté. Voulez-vous le modifier",

			UNIT: 						"(5 à 7200) paquets/seconde",
			LED: 						"DEL",
			NIGHT_MODE: 				"Mode nuit",
			PERIOD_NIGHT_TIME: 			"Etendue du mode nuit",
			ENABLE: 					"Activer le mode nuit",
			HH_MM: 						"(HH:MM)",
			TO: 						"A",
			NIGHT_MODE_NOTE:            "DEL éteinte. Si vous voulez utiliser cette fonction, Cliquer sur l'icône (en haut à droite de cette page) ou le bouton DEL.",
			NOTE2:                      "Le mode nuit s'active en fonction de l'heure système. Merci de vous assurez que vous avez déjà paramétré l'heure système du routeur."
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"Aucun certificat actuellement, Merci d'en <b>Générer</b> un avant d'activer le serveur VPN.",
			NO_CERT_NOTE2: 				"Aucun certificat actuellement, Merci d'en <b>Générer</b> un avant d'exporter la configuration.",
			ENABLE_VPN_SERVER: 			"Activer le serveur VPN",
			SERVICE_TYPE: 				"Type de Service",
			SERVICE_PORT: 				"Port de service",
			VPN_SUBNET: 				"Sous-réseau/Masque de sous-réseau VPN",
			CLIENTS_ACCESS: 			"Accès client",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"Réseau local uniquement",
			INTERNET_HOME: 				"Réseau local et internet",
			CERT_STR: 					"Aucun certificat actuellement, Cliquer sur OK pour en générer un et sauvegarder votre configuration.",
			CERT_STR2: 					"Aucun certificat actuellement, Cliquer sur OK pour en générer un et exporter votre configuration.",
			CONF_FILE: 					"Type de configuration", 
			EXPORT_CONF_FILE: 			"Exporter la configuration.",
			EXPORT: 					"Export",

			PPTPVPN: 					"VPN PPTP",
			CLIENT_IP_ADDRESS: 			"Adresse IP du client",
			ACCOUNT_USERNAME: 			"Nom d'utilisateur",
			ACCOUNT_PASSWORD: 			"Mot de passe",
			CLIENT_IP_NOTE: 			"(Jusqu'à 10 clients)",
			SAME_SUBNET_NOTE: 			"L'adresse IP client et l'adresse IP LAN ne peuvent être dans le même sous réseau.</br>Merci d'en saisir une autre.",
			CONFLICT_WITH_DHCP: 		"L'adresse IP du client est en conflit avec la plage d'adresse du serveur DHCP.</br>Merci d'en saisir une autre.",
			CONFLICT_WITH_RESERVED: 	"L'adresse IP du client est en conflit avec l'adresse IP réservée.</br>Merci d'en saisir une autre.",
			CONFLICT_WITH_OPENVPN: 		"L'adresse IP client et l'adresse IP du VPN OpenVPN ne peuvent être dans le même sous réseau.</br>Merci d'en saisir une autre.",
			SAME_SUBNET_NOTE2: 			"Le sous-réseau/masque de sous-réseau du VPN et l'adresse IP LAN ne peuvent être dans le même sous réseau.</br>Merci d'en saisir un autre.",
			CONFLICT_WITH_DHCP2: 		"Le sous-réseau/masque de sous-réseau du VPN et la plage d'adresses IP du serveur DHCP sont en conflit.</br>Merci d'en saisir un autre.",
			CONFLICT_WITH_RESERVED2: 	"Le sous-réseau/masque de sous-réseau du VPN et l'adresse IP réservée sont en conflit.</br>Merci d'en saisir un autre.",
			CONFLICT_WITH_PPTPVPN: 		"Le sous-réseau/masque de sous-réseau du VPN et l'adresse IP du VPN PPTP ne peuvent être dans le même sous réseau.</br>Merci d'en saisir un autre.",
			LAN_CONFLICT_WITH_OPENVPN: 	"L'adresse IP LAN et l'adresse IP du VPN OpenVPN ne peuvent être dans le même sous réseau.</br>Merci d'en saisir une autre.",
			LAN_CONFLICT_WITH_PPTPVPN: 	"L'adresse IP LAN et l'adresse IP du VPN PPTP ne peuvent être dans le même sous réseau.</br>Merci d'en saisir une autre.",
			VPN_MASK_ERROR: 			"Le masque de sous réseau ne peut être supérieur à 255.255.255.248.</br>Merci d'en saisir un autre.",
			ACCOUNT_LIST: 				"Liste de comptes (jusqu'à 16 utilisateurs)",
			ADVANCED_SETTING: 			"Avancé",
			ALLOW_SAMBA: 				"Permettre l'accès SAMBA (emplacement réseau)",
			ALLOW_NETBIOS: 				"Permettre la traversée NetBIOS",
			ALLOW_UNENCRYPTED_CONN: 	"Permettre les connexions non chiffrées",
			USERNAME_CONFLICT: 			"Ce nom d'utilisateur existe déjà. Merci d'en saisir un autre.",
				
			NOTICE_VS_CONFLICT:			"En conflit avec le port externe du serveur virtuel. Merci de saisir un autre numéro de port.",
			NOTICE_PT_CONFLICT:			"En conflit avec le port déclenchant le port externe. Merci de saisir un autre port.",
			NOTICE_VS_MODIFY:			"En conflit avec le port externe du serveur virtuel (1723). Merci d'aller à la page <a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Serveurs Virtuels</a> et modifier le port externe du serveur virtuel.",
			NOTICE_PT_MODIFY:			"En conflit avec le port déclenchant le port externe (1723). Merci d'aller à la page <a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">Déclenchement par port</a> et modifier le port déclenchant le port externe.",
			
			GENERATE_CERT: 				"Certificat",
			GENERATE_NEW_CERT: 			"Générer le certificat.",
			GENERATE: 					"Générer",
			GENERATE_TIPS: 				"Génération de certificat…</br>Cela va prendre quelques minutes, merci de patienter.",
			CERT_SUCCESS: 				"Succès",
			CERT_FAIL: 					"Echec, merci d'essayer à nouveau.",
			
			VPN_CONNECTIONS: 			"Connexions VPN",
			OPEN_VPN_CONNECTIONS: 		"Connexion OpenVPN",
			PPTP_VPN_CONNECTIONS: 		"Connexion VPN PPTP",
			USER: 						"Utilisateur",
			REMOTE_IP: 					"IP Distante",
			ASSIGNED_IP: 				"IP assignée"
		}
	};
})(jQuery);
