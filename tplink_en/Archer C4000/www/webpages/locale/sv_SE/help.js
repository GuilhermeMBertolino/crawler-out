(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar relevant information om wide area network (internet)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Trådlöst 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om det trådlösa nätverket."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om Ethernet-LAN-portar."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Gästnätverk 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om trådlösa nätverk för gäster."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB enheter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om USB-lagringsenheter och/eller skrivare som är ansluten till routern via USB-portarna."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Prestanda",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar nuvarande routernas prestanda."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Trådanslutna",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om den trådbundna enheter som är anslutna till nätverket."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Trådlösa klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om trådlösa enheter som är anslutna till nätverket."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurera IPv4-parametrar och välj lämplig MAC Clone metod som du behöver."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Välj typ av Internet-Anslutning och ange motsvarande parametrar."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: Dynamisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj detta om du har en DHCP-server anslutning via internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "IP-adress/Nätmask/standard-gateway/Primary DNS/Sekundär DNS",
                           content: "Dessa parametrar tilldelas automatiskt av DHCP-servern från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Förnya",
                           content: "Klicka för att få nya IP-parametrar från DHCP-servern."
                       } ,{                      
                           type: "name",
                           title: "Släpp",
                           content: "Klicka för att frigöra alla IP-adresser som tilldelats av DHCP-servern."
                       } ,{                      
                           type: "name",
                           title: "DNS-adress",
                           content: "Om internet-leverantören tillhandahåller en eller två DNS-adresser, markera kryssrutan och ange den primära DNS-och de sekundära DNS-adresserna i motsvarande fält. Annars, kommer DNS-adresserna tilldelas dynamiskt från internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 bytes. Det är inte rekommenderat att ändra MTU-storlek om det inte krävs av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "Värdnamn",
                           content: "Ange ett värde i det här fältet för att ange värdnamnet för routern."
                       } ,{                      
                           type: "name",
                           title: "Få IP genom Unicast DHCP",
                           content: "Markera den här kryssrutan om leverantörens DHCP-server inte stöder broadcast applikationer och du kan få IP-adress dynamiskt."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: Statisk IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj det här om du har en specifik (fast) IP-adress, nätmask, gateway och DNS-parametrar av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "IP-adress/Nätmask/standard-gateway/Primary DNS/Sekundär DNS",
                           content: "Ange den information som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 bytes. Det är inte rekommenderat att ändra MTU-storlek om det inte krävs av Internet-leverantören."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: BigPond kabel"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj den här typen om internetleverantören erbjuder BigPond-anslutning."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange det användarnamn och lösenord som du fått från internetleverantören. Dessa fält är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "Auth. Server",
                           content: "Ange verifiering serverns IP-adress eller värdnamn."
                       } ,{                      
                           type: "name",
                           title: "Auth. Domän",
                           content: "Ange serverns domännamn suffix (baserat på platsen). Exempelvis nsw.bigpond.net.au för NSW/ACT, vic.bigpond.net.au för VIC/burk/WA/SA/NT eller qld.bigpond.net.au för QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 bytes. Det är inte rekommenderat att ändra MTU-storlek om det inte krävs av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "Anslutningsläge",
                           content: "Välj en lämplig koppling läge som avgör hur du ansluter till Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I det här läget återansluter Internet-anslutningen automatiskt varje gång det blir frånkopplat."
                       } ,{                      
                           type: "name",
                           title: "På begäran",
                           content: "I det här läget kommer Internet anslutning att avslutas automatiskt efter en viss tid av inaktivitet (maximal vilotid) har gått. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                       } ,{                      
                           type: "name",
                           title: "Manuellt",
                           content: "I det här läget styrs Internet anslutning manuellt genom att klicka på Anslut eller koppla ifrån. Det här läget stöder också funktionen Max Idle Time. Ange en maximal tid (i minuter) som Internet anslutningen kan vara inaktiv innan den avslutas i fältet Max Idle Time. Standardvärdet är 15. Om du vill att Internet-anslutningen är aktiv hela tiden anger du 0 (noll)."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj denna typ om du använder DSL (Digital Subscriber Line) service och är försedd med ett användarnamn och lösenord av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange det användarnamn och lösenord som du fått från internetleverantören. Dessa fält är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "IP-adress/Primary DNS/Sekundär DNS",
                           content: "Dessa parametrar tilldelas automatiskt av DHCP-servern på internet."
                       } ,{                      
                           type: "name",
                           title: "Ingen, dynamisk IP, Statisk IP",
       children: [{                      
                           type: "name",
                           title: "Ingen",
                           content: "Välj om ingen sekundär anslutning."
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Välj om IP-adressen och nätmasken automatiskt tilldelas av Internet-leverantören.",
       children: [{                      
                           type: "name",
                           title: "Förnya",
                           content: "Klicka för att förnya IP-parametrar från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Släpp",
                           content: "Klicka för att frigöra tilldelade IP-parametrar."
                       }]
} ,{                      
                           type: "name",
                           title: "Statisk IP-adress",
                           content: "Välj om IP-adress och nätmask tillhandahålls av internetleverantören och ange information i motsvarande fält."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Den typiska MTU (Maximum Transmission Unit) för Ethernet-nätverk är 1480 bytes.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "I sällsynta fall kan internetleverantören kräva att du justerar MTU-storlek för bättre nätverksprestanda. Du bör inte ändra värdet om det inte är absolut nödvändigt."
                       }]
} ,{                      
                           type: "name",
                           title: "Servicenamn/Access Concentrator namn",
                           content: "Som standard är namnet på tjänsten och Access Concentrator (AC) tomt. Dessa områden bör inte konfigureras om inte internetleverantören kräver det."
                       } ,{                      
                           type: "name",
                           title: "Upptäcka Online-intervall",
                           content: "Ange ett tidsintervall mellan 0 och 120 (i sekunder) som routern känner Access Concentrator online på varje intervall. Standardvärdet är 10."
                       } ,{                      
                           type: "name",
                           title: "IP-adress",
                           content: "Om internetleverantör tillhandahåller en specifik (fast) IP-adress väljer du Använd följande IP-Adress och ange IP-adressen i fältet. Välj annars Få Dynamiskt från leverantören för att få en server-tilldelad IP-adress automatiskt."
                       } ,{                      
                           type: "name",
                           title: "DNS-adress",
                           content: "Om internetleverantör tillhandahåller särskilda (fasta) DNS-IP-adresser väljer du Använd följande DNS-adresser och ange adress(er) i fälten Primär DNS och Secondary DNS. Välj annars få dynamiskt från leverantören för att få servern att automatiskttilldela IP-adress för DNS(er)."
                       } ,{                      
                           type: "name",
                           title: "Anslutningsläge",
                           content: "Välj en lämplig koppling läge som avgör hur du ansluter till Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I det här läget återansluter Internet-anslutningen automatiskt varje gång det blir frånkopplat."
                       } ,{                      
                           type: "name",
                           title: "På begäran",
                           content: "I det här läget kommer Internet anslutning att avslutas automatiskt efter en viss tid av inaktivitet (maximal vilotid) har gått. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                       } ,{                      
                           type: "name",
                           title: "Tidsbaserad",
                           content: "I det här läget, är Internet-anslutningen endast etablerad under en viss tidsperiod. Om det här alternativet väljs, ange start- och sluttid, båda är i formatet HH:MM."
                       } ,{                      
                           type: "name",
                           title: "Manuellt",
                           content: "I det här läget styrs Internet anslutning manuellt genom att klicka på Anslut eller koppla ifrån. Det här läget stöder också funktionen Max Idle Time. Ange en maximal tid (i minuter) som Internet anslutningen kan vara inaktiv innan den avslutas i fältet Max Idle Time. Standardvärdet är 15. Om du vill att Internet-anslutningen är aktiv hela tiden anger du 0 (noll)."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Det tidsbaserade anslutnings läget kommer att träda i kraft först när Systemtiden konfigureras på Avancerade → System Verktyg → Tids inställningar."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj denna om du ansluter till en L2TP/PPTP VPN-server och är försedda med ett användarnamn, lösenord och IP-adress/Domän namnet på den server som din internetleverantör ger."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange det användarnamn och lösenord som du fått från internetleverantören. Dessa fält är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "IP-adress/Primary DNS/Sekundär DNS",
                           content: "Dessa parametrar kommer att tilldelas automatiskt av DHCP-servern från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP eller statisk IP",
       children: [{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Välj om IP-adressen och nätmasken automatiskt tilldelas av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "Statisk IP-adress",
                           content: "Välj om IP-adress, nätmask, gateway och DNS-adresserna tillhandahålls av internetleverantören och ange information i motsvarande fält."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN-server IP/domännamn",
                           content: "Ange VPN-serverns IP-adress eller det domännamn som du fått av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard och typiska MTU (Maximum Transmission Unit) för de flesta Ethernet-nätverk är 1460 bytes för L2TP eller 1420 byte för PPTP. Det är inte rekommenderat att ändra MTU-storlek om det inte krävs av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "Anslutningsläge",
                           content: "Välj en lämplig koppling läge som avgör hur du ansluter till Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "I det här läget återansluter Internet-anslutningen automatiskt varje gång det blir frånkopplat."
                       } ,{                      
                           type: "name",
                           title: "På begäran",
                           content: "I det här läget kommer Internet anslutning att avslutas automatiskt efter en viss tid av inaktivitet (maximal vilotid) har gått. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                       } ,{                      
                           type: "name",
                           title: "Manuellt",
                           content: "I det här läget styrs Internet anslutning manuellt genom att klicka på Anslut eller koppla ifrån. Det här läget stöder också funktionen Max Idle Time. Ange en maximal tid (i minuter) som Internet anslutningen kan vara inaktiv innan den avslutas i fältet Max Idle Time. Standardvärdet är 15. Om du vill att Internet-anslutningen är aktiv hela tiden anger du 0 (noll)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC-kloníng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Välj lämplig MAC Clone metod som du behöver."
                       } ,{                      
                           type: "name",
                           title: "Klona inte MAC-adressen",
                           content: "Ändra INTE routerns MAC-adress, om inte internetleverantören binder den tilldelade IP-adressen till MAC-adressen."
                       } ,{                      
                           type: "name",
                           title: "Klona nuvarande dator MAC-adress",
                           content: "Markera och kopiera den aktuella MAC-adressen till den dator som är ansluten till routern, om ISP binder den tilldelade IP-adressen för datorns MAC-adress."
                       } ,{                      
                           type: "name",
                           title: "Använd egen MAC-adress",
                           content: "Ange MAC-adressen manuellt, i fall ISP binder den tilldelade IP-adressen till en specifik MAC-adress."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN-sammansättning",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN-aggregering omvandlar LAN1-porten till ytterligare en WAN-port och skapar en dataväg med hög bandbredd. Få snabbare internet från internetleverantören som erbjuder en bandbreddshastighet på över 1 Gbps och bli inte längre begränsad av nätverkets hårdvara."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Obs",
                           content: "Innan du aktiverar den här funktionen måste du se till att din internetleverantör har stöd för WAN-aggregering och att ditt modem har två WAN-portar."
                       } ,{                      
                           type: "step",
                           title: "För att tillämpa WAN-samling",
       content: [ 
                "1. Sätt på WAN-aggregering.",
                "1. Spara.",
                "3. Anslut routerns WAN-port och LAN1-port till modemets två WAN-portar med två nätverkskablar."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar routerns MAC-adress, IP-adress och nätmask."
                       } ,{                      
                           type: "name",
                           title: "MAC-adress",
                           content: "Den unika fysiska adress som tilldelats Ethernet (LAN) port på routern."
                       } ,{                      
                           type: "name",
                           title: "IP-adress",
                           content: "Här visas routerns standard-IP-adress som används för att logga in på routerns websida. Du kan ändra den till en annan."
                       } ,{                      
                           type: "name",
                           title: "Nätmask",
                           content: "Välj en identifierare som används av LAN-port för att routa intern och extern trafik eller ange en ny subnätmask."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om den nya LAN-IP-adressen inte är i samma nätmask som med den gamla, kommer IP-adresser i DHCP-servern konfigureras automatiskt, men den virtuella servern och DMZ-värden kommer inte att träda i kraft förrän de konfigureras om."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Länkaggregering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Länk-sammanslagning kombinerar två portar för att skapa en enda dataförbindelse med hög bandbredd, och således upprätthålla en högre hastighet och stabilare trådbundet nätverk."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Om du vill använda länk-sammanslagning",
       content: [ 
                "1.Växla till enable (aktivera) funktionen Link Aggregation.",
                "2.Ange två portar för länk-sammanslagning",
                "3. Klicka på Spara."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (internet Protocol Television) är ett system genom vilket tv-tjänster levereras via internet protokoll över ett datapaketförmedlat nät såsom ett LAN eller internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP-snooping",
                           content: "Funktionen IGMP (internet Group Management Protocol) Snooping möjliggör för routern att endast vidarebefordra multicast-trafik till portar som har begärt det."
                       } ,{                      
                           type: "name",
                           title: "IGMP-Proxy",
                           content: "Välj att aktivera IGMP-Proxy-funktionen om IPTV-tjänsten som tillhandahålls av leverantören är IGMP-teknikbaserad."
                       } ,{                      
                           type: "name",
                           title: "IGMP-version",
                           content: "Välj IGMP-version i enlighet med din internetleverantör. Standardversionen för IGMP är V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Wireless Multicast Forwarding",
                           content: "Välj att aktivera funktionen trådlös Multicast-vidarebefordran som gör att IP-multicastpaket vidarebefordras till det trådlösa nätverket."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Välj att aktivera IPTV-funktionen om IPTV-tjänsten som tillhandahålls av leverantören är icke-IGMP-teknikbaserad."
                       } ,{                      
                           type: "name",
                           title: "ISP-profil",
                           content: "Välj rätt profil för internetleverantör (ISP) för att avsluta konfigurationen. Det finns tre olika typer av profiler:",
       children: [{                      
                           type: "name",
                           title: "Land-internetleverantör",
                           content: "ISP-profiler med standardinställningar har formatet \"land-ISP:s namn\". Leta upp din internetleverantör och välj den i rullgardinslistan."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Om din internetleverantör inte finns listad och inga andra parametrar krävs för att ställa in IPTV kan du helt enkelt välja den här profilen och specificera LAN-porten dedikerad till IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Specificera vilken typ av data LAN-porten ska skicka. Om till exempel IPTV är valt för LAN1 kommer bara IPTV-data att skickas och du bör ansluta din digital-tv-box till LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Om din internetleverantör inte finns listad och inga andra parametrar krävs för att ställa in IPTV kan du helt enkelt välja den här profilen och specificera LAN-porten dedikerad till IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Ange vilken typ av data som LAN-porten kommer att skicka. Om IPTV till exempel är valt för LAN2 kommer den enbart att skicka IPTV-data och du bör då ansluta set-top-box till LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Om din internetleverantör inte finns listad och inga andra parametrar krävs för att ställa in IPTV kan du helt enkelt välja den här profilen och specificera LAN-porten dedikerad till IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Ange vilken typ av data som LAN-porten kommer att skicka. Om IPTV till exempel är valt för LAN5 kommer den enbart att skicka IPTV-data och du bör då ansluta set-top-box till LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Anpassad",
                           content: "Om din internetleverantör inte finns listad men ger dig vissa nödvändiga parametar som internet/VoIP/IPTV VLAN-ID och prioritet ska du välja den här profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/prioritet",
                           content: "Konfigurera VLAN-identiteter och prioriteringar som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Markera om du vill märka Internet paket med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/prioritet",
                           content: "Du kan aktivera IPTV multicast-funktionen som önskas, och konfigurera VLAN-ID och prioritet enligt internetleverantör."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Specificera vilken typ av data LAN-porten ska skicka. Om till exempel IPTV är valt för LAN1 kommer bara IPTV-data att skickas och du bör ansluta din digital-tv-box till LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Anpassad",
                           content: "Om din internetleverantör inte finns listad men ger dig vissa nödvändiga parametar som internet/VoIP/IPTV VLAN-ID och prioritet ska du välja den här profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/prioritet",
                           content: "Konfigurera VLAN-identiteter och prioriteringar som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Markera om du vill märka Internet paket med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/prioritet",
                           content: "Du kan aktivera IPTV multicast-funktionen som önskas, och konfigurera VLAN-ID och prioritet enligt internetleverantör."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Ange vilken typ av data som LAN-porten kommer att skicka. Om IPTV till exempel är valt för LAN2 kommer den enbart att skicka IPTV-data och du bör då ansluta set-top-box till LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Anpassad",
                           content: "Om din internetleverantör inte finns listad men ger dig vissa nödvändiga parametar som internet/VoIP/IPTV VLAN-ID och prioritet ska du välja den här profilen.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/prioritet",
                           content: "Konfigurera VLAN-identiteter och prioriteringar som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Markera om du vill märka Internet paket med 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN-ID/prioritet",
                           content: "Du kan aktivera IPTV multicast-funktionen som önskas, och konfigurera VLAN-ID och prioritet enligt internetleverantör."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Ange vilken typ av data som LAN-porten kommer att skicka. Om IPTV till exempel är valt för LAN5 kommer den enbart att skicka IPTV-data och du bör då ansluta set-top-box till LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP-server",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Som standard är DHCP (Dynamic Host Configuration Protocol) aktiverad; den tilldelar dynamiskt TCP/IP-parametrar till klient enheter från IP-adresser.",
                "Inaktivera inte DHCP-servern om du inte har en annan DHCP-server eller manuellt vill tilldela TCP/IP-parametrar för varje klient enheten i nätverket."]
} ,{                      
                           type: "name",
                           title: "IP-adresspool",
                           content: "Ange intervallet för IP-adresser som kan lånas ut till klienterna."
                       } ,{                      
                           type: "name",
                           title: "Adress lånetid",
                           content: "Ange tiden (mellan 1 och 2880 minuter) som en IP-adress är uthyrd till en klient. Standardvärdet är 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Addressreservering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar motsvarande parametrar för IP-reserverade enheter."
                       } ,{                      
                           type: "step",
                           title: "Att reservera en IP-adress",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Klicka på Skanna för att välja en ansluten enhet från DHCP-klientlista, eller ange MAC-adressen för önskad kund i fältet MAC-adress och IP-adress som du vill reservera för klienten i IP-adressfältet.",
                "3. Ange en beskrivning för klienten i fältet Beskrivning.",
                "4. Välj Aktivera.",
                "5. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP klientlista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om anslutna enheter."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med dynamisk DNS (Dynamic Domain Name System) kan du tilldela ett fast värd- och domännamn till en dynamisk internet-IP-adress. Det är användbart när du har en egen webbplats, FTP-server eller en annan server bakom routern. Till att börja med måste du registrera dig hos en dynamisk DNS-service provider som www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Att sätta upp en dynamisk DNS",
       content: [ 
                "1. Välj dynamisk DNS-service leverantör.",
                "2. Ange användarnamn och lösenord för det dynamiska DNS-kontot.",
                "3. Ange det domännamn som du har fått från en DDNS-leverantör.",
                "4. Välj Uppdatera intervall från den nedrullningsbara listan.",
                "5. Om tjänsteleverantören är NO-IP, så kan WAN IP bindningen säkerställa att domännamnet är bundet till den här routerns WAN-IP.",
                "6. Klicka på Logga in och spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill använda ett nytt DDNS-konto, logga ut och logga sedan in med det nya kontot."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamisk DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med dynamisk DNS (Dynamic Domain Name System) kan du tilldela ett fast värd- och domännamn till en dynamisk internet-IP-adress. Det är användbart när du har en egen webbplats, FTP-server eller en annan server bakom routern. Till att börja med måste du registrera dig hos en dynamisk DNS-service provider som www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Domän namn lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar information om alla de domännamn som är registrerade med ditt moln-konto."
                       } ,{                      
                           type: "step",
                           title: "Registrera nytt domännamn",
       content: [ 
                "1. Klicka på Registrera.",
                "2. Ange det domännamn du vill registrera.",
                "3. Klicka på Spara."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statisk routing",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statisk routing används för att styra en fast väg för paket att nå en viss värd eller ett visst nätverk."
                       } ,{                      
                           type: "step",
                           title: "Att ställa in en statisk routing",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Ange en IP-adress i nätverket för att tilldela statisk routing för posten.",
                "3. Ange nätmasken i textrutan Nätmask för att avgöra nätverksdelen och värddelen av IP-adressen.",
                "4. Ange en gateway-IP-adress i fältet Gateway när du ansluter routern till nätverket eller värden.",
                "5. Välj LAN eller WAN i gränssnittet för att ange typ av destination i nätverket.",
                "6. Ange en kort beskrivning av posten.",
                "7. Välj Aktivera.",
                "8. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Systemets routingtabell",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar alla giltiga routingposter som används."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Inställning av trådlöst",
               CONTENT: [{
                           type: "paragraph",
                           content: "Konfigurera de trådlösa inställningar som du behöver."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Markera den här rutan för att aktivera Smart Connect. Den här funktionen gör enheten snabbare genom att tilldela dem bästa möjliga trådlösa frekvensband baserat på faktiska förhållanden för att balansera nätverksbelastningen."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Trådlöst 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nätverksnamn (SSID)",
                           content: "Du rekommenderas att ändra nätverksnamnet (SSID). Det här fältet är skiftlägeskänsligt."
                       } ,{                      
                           type: "name",
                           title: "Dölj SSID",
                           content: "Välj om du vill dölja 2.4GHz nätverksnamn (SSID) i listan över trådlösa nätverk. Då sänds SSID inte ut och du måste manuellt ansluta till nätverket."
                       } ,{                      
                           type: "name",
                           title: "Säkerhet",
                           content: "Välj ett av följande alternativ:",
       children: [{                      
                           type: "name",
                           title: "Ingen säkerhet",
                           content: "Välj det här alternativet om du vill deaktivera trådlös säkerhet. Det är inte rekommenderat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personligt",
                           content: "Välj det här alternativet om du vill aktivera trådlös säkerhet. Det rekommenderas starkt att skydda det trådlösa nätverket från obehörig åtkomst. Om du väljer så konfigurera följande.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Välj en säkerhetsversion. WPA2-PSK är säkrare. Om du är osäker väljer du Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Välj en säkerhetskrypterings typ. AES är säkrare. Det rekommenderat att inte använda TKIP-kryptering om routern fungerar i 802.11n-läget. Dessutom använder TKIP inaktiverad WPS-funktionen. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "Lösenord",
                           content: "Ange ett lösenord för trådlöst mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken i det här fältet."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Företag",
                           content: "Välj det här alternativet om du vill aktivera den mer avancerade autentiserings metoden med en RADIUS-server (Remote Authentication Dial In User Service). Om markerad, inaktiveras WPS-funktionen.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Välj en security version. WPA2 är säkrare. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Välj en säkerhetskrypterings typ. AES är säkrare. Det rekommenderat att inte använda TKIP-kryptering om routern fungerar i 802.11n-läget. Dessutom använder TKIP inaktiverad WPS-funktionen. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Server IP",
                           content: "Ange RADIUS-serverns IP-adress."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Ange portnumret för RADIUS-servern."
                       } ,{                      
                           type: "name",
                           title: "RADIUS lösenord",
                           content: "Ange den delade lösenord för RADIUS-servern."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Välj det här alternativet för att aktivera grundläggande autentiseringsmetod om någon av klientenheterna bara kan ansluta trådlöst med WEP (Wired Equivalent Privacy). Om det väljs kommer WPS-funktionen avaktiveras.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Välj en autentiseringstyp för det trådlösa nätverket. Om du är osäker väljer du Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP Key Format",
                           content: "Använd antingen ASCII-format eller Hexadecimal. ASCII-formatet är en kombination av alfabetiska och numeriska tecken. Hexadecimalt format är en kombination av numren(0- 9) och bokstäver (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ av nyckel",
                           content: "Välj WEP-nyckeln.",
       children: [{                      
                           type: "name",
                           title: "64-BITARS",
                           content: "Här kan du ange 10 hexadecimala siffror (0-9, A-F, a-f) eller 5 ASCII-tecken i WEP-värdet."
                       } ,{                      
                           type: "name",
                           title: "128-BITARS",
                           content: "Kan du ange 26 hexadecimala tecken (0-9, A-F, a-f) eller 13 ASCII-tecken i WEP-värdet."
                       }]
} ,{                      
                           type: "name",
                           title: "Värde",
                           content: "Ange WEP-nyckeln in i respektive fält."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Välj en kanal för det 2,4 GHz trådlösa nätverket. Det rekommenderas att lämna kanalen Auto om du inte upplever tillfälliga trådlösa anslutningsproblem."
                       } ,{                      
                           type: "name",
                           title: "Överföringsenergi",
                           content: "Välj antingen Hög, Medel eller Låg för att ange data överföringseffekt. Den rekommenderade standardinställningen är hög."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "funktionen Airtime Fairness",
                           content: "Markera kryssrutan för att göra det möjligt för funktionen Airtime Faitness (ATF) som gör att du kan optimera genomströmningen av varje flöde. ATF trafik schemaläggare använder samtalstid per destination för att balansera löde över destinationer."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Fler-användare MIMO",
                           content: "Klicka för användning av fler-användare MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Trådlöst 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nätverksnamn (SSID)",
                           content: "Du rekommenderas att ändra nätverksnamnet (SSID). Det här fältet är skiftlägeskänsligt."
                       } ,{                      
                           type: "name",
                           title: "Dölj SSID",
                           content: "Välj om du vill dölja 5GHz nätverksnamn (SSID) i listan över trådlösa nätverk. SSID sänds inte ut och du måste manuellt ansluta till nätverket."
                       } ,{                      
                           type: "name",
                           title: "Säkerhet",
                           content: "Välj ett av följande alternativ:",
       children: [{                      
                           type: "name",
                           title: "Ingen säkerhet",
                           content: "Välj det här alternativet om du vill deaktivera trådlös säkerhet. Det är inte rekommenderat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personligt",
                           content: "Välj det här alternativet om du vill aktivera trådlös säkerhet. Det rekommenderas starkt att skydda trådlösa nätverket från obehörig åtkomst. Om du aktiverar konfigurera följande.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Välj en säkerhetsversion. WPA2-PSK är säkrare. Om du är osäker väljer du Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Välj en säkerhetskrypterings typ. AES är säkrare. Det rekommenderat att inte använda TKIP-kryptering om routern fungerar i 802.11n-läget. Dessutom använder TKIP inaktiverad WPS-funktionen. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "Lösenord",
                           content: "Ange ett lösenord för trådlöst mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken i det här fältet."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Företag",
                           content: "Välj det här alternativet om du vill aktivera den mer avancerade autentiserings metoden med en RADIUS-server (Remote Authentication Dial In User Service). Om markerad, inaktiveras WPS-funktionen.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Välj en security version. WPA2 är säkrare. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Välj en säkerhetskrypterings typ. AES är säkrare. Det rekommenderat att inte använda TKIP-kryptering om routern fungerar i 802.11n-läget. Dessutom använder TKIP inaktiverad WPS-funktionen. Om du är osäker välj Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Server IP",
                           content: "Ange RADIUS-serverns IP-adress."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Ange portnumret för RADIUS-servern."
                       } ,{                      
                           type: "name",
                           title: "RADIUS lösenord",
                           content: "Ange den delade lösenord för RADIUS-servern."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Välj det här alternativet för att aktivera grundläggande autentiseringsmetod om någon av klientenheterna bara kan ansluta trådlöst med WEP (Wired Equivalent Privacy). Om det väljs kommer WPS-funktionen avaktiveras.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Välj en autentiseringstyp för det trådlösa nätverket. Om du är osäker väljer du Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP Key Format",
                           content: "Använd antingen ASCII-format eller Hexadecimal. ASCII-formatet är en kombination av alfabetiska och numeriska tecken. Hexadecimalt format är en kombination av numren(0- 9) och bokstäver (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ av nyckel",
                           content: "Välj WEP-nyckeln.",
       children: [{                      
                           type: "name",
                           title: "64-BITARS",
                           content: "Här kan du ange 10 hexadecimala siffror (0-9, A-F, a-f) eller 5 ASCII-tecken i WEP-värdet."
                       } ,{                      
                           type: "name",
                           title: "128-BITARS",
                           content: "Kan du ange 26 hexadecimala tecken (0-9, A-F, a-f) eller 13 ASCII-tecken i WEP-värdet."
                       }]
} ,{                      
                           type: "name",
                           title: "Värde",
                           content: "Ange WEP-nyckeln in i respektive fält."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal",
                           content: "Välj en kanal för det 5GHz trådlösa nätverket. Det rekommenderas att lämna kanalen till Auto om du inte upplever intermittent trådlösa anslutningsproblem."
                       } ,{                      
                           type: "name",
                           title: "Överföringsenergi",
                           content: "Välj antingen Hög, Medel eller Låg för att ange data överföringseffekt. Den rekommenderade standardinställningen är hög."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "funktionen Airtime Fairness",
                           content: "Markera kryssrutan för att göra det möjligt för funktionen Airtime Faitness (ATF) som gör att du kan optimera genomströmningen av varje flöde. ATF trafik schemaläggare använder samtalstid per destination för att balansera löde över destinationer."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Fler-användare MIMO",
                           content: "Klicka för användning av fler-användare MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS Brygga",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) erbjuder dig en enklare metod för att sätta upp en skyddad Wi-Fi-anslutning."
                       } ,{                      
                           type: "name",
                           title: "Tryck på knappen (rekommenderas)",
       content: [ 
                "Denna metod gör det möjligt att enkelt ansluta en WPS-aktiverad enhet till det trådlösa nätverket.",
                "Klicka på WPS-knappen Start på skärmen. Klicka inom två minuter på WPS-knappen på klientenheten ."]
} ,{                      
                           type: "name",
                           title: "PIN-kod router",
       content: [ 
                "Standard-PIN finns på routeretiketten.",
                "Klicka på Generate (skapa) för att få en ny PIN-kod eller klicka på Standard för att återställa den aktuella PIN-kod till fabriksinställningarnas PIN-kod."]
} ,{                      
                           type: "name",
                           title: "Ange kundens PIN-KOD",
       content: [ 
                "Detta gör det möjligt att lägga till en trådlös enhet manuellt.",
                "Ange enhetens PIN-kod i fältet och klicka sedan på Connect (anslut)."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Trådlösa online",
               CONTENT: [{
                           type: "name",
                           title: "Kundnummer",
                           content: "Visar numret på den tillhörande trådlösa klienter."
                       } ,{                      
                           type: "name",
                           title: "MAC-adress",
                           content: "Visar MAC-adressen för den associerade trådlösa klienten."
                       } ,{                      
                           type: "name",
                           title: "Anslutningstyp",
                           content: "Visar det trådlösa frekvensbandet (2,4 GHz eller 5 GHz) av de associerade trådlösa klienterna."
                       } ,{                      
                           type: "name",
                           title: "Säkerhet",
                           content: "Visar den typ av säkerhet för den associerade trådlösa klienten."
                       } ,{                      
                           type: "name",
                           title: "Mottagna paket",
                           content: "Visar antalet paket som tagits emot av en trådlös klient."
                       } ,{                      
                           type: "name",
                           title: "Skickade paket",
                           content: "Visar antalet paket som skickas av den associerade trådlösa klienten."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på Uppdatera för att uppdatera informationen på den här sidan."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Trådlöst schema",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med trådlöst schema kan du deaktivera den trådlösa signalen under en viss period. Exempelvis du kan stänga av den trådlösa signalen mellan 00:00 och 07:00."
                       } ,{                      
                           type: "name",
                           title: "Trådlöst avstängd tid",
                           content: "Visar den period(er) under vilken den trådlösa signalen är avstängd.",
       children: [{                      
                           type: "step",
                           title: "För att sätta upp tid för trådlöst avstängt",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Ställ in tidsperioden under vilken du vill den trådlösa signalen skall vara avstängd.",
                "3. Välj repetitionsdagar. Du kan välja \"varje dag\" eller ange vissa dagar.",
                "4. Klicka på Spara."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Inställning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med den här funktionen kan du erbjuda Wi-Fi för gäster utan att avslöja huvud-nätverk."
                       } ,{                      
                           type: "name",
                           title: "Tillåt gäster att nå varandra",
                           content: "Markera den här kryssrutan för att tillåta de trådlösa enheterna på gäst-nätverk att kommunicera med varandra via metoder som nätverksgrannar, Samba, Ping, och FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Tillåt gäster att nå mitt lokala nätverk",
                           content: "Markera den här kryssrutan för att tillåta de trådlösa enheterna på gäst-nätverket att kommunicera med enheter som är anslutna till routerns LAN-portar eller nätverk via metoder som nätverksgrannar, Samba, Ping, och FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Trådlöst 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Aktivera Gästnätverk",
                           content: "Markera den här kryssrutan för att aktivera gästnätverkets funktioner."
                       } ,{                      
                           type: "name",
                           title: "Nätverksnamn (SSID)",
                           content: "Använd standard gästens SSID eller skapa ett nytt namn (upp till 32 tecken)."
                       } ,{                      
                           type: "name",
                           title: "Dölj SSID",
                           content: "Markera den här kryssrutan om du vill dölja gäst SSID från Wi-Fi -nätverket."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Lösenordets uppdaterings intervall",
                           content: "Välj uppdateringsintervall av gästens nätverkslösenord."
                       } ,{                      
                           type: "name",
                           title: "Säkerhet",
                           content: "När du väljer att aldrig uppdatera lösenordet väljer du ett av följande säkerhets alternativ:",
       children: [{                      
                           type: "name",
                           title: "Ingen säkerhet",
                           content: "Välj det här alternativet om du vill deaktivera trådlös säkerhet. Det är inte rekommenderat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personligt",
                           content: "Välj det här alternativet om du vill aktivera trådlös säkerhet. Det rekommenderas starkt att skydda gäest-nätverket från obehörig åtkomst. Om du väljer att konfigurera följande.",
       children: [{                      
                           type: "name",
                           title: "Version",
                           content: "Välj en säkerhetsversion. WPA2-PSK är säkrare. Om du är osäker väljer du Auto."
                       } ,{                      
                           type: "name",
                           title: "Kryptering",
                           content: "Välj en säkerhetskrypterings typ. AES är säkrare. Det rekommenderat att inte använda TKIP-kryptering om routern fungerar i 802.11n-läget. Dessutom använder TKIP inaktiverad WPS-funktionen. Om du är osäker välj Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Portal autentisering förbättrar din nätverkssäkerhet genom att begära autentisering från kunder som behöver tillfällig åtkomst till ditt trådlösa nätverk."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Skapa portal inloggning",
       content: [ 
                "1. Välj Portal för säkerhet.",
                "2. Välj enkelt lösenord för Authentication eller ingen autentisering alls.",
                "A. enkla lösenord - Ange ett lösenord för autentisering (8-16 bokstäver, siffror och _).",
                "B. Ingen autentisering - Kunderna kan få tillgång till nätverket utan verifiering.",
                "3. Välj 1 timme, 2 timmar, 4 timmar, 8 timmar eller ange alltid autentiserings timeout. När en kunds autentisering går ut, måste de att logga in igen för accessautentisering.",
                "4. (Valfritt) Aktivera omdirigering och ange den omdirigerade webbadressen som behövs. Därefter kommer en ny autentiserad klient att omdirigeras till webbadressen som du har specificerat.",
                "5. (Valfritt) Du kan också anpassa autentiseringsinloggningssida.",
                "A. Portaltitel - Upp till 31 tecken.",
                "B. Villkor för användning - Upp till 1023 tecken.",
                "C. Bild - Ladda upp en JPG eller PNG bild (mindre än 100 kB) för att anpassa logotypen.",
                "D. bakgrundsbild - Ladda upp en JPG eller PNG bild (mindre än 2MB) för att anpassa bakgrunden.",
                "6. Klicka på Save (spara)."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Lösenord",
                           content: "Skapa ett lösenord som innehåller mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Lösenord",
                           content: "Använd antingen lösenordet som genereras slumpmässigt, eller skapa ett lösenord mellan 8 och 63 ASCII-tecken eller mellan 8 och 64 hexadecimala tecken (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) beviljar specialtillverkade NAT (Network Address Translation) traversal filter ansluts till gatewayen för att stödja adress- och port-översättning för vissa applikationslager \"control/data\" protokoll: FTP, TFTP, H323, etc. ALG rekommenderas."
                       } ,{                      
                           type: "name",
                           title: "Aktivera FTP-ALG",
                           content: "Om markerad, beviljar den FTP (File Transfer Protocol) klienter och servrar att överföra data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktivera TFTP-ALG",
                           content: "Om markerad, beviljar den TFTP (Trivial File Transfer Protocol) klienter och servrar att överföra data via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktivera H323 ALG",
                           content: "Om markerad, beviljar den Microsoft NetMeeting klienter att kommunicera via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktivera RTSP ALG",
                           content: "Om markerad, tillåter den media player klienter att kommunicera med strömmande media servrar via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktivera SIP ALG",
                           content: "Om markerad, beviljar den klienten att kommunicera med SIP- (Session Initiation Protocol) servrar via NAT."
                       } ,{                      
                           type: "name",
                           title: "Aktivera PPTP-vidarekoppling",
                           content: "Om markerad, beviljar den punkt-till-punkt-sessioner att tunnlas genom ett IP-nätverk och passera genom routern."
                       } ,{                      
                           type: "name",
                           title: "Aktivera L2TP-vidarekoppling",
                           content: "Om markerad, beviljar den Layer 2 punkt-till-punkt-sessioner att tunnlas genom ett IP-nätverk och passera genom routern."
                       } ,{                      
                           type: "name",
                           title: "Aktivera IPSec-vidarekoppling",
                           content: "Med detta kan IPSec (internet Protocol security) tunnlas genom ett IP-nätverk och passera genom routern. IPSec använder kryptografiska säkerhetstjänster för att säkerställa privat och säker kommunikation över IP-nätverk."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuella servrar",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuella servrar kan användas för att konfigurera offentliga tjänster på ditt lokala nätverk. En virtuell server är definierad som en extern port, och alla förfrågningar från Internet till den externa porten dirigeras om till en tilldelad dator, som måste konfigureras med en statisk eller reserverad IP-adress.",
                "När du sätter upp en server i det lokala nätverket och vill dela den på Internet, kan virtuella servrar förverkliga tjänsten och dela ut den till Internet-användare."]
} ,{                      
                           type: "paragraph",
                           content: "Tabellen visar de relevanta parametrarna för den virtuella servern."
                       } ,{                      
                           type: "name",
                           title: "Typ av tjänst",
                           content: "Visar namnet på den virtuella servern."
                       } ,{                      
                           type: "name",
                           title: "Extern port",
                           content: "Visar numret på porten eller ett intervall av portar som används av den virtuella servern."
                       } ,{                      
                           type: "name",
                           title: "Inre IP",
                           content: "Visar IP-adressen för den dator som kör programmet."
                       } ,{                      
                           type: "name",
                           title: "Intern port",
                           content: "Visar numret på den port på datorn som kör tjänsten ansökan."
                       } ,{                      
                           type: "name",
                           title: "Protokoll",
                           content: "Visar det protokoll som används för service-programmet: TCP, UDP eller Alla (alla protokoll som stöds av routern)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Visar aktuell status (aktiverat eller inaktiverat) av den specifika filtrerande regeln."
                       } ,{                      
                           type: "name",
                           title: "Ändra",
                           content: "Visar alternativ för att ändra eller ta bort motsvarande regel."
                       } ,{                      
                           type: "step",
                           title: "Att sätta upp en virtuell server regel",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Klicka på Skanna för att välja en tjänst från listan för att automatiskt hämta lämpligt portnummer i den externa porten och interna porten. Om tjänsten inte finns, ange det externa portnummret (t.ex. 21) eller ett intervall av portar (t.ex. 21-25). Lämna den inre porten tom om det är samma som för den externa porten eller ange ett visst portnummer (t.ex. 21) om den externa porten är en enskild port. Ange IP-adressen för den dator som kör tjänsten i decimalforms-format i interna IP-fältet.",
                "3. Välj ett protokoll för service-programmet: TCP, UDP, eller alla i listrutan Protokoll.",
                "4. Välj Aktivera.",
                "5. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
       content: [ 
                "1. Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan.",
                "2. Det rekommenderas att behålla standardinställningarna för inre port och protokoll om du inte är klar över vilken port eller protokoll som ska användas.",
                "3. Om den lokala värden är värd för mer än en typ av tjänster som är tillgängliga, måste du skapa en regel för varje tjänst. Observera att extern port INTE får överlappas."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Porttriggning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Portutlösare används för att vidarebefordra trafik på en viss port till specifik server på nätverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Tabellen visar de relevanta parametrar för portutlösare."
                       } ,{                      
                           type: "name",
                           title: "Ansökan",
                           content: "Visar namnet på programmet."
                       } ,{                      
                           type: "name",
                           title: "Aktiverings porten",
                           content: "Visar den utgående trafik porten som används för att utlösa en filtrering av en utgående anslutning."
                       } ,{                      
                           type: "name",
                           title: "Trigger protokoll",
                           content: "Visar det protokoll som används för aktiverings porten. TCP, UDP eller Alla (alla protokoll som stöds av routern)."
                       } ,{                      
                           type: "name",
                           title: "Extern port",
                           content: "Visar den port eller det port-område som används av fjärrsystemet. Ett svar från en av dessa portar vidarebefordras till PC som utlöser denna regel. Du kan ange högst 5 grupper av portar (eller port avsnitte). Varje grupp av hamnar måste vara åtskilda med \" ,\" (kommatecken), till exempel, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Externa protokoll",
                           content: "Visar det protokoll som ska användas för inkommande port: TCP, UDP eller ALLA (alla protokoll som stöds av routern)."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Visar aktuell status (aktiverat eller inaktiverat) av den specifika filtrerande regeln."
                       } ,{                      
                           type: "name",
                           title: "Ändra",
                           content: "Visar alternativ för att ändra eller ta bort motsvarande regel."
                       } ,{                      
                           type: "step",
                           title: "Att sätta upp en Port Triggering regel",
       content: [{                      
                           type: "note",
                           title: "Obs",
                           content: "Varje regel kan endast användas av en värd per gång."
                       },
                "1. Klicka på Lägg till.",
                "2. Klicka på Skanna för att välja ett program från listan för att automatiskt hämta standardvärden i motsvarande fält. Om du vill lägga till en ny, ange manuellt, aktiveringsporten, utlösande protokoll, extern port och externt protokoll.",
                "3. Välj Aktivera.",
                "4. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här regeln klickar du på ikonen för glödlampan."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med DMZ (Demilitarized Zone) värd-funktion kan en lokal värd exponeras för internet för en särskild tjänst, t.ex. internet-spel och videokonferenser. DMZ kan använda en enda dator på LAN för att öppna alla sina portar. Denna styrenhet måste då konfigureras med en statisk IP-adress och har DHCP-klientfunktionen deaktiverad."
                       } ,{                      
                           type: "paragraph",
                           content: "När DMZ är aktiverat, är DMZ-värden helt synliga på internet, vilket kan medföra en viss potentiell säkerhetsrisk för datorn. Om DMZ inte används, deaktivera den i tid."
                       } ,{                      
                           type: "step",
                           title: "Tilldela en dator eller server som en DMZ-server",
       content: [ 
                "1. Välj Aktivera DMZ.",
                "2. I fältet IP-adress för DMZ-värd, ange IP-adressen till en lokal dator som DMZ-värden.",
                "3. Klicka på Spara."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Som standard är UPnP (Universal Plug-and-Play) funktionen aktiverad om du vill tillåta enheter, t.ex. datorer och internet apparater att automatiskt upptäcka och kommunicera med varandra i det lokala nätverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Du kan behöva aktivera UPnP om du vill använda applikationer för multi-spelarspel, peer-to-peer anslutningar, kommunikation i realtid (t.ex. VoIP eller teleVoIP konferens) eller fjärrassistans, etc."
                       } ,{                      
                           type: "name",
                           title: "UPnP-tjänst",
                           content: "UPnP-Service visar UPnP information av lokal värd(ar)."
                       }]
},
       MODEM :{ 
               TITLE:"Hjälp för 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modem",
                           content: "Visar statusen för 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Identifiera ISP-parametrar automatiskt",
                           content: "Den här funktionen är aktiverad som standard. Om aktiverad, kan routern identifiera internetleverantör för SIM/UIM-kort och automatiskt fylla i parametrar. Om identifieringen misslyckas, välj manuellt region och mobil internetleverantör."
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Väljer automatiskt och visar regionen när USB-modem och SIM-kortet har identifierats. Om inte välj region i listrutan."
                       } ,{                      
                           type: "name",
                           title: "Mobil INTERNET-LEVERANTÖR",
                           content: "Visar namnet på internetleverantören (ISP, Internet Service Provider) för 3G/4G-nätverket. Om nätverket inte upptäcks automatiskt väljer du ISP i rullgardinsmenyn. Förvalt uppringningsnummer och APN fylls i automatiskt."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Om SIM/UIM-skydd är aktiverat måste du ange PIN-koden. SIM/UIM-skydd är inaktiverat som standard. Observera att om du anger ogiltig PIN 3 gånger, så kommer SIM/UIM-kort att låsas automatiskt. Du kan bara låsa upp den genom att ange PUK-koden från den stationära/bärbara datorn."
                       } ,{                      
                           type: "name",
                           title: "Meddelande",
                           content: "Visar PIN information av SIM/UIM-kort om PIN-skydd är aktiverat."
                       } ,{                      
                           type: "name",
                           title: "Inställning Slå nummer,APN,Användarnamn/lösenord",
                           content: "Om internetleverantören inte visas i listan <strong>mobilt internet</strong>, markera kryssrutan och ange snabbvalsnumret, APN (Access Point Name), användarnamn och lösenord som du fått av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Slå nummer",
                           content: "Ange snabbvalsnumret från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Ange APN (Access Point Name) som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange det användarnamn och lösenord som du fått från internetleverantören. Dessa fält är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "Anslut på begäran",
                           content: "I det här läget kommer Internet anslutning att avslutas automatiskt efter en viss tid av inaktivitet (maximal vilotid) har gått. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Det kan hända att anslutningen inte kan kopplas ner trots att du angett max. inaktivitetstid. Detta beror på att program försöker komma åt Internet i bakgrunden."
                       } ,{                      
                           type: "name",
                           title: "Anslut automatiskt",
                           content: "I det här läget återupprättas internetanslutningen automatiskt så fort den kopplas ner."
                       } ,{                      
                           type: "name",
                           title: "Anslut manuellt",
                           content: "I det här läget kan du klicka på knappen Anslut eller Koppla ner för att kontrollera internetanslutningen manuellt. Det här läget stöder också funktionen Max. inaktivitetstid. Ange en maximal tidsperiod (i minuter) i rutan Max. inaktivitetstid som internetanslutningen får vara inaktiv innan den kopplas ner. Förvalt värde är 15 minuter. Om du vill att internetanslutningen aldrig ska koppla ner anger du 0 (noll) i rutan."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Det kan hända att anslutningen inte kan kopplas ner trots att du angett max. inaktivitetstid. Detta beror på att program försöker komma åt Internet i bakgrunden."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på knappen Spara för att spara inställningarna."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Hjälp för avancerade 3G/4G-inställningar",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modem",
                           content: "Visar statusen för 3G/4G USB-modemet."
                       } ,{                      
                           type: "name",
                           title: "Identifiera ISP-parametrar automatiskt",
                           content: "Den här funktionen är aktiverad som standard. Om aktiverad, kan routern identifiera internetleverantör för SIM/UIM-kort och automatiskt fylla i parametrar. Om identifieringen misslyckas, välj manuellt region och mobil internetleverantör."
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Väljer och visar automatiskt regionen när USB-modem och SIM-kortet har identifierats. Om inte, välj region i listrutan."
                       } ,{                      
                           type: "name",
                           title: "Mobil INTERNET-LEVERANTÖR",
                           content: "Visar namnet på internetleverantören (ISP, Internet Service Provider) för 3G/4G-nätverket. Om nätverket inte upptäcks automatiskt väljer du ISP i rullgardinsmenyn. Förvalt uppringningsnummer och APN fylls i automatiskt."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Om SIM/UIM-skydd är aktiverat måste du ange PIN-koden. SIM/UIM-skydd är inaktiverat som standard. Observera att om du anger ogiltig PIN 3 gånger, så kommer SIM/UIM-kort att låsas automatiskt. Du kan bara låsa upp den genom att ange PUK-koden från den stationära/bärbara datorn."
                       } ,{                      
                           type: "name",
                           title: "Meddelande",
                           content: "Visar PIN information av SIM/UIM-kort om PIN-skydd är aktiverat."
                       } ,{                      
                           type: "name",
                           title: "Inställning Slå nummer,APN,Användarnamn/lösenord",
                           content: "Om internetleverantören inte visas i listan <strong>mobilt internet</strong>, markera kryssrutan och ange snabbvalsnumret, APN (Access Point Name), användarnamn och lösenord som du fått av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Slå nummer",
                           content: "Ange snabbvalsnumret från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Ange APN (Access Point Name) som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange det användarnamn och lösenord som du fått från internetleverantören. Dessa fält är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "Anslut på begäran",
                           content: "I det här läget kommer Internet anslutning att avslutas automatiskt efter en viss tid av inaktivitet (maximal vilotid) har gått. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Det kan hända att anslutningen inte kan kopplas ner trots att du angett max. inaktivitetstid. Detta beror på att program försöker komma åt Internet i bakgrunden."
                       } ,{                      
                           type: "name",
                           title: "Anslut automatiskt",
                           content: "I det här läget återupprättas internetanslutningen automatiskt så fort den kopplas ner."
                       } ,{                      
                           type: "name",
                           title: "Anslut manuellt",
                           content: "I det här läget kan du klicka på knappen Anslut eller Koppla ner för att kontrollera internetanslutningen manuellt. Det här läget stöder också funktionen Max. inaktivitetstid. Ange en maximal tidsperiod (i minuter) i rutan Max. inaktivitetstid som internetanslutningen får vara inaktiv innan den kopplas ner. Förvalt värde är 15 minuter. Om du vill att internetanslutningen aldrig ska koppla ner anger du 0 (noll) i rutan."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Det kan hända att anslutningen inte kan kopplas ner trots att du angett max. inaktivitetstid. Detta beror på att program försöker komma åt Internet i bakgrunden."
                       } ,{                      
                           type: "name",
                           title: "Autentiseringstyp",
                           content: "Välj en autentiseringstyp. Standardinställningen är Auto. Vissa internetleverantörer kräver en viss typ av autentisering, bekräfta det med internetleverantören eller behåll standardinställningarna."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Om Auto (standard), bestämmer router automatiskt vilken typ av autentisering som används av leverantören."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Om PAP (Password Authentication Protocol) väljs, autentiserar routern genom att peer använder två handskakningar. Välj det här alternativet om internetleverantören kräver denna autentiseringstyp."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Om CHAP (Challenge Handshake Authentication Protocol) väljs autentiserar routern genom att peer använder två handskakningar och godkänner peers identitet periodvis. Välj det här alternativet om internetleverantören kräver denna autentiseringstyp."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard MTU (Maximum Transmission Unit) -storlek är 1480 bytes. Ändra inte det inte krävs av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Använd följande DNS-servrar",
                           content: "Om internetleverantör erbjuder DNS server IP-adresser, markera kryssrutan och ange nedan IP-adresserna för <strong>primär DNS</strong> och sekundär DNS (valfritt). Annars kommer DNS-servrar att tilldelas dynamiskt från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Primär DNS",
                           content: "Ange DNS-IP-adress i decimalform med punkter som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Sekundär DNS",
                           content: "(Valfritt) Ange en annan DNS IP-adress i decimalform med punkter som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på <strong>Spara</strong> om du vill spara inställningarna."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Inställning enhet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Enhetens inställningssida visar information om anslutna USB-lagringsenhet via USB-porten."
                       } ,{                      
                           type: "name",
                           title: "Skanna",
                           content: "Vanligtvis, upptäcker routern automatiskt nya enheter. Om inte, klicka på den här knappen för att söka efter eventuella nya anslutna enheter och uppdatera sidan med den uppdaterade informationen."
                       } ,{                      
                           type: "name",
                           title: "Volume",
                           content: "Visar namnet på USB-disk."
                       } ,{                      
                           type: "name",
                           title: "Kapacitet",
                           content: "Visar den totala lagringskapaciteten för USB."
                       } ,{                      
                           type: "name",
                           title: "Ledigt utrymme",
                           content: "Visar tillgängliga lediga lagringsutrymme."
                       } ,{                      
                           type: "name",
                           title: "Säker borttagning",
                           content: "Klicka på den här knappen för att säkert ta bort USB-lagringsenheten innan du kopplar bort den från routern."
                       } ,{                      
                           type: "paragraph",
                           content: "Knappen ta bort visas bara när en USB-lagringsenhet är ansluten till routern. När den aktuella volymen är upptagen kan du inte ta bort den."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Den här kryssrutan visas bara när det finns en USB-lagringsenhet som är ansluten till routern. Välj för att aktivera fildelning i USB-enheten."
                       } ,{                      
                           type: "step",
                           title: "Att sätta upp en filserver",
       content: [ 
                "1. Anslut USB-lagringsenheten till USB-porten på routern med en USB-kabel.",
                "2. Den nyligen anslutna USB-enheten detekteras automatiskt av routern och visas under Device Settings. Om inte, klicka på Skanna.",
                "3. Välj Aktiv för att aktivera fildelning."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Konto för delning",
               CONTENT: [{
                           type: "name",
                           title: "Konto",
                           content: "Du kan antingen välja att använda standard konto för inloggning till delade filer och mappar eller använd ett nytt konto och ange följande för att skapa ett nytt användarkonto."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange ett användarnamn som innehåller mellan 1 och 15 alfanumeriska tecken och understreck och ett lösenord som innehåller mellan 1 och 15 ASCII-teclen. Dessa rutor är skiftlägeskänsliga."
                       } ,{                      
                           type: "name",
                           title: "Bekräfta lösenord",
                           content: "Ange lösenordet på nytt för att bekräfta att det inte finns skrivfel. Det här fältet är också skiftlägeskänsligt."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på Spara för att spara alla inställningar."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Mappdelning",
               CONTENT: [{
                           type: "name",
                           title: "Nätverk/Media Server namn",
                           content: "Visar det namn som används för att få åtkomst till den anslutna USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Aktivera",
                           content: "Markera för att aktivera metoden."
                       } ,{                      
                           type: "name",
                           title: "Acessmetod",
                           content: "Det finns tre metoder för att tillåta åtkomst till den anslutna USB-lagringsenheten. Du kan välja ett eller flera metoder genom att markera motsvarande kryssruta.",
       children: [{                      
                           type: "name",
                           title: "Nätverksomgivning",
                           content: "Om aktiverad, kan användare i nätverket få åtkomst till USB-lagringsenheten med hjälp av en tilldelad IP-adress (t.ex. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Om aktiverad, kan FTP-klient på det lokala nätverket få åtkomst till USB-lagringsenheten med hjälp av den tilldelade IP-adressen, följt av FTP-serverns portnummer (t.ex. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "Om det är aktiverat, kan användare med fjärråtkomst nå till USB-lagringsenhet via FTP över Internet. Den här funktionen stöder både hämta och överföra filer. För att ändra på FTP-serverns portnummer, ange ett portnummer och klicka på Spara för att spara ändringarna."
                       }]
} ,{                      
                           type: "name",
                           title: "Länk",
                           content: "Visar den adress som används för att få åtkomst till den delade USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Visar FTP-serverns portnummer. Använd det förvalda värdet 21 eller ett värde mellan 1024 och 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på Spara för att spara alla inställningar."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Mappdelningar",
               CONTENT: [{
                           type: "name",
                           title: "Dela alla",
                           content: "Slå på för att dela alla filer och mappar eller Av för att bara dela valda mappar."
                       } ,{                      
                           type: "name",
                           title: "Aktivera autentisering",
                           content: "Det rekommenderas starkt att aktivera autentisering för att få användare att ange giltiga användarnamn och lösenord för att få åtkomst till delade mappar."
                       } ,{                      
                           type: "name",
                           title: "Mappnamn",
                           content: "Visar namnet på den delade mappen."
                       } ,{                      
                           type: "name",
                           title: "Sökväg",
                           content: "Visar sökvägen till den delade mappen."
                       } ,{                      
                           type: "name",
                           title: "Mediedelning",
                           content: "Anger om den delade mappen är tillåtna för mediedelning eller inte."
                       } ,{                      
                           type: "name",
                           title: "Volymnamn",
                           content: "Visar namnet på den delade volymen."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Visar status för den delade mappen genom att lampan tänds eller släks."
                       } ,{                      
                           type: "name",
                           title: "Ändra",
                           content: "Visar alternativ för att ändra eller ta bort motsvarande delad mapp."
                       } ,{                      
                           type: "name",
                           title: "Bläddra",
                           content: "Klicka här för att söka efter en gemensam mapp."
                       } ,{                      
                           type: "name",
                           title: "Ge gäst tillgång till nätverket",
                           content: "Välj för att tillåta klienter på gäst nätverket åtkomst till delade mappar."
                       } ,{                      
                           type: "name",
                           title: "Aktivera autentisering",
                           content: "Välj för att kräva ett giltigt användarnamn och lösenord av användare för att få åtkomst till delade mappar."
                       } ,{                      
                           type: "name",
                           title: "Aktivera skrivåtkomst",
                           content: "Välj för att tillåta användare att göra ändringar i mapp innehållet."
                       } ,{                      
                           type: "name",
                           title: "Aktivera mediedelning",
                           content: "Välj för att aktivera mediedelning."
                       } ,{                      
                           type: "name",
                           title: "Uppdatera",
                           content: "Klicka på för att uppdatera listan på delade mappar."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Skrivar-server",
               CONTENT: [{
                           type: "name",
                           title: "Skrivar-server",
                           content: "Växla för att aktivera funktionen skrivar-server."
                       } ,{                      
                           type: "name",
                           title: "Skrivarnamn",
                           content: "Visar namnet på den skrivare som är ansluten till routern."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine säkerhetskopierar alla filer på din Mac till en USB-lagringsenhet som är ansluten till din modem-router."
                       } ,{                      
                           type: "name",
                           title: "Aktivera",
                           content: "Markera kryssrutan för att aktivera funktionerna."
                       } ,{                      
                           type: "name",
                           title: "Disk för säkerhetskopia",
                           content: "Välj en plats för säkerhetskopiorna på Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Storleksbegränsning för säkerhetskopior ",
                           content: "Fördela hur mycket diskutrymme som kan användas för Time Machine. 0 betyder ingen gräns."
                       } ,{                      
                           type: "name",
                           title: "spara",
                           content: "Klicka för att spara dina inställningar."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline-hämtning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med Offline-nedladdning aktiverad kan routern ladda ner filer utan att hålla datorn påslagen hela tiden."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Växla till PÅ för att möjliggöra funktionen nedladdning offline."
                       } ,{                      
                           type: "name",
                           title: "Sökväg",
                           content: "Välj en sökväg för att spara eller cacha nedladdningar.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "Ändra inte sökvägen eller avaktivera USB-lagringsenheten under uppladdning och nedladdning av filar; annars kan vissa allvarliga fel uppstå."
                       }]
} ,{                      
                           type: "name",
                           title: "Schema",
                           content: "Markera kryssrutan för att aktivera schema funktion som låter dig specificera tid(er) för nedladdning-/uppladdning."
                       } ,{                      
                           type: "name",
                           title: "Fortsätt uppladdning efter uppgiften avslutats",
                           content: "Markera kryssrutan för att fortsätta att till andra överföra data från slutförd nedladning(ar)."
                       } ,{                      
                           type: "name",
                           title: "Maximalt antal aktiva nedladdningar",
                           content: "Ange ett värde mellan 1 och 10 för att ställa in maximalt antal aktiva nedladdningar. Standardvärdet är 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Nedladdningar",
               CONTENT: [{
                           type: "note",
                           title: "Filen",
                           content: "Visar namn och typ av nedladdningsfil."
                       } ,{                      
                           type: "note",
                           title: "Hastighet",
                           content: "Visar aktuell hastighet för ned- (eller uppladdning)."
                       } ,{                      
                           type: "note",
                           title: "Fullbordat",
                           content: "Visar nedladdningsförlopp."
                       } ,{                      
                           type: "note",
                           title: "Återstående tid",
                           content: "Visar återstående tid av nedladdningen."
                       } ,{                      
                           type: "note",
                           title: "Anslutna Peers",
                           content: "Visar antalet anslutna peers av nedladdningen."
                       } ,{                      
                           type: "note",
                           title: "Status",
                           content: "Visar aktuell status för nedladdning (nedladdning, väntar, sår, paus, avslutad eller fel)."
                       } ,{                      
                           type: "name",
                           title: "Lägg till en ny nedladdning",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Välj källa för nedladdning, torrent från PC, torrent från USB eller webbadress.",
                "3. Välj torrent-plats för BT, eller ange webbadressen för FTP, HTTP och aMule.",
                "4. Klicka på Spara.",
                "5. För aMule ange aMule serverns IP-adress och port under Advanced> aMule Server."]
}]
} ,{                      
                           type: "name",
                           title: "Tag bort nedladdningar",
                           content: "Markera motsvarande kryssruta för nedladdning(ar) som du vill ta bort och klicka sedan på Ta Bort ovanför tabellen."
                       } ,{                      
                           type: "name",
                           title: "Pausa nedladdningar",
                           content: "Klickar du på motsvarande kryssruta i nedladdning(ar) som du vill pausa och klicka därefter på Paus ovanför tabellen."
                       } ,{                      
                           type: "name",
                           title: "Återuppta nedladdningar",
                           content: "Klicka på motsvarande kryssruta i nedladdning(ar) som du vill återuppta och klicka sedan på Återuppta ovanför tabellen."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avancerad",
               CONTENT: [{
                           type: "name",
                           title: "Hastighetsgräns",
                           content: "Ange det maximala nedladdnings- och uppladdningshastigheten för internet-anslutningen."
                       } ,{                      
                           type: "name",
                           title: "Maximal nedladdningstid",
                           content: "Ange ett värde mellan 1 och 100 000 kB/s för att ställa in maximal hämtningshastighet. Standardvärdet är 1024."
                       } ,{                      
                           type: "name",
                           title: "Maximal uppladdningstid",
                           content: "Ange ett värde mellan 1 och 100 000 kB/s för att ange maximal uppladdningshastighet. Standardvärdet är 512."
                       } ,{                      
                           type: "name",
                           title: "Antal anslutningar",
                           content: "Ange det maximala antalet anslutningar."
                       } ,{                      
                           type: "name",
                           title: "Maximalt antal anslutningar",
                           content: "Ange ett värde mellan 1 och 200 för att ange globala maximala antal anslutningar. Standardvärdet är 100."
                       } ,{                      
                           type: "name",
                           title: "Maximalt antal anslutna peers per torrent",
                           content: "Ange ett värde mellan 1 och 100 för att ställa in maximalt antal anslutna peers per torrent. Standardvärdet är 50."
                       } ,{                      
                           type: "name",
                           title: "Aktivera DHT-nätverk",
                           content: "Aktivera den här funktionen för att förbättra effektiviteten för att hitta kollegor så att du kan öka nedladdninghastighet."
                       } ,{                      
                           type: "name",
                           title: "Aktivera peer-trafik",
                           content: "Aktivera den här funktionen för att förbättra kommunikationens effektivitet bland gruppens medarbetare så att du kan öka nedladdninghastighet."
                       } ,{                      
                           type: "name",
                           title: "Aktivera BitTorrent protokoll-kryptering",
                           content: "Aktivera den här funktionen för att stärka integritet och sekretess under processen för dataöverföring."
                       } ,{                      
                           type: "name",
                           title: "aMule-server",
                           content: "Ange IP-adress och port för aMule-server. aMule nedladdning fungerar endast när routern är ansluten till servern."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Föräldrakontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med föräldrakontroll kan du blockera olämpliga, uttryckliga och skadliga webbplatser; begränsa åtkomst under vissa tider på dagen (exempelvis Facebook eller YouTube under läxtid)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Enheter med föräldrakontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar information och inställningar av enheter som är begränsade av föräldrakontroll."
                       } ,{                      
                           type: "step",
                           title: "Att begränsa möjligheterna för en ny klient enheten",
       content: [ 
                "1. Slå på föräldrakontroll.",
                "2. Klicka på Lägg till.",
                "3. Klicka på Skanna för att välja en ansluten enhet från listan över enheter, eller ange manuellt enhetens namn och MAC-adress för att lägga till en enhet som inte är ansluten.",
                "4. Klicka på ikonen effektiv tid för att ange en tidsperiod under vilken restriktioner gäller.",
                "5. Ange en kort beskrivning i fältet Beskrivning. Det här fältet är valfritt.",
                "6. Välj Åktivera Posten.",
                "7. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Restriktioner",
               CONTENT: [{
                           type: "paragraph",
                           content: "Innehållsbegränsning beviljar dig begränsad tillgång till specifika webbplatser med hjälp av nyckelord och domännamn. Klientenheten styrs av föräldrakontroll villka som kan eller inte kan få tillgång till dessa webbplatser beroende på vilka restriktioner som du väljer."
                       } ,{                      
                           type: "step",
                           title: "Specificera innehåll att nå",
       content: [ 
                "1. Växla Innehållsbegränsning.",
                "2. Välj begränsningsregler enligt behov:",
                "A. Om du vill att kontrollerade enheter har tillgång till alla webbplatser utom vissa, välj blacklist.",
                "B. Om du vill att kontrollerade enheter bara har tillgång till vissa webbplatser, välj Whitelist.",
                "3. Klicka på Add a New Keyword (lägg till ett nytt sökord) för att lägga till en webbadress nyckelord (t.ex. wikipedia) eller domännamn till blacklisten eller till whitelistan.",
                "4. Klicka på Spara."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) hjälper till att prioritera internettrafik baserat på behov. Du kan i QoS-regler ange prioritet för en enhet, en fysisk port, eller en applikation."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Obs",
                           content: "Om NAT Boost är aktiverat bör QoS avaktiveras."
                       } ,{                      
                           type: "name",
                           title: "Hastighet uppladdning",
                           content: "Ange max uppladdningsbandbredd som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Hastighet nedladdning",
                           content: "Ange det maximala nedladdningbandbredd tillhandahålls av internetleverantören."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avancerad",
               CONTENT: [{
                           type: "name",
                           title: "Hög/medel/låg prioritet",
                           content: "Ange en procentsats för hög/mellan/låg prioritets-trafik.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "Det maximala beloppet (i procent) av samtliga prioriteringar är 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS regellista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Här kan du lägga till detaljerade QoS-regler till proriterad internettrafik."
                       } ,{                      
                           type: "step",
                           title: "Sätt upp QoS-regler",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Välj en prioritetstyp att lägga till QoS-regeln.",
                "Genom Enhet - klicka på skanna för att välja önskad enhet eller manuellt ange ett namn för enheten och dess MAC-adress.",
                "Med applikation - Välj önskad applikation eller anpassa en applikation genom att konfigurera namn, protokoll och destinationsport (på 1-65535). Du kan ange en enskild port eller flera portar eller port-område, separerade med kommatecken (t.ex. 21,36-105,111).",
                "Genom fysisk port - Välj önskad port.",
                "3. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Du kan dra en regel bland olika prioriteringslistor för att ändra dess prioritet."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Uppgradering databas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vi kommer att publicera den senaste databas-version på www.tp-link.com. Du kan hämta och uppdatera routerns databas för att utvidga de applikationer som stöds."
                       } ,{                      
                           type: "name",
                           title: "Ny databas fil",
                           content: "Klicka på Bläddra för att hitta senaste databasfil. Markera den och klicka på uppgradera för att uppgradera databasen till den senaste versionen."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Brandvägg",
               CONTENT: [{
                           type: "name",
                           title: "SPI-brandvägg",
                           content: "SPI (Stateful Packet Inspection) brandvägg förhindrar cyberattacker och kontrollerar den trafik som passerar genom routern baserat på protokollet. Som standard är denna funktion aktiverad."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS skydd",
               CONTENT: [{
                           type: "name",
                           title: "DoS skydd",
                           content: "DoS (Denial of Service) skyddar nätverket mot DoS-attacker från översvämning av nätverket med server-begäran. Du kan filtrera följande tre typer av angrepp enligt behov. Det finns fyra nivåer för varje filtrering:",
       children: [{                      
                           type: "name",
                           title: "Avstängd",
                           content: "Inget skydd."
                       } ,{                      
                           type: "name",
                           title: "Låg",
                           content: "Låg nivå av skydd och låg inverkan på routern."
                       } ,{                      
                           type: "name",
                           title: "Mellan",
                           content: "Måttlig skyddsnivå och delvis märkbar prestandaeffekt på routern."
                       } ,{                      
                           type: "name",
                           title: "Hög",
                           content: "Hög skyddsnivå men märkbar prestandaeffekt på routern."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD atackfiltrering",
                           content: "Aktivera för att förhindra ICMP (internet Control Message Protocol) översvämnings-attack."
                       } ,{                      
                           type: "name",
                           title: "UDP-Attack ÖVERSVÄMNING filtrering",
                           content: "Aktivera för att förhindra UDP (User Datagram Protocol) översvämningsattack."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-Attack ÖVERSVÄMNING filtrering",
                           content: "Aktivera för att förhindra TCP SYN (Transmissionsstyrning Protocol-Synchronize) översvämningsattack."
                       } ,{                      
                           type: "name",
                           title: "Ignorera ping-paket från WAN-porten",
                           content: "Aktivera för att ignorera ping paket från WAN-porten."
                       } ,{                      
                           type: "name",
                           title: "Förbjud ping -paket från LAN-porten",
                           content: "Att förbjuda ping paket från LAN-port."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Blockerad DoS Host List",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar IP-adress och MAC-adress av blockerad DoS värd(ar)."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Åtkomstkontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Access Control används för att tillåta eller blockera specifika enheter att nå nätverket. När en enhet är blockerad, kan den inte kommunicera med andra enheter eller ansluta till internet."
                       } ,{                      
                           type: "step",
                           title: "Kontrollare tillgång",
       content: [ 
                "1. Växla till PÅ för att aktivera kontroll av åtkomsten.",
                "2. Om du också vill styra åtkomst för de enheter som är anslutna till nätverket, växla till PÅ Gäst-enheter.",
                "3. Välj ett läge för åtkomst enligt behov och klicka på Spara.",
                "A. Om du vill blockera åtkomst från enheter i listan nedan, välj Blacklist.",
                "B. Om du vill tillåta åtkomst endast från enheterna i listan nedan, välj Whitelist.",
                "4. I Enheter i Blacklist/Whitelist, klicka på Lägg till. Ange enhetens namn och MAC-adressen för enheten. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Enheter online",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar information för alla anslutna enheter (inklusive enheter som är anslutna till nätverket om kontroll av gästenheter är aktiverad)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC bindning",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP- och MAC-bindningen (även känd som ARP-bindning) är användbar för att kontrollera tillgång till en specifik enhet i nätverket genom att binda IP-adress och MAC-adressen för enheten. IP- och MAC-bindande förhindrar även andra enheter från en viss IP-adress."
                       } ,{                      
                           type: "step",
                           title: "Sätt upp enhet med IP & MAC-bindning",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Ange MAC-adressen för enheten.",
                "3. Ange en IP-adress som du vill binda till ovanstående MAC-adress.",
                "4. Välj Aktivera.",
                "5. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
       content: [ 
                "1. Du kan inte binda samma IP-adress till mer än en MAC-adress.",
                "2. Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP-lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar MAC-adress och IP-adress för anslutna enheten(erna)."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (internet Protocol version 6) är den senaste versionen av IP (internet Protocol) och behandlar problemet med att IPv4 (internet Protocol version 4) adresser tar slut."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: Dynamisk IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamisk IP",
                           content: "Välj den här typen om internetleverantören använder dynamisk IPv6-adresstilldelning."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adress/Primary DNS/Sekundär DNS",
                           content: "Dessa parametrar tilldelas automatiskt av en DHCPv6-server från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Förnya",
                           content: "Klicka för att få nya IPv6-parametrar från en DHCPv6-server hos internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Släpp",
                           content: "Klicka för att frigöra alla IPv6-adresser som tilldelats av en DHCPv6-server från internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Få IPv6-adress",
                           content: "Välj DHCPv6 för att få en icke-tillfällig IPv6-adress eller SLAAC för att få en IPv6-adress genereras från routerns annonspaket enligt internetleverantör."
                       } ,{                      
                           type: "name",
                           title: "Prefixdelegering",
                           content: "Välj aktivera om du vill få ett prefix av DHCPv6-server från ISP, eller Disable (deaktivera) för att manuellt ange ett adressprefix. Klienter i nätverket kommer att generera en IPv6 adress med detta prefix."
                       } ,{                      
                           type: "name",
                           title: "DNS-adress",
                           content: "Välj hämta dynamiskt från internetleverantör eller använd följande DNS-adresser. Om använd följande DNS-adresser är vald, välj manuellt DNS-adress som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: Statisk IP"
                       } ,{                      
                           type: "name",
                           title: "Statisk IP-adress",
                           content: "Välj den här typen om internetleverantören använder statiska IPv6-adresstilldelning."
                       } ,{                      
                           type: "name",
                           title: "IPv6 adress/Default Gateway/Primary DNS/Sekundär DNS",
                           content: "Ange dessa parametrar som tillhandahålls av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "MTU-storlek",
                           content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 bytes. Det är inte rekommenderat att ändra MTU-storlek om det inte krävs av Internet-leverantören."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: 6till4 tunnel"
                       } ,{                      
                           type: "name",
                           title: "6till4 tunnel",
                           content: "Välj den här typen om internetleverantören använder 6to4 deployment för att tilldela adressen."
                       } ,{                      
                           type: "name",
                           title: "IPv4-adress/IPv4-subnät Mask/IPv4 Default Gateway/Tunnel adress",
                           content: "Dessa parametrar kommer att vara dynamiskt genererade av IPv4 information från WAN-porten när du klickar du på Anslut."
                       } ,{                      
                           type: "name",
                           title: "Använd följande DNS-server",
                           content: "Välj för att manuellt ange den primära DNS och/eller sekundära DNS som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Anslut",
                           content: "Klicka för att ansluta till internet."
                       } ,{                      
                           type: "name",
                           title: "Koppla loss",
                           content: "Klicka här för att koppla bort internet."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Välj den här typen om internetleverantören använder PPPoEv6 och erbjuder ett användarnamn och lösenord."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn/lösenord",
                           content: "Ange dessa parametrar som tillhandahålls av Internet-leverantören."
                       } ,{                      
                           type: "name",
                           title: "IPv6-adress",
                           content: "Denna adress kommer att tilldelas automatiskt av en DHCPv6-server från internetleverantör, när du anger användarnamn och lösenord och klicka på Anslut."
                       } ,{                      
                           type: "name",
                           title: "Få IPv6-adress",
                           content: "Välj DHCPv6 för att få en icke-tillfällig IPv6-adress eller SLAAC för att få en IPv6-adress genereras från routerns annonspaket eller som erbjuds av internetleverantör för att manuellt ange IPv6-adress."
                       } ,{                      
                           type: "name",
                           title: "Prefixdelegering",
                           content: "Välj aktivera om du vill få ett prefix av DHCPv6-server från ISP, eller Disable (deaktivera) för att manuellt ange ett adressprefix. Klienter i nätverket kommer att generera en IPv6 adress med detta prefix."
                       } ,{                      
                           type: "name",
                           title: "DNS-adress",
                           content: "Välj att få dynamiskt från internetleverantör eller använd följande DNS-adresser. Om använd följande DNS-adresser är vald, ange manuellt DNS-adress som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Anslut",
                           content: "Klicka för att ansluta till internet."
                       } ,{                      
                           type: "name",
                           title: "Koppla loss",
                           content: "Klicka här för att koppla bort internet."
                       } ,{                      
                           type: "title",
                            title: "Typ av Internet-anslutning: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Välj den här typen om internetleverantören använder Pass-Through (Bridge) i nätverket. Ingen konfiguration krävs för denna typ av anslutning."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Utom för internet-anslutning av typen Pass-Through (Bridge), kräver andra typer av internet-anslutning IPv6-konfiguration."
                       } ,{                      
                           type: "name",
                           title: "Tilldelad typ",
                           content: "Välj en lämplig enligt internetleverantör.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Att automatiskt tilldela IP-adresser till klienter i nätverket.",
       children: [{                      
                           type: "name",
                           title: "Adress Prefix",
                           content: "Ange adress prefix som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Frigör tid",
                           content: "Det är giltigt för den tilldelade IP-adressen. Antingen behåller du standardvärdet 86400 sekunder eller ändrar om det krävs av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Adress",
                           content: "Det är IP-adressen som tilldelas automatiskt av en DHCPv6-server hos internetleverantören."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+statslösa DHCP",
       children: [{                      
                           type: "name",
                           title: "Adress Prefix",
                           content: "Ange adress prefix som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Adress",
                           content: "Det är IP-adressen som automatiskt tilldelas av Internet-leverantören."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Adress Prefix",
                           content: "Ange adress prefix som tillhandahålls av internetleverantören."
                       } ,{                      
                           type: "name",
                           title: "Adress",
                           content: "Det är IP-adressen som automatiskt tilldelas av Internet-leverantören."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC-kloníng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Välj lämplig MAC Clone metod som du behöver."
                       } ,{                      
                           type: "name",
                           title: "Klona inte MAC-adressen",
                           content: "Ändra INTE routerns MAC-adress, om inte internetleverantören binder den tilldelade IP-adressen till MAC-adressen."
                       } ,{                      
                           type: "name",
                           title: "Klona nuvarande dator MAC-adress",
                           content: "Markera och kopiera den aktuella MAC-adressen till den dator som är ansluten till routern, om ISP binder den tilldelade IP-adressen för datorns MAC-adress."
                       } ,{                      
                           type: "name",
                           title: "Använd egen MAC-adress",
                           content: "Ange MAC-adressen manuellt, i fall ISP binder den tilldelade IP-adressen till en specifik MAC-adress."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Inställningar tid",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med tids-inställningar kan du konfigurera systemet för routern. En gång modifierat, kommer systemet att tillämpas för tids-baserade funktioner och konfigurationer som föräldrakontroll."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Du kan växla för att aktivera 24-timmars tid innan konfiguration, vilket kommer att tillämpas på system-baserade funktioner och konfigurationer."
                       } ,{                      
                           type: "title",
                            title: "Systemtid"
                       } ,{                      
                           type: "step",
                           title: "Hämta tid från internet",
       content: [ 
                "Vald som standard, med Få från internet kan du hämta systemtiden från internet.",
                "1. Välj hämta från internet.",
                "2. Välj lokal tidszon i listrutan.",
                "3. I fältet NTP-server anger du IP-adressen eller domännamnet för önskad NTP-server.",
                "4. I NTP-server II anger du IP-adressen eller domännamnet för den andra NTP-servern. (Tillval)",
                "5. Klicka på Hämta.",
                "6. Klicka på Save (spara)."]
} ,{                      
                           type: "step",
                           title: "Hämta tid från PC",
       content: [ 
                "Med den här funktionen kan du få systemtid från datorn. Godkänn datorns tid före konfiguration.",
                "Välj Hämta från dator och klicka på spara."]
} ,{                      
                           type: "step",
                           title: "Ställ in tid manuellt",
       content: [ 
                "Om enheten inte automatiskt få tid från internet eller en dator, kan du manuellt konfigurera systemtiden.",
                "1. Välj manuellt.",
                "2. Ange aktuellt datum och klockslag.",
                "3. Klicka på Spara."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Sommartid",
                           content: "Den här funktionen kan automatiskt synkronisera systemtid med sommartid."
                       } ,{                      
                           type: "step",
                           title: "Att ställa in sommartid",
       content: [ 
                "1. Välj Aktivera Enable Daylight Sommartid.",
                "2. Ange en tidsperiod av sommartid i lokala tidszon.",
                "3. Klicka på Spara."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnostik",
               CONTENT: [{
                           type: "paragraph",
                           content: "Routern ger Ping och Traceroute verktyg som hjälper dig att felsöka nätverksproblem."
                       } ,{                      
                           type: "title",
                            title: "Ping & traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping-verktyget skickar paket till en mål-IP-adress eller domännamnet och loggar resultaten, som antal paket som skickas och mottas, och tiden det tog."
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute verktyget skickar paket till en mål-IP-adress eller domännamnet och visar antalet hopp och tid för att nå destinationen."
                       } ,{                      
                           type: "paragraph",
                           content: "Du kan pinga eller tracerouta en lokal enhets IP-adress eller ett domännamn, såsom tp-link.com, yahoo.com, osv."
                       } ,{                      
                           type: "step",
                           title: "Att diagnostisera med Ping",
       content: [ 
                "1. Välj Ping som felsökningsverktyget.",
                "2. Ange mål-IP-adress eller domännamn.",
                "3. Klicka på pilen för att öppna menyn Avancerat och ange Ping antal och Ping paketstorlek. (valfritt)",
                "4. Klicka på Start."]
} ,{                      
                           type: "step",
                           title: "Att diagnostisera med Traceroute",
       content: [ 
                "1. Välj Traceroute som felsökningsverktyget.",
                "2. Ange mål-IP-adress eller domännamn.",
                "3. Klicka på pil-ikonen för att öppna menyn avancerat och ange antalet hopp (som skall nås) i fältet Traceroute Max TTL (tid att leva). Standardvärdet är 20. (valfritt)",
                "4. Klicka på Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Portövervakning"
                       } ,{                      
                           type: "paragraph",
                           content: "Portspegling hänvisar till processen av exemplar av datapaket från en speglad port till en speglande port. Vanligen är den speglande porten ansluten till en data diagnostiseringsenhet, som används för att analysera de speglade paketen för övervakning och felsökning av nätverket."
                       } ,{                      
                           type: "step",
                           title: "Sänd kopior av paket till vald port",
       content: [ 
                "1. Aktivera portspegling.",
                "2. Välj önskad portar som speglade portar.",
                "3. Välj önskad port som speglande port.",
                "4. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "En port kan inte samtidigt vara speglad och speglande port."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Uppgradering firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uppgradering av firmware uppdaterar routerns med nya funktioner eller bug-fixar. Det rekommenderas att uppgradera routern med den senaste programvaran för att få bästa prestanda."
                       } ,{                      
                           type: "step",
                           title: "Obs. följande hjälper dig att undvika uppgraderingfel:",
       content: [ 
                "Innan du uppgraderar",
                "1. Se till att du har en stabil anslutning mellan routern och datorn. Uppgradera inte den fasta programvaran trådlöst.",
                "2. Kontrollera att du har tagit bort alla USB-enheter som är anslutna till routern.",
                "3. Kom ihåg att säkerhetskopiera routerns konfigurationsfil.",
                "Under uppgradering",
                "Håll routern påslagen tills uppgraderingen är klar."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Uppgradera firmware via nätet",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Klicka på Uppgradera och bekräfta när du uppmanas till det. Routern hämtar och uppgraderar automatiskt den senaste inbyggda programvaran. Du kan även klicka på Sök uppgraderingar för senaste version av inbyggd programvara. "]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Uppgradera firmware manuellt",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Klicka på Support, längst ned på sidan och hämta den senaste programvaran till datorn. Se till att filen som du ska ladda ner matcher med routerns maskinvaru-version som visas på sidan.",
                "2. Klicka på Browse (bläddra) och välj den hämtade programfilen.",
                "3. Klicka på Uppgradera."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Uppgradering av inbyggd programvara tar några minuter. Routern startar automatiskt om när uppgraderingen är slutförd."]
}]
},
       BACKUP :{ 
               TITLE:"Säkerhetskopiering och återställning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Säkerhetskopiering & återställning låter dig säkerhetskopiera routerns aktuella konfiguration för återvinning eller enkelt återställa routern till fabriksinställningarna."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Stäng aldrig av routern under säkerhetskopieringen eller återställningen."
                       } ,{                      
                           type: "title",
                           title: "Säkerhetskopiering",
                           content: "Det rekommenderas starkt att säkerhetskopiera den aktuella konfigurationen, i fall en återhämtning behövs för att återställa routern till dess föregående tillstånd."
                       } ,{                      
                           type: "step",
                           title: "Säkerhetskopiera konfigurationsfilen",
       content: [ 
                "1. Klicka på Backup (säkerhetskopiering).",
                "2. Vänta tills routern säkerhetskopierat den aktuella konfigurationen."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Återställ",
                           content: "Du kan återställa routern till en tidigare status från en säkerhetskopia."
                       } ,{                      
                           type: "step",
                           title: "Återställa från säkerhetskopia",
       content: [ 
                "1. Klicka på Bläddra.",
                "2. Leta upp och markera filen.",
                "3. Klicka på Återställ."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Fabriksinställning",
       content: [ 
                "Fabriksåterställning av routern kommer att ta bort alla dina konfigurationer och inställningar och återställa dem till fabriksinställningarna. Till exempel, alla trådlösa, föräldrakontroll, och nätverksinformation raderas.",
                "Efter fabriksåterställningen måste du välja ett nytt lösenord för att nå routerns webbadministration."]
}]
},
       REBOOT :{ 
               TITLE:"Schema för omstart",
               CONTENT: [{
                           type: "paragraph",
                           content: "Omstartsschemat rensar cachen för att höja routerns prestanda. Du kan starta om routern manuellt eller ställa in den så att den gör det regelbundet av sig själv."
                       } ,{                      
                           type: "step",
                           title: "Omstarta manuellt",
       content: [ 
                "Klicka på Starta om och vänta ett par minuter för routern att starta."]
} ,{                      
                           type: "step",
                           title: "Om du vill ställa in omstartstiden:",
       content: [ 
                "1. Aktivera schema för omstart",
                "2. Ställ in när och hur ofta routern startar om genom att specifera parametrarna i fälten Reboot Time och Repeat.",
                "3. Klicka på Spara."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administration",
               CONTENT: [{
                           type: "paragraph",
                           content: "Administreringen låter dig hantera lösenordet vid inloggningen och åtkomst för parter som är anslutna till routern."
                       } ,{                      
                           type: "name",
                           title: "Kontoadministration",
                           content: "Med den här funktionen kan du ändra lösenord.",
       children: [{                      
                           type: "step",
                           title: "Ändra lösenord",
       content: [ 
                "1. Skriv gamla lösenordet.",
                "2. Ange nytt lösenord.",
                "3. Bekräfta nytt lösenord.",
                "4. Klicka på Spara."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Återställ lösenord",
               CONTENT: [{
                           type: "name",
                           title: "Återställ standard lösenord",
                           content: "Återställning av standardlösenord låter dig återställa standardlösenordet för inloggning utan att återställa routern till fabriksinställningarna.",
       children: [{                      
                           type: "step",
                           title: "Ändra lösenord",
       content: [ 
                "1. Aktivera funktionen återställ standardlösenordet.",
                "2. I fältet From (från) ange giltig e-postadress för att skicka en verifiKationSkod för att återhämta inloggningsuppgifter.",
                "3. I fältet To (till) ange en giltig e-postadress som används för att ta emot verifikationskoden.",
                "4. Skriv SMTP-server för utgående e-post (From).",
                "5. Om e-postmeddelandet i fältet kräver kryptering, måste du välja Enable (aktivera) autentisering i kryssrutan och ange användarnamn (e-postadress) och lösenord.",
                "6. Klicka på Save (spara)."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Lokal administration",
               CONTENT: [{
                           type: "paragraph",
                           content: "Den här funktionen låter lokala enheter komma åt och hantera routern."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Lokal hantering via HTTPS",
                           content: "Aktivera lokal hantering via HTTPS om du vill kunna ansluta till routern via både HTTPS och HTTP, eller låt det vara avaktiverat om du bara vill komma åt routern via HTTP."
                       } ,{                      
                           type: "name",
                           title: "Tillträde för alla LAN-anslutna enheter",
                           content: "Växla mellan på för att aktivera lokal förvaltning för alla LAN-anslutna enheter eller av för att möjliggöra förvaltning för en viss enhet."
                       } ,{                      
                           type: "name",
                           title: "MAC-adress",
                           content: "Visar MAC-adressen för den begränsade tillträde enheten."
                       } ,{                      
                           type: "name",
                           title: "Beskrivning",
                           content: "Visar en beskrivning av apparaten med de begränsade möjligheter."
                       } ,{                      
                           type: "name",
                           title: "Status",
                           content: "Visar aktuell status för enheten med begränsad åtkomst (aktiverad eller inaktiverad)."
                       } ,{                      
                           type: "name",
                           title: "Ändra",
                           content: "Visar alternativ för att ändra och ta bort motsvarande enhet från listan."
                       } ,{                      
                           type: "step",
                           title: "Att lägga till en klient i listan",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Klicka på Visa befintliga enheter för att välja en befintlig enhet eller ange MAC-adressen för en enhet i fältet MAC-adress.",
                "3. Ange en beskrivning av enheten.",
                "4. Välj Aktivera.",
                "5. Klicka på OK."]
} ,{                      
                           type: "step",
                           title: "Ändra eller ta bort en enhet i listan",
                           content: "I tabellen, Klicka på Edit -ikonen eller ikonen papperskorgen som motsvarar den enhet som du vill modifiera eller ta bort."
                       } ,{                      
                           type: "step",
                           title: "Ta bort flera enheter",
                           content: "Välj alla enheter som du vill ta bort och klicka på Ta bort."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Fjärrstyrning",
               CONTENT: [{
                           type: "name",
                           title: "Fjärrstyrning",
                           content: "Med funktionen fjärrhantering kan fjärranslutna enheter komma åt och hantera routern.",
       children: [{                      
                           type: "step",
                           title: "Förbjud alla fjärr-enheter åtkomst till routern",
                           content: "Välj Deaktivera fjärrhantering och klicka på Spara."
                       } ,{                      
                           type: "step",
                           title: "Tilåt alla fjärr-enheter åtkomst till routern",
       content: [ 
                "1. Välj Enable (aktivera) Remote Mangement (fjärradministration) för alla enheter.",
                "2. Ange Web Management Port (1024-65535 eller 80) genom vilket fjärrenheterna ska få tillgång till routern.",
                "3. Klicka på Spara."]
} ,{                      
                           type: "step",
                           title: "Tillåt en viss fjärr-enheter åtkomst till routern",
       content: [ 
                "1. Välj Enable Remote Mangement (aktivera fjärradministration) för en viss enhet.",
                "2. Ange Web Management Port (1024-65535 eller 80) genom vilken den andra enheten kommer att få åtkomst till routern.",
                "3. Ange Remote Management (fjärrhantering) IP-adressen för fjärrenheten för att hantera routern.",
                "4. Klicka på Spara."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Fjärrstyrning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med funktionen fjärrhantering kan du komma åt och konfigurera routern via Internet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "För att aktivera fjärrhantering"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Markera kryssrutan för att aktivera fjärrhantering."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Lämna HTTPS-port och HTTP-port på standardinställningarna."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Välj vilken enhet som ska ha fjärråtkomst till routern:",
       children: [{                      
                           type: "name",
                           title: "Alla enheter",
                           content: "Alla fjärrenheter kan komma åt routern."
                       } ,{                      
                           type: "name",
                           title: "Angiven enhet",
                           content: "Ange IP-adress till fjärrenheten som ska komma åt routern."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Klicka på Spara."
                       } ,{                      
                           type: "paragraph",
                           content: "Nu kan du fjärrhantera routern från adressen under webbadress för hantering."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om en varning dyker upp när du går till adressen från en fjärrenhet, klicka på Tillåt (eller motsvarande) för att fortsätta."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "När nattläge är aktiverat, kommer lysdioderna att vara avstängda under den angivna perioden utan att påverka routerns prestanda."
                       } ,{                      
                           type: "step",
                           title: "Aktivera natt-läge",
       content: [ 
                "1. Välj Åktivera Nattläge.",
                "2. Ange en tidsperiod när lamporna är släckta.",
                "3. Klicka på Spara."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Systemlogg",
               CONTENT: [{
                           type: "paragraph",
                           content: "Systemloggen visar routerns senaste aktiviteter. Tabellen består av typ, nivå och innehållet i systemlogg som kan filtreras för att ses. Du kan också spara loggar till den lokala datorn, eller skicka dem till e-post."
                       } ,{                      
                           type: "step",
                           title: "Spara system-loggar på den lokala datorn",
       content: [ 
                "1. Ange typ och lägsta nivå för att filtrera önskade systemloggar. Listan är i fallande ordning, med den lägsta nivå som anges sist.",
                "2. Klicka på Spara logg för att spara loggar till den lokala datorn."]
} ,{                      
                           type: "step",
                           title: "Tag emot system-loggar via e-post",
       content: [ 
                "1. Ange typ och nivå för att filtrera önskade systemloggar. Listan är i fallande ordning, med den lägsta nivå som anges sist.",
                "2. Klicka på e-postinställningar.",
                "3. I fältet Från anger du en giltig e-postadress som ska användas som utgående e-post.",
                "4. I fältet Till anger du en giltig e-postadress som ska användas för inkommande e-post.",
                "5. Ange SMTP-serverns adress för utgående e-post (från).",
                "Anm.: Om utgående e-post kräver autentisering, välj aktivera autentisering i kryssrutan och ange dess användarnamn (e-postadress) och lösenord.",
                "6. Om du vill ta emot systemloggar via e-post regelbundet, markera kryssrutan Aktivera Auto Mail och ange en specifik tid (i 24-timmarsformat) eller ett tidsintervall.",
                "Om du omedelbart vill ta emot existerande systemloggar, klicka på Mail Log Now.",
                "7. Klicka på Spara."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Trafikövervakning",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar nätverktrafik hos en enhet i senaste 10 minuter eller alla enheter senaste 10 minuter/24 timmar/7 dagar."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Trafikövervakningslista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Listan är grupperad per anslutningstyp: fast eller trådlös."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Systemparameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Trådlöst 2.4GHz/5GHz",
                           content: "I det här avsnittet kan du konfigurera parametrarna för trafiköverföringsregler i det trådlösa nätverket. Det rekommenderas att hålla standardinställningarna om du är osäker."
                       } ,{                      
                           type: "name",
                           title: "Signalintervall",
                           content: "Ange ett värde mellan 40 och 1000 i millisekunder för att bestämma varaktighet mellan paket som sänds från routern för synkronisering av det trådlösa nätverket. Standardvärdet är 100 millisekunder."
                       } ,{                      
                           type: "name",
                           title: "RTS-gränsvärde",
                           content: "Ange ett värde mellan 1 och 2346 för att fastställa paketstorleken för överföring av data via routern. Som standard, är RTS (begäran att skicka) tröskel storleken 2346. Om paketstorleken är större än det förinställda tröskelvärdet , skickar routern begäran till en viss mottagande station och därefter utförs en förhandling om sändning av en dataram, annars skickas paketet omedelbart."
                       } ,{                      
                           type: "name",
                           title: "DTIM-intervall",
                           content: "Detta värde bestämmer det inre av DTIM (Delivery Traffic Indication Message). Ange ett värde mellan 1 och 15 internals. Standardintervallet är 1, som anger att DTIM-intervall är detsamma som Beacon Interval."
                       } ,{                      
                           type: "name",
                           title: "Group Key Update Period",
                           content: "Ange det antal sekunder (minst 30) för att automatiskt styra tidsintervallet för krypteringsnyckelns förnyelse. Standardvärdet är 0, som anger ingen förnyelse av nyckel."
                       } ,{                      
                           type: "name",
                           title: "WMM-funktionen",
                           content: "WMM-funktionen garanterar att paket med hög prioritet överförs med prioritet. Den är aktiverad som standard och rekommenderas starkt."
                       } ,{                      
                           type: "name",
                           title: "Kort GI funktion",
                           content: "Den här funktionen är aktiverad som standard och rekommenderar att öka paket-kapacitet med GI (Guard intervall)."
                       } ,{                      
                           type: "name",
                           title: "AP Isolationsfunktion",
                           content: "Om du vill begränsa och inskränka alla trådlösa enheter som är anslutna till nätverket interagerar med varandra, men ändå kunna få åtkomst till internet, välj kryssrutan Aktivera AP Isolation."
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
                           title: "Aktivera WDS",
                           content: "WDS (Wireless Distribution System) brygg-funktion förlänger täckning för det trådlösa nätverket genom att överbrygga med en AP (accesspunkt) i ett trådlöst WLAN (lokalt nätverk)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Välj för att aktivera WDS Brygg-funktion.",
                "2. Att brygga ett nätverk genom skanning: Klicka på Scan för att skanna och visa alla tillgängliga nätverk och välj det nätverk du vill brygga med. SSID (nätverksnamn), MAC-adress och säkerhet fylls i automatiskt.",
                "Eller för att brygga ett nätverk manuellt: Ange nätverksnamn (SSID), MAC-adress och WDS -läge i nätverket som måste överbryggas. Välj en säkerhetstyp och ange relaterade parametrar, som bör vara samma som nätverket som överbryggas.",
                "3. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du inte är säker på WDS-läge, behåll standardalternativet Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS Brygga",
                           content: "Med WPS (Wi-Fi Protected Setup) kan du enkelt ansluta WPS-aktiverade enheter till routern genom att trycka på WPS-knappen. Kontrollera att aktivera WPS-funktionen och klicka på Save (spara)."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Den här funktionen är aktiverad som standard. Det rekommenderas att behålla standardinställningen. Om du deaktiverar den har du inte tillgång till internet."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "När NAT är avaktiverat, kommer inte konfigurationer i NAT vidarebefordran att träda i kraft."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT-Boost",
                           content: "Välj Enable NAT Boost och klicka på Spara för att säkerställa att routern har bästa genomströmning."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Obs",
                           content: "När NAT-Boost är aktiverat, inaktiveras QoS och trafikstatistik automatiskt."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Ställ in DOS-skydd",
                           content: "DOS-skydd skyddar routern från ICMP-översvämning, UDP-översvämning och TCP-översvämningsattacker."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD paketnivå",
                           content: "Ange ett värde mellan 5 och 7200 för att utlösa ICMP-översvämningsskydd omedelbart när antalet ICMP-paket överskrider det förinställda tröskelvärdet."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD paketnivå",
                           content: "Ange ett värde mellan 5 och 7200 UDP-paket för att utlösa UDP-översvämningsskydd omedelbart när antalet UDP-paket överskrider det nuvarande gränsvärdet."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD paketnivå",
                           content: "Ange ett värde mellan 5 och 7200 TCP SYN-paket för att utlösa TCP-SYN-översvämningsskydd omedelbart när antalet TCP-paket överskrider nuvarande tröskelvärde."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Välj duplex i listrutan och klicka på Spara."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Aktivera nattläge",
                           content: "Markera den här kryssrutan för att stänga av LED-lamporna under nattlägesperioden utan att det påverkar routerns prestanda."
                       } ,{                      
                           type: "name",
                           title: "Period av nattläge",
                           content: "Ange en tidsperiod då nattläget ska vara aktivt."
                       } ,{                      
                           type: "paragraph",
                           content: "Klicka på Spara för att spara alla dina inställningar."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"ÖppenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med OpenVPN kan du använda internet på ett säkert sätt få tillgång till nätverket när du är utanför hemmet. För att använda VPN-tjänsten måste du konfigurera dynamisk DNS-service (rekommenderas) eller tilldela en statisk IP-adress till routerns WAN-porten. Och systemet bör synkroniseras med internet."
                       } ,{                      
                           type: "name",
                           title: "Typ av tjänst",
                           content: "Välj kommunikationsprotokoll för OpenVPN-servern: UDP eller TCP."
                       } ,{                      
                           type: "name",
                           title: "Tjänstport",
                           content: "Ange en kommunkationsport mellan 1024 och 65535. Standard och gemensam serviceport 1194."
                       } ,{                      
                           type: "name",
                           title: "VPN undernät/nätmask",
                           content: "Ange vilka IP-adresser som kan lånas ut till klienterna av OpenVPN-servern."
                       } ,{                      
                           type: "name",
                           title: "Klientåtkomst",
                           content: "Välj typ av behörighet för OpenVPN klient.",
       children: [{                      
                           type: "name",
                           title: "Endast hemnätverk",
                           content: "Klienten kan bara ansluta til hem-nätverk. Kundens förvalda route ändras inte."
                       } ,{                      
                           type: "name",
                           title: "Internet- och hemnätverk",
                           content: "Klienten kan få tillgång till hem-nätverket och internet-webbplatser eller tjänster med en geografisk begränsning när du är ute ur landet. Kundens förvalda route kommer att ändras."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certifikat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Använd certifikatet för information och identifiering av VPN-anslutning för fjärrdatorn.",
                "Klicka för att generera ett nytt certifikat."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Konfigurationsfil",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Fjärrklienter kommer att använda konfigurationsfilen för att få tillgång till routern.",
                "Klicka på den här knappen för att spara OpenVPN-konfigurationsfilen som ska användas för att lägga till en ny VPN-anslutning."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN-klientinstallationsguide",
               CONTENT: [{
                           type: "step",
                           title: "Anslut klient-enheter till OpenVPN-server",
       content: [{                      
                           type: "paragraph",
                           content: "Innan du konfigurerar OpenVPN-servern kan du konfigurera dynamisk DNS-service (rekommenderas) eller tilldela en statisk IP-adress till WAN-porten. Och se till att den externa porten av NAT-inställningar inte är service port, och att systemet är synkroniserat med internet."
                       },
                "1. Välj aktivera VPN-server.",
                "2. Konfigurera OpenVPN server parametrar (typ av tjänst, serviceport, klientaccess och VPN Subnet/Nätmask och klicka på Spara.",
                "3. Klicka på Exportera om du vill spara konfigurationsfilen.",
                "4. På klientenheten, hämta och installera OpenVPN klientverktyg från <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Officiella plattformar som stöds inkluderar Windows, Mac OSX och Linux.",
                "5. Starta OpenVPN klientverktyg och lägg till en ny VPN-anslutning med den sparade filen för att ansluta klientenhet till VPN-servern."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Besök <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a> för att lära dig mer om OpenVPN-klienter."
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med PPTP VPN kan du använda internet för att enkelt och snabbt få tillgång till nätverket när du är utanför hemmet. Det kan vara förbjudet av vissa internetleverantörer. För att använda VPN-tjänst måste du konfigurera dynamisk DNS-service (rekommenderas) eller tilldela en statisk IP-adress till routerns WAN-porten. Och systemet bör synkroniseras med internet."
                       } ,{                      
                           type: "name",
                           title: "Klientens IP-adress",
                           content: "Ange de IP-adresser (upp till 10 klienter) som kan lånas till klienterna av PPTP VPN-servern."
                       } ,{                      
                           type: "name",
                           title: "Användarnamn och lösenord",
                           content: "Ange ditt användarnamn och lösenord för att autentisera klienter för PPTP VPN-servern."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN-klientinstallationsguide",
               CONTENT: [{
                           type: "step",
                           title: "Anslut klient-enheter till PPTP VPN -server:",
       content: [{                      
                           type: "paragraph",
                           content: "Innan du kan konfigurera PPTP VPN-server, konfigurera dynamisk DNS-service (rekommenderas) eller tilldela en statisk IP-adress för WAN-porten. Kontrollera att den externa porten för NAT-inställningar inte är 1723 och att systemet är synkroniserat med internet."
                       },
                "1. Välj aktivera VPN-server.",
                "2. Konfigurera PPTP VPN-server parametrar och klicka på Spara.",
                "3. På klientenheten, skapa en PPTP VPN-anslutning. De officiella plattformar som stöds inkluderar Windows, Mac OSX, Linux, iOS, och Android.",
                "4. Starta PPTP VPN-programmet, lägg till en ny anslutning och ange domännamn av registrerad DDNS-tjänst eller statisk IP-adress som är tilldelad till WAN-porten för att ansluta klient till PPTP VPN-server."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN-anslutningar",
               CONTENT: [{
                           type: "paragraph",
                           content: "På den här sidan visas de klienter som för närvarande är anslutna till OpenVPN- och PPTP VPN-servrarna som routern är värd för."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Nätverkskarta",
               CONTENT: [{
                           type: "paragraph",
                           content: "I nätverkskartan kan du se aktuell status för nätverksanslutning och trådlösa routern och information från anslutna enheter."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar information om internet."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar den aktuella informationen om trådlösa nätverk och LAN-portarna."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Trådanslutna/trådlösa klienter",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar nätverksnamnet (redigerbart), tilldelade IP- och MAC-adressen för den anslutna klienter för routern."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Skrivare",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar namnet på den skrivare som är ansluten till routern via USB-porten."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB-disk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar relevant information om USB-disk är ansluten till routern via USB-porten."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Hastighetstest",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna funktion testar upp- och nedladdningshastigheten som din tjänstleverantör tillhandahåller just nu, och ger dig tips om din internetanslutnings kapacitet."
                       } ,{                      
                           type: "paragraph",
                           content: "Tips: Stäng ned andra appar och program för ett mer exakt resultat."
                       } ,{                      
                           type: "paragraph",
                           content: "Historik: Resultaten från tidigare hastighetstest."
                       } ,{                      
                           type: "paragraph",
                           content: "Testa igen: Klicka för att utföra ett hastighetstest."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Klicka på Auto Detect eller välj typ av internet-anslutning manuellt. Ange sedan motsvarande parametrar som tillhandahålls av internetleverantören."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Markera den här rutan för att aktivera Smart Connect. Den här funktionen gör enheten snabbare genom att tilldela dem bästa möjliga trådlösa frekvensband baserat på faktiska förhållanden för att balansera nätverksbelastningen."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Inställning av trådlöst",
               CONTENT: [{
                           type: "paragraph",
                           content: "Du kan konfigurera inställningarna för trådlöst (SSID och lösenord, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Nätverksnamn (SSID)",
                           content: "Du rekommenderas att ändra nätverksnamnet (SSID). Det här fältet är skiftlägeskänsligt."
                       } ,{                      
                           type: "name",
                           title: "Dölj SSID",
                           content: "Välj om du vill dölja 2.4GHz/5GHz nätverksnamn (SSID) i listan över trådlösa nätverk. Om vald sänds SSID inte ut och du måste manuellt ansluta till nätverket."
                       } ,{                      
                           type: "name",
                           title: "Lösenord",
                           content: "Ange ett trådlöst lösenord mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken. Det här fältet är skiftlägeskänsligt."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB-minne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna funktion erbjuder dig att dela USB-lagringsenheter till olika klienter i lokalt nätverk eller via internet."
                       } ,{                      
                           type: "title",
                           title: "Inställning enhet",
                           content: "Device Settings visar information om USB-lagringsenheten ansluten via USB-porten. En USB-flashenhet har vanligtvis endast en volym."
                       } ,{                      
                           type: "name",
                           title: "Skanna",
                           content: "Vanligen upptäcker routern automatiskt nyligen anslutna enheter. Om inte, klicka på denna knapp för att söka och uppdatera skärmen med ny uppdaterad information.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "En grå yta representerar en volym som är deaktiverad. Du kan klicka på det området du vill dela den specifika volymen."
                       }]
} ,{                      
                           type: "name",
                           title: "Ta bort",
                           content: "Klicka på den här knappen för att säkert ta bort USB-lagringsenheten innan du fysiskt kopplar bort den från USB-porten.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "Knappen ta bort visas bara när en USB-lagringsenhet är ansluten till routern. När den aktuella volymen är upptagen kan du inte ta bort den."
                       }]
} ,{                      
                           type: "step",
                           title: "Att sätta upp en filserver",
       content: [ 
                "1. Anslut USB-lagringsenheten till USB-porten antingen direkt eller via en USB-kabel. Om enheten kräver medföljande extern strömförsörjning, se till att den externa strömkällan har kopplats in.",
                "2. De nyligen anslutna USB-enheten bör identifieras automatiskt av routern och visas under Device Settings. Om inte, klicka på Skanna.",
                "Obs! Ikonen Dela visas när mer än 5 volymer är anslutna till routern. Du kan klicka på ikonen för att deaktivera volymer du inte behöver dela."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Åtkomst-adress",
               CONTENT: [{
                           type: "name",
                           title: "Nätverk/Media Server namn",
                           content: "Visar det namn som används för att komma åt den anslutna USB-enheten via nätverket eller Media Sharing-funktionen. TP-Share är standard."
                       } ,{                      
                           type: "name",
                           title: "Acessmetod",
                           content: "Det finns 4 olika metoder att nå ett delat USB-minne.",
       children: [{                      
                           type: "name",
                           title: "Nätverksomgivning",
                           content: "Välj det här alternativet för att ge användare på nätverket åtkomst till den delade innehåll via den adress som anges under kolumnen adress."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Välj det här alternativet för att aktivera FTP-servern och ger användare på nätverket åtkomst till USB-lagringsenheten via FTP-adress som visas under kolumnen adress."
                       } ,{                      
                           type: "name",
                           title: "FTP (via internet)",
                           content: "Välj det här alternativet om du vill tillåta FTP-klienter och användare fjärråtkomst, nedladdning och uppladdning av filer till delade USB-lagringsenheter via FTP över internet. För att anpassa gå till adress, klicka på Redigera och ställa in Dynamic DNS för routern. För att ändra FTP-serverns port, ange ett nytt portnummer och klicka på Spara för att spara ändringarna."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Välj det här alternativet för att aktivera SFTP-serverfunktionen som låter SFTP-klienter och användare på nätverket komma åt USB-lagringsenheten via SFTP-adressen som visas under adresspalten."
                       }]
} ,{                      
                           type: "name",
                           title: "Adress",
                           content: "Visar den adress som används för att få åtkomst till den delade USB-lagringsenheten."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Visar numret på den port som används för att få tillgång till FTP-servern."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Delnings-innehåll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar de mappar du delar. Alla mappar delas som standard. Du kan klicka på ikonen Redigera för att anpassa delade mappar."
                       } ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Dela-ikonen visas i enhetens inställningar när mer än 5 volymer är ansluten till routern. Du kan klicka på dela-ikonen för att deaktivera volymer du inte vill dela."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Delnings-innehåll och säkerhet",
               CONTENT: [{
                           type: "name",
                           title: "Delnings-innehåll",
                           content: "Visar de mappar du delar. Alla mappar delas som standard. Du kan klicka på ikonen Redigera för att anpassa delade mappar.",
       children: [{                      
                           type: "note",
                           title: "Obs",
                           content: "Dela-ikonen visas i enhetens inställningar när mer än 5 volymer är ansluten till routern. Du kan klicka på dela-ikonen för att deaktivera volymer du inte vill dela."
                       }]
} ,{                      
                           type: "name",
                           title: "Åtkomstautentisering",
       content: [ 
                "Toggle on (slå på) för att aktivera autentisering som kräver att användarna anger ett giltigt användarnamn och lösenord för att få tillgång till alla delade mappar. Åtkomst som administratör kan läsa och ändra filer medan användaren bara kan läsa filerna.",
                "Användarnamn bör börja med en bokstav eller en understrykning och innehålla 1 till 15 tecken med bokstäver, siffror och understrykningar.",
                "Lösenordet bör innehålla 1 till 15 tecken av bokstäver, siffror och understrykningar."]
} ,{                      
                           type: "name",
                           title: "Ge gäst tillgång till nätverket",
                           content: "Växla till PÅ för att ge nätverksanvändare åtkomst till alla delade mappar."
                       } ,{                      
                           type: "name",
                           title: "Aktivera mediedelning",
                           content: "Med den här funktionen aktiverad kan alla DLNA-kompatibla enheter i det lokala nätverket få åtkomst till mediefiler i alla delade mappar. Användare kommer inte att behöva ange användarnamn eller lösenord ens om autentisering är aktiverad."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Skrivar-server",
               CONTENT: [{
                           type: "name",
                           title: "Skrivar-server",
                           content: "Växla för att aktivera funktionen skrivar-server."
                       } ,{                      
                           type: "name",
                           title: "Skrivarnamn",
                           content: "Visar namnet på den skrivare som är ansluten till routern."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Föräldrakontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med grundläggande inställningar för föräldrakontroll kan du begränsa åtkomsten till vissa tider på dagen (till exempel ingen tillgång till internet på barnets dator under läxtid)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Enheter med föräldrakontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar information och inställningar av enheter som är begränsade av föräldrakontroll."
                       } ,{                      
                           type: "step",
                           title: "Att begränsa möjligheterna för en ny klient enheten",
       content: [ 
                "1. Slå på föräldrakontroll.",
                "2. Klicka på Lägg till.",
                "3. Klicka på Skanna för att välja en ansluten enhet från listan över enheter, eller ange manuellt enhetens namn och MAC-adress för att lägga till en enhet som inte är ansluten.",
                "4. Klicka på ikonen effektiv tid för att ange en tidsperiod under vilken restriktioner gäller.",
                "5. Ange en kort beskrivning i fältet Beskrivning. Det här fältet är valfritt.",
                "6. Välj Åktivera Posten.",
                "7. Klicka på Spara."]
} ,{                      
                           type: "note",
                           title: "Obs",
                           content: "Om du vill avaktivera den här funktionen klickar du på ikonen för glödlampan."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Gästnätverk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med den här funktionen kan du erbjuda Wi-Fi för gäster utan att avslöja huvud-nätverk."
                       } ,{                      
                           type: "name",
                           title: "Tillåt gäster att nå varandra",
                           content: "Markera den här kryssrutan för att tillåta de trådlösa enheterna på gäst-nätverk att kommunicera med varandra via metoder som nätverksgrannar, Samba, Ping, och FTP."
                       } ,{                      
                           type: "name",
                           title: "Tillåt gäster att nå mitt lokala nätverk",
                           content: "Markera den här kryssrutan för att tillåta de trådlösa enheterna på gäst-nätverket att kommunicera med enheter som är anslutna till routerns LAN-portar eller nätverk via metoder som nätverksgrannar, Samba, Ping, och FTP."
                       } ,{                      
                           type: "name",
                           title: "Aktivera Gästnätverk",
                           content: "Markera den här kryssrutan för att aktivera gästnätverkets funktioner."
                       } ,{                      
                           type: "name",
                           title: "Nätverksnamn (SSID)",
                           content: "Använd standard gästens SSID eller skapa ett nytt namn (upp till 32 tecken)."
                       } ,{                      
                           type: "name",
                           title: "Dölj SSID",
                           content: "Markera den här kryssrutan om du vill dölja gäst SSID från Wi-Fi -nätverket."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Lösenordets uppdaterings intervall",
                           content: "Välj uppdateringsintervall av gästens nätverkslösenord."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Lösenord",
                           content: "Skapa ett lösenord som innehåller mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Lösenord",
                           content: "Använd antingen lösenordet som genereras slumpmässigt, eller skapa ett lösenord mellan 8 och 63 ASCII-tecken eller mellan 8 och 64 hexadecimala tecken (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link molntjänst låter dig att fjärrövervaka nätverket i realtid, få åtkomst till och hantera dina TP-Link enheter från Internet när som helst och var som helst."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Kontoinformation",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar din TP-Link ID-information. Du kan redigera kontoinformationen genom att klicka på ikonen Edit (redigera)."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Information om enheten",
               CONTENT: [{
                           type: "paragraph",
                           content: "Visar enhetsinformation, inklusive moln-kontot som hanterar enheten."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Bundna konton",
               CONTENT: [{
                           type: "paragraph",
                           content: "Denna tabell visar alla cloud konton som för närvarande är bundna till enheten."
                       } ,{                      
                           type: "step",
                           title: "Bind ett användarkonto",
       content: [ 
                "1. Klicka Bind.",
                "2. Ange den registrerade e-post som du vill binda.",
                "3. Klicka på Spara."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Föräldrakontroll",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med ålders-filter, accessgränser och användarprofiler och föräldrakontroll erbjuds din familj personlig och lämplig tillgång till internet."
                       } ,{                      
                           type: "step",
                           title: "Att tillämpa föräldrakontroll för en ny enhet",
       content: [ 
                "1. Klicka på Lägg till.",
                "2. Ange ett namn för denna profil och klicka på \"+\" för att lägga enheten(-erna) under denna profil.",
                "3. Välj en filternivå och anpassa filterinnehåll efter dina behov. Du kan ange nyckelord för att söka efter webbplatser som du vill filtrera i vår databas. Andra webbplatser (URL: er) kan skrivas in manuellt <br/> Se följande förklaringar till de olika filterkategorier: <p> Webbplatser med vuxen-innehåll som innehåller sexuellt, skadligt eller olagligt innehåll, inklusive pornografi, drogmissbruk, våld och diskriminering. </p><p> visa - webbplatser som främjar eller tillhandahåller information om spel, inklusive onlinespel webbplatser </p><p> Sexutbildning - webbplatser som diskuterar sexualitet informativt, inklusive reproduktion, sexualitet, säker sex och preventivmedel, sexuellt överförda sjukdomar och att hantera sexuella trauman </p> <p> Online Communication - webbplatser som värd för att kommunicera med andra genom text, röst eller video, inklusive e-post, bloggar, online-forum, IP-telefoni och video nättjänster </p><p> sociala nätverk - webbplatser som distribuerar personligt uttryck eller kommunikation, som förbinder människor och deras personliga aktivitet baserad på liknande intressen, karriärer, bakgrunder eller verkliga bekantskap </p><p> betala Surf - webbplatser som kompenserar användare att visa viss webbplatser, e-postmeddelanden, eller reklam, klicka på länkar eller svara på undersökningar </p><p> Media - webbplatser som erbjuder gratis, betald eller tecknade ljud- och / eller videoinnehåll, inklusive streamingtjänster, TV-program eller nedladdning av musik </p><p> Downloads - webbplatser som tillhandahåller eller ger tillgång till fildelning och distribution, inbegripet peer-to-peer-delning, fillagring och mobila enhet innehåll (t.ex. musik och appar) </p><p> Spel - webbplatser att tillhandahålla eller ge tillgång till webb värd eller nedladdningsbara spel, inklusive online-spel, spelkonsol nätverk och webbläsarspel </p>",
                "4. Om du vill begränsa den totala tiden denna profil kan vara på nätet, aktivera och ange tidsgränser. Du kan också använda sov-tid för att ställa in en daglig tidsperiod under vilken enheter under denna profil inte kan använda internet.",
                "5. Klicka på Spara."]
} ,{                      
                           type: "step",
                           title: "Visa en profils detaljerade Internethistoria",
       content: [ 
                "1. I kolumnen Insights klicka på motsvarande knapp.",
                "2. Om du vill se fler poster, klicka på Historik <span class=\"ptl-ctr-help-icon history\"></span> knappen.",
                "3. Du kan blockera eller avblockera webbplatser genom att klicka på <span class=\"ptl-ctr-help-icon block\"></span> eller knappen <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Aktivera eller inaktivera omedelbart tillgång till internet",
       content: [ 
                "I Internet kolumnen klickar du på <span class=\"ptl-ctr-help-icon stop\"></span> för att stoppa motsvarande profilens enheter från att komma åt Internet och klicka på <span class=\"ptl-ctr-help-icon enable\"></span> för att aktivera åtkomst igen."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) funktionen prioriterar online-aktiviteter och enheter för att garantera en snabbare nätverksanslutning när du behöver den mest."
                       } ,{                      
                           type: "paragraph",
                           content: "Välj Application Priority för att prioritera nätverkshastighet för online-aktiviteter, och välj Device Priority att prioritera nätverkshastighet för enheter."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Program-prioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Välj den online-aktivitet som du vill prioritera eller klicka på Custom (Anpassad) för att ställa in prioritetsnivån för varje online-aktivitet."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Enhets-prioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Välj enheten (-er) som du vill prioritera och hur länge de kommer att prioriteras."
                       } ,{                      
                           type: "step",
                           title: "Prioritera en enhet",
       content: [ 
                "1. Hitta den enhet som du vill prioritera i listan och växla prioritet.",
                "2. Välj hur länge enheten kommer att prioriteras anges i kolumnen Timing."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Med tät skanning av nätverk , upptäcks skadliga webbplatser och infekterade enheter isoleras. Antivirus funktionen håller din personliga information säker. Du kan också kontrollera hur nätverket är skyddat, och om det har förekommit några attacker på nätverket."
                       } ,{                      
                           type: "paragraph",
                           content: "Historia - Spelar in de enheter som har skyddats av Antivirus och källan och klassificering av attackerna."
                       } ,{                      
                           type: "paragraph",
                           content: "Aktivera alla - Ange för att göra det möjligt för alla skyddstyper Om ett eller flera inte är aktiverade."
                       } ,{                      
                           type: "paragraph",
                           content: "Skyddstyper - Aktivera skydd typer genom att hänvisa till förklaringarna. Det rekommenderas att aktivera alla skyddstyper."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Program-prioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen program-priorit anger online-aktiviteter för att garantera en snabbare nätverksanslutning när du behöver det mest. Välj den online-aktivitet som du vill prioritera eller klicka på Anpassad för att ställa in prioritetsnivån för varje online-aktivitet."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Enhets-prioritet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funktionen enhets-prioritet anger enheter för att garantera en snabbare nätverksanslutning när du behöver det mest. Välj enheten (-er) som du vill prioritera och hur länge de skall prioriteras."
                       } ,{                      
                           type: "step",
                           title: "Prioritera en enhet",
       content: [ 
                "1. Hitta den enhet som du vill prioritera i listan och växla prioritet.",
                "2. Välj hur länge enheten kommer att prioriteras anges i kolumnen Timing."]
}]
},
       FIREWALL :{ 
               TITLE:"Brandvägg",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) brandvägg förhindrar cyberattacker och kontrollerar den trafik som passerar genom routern baserat på protokollet. Som standard är denna funktion aktiverad."
                       } ,{                      
                           type: "name",
                           title: "Aktivera SPI-brandväggen",
                           content: "Ta inte bort SPI-brandväggen om det inte är nödvändigt."
                       } ,{                      
                           type: "name",
                           title: "Tillåter ping från WAN-port / tillåter ping från LAN-port",
                           content: "Aktivera för att tillåta ping-paket från WAN / LAN-port. Det rekommenderas att behålla standardinställningarna."
                       }]
},
       "" :     ""
    };
})(jQuery);