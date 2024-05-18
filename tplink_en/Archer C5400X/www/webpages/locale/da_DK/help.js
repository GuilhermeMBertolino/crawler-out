(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevante oplysninger om WAN (Internet) forbindelsen."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"2,4GHz/5GHz trådløst netværk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevante oplysninger om det trådløse netværk."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysninger om Ethernet(LAN)-porte."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Gæstenetværk 2,4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysninger om det trådløse netværk for gæster."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB-enheder",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysninger om de aktuelle USB-lagringsenheder og/eller printere, som er tilsluttet routeren via USB-portene."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Ydeevne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser den aktuelle routers ydeevne."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Kablede klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysninger for alle de kablede enheder, der er tilsluttet netværket."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Trådløse klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysninger for alle de trådløse enheder, der er tilsluttet netværket."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurer IPv4-parametrene og vælg den relevante MAC Clone-metode, som du har brug for."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vælg typen af internetforbindelse og indtast tilsvarende parametre."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: Dynamisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg denne type hvis du har en DHCP-serverforbindelse fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
                           content: "Disse parametre tildeles automatisk af DHCP-serveren fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Forny",
                           content: "Klik for at få nye IP-parametre fra DHCP-serveren."
                       } ,{                      
                           type: "name",
                           title: "Udgivelse",
                           content: "Klik for at frigive alle IP-adresser der er tildelt af DHCP-serveren."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Hvis din internetudbyder tilbyder en eller to DNS-adresser, skal du markere dette afkrydsningsfelt og angive de primære DNS og sekundære DNS-adresser i de tilsvarende felter. Ellers vil DNS-adresserne blive tildelt dynamisk af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Navn på host",
                           content: "Angiv en værdi i dette felt for at angive routerens host-navn."
                       } ,{                      
                           type: "name",
                           title: "Få IP ved hjælp af Unicast DHCP",
                           content: "Marker dette afkrydsningsfelt, hvis internetudbyderens DHCP-serveren ikke understøtter broadcast-programmer og du kan ikke hente IP-adressen dynamisk."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: Statisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg denne type hvis du har en specifik (fast) IP-adresse, undernetmaske, gateway og DNS-parametre fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
                           content: "Indtast oplysningerne fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: BigPond-kabel"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg den type hvis internetudbyderen leverer BigPond-kabelforbindelser."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast brugernavnet og adgangskoden fra internetudbyderen. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Tilladelse Server",
                           content: "Angiv den godkendende servers IP-adresse eller host-navn."
                       } ,{                      
                           type: "name",
                           title: "Tilladelse Domæne",
                           content: "Angiv serverens domænenavns suffiks (afhængigt af lokaliteten). F. eks. nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, eller qld.bigpond.net.au for QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Forbindelsestilstand",
                           content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                       } ,{                      
                           type: "name",
                           title: "Efter behov",
                           content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                       }]
} ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg denne type, hvis du vil bruge DSL (Digital Subscriber Line) tjenesten og har et brugernavn og adgangskode fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast brugernavnet og adgangskoden fra internetudbyderen. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/Primær DNS/sekundær DNS",
                           content: "Disse parametre tildeles automatisk af DHCP-serveren på internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Sekundær forbindelse (ingen, dynamisk-IP, statisk-IP)",
       children: [{                      
                           type: "name",
                           title: "Ingen",
                           content: "Vælg , hvis ingen sekundær forbindelse findes."
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Vælg hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen.",
       children: [{                      
                           type: "name",
                           title: "Forny",
                           content: "Klik på for at forny IP-parametrene fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Udgivelse",
                           content: "Klik for at frigive de tildelte IP-parametre."
                       }]
} ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Vælg hvis IP-adressen og undernetmasken leveres af internetudbyderen, og angive disse oplysninger i de relevante felter."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Den typiske størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1480 bytes.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "I sjældne tilfælde, vil internetudbyderen bede dig om at justere MTU-størrelse for bedre ydelse af netværket. Du bør ikke ændre værdien, medmindre det er absolut nødvendigt."
                       }]
} ,{                      
                           type: "name",
                           title: "Tjenestenavn/navn på Access-koncentrator (AC)",
                           content: "Som standard er tjenestenavnet og AC-navnet tomt. Disse felter skal ikke konfigureres medmindre det kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Bestem online interval",
                           content: "Angiv en værdi for tidsintervalet mellem 0 og 120 (i sekunder), hvor routeren registrerer Access-koncentratoren online i hvert interval. Standardværdien er 10."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse",
                           content: "Hvis internetudbyderen giver en specifik (fast) IP-adresse, skal du vælge Brug følgende IP-adresse og indtaste IP-adressen i feltet. Ellers vælg Hent dynamisk fra internetudbyderen for at få en server-tildelt IP-adresse automatisk."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Hvis internetudbyderen giver en specifik (fast) DNS-IP-adresse, skal du vælge Brug følgende DNS-adresse og indtaste adressen(erne) ind i felterne for den primære DNS og sekundære DNS henholdsvis. Ellers vælg Hent dynamisk fra internetudbyderen for at få en server-tildelt DNS-IP-adresse(r) automatisk."
                       } ,{                      
                           type: "name",
                           title: "Forbindelsestilstand",
                           content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                       } ,{                      
                           type: "name",
                           title: "Efter behov",
                           content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                       } ,{                      
                           type: "name",
                           title: "Tidsbaserede",
                           content: "I denne tilstand, etableres internetforbindelse kun i et bestemt tidsrum. Hvis denne indstilling vælges, skal du indtaste starttiden og sluttiden; begge i TT:MM-formatet."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Den tidsbaserede forbindelsestilstand træder først i kraft efter at systemtiden er konfigureret på Avanceret → Systemværktøjer → Tidsindstillinger."
                       }]
} ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg denne type, hvis du opretter forbindelse til en L2TP/PPTP VPN-server og internetudbyderen har forsynet dig med et brugernavn, en adgangskode og IP-adresse/domænenavn på serveren."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast brugernavnet og adgangskoden fra internetudbyderen. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse/Primær DNS/sekundær DNS",
                           content: "Disse parametre tildeles automatisk af DHCP-serveren fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Sekundær forbindelse (dynamisk-IP eller statisk-IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Vælg hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Vælg hvis IP-adressen, undernetmasken, gatewayen og DNS-adresserne leveres af internetudbyderen, og angiv disse oplysninger i de relevante felter."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN-server IP/domænenavn",
                           content: "Angiv VPN-serverens IP-adresse eller domænenavnet, som internetudbyderen har oplyst."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1460 bytes for L2TP eller 1420 bytes for PPTP. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Forbindelsestilstand",
                           content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                       } ,{                      
                           type: "name",
                           title: "Efter behov",
                           content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                       } ,{                      
                           type: "name",
                           title: "Manuelt",
                           content: "I denne tilstand, kontrolleres internetforbindelsen manuelt ved at klikke på knappen Tilslut eller Afbryd. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC-klone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vælg den relevante MAC Clone-metode, som du har brug for."
                       } ,{                      
                           type: "name",
                           title: "Klon IKKE MAC-adressen",
                           content: "Undlad at ændre routerens MAC-adresse, hvis internetudbyderen ikke binder den tildelte IP-adresse til en MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Klon computerens aktuelle MAC-adresse",
                           content: "Vælg for at kopiere den aktuelle MAC-adressen på computeren, der er sluttet til routeren, hvis internetudbyderen binder den tildelte IP-adresse til computerens MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Brug brugerdefineret MAC-adresse",
                           content: "Indtast MAC-adressen manuelt, hvis internetudbyderen binder den tildelte IP-adresse til den specifikke MAC-adresse."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN-sammenlægning",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN-sammenlægning omdanner LAN1-porten til en ekstra WAN-port og skaber en enkelt datasti med høj båndbredde. På denne måde kan du få hurtigere internet fra udbydere, som tilbyder bredbånd på over 1 Gbps, uden at være begrænset af dit netværks hardware."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Bemærk",
                           content: "Før du aktiverer denne funktion, skal du sikre dig, at din udbyder understøtter WAN-sammenlægning, og at dit modem har to WAN-porte."
                       } ,{                      
                           type: "step",
                           title: "Sådan benytter du WAN-sammenlægning",
       content: [ 
                "1.	Slå WAN-sammenlægning til.",
                "2.	Tryk på Gem.",
                "3.	Forbinde routerens WAN-port og LAN1-port til dit modems to WAN-porte med to Ethernet-kabler."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser MAC-adressen, IP-adressen og undernetmasken for routeren."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
                       } ,{                      
                           type: "name",
                           title: "IP-adresse",
                           content: "Viser routerens standard IP-adresse, som bruges til at logge ind på routerens administrationsside. Du kan ændre den til en anden."
                       } ,{                      
                           type: "name",
                           title: "Undernetmaske",
                           content: "Vælg en tilknyttet identifikator, som benyttes af LAN-porten til at rute intern og ekstern trafik, eller indtast en ny undernetmaske."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis den nye internet-IP-adresse ikke er i det samme undernet som den gamle, vil IP-adressegruppen i DHCP-serveren automatisk blive konfigureret; men den virtuelle server og DMZ-hosten vil ikke træde i kraft, før de omkonfigureres."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Link Aggregation (”linksamling”)",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sammenlægning af link kombinerer to porte for at lave en enkelt sti med stor båndbredde, således at et hurtigere og mere stabilt netværk opretholdes."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Sådan anvendes sammenlægning af link",
       content: [ 
                "1. Slå til for at aktivere funktionen Sammenlægning af link.",
                "2. Angiv to porte for sammenlægning af link.",
                "3. Klik på Gem."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) er et system, hvorigennem tv-tjenester leveres ved hjælp af Internet Protocol suiten over et pakkekoblet netværk, såsom et LAN eller internettet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "IGMP (Internet Group Management Protocol) Snooping funktionen giver routeren mulighed for kun at videresende multicast trafik til porte, der har anmodet om dem."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Vælg at aktivere IGMP Proxy funktionen, hvis IPTV-tjenesten der leveres af internetudbyderen er baseret på IGMP-teknologi."
                       } ,{                      
                           type: "name",
                           title: "IGMP-version",
                           content: "Vælg den IGMP-version, der passer til din ISP. IGMP-standardversionen er V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Trådløs viderestilling af multicast",
                           content: "Vælg for at aktivere den trådløse Multicast videresendingsfunktion, som gør det muligt at multicast-pakker kan videresendes til det trådløse netværk."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Vælg for at aktivere IPTV funktionen, hvis IPTV-tjenesten der leveres af internetudbyderen er baseret på ikke-IGMP-teknologi."
                       } ,{                      
                           type: "name",
                           title: "ISP-profil",
                           content: "Vælg den korrekte ISP (internetudbyder)-profil for at afslutte konfigurationen. Der er tre typer profiler:",
       children: [{                      
                           type: "name",
                           title: "Land-internetudbyders navn",
                           content: "ISP-profiler med standardindstillinger er i formatet ”Land-ISP-navn”. Du skal bare finde og vælge din ISP på listen."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bro",
                           content: "Hvis din ISP ikke er på listen, og der ikke kræves andre parametre for at konfigurere IPTV, kan du bare vælge denne profil og specificere LAN-porten til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN1, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bro",
                           content: "Hvis din ISP ikke er på listen, og der ikke kræves andre parametre for at konfigurere IPTV, kan du bare vælge denne profil og specificere LAN-porten til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN2, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bro",
                           content: "Hvis din ISP ikke er på listen, og der ikke kræves andre parametre for at konfigurere IPTV, kan du bare vælge denne profil og specificere LAN-porten til IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN5, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Brugerdefineret",
                           content: "Hvis din ISP ikke er på listen, men har udleveret nødvendige parametre såsom internet-/VoIP-/IPTV-VLAN-id’er og prioritet, skal du vælge denne profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV-VLAN ID/prioritet",
                           content: "Konfigurer VLAN-id'erne og prioriteringer som leveret af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "802.11Q tag",
                           content: "Vælg for at mærke internetpakkerne med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/Prioritet",
                           content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til internetudbyderen."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN1, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Brugerdefineret",
                           content: "Hvis din ISP ikke er på listen, men har udleveret nødvendige parametre såsom internet-/VoIP-/IPTV-VLAN-id’er og prioritet, skal du vælge denne profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV-VLAN ID/prioritet",
                           content: "Konfigurer VLAN-id'erne og prioriteringer som leveret af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "802.11Q tag",
                           content: "Vælg for at mærke internetpakkerne med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/Prioritet",
                           content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til internetudbyderen."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN2, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Brugerdefineret",
                           content: "Hvis din ISP ikke er på listen, men har udleveret nødvendige parametre såsom internet-/VoIP-/IPTV-VLAN-id’er og prioritet, skal du vælge denne profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV-VLAN ID/prioritet",
                           content: "Konfigurer VLAN-id'erne og prioriteringer som leveret af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "802.11Q tag",
                           content: "Vælg for at mærke internetpakkerne med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/Prioritet",
                           content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til internetudbyderen."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Vælg den type data, LAN-porten skal sende. Hvis du for eksempel vælger IPTV for LAN5, sender den kun IPTV-data, og så skal du forbinde tv-boksen til LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP-server",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Som standard er DHCP (Dynamic Host Configuration Protocol) serveren aktiveret; dynamisk tildelte TCP/IP-parametre til klientenheder fra IP-adressegruppen.",
                "Deaktiver IKKE DHCP-serveren, medmindre du har en anden DHCP-server, eller du ønsker manuelt at tildele TCP/IP-parametre for hver klientenhed på netværket."]
} ,{                      
                           type: "name",
                           title: "IP-adressepulje",
                           content: "Angiv intervallet af IP-adresser, som kan leases til klienterne."
                       } ,{                      
                           type: "name",
                           title: "Låneperiode for adresse",
                           content: "Indtast varigheden (mellem 1 og 2880 minutter), som en IP-adresse er udlejet til en klient. Standardværdien er 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Adressereservering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser de tilsvarende parametre for IP-reserverede enheder."
                       } ,{                      
                           type: "step",
                           title: "Sådan reserveres en IP-adresse",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Klik på Scan for at vælge en aktuelt tilsluttet enhed fra DHCP-klientlisten; eller indtaste MAC-adressen på den ønskede klient i feltet MAC-Adresse og IP-adressen, som du ønsker at reservere for klienten i feltet IP-adresse.",
                "3. Indtast en beskrivelse af klienten i feltet Beskrivelse.",
                "4. Vælg Aktiver.",
                "5. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP klientliste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser information om aktuelt forbundne enheder."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisk DNS (Dynamic Domain Name System) giver dig mulighed for at tildele et fast host- og domænenavn til en dynamisk internet-IP-adresse. Det er nyttigt hvis du hoster dit eget websted, FTP-server eller en anden server bagved routeren. Først skal du tilmelde dig en Dynamisk DNS-tjenesteudbyder, som f. eks. www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Sådan etableres en dynamisk DNS",
       content: [ 
                "1. Vælg dynamisk DNS-tjenesteudbyderen.",
                "2. Indtast brugernavnet og adgangskoden til Dynamic DNS-kontoen.",
                "3. Indtast domænenavnet, som du har modtaget fra DDNS-tjenesteudbyderen.",
                "4. Vælg opdateringsintervallet i rullemenuen.",
                "5. Hvis din internetudbyder er NO-IP, kan WAN IP Binding sikre at domænenavnet er bundet til routerens WAN IP.",
                "6. Klik på Log ind og Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil bruge en ny DDNS-konto, skal du logge af og derefter logge på med den nye konto."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisk DNS (Dynamic Domain Name System) giver dig mulighed for at tildele et fast host- og domænenavn til en dynamisk internet-IP-adresse. Det er nyttigt hvis du hoster dit eget websted, FTP-server eller en anden server bagved routeren. Først skal du tilmelde dig en Dynamisk DNS-tjenesteudbyder, som f. eks. www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Liste over domænenavne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser oplysningerne af alle domænenavne der er registreret på din skykonto."
                       } ,{                      
                           type: "step",
                           title: "Sådan registreres et nyt domænenavn",
       content: [ 
                "1. Klik på Register (Registrer).",
                "2. Indtast domænenavnet som du vil registrere.",
                "3. Klik på Gem."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statisk routing",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statisk routing bruges til at forudbestemme en fast rute for netværksinformationspakker til at nå frem til en bestemt host eller netværk."
                       } ,{                      
                           type: "step",
                           title: "Sådan etableres statisk routing",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Angiv en IP-adresse i feltet Network Destination for at tildele en statisk rute for denne registrering.",
                "3. Indtast en undernetmasken i feltet Subnet Mask for at bestemme netværksdelen og værtsdelen af IP-adressen.",
                "4. Indtast en gateway-IP-adresse i feltet Default Gateway for at tilslutte routeren til netværket eller hosten.",
                "5. Vælg LAN eller WAN på feltet Interface for at angive typen af ​​netværkets destination.",
                "6. Indtast en kort beskrivelse af denne registrering.",
                "7. Vælg Aktiver.",
                "8. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Routing-tabel for system",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser alle gyldige ruteposter, som er i brug i øjeblikket."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Trådløse indstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurer de trådløse indstillinger, som du har brug for."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Marker dette afkrydsningsfelt for at aktivere smart forbindelse. Denne funktion hjælper enheder med at køre hurtigere ved at tildele dem til det bedste trådløse bånd, baseret på faktiske forhold, for at balancere netværkskrav."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Trådløs 2,4 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Netværksnavn (SSID)",
                           content: "Det anbefales at ændre netværksnavnet (SSID). Dette felt skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Marker hvis du vil skjule 2.4GHz netværksnavnet (SSID) fra listen over trådløse netværk. Når dette er valgt, vil SSID ikke udsendes, og du er nødt til manuelt at tilslutte dig netværket."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhed",
                           content: "Vælg én af følgende sikkerhedsfunktioner:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhed",
                           content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Dette anbefales ikke."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-personlig",
                           content: "Vælg denne indstilling for at aktivere den trådløse sikkerhed. Dette anbefales for at beskytte det trådløse netværk mod uautoriseret adgang. Hvis den vælges, skal du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Vælg en sikkerhedsversion. Vælg en sikkerhedsversion. WPA2-PSK er mere sikker. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Vælg en krypteringstype. AES er mere sikker. Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand. Desuden vil brug af TKIP deaktivere WPS funktionen. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Adgangskode",
                           content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Hvis den vælges, bliver WPS-funktionen deaktiveret.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Vælg en sikkerhedsversion. WPA2 er mere sikker. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Vælg en krypteringstype. AES er mere sikker. Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand. Desuden vil brug af TKIP deaktivere WPS funktionen. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Server-IP",
                           content: "Indtast IP-adressen på RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Indtast portnummeret på RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS adgangskode",
                           content: "Indtast den delte adgangskode på RADIUS-serveren."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Vælg denne mulighed for at aktivere en grundlæggende bekræftelsestype, hvis en klientenhed kun har adgang til det trådløse netværk via WEP (Wired Equivalent Privacy). Denne mulighed deaktiverer WPS-funktionen.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Vælg en godkendelsesversion for det trådløse netværk. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Format af WEP-nøgle",
                           content: "Brug enten ASCII-format eller vælg Hexadecimal. ASCII-format er en kombination af bogstaver og tal. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Nøgletype",
                           content: "Vælg længden for WEP-nøglen.",
       children: [{                      
                           type: "name",
                           title: "64 Bit",
                           content: "Her kan du indtaste 10 hexadecimale tegn (0-9, A-F, a-f) eller 5 ASCII-tegn i feltet for WEP-værdien."
                       } ,{                      
                           type: "name",
                           title: "128 Bit",
                           content: "Her kan du indtaste 26 hexadecimale tegn (0-9, A-F, a-f) eller 13 ASCII-tegn i feltet for WEP-værdien."
                       }]
} ,{                      
                           type: "name",
                           title: "Nøgleværdi",
                           content: "Indtast WEP-nøglen i det relevante felt."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Vælg en driftkanal for det 2,4 GHz trådløse netværk. Det anbefales at sætte kanalen til Auto, hvis du ikke oplever problemer med periodisk trådløs forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Transmissionsstyrke",
                           content: "Vælg enten Høj, Mellem eller Lav for at angive transmissionsstyrke for data. Standard og anbefalet indstilling er Høj."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness funktion",
                           content: "Marker dette afkrydsningsfelt for at aktivere Airtime Fairness (ATF) funktionen, der gør det muligt at optimere gennemløb af hvert flow. ATF trafikplanlægger bruger per-destination sendetidsmål for at skabe balance mellem forbrug af sendetid på tværs af flow-destinationer."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Flerbruger MIMO-funktion",
                           content: "Klik på aktiver for at bruge flerbruger MIMO-funktionen."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Trådløs 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Netværksnavn (SSID)",
                           content: "Det anbefales at ændre netværksnavnet (SSID). Dette felt skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Marker hvis du vil skjule 5GHz netværksnavnet (SSID) fra listen over trådløse netværk. Når dette er valgt, vil SSID ikke udsendes, og du er nødt til manuelt at tilslutte dig netværket."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhed",
                           content: "Vælg én af følgende sikkerhedsfunktioner:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhed",
                           content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Dette anbefales ikke."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-personlig",
                           content: "Vælg denne indstilling for at aktivere den trådløse sikkerhed. Dette anbefales for at beskytte det trådløse netværk mod uautoriseret adgang. Hvis den vælges, skal du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Vælg en sikkerhedsversion. WPA2-PSK er mere sikker. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Vælg en krypteringstype. AES er mere sikker. Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand. Desuden vil brug af TKIP deaktivere WPS funktionen. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Adgangskode",
                           content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Hvis den vælges, bliver WPS-funktionen deaktiveret.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Vælg en sikkerhedsversion. WPA2 er mere sikker. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Vælg en krypteringstype. AES er mere sikker. Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand. Desuden vil brug af TKIP deaktivere WPS funktionen. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Server-IP",
                           content: "Indtast IP-adressen på RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Indtast portnummeret på RADIUS-serveren."
                       } ,{                      
                           type: "name",
                           title: "RADIUS adgangskode",
                           content: "Indtast den delte adgangskode på RADIUS-serveren."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Vælg denne mulighed for at aktivere en grundlæggende bekræftelsestype, hvis en klientenhed kun har adgang til det trådløse netværk via WEP (Wired Equivalent Privacy). Denne mulighed deaktiverer WPS-funktionen.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Vælg en godkendelsesversion for det trådløse netværk. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Format af WEP-nøgle",
                           content: "Brug enten ASCII-format eller vælg Hexadecimal. ASCII-format er en kombination af bogstaver og tal. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Nøgletype",
                           content: "Vælg længden for WEP-nøglen.",
       children: [{                      
                           type: "name",
                           title: "64 Bit",
                           content: "Her kan du indtaste 10 hexadecimale tegn (0-9, A-F, a-f) eller 5 ASCII-tegn i feltet for WEP-værdien."
                       } ,{                      
                           type: "name",
                           title: "128 Bit",
                           content: "Her kan du indtaste 26 hexadecimale tegn (0-9, A-F, a-f) eller 13 ASCII-tegn i feltet for WEP-værdien."
                       }]
} ,{                      
                           type: "name",
                           title: "Nøgleværdi",
                           content: "Indtast WEP-nøglen i det relevante felt."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Vælg en driftkanal for det 5GHz trådløse netværk. Det anbefales at sætte kanalen til Auto, hvis du ikke oplever problemer med periodisk trådløs forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Transmissionsstyrke",
                           content: "Vælg enten Høj, Mellem eller Lav for at angive transmissionsstyrke for data. Standard og anbefalet indstilling er Høj."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness funktion",
                           content: "Marker dette afkrydsningsfelt for at aktivere Airtime Fairness (ATF) funktionen, der gør det muligt at optimere gennemløb af hvert flow. ATF trafikplanlægger bruger per-destination sendetidsmål for at skabe balance mellem forbrug af sendetid på tværs af flow-destinationer."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Flerbruger MIMO-funktion",
                           content: "Klik på aktiver for at bruge flerbruger MIMO-funktionen."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) giver dig en lettere tilgang til at oprette en sikkerhedsbeskyttet Wi-Fi-forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Trykknap (anbefales)",
       content: [ 
                "Med denne metode kan du nemt tilslutte en WPS-kompatible enheder til det trådløse netværk.",
                "Klik på Start WPS-knappen på skærmen. Inden for 2 minutter, skal du trykke på WPS-knappen på klientenheden."]
} ,{                      
                           type: "name",
                           title: "Routerens PIN-kode",
       content: [ 
                "PIN-kodens standardværdi kan findes på mærkaten på routeren.",
                "Klik på Opret for at få en ny PIN-kode eller klik på Standard for at gendanne den aktuelle PIN-kode til den originale PIN-kode."]
} ,{                      
                           type: "name",
                           title: "Angiv klientens PIN-kode",
       content: [ 
                "Denne metode giver dig mulighed for at tilføje trådløse enheder manuelt.",
                "Indtast enhedens PIN-kode i feltet og klik derefter på Opret forbindelse."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Trådløse stationer online",
               CONTENT: [{
                           type: "name",
                           title: "Klientnummer",
                           content: "Viser nummeret på den tilknyttede trådløse klient."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Viser MAC-adressen på den tilknyttede trådløse klient."
                       } ,{                      
                           type: "name",
                           title: "Forbindelsestype",
                           content: "Viser det trådløse frekvensbånd (2,4 GHz eller 5 GHz) af den tilknyttede trådløse klient."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhed",
                           content: "Viser sikkerhedstypen af den tilknyttede trådløse klient."
                       } ,{                      
                           type: "name",
                           title: "Modtagne pakker",
                           content: "Viser antallet af pakker modtaget af den tilknyttede trådløse klient."
                       } ,{                      
                           type: "name",
                           title: "Sendte pakker",
                           content: "Viser antallet af pakker sendt af den tilknyttede trådløse klient."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på Opdater for at opdatere informationen på denne side."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Trådløs plan",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med trådløs plan, kan du deaktivere det trådløse signal i en bestemt periode. Du kan f.eks. slukke for det trådløse signal mellem kl. 00:00 og kl. 07:00."
                       } ,{                      
                           type: "name",
                           title: "Tidspunkter hvor trådløs forbindelse er slukket",
                           content: "Viser perioden(erne), hvor det trådløse signal er slukket.",
       children: [{                      
                           type: "step",
                           title: "Opsætning af trådløse signal slukket",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Indstil det tidsrum, hvor du har brug for at det trådløse signal er slukket.",
                "3. Vælg repetitionsdage. Du kan vælge \"Hver Dag\" eller specificere visse dage.",
                "4. Klik på Gem."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Indstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funktion gør det muligt at give trådløs adgang for gæster uden at afsløre hovednettet."
                       } ,{                      
                           type: "name",
                           title: "Giv gæsterne mulighed for at se hinanden",
                           content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværk at kommunikere med hinanden via metoder såsom netværksnaboer, Samba, Ping, og FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
                           content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværk at kommunikere med enhederne tilsluttet til routerens LAN porte eller hovednetværket via metoder såsom netværksnaboer, Samba, Ping, og FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"2,4GHz/5GHz trådløst netværk",
               CONTENT: [{
                           type: "name",
                           title: "Aktiver gæstenetværk",
                           content: "Marker dette afkrydsningsfelt for at aktivere funktionen gæstenetværk."
                       } ,{                      
                           type: "name",
                           title: "Netværksnavn (SSID)",
                           content: "Du kan enten bruge standard gæste-SSID eller oprette et nyt navn (op til 32 tegn)."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Marker dette afkrydsningsfelt, hvis du vil skjule gæste-SSID fra listen over trådløse netværk."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Opdateringsinterval for adgangskode",
                           content: "Vælg opdateringsintervallet for gæstenetværkets adgangskode."
                       } ,{                      
                           type: "name",
                           title: "Sikkerhed",
                           content: "Når du vælger aldrig at opdatere adgangskoden, skal du vælge en af følgende sikkerhedsmuligheder:",
       children: [{                      
                           type: "name",
                           title: "Ingen sikkerhed",
                           content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Dette anbefales ikke."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-personlig",
                           content: "Vælg denne indstilling for at aktivere den trådløse sikkerhed. Dette anbefales kraftigt for at beskytte gæstenetværket mod uautoriseret adgang. Hvis den vælges, skal du konfigurere følgende.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Vælg en sikkerhedsversion. WPA2-PSK er mere sikker. Hvis du ikke er sikker, skal du vælge Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Vælg en krypteringstype. AES er mere sikker. Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand. Desuden vil brug af TKIP deaktivere WPS funktionen. Hvis du ikke er sikker, skal du vælge Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Portal-godkendelse forbedrer din netværkssikkerhed ved at anmode om godkendelse fra klienter, der har behov for midlertidig adgang til dit trådløse netværk."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Sådan indstilles portalgodkendelse",
       content: [ 
                "1. Vælg Portal for sikkerhed.",
                "2. Vælg Simpel adgangskode eller Ingen godkendelse for godkendelse.",
                "A. Simpel adgangskode - Angiv en adgangskode for godkendelse (8-16 alfanumeriske tegn, tal og _).",
                "B. Ingen godkendelse - Klienterne kan få adgang til netværket uden godkendelse.",
                "3. Vælg 1 time, 2 timer, 4 timer, 8 timer eller Altid, for at angive udløbstiden for godkendelsen. Når en kundes godkendelse udløber, skal han logge på igen for at få adgang.",
                "4. (Valgfrit) Aktiver Omdiriger og indtast den omdirigerede URL-adressen efter behov. Derefter vil en nyligt godkendt klient blive omdirigeret til den webadresse, du har angivet.",
                "5. (Valgfrit) Du kan også tilpasse siden for godkendelse af login.",
                "A. Portaltitel - Op til 31 tegn.",
                "B. Vilkår for brug - Op til 1023 tegn.",
                "C. Logobillede - Overfør et JPG- eller PNG-billede (mindre end 100KB) for at tilpasse logoet.",
                "D. Baggrundsbillede - Overfør et JPG- eller PNG-billede (mindre end 2 MB) for at tilpasse baggrunden.",
                "6. Klik på Gem."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Adgangskode",
                           content: "Opret en adgangskode på mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Adgangskode",
                           content: "Brug enten adgangskoden der genereres tilfældigt, eller opret en adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) giver brugerdefinerede NAT (Network Address Translation) traversal-filtre der kan tilsluttes gatewayen for at understøtte oversættelse af adresser og porte for visse programlag af \"kontrol/data\"-protokoller: FTP, TFTP, H323 osv. Så aktivering af ALG anbefales."
                       } ,{                      
                           type: "name",
                           title: "Aktiver FTP-ALG",
                           content: "Hvis det er valgt, giver det mulighed for at bruge FTP (File Transfer Protocol) klienter og servere til at overføre data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver TFTP-ALG",
                           content: "Hvis det er valgt, giver det mulighed for at bruge TFTP (Trivial File Transfer Protocol) klienter og servere til at overføre data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver H323 ALG",
                           content: "Hvis det er valgt, giver det mulighed for at Microsoft NetMeeting-klienter kan kommunikere via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver RTSP-ALG",
                           content: "Hvis det er valgt, kan medieafspiller-klienter kommunikere med streaming medie-servere via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver SIP ALG",
                           content: "Hvis denne indstilling er markeret, kan klienter kommunikerer med SIP-servere (Session Initiation Protocol) via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktiver PPTP-passthrough",
                           content: "Hvis det er valgt, giver det mulighed for at punkt-til-punkt sessioner kan tunnelføres gennem et IP-netværk og gennem routeren."
                       } ,{                      
                           type: "name",
                           title: "Aktiver L2TP-passthrough",
                           content: "Hvis det er valgt, giver det mulighed for at Lag 2 punkt-til-punkt sessioner kan tunnelføres gennem et IP-netværk og gennem routeren."
                       } ,{                      
                           type: "name",
                           title: "Aktiver IPSec-passthrough",
                           content: "Hvis det er valgt, giver det mulighed for at IPSec (Internet Protocol security) kan tunnelføres gennem et IP-netværk og gennem routeren. IPSec anvender kryptografiske sikkerhedstjenester til at sikre privat og sikker kommunikation over IP-netværk."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuelle servere",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuelle servere bruges til at konfigurere offentlige tjenester på dit lokale netværk. En virtuel server er defineret som en ekstern port, og alle anmodninger fra internettet til denne eksterne port vil blive omdirigeret til en særskilt computer, som skal være konfigureret med en statisk eller reserveret IP-adresse.",
                "Når du opbygger en server på det lokale netværk og ønsker at dele det på internettet, kan virtuelle servere realisere tjenesten og levere den til internetbrugere."]
} ,{                      
                           type: "paragraph",
                           content: "Tabellen viser de relevante parametre for den virtuelle server."
                       } ,{                      
                           type: "name",
                           title: "Tjenestetype",
                           content: "Viser navnet på den virtuelle server."
                       } ,{                      
                           type: "name",
                           title: "Ekstern port",
                           content: "Viser portnummeret eller et interval af porte, der bruges af den virtuelle server."
                       } ,{                      
                           type: "name",
                           title: "Intern IP",
                           content: "Viser IP-adressen på den computer, der kører tjenesteprogrammet."
                       } ,{                      
                           type: "name",
                           title: "Intern port",
                           content: "Viser portnummeret på den computer, der kører tjenesteprogrammet."
                       } ,{                      
                           type: "name",
                           title: "Protokol",
                           content: "Viser den protokol, der benyttes til tjenesteprogrammet: TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser den aktuelle status (tændt eller slukket) for den specifikke filteregel."
                       } ,{                      
                           type: "name",
                           title: "Ændre",
                           content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
                       } ,{                      
                           type: "step",
                           title: "Sådan konfigureres en virtuel serverregel",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Klik på Scan for at vælg en tjeneste fra listen for automatisk at udfylde de relevante portnumre på felterne for den eksterne port og interne port. Hvis tjenesten ikke er på listen, kan man indtaste det eksterne portnummer (f. eks. 21) eller et interval af porte (f. eks. 21-25). Lad den interne Port være tom, hvis det er det samme som den eksterne port eller angiv et bestemt portnummer (f. eks. 21), hvis den eksterne port er en enkelt port. Indtast IP-adressen på den computer, der kører tjenesteprogrammet i decimalformat på feltet for den interne IP.",
                "3. Vælg en protokol for tjenesteprogrammet: TCP, UDP eller Alle fra rullemenuen Protokolliste.",
                "4. Vælg Aktiver.",
                "5. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
       content: [ 
                "1. Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb.",
                "2. Det anbefales at beholde standardindstillingerne for interne porte og protokollen, hvis du ikke er helt klar over, hvilken port eller protokol du skal bruge.",
                "3. Hvis den lokale host-enhed er host for mere end én type tjenester, skal du oprette en regel for hver tjeneste. Bemærk at den eksterne port IKKE må overlappes."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Portudløsning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Portudløsning bruges til at fremsende trafik på en bestemt port til specifikke server på netværket."
                       } ,{                      
                           type: "paragraph",
                           content: "Tabellen viser de relevante parametre for port triggering."
                       } ,{                      
                           type: "name",
                           title: "Anvendelse",
                           content: "Viser navnet på programmet."
                       } ,{                      
                           type: "name",
                           title: "Portudløsning",
                           content: "Viser den udgående trafikport der anvendes til at udløse en filtreringsregel af en udgående forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Udløserprotokol",
                           content: "Viser den protokol, der benyttes for den udløste port. TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
                       } ,{                      
                           type: "name",
                           title: "Ekstern port",
                           content: "Viser porten eller intervallet af porte der anvendes af det eksterne system. Et svar gennem en af disse porte vil blive videresendt til den PC, som udløser denne regel. Du kan højst indtaste 5 portgrupper (eller portafsnit). Hver portgruppe skal adskilles med \",\" (kommaer), f. eks. 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Ekstern protokol",
                           content: "Viser den protokol, der benyttes for indgående port: TCP, UDP eller ALLE (alle understøttede protokoller på routeren)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser den aktuelle status (tændt eller slukket) for den specifikke filteregel."
                       } ,{                      
                           type: "name",
                           title: "Ændre",
                           content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
                       } ,{                      
                           type: "step",
                           title: "Sådan konfigureres en portudløsningsregel",
       content: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hver regel kan kun anvendes af en host ad gangen."
                       },
                "1. Klik på Tilføj.",
                "2. Klik på Scan for at vælge et program fra listen for automatisk at udfylde standardværdierne i felterne. Hvis du vil tilføje et ikke-angivet program, skal du manuelt angive programmet, udløserporten, udløserprotokollen, ekstern port og ekstern protokol.",
                "3. Vælg Aktiver.",
                "4. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne regel, skal du klikke på ikonet Bulb."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ (Demilitarized Zone) host-funktionen giver mulighed for at en lokal host kan være synlig på internettet for en specialtjeneste, såsom spil over internettet eller videokonferencer. Grundlæggende set tillader DMZ en enkelt computer på LAN'et at åbne sine porte. Denne computer skal konfigureres med en statisk IP-adresse og have sin DHCP-klientfunktion deaktiveret."
                       } ,{                      
                           type: "paragraph",
                           content: "Når DMZ er aktiveret, er DMZ-værten helt udsat for internettet, hvilket kan bringe nogle potentiel sikkerhedsrisikoer til computeren. Hvis DMZ ikke er i brug, skal du deaktivere det i tide."
                       } ,{                      
                           type: "step",
                           title: "Sådan tildeles en computer eller server som DMZ-server",
       content: [ 
                "1. Vælg Aktiver DMZ.",
                "2. I feltet DMZ Host-IP-adresse, skal du indtaste IP-adressen på en lokal computer som sættes op som DMZ-host.",
                "3. Klik på Gem."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Som standard, er funktionen UPnP (Universal Plug and Play) aktiveret for at tillade enheder, f. eks. computere og Internetprogrammer automatisk at opdage og kommunikere med hinanden på det lokale netværk."
                       } ,{                      
                           type: "paragraph",
                           content: "Det kan være nødvendigt at aktivere UPnP, hvis du ønsker at bruge applikationer til multiplayer-spil, peer-to-peer-forbindelser, real-time kommunikation (såsom VoIP eller teleVoIP konference) eller ekstern bistand mv."
                       } ,{                      
                           type: "name",
                           title: "UPnP-tjenesteliste",
                           content: "UPnP-servicelisten viser UPnP oplysninger om den lokale vært(er)."
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G hjælp",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modem",
                           content: "Viser statussen af 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Brug de auto-identificerede parametre fra internetudbyderen",
                           content: "Denne funktion er aktiveret som standard. Hvis aktiveret, kan routeren identificere internetudbyderen for SIM/UIM-kortet og udfylde parametrene automatisk. Hvis identifikationen fejler, skal du vælge regionen og den mobile internetudbyder manuelt."
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Vælg og vis området automatisk, når USB-modemet og SIM-kortet er korrekt identificeret. Hvis ikke, skal du vælge området fra rullemenuen."
                       } ,{                      
                           type: "name",
                           title: "Mobil-ISP",
                           content: "Viser internetudbyderen (ISP - Internet Service Provider) for 3G/4G-net. Hvis det ikke findes automatisk, skal du vælge internetudbyderen fra rullemenuen. Standard opkaldsnummer og APN bliver automatisk udfyldt i overensstemmelse hermed."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PINKODE",
                           content: "Hvis SIM/UIM-beskyttelse er aktiveret, skal du indtaste PIN-koden. SIM/UIM beskyttelsen er deaktiveret som standard. Bemærk, at hvis du indtaster en forkert PIN-kode 3 gange, vil SIM/UIM-kortet automatisk blive låst. Du kan kun låse den op ved at indtaste PUK-koden fra PC'en/den bærbare."
                       } ,{                      
                           type: "name",
                           title: "Meddelelse",
                           content: "Viser information om PIN-koden for SIM/UIM-kortet, hvis PIN-kode beskyttelse er aktiveret."
                       } ,{                      
                           type: "name",
                           title: "Indstillinger Ring til nummeret,APN,Brugernavn/adgangskode",
                           content: "Hvis internetudbyderen ikke findes på listen <strong>mobil internetudbyder</strong> , skal du marker dette afkrydsningsfelt og indtaste opkaldsnummeret, APN (Access Point Name), brugernavn og adgangskode, som du har fået af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Ring til nummeret",
                           content: "Indtast opkaldsnummeret fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Indtast det APN (Access Point Name), du har fået af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast brugernavnet og adgangskoden fra internetudbyderen. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Forbindelse på efterspørgsel",
                           content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Det sker, at forbindelsen ikke kan afbrydes, skønt du angiver den maksimale tomgangstid, fordi nogle programmer får adgang til internettet i back-enden."
                       } ,{                      
                           type: "name",
                           title: "Automatisk forbindelse",
                           content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                       } ,{                      
                           type: "name",
                           title: "Manuel forbindelse",
                           content: "I denne tilstand, kan du klikke på Opret forbindelse eller Afbryd forbindelse for at styre Internetforbindelsen manuelt. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Det sker, at forbindelsen ikke kan afbrydes, skønt du angiver den maksimale tomgangstid, fordi nogle programmer får adgang til internettet i back-enden."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på knappen Gem for at gemme indstillingerne."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G Avancerede indstillinger hjælp",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modemet",
                           content: "Viser statussen af 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Brug de auto-identificerede parametre fra internetudbyderen",
                           content: "Denne funktion er aktiveret som standard. Hvis aktiveret, kan routeren identificere internetudbyderen for SIM/UIM-kortet og udfylde parametrene automatisk. Hvis identifikationen fejler, skal du vælge regionen og den mobile internetudbyder manuelt."
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Vælg og vis området automatisk, når USB-modemet og SIM-kortet er korrekt identificeret. Hvis ikke, skal du vælge området fra rullemenuen."
                       } ,{                      
                           type: "name",
                           title: "Mobil-ISP",
                           content: "Viser internetudbyderen (ISP - Internet Service Provider) for 3G/4G-net. Hvis det ikke findes automatisk, skal du vælge internetudbyderen fra rullemenuen. Standard opkaldsnummer og APN bliver automatisk udfyldt i overensstemmelse hermed."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PINKODE",
                           content: "Hvis SIM/UIM-beskyttelse er aktiveret, skal du indtaste PIN-koden. SIM/UIM beskyttelsen er deaktiveret som standard. Bemærk, at hvis du indtaster en forkert PIN-kode 3 gange, vil SIM/UIM-kortet automatisk blive låst. Du kan kun låse den op ved at indtaste PUK-koden fra PC'en/den bærbare."
                       } ,{                      
                           type: "name",
                           title: "Meddelelse",
                           content: "Viser information om PIN-koden for SIM/UIM-kortet, hvis PIN-kode beskyttelse er aktiveret."
                       } ,{                      
                           type: "name",
                           title: "Indstillinger Ring til nummeret,APN,Brugernavn/adgangskode",
                           content: "Hvis internetudbyderen ikke findes på listen <strong>mobil internetudbyder</strong> , skal du marker dette afkrydsningsfelt og indtaste opkaldsnummeret, APN (Access Point Name), brugernavn og adgangskode, som du har fået af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Ring til nummeret",
                           content: "Indtast opkaldsnummeret fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Indtast det APN (Access Point Name), du har fået af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast brugernavnet og adgangskoden fra internetudbyderen. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Forbindelse på efterspørgsel",
                           content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Det sker, at forbindelsen ikke kan afbrydes, skønt du angiver den maksimale tomgangstid, fordi nogle programmer får adgang til internettet i back-enden."
                       } ,{                      
                           type: "name",
                           title: "Automatisk forbindelse",
                           content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                       } ,{                      
                           type: "name",
                           title: "Manuel forbindelse",
                           content: "I denne tilstand, kan du klikke på Opret forbindelse eller Afbryd forbindelse for at styre Internetforbindelsen manuelt. Denne funktion understøtter også funktionen Maksimal inaktiv periode. Angiv den maksimale tid (i minutter) internetforbindelsen kan være inaktiv, før den afsluttes i feltet Maksimal inaktiv periode. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Det sker, at forbindelsen ikke kan afbrydes, skønt du angiver den maksimale tomgangstid, fordi nogle programmer får adgang til internettet i back-enden."
                       } ,{                      
                           type: "name",
                           title: "Godkendelsestype",
                           content: "Vælg en godkendelsestype. Som standard er det automatisk. Nogle internetudbydere kræver en specifik godkendelsestype, du skal bekræfte den med internetudbyderen eller beholde standardindstillingerne."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Hvis Auto (standard), bestemmer routeren automatisk godkendelsestypen der anvendes af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Hvis PAP (Password Authentication Protocol - Godkendelsesprotokol for adgangskode) bruges, godkender router med peer ved hjælp af to håndtryk. Vælg denne indstilling, hvis din internetudbyder kræver denne godkendelsestype."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Hvis CHAP (Challenge Handshake Authentication Protocol - Godkendelsesprotokol med udfordring af håndtryk) bruges, godkender routeren med peer ved hjælp af tre håndtryk og validerer peer's identitet regelmæssigt. Vælg denne indstilling, hvis din internetudbyder kræver denne godkendelsestype."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard størrelse af MTU (Maximum Transmission Unit - maksimalt størrelse af transmissionsenhed) for de fleste Ethernet-netværk er 1480 bytes. Du bør ikke ændre det, medmindre det kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Brug de følgende DNS-servere",
                           content: "Hvis internetudbyderen giver IP-adresser for DNS-servere, skal du markere dette afkrydsningsfelt og indtaste IP-adresserne for <strong> Primære DNS </strong> og Sekundære DNS (valgfrit) nedenfor. Ellers vil DNS-serverne blive tildelt dynamisk af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Primær DNS",
                           content: "Indtast IP-adressen for DNS i punktumformat, som angivet af internetudbyder."
                       } ,{                      
                           type: "name",
                           title: "Sekundær DNS",
                           content: "(Valgfrit) Indtast endnu en IP-adresse for DNS i punktumformat, som angivet af internetudbyder."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på knappen <strong>Save</strong> (Gem) for at gemme indstillinger."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Enhedsindstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Siden Enhedsindstillinger viser de tilknyttede oplysninger om tilsluttede USB-lagringsenhed via USB-porten."
                       } ,{                      
                           type: "name",
                           title: "Scan",
                           content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne efter nye tilsluttede enhed og opdatere siden med de opdaterede oplysninger."
                       } ,{                      
                           type: "name",
                           title: "Volumen",
                           content: "Viser navnet på USB-drevet."
                       } ,{                      
                           type: "name",
                           title: "Kapacitet",
                           content: "Viser den samlede lagerkapacitet på USB'en."
                       } ,{                      
                           type: "name",
                           title: "Ledig plads",
                           content: "Viser den aktuelle frie lagerplads."
                       } ,{                      
                           type: "name",
                           title: "Sikker fjernelse",
                           content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren."
                       } ,{                      
                           type: "paragraph",
                           content: "Knappen Fjern vises kun, når USB-lagerenheden er tilsluttet routeren. Når det aktuelle drev er optaget, kan du ikke afmontere det."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Dette afkrydsningsfelt vises kun, når der er en USB-lagringsenhed, der er tilsluttet routeren. Vælg for at aktivere fildeling på USB-enheden."
                       } ,{                      
                           type: "step",
                           title: "Sådan etableres en filserver",
       content: [ 
                "1. Tilslut USB-lagringsenheden til USB-porten på routeren ved hjælp af et USB-kabel.",
                "2. Den nyligt tilsluttede USB-enhed bør automatisk blive registreret af routeren og oplysningerne bør vises under afsnittet Enhedsindstillinger. Hvis ikke, skal du klikke på Scan.",
                "3. Vælg Aktiveret for at aktivere fildeling."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Kontodeling",
               CONTENT: [{
                           type: "name",
                           title: "Konto",
                           content: "Du kan enten vælge at bruge Standard-konto for at logge på til de delte filer og mapper eller Brug ny konto og indtaste følgende for at oprette en ny brugerkonto."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast et brugernavn på mellem 1 og 15 alfanumeriske eller understregede tegn og en adgangskode på mellem 1 og 15 ASCII-tegn. Disse felter skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Bekræft adgangskode",
                           content: "Indtast adgangskoden igen for at bekræfte, at der ingen slåfejl er. Dette felt skelner også mellem store og små bogstaver."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på Gem for at gemme alle indstillingerne."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Indstillingerne for deling",
               CONTENT: [{
                           type: "name",
                           title: "Navn på netværk/Medie-server",
                           content: "Viser det navn der bruges til at få adgang til en tilsluttet USB-lagerenhed."
                       } ,{                      
                           type: "name",
                           title: "Aktiver",
                           content: "Vælg for at aktivere adgangsmetoden."
                       } ,{                      
                           type: "name",
                           title: "Adgangsmetode",
                           content: "Der er tre metoder til at give adgang til den tilsluttede USB-lagringsenhed. Du kan vælge en eller flere metoder ved at vælge det relevante afkrydsningsfelt.",
       children: [{                      
                           type: "name",
                           title: "Netværks nabolag",
                           content: "Hvis aktiveret, kan brugere på netværket få adgang til USB-lagringsenheden via en tildelt IP-adresse (f. eks. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Hvis aktiveret, kan FTP-klienter på det lokale netværk få adgang til USB-lagerenheden ved hjælp af den tildelte IP-adresse efterfulgt af FTP-serverens portnummer (f. eks. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (via internet)",
                           content: "Hvis den er aktiveret, kan brugerne få fjernadgang til USB-lagerenheden via FTP på internettet. Denne funktion understøtter både download og upload af filer. Sådan ændres FTP-serverens portnummer, skal man indtaste et portnummer og klikke på Gem for at anvende ændringerne."
                       }]
} ,{                      
                           type: "name",
                           title: "Link",
                           content: "Viser adressen der bruges til at få adgang til den tilsluttede USB-lagerenhed."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Indtast portnummeret på FTP-serveren. Brug standardværdien 21, eller indtast en værdi mellem 1024 og 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på Gem for at gemme alle indstillingerne."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Mappedeling",
               CONTENT: [{
                           type: "name",
                           title: "Del alt",
                           content: "Aktiver for at dele filer og mapper eller deaktiver for kun at dele de valgte mapper."
                       } ,{                      
                           type: "name",
                           title: "Aktiverer godkendelse",
                           content: "Det anbefales på det kraftigste at aktivere godkendelse for at kræve at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper."
                       } ,{                      
                           type: "name",
                           title: "Mappenavn",
                           content: "Viser navnet på den delte mappe."
                       } ,{                      
                           type: "name",
                           title: "Sti til mappe",
                           content: "Viser stien til den delte mappe."
                       } ,{                      
                           type: "name",
                           title: "Mediedeling",
                           content: "Angiver om den delte mappe er godkendt for deling af medier eller ej."
                       } ,{                      
                           type: "name",
                           title: "Drevnavn",
                           content: "Viser navnet på det delte drev."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser statusen af den delte mappe med lampeindikatoren."
                       } ,{                      
                           type: "name",
                           title: "Ændre",
                           content: "Viser indstillingerne for at ændre eller slette den pågældende delte mappe."
                       } ,{                      
                           type: "name",
                           title: "Gennemse",
                           content: "Klik på for at søge efter en fælles mappe."
                       } ,{                      
                           type: "name",
                           title: "Tillad adgang for gæstenetværket",
                           content: "Vælg for at tillade at klienter på gæstenetværket kan få adgang til de delte mapper."
                       } ,{                      
                           type: "name",
                           title: "Aktiverer godkendelse",
                           content: "Vælg for at kræve, at brugerne kan få adgang til de delte mapper med et gyldigt brugernavn og adgangskode."
                       } ,{                      
                           type: "name",
                           title: "Tillad skriveadgang",
                           content: "Vælg for at tillade brugere at foretage ændringer til mappeindholdet."
                       } ,{                      
                           type: "name",
                           title: "Tillad mediedeling",
                           content: "Vælg for at aktiveret mediedeling."
                       } ,{                      
                           type: "name",
                           title: "Opdater",
                           content: "Klik for at opdatere mappedelingslisten."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Printerserver",
               CONTENT: [{
                           type: "name",
                           title: "Printerserver",
                           content: "Aktiver for at aktivere printerserverfunktionen."
                       } ,{                      
                           type: "name",
                           title: "Printernavn",
                           content: "Viser navnet på printeren, der er tilsluttet til routeren."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine skaber sikkerhedskopierer alle filer på din Mac-computer til en USB-lagerenhed tilsluttet din modem router."
                       } ,{                      
                           type: "name",
                           title: "Aktivér ",
                           content: "Marker dette afkrydsningsfelt for at aktivere funktionen Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Backup-disk",
                           content: "Vælg hvor du vil gemme backups fra Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Maksimal filstørrelse for sikkerhedskopier",
                           content: "Afsætte hvor meget diskplads Time Machine kan bruge backups. 0 betyder ingen grænse."
                       } ,{                      
                           type: "name",
                           title: "Gem",
                           content: "Klik for at gemme dine indstillinger."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline download",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med Offline download aktiveret, kan routeren downloade filer, uden at computeren er tændt hele tiden."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Slå til for at aktivere funktionen Offline download."
                       } ,{                      
                           type: "name",
                           title: "Sti til mappe",
                           content: "Vælg en sti hvor downloader kan gemmes eller caches.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Du skal ikke ændre stien til mappen eller fjerne USB-lagerenheden ved overførsel og download af filer; ellers kan alvorlige fejl forekomme."
                       }]
} ,{                      
                           type: "name",
                           title: "Plan",
                           content: "Marker dette afkrydsningsfelt for at aktivere tidsplanen der giver dig mulighed for at angive de(n) periode(r) hvor der skal downloades/overføres filer."
                       } ,{                      
                           type: "name",
                           title: "Fortsæt overførelsen efter at opgaven fuldføres",
                           content: "Marker afkrydsningsfeltet for at blive ved med at overføre data fra færdige download(er) til andre."
                       } ,{                      
                           type: "name",
                           title: "Det maksimale antal aktive downloader",
                           content: "Indtast en værdi mellem 1 og 10 for at angive det maksimale antal aktive downloader. Standardværdien er 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Download",
               CONTENT: [{
                           type: "note",
                           title: "Fil",
                           content: "Viser navnet og typen af download-filen."
                       } ,{                      
                           type: "note",
                           title: "Hastighed",
                           content: "Viser hastigheden af den aktuelle download (eller upload)."
                       } ,{                      
                           type: "note",
                           title: "Afsluttet",
                           content: "Viser status for download."
                       } ,{                      
                           type: "note",
                           title: "Resterende tid",
                           content: "Viser den resterende downloadtid."
                       } ,{                      
                           type: "note",
                           title: "Tilsluttede Peers",
                           content: "Viser antallet af tilsluttede peers på overførslen."
                       } ,{                      
                           type: "note",
                           title: "Status",
                           content: "Viser den aktuelle status for download (downloader, venter, forhåndsudfyldning, pause, udført eller fejl)."
                       } ,{                      
                           type: "name",
                           title: "Sådan tilføjes et nyt download",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Vælg downloadkilden, stream fra PC, stream fra USB eller URL.",
                "3. Vælg stream-lokaliteten for BT, eller indtast URL'en for FTP, HTTP og aMule.",
                "4. Klik på Gem.",
                "5. For aMule, angiv aMule serverens IP-adresse og port under Avanceret > aMule Server."]
}]
} ,{                      
                           type: "name",
                           title: "Sådan slettes downloader",
                           content: "Vælg det tilsvarende afkrydsningsfelt for de(n) download(er), du vil slette, og klik derefter på Slet over tabellen."
                       } ,{                      
                           type: "name",
                           title: "Sådan sættes download på pause",
                           content: "Klik på det tilsvarende afkrydsningsfelt for de(n) download(er), du vil sætte på pause, og klik derefter på Pause over tabellen."
                       } ,{                      
                           type: "name",
                           title: "Sådan fortsættes downloader",
                           content: "Klik på det tilsvarende afkrydsningsfelt for de(n) download(er), du vil fortsætte, og klik derefter på Fortsæt over tabellen."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avanceret",
               CONTENT: [{
                           type: "name",
                           title: "Hastighedsgrænser",
                           content: "Angiv den maksimale download- og upload-hastigheden for internetforbindelsen."
                       } ,{                      
                           type: "name",
                           title: "Maksimal downloadhastighed",
                           content: "Indtast en værdi mellem 1 og 100000 kB/s for at angive den maksimale download-hastighed. Standardværdien er 1024."
                       } ,{                      
                           type: "name",
                           title: "Maksimal uploadehastighed",
                           content: "Indtast en værdi mellem 1 og 100000 kB/s for at angive den maksimale upload-hastighed. Standardværdien er 512."
                       } ,{                      
                           type: "name",
                           title: "Antal forbindelser",
                           content: "Angiv det maksimale antal forbindelser."
                       } ,{                      
                           type: "name",
                           title: "Samlet maksimalt antal forbindelser",
                           content: "Indtast en værdi mellem 1 og 200 for at angive det globale maksimale antal forbindelser. Standardværdien er 100."
                       } ,{                      
                           type: "name",
                           title: "Det maksimale antal tilsluttede Peers pr. Torrent",
                           content: "Indtast en værdi mellem 1 og 100 for at angive det maksimale antal af tilsluttede peers per torrent. Standardværdien er 50."
                       } ,{                      
                           type: "name",
                           title: "Aktiver DHT-netværk",
                           content: "Aktiver denne funktion for at forbedre effektiviteten for at finde peers, så du kan øge download-hastigheden."
                       } ,{                      
                           type: "name",
                           title: "Aktiver Peer Exchange",
                           content: "Aktiver denne funktion for at forbedre kommunikationen i gruppen af peers, så du kan øge download-hastigheden."
                       } ,{                      
                           type: "name",
                           title: "Aktiver BitTorrent protokolkryptering",
                           content: "Aktiver denne funktion for at styrke privatlivets fred og fortrolighed under dataoverførsel."
                       } ,{                      
                           type: "name",
                           title: "aMule-server",
                           content: "Indtast IP-adressen og porten på aMule-serveren. aMule download virker kun når routeren er forbundet til serveren."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Forældrekontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med forældrekontrol, kan du blokere upassende, eksplicitte og ondsindede websteder; begrænse adgangen på visse tidspunkter af dagen (f.eks Facebook eller YouTube i tiden for hjemmearbejde)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Enheder med forældrekontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser oplysninger og indstillinger af de enheder, der aktuelt er begrænset af forældrekontrol."
                       } ,{                      
                           type: "step",
                           title: "Sådan begrænses en ny klientenhed",
       content: [ 
                "1. Skift forældrekontrol til.",
                "2. Klik på Tilføj.",
                "3. Klik på Scan for at vælge en aktuelt tilsluttet enhed fra listen over enheder med adgang, eller indtast navnet på enheden og MAC-adressen manuelt for at tilføje en enhed, som ikke er forbundet.",
                "4. Klik på ikonet Faktiske tidsplan for at angive en tidsperiode, hvor begrænsningen gælder.",
                "5. Indtast en kort beskrivelse i feltet Beskrivelse. Dette felt er valgfrit.",
                "6. Vælg Aktiverer dette valg",
                "7. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Indholdsbegrænsning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Indholdsbegrænsning giver mulighed for at begrænse adgangen til bestemte hjemmesider ved hjælp af søgeord og domænenavne. Klientens enheder der styres af Forældrekontrol kan eller kan ikke få adgang til disse websteder, afhængigt af den begrænsningspolitik, du vælger."
                       } ,{                      
                           type: "step",
                           title: "For at angive indholdet for adgang",
       content: [ 
                "1. Slå indholdsbegrænsninger til.",
                "2. Vælg restriktionpolitik i henhold til behovene:",
                "A. Hvis du vil have at de kontrollerede enheder får adgang til alle websteder undtagen nogle særlige, skal du vælge Blacklist.",
                "B. Hvis du vil have at de kontrollerede enheder kun skal have adgang til visse websteder, skal du vælge Whitelist.",
                "3. Klik på Tilføj et nyt nøgleord for at tilføje et webadresse søgeord (f.eks wikipedia) eller domænenavn til Blacklisten eller til whitelisten.",
                "4. Klik på Gem."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) hjælper med at prioritere trafikken på internettet baseret på dine behov. Du kan angive prioritetsniveauet for en enhed, en fysisk port, eller et program i listen med QoS-regler."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Bemærk",
                           content: "Hvis NAT Boost er aktiveret, skal QoS være deaktiveret."
                       } ,{                      
                           type: "name",
                           title: "Upload båndbredde",
                           content: "Indtast den maksimale båndbredde for upload fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Download båndbredde",
                           content: "Indtast den maksimale båndbredde for download fra internetudbyderen."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avanceret",
               CONTENT: [{
                           type: "name",
                           title: "Høj / Mellem / Lav prioritet",
                           content: "Angiv en procentsats for trafik med høj/mellem/lav prioritet.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Den maksimale størrelse (i procent) af alle prioriteter er 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS-regelliste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Her kan du tilføje detaljerede QoS-regler for at prioritere internettrafikken."
                       } ,{                      
                           type: "step",
                           title: "Sådan konfigureres en QoS-regel",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Vælg en prioritetstype at tilføje til QoS-reglen.",
                "Efter enheder - Klik på Scan for at vælge den ønskede enhed, eller manuelt indtaste et enhedsnavn og dens MAC-adresse.",
                "Efter anvendelse - Vælg det ønskede program eller tilpas et program ved at konfigurere navn, protokol og destination port (1-65535). Du kan indtaste en enkelt port eller flere porte eller portinterval, adskilt af kommaer (f.eks 21,36-105,111).",
                "Efter fysisk port - Vælg den ønskede port.",
                "3. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Du kan trække en regel mellem forskellige prioriteringslister for at ændre dens prioritet."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Opgradering af database",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vi vil frigive den nyeste database version på www.tp-link.com. Du kan downloade og opdatere routerens database for at udvide dens understøttede programmer."
                       } ,{                      
                           type: "name",
                           title: "Ny databasefil",
                           content: "Klik på Gennemse for at finde den nyeste databasefil. Vælg det og klik på Opgrader for at opgradere databasen til den nyeste version."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "SPI-firewall",
                           content: "SPI (Stateful Packet Inspection) firewall forhindrer cyberangreb og validerer den trafik, der passerer gennem en router, der er baseret på protokollen. Som standard er denne funktion aktiveret."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS beskyttelse",
               CONTENT: [{
                           type: "name",
                           title: "DoS beskyttelse",
                           content: "DoS (Denial of Service)-beskyttelse beskytter internettet mod DoS-angreb fra at overbelaste netværket med serveranmodninger. Du kan filtrere de følgende tre former for angreb i henhold til behovene. Der er fire niveauer for hver filtrering:",
       children: [{                      
                           type: "name",
                           title: "Slukket",
                           content: "Ingen beskyttelse."
                       } ,{                      
                           type: "name",
                           title: "Lav",
                           content: "Beskyttelse på lavt niveau og lav indflydelse på routerens ydelse."
                       } ,{                      
                           type: "name",
                           title: "Midt",
                           content: "Beskyttelse på middelniveau og middel indflydelse på routerens ydelse."
                       } ,{                      
                           type: "name",
                           title: "Høj",
                           content: "Beskyttelse på højt niveau med bemærkelsesværdig indflydelse på routerens ydelse."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD angrebsfiltrering",
                           content: "Aktiver for at forhindre, ICMP (Internet Control Message Protocol) overbelastningsangreb."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD angrebsfiltrering",
                           content: "Aktiver for at forhindre, UDP (User Datagram Protocol) overbelastningsangreb."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD angrebsfiltrering",
                           content: "Aktiver for at undgå TCP-SYN (Transmission Control Protocol-Synchronize) overbelastningsangrebet."
                       } ,{                      
                           type: "name",
                           title: "Ignorer Ping-pakke fra WAN-port",
                           content: "Aktiverer at ignorere pingpakker fra WAN-porten."
                       } ,{                      
                           type: "name",
                           title: "Forbyd Ping-pakke fra LAN-port",
                           content: "Aktiverer for at forbyde pingpakker fra LAN-porten."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Blokeret DoS host-liste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser IP-adressen og MAC-adressen på den blokerede DoS vært(er)."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Adgangskontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Adgangskontrol anvendes til at tillade eller blokere for bestemte klient enheder fra at få adgang til netværket. Når en enhed er blokeret, kan den ikke kommunikere med andre enheder eller oprette forbindelse til internettet."
                       } ,{                      
                           type: "step",
                           title: "For at styre adgangen",
       content: [ 
                "1. Slå til for at aktivere adgangskontrol.",
                "2. Hvis du også ønsker at kontrollere adgangen for de enheder, der er tilsluttet gæstenetværket, skal du aktivere Kontrol af gæsteenheder.",
                "3. Vælg en adgangstilstand efter behov og klik på Gem:",
                "A. Hvis du vil blokere adgang fra enhederne i listen nedenfor, skal du vælge Blacklist.",
                "A. Hvis du kun vil tillade adgang fra enhederne i listen nedenfor, skal du vælge Whitelist.",
                "4. På Enheder i Blacklist / Whitelist afsnittet, skal du klikke på Tilføj. Indtast enhedsnavnet og MAC-adressen på enheden. Klik på Save (Gem)."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Enheder online",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser oplysninger om alle tilsluttede enheder (herunder enheder tilsluttet til gæstenetværk hvis kontrol af gæstenetværk er aktiveret)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC-binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC Binding (også kendt som ARP-binding) er nyttigt til kontrol af adgangen til en bestemt enhed på LAN ved at binde IP-adressen og MAC-adressen for enheden sammen. IP & MAC-binding forhindrer også andre enheder fra at bruge en specifik IP-adresse."
                       } ,{                      
                           type: "step",
                           title: "Sådan konfigureres en enhed med IP & MAC Binding",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Indtast MAC-adressen på enheden.",
                "3. Indtast en IP-adresse, som du vil binde til ovennævnte MAC-adresse.",
                "4. Vælg Aktiver.",
                "5. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
       content: [ 
                "1. Du kan ikke binde den samme IP-adresse til flere MAC-adresser.",
                "2. Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP-liste",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser IP-adressen og MAC-adressen på de aktuelt forbundne enheder."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol version 6) er den nyeste version af IP (Internet Protocol) og klarer problemet som IPv4 (Internet Protocol version 4) havde med at løbe tør for adresser."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: Dynamisk IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Vælg denne type, hvis internetudbyderen bruger tildeling af dynamiske IPv6-adresser."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse/primær DNS/sekundær DNS",
                           content: "Disse parametre tildeles automatisk af DHCPv6-serveren fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Forny",
                           content: "Klik på for at få nye IPv6-parametre fra internetudbyderens DHCPv6-server."
                       } ,{                      
                           type: "name",
                           title: "Udgivelse",
                           content: "Klik på for at frigive alle IPv6-adresser tildelt af internetudbyders DHCPv6-server."
                       } ,{                      
                           type: "name",
                           title: "Hent IPv6-adresse",
                           content: "Vælg DHCPv6 for at få en midlertidig IPv6-adresse eller SLAAC for at få en IPv6-adresse fra routerannonceringspakken, ifølge internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Delegering af præfiks",
                           content: "Vælg Aktiver for at få et præfiks delegeret af DHCPv6-serveren fra internetudbyderen, eller Deaktiver for at designere en præfiksadresse manuelt. Klienter på LAN vil generere en IPv6-adresse med dette præfik."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Vælg hent dynamisk fra internetudbyderen eller brug følgende DNS-adresser. Hvis Brug følgende DNS-adresse vælges, skal du manuelt indtaste DNS-adressen, som internetudbyderen har opgivet."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: Statisk IP"
                       } ,{                      
                           type: "name",
                           title: "Statisk IP",
                           content: "Vælg denne type, hvis internetudbyderen bruger tildeling af statiske IPv6-adresser."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse/standard gateway/primær DNS/sekundær DNS",
                           content: "Indtast disse parametre fra din internetudbyder."
                       } ,{                      
                           type: "name",
                           title: "MTU-størrelse",
                           content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: 6to4-tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4-tunnel",
                           content: "Vælg denne type, hvis internetudbyderen bruger 6to4 implementering til at tildele adresser."
                       } ,{                      
                           type: "name",
                           title: "IPv4 adresse/IPv4 Undernetmaske/IPv4 Standard Gateway/Tunneladresse",
                           content: "Disse parametre skal genereres dynamisk fra IPv4 information på WAN-porten efter at du klikke på Opret forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Brug følgende DNS-server",
                           content: "Marker for at angive den primære DNS og/eller sekundære DNS som oplyst af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Tilslut",
                           content: "Klik for at oprette forbindelse til internettet."
                       } ,{                      
                           type: "name",
                           title: "Afbryd",
                           content: "Klik på for at afbryde forbindelsen til internettet."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Vælg denne type, hvis internetudbyderen bruger PPPoEv6, og giver dig et brugernavn og adgangskode."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn/adgangskode",
                           content: "Indtast disse parametre fra din internetudbyder."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adresse",
                           content: "Denne adresse vil blive tildelt automatisk af internetudbyderens DHCPv6-server, når du har indtastet brugernavn og adgangskode, og klik på Opret forbindelse."
                       } ,{                      
                           type: "name",
                           title: "Hent IPv6-adresse",
                           content: "Vælg DHCPv6 for at få en midlertidig IPv6-adresse eller SLAAC for at få en IPv6-adresse fra routerannonceringspakken, eller specificeret af internetudbyderen for manual indtastning af IPv6-adressen, ifølge internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Delegering af præfiks",
                           content: "Vælg Aktiver for at få et præfiks delegeret af DHCPv6-serveren fra internetudbyderen, eller Deaktiver for at designere en præfiksadresse manuelt. Klienter på LAN vil generere en IPv6-adresse med dette præfik."
                       } ,{                      
                           type: "name",
                           title: "DNS-adresse",
                           content: "Vælg for at hente dynamisk fra internetudbyderen eller brug følgende DNS-adresser. Hvis Brug følgende DNS-adresse vælges, skal du manuelt indtaste DNS-adressen, som internetudbyderen har opgivet."
                       } ,{                      
                           type: "name",
                           title: "Tilslut",
                           content: "Klik for at oprette forbindelse til internettet."
                       } ,{                      
                           type: "name",
                           title: "Afbryd",
                           content: "Klik på for at afbryde forbindelsen til internettet."
                       } ,{                      
                           type: "title",
                            title: "Internetforbindelsestype: Passthrough (Bro)"
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg denne type, hvis internetudbyderen bruger passthrough (Bro) netværksimplementering. Ingen konfiguration nødvendig for denne type forbindelse."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Undtagen for typen passthrough (Bro) af internetforbindelse, kræver de øvrige typer af internetforbindelse IPv6-konfiguration."
                       } ,{                      
                           type: "name",
                           title: "Tildelt type",
                           content: "Vælg den ønskede, som anbefalet af internetudbyderen.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Sådan tildeles IP-adresser automatisk til klienter på internettet.",
       children: [{                      
                           type: "name",
                           title: "Præfiks for adresse",
                           content: "Indtast adressepræfikset fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Udløsningstid",
                           content: "Det er det gyldige tidspunkt for den tildelte IP-adresse. Enten behold standardværdien på 86400 sekunder eller ændr den hvis det kræves af internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adresse der er tildelt automatisk af DHCPv6-serveren fra internetudbyderen."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+tilstandsfri DHCP",
       children: [{                      
                           type: "name",
                           title: "Præfiks for adresse",
                           content: "Indtast adressepræfikset fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adressen der er tildelt automatisk af internetudbyderen."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Præfiks for adresse",
                           content: "Indtast adressepræfikset fra internetudbyderen."
                       } ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Det er IP-adressen der er tildelt automatisk af internetudbyderen."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC-klone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vælg den relevante MAC Clone-metode, som du har brug for."
                       } ,{                      
                           type: "name",
                           title: "Klon IKKE MAC-adressen",
                           content: "Undlad at ændre routerens MAC-adresse, hvis internetudbyderen ikke binder den tildelte IP-adresse til en MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Klon computerens aktuelle MAC-adresse",
                           content: "Vælg for at kopiere den aktuelle MAC-adressen på computeren, der er sluttet til routeren, hvis internetudbyderen binder den tildelte IP-adresse til computerens MAC-adresse."
                       } ,{                      
                           type: "name",
                           title: "Brug brugerdefineret MAC-adresse",
                           content: "Indtast MAC-adressen manuelt, hvis internetudbyderen binder den tildelte IP-adresse til den specifikke MAC-adresse."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"indstilling af tid",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tidsindstillinger giver dig mulighed for at konfigurere systemets tid for routeren. Når ændret vil systemets tid blive brugt på tidsbaserede funktioner og konfigurationer, såsom Forældrekontrol."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Du kan aktivere 24-timers funktionen, før konfiguration, der vil blive anvendt til system-tid-baserede funktioner og konfigurationer."
                       } ,{                      
                           type: "title",
                            title: "Systemtid"
                       } ,{                      
                           type: "step",
                           title: "Hent tiden automatisk fra internettet",
       content: [ 
                "Valgt som standard, Hent fra internettet giver dig mulighed for at få systemtiden fra internettet.",
                "1. Vælg Hent fra internettet.",
                "2. Vælg din lokale tidszone fra rullemenuen.",
                "3. I feltet for NTP-server I, skal du indtaste IP-adressen eller domænenavnet for den ønskede NTP-server.",
                "4. I feltet for NTP-server II, skal du indtaste IP-adressen eller domænenavnet for den anden NTP-server. (Valgfri)",
                "5. Klik på Hent.",
                "6. Klik på Gem."]
} ,{                      
                           type: "step",
                           title: "For at få tiden fra PC",
       content: [ 
                "Denne funktion giver dig mulighed for at få systemets tid fra PC'en. Bekræft PC-tiden, før konfigurationen.",
                "Vælg Hent fra PC og klik på Gem."]
} ,{                      
                           type: "step",
                           title: "Hvis du manuelt indstille tid",
       content: [ 
                "Hvis enheden ikke automatisk kan få tid fra internettet eller pc, kan du manuelt konfigurere systemtiden.",
                "1. Vælg Manuelt.",
                "2. Indtast den aktuelle dato og tid.",
                "3. Klik på Gem."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Sommertid",
                           content: "Denne funktion kan automatisk synkronisere systemets tid med sommertid."
                       } ,{                      
                           type: "step",
                           title: "Opsætning af sommertid",
       content: [ 
                "1. Vælg Aktiver sommertid.",
                "2. Angiv en tidsperiode for sommertid i den lokale tidszone.",
                "3. Klik på Gem."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Fejlfinding",
               CONTENT: [{
                           type: "paragraph",
                           content: "Routeren har Ping- og Traceroute-værktøjer til at hjælpe dig med at fejlfinde problemer med netværket."
                       } ,{                      
                           type: "title",
                            title: "Ping og Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping-værktøjet sender pakker til en IP-adresse eller et domænenavn og logger resultaterne, f. eks. antallet af pakker, der er sendt og modtaget, og tur-returtiden."
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute-værktøjet sender pakker til en IP-adresse eller domænenavn og viser antallet af hop og tiden for at nå destinationen."
                       } ,{                      
                           type: "paragraph",
                           content: "Du kan bruge ping eller traceroute på en lokal enhed ved hjælp af IP-adressen eller et domænenavn, såsom tp-link.com, yahoo.com, osv."
                       } ,{                      
                           type: "step",
                           title: "Sådan diagnosticerer man ved hjælp af Ping",
       content: [ 
                "1. Vælg Ping som Fejlfindingsværktøj.",
                "2. Indtast IP-adressen eller domænenavnet du ønsker at nå.",
                "3. Klik på pilen for at åbne menuen Avanceret og angive Ping-tælleren, og Ping-pakkestørrelsen. (Valgfri)",
                "4. Klik på Start."]
} ,{                      
                           type: "step",
                           title: "Sådan diagnosticerer man ved hjælp af Traceroute",
       content: [ 
                "1. Vælg Traceroute som Fejlfindingsværktøj.",
                "2. Indtast IP-adressen eller domænenavnet du ønsker at nå.",
                "3. Klik på pilen for at åbne menuen Avanceret og angive antallet af hop (der skal nås) i feltet Traceroute Max TTL (Time to Live). Standardindstillingen er 20. (Valgfri)",
                "4. Klik på Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Portspejling"
                       } ,{                      
                           type: "paragraph",
                           content: "Portspejlning henviser til processen at videresende kopier af pakker fra en spejlet port til en spejlingsport. Sædvanligvis er spejlingsporten forbundet til en data diagnosticeringsenhed, som anvendes til at analysere de spejlede pakker til overvågning og fejlfinding af netværket."
                       } ,{                      
                           type: "step",
                           title: "Hvis du vil videresende kopier af pakker til den udpegede port",
       content: [ 
                "1. Aktiver Portspejling.",
                "2. Vælg de ønskede porte som spejlede porte.",
                "3. Vælg de ønskede porte som spejlingsporte.",
                "4. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "En port kan ikke indstilles som spejlet port og den spejlingsport samtidigt."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Opgradering af firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firmware opgradering opdaterer routerens firmware med nye funktioner eller fejlrettelser. Det anbefales at opgradere routeren med den nyeste firmware-fil for at have den bedste ydeevne."
                       } ,{                      
                           type: "step",
                           title: "Bemærke følgende vil hjælpe dig med at undgå opgraderingsfejl:",
       content: [ 
                "Før opgradering",
                "1. Sørg for at du har en stabil forbindelse mellem routeren og computeren. Det anbefales IKKE at opgradere firmwaren trådløst.",
                "2. Sørg for at du har fjernet alle USB-enheder, der er forbundet til routeren.",
                "3. Husk at lave en backup af routerens konfigurationsfil.",
                "Under opgradering",
                "Holde routeren TÆNDT, indtil opgraderingen er fuldført."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Sådan opgraderes firmwaren online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Klik på Update (Opdater) og bekræft når du bliver bedt om det. Routeren vil automatisk downloade og opgradere til den seneste firmware. Du kan også klikke på Check for upgrade (Tjek om der er opgraderinger), for at tjekke for den seneste firmware version."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Sådan opgraderes firmwaren manuelt",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Klik på Support nederst på siden og download den seneste firmware til computeren. Kontroller at den firmwarefil, du vil downloade, passer med routerens hardwareversion, som vist på siden.",
                "2. Klik på Browse (Gennemse) og vælg den downloadede firmwarefil.",
                "3. Klik på Opgrader."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Opgraderingen af firmwaren tager et par minutter at færdiggøre. Routeren vil automatisk genstarte når opgraderingen af firmwaren er færdig."]
}]
},
       BACKUP :{ 
               TITLE:"Backup og gendannelse",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen Backup og gendannelse giver dig mulighed for at sikkerhedskopiere routerens aktuelle konfiguration til gendannelse, eller blot at gendanne routeren til standardindstillingerne."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Sluk IKKE for routeren, mens sikkerhedskopiering eller opdatering er i gang."
                       } ,{                      
                           type: "title",
                           title: "Backup",
                           content: "Det anbefales på det kraftigste, at du sikkerhedskopierer din aktuelle konfiguration, for det tilfælde at det er nødvendig for at gendanne routeren til en tidligere tilstand."
                       } ,{                      
                           type: "step",
                           title: "Sådan foretages en sikkerhedskopiering af den aktuelle konfiguration",
       content: [ 
                "1. Klik på Backup.",
                "2. Vent mens routeren foretager sikkerhedskopiering af den aktuelle konfiguration."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Gendan",
                           content: "Du kan gendanne routerens til en tidligere status fra en backup-fil."
                       } ,{                      
                           type: "step",
                           title: "Sådan gendannes fra backup",
       content: [ 
                "1. Klik på Gennemse.",
                "2. Find og vælg backup-filen.",
                "3. Klik på Gendan."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Gendannelse af fabriksindstillingerne",
       content: [ 
                "Nulstilling af routeren til fabriksindstillingerne vil fjerne alle dine konfigurationer og indstillinger og routeren vil vende tilbage til fabriksindstillingerne. For eksempel vil indstillinger for trådløs forbindelse, forældrekontrol og netværksoplysninger blive slettet.",
                "Efter en nulstilling til fabriksindstillinger skal du vælge et nyt kodeord for at få adgang til routerens web-administrationsside."]
}]
},
       REBOOT :{ 
               TITLE:"Reboot Schedule (”genstartsplan”)",
               CONTENT: [{
                           type: "paragraph",
                           content: "Reboot Schedule-funktionen rydder cachen, så routerens ydelse fortsat er optimal. Du kan genstarte routeren manuelt, eller sætte den til at genstarte regelmæssigt."
                       } ,{                      
                           type: "step",
                           title: "For at genstarte manuelt",
       content: [ 
                "Klik på Genstart, og vent et par minutter mens routeren genstarter."]
} ,{                      
                           type: "step",
                           title: "Sådan vælger du et genstartstidspunkt",
       content: [ 
                "1. Aktivér Reboot Schedule.",
                "2. Vælg, hvornår og hvor ofte routeren skal genstarte, ved at angive parametrene i Reboot Time (”genstartstid”)- og Repeat (”gentag”)-felterne.",
                "3. Klik på Gem."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administration",
               CONTENT: [{
                           type: "paragraph",
                           content: "Administrationen lader dig vælge et login-kodeord og adgangstilladelserne for de klienter, der er forbundet til routeren."
                       } ,{                      
                           type: "name",
                           title: "Kontostyring",
                           content: "Denne funktion gør det muligt at ændre adgangskoden.",
       children: [{                      
                           type: "step",
                           title: "For at ændre adgangskoden.",
       content: [ 
                "1. Indtast gammel adgangskode.",
                "2. Indtast ny adgangskode.",
                "3. Bekræft ny adgangskode.",
                "4. Klik på Gem."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Gendannelse af adgangskode",
               CONTENT: [{
                           type: "name",
                           title: "Gendannelse af standard adgangskode",
                           content: "Default Password Recovery (”gendannelse af standardkodeord”) lader dig vende tilbage til standardkodeordet uden at nulstille routeren til fabriksindstillingerne.",
       children: [{                      
                           type: "step",
                           title: "For at ændre adgangskoden.",
       content: [ 
                "1. Aktiver funktionen Gendannelse af standard adgangskode.",
                "2. I feltet Fra skal du indtaste en gyldig e-mailadresse, der bruges til at sende en bekræftigelseskode for at gendanne loginoplysninger.",
                "3. I feltet Til, skal du indtast en gyldig e-mailadresse, der bruges til at modtage bekræftigelseskoden.",
                "4. Indtast SMTP-serveren for den udgående e-mail (Fra).",
                "5. Hvis e-mailen i feltet Fra kræver kryptering, skal du markere afkrydsningsfeltet Aktiver godkendelse og indtaste dets brugernavn (e-mailadresse) og adgangskode.",
                "6. Klik på Gem."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Lokalstyring",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funktion giver lokale enheder adgang til administration af routeren."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Lokal administration via HTTPS",
                           content: "Aktivér Lokal administration via HTTPS, hvis du ønsker at have adgang til routeren via både HTTPS og HTTP, eller lad den være deaktiveret, hvis du kun ønsker at have adgang til routeren via HTTP."
                       } ,{                      
                           type: "name",
                           title: "Adgang for alle LAN-tilsluttede enheder",
                           content: "Aktiver for at aktivere lokal styring af alle enheder på internet forbundne enheder eller deaktiver for at aktivere styring af en bestemt enhed."
                       } ,{                      
                           type: "name",
                           title: "MAC-adresse",
                           content: "Viser MAC-adressen på enheden med begrænsede adgang."
                       } ,{                      
                           type: "name",
                           title: "Beskrivelse",
                           content: "Viser beskrivelsen på enheden med begrænsede adgang."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Viser den aktuelle status af enheden for begrænset adgang (aktiveret eller deaktiveret)."
                       } ,{                      
                           type: "name",
                           title: "Ændre",
                           content: "Viser indstillinger for at ændre og slette den tilsvarende enhed fra listen."
                       } ,{                      
                           type: "step",
                           title: "Sådan tilføjes en klientenhed til listen",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Klik på Vis eksisterende enheder for at vælger en eksisterende enhed, eller indtast MAC-adressen for en enhed i feltet MAC-adresse.",
                "3. Indtast en beskrivelse for enheden.",
                "4. Vælg Aktiver.",
                "5. Klik på OK."]
} ,{                      
                           type: "step",
                           title: "Rediger eller slet en enhed på listen",
                           content: "I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
                       } ,{                      
                           type: "step",
                           title: "Sådan sletter du flere enheder",
                           content: "Vælg alle de enheder, som du ønsker at slette og klik på Slet."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Fjernadministration",
               CONTENT: [{
                           type: "name",
                           title: "Fjernadministration",
                           content: "Funktionen Fjernstyring giver mulighed for fjernenheder at få adgang til og administrere routeren.",
       children: [{                      
                           type: "step",
                           title: "For at forbyde alle fjernenheder at styre routeren",
                           content: "Vælg deaktiver fjernstyring og klik på Gem."
                       } ,{                      
                           type: "step",
                           title: "For at tillade alle fjernenheder at styre routeren",
       content: [ 
                "1. Vælg Aktiverer fjernadministration for ALLE enheder.",
                "2. Indtast porten for web-administration (1024-65535 eller 80), gennem hvilke eksterne enheder vil få adgang til routeren.",
                "3. Klik på Gem."]
} ,{                      
                           type: "step",
                           title: "For at tillade en specifik fjernenhed at styre routeren",
       content: [ 
                "1. Vælg Aktiverer fjernadministration for en specifik enhed.",
                "2. Indtast porten for web-administration (1024-65535 eller 80), gennem hvilke eksterne enheder vil få adgang til routeren.",
                "3. Indtast fjernadministrations IP-adressen eller MAC-adressen for den eksterne enhed for at få adgang til routeren.",
                "4. Klik på Gem."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Fjernadministration",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen Fjernstyring giver dig adgang til og konfigurere routeren fra internettet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Sådan konfigurerer du fjernadministration"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Markér afkrydsningsfeltet for at aktivere funktionen Fjernadministration."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Behold HTTPS-porten og HTTP-porten som standardindstillingerne."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Vælg, hvilken enhed der skal have fjernadgang til routeren:",
       children: [{                      
                           type: "name",
                           title: "Alle enheder",
                           content: "Alle fjernenheder kan få adgang til routeren."
                       } ,{                      
                           type: "name",
                           title: "Valgt enhed",
                           content: "Indtast IP-adressen på den fjernenhed, du vil give adgang til routeren."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Klik på Gem."
                       } ,{                      
                           type: "paragraph",
                           content: "Nu kan du fjernadministrere routeren via den adresse, der vises under Webadresse til administration."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis der vises en advarsel, når du besøger ovenstående adresse via fjernadgang, skal du klikke på \"Trust\" (eller lignende) for at fortsætte."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"Lysdiode",
               CONTENT: [{
                           type: "paragraph",
                           content: "Når Nattilstand er aktiveret, vil lysdioderne være slukket i den angivne periode hver dag uden at påvirke routerens ydelse."
                       } ,{                      
                           type: "step",
                           title: "Aktiver nattilstand",
       content: [ 
                "1. Vælg Aktiver nattilstand.",
                "2. Angiv en tidsperiode, hvor lysdioderne vil være slukket.",
                "3. Klik på Gem."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Systemlog",
               CONTENT: [{
                           type: "paragraph",
                           content: "Systemloggen viser de seneste aktiviteter (hændelser) på routeren. Tabellen består af den type, niveau og logindhold af systemets logfiler, som kan filtreres til at blive vist. Du kan også gemme systemets logfiler til den lokale computer eller sende dem til e-mail."
                       } ,{                      
                           type: "step",
                           title: "For at gemme systemets logfiler til den lokale computer",
       content: [ 
                "1. Indstil Type og minimumniveau for at filtrere de ønskede systemlogfiler. Listen Niveau er i faldende rækkefølge, med det laveste niveau opført sidst.",
                "2. Klik på Gem log for at gemme systemlogfilerne til den lokale computer."]
} ,{                      
                           type: "step",
                           title: "For at modtage systemets logfiler via e-mail",
       content: [ 
                "1. Indstil Type og niveau for at filtrere de ønskede systemlogfiler. Listen Niveau er i faldende rækkefølge, med det laveste niveau opført sidst.",
                "2. Klik på e-mailindstillinger.",
                "3. I feltet Fra, indtast en gyldig e-mailadresse, der skal bruges som udgående e-mail.",
                "4. I feltet Til, indtast en gyldig e-mailadresse, der skal bruges som indkommende e-mail.",
                "5. Indtast SMTP-serveradressen på den udgående e-mail (Fra).",
                "Bemærk: Hvis den udgående e-mail kræver godkendelse, skal du markere afkrydsningsfeltet Aktiver godkendelse og indtaste dets brugernavn (e-mailadresse) og adgangskode.",
                "6. Hvis du ønsker at modtage systemets logfiler via e-mail regelmæssigt, skal du markere afkrydsningsfeltet Aktiver automatisk mail og angive et bestemt tidspunkt (i 24-timers format) eller et tidsinterval.",
                "Hvis du ønsker straks at modtage de nuværende systemlogger, skal du klikke på Mail log nu.",
                "7. Klik på Gem."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Trafikmonitor",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser brugstrafikken af en enhed i de sidste 10 minutter, eller for alle enheder i de seneste 10 minutter/24 timer/7 dage."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Liste for trafikmonitor",
               CONTENT: [{
                           type: "paragraph",
                           content: "Listen er grupperet efter forbindelsestype af enheder: kabelforbundne eller trådløse."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Systemparametre",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "2,4GHz/5GHz trådløst netværk",
                           content: "Denne sektion tillader dig at konfigurere parametrene for trafik transmissionsregler i trådløse netværk. Det anbefales at beholde standardindstillingerne, hvis du ikke er sikker på de rette i sammenhængen."
                       } ,{                      
                           type: "name",
                           title: "Statusinterval",
                           content: "Indtast en værdi mellem 40 og 1000 i millisekunder til at bestemme varigheden mellem statuspakker, der udsendes af routeren for at synkronisere det trådløse netværk. Standardværdien er 100 millisekunder."
                       } ,{                      
                           type: "name",
                           title: "RTS-tærskel",
                           content: "Indtast en værdi mellem 1 og 2346 for at bestemme pakkestørrelsen for datatransmission gennem routeren. Som standard er RTS (Request to Send) tærskelværdien 2346. Hvis pakkestørrelsen er større end den indstillede grænse, sender routeren anmodninger om at sende til en bestemt modtagestation og aftaler afsendelse af en dataramme, eller pakken sendes straks."
                       } ,{                      
                           type: "name",
                           title: "DTIM-interval",
                           content: "Denne værdi bestemmer intervallet for DTIM (Delivery Traffic Indication Message). Indtast en værdi mellem 1 og 15 intervaller. Standardværdien er 1, hvilket angiver at DTIM-intervalet er det samme som statusintervalet."
                       } ,{                      
                           type: "name",
                           title: "Opdateringsinterval for gruppenøgle",
                           content: "Indtast antallet af sekunder (minimum 30) for at kontrollere tidsintervallet for krypteringsnøglens automatiske fornyelse. Standardindstillingen er 0, hvilket angiver ingen fornyelse af nøglen."
                       } ,{                      
                           type: "name",
                           title: "WMM-funktioner",
                           content: "WMM-funktionen garanterer at pakkerne med højprioritetsmeddelelser sendes fortrinsvis. Det er aktiveret som standard og anbefales kraftigt."
                       } ,{                      
                           type: "name",
                           title: "Kort GI-funktion",
                           content: "Denne funktion er aktiveret som standard og anbefalede for at øge pakkekapaciteten ved GI-tiden (Guard Interval)."
                       } ,{                      
                           type: "name",
                           title: "AP isolationsfunktion",
                           content: "Hvis du vil indskrænke og begrænse alle trådløse enheder, som er tilsluttet netværket, i at interagere med hinanden, men stadig kan få adgang til internettet, skal du vælge afkrydsningsfeltet Aktiver AP-isolation."
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
                           title: "For at aktivere WDS",
                           content: "Funktionen WDS (Wireless Distribution System) Bridging giver dig mulighed for at udvide dækningen af det trådløse netværk ved at slå bro med et AP (adgangspunkt) i et trådløst WLAN (lokalt netværk)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Vælg for at aktivere WDS Bridging-funktionen.",
                "2. For at bygge bro til et netværk med Scan-funktion: klikke på Scan for at scanne og vise alle tilgængelige netværk, og vælg det netværk, du vil bygge bro med. SSID (netværksnavnet), MAC-adressen, og sikkerheden vil automatisk blive udfyldt.",
                "Eller for at bygge en netværksbro manuelt: Indtast SSID'et (netværksnavnet), MAC-adressen og WDS-tilstanden af netværket der skal bygges bro til. Vælg en sikkerhedstype og indtast relaterede parametre, som bør være det samme som det netværk, der bygges bro til.",
                "3. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du ikke er sikker på WDS tilstanden, så behold standardindstillingen Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) gør det muligt let at tilslutte de WPS-aktiverede enheder til routeren ved at trykke på WPS-knappen. Marker for at aktivere WPS-funktionen og klik på Gem."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Denne funktion er aktiveret som standard. Det anbefales at beholde standardindstillingen. Hvis du deaktiverer den, vil du muligvis ikke have adgang til internettet."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Når NAT er deaktiveret, vil konfigurationer i NAT-viderestilling ikke træde i kraft."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT-boost",
                           content: "Vælg afkrydsningsfeltet Aktiver NAT-Boost og klik på Gem for at sikre, at din router har det bedste gennemløb."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Bemærk",
                           content: "Når NAT Boost er aktiveret, deaktiveres QoS og Statistik over trafik automatisk."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Indstillinger for DoS-beskyttelse",
                           content: "DoS-beskyttelsesniveauet beskytter routeren fra angreb fra ICMP-FLOOD, UDP-FLOOD, and TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Pakkeniveau",
                           content: "Indtast en værdi mellem 5 og 7200 for at udløse ICMP-FLOOD beskyttelsen umiddelbart, når antallet af ICMP-pakker overskrider den indstillede tærskelværdi."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Pakkeniveau",
                           content: "Indtast en værdi mellem 5 og 7200 UDP-pakker for at udløse UDP-FLOOD beskyttelsen umiddelbart, når antallet af UDP-pakker overskrider den indstillede tærskelværdi."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD Pakkeniveau",
                           content: "Indtast en værdi mellem 5 og 7200 TCP-SYN-pakker for at udløse TCP-SYN-FLOOD beskyttelsen umiddelbart, når antallet af TCP-pakker overskrider den indstillede tærskelværdi."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Dupleks",
                           content: "Vælg duplekstypen i rullemenuen og klik på Gem."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"Lysdiode",
               CONTENT: [{
                           type: "name",
                           title: "Aktiver nattilstand",
                           content: "Marker dette afkrydsningsfelt for at slukke lysdioder i natteperioden uden at påvirke routerens ydeevne."
                       } ,{                      
                           type: "name",
                           title: "Periode for nattetilstand",
                           content: "Angiv en tidsperiode, hvor nattetilstanden gælder."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik på Gem for at gemme alle dine indstillingerne."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med OpenVPN, kan du bruge internettet til at få sikker adgang til netværket, når du er væk fra hjemmet. For at bruge VPN-servicen, skal du konfigurere den dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til routerens WAN-port. Og systemets tid skal synkroniseres med Internettet."
                       } ,{                      
                           type: "name",
                           title: "Tjenestetype",
                           content: "Vælg kommunikationsprotokollen for OpenVPN serveren: UDP eller TCP."
                       } ,{                      
                           type: "name",
                           title: "Tjenesteport",
                           content: "Angiv en kommunikationsport mellem 1024 og 65535. Standard og fælles tjenesteport er 1194."
                       } ,{                      
                           type: "name",
                           title: "VPN-undernet/Netmaske",
                           content: "Angiv intervallet af IP-adresser, som kan leases til klienterne af OpenVPN-serveren."
                       } ,{                      
                           type: "name",
                           title: "Klientadgang",
                           content: "Vælg adgangstypen for OpenVPN-klienten.",
       children: [{                      
                           type: "name",
                           title: "Kun hjemmenetværk",
                           content: "Klient kan kun få adgang til hjemmenetværket. Klientens standardrute vil ikke ændres."
                       } ,{                      
                           type: "name",
                           title: "Internet og hjemmenetværk",
                           content: "Klient kan få adgang til hjemmenetværket, og websteder eller tjenester med en geografisk begrænsning, når man er ude af landet. Klientens standardrute vil blive ændret."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certifikat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Anvend certifikatet for oplysninger og identitet af VPN-forbindelsen til fjerncomputeren.",
                "Klik for at oprette et nyt certifikat."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Konfigurationsfil",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Eksterne klienter skal bruge konfigurationsfilen for at få adgang til din router.",
                "Klik på denne knap for at gemme den OpenVPN-konfigurationsfil, der skal bruges til at tilføje en ny VPN-forbindelse."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Installationsvejledning for VPN-klient",
               CONTENT: [{
                           type: "step",
                           title: "Sådan tilsluttes klientenheder til OpenVPN-serveren:",
       content: [{                      
                           type: "paragraph",
                           content: "Før du kan konfigurere OpenVPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Og sørg for at den eksterne port for NAT-indstillingerne ikke er serviceporten og at systemklokken er synkroniseret med internettet."
                       },
                "1. Vælg Aktiver VPN-server.",
                "2. Konfigurere OpenVPN-serverens parametre (servicetype, tjenesteport, klientadgang og VPN-undernet/netmaske)) og klik på Gem.",
                "3. Klik på Eksporter for at gemme konfigurationsfilen.",
                "4. På klientenheder, download og installer OpenVPN klient hjælpeprogrammet fra <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "De officielt understøttede platforme inkluderer Windows, Mac OSX og Linux.",
                "5. Start af OpenVPN-klientværktøjet og tilføje en ny VPN-forbindelse ved hjælp af den gemte konfigurationsfil for at tilslutte klientenheden til VPN-serveren."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "For at få mere at vide om OpenVPN klienter, kan du besøge <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med PPTP VPN, kan du bruge internettet til nemt og hurtigt at få adgang til netværket, når du er væk fra hjemmet. Nogle internetudbydere vil muligvis forhindre dette. For at bruge VPN-servicen, skal du konfigurere den dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til routerens WAN-port. Og systemets tid skal synkroniseres med Internettet."
                       } ,{                      
                           type: "name",
                           title: "Klient IP-adresse",
                           content: "Angiv intervallet af IP-adresser (op til 10 klienter), som kan leases til klienterne af PPTP VPN-serveren."
                       } ,{                      
                           type: "name",
                           title: "Brugernavn og adgangskode",
                           content: "Indtast brugernavn og adgangskode for at godkende klienter til PPTP VPN-serveren."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Installationsvejledning for VPN-klient",
               CONTENT: [{
                           type: "step",
                           title: "Sådan tilsluttes klientenhederne til PPTP VPN-serveren:",
       content: [{                      
                           type: "paragraph",
                           content: "Før du kan konfigurere PPTP VPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Sørg for at den eksterne port for NAT-indstillingerne ikke er 1723 og at systemklokken er synkroniseret med internettet."
                       },
                "1. Vælg Aktiver VPN-server.",
                "2. Konfigurer PPTP VPN-serverens parametre og klik på Gem.",
                "3. På klientenhederne, kan du oprette en PPTP VPN-forbindelse. De officielt understøttede platforme inkluderer Windows, Mac OSX, Linux, iOS, og Android.",
                "4. Start PPTP VPN-programmet, tilføje en ny forbindelse og indtast domænenavnet på den registrerede DDNS-tjeneste eller den statiske IP-adresse, som er tildelt WAN-porten, for at tilslutte klientenheden til PPTP VPN-serveren."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN-forbindelser",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne side viser de klienter, der i øjeblikket er tilknyttet til OpenVPN og PPTP VPN-servere hostet på routeren."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Netværksoversigt",
               CONTENT: [{
                           type: "paragraph",
                           content: "I Netværksoversigt, kan du se den aktuelle netværksforbindelses status og trådløst information for routeren og oplysningerne om forbundne enheder."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser internettets oplysninger."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser de aktuelle netværksoplysninger om de trådløse netværk og LAN portene."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Kablede/trådløse klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser netværksnavnet (redigerbart), tildelte IP- og MAC-adresser på routerebs forbundne kunder."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Printer",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser navnet på printeren, der er tilsluttet til routeren via USB-port."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB-disk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser relevant information for USD-drevet forbundet til routeren via USB-porten."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Test af hastighed",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funktion tester din internetforbindelses aktuelle hastighed for upload og download og giver dig gode råd om dit internets kapacitet."
                       } ,{                      
                           type: "paragraph",
                           content: "Tip: Du kan lukke andre apps og programmer for at få et endnu mere præcist resultat."
                       } ,{                      
                           type: "paragraph",
                           content: "Historik – En oversigt over tidligere hastighedstests."
                       } ,{                      
                           type: "paragraph",
                           content: "Test igen – Klik for at teste igen."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Klik på automatisk registrering eller vælg typen af internetforbindelse manuelt. Indtast korresponderende parametre leveret af internetudbyderen."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Marker dette afkrydsningsfelt for at aktivere smart forbindelse. Denne funktion hjælper enheder med at køre hurtigere ved at tildele dem til det bedste trådløse bånd, baseret på faktiske forhold, for at balancere netværkskrav."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Trådløse indstillinger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Du kan konfigurere de trådløse indstillinger (SSID, adgangskode, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Netværksnavn (SSID)",
                           content: "Det anbefales at ændre netværksnavnet (SSID). Dette felt skelner mellem store og små bogstaver."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Marker hvis du vil skjule 2.4GHz/5GHz netværksnavnet (SSID) fra listen over trådløse netværk. Når dette er valgt, vil SSID ikke udsendes, og du er nødt til manuelt at tilslutte dig netværket."
                       } ,{                      
                           type: "name",
                           title: "Adgangskode",
                           content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn. Dette felter skelner mellem store og små bogstaver."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB-lagerenheder",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funktion gør det muligt at dele USB-lagerenheder mellem forskellige klienter i det lokale netværk eller via internettet."
                       } ,{                      
                           type: "title",
                           title: "Enhedsindstillinger",
                           content: "Afsnittet Enhedsindstillinger viser de grundlæggende oplysninger om USB-lagerenheden der er tilsluttet via USB-porten. Et USB flashdrev har normalt kun ét drev."
                       } ,{                      
                           type: "name",
                           title: "Scan",
                           content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne og opdatere skærmen med de opdaterede oplysninger.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Et gråt område repræsenterer et drev, der er deaktiveret. Du kan klikke på området for at dele det specifikke drev."
                       }]
} ,{                      
                           type: "name",
                           title: "Fjern",
                           content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Knappen Fjern vises kun, når USB-lagerenheden er tilsluttet routeren. Når det aktuelle drev er optaget, kan du ikke afmontere det."
                       }]
} ,{                      
                           type: "step",
                           title: "Sådan etableres en filserver",
       content: [ 
                "1. Tilslut USB-lagringsenheden direkte til USB-porten eller brug et USB-kabel. Hvis enheden kræver medfølgende ekstern strøm, skal du sørge for at en ekstern strømforsyning er tilsluttet.",
                "2. Den nyligt tilsluttede USB-enhed bør automatisk blive registreret af routeren og vises under afsnittet Enhedsindstillinger. Hvis ikke, skal du klikke på Scan.",
                "Bemærk: Ikonet Del vises, når mere end 5 drev er tilsluttet routeren. Du kan klikke på ikonet for at deaktivere drev, du ikke behøver at dele."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Adgangsadresse",
               CONTENT: [{
                           type: "name",
                           title: "Navn på netværk/Medie-server",
                           content: "Viser det navn, der bruges til at få adgang til den tilsluttede USB-lagerenhed via netværksnaboer metoden eller mediedeling funktionen. Det er TP-Share som standard."
                       } ,{                      
                           type: "name",
                           title: "Adgangsmetode",
                           content: "Man kan få adgang til den delte USB-lagerenhed på fire måder.",
       children: [{                      
                           type: "name",
                           title: "Netværks nabolag",
                           content: "Vælg denne indstilling for at tillade brugere på netværket at få adgang til delt indhold via adressen anført under Adressekolonnen."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Vælg denne indstilling for at aktivere FTP-server funktionen, der giver FTP-klienter og brugere på netværket mulighed for at få adgang til USB-lagerenheden via FTP-adressen, der vises under Adressekolonnen."
                       } ,{                      
                           type: "name",
                           title: "FTP (via internet)",
                           content: "Vælg denne indstilling for at tillade FTP klienter og brugere at få fjernadgang til, downloade og uploade filer til den delte USB-lagerenhed via FTP over internettet. For at tilpasse adgangsadressen, skal du klikke på Rediger og oprette Dynamic DNS for routeren. For at ændre FTP-serverens port, skal man indtaste et nyt portnummer og klikke på Gem for at anvende ændringerne."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Vælg denne mulighed for at aktivere SFTP-serverfunktionen, som giver SFTP-klienter og brugere på netværket adgang til USB-lagerenheden via SFTP-adressen vist under adressekolonnen."
                       }]
} ,{                      
                           type: "name",
                           title: "Adresse",
                           content: "Viser adressen der bruges til at få adgang til den tilsluttede USB-lagerenhed."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Vis portnummeret der bruges til at få adgang til FTP-serveren."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Deling af indhold",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser de mapper, du deler. Alle mapper deles som standard. Du kan klikke på ikonet Rediger for at tilpasse de delte mapper."
                       } ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Ikonet Del vises i afsnittet enhedsindstillinger, når mere end 5 drev er tilsluttet routeren. Du kan klikke på ikonet Del for at deaktivere drev, du ikke behøver at dele."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Deling af Indhold og sikkerhed",
               CONTENT: [{
                           type: "name",
                           title: "Deling af indhold",
                           content: "Viser de mapper, du deler. Alle mapper deles som standard. Du kan klikke på ikonet Rediger for at tilpasse de delte mapper.",
       children: [{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Ikonet Del vises i afsnittet enhedsindstillinger, når mere end 5 drev er tilsluttet routeren. Du kan klikke på ikonet Del for at deaktivere drev, du ikke behøver at dele."
                       }]
} ,{                      
                           type: "name",
                           title: "Adgangsgodkendelse",
       content: [ 
                "Slå til for at aktivere godkendelse, som kræver at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper. Med adgang som administrator kan man læse og redigere filerne, mens brugeren kun kan læse filerne.",
                "Brugernavnet skal begynde med et bogstav eller en understregning og indeholde 1 til 15 tegn med bogstaver, cifre og understreger.",
                "Adgangskoden skal indeholde 1 til 15 tegn med bogstaver, cifre og understreger."]
} ,{                      
                           type: "name",
                           title: "Tillad adgang for gæstenetværket",
                           content: "Slå til for at tillade brugere på gæstenetværket at få adgang til alle de delte mapper."
                       } ,{                      
                           type: "name",
                           title: "Tillad mediedeling",
                           content: "Med denne funktion aktiveret, kan alle DLNA-understøttede enheder i det lokale netværk få adgang til mediefiler på alle de delte mapper. Brugerne vil ikke blive bedt om at indtaste brugernavn og adgangskode, selvom adgangsgodkendelse er aktiveret."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Printerserver",
               CONTENT: [{
                           type: "name",
                           title: "Printerserver",
                           content: "Aktiver for at aktivere printerserverfunktionen."
                       } ,{                      
                           type: "name",
                           title: "Printernavn",
                           content: "Viser navnet på printeren, der er tilsluttet til routeren."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Forældrekontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med de grundlæggende indstillinger for Forældrekontrol, kan du begrænse adgangen på visse tidspunkter af dagen (f.eks ingen adgang til internettet fra barnets pc når det er tid for hjemmearbejde)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Enheder med forældrekontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser oplysninger og indstillinger af de enheder, der aktuelt er begrænset af forældrekontrol."
                       } ,{                      
                           type: "step",
                           title: "Sådan begrænses en ny klientenhed",
       content: [ 
                "1. Skift forældrekontrol til.",
                "2. Klik på Tilføj.",
                "3. Klik på Scan for at vælge en aktuelt tilsluttet enhed fra listen over enheder med adgang, eller indtast navnet på enheden og MAC-adressen manuelt for at tilføje en enhed, som ikke er forbundet.",
                "4. Klik på ikonet Faktiske tidsplan for at angive en tidsperiode, hvor begrænsningen gælder.",
                "5. Indtast en kort beskrivelse i feltet Beskrivelse. Dette felt er valgfrit.",
                "6. Vælg Aktiverer dette valg",
                "7. Klik på Gem."]
} ,{                      
                           type: "note",
                           title: "Bemærk",
                           content: "Hvis du vil deaktivere denne post, skal du klikke på ikonet Bulb."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Gæstenetværk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne funktion gør det muligt at give trådløs adgang for gæster uden at afsløre hovednettet."
                       } ,{                      
                           type: "name",
                           title: "Giv gæsterne mulighed for at se hinanden",
                           content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværk at kommunikere med hinanden via metoder såsom netværksnaboer, Samba, Ping, og FTP."
                       } ,{                      
                           type: "name",
                           title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
                           content: "Marker dette afkrydsningsfelt for at tillade de trådløse enheder på gæstenetværk at kommunikere med enhederne tilsluttet til routerens LAN porte eller hovednetværket via metoder såsom netværksnaboer, Samba, Ping, og FTP."
                       } ,{                      
                           type: "name",
                           title: "Aktiver gæstenetværk",
                           content: "Marker dette afkrydsningsfelt for at aktivere funktionen gæstenetværk."
                       } ,{                      
                           type: "name",
                           title: "Netværksnavn (SSID)",
                           content: "Du kan enten bruge standard gæste-SSID eller oprette et nyt navn (op til 32 tegn)."
                       } ,{                      
                           type: "name",
                           title: "Skjul SSID",
                           content: "Marker dette afkrydsningsfelt, hvis du vil skjule gæste-SSID fra listen over trådløse netværk."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Opdateringsinterval for adgangskode",
                           content: "Vælg opdateringsintervallet for gæstenetværkets adgangskode."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Adgangskode",
                           content: "Opret en adgangskode på mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Adgangskode",
                           content: "Brug enten adgangskoden der genereres tilfældigt, eller opret en adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Sky",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link sky-service giver dig mulighed for at fjernovervåge dit netværk i realtid, få adgang til og administrere dit TP-Link udstyr fra internettet, når som helst og hvor som helst."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Kontooplysninger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser din TP-Link ID-oplysninger. Du kan redigere kontooplysninger ved at klikke på ikonet Rediger."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Enhedsoplysninger",
               CONTENT: [{
                           type: "paragraph",
                           content: "Viser oplysningerne om din enhed, herunder skykontoen der styrer enheden."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Bundne konti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denne tabel viser alle de skykonti, der i øjeblikket er bundet til enheden."
                       } ,{                      
                           type: "step",
                           title: "Sådan bindes en brugerkonto",
       content: [ 
                "1. Klik på Bind.",
                "2. Indtast den registrerede e-mail, du vil binde.",
                "3. Klik på Gem."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Forældrekontrol",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med filtre for aldersniveau, adgangsbegrænsning og brugerprofiler, giver forældrekontrol din familie passede og relevant internetadgang."
                       } ,{                      
                           type: "step",
                           title: "For at anvende forældrekontrol på en ny enhed",
       content: [ 
                "1. Klik på Tilføj.",
                "2. Indtast et navn for denne profil og klik på \"+\" for til tilføj enhed(er) under denne profil.",
                "3. Vælg et filter og tilpas filterindholdet alt efter dine behov. Du kan indtaste nøgleord for at søge efter websteder, du ønsker at filtrere i vores database. Andre hjemmesiders (URL'er) kan indtastes manuelt.<br/>Se følgende forklaringer på de forskellige filterkategorier:<p>Voksent indhold - Websteder, der indeholder seksuelt, skadeligt eller ulovligt indhold, herunder pornografi, stofbrug, vold og diskriminering</p><p>Hasard - Websteder der fremmer eller give oplysninger om hasard, herunder online websteder med hasard</p><p>Seksualundervisning - Websteder der giver oplysninger om seksualitet, herunder reproduktion, seksualitet, sikker sex og prævention, seksuelt overførte sygdomme og seksuelle traumer</p><p> Online kommunikation - Websteder der er vært for kommunikation med andre via tekst, tale eller video, herunder e-mail, blogs, onlinefora, VoIP og videochat-tjenester</p><p>Social Networking - Websteder der distribuere personlige udtryk eller kommunikation, der forbinder mennesker og deres personlige aktivitet baseret på lignende interesser, karrierer, baggrunde eller virkelige bekendtskab</p><p>Betalt surfing - Websteder der kompensere brugere at få vist bestemte websteder, e-mails eller reklamer, klikke på links eller besvare spørgeskemaer</p><p>Media - Websteder der tilbyder gratis, eller betalt abonnement på lyd- og/eller videoindhold, herunder streamingstjenester, TV-programmer eller musik-downloads</p><p>Downloads - Websteder med eller der give adgang til fildeling og distribution, herunder peer-to-peer-deling, online fillagring og indhold til mobile enheder (f.eks. musik og apps)</p><p>Spil - Websteder med eller der giver adgang til web-hostede spil eller spild er kan downloades</p>",
                "4. Hvis du vil begrænse den samlede tid denne profil kan bruge online, skal du aktivere og specificere tidsfrister. Du kan også bruge Sengetid at opstille et dagligt tidsrum, hvori enhederne under denne profil kan bruge internettet.",
                "5. Klik på Gem."]
} ,{                      
                           type: "step",
                           title: "Sådan ser du en profilens detaljerede internethistorik",
       content: [ 
                "1. På kolonnen Insights (Indblink) skal du klikke på den tilsvarende Insights-knap.",
                "2. Hvis du vil se flere poster, skal du klikke på knappen Historie <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Du kan blokere eller fjerne blokering af hjemmesider ved at klikke på knappen <span class=\"ptl-ctr-help-icon block\"></span> eller <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Sådan deaktiveres eller aktiveres internettet øjeblikkeligt",
       content: [ 
                "I kolonnen Internetadgang, skal du klikke på <span class=\"ptl-ctr-help-icon stop\"></span> for at standse den tilsvarende profilens enheder fra at få adgang til internettet og klik på <span class=\"ptl-ctr-help-icon enable\"></span> for at aktivere adgang igen."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) funktionen prioriterer online aktiviteter og enheder for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det."
                       } ,{                      
                           type: "paragraph",
                           content: "Vælg Programprioritering for at prioritere netværkshastighed for onlineaktiviteter, og vælg Enhedsprioritering til at prioritere netværkshastigheden for enheder."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Programprioritering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vælg den online aktivitet du ønsker at prioritere eller klik på Brugerdefineret for at angive prioritetsniveauet for hver online aktivitet."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Enhedsprioritering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vælg den/de enhed(er), du ønsker at prioritere, og hvor længe de skal prioriteres."
                       } ,{                      
                           type: "step",
                           title: "Sådan prioriteres en enhed",
       content: [ 
                "1. Find den enhed du ønsker at prioritere i listen og aktiver prioritet.",
                "2. Vælg, hvor længe enheden vil blive prioriteret i kolonnen Tidsindstilling."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Antivirus sørger for sikkerheden af dine personlige oplysninger med hyppige scanninger af netværket, registrering af ondsindede hjemmesider og isolation af inficerede enheder. Du kan også tjekke, hvordan dit netværk er beskyttet, og hvis der har været angreb på dit netværk."
                       } ,{                      
                           type: "paragraph",
                           content: "Historik - Optager de enheder, der er beskyttet af Antivirus og kilden og klassificering af angrebene."
                       } ,{                      
                           type: "paragraph",
                           content: "Aktiverer alle - Tryk for at aktivere alle typer beskyttelse, hvis en eller flere ikke er aktiveret."
                       } ,{                      
                           type: "paragraph",
                           content: "Beskyttelsestyper - Aktiverer beskyttelsestyperne ved at henvise til forklaringerne. Det anbefales at aktivere alle beskyttelsestyperne."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Programprioritering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen Programprioritering prioriterer online aktiviteter for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det. Vælg den online aktivitet du ønsker at prioritere eller klik på Brugerdefineret for at angive prioritetsniveauet for hver online aktivitet."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Enhedsprioritering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen Enhedsprioritering prioriterer enheder for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det. Vælg den/de enhed(er), du ønsker at prioritere, og hvor længe de skal prioriteres."
                       } ,{                      
                           type: "step",
                           title: "Sådan prioriteres en enhed",
       content: [ 
                "1. Find den enhed du ønsker at prioritere i listen og aktiver prioritet.",
                "2. Vælg, hvor længe enheden vil blive prioriteret i kolonnen Tidsindstilling."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) firewall forhindrer cyberangreb og validerer den trafik, der passerer gennem en router, der er baseret på protokollen. Som standard er denne funktion aktiveret."
                       } ,{                      
                           type: "name",
                           title: "Aktiver SPI-firewall",
                           content: "Deaktiver ikke SPI-Firewall, medmindre det er nødvendigt."
                       } ,{                      
                           type: "name",
                           title: "Tillad pinger fra WAN-porten/Tillad pinger fra LAN-porten",
                           content: "Aktiverer for at tillade pingpakker fra WAN/LAN-porten. Det anbefales at beholde standardindstillingerne."
                       }]
},
       "" :     ""
    };
})(jQuery);