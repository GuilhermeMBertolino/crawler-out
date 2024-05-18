(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Styring af båndbredde",
            CONTENT: [{
                type: "paragraph",
                content: "Styring af båndbredde giver dig mulighed for at konfigurere Upstream båndbredde og Downstream båndbredde på netværket, og den kombinerede hastighed bør ikke overstige 1000000 Kbps. Vælg den korrekte linjetype og kontakt din internetudbyder for at få den totale tilladte båndbredde til upstream og downstream, for optimal styring af båndbredde."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Marker dette afkrydsningsfelt for at aktivere funktionen Styring af båndbredde."
            }, {
                type: "name",
                title: "Samlet Upstream båndbredde ",
                content: "Angiv den samlede upload-hastighed via WAN-porten."
            }, {
                type: "name",
                title: "Samlet Downstream båndbredde",
                content: "Angiv den samlede download-hastighed via WAN-porten."
            }, {
                type: "title",
                content: "Regler for styring"
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser omfanget af styrede IP-adresser eller porte."
            }, {
                type: "name",
                title: "Prioritet",
                content: "Viser reglens prioritet, hvor 1 er den højeste prioritet og 8 er laveste prioritet. Den samlede upload og download båndbredde vil blive afsat for at sikre minimum hastighed af alle regler for styring af båndbredde."
            }, {
                type: "name",
                title: "Op (min./maks.) ",
                content: "Viser den minimale og maksimale båndbredde for upload i Kbps."
            }, {
                type: "name",
                title: "Ned (min./maks.)",
                content: "Viser den minimale og maksimale båndbredde for download i Kbps."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Angiver den aktuelle status for en regel. Klik på pæreikonen for at aktivere eller deaktivere reglen."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
            }, {
                type: "note",
                title: "Sådan tilføjes en ny regel",
                content: [
                    "Klik på Tilføj. ",
                    "Angiv et interval af IP-adresser, der skal styres.",
                    "Angiv et interval af portnumre, der skal styres.",
                    "Vælg protokoltypen for denne regel.",
                    "Vælg et prioritetsniveau for denne regel. (1 er højeste prioritet).",
                    "Angiv den minimale og maksimale båndbredde for upload (i KB) via WAN-porten.",
                    "Angiv den minimale og maksimale båndbredde for download (i KB) via WAN-porten.",
                    "Vælg Aktiverer dette valg.",
                    "Klik på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For at slette flere regler</strong><br>i listen over styringsregler, skal du vælg det tilsvarende afkrydsningsfelt for de regler der skal slettes og klikke på Slet over tabellen."
            }]
        },
        accessControl: {
            TITLE: "Adgangskontrol",
            CONTENT: [{
                type: "paragraph",
                content: "Adgangskontrol anvendes til at tillade eller blokere for bestemte computere og andre enheder fra at få adgang til dit netværk. Når en enhed er blokeret, kan den få en IP-adresse fra routeren, men kan ikke kommunikere med andre enheder eller oprette forbindelse til internettet. "
            }, {
                type: "paragraph",
                content: "<strong>Bemærk:</strong>For at bruge adgangskontrol, skal du aktiverer denne funktion og følge trinene i Brugsvejledningen. Hvis adgangskontrol er deaktiveret (Off), vil alle enheder kunne få adgang til dit netværk, herunder dem der er  sortlistede."
            }, {
                type: "name",
                title: "Adgangskontrol",
                content: "Aktiver for at aktivere funktionen Adgangskontrol."
            }, {
                type: "title",
                content: "Adgangstilstand"
            }, {
                type: "name",
                title: "Sortliste",
                content: "Vælg for at blokere adgangen fra enhederne på listen nedenfor."
            }, {
                type: "name",
                title: "Hvidliste",
                content: "Vælg for kun at tillade adgang fra enhederne på listen nedenfor."
            }, {
                type: "title",
                content: "Sortlistede/hvidlistede enheder"
            }, {
                type: "note",
                title: "<strong>Sådan sortlistes eller hvidlistes en enhed</strong>",
                content: [
                    "Klik på ikonet Tilføj.",
                    "Indtast enhedens navn.",
                    "Indtast MAC-adressen på enheden.",
                    "Klik på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For at redigere eller slette en enhed på listen over sortlistede/hvidlistede enheder</strong><br>I tabellen over sortlistede/hvidlistede enheder, skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
            }, {
                type: "paragraph",
                content: "<strong>For at slette flere enheder på listen over sortlistede/hvidlistede enheder</strong><br>I tabellen over sortlistede/hvidlistede enheder, skal du vælge alle de enheder du ønsker at slette, og klikke på Slet over tabellen."
            }, {
                type: "title",
                content: "Enheder online"
            }, {
                type: "name",
                title: "Enhedsnavn",
                content: "Viser navnet på de forbundne enheder."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser IP-adressen på de forbundne enheder."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen på de forbundne enheder."
            }, {
                type: "name",
                title: "Forbindelsestype",
                content: "Viser forbindelsestypen af de forbundne enheder, enten traditionel eller trådløs. "
            }, {
                type: "paragraph",
                content: "<strong>For at blokere en eller flere enheder</strong><br>Vælg den enhed, som du ønsker at blokere i tabellen over onlineenheder og klik på Blokker over tabellen. De valgte enheder vil automatisk blive tilføjet til de sortlistede enheder."
            }]
        },
        arpBind: {
            TITLE: "Indstillinger",
            CONTENT: [{
                type: "paragraph",
                content: "IP & MAC-binding (også kendt som ARP-binding) er nyttigt til kontrol af adgangen til en bestemt computer på LAN ved at binde IP-adressen og MAC-adressen for enheden sammen. IP & MAC-binding forhindrer også andre enheder fra at bruge en specifik IP-adresse."
            }, {
                type: "name",
                title: "IP & MAC-binding",
                content: "Slå til for at aktivere funktionen IP & MAC-binding."
            }, {
                type: "title",
                title: "Bindingsliste"
            }, {
                type: "note",
                title: "<strong>Sådan konfigureres en enhed med ARP-binding</strong>",
                content: [
                    "Klik på Tilføj.",
                    "Indtast MAC-adressen på enheden.",
                    "Indtast en IP-adresse, som du vil binde til ovennævnte MAC-adresse.",
                    "Vælg Aktiver.",
                    "Klik på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Sådan redigeres eller slettes en post</strong><br>I tabellen over bindinger, skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
            }, {
                type: "paragraph",
                content: "<strong>Sådan slettes flere poster</strong><br>I tabellen over bindinger, skal du vælge de poster du ønsker at slette, og klikke på Slet over tabellen."
            }, {
                type: "title",
                title: "ARP-liste"
            }, {
                type: "paragraph",
                content: "Viser MAC- og IP-adressen på de aktuelt forbundne enheder."
            }, {
                type: "name",
                title: "Enhedsnavn",
                content: "Viser navnet på de forbundne enheder."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen på de forbundne enheder."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser IP-adressen tildelt til de forbundne enheder."
            }, {
                type: "name",
                title: "Bundet",
                content: "Angiver, om MAC- og IP-adresserne er bundne eller ej."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillinger for at slette den tilsvarende post fra listen."
            }, {
                type: "paragraph",
                content: "<strong>Bemærk: </strong>Du kan ikke binde den samme IP-adresse til flere MAC-adresser."
            }, {
                type: "paragraph",
                content: "<strong>Sådan bindes  flere enheder</strong><br>I ARP-listen, skal du vælg de enheder, som du ønsker at binde deres IP-adresser til deres MAC-adresser, og klik derefter på Bind over tabellen."
            }]
        },
        alg: {
            TITLE: "Gateway til programlaget (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG giver brugerdefinerede NAT (Network Address Translation) traversal-filtre der kan tilsluttes gatewayen for at understøtte oversættelse af adresser og porte for visse programlag af \"kontrol/data\"-protokoller: FTP, TFTP, H323 osv. Så aktivering af ALG anbefales."
            }, {
                type: "name",
                title: "PPTP passthrough",
                content: "Marker afkrydsningsfeltet for at aktivere funktionen PPTP passthrough, for at tillade at punkt-til-punkt-sessioner tunnelføres gennem et IP-netværk og igennem routeren."
            }, {
                type: "name",
                title: "L2TP passthrough",
                content: "Marker afkrydsningsfeltet for at aktivere funktionen L2TP passthrough, for at tillade at Lag 2 punkt-til-punkt-sessioner gennemføres  via et IP-netværk og igennem routeren."
            }, {
                type: "name",
                title: "IPSec Passthrough",
                content: "Marker afkrydsningsfeltet for at aktivere funktionen IPSec passthrough, for at tillade at at IPSec (Internet Protocol Security) tunnelføres gennem et IP-netværk og igennem routeren. IPSec anvender kryptografiske sikkerhedstjenester til at sikre privat og sikker kommunikation over IP-netværk."
            }, {
                type: "name",
                title: "FTP-ALG",
                content: "Marker dette afkrydsningsfelt for at aktivere FTP ALG-funktionen for at tillade at FTP-klienter (FTP - File Transfer Protocol) og servere kan overføre data via NAT."
            }, {
                type: "name",
                title: "TFTP-ALG",
                content: "Marker dette afkrydsningsfelt for at aktivere TFTP ALG-funktionen for at tillade at TFTP-klienter (TFTP - Trivial File Transfer Protocol) og servere kan overføre data via NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Hvis det er valgt, kan medieafspiller-klienter kommunikere med streaming medie-servere via NAT."
            }, {
                type: "name",
                title: "H323 ALG",
                content: "Marker dette afkrydsningsfelt for at aktivere H323 ALG-funktionen for at tillade at Microsoft NetMeeting klienter kan kommunikerer via NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Marker dette afkrydsningsfelt for at aktivere SIP ALG-funktionen for at tillade at SIP-klienter og servere kan overføre data over NAT."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme alle dine indstillingerne."
            }]
        },
        virtualServer: {
            TITLE: "Virtuelle servere",
            CONTENT: [{
                type: "paragraph",
                content: "Virtuelle servere bruges til at konfigurere offentlige tjenester på dit lokale netværk. En virtuel server er defineret som en ekstern port, og alle anmodninger fra internettet til denne eksterne port vil blive omdirigeret til en særskilt computer, som skal være konfigureret med en statisk eller reserveret IP-adresse."
            }, {
                type: "name",
                title: "Tjenestetype",
                content: " Viser navnet på din virtuelle server."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser portnummeret eller et interval af porte, der bruges af den virtuelle server. "
            }, {
                type: "name",
                title: "Intern IP",
                content: "Viser IP-adressen på den computer, der kører tjenesteprogrammet."
            }, {
                type: "name",
                title: "Intern port",
                content: "Viser portnummeret på den computer, der kører tjenesteprogrammet."
            }, {
                type: "name",
                title: "Protokol",
                content: "Viser den protokol, der benyttes til tjenesteprogrammet: TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
            }, {
                type: "name",
                title: "Status",
                content: "Angiver den aktuelle status for en virtuel server. Klik på pæreikonen for at aktivere (eller deaktivere) posten for den virtuelle server."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at ændre eller slette den pågældende regel."
            }, {
                type: "note",
                title: "<strong>Sådan tilføjes en post for en virtuel server</strong>",
                content: [
                    "Klik på Tilføj.",
                    "Vælg et grænsefladenavn fra rullelisten.",
                    "Klik på Vis eksisterende programmer for at vælg en tjeneste fra listen for automatisk at udfylde de relevante portnumre på felterne for den eksterne port og interne port. Hvis tjenesten ikke er på listen, kan man indtaste det eksterne portnummer (f. eks. 21) eller et interval af porte (f. eks. 21-25). Lad den interne Port være tom, hvis det er det samme som den eksterne port eller angiv et bestemt portnummer (f. eks. 21), hvis den eksterne port er en enkelt port. ",
                    "Indtast IP-adressen på den computer, der kører tjenesteprogrammet i decimalformat på feltet for den interne IP.",
                    "Vælg en protokol for tjenesteprogrammet: TCP, UDP eller Alle fra rullemenuen Protokolliste.",
                    "Vælg Aktiverer dette valg.",
                    "Klik på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Sådan redigeres eller slettes en post for en virtuel server</strong><br>Klik på ikonet Rediger eller papirkurv for det tilsvarende felt."
            }, {
                type: "paragraph",
                content: "<strong>Sådan slettes flere poster</strong><br>Vælg alle de poster for virtuelle servere, som du ønsker at slette, og klik på Slet over tabellen."
            }, {
                type: "paragraph",
                content: "<strong>Bemærk:</strong><br>Hvis din lokale host-enhed er host for mere end én type tjenester, skal du oprette en virtuel server for hver tjeneste."
            }]
        },
        portTrigger: {
            TITLE: "Portudløsning",
            CONTENT: [{
                type: "paragraph",
                content: "Portudløsning bruges til at fremsende trafik på en bestemt port til en specifik server på netværket.  "
            }, {
                type: "name",
                title: "Program",
                content: "Viser navnet på programmet."
            }, {
                type: "name",
                title: "Portudløsning",
                content: "Viser den udgående trafikport der anvendes til at udløse en filtreringsregel af en udgående forbindelse."
            }, {
                type: "name",
                title: "Udløsningsprotokol",
                content: "Viser den protokol, der benyttes for den udløste port. TCP, UDP eller Alle (alle understøttede protokoller på routeren)."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser porten eller intervallet af porte der anvendes af det eksterne system. Et svar gennem en af disse porte vil blive videresendt til den PC, som udløser denne regel. Du kan højst indtaste 5 portgrupper (eller portafsnit). Hver portgruppe skal adskilles med et komma, f. eks. 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Ekstern protokol",
                content: "Viser den protokol, der benyttes for indgående port: TCP, UDP eller ALLE (alle understøttede protokoller på routeren)."
            }, {
                type: "name",
                title: "Status",
                content: "Angiver den aktuelle status for en portudløsende post. Klik på pæreikonen for at aktivere eller deaktivere posten."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at ændre eller slette den pågældende post."
            }, {
                type: "note",
                title: "<strong>Sådan indstilles en portudløsende post</strong><br><strong>Bemærk: </strong>Hver post kan kun anvendes af en host ad gangen.",
                content: [
                    "Klik på Tilføj.",
                    "Vælg et grænsefladenavn fra rullelisten.",
                    "Klik på Vis eksisterende programmer for at vælge et program fra listen for automatisk at udfylde standardværdierne i felterne. Hvis du vil tilføje et ikke-angivet program, skal du manuelt angive programmet, udløserporten, udløserprotokollen, ekstern port og ekstern protokol.<br><strong>Bemærk: </strong>Portudløsende poster kan ikke have noget overlap i interval med hinanden  (f.eks. Post 1 har portintervallet 4200-4205, hvilket betyder, at Post 2 ikke kan have et portinterval på  4203-4206).",
                    "Vælg Aktiverer dette valg.",
                    "Klik på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Sådan redigeres eller slettes en post for portudløsning</strong><br>I tabellen skal du klikke på ikonet Rediger eller Papirkurv, der svarer til poster, som du vil redigere eller slette."
            }, {
                type: "paragraph",
                content: "<strong>Sådan slettes flere poster for portudløsning</strong><br>I tabellen, skal du vælge de poster du ønsker at slette, og klikke på Slet over tabellen."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "DMZ (Demilitarized Zone) host-funktionen giver mulighed for at en lokal host kan være synlig på internettet for en specialtjeneste, såsom spil over internettet eller videokonferencer. Grundlæggende set tillader DMZ en enkelt computer på dit LAN at åbne sine porte. Denne computer skal konfigureres med en statisk IP-adresse og have sin DHCP-klientfunktion deaktiveret."
            }, {
                type: "note",
                title: "<strong>Sådan tildeles en computer eller server som DMZ-server</strong>",
                content: [
                    "Vælg Aktiver DMZ.",
                    "Indtast IP-adressen for den lokale computer til DMZ-hosten.",
                    "Klik på Save (Gem)."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Som standard, er funktionen UPnP (Universal Plug and Play) aktiveret for at tillade enheder, f. eks. computere og Internetprogrammer automatisk at opdage og kommunikere med hinanden på det lokale netværk."
            }, {
                type: "name",
                title: "UPnP",
                content: "Aktiver for at aktivere funktionen UPnP."
            }, {
                type: "title",
                content: "UPnP-tjenesteliste"
            }, {
                type: "paragraph",
                content: "UPnP-tjenestelisten viser information om UPnP-enheden."
            }, {
                type: "name",
                title: "Samlede klienter",
                content: "Viser det samlede antal UPnP-enheder."
            }, {
                type: "name",
                title: "Servicebeskrivelse",
                content: "Viser en kort beskrivelse af den lokale host der initierer UPnP-anmodningen."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser den eksterne port som åbnes af den lokale host."
            }, {
                type: "name",
                title: "Protokol",
                content: "Viser netværksprotokollen som bruges af den lokale host."
            }, {
                type: "name",
                title: "Intern IP-adresse",
                content: "Viser IP-adressen på den lokale host."
            }, {
                type: "name",
                title: "Intern port",
                content: "Viser den interne port som åbnes af den lokale host."
            }, {
                type: "paragraph",
                content: "Klik på <strong>Opdater</strong> for at opdatere UPnP-tjenestelisten."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Gæstenetværk",
            CONTENT: [{
                type: "paragraph",
                content: "Gæstenetværket giver dig mulighed for at oprette et separat trådløst netværk med et separat netværksnavn (SSID) og adgangskode, som dine gæster kan benytte til at få adgang til internettet."
            }, {
                type: "title",
                content: "Indstillinger"
            }, {
                type: "name",
                title: "Giv gæsterne mulighed for at se hinanden",
                content: "Marker dette afkrydsningsfelt for at tillade at trådløse enheder på gæstenetværket kan kommunikerer med hinanden."
            }, {
                type: "name",
                title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
                content: "Marker dette afkrydsningsfelt for at tillade at trådløse enheder på gæstenetværket kan få adgang til dit lokale netværk."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme alle dine indstillingerne."
            }, {
                type: "title",
                content: "Trådløse indstillinger"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz gæstenetværk",
                content: "Klik på den tilhørende knap for at aktivere gæstenetværk på 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Gæstenetværks SSID",
                content: "Du kan enten bruge standard SSID eller oprette et nyt navn med op til 32 tegn. Dette felt skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Sikkerhed",
                content: "Vælg en sikkerhedsmulighed for gæstenetværket.",
                children: [{
                    type: "name",
                    title: " Ingen",
                    content: "Som standard er gæstenetværkets sikkerhed sat til None (Ingen); alle kan få adgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - personlig",
                    content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Hvis den vælges, skal du konfigurere følgende.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vælg en sikkerhedsversion for dit gæstenetværk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Denne funktion understøtter AES kryptering, der giver en bedre sikkerhed end WPA-PSK og anbefales."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Vælg en krypteringstype: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP vælges, bliver WPS-funktionen deaktiveret."
                    }]
                }]
            }, {
                type: "name",
                title: "Adgangskode",
                content: "Opret en adgangskode på mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "Vejledningen for 2.4GHz gæstenetværket ovenfor gælder også for gæstenetværk for 5GHz."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme alle dine indstillingerne."
            }]
        },
        wirelessStat: {
            TITLE: "Online enheder",
            CONTENT: [{
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen på den tilknyttede trådløse klient."
            }, {
                type: "name",
                title: "Forbindelsestype",
                content: "Viser frekvensbåndet (2.4 GHz eller 5 GHz) som den trådløse klient er forbundet til."
            }, {
                type: "name",
                title: "Sikkerhed",
                content: "Viser sikkerhedstypen (None (Ingen), WEP, WPA/WPA2-Personal, WPA/WPA2-Enterprise), der er forbundet med den trådløse klient."
            }, {
                type: "name",
                title: "Modtagne pakker",
                content: "Viser antallet af pakker modtaget af den tilknyttede trådløse klient."
            }, {
                type: "name",
                title: "Sendte pakker",
                content: "Viser antallet af pakker sendt af den tilknyttede trådløse klient."
            }, {
                type: "name",
                title: "Transmissionshastighed",
                content: "Viser hastigheden af pakker modtaget af den tilknyttede trådløse klient."
            }, {
                type: "paragraph",
                content: "Klik på <strong>Opdater</strong> for at opdatere informationen på denne side."
            }]
        },
        wirelessAdv: {
            TITLE: "Avancerede indstillinger",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Vælg 2.4Ghz eller 5GHz for at indstille deres avancerede trådløse indstillinger."
            }, {
                type: "name",
                title: "Statusinterval",
                content: "Indtast en værdi mellem 25 og 1000 i millisekunder til at bestemme varigheden mellem statuspakker, der udsendes af routeren for at synkronisere det trådløse netværk. Standardværdien er 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-tærskel",
                content: "Indtast en værdi mellem 1 og 2346 for at bestemme pakkestørrelsen for datatransmission gennem routeren. Som standard er RTS (Request to Send) tærskelværdien 2346. Hvis pakkestørrelsen er større end den indstillede grænse, sender routeren anmodninger om at sende til en bestemt modtagestation og aftaler afsendelse af en dataramme, eller pakken sendes straks."
            }, {
                type: "name",
                title: "DTIM-interval",
                content: "Indtast en værdi mellem 1 og 255 for at bestemme intervallet for DTIM (Delivery Traffic Indication Message). 1 angiver at DTIM-intervalet er den samme som statusintervalet."
            }, {
                type: "name",
                title: "Opdateringsinterval for gruppenøgle",
                content: " Indtast antallet af sekunder (minimum 30) for at kontrollere tidsintervallet for krypteringsnøglens automatiske fornyelse. Standardindstillingen er 0, hvilket angiver ingen fornyelse af nøglen."
            }, {
                type: "name",
                title: "WMM",
                content: "Denne funktion garanterer at pakkerne med højprioritetsmeddelelser sendes fortrinsvis. WMM er aktiveret tvangsmæssigt under 802.11n eller 802.11ac-tilstanden. Det anbefales kraftigt at aktivere WMM."
            }, {
                type: "name",
                title: "Kort beskyttelsesinterval",
                content: "Denne funktion er aktiveret som standard og anbefalede til at øge datakapaciteten ved at reducere GI-tiden (Guard Interval eller beskyttelsesinterval)."
            }, {
                type: "name",
                title: "AP-isolation",
                content: " Marker dette afkrydsningsfelt for at aktivere funktionen AP-isolation, der giver dig mulighed for at begrænse og indskrænke alle trådløse enheder på netværket fra at kunne interagere med hinanden, men stadig få adgang til internettet. AP-isolation er som standard deaktiveret."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS Bridging",
                content: "Marker dette afkrydsningsfelt for at aktiverer WDS (Wireless Distribution System) brofunktionen for at lade routeren oprette bro til et andet AP (access point) i et WLAN (wireless local area network). Hvis aktiveret, skal du konfigurere følgende:"
            }, {
                type: "name",
                title: "SSID (som der skal dannes bro til)",
                content: "Indtast SSID for WAP (Wireless Access Point), som routeren opretter forbindelse til som en klient eller brug undersøgelsesfunktionen til at scanne efter og vise alle tilgængelige netværk indenfor rækkevidde."
            }, {
                type: "name",
                title: "MAC-adressen (som der skal dannes bro til)",
                content: "Indtast MAC-adressen på 12 hexadecimale tegn (0-9, a-f, A-F) adskilt af bindestreger i det trådløse adgangspunkt, som routeren opretter forbindelse til som klient. Hvis du vælger et netværk gennem undersøgelsesfunktionen, bliver MAC-adressefeltet automatisk udfyldt."
            }, {
                type: "name",
                title: "Oversigt",
                content: "Klik på denne knap for at scanne og vise MAC-adressen, SSID, signalstyrke, kanal og sikkerhedsinformation på alle tilgængelige trådløse netværk inden for rækkevidde. Når du har valgt et netværk, vil SSID, MAC-adresse og sikkerhed automatisk blive udfylde.",
                children: [{
                    type: "name",
                    title: "AP-liste",
                    content: "Viser oplysningerne for det AP, som din router kan oprette forbindelse til."
                }, {
                    type: "name",
                    title: "MAC-adresse",
                    content: "Viser MAC-adressen for AP’en, som din router skal oprette forbindelse til som en klient."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Viser SSID’en for AP’en, som din router skal oprette forbindelse til som en klient."
                }, {
                    type: "name",
                    title: "Signalstyrke",
                    content: "Viser signalstyrken for AP’en, som din router skal oprette forbindelse til som en klient."
                }, {
                    type: "name",
                    title: "Kanal",
                    content: "Viser kanalen for AP’en, som din router skal oprette forbindelse til som en klient."
                }, {
                    type: "name",
                    title: "Kryptering",
                    content: "Viser krypteringstype for AP’en, som din router skal oprette forbindelse til som en klient."
                }, {
                    type: "name",
                    title: "Opret forbindelse",
                    content: "Klik på ikonet for at tilslutte eller frakoble fra den tilhørende AP."
                }]
            }, {
                type: "name",
                title: "Sikkerhed",
                content: "Vælg én af følgende sikkerhedsfunktioner:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit trådløse netværk mod uautoriseret adgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Denne indstilling anbefales. Hvis den vælges, skal du konfigurere følgende.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Denne funktion understøtter AES kryptering, der giver et mindre niveau af sikkerhed end WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Denne funktion understøtter AES kryptering, der giver en bedre sikkerhed end WPA-PSK og anbefales."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Vælg en krypteringstype: TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP vælges, bliver WPS-funktionen deaktiveret."
                    }, {
                        type: "name",
                        title: "Adgangskode",
                        content: "Angiv en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Vælg denne indstilling for at aktivere en grundlæggende godkendelsesmetode, hvis nogen version af dine klientenheder kun kan få adgang til trådløs brug af WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Vælg en godkendelsesversion for dit trådløse netværk. Vælg Åbent system eller Delt nøgle baseret på funktionaliteten og anmodning om adgang fra den trådløse klient."
                    }, {
                        type: "name",
                        title: "Format af WEP-nøgle",
                        content: "Vælg enten ASCII-format eller Hexadecimal. ASCII-format er en kombination af bogstaver og tal. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Nøgleindeks",
                        content: "Vælg hvilken af de fire nøgler der vil blive brugt og indtast den matchende WEP-nøgle, som du opretter i feltet for nøgleværdien. Sørg for at disse værdier er identiske på alle trådløse stationer i netværket."
                    }, {
                        type: "name",
                        title: "Nøgleværdi",
                        content: "Indtast den matchede WEP-nøgle, som du oprettede."
                    }]
                }]
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme indstillingerne."
            }]
        },
        wirelessSchedule: {
            TITLE: "Trådløs plan",
            CONTENT: [{
                type: "paragraph",
                content: "Den faktiske tidsplan er baseret på routerens tid. Tiden kan indstilles i Systemværktøjer -> Tidsindstillinger."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Vælg 2.4Ghz eller 5GHz for at indstille dets trådløse plan."
            }, {
                type: "name",
                title: "Trådløs plan",
                content: "Aktiver for at aktivere denne funktion. Klik og træk derefter på tværs af cellerne for at indstille tidsperioden for at slukke for den trådløse forbindelse."
            }, {
                type: "name",
                title: "Gendan",
                content: "Klik for valg af tid."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme indstillingerne."
            }]
        },
        macFilter: {
            TITLE: "Indstillinger for MAC-filter",
            CONTENT: [{
                type: "name",
                title: "MAC-filtrering",
                content: "Aktiver for at styre trådløs adgang ved hjælp af MAC-adressen på de enkelte enheder."
            }, {
                type: "title",
                title: "Filtreringsregler"
            }, {
                type: "name",
                title: "Blokere trådløs adgang fra enhederne i listen nedenfor.",
                content: "Vælg for at blokere trådløs adgang fra enhederne på listen nedenfor."
            }, {
                type: "name",
                title: "Tillad kun trådløs adgang fra enhederne på listen nedenfor.",
                content: "Vælg for kun at tillade trådløs adgang fra enhederne på listen nedenfor."
            }, {
                type: "title",
                title: "Enhedsliste"
            }, {
                type: "name",
                title: "MAC-adresse/beskrivelse",
                content: "Viser enhedens MAC-adresse og beskrivelse."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Klik på pæreikonen for at aktivere eller deaktivere MAC-filtrering af enheden."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at ændre eller slette den pågældende post."
            }, {
                type: "note",
                title: "Sådan tilføjes en ny enhed",
                content: [
                    "Klik på Tilføj.",
                    "Indtast MAC-adressen på enheden.",
                    "Indtast en beskrivelse af enheden.",
                    "Klik på Aktiverer denne post.",
                    "Klik på OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Trådløse indstillinger",
            CONTENT: [{
                type: "name",
                title: "Smart Connect",
                content: "Marker dette afkrydsningsfelt for at aktivere Smart Connect. Denne funktion hjælper enheder med at køre hurtigere ved at tildele dem til det bedste trådløse bånd, baseret på faktiske forhold, for at balancere netværkskrav."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Vælg 2.4GHz | 5GHz for at ændre de tilsvarende indstillinger."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 2.4GHz | 5GHz radiofrekvens."
            }, {
                type: "name",
                title: "SSID (Navn på trådløst netværk)",
                content: "Du kan lade standard netværksnavnet (SSID) være som det er, eller oprette et nyt navn (op til 32 tegn). Dette felt skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Marker dette afkrydsningsfelt, hvis du vil skjule 2.4GHz | 5GHz netværksnavnet (SSID) fra listen over trådløse netværk."
            }, {
                type: "name",
                title: "Sikkerhed",
                content: "Vælg én af følgende sikkerhedsfunktioner:",
                children: [{
                    type: "name",
                    title: "Ingen sikkerhed",
                    content: "Vælg denne indstilling for at deaktivere den trådløse sikkerhed. Det anbefales at du aktiverer den trådløse sikkerhed for at beskytte dit trådløse netværk mod uautoriseret adgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Vælg denne indstilling for at aktivere standard godkendelsesmetoder baseret på en Forhåndsdelt nøgle (PSK), også kaldet adgangsudtryk. Denne indstilling anbefales. Hvis den vælges, skal du konfigurere følgende.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Denne funktion understøtter AES kryptering, der giver en bedre sikkerhed end WPA-PSK og anbefales."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Vælg en krypteringstype: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP vælges, bliver WPS-funktionen deaktiveret."
                    }, {
                        type: "name",
                        title: "Adgangskode",
                        content: "Opret en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn i dette felt."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Vælg denne indstilling for at aktivere mere avancerede godkendelsesmetode, der bruger en RADIUS (Remote Authentication Dial In User Service) server. Hvis den vælges, bliver WPS-funktionen deaktiveret.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Vælg en sikkerhedsversion for dit trådløse netværk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Denne funktion understøtter flere versioner af WPA ( Wi-Fi Protected Access) standarden, såsom WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Denne funktion understøtter AES kryptering, der giver en bedre sikkerhed end WPA og anbefales."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Vælg en krypteringstype: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det anbefales IKKE at bruge TKIP-kryptering hvis routeren arbejder i 802.11n-tilstand, fordi TKIP ikke understøttes af 802.11n specifikationen. Hvis TKIP vælges, bliver WPS-funktionen deaktiveret."
                    }, {
                        type: "name",
                        title: "RADIUS Server-IP",
                        content: "Indtast IP-adressen på RADIUS-serveren."
                    }, {
                        type: "name",
                        title: "RADIUS Serverport",
                        content: "Indtast portnummeret på RADIUS-serveren."
                    }, {
                        type: "name",
                        title: "RADIUS Server adgangskode",
                        content: " Indtast den delte adgangskode på RADIUS-serveren."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Vælg denne indstilling for at aktivere en grundlæggende godkendelsesmetode, hvis nogen version af dine klientenheder kun kan få adgang til trådløs brug af WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Vælg en godkendelsesversion for dit trådløse netværk. Standardindstillingen er Auto, som automatisk vælger Åbent system eller Delt nøgle baseret på funktionaliteten og anmodning om adgang fra den trådløse klient."
                    }, {
                        type: "name",
                        title: "Nøgle valgt",
                        content: "Vælg hvilken af de fire nøgler der vil blive brugt og opret en WEP-nøgle, i feltet for nøgleværdien. Trådløse klienter skal angive den matchende WEP-nøgle for at oprette forbindelse til dit netværk."
                    }, {
                        type: "name",
                        title: "Format af WEP-nøgle",
                        content: "Brug enten ASCII-format eller vælg Hexadecimal. ASCII-format er en kombination af bogstaver og tal. Hexadecimalt format er en kombination af tal (0-9) og bogstaver (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Nøgletype",
                        content: "Vælg længden for WEP-nøglen.",
                        children: [{
                            type: "name",
                            title: "64-bit-kryptering",
                            content: "Her kan du indtaste 10 hexadecimale tegn (0-9, A-F, a-f) eller 5 ASCII-tegn i feltet for WEP-værdien."
                        }, {
                            type: "name",
                            title: "128-bit-kryptering",
                            content: "Her kan du indtaste 26 hexadecimale tegn (0-9, A-F, a-f) eller 13 ASCII-tegn i feltet for WEP-værdien."
                        }]
                    }, {
                        type: "name",
                        title: "Nøgleværdi",
                        content: "Opret en WEP-nøgle."
                    }]
                }]
            }, {
                type: "name",
                title: "Tilstand",
                content: "Vælg en blandet transmissionstilstand."
            }, {
                type: "name",
                title: "Kanal",
                content: "Vælg en driftkanal for det trådløse netværk. Standardkanalen er Auto. Lav ikke om på det  med mindre du oplever problemer med periodisk trådløs tilslutning."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Vælg en kanalbredde (båndbredde) for det trådløse netværk."
            }, {
                type: "name",
                title: "Transmissionsstyrke",
                content: "Vælg enten Høj, Mellem eller Lav for at angive transmissionsstyrke for data. Standard og anbefalet indstilling er Høj."
            }, {
                type: "paragraph",
                content: "Klik på <strong>Gem</strong> for at gemme alle dine indstillingerne."
            }]
        },
        wps: {
            TITLE: "Router PIN-kode",
            CONTENT: [{
                type: "name",
                title: "Router PIN-kode",
                content: "Aktiver for at tillade trådløse enheder at oprette forbindelse til routeren ved hjælp af routerens PIN-kode (Personal Identification Number)."
            }, {
                type: "name",
                title: "Aktuel pinkode",
                content: "Viser routerens aktuelle PIN-kode. PIN-kodens standardværdi kan findes på mærkaten på routeren eller i brugervejledningen. Klik på Opret for at oprette en ny PIN-kode tilfældigt eller klik på Gendan for at gendanne den aktuelle PIN-kode til den originale PIN-kode."
            }, {
                type: "title",
                content: "WPS-indstillinger"
            }, {
                type: "name",
                title: "Trykknap (anbefales)",
                content: "Vælg denne indstillingsmetode til at aktivere WPS-funktionen for nemt at tilslutte WPS-aktiverede enheder til dit trådløse netværk ved hjælp af WPS-knappen eller virtuelt ved hjælp af knappen Opret forbindelse."
            }, {
                type: "name",
                title: "PIN-kode",
                content: "Vælg denne indstillingsmetode til manuelt at tilføje en enhed ved at angive den trådløse enheds WPS-PIN-kode i feltet."
            }, {
                type: "name",
                title: "Opret forbindelse",
                content: "Klik på denne knap for at starte WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Forældrekontrol",
            CONTENT: [{
                type: "paragraph",
                content: "Med Forældrekontrol kan du blokere upassende, eksplicit og ondsindede websteder; begrænse adgang til bestemte tidspunkter af døgnet (f.eks. Facebook eller YouTube mens der skal laves hjemmearbejde)."
            }, {
                type: "name",
                title: "Status",
                content: "Aktiver for at aktivere funktionen Forældrekontrol. Som standard er denne funktion deaktiveret."
            }, {
                type: "title",
                content: "Enheder med Forældrekontrol"
            }, {
                type: "paragraph",
                content: "Enheder under Forældrekontrol viser listen over enheder, som i øjeblikket er begrænset af Forældrekontrol."
            }, {
                type: "name",
                title: "Enhedsnavn",
                content: "Viser navnet på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: " Viser MAC-adressen på alle tilsluttede klientenheder, der for øjeblikket er under Forældrekontrol."
            }, {
                type: "name",
                title: "Faktisk tid",
                content: "Viser tidsperioderne med begrænset adgang."
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser en kort beskrivelse af de tilsluttede enheder. "
            }, {
                type: "name",
                title: "Status",
                content: "Angiver hvorvidt Forældrekontrol er aktiveret for den pågældende enhed. Klik på pæreikonen for at aktivere (eller deaktivere) den."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at ændre eller slette den pågældende enhed."
            }, {
                type: "note",
                title: "<strong>Sådan begrænses en ny klientenhed</strong>",
                content: [
                    "Klik på Tilføj.",
                    "Klik på Vis eksisterende enheder for at vælge en aktuelt tilsluttet enhed fra listen over enheder med adgang, eller indtast navnet på enheden og MAC-adressen manuelt for at tilføje en enhed, som ikke er forbundet.",
                    "Klik på ikonet for faktiske tidspunkter for internet adgang for at angive en tidsperiode, hvor begrænsningen gælder.",
                    "Indtast en kort beskrivelse i feltet Beskrivelse. Dette felt er valgfrit.",
                    "Vælg Aktiver.",
                    "Klik på OK for at gemme indtastningen."
                ]
            }, {
                type: "paragraph",
                content: "<b>Sådan redigeres eller slettes en enhed</b><br>På listen over enheder med forældrekontrol skal du klikke på ikonet Rediger eller Papirkurv, der svarer til enheden, som du vil redigere eller slette."
            }, {
                type: "paragraph",
                content: "<b>For at slette flere enheder</b><br>På listen over enheder med forældrekontrol, skal du vælg det tilsvarende afkrydsningsfelt for de enheder der skal slettes og klikke på Slet over tabellen."
            }, {
                type: "title",
                title: "Indholdsbegrænsning"
            }, {
                type: "paragraph",
                content: "Indholdsbegrænsning giver dig mulighed for at begrænse adgang til indhold ved hjælp af emneord og domænenavne, som klientenheder der styres af forældrekontrol kan eller ikke kan få adgang til afhængigt af begrænsningstypen."
            }, {
                type: "name",
                title: "Begrænsningstype",
                content: "Vælg følgende begrænsningstype:",
                children: [{
                    type: "name",
                    title: "Sortliste",
                    content: "Indeholder emneord og domænenavne, der bruges til at blokere adgang til hjemmesider fra klientenheder, der er angivet i listen over enheder med Forældrekontrol."
                }, {
                    type: "name",
                    title: "Hvidliste",
                    content: "Indeholder emneord og domænenavne som klientenheder, der er angivet i listen over Forældrekontrol, har adgang til."
                }]
            }, {
                type: "name",
                title: "Tilføj et nyt emneord",
                content: "Klik på for at tilføje et nyt emneord eller domænenavn der skal sortlistes eller hvidlistes. "
            }, {
                type: "paragraph",
                content: "For at slette et emneord eller domænenavn, skal du klikke på - (minus) ikonet ved siden af det element, du ønsker at slette."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik på for at gemme din konfiguration."
            }]
        },
        parentCtrl: {
            TITLE: "Forældrekontrol",
            CONTENT: [{
                type: "paragraph",
                content: "Med filtre for aldersniveau, adgangsbegrænsning og brugerprofiler, giver forældrekontrol din familie passede og relevant internetadgang."
            }, {
                type: "note",
                title: "<strong>For at anvende forældrekontrol på en ny enhed</strong>",
                content: [
                    "Klik på Tilføj.",
                    "Indtast et navn for denne profil og klik på \"+\" for til tilføj enhed(er) under denne profil.",
                    "Vælg et filter og tilpas filterindholdet alt efter dine behov. Du kan indtaste nøgleord for at søge efter websteder, du ønsker at filtrere i vores database. Andre hjemmesiders (URL'er) kan indtastes manuelt.<br/>Se følgende forklaringer på de forskellige filterkategorier:<p>Voksent indhold - Websteder, der indeholder seksuelt, skadeligt eller ulovligt indhold, herunder pornografi, stofbrug, vold og diskriminering</p><p>Hasard - Websteder der fremmer eller give oplysninger om hasard, herunder online websteder med hasard</p><p>Seksualundervisning - Websteder der giver oplysninger om seksualitet, herunder reproduktion, seksualitet, sikker sex og prævention, seksuelt overførte sygdomme og seksuelle traumer</p><p> Online kommunikation - Websteder der er vært for kommunikation med andre via tekst, tale eller video, herunder e-mail, blogs, onlinefora, VoIP og videochat-tjenester</p><p>Social Networking - Websteder der distribuere personlige udtryk eller kommunikation, der forbinder mennesker og deres personlige aktivitet baseret på lignende interesser, karrierer, baggrunde eller virkelige bekendtskab</p><p>Betalt surfing - Websteder der kompensere brugere at få vist bestemte websteder, e-mails eller reklamer, klikke på links eller besvare spørgeskemaer</p><p>Media - Websteder der tilbyder gratis, eller betalt abonnement på lyd- og/eller videoindhold, herunder streamingstjenester, TV-programmer eller musik-downloads</p><p>Downloads - Websteder med eller der give adgang til fildeling og distribution, herunder peer-to-peer-deling, online fillagring og indhold til mobile enheder (f.eks. musik og apps)</p><p>Spil - Websteder med eller der giver adgang til web-hostede spil eller spild er kan downloades</p>",
                    "Hvis du vil begrænse den samlede tid denne profil kan bruge online, skal du aktivere og specificere tidsfrister. Du kan også bruge Sengetid at opstille et dagligt tidsrum, hvori enhederne under denne profil kan bruge internettet.",
                    "Klik på Gem."
                ]
            }, {
                type: "note",
                title: "<strong>Sådan ser du en profilens detaljerede internethistorik</strong>",
                content: [
                    "På kolonnen Insights (Indblink) skal du klikke på den tilsvarende Insights-knap.",
                    "Hvis du vil se flere poster, skal du klikke på knappen Historie <span class=\"ptl-ctr-help-icon history\"></span>.",
                    "Du kan blokere eller fjerne blokering af hjemmesider ved at klikke på knappen <span class=\"ptl-ctr-help-icon block\"></span> eller <span class=\"ptl-ctr-help-icon unblock\"></span>."
                ]
            }, {
                type: "note",
                title: "<strong>Sådan deaktiveres eller aktiveres internettet øjeblikkeligt</strong>",
                content: [
                    "I kolonnen Internetadgang, skal du klikke på <span class=\"ptl-ctr-help-icon stop\"></span> for at standse den tilsvarende profilens enheder fra at få adgang til internettet og klik på <span class=\"ptl-ctr-help-icon enable\"></span> for at aktivere adgang igen."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "QoS (Quality of Service) funktionen prioriterer online aktiviteter og enheder for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det."
            }, {
                type: "paragraph",
                content: "Vælg Programprioritering for at prioritere netværkshastighed for onlineaktiviteter, og vælg Enhedsprioritering til at prioritere netværkshastigheden for enheder."
            }, {
                type: "title",
                content: "Programprioritering"
            }, {
                type: "paragraph",
                content: "Vælg den online aktivitet du ønsker at prioritere eller klik på Brugerdefineret for at angive prioritetsniveauet for hver online aktivitet."
            }, {
                type: "title",
                content: "Enhedsprioritering"
            }, {
                type: "paragraph",
                content: "Vælg den/de enhed(er), du ønsker at prioritere, og hvor længe de skal prioriteres."
            }, {
                type: "note",
                title: "<strong>Sådan prioriteres en enhed</strong>",
                content: [
                    "Find den enhed du ønsker at prioritere i listen og aktiver prioritet.",
                    "Vælg, hvor længe enheden vil blive prioriteret i kolonnen Tidsindstilling."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Antivirus",
            CONTENT: [{
                type: "paragraph",
                content: "Antivirus sørger for sikkerheden af dine personlige oplysninger med hyppige scanninger af netværket, registrering af ondsindede hjemmesider og isolation af inficerede enheder. Du kan også tjekke, hvordan dit netværk er beskyttet, og hvis der har været angreb på dit netværk."
            }, {
                type: "paragraph",
                content: "Historik - Optager de enheder, der er beskyttet af Antivirus og kilden og klassificering af angrebene."
            }, {
                type: "paragraph",
                content: "Aktiverer alle - Tryk for at aktivere alle typer beskyttelse, hvis en eller flere ikke er aktiveret."
            }, {
                type: "paragraph",
                content: "Beskyttelsestyper - Aktiverer beskyttelsestyperne ved at henvise til forklaringerne. Det anbefales at aktivere alle beskyttelsestyperne."
            }]
        },
        applicationPriority: {
            TITLE: "Programprioritering",
            CONTENT: [{
                type: "paragraph",
                content: "Funktionen Programprioritering prioriterer online aktiviteter for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det. Vælg den online aktivitet du ønsker at prioritere eller klik på Brugerdefineret for at angive prioritetsniveauet for hver online aktivitet."
            }]
        },
        devicePriority: {
            TITLE: "Enhedsprioritering",
            CONTENT: [{
                type: "paragraph",
                content: "Funktionen Enhedsprioritering prioriterer enheder for at sikre en hurtigere netværksforbindelse, når der er allermest brug for det. Vælg den/de enhed(er), du ønsker at prioritere, og hvor længe de skal prioriteres."
            }, {
                type: "note",
                title: "<strong>Sådan prioriteres en enhed</strong>",
                content: [
                    "Find den enhed du ønsker at prioritere i listen og aktiver prioritet.",
                    "Vælg, hvor længe enheden vil blive prioriteret i kolonnen Tidsindstilling."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Gæstenetværk",
            CONTENT: [{
                type: "paragraph",
                content: "Gæstenetværket giver dig mulighed for at oprette et separat trådløst netværk med et separat netværksnavn (SSID) og adgangskode, som dine gæster kan benytte til at få adgang til internettet."
            }, {
                type: "name",
                title: "Giv gæsterne mulighed for at se hinanden",
                content: "Marker dette afkrydsningsfelt for at tillade at trådløse enheder på gæstenetværket kan kommunikerer med hinanden."
            }, {
                type: "name",
                title: "Giv gæsterne mulighed for at få adgang til mit lokale netværk",
                content: "Marker dette afkrydsningsfelt for at tillade at trådløse enheder på gæstenetværket kan få adgang til dit lokale netværk."
            }, {
                type: "name",
                title: "Trådløst netværk 2.4GHz | 5GHz",
                content: "Vælg den tilhørende knap for at aktivere gæstenetværket på 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Gæstenetværks SSID",
                content: "Du kan enten bruge standard SSID eller oprette et nyt navn med op til 32 tegn. Dette felt skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Marker dette afkrydsningsfelt, hvis du vil skjule gæstenetværkets SSID."
            }, {
                type: "name",
                title: "Sikkerhed",
                content: "Vælg en sikkerhedsmulighed for gæstenetværket:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Som standard er gæstenetværkets sikkerhed sat til None (Ingen); alle kan få adgang."
                }, {
                    type: "name",
                    title: "Indstil adgangskode",
                    content: "Oprette en adgangskode for gæstenetværket på mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn (0-9, a-f, A-F) i feltet for adgangskoden."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "Internetstatus",
                content: "Viser den aktuelle status af routerens internetforbindelse."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "Forbindelsestype",
                content: "Viser typen af din internetforbindelse. "
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "IP-adresse",
                content: "Viser den aktuelle Internet-IP-adresse, der er tildelt routeren."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "DNS-server",
                content: " Viser IP-adresse på de primære og sekundære DNS-servere."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "Gateway",
                content: "Viser gatewayens IP-adresse."
            }, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "MAC-adresse",
					"content": "Viser routerens unikke fysiske adresse."
				}, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "IP-adresse",
					"content": "Viser routerens IP-adresse, som kan bruges til at logge ind på routerens webadministrationsside."
				}, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "Undernetmaske",
					"content": "Viser routerens undernetmaske."
				}, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "Adressetype",
					"content": "Viser konfigurationstypen af routerens IP-adresse."
				}, {
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
		type: 'title',
                title: 'Test af hastighed'
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
                content: "2.4GHz | 5GHz trådløs"
            }, {
                type: "name",
                title: "SSID",
                content: "Viser det aktuelle trådløse netværksnavn på 2.4GHz | 5GHz frekvensen."
            }, {
                type: "name",
                title: "Kanal",
                content: "Viser den kanal som det trådløse 2.4GHz | 5GHz netværk udsender."
            }, {
                type: "name",
                title: "MAC",
                content: "Viser den aktuelle MAC-adressen for det trådløse 2.4GHz | 5GHz."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "2.4GHz | 5GHz gæstenetværk"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Status",
                content: "Viser hvorvidt 2.4GHz | 5GHz gæstenetværk er tændt (aktiveret) eller slukket (deaktiveret)."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Viser det trådløse netværksnavn på gæstenetværket."
            }, {
                type: "title",
                title: "Trådløse/traditionelle klienter"
            }, {
                type: "name",
                title: "Navn",
                content: " Viser navnet på klienten, der er tilsluttet til routeren. "
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser den tildelte IP-adresse for klienten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser klientens MAC-adresse."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Telefon"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Navn på telefon",
                content: "Viser navnet på din telefon."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Indgående opkaldsnumre",
                content: "Viser de numre der bruges af dine telefonienheder til at modtage indgående opkald via din router. "
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Internt nummer",
                content: "Viser telefonnumre som benyttes til at foretage opkald mellem telefonienheder, der er tilsluttet til den samme router. Det er forudindstillet og kan ikke ændres."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Antallet af udgående opkald",
                content: "Viser de numre der bruges af dine telefonienheder til at foretage udgående opkald via din router. Standardværdien er Auto, hvilket betyder at routeren vil vælge et tilgængeligt nummer som det  udgående nummer, hvilket kan ændres på VoIP-siden."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Printer"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Navn",
                content: "Viser navnet på printeren, der er tilsluttet til routeren via USB-port. "
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "USB-disk"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Mærke",
                content: "Viser mærket på USB-drevet der er tilsluttet routeren."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Samlet",
                content: "Viser den samlede størrelse af USB-drevet."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Tilgængelig",
                content: "Viser den tilgængelige plads på USB-drevet."
            }]
        },
		sysMode: {
            TITLE: "Driftstilstand",
            CONTENT: [{
                type: "name",
                title: "Router",
                content: "I denne tilstand kan din router opretter direkte forbindelse til internettet via dynamisk IP, Statisk IP, PPPoE, L2TP eller PPTP og deler internetadgang til flere kablede eller trådløse enheder. NAT, firewall og DHCP server er aktiveret som standard."
            }, {
                type: "name",
                title: "Adgangspunkt",
                content: "I denne tilstand opretter din router forbindelse til en kablet eller trådløs router via et Ethernetkabel og øger den trådløse dækning i dit eksisterende netværk. Funktioner som NAT, forældrekontrol og QoS understøttes ikke i denne tilstand. Routerens IP-adresse er tildelt af rodrouterens DHCP-server. Hvis du ikke kender IP-adressen på routeren, kan du bruge http://tplinkwifi.net til at logger ind på webadministartionssiden."
            }]
        },
        wirelessBasic: {
            TITLE: "Trådløse indstillinger",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz trådløst netværk",
                content: "Marker dette afkrydsningsfelt for at aktivere den trådløse 2.4GHz | 5GHz radiofrekvens."
            }, {
                type: "name",
                title: "SSID (Navn på trådløst netværk)",
                content: "Du kan lade standard netværksnavnet (SSID) være som det er, eller oprette et nyt navn (op til 32 tegn). Dette felt skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Adgangskode",
                content: "Opret en trådløs adgangskode mellem 8 og 63 ASCII-tegn eller mellem 8 og 64 hexadecimale tegn. Dette felt skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Marker dette afkrydsningsfelt, hvis du vil skjule 2.4GHz | 5GHz SSIDet fra listen over trådløse netværk."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Viser relevante oplysninger om internetforbindelsen."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Den unikke fysiske adresse, som er tildelt til internet(WAN)-porten på routeren."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Den IP-adresse, som er tildelt til internet(WAN)-porten på routeren. Hvis IP-adressen er vist som 0.0.0.0, betyder dette at der ikke er  adgang til internettet."
            }, {
                type: "name",
                title: "Undernetmaske",
                content: "Denne parameter bestemmer netværksdelen og host-delen af en IP-adresse. "
            }, {
                type: "name",
                title: "Standard gateway",
                content: " Den IP-adresse som bruges til at tilslutte routeren til netværket."
            }, {
                type: "name",
                title: "Primær DNS/sekundær DNS",
                content: "DNS (Domain Name System) konverterer host-navne og internetdomæner til IP-adresser. Oplysningerne om disse DNS-servere tildeles af en internetudbyder (ISP)."
            }, {
                type: "name",
                title: "Forbindelsestype",
                content: "Den aktuelle forbindelsestype af dit internet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Den unikke fysiske adresse, som er tildelt til internet(WAN)-porten på routeren."
            }, {
                type: "name",
                title: "IP-adresse",
                content: " Den IPv6-adresse, som er tildelt til internet(WAN)-porten på routeren."
            }, {
                type: "name",
                title: "Standard gateway",
                content: " Den IP-adresse som bruges til at tilslutte routeren til netværket."
            }, {
                type: "name",
                title: "Primær DNS/sekundær DNS",
                content: "DNS (Domain Name System) konverterer host-navne og internetdomæner til IP-adresser. Oplysningerne om disse DNS-servere tildeles af en internetudbyder (ISP)."
            }, {
                type: "name",
                title: "Forbindelsestype",
                content: "Den aktuelle forbindelsestype af dit internet."
            }, {
                type: "title",
                title: "Trådløs"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Vælg for at få vist de 2.4Ghz | 5GHz trådløse indstillinger og oplysninger."
            }, {
                type: "name",
                title: "Netværksnavn",
                content: "Navnet på det trådløse netværk, også kaldet SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Den aktuelle status (tændt eller slukket) for det trådløse netværk."
            }, {
                type: "name",
                title: "Tilstand",
                content: "Den aktuelle trådløse tilstand."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Båndbredden af kanalen af på det trådløse netværk."
            }, {
                type: "name",
                title: "Kanal",
                content: "Den aktuelle trådløse kanal og den tilsvarende frekvens (i GHz)."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "MAC-adressen for den trådløse netværksradio."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Viser oplysninger om Ethernet(LAN)-porte."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Den IPv4-adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
            }, {
                type: "name",
                title: "Undernetmaske",
                content: "Denne parameter bestemmer netværksdelen og host-delen af en IP-adresse."
            }, {
                type: "name",
                title: "DHCP",
                content: "Viser om routerens indbygget DHCP-server er aktiv for enheder på LAN-porte eller ej."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: " Den unikke fysiske adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Den IPv6-adresse, som er tildelt til Ethernet(LAN)-porten på routeren."
            }, {
                type: "name",
                title: "Længde af præfiks",
                content: "Længden af IPv6-adressens præfiks."
            }, {
                type: "name",
                title: "Tildelt type",
                content: "IPv6-adressetypen, der er tildelt LAN-grænsefladen."
            }, {
                type: "title",
                title: "Gæstenetværk"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Vælg for at få vist de 2.4Ghz | 5Ghz  gæstenetværkets indstillinger og oplysninger."
            }, {
                type: "name",
                title: "Gæstenetværks SSID",
                content: " Navnet på det trådløse netværk (SSID) på dit gæstenetværk."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Viser om gæstenetværkets trådløse netværksnavn (SSID) er skjult (tændt) eller ej (slukket)."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Viser den aktuelle status (tændt eller slukket) af gæstenetværket."
            }, {
                type: "name",
                title: "Se hinanden",
                content: "Viser om alle enheder på gæstenetværket må kommunikere med hinanden eller ej."
            }]
        },
        time: {
            TITLE: "indstilling af tid",
            CONTENT: [{
                type: "name",
                title: "Tidszone",
                content: "Vælg din lokale tidszone fra rullelisten."
            }, {
                type: "name",
                title: "Dato",
                content: "Indtast din lokale dato som MM/DD/ÅÅ i feltet."
            }, {
                type: "name",
                title: "Tid",
                content: "Vælg din lokale tidszone fra rullelisten (i 24-timers format)"
            }, {
                type: "name",
                title: ".NTP Server I/NTP Server II",
                content: "Indtast IP-adressen på NTP-server I eller NTP-server II, og routeren vil automatisk få tiden fra NTP-serveren. Derudover har routeren nogle fælles indbyggede NTP-servere, der automatisk vil synkronisere, når der oprettes forbindelse til internettet."
            }, {
                type: "name",
                title: "Hent fra PC",
                content: "Klik for at synkronisere med computerens systemtid."
            }, {
                type: "name",
                title: "Hent GMT",
                content: "Klik for at synkronisere med GMT (Greenwich Mean Time) tidszonen fra internettet."
            }, {
                type: "name",
                title: "Gem",
                content: "Klik for at gemme indstillingerne."
            }, {
                type: "title",
                content: "Sommertid"
            }, {
                type: "note",
                title: "Opsætning af sommertid",
                content: [
                    "Vælg <b>Aktiver sommertid</b>.",
                    "Vælg den korrekte <b>Startdato og klokkeslæt</b> hvor sommertid begynder i din lokale tidszone.",
                    "Vælg den korrekte <b>Slutdato og klokkeslæt</b> hvor sommertid ender i din lokale tidszone.",
                    "Klik på <b>Gem</b>."
                ]
            }]
        },
        softup: {
            TITLE: "Opgradering af firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "En opgradering af firmwaren opdaterer routerens operativsystem med de sidste nye funktioner og forskellige rettelser for at forbedre ydeevnen. Når en ny opgradering af firmwaren er tilgængelig, vil du blive underrettet med en opdateringsikon i øverste højre hjørne. Klik på ikonet for at åbne siden firmwareopgradering."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>VIGTIGT: Følg instruktionerne for at undgå opgraderingsfejl.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Før opgraderingen:",
                content: [
                    "Tilslut din computer til routeren med et Ethernet-kabel. Det anbefales IKKE at opgradere firmwaren trådløst. ",
                    "Fjern alle tilsluttede USB-lagringsenheder fra routeren.",
                    "Lav en backup af routerens konfigurationsindstillinger."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Under opgraderingen:<br>Sørg for at routeren forbliver tændt tryk ikke på nogen knapper."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Sådan opgraderes firmwaren online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Klik på Opgrader og bekræft, når du bliver bedt om det. Routeren vil automatisk downloade og opgradere til den seneste firmware, og derefter genstarte.<br><b>Bemærk</b>: Du skal muligvis klikke på Tjek for opgraderingen først for at kontrollere, om en firmwareopdatering er tilgængelig. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Sådan opgraderes firmwaren manuelt"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Besøg www.tp-link.com og hent den nyeste firmware fra vores supportside til din computer. Kontroller at den firmwarefil, du downloader, passer med routerens hardwareversion, som vist på siden.",
                    "Klik på <b>Gennemse</b> og vælg den downloadede firmwarefil.",
                    "Klik på <b>Opgrader</b>. Opgraderingsprocessen tager et par minutter at færdiggøre. Routeren vil automatisk genstarte når firmwareopgraderingen er afsluttet."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Før du udfører firmware-opgradering af routeren, skal du downloade den seneste firmwareopdatering fra <a href='http://www.tp-link.com/en/download-center.html'>TP-Link Download Center page</a>  hjemmesiden til din computer."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>VIGTIGT:</B>For at forhindre opgraderingsfejl, bedes du bemærke følgende:",
                content: [
                    "Sørg for at den nyeste firmware-file er afstemt med hardware-versionen (som vist på siden for <b>opgradering af firmwaren</b>). ",
                    "Sørg for at du har en stabil forbindelse mellem routeren og computeren. Det anbefales <b>IKKE</b> at opgradere firmwaren trådløst.",
                    "Sørg for at du har fjernet alle USB-lagringsenhed, der er tilsluttet routeren, før opgraderingen af firmwaren for at undgå tab af data.",
                    "Tag sikkerhedskopier af routerens konfiguration.",
                    "Sluk ikke for routeren under firmwareopgraderingen."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Sådan opgraderes routerens firmware",
                content: [
                    "Klik på <b>Gennemse</b>.",
                    "Find og marker den downloadede firmware-fil.",
                    "Klik på <b>Opgrader</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Backup",
            CONTENT: [{
                type: "paragraph",
                content: "Det anbefales, at du sikkerhedskopierer dine aktuelle konfigurationer, for det tilfælde at det er nødvendig for at gendanne systemet til en tidligere tilstand eller fra fabriksindstillingerne."
            }, {
                type: "paragraph",
                content: "Klik på <b>Backup</b> (Sikkerhedskopiering) for at gemme dine aktuelle konfigurationer til din computer. Sørg for at gemme en backup-fil på et sikkert sted, hvor du kan hente og gendanne routeren senere, hvis det er nødvendigt."
            }, {
                type: "title",
                content: "Gendan"
            }, {
                type: "note",
                title: "Sådan gendannes fra backup",
                content: [
                    "Klik på <b>Gennemse</b>.",
                    "Find og vælg backup-filen.",
                    "Klik på <b>Gendan</b>."
                ]
            }, {
                type: "title",
                content: "Gendannelse af fabriksindstillingerne"
            }, {
                type: "paragraph",
                content: "Klik på <b>Fabriksnulstilling</b> for at nulstille din router til fabriksindstillingerne."
            }, {
                type: "note",
                title: "Bemærk:",
                content: [
                    "Fabriksnulstilling nulstille alle indstillinger, som du har konfigureret for routeren til fabriksindstillingerne. Når routeren er gendannet og genstartet, skal du oprette en ny adgangskode for at logge på den internetbaserede administrationside igen.",
                    "Sluk IKKE for routeren, mens sikkerhedskopiering eller opdatering er i gang."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Kontostyring",
            CONTENT: [{
                    type: "paragraph",
		    display: "$.helpControl.cloudLogin",
                    content: "Denne side giver dig mulighed for at ændre din login adgangskode."
                }, /*{
                    type: "name",
                    title: "Gamle brugernavn",
                    content: "Indtast dit nuværende brugernavn."
                }, */{
                    type: "name",
                    title: "Gamle adgangskode",
                    content: "Indtast din nuværende adgangskode."
                }, /*{
                    type: "name",
                    title: "Nyt brugernavn",
                    content: "Indtast dit nye brugernavn."
                }, */{
                    type: "name",
                    title: "Ny adgangskode",
                    content: "Indtast din nye adgangskode."
                }, {
                    type: "name",
                    title: "Bekræft ny adgangskode",
                    content: "Indtast din nye adgangskode igen."
                }, {
                    type: "title",
                    content: "Lokalstyring"
                }, {
                    type: "paragraph",
                    content: "Lokalstyring giver dig mulighed for at specifikt at tildele en klientenhed på netværket til at have adgang til og kunne styre routeren ved hjælp af den MAC-adresse-baserede godkendelse."
                }, {
                    type: "name",
                    title: "Port",
                    content: "Indtast nummeret på den port, der skal bruges til at få adgang til routeren mellem 1024 og 65535. Standardværdien er 80."
                }, {
                    type: "name",
                    title: "IP/MAC-adresse",
                    content: "Indtast en gyldig lokal IP-adresse eller MAC-adresse for enheden der skal tillades adgang til routeren."
                }, {
                    type: "title",
                    content: "Fjernadministration"
                }, {
                    type: "paragraph",
                    content: "Funktionen Fjernstyring giver dig adgang til og konfigurere routeren fra internettet."
                }, {
                    type: "name",
                    title: "Fjernadministration",
                    content: "Marker dette afkrydsningsfelt for at aktivere funktionen Fjernadministration."
                }, {
                    type: "name",
                    title: "Port",
                    content: "Indtast nummeret på den port, der skal bruges til at få adgang til routeren med større sikkerhed mellem 1024 og 65535. Normalt bruger webbrowsere HTTP-tjenesteport 80."
                }, {
                    type: "name",
                    title: "IP/MAC-adresse",
                    content: "Indtast en gyldig ekstern IP-adresse eller MAC-adresse for at kunne få adgang til routeren."
                }



            ]
        },
        log: {
            TITLE: "Systemlog",
            CONTENT: [{
                type: "paragraph",
                content: "Systemlogget viser en liste over de seneste aktiviteter (hændelser) i routeren. Du kan definere, hvilke typer af logfiler og/eller niveauer af logger du vil se. Denne side gør det også muligt for routeren at eksportere systemloggen til en computer eller til automatisk at sende systemloggen til en bestemt fjernserver."
            }, {
                type: "name",
                title: "Type",
                content: "Vælg typen af systemlog der skal vises."
            }, {
                type: "name",
                title: "Niveau",
                content: "Vælg niveauet af systemlog der skal vises."
            }, {
                type: "name",
                title: "Opdater",
                content: "Klik på denne ikon for at opdatere systemloggen."
            }, {
                type: "name",
                title: "Slet alle",
                content: "Klik på denne ikon for at slette systemloggerne."
            }, {
                type: "name",
                title: "Indstillinger for log",
                content: "Klik for at angive logfilindstillingerne.",
                children: [{
                    type: "name",
                    title: "Gem lokalt",
                    content: "Vælg for at cache systemloggen på routerens lokale hukommelse. Loggen vises i tabellen på systemlogsiden.",
                    children: [{
                        type: "name",
                        title: "Minimalt niveau",
                        content: "Vælg det minimale niveau  af systemlog der skal gemmes fra rullelisten. Listen er i prioriteret rækkefølge, med det laveste niveau sidst."
                    }]
                }, {
                    type: "name",
                    title: "Gem eksternt",
                    content: "Vælg for at sende systemloggen til en ekstern server. Hvis den eksterne server har en viewerklient eller sniffer-værktøj installeret, kan du få vist og analysere systemets log eksternt i real-tid.",
                    children: [{
                        type: "name",
                        title: "Minimalt niveau",
                        content: "Vælg det minimale niveau  af systemlog der skal gemmes fra rullelisten. Listen er i prioriteret rækkefølge, med det laveste niveau sidst."
                    }, {
                        type: "name",
                        title: "Server-IP",
                        content: "Angiv IP-adressen på den eksterne systemlog-server."
                    }, {
                        type: "name",
                        title: "Serverport",
                        content: "Angiv portnummeret på den eksterne systemlog-server."
                    }, {
                        type: "name",
                        title: "Lokalt facilitetsnavn",
                        content: "Vælg det lokale facilitetsnavn på den ekstern server fra rullelisten."
                    }]
                }]
            }, {
                type: "name",
                title: "Gem logfil",
                content: "Klik på denne knap for at hente alle systemlogfiler til din lokale computer."
            }]
        },
        snmp: {
            TITLE: "SNMP-indstillinger",
            CONTENT: [{
                type: "name",
                title: "SNMP-agent",
                content: "Tænd for at aktivere den indbyggede SNMP-agent, der gør det muligt for routeren at fungere i den operationelle rolle i forbindelse med at modtage og behandle SNMP-meddelelser, sende svar til SNMP-administratoren og trigge SNMP-fælder når der indtræffer en hændelse."
            }, {
                type: "name",
                title: "Skrivebeskyttet gruppe",
                content: "Viser den standard offentlige gruppestreng, der beskytter routeren mod uautoriseret adgang."
            }, {
                type: "name",
                title: "Skrivegruppen",
                content: "Viser den standard offentlige læse og skrive gruppestreng, der beskytter routeren mod uautoriseret adgang."
            }, {
                type: "name",
                title: "Systemnavn",
                content: "Viser det administrativt tildelte navn for denne styrede enhed."
            }, {
                type: "name",
                title: "Systembeskrivelse",
                content: "Viser tekstbeskrivelsen for den styrede enhed.  Denne værdi bør indeholde det fulde navn og versionsidentifikation af systemets hardwaretype, software operativsystem og software til netværk."
            }, {
                type: "name",
                title: "Systemlokalitet",
                content: "Viser den fysiske placering af denne enhed (f.eks. telefonskab, 3. sal).  "
            }, {
                type: "name",
                title: "Systemkontakt",
                content: "Viser den tekstlige identifikation af kontaktpersonen for denne styrede enhed, sammen med oplysninger om hvordan man kommer i kontakt med denne person."
            }, {
                type: "name",
                title: "Trap Manager IP",
                content: "Viser IP-adressen på den host, der modtager traps."
            }]
        },
        stat: {
            TITLE: "Statistik over trafik",
            CONTENT: [{
                type: "name",
                title: "Statistik over trafik",
                content: "Tænd for at aktivere funktionen Trafikstatistik."
            }, {
                type: "title",
                content: "Liste for Statistik over trafik"
            }, {
                type: "name",
                title: "IP/MAC-adresse",
                content: "IP- og MAC-adresserne for de tilsluttede klienter."
            }, {
                type: "name",
                title: "Samlede antal pakker",
                content: "Det samlede antal pakker der modtages og transmitteres via routeren."
            }, {
                type: "name",
                title: "Samlet antal bytes",
                content: "Det samlede antal bytes der modtages og transmitteres via routeren."
            }, {
                type: "name",
                title: "Aktuelle pakker",
                content: "Det samlede antal pakker der sendes og modtages på et bestemt tidsinterval i sekunder."
            }, {
                type: "name",
                title: "Aktuelle bytes",
                content: "Det samlede antal bytes der sendes og modtages på et bestemt tidsinterval i sekunder."
            }, {
                type: "name",
                title: "Aktuelle ICMP-Tx",
                content: "Viser den aktuelle transmissionshastighed af ICMP-pakker der transmitteres via WAN-porten over den maksimale transmissionshastighed pr. sekund."
            }, {
                type: "name",
                title: "Aktuelle UDP-Tx",
                content: "Viser den aktuelle transmissionshastighed af UDP-pakker der transmitteres via WAN-porten over den maksimale transmissionshastighed pr. sekund."
            }, {
                type: "name",
                title: "Aktuelle SYN-Tx",
                content: "Viser den aktuelle transmissionshastighed af TCP SYN-pakker der transmitteres via WAN-porten over den maksimale transmissionshastighed pr. sekund."
            }, {
                type: "name",
                title: "Rediger",
                content: "Klik på  <b>Papirkurv</b> for at slette de tilsvarende statistikker."
            }, {
                type: "name",
                title: "Opdater",
                content: "Klik på for at opdatere de statistiske oplysninger på siden."
            }, {
                type: "name",
                title: "Nulstil",
                content: "Klik på for at nulstille alle statistiske værdier på listen til nul."
            }, {
                type: "name",
                title: "Slet alle",
                content: "Klik for at slette alle statistiske oplysninger på listen."
            }]
        },
        ethWan: {
            TITLE: "WAN-interface",
            CONTENT: [{
                type: "title2",
                content: "Forbindelsestype: Dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Vælg denne type hvis du har en DHCP-serverforbindelse fra din internetudbyder (ISP)."
            }, {
                type: "name",
                title: "IP adresse/Undernetmaske/Gateway/standard gateway",
                content: "Disse parametre tildeles automatisk af DHCP-serveren fra din internetudbyder."
            }, {
                type: "name",
                title: "Forny/frigiv",
                content: "Klik på denne knap for at forny/frigive IP-parametrene fra internetudbyderen."
            }, {
                type: "name",
                title: "Avanceret",
                children: [{
                    type: "name",
                    title: "MTU-størrelse (i bytes)",
                    content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er <b>1500 bytes</b>. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) bruges til at administrere multicasting på TCP/IP-netværk. Nogle udbydere bruger IGMP til at udføre fjernkonfiguration på en router. Det er som standard aktiveret."
                }, {
                    type: "name",
                    title: "Få IP ved hjælp af Unicast DHCP",
                    content: "Marker dette afkrydsningsfelt, hvis internetudbyderens DHCP-serveren ikke understøtter broadcast-programmer og du kan ikke hente IP-adressen dynamisk."
                }, {
                    type: "name",
                    title: "Brug følgende DNS-adresse",
                    content: "Marker dette afkrydsningsfelt og indtast DNS serveradressen(erne) for DNS  i punktumformat, som angivet af din internetudbyder. Dette WAN-interface vil bruge den angivne DNS-server for prioritet."
                }, {
                    type: "name",
                    title: "Navn på host",
                    content: "Indtast værtsnavnet på denne WAN-grænseflade."
                }]
            }, {
                type: "title2",
                content: "Forbindelsestype: Statisk IP"
            }, {
                type: "name",
                title: "Statisk IP",
                content: "Vælg denne type hvis du har en specifik (fast) IP-adresse, undernetmaske, gateway og DNS-parametre fra internetudbyderen."
            }, {
                type: "name",
                title: "IP-adresse/Undernetmaske/Gateway/DNS-server/Sekundær DNS-server",
                content: "Indtast IP-oplysningerne fra din internetudbyder i punktumformat."
            }, {
                type: "paragraph",
                content: "Klik på <b>Avanceret</b> for at få vist mere avancerede indstillinger."
            }, {
                type: "name",
                title: "Avanceret",
                children: [{
                    type: "name",
                    title: "MTU-størrelse (i bytes)",
                    content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er <b>1500 bytes</b>. Det anbefales ikke at ændre standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) bruges til at administrere multicasting på TCP/IP-netværk. Nogle udbydere bruger IGMP til at udføre fjernkonfiguration på en router. Det er som standard aktiveret."
                }]
            }, {
                type: "title2",
                content: "Forbindelsestype: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Vælg denne type, hvis du vil bruge DSL (Digital Subscriber Line) tjenesten og har et brugernavn og adgangskode fra internetudbyderen."
            }, {
                type: "name",
                title: "PPPoE-brugernavn/PPPoE-adgangskode /bekræft adgangskode",
                content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Sekundær forbindelse",
                content: "Den er kun tilgængelig for PPPoE-forbindelse. Hvis din internetudbyder har en ekstra forbindelsestype, såsom dynamisk/statisk IP til forbindelse til et lokalt netværk, skal du vælge alternativknappen for dynamisk/statisk IP for at aktivere den sekundære forbindelse.<br>Sekundær forbindelse er deaktiveret som standard, så der er kun en PPPoE-forbindelse. Aktiver den ikke, medmindre det er nødvendigt."
            }, {
                type: "name",
                title: "Forbindelsestilstand",
                content: "Vælg en en af forbindelsestilstandene nedenfor, som bestemmer hvordan man opretter forbindelse til internettet.",
                children: [{
                    type: "name",
                    title: "Altid",
                    content: "Vælg denne indstilling for automatisk at oprette forbindelse igen, når forbindelsen afbrydes."
                }, {
                    type: "name",
                    title: "Forbindelse efter anmodning",
                    content: "Vælg denne tilstand for at afbryde internetforbindelsen baseret på et specifikt tidsrum med inaktivitet (Maks inaktive periode). Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                }, {
                    type: "name",
                    title: "Opret forbindelse manuelt",
                    content: "Vælg denne tilstand for at oprette eller afbryde internetforbindelsen manuelt eller baseret på et specifikt tidsrum med inaktivitet (Maks inaktive periode)."
                }, {
                    type: "name",
                    title: "Maks. inaktiv periode",
                    content: "<b>15 minutter</b> - Angiv det antal minutter internetforbindelse kan være inaktiv, før den afbrydes. Standardværdien for inaktivitet er 15 minutter."
                }]
            }, {
                type: "name",
                title: "Godkendelsestype",
                content: "Vælg en godkendelsestype fra rullelisten. Standardmetoden er AUTO_AUTH."
            }, {
                type: "name",
                title: "Opret forbindelse/afbryd forbindelse",
                content: "Klik for omgående at oprette forbindelse/afbryde forbindelse."
            }, {
                type: "paragraph",
                content: "Klik på <b>Avanceret</b> for at få vist mere avancerede indstillinger."
            }, {
                type: "name",
                title: "Avanceret",
                children: [{
                    type: "name",
                    title: "Navn på tjeneste",
                    content: "Indtast tjenestenavnet fra din internetudbyder. Hvis ikke, så lad feltet stå tomt."
                }, {
                    type: "name",
                    title: "Servernavn",
                    content: "Indtast servernavnet fra din internetudbyder. Hvis ikke, så lad feltet stå tomt."
                }, {
                    type: "name",
                    title: "MTU-størrelse (i bytes)",
                    content: "Den typiske størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1480 bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Bemærk</b>: I sjældne tilfælde, vil din internetudbyder bede dig om at justere MTU-størrelse for bedre ydelse af netværket. Du bør ikke ændre værdien, medmindre det er absolut nødvendigt."
                    }]
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) bruges til at administrere multicasting på TCP/IP-netværk. Nogle udbydere bruger IGMP til at udføre fjernkonfiguration på en router. Det er som standard aktiveret."
                }, {
                    type: "name",
                    title: "Brug den IP som internetudbyderen specificerer",
                    content: "Vælg denne indstilling og indtast den IP-adresse, din internetudbyder gav dig."
                }, {
                    type: "name",
                    title: "Interval for anmodning om ekko",
                    content: "Angiv en værdi for tidsintervalet mellem 0 og 120 (i sekunder), hvor routeren anmoder Access-koncentratoren om at lave et ekko i hvert interval. Standardværdien er 30. 0 betyder ingen registrering."
                }, {
                    type: "name",
                    title: "Brug følgende DNS-adresse",
                    content: "Marker dette afkrydsningsfelt og indtast DNS serveradressen(erne) for DNS  i punktumformat, som angivet af din internetudbyder. Dette WAN-interface vil bruge den angivne DNS-server for prioritet."
                }]
            }, {
                type: "title2",
                content: "Forbindelsestype: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Vælg denne type, hvis du opretter forbindelse til en L2TP/PPTP VPN-server og internetudbyderen har forsynet dig med et brugernavn, en adgangskode og IP-adresse/domænenavn på serveren."
            }, {
                type: "name",
                title: "Brugernavn/adgangskode",
                content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "IP-adresse/Primær DNS",
                content: "Disse parametre tildeles automatisk af DHCP-serveren fra din internetudbyder."
            }, {
                type: "name",
                title: "Sekundær forbindelse (dynamisk-IP eller statisk-IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Vælg dette hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: "Vælg dette hvis IP-adressen, undernetmasken, gatewayen og DNS-adresserne leveres af internetudbyderen, og angiv disse oplysninger i de relevante felter."
                }]
            }, {
                type: "name",
                title: "VPN-server IP/domænenavn",
                content: "Angiv VPN-serverens IP-adresse eller domænenavnet, som din internetudbyder har oplyst."
            }, {
                type: "name",
                title: "MTU-størrelse",
                content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1460 bytes (1420 for PPTP). Rediger ikke standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
            }, {
                type: "name",
                title: "Forbindelsestilstand",
                content: "Vælg en passende forbindelsestilstand, som bestemmer hvordan man opretter forbindelse til internettet.",
                children: [{
                    type: "name",
                    title: "Altid tændt",
                    content: "I denne tilstand, genoprettes internetforbindelse igen automatisk hver gang den bliver afbrudt."
                }, {
                    type: "name",
                    title: "Forbindelse efter anmodning",
                    content: "I denne tilstand, afbrydes internetforbindelsen automatisk efter at et angivet tidsrum med inaktivitet (Maksimal inaktiv periode) er gået. Forbindelsen gendannes, når du forsøger at få adgang til internettet igen."
                }, {
                    type: "name",
                    title: "Opret forbindelse manuelt",
                    content: "I denne tilstand, styres internetforbindelsen manuelt ved at klikke på knappen Opret forbindelse eller Afbryd. Denne tilstand understøtter også funktionen Maks. Inaktiv periode. Indtast en Maks. Inaktiv periode (i minutter) for at angive den maksimale tid internetforbindelsen kan være inaktiv, før den afbrydes. Standardværdien er 15 minutter. Hvis du ønsker at Internetforbindelsen er aktiv hele tiden, skal du skrive 0 (nul)."
                }]
            }, {
                type: "title",
                content: "MAC-klone"
            }, {
                type: "name",
                title: "Brug standard MAC-adresse",
                content: "Vælg denne indstilling for at bruge standard MAC-adressen i det tilfælde, hvor udbyderen ikke har tildelt en IP-adresse til routerens MAC-adresse."
            }, {
                type: "name",
                title: "Brug computerens aktuelle MAC-adresse",
                content: "Vælg denne indstilling for at bruge MAC-adressen for den aktuelt tilsluttede computere i det tilfælde, hvor internetudbyderen kun tillader denne computer at oprette forbindelse til internettet."
            }, {
                type: "name",
                title: "Brug brugerdefineret MAC-adresse",
                content: "Vælg denne indstilling for at angive den registrerede MAC-adresse manuelt."
            }]
        },
        route: {
            TITLE: "Avanceret routing",
            CONTENT: [{
                type: "paragraph",
                content: "Avanceret routing bruges til at forudbestemme en fast rute for netværksinformationspakker til at nå frem til en bestemt host eller netværk."
            }, {
                type: "title",
                content: "Statisk routing"
            }, {
                type: "name",
                title: "Destinations IP-address/undernetmaske/gateway",
                content: "Viser destinationens IP-adresse, undernetmaske og gateway af den statiske rute."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Angiver den aktuelle status af en statisk rute. Klik på <b>pæreikonen</b> for at aktivere (eller deaktivere) den statiske rute."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at <b>Ændre</b> eller <b>Slette</b> den pågældende post."
            }, {
                type: "note",
                title: "Sådan etableres statisk routing",
                content: [
                    "Klik på <b>Tilføj</b>.",
                    "Angiv en destinations IP-address for at tildele en statisk rute for denne post.",
                    "Indtast en undernetmaske hexadecimalformat for at bestemme netværksdelen og host-delen af IP-adressen.",
                    "Indtast den gateway-IP-adresseformat for at tilslutte routeren til netværket eller hosten.",
                    "Vælg <b>LAN</b> eller en WAN-grænseflade for at angive typen af destinationens IP-adresse.",
                    "Vælg <b>Aktiverer dette valg</b>.",
                    "Klik på <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Routing-tabel for system"
            }, {
                type: "paragraph",
                content: "Routing-tabel for systemet viser alle gyldige ruteposter, som er i brug i øjeblikket."
            }, {
                type: "paragraph",
                content: "Klik på Opdater for at opdatere Routing-tabellen."
            }]
        },
        ddns: {
            TITLE: "Dynamiske DNS-indstillinger",
            CONTENT: [{
                type: "paragraph",
                content: "Dynamisk DNS giver dig mulighed for at tildele et fast host- og domænenavn til en dynamisk internet-IP-adresse. Det er nyttigt hvis du hoster dit eget websted, FTP-server eller en anden server bagved routeren. Først skal du tilmelde dig en DDNS-tjenesteudbyder, som f. eks. www.dyndns.com."
            }, {
                type: "step",
                title: "Sådan etableres en dynamisk DNS",
                content: [
                    "Vælg dynamisk DNS-tjenesteudbyderen.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Indtast domænenavnet, som du har modtaget fra DDNS-tjenesteudbyderen.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Bemærk:",
                content: "Hvis du vil bruge en ny DDNS-konto, skal du logge af og derefter logge på med den nye konto"
            }]
        },
        dhcp: {
            TITLE: "DHCP-server",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP-server (Dynamic Host Configuration Protocol) tildeler dynamisk TCP/IP-konfiguration til klientenheder fra IP-adressegruppen. Deaktiver IKKE standard DHCP-serveren, medmindre du har en anden DHCP-server, eller du ønsker manuelt at tildele TCP/IP-konfigurationen til individuelle klienter på netværket."
            }, {
                type: "name",
                title: "IP-adressepulje",
                content: "Angiv intervallet af IP-adresser, som kan leases til klienterne."
            }, {
                type: "name",
                title: "Låneperiode for adresse",
                content: "Angiv den tid, som en IP-adresse er leaset til klienten mellem 1 og 2880 minutter."
            }, {
                type: "name",
                title: "Standard gateway",
                content: "Indtast LAN-IP-adressen. (Valgfri)"
            }, {
                type: "name",
                title: "DNS-server/Sekundær DNS-server",
                content: "Indtast DNS-serveradresserne fra din internetudbyder. (Valgfri)"
            }, {
                type: "title",
                content: "Klientliste"
            }, {
                type: "name",
                title: "Samlede klienter",
                content: "Viser det samlede antal af tilknyttede DHCP-klienter."
            }, {
                type: "name",
                title: "Klientnavn",
                content: "Viser navnet på DHCP-klienten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen."
            }, {
                type: "name",
                title: "Tildelt IP-adresse",
                content: "Viser den tildelte IP-adressen for klienten fra DHCP-serveren."
            }, {
                type: "name",
                title: "Låneperiode",
                content: "Viser den tidsperioden for den IP-adresse, der er blevet leaset til klienten."
            }, {
                type: "name",
                title: "Opdater",
                content: "Klik for at opdatere DHCP-klientlisten."
            }, {
                type: "title",
                content: "Adressereservering"
            }, {
                type: "paragraph",
                content: "Du kan manuelt reservere en IP-adresse til en klient, der er tilsluttet til routeren. Når den er reserveret, vil IP-adressen kun blive tildelt den samme klient fra DHCP-serveren."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen på klienten med reserveret DHCP IP-adresse."
            }, {
                type: "name",
                title: "Reserveret IP-adresse",
                content: "Viser den reserverede IP-adresse for klienten."
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser beskrivelsen af enheden."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Klik for at aktivere eller deaktivere den tilsvarende post."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at <b>Ændre</b> eller <b>Slette</b> den pågældende klient."
            }, {
                type: "note",
                title: "Sådan reserveres en IP-adresse til en DHCP-klient",
                content: [
                    "Klik på <b>Tilføj</b>.",
                    "Indtast klientens <b>MAC-adresse</b>.",
                    "Indtast IP-adressen, som du vil reservere for klienten.",
                    "Indtast beskrivelsen af enheden.",
                    "Vælg <b>Aktiverer dette valg</b>.",
                    "Klik på <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Sådan ændres eller slettes en eksisterende klient",
                content: [
                    "Klik på ikonet for <b>Rediger</b> eller <b>Papirkurv</b> i den tilsvarende post."
                ]
            }, {
                type: "title",
                content: "Betingelsesgruppe"
            }, {
                type: "name",
                title: "Leverandør-id/start IP-adresse/IP-adresse/facilitet",
                content: "Viser leverandør-ID, start IP-adresse, slut IP-adresse og facilitet for betingelsesgruppen."
            }, {
                type: "name",
                title: "Status",
                content: "Angiver den aktuelle status af en betingelsesgruppe. Klik på pæreikonen for at aktivere (eller deaktivere) betingelsesgruppen."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at <b>Ændre</b> eller <b>Slette</b> den pågældende klient."
            }, {
                type: "note",
                title: "Sådan tilføjes en betingelsesgruppe",
                content: [
                    "Klik på <b>Tilføj</b>.",
                    "Indtast LAN-enhedens navn.",
                    "Indtast en værdi for at identificere leverandøren og funktionalitet af DHCP-klienten.",
                    "Indtast start IP-adressen, som DHCP-serveren tildeler til klienter.",
                    "Indtast slut IP-adressen, som DHCP-serveren tildeler til klienter.",
                    "Indtast standard gateway for DHCP-serveren.",
                    "Vælg en enhedstype fra rullelisten.",
                    "Vælg en valgmulighed fra rullelisten.",
                    "Angiv valgmulighedens værdi.",
                    "Vælg <b>Aktiverer dette valg</b>.",
                    "Klik på <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV-indstillinger",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Vælg for at aktivere IPTV-funktionen."
            }, {
                type: "name",
                title: "Tilstand",
                content: "Vælg den ønskede tilstand som anbefalet af din internetudbyder. Der er seks IPTV-tilstande:",
                children: [{
                    type: "name",
                    title: "Bro",
                    content: "Vælg dette, hvis din internetudbyder ikke er på listen og ingen andre parametre er forudbestemt.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tildel din LAN-port til enten at fungere som Internetudbyder eller som IPTV-leverandøren."
                    }]
                }, {
                    type: "name",
                    title: "Singapore-Singtel",
                    content: "Vælg denne indstilling, hvis din internetudbyder er ExStream fra Singapore og de nødvendige parametre er forudbestemte, herunder Internet/IPTV-VLAN-id'er og prioriteret, og LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Unifi",
                    content: "Vælg denne indstilling, hvis din internetudbyder er Unifi fra malaysia og de nødvendige parametre er forudbestemte, herunder Internet/IPTV-VLAN-id'er og prioriteret, og LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Maxis",
                    content: "Vælg denne indstilling, hvis din internetudbyder er Maxis fra Malaysia og de nødvendige parametre er forudbestemt, herunder Internet/IP-telefon/IPTV-VLAN-id'er og prioriteret, og LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Brugerdefineret",
                    content: "Vælg denne indstilling, hvis din internetudbyder ikke giver de nødvendige parametre, herunder Internet/IP-telefon/IPTV-VLAN-id'er og prioriteret, og LAN-port (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "Internet/IP-telefon/IPTV VLAN-ID/Prioritet",
                        content: "Konfigurere VLAN-id'erne som leveret af din internetudbyder."
                    }, {
                        type: "name",
                        title: "802.11Q tag",
                        content: "Vælg for at mærke internetpakkerne med 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tildel din LAN-port til at fungere som Internetudbyder eller som IPTV-leverandør."
                    }, {
                        type: "name",
                        title: "IPTV Multicast VLAN-ID/Prioritet",
                        content: "Du kan aktivere IPTV-multicast-funktionen som ønsket, og konfigurere VLAN ID og prioritet i henhold til din internetudbyder."
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP Proxy",
                content: "Vælg IGMP (Internet Group Management Protocol) Proxy-versionen, enten V2 eller V3, som anbefalet af din internetudbyder."
            }]
        },
        usbManage: {
            TITLE: "USB-lagerenhed",
            CONTENT: [{
                type: "paragraph",
                content: "Skærmen for <b>USB-lagerenhed</b> viser grundlæggende oplysninger om USB-enheden der er tilsluttet via USB-porten."
            }, {
                type: "name",
                title: "Scan",
                content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne og opdatere skærmen med de opdaterede oplysninger."
            }, {
                type: "name",
                title: "Drevnavn",
                content: "Viser navnet på USB-drevet."
            }, {
                type: "name",
                title: "Kapacitet",
                content: "Viser den samlede lagerkapacitet på USB-enheden."
            }, {
                type: "name",
                title: "Ledig plads",
                content: "Viser den aktuelle frie lagerplads."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Dette afkrydsningsfelt vises kun, når en USB-lagringsenhed er tilsluttet routeren. Vælg for at aktivere fildeling på USB-enheden."
            }, {
                type: "name",
                title: "Sikker fjernelse",
                content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren. Bemærk venligst at knappen Sikker fjernelse kun vises når der er en USB-lagringsenhed, der er tilsluttet til routeren. Vær også opmærksom på, at du ikke kan fjerne USB-enheden, mens den er i brug."
            }, {
                type: "title",
                content: "Indstillingerne for deling"
            }, {
                type: "name",
                title: "Navn på netværksmedier/server",
                content: "Viser det navn der bruges til at få adgang til en tilsluttet USB-lagerenhed."
            }, {
                type: "title",
                content: "Mappedeling"
            }, {
                type: "name",
                title: "Del alt",
                content: "Aktiver for at dele filerne og mapperne eller deaktiver for kun at dele de valgte mapper."
            }, {
                type: "name",
                title: "Aktiverer godkendelse",
                content: "Tænd for at aktivere godkendelse som kræver at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper."
            }, {
                type: "name",
                title: "Mappenavn",
                content: "Viser navnet på den delte mappe. "
            }, {
                type: "name",
                title: "Sti til mappe",
                content: "Viser stien til den delte mappe. "
            }, {
                type: "name",
                title: "Drevnavn",
                content: "Viser navnet på det delte drev."
            }]
        },
        printSrv: {
            TITLE: "Printerserver",
            CONTENT: [{
                type: "name",
                title: "Aktiver printerserver",
                content: "Aktiver for at aktivere printerserverfunktionen."
            }, {
                type: "name",
                title: "Printernavn",
                content: "Viser navnet på den printer, der er tilsluttet til routeren."
            }]
        },
        diskSettings: {
            TITLE: "USB-lagerenhed",
            CONTENT: [{
                type: "paragraph",
                content: "Skærmen for <b>USB-lagerenhed</b> viser grundlæggende oplysninger om USB-enheden der er tilsluttet via USB-porten."
            }, {
                type: "name",
                title: "Scan",
                content: "Normalt vil routeren automatisk registrerer alle nye tilsluttede enheder. Hvis ikke, skal du klikke på denne knap for at scanne og opdatere skærmen med de opdaterede oplysninger."
            }, {
                type: "name",
                title: "Drevnavn",
                content: "Viser navnet på USB-drevet."
            }, {
                type: "name",
                title: "Kapacitet",
                content: "Viser den samlede lagerkapacitet på USB-enheden."
            }, {
                type: "name",
                title: "Ledig plads",
                content: "Viser den aktuelle frie lagerplads."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Dette afkrydsningsfelt vises kun, når en USB-lagringsenhed er tilsluttet routeren. Vælg for at aktivere fildeling på USB-enheden."
            }, {
                type: "name",
                title: "Sikker fjernelse",
                content: "Klik på denne knap for at lukke USB-lagringsenhed før du fysisk frakobler den fra routeren. Bemærk venligst at knappen Sikker fjernelse kun vises når der er en USB-lagringsenhed, der er tilsluttet til routeren. Også være opmærksom på, at du ikke kan fjerne USB-enheden, mens den aktuelle disk er i brug."
            }, {
                type: "note",
                title: "Sådan etableres en filserver",
                content: [
                    "Tilslut USB-lagringsenheden til USB-porten på routeren ved hjælp af et USB-kabel.",
                    "Den nyligt tilsluttede USB-enhed bør automatisk blive registreret af routeren og oplysningerne bør vises under afsnittet <b>Enhedsindstillinger</b>. Hvis ikke, skal du klikke på <b>Scan</b>.",
                    "Klik på <b>Aktiv</b> for at aktivere fildeling."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Kontodeling",
            CONTENT: [{
                type: "name",
                title: "Konto",
                content: "Du kan enten vælge at <b>Brug Standard-konto</b> for at logge på til de delte filer og mapper eller <b>Brug ny konto</b> og indtaste følgende for at oprette en ny brugerkonto."
            }, {
                type: "name",
                title: "Brugernavn/adgangskode",
                content: "Indtaste op til 15 tegn, der indeholder bogstaver, tal og/eller understregning. Brugernavnet skal begynde med et bogstav. Disse felter skelner mellem store og små bogstaver. "
            }, {
                type: "paragraph",
                content: "Klik på <b>Gem</b> for at gemme kontoindstillingerne."
            }, {
                type: "title",
                content: "Indstillingerne for deling"
            }, {
                type: "name",
                title: "Navn på netværk/Medie-server",
                content: "Viser det navn der bruges til at få adgang til en tilsluttet USB-lagerenhed."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Marker afkrydsningsfeltet for at aktivere de(n) tilsvarende adgangsmetode(r)."
            }, {
                type: "name",
                title: "Adgangsmetode",
                content: "Der er fire metoder der bruges til at få adgang til den delte USB-lagerenhed.",
                children: [{
                    type: "name",
                    title: "Medie-server",
                    content: "Vælg denne indstilling for at tillade brugere på netværket at se billeder, afspille musik og se film på din delte UBS-lagringsenhed fra DLNA-understøttede enheder såsom computere, mobile enheder og spillekonsoller (PS2/3)."
                }, {
                    type: "name",
                    title: "Netværks nabolag",
                    content: "Vælg denne indstilling for at tillade brugere på dit netværk at få adgang til det delte indhold via adressen anført under kolonnen Adresse."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Vælg denne indstilling for at aktivere FTP-serverfunktion, der tillader  FTP-klienter og brugere på netværket adgang til USB-lagerenheden via FTP-adressen vist i kolonnen Adresse. For at ændre FTP-serverens portnummer, skal man indtaste et nyt portnummer og klikke på <b>Gem</b> for at anvende ændringerne."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (via internet)",
                    content: "Vælg denne indstilling for at tillade FTP-klienter og brugere at få fjernadgang til at downloade og uploade filer til den fælles USB-lagringsenhed via FTP over internettet."
                }]
            }, {
                type: "name",
                title: "Adgang",
                content: "Viser adressen der bruges til at få adgang til den tilsluttede USB-lagerenhed."
            }, {
                type: "name",
                title: "Port",
                content: "Indtast portnummeret på FTP-serveren."
            }, {
                type: "title",
                content: "Mappedeling"
            }, {
                type: "name",
                title: "Del alt",
                content: "Aktiver for at dele filer og mapper eller deaktiver for kun at dele de valgte mapper."
            }, {
                type: "name",
                title: "Aktiverer godkendelse",
                content: "Tænd for at aktivere godkendelse som kræver at brugerne skal indtaste et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper."
            }, {
                type: "name",
                title: "Mappenavn",
                content: "Viser navnet på den delte mappe. "
            }, {
                type: "name",
                title: "Sti til mappe",
                content: "Viser stien til den delte mappe. "
            }, {
                type: "name",
                title: "Mediedeling",
                content: "Viser om funktionen mediedeling er aktiveret (Tændt) eller deaktiveret (Slukket)."
            }, {
                type: "name",
                title: "Drevnavn",
                content: "Viser navnet på det delte drev."
            }, {
                type: "name",
                title: "Status",
                content: "Angiver den aktuelle status for en delt mappe. Klik på pæreikonen for at aktivere (eller deaktivere) mappedeling."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at <b>Ændre</b> eller <b>Slette</b> den tilsvarende delte mappe."
            }, {
                type: "note",
                title: "Sådan tilføjes en post for mappedeling:",
                content: [
                    "SSluk for  <b>Vælg alle</b>.",
                    "Klik på <b>Tilføj</b>.",
                    "Vælg <b>Drevnavn</b> og <b>Sti til mappe</b>.",
                    "Opret et mappenavn.",
                    "Beslut hvordan du deler mappen:<br /><b>Aktiver godkendelse</b> - Vælg for at kræve at brugerne skal godkendes med et gyldigt brugernavn og adgangskode for at få adgang til de delte mapper.<br /><b>Aktiver skriveadgang</b> - Vælg for at tillade brugere at foretage ændringer til mappeindholdet.<br /><b>Aktivere mediedeling</b> - Vælg for at aktivere mediedeling.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPSec-indstillinger",
            CONTENT: [{
                type: "name",
                title: "DPD (Dead Peer Detection)",
                content: "DPD (Dead Peer Detection) er en metode til at opdage en død IKE Internet Key Exchange) peer. DPD bruges til at genvinde de tabte ressourcer i forbindelse med at en peer er fundet død, og den bruges også til at udføre IKE-peer failover. Slå til for at aktivere DPD-funktionen."
            }, {
                type: "name",
                title: "Forbindelsesnavn/ekstern gateway/lokal adresse/adresse",
                content: "Viser forbindelsesnavnet, ektern gateway, lokal adresse og ekstern adresse for IPSec-posten."
            }, {
                type: "name",
                title: "Status",
                content: "Viser statussen på IPSec-posten. Status omfatter:",
                children: [{
                    type: "name",
                    title: "Deaktiveret",
                    content: "Posten er deaktiveret."
                }, {
                    type: "name",
                    title: "Ned",
                    content: "Posten er aktiveret, men der er ingen forbindelse."
                }, {
                    type: "name",
                    title: "Op",
                    content: "Posten er aktiveret og forbindelsen er etableret med succes. "
                }]
            }, {
                type: "name",
                title: "Aktiver",
                content: "Klik på <b>pæreikonen</b> for at aktivere eller deaktivere posten."
            }, {
                type: "name",
                title: "Rediger",
                content: "Viser indstillingerne for at <b>Ændre</b> eller <b>Slette</b> den pågældende post."
            }, {
                type: "name",
                title: "Tilføj",
                content: "Klik for at tilføje en ny IPSec VPN-forbindelse."
            }, {
                type: "name",
                title: "IPSec forbindelsesnavn",
                content: "Indtast et navn for IPSec VPN-forbindelsen."
            }, {
                type: "name",
                title: "Ekstern IPSec gateway-adresse (URL)",
                content: "Indtast destinationens gateway IP-adresse, som er den offentlige WAN IP eller domænenavn for den eksterne VPN-servers slutpunkt."
            }, {
                type: "name",
                title: "Tunneladgang fra lokale IP-adresser",
                content: "Vælg undernetadressen, hvis du ønsker at hele LAN’et opretter forbindelse til VPN-netværket, eller vælg enkelt adresse, hvis du ønsker at en enkelt IP opretter forbindelse til VPN-netværket."
            }, {
                type: "name",
                title: "IP-adresse for VPN",
                content: "Indtast IP-adressen for dit LAN. "
            }, {
                type: "name",
                title: "IP-undernetmaske",
                content: "Indtast undernetmasken for dit LAN."
            }, {
                type: "name",
                title: "Tunneladgang fra eksterne IP-adresser",
                content: "Vælg undernetadressen, hvis du ønsker at hele det eksterne LAN opretter forbindelse til VPN-netværket, eller vælg enkelt adresse, hvis du ønsker at en enkelt IP opretter forbindelse til VPN-netværket."
            }, {
                type: "name",
                title: "IP-adresse for VPN",
                content: "Indtast IP-adressen for det eksterne LAN. "
            }, {
                type: "name",
                title: "IP-undernetmaske",
                content: "Indtast undernetmasken for det eksterne LAN."
            }, {
                type: "name",
                title: "Metode for nøgleudveksling",
                content: "Vælg Auto (IKE) eller Manual til brug for at  godkende IPSec peers."
            }, {
                type: "name",
                title: "Godkendelsesmetode",
                content: "Vælg forhåndsdelt nøgle (anbefales)."
            }, {
                type: "name",
                title: "Forhåndsdelt nøgle",
                content: "Opret en forhåndsdelt nøgle der kan bruges til godkendelse."
            }, {
                type: "name",
                title: "PFS (Perfect Forward Secrecy)",
                content: "Vælg Aktiver (eller Deaktiver) af PFS (Perfect Forward Secrecy), som en ekstra sikkerhedsprotokol for den forhåndsdelte nøgle."
            }, {
                type: "name",
                title: "Avanceret",
                content: "Klik for at konfigurere de avancerede indstillinger. Vi anbefaler at du beholder standardindstillingerne. Hvis du vil ændre disse indstillinger, skal du sørge for, at begge VPN-serveres slutpunkter bruger samme krypteringsalgoritme, integritetsalgoritme, Diffie-Hellman-gruppe og nøglelevetid i både fase 1 og fase 2.",
                children: [{
                    type: "title2",
                    content: "Fase 1"
                }, {
                    type: "name",
                    title: "Tilstand",
                    content: "Vælg <b>Hovedmenu</b> for at konfigurere standard forhandlingsparametre for IKE-fase1. Vælg <b>Aggressiv</b> for at konfigurere IKE-fase 1 af VPN-tunnelen for at gennemføre forhandlinger på kortere tid. (Anbefales ikke, da det er mindre sikkert.)"
                }, {
                    type: "name",
                    title: "Lokale Id-type",
                    content: "Vælg den lokale Id-type for IKE-forhandling. Lokale WAN IP benytter en IP-adresse som identifikation i IKE-forhandling. FQDN (Fully Qualified Domain Name) bruger et brugernavn som id."
                }, {
                    type: "name",
                    title: "Lokal id",
                    content: "Den lokale id bliver automatisk udfyldt, hvis <b>Lokal WAN IP</b> er valgt. Hvis <b>FQDN</b> er valgt, skal du indtaste et brugernavn på den lokale enhed, der skal bruges som id for IKE-forhandling."
                }, {
                    type: "name",
                    title: "Ekstern id",
                    content: "Vælg den eksterne Id-type for IKE-forhandling. Ekstern WAN IP benytter en IP-adresse som identifikation i IKE-forhandling. FQDN bruger et brugernavn som id."
                }, {
                    type: "name",
                    title: "Ekstern id",
                    content: "Den lokale gateway IP-adresse bliver automatisk udfyldt, hvis <b>Ekstern WAN IP</b> er valgt. Hvis <b>FQDN</b> er valgt, skal du indtaste et brugernavn på den eksterne peer, der skal bruges som id for IKE-forhandling."
                }, {
                    type: "name",
                    title: "Krypteringsalgoritme",
                    content: "Vælg en af følgende kryperingsalgorithmer for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterer en 64-bit blok af tekst med en 56-bit nøgle."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, krypterer en tekst med en 168-bit nøgle."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Bruger AES-algoritmen og en 128-bit nøgle til kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Bruger AES-algoritmen og en 192-bit nøgle til kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Bruger AES-algoritmen og en 256-bit nøgle til kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritme",
                    content: "Vælg en af følgende integritetsalgorithmer for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tager en meddelelse af vilkårlig længde og genererer en 128-bit meddelelsesoversigt."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tager en meddelelse mindre end 2^64 (2 til 64 potens) i bits og genererer en 160-bit meddelelsesoversigt."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-gruppe for nøgleudveksling",
                    content: "Vælg den Diffie-Hellman-gruppe der skal anvendes i nøgleforhandling fase 1. Diffie-Hellman-gruppen angiver styrken af algoritmen i bit."
                }, {
                    type: "name",
                    title: "Levetid af nøgle",
                    content: "Indtast tidsperioden (i sekunder) der skal gå før en ny IPSec SA (security association) skal etableres med det eksterne slutpunkt. Standardværdien er 3600."
                }, {
                    type: "title2",
                    content: "Fase 2"
                }, {
                    type: "name",
                    title: "Krypteringsalgoritme",
                    content: "Vælg en af følgende kryperingsalgorithmer for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterer en 64-bit blok af tekst med en 56-bit nøgle."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, krypterer en tekst med en 168-bit nøgle."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Bruger AES-algoritmen og en 128-bit nøgle til kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Bruger AES-algoritmen og en 192-bit nøgle til kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Bruger AES-algoritmen og en 256-bit nøgle til kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritme",
                    content: "Vælg en af følgende integritetsalgorithmer for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tager en meddelelse af vilkårlig længde og genererer en 128-bit meddelelsesoversigt."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tager en meddelelse mindre end 2^64 (2 til 64 potens) i bits og genererer en 160-bit meddelelsesoversigt."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-gruppe for nøgleudveksling",
                    content: "Vælg den Diffie-Hellman-gruppe der skal anvendes i nøgleforhandling fase 2. Diffie-Hellman-gruppen angiver styrken af algoritmen i bit."
                }, {
                    type: "name",
                    title: "Levetid for nøgle",
                    content: "Indtast tidsperioden (i sekunder) der skal gå før en ny IPSec SA (security association) skal etableres med det eksterne slutpunkt. Standardværdien er 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Indstilling af internetforbindelse",
            CONTENT: [{
                type: "name",
                title: "Automatisk registrering",
                content: "Klik på denne knap for at få routeren til automatisk at registrere din aktuelle internetforbindelsestype."
            }, {
                type: "paragraph",
                title: "Bemærk",
                content: "Hvis du ikke er sikker på, hvilken type internetforbindelse du har, kan du bruge funktionen Automatisk identifikation eller kontakte din internetudbyder (ISP) for hjælp."
            }, {
                type: "title",
                title: "Internetforbindelsestype: Statisk IP"
            }, {
                type: "name",
                title: "IP-adresse/undernetmaske/standard gateway/primær DNS/sekundær DNS",
                content: "Indtast oplysningerne fra din internetudbyder."
            }, {
                type: "title",
                title: "Internetforbindelsestype: Dynamisk IP"
            }, {
                type: "name",
                title: "Klon IKKE MAC-adressen/Klon computerens aktuelle MAC-adresse",
                content: "Vælg om du vil klone din MAC-adresse eller ej, ifølge din internetudbyder."
            }, {
                type: "title",
                title: "Internetforbindelsestype: PPPoE"
            }, {
                type: "name",
                title: "Brugernavn/adgangskode",
                content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
            }, {
                type: "title",
                title: "Internetforbindelsestype: L2TP/PPTP"
            }, {
                type: "name",
                title: "Brugernavn/adgangskode",
                content: "Indtast brugernavnet og adgangskoden fra din internetudbyder. Disse felter skelner mellem store og små bogstaver."
            }, {
                type: "name",
                title: "Sekundær forbindelse (dynamisk-IP eller statisk-IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Vælg dette hvis IP-adressen og undernetmasken automatisk tildeles af internetudbyderen."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: " Vælg dette hvis IP-adressen, undernetmasken, gatewayen og DNS-adresserne leveres af internetudbyderen, og angiv disse oplysninger i de relevante felter."
                }]
            }, {
                type: "name",
                title: "VPN-server IP/domænenavn",
                content: "Angiv VPN-serverens IP-adresse eller domænenavnet, som din internetudbyder har oplyst."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Printerserver",
            CONTENT: [{
                type: "paragraph",
                content: "Du kan konfigurere printserveren på denne side."
            }, {
                type: "name",
                title: "Printerserver",
                content: "Angiver den aktuelle Aktiver/Deaktiver status for printerserveren."
            }, {
                type: "name",
                title: "Printernavn",
                content: "Navnet på printerforbindelsen, der er tilsluttet til routeren."
            }, {
                type: "note",
                title: "Følg instruktionerne nedenfor for at konfigurere din printerserver:",
                content: [
                    "Trin1: Tilslut USB-printeren til USB-porten på routeren via et USB-printerkabel.",
                    "Trin2:  Installer printerdriveren på computeren.",
                    "Trin3:  Installer TP-Link USB-printerens kontrolprogram på din computer. Kør resource-cden eller download TP-Link USB-printerens kontrolprogram fra vores hjemmeside: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Trådløse avancerede indstillinger for 2.4GHz | 5GHz",
            CONTENT: [{
                type: "name",
                title: "Statusinterval",
                content: "Indtast en værdi mellem 25 og 1000 i millisekunder til at bestemme varigheden mellem statuspakker, der udsendes af routeren for at synkronisere det trådløse netværk. Standardværdien er 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-tærskel",
                content: "Indtast en værdi mellem 1 og 2346  i bytes for at bestemme pakkestørrelsen for datatransmission gennem routeren. Som standard er RTS (Request to Send) tærskelværdien 2346. Hvis pakkestørrelsen er større end den indstillede grænse, sender routeren anmodninger om at sende til en bestemt modtagestation og aftaler afsendelse af en dataramme, eller pakken sendes straks."
            }, {
                type: "name",
                title: "DTIM-interval",
                content: "Indtast en værdi mellem 1 og 255 for at bestemme intervallet for DTIM (Delivery Traffic Indication Message). 1 angiver at DTIM-intervalet er den samme som statusintervalet."
            }, {
                type: "name",
                title: "Opdateringsinterval for gruppenøgle",
                content: "Indtast antallet af sekunder (minimum 30) for at kontrollere tidsintervallet for krypteringsnøglens automatiske fornyelse. Standardværdien er 0, hvilket angiver ingen fornyelse af nøglen."
            }, {
                type: "name",
                title: "WMM-funktioner",
                content: "Funktionen WMM (Wi-Fi multi-media) garanterer at pakkerne med højprioritetsmeddelelser sendes fortrinsvis. Det kan varmt anbefales og er aktiveret som standard."
            }, {
                type: "name",
                title: "Kort GI-funktion",
                content: "Denne funktion øger datakapaciteten ved at reducere GI-tiden (Guard Interval). Det kan anbefales og er aktiveret som standard."
            }, {
                type: "name",
                title: "AP isolationsfunktion",
                content: "Marker dette afkrydsningsfelt for at aktivere funktionen AP-isolation, der giver dig mulighed for at begrænse og indskrænke alle trådløse enheder på netværket fra at kunne interagere med hinanden, men stadig få adgang til internettet. AP-isolation er som standard deaktiveret."
            }, {
        		display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Funktion til retfærdig deling af sendetid",
                "content": "Marker dette afkrydsningsfelt for at aktivere Funktion til retfærdig deling af sendetid eller ATF (ATF - Airtime Fairness Feature), som giver dig mulighed for at optimere gennemløb af hvert flow. ATF-trafikstyring anvender sendetid pr. destination til at afbalancere brug af sendetid på tværs af flow-destinationer."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Funktion til flerbruger-MIMO",
                "content": "Klik på Aktiver for at bruge Funktion til flerbruger-MIMO."
			},  {
				"type": "name",
				"title": "USB 3.0 Interferensreduktion",
				"content": "Klik på Aktiver for at nedbringe USB 3.0 interferens."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Aktiverer WPS",
                content: "Slå til for at aktivere funktionen WPS."
            }, {
                type: "paragraph",
                content: "Klik på Gem for at gemme dine indstillingerne."
            }, {
                type: "title",
                title: "Lysdiode"
            }, {
                type: "name",
                title: "Nattilstand",
                content: "Når denne funktion er aktiveret, slukkes routerens lysdioder automatisk i den angivne tidsperiode."
            }, {
                type: "name",
                title: "Tidsperiode",
                content: "Indtast en tidsperiode, hvor routerens lysdioder være slukket."
            }, {
                type: "paragraph",
                content: "Klik på Gem for at gemme dine indstillingerne."
            }, {
					display: "$.routerMode == 'Router'",
                type: "title",
                title: "Indstillinger for DoS-beskyttelse"
            }, {
					display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "DoS -beskyttelsesniveauet beskytter routeren fra overbelastningsangreb fra TCP-SYN-Flood, UDP-Flood, og ICMP-Flood."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "ICMP-FLOOD Pakkeniveau",
                content: "Indtast en værdi mellem 5 og 3600 for at udløse ICMP-FLOOD beskyttelsen umiddelbart, når antallet af ICMP-pakker overskrider den indstillede tærskelværdi."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "UDP-FLOOD Pakkeniveau",
                content: "Indtast en værdi mellem 5 og 3600 for at udløse UDP-FLOOD beskyttelsen umiddelbart, når antallet af UDP-pakker overskrider den indstillede tærskelværdi."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "TCP-FLOOD Pakkeniveau",
                content: "Indtast en værdi mellem 5 og 3600 for at udløse TCP-SYN-FLOOD beskyttelsen umiddelbart, når antallet af TCP-SYN-pakker overskrider den indstillede tærskelværdi."
            }, {
					display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Klik på Gem for at gemme dine indstillingerne."
            }]
        },
        logConf: {
            TITLE: "Indstillinger for log",
            CONTENT: [{
                type: "name",
                title: "Gem lokalt",
                content: "Vælg at gemme logfiler til den lokale hukommelse.",
                children: [{
                    type: "name",
                    title: "Minimalt niveau",
                    content: "Vælg det mindste niveau i rullelisten og registrer derefter alle loggede hændelser over eller lig med at det valgte niveau vil blive gemt."
                }]
            }, {
                type: "name",
                title: "Gem eksternt",
                content: "Vælg for at sende logfiler til den angivne IP-adresse og UDP-port for den eksterne systemlogserver.",
                children: [{
                    type: "name",
                    title: "Minimalt niveau",
                    content: "Vælg det mindste niveau i rullelisten og registrer derefter alle loggede hændelser over eller lig med at det valgte niveau vil blive gemt."
                }, {
                    type: "name",
                    title: "Server-IP",
                    content: "Angiv IP-adressen på den eksterne systemlog-server som hændelser vil blive sendt til."
                }, {
                    type: "name",
                    title: "Serverport",
                    content: "Angiv portnummeret på den eksterne systemlog-server som hændelser vil blive sendt til."
                }, {
                    type: "name",
                    title: "Lokalt facilitetsnavn",
                    content: "Vælg det lokale lokalitetesnavn ifølge din eksterne servers lokalitetesnavn."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Trådløs",
            CONTENT: [{
                type: "name",
                title: "Sikkerhed",
                content: "Du kan vælge en af følgende sikkerhedsmuligheder. ",
                children: [{
                    type: "name",
                    title: "Ingen sikkerhed",
                    content: "De trådløse stationer vil oprette forbindelse til routeren uden kryptering. Det anbefales kraftigt at vælge en af de følgende tilstande for at aktivere sikkerhed."
                }, {
                    type: "name",
                    title: "WPA/WPA2-personlig",
                    content: "Vælg WPA baseret på forhånsdelt adgangsord.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Du kan vælge en af følgende versioner",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Vælg WPA-PSK eller WPA2-PSK automatisk, baseret på den trådløse stations formåen og anmodning."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Forhåndsdelt nøgle for WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan vælge enten Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Trådløs adgangskode",
                        content: "Du kan indtaste ASCII eller hexadecimale tegn. For hexadecimal, skal længden være mellem 8 og 64 tegn; for ASCII, skal længden være mellem 8 og 63 tegn."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Vælg WPA baseret på Radius-server.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Du kan vælge en af følgende versioner",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Vælg WPA eller WPA2 automatisk, baseret på den trådløse stations formåen og anmodning."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "WPA (Wi-Fi Protected Access). "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA version 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan vælge enten Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Radius server-IP",
                        content: "Indtast IP-adressen på Radius-serveren."
                    }, {
                        type: "name",
                        title: "Radius-port",
                        content: "Indtast portnummeret som radius anvendes."
                    }, {
                        type: "name",
                        title: "Radius-adgangskode",
                        content: "Indtast adgangskoden for Radius-serveren."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Vælg 802.11 WEP-sikkerhed.",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Du kan vælge en af følgende typer",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Vælg delt nøgle eller godkendelsetypen Åbent system automatisk, baseret på den trådløse stations formåen og anmodning."
                        }, {
                            type: "name",
                            title: "Delt nøgle",
                            content: "Vælg 802.11 Delt nøgle godkendelse."
                        }, {
                            type: "name",
                            title: "Åbent system",
                            content: "Vælg 802.11 Åbent system godkendelse. "
                        }]
                    }, {
                        type: "name",
                        title: "Nøgle valgt",
                        content: "Vælg hvilken af de fire nøgler der bliver brugt."
                    }, {
                        type: "name",
                        title: "Format af WEP-nøgle",
                        content: "Du kan vælge ASCII eller hexadecimalt format. ASCII-format står for alle kombinationer af tastaturtegn i den angivne længde. Hexadecimalt format står for enhver kombination af hexadecimale cifre (0-9, a-f, A-F) i den angivne længde."
                    }, {
                        type: "name",
                        title: "Nøgletype",
                        content: "Du kan vælge WEP-nøglens længde (64-bit eller 128-bit eller 152-bit.) for kryptering. \"Deaktiveret\" betyder at denne WEP-nøglepost er ugyldig.",
                        children: [{
                            type: "name",
                            title: "For 64-bit-kryptering",
                            content: "Du kan indtaste 10 hexadecimale cifre (enhver kombination af 0-9, a-f, A-F, og null-nøgle er ikke tilladt) eller 5 ASCII-tegn."
                        }, {
                            type: "name",
                            title: "For 128-bit-kryptering",
                            content: "Du kan indtaste 26 hexadecimale cifre (enhver kombination af 0-9, a-f, A-F, og null-nøgle er ikke tilladt) eller 13 ASCII-tegn."
                        }, {
                            type: "name",
                            title: "For 152-bit-kryptering",
                            content: "Du kan indtaste 32 hexadecimale cifre (enhver kombination af 0-9, a-f, A-F, og null-nøgle er ikke tilladt) eller 16 ASCII-tegn. "
                        }]
                    }, {
                        type: "name",
                        title: "Nøgleværdi",
                        content: "Indtast adgangskoden for WEP"
                    }]
                }]
            }, {
                type: "name",
                title: "Tilstand",
                content: "Dette felt angiver den trådløse tilstand som routeren fungerer på."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Båndbredden af den trådløse kanal."
            }, {
                type: "name",
                title: "Kanal",
                content: "Dette felt bestemmer, hvilke driftsfrekvens der bliver brugt. Det er ikke nødvendigt at ændre den trådløse kanal, med mindre du opdager problemer med interferens med andre adgangspunkter i nærheden. Hvis du vælger Auto, så vil AP automatisk vælge den bedste kanal."
            }, {
                type: "name",
                title: "Transmissionsstyrke",
                content: "Her kan du angive routerens sendeeffekt. Du kan vælge Høj, Middel eller Lav, efter ønske. Standardindstillingen er Høj or er den anbefalede. "
            }, {
                type: "paragraph",
                content: "Klik på Gem for at <strong>gemme</strong> og anvende konfigurationen."
            }]
        },
        diagnostic: {
            TITLE: "Fejlfindingsværktøj",
            CONTENT: [{
                type: "paragraph",
                content: "Routeren har Ping- og Traceroute-værktøjer til at hjælpe dig med at fejlfinde problemer med netværksforbindelsen. Ping-værktøjet sender pakker til en IP-adresse eller et domænenavn og logger resultaterne, f. eks. antallet af pakker, der er sendt og modtaget, og tur-returtiden. Traceroute-værktøjet sender pakker til en IP-adresse eller domænenavn og viser antallet af hop og tiden for at nå destinationen."
            }, {
                type: "paragraph",
                content: "Du kan bruge ping og traceroute på et netværk ved hjælp af IP-adressen eller et domænenavn, såsom google.com, msn.com, yahoo.com, aol osv. osv."
            }, {
                type: "note",
                title: "Sådan diagnosticerer man ved hjælp af Ping",
                content: [
                    "Indtast IP-adressen eller domænenavnet du ønsker at nå.",
                    "Klik på pilen for at åbne menuen Avanceret og angive Ping-tælleren, og Ping-pakkestørrelsen. (Valgfri)",
                    "Klik på Start."
                ]
            }, {
                type: "note",
                title: "Sådan diagnosticerer man ved hjælp af Traceroute",
                content: [
                    "Indtast IP-adressen eller domænenavnet du ønsker at nå.",
                    "Klik på pilen for at åbne menuen Avanceret og angive antallet af hop (der skal nås) i feltet Traceroute Max TTL (Time to Live). Standardværdien er 20. (Valgfri) ",
                    "Klik på Start."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC-adresse",
                content: "Den unikke fysiske adresse af routeren."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "LAN IPv4",
                content: "Behold routers standard IP-adresse (192.168.0.1) eller indtast en ny. Denne IP-adresse kan bruges til at logge ind på routerens administrationsside."
            }, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "Adressetype",
					"content": "Sådan konfigurerer du routerens IP-adresse. Du kan konfigurere den manuelt (Statisk IP) eller automatisk (Smart DHCP)."
				}, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "LAN-IP",
					"content": "Behold routers standard IP-adresse (192.168.0.254) eller indtast en ny. Denne IP-adresse kan bruges til at logge ind på routerens administrationsside."
				}, {
                type: "name",
                title: "Undernetmaske",
                content: "Vælg en tilknyttet identifikator, som benyttes af LAN-porten til at rute intern og ekstern trafik fra rullelisten, eller indtast et nyt undernetmaske format. Standardværdien er 255.255.255.0."
            }, {
					display: "$.routerMode == 'Router'",
                type: "name",
                title: "IGMP Snooping",
                content: "IGMP (Internet Group Management Protocol) bruges til at administrere multicasting på TCP/IP-netværk. Nogle internetudbydere bruger IGMP til at udføre fjernkonfiguration af klientenheder, såsom routeren. Det er som standard aktiveret."
            }, {
					display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Bemærk",
                content: "Hvis den nye internet-IP-adresse ikke er i det samme undernet som den gamle, vil IP-adressegruppen i DHCP-serveren automatisk blive ændret; men den virtuelle server og DMZ-hosten vil ikke træde i kraft, før de omkonfigureres."
                }, {
					display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
					type: "title",
					content: "Sammenlægning af link"
				}, {
					display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
					type: "paragraph",
					content: "Sammenlægning af link kombinerer to porte for at lave en enkelt sti med stor båndbredde, således at et hurtigere og mere stabilt netværk opretholdes."
				}, {
					display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
					type: "note",
					title: "Sådan anvendes sammenlægning af link",
					content: [
						"Slå til for at aktivere funktionen Sammenlægning af link.",
						"Vælg tilstanden for sammenlægning af link.<br><b> LACP aktiv:</b> aktiverer LACP (Link Aggregation Control Protocol) betingelsesløst.<br><b> LACP passiv:</b> aktiverer kun LACP når en LACP-enhed registreres.",
						"Angiv to porte for sammenlægning af link.",
						"Klik på Save (Gem)."
					]
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                title: "SPI-firewall",
                content: "SPI (Stateful Packet Inspection) firewall forhindrer cyberangreb og validerer den trafik, der passerer gennem routeren. SPI Firewall er aktiveret som standard. "
            }, {
                type: "title",
                title: "DoS beskyttelse"
            }, {
                type: "name",
                title: "DoS beskyttelse",
                content: "DoS (Denial of Service)-beskyttelse beskytter dit internet mod DoS-angreb fra at overbelaste dit netværk med serveranmodninger. Som standard er DoS-beskyttelsen deaktiveret (Slukket)."
            }, {
                type: "name",
                title: "ICMP-FLOOD angrebsfiltrering",
                content: "Aktiver for at forhindre ICMP (Internet Control Message Protocol) overbelastningsangreb."
            }, {
                type: "name",
                title: "UDP-FLOOD angrebsfiltrering",
                content: "Aktiver for at forhindre UDP (User Datagram Protocol) overbelastningsangreb."
            }, {
                type: "name",
                title: "TCP-FLOOD angrebsfiltrering",
                content: "For at undgå TCP-SYN (Transmission Control Protocol-Synchronize) overbelastningsangrebet.",
                children: [{
                    type: "name",
                    title: "Slukket",
                    content: "Ingen beskyttelse."
                }, {
                    type: "name",
                    title: "Lav",
                    content: "Beskyttelse på lavt niveau og lav indflydelse på routerens ydelse."
                }, {
                    type: "name",
                    title: "Midt",
                    content: "Beskyttelse på middelniveau og middel indflydelse på routerens ydelse."
                }, {
                    type: "name",
                    title: "Høj",
                    content: "Beskyttelse på højt niveau med bemærkelsesværdig indflydelse på routerens ydelse."
                }]
            }, {
                type: "name",
                title: "Forbyd LAN-ping",
                content: "Aktiverer for at forbyde ping fra LAN-porte."
            }, {
                type: "name",
                title: "Forbyd WAN-ping",
                content: "Aktiverer for at forbyde ping fra WAN-porte."
            }, {
                type: "title",
                title: "Blokeret DoS host-liste"
            }, {
                type: "name",
                title: "Blokeret DoS host-liste",
                content: "List IP-adressen og MAC-adressen fra blokerede DoS angrebskilder."
            }, {
                type: "name",
                title: "Sådan slettes en eller flere poster",
                content: "Vælg den post eller poster, som du ønsker at slette i host-listen og klik på Slet over tabellen."
            }]
        },
        ipv6: {
            TITLE: "IPv6 Internet",
            CONTENT: [{
                type: "name",
                title: "Aktiver IPv6",
                content: "Vælg for at aktivere (On) eller deaktivere (Off) routerens IPv6-funktion."
            }, {
                type: "title",
                title: "Internetforbindelsestype: Statisk IP"
            }, {
                type: "name",
                title: "Statisk IP",
                content: "Vælg denne type, hvis din internetudbyder bruger tildeling af statiske IPv6-adresser."
            }, {
                type: "name",
                title: "IPv6-adresse/IPv6 standard gateway/IPv6 DNS-server/sekundær IPv6 DNS-server",
                content: "Indtast disse parametre fra din internetudbyder."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Rediger ikke standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
            }, {
                type: "title",
                title: "Internetforbindelsestype: Dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Vælg denne type, hvis din internetudbyder bruger tildeling af dynamiske IPv6-adresser."
            }, {
                type: "name",
                title: "IPv6-adresse/IPv6-gateway",
                content: "Disse parametre tildeles automatisk af DHCPv6-serveren fra din internetudbyder."
            }, {
                type: "name",
                title: "Adresseringstype",
                content: "Vælg forbindelsestypen for IPv6-forbindelsen."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Standard og typisk størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1500 bytes. Rediger ikke standard MTU-størrelsen medmindre dette kræves af internetudbyderen."
            }, {
                type: "name",
                title: "Brug følgende IPv6 DNS-adresse",
                content: "Marker dette afkrydsningsfelt og indtast DNS serveradressen(erne)  i punktumformat, som angivet af din internetudbyder. Dette WAN-interface vil bruge den angivne DNS-server for prioritet."
            }, {
                type: "name",
                title: "Navn på host",
                content: "Angiv en værdi i dette felt for at angive routerens host-navn."
            }, {
                type: "title",
                title: "Internetforbindelsestype: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Vælg denne type, hvis din internetudbyder bruger PPPoEv6, og giver dig et brugernavn og adgangskode."
            }, {
                type: "name",
                title: "Brugernavn/adgangskode /bekræft adgangskode",
                content: "Indtast disse parametre fra din internetudbyder."
            }, {
                type: "name",
                title: "Adresseringstype",
                content: "Vælg forbindelsestypen for IPv6-forbindelsen."
            }, {
                type: "name",
                title: "Navn på tjeneste",
                content: "Indtast tjenestenavnet fra din internetudbyder. Hvis du ikke fik et sådant, så skal du lade feltet stå tomt."
            }, {
                type: "name",
                title: "Servernavn",
                content: "Indtast servernavnet fra din internetudbyder. Hvis du ikke fik et sådant, så skal du lade feltet stå tomt."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Den typiske størrelse af MTU (Maximum Transmission Unit) for de fleste Ethernet-netværk er 1480 bytes.",
                children: [{
                    type: "paragraph",
                    content: "<b>Bemærk</b>: I sjældne tilfælde, vil din internetudbyder bede dig om at justere MTU-størrelse for bedre ydelse af netværket. Du bør ikke ændre værdien, medmindre det er absolut nødvendigt."
                }]
            }, {
                type: "name",
                title: "Brug den IPv6-information som internetudbyderen specificerer",
                content: "Marker dette afkrydsningsfelt og indtast den IP-adresse og gateway, din internetudbyder gav dig."
            }, {
                type: "name",
                title: "Brug følgende IPv6 DNS-adresse",
                content: "Vælg dette hvis du ønsker manuelt at indtast DNS-adressen, som din internetudbyder gav dig. Hvis det ikke er markeret, vil routeren hente DNS-adressen dynamisk fra din internetudbyder."
            }, {
                type: "title",
                title: "Internetforbindelsestype: 6to4-tunnel"
            }, {
                type: "name",
                title: "6to4-tunnel",
                content: "Vælg denne type, hvis din internetudbyder bruger 6to4 implementering til at tildele adresser."
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "Adresseringstype",
                content: "Vælg den ønskede, som anbefalet af din internetudbyder.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Vælg denne indstilling for at tildele IPv6-adresser til computerne på dit LAN via RADVD.",
                    children: [{
                        type: "name",
                        title: "Aktiverer RDNSS",
                        content: "Marker dette afkrydsningsfelt for at aktivere funktionen RDNSS."
                    }, {
                        type: "name",
                        title: "Aktiver ULA-præfiks",
                        content: "Marker dette afkrydsningsfelt for at aktivere funktionen ULA-præfiks.",
                        children: [{
                            type: "name",
                            title: "ULA-præfiks",
                            content: "Indtast præfikset for ULA."
                        }, {
                            type: "name",
                            title: "Længde af ULA-præfiks",
                            content: "Indtast præfikslændge for ULA. Standardværdien er 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6-server",
                    content: "Sådan tildeles IP-adresser automatisk til klienter på internettet.",
                    children: [{
                        type: "name",
                        title: "Start IPv6-adresse",
                        content: "Indtast start IPv6 adressen."
                    }, {
                        type: "name",
                        title: "Slut IPv6-adresse",
                        content: "Indtast slut IPv6 adressen."
                    }, {
                        type: "name",
                        title: "Låneperiode",
                        content: "Angiv den periode, hvor en DHCP-klient kan lease sin nuværende dynamiske IPv6-adresse tildelt af routeren. Efter at den dynamiske IPv6-adresse er udløbet, tildeles brugeren automatisk en ny dynamisk IPv6-adresse. Standardværdien er 86400 sekunder."
                    }]
                }]
            }, {
                type: "name",
                title: "Type af webstedspræfiks",
                content: "Vælg en type for at tildele præfikset til IPv6-adresser. Delegeret og statisk findes."
            }, {
                type: "name",
                title: "Delegeret",
                children: [{
                    type: "name",
                    title: "Præfiksdelegeret WAN-forbindelse",
                    content: "Vælg en WAN-forbindelse fra rullelisten for at tildele præfiks."
                }]
            }, {
                type: "name",
                title: "Statisk",
                children: [{
                    type: "name",
                    title: "Webstedspræfiks",
                    content: "Indtast en værdi for webstedspræfikset."
                }, {
                    type: "name",
                    title: "Længde af webstedspræfiks",
                    content: "Indtast en værdi for længden af webstedspræfikset."
                }]
            }]
        },
        openvpnServer: {
            TITLE: "OpenVPN",
            CONTENT: [{
                type: "name",
                title: "Aktiver VPN-server",
                content: "Marker dette afkrydsningsfelt for at aktivere OpenVPN-serveren."
            }, {
                type: "name",
                title: "Tjenestetype",
                content: "Vælg kommunikationsprotokollen for OpenVPN serveren: UDP eller TCP."
            }, {
                type: "name",
                title: "Tjenesteport",
                content: "Angiv en kommunikationsport mellem 1024 og 65535. Standard og fælles tjenesteport er 1194."
            }, {
                type: "name",
                title: "VPN-undernet/Netmaske",
                content: "Angiv intervallet af IP-adresser, som kan leases til klienterne af OpenVPN-serveren."
            }, {
                type: "name",
                title: "Klientadgang",
                content: "Vælg adgangstypen for din OpenVPN-klient."
            }, {
                type: "name",
                title: "Kun hjemmenetværk",
                content: "Klienter kan kun få adgang til routeren og internettet. Klientens standardrute vil ikke ændres."
            }, {
                type: "name",
                title: "Internet og hjemmenetværk",
                content: "Klienter kan få adgang til routeren, LAN og Internettet. Klientens standardrute vil blive ændret."
            }, {
                type: "paragraph",
                content: "Klik på Gem for at gemme alle dine indstillingerne."
            }, {
                type: "title",
                content: "Certifikat"
            }, {
                type: "paragraph",
                content: "Anvend certifikatet for oplysninger og identitet af VPN-forbindelsen til fjerncomputeren."
            }, {
                type: "name",
                title: "Opret",
                content: "Klik for at oprette et nyt certifikat."
            }, {
                type: "title",
                content: "Konfigurationsfil"
            }, {
                type: "name",
                title: "Eksporter",
                content: "Klik på denne knap for at gemme den OpenVPN-konfigurationsfil, der skal bruges til at tilføje en ny VPN-forbindelse."
            }, {
                type: "title",
                content: "Installationsvejledning for VPN-klient"
            }, {
                type: "step",
                title: "Sådan aktiveres og tilsluttes din klientenheder til OpenVPN-serveren:"
            }, {
                type: "paragraph",
                content: "Før du kan konfigurere OpenVPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Sørg for at din eksterne port for NAT-indstillingerne ikke er serviceporten og at din systemklokke er synkroniseret med internettet."
            }, {
                type: "step",
                title: "",
                content: [
                    "Vælg Aktiver VPN-server.",
                    "Konfigurere OpenVPN-serverens parametre (servicetype, tjenesteport og klientadgang) og klik på Gem.",
                    "Klik på Eksporter for at gemme konfigurationsfilen.",
                    "På dine klientenheder, skal du downloade og installere OpenVPN-klientværktøjet  fra <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> De officielt understøttede platforme inkluderer Windows, Mac OSX og Linux.",
                    "Start af OpenVPN-klientværktøjet og tilføje en ny VPN-forbindelse ved hjælp af den gemte konfigurationsfil for at tilslutte enheden til VPN-serveren."
                ]
            }, {
                type: "paragraph",
                title: "Bemærk:",
                content: "Få mere at vide om OpenVPN-klienter, besøg <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
        },
        pptpvpnServer: {
            TITLE: "PPTP VPN",
            CONTENT: [{
                type: "name",
                title: "Aktiver VPN-server",
                content: "Marker dette afkrydsningsfelt for at aktivere PPTP VPN-serveren."
            }, {
                type: "name",
                title: "Klient IP-adresse",
                content: "Angiv intervallet af IP-adresser (op til 10 klienter), som kan leases til klienterne af PPTP VPN-serveren."
            }, {
                type: "name",
                title: "Brugernavn og adgangskode",
                content: "Indtast brugernavn og adgangskode for at godkende klienter til PPTP VPN-serveren."
            }, {
                type: "paragraph",
                content: "Klik på Gem for at gemme alle dine indstillingerne."
            }, {
                type: "title",
                content: "Installationsvejledning for VPN-klient"
            }, {
                type: "step",
                title: "Sådan aktiveres og tilsluttes din klientenheder til PPTP VPN-serveren:"
            }, {
                type: "paragraph",
                content: "Før du kan konfigurere PPTP VPN-serveren, skal du konfigurere dynamisk DNS-Service (anbefales) eller tildele en statisk IP-adresse til WAN-porten. Sørg for at din eksterne port for NAT-indstillingerne ikke er 1723 og at din systemklokke er synkroniseret med internettet."
            }, {
                type: "step",
                title: "",
                content: [
                    "Vælg Aktiver VPN-server.",
                    "Konfigurer PPTP VPN-serverens parametre og klik på Gem.",
                    "På dine klientenheder, kan du oprette en PPTP VPN-forbindelse. De officielt understøttede platforme inkluderer Windows, Mac OSX, Linux, iOS, og Android.",
                    "Start PPTP VPN-programmet, tilføje en ny forbindelse og indtast domænenavnet på den registrerede DDNS-tjeneste eller den statiske IP-adresse, som er tildelt WAN-porten, for at tilslutte enheden til PPTP VPN-serveren."
                ]
            }]
        },
        vpnServerStatus: {
            TITLE: "VPN-forbindelser",
            CONTENT: [{
                type: "paragraph",
                content: "Denne side viser de klienter, der i øjeblikket er tilknyttet til OpenVPN og PPTP VPN-servere hostet på routeren."
            }, {
                type: "paragraph",
                content: "Klik på minus-ikonet for at frakoble den tilsvarende klient."
            }]
        },
        cloudBasic: {
            TITLE: "TP-Link Sky",
            CONTENT: [{
                type: "paragraph",
                content: "TP-Link sky-service giver dig mulighed for at fjernovervåge dit netværk i realtid, få adgang til og administrere dit TP-Link udstyr fra internettet, når som helst og hvor som helst."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Kontooplysninger"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Viser din TP-Link ID-oplysninger. Du kan redigere kontooplysningerne ved at klikke på ikonet Rediger."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Enhedsoplysninger"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Viser oplysningerne om din enhed, herunder skykontoen der styrer enheden."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Bundne konti"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Denne tabel viser alle de skykonti, der i øjeblikket er bundet til enheden."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Sådan bindes en brugerkonto",
                content: [
                    "Klik på Bind.",
                    "Indtast den registrerede e-mail, du vil binde.",
                    "Klik på Save (Gem)."
                ]
            }]
        }
    };
})(jQuery);
