(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft relevante informatie weer over de wide area network (Internet) verbinding."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Draadloos 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft relevante informatie weer over het draadloze netwerk."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont informatie over de Ethernet (LAN) aansluitingen."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Gastnetwerk 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft informatie weer over de draadloze netwerken voor gasten."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB apparaten",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft informatie weer van de huidige USB opslagapparaten en/of printer verbonden met de router via de USB poorten."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Prestaties",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont de huidige prestaties van de router."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Bekabelde clients",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft informatie weer over de bedrade apparaten verbonden met het netwerk."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Draadloze clients",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft informatie weer over de draadloze apparaten verbonden met het netwerk."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configureer de IPv4 parameters en selecteer de gepaste MAC kloon methode die u nodig heeft."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecteer de internet verbindingstype en voer de corresponderende parameters in."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: Dynamisch IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type als u voorzien bent van een DHCP server verbinding door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "IP-adres/Subnetmasker/Standaard gateway/Primaire DNS/Secundaire DNS",
                           content: "Deze parameters worden automatisch toegwezen door de DHCP server van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Vernieuwen",
                           content: "Klik om nieuwe IP parameters te verkrijgen van de DHCP server."
                       } ,{                      
                           type: "name",
                           title: "Vrijgeven",
                           content: "Klik om alle IP adressen toegewezen door de DHCP server uit te delen."
                       } ,{                      
                           type: "name",
                           title: "DNS-adres",
                           content: "Als de ISP een of twee DNS-adressen aanlevert, selecteert u dit vakje en voert u de Primaire DNS en Secundaire DNS adressen in de desbetreffende velden in; anders worden de DNS-adressen dynamisch door de ISP toegewezen."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 bytes. Het wordt afgeraden de standaard MTU grootte te wijzigen, tenzij vereist door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Host naam",
                           content: "Voer een waarde in dit veld in om de host naam van de router op te geven."
                       } ,{                      
                           type: "name",
                           title: "Verkrijg IP via Unicast DHCP",
                           content: "Selecteer deze checkbox als de DHCP server van de ISP broadcast applicaties niet ondersteund en u dynamisch geen IP adres krijgt."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: Statisch IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type als u een specifiek (vast) IP-adres, subnetmasker, gateway en DNS parameters van de ISP heeft ontvangen."
                       } ,{                      
                           type: "name",
                           title: "IP-adres/Subnetmasker/Standaard gateway/Primaire DNS/Secundaire DNS",
                           content: "Voer de informatie voorzien door uw ISP in."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 bytes. Het wordt afgeraden de standaard MTU grootte te wijzigen, tenzij vereist door de ISP."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: BigPond kabel"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type als de ISP BigPond Kabel verbinding aanbiedt."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer de gebruikersnaam en wachtwoord verkregen van uw ISP in. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "Ver. server",
                           content: "Voer het IP-adres of de host naam van de verificatie server in."
                       } ,{                      
                           type: "name",
                           title: "Ver. domein",
                           content: "Voer de server's domein naam suffix in (op basis van de locatie). Bijvoorbeeld, nsw.bigpond.net.au voor NSW/ACT, vic.bigpond.net.au voor VIC/TAS/WA/SA/NT, of qld.bigpond.net.au voor QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 bytes. Het wordt afgeraden de standaard MTU grootte te wijzigen, tenzij vereist door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Verbindingsmodus",
                           content: "Selecteer een geschikte verbindingsmodus, die bepaalt hoe u met het Internet verbinding maakt.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "In deze modus wordt de Internet verbinding automatisch opnieuw tot stand gebracht wanneer hij verbroken is."
                       } ,{                      
                           type: "name",
                           title: "Op aanvraag",
                           content: "In deze modus wordt de Internet verbinding automatisch na een opgegeven tijd van inactiviteit (Max. tijd inactief) verbroken. De verbinding wordt opnieuw tot stand gebracht zodra u toegang tot het Internet probeert te krijgen."
                       } ,{                      
                           type: "name",
                           title: "Handmatig",
                           content: "In deze modus wordt de Internet verbinding handmatig tot stand gebracht of verbroken door op de knop Verbinden of Verbreken te klikken. In deze modus wordt de Max. tijd inactief functie ook ondersteund. Voer een maximum tijd (in minuten) in dat het Internet verbinding inactief kan zijn voordat hij wordt verbroken, in het veld Max. tijd inactief. De standaard waarde is 15 minuten. Als u wilt dat de Internet verbinding altijd actief blijft, voert u 0 (nul) in."
                       }]
} ,{                      
                           type: "title",
                            title: "Type Internetverbinding: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type wanneer u een DSL (Digital Subscriber Line) service gebruikt en van uw ISP een gebruikersnaam en wachtwoord heeft ontvangen."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer de gebruikersnaam en wachtwoord verkregen van uw ISP in. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "IP-adres/Primaire DNS/Secundaire DNS",
                           content: "Deze parameters worden automatisch toegwezen door de DHCP server van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Secundaire verbinding (Geen, Dynamisch IP, Statisch IP)",
       children: [{                      
                           type: "name",
                           title: "Geen",
                           content: "Selecteer deze optie als er geen secundaire verbinding wordt geleverd."
                       } ,{                      
                           type: "name",
                           title: "Dynamisch IP",
                           content: "Selecteer of het IP-adres en Subnetmasker automatisch door de ISP worden toegewezen.",
       children: [{                      
                           type: "name",
                           title: "Vernieuwen",
                           content: "Klik om nieuwe IP parameters te verkrijgen van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Vrijgeven",
                           content: "Klik om de toegwezen IP parameters uit te delen."
                       }]
} ,{                      
                           type: "name",
                           title: "Statisch IP",
                           content: "Selecteer als het IP adres en subnetmasker voorzien worden door uw ISP en voer de informatie in in de corresponderende velden."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De typische MTU (Maximum Transmission Unit) grootte voor Ethernet netwerken is 1480 bytes.",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "In zeldzame gevallen kan de ISP u vereisen om de MTU grootte aan te passen voor betere netwerk prestaties. U dient deze waarde niet aan te passen tenzij echt noodzakelijk."
                       }]
} ,{                      
                           type: "name",
                           title: "Service naam/Access Concentrator naam",
                           content: "Standaard is de service naam en access concentrator (AC) naam blanco gelaten. Deze velden dienen niet ingevuld te worden tenzij vereist door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Online interval detecteren",
                           content: "Voer een tijdinterval tussen 0 en 120 (seconden) in waarmee de router Access Concentrator online met elke interval detecteert. De standaardwaarde is 10."
                       } ,{                      
                           type: "name",
                           title: "IP-adres",
                           content: "Als de ISP een specifiek (vast) IP adres aanbiedt, selecteer het volgende IP-adres gebruiken en voer het IP adres in het veld in. Anderzijds selecteer Dynamisch verkrijgen van de ISP om een server-toegewezen IP-adres automatisch te ontvangen."
                       } ,{                      
                           type: "name",
                           title: "DNS-adres",
                           content: "Als de ISP een specifiek (vast) DNS IP adres aanbiedt, selecteer het volgende DNS adres en voer de adressen in de velden primair DNS en secundair DNS in. Anderzijds selecteer dynamisch van ISP verkrijgen om het door de server toegewezen DNS IP adres automatisch te ontvangen."
                       } ,{                      
                           type: "name",
                           title: "Verbindingsmodus",
                           content: "Selecteer een geschikte verbindingsmodus, die bepaalt hoe u met het Internet verbinding maakt.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "In deze modus wordt de Internet verbinding automatisch opnieuw tot stand gebracht wanneer hij verbroken is."
                       } ,{                      
                           type: "name",
                           title: "Op aanvraag",
                           content: "In deze modus wordt de Internet verbinding automatisch na een opgegeven tijd van inactiviteit (Max. tijd inactief) verbroken. De verbinding wordt opnieuw tot stand gebracht zodra u toegang tot het Internet probeert te krijgen."
                       } ,{                      
                           type: "name",
                           title: "Tijdbasis",
                           content: "In deze modus wordt de Internet verbinding alleen binnen een bepaalde periode tot stand gebracht. Als deze optie geselecteerd is, voert u de begin- en eindtijd in HH:MM formaat in."
                       } ,{                      
                           type: "name",
                           title: "Handmatig",
                           content: "In deze modus wordt de Internet verbinding handmatig tot stand gebracht of verbroken door op de knop Verbinden of Verbreken te klikken. In deze modus wordt de Max. tijd inactief functie ook ondersteund. Voer een maximum tijd (in minuten) in dat het Internet verbinding inactief kan zijn voordat hij wordt verbroken, in het veld Max. tijd inactief. De standaard waarde is 15 minuten. Als u wilt dat de Internet verbinding altijd actief blijft, voert u 0 (nul) in."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "De Tijdbasis verbindingsmodus wordt pas van kracht als de Systeemtijd op de pagina Geavanceerd → Systeemfuncties → Tijdinstellingen geconfigureerd is."
                       }]
} ,{                      
                           type: "title",
                            title: "Type Internetverbinding: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type als u verbinding maakt met een L2TP/PPTP VPN server en een gebruikersnaam, wachtwoord en IP-adres/domeinnaam van de server van de ISP heeft ontvangen."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer de gebruikersnaam en wachtwoord verkregen van uw ISP in. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "IP-adres/Primaire DNS/Secundaire DNS",
                           content: "Deze parameters worden automatisch toegwezen door de DHCP server van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Secundaire verbinding (Dynamisch IP of Statisch IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamisch IP",
                           content: "Selecteer of het IP-adres en Subnetmasker automatisch door de ISP worden toegewezen."
                       } ,{                      
                           type: "name",
                           title: "Statisch IP",
                           content: "Selecteer als het IP adres en subnetmasker, gateway en DNS adressen voorzien worden door uw ISP en voer de informatie in in de corresponderende velden."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN server IP/Domeinnaam",
                           content: "Voer het IP-adres of domeinnaam van de VPN server in voorzien door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1460 bytes voor L2TP of 1420 bytes voor PPTP. Het wordt afgeraden de standaard MTU grootte te wijzigen, tenzij vereist door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Verbindingsmodus",
                           content: "Selecteer een geschikte verbindingsmodus, die bepaalt hoe u met het Internet verbinding maakt.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "In deze modus wordt de Internet verbinding automatisch opnieuw tot stand gebracht wanneer hij verbroken is."
                       } ,{                      
                           type: "name",
                           title: "Op aanvraag",
                           content: "In deze modus wordt de Internet verbinding automatisch na een opgegeven tijd van inactiviteit (Max. tijd inactief) verbroken. De verbinding wordt opnieuw tot stand gebracht zodra u toegang tot het Internet probeert te krijgen."
                       } ,{                      
                           type: "name",
                           title: "Handmatig",
                           content: "In deze modus wordt de Internet verbinding handmatig tot stand gebracht of verbroken door op de knop Verbinden of Verbreken te klikken. In deze modus wordt de Max. tijd inactief functie ook ondersteund. Voer een maximum tijd (in minuten) in dat het Internet verbinding inactief kan zijn voordat hij wordt verbroken, in het veld Max. tijd inactief. De standaard waarde is 15 minuten. Als u wilt dat de Internet verbinding altijd actief blijft, voert u 0 (nul) in."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC kloon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecteer de juiste MAC clone methode die u wenst."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres niet clonen",
                           content: "Het standaard MAC-adres van de router NIET wijzigen, voor het geval de ISP het toegewezen IP-adres niet aan het MAC-adres bindt."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres van huidige computer klonen",
                           content: "Selecteer deze optie om het huidige MAC-adres van de computer die met de router verbonden is te kopiëren, voor het geval dat de ISP het toegewezen IP-adres aan het MAC-adres van de computer bindt."
                       } ,{                      
                           type: "name",
                           title: "Aangepast MAC-adres gebruiken",
                           content: "Voer het MAC-adres handmatig in, voor het geval dat de ISP het toegewezen IP-adres aan het opgegeven MAC-adres bindt."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN aggregatie",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN aggregatie verandert de LAN1 poort naar een extra WAN poort en maakt alleen een data pad voor hoge bandbreedtes. Ontketen sneller internet vanuit uw provider die een bandbreedte snelheid biedt van over de 1 Gbps en u niet langer meer wordt beperkt door uw netwerkhardware."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Opmerking",
                           content: "Voordat u deze functie gaat gebruiken is het belangrijk te controleren of uw provider WAN aggregatie ondersteund. Tevens dient uw modem te zijn voorzien van 2 WAN poorten."
                       } ,{                      
                           type: "step",
                           title: "WAN-aggregatie toepassen",
       content: [ 
                "1. Schakel om naar WAN aggregatie om het in te schakelen.",
                "2. Klik op Opslaan.",
                "3. Verbind de router zijn WAN poort en LAN1 poort naar de 2 WAN poorten van uw modem. Dit doormiddel van Ethernet kabels"]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft het MAC adres, IP adres en subnetmasker van de router weer."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres",
                           content: "Het unieke fysieke adres dat aan de Ethernet (LAN) aansluiting van de router toegewezen is."
                       } ,{                      
                           type: "name",
                           title: "IP-adres",
                           content: "Geeft de router zijn standaard IP adres weer welke gebruikt wordt om in te loggen op de router's webconfiguratie pagina. U kunt dit wijzigen naar een ander adres."
                       } ,{                      
                           type: "name",
                           title: "Subnetmasker",
                           content: "Selecteer een toegewezen id die door de LAN poort gebruikt wordt om het interne en externe verkeer te routeren of voer een nieuw subnet masker in."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als het nieuwe LAN IP-adres zich niet in hetzelfde subnet als het oude bevindt, wordt de IP-adres pool op de DHCP server automatisch geconfigureerd; bij Virtual Server en DMZ Host gebeurt dat pas wanneer ze opnieuw zijn geconfigureerd."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Link Aggregatie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Link aggregatie combineert 2 poorten samen tot n enkele hoge-bandbreedte data pad te maken, waardoor een hogere snelheid en meer stabiel bedraad netwerk behouden blijft."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Link aggregatie toepassen.",
       content: [ 
                "1. Schakel in om de link aggregatie functie in te schakelen.",
                "2. Specificeer twee poorten voor link aggregatie.",
                "3. Klik op opslaan."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) is een systeem waardoor televisie diensten worden geleverd door gebruik te maken van het internet protocol via een pakketgeschakeld netwerk zoals LAN of het internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP-snooping",
                           content: "de IGMP (Internet Group Management Protocol) Snooping functie staat de router toe om alleen multicast verkeer door te sturen naar de poorten die daarom vragen."
                       } ,{                      
                           type: "name",
                           title: "IGMP proxy",
                           content: "Selecteer om de IGMP Proxy functie in te schakelen als de IPTV dienst die geleverd wordt door uw ISP IGMP technologie-gebasseerd is."
                       } ,{                      
                           type: "name",
                           title: "IGMP versie",
                           content: "Selecteer de IGMP versie conform uw ISP. De standaard IGMP versie is V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Draadloos Multicast Doorsturing",
                           content: "Selecteer om de Wireless Multicast Forwarding functie in te schakelen welke multicast pakketten toe staat om doorgestuurd te worden naar het draadloze netwerk."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Selecteer om de IPTV functie in te schakelen als de IPTV dienst voorzien wordt door de ISP en dit non-IGMP technologie-gebasseerd is."
                       } ,{                      
                           type: "name",
                           title: "ISP Profiel.",
                           content: "Selecteer het goede ISP (internet service provider) profiel, om de configuratie te voltooien. Er zijn drie profiel types:",
       children: [{                      
                           type: "name",
                           title: "LAND-Provider Naam",
                           content: "ISP priofielen met standaard waardes komen in het volgende formaat \"Land-ISP naam\". Selecteer uw ISP uit het selectie menu."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Als uw ISP niet vermeld staat en als er geen andere parameters vereist zijn om IPTV in te stellen, dan kunt u eenvoudig dit profiel selecteren en de specifieke LAN-poort selecteren die toegewijd is voor IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Specificeer welk type data de LAN-poort moet doorgeven. Bijvoorbeeld, als IPTV is geselecteerd voor LAN1, dan zal deze alleen maar IPTV data doorsturen en u zou nu een verbinding moeten kunnen opzetten tussen uw set-top box naar LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Als uw ISP niet vermeld staat en als er geen andere parameters vereist zijn om IPTV in te stellen, dan kunt u eenvoudig dit profiel selecteren en de specifieke LAN-poort selecteren die toegewijd is voor IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Geef aan welke soort data de LAN poort mag uitzenden. Als voorbeeld: ls IPTV is geselecteerd voor LAN2, dan wordt er alleen IPTV data verzonden. Hierbij dient u de set-top box aan te sluiten op LAN2"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Als uw ISP niet vermeld staat en als er geen andere parameters vereist zijn om IPTV in te stellen, dan kunt u eenvoudig dit profiel selecteren en de specifieke LAN-poort selecteren die toegewijd is voor IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Geef aan welke soort data de LAN poort mag uitzenden. Als voorbeeld: ls IPTV is geselecteerd voor LAN5, dan wordt er alleen IPTV data verzonden. Hierbij dient u de set-top box aan te sluiten op LAN5"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Aangepast",
                           content: "Als de ISP niet staat vermeld, maar toch over de benodigde parameters beschikt, zoals internet/VoIP/IPTV VLAN IDs en Priority, selecteer dan dit profiel.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteit",
                           content: "Configureer de VLAN ID's en prioriteiten zoals vereist door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecteer of de Internet pakketten met 802.11Q moeten worden getagd."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioriteit",
                           content: "U kunt de IPTV multicast functie zoals gewenst inschakelen en configureer het VLAN ID en de prioriteit volgens de ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Specificeer welk type data de LAN-poort moet doorgeven. Bijvoorbeeld, als IPTV is geselecteerd voor LAN1, dan zal deze alleen maar IPTV data doorsturen en u zou nu een verbinding moeten kunnen opzetten tussen uw set-top box naar LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Aangepast",
                           content: "Als de ISP niet staat vermeld, maar toch over de benodigde parameters beschikt, zoals internet/VoIP/IPTV VLAN IDs en Priority, selecteer dan dit profiel.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteit",
                           content: "Configureer de VLAN ID's en prioriteiten zoals vereist door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecteer of de Internet pakketten met 802.11Q moeten worden getagd."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioriteit",
                           content: "U kunt de IPTV multicast functie zoals gewenst inschakelen en configureer het VLAN ID en de prioriteit volgens de ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Geef aan welke soort data de LAN poort mag uitzenden. Als voorbeeld: ls IPTV is geselecteerd voor LAN2, dan wordt er alleen IPTV data verzonden. Hierbij dient u de set-top box aan te sluiten op LAN2"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Aangepast",
                           content: "Als de ISP niet staat vermeld, maar toch over de benodigde parameters beschikt, zoals internet/VoIP/IPTV VLAN IDs en Priority, selecteer dan dit profiel.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteit",
                           content: "Configureer de VLAN ID's en prioriteiten zoals vereist door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecteer of de Internet pakketten met 802.11Q moeten worden getagd."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioriteit",
                           content: "U kunt de IPTV multicast functie zoals gewenst inschakelen en configureer het VLAN ID en de prioriteit volgens de ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Geef aan welke soort data de LAN poort mag uitzenden. Als voorbeeld: ls IPTV is geselecteerd voor LAN5, dan wordt er alleen IPTV data verzonden. Hierbij dient u de set-top box aan te sluiten op LAN5"
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP server",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Standaard is de DHCP (Dynamic Host Configuration Protocol) server ingeschakeld; deze wijst dynamisch TCP/IP parameters aan client apparaten in de IP-adres pool toe.",
                "De DHCP server NIET uitschakelen, tenzij u een andere DHCP server heeft u of u de TCP/IP parameters handmatig aan elk client apparaat in uw netwerk wilt toewijzen."]
} ,{                      
                           type: "name",
                           title: "IP-adres pool",
                           content: "Voer de reeks IP-adressen in die aan de clients kunnen worden geleased."
                       } ,{                      
                           type: "name",
                           title: "Adres lease-tijd",
                           content: "Voer de tijdsduur in (tussen 1 en 2880 minuten) waarin een IP adres wordt uitgeleend aan een cliënt. De standaard waarde is 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Adres reservering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft de corresponderende parameters van IP-gereserveerde apparaten weer."
                       } ,{                      
                           type: "step",
                           title: "Een IP-adres reserveren",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Klik op Scan om een huidig verbonden apparaat te kiezen vanuit de DHCP Cliënt lijst; of voer het MAC adres van uw gewenste cliënt in in het MAC adres veld en het IP adres dat u wenst te reserveren voor de cliënt in het IP adres veld.",
                "3. Voer een beschrijving in voor de cliënt in het beschrijvings veld.",
                "4. Selecteer Inschakelen.",
                "5. Klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u deze invoer wilt uitschakelen, klik op het lamp icoon."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP Client List",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft de informatie weer van de momenteel verbonden apparaten."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamisch DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisch DNS (Dynamic Domain Name System) staat u toe om een vaste host en domein naam toe te wijzen aan een dynamisch internet IP adres. Het is gebruikelijk wanneer u uw eigen website host, FTP server of een andere server achter de router gebruikt. Om te beginnen dient u zich in te schrijven bij een dynamische DNS service provider zoals www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Een dynamisch DNS instellen",
       content: [ 
                "1. Selecteer de Dynamische DNS service provider.",
                "2. Voer de gebruikersnaam en wachtwoord in van het dynamisch DNS account.",
                "3. Voer de Domeinnaam in die u van de DDNS service provider hebt ontvangen.",
                "4. Selecteer de update interval vanuit de keuze-menu lijst.",
                "5. Als uw service provider NO-IP is, dan kan WAN IP binding u verzekeren dat het domein naam is gebonden aan het WAN IP van deze router.",
                "6. Klik op Login en opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u een nieuw DDNS account wilt gebruiken, gelieve eerst inloggen en daarna inloggen met het nieuwe account."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamisch DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamisch DNS (Dynamic Domain Name System) staat u toe om een vaste host en domein naam toe te wijzen aan een dynamisch internet IP adres. Het is gebruikelijk wanneer u uw eigen website host, FTP server of een andere server achter de router gebruikt. Om te beginnen dient u zich in te schrijven bij een dynamische DNS service provider zoals www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Lijst van domeinnamen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel toont informatie van alle domein namen die geregistreerd zijn met uw cloud account."
                       } ,{                      
                           type: "step",
                           title: "Een nieuwe domein naam registreren.",
       content: [ 
                "1. Klik Registreer.",
                "2. Voer de domein naam in dat u wilt registreren.",
                "3. Klik op opslaan."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statische routering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statische routering wordt gebruikt om vooraf een vaste route voor de netwerk informatie pakketten in te stellen, om een specifieke host of netwerk te bereiken."
                       } ,{                      
                           type: "step",
                           title: "Een statische routering instellen",
       content: [ 
                "1. Klik op Toevoegen.",
                "Voer een IP adres in in het veld Network Destination om de statische route voor deze invoer toe te wijzen.",
                "3. Voer een subnetmasker in in het veld subnetmasker veld om de netwerk porties en host porties van het IP adres te bepalen.",
                "4. Voer een gateway adres in in het veld Standaard Gateway om de router te verbinden met het netwerk of de host.",
                "5. Selecteer LAN of WAN in het interface veld om het type van de Network Destination the specificeren.",
                "6. Voer een korte beschrijving in voor deze invoer.",
                "7. Selecteer Inschakelen.",
                "8. Klik op opslaan"]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u deze invoer wilt uitschakelen, klik op het lamp icoon."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Systeem routering tabel",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiermee worden alle geldige ingevoerde routes weergegeven die momenteel in gebruik zijn."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Draadloos instellingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configureer de draadloze instellingen zoals u wenst."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecteer dit om slim verbinden in te schakelen. Deze functie helpt apparaten sneller te werken door ze toe te wijzen aan de beste draadloze kanalen op basis van de actuele omstandigheden, om de netwerkbelasting te balanceren."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Draadloos 2,4 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Netwerk naam (SSID)",
                           content: "U wordt aanbevolen om de netwerknaam (SSID) te wijzigen. Dit veld is hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "SSID verbergen",
                           content: "Selecteer als u het 2.4GHz netwerknaam (SSID) van de draadloze netwerk lijst wilt verbergen. Wanneer geselecteerd, zal het SSID niet gebroadcast worden en dient u handmatig te verbinden met het netwerk."
                       } ,{                      
                           type: "name",
                           title: "Beveiliging",
                           content: "Selecteer een van de volgende opties voor de beveiliging:",
       children: [{                      
                           type: "name",
                           title: "Geen beveiliging",
                           content: "Selecteer deze optie om de draadloze beveiliging uit te schakelen. Dit is niet aanbevolen."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selecteer deze optie om de draadloze beveiliging in te schakelen. Dit is zeer aanbevolen om het draadloze netwerk te beschermen tegen ongeautoriseerde toegang. Indien geselecteerd, configureer het volgende.",
       children: [{                      
                           type: "name",
                           title: "Versie",
                           content: "Selecteer een beveiligings versie. Selecteer een beveiligings versie. WPA2-PSK is het meest veiligst. Indien u het niet zeker weet, selecteer Auto."
                       } ,{                      
                           type: "name",
                           title: "Versleuteling",
                           content: "Selecteer een beveiligings encrtyptie type. AES is het meest veiligst. Het is niet aanbevolen om TKIP encryptie te gebruiken wanneer de router in de 802.11n modus werkzaam is. Bovendien, door gebruik te maken van TKIP zal de WPS functie uitgeschakeld worden. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Wachtwoord",
                           content: "Voer in deze veld een draadloos wachtwoord van 8 tot 63 ASCII tekens in, of van 8 tot 64 hexadecimale tekens."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Selecteer deze optie om de meer geavanceerde verificatiemethode m.b.v. een RADIUS (Remote Authentication Dial In User Service) server in te schakelen. Indien geselecteerd, wordt de WPS functie uitgeschakeld.",
       children: [{                      
                           type: "name",
                           title: "Versie",
                           content: "Selecteer een beveiliging versie. WPA2 is het meest veiligst. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Versleuteling",
                           content: "Selecteer een beveiligings encrtyptie type. AES is het meest veiligst. Het is niet aanbevolen om TKIP encryptie te gebruiken wanneer de router in de 802.11n modus werkzaam is. Bovendien, door gebruik te maken van TKIP zal de WPS functie uitgeschakeld worden. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS server IP",
                           content: "Voer het IP-adres van de RADIUS server in."
                       } ,{                      
                           type: "name",
                           title: "RADIUS poort",
                           content: "Voer het poortnummer van de RADIUS server in."
                       } ,{                      
                           type: "name",
                           title: "RADIUS wachtwoord",
                           content: "Voer het gedeelde wachtwoord voor de RADIUS server in."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selecteer deze optie om de basis verificatiemethode in te schakelen als de client-apparaten alleen toegang hebben tot de draadloze verbinding via WEP ((Wired Equivalent Privacy). Als u dit selecteert, dan wordt de WPF-functie uitgeschakeld.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Selecteer een authenticatie type voor het draadloze netwerk. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP sleutel formaat",
                           content: "Gebruik het ASCII formaat, of selecteer Hexadecimaal. Het ASCII formaat is een combinatie van letters en cijfers. Het hexadecimale formaat is een combinatie van cijfers (0-9) en letters (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Type sleutel",
                           content: "Selecteer een WEP sleutel lengte.",
       children: [{                      
                           type: "name",
                           title: "64-bits",
                           content: "Biedt de mogelijkheid 10 hexadecimale tekens (0-9, A-F, a-f) of 5 ASCII tekens in het veld WEP waarde in te voeren."
                       } ,{                      
                           type: "name",
                           title: "128-bits",
                           content: "Biedt de mogelijkheid 26 hexadecimale tekens (0-9, A-F, a-f) of 13 ASCII tekens in het veld WEP waarde in te voeren."
                       }]
} ,{                      
                           type: "name",
                           title: "Sleutel waarde",
                           content: "Voer de WEP sleutel in het desbetreffende veld in."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanaal",
                           content: "Selecteer een werkkanaal voor het 2,4 GHz draadloze netwerk. Aanbevolen wordt het kanaal op Auto te laten staan als u geen problemen met onderbroken draadloze verbindingen ondervindt."
                       } ,{                      
                           type: "name",
                           title: "Zendvermogen",
                           content: "Selecteer Hoog, Middel, of Laag om het zendvermogen voor data in te stellen. De standaard en aanbevolen instelling is Hoog."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness Functie",
                           content: "Selecteer deze checkbox om de Airtime Fairness (ATF) functie in te schakelen waardoor u de doorvoer van elke stroom kunt optimaliseren. De ATF verkeer planner gebruikt de per-bestemming airtime doelen om het airtime verbruik langs stroombestemmingen te balanceren."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Multi-User MIMO functie",
                           content: "Klik om de Multi-User MIMO functie in te schakelen."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Draadloos 5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Netwerk naam (SSID)",
                           content: "U wordt aanbevolen om de netwerknaam (SSID) te wijzigen. Dit veld is hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "SSID verbergen",
                           content: "Selecteer als u het 5GHz netwerk naam (SSID) wilt verbergen van de draadloze netwerk lijst. Wanneer geselecteerd, zal het SSID niet gebroadcast worden en dient u handmatig te verbinden met het netwerk."
                       } ,{                      
                           type: "name",
                           title: "Beveiliging",
                           content: "Selecteer een van de volgende opties voor de beveiliging:",
       children: [{                      
                           type: "name",
                           title: "Geen beveiliging",
                           content: "Selecteer deze optie om de draadloze beveiliging uit te schakelen. Dit is niet aanbevolen."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selecteer deze optie als u de draadloze beveiliging wilt inschakelen. Dit wordt sterk aanbevolen om het draadloze netwerk te beschermen tegen ongeautoriseerde toegang. Indien geselecteerd, configureer dan het volgende.",
       children: [{                      
                           type: "name",
                           title: "Versie",
                           content: "Selecteer een beveiligingsversie. WPA2-PSK is het meest veilig. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Versleuteling",
                           content: "Selecteer een beveiligings encrtyptie type. AES is het meest veiligst. Het is niet aanbevolen om TKIP encryptie te gebruiken wanneer de router in de 802.11n modus werkzaam is. Bovendien, door gebruik te maken van TKIP zal de WPS functie uitgeschakeld worden. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Wachtwoord",
                           content: "Voer in deze veld een draadloos wachtwoord van 8 tot 63 ASCII tekens in, of van 8 tot 64 hexadecimale tekens."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Selecteer deze optie om de meer geavanceerde verificatiemethode m.b.v. een RADIUS (Remote Authentication Dial In User Service) server in te schakelen. Indien geselecteerd, wordt de WPS functie uitgeschakeld.",
       children: [{                      
                           type: "name",
                           title: "Versie",
                           content: "Selecteer een beveiliging versie. WPA2 is het meest veiligst. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Versleuteling",
                           content: "Selecteer een beveiligings encrtyptie type. AES is het meest veiligst. Het is niet aanbevolen om TKIP encryptie te gebruiken wanneer de router in de 802.11n modus werkzaam is. Bovendien, door gebruik te maken van TKIP zal de WPS functie uitgeschakeld worden. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS server IP",
                           content: "Voer het IP-adres van de RADIUS server in."
                       } ,{                      
                           type: "name",
                           title: "RADIUS poort",
                           content: "Voer het poortnummer van de RADIUS server in."
                       } ,{                      
                           type: "name",
                           title: "RADIUS wachtwoord",
                           content: "Voer het gedeelde wachtwoord voor de RADIUS server in."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selecteer deze optie om de basis verificatiemethode in te schakelen als de client-apparaten alleen toegang hebben tot de draadloze verbinding via WEP ((Wired Equivalent Privacy). Als u dit selecteert, dan wordt de WPF-functie uitgeschakeld.",
       children: [{                      
                           type: "name",
                           title: "Type",
                           content: "Selecteer een authenticatie type voor het draadloze netwerk. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP sleutel formaat",
                           content: "Gebruik het ASCII formaat, of selecteer Hexadecimaal. Het ASCII formaat is een combinatie van letters en cijfers. Het hexadecimale formaat is een combinatie van cijfers (0-9) en letters (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Type sleutel",
                           content: "Selecteer een WEP sleutel lengte.",
       children: [{                      
                           type: "name",
                           title: "64-bits",
                           content: "Biedt de mogelijkheid 10 hexadecimale tekens (0-9, A-F, a-f) of 5 ASCII tekens in het veld WEP waarde in te voeren."
                       } ,{                      
                           type: "name",
                           title: "128-bits",
                           content: "Biedt de mogelijkheid 26 hexadecimale tekens (0-9, A-F, a-f) of 13 ASCII tekens in het veld WEP waarde in te voeren."
                       }]
} ,{                      
                           type: "name",
                           title: "Sleutel waarde",
                           content: "Voer de WEP sleutel in het desbetreffende veld in."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanaal",
                           content: "Selecteer een werkkanaal voor het 5 GHz draadloze netwerk. Aanbevolen wordt het kanaal op Auto te laten staan als u geen problemen met onderbroken draadloze verbindingen ondervindt."
                       } ,{                      
                           type: "name",
                           title: "Zendvermogen",
                           content: "Selecteer Hoog, Middel, of Laag om het zendvermogen voor data in te stellen. De standaard en aanbevolen instelling is Hoog."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness Functie",
                           content: "Selecteer deze checkbox om de Airtime Fairness (ATF) functie in te schakelen waardoor u de doorvoer van elke stroom kunt optimaliseren. De ATF verkeer planner gebruikt de per-bestemming airtime doelen om het airtime verbruik langs stroombestemmingen te balanceren."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Multi-User MIMO functie",
                           content: "Klik om de Multi-User MIMO functie in te schakelen."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) biedt u een eenvoudigere aanpak voor het opzetten van een beveiligde Wi-Fi verbinding."
                       } ,{                      
                           type: "name",
                           title: "Druk knop (aanbevolen)",
       content: [ 
                "Deze methode staat u om eenvoudig elk WPS-ingeschakeld apparaat te verbinden met het draadloze netwerk.",
                "Klik op de start WPS knop op het scherm. Druk vervolgens binnen 2 minuten op de WPS knop van uw cliënt apparaat."]
} ,{                      
                           type: "name",
                           title: "PIN van router",
       content: [ 
                "De standaard PIN code kunt u vinden op de productsticker van de router.",
                "Klik op genereren om een nieuwe PIN code of klik op standaard om de huidige PIN te herstellen naar zijn fabrieks standaard PIN."]
} ,{                      
                           type: "name",
                           title: "Voer de PIN-code van de client in",
       content: [ 
                "Deze methode staat u toe om een draadloos apparaat handmatig toe te voegen.",
                "Voer de PIN code van het apparaat in het betreffende veld in en klik op Verbinden."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Draadloze stations online",
               CONTENT: [{
                           type: "name",
                           title: "Client nummer",
                           content: "Toont het nummer van de bijbehorende draadloos client."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres",
                           content: "Toont het MAC-adres van de bijbehorende draadloos client."
                       } ,{                      
                           type: "name",
                           title: "Type verbinding",
                           content: "Toont de draadloze frequentieband (2,4 GHz of 5 GHz) van de bijbehorende draadloos client."
                       } ,{                      
                           type: "name",
                           title: "Beveiliging",
                           content: "Toont het type beveiliging van de bijbehorende draadloos client."
                       } ,{                      
                           type: "name",
                           title: "Ontvangen pakketten",
                           content: "Toont het aantal pakketten ontvangen door de bijbehorende draadloos client."
                       } ,{                      
                           type: "name",
                           title: "Verzonden pakketten",
                           content: "Toont het aantal pakketten verzonden door de bijbehorende draadloos client."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik op Vernieuwen om de informatie op deze pagina te verversen."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Schema",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met een draadloze schema kunt u het draadloze signaal gedurende een specifieke periode uitschakelen. Bijvoorbeeld, u kunt het draadloze signaal tussen 00:00 en 07:00 uitschakelen."
                       } ,{                      
                           type: "name",
                           title: "Draadloos Uit Tijd",
                           content: "Toont de periode(s) waarin het draadloze signaal uit is.",
       children: [{                      
                           type: "step",
                           title: "Instellen wanneer draadloos uit is.",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Stel de tijdsperiode in waarin u wilt dat het draadloos signaal uitgeschakeld is.",
                "3. Selecteer dagen herhalen. U kunt kiezen uit \"Elke dag\" of specificeer bepaalde dagen.",
                "4. Klik op Opslaan."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Instellingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze functie staat u toe om Wi-Fi toegang aan gasten te bieden zonder het hoofdnetwerk openbaar te maken."
                       } ,{                      
                           type: "name",
                           title: "Sta gasten toe elkaar te zien",
                           content: "Selecteer deze checkbox om toe te staan dat draadloze apparaten op het gastnetwerk met elkaar kunnen communiceren via methodes zoals netwerk buren, Samba, Ping en FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Sta gasten toegang tot mijn lokale netwerk toe.",
                           content: "Selecteer deze checkbox om draadloze apparaten op het gastnetwerk toe te staan met elkaar te communiceren met de apparaten verbonden aan de router's LAN poorten of het hoofd netwerk via methodes zoals netwerk buren, Samba, Ping en FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Draadloos 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Gastnetwerk inschakelen",
                           content: "Selecteer dit keuzevakje om een Gastnetwerk in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Netwerk naam (SSID)",
                           content: "Gebruik het standaard gasten SSID of voer een nieuwe naam in (max. 32 tekens)."
                       } ,{                      
                           type: "name",
                           title: "SSID verbergen",
                           content: "Selecteer dit vakje als u het gasten SSID niet in de Wi-Fi netwerklijst wilt weergeven."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Wachtwoord update interval",
                           content: "Selecteer de update interval van het gastnetwerk wachtwoord."
                       } ,{                      
                           type: "name",
                           title: "Beveiliging",
                           content: "Wanneer u ervoor kiest om het wachtwoord nooit te updaten, selecteert u een van de volgende beveiligingsopties:",
       children: [{                      
                           type: "name",
                           title: "Geen beveiliging",
                           content: "Selecteer deze optie om de draadloze beveiliging uit te schakelen. Dit is niet aanbevolen."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selecteer deze optie om de draadloze beveiliging in te schakelen. Dit wordt zeer aanbevolen om uw gastnetwerk te beschermen tegen ongeautoriseerde toegang. Indien geselecteerd, configureer het volgende.",
       children: [{                      
                           type: "name",
                           title: "Versie",
                           content: "Selecteer een beveiligingsversie. WPA2-PSK is het meest veilig. Indien u het niet zeker weet, selecteer dan Auto."
                       } ,{                      
                           type: "name",
                           title: "Versleuteling",
                           content: "Selecteer een beveiligings encrtyptie type. AES is het meest veiligst. Het is niet aanbevolen om TKIP encryptie te gebruiken wanneer de router in de 802.11n modus werkzaam is. Bovendien, door gebruik te maken van TKIP zal de WPS functie uitgeschakeld worden. Indien u het niet zeker weet, selecteer dan Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portaal",
                           content: "Portaal authenticatie verbeterd uw netwerkbeveiliging door cliënten welke tijdelijk toegang tot uw draadloze netwerk hebben te laten authenticeren."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Om portaal authenticatie te configureren",
       content: [ 
                "1. Selecteer portaal voor beveiliging.",
                "2. Selecteer simpel wachtwoord of geen authenticatie voor de authenticatie.",
                "A. Simpel wachtwoord - Specificeer een wachtwoord voor authenticatie (8-16 alfa tekens, nummers en _).",
                "B. Geen authenticatie - Cliënten hebben toegang tot het netwerk zonder enige authenticatie.",
                "3. Selecteer 1 uur, 2 uren, 4 uren, 8 uren of altijd om de authenticatie timeout te specificeren. Wanneer een cliënts zijn authenticatie verloopt, dient hij opnieuw in te loggen voor authenticatie toegang.",
                "4. (Optioneel) Schakel Redirect in en voer de URL adres in die benodigd is. Een nieuwe authenticerende cliënt wordt omgeleid naar de URL die u heeft gespecificeerd.",
                "5. (Optioneel) U kunt ook de authenticatie login pagina aanpassen.",
                "A. Portaal Titel - Tot 31 tekens.",
                "B. Gebruikersvoorwaarden - Tot 1023 tekens.",
                "C. Logo afbeelding - Upload een JPG of PNG afbeelding (minder dan 100KB) om het logo aan te passen.",
                "D. Achtergrond afbeelding - Upload een JPG of PNG afbeelding (minder dan 2MB) om de achtergrond aan te passen.",
                "6. Klik op opslaan."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Wachtwoord",
                           content: "Maak een wachtwoord van 8 tot 63 ASCII-tekens of 8 tot 64 hexadecimale tekens (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Wachtwoord",
                           content: "Gebruik het wachtwoord dat willekeurig wordt gegenereerd, of voer een wachtwoord in van 8 t/m 63 ASCII tekens, of 8 t/m 64 hexadecimale tekens (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG(Application Layer Gateway) staat aangepaste NAT (Network Address Translation) traversal filter toe om aangesloten te worden op de gateway om adres en poort vertaling te ondersteunen voor een bepaalde applicatielaag \"control/data\" protocollen: FTP, TFTP,H323 etc. ALG inschakelen is aanbevolen."
                       } ,{                      
                           type: "name",
                           title: "FTP ALG inschakelen",
                           content: "Indien geselecteerd, is het FTP (File Transfer Protocol) clients en servers toegestaan data via NAT over te brengen."
                       } ,{                      
                           type: "name",
                           title: "TFTP ALG inschakelen",
                           content: "Indien geselecteerd, is het TFTP (Trivial File Transfer Protocol) clients en servers toegestaan data via NAT over te brengen."
                       } ,{                      
                           type: "name",
                           title: "H323 ALG inschakelen",
                           content: "Indien geselecteerd, is het Microsoft NetMeeting clients toegestaan via NAT te communiceren."
                       } ,{                      
                           type: "name",
                           title: "RTSP ALG inschakelen",
                           content: "Indien geselecteerd, is het mediaplayer clients toegestaan te communiceren met streaming media servers via NAT."
                       } ,{                      
                           type: "name",
                           title: "SIP ALG inschakelen",
                           content: "Indien geselecteerd, staat het cliënten toe om te communiceren met SIP (Session Initiation Protocol) servers via NAT."
                       } ,{                      
                           type: "name",
                           title: "PPTP Passthrough inschakelen",
                           content: "Indien geselecteerd, is het Point-to-Point sessies toegestaan te worden getunneld door een IP-netwerk en doorgegeven naar de router."
                       } ,{                      
                           type: "name",
                           title: "L2TP Passthrough inschakelen",
                           content: "Indien geselecteerd, is het Layer 2 Point-to-Point sessies toegestaan te worden getunneld door een IP-netwerk en doorgegeven naar de router."
                       } ,{                      
                           type: "name",
                           title: "IPSec Passthrough inschakelen",
                           content: "Indien geselecteerd, staat het IPSec (Internet Protocol security) om getunneld te worden door een IP netwerk en doorgevoerd via de router. IPSec gebruikt cryptografische beveiligings diensten om prive en veilige communicaties over IP netwerken te verzekeren."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuele servers",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuele servers worden gebruikt om openbare diensten in uw lokale netwerk op te zetten. Een virtuele server wordt gedefinieerd als een externe poort en alle aanvragen vanaf het Internet via deze externe poort worden naar een aangewezen computer doorgestuurd, die met een statisch of gereserveerd IP-adres moet zijn geconfigureerd.",
                "Wanneer u een server plaatst op het lokale netwerk en u wilt deze delen op het internet, dan kan deze service gerealiseerd worden door Virtuele Servers en bieden dit aan aan de Internet gebruikers."]
} ,{                      
                           type: "paragraph",
                           content: "De tabel geeft relevante parameters van de virtuele server weer."
                       } ,{                      
                           type: "name",
                           title: "Type service",
                           content: "Geeft de naam van de virtuele server weer."
                       } ,{                      
                           type: "name",
                           title: "Externe poort",
                           content: "Het nummer van een of een reeks poorten, gebruikt door de virtuele server."
                       } ,{                      
                           type: "name",
                           title: "Intern IP",
                           content: "Het IP-adres van de computer waarop de service applicatie draait."
                       } ,{                      
                           type: "name",
                           title: "Interne poort",
                           content: "Het poortnummer van de computer waarop de service applicatie draait."
                       } ,{                      
                           type: "name",
                           title: "Protocol",
                           content: "Het protocol dat voor de service applicatie wordt gebruikt: TCP, UDP, of Alle (alle protocollen ondersteund door de router)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Toont de huidige status (in- of uitgeschakeld) van de specifieke filterregel."
                       } ,{                      
                           type: "name",
                           title: "Wijzigen",
                           content: "Toont opties voor het Wijzigen of Verwijderen van de desbetreffende regel."
                       } ,{                      
                           type: "step",
                           title: "Een virtuele server regel instellen",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Klik op scannen om een dient uit de lijst te selecteren om automatisch de gepaste poort nummer in de externe poort en interne poort velden aan te vullen. Als de dient niet weergegeven wordt, voer het externe poort nummer (bijv. 21) in of een reeks poorten (bijv. 21-25). Laat de interne poort blanco als deze hetzelfde is als de externe poort of voer een specifiek poort nummer in (bijv. 21) als de externe poort een enkele poort betreft. Voer het IP adres van de computer die de service applicatie uitvoert in in decimale notatie in het veld interne IP.",
                "3. Selecteer een protocol voor de service applicatie: TCP, UDP, of Alle in de keuzelijst Protocol .",
                "4. Selecteer Inschakelen.",
                "5. Klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
       content: [ 
                "1. Als u deze invoer wilt uitschakelen, klik op het lamp icoon.",
                "2. Het is aanbevolen om de standaard instellingen van de Interne Poort en Protocol te behouden wanneer u niet zeker weet welke poort of protocol u dient te gebruiken.",
                "3. Als het lokale host apparaat meer dan 1 type beschikbare diensten heeft, dan dient u een regel voor elke dienst te creëeren. Merk op dat de Externe poort niet overlapt kan worden."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port Triggering wordt gebruikt om verkeer op een bepaalde poort door te sturen naar een specifieke server in het netwerk."
                       } ,{                      
                           type: "paragraph",
                           content: "De tabel geeft relevante parameters van de poort triggering weer."
                       } ,{                      
                           type: "name",
                           title: "Applicatie",
                           content: "De naam van de applicatie."
                       } ,{                      
                           type: "name",
                           title: "Triggering poort",
                           content: "Toont de poort voor uitgaand verkeer die wordt gebruikt om een filterregel voor een uitgaande verbinding te triggeren (activeren)."
                       } ,{                      
                           type: "name",
                           title: "Trigger protocol",
                           content: "Het protocol dat voor de Triggering poort wordt gebruikt. TCP, UDP, of Alle (alle protocollen ondersteund door de router)."
                       } ,{                      
                           type: "name",
                           title: "Externe poort",
                           content: "Het nummer van een of een reeks poorten, gebruikt door het externe systeem. Een reactie via een van deze poorten wordt doorgestuurd naar de PC die deze regel triggert. U kunt maximaal 5 groepen poorten (of poort secties) invoeren. De groepen poorten moeten van elkaar worden gescheiden d.m.v. een “,” (komma), bijv. 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Extern protocol",
                           content: "Toont het protocol gebruikt voor de inkomende poort: TCP, UDP, of Alle (alle protocollen ondersteund door de router)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Toont de huidige status (in- of uitgeschakeld) van de specifieke filterregel."
                       } ,{                      
                           type: "name",
                           title: "Wijzigen",
                           content: "Toont opties voor het Wijzigen of Verwijderen van de desbetreffende regel."
                       } ,{                      
                           type: "step",
                           title: "Een Port Triggering regel instellen",
       content: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Elke regel kan maar door één host tegelijk worden gebruikt."
                       },
                "1. Klik op Toevoegen.",
                "2. Klik op Scannen om een applicatie uit de lijst te selecteren die automatisch de standaard waardes in de gepaste velden invoert. Als u een niet-genoteerde applicatie wilt toevoegen, voer dan handmatig de applicatie triggering poort, triggering protocol, externe poort en Externe protocol in.",
                "3. Selecteer Inschakelen.",
                "4. Klik op Opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u de regel wilt uitschakelen, klik dan op het lamp icoon."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "De DMZ (demilitarized Zone) host functie staat een local host toe om blootgesteld te worden aan het internet voor een speciaal doel, zoals internet gaming of video conferenties. Normaal gesproken staat DMZ een enkele computer toe op de LAN om al zijn poorten open te zetten. Deze computer dient geconfigureerd te zijn met een statisch IP adres en heeft zijn DHCP cliënt functie uitgeschakeld."
                       } ,{                      
                           type: "paragraph",
                           content: "Wanneer DMZ is ingeschakeld, is de DMZ host volledig blootgesteld aan het internet, wat voor sommige potentiële gevaren kan zorgen voor de veiligheid van de computer. Wanneer DMZ niet in gebruik is schakel dit dan tijdig uit."
                       } ,{                      
                           type: "step",
                           title: "Een computer of server als DMZ server aanwijzen",
       content: [ 
                "1. Klik op DMZ inschakelen.",
                "2. In het veld DMZ host IP-adres voert u het IP-adres van een lokale computer in die u als DMZ host wilt instellen.",
                "3. Klik op opslaan."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Standaard is de UPnP (Universal Plug-en-Play) functie ingeschakeld om apparaten zoals computer en internet toepassingen de mogelijkheid te bieden om automatisch ontdekt te worden en met elkaar te communiceren op het lokale netwerk. "
                       } ,{                      
                           type: "paragraph",
                           content: "Als u applicaties voor multiplayer gaming, peer-to-peer connecties, real-time communicaties (zoals VoIP conferenties) of remote assistentie wilt gebruiken dan kan het zijn dat u UPnP dient in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "UPnP service lijst",
                           content: "De UPnP service lijst toont UPnP informatie over de lokale host(s)."
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G help",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G-USB-modem",
                           content: "Geeft de status van de 3G/4G-USB-modem aan."
                       } ,{                      
                           type: "name",
                           title: "Gebruik de auto-geidentificeerde ISP parameters",
                           content: "Deze functie is standaard ingeschakeld. Indien ingeschakeld, kan de router de ISP identificeren voor de SIM/UIM kaart en de parameters automatisch invullen. Als de identificatie mislukt, selecteer de Regio en mobiele ISP handmatig."
                       } ,{                      
                           type: "name",
                           title: "Regio",
                           content: "Selecteert en geeft automatisch de regio weer wanneer de USB modem en SIM kaart succesvol zijn geidentificeerd. Zo niet, selecteer dan de regio uit het drop-down menu."
                       } ,{                      
                           type: "name",
                           title: "Mobiel ISP",
                           content: "Geeft de 3G/4G-provider aan. Als dit niet automatisch wordt gedetecteerd, selecteer de provider dan in het uitklapmenu. Het standaard kiesnummer en APN worden automatisch overeenkomstig ingevuld."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Als de SIM/UIM Protectie is ingeschakeld, voer de PIN code in. De SIM/UIM protectie is standaard uitgeschakeld. Houdt er rekening mee dat wanneer u de PIN code 3 keer verkeerd invoert, de SIM/UIM kaart automatisch geblokkeerd zal worden. U kunt deze alleen ontgrendelen door de PUK code vanaf uw PC/laptop in te voeren."
                       } ,{                      
                           type: "name",
                           title: "Bericht",
                           content: "Geeft de PIN informatie weer van de SIM/UIM kaart wanneer de PIN protectie is ingeschakeld."
                       } ,{                      
                           type: "name",
                           title: "Instellingen Kies nummer,APN,Gebruikersnaam/Wachtwoord",
                           content: "Als de ISP niet in de <strong>Mobiele ISP</strong> lijst voorkomt, selecteer deze checkbox en voer het dial nummer, APN (Access Point Name), gebruikersnaam en wachtwoord in dat u verkregen heeft van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "Kies nummer",
                           content: "Voer het Dial nummer in verkregen van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Voer de APN (Access Point Name) in verkregen van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer de gebruikersnaam en wachtwoord verkregen van uw ISP in. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "Verbinden op aanvraag",
                           content: "In deze modus wordt de Internet verbinding automatisch na een opgegeven tijd van inactiviteit (Max. tijd inactief) verbroken. De verbinding wordt opnieuw tot stand gebracht zodra u toegang tot het Internet probeert te krijgen."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Soms kan de verbinding niet worden verbroken, ondanks dat u de maximale inactieve tijd instelt, omdat sommige toepassingen het internet blijven gebruiken op de achtergrond."
                       } ,{                      
                           type: "name",
                           title: "Automatisch verbinden",
                           content: "In deze modus wordt de internetverbinding automatisch hersteld wanneer deze wordt verbroken."
                       } ,{                      
                           type: "name",
                           title: "Handmatig verbinden",
                           content: "In deze modus kunt u op de knop Verbinden of Verbreken klikken om handmatig de internetverbinding te beheren. Deze modus ondersteunt ook de maximale inactieve tijd. Voer in het veld Max. tijd inactief een maximale tijd (in minuten) in waarbinnen de internetverbinding inactief mag zijn voordat deze wordt verbroken. De standaardwaarde is 15 minuten. ALs u wilt dat de internetverbinding altijd actief is, voer dan 0 (nul) in."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Soms kan de verbinding niet worden verbroken, ondanks dat u de maximale inactieve tijd instelt, omdat sommige toepassingen het internet blijven gebruiken op de achtergrond."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik op de opslaan knop om de instellingen op te slaan."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Help geavanceerde 3G/4G-instellingen",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G-USB-modem",
                           content: "Geeft de status van de 3G/4G-USB-modem aan."
                       } ,{                      
                           type: "name",
                           title: "Gebruik de auto-geidentificeerde ISP parameters",
                           content: "Deze functie is standaard ingeschakeld. Indien ingeschakeld, kan de router de ISP identificeren voor de SIM/UIM kaart en de parameters automatisch invullen. Als de identificatie mislukt, selecteer de Regio en mobiele ISP handmatig."
                       } ,{                      
                           type: "name",
                           title: "Regio",
                           content: "Selecteert en toont automatisch de regio wanneer de USB modem en SIM kaart succesvol geidentificeerd zijn. Zo niet, selecteer dan de regio uit het drop-down menu."
                       } ,{                      
                           type: "name",
                           title: "Mobiel ISP",
                           content: "Geeft de 3G/4G-provider aan. Als dit niet automatisch wordt gedetecteerd, selecteer de provider dan in het uitklapmenu. Het standaard kiesnummer en APN worden automatisch overeenkomstig ingevuld."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Als de SIM/UIM Protectie is ingeschakeld, voer de PIN code in. De SIM/UIM protectie is standaard uitgeschakeld. Houdt er rekening mee dat wanneer u de PIN code 3 keer verkeerd invoert, de SIM/UIM kaart automatisch geblokkeerd zal worden. U kunt deze alleen ontgrendelen door de PUK code vanaf uw PC/laptop in te voeren."
                       } ,{                      
                           type: "name",
                           title: "Bericht",
                           content: "Geeft de PIN informatie weer van de SIM/UIM kaart wanneer de PIN protectie is ingeschakeld."
                       } ,{                      
                           type: "name",
                           title: "Instellingen Kies nummer,APN,Gebruikersnaam/Wachtwoord",
                           content: "Als de ISP niet in de <strong>Mobiele ISP</strong> lijst voorkomt, selecteer deze checkbox en voer het dial nummer, APN (Access Point Name), gebruikersnaam en wachtwoord in dat u verkregen heeft van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "Kies nummer",
                           content: "Voer het Dial nummer in verkregen van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Voer de APN (Access Point Name) in verkregen van uw ISP."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer de gebruikersnaam en wachtwoord verkregen van uw ISP in. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "Verbinden op aanvraag",
                           content: "In deze modus wordt de Internet verbinding automatisch na een opgegeven tijd van inactiviteit (Max. tijd inactief) verbroken. De verbinding wordt opnieuw tot stand gebracht zodra u toegang tot het Internet probeert te krijgen."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Soms kan de verbinding niet worden verbroken, ondanks dat u de maximale inactieve tijd instelt, omdat sommige toepassingen het internet blijven gebruiken op de achtergrond."
                       } ,{                      
                           type: "name",
                           title: "Automatisch verbinden",
                           content: "In deze modus wordt de internetverbinding automatisch hersteld wanneer deze wordt verbroken."
                       } ,{                      
                           type: "name",
                           title: "Handmatig verbinden",
                           content: "In deze modus kunt u op de knop Verbinden of Verbreken klikken om handmatig de internetverbinding te beheren. Deze modus ondersteunt ook de maximale inactieve tijd. Voer in het veld Max. tijd inactief een maximale tijd (in minuten) in waarbinnen de internetverbinding inactief mag zijn voordat deze wordt verbroken. De standaardwaarde is 15 minuten. ALs u wilt dat de internetverbinding altijd actief is, voer dan 0 (nul) in."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Soms kan de verbinding niet worden verbroken, ondanks dat u de maximale inactieve tijd instelt, omdat sommige toepassingen het internet blijven gebruiken op de achtergrond."
                       } ,{                      
                           type: "name",
                           title: "Verificatie type",
                           content: "Selecteer een authenticatie type. Standaard is dit Auto. Sommige ISP's vereisen een specifieke authenticatie type, bevestig met uw ISP of behoudt de standaard instellingen."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Indien Auto (standaard), bepaalt de router automatisch de authenticatie type die gebruikt wordt door de ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Bij PAP (Password Authentication Protocol) voert de router authenticatie uit met de peer middels twee handdrukken. Selecteer deze optie als de provider dit authenticatietype vereist."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Bij CHAP (Challenge Handshake Authentication Protocol) voert de router authenticatie uit met de peer middels drie handdrukken en wordt de identiteit van de peer regelmatig gecontroleerd. Selecteer deze optie als de provider dit authenticatietype vereist."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard MTU (Maximum Transmission Unit) grootte is 1480 bytes. Wijzig dit niet tenzij dit vereist is door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Gebruik de volgende DNS servers",
                           content: "Indien de ISP DNS server IP adressen aanbiedt, selecteer dan deze checkbox en voer het <strong>Primair DNS</strong> en secundair DNS (optioneel) IP adressen onderstaand in. Anderzijds zullen de DNS servers automatisch dynamisch toegewezen worden door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Primaire DNS",
                           content: "Voer het DNS IP adres in decimale notatie in voorzien door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Secundaire DNS",
                           content: "(Optioneel) Voer een ander DNS IP adres in in decimale notatie verkregen van de ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik op de <strong>Opslaan</strong> knop om de instellingen op te slaan."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Apparaat instellingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Het scherm Apparaat instellingen toont informatie over op USB-aansluitingen aangesloten USB opslagapparaten."
                       } ,{                      
                           type: "name",
                           title: "Scannen",
                           content: "De router detecteert doorgaans automatisch als er een nieuw apparaat wordt aangesloten. Als dat niet het geval is, klikt u op deze knop om naar nieuw aangesloten apparaten te scannen en het informatiescherm te vernieuwen."
                       } ,{                      
                           type: "name",
                           title: "Volume",
                           content: "Toont de naam van het USB-volume."
                       } ,{                      
                           type: "name",
                           title: "Capaciteit",
                           content: "Toont de totale opslagcapaciteit van het USB-apparaat."
                       } ,{                      
                           type: "name",
                           title: "Vrije ruimte",
                           content: "Toont de momenteel beschikbare opslagruimte."
                       } ,{                      
                           type: "name",
                           title: "Veilig verwijderen",
                           content: "Klik op deze knop om het USB-apparaat veilig af te sluiten voordat het fysiek van de router wordt afgekoppeld."
                       } ,{                      
                           type: "paragraph",
                           content: "De verwijder knop verschijnt alleen wanneer het USB opslagapparaat verbonden is met de router. Wanneer de huidige volume bezet is, bent u niet in staat om deze los te koppelen."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Dit keuzevakje verschijnt alleen als er daadwerkelijk een USB-opslagapparaat op de router aangesloten is. Selecteer dit vakje om het delen van bestanden op het USB-apparaat in te schakelen."
                       } ,{                      
                           type: "step",
                           title: "Een fileserver instellen",
       content: [ 
                "1. Sluit een USB opslagapparaat op de USB-aansluiting van de router aan m.b.v. een USB-kabel.",
                "2. Het nieuw aangesloten USB-apparaat wordt normaal gesproken automatisch gedetecteerd door de router en de gegevens ervan verschijnen in het deel Apparaat instellingen. Als dat niet het geval is, klikt u op Scannen.",
                "3. Selecteer Actief om het delen van bestanden in te schakelen."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Account voor delen",
               CONTENT: [{
                           type: "name",
                           title: "Account",
                           content: "U kunt kiezen voor Standaard account gebruiken om in te loggen voor gedeelde bestanden en mappen, of Nieuw account gebruiken en de volgende gegevens invoeren om een nieuw gebruikersaccount aan te maken."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer een gebruikers in tussen 1 en 15 tekens (letters, cijfers, underscore) en een wachtwoord tussen 1 en 15 ASCII-tekens lang. Deze velden zijn hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "Wachtwoord bevestigen",
                           content: "Voer het wachtwoord nogmaals in om te controleren of u geen typfouten heeft gemaakt. In dit veld wordt ook onderscheid gemaakt tussen hoofdletters en kleine letters."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik Opslaan om alle instellingen op te slaan."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Instellingen voor delen",
               CONTENT: [{
                           type: "name",
                           title: "Netwerkmedia/Servernaam",
                           content: "Toont de naam die wordt gebruikt om toegang te krijgen tot het aangesloten USB-opslagapparaat."
                       } ,{                      
                           type: "name",
                           title: "Inschakelen",
                           content: "Selecteren om de toegangsmethode in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Toegangsmethode",
                           content: "Er zijn drie toegangsmethoden die toegang tot het aangesloten USB opslagapparaat geven. U kunt een of meer toegangsmethoden selecteren door het bijbehorende keuzevakje aan te vinken.",
       children: [{                      
                           type: "name",
                           title: "Netwerk omgeving",
                           content: "Indien ingeschakeld, kunnen gebruikers op het netwerk het USB opslagapparaat benaderen door gebruik te maken van een toegewezen IP adres (bijv. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Indien ingeschakeld, kunnen gebruikers op het netwerk het USB opslagapparaat benaderen door gebruik te maken van hettoegewezen IP adres, gevolgd door de FTP server's poort nummer (bijv. Ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "Indien ingeschakeld, krijgen gebruikers op afstand toegang tot het USB opslagapparaat m.b.v. FTP via het Internet. Deze functie ondersteunt het downloaden en uploaden van bestanden. Om het poortnummer van de FTP server te veranderen, voert u een nieuw poortnummer in en klikt u op Opslaan om de wijzigingen op te slaan."
                       }]
} ,{                      
                           type: "name",
                           title: "Koppeling",
                           content: "Toont het adres dat wordt gebruikt voor toegang tot het gedeelde USB opslagapparaat."
                       } ,{                      
                           type: "name",
                           title: "Poort",
                           content: "Geeft het poortnummer van de FTP-server aan. Gebruik de standaardwaarde 21 of een waarde tussen 1024 en 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik Opslaan om alle instellingen op te slaan."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Mappen delen",
               CONTENT: [{
                           type: "name",
                           title: "Alles delen",
                           content: "Vink deze optie aan om alle bestanden en mappen te delen, of vink deze uit om alleen de geselecteerde mappen te delen."
                       } ,{                      
                           type: "name",
                           title: "Verificatie inschakelen",
                           content: "Het wordt sterk aanbevolen verificatie in te schakelen, zodat gebruikers een geldige gebruikersnaam en wachtwoord moeten invoeren om toegang tot de gedeelde mappen te krijgen."
                       } ,{                      
                           type: "name",
                           title: "Naam van map",
                           content: "Toont de naam van de gedeelde map."
                       } ,{                      
                           type: "name",
                           title: "Pad van map",
                           content: "Toont het pad naar de gedeelde map."
                       } ,{                      
                           type: "name",
                           title: "Media delen",
                           content: "Geeft aan of gedeelde map voor media delen mag worden gebruikt."
                       } ,{                      
                           type: "name",
                           title: "Volume naam",
                           content: "Toont de naam van het gedeelde volume."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Toont de status van de gedeelde map d.m.v. een gloeilamp symbool."
                       } ,{                      
                           type: "name",
                           title: "Wijzigen",
                           content: "Toont opties voor het Wijzigen of Verwijderen van de desbetreffende gedeelde map."
                       } ,{                      
                           type: "name",
                           title: "Bladeren",
                           content: "Klik hierop om naar een gedeelde map te zoeken."
                       } ,{                      
                           type: "name",
                           title: "Toegang via Gastnetwerk toestaan",
                           content: "Selecteer deze optie als u clients in het Gastnetwerk toegang tot de gedeelde mappen wil geven."
                       } ,{                      
                           type: "name",
                           title: "Verificatie inschakelen",
                           content: "Selecteer deze optie als gebruikers een geldige gebruikersnaam en wachtwoord moeten invoeren om toegang tot de gedeelde mappen te krijgen."
                       } ,{                      
                           type: "name",
                           title: "Schrijftoegang inschakelen",
                           content: "Selecteer deze optie als u gebruikers wilt toestaan wijzigingen in de inhoud van de map aan te brengen."
                       } ,{                      
                           type: "name",
                           title: "Media delen inschakelen",
                           content: "Selecteer deze optie om het delen van media in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Vernieuwen",
                           content: "Klik hierop om de lijst van gedeelde mappen te vernieuwen."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Printer server",
               CONTENT: [{
                           type: "name",
                           title: "Printer server",
                           content: "Schakel in om de printer server functie in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Naam printer",
                           content: "Geeft de naam weer van de printer welke verbonden is met de router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tijd machine maakt een backup van al uw bestanden op uw Mac computer naar een USB opslag apparaat verbonden aan uw modem router."
                       } ,{                      
                           type: "name",
                           title: "Inschakelen",
                           content: "Selecteer deze checkbox om de tijd machine functie in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Backup schijf",
                           content: "Selecteer een locatie voor de tijd machine backups."
                       } ,{                      
                           type: "name",
                           title: "Grootte limiet voor backups",
                           content: "Herlokaliseer hoeveel schijfruimte er gebruikt kan worden voor tijd machine's backups. 0 betekend geen limiet voor de ruimte."
                       } ,{                      
                           type: "name",
                           title: "Opslaan",
                           content: "Klik om uw instellingen op te slaan."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline download",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met offline download ingeschakeld, kan de router bestanden downloaden zonder dat de computer altijd aan moet blijven."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Schakel in om de offline download functie in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Pad van map",
                           content: "Selecteer een pas om de downloads op te slaan of te bewaren.",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Wijzig het pad niet of ontkoppel het USB opslagapparaat niet terwijl u bestanden upload of download; anders kunnen er fatale fouten voorkomen."
                       }]
} ,{                      
                           type: "name",
                           title: "Schema",
                           content: "Selecteer de checkbox om de schema functie in te schakelen wat u in staat stelt om een tijd periode te specificeren waarin u bestanden kunt downloaden/uploaden."
                       } ,{                      
                           type: "name",
                           title: "Blijf uploaden nadat taken voltooid zijn",
                           content: "Selecteer de checkbox om de data van de voltooide downloads naar anderen te blijven uploaden."
                       } ,{                      
                           type: "name",
                           title: "Maximum aantal actieve downloads",
                           content: "Voer een waarde in tussen 1 en 10 om het maximaal aantal actieve downloads in te stellen. De standaardwaarde is 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Downloads",
               CONTENT: [{
                           type: "note",
                           title: "Bestand",
                           content: "Geeft de naam en type van het download bestand weer."
                       } ,{                      
                           type: "note",
                           title: "Snelheid",
                           content: "Geeft de huidige download (of upload) snelheid weer."
                       } ,{                      
                           type: "note",
                           title: "Voltooid",
                           content: "Geeft de vooruitgang van de download weer."
                       } ,{                      
                           type: "note",
                           title: "Resterende tijd",
                           content: "Geeft de resterende tijd van de download weer."
                       } ,{                      
                           type: "note",
                           title: "Verbonden peers",
                           content: "Geeft het aantal verbonden peers van de download weer."
                       } ,{                      
                           type: "note",
                           title: "Status",
                           content: "Geeft de huidige status van de download weer (downloaden, wachten, pauzeren, voltooid of fout)."
                       } ,{                      
                           type: "name",
                           title: "Een nieuwe download toevoegen",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Selecteer de bron van de download, torrent van PC, torrent van USB of URL.",
                "3. Selecteer de torrent locatie voor BT, of voer de URL in voor FTP,HTTP en aMule.",
                "4. Klik op Opslaan.",
                "5. Voor aMule, specificeer de aMule server IP adres en poort onder Geavanceerd > aMule server."]
}]
} ,{                      
                           type: "name",
                           title: "Downloads verwijderen",
                           content: "Selecteer de corresponderende checkbox van de download(s) die u wenst te verwijderen en klik vervolgens op Verwijderen boven de tabel."
                       } ,{                      
                           type: "name",
                           title: "Downloads pauzeren",
                           content: "Klik op de corresponderende checkbox om de download(s) die u wenst te pauzeren en klik op Pauze boven de tabel."
                       } ,{                      
                           type: "name",
                           title: "Downloads hervatten",
                           content: "Klik op de corresponderende checkbox om de download(s) die u wenst te hervatten en klik op Hervatten boven de tabel."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Geavanceerd",
               CONTENT: [{
                           type: "name",
                           title: "Snelheid limieten",
                           content: "Specificeer de maximum download en upload snelheid voor de internet verbinding."
                       } ,{                      
                           type: "name",
                           title: "Maximale download snelheid",
                           content: "Voer een waarde in tussen 1 en 100000 kB/s om de maximum download snelheid in te stellen. De standaardwaarde is 1024."
                       } ,{                      
                           type: "name",
                           title: "Maximale upload snelheid",
                           content: "Voer een waarde in tussen 1 en 100000 kB/s om de maximum upload snelheid in te stellen. De standaardwaarde is 512."
                       } ,{                      
                           type: "name",
                           title: "Aantal verbindingen",
                           content: "Specificeer het maximum aantal verbindingen"
                       } ,{                      
                           type: "name",
                           title: "Globaal maximum aantal verbindingen",
                           content: "Voer een waarde in tussen 1 en 200 om het globaal maximum aantal verbindingen in te stellen. De standaardwaarde is 100."
                       } ,{                      
                           type: "name",
                           title: "Maximum aantal verbonden peers per torrent.",
                           content: "Voer een waarde in tussen 1 en 100 om het maximaal aantal verbonden peers per torrent in te stellen. De standaardwaarde is 50."
                       } ,{                      
                           type: "name",
                           title: "DHT netwerk inschakelen",
                           content: "Schakel deze functie om de efficiëntie te verbeteren om peers te vinden, zodat u de download snelheid kunt verhogen."
                       } ,{                      
                           type: "name",
                           title: "Peer uitwisseling inschakelen",
                           content: "Schakel deze functie om om de communicatie efficiëntie tussen een groep peers te verbeteren zodat u de download snelheid kunt verhogen."
                       } ,{                      
                           type: "name",
                           title: "BitTorrent Protocol Encryptie inschakelen",
                           content: "Schakel deze functie in om de privacy en vertrouwelijkheid te versterken gedurende het proces van de gegevensoverdracht."
                       } ,{                      
                           type: "name",
                           title: "aMule Server",
                           content: "Voer het IP adres en de poort van de aMule server in. De aMule download werkt alleen wanneer de router verbonden is met de server."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Ouderlijk toezicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met ouderlijk toezicht kunt u ongepaste, expliciete en kwaardaardige websites blokkeren; de toegang beperken op bepaalde tijden van de dag (bijvoorbeeld, Facebook of Youtube gedurende huiswerk tijd)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Apparaten onder ouderlijk toezicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft informatie en instellingen weer van de apparaten die momenteel verboden worden door ouderlijk toezicht."
                       } ,{                      
                           type: "step",
                           title: "Beperkingen opleggen aan een nieuw client apparaat",
       content: [ 
                "1. Schakel ouderlijk toezicht in.",
                "2. Klik op toevoegen.",
                "3. Klik Scannen om een huidig verbonden apparaat te kiezen van de toegang apparaten lijst; of voer de naam van het apparaat en het MAC adres handmatig in om een apparaat toe te voegen dat niet verbonden is.",
                "4. Klik op het effectieve tijd icoon om een tijd periode te specificeren waarin het verbod van toepassing is.",
                "5. Voer een korte beschrijving in het het beschrijvings veld. Dit veld is optioneel.",
                "6. Selecteer deze invoer inschakelen.",
                "7. Klik op Opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u deze invoer wilt uitschakelen, klik op het lamp icoon."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Inhoud beperken",
               CONTENT: [{
                           type: "paragraph",
                           content: "Inhoud beperking staat u toe om de toegang tot specifieke websites te verbieden door gebruik te maken van trefwoorden en domeinnamen. Het cliënt apparaat wat beheerd wordt door ouderlijk toezicht kan wel of geen toegang tot deze websites verkrijgen, afhankelijk van de beperkingsbeleid die u selecteerd."
                       } ,{                      
                           type: "step",
                           title: "Inhoud specificeren om toegang te geven.",
       content: [ 
                "1. Schakel inhoudsbeperking in.",
                "2. Selecteer de inhoudsbeperking volgens de behoeften:",
                "A. Als u wilt dat beheerde apparaten toegang hebben tot alle websites, met uitzondering van een aantal, selecteer Zwarte lijst.",
                "B. Als u wilt dat beheerde apparaten alleen toegang hebben tot bepaalde websites, selecteer Witte lijst.",
                "3. Klik op Nieuw trefwoord toevoegen om een web adres trefwoord (bijvoorbeeld, wikipedia) of een domein naam aan de zwarte lijst of witte lijst toe te voegen.",
                "4. Klik op Opslaan."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "De QoS (Quality of Service) helpt bij het prioriteren van internetverkeer op basis van de behoeften. U kunt een prioriteit level voor een apparaat, een fysieke poort of een applicatie specificeren in de QoS regel lijst."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Opmerking",
                           content: "Als NAT-boost is ingeschakeld, dient QoS uitgeschakeld te zijn."
                       } ,{                      
                           type: "name",
                           title: "Upload bandbreedte",
                           content: "Voer de maximum upload bandbreedte in voorzien door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Download bandbreedte",
                           content: "Voer de maximum download bandbreedte in voorzien door de ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Geavanceerd",
               CONTENT: [{
                           type: "name",
                           title: "Hoog/Middel/Laag prioriteit",
                           content: "Specificeer een percentage voor hoog/middel/laag prioriteit verkeer.",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "De maximum hoeveelheid (percentage) van alle prioriteiten is 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Lijst van QoS regels",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hier kunt u gedetailleerde QoS regels toevoegen om het internet verkeer te prioriteren."
                       } ,{                      
                           type: "step",
                           title: "een QoS regel instellen",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Selecteer een prioriteits type om de QoS regel toe te voegen.",
                "Per apparaat- Klik Scannen om het gewenste apparaat te selecteren of voer handmatig de naam van het apparaat en het MAC adres in.",
                "Per applicatie - Selecteer de gewenste applicatie of pas een applicatie aan door de naam, het protocol en de bestemmingspoort (1-65535) te configureren. U kunt een enkele poort of meerdere poorten of een reeks poorten invoeren, gescheiden door komma's (bijv. 21,36-105,111).",
                "Per fysieke poort - selecteer uw gewenste poort.",
                "3. Klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "U kunt een regel tussen verschillende prioriteit lijsten slepen om de prioriteit te wijzigen."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Database upgrade",
               CONTENT: [{
                           type: "paragraph",
                           content: "We zullen de laatste database versie vrijgeven op www.tp-link.com. U kunt de router's database downloaden en updaten om zijn ondersteunde applicaties uit te breiden."
                       } ,{                      
                           type: "name",
                           title: "Nieuw database bestand",
                           content: "Klik op bladeren om het laatste database bestand te lokaliseren. Selecteer deze en klik op Upgrade om de database te upgraden naar de laatste versie."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "SPI firewall",
                           content: "SPI (Stateful Packet Inspection) Firewall voorkomt cyberaanvallen en valideert het verkeer dat door de router passeert op basis van het protocol. Standaard is deze functie ingeschakeld."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS bescherming",
               CONTENT: [{
                           type: "name",
                           title: "DoS bescherming",
                           content: "DoS (Denial of Service) Protectie beschermt de LAN tegen DoS aanvallen die het netwerk overbelasten met server verzoeken. U kunt de volgende 3 soorten aanvallen filteren ob basis van behoeften. Er zijn 4 niveaus voor elke filtering:",
       children: [{                      
                           type: "name",
                           title: "Uit",
                           content: "Geen bescherming."
                       } ,{                      
                           type: "name",
                           title: "Laag",
                           content: "Laag niveau van bescherming en weinig effect op de prestaties van de router."
                       } ,{                      
                           type: "name",
                           title: "Middel",
                           content: "Middelmatig niveau van bescherming en enigszins merkbaar effect op de prestaties van de router."
                       } ,{                      
                           type: "name",
                           title: "Hoog",
                           content: "Hoog niveau van bescherming en merkbaar effect op de prestaties van de router."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Attack Filtering",
                           content: "Schakel in om de ICMP (Internet Control Message Protocol) overbelasting aanval te voorkomen."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Attack Filtering",
                           content: "Schakel in om UDP (User Datagram Protocol) overbelasting aanval te voorkomen."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD Attack Filtering",
                           content: "Schakel in om TCP-SYN (Transmission Control Protocol Synchronize) overbelasting aanval te voorkomen."
                       } ,{                      
                           type: "name",
                           title: "Ping pakketten van WAN poort negeren",
                           content: "Inschakelen om ping packets van de WAN-poort te negeren"
                       } ,{                      
                           type: "name",
                           title: "Ping pakketten van LAN poort verbieden",
                           content: "Inschakelen om ping packets van de LAN-poort te verbieden."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Lijst van geblokkeerde DoS hosts",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft het IP adres en MAC adres weer van de geblokkeerde DoS host(s)."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Toegangscontrole",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toegang controle wordt gebruikt om specifieke cliënt apparaten toegang tot het netwerk toe te staan of te blokkeren. Wanneer een apparaat geblokkeerd is, is het niet mogeljik om te communiceren met andere apparaten of te verbinden met het internet."
                       } ,{                      
                           type: "step",
                           title: "Toegang controleren",
       content: [ 
                "1. Schakel in om toegang controle in te schakelen.",
                "2. Als u ook de toegang van de apparaten die verbonden zijn met het gastnetwerk wilt controleren, schakel guest device control in.",
                "3. Selecteer een toegang modus volgens de behoeften en klik op opslaan:",
                "A. Als u van de apparaten in onderstaande lijst de toegang wilt blokkeren, selecteer zwarte lijst.",
                "B. Als u van de apparaten in onderstaande lijst de toegang wilt toestaan, selecteer witte lijst.",
                "4. Apparaten in zwarte lijst/witte lijst gedeelte, klik op toevoegen. Voer de naam van het apparaat en het MAC adres in en klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u deze invoer wilt uitschakelen, klik op het lamp icoon."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Online apparaten",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft informatie weer over alle verbonden apparaten (inclusief apparaten verbonden met het gastnetwerk wanneer guest devices control is ingeschakeld)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC Binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC binding (ookwel bekend als ARP binding) is nuttig om de toegang van een specifiek apparaat in het LAN te besturen door het IP adres en het MAC adres van het apparaat aan elkaar te binden. IP & MAC binding voorkomt ook dat andere apparaten een specifiek IP adres gebruiken."
                       } ,{                      
                           type: "step",
                           title: "Apparaat instellen met IP & MAC binding",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Voer het MAC-adres van het apparaat in.",
                "3. Voer een IP adres in dat u wilt binden aan bovenstaand MAC adres.",
                "4. Selecteer Inschakelen.",
                "5. Klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
       content: [ 
                "1. U kunt een IP-adres niet aan meer dan één MAC-adres binden.",
                "2. Als u deze invoer wilt uitschakelen, klik op het lamp icoon."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP lijst",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft het MAC adres en IP adres van de huidige verbonden apparaten weer."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol versie 6) is de meeste recente versie van IP (Internet Protocol) en behandelt het probleem van IPv4 (Internet Protocol versie 4) dat de adressen op raken."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: Dynamisch IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamisch IP",
                           content: "Selecteer dit type als de ISP dynamisch IPv6 adres toewijzen gebruikt."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adres/Primaire DNS/Secundaire DNS",
                           content: "Deze parameters zullen automatisch toegewezen worden door de DHCPv6 server van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Vernieuwen",
                           content: "Klik om nieuwe IPv6 parameters te verkrijgen van de DHCPv6 server van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Vrijgeven",
                           content: "Klik om alle IPv6 adressen toegewezen door de DHCPv6 server van de ISP vrij te geven."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adres verkrijgen",
                           content: "Selecteer DHCPv6 om een niet-tijdelijk IPv6 adres te krijgen of SLAAC om een IPv6 adres te genereren van de router's advertentie pakket, volgens de ISP."
                       } ,{                      
                           type: "name",
                           title: "Voorvoegsel delegatie",
                           content: "Selecteer Inschakelen om een voorvoegsel delegatie via DHCPv6 Server van de ISP te verkrijgen, of Uitschakelen om handmatig een adresvoorvoegsel op te geven. Clients in het LAN zullen m.b.v. dit voorvoegsel een IPv6 adres genereren."
                       } ,{                      
                           type: "name",
                           title: "DNS-adres",
                           content: "Selecteer dynamisch verkrijgen van ISP of gebruik de volgende DNS adressen. Indien gebruik de volgende DNS adressen is geselecteerd, gelieve handmatig het DNS adres verkregen van de ISP invoeren."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: Statisch IP"
                       } ,{                      
                           type: "name",
                           title: "Statisch IP",
                           content: "Selecteer dit type als de ISP Statisch IPv6 adres toewijzen gebruikt."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adres/Standaard gateway/Primaire DNS/Secundaire DNS",
                           content: "Voer deze parameters in zoals aangeleverd door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU grootte",
                           content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 bytes. Het wordt afgeraden de standaard MTU grootte te wijzigen, tenzij vereist door de ISP."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: 6to4 Tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4 Tunnel",
                           content: "Selecteer dit type als de ISP 6naar4 deployment gebruikt voor het toewijzen van adressen."
                       } ,{                      
                           type: "name",
                           title: "IPv4 adres/IPv4 subnetmasker/IPv4 standaard gateway/Tunnel adres",
                           content: "Deze parameters worden dynamisch gegenereerd door de IPv4 informatie van de WAN poort nadat u op Verbinden hebt geklikt."
                       } ,{                      
                           type: "name",
                           title: "Gebruik de volgende DNS server",
                           content: "Selecteer om handmatig de primaire DNS en/of secundaire DNS in te voeren verkregen van de ISP."
                       } ,{                      
                           type: "name",
                           title: "Verbinden",
                           content: "Klik om te verbinden met het internet."
                       } ,{                      
                           type: "name",
                           title: "Verbreken",
                           content: "Klik om de verbinding met het internet te verbreken."
                       } ,{                      
                           type: "title",
                            title: "Type Internetverbinding: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Selecteer dit type als de ISP PPPoEv6 gebruikt en een gebruikersnaam en wachtwoord verstrekt."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam/Wachtwoord",
                           content: "Voer deze parameters in zoals aangeleverd door uw ISP."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adres",
                           content: "Dit adres zal automatisch toegezen worden door de DHCPv6 server van de ISP, nadat u de gebruikersnaam en het wachtwoord ingevoerd heeft, klikt u op verbinden."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adres verkrijgen",
                           content: "Selecteer DHCPv6 om een niet-tijdelijk IPv6 adres te krijgen of SLAAC om een IPv6 adres te genereren van de router's advertentie pakket, of gespecificeerd door ISP om handmatig het IPv6 adres in te voeren volgens de ISP."
                       } ,{                      
                           type: "name",
                           title: "Voorvoegsel delegatie",
                           content: "Selecteer Inschakelen om een voorvoegsel delegatie via DHCPv6 Server van de ISP te verkrijgen, of Uitschakelen om handmatig een adresvoorvoegsel op te geven. Clients in het LAN zullen m.b.v. dit voorvoegsel een IPv6 adres genereren."
                       } ,{                      
                           type: "name",
                           title: "DNS-adres",
                           content: "Selecteer om dynamisch van ISP te verkrijgen of gebruik de volgende DNS adressen. Indien gebruik de volgende DNS adressen is geselecteerd, gelieve de DNS adressen voorzien door de ISP handmatig invoeren."
                       } ,{                      
                           type: "name",
                           title: "Verbinden",
                           content: "Klik om te verbinden met het internet."
                       } ,{                      
                           type: "name",
                           title: "Verbreken",
                           content: "Klik om de verbinding met het internet te verbreken."
                       } ,{                      
                           type: "title",
                            title: "Internet verbinding type: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer dit type als de ISP Pass-through (bridge) netwerk deployment gebruikt. Er is voor dit type verbinding geen configuratie nodig."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met uitzondering van de internet verbinding type Pass-through (bridge), vereisten de andere types internet verbindingen wel de IPv6 configuratie. "
                       } ,{                      
                           type: "name",
                           title: "Toegewezen type",
                           content: "Selecteer de geschikte volgende de ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Om automatisch IP-adressen aan de clients in het LAN toe te wijzen.",
       children: [{                      
                           type: "name",
                           title: "Adres voorvoegsel",
                           content: "Voer het prefix adres in bepaald door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Release time",
                           content: "Het is de geldig tijd van het toegewezen IP adres. Behoudt de standaard 86400 seconden of wijzig indien vereist door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Het is het IP adres automatisch toegewezen door de DHCPv6 server van de ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Adres voorvoegsel",
                           content: "Voer het prefix adres in bepaald door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Het IP-adres, automatisch toegewezen door de ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Adres voorvoegsel",
                           content: "Voer het prefix adres in bepaald door de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Het IP-adres, automatisch toegewezen door de ISP."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC kloon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecteer de juiste MAC clone methode die u wenst."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres niet clonen",
                           content: "Het standaard MAC-adres van de router NIET wijzigen, voor het geval de ISP het toegewezen IP-adres niet aan het MAC-adres bindt."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres van huidige computer klonen",
                           content: "Selecteer deze optie om het huidige MAC-adres van de computer die met de router verbonden is te kopiëren, voor het geval dat de ISP het toegewezen IP-adres aan het MAC-adres van de computer bindt."
                       } ,{                      
                           type: "name",
                           title: "Aangepast MAC-adres gebruiken",
                           content: "Voer het MAC-adres handmatig in, voor het geval dat de ISP het toegewezen IP-adres aan het opgegeven MAC-adres bindt."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Tijd instellingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tijd instellingen staat u toe om de systeem tijd te configureren voor de router. Eenmaal aangepast, zal de systeemtijd toegepast worden op tijd gebasseerde functies en configuraties zoals ouderlijk toezicht."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "U kunt de 24-uur tijd functie inschakelen voor de configuratie, welke toegepast zal worden aan systeem-tijd-gebasseerde functies en configuraties."
                       } ,{                      
                           type: "title",
                            title: "Systeemtijd"
                       } ,{                      
                           type: "step",
                           title: "Tijd verkrijgen van het internet",
       content: [ 
                "Standaard geselecteerd, Verkrijg van het internet staat u toe om de systeem tijd van het internet te verkrijgen.",
                "1. Selecteer verkrijg van het internet.",
                "2. Selecteer de lokale tijd zone van het drop-down menu.",
                "3. In het NTP server I veld, voer het IP adres of domeinnaam in van de gewenste NTP server.",
                "4. In het veld NTP server II voert u het IP-adres of de domeinnaam van de gewenste tweede NTP server in. (Optioneel)",
                "5. Klik op Verkrijgen.",
                "6. Klik op opslaan."]
} ,{                      
                           type: "step",
                           title: "Tijd verkrijgen van PC",
       content: [ 
                "Deze functie staat u toe om de systeem tijd te verkrijgen van de PC. Bevestig de PC tijd voor de configuratie.",
                "Selecteer verkrijg van PC en klik op opslaan."]
} ,{                      
                           type: "step",
                           title: "Handmatig de tijd instellen",
       content: [ 
                "Als het apparaat niet automatisch de tijd kan verkrijgen van het internet of de PC, dan kunt u de systeem tijd handmatig configureren.",
                "1. Handmatig selecteren.",
                "2. Voer de huidige datum en tijd in.",
                "3. Klik op opslaan."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Zomertijd",
                           content: "Deze functie kan de systeemtijd automatisch laten synchroniseren met de zomertijd."
                       } ,{                      
                           type: "step",
                           title: "Zomertijd instellen",
       content: [ 
                "1. Selecteer Zomertijd inschakelen.",
                "2. Specificeer een tijd periode van de zomertijd in de lokale tijd zone.",
                "3. Klik op opslaan."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnose",
               CONTENT: [{
                           type: "paragraph",
                           content: "De router biedt Ping en Traceroute gereedschap die u helpen bij het oplossen van netwerk problemen."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "De Ping tool stuurt pakketten naar een doel IP adres of domein naam en left de resultaten vast, zoals het aantal verstuurde en ontvangen pakketen en de round-trip tijd."
                       } ,{                      
                           type: "paragraph",
                           content: "De Traceroute tool stuurt pakketten naar een doel IP adres of domen naam en geeft het aantal hops en tijd weer om de bestemming te bereiken."
                       } ,{                      
                           type: "paragraph",
                           content: "U kunt een lokaal apparaat pingen of de route traceren via het IP adres of een domeinnaam, zoals tp-link.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "Diagnose m.b.v. Ping",
       content: [ 
                "1. Selecteer Ping als de diagnostic tool.",
                "2. Voer het doel IP adres of domeinnaam in.",
                "3. Klik op het pijl icoon om het geavanceerde menu te openen en specificeer de Ping count en de ping pakket grootte. (Optioneel).",
                "4. Klik op start."]
} ,{                      
                           type: "step",
                           title: "Diagnose m.b.v. Traceroute",
       content: [ 
                "1. Selecteer Traceroute als de diagnostic tool.",
                "2. Voer het doel IP adres of domeinnaam in.",
                "3. Klik op het pijl icoon om het geavanceerde menu te openen en specificeer het aantal hops (om te bereiken) in de Traceroute Max TTL (Time to Live) veld. De standaard is 20. (Optioneel).",
                "4. Klik op start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Poort weerspiegelen"
                       } ,{                      
                           type: "paragraph",
                           content: "Poort spiegeling verwijst naar het process van het doorsturen van kopieën van pakketten vanuit een gespiegelde poort naar een spiegelende poort. Normaal gesproken is de spiegelende poort verbonden met een data diagnose apparaat, die gebruikt wordt om de gespiegelde pakketten te analyseren voor monitoring en probleemoplossen van het netwerk "
                       } ,{                      
                           type: "step",
                           title: "Kopieën van pakketten doorsturen naar de aangewezen poort.",
       content: [ 
                "1. Poort spiegeling inschakelen.",
                "2. Selecteer de gewenste poort als de gespiegelde poort.",
                "3. Selecteer een gewenste poort als de spiegelende poort.",
                "4. Klik op Opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Een poort kan niet tegelijkertijd ingesteld worden als de gespiegelde poort en de spiegelende poort."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Firmware upgrade",
               CONTENT: [{
                           type: "paragraph",
                           content: "De firmware upgrade update de router zijn firmware met nieuwe functies of bux fixes. Het is aanbevolen om de router te upgraden met het laatste firmware bestand om de beste prestaties te leveren."
                       } ,{                      
                           type: "step",
                           title: "Het opmerken van het volgende zal u helpen om upgrade falen te voorkomen.",
       content: [ 
                "Voor het upgraden",
                "1. Wees er zeker van dat u een stabiele verbinding heeft tussen de router en de computer. Het is NIET aanbevolen om de firmware upgrade draadloos uit te voeren.",
                "2. Wees er zeker van dat u alle USB apparaten aangesloten op de router heeft verwijderd.",
                "3. Herrinner uzelf om een back up te maken van de router's configuratie bestand.",
                "Tijdens het upgraden",
                "Houdt de router INGESCHAKELD totdat de upgrade voltooid is."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"De firmware online upgraden",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Klik op Upgrade en bevestig indien gevraagd. De router zal automatisch downlaoden en upgraden naar de nieuwste firmware. U kunt ook klikken op Controleren op Updates om te controleren op de laatste firmware versie."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"De firmware handmatig upgraden",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Klik op Support aan de onderkant van de pagina en download de laatste firmware naar de computer. Wees er zeker van dat het bestand dat u gaat downloaden overeenkomt met de router zijn hardware versie zoals weergegeven op de pagina.",
                "2. Klik op bladeren en selecteer het gedownloade firmware bestand.",
                "3. Klik op upgrade"]
} ,{                      
                           type: "paragraph",
       content: [ 
                "De firmware upgrade duurt een paar minuten om te voltooien. De router zal automatisch herstarten wanneer de firmware upgrade voltooid is."]
}]
},
       BACKUP :{ 
               TITLE:"Backup en terugzetten",
               CONTENT: [{
                           type: "paragraph",
                           content: "De backup & herstel functie staat u toe om een backup te maken van de router zijn huidige configuratie voor herstel, of simpelweg om de router te herstellen naar de fabrieksinstellingen."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Gelieve de router NIET uitschakelen tijdens de backup of herstel procedure."
                       } ,{                      
                           type: "title",
                           title: "Backup",
                           content: "Het wordt sterk aanbevolen om een backup te maken van de huidige configuratie, voor het geval een herstel nodig is om de router te herstellen naar de vorige status."
                       } ,{                      
                           type: "step",
                           title: "Om een backup te maken van de huidige configuratie.",
       content: [ 
                "1. Klik op Backup",
                "2. Wacht tot de router een backup heeft gemaakt van de huidige configuratie."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Terugzetten",
                           content: "U kunt de router herstellen naar een vorige status vanuit een backup bestand."
                       } ,{                      
                           type: "step",
                           title: "Een backup terugzetten",
       content: [ 
                "1. Klik op Bladeren.",
                "2. Zoek en selecteer het backup bestand.",
                "3. Klik op Terugzetten."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Fabrieksinstellingen herstellen",
       content: [ 
                "De router herstellen naar zijn fabrieksinstellingen zal alle configuraties en instellingen verwijderen en deze terugzetten naar de fabrieksinstellingen. Als voorbeeld, alle draadloze, ouderlijk toezicht en netwerk informatie zal gewist worden.",
                "Na een fabrieksreset moet u een nieuw wachtwoord instellen om toegang te krijgen tot de web beheerpagina van de router."]
}]
},
       REBOOT :{ 
               TITLE:"Herstart schema",
               CONTENT: [{
                           type: "paragraph",
                           content: "Het hertart schema maakt de cache leeg om uw router prestaties te verbeteren."
                       } ,{                      
                           type: "step",
                           title: "Handmatig herstarten",
       content: [ 
                "Klik Herstarten en wacht een paar minuten om de router opnieuw op te laten starten."]
} ,{                      
                           type: "step",
                           title: "Om uw herstart tijd te plannen.",
       content: [ 
                "1. Schakel herstart schema in",
                "2. Stel in hoeveel en hoevaak uw router moet herstarten door de nodige parameters te specificeren in de herstart tijd en de herhaal velden.",
                "3. Klik op opslaan."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Beheer",
               CONTENT: [{
                           type: "paragraph",
                           content: "De administratiefunctie geeft u toegang tot het login wachtwoord en de toegangs permissies van de verbonden clients van de router."
                       } ,{                      
                           type: "name",
                           title: "Accountbeheer",
                           content: "Deze functie staat u toe om het wachtwoord te wijzigen.",
       children: [{                      
                           type: "step",
                           title: "Het wachtwoord wijzigen.",
       content: [ 
                "1. Voer oud wachtwoord in.",
                "2. Voer nieuw wachtwoord in.",
                "3. Bevestig nieuw wachtwoord.",
                "4. Klik op Opslaan."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Wachtwoord opvragen",
               CONTENT: [{
                           type: "name",
                           title: "Standaard wachtwoord herstel",
                           content: "Het standaard wachtwoord herstel geeft u de mogelijkheid tot het herstellen van het standaard login wachtwoord, zonder de router terug te zetten in de fabrieksinstelling.",
       children: [{                      
                           type: "step",
                           title: "Het wachtwoord wijzigen.",
       content: [ 
                "1. Schakel de standaard wachtwoord herstel functie in.",
                "2. In het \"van\" veld, voer een geldig email adres in dat gebruikt wordt voor het versturen van de verificatie code om login informatie te herstellen.",
                "3. In het \"naar\" veld, voer een geldig email adres in voor het ontvangen van de verificatie code.",
                "4. Voer de SMTP server in van de uitgaande mail (Van)",
                "5. Als de email in het \"van\" veld encryptie vereist dan dient u de authenticatie checkbox in te schakelen en zijn gebruikersnaam (email adres) en wachtwoord in te voeren.",
                "6. Klik op opslaan."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Lokaal beheer",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met deze functie krijgen lokale apparaten toegang tot de router en kunnen ze deze beheren."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Lokaal beheer via HTTPS",
                           content: "Schakel Lokaal beheer in via HTTPS als u toegang tot de router wilt via HTTPS en HTTP of schakel deze optie uit als u alleen toegang wilt tot de router via HTTP."
                       } ,{                      
                           type: "name",
                           title: "Toegang voor alle met LAN verbonden apparaten",
                           content: "Zet deze optie Aan om lokaal beheer voor alle met het LAN verbonden apparaten in te schakelen, of Uit om het beheer alleen voor een specifiek apparaat mogelijk te maken."
                       } ,{                      
                           type: "name",
                           title: "MAC-adres",
                           content: "Toont het MAC-adres van het specifieke apparaat dat toegang heeft."
                       } ,{                      
                           type: "name",
                           title: "Beschrijving",
                           content: "Een beschrijving van het specifieke apparaat dat toegang heeft."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Toont de huidige status van specifieke apparaat dat toegang heeft (in- of uitgeschakeld)."
                       } ,{                      
                           type: "name",
                           title: "Wijzigen",
                           content: "Toont opties voor het Wijzigen of Verwijderen van het desbetreffende apparaat uit de lijst."
                       } ,{                      
                           type: "step",
                           title: "Een client apparaat aan de lijst toevoegen",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Klik op Aanwezige apparaten bekijken om een bestaand apparaat te kiezen, of voer het MAC-adres van een apparaat in het veld MAC-adres in.",
                "3. Voer een Beschrijving voor het apparaat in.",
                "4. Selecteer Inschakelen.",
                "5. Klik op OK."]
} ,{                      
                           type: "step",
                           title: "Een apparaat in de lijst wijzigen of eruit verwijderen",
                           content: "In de tabel klikt u op het Wijzigen of Verwijderen symbool bij het apparaat dat u wilt wijzigen of verwijderen."
                       } ,{                      
                           type: "step",
                           title: "Meerdere items verwijderen",
                           content: "Selecteer alle apparaten die u wilt verwijderen en klik op Verwijderen."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Beheer op afstand",
               CONTENT: [{
                           type: "name",
                           title: "Beheer op afstand",
                           content: "De remote beheer functie geeft remote apparaten toestemming om de router te benaderen en te beheren.",
       children: [{                      
                           type: "step",
                           title: "Alle remote apparaten verbieden de router te beheren.",
                           content: "Selecteer Remote beheer uitschakelen en klik op Opslaan."
                       } ,{                      
                           type: "step",
                           title: "Alle remote apparaten toestaan de router te beheren.",
       content: [ 
                "1. Selecteer beheer op afstand voor ALLE apparaten inschakelen.",
                "2. Voer de Web beheer poort in (1024-65535 of 80) door welke de remote apparaten de router zullen benaderen.",
                "3. Klik op opslaan."]
} ,{                      
                           type: "step",
                           title: "Een specifiek remote apparaat toestaan de router te beheren.",
       content: [ 
                "1. Selecteer beheer op afstand voor een specifiek apparaat.",
                "2. Voer de Web beheer poort in (1024-65535 of 80) door welke de remote apparaten de router zullen benaderen.",
                "3. Voer het beheer op afstand IP adres in van het remote apparaat om de router te beheren.",
                "4. Klik op Opslaan."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Beheer op afstand",
               CONTENT: [{
                           type: "paragraph",
                           content: "De functie Beheer op afstand biedt de mogelijkheid de router op afstand via het Internet te benaderen en configureren."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Beheer op afstand instellen"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Selecteer het selectievakje om Beheer op afstand in te schakelen."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Stel de HTTPS-poort en HTTP-poort als standaard in."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Selecteer welk extern apparaat toegang krijgt tot de router:",
       children: [{                      
                           type: "name",
                           title: "Alle apparaten",
                           content: "Alle externe apparaten hebben toegang tot de router."
                       } ,{                      
                           type: "name",
                           title: "Geselecteerd apparaat",
                           content: "Voer het IP-adres van het externe apparaat in om deze toegang te geven tot de router."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Klik op Opslaan."
                       } ,{                      
                           type: "paragraph",
                           content: "Nu kunt u op afstand de router beheren via het adres dat getoond wordt onder Webadres voor beheer."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als er een waarschuwing verschijnt als u het bovenstaande adres op afstand bezoekt, klik dan op Vertrouwen (of een vergelijkbare optie) om verder te gaan."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wanneer nachtmodus is ingeschakeld, zullen de LEDs gedurende de gespecificeerde periode elke dag uit zijn zonder dat dit effect heeft op de prestaties van de router."
                       } ,{                      
                           type: "step",
                           title: "Nachtmodus inschakelen",
       content: [ 
                "1. Selecteer Nachtmodus inschakelen.",
                "2. Specificeer een tijdsperiode wanneer de LEDs uit zullen zijn.",
                "3. Klik op opslaan."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Systeemlog",
               CONTENT: [{
                           type: "paragraph",
                           content: "De systeem log toont de meest recente activiteiten van de router. De tabel bestaat uit het type, level en log inhoud van de systeem log welke gefilterd kunnen worden om te worden bekeken. U kunt het systeem log ook opslaan naar de lokale computer of deze als een email versturen."
                       } ,{                      
                           type: "step",
                           title: "Systeemlogs opslaan naar de lokale computer",
       content: [ 
                "1. Stel het type en het mimimum niveau in om de gewenste systeemlogs te filteren. De niveau lijst is in aflopende volgorde, met het laatste niveau als laatst genoemd.",
                "2. Klik log opslaan om het systeem log bestand op te slaan naar de lokale computer."]
} ,{                      
                           type: "step",
                           title: "Systeemlogs ontvangen via email",
       content: [ 
                "1. Stel het type en het niveau in om de gewenste systeemlogs te filteren. De niveau lijst is in aflopende volgorde, met het laatste niveau als laatst genoemd.",
                "2. Klik op email instellingen.",
                "3. Om het Van veld, voer een geldig email adres in dat gebruikt wordt als de uitgaande email.",
                "4. In het Naar veld, voer een geldig email adres in dat gebruikt wordt als de inkomende email.",
                "5. Voer het SMTP server adres in van de uitgaande email (Van).",
                "Opmerking: Als de uitgaande email authenticatie vereist, selecteer dan de checkbox Authenticatie checkbox inschakelen en voer de gebruikersnaam (email adres) en wachtwoord in.",
                "6. Als u systeemlogs regelmatig via email wilt ontvangen, selecteer de checkbox Auto mail inschakelen en stel een specifieke tijd in (in 24-uur klok formaat) of een tijd interval.",
                "Als u onmiddelijk de huidige systeemlogs wilt ontvangen, klik op mail log now.",
                "7. Klik op Opslaan."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Verkeer Monitor",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft verkeer gebruik van een apparaat weer in de afgelopen 10 minuten of dat van alle apparaten in de afgelopen 10 minuten/24 uur/7 dagen."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Verkeer monitor lijst",
               CONTENT: [{
                           type: "paragraph",
                           content: "De lijst is gegroepeerd door de verbindingstype van apparaten: bedraad of draadloos"
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Systeem parameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Draadloos 2,4 GHz/5 GHz",
                           content: "In dit gedeelte kunt u de parameters van de verkeer transmissie regels te configureren in draadloze netwerken. Het is aanbevolen om de standaard waardes te behouden als u niet zeker bent van de juiste waardes in dit geval."
                       } ,{                      
                           type: "name",
                           title: "Beacon Interval",
                           content: "Voer een waarde tussen 40 en 1000 milliseconden in, om de duur te bepalen tussen baken pakketten die door de router worden uitgezonden om het draadloze netwerk te synchroniseren. De standaard waarde is 100 milliseconden."
                       } ,{                      
                           type: "name",
                           title: "RTS Threshold",
                           content: "Voer een waarde tussen 1 en 2346 in, om de pakket grootte voor datatransmissie via de router in te stellen. Standaard is de grootte van de RTS (Request to Send) Threshold 2346. Als de pakket grootte groter dan de vooraf ingestelde drempelwaarde is, verzendt de router Request to Send frames naar een bepaald ontvangstation en onderhandelt over het verzenden van een data frame, of anders wordt het pakket direct verzonden."
                       } ,{                      
                           type: "name",
                           title: "DTIM Interval",
                           content: "Deze waarde bepaald de interne van DTIM (Delivery Traffic Indication Message). Voer een waarde tussen 1 en 15 intern in. De standaard interval is 1, wat aangeeft dat de DTIM interval gelijk is aan de Beacon Interval."
                       } ,{                      
                           type: "name",
                           title: "Groepssleutel update periode",
                           content: "Voer het aantal seconden in (minimaal 30) om de tijdinterval te bepalen voor het automatisch vernieuwen van de versleutelingscode. De standaardwaarde is 0, wat geen vernieuwing betekent."
                       } ,{                      
                           type: "name",
                           title: "WMM functie",
                           content: "De WMM functie garandeert dat pakketten met hoge prioriteit berichten met voorrang worden verzonden. Deze functie is standaard ingeschakeld, wat ten zeerste aanbevolen wordt."
                       } ,{                      
                           type: "name",
                           title: "Short GI functie",
                           content: "Deze functie is standaard ingeschakeld en aanbevolen om de pakket capaciteit door de GI (Guard Interval) tijd te verhogen."
                       } ,{                      
                           type: "name",
                           title: "AP Isolation functie",
                           content: "Als u alle draadloze apparaten die zijn aangesloten op het netwerk van interactie met elkaar wilt beperken, maar nog wel toegang hebben tot het interent, selecteer dan de checkbox AP isolatie inschakelen."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2,4 GHz/5 GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "WDS inschakelen",
                           content: "WDS(Wireless Distribution System) Bridging functie staat u toe om het draadloze netwerk dekking uit te breiden door een brug te maken met een AP (access point) in een draadloze WLAN (lokaal netwerk)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Selecteer om de WDS Brug functie in te schakelen.",
                "2. Om een netwerk via de Scan optie te bridgen: Klik op Scan om te scannen naar beschikbare netwerken en deze weer te geven en selecteer het netwerk waarmee u de gebrugde verbinding wilt maken. Het SSID (netwerknaam), MAC adres en beveiliging zullen automatisch ingevuld worden.",
                "Om een netwerk handmatig te bridgen: voer het SSID (netwerknaam), MAC adres en WDS modus van het netwerk in dat gebridged dient te worden. Selecteer een beveiligingstype en voer de gerelateerde parameters in, welke hetzelfde dienen te zijn als het netwerk waarmee u een gebrugde verbinding mee wilt maken.",
                "3. Klik op opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Indien u niet zeker bent van WDS modus behoudt de standaard optie of Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) staat u toe om makkelijk WPS-ingeschakelde apparaten met de router te verbinden door de WPS knop in te drukken. Controleer om de WPS functie in te schakelen en klik op opslaan."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Deze functie is standaard ingeschakeld. Het is aanbevolen om de standaard waardes te behouden. Als u deze uitschakeld kan het zijn dat u geen toegang tot het internet heeft."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als NAT uitgeschakeld is, hebben configuraties in NAT Forwarding geen effect."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Selecteer de checkbox Nat Boost inschakelen en klik op opslaan om er zeker van de zijn dat de router de beste doorvoer heeft."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Opmerking",
                           content: "Als NAT Boost wordt ingeschakeld, worden QoS en Verkeersstatistieken automatisch uitgeschakeld."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS Protectie instellingen",
                           content: "De DOS protectie beschermt de router voor ICMP-FLOOD, UDP-FLOOD en TCP-FLOOD aanvallen."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD pakketten niveau",
                           content: "Voer een waarde in tussen 5 en 7200 om de ICMP-FLOOD protectie onmiddelijk in te laten gaan wanneer het aantal ICMP pakketten de huidige drempelwaarde overschrijdt."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD pakketten niveau",
                           content: "Voer een waarde in tussen 5 en 7200 UDP pakketten om de UDP-FLOOD protectie onmiddelijk in te laten gaan wanneer het aantal UDP pakketten de huidige drempelwaarde overschrijdt."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD pakketten niveau",
                           content: "Voer een waarde in tussen 5 en 7200 TCP-SYN pakketten om de TCP-SYN-FLOOD protectie onmiddelijk in te laten gaan wanneer het aantal TCP pakketten de huidige drempelwaarde overschrijdt."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Selecteer de duplex type van de keuze lijst en klik op opslaan."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Nachtmodus inschakelen",
                           content: "Selecteer dit keuzevakje om de leds in Nachtmodus uit te schakelen zonder de prestaties van de router te beïnvloeden."
                       } ,{                      
                           type: "name",
                           title: "Nachtmodus periode",
                           content: "Geef een tijdsperiode op waarin de nachtmodus actief moet zijn."
                       } ,{                      
                           type: "paragraph",
                           content: "Klik op Opslaan om alle instellingen op te slaan."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met OpenVPN kunt u het internet gebruiken om veilig uw netwerk te benaderen wanneer u buitenshuis bent. Om de VPN service te gebruiken dient u eerst de dynamische DNS service (aanbevolen) te configureren of een statisch IP adres aan de router's WAN poort toe te wijzen. De systeemtijd dient gesynchroniseerd te zijn met het Internet."
                       } ,{                      
                           type: "name",
                           title: "Type service",
                           content: "Selecteer het communicatieprotocol voor de OpenVPN-server: UDP of TCP."
                       } ,{                      
                           type: "name",
                           title: "Servicepoort",
                           content: "Voer een communicatie poort nummer in tussen 1024 en 65535. De standaard en meest gebruikte poort is 1194."
                       } ,{                      
                           type: "name",
                           title: "VNP-subnet/-netmasker",
                           content: "Voer het IP-adresbereik in dat aan clients kan worden uitgegeven door de OpenVPN-server."
                       } ,{                      
                           type: "name",
                           title: "Clienttoegang",
                           content: "Selecteer de toegangs type voor de OpenVPN cliënt.",
       children: [{                      
                           type: "name",
                           title: "Alleen lokaal netwerk",
                           content: "Cliënt heeft alleen toegang tot het thuisnetwerk. De cliënt standaard route zal niet gewijzigd worden."
                       } ,{                      
                           type: "name",
                           title: "Internet en lokaal netwerk",
                           content: "Cliënt kan het thuisnetwerk en internet sites of diensten met een geografische beperking benaderen wanneer u in het buitenland bent. De cliënt zijn standaard route zal gewijzigd worden."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certificaat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Gebruik het certificaat voor informatie en identificatie van de VPN-verbinding op de externe computer.",
                "Klik om een nieuw certificaat te genereren."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Configuratiebestand",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Remote cliënten zullen de configuratie bestanden gebruiken om toegang te krijgen tot de router.",
                "Klik op deze knop om het OpenVPN-configuratiebestand op te slaan, dat kan worden gebruikt om een nieuwe VPN-verbinding toe te voegen."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Installatiehandleiding VPN-client",
               CONTENT: [{
                           type: "step",
                           title: "Cliënt apparaten verbinden met de OpenVPN server:",
       content: [{                      
                           type: "paragraph",
                           content: "Voordat u de OpenVPN server configureert, gelieve eerst dynamisch DNS service (aanbevolen) configureren of een statisch IP adres aan de WAN poort toewijzen. Wees er zeker van dat de externe poort van de NAT instellingen niet ingesteld staat op 1723 en dat de systeemtijd is gesynchroniseerd met het internet."
                       },
                "1. Selecteer VPN server inschakelen.",
                "2. Configureer de OpenVPN server parameters (Service Type, Service poort, cliënt toegang en VPN subnet/netmasker) en klik op opslaan.",
                "3. Klik op exporteren om het configuratie bestand op te slaan.",
                "4. Op de cliënt apparaten, download en installeer het OpenVPN cliënt programma vanaf <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "De officiële ondersteunde plarformen includeren Windows, Mac OSX en Linux.",
                "5. Start de OpenVPN cliënt hulpprogramma en voeg een nieuw VPN verbinding toe door gebruik te maken van het opgeslagen configuratie bestand om het cliënt apparaat te verbinden met de VPN server."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Ga voor meer informatie over OpenVPN-clients naar <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met PPTP VPN kunt u het internet gebruiken om makkelijk en snel toegang tot het netwerk te krijgen wanneer u niet thuis bent. Het kan door sommige ISP's verhindert worden. Om de VPN service te gebruiken, dient u de dynamische DNS service (aanbevolen) te configureren of een statisch IP adres aan de router's WAN poort toe te wijzen. De systeemtijd dient gesynchroniseerd te zijn met het internet."
                       } ,{                      
                           type: "name",
                           title: "IP-adres client",
                           content: "Voer het IP-adresbereik (tot 10 clients) in dat aan clients kan worden uitgegeven door de PPTP-VPN-server."
                       } ,{                      
                           type: "name",
                           title: "Gebruikersnaam en wachtwoord",
                           content: "Voer de gebruikersnaam en het wachtwoord in om clients te authenticeren bij de PPTP-VPN-server."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Installatiehandleiding VPN-client",
               CONTENT: [{
                           type: "step",
                           title: "Cliënt apparaten verbinden met de PPTP VPN server:",
       content: [{                      
                           type: "paragraph",
                           content: "Voordat u de PPTP VPN server configureert, gelieve eerst dynamisch DNS service (aanbevolen) configureren of een statisch IP adres aan de WAN poort toewijzen. Wees er zeker van dat de externe poort van de NAT instellingen niet ingesteld staat op 1723 en dat de systeemtijd is gesynchroniseerd met het internet."
                       },
                "1. Selecteer VPN server inschakelen.",
                "2. Configureer de PPTP VPN server parameters en klik op Opslaan.",
                "3. Op het cliënt apparaat, creëer een PPTP VPN verbinding. De officiele ondersteunde platforms includeren Windows, Mac OSX, Linux, iOS en Android.",
                "4. Start het PPTP VPN programma, voeg een nieuwe verbinding toe en voer de domein naam van de geregistreerde DDNS Service in of het statische IP adres dat is toegewezen aan de WAN poort, om het cliënt apparaat te verbinden met de PPTP VPN server."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN verbindingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze pagina geeft de clients aan die momenteel zijn verbonden met de OpenVPN- en PPTP-VPN-servers van de router."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Netwerk overzicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "In netwerk map kunt u de huidige netwerk verbinding status bekijken en draadloze informatie "
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont de internet informatie."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont de huidige netwerk informatie van de draadloze netwerken en de LAN poorten."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Bekabelde/draadloze clients",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft de netwerk naam (bewerkbaar), toegewezen IP en MAC adres van de verbonden cliënten van de router weer."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Printer",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont de naam van de printer die op de router aangesloten is via een USB-aansluiting."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB-schijf",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft relevante informatie van de USB schijf weer die verbonden is met de router via de USB poort."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Spelheid testen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze functie test de huidige upload-en downloadsnelheden die u krijgt toegewezen vanuit uw serviceprovider en tevens biedt het handige tips over uw internet mogelijkheden."
                       } ,{                      
                           type: "paragraph",
                           content: "Tip: probeer andere apps en programma's af te sluiten voor een nauwkeuriger resultaat."
                       } ,{                      
                           type: "paragraph",
                           content: "Geschiedenis - Een record van eerdere snelheidstesten."
                       } ,{                      
                           type: "paragraph",
                           content: "Test opnieuw - Klik om een snelheidstest uit te voeren."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Klik op Auto Detect of selecteer de internetverbindingstype handmatig. Voer vervolgens de corresponderende parameters verkregen van uw ISP in."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecteer dit om slim verbinden in te schakelen. Deze functie helpt apparaten sneller te werken door ze toe te wijzen aan de beste draadloze kanalen op basis van de actuele omstandigheden, om de netwerkbelasting te balanceren."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Draadloos instellingen",
               CONTENT: [{
                           type: "paragraph",
                           content: "U kunt de draadloze instellingen configureren (SSID, wachtwoord, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Netwerk naam (SSID)",
                           content: "U wordt aanbevolen om de netwerknaam (SSID) te wijzigen. Dit veld is hoofdlettergevoelig."
                       } ,{                      
                           type: "name",
                           title: "SSID verbergen",
                           content: "Selecteer als u de 2.4GHz/5GHz netwerknaam (SSID) wilt verbergen uit de lijst van beschikbare draadloze netwerken. Eenmaal geselecteerd zal het SSID niet gebroadcast worden en dient u handmatig met het netwerk te verbinden. "
                       } ,{                      
                           type: "name",
                           title: "Wachtwoord",
                           content: "Voer een draadloos wachtwoord van 8 t/m 63 ASCII-tekens of 8 t/m 64 hexadecimale tekens in. In dit veld wordt onderscheid gemaakt tussen hoofdletters en kleine letters."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB opslagapparaat",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze functie stelt u in staat om uw USB opslagapparaat te delen onder verschillende cliënten in het lokale netwerk of via het internet."
                       } ,{                      
                           type: "title",
                           title: "Apparaat instellingen",
                           content: "Het gedeelte apparaat instellingen geeft basis informatie weer van het USB opslagapparaat dat verboden is via de USB poort. Een USB Flash schijf heeft gebruikelijk 1 volume."
                       } ,{                      
                           type: "name",
                           title: "Scannen",
                           content: "Normaal gesproken detecteert de router automatisch nieuwe aangesloten apparaten. Zo niet, klik op deze knop om te scannen en het scherm te verversen met geupdate informatie.",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Een grijs gebied representeerd een volume dat uitgeschakeld is. U kunt op het gebied klikken om een specifiek volume te delen."
                       }]
} ,{                      
                           type: "name",
                           title: "Verwijderen",
                           content: "Klik op deze knop om het USB opslagapparaat veilig te verwijderen voordat u deze fysiek van de USB poort loskoppelt. ",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "De verwijder knop verschijnt alleen wanneer het USB opslagapparaat verbonden is met de router. Wanneer de huidige volume bezet is, bent u niet in staat om deze los te koppelen."
                       }]
} ,{                      
                           type: "step",
                           title: "Een fileserver instellen",
       content: [ 
                "1. Sluit het USB opslagapparaat direct aan op de USB poort of gebruik een USB kabel. Als het apparaat een gebundelde externe voeding vereist, zorg er dan voor dat de externe voeding is aangesloten.",
                "2. Het nieuwe aangesloten USB apparaat dient automatisch gedetecteerd te worden door de router en weergegeven onder de Apparaat Instellingen sectie. Zo niet, klik dan op Scan.",
                "Opmerking: Het delen icoon verschijnt wanneer er meer dan 5 volumes aangesloten zijn op de router. U kunt op het icoon klikken om volumes uit te schakelen die u niet wenst te delen. "]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Toegang Adres",
               CONTENT: [{
                           type: "name",
                           title: "Netwerkmedia/Servernaam",
                           content: "Toont de naam welke gebruikt wordt om toegang te krijgen tot het verbonden USB opslagapparaat door de Netwerk buurt methode of Media delen functie. Standaard is dit TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Toegangsmethode",
                           content: "Er zijn vier methodes om toegang te krijgen tot het gedeelde USB massa opslag apparaat.",
       children: [{                      
                           type: "name",
                           title: "Netwerk omgeving",
                           content: "Selecteer deze optie om gebruikers op het netwerk toe te staan de gedeelde inhoud via het adres weergegeven onder de kolom adres te benaderen. "
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Selecteer deze optie om de FTP server functie die het FTP cliënts en gebruikers op het netwerk mogelijk maakt om toegang te krijgen tot het USB opslagapparaat via het FTP adres weergegeven onder de kolom Adres in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "Selecteer deze optie om FTP cliënten en gebruikers op afstand toegang te geven, bestanden te downloaden en uploaden naar het gedeelde USB opslagapparaat via FTP over het internet. Om het toegang adres aan te passen, klik op Bewerken en stel een dynamisch DNS in voor de router. Om de FTP server's poort te wijzigen, voer een nieuw poortnummer in en klik op Opslaan om de wijzigingen toe te passen."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Selecteer deze optie om de SFTP-server in te schakelen om SFTP-clients en gebruikers op het netwerk toegang te geven tot het USB-opslagapparaat via het SFTP-adres dat in de kolom 'adres' wordt getoond."
                       }]
} ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Toont het adres dat wordt gebruikt voor toegang tot het gedeelde USB opslagapparaat."
                       } ,{                      
                           type: "name",
                           title: "Poort",
                           content: "Geeft het poortnummer weer dat gebruikt wordt om toegang te verkrijgen tot de FTP server."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Het delen van de inhoud",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft de folders weer die gedeeld worden. Standaard worden alle folders gedeeld. U kunt op het delen icoon klikken om de gedeelde folders aan te passen."
                       } ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Het delen icoon verschijnt in de apparaten instellingen sectie wanneer er meer dan 5 volumes verbonden zijn aan de router. U kunt op het delen icoon klikken om volumes uit te schakelen indien u deze niet wenst te delen."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Inhoud en beveiliging delen",
               CONTENT: [{
                           type: "name",
                           title: "Het delen van de inhoud",
                           content: "Geeft de folders weer die gedeeld worden. Standaard worden alle folders gedeeld. U kunt op het delen icoon klikken om de gedeelde folders aan te passen.",
       children: [{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Het delen icoon verschijnt in de apparaten instellingen sectie wanneer er meer dan 5 volumes verbonden zijn aan de router. U kunt op het delen icoon klikken om volumes uit te schakelen indien u deze niet wenst te delen."
                       }]
} ,{                      
                           type: "name",
                           title: "toegang authenticatie",
       content: [ 
                "Schakel in om authenticatie in te schakelen welke de gebruikers vereist om een geldige gebruikersnaam en wachtwoord in te voeren om toegang te verkrijgen tot alle gedeelde folders. Administrators kunnen de bestanden lezen en wijzigen, terwijl gebruikers de bestanden alleen kunnen lezen.",
                "De gebruikersnaam dient te beginnen met een letter en dient 1 tot 15 tekens te bevatten, welke letters, cijfers en bijzondere tekens bevatten.",
                "Wachtwoorden dienen 1 tot 15 tekens te bevatten, welke letters, cijfers en bijzondere tekens bevatten."]
} ,{                      
                           type: "name",
                           title: "Toegang via Gastnetwerk toestaan",
                           content: "Schakel in om gastnetwerk gebruikers toegang te geven tot alle gedeelde folders."
                       } ,{                      
                           type: "name",
                           title: "Media delen inschakelen",
                           content: "Met deze functie ingeschakeld, kunnen alle DLNA-ondersteunde apparaten in het lokale netwerk toegang krijgen tot de media bestanden in alle gedeelde folders. Gebruikers worden niet vereist om een gebruikersnaam of wachtwoord in te voeren, zelfs niet wanneer toegang authenticatie ingeschakeld is."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Printer server",
               CONTENT: [{
                           type: "name",
                           title: "Printer server",
                           content: "Schakel in om de printer server functie in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Naam printer",
                           content: "Geeft de naam weer van de printer welke verbonden is met de router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Ouderlijk toezicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met de basis instellingen van ouderlijk toezicht kunt u toegang beperken voor bepaalde tijden gedurende de dag (bijvoorbeeld, geen toegang tot het internet op de PC van het kind tijdens huiswerk tijd."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Apparaten onder ouderlijk toezicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft informatie en instellingen weer van de apparaten die momenteel verboden worden door ouderlijk toezicht."
                       } ,{                      
                           type: "step",
                           title: "Beperkingen opleggen aan een nieuw client apparaat",
       content: [ 
                "1. Schakel ouderlijk toezicht in.",
                "2. Klik op toevoegen.",
                "3. Klik Scannen om een huidig verbonden apparaat te kiezen van de toegang apparaten lijst; of voer de naam van het apparaat en het MAC adres handmatig in om een apparaat toe te voegen dat niet verbonden is.",
                "4. Klik op het effectieve tijd icoon om een tijd periode te specificeren waarin het verbod van toepassing is.",
                "5. Voer een korte beschrijving in het het beschrijvings veld. Dit veld is optioneel.",
                "6. Selecteer deze invoer inschakelen.",
                "7. Klik op Opslaan."]
} ,{                      
                           type: "note",
                           title: "Opmerking",
                           content: "Als u deze invoer wilt uitschakelen, klik op het lamp icoon."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Gasten netwerk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze functie staat u toe om Wi-Fi toegang aan gasten te bieden zonder het hoofdnetwerk openbaar te maken."
                       } ,{                      
                           type: "name",
                           title: "Sta gasten toe elkaar te zien",
                           content: "Selecteer deze checkbox om toe te staan dat draadloze apparaten op het gastnetwerk met elkaar kunnen communiceren via methodes zoals netwerk buren, Samba, Ping en FTP."
                       } ,{                      
                           type: "name",
                           title: "Sta gasten toegang tot mijn lokale netwerk toe.",
                           content: "Selecteer deze checkbox om draadloze apparaten op het gastnetwerk toe te staan met elkaar te communiceren met de apparaten verbonden aan de router's LAN poorten of het hoofd netwerk via methodes zoals netwerk buren, Samba, Ping en FTP."
                       } ,{                      
                           type: "name",
                           title: "Gastnetwerk inschakelen",
                           content: "Selecteer dit keuzevakje om een Gastnetwerk in te schakelen."
                       } ,{                      
                           type: "name",
                           title: "Netwerk naam (SSID)",
                           content: "Gebruik het standaard gasten SSID of voer een nieuwe naam in (max. 32 tekens)."
                       } ,{                      
                           type: "name",
                           title: "SSID verbergen",
                           content: "Selecteer dit vakje als u het gasten SSID niet in de Wi-Fi netwerklijst wilt weergeven."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Wachtwoord update interval",
                           content: "Selecteer de update interval van het gastnetwerk wachtwoord."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Wachtwoord",
                           content: "Maak een wachtwoord van 8 tot 63 ASCII-tekens of 8 tot 64 hexadecimale tekens (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Wachtwoord",
                           content: "Gebruik het wachtwoord dat willekeurig wordt gegenereerd, of voer een wachtwoord in van 8 t/m 63 ASCII tekens, of 8 t/m 64 hexadecimale tekens (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link Cloud service staat u toe om op afstand uw netwerk te monitoren in echte tijd, uw TP-Link apparaten te benaderen en te beheren vanaf het internet wanneer en waar ook."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Account informatie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Toont informatie over uw TP-Link ID. U kunt de account informatie wijzigen door op het wijzigen icoon te klikken."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Apparaat informatie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geeft de apparaat informatie weer, inclusief het cloud account dat het apparaat beheert."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Accounts binden",
               CONTENT: [{
                           type: "paragraph",
                           content: "Deze tabel geeft alle cloud accountsd weer die momenteel gebonden zijn aan het apparaat."
                       } ,{                      
                           type: "step",
                           title: "Om een gebruikers account te binden",
       content: [ 
                "1. Klik op binden",
                "2. Voer een geregistreerd email in dat u wenst te binden.",
                "3. Klik op opslaan."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Ouderlijk toezicht",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met de leeftijd-niveau filters, de toegangslimieten en gebruikersprofielen biedt ouderlijk toezicht uw gezin een persoonlijk en een passende toegang tot het internet."
                       } ,{                      
                           type: "step",
                           title: "Om Ouderlijk Toezicht toe te passen op een nieuw apparaat.",
       content: [ 
                "1. Klik op Toevoegen.",
                "2. Vul een naam in voor dit profiel en klik op ''+'' om de apparaten toe te voegen onder dit profiel",
                "3. Selecteer een niveau filter en pas de inhoud van de filter aan op basis van uw behoeften. U kunt trefwoorden invoeren om te zoeken naar websites die u wilt filteren in onze database. Andere websites (URL's) kunnen handmatig worden ingevoerd. <br/> Zie verdere uitleg over de verschillende filter catagorieën: <p>Volwassen inhoud - sites die seksuele, schadelijke of illegale inhoud bevatten, inclusief pornografie, drugsgebruik, geweld en discriminatie kunnen bevatten. </p> <p> Gokken - sites die het bevorderen om te gokken of informatie verstrekken over gokken, inclusief online goksites </p> <p>Seksuele voorlichting - sites die informatie geven over seksualiteit, inclusief voorplanting, seksualiteit, veilig vrije & anticonceptie, seksueel overdraagbare aandoeningen en het omgaan met seksuele trauma's </p> <p> Online communicatie - sites die via een host formaat communiceren met anderen door middel van tekst, spraak of video, inclusief e-mail, blogs, online forums, VoIP en video-chat diensten </p> <p>Sociale Netwerken - sites die persoonlijke expressie en communicatie delen, mensen en hun activiteiten aan elkaar koppelt, op basis van dezelfde interesses, carriéres, achtergronden of een real-life kennismaking </p> <p> Betalen om te surfen - sites die gebruikers compenseren door bepaalde websites of advertenties te bekijken, te klikken op koppelingen of te laten reageren op enquêtes. </p> <p> Media - sites die gratis, betaald of ongeschreven audio en/of video -inhoud aanbieden, inclusief streaming diensten, tv programma's of muziek downloads </p> <p> Downloads - sites die toegang verstrekken of toegang geven voor het delen van bestanden, inclusief het delen van peer-to-peer, online opslag van bestanden en de inhoud van bestanden van mobiele apparatuur (bijvoorbeeld muziek en apps) </p> <p>Games - sites die toegang verstrekken of toegang geven tot de webgehoste of downloadbare games, inclusief online gaming, game console netwerken en browser games.",
                "4. Als u de totale tijd die dit profiel online doorbrengt wilt beperken, dan kunt u tijdslimieten inschakelen. U kunt ook de bedtijd functie gebruiken,zodat u een dagelijkse periode kunt instellen waarin apparaten onder dit profiel niet kunnen internetten.",
                "5. Klik op opslaan."]
} ,{                      
                           type: "step",
                           title: "Om een profiel te bekijken met gedetailleerde internet geschiedenis.",
       content: [ 
                "1. In de kolom met inzichten, kunt u klikken op de corresponderende knop 'inzicht'.",
                "2. Als u meerdere opnames wilt zien, klik dan op de Geschiedenis <span class=\"ptl-ctr-help-icon history\"></span> knop",
                "3. U kunt websites blokkeren of deblokkeren door te klikken op de <span class=\"ptl-ctr-help-icon block\"></span> of <span class=\"ptl-ctr-help-icon unblock\"></span> knop."]
} ,{                      
                           type: "step",
                           title: "Om de internet toegang onmidddelijk in-of uit te schakelen",
       content: [ 
                "Klik in de internet toegangskolom op <span class=\"ptl-ctr-help-icon stop\"></span> om apparaten en het bijbehorende profiel te stoppen van de toegang tot het internet en klik op <span class=\"ptl-ctr-help-icon enable\"></span> om de toegang tot het internet weer in te schakelen."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "De Qos (Quality of Service) functie geeft voorrang aan online activiteiten en apparaten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft."
                       } ,{                      
                           type: "paragraph",
                           content: "Selecteer applicatie prioriteit om voorrang te geven aan de snelheid van het netwerk voor online activiteiten en selecteer apparaat prioriteit om voorrang te geven op de snelheid van het netwerk naar de apparaten."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Applicatie prioriteit",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kies de online activiteit die u voorrang wilt geven of klik op 'Aangepast' om de prioriteit van elke online activiteit in te stellen."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Apparaat Prioriteit",
               CONTENT: [{
                           type: "paragraph",
                           content: "kies de apparaten die u voorrang wilt geven en hoe lang u ze prioriteit wilt geven."
                       } ,{                      
                           type: "step",
                           title: "Om prioriteiten te stellen aan een apparaat",
       content: [ 
                "1. Zoek het apparaat in de lijst die u wilt prioriteren en schakel om op Prioriteit",
                "2. Selecteer hoe lang het apparaat zal worden geprioriteerd in de Timing-kolom."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Met het scannen van netwerk frequenties, het detecteren van kwaadaardige sites en het isoleren van een geïnfecteerd apparaat, houdt de antivirus functiee uw persoonlijke informatie veilig. U kunt ook controleren hoe uw netwerk is beveiligd en of er geen aanvallen zijn geweest op uw netwerk."
                       } ,{                      
                           type: "paragraph",
                           content: "Geschiedenis - Registreert de apparaten die worden beschermd door de Antivirus en de bron met classificaties over de aanval."
                       } ,{                      
                           type: "paragraph",
                           content: "Schakel alles in - Klik op 'schakel alle beschermingstypes in' als er een of meer niet zijn ingeschakeld."
                       } ,{                      
                           type: "paragraph",
                           content: "Beschermingstypes - Schakel de beschermingstypes in door te verwijzen naar de uitleg. Het wordt aanbevolen om alle beveiligingstypes in te schakelen."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Applicatie prioriteit",
               CONTENT: [{
                           type: "paragraph",
                           content: "De-Applicatie-Prioriteit functie geeft voorrang aan online activiteiten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft. Kies de online activiteit die u prioriteit wilt geven of klik op 'Aangepast' om de prioriteit van elke online activiteit in te stellen. "
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Apparaat Prioriteit",
               CONTENT: [{
                           type: "paragraph",
                           content: "De-Apparaat-Prioriteit functie geeft prioriteit aan apparaten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft. kies de apparaten die u voorrang wilt geven en hoe lang u ze prioriteit wilt geven."
                       } ,{                      
                           type: "step",
                           title: "Om prioriteiten te stellen aan een apparaat",
       content: [ 
                "1. Zoek het apparaat in de lijst die u wilt prioriteren en schakel om op Prioriteit",
                "2. Selecteer hoe lang het apparaat zal worden geprioriteerd in de Timing-kolom."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) Firewall voorkomt cyberaanvallen en valideert het verkeer dat door de router passeert op basis van het protocol. Standaard is deze functie ingeschakeld."
                       } ,{                      
                           type: "name",
                           title: "Schakel SPI Firewall in.",
                           content: "Schakel SPI Firewall niet uit tenzij het noodzakelijk is."
                       } ,{                      
                           type: "name",
                           title: "Sta Pings toe vanuit de WAN poort/ Sta pings to vanuit de LAN poort",
                           content: "Schakel het toestaan van ping packets in vanuit de WAN/LAN Poort. Dit wordt aanbevolen voor het behouden van de standaard instellingen."
                       }]
},
       "" :     ""
    };
})(jQuery);