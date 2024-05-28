(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Viser relevante oplysninger om WAN (Internet) forbindelsen."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unikke fysiske adresse, som er tildelt til internet(WAN)-porten på routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Den IPv4-adresse, som er tildelt til internet(WAN)-porten på routeren. Hvis IP-adressen er vist som 0.0.0.0, betyder dette at der ikke er  adgang til internettet."
			},{
				type: "name",
				title: "Undernetmaske",
				content: "Denne parameter bestemmer netværksdelen og host-delen af en IP-adresse."
			},{
				type: "name",
				title: "Standard gateway",
				content: "Den IP-adresse som bruges til at tilslutte routeren til netværket."
			},{
				type: "name",
				title: "Primær DNS/sekundær DNS",
				content: "DNS (Domain Name System) konverterer host-navne og internetdomæner til IP-adresser. Oplysningerne om disse DNS-servere tildeles af en internetudbyder (ISP)."
			},{
				type: "name",
				title: "Forbindelsestype",
				content: "Den aktuelle forbindelsestype til internet(WAN)-porten."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unikke fysiske adresse, som er tildelt til internet(WAN)-porten på routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Den IPv6-adresse, som er tildelt til internet(WAN)-porten på routeren."
			},{
				type: "name",
				title: "Standard gateway",
				content: "Den IP-adresse som bruges til at tilslutte routeren til netværket."
			},{
				type: "name",
				title: "Primær DNS/sekundær DNS",
				content: "DNS (Domain Name System) konverterer host-navne og internetdomæner til IP-adresser. Oplysningerne om disse DNS-servere tildeles af en internetudbyder (ISP)."
			},{
				type: "name",
				title: "Forbindelsestype",
				content: "Den aktuelle forbindelsestype til internet(WAN)-porten."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2,4GHz/5GHz Trådløs",
			CONTENT: [{
				type: "paragraph",
				content: "Viser relevante oplysninger om det trådløse netværk."
			},{
				type: "name",
				title: "Netværksnavn (SSID)",
				content: "Navnet på det trådløse netværk, også kaldet SSID (Service Set Identifier)."
			},{
				type: "name",
				title: "Trådløs radio",
				content: "Den aktuelle status (tændt eller slukket) for det trådløse netværk."
			},{
				type: "name",
				title: "Tilstand",
				content: "Den aktuelle trådløse tilstand."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Båndbredden af kanalen af på det trådløse netværk."
			},{
				type: "name",
				title: "Kanal",
				content: "Den aktuelle trådløse kanal"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "MAC-adressen for den trådløse netværksradio på routeren."
			},{
				type: "name",
				title: "WDS-status",
				content: "Den aktuelle status (tændt eller slukket) for WDS-tilstanden."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Viser oplysninger om Ethernet(LAN)-porte."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Den IPv4-adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
			},{
				type: "name",
				title: "Undernetmaske",
				content: "Denne parameter bestemmer netværksdelen og host-delen af en IP-adresse."
			},{
				type: "name",
				title: "DHCP",
				content: "Viser om routerens indbygget DHCP-server er aktiv for enheder på LAN-porte eller ej."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Den IPv6-adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
			},{
				type: "name",
				title: "Link til lokal adresse",
				content: "IPv6-linkadressen til LAN-interfacet."
			},{
				type: "name",
				title: "Tildelt type",
				content: "Typen af IPv6-adresse for LAN-interfacet."
			}]
		},
		STATUS_GUEST: {
			TITLE: "Gæstenetværk 2,4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Viser oplysninger om det trådløse netværk for gæster."
			},{
				type: "name",
				title: "Netværksnavn (SSID)",
				content: "Navnet på det trådløse netværk (SSID) på dit gæstenetværk."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Viser om gæstenetværkets trådløse netværksnavn (SSID) er skjult eller ej."
			},{
				type: "name",
				title: "Trådløs radio",
				content: "Den aktuelle status (tændt eller slukket) af gæstenetværket."
			},{
				type: "name",
				title: "Giv gæsterne mulighed for at se hinanden",
				content: "Viser om alle enheder på gæstenetværket må kommunikere med hinanden eller ej."
			}]
		},
		STATUS_USB: {
			TITLE: "USB-enheder",
			CONTENT: [{
				type: "paragraph",
				content: "Viser oplysninger om de aktuelle USB-lagringsenheder og/eller printere, som er tilsluttet routeren via USB-portene."
			},{
				type: "name",
				title: "Printer",
				content: "Navnet på den tilsluttede printer."
			},{
				type: "name",
				title: "USB-disk",
				content: "Navnet på USB-disken der er tilsluttet routeren."
			},{
				type: "name",
				title: "Total",
				content: "Den samlede lagerkapacitet af den tilsluttede USB-lagerenhed."
			},{
				type: "name",
				title: "Tilgængelig",
				content: "Den tilgængelige lagerkapacitet af den tilsluttede USB-lagerenhed."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Ydeevne",
			CONTENT: [{
				type: "paragraph",
				content: "Viser den aktuelle routers ydeevne."
			},{
				type: "name",
				title: "CPU-belastning",
				content: "Den aktuelle belastning af CPUen."
			},{
				type: "name",
				title: "Brug af hukommelse",
				content: "Den aktuelle belastning af hukommelsen."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Kablede klienter",
			CONTENT: [{
				type: "paragraph",
				content: "Viser oplysninger for alle de kablede enheder, der aktuelt er tilsluttet netværket."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Trådløse klienter",
			CONTENT: [{
				type: "paragraph",
				content: "Viser oplysninger for alle de kablede enheder, der aktuelt er tilsluttet netværket."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Internetforbindelsestype: Statisk IP"
			},{
				type: "paragraph",
				content: "Vælg denne type hvis du har en specifik (fast) IP-adresse, undernetmaske, gateway og DNS-parametre fra internetudbyderen."
			},{
				type: "name",
				title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
				content: "Indtast oplysningerne fra din internetudbyder."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
			},{
				type: "title",
				title: "Internetforbindelsestype: Dynamisk IP"
			},{
				type: "paragraph",
				content: "Vælg denne type hvis du har en DHCP-serverforbindelse fra din internetudbyder."
			},{
				type: "name",
				title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
				content: "Disse parametre tildeles automatisk af DHCP-serveren fra din internetudbyder."
			},{
				type: "name",
				title: "Forny",
				content: "Klik på denne knap for at få nye IP-parametre fra DHCP-serveren."
			},{
				type: "name",
				title: "Udgivelse",
				content: "Klik på denne knap for at frigive alle IP-adresser der er tildelt af DHCP-serveren."
			},{
				type: "name",
				title: "Brug følgende DNS-adresser",
				content: "Hvis din internetudbyder tilbyder en eller to DNS-adresser, skal du markere dette afkrydsningsfelt og angive de primære DNS og sekundære DNS-adresser i de tilsvarende felter. Ellers vil DNS-adresserne blive tildelt dynamisk af internetudbyderen."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
			},{
				type: "name",
				title: "Navn på host",
				content: "Angiv en værdi i dette felt for at angive routerens host-navn."
			},{
				type: "name",
				title: "Få IP ved hjælp af Unicast DHCP",
				content: "Marker dette afkrydsningsfelt, hvis internetudbyderens DHCP-serveren ikke understøtter broadcast-programmer og du kan ikke hente IP-adressen dynamisk."
			},{
				type: "title",
				title: "Internetforbindelsestype: PPPoE"
			},{
				type: "paragraph",
				content: "Vælg denne type, hvis du vil bruge DSL (Digital Subscriber Line) tjenesten og har et brugernavn og adgangskode fra internetudbyderen."
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "IP-adresse/Primær DNS/sekundær DNS",
				content: "Disse parametre tildeles automatisk af DHCP-serveren fra din internetudbyder."
			},{
				type: "name",
				title: "Sekundær forbindelse (ingen, dynamisk-IP, statisk-IP)",
				children: [{
					type: "name",
					title: "Ingen",
					content: "Vælg , hvis ingen sekundær forbindelse findes."
				},{
					type: "name",
					title: "Dynamisk IP",
					content: "Vælg hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen.",
					children: [{
						type: "name",
						title: "Forny",
						content: "Klik på denne knap for at forny IP-parametrene fra internetudbyderen."
					},{
						type: "name",
						title: "Udgivelse",
						content: "Klik på denne knap for at frigive de tildelte IP-parametre."
					}]
				},{
					type: "name",
					title: "Statisk IP",
					content: "Vælg hvis IP-adressen og undernetmasken leveres af internetudbyderen, og angive disse oplysninger i de relevante felter."
				}]
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Den typiske størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1480 bytes.",
				children: [{
					type: "note",
					title: "Bemærk",
					content: "I sjældne tilfælde, vil din internetudbyder bede dig om at justere MTU-størrelse for bedre ydelse af netværket. Du bør ikke ændre værdien, medmindre det er absolut nødvendigt."
				}]
			},{
				type: "name",
				title: "Tjenestenavn/navn på Access-koncentrator (AC)",
				content: "Som standard er tjenestenavnet og AC-navnet tomt. Disse felter skal ikke konfigureres medmindre det kræves af din internetudbyder."
			},{
				type: "name",
				title: "Bestem online interval",
				content: "Angiv en værdi for tidsintervalet mellem 0 og 120 (i sekunder), hvor routeren registrerer Access-koncentratoren online i hvert interval. Standardværdien er 10."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Hvis din internetudbyder giver en specifik (fast) IP-adresse, skal du vælge Brug følgende IP-adresse og indtaste IP-adressen i feltet. Ellers vælg Hent dynamisk fra din internetudbyder for at få en server-tildelt IP-adresse automatisk."
			},{
				type: "name",
				title: "DNS-adresse/primær DNS/sekundær DNS",
				content: "Hvis din internetudbyder giver en specifik (fast) DNS-IP-adresse, skal du vælge Brug følgende DNS-adresse og indtaste adressen(erne) ind i felterne for den primære DNS og sekundære DNS henholdsvis. Ellers vælg Hent dynamisk fra din internetudbyder for at få en server-tildelt DNS-IP-adresse(r) automatisk."
			},{
				type: "name",
				title: "Forbindelsestilstand",
				content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
				},{
					type: "name",
					title: "Efter behov",
					content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
				},{
					type: "name",
					title: "Tidsbaserede",
					content: "I denne tilstand, etableres internetforbindelse kun i et bestemt tidsrum. Hvis denne indstilling vælges, skal du indtaste starttiden og sluttiden; begge i TT:MM-formatet."
				},{
					type: "name",
					title: "Manuelt",
					content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
				},{
					type: "note",
					title: "Bemærk",
					content: "Den tidsbaserede forbindelsestilstand træder først i kraft efter at systemtiden er konfigureret på Avanceret → Systemværktøjer → Tidsindstillinger."
				}]
			},{
				type: "title",
				title: "Internetforbindelsestype: BigPond-kabel",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Vælg den type hvis din internetudbyder leverer BigPond-kabelforbindelser.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Tilladelse Server",
				content: "Angiv den godkendende servers IP-adresse eller host-navn.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Tilladelse Domæne",
				content: "Angiv serverens domænenavns suffiks (afhængigt af din lokalitet). F. eks. nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, eller qld.bigpond.net.au for QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Forbindelsestilstand",
				content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
				},{
					type: "name",
					title: "Efter behov",
					content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
				},{
					type: "name",
					title: "Manuelt",
					content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
				}]
			},{
				type: "title",
				title: "Internetforbindelsestype: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Vælg denne type, hvis du opretter forbindelse til en L2TP/PPTP VPN-server og internetudbyderen har forsynet dig med et brugernavn, en adgangskode og IP-adresse/domænenavn på serveren."
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "IP-adresse/Primær DNS/sekundær DNS",
				content: "Disse parametre tildeles automatisk af DHCP-serveren fra din internetudbyder."
			},{
				type: "name",
				title: "Sekundær forbindelse (dynamisk-IP eller statisk-IP)",
				children: [{
					type: "name",
					title: "Dynamisk IP",
					content: "Vælg hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen."
				},{
					type: "name",
					title: "Statisk IP",
					content: "Vælg hvis IP-adressen, undernetmasken, gatewayen og DNS-adresserne leveres af internetudbyderen, og angiv disse oplysninger i de relevante felter."
				}]
			},{
				type: "name",
				title: "VPN-server IP/domænenavn",
				content: "Angiv VPN-serverens IP-adresse eller domænenavnet, som din internetudbyder har oplyst."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1460 bytes for L2TP eller 1420 bytes for PPTP. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
			},{
				type: "name",
				title: "Forbindelsestilstand",
				content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
				},{
					type: "name",
					title: "Efter behov",
					content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
				},{
					type: "name",
				title: "Manuelt",
				content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
				}]
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC-klone",
			CONTENT: [{
				type: "name",
				title: "Brug standard MAC-adresse",
				content: "Undlad at ændre routerens MAC-adresse, hvis internetudbyderen ikke binder den tildelte IP-adresse til en MAC-adresse."
			},{
				type: "name",
				title: "Brug computerens aktuelle MAC-adresse",
				content: "Vælg for at kopiere den aktuelle MAC-adressen på computeren, der er sluttet til routeren, hvis internetudbyderen binder den tildelte IP-adresse til computerens MAC-adresse."
			},{
				type: "name",
				title: "Brug brugerdefineret MAC-adresse",
				content: "Indtast MAC-adressen manuelt, hvis internetudbyderen binder den tildelte IP-adresse til den specifikke MAC-adresse."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "MAC-adresse",
				content: "Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser standard routerens IP-adresse, som bruges til at logge ind på routerens administrationsside, og kan overskrives."
			},{
				type: "name",
				title: "Undernetmaske",
				content: "Vælg en tilknyttet identifikator, som benyttes af LAN-porten til at rute intern og ekstern trafik fra rullelisten, eller indtast en ny undernetmaske i decimalformat."
			},{
				type: "note",
				title: "Bemærk",
				content: "Hvis den nye internet-IP-adresse ikke er i det samme undernet som den gamle, vil IP-adressegruppen i DHCP-serveren automatisk blive konfigureret; men den virtuelle server og DMZ-hosten vil ikke træde i kraft, før de omkonfigureres."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		IPTV:{
			TITLE: "Indstillinger",
			CONTENT: [{
					type: "name",
					title: "IGMP Proxy",
					content: "Vælg IGMP (Internet Group Management Protocol) Proxy-versionen, enten V2 eller V3, som anbefalet af din internetudbyder."
				},{
					type: "name",
					title: "IGMP-version",
					content: "Vælg IGMP Proxy-versionen, enten V2 eller V3, som anbefalet af din internetudbyder."
				},
				{
					type: "name",
					title: "IPTV",
					content: "Vælg for at aktivere IPTV-funktionen."
				},
				{
					type: "name",
					title: "Tilstand",
					content: "Vælg den ønskede tilstand som anbefalet af din internetudbyder. Der er seks understøttede IPTV-tilstande:",
					children: [
						{
							type: "name",
							title: "Bro",
							content:"Hvis din internetudbyder ikke er opført, og ingen andre parametre er nødvendige, kan du blot vælge denne tilstand og konfigurere LAN-portens funktioner på routeren.",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Tildel din LAN-port til at fungere som Internetudbyder eller som IPTV-leverandør."
							}]
						},
						{
							type: "name",
							title: "Rusland",
							content: "Vælg denne indstilling, hvis din internetudbyder er fra Rusland og de nødvendige parametre er forudbestemt, herunder Internet/IP-telefon/IPTV-VLAN-id'er og prioriteret, og LAN (1/2/ 3/4) portfunktioner.",
							children: [{
								type: "name",
								title: "IPTV Multicast VLAN-ID/Prioritet",
								content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til din internetudbyder."
							}]
						},
						{
							type: "name",
							title: "Singapore-ExStream",
							content: "Vælg denne indstilling, hvis din internetudbyder er ExStream fra Singapore og de nødvendige parametre er forudbestemte, herunder Internet/IPTV-VLAN-id'er og prioriteret, og LAN (1/2/ 3/4) portfunktioner."
						},
						{
							type: "name",
							title: "Malaysia-Unifi",
							content: "Vælg denne indstilling, hvis din internetudbyder er Unifi fra Malaysia og de nødvendige parametre er forudbestemte, herunder Internet/IPTV-VLAN-id'er og prioriteret, og LAN (1/2/ 3/4) portfunktioner."
						},
						{
							type: "name",
							title: "Malaysia-Maxis",
							content: "Vælg denne indstilling, hvis din internetudbyder er Maxis fra Malaysia og de nødvendige parametre er forudbestemt, herunder Internet/IP-telefon/IPTV-VLAN-id'er og prioriteret, og LAN (1/2/ 3/4) portfunktioner."
						},
						{
							type: "name",
							title: "Brugerdefineret",
							content: "Vælg denne indstilling, hvis din internetudbyder ikke giver de nødvendige parametre, herunder Internet/IP-telefon/IPTV-VLAN-id'er og prioriteret, og LAN (1/2/ 3/4) portfunktioner.",
							children: [{
								type: "name",
								title: "Internet/IP-telefon/IPTV-VLAN ID/prioritet",
								content: "Konfigurere VLAN-id'erne og prioriteringer som leveret af din internetudbyder."
							},{
								type: "name",
								title: "802.11Q tag",
								content: "Vælg for at mærke internetpakkerne med 802.11Q."
							},{
								type: "name",
								title: "IPTV Multicast VLAN-ID/Prioritet",
								content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til din internetudbyder."
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Tildel din LAN-port til at fungere som internetudbyder, IP-telefon-leverandør eller som IPTV-leverandør."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Klik på Gem for at gemme alle dine indstillingerne."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Indstillinger",
			CONTENT: [{
				type: "name",
				title: "DHCP-server",
				content: "Som standard er DHCP (Dynamic Host Configuration Protocol) serveren aktiveret; dynamisk tildelte TCP/IP-parametre til klientenheder fra IP-adressegruppen. Deaktiver IKKE DHCP-serveren, medmindre du har en anden DHCP-server, eller du ønsker manuelt at tildele TCP/IP-parametre for hver klientenhed på netværket."
			},{
				type: "name",
				title: "IP-adressepulje",
				content: "Angiv intervallet af IP-adresser, som kan leases til klienterne."
			},{
				type: "name",
				title: "Låneperiode for adresse",
				content: "Angiv den tid, som en IP-adresse er leaset til klienten mellem 2 og 2880 minutter. Standardværdien er 120 minutter."
			},{
				type: "name",
				title: "Standard gateway",
				content: "Indtast LAN-IP-adressen. (Valgfri)"
			},{
				type: "name",
				title: "Primær DNS/sekundær DNS",
				content: "Indtast disse parametre fra din internetudbyder. (Valgfri)"
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Adressereservering",
			CONTENT: [{
				type: "paragraph",
				content: "Du kan manuelt reservere en IP-adresse til en klient, der er tilsluttet til routeren. Når den er reserveret, vil IP-adressen kun blive tildelt den samme klient fra DHCP-serveren."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på klienten med reserveret DHCP IP-adresse."
			},{
				type: "name",
				title: "Reserveret IP-adresse",
				content: "Viser den reserverede IP-adresse for klienten."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en beskrivelse af klientenheden."
			},{
				type: "name",
				title: "Status",
				content: "Den aktuelle status (tændt eller slukket) for klientenheden."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende klient."
			},{
				type: "step",
				title: "Sådan reserveres en IP-adresse",
				content:[
					"1. Klik på Tilføj.",
					"2. Indtast MAC-adressen for den ønskede klient.",
					"3. Indtast IP-adressen, som du vil reservere for klienten.",
					"4. Indtast en beskrivelse for klienten.",
					"5. Vælg Aktiver.",
					"6. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan ændres eller slettes en eksisterende klient",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til klienten som du vil redigere eller slette."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP klientliste",
			CONTENT: [{
				type: "name",
				title: "Klientnummer",
				content: "Viser nummeret på den tilknyttede DHCP-klient."
			},{
				type: "name",
				title: "Klientnavn",
				content: "Viser navnet på DHCP-klienten."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen."
			},{
				type: "name",
				title: "tildelte IP-adresse",
				content: "Viser den tildelte IP-adressen for klienten fra DHCP-serveren."
			},{
				type: "name",
				title: "Låneperiode",
				content: "Viser den resterende tid for IP-adressen, der er leaset til klienten."
			},{
				type: "name",
				title: "Opdater",
				content: "Klik for at opdatere DHCP-klientlisten."
			}]
		},

		DDNS: {
			TITLE: "Dynamisk DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamisk DNS giver dig mulighed for at tildele et fast host- og domænenavn til en dynamisk internet-IP-adresse. Det er nyttigt hvis du hoster dit eget websted, FTP-server eller en anden server bagved routeren. Først skal du tilmelde dig en Dynamisk DNS-tjenesteudbyder, som f. eks. dyn.com."
			},{
				type: "step",
				title: "Sådan etableres en dynamisk DNS",
				content: [
					"1. Vælg din DDNS-tjenesteudbyder.",
					"2. Indtast brugernavnet og adgangskoden til din DDNS-konto.",
					"3. Indtast domænenavnet, som du har modtaget fra DDNS-tjenesteudbyderen.",
					"4. Vælg opdateringsintervallet i rullemenuen.",
					"5. Klik på Log ind og Gem."
				]
			},{
				type: "paragraph",
				content: "For at skifte mellem konti, skal du først logge af den aktuelle konto og derefter logge på en anden konto med det nye brugernavn og adgangskode."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Statisk routing",
			CONTENT: [{
				type: "paragraph",
				content: "Statisk routing bruges til at forudbestemme en fast rute for netværksinformationspakker til at nå frem til en bestemt host eller netværk."
			},{
				type: "step",
				title: "Sådan etableres statisk routing",
				content: [
					"1. Klik på Tilføj.",
					"2. Netværksdestination - Angiv en IP-adresse i decimalformat for at tildele en statisk rute for denne registrering.",
					"3. Undernetmaske - Indtast undernetmasken i decimalformat for at bestemme netværksdelen og host-delen af IP-adressen.",
					"4. Standard-gateway - Indtast den gateway-IP-adresse i decimalformat for at tilslutte routeren til netværket eller hosten.",
					"5. Interface - Vælg LAN eller WAN tfor at angive typen af netværksdestination.",
					"6. Beskrivelse - Indtast en kort beskrivelse af denne registrering.",
					"7. Vælg Aktiver.",
					"8. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan ændres eller slettes en eksisterende registrering",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til registreringen som du vil redigere eller slette."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Routing-tabel for system",
			CONTENT: [{
				type: "paragraph",
				content: "Routing-tabel for systemet viser alle gyldige ruteposter, som er i brug i øjeblikket."
			},{
				type: "paragraph",
				content: "Klik på Opdater for at opdatere Routing-tabellen."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Indstillinger",
			CONTENT: [{
				type: "name",
				title: "Region",
				content: "Vælg din region fra rullemenuen. Hvis dit land eller region ikke er på listen, kan der være begrænsninger på at bruge den trådløse radio på din lokalitet."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "Trådløs 2,4 GHz",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 2,4 GHz radiofrekvens. Hvis indstillingen er deaktiveret, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan lade standard netværksnavnet (SSID) være som det er, eller indtast et nyt navn (op til 32 tegn). Dette felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule 2.4GHz netværksnavnet (SSID) fra listen over trådløse netværk. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "Sikkerhed",
				content: "Vælg én af følgende sikkerhedsfunktioner:",
				children: [{
					type: "name",
					title: "Ingen sikkerhed",
					content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit trådløse netværk mod uautoriseret adgang."
				},{
					type: "name",
					title: "WPA/WPA2-personlig",
					content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Denne indstilling anbefales. Hvis den vælges, skal du konfigurere følgende.",
					children: [{
						type: "name",
						title: "Version",
						content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Denne indstilling giver et godt sikkerhedsniveau. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Denne funktion giver en bedre sikkerhed end WPA-PSK og anbefales."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Automatisk (for både TKIP og AES). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP er valgt, understøttes WPS-funktioner ikke på dette bånd."
					},{
						type: "name",
						title: "Adgangskode",
						content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd.",
					children: [{
						type: "name",
						title: "Version",
						content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
						children:[{
							type: "name",
							title: "Auto",
							content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Denne indstilling giver et godt sikkerhedsniveau."
						},{
							type: "name",
							title: "WPA2",
							content: "Denne funktion giver en bedre sikkerhed end WPA-PSK og anbefales."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Automatisk (for både TKIP og AES). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen."
					},{
						type: "name",
						title: "RADIUS Server-IP",
						content: "Indtast IP-adressen på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS Port",
						content: "Indtast portnummeret på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS adgangskode",
						content: "Indtast den delte adgangskode på RADIUS-serveren."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Vælg denne indstilling for at aktivere en grundlæggende godkendelsesmetode, hvis nogen af dine klientenheder kun kan få adgang til trådløs brug af WEP (Wired Equivalent Privacy). Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd.",
				children: [{
					type: "name",
					title: "Type",
					content: "Vælg en godkendelsesversion for dit trådløse netværk. Standardindstillingen er Auto, som automatisk vælger Åbent system eller Delt nøgle baseret på funktionaliteten og anmodning om adgang fra den trådløse klient."
				},{
					type: "name",
					title: "Format af WEP-nøgle",
					content: "Brug enten ASCII-format eller vælg Hexadecimal. ASCII-format er en kombination af ASCII-tegn. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
				},{
					type: "name",
					title: "Nøgletype",
					content: "Vælg længden for WEP-nøglen.",
					children: [{
						type: "name",
						title: "64 Bit",
						content: "Her kan du indtaste 10 hexadecimale tegn (0-9, A-F, a-f) eller 5 ASCII-tegn i feltet for WEP-værdien."
					},{
						type: "name",
						title: "128 Bit",
						content: "Her kan du indtaste 26 hexadecimale tegn (0-9, A-F, a-f) eller 13 ASCII-tegn i feltet for WEP-værdien."
					}]
				},{
					type: "name",
					title: "Nøgleværdi",
					content: "Indtast WEP-nøglen i det relevante felt."
				}]
			}]
			},{
				type: "name",
				title: "Tilstand",
				content: "Vælg en transmissionstilstand."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Vælg en kanalbredde (båndbredde) for det 2,4 GHz trådløse netværk."
			},{
				type: "name",
				title: "Kanal",
				content: "Vælg en driftkanal for det 2,4 GHz trådløse netværk. Det anbefales at sætte kanalen til Auto, hvis du ikke oplever problemer med periodisk trådløs forbindelse."
			},{
				type: "name",
				title: "Transmissionsstyrke",
				content: "Vælg enten Høj, Mellem eller Lav for at angive transmissionsstyrke for data. Standard og anbefalet indstilling er Høj."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "Trådløs 5GHz",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 5GHz radiofrekvens. Hvis indstillingen er deaktiveret, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan lade standard netværksnavnet (SSID) være som det er, eller indtast et nyt navn (op til 32 tegn). Dette felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule 5GHz netværksnavnet (SSID) fra listen over trådløse netværk. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "Sikkerhed",
				content: "Vælg én af følgende sikkerhedsfunktioner:",
				children: [{
					type: "name",
					title: "Ingen sikkerhed",
					content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit trådløse netværk mod uautoriseret adgang."
				},{
					type: "name",
					title: "WPA/WPA2-personlig",
					content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Denne indstilling anbefales. Hvis den vælges, skal du konfigurere følgende.",
					children: [{
						type: "name",
						title: "Version",
						content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Denne indstilling giver et godt sikkerhedsniveau. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Denne funktion giver en bedre sikkerhed end WPA-PSK og anbefales."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Automatisk (for både TKIP og AES). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP er valgt, understøttes WPS-funktioner ikke på dette bånd."
					},{
						type: "name",
						title: "Adgangskode",
						content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd.",
					children: [{
						type: "name",
						title: "Version",
						content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Denne indstilling giver et godt sikkerhedsniveau."
						},{
							type: "name",
							title: "WPA2",
							content: "Denne funktion giver en bedre sikkerhed end WPA-PSK og anbefales."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Automatisk (for både TKIP og AES). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen."
					},{
						type: "name",
						title: "RADIUS Server-IP",
						content: "Indtast IP-adressen på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS Port",
						content: "Indtast portnummeret på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS adgangskode",
						content: "Indtast den delte adgangskode på RADIUS-serveren."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Vælg denne indstilling for at aktivere en grundlæggende godkendelsesmetode, hvis nogen af dine klientenheder kun kan få adgang til trådløs brug af WEP (Wired Equivalent Privacy). Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd.",
					children: [{
						type: "name",
						title: "Type",
						content: "Vælg en godkendelsesversion for dit trådløse netværk. Standardindstillingen er Auto, som automatisk vælger Åbent system eller Delt nøgle baseret på funktionaliteten og anmodning om adgang fra den trådløse klient."
					},{
						type: "name",
						title: "Format af WEP-nøgle",
						content: "Brug enten ASCII-format eller vælg Hexadecimal. ASCII-format er en kombination af bogstaver og tal. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
					},{
						type: "name",
						title: "Nøgletype",
						content: "Vælg længden for WEP-nøglen.",
						children:[{
							type: "name",
							title: "64 Bit",
							content: "Her kan du indtaste 10 hexadecimale tegn (0-9, A-F, a-f) eller 5 ASCII-tegn i feltet for WEP-værdien."
						},{
							type: "name",
							title: "128 Bit",
							content: "Her kan du indtaste 26 hexadecimale tegn (0-9, A-F, a-f) eller 13 ASCII-tegn i feltet for WEP-værdien."
						}]
					},{
						type: "name",
						title: "Nøgleværdi",
						content: "Indtast WEP-nøglen i det relevante felt."
					}]
				}]
			},{
				type: "name",
				title: "Tilstand",
				content: "Vælg en blandet transmissionstilstand."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Vælg en kanalbredde (båndbredde) for det 5GHz trådløse netværk."
			},{
				type: "name",
				title: "Kanal",
				content: "Vælg en driftkanal for det 5GHz trådløse netværk. Det anbefales at sætte kanalen til Auto, hvis du ikke oplever problemer med periodisk trådløs forbindelse."
			},{
				type: "name",
				title: "Transmissionsstyrke",
				content: "Vælg enten Høj, Mellem eller Lav for at angive transmissionsstyrke for data. Standard og anbefalet indstilling er Høj."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60GHz trådløst netværk",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 60GHz radiofrekvens. Hvis indstillingen er deaktiveret, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan lade standard netværksnavnet (SSID) være som det er, eller indtast et nyt navn (op til 32 tegn). Dette felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule 60GHz netværksnavnet (SSID) fra listen over trådløse netværk. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd."
			},{
				type: "name",
				title: "Sikkerhed",
				content: "Vælg én af følgende sikkerhedsfunktioner:",
				children: [{
					type: "name",
					title: "Ingen sikkerhed",
					content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit trådløse netværk mod uautoriseret adgang."
				},{
					type: "name",
					title: "WPA2-personlig",
					content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Krypteringstypen er GCMP. Denne indstilling anbefales. Hvis den vælges, skal du konfigurere følgende.",
					children: [{
						type: "name",
						title: "Adgangskode",
						content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Krypteringstypen er GCMP. Hvis indstillingen er valgt, understøttes WPS-funktioner ikke på dette bånd.",
					children: [{
						type: "name",
						title: "RADIUS Server-IP",
						content: "Indtast IP-adressen på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS Port",
						content: "Indtast portnummeret på RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS adgangskode",
						content: "Indtast den delte adgangskode på RADIUS-serveren."
					}]
				}]
			},{
				type: "name",
				title: "Kanal",
				content: "Vælg en driftkanal for det 60GHz trådløse netværk. Det anbefales at sætte kanalen til Auto, hvis du ikke oplever problemer med periodisk trådløs forbindelse."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		WPS: {	
			TITLE: "Routerens PIN-kode",
			CONTENT: [{
				type: "paragraph",
				content: "Andre enheder kan oprette forbindelse til denne router gennem WPS med routerens PIN-kode."
			},{
				type: "name",
				title: "Routerens PIN-kode",
				content: "Aktiver for at tillade trådløse enheder at oprette forbindelse til routeren ved hjælp af routerens PIN-kode (Personal Identification Number)."
			},{
				type: "name",
				title: "PIN-kode",
				content: "Viser routerens PIN-kode. PIN-kodens standardværdi kan findes på mærkaten på routeren. Klik på Opret for at oprette en ny PIN-kode tilfældigt eller klik på Standard for at gendanne den aktuelle PIN-kode til den originale PIN-kode."
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS-guide",
			CONTENT:[{
				type: "paragraph",
				content: "WPS understøtter kun følgende konfig: aktiver <Aktiverer trådløse radio>, deaktiver <Skjul SSID> og sikkerhed er <Ingen sikkerhed> eller <WPA/WPA2-personlig> (WPA2-PSK eller auto + AES eller auto) i tilstanden, hvor WPS-funktionen er aktiveret."
			},{
				type: "name",
				title: "Trykknap (anbefales)",
				content: "Vælg denne indstillingsmetode til at aktivere WPS-funktionen for nemt at tilslutte WPS-aktiverede enheder til dit trådløse netværk ved hjælp af WPS-knappen eller virtuelt ved hjælp af knappen Opret forbindelse."
			},{
				type: "name",
				title: "PIN-kode",
				content: "Vælg denne indstillingsmetode til manuelt at tilføje en enhed ved at angive den trådløse enheds WPS-PIN-kode i feltet og klikke på Opret forbindelse."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Trådløse stationer online",
			CONTENT: [{
				type: "name",
				title: "Klientnummer",
				content: "Viser nummeret på den tilknyttede trådløse klient."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på den tilknyttede trådløse klient."
			},{
				type: "name",
				title: "Forbindelsestype",
				content: "Viser det trådløse frekvensbånd (2,4 GHz eller 5 GHz) af den tilknyttede trådløse klient."
			},{
				type: "name",
				title: "Sikkerhed",
				content: "Viser sikkerhedstypen af den tilknyttede trådløse klient."
			},{
				type: "name",
				title: "Modtagne pakker",
				content: "Viser antallet af pakker modtaget af den tilknyttede trådløse klient."
			},{
				type: "name",
				title: "Sendte pakker",
				content: "Viser antallet af pakker sendt af den tilknyttede trådløse klient."
			},{
				type: "paragraph",
				content: "Klik på Opdater for at opdatere informationen på denne side."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Indstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Gæstenetværket giver dig mulighed for at oprette et separat netværk med et separat trådløst netværksnavn (SSID) og adgangskode, som du kan benytte til at få adgang til dit trådløse netværk."
			},{
				type: "name",
				title: "Giv gæsterne mulighed for at se hinanden",
				content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværket at se hinanden."
			},{
				type: "name",
				title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
				content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværket at få adgang til dit lokale netværks delinger og printere."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "2,4GHz/5GHz trådløst netværk",
			CONTENT: [{
				type: "name",
				title: "Aktiver gæstenetværk",
				content: "Marker dette afkrydsningsfelt for at aktivere funktionen gæstenetværk."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan enten bruge standard gæste-SSID eller oprette et nyt navn (op til 32 tegn)."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule gæste-SSID fra listen over trådløse netværk."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Opdateringsinterval for adgangskode",
				content:"Vælg opdateringsintervallet for dit gæstenetværks adgangskode."
			}*/,{
				type: "name",
				title: "Sikkerhed",
				content: "Når du vælger aldrig at opdatere adgangskoden, skal du vælge en af følgende sikkerhedsmuligheder:",
				children: [{
					type: "name",
					title: "Ingen sikkerhed",
					content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit gæstenetværk mod uautoriseret adgang."
				},{
					type: "name",
					title: "WPA/WPA2-personlig",
					content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Hvis den vælges, skal du konfigurere følgende.",
					children: [{
						type: "name",
						title: "Version",
						content: "Vælg en sikkerhedsversion for dit gæstenetværk.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Denne indstilling giver et godt sikkerhedsniveau."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Denne funktion giver en bedre sikkerhed end WPA-PSK og anbefales."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Automatisk (for både TKIP og AES). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen."
					}]
			}]},{
				type: "name",
				title: "Adgangskode",
				content: "Brug enten adgangskoden der genereres tilfældigt, eller opret en adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},

		NAT: {
			TITLE: "Gateway til programlaget (ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG giver brugerdefinerede NAT (Network Address Translation) traversal-filtre der kan tilsluttes gatewayen for at understøtte oversættelse af adresser og porte for visse programlag af \"kontrol/data\"-protokoller: FTP, TFTP, H323 osv. Så aktivering af ALG anbefales."
			},{
				type: "name",
				title: "Aktiver FTP-ALG",
				content: "Hvis det er valgt, giver det mulighed for at bruge FTP (File Transfer Protocol) klienter og servere til at overføre data via NAT."
			},{
				type: "name",
				title: "Aktiver TFTP-ALG",
				content: "Hvis det er valgt, giver det mulighed for at bruge TFTP (Trivial File Transfer Protocol) klienter og servere til at overføre data via NAT."
			},{
				type: "name",
				title: "Aktiver H323 ALG",
				content: "Hvis det er valgt, giver det mulighed for at Microsoft NetMeeting-klienter kan kommunikere via NAT."
			},{
				type: "name",
				title: "Aktiver RTSP-ALG",
				content: "Hvis det er valgt, kan medieafspiller-klienter kommunikere med streaming medie-servere via NAT."
			},{
				type: "name",
				title: "Aktiver PPTP-passthrough",
				content: "Hvis det er valgt, giver det mulighed for at punkt-til-punkt sessioner kan tunnelføres gennem et IP-netværk og gennem routeren."
			},{
				type: "name",
				title: "Aktiver L2TP-passthrough",
				content: "Hvis det er valgt, giver det mulighed for at Lag 2 punkt-til-punkt sessioner kan tunnelføres gennem et IP-netværk og gennem routeren."
			},{
				type: "name",
				title: "Aktiver IPSec-passthrough",
				content: "Hvis det er valgt, giver det mulighed for at IPSec (Internet Protocol security) kan tunnelføres gennem et IP-netværk og gennem routeren. IPSec anvender kryptografiske sikkerhedstjenester til at sikre privat og sikker kommunikation over IP-netværk."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Virtuelle servere",
			CONTENT: [{
				type: "paragraph",
				content: "Virtuelle servere bruges til at konfigurere offentlige tjenester på dit lokale netværk. En virtuel server er defineret som en ekstern port, og alle anmodninger fra internettet til denne eksterne port vil blive omdirigeret til en særskilt computer, som skal være konfigureret med en statisk eller reserveret IP-adresse."
			},{
				type: "name",
				title: "Tjenestetype",
				content: "Viser navnet på din virtuelle server."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser portnummeret eller et interval af porte, der bruges af den virtuelle server."
			},{
				type: "name",
				title: "Intern IP",
				content: "Viser IP-adressen på den computer, der kører tjenesteprogrammet."
			},{
				type: "name",
				title: "Intern port",
				content: "Viser portnummeret på den computer, der kører tjenesteprogrammet."
			},{
				type: "name",
				title: "Protokol",
				content: "Viser den protokol, der benyttes til tjenesteprogrammet: TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
			},{
				type: "name",
				title: "Status",
				content: "Viser den aktuelle status (tændt eller slukket) for den specifikke filteregel."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
			},{
				type: "step",
				title: "Sådan konfigureres en virtuel serverregel",
				content: [
					"1. Klik på Tilføj.",
					"2. Klik på Vis eksisterende tjenester for at vælg en tjeneste fra listen for automatisk at udfylde de relevante portnumre på felterne for den eksterne port og interne port. Hvis tjenesten ikke er på listen, kan man indtaste det eksterne portnummer (f. eks. 21) eller et interval af porte (f. eks. 21-25). Lad den interne Port være tom, hvis det er det samme som den eksterne port eller angiv et bestemt portnummer (f. eks. 21), hvis den eksterne port er en enkelt port. Indtast IP-adressen på den computer, der kører tjenesteprogrammet i decimalformat på feltet for den interne IP.",
					"3. Vælg en protokol for tjenesteprogrammet: TCP, UDP eller Alle fra rullemenuen Protokolliste.",
					"4. Vælg Aktiver.",
					"5. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan redigeres eller slettes en virtuel serverregel",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til reglen, som du vil redigere eller slette."
			},{
				type: "step",
				title: "Sådan sletter du flere regler",
				content: "Vælg alle de regler, som du ønsker at slette og klik på Slet over tabellen."
			},{
				type: "note",
				title: "Bemærk",
				content: "Hvis din lokale host-enhed er host for mere end én type tjenester, skal du oprette en regel for hver tjeneste."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Portudløsning",
			CONTENT: [{
				type: "paragraph",
				content: "Portudløsning bruges til at fremsende trafik på en bestemt port til specifikke server på netværket."
			},{
				type: "name",
				title: "Anvendelse",
				content: "Viser navnet på programmet."
			},{
				type: "name",
				title: "Portudløsning",
				content: "Viser den udgående trafikport der anvendes til at udløse en filtreringsregel af en udgående forbindelse."
			},{
				type: "name",
				title: "Udløserprotokol",
				content: "Viser den protokol, der benyttes for den udløste port. TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser porten eller intervallet af porte der anvendes af det eksterne system. Et svar gennem en af disse porte vil blive videresendt til den PC, som udløser denne regel. Du kan højst indtaste 5 portgrupper (eller portafsnit). Hver portgruppe skal adskilles med \",\" (kommaer), f. eks. 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "Ekstern protokol",
				content: "Viser den protokol, der benyttes for indgående port: TCP, UDP eller ALLE (alle understøttede protokoller på routeren)."
			},{
				type: "name",
				title: "Status",
				content: "Viser den aktuelle status (tændt eller slukket) for den specifikke filteregel."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
			},{
				type: "step",
				title: "Sådan konfigureres en portudløsningsregel",
				content: [{
					type: "note",
					title: "Bemærk",
					content: "Hver regel kan kun anvendes af en host ad gangen."
				},
					"1. Klik på Tilføj.",
					"2. Klik på Vis eksisterende programmer for at vælge et program fra listen for automatisk at udfylde standardværdierne i felterne. Hvis du vil tilføje et ikke-angivet program, skal du manuelt angive programmet, udløserporten, udløserprotokollen, ekstern port og ekstern protokol.",
					"3. Vælg Aktiver.",
					"4. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan redigeres eller slettes en portudløsningsregel",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til reglen, som du vil redigere eller slette."
			},{
				type: "step",
				title: "Sådan slettes flere portudløsningsregler",
				content: "Vælg alle de regler, som du ønsker at slette i tabellen og klik på Slet over tabellen."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "DMZ (Demilitarized Zone) host-funktionen giver mulighed for at en lokal host kan være synlig på internettet for en specialtjeneste, såsom spil over internettet eller videokonferencer. Grundlæggende set tillader DMZ en enkelt computer på dit LAN at åbne sine porte. Denne computer skal konfigureres med en statisk IP-adresse og have sin DHCP-klientfunktion deaktiveret."
			},{
				type: "step",
				title: "Sådan tildeles en computer eller server som DMZ-server",
				content: [
					"1. Vælg Aktiver DMZ.",
					"2. I feltet DMZ Host-IP-adresse, skal du indtaste IP-adressen på en lokal computer som sættes op som DMZ-host.",
					"3. Klik på Gem."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Som standard, er funktionen UPnP (Universal Plug and Play) aktiveret for at tillade enheder, f. eks. computere og Internetprogrammer automatisk at opdage og kommunikere med hinanden på det lokale netværk."
			},{
				type: "paragraph",
				content: "UPnP-tjenestelisten viser information om UPnP-enheden."
			},{
				type: "name",
				title: "Servicebeskrivelse",
				content: "Viser en kort beskrivelse af den lokale host der initierer UPnP-anmodningen."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser den eksterne port som åbnes af den lokale host."
			},{
				type: "name",
				title: "Protokol",
				content: "Viser netværksprotokollen som bruges af den lokale host."
			},{
				type: "name",
				title: "Intern IP-adresse",
				content: "Viser IP-adressen på den lokale host."
			},{
				type: "name",
				title: "Intern port",
				content: "Viser den interne port som åbnes af den lokale host."
			},{
				type: "paragraph",
				content: "Klik på Opdater for at opdatere UPnP-tjenestelisten."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Enhedsindstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Siden Enhedsindstillinger viser de tilknyttede oplysninger om tilsluttede USB-lagringsenhed via USB-porten."
			},{
				type: "name",
				title: "Scan",
				content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne efter nye tilsluttede enhed og opdatere siden med de opdaterede oplysninger."
			},{
				type: "name",
				title: "Volumen",
				content: "Viser navnet på USB-drevet."
			},{
				type: "name",
				title: "Kapacitet",
				content: "Viser den samlede lagerkapacitet på USB'en."
			},{
				type: "name",
				title: "Ledig plads",
				content: "Viser den aktuelle frie lagerplads."
			},{
				type: "name",
				title: "Sikker fjernelse",
				content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren."
			},{
				type: "paragraph",
				content: "Bemærk venligst, at knappen Sikker fjernelse kun vises, når der er en USB-lagringsenhed, der er tilsluttet routeren, og du ikke vil være i stand til at lukke USB-enheden, mens det aktuelle drev er optaget."
			},{
				type: "name",
				title: "Status",
				content: "Dette afkrydsningsfelt vises kun, når der er en USB-lagringsenhed, der er tilsluttet routeren. Vælg for at aktivere fildeling på USB-enheden."
			},{
				type: "step",
				title: "Sådan etableres en filserver",
				content: [
				"1. Tilslut USB-lagringsenheden til USB-porten på routeren ved hjælp af et USB-kabel.",
				"2. Den nyligt tilsluttede USB-enhed bør automatisk blive registreret af routeren og oplysningerne bør vises under afsnittet Enhedsindstillinger. Hvis ikke, skal du klikke på Scan.",
				"3. Vælg Aktiveret for at aktivere fildeling."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Kontodeling",
			CONTENT: [{
				type: "name",
				title: "Konto",
				content: "Du kan enten vælge at bruge Standard-konto for at logge på til de delte filer og mapper eller Brug ny konto og indtaste følgende for at oprette en ny brugerkonto."
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast et brugernavn på mellem 1 og 15 alfanumeriske eller understregede tegn og en adgangskode på mellem 1 og 15 ASCII-tegn. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Bekræft adgangskode",
				content: "Indtast adgangskoden igen for at bekræfte, at der ingen slåfejl er. Dette felt skelner også mellem store og små bogstaver."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Indstillingerne for deling",
			CONTENT: [{
				type: "name",
				title: "Navn på netværk/Medie-server",
				content: "Viser det navn der bruges til at få adgang til en tilsluttet USB-lagerenhed. Navnet skal være består af alfanumeriske tegn, understregninger eller bindestreger og være fra 4 til 15 tegn langt."
			},{
				type: "name",
				title: "Aktiver",
				content: "Vælg for at aktivere adgangsmetoden."
			},{
				type: "name",
				title: "Adgangsmetode",
				content: "Der er tre metoder til at give adgang til den tilsluttede USB-lagringsenhed. Du kan vælge en eller flere metoder ved at vælge det relevante afkrydsningsfelt.",
				children: [{
					type: "name",
					title: "Netværks nabolag",
					content: "Hvis aktiveret, kan brugere på netværket få adgang til USB-lagringsenheden via en tildelt IP-adresse (f. eks. \\\\192.168.0.1)."
				},{
					type: "name",
					title: "FTP",
					content: "Hvis aktiveret, kan FTP-klienter på dit lokale netværk kan få adgang til USB-lagerenheden ved hjælp af den tildelte IP-adresse efterfulgt af FTP-serverens portnummer (f. eks. ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (via internet)",
					content: "Hvis den er aktiveret, kan brugerne få fjernadgang til USB-lagerenheden via FTP på internettet. Denne funktion understøtter både download og upload af filer. Sådan ændres FTP-serverens portnummer, skal man indtaste et portnummer og klikke på Gem for at anvende ændringerne."
				}]
			},{
				type: "name",
				title: "Link",
				content: "Viser adressen der bruges til at få adgang til den tilsluttede USB-lagerenhed."
			},{
				type: "name",
				title: "Port",
				content: "Indtast portnummeret på FTP-serveren. Brug standardværdien 21, eller indtast en værdi mellem 1024 og 65535."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Mappedeling",
			CONTENT: [{
				type: "name",
				title: "Del alt",
				content: "Aktiver for at dele filer og mapper eller deaktiver for kun at dele de valgte mapper."
			},{
				type: "name",
				title: "Aktiverer godkendelse",
				content: "Det anbefales på det kraftigste at aktivere godkendelse for at kræve at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper."
			},{
				type: "name",
				title: "Mappenavn",
				content: "Viser navnet på den delte mappe."
			},{
				type: "name",
				title: "Sti til mappe",
				content: "Viser stien til den delte mappe."
			},{
				type: "name",
				title: "Mediedeling",
				content: "Angiver om den delte mappe er godkendt for deling af medier eller ej."
			},{
				type: "name",
				title: "Drevnavn",
				content: "Viser navnet på det delte drev."
			},{
				type: "name",
				title: "Status",
				content: "Viser statusen af den delte mappe med lampeindikatoren."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende delte mappe."
			},{
				type: "name",
				title: "Gennemse",
				content: "Klik på for at søge efter en fælles mappe."
			},{
				type: "name",
				title: "Tillad adgang for gæstenetværket",
				content: "Vælg for at tillade at klienter på gæstenetværket kan få adgang til de delte mapper."
			},{
				type: "name",
				title: "Aktiverer godkendelse",
				content: "Vælg for at kræve, at brugerne kan få adgang til de delte mapper med et gyldigt brugernavn og adgangskode."
			},{
				type: "name",
				title: "Tillad skriveadgang",
				content: "Vælg for at tillade brugere at foretage ændringer til mappeindholdet."
			},{
				type: "name",
				title: "Tillad mediedeling",
				content: "Vælg for at aktiveret mediedeling."
			},{
				type: "name",
				title:"Opdater",
				content: "Klik for at opdatere mappedelingslisten."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Printerserver",
			CONTENT: [{
				type: "name",
				title:"Printerserver",
				content: "Aktiver for at aktivere printerserverfunktionen."
			},{
				type: "name",
				title:"Printernavn",
				content: "Viser navnet på den printer, der er tilsluttet til routeren."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Offline download",
			CONTENT: [{
				type: "name",
				title:"Status",
				content: "Slå til for at aktivere funktionen Offline download."
			},{
				type: "name",
				title:"Sti til mappe",
				content: "Arbejdsmappen for funktionen Offline download. Du er nødt til at vælge en sti til mappen efter at statusknappen er tændt, ellers vil driftstabellen over elementer blive usynlig, hvilket betyder at du ikke kan gøre mere. Når arbejdsmappen er indstillet, vil alle filer der oprettes af følgende operationer gemmes eller caches i mappen. Hvis der er aktive elementer, kan arbejdsmappen ikke ændres, og det anbefales at du ikke tager USB-lageret ud, da det kan forårsage fatale fejl, som ikke kan repareres."
			},{
				type: "name",
				title:"Plan",
				content: "Hvis valgt, kan du indstille tidspunkterne for download. Tidsplanen er baseret på routerens system, som kan indstilles i \"Systemværktøjer -> Indstilling af tid\"."
			},{
				type: "name",
				title:"Fortsæt med at så efter at opgave er afsluttet",
				content: "Hvis valgt, vil den afsluttede opgave blive ved med at seede."
			},{
				type: "name",
				title: "Det maksimale antal aktive opgaver",
				content: "Viser det maksimale antal aktive opgaver."
			},{
				type: "name",
				title:"Maksimal downloadhastighed",
				content: "Viser den maksimale download-hastighed."
			},{
				type: "name",
				title:"Maksimal uploadehastighed",
				content: "Viser den mindste upload-hastighed."
			},{
				type: "name",
				title: "Antal forbindelser",
				content: "Viser forbindelsesindstillingerne."
			},{
				type: "name",
				title: "Samlet maksimalt antal forbindelser",
				content: "Ændre til at begrænse det maksimale antal forbindelser for alle opgaver."
			},{
				type: "name",
				title: "Det maksimale antal tilsluttede Peers pr. Torrent",
				content: "Ændre til at begrænse det maksimale antal forbundne peers pr. opgave."
			},{
				type: "name",
				title: "Aktiver DHT-netværk",
				content: "Hvis valgt, er DHT aktiveret."
			},{
				type: "name",
				title: "Aktiver Peer Exchange",
				content: "Hvis valgt, er peer-informationsudveksling aktiveret."
			},{
				type: "name",
				title: "Aktiver BitTorrent protokolkryptering",
				content: "Hvis valgt, er BitTorrent-protokolkryptering aktiveret."
			},{
				type: "name",
				title:"aMule-server",
				content: "Indtast IP-adressen og porten for aMule-serveren."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Elementer",
			CONTENT: [{
				type: "paragraph",
				content: "Viser downloadede poster."
			},{
				type: "name",
				title: "Fil",
				content: "Viser downloadede filnavne."
			},{
				type: "name",
				title:"Hastighed",
				content: "Viser upload- og download-hastighed."
			},{
				type: "name",
				title: "Afsluttet",
				content: "Viser den færdige størrelse og samlede størrelse."
			},{
				type: "name",
				title:"Resterende tid",
				content: "Viser hvor meget tid der er tilbage før download er fuldført."
			},{
				type: "name",
				title:"Tilsluttede Peers",
				content: "Vise oplysninger om peers-forbindelse."
			},{
				type: "name",
				title: "Status",
				content: "Viser status af opgave."
			},{
				type: "name",
				title: "Kilde",
				content: "Viser typen af download."
			},{
				type: "step",
				title: "Sådan tilføjes et download element",
				content: [
					"1. Klik på Tilføj.",
					"2. Vælg kildetype for download:",
					"1) Torrent fra PC: Klik på Gennemse for at vælge en torrent-fil fra PC.",
					"2) Torrent fra USB: Vælg et drev og klik på Gennemse for at vælge en torrent-fil fra USB.",
					"3) URL: Indtast URL(HTTP, HTTPS, FTP, ed2k).",
					"3. Klik på OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Forældrekontrol",
			CONTENT: [{
				type: "paragraph",
				content: "Med Forældrekontrol kan du blokere upassende, eksplicite og ondsindede websteder; begrænse adgangen på visse tider af dagen (for eksempel Facebook eller YouTube når der skal laves hjemmearbejde); og samtidig beskytte hver enhed i dit netværk mod malware og phishing gennem en central styring."
			},{
				type: "name",
				title: "Forældrekontrol",
				content: "Aktiver for at aktivere funktionen Forældrekontrol. Som standard er denne funktion deaktiveret."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Enheder med forældrekontrol",
			CONTENT: [{
				type: "paragraph",
				content: "Viser listen over enheder der er under Forældrekontrol."
			},{
				type: "name",
				title: "Enhedsnavn",
				content: "Viser navnet på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
			},{
				type: "name",
				title: "Internet-tid",
				content: "Viser tidsperioderne med begrænset adgang. Tidsplanen er baseret på routerens system som kan indstilles i \"Systemværktøjer -> Indstillinger\"."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en kort beskrivelse af de tilsluttede enheder. Dette er en valgfri indstilling."
			},{
				type: "name",
				title: "Status",
				content: "Viser den aktuelle status (tændt eller slukket) for Forældrekontrol på den relevante enhed."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende enhed."
			},{
				type: "step",
				title: "Sådan begrænses en ny klientenhed",
				content: [
					"1. Klik på Tilføj.",
					"2. Klik på Vis eksisterende enheder og vælg en aktuelt tilsluttet enhed fra listen over enheder med adgang, eller indtast navnet på enheden og MAC-adressen manuelt for at tilføje en enhed, som ikke er forbundet.",
					"3. Klik på ikonet for tidspunkter for internet adgang for at angive en tidsperiode, hvor begrænsningen gælder.",
					"4. Indtast en kort beskrivelse i feltet Beskrivelse. (Valgfri)",
					"5. Vælg Aktiver.",
					"6. Klik på OK for at gemme indtastningen."
				]
			},{
				type: "paragraph",
				content: "For at redigere eller slette et felt i forældrekontrol, skal du blot klikke på ikonet Rediger for at redigere oplysninger eller ikonet papirkurv for at fjerne det tilsvarende felt."
			},{
				type: "paragraph",
				content: "For at slette flere felter skal du vælge alle felterne og klikke på Slet over tabellen."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Indholdsbegrænsning",
			CONTENT: [{
				type: "name",
				title: "Sortliste",
				content: "Indeholder nøgleord, der bruges til at blokere adgang til en hjemmesides fra klientenheder, der er angivet i funktionen liste over Forældrekontrol.",
				children: [{
					type: "paragraph",
					content: "Klik på Tilføj et nyt nøgleord for at sortliste et nøgleord. For at slette et nøgleord, skal du klikke på symbolet (-) på de søgeord, du ønsker at slette."
				}]
			},{
				type: "name",
				title: "Hvidliste",
				content: "Indeholder adresser som klientenheder, der er angivet i listen over Forældrekontrol har adgang til.",
				children: [{
					type: "paragraph",
					content: "Klik på Tilføj et nyt domænenavn for at tilføje en hjemmeside til hvidlisten. For at slette en hjemmeside, skal du klikke på symbolet (-) på den hjemmeside, du ønsker at slette."
				}]
			},{
				type: "note",
				title: "Bemærk",
				content: "Søgeord kan også være domænenavne, f. eks. mail.google.com eller www.facebook.com."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme dine konfigurationer."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "QoS (Quality of Service) hjælper med at prioritere trafikken på internettet baseret på dine behov. Du kan angive prioritetsniveauet for en enhed eller et program i QoS-reglerne."
			},{
				type: "name",
				title: "Aktiverer QoS",
				content: "Marker dette afkrydsningsfelt for at aktivere QoS-funktionen."				
			},{
				type: "name",
				title: "Upload båndbredde",
				content: "Indtast den maksimale båndbredde for upload fra din internetudbyder."				
			},{
				type: "name",
				title: "Download båndbredde",
				content: "Indtast den maksimale båndbredde for download fra din internetudbyder."
			},{
				type: "name",
				title: "Høj prioritet",
				content: "Angiv en procentsats for trafik med høj prioritet."
			},{
				type: "name",
				title: "Mellemste prioritet",
				content: "Angiv en procentsats for trafik med middel prioritet."
			},{
				type: "name",
				title: "Lav prioritet",
				content: "Angiv en procentsats for trafik med lav prioritet."
			},{
				type: "note",
				title: "Bemærk",
				content: "Den maksimale størrelse (i procent) af alle prioriteter er 1."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		QOS_RULE: {
			TITLE: "QoS-regelliste",
			CONTENT: [{
				type: "name",
				title: "Type",
				content: "Vælg en type at tilføje til QoS-listen."
			},{
				type: "step",
				title: "Sådan konfigureres en regel for høj/middel/lav prioritet af enhed",
				content: [
					"1. Klik på Tilføj.",
					"2. Valg efter enhed.",
					"3. Klik på Vis eksisterende enheder for at vælge den ønskede enhed fra listen over adgangsenheder, eller du kan angive navnet på en enhed og dens MAC-adresse manuelt ind i  felterne Enhedsnavn og MAC-adresse.",
					"4. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan konfigureres en regel for høj/middel/lav prioritet af program",
				content: [
					"1. Klik på Tilføj.",
					"2. Vælg efter program.",
					"3. Vælg det ønskede program fra listen over programmer, eller du kan tilpasse et program, ved at konfigurere navnet, protokollen og destinationsporten (1-65535) i de relevanter felter, du kan angive en enkelt port eller flere porte eller en række porte, brug kommaer til at adskille (f. eks. 21,36 -105,111).",
					"4. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan konfigureres en regel for høj/middel/lav prioritet af fysisk port",
				content: [
					"1. Klik på Tilføj.",
					"2. Vælg efter fysisk port.",
					"3. Vælg den ønskede port.",
					"4. Klik på OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Opgradering af database",
			CONTENT: [{
				type: "name",
				title: "Ny databasefil",
				content: "Klik på Gennemse for at finde din nye database. Vælg det og klik på Opgrader for at opgradere din database til en nyere version."
			},{
				type: "name",
				title: "Databaseversion",
				content: "Viser den aktuelle version af databasen."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Firewall",
			CONTENT: [{
				type: "name",
				title: "SPI-firewall",
				content: "SPI (Stateful Packet Inspection) firewall forhindrer cyberangreb og validerer den trafik, der passerer gennem en router, der er baseret på protokollen."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS beskyttelse",
			CONTENT: [{
				type: "name",
				title: "DoS beskyttelse",
				content: "DoS (Denial of Service)-beskyttelse beskytter dit internet mod DoS-angreb fra at overbelaste dit netværk med serveranmodninger."
			},{
				type: "name",
				title: "ICMP-FLOOD angrebsfiltrering",
				content: "For at forhindre, ICMP (Internet Control Message Protocol) overbelastningsangreb.",
				children: [{
					type: "name",
					title: "Slukket",
					content: "Ingen beskyttelse."
				},{
					type: "name",
					title: "Lav",
					content: "Beskyttelse på lavt niveau og lav indflydelse på routerens ydelse."
				},{
					type: "name",
					title: "Midt",
					content: "Beskyttelse på middelniveau og middel indflydelse på routerens ydelse."
				},{
					type: "name",
					title: "Høj",
					content: "Beskyttelse på højt niveau med bemærkelsesværdig indflydelse på routerens ydelse."
				}]
			},{
				type: "name",
				title: "UDP-FLOOD angrebsfiltrering",
				content: "Aktiver for at forhindre, UDP (User Datagram Protocol) overbelastningsangrebet."
			},{
				type: "name",
				title: "TCP-SYN-FLOOD angrebsfiltrering",
				content: "For at undgå TCP-SYN (Transmission Control Protocol-Synchronize) overbelastningsangrebet."
			},{
				type: "name",
				title: "Ignorer Ping-pakke fra WAN-port",
				content: "Aktiverer at ignorere pingpakker fra WAN-porten."
			},{
				type: "name",
				title: "Forbyd Ping-pakke fra LAN-port",
				content: "Aktiverer for at forbyde pingpakker fra LAN-porten."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Blokeret DoS host-liste",
			CONTENT: [{
				type: "name",
				title: "Blokeret DoS host-liste",
				content: "List IP-adressen og MAC-adressen fra blokerede DoS angrebskilder."
			},{
				type: "step",
				title: "Sådan slettes en registrering",
				content: "Vælg den registrering, som du ønsker at slette i host-listen og klik på Slet over tabellen."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Adgangskontrol",
			CONTENT: [{
				type: "paragraph",
				content: "Adgangskontrol anvendes til at tillade eller blokere for bestemte computere og andre enheder fra at få adgang til dit netværk. Når en enhed er blokeret, kan den ikke kommunikere med andre enheder eller oprette forbindelse til internettet."
			},{
				type: "paragraph",
				content: "For at bruge Adgangskontrollen, skal du aktivere denne funktion og angive en sortliste eller hvidliste. Hvis adgangskontrollen er deaktiveret (slukket), tillades alle enheder, herunder sortlistede, at oprette forbindelse."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Adgangstilstand",
			CONTENT: [{
				type: "name",
				title: "Sortliste",
				content: "Kun enheder der er sortlistede vil blive nægtet adgang til dit netværk."
			},{
				type: "name",
				title: "Hvidliste",
				content: "Kun enheder der er hvidlistede vil blive givet adgang til dit netværk."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Enheder online",
			CONTENT: [{
				type: "name",
				title: "Enhedsnavn",
				content: "Viser navnet på de forbundne enheder."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser IP-adressen på de forbundne enheder."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på de forbundne enheder."
			},{
				type: "name",
				title: "Forbindelsestype",
				content: "Viser forbindelsestypen af de forbundne enheder."
			},{
				type: "step",
				title: "Sådan blokeres en enhed",
				content: "I tabellen over onlineenheder, skal du klikke på ikonet Bloker i kolonnen Rediger, der svarer til den enhed, du ønsker at blokere."
			},{
				type: "step",
				title: "Sådan blokeres flere enheder",
				content: "Vælg alle de enheder, som du ønsker at blokere i tabellen over onlineenheder og klik på Blokker over tabellen. Enheden vil automatisk blive tilføjet til sortlistede enheder."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Sortlistede/hvidlistede enheder",
			CONTENT: [{
				type: "step",
				title: "Sådan sortlistes eller hvidlistes en enhed",
				content: [
					"1. Klik på ikonet Tilføj.",
					"2. Indtast enhedens navn.",
					"3. Indtast MAC-adressen på enheden.",
					"4. Klik på OK."
				]
			},{
				type: "step",
				title: "Rediger eller slette en enhed der er sortlistet/hvidlistet",
				content: "I tabellen sortlistet/hvidlistet skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
			},{
				type: "step",
				title: "Slet flere enheder der er sortlistet/hvidlistet",
				content: "I tabellen sortlistet/hvidlistet, skal du vælge alle enheder som du vil slette og klik på Slet over tabellen."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Indstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "ARP (Address Resolution Protocol) binding er nyttigt til kontrol af adgangen til en bestemt computer på LAN ved at binde IP-adressen og MAC-adressen for enheden sammen. ARP-binding forhindrer også andre enheder fra at bruge en specifik IP-adresse."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP-liste",
			CONTENT: [{
				type: "paragraph",
				content: "Viser MAC- og IP-adressen på de aktuelt forbundne enheder."
			},{
				type: "name",
				title: "ARP-nummer",
				content: "Viser det samlede antal af enheder der aktuelt er tilsluttet routeren."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på de forbundne enheder."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser IP-adressen tildelt til de forbundne enheder."
			},{
				type: "name",
				title: "Bundet",
				content: "Angiver, om MAC- og IP-adresserne er bundne eller ej."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillinger for at binde eller slette den tilsvarende post fra listen."
			},{
				type: "note",
				title: "Bemærk",
				content: "Du kan ikke binde den samme IP-adresse til flere MAC-adresser."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Bindingsliste",
			CONTENT: [{
				type: "step",
				title: "Sådan konfigureres en enhed med ARP-binding",
				content: [
					"1. Klik på Tilføj.",
					"2. Indtast MAC-adressen på enheden.",
					"3. Indtast en IP-adresse, som du vil binde til ovennævnte MAC-adresse.",
					"4. Indtast en beskrivelse for denne enhed. (Valgfri)",
					"5. Vælg Aktiver.",
					"6. Klik på OK."
				]
			},{
				type: "step",
				title: "Sådan ændres eller slettes en registrering",
				content: "I bindingslisten skal du klikke på ikonet Rediger eller Papirkurv, der svarer til registreringen som du vil redigere eller slette."
			},{
				type: "step",
				title: "Sådan sletter du flere registreringer",
				content: "Vælg alle de registreringer, som du ønsker at slette i bindingslisten og klik på Slet over tabellen."
			}]
		},
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Vælg for at aktivere (On) eller deaktivere (Off) routerens IPv6-funktion."
			},{
				type: "title",
				title: "Internetforbindelsestype: Statisk IP",
			},{
				type: "name",
				title: "Statisk IP",
				content: "Vælg denne type, hvis din internetudbyder bruger tildeling af statiske IPv6-adresser."
			},{
				type: "name",
				title: "IPv6-adresse/standard gateway/primær DNS/sekundær DNS",
				content: "Indtast disse parametre fra din internetudbyder."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
			},{
				type: "title",
				title: "Internetforbindelsestype: Dynamisk IP",
			},{
				type: "name",
				title: "Dynamisk IP",
				content: "Vælg denne type, hvis din internetudbyder bruger tildeling af dynamiske IPv6-adresser."
			},{
				type: "name",
				title: "IPv6-adresse/primær DNS/sekundær DNS",
				content: "Disse parametre tildeles automatisk af DHCPv6-serveren fra din internetudbyder."
			},{
				type: "name",
				title: "Forny",
				content: "Klik på denne knap for at få nye IPv6-parametre fra din internetudbyders DHCPv6-server."
			},{
				type: "name",
				title: "Udgivelse",
				content: "Klik på denne knap for at frigive alle IPv6-adresser tildelt af din internetudbyders DHCPv6-server."
			},{
				type: "name",
				title: "Hent IPv6-adresse",
				content: "Vælg DHCPv6 for at få en midlertidig IPv6-adresse eller SLAAC for at få en IPv6-adresse fra routerannonceringspakken, ifølge din internetudbyder."
			},{
				type: "name",
				title: "Delegering af præfiks",
				content: "Vælg Aktiver for at få et præfiks delegeret af DHCPv6-serveren fra internetudbyderen, eller Deaktiver for at designere en præfiksadresse manuelt. Klienter på LAN vil generere en IPv6-adresse med dette præfik."
			},{
				type: "name",
				title: "DNS-adresse",
				content: "Vælg at få dynamisk fra din internetudbyder eller brug følgende DNS-adresse. Hvis Brug følgende DNS-adresse vælges, skal du manuelt indtaste DNS-adressen, som din internetudbyder har opgivet."
			},{
				type: "name",
				title: "Primær DNS/sekundær DNS",
				content: "Indtast disse parametre manuelt eller få dem dynamisk fra din internetudbyder."
			},{
				type: "title",
				title: "Internetforbindelsestype: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Vælg denne type, hvis din internetudbyder bruger PPPoEv6, og giver dig et brugernavn og adgangskode."
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast disse parametre fra din internetudbyder."
			},{
				type: "name",
				title: "IPv6-adresse",
				content: "Denne adresse vil blive tildelt automatisk af din internetudbyders DHCPv6-server, når du har indtastet brugernavn og adgangskode, og klik på Opret forbindelse."
			},{
				type: "name",
				title: "DNS-adresse",
				content: "Vælg at få dynamisk fra din internetudbyder eller brug følgende DNS-adresse. Hvis Brug følgende DNS-adresse vælges, skal du manuelt indtaste DNS-adressen, som din internetudbyder har opgivet."
			},{
				type: "name",
				title: "Hent IPv6-adresse",
				content: "Vælg DHCPv6 for at få en midlertidig IPv6-adresse eller SLAAC for at få en IPv6-adresse fra routerannonceringspakken, eller specificeret af internetudbyderen for manual indtastning af IPv6-adressen, ifølge din internetudbyder."
			},{
				type: "name",
				title: "Delegering af præfiks",
				content: "Vælg Aktiver for at få et præfiks delegeret af DHCPv6-serveren fra internetudbyderen, eller Deaktiver for at designere en præfiksadresse manuelt. Klienter på LAN vil generere en IPv6-adresse med dette præfik."
			},{
				type: "name",
				title: "Tilslut",
				content: "Klik på denne knap for at oprette forbindelse til internettet."
			},{
				type: "name",
				title: "Afbryd",
				content: "Klik på denne knap for at afbryde forbindelsen til internettet."
			},{
				type: "title",
				title: "Internetforbindelsestype: 6to4-tunnel"
			},{
				type: "name",
				title: "6to4-tunnel",
				content: "Vælg denne type, hvis din internetudbyder bruger 6to4 implementering til at tildele adresser."
			},{
				type: "name",
				title: "IPv4 adresse/IPv4 Undernetmaske/IPv4 Standard Gateway/Tunneladresse",
				content: "Disse parametre skal genereres dynamisk fra IPv4 information på WAN-porten efter at du klikke på Opret forbindelse."
			},{
				type: "name",
				title: "Brug følgende DNS-server",
				content: "Marker afkrydsningsfeltet for at angive den primære DNS og/eller sekundære DNS som oplyst af din internetudbyder."
			},{
				type: "name",
				title: "Tilslut",
				content: "Klik på denne knap for at oprette forbindelse til internettet."
			},{
				type: "name",
				title: "Afbryd",
				content: "Klik på denne knap for at afbryde forbindelsen til internettet."
			}/*,{
				type: "title",
				title: "Internetforbindelsestype: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Vælg denne type, hvis din internetudbyder bruger 6RD implementering og giver præfikser for en IPv4-adresse og IPv6-adresse."
			},{
				type: "name",
				title: "Konfigurationstype",
				content: "Vælg Auto eller Manuel for konfiguration af 6RD-kanalparametre i henhold til din internetudbyder. Hvis nedenstående standardparametre stemmer overens med dem, der er fastsat af din internetudbyder, kan du vælge Auto, ellers skal du vælge Manuel og angive parametre som oplyst af din internetudbyder."
			},{
				type: "name",
				title: "IPv4-maskelængde/ 6RD-præfiks/ 6RD-præfikslængde/grænse IPv4-svaradresse",
				content: "Kontrollér at de forudindstillede parametre stemmer overens med dem, der leveres af din internetudbyder. Du kan enten beholde standardindstillingerne eller manuelt indtaste parametrene som oplyst af din internetudbyder."
			},{
				type: "title",
				title: "Internetforbindelsestype: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Vælg denne type, hvis din internetudbyder bruger DS Lite-installation og giver et AFTR-domænenavn eller IPv6-adresse til oprettelsen af en IPv4-i-IPv6 tunnel i IPv6-netværket til at kommunikere IPv4-trafik eller IPv6-trafik i deres respektive netværk."
			},{
				type: "name",
				title: "AFTR-navn",
				content: "AFTR er en forkortelse for Address Family Transition Router. I dette felt kan du angive AFTR-domænenavnet eller IPv6-adressen som din internetudbyder har opgivet."
			},{
				type: "name",
				title: "Sekundær forbindelse",
				content: "Vælg den sekundære forbindelsetype som din internetudbyder har opgivet.",
				children :[ 
				{
					type: "name",
					title: "Dynamisk IP",
					content: "Vælg denne indstilling, hvis din internetudbyder giver en dynamisk IP som den sekundære forbindelsestype og parametrene, IPv6-adresse, primær DNS og/eller sekundær DNS tildeles automatisk af DHCPv6-serveren fra internetudbyderen."
				},
				{
					type: "name",
					title: "Statisk IP",
					content: "Vælg denne indstilling, hvis din internetudbyder giver statisk IP som den sekundære forbindelsestype og indtast IPv6-adressen, standardgateway, primær DNS og/eller sekundær DNS som du har fået fra din internetudbyder, og konfigurer derefter MTU-størrelsen manuelt (hvis påkrævet) eller beholde standardværdien."
				},{
					type: "name",
					title: "PPPoE",
					content: "Vælg denne indstilling, hvis din internetudbyder giver PPPoE som den sekundære forbindelsestype og indtast det brugernavn og den adgangskode, som du har fået fra din internetudbyder. IPv6-adressen vil automatisk blive tildelt efter at du klikker på Opret forbindelse."
				}]
			}*/,{
				type: "title",
				title: "Internetforbindelsestype: Passthrough (Bro)"
			},{
				type: "paragraph",
				content: "Vælg denne type, hvis din internetudbyder bruger passthrough (Bro) netværksimplementering. Ingen konfiguration nødvendig for denne type forbindelse."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Undtagen for passthrough (Bro), kræver de øvrige 6 typer internetforbindelse IPv6-konfiguration."
			},{
				type: "name",
				title: "Tildelt type",
				content: "Vælg den ønskede, som anbefalet af din internetudbyder.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Sådan tildeles IP-adresser automatisk til klienter på internettet.",
					children: [{
						type: "name",
						title: "Præfiks for adresse",
						content: "Indtast adressepræfikset fra din internetudbyder."
					},{
						type: "name",
						title: "Udløsningstid",
						content: "Den tid i sekunder, som den tildelte IP-adresse er gyldig. Enten behold standardværdien på 86400 sekunder eller ændr den hvis det kræves af din internetudbyder."
					},{
						type: "name",
						title: "Adresse",
						content: "Det er IP-adresse der er tildelt automatisk af DHCPv6-serveren fra internetudbyderen."
					}]
				},{
					type: "name",
					title: "SLAAC+tilstandsfri DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Præfiks for adresse",
						content: "Indtast adressepræfikset fra din internetudbyder."
					},{
						type: "name",
						title: "Adresse",
						content: "Det er IP-adressen der er tildelt automatisk af internetudbyderen."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Præfiks for adresse",
						content: "Indtast adressepræfikset fra din internetudbyder."
					},{
						type: "name",
						title: "Adresse",
						content: "Det er IP-adressen der er tildelt automatisk af internetudbyderen."
					}]
				}]
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC-klone",
			CONTENT: [{
				type: "name",
				title: "Brug standard MAC-adresse",
				content: "Undlad at ændre routerens MAC-adresse, hvis internetudbyderen ikke binder den tildelte IP-adresse til en MAC-adresse."
			},{
				type: "name",
				title: "Brug computerens aktuelle MAC-adresse",
				content: "Vælg for at kopiere den aktuelle MAC-adressen på computeren, der er sluttet til routeren, hvis internetudbyderen binder den tildelte IP-adresse til computerens MAC-adresse."
			},{
				type: "name",
				title: "Brug brugerdefineret MAC-adresse",
				content: "Indtast MAC-adressen manuelt, hvis internetudbyderen binder den tildelte IP-adresse til den specifikke MAC-adresse."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "indstilling af tid",
			CONTENT: [{
				type: "step",
				title: "Sådan synkroniseres tiden automatisk",
				content: [
					"1. I feltet Indstil tid, skal du vælge Hent automatisk fra internettet.",
					"2. Vælg din lokale tidszone fra rullemenuen.",
					"3. I feltet for NTP-server I, skal du indtaste IP-adressen eller domænenavnet for din ønskede NTP-server.",
					"4. I feltet for NTP-server II, skal du indtaste IP-adressen eller domænenavnet for den anden NTP-server. (Valgfri)",
					"5. Klik på Hent.",
					"6. Klik på Gem."
				]
			},{
				type: "step",
				title: "Sådan indstilles dato og klokkeslæt manuelt",
				content: [
					"1. I feltet Indstil tid, skal du vælge Manuelt.",
					"2. Indtast dags dato.",
					"3. Vælg den aktuelle tid (i 24-timers format, f. eks. 16:00:00 for 04:00pm).",
					"4. Klik på Gem."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Sommertid",
			CONTENT: [{
				type: "step",
				title: "Opsætning af sommertid",
				content: [
					"1. Vælg Aktiver sommertid.",
					"2. Vælg den korrekte Startdato og klokkeslæt hvor sommertid begynder i din lokale tidszone.",
					"3. Vælg den korrekte Slutdato og klokkeslæt hvor sommertid ender i din lokale tidszone.",
					"4. Klik på Gem."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Fejlfinding",
			CONTENT: [{
				type: "paragraph",
				content: "Routeren har Ping- og Traceroute-værktøjer til at hjælpe dig med at fejlfinde problemer med netværksforbindelsen. Ping-værktøjet sender pakker til en IP-adresse eller et domænenavn og logger resultaterne, f. eks. antallet af pakker, der er sendt og modtaget, og tur-returtiden. Traceroute-værktøjet sender pakker til en IP-adresse eller domænenavn og viser antallet af hop og tiden for at nå destinationen."
			},{
				type: "paragraph",
				content: "Du kan bruge ping og traceroute på en lokal enhed ved hjælp af IP-adressen eller et domænenavn, såsom google.com, msn.com, yahoo.com, aol osv. osv."
			},{
				type: "step",
				title: "Sådan diagnosticerer man ved hjælp af Ping",
				content: [
					"1. Indtast IP-adressen eller domænenavnet du ønsker at nå.",
					"2. Klik på pilen for at åbne menuen Avanceret og angive Ping-tælleren, og Ping-pakkestørrelsen. (Valgfri)",
					"3. Klik på Start."
				]
			},{
				type: "step",
				title: "Sådan diagnosticerer man ved hjælp af Traceroute",
				content: [
					"1. Indtast IP-adressen eller domænenavnet du ønsker at nå.",
					"2. Klik på pilen for at åbne menuen Avanceret og angive antallet af hop (der skal nås) i feltet Traceroute Max TTL (Time to Live). Standardindstillingen er 20. (Valgfri)",
					"3. Klik på Start."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Opgradering af firmware",
			CONTENT: [{
				type: "paragraph",
				content: "Før du udfører firmware-opgradering af routeren, skal du downloade den seneste firmwareopdatering fra <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK Support</a> hjemmesiden til din computer."
			},{
				type: "step",
				title: "VIGTIGT: For at forhindre opgraderingsfejl, bedes du bemærke følgende:",
				content: [
					"Sørg for at den nyeste firmware-file er afstemt med hardware-versionen (som vist på siden for opgradering af firmwaren).",
					"Sørg for at du har en stabil forbindelse mellem routeren og computeren. Det anbefales IKKE at opgradere firmwaren trådløst.",
					"Sørg for at fjerne alle USB-lagringsenhed, der er tilsluttet routeren, før opgraderingen af firmwaren for at undgå tab af data.",
					"Sikkerhedskopier din routers konfiguration.",
					"Sluk IKKE for routeren under firmwareopgraderingen."
				]
			},{
				type: "step",
				title: "Sådan opgraderes routerens firmware",
				content: [
					"1. Klik på Gennemse.",
					"2. Find og marker den downloadede firmware-fil.",
					"3. Klik på Opgrader."
				]
			},{
				type: "paragraph",
				content: "Opdateringsprocessen tager et par minutter. Du må IKKE slukke for routeren, mens opdateringen er i gang."
			}]
		},
		
		BACKUP: {	
			TITLE: "Backup",
			CONTENT: [{
				type: "paragraph",
				content: "Det anbefales, at du sikkerhedskopierer dine aktuelle konfigurationer, for det tilfælde at det er nødvendig for at gendanne systemet til en tidligere tilstand eller fra fabriksindstillingerne."
			},{
				type: "paragraph",
				content: "Klik på Backup (Sikkerhedskopiering) for at gemme dine aktuelle konfigurationer til din computer. Sørg for at gemme en backup-fil på et sikkert sted, hvor du kan hente og gendanne routeren senere, hvis det er nødvendigt."
			}]
		},
		
		RESTORE: {
			TITLE: "Gendan",
			CONTENT: [{
				type: "step",
				title: "Sådan gendannes fra backup",
				content: [
					"1. Klik på Gennemse.",
					"2. Find og vælg backup-filen.",
					"3. Klik på Gendan."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Gendannelse af fabriksindstillingerne",
			CONTENT: [{
				type: "paragraph",
				content: "Klik på Fabriksnulstilling for at nulstille din router til fabriksindstillingerne."
			},{
				type: "step",
				title: "Bemærk",
				content: [
					"1. Fabriksnulstilling sletter alle indstillinger, som du har konfigureret for routeren. For at logge ind på routerens administrationsside, skal du bruge standardadgangskoden admin for både brugernavn og adgangskode.",
					"2. Sluk IKKE for routeren, mens sikkerhedskopiering eller opdatering er i gang."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Kontostyring",
			CONTENT: [{
				type: "paragraph",
				content: "Denne side giver dig mulighed for at ændre dit logon-brugernavn og/eller adgangskode, og til at angive en e-mailadresse til gendannelse af adgangskoder."
			},{
				type: "name",
				title: "Gamle brugernavn",
				content: "Indtast dit nuværende brugernavn."
			},{
				type: "name",
				title: "Gamle adgangskode",
				content: "Indtast din nuværende adgangskode."
			},{
				type: "name",
				title: "Nyt brugernavn",
				content: "Indtast dit nye brugernavn."
			},{
				type: "name",
				title: "Ny adgangskode",
				content: "Indtast din nye adgangskode."
			},{
				type: "name",
				title: "Bekræft ny adgangskode",
				content: "Indtast din nye adgangskode igen."
			},{
				type: "note",
				title: "Bemærk",
				content: "Hvis du beslutter dig for at ændre det aktuelle brugernavn og adgangskode til at logge på routeren, skal du sørge for at skrive de nye login-oplysninger ned på et sikkert sted."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Gendannelse af adgangskode",
			CONTENT: [{
				type: "name",
				title: "Aktiver gendannelse af adgangskoder",
				content: "Det anbefales kraftigt, at du aktiverer funktionen gendannelse af adgangskoder, hvilket vil hjælpe med at nulstille dit brugernavn og adgangskode via e-mail."
			},{
				type: "name",
				title: "Fra",
				content: "Indtast en gyldig e-mailadresse, der skal bruges til udgående e-mails."
			},{
				type: "name",
				title: "Til",
				content: "Indtast en gyldig e-mailadresse, der skal bruges til indkommende e-mails."
			},{
				type: "name",
				title: "SMTP-server",
				content: "Indtast SMTP-serverens adresse, som routeren bruger til at sende verifikationskoden via e-mail."
			},{
				type: "name",
				title: "Aktiverer godkendelse",
				content: "Vælg Aktiver godkendelse hvis den udgående e-mail-server kræver godkendelse for at afsende e-mails, og udfyld brugernavn og adgangskode i de relevante felter. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Lokalstyring",
			CONTENT: [{
				type: "paragraph",
				content: "Dette afsnit giver dig mulighed for at begrænse antallet af klientenheder på dit LAN fra at have adgang til routeren ved hjælp af MAC-adresse-baseret godkendelse."
			},{
				type: "name",
				title: "Adgang for alle LAN-tilsluttede enheder",
				content: "Aktiver for at aktivere lokal styring af alle enheder på internet forbundne enheder eller deaktiver for at aktivere styring af en bestemt enhed."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på enheden med begrænsede adgang."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser beskrivelsen på enheden med begrænsede adgang."
			},{
				type: "name",
				title: "Status",
				content: "Viser den aktuelle status af enheden for begrænset adgang (aktiveret eller deaktiveret)."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillinger for at ændre og slette den tilsvarende enhed fra listen."
			},{
				type: "step",
				title: "Sådan tilføjes en klientenhed til listen",
				content: [
					"1. Klik på Tilføj.",
					"2. Klik på Vis eksisterende enheder for at vælger en eksisterende enhed, eller indtast MAC-adressen for en enhed i feltet MAC-adresse.",
					"3. Indtast en beskrivelse for enheden.",
					"4. Vælg Aktiver.",
					"5. Klik på OK."
				]
			},{
				type: "step",
				title: "Rediger eller slet en enhed på listen",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
			},{
				type: "step",
				title: "Sådan sletter du flere enheder",
				content: "Vælg alle de enheder, som du ønsker at slette og klik på Slet."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Fjernadministration",
			CONTENT: [{
				type: "paragraph",
				content: "Funktionen Fjernstyring giver dig adgang til og konfigurere routeren fra internettet."
			},{
				type: "name",
				title: "Deaktiver fjernadministration",
				content: "Vælg denne indstilling for at deaktivere fjernstyringen."
			},{
				type: "name",
				title: "Aktiverer fjernadministration for alle enheder",
				content: "Vælg denne indstilling for at aktivere fjernstyringen til alle IP-adresser. Hvis valgt, udfyld feltet Webstyring af port."
			},{
				type: "name",
				title: "Aktiverer fjernadministration for specifikke enheder",
				content: "Vælg denne indstilling for at aktivere fjernstyringen for en specifik IP-adresse. Hvis valgt, udfyld feltet Webstyring af port og fjernstyring af IP-adresse."
			},{
				type: "name",
				title: "Port for web-administration",
				content: "Indtast portnummeret mellem 1024 og 65535, som bruges til at få adgang til routerens webstyringsinterface med større sikkerhed. Normalt bruger webbrowsere HTTP-tjenesteport 80. Standard og fælles tjenesteport er 8080, hvilket er en alternativ tjenesteport for HTTP."
			},{
				type: "name",
				title: "IP-adresse for fjernadministration",
				content: "Indtast en gyldig IP-adresse for at få adgang til routeren."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Systemlog",
			CONTENT: [{
				type: "paragraph",
				content: "Systemlogget viser en liste over de seneste aktiviteter (hændelser) i routeren. Du kan definere, hvilke typer af logfiler og/eller niveauer af logger du vil se. Denne side har også e-mail-funktion, som du kan konfigurere til automatisk at sende logfiler til en bestemt e-mailadresse, eller eksportere logfiler til en computer."
			},{
				type: "name",
				title: "Type",
				content: "Vælg typen af systemlog der skal vises."
			},{
				type: "name",
				title: "Niveau",
				content: "Vælg niveauet af systemlog der skal vises."
			},{
				type: "name",
				title: "Opdater",
				content: "Klik på denne ikon for at opdatere systemloggen."
			},{
				type: "name",
				title: "Slet alle",
				content: "Klik på denne ikon for at slette systemloggerne."
			},{
				type: "name",
				title: "Gem logfil",
				content: "Klik på denne knap for at hente alle systemlogfiler til din lokale computer."
			},{
				type: "name",
				title: "E-mail-indstillinger",
				content: "Klik på denne knap for at konfigurere e-mailindstillinger for systemlogfiler."
			},{
				type: "step",
				title: "Sådan konfigureres e-mailindstillinger for systemlogfiler",
				content: [
					"1. Klik på e-mailindstillinger.",
					"2. Fra - Indtast en gyldig e-mailadresse, der skal bruges til udgående e-mails.",
					"3. Til - Indtast en gyldig e-mailadresse, der skal bruges til indkommende e-mails.",
					"4. SMTP-server - Indtast SMTP-serverens adresse, som routeren bruger til at sende systemloggerne via e-mail.",
					{
						content: "5. Aktiverer Godkendelse - Vælg denne indstilling, hvis SMTP-serveren kræver godkendelse for at sende e-mails.",
						children: [{
							type: "name",
							title: "Brugernavn",
							content: "Indtast brugernavnet til SMTP-serveren. Dette felter skelner mellem store og små bogstaver."
						},{
							type: "name",
							title: "Adgangskode",
							content: "Indtast adgangskoden til SMTP-serveren. Dette felt skelner også mellem store og små bogstaver."
						}]
					},{
						content: "6. Aktiverer automatisk e-mail - Vælg denne indstilling for at angive, hvilken tid på dagen, systemloggen skal sendes automatisk.",
						children: [{
							type: "paragraph",
							content: "For at sende systemloggen hver dag på et bestemt tidspunkt skal du angive tiden i timer (TT) og minutter (mm) i 24-timers format, f. eks. er 16:00 4PM."
						},{
							type: "paragraph",
							content: "For at sende systemloggen på et bestemt tidspunkt eller tidsinterval, skal du angive antallet af timer."
						}]
					},
					"7. Klik på Gem."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Statistik over trafik",
			CONTENT: [{
				type: "paragraph",
				content: "Side med statistik over trafik viser netværkstrafik på LAN, WAN, og WLAN-pakker der sendes og modtages."
			},{
				type: "name",
				title: "Statistik over trafik",
				content: "Tryk på for at vise statistiske oplysninger."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Liste for Statistik over trafik",
			CONTENT: [{
				type: "name",
				title: "IP-adresse/MAC-adresse",
				content: "Viser IP-adressen og MAC-adressen for den tilknyttede klientenhed."
			},{
				type: "name",
				title: "Samlede antal pakker",
				content: "Viser det samlede antal pakker sendt og modtaget af klientenheden siden begyndelsen af sessionen, eller siden sidste tæller nulstilles."
			},{
				type: "name",
				title: "Samlet antal bytes",
				content: "Viser det samlede antal bytes sendt og modtaget af klientenheden siden begyndelsen af sessionen, eller siden sidste tæller nulstilles."
			},{
				type: "name",
				title: "Aktuelle pakker",
				content: "Viser det aktuelle antal pakker der sendes og modtages på et bestemt tidsinterval."
			},{
				type: "name",
				title: "Aktuelle bytes",
				content: "Viser det aktuelle antal bytes der sendes og modtages på et bestemt tidsinterval."
			},{
				type: "name",
				title: "Ændre",  
				content: "Viser indstillinger for at nulstille (til nul) og slette de tilsvarende statistikker fra listen."
			},{
				type: "name",
				title: "Opdater",
				content: "Klik på for at opdatere de statistiske oplysninger på siden."
			},{
				type: "name",
				title: "Nulstil alle",
				content: "Klik på for at nulstille alle statistiske værdier på listen til nul."
			},{
				type: "name",
				title: "Slet alle",
				content: "Klik for at slette alle statistiske oplysninger på listen."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "2,4GHz/5GHz Trådløs",
			CONTENT: [{
				type: "name",
				title: "Statusinterval",
				content: "Indtast en værdi mellem 40 og 1000 i millisekunder til at bestemme varigheden mellem statuspakker, der udsendes af routeren for at synkronisere det trådløse netværk. Standardværdien er 100 millisekunder."
			},{
				type: "name",
				title: "RTS-tærskel",
				content: "Indtast en værdi mellem 1 og 2346 for at bestemme pakkestørrelsen for datatransmission gennem routeren. Som standard er RTS (Request to Send) tærskelværdien 2346. Hvis pakkestørrelsen er større end den indstillede grænse, sender routeren anmodninger om at sende til en bestemt modtagestation og aftaler afsendelse af en dataramme, eller pakken sendes straks."
			},{
				type: "name",
				title: "DTIM-interval",
				content: "Denne værdi bestemmer intervallet for DTIM (Delivery Traffic Indication Message). Indtast en værdi mellem 1 og 15 i millisekunder. Standardværdien er 1, hvilket angiver at DTIM-intervalet er den samme som statusintervalet."
			},{
				type: "name",
				title: "Opdateringsinterval for gruppenøgle",
				content: "Indtast antallet af sekunder (minimum 30) for at kontrollere tidsintervallet for krypteringsnøglens automatiske fornyelse. Standardindstillingen er 0, hvilket angiver ingen fornyelse af nøglen."
			},{
				type: "name",
				title: "Flerbruger-MIMO",
				content: "Teknologien gør det muligt for routeren at etablere en punkt-til-punkt forbindelse med op til tre enheder på en gang. Det forbedrer drastisk hastigheden og reducerer enhedens ventetider i forhold til traditionel arkitektur, hvilket gør det muligt for routeren at tjene flere trådløse klienter samtidigt med at minimere flaskehalse på grund af båndbredde."
			},{
				type: "name",
				title: "WMM-funktioner",
				content: "WMM-funktionen garanterer at pakkerne med højprioritetsmeddelelser sendes fortrinsvis. Det er aktiveret som standard og anbefales kraftigt."
			},{
				type: "name",
				title: "Kort GI-funktion",
				content: "Denne funktion er aktiveret som standard og anbefalede til at øge datakapaciteten ved at reducere GI-tiden (Guard Interval)."
			},{
				type: "name",
				title: "AP isolationsfunktion",
				content: "Hvis du vil indskrænke og begrænse alle trådløse enheder, som er tilsluttet dit netværk, i at interagere med hinanden, men stadig kan få adgang til internettet, skal du vælge afkrydsningsfeltet Aktiver AP-isolation."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "2.4GHz/5GHz WDS",
			CONTENT: [{
				type: "name",
				title: "Aktiver WDS-bridging",
				content: "Aktiverer WDS (Wireless Distribution System) brofunktionen for at lade routeren oprette bro til et andet AP (access point) i et WLAN (wireless local area network). Hvis denne funktion er aktiveret, skal du konfigurere følgende:",
			},{
				type: "name",
				title: "SSID (som der skal dannes bro til)",
				content: "Indtast SSID for WAP (Wireless Access Point), som routeren opretter forbindelse til som en klient eller bruge undersøgelsesfunktionen til at finde alle tilgængelige netværk."
			},{
				type: "name",
				title: "Oversigt",
				content: "Klik på denne knap for at scanne og vise SSID, BSSID, signalstyrke, kanal og sikkerhedsinformation om alle tilgængelige trådløse netværk inden for rækkevidde. Når du har valgt et netværk, vil SSID, MAC-adresse og sikkerhed automatisk blive udfylde."
			},{
				type: "name",
				title: "MAC-adressen (som der skal dannes bro til)",
				content: "Indtast MAC-adressen (BSSID) på 12 hexadecimale tegn (0-9, a-f, A-F) adskilt af bindestreger i det trådløse adgangspunkt, som routeren opretter forbindelse til som klient. Hvis du vælger den ønskede AP gennem undersøgelsesfunktionen, bliver MAC-adresse-feltet automatisk udfyldt."
			},{
				type: "name",
				title: "WDS-tilstand",
				content: "Vælg WDS-tilstand, Auto, WDS1 eller WDS2."
			},{
				type: "name",
				title: "Sikkerhed",
				content: "Vælg den korrekte sikkerhedstype for det valgte adgangspunkt, No, WPA-PSK/ WPA2-PSK eller WEP. Hvis du vælger den ønskede AP gennem undersøgelsesfunktionen, bliver sikkerhedsfeltet automatisk udfyldt.",
				children: [{
					type: "name",
					title: "Adgangskode",
					content: "Denne indstilling er kun tilgængelig, når sikkerhedstypen er WPA-PSK/ WPA2-PSK eller WEP. Indtast sikkerhedsadgangskoden for det valgte adgangspunkt."
				},{
					type: "name",
					title: "Tilladelse Type",
					content: "Denne indstilling er kun tilgængelig, når sikkerhedstypen er WEP (Wired Equivalent Privacy). Vælg en passende godkendelsestype (Auto, Åbent system eller Delt nøgle) der anvendes af det valgte adgangspunkt."
				},{
					type: "name",
					title: "Format af WEP-nøgle",
					content: "Denne indstilling er kun tilgængelig, når sikkerhedstypen er WEP. Vælg nøgleformatet (ASCII eller Hexadecimalt), der anvendes af den valgte AP."
				}]
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Marker afkrydsningsfeltet Aktiver WPS og klik på Gem for at aktivere WPS (Wi-Fi Protected Setup) funktionen, som gør det nemt at opsætte og tilslutte WPS-aktiverede enheder ved at trykke på WPS-knappen."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Vælg afkrydsningsfeltet Aktiver NAT og klik på Gem for at aktivere NAT (Network Address Translation) funktionen."
			},{
				type: "note",
				title: "Bemærk",
				content: "Når NAT er deaktiveret, vil konfigurationer i NAT-viderestilling ikke træde i kraft."
			}/*,{
				type: "name",
				title: "NAT-boost",
				content: "Vælg afkrydsningsfeltet Aktiver NAT-Boost og klik på Gem for at sikre, at din router har den bedste ydelse."
			},{
				type: "note",
				title: "Bemærk",
				content: "Når NAT Boost er aktiveret, deaktiveres QoS og Statistik over trafik automatisk."
			}*/,{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Indstillinger for DoS-beskyttelsesniveau",
			CONTENT: [{
				type: "paragraph",
				content: "DoS -beskyttelsesniveauet beskytter routeren fra angreb fra ICMP-FLOOD, UDP-FLOOD, and TCP-FLOOD."
			},{
				type: "name",
				title: "ICMP-FLOOD Pakkeniveau",
				content: "Indtast en værdi mellem 5 og 7200 ICMP-pakker for at udløse ICMP-FLOOD beskyttelsen umiddelbart, når antallet af pakker overskrider den indstillede tærskelværdi."
			},{
				type: "name",
				title: "UDP-FLOOD Pakkeniveau",
				content: "Indtast en værdi mellem 5 og 7200 UDP-pakker for at udløse UDP-FLOOD beskyttelsen umiddelbart, når antallet af pakker overskrider den indstillede tærskelværdi."
			},{
				type: "name",
				title: "TCP-FLOOD Pakkeniveau",
				content: "Indtast en værdi mellem 5 og 7200 TCP-SYN-pakker for at udløse TCP-SYN-FLOOD beskyttelsen umiddelbart, når antallet af pakker overskrider den indstillede tærskelværdi."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Dupleks",
			CONTENT: [{
				type: "name",
				title: "Dupleks",
				content: "Vælg duplekstypen i rullemenuen."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "Lysdiode",
			CONTENT: [{
				type: "name",
				title: "Aktiver nattilstand",
				content: "Marker dette afkrydsningsfelt for at slukke lysdioder i natteperioden uden at påvirke routerens ydeevne."
			},{
				type: "name",
				title: "Periode for nattetilstand",
				content: "Angiv en tidsperiode, hvor nattetilstanden gælder."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Med OpenVPN, kan du bruge internettet til at få sikker adgang til dit netværk, når du er væk fra hjemmet. For at bruge VPN-servicen, skal du konfigurere den dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til routerens WAN-port. Og systemets klokkeslæt skal synkroniseres med Internettet."
			},{
				type: "name",
				title: "Aktiver VPN-server",
				content: "Vælg for at aktivere OpenVPN-serveren."
			},{
				type: "name",
				title: "Tjenestetype",
				content: "Vælg kommunikationsprotokollen for OpenVPN serveren: UDP eller TCP."
			},{
				type: "name",
				title: "Tjenesteport",
				content: "Angiv en kommunikationsport mellem 1024 og 65535. Standard og fælles tjenesteport er 1194."
			},{
 				type: "name",
				title: " VPN-undernet/Netmaske",
				content: "Angiv intervallet af IP-adresser, som kan leases til klienterne af OpenVPN-serveren."
			},{
				type: "name",
				title: "Klientadgang",
				content: "Vælg adgangstypen for din OpenVPN-klient.",
				children: [{
				type: "name",
				title: "Kun hjemmenetværk",
					content: "Klienter kan kun få adgang til hjemmenetværket. Klientens standardrute vil ikke ændres."
			},{
				type: "name",
				title: "Internet og hjemmenetværk",
					content: "Klienter kan få adgang til hjemmenetværket, og websteder eller tjenester med en geografisk begrænsning, når man er ude af landet. Klientens standardrute vil blive ændret."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Certifikat",
			CONTENT: [{
				type: "paragraph",
				content: "Anvend certifikatet for oplysninger og identitet af VPN-forbindelsen for fjernklienter."
			},{
				type: "name",
				title: "Opret",
				content: "Klik for at oprette et nyt certifikat."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Konfigurationsfil",
			CONTENT: [{
				type: "paragraph",
				content: "Eksterne klienter skal bruge konfigurationsfilen for at få adgang til din router."
			},{
				type: "name",
				title: "Eksporter",
				content: "Klik for at gemme OpenVPN-konfigurationsfil."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "Installationsvejledning for VPN-klient",
			CONTENT: [{
				type: "step",
				title: "Sådan tilsluttes dine klientenheder til OpenVPN-serveren:",
				content:[{
					type: "paragraph",
					content: "Før du kan konfigurere OpenVPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Og sørg for at din eksterne port for NAT-indstillingerne ikke er serviceporten og at din systemklokke er synkroniseret med internettet."
				},
					"1. Vælg Aktiver VPN-server.",
					"2. Konfigurere OpenVPN-serverens parametre (servicetype, tjenesteport, klientadgang og VPN-undernet/netmaske)) og klik på Save (Gem).",
					"3. Klik på Eksporter for at gemme konfigurationsfilen.",
					"4. På dine klientenheder, skal du downloade og installere OpenVPN-klientværktøjet fra  <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> De officielt understøttede platforme såsom Windows, Mac OSX og Linux.",
					"5. Start af OpenVPN-klientværktøjet og tilføje en ny VPN-forbindelse ved hjælp af den gemte konfigurationsfil for at tilslutte enheden til VPN-serveren."
				]},{
					type: "note",
					title: "Bemærk",
					content: "For at få mere at vide om OpenVPN klienter, kan du besøge <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Med PPTP VPN, kan du bruge internettet til nemt og hurtigt at få adgang til dit netværk, når du er væk fra hjemmet. Nogle internetudbydere vil muligvis forhindre dette. For at bruge VPN-servicen, skal du konfigurere den dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til routerens WAN-port. Og systemets klokkeslæt skal synkroniseres med Internettet."
			},{
				type: "name",
				title: "Aktiver VPN-server",
				content: "Vælg for at aktivere PPTP VPN-serveren."
			},{
				type: "name",
				title: "Klient IP-adresse",
				content: "Angiv intervallet af IP-adresser (op til 10 klienter), som kan leases til klienterne af PPTP VPN-serveren."
			},{
 				type: "name",
				title: "Lad adgang for Samba (netværkslokalitet)",
				content: "Vælg for at tillade din VPN-klient for at få adgang til din lokale Samba-server."
			},{
				type: "name",
				title: "Tillad NetBIOS passthrough",
				content: "Vælg for at tillade din VPN-klient for at få adgang til din lokale Samba-server ved hjælp af NetBIOS-navn."
			},{
				type: "name",
				title: "Tillad ukrypterede forbindelser",
				content: "Vælg for at tillade ukrypterede forbindelser til din VPN-server."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Kontoliste",
			CONTENT: [{
				type: "paragraph",
				content: "Denne tabel viser de konti, der kan benyttes til at koble sig på PPTP VPN-serveren for fjernklienter."
			},{
				type: "step",
				title: "Sådan tilføjes en PPTP VPN-konto",
				content: [
					"1. Klik på Tilføj.",
					"2. Indtast brugernavn og adgangskode for at godkende klienter til PPTP VPN-serveren.",
					"3. Klik på OK."
				]
			},/*{
				type: "name",
				title: "Brugernavn og adgangskode",
				content: "Indtast brugernavn og adgangskode for at godkende klienter til PPTP VPN-serveren."
			},{
				type: "name",
				title: "ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende konto."
			}*/
			{
				type: "step",
				title: "Sådan ændres eller slettes en eksisterende konto",
				content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til kontoen, som du vil redigere eller slette."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "Installationsvejledning for VPN-klient",
			CONTENT: [{
				type: "step",
				title: "Sådan tilsluttes dine klientenheder til PPTP VPN-serveren:",
				content:[{
					type: "paragraph",
					content: "Før du kan konfigurere PPTP VPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Sørg for at din eksterne port for NAT-indstillingerne ikke er 1723 og at din systemklokke er synkroniseret med internettet."
				},
					"1. Vælg Aktiver VPN-server.",
					"2. Konfigurer PPTP VPN-serverens parametre og klik på Gem.",
					"3. På dine klientenheder, kan du oprette en PPTP VPN-forbindelse. De officielt understøttede platforme inkluderer Windows, Mac OSX, Linux, iOS, og Android.",
					"4. Start PPTP VPN-programet, tilføje en ny forbindelse og indtast domænenavnet på den registrerede DDNS-tjeneste eller den statiske IP-adresse, som er tildelt WAN-porten, for at tilslutte enheden til PPTP VPN-serveren.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN-forbindelser",
			CONTENT: [{
				type: "paragraph",
				content: "Denne side viser de klienter, der i øjeblikket er tilknyttet til OpenVPN og PPTP VPN-servere hostet på routeren."
			},{
				type: "paragraph",
				content: "Klik på minus-ikonet for at frakoble den tilsvarende klient."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Internetstatus",
				content: "Viser den aktuelle status af routerens internetforbindelse."
			},{
				type: "name",
				title: "Forbindelsestype",
				content: "Viser typen af internetforbindelse."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser den aktuelle Internet-IP-adresse, der er tildelt routeren."
			},{
				type: "name",
				title: "Sekundær tilslutning/IP-adresse",
				content: "Viser den sekundære forbindelsestype og IP-adresse."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Router",
			CONTENT: [{
				type: "title",
				title: "2,4GHz/5GHz Trådløs"
			},{
				type: "name",
				title: "SSID",
				content: "Viser det aktuelle trådløse netværksnavn på 2,4 GHz/5 GHz frekvensen."
			},{
				type: "name",
				title: "Kanal",
				content: "Viser den kanal som det trådløse 2,4 GHz/5GHz netværk udsender."
			},{
				type: "name",
				title: "MAC",
				content: "Viser den aktuelle MAC-adressen for det trådløse 2,4 GHz/ 5GHz."
			},{
				type: "title",
				title: "Gæstenetværk 2,4GHz/5GHz"
			},{
				type: "name",
				title: "Status",
				content: "Viser hvorvidt det trådløse gæstenetværk 2.4GHz/ 5GHz er tændt (aktiveret) eller slukket (deaktiveret)."
			},{
				type: "name",
				title: "SSID",
				content: "Viser det trådløse netværksnavn på gæstenetværket."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Kablede/trådløse klienter",
			CONTENT: [{
				type: "name",
				title: "Navn",
				content: "Viser navnet på klienten, der er tilsluttet til routeren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser den tildelte IP-adresse for klienten."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser klientens MAC-adresse."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Printer",
			CONTENT: [{
				type: "name",
				title: "Navn",
				content: "Viser navnet på printeren, der er tilsluttet til routeren via USB-port."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB-disk",
			CONTENT: [{
				type: "name",
				title: "USB-disk",
				content: "Viser navnet på USB-drevet der er tilsluttet routeren."
			},{
				type: "name",
				title: "Total",
				content: "Viser den samlede lagerkapacitet af den tilsluttede USB-lagerenhed."
			},{
				type: "name",
				title: "Tilgængelig",
				content: "Viser den tilgængelige lagerkapacitet af den tilsluttede USB-lagerenhed."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Automatisk registrering",
				content: "Klik på denne knap for at få routeren til automatisk at registrere din aktuelle internetforbindelsestype."
			},{
				type: "note",
				title: "Bemærk",
				content: "Hvis du ikke er sikker på, hvilken type internetforbindelse du har, kan du bruge funktionen Automatisk identifikation eller kontakte din internetudbyder (ISP) for hjælp."
			},{
				type: "title",
				title: "Internetforbindelsestype: Statisk IP",
			},{
				type: "name",
				title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
				content: "Indtast oplysningerne fra din internetudbyder."
			},{
				type: "title",
				title: "Internetforbindelsestype: Dynamisk IP",
			},{
				type: "name",
				title: "Klon IKKE MAC-adressen/Klon computerens aktuelle MAC-adresse",
				content: "Vælg om du vil klone din MAC-adresse eller ej, ifølge din internetudbyder."
			},{
				type: "title",
				title: "Internetforbindelsestype: PPPoE",
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "title",
				title: "Internetforbindelsestype: L2TP/PPTP",
			},{
				type: "name",
				title: "Brugernavn/adgangskode",
				content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Sekundær forbindelse (dynamisk-IP eller statisk-IP)",
				children: [{
					type: "name",
					title: "Dynamisk IP",
					content: "Vælg hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen."
				},{
					type: "name",
					title: "Statisk IP",
					content: "Vælg hvis IP-adressen, undernetmasken, gatewayen og DNS-adresserne leveres af internetudbyderen, og angiv disse oplysninger i de relevante felter."
				}]
			},{
				type: "name",
				title: "VPN-server IP/domænenavn",
				content: "Angiv VPN-serverens IP-adresse eller domænenavnet, som din internetudbyder har oplyst."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "Trådløse indstillinger",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 2,4 GHz/5 GHz radiofrekvens."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan lade det standard trådløse netværksnavn (SSID) være som det er, eller indtaste et nyt navn (op til 32 tegn). Dette felter skelner mellem store og små bogstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule 2,4 GHz/5 GHz netværksnavnet (SSID) fra listen over trådløse netværk."
			},{
				type: "name",
				title: "Adgangskode",
				content: "Angiv en trådløs adgangskode i dette felt, som svarer til sikkerhedstypen, (der skelnes mellem store og små bogstaver)."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Enhedsindstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Siden Enhedsindstillinger viser de tilknyttede oplysninger om tilsluttede USB-lagringsenhed via USB-porten."
			},{
				type: "name",
				title: "Scan",
				content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne efter nye tilsluttede enhed og opdatere siden med de opdaterede oplysninger."
			},{
				type: "name",
				title: "Volumen",
				content: "Viser navnet på USB-drevet."
			},{
				type: "name",
				title: "Kapacitet",
				content: "Viser den samlede lagerkapacitet på USB'en."
			},{
				type: "name",
				title: "Ledig plads",
				content: "Viser den aktuelle frie lagerplads."
			},{
				type: "name",
				title: "Sikker fjernelse",
				content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren.",
				children: [{
					type: "paragraph",
					content: "Bemærk venligst, at knappen Sikker fjernelse kun vises, når der er en USB-lagringsenhed, der er tilsluttet routeren, og du ikke vil være i stand til at lukke USB-enheden, mens det aktuelle drev er optaget."
				}]
			},{
				type: "name",
				title: "Status",
				content: "Dette afkrydsningsfelt vises kun, når der er en USB-lagringsenhed, der er tilsluttet routeren. Vælg for at aktivere fildeling på USB-enheden."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Indstillingerne for deling",
			CONTENT: [{
				type: "name",
				title: "Navn på netværk/Medie-server",
				content: "Viser det navn der bruges til at få adgang til en tilsluttet USB-lagerenhed. Navnet skal være består af alfanumeriske tegn, understregninger eller bindestreger og være fra 4 til 15 tegn langt."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Mappedeling",
			CONTENT: [{
				type: "name",
				title: "Del alt",
				content: "Aktiver for at dele filer og mapper eller deaktiver for kun at dele de valgte mapper."
			},{
				type: "name",
				title: "Aktiverer godkendelse",
				content: "Det anbefales på det kraftigste at aktivere godkendelse for at kræve at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper."
			},{
				type: "name",
				title: "Mappenavn",
				content: "Viser navnet på den delte mappe."
			},{
				type: "name",
				title: "Sti til mappe",
				content: "Viser stien til den delte mappe."
			},{
				type: "name",
				title: "Mediedeling",
				content: "Angiver om den delte mappe er godkendt for deling af medier eller ej."
			},{
				type: "name",
				title: "Drevnavn",
				content: "Viser navnet på det delte drev."
			},{
				type: "name",
				title: "Status",
				content: "Viser statusen af den delte mappe med lampeindikatoren."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre og slette den pågældende delte mappe."
			},{
				type: "name",
				title: "Tilføj",
				content: "Klik på denne knap for at oprette en ny post."
			},{
				type: "name",
				title: "Slet",
				content: "Klik på denne knap for at slette den valgte post fra tabellen."
			},{
				type: "name",
				title: "Gennemse",
				content: "Klik på for at søge efter en fælles mappe."
			},{
				type: "name",
				title: "Tillad adgang for gæstenetværket",
				content: "Vælg for at tillade at klienter på gæstenetværket kan få adgang til de delte mapper."
			},{
				type: "name",
				title: "Aktiverer godkendelse",
				content: "Vælg for at kræve, at brugerne kan få adgang til de delte mapper med et gyldigt brugernavn og adgangskode."
			},{
				type: "name",
				title: "Tillad skriveadgang",
				content: "Vælg for at tillade brugere at foretage ændringer til mappeindholdet."
			},{
				type: "name",
				title: "Tillad mediedeling",
				content: "Vælg for at aktiveret mediedeling."
			},{
				type: "name",
				title:"Opdater",
				content: "Klik for at opdatere mappedelingslisten."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Printerserver",
			CONTENT: [{
				type: "name",
				title: "Printerserver",
				content: "Aktiver for at aktivere printerserverfunktionen."
			},{
				type: "name",
				title: "Printernavn",
				content: "Viser navnet på den printer, der er tilsluttet til routeren."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Forældrekontrol",
			CONTENT: [{
				type: "paragraph",
				content: "Med Forældrekontrol kan du blokere upassende, eksplicite og ondsindede websteder; begrænse adgangen på visse tider af dagen (for eksempel Facebook eller YouTube når der skal laves hjemmearbejde); og samtidig beskytte hver enhed i dit netværk mod malware og phishing gennem en central styring."
			},{
				type: "name",
				title: "Forældrekontrol",
				content: "Aktiver for at aktivere funktionen Forældrekontrol. Som standard er denne funktion deaktiveret."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Enheder med forældrekontrol",
			CONTENT: [{
				type: "paragraph",
				content: "Viser listen over enheder der er under Forældrekontrol."
			},{
				type: "name",
				title: "Enhedsnavn",
				content: "Viser navnet på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
			},{
				type: "name",
				title: "Internet-tid",
				content: "Viser tidsperioderne med begrænset adgang. Tidsplanen er baseret på routerens system som kan indstilles i \"Systemværktøjer -> Indstillinger\"."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en kort beskrivelse af de tilsluttede enheder. Dette er en valgfri indstilling."
			},{
				type: "name",
				title: "Status",
				content: "Viser den aktuelle status (tændt eller slukket) for Forældrekontrol på den relevante enhed."
			},{
				type: "name",
				title: "Ændre",
				content: "Viser indstillingerne for at ændre eller slette den pågældende enhed."
			},{
				type: "step",
				title: "Sådan begrænses en ny klientenhed",
				content:[
					"1. Klik på Tilføj.",
					"2. Klik på Vis eksisterende enheder og vælg en aktuelt tilsluttet enhed fra listen over enheder med adgang, eller indtast navnet på enheden og MAC-adressen manuelt for at tilføje en enhed, som ikke er forbundet.",
					"3. Klik på ikonet for tidspunkter for internet adgang for at angive en tidsperiode, hvor begrænsningen gælder.",
					"4. Indtast en kort beskrivelse i feltet Beskrivelse. (Valgfri)",
					"5. Vælg Aktiver.",
					"6. Klik på OK for at gemme indtastningen."
				]
			},{
				type: "paragraph",
				content: "For at redigere eller slette et felt i forældrekontrol, skal du blot klikke på ikonet Rediger for at redigere oplysninger eller ikonet papirkurv for at fjerne det tilsvarende felt."
			},{
				type: "paragraph",
				content: "For at slette flere felter skal du vælge alle felterne og klikke på Slet over tabellen."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Indholdsbegrænsning",
			CONTENT: [{
				type: "name",
				title: "Sortliste",
				content: "Indeholder nøgleord, der bruges til at blokere adgang til en hjemmesides fra klientenheder, der er angivet i funktionen liste over Forældrekontrol.",
				children: [{
					type: "paragraph",
					content: "Klik på Tilføj et nyt nøgleord for at sortliste et nøgleord. For at slette et nøgleord, skal du klikke på symbolet (-) på de søgeord, du ønsker at slette."
				}]
			},{
				type: "name",
				title: "Hvidliste",
				content: "Indeholder adresser som klientenheder, der er angivet i listen over Forældrekontrol har adgang til.",
				children: [{
					type: "paragraph",
					content: "Klik på Tilføj et nyt domænenavn for at tilføje en hjemmeside til hvidlisten. For at slette en hjemmeside, skal du klikke på symbolet (-) på den hjemmeside, du ønsker at slette."
				}]
			},{
				type: "note",
				title: "Bemærk",
				content: "Søgeord kan også være domænenavne, f. eks. mail.google.com eller www.facebook.com."
			},{
				type: "paragraph",
				content: "Klik på Gem for at gemme dine konfigurationer."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Gæstenetværk",
			CONTENT: [{
				type: "paragraph",
				content: "Gæstenetværket giver dig mulighed for at oprette et separat netværk med et separat trådløst netværksnavn (SSID) og adgangskode, som du kan benytte til at få adgang til dit trådløse netværk."
			},{
				type: "name",
				title: "Giv gæsterne mulighed for at se hinanden",
				content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværket at se hinanden."
			},{
				type: "name",
				title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
				content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværket at få adgang til dit lokale netværks delinger og printere."
			},{
				type: "name",
				title: "Aktiver gæstenetværk",
				content: "Marker dette afkrydsningsfelt for at aktivere funktionen gæstenetværk."
			},{
				type: "name",
				title: "SSID (Navn på trådløst netværk)",
				content: "Du kan enten bruge standard gæste-SSID eller oprette et nyt navn (op til 32 tegn)."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Marker dette afkrydsningsfelt, hvis du vil skjule gæste-SSID fra listen over trådløse netværk."
			},{
				type: "name",
				title: "Adgangskode",
				content: "For at sikre gæstenetværket skal du oprette en adgangskode på mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
			},{
				type:"paragraph",
				content:"Klik på Gem for at gemme alle dine indstillingerne."
			}]
		}

	};
})(jQuery);
