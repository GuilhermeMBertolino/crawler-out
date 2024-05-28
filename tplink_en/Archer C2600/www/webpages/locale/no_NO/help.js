(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internett",
			CONTENT: [{
				type: "paragraph",
				content: "Viser relevant informasjon om trådløst fjernnett-forbindelse."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unike fysiske adressen som er tilordnet Internett-porten (WAN) på ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "IPv4-adressen som er tilordnet Internett-porten (WAN) på ruteren. Hvis IP-adressen vises som 0.0.0.0, tyder dette på ingen Internett-tilgang."
			},{
				type: "name",
				title: "Nettverksmaske",
				content: "Denne parameteren bestemmer nettverksdelen og vertsdelen av en IP-adresse."
			},{
				type: "name",
				title: "Standard gateway",
				content: "IP-adressen som brukes for å koble ruteren til nettverket."
			},{
				type: "name",
				title: "Primær DNS/Sekundær DNS",
				content: "Domain Name System (DNS) oversetter vertsnavn og Internett-domener til IP-adresser. Informasjonen fra disse DNS-serverne er tildelt av Internet Service Provider (ISP – Internett-leverandøren)."
			},{
				type: "name",
				title: "Tilkoblingstype",
				content: "Den nåværende tilkoblingstypen for Internett-porten (WAN)."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unike fysiske adressen som er tilordnet Internett-porten (WAN) på ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "IPv6-adressen som er tilordnet Internett-porten (WAN) på ruteren."
			},{
				type: "name",
				title: "Standard gateway",
				content: "IP-adressen som brukes for å koble ruteren til nettverket."
			},{
				type: "name",
				title: "Primær DNS/Sekundær DNS",
				content: "Domain Name System (DNS) oversetter vertsnavn og Internett-domener til IP-adresser. Informasjonen fra disse DNS-serverne er tildelt av Internet Service Provider (ISP – Internett-leverandøren)."
			},{
				type: "name",
				title: "Tilkoblingstype",
				content: "Den nåværende tilkoblingstypen for Internett-porten (WAN)."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2,4GHz/5GHz Trådløst nettverk",
			CONTENT: [{
				type: "paragraph",
				content: "Viser relevant informasjon om det trådløse nettverket."
			},{
				type: "name",
				title: "Nettverksnavn (SSID)",
				content: "Navn på det trådløse nettverket, også kalt SSID (Service Set Identifier)."
			},{
				type: "name",
				title: "Trådløs radio",
				content: "Gjeldende status (på eller av) for det trådløse nettverket."
			},{
				type: "name",
				title: "Modus",
				content: "Gjeldende trådløs modus."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Kanalen båndbredde på det trådløse nettverket."
			},{
				type: "name",
				title: "Kanal",
				content: "Gjeldende trådløs nettverkskanal"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "MAC-adressen til den trådløse nettverksradioen på ruteren."
			},{
				type: "name",
				title: "WDS-status",
				content: "Gjeldende status (på eller av) for WDS-modus."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Viser informasjon om Ethernet-porter (LAN)."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unike fysiske adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "IPv4-adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
			},{
				type: "name",
				title: "Nettverksmaske",
				content: "Denne parameteren bestemmer nettverksdelen og vertsdelen av en IP-adresse."
			},{
				type: "name",
				title: "DHCP",
				content: "Indikerer hvorvidt ruterens innebygde DHCP-server er aktiv for enhetene på LAN-portene eller ikke."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Den unike fysiske adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "IPv6-adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
			},{
				type: "name",
				title: "Koblingslokaladresse",
				content: "Type IPv6-koblingslokaladresse for LAN-grensesnitt."
			},{
				type: "name",
				title: "Tildelt type",
				content: "Type IPv6-adresse for LAN-grensesnitt."
			}]
		},
		STATUS_GUEST: {
			TITLE: "Gjestenettverk 2,4 GHz/5 GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Viser informasjon om det trådløse nettverket for gjester."
			},{
				type: "name",
				title: "Nettverksnavn (SSID)",
				content: "Navnet på det trådløse nettverket (SSID) på gjestenettverket ditt."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Viser om det trådløse nettverket (SSID) på gjestenettverket er skjult eller ikke."
			},{
				type: "name",
				title: "Trådløs radio",
				content: "Gjeldende status (på eller av) for gjestenettverket."
			},{
				type: "name",
				title: "Gjør det mulig for gjester å se hverandre",
				content: "Viser om alle enhetene på gjestenettverket får lov til å kommunisere med hverandre eller ikke."
			}]
		},
		STATUS_USB: {
			TITLE: "USB-enheter",
			CONTENT: [{
				type: "paragraph",
				content: "Viser informasjon om gjeldende USB-lagringsenheter og/eller skrivere som er koblet til ruteren via USB-portene."
			},{
				type: "name",
				title: "Skriver",
				content: "Navn på den tilkoblede skriveren."
			},{
				type: "name",
				title: "USB-enhet",
				content: "Navn på USB-enheten som er koblet til ruteren."
			},{
				type: "name",
				title: "Sum",
				content: "Total lagringskapasitet på den tilkoblede USB-lagringsenheten."
			},{
				type: "name",
				title: "Tilgjengelig",
				content: "Tilgjengelig lagringskapasitet på den tilkoblede USB-lagringsenheten."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Ytelse",
			CONTENT: [{
				type: "paragraph",
				content: "Viser gjeldende ytelse for ruteren."
			},{
				type: "name",
				title: "CPU-belastning",
				content: "Gjeldende CPU-bruk."
			},{
				type: "name",
				title: "Bruk av minne",
				content: "Gjeldende minne-bruk."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Koblete klienter",
			CONTENT: [{
				type: "paragraph",
				content: "Viser informasjon om alle kablede enheter som er koblet til nettverket."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Trådløse klienter",
			CONTENT: [{
				type: "paragraph",
				content: "Viser informasjon om alle trådløse enheter som er koblet til nettverket."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Internett-tilkoblingstype: Statisk IP"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis du har fått levert en bestemt (fast) IP-adresse, nettverksmaske , gateway og DNS-parametre av Internett-leverandøren."
			},{
				type: "name",
				title: "IP-adresse/nettverksmaske/standard gateway/Primær DNS/Sekundær DNS",
				content: "Skriv inn informasjonen du fikk oppgitt av Internett-leverandøren."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: Dynamisk IP"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis din Internett-leverandør har gitt deg en DHCP-servertilkobling."
			},{
				type: "name",
				title: "IP-adresse/nettverksmaske/standard gateway/Primær DNS/Sekundær DNS",
				content: "Disse parametrene blir automatisk tildelt av DHCP-serveren fra Internett-leverandøren."
			},{
				type: "name",
				title: "Forny",
				content: "Klikk på denne knappen for å få nye IP-parametere fra DHCP-serveren."
			},{
				type: "name",
				title: "Frigi",
				content: "Klikk på denne knappen for å få frigi alle IP-parametere fra DHCP-serveren."
			},{
				type: "name",
				title: "Bruk følgende DNS-adresser",
				content: "Hvis Internett-leverandøren gir én eller to DNS-adresser, velger du denne boksen og angir primær- og sekundær DNS-adresse i de riktige feltene. Ellers vil DNS-adressene tildeles dynamisk av Internett-leverandøren."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
			},{
				type: "name",
				title: "Vertsnavn",
				content: "Skriv inn en verdi i dette feltet for å angi vertsnavnet til ruteren."
			},{
				type: "name",
				title: "Få IP ved hjelp Unicast DHCP",
				content: "Velg denne boksen hvis din Internett-leverandørs DHCP-server ikke støtter kringkastingsprogrammer, og du ikke kan få IP-adressen dynamisk."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: PPPoE"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis du bruker DSL-tjenesten (Digital Subscriber Line) og har fått oppgitt et brukernavn og passord av Internett-leverandøren."
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn brukernavnet og passordet du fikk oppgitt av Internett-leverandøren. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "IP-adresse/Primær DNS/Sekundær DNS",
				content: "Disse parametrene blir automatisk tildelt av DHCP-serveren fra Internett-leverandøren."
			},{
				type: "name",
				title: "Sekundær tilkobling (Ingen, Dynamisk IP, Statisk IP)",
				children: [{
					type: "name",
					title: "Ingen",
					content: "Velg nei dersom ingen sekundær tilkobling er gitt."
				},{
					type: "name",
					title: "Dynamisk IP",
					content: "Velg om IP-adressen og nettverksmasken er automatisk tildelt av Internett-leverandøren.",
					children: [{
						type: "name",
						title: "Forny",
						content: "Klikk på denne knappen for å få nye IP-parametere fra Internett-leverandøren."
					},{
						type: "name",
						title: "Frigi",
						content: "Klikk på denne knappen for å frigi de tildelte IP-parametere."
					}]
				},{
					type: "name",
					title: "Statisk IP",
					content: "Velg om IP-adressen og nettverksmasken er levert av Internett-leverandøren, og skriv inn disse opplysningene i de riktige feltene."
				}]
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Typisk MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1480 bytes.",
				children: [{
					type: "note",
					title: "Merk",
					content: "I sjeldne tilfeller kan din Internett-leverandøren kreve at du justerer MTU-størrelsen for å øke ytelsen i nettverket. Du bør ikke endre verdien med mindre det er absolutt nødvendig."
				}]
			},{
				type: "name",
				title: "Navn på tjeneste/tilgangskonsentrator",
				content: "Tjenestenavn og tilgangskonsentrator (AC) står tomt som standard. Disse feltene skal ikke konfigureres med mindre din Internett-leverandøren krever dette."
			},{
				type: "name",
				title: "Oppdag online-intervall",
				content: "Angi en verdi for tidsintervall mellom 0 og 120 (i sekunder) for hvert intervall når ruteren oppdager tilgangskonsentrator på Internett. Standardverdi er 10."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Hvis din Internett-leverandøren gir en spesifikk (fast) IP-adresse, velger du Bruk følgende IP-adresse og angi IP-adressen i feltet. Ellers velger du Hent dynamisk fra Internett-leverandøren for å få en IP-adresse tildelt automatisk fra serveren."
			},{
				type: "name",
				title: "DNS-adresse/Primær DNS/Sekundær DNS",
				content: "Hvis Internett-leverandøren gir spesifikke (faste) DNS-IP-adresser, velger du Bruk følgende DNS-adresse og skriver inn adressen(e) i feltene for primær og sekundær DNS. Ellers velger du Hent dynamisk fra Internett-leverandøren for å få en DNS-IP-adresse tildelt automatisk fra serveren."
			},{
				type: "name",
				title: "Tilkoblingsmodus",
				content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
				},{
					type: "name",
					title: "Ved behov",
					content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
				},{
					type: "name",
					title: "Tidsbasert",
					content: "I denne modusen, vil en Internett-tilkobling kun etableres innen en bestemt tidsramme. Hvis dette alternativet er valgt, angir du start- og sluttidspunkt; begge er i formatet TT:MM."
				},{
					type: "name",
					title: "Manuelt",
					content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
				},{
					type: "note",
					title: "Merk",
					content: "Den tidsbaserte tilkoblingsmodusen vil kun tre i kraft når systemtiden er konfigurert i Avansert → Systemverktøy → Tidsinnstillinger."
				}]
			},{
				type: "title",
				title: "Internett-tilkoblingstype: BigPond-kabel",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis din Internett-leverandøren tilbyr BigPond-kabeltilkobling.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn brukernavnet og passordet du fikk oppgitt av Internett-leverandøren. Disse feltene skiller mellom store og små bokstaver.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Forf. Server",
				content: "Angi godkjenningsserverens IP-adresse eller vertsnavn.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Forf. Domene",
				content: "Skriv inn suffiks for serverens domenenavn (basert på hvor du befinner deg). For eksempel: nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, eller qld.bigpond.net.au for QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Tilkoblingsmodus",
				content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
				},{
					type: "name",
					title: "Ved behov",
					content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
				},{
					type: "name",
					title: "Manuelt",
					content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
				}]
			},{
				type: "title",
				title: "Internett-tilkoblingstype: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis du kobler til en L2TP/PPTP VPN-server og din Internett-leverandøren har gitt deg et brukernavn, passord og IP-adresse/domenenavn til serveren."
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn brukernavnet og passordet du fikk oppgitt av Internett-leverandøren. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "IP-adresse/Primær DNS/Sekundær DNS",
				content: "Disse parametrene blir automatisk tildelt av DHCP-serveren fra Internett-leverandøren."
			},{
				type: "name",
				title: "Sekundær tilkobling (Dynamisk IP eller Statisk IP)",
				children: [{
					type: "name",
					title: "Dynamisk IP",
					content: "Velg om IP-adressen og nettverksmasken er automatisk tildelt av Internett-leverandøren."
				},{
					type: "name",
					title: "Statisk IP",
					content: "Velg om IP-adressen, nettverksmasken, gateway og DNS-adresser er levert av Internett-leverandøren, og skriv inn disse opplysningene i de riktige feltene."
				}]
			},{
				type: "name",
				title: "IP/Domenenavn for VPN-server",
				content: "Skriv inn VPN-serverens IP-adresse eller domenenavn fra Internett-leverandøren."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1460 bytes for L2TP og 1420 Bytes for PPTP. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
			},{
				type: "name",
				title: "Tilkoblingsmodus",
				content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
				children: [{
					type: "name",
					title: "Auto",
					content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
				},{
					type: "name",
					title: "Ved behov",
					content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
				},{
					type: "name",
				title: "Manuelt",
				content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
				}]
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC Clone",
			CONTENT: [{
				type: "name",
				title: "Bruk standard MAC-adresse",
				content: "IKKE endre ruterens standard MAC-adresse, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til MAC-adressen. "
			},{
				type: "name",
				title: "Bruk datamaskinens gjeldende MAC-adresse",
				content: "Velg å kopiere gjeldende MAC-adresse til datamaskinen som er koblet til ruteren, i tilfelle Internett-leverandøren binder den tildelte IP-adressen til datamaskinens MAC-adresse."
			},{
				type: "name",
				title: "Bruk tilpasset MAC-adresse",
				content: "Angi ruterens MAC-adresse manuelt, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til den spesifikke MAC-adressen."
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "MAC-adresse",
				content: "Den unike fysiske adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser ruterens standard IP-adresse for innlogging til ruterens webbehandlingside. Adressen kan overstyres."
			},{
				type: "name",
				title: "Nettverksmaske",
				content: "Velg fra nedtrekkslisten en tildelt identifikator som brukes av LAN-porten for ruting til intern og ekstern trafikk, eller angi en ny nettverksmaske i punktumdesimalformat."
			},{
				type: "note",
				title: "Merk",
				content: "Hvis den nye LAN-IP-adressen ikke er i samme subnett som den gamle, vil IP-adresseutvalget i DHCP-serveren konfigureres automatisk. Den virtuelle serveren og DMZ-verten vil derimot ikke tre i kraft før de blir konfigurert på nytt."
			},{
				type:"paragraph",
				content:"Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		IPTV:{
			TITLE: "Innstillinger",
			CONTENT: [{
					type: "name",
					title: "IGMP-proxy",
					content: "Velg Proxy-versjonen IGMP (Internet Group Management Protocol), enten V2 eller V3, i henhold til din Internett-leverandør."
				},{
					type: "name",
					title: "IGMP-Versjon",
					content: "Velg IGMP Proxy-versjonen, enten V2 eller V3 basert på din ISP."
				},
				{
					type: "name",
					title: "IPTV",
					content: "Velges for å aktivere IPTV-funksjonen."
				},
				{
					type: "name",
					title: "Modus",
					content: "Velg ønsket modus i henhold til din Internett-leverandør. Det er seks IPTV-moduser som støttes:",
					children: [
						{
							type: "name",
							title: "Bro",
							content:"Hvis din Internett-leverandør ikke er oppført, og ingen andre parametere er nødvendig, kan du bare velge denne modusen og konfigurere funksjonene for ruterens LAN-port.",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Tildele LAN-porten til enten å fungere som Internett-leverandør eller som IPTV-leverandør."
							}]
						},
						{
							type: "name",
							title: "Russland",
							content: "Velges hvis Internett-leverandøren er fra Russland og de nødvendige parameterne er forhåndsbestemt, inkludert Internett/IP-telefon/IPTV VLAN-ID-er og prioritet, samt LAN (1/2/3/4) portfunksjoner.",
							children: [{
								type: "name",
								title: "IPTV multikasting VLAN-ID/prioritet",
								content: "Du kan aktivere IPTV multicast-funksjonen som ønsket, og konfigurere VLAN ID og prioritet i henhold til din ISP."
							}]
						},
						{
							type: "name",
							title: "Singapore-ExStream",
							content: "Velges hvis din Internett-leverandør er ExStream fra Singapore, og de nødvendige parameterne er forhåndsbestemt, inkludert Internett/IPTV VLAN-ID-er og prioritet, samt LAN (1/2/3/4) portfunksjoner."
						},
						{
							type: "name",
							title: "Malaysia-Unifi",
							content: "Velges hvis din Internett-leverandør er Unifi fra Singapore, og de nødvendige parameterne er forhåndsbestemt, inkludert Internett/IPTV VLAN-ID-er og prioritet, samt LAN (1/2/3/4) portfunksjoner."
						},
						{
							type: "name",
							title: "Malaysia-Maxis",
							content: "Velges hvis din Internett-leverandør er Maxis fra Malaysia, og de nødvendige parameterne er forhåndsbestemt, inkludert Internett/IP-telefon/IPTV VLAN-ID-er og prioritet, samt LAN (1/2/3/4) portfunksjoner."
						},
						{
							type: "name",
							title: "Tilpasset",
							content: "",
							children: [{
								type: "name",
								title: "Internet/IP-telefon/IPTV-VLAN-ID/Prioritet",
								content: "Konfigurere VLAN-ID-er og prioriteringer som levert av Internett-leverandøren."
							},{
								type: "name",
								title: "802.11Q-kode",
								content: "Velg om du vil merke Internettpakker med 802.11Q."
							},{
								type: "name",
								title: "IPTV multikasting VLAN-ID/prioritet",
								content: "Du kan aktivere IPTV multicast-funksjonen som ønsket, og konfigurere VLAN ID og prioritet i henhold til din ISP."
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Tildele LAN-porten til enten å fungere som leverandør av Internett, IP-telefon eller IPTV."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Klikk Lagre for å lagre alle innstillingene."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Innstillinger",
			CONTENT: [{
				type: "name",
				title: "DHCP-server",
				content: "Som standard er DHCP-serveren (Dynamic Host Configuration Protocol) aktivert; den tildeler TCP/IP-parametere dynamisk til klientenheter fra IP-adresseutvalget. Ikke deaktiver DHCP-serveren med mindre du har en annen DHCP-server, eller du ønsker å tilordne TCP/IP-parametere manuelt til hver klientenhet på nettverket."
			},{
				type: "name",
				title: "IP-adresseutvalg",
				content: "Skriv inn utvalget av IP-adresser som kan leies ut til kundene."
			},{
				type: "name",
				title: "Leasingavtaletid for adresse",
				content: "Angi varighet for IP-adressens utleieperiode til klienten, mellom 2 og 2880 minutter. Standardverdi er 120 minutter."
			},{
				type: "name",
				title: "Standard gateway",
				content: "Angi LAN-IP-adressen. (valgfritt)"
			},{
				type: "name",
				title: "Primær DNS/Sekundær DNS",
				content: "Skriv inn paremeterne du fikk oppgitt av din Internett-leverandør. (valgfritt)"
			},{
				type:"paragraph",
				content:"Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Adressereservasjon",
			CONTENT: [{
				type: "paragraph",
				content: "Du kan manuelt reservere en IP-adresse for en klient som er koblet til ruteren. Når den har blitt reservert, vil DHCP-serveren kun tilordne IP-adressen til den samme kunden."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser klientens MAC-adresse med reservert DHCP-IP-adresse."
			},{
				type: "name",
				title: "Reservert IP-adresse",
				content: "Viser den tildelte IP-adressen for klienten."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en beskrivelse for klientenheten."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status (på eller av) for klientenheten."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den korresponderende klienten."
			},{
				type: "step",
				title: "Reservere en IP-adresse",
				content:[
					"1. Klikk Legg til.",
					"2. Viser MAC-adressen for den ønskede klienten.",
					"3. Skriv inn IP-adressen du ønsker å reservere for klienten.",
					"4. Skriv inn en beskrivelse av klienten.",
					"5. Velg Aktiver.",
					"6. Klikk på OK."
				]
			},{
				type: "step",
				title: "Endre eller slette en eksisterende klient",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for den korresponderende regelen som du ønsker å endre eller slette."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP-klientliste",
			CONTENT: [{
				type: "name",
				title: "Klientnummer",
				content: "Viser antall tilhørende DHCP-klienter."
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
				title: "Tildelt IP-adresse",
				content: "Viser IP-adressen som ble tilordnet klienten av DHCP-serveren."
			},{
				type: "name",
				title: "Leasingavtaletid",
				content: "Viser den gjenværende leietiden for IP-adressen som er utleid av klienten."
			},{
				type: "name",
				title: "Oppdater",
				content: "Klikk for å oppdatere DHCP-klientlisten."
			}]
		},

		DDNS: {
			TITLE: "Dynamisk DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamisk DNS gir deg mulighet til å tildele en fast vert og domenenavn til en dynamisk IP-adresse. Det er nyttig når du er vert for ditt eget nettsted, FTP-server eller en annen server bak ruteren. Først må du registrere deg med en DNS-tjenesteleverandør slik som dyn.com."
			},{
				type: "step",
				title: "Konfigurere en dynamisk DNS",
				content: [
					"1. Velg din DDNS-tjenestelevereandør.",
					"2. Angi brukernavnet og passordet for din DDNS-konto.",
					"3. Angi domenenavnet du mottok fra DDNS-tjenestelevereandøren.",
					"4. Velg oppdateringsintervall fra nedtrekkslisten.",
					"5. Klikk på Logg inn og Lagre."
				]
			},{
				type: "paragraph",
				content: "Hvis du vil veksle mellom kontoer, må du først logge ut av den gjeldende kontoen, og deretter logge inn på en annen konto med det nye brukernavnet og passordet."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Statisk ruting",
			CONTENT: [{
				type: "paragraph",
				content: "Statisk ruting brukes til å forhåndsbestemme en fast rute for nettverksinformasjonspakker for å nå en bestemt vert eller nettverk."
			},{
				type: "step",
				title: "Konfigurere statisk ruting",
				content: [
					"1. Klikk Legg til.",
					"2. Nettverksmål – Angi en IP-adresse i punktumdesimalformat for å tildele den statiske ruten for denne oppføringen.",
					"3. Nettverksmaske – Angi en nettverksmaske i punktumdesimalformat for å bestemme nettverksdelen og vertsdelen av IP-adressen.",
					"4. Standard gateway – Angi en gateway-IP-adresse i punktumdesimalformat for å koble ruteren til nettverket eller verten.",
					"5. Grensesnitt – Velg LAN eller WAN for å angi type nettverksmål.",
					"6. Beskrivelse – Skriv en kort beskrivelse for denne oppføringen.",
					"7. Velg Aktiver.",
					"8. Klikk på OK."
				]
			},{
				type: "step",
				title: "Endre eller slette en eksisterende oppføring",
				content: "I tabellen klikker du på Rediger-ikonet eller Papirkurv-ikonet for den korresponderende regelen som du ønsker å endre eller slette."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Systemrutingtabell",
			CONTENT: [{
				type: "paragraph",
				content: "Systemets rutingtabell viser alle gyldige ruteoppføringer som er i bruk."
			},{
				type: "paragraph",
				content: "Klikk på Oppdater for å oppdatere rutingtabellen."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Innstillinger",
			CONTENT: [{
				type: "name",
				title: "Regional",
				content: "Velg område fra nedtrekkslisten. Hvis landet eller området ditt ikke står på listen, kan det være restriksjoner som begrenser din bruk til trådløse radioen i ditt område."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "Trådløst 2,4 GHz",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Velg dette alternativet for å aktivere den trådløse 2,4 GHz radiofrekvensen. Hvis deaktivert, støttes ikke WPS-funksjonen for dette båndet."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard nettverksnavn (SSID) stå som det er, eller angi et nytt navn (på opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på 2,4 GHz-nettverket (SSID) fra Wi-Fi-nettverkslisten. Hvis valgt, støttes ikke WPS-funksjonen for dette båndet."
			},{
				type: "name",
				title: "Sikkerhet",
				content: "Velg en av de følgende sikkerhetsinnstillingene:",
				children: [{
					type: "name",
					title: "Ingen sikkerhet",
					content: "Velges for å deaktivere trådløs sikkerhet. Det anbefales sterkt at du aktiverer trådløs sikkerhet for å beskytte det trådløse nettverket mot uautorisert tilgang."
				},{
					type: "name",
					title: "Personlig WPA/WPA2",
					content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Denne innstillingen anbefales. Konfigurer det følgende dersom dette er valgt.",
					children: [{
						type: "name",
						title: "Versjon",
						content: "Velg en sikkerhetsversjon for det trådløse nettverket.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Dette alternativet støtter flere integreringer av WPA-standarden (Wi-Fi med beskyttet tilgang), for eksempel WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Dette alternativet gir et bra sikkerhetsnivå. Hvis valgt, støttes ikke WPS-funksjonen for dette båndet."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Dette alternativet anbefales, ettersom det gir bedre sikkerhet enn WPA-PSK."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Auto (for både TKIP og AES). Det er anbefales ikke å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, støttes ikke WPS-funksjonen for dette båndet."
					},{
						type: "name",
						title: "Passord",
						content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn i dette feltet."
					}]
				},{
					type: "name",
					title: "Enterprise-WPA/WPA2",
					content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Hvis valgt, støttes ikke WPS-funksjonen for dette båndet.",
					children: [{
						type: "name",
						title: "Versjon",
						content: "Velg en sikkerhetsversjon for det trådløse nettverket.",
						children:[{
							type: "name",
							title: "Auto",
							content: "Dette alternativet støtter flere integreringer av WPA-standarden (Wi-Fi med beskyttet tilgang), for eksempel WPA og WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Dette alternativet gir et godt sikkerhetsnivå."
						},{
							type: "name",
							title: "WPA2",
							content: "Dette alternativet anbefales, ettersom det gir bedre sikkerhet enn WPA-PSK."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Auto (for både TKIP og AES). Det er IKKE anbefalt å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen."
					},{
						type: "name",
						title: "RADIUS server-IP",
						content: "Viser IP-adressen for RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-port",
						content: "Viser portnummeret til RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-passord",
						content: "Viser det delte passordet for RADIUS-serveren."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Velg dette alternativet for å aktivere enkel godkjenningsmetode hvis noen av dine klientenheter bare har tilgang til trådløst nettverk ved hjelp av WEP (Wired Equivalent Privacy). Hvis valgt, støttes ikke WPS-funksjonen for dette båndet.",
				children: [{
					type: "name",
					title: "Type",
					content: "Velg en godkjenningstype for det trådløse nettverket. Standard er Auto, som automatisk velger Åpent system eller Delt nøkkel, basert på evnen og tilgangsforespørselen til den trådløse klienten."
				},{
					type: "name",
					title: "WEP-nøkkel-format",
					content: "Bruk enten ASCII-format eller heksadesimaler. ASCII-format er en kombinasjon av ASCII-tegn. Heksadesimalt format er en kombinasjon av tall (0–9) og bokstaver (A–F, a–f)."
				},{
					type: "name",
					title: "Nøkkeltype",
					content: "Velg lengde for WEP-nøkkelen.",
					children: [{
						type: "name",
						title: "64-biters",
						content: "Lar deg angi 10 heksadesimale sifre (0–9, A–F, a–f) eller 5 ASCII-tegn i WEP-verdifeltet."
					},{
						type: "name",
						title: "128-biters",
						content: "Lar deg angi 26 heksadesimale sifre (0–9, A–F, a–f) eller 13 ASCII-tegn i WEP-verdifeltet."
					}]
				},{
					type: "name",
					title: "Nøkkelverdi",
					content: "Angi WEP-nøkkelen i det riktige feltet."
				}]
			}]
			},{
				type: "name",
				title: "Modus",
				content: "Velg en overføringsmodus."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Velg en kanalbredde (båndbredde) for det 2,4 GHz trådløse nettverket."
			},{
				type: "name",
				title: "Kanal",
				content: "Velg en driftskanal for det 2,4 GHz trådløse nettverket. Det anbefales at kanalen er satt til Auto dersom du ikke har problemer med uregelmessig trådløstilkobling."
			},{
				type: "name",
				title: "Overføringskraft",
				content: "Velg enten Høy, Middels eller Lav for å spesifisere dataoverføringen styrke. Standard og anbefalt innstilling er Høy."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "Trådløst 5GHz",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Velg dette alternativet for å aktivere den trådløse radiofrekvensen på 5 GHz. Hvis deaktivert, støttes ikke WPS-funksjonen for dette båndet."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard nettverksnavn (SSID) stå som det er, eller angi et nytt navn (på opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på 5GHz-nettverket (SSID) fra Wi-Fi-nettverkslisten. Hvis valgt, støttes ikke WPS-funksjonen for dette båndet."
			},{
				type: "name",
				title: "Sikkerhet",
				content: "Velg en av de følgende sikkerhetsinnstillingene:",
				children: [{
					type: "name",
					title: "Ingen sikkerhet",
					content: "Velges for å deaktivere trådløs sikkerhet. Det anbefales sterkt at du aktiverer trådløs sikkerhet for å beskytte det trådløse nettverket mot uautorisert tilgang."
				},{
					type: "name",
					title: "Personlig WPA/WPA2",
					content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Denne innstillingen anbefales. Konfigurer det følgende dersom dette er valgt.",
					children: [{
						type: "name",
						title: "Versjon",
						content: "Velg en sikkerhetsversjon for det trådløse nettverket.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Dette alternativet støtter flere integreringer av WPA-standarden (Wi-Fi med beskyttet tilgang), for eksempel WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Dette alternativet gir et bra sikkerhetsnivå. Hvis valgt, støttes ikke WPS-funksjonen for dette båndet."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Dette alternativet anbefales, ettersom det gir bedre sikkerhet enn WPA-PSK."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Auto (for både TKIP og AES). Det er anbefales ikke å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, støttes ikke WPS-funksjonen for dette båndet."
					},{
						type: "name",
						title: "Passord",
						content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn i dette feltet."
					}]
				},{
					type: "name",
					title: "Enterprise-WPA/WPA2",
					content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Hvis valgt, støttes ikke WPS-funksjonen for dette båndet.",
					children: [{
						type: "name",
						title: "Versjon",
						content: "Velg en sikkerhetsversjon for det trådløse nettverket.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Dette alternativet støtter flere integreringer av WPA-standarden (Wi-Fi med beskyttet tilgang), for eksempel WPA og WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Dette alternativet gir et godt sikkerhetsnivå."
						},{
							type: "name",
							title: "WPA2",
							content: "Dette alternativet anbefales, ettersom det gir bedre sikkerhet enn WPA-PSK."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Auto (for både TKIP og AES). Det er IKKE anbefalt å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen."
					},{
						type: "name",
						title: "RADIUS server-IP",
						content: "Viser IP-adressen for RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-port",
						content: "Viser portnummeret til RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-passord",
						content: "Viser det delte passordet for RADIUS-serveren."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Velg dette alternativet for å aktivere enkel godkjenningsmetode hvis noen av dine klientenheter bare har tilgang til trådløst nettverk ved hjelp av WEP (Wired Equivalent Privacy). Hvis valgt, støttes ikke WPS-funksjonen for dette båndet.",
					children: [{
						type: "name",
						title: "Type",
						content: "Velg en godkjenningstype for det trådløse nettverket. Standard er Auto, som automatisk velger Åpent system eller Delt nøkkel, basert på evnen og tilgangsforespørselen til den trådløse klienten."
					},{
						type: "name",
						title: "WEP-nøkkel-format",
						content: "Bruk enten ASCII-format eller heksadesimaler. ASCII-format er en kombinasjon av bokstaver og tall. Heksadesimalt format er en kombinasjon av tall (0–9) og bokstaver (A–F, a–f)."
					},{
						type: "name",
						title: "Nøkkeltype",
						content: "Velg lengde for WEP-nøkkelen.",
						children:[{
							type: "name",
							title: "64-biters",
							content: "Lar deg angi 10 heksadesimale sifre (0–9, A–F, a–f) eller 5 ASCII-tegn i WEP-verdifeltet."
						},{
							type: "name",
							title: "128-biters",
							content: "Lar deg angi 26 heksadesimale sifre (0–9, A–F, a–f) eller 13 ASCII-tegn i WEP-verdifeltet."
						}]
					},{
						type: "name",
						title: "Nøkkelverdi",
						content: "Angi WEP-nøkkelen i det riktige feltet."
					}]
				}]
			},{
				type: "name",
				title: "Modus",
				content: "Velg en blandet modus for overføringen."
			},{
				type: "name",
				title: "Kanalbredde",
				content: "Velg en kanalbredde (båndbredde) for det 5GHz trådløse nettverket."
			},{
				type: "name",
				title: "Kanal",
				content: "Velg en driftskanal for det 5GHz trådløse nettverket. Det anbefales at kanalen er satt til Auto dersom du ikke har problemer med uregelmessig trådløstilkobling."
			},{
				type: "name",
				title: "Overføringskraft",
				content: "Velg enten Høy, Middels eller Lav for å spesifisere dataoverføringen styrke. Standard og anbefalt innstilling er Høy."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60GHz Trådløst nettverk",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Velg dette alternativet for å aktivere den trådløse 60GHz-radiofrekvensen. WPS-funksjonen vil ikke være støttet på dette båndet dersom den er deaktivert."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard nettverksnavn (SSID) stå som det er, eller angi et nytt navn (på opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på 60GHz-nettverket (SSID) fra Wi-Fi-nettverkslisten. WPS-funksjonen ikke være støttet på dette båndet dersom den er valgt."
			},{
				type: "name",
				title: "Sikkerhet",
				content: "Velg en av de følgende sikkerhetsinnstillingene:",
				children: [{
					type: "name",
					title: "Ingen sikkerhet",
					content: "Velges for å deaktivere trådløs sikkerhet. Det anbefales sterkt at du aktiverer trådløs sikkerhet for å beskytte det trådløse nettverket mot uautorisert tilgang."
				},{
					type: "name",
					title: "WPA2-Personal",
					content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Krypteringskoden er GCMP. Denne innstillingen anbefales. Konfigurer det følgende dersom dette er valgt.",
					children: [{
						type: "name",
						title: "Passord",
						content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn i dette feltet."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Krypteringskoden er GCMP. WPS-funksjonen ikke være støttet på dette båndet dersom den er valgt.",
					children: [{
						type: "name",
						title: "RADIUS server-IP",
						content: "Viser IP-adressen for RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-port",
						content: "Viser portnummeret til RADIUS-serveren."
					},{
						type: "name",
						title: "RADIUS-passord",
						content: "Viser det delte passordet for RADIUS-serveren."
					}]
				}]
			},{
				type: "name",
				title: "Kanal",
				content: "Velg en driftskanal for det 60GHz trådløse nettverket. Det anbefales at kanalen er satt til Auto dersom du ikke har problemer med uregelmessig trådløstilkobling."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		WPS: {	
			TITLE: "Ruterens PIN-kode",
			CONTENT: [{
				type: "paragraph",
				content: "Andre enheter kan koble til denne ruteren via WPS med ruterens PIN-kode."
			},{
				type: "name",
				title: "Ruterens PIN-kode",
				content: "Skru På for å tillate trådløse enheter å koble til ruteren ved hjelp av ruterens PIN (Personal Identification Number)."
			},{
				type: "name",
				title: "PIN-kode",
				content: "Viser ruterens PIN-kode. Standard PIN-kode finner du på ruterens etikett. Klikk Generer for å generere en ny, tilfeldig PIN-kode eller klikk Standard for å gjenopprette den gjeldende PIN-koden til fabrikkinnstillingene."
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS-veiviser",
			CONTENT:[{
				type: "paragraph",
				content: "WPS støtter kun følgende konfig.: Aktiver <Aktiver trådløs radio>, deaktiver <Skjul SSID> og sikkerhetsalternativet er <Ingen sikkerhet> eller <WPA/WPA2-Personal>(WPA2-PSK eller auto + AES eller auto) i modus med aktivert WPS-funksjon."
			},{
				type: "name",
				title: "Knapp (anbefalt)",
				content: "Velg denne konfigurasjonsmetoden for å aktivere WPS-funksjonen til å enkelt koble en WPS-kompatibel enhet til det trådløse nettverket ved hjelp av WPS-knappen eller virtuelt ved å bruke Koble til-knappen."
			},{
				type: "name",
				title: "PIN-kode",
				content: "Velg denne oppsettsmetoden for å legge til en enhet manuelt ved å angi WPS-PIN-koden for den trådløse enheten i feltet og klikk så Koble til."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Påloggede radiostasjoner",
			CONTENT: [{
				type: "name",
				title: "Klientnummer",
				content: "Viser antall tilhørende trådløse klienter."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for den tilhørende trådløse klienten."
			},{
				type: "name",
				title: "Tilkoblingstype",
				content: "Viser det trådløse frekvensbåndet (2,4GHz eller 5GHz) for den tilhørende trådløse kunden."
			},{
				type: "name",
				title: "Sikkerhet",
				content: "Viser sikkerhetstypen for den tilhørende trådløse klienten."
			},{
				type: "name",
				title: "Mottatte pakker",
				content: "Viser antall pakker mottatt av den tilhørende trådløse klienten."
			},{
				type: "name",
				title: "Sendte pakker",
				content: "Viser antall pakker sendt av den tilhørende trådløse klienten."
			},{
				type: "paragraph",
				content: "Klikk på Oppdater for å oppdatere informasjonen på denne siden."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Innstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Et gjestenettverk lar deg konfigurere et eget nettverk med et eget trådløst nettverk (SSID) og passord som du kan bruke for å få tilgang til det trådløse nettverket."
			},{
				type: "name",
				title: "Gjør det mulig for gjester å se hverandre",
				content: "Velg dette alternativet for å tillate at de trådløse enhetene på gjestenettverket kan se hverandre."
			},{
				type: "name",
				title: "Gjør det mulig for gjester å få tilgang til det lokale nettverket",
				content: "Velg dette alternativet for å tillate at de trådløse enhetene på gjestenettverket kan gå inn på delte filer og skrivere i ditt lokale nettverk."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "Trådløst 2,4 GHz/5 GHz",
			CONTENT: [{
				type: "name",
				title: "Aktiver gjestenettverk",
				content: "Velg denne avmerkingsboksen for å tillate gjestenettverk-funksjonen."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard gjeste-SSID stå som det er, eller angi et nytt navn (på opptil 32 tegn)."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på gjestenettverket (SSID) fra Wi-Fi-nettverkslisten."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Intervall for oppdatering av passord",
				content:"Velg oppdateringsintervallet for gjestenettverkets passord."
			}*/,{
				type: "name",
				title: "Sikkerhet",
				content: "Når du velger å aldri oppdatere passordet, velger du ett av følgende sikkerhetsalternativer:",
				children: [{
					type: "name",
					title: "Ingen sikkerhet",
					content: "Velges for å deaktivere trådløs sikkerhet. Det anbefales sterkt at du aktiverer trådløs sikkerhet for å beskytte det trådløse nettverket mot uautorisert tilgang."
				},{
					type: "name",
					title: "Personlig WPA/WPA2",
					content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Konfigurer det følgende dersom dette er valgt.",
					children: [{
						type: "name",
						title: "Versjon",
						content: "Velg en sikkerhetsversjon for gjestenettverket.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Dette alternativet støtter flere integreringer av WPA-standarden (Wi-Fi med beskyttet tilgang), for eksempel WPA og WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Dette alternativet gir et godt sikkerhetsnivå."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Dette alternativet anbefales, ettersom det gir bedre sikkerhet enn WPA-PSK."
						}]
					},{
						type: "name",
						title: "Kryptering",
						content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), eller Auto (for både TKIP og AES). Det er IKKE anbefalt å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen."
					}]
			}]},{
				type: "name",
				title: "Passord",
				content: "Bruk enten passordet som ble tilfeldig generert, eller opprett et passord på mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimale tegn (0–9, A–F, A–F)."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},

		NAT: {
			TITLE: "Application Layer Gateway (ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG tillater de tilpassede traverseringsfiltrene for Network Address Translation (NAT) å plugges inn i porten for å støtte adresse- og portoversettelse for visse programlag «kontroll/data»-protokoller: FTP, TFTP, H323, osv. Det anbefales at ALG aktiveres."
			},{
				type: "name",
				title: "Aktiver FTP ALG",
				content: "Dette valget lar kunder og servere av typen FTP (File Transfer Protocol)  overføre data via NAT."
			},{
				type: "name",
				title: "Aktiver TFTP ALG",
				content: "Dette valget lar kunder og servere av typen TFTP (Trivial File Transfer Protocol) overføre data via NAT."
			},{
				type: "name",
				title: "Aktiver H323 ALG",
				content: "Dette valget lar Microsoft NetMeeting-klienter kommunisere via NAT."
			},{
				type: "name",
				title: "Aktiver RTSP ALG",
				content: "Dette valget lar mediespiller-klienter kommunisere med direkteavspilt multimediaservere via NAT."
			},{
				type: "name",
				title: "Aktiver PPTP direkte",
				content: "Dette valget tillater punkt-til-punkt-økter å tunneleres gjennom et IP-nettverk og gå gjennom ruteren."
			},{
				type: "name",
				title: "Aktiver L2TP direkte",
				content: "Dette valget tillater punkt-til-punkt-økter med to lag å tunneleres gjennom et IP-nettverk og gå gjennom ruteren."
			},{
				type: "name",
				title: "Aktiver IPSec direkte",
				content: "Dette valget tillater Internet Protocol-sikkerhet (IPSec) å tunneleres gjennom et IP-nettverk og gå gjennom ruteren. IPSec bruker kryptografiske sikkerhetstjenester for å sikre privat og sikker kommunikasjon over IP-nettverk."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Virtuelle servere",
			CONTENT: [{
				type: "paragraph",
				content: "Virtuelle servere brukes til å sette opp offentlige tjenester på det lokale nettverket. En virtuell server er definert som en ekstern port, og alle forespørsler fra Internett til denne eksterne porten vil omdirigeres til en bestemt datamaskin, som må konfigureres med en statisk eller reservert IP-adresse."
			},{
				type: "name",
				title: "Tjenestetype",
				content: "Viser navnet på den virtuelle serveren."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser portnummeret eller en rekke porter som brukes av den virtuelle serveren."
			},{
				type: "name",
				title: "Intern  IP",
				content: "Viser IP-adressen for datamaskinen som kjører tjenesteprogrammet."
			},{
				type: "name",
				title: "Intern port",
				content: "Viser portnummeret for datamaskinen som kjører tjenesteprogrammet."
			},{
				type: "name",
				title: "Protokoll",
				content: "Viser protokollen som brukes for tjenesteprogrammet: TCP, UDP eller Alle (alle protokoller som støttes av ruteren)."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status (på eller av) for den bestemte filtreringsregelen."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den tilsvarende regelen."
			},{
				type: "step",
				title: "Konfigurere en virtuell serverregel",
				content: [
					"1. Klikk på Legg til.",
					"2. Klikk Vis eksisterende tjenester for å velge en tjeneste fra listen som automatisk fyller inn det aktuelle portnummeret i feltene ekstern port og intern port. Hvis tjenesten ikke er oppført skriver du det eksterne portnummeret (for eksempel 21) eller en rekke porter (f.eks. 21–25). La intern port stå tomt hvis det er identisk til ekstern port, eller angi et spesifikt portnummer (for eksempel 21) dersom ektern port er en enkelt port. Skriv inn IP-adressen til datamaskinen som kjører tjenesteprogrammet i punktumdesimalformat i Interne IP-feltet.",
					"3. Velg en protokoll for tjenesteprogrammet: Velg TCP, UDP eller Alle fra nedtrekkslisten med protokoller.",
					"4. Velg Aktiver.",
					"5. Klikk OK."
				]
			},{
				type: "step",
				title: "Endre eller slette en virtuell serverregel",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for den korresponderende regelen som du ønsker å endre eller slette."
			},{
				type: "step",
				title: "For å slette flere regler",
				content: "Velg alle reglene som du ønsker å slette og klikk på Slett over tabellen."
			},{
				type: "note",
				title: "Merk",
				content: "Hvis din lokale vertsenhet er vert for mer enn én type tilgjengelige tjenester, må du lage en regel for hver av tjenestene."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Port-utløsing",
			CONTENT: [{
				type: "paragraph",
				content: "Port-utløser brukes til å videresende trafikk fra en bestemt port til en bestemt server i nettverket."
			},{
				type: "name",
				title: "Anvendelse",
				content: "Viser programnavnet."
			},{
				type: "name",
				title: "Utløserport",
				content: "Viser porten for utgående trafikk som brukes til å utløse en filtreringsregel for en utgående tilkobling."
			},{
				type: "name",
				title: "Utløser-protokoll",
				content: "Viser protokollen som brukes for å utløser-port. TCP, UDP eller Alle (alle protokoller som støttes av ruteren)."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser porter eller portområdet som brukes av det eksterne systemet. Et svar for bruk av en av disse portene vil bli videresendt til PCen som utløser denne regelen. Du kan angi inntil fem grupper med porter (eller portseksjoner). Hver portgruppe må være delt med \",\" (komma), som for eksempel: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "Ekstern protokoll",
				content: "Viser protokollen som brukes for innkommende port. TCP, UDP eller ALLE (alle protokoller som støttes av ruteren)."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status (aktivert eller deaktivert) for den bestemte filtreringsregelen."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den tilsvarende regelen."
			},{
				type: "step",
				title: "Konfigurere en regel for port-utløsing",
				content: [{
					type: "note",
					title: "Merk",
					content: "Hver regel kan kun brukes av en vert av gangen."
				},
					"1. Klikk på Legg til.",
					"2. Klikk Vis eksisterende programmer for å velge et program fra listen og  automatisk fylle inn standardverdiene i de aktuelle feltene. Hvis du ønsker å legge til et unotert program, skriver du manuelt inn program, utløser-port, utløser-protokoll, ekstern port og ekstern protokoll.",
					"3. Velg Aktiver.",
					"4. Klikk på OK."
				]
			},{
				type: "step",
				title: "Endre eller slette en regel for port-utløsing",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for den korresponderende regelen som du ønsker å endre eller slette."
			},{
				type: "step",
				title: "Endre eller slette flere regler for port-utløsing",
				content: "Velg alle reglene som du ønsker å slette og klikk på Slett over tabellen."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "Vertsfunksjonen DMZ (demilitarisert sone) tillater en lokal vert å eksponeres på Internett for spesialtjenester, som for eksempel nettbaserte spill eller videokonferanser. I utgangspunktet gir DMZ tillatelse til en enkelt datamaskin i ditt LAN-nettverk åpne alle sine porter. Denne datamaskinen må konfigureres med en statisk IP-adresse og har deaktivert sin DHCP-klientfunksjon."
			},{
				type: "step",
				title: "Tilordne en datamaskin eller server for å være en DMZ-server",
				content: [
					"1. Velg Aktiver DMZ.",
					"2. I IP-adressefeltet for DMZ-verten skriver du inn IP-adressen til den lokale datamaskinen for ønsker å konfigurere som DMZ-vert.",
					"3. Klikk på Lagre."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Som standard er Universell Plug and Play (UPnP) aktivert for å tillate enheter, for eksempel datamaskiner og Internett-apparater, å automatisk oppdage og kommunisere med hverandre på det lokale nettverket."
			},{
				type: "paragraph",
				content: "UPnP-tjenestelisten viser informasjon om UPnP-enheten."
			},{
				type: "name",
				title: "Tjenestebeskrivelse",
				content: "Viser en kort beskrivelse av den lokale verten som startet UPnP-forespørselen."
			},{
				type: "name",
				title: "Ekstern port",
				content: "Viser den eksterne porten som er åpnet av den lokale verten."
			},{
				type: "name",
				title: "Protokoll",
				content: "Viser nettverksprotokolltypen som brukes av den lokale verten."
			},{
				type: "name",
				title: "Intern IP-adresse",
				content: "Viser IP-adressen for den lokale verten."
			},{
				type: "name",
				title: "Intern port",
				content: "Viser den interne porten som er åpnet av den lokale verten."
			},{
				type: "paragraph",
				content: "Klikk på Oppdater for å oppdatere UPnP-serverlisten."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Enhetsinnstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Enhetsinnstillinger viser relatert informasjon om eventuelle USB-lagringsenheter som er tilkoblet via USB-porten."
			},{
				type: "name",
				title: "Skann",
				content: "Vanligvis oppdager ruteren automatisk enhver nylig tilkoblet enhet. Hvis det ikke er tilfelle, klikker du på denne knappen for å søke etter eventuelle nye tilkoblede enheter og oppdaterer siden med den nye informasjonen."
			},{
				type: "name",
				title: "Volum",
				content: "Viser navnet på USB-enheten."
			},{
				type: "name",
				title: "Kapasitet",
				content: "Viser total lagringskapasitet på USB-lagringsenheten."
			},{
				type: "name",
				title: "Ledig plass",
				content: "Viser nåværende ledig lagringsplass."
			},{
				type: "name",
				title: "Trygg fjerning",
				content: "Klikk på denne knappen for å trygt frakoble USB-lagringsenheten før du fysisk kobler den fra ruteren."
			},{
				type: "paragraph",
				content: "Vær oppmerksom på at Trygg fjerning-knappen vises bare når en USB-lagringsenhet er koblet til ruteren, og du vil ikke være i stand til å frakoble USB-enheten mens enheten er opptatt."
			},{
				type: "name",
				title: "Status",
				content: "Denne avmerkingsboksen vises bare når en USB-lagringsenhet er koblet til ruteren. Velg for å aktivere fildeling av USB-enheten."
			},{
				type: "step",
				title: "Konfigurere en filserver",
				content: [
				"1. Koble USB-lagringsenheten til USB-porten på ruteren med en USB-kabel.",
				"2. Den nylig tilkoblede USB-enheten vil normalt oppdages automatisk av ruteren og vises på siden Enhetsinnstillinger. Hvis ikke, klikk på Skann.",
				"3. Velg Aktiv for å aktivere fildeling."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Konto for deling",
			CONTENT: [{
				type: "name",
				title: "Konto",
				content: "Du kan enten velge å bruke standardkonto for å logge inn på delte filer og mapper eller velge Bruk ny konto og skriv inn det følgende for å opprette en ny brukerkonto."
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn et brukernavn på mellom 1 og 15 alfanumeriske tegn eller understrekede tegn samt et passord på mellom 1 og 15 ASCII-tegn. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Bekreft passord",
				content: "Skriv inn passordet for å bekrefte at det ikke er noen skrivefeil. Dette feltet skiller også mellom små og store bokstaver."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Innstillinger for deling",
			CONTENT: [{
				type: "name",
				title: "Nettverk/media-servernavn",
				content: "Viser navnet som er brukt for å få tilgang til den tilkoblede USB-lagringsenheten. Navnet må bestå av alfanumeriske tegn, understreker eller bindestreker, og være 4–15 tegn langt."
			},{
				type: "name",
				title: "Aktiver",
				content: "Velges for å aktivere tilgangsmetoden."
			},{
				type: "name",
				title: "Tilgangsmetode",
				content: "Det er tre tilgangsmetoder som gir tilgang til den tilkoblede USB-lagringsenheten. Du kan velge en eller flere tilgangsmetoder ved å krysse av avmerkingsboksen.",
				children: [{
					type: "name",
					title: "Andre maskiner",
					content: "Hvis funksjonen er aktivert, har brukere på nettverket tilgang til USB-lagringsenheten med den tildelte IP-adressen (for eksempel \\\\192.168.0.1)."
				},{
					type: "name",
					title: "FTP",
					content: "Hvis funksjonen er aktivert, har FTP-klienter på nettverket tilgang til USB-lagringsenhet med den tildelte IP-adressen, etterfulgt av FTP-serverens portnummer (f.eks. ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (via Internett)",
					content: "Hvis funksjonen er aktivert, har eksterne brukere tilgang til USB-lagringsenheten gjennom FTP (Internett). Denne funksjonen støtter både nedlasting og opplasting av filer. For å endre FTP-serverens portnummer, angir du et portnummer og klikker på Lagre for å bruke endringene."
				}]
			},{
				type: "name",
				title: "Kobling",
				content: "Viser adressen som er brukt for å få tilgang til den delte USB-lagringsenheten."
			},{
				type: "name",
				title: "Port",
				content: "Viser portnummeret til FTP-serveren. Bruk standardverdien 0 eller en verdi mellom 30 og 86400."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Mappedeling",
			CONTENT: [{
				type: "name",
				title: "Del alle",
				content: "Slå på for å dele alle filer og mapper eller holde den av for å kun dele de spesifiserte mappene."
			},{
				type: "name",
				title: "Aktiver godkjenning",
				content: "Det er sterkt anbefalt å aktivere godkjenning slik at brukerne må angi gyldig brukernavn og passord for å få tilgang til delingsmapper."
			},{
				type: "name",
				title: "Mappenavn",
				content: "Viser navnet på den delte mappen."
			},{
				type: "name",
				title: "Mappebane",
				content: "Viser banen til den delte mappen."
			},{
				type: "name",
				title: "Mediadeling",
				content: "Angir om den delte mappen kan dele medier eller ikke."
			},{
				type: "name",
				title: "Volumnavn",
				content: "Viser navnet på den delte enheten."
			},{
				type: "name",
				title: "Status",
				content: "Viser statusen til den delte mappen med lyspære-indikator."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den korresponderende regelen."
			},{
				type: "name",
				title: "Bla gjennom",
				content: "Klikk for å søke etter en delt mappe."
			},{
				type: "name",
				title: "Tillat gjester å bruke nettverket",
				content: "Velg å gi klienter på gjestenettverket tilgang til de delte mappene."
			},{
				type: "name",
				title: "Aktiver godkjenning",
				content: "Velg å kreve at brukerne har tilgang til de delte mappene med et gyldig brukernavn og passord."
			},{
				type: "name",
				title: "Aktiver skrivetilgang",
				content: "Velg å tillate brukere å gjøre endringer i mappens innhold."
			},{
				type: "name",
				title: "Aktiver mediadeling",
				content: "Velges for å aktivere mediedeling."
			},{
				type: "name",
				title:"Oppdater",
				content: "Klikk for å oppdatere mappedeling-listen."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Utskriftserver",
			CONTENT: [{
				type: "name",
				title:"Utskriftserver",
				content: "Skru På for å aktivere utskriftsserverfunksjonen."
			},{
				type: "name",
				title:"Skrivernavn",
				content: "Viser navnet på skriveren som er koblet til ruteren."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Offline-nedlasting",
			CONTENT: [{
				type: "name",
				title:"Status",
				content: "Skru På for å aktivere funksjonen for frakoblet nedlasting."
			},{
				type: "name",
				title:"Mappebane",
				content: "Arbeidsmappe til funksjonen for frakoblet nedlasting. Du må velge en mappebane etter statusknappen blir påslått, hvis ikke vil elementets operasjonstabell forbli usynlig, hvilket betyr at du ikke kan gjøre mer. Etter arbeidsmappen er valgt, vil alle filene opprettet under de påfølgende operasjonene bli lagret eller bufret i mappen. Hvis det er aktive elementer kan ikke arbeidsmappen bli endret, og du bør ikke trekke ut USB-lagringen, da dette kan føre til fatale feil som ikke kan fikses."
			},{
				type: "name",
				title:"Plan",
				content: "Hvis valgt, kan du velge tidsperiodene for nedlasting. Tidsplanen er basert på ruterens systemtid, som kan bli bestemt i «Systemverktøy -> Tidsinnstillinger»."
			},{
				type: "name",
				title:"Forsett å seede etter oppgaven er utført",
				content: "Hvis valgt, vil den fullførte oppgaven fortsette å seede."
			},{
				type: "name",
				title: "Maksimalt antall aktive oppgaver",
				content: "Viser maksimalt antall aktive oppgaver."
			},{
				type: "name",
				title:"Maksimal nedlastingshastighet",
				content: "Viser maksimal nedlastingshastighet."
			},{
				type: "name",
				title:"Maksimal opplastingshastighet",
				content: "Viser minimal opplastingshastighet."
			},{
				type: "name",
				title: "Antall forbindelser",
				content: "Viser forbindelsenes innstillinger."
			},{
				type: "name",
				title: "Globalt maksimalt antall forbindelser",
				content: "Endre for å begrense maksimalt antall forbindelser for alle oppgaver."
			},{
				type: "name",
				title: "Maksimalt antall tilkoblede noder per torrent.",
				content: "Endre for å begrense maksimalt antall noder per oppgave."
			},{
				type: "name",
				title: "Aktiver DHT-nettverk",
				content: "DHT vil være aktivert dersom valgt."
			},{
				type: "name",
				title: "Aktiver nodeutveksling",
				content: "Utveksling av nodeinformasjon vil være aktivert dersom valgt."
			},{
				type: "name",
				title: "Aktiver BitTorrent protokollkryptering",
				content: "BitTorrent protokolkryptering vil være aktivert dersom valgt."
			},{
				type: "name",
				title:"aMULE-Server",
				content: "Skriv inn IP-adressen og porten til en aMule-server for å koble til."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Elementer",
			CONTENT: [{
				type: "paragraph",
				content: "Viser nedlastingselementene."
			},{
				type: "name",
				title: "Fil",
				content: "Viser nedlastingsfilnavnet."
			},{
				type: "name",
				title:"Hastighet",
				content: "Viser opplastings- og nedlastingshastigheten."
			},{
				type: "name",
				title: "Fullført",
				content: "Viser den fullførte størrelsen og den totale størrelsen."
			},{
				type: "name",
				title:"Gjenstående tid",
				content: "Viser den gjenværende tiden før nedlastingen er fullført."
			},{
				type: "name",
				title:"Tilkoblede noder",
				content: "Viser informasjonen om de tilkoblede nodene."
			},{
				type: "name",
				title: "Status",
				content: "Viser oppgavestatusen."
			},{
				type: "name",
				title: "Kilde",
				content: "Viser nedlastingstypen."
			},{
				type: "step",
				title: "For å legge til et nedlastingselement",
				content: [
					"1. Klikk på Legg til.",
					"2. Velg type nedlastingskilde:",
					"1.) Torrent fra PC: Klikk på Bla gjennom for å velge en torrent-fil fra PC.",
					"2.) Torrent fra USB: Klikk på Bla gjennom for å velge en torrent-fil fra USB.",
					"3) URL: Angi URL(HTTP, HTTPS, FTP, ed2k).",
					"3. Klikk på OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Sperrefunksjon",
			CONTENT: [{
				type: "paragraph",
				content: "Med Sperrefunksjon kan du blokkere upassende, eksplisitte og ondsinnede nettsteder, begrense tilgangen til bestemte tider på dagen (for eksempel Facebook eller YouTube i løpet av leksetid), og samtidig beskytte hver enhet på hjemmenettverket mot skadelig programvare og phishing gjennom ett sentralt kontrollpunkt."
			},{
				type: "name",
				title: "Sperrefunksjon",
				content: "Skru På for å aktivere Sperrefunksjoner. Denne funksjonen er deaktivert som standard."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Enheter med sperrefunksjoner",
			CONTENT: [{
				type: "paragraph",
				content: "Viser listen over enheter under sperrefunksjoner."
			},{
				type: "name",
				title: "Enhetsnavn",
				content: "Viser navnet på alle tilkoblede klientenheter som har sperrefunksjoner aktivert."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for alle tilkoblede klientenheter som har sperrefunksjoner aktivert."
			},{
				type: "name",
				title: "Internett-tilgangstid",
				content: "Viser de restrikterte tidsrommene. Tidsplanen er basert på ruterens systemtid, som kan bli bestemt i \"Systemverktøy -> Tidsinnstillinger\"."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en kort beskrivelse for den tilkoblede enheten. Dette er en valgfri innstilling."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status (aktivert eller deaktivert) for sperrefunksjonene på den korresponderende enheten."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den korresponderende enheten."
			},{
				type: "step",
				title: "For å begrense en ny klient-enhet",
				content: [
					"1. Klikk på Legg til.",
					"2. Klikk Vis eksisterende enheter og velg en tilkoblet enhet fra listen med tilgangsenheter; eller skriv inn enhetsnavnet og MAC-adressen manuelt for å legge til en frakoblet enhet.",
					"3. Klikk på ikonet for Internett-tilkoblingstid for å angi en tidsperiode for begrensningen.",
					"4. Skriv inn en kort beskrivelse i Beskrivelse-feltet. (valgfritt)",
					"5. Velg Aktiver.",
					"6. Klikk på OK for å lagre oppføringen."
				]
			},{
				type: "paragraph",
				content: "For å endre eller slette en sperrefunksjonoppføring, klikker du på Rediger-ikonet for å redigere informasjonen eller papirkurven for å fjerne oppføringen."
			},{
				type: "paragraph",
				content: "Vil slette flere oppføringer, velger du oppføringene og klikker på Slett over tabellen."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Innholdsbegrensning",
			CONTENT: [{
				type: "name",
				title: "Inkluder i svarteliste",
				content: "Inneholder søkeord som skal brukes til å blokkere all tilgang til nettsteder fra klientenheter som er angitt i innholdsbegrensnings-listen.",
				children: [{
					type: "paragraph",
					content: "Klikk på Legg til et nytt nøkkelord for å legge til et nøkkelord i svartelisten. Hvis du vil slette et nøkkelord, klikker du på (-)-ikonet for søkeordet du ønsker å slette."
				}]
			},{
				type: "name",
				title: "Inkluder i hviteliste",
				content: "Inneholder Internettadressene som klientenhetene i sperrefunksjons-listen har adgang til.",
				children: [{
					type: "paragraph",
					content: "Klikk på Legg til et nytt domenenavn for å legge til en nettside i svartelisten. Hvis du vil slette en nettside, klikker du på (-)-ikonet for nettsiden du ønsker å slette."
				}]
			},{
				type: "note",
				title: "Merk",
				content: "Nøkkelord kan også være et domenenavn, for eksempel mail.google.com eller www.facebook.com."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre konfigurasjonen."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "Tjenestekvalitet (QoS) bidrar til å prioritere internettrafikk basert på dine behov. Du kan angi prioritetsnivået for en enhet eller et program i QoS-regellisten ."
			},{
				type: "name",
				title: "Aktiver QoS",
				content: "Velg denne boksen for å aktivere QoS-funksjonen."				
			},{
				type: "name",
				title: "Last opp båndbredde",
				content: "Skriv inn maks. båndbredde for opplasting som du fikk oppgitt av Internett-leverandøren."				
			},{
				type: "name",
				title: "Last ned båndbredde",
				content: "Skriv inn maks. båndbredde for nedlasting som du fikk oppgitt av Internett-leverandøren."
			},{
				type: "name",
				title: "Høy prioritet",
				content: "Angi en prosentandel for høyt prioritert trafikk."
			},{
				type: "name",
				title: "Middels prioritet",
				content: "Angi en prosentandel for middels prioritert trafikk."
			},{
				type: "name",
				title: "Lav prioritet",
				content: "Angi en prosentandel for lavt prioritert trafikk."
			},{
				type: "note",
				title: "Merk",
				content: "Det maksimale antallet (prosent) for alle prioriteringer er 1."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		QOS_RULE: {
			TITLE: "QoS regelliste",
			CONTENT: [{
				type: "name",
				title: "Type",
				content: "Velg en type for å legge QoS-regellisten."
			},{
				type: "step",
				title: "Konfigurere en regel for høy/middels/lav prioritet etter enhet",
				content: [
					"1. Klikk på Legg til.",
					"2. Velg etter enhet.",
					"3. Klikk Vis eksisterende enheter for å velge ønsket enhet fra listen med tilgangsenheter, eller skriv eventuelt inn enhetsnavn og MAC-adresse manuelt i de riktige feltene.",
					"4. Klikk på OK."
				]
			},{
				type: "step",
				title: "Konfigurere en regel for høy/middels/lav prioritet etter program",
				content: [
					"1. Klikk på Legg til.",
					"2. Velg etter program.",
					"3. Velg din ønskede applikasjon fra applikasjonslisten, eller spesialtilpass en applikasjon ved å konfigurere navnet, protokollen og destinasjonsporten (1–65535) i de respektive felt. Du kan føre opp én enkelt port, flere porter eller en rekke porter ved å bruke kommaer til å skille (f.eks. 21,36-105,111).",
					"4. Klikk på OK."
				]
			},{
				type: "step",
				title: "Konfigurere en regel for høy/middels/lav prioritet etter fysisk port",
				content: [
					"1. Klikk på Legg til.",
					"2. Velg etter fysisk port",
					"3. Velg ønsket port.",
					"4. Klikk på OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Databaseoppgradering",
			CONTENT: [{
				type: "name",
				title: "Ny databasefil",
				content: "Klikk på Bla gjennom for å finne din nye databasefil. Velg den og klikk Oppgrader for å oppgradere databasen til en nyere versjon."
			},{
				type: "name",
				title: "Databaseversjon",
				content: "Viser gjeldende databaseversjon."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Brannmur",
			CONTENT: [{
				type: "name",
				title: "SPI-brannmur",
				content: "Brannmur av typen Stateful Packet Inspection (SPI) hindrer cyberangrep og validerer trafikken som passerer gjennom ruteren basert på protokollen."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS-beskyttelse",
			CONTENT: [{
				type: "name",
				title: "DoS-beskyttelse",
				content: "Beskyttelse mot tjenestenektangrep (DoS) beskytter LAN mot DoS-angrep som overflyter nettverket med forespørsler."
			},{
				type: "name",
				title: "ICMP-FLOOD Attack Filtering",
				content: "Aktiver for å hindre overflytende angrep av typen Internet Control Message Protocol (ICMP).",
				children: [{
					type: "name",
					title: "Av",
					content: "Ingen beskyttelse."
				},{
					type: "name",
					title: "Lav",
					content: "Lavt beskyttelsesnivå og liten innvirkning på ruterens ytelse."
				},{
					type: "name",
					title: "Middels",
					content: "Moderat beskyttelsesnivå med noe merkbar innvirkning på ruterens ytelse."
				},{
					type: "name",
					title: "Høy",
					content: "Høyt beskyttelsesnivå, men en merkbar innvirkning på ruterens ytelse."
				}]
			},{
				type: "name",
				title: "UDP-FLOOD Attack Filtering",
				content: "Aktiver for å hindre overflytende angrep av typen User Datagram Protocol (UDP)."
			},{
				type: "name",
				title: "TCP-SYN-FLOOD Attack Filtering",
				content: "Aktiver for å hindre overflytende angrep av typen Transmission Control Protocol-Synchronize (TCP-SYN)."
			},{
				type: "name",
				title: "Ignorer pingpakke",
				content: "Aktiver for å ignorere pingpakker fra WAN-porten."
			},{
				type: "name",
				title: "Forby pingpakke for LAN-porten",
				content: "Aktiver for å ignorere pingpakker fra LAN-porten."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Liste med blokkerte DoS-verter",
			CONTENT: [{
				type: "name",
				title: "Liste med blokkerte DoS-verter",
				content: "Viser IP-adresse og MAC-adresse fra en blokkert DoS-angrepskilde."
			},{
				type: "step",
				title: "For å slette en oppføring.",
				content: "Velg oppføringen som du ønsker å slette fra vertslisten, og klikk på Slett over tabellen."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Tilgangskontroll",
			CONTENT: [{
				type: "paragraph",
				content: "Tilgangskontroll blir brukt for å tillatte eller blokkere spesifikke datamaskiner og andre enheter fra å få tilgang til nettverket ditt. Når en enhet blir blokkert, kan den ikke lenger kommunisere med andre enheter for å koble til Internett."
			},{
				type: "paragraph",
				content: "For å bruke tilgangskontroll aktiverer du denne funksjonen og angir en svarteliste eller hviteliste. Hvis tilgangskontroll  er deaktivert (Av), har alle enheter, inkludert de svartelistede, mulighet til å koble seg til."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Tilgangspunkt-modus",
			CONTENT: [{
				type: "name",
				title: "Inkluder i svarteliste",
				content: "Bare enhetene på svartelisten vil nektes tilgang til nettverket."
			},{
				type: "name",
				title: "Inkluder i hviteliste",
				content: "Bare enhetene på hvitelisten vil nektes tilgang til nettverket."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Enheter online",
			CONTENT: [{
				type: "name",
				title: "Enhetsnavn",
				content: "Viser navnet på den tilkoblede enheten."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser IP-adressen for den tilkoblede enheten."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for den tilkoblede enheten."
			},{
				type: "name",
				title: "Tilkoblingstype",
				content: "Viser tilkoblingstype for den tilkoblede enheten."
			},{
				type: "step",
				title: "Blokkere en enhet",
				content: "Klikk på det Blokker-ikonet tilhørende enheten du vil blokkere, i kolonnen «Endre» i tabellen for Tilkoblede enheter."
			},{
				type: "step",
				title: "Blokkere flere enheter",
				content: "Velg alle enhetene som du ønsker å blokkere i tabellen for Tilkoblede enheter, og klikk så på Block (Blokker) over tabellen. Enheten vil automatisk bli lagt til enhetene i svartelisten."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Enheter på svarteliste/hviteliste",
			CONTENT: [{
				type: "step",
				title: "For å legge en enhet i svarteliste/hviteliste",
				content: [
					"1. Klikk på Legg til-ikonet.",
					"2. Angi enhetsnavn.",
					"3. Angi en MAC-adresse for enheten.",
					"4. Klikk på OK."
				]
			},{
				type: "step",
				title: "For å endre eller slette en enhet i svarteliste/hviteliste",
				content: "Klikk på Endre-ikonet eller papirkurven tilhørende den regelen som du ønsker å endre eller slette fra svarteliste/hviteliste-tabellen."
			},{
				type: "step",
				title: "For å endre eller slette flere enheter i svarteliste/hviteliste",
				content: "Velg alle reglene som du ønsker å slette i svarteliste/hviteliste-tabellen, og klikk så på Slett over tabellen."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Innstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Binding av ARP (Address Resolution Protocol) er nyttig for å kontrollere tilgangen til en bestemt datamaskin på LAN ved å binde sammen enhetens IP- og MAC-adresse. ARP-binding hindrer også andre enheter i å bruke bestemte IP-adresser."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP-liste",
			CONTENT: [{
				type: "paragraph",
				content: "Viser MAC-adressen og IP-adressen for de tilkoblede enhetene."
			},{
				type: "name",
				title: "ARP-oppføringsnummer",
				content: "Viser totalt antall enheter som er koblet til ruteren på nåværende tidspunkt."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for den tilkoblede enheten."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser den tildelte IP-adressen for den tilkoblede enheten."
			},{
				type: "name",
				title: "Bundet",
				content: "Indikerer hvorvidt MAC- og IP-adressene er bundet eller ikke."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å binde eller slette den tilhørende oppføringen fra listen."
			},{
				type: "note",
				title: "Merk",
				content: "Du kan ikke binde sammen en IP-adresse til mer enn én MAC-adresse."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Bindingsliste",
			CONTENT: [{
				type: "step",
				title: "Konfigurere en enhet med ARP-binding",
				content: [
					"1. Klikk på Legg til.",
					"2. Angi en MAC-adresse for enheten.",
					"3. Angi IP-adressen du ønsker å binde til den ovenstående MAC-adressen.",
					"4. Skriv inn en beskrivelse for denne enheten. (valgfritt)",
					"5. Velg Aktiver.",
					"6. Klikk på OK."
				]
			},{
				type: "step",
				title: "Endre eller slette en oppføring",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for den regelen som du ønsker å endre eller slette."
			},{
				type: "step",
				title: "For å slette flere oppføringer",
				content: "Velg oppføringen som du ønsker å slette fra bindingslisten, og klikk på Slett over tabellen."
			}]
		},
		
		IPV6: {
			TITLE: "Internett",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Velg å aktivere (På) eller deaktivere (Av) IPv6-funksjonen til ruteren."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: Statisk IP",
			},{
				type: "name",
				title: "Statisk IP",
				content: "Velg denne typen hvis din Internett-leverandør bruker statisk IPv6-adressetildeling."
			},{
				type: "name",
				title: "IPv6-adresse/Standard Gateway/Primær DNS/Sekundær DNS",
				content: "Skriv inn paremeterne du fikk oppgitt av din Internett-leverandør."
			},{
				type: "name",
				title: "MTU-størrelse",
				content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: Dynamisk IP",
			},{
				type: "name",
				title: "Dynamisk IP",
				content: "Velg denne typen hvis din Internett-leverandør bruker dynamisk IPv6-adressetildeling."
			},{
				type: "name",
				title: "IPv6-adresse/Primær DNS/Sekundær DNS",
				content: "Disse parametrene blir automatisk tildelt av DHCPv6-serveren fra Internett-leverandøren."
			},{
				type: "name",
				title: "Forny",
				content: "Klikk på denne knappen for å få nye IPv6-parametere fra DHCPv6-serveren til Internett-leverandøren."
			},{
				type: "name",
				title: "Frigi",
				content: "Klikk på denne knappen for å få nye IPv6-adresser tildelt fra DHCPv6-serveren til Internett-leverandøren."
			},{
				type: "name",
				title: "Få IPv6-adresse",
				content: "Velg DHCPv6 for å få en permanent IPv6-adresse, eller SLAAC for å få en IPv6 adresse generert fra reklamepakken til ruteren for ISP-en din."
			},{
				type: "name",
				title: "Prefiksdelegasjon",
				content: "Velg Aktiver for å få en prefiksdelegasjon fra DHCPv6-serveren fra ISP, eller Deaktiver for å designere et adresseprefiks manuelt. Klienter på LAN vil generere en IPv6-adresse med dette prefikset."
			},{
				type: "name",
				title: "DNS-adresse",
				content: "Velges for å Få dynamisk fra Internett-leverandøren eller Bruk følgende DNS-adresse. Hvis du velger Bruk følgende DNS-adresse, kan du skrive inn DNS-adressen fra Internett-leverandøren manuelt."
			},{
				type: "name",
				title: "Primær DNS/Sekundær DNS",
				content: "Skriv inn disse parametrene manuelt, eller få dem dynamisk fra Internett-leverandøren."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Velg denne typen hvis din Internett-leverandør bruker PPPoEv6, og har gitt deg et brukernavn og passord."
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn paremeterne du fikk oppgitt av din Internett-leverandør."
			},{
				type: "name",
				title: "IPv6-adresse",
				content: "Denne adressen blir automatisk tildelt av DHCPv6-serveren fra Internett-leverandøren etter at du skriver inn brukernavn og passord og klikker på Koble til."
			},{
				type: "name",
				title: "DNS-adresse",
				content: "Velges for å Få dynamisk fra Internett-leverandøren eller Bruk følgende DNS-adresse. Hvis du velger Bruk følgende DNS-adresse, kan du skrive inn DNS-adressen fra Internett-leverandøren manuelt."
			},{
				type: "name",
				title: "Få IPv6-adresse",
				content: "Velg DHCPv6 for å få en permanent IPv6-adresse, eller SLAAC for å få en IPv6 adresse generert fra reklamepakken til ruteren for ISP-en din, eller Spesifisert av ISP for å manuelt skrive inn IPv6-adressen for din ISP."
			},{
				type: "name",
				title: "Prefiksdelegasjon",
				content: "Velg Aktiver for å få en prefiksdelegasjon fra DHCPv6-serveren fra ISP, eller Deaktiver for å designere et adresseprefiks manuelt. Klienter på LAN vil generere en IPv6-adresse med dette prefikset."
			},{
				type: "name",
				title: "Koble til",
				content: "Klikk på denne knappen for å koble til Internett."
			},{
				type: "name",
				title: "Koble fra",
				content: "Klikk på denne knappen for å koble fra Internett."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: 6to4-tunnel"
			},{
				type: "name",
				title: "6to4-tunnel",
				content: "Velg denne typen hvis din Internett-leverandør bruker 6to4-utplassering for å tildele en adresse."
			},{
				type: "name",
				title: "IPv4-adresse/IPv4-nettverksmaske/IPv4 standard gateway/Tunnel-adresse",
				content: "Disse parametrene vil genereres dynamisk av IPv4-informasjon for WAN-porten når du klikker på Koble til."
			},{
				type: "name",
				title: "Bruk følgende DNS-server",
				content: "Velg avmerkingsboksen for å manuelt skrive inn primær-DNS og/eller sekundær-DNS gitt av din ISP."
			},{
				type: "name",
				title: "Koble til",
				content: "Klikk på denne knappen for å koble til Internett."
			},{
				type: "name",
				title: "Koble fra",
				content: "Klikk på denne knappen for å koble fra Internett."
			}/*,{
				type: "title",
				title: "Internett-tilkoblingstype: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Velg denne typen hvis din Internett-leverandør bruker 6RD-distribusjon og leverer IPv4-adresse og IPv6-adresseprefikser."
			},{
				type: "name",
				title: "Konfigurasjonstype",
				content: "Velg Auto eller Manuell for å konfigurere 6RD-kanalparametrer i henhold til din Internett-leverandør. Hvis standardparameterne nedenfor samsvarer med de som leveres av Internett-leverandøren, kan du velge Auto; ellers må du velge Manuell og angi parameterne som leveres av Internett-leverandøren."
			},{
				type: "name",
				title: "IPv4 maskelengde/6RD-prefiks/6RD-prefikslengde/Border reply IPv4-adresse",
				content: "Sjekk om de forhåndsinnstilte parameterne samsvarer med de som er levert av Internett-leverandøren. Du kan enten beholde standardinnstillingene eller manuelt angi parameterne som leveres av Internett-leverandøren."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Velg denne typen hvis din Internett-leverandør bruker DS-Lite-distribusjon og leverer et AFTR-domenenavn eller IPv6-adresse for konfigurasjon av IPv4-in-IPv6-tunnel i IPv6-nettverket for å kommunisere IPv4- eller IPv6-trafikk i sitt eget respektive nettverk."
			},{
				type: "name",
				title: "AFTR-navn",
				content: "AFTR er en forkortelse for Address Family Transition Router. I dette feltet angir du AFTR-domenenavnet eller IPv6-adressen som leveres av Internett-leverandøren."
			},{
				type: "name",
				title: "Sekundær forbindelse",
				content: "Velg den sekundære tilkoblingstypen som leveres av Internett-leverandøren.",
				children :[ 
				{
					type: "name",
					title: "Dynamisk IP",
					content: "Velg om din ISP gir Dynamisk IP som en sekundær tilkoblingstype og parameterne, IPv6-adresse, primær-DNS og/eller sekundær-DNS vil bli automatisk fastsatt av DHCPv6-serveren fra ISP-en."
				},
				{
					type: "name",
					title: "Statisk IP",
					content: "Velg om din ISP gir Statisk IP som sekundær tilkoblingstype, og skriv inn IPv6-adresse, standard systemport, primær-DNS og/eller sekundær DNS gitt av din ISP, før du konfigurerer MTU-størrelsen manuelt (hvis påkrevd) eller beholder standardverdien."
				},{
					type: "name",
					title: "PPPoE",
					content: "Velg om Internett-leverandøren leverer PPPoE som sekundær tilkoblingstype og angi brukernavn og passord som leveres av din Internett-leverandør. IPv6-adresse vil tilordnes automatisk når du klikker på Koble til."
				}]
			}*/,{
				type: "title",
				title: "Internett-tilkoblingstype: Gjennomgang  (bro)"
			},{
				type: "paragraph",
				content: "Velg denne typen hvis din Internett-leverandør bruker gjennomgang (bro) for nettverket. Ingen konfigurasjon er nødvendig for denne type tilkobling."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "I motsetning til gjennomgang (bro), krever de andre seks typene Internett-tilkobling IPv6-konfigurasjon."
			},{
				type: "name",
				title: "Tildelt type",
				content: "Velg type i henhold til din Internett-leverandør.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Automatisk tildele IP-adresser til klienter i LAN.",
					children: [{
						type: "name",
						title: "Adresseprefiks",
						content: "Skriv inn prefikset du fikk oppgitt av Internett-leverandøren."
					},{
						type: "name",
						title: "Utløsingstid",
						content: "Varighet i sekunder for den tildelte IP-adressens gyldighet. Enten beholde standardverdien på 86 400 sekunder eller endre den dersom Internett-leverandøren din krever dette."
					},{
						type: "name",
						title: "Adresse",
						content: "IP-adressen som tilordnes automatisk av DHCPv6-serveren til Internett-leverandøren."
					}]
				},{
					type: "name",
					title: "SLAAC+Tilstandsløs DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Adresseprefiks",
						content: "Skriv inn prefikset du fikk oppgitt av Internett-leverandøren."
					},{
						type: "name",
						title: "Adresse",
						content: "Det er IP-adressen tildelt av ISP-en."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Adresseprefiks",
						content: "Skriv inn prefikset du fikk oppgitt av Internett-leverandøren."
					},{
						type: "name",
						title: "Adresse",
						content: "Det er IP-adressen tildelt av ISP-en."
					}]
				}]
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC Clone",
			CONTENT: [{
				type: "name",
				title: "Bruk standard MAC-adresse",
				content: "IKKE endre ruterens standard MAC-adresse, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til MAC-adressen."
			},{
				type: "name",
				title: "Bruk datamaskinens gjeldende MAC-adresse",
				content: "Velg å kopiere gjeldende MAC-adresse til datamaskinen som er koblet til ruteren, i tilfelle Internett-leverandøren binder den tildelte IP-adressen til datamaskinens MAC-adresse."
			},{
				type: "name",
				title: "Bruk tilpasset MAC-adresse",
				content: "Angi ruterens MAC-adresse manuelt, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til den spesifikke MAC-adressen."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Tidsinnstillinger",
			CONTENT: [{
				type: "step",
				title: "Synkronisere tiden automatisk",
				content: [
					"1. I Angi klokkeslett-feltet velger du Hent automatisk fra Internett.",
					"2. Velg din lokale tidssone fra nedtrekkslisten.",
					"3. I NTP-server I-feltet skriver du inn IP-adressen eller domenenavnet til den ønskede NTP-serveren.",
					"4. I NTP-server II-feltet skriver du inn IP-adressen eller domenenavnet til den andre NTP-serveren. (valgfritt)",
					"5. Klikk på Hent.",
					"6. Klikk på Lagre."
				]
			},{
				type: "step",
				title: "Manuelt angi dato og klokkeslett.",
				content: [
					"1. Velg Manuelt i Angi klokkeslett-feltet.",
					"2. Angi dagens dato.",
					"3. Velg nåværende klokkeslett (i 24-timers format, f.eks. 16:00:00 for 04:00PM).",
					"4. Klikk på Lagre."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Sommertid",
			CONTENT: [{
				type: "step",
				title: "Konfigurere sommertid",
				content: [
					"1. Velg Aktiver sommertid.",
					"2. Velg riktig Startdato og klokkeslett for når sommertiden starter i din lokale tidssone.",
					"3. Velg riktig Startdato og klokkeslett for når sommertiden slutter i din lokale tidssone.",
					"4. Klikk på Lagre."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnostikk",
			CONTENT: [{
				type: "paragraph",
				content: "Ruteren gir Ping- og Traceroute-verktøy for å hjelpe deg med å løse problemer med nettverkstilkobling. Ping-verktøyet sender pakker til en mål-IP-adresse eller -domenenavn, og logger resultatene, som for eksempel antall pakker sendt og mottatt, samt tidsbruk. Traceroute-verktøyet sender pakker til en mål-IP-adresse eller -domenenavn og viser antall hopp og tidforløp for å nå målet."
			},{
				type: "paragraph",
				content: "Du kan pinge og traceroute en lokal enhet med IP-adresse eller et domenenavn, som for eksempel google.com, yahoo.com, osv."
			},{
				type: "step",
				title: "Diagnostisere ved hjelp av Ping",
				content: [
					"1. Skriv inn mål-IP-adressen eller -domenenavnet.",
					"2. Klikk Pil-ikonet for å åpne Avansert-menyen og angi Ping-antall, og Ping-pakkestørrelse. (valgfritt)",
					"3. Klikk på Start."
				]
			},{
				type: "step",
				title: "Diagnostisere ved hjelp av Traceroute",
				content: [
					"1. Skriv inn mål-IP-adressen eller -domenenavnet.",
					"2. Klikk Pil-ikonet for å åpne Avansert-menyen og angi antall hopp (som skal nås) i Traceroute Max TTL-feltet (Levetid). Standard er 20. (valgfritt)",
					"3. Klikk på Start."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Fastvareoppgradering",
			CONTENT: [{
				type: "paragraph",
				content: "Før du oppgraderer ruterens fastvare må du laste ned den nyeste fastvareoppdateringen fra <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK Support</a>-nettsiden til din datamaskin."
			},{
				type: "step",
				title: "VIKTIG: For å forhindre oppgraderingsfeil må du være oppmerksom på følgende:",
				content: [
					"Forsikre deg om at den nyeste fastvarefilen passer med maskinvareversjonen (som vist på fastvareoppgradering-siden).",
					"Sørg for at du har en stabil forbindelse mellom ruteren og datamaskinen. Det er ikke anbefalt å oppgradere fastvaren trådløst.",
					"For å forhindre tap av data må du passe på at alle USB-lagringsenheter som er koblet til ruteren fjernes før fastvareoppgraderingen.",
					"Sikkerhetskopier ruterkonfigurasjonen.",
					"IKKE slå av ruteren under fastvareoppgraderingen."
				]
			},{
				type: "step",
				title: "Oppgradere ruterens fastvare",
				content: [
					"1. Klikk på Bla gjennom.",
					"2. Finn og velg den nedlastede fastvarefilen.",
					"3. Klikk på Oppgrader."
				]
			},{
				type: "paragraph",
				content: "Oppgraderingsprosessen tar noen minutter å fullføre. Ikke slå av ruteren mens oppgraderingen pågår."
			}]
		},
		
		BACKUP: {	
			TITLE: "Sikkerhetskopier",
			CONTENT: [{
				type: "paragraph",
				content: "Det anbefales sterkt at du lager en sikkerhetskopi av dine gjeldende konfigurasjoner, i tilfelle det kreves en gjenoppretting for å gjenopprette systemet til en tidligere tilstand eller til fabrikkinnstillingene."
			},{
				type: "paragraph",
				content: "Klikk på Sikkerhetskopier for å lagre de gjeldende konfigurasjonene til datamaskinen. Sørg for å lagre sikkerhetskopifilen på et sikkert sted hvor du kan hente og gjenopprette ruteren fra på et senere tidspunkt om nødvendig."
			}]
		},
		
		RESTORE: {
			TITLE: "Gjenopprett",
			CONTENT: [{
				type: "step",
				title: "Gjenopprette fra en sikkerhetskopi",
				content: [
					"1. Klikk på Bla gjennom.",
					"2. Finn og velg sikkerhetskopifilen.",
					"3. Klikk på Gjenopprett."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Tilbakestille til fabrikkstandard",
			CONTENT: [{
				type: "paragraph",
				content: "Klikk på Gjenopprett til fabrikkinnstillinger for å gjenopprette ruteren til fabrikkinnstillingene."
			},{
				type: "step",
				title: "Merk",
				content: [
					"1. Fabrikkgjenoppretting vil fjerne alle innstillingene du har konfigurert for ruteren. For å logge tilbake på ruterens administreringsside, bruk standardkoden admin som både brukernavn og passord.",
					"2. IKKE slå av ruteren under sikkerhetskopiering eller gjenoppretting."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Kontobehandling",
			CONTENT: [{
				type: "paragraph",
				content: "Denne siden lar deg endre brukernavn og/eller passord for pålogging, samt å angi en e-postadresse for passordgjenoppretting."
			},{
				type: "name",
				title: "Gammelt brukernavn",
				content: "Skriv inn ditt nåværende brukernavn."
			},{
				type: "name",
				title: "Gammelt passord",
				content: "Skriv inn ditt nåværende passord."
			},{
				type: "name",
				title: "Nytt brukernavn",
				content: "Skriv inn ditt nye brukernavn."
			},{
				type: "name",
				title: "Nytt passord",
				content: "Skriv inn ditt nye passord."
			},{
				type: "name",
				title: "Bekreft nytt passord",
				content: "Skriv inn ditt nye passord på nytt."
			},{
				type: "note",
				title: "Merk",
				content: "Hvis du bestemmer deg for å endre gjeldende brukernavn og passord for innlogging til ruteren, må du sørge for å skrive ned den nye påloggingsinformasjonen på et sikkert sted."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Gjenoppretting av passord",
			CONTENT: [{
				type: "name",
				title: "Aktiver gjenoppretting av passord",
				content: "Det er sterkt anbefalt at du aktiverer passordgjenoppretting, da det kan hjelpe deg å tilbakestille brukernavnet og passordet ditt via e-post."
			},{
				type: "name",
				title: "Fra",
				content: "Skriv inn en gyldig e-postadresse som skal brukes for utgående e-post."
			},{
				type: "name",
				title: "Til",
				content: "Skriv inn en gyldig e-postadresse som skal brukes for inngående e-post."
			},{
				type: "name",
				title: "SMTP-server",
				content: "Skriv inn SMTP-serveradressen som ruteren bruker for å sende verifiseringskoden via e-post."
			},{
				type: "name",
				title: "Aktiver godkjenning",
				content: "Velg Aktiver godkjenning hvis den utgående e-postserveren krever godkjenning for å sende e-post, og angi brukernavn og passord i feltene. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Lokal behandling",
			CONTENT: [{
				type: "paragraph",
				content: "Denne delen lar deg begrense antall klientenheter i lokalnettet som har tilgang til ruteren med MAC-adressebasert godkjenning."
			},{
				type: "name",
				title: "Tilgang for alle LAN-tilkoblede enheter",
				content: "Skru på for å aktivere behandling for alle enhetene som er koblet til LAN eller la stå av for å aktivere behandling for en bestemt enhet."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for enheten med begrenset tilgang."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser beskrivelsen for enheten med begrenset tilgang."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status for enhet med begrenset tilgang (aktivert eller deaktivert)."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å Endre eller Slette den tilhørende oppføringen fra listen."
			},{
				type: "step",
				title: "Legge til en klientenhet i listen",
				content: [
					"1. Klikk på Legg til.",
					"2. Klikk Vis eksisterende enheter for å velge en eksisterende enhet, eller angi MAC-adressen til enheten i MAC-adressefeltet.",
					"3. Skriv inn en beskrivelse for denne enheten.",
					"4. Velg Aktiver.",
					"5. Klikk OK."
				]
			},{
				type: "step",
				title: "For å endre eller slette en enhet i listen",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for regelen som du ønsker å endre eller slette."
			},{
				type: "step",
				title: "Slette flere enheter",
				content: "Velg alle enhetene som du ønsker å slette, og klikk på Slett over tabellen."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Ekstern behandling",
			CONTENT: [{
				type: "paragraph",
				content: "Eksternbehandling-funksjonen lar deg få tilgang til og konfigurere ruteren eksternt fra Internett."
			},{
				type: "name",
				title: "Deaktiver ekstern behandling",
				content: "Velges for å deaktivere eksternbehandling."
			},{
				type: "name",
				title: "Aktiver ekstern behandling for alle enheter",
				content: "Velg dette alternativet for å aktivere eksternbehandling for alle IP-adresser. Hvis dette er valgt, angir du portfeltet for webbehandlingstjenesten."
			},{
				type: "name",
				title: "Aktiver ekstern behandling for spesifiserte enheter",
				content: "Velg dette alternativet for å aktivere eksternbehandling for bestemte IP-adresser. Hvis dette er valgt, angir du en port for webbehandlingstjenesten og IP-adresse for eksternbehandling."
			},{
				type: "name",
				title: "Webbehandlingport",
				content: "Angi portnummeret, mellom 1024 og 65535, som brukes for å få tilgang til ruterens web webbehandlingsgrensesnitt med større sikkerhet. Normalt bruker nettlesere den standard HTTP-tjenesteporten 80. Standard og felles serviceport er 8080, som er en alternativ tjenesteport for HTTP."
			},{
				type: "name",
				title: "IP-adresse for ekstern behandling",
				content: "Angi en gyldig IP-adresse for å få tilgang til ruteren."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Systemlogg",
			CONTENT: [{
				type: "paragraph",
				content: "Systemloggsiden viser en liste over de siste aktiviteter (hendelser) i ruteren. Du kan definere type og/eller nivå av logger du vil skal vises. Denne siden har også en e-postfunksjon som du kan konfigurere til å automatisk sende loggfilene til en bestemt e-postadresse, eller eksportere loggfilene til en datamaskin."
			},{
				type: "name",
				title: "Type",
				content: "Velg type systemlogg som skal vises."
			},{
				type: "name",
				title: "Nivå",
				content: "Velg nivå av systemlogg som skal vises."
			},{
				type: "name",
				title: "Oppdater",
				content: "Klikk dette ikonet for å oppdatere systemloggen."
			},{
				type: "name",
				title: "Slett alle",
				content: "Klikk dette ikonet for å slette alle systemlogger."
			},{
				type: "name",
				title: "Lagre logg",
				content: "Klikk på denne knappen for å laste ned alle systemloggfiler til den lokale datamaskinen."
			},{
				type: "name",
				title: "E-postinnstillinger",
				content: "Klikk på denne knappen for å konfigurere e-postinnstillingene for systemlogger."
			},{
				type: "step",
				title: "Konfigurere e-postinnstillingene for systemlogger",
				content: [
					"1. Klikk på E-postinnstillinger.",
					"2. Fra – Skriv inn en gyldig e-postadresse for utgående e-post.",
					"3. Til – Skriv inn en gyldig e-postadresse for inngående e-post.",
					"4. SMTP-server – Skriv inn SMTP-serveradressen som ruteren bruker for å sende systemlogger via e-post.",
					{
						content: "5. Aktiver Godkjenning – Velg dette alternativet dersom SMTP-serveren krever godkjenning for å sende e-post.",
						children: [{
							type: "name",
							title: "Brukernavn",
							content: "Angi brukernavnet for SMTP-serveren. Dette feltet skiller mellom store og små bokstaver."
						},{
							type: "name",
							title: "Passord",
							content: "Angi passordet for SMTP-serveren. Dette feltet skiller også mellom små og store bokstaver."
						}]
					},{
						content: "6. Aktiver automatisk e-post – Velg dette alternativet for å angi hvilken tid på døgnet systemloggen skal sendes automatisk.",
						children: [{
							type: "paragraph",
							content: "For å sende systemloggen hver dag på et bestemt tidspunkt, angir du Timer (TT) og Minutter (MM) i 24-timers format. 4PM blir f.eks. 16:00."
						},{
							type: "paragraph",
							content: "For å sende systemloggen på et bestemt time- eller tidsintervall, angir du antall timer."
						}]
					},
					"7. Klikk på Lagre."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Traffikkstatistikk",
			CONTENT: [{
				type: "paragraph",
				content: "Trafikkstatistikk viser nettverkstrafikk for sendte og mottatte pakker på LAN, WAN og WLAN."
			},{
				type: "name",
				title: "Traffikkstatistikk",
				content: "Skru På for å vise statistiske opplysninger."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Liste over trafikkstatistikk",
			CONTENT: [{
				type: "name",
				title: "IP-addresse/MAC-addresse",
				content: "Viser IP- og MAC-adressen til den tilknyttede klientenheten."
			},{
				type: "name",
				title: "Totalt antall pakker",
				content: "Viser det totale antall pakker som har blitt sendt og mottatt av klientenheten siden begynnelsen av økten, eller siden siste nullstilling av telleren."
			},{
				type: "name",
				title: "Totalt antall bytes",
				content: "Viser det totale antall bytes som har blitt sendt og mottatt av klientenheten siden begynnelsen av økten, eller siden siste nullstilling av telleren."
			},{
				type: "name",
				title: "Gjeldende pakker",
				content: "Viser nåværende antall pakker som har blitt sendt og mottatt for et bestemt tidsintervall."
			},{
				type: "name",
				title: "Gjeldende bytes",
				content: "Viser nåværende antall bytes som har blitt sendt og mottatt for et bestemt tidsintervall."
			},{
				type: "name",
				title: "Endre",  
				content: "Viser alternativer for å Nullstille eller slette den tilhørende oppføringen fra listen."
			},{
				type: "name",
				title: "Oppdater",
				content: "Klikk for å oppdatere statistikkinformasjonen på siden."
			},{
				type: "name",
				title: "Tilbakestill alle",
				content: "Klikk for å nullstille alle de statistiske verdiene i listen."
			},{
				type: "name",
				title: "Slett alle",
				content: "Klikk for å slette statistikkinformasjonen i listen."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "2,4GHz/5GHz Trådløst nettverk",
			CONTENT: [{
				type: "name",
				title: "Signalintervall",
				content: "Angi en verdi mellom 40 og 1000 i millisekunder for å bestemme varigheten mellom beacon-pakker som sendes ut av ruteren for å synkronisere trådløst nettverk. Standardverdien er 100 millisekunder."
			},{
				type: "name",
				title: "RTS-terskel",
				content: "Angi en verdi mellom 1 og 2346 for å bestemme pakkestørrelse på dataoverføring gjennom ruteren. Standard størrelse på RTS-terskel (Request to Send) er 2346. Dersom pakkestørrelsen er større enn den forhåndsinnstilte terskelen, sender ruteren RTS-rammer til en bestemt mottakerstasjon og forhandler sending av en dataramme, ellers vil pakken sendes umiddelbart."
			},{
				type: "name",
				title: "DTIM-intervall",
				content: "Denne verdien bestemmer intervallet for Delivery Traffic Indication Message (DTIM). Angi en verdi mellom 1 og 15 i millisekunder. Standardverdien, 1, indikerer at DTIM-intervallet er det samme som Beacon-intervall."
			},{
				type: "name",
				title: "Oppdateringsperiode for gruppenøkkel",
				content: "Skriv inn antall sekunder (minimum 30) for å kontrollere tidsintervallet for automatisk fornyelse av krypteringsnøkkelen. Standardverdien er 0, som indikerer at ingen nøkkelfornyelse eksisterer."
			},{
				type: "name",
				title: "Flerbruker-MIMO",
				content: "Teknologien lar ruteren etablere en punkt-til-punkt-tilkobling med opptil tre enheter samtidig. Det forbedrer hastigheten betydelig og reduserer ventetiden for enheten sammenlignet med tradisjonell konstruksjon, som lar ruteren betjene flere Wi-Fi-klienter samtidig uten reduksjon av flaskehalsen på båndbredden."
			},{
				type: "name",
				title: "WMM-funksjon",
				content: "WMM-funksjonen garanterer at pakker med høyt prioriterte meldinger sendes fortrinnsvis. Den er aktivert som standard og anbefales."
			},{
				type: "name",
				title: "Kort GI-funksjon",
				content: "Denne funksjonen er aktivert som standard og anbefales for å øke datakapasiteten ved å redusere Guard Intervall-tid (GI)."
			},{
				type: "name",
				title: "AP-isolasjonsfunksjon",
				content: "Hvis du ønsker å begrense alle trådløse enheter som er koblet til nettverket fra å kommunisere med hverandre, men likevel la dem få tilgang til Internett, merker du av for Aktiver AP-isolering."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "2,4 GHz/5 GHz WDS",
			CONTENT: [{
				type: "name",
				title: "Aktiver WDS-overføring",
				content: "Aktiver brofunksjonen WDS (Wireless Distribution System) for å tillate ruteren å bygge bro med et annet tilgangspunkt (AP) i et trådløst lokalnett (WLAN). Hvis denne funksjonen er aktivert, konfigurere det følgende:",
			},{
				type: "name",
				title: "SSID (til overføring)",
				content: "Skriv inn SSID for det trådløse tilgangspunktet (WAP) som ruteren skal kobles til som en klient, eller bruk Oversikt-funksjonen for å finne alle tilgjengelige nettverk."
			},{
				type: "name",
				title: "Spørreundersøkelse",
				content: "Klikk på denne knappen for å skanne og vise SSID, BSSID, signalstyrke, kanal og sikkerhetsinformasjon for alle tilgjengelige trådløse nettverk innenfor rekkevidde. Når du har valgt et nettverk, SSID, MAC-adresse, og vil Sikkerhet fylles inn automatisk."
			},{
				type: "name",
				title: "MAC-adresse (til overføring)",
				content: "Angi MAC-adressen (BSSID) med 12 heksadesimale tegn (0–9, a–f, A–F), atskilt med bindestrek, for det trådløse tilgangspunktet som ruteren skal kobles til som kunde. Hvis du velger ønsket AP gjennom Oversikt-funksjonen, vil MAC-adressefeltet fylles inn automatisk."
			},{
				type: "name",
				title: "WDS-modus",
				content: "Velg WDS-modus; Auto, WDS1 eller WDS2."
			},{
				type: "name",
				title: "Sikkerhet",
				content: "Velg riktig sikkerhetstype for det valgte tilgangspunktet; No, WPA-PSK/WPA2-PSK eller WEP. Hvis du velger ønsket AP gjennom Oversikt-funksjonen, vil Sikkehet-feltet fylles inn automatisk.",
				children: [{
					type: "name",
					title: "Passord",
					content: "Dette alternativet er tilgjengelig når sikkerhetstypen er WPA-PSK/WPA2-PSK eller WEP. Angi sikkerhetspassordet for det valgte tilgangspunktet."
				},{
					type: "name",
					title: "Forf. Type",
					content: "Dette alternativet er kun tilgjengelig når sikkerhetstypen er WEP (Wired Equivalent Privacy). Velg den aktuelle godkjenningstypen (Auto, Åpent system eller Delt nøkkel) for det valgte tilgangspunktet."
				},{
					type: "name",
					title: "WEP-nøkkel-format",
					content: "Dette alternativet er kun tilgjengelig når sikkerhetstypen er WEP. Velg nøkkelformat (ASCII eller Heksadesimal) for det valgte tilgangspunktet."
				}]
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Velg avmerkingsboksen Aktiver WPS og klikk Lagre for å aktivere WPS-funksjonen (Wi-Fi Protected Setup), som lar deg enkelt konfigurere og koble til WPS-aktiverte enheter ved å trykke på WPS-knappen."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Velg avkrysningsboksen Aktiver NAT og klikk Lagre for å aktivere NAT-funksjonen (Network Address Translation)."
			},{
				type: "note",
				title: "Merk",
				content: "Når NAT er deaktivert, vil konfigurasjoner i NAT-videresending ikke tre i kraft."
			}/*,{
				type: "name",
				title: "NAT Boost",
				content: "Merk av for Aktiver NAT Boost og klikk på Lagre for å sikre at ruteren har optimal gjennomstrømming."
			},{
				type: "note",
				title: "Merk",
				content: "Når NAT Boost er aktivert, vil QoS- og Trafikkstatistikk deaktiveres automatisk."
			}*/,{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Nivåinnstillinger for DoS-beskyttelse",
			CONTENT: [{
				type: "paragraph",
				content: "DoS-beskyttelsesnivå beskytter ruteren fra angrep av typen ICMP-FLOOD, UDP-FLOOD, og TCP-FLOOD."
			},{
				type: "name",
				title: "Nivå for ICMP-FLOOD-pakker",
				content: "Angi en verdi mellom 5 og 7200 ICMP-pakker for å umiddelbart utløse ICMP-overflytvern når antall pakker overstiger den forhåndskonfigurerte terskelverdien."
			},{
				type: "name",
				title: "Nivå for UPD-FLOOD-pakker",
				content: "Angi en verdi mellom 5 og 7200 UDP-pakker for å umiddelbart utløse UDP-FLOOD-beskyttelsen når antall pakker overstiger den konfigurerte terskelverdien."
			},{
				type: "name",
				title: "Nivå for TCP-FLOOD-pakker",
				content: "Angi en verdi mellom 5 og 7200 TCP-SYN-pakker for å umiddelbart utløse TCP-SYN-FLOOD-beskyttelsen når antall pakker overstiger den forhåndskonfigurerte terskelverdien."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Dupleks",
			CONTENT: [{
				type: "name",
				title: "Dupleks",
				content: "Velg deplekstype fra nedtrekkslisten."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED",
			CONTENT: [{
				type: "name",
				title: "Aktiver nattmodus",
				content: "Velg denne avmerkingsboksen for å slå av LED-lampene i nattmodus, uten at det påvirker ruterens ytelse."
			},{
				type: "name",
				title: "Periode for nattmodus",
				content: "Angi en tidsperiode for når nattmodus skal være aktiv."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Med OpenVPN kan du bruke Internett til å få sikker tilgang på nettverket ditt når du ikke er hjemme. For å bruke VPN-tjenesten, må du konfigurere dynamisk DNS-tjeneste (anbefales) eller tilordne en statisk IP-adresse for ruterens WAN-port. Systemtiden din bør være synkronisert med Internett."
			},{
				type: "name",
				title: "Aktiver DHCP-server",
				content: "Velg for å aktivere OpenVPN-server."
			},{
				type: "name",
				title: "Tjenestetype",
				content: "Velg kommunikasjonsprotokoll for OpenVPN-serveren: UDP eller TCP."
			},{
				type: "name",
				title: "Tjenesteport",
				content: "Angi et kommunikasjons-portnummer mellom 1024 og 65535. Standard og felles tjenesteport er 1194."
			},{
 				type: "name",
				title: " VPN Delnett/Nettmaske",
				content: "Angi utvalget IP-adresser som kan leies ut til kundene av OpenVPN-serveren."
			},{
				type: "name",
				title: "Klienttilgang",
				content: "Velg tilgangstype for OpenVPN-klienten.",
				children: [{
				type: "name",
				title: "Kun hjemmenettverk",
					content: "Kunder har bare tilgang til hjemmenettverket. Kundens standardrute vil ikke endres."
			},{
				type: "name",
				title: "Internett og hjemmenettverk",
					content: "Kunder har tilgang på hjemmenettverket, og Internett-sider eller tjenester med geografisk begrensing når du er utenlands. Kundens standardrute vil endres."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Sertifikat",
			CONTENT: [{
				type: "paragraph",
				content: "Bruk sertifikatet for informasjonen og identiteten av VPN-forbindelsen for eksterne kunder."
			},{
				type: "name",
				title: "Generer",
				content: "Klikk for å generere et nytt sertifikat."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Konfigurasjonsfil",
			CONTENT: [{
				type: "paragraph",
				content: "Eksterne kunder vil bruke konfigurasjonsfilen til å få tilgang til ruteren din."
			},{
				type: "name",
				title: "Eksporter",
				content: "Klikk for å lagre OpenVPN-konfigurasjonsfilen."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "Installasjonsveivisning for VPN-klient",
			CONTENT: [{
				type: "step",
				title: "For å koble kundeenhetene dine til OpenVPN-serveren:",
				content:[{
					type: "paragraph",
					content: "Før du konfigurerer OpenVPN-serveren, må du konfigurere dynamisk DNS-tjeneste (anbefales) eller tilordne en statisk IP-adresse for WAN-porten. Forsikre deg om at din eksterne port med NAT-innstillinger ikke er tjenesteporten, og at systemtiden din er synkronisert med Internett."
				},
					"1. Velg Aktiver VPN-server",
					"2. Konfigurer serverparametere for OpenVPN (tjenestetype, tjenesteport og kundetilgang og VPN Delnett/Nettmaske) og klikk så på Lagre.",
					"3. Klikk Eksporter for å lagre konfigurasjonsfilen.",
					"4. Last ned og installer OpenVPN-kundeverktøyet på kundeenhetene dine fra <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> De offisielle plattformene som støttes er blant annet Windows, Mac OSX og Linux.",
					"5. Start OpenVPN-kundeverktøyet og legg til en ny VPN-tilkobling ved hjelp av den lagrede konfigurasjonsfilen for å koble kundeenheten til VPN-serveren."
				]},{
					type: "note",
					title: "Merk",
					content: "Hvis du vil vite mer om OpenVPN-klienter kan du besøke <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Med PPTP VPN kan du bruke Internett til å få enkel og rask tilgang på nettverket ditt når du ikke er hjemme. Det kan bli forhindret av noen ISP-er. For å bruke VPN-tjenesten, må du konfigurere dynamisk DNS-tjeneste (anbefales) eller tilordne en statisk IP-adresse for ruterens WAN-port. Systemtiden din bør være synkronisert med Internett."
			},{
				type: "name",
				title: "Aktiver DHCP-server",
				content: "Velg for å aktivere PPTP VPN-serveren."
			},{
				type: "name",
				title: "IP-adresse for klient",
				content: "Skriv inn utvalget av IP-adresser (opptil 10 klienter) som kan leies ut til kundene av PPTP VPN-serveren."
			},{
 				type: "name",
				title: "Tillatt Samba (Nettverksplass) tilgang",
				content: "Velg for å gi VPN-kunden din tilgang til din lokale Samba-server."
			},{
				type: "name",
				title: "Tillatt NetBIOS-gjennomgang",
				content: "Velg for å gi VPN-kunden din tilgang til din lokale Samba-server ved å bruke et NetBIOS-navn."
			},{
				type: "name",
				title: "Tillatt ukrypterte tilkoblinger",
				content: "Velg for å tillate ukrypterte tilkoblinger på VPN-serveren din."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Kontoliste",
			CONTENT: [{
				type: "paragraph",
				content: "Denne tabellen viser kontoene som kan brukes for å koble til PPTP VPN-serveren av de eksterne kundene."
			},{
				type: "step",
				title: "For å legge til en PPTP VPN-konto",
				content: [
					"1. Klikk på Legg til.",
					"2. Skriv inn brukernavn og passord for å godkjenne kunder på PPTP VPN-serveren.",
					"3. Klikk på OK."
				]
			},/*{
				type: "name",
				title: "Brukernavn og passord",
				content: "Skriv inn brukernavn og passord for å godkjenne klienter på PPTP VPN-serveren."
			},{
				type: "name",
				title: "endre \t",
				content: "Viser alternativer for å endre eller slette korresponderende konto."
			}*/
			{
				type: "step",
				title: "Endre eller slette en eksisterende kunde",
				content: "I tabellen klikker du på Rediger-ikonet eller papirkurven til den korresponderende kontoen som du ønsker å endre eller slette."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "Installasjonsveivisning for VPN-klient",
			CONTENT: [{
				type: "step",
				title: "For å koble kundeenhetene dine til PPTP VPN-serveren:",
				content:[{
					type: "paragraph",
					content: "Før du konfigurerer PPTP VPN-serveren, må du konfigurere dynamisk DNS-tjeneste (anbefales) eller tilordne en statisk IP-adresse for WAN-porten. Forsikre deg om at din eksterne port med NAT-innstillinger ikke er 1732 og at systemtiden din er synkronisert med Internett."
				},
					"1. Velg Aktiver VPN-server",
					"2. Konfigurer PPTP VPN-serverparametere og klikk på Save (Lagre).",
					"3. Opprette en PPTP VPN-tilkobling på kundeenhetene dine. De offisielle plattformene som støttes er blant annet Windows, Mac OSX, Linux, iOS og Android.",
					"4. Start PPTP VPN-programmet, legg til en ny tilkobling og skriv domenenavnet på den registrerte DDNS-tjenesten eller den statiske IP-adressen som er tilordnet WAN-porten, for å koble kundeenheten til PPTP VPN-serveren.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN-tilkoblinger",
			CONTENT: [{
				type: "paragraph",
				content: "Denne siden viser klientene som er koblet til OpenVPN og PPTP-VPN-servere som ruteren er vert for."
			},{
				type: "paragraph",
				content: "Klikk på Minus-ikonet for å koble fra den korresponderende klienten."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internett",
			CONTENT: [{
				type: "name",
				title: "Internett-status",
				content: "Viser gjeldende status for Internett-tilkobling til ruteren."
			},{
				type: "name",
				title: "Tilkoblingstype",
				content: "Viser type Internett-tilkobling."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser den gjeldende Internett-IP-adressen som er tilordnet ruteren."
			},{
				type: "name",
				title: "Sekundær tilkobling/IP-adresse",
				content: "Viser sekundærtilkoblingstype og IP-adresse."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Ruter",
			CONTENT: [{
				type: "title",
				title: "2,4GHz/5GHz Trådløst nettverk"
			},{
				type: "name",
				title: "SSID",
				content: "Viser det gjeldende trådløse nettverksnavnet for 2,4GHz/5GHz-båndfrekvensen."
			},{
				type: "name",
				title: "Kanal",
				content: "Viser kanalen som sender de trådløse 2,4GHz/5GHz-nettverksendingene."
			},{
				type: "name",
				title: "MAC",
				content: "Viser den gjeldende MAC-adressen til det trådløse 2,4GHz/5GHz-nettverket."
			},{
				type: "title",
				title: "Gjestenettverk 2,4 GHz/5 GHz"
			},{
				type: "name",
				title: "Status",
				content: "Viser hvorvidt trådløs gjestenettverk på 2,4/5 GHz er på (aktivert) eller av (deaktivert)."
			},{
				type: "name",
				title: "SSID",
				content: "Viser navnet på det trådløse nettverksnavnet (SSID) på gjestenettverket."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Kablede/trådløse klienter",
			CONTENT: [{
				type: "name",
				title: "Navn",
				content: "Viser navn på klienten som er koblet til ruteren."
			},{
				type: "name",
				title: "IP-adresse",
				content: "Viser den tildelte IP-adressen for klienten."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for den tilkoblede enheten."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Skriver",
			CONTENT: [{
				type: "name",
				title: "Navn",
				content: "Viser navn på skriveren som er koblet til ruteren via en USB-port."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB-enhet",
			CONTENT: [{
				type: "name",
				title: "USB-enhet",
				content: "Viser navn på USB-enheten som er koblet til ruteren."
			},{
				type: "name",
				title: "Sum",
				content: "Viser total lagringskapasitet på den tilkoblede USB-lagringsenheten."
			},{
				type: "name",
				title: "Tilgjengelig",
				content: "Viser tilgjengelig lagringskapasitet på den tilkoblede USB-lagringsenheten."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internett",
			CONTENT: [{
				type: "name",
				title: "Automatisk gjenkjenning",
				content: "Klikk på denne knappen for å få ruteren til å automatisk oppdage din nåværende tilkoblingstype."
			},{
				type: "note",
				title: "Merk",
				content: "Hvis du ikke er sikker på hvilken type Internett-tilkobling du har, kan du bruke automatisk gjenkjenning eller kontakte din internettleverandør (ISP) for å få hjelp."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: Statisk IP",
			},{
				type: "name",
				title: "IP-adresse/nettverksmaske/standard gateway/Primær DNS/Sekundær DNS",
				content: "Skriv inn informasjonen du fikk oppgitt av Internett-leverandøren."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: Dynamisk IP",
			},{
				type: "name",
				title: "IKKE klone MAC-adressen/gjeldende MAC-adresse for datamaskinen",
				content: "Velg om du vil klone MAC-adressen eller ikke, i henhold til din Internett-leverandør."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: PPPoE",
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn brukernavnet og passordet du fikk oppgitt av Internett-leverandøren. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "title",
				title: "Internett-tilkoblingstype: L2TP/PPTP",
			},{
				type: "name",
				title: "Brukernavn/passord",
				content: "Skriv inn brukernavnet og passordet du fikk oppgitt av Internett-leverandøren. Disse feltene skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Sekundær tilkobling (Dynamisk IP eller Statisk IP)",
				children: [{
					type: "name",
					title: "Dynamisk IP",
					content: "Velg om IP-adressen og nettverksmasken er automatisk tildelt av Internett-leverandøren."
				},{
					type: "name",
					title: "Statisk IP",
					content: "Velg om IP-adressen, nettverksmasken, gateway og DNS-adresser er levert av Internett-leverandøren, og skriv inn disse opplysningene i de riktige feltene."
				}]
			},{
				type: "name",
				title: "IP/Domenenavn for VPN-server",
				content: "Skriv inn VPN-serverens IP-adresse eller domenenavn fra Internett-leverandøren."
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "Trådløsinnstillinger",
			CONTENT: [{
				type: "name",
				title: "Aktiver trådløs radio",
				content: "Velg denne avmerkingsboksen for å aktivere den trådløse 2,4GHz/5GHz-radiofrekvensen."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard nettverksnavn (SSID) stå som det er, eller angi et nytt navn (på opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på 2,4GHz/5GHz-nettverket (SSID) fra Wi-Fi-nettverkslisten."
			},{
				type: "name",
				title: "Passord",
				content: "Skriv inn et trådløst passord med riktig sikkerhetstype i dette feltet (skiller mellom store og små bokstaver)."
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Enhetsinnstillinger",
			CONTENT: [{
				type: "paragraph",
				content: "Enhetsinnstillinger viser relatert informasjon om eventuelle USB-lagringsenheter som er tilkoblet via USB-porten."
			},{
				type: "name",
				title: "Skann",
				content: "Vanligvis oppdager ruteren automatisk enhver nylig tilkoblet enhet. Hvis det ikke er tilfelle, klikker du på denne knappen for å søke etter eventuelle nye tilkoblede enheter og oppdaterer siden med den nye informasjonen."
			},{
				type: "name",
				title: "Volum",
				content: "Viser navnet på USB-enheten."
			},{
				type: "name",
				title: "Kapasitet",
				content: "Viser total lagringskapasitet på USB-lagringsenheten."
			},{
				type: "name",
				title: "Ledig plass",
				content: "Viser nåværende ledig lagringsplass."
			},{
				type: "name",
				title: "Trygg fjerning",
				content: "Klikk på denne knappen for å trygt frakoble USB-lagringsenheten før du fysisk kobler den fra ruteren.",
				children: [{
					type: "paragraph",
					content: "Vær oppmerksom på at Trygg fjerning-knappen vises bare når en USB-lagringsenhet er koblet til ruteren, og du vil ikke være i stand til å frakoble USB-enheten mens enheten er opptatt."
				}]
			},{
				type: "name",
				title: "Status",
				content: "Denne avmerkingsboksen vises bare når en USB-lagringsenhet er koblet til ruteren. Velg for å aktivere fildeling av USB-enheten."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Innstillinger for deling",
			CONTENT: [{
				type: "name",
				title: "Nettverk/media-servernavn",
				content: "Viser navnet som er brukt for å få tilgang til den tilkoblede USB-lagringsenheten. Navnet må bestå av alfanumeriske tegn, understreker eller bindestreker, og være 4–15 tegn langt."
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Mappedeling",
			CONTENT: [{
				type: "name",
				title: "Del alle",
				content: "Slå på for å dele alle filer og mapper eller la stå som av for å kun dele de spesifiserte mappene."
			},{
				type: "name",
				title: "Aktiver godkjenning",
				content: "Det er sterkt anbefalt å aktivere godkjenning slik at brukerne må angi gyldig brukernavn og passord for å få tilgang til delingsmapper."
			},{
				type: "name",
				title: "Mappenavn",
				content: "Viser navnet på den delte mappen."
			},{
				type: "name",
				title: "Mappebane",
				content: "Viser banen til den delte mappen."
			},{
				type: "name",
				title: "Mediadeling",
				content: "Angir om den delte mappen kan dele medier eller ikke."
			},{
				type: "name",
				title: "Volumnavn",
				content: "Viser navnet på den delte enheten."
			},{
				type: "name",
				title: "Status",
				content: "Viser statusen til den delte mappen med lyspære-indikator."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den korresponderende delte mappen."
			},{
				type: "name",
				title: "Legg til",
				content: "Klikk på denne knappen for å opprette en ny oppføring."
			},{
				type: "name",
				title: "Slett",
				content: "Klikk på denne knappen for å slette valgte oppføring fra tabellen."
			},{
				type: "name",
				title: "Bla gjennom",
				content: "Klikk for å søke etter en delt mappe."
			},{
				type: "name",
				title: "Tillat gjester å bruke nettverket",
				content: "Velg å gi klienter på gjestenettverket tilgang til de delte mappene."
			},{
				type: "name",
				title: "Aktiver godkjenning",
				content: "Velg å kreve at brukerne har tilgang til de delte mappene med et gyldig brukernavn og passord."
			},{
				type: "name",
				title: "Aktiver skrivetilgang",
				content: "Velg å tillate brukere å gjøre endringer i mappens innhold."
			},{
				type: "name",
				title: "Aktiver mediadeling",
				content: "Velges for å aktivere mediedeling."
			},{
				type: "name",
				title:"Oppdater",
				content: "Klikk for å oppdatere mappedeling-listen."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Utskriftserver",
			CONTENT: [{
				type: "name",
				title: "Utskriftserver",
				content: "Skru På for å aktivere utskriftsserverfunksjonen."
			},{
				type: "name",
				title: "Skrivernavn",
				content: "Viser navnet på skriveren som er koblet til ruteren."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Sperrefunksjon",
			CONTENT: [{
				type: "paragraph",
				content: "Med Sperrefunksjon kan du blokkere upassende, eksplisitte og ondsinnede nettsteder, begrense tilgangen til bestemte tider på dagen (for eksempel Facebook eller YouTube i løpet av leksetid), og samtidig beskytte hver enhet på hjemmenettverket mot skadelig programvare og phishing gjennom ett sentralt kontrollpunkt."
			},{
				type: "name",
				title: "Sperrefunksjon",
				content: "Skru På for å aktivere Sperrefunksjoner. Denne funksjonen er deaktivert som standard."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Enheter med sperrefunksjoner",
			CONTENT: [{
				type: "paragraph",
				content: "Viser listen over enheter under sperrefunksjoner."
			},{
				type: "name",
				title: "Enhetsnavn",
				content: "Viser navnet på alle tilkoblede klientenheter som har sperrefunksjoner aktivert."
			},{
				type: "name",
				title: "MAC-adresse",
				content: "Viser MAC-adressen for alle tilkoblede klientenheter som har sperrefunksjoner aktivert."
			},{
				type: "name",
				title: "Internett-tilgangstid",
				content: "Viser de restrikterte tidsrommene. Tidsplanen er basert på ruterens systemtid, som kan bli bestemt i \"Systemverktøy -> Tidsinnstillinger\"."
			},{
				type: "name",
				title: "Beskrivelse",
				content: "Viser en kort beskrivelse for den tilkoblede enheten. Dette er en valgfri innstilling."
			},{
				type: "name",
				title: "Status",
				content: "Viser gjeldende status (aktivert eller deaktivert) for sperrefunksjonene på den korresponderende enheten."
			},{
				type: "name",
				title: "Endre",
				content: "Viser alternativer for å endre eller slette den korresponderende enheten."
			},{
				type: "step",
				title: "For å begrense en ny klient-enhet",
				content:[
					"1. Klikk på Legg til.",
					"2. Klikk Vis eksisterende enheter og velg en tilkoblet enhet fra listen med tilgangsenheter; eller skriv inn enhetsnavnet og MAC-adressen manuelt for å legge til en frakoblet enhet.",
					"3. Klikk på ikonet for Internett-tilkoblingstid for å angi en tidsperiode for begrensningen.",
					"4. Skriv inn en kort beskrivelse i Beskrivelse-feltet. (valgfritt)",
					"5. Velg Aktiver.",
					"6. Klikk på OK for å lagre oppføringen."
				]
			},{
				type: "paragraph",
				content: "For å endre eller slette en sperrefunksjonoppføring, klikker du på Rediger-ikonet for å redigere informasjonen eller papirkurven for å fjerne oppføringen."
			},{
				type: "paragraph",
				content: "Vil slette flere oppføringer, velger du oppføringene og klikker på Slett over tabellen."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Innholdsbegrensning",
			CONTENT: [{
				type: "name",
				title: "Inkluder i svarteliste",
				content: "Inneholder søkeord som skal brukes til å blokkere all tilgang til nettsteder fra klientenheter som er angitt i innholdsbegrensnings-listen.",
				children: [{
					type: "paragraph",
					content: "Klikk på Legg til et nytt nøkkelord for å legge til et nøkkelord i svartelisten. Hvis du vil slette et nøkkelord, klikker du på (-)-ikonet for søkeordet du ønsker å slette."
				}]
			},{
				type: "name",
				title: "Inkluder i hviteliste",
				content: "Inneholder Internettadressene som klientenhetene i sperrefunksjons-listen har adgang til.",
				children: [{
					type: "paragraph",
					content: "Klikk på Legg til et nytt domenenavn for å legge til en nettside i svartelisten. Hvis du vil slette en nettside, klikker du på (-)-ikonet for nettsiden du ønsker å slette."
				}]
			},{
				type: "note",
				title: "Merk",
				content: "Nøkkelord kan også være et domenenavn, for eksempel mail.google.com eller www.facebook.com."
			},{
				type: "paragraph",
				content: "Klikk på Lagre for å lagre konfigurasjonen."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Gjestenettverk",
			CONTENT: [{
				type: "paragraph",
				content: "Et gjestenettverk lar deg konfigurere et eget nettverk med et eget trådløst nettverk (SSID) og passord som du kan bruke for å få tilgang til det trådløse nettverket."
			},{
				type: "name",
				title: "Gjør det mulig for gjester å se hverandre",
				content: "Velg dette alternativet for å tillate at de trådløse enhetene på gjestenettverket kan se hverandre."
			},{
				type: "name",
				title: "Gjør det mulig for gjester å få tilgang til det lokale nettverket",
				content: "Velg dette alternativet for å tillate at de trådløse enhetene på gjestenettverket kan gå inn på delte filer og skrivere i ditt lokale nettverk."
			},{
				type: "name",
				title: "Aktiver gjestenettverk",
				content: "Velg denne avmerkingsboksen for å tillate gjestenettverk-funksjonen."
			},{
				type: "name",
				title: "Navn på trådløst nettverk (SSID)",
				content: "Du kan la standard gjeste-SSID stå som det er, eller angi et nytt navn (på opptil 32 tegn)."
			},{
				type: "name",
				title: "Skjul SSID",
				content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på gjestenettverket (SSID) fra Wi-Fi-nettverkslisten."
			},{
				type: "name",
				title: "Passord",
				content: "Opprett et passord på mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimale tegn (0–9, a–f, A–F), for å sikre gjestenettverket."
			},{
				type:"paragraph",
				content:"Klikk på Lagre for å lagre alle innstillingene."
			}]
		}

	};
})(jQuery);
