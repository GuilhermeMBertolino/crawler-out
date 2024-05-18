(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Bandbreedte Controle",
            CONTENT: [{
                type: "paragraph",
                content: "Bandbreedte controle staat u toe om de upstream bandbreedte en de downstream bandbreedte van het netwerk de configureren en de gecombineerde throughput mag de 1000000 niet overschrijden.  Voor optimale bandbreedte controle, selecteer de juiste lijn type en raadpleeg uw provider voor de totaal toegestane bandbreedte voor de upstream en downstream."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Vink de checkbox aan om de bandbreedte controle functie in te schakelen."
            }, {
                type: "name",
                title: "Totale Upstream bandbreedte",
                content: "Voer de totale upload snelheid door de WAN poort in."
            }, {
                type: "name",
                title: "Totale downstream bandbreedte",
                content: "Voer de download snelheid door de WAN poort in."
            }, {
                type: "title",
                content: "Controlerende regels."
            }, {
                type: "name",
                title: "Beschrijving",
                content: "Geeft de gecontrolleerde IP reeks of poort reeks weer."
            }, {
                type: "name",
                title: "Prioriteit",
                content: "Geeft het prioriteit level van de regel weer, waar 1 de hoogste prioriteit level is en 8 de laagste prioriteits level. De totale upload en download bandbreedte zal toegerekend worden om de Min rate van alle bandbreedte controle regels te garanderen."
            }, {
                type: "name",
                title: "Up (min/max)",
                content: "Geeft het minimum en maximum upload bandbreedte in Kbps weer."
            }, {
                type: "name",
                title: "Down (min/max)",
                content: "Geeft het minimum en maximum download bandbreedte in Kbps weer."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Duidt de huidige status van een regel aan. Klik op het lamp icoon om de regel in te schakelen of uit te schakelen."
            }, {
                type: "name",
                title: "Aanpassen",
                content: "Geeft de opties weer om de corresponderende regel te Wijzigen of te Verwijderen."
            }, {
                type: "note",
                title: "Om een nieuwe regel toe te voegen",
                content: [
                    "Klik Toevoegen.",
                    "Voer een reeks IP adressen in om te controleren.",
                    "Voer een reeks poort nummers in om te controleren.",
                    "Selecteer het protocol type voor deze regel.",
                    "Selecteer een prioriteit level voor deze regel. (1 is de hoogste prioriteit level.)",
                    "Voer het minimum en maximum upload bandbreedte ( in Kbps) door de WAN poort in.",
                    "Voer het minimum en maximum download bandbreedte ( in Kbps) door de WAN poort in.",
                    "Selecteer deze invoer Inschakelen.",
                    "Klik OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Om meerdere regels te verwijderen</strong><br>IN de controlerende regels, selecteer de corresponderende checkbox van de regels die verwijdererd dienen te worden en klik op Delete boven de tabel."
            }]
        },
        accessControl: {
            TITLE: "Toegangscontrole",
            CONTENT: [{
                type: "paragraph",
                content: "Toegangscontrole wordt gebruikt om specifieke computers en andere apparaten op uw netwerk toe te staan of te blokkeren."
            }, {
                type: "paragraph",
                content: "<strong>Opmerking:</strong> Om toegangscontrole te gebruiken, schakel deze optie in en volg de stappen in de Applicatie Gids. Wanneer toegangscontrole uitgeschakeld is (Uit), hebben alle apparaten toegang tot uw netwerk, inclusief de apparaten die zich in de zwarte lijst bevinden."
            }, {
                type: "name",
                title: "Toegangscontrole ",
                content: "Schakel in om de toegangscontrole functie in te schakelen."
            }, {
                type: "title",
                content: "Toegangs Modus"
            }, {
                type: "name",
                title: "Zwarte lijst",
                content: "Selecteer om de toegang voor de apparaten in de lijst hieronder te blokkeren."
            }, {
                type: "name",
                title: "Witte lijst",
                content: "Selecteer om de toegang voor de apparaten in de lijst hieronder toe te staan."
            }, {
                type: "title",
                content: "Apparaten in Zwarte/Witte lijst."
            }, {
                type: "note",
                title: "<strong>Om een apparaat in de zwarte of witte lijst te plaatsen</strong>",
                content: [
                    "Klik op het Toevoegen icoon.",
                    "Voer de naam van het apparaat in.",
                    "Voer het MAC adres van het apparaat in.",
                    "Klik OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om een apparaat in de Zwarte/Witte lijst te wijzigen of te verwijderen</strong><br>In de Zwarte/Witte lijst tabel klik op het Bewerk icoon of het prullenbak icoon dat correspondeert met het apparaat dat u wilt bewerken of verwijderen. "
            }, {
                type: "paragraph",
                content: "<strong>Om meerdere apparaten in de Zwarte/Witte lijst te verwijderen</strong><br> In de tabel van de Zwarte/Witte lijst, selecteer alle apparaten die u wenst te verwijderen, klik op verwijderen boven de tabel."
            }, {
                type: "title",
                content: "Apparaten Online"
            }, {
                type: "name",
                title: "Apparaat Naam",
                content: "Geeft de naam van het verbonden apparaat weer."
            }, {
                type: "name",
                title: "IP adres",
                content: "Geeft het IP adres van het verbonden apparaat weer."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres van het verbonden apparaat weer."
            }, {
                type: "name",
                title: "Verbindingstype",
                content: "Geeft de verbindingstype van het verbonden apparaat weer, bedraad of draadloos."
            }, {
                type: "paragraph",
                content: "<strong> Om één of meerdere apparaten te blokkkeren</strong><br>In de Apparaten Online tabel, selecteer de apparaten die u wenst te blokkeren, klik op Blokkeren boven de tabel. De geselecteerde apparaten zullen automatisch toegevoegd worden aan de Apparaten in de zwarte lijst."
            }]
        },
        arpBind: {
            TITLE: "Instellingen",
            CONTENT: [{
                type: "paragraph",
                content: "IP & MAC binding( ookwel bekend als ARP Binding) is handig om toegang van een specifieke computer in de LAN te controleren door het IP adres en het MAC adres van beide apparaten te binden."
            }, {
                type: "name",
                title: "IP & MAC binding",
                content: "Schakel In om de IP & MAC binding optie in te schakelen."
            }, {
                type: "title",
                title: "Binding Lijst"
            }, {
                type: "note",
                title: "<strong> Om een apparaat met ARP binding in te stellen</strong>",
                content: [
                    "Klik Toevoegen",
                    "Voer het MAC adres van het apparaat in.",
                    "Voer het IP adres in dat u aan het bovenstaande MAC adres wilt binden.",
                    "Selecteer Inschakelen.",
                    "Klik OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om een invoer te bewerken of te verwijderen</strong><br> In de binding Lijst, klik het Bewerk icoon of het Prullenbak icoon dat correspondeert met de invoer die u wenst te bewerken of te verwijderen."
            }, {
                type: "paragraph",
                content: "<strong> Om meerdere invoeren te verwijderen</strong> <br> In de binding Lijst, selecteer de invoeren die u wenst te verwijderen, klik op Verwijderen boven de tabel."
            }, {
                type: "title",
                title: "ARP Lijst"
            }, {
                type: "paragraph",
                content: "Geeft het MAC en IP adres weer van de momenteel verbonden apparaten."
            }, {
                type: "name",
                title: "Apparaat Naam",
                content: "Geeft de naam van het verbonden apparaat weer."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres van het verbonden apparaat weer."
            }, {
                type: "name",
                title: "IP adres",
                content: "Geeft het IP adres toegewezen aan het verbonden apparaat weer."
            }, {
                type: "name",
                title: "Gebonden",
                content: "Duidt aan of het MAC & IP adres gebonden is of niet."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft opties weer om de corresponderende invoer van de lijst te Verwijderen."
            }, {
                type: "paragraph",
                content: "<strong>Opmerking: </strong> U kunt het IP adres niet aan meer dan één MAC adres binden."
            }, {
                type: "paragraph",
                content: "<strong> Om meerdere apparaten te binden</strong><br> In de ARP Lijst, selecteer de apparaten waarvan u wenst hun IP adressen aan hun MAC adressen te binden, klik Bind boven de tabel."
            }]
        },
        alg: {
            TITLE: "Applicatie Laag Gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG staat aangepaste Network Address Translation (NAT) traversal filters toe om aangesloten te worden op de gateway om adres en poort vertalingen te ondersteunen voor bepaalde  applicatielaag \"control/data\" protocollen: FTP, TFTP, H232 etc. ALG inschakelen is aanbevolen. "
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "Selecteer de checkbox om de PPTP Pass-through functie in te schakelen en om toe te staan dat Point-to-Point sessies worden getunneld via een IP netwerk en doorgegeven worden via de router."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Selecteer de checkbox om de PPTP Pass-through functie in te schakelen en om toe te staan dat Laag 2 Point-to-Point sessies worden getunneld via een IP netwerk en doorgegeven worden via de router."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Selecteer de checkbox om de IPSec Pass-through functie in te schakelen en om toe te staan dat het Internet Protocol Security (IPSec) wordt getunneld via een IP netwerk doorgegeven wordt via de router. IPSec maakt gebruik van cryptografische beveiliging diensten om  prive en veilige communicatie over IP netwerken te verzekeren."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Selecteer de checkbox om de FTP ALG functie in te schakelen en om toe te staan dat FTP (File Transfer Protocol) cliënten en servers data via NAT kunnen versturen."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Selecteer de checkbox om de TFTP ALG functie in te schakelen en om toe te staan dat TFTP (Trivial File Transfer Protocol) cliënten en servers data via NAT kunnen versturen."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Wanneer geselecteerd, staat het media speler cliënten toe dat zij kunnen communiceren met streaming media servers via NAT."
            }, {
                type: "name",
                title: "H232 ALG",
                content: "Selecteer de checkbox om de H323 ALG functie in te schakelen en om toe te staan dat Microsoft NetMeeting cliënten kunnen communiceren via NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Selecteer de checkbox om de SIP ALG functie in te schakelen en om toe te staan dat SIP cliënten en servers data kunnen versturen over NAT."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om uw instellingen op te slaan."
            }]
        },
        virtualServer: {
            TITLE: "Virtuele Servers",
            CONTENT: [{
                type: "paragraph",
                content: "Virtuele servers worden gebruikt om publieke diensten op uw lokale netwerk in te stellen. Een virtuele server is gedefinieerd als een externe poort en alle verzoeken van het Internet die naar deze externe poort gaan zullen doorgestuurd worden naar een aangewezen computer, welke geconfigureerd dienen te zijn met een statisch of gereserveerd IP adres."
            }, {
                type: "name",
                title: "Service Type",
                content: "Geeft de naam van uw virtuele server weer."
            }, {
                type: "name",
                title: "Externe Poort",
                content: "Geeft het poortnummer van een reeks poorten weer die gebruikt worden door de virtuele server."
            }, {
                type: "name",
                title: "Interne IP",
                content: "Geeft het IP adres van de computer waarop de service applicatie draait weer."
            }, {
                type: "name",
                title: "Interne Poort",
                content: "Geeft het poortnummer van de computer waarop de service applicatie draait weer."
            }, {
                type: "name",
                title: "Protocol",
                content: "Geeft het protocol weer dat gebruikt wordt voor de service apllicatie: TCP, UDP, of ALL (Alle protocollen die ondersteund worden door de router)."
            }, {
                type: "name",
                title: "Status",
                content: "Duidt de huidige status van de virtuele server weer. Klik op het Lamp icoon om de virtuele server invoer in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de optie weer om de corresponderende regel te Bewerken of te Verwijderen."
            }, {
                type: "note",
                title: "<strong> Om een virtuele server invoer toe te voegen.</strong>",
                content: [
                    "Klik Toevoegen.",
                    "Selecteer een interface naam van de keuzelijst.",
                    "Klik op Bekijk Bestaande Applicaties om een service te selecteren van de lijst om automatisch het juiste poort nummer in de Externe poort en Interne Poort velden in te vullen. Als de service niet in de lisjt staat, voer dan het externe poort nummer (e.g. 21) of een reeks van poorten (e.g. 21-25). Laat de interne poort leeg als deze hetzelfde is als de externe poort of voer een specifiek poort nummer in (e.g. 21) als de externe poort één poort is.",
                    "Voer het IP adres van de computer in waarop de service applicatie draait in ",
                    "Selecteer een protocol voor de service apllicatie: TCP, UDP, of Alle van de Protocol keuzelijst.",
                    "Selecteer deze invoer inschakelen.",
                    "Klik OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om een virtuele server invoer te bewerken of te verwijderen</strong><br> Klik op het Bewerken of Prullenbak icoon van de corresponderende invoer."
            }, {
                type: "paragraph",
                content: "<strong> Om meerdere invoeren te verwijderen</strong><br>Selecteer alle virtuele server invoeren die u wenst te verwijderen, klik vervolgens op Verwijderen boven de tabel."
            }, {
                type: "paragraph",
                content: "<strong>Opmerking:</strong><br> Als uw lokale host apparaat meer dan één type van de beschikbare diensten host, dient u een virtuele server voor elke service te creëren."
            }]
        },
        portTrigger: {
            TITLE: "Poort Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port Triggering wordt gebruikt om verkeer door te sturen op een bepaalde poort naar een specifieke server op het netwerk."
            }, {
                type: "name",
                title: "Applicatie",
                content: "Geeft de naam van de applicatie weer."
            }, {
                type: "name",
                title: "Triggering Poort",
                content: "Geeft het uitgaande verkeer poort weer dat gebruikt wordt om een filtering regel van een uitgaande verbinding te activeren."
            }, {
                type: "name",
                title: "Triggering Protocol",
                content: "Geeft het protocol weer dat gebruikt wordt voor Triggering Poort. TCP, UDP, of Alle (Alle protocollen die ondersteund worden door de router)."
            }, {
                type: "name",
                title: "Externe Poort",
                content: "Geeft de poort of reeks poorten weer dat gebruikt wordt door het systeem op afstand. Een antwoord via een van deze poorten zal doorgestuurd worden naar de PC welke deze regel triggert. U kunt maximaal 5 groepen van poorten (of poort secties) invoeren. Elke groep poorten moeten door een komma worden gescheiden, als voorbeeld, 2000 - 2038, 2046, 2050 - 2051, 2085, 3010 - 3030. "
            }, {
                type: "name",
                title: "Extern Protocol",
                content: "Geeft het protocol weer dat gebruikt wordt voor de inkomende poort: TCP, UDP, of ALLE (Alle protocollen die ondersteund worden door de router)."
            }, {
                type: "name",
                title: "Status",
                content: "Duidt de huidige status van een poort triggering invoer aan. Klik op het Lamp icoon om de invoer in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties Bewerken of Verwijderen van de corresponderende invoer weer."
            }, {
                type: "note",
                title: "<strong> Om een poort triggering invoer in te stellen</strong><br><strong>Opmerking:</strong>kan elke invoer maar door één host tegelijkertijd gebruikt worden.",
                content: [
                    "Klik Toevoegen",
                    "Selecteer een interface naam van de keuzelijst.",
                    "Klik op Bekijk Bestaande Applicaties om een applicatie uit de lijst te selecteren om de standaardwaarden automatisch in de juiste velden in te vullen. Als u een niet in de lijst weergegeven applicatie wil toevoegen, voer dan handmatig de Applicatie, Triggering Poort, Triggering Protocol, Externe Poort en Extern Protocol in. <br><strong>Opmerking:</strong> Poort triggering items kunnen geen poort reeksen overlappen (e.g. Invoer 1 heeft de poort reeks 4200-4205, wat betekend dat Invoer 2 geen poort reeks kan hebben van 4203-4206). ",
                    "Selecteer deze invoer inschakelen.",
                    "Klik OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong> Om de poort triggering invoer de Bewerken of te Verwijderen</strong><br> In de tabel, klik op het Bewerken icoon of op het Prullenbak icoon dat correspondeerd met de invoer die u wenst te bewerken of te verwijderen."
            }, {
                type: "paragraph",
                content: "<strong> Om meerdere poort triggering items te verwijderen</strong><br> In de tabel, selecteer alle items die u wenst te verwijderen en klik op Verwijderen boven de tabel."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "De DMZ (Gedemilitariseerde Zone) host functie staat toe dat een lokale host blootgesteld wordt aan het internet voor een speciale service, zoals Internet Gamen of Video Conferencing. Kortom, de DMZ staat één computer op uw LAN toe om alle poorten te openen. Deze computer dient geconfigureerd te worden met een statisch IP adres en dient zijn DHCP Client functie uitgeschakeld te hebben."
            }, {
                type: "note",
                title: "<strong>Om een computer of server toe te wijzen als DMZ server.",
                content: [
                    "Selecteer DMZ inschakelen.",
                    "Voer het IP adres in van de lokale computer dat de DMZ host wordt.",
                    "Klik Opslaan."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Standaard, is de Universele Plug & Play functie (UPnP) ingeschakeld om apparaten, zoals computers en Internet apparaten toe te staan automatisch ontdekt te worden en met elkaar kunnen communiceren op het lokale netwerk."
            }, {
                type: "name",
                title: "UPnP",
                content: "Schakel in om de UPnP functie in te schakelen"
            }, {
                type: "title",
                content: "UPnP Service Lijst"
            }, {
                type: "paragraph",
                content: "De UPnP Service Lijst geeft informatie weer over het UPnP apparaat."
            }, {
                type: "name",
                title: "Totale Cliënten",
                content: "Geeft het totaal UPnP apparaten weer."
            }, {
                type: "name",
                title: "Service beschrijving",
                content: "Geeft een kleine beschrijving van de lokale host weer dat het UPnP verzoek initieert."
            }, {
                type: "name",
                title: "Externe Poort",
                content: "Geeft de externe poort weer dat is geopend door de lokale host."
            }, {
                type: "name",
                title: "Protocol",
                content: "Geeft het netwerk protocol type weer dat gebruikt wordt door de lokale host."
            }, {
                type: "name",
                title: "Intern IP adres",
                content: "Geeft het IP adres van de lokale host weer."
            }, {
                type: "name",
                title: "Interne Poort",
                content: "Geeft de interne poort weer dat is geopend door de lokale host."
            }, {
                type: "paragraph",
                content: "Klik <strong> Verversen</strong> om de UPnP Server lijst te updaten."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Gastnetwerk",
            CONTENT: [{
                type: "paragraph",
                content: "Gastnetwerk biedt u de mogelijkheid om een apart draadloos netwerk in te stellen met een aparte netwerk naam (SSID) en wachtwoord dat uw gasten kunnen gebruiken om toegang te hebben tot het Internet."
            }, {
                type: "title",
                content: "Instellingen"
            }, {
                type: "name",
                title: "Staat gasten toe elkaar te zien.",
                content: "Selecteer deze checkbox om draadloze apparaten op het gastnetwerk toe te staan  met elkaar te verbinden."
            }, {
                type: "name",
                title: "Staat gasten toegang toe tot mijn lokale netwerk.",
                content: "Selecteer deze checkbox om draadloze apparaten op het gastnetwerk toegang tot het lokale netwerk toe te staan."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om uw instellingen op te slaan."
            }, {
                type: "title",
                content: "Draadloze instellingen"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz Gast Netwerk",
                content: "Klik op de corresponderende knop om het 2.4GHz | 5GHz Gastnetwerk in te schakelen."
            }, {
                type: "name",
                title: "Gastnetwerk SSID",
                content: "Gebruik ofwel het standaard SSID of creëer een nieuwe naam met behulp van 1 tot 32 tekens. Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Beveiliging",
                content: "Selecteer een beveiligingsoptie voor het Gastnetwerk:",
                children: [{
                    type: "name",
                    title: "Geen",
                    content: "Standaard, is de beveiliging van het Gastnetwerk ingesteld op Geen; iedereen heeft toegang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Persoonlijk",
                    content: "Selecteer deze optie om de standaard authenticatie methode gebasseerd op een Pre-shared Key(PSK), ookwel passphrase genoemd in te schakelen. Indien ingeschakeld, configureer het volgende.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "Selecteer een beveiligings versie voor uw gastnetwerk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Deze optie ondersteund meerdere implementaties van WPA (Wi-Fi Protected Access) standaards, zoals WPA en WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Deze optie ondersteund AES encrypties dat een betere level van beveiliging bied dan WPA-PSK en is aanbevolen."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "Selecteer een beveiligings encryptie type: Auto (voor zowel TKIP en AES), TKIP (Temporal Key Integrity Protocol), of AES ( Advanced Encryption Standard). Het wordt niet aanbevolen om TKIP encryptie te gebruiken wanneer de router werkt op 802.11n mode, omdat TKIP niet ondersteund wordt door de 802.11n specificatie. Wanneer TKIP is geselecteerd, zal de WPS functie uitgeschakeld worden."
                    }]
                }]
            }, {
                type: "name",
                title: "Wachtwoord",
                content: "Creëer een wachtwoord tussen de 8 en 63 ASCII tekens of tussen 8 en 64 hexadecimale tekens (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "De insctructies voor het 2.4GHz gastnetwerk bovenstaand gelden ook voor het 5GHz gastnetwerk."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om al uw instellingen op te slaan."
            }]
        },
        wirelessStat: {
            TITLE: "Online Apparaten",
            CONTENT: [{
                type: "name",
                title: "Mac adres",
                content: "Geeft het MAC adres van de aangesloten draadloze cliënt weer."
            }, {
                type: "name",
                title: "Verbindingstype",
                content: "Geeft de frequentie verbinding (2.4GHz of 5GHz) waarmee de draadloze cliënt mee verbonden is weer."
            }, {
                type: "name",
                title: "Beveiliging",
                content: "Geeft het beveiligingstype (Geen, WEP, WPA/WPA2-Persoonlijk, of WPA/WPA2-Enterprise) van de geassocieerde draadloze cliënt weer. "
            }, {
                type: "name",
                title: "Ontvangen Pakketten",
                content: "Geeft het aantal pakketten weer die ontvangen zijn door de geassocieerde draadloze cliënt."
            }, {
                type: "name",
                title: "Verstuurde Pakketten",
                content: "Geeft het aantal pakketten weer die verstuurd zijn door de geassocieerde draadloze cliënt."
            }, {
				type: "name",
				title: "Doorvoersnelheid",
				content: "Geeft de snelheid weer van de laatste pakketten ontvangen door de geassocieerde draadloze cliënt."
			}, {
                type: "paragraph",
                content: "Klik <strong> Ververs</strong> om de informatie op deze pagina te updaten."
            }]
        },
        wirelessAdv: {
            TITLE: "Geavanceerde Instellingen",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Selecteer 2.4GHz | 5GHz om zijn geavanceerde draadloze instellingen in te stellen."
            }, {
                type: "name",
                title: "Beacon Interval",
                content: "Voer een waarde in tussen 25 en 1000 in milliseconden om de tijdsduur vast te stellen tussen welke beacon pakketten via de router gebroadcast worden om het draadloze netwerk te synchroniseren. Het standaard is 100 milliseconden."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "Voer een waarde in tussen 1 en 2346 om de pakketgroote van dataoverdracht door de router vast te stellen. Standaard, de RTS(Request to Send) Treshold is 2346. Als de pakketgrootte groter is dan het vooraf ingestelde treshold, stuurt de router Request to Send frames naar een bijzonder ontvangtstation en onderhandeld over het verzenden van een data frame of anders zal het pakket zal onmiddelijk verstuurd worden."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "Voer een waarde in tussen 1 en 255 om de interval of the Delivery Traffic Indication Message (DTIM) vast te stellen. 1 duidt aan dat de DTIM interval hetzelfde is als de Beacon Interval."
            }, {
                type: "name",
                title: "Group Key Update Period",
                content: "Voer het aantal secondes in (minimaal 30) om het tijdsinterval voor de encryptie sleutel automatische verlenging te controleren. Standaard is 0, wat aangeeft dat de sleutel niet vernieuwd wordt."
            }, {
                type: "name",
                title: "WMM",
                content: "Deze functie garandeerd dat pakketten met een hoog-prioriteit bericht bij voorkeur worden verzonden. WMM is dwangmatig ingeschakeld onder 802.11n of 802.11ac mode. Het is sterk aanbevolen om WMM in te schakelen."
            }, {
                type: "name",
                title: "Short GI",
                content: "Deze functie is standaard ingeschakeld en het is aanbevolen om de data capiciteit te verhogen door de Guard Interval (GI) tijd te verminderen."
            }, {
                type: "name",
                title: "AP Isolatie",
                content: "Selecteer deze checkbox om de AP Isolatie functie in te schakelen dat u toestaat om de interactie tussen alle draadloze apparaten in uw netwerk te beperken, maar nog wel in staat zijn toegang te hebben tot het Internet. AP isolatie is standaard uitgeschakeld."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS Bridging",
                content: "Selecteer deze checkbox om de WDS (Wireless Distribution System) Bridging functie in te schakelen om toe te staan dat de router een brug creërt met een ander access point (AP) in een wireless local area network (WLAN). Indien ingeschakeld, configureer het volgende:"
            }, {
                type: "name",
                title: "SSID (die gebridged moet worden)",
                content: "Voer het SSID in van de WAP (Wireless Access Point) waar uw router een verbinding mee maakt als cliënt of gebruik de zoek functie om te scannen naar beschikbare netwerken in de buurt  en deze weer te geven."
            }, {
                type: "name",
                title: "MAC Adres (die gebridged moet worden)",
                content: "Voer het MAC adres in 12 hexadecimale tekens (0-9,a-f,A-F) formaat gescheiden door koppeltekens in van de WAP waarmee de router verbinding mee maakt als cliënt. Wanneer u een netwerk via de zoek functie selecteerd, zal het MAC adres veld automatisch ingevuld worden."
            }, {
                type: "name",
                title: "Zoeken",
                content: "Klik op deze knop om te scannen en het MAC adres, SSID, Signaalsterkte, Kanaal en beveiligingsinformatie weer te geven van alle beschikbare draadloze netwerken binnen bereik. Wanneer u een netwerk selecteerd zal het SSID, MAC adres en beveiliging automatisch ingevuld worden.",
                children: [{
                    type: "name",
                    title: "AP Lijst",
                    content: "Geeft informatie weer over de AP waarmee uw router verbinding mee kan maken."
                }, {
                    type: "name",
                    title: "MAC Adres",
                    content: "Geeft het MAC adres van de AP weer waarmee uw router als cliënt mee gaat verbinden."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Geeft het SSID van de AP weer waarmee uw router als cliënt mee gaat verbinden."
                }, {
                    type: "name",
                    title: "Signaal Sterkte",
                    content: "Geeft het signaalsterkte van de AP weer waarmee uw router als cliënt mee gaat verbinden."
                }, {
                    type: "name",
                    title: "Kanaal",
                    content: "Geeft het kanaal van de AP weer waarmee uw router als cliënt mee gaat verbinden."
                }, {
                    type: "name",
                    title: "Encryptie",
                    content: "Geeft de encryptie van de AP weer waarmee uw router als cliënt mee gaat verbinden."
                }, {
                    type: "name",
                    title: "Verbinden",
                    content: "Klik op het icoon om te verbinden of de verbinding te verbreken met de corresponderende AP."
                }]
            }, {
                type: "name",
                title: "Beveiliging",
                content: "Selecteer één van de volgende beveiligings opties:",
                children: [{
                    type: "name",
                    title: "Geen",
                    content: "Selecteer deze optie om de draadloze beveiliging uit te schakelen. Het wordt sterk aangeraden dat u de draadloze beveiliging inschakelt om uw draadloze netwerk te beschermen tegen ongeauthoriseerd toegang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Persoonlijk",
                    content: "Selecteer deze optie om de standaard authenticatie methode gebasseerd op een Pre-shared Key (PSK) in te schakelen, ookwel passphrase genaamd. Deze optie wordt aanbevolen. Indien geselecteerd, configureer het volgende.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "Selecteer een beveiligings versie voor uw draadloze netwerk.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Deze optie ondersteund AES encryptie dat een lager niveau van beveiliging bied dan WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Deze optie ondersteund AES encryptie dat een beter niveau van beveiliging biedt dan WPA-PSK en wordt aanbevolen."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "Selecteer een beveiligings encryptie type: TKIP (Temporal Key Integrity Protocol), of AES (Advanced Encryption Standard). Het is NIET aanbevolen om de TKIP encryptie op uw router te gebruiken wanneer uw router werkt in 802.11n mode, omdat TKIP niet ondersteund wordt door de 802.11n specificatie. Indien TKIP geselecteerd is, zal de WPS functie uitgeschakeld worden."
                    }, {
                        type: "name",
                        title: "Wachtwoord",
                        content: "Voer een draadloos wachtwoord in tussen 8 en 63 ASCII tekens, of tussen 8 en 64 hexadecimale tekens in dit veld."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecteer deze optie om de basis authenticatie methode in te schakelen als elke versie van uw cliënt apparaten alleen draadloos toegang heeft door gebruik te maken van WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Selecteer een authenticatie type voor uw draadloze netwerk. Selecteer Open System of Shared Key gebasseerd op de capaciteiten en toegangsverzoeken van de draadloze cliënt."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Ofwel selecteer ASCII formaat of Hexadecimaal. ASCII formaat is een combinatie van alfabetische en nummerieke tekens. Hexadecimaal formaat is een combinatie van de nummers (0-9) en letters (A-F,a-f)."
                    }, {
                        type: "name",
                        title: "Key Index",
                        content: "Selecteer welke van de 4 sleutels er wordt gebruikt en voer de overeenkomende WEP sleutel dat u gecreërd heeft in in de Key Value veld. Wees er zeker van dat deze waardes identiek zijn op al uw draadloze stations in uw netwerk."
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Voer de overeenkomende WEP sleutel in dat u gecreërd heeft."
                    }]
                }]
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om uw instellingen op te slaan."
            }]
        },
        wirelessSchedule: {
            TITLE: "Draadloos Schema",
            CONTENT: [{
                type: "paragraph",
                content: "De effectieve tijdschema is gebasseerd op de tijd van de router. De tijd kan ingesteld worden in System Tools -> Time Settings."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Selecteer 2.4GHz or 5GHz om zijn draadloze schema in te stellen."
            }, {
                type: "name",
                title: "Draadloos Schema",
                content: "Schakel in om deze functie in te schakelen. Daarna, klik en sleep over de cellen om de periode in te stellen wanneer u draadloos wilt uitschakelen. "
            }, {
                type: "name",
                title: "Herstellen",
                content: "Klik voor de tijdselectie."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om de instellingen op te slaan."
            }]
        },
        macFilter: {
            TITLE: "MAC Filter Instellingen",
            CONTENT: [{
                type: "name",
                title: "MAC Filtering",
                content: "Schakel in om draadloze toegang te controleren door gebruik te maken van het MAC adres van individuele apparaten."
            }, {
                type: "title",
                title: "Filter Regels"
            }, {
                type: "name",
                title: "Blokeer draadloze toegang van de apparaten hieronder in de lijst weergegeven.",
                content: "Selecteer om draadloze toegang te blokkeren voor de apparaten in de lijst hieronder weergegeven."
            }, {
                type: "name",
                title: "Sta alléén toegang toe voor de apparaten hieronder in de lijst weergegeven.",
                content: "Selecteer om draadloze toegang alléén toe te staan voor de apparaten in de lijst hieronder weergegeven."
            }, {
                type: "title",
                title: "Apparaat Lijst"
            }, {
                type: "name",
                title: "MAC Adres/Beschrijving",
                content: "Geeft het MAC adres en de beschrijving van het apparaat weer."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Klik op het Lamp icoon om de MAC filtering van het apparaat in te schakelen of uit te schakelen."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties Bewerken of Verwijderen van het corresponderende item weer."
            }, {
                type: "note",
                title: "Een nieuw apparaat toevoegen",
                content: [
                    "Klik Toevoegen.",
                    "Voer het MAC adres van het apparaat in.",
                    "Voer een beschrijving van het apparaat in.",
                    "Klik om deze invoer in te schakelen.",
                    "Klik OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Draadloze Instellingen",
            CONTENT: [/*{
                type: "name",
                title: "Regio",
                content: "Selecteer uw Regio uit de keuzelijst. Dit veld specificeert de regio waar de draadloze functie van de router gebruikt kan worden. Het kan illegaal zijn om de draadloze functie van de router te gebruiken in een regio anders dan in dit veld vermeldt. Wanneer uw Land of Regio niet vermeld wordt, neemt u dan contact op met uw lokale overheidsinstantie voor hulp."
            }, */{
                type: "name",
                title: "Smart Connect",
                content: "Selecteer deze checkbox om Smart Connect in te schakelen. Deze functie helpt apparaten sneller te werken door deze  toe te wijzen aan de beste draadloze verbindingen gebasseerd op de feitelijke omstandigheden om netwerk eisen te balanceren."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Selecteer 2.4GHz | 5GHz om de corresponderende instellingen te wijzigen."
            }, {
                type: "name",
                title: "Wireless Radio",
                content: "Selecteer deze checkbox om de 2.4GHz | 5GHz draadloze radio frequentie in te schakelen."
            }, {
                type: "name",
                title: "Draadloze Netwerk Naam (SSID)",
                content: "U kunt het standaard Netwerk Naam (SSID) zo laten, of u kunt een nieuwe naam (tot 32 tekens) creëren. Dit veld is hoofdlettergevoelig."
            }, {
                type: "name",
                title: "Verberg SSID",
                content: "Selecteer deze checkbox wanneer u de 2.4GHz | 5GHz  netwerk naam (SSID) van de Wi-Fi netwerk lijst wilt verbergen."
            }, {
                type: "name",
                title: "Beveiliging",
                content: "Selecteer één van de volgende beveiligings opties:",
                children: [{
                    type: "name",
                    title: "Geen beveiliging",
                    content: "Selecteer deze optie om de draadloze beveiliging uit te schakelen. Het wordt sterk aangeraden dat u de draadloze beveiliging inschakelt om uw draadloze netwerk te beschermen tegen ongeauthoriseerd toegang."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Persoonlijk",
                    content: "Selecteer deze optie om de standaard authenticatie methode gebasseerd op een Pre-shared Key (PSK) in te schakelen, ookwel passphrase genaamd. Deze optie wordt aanbevolen. Indien geselecteerd, configureer het volgende.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "Selecteer een beveiligings versie voor uw draadloze netwerk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Deze optie ondersteund meerdere implementaties van het WPA (Wi-Fi Protected Access) standaard, zoals WPA en WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Deze optie ondersteund AES encryptie dat een beter niveau van beveiliging biedt dan WPA-PSK en wordt aanbevolen."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "Selecteer een beveiligings encryptie type: Auto (voor zowel TKIP en AES), TKIP (Temporal Key Integrity Protocol), of AES (Advanced Encryption Standard). Het is NIET aanbevolen om de TKIP encryptie op uw router te gebruiken wanneer uw router werkt in 802.11n mode, omdat TKIP niet ondersteund wordt door de 802.11n specificatie. Indien TKIP geselecteerd is, zal de WPS functie uitgeschakeld worden."
                    }, {
                        type: "name",
                        title: "Wachtwoord",
                        content: "Creër een draadloos wachtwoord tussen 8 en 63 ASCII tekens, of tussen 8 en 64 hexadecimale tekens in dit veld."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Selecteer deze optie om de meer geavanceerde authenticatie methode in te schakelen door gebruik te maken van RADIUS (Remote Authentication Dial In User Service) server. Indien geselecteerd, dan zal de WPS functie uitgeschakeld worden.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "Selecteer een beveiligings versie voor uw draadloze netwerk.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Deze optie ondersteund meerdere implementaties van het WPA (Wi-Fi Protected Access) standaard, zoals WPA en WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Deze optie ondersteund AES encryptie dat een beter niveau van beveiliging biedt dan WPA-PSK en wordt aanbevolen."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "Selecteer een beveiligings encryptie type: Auto (voor zowel TKIP en AES), TKIP (Temporal Key Integrity Protocol), of AES (Advanced Encryption Standard). Het is NIET aanbevolen om de TKIP encryptie op uw router te gebruiken wanneer uw router werkt in 802.11n mode, omdat TKIP niet ondersteund wordt door de 802.11n specificatie. Indien TKIP geselecteerd is, zal de WPS functie uitgeschakeld worden."
                    }, {
                        type: "name",
                        title: "RADIUS Server IP",
                        content: "Voer het IP adres van de RADIUS server in."
                    }, {
                        type: "name",
                        title: "RADIUS Server Poort",
                        content: "Voer het poort nummer van de RADIUS server in."
                    }, {
                        type: "name",
                        title: "RADIUS Server Wachtwoord",
                        content: "Voer het gedeelde wachtwoord van de RADIUS server in."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecteer deze optie om de basis authenticatie methode in te schakelen als elke versie van uw cliënt apparaten alleen draadloos toegang heeft door gebruik te maken van WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Selecteer een authenticatie type voor uw draadloze netwerk. Selecteer Open System of Shared Key gebasseerd op de capaciteiten en toegangsverzoeken van de draadloze cliënt."
                    }, {
                        type: "name",
                        title: "Geselecteerde Versleuteling",
                        content: "Selecteer welke van de 4 sleutels er wordt gebruikt en voer de overeenkomende WEP sleutel dat u gecreërd heeft in in de Key Value veld. Wees er zeker van dat deze waardes identiek zijn op al uw draadloze stations in uw netwerk."
                    }, {
                        type: "name",
                        title: "WEP Key Formaat",
                        content: "Ofwel selecteer ASCII formaat of Hexadecimaal. ASCII formaat is een combinatie van alfabetische en nummerieke tekens. Hexadecimaal formaat is een combinatie van de nummers (0-9) en letters (A-F,a-f)."
                    }, {
                        type: "name",
                        title: "Versleutelings type",
                        content: "Selecteer een WEP versleutelings lengte.",
                        children: [{
                            type: "name",
                            title: "64-bit encryptie",
                            content: "Staat toe dat u 10 hexadecimale cijfers (0-9, A-F, a-f) of 5 ASCII tekens in het WEP Value veld invult."
                        }, {
                            type: "name",
                            title: "128-bit encryptie",
                            content: "Staat u toe dat u 26 hexadecimale cijfers (0-9, A-F, a-f) of 13 ASCII tekens in het WEP Value veld invult."
                        }]
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Creër een WEP versleuteling."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Selecteer een transmissie mixed mode."
            }, {
                type: "name",
                title: "Kanaal",
                content: "Selecteer een operationeel kanaal voor het draadloze netwerk. Het standaard kanaal is Auto. Wijzig dit niet tenzij u problemen ondervind met uw draadloze verbinding."
            }, {
                type: "name",
                title: "Kanaalbreedte",
                content: "Selecteer een kanaalbreedte (bandbreedte) voor het draadloze netwerk."
            }, {
                type: "name",
                title: "Zendvermogen",
                content: "Selecteer ofwel Hoog, Middel of Laag om het datazendvermogen te specificeren. De standaard en aanbevolen instelling is Hoog."
            }, {
                type: "paragraph",
                content: "Klik <strong>Opslaan</strong> om alle instellingen op te slaan."
            }]
        },
        wps: {
            TITLE: "Router PIN",
            CONTENT: [{
                type: "name",
                title: "Router PIN",
                content: "Schakel in om toe te staan dat alle draadloze apparaten verbinding kunnen maken met de router door gebruik te maken van de router zijn PIN (Persoonlijke Identificatie Nummer)."
            }, {
                type: "name",
                title: "Huidige PIN",
                content: "Geeft de router zijn huidige PIN weer. De standaard PIN vind u op de productsticker op de router of in de gebruikershandleiding. Klik op Genereer om willekeurig een nieuwe PIN te genereren of klik op Herstellen om de huidige PIN te herstellen naar de standaard PIN."
            }, {
                type: "title",
                content: "WPS Instellingen."
            }, {
                type: "name",
                title: "Druk Knop (Aanbevolen)",
                content: "Selecteer deze installeer methode om de WPS functie in te schakelen om gemakkelijk elk WPS-ingeschakeld apparaat te verbinden met uw draadloze netwerk door gebruik te maken van de WPS knop of virtueel gebruik te maken van de Verbind knop."
            }, {
                type: "name",
                title: "PIN Code",
                content: "Selecteer deze installeer methode om een apparaat handmatig toe te voegen door de WPS PIN van het draadloze apparaat in het veld in te voeren."
            }, {
                type: "name",
                title: "Verbinden",
                content: "Klik op deze  knop om WPS te starten."
            }]
        },
        parentCtrl: {
            TITLE: "Ouderlijk Toezicht ",
            CONTENT: [{
                type: "paragraph",
                content: "Met Ouderlijk Toezicht kunt u ongepaste, expliciete en schadelijke websites blokkeren; toegang beperken op bepaalde tijdstippen van de dag (bijvoorbeeld Facebook of Youtube tijdens huiswerk tijd)."
            }, {
                type: "name",
                title: "Status",
                content: "Schakel in om de Ouderlijk Toezicht functie in te schakelen. Standaard is deze functie uitgeschakeld."
            }, {
                type: "title",
                content: "Apparaten onder Ouderlijk Toezicht."
            }, {
                type: "paragraph",
                content: "Apparaten onder Ouderlijk Toezicht geeft de lijst weer van apparaten die momenteel beperkt worden door Ouderlijk Toezicht."
            }, {
                type: "name",
                title: "Apparaat Naam",
                content: "Geeft de naam van alle verbonden cliënt apparaten weer die zich momenteel onder Ouderlijk Toezicht bevinden."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres van alle verbonden cliënt apparaten weer die zich momenteel onder Ouderlijk Toezicht bevinden."
            }, {
                type: "name",
                title: "Effectieve Tijd",
                content: "Geeft de toegangbeperking periode weer."
            }, {
                type: "name",
                title: "Beschrijving",
                content: "Geeft een korte beschrijving van de verbonden apparaten weer."
            }, {
                type: "name",
                title: "Status",
                content: "Duidt aan of Ouderlijk Toezicht wel of niet is ingeschakeld voor het corresponderende apparaat. Klik op het pictogram Lamp om dit in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties Bewerken en Verwijderen weer voor het corresponderende apparaat."
            }, {
                type: "note",
                title: "<strong>Om een nieuw cliënt apparaat te beperken</strong>",
                content: [
                    "Klik Toevoegen",
                    "Klik bekijk bestaande apparaten om een reeds verbonden apparaat te kiezen van de Toegang Apparaten Lijst; of voer het apparaat naam en het MAC adres handmatig in om een apparaat toe te voegen welke nog niet verbonden is.",
                    "Klik op het pictogram Effectieve Tijd om een periode waarin de beperking geldt op te geven.",
                    "Voer een korte beschrijving in, in het veld Beschrijving. Dit veld is optioneel.",
                    "Selecteer Inschakelen.",
                    "Klik OK om deze invoer op te slaan."
                ]
            }, {
                type: "paragraph",
                content: "<b>Om een apparaat te bewerken of te verwijderen</b><br> In de apparaten onder de Ouderlijk Toezicht lijst, klik simpelweg op het Bewerk of Prullenbak pictogram bij het corresponderende apparaat dat u wenst te bewerken of te verwijderen."
            }, {
                type: "paragraph",
                content: "<b>Om meerdere apparaten te verwijderen</b><br> In de apparaten onder de Ouderlijke Toezicht lijst, selecteer de corresponderende checkbox van het apparaat dat verwijderd dient te worden en klik op Delete boven de tabel."
            }, {
                type: "title",
                title: "Inhoud Beperking"
            }, {
                type: "paragraph",
                content: "Inhoud Beperking staat u toe om toegang te beperken met behulp van trefwoorden en domeinnamen voor apparaten die onder Ouderlijk Toezicht vallen en deze wel of geen toegang krijgen afhankelijk van de type beperking."
            }, {
                type: "name",
                title: "Beperkingstype",
                content: "Selecteer de volgende beperkingstype:",
                children: [{
                    type: "name",
                    title: "Zwarte Lijst",
                    content: "Bevat trefwoorden en domeinnamen die gebruikt zullen worden om  toegang tot websites te blokkeren van cliënt apparaten die in de lijst van Apparaten onder Ouderlijk Toezicht zijn gespecificeerd."
                }, {
                    type: "name",
                    title: "Witte Lijst",
                    content: "Bevat trefwoorden en domein namen die cliënt apparaten gespecificeerd hebben in de lijst van Apparaten onder Ouderlijk Toezicht om toegang toe te staan."
                }]
            }, {
                type: "name",
                title: "Een nieuw trefwoord toevoegen",
                content: "Klik om een nieuw trefwoord of domeinnaam toe te voegen aan de Zwarte lijst of de Wiite lijst."
            }, {
                type: "paragraph",
                content: "Om een trefwoord of domeinnaam te verwijderen, klik het - (min) icoontje naast het item dat u wenst te verwijderen."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om uw instellingen op te slaan."
            }]
        },
        parentCtrl: {
            TITLE: "Ouderlijk toezicht",
            CONTENT: [{
                type: "paragraph",
                content: "Met de leeftijd-niveau filters, de toegangslimieten en gebruikersprofielen biedt ouderlijk toezicht uw gezin een persoonlijk en een passende toegang tot het internet."
            }, {
                type: "note",
                title: "<strong>Om Ouderlijk Toezicht toe te passen op een nieuw apparaat.</strong>",
                content: [
                    "Klik op Toevoegen.",
                    "Vul een naam in voor dit profiel en klik op ''+'' om de apparaten toe te voegen onder dit profiel",
                    "Selecteer een niveau filter en pas de inhoud van de filter aan op basis van uw behoeften. U kunt trefwoorden invoeren om te zoeken naar websites die u wilt filteren in onze database. Andere websites (URL's) kunnen handmatig worden ingevoerd. <br/> Zie verdere uitleg over de verschillende filter catagorieën: <p>Volwassen inhoud - sites die seksuele, schadelijke of illegale inhoud bevatten, inclusief pornografie, drugsgebruik, geweld en discriminatie kunnen bevatten. </p> <p> Gokken - sites die het bevorderen om te gokken of informatie verstrekken over gokken, inclusief online goksites </p> <p>Seksuele voorlichting - sites die informatie geven over seksualiteit, inclusief voorplanting, seksualiteit, veilig vrije & anticonceptie, seksueel overdraagbare aandoeningen en het omgaan met seksuele trauma's </p> <p> Online communicatie - sites die via een host formaat communiceren met anderen door middel van tekst, spraak of video, inclusief e-mail, blogs, online forums, VoIP en video-chat diensten </p> <p>Sociale Netwerken - sites die persoonlijke expressie en communicatie delen, mensen en hun activiteiten aan elkaar koppelt, op basis van dezelfde interesses, carriéres, achtergronden of een real-life kennismaking </p> <p> Betalen om te surfen - sites die gebruikers compenseren door bepaalde websites of advertenties te bekijken, te klikken op koppelingen of te laten reageren op enquêtes. </p> <p> Media - sites die gratis, betaald of ongeschreven audio en/of video -inhoud aanbieden, inclusief streaming diensten, tv programma's of muziek downloads </p> <p> Downloads - sites die toegang verstrekken of toegang geven voor het delen van bestanden, inclusief het delen van peer-to-peer, online opslag van bestanden en de inhoud van bestanden van mobiele apparatuur (bijvoorbeeld muziek en apps) </p> <p>Games - sites die toegang verstrekken of toegang geven tot de webgehoste of downloadbare games, inclusief online gaming, game console netwerken en browser games.",
                    "Als u de totale tijd die dit profiel online doorbrengt wilt beperken, dan kunt u tijdslimieten inschakelen. U kunt ook de bedtijd functie gebruiken,zodat u een dagelijkse periode kunt instellen waarin apparaten onder dit profiel niet kunnen internetten.",
                    "Klik op opslaan."
                ]
            }, {
                type: "note",
                title: "<strong>Om een profiel te bekijken met gedetailleerde internet geschiedenis.</strong>",
                content: [
                    "In de kolom met inzichten, kunt u klikken op de corresponderende knop 'inzicht'.",
                    "Als u meerdere opnames wilt zien, klik dan op de Geschiedenis <span class=\"ptl-ctr-help-icon history\"></span> knop",
                    "U kunt websites blokkeren of deblokkeren door te klikken op de <span class=\"ptl-ctr-help-icon block\"></span> of <span class=\"ptl-ctr-help-icon unblock\"></span> knop."
                ]
            }, {
                type: "note",
                title: "<strong>Om de internet toegang onmidddelijk in-of uit te schakelen</strong>",
                content: [
                    "Klik in de internet toegangskolom op <span class=\"ptl-ctr-help-icon stop\"></span> om apparaten en het bijbehorende profiel te stoppen van de toegang tot het internet en klik op <span class=\"ptl-ctr-help-icon enable\"></span> om de toegang tot het internet weer in te schakelen."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "De Qos (Quality of Service) functie geeft voorrang aan online activiteiten en apparaten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft."
            }, {
                type: "paragraph",
                content: "Selecteer applicatie prioriteit om voorrang te geven aan de snelheid van het netwerk voor online activiteiten en selecteer apparaat prioriteit om voorrang te geven op de snelheid van het netwerk naar de apparaten."
            }, {
                type: "title",
                content: "Applicatie prioriteit"
            }, {
                type: "paragraph",
                content: "Kies de online activiteit die u voorrang wilt geven of klik op 'Aangepast' om de prioriteit van elke online activiteit in te stellen."
            }, {
                type: "title",
                content: "Apparaat Prioriteit"
            }, {
                type: "paragraph",
                content: "kies de apparaten die u voorrang wilt geven en hoe lang u ze prioriteit wilt geven."
            }, {
                type: "note",
                title: "<strong>Om prioriteiten te stellen aan een apparaat</strong>",
                content: [
                    "Zoek het apparaat in de lijst die u wilt prioriteren en schakel om op Prioriteit",
                    "Selecteer hoe lang het apparaat zal worden geprioriteerd in de Timing-kolom."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Antivirus",
            CONTENT: [{
                type: "paragraph",
                content: "Met het scannen van netwerk frequenties, het detecteren van kwaadaardige sites en het isoleren van een geïnfecteerd apparaat, houdt de antivirus functiee uw persoonlijke informatie veilig. U kunt ook controleren hoe uw netwerk is beveiligd en of er geen aanvallen zijn geweest op uw netwerk."
            }, {
                type: "paragraph",
                content: "Geschiedenis - Registreert de apparaten die worden beschermd door de Antivirus en de bron met classificaties over de aanval."
            }, {
                type: "paragraph",
                content: "Schakel alles in - Klik op 'schakel alle beschermingstypes in' als er een of meer niet zijn ingeschakeld."
            }, {
                type: "paragraph",
                content: "Beschermingstypes - Schakel de beschermingstypes in door te verwijzen naar de uitleg. Het wordt aanbevolen om alle beveiligingstypes in te schakelen."
            }]
        },
        applicationPriority: {
            TITLE: "Applicatie prioriteit",
            CONTENT: [{
                type: "paragraph",
                content: "De-Applicatie-Prioriteit functie geeft voorrang aan online activiteiten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft. Kies de online activiteit die u prioriteit wilt geven of klik op 'Aangepast' om de prioriteit van elke online activiteit in te stellen. "
            }]
        },
        devicePriority: {
            TITLE: "Apparaat Prioriteit",
            CONTENT: [{
                type: "paragraph",
                content: "De-Apparaat-Prioriteit functie geeft prioriteit aan apparaten om een snellere netwerkverbinding te garanderen, wanneer u dit het meeste nodig heeft. kies de apparaten die u voorrang wilt geven en hoe lang u ze prioriteit wilt geven."
            }, {
                type: "note",
                title: "<strong>Om prioriteiten te stellen aan een apparaat</strong>",
                content: [
                    "Zoek het apparaat in de lijst die u wilt prioriteren en schakel om op Prioriteit",
                    "Selecteer hoe lang het apparaat zal worden geprioriteerd in de Timing-kolom."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Gastnetwerk",
            CONTENT: [{
                type: "paragraph",
                content: "Het gastnetwerk stelt u in staat om een apart netwerk naam (SSID) en wachtwoord in te stellen die uw gasten kunnen gebruiken om toegang te verkrijgen tot het Internet."
            }, {
                type: "name",
                title: "Sta gasten toe elkaar te zien",
                content: "Selecteer deze checkbox om toe te staan dat draadloze apparaten op het gastnetwerk met elkaar kunnen communiceren."
            }, {
                type: "name",
                title: "Sta gasten toegang toe tot mijn lokale netwerk",
                content: "Selecteer deze checkbox om toe te staan dat draadloze apparaten op het gastnetwerk toegang tot uw lokale netwerk hebben."
            }, {
                type: "name",
                title: "Draadloos Netwerk 2.4GHz | 5GHz",
                content: "Selecteer de corresponderende knop om het  2.4GHz | 5GHz gastnetwerk in te schakelen."
            }, {
                type: "name",
                title: "Gastnetwerk SSID",
                content: "Gebruik ofwel het standaard SSID of creëer een nieuwe naam door 1 tot 32 tekens te gebruiken. Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Verberg SSID",
                content: "Selecteer deze checkbox als u het gastnetwerk SSID wilt verbergen."
            }, {
                type: "name",
                title: "Beveiliging",
                content: "Selecteer een beveiligingsoptie voor het gastnetwerk.",
                children: [{
                    type: "name",
                    title: "Geen",
                    content: "Standaard is de beveiliging van het gastnetwerk ingesteld op Geen; iedereen heeft toegang."
                }, {
                    type: "name",
                    title: "Stel wachtwoord in",
                    content: "Creëer een wachtwoord voor het gastnetwerk tussen 8 en 63 ASCII tekens of tussen 8 en 64 hexadecimale tekens (0-9, a-f, A-F) in het wachtwoord veld."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Internet Status",
                content: "Geeft de huidige status weer van de Internetverbinding van de router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Verbindingstype",
                content: "Geeft de type van uw internetverbinding weer."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IP adres",
                content: "Geeft het huidige Internet IP adres weer wat toegewezen is aan de router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "DNS Server",
                content: "Geeft het IP adres van de primaire en secundaire DNS servers weer."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Gateway",
                content: "Geeft het IP adres van de primaire en secundaire DNS servers weer."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "MAC adres",
                "content": "Geeft het unieke en fysieke adres van de router weer"
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "IP adres",
                "content": "Geeft het fysieke IP adres van de router weer. Dit IP adres is te gebruiken om in te loggen in de webconfiguratie pagina van de router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Subnetmasker",
                "content": "Geeft de subnet mask van de router weer."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Adrestype",
                "content": "Geeft het type configuratie weer dat is ingesteld voor het IP adres van de router."
            }, {
	    display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
               type: 'title',
                title: 'Spelheid testen'
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
                content: "2.4GHz | 5GHz Draadloos."
            }, {/*
                type: "name",
                title: "Status",
                content: "Geeft aan of de 2.4GHz | 5GHz wireless aan (ingeschakeld) of uit (uitgeschakeld) is."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Geeft de huidige draadloze netwerk naam van de 2.4GHz | 5GHz verbinding frequentie weer."
            }, {
                type: "name",
                title: "Kanaal",
                content: "Geeft het kanaal weer waarop het draadloze 2.4GHz | 5GHz netwerk uitzendt."
            }, {
                type: "name",
                title: "MAC",
                content: "Geeft het huidige MAC adres van het draadloos 2.4GHz | 5GHz weer."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "2.4GHz | 5GHz Gastnetwerk"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Status",
                content: "Geeft aan of de 2.4GHz | 5GHz wireless aan (ingeschakeld) of uit (uitgeschakeld) is."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Geeft het draadloze netwerk naam van het Gastnetwerk weer."
            }, {
                type: "title",
                title: "Draadloze/Bedrade Cliënten"
            }, {
                type: "name",
                title: "Naam",
                content: "Geeft de naam van de cliënt weer die evrbonden is met de router."
            }, {
                type: "name",
                title: "IP adres",
                content: "Geeft het toegewezen IP adres weer van de cliënt."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres weer van de cliënt."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Telefoon"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Telefoon naam",
                content: "Geeft de naam weer van uw telefoon."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Aantal inkomende gesprekken",
                content: "Toont de nummers die door uw telefonie apparaten gebruikt zijn om inkomende gesprekken via de router te ontvangen."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Intern nummer",
                content: "Geeft telefoonnummers weer die gebruikt zijn om te telefoneren tussen 2 telefonie apparaten die verbonden zijn met dezelfde router. Deze instelling is standaard ingesteld en kan niet gewijzigd worden."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Aantal uitgaande gesprekken",
                content: "Toont de nummers die door uw telefonie apparaten gebruikt zijn om uitgaande gesprekken via uw router te maken. Standaard is dit ingesteld op Auto, wat betekend dat uw router  een beschikbaar nummer selecteerd als uitgaande nummer welke veranderd kan worden op de VoIP pagina."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Printer"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Naam",
                content: "Geeft de naam van de printer weer die via de USB poort verbonden is met de router."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "USB Schijf"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Merk",
                content: "Geeft het merk van de USB schijf weer die verbonden is met de router."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Totaal",
                content: "Geeft het totale volume van de USB schijf weer."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Beschikbaar",
                content: "Geeft de beschikbare ruimte weer van de USB schijf."
            }]
        },
		sysMode: {
            TITLE: "Werkings mode",
            CONTENT: [{
                type: "name",
                title: "Router",
                content: "In deze modus verbindt de router direct met internet via een Dynamic IP, Static IP, PPPoE, L2TP of PPTP en deelt de internettoegang via meerdere bekabelde of draadloze apparaten. NAT, firewall en de DHCP Server zijn standaard ingeschakeld. Selecteer deze modus als u een beginnende gebruiker bent of als u geen andere routers gebruikt."
            }, {
                type: "name",
                title: "Access Point",
                content: "In deze modus wordt de router aangesloten op een bekabelde of draadloze router via een ethernetkabel en breidt de draadloze dekking uit van uw bestaande netwerk. Functies als NAT, ouderlijk toezicht en Qos worden niet ondersteunt in deze modes. Het IP adres van deze router wordt toegewezen door de DHCP server van de root router. Als u het IP adres niet weet van de router kunt u http://tplinkwifi.net gebruiken om in te loggen in de webconfiguratie pagina."
            }]
		},
        wirelessBasic: {
            TITLE: "Draadloze Instellingen",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz Draadloos Netwerk",
                content: "Selecteer deze checkbox om de 2.4GHz | 5GHz draadloze radio frequentie in te schakelen."
            }, {
                type: "name",
                title: "Draadloos netwerk naam (SSID)",
                content: "U kunt het standaard netwerk naam (SSID) zo laten, of creëer een nieuwe naam (tot 32 tekens). Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Wachtwoord",
                content: "Creëer een draadloos wachtwoord tussen 8 en 63 ASCII tekens, of tussen 8 en 64 hexadecimale tekens. Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Verberg SSID",
                content: "Selecteer deze checkbox als u de 2.4GHz | 5GHz SSID van de Wi-Fi netwerk lijst wilt verbergen."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Geeft relevante informatie over de Internet verbinding weer."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Naam",
                content: "Geeft de naam van de Internet poort van de router weer."
            }, {*/
                type: "name",
                title: "MAC adres",
                content: "Het unieke fysieke adres dat toegewezen is aan de Internet (WAN) poort van de router."
            }, {
                type: "name",
                title: "IP adres",
                content: "Het IP adres dat toegewezen is aan de Internet(WAN) poort van de router. Als het IP adres als 0.0.0.0 wordt weergegeven duidt dit aan dat er geen Internet toegang is."
            }, {
                type: "name",
                title: "Subnetmasker",
                content: "Deze parameter bepaald het netwerkgedeelte en het host-gedeelte van een IP adres."
            }, {
                type: "name",
                title: "Default Gateway",
                content: "Het IP adres dat gebruikt wordt om de router te verbinden met het netwerk."
            }, {
                type: "name",
                title: "Primair DNS/Secundair DNS",
                content: "Het Domain Name Systen (DNS) vertaald host namen en internet domeinen naar IP adressen. De informatie van deze DNS servers wordt toegewezen door Internet Service Providers (ISP)."
            }, {
                type: "name",
                title: "Verbindingstype",
                content: "De huidige verbindingstype van uw Internet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC adres",
                content: "Het unieke fysieke adres dat toegewezen is aan de Internet (WAN) poort van de router."
            }, {
                type: "name",
                title: "IP adres",
                content: "Het IPv6 adres dat is toegewezen aan de Internet(WAN) poort van de router."
            }, {
                type: "name",
                title: "Default Gateway",
                content: "Het IP adres dat gebruikt wordt om de router te verbinden met het netwerk."
            }, {
                type: "name",
                title: "Primair DNS/Secundair DNS",
                content: "Het Domain Name Systen (DNS) vertaald host namen en internet domeinen naar IP adressen. De informatie van deze DNS servers wordt toegewezen door Internet Service Providers (ISP)."
            }, {
                type: "name",
                title: "Verbindingstype",
                content: "De huidige verbindingstype van uw Internet."
            }, {
                type: "title",
                title: "Draadloos"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Selecteer om de draadloze instellingen en informatie van 2.4GHz | 5GHz te bekijken."
            }, {
                type: "name",
                title: "Netwerknaam",
                content: "Het draadloze netwerknaam, ookwel bekend als SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Draadloos Radio",
                content: "De huidige status (Aan of Uit) van het draadloze netwerk."
            }, {
                type: "name",
                title: "Mode",
                content: "De huidige draadloze mode."
            }, {
                type: "name",
                title: "Kanaalbandbreedte",
                content: "De kanaalbandbreedte van het draadloze netwerk."
            }, {
                type: "name",
                title: "Kanaal",
                content: "Het huidige draadloze kanaal en zijn corresponderende frequentie (in GHz)."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Het MAC adres van het draadloze netwerk radio."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Toont informatie over de Ethernet(LAN) poorten."
            }, {
                type: "title2",
                content: "IPv4."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Het unieke fysieke adres dat toegewezen is aan de Ethernet (LAN) poort van de router."
            }, {
                type: "name",
                title: "IP adres",
                content: "Het IPv4 adres dat toegewezen is aan de Ethernet(LAN) poort van de router."
            }, {
                type: "name",
                title: "Subnetmasker",
                content: "Deze parameter bepaald het netwerkgedeelte en het host-gedeelte van een IP adres."
            }, {
                type: "name",
                title: "DHCP",
                content: "Toont of de router zijn ingebouwde DHCP server actief is voor apparaten op de LAN poorten of niet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC adres",
                content: "Het unieke fysieke adres dat toegewezen is aan de Ethernet (LAN) poort van de router."
            }, {
                type: "name",
                title: "IP adres",
                content: "Het IPv6 adres dat is toegewezen aan de Ethernet (LAN) poort van de router."
            }, {
                type: "name",
                title: "Prefix lengte",
                content: "De lengte van het IPv6 adres prefix."
            }, {
                type: "name",
                title: "Toegewezen type",
                content: "Het IPv6 adres type dat toegewezen is aan de LAN interface."
            }, {
                type: "title",
                title: "Gastnetwerk"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Selecteer om de draadloze instellingen en informatie van het Gastnetwerk 2.4GHz | 5GHz te bekijken."
            }, {
                type: "name",
                title: "Gastnetwerk SSID",
                content: "Het draadloze netwerk naam (SSID) van uw gastnetwerk."
            }, {
                type: "name",
                title: "Verberg SSID",
                content: "Toont of het draadloze netwerk naam (SSID) van het gastnetwerk is verborgen (Aan) of niet (Uit)."
            }, {
                type: "name",
                title: "Draadloos Radio",
                content: "Geeft de huidige status (Aan of Uit) van het gastnetwerk aan."
            }, {
                type: "name",
                title: "Elkaar zien",
                content: "Toont of alle apparaten in het gastnetwerk met elkaar mogen communiceren of niet."
            }]
        },
        time: {
            TITLE: "Tijd Instellingen",
            CONTENT: [{
                type: "name",
                title: "Tijd Zone",
                content: "Selecteer uw lokale tijdzone van de keuzelijst."
            }, {
                type: "name",
                title: "Datum",
                content: "Vul uw lokale datum in MM/DD/JJ in dit veld."
            }, {
                type: "name",
                title: "Tijd",
                content: "Kies uw lokale tijd van de keuzelijst. (In 24-uurs klok formaat, bijv. 16:00:00 is 04:00PM)."
            }, {
                type: "name",
                title: "NTP Server I/NTP Server II",
                content: "Vul het IP adres van de NTP Server I of NTP Server II in en de router verkrijgt zijn tijdinstellingen automatisch van de NTP server. Daarnaast heeft de router sommige ingebouwde NTP Servers die automatisch synchroniseren wanneer deze verbinden met het Internet."
            }, {
                type: "name",
                title: "Verkrijg van PC",
                content: "Klik om te synchroniseren met de computer systeem tijd."
            }, {
                type: "name",
                title: "Verkrijg GMT",
                content: "Klik om te synchroniseren met GMT (Greenwich Mean Time) tijd zone van het Internet."
            }, {
                type: "name",
                title: "Opslaan",
                content: "Klik om uw instellingen op te slaan."
            }, {
                type: "title",
                content: "Zomertijd"
            }, {
                type: "note",
                title: "Om zomertijd in te stellen.",
                content: [
                    "Selecteer <b> Zomertijd inschakelen</B>",
                    "Selecteer de juiste <b>Start</b> datum en tijd wanneer de zomertijd start op uw lokale tijd zone.",
                    "Selecteer de juiste <b>Eind</b> datum en tijd wanneer de zomertijd stopt op uw lokale tijd zone.",
                    "Klik <b> Opslaan </b>"
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Diagnostische hulpmiddelen",
            CONTENT: [{
                type: "paragraph",
                content: "De router bied twee diagnostische hulpmiddelen, ping en trace."
            }, {
                type: "note",
                title: "Om te diagnosticeren via het hulpmiddel Ping.",
                content: [
                    "Controleer de radio knop voor de ping.",
                    "Vul het ip adres of domein naam in.",
                    "Klik op het keuzelijst pictogram voor Geavanceerd om Ping Count, Ping Packet grootte en Ping Timeout weer te geven. Behoudt deze parameters als standaard waardes of configureer ze volgens uw behoeften.",
                    "Klik op de start knop om de diagnose te beginnen."
                ]
            }, {
                type: "paragraph",
                content: "OF"
            }, {
                type: "note",
                title: "Om te diagnosticeren via het hulpmiddel Traceroute.",
                content: [
                    "Controleer de radio knop voor de traceroute.",
                    "Vul het ip adres of domein naam in.",
                    "Klik op het keuzelijst pictogram voor Geavanceerd om Traceroute MAX TTL weer te geven. Houd het op zijn standaard waarde of configureer ze volgens uw behoeften.",
                    "Klik op de start knop om de diagnose te beginnen."
                ]
            }]
        },
        softup: {
            TITLE: "Firmware Upgrade",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Een firmware upgrade werkt het besturings systeem van de router bij met de laatste nieuwste kenmerken en diverse oplossingen om de prestaties te verbeteren. Wanneer er een nieuwe firmware upgrade beschikbaar is, wordt u genotificeerd door middel van een Update icoon in de rechter bovenhoek. Klik op het icoon om de firmware upgrade pagina te benaderen."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>BELANGRIJK: Volg gelieve de instructies om firmware upgrade fouten te voorkomen.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Voor de upgrade:",
                content: [
                    "Verbind uw computer met de router door middel van een Ethernet kabel. Het is NIET aangeraden om de firmware upgrade draadloos uit te voeren.",
                    "Verwijder alle aangesloten USB opslag apparaten van de router.",
                    "Back up de router zijn configuratie instellingen."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Tijdens het upgrade proces:<br>Schakel de router niet uit en verricht geen werkzaamheden op de router."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Om de firmware online te upgraden"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Klik Upgrade en bevestig indien gevraagd. De router zal de laatste firmware automatisch downloaden en upgraden en daarna herstarten.<br><b>Opmerking</b>: U dient wellicht eerst op Check voor upgrades te klikken om te controleren of er een firmware update beschikbaar is."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Om de firmware handmatig te upgraden."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Om de firmware van de router te upgraden.",
                content: [
                    "Bezoek www.tp-link.com en download de laatste firmware vanaf onze support pagina naar uw computer. Wees er zeker van dat het firmware bestand dat u download gelijk is aan uw router's hardware versie zoals op de pagina staat vermeld.",
                    "Klik <b>Bladeren</b> en selecteer het gedownloade firmware bestand.",
                    "Klik <b>Upgrade</b>. De firmware upgrade duurt een paar minuten om te voltooien. De router zal automatisch herstarten wanneer de firmware upgrade voltooid is."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Before upgrading the firmware of the router, you will need to download the latest firmware update from the <a href='http://www.tp-link.com/en/download-center.html'>TP-LINK Download Center page</a> to your computer."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>Belangrijk:</B> Om upgrade fouten te voorkomen, noteer het volgende:",
                content: [
                    "Wees er zeker van dat het laatste firmware bestand overeenkomt met de hardware versie ( zoals op de <b>Firmware Upgrade</b> pagina vermeldt.",
                    "Wees er zeker van dat u een stabiele verbinding heeft tussen de router en uw computer. Het is <b>NIET</b> aangeraden om de firmware draadloos te upgraden.",
                    "Wees er zeker van dat u alle USB opslag apparaten die verbonden zijn met de router heeft verwijderd voor de firmware upgrade om data verlies te voorkomen.",
                    "Sla uw router configuratie op.",
                    "Schakel uw router niet uit tijdens de firmware upgrade."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Pour mettre à niveau le microprogramme du routeur",
                content: [
                    "Klik <b>Bladeren</b>.",
                    "Lokaliseer en selecteer het gedownloade firmware bestand.",
                    "Klik <b>Upgrade</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Backup",
            CONTENT: [{
                type: "paragraph",
                content: "Het wordt zeer aangeraden om een backup te maken van uw huidige configuratie voor het geval het nodig is om het systeem naar een vorige toestand of fabrieksinstellingen te herstellen."
            }, {
                type: "paragraph",
                content: "Klik <b>Backup</b> om uw huidige configuraties op uw computer op te slaan. Wees er zeker van dat u het backup bestand op een veilige locatie opslaat zodat u deze kunt terugvinden en de router later kunt herstellen, indien nodig."
            }, {
                type: "title",
                content: "Herstellen."
            }, {
                type: "note",
                title: "Om te herstellen vanaf een backup",
                content: [
                    "Klik <b>Bladeren</b>.",
                    "Lokaliseer en selecteer het backup bestand.",
                    "Klik <b>Herstellen</b>."
                ]
            }, {
                type: "title",
                content: "Fabrieksinstellingen herstellen."
            }, {
                type: "paragraph",
                content: "Klik <b>Fabrieksinstellingen herstellen</b> om uw router te herstellen naar zijn fabrieksinstellingen."
            }, {
                type: "note",
                title: "Opmerking:",
                content: [
                    "Fabrieksinstellingenherstellen  zal alle instellingen die u geconfigureerd heeft op de router herstellen naar zijn fabrieksinstellingen. Als de router eenmaal is hersteld en herstart, creëer een nieuw wachtwoord om nogmaals in te loggen op de web-gebasseerde beheer pagina.",
                    "Gelieve de router NIET uitschakelen tijdens een backup of herstel proces."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Account beheer",
            CONTENT: [{
                type: "paragraph",
		display: "$.helpControl.cloudLogin",
                content: "Deze pagina staat u toe om uw login wachtwoord te wijzigen."
            }, /*{
                type: "name",
                title: "Oude gebruikersnaam.",
                content: "Typ uw huidige gebruikersnaam in."
            }, */{
                type: "name",
                title: "Oud wachtwoord.",
                content: "Typ uw huidige wachtwoord in."
            }, /*{
                type: "name",
                title: "Nieuwe gebruikersnaam.",
                content: "Typ uw nieuwe gebruikersnaam in."
            }, */{
                type: "name",
                title: "Nieuw wachtwoord.",
                content: "Typ uw nieuwe wachtwoord in."
            }, {
                type: "name",
                title: "Bevestig nieuw wachtwoord.",
                content: "Typ uw wachtwoord nogmaals in."
            }, {
                type: "title",
                content: "Lokaal beheer."
            }, {
                type: "paragraph",
                content: "Het lokale beheer staat u toe om een cliënt apparaat specifiek toe te wijzen om toegang tot uw netwerk te verkrijgen en de router kan beheren via het MAC adres-gebasseerde authenticatie."
            }, {
                type: "name",
                title: "Poort.",
                content: "Vul het poort nummer in dat gebruikt wordt om de router te benaderen tussen 1024 en 65535. Het standaard nummer is 80."
            }, {
                type: "name",
                title: "IP/MAC adres",
                content: "Vul een geldig IP adres of MAC adres in van het apparaat dat dient toegestaan te worden om de router te benaderen."
            }, {
                type: "title",
                content: "Beheer op afstand."
            }, {
                type: "paragraph",
                content: "De op afstand beheer functie staat u toe om uw router op afstand te benaderen en te configureren via het Internet."
            }, {
                type: "name",
                title: "Beheer op afstand",
                content: "Selecteer deze checkbox om de op afstand beheer functie in te schakelen."
            }, {
                type: "name",
                title: "Poort",
                content: "Vul het poort nummer in dat gebruikt wordt om de router met meer veiligheid te benaderen  tussen 1024 en 65535. Normaal gesproken gebruiken web browsers het standaard HTTP service poort 80."
            }, {
                type: "name",
                title: "IP/MAC adres",
                content: "Vul een geldig remote IP adres of MAC adres in dat dient toegestaan te worden om toegang tot de router te verkrijgen."
            }]
        },
        log: {
            TITLE: "Systeem Log",
            CONTENT: [{
                type: "paragraph",
                content: "Het systeem log pagina toont een lijst van meest recentelijke activiteiten (evenementen) van de router. U kunt definiëren welke typen logs en/of het niveau van logs u wilt bekijken. De pagina staat de router ook to om het systeem log te exporteren naar een computer of om het systeem log automatisch te versturen naar een specifieke server op afstand."
            }, {
                type: "name",
                title: "Type",
                content: "Selecteer het type systeem log om weer te geven."
            }, {
                type: "name",
                title: "Niveau",
                content: "Selecteer het niveau systeem log om weer te geven."
            }, {
                type: "name",
                title: "Verversen",
                content: "Klik op deze pictogram om het systeem log te updaten."
            }, {
                type: "name",
                title: "Alles verwijderen",
                content: "Klik op deze pictogram om alle systeem logs te verwijderen."
            }, {
                type: "name",
                title: "Log instellingen",
                content: "Klik om de log bestand instellingen in te stellen.",
                children: [{
                    type: "name",
                    title: "Lokaal opslaan",
                    content: "Selecteer om het systeem log op het lokale geheugen van uw router op te slaan. De log zal getoond worden in de tabel onder systeem log pagina.",
                    children: [{
                        type: "name",
                        title: "Minimum niveau",
                        content: "Selecteer het minimum niveau uit de vervolg keuzelijst van het systeem log om opgeslagen te worden.De lijst is in aflopende volgorde, met het laagste niveau als laatst geplaatst."
                    }]
                }, {
                    type: "name",
                    title: "Opslaan op afstand",
                    content: "Selecteer om het systeemlog naar een server op afstand te sturen. Als de server op afstand een log viewer cliënt of een sniffer hulpmiddel geimplementeerd heeft, kunt u het systeem log in real-time op afstand bekijken en analyseren.",
                    children: [{
                        type: "name",
                        title: "Minimum niveau",
                        content: "Selecteer het minimum niveau uit de vervolg keuzelijst van het systeem log om opgeslagen te worden.De lijst is in aflopende volgorde, met het laagste niveau als laatst geplaatst."
                    }, {
                        type: "name",
                        title: "Server IP",
                        content: "Specificeer het IP adres van de externe systeem log server."
                    }, {
                        type: "name",
                        title: "Server poort",
                        content: "Specificeer het poort nummer van de externe systeem log server."
                    }, {
                        type: "name",
                        title: "Lokale faciliteit naam",
                        content: "Selecteer de lokale faciliteit naam van de externe server uit de vervolg keuzelijst."
                    }]
                }]
            }, {
                type: "name",
                title: "Log opslaan",
                content: "Klik op deze knop om alle systeem logs op uw lokale computer te downloaden."
            }]
        },
        snmp: {
            TITLE: "SNMP Instellingen",
            CONTENT: [{
                type: "name",
                title: "SNMP agent",
                content: "Schakel in om de ingebouwde SNMP agent in te schakelen die het mogelijk maakt dat de router werkt als de operationele rol in het ontvangen en verwerken van SNMP berichten, het versturen van reacties op de SNMP manager en het triggeren van SNMP traps wanneer een gebeurtenis plaatsvindt."
            }, {
                type: "name",
                title: "Alleen-lezen gemeenschap",
                content: "Toont het standaard openbare gemeenschap string dat de router beschermt tegen ongeautoriseerde toegang."
            }, {
                type: "name",
                title: "Schrijf gemeenschap",
                content: "Toont het standaard lees en schrijf gemeenschap dat de router beschermt tegen ongeautoriseerde wijzigingen."
            }, {
                type: "name",
                title: "Systeem naam",
                content: "Toont de administratieve-toegewezen naam voor dit beheerde apparaat."
            }, {
                type: "name",
                title: "Systeem beschrijving",
                content: "Toont de tekstuele beschrijving van het beheerde apparaat. Deze waarde zou de volledige naam en versie identificatie van het systeem's hardware type, software oparating-systeem en netwerking software moeten includeren."
            }, {
                type: "name",
                title: "Systeem locatie",
                content: "Toont de fysieke locatie van het apparaat (bijv. Telefoonkast, 3e verdieping)."
            }, {
                type: "name",
                title: "Systeem contract",
                content: "Toont de tekstuele identificatie van het contact persoon van dit beheerde apparaat, samen met informatie over hoe deze persoon te contacteren."
            }, {
                type: "name",
                title: "Trap Manager IP",
                content: "Toont het IP adres van de host om de traps te ontvangen."
            }]
        },
        stat: {
            TITLE: "Verkeer Statistieken",
            CONTENT: [{
                type: "name",
                title: "Verkeer Statistieken",
                content: "Schakel in om de Verkeer statistieken functie in te schakelen."
            }, {
                type: "title",
                content: "Verkeer Statistieken lijst."
            }, {
                type: "name",
                title: "IP/MAC adres",
                content: "Het IP en MAC adres van de verbonden cliënten."
            }, {
                type: "name",
                title: "Totale Pakketten",
                content: "Het totaal aantal pakketten dat ontvangen en verwerkt is door de router."
            }, {
                type: "name",
                title: "Totale Bytes",
                content: "Het totaal aantal bytes dat ontvangen en verwerkt is door de router."
            }, {
                type: "name",
                title: "Huidige Pakketten",
                content: "Het totaal aantal pakketten ontvangen en verwerkt op een specifieke tijd interval in seconden."
            }, {
                type: "name",
                title: "Huidige Bytes",
                content: "Het totaal aantal bytes ontvangen en verwerkt op een specifieke tijd interval in seconden."
            }, {
                type: "name",
                title: "Huidige ICMP Tx",
                content: "Toont de huidige overdrachtsnelheid van de ICMP pakketten overgedragen via de WAN poort over de maximale overdrachts snelheid per seconde."
            }, {
                type: "name",
                title: "Huidige UDP Tx",
                content: "Toont de huidige overdrachtsnelheid van de UDP pakketten overgedragen via de WAN poort over de maximale overdrachts snelheid per seconde."
            }, {
                type: "name",
                title: "Huidige SYN Tx",
                content: "Toont de huidige overdrachtsnelheid van de TCP SYN pakketten overgedragen via de WAN poort over de maximale overdrachts snelheid per seconde."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Klik het <b>prullenbak</b> pictogram om de corresponderende statistieken te verwijderen."
            }, {
                type: "name",
                title: "Verversen",
                content: "Klik om de statistische informatie op de pagina te updaten."
            }, {
                type: "name",
                title: "Herstellen",
                content: "Klik om alle statistische waardes in de lijst naar 0 te herstellen."
            }, {
                type: "name",
                title: "Alles verwijderen",
                content: "Klik om alle statistische informatie in de lijst te verwijderen."
            }]
        },
        ethWan: {
            TITLE: "WAN Interface",
            CONTENT: [{
                type: "title2",
                content: "Verbindingstype: Dynamisch IP"
            }, {
                type: "name",
                title: "Dynamisch IP",
                content: "Selecteer dit type wanneer u voorzien bent van een DHCP server verbinding via de ISP (Internet Service Provider)."
            }, {
                type: "name",
                title: "IP adres/subnetmasker/default gateway",
                content: "Deze parameters zijn automatisch toegewezen door de DHCP server vanaf uw ISP."
            }, {
                type: "name",
                title: "Vernieuwen/Vrijlaten",
                content: "Klik op deze knop om de IP parameters vanaf uw ISP te vernieuwen/vrijlaten."
            }, {
                type: "name",
                title: "Geavanceerd",
                children: [{
                    type: "name",
                    title: "MTU grootte (in bytes)",
                    content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is <b>1500 Bytes</b>. Het is niet aanbevolen om de standaard MTU groote te wijzigen tenzij dit vereist is door uw ISP."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) wordt gebruikt om multicasting op TCP/IP netwerken te beheren. Sommige ISP's gebruiken IGMP om configuraties op een router op afstand uit te voeren. Het is standaard ingeschakeld."
                }, {
                    type: "name",
                    title: "Verkrijg IP via Unicast DHCP",
                    content: "Selecteer deze checkbox als uw ISP's DHCP server geen broadcast applicaties ondersteund en u geen IP adres dynamisch kunt ontvangen."
                }, {
                    type: "name",
                    title: "Gebruik het volgende DNS adres",
                    content: "Selecteer deze checkbox en vul het DNS Server adres(sen) in decimale notatie verkregen van door uw ISP. Deze WAN interface zal de gespecificeerde DNS server als prioriteit gebruiken."
                }, {
                    type: "name",
                    title: "Host naam",
                    content: "Vul de host naam van deze WAN interface in."
                }]
            }, {
                type: "title2",
                content: "Verbindingstype: Statisch IP"
            }, {
                type: "name",
                title: "Statisch IP",
                content: "Selecteer dit type wanneer u voorzien bent van een specifiek (vast) IP adres, subnetmasker, gateway en DNS parameters door uw ISP."
            }, {
                type: "name",
                title: "IP adres/subnetmasker/Gateway/DNS server/secundaire DNS server",
                content: "Vul de IP informatie verkregen van uw ISP in, in decimale notatie."
            }, {
                type: "paragraph",
                content: "Klik<b>Geavanceerd</b> om meer geavanceerde instellingen te bekijken."
            }, {
                type: "name",
                title: "Geavanceerd",
                children: [{
                    type: "name",
                    title: "MTU grootte (in bytes)",
                    content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is <b>1500 Bytes</b>. Het is niet aanbevolen om de standaard MTU groote te wijzigen tenzij dit vereist is door de ISP."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) wordt gebruikt om multicasting op TCP/IP netwerken te beheren. Sommige ISP's gebruiken IGMP om configuraties op een router op afstand uit te voeren. Het is standaard ingeschakeld."
                }]
            }, {
                type: "title2",
                content: "Verbindingstype: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Selecteer dit type als u DSL (Digital Subsciber Line) service gebruikt en een gebruikersnaam en wachtwoord verkregen heeft van uw ISP ."
            }, {
                type: "name",
                title: "PPPoE gebruikersnaam/PPPoE wachtwoord/ Wachtwoord bevestigen",
                content: "Vul het gebruikersnaam en wachtwoord in verkregen van uw ISP. Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Secundaire verbinding",
                content: "Het is alleen beschikbaar voor PPPoE verbindingen. Als uw ISP een extra verbindings type biedt zoals Dynamisch/Statisch IP om te verbinden met een local area netwerk, daarna kunt u de radio knop selecteren van Dynamisch/Statisch IP om deze secundaire verbinding te activeren.<br> De secundaire verbinding is standaard uitgeschakeld, dus er is alleen een PPPoE verbinding. Schakel deze niet in tenzij het nodig is."
            }, {
                type: "name",
                title: "Verbindings mode",
                content: "Selecteer één van onderstaande verbindingen die bepalen hoe u verbinding maakt met het Internet.",
                children: [{
                    type: "name",
                    title: "Altijd",
                    content: "Selecteer deze mode om automatisch weer verbinding te maken wanneer de connectie is verbroken."
                }, {
                    type: "name",
                    title: "Op aanvraag verbinden",
                    content: "Selecteer deze mode om de Internet verbinding te verbreken gebasseerd op specifieke tijd van inactiviteit (Max Idle Time). De verbinding wordt opnieuw gemaakt wanneer u opnieuw probeert verbinding te maken met het Internet."
                }, {
                    type: "name",
                    title: "Handmatig verbinden",
                    content: "Selecteer deze mode om handmatig te verbinden of de verbinding te verbreken gebasseerd op specifieke tijd van inactiviteit. De standaard inactieve tijd is 15 minuten."
                }, {
                    type: "name",
                    title: "Max Idle Tijd",
                    content: "<b>15minuten</b> - Voor het aantal minuten in dat de Internet verbinding inactief kan zijn voordat deze wordt beëindigd. De standaard inactieve tijd is 15 minuten."
                }]
            }, {
                type: "name",
                title: "Authenticatie type",
                content: "Selecteer een authenticatie type van de vervolg keuze-lijst. De standaard methode is AUTO-AUTH."
            }, {
                type: "name",
                title: "Verbinden/Verbinding verbreken",
                content: "Klik om onmiddelijk te verbinden/verbreken."
            }, {
                type: "paragraph",
                content: "Klik <b> Geavanceerd </b> om meer geavanceerde instellingen te bekijken."
            }, {
                type: "name",
                title: "Geavanceerd",
                children: [{
                    type: "name",
                    title: "Service naam",
                    content: "Voer de service naam in verkregen van uw ISP. Zo niet, laat de invoer leeg."
                }, {
                    type: "name",
                    title: "Server naam",
                    content: "Voer de server naam in verkregen van uw ISP. Zo niet, laat de invoer leeg."
                }, {
                    type: "name",
                    title: "MTU grootte (in bytes)",
                    content: "De typische MTU (Maximale Transmissie Unit) grootte voor Ethernet netwerken is 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Opmerking</b>: In een zeldzaam geval kan het zijn dat uw ISP u aanraad om de MTU grootte aan te passen voor een betere netwerk prestatie. U dient de waarde niet te veranderen tenzij dit absoluut noodzakelijk is."
                    }]
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) wordt gebruikt om multicasting op TCP/IP netwerken te beheren. Sommige ISP's gebruiken IGMP om configuraties op een router op afstand uit te voeren. Het is standaard ingeschakeld."
                }, {
                    type: "name",
                    title: "Gebruik het IP gespecificeerd door ISP",
                    content: "Selecteer deze optie en voer een IP adres in die u verkregen heeft van uw ISP."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Voer een tijd interval waarde tussen 0 en 120 (in seconden) in waarvoor de router verzoekt access concentrator te herhalen op elke interval. De standaard waarde is 30.0 wat geen detectie betekend."
                }, {
                    type: "name",
                    title: "Gebruik het volgende DNS adres",
                    content: "Selecteer deze checkbox en voer de DNS server adres(sen) in in decimale notatie verkregen van uw ISP. Deze WAN interface zal de gespecificeerde DNS servers als prioriteit gebruiken."
                }]
            }, {
                type: "title2",
                content: "Verbinding type: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Selecteer dit type als u verbinding maakt met een L2TP/PPTP VPN Server en een gebruikersnaam, wachtwoord en IP adres/Domein naam verkregen heeft van uw ISP."
            }, {
                type: "name",
                title: "Gebruikersnaam/wachtwoord",
                content: "Voer de gebruikersnaam en het wachtwoord in verkregen van uw ISP. Dit veld is hoofdletter gevoelig."
            }, {
                type: "name",
                title: "Ip adres/primair DNS",
                content: "Deze parameters zijn automatisch toegewezen door de DHCP server vanaf uw ISP."
            }, {
                type: "name",
                title: "Secundaire verbinding (Dynamisch IP of Statisch IP)",
                children: [{
                    type: "name",
                    title: "Dynamisch IP",
                    content: "Selecteer dit als het IP adres en het subnetmasker automatisch doorgewezen worden door uw ISP."
                }, {
                    type: "name",
                    title: "Statisch IP",
                    content: "Selecteer dit als het IP adres, subnetmasker, gateway en dns addressen verkregen worden door uw ISP en vul deze informatie in in de corresponderende velden."
                }]
            }, {
                type: "name",
                title: "VPN Server IP/Domein naam",
                content: "Voer de VPN server's IP adres of domein naam in verkregen van uw ISP."
            }, {
                type: "name",
                title: "MTU grootte",
                content: "De standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1460 Bytes (1420 voor PPTP). Het is niet aanbevolen om de standaard MTU groote te wijzigen tenzij dit vereist is door uw ISP."
            }, {
                type: "name",
                title: "Verbindings mode",
                content: "Selecteer een toepasselijke verbindings mode dat bepaald hoe u verbinding maakt met het Internet.",
                children: [{
                    type: "name",
                    title: "Altijd aan",
                    content: "In deze mode, zal de internet verbinding automatisch verbinding blijven maken elke keer wanneer deze verbroken wordt."
                }, {
                    type: "name",
                    title: "Op aanvraag verbinden",
                    content: "In deze mode, zal de internet verbinding automatisch verbroken worden wanneer de specifieke tijd van inactiviteit (Max Idle Time) overschreden is. De verbinding wordt hersteld wanneer u weer toegang tot het internet probeert te verkrijgen."
                }, {
                    type: "name",
                    title: "Handmatig verbinden",
                    content: "In deze mode, wordt de internet verbinding handmatig gecontroleerd door te klikken op de verbinden/verbreken knop. Deze mode ondersteund ook de Max Idle Time functie. Voer de maximale inactieve tijd (in minuten) in om de maximale tijd te specificeren dat de internet verbinding inactief kan zijn voordat deze wordt beëindigd. De standaard waarde is 15 minuten. Als u wilt dat de internet verbinding ten alle tijden actief blijft, voer dan 0 (nul) in."
                }]
            }, {
                type: "title",
                content: "Mac kloon"
            }, {
                type: "name",
                title: "Gebruik het standaard MAC adres",
                content: "Selecteer deze optie om het standaard MAC adres te gebruiken voor het geval uw ISP nog geen IP adres aan de router's MAC adres heeft toegewezen."
            }, {
                type: "name",
                title: "Gebruik huidige MAC adres van computer",
                content: "Selecteer deze optie om het MAC adres van de huidig verbonden computer te gebruiken in het geval de ISP alleen toegang tot het Internet aan deze computer verleent."
            }, {
                type: "name",
                title: "Gebruik aangepast MAC adres",
                content: "Selecteer deze optie om het geregistreerde MAC adres handmatig in te voeren."
            }]
        },
        route: {
            TITLE: "Geavanceerde Routing",
            CONTENT: [{
                type: "paragraph",
                content: "Geavanceerde routing wordt gebruikt om vooraf een vaste route te bepalen voor netwerkinformatie pakketten om een specifieke host of netwerk te bereiken."
            }, {
                type: "title",
                content: "Statische routing"
            }, {
                type: "name",
                title: "Bestemming IP adres/subnetmasker/gateway",
                content: "Toont de bestemming IP adres, subnetmasker en gateway van de statische route."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Geeft de huidige status van de statische route weer. Klik het <b>Lamp</b> pictogram om de statische route in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft opties weer om de corresponderende invoer te <b>Wijzigen</b> of te <b>Verwijderen</b>."
            }, {
                type: "note",
                title: "Om statische routing in te schakelen.",
                content: [
                    "Klik <b>Toevoegen</b>.",
                    "Voer een bestemming IP adres in om voor deze invoer een statische router toe te wijzen.",
                    "Voer het subnetmasker in hexadecimaal formaat in om het netwerk deel en het host deel van het IP adres te bepalen.",
                    "Voer een gateway IP adres formaat in om de router met het netwerk of host te verbinden.",
                    "Selecteer <b>LAN</b> of een WAN interface om het type van het bestemming IP adres te specificeren.",
                    "Selecteer <b>Deze invoer inschakelen</b>.",
                    "Klik <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Systeem routing tabel."
            }, {
                type: "paragraph",
                content: "Systeem routing tabel toont alle geldige route invoeringen die momenteel gebruikt worden."
            }, {
                type: "paragraph",
                content: "Klik verversen om de routing tabel te updaten."
            }]
        },
        ddns: {
            TITLE: "Dynamische DNS Instellingen",
            CONTENT: [{
                type: "paragraph",
                content: "Dynamisch DNS biedt de mogelijkheid een vaste host en domeinnaam aan een dynamisch Internet IP-adres toe te wijzen. Dat is handig wanneer u uw eigen website, FTP server, of andere server achter de router host. Ten eerste moet u zich aanmelden bij een DDNS service provider, zoals www.dyndns.com."
            }, {
                type: "step",
                title: "Een dynamisch DNS instellen",
                content: [
                    "Selecteer de Dynamische DNS service provider.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Voer de Domeinnaam in die u van de DDNS service provider hebt ontvangen.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Als u een nieuw DDNS account wilt gebruiken, gelieve eerst uit te loggen en daarna in te loggen met het nieuwe account."
            }]
        },
        dhcp: {
            TITLE: "DHCP Server",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP(Dynamisch Host Configuratie Protocol) server wijst dynamisch TCP/IP configuraties naar de cliënt apparaten toe van een IP adres pool. Schakel de standaard DHCP server NIET uit tenzij u een andere DHCP server heeft of als u de TCP/IP configuraties handmatig wenst toe te wijzen aan individuele cliënten in uw lokale netwerk."
            }, {
                type: "name",
                title: "IP adres pool",
                content: "Voer de reeks van IP adressen in dat uitgeleend kan worden aan cliënten."
            }, {
                type: "name",
                title: "Adres huur tijd",
                content: "Voer de tijdsduur in van een IP adres dat uitgeleend wordt aan een cliënt tussen 1 en 2880 minuten."
            }, {
                type: "name",
                title: "Default Gateway",
                content: "Voer het LAN IP adres in (Optioneel)"
            }, {
                type: "name",
                title: "DNS Server/Secundair DNS Server",
                content: "Voer het DNS server adres is die u gekregen heeft van uw ISP. (Optioneel)"
            }, {
                type: "title",
                content: "Cliënt Lijst."
            }, {
                type: "name",
                title: "Totale cliënten",
                content: "Geeft het aantal van geassocieerde DHCP cliënts weer."
            }, {
                type: "name",
                title: "Cliënt naam",
                content: "Geeft de naam van de DHCP cliënt weer."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres weer."
            }, {
                type: "name",
                title: "Toegewezen IP adres",
                content: "Geeft het toegwezen IP adres van de cliënt via de DHCP server weer."
            }, {
                type: "name",
                title: "Gehuurde tijd ",
                content: "Geeft de tijdsduur van een IP adres weer dat uitgeleend wordt aan de cliënt. "
            }, {
                type: "name",
                title: "Verversen",
                content: "Klik om de DHCP cliënt lijst te updaten."
            }, {
                type: "title",
                content: "Adres Reservering"
            }, {
                type: "paragraph",
                content: "U kunt handmatig een IP adres reserveren voor een cliënt dat verbonden is met uw router. Eenmaal gereserveerd, zal het IP adres alleen toegewezen worden aan dezelfde cliënt door de DHCP server."
            }, {
                type: "name",
                title: "MAC adres",
                content: "Geeft het MAC adres van de cliënt weer met DHCP gereserveerd IP adres."
            }, {
                type: "name",
                title: "Gereserveerd IP adres",
                content: "Geeft het gereserveerde IP adres van de cliënt weer."
            }, {
                type: "name",
                title: "Beschrijving",
                content: "Toont de beschrijving van het apparaat."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Klik om de corresponderende invoer in te schakelen of uit te schakelen."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties om de corresponderende client te <b>Bewerken</b> of te <b>Verwijderen</b>."
            }, {
                type: "note",
                title: "Om een IP adres te reserveren voor een DHCP cliënt.",
                content: [
                    "Klik <b>Toevoegen</b>.",
                    "Voer het <b>MAC adres</b> van de cliënt in.",
                    "Voer het IP adres in dat u wilt reserveren voor uw cliënt.",
                    "Voer de beschrijving van het apparaat in.",
                    "Selecteer <b>Deze invoer inschakelen</b>.",
                    "Klik <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Om een bestaande cliënt te bewerken of te verwijderen.",
                content: [
                    "Klik op het <b>Bewerken</b> of het <b>Prullenbak</b> pictogram in de corresponderende invoer."
                ]
            }, {
                type: "title",
                content: "Voorwaarde van de pool."
            }, {
                type: "name",
                title: "Vendor ID/Startend IP adres/Eind IP adres/ Faciliteit",
                content: "Geeft het Vender ID, Startende IP adres, Eindigend IP adres en Faciliteit van de pool voorwaardes weer."
            }, {
                type: "name",
                title: "Status",
                content: "Geeft de huidige status van de pool voorwaardes weer. Klik op het Lamp pictogram om de pool voorwaardes in te schakelen of (uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties weer op de corresponderende cliënt te <b>Bewerken</b> of te <b>Verwijderen</b>."
            }, {
                type: "note",
                title: "Om een voorwaarde aan de pool toe te voegen.",
                content: [
                    "Klik <b>Toevoegen</b>.",
                    "Voer het LAN apparaat naam in.",
                    "Voer een waarde in om de vendor en functionaliteit van de DHCP cliënt te identificeren.",
                    "Voer het start IP adres in dat de DHCP server aan cliënten toewijst.",
                    "Voer het einigend IP adres in dat de DHCP server aan cliënten toewijst.",
                    "Voer het default gateway van de DHCP server in.",
                    "Selecteer aan apparaat type van de keuzelijst.",
                    "Selecteer een optie van de keuze lijst.",
                    "Voer de optie waarde in.",
                    "Selecteer <b>Deze invoer inschakelen</b>.",
                    "Klik <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV Instellingen",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Selecteer om de IPTV functie in te schakelen."
            }, {
                type: "name",
                title: "Mode",
                content: "Selecteer de geschikte mode bepaald door uw ISP. Er zijn zes IPTV modes:",
                children: [{
                    type: "name",
                    title: "Bridge",
                    content: "Selecteer dit als uw ISP niet in de lijst voorkomt en er geen andere parameters voorafbepaald zijn.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Wijs uw LAN poort toe om te functioneren als Internet leverancier of als IPTV leverancier."
                    }]
                }, {
                    /*type: "name",
                    title: "Rusland",
                    content: "Selecteer dit als uw ISP uit Rusland komt en de benodige parameters voorafbepaald zijn, inclusief Internet/IP-Telefoon/IPTV VLAN ID's en Prioriteit en LAN (1/2/3/4) poorten.",
                    children: [{
                        type: "name",
                        title: "IPTV Multicast VLAN ID/Prioriteit",
                        content: "U kunt de IPTV multicast inschakelen zoals u wenst en VLAN ID en Prioriteit te configureren bepaald door uw ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapore-Singtel",
                    content: "Selecteer deze optie als uw ISP ExStream van Singapore is en de benodigde parameters voorafbepaald zijn, inclusief Internet/IPTV VLAN ID's en prioriteit en LAN (1/2/3/4) poorten."
                }, {
                    type: "name",
                    title: "Maleisië-Unifi",
                    content: "Selecteer deze optie als uw ISP Unifi uit Maleisië is en de benodigde parameters voorafbepaald zijn, inclusief Internet/IPTV VLAN ID's en prioriteit en LAN (1/2/3/4) poorten."
                }, {
                    type: "name",
                    title: "Maleisië-Maxis",
                    content: "Selecteer deze optie als uw ISP Maxis uit Maleisië is en de benodigde predetermined voorafbepaald zijn, inclusief Internet/IPTV VLAN ID's en prioriteit en LAN (1/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) poorten."
                }, {
                    type: "name",
                    title: "Aangepast",
                    content: "Selecteer deze optie als uw ISP niet in de lijst voorkomt, maar wel over de benodigde parameters beschikt, inclusief Internet/IPTV VLAN ID's en prioriteit en LAN (1/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) poorten.",
                    children: [{
                        type: "name",
                        title: "Internet/IP-Phone/IPTV VLAN ID/Prioriteit",
                        content: "Configureer de VLAN ID's bepaald door uw ISP."
                    }, {
                        type: "name",
                        title: "802.11Q Tag",
                        content: "Selecteer of de internet pakketten met 802.11Q getagged worden."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Wijs uw Lan poort toe om te functioneren als Internet leverancier of als IPTV leverancier."
                    }, {
                        type: "name",
                        title: "IPTV Multicast VLAN ID/Prioriteit",
                        content: "U kunt de IPTV multicast inschakelen zoals u wenst en VLAN ID en Prioriteit te configureren bepaald door uw ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP Proxy",
                content: "Selecteer de IGMP (Internet Group Management Protocol) Proxy versie, ofwel V2 of V3, bepaald door uw ISP."
            }]
        },
        usbManage: {
            TITLE: "USB Opslag apparaat",
            CONTENT: [{
                type: "paragraph",
                content: "Het <b>USB Opslag apparaat</b> scherm geeft basis informatie over het USB opslag apparaat verbonden via de USB poort weer."
            }, {
                type: "name",
                title: "Scannen",
                content: "Doorgaans detecteert de router automatisch nieuwe aangesloten apparaten. Indien dit niet gebeurd, klik dan op deze knop om te scannen het het scherm te vernieuwen met de geupdate informatie."
            }, {
                type: "name",
                title: "Volume naam",
                content: "Geeft de naam van het USB volume weer."
            }, {
                type: "name",
                title: "Capaciteit",
                content: "Geeft de totale opslag capaciteit van het USB apparaat weer."
            }, {
                type: "name",
                title: "Vrije ruimte",
                content: "Geeft de huidige beschikbare vrije ruimte weer."
            }, {
                type: "name",
                title: "Actief",
                content: "Deze checkbox verschijnt alleen wanneer een USB opslag apparaat verbonden is met de router. Selecteer om bestanden delen van het USB apparaat in te schakelen."
            }, {
                type: "name",
                title: "Veilig verwijderen",
                content: "Klik op deze knop om het USB opslag apparaat veilig te verwijderen voordat u deze fysiek van de router ontkoppelt. Houd er rekening mee dat de Veilig verwijderen knop alleen tevoorschijn komt wanneer er een USB opslag apparaat verbonden is met de router. Houdt er tevens ook rekening mee dat u het USB apparaat niet kunt ontkoppelen wanneer deze in gebruik is."
            }, {
                type: "title",
                content: "Instellingen voor delen."
            }, {
                type: "name",
                title: "Netwerk media/Server naam",
                content: "Geeft de naam weer die gebruikt wordt om toegang tot het verbonden USB opslag apparaat te krijgen."
            }, {
                type: "title",
                content: "Folder delen."
            }, {
                type: "name",
                title: "Alles delen",
                content: "Schakel in om alle bestanden en folders te delen of schakel uit  om alleen de geselecteerde folders te delen."
            }, {
                type: "name",
                title: "Authenticatie inschakelen",
                content: "Schakel in om de authenticatie in te schakelen welke de gebruiker vraagt om een geldige gebruikersnaam en wachtwoord in te voeren om toegang te krijgen tot de gedeelde folders."
            }, {
                type: "name",
                title: "Folder naam",
                content: "Geeft de naam van de gedeelde folder weer."
            }, {
                type: "name",
                title: "Folder pad",
                content: "Geeft het pad naar de gedeelde folder weer."
            }, {
                type: "name",
                title: "Volume naam",
                content: "Geeft de naam van het gedeelde volume weer."
            }]
        },
        printSrv: {
            TITLE: "Print server",
            CONTENT: [{
                type: "name",
                title: "Print server inschakelen",
                content: "Schakel in om de print server functie in te schakelen."
            }, {
                type: "name",
                title: "Printer naam",
                content: "Geeft de naam van uw printer weer die verbonden is met de router."
            }]
        },
        diskSettings: {
            TITLE: "USB Opslag apparaat",
            CONTENT: [{
                type: "paragraph",
                content: "Het <b>USB Opslag apparaat</b> scherm geeft basis informatie over het USB opslag apparaat verbonden via de USB poort weer."
            }, {
                type: "name",
                title: "Scannen",
                content: "Doorgaans detecteert de router automatisch nieuwe aangesloten apparaten. Indien dit niet gebeurd, klik dan op deze knop om te scannen het het scherm te vernieuwen met de geupdate informatie."
            }, {
                type: "name",
                title: "Volume naam",
                content: "Geeft de naam van het USB volume weer."
            }, {
                type: "name",
                title: "Capaciteit",
                content: "Geeft de totale opslag capaciteit van het USB apparaat weer."
            }, {
                type: "name",
                title: "Vrije ruimte",
                content: "Geeft de huidige beschikbare vrije ruimte weer."
            }, {
                type: "name",
                title: "Actief",
                content: "Deze checkbox verschijnt alleen wanneer een USB opslag apparaat verbonden is met de router. Selecteer om bestanden delen van het USB apparaat in te schakelen."
            }, {
                type: "name",
                title: "Veilig verwijderen",
                content: "Klik op deze knop om het USB opslag apparaat veilig te verwijderen voordat u deze fysiek van de router ontkoppelt. Houd er rekening mee dat de Veilig verwijderen knop alleen tevoorschijn komt wanneer er een USB opslag apparaat verbonden is met de router. Houdt er tevens ook rekening mee dat u het USB apparaat niet kunt ontkoppelen wanneer deze in gebruik is."
            }, {
                type: "note",
                title: "Een file server instellen",
                content: [
                    "Maak het USB opslag apparaat vast aan de USB poort van de router door gebruik te maken van een USB kabel.",
                    "Het nieuwe aangesloten USB apparaat zou automatisch door de router gedetecteerd moeten worden en toont de informatie onder de <b>Apparaat instellingen</b> sectie. Zo niet, klik dan op <b>Scan</b>.",
                    "Klik het <b>Actief</b> pictogram om bestanden delen in te schakelen."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Delen account",
            CONTENT: [{
                type: "name",
                title: "Account",
                content: "U kunt ofwel <b>Standaard Account Gebruiken</b> selecteeren om in te loggen op de gedeelde bestanden en folders, of <b>Gebruik een nieuw account</b> en voer het volgende in om een nieuwe gebruikers account te creëren."
            }, {
                type: "name",
                title: "Gebruikersnaam/Wachtwoord",
                content: "Voer maximaal 15 tekens in die letters, cijfers en/of onderstrepen strings bevatten. De gebruikersnaam moet met een alfabet karakter beginnen. Deze velden zijn hoofdletter gevoelig."
            }, {
                type: "paragraph",
                content: "Klik <b>Opslaan</b> om de account instellingen op te slaan."
            }, {
                type: "title",
                content: "Deel instellingen"
            }, {
                type: "name",
                title: "Netwerk/Media server naam",
                content: "Geeft de naam weer die gebruikt wordt om toetang te krijgen tot het verboden USB opslag apparaat."
            }, {
                type: "name",
                title: "Inschakelen",
                content: "Selecteer deze checkbox om de corresponderende toegangs methode(s) in te schakelen."
            }, {
                type: "name",
                title: "Toegangs methode",
                content: "Er zijn vier methodes om toegang te krijgen tot het gedeelde USB opslag apparaat.",
                children: [{
                    type: "name",
                    title: "Media server",
                    content: "Selecteer deze optie om gebruikers op uw netwerk toe te staan om foto's te bekijken, muziek af te spelen en films te kijken op uw gedeelde USB opslag apparaat  vanaf DLNA-ondersteunde apparaten zoals computers, mobiele apparaten en spelcomputers (PS2/3)."
                }, {
                    type: "name",
                    title: "Netwerk Neighborhood",
                    content: "Selecteer deze optie om gebruikers op uw netwerk toegang te verlenen tot de gedeelde inhoud via het adres weergegeven onder de Adres kolom."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Selecteer deze optie om de FTP server functie in te schakelen dat toestaat dat FTP cliënten en gebruikers op uw netwerk toegang hebben tot het USB opslag apparaat via het FTP adres dat wordt weergegeven onder de Adres kolom. Om de FTP server's poort te wijzigen, voer een nieuw poort nummer in en klik op <b>Opslaan</b> om de wijzigingen toe te passen."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (Via Internet)",
                    content: "Selecteer deze optie om FTP cliënten en gebruikers in staat te  stellen op afstand toegang te krijgen, bestanden te downloaden en te uploaden naar het gedeelde USB opslag apparaat via FTP via het Internet."
                }]
            }, {
                type: "name",
                title: "Toegang",
                content: "Geeft het adres weer dat gebruikt wordt om toegang tot het gedeelde USB opslag apparaat te krijgen."
            }, {
                type: "name",
                title: "Poort",
                content: "Geeft het poort nummer van de FTP server weer."
            }, {
                type: "title",
                content: "Folder delen."
            }, {
                type: "name",
                title: "Alles delen",
                content: "Schakel in om alle bestanden en folders te delen of schakel uit om alleen geselecteerde folders te delen."
            }, {
                type: "name",
                title: "Authenticatie inschakelen",
                content: "Schakel in om de authenticatie in te schakelen welke de gebruiker vraagt om een geldige gebruikersnaam en wachtwoord in te voeren om toegang te krijgen tot de gedeelde folders."
            }, {
                type: "name",
                title: "Folder naam",
                content: "Toont de naam van de gedeelde folder."
            }, {
                type: "name",
                title: "Folder pad",
                content: "Toont het pad naar de gedeelde folder."
            }, {
                type: "name",
                title: "Media delen",
                content: "Toont of de media delen functie is ingeschakeld (Aan) of is uitgeschakeld (Uit)."
            }, {
                type: "name",
                title: "Volume naam",
                content: "Toont de naam van het gedeelde volume."
            }, {
                type: "name",
                title: "Status",
                content: "Geeft de huidige status weer van een gedeelde folder. Klik op het Lamp pictogram om folder delen in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft de opties weer om de corresponderende gedeelde folder te <b>Bewerken</b> of om te <b>Verwijderen</b> "
            }, {
                type: "note",
                title: "Een folder delen invoer toevoegen:",
                content: [
                    "Schakel uit <b>Alles selecteren</b>.",
                    "Klik <b>Toevoegen</b>.",
                    "Selecteer de <b>Volume naam</b> en <b> Folder Pad</b>.",
                    "Creëer een folder naam.",
                    "Beslis over de manier waarop u de folder deelt:<br /><b>Authenticatie inschakelen</b> - Selecteer om gebruikers te vragen zichzelf te authenticeren met een geldige gebruikersnaam en wachtwoord om toegang te krijgen tot gedeelde folders. <br /><b>Schrijftoegang inschakelen</b> - Selecteer om gebruikers in staat te stellen om wijzigingenaan de folder inhoud aan te brengen.<br /><b> Media delen inschakelen</b> - Selecteer om media delen in te schakelen.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPSec instellingen",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detectie",
                content: "Dead Peer Detectie (DPD) is een werkwijze voor het detecteren van een dode Internet Key Exchange (IKE) peer. DPD wordt gebruikt om verloren middelen terug te winnen in het geval een peer dood aangetroffen wordt en het wordt ook gebruikt om IKE peer failover uit te voeren. Schakel in om de Dead Peer Detectie functie in te schakelen."
            }, {
                type: "name",
                title: "Verbindingsnaam/Remote Gateway/ Lokaal adres/Remote adres",
                content: "Geeft de verbindingsnaam, Remote Gateway, Lokaal adres en Remote adres van de IPSec invoer weer."
            }, {
                type: "name",
                title: "Status",
                content: "Geeft de status van de IPSec invoer weer. Status omvat:",
                children: [{
                    type: "name",
                    title: "Uitgeschakeld",
                    content: "De invoer is uitgeschakeld."
                }, {
                    type: "name",
                    title: "Neer",
                    content: "De invoer in ingeschakeld, maar geen verbinding."
                }, {
                    type: "name",
                    title: "Op",
                    content: "De invoer is ingeschakeld en de verbinding is succesvol tot stand gekomen."
                }]
            }, {
                type: "name",
                title: "Inschakeld",
                content: "Klik het <b>Lamp</b> pictogram om de invoer in te schakelen of uit te schakelen."
            }, {
                type: "name",
                title: "Bewerken",
                content: "Geeft opties weer om de corresponderende invoer te <b>Bewerken</b> of the <b>Verwijderen</b>."
            }, {
                type: "name",
                title: "Toevoegen",
                content: "Klik om een nieuwe IPSec VPN verbinding toe te voegen."
            }, {
                type: "name",
                title: "IPSec verbindingsnaam ",
                content: "Voer een naam in voor de IPSec VPN Verbinding."
            }, {
                type: "name",
                title: "Remote IPSec Gateway adres (URL)",
                content: "Voer de bestemming gateway IP adres in welke het publieke WAN IP of Domein naam is van de Remote VPN server eindpunt."
            }, {
                type: "name",
                title: "Tunnet toegang vanaf lokaal IP adres",
                content: "Selecteer Subnet adres als u wilt dat de gehele LAN zich aansluit op het VPN netwerk, of selecteer Single adres als u wilt dat één IP zich aansluit op het VPN netwerk."
            }, {
                type: "name",
                title: "IP adres voor VPN",
                content: "Voer het IP adres van uw LAN in."
            }, {
                type: "name",
                title: "IP subnetmasker",
                content: "Voer het subnetmasker van uw LAN in."
            }, {
                type: "name",
                title: "Tunnet toegang vanaf remote IP adres",
                content: "Selecteer Subnet adres als u wilt dat de gehele remote LAN zich aansluit op het VPN netwerk, of selecteer Single adres als u wilt dat één IP zich aansluit op het VPN netwerk."
            }, {
                type: "name",
                title: "IP adres voor VPN",
                content: "Voer het IP adres van de remote LAN in."
            }, {
                type: "name",
                title: "IP subnetmasker",
                content: "Voer het subnetmasker van de remote LAN in."
            }, {
                type: "name",
                title: "Sleutel uitwisseling methode",
                content: "Selecteer Auto (IKE) of Handmatig om deze te gebruiken voor de authenticatie van IPSec peers."
            }, {
                type: "name",
                title: "Authenticatie methode",
                content: "Selecteer vooraf-gedeelde Sleutel (aanbevolen)."
            }, {
                type: "name",
                title: "Vooraf-gedeelde sleutel",
                content: "Creëer een vooraf-gedeelde sleutel om deze te gebruiken voor authenticatie."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "Selecteer om de Perfect Forward Secrecy(PFS) als een extra beveiligings protocol voor de vooraf-gedeelde sleutel in te schakelen (of uit te schakelen)."
            }, {
                type: "name",
                title: "Geavanceerd",
                content: "Klik om de geavanceerde instellingen te configureren. We raden u aan dat u de standaard instellingen behoud. Als u deze instellingen wilt wijzigen, wees er dan zeker van dat beide VPN server eindpunten dezelfde Encryptie Algoritme, Integriteit Algoritme, Diffie-Hellman Groep en Sleutel levenduur in zowel fase1 als fase2 gebruiken. ",
                children: [{
                    type: "title2",
                    content: "Fase 1"
                }, {
                    type: "name",
                    title: "Mode",
                    content: "Selecteer <b>Main</b> om de standaard onderhandeling parameters voor IKE fase1 te configureren. Selecteer <b>Aggressief</b> om IKE fase 1 van de VPN tunnel te configureren om onderhandelingen in een kortere tijd uit te voeren. (Niet aanbevolen en het is minder veilig)."
                }, {
                    type: "name",
                    title: "Lokaal identificeer type",
                    content: "Selecteer de Lokaal identificeer type voor IKE onderhandeling. Lokaal WAN IP gebruikt een IP adres als de identificeerder in IKE onderhandeling. FQDN (Fully Qualified Domain Name) gebruikt een gebruikersnaam als de identificeerder."
                }, {
                    type: "name",
                    title: "Lokaal identificeerder",
                    content: "De lokaal identificeerder zal automatisch worden ingevuld wanneer <b>Lokaal WAN IP</b> is geselecteerd. Als <b>FQDN</b> is geselecteerd, vul dan een gebruikersnaam van het lokale apparaat in om gebruikt te worden als de identificeerder voor IKE onderhandeling."
                }, {
                    type: "name",
                    title: "Remote identificeer type",
                    content: "Selecteer remote identificeer type voor IKE onderhandeling. Remote WAN IP gebruikt een IP adres als de identificeerder in IKE onderhandeling. FQDN gebruikt een gebruikersnaam als identificeerder."
                }, {
                    type: "name",
                    title: "Remote identificeerder",
                    content: "Het remote Gateway IP adres zal automatisch ingevuld worden wanneer <b>Remote WAN IP</b> is geselecteerd. Als <b>FQDN</b> is gelesecteerd, voer dan de gebruikersnaam van de remote peer in dat als identificeerder voor IKE onderhandeling gebruikt wordt."
                }, {
                    type: "name",
                    title: "Encryptie algoritme ",
                    content: "Selecteer één van de volgende encryptie algoritme voor IKE onderhandeling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encrypted Standard) versleuteld een 64-bit blok van platte tekst met een 56-bits sleutel. "
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, versleuteld een platte tekst met een 168-bits sleutel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Gebruikt het AES algoritme en een 128-bits sleutel voor de codering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Gebruikt het AES algoritme en een 192-bits sleutel voor de codering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Gebruikt het AES algoritme en een 256-bits sleutel voor de codering."
                    }]
                }, {
                    type: "name",
                    title: "Integriteit algoritme",
                    content: "Selecteer één van de volgende integriteit algoritme voor IKE onderhandeling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) neemt een bericht van willekeurige lengte en genereert een 128-bits berichtsamenvatting."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) neemt een bericht kleiner dan 2^64 (2 tot de macht 64) in bits en genereert een 160-bits berichtsamenvatting."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman Groep voor Sleutel uitwisseling",
                    content: "Selecteer de Diffie-Hellman groep om gebruikt te worden in de sleutel onderhandeling Fase1. De Diffie-Hellman group bepaald de sterkte van het algoritme in bits."
                }, {
                    type: "name",
                    title: "Sleutel levensduur",
                    content: "Voer de tijd ( in seconden) in dat voorbij gaat voordat er een nieuwe IPSec security association (SA) wordt vastgesteld met het remote eindpunt. De standaard waarde is 3600."
                }, {
                    type: "title2",
                    content: "Fase 2"
                }, {
                    type: "name",
                    title: "Encryptie algoritme",
                    content: "Selecteer één van de volgende encryptie algoritme voor IKE onderhandeling.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encrypted Standard) versleuteld een 64-bit blok van platte tekst met een 56-bits sleutel. "
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, versleuteld een platte tekst met een 168-bits sleutel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Gebruikt het AES algoritme en een 128-bits sleutel voor de codering."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Gebruikt het AES algoritme en een 192-bits sleutel voor de codering."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Gebruikt het AES algoritme en een 256-bits sleutel voor de codering."
                    }]
                }, {
                    type: "name",
                    title: "Integriteit algoritme",
                    content: "Selecteer één van de volgende integriteit algoritme voor IKE onderhandeling.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) neemt een bericht van willekeurige lengte en genereert een 128-bits berichtsamenvatting."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) neemt een bericht kleiner dan 2^64 (2 tot de macht 64) in bits en genereert een 160-bits berichtsamenvatting."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman Groep voor Sleutel uitwisseling",
                    content: "Selecteer de Diffie-Hellman groep om gebruikt te worden in de sleutel onderhandeling Fase1. De Diffie-Hellman group bepaald de sterkte van het algoritme in bits."
                }, {
                    type: "name",
                    title: "Sleutel levensduur",
                    content: "Voer de tijd ( in seconden) in dat voorbij gaat voordat er een nieuwe IPSec security association (SA) wordt vastgesteld met het remote eindpunt. De standaard waarde is 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Internet verbinding instellen",
            CONTENT: [{
                type: "name",
                title: "Auto detectie",
                content: "Klik deze knop om de router automatisch uw huidige internet verbindingstype te laten detecteren."
            }, {
                type: "paragraph",
                title: "Opmerking",
                content: "Als u niet zeker weer welke internet verbindingstype u heeft, gebruik de Auto Detectie functie of neem contact op met uw ISP voor assistentie."
            }, {
                type: "title",
                title: "Internet verbindingstype: Statisch IP"
            }, {
                type: "name",
                title: "IP adres/subnetmasker/default gateway/primair DNS/secundair DNS",
                content: "Voer de informatie in verstrekt door uw ISP."
            }, {
                type: "title",
                title: "Internet verbindingstype: Dynamisch IP"
            }, {
                type: "name",
                title: "Het MAC adres NIET klonen/Kloon huidig computer MAC adres",
                content: "Selecteer of u het MAC adres wilt klonen of niet, volgens uw ISP."
            }, {
                type: "title",
                title: "Internet verbindingstype: PPPoE"
            }, {
                type: "name",
                title: "Gebruikersnaam/wachtwoord",
                content: "Voer de gebruikersnaam en het wachtwoord in verstrekt door uw ISP. Deze velden zijn hoofdletter-gevoelig."
            }, {
                type: "title",
                title: "Internet verbindingstype: L2TP/PPTP"
            }, {
                type: "name",
                title: "Gebruikersnaam/wachtwoord",
                content: "Voer de gebruikersnaam en het wachtwoord in verstrekt door uw ISP. Deze velden zijn hoofdletter-gevoelig."
            }, {
                type: "name",
                title: "Secundaire verbinding (Dynamisch IP of Statisch IP)",
                children: [{
                    type: "name",
                    title: "Dynamisch IP",
                    content: "Selecteer deze optie als het IP adres en subnetmasker automatisch zijn toegewezen door uw ISP."
                }, {
                    type: "name",
                    title: "Statisch IP",
                    content: "Selecteer deze optie als het IP adres, subnetmasker, Gateway en DNS adres verstrekt zijn door uw ISP en voer deze informatie in in de corresponderende velden."
                }]
            }, {
                type: "name",
                title: "VPN server IP/Domeinnaam",
                content: "Voer het IP adres of Domeinnaam van de VPN server in verkregen van uw ISP."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Print server",
            CONTENT: [{
                type: "paragraph",
                content: "U kunt de print server op deze pagina configureren."
            }, {
                type: "name",
                title: "Print server",
                content: "Geeft de huidige Ingeschakeld/Uitgeschakeld status van de print server weer."
            }, {
                type: "name",
                title: "Printer naam",
                content: "Naam van de printer die verbonden is met de router."
            }, {
                type: "note",
                title: "Volg onderstaande instructies om uw print server in te stellen:",
                content: [
                    "Stap1: Verbind de USB printer met de USB poort van de router door middel van een USB printer kabel.",
                    "Stap2: Installeer de printer driver op uw computer.",
                    "Stap3: Installeer de TP-LINK USB Printer Controller op uw computer. Start de meegeleverde CD of download de TP-LINK USB Printer Controller Utility vanaf onze website: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Draadloos geavanceerde instellingen 2.4 GHz | 5 GHz",
            CONTENT: [{
                type: "name",
                title: "Beacon Interval",
                content: "Voer een waarde in tussen 25 en 1000 miliseconden om de tijdsduur te bepalen waartussen de beacon pakketten worden gebroadcast door de router om het draadloze netwerk te synchroniseren. De standaard waarde is 100 milliseconden."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "Voer een waarde tussen 1 en 2346 bytes in om de pakketgrootte van de gegevensoverdracht door de router te bepalen. Als de pakketgrootte groter is dan de vooraf ingestelde drempel, stuurt de router Request to Send frames naar een bepaald ontvang station en onderhandelt over het versturen van een data-frame, of anders zal het pakket onmiddelijk worden verzonden."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "Voer een waarde tussen 1 en 255 in om de interval van de Delivery Traffic Indication Message (DTIM) te bepalen. 1 geeft aan dat de DTIM interval hetzelfde is als de Beacon interval."
            }, {
                type: "name",
                title: "Group Key Update Period",
                content: "Voer het aantal seconden in (minimum 30)om het tijdsinterval om de encryptie sleutel automatisch te vernieuwen. De standaard waarde is 0, wat aanduidt dat er geen sleutel vernieuwing plaatsvindt."
            }, {
                type: "name",
                title: "WMM Feature",
                content: "De WMM (Wi-Fi multi-media) functie garandeerd dat pakketten met een hoog prioriteit bericht bij voorkeur worden verzonden. Het wordt sterk aanbevolen en is standaard ingeschakeld."
            }, {
                type: "name",
                title: "Short GI Feature",
                content: "Deze functie verhoogt de data capaciteit door de Guard Interval (GI) tijd te verminderen. Het is aanbevolen en standaard ingeschakeld."
            }, {
                type: "name",
                title: "AP isolatie functie",
                content: "Selecteer deze checkbox om de AP Isolatie functie in te schakelen waardoor u alle draadloze apparaten in uw netwerk kunt beperken in de interactie met elkaar, maar wel toegang hebben met het internet. AP isolatie is standaard uitgeschakeld."
            }, {
        		display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Airtime Fairness functie",
                "content": "Selecteer deze checkbox om de Airtime Fairness (ATF) functie in te schakelen waarmee u de doorvoer van elke stroom kunt optimaliseren. De ATF verkeer regelaar maakt gebruik van de per-bestemming airtime doelstellingen om het airtime gebruik tussen de stroom bestemmingen in evenwicht te brengen."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Multi-gebruiker MIMO functie",
                "content": "Klik op inschakelen om de Multi-gebruiker MIMO functie te gebruiken."
			},  {
				"type": "name",
				"title": "USB 3.0 Storingsvermindering",
				"content": "Klik op inschakelen om USB 3.0 storingsvermindering in te schakelen."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "WPS inschakelen",
                content: "Schakel in om de WPS functie in te schakelen."
            }, {
                type: "paragraph",
                content: "Klik Opslaan om uw instellingen op te slaan."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Nacht mode",
                content: "Wanneer deze functie ingeschakeld is, zullen ze router's LED's automatisch uitgeschakeld worden tijdens de opgegeven periode."
            }, {
                type: "name",
                title: "Tijd periode",
                content: "Voer een periode in waarop de router's LED's uitgeschakeld zullen worden."
            }, {
                type: "paragraph",
                content: "Klik Opslaan om uw instellingen op te slaan."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "DoS protectie instellingen"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Het DoS protectie niveau beschermt de router van TCP-SYN-Flood, UDP-Flood en ICMP-Flood aanvallen."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "ICMP-FLOOD Packets Level",
                content: "Voer een waarde tussen 5 en 3600 in die de bescherming van ICMP-FLOOD direct activeert wanneer het aantal ICMP pakketten de ingestelde waarde overschrijdt."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "UDP-FLOOD Packets Level",
                content: "Voer een waarde tussen 5 en 3600 in die de bescherming van UDP-FLOOD direct activeert wanneer het aantal UDP pakketten de ingestelde waarde overschrijdt."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "TCP-FLOOD Packets Level",
                content: "Voer een waarde tussen 5 en 3600 in die de bescherming van TCP-SYN-FLOOD direct activeert wanneer het aantal TCP-SYN pakketten de ingestelde waarde overschrijdt."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Klik Opslaan om uw instellingen op te slaan."
            }]
        },
        logConf: {
            TITLE: "Log instellingen",
            CONTENT: [{
                type: "name",
                title: "Lokaal opslaan",
                content: "Selecteer om uw logs op uw lokale geheugen op te slaan.",
                children: [{
                    type: "name",
                    title: "Minimum niveau",
                    content: "Selecteer het Minimum niveau in de keuzelijst en alle gebeurtenissen boven of gelijk aan dit geselecteerde niveau zal worden opgeslagen."
                }]
            }, {
                type: "name",
                title: "Remote opslaan",
                content: "Selecteer om logs te verzenden naar het opgegeven IP adres en UDP poort van de externe systeem log server.",
                children: [{
                    type: "name",
                    title: "Minimum niveau",
                    content: "Selecteer het Minimum niveau in de keuzelijst en alle gebeurtenissen boven of gelijk aan dit geselecteerde niveau zal worden opgeslagen."
                }, {
                    type: "name",
                    title: "Server IP",
                    content: "Specificeer het IP adres van de externe systeem log server naar welke de gebeurtenissen worden verstuurd."
                }, {
                    type: "name",
                    title: "Server poort",
                    content: "Specificeer het poort nummer van de externe systeem log server naar welke de gebeurtenissen worden verstuurd."
                }, {
                    type: "name",
                    title: "Lokale Faciliteit naam",
                    content: "Selecteer de lokale faciliteit naam volgens de externe server's faciliteit naam."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Draadloos",
            CONTENT: [{
                type: "name",
                title: "Beveiliging",
                content: "U kunt één van de volgende beveiligingsopties selecteren.",
                children: [{
                    type: "name",
                    title: "Geen beveiliging",
                    content: "De draadloze stations zullen verbinden met de router zonder gebruik te maken van een encryptie. Het is sterk aanbevolen om één van de volgende modes te kiezen om de beveiliging in te schakelen."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Persoonlijk",
                    content: "Selecteer WPS gebasseerd op vooraf-gedeelde wachtwoorden.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "U kunt één van de volgende versies selecteren",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selecteer WPA-PSK of WPA2-PSK automatisch op basis van het vermogen en het verzoek van de draadloze zender."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Vooraf-gedeelde sleutel of WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "U kunt ofwel Auto, TKIP of AES selecteren."
                    }, {
                        type: "name",
                        title: "Draadloos wachtwoord",
                        content: "U kunt ASCII of Hexadecimale tekens invoeren. Voor hexadecimaal, zal de lengte tussen de 8 en 64 karakters moeten zijn; voor ASCII moet de lengte tussen 8 en 63 tekens zijn."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Selecteer WPS gebasseerd op Radius server.",
                    children: [{
                        type: "name",
                        title: "Versie",
                        content: "U kunt één van volgende versies selecteren.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selecteer WPA of WPA2 automatisch op basis van het vermogen en het verzoek van de draadloze zender."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi Protected Access."
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA Versie 2."
                        }]
                    }, {
                        type: "name",
                        title: "Encryptie",
                        content: "U kunt ofwel Auto, TKIP of AES selecteren."
                    }, {
                        type: "name",
                        title: "Radius server IP",
                        content: "Voer het IP adres van de Radius Server in."
                    }, {
                        type: "name",
                        title: "Radius poort",
                        content: "Voer de poort in waarvan de radius service gebruik maakt."
                    }, {
                        type: "name",
                        title: "Radius wachtwoord",
                        content: "Voer het wachtwoord van de Radius server in."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecteer 802.11 WEP beveiliging.",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "U kunt één van de volgende types selecteren",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selecteer de gedeelde sleutel of Open systeem authenticatie type automatisch op basis van het vermogen en het verzoek van de draadloze zender."
                        }, {
                            type: "name",
                            title: "Gedeelde sleutel",
                            content: "Selecteer 802.11 Gedeelde sleutel authenticatie."
                        }, {
                            type: "name",
                            title: "Open Systeem",
                            content: "Selecteer 802.11 open systeem authenticatie."
                        }]
                    }, {
                        type: "name",
                        title: "Sleutel geselecteerd",
                        content: "Selecteer welke van de 4 sleutels gebruikt zal worden."
                    }, {
                        type: "name",
                        title: "WEP sleutel formaat",
                        content: "U kunt ASCII of hexadecimaal formaat selecteren. ASCII formaat staat voor elke combinatie van toetsenbord tekens in de opgegeven lengte. Hexadecimaal formaat staat voor elke combinatie van hexadecimale cijfers (0-9, a-f, A-F) in de opgegeven lengte."
                    }, {
                        type: "name",
                        title: "Sleutel type",
                        content: "U kunt de WEP sleutel lengte selecteren (64-bits, 128-bits of 152-bits) voor encryptie. \"Uitgeschakeld\" betekend dat de WEP sleutel invoern ongeldig is.",
                        children: [{
                            type: "name",
                            title: "Voor 64-bits encryptie",
                            content: "U kunt 10 hexadecimale cijfers invoeren (elke combinatie van 0-9, a-f, A-F en de nul toets zijn niet toegestaan) of 5 ASCII tekens."
                        }, {
                            type: "name",
                            title: "Voor 128-bits encryptie",
                            content: "U kunt 26 hexadecimale cijfers invoeren (elke combinatie van 0-9, a-f, A-F en de nul toets zijn niet toegestaan) of 13 ASCII tekens."
                        }, {
                            type: "name",
                            title: "Voor 152-bits encryptie",
                            content: "U kunt 32 hexadecimale cijfers invoeren (elke combinatie van 0-9, a-f, A-F en de nul toets zijn niet toegestaan) of 16 ASCII tekens."
                        }]
                    }, {
                        type: "name",
                        title: "Sleutel waarde",
                        content: "Voer het wachtwoord voor WEP in."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Dit veld bepaalde de draadloze mode waarop de router werkt."
            }, {
                type: "name",
                title: "Kanaalbandbreedte",
                content: "De bandbreedte van het draadloze kanaal."
            }, {
                type: "name",
                title: "Kanaal",
                content: "Dit veld bepaald welk werkende frequentie er gebruikt wordt. Het is niet nodig om het draadloze kanaal te veranderen tenzij u storingen opmerkt met ander nabijgelegen access points. Als u Auto selecteerd, zal de AP automatisch het beste kanaal kiezen."
            }, {
                type: "name",
                title: "Zendvermogen",
                content: "Hier kunt u het zendvermogen van de router specificeren. U kunt Hoog, middel of laag selecteren welke u wilt. Hoog is de standaardwaarde en is aanbevolen."
            }, {
                type: "paragraph",
                content: "Klik opslaan om de config <strong>op te slaan</strong> en toe te passen."
            }]
        },
        diagnostic: {
            TITLE: "Diagnostische hulpmiddelen",
            CONTENT: [{
                type: "paragraph",
                content: "De router bied Ping en Traceroute hulpmiddelen die u helpen bij het troubleshooten van netwerk verbindings problemen. De Ping tool stuurt pakketten naar een doel IP adres of Domeinnaam en logt de resultaten, zoals het aantal verstuurde/ontvangen pakketten en de router rijd. De Traceroute hulpprogramma stuurt pakketten naar een doel IP adres of Domeinnaam en geeft het aantal hops en de tijd weer om de bestemming te bereiken."
            }, {
                type: "paragraph",
                content: "U kunt een netwerk apparaat pingen of de route traceren via het IP adres of domein naam, zoals google.com, yahoo.com etc."
            }, {
                type: "note",
                title: "Te diagnosticeren via Ping",
                content: [
                    "Voer het doel IP adres of domein naam in.",
                    "Klik op het pijl pictogram om het geavanceerde menu te openen en de ping count en ping pakket grootte te specificeren. (Optioneel)",
                    "Klik start."
                ]
            }, {
                type: "note",
                title: "Te diagnosticeren via Traceroute",
                content: [
                    "Voer het doel IP adres of domein naam in.",
                    "Klik op het pijl pictogram om het geavanceerde menu te openen en geef het aantal hops (te bereiken) in de Traceroute MAX TTL (Time to Live) veld in. De standaard waarde is 20. (Optioneel)",
                    "Klik start."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC adres",
                content: "Het unieke fysieke adres van de router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "LAN IPv4",
                content: "Behoud de router's standaard IP adres (192.168.0.1) of voer een nieuwe in. Dit IP adres kan gebruikt worden om in te loggen op de router's web configuratie pagina."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Adrestype",
                "content": "Voor het configureren van het IP adres van de router kunt u kiezen voor handmatig (Statisch IP) of automatisch (Smart DHCP) configureren."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "LAN IP",
                "content": "Behoud de router's standaard IP adres (192.168.0.254) of voer een nieuwe in. Dit IP adres kan gebruikt worden om in te loggen op de router's web configuratie pagina."
            }, {
                type: "name",
                title: "Subnetmasker",
                content: "Selecteer een toegekende identificatiecode gebruikt door de LAN poort om intern en extern verkeer te routeren van de keuzelijst of een nieuw subnetmasker formaat in. De standaard waarde is 255.255.255.0"
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IGMP Snooping",
                content: "IGMP (Internet Group Management Protocol) wordt gebruikt om multicasting op TCP/IP netwerken te beheren. Sommige ISP's gebruiken IGMP om remote configuraties uit te voeren voor cliënt apparaten, zoals een router. Dit is standaard ingeschakeld."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Opmerking",
                content: "Als het nieuwe LAN IP adres zich niet in hetzelfde subnet bevind als de oude, zal het IP adres pool in de DHCP server automatisch veranderen; echter de virtuele server en DMZ host zullen niet van kracht zijn totdat deze worden geconfigureerd."
            }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Link aggregatie"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Link aggregatie combineert 2 poorten samen tot één enkele hoge-bandbreedte data pad te maken, waardoor een hogere snelheid en meer stabiel bedraad netwerk behouden blijft."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Link aggregatie toepassen.",
                content: [
                    "Schakel in om de link aggregatie functie in te schakelen.",
                    "Selecteer de modus link aggregatie. <br><b> LACP actief:</b> schakelt LACP (Link aggregatie Control Protocol) onvoorwaardelijk in. <br><b> LACP passief:</b> schakelt LACP alleen in wanneer een LACP apparaat is gedetecteerd. ",
					"Specificeer twee poorten voor link aggregatie.",
					"Klik op opslaan."
                ]
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                title: "SPI Firewall",
                content: "SPI (Stateful Packet Inspection) firewall voorkomt cyberaanvallen en valideert het verkeer dat door de router passeert. De SPI firewall is standaard ingeschakeld."
            }, {
                type: "title",
                title: "DoS protectie"
            }, {
                type: "name",
                title: "DoS protectie",
                content: "DoS (Denial of Service) protectie beschermt uw LAN tegen DoS aanvallen van overstromingen van server verzoeken op uw netwerk."
            }, {
                type: "name",
                title: "ICMP-FLOOD Attack Filtering",
                content: "Schakel in om ICMP (Internet Control Message Protocol) overstroming aanvallen te voorkomen."
            }, {
                type: "name",
                title: "UDP-FLOOD Attack Filtering",
                content: "Schakel in om UDP (User Datagram Protocol) overstroming aanvallen te voorkomen."
            }, {
                type: "name",
                title: "TCP-FLOOD Attack Filtering",
                content: "Schakel in om de Transmission Control Protocol-Synchonize (TCP-SYN) overstroming aanvallen te voorkomen.",
                children: [{
                    type: "name",
                    title: "Uit",
                    content: "Geen protectie."
                }, {
                    type: "name",
                    title: "Laag",
                    content: "Laag-niveau van protectie en lage impact op de prestaties van de router."
                }, {
                    type: "name",
                    title: "Middel",
                    content: "Matig-niveau van protectie en semi-merkbare impact op de prestaties van de router."
                }, {
                    type: "name",
                    title: "Hoog",
                    content: "Hoog-niveau van protectie maar een merkbare impact op de prestaties van de router."
                }]
            }, {
                type: "name",
                title: "Verbied LAN Ping",
                content: "Schakel in om pings van Lan poorten te verbieden."
            }, {
                type: "name",
                title: "Verbied WAN Ping",
                content: "Schakel in om pings van Wan poorten te verbieden."
            }, {
                type: "title",
                title: "Geblokkeerde DoS host lijst"
            }, {
                type: "name",
                title: "Geblokkeerde DoS host lijst",
                content: "Geeft  het IP adres en MAC adres van elke geblokkeerde DoS aanval bron weer."
            }, {
                type: "name",
                title: "Om één of meerdere invoeren te verwijderen.",
                content: "In de host lijst, selecteer de invoer of invoeren die u wenst te verwijderen en klik op Verwijderen boven de tabel."
            }]
        },
        ipv6: {
            TITLE: "IPv6 Internet",
            CONTENT: [{
                type: "name",
                title: "IPv6 inschakelen",
                content: "Selecteer om de IPv6 functie van de router in te schakelen (Aan) of uit te schakelen (Uit)."
            }, {
                type: "title",
                title: "Internet verbindingstype: Statisch IP"
            }, {
                type: "name",
                title: "Statisch IP",
                content: "Selecteer dit type als uw ISP statische IPv6 adressen laat toewijzen."
            }, {
                type: "name",
                title: "IPv6 adres/IPv6 default gateway/ IPv6 DNS server/Secundaire IPv6 DNS server",
                content: "Vul de parameters in verkregen van uw ISP."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Het standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 Bytes. Verander de standaard MTU grootte niet tenzij dit vereist wordt door uw ISP."
            }, {
                type: "title",
                title: "Internet verbindingstype: Dynamisch IP"
            }, {
                type: "name",
                title: "Dynamisch IP",
                content: "Selecteer dit type als uw ISP statische IPv6 adressen laat toewijzen."
            }, {
                type: "name",
                title: "Ipv6 adres/IPv6 gateway",
                content: "Deze parameters worden automatisch toegewezen door de DHCPv6 server van uw ISP."
            }, {
                type: "name",
                title: "Adresserings type",
                content: "Selecteer de verbindingstype van de IPv6 verbinding."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "Het standaard en typische MTU (Maximum Transmission Unit) grootte voor de meeste Ethernet netwerken is 1500 Bytes. Verander de standaard MTU grootte niet tenzij dit vereist wordt door uw ISP."
            }, {
                type: "name",
                title: "Het volgende IPv6 DNS adres gebruiken",
                content: "Selecteer deze checkbox en voer het DNS server adres(sen) in verkregen van uw ISP in decimale notatie. Deze WAN interface zal de gespecificeerde DNS server als prioriteit gebruiken."
            }, {
                type: "name",
                title: "Host naam",
                content: "Voer een waarde in dit veld in om de hostnaam van de router te specificeren."
            }, {
                type: "title",
                title: "Internet verbindingstype: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Selecteer dit type als uw ISP PPPoEv6 gebruikt en u een gebruikersnaam en wachtwoord heeft gegeven."
            }, {
                type: "name",
                title: "Gebruikersnaam/wachtwoord/bevestig wachtwoord",
                content: "Vul deze parameters in verkregen van uw ISP."
            }, {
                type: "name",
                title: "Adresserings type",
                content: "Selecteer de verbindingstype van de IPv6 verbinding."
            }, {
                type: "name",
                title: "Service naam",
                content: "Voer de service naam in verkregen van uw ISP. Indien deze niet is voorzien, laat het veld dan leeg."
            }, {
                type: "name",
                title: "Server naam",
                content: "Voer de server naam in verkregen van uw ISP. Indien deze niet is voorzien, laat het veld dan leeg."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "De typische MTU (Maximum Transmission Unit) grootte voor Ethernet netwerken is 1480 Bytes.",
                children: [{
                    type: "paragraph",
                    content: "<b>Opmerking</b>: In zeldzame gevallen kan het zijn dat uw ISP vereist dat u de MTU grootte aanpast voor betere netwerk prestaties. U dient deze waarde niet te veranderen tenzij dit absoluut noodzakelijk is."
                }]
            }, {
                type: "name",
                title: "Gebruik de IPv6 informatie gespecificeerd door ISP.",
                content: "Selecteer deze checkbox en voer het IP adres en gateway in voorzien door uw ISP."
            }, {
                type: "name",
                title: "Gebruik het volgende IPv6 DNS adres",
                content: "Selecteer dit wanneer u handmatig het DNS adres voorzien door uw ISP in wilt voeren. Indien deze niet geselecteerd is, zal de router dynamisch het DNS adres ontvangen van uw ISP."
            }, {
                type: "title",
                title: "Internet verbindingstype: 6to4 Tunnel."
            }, {
                type: "name",
                title: "6to4 Tunnel",
                content: "Selecteer dit type als uw ISP 6to4 inzet voor het toewijzen van adressen."
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "Adresserings type",
                content: "Selecteer de geschikte volgens uw ISP.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Selecteer deze optie om IPv6 adressen toe te wijzen aan computers in uw LAN via RADVD.",
                    children: [{
                        type: "name",
                        title: "RDNSS inschakelen",
                        content: "Selecteer deze checkbox om de RDNSS functie in te schakelen."
                    }, {
                        type: "name",
                        title: "ULA prefix inschakelen",
                        content: "Selecteer deze checkbox om de ULA prefix functie in te schakelen.",
                        children: [{
                            type: "name",
                            title: "ULA Prefix",
                            content: "Voer de ULA Prefix in."
                        }, {
                            type: "name",
                            title: "Ula Prefix lengte",
                            content: "Voer de ULA Prefix lengte in. De standaard waarde is 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6 server",
                    content: "Automatisch IP adressen toewijzen aan cliënten in de LAN.",
                    children: [{
                        type: "name",
                        title: "Startend IPv6 adres",
                        content: "Voer het startende IPv6 adres in."
                    }, {
                        type: "name",
                        title: "Eindigend IPv6 adres",
                        content: "Voer het eindigend IPv6 adres in."
                    }, {
                        type: "name",
                        title: "Verhuurde tijd",
                        content: "Vul de tijdsduur in waarin een DHCP cliënt zijn huidige dynamische IPv6 adres kan huren toegewezen door de router. Nadat het dynamische IPv6 adres verlopen is, zal de gebruiker automatisch een nieuw dynamisch IPv6 adres toegewezen krijgen. De standaard waarde is 86400 seconden."
                    }]
                }]
            }, {
                type: "name",
                title: "Site prefix type",
                content: "Selecteer een type om een prefix toe te wijzen aan IPv6 adressen. Gedelegeerd en statisch zijn voorzien."
            }, {
                type: "name",
                title: "Gedelegeeerd",
                children: [{
                    type: "name",
                    title: "Prefix delegated WAN verbinding",
                    content: "Selecteer een WAN verbinding van de keuzelijst om prefix toe te wijzen."
                }]
            }, {
                type: "name",
                title: "Statisch",
                children: [{
                    type: "name",
                    title: "Site prefix",
                    content: "Voer een waarde in voor de site prefix."
                }, {
                    type: "name",
                    title: "Site prefix lengte",
                    content: "Voer een waarde in voor de site prefix lengte."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "VPN Server inschakelen",
				content: "Selecteer deze checkbox om de OpenVPN server in te schakelen."
			},{
				type: "name",
				title: "Service Type",
				content: "Selecteer het communicatieprotocol voor de OpenVPN server: UDP of TCP."
			},{
				type: "name",
				title: "Service poort",
				content: "Voer een communicatie poort nummer in tussen 1024 en 65535. De standaard en meeste gebruikte poort is 1194."
			},{
				type: "name",
				title: "VPN Subnet/Netmask",
				content: "Voer de reeks IP adressen in die uitgeleend kunnen worden aan cliënten door de OpenVPN server."
			},{
				type: "name",
				title: "Cliënt toegang",
				content: "Selecteer de toegangstype voor uw OpenVPN cliënt"
			},{
				type: "name",
				title: "Alleen thuisnetwerk",
				content: "Cliënten hebben alleen toegang tot de router en LAN. De cliënt's standaard route zal niet veranderen."
			},{
				type: "name",
				title: "Internet en thuisnetwerk",
				content: "Cliënten hebben alleen toegang tot de router en LAN. De cliënt's standaard route zal  veranderen."
			},{
				type: "paragraph",
				content: "Klik opslaan om uw instellingen op te slaan."
            },{
                type: "title",
                content: "Certificaat"
            },{
                type: "paragraph",
                content: "Gebruik het certificaat voor de informatie en identiteit van de VPN verbinding voor de remote computer."
            },{
                type: "name",
                title: "Genereren",
                content: "Klik om een nieuw certificaat te genereren."
            },{
                type: "title",
                content: "Configuratiebestand"
            },{
                type: "name",
                title: "Exporteren",
                content: "Klik op deze knop om de OpenVPN configuratiebestand op te slaan en te gebruiken voor het toevoegen van een nieuwe VPN verbinding."
			},{
                type: "title",
                content: "VPN Cliënt installatiegids"
			},{
				type: "step",
				title: "Om uw cliënt's apparaten in te schakelen en te verbinden met de OpenVPN server:"
			},{
				type: "paragraph",
				content: "Voordat u de OpenVPN server gaat configureren, gelieve eerst Dynamisch DNS Service (aanbevolen) configureren of wijs een statisch IP adres toe aan de WAN poort. Wees er zeker van dat uw externe poort van de NAT instellingen niet de service poort is en dat uw systeem tijd is gesynchroniseerd met het internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selecteer VPN server inschakelen.",
					"Configureer de OpenVPN server parameters (Service type, service poort en Cliënt toegang) en klik opslaan.",
					"Klik op exporteren om het configuratiebestand op te slaan.",
					"Op uw client apparaat, download en installeer de OpenVPN cliënt Utility van <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> De officiële ondersteunde platformen includeren Windows, Mac OSX, Linux.",
					"Start de OpenVPN cliënt utility en voeg een nieuwe VPN verbinding toe door gebruik te maken van het opgeslagen configuratiebestand om uw cliënt's apparaat te verbinden met de VPN server."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Voor meer info over OpenVPN cliënten, bezoek <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "VPN server inschakelen",
				content: "Selecteer deze checkbox om de PPTP VPN server in te schakelen."
			},{
				type: "name",
				title: "Cliënt IP adres",
				content: "Voer de reeks van IP adressen in (tot 10 clients) die uitgeleend kunnen worden aan de cliënten door de PPTP VPN server."
			},{
				type: "name",
				title: "Gebruikersnaam en wachtwoord",
				content: "Voer de gebruikersnaam en het wachtwoord in om cliënten te authenticeren met de PPTP VPN server."
			},{
				type: "paragraph",
				content: "Klik opslaan om uw instellingen op te slaan."
			},{
                type: "title",
                content: "VPN Cliënt installatiegids"
			},{
				type: "step",
				title: "Om uw cliënt apparaten in te schakelen en te verbinden met de PPTP VPN server:"
			},{
				type: "paragraph",
				content: "Voordat u de PPTP VPN server configureert, gelieve eerst Dynamisch DNS service (aanbevolen) te configureren of wijs een statisch IP adres toe aan de WAN poort. Wees er zeker van dat de externe poort van de NAT instellingen niet 1723 is en dat uw systeem tijd is gesynchroniseerd met het internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selecteer VPN server inschakelen.",
					"Configureer de PPTP VPN server parameters en klik op opslaan.",
					"Creëer een PPTP VPN verbinding op de apparaten van uw cliënt. De officiële ondersteunde platformen includeren Windows, mac OSX, Linux, iOS en Android.",
					"Start het PPTP VPN programma, voeg een nieuwe verbinding toe en voer de domeinnaam in van de geregistreerde DDNS service of het statisch IP adres dat is toegewezen aan de WAN poort, verbind uw cliënt's apparaat met de PPTP VPN server."
				]				
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN verbindingen",
			CONTENT: [{
				type: "paragraph",
				content: "Deze pagina geeft de cliënten weer die momenteel verbonden zijn met de OpenVPN en PPTP VPN servers die gehost worden op de router."
			},{
				type: "paragraph",
				content: "Klik op het Min icoon om de verbinding van de corresponderende cliënt te verbreken."
			}]
		},
        cloudBasic: {
            TITLE: "TP-Link Cloud",
            CONTENT: [{
                type: "paragraph",
                content: "TP-Link Cloud service staat u toe om op afstand uw netwerk te monitoren in echte tijd, uw TP-Link apparaten te benaderen en te beheren vanaf het internet wanneer en waar ook."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Account informatie"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Toont informatie over uw TP-Link ID. U kunt de account infomatie bewerken door op het bewerk icoon te klikken."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Apparaat informatie"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Geeft de apparaat informatie weer, inclusief het cloud account dat het apparaat beheert."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Accounts binden"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Deze tabel geeft alle cloud accountsd weer die momenteel gebonden zijn aan het apparaat."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Om een gebruikers account te binden",
                content: [
                    "Klik op binden",
                    "Voer een geregistreerd email in dat u wenst te binden.",
                    "Klik op opslaan."
                ]
            }]
        }
    };
})(jQuery);
