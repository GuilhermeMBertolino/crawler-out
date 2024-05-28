(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Contrôle de la bande passante",
            CONTENT: [{
                    type: "paragraph",
                    content: "Le contrôle de la bande passante vous permet de configurer la bande passante montante et la bande passante descendante du réseau, et le débit cumulé ne doit pas dépasser 1000000 kbits/s. Pour un contrôle optimal de la bande passante, sélectionnez le type de ligne correct et consultez votre fournisseur de services Internet sur la bande passante totale autorisée en amont et en aval."
                }, {
                    type: "name",
                    title: "Activer",
                    content: "Cochez la case pour activer la fonction de contrôle de la bande passante."
                }, {
                    type: "name",
                    title: "Bande passante montante totale ",
                    content: "Sélectionnez la vitesse totale de téléversement à travers le port WAN."
                }, {
                    type: "name",
                    title: "Bande passante descendante totale",
                    content: "Sélectionnez la vitesse totale de téléchargement à travers le port WAN."
                }, {
                    type: "title",
                    content: "Règles de contrôle"
                }, {
                    type: "name",
                    title: "Description",
                    content: "Affiche la plage d’adresses IP et de ports contrôlés."
                }, {
                    type: "name",
                    title: "Priorité",
                    content: "Affiche le niveau de priorité de la règle, 1 étant le plus haut niveau de priorité et 8 étant le plus bas. La bande passante totale en téléversement et en téléchargement sera allouée pour garantir le taux min. de toutes les règles de contrôle de la bande passante."
                }, {
                    type: "name",
                    title: "Montante (min./max.) ",
                    content: "Affiche la bande passante de téléversement minimale et maximale en kbits/s."
                }, {
                    type: "name",
                    title: "Descendante (min./max.) ",
                    content: "Affiche la bande passante de téléchargement minimale et maximale en kbits/s."
                }, {
                    type: "name",
                    title: "Activer",
                    content: "Indique le statut actuel d’une règle. Cliquez sur l’icône de l’ampoule pour activer ou désactiver la règle."
                }, {
                    type: "name",
                    title: "Modifier",
                    content: "Affiche les options de modifier ou de supprimer la règle correspondante."
                }, {
                    type: "note",
                    title: "Pour ajouter une nouvelle règle",
                    content: [
                        "Cliquez sur ajouter.",
                        "Entrez une plage d’adresses IP à contrôler.",
                        "Entrez une plage de numéros de ports à contrôler.",
                        "Sélectionnez le type de protocole pour cette règle.",
                        "Sélectionnez un niveau de priorité pour cette règle. (1 est le niveau de priorité le plus élevé.)",
                        "Entrez la bande passante de téléversement minimale et maximale (en kbits/s) à travers le port WAN.",
                        "Entrez la bande passante de téléchargement minimale et maximale (en kbits/s) à travers le port WAN.",
                        "Sélectionnez d’activer cette entrée.",
                        "Cliquez sur OK."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Pour supprimer plusieurs règles</strong><br>Dans la liste des règles de contrôle, cochez les cases correspondant aux règles à supprimer et cliquez sur Supprimer, et cliquez sur Supprimer au-dessus du tableau."
                }
            ]
        },
        accessControl: {
            TITLE: "Contrôle d’accès",
            CONTENT: [{
                type: "paragraph",
                content: "Le contrôle d’accès s’utilise pour autoriser ou pour bloquer l’accès à votre réseau d’ordinateurs ou d’autres dispositifs spécifiques. Quant un dispositif est bloqué, il peut obtenir du routeur une adresse IP, mais ne peut pas communiquer avec d’autres dispositifs ni se connecter à Internet. "
            }, {
                type: "paragraph",
                content: "<strong>Remarque :</strong>Pour utiliser le contrôle d’accès, activez cette fonction et accomplissez les étapes décrites dans le guide de l’application. Si le contrôle d’accès est désactivé (sur OFF), tous les dispositifs peuvent accéder à votre réseau, y compris ceux qui sont sur la liste noire."
            }, {
                type: "name",
                title: "Contrôle d’accès",
                content: "Basculez sur ON pour activer la fonction de contrôle d’accès."
            }, {
                type: "title",
                content: "Mode d’accès"
            }, {
                type: "name",
                title: "Liste noire",
                content: "Sélectionnez de bloquer l’accès depuis les dispositifs de la liste ci-dessous."
            }, {
                type: "name",
                title: "Liste blanche",
                content: "Sélectionnez de n’autoriser l’accès que depuis les dispositifs de la liste ci-dessous."
            }, {
                type: "title",
                content: "Dispositifs de la liste noire/blanche"
            }, {
                type: "note",
                title: "<strong>Pour mettre un dispositif sur la liste blanche ou sur la liste noire</strong>",
                content: [
                    "Cliquez sur l’icône Ajouter.",
                    "Saisissez le nom du dispositif.",
                    "Saisissez l’adresse MAC du dispositif.",
                    "Cliquez sur OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Pour modifier ou supprimer un dispositif de la liste noire/blanche</strong><br>Dans le tableau de la liste noire/blanche, cliquez sur l’icône Modifier ou sur l’icône de la poubelle correspondant au dispositif que vous voulez modifier ou supprimer."
            }, {
                type: "paragraph",
                content: "<strong>Pour supprimer plusieurs dispositifs de la liste noire/blanche</strong><br>Dans le tableau de la liste noire/blanche, sélectionnez tous les dispositifs que vous voulez supprimer, et cliquez sur supprimer au-dessus du tableau."
            }, {
                type: "title",
                content: "Dispositifs en ligne"
            }, {
                type: "name",
                title: "Nom du dispositif",
                content: "Affiche le nom du dispositif connecté."
            }, {
                type: "name",
                title: "Adresse IP",
                content: "Affiche l’adresse IP du dispositif connecté."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC du dispositif connecté."
            }, {
                type: "name",
                title: "Type de connexion",
                content: "Affiche le type de connexion du dispositif connecté, avec ou Wi-Fi. "
            }, {
                type: "paragraph",
                content: "<strong>Pour bloquer un ou plusieurs dispositifs</strong><br>Dans le tableau Dispositifs en ligne, sélectionnez les dispositifs que vous voulez bloquer, puis cliquez sur Bloquer au-dessus du tableau. Les dispositifs sélectionnés s’ajouteront automatiquement à ceux de la liste noire."
            }]
        },
        arpBind: {
            TITLE: "Paramètres",
            CONTENT: [{
                type: "paragraph",
                content: "La association IP et MAC (également appelée « liaison ARP) est utile pour contrôler l’accès d’un ordinateur spécifique sur le LAN en reliant ensemble les adresses IP et MAC. La association IP et MAC évite aussi que d’autres dispositifs n’utilisent une adresse IP spécifique."
            }, {
                type: "name",
                title: "Association IP et MAC",
                content: "Basculez sur ON (activer) pour activer la fonction de association IP et MAC."
            }, {
                type: "title",
                title: "Liste d'associations"
            }, {
                type: "note",
                title: "<strong>Pour configurer un dispositif avec liaison ARP</strong>",
                content: [
                    "Cliquez sur ajouter.",
                    "Saisissez l’adresse MAC du dispositif.",
                    "Saisissez une adresse IP que vous souhaitez lier à l’adresse MAC ci-dessus.",
                    "Sélectionnez Activer.",
                    "Cliquez sur OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Pour modifier ou supprimer une entrée</strong><br>Dans la liste des liaisons, cliquez sur l’icône Modifier ou sur l’icône de la poubelle correspondant à l’entrée que vous voulez modifier ou supprimer."
            }, {
                type: "paragraph",
                content: "<strong>Pour supprimer plusieurs entrées</strong><br>Dans la liste des liaisons, sélectionnez les entrées que vous voulez supprimer, puis cliquez sur Supprimer au-dessus du tableau."
            }, {
                type: "title",
                title: "Liste ARP"
            }, {
                type: "paragraph",
                content: "Affiche les adresses MAC et IP des dispositifs actuellement connectés."
            }, {
                type: "name",
                title: "Nom du dispositif",
                content: "Affiche le nom du dispositif connecté."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC du dispositif connecté."
            }, {
                type: "name",
                title: "Adresse IP",
                content: "Affiche l’adresse IP affectée au dispositif connecté."
            }, {
                type: "name",
                title: "Lier",
                content: "Indique si les adresses MAC et IP sont liées ou pas."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour supprimer de la liste l’entrée correspondante."
            }, {
                type: "paragraph",
                content: "<strong>Remarque : </strong>Une même adresse IP ne peut pas être liée à plus d’une adresse MAC."
            }, {
                type: "paragraph",
                content: "<strong>Pour lier plusieurs dispositifs</strong><br>Dans la liste des ARP, sélectionnez les dispositifs dont vous voulez lier les adresses IP aux adresses MAC, puis cliquez sur Lier au-dessus du tableau."
            }]
        },
        alg: {
            TITLE: "Passerelle de couche applicative (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "La fonction ALG permet de brancher les filtres de traversée personnalisés de la traduction d'adresses réseau (NAT) sur la passerelle, pour que soit prise en charge la traduction de l’adresse et du port de certains protocoles « contrôle/données » de couche application : FTP, TFTP, H323 etc. Il est recommandé d’activer la fonction ALG."
            }, {
                type: "name",
                title: "Transfert direct PPTP (passtrough)",
                content: "Cochez la case pour activer la fonction de transfert direct PPTP, afin que les sessions point-à-point puissent être connectées par tunnel à travers un réseau IP et transférées directement à travers le routeur."
            }, {
                type: "name",
                title: "Transfert direct L2TP (passtrough) ",
                content: "Cochez la case pour activer la fonction de transfert direct L2TP, afin que les sessions point-à-point de la couche 2 puissent être connectées par tunnel à travers un réseau IP et transférées directement à travers le routeur."
            }, {
                type: "name",
                title: "Transfert direct IPSec (passtrough) ",
                content: "Cochez la case pour activer la fonction de transfert direct IPsec, afin que la sécurité du protocole Internet (IPsec) puisse être connectée par tunnel à travers un réseau IP et transférée directement à travers le routeur. IPSec utilise des services de chiffrement de sécurité pour assurer la confidentialité et la sécurité des communications sur les réseaux IP."
            }, {
                type: "name",
                title: "ALG du FTP",
                content: "Cochez la case pour activer la fonction FTP ALG, afin de permettre aux clients et aux serveurs FTP (protocole de transfert de fichiers) de transférer des données à travers la NAT."
            }, {
                type: "name",
                title: "ALG du TFTP",
                content: "Cochez la case pour activer la fonction TFTP ALG, afin de permettre aux clients et aux serveurs TFTP (Trivial File Transfer Protocol) de transférer des données à travers la NAT."
            }, {
                type: "name",
                title: "ALG du RTSP",
                content: "Si cette fonction est sélectionnée, elle permet aux clients Media Player de communiquer avec les serveurs de médias de diffusion en direct, à travers la NAT."
            }, {
                type: "name",
                title: "ALG du H323",
                content: "Cochez la case pour activer la fonction H323 ALG, pour permettre aux clients Microsoft NetMeeting de communiquer à travers la NAT."
            }, {
                type: "name",
                title: "ALG du SIP",
                content: "Cochez la case pour activer la fonction SIP ALG, afin de permettre aux clients et aux serveurs SIP de transférer des données à travers la NAT."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer tous vos paramètres."
            }]
        },
        virtualServer: {
            TITLE: "Serveurs virtuels",
            CONTENT: [{
                type: "paragraph",
                content: "Les serveurs virtuels sont utilisés pour configurer des services publics dans votre réseau local. Un serveur virtuel se définit comme un port externe qui redirige toutes les requêtes reçues par Internet vers un ordinateur déterminé, lequel doit être configuré avec une adresse IP statique ou réservée."
            }, {
                type: "name",
                title: "Type de service",
                content: "Affiche le nom de votre serveur virtuel."
            }, {
                type: "name",
                title: "Port externe",
                content: "Affiche les numéros d’une plage de ports utilisés par le serveur virtuel. "
            }, {
                type: "name",
                title: "IP interne",
                content: "Affiche l’adresse IP de l’ordinateur sur lequel s’exécute l’application du service."
            }, {
                type: "name",
                title: "Port interne",
                content: "Affiche le numéro du port de l’ordinateur sur lequel s’exécute l’application du service."
            }, {
                type: "name",
                title: "Protocole",
                content: "Affiche le protocole utilisé pour l’application du service : TCP, UDP, o Tous (tous les protocoles pris en charge par le routeur)."
            }, {
                type: "name",
                title: "Statut",
                content: "Indique le statut actuel d’un serveur virtuel. Cliquez sur l’icône de l’ampoule pour activer ou désactiver l’entrée du serveur virtuel."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options de modifier ou de supprimer la règle correspondante."
            }, {
                type: "note",
                title: "<strong>Pour ajouter une entrée de serveur virtuel</strong>",
                content: [
                    "Cliquez sur ajouter.",
                    "Sélectionnez un nom d’interface dans la liste déroulante.",
                    "Cliquez sur Visualiser les services existants pour sélectionner un service dans la liste qui informera automatiquement du numéro de port adéquat dans les champs Port externe et Port interne. Si le service n’est pas dans la liste, saisissez le numéro du port externe (p. ex. 21) ou une plage de ports (p. ex. de 21 à 25). Laissez le champ Port interne vide si le numéro de ce dernier est le même que celui du port externe, ou saisissez un numéro de port spécifique (p. ex. 21) si le port externe est un port unique. ",
                    "Dans le champ IP interne, saisissez l’adresse IP de l’ordinateur sur lequel s’exécute l’application du service en notation décimale séparée par des points.",
                    "Sélectionnez un protocole pour l’application du service : TCP, UDP, ou Tous, dans la liste déroulante des protocoles.",
                    "Sélectionnez d’activer cette entrée.",
                    "Cliquez sur OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Pour modifier ou supprimer une entrée de serveur virtuel</strong><br>Cliquez sur l’icône Modifier ou sur celle de la poubelle de l’entrée correspondante."
            }, {
                type: "paragraph",
                content: "<strong>Pour supprimer plusieurs entrées</strong><br>Sélectionnez toutes les entrées de serveurs virtuels que vous voulez supprimer, puis cliquez sur Supprimer au-dessus du tableau."
            }, {
                type: "paragraph",
                content: "<strong>Remarque :</strong><br>Si votre dispositif hôte local héberge plus d’un type de services disponibles, vous devez créer un serveur virtuel pour chaque service."
            }]
        },
        portTrigger: {
            TITLE: "Déclenchement du port",
            CONTENT: [{
                type: "paragraph",
                content: "Le déclenchement de port s’utilise pour transférer le trafic sur un certain port vers un serveur spécifique du réseau. "
            }, {
                type: "name",
                title: "Application",
                content: "Affiche le nom de l'application."
            }, {
                type: "name",
                title: "Port de déclenchement",
                content: "Affiche le port du trafic sortant utilisé pour déclencher une règle de filtrage d’une connexion sortante."
            }, {
                type: "name",
                title: "Protocole de déclenchement",
                content: "Affiche le protocole utilisé pour le port de déclenchement. TCP, UDP, o Tous (tous les protocoles pris en charge par le routeur)."
            }, {
                type: "name",
                title: "Port externe",
                content: "Affichez le port ou la plage de ports utilisé(e) par le système distant. Une réponse utilisant un de ces ports sera transférée vers l’ordinateur qui déclenche cette règle. Il est possible d’entrer un maximum de 5 groupes de ports (ou sections de ports). Les groupes de ports doivent être séparés par des virgules, par exemple, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Protocole externe",
                content: "Affiche le protocole utilisé pour le port entrant : TCP, UDP, o Tous (tous les protocoles pris en charge par le routeur)."
            }, {
                type: "name",
                title: "Statut",
                content: "Indique le statut actuel d’une entrée de port de déclenchement. Cliquez sur l’icône de l’ampoule pour activer ou désactiver l’entrée."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options de modifier ou de supprimer l’entrée correspondante."
            }, {
                type: "note",
                title: "<strong>Pour configurer une entrée de déclenchement de port</strong><br><strong>Remarque : </strong> Chaque entrée ne peut être utilisée que par un hôte à la fois.",
                content: [
                    "Cliquez sur ajouter.",
                    "Sélectionnez un nom d’interface dans la liste déroulante.",
                    "Cliquez sur Visualiser les services existants pour sélectionner une application dans la liste qui informera automatiquement des valeurs par défaut dans les champs appropriés. Si vous souhaitez ajouter une application hors liste, entrez manuellement l’application, le port de déclenchement, le protocole de déclenchement, le port externe et le protocole externe.<br><strong>Remarque : </strong> Dans les entrées de déclenchement de ports, aucune plage de ports ne peut en chevaucher une autre (p. ex. à l’entrée 1 correspond la plage de ports 4200-4205, ce qui veut dire qu’à l’entrée 2 ne peut pas correspondre la plage 4203-4206).",
                    "Sélectionnez d’activer cette entrée.",
                    "Cliquez sur OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Pour modifier ou supprimer une entrée de déclenchement de port</strong><br>Dans le tableau, cliquez sur l’icône Modifier ou sur l’icône de la poubelle correspondant à l’entrée que vous voulez modifier ou supprimer."
            }, {
                type: "paragraph",
                content: "<strong>Pour supprimer plusieurs entrées de déclenchement de ports</strong><br>Dans le tableau, sélectionnez les entrées que vous voulez supprimer, puis cliquez sur Supprimer au-dessus du tableau."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "La fonction d’hôte DMZ (zone démilitarisée) permet d'exposer un hôte local à Internet pour un service à but spécifique, comme le jeu sur Internet ou la visioconférence. Essentiellement, la DMZ permet qu’un unique ordinateur dans votre LAN ouvre tous ses ports. Cet ordinateur doit être configuré avec une adresse IP statique, et sa fonction client DHCP doit être désactivée."
            }, {
                type: "note",
                title: "<strong>Affecter un ordinateur ou un serveur à être un serveur DMZ</strong>",
                content: [
                    "Sélectionnez Activer la DMZ.",
                    "Entrez l’adresse IP de l’ordinateur local qui doit être l’hôte de la DMZ.",
                    "Cliquer sur Sauvegarder."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Par défaut, la fonction UPnP (Universal Plug-and-Play, prêt à l’emploi universel) est activée pour permettre à des dispositifs, tels que des ordinateurs ou des appareils Internet, de se découvrir et de communiquer automatiquement entre eux dans le réseau local."
            }, {
                type: "name",
                title: "UPnP",
                content: "Basculez sur ON pour activer la fonction UPnP."
            }, {
                type: "title",
                content: "Liste de services UPnP"
            }, {
                type: "paragraph",
                content: "La liste des services UPnP reprend les informations sur le dispositif UPnP."
            }, {
                type: "name",
                title: "Total clients",
                content: "Affiche le nombre total de dispositifs UPnP."
            }, {
                type: "name",
                title: "Description du service ",
                content: "Affiche une brève description de l’hôte local qui lance la requête UPnP."
            }, {
                type: "name",
                title: "Port externe",
                content: "Affiche le port externe qui est ouvert par l’hôte local."
            }, {
                type: "name",
                title: "Protocole",
                content: "Affiche le type de protocole réseau utilisé par l’hôte local."
            }, {
                type: "name",
                title: "Adresse IP interne",
                content: "Affiche l’adresse IP de l’hôte local."
            }, {
                type: "name",
                title: "Port interne",
                content: "Affiche le port interne qui est ouvert par l’hôte local."
            }, {
                type: "paragraph",
                content: "Cliquez sur <strong>Actualiser</strong> pour actualiser la liste du serveur UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Réseau invités",
            CONTENT: [{
                type: "paragraph",
                content: "Guest Network (Réseau invités) vous permet de configurer un réseau Wi-Fi séparé avec un nom de réseau séparé (SSID) et un mot de passe que vous invités peuvent utiliser pour accéder à Internet."
            }, {
                type: "title",
                content: "Paramètres"
            }, {
                type: "name",
                title: "Permettre aux invités de visibilité mutuelle",
                content: "Cochez cette case pour permettre aux dispositifs Wi-Fi qui font partie du réseau invités de communiquer entre eux."
            }, {
                type: "name",
                title: "Permettre aux invités d’accéder à mon réseau local",
                content: "Cochez cette case pour permettre aux dispositifs Wi-Fi qui font partie du réseau d’accéder à votre réseau local."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer tous vos paramètres."
            }, {
                type: "title",
                content: "Paramètres Wi-Fi"
            }, {
                type: "name",
                title: "Réseau invités 2.4GHz | 5GHz",
                content: "Cliquez sur le bouton pertinent pour activer le réseau invités 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID du réseau invités",
                content: "Voua pouvez soit utiliser la SSID par défaut, soit en créer une nouvelle en utilisant de 1 à 32 caractères. Ce champ est sensible à la casse."
            }, {
                type: "name",
                title: "Sécurité",
                content: "Sélectionnez une option de sécurité pour le réseau invités :",
                children: [{
                    type: "name",
                    title: " Aucune",
                    content: "Par défaut, la sécurité du réseau invités est définie comme Aucune ; tout le monde peut y accéder."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personnel",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification normale, qui utilise une clé prépartagée (PSK) également appelée « phrase secrète ». Si vous l’avez sélectionnée, configurez ce qui suit.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sélectionnez une version de la sécurité pour le Réseau invités.",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Cette option prend en charge plusieurs mises en œuvre de la norme WPA (Wi-Fi Protected Access, accès protégé à la WiFi), telles que WPA ou WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Cette option prend en charge le chiffrement AES, lequel est recommandé car il apporte un niveau de sécurité supérieur à celui du WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Sélectionnez un type de chiffrement de sécurité : Automatique (pour TKIP ou AES), TKIP (Temporal Key Integrity Protocol, Protocole d’intégrité de clé temporaire) ou AES (Advanced Encryption Standard, Norme de chiffrement avancé). Il n’est PAS recommandable d’utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, car TKIP n’est pas pris en charge par les spécifications 802.11n. Si vous sélectionnez TKIP, la fonction WPS sera désactivée."
                    }]
                }]
            }, {
                type: "name",
                title: "Mot de passe",
                content: "Créez un mot de passe de 8 à  63 caractères ASCII ou de 8 à 64 caractères hexadécimaux (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "Les instructions ci-dessus concernant les réseaux d’invités de 2.4 GHz s’appliquent également à ceux de 5GHz."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer tous vos paramètres."
            }]
        },
        wirelessStat: {
            TITLE: "Dispositifs en ligne",
            CONTENT: [{
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC du client Wi-Fi associé."
            }, {
                type: "name",
                title: "Type de connexion",
                content: "Affiche la bande de fréquences (2.4GHz ou 5GHz) à laquelle est connecté le client."
            }, {
                type: "name",
                title: "Sécurité",
                content: "Affiche le type de sécurité (aucune, WEP, WPA/WPA2-Personnelle, ou WPA/WPA2-Entreprise) du client Wi-Fi associé."
            }, {
                type: "name",
                title: "Paquets reçus",
                content: "Affiche le nombre de paquets reçus par le client Wi-Fi associé."
            }, {
                type: "name",
                title: "Paquets envoyés",
                content: "Affiche le nombre de paquets envoyés par le client Wi-Fi associé."
            }, {
				type: "name",
				title: "Paquets reçus",
				content: "Affiche le nombre de paquets reçus par le dernier client Wi-Fi connecté."
			}, {
                type: "paragraph",
                content: "Cliquez sur <strong>Actualiser</strong> pour mettre à jour les informations de cette page."
            }]
        },
        wirelessAdv: {
            TITLE: "Paramètres avancés",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Sélectionnez 2.4GHz | 5GHz pour définir ses paramètres Wi-Fi."
            }, {
                type: "name",
                title: "Intervalle entre balises",
                content: "Saisissez une valeur comprise entre 25 et 1000 en millisecondes pour déterminer les intervalles auxquels chaque paquet de balises est émis par le routeur pour synchroniser le réseau Wi-Fi. La valeur par défaut est de 100 millisecondes."
            }, {
                type: "name",
                title: "Seuil RTS",
                content: "Saisissez une valeur comprise entre 1 et 2346 pour déterminer la taille des paquets de transmission de données à travers le routeur. Par défaut, la taille du seuil de RTS (Request to Send, demande d’envoi) est 2346. Si la taille du paquet dépasse le seuil prédéfini, le routeur envoie des trames de demandes d’envoi à une station de réception en particulier, et négocie l’envoi d’une trame de données, sans quoi le paquet sera envoyé immédiatement."
            }, {
                type: "name",
                title: "Intervalle DTIM ",
                content: "Saisissez une valeur comprise entre 1 et 255 pour déterminer l’intervalle du message de signalisation de trafic de distribution (DTIM). 1 indique que l’intervalle DTIM est le même que l’intervalle des balises."
            }, {
                type: "name",
                title: "Intervalle de génération",
                content: " Saisissez le nombre de secondes (30 au minimum) pour contrôler l’intervalle de temps de renouvellement automatique de la clé de chiffrement. La valeur par défaut est 0. Elle correspond au non renouvellement de la clé."
            }, {
                type: "name",
                title: "WMM",
                content: "Cette fonction garantit que les paquets de messages à priorité élevée soient transmis de manière préférentielle. WMM s’active obligatoirement dans les modes 802.11n ou 802.11ac. Il est instamment recommandé d’activer WMM."
            }, {
                type: "name",
                title: "GI court",
                content: "Cette fonction s’active par défaut, et est recommandée pour augmenter la capacité en données grâce à la réduction du temps de l’intervalle de référence (GI, Guard Interval)."
            }, {
                type: "name",
                title: "Isolation du PA",
                content: " Cochez cette case pour activer la fonction d’isolation des PA, qui permet de confiner et de restreindre  tous les dispositifs Wi-Fi votre réseau, lesquels ne pourront pas interagir entre eux, mais auront accès à Internet. L’isolation des PA est désactivée par défaut."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS en parallèle",
                content: "Cochez cette case pour activer la fonction de mise en parallèle du WDS (Wireless Distribution System, système de distribution Wi-Fi), afin de permettre la mise en parallèle du routeur avec un autre point d'accès (PA) dans un réseau local Wi-Fi (WLAN, wireless local area network). Si vous l’avez activée, configurez ce qui suit."
            }, {
                type: "name",
                title: "SSID (à mettre en parallèle)",
                content: "Saisissez le SSID du WAP (Wireless Access Point, point d’accès Wi-Fi) auquel votre routeur va se connecter comme client, ou utilisez la fonction Survey (étude) pour rechercher et afficher tous les réseaux disponibles à votre portée."
            }, {
                type: "name",
                title: "Adresse MAC (à mettre en parallèle)",
                content: "Saisissez l’adresse MAC au format de 12 caractères hexadécimaux (0-9, a-f, A-F) séparés par des traits d’union, ou le WAP auquel le routeur va se connecter comme client. Si vous sélectionnez un réseau à l’aide de la fonction Survey, le champ de l’adresse MAC sera informé automatiquement."
            }, {
                type: "name",
                title: "Étude",
                content: "Cliquez sur ce bouton pour rechercher et afficher l’adresse MAC, le SSID, la force du signal, le canal, et les informations de sécurité sur tous les réseaux Wi-Fi disponibles à votre portée. Une fois un réseau sélectionné, les champs SSID, Adresse MAC et Sécurité seront informés automatiquement.",
                children: [{
                    type: "name",
                    title: "Liste des PA",
                    content: "Affiche les informations du PA auquel votre routeur peut se connecter."
                }, {
                    type: "name",
                    title: "Adress MAC",
                    content: "Affiche l’adresse MAC du PA auquel votre routeur va se connecter comme client."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Affiche le SSID du PA auquel votre routeur va se connecter comme client."
                }, {
                    type: "name",
                    title: "Force du signal",
                    content: "Affiche le SSID du PA auquel votre routeur va se connecter comme client."
                }, {
                    type: "name",
                    title: "Canal",
                    content: "Affiche le canal du PA auquel votre routeur va se connecter comme client."
                }, {
                    type: "name",
                    title: "Chiffrement",
                    content: "Affiche le type de chiffrement du PA auquel votre routeur va se connecter comme client."
                }, {
                    type: "name",
                    title: "Se connecter",
                    content: "Cliquez sur l’icône pour vous connecter au PA correspondant ou pour vous en déconnecter."
                }]
            }, {
                type: "name",
                title: "Sécurité",
                content: "Sélectionnez une des options de sécurité suivantes :",
                children: [{
                    type: "name",
                    title: "Aucune",
                    content: "Sélectionnez cette option pour désactiver la sécurité Wi-Fi. Il est instamment recommandé d’activer la sécurité Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personnel",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification normale, qui utilise une clé prépartagée (PSK) également appelée « phrase secrète ». Cette option est recommandée. Si vous l’avez sélectionnée, configurez ce qui suit.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sélectionnez une version de la sécurité pour votre réseau Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Cette option prend en charge le chiffrement AES, qui apporte un niveau de sécurité inférieur à celui du WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Cette option prend en charge le chiffrement AES, lequel est recommandé car il apporte un niveau de sécurité supérieur à celui du WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Sélectionnez un type de chiffrement de sécurité : TKIP (Temporal Key Integrity Protocol, protocole d’intégrité de clé temporaire), ou AES (Advanced Encryption Standard, norme de chiffrement avancé). Il n’est PAS recommandable d’utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, car TKIP n’est pas pris en charge par les spécifications 802.11n. Si vous sélectionnez TKIP, la fonction WPS sera désactivée."
                    }, {
                        type: "name",
                        title: "Mot de passe",
                        content: "Saisissez dans ce champ un mot de passe Wi-Fi de 8 à 63 caractères ASCII, ou de 8 à 64 caractères hexadécimaux."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification de base si une quelconque version de vos dispositifs clients ne peuvent accéder au Wi-Fi qu'en utilisant la WEP (Wired Equivalent Privacy, confidentialité équivalente filaire).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Sélectionnez un type d’authentification pour votre réseau Wi-Fi. Sélectionnez Système ouvert ou Clé partagée, selon la capacité et les besoins d’accès du client Wi-Fi."
                    }, {
                        type: "name",
                        title: "Format de clé WEP",
                        content: "Sélectionnez soit le format ASCII, soit l’hexadécimal. Le format ASCII est une combinaison de caractères alphabétiques et de chiffres. Le format hexadécimal est une combinaison de chiffres (de 0 à 9) et de lettres (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Index de clé",
                        content: "Sélectionnez laquelle des quatre clés sera utilisée et saisissez la clé WEP correspondante que vous créez dans le champ Valeur de clé. Vérifiez que ces valeurs sont identiques sur toutes les stations Wi-Fi de votre réseau."
                    }, {
                        type: "name",
                        title: "Valeur de clé",
                        content: "Saisissez la clé WEP correspondante que vous créez."
                    }]
                }]
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer vos paramètres."
            }]
        },
        wirelessSchedule: {
            TITLE: "Planification Wi-Fi",
            CONTENT: [{
                type: "paragraph",
                content: "Le calendrier efficace est fondé sur l’heure du routeur. Le réglage de l’heure se fait dans Outils du système  -> Paramètres horaires"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Sélectionnez 2.4GHz | 5GHz pour définir son calendrier Wi-Fi."
            }, {
                type: "name",
                title: "Planification Wi-Fi",
                content: "Basculez sur ON pour activer cette fonction. Ensuite, cliquez et déplacez à travers les cellules pour définir la période de désactivation de la fonction Wi-Fi."
            }, {
                type: "name",
                title: "Restaurer",
                content: "Cliquez pour sélectionner l’heure."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer vos paramètres."
            }]
        },
        macFilter: {
            TITLE: "Paramètres du filtre d'adresse MAC",
            CONTENT: [{
                type: "name",
                title: "Filtrage MAC",
                content: "Basculer sur On pour contrôler l’accès Wi-Fi en utilisant l’adresse MAC des dispositifs individuels."
            }, {
                type: "title",
                title: "Règles de filtrage"
            }, {
                type: "name",
                title: "Bloquer l’accès depuis les dispositifs de la liste ci-dessous.",
                content: "Sélectionnez de bloquer l’accès Wi-Fi depuis les dispositifs de la liste ci-dessous."
            }, {
                type: "name",
                title: "Autoriser l’accès depuis les dispositifs de la liste ci-dessous seulement.",
                content: "Sélectionnez de n’autoriser l’accès Wi-Fi que depuis les dispositifs de la liste ci-dessous."
            }, {
                type: "title",
                title: "Liste des dispositifs"
            }, {
                type: "name",
                title: "Adresse MAC/Description",
                content: "Affiche l’adresse MAC et la description du dispositif."
            }, {
                type: "name",
                title: "Activer",
                content: "Cliquez sur l’ampoule pour activer ou désactiver le filtrage MAC du dispositif."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options de modifier ou de supprimer l’entrée correspondante."
            }, {
                type: "note",
                title: "Pour ajouter un nouveau dispositif",
                content: [
                    "Cliquez sur ajouter.",
                    "Saisissez l’adresse MAC du dispositif.",
                    "Saisissez une description du dispositif.",
                    "Cliquez sur Activer pour cette entrée.",
                    "Cliquez sur OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Paramètres Wi-Fi",
            CONTENT: [/*{
                type: "name",
                title: "Région",
                content: "Sélectionnez votre région dans la liste déroulante. Ce champ spécifie la région dans laquelle la fonction Wi-Fi du routeur peut être utilisée. Il peut être illégal d’utiliser la fonction Wi-Fi du routeur dans une région autre que celles spécifiées dans ce champ. Si votre pays ou votre région ne figure pas dans la liste, demandez de l’aide auprès des autorités locales."
            }, */{
                type: "name",
                title: "Connexion intelligente",
                content: "Cochez cette case pour activer Smart Connect (connexion intelligente). Cette fonction accélère les dispositifs en leur allouant les bandes Wi-Fi les plus favorables selon les conditions actuelles, afin d'équilibrer les demandes du réseau."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Sélectionnez 2.4GHz | 5GHz pour modifier les paramètres correspondants."
            }, {
                type: "name",
                title: "Emetteur Wi-Fi",
                content: "Cochez cette case pour activer la radiofréquence Wi-Fi 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Nom du réseau Wi-Fi (SSID)",
                content: "Vous pouvez soit laisser le nom par défaut du réseau (SSID) tel quel, soit créer un nouveau nom (jusqu’à 32 caractères). Ce champ est sensible à la casse."
            }, {
                type: "name",
                title: "Masquer le SSID",
                content: "Coche cette case si vous souhaitez masquer le nom du réseau 2.4GHz | 5GHz (SSID) dans la liste de réseaux WiFi."
            }, {
                type: "name",
                title: "Sécurité",
                content: "Sélectionnez une des options de sécurité suivantes :",
                children: [{
                    type: "name",
                    title: "Pas de sécurité",
                    content: "Sélectionnez cette option pour désactiver la sécurité Wi-Fi. Il est instamment recommandé d’activer la sécurité Wi-Fi pour protéger votre réseau Wi-Fi de tout accès non autorisé."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personnel",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification normale, qui utilise une clé prépartagée (PSK) également appelée « phrase secrète ». Cette option est recommandée. Si vous l’avez sélectionnée, configurez ce qui suit.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sélectionnez une version de la sécurité pour votre réseau Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Cette option prend en charge plusieurs mises en œuvre de la norme WPA (Wi-Fi Protected Access, accès protégé à la WiFi), telles que WPA ou WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Cette option prend en charge le chiffrement AES, lequel est recommandé car il apporte un niveau de sécurité supérieur à celui du WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Sélectionnez un type de chiffrement de sécurité : Automatique (pour TKIP ou AES), TKIP (Temporal Key Integrity Protocol, Protocole d’intégrité de clé temporaire) ou AES (Advanced Encryption Standard, Norme de chiffrement avancé). Il n’est PAS recommandable d’utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, car TKIP n’est pas pris en charge par les spécifications 802.11n. Si vous sélectionnez TKIP, la fonction WPS sera désactivée."
                    }, {
                        type: "name",
                        title: "Mot de passe",
                        content: "Créez dans ce champ un mot de passe Wi-Fi de 8 à 63 caractères ASCII, ou de 8 à 64 caractères hexadécimaux."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Entreprise",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification plus avancée en utilisant le serveur RADIUS (Remote Authentication Dial In User Service, numérotation d’authentification à distance dans le service utilisateur). Si vous le sélectionnez, la fonction WPS sera désactivée.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sélectionnez une version de la sécurité pour votre réseau Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Cette option prend en charge plusieurs mises en œuvre de la norme WPA (Wi-Fi Protected Access, accès protégé à la WiFi), telles que WPA ou WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Cette option prend en charge le chiffrement AES, lequel est recommandé car il apporte un niveau de sécurité supérieur à celui du WPA."
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Sélectionnez un type de chiffrement de sécurité : Automatique (pour TKIP ou AES), TKIP (Temporal Key Integrity Protocol, Protocole d’intégrité de clé temporaire) ou AES (Advanced Encryption Standard, Norme de chiffrement avancé). Il n’est PAS recommandable d’utiliser le chiffrement TKIP si le routeur fonctionne en mode 802.11n, car TKIP n’est pas pris en charge par les spécifications 802.11n. Si vous sélectionnez TKIP, la fonction WPS sera désactivée."
                    }, {
                        type: "name",
                        title: "IP du serveur RADIUS",
                        content: "Saisissez l’adresse IP du serveur RADIUS."
                    }, {
                        type: "name",
                        title: "Port du serveur RADIUS",
                        content: "Saisissez le numéro de port du serveur RADIUS."
                    }, {
                        type: "name",
                        title: "Mot de passe du serveur RADIUS",
                        content: " Saisissez le mot de passe partagé du serveur RADIUS."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Sélectionnez cette option pour activer la méthode d’authentification de base si une quelconque version de vos dispositifs clients ne peut accéder au Wi-Fi qu'en utilisant la WEP (Wired Equivalent Privacy, confidentialité équivalente filaire).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Sélectionnez un type d’authentification pour votre réseau Wi-Fi. Le type par défaut est Automatique, lequel sélectionne automatiquement Système ouvert ou Clé partagée, selon la capacité et les besoins d’accès du client Wi-Fi."
                    }, {
                        type: "name",
                        title: "Clé sélectionnée",
                        content: "Sélectionnez laquelle des quatre clés sera utilisée et créez une clé WEP dans le champ Valeur de clé. Les clients Wi-Fi doivent saisir la clé WEP correspondante pour se connecter à votre réseau."
                    }, {
                        type: "name",
                        title: "Format de clé WEP",
                        content: "Sélectionnez soit le format ASCII, soit l’Hexadécimal. Le format ASCII est une combinaison de caractères alphabétiques et de chiffres. Le format hexadécimal est une combinaison de chiffres (de 0 à 9) et de lettres (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Type de clé",
                        content: "Sélectionnez une longueur de clé WEP.",
                        children: [{
                            type: "name",
                            title: "Chiffrement 64 bits",
                            content: "Vous permet de saisir 10 caractères hexadécimaux (0-9, A-F, a-f) ou 5 caractères ASCII dans le champ Valeur WEP."
                        }, {
                            type: "name",
                            title: "Chiffrement 128 bits",
                            content: "Vous permet de saisir 26 caractères hexadécimaux (0-9, A-F, a-f) ou 13 caractères ASCII dans le champ Valeur WEP."
                        }]
                    }, {
                        type: "name",
                        title: "Valeur de clé",
                        content: "Créez une clé WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Sélectionnez un mode de transmission mixte."
            }, {
                type: "name",
                title: "Canal",
                content: "Sélectionnez un canal de travail pour le réseau Wi-Fi. Le canal par défaut est Automatique. Ne le modifiez pas, à moins que la connexion Wi-Fi ne présente des intermittences."
            }, {
                type: "name",
                title: "Largeur du canal",
                content: "Sélectionnez une largeur de canal (bandwidth) pour le réseau Wi-Fi."
            }, {
                type: "name",
                title: "Puissance de transmission",
                content: "Sélectionnez Forte, Moyenne ou Faible pour spécifier la force de transmission de données. Le paramétrage par défaut, qui est recommandé, est Forte."
            }, {
                type: "paragraph",
                content: "Cliquez sur <strong>Save</strong> pour enregistrer tous vos paramètres."
            }]
        },
        wps: {
            TITLE: "Code PIN du routeur",
            CONTENT: [{
                type: "name",
                title: "Code PIN du routeur",
                content: "Basculez sur On pour autoriser les dispositifs Wi-Fi à se connecter au routeur en utilisant le code PIN (Personal Identification Number, numéro d’identification personnelle) de celui-ci."
            }, {
                type: "name",
                title: "Code PIN actuel",
                content: "Affiche le code PIN actuel du routeur. Le code PIN par défaut se trouve sur l’étiquette du routeur ou dans son mode d'emploi. Cliquez sur Générer pour générer un nouveau code PIN aléatoire, ou bien cliquez sur Restaurer pour restaurer le code PIN actuel à sa valeur par défaut."
            }, {
                type: "title",
                content: "Paramètres WPS"
            }, {
                type: "name",
                title: "Bouton poussoir (recommandé)",
                content: "Sélectionnez cette méthode de configuration pour activer la fonction WPS, afin que tout dispositif sur lequel la fonction WPS est activée puisse se connecter facilement à votre réseau Wi-Fi en utilisant le bouton WPS ou, virtuellement, le bouton Se connecter."
            }, {
                type: "name",
                title: "Code PIN",
                content: "Sélectionner cette méthode de configuration pour ajouter un dispositif manuellement en saisissant dans le champ correspondant le code PIN du WPS du dispositif Wi-Fi."
            }, {
                type: "name",
                title: "Se connecter",
                content: "Cliquez sur ce bouton pour lancer le WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Contrôl parental",
            CONTENT: [{
                type: "paragraph",
                content: "Avec les Contrôl parental, les sites Web inconvenants, sexuellement explicites ou malveillants peuvent être bloqués, ainsi que l'accès à certains sites à certaines heures (par exemple, Facebook ou YouTube à l’heure des devoirs)."
            }, {
                type: "name",
                title: "Statut",
                content: "Basculez sur ON pour activer la fonction des Contrôl parental. Par défaut, cette fonction est activée."
            }, {
                type: "title",
                content: "Périphériques soumis au contrôle parental"
            }, {
                type: "paragraph",
                content: "« Dispositifs sous Contrôl parental » affiche la liste des dispositifs actuellement restreints par des Contrôl parental."
            }, {
                type: "name",
                title: "Nom du dispositif",
                content: "Affiche le nom de tous les dispositifs clients connectés actuellement soumis à des Contrôl parental."
            }, {
                type: "name",
                title: "Adress MAC",
                content: " Affiche l’adresse MAC de tous les dispositifs clients connectés actuellement soumis à des Contrôl parental."
            }, {
                type: "name",
                title: "Temps effectif",
                content: "Affiche les heures de restriction d’accès."
            }, {
                type: "name",
                title: "Description",
                content: "Affiche une brève description du dispositif connecté. "
            }, {
                type: "name",
                title: "Statut",
                content: "Indique si les Contrôl parental sont activés ou pas dans le dispositif correspondant. Cliquez sur l’icône de l’ampoule pour les activer ou les désactiver."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options de modifier ou de supprimer le dispositif correspondant."
            }, {
                type: "note",
                title: "<strong>Pour restreindre un nouveau dispositif client</strong>",
                content: [
                    "Cliquez sur ajouter.",
                    "Cliquez sur Voir les dispositifs existants pour choisir un dispositif actuellement connecté dans la Liste des dispositifs d’accès ; ou bien, pour ajouter un dispositif non connecté, saisissez manuellement le nom et l’adresse MAC du dispositif.",
                    "Cliquez sur l’icône Temps effectif pour spécifier une période pour l’application de la restriction.",
                    "Saisissez une brève description dans le champ Description. Ce champ est facultatif.",
                    "Sélectionnez Activer.",
                    "Cliquez sur OK pour enregistrer cette entrée."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Pour modifier ou supprimer un dispositif</strong><br>Dans la liste des dispositifs sous Contrôl parental, cliquez simplement sur l’icône Modifier ou sur l’icône de la poubelle correspondant au dispositif que vous voulez modifier ou supprimer."
            }, {
                type: "paragraph",
                content: "<b>Pour supprimer plusieurs dispositifs</b><br>Dans la liste des dispositifs sous Contrôl parental, cochez les cases correspondant aux dispositifs à supprimer, puis cliquez sur Supprimer au-dessus du tableau."
            }, {
                type: "title",
                title: "Restriction du contenu"
            }, {
                type: "paragraph",
                content: "La Restriction de contenus permet de restreindre l’accès à des contenus en utilisant des mots-clés ou des noms de domaines, auxquels les dispositifs clients sous Contrôl parental pourront accéder ou pas selon le type de restriction."
            }, {
                type: "name",
                title: "Type de restriction ",
                content: "Sélectionnez les types de restrictions parmi les suivants :",
                children: [{
                    type: "name",
                    title: "Liste noire",
                    content: "Contient des mots-clés ou des noms de domaines qui seront utilisés pour bloquer l’accès à des sites Web depuis les dispositifs clients figurant sur la liste des Contrôl parental."
                }, {
                    type: "name",
                    title: "Liste blanche",
                    content: "Contient des mots-clés et des noms de domaines auxquels peuvent accéder les dispositifs clients figurant sur la liste des Dispositifs sous Contrôl parental."
                }]
            }, {
                type: "name",
                title: "Ajouter un nouveau mot clé",
                content: "Cliquez pour ajouter un nouveau mot-clé ou nom de domaine à la liste noire ou à la liste blanche. "
            }, {
                type: "paragraph",
                content: "Pour supprimer un mot-clé ou un nom de domaine, cliquez sur l’cône « – » (moins) située à côté de l’élément que vous voulez supprimer."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer votre configuration."
            }]
        },
        parentCtrl: {
            TITLE: "Contrôle Parental",
            CONTENT: [{
                type: "paragraph",
                content: "Avec les filtres par niveau d'âge, les limites d'accès et les profils d'utilisateur, le contrôle parental offre à votre famille un accès Internet personnalisé et approprié."
            }, {
                type: "note",
                title: "<strong>Pour appliquer le contrôle parental à un nouvel appareil</strong>",
                content: [
                    "Cliquer sur Ajouter.",
                    "Entrez un nom pour ce profil et cliquez sur \"+\" pour ajouter des périphériques à ce profil.",
                    "Sélectionnez un niveau de filtrage et personnalisez le contenu du filtre en fonction de vos besoins. Vous pouvez saisir des mots clés pour rechercher des sites Web que vous souhaitez filtrer dans notre base de données. D'autres sites Web (URL) peuvent être saisis manuellement. <br/> Reportez-vous aux explications suivantes pour les différentes catégories de filtres : <p> Contenus pour adultes - Sites proposant des contenus sexuels, nocifs ou illicites, y compris de la pornographie, de la toxicomanie, de la violence et de la discrimination </p><p> Jeux d'argent - Sites qui font la promotion ou qui fournissent des informations sur le jeu, y compris les sites de jeux en ligne </p><p> Éducation sexuelle - Sites qui évoquent la sexualité de manière informative, incluant : la reproduction, la sexualité, les rapports sexuels protégés et le contrôle des naissances, les maladies sexuellement transmissibles et la prise en charge des traumatismes sexuels </p> Communication en ligne - Sites qui hébergent des services de communication interpersonnelle par le biais du texte, de la voix ou de la vidéo, y compris le courrier électronique, les blogs, les forums en ligne, les services de voix et de vidéo sur IP. </p><p> Réseaux sociaux - Sites qui diffusent des expressions personnelles ou des communications, et mettent en relation des personnes et leur activité personnelle en se basant sur des intérêts communs, des carrières, des antécédents ou une relation dans la vrai vie</p><p> Navigation rémunérée - Sites qui récompensent les utilisateurs qui consultent des sites Web, des messages électroniques ou des publicités, qui cliquent sur les liens ou répondent à des sondages </p><p> Media - Sites offrant des contenus audio et/ou vidéo gratuits, payants ou par abonnement, y compris des services de diffusion en continu, des émissions de télévision ou des téléchargements de musique </p><p> Téléchargements - Sites qui fournissent ou donnent accès au partage et à la distribution de fichiers, y compris le partage peer-to-peer, le stockage de fichiers en ligne et du contenu pour périphériques mobiles (par exemple, musique et applications). </p><p> Jeux - Sites qui fournissent ou donnent accès à des jeux hébergés sur le Web ou téléchargeables, y compris les jeux en ligne, les réseaux pour consoles de jeux et les jeux pour navigateurs </p>",
                    "Si vous souhaitez limiter le temps total que ce profil peut passer en ligne, activez et spécifiez les limites de temps. Vous pouvez également utiliser l'heure du coucher pour définir une période de temps quotidienne pendant laquelle les appareils de ce profil ne peuvent pas utiliser Internet.",
                    "Cliquer sur bouton Sauvegarde."
                ]
            }, {
                type: "note",
                title: "<strong>Pour afficher l'historique Internet détaillé d'un profil</strong>",
                content: [
                    "Dans la colonne aperçu, cliquez sur le bouton aperçu correspondant.",
                    "Si vous voulez voir d'autres enregistrements, cliquez sur le bouton Historique <span class=\"ptl-ctr-help-icon history\"></span>.",
                    "Vous pouvez bloquer ou débloquer des sites Web en cliquant sur le bouton <span class=\"ptl-ctr-help-icon block\"></span> ou <span class=\"ptl-ctr-help-icon unblock\"></span>."
                ]
            }, {
                type: "note",
                title: "<strong>Pour désactiver ou activer l'accès à Internet immédiatement</strong>",
                content: [
                    "Dans la colonne Accès Internet, cliquez sur <span class=\"ptl-ctr-help-icon stop\"></span> pour empêcher les périphériques du profil correspondant d'accéder à Internet et cliquez sur <span class=\"ptl-ctr-help-icon enable\"></span> pour leur donner accès à nouveau."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "La fonction QoS (qualité de service) privilégie les activités en ligne et les périphériques pour garantir une connexion réseau plus rapide lorsque vous en avez le plus besoin."
            }, {
                type: "paragraph",
                content: "Sélectionnez Priorité d'application pour définir la priorité de débit par activité en ligne, et sélectionnez Priorité d'appareil pour définir la priorité de débit par appareil."
            }, {
                type: "title",
                content: "Priorité d'application"
            }, {
                type: "paragraph",
                content: "Choisissez l'activité en ligne à laquelle vous souhaitez donner la priorité ou cliquez sur Personnalisé pour définir le niveau de priorité de chaque application."
            }, {
                type: "title",
                content: "Priorité d'appareil"
            }, {
                type: "paragraph",
                content: "Choisissez le(s) périphérique(s) au(x)quel(s) vous souhaitez accorder une priorité et pour quelle durée."
            }, {
                type: "note",
                title: "<strong>Pour donner la priorité à un appareil</strong>",
                content: [
                    "Trouvez l'appareil auquel vous voulez donner la priorité dans la liste et activez Priorité.",
                    "Sélectionnez la durée de priorité accordée à l'appareil dans la colonne durée."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Antivirus",
            CONTENT: [{
                type: "paragraph",
                content: "Grâce aux analyses réseau fréquentes, à la détection de sites malveillants et à l'isolement d'appareils infectés, la fonctionnalité Antivirus protège vos informations personnelles. Vous pouvez également vérifier comment votre réseau est protégé, et s'il ya eu des attaques sur votre réseau."
            }, {
                type: "paragraph",
                content: "Historique - Enregistre les appareils qui ont été protégés par l'antivirus ainsi que la source et la nature des attaques."
            }, {
                type: "paragraph",
                content: "Activer tout - Appuyez pour activer \"tous les types de protection\" si un ou plusieurs ne sont pas activés."
            }, {
                type: "paragraph",
                content: "Types de protection - Activez les types de protection en vous référant aux explications. Il est recommandé d'activer tous les types de protection."
            }]
        },
        applicationPriority: {
            TITLE: "Priorité d'application",
            CONTENT: [{
                type: "paragraph",
                content: "La fonction Priorité d'application accorde la priorité aux activités en ligne pour garantir une connexion réseau plus rapide lorsque vous en avez le plus besoin. Choisissez l'application à laquelle vous souhaitez donner la priorité ou cliquez sur Personnalisé pour définir le niveau de priorité de chaque application."
            }]
        },
        devicePriority: {
            TITLE: "Priorité d'appareil",
            CONTENT: [{
                type: "paragraph",
                content: "La fonction Priorité d'appareil donne la priorité aux périphériques spécifiés pour leur garantir une connexion réseau plus rapide lorsque vous en avez le plus besoin. Choisissez le(s) périphérique(s) au(x)quel(s) vous souhaitez accorder une priorité et pour quelle durée."
            }, {
                type: "note",
                title: "<strong>Pour donner la priorité à un appareil</strong>",
                content: [
                    "Trouvez l'appareil auquel vous voulez donner la priorité dans la liste et activez Priorité.",
                    "Sélectionnez la durée de priorité accordée à l'appareil dans la colonne durée."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Réseau invités",
            CONTENT: [{
                type: "paragraph",
                content: "Guest Network (Réseau invités) vous permet de configurer un réseau Wi-Fi séparé avec un nom de réseau séparé (SSID) et un mot de passe que vous invités peuvent utiliser pour accéder à Internet."
            }, {
                type: "name",
                title: "Permettre aux invités de visibilité mutuelle",
                content: "Cochez cette case pour permettre aux dispositifs Wi-Fi qui font partie du réseau invités de communiquer entre eux."
            }, {
                type: "name",
                title: "Permettre aux invités d’accéder à mon réseau local",
                content: "Cochez cette case pour permettre aux dispositifs Wi-Fi qui font partie du réseau invités d’accéder à votre réseau local."
            }, {
                type: "name",
                title: "Réseau Wi-Fi 2.4GHz | 5GHz",
                content: "Sélectionnez le bouton pertinent pour activer le réseau invités 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID du réseau invités",
                content: "Voua pouvez soit utiliser la SSID par défaut, soit en créer une nouvelle en utilisant de 1 à 32 caractères. Ce champ est sensible à la casse."
            }, {
                type: "name",
                title: "Masquer le SSID",
                content: "Cochez cette case si vous voulez masquer la SSID du réseau invités."
            }, {
                type: "name",
                title: "Sécurité",
                content: "Sélectionnez une option de sécurité pour le réseau invités :",
                children: [{
                    type: "name",
                    title: "Aucune",
                    content: "Par défaut, la sécurité du réseau invités est définie comme Aucune ; tout le monde peut y accéder."
                }, {
                    type: "name",
                    title: "Définir un mot de passe",
                    content: "Créez pour le réseau invités un mot de passe de 8 à  63 caractères ASCII ou de 8 à 64 caractères hexadécimaux (0-9, a-f, A-F) dans le champ Mot de passe."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Statut Internet",
                content: "Affiche le statut actuel de la connexion Internet du routeur."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Type de connexion",
                content: "Affiche votre type de connexion Internet. "
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Adresse IP",
                content: "Affiche l’adresse IP d’Internet actuelle attribuée au routeur."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Serveur DNS",
                content: " Affiche les adresses IP des serveurs DNS primaire et secondaire."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Passerelle",
                content: "Affiche l’adresse IP de la passerelle."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Adresse MAC",
                "content": "Affiche l'adresse physique (unique) du routeur."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Adresse IP",
                "content": "Affiche l'adresse IP du routeur, elle peut être utilisée pour se connecter à l'interface WEB d'administration."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Masque de sous-réseau",
                "content": "Affiche le masque de sous-réseau du routeur."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Type d'adresse",
                "content": "Affiche le type de configuration de l'adresse IP du routeur."
            }, {
	     display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
               type: 'title',
                title: 'Test de vitesse'
		}, {
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",
                   type: "paragraph",
                   content: "This feature tests the current upload and download speeds you're getting from your service provider and provides helpful advice about your internet's capabilities."
               } ,{     
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                 
                   type: "paragraph",
                   content: "Tip: For a more accurate result, try closing down other apps and programs."
               } ,{    
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                  
                   type: "paragraph",
                   content: "History - A record of previous speed tests."
               } ,{   
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                   
                   type: "paragraph",
                   content: "Test Again - Click to perform a speed test."
             	}, {
                type: "title",
                title: "Routeur"
            }, {
                type: "title2",
                content: "Wi-Fi 2.4GHz | 5GHz"
            }, {/*
                type: "name",
                title: "Statut",
                content: "Affiche si les systèmes Wi-Fi 2.4GHz | 5GHz sont activés ou désactivés."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Affiche le nom du réseau Wi-Fi actuel de la bande de fréquences 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Canal",
                content: "Affiche le canal dans lequel émet le réseau Wi-Fi 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "MAC",
                content: "Affiche l’adresse MAC actuelle du système Wi-Fi 2.4GHz | 5GHz."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "Réseau invités 2.4GHz | 5GHz"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Statut",
                content: "Affiche si le réseau invités Wi-Fi 2.4GHz | 5GHz est activé ou désactivé."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Affiche le nom du réseau Wi-Fi du réseau invités."
            }, {
                type: "title",
                title: "Clients Wi-Fi/filaires"
            }, {
                type: "name",
                title: "Nom",
                content: " Affiche le nom du client connecté au routeur. "
            }, {
                type: "name",
                title: "Adresse IP",
                content: "Affiche l’adresse IP attribuée au client."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC du client."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Téléphone"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Nom du téléphone",
                content: "Affiche le nom de votre téléphone."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Numéros d’appels entrants",
                content: "Affiche les numéros utilisés par vos dispositifs téléphoniques pour recevoir des appels entrants à travers votre routeur. "
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Numéro interne",
                content: "Affiche les numéros de téléphone utilisés pour passer des appels entre des dispositifs téléphoniques connectés au même routeur. Il est prédéterminé et ne peut pas être modifié."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Numéro des appels sortants",
                content: "Affiche les numéros utilisés par vos dispositifs téléphoniques pour passer des appels sortants à travers votre routeur. Le paramètre par défaut est Automatique, ce qui veut dire que le routeur sélectionnera comme numéro sortant un numéro disponible, lequel peut être modifié depuis la page VoIP."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Imprimante"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Nom",
                content: "Affiche le nom de l’imprimante connectée au routeur à travers un port USB. "
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Disque USB"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Marque",
                content: "Affiche la marque du disque USB connecté au routeur."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Total",
                content: "Affiche le volume total du disque USB."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Espace disponible",
                content: "Affiche l’espace disponible dans le disque USB."
            }]
        },
		sysMode: {
            TITLE: "Mode d’utilisation",
            CONTENT: [{
                type: "name",
                title: "Routeur",
                content: "Dans ce mode, votre routeur se connecte à internet directement qu'il soit en IP dynamique, Statique, PPPoE, L2TP ou PPTP ; et il partage l'accès à ses clients Filaires ou Wi-Fi. Le Nat, le pare-feu et le serveur DHCP sont activés par défaut. Choisir ce mode si vous êtes un utilisateur primaire ou si vous n'utilisez pas déjà  des routeurs."
            }, {
                type: "name",
                title: "Point d'accès",
                content: "Dans ce mode, votre routeur se connecte à un routeur filaire ou Wi-Fi en Ethernet et ajoute un accès Wi-Fi au réseau existant. Les fonctions NAT, Contrôle parental, QoS ne sont pas supportées dans ce mode. L'adresse IP de ce routeur est attribuée par le serveur DHCP du routeur racine. Si vous ne connaissez pas l'adresse IP du routeur, vous pouvez utiliser http://tplinkwifi.net pour vous connecter à son interface d'administration WEB."
            }]
        },
        wirelessBasic: {
            TITLE: "Paramètres Wi-Fi",
            CONTENT: [{
                type: "name",
                title: "Réseau Wi-Fi 2.4GHz | 5GHz",
                content: "Cochez cette case pour activer la radiofréquence Wi-Fi 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Nom du réseau Wi-Fi (SSID)",
                content: "Vous pouvez soit laisser le nom par défaut du réseau (SSID) tel quel, soit créer un nouveau nom (jusqu’à 32 caractères). Ce champ est sensible à la casse."
            }, {
                type: "name",
                title: "Mot de passe",
                content: "Créez un mot de passe Wi-Fi de 8 à 63 caractères ASCII, ou de 8 à 64 caractères hexadécimaux. Ce champ est sensible à la casse."
            }, {
                type: "name",
                title: "Masquer le SSID",
                content: "Cochez cette case si vous souhaitez masquer les SSID 2.4GHz | 5GHz dans la liste de réseaux WiFi."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Affiche des informations importantes sur la connexion Internet."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Nom",
                content: "Affiche le nom du port Internet du routeur."
            }, {*/
                type: "name",
                title: "Adress MAC",
                content: "L’adresse physique unique assignée au port Internet (WAN) du routeur."
            }, {
                type: "name",
                title: "Adresse IP",
                content: "L’adresse IP assignée au port Internet (WAN) du routeur. Si l’adresse IP affichée est 0.0.0.0, indiquant l'absence d'accès à Internet."
            }, {
                type: "name",
                title: "Masque de sous-réseau",
                content: "Ce paramètre détermine la portion du réseau et la portion de l'hôte d'une adresse IP. "
            }, {
                type: "name",
                title: "Passerelle par défaut",
                content: " L’adresse IP utilisée pour connecter le routeur au réseau."
            }, {
                type: "name",
                title: "DNS primaire/DNS secondaire",
                content: "Le système de noms de domaine (DNS) traduit les noms d’hôtes et les domaines Internet sous forme d’adresses IP. Les informations de ces serveurs DNS sont assignées par le fournisseur de service Internet (Internet Service Provider, ISP)."
            }, {
                type: "name",
                title: "Type de connexion",
                content: "Votre type de connexion Internet actuel."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Adress MAC",
                content: "L’adresse physique unique assignée au port Internet (WAN) du routeur."
            }, {
                type: "name",
                title: "Adresse IP",
                content: " L’adresse IPv6 assignée au port Internet (WAN) du routeur."
            }, {
                type: "name",
                title: "Passerelle par défaut",
                content: " L’adresse IP utilisée pour connecter le routeur au réseau."
            }, {
                type: "name",
                title: "DNS primaire/DNS secondaire",
                content: "Le système de noms de domaine (DNS) traduit les noms d’hôtes et les domaines Internet sous forme d’adresses IP. Les informations de ces serveurs DNS sont assignées par le fournisseur de service Internet (Internet Service Provider, ISP)."
            }, {
                type: "name",
                title: "Type de connexion",
                content: "Votre type de connexion Internet actuel."
            }, {
                type: "title",
                title: "Sans fil"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Sélectionnez de voir les paramètres Wi-Fi et les informations 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Nom du réseau",
                content: "Le nom du réseau Wi-Fi, également appelé SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Emetteur Wi-Fi",
                content: "Le statut actuel (activé ou désactivé) du réseau Wi-Fi."
            }, {
                type: "name",
                title: "Mode",
                content: "Le mode Wi-Fi actuel."
            }, {
                type: "name",
                title: "Largeur du canal",
                content: "La largeur de bande du canal du réseau Wi-Fi."
            }, {
                type: "name",
                title: "Canal",
                content: "Le canal Wi-Fi actuel et la fréquence qui lui correspond (en GHz)."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "L’adresse MAC de la radio du réseau Wi-Fi."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Affiche les informations sur les ports Ethernet (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "Adress MAC",
                content: "L’adresse physique unique assignée au port Ethernet (LAN) du routeur."
            }, {
                type: "name",
                title: "Adresse IP",
                content: "L’adresse IPv4 assignée au port Ethernet (LAN) du routeur."
            }, {
                type: "name",
                title: "Masque de sous-réseau",
                content: "Ce paramètre détermine la portion du réseau et la portion de l'hôte d'une adresse IP."
            }, {
                type: "name",
                title: "DHCP",
                content: "Affiche si le serveur DHCP intégré du routeur est actif ou pas pour les dispositifs des ports LAN."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Adress MAC",
                content: " L’adresse physique unique assignée au port Ethernet (LAN) du routeur."
            }, {
                type: "name",
                title: "Adresse IP",
                content: "L’adresse IPv6 assignée au port Ethernet (LAN) du routeur."
            }, {
                type: "name",
                title: "Longueur du préfixe",
                content: "La longueur du préfixe de l’adresse IPv6."
            }, {
                type: "name",
                title: "Type assigné",
                content: "Le type d’adresse IPv6 assigné à l’interface du LAN."
            }, {
                type: "title",
                title: "Réseau invités"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Sélectionnez de voir les paramètres et les informations du réseau invités 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID du réseau invités",
                content: " Le nom du réseau Wi-Fi (SSID) de votre réseau invités."
            }, {
                type: "name",
                title: "Masquer le SSID",
                content: "Affiche si le nom du réseau Wi-Fi (SSID) du réseau invités est masqué (On) ou pas (Off)."
            }, {
                type: "name",
                title: "Emetteur Wi-Fi",
                content: "Indique le statut actuel (activé ou désactivé) du réseau Wi-Fi."
            }, {
                type: "name",
                title: "Visibilité mutuelle",
                content: "Affiche si tous les dispositifs du réseau invités sont autorisés ou pas à communiquer entre eux."
            }]
        },
        time: {
            TITLE: "Paramètres horaires",
            CONTENT: [{
                type: "name",
                title: "Fuseau horaire",
                content: "Sélectionnez votre fuseau horaire dans la liste déroulante."
            }, {
                type: "name",
                title: "Date",
                content: "Saisissez votre date locale au format MM/JJ/AA dans le champ correspondant."
            }, {
                type: "name",
                title: "Heure",
                content: "Choisissez votre heure locale dans la liste déroulante (en format 24 h, p. ex. 16:00:00 au lieu de 04:00 pm)."
            }, {
                type: "name",
                title: "Serveur NTP I/Serveur NTP II",
                content: "Saisissez l’adresse IP du serveur NTP I ou II, et le routeur obtiendra l’heure automatiquement depuis le serveur NTP. En outre, le routeur comporte quelques serveurs NTP d’usage courant intégrés, qui se synchroniseront automatiquement au moment de la connexion à Internet."
            }, {
                type: "name",
                title: "Obtenir de l’ordinateur",
                content: "Cliquez pour obtenir la synchronisation avec l'heure du système de l'ordinateur."
            }, {
                type: "name",
                title: "Obtenir GMT",
                content: "Cliquez pour obtenir la synchronisation sur le fuseau horaire GMT (Greenwich Mean Time) depuis Internet."
            }, {
                type: "name",
                title: "Enregistrer",
                content: "Cliquez pour enregistrer vos paramètres."
            }, {
                type: "title",
                content: "Heure d’été"
            }, {
                type: "note",
                title: "Pour configurer en observant l’heure d’été",
                content: [
                    "Sélectionnez <b>Activer l’heure d’été</b>.",
                    "Sélectionnez la date et l’heure de <b>Démarrage</b> correctes lorsque commence l’heure d’été dans votre horaire local.",
                    "Sélectionnez la date et l’heure de <b>Fin</b> correctes lorsque l’heure d’été se termine dans votre horaire local.",
                    "Cliquez sur <b>Enregistrer</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Outils diagnostiques",
            CONTENT: [{
                type: "paragraph",
                content: "Le routeur offre deux outils diagnostiques : ping et trace."
            }, {
                type: "note",
                title: "Pour diagnostiquer à l'aide de l'outil Ping :",
                content: [
                    "Vérifiez le bouton radio avant le ping.",
                    "Saisissez l’adresse IP et le nom de domaine.",
                    "Cliquez sur l’icône du déroulant avant Avancé pour afficher le comptage Ping, la taille du paquet Ping et le délai d’expiration du Ping. Laissez ces paramètres à leur valeur par défaut ou configurez-les selon vos besoins.",
                    "Cliquez sur le bouton Démarrer pour lancer le diagnostic."
                ]
            }, {
                type: "paragraph",
                content: "OU BIEN"
            }, {
                type: "note",
                title: "Pour diagnostiquer à l'aide de l'outil Traceroute :",
                content: [
                    "Vérifiez le bouton radio avant traceroute.",
                    "Saisissez l’adresse IP et le nom de domaine.",
                    "Cliquez sur l’icône du déroulant avant Avancé pour afficher la durée de vie (TTL) maximale de Traceroute. Laissez-la à sa valeur par défaut ou configurez-la selon vos besoins.",
                    "Cliquez sur le bouton Démarrer pour lancer le diagnostic."
                ]
            }]
        },
        softup: {
            TITLE: "Mise à niveau du microprogramme",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Une mise à jour logicielle ajoute de nouvelles fonctionnalités et corrige des problèmes du système d'exploitation du routeur afin d'en améliorer les performances. Quand une nouvelle mise à jour est disponible, vous êtes avertis par une icône spécifique dans le coin supérieur gauche de l'interface. Cliquer sur l'icône pour accéder à la page de mise à jour logicielle."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>IMPORTANT : Merci de suivre les instructions pour éviter un échec de la mise à jour.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Avant de procéder :",
                content: [
                    "Connecter votre ordinateur au routeur par un cordon Ethernet. Il n'est PAS recommandé de procéder à la mise à jour en Wi-Fi.",
                    "Débrancher les périphériques de stockage USB du routeur.",
                    "Faire une copie de sauvegarde des paramètres du routeur."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Pendant la mise à jour :<br>Maintenir le routeur sous tension et ne pas intervenir sur le routeur."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Pour une mise à jour via internet."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Cliquer sur Mise à jour et confirmer quand on vous le demande. Le routeur va télécharger et installer la dernière mise à jour automatiquement, avant de redémarrer.<br><b>Remarque</b> : Vous aurez peut-être au préalable besoin de cliquer sur Vérifier les mises à jour pour connaitre l'existence d'une mise à jour."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Pour une mise à jour manuelle."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Consultez www.tp-link.fr et télécharger la mise à jour la plus récente depuis la page support du routeur. Assurez-vous que le fichier que vous téléchargez correspond à la version matérielle de votre routeur.",
                    "Cliquer sur <b>Naviguer</b> et sélectionner le fichier de mise à jour (préalablement désarchivé).",
                    "Cliquer sur <b>Mettre à jour</b>.  La mise à jour prend quelques instants pour s'installer. Le routeur redémarrera automatiquement à l'issue."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Avant la mise à niveau du microprogramme du routeur, il faut télécharger la dernière mise à jour du microprogramme depuis la <page href='http://www.tp-link.com/en/download-center.html'>TP-LINK du centre de téléchargement de TP-LINK</a> vers votre ordinateur."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>IMPORTANT :</B> Pour éviter l’échec de la mise à niveau, notez bien ce qui suit :",
                content: [
                    "Vérifiez que le dernier fichier du microprogramme correspond à la version du matériel (comme indiqué à la page <b>Mise à niveau du microprogramme</b>). ",
                    "Assurez-vous que connexion entre le routeur et votre ordinateur est stable. Il n’est <b>PAS</b> recommandé de mettre le microprogramme à niveau à travers une connexion Wi-Fi.",
                    "Veillez à retirer tous les dispositifs de stockage USB connectés au routeur avant la mise à niveau du microprogramme, pour éviter toute perte de données.",
                    "Sauvegardez la configuration de votre routeur.",
                    "N’éteignez pas le routeur pendant la mise à niveau du microprogramme."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Pour mettre à niveau le microprogramme du routeur",
                content: [
                    "Cliquez sur <b>Parcourir</b>.",
                    "Localisez et sélectionnez le fichier du microprogramme téléchargé.",
                    "Cliquez sur <b>Mettre à niveau</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Sauvegarde",
            CONTENT: [{
                type: "paragraph",
                content: "Il est vivement recommandé de sauvegarder vos configurations actuelles, pour le cas où une récupération s’avère nécessaire pour restaurer le système à un état antérieur ou à partir des paramètres d'usine."
            }, {
                type: "paragraph",
                content: "Cliquez sur <b>Sauvegarder</b> pour enregistrer vos configurations actuelles dans votre ordinateur. Veillez bien à enregistrer le fichier de sauvegarde dans un emplacement sûr d’où vous puissiez le récupérer ultérieurement s’il vous fallait restaurer le routeur."
            }, {
                type: "title",
                content: "Restaurer"
            }, {
                type: "note",
                title: "Pour restaurer à partir d'une copie de sauvegarde",
                content: [
                    "Cliquez sur <b>Parcourir</b>.",
                    "Localisez et sélectionnez le fichier de sauvegarde.",
                    "Cliquez sur <b>Restaurer</b>."
                ]
            }, {
                type: "title",
                content: "Restauration aux paramètres d’usine."
            }, {
                type: "paragraph",
                content: "Cliquez sur <b>Retour paramètres usine</b> pour réinitialiser votre routeur aux paramètres d’usine par défaut."
            }, {
                type: "note",
                title: "Note:",
                content: [
                    "La fonction Factory Restore (retour aux paramètres d’usine) réinitialisera tous les paramètres du routeur que vous avez configurés, et leur redonnera les valeurs d’usine par défaut. Une fois le routeur restauré et redémarré, créez un nouveau mot de passe pour vous reconnecter à la page de gestion Web.",
                    "N’ÉTEIGNEZ PAS le routeur pendant les processus de sauvegarde ni de restauration."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Gestion de compte",
            CONTENT: [{
                type: "paragraph",
		display: "$.helpControl.cloudLogin",
                content: "Depuis cette page, votre mot de passe de connexion peut être modifié."
            }, /*{
                type: "name",
                title: "Ancien nom d’utilisateur",
                content: "Saisissez votre nom d’utilisateur actuel."
            }, */{
                type: "name",
                title: "Ancien mot de passe",
                content: "Saisissez votre mot de passe actuel."
            }, /*{
                type: "name",
                title: "Nouveau nom d’utilisateur",
                content: "Saisissez votre nouveau nom d’utilisateur."
            }, */{
                type: "name",
                title: "Nouveau mot de passe",
                content: "Saisissez votre nouveau mot de passe."
            }, {
                type: "name",
                title: "Confirmez le nouveau mot de passe",
                content: "Confirmez votre nouveau mot de passe."
            }, {
                type: "title",
                content: "Administration locale"
            }, {
                type: "paragraph",
                content: "La administration locale vous permet d’autoriser un dispositif client spécifique à accéder à votre réseau et à gérer le routeur en utilisant l’authentification par adresse MAC."
            }, {
                type: "name",
                title: "Port",
                content: "Saisissez le numéro de port compris entre 1024 et 65535 à utiliser pour accéder au routeur. Le chiffre par défaut est 80."
            }, {
                type: "name",
                title: "Adresse IP/MAC",
                content: "Saisissez une adresse IP locale valide ou une adresse MAC du dispositif qui doit être autorisé à accéder au routeur."
            }, {
                type: "title",
                content: "Administration à distance"
            }, {
                type: "paragraph",
                content: "La fonction de administration à distance vous permet d’accéder à votre routeur et de le configurer à distance sur Internet."
            }, {
                type: "name",
                title: "Administration à distance",
                content: "Cochez la case pour activer la fonction de administration à distance."
            }, {
                type: "name",
                title: "Port",
                content: "Saisissez le numéro du port, compris entre 1024 and 65535, à utiliser pour accéder au routeur avec la plus haute sécurité. Normalement, les navigateurs Web utilisent le port HTTP standard (80)."
            }, {
                type: "name",
                title: "Adresse IP/MAC",
                content: "Saisissez une adresse IP locale valide ou une adresse MAC devant autoriser l’accès au routeur."
            }]
        },
        log: {
            TITLE: "Journal système",
            CONTENT: [{
                type: "paragraph",
                content: "La page Journal système affiche une liste des activités (événements) les plus récentes du routeur. Il est possible de définir quels types de journaux et/ou quel niveau de journaux vont être vus. Cette page permet également au routeur d’exporter le journal système vers un ordinateur, o d’envoyer automatiquement le journal système à un serveur distant spécifique."
            }, {
                type: "name",
                title: "Type",
                content: "Sélectionnez le type de journal système à afficher."
            }, {
                type: "name",
                title: "Niveau",
                content: "Sélectionnez le niveau de journal système à afficher."
            }, {
                type: "name",
                title: "Actualiser",
                content: "Cliquez sur cette icône pour mettre à jour le journal système."
            }, {
                type: "name",
                title: "Supprimer tout",
                content: "Cliquez sur cette icône pour supprimer tous les journaux système."
            }, {
                type: "name",
                title: "Paramètres journal",
                content: "Cliquez pour définir les paramètres du fichier journal.",
                children: [{
                    type: "name",
                    title: "Enregistrer localement",
                    content: "Sélectionnez de mettre en cache le journal système pour la mémoire locale de votre routeur. Le journal s’affichera dans le tableau de la page Journal système.",
                    children: [{
                        type: "name",
                        title: "Niveau minimal",
                        content: "Sélectionnez le niveau minimal de journal système à enregistrer depuis la liste déroulante. La liste est en ordre décroissant, le niveau le plus bas se trouvant à la fin de la liste."
                    }]
                }, {
                    type: "name",
                    title: "Enregistrer à distance",
                    content: "Sélectionnez d’envoyer le journal système à un serveur distant. Si un client visionneuse de journal ou un outil renifleur est implémenté dans le serveur distant, le journal système peut être vu et analysé à distance en temps réel.",
                    children: [{
                        type: "name",
                        title: "Niveau minimal",
                        content: "Sélectionnez le niveau minimal de journal système à enregistrer depuis la liste déroulante. La liste est en ordre décroissant, le niveau le plus bas se trouvant à la fin de la liste."
                    }, {
                        type: "name",
                        title: "IP du serveur",
                        content: "Spécifiez l’adresse IP du serveur de journal système distant."
                    }, {
                        type: "name",
                        title: "Port du serveur",
                        content: "Spécifiez le numéro de port du serveur de journal système distant."
                    }, {
                        type: "name",
                        title: "Nom de l’installation locale",
                        content: "Sélectionnez le nom de l’installation locale du serveur distant dans la liste déroulante."
                    }]
                }]
            }, {
                type: "name",
                title: "Enregistrer le journal",
                content: "Cliquez sur ce bouton pour télécharger tous les journaux système dans votre ordinateur local."
            }]
        },
        snmp: {
            TITLE: "Paramètres SNMP",
            CONTENT: [{
                type: "name",
                title: "Agent SNMP",
                content: "Basculez sur On pour activer l’agent SNMP intégré qui permet au routeur de fonctionner comme rôle de travail dans la réception et le traitement des messages SNMP, en envoyant des réponses au gestionnaire SNMP et en déclenchant des interruptions SNMP lors de la survenue d’événements."
            }, {
                type: "name",
                title: "Communauté lecture seule",
                content: "Affiche la chaîne de communauté par défaut qui protège le routeur des accès non autorisés."
            }, {
                type: "name",
                title: "Communauté écriture",
                content: "Affiche la chaîne de communauté de lecture et d’écriture par défaut qui protège le routeur des modifications non autorisées."
            }, {
                type: "name",
                title: "Nom du système",
                content: "Affiche le nom assigné administrativement de ce dispositif géré."
            }, {
                type: "name",
                title: "Description du système",
                content: "Affiche la description textuelle du dispositif géré.  Cette valeur doit inclure le nom et l’identification de la version complets du type de matériel du système, du système d’exploitation du logiciel et du logiciel de réseautage."
            }, {
                type: "name",
                title: "Emplacement du système",
                content: "Affiche l’emplacement physique de ce dispositif (p. ex. « armoire téléphonique, 3e étage »).  "
            }, {
                type: "name",
                title: "Contact système",
                content: "Affiche l’identification textuelle de la personne à joindre au sujet de ce dispositif géré, avec les informations sur la manière de joindre cette personne."
            }, {
                type: "name",
                title: "IP du gestionnaire d’interruptions",
                content: "Affiche l’adresse IP de l’hôte qui doit recevoir les interruptions."
            }]
        },
        stat: {
            TITLE: "Statistiques de trafic",
            CONTENT: [{
                type: "name",
                title: "Statistiques de trafic",
                content: "Basculez sur ON pour activer la fonction Statistiques de trafic."
            }, {
                type: "title",
                content: "Liste des statistiques de trafic"
            }, {
                type: "name",
                title: "Adresse IP/MAC",
                content: "Les adresses IP ou MAC des clients connectés."
            }, {
                type: "name",
                title: "Total de paquets",
                content: "Le nombre total de paquets reçus et transmis par le routeur."
            }, {
                type: "name",
                title: "Total d’octets",
                content: "Le nombre total d’octets reçus et transmis par le routeur."
            }, {
                type: "name",
                title: "Paquets actuels",
                content: "Le nombre total de paquets reçus et transmis à un intervalle de temps spécifique (en secondes)."
            }, {
                type: "name",
                title: "Octets actuels",
                content: "Le nombre total d’octets reçus et transmis à un intervalle de temps spécifique (en secondes)."
            }, {
                type: "name",
                title: "Tx ICMP actuels",
                content: "Affiche le taux de transmission actuel des paquets ICMP transmis sur le port WAN, par rapport au taux maximal de transmission par seconde."
            }, {
                type: "name",
                title: "Tx UDP actuels",
                content: "Affiche la vitesse de transmission actuelle des paquets UDP transmis sur le port WAN, par rapport à la vitesse maximale de transmission par seconde."
            }, {
                type: "name",
                title: "Tx SYN actuels",
                content: "Affiche la vitesse de transmission actuelle des paquets ICMP transmis sur le port WAN, par rapport à la vitesse maximale de transmission par seconde."
            }, {
                type: "name",
                title: "Modifier",
                content: "Cliquez sur l’icône <b>Poubelle</b> pour supprimer les statistiques correspondantes."
            }, {
                type: "name",
                title: "Actualiser",
                content: "Cliquez pour mettre à jour les informations statistiques de la page."
            }, {
                type: "name",
                title: "Réinitialiser",
                content: "Cliquez pour remettre à zéro les valeurs statistiques de la liste."
            }, {
                type: "name",
                title: "Supprimer tout",
                content: "Cliquez pour supprimer toutes les informations statistiques de la liste."
            }]
        },
        ethWan: {
            TITLE: "Interface WAN",
            CONTENT: [{
                type: "title2",
                content: "Type de connexion : IP dynamique"
            }, {
                type: "name",
                title: "IP dynamique",
                content: "Sélectionnez ce type si vous disposez d’une connexion de serveur DHCP fournie par le fournisseur de services internet (FAI)."
            }, {
                type: "name",
                title: "Adresse IP/Masque de sous­réseau/Passerelle/Passerelle par défaut",
                content: "Ces paramètres sont automatiquement assignés par le serveur DHCP depuis votre FAI."
            }, {
                type: "name",
                title: "Renouveler/Libérer",
                content: "Cliquez sur ce bouton pour renouveler ou libérer les paramètres IP depuis votre FAI."
            }, {
                type: "name",
                title: "Avancé",
                children: [{
                    type: "name",
                    title: "Taille de la MTU (en octets)",
                    content: "La taille normale et par défaut de la MTU (Maximum Transmission Unit, unité de transmission maximale) sur la plupart des réseaux Ethernet est de <b>1500 octets</b>. Il n’est pas recommandé de modifier la taille par défaut de la MTU, sauf sur demande du FAI."
                }, {
                    type: "name",
                    title: "Proxy IGMP ",
                    content: "L’IGMP (Internet Group Management Protocol, Protocole de gestion de groupe Internet) s’utilise pour gérer la multidiffusion sur les réseaux TCP/IP. Certains FAI utilisent l’IGMP pour effectuer la configuration à distance du routeur. Il est activé par défaut."
                }, {
                    type: "name",
                    title: "Obtenir une IP en utilisant la monodiffusion de DHCP",
                    content: "Cochez cette case si le serveur DHCP de votre FAI ne prend pas en charge les applications de diffusion et que vous ne pouvez pas obtenir l’adresse IP de manière dynamique."
                }, {
                    type: "name",
                    title: "Utilisez l’adresse DNS suivante",
                    content: "Cochez cette case et saisissez la ou les adresses du serveur DNS fournie(s) par votre FAI en notation décimale séparée par des points. Cette interface WAN utilisera en priorité le serveur DNS spécifié."
                }, {
                    type: "name",
                    title: "Nom de l’hôte",
                    content: "Saisissez le nom d’hôte de cette interface WAN."
                }]
            }, {
                type: "title2",
                content: "Type de connexion : IP statique"
            }, {
                type: "name",
                title: "IP statique",
                content: "Sélectionnez ce type si vous disposez d’une adresse IP fixe spécifique, d’un masque de sous-réseau, d’une passerelle et de paramètres DNS fournis par le FAI."
            }, {
                type: "name",
                title: "Adresse IP/Masque de sous-réseau/Passerelle/Serveur DNS/Serveur DNS secondaire",
                content: "Saisissez les informations sur l’IP fournies par votre FAI en notation décimale séparée par des points."
            }, {
                type: "paragraph",
                content: "Cliquez sur <b>Avancé</b> pour voir plus de paramètres avancés."
            }, {
                type: "name",
                title: "Avancé",
                children: [{
                    type: "name",
                    title: "Taille de la MTU (en octets)",
                    content: "La taille normale et par défaut de la MTU (Maximum Transmission Unit, unité de transmission maximale) sur la plupart des réseaux Ethernet est de <b>1500 octets</b>. Il n’est pas recommandé de modifier la taille par défaut de la MTU, sauf sur demande du FAI."
                }, {
                    type: "name",
                    title: "Proxy IGMP ",
                    content: "L’IGMP (Internet Group Management Protocol, Protocole de gestion de groupe Internet) s’utilise pour gérer la multidiffusion sur les réseaux TCP/IP. Certains FAI utilisent l’IGMP pour effectuer la configuration à distance du routeur. Il est activé par défaut."
                }]
            }, {
                type: "title2",
                content: "Type de connexion : PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Sélectionnez ce type si vous utilisez une DSL (Digital Subscriber Line, Ligne d’abonné numérique) et disposez d’un nom d’utilisateur et d’un mot de passe fourni par le FAI."
            }, {
                type: "name",
                title: "Nom d’utilisateur PPPoE/Mot de passe PPPoE/Confirmez le mot de passe",
                content: "Saisissez le nom d’utilisateur et le mot de passe fournis par votre FAI. Ces champs sont sensibles à la casse."
            }, {
                type: "name",
                title: "Connexion secondaire",
                content: "Il n’est disponible que pour la connexion PPPoE. Si votre FAI vous fournit un type de connexion supplémentaire comme une IP dynamique ou statique pour se connecter à un réseau local, alors vous pouvez sélectionner le bouton radio de l’IP dynamique ou statique pour activer cette connexion secondaire. <br>La connexion secondaire est désactivée par défaut, donc seule la connexion PPPoE est disponible. Ne l’activez que si c’est nécessaire."
            }, {
                type: "name",
                title: "Mode de connexion",
                content: "Sélectionnez un des modes de connexion ci-dessous qui déterminent comment se connecter à Internet :",
                children: [{
                    type: "name",
                    title: "Toujours",
                    content: "Sélectionnez ce mode pour que la reconnexion soit automatique lors de chaque déconnexion."
                }, {
                    type: "name",
                    title: "Se connecter sur demande",
                    content: "Sélectionnez ce mode pour vous déconnecter d’Internet selon le temps d’inactivité spécifique (Max Idle Time, Temps maximal d’inactivité). La connexion se rétablit lorsque vous essayez de vous reconnecter à Internet."
                }, {
                    type: "name",
                    title: "Se connecter manuellement",
                    content: "Sélectionnez ce mode pour vous connecter à Internet ou vous en déconnecter manuellement, ou selon le temps d’inactivité spécifique (Max Idle Time, Temps maximal d’inactivité)."
                }, {
                    type: "name",
                    title: "Temps max. d’inactivité",
                    content: "<b>15 minutes</b> - Saisissez un nombre de minutes pendant lesquelles la connexion Internet peut rester inactive avant d’être interrompue. Le temps d’inactivité par défaut est de 15 minutes."
                }]
            }, {
                type: "name",
                title: "Type d’authentification",
                content: "Sélectionnez un type d’authentification dans la liste déroulante. La méthode par défaut est AUTO_AUTH."
            }, {
                type: "name",
                title: "Se connecter/Se déconnecter",
                content: "Cliquez pour vous connecter o vous déconnecter immédiatement."
            }, {
                type: "paragraph",
                content: "Cliquez sur <b>Avancé</b> pour voir plus de paramètres avancés."
            }, {
                type: "name",
                title: "Avancé",
                children: [{
                    type: "name",
                    title: "Nom du service",
                    content: "Saisissez le nom du service fourni par votre FAI. Si non, laissez le champ vide."
                }, {
                    type: "name",
                    title: "Nom du serveur",
                    content: "Saisissez le nom du serveur fourni par votre FAI. Si non, laissez le champ vide."
                }, {
                    type: "name",
                    title: "Taille de la MTU (en octets)",
                    content: "La taille de MTU normale (Maximum Transmission Unit, Unité de transmission maximale) pour les réseaux Ethernet est de 1480 octets.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Remarque</b> : Dans quelques rares cas, votre FSI peut vous demander de régler la taille de la MTU pour une meilleure performance du réseau. Ne changez pas la valeur sauf nécessité absolue."
                    }]
                }, {
                    type: "name",
                    title: "Proxy IGMP ",
                    content: "L’IGMP (Internet Group Management Protocol, Protocole de gestion de groupe Internet) s’utilise pour gérer la multidiffusion sur les réseaux TCP/IP. Certains FAI utilisent l’IGMP pour effectuer la configuration à distance du routeur. Il est activé par défaut."
                }, {
                    type: "name",
                    title: "Utiliser l’IP spécifiée par le fournisseur de services Internet",
                    content: "Sélectionnez cette option et saisissez l’adresse IP fournie par votre FAI."
                }, {
                    type: "name",
                    title: "Intervalle de demande d’écho",
                    content: "Saisissez une valeur d’intervalle de temps comprise entre 0 et 120 (en secondes) pour laquelle le routeur demande au concentrateur d’accès un écho à chaque intervalle. La valeur par défaut est 30. Le 0 représente la non détection."
                }, {
                    type: "name",
                    title: "Utilisez l’adresse DNS suivante",
                    content: "Cochez cette case et saisissez la ou les adresses du serveur DNS fournie(s) par votre FAI en notation décimale séparée par des points. Cette interface WAN utilisera en priorité le serveur DNS spécifié."
                }]
            }, {
                type: "title2",
                content: "Type de connexion : L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Sélectionnez ce type si vous vous connectez à un serveur VPN L2TP ou PPTP VPN et que vous disposez d’un nom d’utilisateur, d’un mot de passe et d’une adresse IP ou d’un nom de domaine du serveur fournis par votre FAI."
            }, {
                type: "name",
                title: "Nom d’utilisateur/Mot de passe",
                content: "Saisissez le nom d’utilisateur et le mot de passe fournis par votre FAI. Ces champs sont sensibles à la casse."
            }, {
                type: "name",
                title: "Adresse IP/DNS primaire",
                content: "Ces paramètres sont automatiquement assignés par le serveur DHCP depuis votre FAI."
            }, {
                type: "name",
                title: "Connexion secondaire (IP dynamique ou statique)",
                children: [{
                    type: "name",
                    title: "IP dynamique",
                    content: "Sélectionnez-les si l’adresse IP et le masque de sous-réseau sont assignés automatiquement par votre FAI."
                }, {
                    type: "name",
                    title: "IP statique",
                    content: "Sélectionnez-les si l’adresse IP, le masque de sous-réseau, la passerelle et les adresses DNS sont fournis par votre FAI, et saisissez ces informations dans les champs correspondants."
                }]
            }, {
                type: "name",
                title: "IP du serveur VPN/Nom de domaine",
                content: "Saisissez l’adresse IP ou le nom de domaine du serveur VPN fourni par votre FAI."
            }, {
                type: "name",
                title: "Taille de la MTU",
                content: "La taille normale et par défaut de la MTU (Maximum Transmission Unit, unité de transmission maximale) sur la plupart des réseaux Ethernet est de 1460 octets (1420 pour le PPTP). Ne modifiez pas la taille de la MTU par défaut, sauf sur demande de votre FAI."
            }, {
                type: "name",
                title: "Mode de connexion",
                content: "Sélectionnez un mode de connexion approprié, qui détermine comment vous connecter à Internet.",
                children: [{
                    type: "name",
                    title: "Toujours activée",
                    content: "Dans ce mode, la connexion à Internet se rétablit automatiquement lors de chaque déconnexion."
                }, {
                    type: "name",
                    title: "Se connecter sur demande",
                    content: "Dans ce mode, la connexion à Internet s'interrompra automatiquement à l’expiration d’un temps d’inactivité spécifié (Temps max. d'inactivité). La connexion se rétablit lorsque vous essayez de vous reconnecter à Internet."
                }, {
                    type: "name",
                    title: "Se connecter manuellement",
                    content: "Dans ce mode, la connexion à Internet est contrôlée manuellement en cliquant sur le bouton Connecter ou Déconnecter. Ce mode prend également en charge la fonction de temps max. d'inactivité. Saisissez un temps maximum d’inactivité (en minutes) spécifiant le temps maximal pendant lequel la connexion peut rester inactive avant de s’interrompre. La valeur par défaut est de 15 minutes. Si vous souhaitez que la connexion reste active indéfiniment, saisissez 0 (zéro)."
                }]
            }, {
                type: "title",
                content: "Clonage MAC"
            }, {
                type: "name",
                title: "Utiliser l’adresse MAC par défaut",
                content: "Sélectionnez cette option pour utiliser l’adresse MAC par défaut, au cas où le FAI n’aurait pas assigné une adresse à l’adresse MAC du routeur."
            }, {
                type: "name",
                title: "Utiliser l’adresse MAC de l’ordinateur actuel",
                content: "Sélectionnez cette option pour utiliser l’adresse MAC de l’ordinateur actuellement connecté, au cas où le FAI n’autorise l’accès à Internet que de cet ordinateur."
            }, {
                type: "name",
                title: "Utiliser l’adresse MAC personnalisée",
                content: "Sélectionnez cette option pour saisir manuellement l’adresse MAC inscrite."
            }]
        },
        route: {
            TITLE: "Routage avancé",
            CONTENT: [{
                type: "paragraph",
                content: "Le routage avancé est utilisé pour prédéterminer un itinéraire fixe pour que les paquets d’informations du réseau atteignent un hôte ou un réseau spécifique."
            }, {
                type: "title",
                content: "Routage statique"
            }, {
                type: "name",
                title: "Adresse IP de destination/Masque de sous-réseau/Passerelle",
                content: "Affiche l’adresse IP, le masque de sous-réseau et la passerelle de destination de l’itinéraire statique."
            }, {
                type: "name",
                title: "Activer",
                content: "Indique le statut actuel d’un itinéraire statique. Cliquez sur l’icône de l’<b>ampoule</b>  pour activer (ou désactiver) l’itinéraire statique."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour <b>Modifier</b> ou <b>Supprimer</b> l’entrée correspondante."
            }, {
                type: "note",
                title: "Pour configurer un routage statique",
                content: [
                    "Cliquez sur <b>Ajouter</b>.",
                    "Saisissez une adresse IP de destination pour assigner l’itinéraire statique à cette entrée.",
                    "Entrez un masque de sous-réseau au format hexadécimal pour déterminer la portion réseau et la portion hôte de l’adresse IP.",
                    "Saisissez un format d’adresse IP de passerelle pour connecter le routeur au réseau ou à l’hôte.",
                    "Sélectionnez <b>LAN</b> ou une interface WAN pour spécifier le type de l’adresse IP de destination.",
                    "Sélectionnez <b>Activer cette entrée</b>.",
                    "Cliquez sur <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Table de routage système"
            }, {
                type: "paragraph",
                content: "Le table de routage système affiche toutes les entrées d’itinéraires valides actuellement en cours d’utilisation."
            }, {
                type: "paragraph",
                content: "Cliquez sur Actualiser pour mettre à jour le tableau de routage."
            }]
        },
        ddns: {
            TITLE: "Paramètres DNS dynamiques",
            CONTENT: [{
                type: "paragraph",
                content: "Le DNS Dynamique (DDNS) vous permet d'assigner un nom de domaine à une adresse IP dynamique. C'est utile quand vous hébergez votre propre site WEB, Serveur FTP, ou tout autre serveur placé en aval de votre routeur. Premièrement vous devez retenir un nom de domaine auprès d'un fournisseur de DNS Dynamique tel: www.dyndns.com."
            }, {
                type: "step",
                title: "Pour paramétrer un DNS Dynamique",
                content: [
                    "Sélectionner le fournisseur de service de DNS Dynamique.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Saisir le nom de domaine réservé chez le fournisseur de service DDNS.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Si vous voulez utiliser un autre compte DDNS, déconnectez vous de celui actif puis connectez vous au nouveau compte."
            }]
        },
        dhcp: {
            TITLE: "Serveur DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "Le serveur DHCP (Dynamic Host Configuration Protocol, protocole de configuration d’hôte dynamique) assigne de manière dynamique une configuration TCP/IP aux dispositifs clients à partir d’un pool d’adresses IP. NE DÉSACTIVEZ PAS le serveur DHCP par défaut, à moins que vous n’ayez un autre serveur DHCP ou ne vouliez assigner la configuration TCP/IP manuellement aux clients individuels dans votre réseau."
            }, {
                type: "name",
                title: "Pool d’adresses IP",
                content: "Saisissez la plage des adresses IP qui peuvent être cédées aux clients."
            }, {
                type: "name",
                title: "Durée du bail",
                content: "Saisissez le durée du bail d’une adresse IP à un client (valeur comprise entre 1 et 2880 minutes)."
            }, {
                type: "name",
                title: "Passerelle par défaut",
                content: "Saisissez l’adresse IP du LAN. (Facultatif)"
            }, {
                type: "name",
                title: "Serveur DNS/Serveur DNS secondaire",
                content: "Saisissez les adresses du serveur DNS fournies par votre FAI. (Facultatif)"
            }, {
                type: "title",
                content: "Liste des clients"
            }, {
                type: "name",
                title: "Total clients",
                content: "Affiche le nombre total de clients DHCP associés."
            }, {
                type: "name",
                title: "Nom du client",
                content: "Affiche le nom du client DHCP."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC."
            }, {
                type: "name",
                title: "Adresse IP assignée",
                content: "Affiche l’adresse IP assignée au client par le serveur DHCP."
            }, {
                type: "name",
                title: "Durée du bail",
                content: "Affiche la durée de la cession de l’adresse IP au client."
            }, {
                type: "name",
                title: "Actualiser",
                content: "Cliquez pour mettre à jour la liste des clients DHCP."
            }, {
                type: "title",
                content: "Réservation d’adresse"
            }, {
                type: "paragraph",
                content: "Une adresse IP peut être réservée manuellement pour un client qui est connecté au routeur. Une fois réservée, l’adresse IP ne sera assignée qu’à ce même client par le serveur DHCP."
            }, {
                type: "name",
                title: "Adress MAC",
                content: "Affiche l’adresse MAC du client avec l’adresse IP réservée par le DHCP."
            }, {
                type: "name",
                title: "Adresse IP réservée",
                content: "Affiche l’adresse IP réservée du client."
            }, {
                type: "name",
                title: "Description",
                content: "Affiche la description du dispositif."
            }, {
                type: "name",
                title: "Activer",
                content: "Cliquez pour activer ou désactiver l’entrée correspondante."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour <b>Modifier</b> ou <b>Supprimer</b> le client correspondant."
            }, {
                type: "note",
                title: "Pour réserver une adresse IP pour un DHCP",
                content: [
                    "Cliquez sur <b>Ajouter</b>.",
                    "Saisissez l’<b>adresse MAC</b> du client.",
                    "Saisissez l’adresse IP que vous voulez réserver pour le client.",
                    "Saisissez la description du dispositif.",
                    "Sélectionnez <b>Activer cette entrée</b>.",
                    "Cliquez sur <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Pour modifier ou supprimer un client existant",
                content: [
                    "Cliquez sur <b>Modifier</b> ou sur l’icône de <b>Poubelle</b> dans l’entrée correspondante."
                ]
            }, {
                type: "title",
                content: "Conditions pour la plage d'adresse IP"
            }, {
                type: "name",
                title: "ID du fournisseur/Adresse IP de démarrage/Adresse IP de fin/Installation",
                content: "Affiche l’ID du fournisseur, l’adresse IP de démarrage, l’adresse IP de fin et l’installation du conditions pour la plage d'adresse IP."
            }, {
                type: "name",
                title: "Statut",
                content: "Indique le statut actuel du conditions pour la plage d'adresse IP. Cliquez sur l’icône de l’ampoule pour activer le conditions pour la plage d'adresse IP."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour <b>Modifier</b> ou <b>Supprimer</b> le client correspondant."
            }, {
                type: "note",
                title: "Pour ajouter un conditions pour la plage d'adresse IP",
                content: [
                    "Cliquez sur <b>Ajouter</b>.",
                    "Saisissez le nom du dispositif LAN.",
                    "Saisissez une valeur pour identifier le fournisseur et la fonctionnalité du client DHCP.",
                    "Saisissez l’adresse IP de démarrage que le serveur DHCP assigne aux clients.",
                    "Saisissez l’adresse IP de fin que le serveur DHCP assigne aux clients.",
                    "Saisissez la passerelle par défaut du serveur DHCP.",
                    "Sélectionnez un type de dispositif dans la liste déroulante.",
                    "Sélectionnez une option dans la liste déroulante.",
                    "Saisissez la valeur de l’option.",
                    "Sélectionnez <b>Activer cette entrée</b>.",
                    "Cliquez sur <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "Paramètres IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Sélectionnez d’activer la fonction IPTV."
            }, {
                type: "name",
                title: "Mode",
                content: "Sélectionnez le mode approprié selon votre FAI. Il y a six modes IPTV :",
                children: [{
                    type: "name",
                    title: "Pont",
                    content: "Sélectionnez ceci si votre FAI ne figure pas dans la liste et qu’il n’y a pas d’autres paramètres prédéterminés.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Assignez votre port LAN de manière à ce qu’il fonctionne soit comme le fournisseur d’Internet, soit comme le fournisseur d’IPTV."
                    }]
                }, {
                    /*type: "name",
                    title: "Russie",
                    content: "Sélectionnez ceci si votre FAI est basé en Russie et que les paramètres nécessaires sont prédéterminés, y compris Internet/Téléphone sous IP/ID et priorité VLAN IPTV, and port LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "ID/Priorité de VLAN multidiffusion IPTV",
                        content: "La fonction multidiffusion IPTV peut âtre activée à volonté, et l’ID et la priorité du VLAN ID peuvent être configurés selon votre FAI."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapour-ExStream",
                    content: "Sélectionnez ceci si votre FAI est ExStream de Singapour, et que les paramètres nécessaires sont prédéterminés, y compris Internet/Téléphone sous IP/IPTV et priorité VLAN ID, et le port LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaisie-Unifi",
                    content: "Sélectionnez ceci si votre FAI est ExStream de Singapour, et que les paramètres nécessaires sont prédéterminés, y compris Internet/Téléphone sous IP/ID et priorité VLAN ID, et le port LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaisie-Maxis",
                    content: "Sélectionnez ceci si votre FAI est basé en Russie et que les paramètres nécessaires sont prédéterminés, y compris Internet/Téléphone sous IP/ID et priorité VLAN ID, et le port LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Personnalisé",
                    content: "Sélectionnez ceci si votre FAI n’est pas sur la liste mais fournit  les paramètres, y compris Internet/Téléphone sous IP/IPTV et priorité VLAN ID, et le port LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "Internet/IP-Phone/IPTV VLAN ID/Priority",
                        content: "Configure the VLAN IDs as provided by your ISP."
                    }, {
                        type: "name",
                        title: "Balise 802.11Q",
                        content: "Sélectionnez si baliser les paquets Internet avec 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Assignez votre port LAN de manière à ce qu’il fonctionne soit comme le fournisseur d’Internet, soit comme le fournisseur d’IPTV."
                    }, {
                        type: "name",
                        title: "Malaisie-Unifi",
                        content: "A choisir si votre FAI basé en Malaisie est Unifi et que les paramètres sont prédéterminés, incluant Internet/ID Vlan IPTV et priorité, et fonctions port LAN 1/2/3/4."
                    }]
                }]
            }, {
                type: "name",
                title: "Proxy IGMP ",
                content: "Sélectionnez la version du proxy de l’IGMP (Internet Group Management Protocol, Protocole de gestion de groupes Internet), V2 ou V3 selon votre FAI."
            }]
        },
        usbManage: {
            TITLE: "Dispositif de stockage USB",
            CONTENT: [{
                type: "paragraph",
                content: "L’écran <b>Périphérique de stockage USB</b> affiche les informations de base sur le périphérique de stockage USB connecté à travers le port USB."
            }, {
                type: "name",
                title: "Recherche",
                content: "En général, le routeur détecte automatiquement tout nouveau périphérique raccordé. Sinon, cliquez sur ce bouton pour faire une recherche et actualiser l’écran avec les informations mises à jour."
            }, {
                type: "name",
                title: "Nom du volume",
                content: "Affiche le nom du volume USB."
            }, {
                type: "name",
                title: "Capacité",
                content: "Affiche la capacité totale de stockage du périphérique USB."
            }, {
                type: "name",
                title: "Espace libre",
                content: "Affiche l’espace de stockage libre actuellement disponible."
            }, {
                type: "name",
                title: "Actif",
                content: "Cette case à cocher ne s’affiche que si un périphérique de stockage USB est connecté au routeur. Sélectionnez d’activer le partage de fichiers du périphérique USB."
            }, {
                type: "name",
                title: "Retirer en toute sécurité",
                content: "Cliquez sur ce bouton pour démonter en toute sécurité le dispositif de stockage USB avant de le débrancher physiquement du routeur. Sachez bien que le bouton de retrait en toute sécurité ne s’affiche que si un dispositif de stockage USB est connecté au routeur. Gardez présent aussi que le dispositif USB ne peut pas être démonté s’il est en cours d’utilisation."
            }, {
                type: "title",
                content: "Paramètres de partage"
            }, {
                type: "name",
                title: "Nom du média/serveur réseau",
                content: "Affiche le nom utilisé pour accéder au périphérique de stockage USB connecté."
            }, {
                type: "title",
                content: "Dossier de partage"
            }, {
                type: "name",
                title: "Partager tout",
                content: "Basculez sur On pour partager tus les fichiers et dossiers, ou sur Off pour ne partager que les dossiers sélectionnés."
            }, {
                type: "name",
                title: "Activer l’authentification",
                content: "Basculez sur On pour activer l’authentification exigeant des utilisateurs de saisir un nom d’utilisateur et un mot de passe valides pour accéder à tous les dossiers partagés."
            }, {
                type: "name",
                title: "Nom du dossier",
                content: "Affiche le nom du dossier partagé. "
            }, {
                type: "name",
                title: "Chemin d’accès au dossier",
                content: "Affiche le chemin d’accès au dossier partagé. "
            }, {
                type: "name",
                title: "Nom du volume",
                content: "Affiche le nom du volume partagé."
            }]
        },
        printSrv: {
            TITLE: "Serveur d'impression",
            CONTENT: [{
                type: "name",
                title: "Activer le serveur d'impression",
                content: "Basculez sur On pour activer la fonction de srveur d'impression."
            }, {
                type: "name",
                title: "Nom de l'imprimante",
                content: "Affiche le nom de votre imprimante connéctée au routeur."
            }]
        },
        diskSettings: {
            TITLE: "Dispositif de stockage USB",
            CONTENT: [{
                type: "paragraph",
                content: "L’écran <b>Périphérique de stockage USB</b> affiche les informations de base sur le périphérique de stockage USB connecté à travers le port USB."
            }, {
                type: "name",
                title: "Recherche",
                content: "En général, le routeur détecte automatiquement tout nouveau périphérique raccordé. Sinon, cliquez sur ce bouton pour faire une recherche et actualiser l’écran avec les informations mises à jour."
            }, {
                type: "name",
                title: "Nom du volume",
                content: "Affiche le nom du volume USB."
            }, {
                type: "name",
                title: "Capacité",
                content: "Affiche la capacité totale de stockage du périphérique USB."
            }, {
                type: "name",
                title: "Espace libre",
                content: "Affiche l’espace de stockage libre actuellement disponible."
            }, {
                type: "name",
                title: "Actif",
                content: "Cette case à cocher ne s’affiche que si un périphérique de stockage USB est connecté au routeur. Sélectionnez d’activer le partage de fichiers du périphérique USB."
            }, {
                type: "name",
                title: "Retirer en toute sécurité",
                content: "Cliquez sur ce bouton pour démonter en toute sécurité le périphérique de stockage USB avant de le débrancher physiquement du routeur. Sachez bien que le bouton de retrait en toute sécurité ne s’affiche que si un périphérique de stockage USB est connecté au routeur. Gardez présent aussi que le périphérique USB ne peut pas être démonté si le volume actuel est en cours d’utilisation."
            }, {
                type: "note",
                title: "Pour configurer un serveur fichiers",
                content: [
                    "Raccordez le périphérique de stockage USB au port USB du routeur à l’aide d’un câble USB.",
                    "Dès que le nouveau périphérique USB est raccordé, il devrait être automatiquement détecté par le routeur et les informations sur celui-ci devraient s’afficher dans la section <b>Paramètres périphérique</b>. Si ce n’est pas le cas, cliquez sur <b>Analyser</b>.",
                    "Cliquez sur l’icône <b>Actif</b> pour activer le partage de fichiers."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Compte de partage",
            CONTENT: [{
                type: "name",
                title: "Compte",
                content: "Vous pouvez sélectionner soit d’<b>Utiliser le compte par défaut</b> pour se connecter aux fichiers et dossiers partagés, soit d’<b>Utiliser un nouveau compte</b> et de saisir ce qui suit pour créer un nouveau compte d’utilisateur."
            }, {
                type: "name",
                title: "Nom d’utilisateur/Mot de passe",
                content: "Saisissez jusqu’à 15 caractères comportant des lettres, des chiffres et/ou des tirets bas. Le nom d’utilisateur doit commencer par un caractère alphabétique. Ces champs sont sensibles à la casse. "
            }, {
                type: "paragraph",
                content: "Cliquez sur <b>Enregistrer</b> pour enregistrer le paramètres du compte."
            }, {
                type: "title",
                content: "Paramètres de partage"
            }, {
                type: "name",
                title: "Nom du serveur réseau/multimédia",
                content: "Affiche le nom utilisé pour accéder au périphérique de stockage USB connecté."
            }, {
                type: "name",
                title: "Activer",
                content: "Cochez la ou les cases pour activer la ou les méthodes d’accès correspondantes."
            }, {
                type: "name",
                title: "Méthode d’accès",
                content: "Il y a quatre méthodes pour accéder au périphérique de stockage USB partagé.",
                children: [{
                    type: "name",
                    title: "Serveur multimédia",
                    content: "Sélectionnez cette option pour permettre aux utilisateurs de votre réseau de visionner des photos, d’écouter de la musique ou de regarder des films stockés dans votre périphérique USB partagé depuis des dispositifs pris en charge par la DLNA, comme des ordinateur, des dispositifs mobiles ou des consoles de jeu (PS2/3)."
                }, {
                    type: "name",
                    title: "Voisinage réseau",
                    content: "Sélectionnez cette options pour permettre aux utilisateurs de votre réseau d’accéder aux contenus partagés par l’intermédiaire de l’adresse affichée sous la colonne Adresse."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Sélectionnez cette option pour activer la fonction du serveur FTP, qui permet aux clients FTP et aux utilisateurs de votre réseau d’accéder au périphérique de stockage USB par l’intermédiaire de l’adresse FTP affichée sous la colonne Adresse. Pour modifier le port du serveur FTP, saisissez un nouveau numéro de port et cliquez sur <b>Enregistrer</b> pour appliquer les modifications."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (via Internet)",
                    content: "Sélectionnez cette option pour permettre aux clients et utilisateurs du FTP d’accéder au périphérique de stockage USB partagé, d’en télécharger et d’y téléverser des fichiers, tout cela à distance à travers le FTP et sur Internet."
                }]
            }, {
                type: "name",
                title: "Accès",
                content: "Affiche l’adresse utilisée pour accéder au périphérique de stockage USB connecté."
            }, {
                type: "name",
                title: "Port",
                content: "Affiche le numéro de port du serveur FTP."
            }, {
                type: "title",
                content: "Dossier de partage"
            }, {
                type: "name",
                title: "Partager tout",
                content: "Basculez sur On pour partager tous les fichiers et dossiers, ou sur Off pour ne partager que les dossiers sélectionnés."
            }, {
                type: "name",
                title: "Activer l’authentification",
                content: "Basculez sur On pour activer l’authentification exigeant des utilisateurs de saisir un nom d’utilisateur et un mot de passe valides pour accéder à tous les dossiers partagés."
            }, {
                type: "name",
                title: "Nom du dossier",
                content: "Affiche le nom du dossier partagé. "
            }, {
                type: "name",
                title: "Chemin d’accès au dossier",
                content: "Affiche le chemin d’accès au dossier partagé. "
            }, {
                type: "name",
                title: "Partage de fichiers multimédias",
                content: "Affiche si la fonction de partage multimédia est activée (On) ou désactivée (Off)."
            }, {
                type: "name",
                title: "Nom du volume",
                content: "Affiche le nom du volume partagé."
            }, {
                type: "name",
                title: "Statut",
                content: "Indique le statut actuel d’un dossier partagé. Cliquez sur l’icône de l’ampoule pour activer (ou désactiver) le dossier de partage."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour <b>Modifier</b> ou <b>Supprimer</b> le dossier partagé correspondant."
            }, {
                type: "note",
                title: "Pour ajouter une entrée de dossier de partage :",
                content: [
                    "Basculez sur Off <b>Sélectionner tout</b>.",
                    "Cliquez sur <b>Ajouter</b>.",
                    "Sélectionnez le <b>Nom du volume</b> et <b>Chemin d’accès au dossier</b>.",
                    "Créer un nom de dossier.",
                    "Décidez de quelle manière partager le dossier : <br /><b>Activer authentification</b> - Sélectionnez d’exiger des utilisateurs l’authentification par un nom d’utilisateur et un mot de passe valides pour accéder aux dossiers partagés. <br /><b>Activer l’accès en écriture</b> - Sélectionnez de permettre aux utilisateurs de modifier le contenu du dossier. <br /><b>Activer le partage multimédia</b> - Sélectionnez d’activer le partage multimédia. <br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "Paramètres IPsec",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection (Détection de perte de pair)",
                content: "La Dead Peer Detection (Détection de perte de pair, DPD) est une méthode pour détecter la perte d’un pair d’échange de clés Internet (Internet Key Exchange, IKE). La DPD s’utilise pour récupérer les ressources perdues au cas où la perte d’un pair est découverte ; elle s’utilise aussi pour effectuer le basculement d’un pair IKE. Basculez sur ON pour activer la fonction de détection de perte de pair."
            }, {
                type: "name",
                title: "Nom de la connexion/Passerelle distante/Adresse locale/Adresse distante",
                content: "Affiche le nom de la connexion, la passerelle distante, l’adresse locale et l’adresse distante de l’entrée IPSec."
            }, {
                type: "name",
                title: "Statut",
                content: "Affiche le statut de l’entrée IPSec. Le statut comprend :",
                children: [{
                    type: "name",
                    title: "Désactivée",
                    content: "L’entrée est désactivée."
                }, {
                    type: "name",
                    title: "Descendre",
                    content: "L’entrée est activée, mais il n’y a pas de connexion."
                }, {
                    type: "name",
                    title: "Monter",
                    content: "L’entrée est activée et la connexion est établie avec succès. "
                }]
            }, {
                type: "name",
                title: "Activer",
                content: "Cliquez sur l’icône de l’<b>ampoule</b>  pour activer ou désactiver l’entrée."
            }, {
                type: "name",
                title: "Modifier",
                content: "Affiche les options pour <b>Modifier</b> ou <b>Supprimer</b> l’entrée correspondante."
            }, {
                type: "name",
                title: "Ajouter",
                content: "Cliquez pour ajouter une nouvelle connexion VPN IPSec."
            }, {
                type: "name",
                title: "Nom de la connexion IPSec",
                content: "Saisissez un nom pour la connexion VPN IPSec."
            }, {
                type: "name",
                title: "Adresse de la passerelle IPSec distante (URL)",
                content: "Saisissez l’adresse IP de la passerelle de destination qui est l’adresse IP du WAN public ou le nom de domaine du point de terminaison du serveur VPN distant."
            }, {
                type: "name",
                title: "Accès par tunnel depuis les adresses IP locales",
                content: "Sélectionnez l’adresse de sous-réseau si vous voulez que tout le LAN rejoigne le réseau VPN, ou sélectionnez Adresse unique si vous voulez qu’une seule adresse IP rejoigne le réseau VPN."
            }, {
                type: "name",
                title: "Adresse IP du VPN",
                content: "Saisissez l’adresse IP de votre LAN. "
            }, {
                type: "name",
                title: "Masque de sous-réseau de l’IP",
                content: "Saisissez le masque de sous-réseau de votre LAN."
            }, {
                type: "name",
                title: "Accès par tunnel depuis les adresses IP distantes",
                content: "Sélectionnez l’adresse du sous-réseau si vous voulez que tout le LAN distant rejoigne le réseau VPN, ou sélectionnez Adresse unique si vous voulez qu’une seule adresse IP rejoigne le réseau VPN."
            }, {
                type: "name",
                title: "Adresse IP du VPN",
                content: "Saisissez l’adresse IP du LAN distant. "
            }, {
                type: "name",
                title: "Masque de sous-réseau de l’IP",
                content: "Saisissez le masque de sous-réseau du LAN distant."
            }, {
                type: "name",
                title: "Méthode d’échange de clés",
                content: "Sélectionnez d’utiliser le mode automatique (IKE) ou manuel pour authentifier les pairs IPSec."
            }, {
                type: "name",
                title: "Méthode d’authentification",
                content: "Sélectionnez Pre-Shared Key (clé prépartagée) (recommandé)."
            }, {
                type: "name",
                title: "Clé prépartagée",
                content: "Créez une clé prépartagée à utiliser pour l'authentification."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy (Confidentialité persistante parfaite)",
                content: "Sélectionnez d’activer (ou de désactiver) la confidentialité persistante parfaite (PFS) comme protocole de sécurité supplémentaire pour la clé prépartagée."
            }, {
                type: "name",
                title: "Avancé",
                content: "Cliquez pour configurer les paramètres avancés. Nous vous recommandons de conserver les paramètres par défaut. Si vous voulez modifier ces paramètres, vérifiez que les deux points de terminaison du serveur VPN utilisent les mêmes algorithmes de chiffrement et d’intégrité, le même groupe Diffie-Hellman et la même durée de la clé, aussi bien dans la phase 1 que dans la phase 2.",
                children: [{
                    type: "title2",
                    content: "Phase 1"
                }, {
                    type: "name",
                    title: "Mode",
                    content: "Sélectionnez <b>Principal</b> pour configurer les paramètres de négociation standard pour l’IKE en phase 1. Sélectionnez <b>Agressif</b> pour configurer la phase 1 de l'IKE du tunnel VPN pour mener la négociation dans un temps plus limité. (Non recommandé, car la sécurité est moindre.)"
                }, {
                    type: "name",
                    title: "Type d’identifiant local",
                    content: "Sélectionnez le type d’identifiant local pour la négociation de l’IKE. L'IP du WAN local utilise une adresse IP comme identifiant dans une négociation d’IKE. FQDN (Fully Qualified Domain Name, Nom de domaine pleinement qualifié) utilise comme identifiant un nom d’utilisateur."
                }, {
                    type: "name",
                    title: "Identifiant local",
                    content: "L’identifiant local sera saisi automatiquement si vous sélectionnez <b>Adresse IP du WAN local</b>. Si vous sélectionnez <b>FQDN</b>, saisissez un nom d’utilisateur du dispositif local qui servira d’identifiant pour la négociation de l’IKE."
                }, {
                    type: "name",
                    title: "Type d’identifiant distant",
                    content: "Sélectionnez le type d’identifiant distant pour la négociation de l’IKE. L'IP distante du WAN utilise une adresse IP comme identifiant dans une négociation d’IKE. Le FQDN utilise comme identifiant un nom d’utilisateur."
                }, {
                    type: "name",
                    title: "Identifiant distant",
                    content: "L’adresse IP de la passerelle distante sera saisie automatiquement si vous sélectionnez <b>Adresse IP du WAN distant</b>. Si vous sélectionnez <b>FQDN</b>, saisissez un nom d’utilisateur du pair distant qui servira d’identifiant pour la négociation de l’IKE."
                }, {
                    type: "name",
                    title: "Algorithme de chiffrement",
                    content: "Sélectionnez un des algorithmes de chiffrement suivants pour la négociation de l’IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "La DES (Data Encryption Standard, Norme de chiffrement de données) chiffre un bloc de texte brut de 64 bits à l’aide d’une clé de 56 bits."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "La DES triple chiffre un texte brut à l’aide d’une clé de 168 bits."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 128 bits."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 192 bits."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 256 bits."
                    }]
                }, {
                    type: "name",
                    title: "Algorithme d’intégrité",
                    content: "Sélectionnez un des algorithmes d’intégrité suivants pour la négociation de l’IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "Le MD5 (Message Digest Algorithm, Algorithme de synthèse du message) prend un message de longueur arbitraire et génère une synthèse du message de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "Le SHA1 (Secure Hash Algorithm, Algorithme de hachage sécurisé) prend un message de moins de 264 bits et génère une synthèse du message de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Groupe Diffie-Hellman pour l’échange de clés",
                    content: "Sélectionnez le groupe Diffie-Hellman à utiliser dans la négociation de clé en phase 1. Le groupe Diffie‑Hellman définit la force de l’algorithme en bits."
                }, {
                    type: "name",
                    title: "Durée de vie de la clé",
                    content: "Saisissez le délai d’attente (en secondes) pour l’établissement d’une nouvelle association de sécurité (AS) IPSec avec le point de terminaison distant. La valeur par défaut est de 3600."
                }, {
                    type: "title2",
                    content: "Phase 2"
                }, {
                    type: "name",
                    title: "Algorithme de chiffrement",
                    content: "Sélectionnez un des algorithmes de chiffrement suivants pour la négociation de l’IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "La DES (Data Encryption Standard, Norme de chiffrement de données) chiffre un bloc de texte brut de 64 bits à l’aide d’une clé de 56 bits."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "La DES triple chiffre un texte brut à l’aide d’une clé de 168 bits."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 128 bits."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 192 bits."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Utilise pour le chiffrement l’algorithme AES et une clé de 256 bits."
                    }]
                }, {
                    type: "name",
                    title: "Algorithme d’intégrité",
                    content: "Sélectionnez un des algorithmes d’intégrité suivants pour la négociation de l’IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "Le MD5 (Message Digest Algorithm, Algorithme de synthèse du message) prend un message de longueur arbitraire et génère une synthèse du message de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "Le SHA1 (Secure Hash Algorithm, Algorithme de hachage sécurisé) prend un message de moins de 264 bits et génère une synthèse du message de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Groupe Diffie-Hellman pour l’échange de clés",
                    content: "Sélectionnez le groupe Diffie-Hellman à utiliser dans la négociation de clé en phase 2. Le groupe Diffie‑Hellman définit la force de l’algorithme en bits."
                }, {
                    type: "name",
                    title: "Durée de vie de la clé",
                    content: "Saisissez le délai d’attente (en secondes) pour l’établissement d’une nouvelle association de sécurité (AS) IPSec avec le point de terminaison distant. La valeur par défaut est de 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Configuration connexion Internet",
            CONTENT: [{
                type: "name",
                title: "Détection automatique",
                content: "Cliquez sur ce bouton pour que le routeur détecte automatiquement votre type de connexion Internet actuel."
            }, {
                type: "paragraph",
                title: "Remarque",
                content: "Si vous n’êtes pas sûr de votre type de connexion Internet, utilisez la fonction Détection automatique ou demandez de l’aide à votre FAI."
            }, {
                type: "title",
                title: "Type de connexion Internet : IP statique"
            }, {
                type: "name",
                title: "Adresse IP/Masque de sous-réseau/Passerelle par défaut/DNS primaire/DNS secondaire",
                content: "Saisissez les informations fournies par votre FAI."
            }, {
                type: "title",
                title: "Type de connexion Internet : IP dynamique"
            }, {
                type: "name",
                title: "NE CLONEZ PAS l’adresse MAC/Clonez l’adresse MAC de l’ordinateur actuel",
                content: "Sélectionnez de cloner ou pas votre adresse MAC, selon votre FAI."
            }, {
                type: "title",
                title: "Type de connexion Internet : PPPoE"
            }, {
                type: "name",
                title: "Nom d’utilisateur/Mot de passe",
                content: "Saisissez le nom d’utilisateur et le mot de passe fournis par votre FAI. Ces champs sont sensibles à la casse."
            }, {
                type: "title",
                title: "Type de connexion Internet : L2TP/PPTP"
            }, {
                type: "name",
                title: "Nom d’utilisateur/Mot de passe",
                content: "Saisissez le nom d’utilisateur et le mot de passe fournis par votre FAI. Ces champs sont sensibles à la casse."
            }, {
                type: "name",
                title: "Connexion secondaire (IP dynamique ou statique)",
                children: [{
                    type: "name",
                    title: "IP dynamique",
                    content: "Sélectionnez-les si l’adresse IP et le masque de sous-réseau sont assignés automatiquement par votre FAI."
                }, {
                    type: "name",
                    title: "IP statique",
                    content: " Sélectionnez-les si l’adresse IP, le masque de sous-réseau, la passerelle et les adresses DNS sont fournis par votre FAI, et saisissez ces informations dans les champs correspondants."
                }]
            }, {
                type: "name",
                title: "IP du serveur VPN/Nom de domaine",
                content: "Saisissez l’adresse IP ou le nom de domaine du serveur VPN fourni par votre FAI."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Serveur d'impression",
            CONTENT: [{
                type: "paragraph",
                content: "Vous pouvez configurer le serveur d’impression depuis cette page."
            }, {
                type: "name",
                title: "Serveur d'impression",
                content: "Indique le statut actuel (activé ou désactivé) du serveur d’impression."
            }, {
                type: "name",
                title: "Nom de l'imprimante",
                content: "Nom de l’imprimante connectée au routeur."
            }, {
                type: "note",
                title: "Suivez les instructions ci-dessous pour configurer votre serveur d'impression :",
                content: [
                    "Étape 1 : Connectez l’’mprimante USB au port USB du routeur à l’aide d’un câble d’imprimante USB.",
                    "Étape 2 :  Installez le logiciel pilote de l’imprimante dans votre ordinateur.",
                    "Étape 3 :  Installez le contrôleur d’imprimante USB TP-LINK dans votre ordinateur. Exécutez le CD d’installation ou téléchargez l’utilitaire de contrôle de l’imprimante USB TP-LINK depuis notre site Web : www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Paramètres Wi-Fi avancés 2.4GHz | 5GHz",
            CONTENT: [{
                type: "name",
                title: "Intervalle entre balises",
                content: "Saisissez une valeur comprise entre 25 et 1000 en millisecondes pour déterminer les intervalles auxquels chaque paquet de balises est émis par le routeur pour synchroniser le réseau Wi-Fi. La valeur par défaut est de 100 millisecondes."
            }, {
                type: "name",
                title: "Seuil RTS",
                content: "Saisissez une valeur comprise entre 1 et 2346 pour déterminer la taille des paquets de transmission de données à travers le routeur. Par défaut, la taille du seuil de RTS (Request to Send, demande d’envoi) est 2346. Si la taille du paquet dépasse le seuil prédéfini, le routeur envoie des trames de demandes d’envoi à une station de réception en particulier, et négocie l’envoi d’une trame de données, sans quoi le paquet sera envoyé immédiatement."
            }, {
                type: "name",
                title: "Intervalle DTIM ",
                content: "Saisissez une valeur comprise entre 1 et 255 pour déterminer l’intervalle du message de signalisation de trafic de distribution (DTIM). 1 indique que l’intervalle DTIM est le même que l’intervalle des balises."
            }, {
                type: "name",
                title: "Intervalle de génération",
                content: "Saisissez le nombre de secondes (30 au minimum) pour contrôler l’intervalle de temps de renouvellement automatique de la clé de chiffrement. La valeur par défaut est 0. Elle correspond au non renouvellement de la clé."
            }, {
                type: "name",
                title: "Fonction WMM",
                content: "La fonction WMM (Wi-Fi multi-media, Multimédias sur WiFi) garantit la transmission préférentielle des paquets contenant des messages à priorité élevée. Elle est vivement recommandée et est activée par défaut."
            }, {
                type: "name",
                title: "Fonction GI court",
                content: "Cette fonction augmente la capacité en données en réduisant le temps de l’intervalle de référence (Guard Interval, GI). Elle est recommandée et est activée par défaut."
            }, {
                type: "name",
                title: "Fonction d’isolation de PA",
                content: "Cochez cette case pour activer la fonction d’isolation des PA, qui permet de confiner et de restreindre  tous les dispositifs Wi-Fi de votre réseau, lesquels ne pourront pas interagir entre eux, mais auront accès à Internet. L’isolation des PA est désactivée par défaut."
            }, {
				display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Fonction Airtime Fairness",
                "content": "Cocher cette case pour activer la fonction Airtime Fairness (ATF) qui permet d'optimiser le débit de chaque flux. Le planificateur ATF réparti le temps de communication attribué à chaque clients pour optimiser le débit de transmission global instantané."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Fonction MIMO Multi utilisateurs",
                "content": "Cliquer pour activer la fonction MIMO Multi utilisateurs."
			},  {
				"type": "name",
				"title": "Réduction d'interférence du port USB 3.0",
				"content": "Cocher cette case pour activer la réduction d'interférence du port USB 3.0."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Activer le WPS",
                content: "Basculez sur ON pour activer la fonction WPS."
            }, {
                type: "paragraph",
                content: "Cliquez sur Enregistrer pour enregistrer vos paramètres."
            }, {
                type: "title",
                title: "DEL"
            }, {
                type: "name",
                title: "Mode nuit",
                content: "Quand cette fonction est activée, les DEL du routeur s’éteindront automatiquement pendant le temps spécifié."
            }, {
                type: "name",
                title: "Période",
                content: "Saisissez une période pendant laquelle les DEL du routeur s’éteindront."
            }, {
                type: "paragraph",
                content: "Cliquez sur Enregistrer pour enregistrer vos paramètres."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "Paramètres de niveau de la protection DoS"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Le niveau de protection du DoS protège le routeur des attaques par saturation TCP-SYN-Flood, UDP-Flood, et ICMP-Flood."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Niveau des paquets ICMP-FLOOD",
                content: "Saisissez une valeur comprise entre 5 et 3600 pour déclencher immédiatement la protection ICMP-FLOOD dès que le nombre de paquets dépasse le seuil prédéfini."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Niveau des paquets UDP-FLOOD",
                content: "Saisissez une valeur comprise entre 5 et 3600 pour déclencher immédiatement la protection UDP-FLOOD dès que le nombre de paquets dépasse le seuil prédéfini."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Niveau des paquets TCP-FLOOD",
                content: "Saisissez une valeur comprise entre 5 et 3600 pour déclencher immédiatement la protection TCP-SYN-FLOOD dès que le nombre de paquets dépasse le seuil prédéfini."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Cliquez sur Enregistrer pour enregistrer vos paramètres."
            }]
        },
        logConf: {
            TITLE: "Paramètres journal",
            CONTENT: [{
                type: "name",
                title: "Enregistrer localement",
                content: "Sélectionnez d’enregistrer les journaux dans votre mémoire locale.",
                children: [{
                    type: "name",
                    title: "Niveau minimal",
                    content: "Sélectionnez le niveau Minimum dans la liste déroulante, et tous les événements journalisés d’un niveau égal ou supérieur au niveau sélectionné seront enregistrés."
                }]
            }, {
                type: "name",
                title: "Enregistrer à distance",
                content: "Sélectionnez d’envoyer les journaux à l’adresse IP et au port UDP spécifiés du serveur de journal système distant.",
                children: [{
                    type: "name",
                    title: "Niveau minimal",
                    content: "Sélectionnez le niveau Minimum dans la liste déroulante, et tous les événements journalisés d’un niveau égal ou supérieur au niveau sélectionné seront enregistrés."
                }, {
                    type: "name",
                    title: "IP du serveur",
                    content: "Spécifiez l’adresse IP du serveur du journal système distant auquel vont être envoyés les événements."
                }, {
                    type: "name",
                    title: "Port du serveur",
                    content: "Spécifiez le numéro de port du serveur du journal système distant auquel vont être envoyés les événements."
                }, {
                    type: "name",
                    title: "Nom de l’installation locale",
                    content: "Sélectionnez le nom de l’installation locale selon le nom de l’installation de votre serveur distant."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Sans fil",
            CONTENT: [{
                type: "name",
                title: "Sécurité",
                content: "Vous pouvez sélectionner une des options de sécurité suivantes. ",
                children: [{
                    type: "name",
                    title: "Pas de sécurité",
                    content: "Les postes sans fil se connecteront au routeur sans aucun chiffrement. Il est vivement recommandé de choisir un des modes suivants pour activer la sécurité."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personnel",
                    content: "Sélectionnez le WPA fondé sur une phrase secrète prépartagée.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vous pouvez sélectionner une des versions suivantes",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Sélectionnez WPA-PSK ou WPA2-PSK fondés automatiquement sur les capacités et la demande du point d’accès sans fil."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Clé prépartagée du WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Vous pouvez sélectionnet Auto, TKIP ou AES."
                    }, {
                        type: "name",
                        title: "Mot de passe sans fil",
                        content: "Vous pouvez saisir des caractères ASCII ou hexadécimaux. Pour les hexadécimaux, la longueur doit être comprise entre 8 et 64 caractères ; pour les ASCII, elle doit être comprise entre 8 et 63 caractères."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Entreprise",
                    content: "Sélectionnez Fondé sur le WPA pour le serveur Radius.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vous pouvez sélectionner une des versions suivantes",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Sélectionnez WPA ou WPA2 fondés automatiquement sur les capacités et la demande du point d’accès sans fil."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Accès WiFi protégé. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA version 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Chiffrement",
                        content: "Vous pouvez sélectionnet Auto, TKIP ou AES."
                    }, {
                        type: "name",
                        title: "IP du serveur RADIUS",
                        content: "Saisissez l’adresse IP du serveur Radius."
                    }, {
                        type: "name",
                        title: "Port Radius",
                        content: "Saisissez le port qu’a utilisé le service radius."
                    }, {
                        type: "name",
                        title: "Mot de passe Radius",
                        content: "Saisissez le mot de passe du serveur Radius."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Sélectionnez la sécurité WEP 802.11.",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Vous pouvez sélectionner un des types suivants",
                        children: [{
                            type: "name",
                            title: "Automatique",
                            content: "Sélectionnez le type d’authentification Clé partagée ou Système ouvert fondé automatiquement sur la capacité et la demande du point d’accès sans fil."
                        }, {
                            type: "name",
                            title: "Clé partagée",
                            content: "Sélectionnez l’authentification par clé partagée 802.11."
                        }, {
                            type: "name",
                            title: "Système ouvert",
                            content: "Sélectionnez l’authentification par système ouvert 802.11. "
                        }]
                    }, {
                        type: "name",
                        title: "Clé sélectionnée",
                        content: "Sélectionnez laquelle des quatre clés sera utilisée."
                    }, {
                        type: "name",
                        title: "Format de clé WEP",
                        content: "Vous pouvez sélectionner le format ASCII ou hexadécimal. Le format ASCII accepte n’importe quelle combinaison de caractères clavier de la longueur stipulée. Le format hexadécimal accepte n’importe quelle combinaison de signes hexadécimaux (0-9, a-f, A-F) de la longueur stipulée."
                    }, {
                        type: "name",
                        title: "Type de clé",
                        content: "Vous pouvez sélectionner la longueur de clé WEP (64, 128 ou 152 bits) pour le chiffrement. « Désactivé » veut dire que cette entrée de clé WEP n’est pas valide.",
                        children: [{
                            type: "name",
                            title: "Pour chiffrement 64 bits",
                            content: "Vous pouvez saisir 10 signes hexadécimaux (toute combinaison 0-9, a-f, A-F, et la clé null n’est pas autorisée) ou 5 caractères ASCII."
                        }, {
                            type: "name",
                            title: "Pour chiffrement 128 bits",
                            content: "Vous pouvez saisir 26 signes hexadécimaux (toute combinaison 0-9, a-f, A-F, et la clé null n’est pas autorisée) ou 13 caractères ASCII."
                        }, {
                            type: "name",
                            title: "Pour chiffrement 152 bits",
                            content: "Vous pouvez saisir 32 signes hexadécimaux (toute combinaison 0-9, a-f, A-F, et la clé null n’est pas autorisée) ou 16 caractères ASCII. "
                        }]
                    }, {
                        type: "name",
                        title: "Valeur de clé",
                        content: "Saisissez le mot de passe pour la WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Ce champ détermine le mode sans fil dans lequel fonctionne le routeur."
            }, {
                type: "name",
                title: "Largeur du canal",
                content: "La largeur de bande du canal sans fil."
            }, {
                type: "name",
                title: "Canal",
                content: "Ce champ détermine la fréquence de travail qui sera utilisée. Il n’est pas nécessaire de modifier le canal sans fil à moins que des problèmes d’interférence ne se produisent avec un autre point d’accès proche. Si vous sélectionnez « Auto », le PA choisira le meilleur canal."
            }, {
                type: "name",
                title: "Puissance de transmission",
                content: "Ici, vous pouvez spécifier la puissance de transmission du routeur. Vous pouvez sélectionner Forte, Moyenne ou Faible, à votre gré. Le paramétrage par défaut, qui est recommandé, est Forte. "
            }, {
                type: "paragraph",
                content: "Cliquez sur Enregistrer pour <strong>enregistrer</strong> et appliquer la configuration."
            }]
        },
        diagnostic: {
            TITLE: "Outils diagnostiques",
            CONTENT: [{
                type: "paragraph",
                content: "Le routeur fournit les outils Ping et Traceroute pour vous aider à dépanner les problèmes de connectivité du réseau. L’outil Ping envoie des paquets à une adresse IP ou un nom de domaine cible et journalise les résultats, comme le nombre de paquets envoyés ou reçus, et le temps d’aller-retour. L’outil Traceroute envoie des paquets à une adresse IP ou un nom de domaine cible et affiche le nombre de tronçons et le temps mis pour atteindre la destination."
            }, {
                type: "paragraph",
                content: "Un dispositif réseau peut être soumis à Ping ou à Traceroute pour l’adresse IP ou pour un nom de domaine, comme google.com, yahoo.com, etc."
            }, {
                type: "note",
                title: "Pour diagnostiquer en utilisant Ping",
                content: [
                    "Saisissez l’adresse IP ou le nom de domaine cible.",
                    "Cliquez sur l’icône de la flèche pour ouvrir le menu Avancé et spécifiez le comptage Ping et la taille du paquet Ping. (Facultatif)",
                    "Cliquez sur Démarrer."
                ]
            }, {
                type: "note",
                title: "Pour diagnostiquer en utilisant Traceroute",
                content: [
                    "Saisissez l’adresse IP ou le nom de domaine cible.",
                    "Cliquez sur l’icône de la flèche pour ouvrir le menu Avancé et spécifiez le nombre de tronçons (à atteindre) dans le champ Traceroute Max. TTL (Time to Live, temps à vivre). La valeur par défaut est 20. (Facultatif)",
                    "Cliquez sur Démarrer."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "Adress MAC",
                content: "L’adresse physique unique du routeur."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IPv4 LAN",
                content: "Maintient l’adresse IP par défaut du routeur (192.168.0.1) ou saisissez-en une nouvelle. Cette adresse IP peut être utilisée pour journaliser dans la page de gestion Web du routeur."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Type d'adresse",
                "content": "Façons de configurer l'adresse IP du routeur. Vous pouvez la configurer manuellement (IP statique) ou automatiquement (Intelligent DHCP)."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Adresse IP du LAN",
                "content": "Maintient l’adresse IP par défaut du routeur (192.168.0.254) ou saisissez-en une nouvelle. Cette adresse IP peut être utilisée pour journaliser dans la page de gestion Web du routeur."
            }, {
                type: "name",
                title: "Masque de sous-réseau",
                content: "Sélectionnez dans la liste déroulante un identifiant assigné utilisé par le port Lan pour acheminer le trafic interne et externe, ou entrez un nouveau format de masque de sous-réseau. La valeur par défaut est de 255.255.255.0."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Surveillance de trafic IGMP",
                content: "L’IGMP (Internet Group Management Protocol, Protocole de gestion de groupe Internet) s’utilise pour gérer la multidiffusion sur les réseaux TCP/IP. Certains FSI utilisent l’IGMP pour effectuer la configuration à distance des dispositifs clients, comme celle du routeur. Il est activé par défaut."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Remarque",
                content: "Si l’adresse IP du nouveau LAN n’est pas dans le même sous-réseau que celle de l’ancien, le pool d’adresses IP du serveur DHCP sera automatiquement modifié ; cependant, le serveur virtuel et l’hôte DMZ ne prendra effet qu’après reconfiguration."
            }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Agrégation de liens"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "L'agrégation de liens combine deux ports afin de créer un lien à haut débit, entre les deux appareils ainsi reliés et offre en plus une redondance qui augmente la disponibilité de la liaison."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Pour mettre en œuvre l'agrégation de liens",
                content: [
                    "Basculer sur ON pour activer la fonction d'agrégation de liens.",
                    "Choisir le mode d'agrégation de lien.<br><b> LACP actif :</b> Active inconditionnellement le LACP (Link Aggregation Control Protocol).<br><b> LACP passif :</b> Active LACP uniquement quand un appareil LACP est détecté.",
					"Spécifier deux ports pour l'agrégation de liens.",
					"Cliquer sur Sauvegarder."
                ]
            }]
        },
        ddos: {
            TITLE: "Pare-feu",
            CONTENT: [{
                type: "name",
                title: "Pare-feu SPI",
                content: "Le pare-feu SPI (Stateful Packet Inspection, Inspection de paquets avec état) évite les cyberattaques et valide le trafic qui passe par le routeur. Le pare-feu SPI Firewall est activé par défaut. "
            }, {
                type: "title",
                title: "Protection Dos"
            }, {
                type: "name",
                title: "Protection Dos",
                content: "La protection contre le DoS (Denial of Service, refus de service) protège votre réseau local contre les attaques DoS qui saturent votre réseau de demandes au serveur. Par défaut, la protection DoS est désactivée (Off)."
            }, {
                type: "name",
                title: "Filtrage d’attaques par saturation ICMP-FLOOD",
                content: "Activez la prévention des attaques par saturation ICMP (Internet Control Message Protocol, Protocole Internet de contrôle des messages)."
            }, {
                type: "name",
                title: "Filtrage d’attaques par saturation UDP-FLOOD",
                content: "Activez la prévention des attaques par saturation UDP (User Datagram Protocol, Protocole de datagramme utilisateur)."
            }, {
                type: "name",
                title: "Filtrage d’attaques par saturation TCP-FLOOD",
                content: "Activez la prévention de l’attaque par saturation du Transmission Control Protocol-Synchronize (TCP-SYN).",
                children: [{
                    type: "name",
                    title: "Désactivé",
                    content: "Sans protection."
                }, {
                    type: "name",
                    title: "Faible",
                    content: "Protection faible et faible impact sur la performance du routeur."
                }, {
                    type: "name",
                    title: "Moyen",
                    content: "Protection modérée et impact partiellement sensible sur la performance du routeur."
                }, {
                    type: "name",
                    title: "Élevé",
                    content: "Forte protection mais sensible impact sur la performance du routeur."
                }]
            }, {
                type: "name",
                title: "Interdire le Ping du LAN",
                content: "Activez l’interdiction des pings depuis les ports LAN."
            }, {
                type: "name",
                title: "Interdire le Ping du WAN",
                content: "Activez l’interdiction des pings depuis les ports WAN."
            }, {
                type: "title",
                title: "Liste des hôtes du DoS bloqués"
            }, {
                type: "name",
                title: "Liste des hôtes du DoS bloqués",
                content: "Énumère les adresses IP et MAC depuis toute source d’attaque DoS bloquée."
            }, {
                type: "name",
                title: "Pour supprimer une ou plusieurs entrées",
                content: "Dans la liste des hôtes, sélectionnez la ou les entrées que vous voulez supprimer et cliquez sur Supprimer au-dessus du tableau."
            }]
        },
        ipv6: {
            TITLE: "Internet IPv6",
            CONTENT: [{
                type: "name",
                title: "Activer IPv6",
                content: "Sélectionnez d’activer (On) ou de désactiver (Off) la fonction IPv6 dans le routeur."
            }, {
                type: "title",
                title: "Type de connexion Internet : IP statique"
            }, {
                type: "name",
                title: "IP statique",
                content: "Sélectionnez ce type si votre FSI utilise l’assignation d’adresses IPv6 statiques."
            }, {
                type: "name",
                title: "Adresse IPv6/Passerelle par défaut IPv6/Serveur DNS IPv6/Serveur DNS IPv6 secondaire",
                content: "Saisissez ces paramètres fournis par votre FSI."
            }, {
                type: "name",
                title: "MTU (octets)",
                content: "La taille normale et par défaut de la MTU (Maximum Transmission Unit, unité de transmission maximale) sur la plupart des réseaux Ethernet est de 1500 octets. Ne modifiez pas la taille de la MTU par défaut, sauf sur demande de votre FSI."
            }, {
                type: "title",
                title: "Type de connexion Internet : IP dynamique"
            }, {
                type: "name",
                title: "IP dynamique",
                content: "Sélectionnez ce type si votre FSI utilise l’assignation d’adresses IPv6 dynamiques."
            }, {
                type: "name",
                title: "Adresse IPv6/Passerelle IPv6",
                content: "Ces paramètres sont automatiquement assignés par le serveur DHCPv6 depuis votre FSI."
            }, {
                type: "name",
                title: "Type d’adressage",
                content: "Sélectionnez le type de connexion pour l’IPv6."
            }, {
                type: "name",
                title: "MTU (octets)",
                content: "La taille normale et par défaut de la MTU (Maximum Transmission Unit, unité de transmission maximale) sur la plupart des réseaux Ethernet est de 1500 octets. Ne modifiez pas la taille de la MTU par défaut, sauf sur demande de votre FSI."
            }, {
                type: "name",
                title: "Utilisez l’adresse DNS IPv6 suivante",
                content: "Cochez cette case et saisissez la ou les adresses du serveur DNS fournie(s) par votre FSI en notation décimale séparée par des points. Cette interface WAN utilisera en priorité le serveur DNS spécifié."
            }, {
                type: "name",
                title: "Nom de l’hôte",
                content: "Saisissez une valeur dans ce champ pour spécifier le nom d’hôte du routeur."
            }, {
                type: "title",
                title: "Type de connexion Internet : PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Sélectionnez ce type si votre FSI utilise PPPoEv6, et vous fournit un nom d’utilisateur et un mot de passe."
            }, {
                type: "name",
                title: "Nom d’utilisateur/Mot de passe/Confirmer le mot de passe",
                content: "Saisissez ces paramètres fournis par votre FSI."
            }, {
                type: "name",
                title: "Type d’adressage",
                content: "Sélectionnez le type de connexion pour l’IPv6."
            }, {
                type: "name",
                title: "Nom du service",
                content: "Saisissez le nom du service fourni par votre FSI. Si non fourni, laissez ce champ vide."
            }, {
                type: "name",
                title: "Nom du serveur",
                content: "Saisissez le nom du serveur fourni par votre FSI. Si non fourni, laissez ce champ vide."
            }, {
                type: "name",
                title: "MTU (octets)",
                content: "La taille de MTU normale (Maximum Transmission Unit, Unité de transmission maximale) pour les réseaux Ethernet est de 1480 octets.",
                children: [{
                    type: "paragraph",
                    content: "<b>Remarque</b> : Dans quelques rares cas, votre FSI peut vous demander de régler la taille de la MTU pour une meilleure performance du réseau. Ne changez pas la valeur sauf nécessité absolue."
                }]
            }, {
                type: "name",
                title: "Utiliser les informations IPv6 spécifiées par le FSI",
                content: "Cochez cette case et saisissez l’adresse IP et la passerelle fournies par votre FSI."
            }, {
                type: "name",
                title: "Utilisez l’adresse DNS IPv6 suivante",
                content: "Sélectionnez cette option si vous voulez saisir manuellement l’adresse DNS fournie par votre FSI. Si vous ne la sélectionnez pas, le routeur obtiendra l'adresse DNS de votre FSI de manière dynamique."
            }, {
                type: "title",
                title: "Type de connexion Internet : Tunnel 6 à 4 "
            }, {
                type: "name",
                title: "Tunnel 6 à 4 ",
                content: "Sélectionnez ce type si votre FSI utilise le déploiement 6to4 pour l’assignation d’adresses."
            }, {
                type: "title",
                title: "LAN IPv6"
            }, {
                type: "name",
                title: "Type d’adressage",
                content: "Sélectionnez le mode approprié selon votre FSI.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Sélectionnez cette option pour assigner des adresses IPv6 aux ordinateurs de votre réseau local via RADVD.",
                    children: [{
                        type: "name",
                        title: "Activer RDNSS",
                        content: "Cochez la case pour activer la fonction RDNSS."
                    }, {
                        type: "name",
                        title: "Activer le préfixe ULA",
                        content: "Cochez la case pour activer la fonction de préfixe ULA.",
                        children: [{
                            type: "name",
                            title: "Préfixe ULA",
                            content: "Saisissez le préfixe ULA."
                        }, {
                            type: "name",
                            title: "Longueur du préfixe ULA",
                            content: "Saisissez la longueur du préfixe ULA. La valeur par défaut est 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Serveur DHCPv6",
                    content: "Pour assigner automatiquement des adresses IP aux clients de votre réseau local.",
                    children: [{
                        type: "name",
                        title: "Adresse de démarrage IPv6",
                        content: "Saisissez l’adresse IPv6 de démarrage."
                    }, {
                        type: "name",
                        title: "Adresse de fin IPv6",
                        content: "Saisissez l’adresse IPv6 de fin."
                    }, {
                        type: "name",
                        title: "Durée du bail",
                        content: "Saisissez la durée pendant laquelle un client DHCP peut céder son adresse IPv6 dynamique assignée par le routeur. Après l’expiration de l’adresse IPv6 dynamique, l’utilisateur se verra assigner automatiquement une nouvelle adresse IPv6 dynamique. La valeur par défaut est 86400 secondes."
                    }]
                }]
            }, {
                type: "name",
                title: "Type de préfixe du site",
                content: "Sélectionnez un type pour l’assignation d’un préfixe aux adresses IPv6. Ils sont fournis délégués ou statiques."
            }, {
                type: "name",
                title: "Délégué",
                children: [{
                    type: "name",
                    title: "Connexion WAN avec préfixe délégué",
                    content: "Sélectionnez une connexion WAN dans la liste déroulante pour assigner un préfixe."
                }]
            }, {
                type: "name",
                title: "Statique",
                children: [{
                    type: "name",
                    title: "Préfixe du site",
                    content: "Saisissez une valeur pour le préfixe du site."
                }, {
                    type: "name",
                    title: "Longueur du préfixe du site",
                    content: "Saisissez une valeur pour la longueur du préfixe du site."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Activer le serveur VPN",
				content: "Cocher cette case pour activer le serveur OpenVPN."
			},{
				type: "name",
				title: "Type de service",
				content: "Affiche le protocole de communication utilisé par le serveur OpenVPN : UDP ou TCP."
			},{
				type: "name",
				title: "Port de service",
				content: "Saisir un N° de port de communication compris entre 1024 et 65535. Le port de service commun par défaut est 1194."
			},{
				type: "name",
				title: "Sous-réseau/masque de sous-réseau VPN",
				content: "Saisir l'étendue des adresses IP qui seront attribuées aux clients par le serveur OpenVPN."
			},{
				type: "name",
				title: "Accès client",
				content: "Choisir le type d'accès pour le client OpenVPN."
			},{
				type: "name",
				title: "Accès au réseau local uniquement",
				content: "Les clients peuvent accéder au routeur et au réseau local LAN uniquement. La route passerelle de destination par défaut est inchangée."
			},{
				type: "name",
				title: "Accès au réseau local et à Internet",
				content: "Les clients peuvent accéder au routeur, au réseau local LAN et à Internet. La route passerelle de destination par défaut est changée."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
            },{
                type: "title",
                content: "Certificat"
            },{
                type: "paragraph",
                content: "Utiliser le certificat pour transmettre l'information et l'identité de la connexion VPN à l'ordinateur distant."
            },{
                type: "name",
                title: "Générer",
                content: "Cliquer sur Générer pour créer un nouveau Certificat."
            },{
                type: "title",
                content: "Fichier de configuration"
            },{
                type: "name",
                title: "Exporter",
                content: "Cliquer sur ce bouton pour sauvegarder le fichier de configuration OpenVPN afin d'être utiliser pour créer une nouvelle connexion VPN."
			},{
                type: "title",
                content: "Assistant d'installation du client VPN"
			},{
				type: "step",
                		title: "Pour activer et connecter un appareil client au serveur OpenVPN:"
			},{
				type: "paragraph",
				content: "Avant de configurer le serveur OpenVPN, veuillez configurer un service DNS Dynamique DDNS (recommandé) ou assigner une adresse IP statique au port WAN. Vérifier que le port externe du service NAT n'est pas un port utilisé par un type de service, et que votre système horaire est synchronisé correctement avec Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Activer le Serveur VPN.",
					"Configurer les paramètres du serveur OpenVPN (type de service, port de service et l'accès client) et cliquer sur Sauvegarder.",
					"Cliquer sur Exporter pour sauvegarder le fichier de configuration.",
					"Sur l'appareil client, télécharger et installer l'utilitaire client d'OpenVPN à partir du site <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Les plateformes officielles supportées incluent Windows, Mac OSX et Linux.",
					"Lancer l'utilitaire client d'OpenVPN et ajouter une nouvelle connexion VPN en utilisant le fichier de configuration afin de connecter votre appareil client au serveur VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Pour obtenir plus d'informations à propos des clients OpenVPN, consulter le site <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Activer le serveur VPN",
				content: "Cocher cette case pour activer le serveur VPN PPTP."
			},{
				type: "name",
				title: "Adresse IP du client",
				content: "Saisir l'étendue d'adresses IP (Jusqu'à 10 Clients) qui peuvent être affectées aux clients par le serveur VPN PPTP."
			},{
				type: "name",
				title: "Nom d'utilisateur et Mot de passe",
				content: "Saisir le nom d'utilisateur et le Mot de passe d'authentification des clients au serveur VPN PPTP."
			},{
				type: "paragraph",
				content: "Cliquer sur Sauvegarder pour enregistrer tous vos paramètres."
			},{
                type: "title",
                content: "Assistant d'installation du client VPN"
			},{
				type: "step",
                title: "Pour activer et connecter vos appareils clients au serveur VPN PPTP:"
			},{
				type: "paragraph",
				content: "Avant de configurer le serveur VPN PPTP, configurer un service DNS Dynamique (recommandé) ou assigner une adresse IP statique au port WAN. Vérifier que le port externe 1723 du service NAT n'est pas utilisé par un type de service, et que votre système horaire est synchronisé correctement avec Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Activer le Serveur VPN.",
					"Configurer les paramètres du serveur VPN PPTP et cliquer sur Sauvegarder.",
					"Sur l'appareil client, créer une connexion VPN PPTP. Les plateformes officielles supportées incluent Windows, Mac OSX et Linux.",
                    			"Lancer le programme VPN PPTP, ajouter une nouvelle connexion et saisissez le nom de domaine du service DDNS enregistré ou l'adresse IP statique assigné au port WAN, afin de connecter votre appareil client au serveur VPN PPTP."
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "Connexions VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Cette page affiche la liste des clients connectés au serveur OpenVPN et PPTP hébergés par le routeur en temps réel."
			},{
				type: "paragraph",
				content: "Cliquer sur l'icône moins (-) pour déconnecter un client."
			}]
		},
        cloudBasic: {
            TITLE: "Cloud TP-Link",
            CONTENT: [{
                type: "paragraph",
                content: "Le service de Cloud TP-Link vous permet de surveiller à distance votre réseau en temps réel d'accéder à vos appareils TP-Link puis à les administrer depuis internet à tout moment et depuis n'importe où."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Informations sur le compte"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Affiche les informations liés à votre identifiant TP-LINK. Vous pouvez éditer les informations en cliquant sur l'icône d'édition."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Informations sur l'appareil"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Affiche les informations de l'appareil, ce qui inclut le compte Cloud qui administre l'appareil."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Comptes associés"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Cette liste affiche tous les comptes Cloud qui sont actuellement associés à cet appareil."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Pour associer un compte utilisateur",
                content: [
                    "Cliquer sur Associer.",
                    "Saisir l'adresse email que vous souhaitez associer.",
                    "Cliquer sur Sauvegarder."
                ]
            }]
        }
    };
})(jQuery);
