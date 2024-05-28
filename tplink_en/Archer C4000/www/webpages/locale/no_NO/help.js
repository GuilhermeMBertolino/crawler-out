(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internett",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevant informasjon om tilkobling for fjernnett-nettverk (Internett)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Trådløst 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevant informasjon om trådløst nettverk."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjon om Ethernet-porter (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Gjestenettverk 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjon om trådløst nettverk for gjester."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB-enheter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjon om gjeldende USB-lagringsenheter og/eller skriver som er tilkoblet ruteren via USB-portene."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Ytelse",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser gjeldende ytelse for ruteren."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Koblete klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjon om kablede enheter koblet til nettverket."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Trådløse klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjon om trådløse enheter koblet til nettverket."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internett",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurer IPv4-parameterne og velg passende MAC Clone-metode."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg Internett-tilkoblingstype og angi korresponderende parametere."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: Dynamisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen om du er gitt en DHCP-servertilkobling av ISP."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/nettverksmaske/standard gateway/Primær DNS/Sekundær DNS",
                           content: "Disse parameterne er automatisk gitt av DHCP-serveren fra ISP."
                       } ,{                      
                           type: "name",
                           title: "Forny",
                           content: "Klikk for å få nye IP-parametere fra DHCP-serveren."
                       } ,{                      
                           type: "name",
                           title: "Frigi",
                           content: "Klikk for å frigjøre alle IP-adresser gitt av DHCP-serveren."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Hvis Internett-leverandøren gir én eller to DNS-adresser, velger du denne boksen og angir primær- og sekundær DNS-adresse i de riktige feltene. Ellers vil DNS-adressene tildeles dynamisk av Internett-leverandøren."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
                       } ,{                      
                           type: "name",
                           title: "Vertsnavn",
                           content: "Skriv inn en verdi i dette feltet for å angi vertsnavnet til ruteren."
                       } ,{                      
                           type: "name",
                           title: "Få IP ved hjelp av Unicast DHCP",
                           content: "Velg denne luken hvis ISP-ens DHCP-server ikke støtter kringkastingsapper og du ikke kan hente IP-adressen dynamisk."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: Statisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen hvis du har fått levert en bestemt (fast) IP-adresse, nettverksmaske , gateway og DNS-parametre av Internett-leverandøren."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/nettverksmaske/standard gateway/Primær DNS/Sekundær DNS",
                           content: "Angi informasjon gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: BigPond-kabel"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen hvis ISP har BigPond Cable-tilkobling."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Angi brukernavn og passord gitt av ISP. Disse feltene skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Forf. Server",
                           content: "Angi godkjenningsserverens IP-adresse eller vertsnavn."
                       } ,{                      
                           type: "name",
                           title: "Forf. Domene",
                           content: "Angi serverens domenenavn-suffiks (basert på plassering). For eksempel, nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, eller qld.bigpond.net.au for QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
                       } ,{                      
                           type: "name",
                           title: "Tilkoblingsmodus",
                           content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
                       } ,{                      
                           type: "name",
                           title: "Ved behov",
                           content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
                       }]
} ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen hvis du bruker DSL-tjenesten (Digital Subscriber Line) og har fått oppgitt et brukernavn og passord av Internett-leverandøren."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Angi brukernavn og passord gitt av ISP. Disse feltene skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/Primær DNS/Sekundær DNS",
                           content: "Disse parameterne er automatisk gitt av DHCP-serveren på ISP."
                       } ,{                      
                           type: "name",
                           title: "Sekundær tilkobling (Ingen, Dynamisk IP, Statisk IP)",
       children: [{                      
                           type: "name",
                           title: "Ingen",
                           content: "Velg nei dersom ingen sekundær tilkobling er gitt."
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Velg om IP-adressen og nettverksmasken er automatisk tildelt av Internett-leverandøren.",
       children: [{                      
                           type: "name",
                           title: "Forny",
                           content: "Klikk for å fornye IP-parametere fra ISP."
                       } ,{                      
                           type: "name",
                           title: "Frigi",
                           content: "Klikk for å frigjøre de tildelte IP-parameterne."
                       }]
} ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Velg hvis IP-adresse og nettmaske er gitt av ISP, og angi informasjonen i korresponderende felt."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Typisk MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1480 bytes.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "I sjeldne tilfeller kan ISP-en kreve at du justerer MTU-størrelsen for bedre nettverksytelse. Du må ikke endre denne verdien med mindre det er helt nødvendig."
                       }]
} ,{                      
                           type: "name",
                           title: "Navn på tjeneste/tilgangskonsentrator",
                           content: "Som standard, er felt for Tjenestenavn og Navn på tilgangskonsentrator (AC) tomme. Disse feltene skal ikke konfigureres hvis ikke det er påkrevd av ISP."
                       } ,{                      
                           type: "name",
                           title: "Oppdag online-intervall",
                           content: "Angi en verdi for tidsintervall mellom 0 og 120 (i sekunder) for hvert intervall når ruteren oppdager tilgangskonsentrator på Internett. Standardverdi er 10."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse",
                           content: "Hvis ISP gir en spesifikk (fast) IP-adresse, velg Bruk følgende IP-adresse og angi IP-adressen i feltet. Hvis ikke velger du Hent dynamisk fra ISP for å få en servertildelt IP-adresse automatisk."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Hvis ISP angir spesifikke (faste) IP-adresser, velg Bruk følgende DNS-adresser og angi adressen(e) i feltene for henholdsvis primær-DNS og sekundær-DNS. Hvis ikke velger du Hent dynamisk fra ISP for å få servertildelt IP-adresse(r) automatisk."
                       } ,{                      
                           type: "name",
                           title: "Tilkoblingsmodus",
                           content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
                       } ,{                      
                           type: "name",
                           title: "Ved behov",
                           content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
                       } ,{                      
                           type: "name",
                           title: "Tidsbasert",
                           content: "I denne modusen, vil en Internett-tilkobling kun etableres innen en bestemt tidsramme. Hvis dette alternativet er valgt, angir du start- og sluttidspunkt; begge er i formatet TT:MM."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Den tidsbaserte tilkoblingsmodusen vil kun tre i kraft når systemtiden er konfigurert i Avansert → Systemverktøy → Tidsinnstillinger."
                       }]
} ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen hvis du kobler til en L2TP/PPTP VPN-server og din Internett-leverandøren har gitt deg et brukernavn, passord og IP-adresse/domenenavn til serveren."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Angi brukernavn og passord gitt av ISP. Disse feltene skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/Primær DNS/Sekundær DNS",
                           content: "Disse parameterne vil automatisk gis av DHCP-serveren fra ISP."
                       } ,{                      
                           type: "name",
                           title: "Sekundær tilkobling (Dynamisk IP eller Statisk IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Velg om IP-adressen og nettverksmasken er automatisk tildelt av Internett-leverandøren."
                       } ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Velg hvis IP-adresse, nettmaske, gateway og DNS-adresse er gitt av ISP, og angi informasjonen i korresponderende felt."
                       }]
} ,{                      
                           type: "name",
                           title: "IP/Domenenavn for VPN-server",
                           content: "Angi VPN-serverens IP-adresse eller domenenavn gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1460 bytes for L2TP og 1420 Bytes for PPTP. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
                       } ,{                      
                           type: "name",
                           title: "Tilkoblingsmodus",
                           content: "Velg en passende tilkoblingsmodus som bestemmer hvordan du skal koble til Internett.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne modusen, vil Internett-tilkoblingen automatisk tilkobles hver gang den blir koblet fra."
                       } ,{                      
                           type: "name",
                           title: "Ved behov",
                           content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne modusen, styres Internett-tilkoblingen manuelt ved å klikke på Koble til- eller Koble fra-knappen. Denne modusen støtter også Maks. tid uten aktivitet-funksjonen. Skriv inn en maksimal tid (i minutter) i Maks. tid uten aktivitet-feltet, for for å angi maksimal tid Internett-tilkoblingen kan være inaktiv før den avsluttes. Standardverdi er 15 minutter. Hvis du vil at Internett-tilkoblingen skal forbli aktiv til enhver tid, skriv inn 0 (null)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC Clone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg passende MAC Clone-metode."
                       } ,{                      
                           type: "name",
                           title: "IKKE klone MAC-adressen",
                           content: "IKKE endre ruterens standard MAC-adresse, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til MAC-adressen. "
                       } ,{                      
                           type: "name",
                           title: "Klone datamaskinens gjeldende MAC-adresse",
                           content: "Velg å kopiere gjeldende MAC-adresse til datamaskinen som er koblet til ruteren, i tilfelle Internett-leverandøren binder den tildelte IP-adressen til datamaskinens MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Bruk tilpasset MAC-adresse",
                           content: "Angi ruterens MAC-adresse manuelt, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til den spesifikke MAC-adressen."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN-aggregasjon",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN-aggregasjon gjør LAN1-porten om til en ekstra WAN-port og lager én enkel databane med høy båndbredde. Slipp løs raskere internett fra internettleverandører som leverer hastigheter på over 1 Gbps, slik at du ikke lenger begrenses av nettverkets maskinvare."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Merk",
                           content: "Før du aktiverer denne funksjonen, må du forsikre deg om at internettleverandøren din støtter WAN-aggregasjon, og at modemet ditt har to WAN-porter."
                       } ,{                      
                           type: "step",
                           title: "Slik bruker du WAN-aggregering",
       content: [ 
                "1.	Slå på WAN-aggregasjon for å aktivere funksjonen.",
                "2.	Klikk på Lagre.",
                "3.	Koble ruterens WAN-port og LAN1-port til modemets to WAN-porter med to Ethernet-kabler."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser ruterens MAC-adresse, IP-adresse og nettmaske."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Den unike fysiske adressen som er tilordnet Ethernet-porten (LAN) på ruteren."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse",
                           content: "Viser ruterens standard IP-adresse, som brukes for å logge inn på ruterens administrasjonsside på nett. Du kan endre denne."
                       } ,{                      
                           type: "name",
                           title: "Nettverksmaske",
                           content: "Velg en tildelt identifiserer bruk av LAN-porten for å rute intern og ekstern trafikk eller angi en ny nettmaske."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis den nye LAN-IP-adressen ikke er i samme subnett som den gamle, vil IP-adresseutvalget i DHCP-serveren konfigureres automatisk. Den virtuelle serveren og DMZ-verten vil derimot ikke tre i kraft før de blir konfigurert på nytt."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Koblingsaggregasjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Link-aggregering kombinerer to porter som til sammen gir en enkel datavei, og som således opprettholder et raskere og mer stabilt kablet nettverk."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Bruke link-aggregering",
       content: [ 
                "1. Skru på for å aktivere Link-aggregering.",
                "2. Angi to porter for link-aggregering.",
                "3. Klikk Lagre."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internettprotokoll-TV) er et system som leverer TV-tjenester ved hjelp av Internettprotokoll-suiten over et pakkebyttet nettverk slik som et LAN eller Internett."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "Kontrollfunksjonen IGMP (Internett-gruppestyringsprotokoll) tillater kun at ruteren videresender multikastingstrafikk til porter som har forespurt den."
                       } ,{                      
                           type: "name",
                           title: "IGMP-proxy",
                           content: "Velg for å aktivere IGMP-proxyfunksjonen hvis IPTV-funksjonen gitt av ISP er IGMP-teknologibasert."
                       } ,{                      
                           type: "name",
                           title: "IGMP-Versjon",
                           content: "Velg IGMP-versjon i henhold til internettleverandøren din. Standard IGMP-versjon er V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Trådløs videresending med multikasting",
                           content: "Velg for å aktivere funksjonen Trådløs Multikasting Videresending, som lar multikast-pakker videresendes til det trådløse nettverket."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Velg for å aktivere IPTV-funksjonen hvis IPTV-tjenesten gitt av ISP er ikke-IGMP-teknologibasert."
                       } ,{                      
                           type: "name",
                           title: "ISP-profil",
                           content: "Velg riktig ISP-profil (internettleverandørprofil) for å fullføre konfigurasjonen. Det finnes tre profiltyper.",
       children: [{                      
                           type: "name",
                           title: "Land og navn på internettleverandør",
                           content: "ISP-profiler med standardinnstillinger er i formatet «Land-ISP-navn». Finn og velg ISP-navnet fra listen."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bro",
                           content: "Hvis ISP-en din ikke er på listen, og det ikke kreves andre parametere for å sette opp IPTV, er det bare å velge denne profilen og spesifisere LAN-porten som dedikert til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN1, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bro",
                           content: "Hvis ISP-en din ikke er på listen, og det ikke kreves andre parametere for å sette opp IPTV, er det bare å velge denne profilen og spesifisere LAN-porten som dedikert til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN2, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bro",
                           content: "Hvis ISP-en din ikke er på listen, og det ikke kreves andre parametere for å sette opp IPTV, er det bare å velge denne profilen og spesifisere LAN-porten som dedikert til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN5, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Tilpasset",
                           content: "Hvis ISP-en din ikke står på listen, men gir deg enkelte nødvendige parametere, slik som VLAN-ID-er og prioritet for internet/VoIP/IPTV, velger du denne profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Konfigurer VLAN ID-er og prioriteter som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q-kode",
                           content: "Velg om du vil merke Internettpakker med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV multikasting VLAN-ID/prioritet",
                           content: "Du kan aktivere IPTV-multikastfunksjonen hvis ønskelig, og konfigurere VLAN ID og Priority i henhold til ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN1, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Tilpasset",
                           content: "Hvis ISP-en din ikke står på listen, men gir deg enkelte nødvendige parametere, slik som VLAN-ID-er og prioritet for internet/VoIP/IPTV, velger du denne profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Konfigurer VLAN ID-er og prioriteter som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q-kode",
                           content: "Velg om du vil merke Internettpakker med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV multikasting VLAN-ID/prioritet",
                           content: "Du kan aktivere IPTV-multikastfunksjonen hvis ønskelig, og konfigurere VLAN ID og Priority i henhold til ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN2, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Tilpasset",
                           content: "Hvis ISP-en din ikke står på listen, men gir deg enkelte nødvendige parametere, slik som VLAN-ID-er og prioritet for internet/VoIP/IPTV, velger du denne profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Konfigurer VLAN ID-er og prioriteter som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q-kode",
                           content: "Velg om du vil merke Internettpakker med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV multikasting VLAN-ID/prioritet",
                           content: "Du kan aktivere IPTV-multikastfunksjonen hvis ønskelig, og konfigurere VLAN ID og Priority i henhold til ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Spesifiser hvilke typer data LAN-porten skal overføre. Hvis IPTV for eksempel er valgt for LAN5, vil den bare overføre IPTV-data, og da skal du koble boksen til LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP-server",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Som standard er DHCP-serveren (Dynamic Host Configuration Protocol) aktivert; den tildeler TCP/IP-parametere dynamisk til klientenheter fra IP-adresseutvalget.",
                "Ikke deaktiver DHCP-serveren med mindre du har en annen DHCP-server, eller du ønsker å tilordne TCP/IP-parametere manuelt til hver klientenhet på nettverket."]
} ,{                      
                           type: "name",
                           title: "IP-adresseutvalg",
                           content: "Skriv inn utvalget av IP-adresser som kan leies ut til kundene."
                       } ,{                      
                           type: "name",
                           title: "Leasingavtaletid for adresse",
                           content: "Angi varighet (mellom 1 og 2 880 minutter) for utlån av en IP-adresse til en klient. Standardverdien er 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Adressereservasjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser korresponderende parametere for IP-reserverte enheter."
                       } ,{                      
                           type: "step",
                           title: "Reservere en IP-adresse",
       content: [ 
                "1. Klikk Legg til.",
                "2. Klikk Søk for å velge gjeldende tilkoblet enhet fra DHCP-klient listen, eller angi MAC-adresse for ønsket klient i feltet for MAC-adresse og IP-adressen du vil reservere for klienten i feltet for IP-adresse.",
                "3. Angi beskrivelse av klienten feltet for Beskrivelse.",
                "4. Velg Aktiver.",
                "5. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP-klientliste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser informasjonen til gjeldende tilkoblede enheter."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisk DNS (Dynamic Domain Name System, dynamisk domenenavnsystem) lar deg tildele en fast vert og et fast domenenavn til en dynamisk Internett IP-adresse. Det er nyttignår du er vert for din egen nettside, FTP-server, eller en annen server bak ruteren. For å starte trenger du å registrere deg hos en Dynamisk DNS-serverleverandør slik som www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere en dynamisk DNS",
       content: [ 
                "1. Velg dynamisk DNS-tjenesteleverandør.",
                "2. Angi brukernavn og passord for Dynamisk DNS-konto.",
                "3. Angi domenenavnet du mottok fra DDNS-tjenestelevereandøren.",
                "4. Velg oppdateringsintervall fra rullegardinlisten.",
                "5. Hvis din tjenesteleverandør er NO-IP, kan WAN IP-binding sørge for at domenenavnet er bundet din WAN IP-funksjonen til denne ruteren.",
                "6. Klikk Logg inn og Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil bruke en ny DDNS-konto, logg ut først og logg deretter inn med den nye kontoen."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisk DNS (Dynamic Domain Name System, dynamisk domenenavnsystem) lar deg tildele en fast vert og et fast domenenavn til en dynamisk Internett IP-adresse. Det er nyttignår du er vert for din egen nettside, FTP-server, eller en annen server bak ruteren. For å starte trenger du å registrere deg hos en Dynamisk DNS-serverleverandør slik som www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Navneliste for domene",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser informasjonen til alle domenenavnene som er registrert på din skykonto."
                       } ,{                      
                           type: "step",
                           title: "For å registrere et nytt domenenavn",
       content: [ 
                "1. Klikk Registrer.",
                "2. Angi domenenavnet du vil registrere.",
                "3. Klikk Lagre."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statisk ruting",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statisk ruting brukes til å forhåndsbestemme en fast rute for nettverksinformasjonspakker for å nå en bestemt vert eller nettverk."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere statisk ruting",
       content: [ 
                "1. Klikk Legg til.",
                "2. Angi en IP-adresse i Nettverksdestinasjon for å tildele en statisk rute for denne oppføringen.",
                "3. Angi en nettmaske i feltet for Nettmaske for å bestemme nettverksdel og vertsdel for IP-adressen.",
                "4. Angi IP-adresse for gateway i feltet for Standard gateway for å koble ruteren til nettverk eller vert.",
                "5. Velg LAN eller WLAN i feltet for Grensesnitt for å spesifisere type Nettverksdestinasjon.",
                "6. Angi er kort beskrivelse av denne oppføringen.",
                "7. Velg Aktiver.",
                "8. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Systemrutingtabell",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser alle gyldige ruteoppføringer som for tiden er i bruk."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Trådløsinnstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurer de trådløse innstillingene du trenger."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg dette alternativet for å aktivere Smart Connect. Denne funksjonen bidrar til raskere ytelse av enhetene, ved å tilordne dem til beste trådløse bånd basert på faktiske forhold og dermed balansere nettverkskrav."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Trådløst 2,4 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nettverksnavn (SSID)",
                           content: "Du anbefales å bytte nettverksnavn (SSID). Dette feltet skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Velg hvis du vil gjemme 2,4 GHz-nettverksnavnet (SSID) fra listen over trådløse nettverk. Når valgt, vil SSID ikke kringkastes og du må gå inn på nettverket manuelt."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhet",
                           content: "Velg en av de følgende sikkerhetsinnstillingene:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhet",
                           content: "Velg dette alternativet for å deaktivere trådløs sikkerhet. Dette er ikke anbefalt."
                       } ,{                      
                           type: "name",
                           title: "Personlig WPA/WPA2",
                           content: "Velg dette alternativet for å aktivere trådløs sikkerhet. Dette anbefales på det sterkeste for å beskytte det trådløse nettverket fra uautorisert tilgang. Hvis valgt, må du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Versjon",
                           content: "Velg en sikkerhetsversjon. Velg en sikkerhetsversjon. WPA2-PSK er mest sikker. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Velg en sikkerhetskrypteringstype. AES er mest sikker. Det anbefales IKKE å brukes TKIP-kryptering hvis ruteren kjører i 802.11n-modus. Dessuten vil WPS-funksjonen deaktiveres hvis TKIP brukes. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Passord",
                           content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn i dette feltet."
                       }]
} ,{                      
                           type: "name",
                           title: "Enterprise-WPA/WPA2",
                           content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Hvis dette er valgt, vil WPS-funksjonen deaktiveres.",
       children: [{                      
                           type: "name",
                           title: "Versjon",
                           content: "Velg en sikkerhetsversjon. WPA2 er mest sikker. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Velg en sikkerhetskrypteringstype. AES er mest sikker. Det anbefales IKKE å brukes TKIP-kryptering hvis ruteren kjører i 802.11n-modus. Dessuten vil WPS-funksjonen deaktiveres hvis TKIP brukes. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "RADIUS server-IP",
                           content: "Viser IP-adressen for RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-port",
                           content: "Viser portnummeret til RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-passord",
                           content: "Viser det delte passordet for RADIUS-serveren."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Velg dette alternativet for å aktivere en enkel autentiseringsmetode hvis en av klientenhetene kun kan få tilgang til det trådløse nettverket ved å bruke WEP (Wired Equivalent Privacy). Hvis dette er valgt, blir WPS-funksjonen deaktivert.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Velg en autentiseringstype for det trådløse nettverket. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "WEP-nøkkel-format",
                           content: "Bruk enten ASCII-format eller heksadesimaler. ASCII-format er en kombinasjon av bokstaver og tall. Heksadesimalt format er en kombinasjon av tall (0–9) og bokstaver (A–F, a–f)."
                       } ,{                      
                           type: "name",
                           title: "Nøkkeltype",
                           content: "Velg lengde for WEP-nøkkelen.",
       children: [{                      
                           type: "name",
                           title: "64-biters",
                           content: "Lar deg angi 10 heksadesimale sifre (0–9, A–F, a–f) eller 5 ASCII-tegn i WEP-verdifeltet."
                       } ,{                      
                           type: "name",
                           title: "128-biters",
                           content: "Lar deg angi 26 heksadesimale sifre (0–9, A–F, a–f) eller 13 ASCII-tegn i WEP-verdifeltet."
                       }]
} ,{                      
                           type: "name",
                           title: "Nøkkelverdi",
                           content: "Angi WEP-nøkkelen i det riktige feltet."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Velg en driftskanal for det 2,4 GHz trådløse nettverket. Det anbefales at kanalen er satt til Auto dersom du ikke har problemer med uregelmessig trådløstilkobling."
                       } ,{                      
                           type: "name",
                           title: "Overføringskraft",
                           content: "Velg enten Høy, Middels eller Lav for å spesifisere dataoverføringen styrke. Standard og anbefalt innstilling er Høy."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness-funksjon",
                           content: "Klikk på denne boksen for å skru på Airtime Fairness (ATF)-funksjonen som tillater optimalisering av gjennomstrømming. Tidsplanen for ATF-trafikk bruker destinasjonspesifikke overføringsmål for å balansere overføringstiden til strømmens mål."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "MIMO-funksjon for flere brukere",
                           content: "Trykk Aktiver for å ta i bruk MIMO-funksjon for flere brukere."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Trådløst 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nettverksnavn (SSID)",
                           content: "Du anbefales å bytte nettverksnavn (SSID). Dette feltet skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Velg hvis du vil gjemme 5GHz-nettverksnavnet (SSID) fra listen over trådløse nettverk. Når valgt, vil SSID ikke kringkastes og du må gå inn på nettverket manuelt."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhet",
                           content: "Velg en av de følgende sikkerhetsinnstillingene:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhet",
                           content: "Velg dette alternativet for å deaktivere trådløs sikkerhet. Dette er ikke anbefalt."
                       } ,{                      
                           type: "name",
                           title: "Personlig WPA/WPA2",
                           content: "Velg dette alternativet for å aktivere trådløs sikkerhet. Dette anbefales på det sterkeste for å beskytte det trådløse nettverket fra uautorisert tilgang. Hvis valgt, må du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Versjon",
                           content: "Velg en sikkerhetsversjon. WPA2-PSK er mest sikker. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Velg en sikkerhetskrypteringstype. AES er mest sikker. Det anbefales IKKE å brukes TKIP-kryptering hvis ruteren kjører i 802.11n-modus. Dessuten vil WPS-funksjonen deaktiveres hvis TKIP brukes. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Passord",
                           content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn i dette feltet."
                       }]
} ,{                      
                           type: "name",
                           title: "Enterprise-WPA/WPA2",
                           content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Hvis dette er valgt, vil WPS-funksjonen deaktiveres.",
       children: [{                      
                           type: "name",
                           title: "Versjon",
                           content: "Velg en sikkerhetsversjon. WPA2 er mest sikker. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Velg en sikkerhetskrypteringstype. AES er mest sikker. Det anbefales IKKE å brukes TKIP-kryptering hvis ruteren kjører i 802.11n-modus. Dessuten vil WPS-funksjonen deaktiveres hvis TKIP brukes. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "RADIUS server-IP",
                           content: "Viser IP-adressen for RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-port",
                           content: "Viser portnummeret til RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-passord",
                           content: "Viser det delte passordet for RADIUS-serveren."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Velg dette alternativet for å aktivere en enkel autentiseringsmetode hvis en av klientenhetene kun kan få tilgang til det trådløse nettverket ved å bruke WEP (Wired Equivalent Privacy). Hvis dette er valgt, blir WPS-funksjonen deaktivert.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Velg en autentiseringstype for det trådløse nettverket. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "WEP-nøkkel-format",
                           content: "Bruk enten ASCII-format eller heksadesimaler. ASCII-format er en kombinasjon av bokstaver og tall. Heksadesimalt format er en kombinasjon av tall (0–9) og bokstaver (A–F, a–f)."
                       } ,{                      
                           type: "name",
                           title: "Nøkkeltype",
                           content: "Velg lengde for WEP-nøkkelen.",
       children: [{                      
                           type: "name",
                           title: "64-biters",
                           content: "Lar deg angi 10 heksadesimale sifre (0–9, A–F, a–f) eller 5 ASCII-tegn i WEP-verdifeltet."
                       } ,{                      
                           type: "name",
                           title: "128-biters",
                           content: "Lar deg angi 26 heksadesimale sifre (0–9, A–F, a–f) eller 13 ASCII-tegn i WEP-verdifeltet."
                       }]
} ,{                      
                           type: "name",
                           title: "Nøkkelverdi",
                           content: "Angi WEP-nøkkelen i det riktige feltet."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Velg en driftskanal for det 5GHz trådløse nettverket. Det anbefales at kanalen er satt til Auto dersom du ikke har problemer med uregelmessig trådløstilkobling."
                       } ,{                      
                           type: "name",
                           title: "Overføringskraft",
                           content: "Velg enten Høy, Middels eller Lav for å spesifisere dataoverføringen styrke. Standard og anbefalt innstilling er Høy."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness-funksjon",
                           content: "Klikk på denne boksen for å skru på Airtime Fairness (ATF)-funksjonen som tillater optimalisering av gjennomstrømming. Tidsplanen for ATF-trafikk bruker destinasjonspesifikke overføringsmål for å balansere overføringstiden til strømmens mål."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "MIMO-funksjon for flere brukere",
                           content: "Trykk Aktiver for å ta i bruk MIMO-funksjon for flere brukere."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-FI Protected Setup, trådløst beskyttet oppsett) er en enklere måte å konfigurere sikkerhetsbeskyttet trådløs tilkobling."
                       } ,{                      
                           type: "name",
                           title: "Push-knapp (anbefalt)",
       content: [ 
                "Denne metoden lar deg enkelt koble en WPS-aktivert enhet til det trådløse nettverket.",
                "Klikk på Start WPS-knappen på skjermen. Innen to minutter, trykker du på WPS-knappen på klientenheten."]
} ,{                      
                           type: "name",
                           title: "Ruterens PIN-kode",
       content: [ 
                "Du finner standard PIN på etiketten på ruteren.",
                "Klikk Generer for å få en ny PIN-kode eller klikk Standard for å tilbakestille gjeldende PIN til standard PIN-kode."]
} ,{                      
                           type: "name",
                           title: "Skriv inn klientens PIN-kode",
       content: [ 
                "Denne metoden gjør det mulig å legge til en trådløs enhet manuelt.",
                "Angi enhetens PIN i feltet, og klikk deretter Koble til."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Påloggede radiostasjoner",
               CONTENT: [{
                           type: "name",
                           title: "Klientnummer",
                           content: "Viser antall tilhørende trådløse klienter."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Viser MAC-adressen for den tilhørende trådløse klienten."
                       } ,{                      
                           type: "name",
                           title: "Tilkoblingstype",
                           content: "Viser det trådløse frekvensbåndet (2,4 GHz eller 5 GHz) for den tilhørende trådløse klienten."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhet",
                           content: "Viser sikkerhetstypen for den tilhørende trådløse klienten."
                       } ,{                      
                           type: "name",
                           title: "Mottatte pakker",
                           content: "Viser antall pakker mottatt av den tilhørende trådløse klienten."
                       } ,{                      
                           type: "name",
                           title: "Sendte pakker",
                           content: "Viser antall pakker sendt av den tilhørende trådløse klienten."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk på Oppdater for å oppdatere informasjonen på denne siden."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Tidsplan for trådløs tilkobling",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med Trådløs tidsinnstilling kan du deaktivere det trådløse signalet i en bestemt periode. For eksempel kan du slå av det trådløse signalet mellom 00:00 og 07:00."
                       } ,{                      
                           type: "name",
                           title: "Tid for trådløs deaktivering",
                           content: "Viser perioden(e) når det trådløse signalet er av.",
       children: [{                      
                           type: "step",
                           title: "For å konfigurer tid for trådløs av",
       content: [ 
                "1. Klikk Legg til.",
                "2. Still inn tidsperioden du ønsker at det trådløse signalet skal være slått av.",
                "3. Velg repeterende dager. Du kan velge «Hver dag» eller angi bestemte dager.",
                "4. Klikk på Lagre."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Innstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funksjonen lar deg gi gjester trådløs tilgang uten å avsløre hovednettverket."
                       } ,{                      
                           type: "name",
                           title: "Gi gjestene tilgang til hverandre",
                           content: "Velg denne luken for å tillate trådløse enheter på Gjestenettverket å kommunisere med hverandre via metoder som nettverksnaboer, Samba, Ping og FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Gi gjestene tilgang til Mitt lokale nettverk",
                           content: "Velg denne luken for å tillate trådløse enheter på Gjestenettverket å kommunisere med enheter som er koblet til ruterens LAN-porter eller hovednettverk via metoder som nettverksnaboer, Samba, Ping og FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Trådløst 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Aktiver gjestenettverk",
                           content: "Velg denne avmerkingsboksen for å tillate gjestenettverk-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Nettverksnavn (SSID)",
                           content: "Du kan la standard gjeste-SSID stå som det er, eller angi et nytt navn (på opptil 32 tegn)."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på gjestenettverket (SSID) fra Wi-Fi-nettverkslisten."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervall for oppdatering av passord",
                           content: "Velg oppdateringsintervall for passord for Gjestenettverket."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhet",
                           content: "Når du velger å aldri oppdatere passordet, velger du ett av følgende sikkerhetsalternativer:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhet",
                           content: "Velg dette alternativet for å deaktivere trådløs sikkerhet. Dette er ikke anbefalt."
                       } ,{                      
                           type: "name",
                           title: "Personlig WPA/WPA2",
                           content: "Velg dette alternativet for å aktivere trådløs sikkerhet. Dette anbefales på det sterkeste for å beskytte Gjestenettverket fra uautorisert tilgang. Hvis valgt, må du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Versjon",
                           content: "Velg en sikkerhetsversjon. WPA2-PSK er mest sikker. Hvis du usikker, velg Automatisk."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Velg en sikkerhetskrypteringstype. AES er mest sikker. Det anbefales IKKE å brukes TKIP-kryptering hvis ruteren kjører i 802.11n-modus. Dessuten vil WPS-funksjonen deaktiveres hvis TKIP brukes. Hvis du usikker, velg Automatisk."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Portalautentisering forsterker nettverksikkerheten din ved å kreve autentisering fra gjester som trenger midlertidig tilgang til ditt trådløse nettverk. "
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Slik installerer du portalautentisering:",
       content: [ 
                "1. Velg sikkerhetsportal.",
                "2. Velg Enkelt passord eller Ingen autentisering for autentiseringsprosessen.",
                "A. Enkelt passord – skriv inn et passord (8-16 alfanumeriske tegn)",
                "B. Ingen autentisering – klienter kan logge seg på nettverket uten noen form for autentisering.",
                "3. Velg 1 time, 2 timer, 4 timer, 8 timer eller Alltid for å velgenår autentiseringen skal utløpe. Når en klients autentisering utløper, må han/hun logge inn igjen for å bli autentisert på nytt.",
                "4. (Valgfritt) Skru på Redirigering og skriv inn ønsket URL-adresse. Da vil en autentisert klient bli redirigert til URL-adressen du skrev inn.",
                "5. (Valgfritt) Du kan også tilpasse innloggingsiden til autentiseringen.",
                "A. Portalnavn – maks 31 tegn.",
                "B. Vilkår og betingelser – maks 1023 tegn.",
                "C. Logo – Last opp et JPG eller PNG-bilde (mindre enn 100kb) for å tilpasse logoen.",
                "D. Bakgrunnsbilde – Last opp et JPG eller PNG-bilde (mindre enn 2MB) for å tilpasse bakgrunnen.",
                "6. Trykk Lagre"]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Passord",
                           content: "Lag et passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn (0–9, a–f, A–F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Passord",
                           content: "Bruk enten passordet som ble tilfeldig generert, eller opprett et passord på mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimale tegn (0–9, A–F, A–F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway, applikasjonlag-gateway) lar tilpassede NAT (Network Address Translation, nettverksadresseoversettelse)-traverseringsfiltere plugges inn i gateway-en for å støtte adresse- og portoversettelse for visse applikasjonslag \"kontroll/data\"-protokoller: FTP, TFTP, H323 osv. Det anbefales å aktivere ALG."
                       } ,{                      
                           type: "name",
                           title: "Aktiver FTP ALG",
                           content: "Dette valget lar klienter og servere av typen FTP (File Transfer Protocol) overføre data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver TFTP ALG",
                           content: "Dette valget lar klienter og servere av typen TFTP (Trivial File Transfer Protocol) overføre data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver H323 ALG",
                           content: "Dette valget lar Microsoft NetMeeting-klienter kommunisere via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver RTSP ALG",
                           content: "Dette valget lar mediespiller-klienter kommunisere med direkteavspilt multimediaservere via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver SIP ALG",
                           content: "Hvis valgt, lar det klienter kommunisere med SIP (Session Initiation Protocol, øktinitiseringsprotokoll)-servere via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver PPTP direkte",
                           content: "Dette valget tillater punkt-til-punkt-økter å tunneleres gjennom et IP-nettverk og gå gjennom ruteren."
                       } ,{                      
                           type: "name",
                           title: "Aktiver L2TP direkte",
                           content: "Dette valget tillater punkt-til-punkt-økter med to lag å tunneleres gjennom et IP-nettverk og gå gjennom ruteren."
                       } ,{                      
                           type: "name",
                           title: "Aktiver IPSec direkte",
                           content: "Hvis valgt, lar den IPSec (Internet Protocol security, internettprotokollsikkerhet) passere gjennom et IP-nettverk og gjennom ruteren. IPSec bruker kryptografiske sikkerhetstjenester for å sørge for privat og sikker kommunikasjon over IP-nettverk."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuelle servere",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuelle servere brukes til å sette opp offentlige tjenester på det lokale nettverket. En virtuell server er definert som en ekstern port, og alle forespørsler fra Internett til denne eksterne porten vil omdirigeres til en bestemt datamaskin, som må konfigureres med en statisk eller reservert IP-adresse.",
                "Når du bygger opp en server på det lokale nettverket og ønsker å dele den på Internett, kan virtuelle servere realisere tjenesten og gi den til Internett-brukere."]
} ,{                      
                           type: "paragraph",
                           content: "Listen viser de relevante parameterne til den virtuelle serveren."
                       } ,{                      
                           type: "name",
                           title: "Tjenestetype",
                           content: "Viser navn på den virtuelle serveren."
                       } ,{                      
                           type: "name",
                           title: "Ekstern port",
                           content: "Viser portnummeret eller en rekke porter som brukes av den virtuelle serveren."
                       } ,{                      
                           type: "name",
                           title: "Intern IP",
                           content: "Viser IP-adressen for datamaskinen som kjører tjenesteprogrammet."
                       } ,{                      
                           type: "name",
                           title: "Intern port",
                           content: "Viser portnummeret for datamaskinen som kjører tjenesteprogrammet."
                       } ,{                      
                           type: "name",
                           title: "Protokoll",
                           content: "Viser protokollen som brukes for tjenesteprogrammet: TCP, UDP eller Alle (alle protokoller som støttes av ruteren)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser gjeldende status (på eller av) for den bestemte filtreringsregelen."
                       } ,{                      
                           type: "name",
                           title: "Endre",
                           content: "Viser alternativer for å endre eller slette den tilsvarende regelen."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere en virtuell serverregel",
       content: [ 
                "1. Klikk Legg til.",
                "2. Klikk Søk for å velge en tjeneste fra listen for å automatisk angi riktig portnummer i feltene for ekstern og intern port. Hvis tjenesten ikke er oppført angir du det eksterne portnummeret (f.eks. 21) eller et utvalg porter (f.eks. 21-25). La intern port stå tomt hvis den er den samme som den eksterne porten, eller angi et bestemt portnummer (f.eks. 21) hvis den eksterne porten er en enkel port. Fyll IP-adressen til datamaskinen som kjører tjenesteapplikasjonen inn i feltet for intern IP i stiplet desimalformat.",
                "3. Velg en protokoll for tjenesteprogrammet: Velg TCP, UDP eller Alle fra nedtrekkslisten med protokoller.",
                "4. Velg Aktiver.",
                "5. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
       content: [ 
                "1. Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet.",
                "2. Det anbefales å beholde standardinnstillingene for intern port og protokoll dersom du ikke er sikker på hvilken port eller protokoll du vil bruke.",
                "3. Hvis den lokale vertsenheten er vert for mer enn én type tilgjengelige tjenester, må du opprette en regel for hver tjeneste. Vær oppmerksom på at ekstern port ikke bør overlappes."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port-utløsing",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port-utløser brukes til å videresende trafikk fra en bestemt port til en bestemt server i nettverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Listen viser de relevante parameterne for portutløsningen."
                       } ,{                      
                           type: "name",
                           title: "Anvendelse",
                           content: "Viser programnavnet."
                       } ,{                      
                           type: "name",
                           title: "Utløserport",
                           content: "Viser porten for utgående trafikk som brukes til å utløse en filtreringsregel for en utgående tilkobling."
                       } ,{                      
                           type: "name",
                           title: "Utløser-protokoll",
                           content: "Viser protokollen som brukes for å utløser-port. TCP, UDP eller Alle (alle protokoller som støttes av ruteren)."
                       } ,{                      
                           type: "name",
                           title: "Ekstern port",
                           content: "Viser porter eller portområdet som brukes av det eksterne systemet. Et svar for bruk av en av disse portene vil bli videresendt til PCen som utløser denne regelen. Du kan angi inntil fem grupper med porter (eller portseksjoner). Hver portgruppe må være delt med \",\" (komma), som for eksempel: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Ekstern protokoll",
                           content: "Viser protokollen som brukes for innkommende port. TCP, UDP eller ALLE (alle protokoller som støttes av ruteren)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser gjeldende status (på eller av) for den bestemte filtreringsregelen."
                       } ,{                      
                           type: "name",
                           title: "Endre",
                           content: "Viser alternativer for å endre eller slette den tilsvarende regelen."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere en regel for port-utløsing",
       content: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Hver regel kan kun brukes av en vert av gangen."
                       },
                "1. Klikk Legg til.",
                "2. Klikk Søk for å velge en applikasjon fra listen for å automatisk fylle ut standardverdiene i tiltenkte felt. Hvis du vil legge til en applikasjon som ikke er på listen må du manuelt angi Applikasjonsutløserporten, Utløserprotokoll, Ekstern port og Ekstern protokoll.",
                "3. Velg Aktiver.",
                "4. Klikk på Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne reglen, klikk på Lyspære-ikonet."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vertsfunksjonen DMZ (Demilitarized Zone, demilitærisert sone) lar en lokal vert eksponeres til Internett for et spesielt formål eller en spesiell tjeneste, slik som Internett-gaming eller videokonferanser. Enkelt sagt, lar DMZ en enkelt datamaskin på LAN-et åpne alle sine porter. Denne datamaskinen må konfigureres med en statisk IP-adresse og ha alle sine DHCP-klientfunksjoner deaktiverte."
                       } ,{                      
                           type: "paragraph",
                           content: "Når DMZ er aktivert, er DMZ-vert totalt eksponeres for Internett, noe som kan føre med seg en potensiell sikkerhetsrisiko for datamaskinen. Hvis DMZ ikke er i bruk må du deaktivere den i tide."
                       } ,{                      
                           type: "step",
                           title: "Tilordne en datamaskin eller server for å være en DMZ-server",
       content: [ 
                "1. Velg Aktiver DMZ.",
                "2. I IP-adressefeltet for DMZ-verten skriver du inn IP-adressen til den lokale datamaskinen for ønsker å konfigurere som DMZ-vert.",
                "3. Klikk Lagre."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "UPnP (Universal Plug-and-Play)-funksjonen er aktivert som standard for å la enheter, slik som datamaskiner og apparater med Internett, automatisk oppdage og kommunisere med hverandre på det lokale nettverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Du kan måtte aktivere UPnP hvis du vil bruke applikasjoner for multispiller-gaming, node-til-node-tilkoblinger, sanntidskommunikasjon (slik som VoIP- eller teleVoIP-konferanser) eller fjernassistanse, osv."
                       } ,{                      
                           type: "name",
                           title: "UPnP-tjenesteliste",
                           content: "UPnP-tjenesten viser UPnP-informasjonen til den lokale verten."
                       }]
},
       MODEM :{ 
               TITLE:"Hjelp for 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modem",
                           content: "Viser status for 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Bruk de automatisk identifiserte ISP-parameterne",
                           content: "Denne funksjonen er aktivert som standard. Hvis aktivert kan ruteren identifisere ISP for SIM-/UIM-kortet, og angi parameterne automatisk. Hvis identifikasjon mislykkes, velg Region og Mobil ISP manuelt."
                       } ,{                      
                           type: "name",
                           title: "Regional",
                           content: "Velger og vises region automatisk når identifisering av USB-modem og SIM-kortet er vellykket. Hvis ikke, velg region fra rullegardinlisten."
                       } ,{                      
                           type: "name",
                           title: "Mobil ISP",
                           content: "Viser ISP (Internet Service Provider) for 3G/4G-nettverket. Hvis ikke regionen din oppdages automatisk, må du velge en fra nedtrekkslisten. Standard innvalg-nummer og APN vil bli automatisk befolket tilsvarende."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Hvis SIM-/UIM-beskyttelse er aktivert, angi PIN-koden. SIM-/UIM-beskyttelse er deaktivert som standard. Merk at om du fyller inn ugyldig PIN 3 gange, vil SIM-/UIM-kortet blokkeres automatisk. Du kan kun låse det opp ved å angi PUK-koden fra PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "Melding",
                           content: "Viser PIN-informasjon til SIM-/UIM-kortet, hvis PIN-beskyttelse er aktivert."
                       } ,{                      
                           type: "name",
                           title: "Innstillinger Direktenummer,APN,Brukernavn/passord",
                           content: "Hvis ISP ikke er oppført i listen over <strong>Mobil ISP</strong>, velg denne luken og Oppringingsnummer, APN (Access Point Name, tilgangspunktsnavn), Brukernavn og Passord som er gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Direktenummer",
                           content: "Angi oppringingsnummer gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Angi APN (Access Point Name, tilgangspunktsnavn) gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Angi Brukernavn og Passord gitt av ISP. Disse feltene skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Koble til ved behov",
                           content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Av og til kan ikke tilkoblingen frakobles selv om du spesifiserer Max Idle Time, fordi noen programmer opprettholder forbindelsen til Internett i bakgrunnen."
                       } ,{                      
                           type: "name",
                           title: "Koble til automatisk",
                           content: "I denne modusen, kobler Internett-tilkoblingen seg automatisk til på nytt når den blir frakoblet."
                       } ,{                      
                           type: "name",
                           title: "Koble til manuelt",
                           content: "I denne modusen kan du klikke på knappen Koble til eller Koble fra for å styre Internett-forbindelsen manuelt. Denne modusen støtter også Max Idle Time-funksjonen. Skriv inn et maksimalt tidsforløp (i minutter) som Internett-tilkobling kan være inaktiv før den blir brutt, i Max Idle Time-feltet. Standardverdien er 15 minutter. Hvis du vil at Internett-forbindelsen skal forbli aktiv hele tiden, skriver du 0 (null)."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Av og til kan ikke tilkoblingen frakobles selv om du spesifiserer Max Idle Time, fordi noen programmer opprettholder forbindelsen til Internett i bakgrunnen."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk Lagre for å lagre innstillingene."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Hjelp med avanserte innstillinger for 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modem",
                           content: "Viser status for 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Bruk de automatisk identifiserte ISP-parameterne",
                           content: "Denne funksjonen er aktivert som standard. Hvis aktivert kan ruteren identifisere ISP for SIM-/UIM-kortet, og angi parameterne automatisk. Hvis identifikasjon mislykkes, velg Region og Mobil ISP manuelt."
                       } ,{                      
                           type: "name",
                           title: "Regional",
                           content: "Velger og vises region automatisk når identifisering av USB-modem og SIM-kortet er vellykket. Hvis ikke, velg region fra rullegardinlisten."
                       } ,{                      
                           type: "name",
                           title: "Mobil ISP",
                           content: "Viser ISP (Internet Service Provider) for 3G/4G-nettverket. Hvis ikke regionen din oppdages automatisk, må du velge en fra nedtrekkslisten. Standard innvalg-nummer og APN vil bli automatisk befolket tilsvarende."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Hvis SIM-/UIM-beskyttelse er aktivert, angi PIN-koden. SIM-/UIM-beskyttelse er deaktivert som standard. Merk at om du fyller inn ugyldig PIN 3 gange, vil SIM-/UIM-kortet blokkeres automatisk. Du kan kun låse det opp ved å angi PUK-koden fra PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "Melding",
                           content: "Viser PIN-informasjon til SIM-/UIM-kortet, hvis PIN-beskyttelse er aktivert."
                       } ,{                      
                           type: "name",
                           title: "Innstillinger Direktenummer,APN,Brukernavn/passord",
                           content: "Hvis ISP ikke er oppført i listen over <strong>Mobil ISP</strong>, velg denne luken og Oppringingsnummer, APN (Access Point Name, tilgangspunktsnavn), Brukernavn og Passord som er gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Direktenummer",
                           content: "Angi oppringingsnummer gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Angi APN (Access Point Name, tilgangspunktsnavn) gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Angi Brukernavn og Passord gitt av ISP. Disse feltene skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Koble til ved behov",
                           content: "I denne modusen, vil Internett-tilkoblingen avsluttes automatisk etter en viss tid uten aktivitet (Maks. tid uten aktivitet). Forbindelsen opprettes på nytt når du forsøker å få tilgang til Internett igjen."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Av og til kan ikke tilkoblingen frakobles selv om du spesifiserer Max Idle Time, fordi noen programmer opprettholder forbindelsen til Internett i bakgrunnen."
                       } ,{                      
                           type: "name",
                           title: "Koble til automatisk",
                           content: "I denne modusen, kobler Internett-tilkoblingen seg automatisk til på nytt når den blir frakoblet."
                       } ,{                      
                           type: "name",
                           title: "Koble til manuelt",
                           content: "I denne modusen kan du klikke på knappen Koble til eller Koble fra for å styre Internett-forbindelsen manuelt. Denne modusen støtter også Max Idle Time-funksjonen. Skriv inn et maksimalt tidsforløp (i minutter) som Internett-tilkobling kan være inaktiv før den blir brutt, i Max Idle Time-feltet. Standardverdien er 15 minutter. Hvis du vil at Internett-forbindelsen skal forbli aktiv hele tiden, skriver du 0 (null)."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Av og til kan ikke tilkoblingen frakobles selv om du spesifiserer Max Idle Time, fordi noen programmer opprettholder forbindelsen til Internett i bakgrunnen."
                       } ,{                      
                           type: "name",
                           title: "Godkjenningstype",
                           content: "Velg en autentiseringstype. Standard er Auto. Noen ISP-er krever en spesifikk autentiseringstype. Sjekk med ISP eller behold standardinnstillinger."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Hvis Auto (standard) brukes, vil ruteren automatisk finne autentiseringstypen som brukes av ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "PAP (Password Authentication Protocol) gjør at ruteren velger en node som bruker to håndtrykk for godkjenning. Velg dette alternativet hvis Internett-leverandøren krever denne godkjenningstypen."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "CHAP (Challenge Handshake Authentication Protocol) gjør at ruteren velger en node som bruker tre håndtrykk for godkjenning, og godkjenner nodens identitet periodisk. Velg dette alternativet hvis Internett-leverandøren krever denne godkjenningstypen."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard MTU (Maximum Transmission Unit, maksimum overføringsenhet) er 1480 bytes. Ikke endre dette med mindre ISP krever det."
                       } ,{                      
                           type: "name",
                           title: "Bruk følgende DNS-servere",
                           content: "Hvis ISP har DNS-server IP-adresser, velg denne luken og angi IP-adresser til <strong>Primær DNS</strong> og Sekundær DNS (valgfritt) under. Hvis ikke vil DNS-serveres tildeles automatisk av ISP."
                       } ,{                      
                           type: "name",
                           title: "Primær DNS",
                           content: "Angi DNS IP-adressen i stiplet desimalform som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Sekundær DNS",
                           content: "(Valgfritt) Angi en annen DNS IP-adresse i stiplet desimalform som gitt av ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk <strong>Lagre</strong> for å lagre innstillingene."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Enhetsinnstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Enhetsinnstillinger viser relatert informasjon om eventuelle USB-lagringsenheter som er tilkoblet via USB-porten."
                       } ,{                      
                           type: "name",
                           title: "Skann",
                           content: "Vanligvis oppdager ruteren automatisk enhver nylig tilkoblet enhet. Hvis det ikke er tilfelle, klikker du på denne knappen for å søke etter eventuelle nye tilkoblede enheter og oppdaterer siden med den nye informasjonen."
                       } ,{                      
                           type: "name",
                           title: "Volum",
                           content: "Viser navnet på USB-enheten."
                       } ,{                      
                           type: "name",
                           title: "Kapasitet",
                           content: "Viser total lagringskapasitet på USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Ledig plass",
                           content: "Viser nåværende ledig lagringsplass."
                       } ,{                      
                           type: "name",
                           title: "Trygg fjerning",
                           content: "Klikk på denne knappen for å trygt frakoble USB-lagringsenheten før du fysisk kobler den fra ruteren."
                       } ,{                      
                           type: "paragraph",
                           content: "Fjern-knappen vises kun når USB-lagringsenheten er koblet til ruteren. Når gjeldene volum er opptatt kan du ikke koble fra."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Denne avmerkingsboksen vises bare når en USB-lagringsenhet er koblet til ruteren. Velg for å aktivere fildeling av USB-enheten."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere en filserver",
       content: [ 
                "1. Koble USB-lagringsenheten til USB-porten på ruteren med en USB-kabel.",
                "2. Den nylig tilkoblede USB-enheten vil normalt oppdages automatisk av ruteren og vises på siden Enhetsinnstillinger. Hvis ikke, klikk på Skann.",
                "3. Velg Aktiv for å aktivere fildeling."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Konto for deling",
               CONTENT: [{
                           type: "name",
                           title: "Konto",
                           content: "Du kan enten velge å bruke standardkonto for å logge inn på delte filer og mapper eller velge Bruk ny konto og skriv inn det følgende for å opprette en ny brukerkonto."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Skriv inn et brukernavn mellom 1 og 15 alfanumeriske tegn eller understreker og et passord på mellom 1 og 15 ASCII-tegn. Feltene skiller mellom store og små bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Bekreft passord",
                           content: "Skriv inn passordet for å bekrefte at det ikke er noen skrivefeil. Dette feltet skiller også mellom små og store bokstaver."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk Lagre for å lagre alle innstillinger."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Innstillinger for deling",
               CONTENT: [{
                           type: "name",
                           title: "Nettverk/media-servernavn",
                           content: "Viser navnet som er brukt for å få tilgang til den tilkoblede USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Aktiver",
                           content: "Velges for å aktivere tilgangsmetoden."
                       } ,{                      
                           type: "name",
                           title: "Tilgangsmetode",
                           content: "Det er tre tilgangsmetoder som gir tilgang til den tilkoblede USB-lagringsenheten. Du kan velge en eller flere tilgangsmetoder ved å krysse av avmerkingsboksen.",
       children: [{                      
                           type: "name",
                           title: "Andre maskiner",
                           content: "Hvis aktivert, kan brukere på nettverket få tilgang til USB-lagringsenheten ved hjelp av en tildelt IP-adresse (f.eks \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Hvis aktivert, kan FTP-klientene på det lokale nettverket få tilgang til USB-lagringsenheten ved å bruke den tildelte IP-adressen, etterfulgt av FTP-serverens portnummer (f.eks. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internett)",
                           content: "Hvis funksjonen er aktivert, har eksterne brukere tilgang til USB-lagringsenheten gjennom FTP (Internett). Denne funksjonen støtter både nedlasting og opplasting av filer. For å endre FTP-serverens portnummer, angir du et portnummer og klikker på Lagre for å bruke endringene."
                       }]
} ,{                      
                           type: "name",
                           title: "Kobling",
                           content: "Viser adressen som er brukt for å få tilgang til den delte USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Viser portnummeret til FTP-serveren. Bruk standardverdien 21 eller en verdi mellom 1024 og 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk Lagre for å lagre alle innstillinger."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Mappedeling",
               CONTENT: [{
                           type: "name",
                           title: "Del alle",
                           content: "Slå på for å dele alle filer og mapper eller holde den av for å kun dele de spesifiserte mappene."
                       } ,{                      
                           type: "name",
                           title: "Aktiver godkjenning",
                           content: "Det er sterkt anbefalt å aktivere godkjenning slik at brukerne må angi gyldig brukernavn og passord for å få tilgang til delingsmapper."
                       } ,{                      
                           type: "name",
                           title: "Mappenavn",
                           content: "Viser navnet på den delte mappen."
                       } ,{                      
                           type: "name",
                           title: "Mappebane",
                           content: "Viser banen til den delte mappen."
                       } ,{                      
                           type: "name",
                           title: "Mediadeling",
                           content: "Angir om den delte mappen kan dele medier eller ikke."
                       } ,{                      
                           type: "name",
                           title: "Volumnavn",
                           content: "Viser navnet på den delte enheten."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser statusen til den delte mappen med lyspære-indikator."
                       } ,{                      
                           type: "name",
                           title: "Endre",
                           content: "Viser alternativer for å endre eller slette den korresponderende regelen."
                       } ,{                      
                           type: "name",
                           title: "Bla gjennom",
                           content: "Klikk for å søke etter en delt mappe."
                       } ,{                      
                           type: "name",
                           title: "Tillat gjester å bruke nettverket",
                           content: "Velg å gi klienter på gjestenettverket tilgang til de delte mappene."
                       } ,{                      
                           type: "name",
                           title: "Aktiver godkjenning",
                           content: "Velg å kreve at brukerne har tilgang til de delte mappene med et gyldig brukernavn og passord."
                       } ,{                      
                           type: "name",
                           title: "Aktiver skrivetilgang",
                           content: "Velg å tillate brukere å gjøre endringer i mappens innhold."
                       } ,{                      
                           type: "name",
                           title: "Aktiver mediadeling",
                           content: "Velges for å aktivere mediedeling."
                       } ,{                      
                           type: "name",
                           title: "Oppdater",
                           content: "Klikk for å oppdatere mappedeling-listen."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Skriverserver",
               CONTENT: [{
                           type: "name",
                           title: "Skriverserver",
                           content: "Dra til På for å aktivere Skriverserver-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Skrivernavn",
                           content: "Viser navnet på skriveren koblet til ruteren."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine sikkerhetskopierer alle filene dine fra en Mac til en USB-lagringsenhet som er koblet til modem-ruteren."
                       } ,{                      
                           type: "name",
                           title: "Aktiver ",
                           content: "Merk av i denne avkryssingsboksen for å aktivere Time Machine-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Disksikkerhetskopiering",
                           content: "Velg en plassering for Time Machine-sikkerhetskopiering."
                       } ,{                      
                           type: "name",
                           title: "Angi størrelsesbegrensning for sikkerhetskopiering",
                           content: "Tildel hvor mye diskplass som kan brukes til Time Machine-sikkerhetskopiering. 0 betyr at det ikke er en grense."
                       } ,{                      
                           type: "name",
                           title: "Lagre",
                           content: "Klikk for å lagre innstillingene."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline-nedlasting",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med Nedlasting offline aktivert kan ruteren laste ned filer uten å holde datamaskinen på hele tiden."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Dra til På for å aktivere Nedlasting offline-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Mappebane",
                           content: "Velg en katalogbane for å lagre eller bufre nedlastinger.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Ikke endre katalogbanen eller koble fra USB-lagringsenheten når du laster opp og ned filer, hvis ikke kan fatale feil oppstå."
                       }]
} ,{                      
                           type: "name",
                           title: "Tidsinnstilling",
                           content: "Velg luken for å aktivere Tidsinnstillingsfunksjonen som lar deg spesifisere tidsperioder for opp-/nedlasting av filer."
                       } ,{                      
                           type: "name",
                           title: "Forsett å laste opp etter at oppgaven er fullført",
                           content: "Velg luke for å fortsette å laste opp data fra fullførte nedlastinger til andre."
                       } ,{                      
                           type: "name",
                           title: "Maksimum antall aktive nedlastinger",
                           content: "Angi en verdi mellom 1 og 10 for å stille inn maksimum antall aktive nedlastinger. Standardverdien er 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Nedlastinger",
               CONTENT: [{
                           type: "note",
                           title: "Fil",
                           content: "Viser navn på og type nedlastingsfil."
                       } ,{                      
                           type: "note",
                           title: "Hastighet",
                           content: "Viser gjeldende nedlastings- (eller opplastings)-hastighet."
                       } ,{                      
                           type: "note",
                           title: "Fullført",
                           content: "Viser fremgangen til nedlastingen."
                       } ,{                      
                           type: "note",
                           title: "Gjenværende tid",
                           content: "Viser gjenværende tid for nedlastingen."
                       } ,{                      
                           type: "note",
                           title: "Tilkoblede noder",
                           content: "Viser antall tilkoblede noder for nedlastingen."
                       } ,{                      
                           type: "note",
                           title: "Status",
                           content: "Viser gjeldende status for nedlasting (laster ned, venter, poder, pauset, fullført, eller feil)."
                       } ,{                      
                           type: "name",
                           title: "For å legge til en ny nedlasting",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Klikk Legg til.",
                "2. Velg kilden du ønsker å laste ned, torrent fra PC, torrent fra USB, eller URL.",
                "3. Velg torrentplassering for BT, eller skriv inn URL for FTP, HTTP og aMule.",
                "4. Klikk på Lagre.",
                "5. For aMule, angi IP-adressen for aMule-serveren og -porten under Avansert > aMule-server."]
}]
} ,{                      
                           type: "name",
                           title: "For å slette nedlastinger",
                           content: "Velg korresponderende luke for nedlastingene du vil slette og klikk deretter Slett over listen."
                       } ,{                      
                           type: "name",
                           title: "For å pause nedlastinger",
                           content: "Velg korresponderende luke for nedlastingene du vil pause og klikk deretter Pause over listen."
                       } ,{                      
                           type: "name",
                           title: "For å gjenoppta nedlastinger",
                           content: "Velg korresponderende luke for nedlastingene du vil gjenoppta og klikk deretter Gjenoppta over listen."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avansert",
               CONTENT: [{
                           type: "name",
                           title: "Hastighetsgrenser",
                           content: "Spesifiser maksimum nedlastings- og opplastingshastighet for Internett-tilkobling."
                       } ,{                      
                           type: "name",
                           title: "Maksimum nedlastingshastighet",
                           content: "Angi en verdi mellom 1 og 100 000 kB for å angi maksimum nedlastingshastighet. Standardverdien er 1024."
                       } ,{                      
                           type: "name",
                           title: "Maksimum opplastingshastighet",
                           content: "Angi en verdi mellom 1 og 100 000 kB for å angi maksimum opplastingshastighet. Standardverdien er 512."
                       } ,{                      
                           type: "name",
                           title: "Antall tilkoblinger",
                           content: "Spesifiser maksimum antall tilkoblinger."
                       } ,{                      
                           type: "name",
                           title: "Globalt maksimum antall tilkoblinger",
                           content: "Angi en verdi mellom 1 og 200 for å stille inn det globale maksimum antallet tilkoblinger. Standardverdien er 100."
                       } ,{                      
                           type: "name",
                           title: "Maksimum antall tilkoblede noder per torrent",
                           content: "Angi en verdi mellom 1 og 100 for å stille inn maksimum antall noder per torrent. Standardverdien er 50."
                       } ,{                      
                           type: "name",
                           title: "Aktiver DHT-nettverket",
                           content: "Aktiver denne funksjonen for å forbedre effektiviteten for å finne noder slik at du kan øke nedlastingshastigheten."
                       } ,{                      
                           type: "name",
                           title: "Aktiver nodeutveksling",
                           content: "Aktiver denne funksjonen for å forbedre effektiv kommunikasjon mellom nodene, og øke nedlastingshastigheten."
                       } ,{                      
                           type: "name",
                           title: "Aktiver BitTorrent-protokollkryptering",
                           content: "Aktiver denne funksjonen for å styrke personvern og konfidensialitet under dataoverføring."
                       } ,{                      
                           type: "name",
                           title: "aMule-server",
                           content: "Angi IP-adresse og port for aMule-server. aMule-nedlastingen fungerer kun når ruteren er koblet til serveren."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Sperrefunksjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med sperrefunksjonen kan du blokkere upassende, eksplisitte og skadelige nettsteder, eller begrense tilgangen visse tider av døgnet (for eksempel Facebook eller YouTube under leksetid)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Enheter med sperrefunksjoner",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser informasjon og innstillinger for enheter som har aktivert sperrefunksjonen."
                       } ,{                      
                           type: "step",
                           title: "For å begrense en ny klient-enhet",
       content: [ 
                "1. Dra Sperrefunksjonen til På.",
                "2. Klikk på Legg til.",
                "3. Klikk Søk for å velge en tilkoblet enhet fra listen Tilgang til Enheter, eller angi Enhetsnavn og MAC-adresse manuelt for å legge til en enhet som ikke er koblet ti.",
                "4. Klikk på Effektiv tid-ikonet for å spesifisere en tidsperiode for begrensningen.",
                "5. Angi en kort beskrivelse i Beskrivelse-feltet. Dette feltet er valgfritt.",
                "6. Velg Aktiver denne oppføringen.",
                "7. Klikk på Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Innholdsbegrensning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Innholdsbegrensning lar deg begrense adgangen til visse nettsteder ved å bruke nøkkelord og domenenavn. Klientenhetene som kontrolleres av Sperrefunksjonen kan eller kan ikke gå inn på disse nettstedene, avhengig av begrensningene du velger."
                       } ,{                      
                           type: "step",
                           title: "For å bestemme innholdstilgang",
       content: [ 
                "1. Dra Innholdsbegrensning til På.",
                "2. Velg Begrensningstypen du trenger:",
                "A. Hvis du ønsker at kontrollerte enheter skal ha tilgang til alle nettsteder uten om de som er definert, velg svarteliste.",
                "B. Hvis du ønsker at kontrollerte enheter kun skal ha tilgang til visse nettsteder, velg hviteliste.",
                "3. Klikk Legg til et nytt nøkkelord for å legge et webadresse-nøkkelord (for eksempel Wikipedia) eller domenenavn til Blacklist eller Whitelist.",
                "4. Klikk på Lagre."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service, kvalitet på tjenester) hjelper deg prioritere Internettrafikk basert på dine behov. Du kan spesifisere prioriteringsnivå for en enhet, en fysisk port, eller en applikasjon i listen over QoS-regler."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Merk",
                           content: "Hvis NAT Boost er aktivert, bør QoS være deaktivert."
                       } ,{                      
                           type: "name",
                           title: "Last opp båndbredde",
                           content: "Angi maksimal opplastings båndbredde gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Last ned båndbredde",
                           content: "Angi maksimal nedlastings båndbredde gitt av ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avansert",
               CONTENT: [{
                           type: "name",
                           title: "Høy/Middels/Lav prioritet",
                           content: "Spesifiser en prosentandel for trafikk med høy/middels/lav prioritet.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Det maksimale antallet (prosent) for alle prioriteringer er 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS regelliste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Her kan du legge til detaljerte QoS-regler for prioritering av Internett-trafikk."
                       } ,{                      
                           type: "step",
                           title: "For å sette opp en QoS-regel",
       content: [ 
                "1. Klikk Legg til.",
                "2. Velg en prioritetstype å legge QoS-regelen til.",
                "Etter enhet - Klikk Søk for å velge ønsket enhet, eller manuelt angi et enhetsnavn og enhetens MAC-adresse.",
                "Etter program - Velg ønsket program eller tilpass et program ved å konfigurere navn, protokoll og destinasjonsport (1-65535). Du kan angi en enkel port eller flere porter eller et portutvalg, separert med kommaer (f.eks. 21,36-105,111).",
                "Etter fysisk port - Velg ønsket port.",
                "3. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Du kan dra en regel fra en prioritetslister for å endre dens prioritetsliste."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Databaseoppgradering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vi vil publisere den nyeste databaseversjonen på www.tp-link.com. Du kan laste ned og oppdatere ruterens database for å utvide dens støttede applikasjoner."
                       } ,{                      
                           type: "name",
                           title: "Ny databasefil",
                           content: "Klikk Bla gjennom for å finne den nyeste databasefilen. Velg denne og klikk Oppgrader for å oppgradere databasen til nyeste versjon."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Brannmur",
               CONTENT: [{
                           type: "name",
                           title: "SPI-brannmur",
                           content: "SPI-brannmur (Stateful Packet Inspection) forhindrer cyber-angrep og validerer trafikken som går gjennom ruteren basert på protokollen. Som standard, er denne funksjonen aktivert."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS-beskyttelse",
               CONTENT: [{
                           type: "name",
                           title: "DoS-beskyttelse",
                           content: "DoS (Denial of Service, tjenestenekt)-beskyttelse beskytter LAN-et mot DoS-angrep som kan oversvømme nettverket med serverforespørsler. Du kan filtrere de følgende tre typer angrep etter dine behov. Det er fire nivåer for hver filtrering:",
       children: [{                      
                           type: "name",
                           title: "Av",
                           content: "Ingen beskyttelse."
                       } ,{                      
                           type: "name",
                           title: "Lav",
                           content: "Lavt beskyttelsesnivå og liten innvirkning på ruterens ytelse."
                       } ,{                      
                           type: "name",
                           title: "Middels",
                           content: "Moderat beskyttelsesnivå med noe merkbar innvirkning på ruterens ytelse."
                       } ,{                      
                           type: "name",
                           title: "Høy",
                           content: "Høyt beskyttelsesnivå, men en merkbar innvirkning på ruterens ytelse."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Attack Filtering",
                           content: "Aktiver for å hindre oversvømmelsesangrep på ICMP (Internet Control Message Protocol, Internett-kontrollmeldingsprotokoll)."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Attack Filtering",
                           content: "Aktiver for å hindre oversvømmelsesangrep på UDP (User Datagram Protocol, brukerdatagramprotokoll)."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD Attack Filtering",
                           content: "Aktiver for å hindre oversvømmelsesangrep på TCP-SYN (Transmission Control Protocol-Synchronize, protokollsynkronisering av overføringskontroll)."
                       } ,{                      
                           type: "name",
                           title: "Ignorer Ping-pakke fra WAN-port",
                           content: "Aktiver for å ignorere pingpakker fra WAN-porten."
                       } ,{                      
                           type: "name",
                           title: "Forby Ping-pakke fra LAN-port",
                           content: "Aktiver for å ignorere pingpakker fra LAN-porten."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Liste med blokkerte DoS-verter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser IP-adresser og MAC-adresser til blokkerte DoC-verter."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Tilgangskontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tilgangskontroll brukes for å tillate eller blokkere bestemte klientenheter fra tilgang til nettverket. Når en enhet er blokkert, kan den ikke kommunisere med andre enheter eller koble til Internett."
                       } ,{                      
                           type: "step",
                           title: "For å kontrollere tilgang",
       content: [ 
                "1. Dra til På for å aktivere Tilgangskontroll.",
                "2. Hvis du også ønsker å kontrollere tilgangen til enheter koblet til Gjestenettverket, dra kontrollen for Gjesteenheter til På.",
                "3. Velg en tilgangsmodus som passer dine behov og klikk Lagre:",
                "A. Hvis du vil blokkere tilgang fra enhetene i listen under, velg Blacklist.",
                "B. Hvis du kun vil tillate tilgang fra enhetene i listen under, velg Whitelist.",
                "4. Klikk Legg til i Enheter i Blacklist-/Whitelist-seksjonen. Angi Enhetsnavn og MAC-adressen til enheten. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Enheter online",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser informasjonen til alle tilkoblede enheter (inkludert enheter koblet til Gjestenettverket, hvis Gjesteenhetskontroll er aktivert)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC-binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP- og MAC-binding (også kalt ARP-binding) er nyttig for å kontrollere tilgangen til en bestemt enhet i LAN-et ved å binde IP-adressen og MAC-adressen til enheten sammen. IP- og MAC-binding hindrer også andre enheter fra å bruke en bestemt IP-adresse."
                       } ,{                      
                           type: "step",
                           title: "For å konfigurere en enhet med IP- og MAC-binding",
       content: [ 
                "1. Klikk Legg til.",
                "2. Angi en MAC-adresse for enheten.",
                "3. Angi en IP-adresse du vil binde til MAC-adressen over.",
                "4. Velg Aktiver.",
                "5. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
       content: [ 
                "1. Du kan ikke binde sammen en IP-adresse til mer enn én MAC-adresse.",
                "2. Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP-liste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser MAC- og IP-adresser til tilkoblede enheter."
                       }]
},
       IPV6 :{ 
               TITLE:"Internett",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol version 6, Internettprotokoll, versjon 6) er den nyeste versjonen av IP (Internettprotokoll) og håndterer problemet med for mange adresser i IPv4 (Internet Protocol version 4, Internettprotokoll, versjon 4)."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: Dynamisk IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Velg denne typen hvis ISP bruker Dynamisk IPv6-adressetildeling."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse/Primær DNS/Sekundær DNS",
                           content: "Disse parameterne er automatisk gitt av DHCPv6-serveren fra ISP."
                       } ,{                      
                           type: "name",
                           title: "Forny",
                           content: "Klikk for å få nye IPv6-parametere fra DHCPv6-serveren til ISP."
                       } ,{                      
                           type: "name",
                           title: "Frigi",
                           content: "Klikk for å frigjøre alle IPv6-adresser tildelt av DHCPv6-serveren fra ISP."
                       } ,{                      
                           type: "name",
                           title: "Få IPv6-adresse",
                           content: "Velg DHCPv6 for å få en ikke-midlertidig IPv6-adresse, eller SLAAC for å få en IPv6-adresse generert fra ruterreklamepakken i henhold til ISP."
                       } ,{                      
                           type: "name",
                           title: "Prefiksdelegasjon",
                           content: "Velg Aktiver for å få en prefiksdelegasjon fra DHCPv6-serveren fra ISP, eller Deaktiver for å designere et adresseprefiks manuelt. Klienter på LAN vil generere en IPv6-adresse med dette prefikset."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Velg Hent dynamisk fra ISP eller Bruk følgende DNS-adresser. Hvis du velger Bruk følgende DNS-adresser, angir du manuelt DNS-adressen gitt av ISP."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: Statisk IP"
                       } ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Velg denne typen hvis ISP bruker Statisk IPv6-adressetildeling."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse/Standard Gateway/Primær DNS/Sekundær DNS",
                           content: "Skriv inn paremeterne du fikk oppgitt av din Internett-leverandør."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typiske størrelser på MTU (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 bytes. Det anbefales ikke å endre standard MTU-størrelse med mindre Internett-leverandøren krever dette."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: 6to4-tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4-tunnel",
                           content: "Velg denne typen hvis ISP bruker 6to4-distribusjonen for å tildele adresse."
                       } ,{                      
                           type: "name",
                           title: "IPv4-adresse/IPv4-nettverksmaske/IPv4 standard gateway/Tunnel-adresse",
                           content: "Disse parametrene vil genereres dynamisk av IPv4-informasjon for WAN-porten når du klikker på Koble til."
                       } ,{                      
                           type: "name",
                           title: "Bruk Følgende DNS-server",
                           content: "Velg for manuelt å angi primær og/eller sekundær DNS som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Koble til",
                           content: "Klikk for å koble til Internett."
                       } ,{                      
                           type: "name",
                           title: "Koble fra",
                           content: "Klikk for å koble fra Internett."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Velg denne typen hvis ISP bruker PPPoEv6, og gir et brukernavn og passord."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn/passord",
                           content: "Skriv inn paremeterne du fikk oppgitt av din Internett-leverandør."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse",
                           content: "Denne adressen vil automatisk tildeles av DHCPv6-serveren fra ISP etter at du fyller inn brukernavn og passord og klikker Koble til."
                       } ,{                      
                           type: "name",
                           title: "Få IPv6-adresse",
                           content: "Velg DHCPv6 for å få en ikke-midlertidig IPv6-adresse, eller SLAAC for å få en IPv6-adresse generert fra ruterreklamepakken, eller Spesifisert av ISP for å manuelt angi IPv6-adressen, i henhold til ISP."
                       } ,{                      
                           type: "name",
                           title: "Prefiksdelegasjon",
                           content: "Velg Aktiver for å få en prefiksdelegasjon fra DHCPv6-serveren fra ISP, eller Deaktiver for å designere et adresseprefiks manuelt. Klienter på LAN vil generere en IPv6-adresse med dette prefikset."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Velg Hent dynamisk fra ISP eller Bruk følgende DNS-adresser. Hvis du velger Bruk følgende DNS-adresser, angir du manuelt DNS-adressen gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Koble til",
                           content: "Klikk for å koble til Internett."
                       } ,{                      
                           type: "name",
                           title: "Koble fra",
                           content: "Klikk for å koble fra Internett."
                       } ,{                      
                           type: "title",
                            title: "Internett-tilkoblingstype: Gjennomgang (bro)"
                       } ,{                      
                           type: "paragraph",
                           content: "Velg denne typen hvis ISP bruker nettverksdistribusjonen Pass-Through (Bridge) (Direkte (Bro)). Ingen konfigurasjon er nødvendig for denne type kobling."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Utenom Internettilkoblingstypen Pass-Through (Bridge) (Direkte (Bro)), kreves de andre typene Internettilkobling IPv6-konfigurasjon."
                       } ,{                      
                           type: "name",
                           title: "Tildelt type",
                           content: "Velg den riktige i henhold til ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Automatisk tildele IP-adresser til klienter i LAN.",
       children: [{                      
                           type: "name",
                           title: "Adresseprefiks",
                           content: "Angi adresseprefiks som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Utløsingstid",
                           content: "Det er den gyldige tiden for den tildelte IP-adressen. Du kan enten beholde de standard 86 400 sekundene eller endre dette dersom påkrevd av ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adressen som er gitt automatisk av DHCPv6-serveren fra ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Tilstandsløs DHCP",
       children: [{                      
                           type: "name",
                           title: "Adresseprefiks",
                           content: "Angi adresseprefiks som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adressen tildelt av ISP-en."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Adresseprefiks",
                           content: "Angi adresseprefiks som gitt av ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adressen tildelt av ISP-en."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC Clone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg passende MAC Clone-metode."
                       } ,{                      
                           type: "name",
                           title: "IKKE klone MAC-adressen",
                           content: "IKKE endre ruterens standard MAC-adresse, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til MAC-adressen. "
                       } ,{                      
                           type: "name",
                           title: "Klone datamaskinens gjeldende MAC-adresse",
                           content: "Velg å kopiere gjeldende MAC-adresse til datamaskinen som er koblet til ruteren, i tilfelle Internett-leverandøren binder den tildelte IP-adressen til datamaskinens MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Bruk tilpasset MAC-adresse",
                           content: "Angi ruterens MAC-adresse manuelt, i tilfelle Internett-leverandøren ikke binder den tildelte IP-adressen til den spesifikke MAC-adressen."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Tidsinnstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tidsinnstillinger lar deg konfigurere systemtiden for ruteren. Når den er modifisert, vil systemtiden gjelde for tidsbaserte funksjoner og konfigurasjoner slik som Sperrefunksjoner."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Du kan dra til på for å aktivere 24-timersfunksjonen før konfigurasjon, og denne vil gjelde for systemtidsbaserte funksjoner og konfigurasjoner."
                       } ,{                      
                           type: "title",
                            title: "Systemtid"
                       } ,{                      
                           type: "step",
                           title: "For å hente tid fra Internett",
       content: [ 
                "Valgt som Standard, Hent fra Internett lar deg hente systemtiden fra Internett.",
                "1. Velg Hent fra Internett.",
                "2. Velg lokal tidssone fra rullegardinmenyen.",
                "3. I feltet NTP-server I angir du IP-adresse eller domenenavn for ønsket NTP-server.",
                "4. I NTP-server II-feltet skriver du inn IP-adressen eller domenenavnet til den andre NTP-serveren. (valgfritt)",
                "5. Klikk på Hent.",
                "6. Trykk Lagre"]
} ,{                      
                           type: "step",
                           title: "For å hente tid fra PC",
       content: [ 
                "Denne funksjonen lar deg hente systemtiden fra PC-en. Bekreft PC-tiden før konfigurering.",
                "Velg Hent fra PC og klikk på Lagre."]
} ,{                      
                           type: "step",
                           title: "For å stille inn tid manuelt",
       content: [ 
                "Hvis enheter ikke kan hente tiden automatisk fra Internett eller PC, kan du manuelt konfigurere systemtiden.",
                "1. Velg Manuelt.",
                "2. Angi nåværende Dato og Klokkeslett.",
                "3. Klikk Lagre."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Sommertid",
                           content: "Denne funksjonen kan automatisk synkronisere systemtiden med sommertid."
                       } ,{                      
                           type: "step",
                           title: "Konfigurere sommertid",
       content: [ 
                "1. Velg Aktiver sommertid.",
                "2. Spesifiser en tidsperiode for sommertid i den lokale tidssonen.",
                "3. Klikk Lagre."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnostikk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ruteren har Ping- og Traceroute-verktøy for å hjelpe deg finne og løse nettverksproblemer."
                       } ,{                      
                           type: "title",
                            title: "Ping og Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping-verktøyet sender pakker til IP-adressemål eller domenenavnmål og logger resultatene, slik som antall pakker sendt og mottatt, og tiden det tar tur/retur."
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute-verktøyet sender pakker til IP-adressemål eller domenenavnmål og viser antall hopp og tid brukt for å nå destinasjonen."
                       } ,{                      
                           type: "paragraph",
                           content: "Du kan pinge eller traceroute en lokal enhet via IP-adresse eller domenenavn, slik som tp-link.com, yahoo.com, osv."
                       } ,{                      
                           type: "step",
                           title: "Diagnostisere ved hjelp av Ping",
       content: [ 
                "1. Velg Ping som Diagnostisk Verktøy.",
                "2. Angi IP-adressemål eller domenenavnmål.",
                "3. Klikk på Pil-ikonet for å åpne Avansert-menyen og spesifisere Ping-tellere og Ping-pakkestørrelse. (Valgfritt)",
                "4. Klikk på Start."]
} ,{                      
                           type: "step",
                           title: "Diagnostisere ved hjelp av Traceroute",
       content: [ 
                "1. Velg Traceroute som Diagnostisk Verktøy.",
                "2. Angi IP-adressemål eller domenenavnmål.",
                "3. Klikk på Pil-ikonet for å åpne Avansert-menyen og spesifisere antall hopp (som skal nås) i feltet Traceroute Max TTL (Time to Live). Standard er 20. (Valgfritt)",
                "4. Klikk på Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Speiling av port"
                       } ,{                      
                           type: "paragraph",
                           content: "Portspeiling refererer til prosessen med å videresende kopier av pakker fra en speilet port til en speilende port. Vanligvis er den speilende porten koblet til er datadiagnostikkenhet, som brukes for å analysere de speilede pakkene for kontroll av og feilsøk i nettverket."
                       } ,{                      
                           type: "step",
                           title: "For å videresende kopier av pakker til angitt port",
       content: [ 
                "1. Aktiver portspeiling.",
                "2. Velg ønskede porter som skal speiles.",
                "3. Velg ønsket port som skal speile.",
                "4. Klikk på Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "En port kan ikke stilles inn som speilet port og speilende port samtidig."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Fastvareoppgradering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Fastvareoppgradering oppdaterer ruterens fastvare med nye funksjoner eller retting av programfeil. Det anbefales å oppgradere ruteren med den nyeste fastvaren for optimal ytelse."
                       } ,{                      
                           type: "step",
                           title: "Merk deg følgende for å hjelpe deg unngå oppgraderingsfeil:",
       content: [ 
                "Før oppgradering",
                "1. Sørg for at du har en stabil tilkobling mellom ruteren og datamaskinen. Det anbefales IKKE å oppgradere fastvare trådløst.",
                "2. Sørg for at du har fjernet alle USB-enheter som er koblet til ruteren.",
                "3. Husk å ta sikkerhetskopi av ruterens konfigurasjonsfil.",
                "Under oppgradering",
                "Ha ruteren SLÅTT PÅ til oppgraderingen er fullført."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"For å oppgradere fastvare online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Klikk på Oppgrader og bekreft når du blir bedt om det. Ruteren vil automatisk laste ned og oppgradere til nyeste fastvare. Du kan også klikke Se etter oppgradering for å se etter nyeste fastvareversjon."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"For å oppgradere fastvare manuelt",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Klikk på Støtte nederst på siden og last ned den nyeste fastvaren til datamaskinen. Sørg for at fastvarefilen du laster ned matcher ruterens maskinvareversjon som vist på siden.",
                "2. Klikk Bla gjennom og velg fastvarefilen du lastet ned.",
                "3. Klikk på Oppgrader."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Fastvareoppgraderingen tar noen minutter å fullføre. Ruteren vil automatisk starte på nytt når fastvareoppgraderingen er fullført."]
}]
},
       BACKUP :{ 
               TITLE:"Sikkerhetskopiering / gjenoppretting",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sikkerhetskopi- og gjenopprettingsfunksjonen lar deg sikkerhetskopiere ruterens nåværende innstillinger for gjenoppretting, eller du kan ganske enkelt tilbakestille ruteren til standardinnstillingene."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Du må IKKE slå av ruteren under sikkerhetskopiering eller gjenoppretting."
                       } ,{                      
                           type: "title",
                           title: "Sikkerhetskopier",
                           content: "Det er sterkt anbefalt at du sikkerhetskopierer gjeldende konfigurasjon i tilfelle det kreves en gjenoppretting for å få ruteren tilbake til den tidligere tilstanden."
                       } ,{                      
                           type: "step",
                           title: "Slik sikkerhetskopierer du nåværende konfigurasjon",
       content: [ 
                "1. Klikk Sikkerhetskopier.",
                "2. Vent til ruteren har sikkerhetskopiert nåværende konfigurasjon."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Gjenopprett",
                           content: "Du kan gjenopprette ruteren til en tidligere status fra en sikkerhetskopiert fil."
                       } ,{                      
                           type: "step",
                           title: "Gjenopprette fra en sikkerhetskopi",
       content: [ 
                "1. Klikk på Bla gjennom.",
                "2. Finn og velg sikkerhetskopifilen.",
                "3. Klikk på Gjenopprett."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Tilbakestille til fabrikkstandard",
       content: [ 
                "Fabrikkgjennopprettelse av ruteren fjerner all konfigurasjon og innstillinger og returnerer dem til fabrikkstandarder. For eksempel blir all informasjon om trådløst nettverk, foreldrekontroll og nettverk slettet.",
                "Etter tilbakestilling til fabrikkinnstillingene må du angi et nytt passord for å få tilgang til nettsiden for administrasjon av ruteren."]
}]
},
       REBOOT :{ 
               TITLE:"Reboot Schedule (Tidsplan for omstart)",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med funksjonen «Reboot Schedule» («Tidsplan for omstart») kan du tømme hurtigbufferen for å forbedre ruterens ytelse. Du kan starte ruteren manuelt eller stille den inn slik at den starter på nytt regelmessig."
                       } ,{                      
                           type: "step",
                           title: "For å omstarte manuelt",
       content: [ 
                "Klikk på Omstart og vent et par minutter for at ruteren skal starte på nytt."]
} ,{                      
                           type: "step",
                           title: "Slik stiller du inn en tid for omstart",
       content: [ 
                "1. Aktiver «Reboot Schedule»",
                "2. Angi når og hvor ofte ruteren skal starte på nytt. Dette gjør du ved å spesifisere parameterne i feltene «Reboot Time» («Tid for omstart») og «Repeat» («Gjenta»).",
                "3. Klikk Lagre."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administrasjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "I «Administration» («Administrasjon») kan du administrere påloggingspassordet og tilgangstillatelsen til klienter som er tilkoblet ruteren."
                       } ,{                      
                           type: "name",
                           title: "Kontobehandling",
                           content: "Denne funksjonen lar deg endre passordet.",
       children: [{                      
                           type: "step",
                           title: "For å endre passordet",
       content: [ 
                "1. Oppgi gammelt passord.",
                "2. Oppgi nytt passord.",
                "3. Bekreft nytt passord.",
                "4. Klikk på Lagre."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Gjenoppretting av passord",
               CONTENT: [{
                           type: "name",
                           title: "Gjenoppretting av standardpassord",
                           content: "I «Default Password Recovery» («Gjenoppretting av standard passord») kan du gjenopprette det standard påloggingspassordet uten å tilbakestille ruteren til fabrikkinnstillingene.",
       children: [{                      
                           type: "step",
                           title: "For å endre passordet",
       content: [ 
                "1. Aktiver standard tilbakestillingsfunksjon for passord.",
                "2. I Fra-feltet skriver du inn en gyldig e-postadresse som vil brukes til å sende en verifiseringskode for å tilbakestille påloggingsinformasjonen.",
                "3. I Til-feltet skriver du inn en gyldig e-postadresse som du ønsker å motta verifiseringskoden på.",
                "4. Skriv inn SMTP-server for utgående e-post (Fra).",
                "5. Hvis e-posten i Fra-feltet krever kryptering, må du velge Aktiver godkjenning-boksen og oppgi brukernavn (e-postadresse) og passord.",
                "6. Trykk Lagre"]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Lokal behandling",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med denne funksjonen får lokale enheter tilgang til og kan administrere ruteren."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Lokal behandling via HTTPS",
                           content: "Aktiver lokal behandling via HTTPS dersom du ønsker tilgang til ruteren både via HTTPS og HTTP, eller deaktiver dersom du bare ønsker tilgang til ruteren via HTTP."
                       } ,{                      
                           type: "name",
                           title: "Tilgang for alle LAN-tilkoblede enheter",
                           content: "Skru på for å aktivere behandling for alle enhetene som er koblet til LAN eller la stå av for å aktivere behandling for en bestemt enhet."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Viser MAC-adressen for enheten med begrenset tilgang."
                       } ,{                      
                           type: "name",
                           title: "Beskrivelse",
                           content: "Viser beskrivelsen for enheten med begrenset tilgang."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser gjeldende status for enhet med begrenset tilgang (aktivert eller deaktivert)."
                       } ,{                      
                           type: "name",
                           title: "Endre",
                           content: "Viser alternativer for å Endre eller Slette den tilhørende oppføringen fra listen."
                       } ,{                      
                           type: "step",
                           title: "Legge til en klientenhet i listen",
       content: [ 
                "1. Klikk Legg til.",
                "2. Klikk Vis eksisterende enheter for å velge en eksisterende enhet, eller angi MAC-adressen til enheten i MAC-adressefeltet.",
                "3. Skriv inn en beskrivelse for denne enheten.",
                "4. Velg Aktiver.",
                "5. Klikk OK."]
} ,{                      
                           type: "step",
                           title: "For å endre eller slette en enhet i listen",
                           content: "I tabellen klikker du på Rediger-ikonet eller papirkurven for regelen som du ønsker å endre eller slette."
                       } ,{                      
                           type: "step",
                           title: "Slette flere enheter",
                           content: "Velg alle enhetene som du ønsker å slette, og klikk på Slett over tabellen."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Ekstern behandling",
               CONTENT: [{
                           type: "name",
                           title: "Ekstern behandling",
                           content: "Fjernstyringsfunksjonen lar fjernenheter få tilgang til og styre ruteren.",
       children: [{                      
                           type: "step",
                           title: "For å nekte alle fjernenheter tilgang til ruteren",
                           content: "Velg Deaktiver fjernstyring og klikk på Lagre."
                       } ,{                      
                           type: "step",
                           title: "For å gi alle fjernenheter tilgang til ruteren",
       content: [ 
                "1. Aktiver ekstern behandling for ALLE enheter.",
                "2. Skriv inn webstyringsport (1024-65535 eller 80) som de eksterne enhetene vil få tilgang til ruteren gjennom.",
                "3. Klikk Lagre."]
} ,{                      
                           type: "step",
                           title: "For å gi en bestemt fjernenhet tilgang til ruteren",
       content: [ 
                "1. Aktiver ekstern behandling for en bestemt enhet.",
                "2. Skriv inn webstyringsport (1024-65535 eller 80) som den eksterne enheten vil få tilgang til ruteren gjennom.",
                "3. Angi IP-adressen for Fjerbehandling av den eksterne enheten for å administrere ruteren.",
                "4. Klikk på Lagre."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Ekstern behandling",
               CONTENT: [{
                           type: "paragraph",
                           content: "Eksternbehandling-funksjonen lar deg få tilgang til og konfigurere ruteren eksternt fra Internett."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Slik setter du opp fjernbehandling"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Velg avkrysningsboksen for å aktivere fjernbehandling."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Behold HTTPS-porten og HTTP-porten som standardinnstillinger."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Velg hvilken fjern enhet som skal ha fjerntilgang til ruteren:",
       children: [{                      
                           type: "name",
                           title: "Alle enheter",
                           content: "Alle fjerne enheter skal ha tilgang til ruteren."
                       } ,{                      
                           type: "name",
                           title: "Spesifisert enhet",
                           content: "Skriv inn IP-adressen til den fjerne enheten som skal ha tilgang til ruteren."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Klikk på Lagre."
                       } ,{                      
                           type: "paragraph",
                           content: "Når kan du fjernbehandle ruteren via adressen som vises under «Nettadresse for behandling»."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis det dukker opp en advarsel når du besøker adressen over, kan du klikke på «Tillat» (eller lignende) for å fortsette."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Når Nattmodus er aktiver vil LED-lysene være av en bestemt periode hver dag, uten at dette påvirker ruterens ytelse."
                       } ,{                      
                           type: "step",
                           title: "For å aktivere Nattmodus",
       content: [ 
                "1. Velg aktiver Nattmodus.",
                "2. Spesifiser en periode for når LED-lysene skal være av.",
                "3. Klikk Lagre."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Systemlogg",
               CONTENT: [{
                           type: "paragraph",
                           content: "Systemloggen vises de siste aktivitetene til ruteren. Listen består av type, nivå og logginnhold i systemloggene som kan filtreres for å vises. Du kan også lagre systemloggene til den lokale datamaskinen eller sende den på e-post."
                       } ,{                      
                           type: "step",
                           title: "For å lagre systemlogger til den lokale datamaskinen",
       content: [ 
                "1. Still inn Type og minimumsnivå for å filtrere ønskede systemlogger. Nivålisten er i minkende rekkefølge, med laveste nivå oppgitt sist.",
                "2. Klikk Lagre logg for å lagre systemloggfiler til den lokale datamaskinen."]
} ,{                      
                           type: "step",
                           title: "For å motta systemlogger via e-post",
       content: [ 
                "1. Still inn Type og Nivå for å filtrere ønskede systemlogger. Nivålisten er i minkende rekkefølge, med laveste nivå oppgitt sist.",
                "2. Klikk på E-postinnstillinger.",
                "3. I Fra-feltet angir du en gyldig e-postadresse som skal brukes som utgående e-post.",
                "4. I Til-feltet angir du en gyldig e-postadresse som skal brukes som innkommende e-post.",
                "5. Angi SMTP-serveradresse for utgående e-post (Fra).",
                "Merk: Hvis utgående e-post krever autentisering, velg luken for Aktiver autentisering og angi brukernavn (e-postadressen) og passord.",
                "6. Hvis du vil motta systemlogger på e-post regelmessig, velg luken for Aktiver automatisk e-post og still inn en bestemt til (i 24-timers klokkeformat) eller en tidsintervall.",
                "Hvis du vil motta gjeldende systemlogger øyeblikkelig, klikke på Send logg nå.",
                "7. Klikk på Lagre."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Overvåkning av trafikk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser trafikkbruken til en enhet de siste 10 minuttene, eller bruken til alle enheter de siste 10 minutter/24 timer/7 dager."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Liste for overvåkning av trafikk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Listen er gruppert etter tilkoblingstypen til enhetene: kablet eller trådløs."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Systemparameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Trådløst 2,4 GHz/5 GHz",
                           content: "Denne seksjonen lar deg konfigurere parametere for trafikkoverføringsregler i trådløse nettverk. Det anbefales å beholde standardinnstillinger hvis du ikke er sikkert på hvilke du skal bruke."
                       } ,{                      
                           type: "name",
                           title: "Signalintervall",
                           content: "Angi en verdi mellom 40 og 1000 i millisekunder for å bestemme varigheten mellom beacon-pakker som sendes ut av ruteren for å synkronisere trådløst nettverk. Standardverdien er 100 millisekunder."
                       } ,{                      
                           type: "name",
                           title: "RTS-terskel",
                           content: "Angi en verdi mellom 1 og 2346 for å bestemme pakkestørrelse på dataoverføring gjennom ruteren. Standard størrelse på RTS-terskel (Request to Send) er 2346. Dersom pakkestørrelsen er større enn den forhåndsinnstilte terskelen, sender ruteren RTS-rammer til en bestemt mottakerstasjon og forhandler sending av en dataramme, ellers vil pakken sendes umiddelbart."
                       } ,{                      
                           type: "name",
                           title: "DTIM-intervall",
                           content: "Denne verdien bestemmer intern DTIM (Delivery Traffic Indication Message, indikeringsmelding for leveringstrafikk). Angi en verdi mellom 1 og 15 intervaller. Standardintervall er 1, og indikerer at DTIM-intervallet er det samme som Beacon-intervallet."
                       } ,{                      
                           type: "name",
                           title: "Oppdateringsperiode for gruppenøkkel",
                           content: "Skriv inn antall sekunder (minimum 30) for å kontrollere tidsintervallet for automatisk fornyelse av krypteringsnøkkelen. Standardverdien er 0, som indikerer at ingen nøkkelfornyelse eksisterer."
                       } ,{                      
                           type: "name",
                           title: "WMM-funksjon",
                           content: "WMM-funksjonen garanterer at pakker med høyt prioriterte meldinger sendes fortrinnsvis. Den er aktivert som standard og anbefales."
                       } ,{                      
                           type: "name",
                           title: "Kort GI-funksjon",
                           content: "Denne funksjonen er aktivert som standard og anbefales for å øke pakkekapasiteten etter GI (Guard Interval, vaktintervall)-tiden."
                       } ,{                      
                           type: "name",
                           title: "AP-isolasjonsfunksjon",
                           content: "Hvis du vil innskrenke og begrense alle trådløse enheter som er koblet til nettverket i å samhandle med hverandre, men vil at de fortsatt skal ha tilgang til Internett, velg luken Aktiver AP-isolasjon."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2,4GHz/5GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "For å aktivere WDS",
                           content: "Funksjonen for bro danning av WDS (Wire less Distributiv System, trådløst registreringssystem) lar deg utvide den trådløse nettverksdekningen ved å bygge en bro med et AP (accessit pint, tilgangspunkt) i et trådløst WLAN (lokalt nettverk)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Velg for å aktivere funksjonen for brodanning av WDS.",
                "2. For å bygge en bro med et nettverk med en Søk-funksjon, klikk på Søk, vis alle tilgjengelige nettverk, og velg nettverket du vil bygge bro med. SSID (nettverksnavn), MAC-adresse og Sikkerhet vil automatisk fylles inn.",
                "Eller for å bygge bro til et nettverk manuelt: Angi SSID (nettverksnavn), MAC-adresse og WDS-modus for nettverket som skal bygges bro til. Velg en Sikkerhets-type og angi relevante parametere, som skal være de samme som nettverket som skal bygges bro til.",
                "3. Klikk Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du ikke er sikker på WDS-modusen beholder du standardalternativet Automatisk."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup, trådløst beskyttet oppsett) lar deg enkelt koble WPS-aktiverte enheter til ruteren ved å trykke på WPS-knappen. Huk av for å aktivere WPS-funksjonen og klikk Lagre."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Denne funksjonen er aktivert som standard. Det anbefales å beholde standardinnstillingen. Hvis du deaktiverer den kan du miste tilgangen til Internett."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Når NAT er deaktivert, vil konfigurasjoner i NAT-videresending ikke tre i kraft."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Velg luken Aktiver NAT Boost og klikk Lagre for å sørge for at ruteren har best mulig gjennomstrømming."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Merk",
                           content: "Når NAT Boost er aktivert, vil QoS- og Trafikkstatistikk deaktiveres automatisk."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS-beskyttelsesinnstillinger",
                           content: "DOS-beskyttelse beskytter ruteren fra angrep fra ICMP-FLOOD, UDP-FLOOD og TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "Nivå for ICMP-FLOOD-pakker",
                           content: "Angi en verdi mellom 5 og 7 200 for å aktivere ICMP-FLOOD-beskyttelsen øyeblikkelig når antall ICMP-pakker overskrider forhåndsinnstilt terskelverdi."
                       } ,{                      
                           type: "name",
                           title: "Nivå for UPD-FLOOD-pakker",
                           content: "Angi en verdi mellom 5 og 7 200 UDP for å aktivere UDP-FLOOD-beskyttelsen øyeblikkelig når antall UDP-pakker overskrider forhåndsinnstilt terskelverdi."
                       } ,{                      
                           type: "name",
                           title: "Nivå for TCP-FLOOD-pakker",
                           content: "Angi en verdi mellom 5 og 7 200 TCP-SYN for å aktivere TCP-SYN-FLOOD-beskyttelsen øyeblikkelig når antall TCP-pakker overskrider forhåndsinnstilt terskelverdi."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Dupleks",
                           content: "Velg duplekstype fra rullegardinlisten og klikk Lagre."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Aktiver nattmodus",
                           content: "Velg denne avmerkingsboksen for å slå av LED-lamper i nattmodus uten å påvirke ruterens ytelse."
                       } ,{                      
                           type: "name",
                           title: "Periode for nattmodus",
                           content: "Angi et tidsrom der nattmodus gjelder."
                       } ,{                      
                           type: "paragraph",
                           content: "Klikk på Lagre for å lagre alle innstillingene."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med OpenVPN kan du bruke Internett til å få trygg tilgang til nettverket når du er utenfor hjemmet. For å bruke VPN-tjenesten må du konfigurere Dynamisk DNS-tjenesten (anbefalt) eller tildele en statisk IP-adresse for ruterens WAN-port. Og systemtiden må synkroniseres med Internett."
                       } ,{                      
                           type: "name",
                           title: "Tjenestetype",
                           content: "Velg kommunikasjonsprotokoll for OpenVPN-serveren: UDP eller TCP."
                       } ,{                      
                           type: "name",
                           title: "Tjenesteport",
                           content: "Angi et kommunikasjonsportnummer mellom 1024 og 65535. Standard og vanlig tjenesteport er 1194."
                       } ,{                      
                           type: "name",
                           title: "VPN delnett/nettmaske",
                           content: "Skriv inn et utvalg IP-adresseområder som kan leies ut til klientene med OpenVPN-serveren."
                       } ,{                      
                           type: "name",
                           title: "Klienttilgang",
                           content: "Velg tilgangstype for OpenVPN-klienten.",
       children: [{                      
                           type: "name",
                           title: "Kun hjemmenettverk",
                           content: "Klienten kan kun gå inn på hjemmenettverket. Klientens standardruter vil ikke endres."
                       } ,{                      
                           type: "name",
                           title: "Internett og hjemmenettverk",
                           content: "Klienten kan gå inn på hjemmenettverket og Internett-sider eller -tjenester med en geografisk begrensning når du er ute av landet. Klientens standardruter vil ikke endres."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Sertifikat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Bruk sertifikatet for å innhente informasjon om, og identiteten til, VPN-tilkoblingen for den eksterne datamaskinen.",
                "Klikk for å generere et nytt sertifikat."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Konfigurasjonsfil",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Fjernkunder vil bruke konfigurasjonsfilen for å få tilgang til din ruter.",
                "Klikk på denne knappen for å lagre OpenVPN-konfigurasjonsfilen som skal brukes til å legge til en ny VPN-tilkobling."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Installasjonsveiledning for VPN-klient",
               CONTENT: [{
                           type: "step",
                           title: "For å koble klientenhetene til OpenVPS-serveren:",
       content: [{                      
                           type: "paragraph",
                           content: "Før du konfigurerer OpenVPS-serveren, konfigurer Dynamisk DNS-tjenesten (anbefalt) eller tildel en statisk IP-adresse for WAN-porten. Og sørg for at den eksterne porten for NAT-innstillinger ikke er tjenesteporten, og systemtiden er synkronisert med Internett."
                       },
                "1. Velg Aktiver VPN-server.",
                "2. Konfigurer OpenVPN-serverparametere (tjenestetype, tjenesteport, klienttilgang og VPN-undernett-/nettmaske) og klikk Lagre.",
                "3. Klikk Eksporter for å lagre konfigurasjonsfilen.",
                "4. På klientenhetene laster du ned og installerer OpenVPN-klientverktøy fra <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "De offisielle støttede plattformene inkluderer Windows, MAC OSX og Linux.",
                "5. Kjør OpenVPN-klientverktøy og legg til en ny VPN-tilkobling ved å bruke den lagrede konfigureringsfilen til å koble klientenheten til VPN-serveren."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "For å lære mer om OpenVPN-klienter, kan du besøke <a class=\"link\"href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med PPTP VPN kan du bruke Internett til å få trygg og rask tilgang til nettverket når du er utenfor hjemmet. Det kan hindres av noen ISP. For å bruke VPN-tjenesten må du konfigurere Dynamisk DNS-tjenesten (anbefalt) eller tildele en statisk IP-adresse for ruterens WAN-port. Og systemtiden må synkroniseres med Internett."
                       } ,{                      
                           type: "name",
                           title: "Klient-IP-adresse",
                           content: "Skriv inn et utvalg IP-adresseområder (opptil 10 klienter) som kan leies ut til klientene med PPTP VPN-serveren."
                       } ,{                      
                           type: "name",
                           title: "Brukernavn og passord",
                           content: "Skriv inn brukernavn og passord for å godkjenne klienter for tilgang til PPTP VPN-serveren."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Installasjonsveiledning for VPN-klient",
               CONTENT: [{
                           type: "step",
                           title: "For å koble klientenhetene til PPTP VPN-serveren:",
       content: [{                      
                           type: "paragraph",
                           content: "Før du konfigurerer PPTP VPN-serveren, konfigurer Dynamisk DNS-tjenesten (anbefalt) eller tildel en statisk IP-adresse for WAN-porten. Sørg for at den eksterne porten for NAT-innstillinger ikke er 1723 og at systemtiden er synkronisert med Internett."
                       },
                "1. Velg Aktiver VPN-server.",
                "2. Konfigurer PPTP VPN-serverparameterne og klikk Lagre.",
                "3. På klientenhetene oppretter du en PPTP VPN-tilkobling. De offisielle støttede plattformene inkluderer Windows, MAC OSX, Linux, iOS, og Android.",
                "4. Kjør PPT VPN-programmet, legg til en ny tilkobling og angi domenenavn for den registrerte DDNS-tjenesten eller den statiske IP-adressen som er tildelt WAN-porten, for å koble klientenheten til PPTP VPN-serveren."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN-tilkoblinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne siden viser alle klienter som er koblet til OpenVPN-serveren og PPTP VPN-servere driftes ruteren."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Nettverkskart",
               CONTENT: [{
                           type: "paragraph",
                           content: "I Nettverkskartet kan du se gjeldende nettverkstilkoblingsstatus og trådløs informasjon for ruteren og informasjon om tilkoblede enheter."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internett",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser gjeldende Internett-informasjon."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Ruter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser gjeldende nettverksinformasjon for de trådløse nettverkene og LAN-portene."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Kablede/trådløse klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser nettverksnavnet (kan endres) og tildelte IP-og MAC-adresser til klientene som er koblet til ruteren."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Skriver",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser navn på skriveren som er koblet til ruteren via en USB-port."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB-enhet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevant informasjon for USB-disken som er koblet til ruteren via USB-porten."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Hastighetstest",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funksjonen tester den nåværende opplastings- og nedlastingshastigheten fra internettleverandøren din, og gir nyttige råd om kapasiteten til nettet ditt."
                       } ,{                      
                           type: "paragraph",
                           content: "Tips: Resultatet blir mer nøyaktig dersom du lukker andre apper og programmer."
                       } ,{                      
                           type: "paragraph",
                           content: "Historikk: en oversikt over tidligere hastighetstester."
                       } ,{                      
                           type: "paragraph",
                           content: "Test en gang til: Klikk for å utføre en hastighetstest."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internett",
               CONTENT: [{
                           type: "paragraph",
                           content: "Klikk Oppdag automatisk eller velg tilkoblingstype for Internett manuelt. Angi deretter korresponderende parametere gitt av ISP."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg dette alternativet for å aktivere Smart Connect. Denne funksjonen bidrar til raskere ytelse av enhetene, ved å tilordne dem til beste trådløse bånd basert på faktiske forhold og dermed balansere nettverkskrav."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Trådløsinnstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Du kan konfigurere de trådløse innstillingene (SSID, passord, osv.)"
                       } ,{                      
                           type: "name",
                           title: "Nettverksnavn (SSID)",
                           content: "Du anbefales å bytte nettverksnavn (SSID). Dette feltet skiller mellom små og store bokstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Velg hvis du vil gjemme 2,4 GHz/5GHz-nettverksnavnet (SSID) fra listen over trådløse nettverk. Når valgt, vil SSID ikke kringkastes og du må registrere deg på nettverket manuelt."
                       } ,{                      
                           type: "name",
                           title: "Passord",
                           content: "Skriv inn et trådløst passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn. Dette feltet skiller mellom store og små bokstaver."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB-lagringsenhet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funksjonen lar deg dele USB-lagringsenheter blant forskjellige klienter i det lokale nettverket eller via Internett."
                       } ,{                      
                           type: "title",
                           title: "Enhetsinnstillinger",
                           content: "Enhetsinnstillingene vises basisinformasjonen til USB-lagringsenheten som er koblet til via USB-porten. En USB-flashdisk har vanligvis kun ett volum."
                       } ,{                      
                           type: "name",
                           title: "Skann",
                           content: "Vanligvis oppdager ruteren en nylig tilkoblet enhet automatisk. Hvis ikke kan du klikke på denne knappen for å søke og oppdatere skjermen med oppdatert informasjon.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Et grått område representerer et deaktivert volum. Du kan klikke på området for å dele det bestemte volumet."
                       }]
} ,{                      
                           type: "name",
                           title: "Fjern",
                           content: "Klikk på denne knappen for trygt å koble fra USB-lagringsenheten før du trekker den ut fysisk fra USB-porten.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Fjern-knappen vises kun når USB-lagringsenheten er koblet til ruteren. Når gjeldene volum er opptatt kan du ikke koble fra."
                       }]
} ,{                      
                           type: "step",
                           title: "Konfigurere en filserver",
       content: [ 
                "1. Koble USB-lagringsenheten til USB-porten direkte eller med en USB-kabel. Hvis enheten krever buntet ekstern strøm, sørg for at den eksterne strømmen er tilkoblet.",
                "2. Den nylig tilkoblede USB-enheten skal oppdages automatisk av ruteren og vises under Enhetsinnstillinger. Hvis ikke, klikk Søk.",
                "Merk: Dele-ikonet vises når mer enn 5 volumer er koblet til ruteren. Du kan klikke på ikonet for å deaktivere volumer du ikke trenger å dele."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Tilgangsadresse",
               CONTENT: [{
                           type: "name",
                           title: "Nettverk/media-servernavn",
                           content: "Viser navn som ble brukt for å få tilgang til den tilkoblede USB-lagringsenheten gjennom Nettverksnabolag-metoden eller Mediedelingsfunksjonen. Den er TP-Share som standard."
                       } ,{                      
                           type: "name",
                           title: "Tilgangsmetode",
                           content: "Det er 4 metoder for å få tilgang til den delte USB-lagringsenheten.",
       children: [{                      
                           type: "name",
                           title: "Andre maskiner",
                           content: "Velg dette alternativet for å gi brukerne på nettverket tilgang til det delte innholdet via adressen vist i Adresse-kolonnen."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Velg dette alternativet for å aktivere FTP-serverfunksjonen som gir FTP-klienter og brukere på nettverket tilgang til USB-lagringsenheten via FTP-adressen vist i Adresse-kolonnen."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internett)",
                           content: "Velg dette alternativet for å gi FTP-klienter og brukere fjerntilgang, og la dem laste ned og opp filer fra/til den delte USB-lagringsenheten gjennom FTP over Internett. For å tilpasse tilgang, klikk på Endre og konfigurer Dynamisk DNS for ruteren. For å endre FTP-serverporten, angi et nytt portnummer og klikk Lagre for å aktivere endringene."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Velg dette alternativet for å aktivere SFTP-serverfunksjonen som gjør det mulig for SFTP-klienter og brukere på nettverket å få tilgang til USB-lagringsenheten via SFTP-adressen som vises under adressekolonnen."
                       }]
} ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Viser adressen som er brukt for å få tilgang til den delte USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Viser portnummeret som brukes for tilgang til FTP-serveren."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Dele innhold",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser mappene du deler. Alle mapper er delt som standard. Du kan klikke på Endre-ikonet for å tilpasse de delte mappene."
                       } ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Dele-ikonet vises i seksjonen for Enhetsinnstillinger når mer enn 5 volumer er koblet til ruteren. Du kan klikke på Dele-ikonet for å deaktivere volumer du ikke trenger å dele."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Dele innhold og sikkerhet",
               CONTENT: [{
                           type: "name",
                           title: "Dele innhold",
                           content: "Viser mappene du deler. Alle mapper er delt som standard. Du kan klikke på Endre-ikonet for å tilpasse de delte mappene.",
       children: [{                      
                           type: "note",
                           title: "Merk",
                           content: "Dele-ikonet vises i seksjonen for Enhetsinnstillinger når mer enn 5 volumer er koblet til ruteren. Du kan klikke på Dele-ikonet for å deaktivere volumer du ikke trenger å dele."
                       }]
} ,{                      
                           type: "name",
                           title: "Godkjent tilgang",
       content: [ 
                "Slå På for å aktivere autentisering som krever at brukerne må oppgi et gyldig brukernavn og passord for å få tilgang til alle de delte mappene. Med administratortilgang kan filene leses og endres, mens brukere bare kan lese filene.",
                "Brukernavnet bør begynne med en bokstav eller en understrek, og inneholder 1 til 15 tegn med bokstaver, tall og understreker.",
                "Passordet bør inneholde 1 til 15 tegn bestående av bokstaver, tall og understreker."]
} ,{                      
                           type: "name",
                           title: "Tillat gjester å bruke nettverket",
                           content: "Dra til På for å gi gjestebrukere på nettverket tilgang til alle delte mappene."
                       } ,{                      
                           type: "name",
                           title: "Aktiver mediadeling",
                           content: "Når denne funksjonen er aktivert har alle DLNA-støttede enheter i det lokale nettverket tilgang til mediefiler i alle delte mapper. Brukere vil ikke bli bedt om brukernavn og passord dersom Godkjent tilgang er aktivert."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Skriverserver",
               CONTENT: [{
                           type: "name",
                           title: "Skriverserver",
                           content: "Dra til På for å aktivere Skriverserver-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Skrivernavn",
                           content: "Viser navnet på skriveren koblet til ruteren."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Sperrefunksjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "De grunnleggende innstillingene for sperrefunksjonen lar deg begrense tilgang visse tider på dagen (for eksempel, ingen Internett-tilgang fra barnets PC under leksetid)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Enheter med sperrefunksjoner",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne listen viser informasjon og innstillinger for enheter som har aktivert sperrefunksjonen."
                       } ,{                      
                           type: "step",
                           title: "For å begrense en ny klient-enhet",
       content: [ 
                "1. Dra Sperrefunksjonen til På.",
                "2. Klikk på Legg til.",
                "3. Klikk Søk for å velge en tilkoblet enhet fra listen Tilgang til Enheter, eller angi Enhetsnavn og MAC-adresse manuelt for å legge til en enhet som ikke er koblet ti.",
                "4. Klikk på Effektiv tid-ikonet for å spesifisere en tidsperiode for begrensningen.",
                "5. Angi en kort beskrivelse i Beskrivelse-feltet. Dette feltet er valgfritt.",
                "6. Velg Aktiver denne oppføringen.",
                "7. Klikk på Lagre."]
} ,{                      
                           type: "note",
                           title: "Merk",
                           content: "Hvis du vil deaktivere denne oppføringen, klikk på Lyspære-ikonet."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Gjestenettverk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funksjonen lar deg gi gjester trådløs tilgang uten å avsløre hovednettverket."
                       } ,{                      
                           type: "name",
                           title: "Gi gjestene tilgang til hverandre",
                           content: "Velg denne luken for å tillate trådløse enheter på Gjestenettverket å kommunisere med hverandre via metoder som nettverksnaboer, Samba, Ping og FTP."
                       } ,{                      
                           type: "name",
                           title: "Gi gjestene tilgang til Mitt lokale nettverk",
                           content: "Velg denne luken for å tillate trådløse enheter på Gjestenettverket å kommunisere med enheter som er koblet til ruterens LAN-porter eller hovednettverk via metoder som nettverksnaboer, Samba, Ping og FTP."
                       } ,{                      
                           type: "name",
                           title: "Aktiver gjestenettverk",
                           content: "Velg denne avmerkingsboksen for å tillate gjestenettverk-funksjonen."
                       } ,{                      
                           type: "name",
                           title: "Nettverksnavn (SSID)",
                           content: "Du kan la standard gjeste-SSID stå som det er, eller angi et nytt navn (på opptil 32 tegn)."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på gjestenettverket (SSID) fra Wi-Fi-nettverkslisten."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervall for oppdatering av passord",
                           content: "Velg oppdateringsintervall for passord for Gjestenettverket."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Passord",
                           content: "Lag et passord på mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimale tegn (0–9, a–f, A–F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Passord",
                           content: "Bruk enten passordet som ble tilfeldig generert, eller opprett et passord på mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimale tegn (0–9, A–F, A–F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link-sky",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link-skytjeneste lar deg overvåke nettverket eksternt i sanntid og åpne eller administrere TP-Link-enhetene via Internett når og hvor som helst."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Kontoinformasjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser TP-Link ID-informasjon. Du kan redigere kontoinformasjonen ved å klikke på Rediger-ikonet."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Enhetsinformasjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser enhetsinformasjon, inkludert skykontoen som administrerer enheten."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Bundede kontoer",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabellen viser alle skykontoene som for tiden er bundet til enheten."
                       } ,{                      
                           type: "step",
                           title: "Slik binder du en brukerkonto",
       content: [ 
                "1. Klikk Bind.",
                "2. Skriv inn den registrerte e-postadressen du vil binde.",
                "3. Klikk Lagre."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Sperrefunksjon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Foreldrekontroll gir din familie personlig og tilpasset internettilgang med filtre for aldersnivå, tilgangsbegrensninger og brukerprofiler."
                       } ,{                      
                           type: "step",
                           title: "For å sette opp foreldrekontroll på en ny enhet",
       content: [ 
                "1. Klikk Legg til.",
                "2. Skriv inn et navn for denne profilen, og klikk «+» for å legge til enheten(e) til profilen.",
                "3. Velg et filternivå og tilpasse filterets innhold i henhold til behovene dine. Du kan skrive inn nøkkelord for å søke etter nettsteder som du ønsker å filtrere i databasen vår. Andre nettsider (URL-er) kan legges inn manuelt.<br/>Se følgende forklaringer for de ulike filterkategoriene:<p>Innhold uegnet for barn – nettsteder som inneholder seksuelt, skadelig eller ulovlig innhold, inkludert pornografi, rusmiddelbruk, vold og diskriminering</p><p>Gambling – nettsteder som markedsfører eller gir informasjon om gambling, inkludert nettsteder for online gambling </p><p> Seksualundervisning – nettsteder som diskuterer seksualitet informativt, inkludert reproduksjon, seksualitet, sikker sex og prevensjon, seksuelt overførbar sykdom og mestring av seksuelle traumer</p><p>Online-kommunikasjon – nettsteder som er vert for formater til å kommunisere med andre gjennom tekst, tale eller video, inkludert e-post, blogger, nettfora, VoIP og video chat-tjenester</p><p> Sosialt nettverk – nettsteder som distribuerer personlig uttrykk eller kommunikasjon, som knytter mennesker og deres personlige aktivitet basert på lignende interesser, karriere, bakgrunn eller bekjentskap i det virkelige liv</p><p>Betal for å surfe – nettsteder som kompenserer brukere for å se visse nettsteder, e-postmeldinger eller annonser, klikke på koblinger eller svare på undersøkelser</p><p>Medie – nettsteder som tilbyr gratis, betalt eller abonnert lyd- og/eller videoinnhold, inkludert strømmingstjenester, TV-programmer eller nedlasting av musikk</p><p>Nedlastinger – nettsteder som forsørger eller gir tilgang til fildeling og distribusjon, inkludert node-til-node-deling, online fillagring og mobilt enhetsinnhold (f.eks musikk og apper)</p><p>Spill – nettsteder som forsørger eller gir tilgang til nettbaserte eller nedlastbare spill, inkludert online spilling, nettverk for spillkonsoller og nettleserspill</p>",
                "4. Aktiver og angi Tidsbegrensninger hvis du ønsker å begrense den totale tiden denne profilen kan bruke på nettet. Du kan også bruke Sengetid til å sette en daglig periode som enheter under denne profilen ikke kan bruke internett.",
                "5. Klikk Lagre."]
} ,{                      
                           type: "step",
                           title: "For å se en profils detaljerte internetthistorikk",
       content: [ 
                "1. Klikk på den tilhørende Innsikt-knappen i Innsikt-kolonnen.",
                "2. Hvis du ønsker å se flere oppføringer, klikker du på Historikk <span class=\"ptl-ctr-help-icon history\"></span>-knappen.",
                "3. Du kan blokkere eller oppheve blokkering av nettsteder ved å klikke på <span class=\"ptl-ctr-help-icon block\"></span> eller <span class=\"ptl-ctr-help-icon unblock\"></span>-knappen."]
} ,{                      
                           type: "step",
                           title: "For å deaktivere eller aktivere internettilgang umiddelbart",
       content: [ 
                "Klikk <span class=\"ptl-ctr-help-icon stop\"></span> i Internettilgang-kolonnen for å stoppe den tilhørende profilens enheter fra å få tilgang til internett og klikk på <span class=\"ptl-ctr-help-icon enable\"></span> for å aktivere tilgang igjen."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) -funksjonen prioriterer onlineaktiviteter og enheter for å garantere en raskere nettverkstilkobling når du trenger det mest."
                       } ,{                      
                           type: "paragraph",
                           content: "Velg Applikasjonsprioritet for å prioritere nettverkshastigheten for onlineaktiviteter , og velg Enhetsprioritet for å prioritere nettverkshastigheten for enheter."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Applikasjonsprioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg den onlineaktiviteten du vil prioritere, eller klikk Egendefinert for å angi prioritetsnivået for hver onlineaktivitet."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Enhetsprioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Velg enheten(e) du ønsker å prioritere og hvor lenge de skal bli prioritert."
                       } ,{                      
                           type: "step",
                           title: "Prioritere en enhet",
       content: [ 
                "1. Finn den enheten du ønsker å prioritere i listen og veksle på Prioritet.",
                "2. Velg hvor lenge enheten skal bli prioritert i Timing-kolonnen."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Antivirus-funksjonen holder din personlige informasjon trygg med hyppig nettverksskanning, skadelig nettsted-registrering og isolasjon av infisert enhet. Du kan også sjekke hvordan nettverket er beskyttet, og hvis det har vært noen angrep på nettverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Historikk – Tar opp de enhetene som har blitt beskyttet av Antivirus og kilden og klassifiseringen til angrepene."
                       } ,{                      
                           type: "paragraph",
                           content: "Aktiver alle – Trykk for å aktivere alle Beskyttelsestyper dersom en eller flere ikke er aktivert."
                       } ,{                      
                           type: "paragraph",
                           content: "Beskyttelsestyper – Aktiver Beskyttelsestyper ved å henvise til forklaringene. Det anbefales å aktivere alle Beskyttelsestypene."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Applikasjonsprioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Applikasjonsprioritet-funksjonen prioriterer onlineaktiviteter for å garantere en raskere nettverkstilkobling når du trenger det mest. Velg den onlineaktiviteten du vil prioritere, eller klikk Egendefinert for å angi prioritetsnivået for hver onlineaktivitet."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Enhetsprioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Enhetsprioritet-funksjonen prioriterer enheter for å garantere en raskere nettverkstilkobling når du trenger det mest. Velg enheten(e) du ønsker å prioritere og hvor lenge de skal bli prioritert."
                       } ,{                      
                           type: "step",
                           title: "Prioritere en enhet",
       content: [ 
                "1. Finn den enheten du ønsker å prioritere i listen og veksle på Prioritet.",
                "2. Velg hvor lenge enheten skal bli prioritert i Timing-kolonnen."]
}]
},
       FIREWALL :{ 
               TITLE:"Brannmur",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI-brannmur (Stateful Packet Inspection) forhindrer cyber-angrep og validerer trafikken som går gjennom ruteren basert på protokollen. Som standard, er denne funksjonen aktivert."
                       } ,{                      
                           type: "name",
                           title: "Aktiver SPI-brannmur",
                           content: "Ikke deaktiver SPI-brannmuren med mindre det er nødvendig."
                       } ,{                      
                           type: "name",
                           title: "Tillat ping fra WAN-porten / Tillat ping fra LAN-porten",
                           content: "Aktiver for å tillate ping-pakker fra WAN-/LAN-porten. Det anbefales å beholde standardinnstillingene."
                       }]
},
       "" :     ""
    };
})(jQuery);