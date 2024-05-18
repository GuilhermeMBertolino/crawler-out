(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les informations relatives à la connexion WAN(Internet)."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port WAN du routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Adresse IPv4 Attribuée au port WAN du routeur. Si la valeur est 0.0.0.0 il n'y a pas d'accès à internet."
			},{
				type: "name",
				title: "Masque de sous réseau",
				content: "Ce paramètre détermine l'adresse du sous réseau ainsi que le nombre d'hôtes possibles dans ce sous-réseau."
			},{
				type: "name",
				title: "Passerelle par défaut",
				content: "Adresse IP du routeur relié à internet."
			},{
				type: "name",
				title: "DNS Primaire/DNS Secondaire",
				content: "Le système de nom de domaine traduit le nom d'un site internet en son adresse IP. Les serveurs DNS des Fournisseurs d'Accès à Internet (FAI) stockent ces informations."
			},{
				type: "name",
				title: "Type de connexion",
				content: "Correspond au type de connexion WAN et dépend du FAI."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port WAN du routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Adresse IPv6 Attribuée au port WAN du routeur."
			},{
				type: "name",
				title: "Passerelle par défaut",
				content: "Adresse IP du routeur relié à internet."
			},{
				type: "name",
				title: "DNS Primaire/DNS Secondaire",
				content: "Le système de nom de domaine traduit le nom d'un site internet en son adresse IP. Les serveurs DNS des Fournisseurs d'Accès à Internet (FAI) stockent ces informations."
			},{
				type: "name",
				title: "Type de connexion",
				content: "Correspond au type de connexion WAN et dépend du FAI."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "Wi-Fi 2.4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche toutes les informations relatives aux réseaux Wi-Fi générés par l'appareil."
			},{
				type: "name",
				title: "Nom de réseau (SSID)",
				content: "Nom du réseau Wi-Fi (SSID = Service Set Identifier)."
			},{
				type: "name",
				title: "Emetteur Wi-Fi",
				content: "Etat du réseau Wi-Fi (Actif, Inactif)."
			},{
				type: "name",
				title: "Mode",
				content: "Mode Wi-Fi actuel."
			},{
				type: "name",
				title: "Largeur de canal",
				content: "Bande passante du canal Wi-Fi."
			},{
				type: "name",
				title: "Canal",
				content: "Canal Wi-Fi actuel"
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port WAN du routeur."
			},{
				type: "name",
				title: "Etat du WDS",
				content: "Etat actuel (Actif ou Inactif) du mode WDS."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche toutes les informations relatives aux ports réseau Ethernet."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port LAN du routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Adresse IPv4 Attribuée au port LAN du routeur."
			},{
				type: "name",
				title: "Masque de sous réseau",
				content: "Ce paramètre détermine l'adresse du sous réseau ainsi que le nombre d'hôtes possibles dans ce sous-réseau."
			},{
				type: "name",
				title: "DHCP",
				content: "Indique si le serveur DHCP du routeur est actif ou non."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port LAN du routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Adresse IPv6 Attribuée au port LAN du routeur."
			},{
				type: "name",
				title: "Adresse lien local",
				content: "Adresse IPv6 réservée aux communications dans le réseau local."
			},{
				type: "name",
				title: "Type assigné",
				content: "Type d'adresse IPv6 attribué au port LAN."
			}]
		},
		STATUS_GUEST: {
			TITLE: "Réseau invités 2.4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche toutes les informations relatives aux réseaux invités."
			},{
				type: "name",
				title: "Nom de réseau (SSID)",
				content: "Nom du réseau Wi-Fi ou SSID (Service Set IDentifier)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Indique si le nom du réseau invités est visible ou non."
			},{
				type: "name",
				title: "Emetteur Wi-Fi",
				content: "Etat du réseau Wi-Fi invités (Actif, Inactif)."
			},{
				type: "name",
				title: "Permettre aux invités de se voir",
				content: "Indique si les clients du réseau invités peuvent communiquer entre eux ou non."
			}]
		},
		STATUS_USB: {
			TITLE: "Appareils USB",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les informations relatives aux disques de stockage ou aux imprimantes connectées."
			},{
				type: "name",
				title: "Imprimante",
				content: "Nom de l'imprimante connectée (information disponible même si l'imprimante n'est pas supportée)."
			},{
				type: "name",
				title: "Disque USB",
				content: "Nom du disque USB connecté au routeur."
			},{
				type: "name",
				title: "Capacité",
				content: "Capacité de stockage du disque connecté."
			},{
				type: "name",
				title: "Disponible",
				content: "Espace libre sur le disque connecté."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Performances",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les informations relatives au routeur."
			},{
				type: "name",
				title: "Charge processeur",
				content: "Indique le taux de charge du processeur."
			},{
				type: "name",
				title: "Mémoire utilisée",
				content: "Indique la quantité de mémoire utilisée."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Clients filaires",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les informations relatives aux clients filaires connectés au réseau."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Clients Wi-Fi",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les informations relatives aux clients Wi-Fi connectés au réseau."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Type de Connexion internet : IP Statique"
			},{
				type: "paragraph",
				content: "Choisir ce réglage si votre connexion internet ne requiert pas d'authentification et que les paramètres IP, Masque de sous réseau passerelle et serveurs DNS vous sont fournis par votre FAI."
			},{
				type: "name",
				title: "Adresse IP/Masque de sous réseau/Passerelle par défaut/DNS Primaire/DNS Secondaire",
				content: "Saisir les informations fournies par votre FAI."
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'Unité Maximum de Transfert typique par défaut est 1500 octets pour la plupart des réseaux Ethernet. Il est déconseillé de changer la valeur par défaut sauf si votre FAI le requiert."
			},{
				type: "title",
				title: "Type de Connexion internet : IP Dynamique"
			},{
				type: "paragraph",
				content: "Sélectionner ce type de connexion si l'accès internet proposé par votre FAI dispose d'un serveur DHCP."
			},{
				type: "name",
				title: "Adresse IP/Masque de sous réseau/Passerelle par défaut/DNS Primaire/DNS Secondaire",
				content: "Ces paramètres sont automatiquement attribués par le serveur DHCP de votre FAI."
			},{
				type: "name",
				title: "Renouveler",
				content: "Cliquer sur ce bouton pour renouveler vos paramètres depuis le serveur DHCP."
			},{
				type: "name",
				title: "Libérer",
				content: "Cliquer sur ce bouton pour ne plus utiliser les paramètres actuels (perte de la connexion internet)."
			},{
				type: "name",
				title: "Utiliser les adresses DNS suivantes",
				content: "Cocher cette case vous permettra de saisir le DNS de votre FAI ou ceux de votre choix. À défaut le serveur DHCP de votre FAI fournira les adresses adéquates."
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'Unité Maximum de Transfert typique par défaut est 1500 octets pour la plupart des réseaux Ethernet. Il est déconseillé de changer la valeur par défaut sauf si votre FAI le requiert."
			},{
				type: "name",
				title: "Nom d'hôte",
				content: "Saisir une valeur afin d'attribuer un nom d'hôte au routeur."
			},{
				type: "name",
				title: "Obtenir une IP via DHCP unicast",
				content: "Cocher cette case si le serveur DHCP de votre FAI ne supporte pas le broadcast et que vous n'obtenez pas une IP dynamique."
			},{
				type: "title",
				title: "Type de Connexion internet : PPPoE"
			},{
				type: "paragraph",
				content: "sélectionner ce type de connexion si l'accès internet proposé par votre FAI le requiert."
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les nom d'utilisateur et Mot de passe communiqués par votre FAI. Attention à bien respecter minuscules/majuscules."
			},{
				type: "name",
				title: "Adresse IP DNS Primaire/DNS Secondaire",
				content: "Ces paramètres sont attribués par le serveur DHCP de votre FAI."
			},{
				type: "name",
				title: "Connexion secondaire (Aucune, IP Dynamique, IP Statique)",
				children: [{
					type: "name",
					title: "Aucune",
					content: "Choisir cette valeur quand aucune connexion secondaire n'est requise."
				},{
					type: "name",
					title: "IP Dynamique",
					content: "Choisir cette option si l'adresse IP et le masque de sous réseau sont attribués par votre FAI.",
					children: [{
						type: "name",
						title: "Renouveler",
						content: "Cliquer sur ce bouton pour renouveler vos paramètres depuis le serveur DHCP."
					},{
						type: "name",
						title: "Libérer",
						content: "Cliquer sur ce bouton pour ne plus utiliser les paramètres actuels."
					}]
				},{
					type: "name",
					title: "IP Statique",
					content: "Sélectionner ce type de connexion si l'accès internet proposé par votre FAI l'impose et qu'il vous fourni une adresse IP, un masque de sous-réseau à inscrire dans les champs correspondants."
				}]
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'unité maximum de transfert typique est 1480 octets pour les réseaux Ethernet.",
				children: [{
					type: "note",
					title: "Remarque",
					content: "Remarque: Dans de très rares cas, votre FAI peut vous indiquer de modifier la valeur du MTU afin d'optimiser les performances de votre accès, à l'exception de ces cas ne pas modifier le MTU."
				}]
			},{
				type: "name",
				title: "Nom du service/Nom du concentrateur d'accès",
				content: "Par défaut ces champs sont vierges, sauf si votre FAI vous le demande ne pas modifier ces champs."
			},{
				type: "name",
				title: "Intervalle de détection de connexion",
				content: "Saisir une valeur comprise entre 0 et 120 (secondes) correspondant à l'intervalle entre chaque détection du concentrateur d'accès en ligne par le routeur, la valeur par défaut étant 10."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Si votre FAI vous fourni une adresse IP fixe, saisir cette adresse après avoir choisi Utiliser l'adresse IP suivante sinon choisir Obtenir une adresse dynamique pour que votre connexion se voit attribuer une adresse IP automatiquement."
			},{
				type: "name",
				title: "Adresse DNS/ DNS Primaire/DNS Secondaire",
				content: "Si votre FAI fourni des adresses IP fixes de serveurs DNS, sélectionner utiliser les adresses DNS suivantes et saisir les adresses dans les champs DNS primaire et DNS secondaire. A défaut vous pouvez sélectionner obtenir les adresses DNS du FAI dynamiquement, afin de recevoir les adresse IP des DNS automatiquement."
			},{
				type: "name",
				title: "Mode de connexion",
				content: "Choisir le mode adéquat pour vous connecter à internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "Dans ce mode la connexion internet est automatiquement rétablie après une déconnexion."
				},{
					type: "name",
					title: "A la demande",
					content: "Dans ce mode la connexion est rompue après une période d'inactivité maximale paramétrable. La connexion est rétablie dès que vous tentez d'accéder à internet ."
				},{
					type: "name",
					title: "Planifiée",
					content: "Dans ce mode la connexion n'est établie que dans une fenêtre horaire spécifique. Si cette option est sélectionnée, saisir l'heure de début et de fin en respectant le format HH:MM."
				},{
					type: "name",
					title: "Manuelle",
					content: "Dans ce mode la connexion est établie manuellement en cliquant sur le bouton Connecter et rompue par le bouton Déconnecter. Ce mode permet aussi de gérer une période d'inactivité maximale dont la valeur est à saisir dans le champ adéquat; Par défaut la valeur est de 15 minutes, une valeur à 0 (zéro) désactive la fonction."
				},{
					type: "note",
					title: "Remarque",
					content: "Remarque: Le mode de connexion planifié implique que le réglage des paramètres horaires soit correctement configuré dans le menu Avancé -> Paramètres système -> Configuration horaire."
				}]
			},{
				type: "title",
				title: "Type de connexion internet : Câble BigPond",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Choisir ce type de connexion si elle correspond à celle de votre FAI.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les nom d'utilisateur et Mot de passe communiqués par votre FAI. Attention à bien respecter minuscules/majuscules.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Serveur d'authentification",
				content: "Saisir le nom d'hôte ou l'adresse IP du serveur d'authentification.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Domaine d'authentification",
				content: "Saisir le suffixe du serveur de nom de domaine (basé sur votre localisation). Par exemplensw.bigpond.net.au pour NSW/ACT, vic.bigpond.net.au pour VIC/TAS/WA/SA/NT, ou qld.bigpond.net.au pour QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'Unité Maximum de Transfert typique par défaut est 1500 octets pour la plupart des réseaux Ethernet. Il est déconseillé de changer la valeur par défaut sauf si votre FAI le requiert.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Mode de connexion",
				content: "Choisir le mode adéquat pour vous connecter à internet.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Auto",
					content: "Dans ce mode la connexion internet est automatiquement rétablie après une déconnexion."
				},{
					type: "name",
					title: "A la demande",
					content: "Dans ce mode la connexion est rompue après une période d'inactivité maximale paramétrable. La connexion est rétablie dès que vous tentez d'accéder à internet ."
				},{
					type: "name",
					title: "Manuelle",
					content: "Dans ce mode la connexion est établie manuellement en cliquant sur le bouton Connecter et rompue par le bouton Déconnecter. Ce mode permet aussi de gérer une période d'inactivité maximale dont la valeur est à saisir dans le champ adéquat; Par défaut la valeur est de 15 minutes, une valeur à 0 (zéro) désactive la fonction."
				}]
			},{
				type: "title",
				title: "Type de Connexion internet : L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Choisir ce type de connexion si vous souhaitez vous connecter à un serveur VPN L2TP/PPTP et que vous disposez des identifiants de connexion et de l'adresse IP/du nom de domaine du serveur de votre FAI."
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les nom d'utilisateur et Mot de passe communiqués par votre FAI. Attention à bien respecter minuscules/majuscules."
			},{
				type: "name",
				title: "Adresse IP DNS Primaire/DNS Secondaire",
				content: "Ces paramètres sont attribués par le serveur DHCP de votre FAI."
			},{
				type: "name",
				title: "Connexion secondaire (IP Dynamique ou IP Statique)",
				children: [{
					type: "name",
					title: "IP Dynamique",
					content: "Choisir cette option si l'adresse IP et le masque de sous réseau sont attribués par votre FAI."
				},{
					type: "name",
					title: "IP Statique",
					content: "Choisir cette option si l'adresse IP, le masque de sous réseau, la passerelle et les DNS sont indiqués par votre FAI, saisir les informations qu'il vous à communiqué dans les champs dédiés."
				}]
			},{
				type: "name",
				title: "IP du serveur VPN/Nom de domaine",
				content: "Saisir l'adresse IP ou le nom de domaine que votre FAI vous a communiqué."
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'Unité Maximum de Transfert typique par défaut (MTU) est 1460 octets pour la plupart des connexions L2TP ou 1420 pour les connexions PPTP. Il est déconseillé de changer la valeur par défaut sauf si votre FAI le requiert."
			},{
				type: "name",
				title: "Mode de connexion",
				content: "Choisir le mode adéquat pour vous connecter à internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "Dans ce mode la connexion internet est automatiquement rétablie après une déconnexion."
				},{
					type: "name",
					title: "A la demande",
					content: "Dans ce mode la connexion est rompue après une période d'inactivité maximale paramétrable. La connexion est rétablie dès que vous tentez d'accéder à internet ."
				},{
					type: "name",
				title: "Manuelle",
				content: "Dans ce mode la connexion est établie manuellement en cliquant sur le bouton Connecter et rompue par le bouton Déconnecter. Ce mode permet aussi de gérer une période d'inactivité maximale dont la valeur est à saisir dans le champ adéquat; Par défaut la valeur est de 15 minutes, une valeur à 0 (zéro) désactive la fonction."
				}]
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "Clonage adresse MAC",
			CONTENT: [{
				type: "name",
				title: "Utiliser l'adresse MAC par défaut",
				content: "NE change pas l'adresse MAC par défaut du routeur, au cas ou le FAI n'associe pas l'adresse IP attribuée à l'adresse MAC."
			},{
				type: "name",
				title: "Utiliser l'adresse MAC de l'ordinateur connecté",
				content: "Copie l'adresse MAC de l'ordinateur connecté au routeur, au cas ou le FAI associe l'adresse IP attribuée à l'adresse MAC de l'ordinateur."
			},{
				type: "name",
				title: "Utiliser une adresse MAC personnalisée",
				content: "saisir l'adresse MAC manuellement, au cas ou le FAI associe l'adresse IP attribuée à une adresse MAC spécifique."
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse physique unique attribuée au port LAN du routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Affiche l'adresse IP par défaut du routeur, utilisée pour se connecter à l'interface WEB d'administration, ce paramètre est redéfinissable."
			},{
				type: "name",
				title: "Masque de sous réseau",
				content: "Saisir le masque de sous réseau depuis la liste déroulante, ou en le saisissant sous la forme d'un quadruplet d'octets séparés par des points."
			},{
				type: "note",
				title: "Remarque",
				content: "Remarque: si la nouvelle adresse IP n'est pas dans le même sous réseau que l'ancienne, la plage IP du serveur DHCP sera reconfigurée automatiquement, néanmoins les serveurs virtuels et la DMZ ne seront opérationnels qu'après reconfiguration."
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		IPTV:{
			TITLE: "Paramétrages",
			CONTENT: [{
					type: "name",
					title: "Proxy IGMP",
					content: "Choisir la version de proxy IGMP (Internet Group Management Protocol) , parmi V2 ou V3, et selon les indications de votre FAI."
				},{
					type: "name",
					title: "Version IGMP",
					content: "Choisir la version IGMP entre V2 et V3 : dépend de votre FAI."
				},
				{
					type: "name",
					title: "IPTV",
					content: "Sélectionner pour activer la fonction IPTV."
				},
				{
					type: "name",
					title: "Mode",
					content: "Choisir le mode approprié en fonction de votre FAI. Il existe 6 modes IPTV supportés :",
					children: [
						{
							type: "name",
							title: "Pont",
							content:"Si votre FAI n'est pas listé et qu'aucun autre paramètre n'est requis, vous pouvez simplement choisir ce mode et configurer les fonctions du port Ethernet du routeur.",
							children:[{
								type: "name",
								title: "Port Ethernet 1/2/3/4",
								content: "Assigner vos ports Ethernet pour diffuser internet ou la TV."
							}]
						},
						{
							type: "name",
							title: "Russie",
							content: "Sélectionner ce choix si votre FAI est russe et que les paramètres (incluant  Internet/IP-Phone/ID et priorité de VLAN IPTV VLAN , et fonctions de ports LAN (1/2/3/4).) sont prédéterminés.",
							children: [{
								type: "name",
								title: "ID de VLAN du Multicast IPTV/Priorité",
								content: "Vous pouvez activer le multicast IPTV comme souhaité et configurer l'ID VLAN et les priorités selon les prescriptions de votre FAI."
							}]
						},
						{
							type: "name",
							title: "Singapour-ExStream",
							content: "A choisir si votre FAI basé à Singapour est ExStream et que les paramètres sont prédéterminés, incluant Internet/ID Vlan IPTV et priorité, et fonctions port LAN 1/2/3/4."
						},
						{
							type: "name",
							title: "Malaisie-Unifi",
							content: "A choisir si votre FAI basé en Malaisie est Unifi et que les paramètres sont prédéterminés, incluant Internet/ID Vlan IPTV et priorité, et fonctions port LAN 1/2/3/4."
						},
						{
							type: "name",
							title: "Malaisie-Maxis",
							content: "A choisir si votre FAI basé en Malaisie est Maxis et que les paramètres sont prédéterminés, incluant Internet/Téléphone IP/ID Vlan IPTV et priorité, et fonctions port LAN 1/2/3/4."
						},
						{
							type: "name",
							title: "Personnalisé",
							content: "Si votre FAI n'est pas listé mais qu'il vous a communiqué les paramètres requis, incluant Internet/Téléphone IP/ID Vlan IPTV et priorité, et fonctions port LAN 1/2/3/4.",
							children: [{
								type: "name",
								title: "ID VLAN IPTV/Téléphonie IP/Internet/Priorité",
								content: "Configurez selon les indications de votre FAI, l'ID VLAN et les priorités."
							},{
								type: "name",
								title: "Tag 802.11Q",
								content: "Choisir si vous taguez les paquets internet selon 802.11Q."
							},{
								type: "name",
								title: "ID de VLAN du Multicast IPTV/Priorité",
								content: "Vous pouvez activer le multicast IPTV comme souhaité et configurer l'ID VLAN et les priorités selon les prescriptions de votre FAI."
							},{
								type: "name",
								title: "Port Ethernet 1/2/3/4",
								content: "Assignez les ports LAN à une fonction : Accès internet, Téléphonie IP, Télévision."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Paramétrages",
			CONTENT: [{
				type: "name",
				title: "Serveur DHCP",
				content: "Par défaut le serveur DHCP (Dynamic Host Configuration Protocol) est actif ; il assigne dynamiquement des paramètres TCP/IP aux appareils clients parmi ceux définis dans la plage d'adresses IP. NE PAS désactiver le serveur DHCP sans qu'un autre serveur soit actif ou que vous ayez attribué manuellement des paramètres TCP/IP à chaque appareil client de votre réseau."
			},{
				type: "name",
				title: "Plage d'adresses IP",
				content: "Saisir l'étendue des adresses IP qui seront attribuées aux clients."
			},{
				type: "name",
				title: "Durée du bail",
				content: "Saisir la durée durant laquelle une adresse IP reste attribuée  à un client (entre 2 et 2880 minutes). Par défaut : 120 minutes."
			},{
				type: "name",
				title: "Passerelle par défaut",
				content: "Entrer l'adresse IP de la passerelle. (optionnel)"
			},{
				type: "name",
				title: "DNS Primaire/DNS Secondaire",
				content: "Saisir les adresse IP fournies par votre FAI (Optionnel)"
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Réservation d'adresses",
			CONTENT: [{
				type: "paragraph",
				content: "Vous pouvez réserver manuellement une adresse IP pour un client connecté au routeur. Une fois réservée, l'adresse IP ne sera attribuée par le serveur DHCP qu'au client possédant l'adresse MAC enregistrée lors de la réservation."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Affiche l'adresse MAC du client auquel le serveur à attribué une adresse réservée."
			},{
				type: "name",
				title: "Adresse IP réservée",
				content: "Adresses IP réservées."
			},{
				type: "name",
				title: "Description",
				content: "Affiche une description des appareil clients."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel de la réservation (Active/Inactive) pour le client concerné."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options de modification ou de suppression pour le client concerné."
			},{
				type: "step",
				title: "Pour réserver une adresse IP",
				content:[
					"1. Cliquer sur Ajouter.",
					"2. Saisir l'adresse MAC du client auquel vous souhaitez réserver une IP (format XX-XX-XX-XX-XX-XX).",
					"3. Saisir l'adresse IP que vous souhaitez réserver à ce client (format xxx.xxx.xxx.xxx).",
					"4. Saisir une description relative à l'appareil client.",
					"5. Définir l'état de la réservation à Activer.",
					"6. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer un client existant",
				content: "Dans la liste, cliquer sur l'icône Editer ou l'icône Poubelle de la ligne correspondant au client que vous souhaitez modifier ou supprimer."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "Liste de clients DHCP",
			CONTENT: [{
				type: "name",
				title: "N° Client",
				content: "Affiche le nombre de clients du serveur DHCP."
			},{
				type: "name",
				title: "Nom du client",
				content: "Affiche le nom du client DHCP."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse MAC du client connecté."
			},{
				type: "name",
				title: "Adresse IP attribuée",
				content: "Adresse IP attribuée par le serveur DHCP au client concerné."
			},{
				type: "name",
				title: "Durée du bail",
				content: "Affiche la durée restante avant la fin du bail pendant lequel l'adresse IP est réservée au client."
			},{
				type: "name",
				title: "Actualiser",
				content: "Cliquer pour actualiser la liste des clients DHCP."
			}]
		},

		DDNS: {
			TITLE: "DNS Dynamique",
			CONTENT: [{
				type: "paragraph",
				content: "Le DNS Dynamique vous permet d'assigner un nom de domaine à une adresse IP publique dynamique. C'est utile quand vous hébergez vous-même votre site WEB, un serveur FTP ou un serveur situé derrière votre routeur. Vous devez en premier lieu ouvrir un compte chez un fournisseur de service DNS dynamique par exemple : dyn.com"
			},{
				type: "step",
				title: "Pour paramétrer un DNS Dynamique",
				content: [
					"1. Choisir le fournisseur de service DDNS.",
					"2. Saisir les nom d'utilisateur et Mot de passe de votre compte DDNS.",
					"3. Saisir le nom de domaine réservé chez le fournisseur de service DDNS.",
					"4. Choisir l'intervalle de mise à jour depuis la liste déroulante.",
					"5. Cliquer sur Se connecter et Sauvegarder."
				]
			},{
				type: "paragraph",
				content: "Pour basculer entre différents comptes (le cas échéant) vous devez impérativement vous Déconnecter du service actif puis vous Connecter à l'autre service DDNS avec ses propres paramètres."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Routage statique",
			CONTENT: [{
				type: "paragraph",
				content: "Le routage statique est utilisé pour prédéfinir une route destinée à joindre un hôte ou un réseau spécifique."
			},{
				type: "step",
				title: "Pour paramétrer une route statique",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Adresse de destination - Saisir l'adresse IP sous la forme d'un quadruplet d'octets séparés par des points pour cette route statique.",
					"3. Masque de sous-réseau - Saisir sous la forme d'un quadruplet d'octets séparés par des points pour le masque de sous-réseau.",
					"2. Passerelle par défaut - Saisir l'adresse IP sous la forme d'un quadruplet d'octets séparés par des points pour cette passerelle.",
					"5. Interface - Choisir LAN ou WAN pour spécifier le type du réseau de destination.",
					"6. Description - Saisir une brève description pour cette route.",
					"7. Sélectionner Activer.",
					"8. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer une route statique",
				content: "Dans la liste, cliquer sur l'icône Editer ou l'icône Poubelle correspondant à la route statique que vous souhaitez modifier ou supprimer."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Table de routage système",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche la table de routage du routeur qui comporte toutes les routes en cours d'utilisation."
			},{
				type: "paragraph",
				content: "Cliquer sur Actualiser pour mettre à jour la table de routage."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Paramétrages",
			CONTENT: [{
				type: "name",
				title: "Pays",
				content: "Choisir le Pays d'utilisation du routeur dans la liste déroulante. Si votre Pays n'est pas listé, l'usage du Wi-Fi est peut-être restreint."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "Wi-Fi 2.4GHz",
			CONTENT: [{
				type: "name",
				title: "Activer l'émetteur Wi-Fi",
				content: "Cocher cette case pour activer l'émission du signal 2.4GHz. Si la case est décochée, la fonction WPS en 2.4GHz est alors désactivée."
			},{
				type: "name",
				title: "Nom du réseau Wi-Fi (SSID)",
				content: "Vous pouvez laisser le nom de réseau (SSID) par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case pour masquer le nom du réseau (SSID) 2.4GHz. Si la case décochée, la fonction WPS en 2.4GHz est alors désactivée."
			},{
				type: "name",
				title: "Sécurité",
				content: "Choisir l'une des options de sécurité suivantes :",
				children: [{
					type: "name",
					title: "Sécurité désactivée",
					content: "Choisir cette option pour désactiver la sécurité du Wi-Fi. Il est fortement recommandé d'activer la sécurité du Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
				},{
					type: "name",
					title: "WPA/WPA2-Personnel",
					content: "Choisir cette option pour activer la méthode standard d'authentification basée sur une clé pré-partagée (PSK) aussi appelée Mot de passe. Cette option est recommandée. Si vous la sélectionnez, configurez ce qui suit.",
					children: [{
						type: "name",
						title: "Version",
						content: "Choisir une version de sécurité pour votre réseau Wi-Fi.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Cette option implémente les deux versions du standard WPA (Wi-Fi Protected Access) : WPA et WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Cette option offre un bon niveau de sécurité. Il implique si elle est sélectionnée, le non support de la fonction WPS dans la bande concernée."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Cette option offre un meilleur niveau de sécurité que WPA-PSK et elle est recommandée."
						}]
					},{
						type: "name",
						title: "Chiffrement",
						content: "Choisir un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (TKIP & AES). Il n'est pas recommandé de choisir TKIP si le routeur fonctionne en mode 802.11n, car 802.11n ne supporte pas le chiffrement TKIP. Si TKIP est sélectionné WPS est en ce cas désactivé dans la bande considérée."
					},{
						type: "name",
						title: "Mot de passe",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux (0-9, A-F, a-f) dans ce champ."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Entreprise",
					content: "Sélectionner cette option pour activer la méthode d'authentification la plus évoluée, utilise un serveur RADIUS (Remote Authentication Dial In User Service). Si la case est cochée, la fonction WPS sera alors désactivée pour la bande concernée.",
					children: [{
						type: "name",
						title: "Version",
						content: "Choisir une version de sécurité pour votre réseau Wi-Fi.",
						children:[{
							type: "name",
							title: "Auto",
							content: "Cette option implémente les deux versions du standard WPA (Wi-Fi Protected Access) : WPA et WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Cette option offre un bon niveau de sécurité."
						},{
							type: "name",
							title: "WPA2",
							content: "Cette option offre un meilleur niveau de sécurité que WPA-PSK et elle est recommandée."
						}]
					},{
						type: "name",
						title: "Chiffrement",
						content: "Sélectionner un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (TKIP et AES). Il n'est pas recommandé d'utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, en raison du fait que TKIP n'est pas supporté par les spécifications 802.11n."
					},{
						type: "name",
						title: "IP du serveur Radius",
						content: "Saisir l'adresse IP du serveur Radius."
					},{
						type: "name",
						title: "Port radius",
						content: "Entrer le numéro de port du serveur RADIUS."
					},{
						type: "name",
						title: "Mot de passe Radius",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux dans ce champ."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Sélectionner cette option pour activer la méthode d'authentification la plus basique si l'un de vos clients Wi-Fi ne supporte que WEP (Wireless Equivalent Privacy). Si la case est cochée, la fonction WPS sera alors désactivée pour la bande concernée.",
				children: [{
					type: "name",
					title: "Type",
					content: "Choisir un type d'authentification type pour votre réseau Wi-Fi. Par défaut réglé sur Auto, qui choisi automatiquement entre Système ouvert et Clé partagée en fonction des capacités et des requêtes des clients Wi-Fi."
				},{
					type: "name",
					title: "Format de clé WEP",
					content: "Utiliser soit le format ASCII, soit le format Hexadécimal. Le format ASCII est une combinaison de caractères ASCII. Le format Hexadécimal n'autorise que les chiffres de 0 à 9 et les lettres de a à f (minuscules ou majuscules)."
				},{
					type: "name",
					title: "Type de clé",
					content: "Choisir une taille de clé WEP.",
					children: [{
						type: "name",
						title: "64-bit",
						content: "Permet la saisie de 10 caractères hexadécimaux (0-9, A-F, a-f) ou 5 caractères ASCII pour la clé WEP."
					},{
						type: "name",
						title: "128-bit",
						content: "Permet la saisie de 26 caractères hexadécimaux (0-9, A-F, a-f) ou 13 caractères ASCII pour la clé WEP."
					}]
				},{
					type: "name",
					title: "Clés",
					content: "Saisir la clé WEP dans le champ dédié."
				}]
			}]
			},{
				type: "name",
				title: "Mode",
				content: "Sélectionner un mode de transmission."
			},{
				type: "name",
				title: "Largeur de canal",
				content: "choisir une largeur de canal (bande passante) pour le réseau Wi-Fi 2.4GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Choisir un canal pour le réseau Wi-Fi 2.4GHz. Il est recommandé de laisser le réglage Auto, si vous ne rencontrez pas des problèmes de déconnexions intermittentes."
			},{
				type: "name",
				title: "Puissance de transmission",
				content: "Choisir parmi Haute, Moyenne et Basse pour contrôler la puissance d'émission. La valeur recommandée et paramétrée par défaut est Haute."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "Wi-Fi 5GHz",
			CONTENT: [{
				type: "name",
				title: "Activer l'émetteur Wi-Fi",
				content: "Cocher cette case pour activer l'émission du signal 5GHz. Si la case est décochée, la fonction WPS en 5GHz est alors désactivée."
			},{
				type: "name",
				title: "Nom du réseau Wi-Fi (SSID)",
				content: "Vous pouvez laisser le nom de réseau (SSID) par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case pour masquer le nom du réseau (SSID) 5GHz. Si la case décochée, la fonction WPS en 5GHz est alors désactivée."
			},{
				type: "name",
				title: "Sécurité",
				content: "Choisir l'une des options de sécurité suivantes :",
				children: [{
					type: "name",
					title: "Sécurité désactivée",
					content: "Choisir cette option pour désactiver la sécurité du Wi-Fi. Il est fortement recommandé d'activer la sécurité du Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
				},{
					type: "name",
					title: "WPA/WPA2-P*ersonnel",
					content: "Choisir cette option pour activer la méthode standard d'authentification basée sur une clé pré-partagée (PSK) aussi appelée Mot de passe. Cette option est recommandée. Si vous la sélectionnez, configurez ce qui suit.",
					children: [{
						type: "name",
						title: "Version",
						content: "Choisir une version de sécurité pour votre réseau Wi-Fi.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Cette option implémente les deux versions du standard WPA (Wi-Fi Protected Access) : WPA et WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Cette option offre un bon niveau de sécurité. Il implique si elle est sélectionnée, le non support de la fonction WPS dans la bande concernée."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Cette option offre un meilleur niveau de sécurité que WPA-PSK et elle est recommandée."
						}]
					},{
						type: "name",
						title: "Chiffrement",
						content: "Choisir un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (TKIP & AES). Il n'est pas recommandé de choisir TKIP si le routeur fonctionne en mode 802.11n, car 802.11n ne supporte pas le chiffrement TKIP. Si TKIP est sélectionné WPS est en ce cas désactivé dans la bande considérée."
					},{
						type: "name",
						title: "Mot de passe",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux (0-9, A-F, a-f) dans ce champ."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Entreprise",
					content: "Sélectionner cette option pour activer la méthode d'authentification la plus évoluée, utilise un serveur RADIUS (Remote Authentication Dial In User Service). Si la case est cochée, la fonction WPS sera alors désactivée pour la bande concernée.",
					children: [{
						type: "name",
						title: "Version",
						content: "Choisir une version de sécurité pour votre réseau Wi-Fi.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Cette option implémente les deux versions du standard WPA (Wi-Fi Protected Access) : WPA et WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Cette option offre un bon niveau de sécurité."
						},{
							type: "name",
							title: "WPA2",
							content: "Cette option offre un meilleur niveau de sécurité que WPA-PSK et elle est recommandée."
						}]
					},{
						type: "name",
						title: "Chiffrement",
						content: "Sélectionner un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (TKIP et AES). Il n'est pas recommandé d'utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, en raison du fait que TKIP n'est pas supporté par les spécifications 802.11n."
					},{
						type: "name",
						title: "IP du serveur Radius",
						content: "Saisir l'adresse IP du serveur Radius."
					},{
						type: "name",
						title: "Port radius",
						content: "Entrer le numéro de port du serveur RADIUS."
					},{
						type: "name",
						title: "Mot de passe Radius",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux dans ce champ."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Sélectionner cette option pour activer la méthode d'authentification la plus basique si l'un de vos clients Wi-Fi ne supporte que WEP (Wireless Equivalent Privacy). Si la case est cochée, la fonction WPS sera alors désactivée pour la bande concernée.",
					children: [{
						type: "name",
						title: "Type",
						content: "Choisir un type d'authentification type pour votre réseau Wi-Fi. Par défaut réglé sur Auto, qui choisi automatiquement entre Système ouvert et Clé partagée en fonction des capacités et des requêtes des clients Wi-Fi."
					},{
						type: "name",
						title: "Format de clé WEP",
						content: "Utilisez soit le format ASCII ou Hexadécimal. Le format ASCII correspond à une combinaison alphanumérique. Le format Hexadécimal est une combinaison ne comprend que des chiffres (0-9) et certaines lettres (A-F, a-f)."
					},{
						type: "name",
						title: "Type de clé",
						content: "Choisir une taille de clé WEP.",
						children:[{
							type: "name",
							title: "64-bit",
							content: "Permet la saisie de 10 caractères hexadécimaux (0-9, A-F, a-f) ou 5 caractères ASCII pour la clé WEP."
						},{
							type: "name",
							title: "128-bit",
							content: "Permet la saisie de 26 caractères hexadécimaux (0-9, A-F, a-f) ou 13 caractères ASCII pour la clé WEP."
						}]
					},{
						type: "name",
						title: "Clés",
						content: "Saisir la clé WEP dans le champ dédié."
					}]
				}]
			},{
				type: "name",
				title: "Mode",
				content: "Choisir le mode d'émission parmi les différentes possibilités."
			},{
				type: "name",
				title: "Largeur de canal",
				content: "choisir une largeur de canal (bande passante) pour le réseau Wi-Fi 5GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Choisir un canal pour le réseau Wi-Fi 5GHz. Il est recommandé de laisser le réglage Auto, si vous ne rencontrez pas des problèmes de déconnexions intermittentes."
			},{
				type: "name",
				title: "Puissance de transmission",
				content: "Choisir parmi Haute, Moyenne et Basse pour contrôler la puissance d'émission. La valeur recommandée et paramétrée par défaut est Haute."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "Wi-Fi 60GHz",
			CONTENT: [{
				type: "name",
				title: "Activer l'émetteur Wi-Fi",
				content: "Cocher cette case pour activer l'émission du signal Wi-Fi 60GHz. Ce choix désactive la fonction WPS dans cette gamme de fréquences."
			},{
				type: "name",
				title: "Nom de réseau (SSID)",
				content: "Vous pouvez laisser le nom de réseau (SSID) par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case si vous souhaitez rendre le nom du réseau (SSID) 60GHz invisible lors d'une recherche des réseaux. Ce choix désactive la fonction WPS dans cette gamme de fréquences."
			},{
				type: "name",
				title: "Sécurité",
				content: "Choisir l'une des options de sécurité suivantes :",
				children: [{
					type: "name",
					title: "Pas de sécurité",
					content: "Choisir cette option pour désactiver la sécurité du Wi-Fi. Il est fortement recommandé d'activer la sécurité du Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
				},{
					type: "name",
					title: "WPA2 - personnel",
					content: "Cocher cette case pour activer la méthode d'authentification standard basée sur une clé pré-partagée (PSK), appelée mot de passe. Le type de chiffrement est GCMP. Cette option est recommandée. Si vous la sélectionnez, configurer ce qui suit :",
					children: [{
						type: "name",
						title: "Mot de passe",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux (0-9, A-F, a-f) dans ce champ."
					}]
				},{
					type: "name",
					title: "WPA2 - Entreprise",
					content: "Cocher cette case pour activer la méthode d'authentification la plus évoluée qui met en œuvre un serveur RADIUS ((Remote Authentication Dial In User Service). LE type de chiffrement est GCMP. Ce choix désactive la fonction WPS dans cette gamme de fréquences.",
					children: [{
						type: "name",
						title: "IP du serveur Radius",
						content: "Saisir l'adresse IP du serveur Radius."
					},{
						type: "name",
						title: "Port radius",
						content: "Entrer le numéro de port du serveur RADIUS."
					},{
						type: "name",
						title: "Mot de passe Radius",
						content: "Saisir un Mot de passe de taille comprise entre 8 et 63 caractères ASCII ou 8 et 64 caractères hexadécimaux dans ce champ."
					}]
				}]
			},{
				type: "name",
				title: "Canal",
				content: "Sélectionner un canal pour le réseau Wi-Fi 60GHz. Il est recommandé de laisser la valeur à AUTO, tant que vous ne constatez pas des coupures intermittentes de la connexion."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		WPS: {	
			TITLE: "Code du routeur",
			CONTENT: [{
				type: "paragraph",
				content: "Les appareils Wi-Fi peuvent se connecter à ce routeur en utilisant la fonction WPS et le code PIN du routeur."
			},{
				type: "name",
				title: "Code du routeur",
				content: "Basculer sur ON pour autoriser les appareils Wi-Fi à se connecter au routeur en utilisant le Code du routeur (Code à 8 chiffre inscrits sur le boitier)."
			},{
				type: "name",
				title: "code PIN",
				content: "Affiche le code PIN du routeur. Le code PIN par défaut est inscrit sur l'étiquette collée sous le routeur. Cliquer sur Générer pour créer un nouveau code PIN aléatoire ou cliquer sur Par défaut pour revenir au code PIN défini en usine."
			}]
		},

		WPS_WIZARD: {
			TITLE: "Assistant WPS",
			CONTENT:[{
				type: "paragraph",
				content: "WPS n'est possible qu'avec les réglages suivants : Emetteur Wi-Fi actif, Masquer le SSID inactif, Sécurité : Aucune ou WPA/WPA2-Personnel ou Auto + AES ou Auto, il faut bien entendu que WPS soit activé."
			},{
				type: "name",
				title: "Bouton WPS (Recommandé)",
				content: "Choisir cette méthode de paramétrage pour activer la autoriser la connexion d'un appareil compatible WPS au réseau Wi-Fi du routeur par l'appui du bouton WPS physique ou du bouton logiciel Se Connecter."
			},{
				type: "name",
				title: "code PIN",
				content: "Choisir cette méthode de paramétrage WPS pour ajouter manuellement le Code WPS d'un appareil à associer au réseau Wi-Fi du routeur par le bouton Se Connecter."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Clients Wi-Fi connectés",
			CONTENT: [{
				type: "name",
				title: "N° Client",
				content: "Affiche le nombre de clients Wi-Fi associés."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Affiche l'adresse MAC du client Wi-Fi connecté."
			},{
				type: "name",
				title: "Type de connexion",
				content: "Affiche la gamme de fréquences Wi-Fi (2.4GHz/5GHz/60GHz) du client Wi-Fi associé."
			},{
				type: "name",
				title: "Sécurité",
				content: "Affiche le type de chiffrement du client Wi-Fi associé."
			},{
				type: "name",
				title: "Paquets reçus",
				content: "Affiche le nombre de paquets reçus par le client Wi-Fi connecté."
			},{
				type: "name",
				title: "Paquets émis",
				content: "Affiche le nombre de paquets émis par le client Wi-Fi connecté."
			},{
				type: "paragraph",
				content: "Cliquer sur Actualiser pour mettre à jour les informations affichées sur cette page."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Paramétrages",
			CONTENT: [{
				type: "paragraph",
				content: "Le réseau invités vous permet de paramétrer un réseau dédié disposant de son propre nom (SSID) et de son propre Mot de passe pour partager en Wi-Fi votre accès internet avec vos invités."
			},{
				type: "name",
				title: "Permettre aux invités de se voir",
				content: "Cocher cette case pour permettre à tous les clients du réseau invité de se voir mutuellement."
			},{
				type: "name",
				title: "Permettre aux invités d'accéder à mon réseau local",
				content: "Cocher cette case pour permettre aux invités connectés au réseau invités d'accéder aux partages et aux imprimantes réseaux."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "Wi-Fi 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Activer le réseau invités",
				content: "Cocher cette case pour activer le réseau invités."
			},{
				type: "name",
				title: "Nom du réseau Wi-Fi (SSID)",
				content: "Utiliser le nom de réseau (SSID) invité par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case si vous décidez que le nom du réseau invités ne doit pas apparaitre dans la liste des réseaux disponibles."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Intervalle de mise à jour du Mot de passe",
				content:"Choisir l'intervalle mise à jour du Mot de passe de votre réseau invités."
			}*/,{
				type: "name",
				title: "Sécurité",
				content: "Si vous choisissez de ne jamais mettre à jour le Mot de passe, choisir l'une des options de sécurité suivantes :",
				children: [{
					type: "name",
					title: "Sécurité désactivée",
					content: "Choisir cette option pour désactiver la sécurité du Wi-Fi. Il est fortement recommandé d'activer la sécurité du Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
				},{
					type: "name",
					title: "WPA/WPA2-personnel",
					content: "Choisir cette option pour activer la méthode d'authentification standard basée sur une Clé Pré-Partagée (PSK=Pre Shared Key) aussi appelée Mot de passe. Cette option est celle recommandée et aussi celle par défaut. Si vous la sélectionnez, configurer les paramètres ci-après.",
					children: [{
						type: "name",
						title: "Version",
						content: "Choisir une version de sécurité pour votre réseau Wi-Fi.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Cette option implémente les deux versions du standard WPA (Wi-Fi Protected Access) : WPA et WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Cette option offre un bon niveau de sécurité."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Cette option offre un meilleur niveau de sécurité que WPA-PSK et elle est recommandée."
						}]
					},{
						type: "name",
						title: "Chiffrement",
						content: "Sélectionner un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (TKIP et AES). Il n'est pas recommandé d'utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, en raison du fait que TKIP n'est pas supporté par les spécifications 802.11n."
					}]
			}]},{
				type: "name",
				title: "Mot de passe",
				content: "Utilisez le Mot de passe aléatoire généré, ou définissez un Mot de passe comprenant 8 à 63 caractères ASCII ou 8 à 64 caractères hexadécimaux (0-9,a-f,A-F)."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},

		NAT: {
			TITLE: "Passerelle de couche applicative (ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "Permet d'ajouter à la passerelle, des filtres de traversée par traduction d'adresse réseau (NAT) personnalisées; afin de supporter la traduction de port et d'adresse pour certains protocoles ''Contrôle/Données'' de couches applicatives: FTP/TFTP/H323 etc.,,, activer ALG est recommandé."
			},{
				type: "name",
				title: "Activer ALG FTP",
				content: "Si coché, cela autorise les clients et serveurs FTP (File Transfert Protocole) à transférer des données via le NAT."
			},{
				type: "name",
				title: "Activer ALG TFTP",
				content: "Si coché, cela autorise les clients et serveurs TFTP (Trivial File Transfert Protocole) à transférer des données via le NAT."
			},{
				type: "name",
				title: "Activer ALG H323",
				content: "Permet aux clients Microsoft NetMeeting de communiquer via le NAT."
			},{
				type: "name",
				title: "Activer ALG RTSP",
				content: "Permet aux clients de communiquer avec des serveurs de diffusion de médias via le NAT."
			},{
				type: "name",
				title: "Activer le passthrough PPTP",
				content: "Permet d'établir des sessions de communication via des tunnels point à point entre un réseau local et un réseau distant séparés par le routeur."
			},{
				type: "name",
				title: "Activer le passthrough L2TP",
				content: "Permet d'établir des sessions de communication via des tunnels point à point de niveau 2 entre un réseau local et un réseau distant séparés par le routeur."
			},{
				type: "name",
				title: "Activer le passthrough IPSec",
				content: "Permet de d'encapsuler IPSec (Internet Protocol Security) pour relier un réseau local à un réseau situé au delà du routeur, IPSec utilise des services de chiffrement de sécurisation pour garantir des communications sûres et confidentielles sur les réseaux IP."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Serveurs virtuels",
			CONTENT: [{
				type: "paragraph",
				content: "Les serveurs virtuels sont utilisés pour définir des services publics sur votre réseau local. Un serveur virtuel est défini en tant que port externe, et toutes les requêtes provenant d'internet vers ce port externe sont redirigées vers un appareil défini, qui doit être configuré avec une adresse IP statique ou réservée."
			},{
				type: "name",
				title: "Type de service",
				content: "Affiche le nom de votre serveur virtuel."
			},{
				type: "name",
				title: "Port externe",
				content: "Affiche le n° ou la plage de ports utilisés par le serveur virtuel."
			},{
				type: "name",
				title: "IP Interne",
				content: "Affiche l'adresse IP de l'ordinateur sur lequel est hébergé le service applicatif."
			},{
				type: "name",
				title: "Port Interne",
				content: "Affiche le port TCP/IP de l'ordinateur sur lequel est hébergé le service applicatif."
			},{
				type: "name",
				title: "Protocole",
				content: "Affiche le protocole utilisé par le service applicatif: TCP/UDP ou Tout (Tous les protocoles supportés par le routeur)."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel (Activé ou Désactivé) du serveur virtuel relatif."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour Modifier ou Supprimer les serveurs virtuels correspondants."
			},{
				type: "step",
				title: "Pour définir une règle de serveur virtuel",
				content: [
					"1, Cliquer sur Ajouter.",
					"2, Cliquer sur Visualiser les services existants pour sélectionner un service dans la liste afin de renseigner automatiquement les champs Port interne et Port externe relatifs au service sélectionné, Si le service n'existe pas, saisir manuellement les valeurs requises comme suit: si le port interne est identique au port externe laisser le champ vide; saisir un n° de port ou une plage de ports séparés par un tirer (ex 21 ou 21-25). Saisir l'adresse IP de l'ordinateur hébergeant le service dans le champ dédié (ex:192.168.111.222).",
					"3. Sélectionner un protocole pour le service applicatif: TCP, UDP ou Tous dans la liste déroulante.",
					"4. Cliquer sur Activer.",
					"5. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer un serveur virtuel",
				content: "Dans la liste, cliquer sur l'icône Editer ou sur l'icône Poubelle correspondant à l'appareil que vous souhaitez Editer ou Modifier."
			},{
				type: "step",
				title: "Pour supprimer plusieurs serveurs virtuels",
				content: "Sélectionner tous les serveurs que vous souhaitez supprimer puis cliquer sur Supprimer au dessus de la liste."
			},{
				type: "note",
				title: "Remarque",
				content: "Si votre appareil héberge plusieurs serveurs virtuels, vous devez définir chacun d'eux séparément."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Déclenchement par port",
			CONTENT: [{
				type: "paragraph",
				content: "Le déclenchement par port est utilisé pour transférer le trafic d'un port vers un serveur spécifique dans le réseau."
			},{
				type: "name",
				title: "Application",
				content: "Affiche le nom de l'application."
			},{
				type: "name",
				title: "Port de déclenchement",
				content: "Affiche le port sortant utilisé pour déclencher une redirection d'une connexion sortante."
			},{
				type: "name",
				title: "Protocole de déclenchement",
				content: "Affiche le protocole utilisé pour le port de déclenchement. TCP, UDP, ou Tous (Tous les protocoles supportés par le routeur)."
			},{
				type: "name",
				title: "Port externe",
				content: "Affiche le port ou la plage de ports utilisés par le système distant. Une réponse utilisant l'un de ses ports sera transférée à l'ordinateur qui déclenche cette redirection. Vous pouvez entrer jusqu'à 5 groupes de ports (ou sections de ports). Chaque groupe de ports doit être séparé par des virgules par exemple: 2000-2038,2046,2050-2051,2085,3010-3030."
			},{
				type: "name",
				title: "Protocole externe",
				content: "Affiche le protocole utilisé pour le port entrant: TCP, UDP, Tous (tous les protocoles utilisés par le routeur)."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel (Activé ou Désactivé) du serveur virtuel relatif."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour Modifier ou Supprimer les serveurs virtuels correspondants."
			},{
				type: "step",
				title: "Pour définir une règle de déclenchement par port",
				content: [{
					type: "note",
					title: "Remarque",
					content: "Remarque: Chaque règle ne peut concerner qu'un hôte unique."
				},
					"1. Cliquer sur ajouter.",
					"2, Cliquer sur Visualiser les applications existantes pour sélectionner une application dans la liste afin de renseigner automatiquement les champs relatifs au service sélectionné, Si le service n'existe pas, saisir manuellement les valeurs requises comme suit: Application, port de déclenchement, Protocole de déclenchement, Port externe, Protocole externe.",
					"3, Sélectionner Activer.",
					"4. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer une règle de déclenchement par ports",
				content: "Dans la liste, cliquer sur l'icône Editer ou sur l'icône Poubelle correspondant à la règle que vous souhaitez Editer ou Modifier."
			},{
				type: "step",
				title: "Pour supprimer plusieurs règles de déclenchement par port",
				content: "Dans la liste, sélectionner toutes les règles que vous souhaitez supprimer puis cliquer sur Supprimer au dessus de la liste."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "La DMZ (Zone démilitarisée) permet de mettre un ordinateur hôte en contact direct avec internet pour des usages spéciaux tels le jeu en ligne ou la vidéo conférence. La DMZ permet à un ordinateur d'avoir tous ses ports ouverts sur internet. Cet ordinateur doit disposer d'une IP Fixe et ne pas recevoir son IP depuis un serveur DHCP."
			},{
				type: "step",
				title: "Pour définir un ordinateur ou un serveur en DMZ",
				content: [
					"1, Cliquer sur Activer DMZ.",
					"2, Dans le champ Adresse IP de l’hôte DMZ, saisir l'adresse IP de l'ordinateur à placer en DMZ.",
					"3, Cliquer sur Sauvegarder."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Par défaut la fonction UPnP (Universal Plug and Play) est activée pour permettre aux appareils tels les ordinateurs ou les caméra IP de se découvrir mutuellement afin de communiquer au sein d'un réseau local."
			},{
				type: "paragraph",
				content: "La liste de services UPnP affiche les informations des appareils UPnP."
			},{
				type: "name",
				title: "Description du service",
				content: "Affiche une brève description de l'hôte local qui formule une requête UPnP."
			},{
				type: "name",
				title: "Port externe",
				content: "Affiche le n° de port externe ouvert par l'hôte local."
			},{
				type: "name",
				title: "Protocole",
				content: "Affiche le type de protocole utilisé par l'hôte local."
			},{
				type: "name",
				title: "Adresse IP interne",
				content: "Affiche l'adresse IP de l'hôte local."
			},{
				type: "name",
				title: "Port Interne",
				content: "Affiche le n° de port interne ouvert par l'hôte local."
			},{
				type: "paragraph",
				content: "Cliquer sur Actualiser pour mettre à jour la liste de serveurs UPnP."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Disques USB",
			CONTENT: [{
				type: "paragraph",
				content: "Cet écran affiche les information relatives à chaque disque USB connecté."
			},{
				type: "name",
				title: "Rechercher",
				content: "Usuellement, le routeur détecte automatiquement tout disque USB qui vient d'être connecté. Si ce n'est pas le cas cliquer sur ce bouton afin de détecter les nouveaux disque USB ou mettre à jour les informations de ceux déjà connectés."
			},{
				type: "name",
				title: "Volume",
				content: "Affiche le nom des disques USB."
			},{
				type: "name",
				title: "Capacité",
				content: "Affiche la capacité totale de chaque disque USB."
			},{
				type: "name",
				title: "Espace libre",
				content: "Affiche l'espace de stockage libre sur le disque USB."
			},{
				type: "name",
				title: "Déconnexion sécurisée",
				content: "Cliquer sur ce bouton pour déconnecter électroniquement le disque USB avant de pouvoir le déconnecter physiquement du routeur."
			},{
				type: "paragraph",
				content: "Merci de retenir que le bouton déconnexion sécurisée n'apparait que lorsque un dispositif de stockage USB est connecté au routeur. Gardez en mémoire que vous ne pouvez déconnecter électroniquement un disque USB s'il est en cours d'utilisation."
			},{
				type: "name",
				title: "Partager",
				content: "Cette case à cocher n'apparait qu'en présence d'un dispositif de stockage USB connecté au routeur, cocher la case pour autoriser le partage réseau de la ressource concernée."
			},{
				type: "step",
				title: "Pour paramétrer un serveur de fichiers",
				content: [
				"1. Connecter un dispositif de stockage au port USB du routeur.",
				"2. L'appareil doit être détecté par le routeur qui va afficher les informations dans la section Paramètres des appareils sinon, cliquer sur Détecter.",
				"3. Cocher la case Partager pour activer le partage de fichiers."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Compte de partage",
			CONTENT: [{
				type: "name",
				title: "Compte",
				content: "Vous pouvez soit utiliser le compte par défaut pour vous connecter aux partages soit créer un nouveau compte dont vous définirez ci-après les identifiants."
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir un nom d'utilisateur comprenant 1 à 15 caractères alphanumériques et un mot de passe comprenant  1 à 15 caractères ASCII. Majuscules et minuscules sont considérées différentes."
			},{
				type: "name",
				title: "Confirmer le Mot de passe",
				content: "Ressaisir le Mot de passe pour le confirmer. Attention aux minuscules et aux majuscules."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Paramètres de partage",
			CONTENT: [{
				type: "name",
				title: "Nom du serveur de médias/réseau",
				content: "Affiche le nom utilisé pour accéder au disque USB connecté. Le nom doit comporter 4 à 15 caractères alphanumériques et peut contenir des  tirets \"-\" et des sous-tirets \"_\". "
			},{
				type: "name",
				title: "Activer",
				content: "Choisir pour activer la méthode d'accès."
			},{
				type: "name",
				title: "Méthode d'accès",
				content: "Il existe 3 méthodes d'accès pour autoriser l'accès au dispositif de stockage USB. Vous pouvez en sélectionner plusieurs en cochant les cases correspondantes.",
				children: [{
					type: "name",
					title: "Voisinage réseau",
					content: "Si actif, les utilisateurs de votre réseau peuvent accéder aux appareils de stockage USB en utilisant l'adresse IP du serveur comme dans l'exemple : \\\\192.168.0.1."
				},{
					type: "name",
					title: "FTP",
					content: "Cette méthode si elle est active permet aux utilisateurs d'accéder au partage directement par l'adresse IP du routeur suivi du port FTP (exemple ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (Via internet)",
					content: "Cette méthode si elle est active permet aux utilisateurs d'accéder au partage directement par l'adresse IP publique du routeur suivi du port FTP (exemple ftp://8X.1Y.22Z.217:21) pour modifier l'adresse du port FTP saisir une autre valeur et cliquer sur Sauvegarder pour appliquer le changement."
				}]
			},{
				type: "name",
				title: "Lien",
				content: "Affiche l'adresse utilisable pour accéder au partage de ressource USB."
			},{
				type: "name",
				title: "Port",
				content: "Affiche le numéro de port du serveur FTP. Saisir une valeur comprise entre 1024 et 65535 ou conserver le port 21 par défaut."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Partage de dossier",
			CONTENT: [{
				type: "name",
				title: "Partager tout",
				content: "Sélectionner pour partager tous les dossiers et fichiers sinon laisser Partager tout sur Off afin que seuls les dossiers sélectionnés soient partagés."
			},{
				type: "name",
				title: "Activer authentification",
				content: "Il est fortement recommandé d'activer l'authentification pour imposer aux utilisateurs de saisir des identifiants avant de pouvoir accéder aux contenus partagés."
			},{
				type: "name",
				title: "Nom de dossier",
				content: "Affiche le nom du dossier partagé."
			},{
				type: "name",
				title: "Chemin d’accès",
				content: "Affiche le chemin d'accès au dossier partagé."
			},{
				type: "name",
				title: "Serveur de médias",
				content: "Indique si le contenu du dossier est accessible depuis un lecteur de médias (lecteur Windows média…)."
			},{
				type: "name",
				title: "Nom de volume",
				content: "Affiche le nom du disque USB ou la mention volumnx si ce nom n’est pas défini."
			},{
				type: "name",
				title: "Partage réseau",
				content: "Indique si le partage réseau est actif pour le dossier concerné par une icône, et quand il est inactif par l’icône."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour modifier ou supprimer le dossier partagé concerné."
			},{
				type: "name",
				title: "Naviguer",
				content: "Cliquer pour rechercher un dossier partagé."
			},{
				type: "name",
				title: "Permettre l'accès au réseau invités",
				content: "Cocher la case pour autoriser les clients du réseau invités à accéder aux dossiers partagés."
			},{
				type: "name",
				title: "Activer authentification",
				content: "Cocher la case pour activer l'authentification et autoriser l'accès aux dossiers partagés aux seuls utilisateurs correctement authentifiés. Le nom d’utilisateur et lemot de passe requis sont par défaut ceux du routeur (admin/admin)."
			},{
				type: "name",
				title: "Autoriser l'écriture",
				content: "Cocher la case pour donner l'autorisation aux clients de modifier le contenu du dossier."
			},{
				type: "name",
				title: "Autoriser le partage de médias",
				content: "Cocher la case pour activer le serveur de médias."
			},{
				type: "name",
				title:"Actualiser",
				content: "Cliquer pour mettre à jour la liste des répertoires partagés."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Serveur d'impression",
			CONTENT: [{
				type: "name",
				title:"Serveur d'impression",
				content: "Basculer sur On pour activer le serveur d'impression."
			},{
				type: "name",
				title:"Nom de l'imprimante",
				content: "Affiche le nom de l'imprimante connectée au routeur."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Téléchargement hors connexion",
			CONTENT: [{
				type: "name",
				title:"Etat",
				content: "Basculer sur On pour activer la fonction de téléchargement hors ligne."
			},{
				type: "name",
				title:"Chemin d’accès",
				content: "Répertoire de travail de la fonction de téléchargement hors ligne. Vous devez choisir un chemin d'accès quand le bouton d'état est sur On, sinon la liste des actions restera invisible ce qui signifie que vous ne pourrez rien faire de plus ; Une fois le répertoire de travail défini, tous les fichiers créés par les opérations suivantes sont sauvegardés ou mis en tampon dans ce répertoire. S'il y a des opérations en cours, le répertoire de travail ne peut être modifié, et il est recommandé de ne pas déconnecter le périphérique de stockage USB afin de ne pas générer des erreurs fatales irrécupérables."
			},{
				type: "name",
				title:"Planification",
				content: "Si coché, vous pouvez définir les périodes de téléchargement. La planification horaire est basée sur l'heure système du routeur qui peut être définie dans ''Outils système -> Paramètres horaires\"."
			},{
				type: "name",
				title:"Continuer à diffuser après achèvement du téléchargement",
				content: "Si coché, les téléchargements achevées continuent à être partagés."
			},{
				type: "name",
				title: "Nombre maximal de tâches actives",
				content: "Affiche le nombre maximal de tâches actives."
			},{
				type: "name",
				title:"Vitesse de téléchargement maximale",
				content: "Affiche la vitesse maximale de téléchargement."
			},{
				type: "name",
				title:"Vitesse de téléversement maximale",
				content: "Afficher la vitesse minimale de téléchargement."
			},{
				type: "name",
				title: "Nombre de connexions.",
				content: "Affiche les paramètres de connexion."
			},{
				type: "name",
				title: "Nombre maximum global de connexion.",
				content: "Modifier pour limiter le nombre maximal de connexions pour toutes les tâches."
			},{
				type: "name",
				title: "Nombre maximal de Pairs connectés par Torrent",
				content: "Modifier pour limiter le nombre maximal de Pairs connectés par Torrent."
			},{
				type: "name",
				title: "Activer le réseau DHT",
				content: "Si coché, DHT est activé."
			},{
				type: "name",
				title: "Permettre l'échange pair à pair",
				content: "Si coché, l'échange d'informations de pairs est activé."
			},{
				type: "name",
				title: "Activer le chiffrement du protocole Bit Torrent",
				content: "Si coché, le chiffrement du protocole Bit Torrent est activé."
			},{
				type: "name",
				title:"Serveur aMule",
				content: "Saisir l'adresse IP et le port du serveur aMule auquel se connecter."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Eléments",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche les éléments téléchargés."
			},{
				type: "name",
				title: "Fichier",
				content: "Affiche le nom du fichier téléchargé."
			},{
				type: "name",
				title:"Vitesse",
				content: "Affiche les débits de téléchargement et de téléversement."
			},{
				type: "name",
				title: "Achevé",
				content: "Affiche la taille totale et celle déjà téléchargée."
			},{
				type: "name",
				title:"Temps restant",
				content: "Affiche le temps restant avant l'achèvement du téléchargement."
			},{
				type: "name",
				title:"Pairs connectés",
				content: "Affiche les informations relatives aux pairs connectés."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état de la tâche."
			},{
				type: "name",
				title: "Source",
				content: "Affiche le type de téléchargement."
			},{
				type: "step",
				title: "Pour ajouter un téléchargement",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Sélectionner le type de source de téléchargement :",
					"1) Torrent depuis le PC : Cliquer sur naviguer pour sélectionner un fichier torrent depuis le PC.",
					"2) Torrent depuis le port USB : Sélectionner un volume et cliquer sur naviguer pour sélectionner un fichier torrent depuis le port USB.",
					"3) URL : Saisir l'URL (HTTP, HTTPS, FTP, ed2K).",
					"3. Cliquer sur OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Contrôle Parental",
			CONTENT: [{
				type: "paragraph",
				content: "Avec le contrôle parental, vous pouvez bloquer à certaines heures de la journée, certains sites WEB afin d'en interdire l'accès aux utilisateurs du réseau (par exemple les sites de réseaux sociaux à l'heure des devoirs) et en même temps protéger tous les clients réseaux des dangers d'internet depuis un point de contrôle central."
			},{
				type: "name",
				title: "Contrôle parental",
				content: "Basculer sur On pour activer le contrôle parental. Par défaut la fonction est inactive."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Appareils soumis au contrôle parental",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche la liste des appareils soumis au contrôle parental."
			},{
				type: "name",
				title: "Nom d'appareil",
				content: "Affiche le nom de tous les clients connectés soumis au contrôle parental."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Affiche l'adresse MAC de tous les clients soumis au contrôle parental."
			},{
				type: "name",
				title: "Horaires d'accès à internet",
				content: "Affiche les périodes de restriction d'accès à internet. La planification est basée sur l'heure système du routeur qui peut être définie dans 'Outils système - > Paramètres horaires'."
			},{
				type: "name",
				title: "Description",
				content: "Affiche une brève description des appareils connectés. C'est un paramètre optionnel."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel (Actif ou Inactif) du contrôle parental pour l'appareil sélectionné."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour modifier ou supprimer l'appareil concerné."
			},{
				type: "step",
				title: "Pour limiter l'accès d'un nouveau client",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Cliquer sur visualiser les appareils connectés et choisir un appareil connecté dans la liste des appareils ou saisir le nom d'appareil et l'adresse MAC manuellement pour ajouter un appareil qui n'est pas connecté.",
					"3. Cliquer sur l'icône horaires d'accès à internet pour définir les horaires auxquels l’accès au réseau est autorisé/interdit.",
					"4. Saisir une brève description dans le champ dédié. (Optionnel)",
					"5. Cocher la case Activer.",
					"6. Cliquer sur OK pour enregistrer ce réglage."
				]
			},{
				type: "paragraph",
				content: "Pour modifier ou supprimer un élément de contrôle parental, cliquer sur l'icône Editer ou sur l'icône Poubelle correspondant à l'entrée que vous souhaitez Editer ou Modifier."
			},{
				type: "paragraph",
				content: "Pour supprimer de multiples éléments, sélectionner tous les éléments concernés et cliquer sur le bouton Supprimer au dessus de la liste."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Restriction de contenus",
			CONTENT: [{
				type: "name",
				title: "Liste noire",
				content: "Contient des mots qui seront utilisés pour bloquer tout accès aux clients spécifiés dans la liste de restrictions du contrôle parental.",
				children: [{
					type: "paragraph",
					content: "Cliquer sur Ajouter un nouveau mot pour enrichir la liste noire. Pour supprimer un mot cliquer sur l'icône (-) du mot que vous souhaitez supprimer."
				}]
			},{
				type: "name",
				title: "Liste blanche",
				content: "Contient des adresses de sites WEB dont l'accès est autorisé aux clients spécifiés dans la liste de contrôle parental.",
				children: [{
					type: "paragraph",
					content: "Cliquer sur Ajouter un nouveau nom de de domaine pour enrichir la liste blanche. Pour supprimer un nom de domaine cliquer sur l'icône (-) du site que vous souhaitez supprimer."
				}]
			},{
				type: "note",
				title: "Remarque",
				content: "Les mots clés peuvent être des noms de domaine, par exemple : mail.google.com ou www.facebook.com."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer votre configuration."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "La qualité de service (QoS) aide à classifier selon vos besoins, le trafic internet par priorités. Vous pouvez spécifier un niveau de priorité pour un appareil ou une application dans la liste des règles de QoS."
			},{
				type: "name",
				title: "Activer QoS",
				content: "Cliquer sur ce choix pour activer la QoS."				
			},{
				type: "name",
				title: "Débit Montant",
				content: "Entrer le débit montant maximal de votre connexion internet."				
			},{
				type: "name",
				title: "Débit Descendant",
				content: "Entrer le débit descendant maximal de votre connexion internet."
			},{
				type: "name",
				title: "Priorité élevée",
				content: "Spécifier un pourcentage attribué au trafic à priorité haute."
			},{
				type: "name",
				title: "Priorité moyenne",
				content: "Spécifier un pourcentage attribué au trafic à priorité moyenne."
			},{
				type: "name",
				title: "Priorité faible",
				content: "Spécifier un pourcentage attribué au trafic à priorité faible."
			},{
				type: "note",
				title: "Remarque",
				content: "La valeur maximale (en %) de toutes les priorités est 1."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		QOS_RULE: {
			TITLE: "Liste de règles de QoS",
			CONTENT: [{
				type: "name",
				title: "Type",
				content: "Sélectionner un type de règle à ajouter."
			},{
				type: "step",
				title: "Pour définir une règle pour une priorité basse/moyenne/haute par appareil",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Sélectionner Par Appareil.",
					"3. Cliquer sur visualiser les appareils connectés pour sélectionner votre appareil parmi la liste d'appareils, ou bien vous pouvez saisir le nom d'un appareil et son adresse MAC manuellement dans les champs Nom d'appareil et Adresse MAC.",
					"4. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour définir une règle pour une priorité basse/moyenne/haute par application",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Sélectionner Par Application.",
					"3. Choisir votre application depuis la liste, ou définir une application personnelle en configurant son nom, son protocole et le port de destination (1 à 65535) dans les champs adéquats, vous pouvez saisir un N° de port unique ou une étendue (insérer un tiret entre les bornes)en utilisant des virgules pour les séparer (21,36,36-105,111).",
					"4. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour définir une règle pour une priorité basse/moyenne/haute par port physique",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Sélectionner Par port physique.",
					"3. Sélectionner le port.",
					"4. Cliquer sur OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Mise à jour de la base de données",
			CONTENT: [{
				type: "name",
				title: "Nouvelle base de données",
				content: "Cliquer sur Parcourir pour localiser votre nouveau fichier de base de données. Choisir et cliquer sur Mettre à jour pour mettre à jour votre base de donnée."
			},{
				type: "name",
				title: "Version de base de données",
				content: "Affiche la version actuelle de la base de données."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Pare-feu",
			CONTENT: [{
				type: "name",
				title: "Pare-feu SPI",
				content: "Le pare feu SPI (Stateful Packet Inspection) prévient les attaques et valide le trafic traversant le routeur en fonction du protocole utilisé."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "Protection DoS",
			CONTENT: [{
				type: "name",
				title: "Protection DoS",
				content: "La protection contre les DoS (dénis de service) protège votre réseau local contre les attaques par débordement par des requêtes serveur."
			},{
				type: "name",
				title: "Filtrage des attaques ICMP-FLOOD",
				content: "Activer pour prévenir contre les attaques par saturation via ICMP.",
				children: [{
					type: "name",
					title: "Désactivé",
					content: "Aucune protection."
				},{
					type: "name",
					title: "Faible",
					content: "Niveau de protection faible et impact mineur sur les performances du routeur."
				},{
					type: "name",
					title: "Moyen",
					content: "Niveau de protection moyen et impact supportable sur les performances du routeur."
				},{
					type: "name",
					title: "Fort",
					content: "Niveau de protection fort et impact notable sur les performances du routeur."
				}]
			},{
				type: "name",
				title: "Filtrage des attaques UDP-FLOOD",
				content: "Activer pour prévenir contre les attaques par saturation via UDP."
			},{
				type: "name",
				title: "Filtrage des attaques TCP-SYN-FLOOD",
				content: "Activer pour prévenir contre les attaques par saturation via TCP-SYN."
			},{
				type: "name",
				title: "Ignorer les paquets PING issus du port WAN",
				content: "Activer pour ignorer les requêtes PING depuis le WAN."
			},{
				type: "name",
				title: "Ignorer les paquets PING issus du port LAN",
				content: "Activer pour ignorer les requêtes PING depuis le LAN."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Liste d'hôtes DoS bloqués",
			CONTENT: [{
				type: "name",
				title: "Liste d'hôtes DoS bloqués",
				content: "Liste d'adresse IP et MAC de tout source d'attaque DoS bloquée."
			},{
				type: "step",
				title: "Pour effacer un élément",
				content: "Dans la liste d'hôtes, Choisir l'élément que vous souhaitez supprimer et cliquer sur Effacer au dessus de la liste."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Contrôle d'accès",
			CONTENT: [{
				type: "paragraph",
				content: "Le contrôle d'accès est utilisé pour autoriser ou interdire l'accès au réseau à des ordinateurs ou des équipements réseaux. Quand un appareil est bloqué, il est incapable de communiquer avec d'autres appareils ou d'accéder à internet."
			},{
				type: "paragraph",
				content: "Pour utiliser le contrôle d'accès, activer cette fonction et spécifier une liste noire ou blanche. Si le contrôle d'accès est inactif, tout appareil même s'il est présent dans la liste noire accède au réseau et à internet."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Mode d'accès",
			CONTENT: [{
				type: "name",
				title: "Liste noire",
				content: "Seuls les appareil présents dans la liste voient leur accès au réseau refusé."
			},{
				type: "name",
				title: "Liste blanche",
				content: "Seuls les appareils présents dans la liste ont accès au réseau."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Appareils connectés",
			CONTENT: [{
				type: "name",
				title: "Nom d'appareil",
				content: "Noms des appareils connectés."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Adresses IP des appareils connectés."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresses MAC des appareils connectés."
			},{
				type: "name",
				title: "Type de connexion",
				content: "Affiche le type de connexion de l'appareil."
			},{
				type: "step",
				title: "Pour bloquer un appareil",
				content: "Dans la table des appareils connectés, cliquer sur l'icône Bloquer dans la colonne Modifier qui correspond à l'appareil que vous souhaitez bloquer."
			},{
				type: "step",
				title: "Pour bloquer plusieurs appareils",
				content: "Dans la liste des appareils connectés, sélectionner tous les appareils que vous souhaitez bloquer, puis cliquer sur Bloquer au dessus de la liste. Les appareils seront automatiquement ajoutés à la liste noire."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Appareils en liste noire/blanche",
			CONTENT: [{
				type: "step",
				title: "Pour ajouter un appareil à la liste noire ou blanche",
				content: [
					"1. Cliquer sur l'icône Ajouter.",
					"2. Saisir le nom de l'appareil.",
					"3. Entrer l'adresse MAC de l'appareil.",
					"4. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer un appareil de la liste noire/blanche",
				content: "Dans la liste noire/blanche, cliquez sur l'icône Editer ou l'icône Poubelle qui correspond à l'appareil que vous souhaitez modifier ou supprimer."
			},{
				type: "step",
				title: "Pour supprimer plusieurs appareils dans la liste noire/blanche",
				content: "Dans la liste noire/blanche, sélectionner tous les appareils à supprimer, cliquer sur Supprimer au dessus de la liste."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Paramétrages",
			CONTENT: [{
				type: "paragraph",
				content: "L'association ARP (Protocole de résolution d'adresse) est pratique pour contrôler l'accès d'un ordinateur sur le LAN en associant son adresse IP et son adresse MAC dans une table. Ceci permet d'éviter qu'un appareil utilise une adresse IP associée à une MAC adresse différente de la sienne."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "Liste ARP",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche la liste des adresses IP et MAC des appareils actuellement connectés."
			},{
				type: "name",
				title: "Nombre d'entrées ARP",
				content: "Affiche le nombre total d'appareils actuellement connectés au routeur."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresses MAC des appareils connectés."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Affiche l'adresse IP de l'appareil connecté."
			},{
				type: "name",
				title: "Associé",
				content: "Indique si l'adresse MAC et IP sont associées ou non."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour Associer ou Supprimer les éléments correspondants de la liste."
			},{
				type: "note",
				title: "Remarque",
				content: "Remarque: Vous ne pouvez pas associer la même adresse IP à plusieurs adresses MAC."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Liste d'associations",
			CONTENT: [{
				type: "step",
				title: "Pour définir une association",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Entrer l'adresse MAC de l'appareil.",
					"3. Entrer l'adresse IP que vous voulez associer à l'adresse MAC précédemment saisie.",
					"4. Entrer une description pour cet appareil (optionnel)",
					"5. Cocher la case Activer.",
					"6. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer une association",
				content: "Dans la liste d'association cliquer sur l'icône Editer ou sur l'icône Poubelle qui correspond à l'appareil que vous souhaitez modifier ou effacer."
			},{
				type: "step",
				title: "Pour supprimer plusieurs associations",
				content: "Dans la liste d'associations, sélectionner tous les appareils à supprimer, cliquer sur Supprimer au dessus de la liste."
			}]
		},
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Choisir d'activer (On) ou de désactiver (Off) la fonction IPv6 du routeur."
			},{
				type: "title",
				title: "Type de Connexion internet : IP Statique",
			},{
				type: "name",
				title: "IP Statique",
				content: "Choisir ce réglage si votre connexion internet ne requiert pas d'authentification et que les paramètres IPv6, Masque de sous réseau passerelle et serveurs DNS vous sont fournis par votre FAI."
			},{
				type: "name",
				title: "Adresse IPv6/Masque de sous réseau/Passerelle par défaut/DNS Primaire/DNS Secondaire",
				content: "Saisir les paramètres fournis par votre FAI."
			},{
				type: "name",
				title: "Taille de la MTU",
				content: "l'Unité Maximum de Transfert typique par défaut est 1500 octets pour la plupart des réseaux Ethernet. Il est déconseillé de changer la valeur par défaut sauf si votre FAI le requiert."
			},{
				type: "title",
				title: "Type de Connexion internet : IP Dynamique",
			},{
				type: "name",
				title: "IP Dynamique",
				content: "Choisir ce réglage si votre connexion internet ne requiert pas d'authentification et que les paramètres IPv6 vous sont fournis par le serveur DHCP de votre FAI."
			},{
				type: "name",
				title: "Adresse IPv6/Masque de sous réseau/Passerelle par défaut/DNS Primaire/DNS Secondaire",
				content: "Ces paramètres sont automatiquement attribués par le serveur DHCP IPv6 de votre FAI."
			},{
				type: "name",
				title: "Renouveler",
				content: "Cliquer sur ce bouton pour renouveler vos paramètres depuis le serveur DHCP IPv6 de votre FAI."
			},{
				type: "name",
				title: "Libérer",
				content: "Cliquer sur ce bouton pour ne plus utiliser les paramètres actuels (perte de la connexion internet)."
			},{
				type: "name",
				title: "Obtenir une adresse IPv6",
				content: "Choisir DHCPv6 pour obtenir une adresse IPv6 non temporaire ou SLAAC pour obtenir une IPv6 générée par le 'Router Advertisement Packet', dépend du FAI."
			},{
				type: "name",
				title: "Délégation de préfixe",
				content: "Activer pour obtenir un préfixe de délégation par le serveur DHCPv6 du FAI, Inactiver pour définir manuellement un préfixe de délégation. Les clients dans le réseau local génèreront une IPv6 avec ce préfixe."
			},{
				type: "name",
				title: "Adresse DNS",
				content: "Choisir ''Obtenir les adresses dynamiquement via votre FAI'' ou ''Utiliser les adresses DNS suivantes'' et dans ce cas, saisir manuellement les adresses DNS fournies par votre FAI."
			},{
				type: "name",
				title: "DNS Primaire/DNS Secondaire",
				content: "Compléter les champs manuellement si leur obtention n'est pas automatique."
			},{
				type: "title",
				title: "Type de Connexion internet : PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Sélectionner ce type de connexion si l'accès internet proposé par votre FAI le requiert."
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les identifiants communiqués par votre FAI lors de la souscription à ses services."
			},{
				type: "name",
				title: "Adresse IPv6",
				content: "Ces paramètres sont attribués par le serveur DHCP IPv6 de votre FAI, après la saisie du nom d'utilisateur et du Mot de passe, et avoir cliqué sur Se Connecter."
			},{
				type: "name",
				title: "Adresse DNS",
				content: "Choisir ''Obtenir les adresses dynamiquement via votre FAI'' ou ''Utiliser les adresses DNS suivantes'' et dans ce cas, saisir manuellement les adresses DNS fournies par votre FAI."
			},{
				type: "name",
				title: "Obtenir une adresse IPv6",
				content: "Choisir DHCPv6 pour obtenir une adresse IPv6 non temporaire ou SLAAC pour obtenir une IPv6 générée grâce au 'Router Advertisement Packet', ou spécifiée par le FAI en ce cas saisir l'adresse IPv6 spécifiée par le FAI."
			},{
				type: "name",
				title: "Délégation de préfixe",
				content: "Activer pour obtenir un préfixe de délégation par le serveur DHCPv6 du FAI, Inactiver pour définir manuellement un préfixe de délégation. Les clients dans le réseau local génèreront une IPv6 avec ce préfixe."
			},{
				type: "name",
				title: "Se connecter",
				content: "Cliquer sur ce bouton pour vous connecter à internet."
			},{
				type: "name",
				title: "Se déconnecter",
				content: "Cliquer sur ce bouton pour vous déconnecter d'internet."
			},{
				type: "title",
				title: "Type de connexion internet : Tunnel 6to4"
			},{
				type: "name",
				title: "Tunnel 6to 4",
				content: "Choisir ce type si votre FAI utilise l'encapsulation 6to4 pour attribuer des adresses."
			},{
				type: "name",
				title: "Adresse IPv4/Masque de sous réseau IPv4/Passerelle par défaut IPv4/Adresse du tunnel",
				content: "Ces paramètres sont générés dynamiquement par l'information IPv4 du port WAN après avoir cliqué sur Se connecter."
			},{
				type: "name",
				title: "Utiliser le server DNS suivant",
				content: "Cocher la case pour saisir manuellement les DNS primaire/secondaire indiqués par le FAI."
			},{
				type: "name",
				title: "Se connecter",
				content: "Cliquer sur ce bouton pour vous connecter à internet."
			},{
				type: "name",
				title: "Se déconnecter",
				content: "Cliquer sur ce bouton pour vous déconnecter d'internet."
			}/*,{
				type: "title",
				title: "Type de connexion internet : 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Choisir ce type si votre FAI utilise l'encapsulation 6RD et vous fourni une adresse IPv4 et un préfixe d'adresse IPv6."
			},{
				type: "name",
				title: "Type de configuration",
				content: "Choisir Auto ou Manuel pour configurer les paramètres de canal 6RD en fonction de votre FAI. Si les paramètres coïncident avec ceux fournis par votre FAI, vous pouvez choisir Auto, sinon choisir manuel et saisir les paramètres fournis par votre FAI."
			},{
				type: "name",
				title: "Longueur de masque IPv4/Préfixe 6RD/Longueur de préfixe 6RD/Adresse IPv4 border relay",
				content: "Vérifiez si les paramètres prédéfinis coïncident avec ceux fournis par votre FAI, et conserver ceux par défaut ou saisir manuellement ceux que fournis par votre FAI."
			},{
				type: "title",
				title: "Type de connexion internet : DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Choisir ce type si votre FAI utilise l'encapsulation DS-Lite et vous fourni un nom de domaine AFTR ou une adresse IPv6, pour configurer un tunnel IPv4inIPv6 dans le réseau IPv6 faire transiter les communications IPv4 ou IPv6 dans leurs réseaux respectifs."
			},{
				type: "name",
				title: "Nom AFTR",
				content: "AFTR est l’abréviation de Address Family Transition Router. Dans ce champ saisir le nom de domaine AFTR ou l'adresse IPv6 fournie par votre FAI."
			},{
				type: "name",
				title: "Connexion secondaire",
				content: "Choisir le type de connexion secondaire fourni par votre FAI.",
				children :[ 
				{
					type: "name",
					title: "IP Dynamique",
					content: "Choisir si votre FAI fourni une IP dynamique en connexion secondaire et en ce cas, les paramètres : adresse IPv6, DNS primaire/secondaire seront automatiquement assignés par le serveur DHCPv6 du FAI."
				},
				{
					type: "name",
					title: "IP Statique",
					content: "Choisir si votre FAI fourni une IP statique en connexion secondaire et en ce cas, saisir les paramètres : adresse IPv6, passerelle par défaut, DNS primaire/secondaire assignés par votre FAI. Configurez ensuite la taille de la MTU (si cela est nécessaire) ou conservez la valeur par défaut."
				},{
					type: "name",
					title: "PPPoE",
					content: "Sélectionner si votre FAI vous fourni une connexion secondaire en PPPoE saisi le nom d'utilisateur et le Mot de passe fournis par votre FAI. L'adresse IPV6 sera automatiquement après avoir cliqué sur Se Connecter."
				}]
			}*/,{
				type: "title",
				title: "Type de connexion internet : Passthrough (Pont)"
			},{
				type: "paragraph",
				content: "Sélectionner ce type si votre FAI utilise un réseau Pass Through (Pont). Pour ce type, aucun paramètre n'est fourni et aucune configuration n'est nécessaire."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Excepté pour le mode transparent (Pont), les 6 autres types de connexion à internet requièrent la configuration d'IPv6."
			},{
				type: "name",
				title: "Type assigné",
				content: "Sélectionner le type approprié en fonction de votre FAI.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Pour attribuer automatiquement des adresses IP aux clients du réseau local.",
					children: [{
						type: "name",
						title: "Préfixe d'adresse",
						content: "Saisir le préfixe d'adresse fourni par votre FAI."
					},{
						type: "name",
						title: "Durée du bail",
						content: "Correspond à la durée pendant laquelle l'adresse IP est valide. Conserver une durée de 86400secondes ou modifier la valeur si votre FAI le requiert."
					},{
						type: "name",
						title: "Adresse",
						content: "C'est l'adresse IP attribuée automatiquement par le serveur DHCPv6 de votre FAI."
					}]
				},{
					type: "name",
					title: "SLAAC+Stateless DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Préfixe d'adresse",
						content: "Saisir le préfixe d'adresse fourni par votre FAI."
					},{
						type: "name",
						title: "Adresse",
						content: "Adresse IP automatiquement assignée par le FAI."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Préfixe d'adresse",
						content: "Saisir le préfixe d'adresse fourni par votre FAI."
					},{
						type: "name",
						title: "Adresse",
						content: "Adresse IP automatiquement assignée par le FAI."
					}]
				}]
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "Clonage adresse MAC",
			CONTENT: [{
				type: "name",
				title: "Utiliser l'adresse MAC par défaut",
				content: "NE change pas l'adresse MAC par défaut du routeur, au cas ou le FAI n'associe pas l'adresse IP attribuée à l'adresse MAC."
			},{
				type: "name",
				title: "Utiliser l'adresse MAC de l'ordinateur connecté",
				content: "Choisir de copier l'adresse MAC de l'ordinateur connecté au routeur, au cas ou le FAI associe l'adresse IP attribuée à l'adresse MAC de l'ordinateur."
			},{
				type: "name",
				title: "Utiliser une adresse MAC personnalisée",
				content: "saisir l'adresse MAC manuellement, au cas ou le FAI associe l'adresse IP attribuée à une adresse MAC spécifique."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Paramètres horaires",
			CONTENT: [{
				type: "step",
				title: "Pour synchroniser l'heure automatiquement",
				content: [
					"1. Dans le champ Mettre à l'heure, choisir Obtenir l'heure automatiquement depuis internet.",
					"2. Choisir votre Fuseau horaire dans la liste déroulante.",
					"3. Dans le champ Serveur NTP, saisir l'adresse IP ou le nom de serveur NTP de votre choix.",
					"4. Dans le champ Serveur NTP, saisir l'adresse IP ou le nom de serveur NTP secondaire de votre choix (Optionnel)",
					"5. Cliquer sur Obtenir l'heure.",
					"6. Cliquer sur Sauvegarder."
				]
			},{
				type: "step",
				title: "Pour définir manuellement date et heure",
				content: [
					"1. Dans le champ définir l'heure, choisir Manuellement.",
					"2. Saisir la date actuelle.",
					"3. Saisir l'heure actuelle (dans le format hh-mm-ss: 16-00-00 = 4 heures de l'après midi).",
					"4. Cliquer sur Sauvegarder."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Heure d'été",
			CONTENT: [{
				type: "step",
				title: "Pour définir les paramètres liés  à l'heure d'été",
				content: [
					"1. Sélectionner Activer l'heure d'été.",
					"2. Saisir la date et l'heure de passage à l'heure d'été.",
					"3. Saisir la date et l'heure de passage à l'heure d'hiver.",
					"4. Cliquer sur Sauvegarder."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnostics",
			CONTENT: [{
				type: "paragraph",
				content: "Le routeur dispose des fonctions PING et TRACEROUTE pour vous aider à dépanner vos problèmes de connexion réseau. L'outil de PING envoie des paquets à une adresse IP cible ou à un nom de domaine et enregistre les réponses tels le nombre de paquets émis/reçus, et le temps de réponse. L'outil TRACEROUTE envoie des paquets à une adresse IP cible ou à un nom de domaine et affiche le nombre de sauts et le temps mis à atteindre la destination."
			},{
				type: "paragraph",
				content: "Vous pouvez utiliser PING et TRACEROUTE vers un appareil local soit par son IP soit par son nom de domaine (google.com / Yahoo.com…)."
			},{
				type: "step",
				title: "Pour un diagnostic via PING",
				content: [
					"1. Saisir l'adresse IP ou le nom de domaine cible.",
					"2. Cliquer sur la flèche afin d'ouvrir le menu Avancé et saisir la quantité et la taille du paquet PING (optionnel)",
					"3. Cliquer sur démarrer."
				]
			},{
				type: "step",
				title: "Pour un diagnostic via Traceroute",
				content: [
					"1. Saisir l'adresse IP ou le nom de domaine cible.",
					"2. Cliquer sur la flèche afin d'ouvrir le menu Avancé et saisir le nombre de sauts pour atteindre le site dans le champ Traceroute TTL Max (la valeur par défaut est 20)",
					"3. Cliquer sur démarrer."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Mise à jour logicielle",
			CONTENT: [{
				type: "paragraph",
				content: "Avant de mettre à jour le logiciel du routeur, vous devez le télécharger depuis le site WEB :  <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK Support</a>."
			},{
				type: "step",
				title: "IMPORTANT: Pour éviter l'échec de la mise à jour, merci de prendre note de ce qui suit:",
				content: [
					"Assurez vous que le fichier de mise à jour correspond à la version matérielle (comme montré dans la page mise à jour logicielle).",
					"Assurez vous de disposer d'une connexion stable entre le routeur et votre ordinateur. Il est déconseillé de procéder à la mise à jour via le Wi-Fi.",
					"Assurez vous de déconnecter tout périphérique de stockage USB éventuellement connecté au routeur avant de procéder à la mise à jour afin d'empêcher toute perte de données.",
					"Sauvegardez la configuration de votre routeur (notez la en plus d'en faire une copie).",
					"Ne pas éteindre le routeur durant la phase de mise à jour."
				]
			},{
				type: "step",
				title: "Pour mettre à jour le logiciel du routeur",
				content: [
					"1. Cliquer sur parcourir.",
					"2. Naviguer jusqu'au fichier de mise à jour et le sélectionner.",
					"3. Cliquer sur Mettre à jour."
				]
			},{
				type: "paragraph",
				content: "La mise à jour prend quelques minutes pour s'effectuer. Merci de NE PAS éteindre le routeur durant cette phase."
			}]
		},
		
		BACKUP: {	
			TITLE: "Sauvegarde",
			CONTENT: [{
				type: "paragraph",
				content: "Il est fortement recommandé de sauvegarder la configuration de votre routeur afin de la restaurer rapidement en cas d'effacement accidentel ou de mise à jour du logiciel du routeur."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer la configuration active sur votre ordinateur. Assurez vous de mettre le fichier de configuration à l'abri afin de le retrouver quand cela sera nécessaire."
			}]
		},
		
		RESTORE: {
			TITLE: "Restauration",
			CONTENT: [{
				type: "step",
				title: "Pour restaurer une configuration",
				content: [
					"1. Cliquer sur parcourir.",
					"2. Naviguer jusqu'à l'emplacement de la sauvegarde et la sélectionner.",
					"3. Cliquer sur Restaurer."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Paramètres par défaut",
			CONTENT: [{
				type: "paragraph",
				content: "Cliquer sur Réinitialiser pour que le routeur soit restauré à ses paramètres par défaut."
			},{
				type: "step",
				title: "Remarque",
				content: [
					"1. La réinitialisation effacera tous les paramètres de routeur que vous avez définis. Pour vous reconnecter à la page d'administration du routeur, utilisez le paramètre par défaut : admin+F22 pour les champs nom d'utilisateur et mot de passe.",
					"2. Merci de pas mettre le routeur hors tension pendant les processus de sauvegarde ou de restauration."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Administration des comptes",
			CONTENT: [{
				type: "paragraph",
				content: "Cette page vous permet de changer le nom d'utilisateur et/ou le Mot de passe permettant l'accès à l'interface de ce routeur, de définir une adresse email pour récupérer le Mot de passe."
			},{
				type: "name",
				title: "Ancien nom d'utilisateur",
				content: "Saisir le nom d'utilisateur actuel."
			},{
				type: "name",
				title: "Ancien Mot de passe",
				content: "Saisir le Mot de passe actuel."
			},{
				type: "name",
				title: "Nouveau nom d'utilisateur",
				content: "Saisir le nom d'utilisateur souhaité."
			},{
				type: "name",
				title: "Nouveau Mot de passe",
				content: "Saisir le Mot de passe souhaité."
			},{
				type: "name",
				title: "Confirmer le nouveau Mot de passe",
				content: "Saisir à nouveau le Mot de passe souhaité."
			},{
				type: "note",
				title: "Remarque",
				content: "Remarque: Si vous décidez de modifier les valeurs par défaut assurez vous de les noter et de les mettre en lieu sûr."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Récupération du Mot de passe",
			CONTENT: [{
				type: "name",
				title: "Activer la récupération du mot de passe",
				content: "Il est fortement conseillé d'activer la fonction de récupération du mot de passe qui vous permettra de récupérer les paramètres d'authentification par email."
			},{
				type: "name",
				title: "De",
				content: "Saisir l'adresse email (valide) qui sera utilisée pour envoyer l'email."
			},{
				type: "name",
				title: "A",
				content: "Saisir l'adresse email (valide) à laquelle sera envoyée l'email."
			},{
				type: "name",
				title: "Serveur SMTP",
				content: "Saisir l'adresse du serveur SMTP que le routeur utilisera pour envoyer par email le code de vérification."
			},{
				type: "name",
				title: "Activer authentification",
				content: "Choisir ce réglage si le serveur SMTP utilisé requiert une authentification préalable à l'envoi d'emails ; saisir les nom d'utilisateur et Mot de passe requis par le serveur de messagerie utilisé (Attention à respecter minuscules/majuscules)."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Administration locale",
			CONTENT: [{
				type: "paragraph",
				content: "Cette section vous permet de limiter le nombre d'appareils connectés au réseau LAN et autorisés à administrer le routeur par une authentification de l'adresse MAC."
			},{
				type: "name",
				title: "Accès autorisé à tous les appareils",
				content: "Activer ce choix pour permettre à quiconque connecté au réseau d'accéder à l'interface de ce routeur, ou Désactiver pour n'autoriser que certains appareils."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Adresse MAC de l'appareil autorisé."
			},{
				type: "name",
				title: "Description",
				content: "Description de l'appareil autorisé."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel de la limitation d'accès à l'administration locale (Activée/Inactive)."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour modifier ou supprimer l'appareil sélectionné de la liste."
			},{
				type: "step",
				title: "Pour ajouter un appareil autorisé à la liste",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Cliquer sur Visualiser les appareils présents pour choisir un appareil ou saisir l'adresse MAC d'un appareil dans le champ Adresse MAC.",
					"3. Saisir une description pour l'appareil.",
					"4. Cliquer sur Activer.",
					"5. Cliquer sur OK."
				]
			},{
				type: "step",
				title: "Pour modifier ou supprimer un appareil de la liste",
				content: "Dans la liste, cliquer sur l'icône Editer ou sur l'icône Poubelle correspondant à l'appareil que vous souhaitez Editer ou Modifier."
			},{
				type: "step",
				title: "Pour supprimer plusieurs appareils",
				content: "Sélectionner tous les appareils concernés et cliquer sur Supprimer."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Administration distante",
			CONTENT: [{
				type: "paragraph",
				content: "L'administration à distance vous permet d'accéder et de configurer le routeur à distance depuis internet."
			},{
				type: "name",
				title: "Désactiver l'administration distante",
				content: "Choisir cette option pour désactiver l'administration distante."
			},{
				type: "name",
				title: "Activer l'administration distante pour tous les appareils",
				content: "Choisir cette option pour activer l'administration depuis une n'importe quelle adresse IP. Saisir le port WEB d'administration dans le champ dédié."
			},{
				type: "name",
				title: "Activer l'administration distante pour certains appareils",
				content: "Choisir cette option pour activer l'administration depuis une adresse IP spécifiée. Pour cela saisir le port WEB d'administration et l'adresse IP d'administration distante dans les champs dédiés."
			},{
				type: "name",
				title: "Port d'administration WEB",
				content: "Saisir le N° du port (entre 1024 et 65535) qui sera utilisé pour accéder à la l'interface WEB d'administration avec une sécurité accrue. Usuellement les navigateurs WEB utilisent le port 80 pour le service HTTP, le port 8080 est une alternative usuelle pour le port HTTP."
			},{
				type: "name",
				title: "Adresse IP d'administration distante",
				content: "Saisir une adresse IP valide autorisée à accéder au routeur."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Messages Système",
			CONTENT: [{
				type: "paragraph",
				content: "La page Messages système affiche une liste des plus récents évènements concernant le routeur. Vous pouvez définir quels types de messages et quel niveau de message vous souhaitez voir. Depuis cette page vous pouvez configurer l'envoi automatique des messages par email ou l'export vers l'ordinateur connecté au routeur."
			},{
				type: "name",
				title: "Type",
				content: "Choisir le type de messages à afficher."
			},{
				type: "name",
				title: "Niveau",
				content: "Choisir le niveau de messages à afficher."
			},{
				type: "name",
				title: "Actualiser",
				content: "Cliquer sur cette icône pour mettre à jour l'affichage."
			},{
				type: "name",
				title: "Tout effacer",
				content: "Cliquer sur cette icône pour effacer tous les messages."
			},{
				type: "name",
				title: "Sauvegarder les messages",
				content: "Cliquer sur ce bouton pour télécharger tous les messages système sur l'ordinateur connecté au routeur."
			},{
				type: "name",
				title: "Paramètres de messagerie",
				content: "Cliquer sur ce bouton pour configurer les paramètres de messagerie afin d'envoyer les messages système par email."
			},{
				type: "step",
				title: "Pour configurer l'envoi des messages par email",
				content: [
					"1. Cliquer sur Paramètres de messagerie.",
					"2. De - Saisir l'adresse email (valide) qui sera utilisée pour envoyer l'email.",
					"3. A - Saisir l'adresse email (valide) à laquelle sera envoyée l'email.",
					"4. Serveur SMTP - Saisir l'adresse du serveur SMTP que le routeur utilisera pour vous envoyer l'email contenant les messages système.",
					{
						content: "5. Activer l'authentification - Choisir ce réglage si le serveur SMTP utilisé requiert une authentification préalable à l'envoi d'emails.",
						children: [{
							type: "name",
							title: "Nom d'utilisateur",
							content: "Saisir le nom d'utilisateur pour le serveur SMTP (attention aux minuscules/majuscules)."
						},{
							type: "name",
							title: "Mot de passe",
							content: "Saisir le Mot de passe pour le serveur SMTP (attention aux minuscules/majuscules)."
						}]
					},{
						content: "6. Activer envoi automatique - Choisir cette option pour définir à quelle heure le système devra envoyer au quotidien l'email contenant les messages systèmes.",
						children: [{
							type: "paragraph",
							content: "Pour faire l'envoi à une heure déterminée, saisir cette heure comme suit HH:MM exemple 16:00 pour un envoi à 4 heures de l'après midi."
						},{
							type: "paragraph",
							content: "Pour envoyer les messages périodiquement, saisir le délai en heures entre chaque envoi."
						}]
					},
					"7. Cliquer sur Sauvegarder."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Statistiques de trafic",
			CONTENT: [{
				type: "paragraph",
				content: "La page de statistiques de trafic affiche les trafic correspondants aux paquets émis et reçus via le WAN le LAN et Le Wi-Fi."
			},{
				type: "name",
				title: "Statistiques de trafic",
				content: "Basculer sur On pour afficher les informations statistiques."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Liste de statistiques de trafic",
			CONTENT: [{
				type: "name",
				title: "Adresse IP/Adresse MAC",
				content: "Affiche les informations (Adresse IP/Adresse MAC) des clients du routeur."
			},{
				type: "name",
				title: "Total de paquets",
				content: "Affiche le nombre total de paquets émis et reçus par le client depuis le début de la session ou depuis la dernière remise à zéro du compteur."
			},{
				type: "name",
				title: "Total d'octets",
				content: "Affiche le nombre total d'octets émis et reçus par l'appareil depuis le début de la session ou depuis la dernière remise à zéro du compteur."
			},{
				type: "name",
				title: "Paquets actuels",
				content: "Affiche le nombre de paquets émis ou reçus à un intervalle de temps spécifique."
			},{
				type: "name",
				title: "Octets actuels",
				content: "Affiche le nombre de paquets émis ou reçus à un intervalle de temps spécifique."
			},{
				type: "name",
				title: "Modifier",  
				content: "Affiche les options pour R.A.Z. (Remettre A Zéro) et Effacer les statistiques correspondantes de la liste."
			},{
				type: "name",
				title: "Actualiser",
				content: "Cliquer pour mettre à jour les informations de statistiques."
			},{
				type: "name",
				title: "Tout R.A.Z",
				content: "Cliquer pour Remettre A Zéro toutes les informations statistiques."
			},{
				type: "name",
				title: "Tout effacer",
				content: "Cliquer pour effacer toutes les informations statistiques."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "Wi-Fi 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Intervalle entre balises",
				content: "Saisir une valeur entre 40 et 1000 ms pour déterminer l'intervalle entre balises qui sont des paquets émis par le routeur pour synchroniser le réseau . La valeur par défaut est 100."
			},{
				type: "name",
				title: "Seuil RTS",
				content: "Saisir une valeur entre 1 et 2346 pour déterminer la taille des paquets de données transmis par le routeur. Par défaut le seuil RTS (Request To Send) est 2346 . Si la taille du paquet est supérieure à la valeur du seuil, le routeur envoi une requête au client destinataire et négocie l'envoi d'une trame de donnée, sinon il envoi le paquet immédiatement."
			},{
				type: "name",
				title: "Intervalle DTIM",
				content: "Cette valeur détermine l'intervalle DTIM (Delivery Traffic Indication Message). Saisir une valeur comprise entre 1 et 15ms. La valeur par défaut est de 1, indiquant que l'intervalle DTIM est identique à l'intervalle entre balises."
			},{
				type: "name",
				title: "Intervalle de génération",
				content: "Entrer le nombre de secondes (30 au minimum) qui s'écoule entre deux renouvellement de clés de chiffrement, la valeur par défaut qui est de 0 désactive le renouvellement."
			},{
				type: "name",
				title: "MIMO Multi-utilisateurs",
				content: "Cette technologie permet au routeur d'établir une connexion point à point avec trois appareils maximum simultanément. Cela améliore considérablement les débits et réduit les temps d'attente comparativement aux architectures traditionnelles, permettant ainsi au routeur de servir simultanément plus de clients en minimisant les goulots d'étranglement affectants le débit."
			},{
				type: "name",
				title: "Fonction WMM",
				content: "La fonction WMM garanti que les paquets à priorité élevée seront transmis préférentiellement. Il est fortement conseillé de conserver le réglage par défaut qui active cette fonction."
			},{
				type: "name",
				title: "Fonction GI court",
				content: "Cette fonction active par défaut (nous vous recommandons de ne pas la désactiver) permet d'augmenter le débit en utilisant un intervalle de garde (GI) court."
			},{
				type: "name",
				title: "Fonction Isolement",
				content: "Si vous souhaitez confiner et restreindre tous les appareils connectés en Wi-Fi à votre réseau de façon a ce qu'ils ne puissent communiquer entre eux tout en ayant accès à internet, Cocher la case activer l'isolement."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "WDS 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Activer pontage WDS",
				content: "Activer le pontage WDS (Wireless Distribution System) permet au routeur d'établir un pont Wi-Fi avec un autre point d'accès. Si cette fonction est activée, configurer les paramètres ci-après :",
			},{
				type: "name",
				title: "SSID (distant)",
				content: "Saisir le SSID du point d'accès Wi-Fi auquel le routeur va se connecter tel un client ou utiliser la fonction Détection pour trouver tous les réseaux alentour joignables."
			},{
				type: "name",
				title: "Détecter",
				content: "Cliquer sur ce bouton pour rechercher et afficher les SSID/BSSID/force de signal/Canal/Type de chiffrement de tous les réseaux Wi-Fi à portée du routeur. Une fois le réseau sélectionner les SSID, Adresse MAC et type de chiffrement sont reproduits dans les champs dédiés."
			},{
				type: "name",
				title: "Adresse MAC (distante)",
				content: "Saisir l'adresse MAC (BSSID) sous la forme xx-xx-xx-xx-xx-xx (x pouvant être 0 à 9 et a à f ou A à F) du point d'accès Wi-Fi auquel le routeur va se connecter en temps que client. Si vous choisissez le PA via la fonction Détection, le champ BSSID sera complété automatiquement."
			},{
				type: "name",
				title: "Mode WDS",
				content: "Choisir le mode Auto, WDS1 ou WDS2."
			},{
				type: "name",
				title: "Sécurité",
				content: "Choisir le type de sécurité adapté (celui du point d'accès auquel le routeur se connecte) parmi : Aucune, WPA-PSK/WPA2-PSK ou WEP. Si vous utilisez la fonction Recherche ce champ est automatiquement renseigné.",
				children: [{
					type: "name",
					title: "Mot de passe",
					content: "Cette option est disponible avec les chiffrements WPA-PSK/WPA2-PSK et WEP. Saisir le Mot de passe du réseau Wi-Fi auquel le routeur se connecte."
				},{
					type: "name",
					title: "Type auth.",
					content: "Cette option n'est disponible qu'avec le chiffrement WEP (Wireless Equivalent Privacy). Choisir le type d'authentification adéquat (Auto, Système ouvert ou clé partagée) selon le réglage du point d'accès auquel le routeur se connecte."
				},{
					type: "name",
					title: "Format de clé WEP",
					content: "Cette option n'est disponible qu'avec le chiffrement WEP, Choisir le format de clé (ASCII ou Hexadécimal) en fonction de celui employé sur le point d'accès."
				}]
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Cocher la case Activer WPS et cliquer sur Sauvegarder pour activer la fonction WPS (Wi-Fi Protected Setup) qui vous permet de paramétrer et de vous connecter aisément aux appareils supportant cette fonction en appuyant sur un bouton dédié."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Cocher la case Activer NAT et cliquer sur Sauvegarder pour activer la fonction NAT (Network Address Translation)."
			},{
				type: "note",
				title: "Remarque",
				content: "Quand le NAT est désactivé, les configurations relatives aux translations NAT sont inactives."
			}/*,{
				type: "name",
				title: "Boost NAT",
				content: "Cocher la case Activer Boost NAT et cliquer sur Sauvegarder pour faire en sorte que le routeur dispose du meilleur taux de transfert."
			},{
				type: "note",
				title: "Remarque",
				content: "Remarque: Quand le Boost NAT est actif, la QoS et les statistiques de trafic sont désactivés automatiquement."
			}*/,{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Paramètres de niveau de protection DoS",
			CONTENT: [{
				type: "paragraph",
				content: "La protection contre les DoS (dénis de service) protège le routeur contre les attaques ICMP-FLOOD, UDP-FLOOD, TCP-FLOOD."
			},{
				type: "name",
				title: "Seuil Paquets ICMP-FLOOD",
				content: "Saisir une valeur comprise entre 5 et 7200 pour déclencher la protection ICMP-FLOOD immédiatement quand le nombre de paquets excède le seuil défini."
			},{
				type: "name",
				title: "Seuil Paquets UDP-FLOOD",
				content: "Saisir une valeur comprise entre 5 et 7200 pour déclencher la protection UDP-FLOOD immédiatement quand le nombre de paquets excède le seuil défini."
			},{
				type: "name",
				title: "Seuil TCP-SYN-FLOOD",
				content: "Saisir une valeur comprise entre 5 et 7200 pour déclencher la protection TCP-SYN-FLOOD immédiatement quand le nombre de paquets excède le seuil défini."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Duplex",
			CONTENT: [{
				type: "name",
				title: "Duplex",
				content: "Choisir le type duplex depuis la liste déroulante."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "DEL",
			CONTENT: [{
				type: "name",
				title: "Sélectionner le mode nuit",
				content: "Cocher cette case pour éteindre les DELs pendant l'activation du mode nuit sans que cela n'affecte les performances du routeur."
			},{
				type: "name",
				title: "Etendue du mode nuit",
				content: "Spécifier une étendue horaire pendant laquelle le mode nuit s'applique."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer vos paramètres."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Avec OpenVPN, vous pouvez utiliser internet pour accéder en sécurité à votre routeur quand vous êtes hors de votre domicile. Pour utiliser le service VPN, vous devez configurer un service de DNS Dynamique (recommandé) ou attribuer une adresse IP Statique au port WAN de votre routeur. Vos paramètres horaires doivent être synchronisés avec internet."
			},{
				type: "name",
				title: "Activer le serveur VPN",
				content: "Sélectionner pour activer le serveur OpenVPN."
			},{
				type: "name",
				title: "Type de service",
				content: "Sélectionner le protocole de communication pour le serveur OpenVPN : UDP ou TCP."
			},{
				type: "name",
				title: "Port de service",
				content: "Saisir un numéro de port de communication compris entre 1024 et 65535. Le port par défaut commun est 1194."
			},{
 				type: "name",
				title: "Sous-réseau/Masque de sous-réseau VPN",
				content: "Saisir la plage d'adresses IP qui peuvent être attribuées aux clients par le serveur OpenVPN."
			},{
				type: "name",
				title: "Accès Client",
				content: "Choisir le type d'accès des clients OpenVPN.",
				children: [{
				type: "name",
				title: "Réseau domestique uniquement",
					content: "Les clients n'auront accès qu'au réseau domestique. La route par défaut ne sera pas modifiée."
			},{
				type: "name",
				title: "Réseau domestique et internet",
					content: "Les clients peuvent se voir restreindre l'accès au réseau domestique, aux sites internet et services en fonction de limitations géographiques quand vous êtes hors de votre pays. La route par défaut des clients sera altérée."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Certificat",
			CONTENT: [{
				type: "paragraph",
				content: "Utiliser le certificat pour les informations et l'identité de la connexion VPN des clients distants."
			},{
				type: "name",
				title: "Générer",
				content: "Cliquer pour générer un nouveau certificat."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Fichier de configuration",
			CONTENT: [{
				type: "paragraph",
				content: "Les clients distants vont utiliser le fichier de configuration pour accéder à votre routeur."
			},{
				type: "name",
				title: "Exporter",
				content: "Cliquer pour sauvegarder le fichier de configuration OpenVPN."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "Guide d'installation du client VPN",
			CONTENT: [{
				type: "step",
				title: "Pour connecter votre appareil client au serveur VPN OpenVPN :",
				content:[{
					type: "paragraph",
					content: "Avant de configurer le serveur OpenVPN, merci de configurer le service de DNS Dynamique (recommandé) ou assigner une adresse IP Statique au port WAN. Assurez vous en plus que les paramètres de port externe du NAT ne sont pas le port de service, et que votre heure système est synchronisée par internet."
				},
					"1) Cocher activer le serveur VPN.",
					"2. Configurer les paramètres du serveur OpenVPN (Type de service, Accès client et Masque de sous-réseau/Sous réseau VPN) puis cliquer sur Sauvegarder.",
					"3. Cliquer sur Exporter pour sauvegarder une copie du fichier de configuration.",
					"4. Sur votre ordinateur client, téléchargez et installez le client OpenVPN depuis <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br>. Les plateformes officiellement supportées sont : Windows, MAC OS X et Linux.",
					"5. Lancez le client OpenVPN et ajoutez une connexion VPN utilisant le fichier de configuration sauvegardé pour connecter votre client au serveur VPN."
				]},{
					type: "note",
					title: "Remarque",
					content: "Pour en savoir plus à propos du client OpenVPN, consultez <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "paragraph",
				content: "Avec un VPN PPTP, vous pouvez utiliser internet pour accéder en sécurité à votre routeur quand vous êtes hors de votre domicile. C'est parfois impossible avec certains FAI. Pour utiliser le service VPN, vous devez configurer un service de DNS Dynamique (recommandé) ou attribuer une adresse IP Statique au port WAN de votre routeur. Vos paramètres horaires doivent être synchronisés avec internet."
			},{
				type: "name",
				title: "Activer serveur VPN",
				content: "Sélectionner pour activer le serveur VPN PPTP."
			},{
				type: "name",
				title: "Adresse IP clients",
				content: "Saisir l'étendue des adresses IP qui seront attribuées aux clients (10 clients max.) par le serveur VPN PPTP."
			},{
 				type: "name",
				title: "Permettre l'accès SAMBA (emplacement réseau)",
				content: "Sélectionner pour autoriser les clients VPN à accéder à votre serveur SAMBA local."
			},{
				type: "name",
				title: "Permettre la traversée NetBIOS",
				content: "Sélectionner pour autoriser les clients VPN à accéder à votre serveur SAMBA via son nom NETBIOS."
			},{
				type: "name",
				title: "Permettre les connexions non chiffrées",
				content: "Sélectionner pour autoriser des connexions non chiffrées vers votre serveur VPN."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Liste de comptes",
			CONTENT: [{
				type: "paragraph",
				content: "Cette liste affiche les comptes qui peuvent être utilisés pour connecter les clients distants au serveur VPN PPTP."
			},{
				type: "step",
				title: "Pour ajouter un compte VPN PPTP",
				content: [
					"1. Cliquer sur ajouter.",
					"2. Saisir le nom d'utilisateur et le mot de passe d'authentification des clients sur le serveur VPN PPTP.",
					"3. Cliquer sur OK."
				]
			},/*{
				type: "name",
				title: "Nom et Mot de passe",
				content: "Saisir le Nom et le Mot de passe client requis pour l'authentification au serveur VPN PPTP."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour Modifier ou Supprimer le compte correspondant."
			}*/
			{
				type: "step",
				title: "Pour modifier ou supprimer un compte existant",
				content: "Dans la liste, cliquez sur l'icône Editer ou l'icône Poubelle en regard du compte que vous souhaitez Editer ou Supprimer."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "Guide d'installation du client VPN",
			CONTENT: [{
				type: "step",
				title: "Pour connecter votre appareil client au serveur VPN PPTP :",
				content:[{
					type: "paragraph",
					content: "Avant de configurer le serveur VPN PPTP, merci de configurer le service de DNS Dynamique (recommandé) ou assigner une adresse IP Statique au port WAN. Assurez vous en plus que les paramètres de port externe du NAT ne sont pas le port de service, et que votre heure système est synchronisée par internet."
				},
					"1) Cocher activer le serveur VPN.",
					"2. Configurer les paramètres du serveur VPN PPTP et cliquer sur Sauvegarder.",
					"3. Sur votre appareil client, créer une connexion VPN PPTP. Les plateformes officiellement supportées sont : Windows, Mac OSX, Linux, iOS, et Android.",
					"4. Lancer le programme VPN PPTP, ajouter une connexion et saisir le nom de domaine du service DDNS sur lequel est enregistrée l'adresse IP statique assignée au WAN, pour connecter votre appareil client au serveur VPN PPTP.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "Connexions VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Cette page affiche les clients connectés aux serveurs VPN OpenVPN et PPTP hébergés sur le routeur."
			},{
				type: "paragraph",
				content: "Cliquer sur l'icône moins pour déconnecter le client correspondant."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Etat internet",
				content: "Affiche l'état de la connexion internet du routeur."
			},{
				type: "name",
				title: "Type de connexion",
				content: "Affiche le type de connexion à internet."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Affiche l'adresse IP internet (WAN) attribuée au routeur."
			},{
				type: "name",
				title: "Connexion secondaire/Adresse IP",
				content: "Affiche le type de la connexion secondaire ainsi que l'adresse IP."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Routeur",
			CONTENT: [{
				type: "title",
				title: "Wi-Fi 2.4GHz/5GHz"
			},{
				type: "name",
				title: "SSID",
				content: "Affiche le nom du réseau Wi-Fi de la gamme de fréquences 2.4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Affiche le canal diffusé par le réseau Wi-Fi 2.4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "MAC",
				content: "Affiche l'adresse MAC du réseau 2.4GHz/5GHz/60GHz."
			},{
				type: "title",
				title: "Réseau invités 2.4GHz/5GHz"
			},{
				type: "name",
				title: "Etat",
				content: "Affiche si les réseaux invités 2.4GHz/5GHZsont actifs (ON) ou inactifs (OFF)."
			},{
				type: "name",
				title: "SSID",
				content: "Affiche le nom du réseau Wi-Fi pour les fréquences 2.4GHz/5GHz."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Clients filaires/Wi-Fi",
			CONTENT: [{
				type: "name",
				title: "Nom",
				content: "Affiche le nom des clients connectés au routeur."
			},{
				type: "name",
				title: "Adresse IP",
				content: "Affiche l'adresse IP du client connecté."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Affiche l'adresse MAC du client connecté."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Imprimante",
			CONTENT: [{
				type: "name",
				title: "Nom",
				content: "Affiche le nom de l'imprimante connectée au routeur via un port USB."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "Disque USB",
			CONTENT: [{
				type: "name",
				title: "Disque USB",
				content: "Affiche le nom du disque USB connecté au routeur."
			},{
				type: "name",
				title: "Capacité",
				content: "Affiche la capacité totale du disque USB connecté."
			},{
				type: "name",
				title: "Disponible",
				content: "Affiche la capacité disponible du disque USB connecté."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Détection Automatique",
				content: "Cliquer sur ce bouton pour que le routeur détecte le type de connexion internet."
			},{
				type: "note",
				title: "Remarque",
				content: "Remarque : Si vous n'êtes pas sûr du type de votre connexion internet, utilisez la détection automatique ou contactez votre FAI pour solliciter son assistance."
			},{
				type: "title",
				title: "Type de Connexion internet : IP Statique",
			},{
				type: "name",
				title: "Adresse IP/Masque de sous réseau/Passerelle par défaut/DNS Primaire/DNS Secondaire",
				content: "Saisir les informations fournies par votre FAI."
			},{
				type: "title",
				title: "Type de Connexion internet : IP Dynamique",
			},{
				type: "name",
				title: "Ne pas cloner l'adresse MAC/Cloner l'adresse MAC de l'ordinateur",
				content: "Choisir si vous devez cloner ou non l'adresse MAC de votre ordinateur selon ce que préconise votre FAI."
			},{
				type: "title",
				title: "Type de Connexion internet : PPPoE",
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les nom d'utilisateur et Mot de passe communiqués par votre FAI. Attention à bien respecter minuscules/majuscules."
			},{
				type: "title",
				title: "Type de Connexion internet : L2TP/PPTP",
			},{
				type: "name",
				title: "Nom d'utilisateur/Mot de passe",
				content: "Saisir les nom d'utilisateur et Mot de passe communiqués par votre FAI. Attention à bien respecter minuscules/majuscules."
			},{
				type: "name",
				title: "Connexion secondaire (IP Dynamique ou IP Statique)",
				children: [{
					type: "name",
					title: "IP Dynamique",
					content: "Choisir cette option si l'adresse IP et le masque de sous réseau sont attribués par votre FAI."
				},{
					type: "name",
					title: "IP Statique",
					content: "Choisir cette option si l'adresse IP, le masque de sous réseau, la passerelle et les DNS sont indiqués par votre FAI, saisir les informations qu'il vous à communiqué dans les champs dédiés."
				}]
			},{
				type: "name",
				title: "Adresse IP du serveur VPN/Nom de domaine",
				content: "Saisir l'adresse IP ou le nom de domaine que votre FAI vous a communiqué."
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "Paramètres Wi-Fi",
			CONTENT: [{
				type: "name",
				title: "Activer l'émetteur Wi-Fi",
				content: "Cocher cette case pour activer l'émission du signal Wi-Fi 2.4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Nom du réseau Wi-Fi (SSID)",
				content: "Utiliser le nom de réseau (SSID) par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case si vous souhaitez rendre le nom du réseau (SSID) 2.4GHz/5GHz/60GHz invisible lors d'une recherche des réseaux disponibles."
			},{
				type: "name",
				title: "Mot de passe",
				content: "Saisir dans ce champ, un mot de passe Wi-Fi conforme au type de sécurité choisir (minuscules et majuscules sont différenciées)."
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Disques USB",
			CONTENT: [{
				type: "paragraph",
				content: "Cet écran affiche les information relatives à chaque disque USB connecté."
			},{
				type: "name",
				title: "Rechercher",
				content: "Usuellement, le routeur détecte automatiquement tout disque USB qui vient d'être connecté. Si ce n'est pas le cas cliquer sur ce bouton afin de détecter les nouveaux disque USB ou mettre à jour les informations de ceux déjà connectés."
			},{
				type: "name",
				title: "Volume",
				content: "Affiche le nom des disques USB."
			},{
				type: "name",
				title: "Capacité",
				content: "Affiche la capacité totale de chaque disque USB."
			},{
				type: "name",
				title: "Espace libre",
				content: "Affiche l'espace de stockage libre sur le disque USB."
			},{
				type: "name",
				title: "Déconnexion sécurisée",
				content: "Cliquer sur ce bouton pour déconnecter électroniquement le disque USB avant de pouvoir le déconnecter physiquement du routeur.",
				children: [{
					type: "paragraph",
					content: "Merci de retenir que le bouton déconnexion sécurisée n'apparait que lorsque un dispositif de stockage USB est connecté au routeur. Gardez en mémoire que vous ne pouvez déconnecter électroniquement un disque USB s'il est en cours d'utilisation."
				}]
			},{
				type: "name",
				title: "Partager",
				content: "Cette case à cocher n'apparait qu'en présence d'un dispositif de stockage USB connecté au routeur, cocher la case pour autoriser le partage réseau de la ressource concernée."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Paramètres de partage",
			CONTENT: [{
				type: "name",
				title: "Nom du serveur de médias/réseau",
				content: "Affiche le nom utilisé pour accéder au disque USB connecté. Le nom doit comporter 4 à 15 caractères alphanumériques et peut contenir des  tirets \"-\" et des sous-tirets \"_\". "
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Partage de dossier",
			CONTENT: [{
				type: "name",
				title: "Partager tout",
				content: "Sélectionner pour partager tous les dossiers et fichiers sinon laisser Partager tout sur Off afin que seuls les dossiers sélectionnés soient partagés."
			},{
				type: "name",
				title: "Activer authentification",
				content: "Il est fortement recommandé d'activer l'authentification pour imposer l'usage d'un nom d'utilisateur et d'un Mot de passe pour tout accès aux dossiers partagés.(Le nom d’utilisateur et le mot de passe par défaut sont identiques : admin)"
			},{
				type: "name",
				title: "Nom de dossier",
				content: "Affiche le nom du dossier partagé."
			},{
				type: "name",
				title: "Chemin d’accès",
				content: "Affiche le chemin d'accès au dossier partagé."
			},{
				type: "name",
				title: "Serveur de médias",
				content: "Indique si le contenu du dossier est accessible depuis un lecteur de médias (lecteur Windows média…)."
			},{
				type: "name",
				title: "Nom de volume",
				content: "Affiche le nom du disque USB ou la mention volumnx si ce nom n’est pas défini."
			},{
				type: "name",
				title: "Partage réseau",
				content: "Indique si le partage réseau est actif pour le dossier concerné par une icône, et quand il est inactif par l’icône."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour modifier ou supprimer le dossier partagé sélectionné."
			},{
				type: "name",
				title: "Ajouter",
				content: "Cliquer sur ce bouton pour ajouter un partage."
			},{
				type: "name",
				title: "Supprimer",
				content: "Cliquer sur ce bouton pour supprimer un partage."
			},{
				type: "name",
				title: "Naviguer",
				content: "Cliquer pour rechercher un répertoire partager."
			},{
				type: "name",
				title: "Permettre l'accès au réseau invités",
				content: "Cocher la case pour autoriser les clients du réseau invités à accéder aux dossiers partagés."
			},{
				type: "name",
				title: "Activer authentification",
				content: "Cocher la case pour activer l'authentification et autoriser l'accès aux dossiers partagés aux seuls utilisateurs correctement authentifiés. Le nom d’utilisateur et lemot de passe requis sont par défaut ceux du routeur (admin/admin)."
			},{
				type: "name",
				title: "Autoriser l'écriture",
				content: "Cocher la case pour donner l'autorisation aux clients de modifier le contenu du dossier."
			},{
				type: "name",
				title: "Autoriser le partage de médias",
				content: "Cocher la case pour activer le serveur de médias."
			},{
				type: "name",
				title:"Actualiser",
				content: "Cliquer pour mettre à jour la liste des répertoires partagés."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Serveur d'impression",
			CONTENT: [{
				type: "name",
				title: "Serveur d'impression",
				content: "Basculer sur On pour activer le serveur d'impression."
			},{
				type: "name",
				title: "Nom de l'imprimante",
				content: "Affiche le nom de l'imprimante connectée au routeur."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "contrôle parental",
			CONTENT: [{
				type: "paragraph",
				content: "Avec le contrôle parental, vous pouvez bloquer à certaines heures de la journée, certains sites WEB afin d'en interdire l'accès aux utilisateurs du réseau (par exemple les sites de réseaux sociaux à l'heure des devoirs) et en même temps protéger tous les clients réseaux des dangers d'internet depuis un point de contrôle central."
			},{
				type: "name",
				title: "contrôle parental",
				content: "Basculer sur On pour activer le contrôle parental. Par défaut la fonction est inactive."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Appareils soumis au contrôle parental",
			CONTENT: [{
				type: "paragraph",
				content: "Affiche la liste des appareils soumis au contrôle parental."
			},{
				type: "name",
				title: "Nom d'appareil",
				content: "Affiche le nom de tous les clients connectés soumis au contrôle parental."
			},{
				type: "name",
				title: "Adresse MAC",
				content: "Affiche l'adresse MAC de tous les clients soumis au contrôle parental."
			},{
				type: "name",
				title: "Horaires d'accès à internet",
				content: "Affiche les périodes de restriction d'accès à internet. La planification est basée sur l'heure système du routeur qui peut être définie dans 'Outils système - > Paramètres horaires'."
			},{
				type: "name",
				title: "Description",
				content: "Affiche une brève description des appareils connectés. C'est un paramètre optionnel."
			},{
				type: "name",
				title: "Etat",
				content: "Affiche l'état actuel (actif/inactif) du contrôle parental pour l'appareil considéré."
			},{
				type: "name",
				title: "Modifier",
				content: "Affiche les options pour modifier ou supprimer l'appareil concerné."
			},{
				type: "step",
				title: "Pour limiter l'accès d'un nouveau client",
				content:[
					"1. Cliquer sur ajouter.",
					"2. Cliquer sur visualiser les appareils connectés et choisir un appareil connecté dans la liste des appareils ou saisir le nom d'appareil et l'adresse MAC manuellement pour ajouter un appareil qui n'est pas connecté.",
					"3. Cliquer sur l'icône horaires d'accès à internet pour définir les horaires auxquels l’accès au réseau est autorisé/interdit.",
					"4. Saisir une brève description dans le champ dédié, (Optionnel)",
					"5. Sélectionner Activer.",
					"6. Cliquer sur OK pour enregistrer ce réglage."
				]
			},{
				type: "paragraph",
				content: "Pour modifier ou effacer une entrée du contrôle parental, cliquez sur l'icône Editer pour modifier les informations ou sur l'icône Poubelle pour supprimer l'entrée."
			},{
				type: "paragraph",
				content: "Pour supprimer de multiples éléments, sélectionner tous les éléments concernés et cliquer sur le bouton Supprimer au dessus de la liste."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Restriction de contenu",
			CONTENT: [{
				type: "name",
				title: "Liste noire",
				content: "Contient des mots qui seront utilisés pour bloquer tout accès aux clients spécifiés dans la liste de restrictions du contrôle parental.",
				children: [{
					type: "paragraph",
					content: "Cliquer sur Ajouter un nouveau mot pour enrichir la liste noire. Pour supprimer un mot cliquer sur l'icône (-) du mot que vous souhaitez supprimer."
				}]
			},{
				type: "name",
				title: "Liste Blanche",
				content: "Contient des adresses de sites WEB dont l'accès est autorisé aux clients spécifiés dans la liste de contrôle parental.",
				children: [{
					type: "paragraph",
					content: "Cliquer sur Ajouter un nouveau nom de de domaine pour enrichir la liste blanche. Pour supprimer un nom de domaine cliquer sur l'icône (-) du site que vous souhaitez supprimer."
				}]
			},{
				type: "note",
				title: "Remarque",
				content: "Les mots clés peuvent être des noms de domaine, par exemple : mail.google.com ou www.facebook.com."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer votre configuration."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Réseau invités",
			CONTENT: [{
				type: "paragraph",
				content: "Le réseau invités vous permet de paramétrer un réseau dédié disposant de son propre nom (SSID) et de son propre Mot de passe pour partager en Wi-Fi votre accès internet avec vos invités."
			},{
				type: "name",
				title: "Permettre aux invités de se voir",
				content: "Cocher cette case pour permettre à tous les clients du réseau invité de se voir mutuellement."
			},{
				type: "name",
				title: "Permettre aux invités d'accéder à mon réseau local",
				content: "Cocher cette case pour permettre aux invités connectés au réseau invités d'accéder aux partages et aux imprimantes réseaux."
			},{
				type: "name",
				title: "Activer le réseau invités",
				content: "Cocher cette case pour activer le réseau invités."
			},{
				type: "name",
				title: "Nom du réseau Wi-Fi (SSID)",
				content: "Utiliser le nom de réseau (SSID) invité par défaut ou en saisir un autre (32 caractères maximum comportant minuscules et majuscules)."
			},{
				type: "name",
				title: "Masquer le SSID",
				content: "Cocher cette case si vous décidez que le nom du réseau invités ne doit pas apparaitre dans la liste des réseaux disponibles."
			},{
				type: "name",
				title: "Mot de passe",
				content: "Créer un mot de passe comportant 8 à 63 caractères ASCII ou 8 à 64 caractères hexadécimaux (0-9, a-f, A-F) pour sécuriser le réseau invité."
			},{
				type:"paragraph",
				content:"Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			}]
		}

	};
})(jQuery);
