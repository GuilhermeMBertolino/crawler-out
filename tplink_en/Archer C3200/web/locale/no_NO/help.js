(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Båndbreddekontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Båndbreddekontroll tillater deg å konfigurere nettverkets oppstrøms- og nedstrømsbåndbredde, og den kombinerte gjennomstrømningen bør ikke overskride 1000000 Kbps. For optimal båndbreddekontroll, velg riktig linjetype og konsulter med din ISP for den totale tillatte båndbredden for oppstrøm og nedstrøm."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Velg avmerkingsboksen for å aktivere funksjonen for båndbreddekontroll."
            }, {
                type: "name",
                title: "Total oppstrømsbåndbredde ",
                content: "Skriv inn den totale opplastingshastigheten gjennom WAN-porten."
            }, {
                type: "name",
                title: "Total nedstrømsbåndbredde",
                content: "Skriv inn den totale nedlastingshastigheten gjennom WAN-porten."
            }, {
                type: "title",
                content: "Kontrollering av regler"
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser det kontrollerte IP-området eller portområdet."
            }, {
                type: "name",
                title: "Prioritet",
                content: "Viser regelens prioritetsnivå, hvor 1 er høyeste prioritetsnivå og 8 er laveste prioritetsnivå. Den totale opplastings- og nedlastingsbåndbredden vil bli tildelt for å garantere en minimumssats for alle regler for kontrollering av båndbredde."
            }, {
                type: "name",
                title: "Opp (min/maks) ",
                content: "Viser minimum og maksimum opplastingsbåndbredde i Kbps."
            }, {
                type: "name",
                title: "Ned (min/maks)",
                content: "Viser minimum og maksimum nedlastingsbåndbredde i Kbps."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Indikerer gjeldende regelstatus. Trykk på Lyspæreikonet for å aktivere eller deaktivere regelen."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å endre eller slette korresponderende regel."
            }, {
                type: "note",
                title: "For å legge til en ny regel",
                content: [
                    "Klikk Legg til. ",
                    "Skriv inn et område av IP-adresser som skal bli kontrollert.",
                    "Skriv inn et område av portnumre som skal bli kontrollert.",
                    "Velg protokolltype for denne regelen.",
                    "Velg prioritetsnivå for denne regelen. (1 er det høyeste prioritetsnivået.)",
                    "Skriv inn minimum og maksimum opplastingsbåndbredde (i Kbps) gjennom WAN-porten.",
                    "Skriv inn minimum og maksimum nedlastingsbåndbredde (i Kbps) gjennom WAN-porten.",
                    "Velg Aktiver denne oppføringen.",
                    "Klikk på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere regler</strong><br>i listen for Kontrollering av regler, velg gjeldende avmerkingsboks for reglene som skal bli slettet, og trykk Slett ovenfor tabellen."
            }]
        },
        accessControl: {
            TITLE: "Tilgangskontroll",
            CONTENT: [{
                type: "paragraph",
                content: "Tilgangskontroll blir brukt for å tillatte eller blokkere spesifikke datamaskiner og andre enheter fra å få tilgang til nettverket ditt. Når en enhet blir blokkert, kan den få en IP-adresse fra ruteren, men ikke kommunisere med andre enheter for å koble til Internett. "
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong>For å bruke tilgangskontroll, aktiver denne funksjonen og følg trinnene i programveiledningen. Hvis tilgangskontroll er deaktivert (Av), kan alle enheter få tilgang til nettverket ditt, inkludert de på svartelisten."
            }, {
                type: "name",
                title: "Tilgangskontroll",
                content: "Skru På for å aktivere funksjonen for tilgangskontroll."
            }, {
                type: "title",
                content: "Tilgangspunkt-modus"
            }, {
                type: "name",
                title: "Inkluder i svarteliste",
                content: "Velg for å blokkere tilgang for enhetene i listen nedenfor."
            }, {
                type: "name",
                title: "Hviteliste",
                content: "Velg for å bare tillate tilgang for enhetene i listen nedenfor."
            }, {
                type: "title",
                content: "Enheter i Svarte/Hvitelisten"
            }, {
                type: "note",
                title: "<strong>For å svarteliste eller hviteliste en enhet</strong>",
                content: [
                    "Klikk på Legg til-ikonet.",
                    "Skriv inn Enhetsnavnet.",
                    "Skriv inn MAC-adressen til enheten.",
                    "Klikk på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å endre eller slette en enhet i Svarte/Hvitelisten</strong><br>I tabellen for Svarte/Hvitelisten, klikk på Endre-ikonet eller Papirkurv-ikonet som samsvarer med enheten du ønsker å endre eller slette."
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere enheter i Svarte/Hvitelisten</strong><br>I tabellen for Svarte/Hvitelisten, velg alle enhetene du ønsker å slette, og klikk Slett ovenfor tabellen."
            }, {
                type: "title",
                content: "Påloggede enheter"
            }, {
                type: "name",
                title: "Enhetsnavn",
                content: "Viser navnet til den tilkoblede enheten."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser IP-adressen til den tilkoblede enheten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen til den tilkoblede enheten."
            }, {
                type: "name",
                title: "Tilkoblingstype",
                content: "Viser tilkoblingstypen til den tilkoblede enheten, enten kabelbasert eller trådløs. "
            }, {
                type: "paragraph",
                content: "<strong>For å blokkere én eller flere enheter</strong><br>I tabellen for Påloggede enheter, velg alle enhetene du ønsker å blokkere, og klikk Blokker ovenfor tabellen. De valgte enhetene vil automatisk bli lagt til i Enhetene på Svartelisten."
            }]
        },
        arpBind: {
            TITLE: "Innstillinger",
            CONTENT: [{
                type: "paragraph",
                content: "IP- og MAC-binding (også kjent som ARP-binding) er nyttig for å kontrollere tilgangen til en spesifikk datamaskin i LAN-et ved å binde sammen IP-adressen og MAC-adressen til enheten. IP- og MAC-binding hindrer også andre enheter fra å bruke en spesifikk IP-adresse."
            }, {
                type: "name",
                title: "IP- og MAC-binding",
                content: "Skru På for å aktivere funksjonen for IP- og MAC-binding."
            }, {
                type: "title",
                title: "Bindeliste"
            }, {
                type: "note",
                title: "<strong>For å sette opp en enhet med ARP-binding</strong>",
                content: [
                    "Klikk Legg til.",
                    "Skriv inn MAC-adressen til enheten.",
                    "Skriv inn en IP-adresse som du ønsker å binde til MAC-adressen ovenfor.",
                    "Velg aktiver.",
                    "Klikk på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å endre eller slette en oppføring</strong><br>I bindelisten, klikk på Endre-ikonet eller Papirkurv-ikonet som samsvarer med oppføringen du ønsker å endre eller slette."
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere oppføringer</strong><br>I Bindelisten, velg oppføringene du ønsker å slette, og klikk Slett ovenfor tabellen."
            }, {
                type: "title",
                title: "ARP-liste"
            }, {
                type: "paragraph",
                content: "Viser MAC- og IP-adressene til de gjeldende tilkoblede enhetene."
            }, {
                type: "name",
                title: "Enhetsnavn",
                content: "Viser navnet til den tilkoblede enheten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen til den tilkoblede enheten."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser IP-adressen som den tilkoblede enheten har blitt tildelt."
            }, {
                type: "name",
                title: "Bundet",
                content: "Indikerer om MAC- og IP-adressene er bundet eller ikke."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser innstillinger for å slette den samsvarende oppføringen fra listen."
            }, {
                type: "paragraph",
                content: "<strong>Merknad: </strong>Du kan ikke binde den samme IP-adressen til flere enn én MAC-adresse."
            }, {
                type: "paragraph",
                content: "<strong>For å binde flere enheter</strong><br>I ARP-listen, velg enhetene du ønsker at skal binde IP-adressene sammen med MAC-adressene, og klikk Bind ovenfor tabellen."
            }]
        },
        alg: {
            TITLE: "Application Layer Gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG tillater at tilpassede traveringsfiltre for Network Address Translation (NAT) kan bli koblet til gatewayen for å støtte adresse- og portkonvertering for «kontroll/data»-protokoller til bestemte programlag: FTP, TFTP, H323 osv. Det er anbefalt å aktivere ALG."
            }, {
                type: "name",
                title: "Gjennomgang av PPTP",
                content: "Velg avmerkingsboksen for å aktivere funksjonen for gjennomgang av PPTP for å tillate at punkt-til-punkt-økter kan bli tunnelert gjennom et IP-nettverk og gå gjennom ruteren."
            }, {
                type: "name",
                title: "Gjennomgang av L2TP",
                content: "Velg avmerkingsboksen for å aktivere funksjonen for gjennomgang av L2TP for å tillate at punkt-til-punkt-økter for Lag 2 kan bli tunnelert gjennom et IP-nettverk og gå gjennom ruteren."
            }, {
                type: "name",
                title: "IPSec-gjennomgang",
                content: "Velg avmerkingsboksen for å aktivere funksjonen for gjennomgang av IPSec for å tillate at Internett-protokollsikkerhet (IPSec) kan bli tunnelert gjennom et IP-nettverk og gå gjennom ruteren. IPSec bruker kryptografiske sikkerhetstjenester for å forsikre privat og sikker kommunikasjon på IP-nettverk."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Velg avmerkingsboksen for å aktivere FTP ALG-funksjonen for å tillate at FTP-klienter (File Transfer Protocol) og servere kan overføre data via NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Velg avmerkingsboksen for å aktivere TFTP ALG-funksjonen for å tillate at TFTP-klienter (Trivial File Transfer Protocol) og servere kan overføre data via NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Hvis valgt, tillater det media player-klienter å kommunisere med strømmede medieservere via NAT."
            }, {
                type: "name",
                title: "H323 ALG",
                content: "Velg avmerkingsboksen for å aktivere H323 ALG-funksjonen for å tillate at Microft NetMeeting-klienter kan kommunisere via NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Velg avmerkingsboksen for å aktivere FTP ALG-funksjonen for å tillate at FTP-klienter (File Transfer Protocol) og servere kan overføre data via NAT."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre alle innstillingene dine."
            }]
        },
        virtualServer: {
            TITLE: "Virtuelle servere",
            CONTENT: [{
                type: "paragraph",
                content: "Virtuelle servere blir brukt for å sette opp offentlige tjenester på ditt lokale nettverk. En virtuel server er definert som en ekstern port, og alle forespørsler fra Internettet til disse eksterne portene vil bli omadressert til en tilordnet datamaskin, som må bli konfigurert med en statisk eller reservert IP-adresse."
            }, {
                type: "name",
                title: "Tjenestetype",
                content: " Viser navnet på den virtuelle serveren din."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser portnummeret eller et område av porter brukt av den virtuelle serveren. "
            }, {
                type: "name",
                title: "Intern IP",
                content: "Viser IP-adressen til datamaskinen som kjører tjenesteprogrammet."
            }, {
                type: "name",
                title: "Intern port",
                content: "Viser portnummeret til datamaskinen som kjører tjenesteprogrammet."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Viser protokollen brukt for tjenesteprogrammet: TCP, UDP, eller Alle (Alle protokoller støttet av ruteren)."
            }, {
                type: "name",
                title: "Status",
                content: "Indikerer gjeldende status for en virtuell server. Trykk på Lyspæreikonet for å aktivere (eller deaktivere) oppføringen av den virtuelle serveren."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å endre eller slette korresponderende regel."
            }, {
                type: "note",
                title: "<strong>For å legge til en oppføring av en virtuell server</strong>",
                content: [
                    "Klikk Legg til.",
                    "Velg et navn på grensesnittet fra rullegardinlisten.",
                    "Klikk «Se eksisterende programmer» for å velge en tjeneste fra listen for å automatisk fylle ut det passende portnummeret i feltene for ekstern og intern port. Hvis tjenesten ikke er oppført, skriv inn det eksterne portnummeret (f. eks. 21) eller et område av porter (f. eks. 21–25). La den Interne Porten stå tom hvis den er lik som den Eksterne Porten, eller skriv inn et spesifikt portnummer (f. eks. 21) hvis den Eksterne Porten er en enkel port. ",
                    "Skriv inn IP-adressen til datamaskinen som kjører tjenesteprogrammet i det prikkede desimalformatet i feltet for Intern IP. ",
                    "Velg en protokoll for tjenesteprogrammet: TCP, UDP eller Alle fra Protokollens rullegardinliste.",
                    "Velg Aktiver denne oppføringen.",
                    "Klikk på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å endre eller slette en oppføring av en virtuell server</strong><br>Klikk på Endre- eller Papirkurv-ikonet til den samsvarende oppføringen."
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere oppføringer</strong><br>Velg alle oppføringer av virtuelle servere som du ønsker å slette, klikk på Slett ovenfor tabellen."
            }, {
                type: "paragraph",
                content: "<strong>Merknad:</strong><br>Hvis din lokale vert drifter mer enn én type tilgjengelige tjenester, må du lage en virtuell server for hver tjeneste."
            }]
        },
        portTrigger: {
            TITLE: "Portutløsing",
            CONTENT: [{
                type: "paragraph",
                content: "Portutløsing blir brukt for å videresende trafikk på en spesifikk port til en spesifikk server på nettverket.  "
            }, {
                type: "name",
                title: "Program",
                content: "Viser navnet på programmet."
            }, {
                type: "name",
                title: "Utløsingsport",
                content: "Viser den utgående trafikkporten brukt til å utløse en filtreringsregel for en utgående tilkobling."
            }, {
                type: "name",
                title: "Utløsingsprotokoll",
                content: "Viser protokollen brukt for utløsingsporten. TCP, UDP, eller Alle (Alle protokoller støttet av ruteren)."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser porten eller portområdet brukt av det eksterne systemet. Et svar ved bruk av en av disse portene vil bli videresendt til PC-en som utløser denne regelen. Du kan maksimalt angi fem portgrupper (eller portinndelinger). Hver portgruppe må være separert med et komma, for eksempel: 2000–2038, 2046, 2050–2051, 2085, 3010–3030."
            }, {
                type: "name",
                title: "Ekstern protokoll",
                content: "Viser protokollen brukt for innkommende port: TCP, UDP, eller Alle (Alle protokoller støttet av ruteren)."
            }, {
                type: "name",
                title: "Status",
                content: "Indikerer gjeldende status for en oppføring av en portutløsing. Trykk på Lyspæreikonet for å aktivere (eller deaktivere) oppføringen."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å endre eller slette samsvarende oppføring."
            }, {
                type: "note",
                title: "<strong>For å sette opp en oppføring av en portutløsing</strong><br><strong>Merknad: </strong> Hver oppføring kan bare bli brukt av en vert om gangen.",
                content: [
                    "Klikk Legg til.",
                    "Velg et navn på grensesnittet fra rullegardinlisten.",
                    "Klikk «Se eksisterende programmer» for å velge et program fra listen for å automatisk fylle inn standardverdiene i de passende feltene. Hvis du ønsker å legge til et ulistet program, gå manuelt inn på Programmet, Utløsingsport, Utløsingsprotokoll, Ekstern Port og Ekstern Protokoll.<br><strong>Merknad: </strong> Oppføringer av portutløsinger kan ikke ha overlappende portområder (hvis f. eks. Oppføring 1 har portområdet 4200–4205, kan ikke Oppføring 2 ha portområdet 4203–4206).",
                    "Velg Aktiver denne oppføringen.",
                    "Klikk på OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å endre eller slette en oppføring av en portutløsing</strong><br>I tabellen, klikk på Endre-ikonet eller Papirkurv-ikonet som samsvarer med oppføringen du ønsker å endre eller slette."
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere oppføringer av portutløsinger</strong><br>I tabellen, velg alle oppføringer du ønsker å slette, og klikk Slett ovenfor tabellen."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "Vertsfunksjonen for DMZ (Demilitarized Zone) tillater at en lokal vert kan bli eksponert for Internett for en spesialtjeneste, slik som spill på Internett eller videokonferanser. I grunnen tillater DMZ at en enkelt datamaskin i LAN-et ditt åpner alle portene sine. Denne datamaskinen må være konfigurert med en statisk IP-adresse og ha deaktivert klientfunksjonen for DHCP."
            }, {
                type: "note",
                title: "<strong>For å tilordne en datamaskin eller server til å bli en DMZ-server</strong>",
                content: [
                    "Velg aktiver DMZ.",
                    "Skriv inn IP-adressen til den lokale datamaskinen som skal bli DMZ-vert.",
                    "Klikk Lagre."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Som standard vil funksjonen «Universal Plug-and-Play» (UPnP) være aktivert for å tillate at enheter, slik som datamaskiner og Internett-apparater, kan automatisk oppdage og kommunisere med hverandre på det lokale nettverket."
            }, {
                type: "name",
                title: "UPnP",
                content: "Skru På for å aktivere UPnP-funksjonen."
            }, {
                type: "title",
                content: "UPnP-tjenesteliste"
            }, {
                type: "paragraph",
                content: "Tjenestelisten for UPnP viser enhetsinformasjonen om UPnP."
            }, {
                type: "name",
                title: "Klienter totalt",
                content: "Viser det totale antall UPnP-enheter."
            }, {
                type: "name",
                title: "Tjenestebeskrivelse",
                content: "Viser en kort beskrivelse av den lokale verten som starter UPnP-forespørselen."
            }, {
                type: "name",
                title: "Ekstern port",
                content: "Viser den eksterne porten som er åpnet av den lokale verten."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Viser nettverksprotokollen som blir brukt av den lokale verten."
            }, {
                type: "name",
                title: "Intern IP-adresse",
                content: "Viser IP-adressen til den lokale verten."
            }, {
                type: "name",
                title: "Intern port",
                content: "Viser den interne porten som er åpnet av den lokale verten."
            }, {
                type: "paragraph",
                content: "Klikk <strong>Oppdater</strong> for å oppdatere serverlisten for UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Gjestenettverk",
            CONTENT: [{
                type: "paragraph",
                content: "Gjestenettverk lar deg sette opp et separat trådløst nettverk med et separat nettverksnavn (SSID) og passord som gjestene dine kan bruke for å få tilgang til Internett."
            }, {
                type: "title",
                content: "Innstillinger"
            }, {
                type: "name",
                title: "Gjør det mulig for gjester å se hverandre",
                content: "Velg denne avmerkingsboksen for å tillate at trådløse enheter på Gjestenettverket kan kommunisere med hverandre."
            }, {
                type: "name",
                title: "Gjør det mulig for gjester å få tilgang til det lokale nettverket",
                content: "Velg denne avmerkingsboksen for å tillate at trådløse enheter på Gjestenettverket får tilgang på ditt lokale nettverk."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre alle innstillingene dine."
            }, {
                type: "title",
                content: "Trådløse innstillinger"
            }, {
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Gjestenettverk",
                content: "Klikk på den samsvarende knappen for å aktivere 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gjestenettverket."
            }, {
                type: "name",
                title: "SSID for gjestenettverk",
                content: "Bruk enten standard SSID eller opprett et nytt navn med 1 til 32 tegn. Dette feltet skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Sikkerhet",
                content: "Velg et sikkerhetsalternativ for gjestenettverket:",
                children: [{
                    type: "name",
                    title: " Ingen",
                    content: "Som standard, vil sikkerheten på gjestenettverket være angitt som Ingen; alle har tilgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Konfigurer det følgende dersom dette er valgt.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Velg en sikkerhetsversjon for gjestenettverket ditt.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Dette alternativet støtter flerimplementering av standard WPA (Wi-Fi Protected Access), slik som WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Dette anbefales, ettersom alternativet støtter AES-kryptering som gir et bedre sikkerhetsnivå enn WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Velg type sikkerhetskryptering: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard. Det anbefales IKKE å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, vil WPS-funksjonen bli deaktivert."
                    }]
                }]
            }, {
                type: "name",
                title: "Passord",
                content: "Opprett et passord mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimalske tegn (0–9, a–f, A–F)."
            }, {
                type: "paragraph",
                content: "Instruksjonene for 2,4 GHz gjestenettverket ovenfor gjelder også for 5GHz-1 | 5GHz-2 gjestenettverkene."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre alle innstillingene dine."
            }]
        },
        wirelessStat: {
            TITLE: "Påloggede enheter",
            CONTENT: [{
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen til den tilordnede trådløse klienten."
            }, {
                type: "name",
                title: "Tilkoblingstype",
                content: "Viser frekvensbåndet (2,4 GHz eller 5GHz) som den trådløse klienten er tilkoblet til."
            }, {
                type: "name",
                title: "Sikkerhet",
                content: "Viser sikkerhetstypen (Ingen, WEP, WPA/WPA2-Personal, eller WPA/WPA/WPA2-Enterprise) til den tilordnede trådløse klienten."
            }, {
                type: "name",
                title: "Mottatte pakker",
                content: "Viser antall pakker mottatt av den tilordnede trådløse klienten."
            }, {
                type: "name",
                title: "Sendte pakker",
                content: "Viser antall pakker sendt av den tilordnede trådløse klienten."
            }, {
				type: "name",
				title: "Overføringshastighet",
				content: "Viser hastigheten for siste pakker mottatt av den tilordnede trådløse klienten."
			}, {
                type: "paragraph",
                content: "Klikk <strong>Oppdater</strong> for å oppdatere informasjonen på denne siden."
            }]
        },
        wirelessAdv: {
            TITLE: "Avanserte innstillinger",
            CONTENT: [{
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Velg 2,4 GHz | 5 GHz-1 | 5 GHz-2 for å angi de tilhørende avanserte trådløse innstillingene."
            }, {
                type: "name",
                title: "Signalintervall",
                content: "Skriv inn en verdi mellom 25 og 1000 i millisekunder for å bestemme avstanden mellom hvilke signalpakker som blir send ut av ruteren for å synkronisere det trådløse nettverket. Standarden er 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-terskel",
                content: "Skriv inn en verdi mellom 1 og 2346 for å bestemme pakkestørrelsen på dataoverføring gjennom ruteren. Som standard, vil RTS-terskelen (Request to Send) være 2346. Hvis pakkestørrelsen er større enn den forhåndsinnstilte terskelen, vil ruteren sende RTS-frekvenser til en bestemt mottaksstasjon og tilpasse utsendingen av en datafrekvens, hvis ikke blir pakken sendt umiddelbart."
            }, {
                type: "name",
                title: "DTIM-intervall",
                content: "Skriv inn en verdi mellom 1 og 255 for å bestemme intervallet på Delivery Traffic Indication-meldingen (DTIM). 1 indikerer at DTIM-intervallet er det samme som signalintervallet."
            }, {
                type: "name",
                title: "Oppdateringsperiode for gruppenøkkel",
                content: " Skriv inn antall sekunder (minimum 30) for å kontrollere tidsintervallet på den automatiske fornyelsen av krypteringsnøkkelen. Standarden er 0, noe som indikerer ingen nøkkelfornyelse."
            }, {
                type: "name",
                title: "WMM",
                content: "Denne funksjonen garanterer at pakkene med meldinger av høy prioritet blir sendt fortrinnsvis. WMM blir tvangsmessig aktivert under 802.11n- eller 802.11ac-modus. Det er sterkt anbefalt å aktivere WMM."
            }, {
                type: "name",
                title: "Kort GI",
                content: "Denne funksjonen er aktivert som standard, og er anbefalt for å øke datakapasiteten ved å redusere tiden for Guard Interval (GI)."
            }, {
                type: "name",
                title: "AP-isolering",
                content: " Velg denne avmerkingsboksen for å aktivere funksjonen for AP-isolering som lar deg begrense og innskrenke alle trådløse enheter på nettverket ditt fra å samhandle med hverandre, men fremdeles ha Internett-tilgang. AP-isolering er deaktivert som standard."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS-overføring",
                content: "Velg denne avmerkingsboksen for å aktivere brofunksjonen for WDS (Wireless Distribution System), hvilket lar ruteren bygge bro med andre tilgangspunkter (AP) i et wireless local area network (WLAN). Hvis aktivert, konfigurer følgende:"
            }, {
                type: "name",
                title: "SSID (til overføring)",
                content: "Skriv inn SSID-en til WAP-en (Wireless Access Point) som ruteren din vil koble til som en klient, eller bruk Undersøkelsefunksjonen for å skanne og vise alle tilgjengelige nettverk innen rekkevidde."
            }, {
                type: "name",
                title: "MAC-adresse (som skal brokobles)",
                content: "Angi MAC-adressen med 12 heksadesimalske tegn (0–9, a–f, A–F), formatet atskilt med bindestrek for WAP-en som ruteren skal kobles til som klient. Hvis du velger et nettverk gjennom Undersøkelsefunksjonen, vil MAC-adressefeltet bli fylt ut automatisk."
            }, {
                type: "name",
                title: "Undersøkelse",
                content: "Klikk på denne knappen for å skanne og vise MAC-adressen, SSID, signalstyrke, kanal og sikkerhetsinformasjon for alle tilgjengelige trådløse nettverk innen rekkevidde. Når du velger et nettverk, vil SSID, MAC-adresse og Sikkerhet bli fylt ut automatisk.",
                children: [{
                    type: "name",
                    title: "AP-liste",
                    content: "Viser informasjonen om AP-en som ruteren din kan koble seg til."
                }, {
                    type: "name",
                    title: "MAC-adresse",
                    content: "Viser MAC-adressen til AP-en som ruteren din vil koble seg til som klient."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Viser SSID-en til AP-en som ruteren din vil koble seg til som klient."
                }, {
                    type: "name",
                    title: "Signalstyrke",
                    content: "Viser signalstyrken til AP-en som ruteren din vil koble seg til som klient."
                }, {
                    type: "name",
                    title: "Kanal",
                    content: "Viser kanalen til AP-en som ruteren din vil koble seg til som klient."
                }, {
                    type: "name",
                    title: "Kryptering",
                    content: "Viser krypteringstypen til AP-en som ruteren din vil koble seg til som klient."
                }, {
                    type: "name",
                    title: "Koble til",
                    content: "Klikk på ikonet for å koble til eller koble fra samsvarende AP."
                }]
            }, {
                type: "name",
                title: "Sikkerhet",
                content: "Velg en av følgende sikkerhetsalternativer:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Velg dette alternativet for å deaktivere den trådløse sikkerheten. Det er sterkt anbefalt at du aktiverer den trådløse sikkerheten for å beskytte det trådløse nettverket ditt fra uautorisert tilgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Denne innstillingen anbefales. Konfigurer det følgende dersom dette er valgt.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Velg en sikkerhetsversjon for det trådløse nettverket ditt.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Dette alternativet støtter AES-kryptering som gir et lavere sikkerhetsnivå enn WPA-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Dette alternativet støtter AES-kryptering som gir et bedre sikkerhetsnivå enn WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Velg type sikkerhetskryptering: TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard). Det anbefales IKKE å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, vil WPS-funksjonen bli deaktivert."
                    }, {
                        type: "name",
                        title: "Passord",
                        content: "Opprett et trådløst passord med mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimalske tegn i dette feltet."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Velg dette alternativet for å aktivere grunnleggende godkjenningsmetode hvis du har versjoner av klientenhetene dine som bare kan få tilgang på det trådløse nettverket gjennom WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Velg en godkjenningstype for det trådløse nettverket ditt. Velg Åpent system eller Delt nøkkel basert på kapasiteten og tilgangsforespørselen fra den trådløse klienten."
                    }, {
                        type: "name",
                        title: "WEP-nøkkel-format",
                        content: "Velg enten ASCII-format eller heksadesimaler.  ASCII-format er en kombinasjon av alfabetiske og numeriske tegn. Heksadesimalsk format er en kombinasjon av sifrene (0–9) og bokstavene (A–F, a–f)."
                    }, {
                        type: "name",
                        title: "Nøkkelindeks",
                        content: "Velg hvilken av de fire nøklene som skal bli brukt og skriv inn samsvarende WEP-nøkkel som du opprettet i feltet for Nøkkelverdi. Sørg for at disse verdiene er identisk for alle trådløse stasjoner på nettverket ditt."
                    }, {
                        type: "name",
                        title: "Nøkkelverdi",
                        content: "Skriv inn den samsvarende WEP-nøkkelen du oppretter."
                    }]
                }]
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre innstillingene."
            }]
        },
        wirelessSchedule: {
            TITLE: "Avanserte innstillinger",
            CONTENT: [{
                type: "paragraph",
                content: "Den effektive tidsplanen er basert på ruterens klokkeslett. Klokkeslettet kan bli angitt i Systemverktøy -> Tidsinnstillinger"
            }, {
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Velg 2,4 GHz, 5 GHz-1 eller 5 GHz-2 for å angi dens trådløse plan."
            }, {
                type: "name",
                title: "Trådløs plan",
                content: "Skru På for å aktivere denne funksjonen. Deretter, klikk og fra langs cellene for å angi tidsperioden for å skru av det trådløse nettverket."
            }, {
                type: "name",
                title: "Gjenopprett",
                content: "Klikk på tidsvalg."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre innstillingene."
            }]
        },
        macFilter: {
            TITLE: "Innstillinger for MAC-filter",
            CONTENT: [{
                type: "name",
                title: "MAC-filtrering",
                content: "Skru På for å kontrollere trådløs tilgang ved å bruke MAC-adressen til individuelle enheter."
            }, {
                type: "title",
                title: "Filtreringsregler"
            }, {
                type: "name",
                title: "Blokker trådløs tilgang for enhetene i listen nedenfor.",
                content: "Velg for å blokkere trådløs tilgang for enhetene i listen nedenfor."
            }, {
                type: "name",
                title: "Bare tillat trådløs tilgang for enhetene i listen nedenfor.",
                content: "Velg for å bare tillate trådløs tilgang for enhetene i listen nedenfor."
            }, {
                type: "title",
                title: "Enhetsliste"
            }, {
                type: "name",
                title: "MAC-adresse/Beskrivelse",
                content: "Viser MAC-adressen til enheten og beskrivelse av enheten."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Klikk på Lyspæreikonet for å aktivere eller deaktivere MAC-filtrering for enheten."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å endre eller slette samsvarende oppføring."
            }, {
                type: "note",
                title: "For å legge til en ny enhet",
                content: [
                    "Klikk Legg til.",
                    "Skriv inn MAC-adressen til enheten.",
                    "Skriv inn en beskrivelse av enheten.",
                    "Klikk på Aktiver denne oppføringen.",
                    "Klikk på OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Trådløse innstillinger",
            CONTENT: [/*{
                type: "name",
                title: "Region",
                content: "Velg området ditt fra rullegardinlisten. Dette feltet angir regionen hvor ruterens trådløse funksjon kan bli brukt. Det kan være ulovlig å bruke ruterens trådløse funksjon i en annen region enn de som er angitt i dette feltet. Hvis landet eller regionen din ikke er oppført, kontakt ditt lokale offentlige organ for støtte."
            }, */{
                type: "name",
                title: "Smart Connect",
                content: "Velg denne avmerkingsboksen for å aktivere Smart Connect. Denne funksjonen hjelper enheter med å kjøre raskere ved å tilordne dem de beste trådløse båndene basert på faktiske forhold for å balansere nettverkskrav."
            }, {
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Velg 2,4 GHz | 5 GHz-1 | 5 GHz-2 for å endre de samsvarende innstillingene."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Velg denne avmerkingsboksen for å aktivere den trådløse 2,4 GHz | 5 GHz-1 | 5 GHz-2-radiofrekvensen."
            }, {
                type: "name",
                title: "Navn på trådløst nettverk (SSID)",
                content: "Du kan la det standard nettverksnavnet (SSID) stå som det er, eller opprette et nytt navn (opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Velg denne avmerkingsboksen hvis du ønsker å skjule navnet på 2,4 GHz | 5 GHz-1 | 5GHz-2-nettverket (SSID) fra Wi-Fi-nettverkslisten."
            }, {
                type: "name",
                title: "Sikkerhet",
                content: "Velg en av følgende sikkerhetsalternativer:",
                children: [{
                    type: "name",
                    title: "Ingen sikkerhet",
                    content: "Velg dette alternativet for å deaktivere den trådløse sikkerheten. Det er sterkt anbefalt at du aktiverer den trådløse sikkerheten for å beskytte det trådløse nettverket ditt fra uautorisert tilgang."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Velg dette alternativet for å aktivere standard godkjenningsmetode basert på en forhåndsdelt nøkkel (PSK), også kalt passfrase. Denne innstillingen anbefales. Konfigurer det følgende dersom dette er valgt.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Velg en sikkerhetsversjon for det trådløse nettverket ditt.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Dette alternativet støtter flerimplementering av standard WPA (Wi-Fi Protected Access), slik som WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Dette alternativet støtter AES-kryptering som gir et bedre sikkerhetsnivå enn WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Velg type sikkerhetskryptering: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard. Det anbefales IKKE å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, vil WPS-funksjonen bli deaktivert."
                    }, {
                        type: "name",
                        title: "Passord",
                        content: "Opprett et trådløst passord med mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimalske tegn i dette feltet."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Velg dette alternativet for å aktivere den mer avanserte godkjenningsmetoden som bruker RADIUS (Remote Authentication Dial In User Service). Hvis valgt, vil WPS-funksjonen bli deaktivert.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Velg en sikkerhetsversjon for det trådløse nettverket ditt.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Dette alternativet støtter flerimplementering av standard WPA (Wi-Fi Protected Access), slik som WPA og WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Dette alternativet anbefales, ettersom det støtter AES-kryptering som gir et bedre sikkerhetsnivå enn WPA."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Velg type sikkerhetskryptering: Auto (for både TKIP og AES), TKIP (Temporal Key Integrity Protocol), eller AES (Advanced Encryption Standard. Det anbefales IKKE å bruke TKIP-kryptering hvis ruteren opererer i 802.11n-modus, fordi TKIP ikke støttes av 802.11n-spesifikasjonen. Hvis TKIP er valgt, vil WPS-funksjonen bli deaktivert."
                    }, {
                        type: "name",
                        title: "RADIUS server-IP",
                        content: "Skriv inn IP-adressen til RADIUS-serveren."
                    }, {
                        type: "name",
                        title: "RADIUS-serverport",
                        content: "Skriv inn portnummeret til RADIUS-serveren."
                    }, {
                        type: "name",
                        title: "RADIUS-serverpassord",
                        content: " Skriv inn det delte passordet til RADIUS-serveren."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Velg dette alternativet for å aktivere den grunnleggende godkjenningsmetoden hvis du har versjoner av klientenhetene dine som bare kan få tilgang på det trådløse nettverket gjennom WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Velg en godkjenningstype for det trådløse nettverket ditt. Standarden er Auto, som automatisk velger Åpent system eller Delt nøkkel basert på kapasiteten og tilgangsforespørselen fra den trådløse klienten."
                    }, {
                        type: "name",
                        title: "Nøkkel valgt",
                        content: "Velg hvilken av de fire nøklene som skal bli brukt og opprett en WEP-nøkkel i feltet for Nøkkelverdi. Trådløse klienter må skrive inn den samsvarende WEP-nøkkelen for å koble til nettverket ditt."
                    }, {
                        type: "name",
                        title: "WEP-nøkkel-format",
                        content: "Bruk enten ASCII-format eller heksadesimaler. ASCII-format er en kombinasjon av alfabetiske og numeriske tegn. Heksadesimalsk format er en kombinasjon av sifrene (0–9) og bokstavene (A–F, a–f)."
                    }, {
                        type: "name",
                        title: "Nøkkeltype",
                        content: "Velg nøkkellengde for WAP.",
                        children: [{
                            type: "name",
                            title: "64-biters kryptering",
                            content: "Lar deg skrive inn 10 heksadesimalske sifre (0–9, A–F, a–f) eller 5 ASCII-tegn i WEP-verdifeltet."
                        }, {
                            type: "name",
                            title: "128-biters kryptering",
                            content: "Lar deg skrive inn 26 heksadesimalske sifre (0–9, A–F, a–f) eller 13 ASCII-tegn i WEP-verdifeltet."
                        }]
                    }, {
                        type: "name",
                        title: "Nøkkelverdi",
                        content: "Opprett en WEP-nøkkel."
                    }]
                }]
            }, {
                type: "name",
                title: "Modus",
                content: "Velg en blandet overføringsmodus."
            }, {
                type: "name",
                title: "Kanal",
                content: "Velg en driftskanal for det trådløse nettverket. Standardkanalen er Auto. Ikke bytt den med mindre du opplever uregelmessige trådløse tilkoblingsproblemer."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Velg en kanalbredde (båndbredde) for det trådløse nettverket."
            }, {
                type: "name",
                title: "Overføringskraft",
                content: "Velg enten Høy, Middels, eller Lav for å angi dataoverføringskraften. Innstillingen som er standard og anbefalt er Høy."
            }, {
                type: "paragraph",
                content: "Klikk <strong>Lagre</strong> for å lagre alle innstillingene dine."
            }]
        },
        wps: {
            TITLE: "Ruterens PIN-kode",
            CONTENT: [{
                type: "name",
                title: "Ruterens PIN-kode",
                content: "Skru på for å tillate trådløse enheter å koble til ruteren ved å bruke ruterens PIN-kode (Personlig IdentifikasjonsNummer)."
            }, {
                type: "name",
                title: "Gjeldende PIN-kode",
                content: "Viser ruterens gjeldende PIN-kode. Standard-PIN-koden finner du på merkelappen på ruteren eller i Brukerveiledningen. Klikk Generer for å generere en ny vilkårlig PIN-kode, eller klikk Gjenopprett for å gjenopprette den gjeldende PIN-koden tilbake til standard-PIN-koden."
            }, {
                type: "title",
                content: "WPS-innstillinger"
            }, {
                type: "name",
                title: "Knapp (anbefalt)",
                content: "Velg denne installasjonsmetoden for aktivere WPS-funksjonen for å enkelt koble alle WPS-aktiverte enheter til det trådløse nettverket ditt ved å bruke WPS-knappen eller virtuelt med Tilkoblingsknappen."
            }, {
                type: "name",
                title: "PIN-kode",
                content: "Velg denne installasjonsmetoden for å legge til en enhet manuelt ved å skrive inn den trådløse enhetens PIN-kode for WPS i feltet."
            }, {
                type: "name",
                title: "Koble til",
                content: "Klikk denne knappen for å starte WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Sperrefunksjon",
            CONTENT: [{
                type: "paragraph",
                content: "Med Sperrefunksjoner kan du blokkere upassende, eksplisitte og skadelige nettsteder; begrense tilgang ved enkelte klokkeslett (for eksempel Facebook eller YouTube i leksetiden)."
            }, {
                type: "name",
                title: "Status",
                content: "Skru På for å aktivere Sperrefunksjonen. Som standard, er denne funksjonen deaktivert."
            }, {
                type: "title",
                content: "Enheter med Sperrefunksjoner"
            }, {
                type: "paragraph",
                content: "Enheter med Sperrefunksjoner viser listen av enheter som er begrenset av Sperrefunksjoner."
            }, {
                type: "name",
                title: "Enhetsnavn",
                content: "Viser navnene til alle tilkoblede klientenheter som er under Sperrefunksjoner."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: " Viser MAC-adressene til alle tilkoblede klientenheter som er under Sperrefunksjoner."
            }, {
                type: "name",
                title: "Effektiv tid",
                content: "Viser de restrikterte tidsperiodene."
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser en kort beskrivelse av den tilkoblede enheten. "
            }, {
                type: "name",
                title: "Status",
                content: "Indikerer om Sperrefunksjoner er aktivert for den samsvarende enheten. Trykk på Lyspæreikonet for å aktivere eller (deaktivere) den."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å endre eller slette samsvarende enhet."
            }, {
                type: "note",
                title: "<strong>For å legge til en ny klientenhet</strong>",
                content: [
                    "Klikk Legg til.",
                    "Klikk «Se eksisterende enheter» for å velge en tilkoblet enhet fra listen over tilgang til enheter; eller skriv inn enhetsnavnet og MAC-adressen manuelt for å legge til en enhet som ikke er tilkoblet.",
                    "Klikk på «Effektiv tid»-ikonet for å angi en tidsperiode hvor begrensingen gjelder.",
                    "Skriv en kort beskrivelse i Beskrivelsesfeltet. Dette feltet er valgfritt.",
                    "Velg aktiver.",
                    "Klikk OK for å lagre denne oppføringen."
                ]
            }, {
                type: "paragraph",
                content: "<strong>For å endre eller slette en enhet</strong><br>I Enheter under listen av Sperrefunksjoner, klikk på Endre-ikonet eller Papirkurv-ikonet som samsvarer med enheten du ønsker å endre eller slette."
            }, {
                type: "paragraph",
                content: "<strong>For å slette flere enheter</strong><br>I listen av Sperrefunksjoner, velg samsvarende avmerkingsboks for enhetene som skal bli slettet, og trykk Slett over tabellen."
            }, {
                type: "title",
                title: "Innholdsbegrensning"
            }, {
                type: "paragraph",
                content: "Innholdsbegrensning lar deg begrense tilgang til innhold ved å bruke nøkkelord og domenenavn som klientenhetene som blir styrt av Sperrefunksjoner har eller har ikke tilgang på, avhengig av begrensningstype."
            }, {
                type: "name",
                title: "Begrensningstype",
                content: "Velg følgende begrensningstype:",
                children: [{
                    type: "name",
                    title: "Inkluder i svarteliste",
                    content: "Inneholder nøkkelord og domenenavn som vil bli brukt for å blokkere tilgang til nettsteder fra klientenhetene angitt i Enheter under listen av Sperrefunksjoner."
                }, {
                    type: "name",
                    title: "Hviteliste",
                    content: "Inneholder nøkkelord og domenenavn som klientenheter som er angitt i Enheter under listen av Sperrefunksjoner har tilgang på."
                }]
            }, {
                type: "name",
                title: "Legg til nytt søkeord",
                content: "Klikk for å legge til et nytt nøkkelord eller domenenavn til Svartelisten eller Hvitelisten. "
            }, {
                type: "paragraph",
                content: "For å slette et nøkkelord eller domenenavn, klikk på minusikonet (-) ved siden av elementet du ønsker å slette."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre konfigurasjonene dine."
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Gjestenettverk",
            CONTENT: [{
                type: "paragraph",
                content: "Gjestenettverk lar deg sette opp et separat trådløst nettverk med et separat nettverksnavn (SSID) og passord som gjestene dine kan bruke for å få tilgang til Internett."
            }, {
                type: "name",
                title: "Gjør det mulig for gjester å se hverandre",
                content: "Velg denne avmerkingsboksen for å tillate at trådløse enheter på Gjestenettverket kan kommunisere med hverandre."
            }, {
                type: "name",
                title: "Gjør det mulig for gjester å få tilgang til det lokale nettverket",
                content: "Velg denne avmerkingsboksen for å tillate at trådløse enheter på Gjestenettverket får tilgang på ditt lokale nettverk."
            }, {
                type: "name",
                title: "Trådløst nettverk 2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Klikk på den samsvarende knappen for å aktivere 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gjestenettverket …"
            }, {
                type: "name",
                title: "SSID for gjestenettverk",
                content: "Bruk enten standard SSID eller opprett et nytt navn med 1 til 32 tegn. Dette feltet skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Velg denne avmerkingsboksen hvis du vil skjule Gjestenettverkets SSID."
            }, {
                type: "name",
                title: "Sikkerhet",
                content: "Velg et sikkerhetsalternativ for gjestenettverket:",
                children: [{
                    type: "name",
                    title: "Ingen",
                    content: "Som standard, vil sikkerheten på gjestenettverket være angitt som Ingen; alle har tilgang."
                }, {
                    type: "name",
                    title: "Angi passord",
                    content: "Opprett et passord for gjestenettverket med mellom 8 og 63 ASCII-tegn eller mellom 8 og 64 heksadesimalske tegn (0–9, a–f, A–F) i passordfeltet."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internett",
            CONTENT: [{
                type: "name",
                title: "Internett-status",
                content: "Viser gjeldende status over ruterens Internett-tilkobling."
            }, {
                type: "name",
                title: "Tilkoblingstype",
                content: "Viser hvilken type Internett-tilkobling du har. "
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser nåværende IP-adresse som er tilordnet ruteren."
            }, {
                type: "name",
                title: "DNS-server",
                content: " Viser IP-adressene til de primære og sekundære DNS-serverne."
            }, {
                type: "name",
                title: "Gateway",
                content: "Viser IP-adressen til Gatewayen."
            }, {
                type: "title",
                title: "Ruter"
            }, {
                type: "title2",
                content: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Trådløst"
            }, {/*
                type: "name",
                title: "Status",
                content: "Viser om 2,4 GHz | 5 GHz-1 | 5 GHz-2 trådløst er påslått (aktivert) er avslått (deaktivert)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Viser det gjeldende trådløse nettverksnavnet for 2,4 GHz | 5 GHz-1 | 5 GHz-2-båndfrekvensen."
            }, {
                type: "name",
                title: "Kanal",
                content: "Viser kanalen som sender de trådløse 2,4 GHz | 5 GHz-1 | 5 GHz-2-nettverksendingene."
            }, {
                type: "name",
                title: "MAC",
                content: "Viser den gjeldende MAC-adressen til det trådløse 2,4 GHz | 5 GHz-1 | 5 GHz-2-nettverket."
            }, {
                type: "title2",
                content: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Gjestenettverk"
            }, {
                type: "name",
                title: "Status",
                content: "Viser om 2,4 GHz | 5 GHz-1 | 5 GHz-2-gjestenettverket er påslått (aktivert) er avslått (deaktivert)."
            }, {
                type: "name",
                title: "SSID",
                content: "Viser det trådløse nettverknavnet til gjestenettverket."
            }, {
                type: "title",
                title: "Trådløse/kabelbaserte klienter"
            }, {
                type: "name",
                title: "Navn",
                content: " Viser navnet til klienten som er koblet til ruteren. "
            }, {
                type: "name",
                title: "IP-adresse",
                content: "Viser den tilordnede IP-adressen til klienten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen til klienten."
            }, {
                type: "title",
                display: "INCLUDE_VOIP",
                title: "Telefon"
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Telefonnavn",
                content: "Viser navnet på telefonen din."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Numre for innkommende anrop",
                content: "Viser numrene brukt av telefonenhetene dine for å motta innkommende anrop gjennom ruteren din. "
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Internt nummer",
                content: "Viser telefonnumre som blir brukt til å ringe mellom telefonenheter som er koblet til den samme ruteren. Det er forhåndsinnstilt og kan ikke bli endret."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Utgående numre",
                content: "Viser numrene brukt av telefonenhetene dine for å gjøre utgående anrop gjennom ruteren din. Standarden er Auto, som betyr at ruteren vil velge et tilgjengelig nummer som utgående nummer, hvilket kan bli endret på VoIP-siden."
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Skriver"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Navn",
                content: "Viser navnet på printeren som er koblet til ruteren via en USB-port. "
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "USB-disk"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Merke",
                content: "Viser merket til USB-disken som er koblet til ruteren."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Totalt",
                content: "Viser total plass på USB-disken."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Tilgjengelig",
                content: "Viser ledig plass på USB-disken."
            }]
        },
        wirelessBasic: {
            TITLE: "Trådløse innstillinger",
            CONTENT: [{
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Trådløst nettverk",
                content: "Velg denne avmerkingsboksen for å aktivere den trådløse 2,4 GHz | 5 GHz-1 | 5 GHz-2-radiofrekvensen."
            }, {
                type: "name",
                title: "Navn på trådløst nettverk (SSID)",
                content: "Du kan la det standard nettverksnavnet (SSID) stå som det er, eller opprette et nytt navn (opptil 32 tegn). Dette feltet skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Passord",
                content: "Opprett et trådløst passord med mellom 8 og 63 ASCII-tegn, eller mellom 8 og 64 heksadesimalske tegn. Dette feltet skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Velg denne avmerkingsboksen hvis du ønsker å skjule SSID-en til 2,4 GHz | 5 GHz-1 | 5GHz-2 fra Wi-Fi-nettverkslisten."
            }]
        },
        status: {
            TITLE: "Internett",
            CONTENT: [{
                type: "paragraph",
                content: "Viser relevant informasjon om Internett-tilkoblingen."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Navn",
                content: "Viser navnet på ruterens Internett-port."
            }, {*/
                type: "name",
                title: "MAC-adresse",
                content: "Den unike fysiske adressen som er tilordnet ruterens Internett-port (WAN)."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "IP-adressen som er tilordnet ruterens Internett-port (WAN). Hvis IP-adressen er vist som 0.0.0.0, er det ingen Internett-tilgang."
            }, {
                type: "name",
                title: "Nettverksmaske",
                content: "Dette parameteret bestemmer nettverksdelen og vertsdelen til en IP-adresse. "
            }, {
                type: "name",
                title: "Standard gateway",
                content: " IP-adressen blir brukt for å koble til nettverkets ruter."
            }, {
                type: "name",
                title: "Primær/Sekundær DNS",
                content: "Domenenavnsystemet (DNS) oversetter vertsnavn og Internett-domener til IP-adresser. Informasjonen om disse DNS-serverne er tilordnet av din Internett-leverandør (ISP)."
            }, {
                type: "name",
                title: "Tilkoblingstype",
                content: "Den nåværende tilkoblingstypen din til lnternettet ditt."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Den unike fysiske adressen som er tilordnet ruterens Internett-port (WAN)."
            }, {
                type: "name",
                title: "IP-adresse",
                content: " IPv6-adressen som er tilordnet ruterens Internett-port (WAN)."
            }, {
                type: "name",
                title: "Standard gateway",
                content: " IP-adressen blir brukt for å koble til nettverkets ruter."
            }, {
                type: "name",
                title: "Primær/Sekundær DNS",
                content: "Domenenavnsystemet (DNS) oversetter vertsnavn og Internett-domener til IP-adresser. Informasjonen om disse DNS-serverne er tilordnet av din Internett-leverandør (ISP)."
            }, {
                type: "name",
                title: "Tilkoblingstype",
                content: "Den nåværende tilkoblingstypen din til lnternettet ditt."
            }, {
                type: "title",
                title: "Trådløs"
            }, {
                type: "name",
                title: "2,4 G | 5 G-1 | 5 G-2",
                content: "Velg for å se de trådløse innstillingene og informasjonen om 2,4 GHz | 5 GHz-1 | 5 GHz-2."
            }, {
                type: "name",
                title: "Nettverksnavn",
                content: "Det trådløse nettverksnavnet, også kjent som SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Det trådløse nettverkets gjeldende status (På eller Av)."
            }, {
                type: "name",
                title: "Modus",
                content: "Gjeldende trådløsmodus."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Det trådløse nettverkets kanalbåndbredde."
            }, {
                type: "name",
                title: "Kanal",
                content: "Den gjeldende trådløse kanalen og dens samsvarende frekvens (i GHz)."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "MAC-adressen til den trådløse nettverksradioen."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Viser informasjon om Ethernet-porter (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Den unike fysiske adressen som er tilordnet ruterens Ethernet-port (LAN)."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "IPv5-adressen som er tilordnet ruterens Ethernet-port (LAN)."
            }, {
                type: "name",
                title: "Nettverksmaske",
                content: "Dette parameteret bestemmer nettverksdelen og vertsdelen til en IP-adresse."
            }, {
                type: "name",
                title: "DHCP",
                content: "Viser om ruterens innebygde DHCP-server er aktiv for enheter på LAN-portene eller ikke."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-adresse",
                content: " Den unike fysiske adressen som er tilordnet ruterens Ethernet-port (LAN)."
            }, {
                type: "name",
                title: "IP-adresse",
                content: "IPv6-adressen som er tilordnet ruterens Ethernet-port (LAN)."
            }, {
                type: "name",
                title: "Prefikslengde",
                content: "Lengden på IPv6-adressens prefiks."
            }, {
                type: "name",
                title: "Tildelt type",
                content: "IPv6-adressetypen som er tilordnet LAN-grensesnittet."
            }, {
                type: "title",
                title: "Gjestenettverk"
            }, {
                type: "name",
                title: "2,4 G | 5 G-1 | 5 G-2",
                content: "Velg for å se innstillingene om gjestenettverket og informasjonen om 2,4 GHz | 5 GHz-1 | 5 GHz-2."
            }, {
                type: "name",
                title: "SSID for gjestenettverk",
                content: " Viser det trådløse nettverksnavnet til gjestenettverket ditt."
            }, {
                type: "name",
                title: "Skjul SSID",
                content: "Viser om det trådløse nettverksnavnet (SSID) for gjestenettverket er skjult (På) eller ikke (Av)."
            }, {
                type: "name",
                title: "Trådløs radio",
                content: "Viser gjestenettverkets gjeldende status (På eller Av)."
            }, {
                type: "name",
                title: "Se hverandre",
                content: "Viser om alle enhetene på gjestenettverket har tillatelse til å kommunisere med hverandre eller ikke."
            }, {
                type: "title",
                display: "$.sysMode == 'DSL'",
                title: "DSL"
            }, {
                type: "paragraph",
                display: "$.sysMode == 'DSL'",
                content: "Viser informasjon om DLS-tilkoblingen."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Linjestatus",
                content: "Viser om DSL-tilkoblingen er tilkoblet eller frakoblet."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "DLS-moduleringstype",
                content: "Viser DLS-operasjonens moduleringstype som DLS-tilkoblingen din bruker."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Annex-type",
                content: "Viser DLS-operasjonens Annex-type som DLS-tilkoblingen din bruker."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Gjeldende hastighet (kbps)",
                content: "Viser gjeldende opplastings- og nedlastingshastighet gjennom DSL-tilkoblingen."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Maksimal hastighet (kbps)",
                content: "Viser maksimal opplastings- og nedlastingshastighet gjennom DSL-tilkoblingen."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "SNR-margin (dB)",
                content: "Viser opplastings- og nedlastings-SNR-marginen til DSL-tilkoblingen."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Linjedemping (dB)",
                content: "Viser linjedempingen til DLS-tilkoblingen."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Feil (pkts)",
                content: "Viser antall oppstrøms- og nedstrømsfeil for DSL-tilkoblingen."
            }]
        },
        time: {
            TITLE: "Tidsinnstillinger",
            CONTENT: [{
                type: "name",
                title: "Tidssone",
                content: "Velg din lokale tidssone fra rullegardinlisten."
            }, {
                type: "name",
                title: "Dato",
                content: "Skriv inn din lokale dato i MM/DD/ÅÅ i feltet."
            }, {
                type: "name",
                title: "Tid",
                content: "Velg din lokale tid fra rullegardinlisten (I 24-timers klokkeformat, hvor 16:00:00 vil være kl. 4 på dagen)."
            }, {
                type: "name",
                title: "NTP-server I/NTP-server II",
                content: "Skriv inn IP-adressen til NTP-server I eller NTP-server II, og ruteren vil automatisk hente tiden fra NTP-serveren. I tillegg har ruteren noen vanlige innebygde NTP-servere som vil synkroniseres automatisk ved tilkobling til Internett."
            }, {
                type: "name",
                title: "Hent fra PC",
                content: "Klikk for å synkronisere med datamaskinens systemtid."
            }, {
                type: "name",
                title: "Hent GMT",
                content: "Klikk for å synkronisere med tidssonen GMT (Greenwich Mean Time) fra Internett."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre innstillingene."
            }, {
                type: "title",
                content: "Sommertid"
            }, {
                type: "note",
                title: "Å konfigurere Sommertid",
                content: [
                    "Velg <b>Aktiver Sommertid</b>.",
                    "Velg den riktige <b>Start</b>datoen og tiden når sommertiden slutter for din lokale tidssone.",
                    "Velg den riktige <b>Slutt</b>datoen og tiden når sommertiden slutter for din lokale tidssone.",
                    "Klikk <b>Lagre.</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Diagnoseverktøy",
            CONTENT: [{
                type: "paragraph",
                content: "Ruteren leverer to diagnoseverktøy, ping og sporing."
            }, {
                type: "note",
                title: "For å diagnostisere ved bruk av pingverktøyet:",
                content: [
                    "Sjekk radioknappen før ping.",
                    "Skriv inn IP-adressen eller domenenavnet.",
                    "Klikk på rullegardin-ikonet, deretter Avansert for å vise antall ping, pakkestørrelse for ping og tidsavbrudd for ping. Hold disse parametrene på deres standardverdier eller konfigurerer dem etter dine behov.",
                    "Klikk Start-knappen for å begynne diagnosen."
                ]
            }, {
                type: "paragraph",
                content: "ELLER"
            }, {
                type: "note",
                title: "For å diagnostisere ved bruk av pingverktøyet:",
                content: [
                    "Sjekk radioknappen før søkerute.",
                    "Skriv inn IP-adressen eller domenenavnet.",
                    "Klikk på rullegardin-ikonet før Avansert for å vise søkerutens maksimale TTL. Hold dem på deres standardverdier eller konfigurerer dem etter dine behov.",
                    "Klikk Start-knappen for å begynne diagnosen."
                ]
            }]
        },
        softup: {
            TITLE: "Fastvareoppgradering",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "En fastvareoppgradering oppdaterer ruterens operativsystem med de nyeste funksjoner og feilrettinger for å forbedre ytelsen. Når en ny fastvareoppgradering er tilgjengelig vil du bli varslet med et Oppdater-ikon i øvre høyre hjørne. Klikk på ikonet for å åpne Fastvareoppgradering-siden."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>VIKTIG: Følg instruksjonene for å unngå feil under oppgraderingen.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Før oppgraderingen:",
                content: [
                    "Koble datamaskinen til ruteren med en Ethernet-kabel. Det anbefales IKKE å oppgradere fastvare trådløst. ",
                    "Fjern alle tilkoblede USB-lagringsenheter fra ruteren.",
                    "Ta sikkerhetskopi av ruterens konfigurasjonsinstillinger."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Under oppgraderingsprosessen::<br>Hold ruteren påslått og ikke bruk enheten."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Oppgradere fastvaren via Internett"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Klikk på Oppgrader og bekreft når du blir bedt om det. Ruteren vil automatisk lastes ned og oppgraderes til den nyeste fastvaren. Deretter omstarter du den.<br><b>Merk</b>: Du må kanskje klikke på Se etter oppgradering først, for å sjekke om en fastvareoppdatering er tilgjengelig. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Oppgradere fastvaren manuelt"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Gå til www.tp-link.com og last ned siste fastvareversjon fra vår kundestøtteside på datamaskinen din. Sørg for at fastvarefilen du laster ned stemmer overens med ruterens fastvareversjon som er vist på siden.",
                    "Klikk på <b>Bla gjennom</b> og velg fastvarefilen du lastet ned.",
                    "Klikk på <b>Oppgrader</b>. Fastvareoppgraderingen vil ta et par minutter. Ruteren vil automatisk starte på nytt når fastvareoppgraderingen er fullført.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Før du oppgraderer ruterens fastvare, må du laste ned den nyeste fastvareoppdateringen fra <a href='http://www.tp-link.com/en/download-center.html'>TP-LINK sitt nedlastingssenter</a> til datamaskinen din."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>Viktig:</B> For å forhindre oppgraderingsfeil, merk følgende:",
                content: [
                    "Sørg for at den siste fastvarefilen samsvarer med maskinvareversjonen (som vist på siden for <b>Fastvareoppgradering</b>). ",
                    "Sørg for at du har en stabil tilkobling mellom ruteren og datamaskinen din. Det er <b>IKKE</b> anbefalt å oppgradere fastvaren trådløst.",
                    "Sørg for at du har fjernet alle USB-lagringsenheter som er tilkoblet ruteren før fastvareoppgraderingen, for å forhindre tap av data.",
                    "Sikkerhetskopier ruterkonfigurasjonen din.",
                    "Ikke slå av ruteren under fastvareoppgraderingen."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "For å oppgradere ruterens fastvare",
                content: [
                    "Klikk <b>Bla gjennom</b>.",
                    "Finn og velg den nedlastede fastvarefilen.",
                    "Klikk <b>Oppgrader</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Sikkerhetskopier",
            CONTENT: [{
                type: "paragraph",
                content: "Det er sterkt anbefalt at du sikkerhetskopierer dine gjeldende konfigurasjoner i tilfelle det kreves en gjenoppretting for å få systemet tilbake til en tidligere tilstand eller fra fabrikkinnstillingene."
            }, {
                type: "paragraph",
                content: "Klikk <b>Sikkerhetskopier</b> for å lagre dine gjeldende konfigurasjoner på datamaskinen din. Sørg for å lagre sikkerhetskopifilen på en trygg plassering hvor du kan hente og gjenopprette ruteren senere, dersom det skulle trenges."
            }, {
                type: "title",
                content: "Gjenopprett"
            }, {
                type: "note",
                title: "For å gjenopprette fra en sikkerhetskopi",
                content: [
                    "Klikk <b>Bla gjennom</b>.",
                    "Finn og velg sikkerhetskopien.",
                    "Klikk <b>Gjenopprett</b>."
                ]
            }, {
                type: "title",
                content: "Gjenopprett til fabrikkinnstillinger"
            }, {
                type: "paragraph",
                content: "Klikk <b>Fabrikkgjenoppretting</b> for å tilbakestille ruteren din til dens fabrikkinnstillinger."
            }, {
                type: "note",
                title: "Merk:",
                content: [
                    "Fabrikkgjenoppretting vil tilbakestille alle innstillingene du har konfigurert for ruteren til dens fabrikkinnstillinger. Når ruteren har blitt gjenopprettet og startet på nytt, opprett et nytt passord for å logge inn igjen til webbehandlingssiden.",
                    "IKKE slå av ruteren under sikkerhetskopiering eller gjenopprettingsprosessen."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Kontobehandling",
            CONTENT: [{
                type: "paragraph",
                content: "Denne siden lar deg endre påloggingspassordet ditt."
            }, {
                type: "name",
                title: "Gammelt brukernavn",
                content: "Skriv inn ditt gjeldende brukernavn."
            }, {
                type: "name",
                title: "Gammelt passord",
                content: "Skriv inn ditt gjeldende passord."
            }, {
                type: "name",
                title: "Nytt brukernavn",
                content: "Skriv inn ditt nye brukernavn."
            }, {
                type: "name",
                title: "Nytt passord",
                content: "Skriv inn ditt nye passord."
            }, {
                type: "name",
                title: "Bekreft nytt passord",
                content: "Skriv inn ditt nye passord igjen."
            }, {
                type: "title",
                content: "Lokal behandling"
            }, {
                type: "paragraph",
                content: "Den lokale behandlingen lar deg spesifikt tilordne en klientenhet til nettverket ditt for å få tilgang og behandle ruteren gjennom MAC-adressebasert godkjenning."
            }, {
                type: "name",
                title: "Port",
                content: "Skriv inn portnummeret som brukes for tilgang til ruteren mellom 1024 og 65535. Standardnummeret er 80."
            }, {
                type: "name",
                title: "IP/MAC-adresse",
                content: "Skriv inn en gyldig lokal IP-adresse eller MAC-adresse for å gi enheten tilgang til ruteren."
            }, {
                type: "title",
                content: "Ekstern behandling"
            }, {
                type: "paragraph",
                content: "Funksjonen for ekstern behandling lar deg få tilgang til og konfigurere ruteren eksternt fra Internettet."
            }, {
                type: "name",
                title: "Ekstern behandling",
                content: "Velg avmerkingsboksen for å aktivere funksjonen for ekstern behandling."
            }, {
                type: "name",
                title: "Port",
                content: "Skriv inn portnummeret som brukes for tilgang til ruteren med bedre sikkerhet mellom 1024 og 65535. Normalt vil nettleserne bruke standard HTTP-tjenesteporten 80."
            }, {
                type: "name",
                title: "IP/MAC-adresse",
                content: "Skriv inn en gyldig ekstern IP-adresse eller MAC-adresse for å få tilgang til ruteren."
            }]
        },
        log: {
            TITLE: "Systemlogg",
            CONTENT: [{
                type: "paragraph",
                content: "Systemloggsiden viser en liste over de mest nylige aktivitetene (hendelsene) på ruteren. Du kan også definere hvilke typer logger og/eller nivået av logger du vil se. Denne siden lar også ruteren eksportere systemloggen til en datamaskin eller automatisk sende systemloggen til en bestemt ekstern server."
            }, {
                type: "name",
                title: "Type",
                content: "Velg type systemlogg som skal vises."
            }, {
                type: "name",
                title: "Nivå",
                content: "Velg nivået på systemloggen som skal vises."
            }, {
                type: "name",
                title: "Oppdater",
                content: "Klikk på dette ikonet for å oppdatere systemloggen."
            }, {
                type: "name",
                title: "Slett alle",
                content: "Klikk på dette ikonet for å slette alle systemlogger."
            }, {
                type: "name",
                title: "Logginnstillinger",
                content: "Klikk for å angi filinnstillinger for loggen.",
                children: [{
                    type: "name",
                    title: "Lagre lokalt",
                    content: "Velg for å bufre systemloggen til ruteren din sitt lokale minne. Loggen vil bli vist i tabellen på systemloggsiden.",
                    children: [{
                        type: "name",
                        title: "Minimumnivå",
                        content: "Velg minimumnivået på systemloggen som skal bli lagret fra rullegardinlisten. Listen er i synkende rekkefølge, med det laveste nivået oppført til slutt."
                    }]
                }, {
                    type: "name",
                    title: "Lagre eksternt",
                    content: "Velg for å sende systemloggen til en ekstern server. Hvis den eksterne serveren har implementert en loggvisningsklient eller et sniffer-verktøy, kan du se og analysere systemloggen eksternt i sanntid.",
                    children: [{
                        type: "name",
                        title: "Minimumnivå",
                        content: "Velg minimumnivået på systemloggen som skal bli lagret fra rullegardinlisten. Listen er i synkende rekkefølge, med det laveste nivået oppført til slutt."
                    }, {
                        type: "name",
                        title: "Server-IP",
                        content: "Angi IP-adressen til den eksterne systemloggserveren."
                    }, {
                        type: "name",
                        title: "Serverport",
                        content: "Angi portnummeret til den eksterne systemloggserveren."
                    }, {
                        type: "name",
                        title: "Lokalt fasilitetsnavn",
                        content: "Velg det lokale fasilitetsnavnet til den eksterne serveren fra rullegardinlisten."
                    }]
                }]
            }, {
                type: "name",
                title: "Lagre logg",
                content: "Klikk på denne knappen for å laste ned alle systemlogger til din lokale datamaskin."
            }]
        },
        snmp: {
            TITLE: "SNMP-innstillinger",
            CONTENT: [{
                type: "name",
                title: "SNMP-agent",
                content: "Skru På for å aktivere den innebygde SNMP-agenten som lar ruteren operere som en driftsrolle for mottak og prosessering av SNMP-meldinger, sende svar til SNMP-behandleren, og utløse SNMP-feller når en hendelse oppstår."
            }, {
                type: "name",
                title: "Skrivebeskyttet gruppe",
                content: "Viser den standard offentlige gruppestrengen som beskytter ruteren fra uautorisert tilgang."
            }, {
                type: "name",
                title: "Skrivegruppe",
                content: "Viser den standard «Les og skriv»-gruppestrengen som beskytter ruteren fra uautoriserte endringer."
            }, {
                type: "name",
                title: "Systemnavn",
                content: "Viser det administrative tilordnede navnet for denne behandlede enheten."
            }, {
                type: "name",
                title: "Systembeskrivelse",
                content: "Viser tekstbeskrivelsen av den behandlede enheten.  Denne verdien bør inneholde fullt navn og versjonidentifikasjon av systemets maskinvaretype, operativsystem for programvare og nettverksprogramvare."
            }, {
                type: "name",
                title: "Systemplassering",
                content: "Viser den fysiske plasseringen til denne enheten (f. eks. teknisk rom, tredje etasje).  "
            }, {
                type: "name",
                title: "Systemkontakt",
                content: "Viser tekstidentifikasjonen til kontaktpersonen for denne behandlede enheten, sammen med informasjon om hvordan man kan kontakte denne personen."
            }, {
                type: "name",
                title: "IP for fellebehandler",
                content: "Viser IP-adressen til verten som mottar fellene."
            }]
        },
        stat: {
            TITLE: "Trafikkstatistikk",
            CONTENT: [{
                type: "name",
                title: "Trafikkstatistikk",
                content: "Skru På for å aktivere funksjonen for trafikkstatistikk."
            }, {
                type: "title",
                content: "Liste over trafikkstatistikk"
            }, {
                type: "name",
                title: "IP/MAC-adresse",
                content: "IP- og MAC-adresser til de tilkoblede klientene."
            }, {
                type: "name",
                title: "Totalt antall pakker",
                content: "Totalt antall pakker mottatt og sendt av ruteren."
            }, {
                type: "name",
                title: "Totalt antall byte",
                content: "Totalt antall byte mottatt og sendt av ruteren."
            }, {
                type: "name",
                title: "Gjeldende pakker",
                content: "Totalt antall pakker mottatt og sendt i et bestemt tidsintervall gitt i sekunder."
            }, {
                type: "name",
                title: "Gjeldende byte",
                content: "Totalt antall byte mottatt og sendt i et bestemt tidsintervall gitt i sekunder."
            }, {
                type: "name",
                title: "Gjeldende ICMP Tx",
                content: "Viser den gjeldende overføringshastigheten av ICMP-pakker overført gjennom WAN-porten over den maksimale overføringshastigheten per sekund."
            }, {
                type: "name",
                title: "Gjeldende UDP Tx",
                content: "Viser den gjeldende overføringshastigheten av UDP-pakker overført gjennom WAN-porten over den maksimale overføringshastigheten per sekund."
            }, {
                type: "name",
                title: "Gjeldende SYN Tx",
                content: "Viser den gjeldende overføringshastigheten av TCP SYN-pakker overført gjennom WAN-porten over den maksimale overføringshastigheten per sekund."
            }, {
                type: "name",
                title: "Endre",
                content: "Klikk på <b>Papirkurv</b>-ikonet for å slette samsvarende statistikk."
            }, {
                type: "name",
                title: "Oppdater",
                content: "Klikk for å oppdatere den statistiske informasjonen på siden."
            }, {
                type: "name",
                title: "Tilbakestill",
                content: "Klikk for å tilbakestille alle statistiske verdier på listen til null."
            }, {
                type: "name",
                title: "Slett alle",
                content: "Klikk for å slette all statistisk informasjonen på listen."
            }]
        },
        ethWan: {
            TITLE: "WAN-grensesnitt",
            CONTENT: [{
                type: "title2",
                content: "Tilkoblingstype: Dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Velg denne typen hvis du har en DHCP-servertilkobling av din ISP (Internett-leverandør)."
            }, {
                type: "name",
                title: "IP-adresse/Nettmaske/Gateway/Standard Gateway",
                content: "Disse parametrene er automatisk tilordnet av DHCP-serveren fra din ISP."
            }, {
                type: "name",
                title: "Forny/frigi",
                content: "Klikk på denne knappen for å fornye/frigi IP-parametrene fra din ISP."
            }, {
                type: "name",
                title: "Avansert",
                children: [{
                    type: "name",
                    title: "MTU-størrelse (i byte)",
                    content: "Standard og vanlig MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er <b>1500 byte</b>. Det er ikke anbefalt å endre standardstørrelsen på MTU med mindre det kreves av ISP-en."
                }, {
                    type: "name",
                    title: "IGMP-proxy",
                    content: "IGMP (Internet Group Management Protocol) blir brukt for å behandle multikasting på TCP/IP-nettverk. Noen ISP-er bruker IGMP for å utføre ekstern konfigurasjon på en ruter. Det er aktivert som standard."
                }, {
                    type: "name",
                    title: "Få IP ved bruk av Unicast DHCP",
                    content: "Velg denne avmerkingsboksen hvis ISP-en din sin DHCP-server ikke støtter kringkastingsprogrammer og du ikke kan få IP-adressen din dynamisk."
                }, {
                    type: "name",
                    title: "Bruk følgende DNS-adresse",
                    content: "Velg denne avmerkingsboksen og skriv inn serveradresse(r) for DNS i prikket desimalnotasjon levert av din ISP. Dette WAN-grensesnittet prioriterer den spesifikke DNS-serveren."
                }, {
                    type: "name",
                    title: "Vertsnavn",
                    content: "Skriv inn vertsnavnet på dette WAN-grensesnittet."
                }]
            }, {
                type: "title2",
                content: "Tilkoblingstype: Statisk IP"
            }, {
                type: "name",
                title: "Statisk IP",
                content: "Velg denne typen hvis du har fått en spesifikk (fast) IP-adresse, nettverksmaske, Gateway og DNS-parametre fra ISP-en."
            }, {
                type: "name",
                title: "IP-adresse/nettverksmaske/Gateway/DNS-server/Sekundær DNS-server",
                content: "Skriv inn IP-informasjonen gitt av din ISP i prikkete desimalnotasjon."
            }, {
                type: "paragraph",
                content: "Klikk på <b>Avansert</b> for å se flere avanserte innstillinger."
            }, {
                type: "name",
                title: "Avansert",
                children: [{
                    type: "name",
                    title: "MTU-størrelse (i byte)",
                    content: "Standard og vanlig MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er <b>1500 byte</b>. Det er ikke anbefalt å endre standardstørrelsen på MTU med mindre det kreves av ISP-en."
                }, {
                    type: "name",
                    title: "IGMP-proxy",
                    content: "IGMP (Internet Group Management Protocol) blir brukt for å behandle multikasting på TCP/IP-nettverk. Noen ISP-er bruker IGMP for å utføre ekstern konfigurasjon på en ruter. Det er aktivert som standard."
                }]
            }, {
                type: "title2",
                content: "Tilkoblingstype: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Velg denne typen hvis du bruker DLS-tjeneste (Digital Subscriber Line) og har fått et brukernavn og passord av ISP-en."
            }, {
                type: "name",
                title: "PPPoE-brukernavn/PPPoE-passord/Bekreft passord",
                content: "Skriv inn brukernavn og passord gitt av din ISP. Disse feltene skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Sekundær forbindelse",
                content: "Det er kun tilgjengelig for PPPoE-tilkoblinger. Hvis ISP-en din gir deg en ekstra tilkoblingstype slik som dynamisk/statisk IP for å koble til et LAN, kan du velge radioknappen for dynamisk/statisk IP for å aktivere denne sekundære tilkoblingen.<br>Den sekundære tilkoblingen er deaktivert som standard, så det er bare PPPoE-tilkobling. Ikke aktiver den med mindre det er nødvendig."
            }, {
                type: "name",
                title: "Tilkoblingsmodus",
                content: "Velg en av tilkoblingsmetodene nedenfor som bestemmer hvordan man kobler til Internett:",
                children: [{
                    type: "name",
                    title: "Alltid",
                    content: "Velg denne modusen for å koble automatisk til når tilkoblingen blir frakoblet."
                }, {
                    type: "name",
                    title: "Behovsbetinget tilkobling",
                    content: "Velg denne modusen for å koble til Internett-tilkoblingen basert på den bestemte tiden som inaktiv (Maks. tid uten aktivitet). Tilkoblingen vil vanligvis bli gjenopprettet når du prøver å få tilgang på Internett igjen."
                }, {
                    type: "name",
                    title: "Koble til manuelt",
                    content: "Velg denne modusen for å koble til eller fra Internett-tilkoblingen manuelt eller basert på den bestemte tiden som inaktiv (Maks. tid uten aktivitet)."
                }, {
                    type: "name",
                    title: "Maks. tid uten aktivitet",
                    content: "<b>15 minutter</b> – Skriv inn et antall minutter som Internett-tilkoblingen kan være inaktiv før den blir avsluttet. Standard tid uten aktivitet er 15 minutter."
                }]
            }, {
                type: "name",
                title: "Godkjenningstype",
                content: "Velg en godkjenningstype fra rullegardinlisten. Standardmetoden er AUTO_AUTH."
            }, {
                type: "name",
                title: "Koble til/fra",
                content: "Klikk for å koble til/fra umiddelbart."
            }, {
                type: "paragraph",
                content: "Klikk på <b>Avansert</b> for å se flere avanserte innstillinger."
            }, {
                type: "name",
                title: "Avansert",
                children: [{
                    type: "name",
                    title: "Tjenestenavn",
                    content: "Skriv inn tjenestenavn gitt av din ISP. Hvis ikke, la det stå tomt."
                }, {
                    type: "name",
                    title: "Servernavn",
                    content: "Skriv inn servernavn gitt av din ISP. Hvis ikke, la det stå tomt."
                }, {
                    type: "name",
                    title: "MTU-størrelse (i byte)",
                    content: "Den vanlige MTU-størrelsen (Maximum Transmission Unit) for Ethernet-nettverk er 1480 byte.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Merknad</b>: I sjeldne tilfeller kan ISP-en din kreve at du justerer MTU-størrelsen for bedre nettverksytelse. Du bør ikke forandre verdien med mindre det er helt nødvendig."
                    }]
                }, {
                    type: "name",
                    title: "IGMP-proxy",
                    content: "IGMP (Internet Group Management Protocol) blir brukt for å behandle multikasting på TCP/IP-nettverk. Noen ISP-er bruker IGMP for å utføre ekstern konfigurasjon på en ruter. Det er aktivert som standard."
                }, {
                    type: "name",
                    title: "Bruk IP-en angitt av ISP",
                    content: "Velg dette alternativet og skriv inn IP-adressen gitt av din ISP."
                }, {
                    type: "name",
                    title: "Intervall for ekkoforespørsel",
                    content: "Skriv inn en tidsintervallverdi mellom 0 og 120 (sekunder) som brukes når ruteren får tilgangskonsentratoren til å sende ekko for hvert intervall. Standardverdien er 30. 0 betyr ingen registrering."
                }, {
                    type: "name",
                    title: "Bruk følgende DNS-adresse",
                    content: "Velg denne avmerkingsboksen og skriv inn serveradresse(r) for DNS i prikket desimalnotasjon levert av din ISP. Dette WAN-grensesnittet prioriterer den spesifikke DNS-serveren."
                }]
            }, {
                type: "title2",
                content: "Tilkoblingstype: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Velg denne typen hvis du kobler til en L2TP/PPTP VPN-server og har fått et brukernavn, passord og IP-adresse/Domenenavn for serveren av ISP-en din."
            }, {
                type: "name",
                title: "Brukernavn/passord",
                content: "Skriv inn brukernavn og passord gitt av din ISP. Disse feltene skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "IP-adresse/Primær DNS",
                content: "Disse parametrene vil bli automatisk tilordnet av DHCP-serveren fra din ISP."
            }, {
                type: "name",
                title: "Sekundær tilkobling (Dynamisk IP eller Statisk IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Velg dette hvis IP-adressen og nettverksmasken er automatisk tilordnet av din ISP."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: "Velg dette hvis IP-adressen, nettverksmasken, Gatewayen og DNS-adressene er gitt av din ISP, og skriv inn denne informasjonen i de samsvarende feltene."
                }]
            }, {
                type: "name",
                title: "IP/Domenenavn for VPN-server",
                content: "Skriv inn VPN-serverens IP-adresse eller domenenavn gitt av din ISP."
            }, {
                type: "name",
                title: "MTU-størrelse",
                content: "Standard og vanlig MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1460 byte (1420 for PPTP). Ikke bytt standardstørrelsen på MTU med mindre det kreves av ISP-en din."
            }, {
                type: "name",
                title: "Tilkoblingsmodus",
                content: "Velg en passende tilkoblingsmodus nedenfor som bestemmer hvordan man kobler til Internett.",
                children: [{
                    type: "name",
                    title: "Alltid På",
                    content: "I denne modusen vil Internett-tilkoblingen alltid koble til på nytt når den blir frakoblet."
                }, {
                    type: "name",
                    title: "Behovsbetinget tilkobling",
                    content: "I denne modusen vil Internett-tilkoblingen bli avsluttet automatisk etter en bestemt tid som inaktiv (Maks. tid uten aktivitet) har passert. Tilkoblingen vil vanligvis bli gjenopprettet når du prøver å få tilgang på Internett igjen."
                }, {
                    type: "name",
                    title: "Koble til manuelt",
                    content: "I denne modusen vil Internett-tilkoblingen bli kontrollert manuelt ved å klikke på «Koble til»- eller «Koble fra»-knappen. Denne modusen støtter også funksjonen for maks. tid uten aktivitet. Skriv inn maks. tid uten aktivitet (i minutter) for å angi den maksimale tiden Internett-tilkoblingen kan være inaktiv før den blir avsluttet. Standardverdien er 15 minutter. Hvis du vil at Internett-tilkoblingen alltid skal forbli aktiv, skriv inn 0 (null)."
                }]
            }, {
                type: "title",
                content: "MAC-klone"
            }, {
                type: "name",
                title: "Bruk standard MAC-adresse",
                content: "Velg dette alternativet for å bruke standard MAC-adresse i tilfeller hvor ISP-en har tilordnet en IP-adresse til ruterens MAC-adresse."
            }, {
                type: "name",
                title: "Bruk datamaskinens gjeldende MAC-adresse",
                content: "Velg dette alternativet for å bruke MAC-adressen til den tilkoblede datamaskinen i tilfeller hvor bare ISP-en gir denne datamaskinen tilgang på Internett."
            }, {
                type: "name",
                title: "Bruk tilpasset MAC-adresse",
                content: "Velg dette alternativet for å skrive inn den registrerte MAC-adressen manuelt."
            }]
        },
        route: {
            TITLE: "Avansert ruting",
            CONTENT: [{
                type: "paragraph",
                content: "Avansert ruting blir brukt for å forutbestemme en fast rute brukt av pakkene med nettverksinformasjon for å nå en bestemt vert eller nettverk."
            }, {
                type: "title",
                content: "Statisk ruting"
            }, {
                type: "name",
                title: "Mål-IP-adresse/Nettverksmaske/Gateway",
                content: "Viser mål-IP-adresse, Nettverksmaske og Gateway til den statiske ruten."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Indikerer gjeldende regelstatus for en statisk rute. Trykk på <b>Lyspære</b>ikonet for å aktivere eller deaktivere den statiske ruten."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å <b>Endre</b> eller <b>Slette</b> samsvarende oppføring."
            }, {
                type: "note",
                title: "For å sette opp en statisk rute",
                content: [
                    "Klikk på <b>Legg til</b>.",
                    "Skriv inn en mål-IP-adresse for å tilordne oppføringens statiske rute.",
                    "Skriv inn en nettverksmaske i heksadesimalformat for å bestemme nettverksdelen og vertsdelen til IP-adressen.",
                    "Skriv inn en IP-adresse i gatewayformat for å koble ruteren til nettverket eller verten.",
                    "Velg <b>LAN</b> eller WAN-grensesnitt for å angi type mål-IP-adresse.",
                    "Velg <b>Aktiver denne oppføringen</b>.",
                    "Klikk <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Systemrutingtabell"
            }, {
                type: "paragraph",
                content: "Tabellen for systemruting viser alle gyldig ruteoppføringer som er i bruk."
            }, {
                type: "paragraph",
                content: "Klikk på Oppdater for å oppdatere rutingtabellen."
            }]
        },
        ddns: {
            TITLE: "Dynamiske DNS-innstillinger",
            CONTENT: [{
                type: "paragraph",
                content: "Dynamisk DNS (domenenavnsystem) lar deg tilordne en fast vert og domenenavn til en dynamisk IP-adresse på Internett. Det er nyttig når du drifter ditt eget nettsted, FTP-server eller en annen server bak ruteren. Først må du registrere deg hos en DDNS-serverleverandør, slik som <a href=«http://www.dyndns.com»>www.dyndns.com</a>."
            }, {
                type: "name",
                title: "Tjenestetilbyder",
                content: "Velg din DDNS-serverleverandør. Hvis du ikke har registrert en DDNS-konto, klikk <b>Gå til register</b>"
            }, {
                type: "name",
                title: "Brukernavn/passord",
                content: "Skriv inn brukernavnet og passordet til DDNS-kontoen din."
            }, {
                type: "name",
                title: "Domenenavn",
                content: "Skriv inn domenenavnet gitt av DDNS-tjenesteleverandøren."
            }, {
                type: "name",
                title: "Logg inn/Logg ut",
                content: "Klikk for å logge inn eller logge ut av DDNS-tjenesten."
            }, {
                type: "name",
                title: "Lagre",
                content: "Klikk for å lagre alle innstillingene."
            }, {
                type: "paragraph",
                content: "For å bytte mellom DDNS-kontoene dine, klikk Logg ut for å logge ut av den gjeldende kontoen, og logg så inn igjen med en annen konto."
            }]
        },
        dhcp: {
            TITLE: "DHCP-server",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP-servere vil (Dynamic Host Configuration Protocol) dynamisk tilordne TCP/IP-konfigurasjon til klientenheter fra en IP-adressegruppe. IKKE deaktiver standard-DHCP-serveren med mindre du har en annen DHCP-server eller du ønsker å manuelt tilordne TCP/IP-konfigurasjonen til individuelle klienter på nettverket ditt."
            }, {
                type: "name",
                title: "IP-adresseutvalg",
                content: "Angi området av IP-adresser som kan leies ut til klienter."
            }, {
                type: "name",
                title: "Leietid for adresse",
                content: "Skriv inn varigheten som en IP-adresse blir leid ut til klienten, mellom 1 og 2880 minutter."
            }, {
                type: "name",
                title: "Standard gateway",
                content: "Skriv inn IP-adressen til LAN-et. (Valgfritt)"
            }, {
                type: "name",
                title: "DNS-server/Sekundær DNS-server",
                content: "Skriv inn DNS-serveradresse gitt av din ISP. (Valgfritt)"
            }, {
                type: "title",
                content: "Klientliste"
            }, {
                type: "name",
                title: "Klienter totalt",
                content: "Viser det totale antall tilknyttede DHCP-klienter."
            }, {
                type: "name",
                title: "Klientnavn",
                content: "Viser navnet til DHCP-klienten."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen."
            }, {
                type: "name",
                title: "Tildelt IP-adresse",
                content: "Viser den tildelte IP-adressen til klienten av DHCP-serveren."
            }, {
                type: "name",
                title: "Tid utleid",
                content: "Viser varigheten på IP-adressen som har blitt leid ut til klienten."
            }, {
                type: "name",
                title: "Oppdater",
                content: "Klikk for å oppdatere DHCP-klientlisten."
            }, {
                type: "title",
                content: "Adressereservasjon"
            }, {
                type: "paragraph",
                content: "Du kan manuelt reservere en IP-adresse for en klient som er tilkoblet ruteren. Når den er reservert, vil IP-adressen bare bli tilordnet samme klient av DHCP-serveren."
            }, {
                type: "name",
                title: "MAC-adresse",
                content: "Viser MAC-adressen til klienten med DHCP-reservert IP-adresse."
            }, {
                type: "name",
                title: "Reservert IP-adresse",
                content: "Viser den reserverte IP-adressen til klienten."
            }, {
                type: "name",
                title: "Beskrivelse",
                content: "Viser navnet på enheten."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Klikk for å aktivere den samsvarende oppføringen."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å <b>Endre</b> eller <b>Slette</b> samsvarende klient."
            }, {
                type: "note",
                title: "For å reservere en IP-adresse til en DHCP-klient",
                content: [
                    "Klikk på <b>Legg til</b>.",
                    "Skriv inn <b>MAC-adressen</b> til klienten.",
                    "Skriv inn IP-adressen som du vil reservere til klienten.",
                    "Skriv inn beskrivelsen av enheten.",
                    "Velg <b>Aktiver denne oppføringen</b>.",
                    "Klikk <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "For å endre eller slette en eksisterende klient",
                content: [
                    "Klikk <b>Endre</b> eller <b>Papirkurv</b>-ikonet i den samsvarende oppføringen."
                ]
            }, {
                type: "title",
                content: "Betingelsesutvalg"
            }, {
                type: "name",
                title: "Leverandør-ID/Startende IP-adresse/Avsluttende IP-adresse/Fasilitet",
                content: "Viser leverandør-ID, startende IP-adresse, avsluttende IP-adresse og fasiliteten til betingelsesutvalget."
            }, {
                type: "name",
                title: "Status",
                content: "Indikerer gjeldende status for betingelsesutvalget. Trykk på Lyspæreikonet for å aktivere eller deaktivere betingelsesutvalget."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å <b>Endre</b> eller <b>Slette</b> samsvarende klient."
            }, {
                type: "note",
                title: "For å legge til et betingelsesutvalg",
                content: [
                    "Klikk på <b>Legg til</b>.",
                    "Skriv inn enhetsnavnet for LAN-et.",
                    "Skriv inn en verdi for å identifisere leverandøren og funksjonaliteten til DHCP-klienten.",
                    "Skriv inn startende IP-adresse som DHCP-serveren tilordner klienter.",
                    "Skriv inn avsluttende IP-adresse som DHCP-serveren tilordner klienter.",
                    "Skriv inn standard-gatewayen til DHCP-serveren.",
                    "Velg en enhetstype fra rullegardinlisten.",
                    "Velg et alternativ fra rullegardinlisten.",
                    "Skriv inn alternativsverdien.",
                    "Velg <b>Aktiver denne oppføringen</b>.",
                    "Klikk <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV-innstillinger",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Velg for å aktivere IPTV-funksjonen."
            }, {
                type: "name",
                title: "Modus",
                content: "Velg passende modus i henhold til din ISP. Det er seks IPTV-moduser:",
                children: [{
                    type: "name",
                    title: "Bro",
                    content: "Velg denne hvis din ISP ikke er oppført og ingen andre parametre er forutbestemt.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tilordne LAN-porten din til å fungere som Internett-leverandør eller IPTV-leverandør."
                    }]
                }, {
                    /*type: "name",
                    title: "Russland",
                    content: "Velg dette hvis ISP-en din er fra Russland og de nødvendige parametrene er forutbestemt, inkludert Internett/IP-telefon/IPTV for VLAN ID og Prioritet, samt LAN-port (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "IPTV Multicast VLAN ID/Prioritet",
                        content: "Du kan aktivere funksjonen for IPTV multicast som ønsket, og konfigurere VLAN ID og Prioritet i henhold til din ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapore-ExStream",
                    content: "Velg dette hvis ISP-en din er ExStream fra Singapor og de nødvendige parametrene er forutbestemt, inkludert Internett/IP-telefon/IPTV for IPTV VLAN ID og Prioritet, samt LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Unifi",
                    content: "Velg dette hvis ISP-en din er Unifi fra Malaysia og de nødvendige parametrene er forutbestemt, inkludert Internett/IP-telefon/IPTV for IPTV VLAN ID og Prioritet, samt LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malaysia-Maxis",
                    content: "Velg dette hvis ISP-en din er Maxis fra Singapor og de nødvendige parametrene er forutbestemt, inkludert Internett/IP-telefon/IPTV for IPTV VLAN ID og Prioritet, samt LAN-port (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Tilpasset",
                    content: "Velg dette hvis ISP-en din ikke er oppført, men gir de nødvendige parametrene, inkludert Internett/IP-telefon/IPTV for IPTV VLAN ID og Prioritet, samt LAN-port (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "Internett/IP-telefon/IPTV VLAN ID/Prioritet",
                        content: "Konfigurer VLAN ID-er gitt av ISP-en din."
                    }, {
                        type: "name",
                        title: "802.11Q Merke",
                        content: "Velg om du skal merke Internett-pakkene med 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Tilordne LAN-porten din til å fungere som Internett-leverandør eller IPTV-leverandør."
                    }, {
                        type: "name",
                        title: "IPTV Multicast VLAN ID/Prioritet",
                        content: "Du kan aktivere funksjonen for IPTV multicast som ønsket, og konfigurere VLAN ID og Prioritet i henhold til din ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP-proxy",
                content: "Velg proxy-versjon for IGMP (Internet Group Management Protocol), enten V2 eller V3 i henhold til din ISP."
            }]
        },
        usbManage: {
            TITLE: "USB-lagringsenhet",
            CONTENT: [{
                type: "paragraph",
                content: "Skjermen for <b>USB-lagringsenheten</b> viser grunnleggende informasjon om USB-lagringsenheten tilkoblet via USB-porten."
            }, {
                type: "name",
                title: "Skann",
                content: "Vanligvis vil ruteren automatisk oppdage nye tilkoblede enheter. Hvis ikke, klikk på denne knappen og oppdater skjermen med den oppdaterte informasjonen."
            }, {
                type: "name",
                title: "Volumnavn",
                content: "Viser navnet til USB-volumet."
            }, {
                type: "name",
                title: "Kapasitet",
                content: "Viser USB-enhetens totale lagringskapasitet."
            }, {
                type: "name",
                title: "Ledig plass",
                content: "Viser tilgjengelig ledig lagringsplass."
            }, {
                type: "name",
                title: "Aktive",
                content: "Denne avmerkingsboksen dukker bare opp når en USB-lagringsenhet kobles til ruteren. Velg for å aktivere fildeling for USB-enheten."
            }, {
                type: "name",
                title: "Trygg fjerning",
                content: "Klikk på denne knappen for å trygt koble fra USB-lagringsenheten før du fysisk kobler den fra ruteren. Merk at «Trygg fjerning»-knappen bare dukker opp når en USB-lagringsenhet er koblet til ruteren. Husk også på at du ikke kan koble fra USB-enheten mens den er i bruk."
            }, {
                type: "title",
                content: "Innstillinger for deling"
            }, {
                type: "name",
                title: "Nettverksmedia/Servernavn",
                content: "Viser navnene brukt for å få tilgang til den tilkoblede USB-lagringsenheten."
            }, {
                type: "title",
                content: "Mappedeling"
            }, {
                type: "name",
                title: "Del alle",
                content: "Skru På for å dele alle filene og mappene eller Av for å bare dele de valgte mappene."
            }, {
                type: "name",
                title: "Aktiver godkjenning",
                content: "Skru På for å aktivere godkjenning, hvilket krever at brukere skriver inn et gyldig brukernavn og passord for å få tilgang til alle de delte mappene."
            }, {
                type: "name",
                title: "Mappenavn",
                content: "Viser navnet til den delte mappen. "
            }, {
                type: "name",
                title: "Mappebane",
                content: "Viser banen til den delte mappen. "
            }, {
                type: "name",
                title: "Volumnavn",
                content: "Viser navnet til det delte volumet."
            }]
        },
        printSrv: {
            TITLE: "Utskriftsserver",
            CONTENT: [{
                type: "name",
                title: "Aktiver utskriftsserver",
                content: "Skru På for å aktivere funksjonen for utskriftsserver."
            }, {
                type: "name",
                title: "Skrivernavn",
                content: "Viser navnet på skriveren som er koblet til ruteren."
            }]
        },
        diskSettings: {
            TITLE: "USB-lagringsenhet",
            CONTENT: [{
                type: "paragraph",
                content: "Skjermen for <b>USB-lagringsenheten</b> viser grunnleggende informasjon om USB-lagringsenheten tilkoblet via USB-porten."
            }, {
                type: "name",
                title: "Skann",
                content: "Vanligvis vil ruteren automatisk oppdage nye tilkoblede enheter. Hvis ikke, klikk på denne knappen og oppdater skjermen med den oppdaterte informasjonen."
            }, {
                type: "name",
                title: "Volumnavn",
                content: "Viser navnet til USB-volumet."
            }, {
                type: "name",
                title: "Kapasitet",
                content: "Viser USB-enhetens totale lagringskapasitet."
            }, {
                type: "name",
                title: "Ledig plass",
                content: "Viser tilgjengelig ledig lagringsplass."
            }, {
                type: "name",
                title: "Aktive",
                content: "Denne avmerkingsboksen dukker bare opp når en USB-lagringsenhet kobles til ruteren. Velg for å aktivere fildeling for USB-enheten."
            }, {
                type: "name",
                title: "Trygg fjerning",
                content: "Klikk på denne knappen for å trygt koble fra USB-lagringsenheten før du fysisk kobler den fra ruteren. Merk at «Trygg fjerning»-knappen bare dukker opp når en USB-lagringsenhet er koblet til ruteren. Husk også på at du ikke kan koble fra USB-enheten mens det gjeldende volumet er i bruk."
            }, {
                type: "note",
                title: "For å sette opp en filserver",
                content: [
                    "Koble USB-lagringsenheten til ruterens USB-port gjennom en USB-kabel.",
                    "Den nylig tilkoblede USB-enheten skal bli oppdaget automatisk av ruteren og vise informasjonen under delen for <b>Enhetsinnstillinger</b>. Hvis ikke, klikk <b>Skann</b>.",
                    "Klikk på <b>Aktiv</b>-ikonet for å aktivere fildeling."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Konto for deling",
            CONTENT: [{
                type: "name",
                title: "Konto",
                content: "Du kan enten velge <b>Bruk standardkonto</b> for å logge inn til de delte filene og mappene, eller <b>Bruk ny konto</b> og skrive inn følgende for å opprette en ny brukerkonto."
            }, {
                type: "name",
                title: "Brukernavn/passord",
                content: "Skriv opp til 15 tegn bestående av bokstaver, numre og/eller understrek-strenger. Brukernavnet må starte med et alfabetisk tegn. Disse feltene skiller mellom store og små bokstaver. "
            }, {
                type: "paragraph",
                content: "Klikk på <b>Lagre</b> for å lagre kontoinnstillingene."
            }, {
                type: "title",
                content: "Innstillinger for deling"
            }, {
                type: "name",
                title: "Nettverk/media-servernavn",
                content: "Viser navnene brukt for å få tilgang til den tilkoblede USB-lagringsenheten."
            }, {
                type: "name",
                title: "Aktiver",
                content: "Velg avmerkingsboksen(e) for å aktivere samsvarende tilgangsmetode(r)."
            }, {
                type: "name",
                title: "Tilgangsmetode",
                content: "Det er fire metoder for å få tilgang til den tilkoblede USB-lagringsenheten.",
                children: [{
                    type: "name",
                    title: "Medieserver",
                    content: "Velg dette alternativet for å la brukere på nettverket ditt se bilder, spille av musikk og se filmer på din delte USB-lagringsenhet fra DNLA-støttede enheter slik som datamaskiner, mobile enheter og spillkonsoller (PS2/3)."
                }, {
                    type: "name",
                    title: "Andre maskiner",
                    content: "Velg dette alternativet for å la brukere på nettverket ditt få tilgang på det delte innholdet via adressen vist under adressekolonnen."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Velg dette alternativet for å aktivere funksjonen for FTP-serveren som lar FTP-klienter og brukere på nettverket ditt få tilgang på USB-lagringsenheten via FTP-adressen vist i adressekolonnen. For å endre serverporten for FTP, skriv inn et nytt portnummer og klikk <b>Lagre</b> for å bruke endringene."
                }, {
                    type: "name",
                    title: "FTP (via Internett)",
                    content: "Velg dette alternativet for å la FTP-klienter og brukere få ekstern tilgang til, laste ned og laste opp filer til den delte USB-lagringsenheten gjennom FTP over Internett."
                }]
            }, {
                type: "name",
                title: "Tilgang",
                content: "Viser adressene brukt for å få tilgang til den delte USB-lagringsenheten."
            }, {
                type: "name",
                title: "Port",
                content: "Skriv inn portnummeret til FTP-serveren."
            }, {
                type: "title",
                content: "Mappedeling"
            }, {
                type: "name",
                title: "Del alle",
                content: "Skru På for å dele alle filene og mappene eller Av for å bare dele de valgte mappene."
            }, {
                type: "name",
                title: "Aktiver godkjenning",
                content: "Skru På for å aktivere godkjenning, hvilket krever at brukere skriver inn et gyldig brukernavn og passord for å få tilgang til alle de delte mappene."
            }, {
                type: "name",
                title: "Mappenavn",
                content: "Viser navnet til den delte mappen. "
            }, {
                type: "name",
                title: "Mappebane",
                content: "Viser banen til den delte mappen. "
            }, {
                type: "name",
                title: "Mediedeling",
                content: "Viser om funksjonen for mediedeling er aktivert (På) eller deaktivert (Av)."
            }, {
                type: "name",
                title: "Volumnavn",
                content: "Viser navnet til det delte volumet."
            }, {
                type: "name",
                title: "Status",
                content: "Indikerer gjeldende status for en delt mappe. Trykk på Lyspæreikonet for å aktivere (eller deaktivere) mappedeling."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å <b>Endre</b> eller <b>Slette</b> samsvarende delte mappe."
            }, {
                type: "note",
                title: "For å legge til en oppføring for mappedeling:",
                content: [
                    "Skru Av <b>Velg alle</b>.",
                    "Klikk på <b>Legg til</b>.",
                    "Velg <b>Volumnavn</b> og <b>Mappebane</b>.",
                    "Opprett et mappenavn.",
                    "Velg måten du deler mappen på:<br /><b>Aktiver godkjenning</b> – Velg for å kreve at brukere godkjennes med et gyldig brukernavn og passord for å få tilgang til de delte mappene.<br /><b>Aktiver skrivebeskyttelse</b> – Velg for å la brukere gjøre endringer på mappeinnholdet.<br /><b>Aktiver Mediedeling</b> – Velg for å aktivere mediedeling.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPSec-innstillinger",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection (Registrering av inaktive noder)",
                content: "Dead Peer Detection (DPD) er en metode brukt for registrere inaktiv Internet Key Exchange-noder (IKE). DPD blir brukt for å gjenvinne tapte ressurser hvis en node har blitt inaktiv, og blir også brukt for å utføre failover av IKE-node. Skru På for å aktivere DPD-funksjonen."
            }, {
                type: "name",
                title: "Tilkoblingsnavn/Ekstern Gateway/Lokal adresse/Ekstern adresse",
                content: "Viser tilkoblingsnavnet, ekstern gateway, lokal adresse og ekstern adresse for IPSec-oppføringen."
            }, {
                type: "name",
                title: "Status",
                content: "Viser statusen til IPSec-oppføringen. Statusen inkluderer:",
                children: [{
                    type: "name",
                    title: "Deaktivert",
                    content: "Oppføringen er deaktivert."
                }, {
                    type: "name",
                    title: "Ned",
                    content: "Oppføringen er aktivert, men uten tilkobling."
                }, {
                    type: "name",
                    title: "Opp",
                    content: "Oppføringen er aktivert og tilkoblet. "
                }]
            }, {
                type: "name",
                title: "Aktiver",
                content: "Trykk på <b>Lyspære</b>ikonet for å aktivere eller deaktivere oppføringen."
            }, {
                type: "name",
                title: "Endre",
                content: "Viser alternativer for å <b>Endre</b> eller <b>Slette</b> samsvarende oppføring."
            }, {
                type: "name",
                title: "Legg til",
                content: "Klikk for å legge til en ny IPSec VPN-tilkobling."
            }, {
                type: "name",
                title: "Tilkoblingsnavn for IPSec",
                content: "Skriv inn et navn for IPSec VPN-tilkoblingen."
            }, {
                type: "name",
                title: "Ekstern Gateway-adresse for IPSec (URL)",
                content: "Skriv inn mål-IP-adressen for gatewayen som er den offentlige WAN-IP-en eller domenenavnet på VPN-serverens eksterne endepunkt."
            }, {
                type: "name",
                title: "Tunneltilgang fra lokale IP-adresser",
                content: "Velg delnettsadresse hvis du vil at hele LAN-et skal bli med i VPN-nettverket, eller velg Enkel adresse om du vil at en enkel IP skal bli med i VPN-nettverket. "
            }, {
                type: "name",
                title: "IP-adresse for VPN",
                content: "Skriv inn IP-adressen til LAN-et ditt. "
            }, {
                type: "name",
                title: "Nettverksmaske for IP",
                content: "Skriv inn nettverksmasken til LAN-et ditt."
            }, {
                type: "name",
                title: "Tunneltilgang fra eksterne IP-adresser",
                content: "Velg delnettsadresse hvis du vil at hele det eksterne LAN-et skal bli med i VPN-nettverket, eller velg Enkel adresse om du vil at en enkel IP skal bli med i VPN-nettverket."
            }, {
                type: "name",
                title: "IP-adresse for VPN",
                content: "Skriv inn IP-adressen til det eksterne LAN-et. "
            }, {
                type: "name",
                title: "Nettverksmaske for IP",
                content: "Skriv inn nettverksmasken til det eksterne LAN-et."
            }, {
                type: "name",
                title: "Key Exchange Method",
                content: "Velg Auto (IKE) eller Manuelt for å godkjenne IPSec-noder."
            }, {
                type: "name",
                title: "Godkjenningsmetode",
                content: "Velg forhåndsdelt nøkkel (anbefalt)."
            }, {
                type: "name",
                title: "Forhåndsdelt nøkkel",
                content: "Opprett en forhåndsdelt nøkkel som blir brukt til godkjenning."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "Velg Aktiver (eller Deaktiver) Perfect Forward Secrecy (PFS) som en ekstra sikkerhetsprotokoll for den forhåndsdelte nøkkelen."
            }, {
                type: "name",
                title: "Avansert",
                content: "Klikk for å konfigurere de avanserte innstillingene. Vi anbefaler at du beholder standardinnstillingene. Hvis du vil endre disse innstillingene, sørg for at begge endepunktene for VPN-serveren bruker samme krypteringsalgoritme, integritetsalgoritme, Diffie-Hellman-gruppe og levetid for nøkkel i både fase 1 og fase 2.",
                children: [{
                    type: "title2",
                    content: "Fase 1"
                }, {
                    type: "name",
                    title: "Modus",
                    content: "Velg <b>Hoved</b> for å konfigurere standard forhandlingsparametre for fase 1 av IKE. Velg <b>Aggressiv</b> for å konfigurere at IKE fase 1 for VPN-tunnelen skal utføre forhandlinger på kortere tid.  (Ikke anbefalt ettersom det er mindre sikkert.)"
                }, {
                    type: "name",
                    title: "Lokal identifikatortype",
                    content: "Velg den lokale identifikatortypen for IKE-forhandling. Lokal WAN-IP bruker en IP-adresse som identifikator under IKE-forhandling. FQDN (Fully Qualified Domain Name) bruker et brukernavn som identifikator."
                }, {
                    type: "name",
                    title: "Lokal identifikator",
                    content: "Den lokale identifikatoren vil bli automatisk utfylt hvis <b>Lokal WAN-IP</b> er valgt. Hvis <b>FQDN</b> er valgt, skriv inn et brukernavn til den lokale enheten som blir brukt som identifikator for IKE-forhandling."
                }, {
                    type: "name",
                    title: "Ekstern identifikatortype",
                    content: "Velg den eksterne identifikatortypen for IKE-forhandling. Ekstern WAN-IP bruker en IP-adresse som identifikator under IKE-forhandling. FQDN bruker et brukernavn som identifikator."
                }, {
                    type: "name",
                    title: "Ekstern identifikator",
                    content: "Den eksterne IP-adressen for gatewayen vil bli automatisk utfylt hvis <b>Ekstern WAN-IP</b> er valgt. Hvis <b>FQDN</b> er valgt, skriv inn et brukernavn til den lokale noden som blir brukt som identifikator for IKE-forhandling."
                }, {
                    type: "name",
                    title: "Krypteringsalgoritme",
                    content: "Velg en av de følgende krypteringsalgoritmene for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterer en 64-biters blokk av ren tekst med en 56-biters nøkkel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Trippel-DES krypterer ren tekst med en 168-biters nøkkel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Bruker AES-algoritmen og 128-biters nøkkel for kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Bruker AES-algoritmen og 192-biters nøkkel for kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Bruker AES-algoritmen og 256-biters nøkkel for kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritme",
                    content: "Velg en av de følgende integritetsalgoritmene for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tar en melding av vilkårlig lengde og genererer et 128-biters meldingssammendrag."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tar en melding mindre enn 2^64 (2 opphøyd i 64) biter og genererer et 160-biters meldingssammendrag."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-gruppen nøkkelutveksling",
                    content: "Bruk Diffie-Hellman-gruppen til nøkkelforhandling fase 1. Diffie-Hellman-gruppen angir algoritmestyrken i biter."
                }, {
                    type: "name",
                    title: "Levetid for nøkkel",
                    content: "Skriv inn tidsperioden (i sekunder) før etablering av en ny IPSec-sikkerhetstilordning (SA) med det eksterne endepunktet. Standardverdien er 3600."
                }, {
                    type: "title2",
                    content: "Fase 2"
                }, {
                    type: "name",
                    title: "Krypteringsalgoritme",
                    content: "Velg en av de følgende krypteringsalgoritmene for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) krypterer en 64-biters blokk av ren tekst med en 56-biters nøkkel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Trippel-DES krypterer ren tekst med en 168-biters nøkkel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Bruker AES-algoritmen og 128-biters nøkkel for kryptering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Bruker AES-algoritmen og 192-biters nøkkel for kryptering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Bruker AES-algoritmen og 256-biters nøkkel for kryptering."
                    }]
                }, {
                    type: "name",
                    title: "Integritetsalgoritme",
                    content: "Velg en av de følgende integritetsalgoritmene for IKE-forhandling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) tar en melding av vilkårlig lengde og genererer et 128-biters meldingssammendrag."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tar en melding mindre enn 2^64 (2 opphøyd i 64) biter og genererer et 160-biters meldingssammendrag."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-gruppen nøkkelutveksling",
                    content: "Bruk Diffie-Hellman-gruppen til nøkkelforhandling fase 2. Diffie-Hellman-gruppen angir algoritmestyrken i biter."
                }, {
                    type: "name",
                    title: "Levetid for nøkkel",
                    content: "Skriv inn tidsperioden (i sekunder) før etablering av en ny IPSec-sikkerhetstilordning (SA) med det eksterne endepunktet. Standardverdien er 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Installasjon av Internett-tilkobling",
            CONTENT: [{
                type: "name",
                title: "Automatisk oppdagelse",
                content: "Klikk på denne knappen for å la ruteren søke automatisk etter din gjeldende type Internett-tilkobling."
            }, {
                type: "paragraph",
                title: "Merk",
                content: "Hvis du er ikke sikker på hvilken type Internett-tilkobling du har, bruk Autosøk-funksjonen eller kontakt din ISP for assistanse."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: Statisk IP"
            }, {
                type: "name",
                title: "IP-adresse/Nettverksmaske/Standard Gateway/Primær DNS/Sekundær DNS",
                content: "Skriv inn informasjonen gitt av din ISP."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: Dynamisk IP"
            }, {
                type: "name",
                title: "IKKE klon MAC-adresse/Klok gjeldende MAC-adresse for datamaskinen",
                content: "Velg om du skal klone MAC-adressen din eller ikke, i henhold til din ISP."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: PPPoE"
            }, {
                type: "name",
                title: "Brukernavn/passord",
                content: "Skriv inn brukernavn og passord gitt av din ISP. Disse feltene skiller mellom store og små bokstaver."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: L2TP/PPTP"
            }, {
                type: "name",
                title: "Brukernavn/passord",
                content: "Skriv inn brukernavn og passord gitt av din ISP. Disse feltene skiller mellom store og små bokstaver."
            }, {
                type: "name",
                title: "Sekundær tilkobling (Dynamisk IP eller Statisk IP)",
                children: [{
                    type: "name",
                    title: "Dynamisk IP",
                    content: "Velg dette hvis IP-adressen og nettverksmasken er automatisk tilordnet av din ISP."
                }, {
                    type: "name",
                    title: "Statisk IP",
                    content: " Velg dette hvis IP-adressen, nettverksmasken, Gatewayen og DNS-adressene er gitt av din ISP, og skriv inn denne informasjonen i de samsvarende feltene."
                }]
            }, {
                type: "name",
                title: "IP/Domenenavn for VPN-server",
                content: "Skriv inn VPN-serverens IP-adresse eller domenenavn gitt av din ISP."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Utskriftsserver",
            CONTENT: [{
                type: "paragraph",
                content: "Du kan konfigurere utskriftsserver på denne siden."
            }, {
                type: "name",
                title: "Utskriftsserver",
                content: "Viser den gjeldende Aktiver/Deaktiver-statusen til utskriftsserveren."
            }, {
                type: "name",
                title: "Skrivernavn",
                content: "Navn på skriver som er koblet til ruteren."
            }, {
                type: "note",
                title: "Følg instruksene nedenfor for å installere utskriftsserveren din:",
                content: [
                    "Trinn 1: Koble USB-skriveren til ruterens USB-port gjennom en USB-skriverkabel.",
                    "Trinn 2:  Installer skriverdriveren på datamaskinen din.",
                    "Trinn 3:  Installer TP-LINK sin USB-skriverkontroller på datamaskinen din. Kjør ressurs-CD-en eller last ned TP-LINK sitt verktøy for USB-skriverkontrolleren fra vårt nettsted: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Avanserte trådløse innstillinger 2,4 GHz | 5 GHz-1 | 5 GHz-2",
            CONTENT: [{
                type: "name",
                title: "Signalintervall",
                content: "Skriv inn en verdi mellom 25 og 1000 i millisekunder for å bestemme avstanden mellom hvilke signalpakker som blir send ut av ruteren for å synkronisere det trådløse nettverket. Standardverdien er 100 millisekunder."
            }, {
                type: "name",
                title: "RTS-terskel",
                content: "Skriv inn en verdi mellom 1 og 2346 biter for å bestemme pakkestørrelsen på dataoverføring gjennom ruteren. Som standard, vil RTS-terskelen (Request to Send) være 2346. Hvis pakkestørrelsen er større enn den forhåndsinnstilte terskelen, vil ruteren sende RTS-frekvenser til en bestemt mottaksstasjon og tilpasse utsendingen av en datafrekvens, hvis ikke blir pakken sendt umiddelbart."
            }, {
                type: "name",
                title: "DTIM-intervall",
                content: "Skriv inn en verdi mellom 1 og 255 for å bestemme intervallet på Delivery Traffic Indication-meldingen (DTIM). 1 indikerer at DTIM-intervallet er det samme som signalintervallet."
            }, {
                type: "name",
                title: "Oppdateringsperiode for gruppenøkkel",
                content: "Skriv inn antall sekunder (minimum 30) for å kontrollere tidsintervallet på den automatiske fornyelsen av krypteringsnøkkelen. Standardverdien er 0, noe som indikerer ingen nøkkelfornyelse."
            }, {
                type: "name",
                title: "WMM-funksjon",
                content: "Denne funksjonen garanterer at pakkene med meldinger av høy prioritet blir sendt fortrinnsvis. Er sterkt anbefalt og aktivert som standard."
            }, {
                type: "name",
                title: "Kort GI-funksjon",
                content: "Denne funksjonen øker datakapasiteten ved å redusere tiden for Guard Interval (GI). Den er sterkt anbefalt og aktivert som standard."
            }, {
                type: "name",
                title: "AP-isolasjonsfunksjon",
                content: "Velg denne avmerkingsboksen for å aktivere funksjonen for AP-isolering som lar deg begrense og innskrenke alle trådløse enheter på nettverket ditt fra å samhandle med hverandre, men fremdeles ha Internett-tilgang. AP-isolering er deaktivert som standard."
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Aktiver WPS",
                content: "Skru På for å aktivere WPS-funksjonen."
            }, {
                type: "paragraph",
                content: "Klikk Lagre for å lagre innstillingene."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Nattmodus",
                content: "Når denne funksjonen er aktivert, vil ruterens LED-er bli slått av automatisk i den angitte tidsperioden."
            }, {
                type: "name",
                title: "Tidsperiode",
                content: "Skriv en tidsperiode hvor ruterens LED-er vil være avslått i."
            }, {
                type: "paragraph",
                content: "Klikk Lagre for å lagre innstillingene."
            }, {
                type: "title",
                title: "Beskyttelsesinnstillinger for DoS"
            }, {
                type: "paragraph",
                content: "Beskyttelsesnivået for DoS beskytter ruteren fra TCP-SYN-Flood, UDP-Flood og ICMP-Flood-angrep."
            }, {
                type: "name",
                title: "Nivå for ICMP-FLOOD-pakker",
                content: "Skriv inn en verdi mellom 5 og 3600 for å utløse ICMP-FLOOD-beskyttelse umiddelbart etter antall ICMP-pakker overskrider den forhåndsinnstilte terskelverdien."
            }, {
                type: "name",
                title: "Nivå for UPD-FLOOD-pakker",
                content: "Skriv inn en verdi mellom 5 og 3600 for å utløse UDP-FLOOD-beskyttelse umiddelbart etter antall UDP-pakker overskrider den forhåndsinnstilte terskelverdien."
            }, {
                type: "name",
                title: "Nivå for TCP-FLOOD-pakker",
                content: "Skriv inn en verdi mellom 5 og 3600 for å utløse TCP-SYN-FLOOD-beskyttelse umiddelbart etter antall TCP-SYN-pakker overskrider den forhåndsinnstilte terskelverdien."
            }, {
                type: "paragraph",
                content: "Klikk Lagre for å lagre innstillingene."
            }]
        },
        logConf: {
            TITLE: "Logginnstillinger",
            CONTENT: [{
                type: "name",
                title: "Lagre lokalt",
                content: "Velg for å lagre logger på ditt lokale minne.",
                children: [{
                    type: "name",
                    title: "Minimumnivå",
                    content: "Ved å velge minimumsnivået i rullegardinlisten, vil alle loggførte hendelser over eller lik det valgte nivået bli lagret."
                }]
            }, {
                type: "name",
                title: "Lagre eksternt",
                content: "Velg for å sende logger til den bestemte IP-adressen og UDP-porten til den eksterne systemloggserveren.",
                children: [{
                    type: "name",
                    title: "Minimumsnivå",
                    content: "Ved å velge minimumsnivået i rullegardinlisten, vil alle loggførte hendelser over eller lik det valgte nivået bli lagret."
                }, {
                    type: "name",
                    title: "Server-IP",
                    content: "Angi IP-adressen til den eksterne systemloggserveren som hendelsene vil bli sendt til."
                }, {
                    type: "name",
                    title: "Serverport",
                    content: "Angi portnummeret til den eksterne systemloggserveren som hendelsene vil bli sendt til."
                }, {
                    type: "name",
                    title: "Lokalt fasilitetsnavn",
                    content: "Velg det lokale fasilitetsnavnet i henhold til dine eksterne servere sine fasilitetsnavn."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Trådløs",
            CONTENT: [{
                type: "name",
                title: "Sikkerhet",
                content: "Du kan velge en av de følgende sikkerhetsalternativene: ",
                children: [{
                    type: "name",
                    title: "Ingen sikkerhet",
                    content: "De trådløse stasjonene vil koble til ruteren uten kryptering. Det er sterkt anbefalt å velge en av de følgende modusene for å aktiver sikkerhet."
                }, {
                    type: "name",
                    title: "Personlig WPA/WPA2",
                    content: "Velg WPA basert på forhåndsdelt passfrase.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Du kan velge en av de følgende versjonene",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Velg WPA-PSK eller WPA2-PSK automatisk basert på den trådløse stasjonens kapasitet og forespørsel."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Forhåndsdelt WPA2-nøkkel."
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan velge enten Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Trådløst passord",
                        content: "Du kan skrive inn ASCII eller heksadesimalske tegn. For heksadesimaler må lengden være mellom 8 og 64 tegn; for ASCII må lengden være mellom 8 og 63 tegn."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Velg WPA basert på Radius-server.",
                    children: [{
                        type: "name",
                        title: "Versjon",
                        content: "Du kan velge en av de følgende versjonene",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Velg WPA eller WPA2 automatisk basert på den trådløse stasjonens kapasitet og forespørsel."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi-beskyttet tilgang. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA versjon 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Kryptering",
                        content: "Du kan velge enten Auto, TKIP eller AES."
                    }, {
                        type: "name",
                        title: "Server-IP for Radius",
                        content: "Skriv inn IP-adressen til Radius-serveren."
                    }, {
                        type: "name",
                        title: "Radius-port",
                        content: "Skriv inn porten som radius-tjenesten brukte."
                    }, {
                        type: "name",
                        title: "Radius-passord",
                        content: "Skriv inn passordet til Radius-serveren."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Velg 802.11 WEP-sikkerhet.",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Du kan velge en av de følgende typene",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Velg godkjenningstypen Delt nøkkel eller Åpent system automatisk basert på den trådløse stasjonens kapasitet og forespørsel."
                        }, {
                            type: "name",
                            title: "Delt nøkkel",
                            content: "Velg 802.11 Delt nøkkel som godkjenningstype."
                        }, {
                            type: "name",
                            title: "Åpent system",
                            content: "Velg 802.11 Åpent system som godkjenningstype. "
                        }]
                    }, {
                        type: "name",
                        title: "Nøkkel valgt",
                        content: "Velg hvilken av de fire nøklene som skal brukes."
                    }, {
                        type: "name",
                        title: "WEP-nøkkel-format",
                        content: "Du kan velge ASCII- eller heksadesimalformat. ASCII-formatet står for enhver kombinasjon av tastaturtegnene i den angitte lengden. Heksadesimalformat står for enhver kombinasjon av heksadesimalske sifre (0–9, a–f, A–F) i den angitte lengden."
                    }, {
                        type: "name",
                        title: "Nøkkeltype",
                        content: "Du kan velge lengden på WEP-nøkkelen (64-biters, 128-biters eller 152-biters) for kryptering. «Deaktivert» betyr at denne oppføringen av WEP-nøkkelen er ugyldig.",
                        children: [{
                            type: "name",
                            title: "64-biters kryptering",
                            content: "Du kan skrive inn 10 heksadesimalske sifre (enhver kombinasjon av 0–9, a–f, A–F, og nullnøkkel er ikke tillatt) eller 5 ASCII-tegn."
                        }, {
                            type: "name",
                            title: "128-biters kryptering",
                            content: "Du kan skrive inn 26 heksadesimalske sifre (enhver kombinasjon av 0–9, a–f, A–F, og nullnøkkel er ikke tillatt) eller 13 ASCII-tegn."
                        }, {
                            type: "name",
                            title: "152-biters kryptering",
                            content: "Du kan skrive inn 32 heksadesimalske sifre (enhver kombinasjon av 0–9, a–f, A–F, og nullnøkkel er ikke tillatt) eller 16 ASCII-tegn. "
                        }]
                    }, {
                        type: "name",
                        title: "Nøkkelverdi",
                        content: "Skriv inn passord for WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modus",
                content: "Dette feltet bestemmer trådløsmodusen som ruteren bruker."
            }, {
                type: "name",
                title: "Kanalbredde",
                content: "Båndbredden til den trådløse kanalen."
            }, {
                type: "name",
                title: "Kanal",
                content: "Dette feltet bestemmer hvilken operativfrekvens som blir brukt. Det er ikke nødvendig å endre den trådløse kanalen med mindre du oppdager interferensproblemer med et annet tilgangspunkt i nærheten. Hvis du velger auto, vil AP automatisk velge den beste kanalen."
            }, {
                type: "name",
                title: "Overføringskraft",
                content: "Her kan du angi ruterens overføringskraft. Du kan velge det du foretrekker av Høy, Middels eller Lav. Høy er standardinnstillingen og er anbefalt. "
            }, {
                type: "paragraph",
                content: "Klikk Lagre for å <strong>lagre</strong> og bruke konfigen."
            }]
        },
        diagnostic: {
            TITLE: "Diagnoseverktøy",
            CONTENT: [{
                type: "paragraph",
                content: "Ruteren gir Ping- og Søkeruteverktøy for å hjelpe deg å feilsøke problemer med nettverkstilkobling. Ping-verktøyet sender pakker til en mål-IP-adresse eller domenenavn og loggfører resultater, slik som antall pakker sent/mottatt og rundturtiden. Søkeruteverktøyet sender pakker til en mål-IP-adresse eller domenenavn, og viser antall hopp og tid før målet er nådd."
            }, {
                type: "paragraph",
                content: "Du kan bruke ping og søkerute på en nettverksenhet gjennom IP-adressen eller domenenavnet, slik som google.com, yahoo.com, osv."
            }, {
                type: "note",
                title: "For å diagnostisere ved bruk av Ping",
                content: [
                    "Skriv inn mål-IP-adressen eller domenenavnet.",
                    "Klikk på Pil-ikonet for å åpne Avansert-menyen og angi antall ping og pakkestørrelse for ping. (Valgfritt)",
                    "Klikk Start."
                ]
            }, {
                type: "note",
                title: "For å diagnostisere ved bruk av Søkeruten",
                content: [
                    "Skriv inn mål-IP-adressen eller domenenavnet.",
                    "Klikk på Pil-ikonet for å åpne Avansert-menyen og angi antall hopp (som skal nås) i feltet for søkerutens maksimale TTL-felt (Levetid). Standardverdien er 20. (Valgfritt) ",
                    "Klikk Start."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC-adresse",
                content: "Ruterens unike fysiske adresse."
            }, {
                type: "name",
                title: "LAN IPv4",
                content: "Beholder ruterens standard IP-adresse (192.168.0.1) eller skriver inn en ny en. Denne IP-adressen kan bli brukt for å logge inn på ruterens webbehandlingsside."
            }, {
                type: "name",
                title: "Nettverksmaske",
                content: "Velg en tilordnet identifikator brukt av LAN-porten for å dirigere intern og ekstern trafikk fra rullegardinlisten eller skriv inn et nytt format for nettverksmasken. Standardverdien er 255.255.255.0."
            }, {
                type: "name",
                title: "IGMP Snooping",
                content: "IGMP (Internet Group Management Protocol) blir brukt for å behandle multikasting på TCP/IP-nettverk. Noen ISP-er bruker IGMP for å utføre ekstern konfigurasjon for klientenheter, slik som ruteren. Det er aktivert som standard."
            }, {
                type: "paragraph",
                title: "Merk",
                content: "Hvis den nye IP-adressen for LAN-et ikke er i samme delnett som den gamle, vil utvalget av IP-adresser for DHCP-serveren automatisk endres; den virtuelle serveren og DMZ-verten vil likevel ikke bli påvirket før de er konfigurert på nytt."
            }]
        },
        ddos: {
            TITLE: "Brannmur",
            CONTENT: [{
                type: "name",
                title: "SPI-brannmur",
                content: "SPI-brannmur (Stateful Packet Inspection) forhindrer cyber-angrep og validerer trafikken som går gjennom ruteren. SPI-brannmuren er aktivert som standard. "
            }, {
                type: "title",
                title: "Dos-beskyttelse"
            }, {
                type: "name",
                title: "DoS-beskyttelse",
                content: "DoS-beskyttelse (Denial of Service) beskytter LAN-et dit mot DoS-angrep som oversvømmer nettverket ditt med serverforespørsler. Som standard er DoS-beskyttelse deaktivert (Av)."
            }, {
                type: "name",
                title: "ICMP-FLOOD-angrepsfiltrering",
                content: "Aktiver for å forhindre ICMP-flood-angrep (Internet Control Message Protocol)"
            }, {
                type: "name",
                title: "UDP-FLOOD-angrepsfiltrering",
                content: "Aktiver for å forhindre UDP-flood-angrep (User Datagram Protocol)."
            }, {
                type: "name",
                title: "TCP-FLOOD-angrepsfiltrering",
                content: "Aktiver for å forhindre Transmission Control Protocol-Synchronize-angrep (TCP-SYN).",
                children: [{
                    type: "name",
                    title: "Av",
                    content: "Ingen beskyttelse."
                }, {
                    type: "name",
                    title: "Lavt",
                    content: "Lavt beskyttelsesnivå og lav innvirkning på ruterens ytelse."
                }, {
                    type: "name",
                    title: "Middels",
                    content: "Moderat beskyttelsesnivå og delvis merkbar innvirkning på ruterens ytelse."
                }, {
                    type: "name",
                    title: "Høyt",
                    content: "Høyt beskyttelsesnivå, men en merkbar innvirkning på ruterens ytelse."
                }]
            }, {
                type: "name",
                title: "Forby LAN-ping",
                content: "Aktiver for å forby ping fra LAN-porter."
            }, {
                type: "name",
                title: "Forby WAN-ping",
                content: "Aktiver for å forby ping fra WAN-port."
            }, {
                type: "title",
                title: "Liste over blokkerte DoS-verter"
            }, {
                type: "name",
                title: "Liste over blokkerte DoS-verter",
                content: "Oppfører IP-adressene og MAC-adressene til enhver blokkert DoS-angrepskilde."
            }, {
                type: "name",
                title: "For å slette én eller flere oppføringer",
                content: "I vertslisten, velg oppføringen eller oppføringene som du vil slette, og klikk Slett ovenfor tabellen."
            }]
        },
        ipv6: {
            TITLE: "IPv6 Internet",
            CONTENT: [{
                type: "name",
                title: "Aktiver IPv6",
                content: "Velg for å aktivere (På) eller deaktivere (Av) ruterens IPv6-funksjon."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: Statisk IP"
            }, {
                type: "name",
                title: "Statisk IP",
                content: "Velg denne typen hvis ISP-en din bruker Statisk tilordning av IPv6-adresse."
            }, {
                type: "name",
                title: "IPv6-adresse/standard IPv6-gateway/DNS-server for IPv6/sekundær DNS-server for IPv6",
                content: "Skriv inn disse servernavnene gitt av din ISP."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Standard og vanlig MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 byte. Ikke bytt standardstørrelsen på MTU med mindre det kreves av ISP-en din."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: Dynamisk IP"
            }, {
                type: "name",
                title: "Dynamisk IP",
                content: "Velg denne typen hvis ISP-en din bruker dynamisk tilordning av IPv6-adresse."
            }, {
                type: "name",
                title: "IPv6-adresse/IPv6-Gateway",
                content: "Disse parametrene er automatisk tilordnet av DHCPv6-serveren fra din ISP."
            }, {
                type: "name",
                title: "Adressetype",
                content: "Velg tilkoblingstype for IPv6-tilkoblingen."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Standard og vanlig MTU-størrelse (Maximum Transmission Unit) for de fleste Ethernet-nettverk er 1500 byte. Ikke bytt standardstørrelsen på MTU med mindre det kreves av ISP-en din."
            }, {
                type: "name",
                title: "Bruk følgende DNS-adresse for IPv6",
                content: "Velg denne avmerkingsboksen og skriv inn serveradresse(r) for DNS i prikket desimalnotasjon levert av din ISP. Dette WAN-grensesnittet prioriterer den spesifikke DNS-serveren."
            }, {
                type: "name",
                title: "Vertsnavn",
                content: "Skriv inn en verdi i dette feltet for å angi ruterens vertsnavn."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Velg denne typen hvis ISP-en din bruker PPPoEv6 og gir deg et brukernavn og passord."
            }, {
                type: "name",
                title: "Brukernavn/Passord/Bekreft passord",
                content: "Skriv inn disse servernavnene gitt av din ISP."
            }, {
                type: "name",
                title: "Adressetype",
                content: "Velg tilkoblingstype for IPv6-tilkoblingen."
            }, {
                type: "name",
                title: "Tjenestenavn",
                content: "Skriv inn tjenestenavn gitt av din ISP. Hvis det ikke er gitt, la det stå tomt."
            }, {
                type: "name",
                title: "Servernavn",
                content: "Skriv inn servernavn gitt av din ISP. Hvis det ikke er gitt, la det stå tomt."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Den vanlige MTU-størrelsen (Maximum Transmission Unit) for Ethernet-nettverk er 1480 byte.",
                children: [{
                    type: "paragraph",
                    content: "<b>Merknad</b>: I sjeldne tilfeller kan ISP-en din kreve at du justerer MTU-størrelsen for bedre nettverksytelse. Du bør ikke forandre verdien med mindre det er helt nødvendig."
                }]
            }, {
                type: "name",
                title: "Bruk IPv6-informasjonen angitt av ISP",
                content: "Velg denne avmerkingsboksen og skriv inn IP-adressen og gatewayen gitt av din ISP."
            }, {
                type: "name",
                title: "Bruk følgende DNS-adresse for IPv6",
                content: "Velg denne hvis du ønsker å manuelt skrive inn DNS-adressen gitt av din ISP. Hvis den ikke er valgt, vil ruteren hente DNS-adressen automatisk fra din ISP."
            }, {
                type: "title",
                title: "Type Internett-tilkobling: 6to4-tunnel"
            }, {
                type: "name",
                title: "6to4-tunnel",
                content: "Velg denne typen hvis ISP-en din bruker 6to4-distribusjon for tilordning av adresser."
            }, {
                type: "title",
                title: "IPv6-LAN"
            }, {
                type: "name",
                title: "Adressetype",
                content: "Velg den som passer i henhold til din ISP.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Velg dette alternativet for å tilordne IPv6-adresser til datamaskinene i ditt LAN via RADVD.",
                    children: [{
                        type: "name",
                        title: "Aktiver RDNSS",
                        content: "Velg avmerkingsboksen for å aktivere funksjonen for RDNSS."
                    }, {
                        type: "name",
                        title: "Aktiver ULA-prefiks",
                        content: "Velg avmerkingsboksen for å aktivere funksjonen for ULA-prefiks.",
                        children: [{
                            type: "name",
                            title: "ULA-prefiks",
                            content: "Skriv inn ULA-prefiks."
                        }, {
                            type: "name",
                            title: "Lende på ULA-prefiks",
                            content: "Skriv inn lengde på ULA-prefiks. Standardverdien er 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6-server",
                    content: "For å automatisk tilordne IP-adresser til klientene i LAN-et.",
                    children: [{
                        type: "name",
                        title: "Start-IPv6-adresse",
                        content: "Skriv inn start-IPv6-adressen."
                    }, {
                        type: "name",
                        title: "Slutt-IPv6-adresse",
                        content: "Skriv inn slutt-IPv6-adressen."
                    }, {
                        type: "name",
                        title: "Tid utleid",
                        content: "Skriv inn varigheten en DHCP-klient kan låne den gjeldende dynamiske IPv6-adressen tilordnet av ruteren. Etter den dynamiske IPv6-adressen har utløpt, vil brukeren automatisk bli tilordnet en ny dynamisk IPv6-adresse. Standardverdien er 86400 sekunder."
                    }]
                }]
            }, {
                type: "name",
                title: "Sidens prefikstype",
                content: "Velg en type for å tilordne prefiks til IPv6-adresser. Delegert og statisk er gitt."
            }, {
                type: "name",
                title: "Delegert",
                children: [{
                    type: "name",
                    title: "Prefiksdelegert WAN-tilkobling",
                    content: "Velg en WAN-tilkobling fra rullegardinlisten for å tilordne et prefiks."
                }]
            }, {
                type: "name",
                title: "Statisk",
                children: [{
                    type: "name",
                    title: "Sideprefiks",
                    content: "Skriv inn en verdi for sidens prefiks."
                }, {
                    type: "name",
                    title: "Lengde på sideprefiks",
                    content: "Skriv inn en verdi for lengden på sidens prefiks."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Aktiver DHCP-server",
				content: "Velg denne avmerkingsboksen for å aktivere OpenVPN-serveren."
			},{
				type: "name",
				title: "Tjenestetype",
				content: "Velg kommunikasjonsprotokoll for OpenVPN-server: UDP eller TCP."
			},{
				type: "name",
				title: "Tjenesteport",
				content: "Angi en kommunikasjonsport mellom 1024 til 65535. Standard og felles tjenesteport er 1194."
			},{
				type: "name",
				title: "VPN delnett/nettmaske",
				content: "Angi området av IP-adresser som kan leies ut til klienter av OpenVPN-serveren."
			},{
				type: "name",
				title: "Klienttilgang",
				content: "Velg tilgangstype for OpenVPN-klienten."
			},{
				type: "name",
				title: "Kun hjemmenettverk",
				content: "Klienter får kun tilgang til ruteren og LAN. Kundens standardrute vil ikke endres."
			},{
				type: "name",
				title: "Internett og hjemmenettverk",
				content: "Klienter får tilgang til ruteren, LAN og Internett. Kundens standardrute vil endres."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
            },{
                type: "title",
                content: "Sertifikat"
            },{
                type: "paragraph",
                content: "Bruk sertifikatet for informasjonen og identiteten for VPN-tilkoblingen for den eksterne datamaskinen."
            },{
                type: "name",
                title: "Generer",
                content: "Klikk for å generere et nytt sertifikat."
            },{
                type: "title",
                content: "Konfigurasjonsfil"
            },{
                type: "name",
                title: "Eksporter",
                content: "Klikk på denne knappen for å lagre OpenVPN-konfigurasjonsfilen som skal brukes for å legge til ny VPN-tilkobling."
			},{
                type: "title",
                content: "Installasjonsveivisning for VPN-klient"
			},{
				type: "step",
				title: "For å slå av og koble klientenheter til OpenVPN-server:",
			},{
				type: "paragraph",
				content: "Før du konfigurerer OpenVPN-server, kan du konfigurere dynamisk DNS-tjeneste (anbefales) eller tilordne en statisk IP-adresse for WAN-porten. Sørg for at din eksterne porten for NAT-innstillinger ikke er tjenesteporten og din Systemtid er synkronisert med Internett."
			},{
				type: "step",
				title:"",
				content:[
					"Velg Aktiver VPN-server.",
					"Konfigurere serverparametere for OpenVPN (tjenestetype, tjenesteport og klienttilgang) og klikk så på Lagre.",
					"Klikk Eksporter for å lagre konfigurasjonsfilen.",
					"Last ned og installer OpenVPN-klientverktøyet på klientenhetene, fra <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> De offisielt støttede plattformene inkluderer Windows, Mac OSX, Linux.",
					"Start OpenVPN-klientverktøyet og legg til en ny VPN-tilkobling ved hjelp av den lagrede konfigurasjonsfilen for å koble klientenheten til VPN-serveren."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Hvis du vil vite mer om OpenVPN-klienter kan du gå til <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "Aktiver DHCP-server",
				content: "Velg avmerkingsboksen for å aktivere PPTP VPN-server."
			},{
				type: "name",
				title: "IP-adresse for klient",
				content: "Angi området av IP-adresser (opptil 10 klienter) som kan leies ut til klienter av PPTP, VPN-serveren."
			},{
				type: "name",
				title: "Brukernavn og passord",
				content: "Angi brukernavn og passord for å godkjenne klienter i PPTP VPN-serveren."
			},{
				type: "paragraph",
				content: "Klikk Lagre for å lagre alle innstillingene."
			},{
                type: "title",
                content: "Installasjonsveivisning for VPN-klient"
			},{
				type: "step",
				title: "For å slå av og koble klientenheter til OpenVPN-server:",
			},{
				type: "paragraph",
				content: "Før du konfigurerer PPTP VPN-serveren må du konfigurere Dynamisk DNS Service (anbefalt) eller tildele en statisk IP-adresse til ruterens WAN-port. Sørg for at din eksterne porten for NAT-innstillinger ikke er 1723 og din Systemtid er synkronisert med Internett."
			},{
				type: "step",
				title:"",
				content:[
					"Velg Aktiver VPN-server.",
					"Konfigurere PPTP VPN-serverparametere og trykk på Lagre.",
					"Opprette en PPTP VPN-tilkobling på klientenhetene dine. De offisielt støttede plattformene inkluderer Windows, Mac OSX, Linux, iOS, og Android.",
					"Start PPTP VPN-programmet, legg til en ny tilkobling og skriv domenenavnet på den registrerte DDNS-tjenesten eller den statiske IP-adressen som er tilordnet WAN-porten, for å koble klientenheten til PPTP VPN-serveren.",
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN-tilkoblinger",
			CONTENT: [{
				type: "paragraph",
				content: "Siden viser klienter som for øyeblikket er koblet til OpenVPN og PPTP VPN-servere på ruteren."
			},{
				type: "paragraph",
				content: "Klikk på minus-ikonet for å koble fra den korresponderende klienten."
			}]
		},
    };
})(jQuery);
