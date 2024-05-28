(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Bandbreddskontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Med Bandwidth Control kan du konfigurera uppström bandbredd och nedström bandbredd i nätverket. Den kombinerade genomströmningen bör inte överstiga 1 000 Mbit/s. För optimal bandbreddskontroll, välj rätt linjetyp och kontakta din Internetleverantör för den totala tillåtna bandbredd för uppström och nedström."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Markera kryssrutan för att aktivera funktionen bandbreddskontroll."
            }, {
                type: "name",
                title: "Total bandbredd uppström",
                content: "Ange det totala uppladdningshastighet genom WAN-porten."
            }, {
                type: "name",
                title: "Totalt bandbredd nedströms",
                content: "Ange nedladdningshastigheten genom WAN-porten."
            }, {
                type: "title",
                content: "Styrningsregler"
            }, {
                type: "name",
                title: "Beskrivning",
                content: "Visar det kontrollerade IP-område eller portintervallet."
            }, {
                type: "name",
                title: "Prioritet",
                content: "Visar prioritetsnivån för regeln, där 1 är den högsta prioritetsnivån och 8 är den lägsta prioritetsnivån. Den totala uppladdning och nedladdning bandbredd kommer att tilldelas för att garantera Min hast. för alla bandbredd kontrollregler."
            }, {
                type: "name",
                title: "Upp (min/max)",
                content: "Visar lägsta och högsta uppladdningshastighet i Kbps."
            }, {
                type: "name",
                title: "Ned (min/max)",
                content: "Visar det min. och max. nedladdnings hastighet i Kbps."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Anger aktuell status för en regel. Klicka på ikonen Bulb att aktivera eller inaktivera regeln."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att ändra eller ta bort motsvarande regel."
            }, {
                type: "note",
                title: "Lägg till en ny regel",
                content: [
                    "Klicka på Lägg till.",
                    "Ange ett intervall av IP-adresser som ska kontrolleras.",
                    "Ange ett område av portnummer som skall kontrolleras.",
                    "Välj protokoll för den här regeln.",
                    "Välj en prioritetsnivå för den här regeln. (1 är den högsta prioritetsnivån.)",
                    "Ange lägsta och högsta uppladdningshastighet (i Kbps) via WAN-porten.",
                    "Ange lägsta och högsta nedladdningsbandbredd (i Kbps) via WAN-porten.",
                    "Välj Aktivera den här posten.",
                    "Klicka på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om du vill radera flera regler </strong> <br> I listan Styrregler, välj motsvarande kryssrutan för de regler som skall raderas och klicka på Ta bort ovanför tabellen."
            }]
        },
        accessControl: {
            TITLE: "Åtkomstkontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Åtkomstkontroll används för att tillåta eller blockera specifika datorer och andra enheter från att komma åt nätverket. När en enhet är blockerad, är det möjligt att få en IP-adress från routern, men den kan inte kommunicera med andra enheter eller ansluta till Internet."
            }, {
                type: "paragraph",
                content: "<strong> Obs: </strong> Om du vill använda åtkomstkontroll, aktivera den här funktionen och följ stegen i programguiden. Om Åtkomstkontroll är Av (inaktiverad), så kan alla enheter få tillgång till nätverket, inklusive de svartlistade."
            }, {
                type: "name",
                title: "Åtkomstkontroll",
                content: "Växla till På för att aktivera funktionen."
            }, {
                type: "title",
                content: "Åtkomstkontroll aktiv"
            }, {
                type: "name",
                title: "Svartlista",
                content: "Välj att blockera åtkomst från enheterna i listan nedan."
            }, {
                type: "name",
                title: "Vitlista",
                content: "Välj att tillåta åtkomst endast från enheterna i listan nedan."
            }, {
                type: "title",
                content: "Enheter i svart/vitlista"
            }, {
                type: "note",
                title: "<strong>Svartlista eller vitlista en enhet</strong>",
                content: [
                    "Klicka på ikonen Lägg till.",
                    "Ange enhetsnamnet.",
                    "Ange MAC-adressen för den enhet.",
                    "Klicka på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om du vill ändra eller ta bort en enhet i svart/vitlista </strong>​​strong> <br> I tabellen svart/vitlista, klicka på ikonen Redigera eller Papperskorgen som motsvarar den enhet du vill ändra eller ta bort."
            }, {
                type: "paragraph",
                content: "<strong> Om du vill radera flera enheter i svart/vitlista </strong>​​strong> <br> Markerar i tabellen svart/vitlista alla enheter som du vill ta bort, klicka på Ta bort ovanför tabellen."
            }, {
                type: "title",
                content: "Enheter Online"
            }, {
                type: "name",
                title: "Enhetsnamn",
                content: "Visar namnet på den anslutna enheten."
            }, {
                type: "name",
                title: "IP-adress",
                content: "Visar IP-adressen för den anslutna enheten."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen för den anslutna enheten."
            }, {
                type: "name",
                title: "Anslutningstyp",
                content: "Visar anslutningstypen för den anslutna enheten, antingen trådbundet eller trådlöst."
            }, {
                type: "paragraph",
                content: "<strong> Om du vill blockera en eller flera enheter </strong> <br> Välj i tabellen Enheter online de enheter som du vill blockera. Klicka Blockera ovanför tabellen. De valda enheterna läggs automatiskt till Enheter i svartlistan."
            }]
        },
        arpBind: {
            TITLE: "Inställningar",
            CONTENT: [{
                type: "paragraph",
                content: "IP och MAC bindning (även känd som ARP bindning) är användbar för att styra åtkomst av en specifik dator i LAN genom att binda samman IP-adress och MAC-adressen för den enheten. IP & MAC binding hindrar även andra enheter från att använda en viss IP-adress."
            }, {
                type: "name",
                title: "IP & MAC bindning",
                content: "Växla till På om du vill aktivera funktionen IP & MAC bindning."
            }, {
                type: "title",
                title: "Bindningsista"
            }, {
                type: "note",
                title: "<strong> Så här konfigurerar du en enhet med ARP bindning</strong>",
                content: [
                    "Klicka på Lägg till.",
                    "Ange MAC-adressen för enheten.",
                    "Ange en IP-adress som du vill binda till ovanstående MAC-adress.",
                    "Välj Aktivera.",
                    "Klicka på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om du vill ändra eller ta bort en post </strong> <br> i bindningslistan genom att klicka på ikonen Edit eller Papperskorgen som motsvarar den post du vill ändra eller ta bort."
            }, {
                type: "paragraph",
                content: "<strong> Om du vill radera flera poster </strong> <br> i bindningslistan väljer du de poster som du vill ta bort, klicka på Ta bort ovanför tabellen."
            }, {
                type: "title",
                title: "ARP-lista"
            }, {
                type: "paragraph",
                content: "Visar MAC och IP-adresser för närvarande anslutna enheter."
            }, {
                type: "name",
                title: "Enhetsnamn",
                content: "Visar namnet på den anslutna enheten."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen för den anslutna enheten."
            }, {
                type: "name",
                title: "IP-adress",
                content: "Visar IP-adressen som tilldelats den anslutna enheten."
            }, {
                type: "name",
                title: "Bunden",
                content: "Anger om MAC och IP-adresser är bundna eller inte."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att Ta bort motsvarande post från listan."
            }, {
                type: "paragraph",
                content: "<strong> Obs! </strong> Du kan inte binda samma IP-adress till mer än en MAC-adress."
            }, {
                type: "paragraph",
                content: "<strong> För att binda flera enheter </strong> <br> I ARP listan, välja de enheter som du vill binda sina IP-adresser till deras MAC-adresser klickar du på Bind ovanför tabellen."
            }]
        },
        alg: {
            TITLE: "Applikationslager gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG erbjuder anpassade Network Address Translation (NAT) traverse filter att vara ansluten till porten för att stödja adress och port översättning av vissa applikationslagret \"kontroll/data\" protokoll: FTP, TFTP, H323 etc. Att aktivera ALG rekommenderas."
            }, {
                type: "name",
                title: "PPTP-genomströmning",
                content: "Markera kryssrutan för att aktivera PPTP Pass-through-funktionen för att tillåta Point-to-Point sessioner tunnla genom ett IP-nätverk och passera genom routern."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Markera kryssrutan för att aktivera L2TP Pass-through-funktionen för att tillåta Layer 2 Point-to-Point sessioner att tunnla genom ett IP-nätverk och passera genom routern."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Markera kryssrutan för att aktivera IPSec Pass-through-funktionen för att tillåta Internet Protocol Security (IPSec) att tunnla genom ett IP-nätverk och passera genom routern. IPSec använder kryptografiska säkerhetstjänster för att säkerställa privata och säker kommunikation över IP-nätverk."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Markera kryssrutan för att aktivera FTP ALG funktionen att tillåta FTP (File Transfer Protocol) klienter och servrar för att överföra data via NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Markera kryssrutan för att aktivera TFTP ALG funktionen för att tillåta TFTP (Trivial File Transfer Protocol) klienter och servrar att överföra data via NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Om du väljer detta kan mediaspelare som klienter kommunicera med strömmande media-servrar via NAT."
            }, {
                type: "name",
                title: "H 323 ALG",
                content: "Markera kryssrutan för att aktivera H323 ALG funktionen för att tillåta Microsoft NetMeeting att kommunicera via NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Markera kryssrutan för att aktivera SIP ALG funktionen för att tillåta SIP-klienter och servrar att överföra data över NAT."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara alla dina inställningar."
            }]
        },
        virtualServer: {
            TITLE: "Virtuella servers",
            CONTENT: [{
                type: "paragraph",
                content: "Virtuella servrar används för att sätta upp offentliga tjänster i ditt lokala nätverk. En virtuell server definieras som en extern port, och alla förfrågningar från Internet till den externa porten kommer att omdirigeras till en angiven dator, som måste konfigureras med en statisk eller reserverad IP-adress."
            }, {
                type: "name",
                title: "Typ av tjänst",
                content: " Visar namnet på din virtuella server."
            }, {
                type: "name",
                title: "Yttre port",
                content: "Visar portnummer eller ett intervall av portar som används av den virtuella servern."
            }, {
                type: "name",
                title: "Intern IP",
                content: "Visar IP-adressen för den dator som erbjuder tjänsten."
            }, {
                type: "name",
                title: "Inre port",
                content: "Visar portnummer för dator som erbjuder tjänsten."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Visar det protokoll som används för tjänsten: TCP, UDP, eller Alla (Alla protokoll som stöds av routern)."
            }, {
                type: "name",
                title: "Status",
                content: "Anger aktuell status för en virtuell server. Klicka på ikonen Bulb att aktivera (eller inaktivera) den virtuella serverposten."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att ändra eller ta bort motsvarande regel."
            }, {
                type: "note",
                title: "<strong>Lägg till en virtual server-post</strong>",
                content: [
                    "Klicka på Lägg till.",
                    "Välj ett gränssnittsnamn från listrutan.",
                    "Klicka på Visa befintliga applikationer och välj en tjänst från listan för att automatiskt fyller i lämpligt portnummer i externa och interna portfälten. Om tjänsten inte finns med i listan, skriv in det externa portnumret (t.ex. 21) eller ett intervall av portar (t.ex. 21-25). Lämna intern port tomt om det är samma som externt port eller ange ett specifikt portnummer (t.ex. 21) om den externa porten är en enda port.",
                    "Ange IP-adressen till den dator som erbjuder tjänsten i den streckade decimalformat i det inre IP fältet.",
                    "Välj ett protokoll för tjänsten: TCP, UDP, eller Alla på listrutan protokoll.",
                    "Välj Aktivera den här posten.",
                    "Klicka på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om du vill ändra eller ta bort en virtuell server post </strong> <br> Klicka på Redigera eller papperskorgen ikonen för motsvarande post."
            }, {
                type: "paragraph",
                content: "<strong> För att ta bort flera poster </strong> <br> Välj alla virtuella poster server som du vill ta bort, klicka på Ta bort ovanför tabellen."
            }, {
                type: "paragraph",
                content: "<strong> Obs! </strong> Om din lokala värdenheten är värd för mer än en typ av tillgängliga tjänster, måste du skapa en virtuell server för varje tjänst."
            }]
        },
        portTrigger: {
            TITLE: "Porttriggning",
            CONTENT: [{
                type: "paragraph",
                content: "Portutlösning används för att vidarebefordra trafik på en viss port till en specifik server i nätverket."
            }, {
                type: "name",
                title: "Typ av tjänst",
                content: "Visar namnet på programmet."
            }, {
                type: "name",
                title: "Triggningsport",
                content: "Visar den utgående trafikporten som används för att starta en filtreringsregel av en utgående anslutning."
            }, {
                type: "name",
                title: "Triggnings-protokoll",
                content: "Visar det protokoll som används för att utlösa port. TCP, UDP, eller Alla (Alla protokoll som stöds av routern)."
            }, {
                type: "name",
                title: "Yttre port",
                content: "Visar porten eller portområde som används av fjärrsystemet. Ett svar genom att använda någon av dessa portar kommer att vidarebefordras till datorn som utlöser denna regel. Du kan mata in högst 5 grupper av portar (eller portsektioner). Varje grupp av portar måste separeras med ett kommatecken, till exempel, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Yttre protokoll",
                content: "Visar det protokoll som används för inkommande port: TCP, UDP eller Alla (alla protokoll som stöds av routern)."
            }, {
                type: "name",
                title: "Status",
                content: "Anger aktuell status för en port-riggningsregel. Klicka på ikonen Bulb att aktivera (eller inaktivera) posten."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att ändra eller ta bort motsvarande post."
            }, {
                type: "note",
                title: "<strong> Så här konfigurerar du en port-triggnings post</strong> <br> <strong> Obs:</strong> Varje post kan bara användas av en värd åt gången.",
                content: [
                    "Klicka på Lägg till.",
                    "Välj ett gränssnittsnamn från listrutan.",
                    "Klicka på Visa befintliga applikationer för att välja ett program från listan för att automatiskt fylla standardvärden i motsvarande fält. Om du vill lägga till ett nytt program skriv manuellt in Program, Utlösande port, Utlösande protokoll, Externt port och externt protokoll.<br> <strong> Obs:</strong> Porttriggande poster kan inte ha några portområden som överlappar varandra ( t.ex. post 1 har portintervall från 4200 till 4205, vilket innebär post 2 inte kan ha portintervallet 4203-4206).",
                    "Välj Aktivera den här posten.",
                    "Klicka på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om du vill ändra eller ta bort en port-posten</strong> <br> Klicka på ikonen Edit (redigera) eller papperskorgen, I tabellen, som motsvarar den post som du vill ändra eller ta bort."
            }, {
                type: "paragraph",
                content: "<strong> Om du vill radera flera triggnings-poster</strong> <br> Markera alla poster i tabellen som du vill ta bort och klicka på Ta bort ovanför tabellen."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "Värdfunktionen DMZ (Demilitarized Zone)  tillåter en lokal värd att använda Internet för en speciell tjänst, som internetspel eller videokonferens. I grund och botten tillåter DMZ en enda dator på ditt LAN att öppna alla sina hamnar. Denna dator måste konfigureras med en statisk IP-adress och ha sin DHCP-klientfunktion inaktiverad."
            }, {
                type: "note",
                title: "<strong>Lägg till en dator eller server som DMZ-server</strong>",
                content: [
                    "Välj Aktivera DMZ.",
                    "Ange IP-adressen för den lokala datorn att vara DMZ-värd.",
                    "Klicka på Save (spara)."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Som standard är Universal Plug-and-Play (UPnP) aktiverad för att tillåta enheter, som datorer och Internet apparater, att automatiskt upptäcka och kommunicera med varandra i det lokala nätverket."
            }, {
                type: "name",
                title: "UPnP",
                content: "Växla till På för att aktivera UPnP-funktionen."
            }, {
                type: "title",
                content: "UPnP Service List"
            }, {
                type: "paragraph",
                content: "UPnP Service List visar enhetsinformation UPnP."
            }, {
                type: "name",
                title: "Totalt antal klienter",
                content: "Visar det totala antalet UPnP-enheter."
            }, {
                type: "name",
                title: "Tjänstebeskrivning",
                content: "Visar en kort beskrivning av den lokala värden som initierar UPnP begäran."
            }, {
                type: "name",
                title: "Yttre port",
                content: "Visar den yttre port som öppnas genom den lokala värden."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Visar typ av  nätverksprotokoll som används av den lokala värden."
            }, {
                type: "name",
                title: "Inre IP adress",
                content: "Visar IP-adressen för den lokala värden."
            }, {
                type: "name",
                title: "Inre port",
                content: "Visar den interna port som öppnas genom den lokala värden."
            }, {
                type: "paragraph",
                content: "Klicka på <strong> Uppdatera <strong> för att uppdatera UPnP serverlista."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Gästnätverk",
            CONTENT: [{
                type: "paragraph",
                content: "Med gästnätverk kan du ställa in ett separat trådlöst nätverk med ett separat nätverksnamn (SSID) och lösenord som dina gäster kan använda för att ansluta till Internet."
            }, {
                type: "title",
                content: "Inställningar"
            }, {
                type: "name",
                title: "Tillåt gäster att se varandra",
                content: "Markera denna kryssruta för att tillåta trådlösa enheter i gästnätverk att kommunicera med varandra."
            }, {
                type: "name",
                title: "Tillåt gäster att komma åt mitt lokala nätverk",
                content: "Markera denna kryssruta för att tillåta trådlösa enheter i gästnätverk att komma åt det lokala nätverket."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara alla dina inställningar."
            }, {
                type: "title",
                content: "Trådlösa inställningar"
            }, {
                type: "name",
                title: "2,4GHz | 5GHz gästnätverk",
                content: "Klicka på motsvarande knapp för att göra det möjligt för 2,4 GHz | 5GHz Gästnätverk."
            }, {
                type: "name",
                title: "Gästnätverk SSID",
                content: "Använd antingen standard-SSID eller skapa ett nytt namn med hjälp av en till 32 tecken. Det här fältet är skiftlägeskänsligt."
            }, {
                type: "name",
                title: "Säkerhet",
                content: "Välj ett säkerhetsalternativ för gästnätverk:",
                children: [{
                    type: "name",
                    title: "  Ingen",
                    content: "Som standard är gästnätverkssäkerhet inställd på Ingen; vem som helst kan få tillgång."
                }, {
                    type: "name",
                    title: "WPA / WPA2 - personligt",
                    content: "Välj det här alternativet för att aktivera standardautentiseringsmetod baserad på en Pre-shared Key (PSK), även kallad lösenfras. Om vald, konfigurera följande.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Välj en säkerhetsversion för Guest Network.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Det här alternativet stöder flera tekniker av WPA (Wi-Fi Protected Access) standard, såsom WPA och WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Det här alternativet stöder AES-kryptering som ger en högre säkerhet än WPA-PSK och rekommenderas."
                        }]
                    }, {
                        type: "name",
                        title: "kryptering",
                        content: "Välj en säkerhetskryptering: Auto (för både TKIP och AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det är INTE rekommenderat att använda TKIP-kryptering om routern verkar i 802.11n-läge, eftersom TKIP inte stöds av 802.11n-specifikationen. Om TKIP är vald, kommer WPS-funktionen iinaktiveras."
                    }]
                }]
            }, {
                type: "name",
                title: "Lösenord",
                content: "Skapa ett lösenord mellan 8 och 63 ASCII-tecken eller mellan 8 och 64 hexadecimaltecken (0-9, AF, AF)."
            }, {
                type: "paragraph",
                content: "Instruktionerna för 2.4GHz gästnätverk ovan gäller också för 5GHz gästnätverk."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara alla dina inställningar."
            }]
        },
        wirelessStat: {
            TITLE: "Enheter online",
            CONTENT: [{
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen för anslutna trådlösa klienten."
            }, {
                type: "name",
                title: "Anslutningstyp",
                content: "Visar frekvensbandet (2.4 GHz eller 5 GHz) som den trådlösa klienten är ansluten till."
            }, {
                type: "name",
                title: "Säkerhet",
                content: "Visar typen säkerhet (Ingen, WEP, WPA/WPA2-Personligt, eller WPA/WPA2-Enterprise) av den tillhörande trådlösa klienten."
            }, {
                type: "name",
                title: "Mottagna paketen",
                content: "Visar antalet paket som tas emot av den tillhörande trådlösa klienten."
            }, {
                type: "name",
                title: "Sända paket",
                content: "Visar antalet paket som skickas av tillhörande trådlösa klienten."
            }, {
				type: "name",
				title: "Överföringshastighet",
				content: "Visar hastigheten för sista paket som tas emot av den anslutna trådlösa klienten."
			}, {
                type: "paragraph",
                content: "Klicka på <strong>Uppdatera</strong> för att uppdatera informationen på denna sida."
            }]
        },
        wirelessAdv: {
            TITLE: "Avancerade inställningar",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Välj 2.4GHz | 5GHz för att ställa sina avancerade trådlösa inställningar."
            }, {
                type: "name",
                title: "Beacon-intervall",
                content: "Ange ett värde mellan 25 och 1000 i millisekunder för att bestämma paus mellan beacon-paket som sänds av routern för att synkronisera det trådlösa nätverket. Standardvärdet är 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-tröskelvärde",
                content: "Ange ett värde mellan 1 och 2346 för att bestämma paketstorlek på dataöverföring via routern. Som standard RTS (Request to Send) är 2346. Om paketstorleken är större än den förinställda tröskeln sänder routern Request to Send ramar till en viss mottagarstation och förhandlar sändning av en dataram, annars kommer paket att skickas omedelbart."
            }, {
                type: "name",
                title: "DTIM-intervall",
                content: "Ange ett värde mellan 1 och 255 för att bestämma intervallet för Delivery Traffic Indication Message (DTIM). 1 indikerar DTIM-intervall är detsamma som Beacon Intervall."
            }, {
                type: "name",
                title: "Gruppnyckel uppdateringsperiod",
                content: " Ange antal sekunder (minst 30) för att styra tidsintervallet för krypteringsnyckeln automatisk förnyelse. Standardvärdet är 0, vilket är ingen nyckelförnyelse."
            }, {
                type: "name",
                title: "WMM",
                content: "Den här funktionen garanterar att paket med hög prioritet sänds först. WMM är aktiverat tvångsmässigt enligt 802.11n eller 802.11ac läge. Det rekommenderas starkt att aktivera WMM."
            }, {
                type: "name",
                title: "kort GI",
                content: "Den här funktionen är aktiverad som standard och rekommenderas för att öka datakapacitet genom att minska Guard Interval (GI) tid."
            }, {
                type: "name",
                title: "AP isolering",
                content: " Markera kryssrutan för att aktivera funktionen AP Isolation  som gör att du kan begränsa alla trådlösa enheter i ditt nätverk från att interagera med varandra, men ändå kunna komma åt Internet. AP isolering är inaktiverad som standard."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS bryggning",
                content: "Markera denna kryssruta för att aktivera WDS (Wireless Distribution System) Bridging för att låta routern att överbrygga med en annan åtkomstpunkt (AP) i ett trådlöst lokalt nätverk (WLAN). Om aktiverad, konfigurera följande:"
            }, {
                type: "name",
                title: "SSID (att överbryggas)",
                content: "Ange SSID för WAP (Wireless Access Point) som routern kommer att ansluta till en klient eller använd Survey funktionen för att skanna och visa alla tillgängliga nätverk inom räckhåll."
            }, {
                type: "name",
                title: "MAC-adress (som skall överbryggas)",
                content: "Ange MAC-adressen i 12 hexadecimala tecken (0-9, af, AF) format åtskilda av bindestreck av WAP som routern kommer att ansluta till en kund. Om du väljer ett nätverk genom Survey funktionen fylls MAC-adressfältet i automatiskt."
            }, {
                type: "name",
                title: "Undersökning",
                content: "Klicka på den här knappen för att skanna och visa MAC-adressen, SSID, signalstyrka, kanal och säkerhetsinformationen för alla tillgängliga trådlösa nätverk inom räckhåll. När du väljer ett nätverk, så kommer SSID, MAC-adress, och säkerhet automatiskt att fyllas i.",
                children: [{
                    type: "name",
                    title: "AP lista",
                    content: "Visar information om AP som din router kommer att ansluta till."
                }, {
                    type: "name",
                    title: "MAC-adress",
                    content: "Visar MAC-adressen för AP din router kommer att ansluta till som kund."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Visar SSID för den AP som din router kommer att ansluta till som  kund."
                }, {
                    type: "name",
                    title: "Signalstyrka",
                    content: "Visar signalstyrkan i AP som din router som kommer att ansluta till en kund."
                }, {
                    type: "name",
                    title: "Kanal",
                    content: "Visar kanalen för din AP din router kommer att ansluta till som en kund."
                }, {
                    type: "name",
                    title: "Kryptering",
                    content: "Visar krypteringstypen för AP din router kommer att ansluta till en kund."
                }, {
                    type: "name",
                    title: "Anslut",
                    content: "Klicka på ikonen för att ansluta till eller koppla från motsvarande AP."
                }]
            }, {
                type: "name",
                title: "Säkerhet",
                content: "Välj en av följande säkerhetsalternativ:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Välj detta alternativ för att inaktivera trådlös säkerhet. Det rekommenderas starkt att du aktiverar trådlös säkerhet för att skydda ditt trådlösa nätverk från obehörig åtkomst."
                }, {
                    type: "name",
                    title: "WPA/WPA2 personlig",
                    content: "Välj det här alternativet för att aktivera standardautentiseringsmetod baserad på en Pre-shared Key (PSK), även kallad lösenfras. Det här alternativet rekommenderas. Om vald, konfigurera följande.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Välj en säkerhets version för ditt trådlösa nätverk.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Det här alternativet stöder AES-kryptering som ger en lägre säkerhetsnivå än WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Det här alternativet stöder AES-kryptering som ger en högre säkerhet än WPA-PSK och rekommenderas."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Välj en säkerhetskryptering: TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det är INTE rekommenderat att använda TKIP-kryptering om routern verkar i 802.11n-läge, eftersom TKIP inte stöds av 802.11n-specifikationen. Om TKIP är vald, kommer WPS-funktionen att inaktiveras."
                    }, {
                        type: "name",
                        title: "Lösenord",
                        content: "Ange en trådlös lösenord mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimaltecken i detta fält."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Välj det här alternativet för att aktivera grundläggande autentiseringsmetod om någon version av dina klientenheter bara kan få tillgång till trådlöst via WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Välj en autentiseringstyp för ditt trådlösa nätverk. Välj Öppet system eller Delad nyckel baserat på kapacitet och åtkomstbegäran för den trådlösa klienten."
                    }, {
                        type: "name",
                        title: "WEP-nyckelformat",
                        content: "Välj antingen ASCII-format eller hexadecimalt. ASCII-format är en kombination av bokstäver och siffror. Hexadecimalt format är en kombination av det antal (0-9) och bokstäver (AF, AF)."
                    }, {
                        type: "name",
                        title: "Nyckelindex",
                        content: "Välj vilken av de fyra nycklarna som kommer att användas och ange matchande WEP-nyckel som du skapar i fältet Nyckelvärde. Se till att dessa värden är identiska på alla trådlösa stationer i nätverket."
                    }, {
                        type: "name",
                        title: "Nyckelvärde",
                        content: "Ange matchande WEP-nyckel som du skapar."
                    }]
                }]
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara inställningar."
            }]
        },
        wirelessSchedule: {
            TITLE: "Trådlöst schema",
            CONTENT: [{
                type: "paragraph",
                content: "Det effektiva tidsschemat baseras på tiden i routern. Tiden kan ställas in i Systemverktyg -> Tidsinställningar"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Välj 2.4GHz eller 5 GHz för att ställa sin trådlösa scheman."
            }, {
                type: "name",
                title: "Trådlöst schema",
                content: "Växla På om du vill aktivera den här funktionen. Klicka sedan på och dra över cellerna för att ställa in tid för att stänga av trådlöst."
            }, {
                type: "name",
                title: "Återställ",
                content: "Klicka Tidval."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara inställningar."
            }]
        },
        macFilter: {
            TITLE: "Inställningar MAC filter",
            CONTENT: [{
                type: "name",
                title: "MAC-filtrering",
                content: "Växla till På för att styra trådlös åtkomst med hjälp av MAC-adressen för enskilda enheter."
            }, {
                type: "title",
                title: "Filtreringsregler"
            }, {
                type: "name",
                title: "Blockera trådlös åtkomst från enheterna i nedanstående lista.",
                content: "Välj blockera trådlös åtkomst från enheterna i listan nedan."
            }, {
                type: "name",
                title: "Tillåt trådlös åtkomst från enheter endast i nedanstående lista.",
                content: "Välj att tillåta trådlös åtkomst endast från enheterna i listan nedan."
            }, {
                type: "title",
                title: "Enhetslista"
            }, {
                type: "name",
                title: "MAC-adress/beskrivning",
                content: "Visa MAC-adressen och beskrivningen av anordningen."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Klicka på ikonen Bulb för att aktivera eller inaktivera MAC-filtrering av enheten."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att ändra eller ta bort motsvarande post."
            }, {
                type: "note",
                title: "Lägg till en ny enhet",
                content: [
                    "Klicka på Lägg till.",
                    "Ange MAC-adressen för den enhet.",
                    "Ange en beskrivning av enheten.",
                    "Klicka på Aktivera den här posten.",
                    "Klicka på OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Trådlösa inställningar",
            CONTENT: [{
                type: "name",
                title: "Smart Connect",
                content: "Markera denna kryssruta för att aktivera Smart Connect. Denna funktion hjälper enheter fungera snabbare genom att tilldela dem till bästa trådlösa band som grundar sig på faktiska förhållanden för att balansera nätverkskrav."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Välj 2.4GHz | 5GHz för att ändra motsvarande inställningar."
            }, {
                type: "name",
                title: "trådlös Radio",
                content: "Markera kryssrutan för att aktivera 2.4GHz | 5GHz radiofrekvensen."
            }, {
                type: "name",
                title: "Namn på trådlöst nätverk (SSID)",
                content: "Du kan lämna standardnätverksnamnet (SSID) som det är, eller skapa ett nytt namn (upp till 32 tecken). Det här fältet är skiftlägeskänsligt."
            }, {
                type: "name",
                title: "Göm SSID",
                content: "Markera den här kryssrutan om du vill dölja 2.4GHz | 5GHz nätverksnamn (SSID) från nätverket listan Wi-Fi."
            }, {
                type: "name",
                title: "Säkerhet",
                content: "Välj en av följande säkerhetsalternativ:",
                children: [{
                    type: "name",
                    title: "Ingen säkerhet",
                    content: "Välj detta alternativ för att inaktivera trådlös säkerhet. Det rekommenderas starkt att du aktiverar trådlös säkerhet för att skydda ditt trådlösa nätverk från obehörig åtkomst."
                }, {
                    type: "name",
                    title: "WPA/WPA2 personlig",
                    content: "Välj det här alternativet för att aktivera standardautentiseringsmetod baserad på en Pre-shared Key (PSK), även kallad lösenfras. Det här alternativet rekommenderas. Om vald, konfigurera följande.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Välj en säkerhets version för ditt trådlösa nätverk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Det här alternativet stöder flera tekniker av WPA (Wi-Fi Protected Access) standard, såsom WPA och WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Det här alternativet stöder AES-kryptering som ger en högre säkerhet än WPA-PSK och rekommenderas."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Välj en säkerhetskryptering: Auto (för både TKIP och AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det är INTE rekommenderat att använda TKIP-kryptering om routern verkar i 802.11n-läge, eftersom TKIP inte stöds av 802.11n-specifikationen. Om TKIP är vald, kommer WPS-funktionen iinaktiveras."
                    }, {
                        type: "name",
                        title: "Lösenord",
                        content: "Skapa ett trådlöst lösenord mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimala tecken i det här fältet."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Välj det här alternativet för att aktivera den mer avancerade autentiseringsmetod som använder en RADIUS (Remote Authentication Dial I User Service) servern. Om du väljer kommer WPS-funktionen inaktiveras.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Välj en säkerhetsversion för ditt trådlösa nätverk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Det här alternativet stöder flera tekniker av WPA (Wi-Fi Protected Access) standard, såsom WPA och WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Det här alternativet stöder AES-kryptering som ger en högre säkerhet än WPA och rekommenderas."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Välj en säkerhetskryptering: Auto (för både TKIP och AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det är INTE rekommenderat att använda TKIP-kryptering om routern verkar i 802.11n-läge, eftersom TKIP inte stöds av 802.11n-specifikationen. Om TKIP är vald, kommer WPS-funktionen iinaktiveras."
                    }, {
                        type: "name",
                        title: "RADIUS-server IP",
                        content: "Ange IP-adressen för RADIUS-servern."
                    }, {
                        type: "name",
                        title: "RADIUS-server port",
                        content: "Ange portnumret för RADIUS-servern."
                    }, {
                        type: "name",
                        title: "RADIUS-server lösenord",
                        content: " Ange den delade lösenord för RADIUS-servern."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Välj det här alternativet för att aktivera den grundläggande autentiseringsmetod om någon version av dina klientenheter bara kan få tillgång till trådlöst via WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Välj en autentiseringstyp för ditt trådlösa nätverk. Standardinställningen är Auto, som automatiskt väljer Öppet system eller Delad nyckel baserat på kapacitet och åtkomstbegäran för den trådlösa klienten."
                    }, {
                        type: "name",
                        title: "Vald nyckel",
                        content: "Välj vilken av de fyra nycklarna som kommer att användas och skapa en WEP-nyckel i nyckel fältet Värde. Trådlösa klienter måste ange matchande WEP-nyckel för att ansluta till ditt nätverk."
                    }, {
                        type: "name",
                        title: "WEP-nyckelformat",
                        content: "Använd ASCII-format eller Hexadecimal. ASCII-format är en kombination av bokstäver och siffror. Hexadecimalt format är en kombination av det antal (0-9) och bokstäver (AF, AF)."
                    }, {
                        type: "name",
                        title: "Nyckeltype",
                        content: "Välj WEP-nyckellängd.",
                        children: [{
                            type: "name",
                            title: "64-bitars kryptering",
                            content: "Gör att du kan skriva in 10 hexadecimala siffror (0-9, AF, af) eller 5 ASCII-tecken i WEP fältet Värde."
                        }, {
                            type: "name",
                            title: "128-bitars kryptering",
                            content: "Här kan du ange 26 hexadecimala siffror (0-9, AF, af) eller 13 ASCII-tecken i WEP fältet Värde."
                        }]
                    }, {
                        type: "name",
                        title: "Nyckelvärde",
                        content: "Skapa en WEP-nyckel."
                    }]
                }]
            }, {
                type: "name",
                title: "Läge",
                content: "Välj en typ av blandad överföring."
            }, {
                type: "name",
                title: "Kanal",
                content: "Välj ett driftskanal för det trådlösa nätverket. Standardkanalen är Auto. Ändrar inte det om du upplever den intermittenta trådlösa anslutningsproblemet."
            }, {
                type: "name",
                title: "Kanalbredd",
                content: "Välj en kanalbredd (bandbredd) för det trådlösa nätverket."
            }, {
                type: "name",
                title: "Sändningseffekt",
                content: "Välj antingen hög, mellan eller låg för att ange datasändningseffekten. Standard och rekommenderade inställningen är hög."
            }, {
                type: "paragraph",
                content: "Klicka på <strong> Spara</strong> för att spara alla dina inställningar."
            }]
        },
        wps: {
            TITLE: "Router PIN",
            CONTENT: [{
                type: "name",
                title: "Router PIN",
                content: "Slå på På för att tillåta trådlösa enheter ansluter till routern med hjälp av routerns PIN-kod (Personal Identification Number)."
            }, {
                type: "name",
                title: "Nuvarande PIN",
                content: "Visar routerns nuvarande PIN-kod. Standard-PIN kan hittas på etiketten på routern eller i användarhandboken. Klicka på Skapa för att skapa en ny PIN slumpmässigt eller klicka på för att återställa den aktuella PIN tillbaka till standard PIN."
            }, {
                type: "title",
                content: "WPS-inställningar"
            }, {
                type: "name",
                title: "Tryckknapp (rekommnderas)",
                content: "Välj den här installationsmetod för att göra det möjligt för WPS funktionen för att enkelt ansluta en WPS aktiverad enhet till ditt trådlösa nätverk med WPS-knappen eller nästan med knappen Anslut."
            }, {
                type: "name",
                title: "PIN-kod",
                content: "Välj den här installationsmetod för att lägga till en enhet manuellt genom att ange den trådlösa enheten WPS PIN-kod i fältet."
            }, {
                type: "name",
                title: "Anslut",
                content: "Klicka här för att starta WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Föräldrakontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Med Föräldrakontroll kan du blockera olämpliga, explicita och skadliga webbplatser; begränsa tillgången av vissa tider på dygnet (till exempel Facebook eller YouTube under läxtid)."
            }, {
                type: "name",
                title: "Status",
                content: "Växla till På för att aktivera funktionen Föräldrakontroll. Som standard är den här funktionen inaktiverad."
            }, {
                type: "title",
                content: "Enheter under Föräldrakontroll"
            }, {
                type: "paragraph",
                content: "Enheter under Föräldrakontroll visar en lista över enheter som begränsas av Föräldrakontroll."
            }, {
                type: "name",
                title: "Enhetsnamn",
                content: "Visar namnet på alla anslutna klientenheter som är närvarande under Föräldrakontroll."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen för alla anslutna klientenheter som för närvarande är under Föräldrakontroll."
            }, {
                type: "name",
                title: "Effektiv tid",
                content: "Visar åtkomstbegränsning tidsperioder."
            }, {
                type: "name",
                title: "Beskrivning",
                content: "Visar en kort beskrivning av den anslutna enheten."
            }, {
                type: "name",
                title: "Status",
                content: "Anger huruvida Föräldrakontroll är aktiverat för motsvarande enhet. Klicka på ikonen Bulb att aktivera (eller inaktivera) den."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ för att ändra eller ta bort motsvarande enhet."
            }, {
                type: "note",
                title: "<string> För att begränsa en ny klientenhet </strong>",
                content: [
                    "Klicka på Lägg till.",
                    "Klicka på Visa befintliga enheter att välja en ansluten enhet från enhetslista; eller ange enhetsnamn och MAC-adress manuellt för att lägga till en enhet som inte är ansluten.",
                    "Klicka på den effektiva tidsikonen för att ange en tidsperiod under vilken begränsning gäller.",
                    "Ange en kort beskrivning i fältet Beskrivning. Detta fält är tillval.",
                    "Välj Aktivera.",
                    "Klicka OK för att spara den här posten."
                ]
            }, {
                type: "paragraph",
                content: "<b> Om du vill ändra eller ta bort en enhet</b><br> I enhetslistan under Föräldrakontroll, klicka på ikonen Redigera eller papperskorgen som motsvarar den enhet du vill ändra eller ta bort."
            }, {
                type: "paragraph",
                content: "<b> För att radera flera enheter</b><br> I enheter under Föräldrakontrollistan, markera motsvarande kryss av enheterna som ska raderas och klicka på Ta bort ovanför tabellen."
            }, {
                type: "title",
                title: "Innehållsrestriktion"
            }, {
                type: "paragraph",
                content: "Innehållsbegränsning gör att du kan begränsa åtkomsten till innehållet med hjälp av sökord och domännamn att klientenheter som styrs av Föräldrakontroll kan eller inte kan komma åt beroende på vilken typ av begränsning."
            }, {
                type: "name",
                title: "Begränsningstyp",
                content: "Välj följande restriktionstyp:",
                children: [{
                    type: "name",
                    title: "Svartlista",
                    content: "Innehåller sökord och domännamn som ska användas för att blockera webbplats åtkomst från klientenheter som anges i enheter under listan Parent Controls."
                }, {
                    type: "name",
                    title: "Vitlista",
                    content: "Innehåller sökord och domännamn som klientenheter som anges i enheter under listan Parent Controls tillåts komma åt."
                }]
            }, {
                type: "name",
                title: "Lägg till nytt nyckelord",
                content: "Klicka här för att lägga till ett nytt nyckelord eller domännamn till Blacklist eller Whitelist."
            }, {
                type: "paragraph",
                content: "Om du vill ta bort ett nyckelord eller domännamn, klickar du på - (minus) bredvid det objekt som du vill ta bort."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara konfigurationen."
            }]
        },
        parentCtrl: {
            TITLE: "Föräldrakontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Med ålders-filter, accessgränser och användarprofiler och föräldrakontroll erbjuds din familj personlig och lämplig tillgång till internet."
            }, {
                type: "note",
                title: "<strong>Att tillämpa föräldrakontroll för en ny enhet</strong>",
                content: [
                    "Klicka på Lägg till.",
                    "Ange ett namn för denna profil och klicka på \"+\" för att lägga enheten(-erna) under denna profil.",
                    "Välj en filternivå och anpassa filterinnehåll efter dina behov. Du kan ange nyckelord för att söka efter webbplatser som du vill filtrera i vår databas. Andra webbplatser (URL: er) kan skrivas in manuellt <br/> Se följande förklaringar till de olika filterkategorier: <p> Webbplatser med vuxen-innehåll som innehåller sexuellt, skadligt eller olagligt innehåll, inklusive pornografi, drogmissbruk, våld och diskriminering. </p><p> visa - webbplatser som främjar eller tillhandahåller information om spel, inklusive onlinespel webbplatser </p><p> Sexutbildning - webbplatser som diskuterar sexualitet informativt, inklusive reproduktion, sexualitet, säker sex och preventivmedel, sexuellt överförda sjukdomar och att hantera sexuella trauman </p> <p> Online Communication - webbplatser som värd för att kommunicera med andra genom text, röst eller video, inklusive e-post, bloggar, online-forum, IP-telefoni och video nättjänster </p><p> sociala nätverk - webbplatser som distribuerar personligt uttryck eller kommunikation, som förbinder människor och deras personliga aktivitet baserad på liknande intressen, karriärer, bakgrunder eller verkliga bekantskap </p><p> betala Surf - webbplatser som kompenserar användare att visa viss webbplatser, e-postmeddelanden, eller reklam, klicka på länkar eller svara på undersökningar </p><p> Media - webbplatser som erbjuder gratis, betald eller tecknade ljud- och / eller videoinnehåll, inklusive streamingtjänster, TV-program eller nedladdning av musik </p><p> Downloads - webbplatser som tillhandahåller eller ger tillgång till fildelning och distribution, inbegripet peer-to-peer-delning, fillagring och mobila enhet innehåll (t.ex. musik och appar) </p><p> Spel - webbplatser att tillhandahålla eller ge tillgång till webb värd eller nedladdningsbara spel, inklusive online-spel, spelkonsol nätverk och webbläsarspel </p>",
                    "Om du vill begränsa den totala tiden denna profil kan vara på nätet, aktivera och ange tidsgränser. Du kan också använda sov-tid för att ställa in en daglig tidsperiod under vilken enheter under denna profil inte kan använda internet.",
                    "Klicka på Spara."
                ]
            }, {
                type: "note",
                title: "<strong>Visa en profils detaljerade Internethistoria</strong>",
                content: [
                    "I kolumnen Insights klicka på motsvarande knapp.",
                    "Om du vill se fler poster, klicka på Historik <span class=\"ptl-ctr-help-icon history\"></span> knappen.",
                    "Du kan blockera eller avblockera webbplatser genom att klicka på <span class=\"ptl-ctr-help-icon block\"></span> eller knappen <span class=\"ptl-ctr-help-icon unblock\"></span>."
                ]
            }, {
                type: "note",
                title: "<strong>Aktivera eller inaktivera omedelbart tillgång till internet</strong>",
                content: [
                    "I Internet kolumnen klickar du på <span class=\"ptl-ctr-help-icon stop\"></span> för att stoppa motsvarande profilens enheter från att komma åt Internet och klicka på <span class=\"ptl-ctr-help-icon enable\"></span> för att aktivera åtkomst igen."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "QoS (Quality of Service) funktionen prioriterar online-aktiviteter och enheter för att garantera en snabbare nätverksanslutning när du behöver den mest."
            }, {
                type: "paragraph",
                content: "Välj Application Priority för att prioritera nätverkshastighet för online-aktiviteter, och välj Device Priority att prioritera nätverkshastighet för enheter."
            }, {
                type: "title",
                content: "Program-prioritet"
            }, {
                type: "paragraph",
                content: "Välj den online-aktivitet som du vill prioritera eller klicka på Custom (Anpassad) för att ställa in prioritetsnivån för varje online-aktivitet."
            }, {
                type: "title",
                content: "Enhets-prioritet"
            }, {
                type: "paragraph",
                content: "Välj enheten (-er) som du vill prioritera och hur länge de kommer att prioriteras."
            }, {
                type: "note",
                title: "<strong>Prioritera en enhet</strong>",
                content: [
                    "Hitta den enhet som du vill prioritera i listan och växla prioritet.",
                    "Välj hur länge enheten kommer att prioriteras anges i kolumnen Timing."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Antivirus",
            CONTENT: [{
                type: "paragraph",
                content: "Med tät skanning av nätverk , upptäcks skadliga webbplatser och infekterade enheter isoleras. Antivirus funktionen håller din personliga information säker. Du kan också kontrollera hur nätverket är skyddat, och om det har förekommit några attacker på nätverket."
            }, {
                type: "paragraph",
                content: "Historia - Spelar in de enheter som har skyddats av Antivirus och källan och klassificering av attackerna."
            }, {
                type: "paragraph",
                content: "Aktivera alla - Ange för att göra det möjligt för alla skyddstyper Om ett eller flera inte är aktiverade."
            }, {
                type: "paragraph",
                content: "Skyddstyper - Aktivera skydd typer genom att hänvisa till förklaringarna. Det rekommenderas att aktivera alla skyddstyper."
            }]
        },
        applicationPriority: {
            TITLE: "Program-prioritet",
            CONTENT: [{
                type: "paragraph",
                content: "Funktionen program-priorit anger online-aktiviteter för att garantera en snabbare nätverksanslutning när du behöver det mest. Välj den online-aktivitet som du vill prioritera eller klicka på Anpassad för att ställa in prioritetsnivån för varje online-aktivitet."
            }]
        },
        devicePriority: {
            TITLE: "Enhets-prioritet",
            CONTENT: [{
                type: "paragraph",
                content: "Funktionen enhets-prioritet anger enheter för att garantera en snabbare nätverksanslutning när du behöver det mest. Välj enheten (-er) som du vill prioritera och hur länge de skall prioriteras."
            }, {
                type: "note",
                title: "<strong>Prioritera en enhet</strong>",
                content: [
                    "Hitta den enhet som du vill prioritera i listan och växla prioritet.",
                    "Välj hur länge enheten kommer att prioriteras anges i kolumnen Timing."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Gästnätverk",
            CONTENT: [{
                type: "paragraph",
                content: "Med gästnätverk kan du ställa in ett separat trådlöst nätverk med ett separat nätverksnamn (SSID) och lösenord som dina gäster kan använda för att ansluta till Internet."
            }, {
                type: "name",
                title: "Tillåt gäster att se varandra",
                content: "Markera denna kryssruta för att tillåta trådlösa enheter på gästnätverk för att kommunicera med varandra."
            }, {
                type: "name",
                title: "Tillåt gäster att komma åt mitt lokala nätverk",
                content: "Markera denna kryssruta för att tillåta trådlösa enheter på gästnätverk för att få tillgång till det lokala nätverket."
            }, {
                type: "name",
                title: "Trådlös nätverks 2.4GHz | 5GHz",
                content: "Välj motsvarande knapp för att göra det möjligt för 2.4 GHz | 5GHz gästnätverk."
            }, {
                type: "name",
                title: "Gästnätverk SSID",
                content: "Använd antingen standard-SSID eller skapa ett nytt namn med hjälp av en till 32 tecken. Det här fältet är skiftlägeskänsligt."
            }, {
                type: "name",
                title: "Göm SSID",
                content: "Markera den här kryssrutan om du vill dölja gästnätverk SSID."
            }, {
                type: "name",
                title: "Säkerhet",
                content: "Välj ett säkerhetsalternativ för gästnätverk:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Som standard är gästnätverkssäkerhet inställd på Ingen; vem som helst kan få tillgång."
                }, {
                    type: "name",
                    title: "Välj lösenord",
                    content: "Skapa ett lösenord för gästnätverk mellan 8 och 63 ASCII-tecken eller mellan 8 och 64 hexadecimaltecken (0-9, AF, AF) i fältet Lösenord."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Internet-status",
                content: "Visar aktuell status för Internet-anslutningen av routern."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Anslutningstyp",
                content: "Visar vilken typ av Internet-anslutning."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IP-adress",
                content: "Visar aktuell IP-adress som tilldelats routern."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "DNS-server",
                content: "Visar IP-adresserna för den primära och sekundära DNS-servrar."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Gateway",
                content: "Visar IP-adressen för gateway."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "MAC-adress",
                "content": "Visar routerns unika fysiska adress."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "IP-adress",
                "content": "Visar IP-adressen för routern, som kan användas för att logga in på routerns webbhanteringssida."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Nätmask",
                "content": "Visar routerns nätmask."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Adresstyp",
                "content": "Visar konfigurationstypen av routerns IP-adress."
            }, {
	    display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
               type: 'title',
                title: 'Hastighetstest'
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
                title: "Router"
            }, {
                type: "title2",
                content: "2.4GHz | 5GHz Trådlöst"
            }, {/*
                type: "name",
                title: "Status",
                content: "Visar om 2.4GHz | 5GHz trådlöst är På eller Av."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Visar det trådlösa nätverkets namn på 2.4GHz | 5GHz frekvensband."
            }, {
                type: "name",
                title: "Kanal",
                content: "Visar den kanal som det trådlösa 2.4 GHz | 5GHz nätverket sänder på."
            }, {
                type: "name",
                title: "MAC",
                content: "Visar den aktuella MAC-adressen för den trådlösa 2.4 GHz | 5GHz."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "2.4GHz | 5GHz gästnätverk"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Status",
                content: "Visar om 2.4GHz | 5GHz gästnätverk är På eller Av."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Visar det trådlösa nätverksnamnet för Gästnätverk."
            }, {
                type: "title",
                title: "Trådlöst/trådbundna klienter"
            }, {
                type: "name",
                title: "Namn",
                content: "Visar namnet på den klient som är ansluten till routern."
            }, {
                type: "name",
                title: "IP-adress",
                content: "Visar den tilldelade IP-adressen för klienten."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen för klienten."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Telefon"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Telefonnamn",
                content: "Visar namnet på din telefon."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Inkommande samtalsnummer",
                content: "Visar de nummer som används av dina telefonienheter för att ta emot inkommande samtal via din router."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Internt nummer",
                content: "Visar telefonnummer som används för att ringa mellan telefonienheter som är anslutna till samma router. Det är förinställt och kan inte ändras."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Antal Utgående",
                content: "Visar de nummer som används av dina telefonienheter för att göra utgående samtal via din router. Standardinställningen är Auto, vilket innebär att routern kommer att välja ett tillgängligt nummer att vara utgående nummer som kan ändras på VoIP sidan."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Skrivare"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Namn",
                content: "Visar namnet på skrivaren som är ansluten till routern via USB-porten."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "USB-disk"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Stämpla",
                content: "Visar märket på USB-enheten ansluten till routern."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Total",
                content: "Visar den totala volymen av USB-disk."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Tillgängliga",
                content: "Visar det tillgängliga utrymmet på USB-disk"
            }]
        },
		sysMode: {
            TITLE: "Driftläge",
            CONTENT: [{
                type: "name",
                title: "Router",
                content: "I det här läget, ansluter routern direkt till Internet via dynamisk IP, statisk IP, PPPoE, L2TP eller PPTP och delar Internet-åtkomst till flera trådbundna eller trådlösa enheter. NAT, brandvägg och DHCP-servern är aktiverad som standard. Välj den här funktionen om du är en förstagångsanvändare eller om du inte använder några andra routrar."
            }, {
                type: "name",
                title: "Access Point",
                content: "I det här läget, ansluter routern till en trådbunden eller trådlös router via Ethernet-kabel och förlänger den trådlösa täckningen av det befintliga nätverket. Funktioner som NAT, Föräldrakontroll och QoS stöds inte i det här läget. IP-adressen för denna router tilldelas av rot-routerns DHCP-server. Om du inte känner till IP-adressen för denna router kan du använda http://tplinkwifi.net att logga in på webbhanteringssidan."
            }]
		},
        wirelessBasic: {
            TITLE: "Trådlösa inställningar",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz trådlöst nätverk",
                content: "Markera kryssrutan för att aktivera 2.4GHz | 5GHz radiofrekvens."
            }, {
                type: "name",
                title: "Namn på trådlöst nätverk (SSID)",
                content: "Du kan lämna standardnätverksnamnet (SSID) som det är, eller skapa ett nytt namn (upp till 32 tecken). Det här fältet är skiftlägeskänsligt."
            }, {
                type: "name",
                title: "Lösenord",
                content: "Skapa ett trådlöst lösenord mellan 8 och 63 ASCII-tecken, eller mellan 8 och 64 hexadecimaltecken. Det här fältet är skiftlägeskänsligt."
            }, {
                type: "name",
                title: "Göm SSID",
                content: "Markera den här kryssrutan om du vill dölja 2.4GHz | 5GHz SSID från Wi-Fi nätverkslistan."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Visar relevant information om Internet-anslutningen."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Namn",
                content: "Visar namnet av Internet-porten på routern."
            }, {*/
                type: "name",
                title: "MAC-adress",
                content: "Den unika fysiska adress som tilldelats routerns Internetport (WAN) "
            }, {
                type: "name",
                title: "IP-adress",
                content: "IP-adressen som tilldelats porten Internet (WAN) i routern. Om IP-adressen visas som 0.0.0.0, indikerar det ingen tillgång till Internet."
            }, {
                type: "name",
                title: "Nätmask",
                content: "Denna parameter bestämmer nätverksdelen och värddelen av en IP-adress."
            }, {
                type: "name",
                title: "Standrd gateway",
                content: "IP-adressen som används för att ansluta routern till nätverket."
            }, {
                type: "name",
                title: "Primär DNS/Sekundär DNS",
                content: "Domain Name System (DNS) översätter värdnamn och Internet-domäner till IP-adresser. Information om dessa DNS-servrar tilldelas av Internet Service Provider (ISP)."
            }, {
                type: "name",
                title: "Anslutningstyp",
                content: "Den aktuella anslutningen typ av Internet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Den unika fysiska adress som tilldelats routerns Internetport (WAN) "
            }, {
                type: "name",
                title: "IP-adress",
                content: "IPv6-adressen som tilldelats porten Internet (WAN) i routern."
            }, {
                type: "name",
                title: "Standard gateway",
                content: "IP-adressen som används för att ansluta routern till nätverket."
            }, {
                type: "name",
                title: "Primär DNS/Sekundär DNS",
                content: "Domain Name System (DNS) översätter värdnamn och Internet-domäner till IP-adresser. Information om dessa DNS-servrar tilldelas av Internet Service Provider (ISP)."
            }, {
                type: "name",
                title: "Anslutningstyp",
                content: "Den aktuella anslutningen typ av Internet."
            }, {
                type: "title",
                title: "Trådlöst"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Välj om du vill visa 2.4GHz | 5GHz trådlösa inställningar och information."
            }, {
                type: "name",
                title: "Nätverksnamn",
                content: "Det trådlösa nätverksnamnet, även kallat SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Trådlös radio",
                content: "Nuvarande status (På eller Av) för det trådlösa nätverket."
            }, {
                type: "name",
                title: "Läge",
                content: "Det aktuella trådlösa läget."
            }, {
                type: "name",
                title: "Kanalbredd",
                content: "Kanalbandbredden för det trådlösa nätverket."
            }, {
                type: "name",
                title: "Kanal",
                content: "Den aktuella trådlösa kanalen och dess motsvarande frekvens (i GHz)."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "MAC-adressen för det trådlösa nätverkets radio."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Visar information om Ethernet (LAN) portar."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Den unika fysiska adress som tilldelats porten Ethernet (LAN) för routern."
            }, {
                type: "name",
                title: "IP-adress",
                content: "IPv4-adressen som tilldelats porten Ethernet (LAN) i routern."
            }, {
                type: "name",
                title: "Nätmask",
                content: "Denna parameter bestämmer nätverksdelen och värddelen av en IP-adress."
            }, {
                type: "name",
                title: "DHCP",
                content: "Visar om routern inbyggda DHCP-server är aktiv för enheter på LAN-portarna eller inte."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Den unika fysiska adress som tilldelats porten Ethernet (LAN) för routern."
            }, {
                type: "name",
                title: "IP-adress",
                content: "IPv6-adressen som tilldelats porten Ethernet (LAN) i routern."
            }, {
                type: "name",
                title: "Prefixlängd",
                content: "Längden på IPv6-adressens prefix."
            }, {
                type: "name",
                title: "Angiven typ",
                content: "IPv6-adresstyp tilldelas LAN-gränssnittet."
            }, {
                type: "title",
                title: "Gästnätverk"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Välj om du vill visa 2.4GHz | 5GHz gästnätverksinställningar och information."
            }, {
                type: "name",
                title: "Gästnätverk SSID",
                content: "Det trådlösa nätverksnamnet (SSID) i ditt gästnätverk."
            }, {
                type: "name",
                title: "Göm SSID",
                content: "Visar om det trådlösa nätverksnamnet (SSID) i gästnätverk är dolda (På) eller inte (Av)."
            }, {
                type: "name",
                title: "Trådlös radio",
                content: "Indikerar aktuell status (På eller Av) i gästnätverk."
            }, {
                type: "name",
                title: "Se varandra",
                content: "Visar om alla enheter på gästnätverk tillåts kommunicera med varandra eller inte."
            }]
        },
        time: {
            TITLE: "Tidsinställningar",
            CONTENT: [{
                type: "name",
                title: "Tidszon",
                content: "Välj din lokala tidszon i listrutan."
            }, {
                type: "name",
                title: "Datum",
                content: "Ange din lokala datum i i fältet MM/DD/YY."
            }, {
                type: "name",
                title: "Tid",
                content: "Välj din lokala tid i listrutan (i 24-timmarsformat, är t.ex. 16:00:00 04:00PM)."
            }, {
                type: "name",
                title: "NTP Server I/NTP Server II",
                content: "Ange IP-adressen för NTP-server I eller NTP-server II, och routern kommer att få tid från NTP-server automatiskt. Dessutom har routern några vanliga inbyggda NTP-servrar som synkroniserar automatiskt när den ansluts till Internet."
            }, {
                type: "name",
                title: "Hämta från PC",
                content: "Klicka här för att synkronisera med datorns systemtid."
            }, {
                type: "name",
                title: "Hämta GMT",
                content: "Klicka för att synkronisera med GMT (Greenwich Mean Time) tidszon från Internet."
            }, {
                type: "name",
                title: "Spara",
                content: "Klicka för att spara inställningar."
            }, {
                type: "title",
                content: "Sommartid"
            }, {
                type: "note",
                title: "För att ställa in sommartid",
                content: [
                    "Välj <b> Aktivera sommartid </b>.",
                    "Välj rätt <b>Startar</b> datum och tid när sommartid börjar på din lokala tidszon.",
                    "Välj rätt <b>Slutar</b> datum och tid när sommartid slutar vid din lokala tidszon.",
                    "Klicka på <b>Spara</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Diagnostikverktyg",
            CONTENT: [{
                type: "paragraph",
                content: "Routern har två diagnostiska verktyg, ping och trace."
            }, {
                type: "note",
                title: "Diagnostisera med Ping-verktyg",
                content: [
                    "Markera alternativknappen före ping.",
                    "Ange IP-adressen eller domännamnet.",
                    "Klicka på ikonen rullgardins innan Avancerat för att visa Ping Count, Ping Packet size och Ping Timeout. Håll dessa parametrar på deras standardvärden eller konfigurera dem efter dina behov.",
                    "Klicka på Start-knappen för att starta diagnos."
                ]
            }, {
                type: "paragraph",
                content: "ELLER"
            }, {
                type: "note",
                title: "Diagnostisera med Traceroute-verktyg",
                content: [
                    "Markera alternativknappen före traceroute.",
                    "Ange IP-adressen eller domännamnet.",
                    "Klicka på ikonen rullgardins-menyn före Avancerat för att visa Traceroute Max TTL. Behåll standardvärdet eller konfigurera den enligt dina behov.",
                    "Klicka på Start-knappen för att starta diagnos."
                ]
            }]
        },
        softup: {
            TITLE: "Firmware-upppgradering",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "En firmware-uppgradering uppdaterar routerns operativsystem med senaste nya funktioner och olika lösningar för att förbättra prestanda. När en ny firmware-uppgradering är tillgänglig, blir du underrättat med en uppdatering av ikonen i det övre högra hörnet. Klicka på ikonen för att ange för uppgradering av firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>OBS! Följ instruktionerna för att förhindra upgrade failure (misslyckad uppgradering).</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Innan uppgradering:",
                content: [
                    "Anslut datorn till routern med en Ethernet-kabel. Uppgradera INTE firmware trådlöst. ",
                    "Ta bort alla USB-lagringsenheter från routern.",
                    "Konfigurationsinställningarna för routern."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Under uppgraderingen:<br> Håll routern påslagen och arbeta inte på routern."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Uppgradera firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Klicka på Uppgrade (Uppgradera) och bekräfta när du uppmanas till det. Routern hämtar och uppgraderar automatiskt senaste firmware och startar sedan om.<br><b>Obs!</b>: Du kan behöva först klicka på Check for upgrade (kontrollera för att uppgradera) för att kontrollera om firmware uppdatering finns tillgänglig. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Uppgradera firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Besök www.tp-link.com och hämta den senaste firmware från vår supportsida för din dator. Se till att filen du hämtar passar med routerns maskinvaruversion som visas på sidan.",
                    "Klicka på <b>Bläddra</b> och välj den hämtade firmware.",
                    "Klicka på <b>Uppgradera</b>. Uppgraderingen tar några minuter att slutföra. Routern startar om automatiskt när uppgraderingen är klar."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Innan du uppgraderar den fasta programvaran för routern, måste du ladda ner den senaste firmware-uppdateringen från <a href='http://www.tp-link.com/en/download-center.html'> TP-LINK Download Center sidan </a> för din dator."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B> VIKTIGT: </B> För att förhindra uppgraderingsfel, observera följande:",
                content: [
                    "Kontrollera den senaste firmware-filen matchas med hårdvaruversionen (som visas under <b>Firmware uppgradering</b>).",
                    "Se till att du har en stabil anslutning mellan routern och datorn. Det rekommenderas att  <b>INTE</b> uppgradera firmware trådlöst.",
                    "Se till att du taGIT bort alla USB-lagringsenheter som är anslutna till routern innan firmware-uppgradering för att förhindra dataförlust.",
                    "Säkerhetskopiera din router-konfiguration.",
                    "Stäng inte av routern under firmware-uppgraderingen."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Uppgradera routerns firmware",
                content: [
                    "Klicka på <b> Bläddra</b> .",
                    "Leta upp och markera hämtad firmwarefil.",
                    "Klicka på <b>Uppgradera </b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Säkerhetskopiera",
            CONTENT: [{
                type: "paragraph",
                content: "Det rekommenderas starkt att säkerhetskopiera dina nuvarande konfigurationer ifall det behövs en återhämtning för att återställa systemet till ett tidigare tillstånd eller fabriksinställningarna."
            }, {
                type: "paragraph",
                content: "Klicka på <b>Säkerhetskopiera</b> för att spara dina nuvarande konfigurationer till datorn. Se till att spara säkerhetskopian till en säker plats som du kan hämta och återställa routern senare, om det behövs."
            }, {
                type: "title",
                content: "Återställ"
            }, {
                type: "note",
                title: "Återställ från en säkerhetskopia",
                content: [
                    "Klicka på <b>Bläddra</b> .",
                    "Leta upp och markera säkerhetskopian.",
                    "Klicka på <b>Återställ</b>."
                ]
            }, {
                type: "title",
                content: "Återställ fabriksinställning"
            }, {
                type: "paragraph",
                content: "Klicka på <b>Återställ</b> för att återställa routern till fabriksinställningarna."
            }, {
                type: "note",
                title: "Obs:",
                content: [
                    "Återställ återställer alla inställningar som du har konfigurerat i routern till fabriksinställningarna. När routern är återställd och omstartad, skapa ett nytt lösenord att åter logga in på den webbaserade hanteringssidan.",
                    "Stäng INTE av routern under säkerhetskopieringen eller återställning."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Konto administration",
            CONTENT: [{
                type: "paragraph",
		display: "$.helpControl.cloudLogin",
                content: "Här kan du ändra ditt lösenord för inloggning."
            }, {
                type: "step",
                title: "Ändra lösenordet",
                content: [
                    "Ange det gamla lösenordet.",
                    "Ange det nya lösenordet.",
                    "Bekräfta nytt lösenord.",
                    "Klicka på Save (spara)."
                ]
            }, {
                type: "title",
                content: "Lokal administration"
            }, {
                type: "paragraph",
                content: "Denna funktion gör att lokala enheter kan komma åt routern. Som standard kan alla lokala enheter komma åt routern via HTTP."
            }, {
                type: "step",
                title: "Ändra lokala inställningar för administration",
                content: [
                    "Aktivera lokal administration via HTTPS om du vill komma åt routern via både HTTPS och HTTP, eller ha den avstängd om du bara vill komma åt routern via HTTP.",
                    "Behåll port för HTTP och HTTPS-port som standardinställningar.",
                    "Om du bara vill tillåta en viss enhet att komma åt routern ange IP-adress eller MAC-adressen för enheten i IP / MAC-adressfältet.",
                    "Klicka på Save (spara).",
                    "Nu kan du hantera routern via HTTP (http://tplinkwifi.net) och / eller HTTPS (https://tplinkwifi.net)."
                ]
            }, {
                type: "paragraph",
                content: "Obs: Om en varning dyker upp när du besöker https://tplinkwifi.net klicka Trust (lita på) (eller ett liknande alternativ) för att fortsätta."
            }, {
                type: "title",
                content: "Fjärrhantering"
            }, {
                type: "paragraph",
                content: "Med fjärrhanteringsfunktionen kan fjärrenheter komma åt routern. Som standard kan alla fjärrenheter inte komma åt och hantera routern."
            }, {
                type: "step",
                title: "Ställ in fjärrhantering ",
                content: [
                    "Aktivera fjärrhantering om du vill tillåta fjärrhantering via HTTPS, eller aktivera fjärrhantering och stäng sedan av fjärrhantering via HTTPS om du vill tillåta fjärrhantering via HTTP.",
                    "Behåll porten som standardinställning.", {
                        type: "paragraph",
                        content: "Välj vilken fjärrenhet som kan komma åt routern:",
                        children: [{
                            type: "name",
                            title: "Endast följande IP / MAC-adress",
                            content: "Ange IP-adress eller MAC-adressen för enheten som får åtkomst till routern."
                        }, {
                            type: "name",
                            title: "Alla",
                            content: "Alla fjärrenheter kan få åtkomst till routern."
                        }]
                    },
                    "Klicka på Save (spara).",
                    "Nu kan du fjärrhantera routern via adressen som visas under Manage This Router via the Address (hantera denna router via adress)."
                ]
            }, {
                type: "paragraph",
                content: "Obs: Om en varning dyker upp när du besöker ovanstående adress klicka på Trust (lita på) (eller ett liknande alternativ) för att fortsätta."
            }, {
                type: "title",
                content: "Certifikat"
            }, {
                type: "paragraph",
                content: "En fil som ger dig autentiseringsinformation. Ladda ner och installera certifikatet för den lokala / fjärrhantering via HTTPS om du behöver det. När certifikatet har installerats, kommer varningar inte att dyka upp när du ansluter till routern via HTTPS."
            }, {
                type: "paragraph",
                content: "Obs: För handledning, Se användarhandboken på produktens supportsida."
            }, {
                type: "title",
                content: "ICMP ping"
            }, {
                type: "paragraph",
                content: "ICMP (Internet Control Message Protocol) ping används för att diagnostisera nätverk genom att sända ett ICMP ekobegäran paket till målet för fjärrkontrollen eller lokal värd och väntar på ett ICMP svar."
            }, {
                type: "name",
                title: "Fjärr",
                content: "Välj om du vill att datorer i ett publikt nätverk pinga routerns WAN IP-adress."
            }, {
                type: "name",
                title: "Lokal",
                content: "Välj om du vill att datorer i ett privat nätverk pinga routerns LAN IP-adress."
            }]
        },
        log: {
            TITLE: "Systemlogg",
            CONTENT: [{
                type: "paragraph",
                content: "Systemloggen visas en lista över de senaste aktiviteter (händelser) för routern. Du kan definiera vilka typer av loggar och/eller nivån på loggar du vill visa. På denna sida kan också routern exportera systemloggen till en dator eller automatiskt skicka systemloggen till en specifik fjärrserver."
            }, {
                type: "name",
                title: "Typ",
                content: "Välj vilken typ av systemlogg att visa."
            }, {
                type: "name",
                title: "Nivå",
                content: "Välj nivån på systemloggen att visa."
            }, {
                type: "name",
                title: "Uppdatera",
                content: "Klicka på den här ikonen för att uppdatera systemloggen."
            }, {
                type: "name",
                title: "Radera allt",
                content: "Klicka på den här ikonen för att ta bort alla systemloggar."
            }, {
                type: "name",
                title: "Logg-inställningar",
                content: "Klicka här för att göra inställningar för loggfilen.",
                children: [{
                    type: "name",
                    title: "Spara lokalt",
                    content: "Välj att cacha systemloggen till routerns lokala minne. Loggen kommer att visas i tabellen på systemlogg-sidan.",
                    children: [{
                        type: "name",
                        title: "Miniminivå",
                        content: "Välj en miniminivå för systemloggen ska sparas i listrutan. Listan är i fallande ordning, med den lägsta nivån sist."
                    }]
                }, {
                    type: "name",
                    title: "Spara fjärr",
                    content: "Välj att skicka systemloggen till en fjärrserver. Om fjärrservern har en logg viewer klient eller snifferverktyg, så kan du visa och fjärranalysera systemloggen i realtid.",
                    children: [{
                        type: "name",
                        title: "Miniminivå",
                        content: "Välj en miniminivå för systemloggen ska sparas i listrutan. Listan är i fallande ordning, med den lägsta nivån sist."
                    }, {
                        type: "name",
                        title: "Server IP",
                        content: "Ange IP-adressen för fjärrsystemets loggserver."
                    }, {
                        type: "name",
                        title: "Serverport",
                        content: "Ange portnumret för fjärrsystemets loggserver."
                    }, {
                        type: "name",
                        title: "Lokal anläggningsnamn",
                        content: "Välj lokala anläggningsnamn på fjärrserver från rullgardinslistan."
                    }]
                }]
            }, {
                type: "name",
                title: "Spara logg",
                content: "Klicka här för att ladda ner alla systemloggar till din lokala dator."
            }]
        },
        snmp: {
            TITLE: "SNMP inställningar",
            CONTENT: [{
                type: "name",
                title: "SNMP-agent",
                content: "Växla till På om du vill aktivera den inbyggda SNMP-agenten som gör att routern fungerar som operativ roll i att ta emot och bearbeta SNMP-meddelanden, skicka svar på SNMP manager, och utlösa SNMP-fällor när en händelse inträffar."
            }, {
                type: "name",
                title: "Skrivskyddad Community",
                content: "Visar standard Offentlig samhällssträng som skyddar routern från obehörig åtkomst."
            }, {
                type: "name",
                title: "Skriv till Community",
                content: "Visar standard läs och skriv-sträng som skyddar routern från obehöriga ändringar."
            }, {
                type: "name",
                title: "Systemnamn",
                content: "Visar administrativt tilldelat namn för denna enheten."
            }, {
                type: "name",
                title: "Systembeskrivning",
                content: "Visar textbeskrivning för enheten. Detta värde bör omfatta fullständigt namn och version identifiering av systemets maskinvarutyp, programvara operativsystem och nätverksprogramvara."
            }, {
                type: "name",
                title: "Systemplats",
                content: "Visar den fysiska placeringen av denna enhet (t.ex. telefonskåp, 3: e våningen)."
            }, {
                type: "name",
                title: "Systemkontact",
                content: "Visar textidentifiering av kontaktpersonen för denna enhet, tillsammans med information om hur man kontaktar den här personen."
            }, {
                type: "name",
                title: "Trap-administratör IP",
                content: "Visar IP-adressen för den värd som tar emot fällor."
            }]
        },
        stat: {
            TITLE: "Trafikstatistik",
            CONTENT: [{
                type: "name",
                title: "Trafikstatistik",
                content: "Växla till På för att aktivera funktionen trafikstatistik."
            }, {
                type: "title",
                content: "Trafikstatistik-lista"
            }, {
                type: "name",
                title: "IP/MAC-adress",
                content: "IP och MAC-adresser för anslutna klienter."
            }, {
                type: "name",
                title: "Totalt antal paket",
                content: "Det totala antalet paket som mottagits och sänts av routern."
            }, {
                type: "name",
                title: "Totalt antal byte",
                content: "Det totala antalet byte som mottagits och sänts av routern."
            }, {
                type: "name",
                title: "Aktuella paket",
                content: "Det totala antalet paket som tas emot och överförs vid ett specifikt tidsintervall i sekunder."
            }, {
                type: "name",
                title: "Aktuella bytes",
                content: "Det totala antalet byte som mottagits och sänts vid ett specifikt tidsintervall i sekunder."
            }, {
                type: "name",
                title: "Aktuell ICMP Tx",
                content: "Visar den aktuella överföringshastigheten av ICMP-paket som överförs via WAN-porten över den maximala sändningshastigheten per sekund."
            }, {
                type: "name",
                title: "Aktuell UDP Tx",
                content: "Visar den aktuella överföringshastigheten för UDP-paketen som överförs via WAN-porten över den maximala sändningshastigheten per sekund."
            }, {
                type: "name",
                title: "Aktuell SYN Tx",
                content: "Visar den aktuella överföringshastigheten för TCP SYN paket överförda genom WAN-porten över den maximala sändningshastigheten per sekund."
            }, {
                type: "name",
                title: "Ändra",
                content: "Klicka på  ikonen <b>Papperskorgen</b> för att ta bort motsvarande statistik."
            }, {
                type: "name",
                title: "Uppdatera",
                content: "Klicka här för att uppdatera statistikinformationen på sidan."
            }, {
                type: "name",
                title: "Återställ",
                content: "Klicka för att återställa alla statistiska värden i listan till noll."
            }, {
                type: "name",
                title: "Radera allt",
                content: "Klicka för att ta bort all statistik information i listan."
            }]
        },
        ethWan: {
            TITLE: "WAN gränssnitt",
            CONTENT: [{
                type: "title2",
                content: "Anslutningstyp: Dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Välj den här typen om du har tillgång till en DHCP-server anslutning av ISP (Internet Service Provider)."
            }, {
                type: "name",
                title: "IP-adress/nätmask/gateway/standard-gateway",
                content: "Dessa parametrar tilldelas automatiskt av DHCP-servern från din ISP."
            }, {
                type: "name",
                title: "Förnya/frigör",
                content: "Klicka här för att förnya/frigöra IP-parametrar från din Internetleverantör."
            }, {
                type: "name",
                title: "Avancerad",
                children: [{
                    type: "name",
                    title: "MTU storlek (i byte)",
                    content: "Standard och typiska MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är <b> 1500 Bytes </b>. Det rekommenderas att inte ändra standard MTU-storleken om det inte krävs av ISP."
                }, {
                    type: "name",
                    title: "IGMP proxy",
                    content: "IGMP (Internet Group Management Protocol) används för att hantera multicasting på TCP/IP-nätverk. Vissa Internetleverantörer använder IGMP för att utföra fjärrkonfiguration på en router. Det är aktiverat som standard."
                }, {
                    type: "name",
                    title: "Hämta IP med unicast DHCP",
                    content: "Markera den här kryssrutan om din ISP: s DHCP-server inte stöder broadcast-program och du kan inte få IP-adressen dynamiskt."
                }, {
                    type: "name",
                    title: "Använd följande DNS-adress",
                    content: "Markera den här kryssrutan och ange DNS-serveradress(er) med decimalpunkter från din Internetleverantör. Detta WAN-gränssnittet kommer att använda angiven DNS-server för prioritet."
                }, {
                    type: "name",
                    title: "Värdnamn",
                    content: "Ange värdnamnet för detta WAN-gränssnitt."
                }]
            }, {
                type: "title2",
                content: "Anslutningstyp: Statisk IP"
            }, {
                type: "name",
                title: "statisk IP",
                content: "Välj den här typen om du har tillgång till en specifik (fast) IP-adress, nätmask, gateway och DNS-parametrar från ISP."
            }, {
                type: "name",
                title: "IP-adress/nätmask/gateway/DNS-server/sekundär DNS-server",
                content: "Ange IP-informationen från din ISP med decimalpunkter."
            }, {
                type: "paragraph",
                content: "Klicka på <b>Avancerat</b> för att visa mer avancerade inställningar."
            }, {
                type: "name",
                title: "Avancerad",
                children: [{
                    type: "name",
                    title: "MTU storlek (i byte)",
                    content: "Standard och typiska MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är <b> 1500 Bytes </b>. Det rekommenderas att inte ändra standard MTU-storleken om det inte krävs av ISP."
                }, {
                    type: "name",
                    title: "IGMP proxy",
                    content: "IGMP (Internet Group Management Protocol) används för att hantera multicasting på TCP/IP-nätverk. Vissa Internetleverantörer använder IGMP för att utföra fjärrkonfiguration på en router. Det är aktiverat som standard."
                }]
            }, {
                type: "title2",
                content: "Anslutningstyp: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Välj den här typen om du använder DSL (Digital Subscriber Line) och är försedd med ett användarnamn och lösenord av Internetleverantören."
            }, {
                type: "name",
                title: "PPPoE snvändarnamn/PPPoE lösenord/bekräfta lösenord",
                content: "Ange användarnamn och lösenord från din Internetleverantör. Dessa fält är skiftlägeskänsliga."
            }, {
                type: "name",
                title: "Sekundär anslutning",
                content: "Det är endast tillgängligt för PPPoE-anslutning. Om din Internetleverantör tillhandahåller en extra anslutningstyp, såsom dynamisk/statisk IP för att ansluta till ett lokalt nätverk, så kan du välja alternativknappen för dynamisk/statisk IP för att aktivera denna sekundära anslutning. <br> Den sekundära anslutningen är inaktiverad som standard , så det finns bara PPPoE-anslutning. Aktivera inte om det inte är nödvändigt."
            }, {
                type: "name",
                title: "Anslutningsläge",
                content: "Välj ett av anslutningslägena nedan som avgör hur du ansluter till Internet:",
                children: [{
                    type: "name",
                    title: "Alltid",
                    content: "Välj detta läge för att återansluta automatiskt varje gång anslutningen kopplas ur."
                }, {
                    type: "name",
                    title: "Anslut på begäran",
                    content: "Välj detta läge för att koppla från Internet-anslutningen baserat på viss tid av inaktivitet (Max Idle Time). Anslutningen återupprättas när du försöker ansluta till Internet igen."
                }, {
                    type: "name",
                    title: "Anslut manuellt",
                    content: "Välj detta läge för att ansluta eller koppla Internetanslutningen manuellt eller baserat på viss tid av inaktivitet (Max Idle Time)."
                }, {
                    type: "name",
                    title: "Max vilotid",
                    content: "<b> 15 minuter </b> - Ange ett antal minuter Internetanslutningen kan vara inaktiv innan den avslutas. Standard vilotid är 15 minuter."
                }]
            }, {
                type: "name",
                title: "Autentiseringstyp",
                content: "Välj en autentiseringstyp i listrutan. Standardmetoden är AUTO_AUTH."
            }, {
                type: "name",
                title: "Anslut/koppla ur",
                content: "Klicka för att ansluta/koppla ur omedelbart."
            }, {
                type: "paragraph",
                content: "Klicka på <b>Avancerat</b> för att visa mer avancerade inställningar."
            }, {
                type: "name",
                title: "Avancerad",
                children: [{
                    type: "name",
                    title: "Tjänstnamn",
                    content: "Ange servicenamn som tillhandahålls av din Internetleverantör. Om inte, lämna tomt."
                }, {
                    type: "name",
                    title: "Servernamn",
                    content: "Ange servernamnet från din Internetleverantör. Om inte, lämna tomt."
                }, {
                    type: "name",
                    title: "MTU Storlek (i byte)",
                    content: "Typisk MTU-storlek (Maximum Transmission Unit) för Ethernet-nätverk är 1480 byte.",
                    children: [{
                        type: "paragraph",
                        content: "<b> Obs! </b>: I ett sällsynt fall, kan din Internetleverantör kräva att du justerar MTU-storleken för bättre nätverksprestanda. Du bör inte ändra värdet om det inte är absolut nödvändigt."
                    }]
                }, {
                    type: "name",
                    title: "IGMP proxy",
                    content: "IGMP (Internet Group Management Protocol) används för att hantera multicasting på TCP/IP-nätverk. Vissa Internetleverantörer använder IGMP för att utföra fjärrkonfiguration på en router. Det är aktiverat som standard."
                }, {
                    type: "name",
                    title: "Använda IP som anges av ISP",
                    content: "Välj detta alternativ och ange IP-adressen från din ISP."
                }, {
                    type: "name",
                    title: "Echo Request intervall",
                    content: "Ange ett tidsintervallvärde mellan 0 och 120 (i sekunder) för vilken routern begär åtkomstkoncentratorn upprepa eko vid varje intervall. Standardvärdet är 30. 0 betyder ingen upptäckt."
                }, {
                    type: "name",
                    title: "Använd följande DNS-adress",
                    content: "Markera den här kryssrutan och ange DNS-serveradress(er) med decimalpunkter från din Internetleverantör. Detta WAN-gränssnittet kommer att använda angiven DNS-server för prioritet."
                }]
            }, {
                type: "title2",
                content: "Anslutningstyp: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Välj den här typen om du ansluter till en L2TP/PPTP VPN-server och är försedda med ett användarnamn, lösenord och IP-adress/domännamn på servern från din ISP."
            }, {
                type: "name",
                title: "Användarnamn lösenord",
                content: "Ange användarnamn och lösenord från din Internetleverantör. Dessa fält är skiftlägeskänsliga."
            }, {
                type: "name",
                title: "IP-adress/primär DNS",
                content: "Dessa parametrar kommer automatiskt att tilldelas av DHCP-servern av din ISP."
            }, {
                type: "name",
                title: "Sekundär anslutning (dynamisk IP eller statisk IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Välj detta om IP-adress och nätmask automatiskt tilldelas av din Internetleverantör."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: "Välj detta om IP-adress, är nätmask, gateway och DNS-adresser från din ISP, och ange dessa uppgifter i respektive fält."
                }]
            }, {
                type: "name",
                title: "VPN-server IP/domännamn",
                content: "Ange VPN-serverns IP-adress eller domännamn från din Internetleverantör."
            }, {
                type: "name",
                title: "MTU-storlek",
                content: "Standard och typiska MTU-storlek (Maximum Transmission Unit) för de flesta Ethernet-nätverk är 1460 Bytes (1420 för PPTP). Ändra inte standard MTU-storleken om det inte krävs av din Internetleverantör."
            }, {
                type: "name",
                title: "Anslutningsläge",
                content: "Välj ett lämpligt anslutningsläge som avgör hur du ansluter till Internet.",
                children: [{
                    type: "name",
                    title: "Alltid på",
                    content: "I detta läge, återasnsluter Internet-anslutningen automatiskt varje gång den blir urkopplad."
                }, {
                    type: "name",
                    title: "Anslut på begäran",
                    content: "I det här läget kommer Internetanslutningen att avslutas automatiskt efter en viss tid av inaktivitet (Max Idle Time) har löpt ut. Anslutningen återupprättas när du försöker ansluta till Internet igen."
                }, {
                    type: "name",
                    title: "Anslut manuellt",
                    content: "I det här läget kontrolleras Internetanslutningen manuellt genom att klicka på knappen Connect (anslut) eller Disconnect (koppla ur). Detta läge stöder också Max Idle Time funktion. Ange ett Max Idle Time (i minuter) för att specificera den maximala tid Internetanslutningen kan vara inaktiv innan den avslutas. Standardvärdet är 15 minuter. Om du vill att Internet-anslutningen förblir aktiv hela tiden, ange 0 (noll)."
                }]
            }, {
                type: "title",
                content: "MAC-klon"
            }, {
                type: "name",
                title: "Använd standard MAC-adress",
                content: "Välj det här alternativet om du vill använda standard MAC-adressen i det fall då ISP inte har tilldelat en IP-adress till routerns MAC-adress."
            }, {
                type: "name",
                title: "Använd Aktuell Computer MAC-adress",
                content: "Välj detta alternativ för att använda MAC-adressen av den anslutna datorn ifall ISP endast tillåter den här datorn att ansluta till Internet."
            }, {
                type: "name",
                title: "Använd Custom MAC-adress",
                content: "Välj det här alternativet för att ange den registrerade MAC-adressen manuellt."
            }]
        },
        route: {
            TITLE: "Advancerad routing",
            CONTENT: [{
                type: "paragraph",
                content: "Avancerad Routing används för att förutbestämma en fast rutt för nätverksinformationspaket för att nå en viss värd eller nätverk."
            }, {
                type: "title",
                content: "Statisk routing"
            }, {
                type: "name",
                title: "Destination IP-adress/nätmask/gateway",
                content: "Visar destinationens IP-adress, nätmask och gateway of Static Route."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Anger aktuell status för en statisk rutt. Klicka på ikonen <b> Bulb</b> för att aktivera (eller inaktivera) den statiska rutten."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ till <b>Ändra</b> eller <b>Ta bort</b> motsvarande post."
            }, {
                type: "note",
                title: "Ställ in en statisk routing",
                content: [
                    "Klicka på <b>Lägg till</b>.",
                    "Ange en IP-adress för att tilldela den statiska vägen för denna post.",
                    "Ange en nätmask i hexadecimalt format för att bestämma nätverksdelen och värddelen av IP-adressen.",
                    "Ange en gateway IP-adress för att ansluta routern till nätverket eller värden.",
                    "Välj <b>LAN</b> eller WAN-gränssnitt för att ange vilken typ av destinations IP-adress.",
                    "Välj <b>Aktivera denna post</b>.",
                    "Klicka på <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "System Routing Table"
            }, {
                type: "paragraph",
                content: "Routingtabellen visar alla giltiga ruttposter som för närvarande är i bruk."
            }, {
                type: "paragraph",
                content: "Klicka på Uppdatera för att uppdatera routingtabellen."
            }]
        },
        ddns: {
            TITLE: "Dynamisk DNS-inställning",
            CONTENT: [{
                type: "paragraph",
                content: "Med Dynamisk DNS kan du tilldela ett fast värd- och domännamn till en dynamisk Internet-IP-adress. Det är användbart när du har en egen webbplats, FTP-server eller en annan server bakom routern. Först måste du anmäla dig hos en DDNS-tjänst såsom www.dyndns.com."
            }, {
                type: "step",
                title: "Att sätta upp en dynamisk DNS",
                content: [
                    "Välj dynamisk DNS-service leverantör.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Ange det domännamn som du har fått från en DDNS-leverantör.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Om du vill använda ett nytt DDNS-konto, logga först ut , och logga sedan in på det nya kontot"
            }]
        },
        dhcp: {
            TITLE: "DHCP-server",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP (Dynamic Host Configuration Protocol) tilldelar dynamiskt TCP/IP-konfigurationen till klientenheter från en IP-adresspool. inaktivera INTE standard DHCP-servern om du inte har en annan DHCP-server eller om du vill manuellt tilldela TCP/IP konfiguration till enskilda klienter i nätverket."
            }, {
                type: "name",
                title: "IP-adress pool",
                content: "Ange området för IP-adresser som kan lånas ut till kunderna."
            }, {
                type: "name",
                title: "Adress-lånetid",
                content: "Ange tidslängden som en IP-adress är lånad till kunden mellan 1 och 2880 minuter."
            }, {
                type: "name",
                title: "Standrd gateway",
                content: "Ange LAN IP-adress. (frivillig)"
            }, {
                type: "name",
                title: "DNS-server/sekundär DNS-server",
                content: "Ange DNS-serveradresser som tillhandahålls av din ISP. (frivillig)"
            }, {
                type: "title",
                content: "Kundlista"
            }, {
                type: "name",
                title: "Totalt antal klienter",
                content: "Visar det totala antalet av tillhörande DHCP-klienter."
            }, {
                type: "name",
                title: "Kundnamn",
                content: "Visar namnet på DHCP-klienten."
            }, {
                type: "name",
                title: "MAC-adress",
                content: "Visar MAC-adressen."
            }, {
                type: "name",
                title: "Tilldelad IP-adress",
                content: "Visar den tilldelade IP-adressen till klienten av DHCP-servern."
            }, {
                type: "name",
                title: "Lånad tid",
                content: "Visar varaktigheten av IP-adressen som har hyrts ut till kunden."
            }, {
                type: "name",
                title: "Uppdatera",
                content: "Klicka här för att uppdatera DHCP Client List."
            }, {
                type: "title",
                content: "Adressreservationer"
            }, {
                type: "paragraph",
                content: "Du kan manuellt boka en IP-adress för en klient som är ansluten till routern. När reserverad, kommer IP-adressen endast tilldelas samma kund av DHCP-servern."
            }, {
                type: "name",
                title: "MAC- adress",
                content: "Visar MAC-adressen för klienten med DHCP reserverad IP-adress."
            }, {
                type: "name",
                title: "Reserverad IP-adress ",
                content: "Visar den reserverade IP-adressen för klienten."
            }, {
                type: "name",
                title: "Beskrivning",
                content: "Visar beskrivningen av enheten."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Klicka för att aktivera eller inaktivera motsvarande post."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ till <b> Ändra </b> eller <b> Ta bort </b> motsvarande klienten."
            }, {
                type: "note",
                title: "Reservera en IP-adress för en DHCP-klienten",
                content: [
                    "Klicka på <b>Lägg till</b>.",
                    "Ange <b> MAC-adress </b> för klienten.",
                    "Ange IP-adressen som du vill reservera för kunden.",
                    "Ange beskrivningen av enheten.",
                    "Välj <b>Aktivera denna post</b>.",
                    "Klicka på <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "För att ändra eller ta bort en befintlig kund",
                content: [
                    "Click the <b>Edit</b> or <b>Trash</b> icon in the corresponding entry."
                ]
            }, {
                type: "title",
                content: "Statuspool"
            }, {
                type: "name",
                title: "Kund-ID/Från IP-adress/Slut IP-adress/Anläggning",
                content: "Visar Kund-ID, Från IP-adress, Slut IP-adress och Facility av tillståndet poolen."
            }, {
                type: "name",
                title: "Status",
                content: "Anger aktuell status för tillståndet poolen. Klicka på ikonen Bulb att aktivera (eller inaktivera) tillståndet poolen."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ till <b> Ändra </b> eller <b> Ta bort </b> motsvarande klienten."
            }, {
                type: "note",
                title: "Lägg till statuspool",
                content: [
                    "Klicka på <b> Lägg till </b>.",
                    "Ange enhetsnamn LAN.",
                    "Ange ett värde för att identifiera säljaren och funktionaliteten hos DHCP-klienten.",
                    "Ange start-IP-adress som DHCP-servern tilldelar klienter.",
                    "Ange sista IP-adressen som DHCP-servern tilldelar klienter.",
                    "Ange standard-gateway för DHCP-servern.",
                    "Välj en enhet från listrutan.",
                    "Välj ett alternativ i listrutan.",
                    "Ange optionsvärdet.",
                    "Välj <b>Aktivera denna post</b>.",
                    "Klicka på <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV inställning",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Välj att aktivera IPTV-funktionen."
            }, {
                type: "name",
                title: "Läge",
                content: "Välj lämpligt läge beroende på din Internetleverantör. Det finns sex IPTV lägen:",
                children: [{
                    type: "name",
                    title: "Brygga",
                    content: "Välj det här alternativet om din Internetleverantör inte finns med i listan och inga andra parametrar är förutbestämda.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tilldela din LAN-port om du vill fungera som Internet leverantören eller som IPTV leverantör."
                    }]
                }, {
                    /*type: "name",
                    title: "Ryssland",
                    content: "Välj det här om din ISP är från Ryssland och de nödvändiga parametrarna är förutbestämda, inklusive Internet/IP-telefon/IPTV VLAN ID och prioritet, och LAN-port (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "IPTV multicast VLAN ID/Prioritet",
                        content: "Du kan aktivera IPTV multicast-funktionen som önskas, och konfigurera VLAN ID och Priority enligt din ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapore-Singtel",
                    content: "Välj det här om din ISP är EXstream från Singapore och de nödvändiga parametrarna är förutbestämda, inklusive Internet/IPTV VLAN ID och prioritet, och LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Unifi",
                    content: "Välj det här om din ISP är Unifi från Malaysia och de nödvändiga parametrarna är förutbestämda, inklusive Internet/IPTV VLAN ID och prioritet, och LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Maxis",
                    content: "Välj det här om din ISP är Maxis från Malaysia och de nödvändiga parametrarna är förutbestämda, inklusive Internet/IP-telefon/IPTV VLAN ID och priority och LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Anpassa",
                    content: "Välj det här alternativet om din Internetleverantör inte finns med i listan, men ger de nödvändiga parametrarna, inklusive Internet/IP-telefon/IPTV VLAN ID och prioritet och LAN-port (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "Internet/IP-telefon/IPTV VLAN ID/Prioritet",
                        content: "Konfigurera VLAN ID som tillhandahålls av din ISP."
                    }, {
                        type: "name",
                        title: "802.11Q markering",
                        content: "Välj om du vill tagga Internetpaket med 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tilldela din LAN-port till funktion som Internetleverantör eller som IPTV-leverantör."
                    }, {
                        type: "name",
                        title: "IPTV Multicast VLAN ID/prioritet",
                        content: "Du kan aktivera IPTV multicast-funktion som önskas, och konfigurera VLAN ID och prioritet enligt din ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP proxy",
                content: "Välj IGMP (Internet Group Management Protocol) Proxy version, antingen V2 eller V3 enligt din Internetleverantör."
            }]
        },
        usbManage: {
            TITLE: "USB-lagringsenhet",
            CONTENT: [{
                type: "paragraph",
                content: "<B> USB-lagringsenhet </b> skärmen visar grundläggande information om USB-lagringsenheten är ansluten via USB-porten."
            }, {
                type: "name",
                title: "Skanna",
                content: "Vanligtvis känner routern automatiskt alla nyligen anslutna enheter. Om inte, klicka på den här knappen för att skanna och uppdatera skärmen med den uppdaterade informationen."
            }, {
                type: "name",
                title: "Volymnamn",
                content: "Visar namnet på USB-volymen."
            }, {
                type: "name",
                title: "Kapacitet",
                content: "Visar den totala lagringskapaciteten på USB-enheten."
            }, {
                type: "name",
                title: "Fritt utrymme",
                content: "Visar aktuell ledigt lagringsutrymme."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Den här kryssrutan visas endast när en USB-lagringsenhet är ansluten till routern. Välj att aktivera fildelning på USB-enheten."
            }, {
                type: "name",
                title: "Säker borttagning",
                content: "Klicka här för att säkert demontera USB-lagringsenheten innan den fysiskt kopplas bort från routern. Observera att knappen Säker borttagning bara visas när det finns en USB-lagringsenhet som är ansluten till routern. Håll också i minnet att det inte går att demontera USB-enheten när den används."
            }, {
                type: "title",
                content: "Delnings-inställningar"
            }, {
                type: "name",
                title: "Nätverksmedia/servernamn",
                content: "Visar det namn som används för att komma åt den anslutna USB-lagringsenheten."
            }, {
                type: "title",
                content: "Mappdelning"
            }, {
                type: "name",
                title: "Dela alla",
                content: "Växla till På för att dela alla filer och mappar eller Av för att endast dela de valda mapparna."
            }, {
                type: "name",
                title: "Aktivera autentisering",
                content: "Växla till På för att aktivera autentisering som kräver att användare ska ange ett giltigt användarnamn och lösenord för att komma åt alla delade mappar."
            }, {
                type: "name",
                title: "Mappnamn",
                content: "Visar namnet på den delade mappen."
            }, {
                type: "name",
                title: "Mappväg",
                content: "Visar sökvägen till den delade mappen."
            }, {
                type: "name",
                title: "Volymnamn",
                content: "Visar namnet på den delade volymen."
            }]
        },
        printSrv: {
            TITLE: "Skrivarserver",
            CONTENT: [{
                type: "name",
                title: "Aktivera skrivarserver",
                content: "Växla till På för att aktivera skrivar-serverfunktionen."
            }, {
                type: "name",
                title: "Skrivarnamn",
                content: "Visar namnet på din skrivare som är ansluten till routern."
            }]
        },
        diskSettings: {
            TITLE: "USB lagringsenhet",
            CONTENT: [{
                type: "paragraph",
                content: "<B> USB-lagringsenhet </b> skärmen visar grundläggande information om USB-lagringsenheten är ansluten via USB-porten."
            }, {
                type: "name",
                title: "Skanna",
                content: "Vanligtvis känner routern automatiskt alla nyligen anslutna enheter. Om inte, klicka på den här knappen för att skanna och uppdatera skärmen med den uppdaterade informationen."
            }, {
                type: "name",
                title: "Volymnamn",
                content: "Visar namnet på USB-volymen."
            }, {
                type: "name",
                title: "Kapacitet",
                content: "Visar den totala lagringskapaciteten på USB-enheten."
            }, {
                type: "name",
                title: "Fritt utrymme",
                content: "Visar aktuell ledigt lagringsutrymme."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Den här kryssrutan visas endast när en USB-lagringsenhet är ansluten till routern. Välj att aktivera fildelning på USB-enheten."
            }, {
                type: "name",
                title: "Säker borttagning",
                content: "Klicka här för att säkert demontera USB-lagringsenheten innan den fysiskt kopplas bort routern. Observera att knappen Säker borttagning endast visas när det finns en USB-lagringsenhet som är ansluten till routern. Håll också i minnet att det inte går att avmontera USB-enheten medan den aktuella volymen är upptagen."
            }, {
                type: "note",
                title: "Ställa in en filserver",
                content: [
                    "Anslut USB-lagringsenheten till USB-porten på routern med en USB-kabel.",
                    "Den nyligen anslutna USB-enheten identifieras automatiskt av routern och informationen visas under <b>Enhetsinställningar</b>. Om inte, klickar du på <b>Skanna</b>.",
                    "Klicka på ikonen <b>Aktivera</b> för att aktivera fildelning."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Delningskonto",
            CONTENT: [{
                type: "name",
                title: "Konto",
                content: "Du kan antingen välja <b>Använd standardkonto</b> för att logga in till delade filer och mappar eller <b>Använd nytt konto</b> och ange följande för att skapa ett nytt användarkonto."
            }, {
                type: "name",
                title: "Användarnamn lösenord",
                content: "Ange upp till 15 tecken som innehåller bokstäver, siffror och / eller understryka strängar. Användarnamnet måste börja med en bokstav. Dessa fält är skiftlägeskänsliga."
            }, {
                type: "paragraph",
                content: "Klicka på <b>Spara</b> för att spara kontoinställningarna."
            }, {
                type: "title",
                content: "Delnings-inställningar"
            }, {
                type: "name",
                title: "Nätverk/mediaserver-namn",
                content: "Visar det namn som används för att komma åt den anslutna USB-lagringsenheten."
            }, {
                type: "name",
                title: "Aktivera",
                content: "Markera kryssrutan(-or) för att möjliggöra motsvarande åtkomstmetod(er)."
            }, {
                type: "name",
                title: "Åtkomstmetod",
                content: "Det finns fyra metoder för att komma åt den delade USB-lagringsenheten.",
                children: [{
                    type: "name",
                    title: "Mediaserver",
                    content: "Välj detta alternativ för att tillåta användare i nätverket för att visa foton, spela upp musik och titta på filmer på din delade UBS lagringsenhet från DLNA-enheter som stöds, som datorer, mobila enheter och spelkonsoler (PS2/3)."
                }, {
                    type: "name",
                    title: "Nätverksomgivning",
                    content: "Välj detta alternativ för att tillåta användare i nätverket att komma åt de delade innehållet via den adress som anges under adresskolumnen."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Välj det här alternativet för att aktivera FTP-servern funktion som gör att FTP-klienter och användare i nätverket kan komma åt USB-lagringsenheten via FTP-adress som visas under adress kolumnen. Om du vill ändra FTP-serverns port, ange ett nytt portnummer och klicka på <b>Spara</b> för att verkställa ändringarna."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (via internet)",
                    content: "Välj det här alternativet för att tillåta FTP-klienter och användare att fjärråtkomst, ladda ner och ladda upp filer till den delade USB-lagringsenhet via FTP över Internet."
                }]
            }, {
                type: "name",
                title: "Få tillgång till",
                content: "Visar adressen för att komma åt delade USB-lagringsenheten."
            }, {
                type: "name",
                title: "Port",
                content: "Visar FTP-serverns portnummer."
            }, {
                type: "title",
                content: "Mappdelning"
            }, {
                type: "name",
                title: "Dela alla",
                content: "Växla till På för att dela alla filer och mappar eller Av för att endast dela valda mapparna."
            }, {
                type: "name",
                title: "Aktivera autentisering",
                content: "Växla till På för att aktivera autentisering som kräver att användare ska ange ett giltigt användarnamn och lösenord för att komma åt alla delade mappar."
            }, {
                type: "name",
                title: "Mappnamn",
                content: "Visar namnet på den delade mappen."
            }, {
                type: "name",
                title: "Mappväg",
                content: "Visar sökvägen till den delade mappen."
            }, {
                type: "name",
                title: "Mediedelning",
                content: "Visar om mediedelning funktionen är På eller Av."
            }, {
                type: "name",
                title: "Volymnamn",
                content: "Visar namnet på den delade volymen."
            }, {
                type: "name",
                title: "Status",
                content: "Anger aktuell status för en delad mapp. Klicka på ikonen Bulb att aktivera (eller inaktivera) mappdelning."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativen <b>Ändra</b> eller <b>Ta bort</b> motsvarande delad mapp."
            }, {
                type: "note",
                title: "Lägg till en mappdelningspost:",
                content: [
                    "Växla till Av <b>Markera alla</b>.",
                    "Klicka på <b>Lägg till</b>.",
                    "Välj <b>Volymnamn</b> och <b>Mappsökväg</b>.",
                    "Skapa ett mappnamn.",
                    "Bestäm hur du delar mappen. <br /> <B> Aktivera autentisering </b> - Välj om du vill att användare att autentisera med ett giltigt användarnamn och lösenord för att komma åt de delade mapparna <br /> <b>Aktivera skrivning</b> - Välj om du vill tillåta användare att göra ändringar i innehållet i mappen <br /> <b>aktivera mediedelning</b> - om du vill dela media<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPSec inställningar",
            CONTENT: [{
                type: "name",
                title: "Detektering död peer ",
                content: "Dead Peer Detection (DPD) är ett sätt att detektera en död Internet Key Exchange (IKE) peer. DPD används för att återta förlorade resurser när en Peer hittas död och det används också för att genomföra IKE peer-failover. Växla till På om du vill aktivera den Dead Peer Detection-funktionen."
            }, {
                type: "name",
                title: "Anslutningsnamn/fjärr-gateway/lokal adress/fjärradress",
                content: "Visar anslutningsnamn, fjärr-gateway, lokal adress, och fjärr-adress för IPSec."
            }, {
                type: "name",
                title: "Status",
                content: "Visar status för IPSec. Status inkluderar:",
                children: [{
                    type: "name",
                    title: "inaktiverad",
                    content: "Posten är inaktiverad."
                }, {
                    type: "name",
                    title: "Ner",
                    content: "Posten är aktiverad, men ingen anslutning."
                }, {
                    type: "name",
                    title: "Upp",
                    content: "Posten är aktiverad och anslutningen är aktiv."
                }]
            }, {
                type: "name",
                title: "Aktivera",
                content: "Klicka på knappen ikonen <b> Bulb</b>  för att aktivera eller inaktivera posten."
            }, {
                type: "name",
                title: "Ändra",
                content: "Visar alternativ till <b>Ändra</b> eller <b>Ta bort</b> motsvarande post."
            }, {
                type: "name",
                title: "Lägg till",
                content: "Klicka här för att lägga till en ny IPSec VPN-anslutning."
            }, {
                type: "name",
                title: "IPSec anslutningsnamn",
                content: "Ange ett namn för IPSec VPN-anslutning."
            }, {
                type: "name",
                title: "Fjärr IPSec gateway-adress (URL)",
                content: "Ange destinations gateway IP-adress som är den offentliga WAN IP eller domännamn för fjärr-VPN-servern slutpunkt."
            }, {
                type: "name",
                title: "Tunneltillgång från lokala IP-adresser",
                content: "Välj Subnet adress om du vill att hela LAN skall ansluta sig till VPN-nätverk, eller välj  En adress, om du vill ha en enda IP för att ansluta sig till VPN-nätverk."
            }, {
                type: "name",
                title: "IP-adress för VPN",
                content: "Ange IP-adressen för ditt LAN."
            }, {
                type: "name",
                title: "IP nätmask",
                content: "Ange nätmask för ditt LAN."
            }, {
                type: "name",
                title: "Tunnel åtkomst från avlägsna IP-adresser",
                content: "Välj Subnet Address om du vill att hela fjärr-LAN att ansluta sig till VPN-nätverk, eller välj En adress om du vill ha en enda IP för att ansluta sig till VPN-nätverk."
            }, {
                type: "name",
                title: "IP-adress för VPN",
                content: "Ange IP-adressen till fjärr-LAN."
            }, {
                type: "name",
                title: "IP nätmask",
                content: "Ange nätmasken fjärr-LAN."
            }, {
                type: "name",
                title: "Nyckel-utväxlings metod",
                content: "Välj Auto (IKE) eller Manuell som ska användas för att autentisera IPSec kamrater."
            }, {
                type: "name",
                title: "Verifieringsmetod",
                content: "Välj Förväg-delad nyckel (rekommenderas)."
            }, {
                type: "name",
                title: "För-delad nyckel",
                content: "Skapa en i förväg delad nyckel som ska användas för autentisering."
            }, {
                type: "name",
                title: "Perfekt vidarebefordrans anonymitet",
                content: "Välj Aktivera (eller deaktivera) Perfect Forward Secrecy (PFS) som en extra säkerhetsprotokoll för Förvald-delad nyckel."
            }, {
                type: "name",
                title: "Avancerad",
                content: "Klicka här för att konfigurera avancerade inställningar. Vi rekommenderar att du behåller standardinställningarna. Om du vill ändra de här inställningarna, se till att båda VPN-server ändpunkter använder samma krypteringsalgoritm, Integrity algoritm, Diffie-Hellman Group och nyckellivstid i både Phase1 och phase2.",
                children: [{
                    type: "title2",
                    content: "Fas 1"
                }, {
                    type: "name",
                    title: "Läge",
                    content: "Välj <b>Huvud</b> för att konfigurera standardförhandlingsparametrarna för IKE Phase1. Välj <b>Aggressiv</b> för att konfigurera IKE Phase 1 av VPN tunnel för att genomföra förhandlingar i en kortare tid. (Rekommenderas inte eftersom det är mindre säkert.)"
                }, {
                    type: "name",
                    title: "Typ av lokal identifierare",
                    content: "Välj den lokala Identifier typ för IKE förhandlingar. Lokal WAN IP använder en IP-adress som identifierare i IKE förhandlingar. FQDN (Fully Qualified Domain Name) använder ett användarnamn som identifierare."
                }, {
                    type: "name",
                    title: "Lokal identifierare",
                    content: "Den lokala identifierare kommer automatiskt befolkade om <b> Lokal WAN IP </b> är markerat. Om <b> FQDN </b> är markerat, ange ett användarnamn på den lokala enhet som ska användas som identifieringsmärke för IKE förhandlingar."
                }, {
                    type: "name",
                    title: "Typ av fjärridentifierare ",
                    content: "Välj fjärr-identifieringstyp för IKE förhandlingar. Fjärr-WAN IP använder en IP-adress som identifierare i IKE förhandlingar. FQDN använder ett användarnamn som identifierare."
                }, {
                    type: "name",
                    title: "Fjärridentifierare",
                    content: "Fjärr gateway IP-adress kommer automatiskt fyllas i om <b> Fjärr-WAN IP </b> är markerad. Om <b> FQDN </b> är markerad, ange ett användarnamn på fjärrkontrollen peer att användas som identifierare för IKE förhandlingar."
                }, {
                    type: "name",
                    title: "Krypteringsalgoritm",
                    content: "Välj ett av följande krypteringsalgoritm för IKE förhandlingar.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterar en 64-bitars block av klartext med en 56-bitars nyckel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, krypterar en vanlig text med 168-bitars nyckel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Använder AES-algoritmen och 128-bitars nyckel för kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Använder AES-algoritmen och 192-bitars nyckel för kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Använder AES-algoritmen och 256-bitars nyckel för kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritm",
                    content: "Välj ett av följande integritetsalgoritmen för IKE förhandlingar.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tar ett budskap om godtycklig längd och genererar en 128-bitars meddelande."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tar ett meddelande mindre än 2^64 (2 upphöjt till 64) bitar och genererar en 160-bitars meddelande."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman grupp för nyckel-utbyte",
                    content: "Välj Diffie-Hellman-gruppen, som skall användas i nyckelförhandling Fas 1. Diffie-Hellman-gruppen anger styrkan av algoritmen i bitar."
                }, {
                    type: "name",
                    title: "Nyckel livslängd",
                    content: "Ange tidsperioden (i sekunder) som kan passera innan en ny IPSec säkerhetsassociation (SA) etableras med fjärr-slutpunkt. Standardvärdet är 3600."
                }, {
                    type: "title2",
                    content: "Fas 2"
                }, {
                    type: "name",
                    title: "Krypteringsalgoritm",
                    content: "Välj ett av följande krypteringsalgoritm för IKE förhandlingar.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterar en 64-bitars block av klartext med en 56-bitars nyckel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, krypterar en vanlig text med 168-bitars nyckel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Använder AES-algoritmen och 128-bitars nyckel för kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Använder AES-algoritmen och 192-bitars nyckel för kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Använder AES-algoritmen och 256-bitars nyckel för kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritm",
                    content: "Välj ett av följande integritetsalgoritmen för IKE förhandlingar.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tar ett budskap om godtycklig längd och genererar en 128-bitars meddelande."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tar ett meddelande mindre än 2^64 (2 upphöjt till 64) bitar och genererar en 160-bitars meddelande."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman grupp för nyckelutbyte",
                    content: "Välj Diffie-Hellman-gruppen, som skall användas i nyckelförhandling Fas 2. Diffie-Hellman-gruppen anger styrkan av algoritmen i bitar."
                }, {
                    type: "name",
                    title: "Nyckel livstid",
                    content: "Ange tidsperioden (i sekunder) som kan passera innan en ny IPSec säkerhetsassociation (SA) etableras med fjärr-slutpunkt. Standardvärdet är 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Internet inställningar",
            CONTENT: [{
                type: "name",
                title: "Automatisk identifiering",
                content: "Klicka här för att få routern automatiskt identifiera din nuvarande Internet-anslutningstyp."
            }, {
                type: "paragraph",
                title: "Obs",
                content: "Om du är osäker på vilken Internetanslutningen typ du har, använd funktionen Auto detektering eller kontakta din Internetleverantör för att få hjälp."
            }, {
                type: "title",
                title: "Internet-anslutningstyp: statisk IP"
            }, {
                type: "name",
                title: "IP-adress/nätmask/standard-gateway/primär DNS/sekundär DNS",
                content: "Ange informationen från din Internetleverantör."
            }, {
                type: "title",
                title: "Internet-anslutningstyp: dynamisk IP"
            }, {
                type: "name",
                title: "Klona INTE MAC-adress/Klone aktuell dators MAC-adress",
                content: "Välj om du vill klona din MAC-adress eller inte, beroende på din Internetleverantör."
            }, {
                type: "title",
                title: "Internet-anslutningstyp: PPPoE"
            }, {
                type: "name",
                title: "Användarnamn lösenord",
                content: "Ange användarnamn och lösenord från din Internetleverantör. Dessa fält är skiftlägeskänsliga."
            }, {
                type: "title",
                title: "Internet ansutnignstyp: L2TP/PPTP"
            }, {
                type: "name",
                title: "Användarnamn lösenord",
                content: "Ange användarnamn och lösenord från din Internetleverantör. Dessa fält är skiftlägeskänsliga."
            }, {
                type: "name",
                title: "Sekundär anslutning (dynamisk IP eller statisk IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Välj detta om IP-adress och nätmask automatiskt tilldelas av din Internetleverantör."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: "Välj detta om IP-adress, är nätmask, gateway och DNS-adresser från din ISP, och ange dessa uppgifter i respektive fält."
                }]
            }, {
                type: "name",
                title: "VPN-server IP/domännamn",
                content: "Ange VPN-server, IP-adress eller domännamn från din Internetleverantör."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Skrivarserver",
            CONTENT: [{
                type: "paragraph",
                content: "Du kan konfigurera skrivarservern på denna sida."
            }, {
                type: "name",
                title: "Skrivarserver",
                content: "Visar den aktuella skrivarserverns status Aktivera/inaktivera"
            }, {
                type: "name",
                title: "Skrivarnamn",
                content: "Namn på skrivare som är ansluten till routern."
            }, {
                type: "note",
                title: "Följ instruktionerna nedan för att ställa in skrivarservern:",
                content: [
                    "Steg 1: Anslut USB-skrivare till USB-porten på routern med en USB-skrivarkabel.",
                    "Steg 2: Installera skrivardrivrutinen på din dator.",
                    "Steg 3: Installera TP-LINK USB Skrivar-styrning på din dator. Kör CD resursen eller ladda ner TP-LINK USB Printer Controller verktyget från vår hemsida: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Trådlösa avancerade inställningar 2.4 GHz | 5GHz",
            CONTENT: [{
                type: "name",
                title: "Beacon-intervall",
                content: "Ange ett värde mellan 25 och 1000 i millisekunder för att bestämma hur långt mellan beacon-paket som sänds av routern för att synkronisera det trådlösa nätverket. Standardvärdet är 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-tröskelvärde",
                content: "Ange ett värde mellan 1 och 2346 i byte för att bestämma paketstorlek på dataöverföring via routern. Standard RTS (Request to Send) tröskelvärde är 2346. Om paketstorleken är större än den förinställda tröskeln sänder routern Request to Send ramar till en viss mottagarstation och förhandlar sändning av en dataram, annars kommer paket att skickas omedelbart."
            }, {
                type: "name",
                title: "DTIM-intervall",
                content: "Ange ett värde mellan 1 och 255 för att bestämma intervallet för Delivery Traffic Indication Message (DTIM). 1 indikerar DTIM-intervall är detsamma som Beacon Intervall."
            }, {
                type: "name",
                title: "Gruppnyckel uppdateringsperiod",
                content: "Ange antal sekunder (minst 30) för att styra tidsintervallet för krypteringsnyckeln automatisk förnyelse. Standardvärdet är 0, vilket indikerar ingen nyckel-förnyelse."
            }, {
                type: "name",
                title: "WMM-funktion",
                content: "Funktionen WMM (multi-media Wi-Fi)  garanterar att paket med hög prioritet sänds företrädesvis. Det rekommenderas starkt och är aktiverad som standard."
            }, {
                type: "name",
                title: "Kort GI-funktion",
                content: "Denna funktion ökar datakapaciteten genom att minska skyddsintervall (GI) tid. Den rekommenderas och är aktiverad som standard."
            }, {
                type: "name",
                title: "AP isolerings-funktion",
                content: "Markera kryssrutan för att aktivera funktionen AP-isolation  som gör att du kan begränsa alla trådlösa enheter i ditt nätverk från att interagera med varandra, men ändå kunna komma åt Internet. AP isolering är avstängd som standard."
            }, {
        		display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Airtime rättvise-funktion",
                "content": "Markera kryssrutan för att göra det möjligt för Airtime rättvise-funktion (ATF) som gör det möjligt att optimera genomströmningen av varje flöde. ATF trafik schemaläggare använder per destination, samtalstid, med mål att balansera samtalstid och användning över flödesdestinationer."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Fler-användare MIMO funktion:",
                "content": "Klicka för att möjliggöra fler-användare MIMO funktion."
			},  {
				"type": "name",
				"title": "USB 3.0 störningsminskning",
				"content": "Minskar USB 3.0 störningar."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Aktivera WPS",
                content: "Växla till På om du vill aktivera WPS-funktionen."
            }, {
                type: "paragraph",
                content: "Klicka på Spara för att spara dina inställningar."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Nattläge",
                content: "När den här funktionen är aktiverad, kommer routerns lysdioder att stängas av automatiskt under den angivna tidsperioden."
            }, {
                type: "name",
                title: "Tidsperiod",
                content: "Ange en tidsperiod under vilken routerns lysdioder kommer att vara avstängda."
            }, {
                type: "paragraph",
                content: "Klicka på Spara för att spara dina inställningar."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "DoS skyddsinställning"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "DoS skyddsnivå skyddar routern från TCP-SYN-Flood, UDP-Flood, och ICMP-Flood attacker."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "ICMP-FLOOD paketnivå",
                content: "Ange ett värde mellan 5 och 3600 för att omedelbart utlösa ICMP-översvämningsskydd när antalet ICMP-paket överskrider det förinställda tröskelvärdet."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "UDP-FLOOD paketnivå",
                content: "Ange ett värde mellan 5 och 3600 för att omedelbart trigga UDP-Flood Protection  när antalet UDP-paket överskrider det förinställda tröskelvärdet."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "TCP-FLOOD paketnivå",
                content: "Ange ett värde mellan 5 och 3600 för att omedelbart utlösa TCP-SYN-översvämningsskydd när antalet TCP-SYN paket överskrider det förinställda tröskelvärdet."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Klicka på Spara för att spara dina inställningar."
            }]
        },
        logConf: {
            TITLE: "Logg-inställningar",
            CONTENT: [{
                type: "name",
                title: "Spara lokalt",
                content: "Välj att spara loggarna till din lokala minne.",
                children: [{
                    type: "name",
                    title: "Miniminivå",
                    content: "Välj miniminivån i listrutan, och därefter kommer alla loggade händelser över eller lika med den valda nivån, att sparas."
                }]
            }, {
                type: "name",
                title: "Spara fjärr",
                content: "Välj för att skicka loggar till den angivna IP-adressen och UDP-porten på fjärrsystemloggen server.",
                children: [{
                    type: "name",
                    title: "Miniminivå",
                    content: "Välj miniminivån i listrutan, och därefter kommer alla loggade händelser över eller lika med den valda nivån, att sparas."
                }, {
                    type: "name",
                    title: "Server IP",
                    content: "Ange IP-adressen för fjärrsystemloggen server som händelser kommer att skickas till."
                }, {
                    type: "name",
                    title: "Serverport",
                    content: "Ange portnumret för fjärrsystemloggens server som händelser kommer att skickas till."
                }, {
                    type: "name",
                    title: "Lokal anläggningsnamn",
                    content: "Välj den lokala anläggningen namn enligt din fjärrservers anläggningsnamn."
                }]
            }]
        },
        GUEST_NETWORK_WIRELESS: {
            TITLE: "Trådlöst",
            CONTENT: [{
                type: "name",
                title: "Säkerhet",
                content: "Du kan välja ett av följande säkerhetsalternativ.",
                children: [{
                    type: "name",
                    title: "Ingen säkerhet",
                    content: "De trådlösa stationerna kommer att ansluta till routern utan kryptering. Det rekommenderas starkt att välja ett av följande lägen för att aktivera säkerhet."
                }, {
                    type: "name",
                    title: "WPA/WPA2-personligt",
                    content: "WPA bygger på för-delat lösenord.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Du kan välja ett av följande versioner",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Välj WPA-PSK eller WPA2-PSK automatiskt baserat på trådlös stationens kapacitet och begäran."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "I förväg delad WPA2-nyckel."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan välja antingen Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Trådlöst lösenord",
                        content: "Du kan ange ASCII eller hexadecimala tecken. För hexadecimal bör längden vara mellan 8 och 64 tecken; för ASCII, bör längden vara mellan 8 och 63 tecken."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Välj WPA baserat på Radius Server.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Du kan välja ett av följande versioner",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Välj WPA eller WPA2 automatiskt baserat på trådlös stationens kapacitet och begäran."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi skyddad tillgång."
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA-version 2."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan välja antingen Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Radius-server IP",
                        content: "Ange IP-adressen för Radius-servern."
                    }, {
                        type: "name",
                        title: "Radius port",
                        content: "Ange porten för den radius-tjänst som används."
                    }, {
                        type: "name",
                        title: "Radius Lösenord",
                        content: "Ange lösenordet för Radius-servern."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Välj 802.11 WEP-säkerhet.",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Du kan välja ett av följande typer",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Välj Shared Key eller Open System-verifiering typ automatiskt, baserat på den trådlösa stationen kapacitet och begäran."
                        }, {
                            type: "name",
                            title: "Delad nyckel",
                            content: "Välj 802.11 Shared Key-verifiering."
                        }, {
                            type: "name",
                            title: "Öppet system",
                            content: "Välj 802.11 Open System-verifiering."
                        }]
                    }, {
                        type: "name",
                        title: "Vald nyckel",
                        content: "Välj vilken av de fyra nycklarna som kommer att användas."
                    }, {
                        type: "name",
                        title: "WEP-nyckelformat",
                        content: "Du kan välja ASCII eller hexadecimalt-format. ASCII-format står för någon kombination av tangentbordstecken i den angivna längden. Hexadecimalformat står för någon kombination av hexadecimala siffror (0-9, AF, AF) i den angivna längden."
                    }, {
                        type: "name",
                        title: "Nyckeltype",
                        content: "Du kan välja WEP nyckellängd (64-bitars eller 128-bitars eller 152-bitars.) För kryptering. \"Avstängd\" betyder det WEP-nyckel posten är ogiltig.",
                        children: [{
                            type: "name",
                            title: "För 64-bits kryptering",
                            content: "Du kan ange 10 hexadecimala siffror (valfri kombination av 0-9, af, AF, och null-nyckel är inte tillåtet) eller 5 ASCII-tecken."
                        }, {
                            type: "name",
                            title: "För 128-bits kryptering",
                            content: "Du kan ange 26 hexadecimala siffror (valfri kombination av 0-9, af, AF, och null-nyckel är inte tillåtet) eller 13 ASCII-tecken."
                        }, {
                            type: "name",
                            title: "För 152-bits kryptering",
                            content: "Du kan ange 32 hexadecimala siffror (valfri kombination av 0-9, af, AF, och null-nyckel är inte tillåtet) eller 16 ASCII-tecken."
                        }]
                    }, {
                        type: "name",
                        title: "Nyckelvärde",
                        content: "Ange lösenordet för WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Läge",
                content: "Det här fältet bestämmer det trådlösa läge som routern fungerar på."
            }, {
                type: "name",
                title: "Kanalbredd",
                content: "Bandbredden för den trådlösa kanalen."
            }, {
                type: "name",
                title: "Kanal",
                content: "Detta fält bestämmer vilken arbetsfrekvens som kommer att användas. Det är inte nödvändigt att ändra den trådlösa kanalen såvida du märker störningsproblem med en annan närliggande åtkomstpunkt. Om du väljer auto, kommer AP att automatiskt välja den bästa kanalen."
            }, {
                type: "name",
                title: "Sändningseffekt",
                content: "Här kan du ange routerns sändningseffekt. Du kan välja hög, mellan eller låg som du vill. Hög är standardinställningen och rekommenderas."
            }, {
                type: "paragraph",
                content: "Klicka på <strong> Spara</strong> och tillämpa konfigurationen."
            }]
        },
        diagnostic: {
            TITLE: "Diagnos-verktyg",
            CONTENT: [{
                type: "paragraph",
                content: "Routern ger ping och traceroute verktyg som hjälper dig att felsöka problem med nätverksanslutning. Ping-verktyget skickar paket till en mål IP-adress eller domännamn och loggar resultaten, såsom antalet skickade paket / emot och rundresa tid. Traceroute verktyg skickar paket till ett mål IP-adress eller ett domännamn och visar antalet hopp och tid för att nå destinationen."
            }, {
                type: "paragraph",
                content: "Du kan pinga och tracerouta ett nätverksenhet med IP-adress eller ett domännamn, t.ex. google.com, yahoo.com, etc."
            }, {
                type: "note",
                title: "Ping-diagnos",
                content: [
                    "Ange målets IP-adress eller domännamn.",
                    "Klicka på ikonpilen för att öppna menyn Avancerat och ange Ping-antal och Ping-paketstorlek. (tillval)",
                    "Klicka på Start."
                ]
            }, {
                type: "note",
                title: "Traceroute-diagnos",
                content: [
                    "Ange målets IP-adress eller domännamn.",
                    "Klicka på ikonpilen för att öppna menyn Avancerat och ange antalet hopp (som ska nås) i Traceroute Max TTL (Livstid). Standardvärdet är 20. (tillval)",
                    "Klicka på Start."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC-adress",
                content: "Routerns unika fysiska adress."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "LAN IPv4",
                content: "Använder routerns standard-IP-adress (192.168.0.1) eller ange en ny. Denna IP-adress kan användas för att logga in på routerns webbhanteringssid."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Adresstyp",
                "content": "Att konfigurera routern IP-adress. Du kan konfigurera den manuellt (statisk IP) eller automatiskt (Smart DHCP)."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "LAN IP",
                "content": "Använder routerns standard-IP-adress (192.168.0.254) eller ange en ny. Denna IP-adress kan användas för att logga in på routerns webbhanteringssid."
            }, {
                type: "name",
                title: "Nätmask",
                content: "Välj en tilldelad identifierare som används av LAN-porten för att dirigera inre och yttre trafik från listrutan eller ange en ny subnätmask. Standardvärdet är 255.255.255.0."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IGMP-snooping",
                content: "IGMP (Internet Group Management Protocol) används för att hantera multicasting på TCP/IP-nätverk. Vissa Internetleverantörer använder IGMP för att utföra fjärrkonfiguration av klientenheter, t.ex. routern. Det är aktiverat som standard."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Obs",
                content: "Om den nya LAN IP-adressen inte finns i samma subnät med den gamla, kommer IP-adrespoolen i DHCP-servern automatiskt förändras; dock kommer Virtual Server och DMZ Host inte träda i kraft förrän de konfigureras."
            }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Länk-sammanslagning"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Länk-sammanslagning kombinerar två portar för att skapa en enda dataförbindelse med hög bandbredd, och således upprätthålla en högre hastighet och stabilare trådbundet nätverk."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Om du vill använda länk-sammanslagning",
                content: [
                    "Växla till enable (aktivera) funktionen Link Aggregation.",
                    "Välj länk-sammanslagning <b> LACP aktiv. </b>vilket akrtiverar LACP (Link Aggregation Control Protocol ovillkorligt <br><b> LACP passiv: </b> aktiverar LACP endast när en LACP enhet upptäcks.",
					"Ange två portar för länk-sammanslagning",
					"Klicka på Save (spara)."
                ]
            }]
        },
        ddos: {
            TITLE: "Brandvägg",
            CONTENT: [{
                type: "name",
                title: "SPI brandvägg",
                content: "Brandväggen SPI (Stateful Packet Inspection)  förhindrar cyberattacker och kontrollerar den trafik som passerar genom routern. SPI-brandväggen är aktiverad som standard."
            }, {
                type: "title",
                title: "Dos skydd"
            }, {
                type: "name",
                title: "DoS skydd",
                content: "DoS (Denial of Service) skyddar ditt nätverk mot DoS-attacker från att översvämma ditt nätverk med server-förfrågningar. Som standard är DoS Protection inaktiverad (Av)."
            }, {
                type: "name",
                title: "ICMP-flood filtrering",
                content: "Aktivera för att förhindra ICMP (Internet Control Message Protocol) översvämningsattack."
            }, {
                type: "name",
                title: "UDP-flood filtrering",
                content: "Aktivera för att förhindra att UDP (User Datagram Protocol) översvämningsattack."
            }, {
                type: "name",
                title: "TCP-flood filtrering",
                content: "Aktivera för att förhindra Transmission Control Protocol-Synkronisera (TCP-SYN) flood attack.",
                children: [{
                    type: "name",
                    title: "Av",
                    content: "Inget skydd."
                }, {
                    type: "name",
                    title: "Låg",
                    content: "Låg nivå av skydd och låg påverkan på routern prestanda."
                }, {
                    type: "name",
                    title: "Medel",
                    content: "Måttlig-skyddsnivå och halv märkbar effekt på routerns prestanda."
                }, {
                    type: "name",
                    title: "Hög",
                    content: "Hög nivå av skydd, men en märkbar inverkan på routerns prestanda."
                }]
            }, {
                type: "name",
                title: "Förbjud LAN-ping",
                content: "Aktivera för att förbjuda pingar från LAN-portar."
            }, {
                type: "name",
                title: "Förbjud WAN-ping",
                content: "Aktivera för att förbjuda pingar från WAN-porten."
            }, {
                type: "title",
                title: "Blockerad DoS värdlista"
            }, {
                type: "name",
                title: "Blockerad DoS värdlista",
                content: "Listar IP-adress och MAC-adress från valfri spärrad DoS-attack källa."
            }, {
                type: "name",
                title: "Radera en eller flera poster",
                content: "Markera posten eller poster i Värdlistan som du vill ta bort och klicka på Ta bort ovanför tabellen."
            }]
        },
        ipv6: {
            TITLE: "IPv6-internet",
            CONTENT: [{
                type: "name",
                title: "Aktivera IPv6",
                content: "Välj att aktivera (På) eller inaktivera (Av) IPv6-funktionen i routern."
            }, {
                type: "title",
                title: "Internet-anslutningstyp: statisk IP"
            }, {
                type: "name",
                title: "statisk IP",
                content: "Välj den här typen om din Internetleverantör använder statisk IPv6-adresstilldelning."
            }, {
                type: "name",
                title: "IPv6-adress/IPv6 standard gateway/IPv6 DNS-server/sekundär IPv6 DNS-server",
                content: "Skriv in dessa parametrar från din Internetleverantör."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 byte. Ändra inte standard MTU-storleken om det inte krävs av din Internetleverantör."
            }, {
                type: "title",
                title: "Internet-anslutningstyp: dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Välj den här typen om din Internetleverantör använder dynamisk IPv6-adresstilldelning."
            }, {
                type: "name",
                title: "IPv6-adress/IPv6 gateway",
                content: "Dessa parametrar tilldelas automatiskt av DHCPv6-server från din Internetleverantör."
            }, {
                type: "name",
                title: "Adresstyp",
                content: "Välj anslutningstyp för IPv6-anslutning."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Standard och typisk MTU (Maximum Transmission Unit) storlek för de flesta Ethernet-nätverk är 1500 byte. Ändra inte standard MTU-storleken om det inte krävs av din Internetleverantör."
            }, {
                type: "name",
                title: "Använd följande IPv6 DNS-adress",
                content: "Markera den här kryssrutan och ange DNS-serveradress(er) som tillhandahålls av din ISP med decimalpunkter. Detta WAN-gränssnittet kommer att använda angiven DNS-server för prioritet."
            }, {
                type: "name",
                title: "Värdnamn",
                content: "Ange ett värde i det här fältet för att ange routerns värdnamn."
            }, {
                type: "title",
                title: "Internet-anslutning typ: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Välj den här typen om din Internetleverantör använder PPPoEv6, och ger dig ett användarnamn och lösenord."
            }, {
                type: "name",
                title: "Användarnamn/lösenord/bekräfta lösenord",
                content: "Skriv in dessa parametrar från din Internetleverantör."
            }, {
                type: "name",
                title: "Adresstyp",
                content: "Välj anslutningstyp för IPv6-anslutning."
            }, {
                type: "name",
                title: "Tjänstnamn",
                content: "Ange servicenamn som tillhandahålls av din Internetleverantör. Om det inte finns, lämna det tomt."
            }, {
                type: "name",
                title: "Servernamn",
                content: "Ange servernamnet från din Internetleverantör. Om det inte finns, lämna det tomt."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Typisk MTU-storlek (Maximum Transmission Unit) för Ethernet-nätverk är 1480 byte.",
                children: [{
                    type: "paragraph",
                    content: "<b> Obs! </b>: I ett sällsynt fall, kan din Internetleverantör kräva att du justerar MTU-storleken för bättre nätverksprestanda. Du bör inte ändra värdet om det inte är absolut nödvändigt."
                }]
            }, {
                type: "name",
                title: "Använd IPv6-information som anges av ISP",
                content: "Markera den här kryssrutan och ange IP-adress och gateway från din Internetleverantör."
            }, {
                type: "name",
                title: "Använd följande IPv6 DNS-adress",
                content: "Välj detta om du vill ange DNS-adressen från din Internetleverantör manuellt. Om det inte är markerat, kommer routern att få DNS-adressen dynamiskt från din Internetleverantör."
            }, {
                type: "title",
                title: "Internet anslutningstyp: 6to4 tunnel"
            }, {
                type: "name",
                title: "6to4 tunnel",
                content: "Välj den här typen om din Internetleverantör använder 6to4 distribution för att tilldela adressen."
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "Adresstyp",
                content: "Välj rätt en enligt din ISP.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Välj detta alternativ för att tilldela IPv6-adresser till datorer i ditt nätverk via RADVD.",
                    children: [{
                        type: "name",
                        title: "Aktivera RDNSS",
                        content: "Markera kryssrutan för att aktivera RDNSS funktionen."
                    }, {
                        type: "name",
                        title: "Aktivera ULA-prefix",
                        content: "Markera kryssrutan för att aktivera ULA Prefix funktionen.",
                        children: [{
                            type: "name",
                            title: "ULA-prefix",
                            content: "Ange ULA-prefix."
                        }, {
                            type: "name",
                            title: "ULA-prefix längd",
                            content: "Ange ULA prefixlängden. Standardvärdet är 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6-server",
                    content: "För att automatiskt tilldela IP-adresser till klienter i nätverket.",
                    children: [{
                        type: "name",
                        title: "Start IPv6-adress",
                        content: "Ange start IPv6-adress."
                    }, {
                        type: "name",
                        title: "Slut IPv6-adress",
                        content: "Ange slut IPv6-adress."
                    }, {
                        type: "name",
                        title: "Lånad tid",
                        content: "Ange tid under vilken en DHCP-klient kan använda sin nuvarande dynamiska IPv6-adress tilldelad av routern. Efter att den dynamiska IPv6-adress har löpt ut, kommer användaren automatiskt tilldelas en ny dynamisk IPv6-adress. Standardvärdet är 86400 sekunder."
                    }]
                }]
            }, {
                type: "name",
                title: "Webbplats prefixtyp",
                content: "Välj en typ att tilldela prefix till IPv6-adresser. Delegerade och statiska tillhandahålls."
            }, {
                type: "name",
                title: "Delegerad",
                children: [{
                    type: "name",
                    title: "Prefixdelegerad WAN-anslutning",
                    content: "Välj en WAN-anslutning från rullgardinslistan för att tilldela prefix."
                }]
            }, {
                type: "name",
                title: "Statisk",
                children: [{
                    type: "name",
                    title: "Webbplats prefix",
                    content: "Ange ett värde för webbplatsens prefix."
                }, {
                    type: "name",
                    title: "Webbplats prefixlängd",
                    content: "Ange ett värde för webbplatsens prefixlängd."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Aktivera VPN-server",
				content: "Markera kryssrutan för att aktivera OpenVPN server."
			},{
				type: "name",
				title: "Typ av tjänst",
				content: "Välja kommunikationsprotokollet för OpenVPN Server: UDP eller TCP."
			},{
				type: "name",
				title: "Service-port",
				content: "Ange en kommunikationsportnummer mellan 1024 till 65535. Standard och gemensam serviceport är 1194."
			},{
				type: "name",
				title: "VPN aubnet/nätmask",
				content: "Ange området för IP-adresser som kan hyras ut till klienter från OpenVPN server."
			},{
				type: "name",
				title: "Kllienttillgång",
				content: "Välj typ av anslutning till din OpenVPN klient."
			},{
				type: "name",
				title: "Endast hem-nätverk",
				content: "Klienterna kan bara få åtkomst till routern och LAN. Klienternas standardväg kommer inte att förändras."
			},{
				type: "name",
				title: "Internet och hemma-nätverk",
				content: "Klienter kan få tillgång till routerns LAN och Internet. Klientens standardväg kommer att ändras."
			},{
				type: "paragraph",
                		content: "Klicka på Sava (spara) alla dina inställningar."
            },{
                type: "title",
                content: "Certifikat"
            },{
                type: "paragraph",
                content: "Använd certifikatet för information och identitet av VPN-anslutning för fjärrdatorn."
            },{
                type: "name",
                title: "Skapa",
                content: "Klicka för att skapa ett nytt certifikat."
            },{
                type: "title",
                content: "Konfigurationssfil"
            },{
                type: "name",
                title: "Exportera",
                content: "Klicka på den här knappen för att spara konfigurationsfilen för OpenVPN som ska användas för att lägga till en ny VPN-anslutning."
			},{
                type: "title",
                content: "Installationsguide för VPN-klient"
			},{
				type: "step",
                		title: "För att aktivera och ansluta klientenheter till OpenVPN server:"
			},{
				type: "paragraph",
				content: "Innan du konfigurerar OpenVPN server, konfigurera dynamisk DNS-tjänst (rekommenderas) eller tilldela en statisk IP-adress för WAN-porten. Se till att den externa port NAT inställningar inte är serviceporten, och systemtid är synkroniserad med Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Välj Enable (aktivera) VPN-server.",
					"Konfigurera serverparametrar OpenVPN (typ av tjänst, serviceporten och Client Access) och klicka på Save (spara).",
					"Klicka på Exportera för att spara konfigurationsfilen.",
					"På dina klientenheter, ladda ner och installera OpenVPN klientverktyg från <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> de officiella plattformar som stöds är Windows, Mac OSX, Linux.",
					"Starta OpenVPN klientverktyg och lägg till en ny VPN-anslutning med den sparade konfigurationsfilen för att ansluta klientenhet till VPN-servern."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Om du vill veta mer om OpenVPN klienter, besök <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "Aktivera VPN-server",
				content: "Markera kryssrutan för att aktivera PPTP VPN-servern."
			},{
				type: "name",
				title: "Klient IP-adress",
				content: "Ange IP-adressintervall (upp till 10 klienter) som kan hyras ut till kunderna via PPTP VPN-servern."
			},{
				type: "name",
				title: "Användarnamn och lösenord",
				content: "Ange användarnamn och lösenord för att autentisera klienter till PPTP VPN-servern."
			},{
				type: "paragraph",
				content: "Klicka på Sava (spara) alla dina inställningar."
			},{
                type: "title",
                content: "Installationsguide för VPN-klient"
			},{
				type: "step",
                		title: "För att aktivera och ansluta klientenheter till PPTP VPN-servern:"
			},{
				type: "paragraph",
				content: "Innan du konfigurerar PPTP VPN-servern, konfigurerar dynamisk DNS-tjänst (rekommenderas) eller tilldela en statisk IP-adress för WAN-porten. Se till att den externa port NAT inställningar inte är 1723 och systemtid är synkroniserad med Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Välj Enable (aktivera) VPN-server.",
					"Konfigurera serverparametrar PPTP VPN och klicka på Save (spara).",
					"Skapa en PPTP VPN-anslutning på dina klientenheter. Officiella plattformar som stöds är Windows, Mac OSX, Linux, iOS och Android.",
					"Starta PPTP VPN-program, lägg till en ny anslutning och ange domännamnet på den registrerade DDNS-tjänsten eller statisk IP-adress som tilldelats till WAN-porten för att ansluta din klientenhet till PPTP VPN-servern."
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN-anslutningar",
			CONTENT: [{
				type: "paragraph",
				content: "Denna sida visar de klienter som för närvarande är anslutna till OpenVPN och PPTP VPN-servrar på routern."
			},{
				type: "paragraph",
				content: "Klicka på minus-ikonen för att koppla bort klient."
			}]
		},
        cloudBasic: {
            TITLE: "TP-Link Cloud",
            CONTENT: [{
                type: "paragraph",
                content: "TP-Link molntjänst låter dig att fjärrövervaka nätverket i realtid, få åtkomst till och hantera dina TP-Link enheter från Internet när som helst och var som helst."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Kontoinformation"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Visar din TP-Link ID-information. Du kan redigera kontoinformation genom att klicka på ikonen Redigera."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Enhetsinformation "
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Visar enhetsinformation, inklusive moln-kontot som hanterar enheten."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Bundna konton"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Denna tabell visar alla cloud konton som för närvarande är bundna till enheten."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Bind ett användarkonto",
                content: [
                    "Klicka Bind.",
                    "Ange den registrerade e-post som du vill binda.",
                    "Klicka på Save (spara)."
                ]
            }]
        }
    };
})(jQuery);
